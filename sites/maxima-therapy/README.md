# Maxima Therapy 公開サイトの再現

[元サイト](https://maximatherapy.com/) · [公開版](https://maxima-therapy-recreation.kkoheikosehira.chatgpt.site/) · [画面比較](docs/design-qa.md)

Node.js 20 以上を使用します。

```sh
git clone https://github.com/rahiseko-alt/codex-site-1126.git
cd codex-site-1126/sites/maxima-therapy
npm ci
npm run dev
```

ブラウザで <http://127.0.0.1:4180/> を開きます。 `npm run build` が静的配信用の `dist/` を作り、 `npm start` でその出力を確認できます。変更は `site/` に入れます。

`site/` に39ページ分の公開 HTML、React Router のバンドル、画像とフォントを収録しています。問い合わせ、紹介、申立て、応募などで個人情報を入力する場合は、公式サイトのフォームを開きます。外部の患者ポータルや購入先も公式リンクです。

デプロイの際は、GitHub の対象コミットから `git archive <SHA>:sites/maxima-therapy | tar -x -C <展開先>` でこのサイトだけを取り出します。 `.openai/hosting.json` に対応する Sites ソースへ送り、 `npm ci` と `npm run build` を実行し、 `.openai/hosting.json` と `dist/` を tar.gz にして、その Sites 側コミット SHA で版を保存・公開します。
