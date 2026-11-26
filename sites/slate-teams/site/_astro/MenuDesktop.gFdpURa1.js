import{t as e}from"./waitForPreloaderDismissed.Cc99BPiC.js?dpl=dpl_FjmTLwf5F2McBsao1XdPpALuZAV7";import{n as t,t as n}from"./graphql.web.33cIfjgo.js?dpl=dpl_FjmTLwf5F2McBsao1XdPpALuZAV7";import{t as r}from"./gsap.BGYn-VjK.js?dpl=dpl_FjmTLwf5F2McBsao1XdPpALuZAV7";import{t as i}from"./deviceStatus.B78sIEGt.js?dpl=dpl_FjmTLwf5F2McBsao1XdPpALuZAV7";var a=0,o=new Set;function s(){function e(e,r){var i=t(e).definitions,s=new Set;for(var c of r||[])for(var l of c.definitions)l.kind===n.FRAGMENT_DEFINITION&&!s.has(l)&&(i.push(l),s.add(l));var u;(u=i[0].kind===n.FRAGMENT_DEFINITION)&&i[0].directives&&(i[0].directives=i[0].directives.filter((e=>e.name.value!==`_unmask`)));var d;return{kind:n.DOCUMENT,definitions:i,get loc(){if(!d&&u){var t=e+function(e){try{a++;var t=``;for(var n of e)if(!o.has(n)){o.add(n);var{loc:r}=n;r&&(t+=r.source.body)}return t}finally{--a==0&&o.clear()}}(r||[]);return{start:0,end:t.length,source:{body:t,name:`GraphQLTada`,locationOffset:{line:1,column:1}}}}return d},set loc(e){d=e}}}return e.scalar=function(e,t){return t},e.persisted=function(e,t){return{kind:n.DOCUMENT,definitions:t?t.definitions:[],documentId:e}},e}s();var c=s(),l=c(`
    fragment BadgeFragment on BadgeRecord {
        title
        fillBadge
        foregroundColor {
            hex
        }
        backgroundColor {
            hex
        }
    }
`);c(`
        fragment LinkFragment on LinkRecord @_unmask {
            text
            url
            openInNewTab
            linkARecord
            record {
                ... on RecordInterface {
                    _modelApiKey
                }
                ... on LandingPageRecord {
                    slug
                }
                ... on LegalPageRecord {
                    slug
                }
                ... on ProductRecord {
                    slug
                    icon {
                        ...IconFragment
                    }
                    shortDescription
                    badge {
                        ...BadgeFragment
                    }
                }
                ... on SolutionRecord {
                    slug
                    icon {
                        ...IconFragment
                    }
                    cardDescription
                    badge {
                        ...BadgeFragment
                    }
                }
                ... on ArticleTypeRecord {
                    slug
                    icon {
                        ...IconFragment
                    }
                }
                ... on ProductUpdateRecord {
                    slug
                }
                ... on WhatsNewPageRecord {
                    id
                }
            }
        }
    `,[c(`
    fragment IconFragment on IconRecord {
        lucide
        custom {
            url
            alt
            width
            height
            format
        }
    }
`),l]);function u(e){return e.split(/[?#]/)[0]?.replace(/\/+$/,``)||`/`}function d(e,t,n){if(!e)return!1;let r=e;if(/^https?:\/\//i.test(e))try{let t=new URL(e);if(!n||t.origin!==n)return!1;r=t.pathname}catch{return!1}let i=u(r),a=u(t);return i===`/`?a===`/`:a===i||a.startsWith(`${i}/`)}var f=`power2.inOut`,p=.4,m=.3,h=class extends HTMLElement{$indicator=null;$indicatorTrack=null;$items=null;$panel=null;$panelScale=null;$panelInner=null;$dropdowns=null;$featuredDropdowns=null;$activeItem=null;$header=null;hoveredItem=null;lockedItem=null;isActive=!1;isPanelOpen=!1;hoverLocked=!1;hoverSuppressed=!1;activeDropdownId=null;panelTween=null;flipTween=null;featuredLayerZIndex=1;badgeAlignObserver=null;get isHeaderBusy(){return(this.$header?.classList.contains(`is-compact`)??!1)||(this.$header?.classList.contains(`is-flipping`)??!1)}get isHeaderCompact(){return this.$header?.classList.contains(`is-compact`)??!1}get isReducedMotion(){return i.get().isReducedMotion}get menuDuration(){return this.isReducedMotion?0:p}get menuDurationFast(){return this.isReducedMotion?0:m}connectedCallback(){this.$indicator=this.querySelector(`[data-menu-indicator]`),this.$indicatorTrack=this.querySelector(`[data-menu-indicator-track]`),this.$items=this.querySelectorAll(`[data-menu-item]`),this.$panel=this.querySelector(`[data-menu-panel]`),this.$panelScale=this.querySelector(`[data-menu-panel-scale]`),this.$panelInner=this.querySelector(`[data-menu-panel-inner]`),this.$dropdowns=this.querySelectorAll(`[data-dropdown]`),this.$featuredDropdowns=this.querySelectorAll(`.c-menu-desktop_dropdown.has-featured-image`),this.$header=this.closest(`.c-header`),this.bindEvents(),this.syncCurrentItem(),this.observeDropdownBadges(),document.fonts.ready.then(this.alignDropdownBadges),document.addEventListener(`astro:before-preparation`,this.onBeforePreparation),this.armPreloaderHoverGate()}disconnectedCallback(){document.removeEventListener(`astro:before-preparation`,this.onBeforePreparation),this.disarmPreloaderHoverGate(),this.badgeAlignObserver?.disconnect(),this.unlockHover(),this.unbindEvents(),this.killTweens(),this.$header?.classList.remove(`is-dropdown-open`)}bindEvents(){if(this.$items){for(let e of this.$items)e.addEventListener(`mouseenter`,this.onItemEnter);if(this.$featuredDropdowns)for(let e of this.$featuredDropdowns)e.querySelector(`.c-menu-desktop_dropdown-list`)?.addEventListener(`mouseover`,this.onFeaturedItemEnter);this.addEventListener(`mouseleave`,this.onMenuLeave)}}unbindEvents(){if(this.$items)for(let e of this.$items)e.removeEventListener(`mouseenter`,this.onItemEnter);if(this.$featuredDropdowns)for(let e of this.$featuredDropdowns)e.querySelector(`.c-menu-desktop_dropdown-list`)?.removeEventListener(`mouseover`,this.onFeaturedItemEnter);this.removeEventListener(`mouseleave`,this.onMenuLeave)}onFeaturedItemEnter=e=>{let t=e.target?.closest(`[data-featured-index]`);if(!t)return;let n=e.currentTarget.closest(`.c-menu-desktop_dropdown`);n&&this.setFeaturedLayer(n,t.dataset.featuredIndex??null)};onItemEnter=e=>{this.hoverSuppressed||this.isHeaderBusy||this.applyItemHover(e.currentTarget)};applyItemHover(e){if(this.hoverLocked&&e===this.lockedItem)return;this.hoverLocked&&this.unlockHover(),this.hoveredItem=e,this.moveIndicator(e),this.setActiveItem(e);let t=e.dataset.dropdownId;e.hasAttribute(`data-has-children`)&&t?this.showPanel(t):this.closePanel()}armPreloaderHoverGate(){document.querySelector(`c-preloader`)&&(this.hoverSuppressed=!0,document.addEventListener(e,this.onPreloaderDismissed))}disarmPreloaderHoverGate(){document.removeEventListener(e,this.onPreloaderDismissed),document.removeEventListener(`pointermove`,this.onPointerMoveAfterPreloader),this.hoverSuppressed=!1}onPreloaderDismissed=()=>{document.removeEventListener(e,this.onPreloaderDismissed),requestAnimationFrame(()=>{this.collapse(),document.addEventListener(`pointermove`,this.onPointerMoveAfterPreloader,{once:!0})})};onPointerMoveAfterPreloader=e=>{this.hoverSuppressed=!1;let t=e.target;if(!(t instanceof Element))return;let n=t.closest(`[data-menu-item]`);n&&this.contains(n)&&!this.isHeaderBusy&&this.applyItemHover(n)};onMenuLeave=()=>{this.isHeaderBusy||(this.hideIndicator(),this.clearActiveItem(),this.closePanel())};collapse(){this.hideIndicator(),this.clearActiveItem(),this.closePanel()}moveIndicator(e){if(!this.$indicator)return;let t=`${e.offsetLeft}px`,n=`${e.offsetWidth}px`;this.isActive?this.setIndicatorVars(t,n):(this.setIndicatorTransition(!1),this.setIndicatorVars(t,n),this.$indicator.offsetHeight,this.setIndicatorTransition(!0),this.$indicator.classList.add(`is-active`),this.isActive=!0)}setIndicatorTransition(e){let t=e?``:`none`;this.$indicator&&(this.$indicator.style.transition=t),this.$indicatorTrack&&(this.$indicatorTrack.style.transition=t)}hideIndicator(){this.$indicator&&(this.$indicator.classList.remove(`is-active`),this.isActive=!1)}setIndicatorVars(e,t){this.$indicator&&(this.$indicator.style.setProperty(`--indicator-x`,e),this.$indicator.style.setProperty(`--indicator-width`,t),this.$indicatorTrack&&(this.$indicatorTrack.style.translate=`-${e} 0`))}setActiveItem(e){this.$activeItem!==e&&(this.$activeItem?.classList.remove(`is-active`),e.classList.add(`is-active`),this.$activeItem=e)}clearActiveItem(){this.$activeItem?.classList.remove(`is-active`),this.$activeItem=null}onBeforePreparation=e=>{let t=`to`in e&&e.to instanceof URL?e.to:null;this.lockHover(),this.collapse(),this.syncCurrentItem(t?.pathname,t?.origin)};lockHover(){if(this.hoverLocked)return;let e=this.hoveredItem??this.$activeItem;e&&(this.lockedItem=e,this.hoverLocked=!0,document.addEventListener(`pointermove`,this.onPointerMoveWhileLocked))}unlockHover(){this.hoverLocked=!1,this.lockedItem=null,document.removeEventListener(`pointermove`,this.onPointerMoveWhileLocked)}onPointerMoveWhileLocked=e=>{let t=this.lockedItem;if(!t){this.unlockHover();return}let n=t.getBoundingClientRect();(e.clientX<n.left||e.clientX>n.right||e.clientY<n.top||e.clientY>n.bottom)&&this.unlockHover()};syncCurrentItem=(e=window.location.pathname,t=window.location.origin)=>{if(this.$items)for(let n of this.$items){let r=this.collectItemHrefs(n).some(n=>d(n,e,t));n.classList.toggle(`is-current`,r),r?n.setAttribute(`aria-current`,`page`):n.removeAttribute(`aria-current`)}};collectItemHrefs(e){let t=[],n=e.querySelector(`:scope > .c-menu-desktop_link`)?.getAttribute(`href`);n&&t.push(n);let r=e.dataset.dropdownId;return r&&this.getDropdown(r)?.querySelectorAll(`a[href]`).forEach(e=>{let n=e.getAttribute(`href`);n&&t.push(n)}),t}showPanel(e){this.$panel?.classList.contains(`is-open`)?this.switchPanel(e):this.openPanel(e)}openPanel(e){this.$panel&&this.$panelScale&&(this.killTweens(),this.setActiveDropdown(e),this.activeDropdownId=e,this.isPanelOpen=!0,this.$panel.classList.add(`is-open`),this.$header?.classList.add(`is-dropdown-open`),this.panelTween=r.fromTo(this.$panelScale,{scale:.95,opacity:0},{scale:1,opacity:1,duration:this.menuDuration,ease:f}))}switchPanel(e){if(!this.$panelInner||!this.$panelScale||(this.isPanelOpen=!0,this.$header?.classList.add(`is-dropdown-open`),this.panelTween?.kill(),this.panelTween=r.to(this.$panelScale,{scale:1,opacity:1,duration:this.menuDurationFast,ease:f}),this.activeDropdownId===e))return;this.flipTween?.kill(),this.clearPanelFlipProps();let t=this.$panelInner.offsetHeight,n=this.$panelInner.offsetWidth;this.setActiveDropdown(e),this.activeDropdownId=e;let i=this.$panelInner.offsetHeight,a=this.$panelInner.offsetWidth;this.flipTween=r.fromTo(this.$panelInner,{height:t,width:n},{height:i,width:a,duration:this.menuDuration,ease:f,onComplete:()=>{this.clearPanelFlipProps()}})}closePanel(){this.isPanelOpen&&this.$panelScale&&this.$panel&&(this.killTweens(),this.isPanelOpen=!1,this.activeDropdownId=null,this.$header?.classList.remove(`is-dropdown-open`),this.panelTween=r.to(this.$panelScale,{scale:.95,opacity:0,duration:this.menuDurationFast,ease:f,onComplete:()=>{this.$panel?.classList.remove(`is-open`),this.clearActiveDropdowns()}}))}setActiveDropdown(e){if(!this.$dropdowns)return;for(let t of this.$dropdowns){let n=t.dataset.dropdown===e;t.classList.toggle(`is-active`,n),t.classList.remove(`is-in`),this.resetFeaturedLayers(t)}let t=this.getDropdown(e);t&&(this.alignDropdownBadges(),this.isReducedMotion?t.classList.add(`is-in`):requestAnimationFrame(()=>{requestAnimationFrame(()=>{t.classList.add(`is-in`)})}))}observeDropdownBadges(){this.badgeAlignObserver=new ResizeObserver(this.alignDropdownBadges);for(let e of this.querySelectorAll(`.c-menu-desktop_dropdown-label`))this.badgeAlignObserver.observe(e)}alignDropdownBadges=()=>{if(!this.isConnected)return;let e=this.querySelectorAll(`.c-menu-desktop_dropdown-label`);for(let t of e){let e=t.querySelector(`.c-menu-desktop_dropdown-label-text`),n=t.querySelector(`.c-menu-desktop_dropdown-badge`);if(!e||!n||e.offsetWidth===0)continue;let r=document.createRange();r.selectNodeContents(e);let i=r.getClientRects()[0],a=e.getBoundingClientRect();if(!i||a.width===0)continue;let o=a.width/e.offsetWidth,s=(a.right-i.right)/o,c=s>1?s:0;t.style.setProperty(`--badge-pull`,`${c}px`)}};clearActiveDropdowns(){if(this.$dropdowns)for(let e of this.$dropdowns)e.classList.remove(`is-active`,`is-in`),r.set(e,{clearProps:`opacity`}),this.resetFeaturedLayers(e)}getDropdown(e){return this.$dropdowns?Array.from(this.$dropdowns).find(t=>t.dataset.dropdown===e)??null:null}setFeaturedLayer(e,t){if(t===null)return;let n=e.querySelector(`.c-menu-desktop_dropdown-image-layer[data-featured-index="${t}"]`);n&&(n.classList.contains(`is-active`)&&n.style.zIndex===String(this.featuredLayerZIndex)||n.classList.contains(`is-default`)&&!e.querySelector(`.c-menu-desktop_dropdown-image-layer.is-active`)||(this.featuredLayerZIndex+=1,n.style.zIndex=String(this.featuredLayerZIndex),n.classList.remove(`is-default`,`is-active`),n.offsetWidth,n.classList.add(`is-active`)))}resetFeaturedLayers(e){let t=e.querySelectorAll(`.c-menu-desktop_dropdown-image-layer`);for(let e of t)e.classList.remove(`is-active`,`is-default`),e.style.zIndex=``;t[0]?.classList.add(`is-default`),this.featuredLayerZIndex=1}clearPanelFlipProps(){this.$panelInner&&r.set(this.$panelInner,{clearProps:`transform,width,height,maxWidth,maxHeight`})}killTweens(){this.panelTween?.kill(),this.panelTween=null,this.flipTween?.kill(),this.flipTween=null,this.clearPanelFlipProps()}};customElements.define(`c-menu-desktop`,h);export{h as default};