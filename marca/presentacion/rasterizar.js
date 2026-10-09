const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const D = __dirname, man = JSON.parse(fs.readFileSync(D + '/manifest.json'));
  const only = process.argv.slice(2);
  const b = await chromium.launch();
  for (const m of man) {
    if (only.length && !only.includes(m.name)) continue;
    const p = await b.newPage({ viewport: { width: m.w, height: m.h }, deviceScaleFactor: 2 });
    const svg = fs.readFileSync(`${D}/svg/${m.name}.svg`, 'utf8');
    await p.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
    await p.locator('svg').screenshot({ path: `${D}/png/${m.name}.png`, omitBackground: true });
    await p.close();
  }
  await b.close();
})();
