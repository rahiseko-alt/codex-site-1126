# Christen Dijoux ポートフォリオの再現とデプロイ

[元サイト](https://christendijoux.com/) · [公開版](https://christen-dijoux-recreation.kkoheikosehira.chatgpt.site/) · [比較と検証](docs/design-qa.md)

## 新しい環境で動かす

Node.js 20 以上と npm を使います。

```sh
git clone https://github.com/rahiseko-alt/codex-site-1126.git
cd codex-site-1126/sites/christen-dijoux
npm ci
npm run dev
```

ブラウザで <http://127.0.0.1:4174/> を開きます。ポートを変える場合は `npm run dev -- --port 4180` を使います。

- `site/` に公開配信されていた React の HTML・CSS・バンドルと、フォント、画像、PDF、GitHub 一覧のスナップショットを収録しています。React のビルド前のソースは含まれていません。
- `site/assets/reproduction.mjs` にメールの下書きと、元サイトの星探しへのリンクを置いています。
- `npm run build` で `dist/` が生成されます。ビルドはその中身からサービスワーカーのキャッシュ一覧も生成します。変更は `site/` または `scripts/` に入れます。

## 検証する

Chromium で 1440 × 900 と 390 × 844、DPR 1 でトップを開き、フォントが読み込まれてから[比較画像](docs/design-qa.md)を参照します。英仏切替、モバイルメニュー、作品一覧の検索、詳細、Lab、CV、アシスタントを確認してください。時刻、マウスに反応するグラフィック、スクロール中の表示は撮影の瞬間で変わります。

問い合わせは元サイトの EmailJS へ送信せず、端末のメールアプリに下書きを開きます。元サイトのアクセス解析は組み込んでいません。星探しゲームは元サイトへのリンクで、作品紹介からの外部デモも元のリンクを開きます。

## Sites を更新する

1. 対象サイトをビルドし、GitHub にコミットを送ります。
2. [このサイトの設定](.openai/hosting.json)で既存の Sites プロジェクトを確認します。Sites 用ソースリポジトリを別に checkout し、GitHub のルートで `git archive <GitHubのSHA>:sites/christen-dijoux | tar -x -C <展開先>` を実行して、このサイトだけを同期します。
3. Sites 側のルートで `npm ci`、`npm run build` を実行し、変更をコミットして、Sites 側のソースブランチへ送ります。
4. Sites 側のルートで `tar -czf /tmp/christen-dijoux.tar.gz .openai/hosting.json dist` を作ります。このアーカイブと Sites 側に送ったコミットの SHA で保存・デプロイし、公開URLをログインなしで確認します。

別のホストを使う場合は `dist/` を静的配信し、`/projects` などを対応する `index.html` に解決するように設定します。
