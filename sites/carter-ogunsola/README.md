# Carter Ogunsola ポートフォリオの再現とデプロイ

[元サイト](https://carterogunsola.com/)の公開ページを取り込んだものです。[公開版](https://codex-site-1126.kkoheikosehira.chatgpt.site/)はログインなしで閲覧できます。製品コードはこのリポジトリ内にあり、起動や検証に特定の AI、クラウド環境、元サイトのアカウントは不要です。

## 新しい環境で動かす

Node.js 20 以上と npm を使います。

```sh
git clone https://github.com/rahiseko-alt/codex-site-1126.git
cd codex-site-1126/sites/carter-ogunsola
npm ci
npm run dev
```

<http://127.0.0.1:4173/> を開きます。別の端末から見る場合は `npm run dev -- --host 0.0.0.0 --port 4173` で起動します。

| 場所 | 内容 |
| --- | --- |
| `site/` | 全20ページ。元サイトから取得した HTML、Astro の配信バンドル、フォント、画像、動画、3Dモデル |
| `site/index.html` | トップと17件の作品データ |
| `site/_astro/` | 配信済みの CSS と JavaScript。Astro のビルド前のコンポーネントは含まれない |
| `site/assets/source/` | 元の画像 CDN から取り込んだ画像と動画。ファイル名のサイズや品質の指定を含むパスはコードから参照される |
| `site/data/` | ラジオ、GitHub 活動、LCP などの取得時点のデータ |
| `server.mjs` | ローカル配信と、接続した端末間のカーソル・チャット中継 |
| `scripts/build.mjs` | `site/` から `dist/` を生成。Sites 向けには静的配信の調整も適用 |

変更は `site/` またはビルド用スクリプトに入れます。 `dist/` はビルドのたびに作り直されます。

## 公開版と同じファイルを作る

以降のコマンドも、このサイトフォルダで実行します。

```sh
npm run build:sites
npm start -- --port 4173
```

Sites に載っているのは、このビルドで生成した `dist/` です。ローカルサーバーの WebSocket 中継まで確認する場合は `npm run build` の後に `npm start` で起動してください。

Chromium でトップを開き、WebGL のカードがワイヤーフレームから画像に切り替わるまで待ちます。デスクトップは 1200 × 750、モバイルは 390 × 844、DPR 1 を基準に、[保存済みの比較画像](docs/design-qa.md)と照らし合わせます。キーボードで Clay から Helion への切り替え、検索から Writing への移動、テーマ切り替え、モバイルのメニューを確認します。

元サイトとは時刻、FPS、動画フレーム、アニメーション、オンライン人数が変わります。公開版のカーソルとチャットは同じブラウザのタブ間で動きます。問い合わせはメールアプリへの案内です。外部プロジェクト、Spotify、一部の音声モデルはネット接続が必要です。

## Sites を更新する

公開先はこのフォルダの [Sites 設定](.openai/hosting.json) で識別します。現在の公開版は、リポジトリ移動前のコミット `b5867a7` を配信しています。このフォルダから同じ静的ファイルを生成できます。

1. GitHub にサイトの変更をコミット・送信し、対象の SHA を控えます。
2. Sites の書き込み権限を取得し、**このサイトの Sites ソースリポジトリ**を別の作業ディレクトリに checkout します。
3. GitHub の対象コミットから `sites/carter-ogunsola/` の中身を取り出し、Sites 側のルートに反映します。このリポジトリのルートごと送ると、別サイトのファイルが混ざります。GitHub のルートから `git archive <GitHubのSHA>:sites/carter-ogunsola | tar -x -C <展開先>` で取り出せます。Sites 側では以前のアプリ専用ファイルの削除も反映し、Sites 用の既存設定を確認します。
4. Sites 側で `npm ci` と `npm run build:sites` を実行し、変更をコミットして Sites のソースブランチに送信します。
5. Sites 側のルートで `tar -czf /tmp/carter-ogunsola.tar.gz .openai/hosting.json dist` を実行します。そのアーカイブと **Sites 側で送信したコミットの SHA** を使って版を保存・デプロイします。既存の公開設定を維持し、ログインなしで[公開URL](https://codex-site-1126.kkoheikosehira.chatgpt.site/)を開けることを確認します。

別のホストで再現するときは `dist/` を静的サイトとして配信します。 `/about` のようなURLを対応する `about/index.html` に解決できる設定にしてください。既存の公開先を更新する場合だけ Sites の書き込み権限が必要です。
