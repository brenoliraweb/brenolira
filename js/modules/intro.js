export function initIntro() {
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
