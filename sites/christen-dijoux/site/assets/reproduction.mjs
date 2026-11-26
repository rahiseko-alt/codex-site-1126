// Keep the original contact UI without submitting through the original account.
export async function openContactDraft(form) {
  const fields = new FormData(form);
  const subject = `Portfolio — ${fields.get('name')}`;
  const body = `${fields.get('message')}\n\nReply to: ${fields.get('email')}`;
  window.location.href = `mailto:christen.dijoux@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function openReferenceStars() {
  window.open('https://christendijoux.com/', '_blank', 'noopener,noreferrer');
}
