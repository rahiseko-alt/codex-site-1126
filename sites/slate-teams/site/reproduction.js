// Keep the original form visible. The public service owns submission and booking.
document.addEventListener('submit', event => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.querySelector('[data-form-error]')) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if (!form.reportValidity()) return;

  const alert = form.querySelector('[data-form-error]');
  const message = alert.querySelector('[data-form-message]') ?? alert;
  const link = document.createElement('a');
  link.href = 'https://slateteams.com' + (location.pathname.startsWith('/events') ? '/events' : '/get-in-touch');
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Continue on the original Slate site';
  link.style.textDecoration = 'underline';
  message.replaceChildren('To submit your details, ', link, '.');
  alert.hidden = false;
  alert.style.opacity = '1';
  alert.style.translate = 'none';
}, true);
