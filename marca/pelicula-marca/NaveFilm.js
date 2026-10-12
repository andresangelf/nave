// NAVE · película de marca
// Componente React reutilizable. No importa React: lo recibe, así funciona igual
// con los UMD de una página estática que con un bundler (ver README.md).
//
//   const NaveFilm = createNaveFilm({ React, html: htm.bind(React.createElement) });
//   <NaveFilm bpm={120} autoplay loop />
//
// Toda la coreografía cuelga de un solo reloj (requestAnimationFrame) medido en
// beats. Cada escena declara su duración en ESCENAS; cada elemento declara en qué
// beat local entra. Cambiar el tempo o la duración de una escena no exige tocar
// ningún elemento.

import { SIMBOLO, LETRAS } from './activos.js';

/* ───────────────────────── identidad ───────────────────────── */

export const PALETA = {
  noche: '#00131D', espacio: '#012436', crema: '#FFF5EE', niebla: '#D7E1E2',
  acero: '#798E91', ign: '#E55C41', ambar: '#EFA441', petroleo: '#005A88',
  tarjeta: '#F2EEEA', tinta: '#0D3550',
};

export const TIPOS = {
  mono: '"Lenia Mono","JetBrains Mono",ui-monospace,Menlo,monospace',
  sans: '"Standerd","Inter Tight","Helvetica Neue",Arial,sans-serif',
};

/* ───────────────────────── contenido (deck NAVE · Tech Company & Venture Builder) ───────────────────────── */

export const CONTENIDO = {
  bajada: 'Tech Company & Venture Builder',
  manifiesto: [
    'Nos obsesionamos por cambiar la realidad',
    'de una empresa, idea o persona,',
    'para hacerla mejor.',
  ],
  queEs: {
    experiencia: ['Somos una organización respaldada por más de', 'años de experiencia acumulada en la industria tecnológica.'],
    corporativo: ['la rigurosidad', 'la seguridad', 'la escala'],
    corporativoPie: 'de los grandes retos corporativos',
    agil: ['la agilidad', 'el enfoque de activos digitales'],
    agilPie: 'requeridos por una Startup, PyME o un fundador.',
    verbos: ['diseña', 'automatiza', 'opera'],
    tecnologias: ['IA', 'blockchain', 'Tech Equity'],
  },
  clientes: {
    tech: 'Con enfoque a cuentas corporativas y gobiernos, que presentan retos y objetivos de transformación digital, modernización, adaptación a la economía digital y que buscan una ejecución ágil, escalable, segura y con calidad en tiempo récord.',
    venture: 'Con enfoque a emprendedores, startups, fundadores y empresas que quieren escalar, a través de la innovación, creación de activos digitales y poner tecnología en el core de su negocio.',
  },
  ofreceTech: [
    ['Tech Consultant', 'Consultoría técnica en: modernización de procesos, ruta de evolución digital, gestión de datos y nivel de madurez / FinOps de IT.'],
    ['Next-Gen Software Factory', 'Construimos software a la medida de manera inteligente y escalable, utilizando marcos de referencia e ISOs. Legacy Modernization Lite.'],
    ['Digital Assets portfolio', 'Portafolio de activos digitales, apps y software propio y de partners.'],
    ['Talent Integration', 'Integramos talento con experiencia en nuestros clientes, pero con metodologías, governance y garantía de resultados.'],
    ['Managed Cloud & Business Continuity', 'Soporte 24/7, DevSecOps y Monitoreo (Observabilidad Avanzada).'],
  ],
  ofreceVenture: [
    ['Tech Foundry', 'Pilar de consultoría, utilizando nuestra metodología de Tech Foundry para fusionar visiones y trazar el futuro de nuestros clientes. Evaluación de concepto de negocio escalable, creación de strategy plan, business plan & business case.'],
    ['Venture Studio', 'Utilizamos IA & Blockchain para construir el activo digital desde el MVP hasta la puesta en producción, y el respectivo soporte de mantenimiento y continuidad de la operación.'],
    ['Tech Equity Business model', 'Es un modelo financiero de inversión de tecnología para la startup. Al inyectar tech equity, NAVE se convierte en accionista de la empresa a crear.'],
  ],
  modelo: {
    bases: ['Fábrica de Software automatizada con IA y Blockchain', 'Estándares ISO y marcos de referencia', 'Rapidez y calidad garantizada'],
    marcos: [
      ['Gobierno & gestión', ['ISO 21500', 'IEEE 1058', 'PMBOK', 'Ágil/Scrum']],
      ['Seguridad & riesgo', ['ISO 27001', 'NIST CSF 2.0', 'OWASP Top 10', 'Magerit v3', 'ISO 31000']],
      ['Arquitectura & requisitos', ['ISO/IEC/IEEE 42010', 'ISO 12207', 'SWEBOK', 'IEEE 1233', 'ISO 830']],
      ['Calidad & testing', ['ISO 29119', 'IEEE 829', 'ISTQB']],
    ],
  },
  partnersBajada: 'Nave opera con un ecosistema de alianzas estratégicas con los líderes mundiales de la tecnología.',
  partners: [
    ['Oracle', 'Bases de datos empresariales, infraestructura cloud en blockchain.'],
    ['NVIDIA', 'GPUs para IA, plataformas de cómputo acelerado y Physical AI para centros de datos.'],
    ['AWS', 'Infraestructura escalable y soluciones empresariales de IA/ML.'],
    ['Google', 'Google Cloud Platform, AI y herramientas de desarrollo con IA generativa avanzada.'],
    ['Supabase', 'Plataforma backend-as-a-service con bases de datos Postgres, autenticación y herramientas para desarrollo rápido de aplicaciones modernas.'],
    ['Ripple', 'Blockchain empresarial, pagos globales instantáneos y tecnología de activos digitales y tokenización para instituciones financieras.'],
    ['Anthropic', 'Modelos de lenguaje Claude para construcción de agentes IA seguros y de alto rendimiento.'],
  ],
  valores: [
    'Atención radical al detalle',
    'Inquebrantabilidad, nos negamos a rendirnos',
    'Compromiso con el impacto positivo',
    'Atracción de clientes y talento élite',
    'Propósito de transformar realidades',
    'Intensidad por ganar, mejorar y crecer',
    'Queremos promover nuevos estándares',
  ],
  roles: [
    { sigla: 'CEO', nombre: ['CEO &', 'Founder'], cargo: 'Chief Executive Officer & Founder',
      lema: 'El estratega del ecosistema, los inversores y la visión del negocio Web3.',
      funciones: ['Estrategia Corporativa y Visión', 'Relaciones con Inversores y Capital', 'Desarrollo de Alianzas de Alto Nivel', 'Gobernanza Institucional y Cumplimiento Regulatorio', 'Cultura Corporativa y Alineación'] },
    { sigla: 'CTO', nombre: ['CTO &', 'Co-founder'], cargo: 'Chief Technology Officer',
      lema: 'El arquitecto de la fábrica automatizada de software, blockchain y la ingeniería con IA.',
      funciones: ['Arquitectura y Core Blockchain', 'Automatización de la Fábrica de Software', 'Auditoría de Código y Calidad (QA)', 'Gobernanza de Datos e IA', 'Innovación e Investigación (I+D)'] },
    { sigla: 'CGO', nombre: ['CGO &', 'Co-founder'], cargo: 'Chief Growth Officer',
      lema: 'El motor de ingresos, adquisición de clientes corporativos y posicionamiento de marca.',
      funciones: ['Estrategia de Ventas B2B Enterprise', 'Ingeniería de Ventas (Technical Sales)', 'Estrategia de Product-Led Growth (PLG)', 'Marketing de Contenidos y Educación', 'Expansión Geográfica y de Canales'] },
    { sigla: 'COO', nombre: ['COO &', 'Co-founder'], cargo: 'Chief Operating Officer',
      lema: 'El garante de la continuidad de negocio 24/7, los procesos ITIL y las certificaciones ISO.',
      funciones: ['Operación y Soporte de Misión Crítica 24/7', 'Integración DevSecOps + ITIL', 'Gestión de Certificaciones ISO', 'Ingeniería de Fiabilidad (SRE)', 'Gestión del Talento Humano Técnico'] },
    { sigla: 'CFO', nombre: ['CFO'], cargo: 'Chief Financial Officer',
      lema: 'Estrategia financiera, tesorería cripto/fiat y costos de infraestructura.',
      funciones: ['Planificación Financiera y Presupuesto', 'Gestión de Tesorería Híbrida (Cripto y Fiat)', 'Estrategia de Precios (Pricing Models)', 'Estrategia y Auditoría de Tokenomics', 'Control de Costes de Infraestructura (FinOps)'] },
  ],
  directores: {
    titulo: 'Managing Director por país',
    reporta: 'Reporta al CEO',
    paises: [['Managing', 'Director', 'Hon'], ['Managing', 'Director', 'GT']],
    funciones: ['Planificación de estrategia, ejecución y cumplimiento de presupuesto de ventas', 'Administración del talento local', 'Creación de estrategias de crecimiento y cobertura de mercados'],
  },
  cierre: ['¿PREGUNTAS?', 'Listos para el despegue.'],
};

/* ───────────────────────── línea de tiempo (en beats) ─────────────────────────
   ritmo: anticipación → introducción → desarrollo → pico → resolución          */

export const ESCENAS = [
  { id: 'apertura',    titulo: 'Despegue',                beats: 12, fondo: 'espacio', etapa: 'anticipación' },
  { id: 'manifiesto',  titulo: 'Manifiesto',              beats: 11, fondo: 'espacio', etapa: 'introducción' },
  { id: 'queEs',       titulo: '¿Qué es NAVE?',           beats: 15, fondo: 'espacio', etapa: 'introducción' },
  { id: 'clientes',    titulo: 'Nuestros clientes',       beats: 11, fondo: 'espacio', etapa: 'desarrollo' },
  { id: 'ofreceTech',  titulo: '¿Qué ofrece? · Tech',     beats: 11, fondo: 'espacio', etapa: 'desarrollo', salida: 'chevron' },
  { id: 'ofreceVenture', titulo: '¿Qué ofrece? · Venture', beats: 9, fondo: 'ign',     etapa: 'desarrollo', salida: 'chevron' },
  { id: 'modelo',      titulo: 'Modelo Operativo',        beats: 11, fondo: 'espacio', etapa: 'desarrollo' },
  { id: 'partners',    titulo: 'Partners Tech',           beats: 9,  fondo: 'espacio', etapa: 'desarrollo' },
  { id: 'valores',     titulo: '¿Qué nos rige?',          beats: 14, fondo: 'espacio', etapa: 'pico' },
  { id: 'estructura',  titulo: 'Estructura Organizativa', beats: 20, fondo: 'espacio', etapa: 'pico' },
  { id: 'cierre',      titulo: 'Listos',                  beats: 12, fondo: 'espacio', etapa: 'resolución' },
];

export function armarLinea(escenas = ESCENAS) {
  let b = 0;
  const lista = escenas.map((e) => { const s = { ...e, inicio: b, fin: b + e.beats }; b += e.beats; return s; });
  return { escenas: lista, total: b };
}

/* ───────────────────────── matemáticas de movimiento ───────────────────────── */

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (x, a, d) => clamp((x - a) / d);
const mix = (a, b, t) => a + (b - a) * t;
export const EASE = {
  lineal: (t) => t,
  out: (t) => 1 - Math.pow(1 - t, 3),
  outExpo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  in: (t) => t * t * t,
  back: (t) => { const c = 1.6, c3 = c + 1; return 1 + c3 * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
};

/* ───────────────────────── componente ───────────────────────── */

export function createNaveFilm({ React, html }) {
  const { useEffect, useRef, useState, useCallback, useMemo } = React;

  /* símbolo y logotipo a partir de los SVG del repositorio */
  function Simbolo({ size, color, trazo = 0, relleno = 1, trazoColor, style }) {
    return html`<svg viewBox="0 0 200 200" width=${size} height=${size} style=${{ overflow: 'visible', display: 'block', ...style }}>
      ${SIMBOLO.map((d, i) => html`<path key=${i} d=${d} fill=${color} fill-opacity=${relleno}
        stroke=${trazoColor || color} stroke-width=${trazo > 0 && trazo < 1 ? 2.2 : 0} pathLength="1"
        stroke-dasharray="1" stroke-dashoffset=${1 - trazo} />`)}
    </svg>`;
  }

  function Letras({ alto, color, revela = [1, 1, 1, 1] }) {
    const w = (alto * 471) / 124;
    return html`<svg viewBox="-2 55 471 124" width=${w} height=${alto} style=${{ display: 'block', overflow: 'hidden' }}>
      ${LETRAS.map((d, i) => html`<path key=${i} d=${d} fill=${color}
        style=${{ transform: `translateY(${(1 - revela[i]) * 125}px)`, transition: 'none' }} />`)}
    </svg>`;
  }

  function Flecha({ size, color, giro = 0, style }) {
    return html`<svg viewBox="0 0 96 96" width=${size} height=${size} style=${{ display: 'block', transform: `rotate(${giro}deg)`, ...style }}>
      <path transform="translate(14 18.7)" fill=${color} d="M71.3 24C74.23 26.93 74.23 31.68 71.3 34.61L47.3 58.61 36.7 48 47.89 36.8H0V21.8H47.89L36.7 10.61 47.3 0 71.3 24Z" />
    </svg>`;
  }

  /* contexto de animación por escena */
  function crearCtx({ b, e, reducido, P, FW, FH, C, F, k, beat }) {
    // entrada estándar: devuelve estilo a partir del beat local en que aparece
    const entra = (at, o = {}) => {
      const { len = 1, x = 0, y = 32, s = 1, ease = 'outExpo', rot = 0 } = o;
      const p = seg(b, at, len);
      if (reducido) return { opacity: seg(b, at, 0.6) };
      const q = EASE[ease](p);
      const sc = mix(s, 1, q);
      return {
        opacity: clamp(p * 2.2),
        transform: `translate(${mix(x, 0, q)}px, ${mix(y, 0, q)}px) scale(${sc}) rotate(${mix(rot, 0, q)}deg)`,
      };
    };
    // salida de escena: últimos `len` beats
    const sale = (len = 1, adelanto = 0) => {
      const p = seg(b, e.beats - len - adelanto, len);
      return reducido ? 1 - p : 1 - EASE.in(p);
    };
    const tipea = (txt, at, len) => txt.slice(0, Math.round(txt.length * (reducido ? (b >= at ? 1 : 0) : seg(b, at, len))));
    return { b, e, reducido, P, FW, FH, C, F, k, entra, sale, tipea, seg: (a, d) => seg(b, a, d), beat };
  }

  /* ── piezas tipográficas comunes ── */
  // el tamaño se ajusta al ancho disponible para que ningún título se recorte (≈0.6 em por carácter monoespaciado)
  const titulo = (c, partes, at = 0, extra = {}) => html`<h2 style=${{
      margin: 0, fontFamily: c.F.mono, fontWeight: 400,
      fontSize: Math.min(c.P ? 84 : 104, (c.FW - (c.P ? 140 : 240)) / (0.62 * partes.reduce((n, [t]) => n + t.length, 0))), lineHeight: 1, letterSpacing: '-0.02em',
      color: c.C.crema, whiteSpace: 'nowrap', ...c.entra(at, { x: -60, y: 0, len: 1.2 }), ...extra }}>
      ${partes.map(([t, w], i) => html`<span key=${i} style=${{ fontWeight: w || 400 }}>${t}</span>`)}
    </h2>`;

  const etiqueta = (c, txt, at, color) => html`<div style=${{
      fontFamily: c.F.mono, fontSize: 20, letterSpacing: '0.14em', textTransform: 'uppercase',
      color: color || c.C.ign, ...c.entra(at, { y: 12 }) }}>${txt}</div>`;

  const marco = (c, children, extra = {}) => html`<div style=${{
      position: 'absolute', inset: 0, padding: c.P ? '150px 70px 130px' : '96px 120px 110px',
      display: 'flex', flexDirection: 'column', gap: 28, boxSizing: 'border-box', ...extra }}>${children}</div>`;

  /* ── escenas ── */
  const Escenas = {
    apertura(c) {
      const { b, C, FW, FH, P } = c;
      const punto = c.reducido ? 0 : (b < 4.6 ? 1 : 1 - seg(b, 4.6, 0.6));
      const pop = c.reducido ? 1 : EASE.back(seg(b, 0.5, 0.8));
      const parpadeo = b > 1.6 && b < 1.85 ? 0.15 : b > 2.1 && b < 2.35 ? 0.15 : 1;
      const traza = c.reducido ? 1 : EASE.inOut(seg(b, 2.5, 2.2));
      const relleno = c.reducido ? 1 : seg(b, 4.4, 1);
      const mov = c.reducido ? 1 : EASE.inOut(seg(b, 6, 1.6));
      const grande = P ? 380 : 340, chico = P ? 190 : 176;
      const sz = mix(grande, chico, mov);
      const altoL = chico * 0.62, anchoL = (altoL * 471) / 124, gap = 46;
      const anchoTotal = P ? Math.max(chico, anchoL) : chico + gap + anchoL;
      const cx = FW / 2, cy = FH / 2 - (P ? 80 : 40);
      const finX = P ? cx : cx - anchoTotal / 2 + chico / 2;
      const finY = P ? cy - 130 : cy;
      const sx = mix(cx, finX, mov), sy = mix(cy, finY, mov);
      const revela = [0, 1, 2, 3].map((i) => (c.reducido ? (b > 7 ? 1 : 0) : EASE.outExpo(seg(b, 6.8 + i * 0.35, 1))));
      const lx = P ? cx - anchoL / 2 : finX + chico / 2 + gap, ly = P ? cy + 30 : cy - altoL / 2;
      const regla = c.reducido ? (b > 8.5 ? 1 : 0) : EASE.inOut(seg(b, 8.5, 1));
      const s = c.sale(1.2);
      const despegue = c.reducido ? 0 : EASE.in(seg(b, c.e.beats - 1.2, 1.2)) * -60;
      return html`<div style=${{ position: 'absolute', inset: 0, opacity: s, transform: `translateY(${despegue}px)` }}>
        <div style=${{ position: 'absolute', left: cx - 9, top: cy - 9 + 14, width: 18, height: 18, borderRadius: 9,
          background: C.ign, opacity: punto * parpadeo, transform: `scale(${pop})`,
          boxShadow: `0 0 ${24 * pop}px ${C.ign}88` }} />
        <div style=${{ position: 'absolute', left: sx - sz / 2, top: sy - sz / 2 }}>
          <${Simbolo} size=${sz} color=${C.ign} trazo=${traza} relleno=${relleno} trazoColor=${C.crema} />
        </div>
        <div style=${{ position: 'absolute', left: lx, top: ly }}><${Letras} alto=${altoL} color=${C.crema} revela=${revela} /></div>
        <div style=${{ position: 'absolute', left: cx - 78, top: (P ? ly + altoL : cy + chico / 2) + 64, width: 156, height: 4,
          background: C.ign, transform: `scaleX(${regla})` }} />
        <div style=${{ position: 'absolute', left: 0, right: 0, top: (P ? ly + altoL : cy + chico / 2) + 96, textAlign: 'center',
          fontFamily: c.F.mono, fontSize: P ? 40 : 44, color: C.crema, letterSpacing: '0.01em' }}>
          ${c.tipea(c.k.bajada, 9.2, 1.8)}<span style=${{ opacity: b > 9 && b < 11.5 && Math.floor(b * 2) % 2 === 0 ? 1 : 0, color: C.ign }}>▍</span>
        </div>
      </div>`;
    },

    manifiesto(c) {
      const { C, k, P } = c;
      const [l1, l2, l3] = k.manifiesto;
      const palabras = (txt, at, paso, estiloFn) => txt.split(' ').map((w, i) => html`<span key=${i}
        style=${{ display: 'inline-block', marginRight: '0.6ch', ...c.entra(at + i * paso, { y: 46, len: 0.9 }), ...(estiloFn ? estiloFn(w) : {}) }}>${w}</span>`);
      const linea = { fontFamily: c.F.mono, fontStyle: 'italic', fontSize: P ? 54 : 68, lineHeight: 1.32, color: C.crema };
      const acento = (w) => (/empresa|idea|persona/.test(w) ? { color: C.ambar } : {});
      const s = c.sale(1);
      return html`<div style=${{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center', padding: P ? '0 70px' : '0 160px', opacity: s,
          transform: `translateY(${(1 - s) * -40}px)` }}>
        <div style=${linea}>${palabras(l1, 0.4, 0.28)}</div>
        <div style=${linea}>${palabras(l2, 2.8, 0.42, acento)}</div>
        <div style=${linea}>${l3.split(' ').map((w, i) => html`<span key=${i} style=${{ display: 'inline-block', marginRight: '0.6ch',
            ...c.entra(5.6 + i * 0.5, { y: 46, len: 0.9 }), ...(w === 'mejor.' ? { color: C.ign, fontWeight: 700 } : {}) }}>${w}</span>`)}</div>
        <div style=${{ width: 156, height: 4, background: C.ign, marginTop: 64, transform: `scaleX(${c.reducido ? (c.b > 7.6 ? 1 : 0) : EASE.inOut(c.seg(7.6, 1))})` }} />
        <div style=${{ fontFamily: c.F.sans, fontSize: 30, letterSpacing: '0.18em', color: C.crema, marginTop: 22, ...c.entra(8.1, { y: 14 }) }}>NAVE</div>
      </div>`;
    },

    queEs(c) {
      const { C, k, P, b } = c;
      const q = k.queEs;
      const anios = Math.round(25 * (c.reducido ? 1 : EASE.out(c.seg(2, 2.4))));
      const vis = (ini, fin) => b >= ini - 0.5 && b <= fin + 0.6;
      const salidaB = (fin) => (c.reducido ? {} : { transform: `translateY(${-50 * EASE.in(c.seg(fin, 0.6))}px)`, opacity: 1 - c.seg(fin, 0.6) });
      const pill = (txt, at, color, fondo) => html`<div key=${txt} style=${{ fontFamily: c.F.mono, fontSize: P ? 34 : 40, color, background: fondo,
          padding: '10px 22px', borderRadius: 999, whiteSpace: 'nowrap', ...c.entra(at, { y: 0, x: 0, s: 0.6, ease: 'back', len: 0.8 }) }}>${txt}</div>`;
      const s = c.sale(1);
      return html`<div style=${{ position: 'absolute', inset: 0, opacity: s }}>
        ${marco(c, html`
          ${titulo(c, [['¿Qué es '], ['NAVE', 700], ['?']], 0)}
          <div style=${{ fontFamily: c.F.mono, fontWeight: 700, fontSize: P ? 34 : 40, color: C.crema, ...c.entra(0.6, { y: 16 }) }}>${k.bajada}</div>
          <div style=${{ position: 'relative', flex: 1 }}>
            ${vis(1.5, 6.4) && html`<div style=${{ position: 'absolute', inset: 0, display: 'flex', flexDirection: P ? 'column' : 'row',
                alignItems: P ? 'flex-start' : 'center', gap: P ? 10 : 56, ...salidaB(6.4) }}>
              <div style=${{ fontFamily: c.F.mono, fontWeight: 700, fontSize: P ? 300 : 360, lineHeight: 0.9, color: C.ign, letterSpacing: '-0.06em', ...c.entra(1.8, { y: 60, len: 1 }) }}>
                ${anios}<span style=${{ color: C.ambar }}>+</span></div>
              <div style=${{ maxWidth: 820 }}>
                <div style=${{ fontFamily: c.F.sans, fontSize: P ? 34 : 38, color: C.niebla, ...c.entra(2.3, { y: 20 }) }}>${q.experiencia[0]}</div>
                <div style=${{ fontFamily: c.F.mono, fontSize: P ? 46 : 54, color: C.crema, lineHeight: 1.2, marginTop: 14, ...c.entra(3, { y: 24 }) }}>${q.experiencia[1]}</div>
              </div>
            </div>`}
            ${vis(6.6, 10.1) && html`<div style=${{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26, ...salidaB(10.1) }}>
              ${etiqueta(c, 'Fusionamos', 6.6)}
              <div style=${{ display: 'flex', flexDirection: P ? 'column' : 'row', gap: P ? 30 : 40, alignItems: P ? 'stretch' : 'center' }}>
                <div style=${{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style=${{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>${q.corporativo.map((t, i) => pill(t, 7 + i * 0.25, C.espacio, C.crema))}</div>
                  <div style=${{ fontFamily: c.F.sans, fontSize: 30, color: C.niebla, ...c.entra(7.9) }}>${q.corporativoPie}</div>
                </div>
                <div style=${{ fontFamily: c.F.mono, fontSize: 90, color: C.ign, textAlign: 'center', ...c.entra(8.2, { s: 0.3, y: 0, ease: 'back', rot: -90 }) }}>+</div>
                <div style=${{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style=${{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>${q.agil.map((t, i) => pill(t, 8.6 + i * 0.25, C.crema, C.ign))}</div>
                  <div style=${{ fontFamily: c.F.sans, fontSize: 30, color: C.niebla, ...c.entra(9.2) }}>${q.agilPie}</div>
                </div>
              </div>
            </div>`}
            ${vis(10.7, 99) && html`<div style=${{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22,
                fontFamily: c.F.mono, fontSize: P ? 44 : 56, color: C.crema, lineHeight: 1.15 }}>
              <div style=${c.entra(11, { y: 30 })}>Somos el <em style=${{ color: C.ign }}>socio de ejecución</em> que</div>
              <div style=${{ display: 'flex', gap: 30, flexWrap: 'wrap', alignItems: 'baseline' }}>
                ${q.verbos.map((v, i) => html`<span key=${v} style=${{ fontWeight: 700, fontSize: P ? 64 : 84, ...c.entra(11.6 + i * 0.5, { y: 70, len: 0.8, ease: 'back' }) }}>${v}${i < 2 ? ',' : ''}</span>`)}
                <span style=${c.entra(13, { y: 20 })}>sistemas</span>
              </div>
              <div style=${{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', fontSize: P ? 34 : 40 }}>
                <span style=${c.entra(13.2, { y: 16 })}>usando</span>
                ${q.tecnologias.map((t, i) => pill(t, 13.4 + i * 0.25, C.crema, 'transparent'))}
              </div>
              <div style=${{ fontStyle: 'italic', color: C.ambar, ...c.entra(13.9, { y: 16 }) }}>para transformar la realidad.</div>
            </div>`}
          </div>
        `)}
      </div>`;
    },

    clientes(c) {
      const { C, k, P, FW, FH } = c;
      const abre = c.reducido ? 1 : EASE.outExpo(c.seg(0.8, 1.4));
      const cierra = c.reducido ? 0 : EASE.inOut(c.seg(c.e.beats - 1.2, 1.2));
      const panel = abre * (1 - cierra);
      const parr = (txt, at, mono) => html`<p style=${{ margin: 0, fontFamily: mono ? c.F.mono : c.F.sans, fontSize: P ? 34 : 38,
          lineHeight: 1.38, color: C.crema, maxWidth: 720, ...c.entra(at, { y: 30, len: 1.2 }) }}>${txt}</p>`;
      const col = (cab, txt, at, mono) => html`<div style=${{ display: 'flex', flexDirection: 'column', gap: 30, flex: 1 }}>
          <div style=${{ fontFamily: mono ? c.F.mono : c.F.sans, fontWeight: 700, fontSize: P ? 44 : 50, color: C.crema, ...c.entra(at, { x: -30, y: 0 }) }}>${cab}</div>
          ${parr(txt, at + 0.6, mono)}</div>`;
      const s = c.sale(1, 0.2);
      return html`<div style=${{ position: 'absolute', inset: 0 }}>
        <div style=${P
          ? { position: 'absolute', left: 0, right: 0, bottom: 0, height: FH * 0.6, background: C.ign, transform: `translateY(${(1 - panel) * 100}%)` }
          : { position: 'absolute', top: 0, bottom: 0, right: 0, width: FW * 0.48, background: C.ign, transform: `translateX(${(1 - panel) * 100}%)` }} />
        <div style=${{ position: 'absolute', inset: 0, opacity: s }}>
          ${marco(c, html`
            ${titulo(c, [['Nuestros clientes', 700]], 0)}
            <div style=${{ display: 'flex', flexDirection: P ? 'column' : 'row', gap: P ? 130 : 140, marginTop: P ? 50 : 40 }}>
              ${col('Tech Company', k.clientes.tech, 2, false)}
              ${col('Venture Builder', k.clientes.venture, 4.2, true)}
            </div>`)}
        </div>
      </div>`;
    },

    ofreceTech(c) { return ofrece(c, 'Tech Company', c.k.ofreceTech, false); },
    ofreceVenture(c) { return ofrece(c, 'Venture Builder', c.k.ofreceVenture, true); },

    modelo(c) {
      const { C, k, P } = c;
      const banda = c.reducido ? 1 : EASE.outExpo(c.seg(2, 1.2));
      const s = c.sale(1);
      return html`<div style=${{ position: 'absolute', inset: 0, opacity: s, transform: `translateY(${(1 - s) * -30}px)` }}>
        ${marco(c, html`
          ${titulo(c, [['Modelo Operativo']], 0)}
          <div style=${{ display: 'flex', gap: 40, marginTop: 6 }}>
            ${['Tech Company', 'Venture Builder'].map((t, i) => html`<div key=${t} style=${{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <div style=${{ fontFamily: i ? c.F.mono : c.F.sans, fontWeight: 700, fontSize: P ? 34 : 40, color: C.crema, ...c.entra(0.5 + i * 0.25, { y: 14 }) }}>${t}</div>
              <div style=${{ marginLeft: 40, ...c.entra(1 + i * 0.5, { y: -50, ease: 'back', len: 0.7 }) }}><${Flecha} size=${54} color=${C.crema} giro=${90} /></div>
            </div>`)}
          </div>
          <div style=${{ background: C.ign, padding: P ? '26px 32px' : '30px 54px', transform: `scaleX(${banda})`, transformOrigin: 'left center',
              fontFamily: c.F.mono, color: C.crema, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style=${{ fontWeight: 700, fontSize: P ? 34 : 40, ...c.entra(2.8, { y: 12 }) }}>Ambos modelos operan bajo:</div>
            ${k.modelo.bases.map((t, i) => html`<div key=${t} style=${{ fontSize: P ? 30 : 42, ...c.entra(3.3 + i * 0.5, { x: 40, y: 0 }) }}>${i + 1}. ${t}</div>`)}
          </div>
          <div style=${{ display: 'grid', gridTemplateColumns: P ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 24, marginTop: 6 }}>
            ${k.modelo.marcos.map(([cab, chips], i) => html`<div key=${cab} style=${{ background: '#fff', padding: '24px 24px 26px', ...c.entra(5.2 + i * 0.25, { y: 60, len: 0.9 }) }}>
              <div style=${{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 25, color: '#B4553C', marginBottom: 16 }}>${cab}</div>
              <div style=${{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                ${chips.map((ch, j) => html`<span key=${ch} style=${{ fontFamily: c.F.sans, fontSize: 19, color: C.tinta, background: C.tarjeta, borderRadius: 999, padding: '8px 14px',
                    ...c.entra(5.7 + i * 0.25 + j * 0.125, { s: 0.5, y: 0, ease: 'back', len: 0.6 }) }}>${ch}</span>`)}
              </div>
            </div>`)}
          </div>`)}
      </div>`;
    },

    partners(c) {
      const { C, k, P } = c;
      const s = c.sale(1);
      return html`<div style=${{ position: 'absolute', inset: 0, opacity: s }}>
        ${marco(c, html`
          ${titulo(c, [['Nuestros Partners Tech']], 0)}
          <div style=${{ fontFamily: c.F.sans, fontSize: P ? 32 : 36, color: C.niebla, maxWidth: 1300, ...c.entra(0.6, { y: 16 }) }}>${k.partnersBajada}</div>
          <div style=${{ display: 'grid', gridTemplateColumns: P ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 14, marginTop: 10 }}>
            ${k.partners.map(([n, d], i) => {
              const ancho = i === k.partners.length - 1;
              return html`<div key=${n} style=${{ gridColumn: ancho ? '1 / -1' : 'auto', background: C.tarjeta, padding: '24px 30px', overflow: 'hidden',
                  ...c.entra(1.6 + i * 0.3, { y: 40, len: 0.9 }) }}>
                <div style=${{ fontFamily: c.F.sans, fontWeight: 800, fontSize: P ? 36 : 40, color: C.tinta, ...c.entra(1.8 + i * 0.3, { y: 30 }) }}>${n}</div>
                <div style=${{ fontFamily: c.F.sans, fontSize: P ? 22 : 24, color: C.tinta, lineHeight: 1.35, marginTop: 6, ...c.entra(2.1 + i * 0.3, { y: 10 }) }}>${d}</div>
              </div>`;
            })}
          </div>`)}
      </div>`;
    },

    valores(c) {
      const { C, k, P, b } = c;
      const v = k.valores;
      const t0 = 1, paso = 1.2, fin = t0 + v.length * paso; // 7 valores en ritmo, luego la lista
      const idx = clamp(Math.floor((b - t0) / paso), 0, v.length - 1);
      const enLista = b >= fin + 0.2;
      const local = b - (t0 + idx * paso);
      const salto = c.reducido ? 1 : EASE.back(clamp(local / 0.55));
      const s = c.sale(1);
      return html`<div style=${{ position: 'absolute', inset: 0, opacity: s }}>
        ${marco(c, html`
          ${titulo(c, [['¿Qué nos rige?']], 0)}
          <div style=${{ position: 'relative', flex: 1 }}>
            ${!enLista && b >= t0 - 0.2 && html`<div style=${{ position: 'absolute', inset: 0, display: 'flex', flexDirection: P ? 'column' : 'row',
                alignItems: P ? 'flex-start' : 'center', gap: P ? 20 : 70, opacity: 1 - c.seg(fin, 0.2) }}>
              <div style=${{ height: P ? 360 : 440, overflow: 'hidden', flex: 'none' }}>
                <div style=${{ fontFamily: c.F.mono, fontWeight: 700, fontSize: P ? 380 : 470, lineHeight: P ? '360px' : '440px', color: C.ign,
                    transform: `translateY(${(1 - salto) * 100}%)` }}>${idx + 1}</div>
              </div>
              <div style=${{ display: 'flex', flexDirection: 'column', gap: 26, maxWidth: 1050 }}>
                <div style=${{ display: 'flex', gap: 8 }}>${v.map((_, i) => html`<div key=${i} style=${{ width: 54, height: 6,
                    background: i <= idx ? C.ign : 'rgba(215,225,226,.2)' }} />`)}</div>
                <div key=${idx} style=${{ fontFamily: c.F.mono, fontWeight: 500, fontSize: P ? 62 : 82, lineHeight: 1.08, color: C.crema,
                    ...(c.reducido ? {} : { transform: `translateY(${(1 - EASE.outExpo(clamp(local / 0.7))) * 60}px)`, opacity: clamp(local / 0.3) }) }}>${v[idx]}</div>
              </div>
            </div>`}
            ${enLista && html`<div style=${{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: P ? 18 : 14 }}>
              ${v.map((t, i) => html`<div key=${t} style=${{ fontFamily: c.F.mono, fontSize: P ? 38 : 50, color: C.crema, display: 'flex', gap: 30,
                  ...c.entra(fin + 0.2 + i * 0.18, { x: -50, y: 0, len: 0.8 }) }}>
                <span style=${{ color: C.ign, fontWeight: 700 }}>${i + 1}.</span><span>${t}</span></div>`)}
            </div>`}
          </div>`)}
      </div>`;
    },

    estructura(c) {
      const { C, k, P, b, FW, FH } = c;
      const roles = k.roles;
      const cx = P ? FW / 2 : 610, cy = P ? 760 : FH / 2 + 60, R = P ? 330 : 300, rc = P ? 92 : 88;
      const ang = (i) => (-90 + i * 72) * (Math.PI / 180);
      const giro = c.reducido ? 0 : b * 2.2; // flujo orbital continuo, secundario
      const foco0 = 7, pasoF = 1.8;
      const foco = b >= foco0 && b < foco0 + roles.length * pasoF ? Math.floor((b - foco0) / pasoF) : -1;
      const dirs = b >= foco0 + roles.length * pasoF;
      const lf = foco >= 0 ? b - (foco0 + foco * pasoF) : 0;
      const s = c.sale(1.2);
      const colapso = c.reducido ? 0 : EASE.inOut(c.seg(c.e.beats - 1.2, 1.2));
      const rol = foco >= 0 ? roles[foco] : null;
      const dr = k.directores;
      return html`<div style=${{ position: 'absolute', inset: 0 }}>
        <div style=${{ position: 'absolute', inset: 0, opacity: s }}>${marco(c, titulo(c, [['Estructura Organizativa']], 0))}</div>
        <svg width=${FW} height=${FH} style=${{ position: 'absolute', inset: 0, opacity: s }}>
          <circle cx=${cx} cy=${cy} r=${R} fill="none" stroke=${C.acero} stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 10"
            pathLength="1" style=${{ strokeDasharray: c.reducido ? 'none' : `${EASE.inOut(c.seg(1, 2))} 1` }} transform=${`rotate(-90 ${cx} ${cy})`} />
        </svg>
        ${roles.map((r, i) => {
          const a = ang(i) + (c.reducido ? 0 : 0);
          const am = ang(i) + (36 * Math.PI) / 180;
          const ax = cx + Math.cos(am) * R, ay = cy + Math.sin(am) * R;
          const pulso = b > 3 && !c.reducido ? 1 + 0.12 * Math.max(0, 1 - ((b - 3 - i * 0.2) % 1) * 4) : 1;
          return html`<div key=${'f' + i} style=${{ position: 'absolute', left: ax - 20, top: ay - 20, opacity: s * (1 - colapso),
              ...c.entra(3 + i * 0.25, { s: 0, y: 0, ease: 'back', len: 0.7 }) }}>
            <div style=${{ transform: `scale(${pulso})` }}><${Flecha} size=${40} color=${C.ign} giro=${(am * 180) / Math.PI + 90 + Math.sin(giro / 20) * 3} /></div>
          </div>`;
        })}
        ${roles.map((r, i) => {
          const x = mix(cx + Math.cos(ang(i)) * R, cx, colapso), y = mix(cy + Math.sin(ang(i)) * R, cy, colapso);
          const activo = foco === i;
          const en = activo ? EASE.out(clamp(lf / 0.4)) * (1 - seg(lf, pasoF - 0.3, 0.3)) : 0;
          return html`<div key=${r.sigla} style=${{ position: 'absolute', left: x - rc, top: y - rc, width: rc * 2, height: rc * 2,
              opacity: s * (1 - colapso), ...c.entra(1.4 + i * 0.4, { s: 0.2, y: 0, ease: 'back', len: 0.8 }) }}>
            <div style=${{ width: '100%', height: '100%', borderRadius: '50%', boxSizing: 'border-box',
                background: activo ? C.ign : '#0B3149', border: `3px solid ${activo ? C.ign : C.crema}`,
                transform: `scale(${1 + 0.14 * en})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                fontFamily: c.F.sans, fontWeight: 600, fontSize: r.nombre.length > 1 ? 25 : 34, lineHeight: 1.1, color: C.crema, textAlign: 'center' }}>
              ${r.nombre.map((n) => html`<div key=${n}>${n}</div>`)}
            </div>
          </div>`;
        })}
        <div style=${{ position: 'absolute', left: cx - 128, top: cy - 128, width: 256, height: 256, borderRadius: '50%', background: C.crema,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: s,
            ...c.entra(0.6, { s: 0, y: 0, ease: 'back', len: 1 }) }}>
          <${Simbolo} size=${86} color=${C.ign} />
          <${Letras} alto=${36} color=${C.ign} />
        </div>
        ${dirs && dr.paises.map((p, i) => {
          const ceoY = cy - R;
          const x = P ? cx + (i ? 1 : -1) * 330 : cx + (i ? 1 : -1) * 250, y = P ? ceoY - 30 : ceoY + 40;
          return html`<div key=${i} style=${{ position: 'absolute', left: x - 72, top: y - 72, width: 144, height: 144, borderRadius: '50%',
              background: '#0B3149', border: `3px solid ${C.ambar}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              fontFamily: c.F.sans, fontWeight: 600, fontSize: 20, lineHeight: 1.1, color: C.crema, textAlign: 'center', opacity: s * (1 - colapso),
              ...c.entra(foco0 + roles.length * pasoF + 0.3 + i * 0.4, { x: (i ? -1 : 1) * 160, y: 60, s: 0.3, ease: 'back', len: 0.9 }) }}>
            ${p.map((n) => html`<div key=${n}>${n}</div>`)}</div>`;
        })}
        <div style=${{ position: 'absolute', opacity: s * (1 - colapso),
            ...(P ? { left: 70, right: 70, top: 1180 } : { left: 1080, right: 110, top: 250 }) }}>
          ${!rol && !dirs && html`<div style=${{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            ${etiqueta(c, 'Board of Directors', 1.2)}
            <div style=${{ fontFamily: c.F.mono, fontSize: P ? 40 : 48, color: C.crema, lineHeight: 1.2, ...c.entra(2, { y: 20 }) }}>Cinco cofundadores en órbita alrededor de NAVE.</div>
          </div>`}
          ${rol && html`<div key=${rol.sigla} style=${{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style=${{ fontFamily: c.F.mono, fontSize: 20, letterSpacing: '0.14em', color: C.ign, textTransform: 'uppercase', ...entraL(lf, 0, c) }}>Roles · ${foco + 1} / 6</div>
            <div style=${{ fontFamily: c.F.mono, fontWeight: 700, fontSize: P ? 44 : 50, color: C.crema, lineHeight: 1.1, ...entraL(lf, 0.1, c) }}>${rol.cargo}</div>
            <div style=${{ fontFamily: c.F.mono, fontStyle: 'italic', fontSize: P ? 28 : 30, color: C.ambar, lineHeight: 1.3, ...entraL(lf, 0.25, c) }}>${rol.lema}</div>
            <div style=${{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              ${rol.funciones.map((f, j) => html`<div key=${f} style=${{ fontFamily: c.F.sans, fontSize: P ? 26 : 28, color: C.crema, display: 'flex', gap: 14,
                  ...entraL(lf, 0.4 + j * 0.12, c) }}><span style=${{ color: C.ign }}>—</span>${f}</div>`)}
            </div>
          </div>`}
          ${dirs && html`<div style=${{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style=${{ fontFamily: c.F.mono, fontSize: 20, letterSpacing: '0.14em', color: C.ambar, textTransform: 'uppercase', ...c.entra(foco0 + 9, { y: 10 }) }}>Roles · 6 / 6 · ${dr.reporta}</div>
            <div style=${{ fontFamily: c.F.mono, fontWeight: 700, fontSize: P ? 44 : 50, color: C.crema, ...c.entra(foco0 + 9.1, { y: 20 }) }}>${dr.titulo}</div>
            ${dr.funciones.map((f, j) => html`<div key=${f} style=${{ fontFamily: c.F.sans, fontSize: P ? 26 : 30, color: C.crema, display: 'flex', gap: 14, lineHeight: 1.3,
                ...c.entra(foco0 + 9.4 + j * 0.2, { y: 16 }) }}><span style=${{ color: C.ambar }}>—</span>${f}</div>`)}
          </div>`}
        </div>
      </div>`;
    },

    cierre(c) {
      const { C, k, P, b, FW, FH } = c;
      const pregunta = k.cierre[0];
      const textoSale = c.reducido ? (b > 7.5 ? 0 : 1) : 1 - EASE.in(c.seg(7, 0.8));
      const logo = c.reducido ? (b > 7.8 ? 1 : 0) : EASE.outExpo(c.seg(7.8, 1.4));
      const despega = c.reducido ? 0 : EASE.back(c.seg(9.4, 1)) * -14;
      const parp = b > 10.6 && b < 10.85 ? 0.2 : 1;
      const altoL = P ? 110 : 120, sym = altoL / 0.62;
      const anchoL = (altoL * 471) / 124;
      return html`<div style=${{ position: 'absolute', inset: 0 }}>
        <div style=${{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: textoSale }}>
          <div style=${{ fontFamily: c.F.mono, fontWeight: 700, fontSize: P ? 128 : 190, color: C.crema, letterSpacing: '-0.02em', display: 'flex' }}>
            ${[...pregunta].map((ch, i) => html`<span key=${i} style=${{ display: 'inline-block', ...c.entra(0.8 + i * 0.09, { y: 90, len: 0.9, ease: 'back' }) }}>${ch}</span>`)}
          </div>
          <div style=${{ width: 156, height: 4, background: C.ign, marginTop: 30, transform: `scaleX(${c.reducido ? (b > 2.6 ? 1 : 0) : EASE.inOut(c.seg(2.6, 0.9))})` }} />
          <div style=${{ fontFamily: c.F.mono, fontWeight: 700, fontSize: P ? 44 : 54, color: C.crema, marginTop: 34, minHeight: 70 }}>
            ${c.tipea(k.cierre[1].slice(0, -1), 3.4, 1.8)}<span style=${{ color: C.ign, opacity: b > 5.3 ? 1 : 0 }}>.</span></div>
        </div>
        <div style=${{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', flexDirection: P ? 'column' : 'row', alignItems: 'center',
            justifyContent: 'center', gap: P ? 40 : 46, opacity: logo, transform: `translateY(${(1 - logo) * 40 + despega}px)` }}>
          <${Simbolo} size=${sym} color=${C.ign} />
          <${Letras} alto=${altoL} color=${C.crema} revela=${[0, 1, 2, 3].map((i) => (c.reducido ? 1 : EASE.outExpo(c.seg(8.2 + i * 0.2, 0.9))))} />
        </div>
        <div style=${{ position: 'absolute', left: 0, right: 0, top: FH / 2 + (P ? 260 : 150), textAlign: 'center', fontFamily: c.F.mono,
            fontSize: P ? 34 : 38, color: C.niebla, opacity: logo, ...c.entra(9, { y: 16 }) }}>${k.bajada}</div>
        <div style=${{ position: 'absolute', left: FW / 2 - 7, top: FH / 2 + (P ? 330 : 222), width: 14, height: 14, borderRadius: 7, background: C.ign,
            opacity: parp * c.seg(9.8, 0.4), boxShadow: `0 0 18px ${C.ign}88` }} />
      </div>`;
    },
  };

  function entraL(lf, at, c) {
    if (c.reducido) return { opacity: 1 };
    const p = EASE.outExpo(seg(lf, at, 0.7));
    return { opacity: clamp(p * 2), transform: `translateY(${(1 - p) * 26}px)` };
  }

  function ofrece(c, sub, tarjetas, venture) {
    const { C, P } = c;
    const yaVisible = venture; // el título se queda quieto entre las dos escenas: continuidad
    const s = c.sale(1);
    const cols = P ? '1fr' : '1fr 1fr';
    return html`<div style=${{ position: 'absolute', inset: 0 }}>
      ${marco(c, html`
        ${titulo(c, [['¿Qué '], ['ofrece', 700], ['?']], yaVisible ? -9 : 0)}
        <div style=${{ fontFamily: venture ? c.F.mono : c.F.sans, fontWeight: 700, fontSize: P ? 36 : 42, color: C.crema, minHeight: 50, opacity: s }}>
          ${venture ? c.tipea(sub, 0.3, 1) : html`<span style=${c.entra(0.5, { x: -30, y: 0 })}>${sub}</span>`}</div>
        <div style=${{ display: 'grid', gridTemplateColumns: cols, gap: P ? 18 : 22, opacity: s, transform: `translateY(${(1 - s) * -30}px)` }}>
          ${tarjetas.map(([t, d], i) => {
            const ancho = i === tarjetas.length - 1 && !P;
            const at = 1.4 + i * 0.45;
            const barra = c.reducido ? 1 : EASE.outExpo(c.seg(at - 0.2, 0.6));
            return html`<div key=${t} style=${{ gridColumn: ancho ? '1 / -1' : 'auto', position: 'relative', background: C.tarjeta, padding: P ? '22px 30px 24px 40px' : '26px 34px 28px 46px',
                ...c.entra(at, { x: 50, y: 0, len: 0.9 }) }}>
              <div style=${{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: C.ambar, transform: `scaleY(${barra})`, transformOrigin: 'top' }} />
              ${ancho && html`<div style=${{ position: 'absolute', left: 10, top: 0, bottom: 0, width: 6, background: C.tinta }} />`}
              <div style=${{ fontFamily: c.F.sans, fontWeight: 800, fontSize: P ? 32 : 36, color: C.tinta, lineHeight: 1.15 }}>${t}</div>
              <div style=${{ fontFamily: c.F.sans, fontSize: P ? 23 : 25, color: C.tinta, lineHeight: 1.42, marginTop: 10, ...c.entra(at + 0.35, { y: 10 }) }}>${d}</div>
            </div>`;
          })}
        </div>`)}
    </div>`;
  }

  /* barrido con la geometría del símbolo: el chevrón del techo sube y cubre la pantalla */
  function Chevron({ p, color, FW, FH, reducido }) {
    if (p <= 0 || p >= 1) return null;
    if (reducido) return html`<div style=${{ position: 'absolute', inset: 0, background: color, opacity: p }} />`;
    const q = EASE.inOut(p);
    const S = Math.max(FW, FH) * 2.4 * q;
    const cx = FW / 2, base = FH + 40 - q * FH * 0.4;
    // pentágono del techo: el mismo ángulo de 45° del chevrón del símbolo
    const pts = [[-0.5, 0.2], [-0.5, -0.25], [0, -0.75], [0.5, -0.25], [0.5, 0.2]].map(([x, y]) => `${cx + x * S}px ${base + y * S}px`).join(',');
    return html`<div style=${{ position: 'absolute', inset: 0, background: color, clipPath: `polygon(${pts})` }} />`;
  }

  /* fondo: trama de puntos del símbolo, con paralaje lento */
  function Trama({ t, C, reducido, FW, FH, energia }) {
    const dx = reducido ? 0 : -t * 6, dy = reducido ? 0 : -t * 3;
    return html`<div style=${{ position: 'absolute', inset: -60, opacity: 0.16 + 0.08 * energia,
        backgroundImage: `radial-gradient(${C.niebla} 1.4px, transparent 1.6px)`, backgroundSize: '36px 36px',
        transform: `translate(${dx % 36}px, ${dy % 36}px)`,
        WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, #000 0%, transparent 70%)', maskImage: 'radial-gradient(ellipse at 70% 40%, #000 0%, transparent 70%)' }} />`;
  }

  /* HUD: marca, capítulo y pulso del compás. Mantiene la continuidad entre escenas. */
  function Hud({ C, F, escena, n, total, b, t, visible, P }) {
    const pulso = Math.max(0, 1 - (b % 1) * 3);
    const mm = String(Math.floor(t / 60)).padStart(2, '0'), ss = String(Math.floor(t % 60)).padStart(2, '0');
    const base = { position: 'absolute', fontFamily: F.mono, fontSize: 17, letterSpacing: '0.12em', color: C.acero, textTransform: 'uppercase', opacity: visible, whiteSpace: 'nowrap' };
    return html`<div>
      <div style=${{ ...base, top: P ? 70 : 52, right: P ? 70 : 120, display: 'flex', alignItems: 'center', gap: 12 }}>
        <${Simbolo} size=${30} color=${C.ign} /><${Letras} alto=${18} color=${C.crema} />
      </div>
      <div style=${{ ...base, bottom: P ? 60 : 48, left: P ? 70 : 120 }}>${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')} · ${escena.titulo}</div>
      <div style=${{ ...base, bottom: P ? 60 : 48, right: P ? 70 : 120, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span>T+${mm}:${ss}</span>
        ${[0, 1, 2, 3].map((i) => html`<span key=${i} style=${{ width: 8, height: 8, borderRadius: 4,
            background: Math.floor(b) % 4 === i ? C.ign : 'rgba(121,142,145,.4)', transform: `scale(${Math.floor(b) % 4 === i ? 1 + pulso * 0.6 : 1})` }} />`)}
      </div>
    </div>`;
  }

  /* ───────── componente principal ───────── */
  function NaveFilm({
    bpm = 120, escenas = ESCENAS, contenido = CONTENIDO, colores = {}, tipos = {},
    autoplay = true, loop = false, controles = true, onReady, style,
  }) {
    const C = useMemo(() => ({ ...PALETA, ...colores }), [colores]);
    const F = useMemo(() => ({ ...TIPOS, ...tipos }), [tipos]);
    const linea = useMemo(() => armarLinea(escenas), [escenas]);
    const spb = 60 / bpm;
    const duracion = linea.total * spb;

    const cont = useRef(null);
    const [dim, setDim] = useState({ w: 1280, h: 720 });
    const [t, setT] = useState(0);
    const [play, setPlay] = useState(autoplay);
    const [reducido, setReducido] = useState(false);
    const reloj = useRef({ base: 0, desde: 0, play: autoplay });

    // reloj único: tiempo = base + (ahora - desde) mientras corre
    useEffect(() => {
      let raf;
      const tick = (ahora) => {
        const r = reloj.current;
        if (r.play) {
          let nt = r.base + (ahora - r.desde) / 1000;
          if (nt >= duracion) {
            if (loop) { r.base = 0; r.desde = ahora; nt = 0; }
            else { nt = duracion; r.play = false; r.base = duracion; setPlay(false); }
          }
          setT(nt);
        }
        raf = requestAnimationFrame(tick);
      };
      reloj.current.desde = performance.now();
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [duracion, loop]);

    const ir = useCallback((s) => {
      const r = reloj.current; r.base = clamp(s, 0, duracion); r.desde = performance.now(); setT(r.base);
    }, [duracion]);
    const alternar = useCallback((v) => {
      const r = reloj.current; const ahora = performance.now();
      const nuevo = typeof v === 'boolean' ? v : !r.play;
      if (nuevo && r.base >= duracion) r.base = 0;
      if (!nuevo && r.play) r.base = r.base + (ahora - r.desde) / 1000;
      r.desde = ahora; r.play = nuevo; setPlay(nuevo);
    }, [duracion]);
    const repetir = useCallback(() => { ir(0); alternar(true); }, [ir, alternar]);

    useEffect(() => {
      const api = { seek: (s) => { alternar(false); ir(s); }, play: () => alternar(true), pause: () => alternar(false), replay: repetir, duracion, bpm };
      onReady && onReady(api);
    }, [ir, alternar, repetir, duracion, bpm, onReady]);

    useEffect(() => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const f = () => setReducido(mq.matches); f();
      mq.addEventListener('change', f);
      const ro = new ResizeObserver(([e]) => setDim({ w: e.contentRect.width, h: e.contentRect.height }));
      cont.current && ro.observe(cont.current);
      return () => { mq.removeEventListener('change', f); ro.disconnect(); };
    }, []);

    // composición: lienzo 16:9 o 9:16 según el visor, escalado sin recortar
    const P = dim.h > dim.w * 1.05;
    const FW = P ? 1080 : 1920, FH = P ? 1920 : 1080;
    const esc = Math.min(dim.w / FW, dim.h / FH);

    const B = t / spb; // beat global
    const iAct = Math.max(0, linea.escenas.findIndex((e) => B >= e.inicio && B < e.fin));
    const act = B >= linea.total ? linea.escenas.length - 1 : iAct;
    const eAct = linea.escenas[act];
    const energia = eAct.etapa === 'pico' ? 1 : eAct.etapa === 'desarrollo' ? 0.5 : 0;

    const capas = [];
    linea.escenas.forEach((e, i) => {
      const bl = B - e.inicio;
      if (bl < 0 || bl > e.beats) return;
      const ctx = crearCtx({ b: bl, e, reducido, P, FW, FH, C, F, k: contenido, beat: B });
      const fn = Escenas[e.id];
      if (fn) capas.push(html`<div key=${e.id} style=${{ position: 'absolute', inset: 0 }}>${fn(ctx)}</div>`);
      if (e.salida === 'chevron' && linea.escenas[i + 1]) {
        const p = seg(bl, e.beats - 1.4, 1.4);
        capas.push(html`<${Chevron} key=${'w' + i} p=${p} color=${C[linea.escenas[i + 1].fondo]} FW=${FW} FH=${FH} reducido=${reducido} />`);
      }
    });
    const hudVis = act === 0 || act === linea.escenas.length - 1 ? 0 : 1;

    return html`<div ref=${cont} style=${{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: C.noche, ...style }}
        role="img" aria-label=${'NAVE · ' + contenido.bajada}>
      <div style=${{ position: 'absolute', width: FW, height: FH, left: (dim.w - FW * esc) / 2, top: (dim.h - FH * esc) / 2,
          transform: `scale(${esc})`, transformOrigin: '0 0', overflow: 'hidden', background: C[eAct.fondo] }}>
        <${Trama} t=${t} C=${C} reducido=${reducido} FW=${FW} FH=${FH} energia=${energia} />
        <div style=${{ position: 'absolute', inset: 0, background: C.noche, opacity: act === 0 ? 1 - seg(B, 4, 3) : 0 }} />
        ${capas}
        <${Hud} C=${C} F=${F} escena=${eAct} n=${act + 1} total=${linea.escenas.length} b=${B} t=${t} visible=${hudVis * (1 - (reducido ? 0 : 0))} P=${P} />
        <div style=${{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,19,29,.55) 100%)' }} />
      </div>
      ${controles && html`<${Controles} play=${play} t=${t} duracion=${duracion} alternar=${alternar} repetir=${repetir} ir=${ir}
          escenas=${linea.escenas} spb=${spb} C=${C} F=${F} reducido=${reducido} />`}
    </div>`;
  }

  function Controles({ play, t, duracion, alternar, repetir, ir, escenas, spb, C, F, reducido }) {
    useEffect(() => {
      const k = (e) => {
        if (e.code === 'Space') { e.preventDefault(); alternar(); }
        if (e.key === 'r' || e.key === 'R') repetir();
        if (e.key === 'ArrowRight') ir(t + 2);
        if (e.key === 'ArrowLeft') ir(t - 2);
      };
      window.addEventListener('keydown', k);
      return () => window.removeEventListener('keydown', k);
    }, [alternar, repetir, ir, t]);
    const btn = { font: `500 13px ${F.mono}`, letterSpacing: '.08em', textTransform: 'uppercase', color: C.crema, background: 'rgba(1,36,54,.75)',
      border: '1px solid rgba(215,225,226,.25)', borderRadius: 999, padding: '8px 14px', cursor: 'pointer', minHeight: 36 };
    return html`<div style=${{ position: 'absolute', left: 12, right: 12, bottom: 10, display: 'flex', alignItems: 'center', gap: 8, zIndex: 5 }}>
      <button style=${btn} onClick=${() => alternar()} aria-label=${play ? 'Pausar' : 'Reproducir'}>${play ? 'Pausa' : 'Play'}</button>
      <button style=${btn} onClick=${repetir} aria-label="Repetir desde el inicio">↺</button>
      <div style=${{ position: 'relative', flex: 1, height: 22, cursor: 'pointer' }}
        onClick=${(e) => { const r = e.currentTarget.getBoundingClientRect(); ir(((e.clientX - r.left) / r.width) * duracion); }}>
        <div style=${{ position: 'absolute', left: 0, right: 0, top: 10, height: 2, background: 'rgba(215,225,226,.2)' }} />
        ${escenas.map((e) => html`<div key=${e.id} title=${e.titulo} style=${{ position: 'absolute', top: 6, height: 10, width: 1,
            left: `${((e.inicio * spb) / duracion) * 100}%`, background: 'rgba(215,225,226,.45)' }} />`)}
        <div style=${{ position: 'absolute', left: 0, top: 10, height: 2, width: `${(t / duracion) * 100}%`, background: C.ign }} />
      </div>
      <span style=${{ font: `500 12px ${F.mono}`, color: C.niebla, minWidth: 92, textAlign: 'right' }}>
        ${t.toFixed(1)} / ${duracion.toFixed(0)} s${reducido ? ' · ◌' : ''}</span>
    </div>`;
  }

  return NaveFilm;
}
