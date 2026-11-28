const byId = id => document.getElementById(id);
const currency = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');

const products = [
  { id: 'amber', name: '琥珀', color: 'べっ甲・ブラウン', length: 'long', price: 2980, photo: 'amber.webp', description: '透けるべっ甲色に、銅色の箔を重ねたロングチップ。' },
  { id: 'milk', name: '淡雪', color: '乳白色・ピンク', length: 'short', price: 2680, photo: 'milk.webp', description: '乳白色に淡いピンクを重ねた、つややかなショートチップ。' },
  { id: 'mist', name: '薄墨', color: 'グレー・シルバー', length: 'short', price: 2980, photo: 'mist.webp', description: '透け感のあるグレーに細い銀のラインを引いたショートチップ。' },
  { id: 'leaf', name: '若葉', color: 'オリーブ・グリーン', length: 'short', price: 2480, description: '抹茶を思わせる落ち着いたオリーブのショートチップ。' },
  { id: 'wine', name: '葡萄', color: 'ボルドー・赤', length: 'long', price: 2680, description: '光に透けるような深いボルドーのロングチップ。' },
];
const gift = { id: 'gift', name: 'ギフトカード', price: 5000 };
const stock = new Map([...products, gift].map(product => [product.id, product]));
const cart = new Map();
let selectedProduct;
let dialogOpener;

function productImage(id) {
  return '/assets/tips-' + id + '.webp';
}

function showDialog(id, opener) {
  const previous = document.querySelector('dialog[open]');
  if (previous) previous.close();
  dialogOpener = opener?.closest('dialog') ? dialogOpener : opener;
  byId(id).showModal();
}

for (const dialog of document.querySelectorAll('dialog')) {
  dialog.querySelector('.close-button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) dialogOpener?.focus({ preventScroll: true });
  });
  for (const link of dialog.querySelectorAll('a[href^="#"]')) {
    link.addEventListener('click', () => dialog.close());
  }
}

for (const button of document.querySelectorAll('[data-open]')) {
  button.addEventListener('click', () => showDialog(button.dataset.open, button));
}

function showProduct(product, opener) {
  selectedProduct = product;
  byId('product-title').textContent = product.name;
  byId('product-description').textContent = product.description;
  byId('product-price').textContent = currency.format(product.price);
  const image = byId('product-preview');
  image.src = productImage(product.id);
  image.alt = product.name + 'のネイルチップ';
  showDialog('product-detail', opener);
}

const reveal = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('revealed');
    reveal.unobserve(entry.target);
  }
}, { threshold: .12 }) : null;

if (reveal) {
  document.documentElement.classList.add('has-motion');
  for (const section of document.querySelectorAll('[data-reveal]')) reveal.observe(section);
}

const cards = [];
for (const [index, product] of products.entries()) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'product';
  card.dataset.reveal = '';
  card.dataset.length = product.length;
  card.style.setProperty('--delay', (index * 55) + 'ms');
  const photos = document.createElement('span');
  photos.className = 'product-image';
  for (const src of [productImage(product.id), product.photo ? '/assets/' + product.photo : productImage(product.id)]) {
    const image = new Image();
    image.src = src;
    image.alt = '';
    image.loading = 'lazy';
    photos.append(image);
  }
  const name = document.createElement('strong');
  name.textContent = product.name;
  const price = document.createElement('span');
  price.textContent = currency.format(product.price) + '（税込）';
  card.append(photos, name, price);
  card.addEventListener('click', () => showProduct(product, card));
  byId('products').append(card);
  cards.push(card);
  reveal?.observe(card);
}

function showLength(length) {
  for (const card of cards) card.hidden = Boolean(length) && card.dataset.length !== length;
  byId('collection-title').textContent = length === 'long' ? 'ロングのネイルチップ' : length === 'short' ? 'ショートのネイルチップ' : 'ネイルチップを選ぶ';
}

for (const link of document.querySelectorAll('a[data-length]')) {
  link.addEventListener('click', () => {
    showLength(link.dataset.length);
    const dropdown = link.closest('details');
    if (dropdown) dropdown.open = false;
  });
}
byId('show-all').addEventListener('click', () => showLength());

function renderSearch() {
  const query = byId('search-input').value.trim().toLocaleLowerCase('ja');
  const matches = products.filter(product => (product.name + ' ' + product.color).toLocaleLowerCase('ja').includes(query));
  const results = byId('search-results');
  results.replaceChildren();
  for (const product of matches) {
    const row = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = product.name;
    button.addEventListener('click', () => showProduct(product, button));
    row.append(button, currency.format(product.price));
    results.append(row);
  }
  if (!matches.length) {
    const message = document.createElement('li');
    message.textContent = '該当する商品はありません。';
    results.append(message);
  }
}
byId('search-input').addEventListener('input', renderSearch);
renderSearch();

function renderCart() {
  const list = byId('cart-items');
  list.replaceChildren();
  let total = 0;
  let count = 0;
  for (const [id, quantity] of cart) {
    const product = stock.get(id);
    count += quantity;
    total += product.price * quantity;
    const row = document.createElement('li');
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = '1点取り消す';
    remove.setAttribute('aria-label', product.name + 'を1点取り消す');
    remove.addEventListener('click', () => {
      if (quantity === 1) cart.delete(id);
      else cart.set(id, quantity - 1);
      renderCart();
      (byId('cart-items').querySelector('button') || byId('cart').querySelector('.close-button')).focus();
    });
    row.append(product.name + ' × ' + quantity, remove);
    list.append(row);
  }
  byId('cart-total').textContent = count ? '合計 ' + currency.format(total) + '（税込）' : 'バッグは空です。';
  byId('bag-count').textContent = count;
  byId('bag-count').hidden = !count;
}

function addToBag(product, opener) {
  cart.set(product.id, (cart.get(product.id) ?? 0) + 1);
  renderCart();
  showDialog('cart', opener);
}
byId('add-to-bag').addEventListener('click', event => addToBag(selectedProduct, event.currentTarget));
byId('add-gift').addEventListener('click', event => addToBag(gift, event.currentTarget));
renderCart();

const slideshow = document.querySelector('.slideshow');
const slides = [...slideshow.querySelectorAll('.slide')];
const dots = [...slideshow.querySelectorAll('.slide-dot')];
const playbackButton = slideshow.querySelector('.playback');
let currentSlide = 0;
let autoPlay = !motionPreference.matches;
let timer;
let heroVisible = true;
let swipeStart;

function showSlide(index) {
  const leaving = slides[currentSlide];
  if (leaving.contains(document.activeElement)) dots[index].focus({ preventScroll: true });
  currentSlide = index;
  slides.forEach((slide, position) => {
    const active = position === index;
    slide.classList.toggle('is-current', active);
    slide.inert = !active;
    if (active) slide.removeAttribute('aria-hidden');
    else slide.setAttribute('aria-hidden', 'true');
  });
  dots.forEach((dot, position) => {
    if (position === index) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
}

function scheduleSlide() {
  clearTimeout(timer);
  const focused = document.activeElement;
  if (!autoPlay || !heroVisible || document.hidden || (focused !== playbackButton && slideshow.contains(focused))) return;
  timer = setTimeout(() => {
    showSlide((currentSlide + 1) % slides.length);
    scheduleSlide();
  }, 7000);
}

function updatePlayback() {
  playbackButton.textContent = autoPlay ? 'Ⅱ' : '▶';
  playbackButton.setAttribute('aria-label', autoPlay ? '自動再生を一時停止' : '自動再生を開始');
  scheduleSlide();
}
for (const dot of dots) {
  dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.slide));
    scheduleSlide();
  });
}
playbackButton.addEventListener('click', () => {
  autoPlay = !autoPlay;
  updatePlayback();
});
slideshow.addEventListener('pointerdown', event => {
  if (event.pointerType !== 'touch' || event.target.closest('a, button')) return;
  swipeStart = { x: event.clientX, y: event.clientY };
});
slideshow.addEventListener('pointercancel', () => { swipeStart = undefined; });
slideshow.addEventListener('pointerup', event => {
  if (!swipeStart) return;
  const deltaX = event.clientX - swipeStart.x;
  const deltaY = event.clientY - swipeStart.y;
  swipeStart = undefined;
  if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) return;
  showSlide((currentSlide + (deltaX < 0 ? 1 : slides.length - 1)) % slides.length);
  scheduleSlide();
});
slideshow.addEventListener('focusin', scheduleSlide);
slideshow.addEventListener('focusout', () => requestAnimationFrame(scheduleSlide));
document.addEventListener('visibilitychange', scheduleSlide);
motionPreference.addEventListener('change', event => { autoPlay = !event.matches; updatePlayback(); });
if (reveal) new IntersectionObserver(entries => {
  heroVisible = entries[0].isIntersecting;
  scheduleSlide();
}).observe(slideshow);
updatePlayback();

const tips = [
  ['爪の幅を測る', '爪のいちばん広いところを、柔らかいメジャーで曲面に沿って測ります。'],
  ['大きい方を選ぶ', 'サイズの境目では少し大きいチップを選び、ファイルで端を整えます。'],
  ['根元から押さえる', '爪の油分を拭いたあと、根元から先端に向けて空気を抜くように押さえます。'],
];
let tipIndex = 0;
function moveTip(amount) {
  tipIndex = (tipIndex + amount + tips.length) % tips.length;
  byId('guide-title').textContent = tips[tipIndex][0];
  byId('guide-copy').textContent = tips[tipIndex][1];
}
byId('guide-prev').addEventListener('click', () => moveTip(-1));
byId('guide-next').addEventListener('click', () => moveTip(1));
byId('newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  byId('newsletter-result').textContent = '入力形式を確認しました。メールアドレスは送信されません。';
  event.currentTarget.reset();
});

const bookingForm = byId('booking-form');
const bookingResult = byId('booking-result');
const timeZone = 'Asia/Tokyo';
function showBookingForm() {
  bookingForm.hidden = false;
  bookingResult.hidden = true;
}
for (const button of document.querySelectorAll('[data-book]')) {
  button.addEventListener('click', () => {
    bookingForm.elements.date.min = new Intl.DateTimeFormat('sv-SE', {
      timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(new Date());
    showBookingForm();
    showDialog('booking', button);
    bookingForm.elements.service.focus();
  });
}

bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  const values = new FormData(bookingForm);
  const date = new Date(values.get('date') + 'T00:00:00+09:00');
  const formattedDate = new Intl.DateTimeFormat('ja-JP', { timeZone, dateStyle: 'long' }).format(date);
  byId('result-service').textContent = values.get('service');
  byId('result-time').textContent = formattedDate + ' ' + values.get('time') + '（日本時間）';
  byId('result-removal').textContent = values.has('removal') ? 'ジェルのオフあり' : 'ジェルのオフなし';
  bookingForm.hidden = true;
  bookingResult.hidden = false;
  byId('result-title').focus();
});

byId('edit-booking').addEventListener('click', () => {
  showBookingForm();
  bookingForm.elements.service.focus();
});

const entry = new URLSearchParams(location.search);
const productId = entry.get('product');
if (products.some(product => product.id === productId)) showProduct(stock.get(productId));
else if (entry.has('search')) {
  byId('search-input').value = entry.get('q') || '';
  renderSearch();
  showDialog('search');
} else if (location.hash === '#booking') {
  document.querySelector('.header-book').click();
} else if (location.hash === '#bag') showDialog('cart');
if (['short', 'long'].includes(entry.get('length'))) showLength(entry.get('length'));
