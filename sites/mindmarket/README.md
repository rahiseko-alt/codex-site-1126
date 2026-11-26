# MindMarket 公開サイトの再現

[元サイト](https://mindmarket.com/) · [公開版](https://mindmarket-recreation.kkoheikosehira.chatgpt.site/) · [比較と検証](docs/design-qa.md)

## 新しい環境で動かす

Node.js 20 以上と npm を使用します。

```sh
git clone https://github.com/rahiseko-alt/codex-site-1126.git
cd codex-site-1126/sites/mindmarket
npm ci
npm run dev
```

<http://127.0.0.1:4177/> を開きます。ポートを変える場合は `npm run dev -- --port 4180` を使います。

- `site/` に179ページ分の HTML、公開済み Astro バンドル、画像、フォント、動画、Rive アニメーションとその実行ファイルを収録しています。Astro のビルド前のソースは含まれていません。
- `site/_astro/` にメニューとページ遷移、料金の見積もり、問い合わせ画面などの処理があります。 `site/reproduction.js` は問い合わせの内容をメールアプリの下書きに開きます。
- `npm run build` が `dist/` を生成します。配信用ビルドをローカルで開くには `npm start` を使います。変更は `site/` またはビルド用スクリプトに入れます。

## 確認する

Chromium の 1440 × 900 と 390 × 844、DPR 1 を基準に、[比較画像](docs/design-qa.md)と見比べます。トップのアニメーション、PC・スマホのメニュー、料金の見積もりで市場数を変えたときの表示、Network から各国ページへの移動を確認します。

問い合わせはフォーム送信の代わりにメールの下書きを開きます。Calendly の予約と外部リンクは元のサービスを開きます。元サイトのアクセス解析は送信しません。

## Sites を更新する

1. GitHub の対象コミットから `git archive <GitHubのSHA>:sites/mindmarket | tar -x -C <展開先>` で、このサイトだけを取り出します。
2. [このサイトの設定](.openai/hosting.json)を確認し、対応する Sites のソースリポジトリに同期します。
3. Sites ソースのルートで `npm ci`、`npm run build` を実行し、コミットして Sites のソースブランチへ送ります。
4. `tar -czf /tmp/mindmarket.tar.gz .openai/hosting.json dist` を作ります。アーカイブと Sites に送った SHA で版を保存・デプロイし、既存の公開設定を維持します。
5. [公開版](https://mindmarket-recreation.kkoheikosehira.chatgpt.site/)のトップと内部ページがログインなしで開くことを確認します。

別の静的ホストに載せる場合は、`dist/` を配信し、拡張子のないリンクが対応する `index.html` に解決するように設定してください。
