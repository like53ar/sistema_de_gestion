/**
 * server.js — Servidor de producción para Sistema de Gestión Sabia
 *
 * Sirve la carpeta dist/ como archivos estáticos (reemplaza a 'serve')
 * y expone el endpoint POST /api/shutdown para apagar el proceso limpiamente
 * desde el botón "Cierre del Sistema" de la interfaz.
 */

const http    = require('http');
const path    = require('path');
const fs      = require('fs');
const process = require('process');

const PORT      = 4200;
const DIST_DIR  = path.join(__dirname, 'dist', 'sistema-de-gestion', 'browser');

// ─── Tipos MIME básicos ────────────────────────────────────────────────────────
const MIME = {
  '.html' : 'text/html; charset=utf-8',
  '.js'   : 'application/javascript',
  '.css'  : 'text/css',
  '.json' : 'application/json',
  '.png'  : 'image/png',
  '.jpg'  : 'image/jpeg',
  '.svg'  : 'image/svg+xml',
  '.ico'  : 'image/x-icon',
  '.woff' : 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf'  : 'font/ttf',
  '.txt'  : 'text/plain',
};

// ─── Servidor HTTP ─────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  // Cabeceras CORS para permitir peticiones desde la misma app
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ── Endpoint de apagado ──────────────────────────────────────────────────────
  if (req.method === 'POST' && req.url === '/api/shutdown') {
    console.log('\n🛑  Cierre del Sistema solicitado desde la interfaz.');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, message: 'Servidor detenido.' }));
    // Dar 300ms para que la respuesta llegue al browser antes de salir
    setTimeout(() => {
      console.log('✅  Proceso finalizado limpiamente.\n');
      process.exit(0);
    }, 300);
    return;
  }

  // ── Archivos estáticos ───────────────────────────────────────────────────────
  let urlPath = req.url.split('?')[0]; // ignorar querystring

  // SPA fallback: cualquier ruta que no sea un archivo → index.html
  let filePath = path.join(DIST_DIR, urlPath);

  const tryFile = (fp) => {
    if (fs.existsSync(fp) && fs.statSync(fp).isFile()) return fp;
    return null;
  };

  let resolved = tryFile(filePath)
    || tryFile(path.join(DIST_DIR, 'index.html'));

  if (!resolved) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const ext      = path.extname(resolved).toLowerCase();
  const mimeType = MIME[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': mimeType });
  fs.createReadStream(resolved).pipe(res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n🚀  Sistema de Gestión Sabia — http://localhost:${PORT}`);
  console.log('    Para cerrar el sistema usá el botón en la interfaz.\n');
});
