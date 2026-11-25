# 再現とデプロイの手順

[元サイト](https://carterogunsola.com/)の公開ページを取り込んだものです。[公開版](https://codex-site-1126.kkoheikosehira.chatgpt.site/)はログインなしで閲覧できます。製品コードはこのリポジトリ内にあり、起動や検証に特定の AI、クラウド環境、元サイトのアカウントは不要です。

## 新しい環境で動かす

Node.js 20 以上と npm を使います。

```sh
git clone https://github.com/rahiseko-alt/codex-site-1126.git
cd codex-site-1126
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

```sh
npm run build:sites
npm start -- --port 4173
```

Sites に載っているのは、このビルドで生成した `dist/` です。ローカルサーバーの WebSocket 中継まで確認する場合は `npm run build` の後に `npm start` で起動してください。

Chromium でトップを開き、WebGL のカードがワイヤーフレームから画像に切り替わるまで待ちます。デスクトップは 1200 × 750、モバイルは 390 × 844、DPR 1 を基準に、[保存済みの比較画像](../design-qa.md)と照らし合わせます。キーボードで Clay から Helion への切り替え、検索から Writing への移動、テーマ切り替え、モバイルのメニューを確認します。

元サイトとは時刻、FPS、動画フレーム、アニメーション、オンライン人数が変わります。公開版のカーソルとチャットは同じブラウザのタブ間で動きます。問い合わせはメールアプリへの案内です。外部プロジェクト、Spotify、一部の音声モデルはネット接続が必要です。

## Sites を更新する

1. `npm ci` と `npm run build:sites` を実行し、上の確認を行う。
2. 変更をコミットし、[GitHub](https://github.com/rahiseko-alt/codex-site-1126)と、Sites が発行した書き込み権限で既存プロジェクトのソースリポジトリに同じコミットを送る。
3. `.openai/hosting.json` のプロジェクトを再利用する。リポジトリのルートで `tar -czf /tmp/codex-site-1126.tar.gz .openai/hosting.json dist` を実行し、アーカイブと送ったコミットの SHA で版を保存してデプロイする。公開設定を維持する。
4. 成功後、[公開URL](https://codex-site-1126.kkoheikosehira.chatgpt.site/)をログインしていないブラウザで開く。

ビルドとローカル確認には Sites の権限は不要です。既存の公開先を更新するには、その Sites プロジェクトの書き込み権限が必要です。
