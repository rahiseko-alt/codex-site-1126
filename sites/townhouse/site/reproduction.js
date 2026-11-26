(() => {
  const official = new URL('https://townhouse.co.uk/');
  const fetchOriginal = window.fetch.bind(window);
  const studio = false;
  const assets = studio
    ? fetchOriginal('/studio-resources.json').then(response => response.json()).catch(() => ({}))
    : null;
  const transactions = /^\/(?:cart|checkout|checkouts|customer_authentication|account|orders)(?:[./]|$)/i;
  const previewPath = /^\/(?:contact|pages\/contact)/;
  const marketing = /google-analytics|googletagmanager|analytics\.studio|klaviyo|monorail|shopmy|doubleclick|facebook\.net/i;

  window.fetch = async (resource, options) => {
    const url = new URL(resource instanceof Request ? resource.url : resource, location.href);
    const method = (options?.method || (resource instanceof Request ? resource.method : 'GET')).toUpperCase();
    if (marketing.test(url.hostname)) return new Response(null, { status: 204 });
    if (method !== 'GET' && method !== 'HEAD') return new Response(null, { status: 405 });
    if (url.origin === location.origin && /^\/cart\.js$/.test(url.pathname)) {
      return Response.json({ items: [], item_count: 0, total_price: 0 });
    }
    if (assets && url.hostname === 'storage.googleapis.com') {
      const local = (await assets)[url.href];
      if (local) return fetchOriginal(local, options);
    }
    return fetchOriginal(resource, options);
  };

  document.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    const anchor = event.target.closest?.('a[href]');
    if (!anchor) return;
    const url = new URL(anchor.href, location.href);
    if (url.origin !== location.origin && url.origin !== official.origin) return;
    const book = anchor.hasAttribute('data-book-now') || anchor.closest('[data-book-now]');
    if (!transactions.test(url.pathname) && !book) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    location.assign(new URL(url.pathname + url.search + url.hash, official));
  }, { capture: true });

  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const action = new URL(form.getAttribute('action') || location.pathname, official);
    event.preventDefault();
    event.stopImmediatePropagation();
    if (form.method === 'get' && action.pathname === '/search') {
      const term = new FormData(form).get('q');
      if (term) action.searchParams.set('q', term);
      location.assign(action);
      return;
    }
    if (transactions.test(action.pathname)) {
      const destination = previewPath.test(location.pathname) ? action : new URL(location.pathname, official);
      location.assign(destination);
      return;
    }
    location.assign(new URL(location.pathname + location.hash, official));
  }, { capture: true });
})();
