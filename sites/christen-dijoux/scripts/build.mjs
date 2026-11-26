import { createHash } from 'node:crypto';
import { cp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = new URL('../site/', import.meta.url);
const output = new URL('../dist/', import.meta.url);
const outputPath = fileURLToPath(output);
await rm(output, { recursive: true, force: true });
await cp(source, output, { recursive: true });

const files = (await readdir(output, { recursive: true, withFileTypes: true }))
  .filter(entry => entry.isFile());
const entries = await Promise.all(files.map(async entry => {
  const path = join(entry.parentPath ?? entry.path, entry.name);
  const bytes = await readFile(path);
  return {
    url: relative(outputPath, path).split(/[\\/]/).map(encodeURIComponent).join('/'),
    revision: createHash('sha256').update(bytes).digest('hex').slice(0, 24),
  };
}));
entries.sort((a, b) => a.url.localeCompare(b.url));
const template = await readFile(new URL('./sw-template.js', import.meta.url), 'utf8');
if (!template.includes('__PRECACHE_MANIFEST__')) throw new Error('Missing precache placeholder');
await writeFile(new URL('sw.js', output), template.replace('__PRECACHE_MANIFEST__', () => JSON.stringify(entries)));
