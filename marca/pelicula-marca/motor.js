// NAVE · película de marca · motor de render
// Dibuja un cuadro en un lienzo 2560 × 1440 (16:9, 2K) a partir de un tiempo t en segundos.
// No guarda estado entre cuadros: el mismo t siempre produce la misma imagen, así la vista
// previa en vivo y la exportación a 120 fps salen idénticas.
//
// Capas, de atrás hacia adelante, como en la presentación «Bitácora de despegue»:
//   soporte (lámina Crema / Espacio / Ámbar) → trama de puntos → cuerpo (símbolo, tableros)
//   → tipografía → orientación (bitácora, cruces de registro, altímetro).

import { SIMBOLO, LETRAS, PUNTOS } from './activos.js';

export const W = 2560, H = 1440, X0 = 144;

export const PALETA = {
  crema: '#FFF5EE', niebla: '#D7E1E2', espacio: '#012436', noche: '#00131D', tueste: '#210A05',
  ign: '#E55C41', ambar: '#EFA441', acero: '#798E91', petroleo: '#005A88',
};

export const FUENTES = {
  sans: '"Standerd","Inter Tight","Helvetica Neue",Arial,sans-serif',
  mono: '"Lenia Mono","JetBrains Mono",ui-monospace,Menlo,monospace',
};

/* ───────── contenido: deck NAVE · Tech Company & Venture Builder ───────── */

export const CONTENIDO = {
  firma: 'NAVE · TECH COMPANY & VENTURE BUILDER',
  bajada: 'TECH COMPANY & VENTURE BUILDER',
  manifiesto: [
    [['Nos obsesionamos por cambiar la realidad', 'crema']],
    [['de una ', 'crema'], ['empresa', 'ambar'], [', ', 'crema'], ['idea', 'ambar'], [' o ', 'crema'], ['persona', 'ambar'], [',', 'crema']],
    [['para hacerla ', 'crema'], ['mejor.', 'ign']],
  ],
  marcadores: ['EMPRESA', 'IDEA', 'PERSONA'],
  experiencia: [['Más de 25 años de experiencia acumulada en la ', 'espacio'], ['industria tecnológica.', 'ign']],
  fusionTitulo: [['Fusionamos', 'espacio']],
  fusion: [
    ['la rigurosidad', 'y la agilidad.'],
    ['la seguridad', 'y el enfoque en activos digitales.'],
    ['la escala corporativa', 'y una Startup, PyME o fundador.'],
  ],
  socio: [['Somos el ', 'espacio'], ['socio de ejecución.', 'ign']],
  verbos: ['DISEÑA', 'AUTOMATIZA', 'OPERA'],
  socioTec: 'SISTEMAS CON IA · BLOCKCHAIN · TECH EQUITY',
  socioFin: [['para transformar la ', 'espacio'], ['realidad.', 'ign']],
  clientes: [
    { codigo: 'TC', nombre: 'Tech Company', flecha: 180, filas: ['CUENTAS CORPORATIVAS Y GOBIERNOS', 'TRANSFORMACIÓN DIGITAL · MODERNIZACIÓN', 'EJECUCIÓN ÁGIL, ESCALABLE Y SEGURA', 'CALIDAD EN TIEMPO RÉCORD'] },
    { codigo: 'VB', nombre: 'Venture Builder', flecha: 0, filas: ['EMPRENDEDORES · STARTUPS · FUNDADORES', 'EMPRESAS QUE QUIEREN ESCALAR', 'INNOVACIÓN Y ACTIVOS DIGITALES', 'TECNOLOGÍA EN EL CORE DEL NEGOCIO'] },
  ],
  servicios: [
    ['TC-01', 'Tech Consultant', 'Modernización, ruta digital, datos y FinOps de IT.', 'TECH'],
    ['TC-02', 'Next-Gen Software Factory', 'Software a la medida, inteligente, escalable y con ISOs.', 'TECH'],
    ['TC-03', 'Digital Assets portfolio', 'Activos digitales, apps y software propio y de partners.', 'TECH'],
    ['TC-04', 'Talent Integration', 'Talento con metodologías, governance y garantía.', 'TECH'],
    ['TC-05', 'Managed Cloud & Continuity', 'Soporte 24/7, DevSecOps y observabilidad avanzada.', 'TECH'],
    ['VB-01', 'Tech Foundry', 'Concepto escalable, strategy, business plan y case.', 'VENTURE'],
    ['VB-02', 'Venture Studio', 'IA y blockchain del MVP a producción y continuidad.', 'VENTURE'],
    ['VB-03', 'Tech Equity Business model', 'Invertimos tecnología: NAVE se vuelve accionista.', 'VENTURE'],
  ],
  bases: ['Fábrica de Software automatizada con IA y Blockchain.', 'Estándares ISO y marcos de referencia.', 'Rapidez y calidad garantizada.'],
  marcos: 'GOBIERNO & GESTIÓN   ISO 21500 · IEEE 1058 · PMBOK · ÁGIL/SCRUM      ●      SEGURIDAD & RIESGO   ISO 27001 · NIST CSF 2.0 · OWASP TOP 10 · MAGERIT V3 · ISO 31000      ●      ARQUITECTURA & REQUISITOS   ISO/IEC/IEEE 42010 · ISO 12207 · SWEBOK · IEEE 1233 · ISO 830      ●      CALIDAD & TESTING   ISO 29119 · IEEE 829 · ISTQB      ●      ',
  partnersTitulo: [['Un ecosistema de alianzas estratégicas con los ', 'crema'], ['líderes mundiales', 'ambar'], [' de la tecnología.', 'crema']],
  partners: [
    ['Oracle', 'BASES DE DATOS · CLOUD EN BLOCKCHAIN'],
    ['NVIDIA', 'GPUs · CÓMPUTO ACELERADO · PHYSICAL AI'],
    ['AWS', 'INFRAESTRUCTURA ESCALABLE · IA/ML'],
    ['Google', 'GOOGLE CLOUD · IA GENERATIVA'],
    ['Supabase', 'POSTGRES · AUTENTICACIÓN · BACKEND'],
    ['Ripple', 'PAGOS GLOBALES · TOKENIZACIÓN'],
    ['Anthropic', 'CLAUDE · AGENTES IA SEGUROS'],
  ],
  valores: [
    'Atención radical al detalle.',
    'Inquebrantabilidad: nos negamos a rendirnos.',
    'Compromiso con el impacto positivo.',
    'Atracción de clientes y talento élite.',
    'Propósito de transformar realidades.',
    'Intensidad por ganar, mejorar y crecer.',
    'Queremos promover nuevos estándares.',
  ],
  roles: [
    { codigo: 'CEO', sub: '& FOUNDER', cargo: 'Chief Executive Officer & Founder.', lema: 'El estratega del ecosistema, los inversores y la visión del negocio Web3.',
      funciones: ['Estrategia corporativa y visión', 'Relaciones con inversores y capital', 'Alianzas de alto nivel', 'Gobernanza y cumplimiento regulatorio', 'Cultura corporativa y alineación'] },
    { codigo: 'CTO', sub: '& CO-FOUNDER', cargo: 'Chief Technology Officer.', lema: 'El arquitecto de la fábrica automatizada de software, blockchain y la ingeniería con IA.',
      funciones: ['Arquitectura y core blockchain', 'Automatización de la fábrica de software', 'Auditoría de código y calidad (QA)', 'Gobernanza de datos e IA', 'Innovación e investigación (I+D)'] },
    { codigo: 'CGO', sub: '& CO-FOUNDER', cargo: 'Chief Growth Officer.', lema: 'El motor de ingresos, adquisición de clientes corporativos y posicionamiento de marca.',
      funciones: ['Ventas B2B enterprise', 'Ingeniería de ventas (technical sales)', 'Product-led growth (PLG)', 'Marketing de contenidos y educación', 'Expansión geográfica y de canales'] },
    { codigo: 'COO', sub: '& CO-FOUNDER', cargo: 'Chief Operating Officer.', lema: 'El garante de la continuidad de negocio 24/7, los procesos ITIL y las certificaciones ISO.',
      funciones: ['Operación de misión crítica 24/7', 'Integración DevSecOps + ITIL', 'Gestión de certificaciones ISO', 'Ingeniería de fiabilidad (SRE)', 'Talento humano técnico'] },
    { codigo: 'CFO', sub: '', cargo: 'Chief Financial Officer.', lema: 'Estrategia financiera, tesorería cripto/fiat y costos de infraestructura.',
      funciones: ['Planificación financiera y presupuesto', 'Tesorería híbrida (cripto y fiat)', 'Estrategia de precios', 'Estrategia y auditoría de tokenomics', 'Control de costos de infraestructura (FinOps)'] },
  ],
  directores: { cargo: 'Managing Director por país.', lema: 'Reporta al CEO.', paises: ['HON', 'GT'],
    funciones: ['Estrategia, ejecución y presupuesto de ventas', 'Administración del talento local', 'Crecimiento y cobertura de mercados'] },
  pregunta: '¿Preguntas?',
  despegue: [['Listos para el despegue', 'crema'], ['.', 'ign']],
};

/* ───────── guion: una sola línea de tiempo, en beats ─────────
   anticipación → introducción → desarrollo → pico → resolución.
   `salida` describe el barrido de trama que lleva a la lámina siguiente. */

export const ESCENAS = [
  { id: 'arranque',   beats: 8,  fondo: 'espacio', cap: null },
  { id: 'manifiesto', beats: 16, fondo: 'espacio', cap: 'MANIFIESTO' },
  { id: 'nave',       beats: 10, fondo: 'espacio', cap: 'NAVE', salida: { color: 'crema', beats: 1.6, origen: [1280, 700] } },
  { id: 'queEs',      beats: 24, fondo: 'crema',   cap: '¿QUÉ ES NAVE?', salida: { color: 'espacio', beats: 1.6, origen: 'abajo' } },
  { id: 'clientes',   beats: 18, fondo: 'espacio', cap: 'CLIENTES', salida: { color: 'noche', beats: 1.4, origen: [1280, 860] } },
  { id: 'oferta',     beats: 24, fondo: 'noche',   cap: '¿QUÉ OFRECE?', finFondo: 'ambar' },
  { id: 'modelo',     beats: 16, fondo: 'ambar',   cap: 'MODELO OPERATIVO', salida: { color: 'espacio', beats: 1.6, origen: 'abajo' } },
  { id: 'partners',   beats: 16, fondo: 'espacio', cap: 'PARTNERS', salida: { color: 'crema', beats: 1.6, origen: [2300, 690] } },
  { id: 'valores',    beats: 22, fondo: 'crema',   cap: '¿QUÉ NOS RIGE?', salida: { color: 'espacio', beats: 1.6, origen: [1150, 1128] } },
  { id: 'estructura', beats: 38, fondo: 'espacio', cap: 'TRIPULACIÓN' },
  { id: 'despegue',   beats: 18, fondo: 'espacio', cap: 'DESPEGUE' },
];

/* ───────── utilidades ───────── */

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (x, a, d) => clamp((x - a) / d);
const mix = (a, b, t) => a + (b - a) * t;
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eoX = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const ei = (x) => x * x * x;
const eoBack = (x) => { const c = 1.7, c3 = c + 1; return 1 + c3 * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgba = (h, a = 1) => { const [r, g, b] = hex2rgb(h); return `rgba(${r},${g},${b},${a})`; };
const mixc = (a, b, t) => { const A = hex2rgb(a), B = hex2rgb(b); return '#' + A.map((v, i) => Math.round(mix(v, B[i], t)).toString(16).padStart(2, '0')).join(''); };
const OSCURO = { espacio: 1, noche: 1, tueste: 1 };

/* ───────── geometría precalculada ───────── */

function hexGrid(S, pad = 1) {
  const RH = (S * Math.sqrt(3)) / 2, out = [];
  for (let j = -pad; j * RH < H + pad * RH; j++) for (let i = -pad; i * S < W + pad * S; i++) out.push([i * S + (j % 2 ? S / 2 : 0), j * RH]);
  return out;
}

export function crearMotor({ bpm = 104, escenas = ESCENAS, contenido = CONTENIDO, colores = {}, fuentes = {} } = {}) {
  const C = { ...PALETA, ...colores };
  const F = { ...FUENTES, ...fuentes };
  const K = contenido;
  const spb = 60 / bpm;
  let acc = 0;
  const lista = escenas.map((e) => { const s = { ...e, inicio: acc, fin: acc + e.beats }; acc += e.beats; return s; });
  const totalB = acc, duracion = totalB * spb;
  const ultima = lista[lista.length - 1];
  const bDespegue = ultima.inicio + 9;            // T–00: el punto despega
  const capitulos = lista.filter((e) => e.cap);

  // estrellas en tres profundidades (la distancia del manifiesto)
  const r0 = rng(7), estrellas = [];
  for (let i = 0; i < 560; i++) { const z = [0.35, 0.65, 1][i % 3]; estrellas.push({ x: r0() * (W + 400) - 200, y: r0() * (H + 400) - 200, z, r: 1.1 + z * 2.1, a: 0.18 + 0.5 * z * r0() }); }

  // trama base (retícula hexagonal de 36 px) y trama del barrido (40 px)
  const A = [1840, 600];                          // punto de presión del manifiesto
  const trama = hexGrid(36).map(([x, y]) => ({ x, y, d: Math.hypot(x - A[0], y - A[1]) }));
  const tramaB = hexGrid(40, 2);

  // símbolo de 1 018 puntos y su punto de origen en la trama
  const N = PUNTOS.length / 3, sx = [], sy = [], ss = [];
  for (let i = 0; i < N; i++) { sx.push(PUNTOS[3 * i]); sy.push(PUNTOS[3 * i + 1]); ss.push(PUNTOS[3 * i + 2]); }
  const CS = [1280, 700], KS = 3.4;
  const src = new Int32Array(N), elegido = new Uint8Array(trama.length);
  [...Array(N).keys()].sort((a, b) => ss[a] - ss[b]).forEach((i) => {
    const ex = CS[0] + (sx[i] - 100) * KS * 1.7, ey = CS[1] + (sy[i] - 100) * KS * 1.7;
    let best = -1, bd = Infinity;
    for (let k = 0; k < trama.length; k++) { if (elegido[k]) continue; const d = (trama[k].x - ex) ** 2 + (trama[k].y - ey) ** 2; if (d < bd) { bd = d; best = k; } }
    src[i] = best; elegido[best] = 1;
  });

  // horizonte del planeta (partners)
  const planeta = hexGrid(24).filter(([x, y]) => y > 1080).map(([x, y]) => {
    const R = 2700, cy = 1150 + R, d = Math.hypot(x - 1280, y - cy);
    return d < R ? { x, y, borde: (R - d) / 260 } : null;
  }).filter(Boolean);

  // columna de empuje T–00
  const r1 = rng(11), pluma = hexGrid(22).filter(([x, y]) => y > 560 && Math.abs(x - 1280) < 900).map(([x, y]) => ({ x, y, j: r1() }));

  const symPath = new Path2D(SIMBOLO[0]);
  const letras = LETRAS.map((d) => new Path2D(d));
  const flechaP = new Path2D('M71.3 24C74.23 26.93 74.23 31.68 71.3 34.61L47.3 58.61 36.7 48 47.89 36.8H0V21.8H47.89L36.7 10.61 47.3 0 71.3 24Z');

  /* ───── estado por cuadro ───── */
  let ctx, red = false, T = 0;

  const fuente = (peso, size, fam = 'sans') => `${peso} ${size}px ${F[fam]}`;
  const tracking = (px) => { if ('letterSpacing' in ctx) ctx.letterSpacing = `${px}px`; };
  const ancho = (s) => ctx.measureText(s).width;

  function texto(s, x, y, { peso = 400, size = 24, fam = 'sans', color = C.crema, a = 1, align = 'left', ls = 0 } = {}) {
    if (a <= 0.003 || !s) return 0;
    ctx.font = fuente(peso, size, fam); tracking(ls); ctx.textAlign = align; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = rgba(color, a); ctx.fillText(s, x, y);
    const w = ancho(s); tracking(0); return w;
  }
  const tecleo = (s, p) => s.slice(0, Math.floor(s.length * clamp(red ? (p > 0 ? 1 : 0) : p)));
  // indicador de aeropuerto: cada carácter gira antes de asentarse
  const GLIFOS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  function flap(s, p, sem = 1) {
    if (red) return p > 0 ? s : '';
    let o = '';
    const paso = Math.floor(T * 30);
    for (let i = 0; i < s.length; i++) {
      const q = (p - (i / Math.max(1, s.length)) * 0.55) / 0.45;
      if (q >= 1 || s[i] === ' ') o += q > 0 || s[i] === ' ' ? s[i] : ' ';
      else if (q <= 0) o += ' ';
      else o += GLIFOS[(i * 7 + sem * 13 + paso * 5) % GLIFOS.length];
    }
    return o.replace(/\s+$/, '');
  }

  // bloque tipográfico con palabras en color, partido en líneas; cada línea entra con máscara
  function bloque(spans, x, y, { size = 96, peso = 700, lh = 1.04, maxW = 1600, ls = -0.012, align = 'left', entra = () => 1, sale = () => 0, alfa = 1 } = {}) {
    ctx.font = fuente(peso, size); tracking(size * ls); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    const toks = [];
    spans.forEach(([s, col]) => s.split(/(\s+)/).forEach((w) => w && toks.push([w, col])));
    const lineas = [[]]; let wl = 0;
    toks.forEach(([w, col]) => {
      const ww = ancho(w);
      if (/^\s+$/.test(w)) { if (lineas[lineas.length - 1].length) { lineas[lineas.length - 1].push([w, col, ww]); wl += ww; } return; }
      if (wl + ww > maxW && lineas[lineas.length - 1].length) { const l = lineas[lineas.length - 1]; while (l.length && /^\s+$/.test(l[l.length - 1][0])) l.pop(); lineas.push([]); wl = 0; }
      lineas[lineas.length - 1].push([w, col, ww]); wl += ww;
    });
    lineas.forEach((l, i) => {
      const p = clamp(entra(i)), q = clamp(sale(i));
      if (p <= 0 || q >= 1) return;
      const lw = l.reduce((s, t) => s + t[2], 0);
      let cx = align === 'center' ? x - lw / 2 : align === 'right' ? x - lw : x;
      const top = y + i * size * lh, base = top + size * 0.8;
      ctx.save();
      if (!red) { ctx.beginPath(); ctx.rect(cx - 20, top - size * 0.2, lw + 40, size * 1.22); ctx.clip(); }
      const dy = red ? 0 : (1 - eoX(p)) * size * 1.1 - eio(q) * size * 1.1;
      const a = alfa * (red ? p * (1 - q) : 1);
      l.forEach(([w, col, ww]) => { ctx.fillStyle = rgba(C[col] || col, a); ctx.fillText(w, cx, base + dy); cx += ww; });
      ctx.restore();
    });
    tracking(0);
    return lineas.length * size * lh;
  }

  function etiqueta(s, x, y, color, p, align = 'left') {
    const t = tecleo(s, p); texto(t, x, y, { fam: 'mono', peso: 500, size: 28, color, ls: 4, align });
  }
  function punto(x, y, r, color, a = 1) { if (r <= 0 || a <= 0) return; ctx.fillStyle = rgba(color, a); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
  function puntos(lista, color) { // lista de [x, y, r, a]: agrupados por opacidad para pintar en pocas pasadas
    const g = new Map();
    for (const [x, y, r, a] of lista) { if (r <= 0.05 || a <= 0.01) continue; const k = Math.round(a * 20); let p = g.get(k); if (!p) g.set(k, (p = new Path2D())); p.moveTo(x + r, y); p.arc(x, y, r, 0, 7); }
    for (const [k, p] of g) { ctx.fillStyle = rgba(color, k / 20); ctx.fill(p); }
  }
  function lineaPunteada(x1, y1, x2, y2, p, color, a = 1, paso = 20, r = 3, curva = 0) {
    if (p <= 0) return;
    const L = Math.hypot(x2 - x1, y2 - y1), n = Math.floor(L / paso), lst = [];
    for (let i = 0; i <= n * clamp(p); i++) { const u = i / n; lst.push([mix(x1, x2, u), mix(y1, y2, u) - curva * Math.sin(Math.PI * u), r, a]); }
    puntos(lst, color);
  }
  function flecha(x, y, size, ang, color, a = 1) {
    if (a <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate((ang * Math.PI) / 180); ctx.scale(size / 96, size / 96); ctx.translate(-48 + 14, -48 + 18.7);
    ctx.fillStyle = rgba(color, a); ctx.fill(flechaP); ctx.restore();
  }
  function simbolo(cx, cy, k, color, a = 1) {
    if (a <= 0) return;
    ctx.save(); ctx.translate(cx - 100 * k, cy - 100 * k); ctx.scale(k, k); ctx.fillStyle = rgba(color, a); ctx.fill(symPath, 'evenodd'); ctx.restore();
  }
  function logotipo(x, y, alto, color, revela = [1, 1, 1, 1]) { // NAVE, sin «Café»; alto = alto de letra
    const k = alto / 116;
    letras.forEach((p, i) => {
      const q = clamp(revela[i]); if (q <= 0) return;
      ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.translate(0, -58.9);
      if (!red) { ctx.beginPath(); ctx.rect(-10, 58.9 - 6, 490, 128); ctx.clip(); ctx.translate(0, (1 - eoX(q)) * 122); }
      ctx.fillStyle = rgba(color, red ? q : 1); ctx.fill(p); ctx.restore();
    });
  }
  function estrellasDibujar(a, dx = 0, dy = 0, fuerza = 0, atractor = A) {
    const lst = [];
    for (const s of estrellas) {
      let x = s.x + dx * s.z, y = s.y + dy * s.z;
      x = ((x % (W + 400)) + W + 400) % (W + 400) - 200; y = ((y % (H + 400)) + H + 400) % (H + 400) - 200;
      if (fuerza) { const d = Math.hypot(x - atractor[0], y - atractor[1]), w = Math.exp(-(d * d) / (2 * 640 * 640)) * fuerza; x = mix(x, atractor[0], w); y = mix(y, atractor[1], w); }
      lst.push([x, y, s.r, s.a * a]);
    }
    puntos(lst, C.crema);
  }
  function camara(s, cx, cy, fn) { ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-cx, -cy); fn(); ctx.restore(); }

  // barrido de trama: los puntos del color siguiente crecen desde un origen hasta cubrir la lámina
  function barrido(p, color, origen) {
    if (p <= 0) return;
    if (p >= 1) { ctx.fillStyle = C[color]; ctx.fillRect(0, 0, W, H); return; }
    if (red) { ctx.fillStyle = rgba(C[color], p); ctx.fillRect(0, 0, W, H); return; }
    const lst = [], S = 40, Dm = Math.hypot(W, H);
    for (const [x, y] of tramaB) {
      const d = origen === 'abajo' ? (H - y) / H : Math.hypot(x - origen[0], y - origen[1]) / Dm;
      const q = clamp((p * 1.55 - d * 0.55 / (origen === 'abajo' ? 0.55 : 0.75)) * 1.25);
      lst.push([x, y, S * 0.62 * eio(q), 1]);
    }
    puntos(lst, C[color]);
  }

  /* ───── bitácora: orientación permanente ───── */
  function bitacora(B, tinta, a) {
    if (a <= 0) return;
    const t = B * spb;
    // cruces de registro
    ctx.strokeStyle = rgba(tinta, 0.5 * a); ctx.lineWidth = 2;
    [[96, 96], [W - 96, 96], [96, H - 96], [W - 96, H - 96]].forEach(([x, y]) => { ctx.beginPath(); ctx.moveTo(x - 14, y); ctx.lineTo(x + 14, y); ctx.moveTo(x, y - 14); ctx.lineTo(x, y + 14); ctx.stroke(); });
    // capítulo: puntos para orientar
    const iCap = capitulos.findIndex((e) => B >= e.inicio && B < e.fin);
    capitulos.forEach((e, i) => punto(X0 + 6 + i * 26, H - 98, i === iCap ? 7 : 4.2, i === iCap ? C.ign : tinta, (i === iCap ? 1 : 0.35) * a));
    const ascenso = clamp(t / (bDespegue * spb));
    // altímetro de 25 puntos
    const nivel = 24 * (B > bDespegue ? mix(Math.pow(ascenso, 3) * 0.5, 1, eio(seg(B, bDespegue, 3))) : Math.pow(ascenso, 3) * 0.5);
    for (let i = 0; i < 25; i++) { const on = i <= nivel; punto(W - 96, H - 196 - i * 30, on ? 4.6 : 3, on ? C.ign : tinta, (on ? 1 : 0.28) * a); }
  }

  /* ───── tomas ───── */
  const T_ = {
    arranque(b) {
      estrellasDibujar(0.6 * eo(seg(b, 0.2, 5)), -T * 8, -T * 3);
      const pop = red ? 1 : eoBack(seg(b, 0.5, 0.6));
      const apag = (b > 1.6 && b < 1.76) || (b > 2.1 && b < 2.26);
      const m = red ? 1 : eio(seg(b, 5.4, 2.6));
      const x = mix(1280, A[0], m), y = mix(720, A[1], m);
      [1.76, 2.26].forEach((tb) => { const q = seg(b, tb, 1); if (q > 0 && q < 1 && !red) { ctx.strokeStyle = rgba(C.ign, 0.5 * (1 - q)); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, 12 + 90 * eo(q), 0, 7); ctx.stroke(); } });
      if (!apag) punto(x, y, 12 * pop, C.ign);
    },

    manifiesto(b) {
      // presión: el campo se tensa hacia el punto mientras se dice «cambiar la realidad»
      const fuerza = 0.38 * eio(seg(b, 1, 4)) * (1 - 0.6 * eio(seg(b, 5.4, 2))), fuera = seg(b, 11, 2.2);
      estrellasDibujar(0.6 * (1 - fuera), -T * 8, -T * 3, red ? 0 : fuerza);
      // orden: la retícula nace en anillos desde el punto, «para hacerla mejor»
      if (b > 10.6) puntos(trama.map((p) => { const q = eo(seg(b, 10.8 + p.d / 1500 * 2.2, 0.8)); return [p.x, p.y, 2.6 * q, 0.34 * q]; }), C.crema);
      punto(A[0], A[1], 12 + (red ? 0 : 1.5 * Math.sin(T * 3.4)), C.ign);
      // tres marcadores: empresa, idea, persona
      const marc = [[1520, 400], [2120, 360], [2200, 820]];
      marc.forEach(([x, y], i) => {
        const p = seg(b, 6.4 + i * 0.55, 0.7), q = seg(b, 10.2, 0.6);
        if (p <= 0 || q >= 1) return;
        lineaPunteada(A[0], A[1], x, y, eo(p), C.crema, 0.5 * (1 - q), 16, 2.2);
        punto(x, y, 7 * (red ? 1 : eoBack(p)), C.ambar, 1 - q);
        texto(flap(K.marcadores[i], seg(b, 6.7 + i * 0.55, 0.6), i), x + 26, y + 10, { fam: 'mono', peso: 500, size: 28, ls: 4, color: C.crema, a: 0.85 * (1 - q) });
      });
      etiqueta('MANIFIESTO', X0, 770, C.ign, seg(b, 0.3, 0.8) * (1 - seg(b, 14.6, 0.5)));
      const frase = (spans, ini, fin) => bloque(spans, X0, 820, { size: 132, maxW: 1700, entra: (i) => seg(b, ini + i * 0.4, 1), sale: () => seg(b, fin, 0.7) });
      frase(K.manifiesto[0], 0.4, 5.1);
      frase(K.manifiesto[1], 5.7, 10.3);
      frase(K.manifiesto[2], 10.9, 14.8);
    },

    nave(b) {
      // la retícula entrega 1 018 puntos al símbolo, en el orden de la trayectoria
      const fuera = (k) => { const q = 1 - trama[k].d / 2600; return seg(b, 0.3 + q * 1.2, 0.8); };
      const fondo = [];
      trama.forEach((p, k) => { if (!elegido[k]) { const f = fuera(k); fondo.push([p.x, p.y, 2.6 * (1 - 0.5 * f), 0.34 * (1 - f)]); } });
      puntos(fondo, C.crema);
      const fusion = eio(seg(b, 3.6, 0.6)), sol = eo(seg(b, 3.9, 0.5));
      const mov = red ? (b > 4.6 ? 1 : 0) : eio(seg(b, 4.6, 1.6));
      const alto = mix(KS * 200, 240, mov), k = alto / 200;
      const wLk = 240 * (617 / 116), x0 = 1280 - wLk / 2;
      const cx = mix(CS[0], x0 + 120, mov), cy = CS[1];
      if (sol < 1) {
        const lst = [];
        for (let i = 0; i < N; i++) {
          const g = trama[src[i]], d0 = 0.4 + ss[i] * 1.8, u = red ? (b > 2.5 ? 1 : 0) : eio(seg(b, d0, 1.1));
          const tx = cx + (sx[i] - 100) * k, ty = cy + (sy[i] - 100) * k;
          const vx = tx - g.x, vy = ty - g.y, curva = Math.sin(Math.PI * u) * 0.16;
          lst.push([g.x + vx * u - vy * curva, g.y + vy * u + vx * curva, mix(2.6, 1.456 * k, u) * (1 + 0.55 * fusion), mix(0.34, 1, u) * (1 - sol)]);
        }
        puntos(lst, C.crema);
      }
      // el punto Ignición entra al vértice y enciende el símbolo
      const ip = red ? 1 : eio(seg(b, 2.4, 1.1));
      const ax = cx, ay = cy + (63 - 100) * k;
      if (b < 3.6) punto(mix(A[0], ax, ip), mix(A[1], ay, ip) - Math.sin(Math.PI * ip) * 160, 12, C.ign);
      const fl = seg(b, 3.5, 0.9);
      if (fl > 0 && fl < 1 && !red) {
        const g = ctx.createRadialGradient(ax, ay, 0, ax, ay, 900);
        g.addColorStop(0, rgba(C.ambar, 0.32 * (1 - fl))); g.addColorStop(1, rgba(C.ambar, 0));
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
      simbolo(cx, cy, k, C.crema, sol);
      logotipo(x0 + 240 * (150 / 116), cy - 120, 240, C.crema, [0, 1, 2, 3].map((i) => seg(b, 5.5 + i * 0.22, 0.9)));
      texto(tecleo(K.bajada, seg(b, 6.6, 1.3)), 1280, cy + 120 + 120, { fam: 'mono', peso: 500, size: 38, ls: 7, color: C.ambar, align: 'center' });
    },

    queEs(b) {
      const tinta = C.espacio;
      // 1 · la experiencia
      const salA = seg(b, 7, 0.8);
      etiqueta('¿QUÉ ES NAVE?', X0, 330, C.ign, seg(b, 0.2, 0.8) * (1 - seg(b, 7.4, 0.4)));
      if (b < 8.2) {
        const n = Math.round(25 * (red ? 1 : eo(seg(b, 0.6, 2.4))));
        const p = seg(b, 0.3, 1.1);
        ctx.save();
        if (!red) { ctx.beginPath(); ctx.rect(X0 - 40, 470, 1200, 620); ctx.clip(); }
        const dy = red ? 0 : (1 - eoX(p)) * 600 + eio(salA) * 600;
        const w = texto(String(n).padStart(2, '0'), X0 - 24, 1040 + dy, { fam: 'mono', peso: 700, size: 560, color: tinta, ls: -24, a: red ? p * (1 - salA) : 1 });
        texto('+', X0 - 24 + w, 1040 + dy, { fam: 'mono', peso: 700, size: 560, color: C.ign, a: red ? p * (1 - salA) : 1 });
        ctx.restore();
        const h = bloque(K.experiencia, 1380, 560, { size: 76, maxW: 1000, entra: (i) => seg(b, 1.8 + i * 0.3, 1), sale: () => salA });
        texto(tecleo(K.bajada, seg(b, 3.4, 1)), 1380, 560 + h + 70, { fam: 'mono', peso: 500, size: 28, ls: 5, color: C.acero, a: 1 - salA });
      }
      // 2 · fusionamos una cosa y la otra
      if (b > 7.8 && b < 16.2) {
        const sal = seg(b, 15, 0.8);
        etiqueta('¿QUÉ ES NAVE?', X0, 330, C.ign, seg(b, 8, 0.6) * (1 - sal));
        bloque(K.fusionTitulo, X0, 380, { size: 120, entra: () => seg(b, 8.2, 1), sale: () => sal });
        K.fusion.forEach(([izq, der], i) => {
          const ini = 9 + i * 1.5, y = 700 + i * 170, ultima = i === K.fusion.length - 1;
          bloque([[izq, 'espacio']], X0, y - 54, { size: 68, peso: 600, maxW: 2400, entra: () => seg(b, ini, 0.9), sale: () => sal });
          ctx.font = fuente(600, 68); tracking(-0.82);
          const wi = ancho(izq), wd = ancho(der); tracking(0);
          lineaPunteada(X0 + wi + 36, y, W - X0 - wd - 36, y, eo(seg(b, ini + 0.4, 1)) * (1 - sal), ultima ? C.ign : tinta, ultima ? 0.9 : 0.45, 22, 3.6, ultima ? 40 : 0);
          bloque([[der, ultima ? 'ign' : 'espacio']], W - X0, y - 54, { size: 68, peso: 600, maxW: 2400, align: 'right', entra: () => seg(b, ini + 1, 0.9), sale: () => sal });
        });
      }
      // 3 · el socio de ejecución
      if (b > 15.8) {
        etiqueta('SOCIO DE EJECUCIÓN', X0, 330, C.ign, seg(b, 16, 0.6));
        bloque(K.socio, X0, 420, { size: 150, maxW: 2300, entra: (i) => seg(b, 16.3 + i * 0.4, 1) });
        K.verbos.forEach((v, i) => {
          const p = red ? (b > 18 ? 1 : 0) : eoX(seg(b, 18 + i * 0.5, 0.8)), x = X0 + i * 772, y = 760, w = 740;
          if (p <= 0) return;
          ctx.fillStyle = tinta; ctx.fillRect(x, y, w * p, 124);
          texto(flap(v, seg(b, 18.3 + i * 0.5, 0.8), i), x + 40, y + 82, { fam: 'mono', peso: 700, size: 52, ls: 4, color: C.crema });
          flecha(x + w - 70, y + 62, 64, 0, i === 2 ? C.ign : C.crema, seg(b, 18.6 + i * 0.5, 0.4));
        });
        texto(tecleo(K.socioTec, seg(b, 20.2, 1.2)), X0, 1010, { fam: 'mono', peso: 500, size: 34, ls: 5, color: tinta });
        bloque(K.socioFin, X0, 1060, { size: 60, peso: 600, maxW: 2000, entra: () => seg(b, 21, 0.9) });
      }
    },

    clientes(b) {
      etiqueta('NUESTROS CLIENTES · DOS RUTAS', X0, 300, C.ign, seg(b, 0.2, 0.8));
      bloque([['Nuestros clientes.', 'crema']], X0, 330, { size: 96, entra: () => seg(b, 0.4, 1) });
      lineaPunteada(1280, 520, 1280, 1190, eio(seg(b, 0.8, 1.6)), C.crema, 0.4, 20, 2.6);
      K.clientes.forEach((c, j) => {
        const x = j ? 1400 : X0, ini = 1.4 + j * 3.6;
        const w = texto(flap(c.codigo, seg(b, ini, 0.7), j + 3), x - 10, 770, { fam: 'mono', peso: 700, size: 250, color: C.ambar, ls: -6 });
        ctx.font = fuente(700, 250, 'mono');
        flecha(x + 400 + 70, 690, 130, c.flecha, C.ambar, red ? seg(b, ini + 0.5, 0.5) : eo(seg(b, ini + 0.5, 0.6)));
        bloque([[c.nombre, 'crema']], x, 830, { size: 64, maxW: 1100, entra: () => seg(b, ini + 0.5, 0.9) });
        c.filas.forEach((f, i) => {
          const p = seg(b, ini + 1.2 + i * 0.6, 1);
          punto(x + 8, 980 + i * 64 - 11, 6, j ? C.ign : C.crema, p > 0 ? 1 : 0);
          texto(flap(f, p, i + j * 5), x + 34, 980 + i * 64, { fam: 'mono', peso: 500, size: 32, ls: 2.4, color: C.crema, a: 0.9 });
        });
      });
    },

    oferta(b, e) {
      const sv = K.servicios, y0 = 560, rh = 86, xs = [X0, 400, 1220, W - X0 - 230];
      const iHl = sv.length - 1, hl = red ? (b > 12 ? 1 : 0) : eo(seg(b, 12, 0.9));
      const exp = red ? (b > e.beats - 1.4 ? 1 : 0) : eio(seg(b, e.beats - 1.6, 1.6));
      const esc = red ? 1 : mix(1, 1.035, eio(seg(b, 0, e.beats - 2)));
      camara(esc, 1280, 820, () => {
        etiqueta('¿QUÉ OFRECE? · ESTADO DE LA NAVE', X0, 300, C.ign, seg(b, 0.2, 0.8));
        bloque([['¿Qué ofrece?', 'crema']], X0, 330, { size: 96, entra: () => seg(b, 0.4, 1) });
        texto(flap('08', seg(b, 0.9, 0.8)), W - X0, 410, { fam: 'mono', peso: 700, size: 88, color: C.ambar, align: 'right' });
        texto('SERVICIOS EN DOS MOTORES', W - X0 - 150, 402, { fam: 'mono', peso: 500, size: 26, ls: 4, color: C.crema, a: 0.7 * seg(b, 1.1, 0.5), align: 'right' });
        ctx.fillStyle = rgba(C.crema, 0.3); ctx.fillRect(X0, y0 - 64, (W - 2 * X0) * eio(seg(b, 0.6, 1.2)), 2);
        ['CÓDIGO', 'SERVICIO', 'ALCANCE', 'RUTA'].forEach((h, i) => texto(h, xs[i], y0 - 22, { fam: 'mono', peso: 500, size: 22, ls: 3, color: C.acero, a: seg(b, 1, 0.6) }));
        sv.forEach(([cod, nom, alc, ruta], i) => {
          const y = y0 + i * rh, p = seg(b, 1.5 + i * 1.1, 0.9);
          if (p <= 0) return;
          const enHl = i === iHl;
          if (enHl && hl > 0) { ctx.fillStyle = C.ambar; ctx.fillRect(X0 - 24, y + 6, (W - 2 * X0 + 48) * hl, rh - 8); }
          const tinta = enHl && hl > 0.5 ? C.tueste : C.crema;
          ctx.fillStyle = rgba(C.crema, 0.12); ctx.fillRect(X0, y + rh - 1, W - 2 * X0, 1);
          texto(flap(cod, p, i), xs[0], y + 56, { fam: 'mono', peso: 700, size: 30, ls: 2, color: enHl && hl > 0.5 ? C.tueste : C.ambar });
          texto(nom, xs[1], y + 58, { peso: 650, size: 42, color: tinta, a: eo(seg(b, 1.8 + i * 1.1, 0.6)) });
          texto(alc, xs[2], y + 56, { peso: 450, size: 30, color: tinta, a: 0.78 * eo(seg(b, 2 + i * 1.1, 0.6)) });
          punto(xs[3] + 7, y + 47, 7, ruta === 'TECH' ? (enHl && hl > 0.5 ? C.tueste : C.crema) : (enHl && hl > 0.5 ? C.tueste : C.ign), eo(seg(b, 2.1 + i * 1.1, 0.4)));
          texto(flap(ruta, seg(b, 2.1 + i * 1.1, 0.6), i + 9), xs[3] + 28, y + 55, { fam: 'mono', peso: 500, size: 24, ls: 3, color: tinta });
        });
        // la fila de Tech Equity se abre hasta cubrir la lámina: pasamos al Ámbar del modelo operativo
        if (exp > 0) {
          const y = y0 + iHl * rh + 6;
          ctx.fillStyle = C.ambar;
          ctx.fillRect(mix(X0 - 24, -300, exp), mix(y, -300, exp), mix(W - 2 * X0 + 48, W + 600, exp), mix(rh - 8, H + 600, exp));
        }
      });
    },

    modelo(b) {
      const tinta = C.tueste;
      etiqueta('MODELO OPERATIVO', X0, 300, tinta, seg(b, 0.2, 0.8));
      [[760, 'Tech Company', 0.5], [1800, 'Venture Builder', 0.8]].forEach(([x, s, at]) => {
        bloque([[s, 'tueste']], x, 360, { size: 54, align: 'center', maxW: 900, entra: () => seg(b, at, 0.9) });
        const p = seg(b, at + 0.7, 0.7);
        flecha(x, 500 - (red ? 0 : (1 - eoBack(p)) * 50), 84, 90, tinta, red ? p : clamp(p * 3));
      });
      lineaPunteada(760, 570, 1280, 690, eio(seg(b, 2, 1.2)), tinta, 0.75, 18, 3, -40);
      lineaPunteada(1800, 570, 1280, 690, eio(seg(b, 2.1, 1.2)), tinta, 0.75, 18, 3, -40);
      punto(1280, 700, 11 * (red ? 1 : eoBack(seg(b, 3.2, 0.5))), C.ign);
      texto(tecleo('AMBOS MODELOS OPERAN BAJO', seg(b, 3.5, 0.9)), 1280, 790, { fam: 'mono', peso: 500, size: 32, ls: 6, color: tinta, align: 'center' });
      K.bases.forEach((s, i) => {
        const y = 850 + i * 118, at = 4.3 + i * 1.1;
        ctx.fillStyle = rgba(tinta, 0.25); ctx.fillRect(420, y, (W - 840) * eio(seg(b, at - 0.2, 0.9)), 2);
        texto(flap(`0${i + 1}`, seg(b, at, 0.6), i), 420, y + 82, { fam: 'mono', peso: 700, size: 56, color: tinta });
        bloque([[s, 'tueste']], 560, y + 22, { size: 58, maxW: 1600, entra: () => seg(b, at + 0.15, 0.9) });
      });
      // marcos de referencia: corren despacio por la base, como un tablero de salidas
      const pt = seg(b, 7, 0.8);
      if (pt > 0) {
        ctx.save(); ctx.beginPath(); ctx.rect(X0, 1200, W - 2 * X0, 60); ctx.clip();
        ctx.font = fuente(500, 28, 'mono'); tracking(3);
        const wt = ancho(K.marcos), off = red ? 0 : ((T - (lista.find((e) => e.id === 'modelo').inicio + 7) * spb) * 120) % wt;
        ctx.fillStyle = rgba(tinta, 0.85 * pt);
        for (let x = X0 - off; x < W; x += wt) ctx.fillText(K.marcos, x, 1244);
        tracking(0); ctx.restore();
        [[X0, 1], [W - X0 - 160, -1]].forEach(([x, s]) => { const g = ctx.createLinearGradient(x + (s > 0 ? 0 : 160), 0, x + (s > 0 ? 160 : 0), 0); g.addColorStop(0, rgba(C.ambar, 1)); g.addColorStop(1, rgba(C.ambar, 0)); ctx.fillStyle = g; ctx.fillRect(x, 1195, 160, 70); });
      }
    },

    partners(b) {
      const sube = red ? 0 : (1 - eio(seg(b, 0, 5))) * 260;
      estrellasDibujar(0.55 * eo(seg(b, 0, 2)), -T * 8, -T * 3 + b * 12);
      puntos(planeta.map((p) => [p.x, p.y + sube, 3.4 * clamp(0.25 + p.borde * 0.75) * clamp(1.4 - (p.y - 1150) / 400), 0.55 * clamp(1.3 - p.borde * 0.35)]), C.crema);
      etiqueta('NUESTROS PARTNERS TECH', X0, 300, C.ign, seg(b, 0.2, 0.8));
      bloque(K.partnersTitulo, X0, 330, { size: 72, maxW: 1500, entra: (i) => seg(b, 0.5 + i * 0.3, 1) });
      const pos = [[420, 740], [760, 950], [1080, 690], [1400, 900], [1720, 650], [2020, 880], [2300, 690]];
      pos.forEach(([x, y], i) => {
        const at = 2 + i * 1.25, p = seg(b, at, 0.7);
        if (i) lineaPunteada(pos[i - 1][0], pos[i - 1][1], x, y, eio(seg(b, at - 0.5, 0.6)), C.crema, 0.35, 18, 2.2);
        if (p <= 0) return;
        if (!red) { const q = seg(b, at, 1.2); ctx.strokeStyle = rgba(C.ambar, 0.6 * (1 - q)); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 9 + 60 * eo(q), 0, 7); ctx.stroke(); }
        punto(x, y, 9 * (red ? 1 : eoBack(p)), i === pos.length - 1 ? C.ign : C.ambar);
        bloque([[K.partners[i][0], 'crema']], x, y + 34, { size: 44, align: 'center', maxW: 600, entra: () => seg(b, at + 0.15, 0.8) });
        texto(flap(K.partners[i][1], seg(b, at + 0.4, 0.9), i), x, y + 130, { fam: 'mono', peso: 500, size: 24, ls: 1.5, color: C.crema, a: 0.72, align: 'center' });
      });
    },

    valores(b) {
      const tinta = C.espacio, v = K.valores, at = (i) => 3.4 + i * 2.2;
      const hechos = v.filter((_, i) => b >= at(i)).length;
      etiqueta('CHECKLIST DE PRE-VUELO', X0, 300, C.ign, seg(b, 0.2, 0.8));
      bloque([['¿Qué nos rige?', 'espacio']], X0, 330, { size: 128, maxW: 860, entra: (i) => seg(b, 0.4 + i * 0.35, 1) });
      const wN = texto(String(hechos).padStart(2, '0'), X0 - 10, 1190, { fam: 'mono', peso: 700, size: 230, color: C.ign, a: seg(b, 1.5, 0.8) });
      texto('/07', X0 - 10 + wN, 1190, { fam: 'mono', peso: 700, size: 230, color: C.acero, a: 0.5 * seg(b, 1.5, 0.8) });
      v.forEach((s, i) => {
        const y = 420 + i * 118, ap = seg(b, 0.8 + i * 0.25, 0.8), ck = red ? (b >= at(i) ? 1 : 0) : seg(b, at(i), 0.6);
        if (ap <= 0) return;
        const a = mix(0.32, 1, eo(ck)) * ap;
        ctx.strokeStyle = rgba(tinta, 0.8 * ap); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(1150, y, 20, 0, 7); ctx.stroke();
        punto(1150, y, 20 * (red ? ck : eoBack(ck)), C.ign);
        texto(`0${i + 1}`, 1196, y + 10, { fam: 'mono', peso: 500, size: 28, ls: 2, color: C.acero, a: ap });
        const w = texto(s, 1280, y + 15, { peso: 600, size: 44, color: tinta, a });
        const x1 = 1280 + w + 30, x2 = W - X0 - 70;
        if (x2 > x1 + 30) lineaPunteada(x1, y + 4, x2, y + 4, eo(seg(b, at(i) + 0.15, 0.7)), tinta, 0.4, 18, 2.4);
        texto(flap('OK', seg(b, at(i) + 0.5, 0.4), i), W - X0, y + 12, { fam: 'mono', peso: 700, size: 30, ls: 2, color: C.ign, align: 'right' });
      });
    },

    estructura(b, e) {
      const O = [840, 790], R = 390, R0 = K.roles, ini = 4, paso = 5.6, finR = ini + R0.length * paso;
      const fin = e.beats, sal = red ? (b > fin - 2 ? 1 : 0) : eio(seg(b, fin - 2.4, 1.4));
      const vuelo = red ? (b > fin - 1.6 ? 1 : 0) : eio(seg(b, fin - 2, 2));
      const ang = (i) => ((-90 + i * 72) * Math.PI) / 180;
      const P = (i) => [O[0] + Math.cos(ang(i)) * R, O[1] + Math.sin(ang(i)) * R];
      const a = 1 - sal;
      // órbita punteada, con su giro lento
      const giro = red ? 0 : T * 0.06, n = 120, pr = eio(seg(b, 0.6, 1.8));
      const anillo = [];
      for (let i = 0; i < n * pr; i++) { const t = (i / n) * Math.PI * 2 - Math.PI / 2 + giro; anillo.push([O[0] + Math.cos(t) * R, O[1] + Math.sin(t) * R, 2.6, 0.38 * a]); }
      puntos(anillo, C.crema);
      R0.forEach((_, i) => {
        const am = ang(i) + (36 * Math.PI) / 180;
        flecha(O[0] + Math.cos(am) * R, O[1] + Math.sin(am) * R, 40, (am * 180) / Math.PI + 90, C.ign, seg(b, 3.4 + i * 0.2, 0.5) * a);
      });
      const foco = b >= ini && b < finR ? Math.floor((b - ini) / paso) : -1;
      R0.forEach((r, i) => {
        const [x, y] = P(i), p = seg(b, 1.6 + i * 0.35, 0.8);
        if (p <= 0) return;
        const lf = b - (ini + i * paso), on = foco === i ? eo(clamp(lf / 0.5)) * (1 - seg(lf, paso - 0.4, 0.4)) : 0;
        const s = (red ? 1 : eoBack(p)) * (1 + 0.12 * on);
        ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
        ctx.fillStyle = mixc(C.espacio, C.ign, on); ctx.beginPath(); ctx.arc(0, 0, 92, 0, 7); ctx.fill();
        ctx.strokeStyle = rgba(on > 0.5 ? C.ign : C.crema, 1); ctx.lineWidth = 2.5; ctx.stroke();
        ctx.restore();
        texto(r.codigo, x, y + 10, { fam: 'mono', peso: 700, size: 46, ls: 2, color: on > 0.5 ? C.crema : C.ambar, align: 'center', a: a * clamp(p * 2) });
        texto(r.sub, x, y + 46, { fam: 'mono', peso: 500, size: 18, ls: 1.5, color: C.crema, align: 'center', a: 0.75 * a * clamp(p * 2) });
      });
      // los directores por país orbitan alrededor del CEO
      const dir = K.directores, dp = seg(b, finR + 0.3, 1);
      if (dp > 0) dir.paises.forEach((pa, j) => {
        const [cx0, cy0] = P(0), tx = 840 + (j ? 330 : -330), ty = 430, q = red ? 1 : eio(dp);
        const x = mix(cx0, tx, q), y = mix(cy0, ty, q);
        lineaPunteada(cx0, cy0, x, y, 1, C.ambar, 0.6 * a, 16, 2.2);
        ctx.fillStyle = rgba(C.espacio, a); ctx.beginPath(); ctx.arc(x, y, 64, 0, 7); ctx.fill();
        ctx.strokeStyle = rgba(C.ambar, a); ctx.lineWidth = 2.5; ctx.stroke();
        texto('MD', x, y + 2, { fam: 'mono', peso: 700, size: 28, color: C.crema, align: 'center', a });
        texto(pa, x, y + 32, { fam: 'mono', peso: 500, size: 22, ls: 2, color: C.ambar, align: 'center', a });
      });
      // disco central: al final se vuelve el punto Ignición que despegará
      const dx = mix(O[0], 1280, vuelo), dy = mix(O[1], 900, vuelo), dr = mix(140, 12, vuelo);
      const dpop = red ? 1 : eoBack(seg(b, 0.3, 0.8));
      punto(dx, dy, dr * dpop, mixc(C.crema, C.ign, eio(seg(b, fin - 1.4, 1))));
      simbolo(dx, dy, (dr / 140) * 0.75 * dpop, C.ign, 1 - seg(b, fin - 2, 0.8));
      // panel de rol
      const xP = 1500, yP = 540;
      etiqueta('ESTRUCTURA ORGANIZATIVA', xP, 300, C.ign, seg(b, 0.4, 0.8) * a);
      bloque([['Board of Directors.', 'crema']], xP, 330, { size: 88, maxW: 940, entra: () => seg(b, 0.6, 1), sale: () => sal });
      const panel = (k, txt, lf) => {
        const sale = () => seg(lf, paso - 0.5, 0.45);
        texto(tecleo(`ROL ${String(k + 1).padStart(2, '0')} / 06`, seg(lf, 0.1, 0.6)), xP, yP, { fam: 'mono', peso: 500, size: 28, ls: 4, color: C.ign, a: 1 - sale() });
        let y = yP + 40;
        y += bloque([[txt.cargo, 'crema']], xP, y, { size: 56, maxW: 920, entra: (i) => seg(lf, 0.2 + i * 0.2, 0.8), sale }) + 18;
        y += bloque([[txt.lema, 'ambar']], xP, y, { size: 40, peso: 500, lh: 1.22, maxW: 920, ls: -0.005, entra: (i) => seg(lf, 0.45 + i * 0.12, 0.8), sale }) + 30;
        txt.funciones.forEach((f, j) => texto(`— ${f}`, xP, y + j * 52, { fam: 'mono', peso: 500, size: 28, ls: 0.5, color: C.crema, a: 0.82 * eo(seg(lf, 0.8 + j * 0.15, 0.6)) * (1 - sale()) }));
      };
      if (foco >= 0) panel(foco, R0[foco], b - (ini + foco * paso));
      if (b >= finR) {
        const lf = b - finR;
        texto(tecleo('ROL 06 / 06 · POR PAÍS', seg(lf, 0.1, 0.6)), xP, yP, { fam: 'mono', peso: 500, size: 28, ls: 4, color: C.ign, a });
        let y = yP + 40;
        y += bloque([[dir.cargo, 'crema']], xP, y, { size: 56, maxW: 920, entra: (i) => seg(lf, 0.2 + i * 0.2, 0.8), sale: () => sal }) + 18;
        y += bloque([[dir.lema, 'ambar']], xP, y, { size: 40, peso: 500, maxW: 920, entra: () => seg(lf, 0.45, 0.8), sale: () => sal }) + 30;
        dir.funciones.forEach((f, j) => texto(`— ${f}`, xP, y + j * 52, { fam: 'mono', peso: 500, size: 28, ls: 0.5, color: C.crema, a: 0.82 * eo(seg(lf, 0.8 + j * 0.15, 0.6)) * a }));
      }
    },

    despegue(b) {
      const L = 9; // T–00 en el beat local 9
      const lanz = red ? (b > L ? 1 : 0) : seg(b, L + 0.6, 1.6);
      // columna de empuje: la trama Ámbar sube desde el suelo
      const sube = red ? (b > L ? 1 : 0) : eo(seg(b, L + 0.2, 1.8)), apaga = 1 - 0.65 * eio(seg(b, L + 3, 3));
      if (sube > 0) puntos(pluma.map((p) => {
        const v = (H - p.y) / (H - 560), sig = mix(620, 70, Math.pow(v, 0.7));
        const f = Math.exp(-((p.x - 1280) ** 2) / (2 * sig * sig)) * clamp((sube * 1.25 - v) * 3);
        return [p.x, p.y, 8.4 * f * (0.75 + 0.25 * p.j), apaga];
      }), C.ambar);
      // el punto despega con estela
      const yp = 900 - 1100 * Math.pow(lanz, 2.6);
      if (lanz < 1) {
        if (lanz > 0 && !red) for (let j = 14; j >= 1; j--) { const q = lanz - j * 0.018; if (q > 0) punto(1280, 900 - 1100 * Math.pow(q, 2.6), 12 * (1 - j / 16), C.ign, 0.8 * (1 - j / 15)); }
        punto(1280, yp, 12, C.ign);
      }
      bloque([[K.pregunta, 'crema']], 1280, 380, { size: 220, align: 'center', maxW: 2200, entra: () => seg(b, 0.6, 1.1), sale: () => seg(b, 5.2, 0.8) });
      bloque(K.despegue, 1280, 440, { size: 124, align: 'center', maxW: 2200, entra: () => seg(b, 6, 1), sale: () => seg(b, L + 0.5, 0.6) });
      // cuenta regresiva: un número por beat hasta T–00
      for (let k = 3; k >= 0; k--) {
        const at = L - k, p = seg(b, at, 0.4), q = k ? seg(b, at + 0.7, 0.3) : seg(b, L + 0.5, 0.3);
        if (p <= 0 || q >= 1) continue;
        texto(`T–0${k}`, 1280, 760 + (red ? 0 : (1 - eoX(p)) * 40), { fam: 'mono', peso: 700, size: 150, ls: 4, color: k ? C.ambar : C.ign, align: 'center', a: (red ? 1 : clamp(p * 2)) * (1 - q) });
      }
      // órbita: la marca
      const lk = seg(b, L + 2.2, 1.4);
      if (lk > 0) {
        const alto = 210, w = alto * (617 / 116), x0 = 1280 - w / 2, cy = 600;
        const s = red ? 1 : eo(lk);
        simbolo(x0 + alto / 2, cy + (1 - s) * 40, alto / 200, C.crema, s);
        logotipo(x0 + alto * (150 / 116), cy - alto / 2, alto, C.crema, [0, 1, 2, 3].map((i) => seg(b, L + 2.5 + i * 0.2, 0.9)));
        texto(tecleo(K.bajada, seg(b, L + 3.4, 1.2)), 1280, cy + alto / 2 + 100, { fam: 'mono', peso: 500, size: 36, ls: 7, color: C.ambar, align: 'center' });
        bloque(K.despegue, 1280, cy + alto / 2 + 160, { size: 60, peso: 600, align: 'center', maxW: 2000, entra: () => seg(b, L + 4.4, 1) });
      }
    },
  };

  /* ───── un cuadro ───── */
  function render(context, t, { reducido = false, bucle = false } = {}) {
    ctx = context; red = reducido; T = clamp(t, 0, duracion - 1e-6);
    const B = T / spb;
    const i = Math.max(0, lista.findIndex((e) => B >= e.inicio && B < e.fin));
    const e = lista[i], b = B - e.inicio;
    ctx.fillStyle = C[e.fondo]; ctx.fillRect(0, 0, W, H);
    // viñeta leve solo en láminas oscuras
    T_[e.id](b, e);
    let tinta = OSCURO[e.fondo] ? C.crema : e.fondo === 'ambar' ? C.tueste : C.espacio;
    if (e.salida) {
      const p = seg(b, e.beats - e.salida.beats, e.salida.beats);
      barrido(p, e.salida.color, e.salida.origen);
      const destino = OSCURO[e.salida.color] ? C.crema : e.salida.color === 'ambar' ? C.tueste : C.espacio;
      tinta = mixc(tinta, destino, eio(p));
    }
    if (e.finFondo) tinta = mixc(tinta, C.tueste, eio(seg(b, e.beats - 1.6, 1.6)));
    if (OSCURO[e.fondo] && !(e.salida && seg(b, e.beats - e.salida.beats, e.salida.beats) >= 1)) {
      const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.45, W / 2, H / 2, H * 1.1);
      g.addColorStop(0, 'rgba(0,19,29,0)'); g.addColorStop(1, 'rgba(0,19,29,0.45)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }
    const hudA = eo(seg(B, 2.4, 2));
    bitacora(B, tinta, hudA);
    if (bucle) { const f = eio(seg(B, totalB - 1.4, 1.4)); if (f > 0) { ctx.fillStyle = rgba(C.espacio, f); ctx.fillRect(0, 0, W, H); } }
  }

  return { render, duracion, spb, escenas: lista, totalBeats: totalB, W, H };
}
