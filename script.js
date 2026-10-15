(() => {
  'use strict';
  const body = document.body;
  body.classList.replace('no-js', 'js');
  const main = document.querySelector('#main-content');
  ['home', 'proof', 'projects', 'case-study-details', 'mcp-demo', 'expertise', 'about', 'experience', 'contact'].forEach(id => { const section = document.getElementById(id); if (section) main?.append(section); });
  const heroActions = document.querySelector('.hero-actions');
  if (heroActions && !document.querySelector('.hero-watch')) { const watchLink = document.createElement('a'); watchLink.className = 'hero-watch'; watchLink.href = '#mcp-demo'; watchLink.innerHTML = 'Watch the AI/MCP walkthrough <span aria-hidden="true">↓</span>'; heroActions.insertAdjacentElement('afterend', watchLink); }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuToggle = document.querySelector('.menu-toggle');
  const navPanel = document.querySelector('.nav-panel');
  const themeToggle = document.querySelector('.theme-toggle');
  const closeMenu = () => { menuToggle?.setAttribute('aria-expanded', 'false'); navPanel?.classList.remove('is-open'); };
  const updateThemeButton = () => { const light = document.documentElement.dataset.theme === 'light'; themeToggle?.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme'); themeToggle?.setAttribute('aria-pressed', String(light)); };
  updateThemeButton();
  themeToggle?.addEventListener('click', () => { const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'; document.documentElement.dataset.theme = next; localStorage.setItem('theme', next); updateThemeButton(); });
  menuToggle?.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menuToggle.setAttribute('aria-expanded', String(open)); navPanel.classList.toggle('is-open', open); });
  document.querySelectorAll('.nav-panel a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener('click', event => { const target = document.querySelector(anchor.getAttribute('href')); if (!target || anchor.dataset.case) return; event.preventDefault(); target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' }); if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }));
  const filters = [...document.querySelectorAll('.filter-chip')], projects = [...document.querySelectorAll('.project-card')], filterStatus = document.querySelector('.filter-status');
  filters.forEach(filter => filter.addEventListener('click', () => { const active = filter.dataset.filter; let total = 0; filters.forEach(item => { const selected = item === filter; item.classList.toggle('is-active', selected); item.setAttribute('aria-pressed', String(selected)); }); projects.forEach(project => { const show = active === 'all' || project.dataset.category.split(' ').includes(active); project.hidden = !show; if (show) total += 1; }); filterStatus.textContent = `${total} ${total === 1 ? 'project' : 'projects'} shown`; }));
  const dialog = document.querySelector('.case-dialog'), dialogContent = dialog?.querySelector('.dialog-content'), closeDialog = dialog?.querySelector('.dialog-close'); let trigger = null;
  if (dialog && typeof dialog.showModal === 'function') body.classList.add('dialog-enabled');
  const openCase = event => { const link = event.currentTarget, source = document.querySelector(link.getAttribute('href')); if (!dialog || !source || typeof dialog.showModal !== 'function') return; event.preventDefault(); trigger = link; dialogContent.innerHTML = source.innerHTML; const title = dialogContent.querySelector('h3'); if (title) title.id = 'dialog-title'; dialog.showModal(); closeDialog.focus(); };
  document.querySelectorAll('[data-case]').forEach(link => link.addEventListener('click', openCase));
  closeDialog?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog?.addEventListener('close', () => { dialogContent.innerHTML = ''; trigger?.focus(); trigger = null; });
  const video = document.querySelector('.mcp-video'), videoPlay = document.querySelector('.video-play'), videoStatus = document.querySelector('.video-status');
  const updateVideoState = state => { video?.classList.toggle('is-playing', state === 'playing'); if (videoStatus) videoStatus.textContent = state === 'playing' ? 'Now playing · Concept and implementation walkthrough' : state === 'ended' ? 'Walkthrough complete · Play again any time' : 'Ready to play · Concept and implementation walkthrough'; };
  videoPlay?.addEventListener('click', () => video?.play().catch(() => { if (videoStatus) videoStatus.textContent = 'Playback could not start. Use the video controls to try again.'; }));
  video?.addEventListener('play', () => updateVideoState('playing'));
  video?.addEventListener('pause', () => { if (!video.ended) updateVideoState('paused'); });
  video?.addEventListener('ended', () => updateVideoState('ended'));
  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) revealItems.forEach(item => item.classList.add('is-visible')); else { const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }), { threshold: 0.12 }); revealItems.forEach(item => revealObserver.observe(item)); }
  const navLinks = [...document.querySelectorAll('.nav-panel a[href^="#"]')];
  if ('IntersectionObserver' in window) { const navObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(link => link.toggleAttribute('aria-current', link.getAttribute('href') === `#${entry.target.id}`)); }), { rootMargin: '-38% 0px -56% 0px', threshold: 0 }); document.querySelectorAll('main > section[id]').forEach(section => { if (navLinks.some(link => link.getAttribute('href') === `#${section.id}`)) navObserver.observe(section); }); }
  const header = document.querySelector('[data-header]');
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  body.appendChild(progress);
  const setHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
    const available = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${available > 0 ? window.scrollY / available : 0})`;
  };
  setHeader(); window.addEventListener('scroll', setHeader, { passive: true });
  document.querySelector('[data-year]').textContent = new Date().getFullYear();
})();
