# 元サイトと再現版の確認

左が元サイト、右が再現版。Chromium で PC 1440 × 900、スマホ 390 × 844、DPR 1 の画面を撮影した。

| 確認箇所 | 比較画像 |
| --- | --- |
| トップの PC 表示 | [画像](qa/desktop-home.webp) |
| トップのスマホ表示 | [画像](qa/mobile-home.webp) |
| PC のメニュー | [画像](qa/desktop-menu.webp) |
| スマホのメニュー | [画像](qa/mobile-menu.webp) |
| 料金 | [画像](qa/desktop-pricing.webp) |
| Network | [画像](qa/desktop-network.webp) |
| Services | [画像](qa/desktop-services.webp) |

見出しの書体・寸法、背景色、余白、画像とメニューを比較した。Rive のアニメーションは撮影時点で絵の位置が変わる。一部の写真は配信サイズを小さくするため WebP に変換した。

全179ページが HTTP 200 で応答した。料金の市場数を6以上に変更すると見積もりの要約が変わること、Network に日本ページへのリンクがあり日本ページが開くこと、スマホメニューから料金へ移動できることを確認した。問い合わせフォームは表示し、送信処理はメールの下書きを開く処理に置き換えた。表示検証で見つかった Netlify の画像変換への参照は、同じ画像をローカルに置いて解消した。

final result: passed
