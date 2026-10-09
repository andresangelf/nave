# Revelado de película para el estilo fotográfico de Nave: B/N tipo Tri-X o color tipo Ektachrome de los 80.
# Uso: python3 revelado.py entrada.png salida.jpg bn|color [ancho]
import sys
import numpy as np
from PIL import Image, ImageFilter

def curva(x, contraste=1.0, negro=0.0, blanco=1.0):
    """S suave alrededor de 0.5 y levantamiento de negros (película, no digital)."""
    x = np.clip(x, 0, 1)
    s = 0.5 + (x - 0.5) * contraste
    s = s + 0.08 * contraste * np.sin((x - 0.5) * np.pi) * (1 - abs(x - 0.5) * 2)
    s = np.clip(s, 0, 1)
    return negro + s * (blanco - negro)

def grano(h, w, fuerza, rng):
    """Grano a dos escalas: fino (1 px) y de cúmulo (3 px), como haluros de plata."""
    fino = rng.normal(0, 1, (h, w))
    grueso = np.array(Image.fromarray(rng.normal(0, 1, (h // 3 + 1, w // 3 + 1)).astype(np.float32)).resize((w, h), Image.BICUBIC))
    return (fino * 0.7 + grueso * 0.55) * fuerza

def viñeta(h, w, fuerza):
    y, x = np.mgrid[0:h, 0:w]
    r = np.hypot((x - w / 2) / (w / 2), (y - h / 2) / (h / 2)) / np.sqrt(2)
    return 1 - fuerza * np.clip(r, 0, 1) ** 2.2

def revelar(src, modo, ancho=1920, semilla=7):
    rng = np.random.default_rng(semilla)
    im = Image.open(src).convert('RGB')
    if im.width != ancho:
        im = im.resize((ancho, round(im.height * ancho / im.width)), Image.LANCZOS)
    im = im.filter(ImageFilter.GaussianBlur(0.6))          # óptica de la época: menos nitidez digital
    a = np.asarray(im).astype(np.float32) / 255
    h, w, _ = a.shape
    if modo == 'bn':
        # Tri-X 400 con filtro amarillo: piel luminosa, cielos y sombras más densos
        l = a[..., 0] * 0.42 + a[..., 1] * 0.46 + a[..., 2] * 0.12
        l = curva(l, 1.22, negro=0.045, blanco=0.965)
        medios = 1 - np.abs(l - 0.5) * 1.6                  # el grano se nota más en medios tonos
        l = l + grano(h, w, 0.055, rng) * np.clip(medios, 0.35, 1)
        l = l * viñeta(h, w, 0.32)
        out = np.stack([l, l, l], -1)
        out = out * np.array([1.0, 0.99, 0.965]) + np.array([0.012, 0.01, 0.0])  # papel cálido
    else:
        # Ektachrome de los 80: menos saturación, luces cálidas, sombras cian, negros lavados, halación
        l = a.mean(-1, keepdims=True)
        a = l + (a - l) * 0.78
        a = curva(a, 1.08, negro=0.07, blanco=0.95)
        luz = np.clip((l - 0.55) / 0.45, 0, 1)
        sombra = np.clip((0.45 - l) / 0.45, 0, 1)
        a = a + luz * np.array([0.05, 0.025, -0.035]) + sombra * np.array([-0.025, 0.012, 0.04])
        brillo = Image.fromarray((np.clip((l[..., 0] - 0.72) / 0.28, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(14))
        hal = np.asarray(brillo).astype(np.float32)[..., None] / 255
        a = 1 - (1 - a) * (1 - hal * np.array([0.32, 0.12, 0.04]))  # halación roja en luces fuertes
        g = grano(h, w, 0.04, rng)
        a = a + np.stack([g, g * 0.9, g * 1.1], -1) + rng.normal(0, 0.012, a.shape)
        out = a * viñeta(h, w, 0.28)[..., None]
    return Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8))

if __name__ == '__main__':
    src, dst, modo = sys.argv[1:4]
    ancho = int(sys.argv[4]) if len(sys.argv) > 4 else 1920
    revelar(src, modo, ancho).save(dst, quality=90)
