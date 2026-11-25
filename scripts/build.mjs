import { cp, rm, stat } from 'node:fs/promises';

const source = new URL('../site/', import.meta.url);
const output = new URL('../dist/', import.meta.url);
await stat(new URL('index.html', source));
await rm(output, { recursive: true, force: true });
await cp(source, output, { recursive: true });

if (process.argv.includes('--sites')) {
  const { readFile, writeFile, readdir } = await import('node:fs/promises');
  const modules = new URL('_astro/', output);
  const files = await readdir(modules);
  const patch = async (prefix, before, after) => {
    const file = files.find(name => name.startsWith(prefix) && name.endsWith('.js'));
    if (!file) throw new Error(`Missing deployment module: ${prefix}`);
    const url = new URL(file, modules);
    const text = await readFile(url, 'utf8');
    if (!text.includes(before)) throw new Error(`Cannot apply deployment adapter to ${file}`);
    await writeFile(url, text.replace(before, after));
  };
  await cp(new URL('./sites-socket.mjs', import.meta.url), new URL('sites-socket.js', modules));
  await patch('Base.astro_', 'this._options.WebSocket||WebSocket', 'this._options.WebSocket||SitesSocket');
  await patch('Base.astro_', 'import{', 'import { SitesSocket } from "./sites-socket.js";\nimport{');
  await patch('Base.astro_', 'this.started=!0;let e=j.presence.host;', 'this.started=!0;return;let e=j.presence.host;');
  await patch('about-radio.', '`/api/radio`', '`/data/radio.json`');
}
