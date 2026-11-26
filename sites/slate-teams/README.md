# Slate 公開マーケティングサイトの再現

[元サイト](https://slateteams.com/) · [公開版](https://slate-marketing-recreation.kkoheikosehira.chatgpt.site/) · [比較と検証](docs/design-qa.md)

## 新しい環境で動かす

Node.js 20 以上と npm を使用します。

```sh
git clone https://github.com/rahiseko-alt/codex-site-1126.git
cd codex-site-1126/sites/slate-teams
npm ci
npm run dev
```

<http://127.0.0.1:4176/> を開きます。別のポートを使う場合は `npm run dev -- --port 4180` を実行します。

- `site/` に、ホーム、製品、用途、料金、掲載記事、更新履歴など467ページ分の配信済み HTML、Astro のバンドル、画像、フォントを収録しています。Astro のビルド前のコンポーネントは含んでいません。
- `site/_astro/` はページ遷移、メニュー、カルーセル、Rive のアニメーションなどを含みます。画像の一部と大きな GIF は配信用に WebP に変換しています。
- `site/reproduction.js` は問い合わせ・イベントの送信を受け取らずに元サイトへ案内します。ログイン、登録、Safe Zones ツールも元の公開先を開きます。Mux の動画と一部の外部素材はインターネット接続が必要です。
- `npm run build` が `dist/` を生成します。その出力を確認するには `npm start` を使います。変更は `site/` またはビルドに入れます。

## 確認する

Chromium で 1440 × 900 と 390 × 844、DPR 1 を基準に、[比較画像](docs/design-qa.md)と見比べます。トップの最初のアニメーションが終わってから、PC の製品メニュー、スマホメニュー、料金、製品詳細、Resources カテゴリを確認してください。動画や動くグラフィックは撮影の時点で変わります。

## Sites を更新する

1. 対象コミットから `git archive <GitHubのSHA>:sites/slate-teams | tar -x -C <展開先>` でこのサイトだけを取り出します。
2. [サイト設定](.openai/hosting.json)で対象を確認し、Sites のソースリポジトリを別の場所に checkout して同期します。
3. Sites ソースのルートで `npm ci` と `npm run build` を実行します。変更をコミットし、Sites のソースブランチへ送ります。大きい変更は、ホストの push 上限に合わせて複数のコミットに分けて順に送れます。
4. 同じルートで `tar -czf /tmp/slate-teams.tar.gz .openai/hosting.json dist` を実行します。アーカイブと Sites 側に送った SHA で版を保存・デプロイします。既存の公開設定を維持し、ログインしていないブラウザから確認します。

別の静的ホストでは `dist/` を公開し、拡張子なしのURLを対応する `index.html` へ解決できるようにします。
