export function initActiveNav() {
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
