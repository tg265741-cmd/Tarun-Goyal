/* ============================================================
   GOLENS — SHARED RUNTIME
   Navigation · mega menu · cart drawer · search · reveal engine ·
   micro-analytics (dataLayer-ready) · icon system
   ============================================================ */
(function () {
  'use strict';

  const G = window.GOLENS;
  const rm = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ---------- rupee formatting ---------- */
  const inr = n => '₹' + Number(n).toLocaleString('en-IN');
  window.Gfmt = { inr };

  /* ---------- analytics (GTM-ready, no fabrication) ---------- */
  window.dataLayer = window.dataLayer || [];
  const track = (event, params) => {
    window.dataLayer.push(Object.assign({ event, page: location.pathname }, params || {}));
    if (window.GOLENS_DEBUG) console.log('[event]', event, params || {});
  };
  window.Gtrack = track;
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-event]');
    if (el) track(el.dataset.event, JSON.parse(el.dataset.eventParams || '{}'));
  });

  /* ---------- ICON SPRITE (custom Golens line system) ---------- */
  const ICONS = {
    logo: '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 2 L29 7 v8c0 8-5.5 13.4-13 15C8.5 28.4 3 23 3 15V7z" stroke="currentColor" stroke-width="1.6"/><path d="M11 17h7a3 3 0 0 1 0 6h-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="18.5" cy="11.5" r="1.4" fill="currentColor"/></svg>',
    face: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" stroke-linecap="round"/><path d="M9 10v1.5M15 10v1.5M9.5 15c.8.8 3.2.8 5 0" stroke-linecap="round"/></svg>',
    fingerprint: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 4a8 8 0 0 1 8 8M12 7a5 5 0 0 1 5 5v3M12 10a2 2 0 0 1 2 2v5M9 12a3 3 0 0 1 1-2.2M7 12a5 5 0 0 1 2-4M4.5 13A8 8 0 0 1 7 6.2" stroke-linecap="round"/><path d="M7 17v-3M10 21v-6" stroke-linecap="round"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="4"/><path d="M11 11l9 9M17 17l2-2M14.5 14.5l2-2" stroke-linecap="round"/></svg>',
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18" /><circle cx="7.5" cy="14.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8.5 12.5h.01M12 12.5h.01M15.5 12.5h.01M8.5 16h.01M12 16h.01M15.5 16h.01" stroke-linecap="round" stroke-width="2"/></svg>',
    app: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 5.5h3M12 18.5h.01" stroke-linecap="round"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 9a13.5 13.5 0 0 1 18 0M6.5 12.5a8.5 8.5 0 0 1 11 0M10 16a4 4 0 0 1 4 0" stroke-linecap="round"/><circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none"/></svg>',
    bt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 2.5v19M12 12l6-4.5-6-5M12 12l6 4.5-6 5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 8h3l2-2.5h6L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.5"/></svg>',
    otp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9.5l3 2.5-3 2.5M12.5 15h4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    door: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 21V5.5A1.5 1.5 0 0 1 6.5 4h11A1.5 1.5 0 0 1 19 5.5V21M3 21h18" stroke-linecap="round"/><circle cx="15.2" cy="12.5" r="1.1" fill="currentColor" stroke="none"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3l7.5 3v6c0 4.6-3.2 7.7-7.5 8.9C7.7 19.7 4.5 16.6 4.5 12V6z" stroke-linejoin="round"/><path d="M9 12l2.2 2.2L15.5 10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2.5H4.5zM10 21a2.2 2.2 0 0 0 4 0" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 13a8 8 0 0 1 16 0M4 13v4a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2zM20 13v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z" stroke-linecap="round"/><path d="M12 21c2.5 0 4-1.5 4-3" stroke-linecap="round"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 6h11v10H2zM13 9h4.5L21 12.5V16h-8" stroke-linejoin="round"/><circle cx="6" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>',
    emi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 6h18v12H3zM3 10h18" /><path d="M7 15h4" stroke-linecap="round"/></svg>',
    tools: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.6 4.9L3 17.3V21h3.7l5.9-5.9a4 4 0 0 0 4.9-5.6l-2.6 2.6-2.5-.5-.5-2.5z" stroke-linejoin="round"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21" stroke-linecap="round"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 7h16l-1.5 12.5a1.5 1.5 0 0 1-1.5 1.3H7a1.5 1.5 0 0 1-1.5-1.3zM8 10V6a4 4 0 0 1 8 0v4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4zm-3.1 4.2c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.2.2 1.8 2.8 4.4 3.9 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.2-.7.1l-1 1.2c-.2.2-.3.2-.6.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4 0-.5.2-.7l.7-.9c.1-.2.1-.4 0-.6L9 8.7c-.1-.3-.3-.4-.5-.4h-.6z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 4h4l1.5 4.5-2.2 1.7a12 12 0 0 0 5.5 5.5l1.7-2.2L20 15v4a2 2 0 0 1-2.1 2A16 16 0 0 1 3 6.1 2 2 0 0 1 5 4z" stroke-linejoin="round"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4.5 12.5l5 5L20 7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    caret: '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 9l7 7 7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 4v16M4 12h16" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke-linecap="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10" stroke-linecap="round"/></svg>',
    lockOpen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.7-1.5" stroke-linecap="round"/></svg>',
    remote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/><path d="M7.7 7.7a6 6 0 0 0 0 8.6M16.3 7.7a6 6 0 0 1 0 8.6M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2" stroke-linecap="round"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="9" cy="8" r="3.4"/><path d="M3 20c.6-3.4 3-5.2 6-5.2s5.4 1.8 6 5.2M15.5 5a3.4 3.4 0 0 1 0 6.4M17.5 14.9c2 .6 3.2 2.2 3.5 4.6" stroke-linecap="round"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 21V6l7-3.5V21M11 21h9V10l-9-3.5M6.5 9h2M6.5 13h2M6.5 17h2M14.5 12h2M14.5 16h2" stroke-linejoin="round" stroke-linecap="round"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke-linejoin="round"/><path d="M19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9z" stroke-linejoin="round"/></svg>'
  };
  window.Gicon = name => ICONS[name] || '';

  /* ---------- ACCESS LABELS ---------- */
  window.ACCESS_LABEL = {
    face3d: { label: '3D Face', icon: 'face' },
    face:   { label: 'Face', icon: 'face' },
    fp:     { label: 'Fingerprint', icon: 'fingerprint' },
    pin:    { label: 'PIN', icon: 'pin' },
    rfid:   { label: 'RFID Card', icon: 'card' },
    app:    { label: 'App', icon: 'app' },
    otp:    { label: 'OTP', icon: 'otp' },
    temp:   { label: 'Temp Password', icon: 'key' },
    key:    { label: 'Key', icon: 'key' },
    remote: { label: 'Remote', icon: 'remote' },
    camera: { label: 'Camera', icon: 'camera' },
    chime:  { label: 'Chime & Bell', icon: 'bell' },
    alexa:  { label: 'Alexa · Google · Apple', icon: 'sparkle' }
  };

  /* ---------- HEADER (injected for consistency across pages) ---------- */
  const headerEl = document.getElementById('siteHeader');
  if (headerEl) {
    const C = G.COLLECTIONS;
    headerEl.className = 'site-header';
    headerEl.innerHTML = `
      <div class="shell header-inner">
        <a class="brand" href="index.html" aria-label="Golens home">
          ${ICONS.logo}<span>GOLENS<small>SMART SECURITY</small></span>
        </a>
        <nav aria-label="Primary">
          <ul class="nav" id="primaryNav">
            <li data-mega>
              <button class="nav-link" aria-expanded="false" aria-haspopup="true">Smart Locks ${ICONS.caret}</button>
              <div class="mega" role="region" aria-label="Smart locks menu">
                <div class="mega-grid">
                  <div>
                    <p class="mega-col-title">Shop by door</p>
                    <div class="mega-list">
                      <a href="locks.html?f=main"><span>Main Door<span class="sub">Face, camera &amp; full-security flagships</span></span><span class="price-tag">from ₹6,890</span></a>
                      <a href="locks.html?f=glass"><span>Glass Doors<span class="sub">8–12 mm frameless &amp; cabin doors</span></span><span class="price-tag">from ₹7,590</span></a>
                      <a href="locks.html?f=room"><span>Room &amp; Interior<span class="sub">Bedrooms, offices, hotels</span></span><span class="price-tag">from ₹6,890</span></a>
                      <a href="${C.cabinet.url}" data-event="nav_cabinet">Cabinet &amp; Drawer<span class="sub">Qidots series</span></a>
                    </div>
                    <p class="mega-col-title" style="margin-top:1.2rem">Shop by capability</p>
                    <div class="mega-list">
                      <a href="locks.html?f=face">Face Recognition</a>
                      <a href="locks.html?f=fp">Fingerprint</a>
                      <a href="locks.html?f=wifi">Wi-Fi &amp; App</a>
                      <a href="locks.html?f=camera">Locks with Camera</a>
                    </div>
                  </div>
                  <a class="mega-feature" href="product.html?p=x95" data-event="nav_x95">
                    <img src="${G.byId('x95').image.replace('width=900', 'width=800')}" alt="Golens X95 smart lock with 3D face recognition and camera" loading="lazy">
                    <div class="mega-feature-body">
                      <span class="mono-chip">Flagship · 8 ways in</span>
                      <strong>Golens X95</strong>
                      <span style="font-size:.84rem;color:var(--on-ink-2)">3D Face ID · built-in camera · Wi-Fi, no gateway needed</span>
                      <span class="price-tag" style="font-size:.85rem">${inr(12900)} <s style="color:var(--on-ink-2);font-size:.75rem">${inr(52499)}</s></span>
                    </div>
                  </a>
                </div>
              </div>
            </li>
            <li data-mega>
              <button class="nav-link" aria-expanded="false" aria-haspopup="true">Security ${ICONS.caret}</button>
              <div class="mega" role="region" aria-label="Security menu">
                <div class="mega-grid">
                  <div>
                    <p class="mega-col-title">Secure the whole property</p>
                    <div class="mega-list">
                      <a href="${C.cameras.url}" data-event="nav_cameras">Cameras<span class="sub">Wi-Fi · 4G · PTZ · CCTV kits</span></a>
                      <a href="${C.doorbell.url}" data-event="nav_doorbell">Video Doorbell<span class="sub">See &amp; speak with visitors</span></a>
                      <a href="${C.dashcams.url}" data-event="nav_dashcams">Dash Cams<span class="sub">2K–4K, front &amp; rear</span></a>
                      <a href="${C.attendance.url}" data-event="nav_attendance">Attendance Machines<span class="sub">Face &amp; fingerprint for offices</span></a>
                    </div>
                  </div>
                  <div>
                    <p class="mega-col-title">Guides &amp; help</p>
                    <div class="mega-list">
                      <a href="support.html#compatibility">Will it fit my door?</a>
                      <a href="support.html#installation">Installation, step by step</a>
                      <a href="find-my-lock.html">Find my lock in 60 seconds</a>
                      <a href="compare.html">Compare locks</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li><a class="nav-link" href="find-my-lock.html">Find My Lock</a></li>
            <li><a class="nav-link" href="support.html">Support</a></li>
            <li><a class="nav-link" href="business.html">Business &amp; B2B</a></li>
            <li><a class="nav-cta" href="find-my-lock.html" data-event="nav_finder">Not sure which lock?</a></li>
          </ul>
        </nav>
        <div style="display:flex;align-items:center;gap:.15rem;margin-left:.5rem">
          <button class="icon-btn" id="searchOpen" aria-label="Search">${ICONS.search}</button>
          <button class="icon-btn" id="cartOpen" aria-label="Open cart">${ICONS.cart}<span class="cart-count" id="cartCount">0</span></button>
          <button class="icon-btn burger" id="burger" aria-label="Open menu" aria-expanded="false">${ICONS.menu}</button>
        </div>
      </div>`;

    /* mega menu behaviour — hover + keyboard, accessible */
    let megaTimer = {};
    headerEl.querySelectorAll('[data-mega]').forEach(li => {
      const btn = li.querySelector('.nav-link');
      const show = () => { clearTimeout(megaTimer[li.dataset.mega]); closeAllMegas(li); li.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); };
      const hide = () => { megaTimer[li.dataset.mega] = setTimeout(() => { li.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }, 180); };
      li.addEventListener('mouseenter', show);
      li.addEventListener('mouseleave', hide);
      btn.addEventListener('click', () => li.classList.contains('is-open') ? (li.classList.remove('is-open'), btn.setAttribute('aria-expanded', 'false')) : show());
      li.addEventListener('focusout', e => { if (!li.contains(e.relatedTarget)) hide(); });
      li.querySelector('.mega').addEventListener('click', e => { if (e.target.closest('a')) { li.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); } });
    });
    function closeAllMegas(except) {
      headerEl.querySelectorAll('[data-mega]').forEach(li => {
        if (li !== except) { li.classList.remove('is-open'); li.querySelector('.nav-link').setAttribute('aria-expanded', 'false'); }
      });
    }
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllMegas(); });

    /* header solid on scroll + hide on scroll-down */
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      headerEl.classList.toggle('is-solid', y > 40);
      headerEl.classList.toggle('is-hidden', y > 560 && y > lastY && !document.body.classList.contains('drawer-open'));
      lastY = y;
    }, { passive: true });

    /* mobile nav */
    const mob = document.createElement('div');
    mob.className = 'mobile-nav';
    mob.id = 'mobileNav';
    mob.setAttribute('role', 'dialog');
    mob.setAttribute('aria-label', 'Menu');
    mob.innerHTML = `
      <div class="mobile-nav-head">
        <span class="brand" style="font-size:1.2rem">${ICONS.logo}<span>GOLENS</span></span>
        <button class="icon-btn" id="mobileClose" aria-label="Close menu">${ICONS.close}</button>
      </div>
      <details class="mobile-acc"><summary>Shop by door ${ICONS.plus}</summary>
        <ul>
          <li><a href="locks.html?f=main">Main Door Locks</a></li>
          <li><a href="locks.html?f=glass">Glass Door Locks</a></li>
          <li><a href="locks.html?f=room">Room &amp; Interior</a></li>
          <li><a href="${C.cabinet.url}">Cabinet &amp; Drawer Locks</a></li>
        </ul>
      </details>
      <details class="mobile-acc"><summary>By capability ${ICONS.plus}</summary>
        <ul>
          <li><a href="locks.html?f=face">Face Recognition</a></li>
          <li><a href="locks.html?f=fp">Fingerprint</a></li>
          <li><a href="locks.html?f=wifi">Wi-Fi &amp; App</a></li>
          <li><a href="locks.html?f=camera">With Camera</a></li>
        </ul>
      </details>
      <details class="mobile-acc"><summary>More security ${ICONS.plus}</summary>
        <ul>
          <li><a href="${C.cameras.url}">Cameras</a></li>
          <li><a href="${C.doorbell.url}">Video Doorbell</a></li>
          <li><a href="${C.dashcams.url}">Dash Cams</a></li>
          <li><a href="${C.attendance.url}">Attendance Machines</a></li>
        </ul>
      </details>
      <a class="mobile-acc" style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--hairline-d);border-bottom:1px solid var(--hairline-d);padding:1.05rem .2rem;font-size:1.05rem;font-weight:600" href="find-my-lock.html">Find My Lock ${ICONS.arrow}</a>
      <a class="mobile-acc" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--hairline-d);padding:1.05rem .2rem;font-size:1.05rem;font-weight:600" href="support.html">Support ${ICONS.arrow}</a>
      <a class="mobile-acc" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--hairline-d);padding:1.05rem .2rem;font-size:1.05rem;font-weight:600" href="business.html">Business &amp; B2B ${ICONS.arrow}</a>
      <a class="btn btn-bronze btn-block" href="locks.html">Shop all smart locks</a>
      <div class="mobile-nav-foot">
        <a href="${G.STORE.whatsappHref}" target="_blank" rel="noopener" data-event="whatsapp_click" data-event-params='{"source":"mobile_nav"}' style="display:inline-flex;gap:.5rem;align-items:center">${ICONS.wa.replace('<svg','<svg width="16" height="16"')} WhatsApp an expert</a>
        <a href="${G.STORE.tollFreeHref}" data-event="call_click">${ICONS.phone.replace('<svg','<svg width="14" height="14"')} ${G.STORE.tollFree} (toll-free)</a>
      </div>`;
    document.body.appendChild(mob);
    const burger = document.getElementById('burger');
    const openMob = () => { mob.classList.add('is-open'); burger.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
    const closeMob = () => { mob.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
    burger.addEventListener('click', openMob);
    document.getElementById('mobileClose').addEventListener('click', closeMob);
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));
    window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMob(); });

    /* responsive burger visibility via CSS below */
  }

  /* ---------- CART ---------- */
  const Cart = {
    key: 'golens_cart_v1',
    items: [],
    load() { try { this.items = JSON.parse(localStorage.getItem(this.key)) || []; } catch (e) { this.items = []; } this.render(); },
    save() { localStorage.setItem(this.key, JSON.stringify(this.items)); this.render(); },
    add(id, qty) {
      qty = qty || 1;
      const it = this.items.find(i => i.id === id);
      if (it) it.qty += qty; else this.items.push({ id, qty });
      this.save();
      track('add_to_cart', { item: id, qty });
      toast('Added to your selection');
      openDrawer();
    },
    setQty(id, qty) {
      const it = this.items.find(i => i.id === id);
      if (!it) return;
      it.qty = Math.max(1, qty);
      this.save();
    },
    remove(id) { this.items = this.items.filter(i => i.id !== id); this.save(); },
    count() { return this.items.reduce((s, i) => s + i.qty, 0); },
    total() { return this.items.reduce((s, i) => { const p = G.byId(i.id); return p ? s + p.price * i.qty : s; }, 0); },
    render() {
      const count = document.getElementById('cartCount');
      if (count) { count.textContent = this.count(); count.classList.toggle('on', this.count() > 0); }
      const body = document.getElementById('cartBody');
      const foot = document.getElementById('cartFoot');
      if (!body) return;
      if (!this.items.length) {
        body.innerHTML = `<div class="cart-empty">${ICONS.cart.replace('<svg', '<svg width="44" height="44"')}<p>Your selection is empty.</p><a class="btn btn-ghost btn-sm" href="locks.html">Browse smart locks</a></div>`;
        if (foot) foot.style.display = 'none';
        return;
      }
      body.innerHTML = this.items.map(i => {
        const p = G.byId(i.id); if (!p) return '';
        return `<div class="cart-item" data-id="${p.id}">
          <a class="thumb" href="product.html?p=${p.id}"><img src="${p.image}" alt="${p.name}" loading="lazy"></a>
          <div class="cart-item-info">
            <strong>${p.name}${p.line ? ' <span style="color:var(--on-ink-2);font-weight:400">· ' + p.line + '</span>' : ''}</strong>
            <span style="font-size:.76rem;color:var(--on-ink-2)">${p.subtitle}</span>
            <div class="row">
              <span class="qty"><button data-act="dec" aria-label="Decrease quantity">−</button><output>${i.qty}</output><button data-act="inc" aria-label="Increase quantity">+</button></span>
              <strong>${inr(p.price * i.qty)}</strong>
            </div>
            <button class="remove" data-act="rm">Remove</button>
          </div>
        </div>`;
      }).join('');
      if (foot) {
        foot.style.display = 'grid';
        foot.innerHTML = `
          <div class="subtotal-row"><span class="mono-chip" style="color:var(--on-ink-2)">Subtotal</span><strong>${inr(this.total())}</strong></div>
          <div class="mini-note">${ICONS.emi}<span>Easy EMI available at checkout on golens.in. Expert installation is quoted separately for your location.</span></div>
          <a class="btn btn-bronze btn-block" id="checkoutBtn" data-event="begin_checkout" data-event-params='{"value":${this.total()}}'>Continue to secure checkout</a>
          <button class="btn btn-ghost btn-block" id="keepShopping">Continue exploring</button>
          <a class="drawer-note" href="${waLink('Hi Golens! I need help completing my order.')}" target="_blank" rel="noopener" data-event="whatsapp_click" data-event-params='{"source":"cart"}'>Prefer to order with help? WhatsApp an expert →</a>`;
        document.getElementById('checkoutBtn').addEventListener('click', () => {
          const urls = this.items.map(i => { const p = G.byId(i.id); return p ? p.url : null; }).filter(Boolean);
          track('checkout_redirect', { items: this.items.length });
          if (urls.length === 1) window.open(urls[0], '_blank', 'noopener');
          else { window.open(urls[0], '_blank', 'noopener'); toast('Opening each item on golens.in…'); setTimeout(() => urls.slice(1, 3).forEach(u => window.open(u, '_blank', 'noopener')), 700); }
        });
        document.getElementById('keepShopping').addEventListener('click', closeDrawer);
      }
    }
  };
  window.Gcart = Cart;

  /* ---------- DRAWER (cart) ---------- */
  const dim = document.createElement('div');
  dim.className = 'overlay-dim';
  document.body.appendChild(dim);
  const drawer = document.createElement('aside');
  drawer.className = 'drawer';
  drawer.id = 'cartDrawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-label', 'Your selection');
  drawer.innerHTML = `
    <div class="drawer-head">
      <h2>Your selection</h2>
      <button class="icon-btn" id="cartClose" aria-label="Close cart">${ICONS.close}</button>
    </div>
    <div class="drawer-body" id="cartBody"></div>
    <div class="drawer-foot" id="cartFoot"></div>`;
  document.body.appendChild(drawer);
  function openDrawer() { drawer.classList.add('is-open'); dim.classList.add('is-open'); document.body.classList.add('drawer-open'); document.body.style.overflow = 'hidden'; }
  function closeDrawer() { drawer.classList.remove('is-open'); dim.classList.remove('is-open'); document.body.classList.remove('drawer-open'); document.body.style.overflow = ''; }
  window.Gdrawer = { open: openDrawer, close: closeDrawer };
  document.addEventListener('click', e => {
    if (e.target.closest('#cartOpen')) { openDrawer(); track('cart_open'); }
    if (e.target.closest('#cartClose') || e.target === dim) closeDrawer();
    const act = e.target.closest('[data-act]');
    if (act) {
      const id = act.closest('.cart-item').dataset.id;
      const item = Cart.items.find(i => i.id === id);
      if (act.dataset.act === 'inc') Cart.setQty(id, item.qty + 1);
      if (act.dataset.act === 'dec') Cart.setQty(id, item.qty - 1);
      if (act.dataset.act === 'rm') Cart.remove(id);
    }
    if (e.target.closest('[data-add-to-cart]')) {
      const id = e.target.closest('[data-add-to-cart]').dataset.addToCart;
      Cart.add(id);
    }
    if (e.target.closest('[data-wa]')) {
      const msg = e.target.closest('[data-wa]').dataset.wa;
      window.open(waLink(msg), '_blank', 'noopener');
      track('whatsapp_click', { source: e.target.closest('[data-wa]').dataset.waSource || 'generic' });
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawer(); closeSearch(); } });

  function waLink(msg) { return G.STORE.whatsappHref + '?text=' + encodeURIComponent(msg); }
  window.Gwa = waLink;

  /* ---------- SEARCH ---------- */
  const so = document.createElement('div');
  so.className = 'search-overlay';
  so.id = 'searchOverlay';
  so.setAttribute('role', 'dialog');
  so.setAttribute('aria-label', 'Search Golens');
  so.innerHTML = `
    <div class="search-head">
      ${ICONS.search}
      <input class="search-input" id="searchInput" type="text" placeholder="Search locks, cameras, needs…" aria-label="Search products" autocomplete="off">
      <button class="icon-btn" id="searchClose" aria-label="Close search">${ICONS.close}</button>
    </div>
    <div class="search-body">
      <div class="search-tags" id="searchTags"></div>
      <div class="search-results" id="searchResults" role="listbox"></div>
    </div>`;
  document.body.appendChild(so);
  const searchInput = so.querySelector('#searchInput');
  const searchResults = so.querySelector('#searchResults');
  const searchTags = so.querySelector('#searchTags');
  const SUGGESTED = ['X95', 'Face ID', 'Fingerprint', 'Wi-Fi', 'Glass door', 'Room lock', 'Camera', 'Under ₹10,000'];
  searchTags.innerHTML = SUGGESTED.map(t => `<button data-q="${t}">${t}</button>`).join('');
  searchTags.addEventListener('click', e => { const b = e.target.closest('button[data-q]'); if (b) { searchInput.value = b.dataset.q; runSearch(); } });

  function searchScore(p, q) {
    const hay = [p.name, p.line, p.subtitle, p.bestFor, p.category, (p.access || []).join(' '), (p.door || []).join(' ')].join(' ').toLowerCase();
    let score = 0;
    if (p.name.toLowerCase().includes(q)) score += 10;
    if ((p.subtitle || '').toLowerCase().includes(q)) score += 5;
    if (hay.includes(q)) score += 3;
    if (q.includes('under') || q.includes('budget') || q.includes('cheap')) score += p.price < 10000 ? 4 : 0;
    if ((q.includes('face') && (p.access || []).some(a => a.startsWith('face'))) ||
        (q.includes('camera') && p.camera) ||
        (q.includes('wifi') && p.wifi) ||
        (q.includes('glass') && p.door.includes('glass')) ||
        (q.includes('room') && p.door.includes('room'))) score += 6;
    return score;
  }
  function runSearch() {
    const q = searchInput.value.trim().toLowerCase();
    track('search', { query: q });
    if (!q) { searchResults.innerHTML = ''; return; }
    const hits = G.CATALOG.map(p => ({ p, s: searchScore(p, q) })).filter(h => h.s > 0).sort((a, b) => b.s - a.s).slice(0, 7);
    const pages = [
      { t: 'Find My Lock — get a recommendation', u: 'find-my-lock.html', k: ['help', 'choose', 'recommend', 'which', 'guide', 'find', 'best', 'quiz'] },
      { t: 'Compatibility checker — will it fit my door?', u: 'support.html#compatibility', k: ['fit', 'compatibility', 'thickness', 'size', 'door'] },
      { t: 'Installation — how it works', u: 'support.html#installation', k: ['install', 'carpenter', 'fitting', 'setup'] },
      { t: 'Compare smart locks', u: 'compare.html', k: ['compare', 'difference', 'vs'] },
      { t: 'Bulk & dealer enquiries', u: 'business.html', k: ['bulk', 'b2b', 'dealer', 'business', 'hotel', 'office', 'builder'] }
    ].filter(pg => pg.k.some(k => q.includes(k)));
    searchResults.innerHTML =
      hits.map(h => `<a class="search-hit" role="option" href="product.html?p=${h.p.id}">
        <img src="${h.p.image}" alt="">
        <span><strong>${h.p.name}</strong><span>${h.p.subtitle}</span></span>
        <span class="price">${inr(h.p.price)}</span>
      </a>`).join('') +
      pages.map(pg => `<a class="search-hit" role="option" href="${pg.u}"><span style="width:58px;height:58px;display:grid;place-items:center;color:var(--bronze-1)">${ICONS.arrow.replace('<svg', '<svg width="20" height="20"')}</span><span><strong>${pg.t}</strong></span></a>`).join('') ||
      `<p style="color:var(--on-ink-2);padding:2rem 0">Nothing close to “${searchInput.value}”. Try “face”, “glass”, “fingerprint”, or <a class="link-arrow" href="find-my-lock.html">let us recommend a lock →</a></p>`;
  }
  searchInput.addEventListener('input', runSearch);
  function openSearch() { so.classList.add('is-open'); document.body.style.overflow = 'hidden'; setTimeout(() => searchInput.focus(), 60); track('search_open'); }
  function closeSearch() { so.classList.remove('is-open'); document.body.style.overflow = ''; }
  document.addEventListener('click', e => {
    if (e.target.closest('#searchOpen')) openSearch();
    if (e.target.closest('#searchClose')) closeSearch();
  });

  /* ---------- TOAST ---------- */
  let toastTimer;
  const toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.setAttribute('role', 'status');
  document.body.appendChild(toastEl);
  function toast(msg) {
    toastEl.innerHTML = ICONS.check + '<span>' + msg + '</span>';
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2600);
  }
  window.Gtoast = toast;

  /* ---------- PRODUCT CARD renderer (shared) ---------- */
  window.Gcard = function (p, opts) {
    opts = opts || {};
    const feats = (p.access || []).slice(0, 3).map(a => {
      const m = window.ACCESS_LABEL[a];
      return m ? `<span class="feat-chip">${window.Gicon(m.icon)}${m.label}</span>` : '';
    }).join('');
    const off = p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0;
    const badge = p.soldOut
      ? `<span class="badge out">Sold out</span>`
      : p.badge === 'flagship' ? `<span class="badge">Flagship</span>` :
        p.badge === 'new' ? `<span class="badge">New</span>` :
        p.badge === 'advanced' ? `<span class="badge">Most Advanced</span>` : '';
    const save = off && !p.soldOut ? `<span class="badge save">−${off}%</span>` : '';
    return `<article class="pcard" data-pid="${p.id}">
      <div class="pcard-media">
        <div class="pcard-badges">${badge}${save}</div>
        <a href="product.html?p=${p.id}" aria-label="${p.name} ${p.line || ''}"><img src="${p.image}" alt="${p.name}${p.line ? ' ' + p.line : ''} — ${p.subtitle}" loading="lazy"></a>
      </div>
      <div class="pcard-body">
        <h3 class="pcard-name"><a href="product.html?p=${p.id}">${p.name}</a>${p.line ? `<small>${p.line}</small>` : ''}</h3>
        <p class="pcard-sub">${p.subtitle}</p>
        <div class="pcard-feats">${feats}${p.camera ? `<span class="feat-chip">${window.Gicon('camera')}Camera</span>` : ''}${p.wifi ? `<span class="feat-chip">${window.Gicon('wifi')}Wi-Fi</span>` : ''}</div>
        <div class="pcard-foot">
          <div class="price">${inr(p.price)}${p.mrp ? `<s>${inr(p.mrp)}</s>` : ''}</div>
          <div class="pcard-actions">
            ${p.soldOut ? `<a class="btn btn-ghost btn-sm" href="product.html?p=${p.id}">View</a>` : `<button class="btn btn-sm" data-add-to-cart="${p.id}" data-event="add_to_cart" data-event-params='{"item":"${p.id}","source":"card"}'>Add</button>`}
            <a class="btn btn-ghost btn-sm" href="product.html?p=${p.id}">Explore</a>
          </div>
        </div>
      </div>
    </article>`;
  };

  /* ---------- REVEAL ENGINE ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  window.GobserveReveals = root => {
    (root || document).querySelectorAll('[data-reveal]:not(.is-in)').forEach(el => io.observe(el));
  };
  document.addEventListener('DOMContentLoaded', () => window.GobserveReveals());

  /* ---------- FOOTER (injected) ---------- */
  const footerEl = document.getElementById('siteFooter');
  if (footerEl) {
    const S = G.STORE, C = G.COLLECTIONS;
    footerEl.className = 'site-footer';
    footerEl.innerHTML = `
      <div class="shell">
        <div class="footer-grid">
          <div class="footer-brand">
            <span class="brand" style="color:var(--on-ink)">${ICONS.logo}<span>GOLENS<small>SMART SECURITY</small></span></span>
            <p>Smart locks, cameras and security for homes and workplaces — sold and supported directly by ${S.legal}.</p>
            <div class="footer-contact" style="margin-top:1rem">
              <a href="${S.tollFreeHref}" data-event="call_click" data-event-params='{"source":"footer"}'>${ICONS.phone}${S.tollFree} <span style="color:var(--on-ink-2);font-size:.78rem">(toll-free)</span></a>
              <a href="${waLink('Hi Golens! I have a question.')}" target="_blank" rel="noopener" data-event="whatsapp_click" data-event-params='{"source":"footer"}'>${ICONS.wa}${S.whatsapp}</a>
              <a href="mailto:${S.email}">${ICONS.mail}${S.email}</a>
              <span style="color:var(--on-ink-2);font-size:.8rem">${S.hours} · ${S.waHours}</span>
            </div>
          </div>
          <div class="footer-col"><h4>Smart Locks</h4><ul>
            <li><a href="locks.html?f=main">Main door locks</a></li>
            <li><a href="locks.html?f=glass">Glass door locks</a></li>
            <li><a href="locks.html?f=room">Room &amp; interior</a></li>
            <li><a href="${C.cabinet.url}">Cabinet locks</a></li>
            <li><a href="${C.locks.url}">All smart locks</a></li>
          </ul></div>
          <div class="footer-col"><h4>Security</h4><ul>
            <li><a href="${C.cameras.url}">Cameras</a></li>
            <li><a href="${C.doorbell.url}">Video doorbell</a></li>
            <li><a href="${C.dashcams.url}">Dash cams</a></li>
            <li><a href="${C.attendance.url}">Attendance machines</a></li>
          </ul></div>
          <div class="footer-col"><h4>Help</h4><ul>
            <li><a href="support.html#compatibility">Will it fit my door?</a></li>
            <li><a href="support.html#installation">Installation</a></li>
            <li><a href="support.html#warranty">Warranty</a></li>
            <li><a href="support.html#faq">FAQs</a></li>
            <li><a href="find-my-lock.html">Find my lock</a></li>
          </ul></div>
          <div class="footer-col"><h4>Company</h4><ul>
            <li><a href="${S.policies.about}">About Golens</a></li>
            <li><a href="business.html">Business &amp; bulk</a></li>
            <li><a href="${S.policies.dealer}">Become a dealer</a></li>
            <li><a href="${S.policies.returns}">Returns</a></li>
            <li><a href="${S.policies.shipping}">Shipping</a></li>
            <li><a href="${S.policies.contact}">Contact</a></li>
          </ul></div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${S.legal} · Bikaner, Rajasthan</span>
          <span style="display:inline-flex;gap:1rem"><a href="${S.policies.privacy}">Privacy</a><a href="${S.policies.terms}">Terms</a><span>golens.in</span></span>
        </div>
      </div>`;
  }

  Cart.load();
})();
