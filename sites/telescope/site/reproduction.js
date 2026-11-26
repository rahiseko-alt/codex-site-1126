const original = 'https://telescope.fyi';

document.addEventListener('click', event => {
  if (event.defaultPrevented || !(event.target instanceof Element)) return;
  const link = event.target.closest('a[href]');
  if (!link || link.origin !== location.origin || link.pathname === '/') return;
  event.preventDefault();
  event.stopImmediatePropagation();
  location.assign(original + link.pathname + link.search + link.hash);
}, true);
