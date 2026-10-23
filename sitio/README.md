# NAVE · sitio de la película

Sitio estático (sin build) que reproduce la película de marca en sincronía con la locución.

- Video y audio van por separado: el **audio manda** y el video se corrige solo si se desfasa (más de 0,03 s lo ajusta suavemente; más de 0,15 s salta).
- Idioma ES/EN: se cambia en cualquier momento sin perder la posición.
- Al terminar vuelve a empezar solo.
- Pausa, línea de tiempo, silencio, pantalla completa. Teclado: `Espacio` pausa, `←`/`→` ±5 s, `M` silencio, `F` pantalla completa.
- Responsive: celular vertical (video arriba y controles debajo), celular horizontal, tableta y escritorio. En pantallas chicas o con ahorro de datos usa el video de 720p.
- Se arranca con un toque porque los navegadores no permiten audio automático.

## Qué editar

Todo está en `config.js`: audios, texto y enlace del botón CTA (por idioma) y redes sociales. Los enlaces que trae son de relleno (`example.com`); cámbialos antes de publicar.

## Archivos

| Ruta | Contenido |
|---|---|
| `media/nave-1080.mp4` | 1920×1080, 60 fps, 12 MB |
| `media/nave-720.mp4` | 1280×720, 30 fps, 7 MB |
| `media/poster.jpg` | Imagen de portada y vista previa al compartir |
| `audio/es.mp3`, `audio/en.mp3` | Locuciones (ver `audio/LEEME.md`) |

Los videos salen de `marca/pelicula-marca/nave-pelicula-2k-120fps.mp4`. Si cambia la película:

```bash
SRC=marca/pelicula-marca/nave-pelicula-2k-120fps.mp4
ffmpeg -i $SRC -an -vf "fps=60,scale=1920:1080:flags=lanczos" -c:v libx264 -preset medium -crf 25 -pix_fmt yuv420p -movflags +faststart -g 120 sitio/media/nave-1080.mp4
ffmpeg -i $SRC -an -vf "fps=30,scale=1280:720:flags=lanczos"  -c:v libx264 -preset medium -crf 25 -pix_fmt yuv420p -movflags +faststart -g 60  sitio/media/nave-720.mp4
```

## Probar en local

```bash
cd sitio && npx http-server -p 8080     # necesita un servidor con soporte de Range
```

(`python3 -m http.server` no sirve para probar el audio: no soporta Range y el navegador no puede saltar en el audio.)

## Vercel

`vercel.json` en la raíz ya apunta a `sitio/`. Importar el repo en Vercel y desplegar, sin comando de build.
