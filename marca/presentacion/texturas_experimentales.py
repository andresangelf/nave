# Texturas de la página «Exploración · experimental»: foto que se vuelve trama, duotono Espacio–Ámbar,
# riso a dos tintas, fotocopia, hoja de contactos y sello de puntos en kraft.
# Uso: python3 texturas_experimentales.py  (salida en experimental/)
import math, os, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps, ImageChops

D = os.path.dirname(os.path.abspath(__file__))
import sys; sys.path.insert(0, D)
from revelado import revelar  # noqa: E402
OUT = os.path.join(D, 'experimental'); os.makedirs(OUT, exist_ok=True)
HEX = lambda h: tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))
C = dict(crema=HEX('#FFF5EE'), espacio=HEX('#012436'), tueste=HEX('#210A05'), ign=HEX('#E55C41'), ambar=HEX('#EFA441'),
         petroleo=HEX('#005A88'), senal=HEX('#0067DE'), niebla=HEX('#D7E1E2'))
rng = np.random.default_rng(11)

def crop(im, W, H, fx=.5, fy=.5):
    iw, ih = im.size; ar = W / H
    cw, ch = (ih * ar, ih) if iw / ih > ar else (iw, iw / ar)
    cx = min(max(fx * iw, cw / 2), iw - cw / 2); cy = min(max(fy * ih, ch / 2), ih - ch / 2)
    return im.crop((int(cx - cw / 2), int(cy - ch / 2), int(cx + cw / 2), int(cy + ch / 2))).resize((W, H), Image.LANCZOS)

def hexpts(W, H, s):
    rs = s * math.sqrt(3) / 2; j = 0; y = rs / 2
    while y < H + rs:
        x = (j % 2) * s / 2
        while x < W + s:
            yield x, y
            x += s
        y += rs; j += 1

def dots(W, H, s, val, col, bg=None, k=3, rmax=.46, offset=(0, 0)):
    """Dibuja puntos con supermuestreo; val(x, y) -> 0..1."""
    im = Image.new('RGBA', (W * k, H * k), bg + (255,) if bg else (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    for x, y in hexpts(W, H, s):
        v = val(x, y)
        if v <= .02: continue
        r = rmax * s * math.sqrt(min(1, v)) * k; cx, cy = (x + offset[0]) * k, (y + offset[1]) * k
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=col + (255,))
    return im.resize((W, H), Image.LANCZOS)

def grano(im, f=.05):
    a = np.asarray(im).astype(np.float32) / 255
    n = rng.normal(0, f, a.shape[:2])[..., None]
    return Image.fromarray((np.clip(a + n, 0, 1) * 255).astype(np.uint8))

def papel(W, H, base, fibras=.035):
    a = np.ones((H, W, 3), np.float32) * np.array(base, np.float32) / 255
    n = np.asarray(Image.fromarray((rng.normal(.5, .5, (H // 2, W // 2)) * 255).clip(0, 255).astype(np.uint8)).resize((W, H), Image.BICUBIC)).astype(np.float32) / 255
    a = a * (1 - fibras + fibras * 2 * n[..., None])
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))

# E1 · la foto se vuelve trama (1080×1350)
src = crop(revelar(os.path.join(D, 'fotos/estilo/reaccion.jpg'), 'bn'), 1080, 1350, .56, .5)
L = np.asarray(src.convert('L').filter(ImageFilter.GaussianBlur(3))).astype(np.float32) / 255
tr = dots(1080, 1350, 12, lambda x, y: (1 - L[min(1349, int(y)), min(1079, int(x))]) ** 1.1, C['espacio'], C['crema'])
m = np.clip((np.arange(1350) / 1350 - .42) / .2, 0, 1)[:, None, None]
blend = np.asarray(src).astype(np.float32) * (1 - m) + np.asarray(tr.convert('RGB')).astype(np.float32) * m
Image.fromarray(blend.astype(np.uint8)).save(f'{OUT}/e1-foto-trama.jpg', quality=90)

# E2 · duotono Espacio→Ámbar con grano (1080×1350)
src = crop(Image.open(os.path.join(D, 'fotos/estilo/equipo.jpg')).convert('RGB'), 1080, 1350, .5, .5)
l = ImageOps.autocontrast(src.convert('L'), cutoff=1)
a = np.asarray(l).astype(np.float32)[..., None] / 255
duo = np.array(C['espacio'], np.float32) * (1 - a) + np.array(C['ambar'], np.float32) * a
grano(Image.fromarray(duo.astype(np.uint8)), .045).save(f'{OUT}/e2-duotono.jpg', quality=90)

# E4 · riso: dos tintas desfasadas sobre papel (1080×1350)
W, H = 1080, 1350
def esfera(x, y, cx=540, cy=600, R=380):
    dx, dy = (x - cx) / R, (y - cy) / R; d2 = dx * dx + dy * dy
    if d2 > 1: return 0
    z = math.sqrt(1 - d2); n = (-.55 * dx - .62 * dy + .56 * z) / math.sqrt(.55 ** 2 + .62 ** 2 + .56 ** 2)
    return max(.05, min(.92, .1 + .9 * n))
paper = papel(W, H, C['crema'], .05).convert('RGBA')
l1 = dots(W, H, 16, lambda x, y: esfera(x, y), C['ign'])
l2 = dots(W, H, 16, lambda x, y: (1 - esfera(x, y)) * .85 if esfera(x, y) > 0 else 0, C['petroleo'], offset=(6, 5))
riso = ImageChops.multiply(paper, Image.alpha_composite(Image.new('RGBA', (W, H), (255, 255, 255, 255)), l1))
riso = ImageChops.multiply(riso, Image.alpha_composite(Image.new('RGBA', (W, H), (255, 255, 255, 255)), l2))
grano(riso.convert('RGB'), .03).save(f'{OUT}/e4-riso.jpg', quality=90)

# E5 · fotocopia (1080×1350)
src = crop(Image.open(os.path.join(D, 'fotos/estilo/brindis.jpg')).convert('L'), 1000, 760, .5, .45)
x = np.asarray(ImageOps.autocontrast(src, cutoff=2)).astype(np.float32) / 255
x = x + rng.normal(0, .12, x.shape)
tone = (x > .48).astype(np.float32)
tone = np.where(rng.random(tone.shape) < .012, 1 - tone, tone)          # salpicado de tóner
img = Image.fromarray((tone * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(.7)).rotate(-1.3, expand=True, fillcolor=255)
pg = papel(W, H, (246, 243, 236), .03)
pg_np = np.asarray(pg).astype(np.float32)
ph = np.asarray(img.resize((1010, 780))).astype(np.float32)[..., None] / 255
y0, x0 = 300, 35
reg = pg_np[y0:y0 + 780, x0:x0 + 1010]
pg_np[y0:y0 + 780, x0:x0 + 1010] = reg * (ph * .92 + .08 * (1 - ph) * 0 + (1 - ph) * .1)
yy = np.linspace(0, 1, H)[:, None, None]; pg_np *= (1 - .08 * np.abs(yy - .5) * 2)   # sombra de la copiadora
Image.fromarray(np.clip(pg_np, 0, 255).astype(np.uint8)).save(f'{OUT}/e5-fotocopia.jpg', quality=90)

# E6 · hoja de contactos (1080×1350): 3 tiras × 2 cuadros
names = ['reaccion', 'equipo', 'brindis', 'pizarra', 'prototipo', 'cabina']
sheet = papel(W, H, (236, 234, 228), .02)
d = ImageDraw.Draw(sheet)
fw, fh = 440, 293
for k, n in enumerate(names):
    r, q = divmod(k, 2)
    sy = 170 + r * 380
    if q == 0:
        d.rectangle((40, sy, 1040, sy + 350), fill=(18, 16, 14))
        for hx in range(56, 1030, 34):
            d.rounded_rectangle((hx, sy + 10, hx + 18, sy + 24), 3, fill=(236, 234, 228)); d.rounded_rectangle((hx, sy + 326, hx + 18, sy + 340), 3, fill=(236, 234, 228))
    fr = revelar(os.path.join(D, f'fotos/estilo/{n}.jpg'), 'bn', 900)
    fr = crop(fr, fw, fh)
    sheet.paste(fr, (60 + q * (fw + 60), sy + 29))
    d.text((70 + q * (fw + 60), sy + 326 - 2), f'{12 + k}A', fill=C['ambar'])
grano(sheet, .02).save(f'{OUT}/e6-contactos.jpg', quality=90)

# E9 · sello en kraft (1080×1080)
W2 = 1080
kraft = papel(W2, W2, (184, 141, 94), .09)
_ns = {}; _src = open(os.path.join(D, 'simbolo.py')).read(); exec(_src[:_src.index('def ring_d')], _ns)
from shapely.geometry import Point
SH = _ns['shape']
def sello(x, y, S0=560, X0=260, Y0=200):
    u, v = (x - X0) / S0 * 200, (y - Y0) / S0 * 200
    return .9 if SH.contains(Point(u, v)) else 0
st = dots(W2, W2, 13, sello, C['espacio'])
a = np.asarray(st).astype(np.float32)
mask = np.asarray(Image.fromarray((rng.random((W2 // 4, W2 // 4)) * 255).astype(np.uint8)).resize((W2, W2), Image.BICUBIC).filter(ImageFilter.GaussianBlur(6))).astype(np.float32) / 255
a[..., 3] *= np.clip((mask - .18) * 2.8, .3, .97)            # tinta irregular de sello
st = Image.fromarray(a.astype(np.uint8))
k2 = kraft.convert('RGBA'); k2 = ImageChops.multiply(k2, Image.alpha_composite(Image.new('RGBA', (W2, W2), (255, 255, 255, 255)), st))
grano(k2.convert('RGB'), .025).save(f'{OUT}/e9-kraft.jpg', quality=90)
print('ok', sorted(os.listdir(OUT)))
