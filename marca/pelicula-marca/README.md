# NAVE · película de marca

Bitácora de misión de 88 s (176 beats a 120 BPM), en 16:9 y 2560 × 1440. Cuenta el deck *NAVE · Tech Company & Venture Builder* con la línea gráfica de la presentación «Bitácora de despegue»:

- láminas Crema, Espacio y Ámbar;
- titulares en Standerd con una frase de acento en Ignición;
- bitácora en Lenia Mono;
- cruces de registro;
- tramas de puntos;
- tableros de aeropuerto.

## Guion

| Beats | Toma | Recurso de la línea gráfica |
|---|---|---|
| 0–8 | Arranque | El punto Ignición parpadea dos veces y la bitácora entra: cuenta regresiva, capítulo y altitud. |
| 8–24 | Manifiesto | El campo de estrellas se tensa hacia el punto. Aparecen tres marcadores (empresa, idea, persona) y el orden nace en retícula: «para hacerla mejor». |
| 24–34 | NAVE | La retícula entrega 1 018 puntos al símbolo. El punto enciende el vértice y la marca se asienta. |
| 34–58 | ¿Qué es NAVE? | Cifra «25+», filas «Entre… y…» con líneas punteadas y el socio de ejecución con barras de señalética. |
| 58–72 | Clientes | Dos puertas de embarque, TC y VB, con indicadores de aeropuerto. |
| 72–90 | ¿Qué ofrece? | Tablero «estado de la nave» con 8 servicios. La fila de Tech Equity se abre hasta volverse la lámina siguiente. |
| 90–104 | Modelo operativo | Dos flechas convergen en una base de tres capas. Los marcos ISO corren como tablero. |
| 104–116 | Partners | Constelación sobre el horizonte de puntos. |
| 116–134 | ¿Qué nos rige? | Checklist de pre-vuelo de 7 puntos. |
| 134–160 | Tripulación | Órbita del board: cada rol tiene su lema y sus funciones, y al final salen los directores por país. |
| 160–176 | Despegue | «¿Preguntas?», luego «Listos para el despegue.», T–00, columna de empuje y la marca en órbita. |

Los cambios de color de lámina se hacen con un barrido de trama: los puntos del color siguiente crecen hasta cubrir. La bitácora (cuenta regresiva hasta T–00, capítulo, altímetro de 25 puntos) es la misma de la animación de apertura y enlaza todas las tomas.

## Archivos

| Archivo | Qué hace |
|---|---|
| `motor.js` | Guion (`ESCENAS`), contenido (`CONTENIDO`) y dibujo de cada cuadro en el lienzo de 2560 × 1440. Es determinista: un mismo tiempo produce siempre la misma imagen. |
| `NaveFilm.js` | Componente React: reloj único, lienzo 16:9, controles (Espacio, R, ←/→) y movimiento reducido. |
| `activos.js` | Trazos del símbolo, letras NAVE y el símbolo de 1 018 puntos. |
| `index.html` | Vista previa. |
| `render.html` + `exportar.mjs` | Exportación cuadro a cuadro a MP4. |

## Ver

```bash
cd marca/pelicula-marca
python3 -m http.server 8765     # http://localhost:8765/   ·   ?bpm=140 acelera   ·   ?loop   ·   ?limpio
```

## Exportar a 2K · 120 fps

```bash
STANDERD=/ruta/StanderdVF.ttf LENIA=/ruta/carpeta-lenia node exportar.mjs 120 nave-pelicula-2k-120fps.mp4 4
```

Renderiza en paralelo con 4 procesos de Chromium y une los tramos sin recomprimir (H.264, CRF 16, yuv420p). Las fuentes con licencia se leen de tu disco y no se copian al repositorio.

## Usar en React

```js
import React from 'react';
import { createNaveFilm } from './NaveFilm.js';
const NaveFilm = createNaveFilm(React);

<NaveFilm bpm={120} loop={false} autoplay controles onReady={(api) => api.seek(12)} />
```

Props: `bpm`, `escenas`, `contenido`, `colores`, `fuentes`, `autoplay`, `loop`, `controles`, `onReady(api)`. La `api` expone `seek`, `play`, `pause`, `replay` y `duracion`.

## Notas de fidelidad

- **Textos:** salen del deck. En el tablero de servicios y en los roles se acortan a una línea (los roles muestran el lema y los títulos de sus funciones).
- **Ortografía:** se corrigió la del deck: Atención, Inquebrantabilidad, metodologías, garantía.
- **Logotipo:** se usan las letras NAVE del logotipo horizontal, sin «Café».
