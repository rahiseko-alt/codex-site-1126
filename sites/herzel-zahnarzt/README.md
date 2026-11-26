# Herzel Dental Practice 英語版

[元サイト](https://herzel-zahnarzt.de/en/) · [公開デモ](https://herzel-zahnarzt-en-recreation.kkoheikosehira.chatgpt.site/en/) · [検証記録](docs/design-qa.md)

## 起動

Node.js 20 以上で、このフォルダから実行する。

```sh
npm ci
npm run dev
```

`http://127.0.0.1:4190/en/` を開く。`npm run build` は `site/` を `dist/` に書き出す。ビルド版は `npm start` で確認できる。

## 収録範囲

英語版の公開21ページ、WordPress テーマの配信 CSS と JavaScript、画像とフォントを収録した。[ページ一覧](docs/routes.txt)

ドイツ語への切り替えは公式サイトを開く。予約は公式の Dr. Flex に移動する。FAQ の問い合わせは公式サイトで入力する。プライバシーバナーの選択は閲覧者のブラウザに保存する。

## 再デプロイ

このフォルダだけを `.openai/hosting.json` にある Sites プロジェクトのソースに同期する。そのコミットで `npm ci && npm run build` を実行し、`tar -czf /tmp/herzel-zahnarzt-sites.tar.gz .openai/hosting.json dist` で梱包する。Sites でバージョンを保存し、本番へデプロイする。
