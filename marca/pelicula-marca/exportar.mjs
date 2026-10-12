// Exporta la película a MP4 2560 × 1440 · 120 fps (H.264).
// Uso:
//   STANDERD=/ruta/StanderdVF.ttf LENIA=/ruta/carpeta-lenia node exportar.mjs [fps=120] [salida=nave-pelicula-2k-120fps.mp4] [procesos=3]
// Las fuentes se leen de tu disco y solo viven en el navegador del render; no se copian al repositorio.
// Cada proceso renderiza un tramo de cuadros y los pasa por tubería a ffmpeg; al final se unen sin recomprimir.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const DIR = path.dirname(fileURLToPath(import.meta.url));
const FPS = Number(process.argv[2] || 120), OUT = path.resolve(process.argv[3] || 'nave-pelicula-2k-120fps.mp4'), NP = Number(process.argv[4] || 3);

const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript' };
const srv = http.createServer((q, r) => {
  const f = path.join(DIR, decodeURIComponent(q.url.split('?')[0]));
  if (!f.startsWith(DIR) || !fs.existsSync(f)) { r.writeHead(404); r.end(); return; }
  r.writeHead(200, { 'Content-Type': tipos[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
}).listen(0);
const PORT = srv.address().port;

const b64 = (f) => fs.readFileSync(f).toString('base64');
let css = '';
if (process.env.STANDERD) css += `@font-face{font-family:"Standerd";src:url(data:font/ttf;base64,${b64(process.env.STANDERD)}) format("truetype");font-weight:100 900}`;
if (process.env.LENIA) for (const [w, n] of [[400, 'Regular'], [500, 'Medium'], [600, 'SemiBold'], [700, 'Bold']])
  css += `@font-face{font-family:"Lenia Mono";src:url(data:font/ttf;base64,${b64(path.join(process.env.LENIA, `LeniaMono-${n}.ttf`))}) format("truetype");font-weight:${w}}`;

const browser = await chromium.launch();
const abrir = async () => {
  const p = await browser.newPage({ viewport: { width: 640, height: 360 } });
  await p.goto(`http://localhost:${PORT}/render.html`);
  if (css) await p.addStyleTag({ content: css });
  await p.waitForFunction(() => window.listo);
  await p.evaluate(async () => { for (const f of ['400 40px "Standerd"', '700 40px "Standerd"', '500 20px "Lenia Mono"', '700 20px "Lenia Mono"']) await document.fonts.load(f).catch(() => {}); });
  return p;
};
const p0 = await abrir();
const total = Math.round((await p0.evaluate(() => window.duracion)) * FPS);
await p0.close();

const tmp = fs.mkdtempSync(path.join(path.dirname(OUT), '.tramos-'));
const tramo = Math.ceil(total / NP), t0 = Date.now();
let hechos = 0;
await Promise.all([...Array(NP).keys()].map(async (k) => {
  const desde = k * tramo, hasta = Math.min(total, desde + tramo);
  const p = await abrir();
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-tune', 'animation', '-pix_fmt', 'yuv420p', '-r', String(FPS), path.join(tmp, `t${k}.mp4`)], { stdio: ['pipe', 'inherit', 'inherit'] });
  const fin = new Promise((ok) => ff.on('close', ok));
  for (let i = desde; i < hasta; i++) {
    const url = await p.evaluate((t) => window.cuadro(t), i / FPS);
    if (!ff.stdin.write(Buffer.from(url.slice(url.indexOf(',') + 1), 'base64'))) await new Promise((ok) => ff.stdin.once('drain', ok));
    if (++hechos % 240 === 0) console.log(`${hechos} / ${total} cuadros · ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  }
  ff.stdin.end(); await fin; await p.close();
}));
fs.writeFileSync(path.join(tmp, 'lista.txt'), [...Array(NP).keys()].map((k) => `file 't${k}.mp4'`).join('\n'));
await new Promise((ok) => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(tmp, 'lista.txt'), '-c', 'copy', '-movflags', '+faststart', OUT], { stdio: 'inherit' }).on('close', ok));
fs.rmSync(tmp, { recursive: true, force: true });
await browser.close(); srv.close();
console.log(`listo: ${OUT} · ${total} cuadros en ${((Date.now() - t0) / 1000).toFixed(0)} s`);
