import{t as e}from"./rolldown-runtime.Dh6celcD.mjs";async function t(e,t,i){let a=r[e],o=a?await a(t,i):void 0,s={bodyEnd:[],bodyStart:[],headEnd:[],headStart:[]};for(let t of n){if(t.pageIds&&!t.pageIds.has(e))continue;let n=t.code(o);n&&s[t.placement].push({...t,code:n})}return s}var n,r,i,a;e((()=>{n=[{code:e=>`<style>\r
::selection {\r
color: #1A1A1A; /*selection text color*/\r
background: #FF4000; /*selection background color*/\r
}\r
</style>`,id:`dzCSZxu4x`,loadMode:`always`,name:`Custom Text Selection`,placement:`headStart`},{code:e=>`<style type="text/css"> html {   \\-webkit-tap-highlight-color: rgba(0,0,0,0); } </style>`,id:`LiwHlwq2r`,loadMode:`always`,name:`Tap Highlight Reset`,placement:`headEnd`},{code:e=>`<style>\r
  /* Prevent invisible text during font load — shows fallback immediately */\r
  @font-face {\r
    font-display: swap;\r
  }\r
</style>`,id:`MQFmXwCTf`,loadMode:`always`,name:`Font Display Swap`,placement:`headStart`},{code:e=>`<style>\r
  html, body {\r
    background-color: #000000; /* match your page bg exactly */\r
  }\r
</style>`,id:`Fv7Qtzx99`,loadMode:`always`,name:`Script`,placement:`headStart`}],r={},i={bodyEnd:[],bodyStart:[],headEnd:[`LiwHlwq2r`],headStart:[`dzCSZxu4x`,`MQFmXwCTf`,`Fv7Qtzx99`]},a={exports:{getSnippets:{type:`function`,annotations:{framerContractVersion:`1`}},snippetsSorting:{type:`variable`,annotations:{framerContractVersion:`1`}},__FramerMetadata__:{type:`variable`}}}}))();export{a as __FramerMetadata__,t as getSnippets,i as snippetsSorting};
//# sourceMappingURL=CUQymXLD71V8jm6U06nDdx6vVb_Ke-29Y4wJb4WMdBY.Bu7VOU9a.mjs.map