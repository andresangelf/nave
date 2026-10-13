# Nave · marca madre (Propuesta 01)

Ampliación del sistema de Nave Café a Nave como marca madre, siguiendo `Nave_Prompt_Maestro_Branding.md`. Todo lo que no está marcado como ORIGINAL o VIGENTE es propuesta y no está aprobado.

## Entregables

| Dónde | Qué hay |
|---|---|
| Artefacto [Nave · Sistema de marca](https://claude.ai/artifact/M3uK8aXtDtmZaGGGgCA8oe) | Sistema navegable en 12 secciones, con estos elementos:<br>• selector ORIGINAL / CAMBIOS / PROPUESTA para los tres textos;<br>• árbol de arquitectura con ficha por entidad;<br>• firmas con área de seguridad;<br>• capas que se pueden activar y desactivar;<br>• aplicaciones;<br>• tokens que se pueden copiar;<br>• modo lectura. |
| Figma [Nave — Identidad Visual · «Propuesta · Marca madre»](https://www.figma.com/design/jgjWkyyD5WQ4gmfLfjQxhm/Nave---Identidad-Visual?node-id=140-2) | 22 láminas de especificación, 12 estilos de color y 16 de texto. Componentes: cinco firmas, hechas con los vectores de Branding, y las etiquetas de estado. La página Branding no se modificó. |
| Figma [Nave Café · Sistema visual · «Presentación · Nave marca madre»](https://www.figma.com/design/Ol6gNUSuwNLbNZyemQISgG/Nave-Caf%C3%A9-%C2%B7-Sistema-visual?node-id=111-394) | 24 láminas narrativas más una de Léeme. El manifiesto abre cada sección y la presentación usa los estilos y componentes del deck del café. «Presentación · Despegue» queda intacta. |
| `contenido.json` | Fuente única del artefacto:<br>• textos originales y cambios A1–A4, C1, P1–P5;<br>• arquitectura y fichas;<br>• pilares, voz, puntos y capas;<br>• tokens, migración, discrepancias y pendientes. |
| `logotipo/` | Símbolo y NΛVE exportados de Branding (88:2, 136:182), en versión principal, horizontal y solo símbolo, en Espacio, Crema y Negro. |
| `fuente/` | `sistema.src.html` con `construir.py` arman `nave-sistema-marca.html`. |

## Arquitectura recomendada

Marca monolítica con identificadores selectivos:

- **Nave firma todo.**
- **Las ofertas son títulos.** Las seis líneas, los frentes Tech Company y Venture Builder, Tech Foundry como método y Tech Equity como modelo se escriben como títulos, no como logotipos.
- **Identificador junto a NΛVE solo para entidades con público, lugar o canal propio y continuidad.** Hoy esa entidad es Nave Café. Academy sigue como exploración.
- **Espacios como señal.** El Garage y los demás espacios son señalización dentro del café.

## Regenerar el artefacto

```bash
python3 marca/madre/fuente/construir.py
```

## Pendientes

Están en `contenido.json → pendientes` y en la última lámina de cada archivo de Figma:

1. Aprobar o rechazar los cambios editoriales.
2. Confirmar Academy.
3. Confirmar la razón social.
4. Decidir el nombre de la línea Next-Gen y qué pasa con Digital Assets.
5. Precisar qué significa «en tiempo real».
6. Respaldar las afirmaciones comerciales.
7. Separar los marcos ISO de las certificaciones obtenidas.
8. Elegir la tipografía del identificador.
9. Contrastar los cinco valores con los siete puntos de «¿Qué nos rige?».
