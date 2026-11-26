# Bohdan Ratiiev ポートフォリオ

[元サイト](https://www.bratiiev.com/) · [公開デモ](https://bratiiev-portfolio-recreation.kkoheikosehira.chatgpt.site/) · [比較画像と検証記録](docs/design-qa.md)

## ローカルで起動

Node.js 20 以上でこのフォルダを開く。

```sh
npm ci
npm run dev
```

`http://127.0.0.1:4181/` を開く。配信用は `npm run build` で `dist/` にまとまる。ビルドのプレビューは `npm start` を使う。

## 実装

- `site/` に公開13ページの HTML、初期描画データ、Next.js 配信バンドル、フォント、動画、画像がある。
- `site/reproduction.js` は公開ページ間のリンクを、個別の HTML を開く通常のナビゲーションにする。
- カスタムカーソル、イントロ、作品のメディアは元サイトの公開バンドルで動作する。

## 公開を更新

このフォルダだけを `.openai/hosting.json` の Sites プロジェクトのソースに同期する。同じコミットから `npm ci && npm run build` を実行し、`tar -czf /tmp/bratiiev-sites.tar.gz .openai/hosting.json dist` で梱包する。Sites でバージョンを保存して本番へデプロイする。

Contact で送信操作をすると、入力値を渡さずに元サイトのフォームを開く。
