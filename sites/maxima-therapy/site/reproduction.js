const original = 'https://maximatherapy.com';
const intakePage = /^\/(?:contact|appeals)(?:\/|$)/.test(location.pathname);
const submission = /^(?:submit|send|apply)(?:\b|$)/i;

document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (!(event.target instanceof Element)) return;
  const submit = event.target.closest('button');
  if (intakePage && submit && submission.test(submit.textContent.trim())) {
    event.preventDefault();
    event.stopImmediatePropagation();
    location.assign(original + location.pathname + location.search);
    return;
  }
  const link = event.target.closest('a[href]');
  if (!link || link.origin !== location.origin || link.target || link.pathname === location.pathname) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  location.assign(link.href);
}, true);

function isSensitive(form) {
  return /^\/(?:contact|appeals|careers)(?:\/|$)/.test(location.pathname)
    || Boolean(form.querySelector('input[type="email"], input[type="tel"], input[type="file"]'));
}

function handoffLink() {
  const link = document.createElement('a');
  link.href = original + location.pathname + location.search;
  link.textContent = 'Open the official Maxima Therapy form';
  link.dataset.reproductionLink = 'true';
  link.style.cssText = 'display:inline-block;margin:1rem 0;padding:.8rem 1.1rem;border-radius:2rem;background:#2461ff;color:white;text-decoration:underline;';
  return link;
}

function protectForms() {
  for (const form of document.forms) {
    if (!isSensitive(form) || form.dataset.reproductionHandoff) continue;
    form.dataset.reproductionHandoff = 'true';
    form.inert = true;
    form.before(handoffLink());
  }
  if (!intakePage) return;
  for (const field of document.querySelectorAll('input:not([type="hidden"]), textarea, select')) {
    field.inert = true;
  }
  if (!document.querySelector('[data-reproduction-link]')) {
    const trigger = [...document.querySelectorAll('button')].find(button => submission.test(button.textContent.trim()));
    trigger?.before(handoffLink());
  }
}

document.addEventListener('submit', event => {
  if (!(event.target instanceof HTMLFormElement) || !isSensitive(event.target)) return;
  event.preventDefault();
  event.stopImmediatePropagation();
}, true);

document.addEventListener('focusin', event => {
  const form = event.target.closest?.('form');
  if ((form && isSensitive(form)) || (intakePage && event.target.matches?.('input,textarea,select'))) event.target.blur();
}, true);

function afterHydration() {
  setTimeout(() => {
    protectForms();
    new MutationObserver(protectForms).observe(document.body, { childList: true, subtree: true });
  }, 1200);
}
if (document.readyState === 'complete') afterHydration();
else window.addEventListener('load', afterHydration, { once: true });
