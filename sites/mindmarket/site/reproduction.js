// Open a draft for the visitor without calling the original submission services.
export function openContactDraft(values) {
  const body = Object.entries(values)
    .filter(([key, value]) => value && !['form-name', 'g-recaptcha-response'].includes(key))
    .map(([key, value]) => `${key.replaceAll('_', ' ')}: ${Array.isArray(value) ? value.join(', ') : value}`)
    .join('\n\n');
  const subject = encodeURIComponent('MindMarket research enquiry');
  window.location.href = `mailto:curious@mindmarket.com?subject=${subject}&body=${encodeURIComponent(body)}`;
}
