// NAVE · película de marca · componente React
// El componente solo administra el reloj, el lienzo y los controles; cada cuadro lo dibuja motor.js.
//
//   import { createNaveFilm } from './NaveFilm.js';
//   const NaveFilm = createNaveFilm(React);
//   <NaveFilm bpm={104} autoplay loop={false} controles />
//
// No importa React: lo recibe. Así sirve igual con los UMD de una página estática que con un bundler.

import { crearMotor, ESCENAS, CONTENIDO, PALETA, FUENTES, W, H } from './motor.js';

export { ESCENAS, CONTENIDO, PALETA, FUENTES };

export function createNaveFilm(React) {
  const { useEffect, useRef, useState, useMemo, useCallback, createElement: h } = React;

  function NaveFilm({ bpm, escenas = ESCENAS, contenido = CONTENIDO, colores, fuentes, autoplay = true, loop = false, controles = true, onReady, style }) {
    const motor = useMemo(() => crearMotor({ bpm, escenas, contenido, colores, fuentes }), [bpm, escenas, contenido, colores, fuentes]);
    const caja = useRef(null), lienzo = useRef(null);
    const reloj = useRef({ base: 0, desde: 0, play: autoplay });
    const [play, setPlay] = useState(autoplay);
    const [t, setT] = useState(0);
    const [caja16, setCaja16] = useState({ w: 640, h: 360 });
    const reducido = useRef(false);

    // movimiento reducido y tamaño: el lienzo siempre es 16:9 y se dibuja a la resolución real de pantalla (hasta 2560)
    useEffect(() => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const f = () => { reducido.current = mq.matches; }; f(); mq.addEventListener('change', f);
      const ro = new ResizeObserver(([e]) => {
        const { width: cw, height: ch } = e.contentRect;
        const w = Math.min(cw, (ch * 16) / 9);
        setCaja16({ w, h: (w * 9) / 16 });
      });
      ro.observe(caja.current);
      return () => { mq.removeEventListener('change', f); ro.disconnect(); };
    }, []);

    const dibujar = useCallback((tt) => {
      const cv = lienzo.current; if (!cv) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pw = Math.max(320, Math.min(W, Math.round(caja16.w * dpr))), ph = Math.round((pw * 9) / 16);
      if (cv.width !== pw) { cv.width = pw; cv.height = ph; }
      const ctx = cv.getContext('2d');
      ctx.setTransform(pw / W, 0, 0, ph / H, 0, 0);
      motor.render(ctx, tt, { reducido: reducido.current, bucle: loop });
    }, [motor, caja16, loop]);

    // reloj único: tiempo = base + (ahora − desde) mientras corre; pausar, buscar y repetir solo mueven la base
    useEffect(() => {
      let raf, ultimoUI = 0;
      const tick = (ahora) => {
        const r = reloj.current;
        let tt = r.base;
        if (r.play) {
          tt = r.base + (ahora - r.desde) / 1000;
          if (tt >= motor.duracion) {
            if (loop) { r.base = 0; r.desde = ahora; tt = 0; }
            else { tt = motor.duracion; r.base = tt; r.play = false; setPlay(false); }
          }
        }
        dibujar(tt);
        if (ahora - ultimoUI > 100) { ultimoUI = ahora; setT(tt); }
        raf = requestAnimationFrame(tick);
      };
      reloj.current.desde = performance.now();
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [motor, dibujar, loop]);

    const ahoraT = () => { const r = reloj.current; return r.play ? r.base + (performance.now() - r.desde) / 1000 : r.base; };
    const ir = useCallback((s) => { const r = reloj.current; r.base = Math.min(Math.max(0, s), motor.duracion); r.desde = performance.now(); setT(r.base); }, [motor]);
    const alternar = useCallback((v) => {
      const r = reloj.current, nuevo = typeof v === 'boolean' ? v : !r.play;
      r.base = ahoraT(); if (nuevo && r.base >= motor.duracion) r.base = 0;
      r.desde = performance.now(); r.play = nuevo; setPlay(nuevo);
    }, [motor]);
    const repetir = useCallback(() => { ir(0); alternar(true); }, [ir, alternar]);

    useEffect(() => {
      onReady && onReady({ seek: (s) => { alternar(false); ir(s); }, play: () => alternar(true), pause: () => alternar(false), replay: repetir, duracion: motor.duracion, escenas: motor.escenas, spb: motor.spb });
    }, [motor, ir, alternar, repetir, onReady]);

    useEffect(() => {
      if (!controles) return;
      const k = (e) => {
        if (e.target && e.target.tagName === 'BUTTON' && e.code === 'Space') return;
        if (e.code === 'Space') { e.preventDefault(); alternar(); }
        else if (e.key === 'r' || e.key === 'R') repetir();
        else if (e.key === 'ArrowRight') ir(ahoraT() + 2);
        else if (e.key === 'ArrowLeft') ir(ahoraT() - 2);
      };
      window.addEventListener('keydown', k);
      return () => window.removeEventListener('keydown', k);
    }, [controles, alternar, repetir, ir]);

    const d = motor.duracion;
    const btn = { font: `500 12px ${FUENTES.mono}`, letterSpacing: '.1em', textTransform: 'uppercase', color: PALETA.crema, background: 'transparent',
      border: '1px solid rgba(255,245,238,.28)', borderRadius: 999, padding: '9px 16px', cursor: 'pointer', minHeight: 36 };
    return h('div', { style: { position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: PALETA.noche, ...style } },
      h('div', { ref: caja, style: { position: 'relative', flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        h('canvas', { ref: lienzo, role: 'img', 'aria-label': 'NAVE · Tech Company & Venture Builder. Película de marca.', style: { width: caja16.w, height: caja16.h, display: 'block' } })),
      controles && h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px 12px', flexWrap: 'wrap' } },
        h('button', { style: btn, onClick: () => alternar() }, play ? 'Pausa' : 'Reproducir'),
        h('button', { style: btn, onClick: repetir }, 'Repetir'),
        h('div', { style: { position: 'relative', flex: '1 1 200px', height: 28, cursor: 'pointer' }, role: 'slider', 'aria-label': 'Línea de tiempo', 'aria-valuemin': 0, 'aria-valuemax': Math.round(d), 'aria-valuenow': Math.round(t), tabIndex: 0,
          onClick: (e) => { const r = e.currentTarget.getBoundingClientRect(); ir(((e.clientX - r.left) / r.width) * d); } },
          h('div', { style: { position: 'absolute', left: 0, right: 0, top: 13, height: 2, background: 'rgba(255,245,238,.18)' } }),
          motor.escenas.map((e) => h('div', { key: e.id, title: e.cap || 'Arranque', style: { position: 'absolute', top: 8, height: 12, width: 1, left: `${((e.inicio * motor.spb) / d) * 100}%`, background: 'rgba(255,245,238,.4)' } })),
          h('div', { style: { position: 'absolute', left: 0, top: 13, height: 2, width: `${(t / d) * 100}%`, background: PALETA.ign } })),
        h('span', { style: { font: `500 12px ${FUENTES.mono}`, color: PALETA.niebla, fontVariantNumeric: 'tabular-nums', minWidth: 96, textAlign: 'right' } }, `${t.toFixed(1)} / ${d.toFixed(0)} s`)));
  }
  return NaveFilm;
}
