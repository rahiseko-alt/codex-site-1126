// Each public route has its own HTML and embedded Flight data.
document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
      event.ctrlKey || event.shiftKey || event.altKey) return;

  const link = event.target.closest?.('a[href]');
  if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;

  const target = new URL(link.href, location.href);
  if (target.origin !== location.origin || target.pathname === location.pathname) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  location.assign(target.href);
}, { capture: true });

// Open the official form without forwarding the visitor's entries.
document.addEventListener('submit', (event) => {
  if (location.pathname.replace(/\/$/, '') !== '/contact') return;

  event.preventDefault();
  event.stopImmediatePropagation();
  location.assign('https://www.bratiiev.com/contact');
}, { capture: true });
