# Rive 公開サイト

[元サイト](https://rive.app/) · [公開デモ](https://rive-site-recreation.kkoheikosehira.chatgpt.site/) · [検証記録](docs/design-qa.md)

## 起動

Node.js 20 以上で、このフォルダから npm ci と npm run dev を実行する。
http://127.0.0.1:4194/ を開く。npm run build は dist/ を生成し、npm start で配信用ビルドを確認できる。

## 収録範囲

44 ページ。公開マーケティングページを収録した。未収録の記事・更新履歴、ドキュメント、マーケットプレイス、エディターとアカウントは公式サイトで開く。一部の動画と素材は元の配信先を利用する。 [収録ページ一覧](docs/routes.txt)

## 再デプロイ

このフォルダだけを .openai/hosting.json にある Sites プロジェクトへ同期する。同じソースコミットで npm ci と npm run build を実行し、tar -czf /tmp/rive-sites.tar.gz .openai/hosting.json dist で梱包する。Sites でバージョンを保存して本番にデプロイする。
