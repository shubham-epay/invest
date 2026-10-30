import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(projectRoot, 'dist', 'client');
const args = process.argv.slice(2);
const option = name => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : undefined; };
const port = Number(option('--port') ?? process.env.PORT ?? 4173);
const host = option('--host') ?? process.env.HOST ?? '127.0.0.1';
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Choose a valid port between 0 and 65535.');
await stat(path.join(outputRoot, 'index.html')).catch(() => { throw new Error('Build the static site first: npm run build'); });

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.rsc': 'text/x-component',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon',
  '.ttf': 'font/ttf', '.otf': 'font/otf', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8',
  '.zip': 'application/zip', '.pdf': 'application/pdf', '.map': 'application/json; charset=utf-8',
};

const server = http.createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Method not allowed');
      return;
    }
    let pathname;
    try { pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname); }
    catch { response.writeHead(400); response.end('Invalid path'); return; }
    if (pathname.includes('\0') || pathname.includes('\\')) { response.writeHead(400); response.end('Invalid path'); return; }
    let file = path.resolve(outputRoot, '.' + pathname);
    const relative = path.relative(outputRoot, file);
    if (relative.startsWith('..' + path.sep) || relative === '..' || path.isAbsolute(relative)) {
      response.writeHead(403); response.end('Forbidden'); return;
    }
    let status = 200;
    let info;
    try {
      info = await stat(file);
      if (info.isDirectory()) { file = path.join(file, 'index.html'); info = await stat(file); }
      if (!info.isFile()) throw new Error('Not a file');
    } catch {
      file = path.join(outputRoot, '404.html');
      info = await stat(file);
      status = 404;
    }
    const extension = path.extname(file).toLowerCase();
    response.writeHead(status, {
      'Content-Type': types[extension] ?? 'application/octet-stream',
      'Content-Length': info.size,
      'Cache-Control': file.includes(path.sep + '_next' + path.sep + 'static' + path.sep) ? 'public, max-age=31536000, immutable' : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    if (request.method === 'HEAD') { response.end(); return; }
    const stream = createReadStream(file);
    stream.on('error', () => response.destroy());
    stream.pipe(response);
  } catch (error) {
    console.error('Static server:', error.message);
    if (!response.headersSent) response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Unable to serve the request');
  }
});
server.listen(port, host, () => console.log(`Invest.to static preview: http://${host}:${server.address().port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
