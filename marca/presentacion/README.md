# Presentación · Bitácora de despegue

Archivo de Figma: https://www.figma.com/design/Ol6gNUSuwNLbNZyemQISgG (página «Presentación · Despegue», 42 láminas en seis fases: Tierra, Presión, Condiciones, Astillero, Despegue y Órbita). La página «00 · Léeme», encima de las láminas, explica cómo está armada.

Aquí está lo necesario para regenerar las tramas de la presentación:

| Archivo | Qué hace |
| --- | --- |
| `generar_tramas.py` | Genera cada trama como SVG de puntos sobre la retícula hexagonal de la marca: fotos en trama, presión, presión regulada, condiciones extremas, símbolo de 1 018 puntos, póster de capas, controles, despegue y órbita. |
| `rasterizar.js` | Pasa los SVG a PNG transparente a 2x con Playwright (`node rasterizar.js` o `node rasterizar.js despegue orbita`). |
| `simbolo.py` | Geometría del símbolo «Trayectoria» (la misma del manual). |
| `fotos/` | Fotografías fuente generadas con Figma AI solo para presentar. Cuando existan fotos reales del espacio, reemplázalas con el mismo nombre y vuelve a generar. |

```sh
python3 generar_tramas.py && node rasterizar.js
```

Los PNG resultantes se arrastran a Figma o se suben a la página «Imágenes · despegue».
