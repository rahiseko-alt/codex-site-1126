import{a as T}from"./index.CqnV4w4S.js";import{a as F,e as p}from"./graphql.web.D9uD_qG_.js";var _={exports:{}},m={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h;function I(){if(h)return m;h=1;var n=T(),u=Symbol.for("react.element"),o=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,l=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,v={key:!0,ref:!0,__self:!0,__source:!0};function a(s,e,i){var t,c={},f=null,d=null;i!==void 0&&(f=""+i),e.key!==void 0&&(f=""+e.key),e.ref!==void 0&&(d=e.ref);for(t in e)r.call(e,t)&&!v.hasOwnProperty(t)&&(c[t]=e[t]);if(s&&s.defaultProps)for(t in e=s.defaultProps,e)c[t]===void 0&&(c[t]=e[t]);return{$$typeof:u,type:s,key:f,ref:d,props:c,_owner:l.current}}return m.Fragment=o,m.jsx=a,m.jsxs=a,m}var y;function E(){return y||(y=1,_.exports=I()),_.exports}var q=E(),x=0,R=new Set;function b(){function n(u,o){var r=F(u).definitions,l=new Set;for(var v of o||[])for(var a of v.definitions)a.kind===p.FRAGMENT_DEFINITION&&!l.has(a)&&(r.push(a),l.add(a));var s;(s=r[0].kind===p.FRAGMENT_DEFINITION)&&r[0].directives&&(r[0].directives=r[0].directives.filter((i=>i.name.value!=="_unmask")));var e;return{kind:p.DOCUMENT,definitions:r,get loc(){if(!e&&s){var i=u+(function(c){try{x++;var f="";for(var d of c)if(!R.has(d)){R.add(d);var{loc:k}=d;k&&(f+=k.source.body)}return f}finally{--x==0&&R.clear()}})(o||[]);return{start:0,end:i.length,source:{body:i,name:"GraphQLTada",locationOffset:{line:1,column:1}}}}return e},set loc(i){e=i}}}return n.scalar=function(o,r){return r},n.persisted=function(o,r){return{kind:p.DOCUMENT,definitions:r?r.definitions:[],documentId:o}},n}function S(...n){return n.length===2?n[1]:n[0]}b();const g=b();g(`
    fragment TagFragment on Tag @_unmask {
        tag
        attributes
        content
    }
`);const w=g(`
    fragment ResponsiveImageFragment on ResponsiveImage @_unmask {
        # always required
        src
        srcSet
        width
        height

        # not required, but strongly suggested!
        alt
        title

        # LQIP (base64-encoded)
        base64

        # you can omit 'sizes' if you explicitly pass the 'sizes' prop to the image component
        sizes
    }
`),O=g(`
    fragment LinkFragment on LinkRecord @_unmask {
        label
        link
        overrideColor
        theme {
            color
        }
    }
`);g(`
        fragment ContactFragment on ContactRecord @_unmask {
            title
            description
            tagline
            nearSubmitText
            feedbackTitle
            feedbackDescription
            feedbackAction {
                ...LinkFragment
            }
        }
    `,[O]);export{w as R,g,q as j,S as r};
