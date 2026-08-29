/* ============================================================
   GOLENS — PDP RUNTIME
   Gallery · hotspots · decision module · compatibility checker ·
   specs · FAQ · related · sticky buy bar · JSON-LD
   ============================================================ */
(function () {
  'use strict';
  const G = window.GOLENS;
  const icon = window.Gicon;
  const inr = window.Gfmt.inr;
  const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pid = new URLSearchParams(location.search).get('p') || 'x95';
  const P = G.byId(pid) || G.byId('x95');
  const isX95 = P.id === 'x95' || P.id === 'x95g';

  document.title = `${P.name}${P.line ? ' ' + P.line : ''} — ${P.subtitle} | Golens`;
  document.querySelector('link[rel="canonical"]').href = P.url;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.content = `${P.name}: ${P.subtitle}. ₹${P.price.toLocaleString('en-IN')} on the official Golens store. ${P.warranty}-year warranty, expert installation support.`;

  /* ---------- JSON-LD product schema (real data only) ---------- */
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Product',
    name: `${P.name}${P.line ? ' ' + P.line : ''}`,
    description: P.subtitle,
    image: [P.image],
    brand: { '@type': 'Brand', name: 'Golens' },
    offers: { '@type': 'Offer', url: P.url, priceCurrency: 'INR', price: P.price, availability: P.soldOut ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock' }
  });
  document.head.appendChild(ld);
  window.Gtrack('product_view', { item: P.id });

  /* ---------- breadcrumb ---------- */
  document.getElementById('crumbName').textContent = P.name;

  /* ---------- GALLERY ---------- */
  const gImg = document.getElementById('galleryImg');
  const gThumbs = document.getElementById('galleryThumbs');
  const gBadges = document.getElementById('galleryBadges');
  const shots = (P.gallery && P.gallery.length ? P.gallery : [P.image]);
  let gi = 0;
  gImg.src = shots[0];
  gImg.alt = `${P.name} ${P.line || ''} — view 1`;
  const off = P.mrp ? Math.round((1 - P.price / P.mrp) * 100) : 0;
  gBadges.innerHTML = (P.badge === 'flagship' ? '<span class="badge">Flagship</span>' : P.badge === 'new' ? '<span class="badge">New</span>' : '') +
    (off ? `<span class="badge save">−${off}%</span>` : '') + (P.soldOut ? '<span class="badge out">Sold out</span>' : '');
  gThumbs.innerHTML = shots.map((s, i) =>
    `<button role="tab" aria-selected="${i === 0}" aria-label="Image ${i + 1}" data-i="${i}"><img src="${s.replace('width=1200', 'width=200')}" alt="" loading="lazy"></button>`).join('');
  gThumbs.addEventListener('click', e => {
    const b = e.target.closest('button[data-i]'); if (!b) return;
    gi = +b.dataset.i;
    gImg.style.opacity = '.25';
    setTimeout(() => { gImg.src = shots[gi]; gImg.alt = `${P.name} — view ${gi + 1}`; gImg.style.opacity = '1'; }, rm ? 0 : 160);
    gThumbs.querySelectorAll('button').forEach(t => t.setAttribute('aria-selected', t === b ? 'true' : 'false'));
    window.Gtrack('gallery_change', { item: P.id, index: gi });
  });
  gImg.style.transition = 'opacity .35s ease';

  /* swipe on mobile */
  let sx = null;
  gImg.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
  gImg.addEventListener('touchend', e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) {
      gi = (gi + (dx < 0 ? 1 : -1) + shots.length) % shots.length;
      gImg.src = shots[gi];
      gThumbs.querySelectorAll('button').forEach(t => t.setAttribute('aria-selected', +t.dataset.i === gi ? 'true' : 'false'));
    }
    sx = null;
  }, { passive: true });

  /* ---------- INFO ---------- */
  document.getElementById('pdpEyebrow').textContent = P.category === 'lock'
    ? (P.family === 'glass' ? 'Smart glass lock' : P.family === 'room' ? 'Interior smart lock' : 'Main door smart lock')
    : 'Golens security';
  document.getElementById('pdpTitle').textContent = `${P.name}${P.line ? ' · ' + P.line : ''}`;
  document.getElementById('pdpSub').textContent = P.subtitle + '. ' + (P.bestFor || '');
  document.getElementById('pdpPrice').textContent = inr(P.price);
  document.getElementById('pdpMrp').textContent = P.mrp ? inr(P.mrp) : '';
  const save = document.getElementById('pdpSave');
  if (P.mrp) { save.style.display = ''; save.textContent = `SAVE ${inr(P.mrp - P.price)}`; }

  const buyBtn = document.getElementById('buyNow');
  const addBtn = document.getElementById('addCart');
    if (P.soldOut) {
    buyBtn.textContent = 'Notify me on golens.in';
    buyBtn.addEventListener('click', () => window.open(P.url, '_blank', 'noopener'));
    addBtn.style.display = 'none';
  } else {
    buyBtn.addEventListener('click', () => { window.Gcart.add(P.id); window.Gdrawer.close(); window.open(P.url, '_blank', 'noopener'); });
    addBtn.addEventListener('click', () => window.Gcart.add(P.id));
  }

  /* assist row */
  const assists = [
    { i: 'shield', t: `${P.warranty}-year warranty`, s: 'Standard Golens warranty, claims handled directly' },
    { i: 'tools', t: 'Installation support', s: 'Expert fitting arranged, or any carpenter can fit' },
    { i: 'wa', t: 'WhatsApp an expert', s: 'Ask anything about this lock before you buy', wa: `Hi Golens! I'm looking at the ${P.name} (${P.line || P.subtitle}) and have a question.` },
    { i: 'headset', t: 'Video-call guidance', s: 'Live setup help from Golens specialists' }
  ];
  document.getElementById('assistRow').innerHTML = assists.map(a =>
    `<${a.wa ? 'button' : 'div'} class="assist" ${a.wa ? `data-wa="${a.wa}" data-wa-source="pdp_assist"` : ''}>${icon(a.i)}<span><strong>${a.t}</strong><span>${a.s}</span></span></${a.wa ? 'button' : 'div'}>`).join('');

  /* decision module */
  const acc = () => (P.access || []).map(a => window.ACCESS_LABEL[a] && window.ACCESS_LABEL[a].label).filter(Boolean);
  document.getElementById('decisionGrid').innerHTML = `
    <div class="decision-cell"><span class="mono-chip">Best for</span><p style="font-size:.9rem">${P.bestFor || 'Modern homes and workplaces'}</p></div>
    <div class="decision-cell"><span class="mono-chip">Ways in</span><ul>${acc().map(a => `<li>${a}</li>`).join('') || '<li>App + live view</li>'}</ul></div>
    <div class="decision-cell"><span class="mono-chip">Smart features</span><ul>${[P.wifi ? 'Wi-Fi remote layer' : null, P.camera ? 'Built-in camera' : null, P.bt ? 'Bluetooth' : null, P.lcd ? 'LCD display' : null].filter(Boolean).map(x => `<li>${x}</li>`).join('') || '<li>Standalone security</li>'}</ul></div>
    <div class="decision-cell"><span class="mono-chip">Installation</span><p style="font-size:.9rem">${P.install || 'Expert paid installation, or any carpenter.'}</p></div>`;

  /* ---------- HOTSPOTS (X95-family detail; graceful elsewhere) ---------- */
  const hsWrap = document.getElementById('hotspotFigure');
  const hsImg = document.getElementById('hotspotImg');
  const hotspots = isX95 ? [
    { x: 50, y: 12, t: '3D Face sensor', d: 'Maps your face in three dimensions and recognises you even in low light — the hands-free way in.' },
    { x: 50, y: 26, t: '161° camera', d: 'Wide-angle camera with a built-in doorbell. See visitors on your phone and capture who came.' },
    { x: 50, y: 45, t: '4″ LCD display', d: 'Check status, visitors and settings at a glance — intuitive for every family member.' },
    { x: 50, y: 62, t: 'Fingerprint scanner', d: 'Up to 150 fingerprints, recognised in 0.3 s with 99.99% accuracy.' },
    { x: 50, y: 80, t: 'Emergency backup', d: 'USB emergency power from any power bank, plus a mechanical key kept as the final backup.' }
  ] : [
    { x: 50, y: 30, t: 'Biometric sensor', d: 'Fingerprint recognition for fast, personal entry.' },
    { x: 50, y: 55, t: 'Keypad / reader', d: 'PIN and RFID card access for family and staff.' },
    { x: 50, y: 78, t: 'Mechanical backup', d: 'Key override keeps you in control whatever happens.' }
  ];
  hsImg.src = shots[0];
  hsImg.alt = `${P.name} hardware details`;
  hotspots.forEach((h, i) => {
    const b = document.createElement('button');
    b.className = 'hotspot';
    b.style.left = h.x + '%'; b.style.top = h.y + '%';
    b.style.transform = 'translate(-50%,-50%)';
    b.setAttribute('aria-expanded', 'false');
    b.setAttribute('aria-label', h.t);
    const pop = document.createElement('div');
    pop.className = 'hotspot-pop';
    pop.style.left = 'calc(' + h.x + '% + 34px)';
    pop.style.top = h.y + '%';
    pop.style.transform = 'translateY(-50%)';
    pop.innerHTML = `<strong>${h.t}</strong><p>${h.d}</p>`;
    const toggle = () => {
      const open = pop.classList.toggle('is-open');
      b.setAttribute('aria-expanded', open);
      hsWrap.querySelectorAll('.hotspot-pop.is-open').forEach(p => { if (p !== pop) p.classList.remove('is-open'); });
      hsWrap.querySelectorAll('.hotspot[aria-expanded="true"]').forEach(x => { if (x !== b) x.setAttribute('aria-expanded', 'false'); });
      if (open) window.Gtrack('hotspot_open', { item: P.id, hotspot: h.t });
    };
    b.addEventListener('click', e => { e.stopPropagation(); toggle(); });
    hsWrap.appendChild(b); hsWrap.appendChild(pop);
  });
  document.addEventListener('click', () => hsWrap.querySelectorAll('.hotspot-pop.is-open').forEach(p => p.classList.remove('is-open')));

  /* ---------- STORY ---------- */
  const stories = [
    { img: 'assets/img/life-arrival.jpg', k: 'SCENARIO · ARRIVING', t: 'Walk up recognised', d: `Arrive with bags, a child, a phone to your ear — ${acc().includes('3D Face') || acc().includes('Face') ? 'the lock recognises you and gives way' : 'fingerprint or card gets you in a fraction of a second'}. No keys to hunt for.` },
    { img: 'assets/img/travel-remote.jpg', k: 'SCENARIO · AWAY', t: 'The door reports to you', d: P.wifi ? 'Over Wi-Fi, the app shows lock status and entry history, and can unlock remotely for someone you trust.' : 'Every entry is logged on the lock, and mechanical backup means you are never locked out.' },
    { img: 'assets/img/door-main.jpg', k: 'SCENARIO · EVERYONE', t: 'One lock, every family member', d: `Grandparents get a ${acc().includes('RFID Card') ? 'card' : 'PIN'}, kids a fingerprint, guests a ${acc().includes('OTP') ? 'one-time password' : 'temporary code'} — everyone enters their own way, and every entry is recorded.` }
  ];
  document.getElementById('storyGrid').innerHTML = stories.map(s => `
    <article class="scenario" data-reveal>
      <img src="${s.img}" alt="" loading="lazy">
      <div class="scenario-body">
        <p class="mono-chip" style="color:var(--bronze-1)">${s.k}</p>
        <h3>${s.t}</h3>
        <p>${s.d}</p>
      </div>
    </article>`).join('');
  window.GobserveReveals();

  /* ---------- SPECS ---------- */
  const rows = [
    ['Price', inr(P.price) + (P.mrp ? ` (MRP ${inr(P.mrp)})` : '')],
    ['Access methods', acc().join(' · ') || 'App'],
    ['Wi-Fi', P.wifi ? 'Yes' + (P.id === 'x95' || P.id === 'x95g' ? ' — built in, no extra gateway' : '') : 'No'],
    ['Bluetooth', P.bt ? 'Yes' : (P.category === 'lock' ? 'No' : '—')],
    ['Camera', P.camera ? 'Integrated visitor camera' : 'Not built in'],
    ['Display', P.lcd ? 'LCD on lock' : '—'],
    ['Fingerprints', P.fingerprints || '—'],
    ['User capacity', P.users || 'Multiple users'],
    ['Battery', P.battery || 'Batteries included with lock'],
    ['Emergency access', 'Mechanical key' + (P.battery && P.battery.toLowerCase().includes('power-bank') ? ' + USB power bank' : '')],
    ['Body', P.body || '—'],
    ['Door suitability', (P.door || []).map(d => ({ main: 'Main door', glass: 'Glass door', room: 'Interior door', office: 'Office', apartment: 'Apartment' }[d] || d)).join(', ') || '—'],
    ['Door materials', (P.material || []).map(m => ({ wood: 'Wooden', metal: 'Metal', steel: 'Steel', glass: 'Tempered glass' }[m] || m)).join(', ') || '—'],
    ['Warranty', `${P.warranty} year${P.warranty > 1 ? 's' : ''} standard Golens warranty`],
    ['In the box', P.id === 'x95' ? 'Lock front panel, back panel with motorised mortise, 2 mechanical keys, 2 RFID cards, USB charging cable, fitting screws &amp; bolts, user manual' : 'Lock set, mechanical keys, fitting hardware, user manual (see live listing)']
  ];
  document.getElementById('specTable').innerHTML =
    '<tbody>' + rows.map(r => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td></tr>`).join('') + '</tbody>';

  /* ---------- INSTALL ---------- */
  document.getElementById('installList').innerHTML = [
    P.install || 'Expert paid installation available, or any carpenter can fit it.',
    'Standard fitting needs no structural changes on typical wooden doors.',
    'After installation, complimentary on-site support for concerns and smooth operation.',
    'Stuck at any point: toll-free 1800-123-7255 or WhatsApp video guidance.'
  ].map(t => `<li>${icon('check')}${t}</li>`).join('');

  /* ---------- COMPATIBILITY CHECKER ---------- */
  const matBtns = document.querySelectorAll('[data-compat="material"] .option-card');
  const thick = document.getElementById('thickRange');
  const thickVal = document.getElementById('thickVal');
  const visSlot = document.getElementById('visSlot');
  const visThick = document.getElementById('visThick');
  const res = document.getElementById('compatResult');
  const resIcon = document.getElementById('compatIcon');
  const resTitle = document.getElementById('compatTitle');
  const resBody = document.getElementById('compatBody');
  let mat = null;

  const compatState = { glass: { min: 8, max: 12 }, default: { min: 35, max: 60 } };
  const range = () => (mat === 'glass' ? compatState.glass : compatState.default);

  function updateCompat() {
    const t = +thick.value;
    thickVal.textContent = t + ' mm';
    visThick.textContent = 'THICKNESS — ' + t + ' MM';
    res.className = 'compat-result';
    visSlot.className = 'lock-slot';
    if (!mat) {
      resIcon.innerHTML = icon('door');
      resTitle.textContent = 'Tell us about your door';
      resBody.textContent = 'Pick a material and slide the thickness — we check it against this lock\'s published fit.';
      return;
    }
    /* product-specific logic */
    const isGlassLock = (P.family === 'glass');
    const r = range();
    if (mat === 'glass' && !isGlassLock) {
      res.classList.add('warn'); visSlot.classList.add('warn');
      resIcon.innerHTML = icon('tools');
      resTitle.textContent = 'This lock is not for glass';
      resBody.textContent = `The ${P.name} mounts on wooden/metal doors. For glass doors, choose a glass model — like the Golens Armor Face (8–12 mm, no drilling). We can confirm on a photo.`;
    } else if (mat !== 'glass' && isGlassLock) {
      res.classList.add('warn'); visSlot.classList.add('warn');
      resIcon.innerHTML = icon('tools');
      resTitle.textContent = 'This lock is for glass doors';
      resBody.textContent = `The ${P.name} is a glass-door lock. For wooden or metal doors, our main-door range fits better — the X95 is our most loved. We can confirm on a photo.`;
    } else if (mat === 'glass' && isGlassLock) {
      if (t >= r.min && t <= r.max) {
        res.classList.add('ok'); visSlot.classList.add('ok');
        resIcon.innerHTML = icon('check');
        resTitle.textContent = 'Likely compatible';
        resBody.textContent = `${P.name} is rated for ${r.min}–${r.max} mm glass${P.id === 'x37' ? ' (10–12 mm standard)' : ''}. Fitted without drilling. Send us a photo to confirm edge fittings.`;
      } else {
        res.classList.add('warn'); visSlot.classList.add('warn');
        resIcon.innerHTML = icon('tools');
        resTitle.textContent = 'Thickness outside rating';
        resBody.textContent = `${P.name} is rated for ${r.min}–${r.max} mm glass; you set ${t} mm. Let an expert confirm before you order.`;
      }
    } else if (mat === 'upvc') {
      res.classList.add('warn'); visSlot.classList.add('warn');
      resIcon.innerHTML = icon('tools');
      resTitle.textContent = 'Expert confirmation recommended';
      resBody.textContent = 'uPVC and mixed-material doors vary. Send a photo of the door edge on WhatsApp — we answer with a clear yes/no before you pay.';
    } else {
      const wide = P.id === 'scanxpro'; /* 30–120 published */
      const min = wide ? 30 : r.min, max = wide ? 120 : r.max;
      if (t >= min && t <= max) {
        res.classList.add('ok'); visSlot.classList.add('ok');
        resIcon.innerHTML = icon('check');
        resTitle.textContent = 'Likely compatible';
        resBody.textContent = `${t} mm ${mat === 'metal' ? 'metal/steel' : 'wooden'} door is within the ${P.name}'s published fit${wide ? ' (30–120 mm)' : ''}. Mortise fitting by any carpenter or our expert installer.`;
      } else {
        res.classList.add('warn'); visSlot.classList.add('warn');
        resIcon.innerHTML = icon('tools');
        resTitle.textContent = 'Expert confirmation recommended';
        resBody.textContent = `${t} mm is outside the typical ${min}–${max} mm range for this lock. It may still work — confirm with our expert before ordering.`;
      }
    }
  }
  matBtns.forEach(b => b.addEventListener('click', () => {
    matBtns.forEach(x => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    mat = b.dataset.val;
    /* re-scope the slider to the material's realistic range */
    if (mat === 'glass') { thick.min = 6; thick.max = 14; thick.value = 10; }
    else { thick.min = 25; thick.max = 130; thick.value = 45; }
    updateCompat();
    window.Gtrack('compatibility_check', { item: P.id, material: mat, thickness: thick.value });
  }));
  thick.addEventListener('input', () => { if (mat) updateCompat(); else { thickVal.textContent = thick.value + ' mm'; visThick.textContent = 'THICKNESS — ' + thick.value + ' MM'; } });
  updateCompat();

  /* ---------- FAQ ---------- */
  const faqs = [
    ['What if the battery dies?', 'You get low-battery alerts on the lock and (on Wi-Fi models) in the app. Even if it empties, two backups remain: momentary power from any power bank over USB, and the mechanical key. Being locked out is designed out.'],
    ['Does face recognition work at night?', `Yes${isX95 ? ' — the X95\u2019s 3D mapping is built to work in low light' : ' on models with 3D face recognition'}. Check each model\u2019s listing for the exact sensor; our team can demo it on a video call before you buy.`],
    ['Can I still use a normal key?', 'Yes — every Golens lock keeps a mechanical key as the final backup. Security plus a familiar escape hatch.'],
    ['Who do I call if anything goes wrong?', 'Golens directly: toll-free 1800-123-7255, WhatsApp +91 99829 87865, or care@golens.in — with a ' + P.warranty + '-year standard warranty on this product.']
  ];
  document.getElementById('pdpFaqList').innerHTML = faqs.map(f =>
    `<details class="faq-item"><summary>${f[0]}<span class="plus"></span></summary><p class="faq-a">${f[1]}</p></details>`).join('');

  const fld = document.createElement('script');
  fld.type = 'application/ld+json';
  fld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f[0], acceptedAnswer: { '@type': 'Answer', text: f[1] } })) });
  document.head.appendChild(fld);

  /* ---------- RELATED ---------- */
  const relIds = P.family === 'glass' ? ['armorface', 'doorsafe', 'x37'] :
                 P.family === 'room' ? ['aura', 'x39', 'instalock'] :
                 ['x95', 'x57', 'titan', 'x28', 'scanxpro', 'x3n'].filter(id => id !== P.id).slice(0, 3);
  document.getElementById('relatedGrid').innerHTML = relIds.map(id => window.Gcard(G.byId(id))).join('');
  window.GobserveReveals();

  /* ---------- STICKY BUY BAR ---------- */
  const bar = document.getElementById('buyBar');
  document.getElementById('barPrice').textContent = P.soldOut ? 'Sold out' : inr(P.price);
  document.getElementById('barName').textContent = `${P.name}${P.line ? ' · ' + P.line : ''}`;
  document.getElementById('barBuy').addEventListener('click', () => P.soldOut ? window.open(P.url, '_blank', 'noopener') : (window.Gcart.add(P.id), window.Gdrawer.close(), window.open(P.url, '_blank', 'noopener')));
  document.getElementById('barHelp').innerHTML = icon('wa');
  const infoBlock = document.querySelector('.pdp-info');
  window.addEventListener('scroll', () => {
    const past = infoBlock.getBoundingClientRect().bottom < 0;
    bar.classList.toggle('is-visible', past);
  }, { passive: true });
})();
