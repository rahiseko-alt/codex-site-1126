# Field Studies

3種類の光の軌跡を切り替える、Rive ベースのオリジナルサイト。[公開版](https://rive-field-studies.kkoheikosehira.chatgpt.site/)

## 構成

- `site/field-studies.riv` に PC とスマートフォン用のアートボード、文字、光のリボン、ハロー、モーション、ボタン、切り替えのステートマシンを収録。
- `site/launch.js` は Rive の公式 Web ランタイムを起動し、画面サイズとキーボード入力を渡す。表示用の HTML は Canvas 1枚。
- `scene/main.go` は `.riv` を再生成するソース。フォントとそのライセンス文は `scene/fonts/` にある。

## 起動

Node.js 20 以上で、このフォルダから実行する。プレビューには Python 3 の静的サーバーを使う。

```sh
npm ci
npm run build
python3 -m http.server 4195 --directory dist
```

`http://127.0.0.1:4195/` を開く。Orbit、Wave、Mesh をクリックまたはタップで切り替えられる。Canvas にフォーカスすると `1`、`2`、`3` キーでも操作できる。

## Rive ファイルの再生成

Go 1.25.9 以上で実行する。公開用ビルド自体には、リポジトリ内の生成済みファイルを利用できる。

```sh
cd scene
go run . ../site/field-studies.riv
```

## 再デプロイ

このフォルダだけを `.openai/hosting.json` の Sites プロジェクトのソースへ同期する。同じコミットから `npm ci && npm run build` を実行し、`tar -czf /tmp/rive-field-studies-sites.tar.gz .openai/hosting.json dist` で梱包する。Sites でバージョンを保存してデプロイする。

## 画面確認

- [PC・Orbit](docs/qa/desktop-orbit.webp)
- [PC・Wave](docs/qa/desktop-wave.webp)
- [スマートフォン・Mesh](docs/qa/mobile-mesh.webp)
