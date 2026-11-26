// The clinic handles appointment and inquiry intake on its official services.
document.addEventListener('submit', (event) => {
  if (!(event.target instanceof HTMLFormElement)) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  location.assign(new URL(location.pathname + location.hash, 'https://arkskinclinic.jp'));
}, { capture: true });
