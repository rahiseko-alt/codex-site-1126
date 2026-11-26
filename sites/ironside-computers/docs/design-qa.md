# Ironside Computers 検証記録

公開 HTML、Next.js バンドル、ページデータ、スタイル、配信時のネットワークリクエストを確認した。PC 1440×900 とモバイル 390×844 の Chromium で、元サイトとローカル版を並べた。比較画像は左が元サイト、右がローカル版。

| 画面 | 比較画像 |
| --- | --- |
| トップ | [PC](qa/desktop-home.webp) · [モバイル](qa/mobile-home.webp) |
| 商品メニュー | [PC](qa/desktop-menu.webp) · [モバイル](qa/mobile-menu.webp) |
| 商品一覧 | [PC](qa/desktop-all-pcs.webp) |
| Tokyo Dream | [PC](qa/desktop-tokyo-dream.webp) |

収録した92のページをローカルで開き、HTTP 200 を確認した。動画とスクロール演出の表示フレームは撮影タイミングで異なる。Tokyo Dream は初回描画で React のハイドレーション警告を出すことがある。ブラウザで再描画後に商品画面が表示される。
