# 引き継ぎメモ

セッションをまたいで作業を再開するための記録。**新しいものを一番上に足す。**

- 1件の区切りは行頭の `## `。書式は `docs/agents/flow-map.md` の「引き継ぎメモ」に従う。
- 保存の上限と、会話開始時に読み込む件数は `.claude/hooks/session-start.sh` が持つ。
- 追記したら `sh .claude/hooks/handover-trim.sh` を実行して件数を整える。

---

## 2026-11-26 ネイル・美容サイトの公開版を追加

**決めたこと**

- Cotty、Longleage、Paintbox、Townhouse、EVER、Chillhouse Soho、Tenoverten を独立したフォルダと Sites プロジェクトに追加した。
- 収録範囲、起動方法、公開版、PC・スマートフォンの比較は各サイトの README から確認できる。

**次にやること**

- 公開版を更新するときは対象フォルダだけを該当する Sites プロジェクトに同期する。

**未解決の問題**

- A Twosome Place は元サイトが HTTP 403 を返す。PC とスマートフォンの取得結果を `sites/twosome/` に記録した。

## 2026-11-26 ポートフォリオ2件とカタログを追加

**決めたこと**

- Bohdan Ratiiev、Eliza Doltu、Ironside Computers の公開ページを別フォルダに収録した。サイトごとの README から起動手順と比較画像にアクセスできる。
- 最新の5件の追加先は `sites/bratiiev/`、`sites/eliza-doltu/`、`sites/ironside-computers/`、`sites/maxima-therapy/`、`sites/telescope/`。

**次にやること**

- 公開版を更新する場合は、対象フォルダだけを固有の Sites プロジェクトに同期する。

**未解決の問題**

- Ironside のカートと注文、Bohdan Ratiiev の問い合わせは元サイトに移動する。Ironside の Tokyo Dream は初回に React の警告を出すことがある。

## 2026-11-26 MindMarket の再現版を追加

**決めたこと**

- 公開サイト179ページのコード、素材、比較画像、再現手順、Sites 設定を `sites/mindmarket/` に分離した。
- 見積もり計算はブラウザで動く。問い合わせはメール下書きを開く。

**次にやること**

- 起動や公開版の更新は `sites/mindmarket/README.md` から再開する。

**未解決の問題**

- 元サイトの問い合わせ API は使わない。予約は既存の Calendly を開く。


## 2026-11-26 Slate の再現版を追加

**決めたこと**

- Slate の公開マーケティングページ467件、素材、比較画像、再現手順、Sites 設定を `sites/slate-teams/` に分離した。
- ログイン、登録、Safe Zones、申込送信は元サイトの導線を使う。

**次にやること**

- 起動や公開版の更新は `sites/slate-teams/README.md` から再開する。

**未解決の問題**

- Mux 動画と取得できなかった一部の素材は配信元に依存する。


## 2026-11-26 Christen Dijoux の再現版を追加

**決めたこと**

- Christen Dijoux のコード、配信用バンドル、素材、比較画像、手順、Sites 設定を `sites/christen-dijoux/` にまとめた。
- GitHub のルート README はサイト一覧として使う。Christen の公開先は Carter と別。

**次にやること**

- このサイトの起動や更新は `sites/christen-dijoux/README.md` から再開する。

**未解決の問題**

- 問い合わせはメール下書き。星探しゲームは元サイトを開く。
