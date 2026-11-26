(() => {
  const original = 'https://www.ironsidecomputers.com';
  const externalRoutes = /^\/(?:account|affiliates|login|logout|register|cart|checkout|customizer|forgot-password)(?:\/|$)/;
  const order = /^(?:add to (?:cart|bag)|buy now|checkout|configure(?: your pc)?|customize(?: your pc)?)\b/i;
  window.gtag ??= () => {};

  // Prevent the reproduction from creating orders, accounts, or tracking events.
  const request = window.fetch.bind(window);
  const snapshots = new Map([
    ['/api/products-menu', '/data/products-menu.json'],
    ['/api/collection-menus', '/data/collection-menus.json'],
    ['/api/cart-recommendations', '/data/cart-recommendations.json'],
    ['/api/products/get-updated-data', '/data/prices.json'],
  ]);
  const guestResponses = new Map([
    ['/api/auth/session', {}],
    ['/api/bigcommerce/cart', null],
    ['/api/live-chat-settings', { enabled: false }],
  ]);
  window.fetch = (input, options) => {
    const url = new URL(input instanceof Request ? input.url : input, location.href);
    const method = options?.method ?? (input instanceof Request ? input.method : 'GET');
    if (url.hostname === 'guild.ironside.gg') {
      return Promise.resolve(new Response('{}', { headers: { 'Content-Type': 'application/json' } }));
    }
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase())) {
      return Promise.resolve(new Response('Use the official Ironside store', { status: 405 }));
    }
    if (url.origin === location.origin && method.toUpperCase() === 'GET') {
      if (snapshots.has(url.pathname)) return request(snapshots.get(url.pathname), options);
      if (guestResponses.has(url.pathname)) {
        return Promise.resolve(new Response(JSON.stringify(guestResponses.get(url.pathname)), {
          headers: { 'Content-Type': 'application/json' },
        }));
      }
      if (/^\/_next\/data\/.+\/login\.json$/.test(url.pathname)) {
        return Promise.resolve(new Response(null, { status: 204 }));
      }
    }
    return request(input, options);
  };

  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const control = event.target.closest('a[href], button, [role="button"]');
    if (!control) return;
    const aria = control.getAttribute('aria-label') ?? '';
    const label = control.textContent.replace(/\s+/g, ' ').trim();
    const url = control instanceof HTMLAnchorElement ? new URL(control.href) : null;
    let destination;
    if (url?.origin === location.origin && externalRoutes.test(url.pathname)) {
      destination = /^\/(?:cart|checkout)/.test(url.pathname) ? original + '/' : original + url.pathname + url.search;
    } else if (aria === 'Open cart' || order.test(aria || label)) {
      destination = original + location.pathname + location.search;
    }
    if (destination) {
      event.preventDefault();
      event.stopImmediatePropagation();
      location.assign(destination);
    }
  }, true);

  document.addEventListener('submit', event => {
    if (event.target.querySelector('input[type="email"], input[type="password"], input[type="tel"], input[type="file"]')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      location.assign(original + location.pathname);
    }
  }, true);

  document.addEventListener('DOMContentLoaded', () => {
    const link = document.createElement('a');
    link.href = original;
    link.textContent = 'Unofficial catalog reproduction · Official Ironside store';
    link.style.cssText = 'display:block;padding:1rem;text-align:center;font:12px monospace;background:#eee;color:#111';
    document.body.append(link);
  }, { once: true });
})();
