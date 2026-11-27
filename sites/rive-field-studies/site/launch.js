(() => {
  const canvas = document.querySelector('#field');
  const failure = document.querySelector('#failure');
  const screen = matchMedia('(max-width: 760px)');
  const { Alignment, Fit, Layout, Rive, RuntimeLoader } = window.rive;
  const controller = 'Field Selector';
  const source = './field-studies.riv';
  const patterns = ['orbit', 'wave', 'mesh'];
  const formats = {
    1: { artboard: 'Desktop Wallpaper', width: 1920, height: 1080, suffix: 'desktop' },
    2: { artboard: 'Phone Wallpaper', width: 1080, height: 1920, suffix: 'phone' },
  };
  let instance;
  let study = 0;
  let saving = false;

  RuntimeLoader.setWasmUrl(new URL('./runtime/rive.wasm', location.href).href);
  RuntimeLoader.setWasmFallbackUrl(new URL('./runtime/rive_fallback.wasm', location.href).href);

  const input = (rive, name) => rive?.stateMachineInputs(controller)?.find(item => item.name === name);
  const resize = () => instance?.resizeDrawingSurfaceToCanvas();
  const afterPaint = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  async function saveWallpaper(format, pattern) {
    if (saving || !format) return;
    saving = true;
    failure.hidden = true;

    const surface = typeof OffscreenCanvas === 'function'
      ? new OffscreenCanvas(format.width, format.height)
      : document.createElement('canvas');
    if (surface instanceof HTMLCanvasElement) {
      surface.width = format.width;
      surface.height = format.height;
      surface.className = 'export-surface';
      surface.setAttribute('aria-hidden', 'true');
      document.body.append(surface);
    }
    let render;
    try {
      await new Promise((resolve, reject) => {
        render = new Rive({
          src: source,
          canvas: surface,
          artboard: format.artboard,
          stateMachines: controller,
          layout: new Layout({ fit: Fit.Fill }),
          autoplay: true,
          shouldDisableRiveListeners: true,
          onLoad: resolve,
          onLoadError: reject,
        });
      });
      const selection = input(render, 'Study');
      selection.value = pattern;
      // Let the selected Rive transition settle before reading the export artboard.
      await new Promise(resolve => setTimeout(resolve, 600));
      await afterPaint();
      const png = surface instanceof HTMLCanvasElement
        ? await new Promise(resolve => surface.toBlob(resolve, 'image/png'))
        : await surface.convertToBlob({ type: 'image/png' });
      if (!png) throw new Error('PNG encoding failed');
      const file = URL.createObjectURL(png);
      const download = document.createElement('a');
      download.href = file;
      download.download = `afterglow-${patterns[pattern]}-${format.suffix}.png`;
      document.body.append(download);
      download.click();
      download.remove();
      setTimeout(() => URL.revokeObjectURL(file), 30000);
    } catch {
      failure.textContent = 'The wallpaper could not be saved. Try again.';
      failure.hidden = false;
    } finally {
      render?.cleanup();
      if (surface instanceof HTMLCanvasElement) surface.remove();
      saving = false;
    }
  }

  const handleDownload = () => {
    const request = input(instance, 'Download');
    if (!request?.value) return;
    const format = formats[request.value];
    request.value = 0;
    void saveWallpaper(format, input(instance, 'Study')?.value ?? 0);
  };

  const start = () => {
    study = input(instance, 'Study')?.value ?? study;
    instance?.cleanup();
    failure.hidden = true;
    instance = new Rive({
      src: source,
      canvas,
      artboard: screen.matches ? 'Mobile' : 'Desktop',
      stateMachines: controller,
      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
      autoplay: true,
      onAdvance: handleDownload,
      onLoad: () => {
        resize();
        const selection = input(instance, 'Study');
        if (selection) selection.value = study;
      },
      onLoadError: () => {
        failure.textContent = 'The Rive scene could not load. Refresh the page to try again.';
        failure.hidden = false;
      },
    });
  };

  canvas.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    const selection = input(instance, 'Study');
    if (!selection) return;
    const index = ['1', '2', '3'].indexOf(key);
    if (index !== -1) {
      event.preventDefault();
      selection.value = index;
      return;
    }
    if (key === 'd' || key === 'm') {
      event.preventDefault();
      void saveWallpaper(formats[key === 'd' ? 1 : 2], selection.value);
    }
  });

  new ResizeObserver(resize).observe(canvas);
  screen.addEventListener('change', start);
  start();
})();
