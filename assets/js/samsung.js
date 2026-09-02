/* ============================================================
   GOLENS STORE — SAMSUNG-STYLE SHARED RUNTIME
   Header · mega menu · mobile nav · footer · cart · search ·
   toast · reveals · product cards · analytics events
   ============================================================ */
(function () {
  'use strict';
  const G = window.GOLENS;
  const inr = n => '₹' + Number(n).toLocaleString('en-IN');
  window.Gfmt = { inr };
  const rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.dataLayer = window.dataLayer || [];
  const track = (ev, p) => { window.dataLayer.push(Object.assign({ event: ev, page: location.pathname }, p || {})); };
  window.Gtrack = track;

  const wa = msg => 'https://wa.me/919982987865?text=' + encodeURIComponent(msg);
  window.Gwa = wa;

  const IC = {
    logo: '<img src="assets/img/logo.png" alt="Golens logo" style="height:32px;width:auto">',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M5 5l14 14M19 5 5 19" stroke-linecap="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 7h16l-1.5 12.5a1.5 1.5 0 0 1-1.5 1.3H7a1.5 1.5 0 0 1-1.5-1.3zM8 10V6a4 4 0 0 1 8 0v4" stroke-linecap="round"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.1 14.1c-.2.6-1.2 1.1-1.7 1.2-.5 0-1.1 0-3.1-.9-2.6-1.1-4.2-3.7-4.4-3.9-.1-.2-1-1.4-1-2.6s.7-1.8.9-2.1c.2-.3.5-.3.7-.3h.6c.2 0 .4 0 .6.4l1 2.3c.1.2.1.4 0 .6l-.7.9c-.2.2-.3.3-.1.6a6.5 6.5 0 0 0 3.2 2.8c.3.1.5.2.6-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3.1.1.1.6-.1 1.2z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h4l1.5 4.5-2.2 1.7a12 12 0 0 0 5.5 5.5l1.7-2.2L20 15v4a2 2 0 0 1-2.1 2A16 16 0 0 1 3 6.1 2 2 0 0 1 5 4z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12h15M13 6l6 6-6 6" stroke-linecap="round"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 9l7 7 7-7"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v16M4 12h16" stroke-linecap="round"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3l7.5 3v6c0 4.6-3.2 7.7-7.5 8.9C7.7 19.7 4.5 16.6 4.5 12V6z"/><path d="M9 12l2.2 2.2L15.5 10" stroke-linecap="round"/></svg>',
    emi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4" stroke-linecap="round"/></svg>',
    headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 13a8 8 0 0 1 16 0M4 13v4a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2zM20 13v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z"/></svg>',
    tools: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.5 6.5a4 4 0 0 0-5.6 4.9L3 17.3V21h3.7l5.9-5.9a4 4 0 0 0 4.9-5.6l-2.6 2.6-2.5-.5-.5-2.5z" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4.5 12.5l5 5L20 7" stroke-linecap="round"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 6h11v10H2zM13 9h4.5L21 12.5V16h-8"/><circle cx="6" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>'
  };
  window.Gicon = n => IC[n] || '';

  window.ACCESS_LABEL = {
    face3d: '3D Face', face: 'Face', fp: 'Fingerprint', pin: 'PIN', rfid: 'Card',
    app: 'App', otp: 'OTP', temp: 'Temp Password', key: 'Key', remote: 'Remote',
    camera: 'Camera', chime: 'Chime & Bell', alexa: 'Alexa · Google · Apple'
  };

  /* ---------- HEADER INJECTION ---------- */
  const mount = document.getElementById('gsHeader');
  if (mount) {
    mount.outerHTML = `
    <div class="topbar">
      <div class="container">
        <div class="topbar-left"><span class="hide-m">Free expert consultation on every lock ·</span> <strong>Easy EMI</strong> at checkout</div>
        <div class="topbar-links">
          <a href="support.html">Support</a>
          <a href="business.html">Business &amp; Bulk</a>
          <a href="tel:18001237255">1800-123-7255</a>
        </div>
      </div>
    </div>
    <header class="header" id="sHeader">
      <div class="container">
        <a class="logo" href="index.html" aria-label="Golens home">${IC.logo}<span>GOLENS<small>SMART SECURITY</small></span></a>
        <nav aria-label="Primary">
          <ul class="mainnav">
            <li data-dd>
              <button class="navlink" aria-expanded="false" aria-haspopup="true">Smart Locks ${IC.chev}</button>
              <div class="mega">
                <h5>Shop by door</h5>
                <a href="locks.html?f=main">Main Door Locks <span class="pr">from ₹6,890</span></a>
                <a href="locks.html?f=glass">Glass Door Locks <span class="pr">from ₹7,590</span></a>
                <a href="locks.html?f=room">Room &amp; Interior <span class="pr">from ₹6,890</span></a>
                <a href="https://golens.in/collections/cabinet-locks">Cabinet &amp; Drawer</a>
                <h5 style="margin-top:8px">Shop by feature</h5>
                <a href="locks.html?f=face">3D Face Recognition</a>
                <a href="locks.html?f=fp">Fingerprint</a>
                <a href="locks.html?f=wifi">Wi-Fi &amp; App</a>
                <a href="locks.html?f=camera">Locks with Camera</a>
              </div>
            </li>
            <li data-dd>
              <button class="navlink" aria-expanded="false" aria-haspopup="true">More Security ${IC.chev}</button>
              <div class="mega">
                <h5>Cameras &amp; monitoring</h5>
                <a href="https://golens.in/collections/cameras">Security Cameras</a>
                <a href="https://golens.in/collections/doorbell">Video Doorbell</a>
                <a href="https://golens.in/collections/cctv-kit">CCTV Kits</a>
                <a href="https://golens.in/collections/dash-cameras">Dash Cams</a>
                <h5 style="margin-top:8px">For workplaces</h5>
                <a href="https://golens.in/collections/attendance-machines">Attendance Machines</a>
                <a href="business.html">Bulk &amp; Project Supply</a>
              </div>
            </li>
            <li><a class="navlink" href="find-my-lock.html">Find My Lock</a></li>
            <li><a class="navlink" href="compare.html">Compare</a></li>
            <li><a class="navlink" href="support.html">Support</a></li>
          </ul>
        </nav>
        <div class="header-icons">
          <button class="hicon" id="gsSearchBtn" aria-label="Search">${IC.search}</button>
          <a class="hicon" href="${wa('Hi Golens! I need help choosing a lock.')}" target="_blank" rel="noopener" aria-label="WhatsApp expert">${IC.wa}</a>
          <button class="hicon" id="gsCartBtn" aria-label="Cart">${IC.cart}<span class="cart-badge" id="gsCartCount">0</span></button>
          <button class="hicon burger" id="gsBurger" aria-label="Menu">${IC.menu}</button>
        </div>
      </div>
    </header>
    <div class="mobnav" id="gsMobnav" role="dialog" aria-label="Menu">
      <div class="mobnav-head">
        <span class="logo" style="font-size:1.2rem">${IC.logo}<span>GOLENS</span></span>
        <button class="hicon" id="gsMobClose" aria-label="Close menu">${IC.close}</button>
      </div>
      <details><summary>Smart Locks ${IC.plus}</summary><ul>
        <li><a href="locks.html?f=main">Main Door Locks</a></li>
        <li><a href="locks.html?f=glass">Glass Door Locks</a></li>
        <li><a href="locks.html?f=room">Room &amp; Interior</a></li>
        <li><a href="locks.html?f=face">3D Face Recognition</a></li>
        <li><a href="locks.html?f=fp">Fingerprint Locks</a></li>
        <li><a href="locks.html?f=camera">With Camera</a></li>
        <li><a href="https://golens.in/collections/cabinet-locks">Cabinet Locks</a></li>
      </ul></details>
      <details><summary>More Security ${IC.plus}</summary><ul>
        <li><a href="https://golens.in/collections/cameras">Cameras</a></li>
        <li><a href="https://golens.in/collections/doorbell">Video Doorbell</a></li>
        <li><a href="https://golens.in/collections/dash-cameras">Dash Cams</a></li>
        <li><a href="https://golens.in/collections/attendance-machines">Attendance Machines</a></li>
      </ul></details>
      <a href="find-my-lock.html" class="mob-flat">Find My Lock <span>→</span></a>
      <a href="compare.html" class="mob-flat">Compare <span>→</span></a>
      <a href="support.html" class="mob-flat">Support <span>→</span></a>
      <div class="mob-cta">
        <a class="btn-s btn-dark" href="locks.html">Shop all smart locks</a>
        <a class="btn-s" style="border:1.5px solid #ddd" href="${wa('Hi Golens!')}" target="_blank" rel="noopener">WhatsApp an expert</a>
      </div>
    </div>`;

    const header = document.getElementById('sHeader');
    window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 8), { passive: true });

    document.querySelectorAll('[data-dd]').forEach(li => {
      const btn = li.querySelector('.navlink');
      let t;
      const show = () => { clearTimeout(t); document.querySelectorAll('[data-dd]').forEach(x => { if (x !== li) { x.classList.remove('is-open'); x.querySelector('.navlink').setAttribute('aria-expanded', 'false'); } }); li.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); };
      const hide = () => { t = setTimeout(() => { li.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }, 160); };
      li.addEventListener('mouseenter', show);
      li.addEventListener('mouseleave', hide);
      btn.addEventListener('click', () => li.classList.contains('is-open') ? hide() : show());
      li.addEventListener('focusout', e => { if (!li.contains(e.relatedTarget)) hide(); });
    });

    const mob = document.getElementById('gsMobnav');
    const closeMob = () => { mob.classList.remove('is-open'); document.body.style.overflow = ''; };
    document.getElementById('gsBurger').addEventListener('click', () => { mob.classList.add('is-open'); document.body.style.overflow = 'hidden'; });
    document.getElementById('gsMobClose').addEventListener('click', closeMob);
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));
  }

  /* ---------- FOOTER INJECTION ---------- */
  const fmount = document.getElementById('gsFooter');
  if (fmount) {
    fmount.outerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <span class="logo" style="font-size:1.2rem">${IC.logo}<span>GOLENS<small>SMART SECURITY</small></span></span>
            <p>Smart locks, cameras and security for homes and workplaces — imported, sold and supported by GoLens Import &amp; Export Pvt Ltd, Bikaner, Rajasthan.</p>
            <div class="footer-contact">
              <a href="tel:18001237255">${IC.phone} 1800-123-7255 (toll-free)</a>
              <a href="https://wa.me/919982987865" target="_blank" rel="noopener">${IC.wa} +91 99829 87865</a>
              <a href="mailto:care@golens.in">${IC.mail} care@golens.in</a>
            </div>
          </div>
          <div><h4>Smart Locks</h4><ul>
            <li><a href="locks.html?f=main">Main door locks</a></li>
            <li><a href="locks.html?f=glass">Glass door locks</a></li>
            <li><a href="locks.html?f=room">Room &amp; interior</a></li>
            <li><a href="locks.html?f=face">Face recognition</a></li>
            <li><a href="https://golens.in/collections/cabinet-locks">Cabinet locks</a></li>
          </ul></div>
          <div><h4>Security</h4><ul>
            <li><a href="https://golens.in/collections/cameras">Cameras</a></li>
            <li><a href="https://golens.in/collections/doorbell">Video doorbell</a></li>
            <li><a href="https://golens.in/collections/dash-cameras">Dash cams</a></li>
            <li><a href="https://golens.in/collections/attendance-machines">Attendance</a></li>
          </ul></div>
          <div><h4>Support</h4><ul>
            <li><a href="support.html#compatibility">Will it fit my door?</a></li>
            <li><a href="support.html#installation">Installation</a></li>
            <li><a href="https://golens.in/pages/warranty">Warranty</a></li>
            <li><a href="support.html#faq">FAQs</a></li>
            <li><a href="find-my-lock.html">Find my lock</a></li>
          </ul></div>
          <div><h4>Company</h4><ul>
            <li><a href="https://golens.in/pages/about-us">About Golens</a></li>
            <li><a href="business.html">Business &amp; bulk</a></li>
            <li><a href="https://golens.in/pages/become-a-dealer">Become a dealer</a></li>
            <li><a href="https://golens.in/pages/return-policy">Returns</a></li>
            <li><a href="https://golens.in/pages/contact">Contact</a></li>
          </ul></div>
        </div>
        <div class="footer-bottom">
          <span>Copyright © ${new Date().getFullYear()} GoLens Import &amp; Export Pvt Ltd. All rights reserved.</span>
          <span style="display:flex;gap:1.2rem"><a href="https://golens.in/pages/privacy-policy">Privacy</a><a href="https://golens.in/pages/tearms-and-conditions">Terms</a><a href="https://golens.in/pages/shipping-policy">Shipping</a></span>
        </div>
      </div>
    </footer>
    <a class="fab-wa" href="${wa('Hi Golens! I have a question about a lock.')}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${IC.wa}</a>`;
  }

  /* ---------- SEARCH ---------- */
  const so = document.createElement('div');
  so.className = 'ssearch';
  so.id = 'gsSearch';
  so.setAttribute('role', 'dialog');
  so.setAttribute('aria-label', 'Search');
  so.innerHTML = `
    <div class="ssearch-head">
      ${IC.search.replace('<svg', '<svg class="mag"')}
      <input id="gsSearchInput" type="text" placeholder="Search locks, cameras, face ID, glass…" autocomplete="off" aria-label="Search products">
      <button class="hicon" id="gsSearchClose" aria-label="Close search">${IC.close}</button>
    </div>
    <div class="ssearch-body">
      <div class="hint-tags" id="gsHintTags"></div>
      <div id="gsResults"></div>
    </div>`;
  document.body.appendChild(so);
  const si = so.querySelector('#gsSearchInput'), sr = so.querySelector('#gsResults');
  so.querySelector('#gsHintTags').innerHTML = ['X95', 'Face ID', 'Fingerprint', 'Glass door', 'Camera', 'Under ₹10,000'].map(t => `<button data-t="${t}">${t}</button>`).join('');
  so.querySelector('#gsHintTags').addEventListener('click', e => { const b = e.target.closest('[data-t]'); if (b) { si.value = b.dataset.t === 'Under ₹10,000' ? 'under' : b.dataset.t; runSearch(); } });
  function runSearch() {
    const q = si.value.trim().toLowerCase();
    track('search', { query: q });
    if (!q) { sr.innerHTML = ''; return; }
    const hits = G.CATALOG.map(p => {
      const hay = (p.name + ' ' + (p.line || '') + ' ' + p.subtitle + ' ' + p.bestFor + ' ' + (p.access || []).join(' ')).toLowerCase();
      let s = 0;
      if (p.name.toLowerCase().includes(q)) s += 8;
      if (hay.includes(q)) s += 4;
      if ((q === 'under' || q.includes('budget')) && p.price < 10000) s += 6;
      if (q.includes('face') && (p.access || []).some(a => a.startsWith('face'))) s += 6;
      if (q.includes('camera') && p.camera) s += 6;
      if (q.includes('glass') && (p.door || []).includes('glass')) s += 6;
      if (q.includes('wifi') && p.wifi) s += 5;
      return { p, s };
    }).filter(h => h.s > 0).sort((a, b) => b.s - a.s).slice(0, 8);
    sr.innerHTML = hits.length ? hits.map(h => `
      <a class="s-hit" href="product.html?p=${h.p.id}">
        <img src="${h.p.image}" alt="">
        <span><strong>${h.p.name}${h.p.line ? ' · ' + h.p.line : ''}</strong><span class="d">${h.p.subtitle}</span></span>
        <span class="pp">${inr(h.p.price)}</span>
      </a>`).join('')
      : `<p style="color:var(--text-3);padding:20px 0">No matches. Try “face”, “glass”, “camera” — or <a class="link-s" href="find-my-lock.html">use Find My Lock</a>.</p>`;
  }
  si.addEventListener('input', runSearch);
  document.addEventListener('click', e => {
    if (e.target.closest('#gsSearchBtn')) { so.classList.add('is-open'); document.body.style.overflow = 'hidden'; setTimeout(() => si.focus(), 50); track('search_open'); }
    if (e.target.closest('#gsSearchClose')) { so.classList.remove('is-open'); document.body.style.overflow = ''; }
  });

  /* ---------- CART ---------- */
  const CK = 'golens_cart_v1';
  let items = [];
  try { items = JSON.parse(localStorage.getItem(CK)) || []; } catch (e) { items = []; }
  const dim = document.createElement('div');
  dim.className = 'sdim'; dim.id = 'gsDim';
  document.body.appendChild(dim);
  const cart = document.createElement('aside');
  cart.className = 'scart'; cart.id = 'gsCart';
  cart.setAttribute('role', 'dialog');
  cart.setAttribute('aria-label', 'Cart');
  cart.innerHTML = `
    <div class="scart-head"><h3>Your cart</h3><button class="hicon" id="gsCartClose" aria-label="Close cart">${IC.close}</button></div>
    <div class="scart-body" id="gsCartBody"></div>
    <div class="scart-foot" id="gsCartFoot"></div>`;
  document.body.appendChild(cart);
  const cBody = cart.querySelector('#gsCartBody'), cFoot = cart.querySelector('#gsCartFoot');

  function save() { localStorage.setItem(CK, JSON.stringify(items)); renderCart(); }
  function add(id) { const it = items.find(i => i.id === id); if (it) it.qty++; else items.push({ id, qty: 1 }); save(); toast('Added to cart'); openCart(); track('add_to_cart', { item: id }); }
  function openCart() { cart.classList.add('on'); dim.classList.add('on'); document.body.style.overflow = 'hidden'; }
  function closeCart() { cart.classList.remove('on'); dim.classList.remove('on'); document.body.style.overflow = ''; }
  window.Gcart = { add, open: openCart, close: closeCart, count: () => items.reduce((s, i) => s + i.qty, 0) };

  function renderCart() {
    const n = items.reduce((s, i) => s + i.qty, 0);
    const badge = document.getElementById('gsCartCount');
    if (badge) { badge.textContent = n; badge.classList.toggle('on', n > 0); }
    if (!items.length) {
      cBody.innerHTML = `<div class="scart-empty"><p>Your cart is empty.</p><a class="btn-s btn-dark" href="locks.html">Shop smart locks</a></div>`;
      cFoot.style.display = 'none'; return;
    }
    cFoot.style.display = 'grid';
    cBody.innerHTML = items.map(i => { const p = G.byId(i.id); return `
      <div class="scart-item">
        <span class="th"><img src="${p.image}" alt=""></span>
        <div>
          <strong>${p.name}</strong>
          <div style="font-size:12px;color:var(--text-3)">${p.subtitle.slice(0, 42)}</div>
          <div class="r">
            <span class="qty"><button data-q="${p.id}" data-a="dec" aria-label="Decrease">−</button><output>${i.qty}</output><button data-q="${p.id}" data-a="inc" aria-label="Increase">+</button></span>
            <strong>${inr(p.price * i.qty)}</strong>
          </div>
          <button class="rm" data-q="${p.id}" data-a="rm">Remove</button>
        </div>
      </div>`; }).join('');
    const total = items.reduce((s, i) => { const p = G.byId(i.id); return p ? s + p.price * i.qty : s; }, 0);
    const urls = items.map(i => { const p = G.byId(i.id); return p ? p.url : null; }).filter(Boolean);
    cFoot.innerHTML = `
      <div class="subtotal"><span>Subtotal</span><span>${inr(total)}</span></div>
      <p class="scart-note">Easy EMI available at checkout on golens.in. Installation quoted separately for your location.</p>
      <button class="btn-s btn-dark" id="gsCheckout">Checkout on golens.in</button>
      <a class="btn-s" style="border:1.5px solid #ddd" href="${wa('Hi Golens! I need help completing my order.')}" target="_blank" rel="noopener">Order with help on WhatsApp</a>`;
    cFoot.querySelector('#gsCheckout').addEventListener('click', () => {
      track('begin_checkout', { value: total, items: items.length });
      urls.slice(0, 3).forEach((u, k) => setTimeout(() => window.open(u, '_blank', 'noopener'), k * 400));
    });
  }
  document.addEventListener('click', e => {
    if (e.target.closest('#gsCartBtn')) { openCart(); track('cart_open'); }
    if (e.target.closest('#gsCartClose') || e.target === dim) closeCart();
    const b = e.target.closest('[data-add]');
    if (b) add(b.dataset.add);
    const q = e.target.closest('[data-q]');
    if (q) {
      const id = q.dataset.q, it = items.find(i => i.id === id), a = q.dataset.a;
      if (!it) return;
      if (a === 'inc') it.qty++;
      if (a === 'dec') it.qty = Math.max(1, it.qty - 1);
      if (a === 'rm') items = items.filter(i => i.id !== id);
      save();
    }
    const w = e.target.closest('[data-wa]');
    if (w) { window.open(wa(w.dataset.wa), '_blank', 'noopener'); track('whatsapp_click', { source: w.dataset.waSource || 'generic' }); }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { so.classList.remove('is-open'); closeCart(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); document.getElementById('gsSearchBtn') && document.getElementById('gsSearchBtn').click(); }
  });
  renderCart();

  /* ---------- TOAST ---------- */
  let tt;
  const toastEl = document.createElement('div');
  toastEl.className = 'toast-s';
  toastEl.setAttribute('role', 'status');
  document.body.appendChild(toastEl);
  function toast(msg) {
    toastEl.innerHTML = IC.check + msg;
    toastEl.classList.add('on');
    clearTimeout(tt);
    tt = setTimeout(() => toastEl.classList.remove('on'), 2400);
  }

  /* ---------- CARD BUILDER ---------- */
  window.Gcard = function (p) {
    const off = p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0;
    const chips = (p.access || []).slice(0, 2).map(a => window.ACCESS_LABEL[a]).filter(Boolean);
    if (p.camera) chips.push('Camera');
    if (p.wifi) chips.push('Wi-Fi');
    const tag = p.soldOut ? '<span class="tag grey">Sold out</span>'
      : p.badge === 'flagship' ? '<span class="tag red">Flagship</span>'
      : p.badge === 'new' ? '<span class="tag red">New</span>'
      : p.badge === 'advanced' ? '<span class="tag">Most Advanced</span>'
      : off >= 70 ? `<span class="tag green">${off}% OFF</span>` : '';
    return `<article class="fcard">
      <a class="ph" href="product.html?p=${p.id}" aria-label="${p.name}">${tag}<img src="${p.image}" alt="${p.name}${p.line ? ' ' + p.line : ''}" loading="lazy"></a>
      <div class="body">
        <h3>${p.name}${p.line ? ` <span style="font-weight:600;color:#777;font-size:13px">· ${p.line}</span>` : ''}</h3>
        <p class="desc">${p.subtitle}</p>
        <div class="chips">${chips.map(c => `<span class="chip">${c}</span>`).join('')}</div>
        <div class="price-row"><span class="price">${inr(p.price)}</span>${p.mrp ? `<s>${inr(p.mrp)}</s>` : ''}</div>
      </div>
      <div class="actions">
        ${p.soldOut
          ? `<a class="btn-s" style="border:1.5px solid #ddd" href="${p.url}" target="_blank" rel="noopener">View</a>`
          : `<button class="btn-s btn-dark" data-add="${p.id}">Add to cart</button>
             <a class="btn-s" style="border:1.5px solid #ddd" href="product.html?p=${p.id}">Details</a>`}
      </div>
    </article>`;
  };

  /* ---------- REVEALS ---------- */
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .08 });
  window.Greveal = root => (root || document).querySelectorAll('[data-rv]:not(.in)').forEach(el => io.observe(el));
  document.addEventListener('DOMContentLoaded', () => window.Greveal());
})();
