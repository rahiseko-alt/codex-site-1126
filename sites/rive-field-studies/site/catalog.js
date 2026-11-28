const entry = (id, category, name, summary, options = {}) => ({ id, category, name, summary, ...options });

export const demos = [
  entry('signal','反応','状態と遷移','Pulse をオンにすると、光の強さが変わる。光点は別のステートマシンレイヤーで動き続ける。'),
  entry('state','反応','ステートマシン','表示された入力を操作して、つながった状態と遷移を切り替える。'),
  entry('inputs','反応','リスナーと入力','キャンバス内でポインターを動かし、クリックやキーボード入力を試す。'),
  entry('events','反応','イベント','キャンバスを操作すると、Rive 内のイベントを Web 側で受け取る。'),
  entry('binding','反応','データバインディング','View Model の値を変えて、バインドされたグラフィックを更新する。'),
  entry('text','反応','動的テキスト','入力した文字を Rive のテキストランに反映する。'),
  entry('layout','反応','レスポンシブレイアウト','キャンバスの幅を変え、Rive のレイアウトで要素の再配置を見る。',{layout:true}),
  entry('components','反応','再利用コンポーネント','入れ子のアートボードを表示する。アートボードの選択で親と子を見比べられる。'),
  entry('scroll','反応','スクロール','キャンバス内のリストをドラッグする。リストの項目数は入力から変更できる。',{layout:true}),
  entry('dynamic','反応','動的アセット','画像を選択して、Rive の View Model に結び付いた画像を差し替える。'),
  entry('audio','反応','オーディオ','音声を有効にして、Rive のオーディオを含むシーンを再生する。'),
  entry('script','反応','AnimaScript','署名済みのランタイム検証ファイルで、シェーダーを含むスクリプトを実行する。',{gpu:true}),
  entry('timeline','動き','タイムラインと補間','上は線形、下はベジェ補間。同じ開始位置と終了位置でも、到達までの速さが変わる。',{file:'signal',artboard:'Timing',timeline:true,duration:2.5}),
  entry('blend','動き','ブレンドとミキシング','入力を変えて Blend State に渡し、複数のアニメーションの合成を見る。'),
  entry('layers','動き','並行する状態マシン','利用できる複数の状態マシンを選んで比較する。'),
  entry('bones','動き','骨格アニメーション','ボーンで変形する図形を再生し、時間軸で姿勢を比較する。',{timeline:true}),
  entry('rig','動き','IK とリグ','白いターゲットを追うように、二本のボーンが連動する。',{timeline:true,duration:1}),
  entry('mesh','動き','メッシュとウェイト','アートボードを選び、入れ子のメッシュを確認する。'),
  entry('constraints','動き','コンストレイント','キャンバスを操作し、別の図形やパスに拘束された動きを見る。'),
  entry('path','動き','パスに沿った移動','パスに従う図形をタイムラインで再生する。',{timeline:true}),
  entry('textpath','動き','パスに沿ったテキスト','開始位置、終了位置、文字サイズを変え、曲線上の文字を調整する。'),
  entry('joystick','動き','ジョイスティック','ジョイスティック用タイムラインを再生するか、入力から横・縦の範囲を変える。'),
  entry('order','動き','描画順','値とタイムラインを変えて、図形の前後関係を見る。'),
  entry('solos','動き','ソロと表示切り替え','main-artboard のアニメーションで、表示される子アートボードを切り替える。',{artboard:'main-artboard',timeline:true}),
  entry('vector','描画','ベクターと GPU 描画','光の曲線を Canvas と WebGL2 で切り替えて描画する。',{file:'signal',renderer:true}),
  entry('feather','描画','ベクターフェザリング','ベクターの輪郭がなめらかににじむ様子を描画する。',{gpu:true}),
  entry('clip','描画','クリッピング','マスクの内側に描画が制限される様子を、タイムラインで見る。',{timeline:true,artboard:'main-nodes',duration:1}),
  entry('trim','描画','トリムパス','タイムラインの位置を変え、パスの一部が描かれていく様子を見る。',{timeline:true}),
  entry('slice','描画','Nスライス','表示幅を変えて、伸び方を見る。',{layout:true}),
  entry('raster','描画','ラスター画像','Rive アートボード内の画像と、その入力領域を確認する。'),
];

const docs = 'https://rive.app/docs/';
const link = (name, href) => ({name, href});
const show = (name, demo) => ({name, demo});
export const catalog = [
 ['インタラクション',[
  show('AnimaScript','script'),link('AI Agent / Rive CLI','https://rive.app/agents'),show('テキスト','text'),show('レスポンシブレイアウト','layout'),show('コンポーネント','components'),show('データバインディング','binding'),show('ステートマシン','state'),show('遷移','signal'),show('リスナー','inputs'),show('入力','inputs'),show('Blend States','blend'),show('ステートマシンのレイヤー','signal'),show('スクロール','scroll'),show('イベント','events'),show('動的アセット','dynamic'),show('オーディオ','audio'),
 ]],
 ['アニメーションと描画',[
  show('タイムライン','timeline'),show('補間','timeline'),link('グラフエディター',docs+'editor/animate-mode/graph-editor'),show('アニメーションミキシング','blend'),show('Nスライス','slice'),show('ベクターフェザリング','feather'),show('クリッピング','clip'),show('骨格アニメーション','bones'),show('トリムパス','trim'),show('メッシュ','mesh'),link('メッシュのウェイト',docs+'editor/manipulating-shapes/meshes'),show('コンストレイント','constraints'),show('逆運動学','rig'),show('描画順','order'),show('ソロ','solos'),show('ベクターグラフィックス','vector'),show('ラスターグラフィックス','raster'),show('ジョイスティック','joystick'),show('パスに沿った移動','path'),show('パスに沿ったテキスト','textpath'),link('2D・3D ゲームエンジン','https://rive.app/games'),
 ]],
 ['制作と共同作業',[
  link('Rive エディター','https://editor.rive.app/'),link('チーム','https://rive.app/pricing'),link('ライブラリ',docs+'editor/libraries'),link('コミュニティ','https://community.rive.app/'),link('リミックス','https://rive.app/marketplace/'),link('Lottie インポート',docs+'editor/assets/lottie'),link('Figma から貼り付け','https://rive.app/figma-to-rive'),link('共有リンク',docs+'cli/publishing'),link('クラウドレンダラー',docs+'editor/exporting/exporting-for-video-and-static-design'),
 ]],
 ['ランタイムと連携',[
  show('Web（JavaScript / WebAssembly）','vector'),
  link('React',docs+'runtimes/react/react'),link('React Native',docs+'runtimes/react-native/react-native'),link('Apple',docs+'runtimes/apple/apple'),link('Android',docs+'runtimes/android/android'),link('Flutter',docs+'runtimes/flutter/flutter'),link('Unity',docs+'game-runtimes/unity/unity'),link('Unreal Engine',docs+'game-runtimes/unreal/unreal'),link('C++','https://github.com/rive-app/rive-runtime'),link('Framer','https://rive.app/runtimes'),link('Webflow','https://rive.app/runtimes'),link('Wix Studio','https://rive.app/runtimes'),link('.riv ファイル形式',docs+'runtimes/advanced-topic/format'),
 ]],
];
