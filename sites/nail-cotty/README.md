# Nail Salon Cotty

[元サイト](https://nail-cotty.com/) · [公開デモ](https://nail-cotty-site-recreation.kkoheikosehira.chatgpt.site/) · [検証記録](docs/design-qa.md)

## 起動

Node.js 20 以上で、このフォルダから実行する。

```sh
npm ci
npm run dev
```

`http://127.0.0.1:4183/` を開く。`npm run build` は `site/` を `dist/` に書き出す。ビルド版は `npm start` で確認する。

## 収録範囲

公開ページ2件の HTML、配信バンドル、スタイル、素材を収録。収録URLは [ページ一覧](docs/routes.txt) に記載した。購入・予約・会員機能・外部送信は公式ページを開く。公開データや外部埋め込みの一部には元の配信先を利用する。

## 再デプロイ

このフォルダだけを `.openai/hosting.json` に記載した Sites プロジェクトのソースへ同期する。そのコミットで `npm ci && npm run build` を実行し、`tar -czf /tmp/nail-cotty-sites.tar.gz .openai/hosting.json dist` で梱包する。Sites でバージョンを保存し、本番へデプロイする。
