# 表示と操作の確認

Chromium で元サイトと再現版を同じサイズで撮影した。左が元サイト、右が再現版。

- [PC のトップ 1440 × 900](qa/desktop-home.webp)
- [スマホのトップ 390 × 844](qa/mobile-home.webp)
- [サービス拠点](qa/desktop-areas.webp)
- [早期介入プログラム](qa/desktop-programs-0-to-3.webp)
- [FAQ](qa/desktop-faq.webp)

書体・余白・色・画像を比較した。トップのロゴや文字はアニメーションの描画時点で形が変わる。全39ページの HTTP 200、FAQ と拠点ページの移動を確認した。問い合わせの入力欄を無効にして、公式フォームへ案内する。元サイトと再現版の問い合わせページでは、どちらも React の復旧可能な警告を確認した。

final result: passed
