# Ironside Computers

[元サイト](https://www.ironsidecomputers.com/) · [公開デモ](https://ironside-store-recreation.kkoheikosehira.chatgpt.site/) · [比較画像と検証記録](docs/design-qa.md)

## 起動

Node.js 20 以上で、このフォルダから実行する。

```sh
npm ci
npm run dev
```

ブラウザで `http://127.0.0.1:4178/` を開く。配信用は `npm run build` で `dist/` を生成し、`npm start` で確認できる。

## 構成

- `site/` に公開カタログ92ページ、画像、動画、フォント、Next.js 配信バンドルを収録。
- `site/_next/data/` は各ページの `__NEXT_DATA__` から取り出したブラウザ遷移用データ。
- `site/api/` は商品の分類と価格表示に使う取得時点の読み取り専用データ。
- `site/reproduction.js` はカート、購入、アカウント、実際の PC 構成を公式サイトに案内する。

## 公開版の更新

このフォルダだけを、`.openai/hosting.json` のプロジェクトに紐付く Sites ソースリポジトリに同期する。そのコミットからビルドし、`tar -czf /tmp/ironside-sites.tar.gz .openai/hosting.json dist` で梱包する。Sites でバージョンを保存して本番へデプロイし、匿名ブラウザでトップと商品詳細を確認する。
