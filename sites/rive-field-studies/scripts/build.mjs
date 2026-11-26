import { copyFile, cp, mkdir, rm } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
const runtime = new URL('runtime/', output);
const source = new URL('../node_modules/@rive-app/canvas/', import.meta.url);
await rm(output, { recursive: true, force: true });
await cp(new URL('../site/', import.meta.url), output, { recursive: true });
await mkdir(runtime, { recursive: true });
await Promise.all(['rive.js', 'rive.wasm', 'rive_fallback.wasm'].map(name =>
  copyFile(new URL(name, source), new URL(name, runtime))
));
