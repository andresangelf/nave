"""Genera logotipo/familia/: Nave, Nave Café, Nave Systems y Nave Academy en versión completa,
mínima horizontal y símbolo. Geometría de Nave — Identidad Visual (Branding 61:66 y 136:113):
identificador a 2X; completa con mayúscula ≈ 0,57 × NΛVE alineada al final de NΛVE;
horizontal con mayúscula = altura de NΛVE. Identificadores en DM Sans contorneada (exportada de Figma)."""
import json, pathlib, re
A = pathlib.Path(__file__).parent; OUT = A.parent / 'logotipo' / 'familia'; OUT.mkdir(parents=True, exist_ok=True)
L = json.loads((A / 'logotipo-f1.json').read_text())['principal']
S, W = L['s'], L['d']
SCRIPT = re.findall(r'd="([^"]+)"', (A / 'cafe-trazo.svg').read_text())
ID = json.loads((A / 'identificadores-dmsans.json').read_text())
C = dict(espacio='#012436', crema='#FFF5EE', ignicion='#E55C41', ambar='#EFA441', petroleo='#005A88')
k = 201 / 396.77
def word(fill, dx=0, dy=0): return f'<g fill="{fill}" transform="translate({dx} {dy})">' + ''.join(f'<path d="{d}"/>' for d in W) + '</g>'
def sym(fill, s=1): return f'<path fill="{fill}" transform="scale({s:.6f})" d="{S}"/>'
def svg(w, h, body, title): return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" width="{w:.0f}" height="{h:.0f}"><title>{title}</title>{body}</svg>\n'
def script(fill, s, tx, ty): return f'<g fill="{fill}" transform="translate({tx:.2f} {ty:.2f}) scale({s:.5f}) translate(-99 -200)">' + ''.join(f'<path d="{d}"/>' for d in SCRIPT) + '</g>'
MARCAS = {
  'nave': ('Nave', C['espacio'], None), 'nave-cafe': ('Nave Café', C['ignicion'], 'cafe'),
  'nave-systems': ('Nave Systems', C['petroleo'], 'SYSTEMS'), 'nave-academy': ('Nave Academy', C['ambar'], 'ACADEMY')}
for slug, (nombre, acc, idf) in MARCAS.items():
  for tema, ink, a in [('claro', C['espacio'], acc), ('oscuro', C['crema'], {C['espacio']: C['crema'], C['petroleo']: C['crema']}.get(acc, acc))]:
    # completa
    body = sym(a) + word(ink); w, h = 1346, 397
    if idf == 'cafe':
      body += script(a, 1.731, 538.13 + 99 * 1.731, 97.92 + (200 - 58.9) * 1.731); h = 342.2 + 109 * 1.731
    elif idf:
      body += f'<path fill="{ink}" d="{ID[idf]["d"]}"/>'; h = 487
    open(OUT / f'{slug}-completa-{tema}.svg', 'w').write(svg(w, h, body, nombre))
    # mínima horizontal
    body = sym(a, k) + word(ink, 236 - 538.13, -97.92); w, h = 1044, 201
    if idf == 'cafe':
      s = 0.86 * 201 / 109; body += script(a, s, 1044 + 70.72, 201 - 109 * s); w = 1044 + 70.72 + 260 * s
    elif idf:
      x0, y0, y1 = ID[idf]['x0'], 369.71, 484.51; s = 201 / (y1 - y0)
      body += f'<path fill="{ink}" transform="translate({1044 + 70.72 - x0 * s:.3f} {-y0 * s:.3f}) scale({s:.5f})" d="{ID[idf]["d"]}"/>'; w = 1044 + 70.72 + (ID[idf]['x1'] - x0) * s
    open(OUT / f'{slug}-horizontal-{tema}.svg', 'w').write(svg(w, h, body, nombre))
    open(OUT / f'{slug}-simbolo-{tema}.svg', 'w').write(svg(397, 397, sym(a), nombre + ' · símbolo'))
print(len(list(OUT.glob('*.svg'))), 'archivos')
