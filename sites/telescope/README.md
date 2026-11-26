# Telescope ランディングページの再現

[元サイト](https://telescope.fyi/) · [公開版](https://telescope-landing-recreation.kkoheikosehira.chatgpt.site/) · [画面比較](docs/design-qa.md)

Node.js 20 以上で作業します。

```sh
git clone https://github.com/rahiseko-alt/codex-site-1126.git
cd codex-site-1126/sites/telescope
npm ci
npm run dev
```

<http://127.0.0.1:4179/> を開きます。 `npm run build` で静的配信用の `dist/` を作り、 `npm start` でその出力を確認できます。

`site/` は公開済み Nuxt ランディングページと画像・フォントのスナップショットです。ヒーローの写真は元サイトと同じく切り替わります。ログイン・登録とランディングページ外の機能は公式サイトへ移動します。

デプロイする場合は、GitHub のコミットからこのフォルダだけを `git archive <SHA>:sites/telescope | tar -x -C <展開先>` で取り出します。 `.openai/hosting.json` に対応する Sites ソースへ送り、 `npm ci` と `npm run build` を実行し、 `.openai/hosting.json` と `dist/` を tar.gz にして、Sites に送った SHA で版を保存・公開します。
