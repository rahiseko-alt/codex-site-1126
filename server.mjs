import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import sirv from 'sirv';
import { WebSocket, WebSocketServer } from 'ws';

const { values } = parseArgs({
  options: {
    host: { type: 'string', default: '127.0.0.1' },
    port: { type: 'string', default: '4173' },
    strictPort: { type: 'boolean' },
    production: { type: 'boolean' },
  },
});
const origin = new URL(values.production ? './dist/' : './site/', import.meta.url);
const serve = sirv(fileURLToPath(origin), { dev: !values.production, etag: true });
const socketServer = new WebSocketServer({ noServer: true, maxPayload: 4096 });
const rooms = new Map();

function json(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

const server = createServer((request, response) => {
  const { pathname } = new URL(request.url, 'http://localhost');
  if (pathname === '/api/radio' && ['GET', 'HEAD'].includes(request.method)) {
    request.url = '/data/radio.json';
  }
  if (pathname === '/parties/vitals/vitals') {
    if (request.method === 'POST') {
      request.resume();
      response.writeHead(204).end();
      return;
    }
    request.url = '/data/vitals.json';
  }
  if (pathname === '/api/contact' && request.method === 'POST') {
    request.resume();
    json(response, 503, { why: 'unavailable' });
    return;
  }
  serve(request, response, () => {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  });
});

function send(socket, message) {
  if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(message));
}

function broadcast(room, message, except) {
  for (const [socket] of room) {
    if (socket !== except) send(socket, message);
  }
}

function updateCount(room) {
  const pages = new Map();
  const visitors = new Set();
  for (const peer of room.values()) {
    if (peer.page) pages.set(peer.page, (pages.get(peer.page) ?? 0) + 1);
    visitors.add(peer.visitor ?? peer.id);
  }
  broadcast(room, { type: 'count', n: visitors.size, top: [...pages] });
}

socketServer.on('connection', (socket, url) => {
  socket.on('error', () => socket.terminate());
  if (url.pathname === '/parties/now-playing/now-playing') {
    send(socket, { type: 'nowplaying', live: false, track: null });
    return;
  }

  let room = rooms.get(url.pathname);
  if (!room) rooms.set(url.pathname, room = new Map());
  const id = url.searchParams.get('_pk')?.slice(0, 80) || crypto.randomUUID();
  const peer = { id, visitor: null, page: null, cursor: null };
  send(socket, { type: 'cursors', c: [...room.values()].filter(p => p.cursor)
    .map(p => [p.id, p.cursor.x, p.cursor.y, 0]) });
  room.set(socket, peer);
  updateCount(room);

  socket.on('message', raw => {
    let message;
    try {
      message = JSON.parse(raw);
    } catch {
      return;
    }
    if (message?.type === 'where' && typeof message.room === 'string') {
      peer.page = message.room.slice(0, 120);
      peer.visitor = id;
      updateCount(room);
    } else if (message?.type === 'cursor' && Number.isFinite(message.x) && Number.isFinite(message.y)) {
      const x = Math.max(0, Math.min(1, message.x));
      const y = Math.max(0, Math.min(1, message.y));
      peer.cursor = { x, y };
      broadcast(room, { type: 'cursor', id, x, y }, socket);
    } else if (message?.type === 'chat' && typeof message.text === 'string') {
      broadcast(room, { type: 'chat', id, text: message.text.slice(0, 160) }, socket);
    }
  });
  socket.on('close', () => {
    room.delete(socket);
    if (!room.size) rooms.delete(url.pathname);
    if (peer.cursor) broadcast(room, { type: 'leave', id });
    updateCount(room);
  });
});

server.on('upgrade', (request, socket, head) => {
  const url = new URL(request.url, 'http://localhost');
  if (!/^\/parties\/(?:presence\/[\w.-]+|now-playing\/now-playing)$/.test(url.pathname)) {
    socket.destroy();
    return;
  }
  socketServer.handleUpgrade(request, socket, head, connection => {
    socketServer.emit('connection', connection, url);
  });
});
server.listen(Number(values.port), values.host, () => {
  console.log(`Preview listening on http://${values.host}:${values.port}`);
});
