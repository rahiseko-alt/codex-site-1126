const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CpEgAJSJ.js","./DPlU4xhr.js","./gZiZlY3L.js","./Cezxri0e.js","./CADqZNh7.js","./CUU0L6v8.js","./CPI2FJtM.js","./DDZkfQUt.js","./CSrxhd5Y.js"])))=>i.map(i=>d[i]);
import{n as e}from"./XKyaHtl9.js";import{Ft as t,J as n,L as r,Lt as i,Q as a,ct as o,nt as s,st as c,xt as l,zt as u}from"./T5jNaQ1L.js";import{t as d}from"./DclECHGd.js";import{a as f,i as p,n as m,r as h}from"./C51tXoI7.js";var g=Object.defineProperty,_=Object.getOwnPropertyDescriptor,v=(e,t,n,r)=>{for(var i=r>1?void 0:r?_(t,n):t,a=e.length-1,o;a>=0;a--)(o=e[a])&&(i=(r?o(t,n,i):o(i))||i);return r&&i&&g(t,n,i),i},y={},ee=function(e,t,n,r,i){var a=new Worker(y[t]||(y[t]=URL.createObjectURL(new Blob([e+`;addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})`],{type:`text/javascript`}))));return a.onmessage=function(e){var t=e.data,n=t.$e$;if(n){var r=Error(n[0]);r.code=n[1],r.stack=n[2],i(r,null)}else i(null,t)},a.postMessage(n,r),a},b=Uint8Array,x=Uint16Array,S=Int32Array,te=new b([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ne=new b([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),re=new b([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ie=function(e,t){for(var n=new x(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var i=new S(n[30]),r=1;r<30;++r)for(var a=n[r];a<n[r+1];++a)i[a]=a-n[r]<<5|r;return{b:n,r:i}},C=ie(te,2),ae=C.b,oe=C.r;ae[28]=258,oe[258]=28;var se=ie(ne,0).b,ce=new x(32768);for(T=0;T<32768;++T)w=(T&43690)>>1|(T&21845)<<1,w=(w&52428)>>2|(w&13107)<<2,w=(w&61680)>>4|(w&3855)<<4,ce[T]=((w&65280)>>8|(w&255)<<8)>>1;var w,T,le=function(e,t,n){for(var r=e.length,i=0,a=new x(t);i<r;++i)e[i]&&++a[e[i]-1];var o=new x(t);for(i=1;i<t;++i)o[i]=o[i-1]+a[i-1]<<1;var s;if(n){s=new x(1<<t);var c=15-t;for(i=0;i<r;++i)if(e[i])for(var l=i<<4|e[i],u=t-e[i],d=o[e[i]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)s[ce[d]>>c]=l}else for(s=new x(r),i=0;i<r;++i)e[i]&&(s[i]=ce[o[e[i]-1]++]>>15-e[i]);return s},E=new b(288);for(T=0;T<144;++T)E[T]=8;for(var T=144;T<256;++T)E[T]=9;for(var T=256;T<280;++T)E[T]=7;for(var T=280;T<288;++T)E[T]=8;var T,D=new b(32);for(T=0;T<32;++T)D[T]=5;var T,ue=le(E,9,1),de=le(D,5,1),fe=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},O=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},pe=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},me=function(e){return(e+7)/8|0},he=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new b(e.subarray(t,n))},ge=[`unexpected EOF`,`invalid block type`,`invalid length/literal`,`invalid distance`,`stream finished`,`no stream handler`,,`no callback`,`invalid UTF-8 data`,`extra field too long`,`date not in range 1980-2099`,`filename too long`,`stream finishing`,`invalid zip data`],k=function(e,t,n){var r=Error(t||ge[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,k),!n)throw r;return r},_e=function(e,t,n,r){var i=e.length,a=r?r.length:0;if(!i||t.f&&!t.l)return n||new b(0);var o=!n,s=o||t.i!=2,c=t.i;o&&(n=new b(i*3));var l=function(e){var t=n.length;if(e>t){var r=new b(Math.max(t*2,e));r.set(n),n=r}},u=t.f||0,d=t.p||0,f=t.b||0,p=t.l,m=t.d,h=t.m,g=t.n,_=i*8;do{if(!p){u=O(e,d,1);var v=O(e,d+1,3);if(d+=3,v){if(v==1)p=ue,m=de,h=9,g=5;else if(v==2){var y=O(e,d,31)+257,ee=O(e,d+10,15)+4,x=y+O(e,d+5,31)+1;d+=14;for(var S=new b(x),ie=new b(19),C=0;C<ee;++C)ie[re[C]]=O(e,d+C*3,7);d+=ee*3;for(var oe=fe(ie),ce=(1<<oe)-1,w=le(ie,oe,1),C=0;C<x;){var T=w[O(e,d,ce)];d+=T&15;var E=T>>4;if(E<16)S[C++]=E;else{var D=0,ge=0;for(E==16?(ge=3+O(e,d,3),d+=2,D=S[C-1]):E==17?(ge=3+O(e,d,7),d+=3):E==18&&(ge=11+O(e,d,127),d+=7);ge--;)S[C++]=D}}var _e=S.subarray(0,y),A=S.subarray(y);h=fe(_e),g=fe(A),p=le(_e,h,1),m=le(A,g,1)}else k(1)}else{var E=me(d)+4,ve=e[E-4]|e[E-3]<<8,ye=E+ve;if(ye>i){c&&k(0);break}s&&l(f+ve),n.set(e.subarray(E,ye),f),t.b=f+=ve,t.p=d=ye*8,t.f=u;continue}if(d>_){c&&k(0);break}}s&&l(f+131072);for(var be=(1<<h)-1,xe=(1<<g)-1,Se=d;;Se=d){var D=p[pe(e,d)&be],Ce=D>>4;if(d+=D&15,d>_){c&&k(0);break}if(D||k(2),Ce<256)n[f++]=Ce;else if(Ce==256){Se=d,p=null;break}else{var we=Ce-254;if(Ce>264){var C=Ce-257,Te=te[C];we=O(e,d,(1<<Te)-1)+ae[C],d+=Te}var Ee=m[pe(e,d)&xe],j=Ee>>4;Ee||k(3),d+=Ee&15;var A=se[j];if(j>3){var Te=ne[j];A+=pe(e,d)&(1<<Te)-1,d+=Te}if(d>_){c&&k(0);break}s&&l(f+131072);var M=f+we;if(f<A){var De=a-A,Oe=Math.min(A,M);for(De+f<0&&k(3);f<Oe;++f)n[f]=r[De+f]}for(;f<M;++f)n[f]=n[f-A]}}t.l=p,t.p=Se,t.b=f,t.f=u,p&&(u=1,t.m=h,t.d=m,t.n=g)}while(!u);return f!=n.length&&o?he(n,0,f):n.subarray(0,f)},A=new b(0),ve=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n},ye=function(e,t,n){for(var r=e(),i=e.toString(),a=i.slice(i.indexOf(`[`)+1,i.lastIndexOf(`]`)).replace(/\s+/g,``).split(`,`),o=0;o<r.length;++o){var s=r[o],c=a[o];if(typeof s==`function`){t+=`;`+c+`=`;var l=s.toString();if(s.prototype){if(l.indexOf(`[native code]`)!=-1){var u=l.indexOf(` `,8)+1;t+=l.slice(u,l.indexOf(`(`,u))}else for(var d in t+=l,s.prototype)t+=`;`+c+`.prototype.`+d+`=`+s.prototype[d].toString()}else t+=l}else n[c]=s}return t},be=[],xe=function(e){var t=[];for(var n in e)e[n].buffer&&t.push((e[n]=new e[n].constructor(e[n])).buffer);return t},Se=function(e,t,n,r){if(!be[n]){for(var i=``,a={},o=e.length-1,s=0;s<o;++s)i=ye(e[s],i,a);be[n]={c:ye(e[o],i,a),e:a}}var c=ve({},be[n].e);return ee(be[n].c+`;onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=`+t.toString()+`}`,n,c,xe(c),r)},Ce=function(){return[b,x,S,te,ne,re,ae,se,ue,de,ce,ge,le,fe,O,pe,me,he,k,_e,ke,we,Te]},we=function(e){return postMessage(e,[e.buffer])},Te=function(e){return e&&{out:e.size&&new b(e.size),dictionary:e.dictionary}},Ee=function(e,t,n,r,i,a){var o=Se(n,r,i,function(e,t){o.terminate(),a(e,t)});return o.postMessage([e,t],t.consume?[e.buffer]:[]),function(){o.terminate()}},j=function(e,t){return e[t]|e[t+1]<<8},M=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},De=function(e,t){return M(e,t)+M(e,t+4)*4294967296};function Oe(e,t,n){return n||(n=t,t={}),typeof n!=`function`&&k(7),Ee(e,t,[Ce],function(e){return we(ke(e.data[0],Te(e.data[1])))},1,n)}function ke(e,t){return _e(e,{i:2},t&&t.out,t&&t.dictionary)}var Ae=typeof TextDecoder<`u`&&new TextDecoder;try{Ae.decode(A,{stream:!0})}catch{}var je=function(e){for(var t=``,n=0;;){var r=e[n++],i=(r>127)+(r>223)+(r>239);if(n+i>e.length)return{s:t,r:he(e,n-1)};i?i==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):i&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function Me(e,t){if(t){for(var n=``,r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}if(Ae)return Ae.decode(e);var i=je(e),a=i.s,n=i.r;return n.length&&k(8),a}var Ne=function(e,t){return t+30+j(e,t+26)+j(e,t+28)},Pe=function(e,t,n){var r=j(e,t+28),i=Me(e.subarray(t+46,t+46+r),!(j(e,t+8)&2048)),a=t+46+r,o=M(e,t+20),s=n&&o==4294967295?Fe(e,a):[o,M(e,t+24),M(e,t+42)],c=s[0],l=s[1],u=s[2];return[j(e,t+10),c,l,i,a+j(e,t+30)+j(e,t+32),u]},Fe=function(e,t){for(;j(e,t)!=1;t+=4+j(e,t+2));return[De(e,t+12),De(e,t+4),De(e,t+20)]},Ie=typeof queueMicrotask==`function`?queueMicrotask:typeof setTimeout==`function`?setTimeout:function(e){e()};function Le(e,t,n){n||(n=t,t={}),typeof n!=`function`&&k(7);var r=[],i=function(){for(var e=0;e<r.length;++e)r[e]()},a={},o=function(e,t){Ie(function(){n(e,t)})};Ie(function(){o=n});for(var s=e.length-22;M(e,s)!=101010256;--s)if(!s||e.length-s>65558)return o(k(13,0,1),null),i;var c=j(e,s+8);if(c){var l=c,u=M(e,s+16),d=u==4294967295||l==65535;if(d){var f=M(e,s-12);d=M(e,f)==101075792,d&&(l=c=M(e,f+32),u=M(e,f+48))}for(var p=t&&t.filter,m=function(t){var n=Pe(e,u,d),s=n[0],l=n[1],f=n[2],m=n[3],h=n[4],g=n[5],_=Ne(e,g);u=h;var v=function(e,t){e?(i(),o(e,null)):(t&&(a[m]=t),--c||o(null,a))};if(!p||p({name:m,size:l,originalSize:f,compression:s})){if(!s)v(null,he(e,_,_+l));else if(s==8){var y=e.subarray(_,_+l);if(l<32e4)try{v(null,ke(y,{out:new b(f)}))}catch(e){v(e,null)}else r.push(Oe(y,{size:f},v))}else v(k(14,`unknown compression type `+s,1),null)}else v(null,null)},h=0;h<l;++h)m(h)}else o(null,{});return i}function Re(e){return(Array.isArray(e)?e:e.issues).reduce((e,t)=>{if(t.path){let n=t.path.map(({key:e})=>e).join(`.`);e.nested[n]=[...e.nested[n]||[],t.message]}else e.root=[...e.root||[],t.message];return e},{nested:{}})}var ze=class extends Error{issues;constructor(e){super(e[0].message),this.name=`ValiError`,this.issues=e}};function Be(e,t){return{reason:e?.reason,validation:t.validation,origin:e?.origin||`value`,message:t.message,input:t.input,abortEarly:e?.abortEarly,abortPipeEarly:e?.abortPipeEarly}}function Ve(e,t){return{reason:t,origin:e?.origin,abortEarly:e?.abortEarly,abortPipeEarly:e?.abortPipeEarly}}function N(e,t,n,r){if(!t||!t.length)return{output:e};let i,a,o=e;for(let e of t){let t=e(o);if(t.issue){i||=Ve(n,r);let e=Be(i,t.issue);if(a?a.push(e):a=[e],i.abortEarly||i.abortPipeEarly)break}else o=t.output}return a?{issues:a}:{output:o}}function P(e,t){return!e||typeof e==`string`?[e,t]:[void 0,e]}function F(e,t,n,r,i,a){return{issues:[{reason:t,validation:n,origin:e?.origin||`value`,message:r,input:i,issues:a,abortEarly:e?.abortEarly,abortPipeEarly:e?.abortPipeEarly}]}}function He(e=[]){return{schema:`any`,async:!1,_parse(t,n){return N(t,e,n,`any`)}}}function Ue(e,t,n){let[r,i]=P(t,n);return{schema:`array`,array:{item:e},async:!1,_parse(t,n){if(!Array.isArray(t))return F(n,`type`,`array`,r||`Invalid type`,t);let a,o=[];for(let r=0;r<t.length;r++){let i=t[r],s=e._parse(i,n);if(s.issues){let e={schema:`array`,input:t,key:r,value:i};for(let t of s.issues)t.path?t.path.unshift(e):t.path=[e],a?.push(t);if(a||=s.issues,n!=null&&n.abortEarly)break}else o.push(s.output)}return a?{issues:a}:N(o,i,n,`array`)}}}function We(e,t){let[n,r]=P(e,t);return{schema:`boolean`,async:!1,_parse(e,t){return typeof e==`boolean`?N(e,r,t,`boolean`):F(t,`type`,`boolean`,n||`Invalid type`,e)}}}function Ge(e,t){return{schema:`literal`,literal:e,async:!1,_parse(n,r){return n===e?{output:n}:F(r,`type`,`literal`,t||`Invalid type`,n)}}}function Ke(e,t){return{schema:`native_enum`,nativeEnum:e,async:!1,_parse(n,r){return Object.values(e).includes(n)?{output:n}:F(r,`type`,`native_enum`,t||`Invalid type`,n)}}}function I(e,t){let[n,r]=P(e,t);return{schema:`number`,async:!1,_parse(e,t){return typeof e==`number`?N(e,r,t,`number`):F(t,`type`,`number`,n||`Invalid type`,e)}}}function L(e,t,n){let[r,i]=P(t,n),a;return{schema:`object`,object:e,async:!1,_parse(t,n){if(!t||typeof t!=`object`)return F(n,`type`,`object`,r||`Invalid type`,t);a||=Object.entries(e);let o,s={};for(let[e,r]of a){let i=t[e],a=r._parse(i,n);if(a.issues){let r={schema:`object`,input:t,key:e,value:i};for(let e of a.issues)e.path?e.path.unshift(r):e.path=[r],o?.push(e);if(o||=a.issues,n!=null&&n.abortEarly)break}else s[e]=a.output}return o?{issues:o}:N(s,i,n,`object`)}}}function R(e){return{schema:`optional`,wrapped:e,async:!1,_parse(t,n){return t===void 0?{output:t}:e._parse(t,n)}}}function z(e,t){let[n,r]=P(e,t);return{schema:`string`,async:!1,_parse(e,t){return typeof e==`string`?N(e,r,t,`string`):F(t,`type`,`string`,n||`Invalid type`,e)}}}function qe(e,t,n,r){if(typeof t==`object`&&!Array.isArray(t)){let[i,a]=P(n,r);return[e,t,i,a]}let[i,a]=P(t,n);return[z(),e,i,a]}var Je=[`__proto__`,`prototype`,`constructor`];function Ye(e,t,n,r){let[i,a,o,s]=qe(e,t,n,r);return{schema:`record`,record:{key:i,value:a},async:!1,_parse(e,t){if(!e||typeof e!=`object`)return F(t,`type`,`record`,o||`Invalid type`,e);let n,r={};for(let[o,s]of Object.entries(e))if(!Je.includes(o)){let c,l=i._parse(o,{origin:`key`,abortEarly:t?.abortEarly,abortPipeEarly:t?.abortPipeEarly});if(l.issues){c={schema:`record`,input:e,key:o,value:s};for(let e of l.issues)e.path=[c],n?.push(e);if(n||=l.issues,t!=null&&t.abortEarly)break}let u=a._parse(s,t);if(u.issues){c||={schema:`record`,input:e,key:o,value:s};for(let e of u.issues)e.path?e.path.unshift(c):e.path=[c],n?.push(e);if(n||=u.issues,t!=null&&t.abortEarly)break}!l.issues&&!u.issues&&(r[l.output]=u.output)}return n?{issues:n}:N(r,s,t,`record`)}}}function Xe(e,t,n){if(typeof e==`object`&&!Array.isArray(e)){let[r,i]=P(t,n);return[e,r,i]}let[r,i]=P(e,t);return[void 0,r,i]}function Ze(e,t,n,r){let[i,a,o]=Xe(t,n,r);return{schema:`tuple`,tuple:{items:e,rest:i},async:!1,_parse(t,n){if(!Array.isArray(t)||!i&&e.length!==t.length||i&&e.length>t.length)return F(n,`type`,`tuple`,a||`Invalid type`,t);let r,s=[];for(let i=0;i<e.length;i++){let a=t[i],o=e[i]._parse(a,n);if(o.issues){let e={schema:`tuple`,input:t,key:i,value:a};for(let t of o.issues)t.path?t.path.unshift(e):t.path=[e],r?.push(t);if(r||=o.issues,n!=null&&n.abortEarly)break}else s[i]=o.output}if(i)for(let a=e.length;a<t.length;a++){let e=t[a],o=i._parse(e,n);if(o.issues){let i={schema:`tuple`,input:t,key:a,value:e};for(let e of o.issues)e.path?e.path.unshift(i):e.path=[i],r?.push(e);if(r||=o.issues,n!=null&&n.abortEarly)break}else s[a]=o.output}return r?{issues:r}:N(s,o,n,`tuple`)}}}function Qe(e,t){return{schema:`union`,union:e,async:!1,_parse(n,r){let i,a;for(let t of e){let e=t._parse(n,r);if(e.issues){if(i)for(let t of e.issues)i.push(t);else i=e.issues}else{a=[e.output];break}}return a?{output:a[0]}:F(r,`type`,`union`,t||`Invalid type`,n,i)}}}function $e(e,t,n){let[r,i]=P(t,n);return L(e.reduce((e,t)=>({...e,...t.object}),{}),r,i)}function et(e,t,n,r){let[i,a]=P(n,r);return L(Object.entries(e.object).reduce((e,[n,r])=>t.includes(n)?e:{...e,[n]:r},{}),i,a)}function tt(e,t,n){let r=e._parse(t,n);return r.issues?{success:!1,error:new ze(r.issues),issues:r.issues}:{success:!0,data:r.output,output:r.output}}function nt(e,t){return n=>n>e?{issue:{validation:`max_value`,message:t||`Invalid value`,input:n}}:{output:n}}function rt(e,t){return n=>n<e?{issue:{validation:`min_value`,message:t||`Invalid value`,input:n}}:{output:n}}var it=Object.create,at=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,st=Object.getOwnPropertyNames,ct=Object.getPrototypeOf,lt=Object.prototype.hasOwnProperty,ut=(e,t,n)=>t in e?at(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,dt=(e,t)=>function(){return t||(0,e[st(e)[0]])((t={exports:{}}).exports,t),t.exports},ft=(e,t,n,r)=>{if(t&&typeof t==`object`||typeof t==`function`)for(let i of st(t))!lt.call(e,i)&&i!==n&&at(e,i,{get:()=>t[i],enumerable:!(r=ot(t,i))||r.enumerable});return e},pt=(e,t,n)=>(n=e==null?{}:it(ct(e)),ft(t||!e||!e.__esModule?at(n,`default`,{value:e,enumerable:!0}):n,e)),mt=(e,t,n)=>(ut(e,typeof t==`symbol`?t:t+``,n),n),ht=dt({"../../node_modules/.pnpm/@rgba-image+copy@0.1.3/node_modules/@rgba-image/copy/dist/index.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.copy=void 0,e.copy=(e,t,n=0,r=0,i=e.width-n,a=e.height-r,o=0,s=0)=>{if(n|=0,r|=0,i|=0,a|=0,o|=0,s|=0,i<=0||a<=0)return;let c=new Uint32Array(e.data.buffer),l=new Uint32Array(t.data.buffer);for(let u=0;u<a;u++){let a=r+u;if(a<0||a>=e.height)continue;let d=s+u;if(!(d<0||d>=t.height))for(let r=0;r<i;r++){let i=n+r;if(i<0||i>=e.width)continue;let s=o+r;if(s<0||s>=t.width)continue;let u=a*e.width+i,f=d*t.width+s;l[f]=c[u]}}}}}),gt=dt({"../../node_modules/.pnpm/@rgba-image+create-image@0.1.1/node_modules/@rgba-image/create-image/dist/index.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.CreateImageFactory=(e=[0,0,0,0],t=4)=>{if(t=Math.floor(t),isNaN(t)||t<1)throw TypeError(`channels should be a positive non-zero number`);if(!(`length`in e)||e.length<t)throw TypeError(`fill should be iterable with at least ${t} members`);e=new Uint8ClampedArray(e).slice(0,t);let n=e.every(e=>e===0);return(r,i,a)=>{if(r===void 0||i===void 0)throw TypeError(`Not enough arguments`);if(r=Math.floor(r),i=Math.floor(i),isNaN(r)||r<1||isNaN(i)||i<1)throw TypeError(`Index or size is negative or greater than the allowed amount`);let o=r*i*t;if(a===void 0&&(a=new Uint8ClampedArray(o)),a instanceof Uint8ClampedArray){if(a.length!==o)throw TypeError(`Index or size is negative or greater than the allowed amount`);if(!n)for(let n=0;n<i;n++)for(let i=0;i<r;i++){let o=(n*r+i)*t;for(let n=0;n<t;n++)a[o+n]=e[n]}return{get width(){return r},get height(){return i},get data(){return a}}}throw TypeError(`Expected data to be Uint8ClampedArray or undefined`)}},e.createImage=e.CreateImageFactory()}}),_t=dt({"../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/filters.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.filters=void 0;var t=14,n=(e,t)=>{if(e<=-t||e>=t||e==0)return 0;let n=e*Math.PI;return Math.sin(n)/n*Math.sin(n/t)/(n/t)},r=e=>Math.round(e*((1<<t)-1));e.filters=(e,t,i,a,o)=>{let s=o?2:3,c=1/i,l=Math.min(1,i),u=s/l,d=Math.floor((u+1)*2),f=new Int16Array((d+2)*t),p=0;for(let i=0;i<t;i++){let o=(i+.5)*c+a,d=Math.max(0,Math.floor(o-u)),m=Math.min(e-1,Math.ceil(o+u)),h=m-d+1,g=new Float32Array(h),_=new Int16Array(h),v=0,y=0;for(let e=d;e<=m;e++){let t=n((e+.5-o)*l,s);v+=t,g[y]=t,y++}let ee=0;for(let e=0;e<g.length;e++){let t=g[e]/v;ee+=t,_[e]=r(t)}_[t>>1]+=r(1-ee);let b=0;for(;b<_.length&&_[b]===0;)b++;let x=_.length-1;for(;x>0&&_[x]===0;)x--;let S=d+b,te=x-b+1;f[p++]=S,f[p++]=te,f.set(_.subarray(b,x+1),p),p+=te}return f}}}),vt=dt({"../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/convolve.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.convolve=void 0;var t=14;e.convolve=(e,n,r,i,a,o)=>{let s=0,c=0;for(let l=0;l<i;l++){let u=0;for(let r=0;r<a;r++){let r=o[u++],a=s+r*4|0,l=0,d=0,f=0,p=0;for(let t=o[u++];t>0;t--){let t=o[u++];l=l+t*e[a]|0,d=d+t*e[a+1]|0,f=f+t*e[a+2]|0,p=p+t*e[a+3]|0,a=a+4|0}n[c]=l+8192>>t,n[c+1]=d+8192>>t,n[c+2]=f+8192>>t,n[c+3]=p+8192>>t,c=c+i*4|0}c=(l+1)*4|0,s=(l+1)*r*4|0}}}}),yt=dt({"../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/index.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.lanczos2=e.lanczos=void 0;var t=ht(),n=gt(),r=_t(),i=vt(),a=(e,t,n=!1)=>{let a=t.width/e.width,o=t.height/e.height,s=r.filters(e.width,t.width,a,0,n),c=r.filters(e.height,t.height,o,0,n),l=new Uint8ClampedArray(t.width*e.height*4);i.convolve(e.data,l,e.width,e.height,t.width,s),i.convolve(l,t.data,e.height,t.width,t.height,c)};e.lanczos=(e,r,i=0,o=0,s=e.width-i,c=e.height-o,l=0,u=0,d=r.width-l,f=r.height-u)=>{if(i|=0,o|=0,s|=0,c|=0,l|=0,u|=0,d|=0,f|=0,s<=0||c<=0||d<=0||f<=0)return;if(i===0&&o===0&&s===e.width&&c===e.height&&l===0&&u===0&&d===r.width&&f===r.height){a(e,r);return}let p=n.createImage(s,c),m=n.createImage(d,f);t.copy(e,p,i,o),a(p,m),t.copy(m,r,0,0,m.width,m.height,l,u)},e.lanczos2=(e,r,i=0,o=0,s=e.width-i,c=e.height-o,l=0,u=0,d=r.width-l,f=r.height-u)=>{if(i|=0,o|=0,s|=0,c|=0,l|=0,u|=0,d|=0,f|=0,s<=0||c<=0||d<=0||f<=0)return;if(i===0&&o===0&&s===e.width&&c===e.height&&l===0&&u===0&&d===r.width&&f===r.height){a(e,r,!0);return}let p=n.createImage(s,c),m=n.createImage(d,f);t.copy(e,p,i,o),a(p,m,!0),t.copy(m,r,0,0,m.width,m.height,l,u)}}}),bt=(e=>(e.Bounce=`bounce`,e.Normal=`normal`,e))(bt||{}),xt=Ke(bt),St=L({autoplay:R(We()),defaultTheme:R(z()),direction:R(Qe([Ge(1),Ge(-1)])),hover:R(We()),id:z(),intermission:R(I()),loop:R(Qe([We(),I()])),playMode:R(xt),speed:R(I()),themeColor:R(z())}),Ct=L({animations:Ue(z()),id:z()}),wt=L({activeAnimationId:R(z()),animations:Ue(St),author:R(z()),custom:R(Ye(z(),He())),description:R(z()),generator:R(z()),keywords:R(z()),revision:R(I()),themes:R(Ue(Ct)),states:R(Ue(z())),version:R(z())}),Tt=et(St,[`id`]),B=L({state:z()}),Et=B,Dt=$e([B,L({ms:I()})]),Ot=$e([B,L({count:I()})]),kt=B,At=B,jt=B,Mt=$e([B,L({threshold:R(Ue(I([rt(0),nt(1)])))})]),Nt=L({onAfter:R(Dt),onClick:R(Et),onComplete:R(jt),onEnter:R(Ot),onMouseEnter:R(kt),onMouseLeave:R(At),onShow:R(Mt)}),Pt=$e([Tt,L({playOnScroll:R(Ze([I([rt(0),nt(1)]),I([rt(0),nt(1)])])),segments:R(Qe([Ze([I(),I()]),z()]))})]);$e([Nt,L({animationId:R(z()),playbackSettings:Pt})]);var Ft={jpeg:`image/jpeg`,png:`image/png`,gif:`image/gif`,bmp:`image/bmp`,svg:`image/svg+xml`,webp:`image/webp`,mpeg:`audio/mpeg`,mp3:`audio/mp3`},It={jpeg:[255,216,255],png:[137,80,78,71,13,10,26,10],gif:[71,73,70],bmp:[66,77],webp:[82,73,70,70,87,69,66,80],svg:[60,63,120],mp3:[73,68,51,3,0,0,0,0],mpeg:[73,68,51,3,0,0,0,0]},Lt=e=>{let t=null,n=[];if(!e)return null;let r=e.substring(e.indexOf(`,`)+1);t=typeof window>`u`?Buffer.from(r,`base64`).toString(`binary`):atob(r);let i=new Uint8Array(t.length);for(let e=0;e<t.length;e+=1)i[e]=t.charCodeAt(e);n=Array.from(i.subarray(0,8));for(let e in It){let t=It[e];if(t&&n.every((e,n)=>e===t[n]))return Ft[e]}return null},Rt=class extends Error{constructor(e,t){super(e),mt(this,`code`),this.name=`[dotlottie-js]`,this.code=t}};function zt(e){let t;if(typeof window>`u`)t=Buffer.from(e).toString(`base64`);else{let n=Array.prototype.map.call(e,e=>String.fromCharCode(e)).join(``);t=window.btoa(n)}return`data:${Lt(t)};base64,${t}`}function Bt(e){return`w`in e&&`h`in e&&!(`xt`in e)&&`p`in e}function Vt(e){return!(`h`in e)&&!(`w`in e)&&`p`in e&&`e`in e&&`u`in e&&`id`in e}async function Ht(e,t=()=>!0){if(!(e instanceof Uint8Array))throw new Rt(`DotLottie not found`,`INVALID_DOTLOTTIE`);return await new Promise((n,r)=>{Le(e,{filter:t},(e,t)=>{e&&r(e),n(t)})})}async function Ut(e,t,n){if(!(e instanceof Uint8Array))throw new Rt(`DotLottie not found`,`INVALID_DOTLOTTIE`);return(await Ht(e,e=>e.name===t&&(!n||n(e))))[t]}async function Wt(e){let t=`manifest.json`,n=(await Ht(e,e=>e.name===t))[t];if(typeof n<`u`)return JSON.parse(Me(n,!1))}async function Gt(e){if(!(e instanceof Uint8Array))return{success:!1,error:`DotLottie not found`};let t=await Wt(e);if(typeof t>`u`)return{success:!1,error:`Invalid .lottie file, manifest.json is missing`};let n=tt(wt,t);return n.success?{success:!0}:{success:!1,error:`Invalid .lottie file, manifest.json structure is invalid, ${JSON.stringify(Re(n.error).nested,null,2)}`}}async function Kt(e){let t=new Uint8Array(e),n=await Gt(t);if(n.error)throw new Rt(n.error,`INVALID_DOTLOTTIE`);return t}async function qt(e,t){let n=await Ht(e,e=>{let n=e.name.replace(`audio/`,``);return e.name.startsWith(`audio/`)&&(!t||t({...e,name:n}))}),r={};for(let e in n){let t=n[e];if(t instanceof Uint8Array){let n=e.replace(`audio/`,``);r[n]=zt(t)}}return r}async function Jt(e,t){var n;let r=new Map;for(let[e,i]of Object.entries(t))for(let t of i.assets||[])if(Vt(t)){let i=t.p;r.has(i)||r.set(i,new Set),(n=r.get(i))==null||n.add(e)}let i=await qt(e,e=>r.has(e.name));for(let[e,n]of r){let r=i[e];if(r)for(let i of n){let n=t[i];for(let t of n?.assets||[])Vt(t)&&t.p===e&&(t.p=r,t.u=``,t.e=1)}}}async function Yt(e,t){let n=await Ht(e,e=>{let n=e.name.replace(`images/`,``);return e.name.startsWith(`images/`)&&(!t||t({...e,name:n}))}),r={};for(let e in n){let t=n[e];if(t instanceof Uint8Array){let n=e.replace(`images/`,``);r[n]=zt(t)}}return r}async function Xt(e,t){var n;let r=new Map;for(let[e,i]of Object.entries(t))for(let t of i.assets||[])if(Bt(t)){let i=t.p;r.has(i)||r.set(i,new Set),(n=r.get(i))==null||n.add(e)}let i=await Yt(e,e=>r.has(e.name));for(let[e,n]of r){let r=i[e];if(r)for(let i of n){let n=t[i];for(let t of n?.assets||[])Bt(t)&&t.p===e&&(t.p=r,t.u=``,t.e=1)}}}async function Zt(e,t,{inlineAssets:n}={},r){let i=await Ut(e,`animations/${t}.json`,r);if(typeof i>`u`)return;let a=JSON.parse(Me(i,!1));if(!n)return a;let o={[t]:a};return await Xt(e,o),await Jt(e,o),a}async function Qt(e,t,n){let r=await Ut(e,`themes/${t}.json`,n);if(typeof r<`u`)return JSON.parse(Me(r,!1))}async function $t(e,t){let n={},r=await Ht(e,e=>{let n=e.name.replace(`states/`,``).replace(`.json`,``);return e.name.startsWith(`states/`)&&(!t||t({...e,name:n}))});for(let e in r){let t=r[e];if(t instanceof Uint8Array){let r=e.replace(`states/`,``).replace(`.json`,``);n[r]=Me(t,!1)}}return n}async function en(e,t,n){let r=await Ut(e,`states/${t}.json`,n);return typeof r>`u`?void 0:JSON.parse(Me(r,!1))}pt(yt());function V(e,t=`dotLottie-common`){return Error(`[${t}]: ${e}`)}function H(e,t=`dotLottie-common`,...n){console.error(`[${t}]:`,e,...n)}function U(e,t=`dotLottie-common`,...n){console.warn(`[${t}]:`,e,...n)}function tn(e=``){let t=e.trim(),n=t.lastIndexOf(`/`),r=t.substring(n+1),i=r.indexOf(`.`);return i===-1?r:r.substring(0,i)}function nn(e){return[`v`,`ip`,`op`,`layers`,`fr`,`w`,`h`].every(t=>Object.prototype.hasOwnProperty.call(e,t))}function rn(e){let t=e.assets;return t?t.some(e=>Vt(e)):!1}function an(e){try{return nn(JSON.parse(e))}catch{return!1}}function on(e,t){let n=Object.keys(e).find(n=>e[n]===t);if(n===void 0)throw Error(`Value not found in the object.`);return n}function sn(e){return JSON.parse(JSON.stringify(e))}var cn=class{_dotLottie;_animationsMap=new Map;_themeMap=new Map;_stateMachinesMap=new Map;_manifest;get dotLottie(){return this._dotLottie}get animationsMap(){return this._animationsMap}get themeMap(){return this._themeMap}get stateMachinesMap(){return this._stateMachinesMap}get manifest(){return this._manifest}async loadFromUrl(e){let t=await fetch(e,{method:`GET`,mode:`cors`});if(!t.ok)throw Error(`Failed to load dotLottie from ${e} with status ${t.status}`);let n=t.headers.get(`content-type`);if(n!=null&&n.includes(`application/json`)){let n=await t.json();if(!nn(n))throw Error(`Invalid lottie JSON at ${e}`);let r=tn(e);this._animationsMap.set(r,n);let i={activeAnimationId:r,animations:[{id:r}]};this._manifest=i}else{this._dotLottie=await Kt(await t.arrayBuffer());let e=await Wt(this._dotLottie);if(!e)throw Error(`Manifest not found`);this._manifest=e}}loadFromLottieJSON(e){if(!nn(e))throw Error(`Invalid lottie JSON`);let t=`my-animation`;this._animationsMap.set(t,e);let n={activeAnimationId:t,animations:[{id:t}]};this._manifest=n}async loadFromArrayBuffer(e){this._dotLottie=await Kt(e);let t=await Wt(this._dotLottie);if(!t)throw Error(`Manifest not found`);this._manifest=t}async getAnimation(e){if(this._animationsMap.get(e))return this._animationsMap.get(e);if(!this._dotLottie)return;let t=await Zt(this._dotLottie,e,{inlineAssets:!0});return t&&this._animationsMap.set(e,t),t}async getTheme(e){if(this._themeMap.get(e))return this._themeMap.get(e);if(!this._dotLottie)return;let t=await Qt(this._dotLottie,e);return t&&this._themeMap.set(e,t),t}async getStateMachines(){if(!this._dotLottie)return;let e=await $t(this._dotLottie);for(let t in e)if(t){let n=e[t];if(n){let e=JSON.parse(n);if(e){let t=e.descriptor.id;this._stateMachinesMap.get(t)||this._stateMachinesMap.set(t,e)}}}return Array.from(this._stateMachinesMap.values())}async getStateMachine(e){if(this._stateMachinesMap.get(e))return this._stateMachinesMap.get(e);if(!this._dotLottie)return;let t=await en(this._dotLottie,e);return t&&this._stateMachinesMap.set(t.descriptor.id,t),t}};function ln(){throw Error(`Cycle detected`)}function un(){if(fn>1)fn--;else{for(var e,t=!1;dn!==void 0;){var n=dn;for(dn=void 0,pn++;n!==void 0;){var r=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&_n(n))try{n.c()}catch(n){t||=(e=n,!0)}n=r}}if(pn=0,fn--,t)throw e}}var W=void 0,dn=void 0,fn=0,pn=0,mn=0;function hn(e){if(W!==void 0){var t=e.n;if(t===void 0||t.t!==W)return t={i:0,S:e,p:W.s,n:void 0,t:W,e:void 0,x:void 0,r:t},W.s!==void 0&&(W.s.n=t),W.s=t,e.n=t,32&W.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=W.s,t.n=void 0,W.s.n=t,W.s=t),t}}function G(e){this.v=e,this.i=0,this.n=void 0,this.t=void 0}G.prototype.h=function(){return!0},G.prototype.S=function(e){this.t!==e&&e.e===void 0&&(e.x=this.t,this.t!==void 0&&(this.t.e=e),this.t=e)},G.prototype.U=function(e){if(this.t!==void 0){var t=e.e,n=e.x;t!==void 0&&(t.x=n,e.e=void 0),n!==void 0&&(n.e=t,e.x=void 0),e===this.t&&(this.t=n)}},G.prototype.subscribe=function(e){var t=this;return wn(function(){var n=t.value,r=32&this.f;this.f&=-33;try{e(n)}finally{this.f|=r}})},G.prototype.valueOf=function(){return this.value},G.prototype.toString=function(){return this.value+``},G.prototype.toJSON=function(){return this.value},G.prototype.peek=function(){return this.v},Object.defineProperty(G.prototype,"value",{get:function(){var e=hn(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(W instanceof K&&function(){throw Error(`Computed cannot have side-effects`)}(),e!==this.v){pn>100&&ln(),this.v=e,this.i++,mn++,fn++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{un()}}}});function gn(e){return new G(e)}function _n(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function vn(e){for(var t=e.s;t!==void 0;t=t.n){var n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function yn(e){for(var t=e.s,n=void 0;t!==void 0;){var r=t.p;t.i===-1?(t.S.U(t),r!==void 0&&(r.n=t.n),t.n!==void 0&&(t.n.p=r)):n=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=r}e.s=n}function K(e){G.call(this,void 0),this.x=e,this.s=void 0,this.g=mn-1,this.f=4}(K.prototype=new G).h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===mn))return!0;if(this.g=mn,this.f|=1,this.i>0&&!_n(this))return this.f&=-2,!0;var e=W;try{vn(this),W=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return W=e,yn(this),this.f&=-2,!0},K.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}G.prototype.S.call(this,e)},K.prototype.U=function(e){if(this.t!==void 0&&(G.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}},K.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}},K.prototype.peek=function(){if(this.h()||ln(),16&this.f)throw this.v;return this.v},Object.defineProperty(K.prototype,"value",{get:function(){1&this.f&&ln();var e=hn(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function bn(e){var t=e.u;if(e.u=void 0,typeof t==`function`){fn++;var n=W;W=void 0;try{t()}catch(t){throw e.f&=-2,e.f|=8,xn(e),t}finally{W=n,un()}}}function xn(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,bn(e)}function Sn(e){if(W!==this)throw Error(`Out-of-order effect`);yn(this),W=e,this.f&=-2,8&this.f&&xn(this),un()}function Cn(e){this.x=e,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32}Cn.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t==`function`&&(this.u=t)}finally{e()}},Cn.prototype.S=function(){1&this.f&&ln(),this.f|=1,this.f&=-9,bn(this),vn(this),fn++;var e=W;return W=this,Sn.bind(this,e)},Cn.prototype.N=function(){2&this.f||(this.f|=2,this.o=dn,dn=this)},Cn.prototype.d=function(){this.f|=8,1&this.f||xn(this)};function wn(e){var t=new Cn(e);try{t.c()}catch(e){throw t.d(),e}return t.d.bind(t)}var Tn=class{_state;_prevState;constructor(e){this._prevState=e,this._state=gn(e)}setState(e){this._prevState=this._state.value,this._state.value=e}subscribe(e){return this._state.subscribe(t=>e(t,this._prevState))}};async function En(e,t){let[{DotLottieStateMachineManager:n}]=await Promise.all([d(()=>import(`./DDuw-iQl.js`),[],import.meta.url)]);if(!e.length)throw V(`No state machines available inside this .lottie!`);return new n(e,t)}var Dn={name:`@dotlottie/common`,version:`0.7.11`,type:`module`,description:``,author:`Afsal <afsal@lottiefiles.com>, Sam Osborne <sam@lottiefiles.com>`,license:`MIT`,engines:{node:`>18.0.0`},module:`dist/index.js`,main:`dist/index.js`,types:`dist/index.d.ts`,files:[`dist`],keywords:[],scripts:{build:`tsup`,dev:`tsup --watch`,lint:`eslint .`,"type-check":`tsc --noEmit`},dependencies:{"@dotlottie/dotlottie-js":`^0.7.0`,"@preact/signals-core":`^1.2.3`,howler:`^2.2.3`,"lottie-web":`^5.12.2`,xstate:`^4.38.1`},devDependencies:{"@lottiefiles/lottie-types":`^1.2.0`,"@types/howler":`^2.2.8`,tsup:`^7.2.0`,typescript:`^4.7.4`},publishConfig:{access:`public`}},q=(e=>(e.Complete=`complete`,e.DataFail=`data_fail`,e.DataReady=`data_ready`,e.Error=`error`,e.Frame=`frame`,e.Freeze=`freeze`,e.LoopComplete=`loopComplete`,e.Pause=`pause`,e.Play=`play`,e.Ready=`ready`,e.Stop=`stop`,e.VisibilityChange=`visibilityChange`,e))(q||{}),On=(e=>(e.Completed=`completed`,e.Error=`error`,e.Fetching=`fetching`,e.Frozen=`frozen`,e.Initial=`initial`,e.Loading=`loading`,e.Paused=`paused`,e.Playing=`playing`,e.Ready=`ready`,e.Stopped=`stopped`,e))(On||{}),kn=(e=>(e.Bounce=`bounce`,e.Normal=`normal`,e))(kn||{}),J={autoplay:!1,direction:1,hover:!1,intermission:0,loop:!1,playMode:`normal`,speed:1,defaultTheme:``},An={activeStateId:``,autoplay:!1,currentState:`initial`,frame:0,seeker:0,direction:1,hover:!1,loop:!1,playMode:`normal`,speed:1,background:`transparent`,intermission:0,currentAnimationId:void 0,visibilityPercentage:0},jn=class{_lottie;_src;_animationConfig;_prevUserPlaybackOptions={};_userPlaybackOptions;_hover=!1;_loop=!1;_counter=0;_intermission=0;_counterInterval=null;_container=null;_name;_mode=`normal`;_background=`transparent`;_animation;_defaultTheme;_activeAnimationId;_currentAnimationId;_testId;_listeners=new Map;_currentState=`initial`;_stateBeforeFreeze=`initial`;state=new Tn(An);_light=!1;_worker=!1;_dotLottieLoader=new cn;_activeStateId;_inInteractiveMode=!1;_scrollTicking=!1;_scrollCallback=void 0;_onShowIntersectionObserver=void 0;_visibilityPercentage=0;_audios=[];_stateMachineManager;constructor(e,t,n){this._src=typeof e==`string`?e:sn(e),n!=null&&n.testId&&(this._testId=n.testId),this._defaultTheme=n?.defaultTheme||``,this._userPlaybackOptions=this._validatePlaybackOptions(n||{}),typeof n?.activeAnimationId==`string`&&(this._activeAnimationId=n.activeAnimationId),this._container=t||null,typeof n?.background==`string`&&this.setBackground(n.background),typeof n?.activeStateId<`u`&&(this._activeStateId=n.activeStateId);let{rendererSettings:r,...i}=n||{};this._animationConfig={loop:!1,autoplay:!1,renderer:`svg`,rendererSettings:{clearCanvas:!0,progressiveLoad:!0,hideOnTransparent:!0,filterSize:{width:`200%`,height:`200%`,x:`-50%`,y:`-50%`},...r},...i},n!=null&&n.light&&(this._light=n.light),n!=null&&n.worker&&(this._worker=n.worker),this._listenToHover(),this._listenToVisibilityChange()}_listenToHover(){var e,t,n,r;let i=()=>{this._hover&&this.currentState!==`playing`&&this.play()},a=()=>{this._hover&&this.currentState===`playing`&&this.stop()};(e=this._container)==null||e.removeEventListener(`mouseenter`,i),(t=this._container)==null||t.removeEventListener(`mouseleave`,a),(n=this._container)==null||n.addEventListener(`mouseleave`,a),(r=this._container)==null||r.addEventListener(`mouseenter`,i)}_onVisibilityChange(){!this._lottie||typeof document>`u`||(document.hidden&&this.currentState===`playing`?this.freeze():this.currentState===`frozen`&&this.unfreeze())}_listenToVisibilityChange(){typeof document<`u`&&typeof document.hidden<`u`&&document.addEventListener(`visibilitychange`,()=>this._onVisibilityChange())}_getOption(e){if(typeof this._userPlaybackOptions[e]<`u`)return this._userPlaybackOptions[e];let t=this._dotLottieLoader.manifest?.animations.find(e=>e.id===this._currentAnimationId);return t&&typeof t[e]<`u`?t[e]:J[e]}_getPlaybackOptions(){let e={};for(let t in J)typeof J[t]<`u`&&(e[t]=this._getOption(t));return e}_setPlayerState(e){var t,n,r;let i=e(this._getPlaybackOptions());try{Tt._parse(i)}catch{U(`Invalid PlaybackOptions, ${JSON.stringify(i,null,2)}`);return}typeof i.defaultTheme<`u`&&(this._defaultTheme=i.defaultTheme),typeof i.playMode<`u`&&(this._mode=i.playMode),typeof i.intermission<`u`&&(this._intermission=i.intermission),typeof i.hover<`u`&&(this._hover=i.hover),typeof i.loop<`u`&&(this.clearCountTimer(),this._loop=i.loop,this._counter=0,(t=this._lottie)==null||t.setLoop(typeof i.loop==`number`||i.loop)),typeof i.speed<`u`&&((n=this._lottie)==null||n.setSpeed(i.speed)),typeof i.autoplay<`u`&&this._lottie&&(this._lottie.autoplay=i.autoplay),typeof i.direction<`u`&&((r=this._lottie)==null||r.setDirection(i.direction))}_getOptionsFromAnimation(e){let{id:t,...n}=e;return{...J,...n}}_updateTestData(){!this._testId||!this._lottie||(window.dotLottiePlayer||(window.dotLottiePlayer={[this._testId]:{}}),window.dotLottiePlayer[this._testId]={direction:this._lottie.playDirection,currentState:this._currentState,loop:this.loop,mode:this._mode,speed:this._lottie.playSpeed})}setContainer(e){e!==this._container&&(this._container=e,this.setBackground(this._background),this._listenToHover())}get currentState(){return this._currentState}clearCountTimer(){this._counterInterval&&clearInterval(this._counterInterval)}setCurrentState(e){this._currentState=e,this._notify(),this._updateTestData()}static isPathJSON(e){return e.split(`.`).pop()?.toLowerCase()===`json`}get src(){return this._src}updateSrc(e){this._src!==e&&(this._src=typeof e==`string`?e:sn(e),this._activeAnimationId=void 0,this._currentAnimationId=void 0,this.load())}get intermission(){return this._intermission}get hover(){return this._hover}setHover(e){typeof e==`boolean`&&(this._hover=e,this._userPlaybackOptions.hover=e,this._notify())}setIntermission(e){this._intermission=e,this._userPlaybackOptions.intermission=e,this._notify()}get mode(){return this._mode}get animations(){return this._dotLottieLoader.animationsMap}get themes(){return this._dotLottieLoader.themeMap}setMode(e){typeof e==`string`&&(this._mode=e,this._userPlaybackOptions.playMode=e,this._setPlayerState(()=>({playMode:e})),this._notify(),this._updateTestData())}get container(){if(this._container)return this._container}goToAndPlay(e,t,n){!this._lottie||[`loading`].includes(this._currentState)?U(`goToAndPlay() Can't use whilst loading.`):(this._lottie.goToAndPlay(e,t,n),this.setCurrentState(`playing`))}goToAndStop(e,t,n){!this._lottie||[`loading`].includes(this._currentState)?U(`goToAndStop() Can't use whilst loading.`):(this._lottie.goToAndStop(e,t,n),this.setCurrentState(`stopped`))}seek(e){if(!this._lottie||[`loading`].includes(this._currentState)){U(`seek() Can't use whilst loading.`);return}let t=e;typeof t==`number`&&(t=Math.round(t));let n=/^(\d+)(%?)$/u.exec(t.toString());if(!n)return;let r=n[2]===`%`?this.totalFrames*Number(n[1])/100:n[1];r!==void 0&&(this._lottie.goToAndPlay(r,!0),this.currentState===`playing`?this.play():this.currentState===`frozen`?this.freeze():this.pause())}_areNumbersInRange(e,t){return e>=0&&e<=1&&t>=0&&t<=1}_updatePosition(e,t,n){let[r,i]=e??[0,this.totalFrames-1],[a,o]=t??[0,1];if(!this._areNumbersInRange(a,o))H(`threshold values must be between 0 and 1`);else{if(this.container){let{height:e,top:t}=this.container.getBoundingClientRect(),s=(window.innerHeight-t)/(window.innerHeight+e),c=r+Math.round((s-a)/(o-a)*(i-r));n&&n(s),this.goToAndStop(c,!0),(c>=i||s>=o)&&this._handleAnimationComplete()}this._scrollTicking=!1}}_requestTick(e,t,n){this._scrollTicking||=(requestAnimationFrame(()=>this._updatePosition(e,t,n)),!0)}playOnScroll(e){this.stop(),this._scrollCallback&&this.stopPlayOnScroll(),this._scrollCallback=()=>this._requestTick(e?.segments,e?.threshold,e?.positionCallback),window.addEventListener(`scroll`,this._scrollCallback)}stopPlayOnScroll(){this._scrollCallback&&=(window.removeEventListener(`scroll`,this._scrollCallback),void 0)}stopPlayOnShow(){this._onShowIntersectionObserver&&=(this._onShowIntersectionObserver.disconnect(),void 0)}addIntersectionObserver(e){if(!this.container)throw V(`Can't play on show, player container element not available.`);let t={root:null,rootMargin:`0px`,threshold:e!=null&&e.threshold?e.threshold:[0,1]},n=t=>{t.forEach(t=>{var n,r;this._visibilityPercentage=t.intersectionRatio*100,t.isIntersecting?(e!=null&&e.callbackOnIntersect&&e.callbackOnIntersect(this._visibilityPercentage),(n=this._container)==null||n.dispatchEvent(new Event(`visibilityChange`))):e!=null&&e.callbackOnIntersect&&(e.callbackOnIntersect(0),(r=this._container)==null||r.dispatchEvent(new Event(`visibilityChange`)))})};this._onShowIntersectionObserver=new IntersectionObserver(n,t),this._onShowIntersectionObserver.observe(this.container)}playOnShow(e){if(this.stop(),!this.container)throw V(`Can't play on show, player container element not available.`);this._onShowIntersectionObserver&&this.stopPlayOnShow(),this.addIntersectionObserver({threshold:e?.threshold??[],callbackOnIntersect:e=>{e===0?this.pause():this.play()}})}_validatePlaybackOptions(e){if(!e)return{};let t={};for(let[n,r]of Object.entries(e))switch(n){case`autoplay`:typeof r==`boolean`&&(t.autoplay=r);break;case`direction`:typeof r==`number`&&[1,-1].includes(r)&&(t.direction=r);break;case`loop`:(typeof r==`boolean`||typeof r==`number`)&&(t.loop=r);break;case`playMode`:typeof r==`string`&&[`normal`,`bounce`].includes(r)&&(t.playMode=r);break;case`speed`:typeof r==`number`&&(t.speed=r);break;case`themeColor`:typeof r==`string`&&(t.themeColor=r);break;case`hover`:typeof r==`boolean`&&(t.hover=r);break;case`intermission`:typeof r==`number`&&(t.intermission=r);break;case`defaultTheme`:typeof r==`string`&&(t.defaultTheme=r)}return this._requireValidPlaybackOptions(t),t}_requireAnimationsInTheManifest(){var e;if(!((e=this._dotLottieLoader.manifest)!=null&&e.animations.length))throw V(`No animations found in manifest.`)}_requireAnimationsToBeLoaded(){if(this._dotLottieLoader.animationsMap.size===0)throw V(`No animations have been loaded.`)}async play(e,t){if([`initial`,`loading`].includes(this._currentState))U(`Player unable to play whilst loading.`);else if(this._requireAnimationsInTheManifest(),this._requireAnimationsToBeLoaded(),this._lottie&&!e)this._lottie.playDirection===-1&&this._lottie.currentFrame===0?this._lottie.goToAndPlay(this._lottie.totalFrames,!0):this._lottie.play(),this.setCurrentState(`playing`);else{if(typeof e==`number`){let n=this._dotLottieLoader.manifest?.animations[e];if(!n)throw V(`animation not found.`);typeof t==`function`?await this.render({id:n.id,...t(this._getPlaybackOptions(),this._getOptionsFromAnimation(n))}):await this.render({id:n.id})}if(typeof e==`string`){let n=this._dotLottieLoader.manifest?.animations.find(t=>t.id===e);if(!n)throw V(`animation not found.`);typeof t==`function`?await this.render({id:n.id,...t(this._getPlaybackOptions(),this._getOptionsFromAnimation(n))}):await this.render({id:n.id})}}}playSegments(e,t){!this._lottie||[`loading`].includes(this._currentState)?U(`playSegments() Can't use whilst loading.`):(this._lottie.playSegments(e,t),this.setCurrentState(`playing`))}resetSegments(e){!this._lottie||[`loading`].includes(this._currentState)?U(`resetSegments() Can't use whilst loading.`):this._lottie.resetSegments(e)}togglePlay(){this.currentState===`playing`?this.pause():this.play()}_getAnimationByIdOrIndex(e){if(this._requireAnimationsInTheManifest(),this._requireAnimationsToBeLoaded(),typeof e==`number`){let t=this._dotLottieLoader.manifest?.animations[e];if(!t)throw V(`animation not found.`);return t}if(typeof e==`string`){let t=this._dotLottieLoader.manifest?.animations.find(t=>t.id===e);if(!t)throw V(`animation not found.`);return t}throw V(`first param must be a number or string`)}get activeAnimationId(){return this._getActiveAnimationId()}get currentAnimationId(){return this._currentAnimationId}get activeStateId(){return this._activeStateId}async _startInteractivity(e){if(!this._inInteractiveMode)H(`Can't start interactivity. Not in interactive mode. Call enterInteractiveMode(stateId: string) to start.`);else{if(this._dotLottieLoader.stateMachinesMap.size===0&&await this._dotLottieLoader.getStateMachines(),this._dotLottieLoader.stateMachinesMap.size===0)throw V(`No interactivity states are available.`);if(e===`undefined`)throw V(`stateId is not specified.`);this._stateMachineManager||=await En(Array.from(this._dotLottieLoader.stateMachinesMap.values()),this),this._stateMachineManager.start(e)}}enterInteractiveMode(e){var t;if(e)this._inInteractiveMode||(this._prevUserPlaybackOptions={...this._userPlaybackOptions}),this._inInteractiveMode&&((t=this._stateMachineManager)==null||t.stop()),this._activeStateId=e,this._inInteractiveMode=!0,this._startInteractivity(e);else throw V(`stateId must be a non-empty string.`)}exitInteractiveMode(){var e;this._inInteractiveMode&&(this._inInteractiveMode=!1,this._activeStateId=``,(e=this._stateMachineManager)==null||e.stop(),this._userPlaybackOptions={},this._userPlaybackOptions={...this._prevUserPlaybackOptions},this._prevUserPlaybackOptions={},this.reset())}reset(){let e=this._getActiveAnimationId(),t=this._dotLottieLoader.manifest?.animations.find(t=>t.id===e);if(this._inInteractiveMode&&this.exitInteractiveMode(),!t)throw V(`animation not found.`);this.play(e)}previous(e){if(!this._dotLottieLoader.manifest||!this._dotLottieLoader.manifest.animations.length)throw V(`manifest not found.`);if(this._inInteractiveMode){U(`previous() is not supported in interactive mode.`);return}let t=this._dotLottieLoader.manifest.animations.findIndex(e=>e.id===this._currentAnimationId);if(t===-1)throw V(`animation not found.`);let n=this._dotLottieLoader.manifest.animations[(t-1+this._dotLottieLoader.manifest.animations.length)%this._dotLottieLoader.manifest.animations.length];if(!n||!n.id)throw V(`animation not found.`);typeof e==`function`?this.render({id:n.id,...e(this._getPlaybackOptions(),this._getOptionsFromAnimation(n))}):this.render({id:n.id})}next(e){if(!this._dotLottieLoader.manifest||!this._dotLottieLoader.manifest.animations.length)throw V(`manifest not found.`);if(this._inInteractiveMode){U(`next() is not supported in interactive mode.`);return}let t=this._dotLottieLoader.manifest.animations.findIndex(e=>e.id===this._currentAnimationId);if(t===-1)throw V(`animation not found.`);let n=this._dotLottieLoader.manifest.animations[(t+1)%this._dotLottieLoader.manifest.animations.length];if(!n||!n.id)throw V(`animation not found.`);typeof e==`function`?this.render({id:n.id,...e(this._getPlaybackOptions(),this._getOptionsFromAnimation(n))}):this.render({id:n.id})}getManifest(){return this._dotLottieLoader.manifest}resize(){!this._lottie||[`loading`].includes(this._currentState)?U(`resize() Can't use whilst loading.`):this._lottie.resize()}stop(){!this._lottie||[`loading`].includes(this._currentState)?U(`stop() Can't use whilst loading.`):(this.clearCountTimer(),this._counter=0,this._setPlayerState(()=>({direction:this._getOption(`direction`)})),this._lottie.stop(),this.setCurrentState(`stopped`))}pause(){!this._lottie||[`loading`].includes(this._currentState)?U(`pause() Can't use whilst loading.`):(this.clearCountTimer(),this._lottie.pause(),this.setCurrentState(`paused`))}freeze(){!this._lottie||[`loading`].includes(this._currentState)?U(`freeze() Can't use whilst loading.`):(this.currentState!==`frozen`&&(this._stateBeforeFreeze=this.currentState),this._lottie.pause(),this.setCurrentState(`frozen`))}unfreeze(){!this._lottie||[`loading`].includes(this._currentState)?U(`unfreeze() Can't use whilst loading.`):this._stateBeforeFreeze===`playing`?this.play():this.pause()}destroy(){var e,t;(e=this._container)!=null&&e.__lottie&&(this._container.__lottie.destroy(),this._container.__lottie=null),this._audios.length&&(this._audios.forEach(e=>{e.unload()}),this._audios=[]),this.clearCountTimer(),typeof document<`u`&&document.removeEventListener(`visibilitychange`,()=>this._onVisibilityChange()),this._counter=0,(t=this._lottie)==null||t.destroy(),this._lottie=void 0}getAnimationInstance(){return this._lottie}static getLottieWebVersion(){return`${Dn.dependencies[`lottie-web`]}`}addEventListener(e,t){var n,r,i;this._listeners.has(e)||this._listeners.set(e,new Set),(n=this._listeners.get(e))==null||n.add(t);try{e===`complete`?(r=this._container)==null||r.addEventListener(e,t):(i=this._lottie)==null||i.addEventListener(e,t)}catch(e){H(`addEventListener ${e}`)}}getState(){return{autoplay:this._lottie?.autoplay??!1,currentState:this._currentState,frame:this._frame,visibilityPercentage:this._visibilityPercentage,seeker:this._seeker,direction:this._lottie?.playDirection??1,hover:this._hover,loop:this._loop||!1,playMode:this._mode,speed:this._lottie?.playSpeed??1,background:this._background,intermission:this._intermission,defaultTheme:this._defaultTheme,currentAnimationId:this._currentAnimationId,activeStateId:this._activeStateId??``}}_notify(){this.state.setState(this.getState())}get totalFrames(){return this._lottie?.totalFrames||0}get direction(){return this._lottie?this._lottie.playDirection:1}setDirection(e){this._requireValidDirection(e),this._setPlayerState(()=>({direction:e})),this._userPlaybackOptions.direction=e}get speed(){return this._lottie?.playSpeed||1}setSpeed(e){this._requireValidSpeed(e),this._setPlayerState(()=>({speed:e})),this._userPlaybackOptions.speed=e}get autoplay(){return this._lottie?.autoplay??!1}setAutoplay(e){this._requireValidAutoplay(e),!this._lottie||[`loading`].includes(this._currentState)?U(`setAutoplay() Can't use whilst loading.`):(this._setPlayerState(()=>({autoplay:e})),this._userPlaybackOptions.autoplay=e)}toggleAutoplay(){!this._lottie||[`loading`].includes(this._currentState)?U(`toggleAutoplay() Can't use whilst loading.`):this.setAutoplay(!this._lottie.autoplay)}get defaultTheme(){return this._defaultTheme}setDefaultTheme(e){this._setPlayerState(()=>({defaultTheme:e})),this._userPlaybackOptions.defaultTheme=e,this._animation&&this.render()}get loop(){return this._loop}setLoop(e){this._requireValidLoop(e),this._setPlayerState(()=>({loop:e})),this._userPlaybackOptions.loop=e}toggleLoop(){!this._lottie||[`loading`].includes(this._currentState)?U(`toggleLoop() Can't use whilst loading.`):this.setLoop(!this._loop)}get background(){return this._background}setBackground(e){this._requireValidBackground(e),this._background=e,this._container&&(this._container.style.backgroundColor=e)}get _frame(){return this._lottie?this.currentState===`completed`?this.direction===-1?0:this._lottie.totalFrames:this._lottie.currentFrame:0}get _seeker(){return this._lottie?this._frame/this._lottie.totalFrames*100:0}async revertToManifestValues(e){let t;t=!Array.isArray(e)||e.length===0?[`autoplay`,`defaultTheme`,`direction`,`hover`,`intermission`,`loop`,`playMode`,`speed`,`activeAnimationId`]:e;let n=!1;if(t.includes(`activeAnimationId`)){let e=this._dotLottieLoader.manifest?.activeAnimationId,t=this._getAnimationByIdOrIndex(e||0);this._activeAnimationId=e,await this._setCurrentAnimation(t.id),n=!0}t.forEach(e=>{switch(e){case`autoplay`:delete this._userPlaybackOptions.autoplay,this.setAutoplay(this._getOption(`autoplay`));break;case`defaultTheme`:delete this._userPlaybackOptions.defaultTheme,this.setDefaultTheme(this._getOption(`defaultTheme`));break;case`direction`:delete this._userPlaybackOptions.direction,this.setDirection(this._getOption(`direction`));break;case`hover`:delete this._userPlaybackOptions.hover,this.setHover(this._getOption(`hover`));break;case`intermission`:delete this._userPlaybackOptions.intermission,this.setIntermission(this._getOption(`intermission`));break;case`loop`:delete this._userPlaybackOptions.loop,this.setLoop(this._getOption(`loop`));break;case`playMode`:delete this._userPlaybackOptions.playMode,this.setMode(this._getOption(`playMode`)),this.setDirection(this._getOption(`direction`));break;case`speed`:delete this._userPlaybackOptions.speed,this.setSpeed(this._getOption(`speed`))}}),n&&this.render()}removeEventListener(e,t){var n,r,i;try{e===`complete`?(n=this._container)==null||n.removeEventListener(e,t):(r=this._lottie)==null||r.removeEventListener(e,t),(i=this._listeners.get(e))==null||i.delete(t)}catch(e){H(`removeEventListener`,e)}}_handleAnimationComplete(){var e;typeof this._loop==`number`&&this.stop();let t=this.direction===-1?0:this.totalFrames-1;this.goToAndStop(t,!0),this._counter=0,this.clearCountTimer(),this.setCurrentState(`completed`),(e=this._container)==null||e.dispatchEvent(new Event(`complete`))}addEventListeners(){var e;if(!this._lottie||[`loading`].includes(this._currentState))U(`addEventListeners() Can't use whilst loading.`);else{this._lottie.addEventListener(`enterFrame`,()=>{var e;this._lottie?(Math.floor(this._lottie.currentFrame)===0&&this.direction===-1&&((e=this._container)==null||e.dispatchEvent(new Event(`complete`)),this.loop||this.setCurrentState(`completed`)),this._notify()):U(`enterFrame event : Lottie is undefined.`)}),this._lottie.addEventListener(`loopComplete`,()=>{var e;if(!this._lottie){U(`loopComplete event : Lottie is undefined.`);return}(e=this._container)==null||e.dispatchEvent(new Event(`loopComplete`)),this.intermission>0&&this.pause();let t=this._lottie.playDirection;if(typeof this._loop==`number`&&this._loop>0&&(this._counter+=this._mode===`bounce`?.5:1,this._counter>=this._loop)){this._handleAnimationComplete();return}this._mode===`bounce`&&typeof t==`number`&&(t=Number(t)*-1);let n=t===-1?this._lottie.totalFrames-1:0;this.intermission?(this.goToAndPlay(n,!0),this.pause(),this._counterInterval=window.setTimeout(()=>{this._lottie&&(this._setPlayerState(()=>({direction:t})),this.goToAndPlay(n,!0))},this._intermission)):(this._setPlayerState(()=>({direction:t})),this.goToAndPlay(t===-1?this.totalFrames-1:0,!0))}),this._lottie.addEventListener(`complete`,()=>{if(this._lottie&&this._loop===!1&&this._mode===`bounce`){if(this._counter+=.5,this._counter>=1){this._handleAnimationComplete();return}this._counterInterval=window.setTimeout(()=>{if(!this._lottie)return;let e=this._lottie.playDirection;this._mode===`bounce`&&typeof e==`number`&&(e=Number(e)*-1);let t=e===-1?this.totalFrames-1:0;this._setPlayerState(()=>({direction:e})),this.goToAndPlay(t,!0)},this._intermission)}else this._handleAnimationComplete()});for(let[t,n]of this._listeners)if(t===`complete`)for(let r of n)(e=this._container)==null||e.addEventListener(t,r);else for(let e of n)this._lottie.addEventListener(t,e)}}async _setCurrentAnimation(e){this._currentState=`loading`;let t=await this._dotLottieLoader.getAnimation(e);this._currentAnimationId=e,this._animation=t,this._currentState=`ready`}async _getAudioFactory(){if(this._animation&&rn(this._animation)){let{DotLottieAudio:e}=await d(async()=>{let{DotLottieAudio:e}=await import(`./CpEgAJSJ.js`);return{DotLottieAudio:e}},__vite__mapDeps([0,1]),import.meta.url);return t=>{let n=new e({src:[t]});return this._audios.push(n),n}}return null}async render(e){if(e!=null&&e.id)await this._setCurrentAnimation(e.id);else if(!this._animation)throw V(`no animation selected`);let t=J.loop??!1,n=J.autoplay??!1,r=J.playMode??`normal`,i=J.intermission??0,a=J.hover??!1,o=J.direction??1,s=J.speed??1,c=J.defaultTheme??``;t=e?.loop??this._getOption(`loop`),n=e?.autoplay??this._getOption(`autoplay`),r=e?.playMode??this._getOption(`playMode`),i=e?.intermission??this._getOption(`intermission`),a=e?.hover??this._getOption(`hover`),o=e?.direction??this._getOption(`direction`),s=e?.speed??this._getOption(`speed`),c=e?.defaultTheme??this._getOption(`defaultTheme`);let l={...this._animationConfig,autoplay:!a&&n,loop:typeof t==`number`||t,renderer:this._worker?`svg`:this._animationConfig.renderer??`svg`},[u,d,f]=await Promise.all([this._dotLottieLoader.getTheme(c),this._getLottiePlayerInstance(),this._getAudioFactory()]);u&&this._animation?(this._animation=sn(this._animation),this._animation.slots=u):this._animation=await this._dotLottieLoader.getAnimation(this._currentAnimationId??``),this._activeStateId&&!this._inInteractiveMode?this.enterInteractiveMode(this._activeStateId):(this.destroy(),this._setPlayerState(()=>({defaultTheme:c,playMode:r,intermission:i,hover:a,loop:t})),this._lottie=f?d.loadAnimation({...l,container:this._container,animationData:this._animation,audioFactory:f}):d.loadAnimation({...l,container:this._container,animationData:this._animation}),typeof this._lottie.resetSegments>`u`&&(this._lottie.resetSegments=()=>{var e;(e=this._lottie)==null||e.playSegments([0,this._lottie.totalFrames],!0)}),this.addEventListeners(),this._container&&(this._container.__lottie=this._lottie),this._setPlayerState(()=>({direction:o,speed:s})),n&&!a&&(t===!1&&o===-1?this.play():this.setCurrentState(`playing`)),this._updateTestData())}async _getLottiePlayerInstance(){let e=this._animationConfig.renderer??`svg`,t;if(this._worker)return e!==`svg`&&U(`Worker is only supported with svg renderer. Change or remove renderer prop to get rid of this warning.`),t=await d(()=>import(`./gZiZlY3L.js`),__vite__mapDeps([2,1]),import.meta.url),t.default;switch(e){case`svg`:t=this._light?await d(()=>import(`./Cezxri0e.js`),__vite__mapDeps([3,1]),import.meta.url):await d(()=>import(`./CADqZNh7.js`),__vite__mapDeps([4,1]),import.meta.url);break;case`canvas`:t=this._light?await d(()=>import(`./CUU0L6v8.js`),__vite__mapDeps([5,1]),import.meta.url):await d(()=>import(`./CPI2FJtM.js`),__vite__mapDeps([6,1]),import.meta.url);break;case`html`:t=this._light?await d(()=>import(`./DDZkfQUt.js`),__vite__mapDeps([7,1]),import.meta.url):await d(()=>import(`./CSrxhd5Y.js`),__vite__mapDeps([8,1]),import.meta.url);break;default:throw Error(`Invalid renderer: ${e}`)}return t.default}_getActiveAnimationId(){let e=this._dotLottieLoader.manifest;return this._activeAnimationId??e?.activeAnimationId??e?.animations[0]?.id??void 0}async load(e){if(this._currentState===`loading`)U(`Loading in progress..`);else try{if(this.setCurrentState(`loading`),typeof this._src==`string`){if(an(this._src)){let e=JSON.parse(this._src);this._dotLottieLoader.loadFromLottieJSON(e)}else{let e=new URL(this._src,window.location.href);await this._dotLottieLoader.loadFromUrl(e.toString())}}else if(typeof this._src==`object`&&nn(this._src))this._dotLottieLoader.loadFromLottieJSON(this._src);else throw V(`Invalid src provided`);if(!this._dotLottieLoader.manifest)throw V(`No manifest found`);let t=this._getActiveAnimationId();if(!t)throw V(`No active animation found`);await this._setCurrentAnimation(t),await this.render(e)}catch(e){this.setCurrentState(`error`),e instanceof Error&&H(`Error loading animation: ${e.message}`)}}setErrorState(e){this.setCurrentState(`error`),H(e)}_requireValidDirection(e){if(e!==-1&&e!==1)throw V(`Direction can only be -1 (backwards) or 1 (forwards)`)}_requireValidIntermission(e){if(e<0||!Number.isInteger(e))throw V(`intermission must be a positive number`)}_requireValidLoop(e){if(typeof e==`number`&&(!Number.isInteger(e)||e<0))throw V(`loop must be a positive number or boolean`)}_requireValidSpeed(e){if(typeof e!=`number`)throw V(`speed must be a number`)}_requireValidBackground(e){if(typeof e!=`string`)throw V(`background must be a string`)}_requireValidAutoplay(e){if(typeof e!=`boolean`)throw V(`autoplay must be a boolean`)}_requireValidPlaybackOptions(e){e.direction&&this._requireValidDirection(e.direction),e.intermission&&this._requireValidIntermission(e.intermission),e.loop&&this._requireValidLoop(e.loop),e.speed&&this._requireValidSpeed(e.speed)}},Mn=window,Nn=Mn.ShadowRoot&&(Mn.ShadyCSS===void 0||Mn.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,Pn=Symbol(),Fn=new WeakMap,In=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==Pn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Nn&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=Fn.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Fn.set(t,e))}return e}toString(){return this.cssText}},Ln=e=>new In(typeof e==`string`?e:e+``,void 0,Pn),Rn=(e,...t)=>new In(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(e._$cssResult$===!0)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,Pn),zn=(e,t)=>{Nn?e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(t=>{let n=document.createElement(`style`),r=Mn.litNonce;r!==void 0&&n.setAttribute(`nonce`,r),n.textContent=t.cssText,e.appendChild(n)})},Bn=Nn?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return Ln(t)})(e):e,Vn=window,Hn=Vn.trustedTypes,Un=Hn?Hn.emptyScript:``,Wn=Vn.reactiveElementPolyfillSupport,Gn={toAttribute(e,t){switch(t){case Boolean:e=e?Un:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Kn=(e,t)=>t!==e&&(t==t||e==e),qn={attribute:!0,type:String,converter:Gn,reflect:!1,hasChanged:Kn},Jn=`finalized`,Yn=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){this.finalize(),(this.h??=[]).push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach((t,n)=>{let r=this._$Ep(n,t);r!==void 0&&(this._$Ev.set(r,n),e.push(r))}),e}static createProperty(e,t=qn){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let n=typeof e==`symbol`?Symbol():`__`+e,r=this.getPropertyDescriptor(e,n,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){return{get(){return this[t]},set(r){let i=this[e];this[t]=r,this.requestUpdate(e,i,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||qn}static finalize(){if(this.hasOwnProperty(Jn))return!1;this[Jn]=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty(`properties`)){let e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let n of t)this.createProperty(n,e[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(Bn(e))}else e!==void 0&&t.push(Bn(e));return t}static _$Ep(e,t){let n=t.attribute;return n===!1?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)==null||e.forEach(e=>e(this))}addController(e){var t;(this._$ES??=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$ES)==null||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return zn(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)==null||e.forEach(e=>e.hostConnected?.call(e))}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)==null||e.forEach(e=>e.hostDisconnected?.call(e))}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$EO(e,t,n=qn){let r=this.constructor._$Ep(e,n);if(r!==void 0&&n.reflect===!0){let i=(n.converter?.toAttribute===void 0?Gn:n.converter).toAttribute(t,n.type);this._$El=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$El=null}}_$AK(e,t){let n=this.constructor,r=n._$Ev.get(e);if(r!==void 0&&this._$El!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?Gn:e.converter;this._$El=r,this[r]=i.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,n){let r=!0;e!==void 0&&(((n||=this.constructor.getPropertyOptions(e)).hasChanged||Kn)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),n.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,n))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&=(this._$Ei.forEach((e,t)=>this[t]=e),void 0);let t=!1,n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(e=this._$ES)==null||e.forEach(e=>e.hostUpdate?.call(e)),this.update(n)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(n)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)==null||t.forEach(e=>e.hostUpdated?.call(e)),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};Yn[Jn]=!0,Yn.elementProperties=new Map,Yn.elementStyles=[],Yn.shadowRootOptions={mode:`open`},Wn?.({ReactiveElement:Yn}),(Vn.reactiveElementVersions??=[]).push(`1.6.3`);var Xn=window,Zn=Xn.trustedTypes,Qn=Zn?Zn.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,$n=`$lit$`,Y=`lit$${(Math.random()+``).slice(9)}$`,er=`?`+Y,tr=`<${er}>`,nr=document,rr=()=>nr.createComment(``),ir=e=>e===null||typeof e!=`object`&&typeof e!=`function`,ar=Array.isArray,or=e=>ar(e)||typeof e?.[Symbol.iterator]==`function`,sr=`[ 	
\f\r]`,cr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lr=/-->/g,ur=/>/g,dr=RegExp(`>|${sr}(?:([^\\s"'>=/]+)(${sr}*=${sr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,`g`),fr=/'/g,pr=/"/g,mr=/^(?:script|style|textarea|title)$/i,X=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),hr=Symbol.for(`lit-noChange`),Z=Symbol.for(`lit-nothing`),gr=new WeakMap,_r=nr.createTreeWalker(nr,129,null,!1);function vr(e,t){if(!Array.isArray(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return Qn===void 0?t:Qn.createHTML(t)}var yr=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:``,o=cr;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===cr?c[1]===`!--`?o=lr:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=dr):(mr.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=dr):o=ur:o===dr?c[0]===`>`?(o=i??cr,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?dr:c[3]===`"`?pr:fr):o===pr||o===fr?o=dr:o===lr||o===ur?o=cr:(o=dr,i=void 0);let d=o===dr&&e[t+1].startsWith(`/>`)?` `:``;a+=o===cr?n+tr:l>=0?(r.push(s),n.slice(0,l)+$n+n.slice(l)+Y+d):n+Y+(l===-2?(r.push(void 0),t):d)}return[vr(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:``)),r]},br=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=yr(t,n);if(this.el=e.createElement(l,r),_r.currentNode=this.el.content,n===2){let e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;(i=_r.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes()){let e=[];for(let t of i.getAttributeNames())if(t.endsWith($n)||t.startsWith(Y)){let n=u[o++];if(e.push(t),n!==void 0){let e=i.getAttribute(n.toLowerCase()+$n).split(Y),t=/([.?@])?(.*)/.exec(n);c.push({type:1,index:a,name:t[2],strings:e,ctor:t[1]===`.`?Tr:t[1]===`?`?Dr:t[1]===`@`?Or:wr})}else c.push({type:6,index:a})}for(let t of e)i.removeAttribute(t)}if(mr.test(i.tagName)){let e=i.textContent.split(Y),t=e.length-1;if(t>0){i.textContent=Zn?Zn.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],rr()),_r.nextNode(),c.push({type:2,index:++a});i.append(e[t],rr())}}}else if(i.nodeType===8){if(i.data===er)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(Y,e+1))!==-1;)c.push({type:7,index:a}),e+=Y.length-1}}a++}}static createElement(e,t){let n=nr.createElement(`template`);return n.innerHTML=e,n}};function xr(e,t,n=e,r){var i,a;if(t===hr)return t;let o=r===void 0?n._$Cl:n._$Co?.[r],s=ir(t)?void 0:t._$litDirective$;return o?.constructor!==s&&((i=o?._$AO)==null||i.call(o,!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r===void 0?n._$Cl=o:((a=n)._$Co??(a._$Co=[]))[r]=o),o!==void 0&&(t=xr(e,o._$AS(e,t.values),o,r)),t}var Sr=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??nr).importNode(t,!0);_r.currentNode=r;let i=_r.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Cr(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new kr(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=_r.nextNode(),a++)}return _r.currentNode=nr,r}v(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Cr=class e{constructor(e,t,n,r){var i;this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cp=(i=r?.isConnected)==null||i}get _$AU(){return this._$AM?._$AU??this._$Cp}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=xr(this,e,t),ir(e)?e===Z||e==null||e===``?(this._$AH!==Z&&this._$AR(),this._$AH=Z):e!==this._$AH&&e!==hr&&this._(e):e._$litType$===void 0?e.nodeType===void 0?or(e)?this.T(e):this._(e):this.$(e):this.g(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==Z&&ir(this._$AH)?this._$AA.nextSibling.data=e:this.$(nr.createTextNode(e)),this._$AH=e}g(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=br.createElement(vr(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.v(t);else{let e=new Sr(r,this),n=e.u(this.options);e.v(t),this.$(n),this._$AH=e}}_$AC(e){let t=gr.get(e.strings);return t===void 0&&gr.set(e.strings,t=new br(e)),t}T(t){ar(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.k(rr()),this.k(rr()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)==null||n.call(this,!1,!0,t);e&&e!==this._$AB;){let t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)==null||t.call(this,e))}},wr=class{constructor(e,t,n,r,i){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Z}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=xr(this,e,t,0),a=!ir(e)||e!==this._$AH&&e!==hr,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=xr(this,r[n+o],t,o),s===hr&&(s=this._$AH[o]),a||=!ir(s)||s!==this._$AH[o],s===Z?e=Z:e!==Z&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Tr=class extends wr{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Z?void 0:e}},Er=Zn?Zn.emptyScript:``,Dr=class extends wr{constructor(){super(...arguments),this.type=4}j(e){e&&e!==Z?this.element.setAttribute(this.name,Er):this.element.removeAttribute(this.name)}},Or=class extends wr{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=xr(this,e,t,0)??Z)===hr)return;let n=this._$AH,r=e===Z&&n!==Z||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==Z&&(n===Z||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},kr=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){xr(this,e)}},Ar=Xn.litHtmlPolyfillSupport;Ar?.(br,Cr),(Xn.litHtmlVersions??=[]).push(`2.8.0`);var jr=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Cr(t.insertBefore(rr(),e),e,void 0,n??{})}return i._$AI(e),i},Mr,Nr=class extends Yn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=jr(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return hr}};Nr.finalized=!0,Nr._$litElement$=!0,(Mr=globalThis.litElementHydrateSupport)==null||Mr.call(globalThis,{LitElement:Nr});var Pr=globalThis.litElementPolyfillSupport;Pr?.({LitElement:Nr}),(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push(`3.3.3`);var Fr=Rn`
  @font-face {
    font-family: 'Karla';
    font-weight: regular;
    src: url('./fonts/Karla-regular.woff') format('woff');
  }

  :host {
    --lottie-player-toolbar-height: 35px;
    --lottie-player-toolbar-background-color: transparent;
    --lottie-player-toolbar-hover-background-color: #f3f6f8;
    --lottie-player-toolbar-icon-color: #20272c;
    --lottie-player-toolbar-icon-hover-color: #f3f6f8;
    --lottie-player-toolbar-icon-active-color: #00ddb3;
    --lottie-player-seeker-track-color: #00ddb3;
    --lottie-player-seeker-accent-color: #00c1a2;
    --lottie-player-seeker-thumb-color: #00c1a2;
    --lottie-player-options-separator: #d9e0e6;

    display: block;
    width: 100%;
    height: 100%;

    font-family: 'Karla', sans-serif;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :host * {
    box-sizing: border-box;
  }

  .active {
    color: var(--lottie-player-toolbar-icon-active-color) !important;
  }

  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .animation {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
  }
  .animation.controls {
    height: calc(100% - var(--lottie-player-toolbar-height));
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-items: center;
    background-color: var(--lottie-player-toolbar-background-color);
    margin: 0 8px;
    height: var(--lottie-player-toolbar-height);
  }

  .btn-spacing-left {
    margin-right: 4px;
    margin-left: 8px;
  }

  .btn-spacing-center {
    margin-right: 4px;
    margin-left: 4px;
  }

  .btn-spacing-right {
    margin-right: 8px;
    margin-left: 4px;
  }

  .toolbar button {
    color: #20272c;
    cursor: pointer;
    fill: var(--lottie-player-toolbar-icon-color);
    display: flex;
    background: none;
    border: 0px;
    border-radius: 4px;
    padding: 4px;
    outline: none;
    width: 24px;
    height: 24px;
    align-items: center;
  }

  .toolbar button:hover {
    background-color: var(--lottie-player-toolbar-icon-hover-color);
    border-style: solid;
    border-radius: 2px;
  }

  .toolbar button.active {
    fill: var(--lottie-player-toolbar-icon-active-color);
  }

  .toolbar button.active:hover {
    fill: var(--lottie-player-toolbar-icon-hover-color);
    border-radius: 4px;
  }

  .toolbar button:focus-visible {
    outline: 2px solid var(--lottie-player-toolbar-icon-active-color);
    border-radius: 4px;
    box-sizing: border-box;
  }

  .toolbar button svg {
    width: 16px;
    height: 16px;
  }

  .toolbar button.disabled svg {
    display: none;
  }

  .popover {
    position: absolute;
    bottom: 40px;
    left: calc(100% - 239px);
    width: 224px;
    min-height: 84px;
    max-height: 300px;
    background-color: #ffffff;
    box-shadow: 0px 8px 48px 0px rgba(243, 246, 248, 0.15), 0px 8px 16px 0px rgba(61, 72, 83, 0.16),
      0px 0px 1px 0px rgba(61, 72, 83, 0.36);
    border-radius: 8px;
    padding: 8px;
    z-index: 100;
    overflow-y: scroll;
    scrollbar-width: none;
  }
  .popover:focus-visible {
    outline: 2px solid var(--lottie-player-toolbar-icon-active-color);
    border-radius: 4px;
    box-sizing: border-box;
  }

  .popover::-webkit-scrollbar {
    width: 0px;
  }

  .popover-button {
    background: none;
    border: none;
    font-family: inherit;
    width: 100%;
    flex-direction: row;
    cursor: pointer;
    height: 32px;
    color: #20272c;
    justify-content: space-between;
    display: flex;
    padding: 4px 8px;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    border-radius: 4px;
  }

  .popover-button:focus-visible {
    outline: 2px solid var(--lottie-player-toolbar-icon-active-color);
    border-radius: 4px;
    box-sizing: border-box;
  }

  .popover-button:hover {
    background-color: var(--lottie-player-toolbar-hover-background-color);
  }

  .popover-button-text {
    display: flex;
    color: #20272c;
    flex-direction: column;
    align-self: stretch;
    justify-content: center;
    font-family: inherit;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.28px;
  }

  .reset-btn {
    font-size: 12px;
    cursor: pointer;
    font-family: inherit;
    background: none;
    border: none;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    color: #63727e;
    padding: 0;
    width: 31px;
    height: 18px;
  }
  .reset-btn:focus-visible {
    outline: 2px solid var(--lottie-player-toolbar-icon-active-color);
    border-radius: 4px;
    box-sizing: border-box;
  }
  .reset-btn:hover {
    color: #20272c;
  }

  .option-title-button {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 32px;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    cursor: pointer;
    color: var(--lottie-player-toolbar-icon-color);
    border: none;
    background: none;
    padding: 4px;
    font-family: inherit;
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.32px;
  }
  .option-title-button.themes {
    width: auto;
    padding: 0;
  }
  .option-title-button:hover {
    background-color: var(--lottie-player-toolbar-icon-hover-color);
  }

  .option-title-themes-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
  }
  .option-title-themes-row:hover {
    background-color: var(--lottie-player-toolbar-icon-hover-color);
  }

  .option-title-button:focus-visible {
    outline: 2px solid var(--lottie-player-toolbar-icon-active-color);
    border-radius: 4px;
    box-sizing: border-box;
  }

  .option-title-text {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.32px;
  }

  .option-title-separator {
    margin: 8px -8px;
    border-bottom: 1px solid var(--lottie-player-options-separator);
  }

  .option-title-chevron {
    display: flex;
    padding: 4px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .option-row {
    display: flex;
    flex-direction: column;
  }
  .option-row > ul {
    padding: 0;
    margin: 0;
  }

  .option-button {
    width: 100%;
    background: none;
    border: none;
    font-family: inherit;
    display: flex;
    padding: 4px 8px;
    color: #20272c;
    overflow: hidden;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    cursor: pointer;
    height: 32px;
    font-family: inherit;
    font-size: 14px;
    border-radius: 4px;
  }
  .option-button:hover {
    background-color: var(--lottie-player-toolbar-hover-background-color);
  }
  .option-button:focus-visible {
    outline: 2px solid var(--lottie-player-toolbar-icon-active-color);
    border-radius: 4px;
    box-sizing: border-box;
  }

  .option-tick {
    display: flex;
    width: 24px;
    height: 24px;
    align-items: flex-start;
    gap: 8px;
  }

  .seeker {
    height: 4px;
    width: 95%;
    outline: none;
    -webkit-appearance: none;
    -moz-apperance: none;
    border-radius: 9999px;
    cursor: pointer;
    background-image: linear-gradient(
      to right,
      rgb(0, 221, 179) calc(var(--seeker) * 1%),
      rgb(217, 224, 230) calc(var(--seeker) * 1%)
    );
  }
  .seeker.to-left {
    background-image: linear-gradient(
      to right,
      rgb(217, 224, 230) calc(var(--seeker) * 1%),
      rgb(0, 221, 179) calc(var(--seeker) * 1%)
    );
  }
  .seeker::-webkit-slider-runnable-track:focus-visible {
    color: #f07167;
    accent-color: #00ddb3;
  }

  .seeker::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
  }
  .seeker::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: var(--lottie-player-seeker-thumb-color);
    cursor: pointer;
    margin-top: -5px;
  }
  .seeker:focus-visible::-webkit-slider-thumb {
    background: var(--lottie-player-seeker-thumb-color);
    outline: 2px solid var(--lottie-player-seeker-track-color);
    border: 1.5px solid #ffffff;
  }
  .seeker::-webkit-slider-thumb:hover {
    background: #019d91;
  }
  .seeker::-moz-range-thumb {
    appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: var(--lottie-player-seeker-thumb-color);
    cursor: pointer;
    margin-top: -5px;
    border-color: transparent;
  }
  .seeker:focus-visible::-moz-range-thumb {
    background: var(--lottie-player-seeker-thumb-color);
    outline: 2px solid var(--lottie-player-seeker-track-color);
    border: 1.5px solid #ffffff;
  }

  .error {
    display: flex;
    justify-content: center;
    margin: auto;
    height: 100%;
    align-items: center;
  }
`,Ir=(e,t)=>t.kind===`method`&&t.descriptor&&!(`value`in t.descriptor)?{...t,finisher(n){n.createProperty(t.key,e)}}:{kind:`field`,key:Symbol(),placement:`own`,descriptor:{},originalKey:t.key,initializer(){typeof t.initializer==`function`&&(this[t.key]=t.initializer.call(this))},finisher(n){n.createProperty(t.key,e)}},Lr=(e,t,n)=>{t.constructor.createProperty(n,e)};function Q(e){return(t,n)=>n===void 0?Ir(e,t):Lr(e,t,n)}function Rr(e){return Q({...e,state:!0})}var zr=({finisher:e,descriptor:t})=>(n,r)=>{if(r===void 0){let r=n.originalKey??n.key,i=t==null?{...n,key:r}:{kind:`method`,placement:`prototype`,key:r,descriptor:t(n.key)};return e!=null&&(i.finisher=function(t){e(t,r)}),i}{let i=n.constructor;t!==void 0&&Object.defineProperty(n,r,t(r)),e?.(i,r)}};function Br(e,t){return zr({descriptor:n=>{let r={get(){return this.renderRoot?.querySelector(e)??null},enumerable:!0,configurable:!0};if(t){let t=typeof n==`symbol`?Symbol():`__`+n;r.get=function(){return this[t]===void 0&&(this[t]=this.renderRoot?.querySelector(e)??null),this[t]}}return r}})}var Vr;(Vr=window.HTMLSlotElement)==null||Vr.prototype.assignedElements;var Hr={name:`@dotlottie/player-component`,version:`2.7.12`,description:`dotLottie animation player web component.`,repository:`https://github.com/dotlottie/player-component.git`,homepage:`https://dotlottie.io/players`,bugs:`https://github.com/dotlottie/player-component/issues`,author:`Jawish Hameed <jawish@lottiefiles.com>`,license:`MIT`,main:`dist/dotlottie-player.js`,module:`dist/dotlottie-player.mjs`,types:`dist/dotlottie-player.d.ts`,files:[`dist`],keywords:[`dotlottie`,`animation`,`web component`,`component`,`lit-element`,`player`],scripts:{build:`tsup`,"cypress:open":`cypress open --component`,dev:`tsup --watch`,lint:`eslint .`,"lint:fix":`eslint --fix`,test:`cypress run --component`,"type-check":`tsc --noEmit`},dependencies:{"@dotlottie/common":`workspace:*`,lit:`^2.7.5`},devDependencies:{"@vitejs/plugin-legacy":`^4.1.0`,"axe-core":`^4.7.2`,cypress:`^12.11.0`,"cypress-axe":`^1.4.0`,"cypress-ct-lit":`^0.3.2`,"lottie-web":`^5.12.2`,terser:`^5.19.0`,tsup:`^7.2.0`,typescript:`^4.7.4`,vite:`^4.3.9`},publishConfig:{access:`public`},browserslist:[`> 3%`]},Ur=`dotlottie-player`,$=class extends Nr{defaultTheme=``;container;playMode=kn.Normal;autoplay=!1;background=`transparent`;controls=!1;direction=1;hover=!1;loop;renderer=`svg`;speed=1;src;intermission=0;activeAnimationId=null;light=!1;worker=!1;activeStateId;_seeker=0;_dotLottieCommonPlayer;_io;_loop;_renderer=`svg`;_unsubscribeListeners;_hasMultipleAnimations=!1;_hasMultipleThemes=!1;_hasMultipleStates=!1;_popoverIsOpen=!1;_animationsTabIsOpen=!1;_statesTabIsOpen=!1;_styleTabIsOpen=!1;_themesForCurrentAnimation=[];_statesForCurrentAnimation=[];_parseLoop(e){let t=parseInt(e,10);return Number.isInteger(t)&&t>0?(this._loop=t,t):typeof e==`string`&&[`true`,`false`].includes(e)?(this._loop=e===`true`,this._loop):(U(`loop must be a positive integer or a boolean`),!1)}_handleSeekChange(e){let t=e.currentTarget;try{let e=parseInt(t.value,10);if(!this._dotLottieCommonPlayer)return;let n=e/100*this._dotLottieCommonPlayer.totalFrames;this.seek(n)}catch{throw V(`Error while seeking animation`)}}_initListeners(){let e=this._dotLottieCommonPlayer;e===void 0?U(`player not initialized - cannot add event listeners`,`dotlottie-player-component`):(this._unsubscribeListeners=e.state.subscribe((e,t)=>{this._seeker=e.seeker,this.requestUpdate(),t.currentState!==e.currentState&&this.dispatchEvent(new CustomEvent(e.currentState)),this.dispatchEvent(new CustomEvent(q.Frame,{detail:{frame:e.frame,seeker:e.seeker}})),this.dispatchEvent(new CustomEvent(q.VisibilityChange,{detail:{visibilityPercentage:e.visibilityPercentage}}))}),e.addEventListener(`complete`,()=>{this.dispatchEvent(new CustomEvent(q.Complete))}),e.addEventListener(`loopComplete`,()=>{this.dispatchEvent(new CustomEvent(q.LoopComplete))}),e.addEventListener(`DOMLoaded`,()=>{let e=this.getManifest();e&&e.themes&&(this._themesForCurrentAnimation=e.themes.filter(e=>e.animations.includes(this.getCurrentAnimationId()||``))),e&&e.states&&(this._hasMultipleStates=e.states.length>0,this._statesForCurrentAnimation=[],e.states.forEach(e=>{this._statesForCurrentAnimation.push(e)})),this.dispatchEvent(new CustomEvent(q.Ready))}),e.addEventListener(`data_ready`,()=>{this.dispatchEvent(new CustomEvent(q.DataReady))}),e.addEventListener(`data_failed`,()=>{this.dispatchEvent(new CustomEvent(q.DataFail))}),window&&window.addEventListener(`click`,e=>this._clickOutListener(e)))}async load(e,t,n){if(!this.shadowRoot)return;this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.destroy(),this._dotLottieCommonPlayer=new jn(e,this.container,{rendererSettings:t??{scaleMode:`noScale`,clearCanvas:!0,progressiveLoad:!0,hideOnTransparent:!0},hover:this.hasAttribute(`hover`)?this.hover:void 0,renderer:this.hasAttribute(`renderer`)?this._renderer:void 0,loop:this.hasAttribute(`loop`)?this._loop:void 0,direction:this.hasAttribute(`direction`)?this.direction===1?1:-1:void 0,speed:this.hasAttribute(`speed`)?this.speed:void 0,intermission:this.hasAttribute(`intermission`)?Number(this.intermission):void 0,playMode:this.hasAttribute(`playMode`)?this.playMode:void 0,autoplay:this.hasAttribute(`autoplay`)?this.autoplay:void 0,activeAnimationId:this.hasAttribute(`activeAnimationId`)?this.activeAnimationId:void 0,defaultTheme:this.hasAttribute(`defaultTheme`)?this.defaultTheme:void 0,light:this.light,worker:this.worker,activeStateId:this.hasAttribute(`activeStateId`)?this.activeStateId:void 0}),await this._dotLottieCommonPlayer.load(n);let r=this.getManifest();this._hasMultipleAnimations=this.animationCount()>1,r&&(r.themes&&(this._themesForCurrentAnimation=r.themes.filter(e=>e.animations.includes(this.getCurrentAnimationId()||``)),this._hasMultipleThemes=r.themes.length>0),r.states&&(this._hasMultipleStates=r.states.length>0,this._statesForCurrentAnimation=[],r.states.forEach(e=>{this._statesForCurrentAnimation.push(e)}))),this._initListeners()}getCurrentAnimationId(){return this._dotLottieCommonPlayer?.currentAnimationId}animationCount(){return this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.getManifest()?.animations.length||0}animations(){return this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.getManifest()?.animations.map(e=>e.id)||[]}currentAnimation(){return!this._dotLottieCommonPlayer||!this._dotLottieCommonPlayer.currentAnimationId?``:this._dotLottieCommonPlayer.currentAnimationId}getState(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.getState():An}getManifest(){return this._dotLottieCommonPlayer?.getManifest()}getLottie(){return this._dotLottieCommonPlayer?.getAnimationInstance()}getVersions(){return{lottieWebVersion:jn.getLottieWebVersion(),dotLottiePlayerVersion:`${Hr.version}`}}previous(e){var t;(t=this._dotLottieCommonPlayer)==null||t.previous(e)}next(e){var t;(t=this._dotLottieCommonPlayer)==null||t.next(e)}reset(){var e;(e=this._dotLottieCommonPlayer)==null||e.reset()}play(e,t){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.play(e,t)}pause(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.pause()}stop(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.stop()}playOnShow(e){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.playOnShow(e)}stopPlayOnShow(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.stopPlayOnShow()}playOnScroll(e){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.playOnScroll(e)}stopPlayOnScroll(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.stopPlayOnScroll()}seek(e){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.seek(e)}snapshot(e=!0){if(!this.shadowRoot)return``;let t=this.shadowRoot.querySelector(`.animation svg`),n=new XMLSerializer().serializeToString(t);if(e){let e=document.createElement(`a`);e.href=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`,e.download=`download_${this._seeker}.svg`,document.body.appendChild(e),e.click(),document.body.removeChild(e)}return n}setTheme(e){var t;(t=this._dotLottieCommonPlayer)==null||t.setDefaultTheme(e)}themes(){return this._dotLottieCommonPlayer&&(this._dotLottieCommonPlayer.getManifest()?.themes)?.map(e=>e.id)||[]}getDefaultTheme(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.defaultTheme:``}getActiveStateMachine(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.activeStateId:``}_freeze(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.freeze()}setSpeed(e=1){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setSpeed(e)}setDirection(e){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setDirection(e)}setLooping(e){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setLoop(e)}isLooping(){return this._dotLottieCommonPlayer?this._dotLottieCommonPlayer.loop:!1}togglePlay(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.togglePlay()}toggleLooping(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.toggleLoop()}setPlayMode(e){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.setMode(e)}enterInteractiveMode(e){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.enterInteractiveMode(e)}exitInteractiveMode(){this._dotLottieCommonPlayer&&this._dotLottieCommonPlayer.exitInteractiveMode()}revertToManifestValues(e){var t;(t=this._dotLottieCommonPlayer)==null||t.revertToManifestValues(e)}static get styles(){return Fr}async firstUpdated(){this.container=this.shadowRoot?.querySelector(`#animation`),`IntersectionObserver`in window&&(this._io=new IntersectionObserver(e=>{e[0]!==void 0&&e[0].isIntersecting?this._dotLottieCommonPlayer?.currentState===On.Frozen&&this.play():this._dotLottieCommonPlayer?.currentState===On.Playing&&this._freeze()}),this._io.observe(this.container)),this.loop?this._parseLoop(this.loop):this.hasAttribute(`loop`)&&this._parseLoop(`true`),this.renderer===`svg`?this._renderer=`svg`:this.renderer===`canvas`?this._renderer=`canvas`:this.renderer===`html`&&(this._renderer=`html`),this.src&&await this.load(this.src)}disconnectedCallback(){var e,t;this._io&&=(this._io.disconnect(),void 0),(e=this._dotLottieCommonPlayer)==null||e.destroy(),(t=this._unsubscribeListeners)==null||t.call(this),window&&window.removeEventListener(`click`,e=>this._clickOutListener(e))}_clickOutListener(e){!e.composedPath().some(e=>e instanceof HTMLElement?e.classList.contains(`popover`)||e.id===`lottie-animation-options`:!1)&&this._popoverIsOpen&&(this._popoverIsOpen=!1,this.requestUpdate())}renderControls(){var e;let t=this._dotLottieCommonPlayer?.currentState===On.Playing,n=this._dotLottieCommonPlayer?.currentState===On.Paused;return X`
      <div id="lottie-controls" aria-label="lottie-animation-controls" class="toolbar">
        ${this._hasMultipleAnimations?X`
              <button @click=${()=>this.previous()} aria-label="Previous animation" class="btn-spacing-left">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.69214 13.5C1.69214 13.7761 1.916 14 2.19214 14C2.46828 14 2.69214 13.7761 2.69214 13.5L2.69214 2.5C2.69214 2.22386 2.46828 2 2.19214 2C1.916 2 1.69214 2.22386 1.69214 2.5V13.5ZM12.5192 13.7828C13.1859 14.174 14.0254 13.6933 14.0254 12.9204L14.0254 3.0799C14.0254 2.30692 13.1859 1.8262 12.5192 2.21747L4.13612 7.13769C3.47769 7.52414 3.47769 8.4761 4.13612 8.86255L12.5192 13.7828Z"
                    fill="#20272C"
                  />
                </svg>
              </button>
            `:X``}
        <button
          id="lottie-play-button"
          @click=${()=>{this.togglePlay()}}
          class=${t||n?`active ${this._hasMultipleAnimations?`btn-spacing-center`:`btn-spacing-right`}`:`${this._hasMultipleAnimations?`btn-spacing-center`:`btn-spacing-right`}`}
          aria-label="play / pause animation"
        >
          ${t?X`
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.99996 2C3.26358 2 2.66663 2.59695 2.66663 3.33333V12.6667C2.66663 13.403 3.26358 14 3.99996 14H5.33329C6.06967 14 6.66663 13.403 6.66663 12.6667V3.33333C6.66663 2.59695 6.06967 2 5.33329 2H3.99996Z"
                    fill="#20272C"
                  />
                  <path
                    d="M10.6666 2C9.93025 2 9.33329 2.59695 9.33329 3.33333V12.6667C9.33329 13.403 9.93025 14 10.6666 14H12C12.7363 14 13.3333 13.403 13.3333 12.6667V3.33333C13.3333 2.59695 12.7363 2 12 2H10.6666Z"
                    fill="#20272C"
                  />
                </svg>
              `:X`
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.33337 3.46787C3.33337 2.52312 4.35948 1.93558 5.17426 2.41379L12.8961 6.94592C13.7009 7.41824 13.7009 8.58176 12.8961 9.05408L5.17426 13.5862C4.35948 14.0644 3.33337 13.4769 3.33337 12.5321V3.46787Z"
                    fill="#20272C"
                  />
                </svg>
              `}
        </button>
        ${this._hasMultipleAnimations?X`
              <button @click=${()=>this.next()} aria-label="Next animation" class="btn-spacing-right">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.3336 2.5C14.3336 2.22386 14.1097 2 13.8336 2C13.5574 2 13.3336 2.22386 13.3336 2.5V13.5C13.3336 13.7761 13.5574 14 13.8336 14C14.1097 14 14.3336 13.7761 14.3336 13.5V2.5ZM3.50618 2.21722C2.83954 1.82595 2 2.30667 2 3.07965V12.9201C2 13.6931 2.83954 14.1738 3.50618 13.7825L11.8893 8.86231C12.5477 8.47586 12.5477 7.52389 11.8893 7.13745L3.50618 2.21722Z"
                    fill="#20272C"
                  />
                </svg>
              </button>
            `:X``}
        <input
          id="lottie-seeker-input"
          class="seeker ${this._dotLottieCommonPlayer?.direction===-1?`to-left`:``}"
          type="range"
          min="0"
          step="1"
          max="100"
          .value=${this._seeker}
          @input=${e=>this._handleSeekChange(e)}
          @mousedown=${()=>{this._freeze()}}
          @mouseup=${()=>{var e;(e=this._dotLottieCommonPlayer)==null||e.unfreeze()}}
          aria-valuemin="1"
          aria-valuemax="100"
          role="slider"
          aria-valuenow=${this._seeker}
          aria-label="lottie-seek-input"
          style=${`--seeker: ${this._seeker}`}
        />
        <button
          id="lottie-loop-toggle"
          @click=${()=>this.toggleLooping()}
          class=${(e=this._dotLottieCommonPlayer)!=null&&e.loop?`active btn-spacing-left`:`btn-spacing-left`}
          aria-label="loop-toggle"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8654 2.31319C11.0607 2.11793 11.3772 2.11793 11.5725 2.31319L13.4581 4.19881C13.6534 4.39407 13.6534 4.71066 13.4581 4.90592L11.5725 6.79154C11.3772 6.9868 11.0607 6.9868 10.8654 6.79154C10.6701 6.59628 10.6701 6.27969 10.8654 6.08443L11.6162 5.33362H4V6.66695C4 7.03514 3.70152 7.33362 3.33333 7.33362C2.96514 7.33362 2.66666 7.03514 2.66666 6.66695L2.66666 4.66695C2.66666 4.29876 2.96514 4.00028 3.33333 4.00028H11.8454L10.8654 3.0203C10.6701 2.82504 10.6701 2.50846 10.8654 2.31319Z"
              fill="currentColor"
            />
            <path
              d="M12.4375 11.9999C12.8057 11.9999 13.1042 11.7014 13.1042 11.3332V9.33321C13.1042 8.96502 12.8057 8.66655 12.4375 8.66655C12.0693 8.66655 11.7708 8.96502 11.7708 9.33321V10.6665H4.15462L4.90543 9.91573C5.10069 9.72047 5.10069 9.40389 4.90543 9.20862C4.71017 9.01336 4.39359 9.01336 4.19832 9.20862L2.31271 11.0942C2.11744 11.2895 2.11744 11.6061 2.31271 11.8013L4.19832 13.687C4.39359 13.8822 4.71017 13.8822 4.90543 13.687C5.10069 13.4917 5.10069 13.1751 4.90543 12.9799L3.92545 11.9999H12.4375Z"
              fill="currentColor"
            />
          </svg>
        </button>
        ${this._hasMultipleAnimations||this._hasMultipleThemes||this._hasMultipleStates?X`
              <button
                id="lottie-animation-options"
                @click=${()=>{this._popoverIsOpen=!this._popoverIsOpen,this.requestUpdate()}}
                aria-label="options"
                class="btn-spacing-right"
                style=${`background-color: ${this._popoverIsOpen?`var(--lottie-player-toolbar-icon-hover-color)`:``}`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.33337 11.6666C7.78109 11.6666 7.33337 12.1143 7.33337 12.6666C7.33337 13.2189 7.78109 13.6666 8.33337 13.6666C8.88566 13.6666 9.33337 13.2189 9.33337 12.6666C9.33337 12.1143 8.88566 11.6666 8.33337 11.6666Z"
                    fill="#20272C"
                  />
                  <path
                    d="M7.33337 7.99992C7.33337 7.44763 7.78109 6.99992 8.33337 6.99992C8.88566 6.99992 9.33338 7.44763 9.33338 7.99992C9.33338 8.5522 8.88566 8.99992 8.33337 8.99992C7.78109 8.99992 7.33337 8.5522 7.33337 7.99992Z"
                    fill="#20272C"
                  />
                  <path
                    d="M7.33337 3.33325C7.33337 2.78097 7.78109 2.33325 8.33337 2.33325C8.88566 2.33325 9.33338 2.78097 9.33338 3.33325C9.33338 3.88554 8.88566 4.33325 8.33337 4.33325C7.78109 4.33325 7.33337 3.88554 7.33337 3.33325Z"
                    fill="#20272C"
                  />
                </svg>
              </button>
            `:X``}
      </div>
      ${this._popoverIsOpen?X`
            <div
              id="popover"
              class="popover"
              tabindex="0"
              aria-label="lottie animations themes popover"
              style="min-height: ${this.themes().length>0?`84px`:`auto`}"
            >
              ${!this._animationsTabIsOpen&&!this._styleTabIsOpen&&!this._statesTabIsOpen?X`
                    <button
                      class="popover-button"
                      tabindex="0"
                      aria-label="animations"
                      @click=${()=>{this._animationsTabIsOpen=!this._animationsTabIsOpen,this.requestUpdate()}}
                      @keydown=${e=>{(e.code===`Space`||e.code===`Enter`)&&(this._animationsTabIsOpen=!this._animationsTabIsOpen,this.requestUpdate())}}
                    >
                      <div class="popover-button-text">Animations</div>
                      <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10.4697 17.5303C10.1768 17.2374 10.1768 16.7626 10.4697 16.4697L14.9393 12L10.4697 7.53033C10.1768 7.23744 10.1768 6.76256 10.4697 6.46967C10.7626 6.17678 11.2374 6.17678 11.5303 6.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L11.5303 17.5303C11.2374 17.8232 10.7626 17.8232 10.4697 17.5303Z"
                            fill="#4C5863"
                          />
                        </svg>
                      </div>
                    </button>
                  `:X``}
              ${this._hasMultipleThemes&&!this._styleTabIsOpen&&!this._animationsTabIsOpen&&!this._statesTabIsOpen?X` <button
                    class="popover-button"
                    aria-label="Themes"
                    @click=${()=>{this._styleTabIsOpen=!this._styleTabIsOpen,this.requestUpdate()}}
                    @keydown=${e=>{(e.code===`Space`||e.code===`Enter`)&&(this._styleTabIsOpen=!this._styleTabIsOpen,this.requestUpdate())}}
                  >
                    <div class="popover-button-text">Themes</div>
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.4697 17.5303C10.1768 17.2374 10.1768 16.7626 10.4697 16.4697L14.9393 12L10.4697 7.53033C10.1768 7.23744 10.1768 6.76256 10.4697 6.46967C10.7626 6.17678 11.2374 6.17678 11.5303 6.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L11.5303 17.5303C11.2374 17.8232 10.7626 17.8232 10.4697 17.5303Z"
                          fill="#4C5863"
                        />
                      </svg>
                    </div>
                  </button>`:``}
              ${this._hasMultipleStates&&!this._styleTabIsOpen&&!this._animationsTabIsOpen&&!this._statesTabIsOpen?X` <button
                    class="popover-button"
                    aria-label="States"
                    @click=${()=>{this._statesTabIsOpen=!this._statesTabIsOpen,this.requestUpdate()}}
                    @keydown=${e=>{(e.code===`Space`||e.code===`Enter`)&&(this._statesTabIsOpen=!this._statesTabIsOpen,this.requestUpdate())}}
                  >
                    <div class="popover-button-text">States</div>
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.4697 17.5303C10.1768 17.2374 10.1768 16.7626 10.4697 16.4697L14.9393 12L10.4697 7.53033C10.1768 7.23744 10.1768 6.76256 10.4697 6.46967C10.7626 6.17678 11.2374 6.17678 11.5303 6.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L11.5303 17.5303C11.2374 17.8232 10.7626 17.8232 10.4697 17.5303Z"
                          fill="#4C5863"
                        />
                      </svg>
                    </div>
                  </button>`:``}
              ${this._animationsTabIsOpen?X`<button
                      class="option-title-button"
                      aria-label="Back to main popover menu"
                      @click=${()=>{this._animationsTabIsOpen=!this._animationsTabIsOpen,this.requestUpdate()}}
                    >
                      <div class="option-title-chevron">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.5303 6.46967C13.8232 6.76256 13.8232 7.23744 13.5303 7.53033L9.06066 12L13.5303 16.4697C13.8232 16.7626 13.8232 17.2374 13.5303 17.5303C13.2374 17.8232 12.7626 17.8232 12.4697 17.5303L7.46967 12.5303C7.17678 12.2374 7.17678 11.7626 7.46967 11.4697L12.4697 6.46967C12.7626 6.17678 13.2374 6.17678 13.5303 6.46967Z"
                            fill="#20272C"
                          />
                        </svg>
                      </div>
                      <div>Animations</div>
                    </button>
                    <div class="option-title-separator"></div>
                    <div class="option-row">
                      <ul>
                        ${this.animations().map(e=>X`
                            <li>
                              <button
                                class="option-button"
                                aria-label=${`${e}`}
                                @click=${()=>{this._animationsTabIsOpen=!this._animationsTabIsOpen,this._popoverIsOpen=!this._popoverIsOpen,this.play(e),this.requestUpdate()}}
                                @keydown=${t=>{(t.code===`Space`||t.code===`Enter`)&&(this._animationsTabIsOpen=!this._animationsTabIsOpen,this._popoverIsOpen=!this._popoverIsOpen,this.play(e),this.requestUpdate())}}
                              >
                                <div class="option-tick">
                                  ${this.currentAnimation()===e?X`
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.5281 5.9372C20.821 6.23009 20.821 6.70497 20.5281 6.99786L9.46297 18.063C9.32168 18.2043 9.12985 18.2833 8.93004 18.2826C8.73023 18.2819 8.53895 18.2015 8.39864 18.0593L3.46795 13.0596C3.1771 12.7647 3.1804 12.2898 3.47532 11.999C3.77024 11.7081 4.2451 11.7114 4.53595 12.0063L8.93634 16.4683L19.4675 5.9372C19.7604 5.64431 20.2352 5.64431 20.5281 5.9372Z"
                                            fill="#20272C"
                                          />
                                        </svg>
                                      `:X`<div style="width: 24px; height: 24px"></div>`}
                                </div>
                                <div>${e}</div>
                              </button>
                            </li>
                          `)}
                      </ul>
                    </div> `:X``}
              ${this._styleTabIsOpen?X`<div class="option-title-themes-row">
                      <button
                        class="option-title-button themes"
                        aria-label="Back to main popover menu"
                        @click=${()=>{this._styleTabIsOpen=!this._styleTabIsOpen,this.requestUpdate()}}
                      >
                        <div class="option-title-chevron">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.5303 6.46967C13.8232 6.76256 13.8232 7.23744 13.5303 7.53033L9.06066 12L13.5303 16.4697C13.8232 16.7626 13.8232 17.2374 13.5303 17.5303C13.2374 17.8232 12.7626 17.8232 12.4697 17.5303L7.46967 12.5303C7.17678 12.2374 7.17678 11.7626 7.46967 11.4697L12.4697 6.46967C12.7626 6.17678 13.2374 6.17678 13.5303 6.46967Z"
                              fill="#20272C"
                            />
                          </svg>
                        </div>
                        <div class="option-title-text">Themes</div>
                        ${this._dotLottieCommonPlayer?.defaultTheme===``?X``:X`
                              <button
                                class="reset-btn"
                                @click=${()=>{this.setTheme(``),this.requestUpdate()}}
                              >
                                Reset
                              </button>
                            `}
                      </button>
                    </div>
                    <div class="option-title-separator"></div>
                    <div class="option-row">
                      <ul>
                        ${this._themesForCurrentAnimation.map(e=>X`
                            <li>
                              <button
                                class="option-button"
                                aria-label="${e.id}"
                                @click=${()=>{this.setTheme(e.id)}}
                                @keydown=${t=>{(t.code===`Space`||t.code===`Enter`)&&this.setTheme(e.id)}}
                              >
                                <div class="option-tick">
                                  ${this.getDefaultTheme()===e.id?X`
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.5281 5.9372C20.821 6.23009 20.821 6.70497 20.5281 6.99786L9.46297 18.063C9.32168 18.2043 9.12985 18.2833 8.93004 18.2826C8.73023 18.2819 8.53895 18.2015 8.39864 18.0593L3.46795 13.0596C3.1771 12.7647 3.1804 12.2898 3.47532 11.999C3.77024 11.7081 4.2451 11.7114 4.53595 12.0063L8.93634 16.4683L19.4675 5.9372C19.7604 5.64431 20.2352 5.64431 20.5281 5.9372Z"
                                            fill="#20272C"
                                          />
                                        </svg>
                                      `:X`<div style="width: 24px; height: 24px"></div>`}
                                </div>
                                <div>${e.id}</div>
                              </button>
                            </li>
                          `)}
                      </ul>
                    </div>`:X``}
              ${this._statesTabIsOpen?X`<div class="option-title-themes-row">
                      <button
                        class="option-title-button themes"
                        aria-label="Back to main popover menu"
                        @click=${()=>{this._statesTabIsOpen=!this._statesTabIsOpen,this.requestUpdate()}}
                      >
                        <div class="option-title-chevron">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.5303 6.46967C13.8232 6.76256 13.8232 7.23744 13.5303 7.53033L9.06066 12L13.5303 16.4697C13.8232 16.7626 13.8232 17.2374 13.5303 17.5303C13.2374 17.8232 12.7626 17.8232 12.4697 17.5303L7.46967 12.5303C7.17678 12.2374 7.17678 11.7626 7.46967 11.4697L12.4697 6.46967C12.7626 6.17678 13.2374 6.17678 13.5303 6.46967Z"
                              fill="#20272C"
                            />
                          </svg>
                        </div>
                        <div class="option-title-text">States</div>
                        <button
                          class="reset-btn"
                          @click=${()=>{this.exitInteractiveMode(),this.requestUpdate()}}
                        >
                          Reset
                        </button>
                      </button>
                    </div>
                    <div class="option-title-separator"></div>
                    <div class="option-row">
                      <ul>
                        ${this._statesForCurrentAnimation.map(e=>X`
                            <li>
                              <button
                                class="option-button"
                                aria-label="${e}"
                                @click=${()=>{this.enterInteractiveMode(e)}}
                                @keydown=${t=>{(t.code===`Space`||t.code===`Enter`)&&this.enterInteractiveMode(e)}}
                              >
                                <div class="option-tick">
                                  ${this.getActiveStateMachine()===e?X`
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.5281 5.9372C20.821 6.23009 20.821 6.70497 20.5281 6.99786L9.46297 18.063C9.32168 18.2043 9.12985 18.2833 8.93004 18.2826C8.73023 18.2819 8.53895 18.2015 8.39864 18.0593L3.46795 13.0596C3.1771 12.7647 3.1804 12.2898 3.47532 11.999C3.77024 11.7081 4.2451 11.7114 4.53595 12.0063L8.93634 16.4683L19.4675 5.9372C19.7604 5.64431 20.2352 5.64431 20.5281 5.9372Z"
                                            fill="#20272C"
                                          />
                                        </svg>
                                      `:X`<div style="width: 24px; height: 24px"></div>`}
                                </div>
                                <div>${e}</div>
                              </button>
                            </li>
                          `)}
                      </ul>
                    </div>`:X``}
            </div>
          `:X``}
    `}render(){return X`
      <div id="animation-container" class=${this.controls?`main controls`:`main`} lang="en" role="img" aria-label="lottie-animation-container">
        <div id="animation" class=${this.controls?`animation controls`:`animation`} style="background:${this.background};">
          ${this._dotLottieCommonPlayer?.currentState===On.Error?X` <div class="error">⚠️</div> `:void 0}
        </div>
        ${this.controls?this.renderControls():void 0}
      </div>
    `}};v([Q({type:String})],$.prototype,`defaultTheme`,2),v([Br(`#animation`)],$.prototype,`container`,2),v([Q()],$.prototype,`playMode`,2),v([Q({type:Boolean})],$.prototype,`autoplay`,2),v([Q({type:String})],$.prototype,`background`,2),v([Q({type:Boolean})],$.prototype,`controls`,2),v([Q({type:Number})],$.prototype,`direction`,2),v([Q({type:Boolean})],$.prototype,`hover`,2),v([Q({type:String})],$.prototype,`loop`,2),v([Q({type:String})],$.prototype,`renderer`,2),v([Q({type:Number})],$.prototype,`speed`,2),v([Q({type:String})],$.prototype,`src`,2),v([Q()],$.prototype,`intermission`,2),v([Q({type:String})],$.prototype,`activeAnimationId`,2),v([Q({type:Boolean})],$.prototype,`light`,2),v([Q({type:Boolean})],$.prototype,`worker`,2),v([Q({type:String})],$.prototype,`activeStateId`,2),v([Rr()],$.prototype,`_seeker`,2),customElements.get(Ur)||customElements.define(Ur,$);function Wr(e){return!e||e===document.body?!1:getComputedStyle(e).position===`fixed`||Wr(e.parentElement)}function Gr(e){let t=window.scrollY,n=Math.floor(t/e),r=t%e;return n%2==0?r/e*100:100-r/e*100}function Kr(e){let t=window.innerHeight,n=document.documentElement.scrollTop+t,r=e.getBoundingClientRect().top+window.scrollY,i=r+e.offsetHeight+t,a=(n-r)/(i-r)*100;return Math.max(Math.min(a,100),0)}function qr(e,t){return Math.round(t/100*e)}function Jr(e,t){let n=i(null),r=new Map;function a(){if(d(),n.value=null,!t.value){n.value=e.value;return}let r=document.querySelectorAll(t.value);r.length>0&&r[0]instanceof HTMLElement&&(n.value=r[0]);for(let t of r)if(t instanceof HTMLElement&&t.contains(e.value)){n.value=t;break}n.value||=e.value}function s(e,t,i=!1){n.value?.addEventListener(e,t,i),r.set(e,[t,i])}function u(e,t,i=!1){n.value?.removeEventListener(e,t,i),r.delete(e)}function d(){for(let[e,[t,n]]of r)u(e,t,n)}return l(t,()=>{a()}),c(()=>{a()}),o(()=>{d()}),{lottieContainerRef:n,initContainer:a,addEventListener:s,removeAllEventListener:d}}var Yr=1e3;function Xr(e,t,n,r,i,a){let{lottieContainerRef:s,initContainer:c,addEventListener:l}=Jr(e,n),u=()=>{if(!t.value)return;let e=t.value.getLottie()?.totalFrames;if(e===void 0)return;let n=e;function r(e){if(!(e instanceof MouseEvent)||!s.value)return;let r=s.value.getBoundingClientRect(),i=0;if(i=a.value===`vertical`?(e.clientY-r.top)/r.height*100:(e.clientX-r.left)/r.width*100,!t.value)return;let o=qr(n,i);t.value.seek(o)}l(`mousemove`,r)},d=()=>{function e(){t.value&&(t.value.setDirection(1),t.value.play())}function n(){t.value&&(t.value.setDirection(-1),t.value.play())}l(`mouseenter`,e),l(`mouseleave`,n)},f=()=>{function e(){t.value?.play()}function n(){t.value?.stop()}l(`mouseenter`,e),l(`mouseleave`,n)},p=()=>{if(!t.value)return;let e=t.value.getLottie()?.totalFrames;if(e===void 0)return;let n=e;function r(){if(!t.value)return;let e=Gr(Yr),r=qr(n,e);t.value.seek(r)}document.addEventListener(`scroll`,r);function i(){document.removeEventListener(`scroll`,r)}return i},m=()=>{if(!t.value||!s.value)return;let e=!1,n=t.value.getLottie()?.totalFrames;if(n===void 0)return;let r=n,i=new IntersectionObserver(t=>{let n=t[0];n&&(n.isIntersecting&&!e?o():!n.isIntersecting&&e&&c(),e=n.isIntersecting)},{threshold:0});i.observe(s.value);function a(){if(!t.value||!e||!s.value)return;let n=Kr(s.value),i=qr(r,n);t.value.seek(i)}function o(){document.addEventListener(`scroll`,a)}function c(){document.removeEventListener(`scroll`,a)}function l(){i&&i.disconnect(),c()}return l},h=()=>{function e(){t.value&&(t.value.seek(`0%`),t.value?.play())}l(`click`,e)},g=()=>{if(!t.value||!s.value)return;let e=new IntersectionObserver(e=>{let a=e[0];a&&a.isIntersecting&&setTimeout(()=>{if(t.value){if(!i.value){let e=()=>{n(),t.value&&t.value.removeEventListener(`complete`,e)};t.value.addEventListener(`complete`,e)}t.value?.play()}},r.value??0)},{threshold:.3});e.observe(s.value);function n(){e&&e.disconnect()}return n},_;function v(t){t.playType&&(_&&=(_(),void 0),c(),t.playType===`scroll`?_=Wr(e.value)?p():m():t.playType===`hover`?_=t.hold?d():f():t.playType===`cursor`?_=u():t.playType===`click`?_=h():t.playType===`appear`&&(_=g()))}return o(()=>{_&&_()}),{setEvent:v}}var Zr=e({default:()=>Qr}),Qr=n({name:`LottieRenderer`,props:{...p},setup(e){let n=m(e),d=n.getDomRef(!0),p=i(null),g=r(()=>f(e.studioDom.content?.lottie??{},e.rm)),{setEvent:_}=Xr(d,p,u(()=>g.value?.containerId),u(()=>g.value?.delay),u(()=>g.value?.loop),u(()=>g.value?.cursorDirection));async function v(){if(!d.value)return;d.value.innerHTML=``;let e=g.value;if(!e||!e.src||!e.playType)return;let t=document.createElement(`dotlottie-player`);{t.setAttribute(`src`,e.src),e.playType===`autoplay`&&t.setAttribute(`autoplay`,`true`),e.controls&&t.setAttribute(`controls`,`true`),e.speed&&t.setAttribute(`speed`,String(e.speed));let n=e.playType===`hover`&&e.hold,r=!(!e.loop||n);t.setAttribute(`loop`,String(r))}d.value.appendChild(t),p.value=t;let n=()=>{_(e),t.removeEventListener(`ready`,n)};t.addEventListener(`ready`,n)}let y=t(`a`);return l([()=>g.value?.playType,()=>g.value?.controls,()=>g.value?.loop,()=>g.value?.hold,()=>g.value?.speed,()=>g.value?.src,()=>g.value?.cursorDirection,()=>g.value?.delay,()=>g.value?.containerId,()=>e.studioDom.style?.position,()=>e.studioDom.style?.[`@small`]?.position,()=>e.studioDom.style?.[`@tablet`]?.position,()=>e.studioDom.style?.[`@mobile`]?.position,()=>e.studioDom.style?.[`@mini`]?.position],async()=>{y.value+=`a`,await s(),v()}),c(()=>{v()}),o(()=>{p.value?.disconnectedCallback()}),()=>a(`div`,{key:y.value,ref:d,...n.attrs.value,class:h({sd:!0},n.userClass.value),style:n.style.value})}});export{on as a,Qr as default,J as i,H as n,V as r,Zr as t};