(() => {
  const canvas = document.querySelector('#field');
  const failure = document.querySelector('#failure');
  const screen = matchMedia('(max-width: 760px)');
  const { Alignment, Fit, Layout, Rive, RuntimeLoader } = window.rive;
  const controller = 'Field Selector';
  let instance;
  let study = 0;

  RuntimeLoader.setWasmUrl(new URL('./runtime/rive.wasm', location.href).href);
  RuntimeLoader.setWasmFallbackUrl(new URL('./runtime/rive_fallback.wasm', location.href).href);

  const selection = () => instance?.stateMachineInputs(controller)?.find(input => input.name === 'Study');
  const resize = () => instance?.resizeDrawingSurfaceToCanvas();
  const start = () => {
    study = selection()?.value ?? study;
    instance?.cleanup();
    failure.hidden = true;
    instance = new Rive({
      src: './field-studies.riv',
      canvas,
      artboard: screen.matches ? 'Mobile' : 'Desktop',
      stateMachines: controller,
      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
      autoplay: true,
      onLoad: () => {
        resize();
        const input = selection();
        if (input) input.value = study;
      },
      onLoadError: () => { failure.hidden = false; },
    });
  };

  canvas.addEventListener('keydown', event => {
    const index = ['1', '2', '3'].indexOf(event.key);
    const input = selection();
    if (index === -1 || !input) return;
    event.preventDefault();
    input.value = index;
  });

  new ResizeObserver(resize).observe(canvas);
  screen.addEventListener('change', start);
  start();
})();
