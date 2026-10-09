/* partilhado por index.html, contact.html e projetos.html — campo de
   estrelas; a quantidade vem de data-count no #stars (por omissão 300) */
(function () {
  const starsEl = document.getElementById('stars');
  if (!starsEl) return;

  const STAR_COUNT = Number(starsEl.dataset.count) || 300;
  for (let i = 0; i < STAR_COUNT; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    const size = Math.random() < 0.7 ? 2 : 3;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.opacity = (0.2 + Math.random() * 0.6).toFixed(2);
    starsEl.appendChild(s);
  }
})();
