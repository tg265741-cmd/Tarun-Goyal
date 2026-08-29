/* ============================================================
   GOLENS — COLLECTION EXPERIENCE
   Filter engine over the real catalogue · URL param presets
   ============================================================ */
(function () {
  'use strict';
  const G = window.GOLENS;
  const grid = document.getElementById('lockGrid');
  const count = document.getElementById('filterCount');
  const empty = document.getElementById('emptyMsg');
  const state = { door: null, acc: null, feat: null, price: null };

  /* URL presets: locks.html?f=main|glass|room|face|fp|wifi|camera|rfid|otp|pin|app */
  const presetMap = {
    main: ['door', 'main'], glass: ['door', 'glass'], room: ['door', 'room'],
    face: ['acc', 'face3d'], face3d: ['acc', 'face3d'], fp: ['acc', 'fp'],
    fingerprint: ['acc', 'fp'], wifi: ['feat', 'wifi'], camera: ['feat', 'camera'],
    rfid: ['acc', 'rfid'], card: ['acc', 'rfid'], otp: ['acc', 'otp'], pin: ['acc', 'pin'],
    app: ['feat', 'wifi']
  };
  const q = new URLSearchParams(location.search).get('f');
  if (q && presetMap[q]) state[presetMap[q][0]] = presetMap[q][1];

  const chips = document.querySelectorAll('.fchip');
  chips.forEach(chip => {
    if (state[chip.dataset.group] === chip.dataset.val) chip.setAttribute('aria-pressed', 'true');
    chip.addEventListener('click', () => {
      const g = chip.dataset.group, v = chip.dataset.val;
      const on = chip.getAttribute('aria-pressed') === 'true';
      state[g] = on ? null : v;
      chips.forEach(c => { if (c.dataset.group === g) c.setAttribute('aria-pressed', 'false'); });
      if (!on) chip.setAttribute('aria-pressed', 'true');
      window.Gtrack('filter', { group: g, value: v, on: !on });
      render();
    });
  });

  function matches(p) {
    if (state.door && !(p.door || []).includes(state.door)) return false;
    if (state.acc) {
      if (state.acc === 'face3d' && !(p.access || []).includes('face3d')) return false;
      if (state.acc === 'face' && !(p.access || []).some(a => a.startsWith('face'))) return false;
      if (state.acc === 'fp' && !(p.access || []).includes('fp')) return false;
      if (state.acc === 'rfid' && !(p.access || []).includes('rfid')) return false;
    }
    if (state.feat === 'wifi' && !p.wifi) return false;
    if (state.feat === 'camera' && !p.camera) return false;
    if (state.price === 'u10' && p.price >= 10000) return false;
    if (state.price === 'u20' && p.price >= 20000) return false;
    return true;
  }

  function render() {
    const list = G.locks().filter(matches)
      .sort((a, b) => (b.badge === 'flagship' ? 1 : 0) - (a.badge === 'flagship' ? 1 : 0) || a.price - b.price);
    grid.innerHTML = list.map(p => window.Gcard(p)).join('');
    count.textContent = list.length + ' LOCK' + (list.length === 1 ? '' : 'S');
    empty.style.display = list.length ? 'none' : 'block';
    window.GobserveReveals(grid);
  }
  render();
})();
