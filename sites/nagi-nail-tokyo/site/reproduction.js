(() => {
  const fetchOriginal = window.fetch.bind(window);
  const searchProducts = [
    ['amber', '琥珀', 'べっ甲 ブラウン'],
    ['milk', '淡雪', '乳白 ピンク'],
    ['mist', '薄墨', 'グレー シルバー'],
    ['leaf', '若葉', 'オリーブ グリーン'],
    ['wine', '葡萄', '赤 ボルドー'],
  ];

  window.fetch = async (resource, options) => {
    const url = new URL(resource instanceof Request ? resource.url : resource, location.href);
    const method = (options?.method || (resource instanceof Request ? resource.method : 'GET')).toUpperCase();
    if (url.origin !== location.origin || (method !== 'GET' && method !== 'HEAD')) {
      return new Response(null, { status: 405 });
    }
    if (url.pathname === '/cart.js') return Response.json({ items: [], item_count: 0, total_price: 0 });
    if (url.pathname === '/cart' && url.searchParams.get('view') === 'ajax') {
      return new Response('<div class="cart__items" data-count="0" data-cart-subtotal="0" data-cart-savings="0"></div><div class="cart__discounts"></div>');
    }
    if (url.pathname === '/search/suggest') {
      const term = (url.searchParams.get('q') || '').toLowerCase().trim();
      const matches = searchProducts.filter(([, name, colors]) => (name + colors).includes(term)).slice(0, 3);
      const items = matches.map(([id, name]) => '<li><a href="/demo/?product=' + id + '">' + name + '</a></li>').join('');
      return new Response('<div id="shopify-section-search-results">' + (items ? '<ul>' + items + '</ul>' : '<p>該当する商品はありません。</p>') + '</div>');
    }
    return fetchOriginal(resource, options);
  };

  document.addEventListener('submit', event => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const destination = new URL('/demo/', location.href);
    const action = new URL(form.action, location.href);
    if (action.pathname === '/search') {
      destination.searchParams.set('search', '1');
      const term = new FormData(form).get('q');
      if (term) destination.searchParams.set('q', term);
    } else if (action.pathname.startsWith('/contact')) {
      const message = form.querySelector('[role="status"]') || document.createElement('p');
      message.setAttribute('role', 'status');
      message.textContent = '入力を確認しました。メールアドレスは送信されません。';
      if (!message.parentNode) form.append(message);
      form.reset();
      return;
    } else destination.hash = 'bag';
    location.assign(destination);
  }, { capture: true });
})();
