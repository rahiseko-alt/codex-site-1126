"""Build the Japanese homepage from the saved Paintbox theme markup."""
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import re

ROOT = Path(__file__).resolve().parent.parent

TEXT = {
    'Paintbox': 'nagi nail studio',
    'Pause slideshow': 'スライドを一時停止',
    'Play slideshow': 'スライドを再生',
    'Free shipping': 'ネイルチップと、',
    'on orders over $60': '代々木上原の予約制スタジオ',
    'Close menu': 'メニューを閉じる',
    'Book a Manicure': 'サロンを予約',
    'Press Ons': 'ネイルチップ',
    'All': 'すべて',
    'Designs': 'デザイン',
    'Solid Colors': 'ワンカラー',
    'Bundles': 'セット',
    'Short Length': 'ショート',
    'Medium Length': 'ミディアム',
    'Long Length': 'ロング',
    'The Denim Collection': '季節のコレクション',
    'Custom Press Ons': 'オーダーチップ',
    'Nail Polish': 'ネイルカラー',
    'Singles': '単色',
    'Power Couples': '2色セット',
    'Nail Art Kits': 'ネイルアートキット',
    'Nail Care': 'ネイルケア',
    'Journal': 'ジャーナル',
    'Log in': 'アカウント',
    'Cart': 'バッグ',
    'Close cart': 'バッグを閉じる',
    'You might also like': 'こちらもおすすめ',
    'Previous Slide': '前のスライド',
    'Next Slide': '次のスライド',
    'Add a discount code or gift card': 'クーポン・ギフトカード',
    'Subtotal': '小計',
    '$0.00': '¥0',
    'Shipping, taxes, and discount codes calculated at checkout.': 'バッグは商品選択のデモです。',
    'Check out': '選択内容を確認',
    'Your cart is currently empty.': 'バッグは空です。',
    'Search': '検索',
    'Close search': '検索を閉じる',
    'Site navigation': 'サイトメニュー',
    'Skip to content': '本文へ',
    'Give $10, Get $10': 'はじめてのネイルチップ',
    'Give your friend a $10 discount on their first purchase. When they order using your invite link, you get a $10 discount.': '季節の色と透け感を、指先に。新作から好みのデザインを探せます。',
    'Refer a Friend': '新作を見る',
    '"Close (esc)"': '閉じる（Esc）',
    'Long Length Press Ons': 'ロングチップ',
    'Short Length Press Ons': 'ショートチップ',
    'Short and Chic': '短い爪にも似合う、淡いローズ。',
    'Shop Now': 'デザインを見る',
    'Explore: Press Ons': 'ネイルチップを選ぶ',
    'Tortoise': '琥珀',
    'Sugarcoat': '淡雪',
    'Power Play': '薄墨',
    'Mink': '若葉',
    'Bordeaux': '葡萄',
    '$14.00': '¥2,980',
    '$12.00': '¥2,680',
    'View all': 'すべて見る',
    '74 products': '5デザイン',
    'As Seen In': '色と質感の手帖',
    'NAMED': 'ジャーナル',
    '"Best Press Ons"': '質感を重ねる。',
    'By Cosmopolitan': '色と光の手帖',
    '2024 Holy Grail Beauty Awards': '透ける色と、ささやかな箔。',
    'Read Now': '手帖を読む',
    'Visit Us': 'スタジオのご案内',
    'Paintbox Studio': '代々木上原のスタジオ',
    'Hand-designed nail art as seen on the runways.': '爪の形や日常の装いに合わせたデザインを。',
    'Gift Cards': 'ギフトカード',
    'Give the gift of the Paintbox experience for a manicure that tells a story.': 'ネイルを贈る。色を選ぶ時間まで、ギフトに。',
    'Buy a Gift Card': 'ギフトカードを見る',
    'Get Inspired': '指先のアイデア',
    'Follow us on Instagram & TikTok @paintboxnails': '装いや季節に合わせたデザインを、スタジオの手帖から。',
    'Follow': 'デザインを見る',
    'Join Our Community': '新作のお知らせ',
    'Subscribe to our newsletter to be the first to know about new launches, sales and promotions, updates, and more!': '季節のデザインを届けるスタジオレターの登録デモです。',
    'Enter your email': 'メールアドレス',
    'Subscribe': '登録を確認',
    'Support': 'サポート',
    'F.A.Q.': 'よくある質問',
    'Privacy Policy': 'プライバシー',
    'Terms and Conditions': 'ご利用案内',
    'Accessibility': 'アクセシビリティ',
    'Contact Us': 'お問い合わせ',
    'Follow us': 'デザインを見る',
    'Instagram': 'デザインの手帖',
    'TikTok': '季節のデザイン',
    'Pinterest': 'カラーカタログ',
    'Facebook': 'スタジオのご案内',
    'Newsletter': 'スタジオレター',
    'Our Studio': 'スタジオ',
    'Careers': 'スタジオについて',
    'Press': 'ジャーナル',
    'Shop Wholesale': 'オーダーチップ',
}

PICTURES = {
    'email-logo.jpg': 'wordmark.webp',
    'Untitled-2_2445ff61-0636-4042-af7d-6f899dc986ca.webp': 'hands.webp',
    'Sugarcoat4.jpg': 'tips-milk.webp',
    'IMG_1407_0b6472cd-5c31-4da5-8db1-3234cd4e8ade.jpg': 'short-hero.webp',
    'Tortoise5.jpg': 'tips-amber.webp',
    'forshop.jpg': 'amber.webp',
    'IMG_7063_jpg.jpg': 'milk.webp',
    'Powerplay3.jpg': 'tips-mist.webp',
    'paintbox-4_1.jpg': 'mist.webp',
    'IMG_7580.jpg': 'tips-leaf.webp',
    'IMG_7584.jpg': 'tips-leaf.webp',
    'IMG_3355.jpg': 'tips-wine.webp',
    'IMG_6441.jpg': 'hero.webp',
    'PB-Homepage-press-vogue.webp': 'mark-awayuki.webp',
    'PB-Homepage-press-allure.webp': 'mark-kohaku.webp',
    'PB-Homepage-press-brides.webp': 'mark-usuzumi.webp',
    'PB-Homepage-press-elle.webp': 'mark-wakaba.webp',
    'Cosmopolitan-Emblem.png': 'mark-budou.webp',
    'Glamour-Logo.png': 'mark-kage.webp',
    'byrdie-logo.png': 'mark-tsuya.webp',
    'KOIcopy.webp': 'amber.webp',
    'PB-Homepage-PROMO-studio_9efa50d8-006f-491b-a3ff-38167cefd37c.webp': 'studio.webp',
    'SpringSummer_Editorial_09_005_0.5x_1280x1280_crop_center_c483eda5-db45-4205-a983-7aed6da2d25e.webp': 'gift-art.webp',
    'IMG_8108-ezgif.com-optimize.gif': 'inspiration.gif',
}
PRODUCTS = {'tortoise': 'amber', 'sugarcoat': 'milk', 'power-play': 'mist', 'mink': 'leaf', 'bordeaux': 'wine'}
COLLECTION = '#shopify-section-template--18688229670959__rich_text_APBfEt'
LINKS = {
    '/pages/services': '/demo/#booking',
    '/pages/refer': COLLECTION,
    '/pages/location': '/demo/#studio',
    '/pages/careers': '/demo/#studio',
    '/pages/faq': '/demo/#guide',
    '/pages/contact': '/demo/#studio',
    '/pages/terms-and-conditions': '/demo/#guide',
    '/pages/accessibility': '/demo/#guide',
    '/policies/privacy-policy': '/demo/#guide',
    '/blogs/press': '/demo/#journal',
    '/blogs/journal': '/demo/#journal',
    '/products/gift-card-1': '/demo/#gift',
    '/search': '/demo/?search=1',
    '/cart': '/demo/#bag',
    '/account': '/demo/#studio',
}
PALETTE = {
    'colorAnnouncement': '#4b162c', 'colorBody': '#fffaf8', 'colorBodyDim': '#f4e7eb',
    'colorBodyLightDim': '#f9eef2', 'colorBodyMediumDim': '#f5e5eb', 'colorBorder': '#e3cdd5',
    'colorBtnPrimary': '#59223b', 'colorBtnPrimaryLight': '#793852', 'colorBtnPrimaryDim': '#45192c',
    'colorCartDot': '#ad4b76', 'colorDrawers': '#fffaf8', 'colorDrawersDim': '#f2e2e9',
    'colorDrawerBorder': '#e3cdd5', 'colorDrawerText': '#40172a', 'colorDrawerTextDark': '#40172a',
    'colorDrawerButton': '#59223b', 'colorFooter': '#f1dce6', 'colorFooterText': '#411a2f',
    'colorGridOverlay': '#3e142b', 'colorSmallImageBg': '#f6e8ee', 'colorLargeImageBg': '#431831',
    'colorImageOverlay': '#29101d', 'colorImageOverlayOpacity': '.22', 'colorLink': '#59223b',
    'colorModalBg': '#6b4056', 'colorNav': '#fcf1f5', 'colorNavText': '#42182c',
    'colorPrice': '#53203a', 'colorSaleTag': '#8d355c', 'colorTextBody': '#49273a',
}

ATTRIBUTE = re.compile(r'(?P<lead>\s)(?P<name>[\w:-]+)\s*=\s*(?P<quote>["\'])(?P<value>.*?)(?P=quote)', re.S)


def href(value):
    url = urlsplit(value)
    if value.startswith(('/cdn/', '/__assets/', '#')) or value == '/':
        return value
    path = url.path
    if path.startswith('/collections/'):
        if 'short-length' in path:
            return '/demo/?length=short#collection'
        if 'long-length' in path:
            return '/demo/?length=long#collection'
        if path.endswith('nail-care'):
            return '/demo/#guide'
        return COLLECTION
    if path.startswith('/products/') and path.rsplit('/', 1)[-1] in PRODUCTS:
        return '/demo/?product=' + PRODUCTS[path.rsplit('/', 1)[-1]]
    if 'zenoti.com' in url.netloc:
        return '/demo/#booking'
    if 'cosmopolitan.com' in url.netloc:
        return '/demo/#journal'
    if url.netloc and url.netloc not in ('paint-box.com', 'www.paint-box.com'):
        return '/demo/#inspiration' if any(network in url.netloc for network in ('instagram', 'facebook', 'tiktok', 'pinterest')) else '/demo/#studio' if url.netloc.endswith('faire.com') else LINKS.get(path, value)
    return LINKS.get(path, value)


class LocalizedHTML(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.parts = []
        self.raw_tag = None

    def emit_tag(self, tag, attrs):
        current = dict(attrs)
        picture = None
        if tag == 'img':
            picture = PICTURES.get(urlsplit(current.get('src', '')).path.rsplit('/', 1)[-1])
            if 'hero__image--image_yCGLEz' in current.get('class', ''):
                picture = 'hero.webp'
            if picture is None and current.get('src'):
                raise ValueError(f"Unmapped image: {current.get('src')}")
        def replace(match):
            name, value = match['name'], match['value']
            updated = value
            if picture and name in ('src', 'srcset'):
                updated = '/assets/' + picture
            elif name in ('lang','hreflang'):
                updated = 'ja'
            elif name == 'href' and tag == 'a':
                updated = href(value)
            elif tag == 'link' and name == 'href' and current.get('rel') == 'canonical':
                updated = 'https://nagi-nail-tokyo.kkoheikosehira.chatgpt.site/'
            elif tag == 'link' and name == 'href' and 'PB_Logo' in value:
                updated = '/assets/wordmark.webp'
            elif tag == 'meta' and name == 'content':
                key = current.get('property', current.get('name', ''))
                if key == 'theme-color':
                    updated = PALETTE['colorAnnouncement']
                elif key in ('og:title', 'og:site_name', 'twitter:title'):
                    updated = 'nagi nail studio'
                elif key in ('description', 'og:description', 'twitter:description'):
                    updated = '日本向けのネイルチップと代々木上原のスタジオ。nagi nail studio のコンセプトサイト。'
                elif key in ('og:image', 'og:image:secure_url', 'twitter:image'):
                    updated = 'https://nagi-nail-tokyo.kkoheikosehira.chatgpt.site/assets/hero.webp'
                elif key == 'og:url':
                    updated = 'https://nagi-nail-tokyo.kkoheikosehira.chatgpt.site/'
            elif name in ('title','aria-label','placeholder','alt'):
                updated = TEXT.get(value, value)
            if value == updated:
                return match[0]
            return match['lead'] + name + '=' + match['quote'] + escape(updated, quote=True) + match['quote']
        self.parts.append(ATTRIBUTE.sub(replace, self.get_starttag_text()))

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.raw_tag = tag
        self.emit_tag(tag, attrs)

    def handle_startendtag(self, tag, attrs):
        self.emit_tag(tag, attrs)

    def handle_endtag(self, tag):
        if self.raw_tag == tag:
            self.raw_tag = None
        self.parts.append('</' + tag + '>')

    def handle_data(self, data):
        text = data.strip()
        if not self.raw_tag and text in TEXT:
            start = len(data) - len(data.lstrip())
            data = data[:start] + escape(TEXT[text]) + data[start + len(text):]
        elif self.raw_tag == 'script':
            data = data.replace('Your cart is currently empty.', 'バッグは空です。')
            data = data.replace('${{amount}}', '¥{{amount_no_decimals}}')
        self.parts.append(data)

    def handle_entityref(self, name):
        self.parts.append('&' + name + ';')

    def handle_charref(self, name):
        self.parts.append('&#' + name + ';')

    def handle_decl(self, declaration):
        self.parts.append('<!' + declaration + '>')

    def handle_comment(self, comment):
        self.parts.append('<!--' + comment + '-->')


source = (ROOT / 'theme/index.source.html').read_text()
source = re.sub(r'Follow us on Instagram\s*(?:&amp;|&)\s*TikTok @paintboxnails', TEXT['Follow us on Instagram & TikTok @paintboxnails'], source)
parser = LocalizedHTML()
parser.feed(source)
parser.close()
(ROOT / 'dist/index.html').write_text(''.join(parser.parts))

css = ROOT / 'dist/cdn/shop/t/74/assets/theme.css'
styles = css.read_text()
for key, value in PALETTE.items():
    styles, count = re.subn(r'(--' + key + r':\s*)[^;\n]+', lambda match: match[1] + value, styles)
    if count == 0:
        raise ValueError(f'Missing theme variable: {key}')
css.write_text(styles)
