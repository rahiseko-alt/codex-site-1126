# nagi nail studio

[参考サイト Paintbox](https://paint-box.com/) · [日本向け公開版](https://nagi-nail-tokyo.kkoheikosehira.chatgpt.site/) · [構成と動作の確認](docs/design-qa.md)

Paintbox の取得済みホームページを土台とした、代々木上原の架空ネイルサロン向けの差し替え版。HTMLのセクション順、クラス、テーマのCSS・JavaScriptを引き継いで、表示文言、写真、イラスト、テーマ配色の値を差し替えている。

## 起動

Node.js 20 以上と Python 3 が必要。依存パッケージのインストールは不要。

```sh
npm run build
python3 -m http.server 4221 --directory dist
```

`http://127.0.0.1:4221/` を開く。予約、バッグ、検索結果、商品詳細は架空のサイト内デモ。入力内容は実際の予約・注文・登録として送信されない。

## 差し替える場所

- `theme/index.source.html` はショップ向け外部連携を外した元のテンプレート。
- `theme/localize.py` の `TEXT`、`PICTURES`、`PALETTE` で表示文言、画像とロゴ、配色を指定する。`LINKS` は同じサイト内のデモへのリンク割り当て。
- `site/assets/` に写真風のビジュアル、手の線画、GIFがある。
- `site/cdn/shop/t/74/assets/` に取得済みのテーマCSS、JavaScriptとベンダーバンドルがある。ビルドでテーマCSSのカスタムプロパティ値だけを置換する。
- `site/reproduction.js` は静的デモ用にカートと検索の応答を返す。ページ本体の演出は元のテーマバンドルが実行する。
- `site/demo/` で商品詳細、選択内容、日本時間の予約確認を試せる。

## 再デプロイ

このフォルダを `.openai/hosting.json` で指定した Sites のソースに同期する。同じコミットで `npm run build` を実行し、`tar -czf /tmp/nagi-nail-tokyo.tar.gz .openai/hosting.json dist` で配信用アーカイブを作る。
