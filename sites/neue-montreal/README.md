# PP Neue Montreal

[元サイト](https://neuemontreal.com/) · [公開デモ](https://neue-montreal-site-recreation.kkoheikosehira.chatgpt.site/) · [検証記録](docs/design-qa.md)

## 起動

Node.js 20 以上で、このフォルダから npm ci と npm run dev を実行する。
http://127.0.0.1:4193/ を開く。npm run build は dist/ を生成し、npm start で配信用ビルドを確認できる。

## 収録範囲

1 ページ。公開の書体見本を収録した。書体の購入とライセンスは Pangram Pangram の公式商品ページで確認できる。 [収録ページ一覧](docs/routes.txt)

## 再デプロイ

このフォルダだけを .openai/hosting.json にある Sites プロジェクトへ同期する。同じソースコミットで npm ci と npm run build を実行し、tar -czf /tmp/neue-montreal-sites.tar.gz .openai/hosting.json dist で梱包する。Sites でバージョンを保存して本番にデプロイする。
