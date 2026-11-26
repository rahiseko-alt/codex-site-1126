# Eliza Doltu ポートフォリオ

[元サイト](https://www.elizadoltuofficial.net/) · [公開デモ](https://eliza-doltu-portfolio-recreation.kkoheikosehira.chatgpt.site/) · [比較画像と検証記録](docs/design-qa.md)

## ローカルで起動

Node.js 20 以上でこのフォルダを開く。

```sh
npm ci
npm run dev
```

`http://127.0.0.1:4182/` を開く。配信用は `npm run build` で `dist/` にまとまる。ビルドのプレビューは `npm start` を使う。

## 実装

- `site/` にトップと作品詳細4ページの入口、React/Vite の公開バンドル、画像、フォントを収録。
- About、Work、Contact はトップ内のセクション。作品詳細は `/projects/<id>` にあり、直接開ける。
- Contact のメールリンクは閲覧者のメールアプリを開く。タイポグラフィ用の Montserrat と Urbanist はローカル配信する。

## 公開を更新

このフォルダだけを `.openai/hosting.json` の Sites プロジェクトのソースに同期する。同じコミットから `npm ci && npm run build` を実行し、`tar -czf /tmp/eliza-doltu-sites.tar.gz .openai/hosting.json dist` で梱包する。Sites でバージョンを保存して本番へデプロイする。
