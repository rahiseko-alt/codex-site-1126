(() => {
  const source = 'https://rive.app';
  const pages = new Set(["/", "/agents", "/blog", "/blog/a-new-graphics-format-for-the-interactive-era", "/blog/adobe-animate-alternative-rive-is-what-flash-should-have-become", "/blog/case-studies", "/blog/duolingo-s-ai-powered-video-call-brings-lily-to-life", "/blog/figma-s-new-homepage-is-full-of-rive-animations", "/blog/how-cars24-revved-up-interactions-and-engagements-with-rive", "/blog/intercom-s-product-animation-evolution-embracing-rive", "/blog/linkedin-year-in-review-2025-built-with-rive", "/blog/pocketwatch", "/blog/press", "/blog/rive-as-a-lottie-alternative", "/blog/rive-is-natively-supported-in-webflow", "/blog/rive-vs-after-effects", "/blog/spotify-used-rive-for-spotify-wrapped-2025", "/careers", "/contact", "/downloads", "/editor", "/enterprise", "/experts", "/features", "/figma-to-rive", "/game-ui", "/games", "/newsletter", "/pricing", "/renderer", "/rive-vs-html", "/rive-vs-spine", "/runtimes", "/use-cases", "/use-cases/automotive", "/use-cases/avatar-creator-tutorial", "/use-cases/broadcast", "/use-cases/character-animation", "/use-cases/film-tv", "/use-cases/hero-animations", "/use-cases/mobile-apps", "/use-cases/product-design", "/use-cases/pull-to-refresh", "/use-cases/websites"]);
  document.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
    const url = new URL(link.href);
    if (![location.origin, source].includes(url.origin)) return;
    const decoded = decodeURI(url.pathname);
    const route = decoded.replace(/\/$/, '') || '/';
    const supported = pages.has(route);
    const target = new URL(url.pathname + url.search + url.hash, supported ? location.origin : source);
    if (url.origin === target.origin && url.pathname === location.pathname && url.hash) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    location.assign(target);
  }, { capture: true });
  document.addEventListener('submit', (event) => {
    if (!(event.target instanceof HTMLFormElement)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    location.assign(source + location.pathname);
  }, { capture: true });
})();
