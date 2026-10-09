// Exporta animacion-apertura.html cuadro a cuadro (PNG 1920×1080) para armar el MP4.
// Uso: STANDERD=/ruta/StanderdVF.ttf LENIA=/ruta/carpeta-lenia node exportar-animacion.js 24 cuadros
//      ffmpeg -framerate 24 -i cuadros/f%04d.png -c:v libx264 -crf 15 -preset slow -tune animation -pix_fmt yuv420p animacion-apertura-24fps.mp4
// Las fuentes se leen de tu disco y solo viven en el navegador del render; no se copian al repositorio.
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const fs = require('fs'), path = require('path');
const FPS = Number(process.argv[2] || 24), OUT = process.argv[3] || 'cuadros', DUR = 15;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch(), p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'animacion-apertura.html'));
  const b64 = f => fs.readFileSync(f).toString('base64');
  let css = '';
  if (process.env.STANDERD) css += `@font-face{font-family:"Standerd";src:url(data:font/ttf;base64,${b64(process.env.STANDERD)}) format("truetype");font-weight:100 900}`;
  if (process.env.LENIA) for (const [w, f] of [[400, 'LeniaMono-Regular.ttf'], [500, 'LeniaMono-Medium.ttf']])
    css += `@font-face{font-family:"Lenia Mono";src:url(data:font/ttf;base64,${b64(path.join(process.env.LENIA, f))}) format("truetype");font-weight:${w}}`;
  if (css) await p.addStyleTag({ content: css });
  await p.evaluate(async () => {
    for (const f of ['400 46px "Standerd"', '500 17px "Lenia Mono"', '400 17px "Lenia Mono"']) await document.fonts.load(f).catch(() => {});
  });
  for (let i = 0; i < Math.round(DUR * FPS); i++) {
    const url = await p.evaluate(t => { window.navePasos.seek(t); return document.getElementById('cv').toDataURL('image/png'); }, i / FPS);
    fs.writeFileSync(path.join(OUT, `f${String(i).padStart(4, '0')}.png`), Buffer.from(url.split(',')[1], 'base64'));
  }
  await b.close();
})();
