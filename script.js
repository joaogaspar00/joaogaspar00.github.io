(function () {
  /* evita que o browser restaure sozinho a posição de scroll ao
     recarregar a página — a página deve abrir sempre no chão */
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ~1 minuto, como pedido no conceito: com 12 marcos dá ~4s de
     leitura a cada um durante a subida automática */
  const FLIGHT_DURATION_MS = 60000;

  /* ---------- referências ---------- */

  const nebulaEl = document.getElementById('nebula');
  const fillEl = document.getElementById('progress-fill');
  const altReadoutEl = document.getElementById('alt-readout');
  const progressEl = document.getElementById('progress');
  const padStructureEl = document.getElementById('pad-structure');
  const groundWrapperEl = document.getElementById('ground-wrapper');
  const rocketGroupEl = document.getElementById('rocket-group');
  const heroPanelEl = document.getElementById('hero-panel');
  const finalSectionEl = document.getElementById('final-section');

  /* ---------- log de missão (marcos lidos de #milestones) ---------- */

  const missionLogEl = document.getElementById('mission-log');
  const logPhotoWrapEl = document.getElementById('mission-log-photo-wrap');
  const logPhotoEl = document.getElementById('mission-log-photo');
  const logPhotoDotsEl = document.getElementById('mission-log-photo-dots');
  const logCollageEl = document.getElementById('mission-log-collage');
  const logCollageImgs = Array.from(logCollageEl.querySelectorAll('.collage-img'));
  const logYearEl = document.getElementById('mission-log-year');
  const logTaglineEl = document.getElementById('mission-log-tagline');
  const logDetailEl = document.getElementById('mission-log-detail');
  const logLinkEl = document.getElementById('mission-log-link');
  const logExpandBtn = document.getElementById('mission-log-expand');
  const logMoreEl = document.getElementById('mission-log-more');
  const logMoreTextEl = document.getElementById('mission-log-more-text');
  const logMoreListEl = document.getElementById('mission-log-more-list');
  const logCloseBtn = document.getElementById('mission-log-close');
  const logBackdropEl = document.getElementById('mission-log-backdrop');

  /* sem foto real (404) o <img> some e deixa ver o ícone-placeholder
     que já está por baixo, no wrap — sem "quebrar" visualmente */
  logPhotoEl.addEventListener('error', () => { logPhotoEl.style.display = 'none'; });
  logCollageImgs.forEach((img) => {
    img.addEventListener('error', () => { img.style.display = 'none'; });
  });

  /* o conteúdo vive no HTML (#milestones), que é também o que leitores
     de ecrã e motores de busca leem — aqui só é convertido para dados.
     "photos" (várias) mostra uma pequena galeria com rotação
     automática; "collage" uma colagem de até 4; "photo" uma fixa. */
  const MILESTONES = Array.from(document.querySelectorAll('#milestones > li')).map((li) => {
    const text = (sel) => {
      const el = li.querySelector(sel);
      return el ? el.textContent.trim() : '';
    };
    const list = (key) => (li.dataset[key] || '').split(',').map((s) => s.trim()).filter(Boolean);
    const link = li.querySelector('.m-link');
    return {
      year: text('.m-year'),
      tagline: text('.m-tagline'),
      detail: text('.m-detail'),
      photo: li.dataset.photo || '',
      photos: list('photos'),
      collage: list('collage'),
      link: link ? link.getAttribute('href') : '',
      linkText: link ? link.textContent.trim() : '',
      more: {
        text: text('.m-more'),
        tags: Array.from(li.querySelectorAll('.m-tags li')).map((t) => t.textContent.trim())
      }
    };
  });

  /* os marcos são distribuídos a espaços iguais entre LOG_START (logo a
     seguir à descolagem) e logEnd — um pouco antes de a secção final
     começar a entrar no ecrã, para o card nunca ficar por cima dela.
     logEnd depende da altura real da página, por isso é recalculado em
     cada resize (e.g. barra de endereço do telemóvel). */
  const LOG_START = 0.07;
  const LOG_END_MARGIN = 0.03;
  let logEnd = 0.8;

  function computeLogEnd() {
    const max = document.body.scrollHeight - window.innerHeight;
    logEnd = max > 0 ? 1 - finalSectionEl.offsetHeight / max - LOG_END_MARGIN : 0.8;
  }

  function milestoneIndexFor(frac) {
    if (frac < LOG_START || frac >= logEnd || !MILESTONES.length) return -1;
    const step = (logEnd - LOG_START) / MILESTONES.length;
    return Math.min(MILESTONES.length - 1, Math.floor((frac - LOG_START) / step));
  }

  let activeMilestone = -1;
  let logSwapTimer = null;
  let photoRotateTimer = null;

  function stopPhotoRotation() {
    clearInterval(photoRotateTimer);
    photoRotateTimer = null;
    logPhotoDotsEl.innerHTML = '';
  }

  function showPhoto(src) {
    logPhotoEl.style.display = 'none';
    logPhotoEl.removeAttribute('src');
    if (!src) return;
    logPhotoEl.src = src;
    logPhotoEl.style.display = 'block';
  }

  function showCollage(photos) {
    logCollageImgs.forEach((img, i) => {
      img.style.display = 'none';
      img.removeAttribute('src');
      const src = photos[i];
      if (!src) return;
      img.src = src;
      img.style.display = 'block';
    });
  }

  function startPhotoGallery(photos) {
    let i = 0;
    const dots = photos.map(() => {
      const d = document.createElement('span');
      logPhotoDotsEl.appendChild(d);
      return d;
    });

    function show(idx) {
      dots.forEach((d, di) => d.classList.toggle('dot-active', di === idx));
      showPhoto(photos[idx]);
    }

    show(0);
    photoRotateTimer = setInterval(() => {
      i = (i + 1) % photos.length;
      show(i);
    }, 2600);
  }

  let logExpanded = false;

  function setExpanded(expanded) {
    if (expanded === logExpanded) return;
    logExpanded = expanded;
    missionLogEl.classList.toggle('expanded', expanded);
    logBackdropEl.classList.toggle('visible', expanded);
    logMoreEl.hidden = !expanded;
    logExpandBtn.setAttribute('aria-expanded', String(expanded));

    /* foco acompanha o estado, para quem navega por teclado */
    if (expanded) {
      logCloseBtn.focus({ preventScroll: true });
    } else if (missionLogEl.contains(document.activeElement)) {
      logExpandBtn.focus({ preventScroll: true });
    }
  }

  /* clicar no card (ou no botão "+ mais informação", que propaga para
     aqui) expande-o; clicar no link, no botão de fechar ou no fundo
     escurecido não deve alternar o estado errado. Bloqueado durante a
     subida automática, para não abrir um card a meio do cenário a
     mover-se sozinho. */
  missionLogEl.addEventListener('click', (e) => {
    if (autoFlightActive) return;
    if (e.target.closest('#mission-log-link, #mission-log-close')) return;
    setExpanded(!logExpanded);
  });
  logCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setExpanded(false);
  });
  logBackdropEl.addEventListener('click', () => setExpanded(false));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && logExpanded) setExpanded(false);
  });

  function updateMissionLog(frac) {
    const idx = milestoneIndexFor(frac);

    if (idx === activeMilestone) return;
    activeMilestone = idx;

    missionLogEl.classList.remove('visible');
    setExpanded(false);
    clearTimeout(logSwapTimer);
    stopPhotoRotation();

    if (idx === -1) return;

    logSwapTimer = setTimeout(() => {
      const m = MILESTONES[idx];
      logYearEl.textContent = m.year;
      logTaglineEl.textContent = m.tagline;
      logDetailEl.textContent = m.detail;

      const isCollage = m.collage.length > 0;
      logPhotoWrapEl.hidden = isCollage;
      logCollageEl.hidden = !isCollage;

      if (isCollage) {
        showCollage(m.collage);
      } else if (m.photos.length) {
        startPhotoGallery(m.photos);
      } else {
        showPhoto(m.photo);
      }

      if (m.link) {
        logLinkEl.href = m.link;
        logLinkEl.textContent = m.linkText || 'Saber mais';
        logLinkEl.hidden = false;
      } else {
        logLinkEl.hidden = true;
      }

      /* sem texto extra nem tags, não há nada para expandir */
      const hasMore = !!(m.more.text || m.more.tags.length);
      logExpandBtn.hidden = !hasMore;
      missionLogEl.classList.toggle('no-more', !hasMore);

      logMoreTextEl.textContent = m.more.text;
      logMoreListEl.innerHTML = '';
      m.more.tags.forEach((tag) => {
        const li = document.createElement('li');
        li.textContent = tag;
        logMoreListEl.appendChild(li);
      });

      missionLogEl.classList.add('visible');
    }, 350);
  }

  /* o foguetão só se move durante a descolagem (LIFTOFF_END da fração);
     depois disso fica fixo no ecrã — quem se move é o cenário por trás
     (ground-wrapper, nuvens), dando a sensação de movimento relativo */
  const LIFTOFF_END = 0.05;
  const RESTING_Y = 585.7;  /* posição na base (550 do deslocamento do chão + 35.7 local) */
  const TARGET_SCREEN_FRAC = 0.38; /* onde o foguetão deve ficar no ecrã: 38% a partir do topo */
  const VIEWBOX_W = 1200, VIEWBOX_H = 950;
  const GROUND_TRAVEL = 900; /* quanto o chão/torre se afasta para baixo durante a subida */
  const GROUND_X_OFFSET = 80; /* empurra a base e o foguetão mais para a direita */
  const ROCKET_X = 639.6 + GROUND_X_OFFSET;

  function smoothstep(t) { return t * t * (3 - 2 * t); }

  /* a plataforma usa preserveAspectRatio="xMidYMax slice": o recorte
     vertical do viewBox depende do rácio largura/altura da janela, por
     isso a posição "fixa no ecrã" do foguetão tem de ser recalculada a
     partir das dimensões reais, não de uma coordenada fixa do viewBox */
  function flyingYForViewport() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const scale = Math.max(vw / VIEWBOX_W, vh / VIEWBOX_H);
    const cropTop = VIEWBOX_H * scale - vh;
    return (cropTop + TARGET_SCREEN_FRAC * vh) / scale;
  }

  let flyingY = flyingYForViewport();

  /* o painel de boas-vindas só passa a ser controlado pelo frac depois
     de a descolagem realmente começar — assim o clique em "Iniciar
     lançamento" (que o esconde de imediato) não é anulado pela chamada
     a onScroll() que corre logo a seguir, com o frac ainda a 0 durante a
     contagem/ignição. Uma vez lançado, o painel completo não volta a
     aparecer — se se voltar a descer até perto do chão só aparece o
     botão de repetir o lançamento. */
  const HERO_THRESHOLD = 0.03;
  let heroHasLaunched = false;

  /* verdadeiro desde o clique em "Iniciar/Refazer lançamento" até ao fim
     (ou skip) da subida automática — bloqueia a expansão dos cards
     enquanto o cenário está a mover-se sozinho */
  let autoFlightActive = false;
  const replayBtn = document.getElementById('replay-btn');

  function setAutoFlight(active) {
    autoFlightActive = active;
    missionLogEl.classList.toggle('locked', active);
  }

  function render(frac) {
    frac = Math.min(Math.max(frac, 0), 1);

    fillEl.style.height = (frac * 100) + '%';
    altReadoutEl.textContent = 'ALT ' + String(Math.round(frac * 100)).padStart(3, '0') + '%';

    updateMissionLog(frac);

    if (frac > HERO_THRESHOLD) heroHasLaunched = true;
    if (heroHasLaunched) {
      replayBtn.hidden = !(frac <= HERO_THRESHOLD && !autoFlightActive);
    }

    nebulaEl.style.opacity = Math.max(0, (frac - 0.65) / 0.35).toFixed(2);

    /* a plataforma desvanece logo após a descolagem */
    const padOpacity = frac < 0.22 ? 1 - Math.max(0, (frac - 0.06) / 0.16) : 0;
    padStructureEl.style.opacity = Math.max(0, Math.min(1, padOpacity)).toFixed(2);

    /* chão/torre afastam-se para baixo — é isto que dá a sensação de
       movimento, em vez do foguetão subir indefinidamente no ecrã */
    groundWrapperEl.setAttribute('transform', 'translate(' + GROUND_X_OFFSET + ',' + (550 + frac * GROUND_TRAVEL) + ')');

    /* foguetão: sobe da base até à posição de voo (LIFTOFF_END) e depois fica fixo */
    const liftT = smoothstep(Math.min(frac / LIFTOFF_END, 1));
    const rocketY = RESTING_Y + (flyingY - RESTING_Y) * liftT;
    rocketGroupEl.setAttribute('transform', 'translate(' + ROCKET_X + ',' + rocketY + ') scale(0.7386)');

    /* o foguetão desaparece de vista perto do fim do voo (entra no espaço) */
    rocketGroupEl.style.opacity = frac > 0.9 ? (1 - (frac - 0.9) / 0.1).toFixed(2) : 1;

    /* a telemetria também desaparece perto do topo, para dar lugar à
       secção final de contacto */
    progressEl.style.opacity = frac > 0.9 ? (1 - (frac - 0.9) / 0.1).toFixed(2) : 1;
  }

  /* ---------- scroll real: fração vem sempre da posição de scroll ---------- */

  function maxScroll() {
    return document.body.scrollHeight - window.innerHeight;
  }

  function onScroll() {
    const max = maxScroll();
    /* chão fica no fundo da página (scrollTop = max) => frac = 0
       espaço fica no topo da página (scrollTop = 0)   => frac = 1 */
    const frac = max > 0 ? Math.min(Math.max(1 - window.scrollY / max, 0), 1) : 0;
    render(frac);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    flyingY = flyingYForViewport();
    computeLogEnd();
    onScroll();
  });

  computeLogEnd();
  window.scrollTo(0, document.body.scrollHeight);
  onScroll();

  /* ---------- overlay de lançamento / contagem / ignição / subida ---------- */

  const launchBtn = document.getElementById('launch-btn');
  const profileShortcutBtn = document.getElementById('profile-shortcut');
  const contactBtn = document.getElementById('contact-btn');
  const countdownEl = document.getElementById('countdown-overlay');
  const countdownNumberEl = document.getElementById('countdown-number');
  const ignitionFlashEl = document.getElementById('ignition-flash');
  const skipBtn = document.getElementById('skip-btn');

  document.documentElement.classList.add('no-scroll');

  let rafId = null;

  /* qualquer tentativa de scroll do utilizador durante a subida
     automática passa-lhe o controlo ali mesmo, em vez de "lutar" com o
     scrollTo de cada frame */
  const SCROLL_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];

  function onUserTakeover(e) {
    if (e.type === 'keydown' && !SCROLL_KEYS.includes(e.key)) return;
    stopAutoScroll();
  }

  function setTakeoverListeners(on) {
    const method = on ? 'addEventListener' : 'removeEventListener';
    window[method]('wheel', onUserTakeover, { passive: true });
    window[method]('touchstart', onUserTakeover, { passive: true });
    window[method]('keydown', onUserTakeover);
  }

  function stopAutoScroll() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    setTakeoverListeners(false);
    skipBtn.hidden = true;
    setAutoFlight(false);
    onScroll();
  }

  function runAutoScroll() {
    const startTime = performance.now();
    document.documentElement.classList.remove('no-scroll');
    skipBtn.hidden = false;
    setTakeoverListeners(true);

    /* ritmo linear (sem easing): os marcos estão espaçados a fração
       constante, por isso um avanço de frac constante no tempo garante
       o mesmo tempo de leitura para cada um. O máximo de scroll é lido
       a cada frame porque a altura útil muda em mobile (barra de
       endereço a aparecer/desaparecer). */
    function frame(now) {
      const t = Math.min((now - startTime) / FLIGHT_DURATION_MS, 1);
      window.scrollTo(0, maxScroll() * (1 - t));
      if (t < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        stopAutoScroll();
      }
    }

    rafId = requestAnimationFrame(frame);
  }

  function runIgnition(onDone) {
    /* 1. explosão/clarão de ignição, com a chama ainda apagada */
    ignitionFlashEl.setAttribute('r', '10');
    ignitionFlashEl.classList.add('flare');
    requestAnimationFrame(() => {
      ignitionFlashEl.setAttribute('r', '95');
    });

    /* 2. a meio da explosão, a chama acende — e fica acesa daqui em diante */
    setTimeout(() => {
      rocketGroupEl.classList.add('flame-on', 'igniting');
    }, 280);

    setTimeout(() => {
      ignitionFlashEl.classList.remove('flare');
      rocketGroupEl.classList.remove('igniting');
      onDone();
    }, 650);
  }

  function runCountdown(onDone) {
    const steps = ['3', '2', '1'];
    let i = 0;
    countdownEl.classList.add('visible');

    function step() {
      if (i >= steps.length) {
        countdownEl.classList.remove('visible');
        onDone();
        return;
      }
      countdownNumberEl.textContent = steps[i];
      i++;
      setTimeout(step, 850);
    }

    step();
  }

  function beginLaunch() {
    setAutoFlight(true);
    heroPanelEl.classList.add('hidden');
    replayBtn.hidden = true;
    setExpanded(false);

    /* garantia extra: a contagem tem de começar sempre no chão, com a
       plataforma e o foguetão à vista, nunca a meio do voo. O scroll
       fica bloqueado durante a contagem e só é libertado quando a
       subida começa (runAutoScroll). */
    document.documentElement.classList.add('no-scroll');
    window.scrollTo(0, document.body.scrollHeight);
    onScroll();

    if (prefersReducedMotion) {
      /* animação desativada: utilizador fica no chão e controla o scroll */
      rocketGroupEl.classList.add('flame-on');
      document.documentElement.classList.remove('no-scroll');
      setAutoFlight(false);
      return;
    }

    /* espera que o painel de boas-vindas desapareça antes de mostrar a
       contagem, para não sobrepor texto — a contagem corre com a cena da
       plataforma (foguetão na base) limpa por trás */
    setTimeout(() => {
      runCountdown(() => {
        runIgnition(() => {
          runAutoScroll();
        });
      });
    }, 380);
  }

  /* salta diretamente para a secção final (espaço) — usado pelo botão
     de skip durante a subida e pelo atalho no painel de boas-vindas */
  function jumpToProfile() {
    stopAutoScroll();
    heroPanelEl.classList.add('hidden');
    heroHasLaunched = true;
    rocketGroupEl.classList.add('flame-on');
    document.documentElement.classList.remove('no-scroll');
    window.scrollTo(0, 0);
    onScroll();
    contactBtn.focus({ preventScroll: true });
  }

  launchBtn.addEventListener('click', beginLaunch);
  replayBtn.addEventListener('click', beginLaunch);
  profileShortcutBtn.addEventListener('click', jumpToProfile);
  skipBtn.addEventListener('click', jumpToProfile);
})();
