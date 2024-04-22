import{C as e,n as t,A as a,D as r,r as n,B as o,E as s,F as l,o as i,G as u,H as c,I as d,J as f,K as p,L as v,M as h,N as g,O as m,P as b,Q as x,R as y,_ as k,h as C,j as S,k as w,t as _,S as q,T as P,U as z,l as j,m as N}from"./aVp2OMsq.js";import{u as A}from"./DE-9FEAC.js";async function R(t,a=e()){const{path:r,matched:n}=a.resolve(t);if(!n.length)return;if(a._routePreloaded||(a._routePreloaded=new Set),a._routePreloaded.has(r))return;const o=a._preloadPromises=a._preloadPromises||[];if(o.length>4)return Promise.all(o).then((()=>R(t,a)));a._routePreloaded.add(r);const s=n.map((e=>{var t;return null==(t=e.components)?void 0:t.default})).filter((e=>"function"==typeof e));for(const e of s){const t=Promise.resolve(e()).catch((()=>{})).finally((()=>o.splice(o.indexOf(t))));o.push(t)}await Promise.all(o)}function B(h){const x=h.componentName||"NuxtLink";function y(e,t){if(!e||"append"!==h.trailingSlash&&"remove"!==h.trailingSlash)return e;if("string"==typeof e)return I(e,h.trailingSlash);const a="path"in e&&void 0!==e.path?e.path:t(e).path;return{...e,name:void 0,path:I(a,h.trailingSlash)}}return t({name:x,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1}},setup(t,{slots:x}){const k=e(),C=g(),S=a((()=>y(t.to||t.href||"",k.resolve))),w=a((()=>"string"==typeof S.value&&r(S.value,{acceptRelative:!0}))),_=a((()=>t.target&&"_self"!==t.target)),q=a((()=>!!t.external||(!!_.value||"object"!=typeof S.value&&(""===S.value||w.value)))),P=n(!1),z=n(null),j=e=>{var a;z.value=t.custom?null==(a=null==e?void 0:e.$el)?void 0:a.nextElementSibling:null==e?void 0:e.$el};if(!1!==t.prefetch&&!0!==t.noPrefetch&&"_blank"!==t.target&&!function(){const e=navigator.connection;if(e&&(e.saveData||/2g/.test(e.effectiveType)))return!0;return!1}()){const e=m();let t,a=null;o((()=>{const r=function(){const e=m();if(e._observer)return e._observer;let t=null;const a=new Map,r=(e,r)=>(t||(t=new IntersectionObserver((e=>{for(const t of e){const e=a.get(t.target);(t.isIntersecting||t.intersectionRatio>0)&&e&&e()}}))),a.set(e,r),t.observe(e),()=>{a.delete(e),t.unobserve(e),0===a.size&&(t.disconnect(),t=null)}),n=e._observer={observe:r};return n}();s((()=>{t=l((()=>{var t;(null==(t=null==z?void 0:z.value)?void 0:t.tagName)&&(a=r.observe(z.value,(async()=>{null==a||a(),a=null;const t="string"==typeof S.value?S.value:k.resolve(S.value).fullPath;await Promise.all([e.hooks.callHook("link:prefetch",t).catch((()=>{})),!q.value&&R(S.value,k).catch((()=>{}))]),P.value=!0})))}))}))})),i((()=>{t&&u(t),null==a||a(),a=null}))}return()=>{var e,a;if(!q.value){const e={ref:j,to:S.value,activeClass:t.activeClass||h.activeClass,exactActiveClass:t.exactActiveClass||h.exactActiveClass,replace:t.replace,ariaCurrentValue:t.ariaCurrentValue,custom:t.custom};return t.custom||(P.value&&(e.class=t.prefetchedClass||h.prefetchedClass),e.rel=t.rel||void 0),c(d("RouterLink"),e,x.default)}const r="object"==typeof S.value?(null==(e=k.resolve(S.value))?void 0:e.href)??null:!S.value||t.external||w.value?S.value||null:y(f(C.app.baseURL,S.value),k.resolve),n=t.target||null,o=((...e)=>e.find((e=>void 0!==e)))(t.noRel?"":t.rel,h.externalRelAttribute,w.value||_.value?"noopener noreferrer":"")||null;if(t.custom){if(!x.default)return null;const e=()=>b(r,{replace:t.replace,external:t.external});return x.default({href:r,navigate:e,get route(){if(!r)return;const e=p(r);return{path:e.pathname,fullPath:e.pathname,get query(){return v(e.search)},hash:e.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:r}},rel:o,target:n,isExternal:q.value,isActive:!1,isExactActive:!1})}return c("a",{ref:z,href:r,rel:o,target:n},null==(a=x.default)?void 0:a.call(x))}}})}const E=B(h);function I(e,t){const a="append"===t?x:y;return r(e)&&!e.startsWith("http")?e:a(e,!0)}const O={class:"font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden"},$=(e=>(j("data-v-73a07988"),e=e(),N(),e))((()=>w("div",{class:"fixed left-0 right-0 spotlight z-10"},null,-1))),H={class:"max-w-520px text-center z-20"},L=["textContent"],M=["textContent"],U={class:"w-full flex items-center justify-center"},F=k({__name:"error-404",props:{appName:{type:String,default:"Nuxt"},version:{type:String,default:""},statusCode:{type:Number,default:404},statusMessage:{type:String,default:"Not Found"},description:{type:String,default:"Sorry, the page you are looking for could not be found."},backHome:{type:String,default:"Go back home"}},setup(e){const t=e;return A({title:`${t.statusCode} - ${t.statusMessage} | ${t.appName}`,script:[],style:[{children:'*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color, #e5e7eb)}:before,:after{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}h1{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}h1,p{margin:0}*,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }'}]}),(t,a)=>{const r=E;return C(),S("div",O,[$,w("div",H,[w("h1",{class:"text-8xl sm:text-10xl font-medium mb-8",textContent:_(e.statusCode)},null,8,L),w("p",{class:"text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight",textContent:_(e.description)},null,8,M),w("div",U,[q(r,{to:"/",class:"gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"},{default:P((()=>[z(_(e.backHome),1)])),_:1})])])])}}},[["__scopeId","data-v-73a07988"]]);export{F as default};
