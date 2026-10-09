# Tramas de las piezas de prueba (página «Pruebas») y la señalética: teselas de micropunto,
# serie «Entre», historia de evento, etiqueta, tote, vaso, membresía, variantes y movimiento.
# Uso: python3 generar_piezas.py && node rasterizar.js
import json, math, os, random
from PIL import Image, ImageFilter, ImageOps

D = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(D, 'svg'); os.makedirs(OUT, exist_ok=True)
C = dict(crema='#FFF5EE', niebla='#D7E1E2', espacio='#012436', tueste='#210A05', ignicion='#E55C41',
         ambar='#EFA441', acero='#798E91', petroleo='#005A88', senal='#0067DE', blanco='#FFFFFF')
MAN = []

def hexgrid(W, H, s, pad=1, square=False):
    rs = s if square else s * math.sqrt(3) / 2
    j = 0; y = rs / 2
    while y < H + rs * pad:
        off = 0 if square else (j % 2) * s / 2
        x = off - s * pad + s / 2
        while x < W + s * pad:
            yield x, y, j
            x += s
        y += rs; j += 1

def write(name, W, H, dots, shape='c'):
    by = {}
    for x, y, r, c in dots:
        if r < .3: continue
        el = f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.2f}"/>' if shape == 'c' else f'<rect x="{x-r:.1f}" y="{y-r:.1f}" width="{2*r:.2f}" height="{2*r:.2f}"/>'
        by.setdefault(c, []).append(el)
    body = ''.join(f'<g fill="{c}">{"".join(v)}</g>' for c, v in by.items())
    open(os.path.join(OUT, name + '.svg'), 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{body}</svg>')
    MAN.append({'name': name, 'w': W, 'h': H, 'n': sum(len(v) for v in by.values())})

def sstep(a, b, t):
    t = max(0, min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t)

def esfera(u, v, cx=.5, cy=.5, R=.36, lx=-.55, ly=-.62, ar=1.0):
    dx, dy = (u - cx) / R * ar, (v - cy) / R; d2 = dx * dx + dy * dy
    if d2 > 1: return 0
    z = math.sqrt(1 - d2); n = (dx * lx + dy * ly + z * .56) / math.sqrt(lx * lx + ly * ly + .56 * .56)
    return max(.05, min(.9, .08 + .9 * n))

def field(name, W, H, sep, f, col, rmax=.46, colf=None, square=False, shape='c', jitter=0, seed=1):
    rnd = random.Random(seed); dots = []
    for x, y, j in hexgrid(W, H, sep, square=square):
        v = f(x / W, y / H)
        if v <= .02: continue
        px, py = x, y
        if jitter: px += (rnd.random() - .5) * sep * jitter; py += (rnd.random() - .5) * sep * jitter
        dots.append((px, py, rmax * sep * math.sqrt(min(1, v)), colf(x / W, y / H, v) if colf else col))
    write(name, W, H, dots, shape)

# Teselas de micropunto (fondo de toda la superficie), a 4x para usar en relleno TILE con escala .25
def tesela(name, col, s=15, r=1.15, k=4):
    W, H = s * k, round(2 * s * math.sqrt(3) / 2) * k; rs = H / 2
    dots = [(W / 2, rs / 2, r * k, col), (0, rs * 1.5, r * k, col), (W, rs * 1.5, r * k, col)]
    write(name, W, H, dots)
for n, c in [('tesela-crema', C['crema']), ('tesela-espacio', C['espacio']), ('tesela-tueste', C['tueste'])]: tesela(n, c)

# Serie «Entre» · 2: ambición y conocimiento → volcán que asciende (Espacio sobre Niebla)
def volcan(u, v, cx=.5, base=.86, top=.2, w=.46):
    if v < top or v > base: return 0
    t = (v - top) / (base - top); half = .03 + w * t ** 1.15
    if abs(u - cx) > half: return 0
    return .12 + .8 * t ** .9 * (1 - .35 * abs(u - cx) / half)
field('entre-volcan', 1080, 1350, 15, lambda u, v: volcan(u, v, .5, .82, .26, .4), C['espacio'],
      colf=lambda u, v, t: C['ignicion'] if (abs(u - .5) < .012 and .25 < v < .3) else C['espacio'])
# Serie «Entre» · 3: la Tierra y las estrellas → horizonte abajo y estrellas arriba (Crema sobre Espacio)
def horizonte(u, v):
    d = math.hypot((u - .5) * 1.0, v - 2.05)
    if d < 1.22: return .1 + .75 * sstep(.82, 1.22, d) ** 2
    return 0
field('entre-horizonte', 1080, 1350, 14, horizonte, C['crema'])
rnd = random.Random(5)
write('entre-estrellas', 1080, 1350, [(rnd.random() * 1080, rnd.random() * 900, rnd.random() ** 3 * 3 + .7, C['crema']) for _ in range(220)])

# Historia de evento 1080×1920: columna de empuje vertical
def pluma_v(u, v):
    top = .3
    if v < top: return 0
    t = (v - top) / (1 - top)
    w = .02 + .08 * t ** 1.4 + .5 * sstep(.7, 1, t) ** 1.3
    core = math.exp(-((u - .5) / w) ** 2) * (.45 + .55 * t ** .45)
    n = .5 + .5 * math.sin(u * 41 + v * 17) * math.sin(u * 23 - v * 29)
    cloud = sstep(.66, 1, t) * math.exp(-((u - .5) / (.2 + .6 * sstep(.72, 1, t))) ** 2) * (.6 + .4 * n)
    return max(core, cloud)
field('historia-pluma', 1080, 1920, 15, pluma_v, C['ignicion'], jitter=.25, seed=4,
      colf=lambda u, v, t: C['crema'] if (t > .93 and v < .62) else (C['ambar'] if t > .7 else C['ignicion']))

# Etiqueta de café (900×1300): volcán de la finca en Tueste
field('etiqueta-volcan', 900, 700, 12, lambda u, v: volcan(u, v, .5, .98, .08, .48), C['tueste'])
# Tote 1 tinta (760×840): símbolo grande en trama sobre algodón
_src = open(os.path.join(D, 'simbolo.py')).read()
_ns = {}; exec(_src[:_src.index('def ring_d')], _ns); SHAPE = _ns['shape']
from shapely.geometry import Point as _P
def sym_field(name, W, H, sep, col, scale=.86, cx=.5, cy=.5, grad=False):
    S = min(W, H) * scale; dots = []
    for x, y, j in hexgrid(W, H, sep, 0):
        u, v = (x - (W * cx - S / 2)) / S * 200, (y - (H * cy - S / 2)) / S * 200
        if SHAPE.contains(_P(u, v)):
            t = (y / H) if grad else 1
            dots.append((x, y, .44 * sep * math.sqrt(.25 + .75 * t), col))
    write(name, W, H, dots)
sym_field('tote-simbolo', 760, 840, 13, C['espacio'], .78, .5, .44, grad=True)
sym_field('wall-simbolo', 1920, 1080, 12, C['ignicion'], .7, .64, .5)
# Vaso desplegado: trama que asciende en franja (1600×560)
field('vaso-trama', 1600, 560, 12, lambda u, v: (1 - sstep(.0, .95, v)) ** 1.3 * (.6 + .4 * math.sin(u * math.pi * 6) ** 2), C['ignicion'])
# Membresía: tres órbitas punteadas y planeta (1080×1080 dentro de 1080×1350)
def orbitas(u, v):
    p = esfera(u, v, .5, .5, .13)
    rings = 0
    for R, a in [(.26, .9), (.36, .7), (.46, .5)]:
        rings = max(rings, math.exp(-((math.hypot(u - .5, (v - .5) * 1.9) - R) / .006) ** 2) * a)
    return max(p, rings)
field('membresia-orbitas', 1080, 1080, 9, orbitas, C['espacio'])
# LinkedIn 1584×396: horizonte de planeta a la derecha
field('linkedin-horizonte', 1584, 396, 10, lambda u, v: (lambda d: (.1 + .75 * sstep(.6, 1.0, d) ** 2) if d < 1.0 else 0)(math.hypot((u - .82) * 4, v - 1.5) / 1.0), C['crema'])
# Variantes de retícula y punto (540×540): misma esfera
for nm, sq, sh in [('var-hex-circulo', False, 'c'), ('var-cuad-circulo', True, 'c'), ('var-hex-cuadro', False, 's'), ('var-cuad-cuadro', True, 's')]:
    field(nm, 540, 540, 14, lambda u, v: esfera(u, v, .5, .5, .4), C['espacio'], square=sq, shape=sh, rmax=.46 if sh == 'c' else .4)
# Movimiento: la trama se presuriza (6 cuadros 540×540)
for k, p in enumerate([.12, .3, .5, .72, .95]):
    field(f'mov-{k+1}', 540, 540, 12, lambda u, v, p=p: max(0, 1 - math.hypot(u - .5, v - .5) / (.1 + .5 * p)) ** .7 * (.25 + .75 * p), C['ignicion'])
# Señalética: trama de privacidad para vinil de vidrio (600×800, densa abajo)
field('vinil-privacidad', 600, 800, 10, lambda u, v: .15 + .85 * sstep(.25, .9, v), C['espacio'], rmax=.42)

json.dump(MAN, open(os.path.join(D, 'manifest.json'), 'w'), indent=1)
print('\n'.join(f"{m['name']}: {m['w']}x{m['h']} · {m['n']}" for m in MAN))
