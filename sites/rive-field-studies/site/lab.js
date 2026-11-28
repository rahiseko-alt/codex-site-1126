import { catalog, demos } from './catalog.js';
import scenes from './scenes-index.js';

const el = id => document.getElementById(id);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
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

function labelled(text, child, parent) {
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
      link.href = item.demo ? '#demo-' + item.demo : item.href;
      link.textContent = item.demo ? '試す' : '公式情報 ↗';
      link.setAttribute('aria-label', item.name + 'を' + (item.demo ? '試す' : '公式ページで見る'));
      li.append(caption, link);
      list.append(li);
    }
    section.append(heading, list);
    el('catalog').append(section);
  }
}

function prepareDemo(demo, section) {
  const card = el('demo-template').content.firstElementChild.cloneNode(true);
  const elPart = name => card.querySelector('[data-part="' + name + '"]');
  const stage = elPart('stage');
  const controls = elPart('controls');
  const settings = elPart('settings');
  const transport = elPart('player-controls');
  const message = text => { elPart('message').textContent = text; };
  const labelControl = (name, node) => labelled(name, node, controls);
  const file = demo.file || demo.id;
  const src = './scenes/' + file + '.riv';
  let player;
  let release;
  let generation = 0;
  let selected = {};
  let near = false;
  let started = false;
  let interacted = false;
  let eviction;

  card.id = 'demo-' + demo.id;
  elPart('title').id = card.id + '-title';
  card.setAttribute('aria-labelledby', elPart('title').id);
  elPart('title').textContent = demo.name;
  elPart('description').textContent = demo.summary;
  elPart('asset').href = src;
  elPart('origin').href = file === 'signal' ? 'https://github.com/rahiseko-alt/codex-site-1126/tree/main/sites/rive-field-studies/scene' : './scenes/sources.json';
  void sources.then(data => {
    if (data?.files[file]) elPart('origin').href = 'https://github.com/rive-app/rive-runtime/blob/' + data.commit + '/' + data.files[file];
  });
  section.append(card);

  function showFailure(text) {
    stage.setAttribute('aria-busy', 'false');
    message(text);
    transport.append(makeButton('再読み込み', () => void open()));
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
          labelControl(input.name, checkbox);
        } else if (typeof input.value === 'number') {
          labelControl(input.name, range(input.value, Math.min(-100, input.value), Math.max(100, input.value * 2), 1, value => {
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
        labelControl(name, range(value.value, min, max, 1, next => { value.value = next; }));
      } else if (property.type === 'string') {
        const value = vm.string(name);
        if (!value) continue;
        const text = document.createElement('input');
        text.value = value.value;
        text.maxLength = 80;
        text.oninput = () => { value.value = text.value; };
        labelControl(name, text);
      } else if (property.type === 'boolean') {
        const value = vm.boolean(name);
        if (!value) continue;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = value.value;
        checkbox.onchange = () => { value.value = checkbox.checked; };
        labelControl(name, checkbox);
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
        labelControl('画像を選択', file);
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
    transport.append(pause, makeButton('はじめから', () => void open(options)));
    if (artboards.length > 1) labelControl('アートボード', select(artboards, options.artboard || demo.artboard || artboards[0], artboard =>
      void open({ artboard, engine: options.engine })));
    if (machines.length > 1) labelControl('状態マシン', select(machines, machine, next => void open({ ...options, machine: next, animation: undefined })));
    if (animations.length > 1 && (demo.timeline || demo.id === 'joystick')) {
      labelControl('アニメーション', select(animations, animation, next => void open({ ...options, animation: next })));
    }
    if (demo.timeline && animation) {
      labelControl('時間（秒）', range(0, 0, frameRange, .01, value => {
        rv.pause();
        rv.scrub(animation, value);
        pause.textContent = '再生';
      }));
    }
    if (demo.layout) labelControl('幅', range(100, 28, 100, 1, value => {
      elPart('player').style.width = value + '%';
      rv.resizeDrawingSurfaceToCanvas();
    }));
    if (demo.renderer) labelControl('描画', select(['Canvas','WebGL2'], options.engine === 'webgl2' ? 'WebGL2' : 'Canvas', value =>
      void open({ ...options, engine: value === 'WebGL2' ? 'webgl2' : 'canvas' })));
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
      labelControl('テキスト', text);
    }
    addMachineControls(rv, machine && !options.animation && !demo.timeline ? [machine] : []);
    addBindingControls(rv, api, demo);
  }

  async function open(options = selected) {
    selected = options;
    const current = ++generation;
    release?.disconnect();
    player?.cleanup();
    player = undefined;
    controls.replaceChildren();
    transport.replaceChildren();
    message('読み込み中…');
    stage.setAttribute('aria-busy', 'true');
    const canvas = document.createElement('canvas');
    canvas.className = 'player';
    canvas.dataset.part = 'player';
    canvas.tabIndex = 0;
    canvas.setAttribute('aria-label', demo.name + 'の Rive デモ');
    const previousCanvas = elPart('player');
    const restoreFocus = previousCanvas === document.activeElement;
    previousCanvas.replaceWith(canvas);
    if (restoreFocus) canvas.focus({ preventScroll: true });
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
          stage.setAttribute('aria-busy', 'false');
          if (!near) rv.stopRendering();
          message('');
          rv.on(api.EventType.RiveEvent, event => message('イベント: ' + (event.data?.name || 'Rive')));
          if (demo.id === 'state' || demo.id === 'signal') {
            rv.on(api.EventType.StateChange, event => message('状態: ' + event.data.join(' → ')));
          }
          requestAnimationFrame(() => {
            if (current !== generation) return;
            installControls(rv, api, demo, options);
            settings.style.minHeight = '';
          });
          const selection = options.animation || (demo.timeline ? animation : machine);
          elPart('snippet').textContent = 'new Rive({\n  src: ' + JSON.stringify(src) +
            ',\n  canvas,\n  artboard: ' + JSON.stringify(rv.activeArtboard) + ',\n  ' + (options.animation || demo.timeline ? 'animations' : 'stateMachines') +
            ': ' + JSON.stringify(selection) + ',\n  autoBind: true,\n  autoplay: true\n});';
        },
        onLoadError: () => { if (current === generation) showFailure('このファイルを読み込めませんでした。'); },
      });
      player = rv;
    } catch {
      if (current === generation) showFailure('このブラウザで描画エンジンを起動できませんでした。');
    }
  }

  const observe = entry => {
    near = entry.isIntersecting;
    clearTimeout(eviction);
    if (near) {
      if (started) player?.startRendering();
      else {
        started = true;
        void open();
      }
    } else if (started) {
      player?.stopRendering();
      if (!interacted) eviction = setTimeout(() => {
        if (near || interacted) return;
        generation++;
        release?.disconnect();
        player?.cleanup();
        player = undefined;
        started = false;
        settings.style.minHeight = settings.offsetHeight + 'px';
        controls.replaceChildren();
        transport.replaceChildren();
        stage.setAttribute('aria-busy', 'true');
        const canvas = elPart('player');
        canvas.width = 1;
        canvas.height = 1;
      }, 2200);
    }
  };
  for (const event of ['pointerdown', 'keydown', 'input']) {
    card.addEventListener(event, () => { interacted = true; });
  }
  demoObservers.set(stage, observe);
  viewport.observe(stage);
}

const demoObservers = new Map();
const viewport = new IntersectionObserver(entries => {
  for (const entry of entries) demoObservers.get(entry.target)(entry);
}, { rootMargin: '380px 0px' });

for (const category of new Set(demos.map(demo => demo.category))) {
  const group = document.createElement('section');
  group.className = 'demo-group';
  const heading = document.createElement('h3');
  heading.textContent = category;
  group.append(heading);
  el('demo-stack').append(group);
  for (const demo of demos.filter(demo => demo.category === category)) prepareDemo(demo, group);
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
    const pulseButton = el('pulse');
    pulseButton.disabled = false;
    pulseButton.onclick = () => {
      const pulse = signal.stateMachineInputs('Signal Logic')?.find(item => item.name === 'Pulse');
      if (!pulse) return;
      pulse.value = Number(!pulse.value);
      signal.play();
      pulseButton.setAttribute('aria-pressed', String(Boolean(pulse.value)));
      pulseButton.textContent = pulse.value ? '光を弱める' : '光を強める';
    };
  },
});
renderCatalog();
