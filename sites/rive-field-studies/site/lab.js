import { catalog, demos } from './catalog.js';
import scenes from './scenes-index.js';

const el = id => document.getElementById(id);
const byId = new Map(demos.map(item => [item.id, item]));
const stage = el('stage');
const controls = el('controls');
const transport = el('player-controls');
const message = text => { el('message').textContent = text; };
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let active = demos[0];
let filter = 'すべて';
let release;
let player;
let generation = 0;
let webgl;
const sources = fetch('./scenes/sources.json').then(response => response.json()).catch(() => null);
const canvasRuntime = window.rive;
const readyRuntime = (api, engine) => {
  api.RuntimeLoader.setWasmUrl(new URL('./runtime/' + engine + '/rive.wasm', location.href).href);
  api.RuntimeLoader.setWasmFallbackUrl(new URL('./runtime/' + engine + '/rive_fallback.wasm', location.href).href);
  return api;
};
readyRuntime(canvasRuntime, 'canvas');

function makeButton(text, callback) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = text;
  button.addEventListener('click', callback);
  return button;
}

function labelled(text, child, parent = controls) {
  const label = document.createElement('label');
  label.textContent = text;
  child.setAttribute('aria-label', text);
  label.append(child);
  parent.append(label);
}

function select(values, value, change) {
  const node = document.createElement('select');
  for (const option of values) node.append(new Option(option, option, false, option === value));
  node.addEventListener('change', () => change(node.value));
  return node;
}

function range(value, min, max, step, change) {
  const input = document.createElement('input');
  Object.assign(input, { type: 'range', min, max, step, value });
  input.addEventListener('input', () => change(input.valueAsNumber));
  return input;
}

function getWebGL() {
  if (!webgl) {
    webgl = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = './runtime/webgl2/rive.js';
      script.onload = () => resolve(readyRuntime(window.rive, 'webgl2'));
      script.onerror = reject;
      document.head.append(script);
    });
  }
  return webgl;
}

function renderMenu() {
  el('filters').replaceChildren();
  for (const group of ['すべて', ...new Set(demos.map(demo => demo.category))]) {
    const button = makeButton(group, () => {
      filter = group;
      if (group !== 'すべて' && active.category !== group) {
        void open(demos.find(demo => demo.category === group));
      } else {
        renderMenu();
      }
    });
    button.setAttribute('aria-pressed', String(group === filter));
    el('filters').append(button);
  }
  el('demos').replaceChildren();
  for (const demo of demos.filter(item => filter === 'すべて' || item.category === filter)) {
    const button = makeButton(demo.name, () => void open(demo));
    if (active === demo) button.setAttribute('aria-current', 'true');
    el('demos').append(button);
  }
}

function renderCatalog() {
  for (const [name, items] of catalog) {
    const section = document.createElement('section');
    section.className = 'catalog-group';
    const heading = document.createElement('h3');
    heading.textContent = name;
    const list = document.createElement('ul');
    for (const item of items) {
      const li = document.createElement('li');
      const caption = document.createElement('span');
      const link = document.createElement('a');
      caption.textContent = item.name;
      link.href = item.demo ? '#lab' : item.href;
      link.textContent = item.demo ? '試す' : '公式情報 ↗';
      link.setAttribute('aria-label', item.name + 'を' + (item.demo ? '試す' : '公式ページで見る'));
      if (item.demo) link.addEventListener('click', () => {
        filter = 'すべて';
        void open(byId.get(item.demo));
      });
      li.append(caption, link);
      list.append(li);
    }
    section.append(heading, list);
    el('catalog').append(section);
  }
}

function addMachineControls(rv, names) {
  for (const name of names) {
    for (const input of rv.stateMachineInputs(name) ?? []) {
      if (input.type === canvasRuntime.StateMachineInputType.Trigger) {
        controls.append(makeButton(input.name, () => input.fire()));
      } else if (typeof input.value === 'boolean' || input.name === 'Pulse') {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = Boolean(input.value);
        checkbox.onchange = () => { input.value = input.name === 'Pulse' ? Number(checkbox.checked) : checkbox.checked; };
        labelled(input.name, checkbox);
      } else if (typeof input.value === 'number') {
        labelled(input.name, range(input.value, Math.min(-100, input.value), Math.max(100, input.value * 2), 1, value => {
          input.value = value;
        }));
      }
    }
  }
}

function addBindingControls(rv, api, demo) {
  const vm = rv.viewModelInstance;
  if (!vm) return;
  for (const property of vm.properties.slice(0, 11)) {
    const name = property.name;
    if (property.type === 'number') {
      const value = vm.number(name);
      if (!value) continue;
      const min = name === 'Count' ? 1 : Math.min(0, value.value);
      const max = Math.max(50, Math.abs(value.value) * 2);
      labelled(name, range(value.value, min, max, 1, next => { value.value = next; }));
    } else if (property.type === 'string') {
      const value = vm.string(name);
      if (!value) continue;
      const text = document.createElement('input');
      text.value = value.value;
      text.maxLength = 80;
      text.oninput = () => { value.value = text.value; };
      labelled(name, text);
    } else if (property.type === 'boolean') {
      const value = vm.boolean(name);
      if (!value) continue;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = value.value;
      checkbox.onchange = () => { value.value = checkbox.checked; };
      labelled(name, checkbox);
    } else if (property.type === 'trigger') {
      const value = vm.trigger(name);
      if (value) controls.append(makeButton(name, () => value.fire()));
    } else if (property.type === 'image' && demo.id === 'dynamic') {
      const image = vm.image(name);
      if (!image) continue;
      const file = document.createElement('input');
      file.type = 'file';
      file.accept = 'image/png,image/jpeg,image/webp';
      file.onchange = async () => {
        const choice = file.files?.[0];
        if (!choice) return;
        if (choice.size > 8 * 1024 * 1024) return message('8 MB 以下の画像を選んでください。');
        try {
          const value = await api.decodeImage(new Uint8Array(await choice.arrayBuffer()));
          if (player === rv) {
            image.value = value;
            message('');
          }
          value.unref?.();
        } catch {
          message('画像を読み込めませんでした。');
        }
      };
      labelled('画像を選択', file);
    }
  }
}

function installControls(rv, api, demo, options) {
  const artboards = rv.contents.artboards.map(item => item.name);
  const machines = rv.stateMachineNames;
  const animations = rv.animationNames;
  const frameRange = demo.duration ?? 2;
  const animation = options.animation || animations[0];
  const machine = options.machine || machines[0];
  const run = () => rv.play(options.animation || (demo.timeline ? animation : machine ?? animation));
  const pause = makeButton('一時停止', () => {
    if (rv.isPlaying) {
      rv.pause();
      pause.textContent = '再生';
    } else {
      run();
      pause.textContent = '一時停止';
    }
  });
  if (reducedMotion || demo.id === 'audio') pause.textContent = '再生';
  transport.append(pause, makeButton('はじめから', () => void open(demo, options)));
  if (artboards.length > 1) labelled('アートボード', select(artboards, options.artboard || demo.artboard || artboards[0], artboard =>
    void open(demo, { artboard, engine: options.engine })));
  if (machines.length > 1) labelled('状態マシン', select(machines, machine, next => void open(demo, { ...options, machine: next, animation: undefined })));
  if (animations.length > 1 && (demo.timeline || demo.id === 'joystick')) {
    labelled('アニメーション', select(animations, animation, next => void open(demo, { ...options, animation: next })));
  }
  if (demo.timeline && animation) {
    labelled('時間（秒）', range(0, 0, frameRange, .01, value => {
      rv.pause();
      rv.scrub(animation, value);
      pause.textContent = '再生';
    }));
  }
  if (demo.layout) labelled('幅', range(100, 28, 100, 1, value => {
    el('player').style.width = value + '%';
    rv.resizeDrawingSurfaceToCanvas();
  }));
  if (demo.renderer) labelled('描画', select(['Canvas','WebGL2'], options.engine === 'webgl2' ? 'WebGL2' : 'Canvas', value =>
    void open(demo, { ...options, engine: value === 'WebGL2' ? 'webgl2' : 'canvas' })));
  if (demo.id === 'audio') transport.append(makeButton('音をオン', () => {
    rv.volume = 1;
    run();
    pause.textContent = '一時停止';
    message('キャンバスをクリックして音を試せます。');
  }));
  if (demo.id === 'text') {
    const text = document.createElement('input');
    text.value = '';
    text.maxLength = 80;
    text.placeholder = 'テキストを入力';
    text.oninput = () => {
      if (rv.activeArtboard === 'Artboard B') rv.setTextRunValue('ArtboardBRun', text.value);
      else if (rv.activeArtboard === 'ArtboardC') rv.setTextRunValue('ArtboardCRun', text.value);
      else rv.setTextRunValueAtPath('ArtboardCRun', text.value, 'ArtboardB-1/ArtboardC-1');
    };
    labelled('テキスト', text);
  }
  addMachineControls(rv, machine && !options.animation && !demo.timeline ? [machine] : []);
  addBindingControls(rv, api, demo);
}

async function open(demo, options = {}) {
  const current = ++generation;
  active = demo;
  release?.disconnect();
  player?.cleanup();
  player = undefined;
  controls.replaceChildren();
  transport.replaceChildren();
  renderMenu();
  el('category').textContent = demo.category;
  el('demo-title').textContent = demo.name;
  el('description').textContent = demo.summary;
  const file = demo.file || demo.id;
  const src = './scenes/' + file + '.riv';
  el('asset').href = src;
  el('origin').href = file === 'signal' ? 'https://github.com/rahiseko-alt/codex-site-1126/tree/main/sites/rive-field-studies/scene' : './scenes/sources.json';
  void sources.then(data => {
    if (current === generation && data?.files[file]) {
      el('origin').href = 'https://github.com/rive-app/rive-runtime/blob/' + data.commit + '/' + data.files[file];
    }
  });
  message('読み込み中…');
  const canvas = document.createElement('canvas');
  canvas.id = 'player';
  canvas.tabIndex = 0;
  canvas.setAttribute('aria-label', demo.name + 'の Rive デモ');
  el('player').replaceWith(canvas);
  const engine = options.engine || (demo.gpu ? 'webgl2' : 'canvas');
  try {
    const api = engine === 'webgl2' ? await getWebGL() : canvasRuntime;
    if (current !== generation) return;
    const selectedArtboard = options.artboard || demo.artboard;
    const table = scenes[file];
    const info = table.find(item => item.name === selectedArtboard) || table[0];
    const animation = options.animation || (demo.timeline ? info.animations[0] : undefined);
    const machine = options.machine || info.stateMachines[0]?.name;
    let rv;
    rv = new api.Rive({
      src, canvas, artboard: selectedArtboard,
      animations: animation,
      stateMachines: animation ? undefined : machine,
      layout: new api.Layout({ fit: demo.layout ? api.Fit.Layout : api.Fit.Contain, alignment: api.Alignment.Center }),
      autoplay: !reducedMotion && demo.id !== 'audio', autoBind: true,
      onLoad: () => {
        if (current !== generation) return;
        const resize = () => rv.resizeDrawingSurfaceToCanvas();
        release = new ResizeObserver(resize);
        release.observe(canvas);
        resize();
        const machine = options.machine || rv.stateMachineNames[0];
        const animation = options.animation || rv.animationNames[0];
        if (!machine && !demo.timeline && animation) rv.play(animation);
        if (demo.id === 'audio') rv.volume = 0;
        message('');
        rv.on(api.EventType.RiveEvent, event => message('イベント: ' + (event.data?.name || 'Rive')));
        if (demo.id === 'state' || demo.id === 'signal') {
          rv.on(api.EventType.StateChange, event => message('状態: ' + event.data.join(' → ')));
        }
        requestAnimationFrame(() => {
          if (current === generation) installControls(rv, api, demo, options);
        });
        const selection = options.animation || (demo.timeline ? animation : machine);
        el('snippet').textContent = 'new Rive({\n  src: ' + JSON.stringify(src) +
          ',\n  canvas,\n  artboard: ' + JSON.stringify(rv.activeArtboard) + ',\n  ' + (options.animation || demo.timeline ? 'animations' : 'stateMachines') +
          ': ' + JSON.stringify(selection) + ',\n  autoBind: true,\n  autoplay: true\n});';
      },
      onLoadError: () => { if (current === generation) message('このファイルを読み込めませんでした。'); },
    });
    player = rv;
  } catch {
    if (current === generation) message('このブラウザで描画エンジンを起動できませんでした。');
  }
}

const signal = new canvasRuntime.Rive({
  src: './scenes/signal.riv', canvas: el('signal'), stateMachines: 'Signal Logic',
  autoplay: !reducedMotion,
  onLoad: () => {
    const resize = () => signal.resizeDrawingSurfaceToCanvas();
    new ResizeObserver(resize).observe(el('signal'));
    resize();
    if (reducedMotion) {
      signal.play();
      requestAnimationFrame(() => signal.pause());
    }
    el('pulse').onclick = () => {
      const pulse = signal.stateMachineInputs('Signal Logic')?.find(item => item.name === 'Pulse');
      if (!pulse) return;
      pulse.value = Number(!pulse.value);
      signal.play();
      el('pulse').setAttribute('aria-pressed', String(Boolean(pulse.value)));
      el('pulse').textContent = pulse.value ? '光を弱める' : '光を強める';
    };
  },
});
renderCatalog();
void open(active);
