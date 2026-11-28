# Signal Lab

Rive が公開している機能を、実ファイルで試す技術デモ集。[公開版](https://rive-field-studies.kkoheikosehira.chatgpt.site/)

30件のブラウザデモを1ページに縦に並べている。スクロールで近づくと読み込み、画面内で再生する。デモの下に操作が表示される。端末で視差効果を減らす設定を有効にしている場合は、「全体のアニメーションを再生」で一括再生できる。光のトップ画面も Rive のシーン。公式の機能一覧と製品メニューを基に、59項目の対応表をページ内に掲載している。制作サービス、エディター固有の操作、ネイティブ実行環境は公式資料にリンクしている。

## 起動

Node.js 20 以上と Python 3 で、ここから実行する。

```sh
npm ci
npm run build
python3 -m http.server 4195 --directory dist
```

ブラウザで `http://127.0.0.1:4195/` を開く。Canvas と WebGL2 の公式ランタイムを同じサイトから配信する。WebGL2 のデモは対応ブラウザが必要。

## シーンと配信素材

- `site/scenes/signal.riv` はオリジナル。光のシーン、ステートマシンのレイヤー、線形・ベジェ補間の比較用アートボードを含む。
- `site/scenes/sources.json` に、Rive の公開ランタイムリポジトリから取得した検証ファイルの固定コミットと元パスを記録している。パス移動、トリムパス、IK、骨格、クリッピング、ソロの公開ファイルは `scene/fixtures/` の元ファイルをもとに動きが見えるよう調整している。そのリポジトリの MIT ライセンスは [site/scenes/LICENSE](site/scenes/LICENSE)。
- `site/catalog.js` がデモと機能一覧の対応を定義する。元の製品サイトは [Rive Features](https://rive.app/features)。

オリジナルのシーンを変更した場合は Go 1.25.9 以上で再生成する。

```sh
cd scene
go run . ../site/scenes/signal.riv
go run . --motion-demos ../site/scenes
```

## 再デプロイ

このフォルダだけを `.openai/hosting.json` にある Sites のソースへ同期する。そのコミットから `npm ci && npm run build` を実行し、`tar -czf /tmp/signal-lab-sites.tar.gz .openai/hosting.json dist` で梱包する。

## 画面確認

- [トップ](docs/qa/desktop.webp)
- [スマートフォン](docs/qa/mobile.webp)
- [縦に並んだデモ](docs/qa/workbench.webp)
