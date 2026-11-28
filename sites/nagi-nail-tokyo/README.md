# nagi nail studio

Paintbox を参考に、代々木上原を舞台にした架空のネイルサロン向けに制作した日本語サイト。写真風のビジュアルと線画はこのサイト用に生成。税込価格と日本時間での予約確認をデモとして実装している。

[参考サイト](https://paint-box.com/) · [公開版](https://nagi-nail-tokyo.kkoheikosehira.chatgpt.site/)

## 起動

Node.js 20 以上。外部依存のインストールは不要。

```sh
npm run build
python3 -m http.server 4221 --directory dist
```

`http://127.0.0.1:4221/` を開く。予約のメニュー、日付、希望時間、オフ有無を選び、確認画面まで操作できる。入力はブラウザ内だけで扱い、実際の予約や送信は行わない。

## 変更する場所

- `site/index.html` にページ本文、料金、予約フォームがある。
- `site/style.css` の先頭に配色とフォントを定義している。
- `site/assets/` にヒーロー写真、コレクション3点、スタジオの線画がある。
- `site/main.js` が予約確認とタイムゾーン `Asia/Tokyo` を扱う。

## 再デプロイ

このフォルダを `.openai/hosting.json` で指定した Sites のソースに同期する。同じコミットで `npm run build` を実行し、`tar -czf /tmp/nagi-nail-tokyo.tar.gz .openai/hosting.json dist` で配信用アーカイブを作る。
