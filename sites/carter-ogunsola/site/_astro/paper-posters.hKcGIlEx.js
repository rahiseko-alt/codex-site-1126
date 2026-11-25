import{r as e,t}from"./mesh.XGo83aZ8.js";import{n,r}from"./assets.DBbF6dnf.js";import{$ as i,Bt as a,E as o,Et as s,Kt as c,O as l,Ot as u,St as d,T as f,U as p,Zt as m,b as h,d as g,f as _,g as v,kt as y,l as b,n as ee,ot as x,pt as te,qt as S,u as C}from"./three.module.CyZ8uBPR.js";var w=2924/2067,T=1151/867,E=[{org:`GSAP`,title:`GSAP Showcase`,chip:`Featured`,date:`Oct 6`,tier:`list`},{org:`CSS Winner`,title:`Site of the Day`,date:`Oct 7`,tier:`jury`},{org:`Directoryyy`,title:`Directoryyy`,chip:`Featured`,date:`Oct 10`,tier:`list`},{org:`The FWA`,title:`FWA of the Day`,date:`Oct 11`,tier:`jury`,cert:`fwa-fotd`,aspect:w},{org:`Three.js Resources`,title:`Three.js Resources`,chip:`Showcase`,date:`Oct 11`,tier:`list`},{org:`GSAP`,title:`Site of the Day`,date:`Oct 19`,tier:`jury`},{org:`Awwwards`,title:`Honors`,date:`Oct 21`,tier:`aww`,cert:`hm`},{org:`Astro`,title:`Astro Showcase`,chip:`Featured`,date:`Oct`,tier:`list`},{org:`Astro`,title:`What's new in Astro`,chip:`Newsletter`,date:`Oct 31`,tier:`list`},{org:`CSS Design Awards`,title:`Website of the Day`,date:`Nov 2`,tier:`jury`,cert:`cssda-wotd`,aspect:w},{org:`CSS Design Awards`,title:`Best UI Design`,date:`Nov 2`,tier:`jury`,cert:`cssda-ui`,aspect:w},{org:`CSS Design Awards`,title:`Best UX Design`,date:`Nov 2`,tier:`jury`,cert:`cssda-ux`,aspect:w},{org:`CSS Design Awards`,title:`Best Innovation`,date:`Nov 2`,tier:`jury`,cert:`cssda-inn`,aspect:w},{org:`A1 Gallery`,title:`A1 Gallery`,chip:`Featured`,date:`Nov 3`,tier:`list`},{org:`Minimal Gallery`,title:`Minimal Gallery`,chip:`Featured`,date:`Nov 5`,tier:`list`},{org:`Awwwards`,title:`Developer Award`,date:`Nov 19`,tier:`aww`,cert:`dotd`},{org:`Awwwards`,title:`Site of the Day`,date:`Nov 19`,tier:`aww`,cert:`sotd`}],D=E.length,O={GSAP:{field:`#0E100F`,ink:`#FFFCE1`,accent:`#0AE448`,logo:`gsap.svg`},"CSS Winner":{field:`#E5463B`,ink:`#FFFFFF`,accent:`#FFFFFF`,logo:`csswinner-logo.png`},Directoryyy:{field:`#ECEAE3`,ink:`#121212`,accent:`#121212`},Astro:{field:`#17191E`,ink:`#FFFFFF`,accent:`#BC52EE`,accent2:`#3245FF`,logo:`astro.svg`},"A1 Gallery":{field:`#F1EEE6`,ink:`#141414`,accent:`#141414`,logo:`a1-full.png`},"Minimal Gallery":{field:`#FFFFFF`,ink:`#000000`,accent:`#000000`},"Three.js Resources":{field:`#000000`,ink:`#FFFFFF`,accent:`#FFFFFF`,logo:`threejs.svg`,invertLogo:!0,logoScale:1.6}},k=[`gsap.svg`,`astro.svg`,`threejs.svg`,`csswinner-logo.png`,`a1-full.png`],A={tissue:{stiff:-5.8,drag:11,spring:26,hold:5,gust:.06},bond:{stiff:-7.1,drag:8,spring:36,hold:6,gust:.03},card:{stiff:-8.3,drag:6,spring:50,hold:8,gust:.015}},j={paper:`bond`,air:1,flutter:1,shade:1,contact:.16,ambient:.12,soft:2.2,depth:.22,snap:`on`},M=[{key:`paper`,label:`Paper`,type:`segment`,default:j.paper,options:[{id:`tissue`,label:`Tissue`},{id:`bond`,label:`Bond`},{id:`card`,label:`Card`}]},{key:`air`,label:`Air`,type:`range`,min:0,max:3,step:.05,default:j.air},{key:`flutter`,label:`Flutter`,type:`range`,min:0,max:4,step:.05,default:j.flutter},{key:`shade`,label:`Shade`,type:`range`,min:0,max:2,step:.05,default:j.shade},{key:`contact`,label:`Contact`,type:`range`,min:0,max:.6,step:.01,default:j.contact},{key:`ambient`,label:`Ambient`,type:`range`,min:0,max:.6,step:.01,default:j.ambient},{key:`soft`,label:`Soft`,type:`range`,min:.5,max:4,step:.1,default:j.soft},{key:`depth`,label:`Depth`,type:`range`,min:0,max:.6,step:.01,default:j.depth},{key:`snap`,label:`Snap`,type:`segment`,default:j.snap,options:[{id:`off`,label:`Off`},{id:`on`,label:`On`}]}],N=.42,ne=.3,re=-.58,P=8,F=1150,ie=7e3,ae=4800,I=90,oe=.8,se=10,ce=.3,le=7,ue=1.1,de=1.4,fe=180,pe=160,me=2,L=800,he=-14,ge=-80,_e=150,ve=Math.abs(Math.sin(re))*.5,ye=new S(.32,-.48,-1).normalize(),be=new S(-.38,.55,.74).normalize(),R={Oct:`October`,Nov:`November`},xe=e=>{let[t,n]=e.date.split(` `);return n?`${n} ${R[t]} 2026`:`${R[t]} 2026`},Se=e=>e.tier===`list`?`Gallery feature`:`Jury award`,Ce=e=>e.title===e.org?e.chip??Se(e):e.org,we=e=>String(e).padStart(2,`0`),Te=e=>e*e*e*(e*(e*6-15)+10),Ee=class{w;h;nx;ny;n;seed;local;pos;prev;vel;nrm;free;reach;ring;dev;texel;anchor;la;lb;lrest;lkind;origin=[0,0,0];basis=[1,0,0,0,1,0,0,0,1];simOrigin=[0,0,0];felt=[0,0,0];asleep=!0;ironing=!1;ironT=0;ironSpan=1;quiet=0;constructor(e,t,n,r,i){this.w=e,this.h=t,this.nx=n,this.ny=r,this.n=n*r,this.seed=i;let a=this.n;this.local=new Float32Array(a*2),this.pos=new Float32Array(a*3),this.prev=new Float32Array(a*3),this.vel=new Float32Array(a*3),this.nrm=new Float32Array(a*3),this.free=new Float32Array(a),this.reach=new Float32Array(a),this.ring=new Float32Array(a),this.dev=new Float32Array(a*3),this.texel=new Float32Array(a*4);for(let i=0;i<r;i++)for(let a=0;a<n;a++){let o=i*n+a;this.local[o*2]=(a/(n-1)-.5)*e,this.local[o*2+1]=(.5-i/(r-1))*t}let o=Math.sin(i*91.17+3.1)*15731.743,s=o-Math.floor(o),c=i*2.39996,l=.05+.07*s;this.anchor=[Math.cos(c)*l*e,Math.sin(c)*l*t],this.buildPins(),this.buildLinks()}buildPins(){let{n:e,local:t,free:n,reach:r,ring:i,nx:a,ny:o,w:s,h:c}=this,l=s/(a-1),u=c/(o-1),[d,f]=this.anchor;for(let a=0;a<e;a++){let e=t[a*2]-d,o=t[a*2+1]-f,s=Math.hypot(e/l,o/u);i[a]=s,r[a]=Math.hypot(e,o),n[a]=s<=1.25?0:1}}buildLinks(){let{nx:e,ny:t,local:n,ring:r}=this,i=[],a=(a,o,s,c,l)=>{if(s<0||s>=e||c<0||c>=t)return;let u=o*e+a,d=c*e+s,f=Math.hypot(n[u*2]-n[d*2],n[u*2+1]-n[d*2+1]);i.push({a:u,b:d,rest:f,kind:l,ring:Math.min(r[u],r[d])})};for(let n=0;n<t;n++)for(let t=0;t<e;t++)a(t,n,t+1,n,0),a(t,n,t,n+1,0),a(t,n,t+1,n+1,1),a(t,n,t-1,n+1,1),a(t,n,t+2,n,2),a(t,n,t,n+2,2),a(t,n,t+4,n,2),a(t,n,t,n+4,2);i.sort((e,t)=>e.ring-t.ring),this.la=Uint16Array.from(i,e=>e.a),this.lb=Uint16Array.from(i,e=>e.b),this.lrest=Float32Array.from(i,e=>e.rest),this.lkind=Uint8Array.from(i,e=>e.kind)}restAt(e,t,n){let r=this.basis,i=this.local[e*2],a=this.local[e*2+1];return n[0]=t[0]+r[0]*i+r[3]*a,n[1]=t[1]+r[1]*i+r[4]*a,n[2]=t[2]+r[2]*i+r[5]*a,n}reset(){let e=[0,0,0];for(let t=0;t<this.n;t++)this.restAt(t,this.origin,e),this.pos[t*3]=e[0],this.pos[t*3+1]=e[1],this.pos[t*3+2]=e[2];this.prev.set(this.pos),this.vel.fill(0),this.simOrigin=[...this.origin],this.felt=[0,0,0],this.asleep=!0,this.ironing=!1,this.quiet=0}wake(){this.ironing&&(this.ironing=!1,this.vel.fill(0)),this.asleep=!1,this.quiet=0}step(e,t,n){e=Math.min(e,1/30);let r=this.origin,i=this.simOrigin,a=(r[0]-i[0])/e,o=(r[1]-i[1])/e,s=(r[2]-i[2])/e,c=Math.hypot(a,o,s);if(this.asleep&&c<.5){this.reset();return}if(c>=.5&&this.wake(),c>F){let e=F/c;a*=e,o*=e,s*=e}let l=a-this.felt[0],u=o-this.felt[1],d=s-this.felt[2],f=Math.hypot(l,u,d),p=ie*e;f>p&&(a=this.felt[0]+l*p/f,o=this.felt[1]+u*p/f,s=this.felt[2]+d*p/f),this.felt=[a,o,s];let m=r[0]-i[0]-a*e,h=r[1]-i[1]-o*e,g=r[2]-i[2]-s*e,{n:_,pos:v,prev:y,vel:b,nrm:ee,free:x,lkind:te,la:S,lb:C,lrest:w,reach:T}=this;if(m||h||g){for(let e=0;e<_;e++)v[e*3]+=m,v[e*3+1]+=h,v[e*3+2]+=g;i[0]+=m,i[1]+=h,i[2]+=g}if(this.ironing){this.iron(e);return}let E=e/P,D=E*E,O=[0,n.shear/D,n.bend/D],k=Math.min(c,1600)*n.gust,A=[0,0,0],j=[0,0,0],M=this.anchor;this.normals();for(let r=1;r<=P;r++){let c=r/P;j[0]=i[0]+a*e*c,j[1]=i[1]+o*e*c,j[2]=i[2]+s*e*c;for(let e=0;e<_;e++){let r=e*3;if(y[r]=v[r],y[r+1]=v[r+1],y[r+2]=v[r+2],this.restAt(e,j,A),!x[e]){v[r]=A[0],v[r+1]=A[1],v[r+2]=A[2];continue}let i=b[r],c=b[r+1],l=b[r+2],u=v[r],d=v[r+1],f=k*(Math.sin(u*.009+t*2.1+this.seed)+Math.sin(d*.013-t*1.6+u*.003)),p=ee[r],m=ee[r+1],h=ee[r+2],g=i*p+c*m+(l-f)*h,_=v[r]-A[0],te=v[r+1]-A[1],S=v[r+2]-A[2],C=Math.hypot(_,te,S),w=n.spring*(C>I?(I+(C-I)*.15)/C:1);i+=(-w*_-n.hold*(i-a)-n.drag*g*p-oe*i)*E,c+=(-w*te-n.hold*(c-o)-n.drag*g*m-oe*c)*E,l+=(-w*S-n.hold*(l-s)-n.drag*g*h-oe*l)*E,v[r]+=i*E,v[r+1]+=c*E,v[r+2]+=l*E}for(let e=0;e<S.length;e++){let t=S[e],n=C[e],r=x[t],i=x[n],a=r+i;if(!a)continue;let o=t*3,s=n*3,c=v[s]-v[o],l=v[s+1]-v[o+1],u=v[s+2]-v[o+2],d=Math.hypot(c,l,u);if(d<1e-6)continue;let f=(d-w[e])/(a+O[te[e]])/d;v[o]+=c*f*r,v[o+1]+=l*f*r,v[o+2]+=u*f*r,v[s]-=c*f*i,v[s+1]-=l*f*i,v[s+2]-=u*f*i}let l=this.basis,u=j[0]+l[0]*M[0]+l[3]*M[1],d=j[1]+l[1]*M[0]+l[4]*M[1],f=j[2]+l[2]*M[0]+l[5]*M[1],p=ae*ae;for(let e=0;e<_;e++){if(!x[e])continue;let t=e*3,n=v[t]-u,r=v[t+1]-d,i=v[t+2]-f,c=n*n+r*r+i*i,l=T[e];if(c>l*l){let e=l/Math.sqrt(c);v[t]=u+n*e,v[t+1]=d+r*e,v[t+2]=f+i*e}let m=(v[t]-y[t])/E,h=(v[t+1]-y[t+1])/E,g=(v[t+2]-y[t+2])/E,_=(m-a)**2+(h-o)**2+(g-s)**2;if(_>p){let e=Math.sqrt(p/_);m=a+(m-a)*e,h=o+(h-o)*e,g=s+(g-s)*e}b[t]=m,b[t+1]=h,b[t+2]=g}}i[0]=r[0],i[1]=r[1],i[2]=r[2];let N=0;for(let e=0;e<_;e++){let t=e*3,n=Math.hypot(b[t]-a,b[t+1]-o,b[t+2]-s);n>N&&(N=n)}this.quiet=c<2&&N<se?this.quiet+e:0,this.quiet>ce&&this.beginIron()}beginIron(){let e=[0,0,0],t=0;for(let n=0;n<this.n;n++){this.restAt(n,this.origin,e);let r=n*3;this.dev[r]=this.pos[r]-e[0],this.dev[r+1]=this.pos[r+1]-e[1],this.dev[r+2]=this.pos[r+2]-e[2],t=Math.max(t,Math.hypot(this.dev[r],this.dev[r+1],this.dev[r+2]))}this.ironing=!0,this.ironT=0,this.ironSpan=Math.min(1.8,.7+t/160)}iron(e){this.ironT+=e;let t=Math.min(1,this.ironT/this.ironSpan),n=1-Te(t),r=[0,0,0];for(let e=0;e<this.n;e++){this.restAt(e,this.origin,r);let t=e*3;this.pos[t]=r[0]+this.dev[t]*n,this.pos[t+1]=r[1]+this.dev[t+1]*n,this.pos[t+2]=r[2]+this.dev[t+2]*n}this.prev.set(this.pos),this.vel.fill(0),this.simOrigin=[...this.origin],t>=1&&this.reset()}normals(){let{nx:e,ny:t,pos:n,nrm:r}=this;for(let i=0;i<t;i++)for(let a=0;a<e;a++){let o=(i*e+Math.max(0,a-1))*3,s=(i*e+Math.min(e-1,a+1))*3,c=(Math.max(0,i-1)*e+a)*3,l=(Math.min(t-1,i+1)*e+a)*3,u=n[s]-n[o],d=n[s+1]-n[o+1],f=n[s+2]-n[o+2],p=n[c]-n[l],m=n[c+1]-n[l+1],h=n[c+2]-n[l+2],g=d*h-f*m,_=f*p-u*h,v=u*m-d*p,y=Math.hypot(g,_,v)||1,b=(i*e+a)*3;r[b]=g/y,r[b+1]=_/y,r[b+2]=v/y}}pack(){let{n:e,pos:t,texel:n}=this;for(let r=0;r<e;r++)n[r*4]=t[r*3],n[r*4+1]=t[r*3+1],n[r*4+2]=t[r*3+2],n[r*4+3]=1}},z=(e,t)=>`${e} ${t}px "Oracle", system-ui, sans-serif`,B=e=>`400 ${e}px "PP Neue Montreal Mono", ui-monospace, monospace`,V=(e,t,n,r,i,a)=>{let o=i;for(;o>20&&(e.font=z(n,o),e.letterSpacing=`${a*o}px`,!(e.measureText(t).width<=r));o-=4);return o},H=(e,t,n,r,i,a)=>{let o=O[t.org],s=o.logo?n[o.logo]:void 0;if(s){a*=o.logoScale??1;let t=s.naturalWidth/s.naturalHeight*a;o.invertLogo?(e.save(),e.filter=`invert(1)`,e.drawImage(s,r,i,t,a),e.restore()):e.drawImage(s,r,i,t,a);return}e.fillStyle=o.ink,e.font=z(580,a*.62),e.letterSpacing=`${-.02*a}px`,e.textBaseline=`top`,e.fillText(t.org,r,i+a*.12)},De=(e,t,n)=>{let r=1300,i=Math.round(r*T),a=document.createElement(`canvas`);a.width=r,a.height=i;let o=a.getContext(`2d`),s=O[e.org],[c,l]=e.date.split(` `);o.fillStyle=s.field,o.fillRect(0,0,r,i);let u=l?l.padStart(2,`0`):c.toUpperCase();o.textBaseline=`alphabetic`;let d=l?1180:V(o,u,600,r*1.08,900,-.05);if(o.font=z(600,d),o.letterSpacing=`${-.065*d}px`,s.accent2){let e=o.createLinearGradient(0,i*.15,r,i*.6);e.addColorStop(0,s.accent2),e.addColorStop(1,s.accent),o.fillStyle=e}else o.fillStyle=s.accent;o.fillText(u,-.06*d,i*.69),o.fillStyle=s.ink,o.textBaseline=`top`,H(o,e,n,96,96,64),o.fillStyle=s.ink,o.font=B(28),o.letterSpacing=`1px`,o.textAlign=`right`,o.fillText(`N°${we(t+1)} / ${D}`,1204,114),o.textAlign=`left`,o.font=z(400,30),o.letterSpacing=`3px`,o.fillText(xe(e).toUpperCase(),96,200),o.textBaseline=`alphabetic`,o.globalAlpha=.3,o.fillRect(96,1480,1108,2),o.globalAlpha=1;let f=V(o,e.title,580,524,60,-.035);o.font=z(580,f),o.letterSpacing=`${-.035*f}px`,o.fillText(e.title,96,1556),o.globalAlpha=.62,o.font=z(400,34),o.letterSpacing=`0px`,o.fillText(e.title===e.org?e.chip??``:e.org,96,1606),o.globalAlpha=1,o.font=z(400,26),o.letterSpacing=`2.6px`,o.fillText(Se(e).toUpperCase(),650,1542),o.globalAlpha=.62,o.fillText(`CARTEROGUNSOLA.COM`,650,1598),o.globalAlpha=1;let p=document.createElement(`canvas`);p.width=L,p.height=Math.round(L*T);let m=p.getContext(`2d`);return m.imageSmoothingQuality=`high`,m.drawImage(a,0,0,p.width,p.height),a.width=a.height=0,p},Oe=e=>{E.forEach((t,n)=>{t.cert&&Re(r(`lab/paper-posters/certs/${t.cert}.jpg`,L)).then(t=>t&&e(n,t))});let t={};Promise.allSettled([document.fonts.load(z(600,100)),document.fonts.load(z(580,100)),document.fonts.load(z(400,30)),document.fonts.load(B(30)),...k.map(e=>Re(n(`lab/paper-posters/logos/${e}`)).then(n=>{n&&(t[e]=n)}))]).then(()=>E.forEach((n,r)=>!n.cert&&e(r,De(n,r,t))))},U=`
  uniform sampler2D uPos;
  uniform ivec2 uN;
  in vec2 aGrid;
  vec3 cp(int i, int j) {
    int ci = clamp(i, 0, uN.x - 1);
    int cj = clamp(j, 0, uN.y - 1);
    vec3 p = texelFetch(uPos, ivec2(ci, cj), 0).xyz;
    if (ci == i && cj == j) return p;
    int mi = clamp(2 * ci - i, 0, uN.x - 1);
    int mj = clamp(2 * cj - j, 0, uN.y - 1);
    return 2.0 * p - texelFetch(uPos, ivec2(mi, mj), 0).xyz;
  }
  vec4 basis(float t) { float s = 1.0 - t; return vec4(s * s * s, 3.0 * t * t * t - 6.0 * t * t + 4.0, -3.0 * t * t * t + 3.0 * t * t + 3.0 * t + 1.0, t * t * t) / 6.0; }
  vec4 slope(float t) { float s = 1.0 - t; return vec4(-s * s, 3.0 * t * t - 4.0 * t, -3.0 * t * t + 2.0 * t + 1.0, t * t) * 0.5; }
  void surface(out vec3 P, out vec3 Pu, out vec3 Pv) {
    ivec2 cell = clamp(ivec2(floor(aGrid)), ivec2(0), uN - 2);
    vec2 t = aGrid - vec2(cell);
    vec4 bu = basis(t.x), bv = basis(t.y), du = slope(t.x), dv = slope(t.y);
    P = vec3(0.0); Pu = vec3(0.0); Pv = vec3(0.0);
    for (int b = 0; b < 4; b++) {
      vec3 row = vec3(0.0), rowU = vec3(0.0);
      for (int a = 0; a < 4; a++) {
        vec3 c = cp(cell.x + a - 1, cell.y + b - 1);
        row += c * bu[a];
        rowU += c * du[a];
      }
      P += row * bv[b];
      Pu += rowU * bv[b];
      Pv += row * dv[b];
    }
  }
`,ke=`${U}
  out vec2 vUv;
  out vec3 vN;
  out vec3 vW;
  void main() {
    vec3 P, Pu, Pv;
    surface(P, Pu, Pv);
    vN = normalize(cross(Pv, Pu));
    vW = P;
    vUv = aGrid / vec2(uN - 1);
    gl_Position = projectionMatrix * viewMatrix * vec4(P, 1.0);
  }
`,Ae=`
  uniform sampler2D uMap;
  uniform sampler2D uGrain;
  uniform vec3 uLight;
  uniform vec3 uRest;
  uniform vec3 uStock;
  uniform float uShade;
  uniform float uAspect;
  in vec2 vUv;
  in vec3 vN;
  in vec3 vW;
  out vec4 fragColor;
  float lit(vec3 n) { return clamp((dot(n, uLight) + 0.55) / 1.55, 0.0, 1.0); }
  void main() {
    vec3 n = normalize(vN);
    vec3 rest = uRest;
    bool back = !gl_FrontFacing;
    if (back) { n = -n; rest = -rest; }
    vec2 fw = max(fwidth(vUv), vec2(1e-6));
    vec2 e = min(vUv, 1.0 - vUv) / fw;
    float edge = clamp(min(e.x, e.y) + 0.5, 0.0, 1.0);
    vec3 ink = texture(uMap, vUv).rgb;
    vec3 col = back ? mix(uStock, vec3(dot(ink, vec3(0.333))), 0.07) : ink;
    float ratio = lit(n) / max(lit(rest), 1e-3);
    float l = 1.0 + uShade * (ratio - 1.0);
    float g = texture(uGrain, vUv * vec2(uAspect, 1.0) * 1.6).r - 0.5;
    col *= 1.0 + g * (0.05 + clamp(abs(l - 1.0) * 0.6, 0.0, 0.12));
    col = col * clamp(l, 0.25, 1.0) + (1.0 - col) * max(l - 1.0, 0.0) * 0.35;
    vec3 toEye = normalize(cameraPosition - vW);
    float graze = pow(1.0 - abs(dot(n, toEye)), 3.0) - pow(1.0 - abs(dot(rest, toEye)), 3.0);
    col += (1.0 - col) * max(graze, 0.0) * 0.12;
    fragColor = vec4(col * edge, edge);
  }
`,je=`${U}
  uniform vec3 uFall;
  uniform float uGround;
  uniform float uBase;
  uniform float uLift;
  out float vNear;
  void main() {
    vec3 P, Pu, Pv;
    surface(P, Pu, Pv);
    float floorZ = uGround + uBase;
    vNear = 1.0 - smoothstep(0.0, uLift, P.z - floorZ);
    vec3 S = P + uFall * ((floorZ - P.z) / uFall.z);
    gl_Position = projectionMatrix * viewMatrix * vec4(S, 1.0);
  }
`,Me=`out vec2 vUv; void main() { vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }`,Ne=`
  uniform sampler2D uTex;
  uniform vec2 uStep;
  in vec2 vUv;
  out vec4 fragColor;
  void main() {
    float w[5] = float[](0.227, 0.194, 0.121, 0.054, 0.016);
    vec2 a = texture(uTex, vUv).rg * w[0];
    for (int i = 1; i < 5; i++) {
      a += texture(uTex, vUv + uStep * float(i)).rg * w[i];
      a += texture(uTex, vUv - uStep * float(i)).rg * w[i];
    }
    fragColor = vec4(a, 0.0, 1.0);
  }
`,Pe=`
  uniform sampler2D uAmb;
  uniform sampler2D uCon;
  uniform float uAmbK;
  uniform float uConK;
  in vec2 vUv;
  out vec4 fragColor;
  void main() {
    float a = 1.0 - (1.0 - texture(uAmb, vUv).r * uAmbK) * (1.0 - texture(uCon, vUv).g * uConK);
    fragColor = vec4(0.0, 0.0, 0.0, a);
  }
`,Fe=`
.pp{position:absolute;inset:0;overflow:hidden;
  -webkit-user-select:none;user-select:none;outline:none;}
.pp:focus-visible{outline:2px solid var(--ink);outline-offset:-4px;}
.pp__gl{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:grab;touch-action:none;}
.pp.is-held .pp__gl{cursor:grabbing;}
.pp__reg{--row:1.5rem;--rows:7;position:absolute;
  inset-inline-start:calc(var(--s-16) + var(--s-2));
  inset-block-start:calc(var(--s-40) + var(--s-24) + var(--s-4));
  width:min(29rem,100% - 2.25rem);height:calc(var(--row) * var(--rows));
  overflow:hidden;pointer-events:none;contain:strict;
  -webkit-mask-image:linear-gradient(to bottom,transparent 0%,rgb(0 0 0/.04) 6%,rgb(0 0 0/.16) 12%,rgb(0 0 0/.36) 18%,rgb(0 0 0/.62) 24%,rgb(0 0 0/.86) 30%,#000 36%,#000 64%,rgb(0 0 0/.86) 70%,rgb(0 0 0/.62) 76%,rgb(0 0 0/.36) 82%,rgb(0 0 0/.16) 88%,rgb(0 0 0/.04) 94%,transparent 100%);
  mask-image:linear-gradient(to bottom,transparent 0%,rgb(0 0 0/.04) 6%,rgb(0 0 0/.16) 12%,rgb(0 0 0/.36) 18%,rgb(0 0 0/.62) 24%,rgb(0 0 0/.86) 30%,#000 36%,#000 64%,rgb(0 0 0/.86) 70%,rgb(0 0 0/.62) 76%,rgb(0 0 0/.36) 82%,rgb(0 0 0/.16) 88%,rgb(0 0 0/.04) 94%,transparent 100%);}
.pp__entry{position:absolute;inset-inline:0;top:calc(var(--row) * (var(--rows) - 1) / 2);
  height:var(--row);line-height:var(--row);display:grid;
  grid-template-columns:2.75rem minmax(0,1fr) 8rem 3.75rem;column-gap:var(--s-12);
  align-items:baseline;will-change:transform;}
.pp__entry>span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.pp__no,.pp__date{font-family:var(--font-mono);font-size:.6875rem;font-variant-numeric:tabular-nums;}
.pp__date{text-align:end;}
.pp__name{font-family:var(--font-sans);font-weight:580;font-size:.9375rem;letter-spacing:-.01em;}
.pp__by{font-family:var(--font-sans);font-size:.8125rem;}
@media (max-width:37.5rem){
  .pp__reg{--rows:5;}
  .pp__entry{grid-template-columns:2.75rem minmax(0,1fr) 3.75rem;}
  .pp__by{display:none;}
}
.pp__flat{position:absolute;inset:0;display:flex;align-items:center;gap:var(--s-24);
  overflow-x:auto;scroll-snap-type:x mandatory;padding:var(--s-40) 50%;touch-action:pan-x;}
.pp__slot{flex:0 0 auto;height:min(60%,32rem);margin:0;scroll-snap-align:center;
  background:var(--fill);}
.pp__slot>*{display:block;width:100%;height:100%;object-fit:cover;}
.pp__sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;
  clip:rect(0 0 0 0);white-space:nowrap;border:0;}
`,Ie=`exp-pp-style`;function Le(){if(document.getElementById(Ie))return;let e=document.createElement(`style`);e.id=Ie,e.textContent=Fe,document.head.appendChild(e)}var Re=e=>new Promise(t=>{let n=new Image;n.crossOrigin=`anonymous`,n.decoding=`async`,n.onload=()=>t(n),n.onerror=()=>t(null),n.src=e}),ze=(e,t,n)=>{let r=(e-1)*n+1,i=(t-1)*n+1,a=new Float32Array(r*i*2);for(let e=0;e<i;e++)for(let t=0;t<r;t++)a[(e*r+t)*2]=t/n,a[(e*r+t)*2+1]=e/n;let o=[];for(let e=0;e<i-1;e++)for(let t=0;t<r-1;t++){let n=e*r+t,i=n+1,a=n+r,s=a+1;o.push(n,a,i,i,a,s)}let s=new C;return s.setAttribute(`aGrid`,new b(a,2)),s.setAttribute(`position`,new b(new Float32Array(r*i*3),3)),s.setIndex(o),s},Be=(e,t)=>{let n=Math.cos(e),r=Math.sin(e),i=Math.cos(t),a=Math.sin(t),o=e=>[e[0]*n-e[1]*r,e[0]*r+e[1]*n,e[2]];return[...o([i,0,-a]),...o([0,1,0]),...o([a,0,i])]},W={mount(r){Le();let w=matchMedia(`(prefers-reduced-motion: reduce)`).matches,O={...j},k=new AbortController,{signal:M}=k,P=document.createElement(`div`);P.className=`pp`,P.tabIndex=0,P.setAttribute(`role`,`region`),P.setAttribute(`aria-roledescription`,`carousel`),P.setAttribute(`aria-label`,`Award posters`),P.innerHTML=`
      <div class="pp__reg" aria-hidden="true"></div>
      <canvas class="pp__gl" aria-hidden="true"></canvas>
      <p class="pp__sr" aria-live="polite" data-pp-live></p>`,r.append(P);let F=P.querySelector(`.pp__gl`),ie=P.querySelector(`.pp__reg`),ae=P.querySelector(`[data-pp-live]`),I;try{I=new ee({canvas:F,antialias:!0,alpha:!0,premultipliedAlpha:!0})}catch{F.remove(),ie.remove();let e=document.createElement(`div`);e.className=`pp__flat`;let t=E.map(t=>{let n=document.createElement(`figure`);return n.className=`pp__slot`,n.style.aspectRatio=`1 / ${t.aspect??T}`,n.setAttribute(`aria-label`,`${t.title}, ${t.org}, ${xe(t)}`),e.append(n),n});P.prepend(e);let n=!0;return Oe((e,r)=>{n&&(r instanceof HTMLImageElement&&(r.alt=``),t[e].replaceChildren(r))}),e.lastElementChild?.scrollIntoView({inline:`center`,block:`nearest`}),()=>{n=!1,k.abort(),P.remove()}}I.setPixelRatio(Math.min(devicePixelRatio||1,me)),I.autoClear=!1,I.setClearColor(0,0);let oe=I.capabilities.getMaxAnisotropy(),se=e=>{let t=e instanceof HTMLCanvasElement?new _(e):new a(e);return t.colorSpace=``,t.flipY=!1,t.anisotropy=oe,t.minFilter=p,t.generateMipmaps=!0,t.needsUpdate=!0,t},ce=t=>{let n=E[t];return se(e(540,540*(n.aspect??T),{seed:17+t*7}))},L=E.map((e,t)=>ce(t)),R=document.createElement(`canvas`);R.width=R.height=2;let Se=R.getContext(`2d`);Se.fillStyle=`#808080`,Se.fillRect(0,0,2,2);let Te=e=>{let t=new a(e);return t.wrapS=t.wrapT=s,t.colorSpace=``,t.needsUpdate=!0,t},z={value:Te(R)},B=new u,V=new u,H=new te(36.87,1,10,2e4),De=new C().setAttribute(`position`,new b(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),U=new i(De);U.frustumCulled=!1;let Fe=new u;Fe.add(U);let Ie=new g,W=new y({glslVersion:o,uniforms:{uTex:{value:null},uStep:{value:new c}},vertexShader:Me,fragmentShader:Ne,depthTest:!1,depthWrite:!1}),G=new y({glslVersion:o,uniforms:{uAmb:{value:null},uCon:{value:null},uAmbK:{value:O.ambient},uConK:{value:O.contact}},vertexShader:Me,fragmentShader:Pe,transparent:!0,premultipliedAlpha:!0,blending:5,blendSrc:201,blendDst:205,depthTest:!1,depthWrite:!1}),Ve={value:ge},He=[],K=1,q=1,J=[],Y=0,X=0,Z=1,Q=!0,Ue=D-1,We=()=>{let e=A[O.paper],t=10**e.stiff;return{bend:t,shear:t*.1,drag:e.drag*O.air,spring:e.spring,hold:e.hold,gust:e.gust*O.flutter}},Ge=()=>{for(let e of J)B.remove(e.mesh),V.remove(e.shade),e.mesh.geometry.dispose(),e.mesh.material.dispose(),e.shade.material.dispose(),e.data.dispose();J=[]},Ke=()=>Math.min(q*.5,K*(K<640?.82:.42)),$=Be(N,re),qe=[Math.cos(N),Math.sin(N)],Je=(e=!1)=>{let t=Z*D;for(let n of J){let r=n.i*Z-Y;r=((r+t/2)%t+t)%t-t/2;let i=Math.abs(r-n.x)>t/2;n.x=r,n.sheet.origin=[qe[0]*r,qe[1]*r-q*.02,-r*O.depth],n.sheet.basis=$,(e||i)&&n.sheet.reset()}},Ye=()=>{Ge();let e=Ke();J=E.map((t,n)=>{let r=t.aspect??T,a=e,s=e/r,l=Math.round(1+14*r),u=new Ee(s,a,15,l,n+1),p=new h(u.texel,15,l,d,f);p.minFilter=p.magFilter=x;let m=ze(15,l,4),g=new i(m,new y({glslVersion:o,side:2,transparent:!0,premultipliedAlpha:!0,blending:5,blendSrc:201,blendDst:205,uniforms:{uPos:{value:p},uN:{value:new c(15,l)},uMap:{value:L[n]},uGrain:z,uLight:{value:be},uRest:{value:new S($[6],$[7],$[8])},uStock:{value:new v(.95,.94,.92)},uShade:{value:O.shade},uAspect:{value:s/a}},vertexShader:ke,fragmentShader:Ae}));g.frustumCulled=!1;let _=new i(m,new y({glslVersion:o,side:2,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendEquation:104,blendSrc:201,blendDst:201,uniforms:{uPos:{value:p},uN:{value:new c(15,l)},uFall:{value:ye},uGround:Ve,uBase:{value:0},uLift:{value:_e}},vertexShader:je,fragmentShader:`in float vNear; out vec4 fragColor; void main() { fragColor = vec4(1.0, vNear, 0.0, 1.0); }`}));return _.frustumCulled=!1,B.add(g),V.add(_),{i:n,sheet:u,data:p,mesh:g,shade:_,w:s,h:a,x:0}}),Z=Math.max(...J.map(e=>e.w))*1.06,Je(!0),Q=!0},Xe=()=>{let e=P.getBoundingClientRect();if(e.width<2||e.height<2)return;let t=Y/Z,n=X/Z;K=e.width,q=e.height;let r=q>K?ne:N;$=Be(r,re),qe=[Math.cos(r),Math.sin(r)],I.setSize(K,q,!1),H.aspect=K/q,H.position.set(0,0,1.5*q),H.lookAt(0,0,0),H.updateProjectionMatrix();let i=I.getPixelRatio(),a=Math.max(2,Math.round(K*i/4)),o=Math.max(2,Math.round(q*i/4));for(let e of He)e.dispose();He=[0,1,2,3].map(()=>new m(a,o,{type:l}));let s=!J.length;Ye(),s?(Y=X=(D-1)*Z,w||(Y=X+Z*2.5)):(Y=t*Z,X=n*Z),Je(!0)},Ze=e=>Math.round(e/Z)*Z,Qe=e=>(Math.round(e/Z)%D+D)%D,$e=()=>{O.snap===`on`&&(X=Ze(X))},et=e=>{X=Ze(X)+e*Z,Q=!0},tt=e=>{let t=E[e];ae.textContent=`${we(e+1)} of ${D}. ${t.title}, ${Ce(t)}, ${xe(t)}.`},nt=E.map((e,t)=>{let n=document.createElement(`div`);return n.className=`pp__entry`,n.innerHTML=`<span class="pp__no">N°${we(t+1)}</span><span class="pp__name"></span><span class="pp__by"></span><span class="pp__date">${e.date.toUpperCase()}</span>`,n.children[1].textContent=e.title,n.children[2].textContent=Ce(e),ie.append(n),n}),rt=()=>{let e=Y/Z;nt.forEach((t,n)=>{let r=((n-e+D/2)%D+D)%D-D/2,i=Math.max(0,1-Math.abs(r));t.style.transform=`translate3d(0,${(r*24).toFixed(2)}px,0)`,t.style.color=`color-mix(in oklab, var(--ink) ${(32+68*i).toFixed(1)}%, transparent)`})},it=0;P.addEventListener(`wheel`,e=>{e.preventDefault();let t=Math.abs(e.deltaY)>Math.abs(e.deltaX)?e.deltaY:e.deltaX;X+=t*(e.deltaMode===1?32:1)*ue,Q=!0,clearTimeout(it),it=window.setTimeout($e,pe)},{passive:!1,signal:M});let at=!1,ot=0,st=0,ct=0,lt=0,ut=0,dt=(e,t)=>e*qe[0]-t*qe[1];F.addEventListener(`pointerdown`,e=>{e.button===0&&(at=!0,ot=0,st=e.clientX,ct=e.clientY,lt=performance.now(),ut=0,clearTimeout(it),F.setPointerCapture(e.pointerId),P.classList.add(`is-held`))},{signal:M}),F.addEventListener(`pointermove`,e=>{if(!at)return;let t=performance.now(),n=dt(e.clientX-st,e.clientY-ct)*de;ot+=Math.hypot(e.clientX-st,e.clientY-ct),X-=n,ut=ut*.6+-n/Math.max(1,t-lt)*.4,st=e.clientX,ct=e.clientY,lt=t,Q=!0},{signal:M});let ft=(e,t)=>{let n=F.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=null,o=1/0,s=0;for(let e of J){if(!e.mesh.visible)continue;let[t,n,c]=e.sheet.origin;ht.set(t,n,c).project(H);let l=Math.hypot((ht.x*.5+.5)*K-r,(.5-ht.y*.5)*q-i);l<o&&(o=l,a=e,s=e.w*.6*H.position.z/Math.max(1,H.position.z-c))}a&&o<s&&(X=Ze(Y)+Math.round(a.x/Z)*Z,Q=!0)},pt=e=>{if(at){if(at=!1,P.classList.remove(`is-held`),ot<6&&e.type===`pointerup`){ft(e.clientX,e.clientY);return}performance.now()-lt<80&&(X+=ut*fe),$e(),Q=!0}};F.addEventListener(`pointerup`,pt,{signal:M}),F.addEventListener(`pointercancel`,pt,{signal:M}),P.addEventListener(`keydown`,e=>{let t=e.key===`ArrowRight`||e.key===`ArrowDown`||e.key===`PageDown`,n=e.key===`ArrowLeft`||e.key===`ArrowUp`||e.key===`PageUp`;!t&&!n||(e.preventDefault(),e.stopPropagation(),et(t?1:-1))},{signal:M});let mt=(e,t,n,r)=>{Ve.value=n,I.setRenderTarget(e),I.setClearColor(0,1),I.clear(),I.render(V,H),U.material=W;for(let n=0;n<r.length;n++){let[i,a]=n%2?[t,e]:[e,t];W.uniforms.uTex.value=i.texture,W.uniforms.uStep.value.set(r[n][0]/i.width,r[n][1]/i.height),I.setRenderTarget(a),I.render(Fe,Ie)}},ht=new S,gt=0,_t=performance.now(),vt=()=>{let e=performance.now(),t=Math.min(.05,(e-_t)/1e3);if(_t=e,!J.length)return;let n=X-Y,r=Math.abs(n)>.05;if(!(r||J.some(e=>!e.sheet.asleep||e.sheet.ironing))&&!Q)return;Q=!1,gt+=t,Y=r?Y+n*(1-Math.exp(-t*(w?14:le))):X,Je();let i=We(),a=Math.hypot(K,q)*.9;for(let e of J){let n=Math.abs(e.x)<a;n&&!w?e.sheet.step(t,gt,i):e.sheet.reset(),e.sheet.pack(),e.data.needsUpdate=!0,e.mesh.visible=e.shade.visible=n,e.mesh.material.uniforms.uShade.value=O.shade,e.shade.material.uniforms.uBase.value=e.sheet.origin[2]-e.w*ve,ht.set(e.sheet.origin[0],e.sheet.origin[1],e.sheet.origin[2]).applyMatrix4(H.matrixWorldInverse),e.mesh.renderOrder=ht.z}let[o,s,c,l]=He,u=O.soft;mt(c,l,he,[[.6*u,0],[0,.6*u]]),mt(o,s,ge,[[u,0],[0,u],[2.2*u,0],[0,2.2*u],[4.2*u,0],[0,4.2*u]]),I.setRenderTarget(null),I.setClearColor(0,0),I.clear(),U.material=G,G.uniforms.uAmb.value=o.texture,G.uniforms.uCon.value=c.texture,G.uniforms.uAmbK.value=O.ambient,G.uniforms.uConK.value=O.contact,I.render(Fe,Ie),I.render(B,H),rt();let d=Qe(Y);!r&&!at&&d!==Ue&&(Ue=d,tt(d))},yt=new ResizeObserver(()=>{Xe(),Q=!0});yt.observe(P),Xe();let bt=0,xt=()=>{vt(),bt=requestAnimationFrame(xt)};bt=requestAnimationFrame(xt);let St=0,Ct=(e,t)=>{if(!t)return;++St===D&&(P.dataset.ready=``);let n=L[e];L[e]=se(t);for(let t of J)t.i===e&&(t.mesh.material.uniforms.uMap.value=L[e]);n.dispose(),Q=!0},wt=!0;return t.on||(Re(n(`lab/paper-posters/grain.jpg`)).then(e=>{!wt||!e||(z.value.dispose(),z.value=Te(e),Q=!0)}),Oe((e,t)=>wt&&Ct(e,t))),{destroy:()=>{wt=!1,clearTimeout(it),cancelAnimationFrame(bt),yt.disconnect(),k.abort(),Ge();for(let e of He)e.dispose();for(let e of L)e.dispose();z.value.dispose(),W.dispose(),G.dispose(),De.dispose(),I.dispose(),I.forceContextLoss(),P.remove()},set(e,t){if(e===`paper`?O.paper=t in A?t:`bond`:e===`snap`?(O.snap=t===`on`||t===!0?`on`:`off`,$e()):e in O&&(O[e]=Number(t)),e===`paper`||e===`air`||e===`flutter`)for(let e of J)e.sheet.wake();Q=!0}}}};export{M as config,W as default};