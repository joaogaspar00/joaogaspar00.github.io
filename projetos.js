(function () {
  /* migrados de projects/*.md do site antigo (joaogaspar00.github.io).
     Dados em JS e não em .md com fetch, para funcionar também ao abrir
     o ficheiro localmente (file://). */
  const PROJECTS = [
    { title: 'Transonic Flight Optimization for Supercritical Airfoils', image: 'images/projects/foil_optimization.png', tags: ['STAR-CCM+', 'XFOIL', 'Python', 'MATLAB'], report: 'reports/HW3_AERO3.pdf' },
    { title: 'Pararotor Recovery System Design', image: 'images/projects/karman_rotochute.png', tags: ['MATLAB'], report: 'reports/pararotor_recovery_system_design.pdf' },
    { title: 'Study of Coflow Airfoils in STAR-CCM+', image: 'images/projects/coflow.jpg', tags: ['STAR-CCM+', 'CFD'], report: 'reports/HW3_Computacional_Fluid_Mechanics.pdf' },
    { title: 'Compressible Viscous and Inviscid High Speed Flows', image: 'images/projects/jet_shocks.png', tags: ['STAR-CCM+', 'CFD'], report: 'reports/HW4_Computacional_Fluid_Mechanics.pdf' },
    { title: 'Reflected Shock Wave Interaction Study', image: 'images/projects/reflected_shock.png', tags: ['MATLAB', 'CFD'], report: 'reports/HW1_Computacional_Fluid_Mechanics.pdf' },
    { title: 'Shock Tube Operation and Analysis of 2D Axially Symmetric Minimum Length Nozzles', image: 'images/projects/shocktube.png', tags: ['MATLAB', 'Python'], report: 'reports/HW2_AERO3.pdf' },
    { title: 'Aircraft Aerostructural Optimisation with OpenAeroStruct', image: 'images/projects/openaerostruct.png', tags: ['Python', 'OpenAeroStruct', 'OpenMDAO'], report: 'reports/OpenAeroStruct.pdf' },
    { title: 'Aerostructural Optimization of the Bombardier CRJ700', image: 'images/projects/dim_bombardier.jpeg', tags: ['STAR-CCM+', 'SolidWorks', 'MATLAB', 'Python'], report: 'reports/Aircraft_Optmization.pdf' },
    { title: 'Sustainable Approach in LRMs: Fuel and Manufacturing', image: 'images/projects/lca-combustiveis.jpg', tags: ['LCA', 'Python', 'MATLAB'], report: 'reports/sustainable_project.pdf' },
    { title: 'The OSIRIS-REx Mission', image: 'images/projects/tag.png', tags: ['Space Environment', 'Research'], report: 'reports/AmbEsp.pdf' },
    { title: 'Smart Trash Can with Odor Neutralization', image: 'images/projects/filter-system.png', tags: ['Product Development', 'CAD', 'Mechanical Design'], report: 'reports/Trash_Can_with_Odor_Neutralization.pdf' },
    { title: 'Preliminary Tool for Quasi-1D Supersonic Wind Tunnel Analysis', image: 'images/projects/interface.png', tags: ['MATLAB'], report: 'reports/HW1_AERO3.pdf' },
    { title: 'Stability, Error Analysis, and Mesh Influence in CFD Simulations', image: 'images/projects/error_project.png', tags: ['CFD'], report: 'reports/HW2_Computacional_Fluid_Mechanics.pdf' }
  ];

  const gridEl = document.getElementById('projects-grid');
  document.getElementById('projects-count').textContent = String(PROJECTS.length).padStart(2, '0');

  /* ---------- lightbox: ver a figura em tamanho grande ---------- */

  const lightboxEl = document.getElementById('lightbox');
  const lightboxImgEl = document.getElementById('lightbox-img');
  const lightboxFigEl = document.getElementById('lightbox-fig');
  const lightboxTitleEl = document.getElementById('lightbox-title');
  const lightboxLinkEl = document.getElementById('lightbox-link');

  function openLightbox(p, figLabel) {
    lightboxImgEl.src = p.image;
    lightboxImgEl.alt = p.title;
    lightboxFigEl.textContent = figLabel;
    lightboxTitleEl.textContent = p.title;
    lightboxLinkEl.href = p.report;
    lightboxEl.showModal();
  }

  /* fecha ao clicar fora da imagem (no fundo do <dialog>); Esc já
     fecha nativamente */
  lightboxEl.addEventListener('click', (e) => {
    if (e.target === lightboxEl || e.target.closest('#lightbox-close')) lightboxEl.close();
  });
  lightboxEl.addEventListener('close', () => { lightboxImgEl.removeAttribute('src'); });

  /* ---------- cards ---------- */

  const ZOOM_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';

  PROJECTS.forEach((p, i) => {
    const num = String(i + 1).padStart(2, '0');
    const li = document.createElement('li');
    li.className = 'project-card';

    /* figura: a imagem inteira (contain) por cima de uma cópia desfocada
       da própria imagem a preencher o resto do quadro — nenhuma figura
       é cortada, seja qual for a proporção. Clicar amplia. */
    const figure = document.createElement('button');
    figure.type = 'button';
    figure.className = 'project-card-figure';
    figure.setAttribute('aria-label', 'Ampliar imagem: ' + p.title);

    const bg = document.createElement('img');
    bg.className = 'project-card-figure-bg';
    bg.src = p.image;
    bg.alt = '';
    bg.loading = 'lazy';
    bg.setAttribute('aria-hidden', 'true');

    const img = document.createElement('img');
    img.className = 'project-card-figure-img';
    img.src = p.image;
    img.alt = '';
    img.loading = 'lazy';

    const fig = document.createElement('span');
    fig.className = 'project-card-fig';
    fig.textContent = 'FIG. ' + num;

    const zoom = document.createElement('span');
    zoom.className = 'project-card-zoom';
    zoom.innerHTML = ZOOM_ICON;

    figure.append(bg, img, fig, zoom);
    figure.addEventListener('click', () => openLightbox(p, 'FIG. ' + num + ' · PRJ-' + num));

    const body = document.createElement('div');
    body.className = 'project-card-body';

    const id = document.createElement('span');
    id.className = 'project-card-id';
    id.textContent = 'PRJ-' + num;

    const title = document.createElement('h2');
    title.className = 'project-card-title';
    const titleLink = document.createElement('a');
    titleLink.href = p.report;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener';
    titleLink.textContent = p.title;
    title.appendChild(titleLink);

    const tags = document.createElement('ul');
    tags.className = 'project-card-tags';
    p.tags.forEach((t) => {
      const tag = document.createElement('li');
      tag.textContent = t;
      tags.appendChild(tag);
    });

    const cta = document.createElement('a');
    cta.className = 'project-card-cta';
    cta.href = p.report;
    cta.target = '_blank';
    cta.rel = 'noopener';
    cta.textContent = 'Ver relatório (PDF) ↗';
    /* o título já leva ao mesmo PDF: este fica fora da ordem de Tab e
       do leitor de ecrã, para não repetir o link */
    cta.tabIndex = -1;
    cta.setAttribute('aria-hidden', 'true');

    body.append(id, title, tags, cta);
    li.append(figure, body);
    gridEl.appendChild(li);
  });
})();
