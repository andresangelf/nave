/* Fondo: símbolo de Nave hecho de puntos.
   Muy discreto en reposo; los puntos cercanos al cursor crecen, se apartan y se tiñen de Ignición. */
(function () {
  var canvas = document.getElementById('dots');
  if (!canvas || !window.NAVE_SIMBOLO_PATH) return;
  var ctx = canvas.getContext('2d');
  var probe = document.createElement('canvas').getContext('2d');
  var symbol = new Path2D(window.NAVE_SIMBOLO_PATH); // caja de 397 × 397
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var dots = [], W = 0, H = 0, dpr = 1, gap = 12;
  var mouse = { x: -9999, y: -9999, k: 0, on: false };
  var ink = '1,36,54', accent = '229,92,65', baseA = 0.085;
  var running = false, last = 0;

  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    ink = (cs.getPropertyValue('--dot-ink') || '1,36,54').trim();
    baseA = parseFloat(cs.getPropertyValue('--dot-alpha')) || 0.085;
    kick();
  }

  function layout() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    var narrow = W < 760;
    gap = narrow ? 10 : 12;
    var size = narrow ? W * 1.05 : Math.min(Math.max(H * 0.95, 560), W * 0.62, 980);
    var x0 = narrow ? W - size * 0.78 : W - size * 0.9;
    var y0 = narrow ? H - size * 0.92 : H * 0.54 - size / 2;
    var s = 397 / size;
    dots = [];
    var startX = x0 - ((x0 % gap) + gap) % gap, startY = y0 - ((y0 % gap) + gap) % gap;
    for (var y = startY; y < y0 + size; y += gap) {
      for (var x = startX; x < x0 + size; x += gap) {
        var u = (x - x0) * s, v = (y - y0) * s;
        if (u < 0 || v < 0 || u > 397 || v > 397) continue;
        if (!probe.isPointInPath(symbol, u, v)) continue;
        // presión: más tinta hacia abajo, como la trama de la marca
        var p = v / 397;
        dots.push({ x: x, y: y, r0: 1.05 + p * 0.85, s: 1, g: 0, dx: 0, dy: 0, ph: (x * 0.013 + y * 0.009) });
      }
    }
    kick();
  }

  function frame(t) {
    running = false;
    if (document.hidden) return;
    // ~40 fps es suficiente para un fondo
    if (t - last < 24) { schedule(); return; }
    last = t;
    var still = reduce.matches;
    mouse.k += ((mouse.on ? 1 : 0) - mouse.k) * 0.08;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    var R = 160, active = false;
    ctx.fillStyle = 'rgba(' + ink + ',' + baseA + ')';
    ctx.beginPath();
    var glowing = [];
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      var ex = d.x - mouse.x, ey = d.y - mouse.y;
      var dist = Math.sqrt(ex * ex + ey * ey);
      var k = dist < R ? Math.pow(1 - dist / R, 2) * mouse.k : 0;
      var wave = still ? 0 : 0.1 * Math.sin(t * 0.0007 + d.ph);
      var ts = 1 + wave + k * 1.6, tg = k;
      var push = k * 9, tdx = dist > 0.1 ? ex / dist * push : 0, tdy = dist > 0.1 ? ey / dist * push : 0;
      if (still) { d.s = ts; d.g = tg; d.dx = tdx; d.dy = tdy; }
      else {
        d.s += (ts - d.s) * 0.14; d.g += (tg - d.g) * 0.12;
        d.dx += (tdx - d.dx) * 0.12; d.dy += (tdy - d.dy) * 0.12;
        if (Math.abs(tg - d.g) > 0.004 || Math.abs(tdx - d.dx) > 0.05) active = true;
      }
      if (d.g > 0.02) { glowing.push(d); continue; }
      var r = d.r0 * d.s;
      ctx.moveTo(d.x + d.dx + r, d.y + d.dy);
      ctx.arc(d.x + d.dx, d.y + d.dy, r, 0, 6.2832);
    }
    ctx.fill();
    for (var j = 0; j < glowing.length; j++) {
      var g = glowing[j], rr = g.r0 * g.s;
      ctx.fillStyle = 'rgba(' + accent + ',' + Math.min(0.55, baseA + g.g * 0.5) + ')';
      ctx.beginPath();
      ctx.arc(g.x + g.dx, g.y + g.dy, rr, 0, 6.2832);
      ctx.fill();
    }
    // la ola en reposo mantiene el lazo vivo; con movimiento reducido solo se redibuja al mover el cursor
    if (!still || active || mouse.k > 0.01 && mouse.k < 0.99) schedule();
  }

  function schedule() { if (!running) { running = true; requestAnimationFrame(frame); } }
  function kick() { schedule(); }

  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true; kick();
  }, { passive: true });
  document.addEventListener('pointerleave', function () { mouse.on = false; kick(); });
  window.addEventListener('blur', function () { mouse.on = false; kick(); });
  window.addEventListener('resize', layout);
  document.addEventListener('visibilitychange', kick);
  new MutationObserver(readColors).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', readColors);
  reduce.addEventListener('change', kick);
  layout(); readColors();
})();
