import{t as e}from"./scroll.C_XhBm-1.js?dpl=dpl_FjmTLwf5F2McBsao1XdPpALuZAV7";var t=`(min-width: 1000px)`,n=`(pointer: fine)`,r=`(prefers-reduced-motion: no-preference)`,i=1.5,a=2880,o=3,s=`
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 1.0 - (a_pos.y * 0.5 + 0.5));
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,c=`
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
uniform sampler2D u_tex2;
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec4 u_mask0;
uniform vec4 u_mask1;
uniform vec4 u_mask2;
uniform vec2 u_focal0;
uniform vec2 u_focal1;
uniform vec2 u_focal2;
uniform vec2 u_texSize0;
uniform vec2 u_texSize1;
uniform vec2 u_texSize2;
uniform float u_progress;
uniform vec4 u_canvasRect;
uniform vec2 u_viewport;

vec2 coverUv(vec2 screenPx, vec2 texSize, vec2 focal) {
  float vw = u_viewport.x;
  float vh = u_viewport.y;
  float scale = max(vw / max(texSize.x, 1.0), vh / max(texSize.y, 1.0));
  float scaledW = texSize.x * scale;
  float scaledH = texSize.y * scale;
  float ox = (vw - scaledW) * focal.x;
  float oy = (vh - scaledH) * focal.y;
  return vec2((screenPx.x - ox) / scaledW, (screenPx.y - oy) / scaledH);
}

vec4 sampleLayer(sampler2D tex, vec3 bg, vec4 mask, vec2 focal, vec2 texSize, vec2 screenPx) {
  float left = mix(mask.x, mask.y, u_progress);
  float right = mix(mask.z, mask.w, u_progress);
  float edgeY = mix(left, right, v_uv.x);
  if (v_uv.y < edgeY) {
    return vec4(0.0);
  }

  vec2 tuv = coverUv(screenPx, texSize, focal);
  if (tuv.x < 0.0 || tuv.x > 1.0 || tuv.y < 0.0 || tuv.y > 1.0) {
    return vec4(bg, 1.0);
  }

  vec4 sample = texture2D(tex, tuv);
  return vec4(mix(bg, sample.rgb, sample.a), 1.0);
}

void main() {
  vec2 screenPx = u_canvasRect.xy + v_uv * u_canvasRect.zw;

  vec4 c0 = sampleLayer(u_tex0, u_color0, u_mask0, u_focal0, u_texSize0, screenPx);
  vec4 c1 = sampleLayer(u_tex1, u_color1, u_mask1, u_focal1, u_texSize1, screenPx);
  vec4 c2 = sampleLayer(u_tex2, u_color2, u_mask2, u_focal2, u_texSize2, screenPx);

  vec4 outc = c0;
  outc.rgb = mix(outc.rgb, c1.rgb, c1.a);
  outc.a = max(outc.a, c1.a);
  outc.rgb = mix(outc.rgb, c2.rgb, c2.a);
  outc.a = max(outc.a, c2.a);

  gl_FragColor = outc;
}
`;function l(e,t){let n=e.trim();if(!n)return t;if(n.endsWith(`%`)){let e=Number.parseFloat(n);return Number.isFinite(e)?e/100:t}let r=Number.parseFloat(n);return Number.isFinite(r)?r:t}function u(e){let t=e.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);return t?[Number(t[1])/255,Number(t[2])/255,Number(t[3])/255]:[0,0,0]}function d(e){let t=e.trim().split(/\s+/);return[l(t[0]??`50%`,.5),l(t[1]??`50%`,.5)]}function f(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.warn(`[c-footer-textures]`,e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}function p(e){let t=f(e,e.VERTEX_SHADER,s),n=f(e,e.FRAGMENT_SHADER,c);if(!t||!n)return null;let r=e.createProgram();return r?(e.attachShader(r,t),e.attachShader(r,n),e.linkProgram(r),e.deleteShader(t),e.deleteShader(n),e.getProgramParameter(r,e.LINK_STATUS)?r:(console.warn(`[c-footer-textures]`,e.getProgramInfoLog(r)),e.deleteProgram(r),null)):null}function m(){return window.matchMedia(t).matches&&window.matchMedia(n).matches&&window.matchMedia(r).matches}function h(e){return Math.max(0,Math.min(1,e))}var g=class extends HTMLElement{canvas=null;gl=null;program=null;buffer=null;layers=[];locs=null;aPos=-1;rafId=0;visible=!1;webglActive=!1;layerUniformsDirty=!0;initGeneration=0;lastProgress=NaN;lastTop=NaN;lastWidth=0;lastHeight=0;lastViewportW=0;lastViewportH=0;resizeObserver=null;intersectionObserver=null;mediaQueries=[];unsubscribeScroll=null;onContextLost=e=>{e.preventDefault(),this.teardownGl(!1),this.removeAttribute(`data-webgl`)};onContextRestored=()=>{m()&&this.enableWebGL()};onMediaChange=()=>{this.syncMode()};connectedCallback(){this.canvas=this.querySelector(`[data-footer-textures-canvas]`),this.mediaQueries=[window.matchMedia(t),window.matchMedia(n),window.matchMedia(r)];for(let e of this.mediaQueries)e.addEventListener(`change`,this.onMediaChange);this.syncMode()}disconnectedCallback(){for(let e of this.mediaQueries)e.removeEventListener(`change`,this.onMediaChange);this.mediaQueries=[],this.initGeneration+=1,this.teardownGl(!0),this.removeAttribute(`data-webgl`),this.webglActive=!1}async syncMode(){m()?await this.enableWebGL():this.disableWebGL()}disableWebGL(){this.initGeneration+=1,this.teardownGl(!0),this.removeAttribute(`data-webgl`),this.webglActive=!1,this.canvas&&(this.canvas.hidden=!0)}async enableWebGL(){if(!this.canvas||this.webglActive)return;let e=++this.initGeneration;try{if(!this.gl){let e=this.canvas.getContext(`webgl`,{alpha:!0,antialias:!1,premultipliedAlpha:!0,preserveDrawingBuffer:!1});if(!e){this.disableWebGL();return}this.gl=e,this.canvas.addEventListener(`webglcontextlost`,this.onContextLost),this.canvas.addEventListener(`webglcontextrestored`,this.onContextRestored)}if(!this.program&&!this.initProgram()){this.disableWebGL();return}let t=[...this.querySelectorAll(`.footer-mask`)];if(t.length!==o){this.disableWebGL();return}if(this.clearLayerListeners(),this.layers=t.map(e=>({mask:e,img:e.querySelector(`img`),textureSource:null,ownsTextureSource:!1,texture:null,color:[0,0,0],maskVals:[0,0,0,0],focal:[.5,.5],texSize:[1,1]})),await Promise.all(this.layers.map(e=>this.prepareLayerImage(e))),e!==this.initGeneration||!this.isConnected||!this.gl)return;if(!m()){this.disableWebGL();return}this.readLayerStyles(),this.uploadTextures(),this.resize(),this.layerUniformsDirty=!0;for(let e of this.layers)e.img?.addEventListener(`load`,this.onLayerImageLoad);this.canvas.hidden=!1,this.setAttribute(`data-webgl`,``),this.webglActive=!0,this.bindObservers(),this.scheduleFrame(!0)}catch(t){console.warn(`[c-footer-textures] WebGL init failed, using CSS fallback`,t),e===this.initGeneration&&this.disableWebGL()}}async prepareLayerImage(e){let t=e.img;if(!t)return;if(t.loading===`lazy`&&(t.loading=`eager`),t.complete&&t.naturalWidth>0||await new Promise(e=>{t.addEventListener(`load`,()=>e(),{once:!0}),t.addEventListener(`error`,()=>e(),{once:!0})}),e.ownsTextureSource&&=(e.textureSource=null,!1),t.crossOrigin===`anonymous`&&t.complete&&t.naturalWidth>0){e.textureSource=t,e.ownsTextureSource=!1,e.texSize=[Math.max(1,t.naturalWidth),Math.max(1,t.naturalHeight)];return}let n=t.currentSrc||t.src;if(!n)return;let r=new Image;r.crossOrigin=`anonymous`,r.decoding=`async`,r.src=n;try{await r.decode()}catch{await new Promise((e,t)=>{r.addEventListener(`load`,()=>e(),{once:!0}),r.addEventListener(`error`,()=>t(Error(`texture load failed`)),{once:!0})})}e.textureSource=r,e.ownsTextureSource=!0,e.texSize=[Math.max(1,r.naturalWidth),Math.max(1,r.naturalHeight)]}onLayerImageLoad=e=>{if(!this.webglActive||!this.gl)return;let t=e.currentTarget;if(!(t instanceof HTMLImageElement))return;let n=this.layers.find(e=>e.img===t);n&&(async()=>{let e=this.initGeneration;await this.prepareLayerImage(n),e===this.initGeneration&&this.webglActive&&this.gl&&(this.readLayerStyle(n),this.uploadLayerTexture(n),this.layerUniformsDirty=!0,this.lastProgress=NaN,this.scheduleFrame(!0))})()};initProgram(){let e=this.gl;if(!e)return!1;let t=p(e);return t?(this.program=t,this.buffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.buffer),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),this.aPos=e.getAttribLocation(t,`a_pos`),this.locs={u_tex0:e.getUniformLocation(t,`u_tex0`),u_tex1:e.getUniformLocation(t,`u_tex1`),u_tex2:e.getUniformLocation(t,`u_tex2`),u_color0:e.getUniformLocation(t,`u_color0`),u_color1:e.getUniformLocation(t,`u_color1`),u_color2:e.getUniformLocation(t,`u_color2`),u_mask0:e.getUniformLocation(t,`u_mask0`),u_mask1:e.getUniformLocation(t,`u_mask1`),u_mask2:e.getUniformLocation(t,`u_mask2`),u_focal0:e.getUniformLocation(t,`u_focal0`),u_focal1:e.getUniformLocation(t,`u_focal1`),u_focal2:e.getUniformLocation(t,`u_focal2`),u_texSize0:e.getUniformLocation(t,`u_texSize0`),u_texSize1:e.getUniformLocation(t,`u_texSize1`),u_texSize2:e.getUniformLocation(t,`u_texSize2`),u_progress:e.getUniformLocation(t,`u_progress`),u_canvasRect:e.getUniformLocation(t,`u_canvasRect`),u_viewport:e.getUniformLocation(t,`u_viewport`)},e.disable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.clearColor(0,0,0,0),!0):!1}readLayerStyle(e){let t=getComputedStyle(e.mask);e.color=u(t.backgroundColor),e.maskVals=[l(t.getPropertyValue(`--mask-left-start`),0),l(t.getPropertyValue(`--mask-left-end`),0),l(t.getPropertyValue(`--mask-right-start`),0),l(t.getPropertyValue(`--mask-right-end`),0)],e.img&&(e.focal=d(getComputedStyle(e.img).objectPosition)),e.textureSource&&e.textureSource.naturalWidth>0&&(e.texSize=[Math.max(1,e.textureSource.naturalWidth),Math.max(1,e.textureSource.naturalHeight)])}readLayerStyles(){for(let e of this.layers)this.readLayerStyle(e);this.layerUniformsDirty=!0}uploadLayerTexture(e){let t=this.gl;if(!t)return;e.texture&&=(t.deleteTexture(e.texture),null);let n=t.createTexture();if(!n)return;e.texture=n,t.bindTexture(t.TEXTURE_2D,n),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,0),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR);let r=e.textureSource;r&&r.naturalWidth>0?t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r):t.texImage2D(t.TEXTURE_2D,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array([0,0,0,0]))}uploadTextures(){for(let e of this.layers)this.uploadLayerTexture(e);this.layerUniformsDirty=!0}bindObservers(){this.resizeObserver?.disconnect(),this.intersectionObserver?.disconnect(),this.resizeObserver=new ResizeObserver(()=>{this.webglActive&&(this.readLayerStyles(),this.resize(),this.scheduleFrame(!0))}),this.resizeObserver.observe(this),this.intersectionObserver=new IntersectionObserver(([e])=>{this.visible=!!e?.isIntersecting,this.visible?(this.bindScroll(),this.scheduleFrame(!0)):(this.unbindScroll(),this.cancelFrame())},{rootMargin:`50% 0px`}),this.intersectionObserver.observe(this)}bindScroll(){this.unsubscribeScroll||=e.listen(()=>{this.webglActive&&this.visible&&(this.cancelFrame(),this.render())})}unbindScroll(){this.unsubscribeScroll?.(),this.unsubscribeScroll=null}resize(){let e=this.canvas,t=this.gl;if(!e||!t)return;let n=this.clientWidth,r=this.clientHeight;if(n<=0||r<=0)return;let o=Math.min(window.devicePixelRatio||1,i),s=Math.round(n*o),c=Math.round(r*o);if(s>a){let e=a/s;s=a,c=Math.max(1,Math.round(c*e))}(e.width!==s||e.height!==c)&&(e.width=s,e.height=c),t.viewport(0,0,s,c),this.lastWidth=n,this.lastHeight=r,this.lastTop=NaN}scheduleFrame(e=!1){this.webglActive&&(this.visible||e)&&(this.rafId||=requestAnimationFrame(this.onFrame))}cancelFrame(){this.rafId&&=(cancelAnimationFrame(this.rafId),0)}onFrame=()=>{this.rafId=0,this.render()};render(){let e=this.gl,t=this.program,n=this.locs,r=this.canvas;if(!e||!t||!n||!r||!this.webglActive)return;let i=this.style.getPropertyValue(`--progress`).trim(),a=h(Number.parseFloat(i)||0),s=this.getBoundingClientRect(),c=window.innerWidth,l=window.innerHeight;if(a!==this.lastProgress||Math.round(s.top)!==this.lastTop||Math.round(s.width)!==this.lastWidth||Math.round(s.height)!==this.lastHeight||c!==this.lastViewportW||l!==this.lastViewportH||this.layerUniformsDirty){if(this.lastProgress=a,this.lastTop=Math.round(s.top),this.lastWidth=Math.round(s.width),this.lastHeight=Math.round(s.height),this.lastViewportW=c,this.lastViewportH=l,e.useProgram(t),e.bindBuffer(e.ARRAY_BUFFER,this.buffer),e.enableVertexAttribArray(this.aPos),e.vertexAttribPointer(this.aPos,2,e.FLOAT,!1,0,0),e.uniform1f(n.u_progress,a),e.uniform4f(n.u_canvasRect,s.left,s.top,s.width,s.height),e.uniform2f(n.u_viewport,c,l),this.layerUniformsDirty){let t=[n.u_tex0,n.u_tex1,n.u_tex2],r=[n.u_color0,n.u_color1,n.u_color2],i=[n.u_mask0,n.u_mask1,n.u_mask2],a=[n.u_focal0,n.u_focal1,n.u_focal2],s=[n.u_texSize0,n.u_texSize1,n.u_texSize2];for(let n=0;n<o;n++){let o=this.layers[n];o&&(e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,o.texture),e.uniform1i(t[n],n),e.uniform3fv(r[n],o.color),e.uniform4fv(i[n],o.maskVals),e.uniform2fv(a[n],o.focal),e.uniform2fv(s[n],o.texSize))}this.layerUniformsDirty=!1}e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,6)}}clearLayerListeners(){for(let e of this.layers)e.img?.removeEventListener(`load`,this.onLayerImageLoad)}teardownGl(e){this.cancelFrame(),this.unbindScroll(),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.intersectionObserver?.disconnect(),this.intersectionObserver=null,this.clearLayerListeners();let t=this.gl;if(t){for(let e of this.layers)e.texture&&=(t.deleteTexture(e.texture),null);this.buffer&&=(t.deleteBuffer(this.buffer),null),this.program&&=(t.deleteProgram(this.program),null),e&&(this.canvas?.removeEventListener(`webglcontextlost`,this.onContextLost),this.canvas?.removeEventListener(`webglcontextrestored`,this.onContextRestored),t.getExtension(`WEBGL_lose_context`)?.loseContext(),this.gl=null)}this.layers=[],this.locs=null,this.layerUniformsDirty=!0,this.lastProgress=NaN,this.lastTop=NaN,this.lastViewportW=0,this.lastViewportH=0,this.visible=!1,this.webglActive=!1}};customElements.define(`c-footer-textures`,g);export{g as default};