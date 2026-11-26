# 検証記録

元サイトの公開 HTML と Next.js の配信バンドルを確認した。Chromium で両方の画面を開き、PC 1440×900 とモバイル 390×844 で比較した。表の画像は左が元サイト、右がローカル版。

| 画面 | PC | モバイル |
| --- | --- | --- |
| トップ | [比較](qa/desktop-home.webp) | [比較](qa/mobile-home.webp) |
| Florenix | [比較](qa/desktop-detail.webp) | [比較](qa/mobile-detail.webp) |

トップ、作品一覧、作品詳細10件、Contact の13ページを確認した。アニメーションや動画の表示フレームは撮影タイミングで異なる。作品間の遷移は個別の HTML を読み込む。問い合わせの送信先は元サイトのフォーム。
