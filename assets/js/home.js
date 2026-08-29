/* ============================================================
   GOLENS — HOME RUNTIME
   Hero timeline (door → auth → unlock) · category portals ·
   best-sellers · more-security rails · flagship launch scrub
   ============================================================ */
(function () {
  'use strict';
  const G = window.GOLENS;
  const icon = window.Gicon;
  const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* inject dynamic icons in static markup */
  document.querySelectorAll('[data-icon]').forEach(el => {
    el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon));
  });
  const arrow = document.getElementById('heroArrow');
  if (arrow) arrow.innerHTML = icon('arrow');
  const fl = document.getElementById('floatLockIcon');
  if (fl) fl.innerHTML = icon('lockOpen');

  /* ---------- HERO TIMELINE ---------- */
  const hero = document.getElementById('hero');
  if (hero) {
    const statusText = document.getElementById('heroStatusText');
    const lockLabel = document.getElementById('floatLockLabel');
    const seq = rm
      ? [['Recognised', 0], ['Welcome home', 0]]
      : [['Recognising you…', 400], ['Face confirmed', 2200], ['Access granted', 3600]];
    requestAnimationFrame(() => requestAnimationFrame(() => {
      hero.classList.add('is-awake');
      seq.forEach(([txt, t], i) => setTimeout(() => {
        if (statusText) statusText.textContent = txt;
        if (i === seq.length - 1) {
          hero.classList.add('is-auth', 'is-open');
          if (lockLabel) lockLabel.textContent = 'Unlocked — welcome';
        }
      }, t));
    }));
    trackHero();
  }
  function trackHero() {
    window.Gtrack('hero_view');
  }

  /* ---------- CATEGORY PORTALS ---------- */
  const portals = [
    { key: 'main', title: 'Main Doors', copy: 'Face ID, cameras and full-power security for the door that matters most.', cta: 'Main door locks', href: 'locks.html?f=main', img: 'assets/img/door-main.jpg', from: 6890 },
    { key: 'glass', title: 'Glass Doors', copy: 'Frameless cabins and office fronts, 8–12 mm — fitted without drilling.', cta: 'Glass door locks', href: 'locks.html?f=glass', img: 'assets/img/door-glass.jpg', from: 7590 },
    { key: 'room', title: 'Rooms & Interior', copy: 'Bedrooms, studios and offices — slim, quiet, fingerprint-first.', cta: 'Room locks', href: 'locks.html?f=room', img: 'assets/img/door-room.jpg', from: 6890 },
    { key: 'cabinet', title: 'Cabinets & Drawers', copy: 'The Qidots series: invisible locks for wardrobes, drawers, lockers.', cta: 'Cabinet locks', href: G.COLLECTIONS.cabinet.url, img: 'assets/img/cabinet.jpg', from: 1249 }
  ];
  const catGrid = document.getElementById('catGrid');
  if (catGrid) {
    catGrid.innerHTML = portals.map((p, i) => `
      <a class="portal" href="${p.href}" data-reveal style="--reveal-delay:${i * 0.08}s" data-event="portal_click" data-event-params='{"portal":"${p.key}"}'>
        <img src="${p.img}" alt="${p.title} environment" loading="lazy">
        <div class="portal-body">
          <span class="mono-chip">${p.key === 'cabinet' ? 'QIDOTS SERIES' : 'SHOP BY DOOR'}</span>
          <h3>${p.title}</h3>
          <p>${p.copy}</p>
          <span style="font-family:var(--font-mono);font-size:.7rem;color:var(--bronze-1)">FROM ₹${p.from.toLocaleString('en-IN')}</span>
          <span class="link-arrow">${p.cta} ${icon('arrow')}</span>
        </div>
      </a>`).join('');
    window.GobserveReveals(catGrid);
  }

  /* ---------- ACCESS RAIL ---------- */
  const rail = document.getElementById('accessRail');
  if (rail) {
    const methods = [
      { k: 'face3d', t: '3D Face', s: 'HANDS-FREE' },
      { k: 'fp', t: 'Fingerprint', s: '0.3 SECONDS' },
      { k: 'pin', t: 'PIN', s: 'ANTI-PEEP' },
      { k: 'card', t: 'RFID Card', s: 'TAP IN' },
      { k: 'otp', t: 'OTP', s: 'ONE-TIME' },
      { k: 'app', t: 'Phone App', s: 'iOS · ANDROID' },
      { k: 'camera', t: 'Door Camera', s: 'SEE VISITORS' },
      { k: 'key', t: 'Key', s: 'ALWAYS BACKUP' }
    ];
    const tileHref = { camera: 'locks.html?f=camera', card: 'locks.html?f=rfid', key: 'locks.html' };
    rail.innerHTML = methods.map((m, i) => `
      <a class="access-tile" href="${tileHref[m.k] || 'locks.html?f=' + m.k}" data-reveal style="--reveal-delay:${i * 0.05}s">
        ${icon(m.k === 'card' ? 'card' : m.k === 'otp' ? 'otp' : m.k)}
        <strong>${m.t}</strong><span>${m.s}</span>
      </a>`).join('');
    window.GobserveReveals(rail);
  }

  /* ---------- BEST SELLERS ---------- */
  const best = ['x95', 'x37', 'x28', 'titan', 'x3n', 'shieldface'];
  const bestGrid = document.getElementById('bestGrid');
  if (bestGrid) {
    bestGrid.innerHTML = best.map(id => window.Gcard(G.byId(id))).join('');
    window.GobserveReveals(bestGrid);
  }

  /* ---------- MORE SECURITY ---------- */
  const more = ['wc22k', 'db1', 'am05e', 't10g2c', 'wc23k', 'am03e'];
  const moreGrid = document.getElementById('moreGrid');
  if (moreGrid) {
    moreGrid.innerHTML = more.map(id => window.Gcard(G.byId(id))).join('');
    window.GobserveReveals(moreGrid);
  }

  /* ---------- FLAGSHIP LAUNCH SCRUB ---------- */
  const launch = document.getElementById('launch');
  if (launch) {
    const steps = launch.querySelectorAll('.launch-step');
    const prog = document.getElementById('launchProgress');
    const img = document.getElementById('launchImg');
    let current = -1;

    prog.innerHTML = Array.from(steps).map((_, i) =>
      `<button role="tab" aria-label="Chapter ${i + 1}" data-i="${i}" aria-selected="false"></button>`).join('');
    const dots = prog.querySelectorAll('button');
    dots.forEach(d => d.addEventListener('click', () => {
      const target = launch.offsetTop + ((+d.dataset.i + 0.5) / steps.length) * launch.offsetHeight;
      window.scrollTo({ top: target, behavior: rm ? 'auto' : 'smooth' });
    }));

    /* visual treatments per chapter — subtle product transformations */
    const visuals = [
      { scale: 1, rot: 0, y: 0 },        // hero
      { scale: 1.08, rot: -2.5, y: -12 },// face (leans toward sensor)
      { scale: 1.03, rot: 1.5, y: 26 },  // fingerprint (lower third)
      { scale: 1.12, rot: 0, y: -30 },   // camera (top)
      { scale: 1.0, rot: -1, y: 0 },     // app
      { scale: 1.05, rot: 2, y: 8 },     // security
      { scale: 1, rot: 0, y: 0 }         // buy
    ];
    function setStep(i) {
      if (i === current) return;
      current = i;
      steps.forEach((s, j) => s.classList.toggle('is-active', j === i));
      dots.forEach((d, j) => { d.classList.toggle('is-on', j <= i); d.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
      const v = visuals[Math.min(i, visuals.length - 1)];
      if (!rm) img.style.transform = `scale(${v.scale}) rotate(${v.rot}deg) translateY(${v.y}px)`;
      if (i === steps.length - 1) window.Gtrack('launch_complete');
    }
    setStep(0);

    function onScroll() {
      const rect = launch.getBoundingClientRect();
      const total = launch.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      const idx = Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999));
      setStep(idx);
    }
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
    }, { passive: true });
    onScroll();
  }
})();
