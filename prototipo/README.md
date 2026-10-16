# Nave Café · Prototipo funcional

Prototipo navegable 1:1 del flujo diseñado en Figma (páginas "Flujo final" claro y oscuro).

## Abrirlo

Sirve la carpeta con cualquier servidor estático y abre `index.html`:

```
cd prototipo
python3 -m http.server 8000
# http://localhost:8000
```

Necesita internet para React 18, htm y las fuentes de Google.

## Qué incluye

- **Inicio:** reloj, próxima salida (Disponible ahora / Para ti / Tu salida) y tablero de salidas con efecto de paleta y filtros Todo, Salas y Café.
- **Salas:** filtros, tarjetas con foto y emblema, y detalle con galería, ficha técnica y ubicación en la planta isométrica. La reserva tiene día, hora, duración y montaje (Hangar), con horarios ocupados bloqueados.
- **Café:** la bitácora, con detalle de producto personalizable (tamaño, shots, leche, endulzante, temperatura y notas) y precio en vivo.
- **Checkout:** editar o quitar ítems, elegir dónde recibir el café y ver el IVA al 13 %.
- **Onboarding:** solo aparece en la primera reserva. Ofrece sesión (correo → código de 6 dígitos → plan de vuelo) o invitado.
- **Pago y cierre:** pago (tarjeta guardada, nueva o billetera; factura de consumidor final o crédito fiscal), pantalla Listo con código de acceso, y Mis reservas.
- **Modo claro y oscuro:** se cambia con el botón de la barra superior.
- **Fondo:** el símbolo de Nave hecho de puntos, muy tenue, reacciona al cursor (`dots.js`).

## Notas

- Standerd y Lenia Mono no se pueden servir desde la web. Se usan Hanken Grotesk y Martian Mono (condensada) como sustitutos; si las fuentes de marca están instaladas, el navegador las usa primero.
- Datos, precios y horarios son de ejemplo. El reloj arranca a las 14:05 del jueves 16 de octubre.
- El estado (tema, checkout, reservas) se guarda en `localStorage` del navegador.
