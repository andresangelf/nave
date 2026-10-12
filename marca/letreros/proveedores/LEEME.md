# NAVE Café · Paquete para proveedores de rótulos

Todos los SVG están a **escala 1:1 en milímetros** (1 unidad = 1 mm). Al abrirlos en Illustrator, CorelDRAW o Inkscape quedan a tamaño real. Cada archivo tiene capas con nombre; la capa **COTAS** (azul) solo es referencia y no se fabrica.

| Archivo | Pieza | Medida | Fabricación |
|---|---|---|---|
| `L02-matriz-led-simbolo.svg` | Símbolo de NAVE en puntos de LED, ventanal de fachada | 1600 × 1600 mm | 503 LED Ø12 mm color ignición sobre panel negro mate. Paso hexagonal ≈ 51,6 mm. |
| `L02-orden-encendido.csv` | Orden y tiempo de encendido de cada LED | — | Secuencia de 6 s siguiendo la trayectoria del símbolo; luego queda fijo. |
| `L05-neon-houston.svg` | «Houston, tenemos una idea.», detrás de la barra | 2000 × 800 mm | Neón flex LED relleno crema 3000 K sobre acrílico transparente 8 mm, halo ignición. |
| `L06-letras-corporeas-logotipo.svg` | Logotipo NAVE Café con EST. 2026, fachada o entrada | 2200 × 1450 mm | Letras corpóreas de acrílico opal crema, retroiluminadas 2700 K, separadas 40 mm del muro. |

## Colores de referencia

| Nombre | HEX | Referencia aproximada |
|---|---|---|
| Crema | `#FFF5EE` | Pantone 9224 C · acrílico opal blanco cálido |
| Ignición | `#E55C41` | Pantone 7417 C · RAL 2012 |
| Ámbar (halo) | `#EFA441` | Pantone 7409 C · LED 2700 K |
| Tueste (muro) | `#210A05` | Pintura café muy oscuro |

Pedir una muestra física de color y de temperatura de LED antes de producir.

## Notas

- El texto ya está convertido a contornos; no hace falta instalar fuentes.
- En L06, «Café» es una sola pieza unida y la tilde va por separado. Las letras de EST. 2026 son finas (10 mm de acrílico); el proveedor puede proponer un grosor mínimo.
- En L05, revisar el ancho mínimo del flex en la «i» y en los puntos; si no se puede, el proveedor puede engrosar esos trazos y debe enviar la prueba para aprobarla.
- Las medidas son de diseño. Hay que confirmarlas en sitio con el plano arquitectónico antes de cortar.

`generar.py` regenera todo a partir del logotipo del repositorio y de la matriz de puntos de Figma (`l02-puntos-figma.txt`).
