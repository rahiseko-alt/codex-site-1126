import { copyFile, cp, mkdir, rm } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await cp(new URL('../site/', import.meta.url), output, { recursive: true });
for (const engine of ['canvas', 'webgl2']) {
  const target = new URL('runtime/' + engine + '/', output);
  const source = new URL('../node_modules/@rive-app/' + engine + '/', import.meta.url);
  await mkdir(target, { recursive: true });
  await Promise.all(['rive.js', 'rive.wasm', 'rive_fallback.wasm'].map(file =>
    copyFile(new URL(file, source), new URL(file, target))
  ));
}
