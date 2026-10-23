'use strict';

const WHATSAPP_NUMBER = '5582991437312';

const PROCESS_STEPS = [
  {
    title: 'Conversa',
    text: 'Uma conversa rápida, no WhatsApp ou por chamada, para entender seu negócio, seu público e o que precisa ser resolvido.',
    gets: 'Um diagnóstico do que faz sentido para você'
  },
  {
    title: 'Escopo',
    text: 'Coloco no papel o que entra, o que fica de fora, o prazo e o valor. O combinado não muda no meio do caminho.',
    gets: 'Proposta e escopo assinados'
  },
  {
    title: 'Protótipo',
    text: 'Você vê as telas prontas antes de qualquer linha de código e pede os ajustes que quiser.',
    gets: 'Layout aprovado no celular e no computador'
  },
  {
    title: 'Código',
    text: 'Construo exatamente o que foi aprovado, com foco em velocidade, acessibilidade e SEO.',
    gets: 'Uma prévia online para acompanhar'
  },
  {
    title: 'No ar',
    text: 'Publico o site, configuro o domínio e passo todos os acessos para o seu nome.',
    gets: '30 dias de suporte inclusos'
  }
];

function initIntro() {
  const root = document.documentElement;
  if (!root.classList.contains('is-intro')) return;

  const ENTER_TIME = 2400;
  const LEAVE_TIME = 2000;
  const SKIP_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
  let leaving = false;

  try {
    sessionStorage.setItem('intro', 'visto');
  } catch (error) {}

  function finish() {
    root.classList.remove('is-intro', 'is-leaving');
  }

  function leave() {
    if (leaving) return;
    leaving = true;
    SKIP_EVENTS.forEach((type) => window.removeEventListener(type, leave));
    root.classList.add('is-leaving');
    setTimeout(finish, LEAVE_TIME);
  }

  SKIP_EVENTS.forEach((type) => window.addEventListener(type, leave, { passive: true }));

  setTimeout(leave, ENTER_TIME);
}

function initHeroGrid() {
  const grid = document.querySelector('.hero__grid');
  if (!grid) return;

  const CELL_SIZE = 64;
  const MIN_HEIGHT = 920;

  function fill() {
    const width = Math.max(grid.clientWidth, window.innerWidth);
    const height = Math.max(grid.clientHeight, MIN_HEIGHT);
    const needed = (Math.ceil(width / CELL_SIZE) + 1) * (Math.ceil(height / CELL_SIZE) + 1);
    const missing = needed - grid.childElementCount;
    if (missing <= 0) return;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < missing; i++) {
      const cell = document.createElement('div');
      cell.className = 'hero__cell';
      fragment.appendChild(cell);
    }
    grid.appendChild(fragment);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fill, 200);
  });

  fill();
}

function initProcess() {
  const root = document.querySelector('[data-process]');
  if (!root) return;

  const buttons = root.querySelectorAll('[data-step]');
  const progress = root.querySelector('[data-process-progress]');
  const count = root.querySelector('[data-process-count]');
  const title = root.querySelector('[data-process-title]');
  const desc = root.querySelector('[data-process-desc]');
  const gets = root.querySelector('[data-process-gets]');
  const prev = root.querySelector('[data-process-prev]');
  const next = root.querySelector('[data-process-next]');
  const last = PROCESS_STEPS.length - 1;

  let current = 0;

  function render() {
    const step = PROCESS_STEPS[current];

    buttons.forEach((button, index) => {
      button.classList.toggle('is-reached', index <= current);
      button.classList.toggle('is-current', index === current);
      button.setAttribute('aria-current', index === current ? 'step' : 'false');
    });

    progress.style.width = `${(current / last) * 100}%`;
    count.textContent = `Etapa ${current + 1} de ${PROCESS_STEPS.length}`;
    title.textContent = step.title;
    desc.textContent = step.text;
    gets.textContent = step.gets;
    prev.disabled = current === 0;
    next.disabled = current === last;
  }

  function goTo(index) {
    current = Math.min(Math.max(index, 0), last);
    render();
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => goTo(Number(button.dataset.step)));
  });
  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));

  render();
}

function initFaq() {
  const items = document.querySelectorAll('[data-faq] details');

  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
}

function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get('nome').trim();
    const service = data.get('servico');
    const message = data.get('mensagem').trim();

    const lines = [
      `Olá, Breno! Meu nome é ${name}.`,
      `Tenho interesse em: ${service}.`
    ];
    if (message) lines.push('', message);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  function close() {
    if (!menu.hidden) setOpen(false);
  }

  toggle.addEventListener('click', () => setOpen(menu.hidden));

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) close();
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      close();
      toggle.focus();
    }
  });

  window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => {
    if (event.matches) close();
  });
}

function initActiveNav() {
  const links = document.querySelectorAll('.nav__link, .mobile-menu__link');
  if (!links.length || !('IntersectionObserver' in window)) return;

  const linksById = new Map();
  links.forEach((link) => {
    const id = link.hash.slice(1);
    linksById.set(id, [...(linksById.get(id) || []), link]);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.remove('is-active'));
      (linksById.get(entry.target.id) || []).forEach((link) => link.classList.add('is-active'));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
}

function initYear() {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
}

initIntro();
initHeroGrid();
initProcess();
initFaq();
initMobileMenu();
initContactForm();
initActiveNav();
initYear();
