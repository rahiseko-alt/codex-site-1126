import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import sirv from 'sirv';

const { values } = parseArgs({
  options: {
    host: { type: 'string', default: '127.0.0.1' },
    port: { type: 'string', default: '4183' },
    strictPort: { type: 'boolean' },
    production: { type: 'boolean' },
  },
});
const root = new URL(values.production ? './dist/' : './site/', import.meta.url);
const serve = sirv(fileURLToPath(root), { dev: !values.production, etag: true });
createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  serve(request, response, () => {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Page not found');
  });
}).listen(Number(values.port), values.host, () => {
  console.log(`Preview listening on http://${values.host}:${values.port}`);
});
