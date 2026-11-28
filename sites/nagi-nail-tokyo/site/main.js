const dialog = document.getElementById('booking');
const form = document.getElementById('booking-form');
const result = document.getElementById('booking-result');
const timeZone = 'Asia/Tokyo';
let opener;

function showForm() {
  form.hidden = false;
  result.hidden = true;
}

for (const button of document.querySelectorAll('[data-book]')) {
  button.addEventListener('click', () => {
    opener = button;
    form.elements.date.min = new Intl.DateTimeFormat('sv-SE', {
      timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(new Date());
    showForm();
    dialog.showModal();
    form.elements.service.focus();
  });
}

dialog.querySelector('.close-button').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => opener?.focus());

form.addEventListener('submit', event => {
  event.preventDefault();
  const values = new FormData(form);
  const date = new Date(values.get('date') + 'T00:00:00+09:00');
  const formattedDate = new Intl.DateTimeFormat('ja-JP', { timeZone, dateStyle: 'long' }).format(date);
  document.getElementById('result-service').textContent = values.get('service');
  document.getElementById('result-time').textContent = formattedDate + ' ' + values.get('time') + '（日本時間）';
  document.getElementById('result-removal').textContent = values.has('removal') ? 'ジェルのオフあり' : 'ジェルのオフなし';
  form.hidden = true;
  result.hidden = false;
  document.getElementById('result-title').focus();
});

document.getElementById('edit-booking').addEventListener('click', () => {
  showForm();
  form.elements.service.focus();
});
