# Nave Café · Sistema visual

Aterrizaje práctico de la identidad a partir de tres fuentes: el manifiesto (`Concepto de Nave Café.pdf`), las láminas del sistema visual (`00`–`05_*.png`) con sus referencias, y la base gráfica en Figma (logotipo, paleta, elementos y retícula).

Abre `nave-cafe-sistema.html` en el navegador para ver el manual completo, con el generador de trama.

## Qué hay aquí

| Carpeta / archivo | Contenido |
| --- | --- |
| `nave-cafe-sistema.html` | Manual: concepto, marca, color, tipografía, soporte, trama, cuerpo, orientación, aplicaciones, voz, reglas y recursos. |
| `logotipo/` | Logotipo principal en 5 variantes de color y horizontal claro / oscuro. Vectores tomados de Figma. |
| `simbolo/` | Símbolo “Trayectoria” sólido (5 colores) y de puntos (4 colores, trama hexagonal 4:1). |
| `emblemas/` | Un emblema por espacio, tomados de los elementos de la base: CUB, CAB, GAR, CTL, HNG, BAR. |
| `pictogramas/` | 12 pictogramas y 5 flechas sobre retícula de 48, trazo 2.5. |
| `tokens.css`, `tokens.json` | Color, tipografía, retícula y tamaños mínimos. |

## Decisiones principales

- **Símbolo:** una sola trayectoria (órbita → despegue en Λ → aterrizaje) construida con un módulo `t = 0.28 R` y piernas a 45°. Versión de puntos para escalas grandes, sólida debajo de 160 px / 30 mm.
- **Color:** la paleta de Figma organizada por función: Base (Crema, Niebla), Profundidad (Espacio, Tueste), Combustión (Ignición, Ámbar) e Instrumentos (Acero, Petróleo, Señal). Un acento por pieza.
- **Tipografía:** Host Grotesk + JetBrains Mono (libres). Alternativas con licencia en Envato: Elvon Grotesk + Lenia Mono. El trazo de “Café” es solo logotipo.
- **Retícula:** `M = lado corto / 20`, margen `2M`, trama a `M/2` o `M/4`.
- **Orientación:** espacios con nombre, código de tres letras y emblema; señal de sala en cuatro niveles; pantalla “Estado de la nave”.

## Por validar

- Nombres y códigos de los espacios (propuesta).
- Compra de licencias tipográficas si se usan las alternativas de Envato.
- Prueba de impresión de la trama en papel de 300–350 g.
- Datos reales del café de la casa (finca, región, altitud).
- El símbolo se reconstruyó geométricamente a partir del render de Figma; conviene reemplazar el vector maestro en Figma por `simbolo/simbolo-solido-*.svg` o ajustar ahí si se busca otra proporción.
