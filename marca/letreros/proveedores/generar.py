# Genera el paquete de archivos para proveedores de rótulos (SVG a escala 1:1 en milímetros).
# Uso: STANDERD=/ruta/StanderdVF.ttf python3 generar.py
# La fuente con licencia solo se usa para convertir el texto en contornos; no se copia aquí.
import os, re, json, math
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, '..', '..'))
CREMA, IGN, AMBAR, GUIA = '#FFF5EE', '#E55C41', '#EFA441', '#00A3FF'

def lienzo(nombre, w, h, titulo, capas, notas):
    """SVG en mm: viewBox en mm y width/height con unidad para que Illustrator/Corel lo abran a tamaño real."""
    cota = (f'<g id="COTAS" inkscape:label="COTAS (no fabricar)" inkscape:groupmode="layer" fill="none" stroke="{GUIA}" stroke-width="1">'
            f'<rect x="0" y="0" width="{w}" height="{h}" stroke-dasharray="8 6"/>'
            f'<text x="0" y="-12" font-family="Arial" font-size="18" fill="{GUIA}" stroke="none">{titulo} · {w:g} × {h:g} mm · escala 1:1</text>'
            + ''.join(f'<text x="0" y="{h + 30 + i * 24}" font-family="Arial" font-size="16" fill="{GUIA}" stroke="none">{n}</text>' for i, n in enumerate(notas))
            + '</g>')
    svg = (f'<?xml version="1.0" encoding="UTF-8"?>\n'
           f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" '
           f'width="{w + 80}mm" height="{h + 80 + 24 * len(notas)}mm" viewBox="-40 -40 {w + 80} {h + 80 + 24 * len(notas)}">\n'
           f'<title>{titulo}</title>\n' + capas + '\n' + cota + '\n</svg>\n')
    open(os.path.join(AQUI, nombre), 'w').write(svg)
    print('·', nombre)

# ── L02 · matriz de LED del símbolo ──────────────────────────────────────────
pts = [tuple(map(float, p.split(','))) for p in open(os.path.join(AQUI, 'l02-puntos-figma.txt')).read().strip().split(';')]
W2 = 1600; esc = (W2 - 40) / 507.42          # el símbolo ocupa 1560 mm dentro del panel de 1600
off = (W2 - 507.42 * esc) / 2, (W2 - 512.67 * esc) / 2
leds = [(off[0] + x * esc, off[1] + y * esc) for x, y in pts]
# orden de encendido: el de la trayectoria del símbolo (posición 0–1 del punto más cercano del símbolo de 1 018 puntos)
act = open(os.path.join(RAIZ, 'pelicula-marca', 'activos.js')).read()
P = json.loads(re.search(r'PUNTOS = (\[.*?\]);', act).group(1))
sim = [(P[i] * 507.42 / 200, P[i + 1] * 512.67 / 200, P[i + 2]) for i in range(0, len(P), 3)]
orden = []
for k, (x, y) in enumerate(pts):
    s = min(sim, key=lambda q: (q[0] - x) ** 2 + (q[1] - y) ** 2)[2]
    orden.append((s, k))
orden.sort()
num = {k: i + 1 for i, (_, k) in enumerate(orden)}
paso = 16.77 * esc
capa_leds = (f'<g id="LEDS" inkscape:label="LEDS Ø12 mm · ignición" inkscape:groupmode="layer" fill="{IGN}">'
             + ''.join(f'<circle id="led-{num[k]:03d}" cx="{x:.1f}" cy="{y:.1f}" r="6"/>' for k, (x, y) in enumerate(leds)) + '</g>')
capa_num = (f'<g id="NUMERACION" inkscape:label="NUMERACIÓN (orden de encendido, no fabricar)" inkscape:groupmode="layer" '
            f'font-family="Arial" font-size="9" fill="{GUIA}" text-anchor="middle">'
            + ''.join(f'<text x="{x:.1f}" y="{y + 18:.1f}">{num[k]}</text>' for k, (x, y) in enumerate(leds)) + '</g>')
capa_panel = f'<g id="PANEL" inkscape:label="PANEL negro mate (corte)" inkscape:groupmode="layer" fill="none" stroke="#000" stroke-width="1"><rect x="0" y="0" width="{W2}" height="{W2}" rx="0"/></g>'
lienzo('L02-matriz-led-simbolo.svg', W2, W2, 'NAVE · L02 · Matriz LED del símbolo', capa_panel + capa_leds + capa_num,
       [f'{len(leds)} LED Ø12 mm color ignición (#E55C41 · RAL 2012 aprox.) sobre panel negro mate 1600 × 1600 mm, detrás del vidrio.',
        f'Retícula hexagonal: paso {paso:.1f} mm entre centros. Centros de perforación = centros de los círculos.',
        'Animación: encender en el orden de la capa NUMERACIÓN (1 → %d) en 6 s; luego fijo. Ver L02-orden-encendido.csv.' % len(leds)])
with open(os.path.join(AQUI, 'L02-orden-encendido.csv'), 'w') as f:
    f.write('led,x_mm,y_mm,inicio_s\n')
    for k, (x, y) in sorted(enumerate(leds), key=lambda kv: num[kv[0]]):
        f.write(f'{num[k]},{x:.1f},{y:.1f},{(num[k] - 1) / len(leds) * 6:.3f}\n')

# ── L06 · logotipo en letras corpóreas ───────────────────────────────────────
logo = open(os.path.join(RAIZ, 'logotipo', 'nave-principal-crema.svg')).read()
paths = re.findall(r'<path[^>]* d="([^"]+)"', logo)
W6 = 2200; e6 = W6 / 467; H6 = 308 * e6
grupos = {'EST': [], 'NAVE': [], 'CAFE': []}
for i, d in enumerate(paths):
    grupos['NAVE' if i < 4 else 'EST' if i < 12 else 'CAFE'].append(d)
etiquetas = {'NAVE': 'NAVE · acrílico 30 mm', 'EST': 'EST. 2026 · acrílico 10 mm', 'CAFE': 'Café · acrílico 20 mm'}
capas6 = ''.join(f'<g id="{g}" inkscape:label="{etiquetas[g]}" inkscape:groupmode="layer" fill="{CREMA}" stroke="#000" stroke-width="0.6" transform="scale({e6:.5f})">'
                 + ''.join(f'<path d="{d}"/>' for d in grupos[g]) + '</g>' for g in ('EST', 'NAVE', 'CAFE'))
lienzo('L06-letras-corporeas-logotipo.svg', W6, round(H6, 1), 'NAVE · L06 · Letras corpóreas retroiluminadas', capas6,
       ['Acrílico opal crema (#FFF5EE · Pantone 9224 C aprox.), caras planas; cantos del mismo color.',
        'Retroiluminación LED 2700 K hacia el muro (halo ámbar). Separadores de 40 mm. El contorno negro es la línea de corte.',
        'Espesores: NAVE 30 mm · Café 20 mm · EST. 2026 10 mm. Las letras de “Café” son una sola pieza unida; la tilde va aparte.'])

# ── L05 · neón «Houston, tenemos una idea.» ──────────────────────────────────
ttf = os.environ.get('STANDERD')
if not ttf:
    print('L05 omitido: defina STANDERD con la ruta a StanderdVF.ttf'); raise SystemExit
f = instantiateVariableFont(TTFont(ttf), {'wght': 700})
gs, cmap, hmtx, upm = f.getGlyphSet(), f.getBestCmap(), f['hmtx'], f['head'].unitsPerEm
lineas = ['Houston,', 'tenemos', 'una idea.']
track = -0.02 * upm; interl = 0.98 * upm
cuerpos = []
for li, txt in enumerate(lineas):
    x = 0; ds = []
    for ch in txt:
        g = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[g].draw(TransformPen(pen, (1, 0, 0, -1, x, li * interl)))
        if pen.getCommands(): ds.append(pen.getCommands())
        x += hmtx[g][0] + track
    cuerpos.append(' '.join(ds))
bp = BoundsPen(gs)
for li, txt in enumerate(lineas):
    x = 0
    for ch in txt:
        g = cmap[ord(ch)]; gs[g].draw(TransformPen(bp, (1, 0, 0, -1, x, li * interl))); x += hmtx[g][0] + track
x0, y0, x1, y1 = bp.bounds
W5, H5 = 2000, 800
e5 = min((W5 - 200) / (x1 - x0), (H5 - 100) / (y1 - y0))
tx, ty = (W5 - (x1 - x0) * e5) / 2 - x0 * e5, (H5 - (y1 - y0) * e5) / 2 - y0 * e5
capa5 = (f'<g id="NEON" inkscape:label="NEÓN relleno crema 3000 K" inkscape:groupmode="layer" fill="{CREMA}" stroke="#000" stroke-width="0.6" '
         f'transform="translate({tx:.2f} {ty:.2f}) scale({e5:.5f})">' + ''.join(f'<path d="{d}"/>' for d in cuerpos) + '</g>')
capa5b = f'<g id="BASE" inkscape:label="BASE acrílico transparente 8 mm (corte, contorno a 15 mm)" inkscape:groupmode="layer" fill="none" stroke="#000" stroke-width="1"><rect x="0" y="0" width="{W5}" height="{H5}" rx="40"/></g>'
lienzo('L05-neon-houston.svg', W5, H5, 'NAVE · L05 · Neón «Houston, tenemos una idea.»', capa5b + capa5,
       ['Neón flex LED relleno, crema 3000 K, siguiendo los contornos de la capa NEÓN (letra Standerd en contorno, peso 700).',
        f'Altura de mayúscula: {round(f["OS/2"].sCapHeight * e5)} mm. Grosor de trazo mínimo para el flex: revisar «i» y puntos. Halo: perfil difusor que tiña de ignición (#E55C41) hacia el muro.',
        'Montaje sobre acrílico transparente 8 mm con separadores de 25 mm, sobre ladrillo pintado tueste. Transformador oculto tras la barra.'])
