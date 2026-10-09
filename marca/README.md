# Nave Café · Sistema visual

Aterrizaje práctico de la identidad a partir de tres fuentes: el manifiesto (`Concepto de Nave Café.pdf`), las láminas del sistema visual (`00`–`05_*.png`) con sus referencias, y la base gráfica en Figma (logotipo, paleta, elementos y retícula).

Abre `nave-cafe-sistema.html` en el navegador para ver el manual completo, con el generador de trama.

Presentación en Figma: https://www.figma.com/design/Ol6gNUSuwNLbNZyemQISgG. La página «Presentación · Despegue» cuenta la marca en 42 láminas, del manifiesto a las aplicaciones. La versión anterior, tipo manual, queda en «Presentación v1 · archivo».

## Qué hay aquí

| Carpeta / archivo | Contenido |
| --- | --- |
| `nave-cafe-sistema.html` | Manual: concepto, marca, color, tipografía, soporte, trama, cuerpo, orientación, aplicaciones, voz, reglas y recursos. |
| `logotipo/` | Logotipo principal en 5 variantes de color y horizontal claro / oscuro. Vectores tomados de Figma. |
| `simbolo/` | Símbolo “Trayectoria” sólido (5 colores) y de puntos (4 colores, trama hexagonal 4:1). |
| `emblemas/` | Un emblema por espacio, tomados de los elementos de la base: CUB, CAB, GAR, CTL, HNG, BAR. |
| `pictogramas/` | 12 pictogramas sobre retícula de 48, trazo 2.5, y 5 flechas contorneadas de Figma (retícula 96, trazo 15, punta redondeada). |
| `tokens.css`, `tokens.json` | Color, tipografía, retícula y tamaños mínimos. |
| `presentacion/` | Generador de las tramas y fotos en trama de la presentación «Bitácora de despegue». |
| `herramientas/trama-estudio.html` | Estudio de Trama: genera tramas por capas a partir de imágenes, símbolo y formas, y el soporte (retícula, margen, marcas, zona segura, corte) según el formato. Exporta SVG por capas, PNG y recetas JSON. |
| `herramientas/animacion-apertura.html` | «Mil pequeños pasos»: animación de apertura de 12 s en bucle (canvas 1920×1080). Del punto Ignición a la órbita: retícula M, trama que se presuriza, 1018 puntos que arman el símbolo en el orden de su trayectoria y lockup con la promesa. Trae transporte, velocidad, cuadro a cuadro y el guion para After Effects. |

## Decisiones principales

- **Símbolo:** una sola trayectoria (órbita → despegue en Λ → aterrizaje) construida con un módulo `t = 0.28 R` y piernas a 45°. Versión de puntos para escalas grandes, sólida debajo de 160 px / 30 mm.
- **Color:** la paleta de Figma organizada por función: Base (Crema, Niebla), Profundidad (Espacio, Tueste), Combustión (Ignición, Ámbar) e Instrumentos (Acero, Petróleo, Señal). Un acento por pieza.
- **Tipografía:** Standerd (Craft Supply Co.) + Lenia Mono, licenciadas. Respaldo libre en web: Inter Tight + JetBrains Mono. El trazo de “Café” es solo logotipo. Los archivos de fuente no se versionan en este repositorio. Standerd es variable y su instancia por defecto es Thin: el texto corrido va a 480, subtítulos a 600 y titulares a 700, con el eje `wght` declarado (`font-variation-settings`) para que no caiga en Thin al usar la fuente instalada.
- **Retícula:** `M = lado corto / 20`, margen `2M`, trama a `M/2` o `M/4`.
- **Orientación:** espacios con nombre, código de tres letras y emblema; señal de sala en cuatro niveles; pantalla “Estado de la nave”.

## Por validar

- Nombres y códigos de los espacios (propuesta).
- Prueba de impresión de la trama en papel de 300–350 g.
- Datos reales del café de la casa (finca, región, altitud).
- El símbolo se reconstruyó geométricamente a partir del render de Figma; conviene reemplazar el vector maestro en Figma por `simbolo/simbolo-solido-*.svg` o ajustar ahí si se busca otra proporción.

## Estudio de Trama: flujo de trabajo

1. Abre `herramientas/trama-estudio.html` en el navegador (funciona sin conexión; usa Standerd y Lenia si están instaladas).
2. Elige el formato. Agrega **Soporte** si la pieza necesita retícula, margen 2M, marcas de registro, zona segura o línea de corte.
3. Suelta o pega imágenes: cada una es una capa que se convierte en puntos. Un PNG con transparencia solo lleva puntos en su silueta (opción **Respetar transparencia**) y entra con encuadre **Contener** para verse completo; una foto entra en **Cubrir**. Suma símbolo, formas (esfera, planeta, toroide, volcán, degradado, onda) o el logotipo.
4. Ajusta por capa: retícula (hexagonal, cuadrada, orgánica), forma del punto, tono (luces o sombras), tamaño o presencia, contraste, densidad direccional, desplazamiento (lente), máscara, color de la paleta y mezcla.
5. **Guardar receta** crea un JSON reutilizable (con las imágenes incluidas). Cualquiera del equipo lo abre y obtiene la misma trama.
6. **Copiar SVG** y pegar en Figma: llega como vectores con un grupo por capa (`01 · Soporte`, `02 · Foto`…). También hay descarga de SVG y PNG.
