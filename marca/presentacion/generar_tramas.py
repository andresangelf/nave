# Tramas de la presentación «Bitácora de despegue»: genera SVG de puntos (retícula hexagonal de la marca)
# y un manifiesto; `node rasterizar.js` los pasa a PNG transparente a 2x para Figma.
# Uso: python3 generar_tramas.py && node rasterizar.js [nombre ...]
import json, math, os, random, re, sys
from PIL import Image, ImageFilter, ImageOps

D = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(D, 'svg'); os.makedirs(OUT, exist_ok=True)
C = dict(crema='#FFF5EE', niebla='#D7E1E2', espacio='#012436', tueste='#210A05', ignicion='#E55C41',
         ambar='#EFA441', acero='#798E91', petroleo='#005A88', senal='#0067DE', noche='#00131D')
MAN = []

def hexgrid(W, H, s, pad=1):
    rs = s * math.sqrt(3) / 2
    j = 0; y = rs / 2
    while y < H + rs * pad:
        off = (j % 2) * s / 2
        x = off - s * pad + s / 2
        while x < W + s * pad:
            yield x, y, j
            x += s
        y += rs; j += 1

def write(name, W, H, dots, extra=''):
    """dots: iterable of (x, y, r, color). Agrupa por color para un SVG liviano."""
    by = {}
    for x, y, r, c in dots:
        if r < .3: continue
        by.setdefault(c, []).append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.2f}"/>')
    body = ''.join(f'<g fill="{c}">{"".join(v)}</g>' for c, v in by.items())
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{extra}{body}</svg>'
    open(os.path.join(OUT, name + '.svg'), 'w').write(svg)
    MAN.append({'name': name, 'w': W, 'h': H, 'n': sum(len(v) for v in by.values())})

def sstep(a, b, t):
    t = max(0, min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t)

# ——— Fotos a trama ———
def photo(name, src, W, H, sep, fg, accent=None, acc_th=.92, focus=(.5, .5), gamma=1.0, contrast=1.15, lift=0.0, rmax=.46, invert=False):
    im = Image.open(os.path.join(D, 'fotos', src.replace('.png', '.jpg'))).convert('L')
    iw, ih = im.size; ar = W / H
    if iw / ih > ar: cw, ch = ih * ar, ih
    else: cw, ch = iw, iw / ar
    cx = min(max(focus[0] * iw, cw / 2), iw - cw / 2); cy = min(max(focus[1] * ih, ch / 2), ih - ch / 2)
    im = im.crop((int(cx - cw / 2), int(cy - ch / 2), int(cx + cw / 2), int(cy + ch / 2))).resize((W, H), Image.LANCZOS)
    im = ImageOps.autocontrast(im, cutoff=1).filter(ImageFilter.GaussianBlur(sep * .35))
    px = im.load(); dots = []
    for x, y, _ in hexgrid(W, H, sep, 0):
        L = px[min(W - 1, max(0, int(x))), min(H - 1, max(0, int(y)))] / 255
        v = 1 - L if invert else L
        v = max(0, min(1, (v - .5) * contrast + .5 + lift)) ** gamma
        r = rmax * sep * math.sqrt(v)
        col = accent if (accent and L > acc_th and not invert) else fg
        dots.append((x, y, r, col))
    write(name, W, H, dots)

photo('ph-mesa', 'mesa.png', 560, 760, 10, C['crema'], focus=(.62, .55), gamma=1.2, contrast=1.35)
photo('ph-conversacion', 'conversacion.png', 560, 760, 10, C['crema'], focus=(.47, .5), gamma=1.1, contrast=1.35)
photo('ph-herramienta', 'herramienta.png', 560, 760, 10, C['crema'], focus=(.6, .5), gamma=1.0, contrast=1.3)
photo('ph-luz', 'luz.png', 1920, 1080, 12, C['crema'], C['ambar'], acc_th=.8, gamma=1.25, contrast=1.25)
photo('ph-espacio', 'espacio.png', 960, 1080, 10, C['espacio'], None, focus=(.55, .5), invert=True, gamma=1.1, contrast=1.2)
photo('ph-noche', 'noche.png', 1920, 1080, 12, C['crema'], C['ambar'], acc_th=.7, gamma=.75, contrast=1.5, lift=.06)
photo('ph-luz-split', 'luz.png', 960, 1080, 10, C['crema'], C['ambar'], acc_th=.8, focus=(.62, .5), gamma=1.25, contrast=1.25)

# ——— Campos narrativos ———
def field(name, W, H, sep, f, col, rmax=.46, jitter=0, seed=1, colf=None):
    rnd = random.Random(seed); dots = []
    for x, y, j in hexgrid(W, H, sep):
        v = f(x / W, y / H)
        if v <= 0.02: continue
        px, py = x, y
        if jitter: px += (rnd.random() - .5) * sep * jitter; py += (rnd.random() - .5) * sep * jitter
        dots.append((px, py, rmax * sep * math.sqrt(min(1, v)), colf(x / W, y / H, v) if colf else col))
    write(name, W, H, dots)

# P3 · presión: los bordes empujan hacia el centro
def presion(u, v):
    e = min(u, 1 - u) * 1.78, min(v, 1 - v)
    d = min(e[0], e[1]) * 2
    return (1 - sstep(0, .62, d)) ** 1.3
field('presion', 1920, 1080, 22, presion, C['espacio'], rmax=.48)

# P4 · presión regulada: caos a la izquierda, orden a la derecha
rnd = random.Random(7); dots = []
for x, y, j in hexgrid(1920, 1080, 20):
    t = sstep(.2, .72, x / 1920)
    chaos = 1 - t
    px = x + (rnd.random() - .5) * 40 * chaos; py = y + (rnd.random() - .5) * 40 * chaos
    if chaos > .05 and rnd.random() < .35 * chaos: continue
    fade = 1 - sstep(.5, .66, y / 1080)
    if fade <= .02: continue
    rr = (rnd.random() ** 2 * 9 + 1) * chaos + t * (2.4 + 2.2 * (.5 + .5 * math.sin(y / 1080 * math.pi * 2 + x / 380)))
    col = C['ignicion'] if (.35 < x / 1920 < .62 and rnd.random() < .18) else C['crema']
    dots.append((px, py, rr * fade, col))
write('regulada', 1920, 1080, dots)

# Tríptico de condiciones (560×560): vacío, océano, vida
def esfera(u, v, cx=.5, cy=.5, R=.36, lx=-.55, ly=-.62):
    dx, dy = (u - cx) / R, (v - cy) / R; d2 = dx * dx + dy * dy
    if d2 > 1: return 0
    z = math.sqrt(1 - d2); n = (dx * lx + dy * ly + z * .56) / math.sqrt(lx * lx + ly * ly + .56 * .56)
    return max(.05, min(.9, .08 + .9 * n))
def vacio(u, v):
    s = esfera(u, v, .5, .5, .17)
    a = math.atan2(v - .5, (u - .5) / 2.3); rr = math.hypot((u - .5) / 2.3, v - .5)
    ring = math.exp(-((math.hypot((u - .5), (v - .5) * 2.6) - .4) / .018) ** 2) * (.55 + .45 * (u > .5))
    return max(s, ring)
field('c-vacio', 560, 560, 10, vacio, C['crema'], rmax=.46)
def oceano(u, v):
    if v < .18: return .08 if (int(u * 56) % 2 == 0 and v > .16) else 0
    return .08 + .74 * sstep(.18, 1, v) ** .8
field('c-oceano', 560, 560, 10, oceano, C['crema'], rmax=.46, colf=lambda u, v, t: C['senal'] if (math.sin(u * 913.7 + v * 377.1) * 43758.5) % 1 < sstep(.45, 1, v) ** 1.5 else C['crema'])
field('c-vida', 560, 560, 10, lambda u, v: esfera(u, v, .5, .52, .34), C['crema'], rmax=.46,
      colf=lambda u, v, t: C['crema'])

# Símbolo de mil puntos (ventana 900×900): la geometría sale de simbolo.py
_src = open(os.path.join(D, 'simbolo.py')).read()
_ns = {}; exec(_src[:_src.index('def ring_d')], _ns); SHAPE = _ns['shape']
from shapely.geometry import Point as _P
def symbol_dots(name, W, sep_units, col, rr=.32, pad=40):
    k = (W - 2 * pad) / 200; dots = []
    for x, y, j in hexgrid(200, 200, sep_units, 0):
        if SHAPE.contains(_P(x, y)): dots.append((pad + x * k, pad + y * k, rr * sep_units * k, col))
    write(name, W, W, dots); return len(dots)
N1000 = symbol_dots('simbolo-mil', 900, 4.55, C['ignicion'])
print('simbolo-mil', N1000)

# Póster de capas (640×800): trama que asciende y cuerpo
field('poster-trama', 640, 800, 16, lambda u, v: (1 - sstep(0, .78, v)) ** 1.6 * .95, C['ignicion'], rmax=.5)
field('poster-cuerpo', 640, 800, 9, lambda u, v: esfera(u, v * 1.25, .62, .46, .3), C['crema'], rmax=.46,
      colf=lambda u, v, t: C['crema'])

# Controles (480×480): separación, tamaño y densidad, desplazamiento
field('ct-sep-a', 480, 480, 10, lambda u, v: esfera(u, v, .5, .5, .4), C['espacio'], rmax=.46)
field('ct-sep-b', 480, 480, 24, lambda u, v: esfera(u, v, .5, .5, .4), C['espacio'], rmax=.46)
field('ct-densidad', 480, 480, 12, lambda u, v: esfera(u, v, .5, .5, .4) * (1 - sstep(.1, .95, v)) ** .7 + .0, C['espacio'], rmax=.46)
def lens_field(name, W, H, sep, f, col, lx, ly, LR, k):
    dots = []
    for x, y, j in hexgrid(W, H, sep):
        v = f(x / W, y / H)
        if v <= .02: continue
        dx, dy = x - lx, y - ly; e = math.exp(-(dx * dx + dy * dy) / (2 * LR * LR)); p = 1 + .8 * k * e
        dots.append((lx + dx * p, ly + dy * p, .46 * sep * math.sqrt(v) * (1 + 1.1 * k * e), col))
    write(name, W, H, dots)
lens_field('ct-lente', 480, 480, 12, lambda u, v: esfera(u, v, .5, .5, .4), C['espacio'], 300, 190, 90, .9)

# T–00 · despegue: columna de empuje que se abre al tocar tierra
def pluma(u, v):
    top = .22
    if v < top: return 0
    t = (v - top) / (1 - top)
    w = .018 + .07 * t ** 1.4 + .42 * sstep(.66, 1, t) ** 1.3
    n = .5 + .5 * math.sin(u * 47 + v * 13) * math.sin(u * 19 - v * 31)
    core = math.exp(-((u - .5) / w) ** 2) * (.45 + .55 * t ** .45)
    cloud = sstep(.62, 1, t) * math.exp(-((u - .5) / (.16 + .55 * sstep(.7, 1, t))) ** 2) * (.6 + .4 * n)
    return max(core, cloud)
field('despegue', 1920, 1080, 14, pluma, C['ignicion'], rmax=.46, jitter=.25, seed=3,
      colf=lambda u, v, t: C['crema'] if (t > .93 and v < .7) else (C['ambar'] if t > .7 else C['ignicion']))

# Órbita: horizonte de planeta y anillo punteado
def orbita(u, v):
    hx, hy, R = .5, 2.15, 1.32
    d = math.hypot((u - hx) * 1.78, v - hy)
    planet = 0
    if d < R:
        planet = .12 + .7 * sstep(R - .5, R, d) ** 2
    ring = math.exp(-((math.hypot((u - .5) * 1.78, (v - .62) * 3.4) - 1.05) / .012) ** 2) * .7
    return max(planet, ring)
field('orbita', 1920, 1080, 14, orbita, C['crema'], rmax=.48)

# Distancia del manifiesto: estrellas sueltas (fondo de Tierra y estrellas)
rnd = random.Random(11)
write('estrellas', 1920, 1080, [(rnd.random() * 1920, rnd.random() * 1080 * (.2 + .8 * rnd.random()), rnd.random() ** 3 * 2.4 + .5, C['crema']) for _ in range(260)])

json.dump(MAN, open(os.path.join(D, 'manifest.json'), 'w'), indent=1)
print('\n'.join(f"{m['name']}: {m['w']}x{m['h']} · {m['n']} puntos" for m in MAN))
