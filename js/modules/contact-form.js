const WHATSAPP_NUMBER = '5582991437312';

export function initContactForm() {
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
    window.location.href = url;
  });
}
