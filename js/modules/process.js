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

export function initProcess() {
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
