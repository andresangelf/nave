# NAVE · película de marca

Bitácora de misión de 131 s (228 beats a 104 BPM), en 16:9 y 2560 × 1440. Cuenta el deck *NAVE · Tech Company & Venture Builder* con la línea gráfica de la presentación «Bitácora de despegue»:

- láminas Crema, Espacio y Ámbar;
- titulares en Standerd con una frase de acento en Ignición;
- bitácora en Lenia Mono;
- cruces de registro;
- tramas de puntos;
- tableros de aeropuerto.

## Guion

| Toma | Inicio | Recurso de la línea gráfica |
|---|---|---|
| Arranque | 0:00 | El punto Ignición parpadea dos veces y entra la bitácora: cruces de registro, puntos de capítulo y altímetro. |
| Manifiesto | 0:05 | El campo de estrellas se tensa hacia el punto. Aparecen tres marcadores (empresa, idea, persona) y el orden nace en retícula: «para hacerla mejor». |
| NAVE | 0:16 | La retícula entrega 1 018 puntos al símbolo. El punto enciende el vértice y la marca se asienta. |
| ¿Qué es NAVE? | 0:23 | Cifra «25+», «Fusionamos» con filas «la rigurosidad ··· y la agilidad.» y el socio de ejecución con barras de señalética. |
| Clientes | 0:42 | Dos pantallas, una por ruta: TC y VB, con indicadores de aeropuerto. |
| ¿Qué ofrece? | 0:58 | Dos tableros: los 5 servicios Tech y los 3 Venture. La fila de Tech Equity se abre hasta volverse la lámina siguiente. |
| Modelo operativo | 1:17 | Dos flechas convergen en una base de tres capas. Los marcos ISO corren como tablero. |
| Partners | 1:29 | Constelación sobre el horizonte de puntos, en dos pantallas (4 + 3). |
| ¿Qué nos rige? | 1:45 | Checklist de pre-vuelo de 7 puntos, en dos pantallas (4 + 3). |
| Despegue | 2:01 | «¿Preguntas?», luego «Listos para el despegue.», cuenta T–03 → T–00, columna de empuje y la marca en órbita. |

Los cambios de color de lámina se hacen con un barrido de trama: los puntos del color siguiente crecen hasta cubrir. Las cruces de registro, los puntos de capítulo y el altímetro de 25 puntos se mantienen en todas las tomas, sin textos en las esquinas.

## Archivos

| Archivo | Qué hace |
|---|---|
| `motor.js` | Guion (`ESCENAS`), contenido (`CONTENIDO`) y dibujo de cada cuadro en el lienzo de 2560 × 1440. Es determinista: un mismo tiempo produce siempre la misma imagen. |
| `NaveFilm.js` | Componente React: reloj único, lienzo 16:9, controles (Espacio, R, ←/→) y movimiento reducido. |
| `activos.js` | Trazos del símbolo, letras NAVE y el símbolo de 1 018 puntos. |
| `index.html` | Vista previa. |
| `guion.md` | Guion por etapas con lo que se ve, el texto en pantalla y la locución sugerida. |
| `render.html` + `exportar.mjs` | Exportación cuadro a cuadro a MP4. |

## Ver

```bash
cd marca/pelicula-marca
python3 -m http.server 8765     # http://localhost:8765/   ·   ?bpm=120 acelera   ·   ?loop   ·   ?limpio
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

<NaveFilm bpm={104} loop={false} autoplay controles onReady={(api) => api.seek(12)} />
```

Props: `bpm`, `escenas`, `contenido`, `colores`, `fuentes`, `autoplay`, `loop`, `controles`, `onReady(api)`. La `api` expone `seek`, `play`, `pause`, `replay` y `duracion`.

## Notas de fidelidad

- **Textos:** salen del deck. En el tablero de servicios el alcance se acorta a una línea. La tripulación (roles del board) no aparece.
- **Legibilidad:** ningún texto baja de 40 px en el lienzo de 1440; cuando un punto tiene mucho texto se reparte en varias pantallas (`parte` en `ESCENAS`).
- **Ortografía:** se corrigió la del deck: Atención, Inquebrantabilidad, metodologías, garantía.
- **Logotipo:** se usan las letras NAVE del logotipo horizontal, sin «Café».

## Versión actual

`nave-pelicula-2k-120fps.mp4`: 2560 × 1440, 120 fps, H.264 (CRF 16), 131 s, **sin audio** (sin voz, música ni efectos).
