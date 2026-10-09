# Presentación · Bitácora de despegue

Archivo de Figma: https://www.figma.com/design/Ol6gNUSuwNLbNZyemQISgG (página «Presentación · Despegue», 45 láminas en seis fases: Tierra, Presión, Condiciones, Astillero, Despegue y Órbita). La página «00 · Léeme», encima de las láminas, explica cómo está armada.

Aquí está lo necesario para regenerar las tramas de la presentación:

| Archivo | Qué hace |
| --- | --- |
| `generar_tramas.py` | Genera cada trama como SVG de puntos sobre la retícula hexagonal de la marca: fotos en trama, presión, presión regulada, condiciones extremas, símbolo de 1 018 puntos, póster de capas, controles, despegue y órbita. |
| `rasterizar.js` | Pasa los SVG a PNG transparente a 2x con Playwright (`node rasterizar.js` o `node rasterizar.js despegue orbita`). |
| `simbolo.py` | Geometría del símbolo «Trayectoria» (la misma del manual). |
| `fotos/` | Fotografías fuente generadas con Figma AI solo para presentar. Cuando existan fotos reales del espacio, reemplázalas con el mismo nombre y vuelve a generar. |
| `generar_piezas.py` | Tramas de las piezas de la página «Pruebas» y de la señalética: teselas de micropunto, serie «Entre», historia de evento, etiqueta, tote, vaso desplegado, membresía, variantes de retícula y punto, y el storyboard de movimiento. |
| `revelado.py` | Revelado de película para el estilo fotográfico: B/N tipo Tri-X o color tipo Ektachrome de los 80, con grano en dos escalas, negros lavados, halación y viñeta. |
| `fotos/estilo/` | Las 6 escenas de Nave sin revelar (Figma AI): reacción, equipo, brindis, pizarra, prototipo y cabina. |

```sh
python3 generar_tramas.py && node rasterizar.js     # tramas de la presentación
python3 generar_piezas.py && node rasterizar.js     # tramas de las piezas de prueba
python3 revelado.py fotos/estilo/reaccion.jpg reaccion-bn.jpg bn       # o color
```

Los PNG resultantes se arrastran a Figma o se suben a la página «Imágenes · despegue».

## Estilo fotográfico

Tripulación, no producto: rostros y reacciones en el momento en que algo pasa, siempre con un objeto clave (taza, pizarra, prototipo, auriculares), luz disponible y grano de película visible. B/N para lo íntimo, color lavado de los 80 para lo colectivo.

Referencias (láminas 25–28 de la presentación):

- Control de misión, NASA (dominio público, [images.nasa.gov](https://images.nasa.gov)): S69-40302, S70-34902, S70-35014, S72-54881, S81-39431, S81-32876, S82-32883, 6900561, S69-25880.
- Norman Seeff, equipo Macintosh 1984: [Steve Jobs Archive · 40 years of Macintosh](https://stevejobsarchive.com/stories/40-years-of-macintosh).
- Microsoft, retrato del equipo en Albuquerque, 1978: [Fortune](https://fortune.com/2025/04/04/microsoft-earliest-employees-photo-1978-where-are-they-now).
- Compaq, el boceto en un mantel, 1982: [Science Friday](https://www.sciencefriday.com/segments/a-david-and-goliath-story-for-personal-computers/).
- Doug Menuez, *Fearless Genius* 1985–2000: [Computer History Museum](https://computerhistory.org/blog/fearless-genius-the-digital-revolution-in-silicon-valley-1985-2000/).

Las fotos de startups se citan como referencia y no se publican.
