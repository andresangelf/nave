#!/bin/sh
# Genera dist/ para hosting estático (Vercel): envuelve index.html en un documento completo.
set -e
cd "$(dirname "$0")"
rm -rf dist && mkdir -p dist
cp -r img assets.js dots.js app.js dist/
{
  printf '<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n</head>\n<body>\n'
  cat index.html
  printf '\n</body>\n</html>\n'
} > dist/index.html
echo "dist/ listo"
