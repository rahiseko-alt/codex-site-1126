document.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.cky-consent-container');
  const preferences = document.querySelector('#herzel-privacy-settings');
  const revisit = document.querySelector('#herzel-privacy-revisit');
  if (!banner || !preferences || !revisit) return;

  const preferenceKey = 'herzel-preview-privacy';
  let choice;
  try {
    choice = localStorage.getItem(preferenceKey);
  } catch {
    // The banner still works when storage is unavailable.
  }
  const displayChoice = (value) => {
    banner.hidden = Boolean(value);
    revisit.hidden = !value;
  };
  const choose = (value) => {
    try {
      localStorage.setItem(preferenceKey, value);
    } catch {
      // The choice is still applied for this page.
    }
    if (preferences.open) preferences.close();
    displayChoice(value);
  };

  displayChoice(choice);
  banner.querySelector('.cky-btn-customize').addEventListener('click', () => preferences.showModal());
  banner.querySelector('.cky-btn-reject').addEventListener('click', () => choose('rejected'));
  banner.querySelector('.cky-btn-accept').addEventListener('click', () => choose('accepted'));
  revisit.addEventListener('click', () => preferences.showModal());
  preferences.querySelector('[data-close]').addEventListener('click', () => preferences.close());
  preferences.querySelector('[data-save]').addEventListener('click', () => choose('required-only'));
});
