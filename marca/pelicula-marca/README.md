# NAVE · película de marca

Bitácora de misión de 121 s (210 beats a 104 BPM), en 16:9 y 2560 × 1440. Cuenta el deck *NAVE · Tech Company & Venture Builder* con la línea gráfica de la presentación «Bitácora de despegue»:

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
| NAVE | 0:14 | La retícula entrega 1 018 puntos al símbolo. El punto enciende el vértice y la marca se asienta. |
| ¿Qué es NAVE? | 0:20 | Cifra «25+», «Fusionamos» con filas «la rigurosidad ··· y la agilidad.» y el socio de ejecución con barras de señalética. |
| Clientes | 0:33 | Dos puertas de embarque, TC y VB, con indicadores de aeropuerto. |
| ¿Qué ofrece? | 0:44 | Tablero «estado de la nave» con 8 servicios. La fila de Tech Equity se abre hasta volverse la lámina siguiente. |
| Modelo operativo | 0:58 | Dos flechas convergen en una base de tres capas. Los marcos ISO corren como tablero. |
| Partners | 1:07 | Constelación sobre el horizonte de puntos. |
| ¿Qué nos rige? | 1:16 | Checklist de pre-vuelo de 7 puntos. |
| Tripulación | 1:29 | Órbita del board: cada rol tiene su lema y sus funciones, y al final salen los directores por país. |
| Despegue | 1:51 | «¿Preguntas?», luego «Listos para el despegue.», cuenta T–03 → T–00, columna de empuje y la marca en órbita. |

Los cambios de color de lámina se hacen con un barrido de trama: los puntos del color siguiente crecen hasta cubrir. Las cruces de registro, los puntos de capítulo y el altímetro de 25 puntos se mantienen en todas las tomas, sin textos en las esquinas.

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

- **Textos:** salen del deck. En el tablero de servicios y en los roles se acortan a una línea (los roles muestran el lema y los títulos de sus funciones).
- **Ortografía:** se corrigió la del deck: Atención, Inquebrantabilidad, metodologías, garantía.
- **Logotipo:** se usan las letras NAVE del logotipo horizontal, sin «Café».

## Versión final con sonido

`nave-pelicula-2k-120fps.mp4`: 2560 × 1440, 120 fps, H.264 + AAC 320 kbps, 121 s, −16 LUFS.

- **Voz:** ElevenLabs Eleven v4, voz «Jorge» (latina, grave, centrada), con tags de emoción, pausas y énfasis. El guion está cortado por frases con los tiempos de palabra de Scribe y colocado al inicio de cada toma.
- **Música:** «Radar Focus», de Blue Saga (Epidemic Sound), a −17 dB, con *ducking* bajo la voz.
- **Efectos (Epidemic Sound):** pitidos de radio en el arranque y en la cuenta T–03, *whoosh* en cada barrido de trama, *flip board* en los tableros y retumbo grave en el despegue.
- **Licencia:** la música y los efectos solo se usan dentro del MP4; los archivos originales no se guardan en el repositorio.
