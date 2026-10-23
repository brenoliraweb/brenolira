export function initHeroGrid() {
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
