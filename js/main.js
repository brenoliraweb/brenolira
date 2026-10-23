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

/**
 * Preenche o fundo do hero com as células que acendem no hover.
 * Só cria células suficientes para cobrir a tela atual.
 */
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

/**
 * Etapas da seção "Como funciona".
 */
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

/**
 * Deixa só uma pergunta aberta por vez.
 */
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

/**
 * Monta a mensagem do formulário e abre o WhatsApp.
 */
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

/**
 * Destaca no menu a seção que está na tela.
 */
function initActiveNav() {
  const links = document.querySelectorAll('.nav__link');
  if (!links.length || !('IntersectionObserver' in window)) return;

  const linkById = new Map();
  links.forEach((link) => linkById.set(link.hash.slice(1), link));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.remove('is-active'));
      const active = linkById.get(entry.target.id);
      if (active) active.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
}

function initYear() {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
}

initHeroGrid();
initProcess();
initFaq();
initContactForm();
initActiveNav();
initYear();
