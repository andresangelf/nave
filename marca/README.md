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
| `herramientas/trama-estudio.html` | Estudio de Trama: genera tramas por capas a partir de imágenes, símbolo, formas y gráficos con puntos (cadena, funciones del punto, datos y formas), y el soporte (retícula, margen, marcas, zona segura, corte) según el formato. Exporta SVG por capas, PNG y recetas JSON. Publicado en https://claude.ai/artifact/Pc9kGQBnkvDTELwGWyXydw. |
| `herramientas/animacion-apertura.html` | «Mil pequeños pasos»: animación de apertura de 15 s en bucle (canvas 1920×1080). Del punto Ignición a la órbita: retícula M, trama que se presuriza, 1018 puntos que arman el símbolo en el orden de su trayectoria y lockup con la promesa. Trae transporte, velocidad, cuadro a cuadro y el guion para After Effects. |
| `herramientas/animacion-apertura-24fps.mp4` | La misma animación exportada a MP4, 1920×1080, 24 fps, H.264. El primer y el último cuadro son Espacio plano para que el bucle no se note. Se regenera con `herramientas/exportar-animacion.js` (instrucciones dentro del archivo). |

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
3. Suelta o pega imágenes: cada una es una capa que se convierte en puntos. Un PNG con transparencia solo lleva puntos en su silueta (opción **Respetar transparencia**) y entra con encuadre **Contener** para verse completo; una foto entra en **Cubrir**. Suma el símbolo maestro de Nave, formas (esfera, planeta, toroide, volcán, degradado, onda) o el logotipo (Nave, Nave horizontal, Nave Café o NΛVE).
4. Ajusta por capa: retícula (hexagonal, cuadrada, orgánica), forma del punto, tono (luces o sombras), tamaño o presencia, contraste, densidad direccional, desplazamiento (lente), máscara, color de la paleta y mezcla.
5. **Gráfico** genera puntos por reglas sobre la misma retícula. Tiene cuatro familias:
   - **Cadena:** ambición, presión, condiciones, capacidad y construcción («De la ambición a la construcción»).
   - **Función:** campo, relación (con líneas), trayectoria (el símbolo maestro en orden de avance), volumen, lente y dato.
   - **Datos:** barras, línea, anillo, proporción y medidores de 25. Los valores se escriben separados por comas; **Resaltar** pone uno en el color de acento y **Rótulos** agrega las cifras.
   - **Forma:** círculo, aro, triángulo, cuadrado, polígono, flecha y texto, llenados con la retícula sin deformar los puntos.

   Cada gráfico tiene un área (porcentaje del interior del margen 2M) que se puede mover; con **Solo dentro del área** caben varios en una pieza, como en las recetas «De la ambición a la construcción» y «El punto es la unidad base». En SVG sale en grupos: `Fondo de puntos`, `Relaciones`, `Puntos`, `Acento` y `Rótulos`.
6. **Guardar receta** crea un JSON reutilizable (con las imágenes incluidas). Cualquiera del equipo lo abre y obtiene la misma trama.
7. **Copiar SVG** y pegar en Figma: llega como vectores con un grupo por capa (`01 · Soporte`, `02 · Foto`…). También hay descarga de SVG y PNG.

## Película de marca NAVE

`pelicula-marca/`: película de marca de 121 s en 16:9 · 2K (componente React + motor de lienzo + exportador a 120 fps) sobre el deck Tech Company & Venture Builder. Ver `pelicula-marca/README.md`.

## Nave · marca madre

`madre/`: propuesta para llevar el sistema del café a Nave como marca madre: arquitectura, firmas, gramática de puntos, tokens y narrativa con cambios etiquetados. Artefacto: https://claude.ai/artifact/M3uK8aXtDtmZaGGGgCA8oe. Ver `madre/README.md`.
