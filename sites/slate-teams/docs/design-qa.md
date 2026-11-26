# 元サイトと再現版の確認

比較画像の左は元サイト、右は再現版。Chromium で PC 1440 × 900、スマホ 390 × 844、DPR 1 の画面を撮影した。

| 確認箇所 | 比較 |
| --- | --- |
| PC のトップ | [画像](qa/desktop-home.webp) |
| スマホのトップ | [画像](qa/mobile-home.webp) |
| PC の製品メニュー | [画像](qa/desktop-menu.webp) |
| スマホのメニュー | [画像](qa/mobile-menu.webp) |
| 料金 | [画像](qa/desktop-pricing.webp) |
| Creation Studio | [画像](qa/desktop-products-creation-studio.webp) |
| Resources | [画像](qa/desktop-resources.webp) |

ナビゲーションの位置、文字、色、画像、メニューを比較した。トップの入力バーや前景グラフィック、メニュー内の画像のフェードは撮影時点で変わる。配信用に一部の画像・アニメーションのサイズと画質を調整した。

467ページが HTTP 200 で HTML を返すことを確認した。トップ、料金、Creation Studio、Resources は PC とスマホの Chromium で開いた。PC の製品メニューから製品詳細、Resources のカテゴリ切替、スマホメニューから料金へ進めることを確認した。フォームの動作を試し、送信せず元サイトへのリンクを表示することも確認した。ログイン、登録、Safe Zones は元サイトを開く。Mux 動画と取得できなかった一部の外部素材は配信元に依存する。

final result: passed
