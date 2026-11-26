(() => {
  const networkFetch = window.fetch.bind(window);
  const sameSitePath = (request) => new URL(request instanceof Request ? request.url : request, location.href);
  const publicPath = /^\/(?:[a-zA-Z0-9-]+\/)*$/;
  const officialSite = 'https://www.emcell.com';
  const translation = /^\/(?:ar|bg|cn|sr)(?:\/|$)/;

  // Supply the public fragments to the original page-transition code.
  window.fetch = (request, options) => {
    const url = sameSitePath(request);
    if (url.origin !== location.origin) return networkFetch(request, options);
    if (url.pathname === '/index.php' && url.searchParams.get('ajaxRequest') === 'true') {
      const route = '/' + (url.searchParams.get('url') || '').trim().replace(/^\/+|\/+$/g, '');
      const path = route === '/' ? route : route + '/';
      if (!publicPath.test(path)) return Promise.resolve(new Response(null, { status: 404 }));
      return networkFetch('/__fragments' + path + 'content.html');
    }
    if (url.pathname === '/ajax_successStories.php') {
      const id = url.searchParams.get('id') || '';
      if (!/^\d+$/.test(id)) return Promise.resolve(new Response(null, { status: 404 }));
      return networkFetch('/__stories/' + id + '.html');
    }
    return networkFetch(request, options);
  };

  document.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || !translation.test(url.pathname)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    location.assign(officialSite + url.pathname + url.search + url.hash);
  }, { capture: true });
})();
