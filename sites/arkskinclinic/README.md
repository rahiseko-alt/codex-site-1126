# ARK SKIN CLINIC

[元サイト](https://arkskinclinic.jp/) · [公開デモ](https://arkskinclinic-site-recreation.kkoheikosehira.chatgpt.site/) · [検証記録](docs/design-qa.md)

## 起動

Node.js 20 以上で、このフォルダから実行する。

```sh
npm ci
npm run dev
```

`http://127.0.0.1:4191/` を開く。`npm run build` で `dist/` を生成し、`npm start` で公開用ビルドを確認できる。

## 収録範囲

WordPress の公開120ページ、テーマの CSS・JavaScript、画像とフォントを収録した。[ページ一覧](docs/routes.txt)

予約は公式の Medical Force、LINE、電話へ進む。Instagram や地図などの外部配信は提供先に依存する。大きな PNG の一部は配信サイズを縮小した。

## 再デプロイ

このフォルダだけを `.openai/hosting.json` の Sites プロジェクトに同期する。そのコミットから `npm ci && npm run build` を実行し、`tar -czf /tmp/arkskinclinic-sites.tar.gz .openai/hosting.json dist` で梱包する。Sites でバージョンを保存し、本番へデプロイする。
