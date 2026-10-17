/* Nave Café · prototipo funcional del flujo completo (React 18 + htm, sin build). */
(function () {
  const { useState, useEffect, useRef, useMemo, useCallback } = React;
  const html = htm.bind(React.createElement);
  const SVG = window.NAVE_SVG;

  /* ---------- Datos de ejemplo ---------- */
  const IVA = 0.13;
  const money = (n) => '$' + n.toFixed(2);
  const hm = (m) => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
  const hh = (h) => String(Math.floor(h)).padStart(2, '0') + ':' + (h % 1 ? '30' : '00');
  const IMG = {
    ctl2: 'img/control-2.jpg', ctl2b: 'img/control-2-pizarra.jpg', ctl2c: 'img/control-2-sillas.jpg',
    ctl3: 'img/control-3.jpg', hng: 'img/hangar.jpg', hngb: 'img/hangar-led.jpg', hngc: 'img/hangar-colegio.jpg',
    cab: 'img/cabina.jpg', iso: 'img/planta-iso.jpg', cafe: 'img/cafe-maquina.jpg', vitrina: 'img/cafe-vitrina.jpg', barra: 'img/cafe-barra.jpg',
  };

  const ROOMS = [
    { id: 'ctl1', code: 'CTL 1', em: 'CTL', name: 'Control 1', cap: 4, capLabel: '4 personas', desc: 'Pizarra de tiza · TV', rate: 15, freeFrom: 14,
      kind: 'Sala de Control', where: 'Control 1, pasillo de salas', pin: [24, 46], gallery: [IMG.ctl2c, IMG.ctl2b, IMG.ctl2], pos: '50% 60%',
      sub: 'Hasta 4 personas · Planta baja, pasillo de salas',
      long: 'La Sala de Control más compacta: una mesa para cuatro, pizarra de tiza y TV. Ideal para entrevistas, llamadas o trabajo enfocado. Incluye WiFi, agua y café de filtro.',
      specs: [['Capacidad', '4 personas'], ['Pantalla', 'TV 43" HDMI'], ['Pizarra', 'Tiza'], ['Extras', 'A/C']] },
    { id: 'ctl2', code: 'CTL 2', em: 'CTL', name: 'Control 2', cap: 6, capLabel: '6 personas', desc: 'Luz natural · pizarra · TV', rate: 20, freeFrom: 14,
      kind: 'Sala de Control', where: 'Control 2, pasillo de salas', pin: [31, 52], gallery: [IMG.ctl2, IMG.ctl2b, IMG.ctl2c],
      sub: 'Hasta 6 personas · Planta baja, junto al café',
      long: 'Una Sala de Control luminosa con cortinas, pizarra de pared completa y TV. Pensada para reuniones de equipo, entrevistas o sesiones de trabajo de medio día. Incluye WiFi, agua y café de filtro.',
      specs: [['Capacidad', '6 personas'], ['Pantalla', 'TV 55" HDMI'], ['Pizarra', 'Pared completa'], ['Extras', 'Luz natural · A/C']] },
    { id: 'ctl3', code: 'CTL 3', em: 'CTL', name: 'Control 3', cap: 6, capLabel: '6 personas', desc: 'Madera · pizarra larga', rate: 20, freeFrom: 15,
      kind: 'Sala de Control', where: 'Control 3, pasillo de salas', pin: [38, 44], gallery: [IMG.ctl3, IMG.ctl2b, IMG.ctl2c],
      sub: 'Hasta 6 personas · Planta baja, pasillo de salas',
      long: 'Paneles de madera, pizarra larga y TV lateral. Una sala cálida para talleres pequeños y sesiones de planeación. Incluye WiFi, agua y café de filtro.',
      specs: [['Capacidad', '6 personas'], ['Pantalla', 'TV 55" HDMI'], ['Pizarra', 'Pared larga'], ['Extras', 'Madera · A/C']] },
    { id: 'ctl4', code: 'CTL 4', em: 'CTL', name: 'Control 4', cap: 8, capLabel: '8 personas', desc: 'Mesa larga · TV doble', rate: 25, freeFrom: 14,
      kind: 'Sala de Control', where: 'Control 4, pasillo de salas', pin: [45, 50], gallery: [IMG.ctl2b, IMG.ctl2, IMG.ctl2c],
      sub: 'Hasta 8 personas · Planta baja, pasillo de salas',
      long: 'Mesa larga para ocho personas y dos pantallas para presentar y llamar al mismo tiempo. Incluye WiFi, agua y café de filtro.',
      specs: [['Capacidad', '8 personas'], ['Pantalla', '2 × TV 55"'], ['Pizarra', 'Pared completa'], ['Extras', 'A/C']] },
    { id: 'ctl5', code: 'CTL 5', em: 'CTL', name: 'Control 5', cap: 8, capLabel: '8 personas', desc: 'Pantalla LED · pizarra', rate: 25, freeFrom: 16.5,
      kind: 'Sala de Control', where: 'Control 5, pasillo de salas', pin: [52, 42], gallery: [IMG.ctl3, IMG.ctl2b, IMG.ctl2], pos: '70% 50%',
      sub: 'Hasta 8 personas · Planta baja, pasillo de salas',
      long: 'Pantalla LED y pizarra para presentaciones de equipo. Luz natural y cortinas para controlar el reflejo. Incluye WiFi, agua y café de filtro.',
      specs: [['Capacidad', '8 personas'], ['Pantalla', 'LED 65"'], ['Pizarra', 'Pared completa'], ['Extras', 'Luz natural · A/C']] },
    { id: 'cab', code: 'CAB', em: 'CAB', name: 'Cabina podcast', board: 'Podcast', cap: 3, capLabel: '3 personas', desc: 'Micrófonos · cámara · fondo', rate: 25, freeFrom: 16,
      kind: 'Cabina', where: 'Cabina podcast, junto al Garage', pin: [22, 64], gallery: [IMG.cab], tag: 'grabacion',
      sub: 'Hasta 3 personas · Planta baja, junto al Garage',
      long: 'Cabina tratada acústicamente con tres micrófonos, cámara, luces y fondo intercambiable. Graba tu podcast o tus videos sin montar nada.',
      specs: [['Capacidad', '3 personas'], ['Audio', '3 micrófonos'], ['Video', 'Cámara 4K · luces'], ['Extras', 'Fondo · A/C']] },
    { id: 'gar', code: 'GAR', em: 'GAR', name: 'El Garage', cap: 8, capLabel: '8 personas', desc: 'Lounge creativo', rate: 18, freeFrom: 14,
      kind: 'Lounge', where: 'El Garage, planta baja', pin: [62, 58], gallery: [IMG.iso], pos: '72% 60%',
      sub: 'Hasta 8 personas · Planta baja, junto a la terraza',
      long: 'Un lounge con sillones, mesa baja y pizarra móvil. Para lluvias de ideas, reuniones informales o recibir a un cliente con café.',
      specs: [['Capacidad', '8 personas'], ['Pantalla', 'TV 55" móvil'], ['Pizarra', 'Móvil'], ['Extras', 'Sillones · A/C']] },
    { id: 'hng', code: 'HNG', em: 'HNG', name: 'Hangar', cap: 46, capMin: 12, capLabel: '12 a 46 personas', desc: 'Reunión grande o evento', rate: 60, freeFrom: 99,
      kind: 'Hangar · Formato evento', where: 'Hangar, ala norte', pin: [70, 30], gallery: [IMG.hng, IMG.hngb, IMG.hngc], tag: 'eventos', event: true,
      sub: '12 a 46 personas según montaje · Ala norte',
      long: 'La sala más grande de Nave. Paneles móviles, muro LED y sillas apilables: se arma como auditorio, salón tipo colegio o una gran mesa de trabajo. Ideal para talleres, lanzamientos y reuniones grandes.',
      specs: [['Capacidad', '12 a 46'], ['Pantalla', 'Muro LED'], ['Audio', '2 micrófonos'], ['Extras', 'Pizarra · A/C']] },
  ];
  const roomById = Object.fromEntries(ROOMS.map((r) => [r.id, r]));
  const MONTAJES = [
    { id: 'auditorio', name: 'Auditorio', cap: 46, d: 'Sillas en filas hacia la pantalla.' },
    { id: 'colegio', name: 'Tipo colegio', cap: 22, d: 'Mesas en filas con sillas.' },
    { id: 'mesa', name: 'Mesa de trabajo', cap: 12, d: 'Una mesa grande al centro.' },
  ];
  const DAYS = [
    { id: 'hoy', label: 'Hoy', long: 'Hoy', today: true },
    { id: 'manana', label: 'Mañana', long: 'Vie 17' },
    { id: 'lun20', label: 'Lun 20', long: 'Lun 20' },
    { id: 'mar21', label: 'Mar 21', long: 'Mar 21' },
  ];
  const MORE_DAYS = [{ id: 'sab18', label: 'Sáb 18', long: 'Sáb 18' }, { id: 'sab25', label: 'Sáb 25', long: 'Sáb 25' }, { id: 'lun27', label: 'Lun 27', long: 'Lun 27' }];
  const allDays = [...DAYS, ...MORE_DAYS];

  const MENU = [
    { sec: 'Combustible · Espresso', items: [
      { id: 'espresso', name: 'Espresso', price: 2.25, shots: 1, sizes: false, milk: false },
      { id: 'cortado', name: 'Cortado', price: 2.75, shots: 1, sizes: false, milk: true },
      { id: 'capuchino', name: 'Capuchino', price: 3.25, shots: 2, milk: true },
      { id: 'orbita', name: 'Órbita', note: 'Latte con horchata de morro', price: 3.75, shots: 2, milk: true, long: 'Órbita con horchata de morro. Café de altura de Apaneca-Ilamatepec.' },
      { id: 'houston', name: 'Houston', note: 'Cold brew, tónica y naranja', price: 4.0, cold: true, long: 'Cold brew de 18 horas con tónica y piel de naranja. Siempre frío.' },
    ] },
    { sec: 'Órbita lenta · Filtrados', items: [
      { id: 'v60', name: 'V60 Pacamara', note: 'Apaneca-Ilamatepec · 1,450 msnm', price: 4.25, sizes: false, long: 'Pacamara lavado, notas de panela y mandarina. Preparado a mano en V60.' },
      { id: 'chemex', name: 'Chemex para dos', price: 7.5, sizes: false, long: 'Una Chemex de 600 ml con el café del día para compartir.' },
    ] },
    { sec: 'Provisiones · Salados', items: [
      { id: 'panpollo', name: 'Pan con pollo', price: 5.5, food: true, long: 'Pan francés con pollo guisado, curtido, berro y salsa.' },
      { id: 'pupusa', name: 'Pupusa revuelta', note: 'Con curtido y salsa', price: 1.5, food: true, long: 'Chicharrón, frijol y quesillo. Con curtido y salsa de tomate.' },
    ] },
    { sec: 'Aterrizaje · Postres', items: [
      { id: 'quesadilla', name: 'Quesadilla', full: 'Quesadilla salvadoreña', note: 'Con crema y ajonjolí', price: 2.5, food: true, long: 'Quesadilla salvadoreña horneada, con crema y ajonjolí.' },
      { id: 'semita', name: 'Semita de piña', price: 2.0, food: true, long: 'Semita alta rellena de dulce de piña.' },
    ] },
  ];
  const productById = {};
  MENU.forEach((s) => s.items.forEach((p) => { p.sec = s.sec; productById[p.id] = p; }));
  const productImg = (p) => (p.food ? IMG.vitrina : IMG.cafe);

  const BOARD = [
    { id: 'gar', code: 'GAR', name: 'El Garage', sub: 'Lounge · 8 pers.', level: 6, st: 'Libre', stc: 'libre', hint: 'ahora · hasta 20:00', act: 'Reservar', primary: true, cat: 'salas' },
    { id: 'ctl3', code: 'CTL 3', name: 'Control 3', sub: 'Reuniones · 6 pers.', level: 5, st: '15:00', stc: 'pronto', hint: 'se libera', act: 'Reservar', cat: 'salas' },
    { id: 'cab', code: 'CAB', name: 'Podcast', sub: 'Grabación · 3 pers.', level: 4, st: '16:00', stc: 'pronto', hint: 'se libera', act: 'Reservar', cat: 'salas' },
    { id: 'hng', code: 'HNG', name: 'Hangar', sub: 'Eventos · hasta 46', level: 0, st: 'Mañana', stc: 'uso', hint: 'desde 09:00', act: 'Ver', cat: 'salas' },
    { id: 'bar', code: 'BAR', name: 'La Barra', sub: 'Café · hasta 20:00', level: 10, st: 'Abierta', stc: 'libre', hint: 'sin reserva', act: 'Pedir', primary: true, cat: 'cafe' },
  ];

  /* ---------- Utilidades ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('nave:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('nave:' + k, JSON.stringify(v)); } catch (e) { /* almacenamiento bloqueado */ } },
  };
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let uid = 0; const newId = () => 'i' + Date.now().toString(36) + (uid++);

  function priceOf(p, o) {
    let u = p.price;
    if (o.size === '16 oz') u += 0.5;
    if (o.milk === 'Avena' || o.milk === 'Almendra') u += 0.5;
    if (p.shots && o.shots > p.shots) u += (o.shots - p.shots) * 0.75;
    return Math.round(u * 100) / 100;
  }
  function cafeDetail(p, o) {
    if (p.food) return o.notes ? o.notes : (p.note || p.sec.split(' · ')[1]);
    const bits = [];
    if (o.size) bits.push(o.size);
    if (o.milk && o.milk !== 'Entera') bits.push(o.milk.toLowerCase());
    if (p.shots) bits.push(o.shots + (o.shots === 1 ? ' shot' : ' shots'));
    if (o.sweet && o.sweet !== 'Sin azúcar') bits.push(o.sweet.toLowerCase() + (o.sweetN > 1 ? ' ×' + o.sweetN : ''));
    if (o.temp && o.temp !== 'Caliente') bits.push(o.temp.toLowerCase());
    return bits.join(' · ') || p.sec.split(' · ')[1];
  }
  function totals(cart) {
    const rooms = cart.filter((i) => i.kind === 'sala');
    const cafe = cart.filter((i) => i.kind === 'cafe');
    const roomSum = rooms.reduce((a, i) => a + i.price, 0);
    const cafeSum = cafe.reduce((a, i) => a + i.price * i.qty, 0);
    const cafeQty = cafe.reduce((a, i) => a + i.qty, 0);
    const sub = roomSum + cafeSum;
    const iva = Math.round(sub * IVA * 100) / 100;
    return { rooms, cafe, roomSum, cafeSum, cafeQty, iva, total: Math.round((sub + iva) * 100) / 100, count: rooms.length + cafeQty };
  }
  function cartTitle(cart) {
    const t = totals(cart);
    const parts = [];
    t.rooms.forEach((r) => parts.push(r.roomName));
    if (t.cafeQty) parts.push(t.cafeQty + (t.cafeQty === 1 ? ' producto' : ' productos') + ' de café');
    return parts.join(' + ');
  }

  /* ---------- Piezas de marca ---------- */
  const Logo = ({ onClick }) => html`<a href="#inicio" className="logo" aria-label="Nave Café, inicio" onClick=${onClick} dangerouslySetInnerHTML=${{ __html: SVG.logo }}></a>`;
  const Emblem = ({ code, className }) => html`<span className=${'em ' + (className || '')} aria-hidden="true" dangerouslySetInnerHTML=${{ __html: SVG[code] || '' }}></span>`;

  function Trama({ rows = 8, color = 'var(--accent)', max = 3.7, min = 0.7, opacity = 1 }) {
    const list = [];
    for (let i = 0; i < rows; i++) {
      const r = max - (max - min) * (i / Math.max(1, rows - 1));
      list.push(html`<i key=${i} style=${{ '--r': r.toFixed(2) + 'px', '--tc': color, opacity }}></i>`);
    }
    return html`<div className="trama" aria-hidden="true">${list}</div>`;
  }

  const Meter = ({ level }) => html`<div className="meter" role="img" aria-label=${level + ' de 10 horas libres'}>
    ${Array.from({ length: 10 }, (_, i) => html`<i key=${i} className=${i < level ? 'on' : ''}></i>`)}</div>`;

  // Paleta del tablero: cada carácter gira antes de asentarse.
  const FLAP = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789';
  function Flap({ text, delay = 0 }) {
    const [shown, setShown] = useState(text);
    useEffect(() => {
      if (reduceMotion()) { setShown(text); return; }
      let tick = 0, id = null; const total = 9 + text.length;
      const t0 = setTimeout(() => {
        id = setInterval(() => {
          tick++;
          setShown(text.split('').map((c, i) => (c === ' ' || c === ':' || c === '·' || tick > 4 + i ? c : FLAP[(Math.random() * FLAP.length) | 0])).join(''));
          if (tick >= total) { clearInterval(id); setShown(text); }
        }, 45);
      }, delay);
      return () => { clearTimeout(t0); if (id) clearInterval(id); };
    }, [text]);
    return html`<span className="flap" aria-label=${text}>${shown.split('').map((c, i) => html`<span key=${i} aria-hidden="true" className=${c === ' ' ? 'sp' : ''}>${c}</span>`)}</span>`;
  }

  /* ---------- Reloj simulado (arranca a las 14:05 del jueves 16 oct) ---------- */
  function useClock() {
    const [now, setNow] = useState(() => ({ t0: Date.now(), min: 14 * 60 + 5 }));
    const [, force] = useState(0);
    useEffect(() => { const id = setInterval(() => force((x) => x + 1), 15000); return () => clearInterval(id); }, []);
    const minutes = now.min + Math.floor((Date.now() - now.t0) / 60000);
    return { minutes, label: hh(Math.floor(minutes / 60)).slice(0, 3) + String(minutes % 60).padStart(2, '0') };
  }

  /* ---------- Enrutador por hash ---------- */
  const parseHash = () => {
    const h = (location.hash || '#inicio').slice(1);
    const [name, ...rest] = h.split('-');
    return { name: name || 'inicio', param: rest.join('-') || null };
  };

  /* ---------- App ---------- */
  function App() {
    const [route, setRoute] = useState(parseHash);
    const [theme, setThemeState] = useState(() => store.get('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    const [cart, setCart] = useState(() => store.get('cart', []));
    const [user, setUser] = useState(() => store.get('user', null));
    const [plan, setPlan] = useState(() => store.get('plan', null));
    const [bookings, setBookings] = useState(() => store.get('bookings', []));
    const [orders, setOrders] = useState(() => store.get('orders', []));
    const [delivery, setDelivery] = useState('auto');
    const [last, setLast] = useState(() => store.get('last', null));
    const [modal, setModal] = useState(null); // {mode:'checkout'|'login'|'plan', step}
    const [toast, setToast] = useState(null);
    const [bump, setBump] = useState(0);
    const clock = useClock();

    useEffect(() => { document.documentElement.setAttribute('data-theme', theme); store.set('theme', theme); }, [theme]);
    useEffect(() => store.set('cart', cart), [cart]);
    useEffect(() => store.set('user', user), [user]);
    useEffect(() => store.set('plan', plan), [plan]);
    useEffect(() => store.set('bookings', bookings), [bookings]);
    useEffect(() => store.set('orders', orders), [orders]);
    useEffect(() => store.set('last', last), [last]);
    useEffect(() => {
      const on = () => { setRoute(parseHash()); window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' }); };
      window.addEventListener('hashchange', on);
      return () => window.removeEventListener('hashchange', on);
    }, []);
    useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 3600); return () => clearTimeout(id); }, [toast]);

    const go = useCallback((name, param) => {
      const h = '#' + name + (param ? '-' + param : '');
      if (location.hash === h) window.scrollTo(0, 0); else location.hash = h;
    }, []);
    const notify = (msg, action) => setToast({ msg, action, k: Date.now() });

    const addToCart = (item, replaceId) => {
      setCart((c) => {
        if (replaceId) return c.map((i) => (i.id === replaceId ? { ...item, id: replaceId } : i));
        if (item.kind === 'sala') return [...c.filter((i) => !(i.kind === 'sala' && i.room === item.room)), item];
        return [...c, item];
      });
      setBump((b) => b + 1);
    };
    const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));

    const upcoming = bookings.filter((b) => !b.past).sort((a, b) => (a.dayIdx - b.dayIdx) || (a.start - b.start));
    const nextToday = upcoming.find((b) => b.dayId === 'hoy' && (b.start + b.dur) * 60 > clock.minutes);

    const ctx = { route, go, cart, addToCart, removeFromCart, user, setUser, plan, setPlan, bookings, setBookings, orders, setOrders,
      delivery, setDelivery, last, setLast, setModal, notify, clock, theme, setTheme: setThemeState, upcoming, nextToday, setCart };

    const screens = { inicio: Inicio, salas: Salas, sala: SalaDetalle, cafe: Cafe, producto: Producto, checkout: Checkout, pago: Pago, listo: Listo, reservas: Reservas };
    const Screen = screens[route.name] || Inicio;
    const withBar = (route.name === 'sala' || route.name === 'producto');

    useEffect(() => {
      document.body.classList.toggle('has-tabbar', true);
      document.body.classList.toggle('has-mbar', withBar);
    }, [withBar]);

    return html`
      <${Nav} ctx=${ctx} bump=${bump} />
      <${Screen} key=${route.name + (route.param || '')} ctx=${ctx} />
      <footer className="meta"><div className="wrap"><span>13.7046° N · 89.2453° O</span><span>Nave Café · Houston en línea · Ed. 01</span></div></footer>
      <${TabBar} ctx=${ctx} />
      ${modal && html`<${Onboarding} ctx=${ctx} modal=${modal} close=${() => setModal(null)} />`}
      ${toast && html`<div className="toast" role="status" key=${toast.k}><span>${toast.msg}</span>${toast.action && html`<button onClick=${() => { toast.action.fn(); setToast(null); }}>${toast.action.label}</button>`}</div>`}
    `;
  }

  /* ---------- Navegación ---------- */
  function Nav({ ctx, bump }) {
    const { route, go, cart, user, setUser, theme, setTheme, setModal, notify } = ctx;
    const [menu, setMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
      const on = () => setScrolled(window.scrollY > 4);
      on(); window.addEventListener('scroll', on, { passive: true });
      return () => window.removeEventListener('scroll', on);
    }, []);
    const count = totals(cart).count;
    const section = route.name === 'sala' ? 'salas' : route.name === 'producto' ? 'cafe' : route.name;
    const link = (id, label) => html`<a href=${'#' + id} className="nav-link" aria-current=${section === id ? 'page' : undefined}>${label}</a>`;
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
    const themeBtn = html`<button className="icon-btn" onClick=${toggleTheme} aria-label=${theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} title=${theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}><span className="theme-ico" style=${{ transform: theme === 'dark' ? 'rotate(180deg)' : 'none', transition: 'transform .4s' }}></span></button>`;
    const checkoutBtn = (s) => html`<button key=${'co' + bump} className=${'btn btn-primary btn-s ' + (bump ? 'bump' : '')} onClick=${() => go('checkout')}>Checkout${count ? html` · <span className="count">${count}</span>` : ''}</button>`;
    const avatarBtn = html`<div style=${{ position: 'relative' }}>
      <button className=${'avatar ' + (user ? 'on' : '')} aria-label=${user ? 'Tu cuenta' : 'Iniciar sesión'} aria-expanded=${menu} onClick=${() => (user ? setMenu(!menu) : setModal({ mode: 'login', step: 'email' }))}>${user ? user.name.charAt(0).toUpperCase() : ''}</button>
      ${menu && user && html`<div className="menu" role="menu" onMouseLeave=${() => setMenu(false)}>
        <div style=${{ padding: '10px 12px 12px' }}><b style=${{ fontWeight: 600 }}>${user.name}</b><div className="cap muted">${user.email}${user.guest ? ' · invitado' : ''}</div></div>
        <button className="menu-item" role="menuitem" onClick=${() => { setMenu(false); go('reservas'); }}>Mis reservas</button>
        <button className="menu-item" role="menuitem" onClick=${() => { setMenu(false); setModal({ mode: 'plan', step: 'plan' }); }}>Mi plan de vuelo</button>
        <button className="menu-item" role="menuitem" onClick=${() => { setMenu(false); setUser(null); notify('Sesión cerrada'); }}>Cerrar sesión</button>
      </div>`}
    </div>`;
    return html`
      <header className=${'appbar' + (scrolled ? ' scrolled' : '')}><div className="wrap">
        <nav className="nav" aria-label="Principal">
          <div><${Logo} /></div>
          <div className="nav-links">${link('salas', 'Salas')}${link('cafe', 'Café')}</div>
          <div className="nav-right">${checkoutBtn()}<button className="btn btn-secondary btn-s" onClick=${() => go('reservas')}>Mis reservas</button>${themeBtn}${avatarBtn}</div>
        </nav>
        <div className="topbar"><${Logo} /><div className="right">${checkoutBtn()}${themeBtn}${avatarBtn}</div></div>
      </div></header>`;
  }
  function TabBar({ ctx }) {
    const { route, go } = ctx;
    const section = route.name === 'sala' ? 'salas' : route.name === 'producto' ? 'cafe' : route.name;
    const T = window.NAVE_TABS;
    const item = (id, label, ico) => html`<button key=${id} onClick=${() => go(id)} aria-current=${section === id ? 'page' : undefined}><span className="ti" aria-hidden="true" dangerouslySetInnerHTML=${{ __html: T[ico] }}></span>${label}</button>`;
    return html`<nav className="tabbar" aria-label="Secciones">${item('inicio', 'Inicio', 'inicio')}${item('salas', 'Salas', 'sala')}${item('cafe', 'Café', 'cafe')}${item('reservas', 'Reservas', 'horario')}</nav>`;
  }

  /* ---------- Inicio: reloj, próxima salida y tablero ---------- */
  function Inicio({ ctx }) {
    const { go, clock, plan, nextToday, setModal, user } = ctx;
    const [tab, setTab] = useState('todo');
    const [alt, setAlt] = useState(0);
    const rows = BOARD.filter((r) => tab === 'todo' || r.cat === tab);
    const [h, m] = clock.label.split(':');

    let card;
    if (nextToday) {
      const r = roomById[nextToday.room];
      const diff = nextToday.start * 60 - clock.minutes;
      const when = diff > 0 ? 'en ' + (diff >= 60 ? Math.floor(diff / 60) + ' h ' + (diff % 60 ? (diff % 60) + ' min' : '') : diff + ' min') : 'en curso · hasta ' + hh(nextToday.start + nextToday.dur);
      card = html`<section className="dep mine" aria-label="Tu próxima salida">
        <${Trama} color="#fff5ee" opacity=${0.55} />
        <span className="eyebrow">Tu próxima salida · ${when}</span>
        <h2>${r.name}</h2>
        <p>Hoy ${hh(nextToday.start)} – ${hh(nextToday.start + nextToday.dur)} · ${r.capLabel}</p>
        <div className="code-box"><small>Código de acceso</small><b>${nextToday.code} #</b></div>
        <div className="row"><button className="btn btn-ink" onClick=${() => ctx.notify('Puerta de ' + r.name + ' abierta')}>Abrir puerta</button>
        <button className="btn btn-inverse" onClick=${() => { ctx.setDelivery('sala'); go('cafe'); }}>Pedir café a la sala</button></div>
      </section>`;
    } else {
      const fit = plan ? suggestFor(plan) : null;
      const options = fit ? [fit, 'ctl2', 'gar', 'ctl4'].filter((v, i, a) => a.indexOf(v) === i) : ['ctl2', 'gar', 'ctl4', 'ctl1'];
      const r = roomById[options[alt % options.length]];
      const until = r.event ? 'Sáb 25 desde 09:00' : 'Libre de ' + hh(Math.max(14, r.freeFrom)) + ' a 18:00';
      card = html`<section className="dep" aria-label="Próxima salida">
        <${Trama} />
        ${plan && html`<button className="dep-chip" onClick=${() => setModal({ mode: 'plan', step: 'plan' })} aria-label="Editar tu plan de vuelo">${planLabel(plan)} <span aria-hidden="true">✎</span></button>`}
        <span className="eyebrow">${plan ? 'Disponible para ti' : r.freeFrom <= 14 ? 'Disponible ahora' : 'Próxima salida'}</span>
        <h2 className="fade-in" key=${r.id}>${r.name}</h2>
        <p>${until} · ${plan ? 'ideal para tu ' + (plan.vengo === 'Grabar' ? 'grabación' : plan.vengo === 'Un evento' ? 'evento' : plan.vengo === 'Dar un taller' ? 'taller' : 'reunión') : 'hasta ' + r.capLabel}</p>
        <div className="row"><button className="btn btn-primary" onClick=${() => go('sala', r.id)}>Reservar ${r.name}</button>
        <button className="link" onClick=${() => setAlt(alt + 1)}>Otra opción <span aria-hidden="true">→</span></button></div>
        ${!plan && !user && html`<button className="link" style=${{ marginTop: 18 }} onClick=${() => setModal({ mode: 'plan', step: 'plan' })}>¿A qué vienes? Cuéntanos y te mostramos primero lo que te sirve.</button>`}
      </section>`;
    }

    return html`<main className="page wrap" id="main">
      <div className="home">
        <div>
          <div className="clock" aria-label=${'Son las ' + clock.label}>${h}<span className="colon">:</span>${m}</div>
          <div className="clock-sub">Jueves 16 oct · 23 °C · Wi-Fi 300 Mbps</div>
          ${card}
        </div>
        <div>
          <div className="tabs" role="tablist" aria-label="Filtrar tablero">
            ${[['todo', 'Todo'], ['salas', 'Salas'], ['cafe', 'Café']].map(([id, l]) => html`<button key=${id} role="tab" className="tab" aria-selected=${tab === id} onClick=${() => setTab(id)}>${l}</button>`)}
          </div>
          <${Board} rows=${rows} ctx=${ctx} label=${clock.label} />
        </div>
      </div>
    </main>`;
  }
  function suggestFor(p) {
    if (p.vengo === 'Grabar') return 'cab';
    if (p.vengo === 'Un evento' || p.somos === '20+') return 'hng';
    if (p.somos === '9–20' || p.vengo === 'Dar un taller') return 'hng';
    if (p.somos === '1' || p.somos === '2–4') return 'ctl1';
    return 'ctl2';
  }
  const planLabel = (p) => [{ Reunirme: 'Reunión', 'Dar un taller': 'Taller', Grabar: 'Grabación', 'Un evento': 'Evento', 'Solo café': 'Café' }[p.vengo] || 'Reunión', p.somos ? p.somos + (p.somos === '1' ? ' persona' : ' personas') : null, 'hoy'].filter(Boolean).join(' · ');

  function Board({ rows, ctx, label }) {
    const { go, nextToday } = ctx;
    const open = (r) => (r.id === 'bar' ? go('cafe') : go('sala', r.id));
    return html`<section className="board" aria-label="Tablero de salidas">
      <div className="board-head"><span className="t"><span className="long">Salidas · Espacios de hoy</span><span className="short">Salidas · Hoy</span></span><span><span className="long">Actualizado </span>${label}</span></div>
      <div className="board-cols" aria-hidden="true"><span style=${{ paddingLeft: 24 }}>Código</span><span>Espacio</span><span>Horas libres</span><span>Disponible</span><span></span></div>
      ${rows.map((r, i) => html`<div key=${r.id} className=${'frow' + (nextToday && nextToday.room === r.id ? ' yours' : '')} role="button" tabIndex="0"
          aria-label=${r.name + ', ' + r.st + ' ' + r.hint} onClick=${() => open(r)} onKeyDown=${(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open(r))}>
        <div className="code"><${Flap} text=${r.code} delay=${i * 90} /></div>
        <div style=${{ minWidth: 0 }}>
          <div className="name"><em className="mcode">${r.code}</em><${Flap} text=${r.name.toUpperCase()} delay=${i * 90 + 60} /></div>
          <div className="sub">${r.sub}</div>
          <div className="mst"><b className=${'st-' + r.stc}>${r.st.toUpperCase()}</b>${r.hint}</div>
        </div>
        <${Meter} level=${r.level} />
        <div className="st"><b className=${'st-' + r.stc}><${Flap} text=${r.st.toUpperCase()} delay=${i * 90 + 120} /></b><small>${r.hint}</small></div>
        <div className="act"><button className=${'btn btn-s ' + (r.primary ? 'btn-primary' : 'btn-inverse')} onClick=${(e) => { e.stopPropagation(); open(r); }}>${r.act}</button></div>
      </div>`)}
      <div className="legend"><span><i style=${{ background: 'var(--board-ink)' }}></i>Hora libre</span><span><i style=${{ background: 'var(--board-off)' }}></i>Ocupada</span><span className="hint">Toca un espacio para ver horarios y reservar</span></div>
    </section>`;
  }

  /* ---------- Salas ---------- */
  const FILTERS = [
    ['todas', 'Todas', () => true], ['libres', 'Libres ahora', (r) => r.freeFrom <= 14], ['4', 'Hasta 4', (r) => r.cap <= 4],
    ['58', '5 a 8', (r) => r.cap >= 5 && r.cap <= 8], ['grab', 'Grabación', (r) => r.tag === 'grabacion'], ['ev', 'Eventos', (r) => r.event],
  ];
  const roomStatus = (r) => (r.event ? 'Libre mañana' : r.freeFrom <= 14 ? 'Libre ahora' : 'Libre ' + hh(r.freeFrom));
  function Salas({ ctx }) {
    const [f, setF] = useState('todas');
    const fn = FILTERS.find((x) => x[0] === f)[2];
    const list = ROOMS.filter(fn);
    return html`<main className="page wrap" id="main">
      <div className="page-head"><span className="eyebrow">Salas · 8 espacios · 3 a 46 personas</span><h1 className="h-xl">Salas</h1>
      <p className="body-l muted" style=${{ margin: 0 }}>8 espacios en Nave, de 3 a 46 personas. El Hangar se arma para reuniones grandes o eventos.</p></div>
      <div className="chips filters" role="group" aria-label="Filtrar salas">${FILTERS.map(([id, l]) => html`<button key=${id} className="chip" aria-pressed=${f === id} onClick=${() => setF(id)}>${l}</button>`)}</div>
      ${list.length ? html`<div className="rooms">${list.map((r) => html`<${RoomCard} key=${r.id} r=${r} ctx=${ctx} />`)}</div>`
        : html`<div className="empty"><b>Ninguna sala coincide</b><span className="muted">Prueba con otro filtro.</span><button className="btn btn-secondary btn-s" onClick=${() => setF('todas')}>Ver todas</button></div>`}
    </main>`;
  }
  function RoomCard({ r, ctx }) {
    const now = r.freeFrom <= 14;
    const open = () => ctx.go('sala', r.id);
    return html`<article className="room">
      <div className="room-img" onClick=${open}><img src=${r.gallery[0]} alt=${r.name} loading="lazy" style=${{ objectPosition: r.pos || 'center' }} />
        <span className="badge"><${Emblem} code=${r.em} />${r.code}</span></div>
      <div className="room-body">
        <span className="mcode">${r.code}</span>
        <div className="top"><h3><a href=${'#sala-' + r.id} style=${{ textDecoration: 'none' }}>${r.name}</a></h3><span className="data">${r.capLabel}</span></div>
        <div className="muted desc">${r.desc}</div>
        <div className="foot"><span className=${'status ' + (now ? 'now' : '')}>${roomStatus(r)}</span>
          <button className=${'btn btn-s ' + (now ? 'btn-primary' : 'btn-secondary')} onClick=${open}>Reservar</button></div>
      </div>
      <button className=${'btn btn-s mobile-act ' + (now ? 'btn-primary' : 'btn-secondary')} style=${{ marginLeft: 'auto' }} onClick=${open}>Reservar</button>
    </article>`;
  }

  /* ---------- Detalle de sala ---------- */
  const PLAN_CHIPS = ['ctl1', 'ctl2', 'ctl3', 'ctl4', 'ctl5', 'cab', 'gar', 'hng', 'cub', 'bar'];
  function SalaDetalle({ ctx }) {
    const { route, go, addToCart, cart, notify } = ctx;
    const r = roomById[route.param] || roomById.ctl2;
    const editing = cart.find((i) => i.kind === 'sala' && i.room === r.id);
    const [photo, setPhoto] = useState(0);
    const [day, setDay] = useState(editing ? editing.dayId : r.event ? 'sab25' : 'hoy');
    const [moreDays, setMoreDays] = useState(r.event || (editing && MORE_DAYS.some((d) => d.id === editing.dayId)));
    const [montaje, setMontaje] = useState(editing ? editing.montaje || 'auditorio' : 'auditorio');
    const durs = r.event ? [[2, '2 h'], [4, '4 h'], [8, 'Día completo']] : [[1, '1 h'], [2, '2 h'], [3, '3 h'], [4, 'Medio día']];
    const today = day === 'hoy';
    const nowH = Math.floor(ctx.clock.minutes / 60);
    const slots = [9, 10, 11, 14, 15, 16, 17];
    const slotOk = (h) => !(today && (h < nowH || h < r.freeFrom));
    const firstOk = slots.find(slotOk);
    const [start, setStart] = useState(editing ? editing.start : (r.event ? 9 : (firstOk || 14)));
    const [dur, setDur] = useState(editing ? editing.dur : r.event ? 4 : 2);
    const startValid = slotOk(start);
    const durOk = (d) => start + d <= 20;
    const price = r.rate * dur;
    const dObj = allDays.find((d) => d.id === day);
    const dayIdx = allDays.indexOf(dObj);
    const range = hh(start) + ' – ' + hh(start + dur);
    const mont = MONTAJES.find((m) => m.id === montaje);

    useEffect(() => { if (!startValid && firstOk != null) setStart(firstOk); }, [day]);
    useEffect(() => { if (!durOk(dur)) setDur(durs.find(([d]) => durOk(d))[0]); }, [start]);

    const add = () => {
      if (!startValid) return;
      addToCart({ id: editing ? editing.id : newId(), kind: 'sala', room: r.id, roomName: r.name, dayId: day, dayIdx, dayLabel: dObj.long, start, dur, price,
        montaje: r.event ? montaje : null, detail: dObj.long + ' · ' + range + ' · ' + (r.event ? mont.name : r.capLabel) }, editing && editing.id);
      notify(r.name + (editing ? ' actualizada' : ' agregada al checkout'), { label: 'Ver checkout', fn: () => go('checkout') });
    };
    const planGo = (id) => { if (id === 'bar') go('cafe'); else if (id === 'cub') notify('La Cubierta es zona abierta: no necesita reserva'); else go('sala', id); };

    return html`<main className="page wrap" id="main">
      <div className="back"><a className="link" href="#salas">← Salas</a></div>
      <div className="detail">
        <div style=${{ minWidth: 0 }}>
          <div className="gallery">
            <div className="main"><img key=${photo} className="fade-in" src=${r.gallery[photo]} alt=${r.name + ', foto ' + (photo + 1)} style=${{ objectPosition: photo === 0 && r.pos ? r.pos : 'center' }} /></div>
            <div className="sides">${[0, 1, 2].filter((i) => i !== photo).slice(0, 2).map((i) => html`<button key=${i} className="side" onClick=${() => setPhoto(i % r.gallery.length)} aria-label=${'Ver foto ' + (i + 1)}><img src=${r.gallery[i % r.gallery.length]} alt="" loading="lazy" /></button>`)}</div>
          </div>
          ${r.gallery.length > 1 && html`<div className="gdots">${r.gallery.map((_, i) => html`<button key=${i} aria-label=${'Foto ' + (i + 1)} aria-current=${photo === i} onClick=${() => setPhoto(i)}></button>`)}</div>`}
          <div className="d-intro">
            <span className="eyebrow">${r.code} · ${r.kind}</span>
            <h1 className="h-xl">${r.name}</h1>
            <span className="body-l muted">${r.sub}</span>
          </div>
          <p className="body-l" style=${{ margin: 0, maxWidth: '68ch' }}>${r.long}</p>
          <div className="specs">${r.specs.map(([k, v]) => html`<div key=${k} className="spec"><small>${k}</small><span>${v}</span></div>`)}</div>
          <h2 className="h-m" style=${{ fontWeight: 500, fontSize: 20, letterSpacing: '-.01em' }}>Dónde está en Nave</h2>
          <div className="iso">
            <img src=${IMG.iso} alt="Planta isométrica de Nave" loading="lazy" />
            <span className="pin" style=${{ left: r.pin[0] + '%', top: r.pin[1] + '%' }} aria-hidden="true"></span>
            <span className="lbl">Vista 3D · ubicación en la planta</span>
            <div className="bottom">
              <div className="chips">${PLAN_CHIPS.map((id) => html`<button key=${id} className="plan-chip" aria-current=${id === r.id} onClick=${() => planGo(id)}>${id === 'cub' ? 'CUB' : id === 'bar' ? 'BAR' : roomById[id].code}</button>`)}</div>
              <span className="cap muted">Estás aquí: ${r.where}</span>
            </div>
          </div>
        </div>

        <aside className="panel" aria-label=${'Reservar ' + r.name}>
          <h2 className="h-m">Reservar ${r.event ? 'el ' : ''}${r.name}</h2>
          ${r.event && html`<div className="group"><div className="group-h"><h3>Montaje</h3></div>
            <div style=${{ display: 'grid', gap: 12 }} role="radiogroup" aria-label="Montaje">${MONTAJES.map((m) => html`<button key=${m.id} className="option" role="radio" aria-checked=${montaje === m.id} onClick=${() => setMontaje(m.id)}>
              <span className="radio"></span><b className="mono">${m.name} · ${m.cap} personas</b><span className="d">${m.d}</span></button>`)}</div></div>`}
          <div className="group"><div className="group-h"><h3>Día</h3>${r.event && html`<small>Hoy: ocupado</small>`}</div>
            <div className="chips">${DAYS.map((d) => html`<button key=${d.id} className="chip" aria-pressed=${day === d.id} disabled=${r.event && d.id === 'hoy'} onClick=${() => setDay(d.id)}>${d.label}</button>`)}
              <button className="chip" aria-pressed=${MORE_DAYS.some((d) => d.id === day)} aria-expanded=${moreDays} onClick=${() => setMoreDays(!moreDays)}>${MORE_DAYS.some((d) => d.id === day) ? dObj.label : 'Otro'}</button></div>
            ${moreDays && html`<div className="chips">${MORE_DAYS.map((d) => html`<button key=${d.id} className="chip" aria-pressed=${day === d.id} onClick=${() => setDay(d.id)}>${d.label}</button>`)}</div>`}
          </div>
          <div className="group"><div className="group-h"><h3>Hora de inicio</h3>${today && r.freeFrom > 14 && html`<small>Libre desde ${hh(r.freeFrom)}</small>`}</div>
            <div className="chips">${slots.map((h) => html`<button key=${h} className="chip num" aria-pressed=${start === h} disabled=${!slotOk(h)} onClick=${() => setStart(h)}>${hh(h)}</button>`)}</div></div>
          <div className="group"><div className="group-h"><h3>Duración</h3><small>${money(r.rate)} por hora</small></div>
            <div className="chips">${durs.map(([d, l]) => html`<button key=${d} className="chip" aria-pressed=${dur === d} disabled=${!durOk(d)} onClick=${() => setDur(d)}>${l}</button>`)}</div></div>
          <div className="price-row"><div><div>${dObj.long} · ${range}</div><div className="data">${dur} h × ${money(r.rate)}${r.event ? ' · ' + mont.name : ''}</div></div><span className="big num">${money(price)}</span></div>
          <button className="btn btn-primary btn-block" disabled=${!startValid} onClick=${add}>${editing ? 'Actualizar en el checkout' : 'Agregar al checkout'}</button>
        </aside>
      </div>
      <div className="mbar"><div><div className="data">${dObj.long} · ${range}</div><b className="num">${money(price)}</b></div><button className="btn btn-primary" disabled=${!startValid} onClick=${add}>${editing ? 'Actualizar' : 'Agregar'}</button></div>
    </main>`;
  }

  /* ---------- Café: la bitácora ---------- */
  function Cafe({ ctx }) {
    const { go, addToCart, notify, delivery, setDelivery } = ctx;
    useEffect(() => sessionSet('editCafe', null), []);
    const quickAdd = (p) => {
      if (!p.food) { go('producto', p.id); return; }
      addToCart({ id: newId(), kind: 'cafe', product: p.id, name: p.name, opts: {}, qty: 1, price: p.price, detail: cafeDetail(p, {}) });
      notify(p.name + ' agregada al checkout', { label: 'Ver checkout', fn: () => go('checkout') });
    };
    return html`<main className="page wrap" id="main">
      <div className="page-head"><span className="eyebrow">La Barra · Bitácora a bordo</span><h1 className="h-xl">Café</h1>
        <p className="body-l muted" style=${{ margin: 0 }}>Combustible, órbita lenta y provisiones. Ven cuando quieras, sin reservar.</p></div>
      <div className="co cafe-grid">
        <section style=${{ border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: 'clamp(24px,4vw,48px)', background: 'var(--surface)' }}>
          <span className="eyebrow">Bitácora de a bordo</span>
          <h2 className="h-l" style=${{ margin: '6px 0 28px' }}>Menú</h2>
          ${MENU.map((s) => html`<div key=${s.sec} style=${{ marginBottom: 36 }}>
            <div className="eyebrow" style=${{ marginBottom: 10 }}>${s.sec}</div>
            ${s.items.map((p) => html`<div key=${p.id} style=${{ display: 'grid', gridTemplateColumns: 'auto 1fr auto 40px', gap: 14, alignItems: 'center', padding: '10px 0' }}>
              <a href=${'#producto-' + p.id} style=${{ textDecoration: 'none' }}><div style=${{ fontWeight: 500, fontSize: 17, letterSpacing: '-.01em' }}>${p.full || p.name}</div>${p.note && html`<div className="data" style=${{ textTransform: 'none' }}>${p.note}</div>`}</a>
              <span aria-hidden="true" style=${{ borderBottom: '1.5px dotted var(--ink-subtle)', opacity: 0.6, transform: 'translateY(4px)' }}></span>
              <span className="data num" style=${{ fontSize: 13 }}>${p.price.toFixed(2)}</span>
              <button className="btn btn-ink" style=${{ height: 30, width: 40, padding: 0, fontSize: 16 }} aria-label=${(p.food ? 'Agregar ' : 'Personalizar ') + p.name} onClick=${() => quickAdd(p)}>+</button>
            </div>`)}
          </div>`)}
          <div style=${{ borderTop: '1px solid var(--line)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}><span className="data">PRECIOS EN USD</span><span className="data">WI-FI: PREGUNTA EN BARRA</span></div>
        </section>
        <aside style=${{ display: 'grid', gap: 24, alignContent: 'start' }}>
          <div style=${{ background: '#012436', color: '#fff5ee', borderRadius: 'var(--r-md)', padding: 32, display: 'grid', gap: 0 }}>
            <${Trama} rows=${12} />
            <span className="eyebrow" style=${{ color: 'var(--amber)', marginTop: 28 }}>La Barra · Abierta</span>
            <h2 className="h-l" style=${{ color: '#fff5ee', margin: '14px 0 16px' }}>Primero el café.</h2>
            <p style=${{ margin: '0 0 20px', fontSize: 16 }}>No necesitas reservar para venir. Si estás en una sala, te lo llevamos.</p>
            <div className="chips">
              <button className="chip" style=${chipDark(delivery !== 'sala')} aria-pressed=${delivery !== 'sala'} onClick=${() => setDelivery('llevar')}>Para llevar</button>
              <button className="chip" style=${chipDark(delivery === 'sala')} aria-pressed=${delivery === 'sala'} onClick=${() => setDelivery('sala')}>A mi sala</button>
            </div>
            <span className="data" style=${{ color: '#a7bcc2', marginTop: 28 }}>CAFÉ DEL DÍA · PACAMARA · APANECA-ILAMATEPEC</span>
          </div>
          <img src=${IMG.barra} alt="La Barra de Nave Café" loading="lazy" style=${{ borderRadius: 'var(--r-md)', width: '100%', aspectRatio: '16/10', objectFit: 'cover' }} />
        </aside>
      </div>
    </main>`;
  }
  const chipDark = (on) => (on ? { background: '#fff5ee', color: '#012436', borderColor: '#fff5ee' } : { borderColor: 'rgba(255,245,238,.5)', color: '#fff5ee', background: 'transparent' });

  /* ---------- Detalle de producto ---------- */
  function Producto({ ctx }) {
    const { route, go, addToCart, notify, cart } = ctx;
    const p = productById[route.param] || productById.orbita;
    const editId = sessionGet('editCafe');
    const editing = editId && cart.find((i) => i.id === editId && i.product === p.id);
    const def = { size: p.sizes === false || p.food ? null : '12 oz', shots: p.shots || 0, milk: p.milk ? (p.id === 'orbita' ? 'Avena' : 'Entera') : null,
      sweet: p.food ? null : (p.id === 'orbita' ? 'Azúcar' : 'Sin azúcar'), sweetN: 1, temp: p.food ? null : p.cold ? 'Con hielo' : 'Caliente', notes: '' };
    const [o, setO] = useState(editing ? editing.opts : def);
    const [qty, setQty] = useState(editing ? editing.qty : 1);
    const set = (k, v) => setO({ ...o, [k]: v });
    const unit = priceOf(p, o);
    const opt = (k, list) => html`<div className="chips">${list.map(([v, extra]) => html`<button key=${v} className="chip" aria-pressed=${o[k] === v} onClick=${() => set(k, v)}>${v}${extra && html`<span className="extra">${extra}</span>`}</button>`)}</div>`;
    const add = () => {
      addToCart({ id: editing ? editing.id : newId(), kind: 'cafe', product: p.id, name: p.name, opts: o, qty, price: unit, detail: cafeDetail(p, o) }, editing && editing.id);
      sessionSet('editCafe', null);
      notify(p.name + (editing ? ' actualizada' : ' agregada al checkout'), { label: 'Ver checkout', fn: () => go('checkout') });
      if (editing) go('checkout');
    };
    return html`<main className="page wrap" id="main">
      <div className="back"><a className="link" href="#cafe">← Café · ${p.sec.split(' · ')[1]}</a></div>
      <div className="product">
        <div className="ph"><img src=${productImg(p)} alt=${p.name} /></div>
        <div style=${{ display: 'grid', gap: 32, minWidth: 0 }}>
          <div style=${{ display: 'grid', gap: 10 }}>
            <span className="eyebrow">${p.sec}</span>
            <h1 className="h-xl">${p.name}</h1>
            <span className="body-l muted">${p.long || p.note || ''}</span>
            <b style=${{ fontSize: 17, fontWeight: 600 }}>Desde ${money(p.price)}</b>
          </div>
          ${o.size && html`<div className="group"><div className="group-h"><h3>Tamaño</h3><small>Obligatorio</small></div>${opt('size', [['8 oz'], ['12 oz'], ['16 oz', '+$0.50']])}</div>`}
          ${p.shots > 0 && html`<div className="group"><div className="group-h"><h3>Shots de espresso</h3><small>+$0.75 por shot extra</small></div>
            <${Stepper} value=${o.shots} min=${1} max=${4} onChange=${(v) => set('shots', v)} label="shots" /></div>`}
          ${o.milk && html`<div className="group"><div className="group-h"><h3>Leche</h3><small>Obligatorio</small></div>${opt('milk', [['Entera'], ['Deslactosada'], ['Avena', '+$0.50'], ['Almendra', '+$0.50'], ['Sin leche']])}</div>`}
          ${o.sweet && html`<div className="group"><div className="group-h"><h3>Endulzante</h3><small>Sobres</small></div>${opt('sweet', [['Sin azúcar'], ['Azúcar'], ['Mascabado'], ['Stevia']])}
            ${o.sweet !== 'Sin azúcar' && html`<${Stepper} value=${o.sweetN} min=${1} max=${4} onChange=${(v) => set('sweetN', v)} label="sobres" />`}</div>`}
          ${o.temp && !p.cold && html`<div className="group"><div className="group-h"><h3>Temperatura</h3></div>${opt('temp', [['Caliente'], ['Tibio'], ['Con hielo']])}</div>`}
          <div className="group"><div className="group-h"><h3>Notas</h3></div>
            <div className="field"><label htmlFor="notas">${p.food ? 'Para la cocina (opcional)' : 'Para el barista (opcional)'}</label>
            <input id="notas" className="input" placeholder=${p.food ? 'Ej. sin curtido' : 'Ej. extra espuma'} value=${o.notes} onInput=${(e) => set('notes', e.target.value)} /></div></div>
          <div className="cta-row"><${Stepper} value=${qty} min=${1} max=${12} onChange=${setQty} label="cantidad" />
            <button className="btn btn-primary" onClick=${add}>${editing ? 'Actualizar' : 'Agregar al checkout'} · ${money(unit * qty)}</button></div>
        </div>
      </div>
      <div className="mbar"><${Stepper} value=${qty} min=${1} max=${12} onChange=${setQty} label="cantidad" /><button className="btn btn-primary" style=${{ flex: 1 }} onClick=${add}>${editing ? 'Actualizar' : 'Agregar'} · ${money(unit * qty)}</button></div>
    </main>`;
  }
  let SESSION = {};
  const sessionGet = (k) => SESSION[k];
  const sessionSet = (k, v) => { SESSION[k] = v; };
  function Stepper({ value, min, max, onChange, label }) {
    return html`<div className="stepper" role="group" aria-label=${label}>
      <button onClick=${() => onChange(Math.max(min, value - 1))} disabled=${value <= min} aria-label=${'Menos ' + label}>–</button>
      <output aria-live="polite">${value}</output>
      <button onClick=${() => onChange(Math.min(max, value + 1))} disabled=${value >= max} aria-label=${'Más ' + label}>+</button></div>`;
  }

  /* ---------- Checkout ---------- */
  function Summary({ cart, children, deposit }) {
    const t = totals(cart);
    return html`<aside className="summary" aria-label="Resumen">
      <h2 className="h-m" style=${{ fontWeight: 500 }}>Resumen</h2>
      ${t.rooms.map((r) => html`<div key=${r.id} className="srow"><span>${r.roomName} · ${r.dur} h</span><span>${money(r.price)}</span></div>`)}
      ${t.cafeQty > 0 && html`<div className="srow"><span>Café · ${t.cafeQty} ${t.cafeQty === 1 ? 'producto' : 'productos'}</span><span>${money(t.cafeSum)}</span></div>`}
      <div className="srow"><span>IVA 13%</span><span>${money(t.iva)}</span></div>
      <div className="srow total"><span>Total</span><b>${money(t.total)}</b></div>
      ${deposit && t.rooms.length > 0 && html`<p className="note" style=${{ fontFamily: 'var(--f-sans)', fontSize: 12 }}>Depósito de garantía de $50 retenido por la sala; se libera 48 h después.</p>`}
      ${children}
    </aside>`;
  }
  function Checkout({ ctx }) {
    const { cart, go, removeFromCart, user, setModal, delivery, setDelivery, nextToday } = ctx;
    const t = totals(cart);
    const roomForCafe = t.rooms[0] || (nextToday && { roomName: roomById[nextToday.room].name, start: nextToday.start });
    const dv = delivery === 'auto' ? (roomForCafe ? 'sala' : 'ya') : (delivery === 'llevar' ? 'ya' : delivery);
    const [when, setWhen] = useState(15);
    const proceed = () => { if (!user) setModal({ mode: 'checkout', step: 'choose' }); else go('pago'); };
    if (!cart.length) {
      return html`<main className="page wrap" id="main">
        <div className="page-head"><span className="eyebrow">Checkout</span><h1 className="h-xl">Checkout</h1></div>
        <div className="empty" style=${{ maxWidth: 640 }}><${Trama} rows=${5} /><b className="h-m">Tu checkout está vacío</b>
          <span className="muted">Reserva una sala o pide algo de la barra. Todo se paga junto aquí.</span>
          <div className="row" style=${{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}><button className="btn btn-primary" onClick=${() => go('salas')}>Ver salas</button><button className="btn btn-secondary" onClick=${() => go('cafe')}>Ver café</button></div></div>
      </main>`;
    }
    const editCafe = (i) => { sessionSet('editCafe', i.id); go('producto', i.product); };
    return html`<main className="page wrap" id="main">
      <div className="page-head"><span className="eyebrow">Checkout · Paso 1 de 3</span><h1 className="h-xl">Checkout</h1></div>
      <div className="co">
        <div style=${{ minWidth: 0 }}>
          ${t.rooms.length > 0 && html`<section><div className="sec-h"><h2 className="h-m" style=${{ fontWeight: 500 }}>Reserva</h2><a className="link" href="#salas">+ Otra sala</a></div>
            ${t.rooms.map((i) => html`<div key=${i.id} className="line"><div className="thumb"><img src=${roomById[i.room].gallery[0]} alt="" style=${{ objectPosition: roomById[i.room].pos || 'center' }} /></div>
              <div style=${{ minWidth: 0 }}><div className="t">${i.roomName}</div><div className="data">${i.detail}</div></div>
              <div className="r"><b>${money(i.price)}</b><div className="acts"><button className="link" onClick=${() => go('sala', i.room)}>Cambiar</button><button className="link" onClick=${() => removeFromCart(i.id)}>Quitar</button></div></div></div>`)}
          </section>`}
          <section><div className="sec-h"><h2 className="h-m" style=${{ fontWeight: 500 }}>Café</h2><a className="link" href="#cafe">+ Agregar ${t.cafe.length ? 'más' : 'café'}</a></div>
            ${t.cafe.length ? t.cafe.map((i) => { const p = productById[i.product]; return html`<div key=${i.id} className="line"><div className="thumb"><img src=${productImg(p)} alt="" /></div>
              <div style=${{ minWidth: 0 }}><div className="t">${i.name}${i.qty > 1 ? ' × ' + i.qty : ''}</div><div className="data">${i.detail}</div></div>
              <div className="r"><b>${money(i.price * i.qty)}</b><div className="acts"><button className="link" onClick=${() => editCafe(i)}>Editar</button><button className="link" onClick=${() => removeFromCart(i.id)}>Quitar</button></div></div></div>`; })
              : html`<p className="muted" style=${{ margin: '8px 0 0' }}>¿Algo para la reunión? Te lo llevamos a la sala al iniciar.</p>`}
          </section>
          ${t.cafe.length > 0 && html`<section><h2 className="h-m" style=${{ fontWeight: 500, marginBottom: 16 }}>¿Cuándo y dónde tu café?</h2>
            <div className="chips">
              ${roomForCafe && html`<button className="chip" aria-pressed=${dv === 'sala'} onClick=${() => setDelivery('sala')}>A mi sala · al iniciar ${hh(roomForCafe.start)}</button>`}
              <button className="chip" aria-pressed=${dv === 'ya'} onClick=${() => setDelivery('ya')}>Para llevar · lo antes posible</button>
              <button className="chip" aria-pressed=${dv === 'prog'} onClick=${() => setDelivery('prog')}>Para llevar · programado</button>
            </div>
            ${dv === 'prog' && html`<div className="chips" style=${{ marginTop: 12 }}>${[14.5, 15, 15.5, 16].map((h) => html`<button key=${h} className="chip num" aria-pressed=${when === h} onClick=${() => setWhen(h)}>${hh(h)}</button>`)}</div>`}
          </section>`}
        </div>
        <${Summary} cart=${cart}>
          ${!user && html`<p className="note">Al ser tu primera reserva te pediremos iniciar sesión o seguir como invitado.</p>`}
          <button className="btn btn-primary btn-block" style=${{ marginTop: user ? 20 : 0 }} onClick=${proceed}>Continuar al pago</button>
        <//>
      </div>
    </main>`;
  }

  /* ---------- Onboarding (solo en la primera reserva) ---------- */
  function Onboarding({ ctx, modal, close }) {
    const { cart, go, setUser, setPlan, plan, notify, setBookings, user } = ctx;
    const [step, setStep] = useState(modal.step);
    const [choice, setChoice] = useState('login');
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [secs, setSecs] = useState(42);
    const [guest, setGuest] = useState({ name: '', email: '', phone: '', account: false });
    const [p, setP] = useState(plan || { vengo: 'Reunirme', somos: '5–8', suelo: 'Entre semana' });
    const refs = useRef([]);
    const t = totals(cart);
    const firstRoom = t.rooms[0];
    const sheetRef = useRef(null);

    useEffect(() => {
      const onKey = (e) => { if (e.key === 'Escape') close(); };
      document.addEventListener('keydown', onKey);
      const f = sheetRef.current && sheetRef.current.querySelector('input,button');
      f && f.focus();
      return () => document.removeEventListener('keydown', onKey);
    }, [step]);
    useEffect(() => { if (step !== 'code' || secs <= 0) return; const id = setTimeout(() => setSecs(secs - 1), 1000); return () => clearTimeout(id); }, [step, secs]);

    const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const nameFrom = (mail) => { const s = mail.split('@')[0].split(/[._\-0-9]/)[0] || 'Viajero'; return s.charAt(0).toUpperCase() + s.slice(1); };
    const finish = () => { close(); if (modal.mode === 'checkout') go('pago'); };

    const mini = modal.mode === 'checkout' && html`<div className="mini"><div><b>${cartTitle(cart)}</b>${firstRoom && html`<div className="cap muted">${firstRoom.dayLabel} ${hh(firstRoom.start)} – ${hh(firstRoom.start + firstRoom.dur)} · ${roomById[firstRoom.room].capLabel}</div>`}</div><b className="num">${money(t.total)}</b></div>`;

    let body;
    if (step === 'choose' || step === 'email') {
      const loginOnly = modal.mode === 'login';
      body = html`
        <h2 className="h-l">${loginOnly ? 'Inicia sesión' : 'Estás a un paso'}</h2>
        <p className="lead">${loginOnly ? 'Te enviamos un código a tu correo. Sin contraseñas.' : 'Es tu primera reserva en Nave. ¿Cómo quieres seguir?'}</p>
        ${mini}
        ${!loginOnly && html`<div style=${{ display: 'grid', gap: 12 }} role="radiogroup" aria-label="Cómo seguir">
          <button className="option" role="radio" aria-checked=${choice === 'login'} onClick=${() => setChoice('login')}><span className="radio"></span><b>Iniciar sesión o crear cuenta</b><span className="d">Guardamos tus reservas, tu código de acceso y tu plan de vuelo para la próxima vez.</span></button>
          <button className="option" role="radio" aria-checked=${choice === 'guest'} onClick=${() => setChoice('guest')}><span className="radio"></span><b>Seguir como invitado</b><span className="d">Solo nombre, correo y teléfono. Te enviamos el código por correo.</span></button>
        </div>`}
        ${(loginOnly || choice === 'login') && html`<div className="field"><label htmlFor="ob-mail">Correo</label>
          <input id="ob-mail" type="email" autoComplete="email" className=${'input ' + (err ? 'err' : '')} placeholder="nombre@correo.com" value=${email} onInput=${(e) => { setEmail(e.target.value); setErr(''); }} />
          ${err && html`<span className="err-msg">${err}</span>`}</div>`}
        <div className="cta-row" style=${{ flexWrap: 'wrap' }}><button className="btn btn-primary" style=${{ flex: '0 0 auto' }} onClick=${() => {
          if (!loginOnly && choice === 'guest') { setStep('guest'); return; }
          if (!validEmail(email)) { setErr('Escribe un correo válido, por ejemplo nombre@correo.com.'); return; }
          setSecs(42); setStep('code');
        }}>Continuar</button><button className="link" onClick=${close}>${loginOnly ? 'Cancelar' : 'Volver al checkout'}</button></div>`;
    } else if (step === 'code') {
      const full = code.every((c) => c);
      const setDigit = (i, v) => {
        const d = v.replace(/\D/g, '');
        if (d.length > 1) { const arr = d.slice(0, 6).split(''); const next = [...code]; arr.forEach((c, j) => { if (i + j < 6) next[i + j] = c; }); setCode(next); refs.current[Math.min(5, i + arr.length)].focus(); return; }
        const next = [...code]; next[i] = d; setCode(next); setErr('');
        if (d && i < 5) refs.current[i + 1].focus();
      };
      body = html`
        <h2 className="h-l">Revisa tu correo</h2>
        <p className="lead">Enviamos un código de 6 dígitos a ${email}.</p>
        <div className="otp">${code.map((c, i) => html`<input key=${i} ref=${(el) => (refs.current[i] = el)} inputMode="numeric" autoComplete=${i === 0 ? 'one-time-code' : 'off'} aria-label=${'Dígito ' + (i + 1)} value=${c}
          onInput=${(e) => setDigit(i, e.target.value)} onKeyDown=${(e) => { if (e.key === 'Backspace' && !code[i] && i > 0) refs.current[i - 1].focus(); }} />`)}</div>
        <span className="cap muted">${secs > 0 ? '¿No llegó? Reenviar en 0:' + String(secs).padStart(2, '0') : html`¿No llegó? <button className="link" style=${{ display: 'inline' }} onClick=${() => { setSecs(42); notify('Código reenviado'); }}>Reenviar código</button>`}</span>
        ${err && html`<span className="err-msg">${err}</span>`}
        <span className="demo-hint">Prototipo: cualquier código de 6 dígitos funciona.</span>
        <div className="cta-row"><button className="btn btn-primary" style=${{ flex: '0 0 auto' }} onClick=${() => {
          if (!full) { setErr('Faltan dígitos del código.'); return; }
          const u = { name: nameFrom(email), email };
          setUser(u);
          // una cuenta existente trae historial de ejemplo
          setBookings((b) => (b.some((x) => x.sample) ? b : [...b,
            { id: 'sample-hng', sample: true, room: 'hng', roomName: 'Hangar', dayId: 'sab25', dayIdx: 5, dayLabel: 'Sáb 25', start: 9, dur: 4, price: 240, detail: 'Sáb 25 · 09:00 – 13:00 · Auditorio', code: '502117' },
            { id: 'sample-ctl3', sample: true, past: true, room: 'ctl3', roomName: 'Control 3', dayLabel: 'Jue 02 Oct', start: 10, dur: 2, price: 40, detail: 'Jue 02 Oct · depósito liberado' }]));
          if (modal.mode === 'login') { close(); notify('Hola, ' + u.name); return; }
          setStep('plan');
        }}>Confirmar</button><button className="link" onClick=${() => setStep(modal.mode === 'login' ? 'email' : 'choose')}>Cambiar correo</button></div>`;
    } else if (step === 'guest') {
      const ok = guest.name.trim() && validEmail(guest.email);
      body = html`
        <h2 className="h-l">Tus datos</h2>
        <p className="lead">Para enviarte el código de acceso y el recibo.</p>
        ${mini}
        <div className="field"><label htmlFor="g-name">Nombre</label><input id="g-name" className="input" autoComplete="name" placeholder="Nombre y apellido" value=${guest.name} onInput=${(e) => setGuest({ ...guest, name: e.target.value })} /></div>
        <div className="field"><label htmlFor="g-mail">Correo</label><input id="g-mail" type="email" autoComplete="email" className=${'input ' + (err && !validEmail(guest.email) ? 'err' : '')} placeholder="nombre@correo.com" value=${guest.email} onInput=${(e) => { setGuest({ ...guest, email: e.target.value }); setErr(''); }} /></div>
        <div className="field"><label htmlFor="g-tel">Teléfono</label><input id="g-tel" type="tel" autoComplete="tel" className="input" placeholder="+503 0000 0000" value=${guest.phone} onInput=${(e) => setGuest({ ...guest, phone: e.target.value })} /></div>
        <label className="check" htmlFor="g-acc"><input id="g-acc" type="checkbox" checked=${guest.account} onChange=${(e) => setGuest({ ...guest, account: e.target.checked })} />Crear una cuenta con estos datos (opcional)</label>
        ${err && html`<span className="err-msg">${err}</span>`}
        <div className="cta-row" style=${{ flexWrap: 'wrap' }}><button className="btn btn-primary" style=${{ flex: '0 0 auto' }} onClick=${() => {
          if (!ok) { setErr('Escribe tu nombre y un correo válido.'); return; }
          setUser({ name: guest.name.trim().split(' ')[0], email: guest.email, phone: guest.phone, guest: !guest.account });
          finish();
        }}>Continuar al pago</button><button className="link" onClick=${() => { setChoice('login'); setStep('choose'); }}>Iniciar sesión en vez</button></div>`;
    } else {
      const row = (k, label, opts) => html`<div className="group"><span className="cap muted">${label}</span><div className="chips">${opts.map((v) => html`<button key=${v} className="chip" aria-pressed=${p[k] === v} onClick=${() => setP({ ...p, [k]: v })}>${v}</button>`)}</div></div>`;
      body = html`
        <h2 className="h-l">Tu plan de vuelo</h2>
        <p className="lead">Opcional. Con esto te mostramos primero lo que te sirve.</p>
        ${row('vengo', 'Vengo a…', ['Reunirme', 'Dar un taller', 'Grabar', 'Un evento', 'Solo café'])}
        ${row('somos', 'Normalmente somos', ['1', '2–4', '5–8', '9–20', '20+'])}
        ${row('suelo', 'Suelo venir', ['Entre semana', 'Fines de semana', 'Cuando surge'])}
        <div className="cta-row" style=${{ flexWrap: 'wrap' }}><button className="btn btn-primary" style=${{ flex: '0 0 auto' }} onClick=${() => { setPlan(p); if (modal.mode === 'plan') { close(); notify('Plan de vuelo guardado'); go('inicio'); } else finish(); }}>${modal.mode === 'plan' ? 'Guardar plan' : 'Continuar al pago'}</button>
          <button className="link" onClick=${() => (modal.mode === 'plan' ? close() : finish())}>${modal.mode === 'plan' ? 'Cancelar' : 'Saltar'}</button></div>`;
    }
    return html`<div className="scrim" onMouseDown=${(e) => e.target === e.currentTarget && close()}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label="Primera reserva" ref=${sheetRef}>${body}</div></div>`;
  }

  /* ---------- Pago ---------- */
  function Pago({ ctx }) {
    const { cart, user, go, setCart, setBookings, setOrders, setLast, delivery, nextToday, setModal } = ctx;
    const saved = user && !user.guest;
    const [method, setMethod] = useState(saved ? 'visa' : 'nueva');
    const [card, setCard] = useState({ num: '', exp: '', cvc: '' });
    const [fact, setFact] = useState('cf');
    const [nrc, setNrc] = useState('');
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState('');
    const t = totals(cart);
    useEffect(() => { if (!cart.length) go('checkout'); else if (!user) setModal({ mode: 'checkout', step: 'choose' }); }, []);
    if (!cart.length) return null;
    const fmtNum = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    const fmtExp = (v) => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? d.slice(0, 2) + ' / ' + d.slice(2) : d; };
    const pay = () => {
      if (method === 'nueva' && (card.num.replace(/\s/g, '').length < 15 || card.exp.length < 7 || card.cvc.length < 3)) { setErr('Revisa el número de tarjeta, el vencimiento y el CVC.'); return; }
      if (fact === 'credito' && nrc.trim().length < 4) { setErr('Escribe tu NRC para emitir el crédito fiscal.'); return; }
      setErr(''); setBusy(true);
      setTimeout(() => {
        const code = String(100000 + Math.floor(Math.random() * 899999));
        const no = 2481 + Math.floor(Math.random() * 40);
        const roomItems = t.rooms.map((r) => ({ ...r, code, id: newId() }));
        const sala = t.rooms[0] || (nextToday && { roomName: roomById[nextToday.room].name, start: nextToday.start });
        const dv = delivery === 'auto' ? (sala ? 'sala' : 'ya') : delivery === 'llevar' ? 'ya' : delivery;
        const order = t.cafe.length ? { id: newId(), no, items: t.cafe.map((i) => ({ name: i.name, qty: i.qty })), price: t.cafeSum,
          where: dv === 'sala' && sala ? 'se entrega en ' + sala.roomName + ' a las ' + hh(sala.start) : dv === 'prog' ? 'para llevar · programado' : 'para llevar · lo antes posible',
          title: t.cafe.map((i) => i.name).join(' + ') } : null;
        setBookings((b) => [...roomItems, ...b]);
        if (order) setOrders((o) => [order, ...o]);
        setLast({ rooms: roomItems, order, total: t.total, email: user ? user.email : '', name: user ? user.name : '' });
        setCart([]);
        go('listo');
      }, 1400);
    };
    return html`<main className="page wrap" id="main">
      <div className="page-head"><span className="eyebrow">Pago · Paso 2 de 3</span><h1 className="h-xl">Pago</h1></div>
      <div className="co">
        <div style=${{ minWidth: 0 }}>
          <h2 className="h-m" style=${{ fontWeight: 500, marginBottom: 16 }}>Método de pago</h2>
          <div className="pay-opts" role="radiogroup" aria-label="Método de pago">
            ${saved && html`<button className="option" role="radio" aria-checked=${method === 'visa'} onClick=${() => setMethod('visa')}><span className="radio"></span><b>Visa ···· 4242</b><span className="d">Guardada en tu cuenta.</span></button>`}
            <button className="option" role="radio" aria-checked=${method === 'nueva'} onClick=${() => setMethod('nueva')}><span className="radio"></span><b>Nueva tarjeta</b><span className="d">Débito o crédito.</span></button>
            <button className="option" role="radio" aria-checked=${method === 'wallet'} onClick=${() => setMethod('wallet')}><span className="radio"></span><b>Apple Pay / Google Pay</b><span className="d">Paga con tu teléfono.</span></button>
          </div>
          ${method === 'nueva' && html`<div className="card-grid">
            <div className="field full"><label htmlFor="cc-num">Número de tarjeta</label><input id="cc-num" className="input num" inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" value=${card.num} onInput=${(e) => setCard({ ...card, num: fmtNum(e.target.value) })} /></div>
            <div className="field"><label htmlFor="cc-exp">Vencimiento</label><input id="cc-exp" className="input num" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / AA" value=${card.exp} onInput=${(e) => setCard({ ...card, exp: fmtExp(e.target.value) })} /></div>
            <div className="field"><label htmlFor="cc-cvc">CVC</label><input id="cc-cvc" className="input num" inputMode="numeric" autoComplete="cc-csc" placeholder="123" value=${card.cvc} onInput=${(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })} /></div>
            <span className="demo-hint full">Prototipo: usa cualquier número de prueba, no se cobra nada.</span>
          </div>`}
          <h2 className="h-m" style=${{ fontWeight: 500, margin: '40px 0 16px' }}>Factura</h2>
          <div className="chips"><button className="chip" aria-pressed=${fact === 'cf'} onClick=${() => setFact('cf')}>Consumidor final</button><button className="chip" aria-pressed=${fact === 'credito'} onClick=${() => setFact('credito')}>Crédito fiscal</button></div>
          ${fact === 'credito' && html`<div className="field" style=${{ marginTop: 16, maxWidth: 360 }}><label htmlFor="nrc">NRC</label><input id="nrc" className="input" placeholder="000000-0" value=${nrc} onInput=${(e) => setNrc(e.target.value)} /></div>`}
          ${err && html`<p className="err-msg" role="alert" style=${{ marginTop: 20, fontSize: 14 }}>${err}</p>`}
        </div>
        <${Summary} cart=${cart} deposit=${true}>
          <button className="btn btn-primary btn-block" disabled=${busy} onClick=${pay} style=${{ marginTop: 4 }}>${busy ? html`<span className="spin" aria-hidden="true"></span> Procesando…` : 'Pagar ' + money(t.total)}</button>
          <button className="link" style=${{ justifySelf: 'center', marginTop: 14 }} onClick=${() => go('checkout')}>← Volver al checkout</button>
        <//>
      </div>
    </main>`;
  }

  /* ---------- Listo ---------- */
  function Listo({ ctx }) {
    const { last, go, notify } = ctx;
    const [cal, setCal] = useState(false);
    if (!last) { setTimeout(() => go('inicio')); return null; }
    const r = last.rooms[0];
    const share = () => {
      const txt = r ? `Nave Café · ${r.roomName} · ${r.dayLabel} ${hh(r.start)} – ${hh(r.start + r.dur)} · Código ${r.code} #` : `Nave Café · pedido #${last.order.no}`;
      const done = () => notify('Detalles copiados para compartir');
      try { navigator.clipboard.writeText(txt).then(done, () => notify(txt)); } catch (e) { notify(txt); }
    };
    return html`<main className="page wrap" id="main">
      <div className="page-head" style=${{ marginBottom: 0 }}><span className="eyebrow">T-00 · Despegue confirmado</span><h1 className="h-xl">Todo listo${last.name ? ', ' + last.name : ''}</h1></div>
      ${r ? html`<section className="ticket">
        <span className="cap">Tu próxima salida · ${r.dayLabel.toLowerCase()} ${hh(r.start)}</span>
        <h2 className="h-xl">${r.roomName}</h2>
        <div className="code-box"><small>Código de acceso · activo desde ${hm(Math.round(r.start * 60) - 10)}</small><b>${r.code} #</b></div>
        <div className="row"><button className="btn btn-ink btn-s" onClick=${() => setCal(true)}>Añadir al calendario</button><button className="btn btn-inverse btn-s" onClick=${share}>Compartir</button></div>
        ${cal && html`<span className="inline-note">En el sitio real esto abre tu calendario con la reserva.</span>`}
        ${last.rooms.length > 1 && html`<span className="inline-note">También reservaste: ${last.rooms.slice(1).map((x) => x.roomName).join(', ')}.</span>`}
      </section>` : html`<section className="ticket"><span className="cap">Pedido #${last.order.no}</span><h2 className="h-xl">En la barra</h2><span>${last.order.where}</span></section>`}
      ${last.order && html`<section style=${{ marginTop: 48 }}><h2 className="h-m" style=${{ fontWeight: 500 }}>Tu pedido de café</h2>
        <div className="line"><div className="thumb"><img src=${IMG.vitrina} alt="" /></div><div style=${{ minWidth: 0 }}><div className="t">${last.order.title}</div><div className="cap muted">${cap(last.order.where)}</div></div>
        <div className="r"><b>#${last.order.no}</b><span className="cap muted">Recibido</span></div></div></section>`}
      <p className="muted" style=${{ margin: '32px 0' }}>${last.email ? 'Te enviamos el recibo y el código a ' + last.email + '.' : 'Guarda tu código: lo necesitas para abrir la sala.'}</p>
      <div style=${{ display: 'flex', gap: 16, flexWrap: 'wrap' }}><button className="btn btn-primary" onClick=${() => go('reservas')}>Ir a Mis reservas</button><button className="btn btn-secondary" onClick=${() => go('inicio')}>Volver al inicio</button></div>
    </main>`;
  }
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  /* ---------- Mis reservas ---------- */
  function Reservas({ ctx }) {
    const { bookings, orders, go, upcoming, nextToday, notify, setDelivery, user, setModal, clock } = ctx;
    const past = bookings.filter((b) => b.past);
    const next = nextToday || upcoming[0];
    const lineFor = (b, label) => { const r = roomById[b.room]; return html`<div key=${b.id} className="line"><div className="thumb"><img src=${r.gallery[0]} alt="" style=${{ objectPosition: r.pos || 'center' }} /></div>
      <div style=${{ minWidth: 0 }}><div className="t">${b.roomName}</div><div className="data">${b.detail}</div></div>
      <div className="r"><b>${money(b.price)}</b><button className="link" onClick=${() => (b.past ? notify('Recibo enviado a tu correo') : go('sala', b.room))}>${label}</button></div></div>`; };
    if (!bookings.length && !orders.length) {
      return html`<main className="page wrap" id="main">
        <div className="page-head"><span className="eyebrow">Bitácora · Mis reservas</span><h1 className="h-xl">Mis reservas</h1></div>
        <div className="empty" style=${{ maxWidth: 640 }}><${Trama} rows=${5} /><b className="h-m">Aún no tienes salidas</b>
          <span className="muted">Cuando reserves una sala o pidas café, aquí verás tu código de acceso y tus pedidos.</span>
          <div style=${{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}><button className="btn btn-primary" onClick=${() => go('salas')}>Ver salas</button>
          ${!user && html`<button className="btn btn-secondary" onClick=${() => setModal({ mode: 'login', step: 'email' })}>Iniciar sesión</button>`}</div></div>
      </main>`;
    }
    let when = '';
    if (next) {
      const diff = next.start * 60 - clock.minutes;
      when = next.dayId === 'hoy' ? (diff > 0 ? 'en ' + (diff >= 60 ? Math.floor(diff / 60) + ' h' : diff + ' min') : 'en curso') : next.dayLabel;
    }
    return html`<main className="page wrap" id="main">
      <div className="page-head"><span className="eyebrow">Bitácora · Mis reservas</span><h1 className="h-xl">Mis reservas</h1></div>
      <div className="res">
        ${next ? html`<section className="ticket">
          <${Trama} color="#fff5ee" opacity=${0.55} />
          <span className="eyebrow" style=${{ color: '#fff5ee', marginTop: 20 }}>Tu próxima salida · ${when}</span>
          <h2 className="h-xl">${next.roomName}</h2>
          <span>${next.dayLabel} ${hh(next.start)} – ${hh(next.start + next.dur)} · ${roomById[next.room].capLabel}</span>
          <div className="code-box"><small>Código de acceso</small><b>${next.code} #</b></div>
          <div className="row"><button className="btn btn-ink" onClick=${() => notify('Puerta de ' + next.roomName + ' abierta')}>Abrir puerta</button><button className="btn btn-inverse" onClick=${() => { setDelivery('sala'); go('cafe'); }}>Pedir café a la sala</button></div>
        </section>` : html`<div></div>`}
        <div style=${{ minWidth: 0, display: 'grid', gap: 48 }}>
          ${upcoming.length > 0 && html`<section><h2 className="h-m" style=${{ fontWeight: 500 }}>Próximas</h2>${upcoming.map((b) => lineFor(b, 'Ver'))}</section>`}
          ${orders.length > 0 && html`<section><h2 className="h-m" style=${{ fontWeight: 500 }}>Pedidos de café</h2>${orders.map((o) => html`<div key=${o.id} className="line"><div className="thumb"><img src=${IMG.vitrina} alt="" /></div>
            <div style=${{ minWidth: 0 }}><div className="t">${o.title}</div><div className="data">#${o.no} · ${o.where}</div></div><div className="r"><b>${money(o.price)}</b><span className="cap muted">Recibido</span></div></div>`)}</section>`}
          ${past.length > 0 && html`<section><h2 className="h-m" style=${{ fontWeight: 500 }}>Pasadas</h2>${past.map((b) => lineFor(b, 'Recibo'))}</section>`}
        </div>
      </div>
    </main>`;
  }

  ReactDOM.createRoot(document.getElementById('root')).render(html`<${App} />`);
})();
