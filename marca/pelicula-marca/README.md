# NAVE · película de marca

Animación de ~67 s (135 beats a 120 BPM) que recorre el deck *NAVE · Tech Company & Venture Builder* en orden: manifiesto, qué es, clientes, oferta Tech y Venture, modelo operativo, partners, valores, estructura y roles, cierre.

## Ver

```bash
cd marca/pelicula-marca
python3 -m http.server 8765    # el módulo ES necesita servirse por http
# http://localhost:8765/              controles: Espacio = play/pausa, R = repetir, ←/→ = ±2 s
# http://localhost:8765/?bpm=132      ajusta el tempo (a 132 BPM dura ~61 s)
# http://localhost:8765/?loop&limpio  en bucle y sin barra de controles
```

## Usar en una app React

```js
import React from 'react';
import htm from 'htm';
import { createNaveFilm, ESCENAS, CONTENIDO } from './NaveFilm.js';

const NaveFilm = createNaveFilm({ React, html: htm.bind(React.createElement) });

<div style={{ width: '100%', height: '100vh' }}>
  <NaveFilm bpm={120} loop autoplay controles onReady={(api) => api.seek(12)} />
</div>
```

| Prop | Por defecto | Qué hace |
|---|---|---|
| `bpm` | `120` | Tempo de toda la línea de tiempo |
| `escenas` | `ESCENAS` | Orden y duración en beats de cada escena |
| `contenido` | `CONTENIDO` | Todos los textos del deck |
| `colores` / `tipos` | `PALETA` / `TIPOS` | Sobrescriben tokens de color o familias |
| `autoplay`, `loop`, `controles` | `true`, `false`, `true` | Reproducción |
| `onReady(api)` | — | `api.seek(s)`, `play()`, `pause()`, `replay()`, `duracion` |

## Cómo está armado

- **Un solo reloj.** Un `requestAnimationFrame` calcula el tiempo desde una base; pausa, búsqueda y repetición solo mueven esa base. No hay temporizadores sueltos que se desfasen.
- **Tiempo en beats.** `ESCENAS` define cuántos beats dura cada escena; dentro de cada una, los elementos declaran el beat local en que entran (`c.entra(2.5, {...})`). Alargar una escena o cambiar el tempo no obliga a tocar ningún elemento.
- **Geometría propia.** El barrido entre escenas de color es el chevrón del techo del símbolo subiendo (despegue). La regla Ignición, el punto, la trama de puntos y las flechas de aeropuerto se repiten como hilo conductor.
- **Lienzo adaptable.** 1920×1080 en horizontal y 1080×1920 en vertical, escalado sin recortar. Las grillas pasan a menos columnas y los títulos se ajustan al ancho.
- **Movimiento reducido.** Con `prefers-reduced-motion`, todo entra solo con fundido corto, sin desplazamientos ni rebotes, y los barridos pasan a fundidos.

## Activos

- `activos.js`: trazos del símbolo sólido (`marca/simbolo/`) y de las cuatro letras NAVE (`marca/logotipo/nave-horizontal-*.svg`), sin la palabra «Café».
- **Fuentes:** usa Lenia Mono y Standerd si están instaladas en el equipo. Si no, cae en JetBrains Mono e Inter Tight (Google Fonts). Los archivos con licencia no van en el repositorio.
- **Org chart:** el deck lo trae como imagen; aquí está reconstruido como órbita animada con los mismos cargos y flechas.

## Notas de fidelidad

Los textos son los del deck, con estas correcciones ortográficas:

| En el deck | Aquí |
|---|---|
| Atencion | Atención |
| Inquenbrantabilidad | Inquebrantabilidad |
| meteologias | metodologías |
| garantia | garantía |
| creacion | creación |
| tecnica | técnica |
| record | récord |
| elite | élite |

De cada rol se muestran el lema y los títulos de sus cinco funciones; el párrafo completo de cada función queda fuera por tiempo.
