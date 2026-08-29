/* ============================================================
   GOLENS — COMPARE
   2–4 locks, grouped for non-technical buyers.
   Reads ?ids= (from finder / cards) and offers a picker.
   ============================================================ */
(function () {
  'use strict';
  const G = window.GOLENS;
  const inr = window.Gfmt.inr;
  const A = window.ACCESS_LABEL;
  const table = document.getElementById('cmpTable');
  const picker = document.getElementById('cmpPicker');

  const urlIds = (new URLSearchParams(location.search).get('ids') || 'x95,x28,x37').split(',').filter(id => G.byId(id));
  let selected = [...new Set(urlIds)].slice(0, 4);
  if (selected.length < 2) selected = ['x95', 'x28'];

  function renderPicker() {
    picker.innerHTML = G.locks().map(p => {
      const on = selected.includes(p.id);
      const disabled = !on && selected.length >= 4;
      return `<button class="fchip" style="${disabled ? 'opacity:.4;pointer-events:none' : ''}" data-id="${p.id}" aria-pressed="${on}">${p.name}${on ? ' <span class="x">✕</span>' : ''}</button>`;
    }).join('');
    picker.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.id;
      if (selected.includes(id)) selected = selected.filter(x => x !== id);
      else if (selected.length < 4) selected.push(id);
      window.Gtrack('compare', { items: selected.join(',') });
      renderPicker(); renderTable();
    }));
  }

  const yes = txt => `<td><span class="yes">✓</span> ${txt || ''}</td>`;
  const no = () => `<td class="no">—</td>`;

  function accLabels(p) { return (p.access || []).map(a => A[a] && A[a].label).filter(Boolean); }

  function renderTable() {
    const ps = selected.map(id => G.byId(id));
    const col = ps.length;
    table.innerHTML = `
      <thead>
        <tr>
          <th scope="col" style="min-width:150px"></th>
          ${ps.map(p => `<th scope="col">
            <a href="product.html?p=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
            <strong style="font-family:var(--font-display);font-size:1.15rem;font-weight:600">${p.name}</strong><br>
            <span style="font-size:.74rem;color:var(--on-ink-2)">${p.line || p.subtitle.slice(0, 26)}</span>
          </th>`).join('')}
        </tr>
      </thead>
      <tbody>
        <tr class="group-row"><td colspan="${col + 1}">Price &amp; buying</td></tr>
        <tr><th scope="row">Price today</th>${ps.map(p => `<td><strong style="font-family:var(--font-display);font-size:1.25rem;color:var(--bronze-1)">${inr(p.price)}</strong>${p.mrp ? `<br><s style="color:var(--on-ink-2);font-size:.78rem">${inr(p.mrp)}</s>` : ''}</td>`).join('')}</tr>
        <tr><th scope="row">Availability</th>${ps.map(p => p.soldOut ? '<td class="no">Sold out</td>' : '<td><span class="yes">✓</span> In stock</td>').join('')}</tr>
        <tr><th scope="row">Warranty</th>${ps.map(p => `<td>${p.warranty} year${p.warranty > 1 ? 's' : ''}</td>`).join('')}</tr>

        <tr class="group-row"><td colspan="${col + 1}">Ways to unlock</td></tr>
        <tr><th scope="row">Face recognition</th>${ps.map(p => p.access.includes('face3d') ? yes('3D Face') : p.access.some(a => a.startsWith('face')) ? yes('Face') : no()).join('')}</tr>
        <tr><th scope="row">Fingerprint</th>${ps.map(p => p.access.includes('fp') ? yes(p.fingerprints ? '0.3 s' : '') : no()).join('')}</tr>
        <tr><th scope="row">PIN / Password</th>${ps.map(p => p.access.includes('pin') ? yes('') : no()).join('')}</tr>
        <tr><th scope="row">RFID card</th>${ps.map(p => p.access.includes('rfid') ? yes('') : no()).join('')}</tr>
        <tr><th scope="row">One-time / temp password</th>${ps.map(p => (p.access.includes('otp') || p.access.includes('temp')) ? yes(p.access.includes('otp') ? 'OTP' : 'Temp') : no()).join('')}</tr>
        <tr><th scope="row">Mechanical key backup</th>${ps.map(p => p.access.includes('key') ? yes('') : no()).join('')}</tr>

        <tr class="group-row"><td colspan="${col + 1}">Security &amp; awareness</td></tr>
        <tr><th scope="row">Built-in camera</th>${ps.map(p => p.camera ? yes('Visitor camera') : no()).join('')}</tr>
        <tr><th scope="row">See visitors on phone</th>${ps.map(p => p.camera && p.wifi ? yes('Live door view') : no()).join('')}</tr>
        <tr><th scope="row">Doorbell</th>${ps.map(p => p.doorbell ? yes('On the lock') : no()).join('')}</tr>
        <tr><th scope="row">Voice ecosystem</th>${ps.map(p => p.access.includes('alexa') ? yes('Alexa · Google · Apple') : no()).join('')}</tr>

        <tr class="group-row"><td colspan="${col + 1}">Smart features</td></tr>
        <tr><th scope="row">Wi-Fi (no gateway)</th>${ps.map(p => p.wifi ? yes('') : no()).join('')}</tr>
        <tr><th scope="row">Remote unlock from app</th>${ps.map(p => p.wifi ? yes('Anywhere') : p.access.includes('remote') ? yes('RF remote') : no()).join('')}</tr>
        <tr><th scope="row">Entry history</th>${ps.map(p => p.wifi || p.bt ? yes('In app') : no()).join('')}</tr>
        <tr><th scope="row">Display on lock</th>${ps.map(p => p.lcd ? yes('LCD') : no()).join('')}</tr>

        <tr class="group-row"><td colspan="${col + 1}">Door fit</td></tr>
        <tr><th scope="row">Main door</th>${ps.map(p => p.door.includes('main') ? yes('') : no()).join('')}</tr>
        <tr><th scope="row">Glass door</th>${ps.map(p => p.door.includes('glass') ? yes(p.material.includes('glass') ? '8–12 mm' : '') : no()).join('')}</tr>
        <tr><th scope="row">Interior / office</th>${ps.map(p => (p.door.includes('room') || p.door.includes('office')) ? yes('') : no()).join('')}</tr>

        <tr class="group-row"><td colspan="${col + 1}">Installation</td></tr>
        <tr><th scope="row">Fitting</th>${ps.map(p => `<td style="font-size:.8rem;color:var(--on-ink-2)">${p.family === 'glass' ? 'No drilling on glass' : 'Carpenter or expert'}</td>`).join('')}</tr>
        <tr><th scope="row">Best for</th>${ps.map(p => `<td style="font-size:.8rem;max-width:180px">${p.bestFor}</td>`).join('')}</tr>

        <tr><th scope="row"></th>${ps.map(p => `<td><a class="btn btn-bronze btn-sm btn-block" href="product.html?p=${p.id}">Explore</a></td>`).join('')}</tr>
      </tbody>`;
  }

  renderPicker();
  renderTable();
  window.Gtrack('compare_view', { items: selected.join(',') });
})();
