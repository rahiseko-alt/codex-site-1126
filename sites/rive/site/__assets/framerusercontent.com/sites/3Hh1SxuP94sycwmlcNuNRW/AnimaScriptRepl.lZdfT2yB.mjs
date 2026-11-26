import{t as e}from"./rolldown-runtime.Bi-D_2cA.mjs";import{D as t,T as n,V as r,_ as i,b as a,c as o,k as s,l as c,o as l,s as u,y as d,z as f}from"./react.Bu9fmeMM.mjs";import{Ut as ee,Y as te,k as p,s as m}from"./framer.dsmlYutK.mjs";function ne(){let e=r;return e.__rascSvc||(e.__rascSvc=fetch(b+`version`,{cache:`no-cache`}).then(e=>e.ok?e.text():``,()=>``).then(t=>new Promise((n,r)=>{let i=t.trim()?`?v=`+encodeURIComponent(t.trim()):``,a=()=>e.createRascModule({locateFile:e=>b+e+i}).then(e=>{try{e.FS.mkdir(`/project`)}catch{}n({rasc:e,compile:e.cwrap(`rw_compile`,`number`,[`string`,`string`,`number`,`number`]),moduleBytes:e.cwrap(`rw_module_bytes`,`number`,[]),moduleSize:e.cwrap(`rw_module_size`,`number`,[]),diagnostics:e.cwrap(`rw_diagnostics_json`,`string`,[]),format:e.cwrap(`rw_format`,`string`,[`string`]),tokens:e.cwrap(`rw_tokens_json`,`string`,[`string`])})},r);if(e.createRascModule)return a();let o=document.createElement(`script`);o.src=b+`rasc.js`+i,o.onload=a,o.onerror=()=>r(/* @__PURE__ */ Error(`rasc.js failed to load`)),document.head.appendChild(o)})),e.__rascSvc.catch(()=>{e.__rascSvc=null})),e.__rascSvc}function re(e,t){for(let t of e.rasc.FS.readdir(`/project`))t!==`.`&&t!==`..`&&e.rasc.FS.unlink(`/project/`+t);e.rasc.FS.writeFile(`/project/main.as`,t);let n=performance.now(),r=e.compile(`/project/main.as`,`stub`,0,0),i=performance.now()-n,a=JSON.parse(e.diagnostics()||`[]`),o=r?e.rasc.HEAPU8.slice(e.moduleBytes(),e.moduleBytes()+e.moduleSize()):null;return{ok:!!r,bytes:o,problems:a,ms:i}}function ie(e){if(!/[^\x00-\x7f]/.test(e))return null;let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.codePointAt(r),a=i>65535?4:i>2047?3:i>127?2:1;for(let e=0;e<a;e++)t[n+e]=r;n+=a,i>65535&&r++}return t[n]=e.length,t}function h(e,t,n){let r=0,i=e.split(`
`);for(let e=0;e<t-1&&e<i.length;e++)r+=k.encode(i[e]).length+1;r+=n-1;let a=ie(e);return a?a[r]??e.length:r}function ae(e,t,n){let r=n.filter(e=>e.start!=null&&e.end>e.start),i=(t,n)=>{let i=E(e.slice(t,n));for(let e of r)if(t>=e.start&&t<e.end)return`<span style="text-decoration:underline wavy ${e.severity===`error`?C:x(.6)};text-underline-offset:3px">${i}</span>`;return i},a=[``,`k`,``,`n`,`s`,`c`],o=``,s=0;for(let n=0;n<t.length;n++){let[r,c,l]=t[n];r>s&&(o+=i(s,r));let u=e.slice(r,c),d=a[l]||``;if(l===2){let r=t[n-1],i=t[n+1];r&&e.slice(r[0],r[1])===`@`?d=`d`:T.has(u)?d=`t`:i&&e[i[0]]===`(`&&(d=`f`)}else l===0&&/^[+\-*/%=<>!&|^~?:]+$/.test(u)&&(d=`o`);o+=O(d,i(r,c)),s=c}return s<e.length&&(o+=i(s,e.length)),o}function g(e){let t=/(\/\/[^\n]*)|("(?:[^"\\]|\\.)*")|\b(\d+(?:\.\d+)?)\b|\b([A-Za-z_]\w*)\b/g,n=``,r=0,i;for(;i=t.exec(e);){n+=E(e.slice(r,i.index));let a=E(i[0]);i[1]?n+=O(`c`,a):i[2]?n+=O(`s`,a):i[3]?n+=O(`n`,a):A.test(i[4])&&i[4].match(A)[0]===i[4]?n+=O(`k`,a):T.has(i[4])?n+=O(`t`,a):e[t.lastIndex]===`(`?n+=O(`f`,a):n+=a,r=t.lastIndex}return n+E(e.slice(r))}function _(e,t){let n=new DataView(e.buffer).getUint32(t-4,!0);return new TextDecoder(`utf-16le`).decode(new Uint8Array(e.buffer,t,n))}async function oe(e,t,n){let r=await WebAssembly.compile(e),i=null,a=e=>i?_(i,e):`<string>`,o={};for(let e of WebAssembly.Module.imports(r))e.module===`env`&&(e.name===`dot`&&n?o.dot=n:e.name===`seed`?o.seed=()=>Math.random()*4294967296:[`print`,`log`,`info`,`debug`].includes(e.name)?o[e.name]=e=>t(`out`,a(e)):[`warn`,`error`].includes(e.name)?o[e.name]=e=>t(`err`,a(e)):e.name===`abort`?o.abort=()=>{throw Error(`abort`)}:o[e.name]=()=>(t(`err`,`unlinked import env.`+e.name),0));let s=await WebAssembly.instantiate(r,{env:o});return i=s.exports.memory||null,s}function v(e){let n=ee.current()===ee.canvas,u=e.editorHeight??360,[f,te]=i(()=>Math.max(0,Math.min(w.length-1,e.startTab??0))),[p,m]=i(()=>w.map(e=>e.src)),[_,v]=i(()=>g(w[f].src)),[b,T]=i([]),[E,D]=i([]),[O,k]=i(``),[A,j]=i(!1),[M,le]=i(null),[N,ue]=i(!0),[P,de]=i(!1),[fe,F]=i(!1);d(()=>{if(F(!1),!P)return;let e=setTimeout(()=>F(!0),1600);return()=>clearTimeout(e)},[P]);let[pe,me]=i(!1),[I,he]=i({x:0,y:0}),[ge,_e]=i(7.8),L=a(null),R=a(null),z=a(null),ve=a(null),B=a(null),V=a(null),H=a(null),ye=a(0),be=a(!1),U=w[f],W=p[f],G=s((e,t)=>D(n=>[...n.slice(-40),{k:e,t}]),[]);t(()=>{let e=L.current;if(!e)return;ue(e.clientWidth>=760);let t=new ResizeObserver(()=>ue(e.clientWidth>=760));return t.observe(e),()=>t.disconnect()},[]),d(()=>{let e=()=>{let e=document.createElement(`canvas`).getContext(`2d`);if(!e)return;e.font=`13px ${y}`;let t=e.measureText(`0123456789`).width/10;t>3&&_e(t)};e(),document.fonts?.ready?.then(e)},[]);let xe=s((e,t,n)=>{if(!e)return v(g(t));let r=JSON.parse(e.tokens(t)||`[]`),i=ie(t);if(i)for(let e of r)e[0]=i[e[0]]??t.length,e[1]=i[e[1]]??t.length;v(ae(t,r,n))},[]),K=s(async(e,t,n)=>{let i=B.current;if(!i)return;let a=re(i,e),o=a.problems.map(t=>({...t,start:h(e,t.line,t.column),end:h(e,t.endLine,t.endColumn)}));if(T(o),xe(i,e,o),!a.ok||!a.bytes)k(`compile failed`);else if(k(`compiled ${a.bytes.length.toLocaleString()} bytes in ${Math.max(1,Math.round(a.ms))} ms`),w[t].visual){let e=[],t=(await oe(a.bytes,G,(t,n,r,i)=>{e.push(t,n,r,i)})).exports.frame;if(typeof t!=`function`){G(`err`,`export frame(t: f32) to draw`);return}V.current=n=>{e.length=0,t(n);let i=ve.current;if(!i)return dt;let a=i.getContext(`2d`),o=Math.min(2,r.devicePixelRatio||1),s=i.clientWidth,c=i.clientHeight;i.width!==Math.round(s*o)&&(i.width=Math.round(s*o),i.height=Math.round(c*o)),a.setTransform(o,0,0,o,0,0),a.clearRect(0,0,s,c);let l=Math.min(s/400,c/260);a.fillStyle=S;for(let t=0;t<e.length;t+=4)a.globalAlpha=Math.max(0,Math.min(1,e[t+3])),a.beginPath(),a.arc(s/2+e[t]*l,c/2+e[t+1]*l,Math.max(.3,e[t+2]*l),0,Math.PI*2),a.fill();a.globalAlpha=1},H.current=()=>{let n=performance.now();for(let n=0;n<50;n++)e.length=0,t(n*.016);return(performance.now()-n)/50}}else if(n){D([{k:`meta`,t:`compiled ${a.bytes.length} bytes`}]);try{let e=await oe(a.bytes,G),t=Object.entries(e.exports).filter(([e,t])=>typeof t==`function`&&!e.startsWith(`__`)),n=t.filter(([,e])=>e.length===0);for(let[e,r]of n.length?n:t.slice(0,1)){let t=Array(r.length).fill(10);try{let n=r(...t);G(`out`,`${e}(${t.join(`, `)})${n===void 0?``:` = `+n}`)}catch(t){G(`err`,`${e} trapped: ${t}`)}}}catch(e){G(`err`,String(e))}}},[xe,G]);d(()=>{if(n)return;let e=L.current;if(!e)return;let t=new IntersectionObserver(e=>{for(let t of e)be.current=t.isIntersecting,t.isIntersecting&&!B.current&&!A&&(j(!0),k(`loading the rasc compiler…`),ne().then(e=>{B.current=e,j(!1),K(p[f],f,!w[f].visual)},()=>{j(!1),k(`compiler unavailable`)}))},{rootMargin:`300px`});return t.observe(e),()=>t.disconnect()},[n]),d(()=>{if(n||!U.visual)return;let e=0,t=0,r=performance.now(),i=()=>{e=requestAnimationFrame(i),be.current&&V.current&&(V.current((performance.now()-r)/1e3),H.current&&performance.now()-t>1e3&&(le(H.current()),t=performance.now()))};return e=requestAnimationFrame(i),()=>cancelAnimationFrame(e)},[n,U.visual,f]);let Se=e=>{te(e),T([]),D([]),le(null),V.current=null,H.current=null;let t=p[e];B.current?K(t,e,!w[e].visual):v(g(t))},q=e=>{me(!0),m(t=>t.map((t,n)=>n===f?e:t)),v(g(e)),clearTimeout(ye.current),ye.current=setTimeout(()=>K(e,f,!1),U.visual?180:300)},Ce=()=>{B.current&&K(W,f,!0)},we=()=>{let e=B.current;if(!e)return;let t=e.format(W);t&&t!==W&&(q(t),z.current&&(z.current.value=t))},Te=()=>{let e=w[f].src;m(t=>t.map((t,n)=>n===f?e:t)),z.current&&(z.current.value=e),B.current?K(e,f,!U.visual):v(g(e))},J=(()=>{let e=W.indexOf(U.cursorAfter);if(e<0)return null;let t=e+U.cursorAfter.length,n=W.slice(0,t),r=n.split(`
`).length-1,i=t-(n.lastIndexOf(`
`)+1),a=W.indexOf(`
`,t);return{line:r,col:i,offset:t,lineLen:(a<0?W.length:a)-(n.lastIndexOf(`
`)+1)}})(),Ee=!P&&!pe&&!n&&J!==null,De=()=>{if(de(!0),!pe&&J&&z.current){let e=z.current;requestAnimationFrame(()=>e.setSelectionRange(J.offset,J.offset))}},Oe=()=>{R.current&&z.current&&(R.current.scrollTop=z.current.scrollTop,R.current.scrollLeft=z.current.scrollLeft,he({x:z.current.scrollLeft,y:z.current.scrollTop}))},ke=N?13:11,Y=N?20:17,X=N?18:12,Z=N?16:12,Ae=ge*ke/13,je={margin:0,padding:`${Z}px ${X}px`,fontFamily:y,fontSize:ke,lineHeight:`${Y}px`,tabSize:4,whiteSpace:`pre`,overflow:`auto`,position:`absolute`,inset:0,boxSizing:`border-box`,letterSpacing:0,fontVariantLigatures:`none`},Q={fontFamily:y,fontSize:11,letterSpacing:`0.08em`,textTransform:`uppercase`,color:x(.8),background:`transparent`,border:`1px solid ${x(.18)}`,padding:`5px 10px`,cursor:`pointer`,borderRadius:0},$=b.filter(e=>e.severity===`error`);return/*#__PURE__*/ c(`div`,{ref:L,className:`asr-root`,style:{position:`relative`,width:`100%`,border:`1px solid ${x(.14)}`,background:`linear-gradient(180deg, #0d0d0f 0%, #070708 100%)`,fontFamily:se,color:S},children:[/*#__PURE__*/ l(`style`,{dangerouslySetInnerHTML:{__html:ce}}),/*#__PURE__*/ c(`div`,{className:`asr-halo`+(P?` on`:``)+(fe?` settled`:``),children:[/*#__PURE__*/ l(`i`,{className:`t`}),/*#__PURE__*/ l(`i`,{className:`w`})]}),/*#__PURE__*/ l(`div`,{className:`asr-ring`+(P?` on`:``)+(fe?` settled`:``)}),/*#__PURE__*/ c(`div`,{style:{display:`flex`,alignItems:`stretch`,borderBottom:`1px solid ${x(.12)}`,flexWrap:`wrap`},children:[/*#__PURE__*/ l(`div`,{style:{display:`flex`,flex:N?1:`1 1 100%`,minWidth:0,overflowX:`auto`,borderBottom:N?`none`:`1px solid ${x(.1)}`},children:w.map((e,t)=>/*#__PURE__*/ l(`button`,{onClick:()=>Se(t),style:{fontFamily:y,fontSize:12,color:t===f?S:x(.45),background:t===f?x(.05):`transparent`,border:`none`,borderRight:`1px solid ${x(.1)}`,padding:`11px 16px`,cursor:`pointer`,whiteSpace:`nowrap`,boxShadow:t===f?`inset 0 1px 0 ${x(.7)}`:`none`},children:e.name},e.name))}),/*#__PURE__*/ c(`div`,{style:{display:`flex`,gap:8,alignItems:`center`,padding:`6px 10px`,marginLeft:N?0:`auto`},children:[/*#__PURE__*/ l(`button`,{style:Q,onClick:Te,children:`Reset`}),/*#__PURE__*/ l(`button`,{style:Q,onClick:we,children:`Format`}),!U.visual&&/*#__PURE__*/ l(`button`,{style:{...Q,color:`#000`,background:S,borderColor:S},onClick:Ce,children:`Run ▸`})]})]}),/*#__PURE__*/ c(`div`,{style:{display:`grid`,gridTemplateColumns:N?`minmax(0, 1.25fr) minmax(0, 1fr)`:`1fr`},children:[/*#__PURE__*/ c(`div`,{className:`asr-edit`,style:{position:`relative`,height:u,cursor:`text`,overflow:`hidden`,borderRight:N?`1px solid ${x(.1)}`:`none`,borderBottom:N?`none`:`1px solid ${x(.1)}`},children:[/*#__PURE__*/ l(`pre`,{ref:R,"aria-hidden":`true`,style:{...je,color:x(.72),pointerEvents:`none`,overflow:`hidden`},dangerouslySetInnerHTML:{__html:_+`
`}}),!N&&/*#__PURE__*/ l(`div`,{style:{position:`absolute`,top:0,right:0,bottom:0,width:28,pointerEvents:`none`,zIndex:1,background:`linear-gradient(90deg, rgba(10,10,12,0) 0%, rgba(10,10,12,0.9) 100%)`}}),Ee&&J&&/*#__PURE__*/ c(o,{children:[/*#__PURE__*/ l(`div`,{className:`asr-cursor`,style:{left:X+J.col*Ae-I.x,top:Z+J.line*Y+1-I.y,height:Y-2}}),/*#__PURE__*/ l(`div`,{className:`asr-hint`,style:{left:X+(J.lineLen+2)*Ae-I.x,top:Z+J.line*Y+(Y-14)/2-I.y},children:`← type here`})]}),/*#__PURE__*/ l(`textarea`,{ref:z,onFocus:De,onBlur:()=>de(!1),defaultValue:W,spellCheck:!1,autoCapitalize:`off`,autoComplete:`off`,wrap:`off`,"aria-label":`${U.name} source`,onChange:e=>q(e.target.value),onScroll:Oe,onKeyDown:e=>{if(e.key===`Tab`){e.preventDefault();let t=e.currentTarget,n=t.selectionStart;t.setRangeText(`    `,n,t.selectionEnd,`end`),q(t.value)}else(e.metaKey||e.ctrlKey)&&e.key===`Enter`&&(e.preventDefault(),Ce())},style:{...je,color:`transparent`,caretColor:S,background:`transparent`,border:`none`,outline:`none`,resize:`none`}},f)]}),/*#__PURE__*/ c(`div`,{style:{display:`flex`,flexDirection:`column`,minHeight:N?u:0},children:[U.visual?/*#__PURE__*/ c(`div`,{style:{position:`relative`,flex:1,minHeight:N?0:240},children:[/*#__PURE__*/ l(`canvas`,{ref:ve,style:{position:`absolute`,inset:0,width:`100%`,height:`100%`,display:`block`}}),!V.current&&/*#__PURE__*/ l(`div`,{style:{position:`absolute`,inset:0,display:`flex`,alignItems:`center`,justifyContent:`center`,fontFamily:y,fontSize:12,color:x(.4)},children:A||!O?`loading the rasc compiler…`:($.length,``)})]}):/*#__PURE__*/ c(`div`,{style:{flex:1,minHeight:N?0:140,padding:`14px 18px`,fontFamily:y,fontSize:13,lineHeight:`20px`,overflow:`auto`},children:[E.length===0&&/*#__PURE__*/ l(`div`,{style:{color:x(.35)},children:`Press Run ▸ (or ⌘ Enter) to compile and run.`}),E.map((e,t)=>/*#__PURE__*/ l(`div`,{style:{color:e.k===`err`?C:e.k===`meta`?x(.4):S,whiteSpace:`pre-wrap`},children:e.t},t))]}),$.length>0&&/*#__PURE__*/ l(`div`,{style:{borderTop:`1px solid ${x(.1)}`,padding:`10px 18px`,fontFamily:y,fontSize:12,lineHeight:`18px`,maxHeight:110,overflow:`auto`},children:$.slice(0,4).map((e,t)=>/*#__PURE__*/ c(`div`,{style:{color:C},children:[e.line,`:`,e.column,`  `,e.message]},t))})]})]}),/*#__PURE__*/ c(`div`,{style:{display:`flex`,justifyContent:`space-between`,gap:12,flexWrap:`wrap`,borderTop:`1px solid ${x(.12)}`,padding:`8px 14px`,fontFamily:y,fontSize:11,letterSpacing:`0.06em`,textTransform:`uppercase`,color:x(.45)},children:[/*#__PURE__*/ l(`span`,{children:O||`rasc · the AnimaScript compiler, running in your\xA0browser`}),/*#__PURE__*/ l(`span`,{children:U.visual&&M?`frame() ${M<.01?(M*1e3).toFixed(1)+` µs`:M.toFixed(2)+` ms`}`:`WebAssembly`})]})]})}var se,y,b,x,S,C,w,T,E,D,O,k,A,j,ce;function M(){return(M=e((()=>{f(),u(),n(),te(),se=`"Inter", sans-serif`,y=`"PragmataPro VF Variable Regular", "PragmataPro VF", "PragmataPro", ui-monospace, monospace`,b=`https://rive.app/rasc/assets/repl/`,x=e=>`rgba(236,237,240,${e})`,S=`#dfe0e3`,C=`#FF483C`,w=[{name:`orbit.as`,src:`// Edit any number: the scene recompiles as you type.
declare function dot(x: f32, y: f32, r: f32, a: f32): void;

struct Vec2 {
    x: f32;
    y: f32;
}

function orbit(i: i32, t: f32): Vec2 {
    const k = <f32>i;
    const angle = t * (0.3 + k * 0.004) + k * 2.399;
    const radius = 16.0 + k * 0.42;
    let p = Vec2();
    p.x = Mathf.cos(angle) * radius;
    p.y = Mathf.sin(angle) * radius * 0.6;
    return p;
}

export function frame(t: f32): void {
    const count = 360;
    for (let i = 0; i < count; i++) {
        const p = orbit(i, t);
        const fade = <f32>i / <f32>count;
        dot(p.x, p.y, 1.0 + fade * 1.6, 0.25 + fade * 0.75);
    }
}
`,visual:!0,cursorAfter:`const radius = 16.0`},{name:`bounce.as`,src:`struct Vec2 {
    x: f32;
    y: f32;
}

export function reflect(v: Vec2, n: Vec2): Vec2 {
    // Value classes never allocate: a Vec2 is two f32 leaves
    // living in wasm locals, returned via multi-value.
    const d: f32 = 2.0 * (v.x * n.x + v.y * n.y);
    let r = Vec2();
    r.x = v.x - d * n.x;
    r.y = v.y - d * n.y;
    return r;
}

export function demo(): f32 {
    let v = Vec2();
    v.x = 3;
    v.y = -1;
    let n = Vec2();
    n.y = 1;
    return reflect(v, n).y;   // the bounce: 1
}
`,cursorAfter:`v.x = 3`},{name:`closure.as`,src:`// Closures capture enclosing locals.
function counter(step: i32): () => i32 {
    let n = 0;
    return (): i32 => {
        n += step;
        return n;
    };
}

export function demo(): i32 {
    const next = counter(5);
    next();
    next();
    return next();   // 15
}
`,cursorAfter:`counter(5`}],T=new Set(`i8 i16 i32 i64 u8 u16 u32 u64 f32 f64 bool isize usize v128 string String Array Map Set Math Mathf StaticArray FixedArray Float32Array ArrayBuffer Vec2`.split(` `)),E=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`),D={k:S,t:x(.78),n:x(.92),s:x(.62),c:x(.36),f:x(.86),o:x(.5),d:x(.6)},O=(e,t)=>e?`<span style="color:${D[e]}">${t}</span>`:t,k=new TextEncoder,A=/\b(declare|function|export|const|let|return|struct|class|for|if|else|while|new|import|from|void|true|false|null|this)\b/,j=[`#F30058`,`#FF483C`,`#FFA41C`,`#71FF19`,`#19F2FF`,`#3084FF`,`#F30058`],ce=`
@property --asr-a { syntax: "<angle>"; inherits: true; initial-value: 0deg; }
@keyframes asr-spin { to { --asr-a: 360deg; } }
@keyframes asr-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
/* Prism ring + halo around the whole REPL, same build as the hero prompt (HeroRotator PRISM_CSS): a crisp 1.5px
   ring, plus blurred copies of the gradient masked so they only show OUTSIDE the box (the mask reaches 100px out so
   the 26px blur fades before its edge). A lit prism is a moment: full ring + halo when focus arrives, then after
   ~1.6s it settles to a thin ring with no halo; pointing at the REPL brings the full glow back. */
.asr-root { --asr-a: 0deg; animation: asr-spin 6s linear infinite; }
.asr-ring, .asr-halo { position: absolute; pointer-events: none; box-sizing: border-box; opacity: 0;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; }
.asr-ring { inset: -1px; padding: 1.5px; z-index: 3; background: conic-gradient(from var(--asr-a), ${j.join(`, `)});
  transition: opacity 0.6s ease; }
.asr-halo { inset: -101px; padding: 100px; z-index: 0; transition: opacity 0.6s ease; }
.asr-halo > i { position: absolute; inset: 100px; background: conic-gradient(from var(--asr-a), ${j.join(`, `)}); }
.asr-halo > i.t { filter: blur(8px); opacity: 0.75; }
.asr-halo > i.w { filter: blur(26px); opacity: 0.4; inset: 92px; }
/* Phone: ~20px side margins, so a tighter halo fades out before the screen edge. */
@media (max-width: 600px) { .asr-halo > i.t { filter: blur(5px); opacity: 0.6; } .asr-halo > i.w { filter: blur(11px); opacity: 0.3; inset: 97px; } }
.asr-ring.on { opacity: 1; }
.asr-ring.on.settled { opacity: 0.45; }
.asr-halo.on { opacity: 1; }
.asr-halo.on.settled { opacity: 0; }
.asr-root:hover .asr-ring, .asr-root:hover .asr-ring.on.settled, .asr-root:hover .asr-halo, .asr-root:hover .asr-halo.on.settled { opacity: 1; }
.asr-cursor { position: absolute; width: 0.62em; height: 18px; pointer-events: none; z-index: 1;
  background: conic-gradient(from var(--asr-a), ${j.join(`, `)});
  animation: asr-spin 2.4s linear infinite, asr-blink 1.06s steps(1) infinite; }
.asr-cursor::after { content: ""; position: absolute; inset: -3px; background: inherit; filter: blur(7px); opacity: 0.9; z-index: -1; }
.asr-hint { position: absolute; pointer-events: none; font-family: ${y}; font-size: 11px; letter-spacing: 0.06em;
  color: ${x(.45)}; white-space: nowrap; z-index: 1; }
.asr-edit textarea { caret-shape: block; }
.asr-edit:hover .asr-frame { border-color: ${x(.3)}; }
@media (prefers-reduced-motion: reduce) { .asr-root, .asr-cursor { animation: none; } }
`,p(v,{startTab:{type:m.Number,title:`Start Tab`,defaultValue:0,min:0,max:2,step:1},editorHeight:{type:m.Number,title:`Editor H`,defaultValue:360,min:200,max:700,step:10}})})))()}export{M as n,v as t};
//# sourceMappingURL=AnimaScriptRepl.lZdfT2yB.mjs.map