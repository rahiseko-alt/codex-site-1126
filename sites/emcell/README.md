# EmCell 英語版

[元サイト](https://www.emcell.com/) · [公開デモ](https://emcell-site-recreation.kkoheikosehira.chatgpt.site/) · [検証記録](docs/design-qa.md)

## 起動

Node.js 20 以上で、このフォルダから実行する。

```sh
npm ci
npm run dev
```

`http://127.0.0.1:4192/` を開く。`npm run build` で `dist/` を生成し、`npm start` で公開用ビルドを確認できる。

## 収録範囲

英語版115ページの公開情報、CSS、JavaScript、画像を収録した。ブラウザのページ遷移に使う公開 HTML は `site/__fragments/` にある。[ページ一覧](docs/routes.txt)

他の言語と相談は公式サイトへ進む。公開版では相談フォームの入力を無効にした。一部の動画や地図は外部の配信元を利用する。

## 再デプロイ

このフォルダだけを `.openai/hosting.json` の Sites プロジェクトに同期する。そのコミットから `npm ci && npm run build` を実行し、`tar -czf /tmp/emcell-sites.tar.gz .openai/hosting.json dist` で梱包する。Sites でバージョンを保存し、本番へデプロイする。
