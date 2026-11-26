import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import sirv from 'sirv';

const { values } = parseArgs({
  options: {
    host: { type: 'string', default: '127.0.0.1' },
    port: { type: 'string', default: '4174' },
    strictPort: { type: 'boolean' },
  },
});
const root = new URL('./dist/', import.meta.url);
const notFound = readFileSync(new URL('404.html', root));
const serve = sirv(fileURLToPath(root), { etag: true });
createServer((request, response) => {
  serve(request, response, () => {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(notFound);
  });
}).listen(Number(values.port), values.host, () => {
  console.log(`Preview listening on http://${values.host}:${values.port}`);
});
