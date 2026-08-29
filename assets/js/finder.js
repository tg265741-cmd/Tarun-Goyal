/* ============================================================
   GOLENS — FIND MY LOCK
   A real decision engine. Each lock in the catalogue is scored
   against the customer's answers. No single flagship bias:
   glass answers route to glass locks, budget answers gate
   expensive ones, priorities re-weight features.
   ============================================================ */
(function () {
  'use strict';
  const G = window.GOLENS;
  const icon = window.Gicon;
  const inr = window.Gfmt.inr;
  const stage = document.getElementById('finderStage');
  const stepsEl = document.getElementById('finderSteps');

  window.Gtrack('find_my_lock_start');

  const answers = { door: null, material: null, access: [], priority: null, budget: null, install: null };
  let step = 0;

  const QUESTIONS = [
    {
      key: 'door', title: 'Which door is this for?', sub: 'The door decides the lock family first.',
      options: [
        { v: 'main', t: 'Main entrance', s: 'Home or apartment front door' },
        { v: 'glass', t: 'Glass door', s: 'Cabin, office or shower-style glass' },
        { v: 'room', t: 'Bedroom / interior', s: 'Rooms, studios, inner offices' },
        { v: 'office', t: 'Office / commercial', s: 'Workplace entry doors' }
      ]
    },
    {
      key: 'material', title: 'What is the door made of?', sub: 'Material changes what can be fitted.',
      options: [
        { v: 'wood', t: 'Wood', s: 'Solid wood, flush, teak' },
        { v: 'metal', t: 'Metal or steel', s: 'MS / steel shutters, aluminium' },
        { v: 'glass', t: 'Glass', s: 'Tempered glass, 8–12 mm typical' },
        { v: 'unsure', t: "I'm not sure", s: "We'll help you check" }
      ]
    },
    {
      key: 'access', title: 'How do you want to get in?', sub: 'Pick everything you like — the more you pick, the smarter the match.', multi: true,
      options: [
        { v: 'face', t: 'Face recognition', s: 'Walk up hands-free' },
        { v: 'fp', t: 'Fingerprint', s: 'One touch, instant' },
        { v: 'app', t: 'Phone app / remote', s: 'Wi-Fi control from anywhere' },
        { v: 'camera', t: 'See visitors', s: 'Camera built into the lock' },
        { v: 'simple', t: 'Keep it simple', s: 'PIN / card / key is enough for me' }
      ]
    },
    {
      key: 'priority', title: 'What matters most?', sub: 'This re-weights the scoring.',
      options: [
        { v: 'security', t: 'Maximum security', s: 'Camera, alerts, everything watching' },
        { v: 'convenience', t: 'Convenience', s: 'Fast, hands-free daily entry' },
        { v: 'value', t: 'Value', s: 'The most lock for the money' },
        { v: 'design', t: 'Design statement', s: 'The lock should look premium' }
      ]
    },
    {
      key: 'budget', title: 'Comfortable budget?', sub: 'Honest ranges — we stay inside them.',
      options: [
        { v: '8', t: 'Under ₹8,000', s: 'Essential smart security' },
        { v: '15', t: 'Under ₹15,000', s: 'Face ID and cameras enter range' },
        { v: '25', t: 'Under ₹25,000', s: 'Flagship territory' },
        { v: 'any', t: 'Best fit, any budget', s: 'Recommend what truly fits' }
      ]
    },
    {
      key: 'install', title: 'Installation plans?', sub: 'Every Golens lock can be expert-installed or fitted by any carpenter.',
      options: [
        { v: 'expert', t: 'Arrange expert fitting', s: 'Golens-arranged, paid, from ₹1,200' },
        { v: 'carpenter', t: 'My carpenter will fit', s: 'Template and hardware included' },
        { v: 'unsure', t: 'Not sure yet', s: "We'll explain both options" }
      ]
    }
  ];

  const LABELS = { total: QUESTIONS.length };

  function renderSteps() {
    stepsEl.innerHTML = QUESTIONS.map((q, i) => {
      const cls = i === step ? 'is-now' : answers[q.key] !== null && answers[q.key] !== [] && (answers[q.key] || []).length ? 'is-done' : i < step ? 'is-done' : '';
      return `${i ? '<span class="fstep-line"></span>' : ''}
        <span class="fstep ${cls}"><span class="n">${i < step ? '✓' : i + 1}</span>${q.key}</span>`;
    }).join(' ');
  }

  function renderQuestion() {
    const q = QUESTIONS[step];
    renderSteps();
    stage.innerHTML = `
      <div data-reveal style="opacity:0" class="qcard">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:1rem;margin-bottom:1.2rem">
          <h2 class="display d-2">${q.title}</h2>
          <span class="mono-chip" style="color:var(--on-ink-2)">Q${step + 1} / ${QUESTIONS.length}</span>
        </div>
        <p style="color:var(--on-ink-2);margin-bottom:1.2rem">${q.sub}</p>
        <div class="option-cards" role="group" aria-label="${q.title}">
          ${q.options.map(o => `
            <button class="option-card" data-val="${o.v}" aria-pressed="${q.multi && (answers[q.key] || []).includes(o.v)}">
              <strong>${o.t}</strong><span>${o.s}</span><span class="tick"></span>
            </button>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:1.4rem">
          ${step > 0 ? '<button class="btn btn-ghost btn-sm" id="qBack">← Back</button>' : '<span></span>'}
          ${q.multi ? '<button class="btn btn-bronze" id="qNext">Continue →</button>' : '<span></span>'}
        </div>
      </div>`;
    const card = stage.querySelector('[data-reveal]');
    requestAnimationFrame(() => card.classList.add('is-in'));

    stage.querySelectorAll('.option-card').forEach(b => {
      b.addEventListener('click', () => {
        const v = b.dataset.val;
        if (q.multi) {
          const arr = answers[q.key] || [];
          const i = arr.indexOf(v);
          if (i >= 0) arr.splice(i, 1); else arr.push(v);
          answers[q.key] = arr;
          b.setAttribute('aria-pressed', arr.includes(v));
        } else {
          answers[q.key] = v;
          stage.querySelectorAll('.option-card').forEach(x => x.setAttribute('aria-pressed', 'false'));
          b.setAttribute('aria-pressed', 'true');
          setTimeout(next, rm() ? 0 : 260);
        }
      });
    });
    const back = stage.querySelector('#qBack');
    if (back) back.addEventListener('click', () => { step--; renderQuestion(); });
    const nx = stage.querySelector('#qNext');
    if (nx) nx.addEventListener('click', next);
  }
  function rm() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

  function next() {
    const q = QUESTIONS[step];
    if (q.multi && !(answers[q.key] || []).length) { answers[q.key] = ['simple']; }
    step++;
    if (step >= QUESTIONS.length) finish();
    else renderQuestion();
  }

  /* ================= THE SCORING ENGINE ================= */
  function scoreLock(p, a) {
    let s = 0; const why = [];
    const acc = p.access || [];

    /* Door family — hard gate */
    if (a.door === 'glass') {
      if (p.family !== 'glass') return null;
      s += 30; why.push('Built specifically for glass doors');
    } else {
      if (p.family === 'glass') return null;                 /* glass locks on wooden doors = bad advice */
      if ((p.door || []).includes(a.door)) { s += 26; why.push(`Rated for ${a.door === 'main' ? 'main entrance' : a.door === 'room' ? 'interior' : 'commercial'} doors`); }
      else if (a.door === 'office' && (p.door || []).includes('main')) { s += 14; why.push('Suitable for workplace entry doors'); }
      else return null;
    }

    /* Material agreement */
    if (a.material === 'glass' && p.family === 'glass') { s += 10; }
    if (a.material === 'metal' && (p.material || []).some(m => m === 'metal' || m === 'steel')) { s += 8; why.push('Rated for metal / steel doors'); }
    if (a.material === 'wood' && (p.material || []).includes('wood')) { s += 8; why.push('Fits standard wooden doors'); }

    /* Access desires */
    const wants = a.access || [];
    if (wants.includes('face')) {
      if (acc.includes('face3d')) { s += 18; why.push('3D Face ID — hands-free entry'); }
      else if (acc.some(x => x.startsWith('face'))) { s += 13; why.push('Face recognition unlock'); }
      else return null;                                       /* they asked for face; don't sell them less */
    }
    if (wants.includes('fp')) {
      if (acc.includes('fp')) { s += 12; why.push('Fingerprint unlock in 0.3 s'); }
      else return null;
    }
    if (wants.includes('app')) {
      if (p.wifi) { s += 14; why.push('Wi-Fi + app: remote unlock, OTP, notifications'); }
      else if (p.bt) { s += 5; why.push('Bluetooth app control near the door'); }
      else return null;
    }
    if (wants.includes('camera')) {
      if (p.camera) { s += 16; why.push('Built-in camera to see visitors'); }
      else return null;
    }
    if (wants.includes('simple')) { s += 4; why.push('Simple PIN / card / key access'); }

    /* Priority re-weighting */
    if (a.priority === 'security') {
      if (p.camera) { s += 12; why.push('Camera adds an extra layer of awareness'); }
      if (acc.includes('face3d')) s += 6;
      if (p.wifi) s += 6;
      if (p.badge === 'advanced') s += 6;
    }
    if (a.priority === 'convenience') {
      if (acc.includes('face3d')) { s += 10; }
      if (acc.includes('fp')) s += 5;
      if (p.lcd) s += 3;
    }
    if (a.priority === 'value') {
      s += Math.max(0, 14 - p.price / 1600);                  /* cheaper ranks higher, gently */
      if (p.mrp) { s += 3; }
    }
    if (a.priority === 'design') {
      if (['x57', 'vintage', 'x95g', 'x28b', 'ultraedge'].includes(p.id)) { s += 9; why.push('A finish and presence worth showing off'); }
      if (p.body && /alloy/i.test(p.body)) s += 4;
    }

    /* Budget gate (soft floor, hard ceiling) */
    const cap = a.budget === 'any' ? Infinity : +a.budget * 1000;
    if (p.price > cap * 1.06) return null;                    /* don't upsell past stated comfort */
    if (a.budget !== 'any') { s += Math.max(0, 8 - (cap - p.price) / 900); }

    /* Slight flagship tilt only when everything else is equal */
    if (p.badge === 'flagship') s += 2;

    /* Sold-out items can't be bought today */
    if (p.soldOut) s -= 25;

    return { score: s, why: why.slice(0, 4) };
  }

  function finish() {
    window.Gtrack('find_my_lock_complete', { door: answers.door, priority: answers.priority, budget: answers.budget });
    const ranked = G.locks()
      .map(p => { const r = scoreLock(p, answers); return r ? { p, score: r.score, why: r.why } : null; })
      .filter(Boolean)
      .sort((x, y) => y.score - x.score);

    renderSteps();
    stage.innerHTML = '';
    const sec = document.getElementById('resultSection');
    const resetSec = document.getElementById('resetSection');
    sec.hidden = false; resetSec.hidden = false;
    const mount = document.getElementById('resultMount');

    if (!ranked.length) {
      mount.innerHTML = `
        <div class="result-hero" style="grid-template-columns:1fr">
          <div style="padding:1rem">
            <span class="match-score">EXPERT ROUTE</span>
            <h2 class="display d-2" style="margin:.8rem 0 .5rem">Your door needs a human eye.</h2>
            <p class="lede">Your combination is unusual — and we don't guess. Send a photo of your door and a Golens expert will confirm exactly what fits, usually the same day.</p>
            <div style="display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1.2rem">
              <button class="btn btn-bronze" data-wa="Hi Golens! Find My Lock couldn't auto-match my door — here's a photo." data-wa-source="finder_nomatch">Send a door photo</button>
              <a class="btn btn-ghost" href="locks.html">Browse the full range</a>
            </div>
          </div>
        </div>`;
      sec.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const best = ranked[0];
    const alts = ranked.slice(1, 3);
    const matchPct = Math.min(97, Math.round(60 + best.score / 1.4));

    mount.innerHTML = `
      <div class="result-hero" data-reveal>
        <a class="media" href="product.html?p=${best.p.id}"><img src="${best.p.image}" alt="${best.p.name}"></a>
        <div>
          <span class="match-score">${icon('check')} ${matchPct}% match</span>
          <h2 class="display d-1" style="margin:.9rem 0 .3rem">Your best match: ${best.p.name}${best.p.line ? ' · ' + best.p.line : ''}</h2>
          <p style="color:var(--on-ink-2);max-width:52ch">${best.p.subtitle}</p>
          <ul class="why-list">
            ${best.why.map(w => `<li>${icon('check')}<span>${w}</span></li>`).join('')}
          </ul>
          <div class="spec-row" style="display:flex;gap:2.2rem;margin-top:1.1rem">
            <div><strong style="font-family:var(--font-display);font-size:1.6rem;color:var(--bronze-1)">${inr(best.p.price)}</strong>${best.p.mrp ? `<s style="font-size:.8rem;color:var(--on-ink-2);display:block">${inr(best.p.mrp)}</s>` : ''}<span class="mono-chip" style="color:var(--on-ink-2)">Price today</span></div>
            <div><strong style="font-family:var(--font-display);font-size:1.6rem;color:var(--bronze-1)">${best.p.warranty} yr</strong><span class="mono-chip" style="color:var(--on-ink-2)">Warranty</span></div>
            <div><strong style="font-family:var(--font-display);font-size:1.6rem;color:var(--bronze-1)">${(best.p.access || []).length} ways</strong><span class="mono-chip" style="color:var(--on-ink-2)">To unlock</span></div>
          </div>
          <div style="display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1.4rem">
            <a class="btn btn-bronze" href="product.html?p=${best.p.id}" data-event="cta_click" data-event-params='{"cta":"finder_result_buy"}'>Explore &amp; buy</a>
            <a class="btn btn-ghost" href="compare.html?ids=${[best.p.id].concat(alts.map(a => a.p.id)).join(',')}">Compare with alternatives</a>
            <button class="btn btn-ghost" data-wa="Hi Golens! Find My Lock recommended the ${best.p.name} for my ${answers.door} door — can you double-check?" data-wa-source="finder_result">Talk to an expert</button>
          </div>
        </div>
      </div>

      ${alts.length ? `
      <div style="margin-top:2.5rem">
        <p class="eyebrow" style="margin-bottom:1.2rem">Also strong for you</p>
        <div class="grid-products">
          ${alts.map(a => window.Gcard(a.p)).join('')}
        </div>
      </div>` : ''}

      <p style="font-size:.8rem;color:var(--on-ink-2);margin-top:1.6rem;max-width:70ch">Match percentage reflects how well this lock's published features fit your answers — it is guidance, not a guarantee. Final fit always confirmed against your door (thickness, material, existing bore holes) before or after you order.</p>
    `;
    window.GobserveReveals(mount);
    document.getElementById('restartBtn').addEventListener('click', () => location.reload());
    sec.scrollIntoView({ behavior: rm() ? 'auto' : 'smooth' });
  }

  renderQuestion();
})();
