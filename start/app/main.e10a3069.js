var Px=Object.defineProperty;var $x=(e,t,n)=>t in e?Px(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Cn=(e,t,n)=>($x(e,typeof t!="symbol"?t+"":t,n),n);const Dx="modulepreload",Rx=function(e,t){return new URL(e,t).href},Nh={},je=function(t,n,r){return!n||n.length===0?t():Promise.all(n.map(a=>{if(a=Rx(a,r),a in Nh)return;Nh[a]=!0;const o=a.endsWith(".css"),i=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${i}`))return;const l=document.createElement("link");if(l.rel=o?"stylesheet":Dx,o||(l.as="script",l.crossOrigin=""),l.href=a,document.head.appendChild(l),o)return new Promise((s,c)=>{l.addEventListener("load",s),l.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${a}`)))})})).then(()=>t())};function mc(e,t){const n=Object.create(null),r=e.split(",");for(let a=0;a<r.length;a++)n[r[a]]=!0;return t?a=>!!n[a.toLowerCase()]:a=>!!n[a]}const Mx="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt",Nx=mc(Mx),Fx="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",zx=mc(Fx);function Dv(e){return!!e||e===""}function Ci(e){if(ze(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],a=It(r)?Vx(r):Ci(r);if(a)for(const o in a)t[o]=a[o]}return t}else{if(It(e))return e;if(xt(e))return e}}const jx=/;(?![^(]*\))/g,Ux=/:(.+)/;function Vx(e){const t={};return e.split(jx).forEach(n=>{if(n){const r=n.split(Ux);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function Hr(e){let t="";if(It(e))t=e;else if(ze(e))for(let n=0;n<e.length;n++){const r=Hr(e[n]);r&&(t+=r+" ")}else if(xt(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function Hx(e){if(!e)return null;let{class:t,style:n}=e;return t&&!It(t)&&(e.class=Hr(t)),n&&(e.style=Ci(n)),e}function Wx(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=Ca(e[r],t[r]);return n}function Ca(e,t){if(e===t)return!0;let n=Fh(e),r=Fh(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=ys(e),r=ys(t),n||r)return e===t;if(n=ze(e),r=ze(t),n||r)return n&&r?Wx(e,t):!1;if(n=xt(e),r=xt(t),n||r){if(!n||!r)return!1;const a=Object.keys(e).length,o=Object.keys(t).length;if(a!==o)return!1;for(const i in e){const l=e.hasOwnProperty(i),s=t.hasOwnProperty(i);if(l&&!s||!l&&s||!Ca(e[i],t[i]))return!1}}return String(e)===String(t)}function gc(e,t){return e.findIndex(n=>Ca(n,t))}const ce=e=>It(e)?e:e==null?"":ze(e)||xt(e)&&(e.toString===Mv||!Qe(e.toString))?JSON.stringify(e,Rv,2):String(e),Rv=(e,t)=>t&&t.__v_isRef?Rv(e,t.value):Yo(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,a])=>(n[`${r} =>`]=a,n),{})}:ho(t)?{[`Set(${t.size})`]:[...t.values()]}:xt(t)&&!ze(t)&&!Nv(t)?String(t):t,vt={},qo=[],er=()=>{},qx=()=>!1,Yx=/^on[^a-z]/,$s=e=>Yx.test(e),Rf=e=>e.startsWith("onUpdate:"),Ot=Object.assign,Mf=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Gx=Object.prototype.hasOwnProperty,ot=(e,t)=>Gx.call(e,t),ze=Array.isArray,Yo=e=>Ds(e)==="[object Map]",ho=e=>Ds(e)==="[object Set]",Fh=e=>Ds(e)==="[object Date]",Qe=e=>typeof e=="function",It=e=>typeof e=="string",ys=e=>typeof e=="symbol",xt=e=>e!==null&&typeof e=="object",Nf=e=>xt(e)&&Qe(e.then)&&Qe(e.catch),Mv=Object.prototype.toString,Ds=e=>Mv.call(e),Kx=e=>Ds(e).slice(8,-1),Nv=e=>Ds(e)==="[object Object]",Ff=e=>It(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,ns=mc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),vc=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},Qx=/-(\w)/g,Bn=vc(e=>e.replace(Qx,(t,n)=>n?n.toUpperCase():"")),Xx=/\B([A-Z])/g,Er=vc(e=>e.replace(Xx,"-$1").toLowerCase()),Rs=vc(e=>e.charAt(0).toUpperCase()+e.slice(1)),rs=vc(e=>e?`on${Rs(e)}`:""),ri=(e,t)=>!Object.is(e,t),Go=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},Ul=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},wa=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let zh;const Zx=()=>zh||(zh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});let wn;class zf{constructor(t=!1){this.detached=t,this.active=!0,this.effects=[],this.cleanups=[],this.parent=wn,!t&&wn&&(this.index=(wn.scopes||(wn.scopes=[])).push(this)-1)}run(t){if(this.active){const n=wn;try{return wn=this,t()}finally{wn=n}}}on(){wn=this}off(){wn=this.parent}stop(t){if(this.active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const a=this.parent.scopes.pop();a&&a!==this&&(this.parent.scopes[this.index]=a,a.index=this.index)}this.parent=void 0,this.active=!1}}}function jf(e){return new zf(e)}function Fv(e,t=wn){t&&t.active&&t.effects.push(e)}function Jx(){return wn}function eC(e){wn&&wn.cleanups.push(e)}const Uf=e=>{const t=new Set(e);return t.w=0,t.n=0,t},zv=e=>(e.w&_a)>0,jv=e=>(e.n&_a)>0,tC=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=_a},nC=e=>{const{deps:t}=e;if(t.length){let n=0;for(let r=0;r<t.length;r++){const a=t[r];zv(a)&&!jv(a)?a.delete(e):t[n++]=a,a.w&=~_a,a.n&=~_a}t.length=n}},Ad=new WeakMap;let Xi=0,_a=1;const bd=30;let Xn;const no=Symbol(""),Ed=Symbol("");class Ms{constructor(t,n=null,r){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,Fv(this,r)}run(){if(!this.active)return this.fn();let t=Xn,n=Aa;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=Xn,Xn=this,Aa=!0,_a=1<<++Xi,Xi<=bd?tC(this):jh(this),this.fn()}finally{Xi<=bd&&nC(this),_a=1<<--Xi,Xn=this.parent,Aa=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){Xn===this?this.deferStop=!0:this.active&&(jh(this),this.onStop&&this.onStop(),this.active=!1)}}function jh(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}function rC(e,t){e.effect&&(e=e.effect.fn);const n=new Ms(e);t&&(Ot(n,t),t.scope&&Fv(n,t.scope)),(!t||!t.lazy)&&n.run();const r=n.run.bind(n);return r.effect=n,r}function aC(e){e.effect.stop()}let Aa=!0;const Uv=[];function mo(){Uv.push(Aa),Aa=!1}function go(){const e=Uv.pop();Aa=e===void 0?!0:e}function Ln(e,t,n){if(Aa&&Xn){let r=Ad.get(e);r||Ad.set(e,r=new Map);let a=r.get(n);a||r.set(n,a=Uf()),Vv(a)}}function Vv(e,t){let n=!1;Xi<=bd?jv(e)||(e.n|=_a,n=!zv(e)):n=!e.has(Xn),n&&(e.add(Xn),Xn.deps.push(e))}function Wr(e,t,n,r,a,o){const i=Ad.get(e);if(!i)return;let l=[];if(t==="clear")l=[...i.values()];else if(n==="length"&&ze(e))i.forEach((s,c)=>{(c==="length"||c>=r)&&l.push(s)});else switch(n!==void 0&&l.push(i.get(n)),t){case"add":ze(e)?Ff(n)&&l.push(i.get("length")):(l.push(i.get(no)),Yo(e)&&l.push(i.get(Ed)));break;case"delete":ze(e)||(l.push(i.get(no)),Yo(e)&&l.push(i.get(Ed)));break;case"set":Yo(e)&&l.push(i.get(no));break}if(l.length===1)l[0]&&xd(l[0]);else{const s=[];for(const c of l)c&&s.push(...c);xd(Uf(s))}}function xd(e,t){const n=ze(e)?e:[...e];for(const r of n)r.computed&&Uh(r);for(const r of n)r.computed||Uh(r)}function Uh(e,t){(e!==Xn||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const oC=mc("__proto__,__v_isRef,__isVue"),Hv=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(ys)),iC=yc(),sC=yc(!1,!0),lC=yc(!0),cC=yc(!0,!0),Vh=uC();function uC(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=rt(this);for(let o=0,i=this.length;o<i;o++)Ln(r,"get",o+"");const a=r[t](...n);return a===-1||a===!1?r[t](...n.map(rt)):a}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){mo();const r=rt(this)[t].apply(this,n);return go(),r}}),e}function yc(e=!1,t=!1){return function(r,a,o){if(a==="__v_isReactive")return!e;if(a==="__v_isReadonly")return e;if(a==="__v_isShallow")return t;if(a==="__v_raw"&&o===(e?t?Xv:Qv:t?Kv:Gv).get(r))return r;const i=ze(r);if(!e&&i&&ot(Vh,a))return Reflect.get(Vh,a,o);const l=Reflect.get(r,a,o);return(ys(a)?Hv.has(a):oC(a))||(e||Ln(r,"get",a),t)?l:ct(l)?i&&Ff(a)?l:l.value:xt(l)?e?Hf(l):He(l):l}}const dC=Wv(),fC=Wv(!0);function Wv(e=!1){return function(n,r,a,o){let i=n[r];if(co(i)&&ct(i)&&!ct(a))return!1;if(!e&&(!As(a)&&!co(a)&&(i=rt(i),a=rt(a)),!ze(n)&&ct(i)&&!ct(a)))return i.value=a,!0;const l=ze(n)&&Ff(r)?Number(r)<n.length:ot(n,r),s=Reflect.set(n,r,a,o);return n===rt(o)&&(l?ri(a,i)&&Wr(n,"set",r,a):Wr(n,"add",r,a)),s}}function pC(e,t){const n=ot(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&Wr(e,"delete",t,void 0),r}function hC(e,t){const n=Reflect.has(e,t);return(!ys(t)||!Hv.has(t))&&Ln(e,"has",t),n}function mC(e){return Ln(e,"iterate",ze(e)?"length":no),Reflect.ownKeys(e)}const qv={get:iC,set:dC,deleteProperty:pC,has:hC,ownKeys:mC},Yv={get:lC,set(e,t){return!0},deleteProperty(e,t){return!0}},gC=Ot({},qv,{get:sC,set:fC}),vC=Ot({},Yv,{get:cC}),Vf=e=>e,Ac=e=>Reflect.getPrototypeOf(e);function nl(e,t,n=!1,r=!1){e=e.__v_raw;const a=rt(e),o=rt(t);n||(t!==o&&Ln(a,"get",t),Ln(a,"get",o));const{has:i}=Ac(a),l=r?Vf:n?qf:bs;if(i.call(a,t))return l(e.get(t));if(i.call(a,o))return l(e.get(o));e!==a&&e.get(t)}function rl(e,t=!1){const n=this.__v_raw,r=rt(n),a=rt(e);return t||(e!==a&&Ln(r,"has",e),Ln(r,"has",a)),e===a?n.has(e):n.has(e)||n.has(a)}function al(e,t=!1){return e=e.__v_raw,!t&&Ln(rt(e),"iterate",no),Reflect.get(e,"size",e)}function Hh(e){e=rt(e);const t=rt(this);return Ac(t).has.call(t,e)||(t.add(e),Wr(t,"add",e,e)),this}function Wh(e,t){t=rt(t);const n=rt(this),{has:r,get:a}=Ac(n);let o=r.call(n,e);o||(e=rt(e),o=r.call(n,e));const i=a.call(n,e);return n.set(e,t),o?ri(t,i)&&Wr(n,"set",e,t):Wr(n,"add",e,t),this}function qh(e){const t=rt(this),{has:n,get:r}=Ac(t);let a=n.call(t,e);a||(e=rt(e),a=n.call(t,e)),r&&r.call(t,e);const o=t.delete(e);return a&&Wr(t,"delete",e,void 0),o}function Yh(){const e=rt(this),t=e.size!==0,n=e.clear();return t&&Wr(e,"clear",void 0,void 0),n}function ol(e,t){return function(r,a){const o=this,i=o.__v_raw,l=rt(i),s=t?Vf:e?qf:bs;return!e&&Ln(l,"iterate",no),i.forEach((c,u)=>r.call(a,s(c),s(u),o))}}function il(e,t,n){return function(...r){const a=this.__v_raw,o=rt(a),i=Yo(o),l=e==="entries"||e===Symbol.iterator&&i,s=e==="keys"&&i,c=a[e](...r),u=n?Vf:t?qf:bs;return!t&&Ln(o,"iterate",s?Ed:no),{next(){const{value:f,done:d}=c.next();return d?{value:f,done:d}:{value:l?[u(f[0]),u(f[1])]:u(f),done:d}},[Symbol.iterator](){return this}}}}function ea(e){return function(...t){return e==="delete"?!1:this}}function yC(){const e={get(o){return nl(this,o)},get size(){return al(this)},has:rl,add:Hh,set:Wh,delete:qh,clear:Yh,forEach:ol(!1,!1)},t={get(o){return nl(this,o,!1,!0)},get size(){return al(this)},has:rl,add:Hh,set:Wh,delete:qh,clear:Yh,forEach:ol(!1,!0)},n={get(o){return nl(this,o,!0)},get size(){return al(this,!0)},has(o){return rl.call(this,o,!0)},add:ea("add"),set:ea("set"),delete:ea("delete"),clear:ea("clear"),forEach:ol(!0,!1)},r={get(o){return nl(this,o,!0,!0)},get size(){return al(this,!0)},has(o){return rl.call(this,o,!0)},add:ea("add"),set:ea("set"),delete:ea("delete"),clear:ea("clear"),forEach:ol(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(o=>{e[o]=il(o,!1,!1),n[o]=il(o,!0,!1),t[o]=il(o,!1,!0),r[o]=il(o,!0,!0)}),[e,n,t,r]}const[AC,bC,EC,xC]=yC();function bc(e,t){const n=t?e?xC:EC:e?bC:AC;return(r,a,o)=>a==="__v_isReactive"?!e:a==="__v_isReadonly"?e:a==="__v_raw"?r:Reflect.get(ot(n,a)&&a in r?n:r,a,o)}const CC={get:bc(!1,!1)},wC={get:bc(!1,!0)},_C={get:bc(!0,!1)},SC={get:bc(!0,!0)},Gv=new WeakMap,Kv=new WeakMap,Qv=new WeakMap,Xv=new WeakMap;function kC(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function TC(e){return e.__v_skip||!Object.isExtensible(e)?0:kC(Kx(e))}function He(e){return co(e)?e:Ec(e,!1,qv,CC,Gv)}function Zv(e){return Ec(e,!1,gC,wC,Kv)}function Hf(e){return Ec(e,!0,Yv,_C,Qv)}function IC(e){return Ec(e,!0,vC,SC,Xv)}function Ec(e,t,n,r,a){if(!xt(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const o=a.get(e);if(o)return o;const i=TC(e);if(i===0)return e;const l=new Proxy(e,i===2?r:n);return a.set(e,l),l}function jr(e){return co(e)?jr(e.__v_raw):!!(e&&e.__v_isReactive)}function co(e){return!!(e&&e.__v_isReadonly)}function As(e){return!!(e&&e.__v_isShallow)}function Wf(e){return jr(e)||co(e)}function rt(e){const t=e&&e.__v_raw;return t?rt(t):e}function uo(e){return Ul(e,"__v_skip",!0),e}const bs=e=>xt(e)?He(e):e,qf=e=>xt(e)?Hf(e):e;function Yf(e){Aa&&Xn&&(e=rt(e),Vv(e.dep||(e.dep=Uf())))}function xc(e,t){e=rt(e),e.dep&&xd(e.dep)}function ct(e){return!!(e&&e.__v_isRef===!0)}function re(e){return ey(e,!1)}function Jv(e){return ey(e,!0)}function ey(e,t){return ct(e)?e:new OC(e,t)}class OC{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:rt(t),this._value=n?t:bs(t)}get value(){return Yf(this),this._value}set value(t){const n=this.__v_isShallow||As(t)||co(t);t=n?t:rt(t),ri(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:bs(t),xc(this))}}function BC(e){xc(e)}function V(e){return ct(e)?e.value:e}const LC={get:(e,t,n)=>V(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const a=e[t];return ct(a)&&!ct(n)?(a.value=n,!0):Reflect.set(e,t,n,r)}};function Gf(e){return jr(e)?e:new Proxy(e,LC)}class PC{constructor(t){this.dep=void 0,this.__v_isRef=!0;const{get:n,set:r}=t(()=>Yf(this),()=>xc(this));this._get=n,this._set=r}get value(){return this._get()}set value(t){this._set(t)}}function $C(e){return new PC(e)}function ty(e){const t=ze(e)?new Array(e.length):{};for(const n in e)t[n]=ny(e,n);return t}class DC{constructor(t,n,r){this._object=t,this._key=n,this._defaultValue=r,this.__v_isRef=!0}get value(){const t=this._object[this._key];return t===void 0?this._defaultValue:t}set value(t){this._object[this._key]=t}}function ny(e,t,n){const r=e[t];return ct(r)?r:new DC(e,t,n)}var ry;class RC{constructor(t,n,r,a){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this[ry]=!1,this._dirty=!0,this.effect=new Ms(t,()=>{this._dirty||(this._dirty=!0,xc(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!a,this.__v_isReadonly=r}get value(){const t=rt(this);return Yf(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}ry="__v_isReadonly";function MC(e,t,n=!1){let r,a;const o=Qe(e);return o?(r=e,a=er):(r=e.get,a=e.set),new RC(r,a,o||!a,n)}const as=[];function ay(e,...t){mo();const n=as.length?as[as.length-1].component:null,r=n&&n.appContext.config.warnHandler,a=NC();if(r)xr(r,n,11,[e+t.join(""),n&&n.proxy,a.map(({vnode:o})=>`at <${Yy(n,o.type)}>`).join(`
`),a]);else{const o=[`[Vue warn]: ${e}`,...t];a.length&&o.push(`
`,...FC(a)),console.warn(...o)}go()}function NC(){let e=as[as.length-1];if(!e)return[];const t=[];for(;e;){const n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});const r=e.component&&e.component.parent;e=r&&r.vnode}return t}function FC(e){const t=[];return e.forEach((n,r)=>{t.push(...r===0?[]:[`
`],...zC(n))}),t}function zC({vnode:e,recurseCount:t}){const n=t>0?`... (${t} recursive calls)`:"",r=e.component?e.component.parent==null:!1,a=` at <${Yy(e.component,e.type,r)}`,o=">"+n;return e.props?[a,...jC(e.props),o]:[a+o]}function jC(e){const t=[],n=Object.keys(e);return n.slice(0,3).forEach(r=>{t.push(...oy(r,e[r]))}),n.length>3&&t.push(" ..."),t}function oy(e,t,n){return It(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):typeof t=="number"||typeof t=="boolean"||t==null?n?t:[`${e}=${t}`]:ct(t)?(t=oy(e,rt(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):Qe(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=rt(t),n?t:[`${e}=`,t])}function xr(e,t,n,r){let a;try{a=r?e(...r):e()}catch(o){vo(o,t,n)}return a}function Tn(e,t,n,r){if(Qe(e)){const o=xr(e,t,n,r);return o&&Nf(o)&&o.catch(i=>{vo(i,t,n)}),o}const a=[];for(let o=0;o<e.length;o++)a.push(Tn(e[o],t,n,r));return a}function vo(e,t,n,r=!0){const a=t?t.vnode:null;if(t){let o=t.parent;const i=t.proxy,l=n;for(;o;){const c=o.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](e,i,l)===!1)return}o=o.parent}const s=t.appContext.config.errorHandler;if(s){xr(s,null,10,[e,i,l]);return}}UC(e,n,a,r)}function UC(e,t,n,r=!0){console.error(e)}let Es=!1,Cd=!1;const an=[];let vr=0;const Ko=[];let Mr=null,Qa=0;const iy=Promise.resolve();let Kf=null;function Ke(e){const t=Kf||iy;return e?t.then(this?e.bind(this):e):t}function VC(e){let t=vr+1,n=an.length;for(;t<n;){const r=t+n>>>1;xs(an[r])<e?t=r+1:n=r}return t}function Cc(e){(!an.length||!an.includes(e,Es&&e.allowRecurse?vr+1:vr))&&(e.id==null?an.push(e):an.splice(VC(e.id),0,e),sy())}function sy(){!Es&&!Cd&&(Cd=!0,Kf=iy.then(ly))}function HC(e){const t=an.indexOf(e);t>vr&&an.splice(t,1)}function Qf(e){ze(e)?Ko.push(...e):(!Mr||!Mr.includes(e,e.allowRecurse?Qa+1:Qa))&&Ko.push(e),sy()}function Gh(e,t=Es?vr+1:0){for(;t<an.length;t++){const n=an[t];n&&n.pre&&(an.splice(t,1),t--,n())}}function Vl(e){if(Ko.length){const t=[...new Set(Ko)];if(Ko.length=0,Mr){Mr.push(...t);return}for(Mr=t,Mr.sort((n,r)=>xs(n)-xs(r)),Qa=0;Qa<Mr.length;Qa++)Mr[Qa]();Mr=null,Qa=0}}const xs=e=>e.id==null?1/0:e.id,WC=(e,t)=>{const n=xs(e)-xs(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function ly(e){Cd=!1,Es=!0,an.sort(WC);const t=er;try{for(vr=0;vr<an.length;vr++){const n=an[vr];n&&n.active!==!1&&xr(n,null,14)}}finally{vr=0,an.length=0,Vl(),Es=!1,Kf=null,(an.length||Ko.length)&&ly()}}let Uo,sl=[];function cy(e,t){var n,r;Uo=e,Uo?(Uo.enabled=!0,sl.forEach(({event:a,args:o})=>Uo.emit(a,...o)),sl=[]):typeof window<"u"&&window.HTMLElement&&!(!((r=(n=window.navigator)===null||n===void 0?void 0:n.userAgent)===null||r===void 0)&&r.includes("jsdom"))?((t.__VUE_DEVTOOLS_HOOK_REPLAY__=t.__VUE_DEVTOOLS_HOOK_REPLAY__||[]).push(o=>{cy(o,t)}),setTimeout(()=>{Uo||(t.__VUE_DEVTOOLS_HOOK_REPLAY__=null,sl=[])},3e3)):sl=[]}function qC(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||vt;let a=n;const o=t.startsWith("update:"),i=o&&t.slice(7);if(i&&i in r){const u=`${i==="modelValue"?"model":i}Modifiers`,{number:f,trim:d}=r[u]||vt;d&&(a=n.map(m=>m.trim())),f&&(a=n.map(wa))}let l,s=r[l=rs(t)]||r[l=rs(Bn(t))];!s&&o&&(s=r[l=rs(Er(t))]),s&&Tn(s,e,6,a);const c=r[l+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[l])return;e.emitted[l]=!0,Tn(c,e,6,a)}}function uy(e,t,n=!1){const r=t.emitsCache,a=r.get(e);if(a!==void 0)return a;const o=e.emits;let i={},l=!1;if(!Qe(e)){const s=c=>{const u=uy(c,t,!0);u&&(l=!0,Ot(i,u))};!n&&t.mixins.length&&t.mixins.forEach(s),e.extends&&s(e.extends),e.mixins&&e.mixins.forEach(s)}return!o&&!l?(xt(e)&&r.set(e,null),null):(ze(o)?o.forEach(s=>i[s]=null):Ot(i,o),xt(e)&&r.set(e,i),i)}function wc(e,t){return!e||!$s(t)?!1:(t=t.slice(2).replace(/Once$/,""),ot(e,t[0].toLowerCase()+t.slice(1))||ot(e,Er(t))||ot(e,t))}let on=null,_c=null;function Cs(e){const t=on;return on=e,_c=e&&e.type.__scopeId||null,t}function dy(e){_c=e}function fy(){_c=null}const YC=e=>Ht;function Ht(e,t=on,n){if(!t||e._n)return e;const r=(...a)=>{r._d&&Od(-1);const o=Cs(t);let i;try{i=e(...a)}finally{Cs(o),r._d&&Od(1)}return i};return r._n=!0,r._c=!0,r._d=!0,r}function Pl(e){const{type:t,vnode:n,proxy:r,withProxy:a,props:o,propsOptions:[i],slots:l,attrs:s,emit:c,render:u,renderCache:f,data:d,setupState:m,ctx:y,inheritAttrs:g}=e;let A,h;const p=Cs(e);try{if(n.shapeFlag&4){const v=a||r;A=Sn(u.call(v,v,f,o,m,d,y)),h=s}else{const v=t;A=Sn(v.length>1?v(o,{attrs:s,slots:l,emit:c}):v(o,null)),h=t.props?s:KC(s)}}catch(v){is.length=0,vo(v,e,1),A=C(sn)}let b=A;if(h&&g!==!1){const v=Object.keys(h),{shapeFlag:x}=b;v.length&&x&7&&(i&&v.some(Rf)&&(h=QC(h,i)),b=_r(b,h))}return n.dirs&&(b=_r(b),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&(b.transition=n.transition),A=b,Cs(p),A}function GC(e){let t;for(let n=0;n<e.length;n++){const r=e[n];if(qr(r)){if(r.type!==sn||r.children==="v-if"){if(t)return;t=r}}else return}return t}const KC=e=>{let t;for(const n in e)(n==="class"||n==="style"||$s(n))&&((t||(t={}))[n]=e[n]);return t},QC=(e,t)=>{const n={};for(const r in e)(!Rf(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function XC(e,t,n){const{props:r,children:a,component:o}=e,{props:i,children:l,patchFlag:s}=t,c=o.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&s>=0){if(s&1024)return!0;if(s&16)return r?Kh(r,i,c):!!i;if(s&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(i[d]!==r[d]&&!wc(c,d))return!0}}}else return(a||l)&&(!l||!l.$stable)?!0:r===i?!1:r?i?Kh(r,i,c):!0:!!i;return!1}function Kh(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let a=0;a<r.length;a++){const o=r[a];if(t[o]!==e[o]&&!wc(n,o))return!0}return!1}function Xf({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const py=e=>e.__isSuspense,ZC={name:"Suspense",__isSuspense:!0,process(e,t,n,r,a,o,i,l,s,c){e==null?ew(t,n,r,a,o,i,l,s,c):tw(e,t,n,r,a,i,l,s,c)},hydrate:nw,create:Zf,normalize:rw},JC=ZC;function ws(e,t){const n=e.props&&e.props[t];Qe(n)&&n()}function ew(e,t,n,r,a,o,i,l,s){const{p:c,o:{createElement:u}}=s,f=u("div"),d=e.suspense=Zf(e,a,r,t,f,n,o,i,l,s);c(null,d.pendingBranch=e.ssContent,f,null,r,d,o,i),d.deps>0?(ws(e,"onPending"),ws(e,"onFallback"),c(null,e.ssFallback,t,n,r,null,o,i),Qo(d,e.ssFallback)):d.resolve()}function tw(e,t,n,r,a,o,i,l,{p:s,um:c,o:{createElement:u}}){const f=t.suspense=e.suspense;f.vnode=t,t.el=e.el;const d=t.ssContent,m=t.ssFallback,{activeBranch:y,pendingBranch:g,isInFallback:A,isHydrating:h}=f;if(g)f.pendingBranch=d,yr(d,g)?(s(g,d,f.hiddenContainer,null,a,f,o,i,l),f.deps<=0?f.resolve():A&&(s(y,m,n,r,a,null,o,i,l),Qo(f,m))):(f.pendingId++,h?(f.isHydrating=!1,f.activeBranch=g):c(g,a,f),f.deps=0,f.effects.length=0,f.hiddenContainer=u("div"),A?(s(null,d,f.hiddenContainer,null,a,f,o,i,l),f.deps<=0?f.resolve():(s(y,m,n,r,a,null,o,i,l),Qo(f,m))):y&&yr(d,y)?(s(y,d,n,r,a,f,o,i,l),f.resolve(!0)):(s(null,d,f.hiddenContainer,null,a,f,o,i,l),f.deps<=0&&f.resolve()));else if(y&&yr(d,y))s(y,d,n,r,a,f,o,i,l),Qo(f,d);else if(ws(t,"onPending"),f.pendingBranch=d,f.pendingId++,s(null,d,f.hiddenContainer,null,a,f,o,i,l),f.deps<=0)f.resolve();else{const{timeout:p,pendingId:b}=f;p>0?setTimeout(()=>{f.pendingId===b&&f.fallback(m)},p):p===0&&f.fallback(m)}}function Zf(e,t,n,r,a,o,i,l,s,c,u=!1){const{p:f,m:d,um:m,n:y,o:{parentNode:g,remove:A}}=c,h=wa(e.props&&e.props.timeout),p={vnode:e,parent:t,parentComponent:n,isSVG:i,container:r,hiddenContainer:a,anchor:o,deps:0,pendingId:0,timeout:typeof h=="number"?h:-1,activeBranch:null,pendingBranch:null,isInFallback:!0,isHydrating:u,isUnmounted:!1,effects:[],resolve(b=!1){const{vnode:v,activeBranch:x,pendingBranch:_,pendingId:S,effects:k,parentComponent:$,container:R}=p;if(p.isHydrating)p.isHydrating=!1;else if(!b){const M=x&&_.transition&&_.transition.mode==="out-in";M&&(x.transition.afterLeave=()=>{S===p.pendingId&&d(_,R,N,0)});let{anchor:N}=p;x&&(N=y(x),m(x,$,p,!0)),M||d(_,R,N,0)}Qo(p,_),p.pendingBranch=null,p.isInFallback=!1;let D=p.parent,j=!1;for(;D;){if(D.pendingBranch){D.effects.push(...k),j=!0;break}D=D.parent}j||Qf(k),p.effects=[],ws(v,"onResolve")},fallback(b){if(!p.pendingBranch)return;const{vnode:v,activeBranch:x,parentComponent:_,container:S,isSVG:k}=p;ws(v,"onFallback");const $=y(x),R=()=>{!p.isInFallback||(f(null,b,S,$,_,null,k,l,s),Qo(p,b))},D=b.transition&&b.transition.mode==="out-in";D&&(x.transition.afterLeave=R),p.isInFallback=!0,m(x,_,null,!0),D||R()},move(b,v,x){p.activeBranch&&d(p.activeBranch,b,v,x),p.container=b},next(){return p.activeBranch&&y(p.activeBranch)},registerDep(b,v){const x=!!p.pendingBranch;x&&p.deps++;const _=b.vnode.el;b.asyncDep.catch(S=>{vo(S,b,0)}).then(S=>{if(b.isUnmounted||p.isUnmounted||p.pendingId!==b.suspenseId)return;b.asyncResolved=!0;const{vnode:k}=b;Bd(b,S,!1),_&&(k.el=_);const $=!_&&b.subTree.el;v(b,k,g(_||b.subTree.el),_?null:y(b.subTree),p,i,s),$&&A($),Xf(b,k.el),x&&--p.deps===0&&p.resolve()})},unmount(b,v){p.isUnmounted=!0,p.activeBranch&&m(p.activeBranch,n,b,v),p.pendingBranch&&m(p.pendingBranch,n,b,v)}};return p}function nw(e,t,n,r,a,o,i,l,s){const c=t.suspense=Zf(t,r,n,e.parentNode,document.createElement("div"),null,a,o,i,l,!0),u=s(e,c.pendingBranch=t.ssContent,n,c,o,i);return c.deps===0&&c.resolve(),u}function rw(e){const{shapeFlag:t,children:n}=e,r=t&32;e.ssContent=Qh(r?n.default:n),e.ssFallback=r?Qh(n.fallback):C(sn)}function Qh(e){let t;if(Qe(e)){const n=po&&e._c;n&&(e._d=!1,Ve()),e=e(),n&&(e._d=!0,t=yn,My())}return ze(e)&&(e=GC(e)),e=Sn(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(n=>n!==e)),e}function hy(e,t){t&&t.pendingBranch?ze(e)?t.effects.push(...e):t.effects.push(e):Qf(e)}function Qo(e,t){e.activeBranch=t;const{vnode:n,parentComponent:r}=e,a=n.el=t.el;r&&r.subTree===n&&(r.vnode.el=a,Xf(r,a))}function Cr(e,t){if(Nt){let n=Nt.provides;const r=Nt.parent&&Nt.parent.provides;r===n&&(n=Nt.provides=Object.create(r)),n[e]=t}}function Wt(e,t,n=!1){const r=Nt||on;if(r){const a=r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides;if(a&&e in a)return a[e];if(arguments.length>1)return n&&Qe(t)?t.call(r.proxy):t}}function Sc(e,t){return Ns(e,null,t)}function my(e,t){return Ns(e,null,{flush:"post"})}function aw(e,t){return Ns(e,null,{flush:"sync"})}const Xh={};function Ie(e,t,n){return Ns(e,t,n)}function Ns(e,t,{immediate:n,deep:r,flush:a,onTrack:o,onTrigger:i}=vt){const l=Nt;let s,c=!1,u=!1;if(ct(e)?(s=()=>e.value,c=As(e)):jr(e)?(s=()=>e,r=!0):ze(e)?(u=!0,c=e.some(h=>jr(h)||As(h)),s=()=>e.map(h=>{if(ct(h))return h.value;if(jr(h))return eo(h);if(Qe(h))return xr(h,l,2)})):Qe(e)?t?s=()=>xr(e,l,2):s=()=>{if(!(l&&l.isUnmounted))return f&&f(),Tn(e,l,3,[d])}:s=er,t&&r){const h=s;s=()=>eo(h())}let f,d=h=>{f=A.onStop=()=>{xr(h,l,4)}};if(ii)return d=er,t?n&&Tn(t,l,3,[s(),u?[]:void 0,d]):s(),er;let m=u?[]:Xh;const y=()=>{if(!!A.active)if(t){const h=A.run();(r||c||(u?h.some((p,b)=>ri(p,m[b])):ri(h,m)))&&(f&&f(),Tn(t,l,3,[h,m===Xh?void 0:m,d]),m=h)}else A.run()};y.allowRecurse=!!t;let g;a==="sync"?g=y:a==="post"?g=()=>Qt(y,l&&l.suspense):(y.pre=!0,l&&(y.id=l.uid),g=()=>Cc(y));const A=new Ms(s,g);return t?n?y():m=A.run():a==="post"?Qt(A.run.bind(A),l&&l.suspense):A.run(),()=>{A.stop(),l&&l.scope&&Mf(l.scope.effects,A)}}function ow(e,t,n){const r=this.proxy,a=It(e)?e.includes(".")?gy(r,e):()=>r[e]:e.bind(r,r);let o;Qe(t)?o=t:(o=t.handler,n=t);const i=Nt;ka(this);const l=Ns(a,o.bind(r),n);return i?ka(i):ba(),l}function gy(e,t){const n=t.split(".");return()=>{let r=e;for(let a=0;a<n.length&&r;a++)r=r[n[a]];return r}}function eo(e,t){if(!xt(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),ct(e))eo(e.value,t);else if(ze(e))for(let n=0;n<e.length;n++)eo(e[n],t);else if(ho(e)||Yo(e))e.forEach(n=>{eo(n,t)});else if(Nv(e))for(const n in e)eo(e[n],t);return e}function Jf(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Et(()=>{e.isMounted=!0}),rr(()=>{e.isUnmounting=!0}),e}const Rn=[Function,Array],iw={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Rn,onEnter:Rn,onAfterEnter:Rn,onEnterCancelled:Rn,onBeforeLeave:Rn,onLeave:Rn,onAfterLeave:Rn,onLeaveCancelled:Rn,onBeforeAppear:Rn,onAppear:Rn,onAfterAppear:Rn,onAppearCancelled:Rn},setup(e,{slots:t}){const n=Gt(),r=Jf();let a;return()=>{const o=t.default&&kc(t.default(),!0);if(!o||!o.length)return;let i=o[0];if(o.length>1){for(const g of o)if(g.type!==sn){i=g;break}}const l=rt(e),{mode:s}=l;if(r.isLeaving)return Su(i);const c=Zh(i);if(!c)return Su(i);const u=ai(c,l,r,n);fo(c,u);const f=n.subTree,d=f&&Zh(f);let m=!1;const{getTransitionKey:y}=c.type;if(y){const g=y();a===void 0?a=g:g!==a&&(a=g,m=!0)}if(d&&d.type!==sn&&(!yr(c,d)||m)){const g=ai(d,l,r,n);if(fo(d,g),s==="out-in")return r.isLeaving=!0,g.afterLeave=()=>{r.isLeaving=!1,n.update()},Su(i);s==="in-out"&&c.type!==sn&&(g.delayLeave=(A,h,p)=>{const b=vy(r,d);b[String(d.key)]=d,A._leaveCb=()=>{h(),A._leaveCb=void 0,delete u.delayedLeave},u.delayedLeave=p})}return i}}},ep=iw;function vy(e,t){const{leavingVNodes:n}=e;let r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function ai(e,t,n,r){const{appear:a,mode:o,persisted:i=!1,onBeforeEnter:l,onEnter:s,onAfterEnter:c,onEnterCancelled:u,onBeforeLeave:f,onLeave:d,onAfterLeave:m,onLeaveCancelled:y,onBeforeAppear:g,onAppear:A,onAfterAppear:h,onAppearCancelled:p}=t,b=String(e.key),v=vy(n,e),x=(k,$)=>{k&&Tn(k,r,9,$)},_=(k,$)=>{const R=$[1];x(k,$),ze(k)?k.every(D=>D.length<=1)&&R():k.length<=1&&R()},S={mode:o,persisted:i,beforeEnter(k){let $=l;if(!n.isMounted)if(a)$=g||l;else return;k._leaveCb&&k._leaveCb(!0);const R=v[b];R&&yr(e,R)&&R.el._leaveCb&&R.el._leaveCb(),x($,[k])},enter(k){let $=s,R=c,D=u;if(!n.isMounted)if(a)$=A||s,R=h||c,D=p||u;else return;let j=!1;const M=k._enterCb=N=>{j||(j=!0,N?x(D,[k]):x(R,[k]),S.delayedLeave&&S.delayedLeave(),k._enterCb=void 0)};$?_($,[k,M]):M()},leave(k,$){const R=String(e.key);if(k._enterCb&&k._enterCb(!0),n.isUnmounting)return $();x(f,[k]);let D=!1;const j=k._leaveCb=M=>{D||(D=!0,$(),M?x(y,[k]):x(m,[k]),k._leaveCb=void 0,v[R]===e&&delete v[R])};v[R]=e,d?_(d,[k,j]):j()},clone(k){return ai(k,t,n,r)}};return S}function Su(e){if(Fs(e))return e=_r(e),e.children=null,e}function Zh(e){return Fs(e)?e.children?e.children[0]:void 0:e}function fo(e,t){e.shapeFlag&6&&e.component?fo(e.component.subTree,t):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function kc(e,t=!1,n){let r=[],a=0;for(let o=0;o<e.length;o++){let i=e[o];const l=n==null?i.key:String(n)+String(i.key!=null?i.key:o);i.type===lt?(i.patchFlag&128&&a++,r=r.concat(kc(i.children,t,l))):(t||i.type!==sn)&&r.push(l!=null?_r(i,{key:l}):i)}if(a>1)for(let o=0;o<r.length;o++)r[o].patchFlag=-2;return r}function ye(e){return Qe(e)?{setup:e,name:e.name}:e}const ro=e=>!!e.type.__asyncLoader;function sw(e){Qe(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:r,delay:a=200,timeout:o,suspensible:i=!0,onError:l}=e;let s=null,c,u=0;const f=()=>(u++,s=null,d()),d=()=>{let m;return s||(m=s=t().catch(y=>{if(y=y instanceof Error?y:new Error(String(y)),l)return new Promise((g,A)=>{l(y,()=>g(f()),()=>A(y),u+1)});throw y}).then(y=>m!==s&&s?s:(y&&(y.__esModule||y[Symbol.toStringTag]==="Module")&&(y=y.default),c=y,y)))};return ye({name:"AsyncComponentWrapper",__asyncLoader:d,get __asyncResolved(){return c},setup(){const m=Nt;if(c)return()=>ku(c,m);const y=p=>{s=null,vo(p,m,13,!r)};if(i&&m.suspense||ii)return d().then(p=>()=>ku(p,m)).catch(p=>(y(p),()=>r?C(r,{error:p}):null));const g=re(!1),A=re(),h=re(!!a);return a&&setTimeout(()=>{h.value=!1},a),o!=null&&setTimeout(()=>{if(!g.value&&!A.value){const p=new Error(`Async component timed out after ${o}ms.`);y(p),A.value=p}},o),d().then(()=>{g.value=!0,m.parent&&Fs(m.parent.vnode)&&Cc(m.parent.update)}).catch(p=>{y(p),A.value=p}),()=>{if(g.value&&c)return ku(c,m);if(A.value&&r)return C(r,{error:A.value});if(n&&!h.value)return C(n)}}})}function ku(e,{vnode:{ref:t,props:n,children:r,shapeFlag:a},parent:o}){const i=C(e,n,r);return i.ref=t,i}const Fs=e=>e.type.__isKeepAlive,lw={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){const n=Gt(),r=n.ctx;if(!r.renderer)return()=>{const p=t.default&&t.default();return p&&p.length===1?p[0]:p};const a=new Map,o=new Set;let i=null;const l=n.suspense,{renderer:{p:s,m:c,um:u,o:{createElement:f}}}=r,d=f("div");r.activate=(p,b,v,x,_)=>{const S=p.component;c(p,b,v,0,l),s(S.vnode,p,b,v,S,l,x,p.slotScopeIds,_),Qt(()=>{S.isDeactivated=!1,S.a&&Go(S.a);const k=p.props&&p.props.onVnodeMounted;k&&vn(k,S.parent,p)},l)},r.deactivate=p=>{const b=p.component;c(p,d,null,1,l),Qt(()=>{b.da&&Go(b.da);const v=p.props&&p.props.onVnodeUnmounted;v&&vn(v,b.parent,p),b.isDeactivated=!0},l)};function m(p){Tu(p),u(p,n,l,!0)}function y(p){a.forEach((b,v)=>{const x=Gl(b.type);x&&(!p||!p(x))&&g(v)})}function g(p){const b=a.get(p);!i||b.type!==i.type?m(b):i&&Tu(i),a.delete(p),o.delete(p)}Ie(()=>[e.include,e.exclude],([p,b])=>{p&&y(v=>Zi(p,v)),b&&y(v=>!Zi(b,v))},{flush:"post",deep:!0});let A=null;const h=()=>{A!=null&&a.set(A,Iu(n.subTree))};return Et(h),zs(h),rr(()=>{a.forEach(p=>{const{subTree:b,suspense:v}=n,x=Iu(b);if(p.type===x.type){Tu(x);const _=x.component.da;_&&Qt(_,v);return}m(p)})}),()=>{if(A=null,!t.default)return null;const p=t.default(),b=p[0];if(p.length>1)return i=null,p;if(!qr(b)||!(b.shapeFlag&4)&&!(b.shapeFlag&128))return i=null,b;let v=Iu(b);const x=v.type,_=Gl(ro(v)?v.type.__asyncResolved||{}:x),{include:S,exclude:k,max:$}=e;if(S&&(!_||!Zi(S,_))||k&&_&&Zi(k,_))return i=v,b;const R=v.key==null?x:v.key,D=a.get(R);return v.el&&(v=_r(v),b.shapeFlag&128&&(b.ssContent=v)),A=R,D?(v.el=D.el,v.component=D.component,v.transition&&fo(v,v.transition),v.shapeFlag|=512,o.delete(R),o.add(R)):(o.add(R),$&&o.size>parseInt($,10)&&g(o.values().next().value)),v.shapeFlag|=256,i=v,py(b.type)?b:v}}},cw=lw;function Zi(e,t){return ze(e)?e.some(n=>Zi(n,t)):It(e)?e.split(",").includes(t):e.test?e.test(t):!1}function yo(e,t){yy(e,"a",t)}function Oa(e,t){yy(e,"da",t)}function yy(e,t,n=Nt){const r=e.__wdc||(e.__wdc=()=>{let a=n;for(;a;){if(a.isDeactivated)return;a=a.parent}return e()});if(Tc(t,r,n),n){let a=n.parent;for(;a&&a.parent;)Fs(a.parent.vnode)&&uw(r,t,n,a),a=a.parent}}function uw(e,t,n,r){const a=Tc(t,e,r,!0);Un(()=>{Mf(r[t],a)},n)}function Tu(e){let t=e.shapeFlag;t&256&&(t-=256),t&512&&(t-=512),e.shapeFlag=t}function Iu(e){return e.shapeFlag&128?e.ssContent:e}function Tc(e,t,n=Nt,r=!1){if(n){const a=n[e]||(n[e]=[]),o=t.__weh||(t.__weh=(...i)=>{if(n.isUnmounted)return;mo(),ka(n);const l=Tn(t,n,e,i);return ba(),go(),l});return r?a.unshift(o):a.push(o),o}}const Qr=e=>(t,n=Nt)=>(!ii||e==="sp")&&Tc(e,(...r)=>t(...r),n),Ay=Qr("bm"),Et=Qr("m"),tp=Qr("bu"),zs=Qr("u"),rr=Qr("bum"),Un=Qr("um"),by=Qr("sp"),Ey=Qr("rtg"),xy=Qr("rtc");function Cy(e,t=Nt){Tc("ec",e,t)}function Fe(e,t){const n=on;if(n===null)return e;const r=Oc(n)||n.proxy,a=e.dirs||(e.dirs=[]);for(let o=0;o<t.length;o++){let[i,l,s,c=vt]=t[o];Qe(i)&&(i={mounted:i,updated:i}),i.deep&&eo(l),a.push({dir:i,instance:r,value:l,oldValue:void 0,arg:s,modifiers:c})}return e}function mr(e,t,n,r){const a=e.dirs,o=t&&t.dirs;for(let i=0;i<a.length;i++){const l=a[i];o&&(l.oldValue=o[i].value);let s=l.dir[r];s&&(mo(),Tn(s,n,8,[e.el,l,e,t]),go())}}const np="components",dw="directives";function Fn(e,t){return rp(np,e,!0,t)||e}const wy=Symbol();function fw(e){return It(e)?rp(np,e,!1)||e:e||wy}function _y(e){return rp(dw,e)}function rp(e,t,n=!0,r=!1){const a=on||Nt;if(a){const o=a.type;if(e===np){const l=Gl(o,!1);if(l&&(l===t||l===Bn(t)||l===Rs(Bn(t))))return o}const i=Jh(a[e]||o[e],t)||Jh(a.appContext[e],t);return!i&&r?o:i}}function Jh(e,t){return e&&(e[t]||e[Bn(t)]||e[Rs(Bn(t))])}function zn(e,t,n,r){let a;const o=n&&n[r];if(ze(e)||It(e)){a=new Array(e.length);for(let i=0,l=e.length;i<l;i++)a[i]=t(e[i],i,void 0,o&&o[i])}else if(typeof e=="number"){a=new Array(e);for(let i=0;i<e;i++)a[i]=t(i+1,i,void 0,o&&o[i])}else if(xt(e))if(e[Symbol.iterator])a=Array.from(e,(i,l)=>t(i,l,void 0,o&&o[l]));else{const i=Object.keys(e);a=new Array(i.length);for(let l=0,s=i.length;l<s;l++){const c=i[l];a[l]=t(e[c],c,l,o&&o[l])}}else a=[];return n&&(n[r]=a),a}function pw(e,t){for(let n=0;n<t.length;n++){const r=t[n];if(ze(r))for(let a=0;a<r.length;a++)e[r[a].name]=r[a].fn;else r&&(e[r.name]=r.key?(...a)=>{const o=r.fn(...a);return o&&(o.key=r.key),o}:r.fn)}return e}function hw(e,t,n={},r,a){if(on.isCE||on.parent&&ro(on.parent)&&on.parent.isCE)return C("slot",t==="default"?null:{name:t},r&&r());let o=e[t];o&&o._c&&(o._d=!1),Ve();const i=o&&Sy(o(n)),l=Us(lt,{key:n.key||i&&i.key||`_${t}`},i||(r?r():[]),i&&e._===1?64:-2);return!a&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),o&&o._c&&(o._d=!0),l}function Sy(e){return e.some(t=>qr(t)?!(t.type===sn||t.type===lt&&!Sy(t.children)):!0)?e:null}function mw(e,t){const n={};for(const r in e)n[t&&/[A-Z]/.test(r)?`on:${r}`:rs(r)]=e[r];return n}const wd=e=>e?Vy(e)?Oc(e)||e.proxy:wd(e.parent):null,Hl=Ot(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>wd(e.parent),$root:e=>wd(e.root),$emit:e=>e.emit,$options:e=>ap(e),$forceUpdate:e=>e.f||(e.f=()=>Cc(e.update)),$nextTick:e=>e.n||(e.n=Ke.bind(e.proxy)),$watch:e=>ow.bind(e)}),_d={get({_:e},t){const{ctx:n,setupState:r,data:a,props:o,accessCache:i,type:l,appContext:s}=e;let c;if(t[0]!=="$"){const m=i[t];if(m!==void 0)switch(m){case 1:return r[t];case 2:return a[t];case 4:return n[t];case 3:return o[t]}else{if(r!==vt&&ot(r,t))return i[t]=1,r[t];if(a!==vt&&ot(a,t))return i[t]=2,a[t];if((c=e.propsOptions[0])&&ot(c,t))return i[t]=3,o[t];if(n!==vt&&ot(n,t))return i[t]=4,n[t];Sd&&(i[t]=0)}}const u=Hl[t];let f,d;if(u)return t==="$attrs"&&Ln(e,"get",t),u(e);if((f=l.__cssModules)&&(f=f[t]))return f;if(n!==vt&&ot(n,t))return i[t]=4,n[t];if(d=s.config.globalProperties,ot(d,t))return d[t]},set({_:e},t,n){const{data:r,setupState:a,ctx:o}=e;return a!==vt&&ot(a,t)?(a[t]=n,!0):r!==vt&&ot(r,t)?(r[t]=n,!0):ot(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(o[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:a,propsOptions:o}},i){let l;return!!n[i]||e!==vt&&ot(e,i)||t!==vt&&ot(t,i)||(l=o[0])&&ot(l,i)||ot(r,i)||ot(Hl,i)||ot(a.config.globalProperties,i)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:ot(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},gw=Ot({},_d,{get(e,t){if(t!==Symbol.unscopables)return _d.get(e,t,e)},has(e,t){return t[0]!=="_"&&!Nx(t)}});let Sd=!0;function vw(e){const t=ap(e),n=e.proxy,r=e.ctx;Sd=!1,t.beforeCreate&&em(t.beforeCreate,e,"bc");const{data:a,computed:o,methods:i,watch:l,provide:s,inject:c,created:u,beforeMount:f,mounted:d,beforeUpdate:m,updated:y,activated:g,deactivated:A,beforeDestroy:h,beforeUnmount:p,destroyed:b,unmounted:v,render:x,renderTracked:_,renderTriggered:S,errorCaptured:k,serverPrefetch:$,expose:R,inheritAttrs:D,components:j,directives:M,filters:N}=t;if(c&&yw(c,r,null,e.appContext.config.unwrapInjectedRef),i)for(const X in i){const Y=i[X];Qe(Y)&&(r[X]=Y.bind(n))}if(a){const X=a.call(n,n);xt(X)&&(e.data=He(X))}if(Sd=!0,o)for(const X in o){const Y=o[X],le=Qe(Y)?Y.bind(n,n):Qe(Y.get)?Y.get.bind(n,n):er,Q=!Qe(Y)&&Qe(Y.set)?Y.set.bind(n):er,ie=oe({get:le,set:Q});Object.defineProperty(r,X,{enumerable:!0,configurable:!0,get:()=>ie.value,set:ne=>ie.value=ne})}if(l)for(const X in l)ky(l[X],r,n,X);if(s){const X=Qe(s)?s.call(n):s;Reflect.ownKeys(X).forEach(Y=>{Cr(Y,X[Y])})}u&&em(u,e,"c");function z(X,Y){ze(Y)?Y.forEach(le=>X(le.bind(n))):Y&&X(Y.bind(n))}if(z(Ay,f),z(Et,d),z(tp,m),z(zs,y),z(yo,g),z(Oa,A),z(Cy,k),z(xy,_),z(Ey,S),z(rr,p),z(Un,v),z(by,$),ze(R))if(R.length){const X=e.exposed||(e.exposed={});R.forEach(Y=>{Object.defineProperty(X,Y,{get:()=>n[Y],set:le=>n[Y]=le})})}else e.exposed||(e.exposed={});x&&e.render===er&&(e.render=x),D!=null&&(e.inheritAttrs=D),j&&(e.components=j),M&&(e.directives=M)}function yw(e,t,n=er,r=!1){ze(e)&&(e=kd(e));for(const a in e){const o=e[a];let i;xt(o)?"default"in o?i=Wt(o.from||a,o.default,!0):i=Wt(o.from||a):i=Wt(o),ct(i)&&r?Object.defineProperty(t,a,{enumerable:!0,configurable:!0,get:()=>i.value,set:l=>i.value=l}):t[a]=i}}function em(e,t,n){Tn(ze(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function ky(e,t,n,r){const a=r.includes(".")?gy(n,r):()=>n[r];if(It(e)){const o=t[e];Qe(o)&&Ie(a,o)}else if(Qe(e))Ie(a,e.bind(n));else if(xt(e))if(ze(e))e.forEach(o=>ky(o,t,n,r));else{const o=Qe(e.handler)?e.handler.bind(n):t[e.handler];Qe(o)&&Ie(a,o,e)}}function ap(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:a,optionsCache:o,config:{optionMergeStrategies:i}}=e.appContext,l=o.get(t);let s;return l?s=l:!a.length&&!n&&!r?s=t:(s={},a.length&&a.forEach(c=>Wl(s,c,i,!0)),Wl(s,t,i)),xt(t)&&o.set(t,s),s}function Wl(e,t,n,r=!1){const{mixins:a,extends:o}=t;o&&Wl(e,o,n,!0),a&&a.forEach(i=>Wl(e,i,n,!0));for(const i in t)if(!(r&&i==="expose")){const l=Aw[i]||n&&n[i];e[i]=l?l(e[i],t[i]):t[i]}return e}const Aw={data:tm,props:Ga,emits:Ga,methods:Ga,computed:Ga,beforeCreate:fn,created:fn,beforeMount:fn,mounted:fn,beforeUpdate:fn,updated:fn,beforeDestroy:fn,beforeUnmount:fn,destroyed:fn,unmounted:fn,activated:fn,deactivated:fn,errorCaptured:fn,serverPrefetch:fn,components:Ga,directives:Ga,watch:Ew,provide:tm,inject:bw};function tm(e,t){return t?e?function(){return Ot(Qe(e)?e.call(this,this):e,Qe(t)?t.call(this,this):t)}:t:e}function bw(e,t){return Ga(kd(e),kd(t))}function kd(e){if(ze(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function fn(e,t){return e?[...new Set([].concat(e,t))]:t}function Ga(e,t){return e?Ot(Ot(Object.create(null),e),t):t}function Ew(e,t){if(!e)return t;if(!t)return e;const n=Ot(Object.create(null),e);for(const r in t)n[r]=fn(e[r],t[r]);return n}function xw(e,t,n,r=!1){const a={},o={};Ul(o,Ic,1),e.propsDefaults=Object.create(null),Ty(e,t,a,o);for(const i in e.propsOptions[0])i in a||(a[i]=void 0);n?e.props=r?a:Zv(a):e.type.props?e.props=a:e.props=o,e.attrs=o}function Cw(e,t,n,r){const{props:a,attrs:o,vnode:{patchFlag:i}}=e,l=rt(a),[s]=e.propsOptions;let c=!1;if((r||i>0)&&!(i&16)){if(i&8){const u=e.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(wc(e.emitsOptions,d))continue;const m=t[d];if(s)if(ot(o,d))m!==o[d]&&(o[d]=m,c=!0);else{const y=Bn(d);a[y]=Td(s,l,y,m,e,!1)}else m!==o[d]&&(o[d]=m,c=!0)}}}else{Ty(e,t,a,o)&&(c=!0);let u;for(const f in l)(!t||!ot(t,f)&&((u=Er(f))===f||!ot(t,u)))&&(s?n&&(n[f]!==void 0||n[u]!==void 0)&&(a[f]=Td(s,l,f,void 0,e,!0)):delete a[f]);if(o!==l)for(const f in o)(!t||!ot(t,f)&&!0)&&(delete o[f],c=!0)}c&&Wr(e,"set","$attrs")}function Ty(e,t,n,r){const[a,o]=e.propsOptions;let i=!1,l;if(t)for(let s in t){if(ns(s))continue;const c=t[s];let u;a&&ot(a,u=Bn(s))?!o||!o.includes(u)?n[u]=c:(l||(l={}))[u]=c:wc(e.emitsOptions,s)||(!(s in r)||c!==r[s])&&(r[s]=c,i=!0)}if(o){const s=rt(n),c=l||vt;for(let u=0;u<o.length;u++){const f=o[u];n[f]=Td(a,s,f,c[f],e,!ot(c,f))}}return i}function Td(e,t,n,r,a,o){const i=e[n];if(i!=null){const l=ot(i,"default");if(l&&r===void 0){const s=i.default;if(i.type!==Function&&Qe(s)){const{propsDefaults:c}=a;n in c?r=c[n]:(ka(a),r=c[n]=s.call(null,t),ba())}else r=s}i[0]&&(o&&!l?r=!1:i[1]&&(r===""||r===Er(n))&&(r=!0))}return r}function Iy(e,t,n=!1){const r=t.propsCache,a=r.get(e);if(a)return a;const o=e.props,i={},l=[];let s=!1;if(!Qe(e)){const u=f=>{s=!0;const[d,m]=Iy(f,t,!0);Ot(i,d),m&&l.push(...m)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!o&&!s)return xt(e)&&r.set(e,qo),qo;if(ze(o))for(let u=0;u<o.length;u++){const f=Bn(o[u]);nm(f)&&(i[f]=vt)}else if(o)for(const u in o){const f=Bn(u);if(nm(f)){const d=o[u],m=i[f]=ze(d)||Qe(d)?{type:d}:d;if(m){const y=om(Boolean,m.type),g=om(String,m.type);m[0]=y>-1,m[1]=g<0||y<g,(y>-1||ot(m,"default"))&&l.push(f)}}}const c=[i,l];return xt(e)&&r.set(e,c),c}function nm(e){return e[0]!=="$"}function rm(e){const t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:e===null?"null":""}function am(e,t){return rm(e)===rm(t)}function om(e,t){return ze(t)?t.findIndex(n=>am(n,e)):Qe(t)&&am(t,e)?0:-1}const Oy=e=>e[0]==="_"||e==="$stable",op=e=>ze(e)?e.map(Sn):[Sn(e)],ww=(e,t,n)=>{if(t._n)return t;const r=Ht((...a)=>op(t(...a)),n);return r._c=!1,r},By=(e,t,n)=>{const r=e._ctx;for(const a in e){if(Oy(a))continue;const o=e[a];if(Qe(o))t[a]=ww(a,o,r);else if(o!=null){const i=op(o);t[a]=()=>i}}},Ly=(e,t)=>{const n=op(t);e.slots.default=()=>n},_w=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=rt(t),Ul(t,"_",n)):By(t,e.slots={})}else e.slots={},t&&Ly(e,t);Ul(e.slots,Ic,1)},Sw=(e,t,n)=>{const{vnode:r,slots:a}=e;let o=!0,i=vt;if(r.shapeFlag&32){const l=t._;l?n&&l===1?o=!1:(Ot(a,t),!n&&l===1&&delete a._):(o=!t.$stable,By(t,a)),i=t}else t&&(Ly(e,t),i={default:1});if(o)for(const l in a)!Oy(l)&&!(l in i)&&delete a[l]};function Py(){return{app:null,config:{isNativeTag:qx,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let kw=0;function Tw(e,t){return function(r,a=null){Qe(r)||(r=Object.assign({},r)),a!=null&&!xt(a)&&(a=null);const o=Py(),i=new Set;let l=!1;const s=o.app={_uid:kw++,_component:r,_props:a,_container:null,_context:o,_instance:null,version:Xy,get config(){return o.config},set config(c){},use(c,...u){return i.has(c)||(c&&Qe(c.install)?(i.add(c),c.install(s,...u)):Qe(c)&&(i.add(c),c(s,...u))),s},mixin(c){return o.mixins.includes(c)||o.mixins.push(c),s},component(c,u){return u?(o.components[c]=u,s):o.components[c]},directive(c,u){return u?(o.directives[c]=u,s):o.directives[c]},mount(c,u,f){if(!l){const d=C(r,a);return d.appContext=o,u&&t?t(d,c):e(d,c,f),l=!0,s._container=c,c.__vue_app__=s,Oc(d.component)||d.component.proxy}},unmount(){l&&(e(null,s._container),delete s._container.__vue_app__)},provide(c,u){return o.provides[c]=u,s}};return s}}function ql(e,t,n,r,a=!1){if(ze(e)){e.forEach((d,m)=>ql(d,t&&(ze(t)?t[m]:t),n,r,a));return}if(ro(r)&&!a)return;const o=r.shapeFlag&4?Oc(r.component)||r.component.proxy:r.el,i=a?null:o,{i:l,r:s}=e,c=t&&t.r,u=l.refs===vt?l.refs={}:l.refs,f=l.setupState;if(c!=null&&c!==s&&(It(c)?(u[c]=null,ot(f,c)&&(f[c]=null)):ct(c)&&(c.value=null)),Qe(s))xr(s,l,12,[i,u]);else{const d=It(s),m=ct(s);if(d||m){const y=()=>{if(e.f){const g=d?ot(f,s)?f[s]:u[s]:s.value;a?ze(g)&&Mf(g,o):ze(g)?g.includes(o)||g.push(o):d?(u[s]=[o],ot(f,s)&&(f[s]=u[s])):(s.value=[o],e.k&&(u[e.k]=s.value))}else d?(u[s]=i,ot(f,s)&&(f[s]=i)):m&&(s.value=i,e.k&&(u[e.k]=i))};i?(y.id=-1,Qt(y,n)):y()}}}let ta=!1;const ll=e=>/svg/.test(e.namespaceURI)&&e.tagName!=="foreignObject",cl=e=>e.nodeType===8;function Iw(e){const{mt:t,p:n,o:{patchProp:r,createText:a,nextSibling:o,parentNode:i,remove:l,insert:s,createComment:c}}=e,u=(h,p)=>{if(!p.hasChildNodes()){n(null,h,p),Vl(),p._vnode=h;return}ta=!1,f(p.firstChild,h,null,null,null),Vl(),p._vnode=h,ta&&console.error("Hydration completed but contains mismatches.")},f=(h,p,b,v,x,_=!1)=>{const S=cl(h)&&h.data==="[",k=()=>g(h,p,b,v,x,S),{type:$,ref:R,shapeFlag:D,patchFlag:j}=p;let M=h.nodeType;p.el=h,j===-2&&(_=!1,p.dynamicChildren=null);let N=null;switch($){case oi:M!==3?p.children===""?(s(p.el=a(""),i(h),h),N=h):N=k():(h.data!==p.children&&(ta=!0,h.data=p.children),N=o(h));break;case sn:M!==8||S?N=k():N=o(h);break;case ao:if(S&&(h=o(h),M=h.nodeType),M===1||M===3){N=h;const F=!p.children.length;for(let z=0;z<p.staticCount;z++)F&&(p.children+=N.nodeType===1?N.outerHTML:N.data),z===p.staticCount-1&&(p.anchor=N),N=o(N);return S?o(N):N}else k();break;case lt:S?N=y(h,p,b,v,x,_):N=k();break;default:if(D&1)M!==1||p.type.toLowerCase()!==h.tagName.toLowerCase()?N=k():N=d(h,p,b,v,x,_);else if(D&6){p.slotScopeIds=x;const F=i(h);if(t(p,F,null,b,v,ll(F),_),N=S?A(h):o(h),N&&cl(N)&&N.data==="teleport end"&&(N=o(N)),ro(p)){let z;S?(z=C(lt),z.anchor=N?N.previousSibling:F.lastChild):z=h.nodeType===3?Sa(""):C("div"),z.el=h,p.component.subTree=z}}else D&64?M!==8?N=k():N=p.type.hydrate(h,p,b,v,x,_,e,m):D&128&&(N=p.type.hydrate(h,p,b,v,ll(i(h)),x,_,e,f))}return R!=null&&ql(R,null,v,p),N},d=(h,p,b,v,x,_)=>{_=_||!!p.dynamicChildren;const{type:S,props:k,patchFlag:$,shapeFlag:R,dirs:D}=p,j=S==="input"&&D||S==="option";if(j||$!==-1){if(D&&mr(p,null,b,"created"),k)if(j||!_||$&48)for(const N in k)(j&&N.endsWith("value")||$s(N)&&!ns(N))&&r(h,N,null,k[N],!1,void 0,b);else k.onClick&&r(h,"onClick",null,k.onClick,!1,void 0,b);let M;if((M=k&&k.onVnodeBeforeMount)&&vn(M,b,p),D&&mr(p,null,b,"beforeMount"),((M=k&&k.onVnodeMounted)||D)&&hy(()=>{M&&vn(M,b,p),D&&mr(p,null,b,"mounted")},v),R&16&&!(k&&(k.innerHTML||k.textContent))){let N=m(h.firstChild,p,h,b,v,x,_);for(;N;){ta=!0;const F=N;N=N.nextSibling,l(F)}}else R&8&&h.textContent!==p.children&&(ta=!0,h.textContent=p.children)}return h.nextSibling},m=(h,p,b,v,x,_,S)=>{S=S||!!p.dynamicChildren;const k=p.children,$=k.length;for(let R=0;R<$;R++){const D=S?k[R]:k[R]=Sn(k[R]);if(h)h=f(h,D,v,x,_,S);else{if(D.type===oi&&!D.children)continue;ta=!0,n(null,D,b,null,v,x,ll(b),_)}}return h},y=(h,p,b,v,x,_)=>{const{slotScopeIds:S}=p;S&&(x=x?x.concat(S):S);const k=i(h),$=m(o(h),p,k,b,v,x,_);return $&&cl($)&&$.data==="]"?o(p.anchor=$):(ta=!0,s(p.anchor=c("]"),k,$),$)},g=(h,p,b,v,x,_)=>{if(ta=!0,p.el=null,_){const $=A(h);for(;;){const R=o(h);if(R&&R!==$)l(R);else break}}const S=o(h),k=i(h);return l(h),n(null,p,k,S,b,v,ll(k),x),S},A=h=>{let p=0;for(;h;)if(h=o(h),h&&cl(h)&&(h.data==="["&&p++,h.data==="]")){if(p===0)return o(h);p--}return h};return[u,f]}const Qt=hy;function $y(e){return Ry(e)}function Dy(e){return Ry(e,Iw)}function Ry(e,t){const n=Zx();n.__VUE__=!0;const{insert:r,remove:a,patchProp:o,createElement:i,createText:l,createComment:s,setText:c,setElementText:u,parentNode:f,nextSibling:d,setScopeId:m=er,insertStaticContent:y}=e,g=(U,T,B,H=null,J=null,de=null,me=!1,Ae=null,xe=!!T.dynamicChildren)=>{if(U===T)return;U&&!yr(U,T)&&(H=te(U),ne(U,J,de,!0),U=null),T.patchFlag===-2&&(xe=!1,T.dynamicChildren=null);const{type:be,ref:Te,shapeFlag:Z}=T;switch(be){case oi:A(U,T,B,H);break;case sn:h(U,T,B,H);break;case ao:U==null&&p(T,B,H,me);break;case lt:j(U,T,B,H,J,de,me,Ae,xe);break;default:Z&1?x(U,T,B,H,J,de,me,Ae,xe):Z&6?M(U,T,B,H,J,de,me,Ae,xe):(Z&64||Z&128)&&be.process(U,T,B,H,J,de,me,Ae,xe,_e)}Te!=null&&J&&ql(Te,U&&U.ref,de,T||U,!T)},A=(U,T,B,H)=>{if(U==null)r(T.el=l(T.children),B,H);else{const J=T.el=U.el;T.children!==U.children&&c(J,T.children)}},h=(U,T,B,H)=>{U==null?r(T.el=s(T.children||""),B,H):T.el=U.el},p=(U,T,B,H)=>{[U.el,U.anchor]=y(U.children,T,B,H,U.el,U.anchor)},b=({el:U,anchor:T},B,H)=>{let J;for(;U&&U!==T;)J=d(U),r(U,B,H),U=J;r(T,B,H)},v=({el:U,anchor:T})=>{let B;for(;U&&U!==T;)B=d(U),a(U),U=B;a(T)},x=(U,T,B,H,J,de,me,Ae,xe)=>{me=me||T.type==="svg",U==null?_(T,B,H,J,de,me,Ae,xe):$(U,T,J,de,me,Ae,xe)},_=(U,T,B,H,J,de,me,Ae)=>{let xe,be;const{type:Te,props:Z,shapeFlag:se,transition:De,dirs:Le}=U;if(xe=U.el=i(U.type,de,Z&&Z.is,Z),se&8?u(xe,U.children):se&16&&k(U.children,xe,null,H,J,de&&Te!=="foreignObject",me,Ae),Le&&mr(U,null,H,"created"),Z){for(const nt in Z)nt!=="value"&&!ns(nt)&&o(xe,nt,null,Z[nt],de,U.children,H,J,W);"value"in Z&&o(xe,"value",null,Z.value),(be=Z.onVnodeBeforeMount)&&vn(be,H,U)}S(xe,U,U.scopeId,me,H),Le&&mr(U,null,H,"beforeMount");const Ze=(!J||J&&!J.pendingBranch)&&De&&!De.persisted;Ze&&De.beforeEnter(xe),r(xe,T,B),((be=Z&&Z.onVnodeMounted)||Ze||Le)&&Qt(()=>{be&&vn(be,H,U),Ze&&De.enter(xe),Le&&mr(U,null,H,"mounted")},J)},S=(U,T,B,H,J)=>{if(B&&m(U,B),H)for(let de=0;de<H.length;de++)m(U,H[de]);if(J){let de=J.subTree;if(T===de){const me=J.vnode;S(U,me,me.scopeId,me.slotScopeIds,J.parent)}}},k=(U,T,B,H,J,de,me,Ae,xe=0)=>{for(let be=xe;be<U.length;be++){const Te=U[be]=Ae?da(U[be]):Sn(U[be]);g(null,Te,T,B,H,J,de,me,Ae)}},$=(U,T,B,H,J,de,me)=>{const Ae=T.el=U.el;let{patchFlag:xe,dynamicChildren:be,dirs:Te}=T;xe|=U.patchFlag&16;const Z=U.props||vt,se=T.props||vt;let De;B&&Ha(B,!1),(De=se.onVnodeBeforeUpdate)&&vn(De,B,T,U),Te&&mr(T,U,B,"beforeUpdate"),B&&Ha(B,!0);const Le=J&&T.type!=="foreignObject";if(be?R(U.dynamicChildren,be,Ae,B,H,Le,de):me||Y(U,T,Ae,null,B,H,Le,de,!1),xe>0){if(xe&16)D(Ae,T,Z,se,B,H,J);else if(xe&2&&Z.class!==se.class&&o(Ae,"class",null,se.class,J),xe&4&&o(Ae,"style",Z.style,se.style,J),xe&8){const Ze=T.dynamicProps;for(let nt=0;nt<Ze.length;nt++){const bt=Ze[nt],Bt=Z[bt],cr=se[bt];(cr!==Bt||bt==="value")&&o(Ae,bt,Bt,cr,J,U.children,B,H,W)}}xe&1&&U.children!==T.children&&u(Ae,T.children)}else!me&&be==null&&D(Ae,T,Z,se,B,H,J);((De=se.onVnodeUpdated)||Te)&&Qt(()=>{De&&vn(De,B,T,U),Te&&mr(T,U,B,"updated")},H)},R=(U,T,B,H,J,de,me)=>{for(let Ae=0;Ae<T.length;Ae++){const xe=U[Ae],be=T[Ae],Te=xe.el&&(xe.type===lt||!yr(xe,be)||xe.shapeFlag&70)?f(xe.el):B;g(xe,be,Te,null,H,J,de,me,!0)}},D=(U,T,B,H,J,de,me)=>{if(B!==H){if(B!==vt)for(const Ae in B)!ns(Ae)&&!(Ae in H)&&o(U,Ae,B[Ae],null,me,T.children,J,de,W);for(const Ae in H){if(ns(Ae))continue;const xe=H[Ae],be=B[Ae];xe!==be&&Ae!=="value"&&o(U,Ae,be,xe,me,T.children,J,de,W)}"value"in H&&o(U,"value",B.value,H.value)}},j=(U,T,B,H,J,de,me,Ae,xe)=>{const be=T.el=U?U.el:l(""),Te=T.anchor=U?U.anchor:l("");let{patchFlag:Z,dynamicChildren:se,slotScopeIds:De}=T;De&&(Ae=Ae?Ae.concat(De):De),U==null?(r(be,B,H),r(Te,B,H),k(T.children,B,Te,J,de,me,Ae,xe)):Z>0&&Z&64&&se&&U.dynamicChildren?(R(U.dynamicChildren,se,B,J,de,me,Ae),(T.key!=null||J&&T===J.subTree)&&ip(U,T,!0)):Y(U,T,B,Te,J,de,me,Ae,xe)},M=(U,T,B,H,J,de,me,Ae,xe)=>{T.slotScopeIds=Ae,U==null?T.shapeFlag&512?J.ctx.activate(T,B,H,me,xe):N(T,B,H,J,de,me,xe):F(U,T,xe)},N=(U,T,B,H,J,de,me)=>{const Ae=U.component=Uy(U,H,J);if(Fs(U)&&(Ae.ctx.renderer=_e),Hy(Ae),Ae.asyncDep){if(J&&J.registerDep(Ae,z),!U.el){const xe=Ae.subTree=C(sn);h(null,xe,T,B)}return}z(Ae,U,T,B,J,de,me)},F=(U,T,B)=>{const H=T.component=U.component;if(XC(U,T,B))if(H.asyncDep&&!H.asyncResolved){X(H,T,B);return}else H.next=T,HC(H.update),H.update();else T.el=U.el,H.vnode=T},z=(U,T,B,H,J,de,me)=>{const Ae=()=>{if(U.isMounted){let{next:Te,bu:Z,u:se,parent:De,vnode:Le}=U,Ze=Te,nt;Ha(U,!1),Te?(Te.el=Le.el,X(U,Te,me)):Te=Le,Z&&Go(Z),(nt=Te.props&&Te.props.onVnodeBeforeUpdate)&&vn(nt,De,Te,Le),Ha(U,!0);const bt=Pl(U),Bt=U.subTree;U.subTree=bt,g(Bt,bt,f(Bt.el),te(Bt),U,J,de),Te.el=bt.el,Ze===null&&Xf(U,bt.el),se&&Qt(se,J),(nt=Te.props&&Te.props.onVnodeUpdated)&&Qt(()=>vn(nt,De,Te,Le),J)}else{let Te;const{el:Z,props:se}=T,{bm:De,m:Le,parent:Ze}=U,nt=ro(T);if(Ha(U,!1),De&&Go(De),!nt&&(Te=se&&se.onVnodeBeforeMount)&&vn(Te,Ze,T),Ha(U,!0),Z&&Ne){const bt=()=>{U.subTree=Pl(U),Ne(Z,U.subTree,U,J,null)};nt?T.type.__asyncLoader().then(()=>!U.isUnmounted&&bt()):bt()}else{const bt=U.subTree=Pl(U);g(null,bt,B,H,U,J,de),T.el=bt.el}if(Le&&Qt(Le,J),!nt&&(Te=se&&se.onVnodeMounted)){const bt=T;Qt(()=>vn(Te,Ze,bt),J)}(T.shapeFlag&256||Ze&&ro(Ze.vnode)&&Ze.vnode.shapeFlag&256)&&U.a&&Qt(U.a,J),U.isMounted=!0,T=B=H=null}},xe=U.effect=new Ms(Ae,()=>Cc(be),U.scope),be=U.update=()=>xe.run();be.id=U.uid,Ha(U,!0),be()},X=(U,T,B)=>{T.component=U;const H=U.vnode.props;U.vnode=T,U.next=null,Cw(U,T.props,H,B),Sw(U,T.children,B),mo(),Gh(),go()},Y=(U,T,B,H,J,de,me,Ae,xe=!1)=>{const be=U&&U.children,Te=U?U.shapeFlag:0,Z=T.children,{patchFlag:se,shapeFlag:De}=T;if(se>0){if(se&128){Q(be,Z,B,H,J,de,me,Ae,xe);return}else if(se&256){le(be,Z,B,H,J,de,me,Ae,xe);return}}De&8?(Te&16&&W(be,J,de),Z!==be&&u(B,Z)):Te&16?De&16?Q(be,Z,B,H,J,de,me,Ae,xe):W(be,J,de,!0):(Te&8&&u(B,""),De&16&&k(Z,B,H,J,de,me,Ae,xe))},le=(U,T,B,H,J,de,me,Ae,xe)=>{U=U||qo,T=T||qo;const be=U.length,Te=T.length,Z=Math.min(be,Te);let se;for(se=0;se<Z;se++){const De=T[se]=xe?da(T[se]):Sn(T[se]);g(U[se],De,B,null,J,de,me,Ae,xe)}be>Te?W(U,J,de,!0,!1,Z):k(T,B,H,J,de,me,Ae,xe,Z)},Q=(U,T,B,H,J,de,me,Ae,xe)=>{let be=0;const Te=T.length;let Z=U.length-1,se=Te-1;for(;be<=Z&&be<=se;){const De=U[be],Le=T[be]=xe?da(T[be]):Sn(T[be]);if(yr(De,Le))g(De,Le,B,null,J,de,me,Ae,xe);else break;be++}for(;be<=Z&&be<=se;){const De=U[Z],Le=T[se]=xe?da(T[se]):Sn(T[se]);if(yr(De,Le))g(De,Le,B,null,J,de,me,Ae,xe);else break;Z--,se--}if(be>Z){if(be<=se){const De=se+1,Le=De<Te?T[De].el:H;for(;be<=se;)g(null,T[be]=xe?da(T[be]):Sn(T[be]),B,Le,J,de,me,Ae,xe),be++}}else if(be>se)for(;be<=Z;)ne(U[be],J,de,!0),be++;else{const De=be,Le=be,Ze=new Map;for(be=Le;be<=se;be++){const un=T[be]=xe?da(T[be]):Sn(T[be]);un.key!=null&&Ze.set(un.key,be)}let nt,bt=0;const Bt=se-Le+1;let cr=!1,ja=0;const Ua=new Array(Bt);for(be=0;be<Bt;be++)Ua[be]=0;for(be=De;be<=Z;be++){const un=U[be];if(bt>=Bt){ne(un,J,de,!0);continue}let $n;if(un.key!=null)$n=Ze.get(un.key);else for(nt=Le;nt<=se;nt++)if(Ua[nt-Le]===0&&yr(un,T[nt])){$n=nt;break}$n===void 0?ne(un,J,de,!0):(Ua[$n-Le]=be+1,$n>=ja?ja=$n:cr=!0,g(un,T[$n],B,null,J,de,me,Ae,xe),bt++)}const Gs=cr?Ow(Ua):qo;for(nt=Gs.length-1,be=Bt-1;be>=0;be--){const un=Le+be,$n=T[un],Ks=un+1<Te?T[un+1].el:H;Ua[be]===0?g(null,$n,B,Ks,J,de,me,Ae,xe):cr&&(nt<0||be!==Gs[nt]?ie($n,B,Ks,2):nt--)}}},ie=(U,T,B,H,J=null)=>{const{el:de,type:me,transition:Ae,children:xe,shapeFlag:be}=U;if(be&6){ie(U.component.subTree,T,B,H);return}if(be&128){U.suspense.move(T,B,H);return}if(be&64){me.move(U,T,B,_e);return}if(me===lt){r(de,T,B);for(let Z=0;Z<xe.length;Z++)ie(xe[Z],T,B,H);r(U.anchor,T,B);return}if(me===ao){b(U,T,B);return}if(H!==2&&be&1&&Ae)if(H===0)Ae.beforeEnter(de),r(de,T,B),Qt(()=>Ae.enter(de),J);else{const{leave:Z,delayLeave:se,afterLeave:De}=Ae,Le=()=>r(de,T,B),Ze=()=>{Z(de,()=>{Le(),De&&De()})};se?se(de,Le,Ze):Ze()}else r(de,T,B)},ne=(U,T,B,H=!1,J=!1)=>{const{type:de,props:me,ref:Ae,children:xe,dynamicChildren:be,shapeFlag:Te,patchFlag:Z,dirs:se}=U;if(Ae!=null&&ql(Ae,null,B,U,!0),Te&256){T.ctx.deactivate(U);return}const De=Te&1&&se,Le=!ro(U);let Ze;if(Le&&(Ze=me&&me.onVnodeBeforeUnmount)&&vn(Ze,T,U),Te&6)K(U.component,B,H);else{if(Te&128){U.suspense.unmount(B,H);return}De&&mr(U,null,T,"beforeUnmount"),Te&64?U.type.remove(U,T,B,J,_e,H):be&&(de!==lt||Z>0&&Z&64)?W(be,T,B,!1,!0):(de===lt&&Z&384||!J&&Te&16)&&W(xe,T,B),H&&fe(U)}(Le&&(Ze=me&&me.onVnodeUnmounted)||De)&&Qt(()=>{Ze&&vn(Ze,T,U),De&&mr(U,null,T,"unmounted")},B)},fe=U=>{const{type:T,el:B,anchor:H,transition:J}=U;if(T===lt){ee(B,H);return}if(T===ao){v(U);return}const de=()=>{a(B),J&&!J.persisted&&J.afterLeave&&J.afterLeave()};if(U.shapeFlag&1&&J&&!J.persisted){const{leave:me,delayLeave:Ae}=J,xe=()=>me(B,de);Ae?Ae(U.el,de,xe):xe()}else de()},ee=(U,T)=>{let B;for(;U!==T;)B=d(U),a(U),U=B;a(T)},K=(U,T,B)=>{const{bum:H,scope:J,update:de,subTree:me,um:Ae}=U;H&&Go(H),J.stop(),de&&(de.active=!1,ne(me,U,T,B)),Ae&&Qt(Ae,T),Qt(()=>{U.isUnmounted=!0},T),T&&T.pendingBranch&&!T.isUnmounted&&U.asyncDep&&!U.asyncResolved&&U.suspenseId===T.pendingId&&(T.deps--,T.deps===0&&T.resolve())},W=(U,T,B,H=!1,J=!1,de=0)=>{for(let me=de;me<U.length;me++)ne(U[me],T,B,H,J)},te=U=>U.shapeFlag&6?te(U.component.subTree):U.shapeFlag&128?U.suspense.next():d(U.anchor||U.el),pe=(U,T,B)=>{U==null?T._vnode&&ne(T._vnode,null,null,!0):g(T._vnode||null,U,T,null,null,null,B),Gh(),Vl(),T._vnode=U},_e={p:g,um:ne,m:ie,r:fe,mt:N,mc:k,pc:Y,pbc:R,n:te,o:e};let Be,Ne;return t&&([Be,Ne]=t(_e)),{render:pe,hydrate:Be,createApp:Tw(pe,Be)}}function Ha({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function ip(e,t,n=!1){const r=e.children,a=t.children;if(ze(r)&&ze(a))for(let o=0;o<r.length;o++){const i=r[o];let l=a[o];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=a[o]=da(a[o]),l.el=i.el),n||ip(i,l))}}function Ow(e){const t=e.slice(),n=[0];let r,a,o,i,l;const s=e.length;for(r=0;r<s;r++){const c=e[r];if(c!==0){if(a=n[n.length-1],e[a]<c){t[r]=a,n.push(r);continue}for(o=0,i=n.length-1;o<i;)l=o+i>>1,e[n[l]]<c?o=l+1:i=l;c<e[n[o]]&&(o>0&&(t[r]=n[o-1]),n[o]=r)}}for(o=n.length,i=n[o-1];o-- >0;)n[o]=i,i=t[i];return n}const Bw=e=>e.__isTeleport,os=e=>e&&(e.disabled||e.disabled===""),im=e=>typeof SVGElement<"u"&&e instanceof SVGElement,Id=(e,t)=>{const n=e&&e.to;return It(n)?t?t(n):null:n},Lw={__isTeleport:!0,process(e,t,n,r,a,o,i,l,s,c){const{mc:u,pc:f,pbc:d,o:{insert:m,querySelector:y,createText:g,createComment:A}}=c,h=os(t.props);let{shapeFlag:p,children:b,dynamicChildren:v}=t;if(e==null){const x=t.el=g(""),_=t.anchor=g("");m(x,n,r),m(_,n,r);const S=t.target=Id(t.props,y),k=t.targetAnchor=g("");S&&(m(k,S),i=i||im(S));const $=(R,D)=>{p&16&&u(b,R,D,a,o,i,l,s)};h?$(n,_):S&&$(S,k)}else{t.el=e.el;const x=t.anchor=e.anchor,_=t.target=e.target,S=t.targetAnchor=e.targetAnchor,k=os(e.props),$=k?n:_,R=k?x:S;if(i=i||im(_),v?(d(e.dynamicChildren,v,$,a,o,i,l),ip(e,t,!0)):s||f(e,t,$,R,a,o,i,l,!1),h)k||ul(t,n,x,c,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const D=t.target=Id(t.props,y);D&&ul(t,D,null,c,0)}else k&&ul(t,_,S,c,1)}},remove(e,t,n,r,{um:a,o:{remove:o}},i){const{shapeFlag:l,children:s,anchor:c,targetAnchor:u,target:f,props:d}=e;if(f&&o(u),(i||!os(d))&&(o(c),l&16))for(let m=0;m<s.length;m++){const y=s[m];a(y,t,n,!0,!!y.dynamicChildren)}},move:ul,hydrate:Pw};function ul(e,t,n,{o:{insert:r},m:a},o=2){o===0&&r(e.targetAnchor,t,n);const{el:i,anchor:l,shapeFlag:s,children:c,props:u}=e,f=o===2;if(f&&r(i,t,n),(!f||os(u))&&s&16)for(let d=0;d<c.length;d++)a(c[d],t,n,2);f&&r(l,t,n)}function Pw(e,t,n,r,a,o,{o:{nextSibling:i,parentNode:l,querySelector:s}},c){const u=t.target=Id(t.props,s);if(u){const f=u._lpa||u.firstChild;if(t.shapeFlag&16)if(os(t.props))t.anchor=c(i(e),t,l(e),n,r,a,o),t.targetAnchor=f;else{t.anchor=i(e);let d=f;for(;d;)if(d=i(d),d&&d.nodeType===8&&d.data==="teleport anchor"){t.targetAnchor=d,u._lpa=t.targetAnchor&&i(t.targetAnchor);break}c(f,t,u,n,r,a,o)}}return t.anchor&&i(t.anchor)}const js=Lw,lt=Symbol(void 0),oi=Symbol(void 0),sn=Symbol(void 0),ao=Symbol(void 0),is=[];let yn=null;function Ve(e=!1){is.push(yn=e?null:[])}function My(){is.pop(),yn=is[is.length-1]||null}let po=1;function Od(e){po+=e}function Ny(e){return e.dynamicChildren=po>0?yn||qo:null,My(),po>0&&yn&&yn.push(e),e}function Ge(e,t,n,r,a,o){return Ny(w(e,t,n,r,a,o,!0))}function Us(e,t,n,r,a){return Ny(C(e,t,n,r,a,!0))}function qr(e){return e?e.__v_isVNode===!0:!1}function yr(e,t){return e.type===t.type&&e.key===t.key}function $w(e){}const Ic="__vInternal",Fy=({key:e})=>e!=null?e:null,$l=({ref:e,ref_key:t,ref_for:n})=>e!=null?It(e)||ct(e)||Qe(e)?{i:on,r:e,k:t,f:!!n}:e:null;function w(e,t=null,n=null,r=0,a=null,o=e===lt?0:1,i=!1,l=!1){const s={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Fy(t),ref:t&&$l(t),scopeId:_c,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:r,dynamicProps:a,dynamicChildren:null,appContext:null};return l?(sp(s,n),o&128&&e.normalize(s)):n&&(s.shapeFlag|=It(n)?8:16),po>0&&!i&&yn&&(s.patchFlag>0||o&6)&&s.patchFlag!==32&&yn.push(s),s}const C=Dw;function Dw(e,t=null,n=null,r=0,a=null,o=!1){if((!e||e===wy)&&(e=sn),qr(e)){const l=_r(e,t,!0);return n&&sp(l,n),po>0&&!o&&yn&&(l.shapeFlag&6?yn[yn.indexOf(e)]=l:yn.push(l)),l.patchFlag|=-2,l}if(Hw(e)&&(e=e.__vccOpts),t){t=zy(t);let{class:l,style:s}=t;l&&!It(l)&&(t.class=Hr(l)),xt(s)&&(Wf(s)&&!ze(s)&&(s=Ot({},s)),t.style=Ci(s))}const i=It(e)?1:py(e)?128:Bw(e)?64:xt(e)?4:Qe(e)?2:0;return w(e,t,n,r,a,i,o,!0)}function zy(e){return e?Wf(e)||Ic in e?Ot({},e):e:null}function _r(e,t,n=!1){const{props:r,ref:a,patchFlag:o,children:i}=e,l=t?at(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Fy(l),ref:t&&t.ref?n&&a?ze(a)?a.concat($l(t)):[a,$l(t)]:$l(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==lt?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&_r(e.ssContent),ssFallback:e.ssFallback&&_r(e.ssFallback),el:e.el,anchor:e.anchor}}function Sa(e=" ",t=0){return C(oi,null,e,t)}function jy(e,t){const n=C(ao,null,e);return n.staticCount=t,n}function Zt(e="",t=!1){return t?(Ve(),Us(sn,null,e)):C(sn,null,e)}function Sn(e){return e==null||typeof e=="boolean"?C(sn):ze(e)?C(lt,null,e.slice()):typeof e=="object"?da(e):C(oi,null,String(e))}function da(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:_r(e)}function sp(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(ze(t))n=16;else if(typeof t=="object")if(r&65){const a=t.default;a&&(a._c&&(a._d=!1),sp(e,a()),a._c&&(a._d=!0));return}else{n=32;const a=t._;!a&&!(Ic in t)?t._ctx=on:a===3&&on&&(on.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else Qe(t)?(t={default:t,_ctx:on},n=32):(t=String(t),r&64?(n=16,t=[Sa(t)]):n=8);e.children=t,e.shapeFlag|=n}function at(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const a in r)if(a==="class")t.class!==r.class&&(t.class=Hr([t.class,r.class]));else if(a==="style")t.style=Ci([t.style,r.style]);else if($s(a)){const o=t[a],i=r[a];i&&o!==i&&!(ze(o)&&o.includes(i))&&(t[a]=o?[].concat(o,i):i)}else a!==""&&(t[a]=r[a])}return t}function vn(e,t,n,r=null){Tn(e,t,7,[n,r])}const Rw=Py();let Mw=0;function Uy(e,t,n){const r=e.type,a=(t?t.appContext:e.appContext)||Rw,o={uid:Mw++,vnode:e,type:r,parent:t,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,scope:new zf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(a.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Iy(r,a),emitsOptions:uy(r,a),emit:null,emitted:null,propsDefaults:vt,inheritAttrs:r.inheritAttrs,ctx:vt,data:vt,props:vt,attrs:vt,slots:vt,refs:vt,setupState:vt,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=t?t.root:o,o.emit=qC.bind(null,o),e.ce&&e.ce(o),o}let Nt=null;const Gt=()=>Nt||on,ka=e=>{Nt=e,e.scope.on()},ba=()=>{Nt&&Nt.scope.off(),Nt=null};function Vy(e){return e.vnode.shapeFlag&4}let ii=!1;function Hy(e,t=!1){ii=t;const{props:n,children:r}=e.vnode,a=Vy(e);xw(e,n,a,t),_w(e,r);const o=a?Nw(e,t):void 0;return ii=!1,o}function Nw(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=uo(new Proxy(e.ctx,_d));const{setup:r}=n;if(r){const a=e.setupContext=r.length>1?qy(e):null;ka(e),mo();const o=xr(r,e,0,[e.props,a]);if(go(),ba(),Nf(o)){if(o.then(ba,ba),t)return o.then(i=>{Bd(e,i,t)}).catch(i=>{vo(i,e,0)});e.asyncDep=o}else Bd(e,o,t)}else Wy(e,t)}function Bd(e,t,n){Qe(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:xt(t)&&(e.setupState=Gf(t)),Wy(e,n)}let Yl,Ld;function Fw(e){Yl=e,Ld=t=>{t.render._rc&&(t.withProxy=new Proxy(t.ctx,gw))}}const zw=()=>!Yl;function Wy(e,t,n){const r=e.type;if(!e.render){if(!t&&Yl&&!r.render){const a=r.template||ap(e).template;if(a){const{isCustomElement:o,compilerOptions:i}=e.appContext.config,{delimiters:l,compilerOptions:s}=r,c=Ot(Ot({isCustomElement:o,delimiters:l},i),s);r.render=Yl(a,c)}}e.render=r.render||er,Ld&&Ld(e)}ka(e),mo(),vw(e),go(),ba()}function jw(e){return new Proxy(e.attrs,{get(t,n){return Ln(e,"get","$attrs"),t[n]}})}function qy(e){const t=r=>{e.exposed=r||{}};let n;return{get attrs(){return n||(n=jw(e))},slots:e.slots,emit:e.emit,expose:t}}function Oc(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Gf(uo(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Hl)return Hl[n](e)}}))}const Uw=/(?:^|[-_])(\w)/g,Vw=e=>e.replace(Uw,t=>t.toUpperCase()).replace(/[-_]/g,"");function Gl(e,t=!0){return Qe(e)?e.displayName||e.name:e.name||t&&e.__name}function Yy(e,t,n=!1){let r=Gl(t);if(!r&&t.__file){const a=t.__file.match(/([^/\\]+)\.\w+$/);a&&(r=a[1])}if(!r&&e&&e.parent){const a=o=>{for(const i in o)if(o[i]===t)return i};r=a(e.components||e.parent.type.components)||a(e.appContext.components)}return r?Vw(r):n?"App":"Anonymous"}function Hw(e){return Qe(e)&&"__vccOpts"in e}const oe=(e,t)=>MC(e,t,ii);function Ww(){return null}function qw(){return null}function Yw(e){}function Gw(e,t){return null}function Kw(){return Gy().slots}function Qw(){return Gy().attrs}function Gy(){const e=Gt();return e.setupContext||(e.setupContext=qy(e))}function Xw(e,t){const n=ze(e)?e.reduce((r,a)=>(r[a]={},r),{}):e;for(const r in t){const a=n[r];a?ze(a)||Qe(a)?n[r]={type:a,default:t[r]}:a.default=t[r]:a===null&&(n[r]={default:t[r]})}return n}function Zw(e,t){const n={};for(const r in e)t.includes(r)||Object.defineProperty(n,r,{enumerable:!0,get:()=>e[r]});return n}function Jw(e){const t=Gt();let n=e();return ba(),Nf(n)&&(n=n.catch(r=>{throw ka(t),r})),[n,()=>ka(t)]}function Bc(e,t,n){const r=arguments.length;return r===2?xt(t)&&!ze(t)?qr(t)?C(e,null,[t]):C(e,t):C(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&qr(n)&&(n=[n]),C(e,t,n))}const Ky=Symbol(""),e_=()=>{{const e=Wt(Ky);return e||ay("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."),e}};function t_(){}function n_(e,t,n,r){const a=n[r];if(a&&Qy(a,e))return a;const o=t();return o.memo=e.slice(),n[r]=o}function Qy(e,t){const n=e.memo;if(n.length!=t.length)return!1;for(let r=0;r<n.length;r++)if(ri(n[r],t[r]))return!1;return po>0&&yn&&yn.push(e),!0}const Xy="3.2.41",r_={createComponentInstance:Uy,setupComponent:Hy,renderComponentRoot:Pl,setCurrentRenderingInstance:Cs,isVNode:qr,normalizeVNode:Sn},a_=r_,o_=null,i_=null,s_="http://www.w3.org/2000/svg",Xa=typeof document<"u"?document:null,sm=Xa&&Xa.createElement("template"),l_={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const a=t?Xa.createElementNS(s_,e):Xa.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&a.setAttribute("multiple",r.multiple),a},createText:e=>Xa.createTextNode(e),createComment:e=>Xa.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Xa.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,a,o){const i=n?n.previousSibling:t.lastChild;if(a&&(a===o||a.nextSibling))for(;t.insertBefore(a.cloneNode(!0),n),!(a===o||!(a=a.nextSibling)););else{sm.innerHTML=r?`<svg>${e}</svg>`:e;const l=sm.content;if(r){const s=l.firstChild;for(;s.firstChild;)l.appendChild(s.firstChild);l.removeChild(s)}t.insertBefore(l,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function c_(e,t,n){const r=e._vtc;r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function u_(e,t,n){const r=e.style,a=It(n);if(n&&!a){for(const o in n)Pd(r,o,n[o]);if(t&&!It(t))for(const o in t)n[o]==null&&Pd(r,o,"")}else{const o=r.display;a?t!==n&&(r.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(r.display=o)}}const lm=/\s*!important$/;function Pd(e,t,n){if(ze(n))n.forEach(r=>Pd(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=d_(e,t);lm.test(n)?e.setProperty(Er(r),n.replace(lm,""),"important"):e[r]=n}}const cm=["Webkit","Moz","ms"],Ou={};function d_(e,t){const n=Ou[t];if(n)return n;let r=Bn(t);if(r!=="filter"&&r in e)return Ou[t]=r;r=Rs(r);for(let a=0;a<cm.length;a++){const o=cm[a]+r;if(o in e)return Ou[t]=o}return t}const um="http://www.w3.org/1999/xlink";function f_(e,t,n,r,a){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(um,t.slice(6,t.length)):e.setAttributeNS(um,t,n);else{const o=zx(t);n==null||o&&!Dv(n)?e.removeAttribute(t):e.setAttribute(t,o?"":n)}}function p_(e,t,n,r,a,o,i){if(t==="innerHTML"||t==="textContent"){r&&i(r,a,o),e[t]=n==null?"":n;return}if(t==="value"&&e.tagName!=="PROGRESS"&&!e.tagName.includes("-")){e._value=n;const s=n==null?"":n;(e.value!==s||e.tagName==="OPTION")&&(e.value=s),n==null&&e.removeAttribute(t);return}let l=!1;if(n===""||n==null){const s=typeof e[t];s==="boolean"?n=Dv(n):n==null&&s==="string"?(n="",l=!0):s==="number"&&(n=0,l=!0)}try{e[t]=n}catch{}l&&e.removeAttribute(t)}function Fr(e,t,n,r){e.addEventListener(t,n,r)}function h_(e,t,n,r){e.removeEventListener(t,n,r)}function m_(e,t,n,r,a=null){const o=e._vei||(e._vei={}),i=o[t];if(r&&i)i.value=r;else{const[l,s]=g_(t);if(r){const c=o[t]=A_(r,a);Fr(e,l,c,s)}else i&&(h_(e,l,i,s),o[t]=void 0)}}const dm=/(?:Once|Passive|Capture)$/;function g_(e){let t;if(dm.test(e)){t={};let r;for(;r=e.match(dm);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Er(e.slice(2)),t]}let Bu=0;const v_=Promise.resolve(),y_=()=>Bu||(v_.then(()=>Bu=0),Bu=Date.now());function A_(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Tn(b_(r,n.value),t,5,[r])};return n.value=e,n.attached=y_(),n}function b_(e,t){if(ze(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>a=>!a._stopped&&r&&r(a))}else return t}const fm=/^on[a-z]/,E_=(e,t,n,r,a=!1,o,i,l,s)=>{t==="class"?c_(e,r,a):t==="style"?u_(e,n,r):$s(t)?Rf(t)||m_(e,t,n,r,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):x_(e,t,r,a))?p_(e,t,r,o,i,l,s):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),f_(e,t,r,a))};function x_(e,t,n,r){return r?!!(t==="innerHTML"||t==="textContent"||t in e&&fm.test(t)&&Qe(n)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||fm.test(t)&&It(n)?!1:t in e}function Zy(e,t){const n=ye(e);class r extends Lc{constructor(o){super(n,o,t)}}return r.def=n,r}const C_=e=>Zy(e,f0),w_=typeof HTMLElement<"u"?HTMLElement:class{};class Lc extends w_{constructor(t,n={},r){super(),this._def=t,this._props=n,this._instance=null,this._connected=!1,this._resolved=!1,this._numberProps=null,this.shadowRoot&&r?r(this._createVNode(),this.shadowRoot):this.attachShadow({mode:"open"})}connectedCallback(){this._connected=!0,this._instance||this._resolveDef()}disconnectedCallback(){this._connected=!1,Ke(()=>{this._connected||(Dd(null,this.shadowRoot),this._instance=null)})}_resolveDef(){if(this._resolved)return;this._resolved=!0;for(let r=0;r<this.attributes.length;r++)this._setAttr(this.attributes[r].name);new MutationObserver(r=>{for(const a of r)this._setAttr(a.attributeName)}).observe(this,{attributes:!0});const t=r=>{const{props:a,styles:o}=r,i=!ze(a),l=a?i?Object.keys(a):a:[];let s;if(i)for(const c in this._props){const u=a[c];(u===Number||u&&u.type===Number)&&(this._props[c]=wa(this._props[c]),(s||(s=Object.create(null)))[c]=!0)}this._numberProps=s;for(const c of Object.keys(this))c[0]!=="_"&&this._setProp(c,this[c],!0,!1);for(const c of l.map(Bn))Object.defineProperty(this,c,{get(){return this._getProp(c)},set(u){this._setProp(c,u)}});this._applyStyles(o),this._update()},n=this._def.__asyncLoader;n?n().then(t):t(this._def)}_setAttr(t){let n=this.getAttribute(t);this._numberProps&&this._numberProps[t]&&(n=wa(n)),this._setProp(Bn(t),n,!1)}_getProp(t){return this._props[t]}_setProp(t,n,r=!0,a=!0){n!==this._props[t]&&(this._props[t]=n,a&&this._instance&&this._update(),r&&(n===!0?this.setAttribute(Er(t),""):typeof n=="string"||typeof n=="number"?this.setAttribute(Er(t),n+""):n||this.removeAttribute(Er(t))))}_update(){Dd(this._createVNode(),this.shadowRoot)}_createVNode(){const t=C(this._def,Ot({},this._props));return this._instance||(t.ce=n=>{this._instance=n,n.isCE=!0,n.emit=(a,...o)=>{this.dispatchEvent(new CustomEvent(a,{detail:o}))};let r=this;for(;r=r&&(r.parentNode||r.host);)if(r instanceof Lc){n.parent=r._instance;break}}),t}_applyStyles(t){t&&t.forEach(n=>{const r=document.createElement("style");r.textContent=n,this.shadowRoot.appendChild(r)})}}function __(e="$style"){{const t=Gt();if(!t)return vt;const n=t.type.__cssModules;if(!n)return vt;const r=n[e];return r||vt}}function S_(e){const t=Gt();if(!t)return;const n=()=>$d(t.subTree,e(t.proxy));my(n),Et(()=>{const r=new MutationObserver(n);r.observe(t.subTree.el.parentNode,{childList:!0}),Un(()=>r.disconnect())})}function $d(e,t){if(e.shapeFlag&128){const n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push(()=>{$d(n.activeBranch,t)})}for(;e.component;)e=e.component.subTree;if(e.shapeFlag&1&&e.el)pm(e.el,t);else if(e.type===lt)e.children.forEach(n=>$d(n,t));else if(e.type===ao){let{el:n,anchor:r}=e;for(;n&&(pm(n,t),n!==r);)n=n.nextSibling}}function pm(e,t){if(e.nodeType===1){const n=e.style;for(const r in t)n.setProperty(`--${r}`,t[r])}}const na="transition",Ri="animation",Ao=(e,{slots:t})=>Bc(ep,e0(e),t);Ao.displayName="Transition";const Jy={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},k_=Ao.props=Ot({},ep.props,Jy),Wa=(e,t=[])=>{ze(e)?e.forEach(n=>n(...t)):e&&e(...t)},hm=e=>e?ze(e)?e.some(t=>t.length>1):e.length>1:!1;function e0(e){const t={};for(const j in e)j in Jy||(t[j]=e[j]);if(e.css===!1)return t;const{name:n="v",type:r,duration:a,enterFromClass:o=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:l=`${n}-enter-to`,appearFromClass:s=o,appearActiveClass:c=i,appearToClass:u=l,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:d=`${n}-leave-active`,leaveToClass:m=`${n}-leave-to`}=e,y=T_(a),g=y&&y[0],A=y&&y[1],{onBeforeEnter:h,onEnter:p,onEnterCancelled:b,onLeave:v,onLeaveCancelled:x,onBeforeAppear:_=h,onAppear:S=p,onAppearCancelled:k=b}=t,$=(j,M,N)=>{ua(j,M?u:l),ua(j,M?c:i),N&&N()},R=(j,M)=>{j._isLeaving=!1,ua(j,f),ua(j,m),ua(j,d),M&&M()},D=j=>(M,N)=>{const F=j?S:p,z=()=>$(M,j,N);Wa(F,[M,z]),mm(()=>{ua(M,j?s:o),Rr(M,j?u:l),hm(F)||gm(M,r,g,z)})};return Ot(t,{onBeforeEnter(j){Wa(h,[j]),Rr(j,o),Rr(j,i)},onBeforeAppear(j){Wa(_,[j]),Rr(j,s),Rr(j,c)},onEnter:D(!1),onAppear:D(!0),onLeave(j,M){j._isLeaving=!0;const N=()=>R(j,M);Rr(j,f),n0(),Rr(j,d),mm(()=>{!j._isLeaving||(ua(j,f),Rr(j,m),hm(v)||gm(j,r,A,N))}),Wa(v,[j,N])},onEnterCancelled(j){$(j,!1),Wa(b,[j])},onAppearCancelled(j){$(j,!0),Wa(k,[j])},onLeaveCancelled(j){R(j),Wa(x,[j])}})}function T_(e){if(e==null)return null;if(xt(e))return[Lu(e.enter),Lu(e.leave)];{const t=Lu(e);return[t,t]}}function Lu(e){return wa(e)}function Rr(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e._vtc||(e._vtc=new Set)).add(t)}function ua(e,t){t.split(/\s+/).forEach(r=>r&&e.classList.remove(r));const{_vtc:n}=e;n&&(n.delete(t),n.size||(e._vtc=void 0))}function mm(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let I_=0;function gm(e,t,n,r){const a=e._endId=++I_,o=()=>{a===e._endId&&r()};if(n)return setTimeout(o,n);const{type:i,timeout:l,propCount:s}=t0(e,t);if(!i)return r();const c=i+"end";let u=0;const f=()=>{e.removeEventListener(c,d),o()},d=m=>{m.target===e&&++u>=s&&f()};setTimeout(()=>{u<s&&f()},l+1),e.addEventListener(c,d)}function t0(e,t){const n=window.getComputedStyle(e),r=y=>(n[y]||"").split(", "),a=r(na+"Delay"),o=r(na+"Duration"),i=vm(a,o),l=r(Ri+"Delay"),s=r(Ri+"Duration"),c=vm(l,s);let u=null,f=0,d=0;t===na?i>0&&(u=na,f=i,d=o.length):t===Ri?c>0&&(u=Ri,f=c,d=s.length):(f=Math.max(i,c),u=f>0?i>c?na:Ri:null,d=u?u===na?o.length:s.length:0);const m=u===na&&/\b(transform|all)(,|$)/.test(n[na+"Property"]);return{type:u,timeout:f,propCount:d,hasTransform:m}}function vm(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,r)=>ym(n)+ym(e[r])))}function ym(e){return Number(e.slice(0,-1).replace(",","."))*1e3}function n0(){return document.body.offsetHeight}const r0=new WeakMap,a0=new WeakMap,O_={name:"TransitionGroup",props:Ot({},k_,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=Gt(),r=Jf();let a,o;return zs(()=>{if(!a.length)return;const i=e.moveClass||`${e.name||"v"}-move`;if(!D_(a[0].el,n.vnode.el,i))return;a.forEach(L_),a.forEach(P_);const l=a.filter($_);n0(),l.forEach(s=>{const c=s.el,u=c.style;Rr(c,i),u.transform=u.webkitTransform=u.transitionDuration="";const f=c._moveCb=d=>{d&&d.target!==c||(!d||/transform$/.test(d.propertyName))&&(c.removeEventListener("transitionend",f),c._moveCb=null,ua(c,i))};c.addEventListener("transitionend",f)})}),()=>{const i=rt(e),l=e0(i);let s=i.tag||lt;a=o,o=t.default?kc(t.default()):[];for(let c=0;c<o.length;c++){const u=o[c];u.key!=null&&fo(u,ai(u,l,r,n))}if(a)for(let c=0;c<a.length;c++){const u=a[c];fo(u,ai(u,l,r,n)),r0.set(u,u.el.getBoundingClientRect())}return C(s,null,o)}}},B_=O_;function L_(e){const t=e.el;t._moveCb&&t._moveCb(),t._enterCb&&t._enterCb()}function P_(e){a0.set(e,e.el.getBoundingClientRect())}function $_(e){const t=r0.get(e),n=a0.get(e),r=t.left-n.left,a=t.top-n.top;if(r||a){const o=e.el.style;return o.transform=o.webkitTransform=`translate(${r}px,${a}px)`,o.transitionDuration="0s",e}}function D_(e,t,n){const r=e.cloneNode();e._vtc&&e._vtc.forEach(i=>{i.split(/\s+/).forEach(l=>l&&r.classList.remove(l))}),n.split(/\s+/).forEach(i=>i&&r.classList.add(i)),r.style.display="none";const a=t.nodeType===1?t:t.parentNode;a.appendChild(r);const{hasTransform:o}=t0(r);return a.removeChild(r),o}const Ta=e=>{const t=e.props["onUpdate:modelValue"]||!1;return ze(t)?n=>Go(t,n):t};function R_(e){e.target.composing=!0}function Am(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const kn={created(e,{modifiers:{lazy:t,trim:n,number:r}},a){e._assign=Ta(a);const o=r||a.props&&a.props.type==="number";Fr(e,t?"change":"input",i=>{if(i.target.composing)return;let l=e.value;n&&(l=l.trim()),o&&(l=wa(l)),e._assign(l)}),n&&Fr(e,"change",()=>{e.value=e.value.trim()}),t||(Fr(e,"compositionstart",R_),Fr(e,"compositionend",Am),Fr(e,"change",Am))},mounted(e,{value:t}){e.value=t==null?"":t},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:r,number:a}},o){if(e._assign=Ta(o),e.composing||document.activeElement===e&&e.type!=="range"&&(n||r&&e.value.trim()===t||(a||e.type==="number")&&wa(e.value)===t))return;const i=t==null?"":t;e.value!==i&&(e.value=i)}},lp={deep:!0,created(e,t,n){e._assign=Ta(n),Fr(e,"change",()=>{const r=e._modelValue,a=si(e),o=e.checked,i=e._assign;if(ze(r)){const l=gc(r,a),s=l!==-1;if(o&&!s)i(r.concat(a));else if(!o&&s){const c=[...r];c.splice(l,1),i(c)}}else if(ho(r)){const l=new Set(r);o?l.add(a):l.delete(a),i(l)}else i(i0(e,o))})},mounted:bm,beforeUpdate(e,t,n){e._assign=Ta(n),bm(e,t,n)}};function bm(e,{value:t,oldValue:n},r){e._modelValue=t,ze(t)?e.checked=gc(t,r.props.value)>-1:ho(t)?e.checked=t.has(r.props.value):t!==n&&(e.checked=Ca(t,i0(e,!0)))}const cp={created(e,{value:t},n){e.checked=Ca(t,n.props.value),e._assign=Ta(n),Fr(e,"change",()=>{e._assign(si(e))})},beforeUpdate(e,{value:t,oldValue:n},r){e._assign=Ta(r),t!==n&&(e.checked=Ca(t,r.props.value))}},o0={deep:!0,created(e,{value:t,modifiers:{number:n}},r){const a=ho(t);Fr(e,"change",()=>{const o=Array.prototype.filter.call(e.options,i=>i.selected).map(i=>n?wa(si(i)):si(i));e._assign(e.multiple?a?new Set(o):o:o[0])}),e._assign=Ta(r)},mounted(e,{value:t}){Em(e,t)},beforeUpdate(e,t,n){e._assign=Ta(n)},updated(e,{value:t}){Em(e,t)}};function Em(e,t){const n=e.multiple;if(!(n&&!ze(t)&&!ho(t))){for(let r=0,a=e.options.length;r<a;r++){const o=e.options[r],i=si(o);if(n)ze(t)?o.selected=gc(t,i)>-1:o.selected=t.has(i);else if(Ca(si(o),t)){e.selectedIndex!==r&&(e.selectedIndex=r);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function si(e){return"_value"in e?e._value:e.value}function i0(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const _s={created(e,t,n){dl(e,t,n,null,"created")},mounted(e,t,n){dl(e,t,n,null,"mounted")},beforeUpdate(e,t,n,r){dl(e,t,n,r,"beforeUpdate")},updated(e,t,n,r){dl(e,t,n,r,"updated")}};function s0(e,t){switch(e){case"SELECT":return o0;case"TEXTAREA":return kn;default:switch(t){case"checkbox":return lp;case"radio":return cp;default:return kn}}}function dl(e,t,n,r,a){const i=s0(e.tagName,n.props&&n.props.type)[a];i&&i(e,t,n,r)}function M_(){kn.getSSRProps=({value:e})=>({value:e}),cp.getSSRProps=({value:e},t)=>{if(t.props&&Ca(t.props.value,e))return{checked:!0}},lp.getSSRProps=({value:e},t)=>{if(ze(e)){if(t.props&&gc(e,t.props.value)>-1)return{checked:!0}}else if(ho(e)){if(t.props&&e.has(t.props.value))return{checked:!0}}else if(e)return{checked:!0}},_s.getSSRProps=(e,t)=>{if(typeof t.type!="string")return;const n=s0(t.type.toUpperCase(),t.props&&t.props.type);if(n.getSSRProps)return n.getSSRProps(e,t)}}const N_=["ctrl","shift","alt","meta"],F_={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>N_.some(n=>e[`${n}Key`]&&!t.includes(n))},Pc=(e,t)=>(n,...r)=>{for(let a=0;a<t.length;a++){const o=F_[t[a]];if(o&&o(n,t))return}return e(n,...r)},z_={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},l0=(e,t)=>n=>{if(!("key"in n))return;const r=Er(n.key);if(t.some(a=>a===r||z_[a]===r))return e(n)},We={beforeMount(e,{value:t},{transition:n}){e._vod=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):Mi(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),Mi(e,!0),r.enter(e)):r.leave(e,()=>{Mi(e,!1)}):Mi(e,t))},beforeUnmount(e,{value:t}){Mi(e,t)}};function Mi(e,t){e.style.display=t?e._vod:"none"}function j_(){We.getSSRProps=({value:e})=>{if(!e)return{style:{display:"none"}}}}const c0=Ot({patchProp:E_},l_);let ss,xm=!1;function u0(){return ss||(ss=$y(c0))}function d0(){return ss=xm?ss:Dy(c0),xm=!0,ss}const Dd=(...e)=>{u0().render(...e)},f0=(...e)=>{d0().hydrate(...e)},p0=(...e)=>{const t=u0().createApp(...e),{mount:n}=t;return t.mount=r=>{const a=h0(r);if(!a)return;const o=t._component;!Qe(o)&&!o.render&&!o.template&&(o.template=a.innerHTML),a.innerHTML="";const i=n(a,!1,a instanceof SVGElement);return a instanceof Element&&(a.removeAttribute("v-cloak"),a.setAttribute("data-v-app","")),i},t},U_=(...e)=>{const t=d0().createApp(...e),{mount:n}=t;return t.mount=r=>{const a=h0(r);if(a)return n(a,!0,a instanceof SVGElement)},t};function h0(e){return It(e)?document.querySelector(e):e}let Cm=!1;const V_=()=>{Cm||(Cm=!0,M_(),j_())},H_=()=>{},W_=Object.freeze(Object.defineProperty({__proto__:null,compile:H_,EffectScope:zf,ReactiveEffect:Ms,customRef:$C,effect:rC,effectScope:jf,getCurrentScope:Jx,isProxy:Wf,isReactive:jr,isReadonly:co,isRef:ct,isShallow:As,markRaw:uo,onScopeDispose:eC,proxyRefs:Gf,reactive:He,readonly:Hf,ref:re,shallowReactive:Zv,shallowReadonly:IC,shallowRef:Jv,stop:aC,toRaw:rt,toRef:ny,toRefs:ty,triggerRef:BC,unref:V,camelize:Bn,capitalize:Rs,normalizeClass:Hr,normalizeProps:Hx,normalizeStyle:Ci,toDisplayString:ce,toHandlerKey:rs,BaseTransition:ep,Comment:sn,Fragment:lt,KeepAlive:cw,Static:ao,Suspense:JC,Teleport:js,Text:oi,callWithAsyncErrorHandling:Tn,callWithErrorHandling:xr,cloneVNode:_r,compatUtils:i_,computed:oe,createBlock:Us,createCommentVNode:Zt,createElementBlock:Ge,createElementVNode:w,createHydrationRenderer:Dy,createPropsRestProxy:Zw,createRenderer:$y,createSlots:pw,createStaticVNode:jy,createTextVNode:Sa,createVNode:C,defineAsyncComponent:sw,defineComponent:ye,defineEmits:qw,defineExpose:Yw,defineProps:Ww,get devtools(){return Uo},getCurrentInstance:Gt,getTransitionRawChildren:kc,guardReactiveProps:zy,h:Bc,handleError:vo,initCustomFormatter:t_,inject:Wt,isMemoSame:Qy,isRuntimeOnly:zw,isVNode:qr,mergeDefaults:Xw,mergeProps:at,nextTick:Ke,onActivated:yo,onBeforeMount:Ay,onBeforeUnmount:rr,onBeforeUpdate:tp,onDeactivated:Oa,onErrorCaptured:Cy,onMounted:Et,onRenderTracked:xy,onRenderTriggered:Ey,onServerPrefetch:by,onUnmounted:Un,onUpdated:zs,openBlock:Ve,popScopeId:fy,provide:Cr,pushScopeId:dy,queuePostFlushCb:Qf,registerRuntimeCompiler:Fw,renderList:zn,renderSlot:hw,resolveComponent:Fn,resolveDirective:_y,resolveDynamicComponent:fw,resolveFilter:o_,resolveTransitionHooks:ai,setBlockTracking:Od,setDevtoolsHook:cy,setTransitionHooks:fo,ssrContextKey:Ky,ssrUtils:a_,toHandlers:mw,transformVNodeArgs:$w,useAttrs:Qw,useSSRContext:e_,useSlots:Kw,useTransitionState:Jf,version:Xy,warn:ay,watch:Ie,watchEffect:Sc,watchPostEffect:my,watchSyncEffect:aw,withAsyncContext:Jw,withCtx:Ht,withDefaults:Gw,withDirectives:Fe,withMemo:n_,withScopeId:YC,Transition:Ao,TransitionGroup:B_,VueElement:Lc,createApp:p0,createSSRApp:U_,defineCustomElement:Zy,defineSSRCustomElement:C_,hydrate:f0,initDirectivesForSSR:V_,render:Dd,useCssModule:__,useCssVars:S_,vModelCheckbox:lp,vModelDynamic:_s,vModelRadio:cp,vModelSelect:o0,vModelText:kn,vShow:We,withKeys:l0,withModifiers:Pc},Symbol.toStringTag,{value:"Module"}));/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */const Vo=typeof window<"u";function q_(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const yt=Object.assign;function Pu(e,t){const n={};for(const r in t){const a=t[r];n[r]=nr(a)?a.map(e):e(a)}return n}const ls=()=>{},nr=Array.isArray,Y_=/\/$/,G_=e=>e.replace(Y_,"");function $u(e,t,n="/"){let r,a={},o="",i="";const l=t.indexOf("#");let s=t.indexOf("?");return l<s&&l>=0&&(s=-1),s>-1&&(r=t.slice(0,s),o=t.slice(s+1,l>-1?l:t.length),a=e(o)),l>-1&&(r=r||t.slice(0,l),i=t.slice(l,t.length)),r=Z_(r!=null?r:t,n),{fullPath:r+(o&&"?")+o+i,path:r,query:a,hash:i}}function K_(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function wm(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function Q_(e,t,n){const r=t.matched.length-1,a=n.matched.length-1;return r>-1&&r===a&&li(t.matched[r],n.matched[a])&&m0(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function li(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function m0(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!X_(e[n],t[n]))return!1;return!0}function X_(e,t){return nr(e)?_m(e,t):nr(t)?_m(t,e):e===t}function _m(e,t){return nr(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function Z_(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/");let a=n.length-1,o,i;for(o=0;o<r.length;o++)if(i=r[o],i!==".")if(i==="..")a>1&&a--;else break;return n.slice(0,a).join("/")+"/"+r.slice(o-(o===r.length?1:0)).join("/")}var Ss;(function(e){e.pop="pop",e.push="push"})(Ss||(Ss={}));var cs;(function(e){e.back="back",e.forward="forward",e.unknown=""})(cs||(cs={}));function J_(e){if(!e)if(Vo){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),G_(e)}const eS=/^[^#]+#/;function tS(e,t){return e.replace(eS,"#")+t}function nS(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const $c=()=>({left:window.pageXOffset,top:window.pageYOffset});function rS(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),a=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!a)return;t=nS(a,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function Sm(e,t){return(history.state?history.state.position-t:-1)+e}const Rd=new Map;function aS(e,t){Rd.set(e,t)}function oS(e){const t=Rd.get(e);return Rd.delete(e),t}let iS=()=>location.protocol+"//"+location.host;function g0(e,t){const{pathname:n,search:r,hash:a}=t,o=e.indexOf("#");if(o>-1){let l=a.includes(e.slice(o))?e.slice(o).length:1,s=a.slice(l);return s[0]!=="/"&&(s="/"+s),wm(s,"")}return wm(n,e)+r+a}function sS(e,t,n,r){let a=[],o=[],i=null;const l=({state:d})=>{const m=g0(e,location),y=n.value,g=t.value;let A=0;if(d){if(n.value=m,t.value=d,i&&i===y){i=null;return}A=g?d.position-g.position:0}else r(m);a.forEach(h=>{h(n.value,y,{delta:A,type:Ss.pop,direction:A?A>0?cs.forward:cs.back:cs.unknown})})};function s(){i=n.value}function c(d){a.push(d);const m=()=>{const y=a.indexOf(d);y>-1&&a.splice(y,1)};return o.push(m),m}function u(){const{history:d}=window;!d.state||d.replaceState(yt({},d.state,{scroll:$c()}),"")}function f(){for(const d of o)d();o=[],window.removeEventListener("popstate",l),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",l),window.addEventListener("beforeunload",u),{pauseListeners:s,listen:c,destroy:f}}function km(e,t,n,r=!1,a=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:a?$c():null}}function lS(e){const{history:t,location:n}=window,r={value:g0(e,n)},a={value:t.state};a.value||o(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function o(s,c,u){const f=e.indexOf("#"),d=f>-1?(n.host&&document.querySelector("base")?e:e.slice(f))+s:iS()+e+s;try{t[u?"replaceState":"pushState"](c,"",d),a.value=c}catch(m){console.error(m),n[u?"replace":"assign"](d)}}function i(s,c){const u=yt({},t.state,km(a.value.back,s,a.value.forward,!0),c,{position:a.value.position});o(s,u,!0),r.value=s}function l(s,c){const u=yt({},a.value,t.state,{forward:s,scroll:$c()});o(u.current,u,!0);const f=yt({},km(r.value,s,null),{position:u.position+1},c);o(s,f,!1),r.value=s}return{location:r,state:a,push:l,replace:i}}function cS(e){e=J_(e);const t=lS(e),n=sS(e,t.state,t.location,t.replace);function r(o,i=!0){i||n.pauseListeners(),history.go(o)}const a=yt({location:"",base:e,go:r,createHref:tS.bind(null,e)},t,n);return Object.defineProperty(a,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(a,"state",{enumerable:!0,get:()=>t.state.value}),a}function uS(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),cS(e)}function dS(e){return typeof e=="string"||e&&typeof e=="object"}function v0(e){return typeof e=="string"||typeof e=="symbol"}const ra={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},y0=Symbol("");var Tm;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(Tm||(Tm={}));function ci(e,t){return yt(new Error,{type:e,[y0]:!0},t)}function Or(e,t){return e instanceof Error&&y0 in e&&(t==null||!!(e.type&t))}const Im="[^/]+?",fS={sensitive:!1,strict:!1,start:!0,end:!0},pS=/[.+*?^${}()[\]/\\]/g;function hS(e,t){const n=yt({},fS,t),r=[];let a=n.start?"^":"";const o=[];for(const c of e){const u=c.length?[]:[90];n.strict&&!c.length&&(a+="/");for(let f=0;f<c.length;f++){const d=c[f];let m=40+(n.sensitive?.25:0);if(d.type===0)f||(a+="/"),a+=d.value.replace(pS,"\\$&"),m+=40;else if(d.type===1){const{value:y,repeatable:g,optional:A,regexp:h}=d;o.push({name:y,repeatable:g,optional:A});const p=h||Im;if(p!==Im){m+=10;try{new RegExp(`(${p})`)}catch(v){throw new Error(`Invalid custom RegExp for param "${y}" (${p}): `+v.message)}}let b=g?`((?:${p})(?:/(?:${p}))*)`:`(${p})`;f||(b=A&&c.length<2?`(?:/${b})`:"/"+b),A&&(b+="?"),a+=b,m+=20,A&&(m+=-8),g&&(m+=-20),p===".*"&&(m+=-50)}u.push(m)}r.push(u)}if(n.strict&&n.end){const c=r.length-1;r[c][r[c].length-1]+=.7000000000000001}n.strict||(a+="/?"),n.end?a+="$":n.strict&&(a+="(?:/|$)");const i=new RegExp(a,n.sensitive?"":"i");function l(c){const u=c.match(i),f={};if(!u)return null;for(let d=1;d<u.length;d++){const m=u[d]||"",y=o[d-1];f[y.name]=m&&y.repeatable?m.split("/"):m}return f}function s(c){let u="",f=!1;for(const d of e){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const m of d)if(m.type===0)u+=m.value;else if(m.type===1){const{value:y,repeatable:g,optional:A}=m,h=y in c?c[y]:"";if(nr(h)&&!g)throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);const p=nr(h)?h.join("/"):h;if(!p)if(A)d.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${y}"`);u+=p}}return u||"/"}return{re:i,score:r,keys:o,parse:l,stringify:s}}function mS(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function gS(e,t){let n=0;const r=e.score,a=t.score;for(;n<r.length&&n<a.length;){const o=mS(r[n],a[n]);if(o)return o;n++}if(Math.abs(a.length-r.length)===1){if(Om(r))return 1;if(Om(a))return-1}return a.length-r.length}function Om(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const vS={type:0,value:""},yS=/[a-zA-Z0-9_]/;function AS(e){if(!e)return[[]];if(e==="/")return[[vS]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(m){throw new Error(`ERR (${n})/"${c}": ${m}`)}let n=0,r=n;const a=[];let o;function i(){o&&a.push(o),o=[]}let l=0,s,c="",u="";function f(){!c||(n===0?o.push({type:0,value:c}):n===1||n===2||n===3?(o.length>1&&(s==="*"||s==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),o.push({type:1,value:c,regexp:u,repeatable:s==="*"||s==="+",optional:s==="*"||s==="?"})):t("Invalid state to consume buffer"),c="")}function d(){c+=s}for(;l<e.length;){if(s=e[l++],s==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:s==="/"?(c&&f(),i()):s===":"?(f(),n=1):d();break;case 4:d(),n=r;break;case 1:s==="("?n=2:yS.test(s)?d():(f(),n=0,s!=="*"&&s!=="?"&&s!=="+"&&l--);break;case 2:s===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+s:n=3:u+=s;break;case 3:f(),n=0,s!=="*"&&s!=="?"&&s!=="+"&&l--,u="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${c}"`),f(),i(),a}function bS(e,t,n){const r=hS(AS(e.path),n),a=yt(r,{record:e,parent:t,children:[],alias:[]});return t&&!a.record.aliasOf==!t.record.aliasOf&&t.children.push(a),a}function ES(e,t){const n=[],r=new Map;t=Pm({strict:!1,end:!0,sensitive:!1},t);function a(u){return r.get(u)}function o(u,f,d){const m=!d,y=xS(u);y.aliasOf=d&&d.record;const g=Pm(t,u),A=[y];if("alias"in u){const b=typeof u.alias=="string"?[u.alias]:u.alias;for(const v of b)A.push(yt({},y,{components:d?d.record.components:y.components,path:v,aliasOf:d?d.record:y}))}let h,p;for(const b of A){const{path:v}=b;if(f&&v[0]!=="/"){const x=f.record.path,_=x[x.length-1]==="/"?"":"/";b.path=f.record.path+(v&&_+v)}if(h=bS(b,f,g),d?d.alias.push(h):(p=p||h,p!==h&&p.alias.push(h),m&&u.name&&!Lm(h)&&i(u.name)),y.children){const x=y.children;for(let _=0;_<x.length;_++)o(x[_],h,d&&d.children[_])}d=d||h,(h.record.components&&Object.keys(h.record.components).length||h.record.name||h.record.redirect)&&s(h)}return p?()=>{i(p)}:ls}function i(u){if(v0(u)){const f=r.get(u);f&&(r.delete(u),n.splice(n.indexOf(f),1),f.children.forEach(i),f.alias.forEach(i))}else{const f=n.indexOf(u);f>-1&&(n.splice(f,1),u.record.name&&r.delete(u.record.name),u.children.forEach(i),u.alias.forEach(i))}}function l(){return n}function s(u){let f=0;for(;f<n.length&&gS(u,n[f])>=0&&(u.record.path!==n[f].record.path||!A0(u,n[f]));)f++;n.splice(f,0,u),u.record.name&&!Lm(u)&&r.set(u.record.name,u)}function c(u,f){let d,m={},y,g;if("name"in u&&u.name){if(d=r.get(u.name),!d)throw ci(1,{location:u});g=d.record.name,m=yt(Bm(f.params,d.keys.filter(p=>!p.optional).map(p=>p.name)),u.params&&Bm(u.params,d.keys.map(p=>p.name))),y=d.stringify(m)}else if("path"in u)y=u.path,d=n.find(p=>p.re.test(y)),d&&(m=d.parse(y),g=d.record.name);else{if(d=f.name?r.get(f.name):n.find(p=>p.re.test(f.path)),!d)throw ci(1,{location:u,currentLocation:f});g=d.record.name,m=yt({},f.params,u.params),y=d.stringify(m)}const A=[];let h=d;for(;h;)A.unshift(h.record),h=h.parent;return{name:g,path:y,params:m,matched:A,meta:wS(A)}}return e.forEach(u=>o(u)),{addRoute:o,resolve:c,removeRoute:i,getRoutes:l,getRecordMatcher:a}}function Bm(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function xS(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:CS(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function CS(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="boolean"?n:n[r];return t}function Lm(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function wS(e){return e.reduce((t,n)=>yt(t,n.meta),{})}function Pm(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function A0(e,t){return t.children.some(n=>n===e||A0(e,n))}const b0=/#/g,_S=/&/g,SS=/\//g,kS=/=/g,TS=/\?/g,E0=/\+/g,IS=/%5B/g,OS=/%5D/g,x0=/%5E/g,BS=/%60/g,C0=/%7B/g,LS=/%7C/g,w0=/%7D/g,PS=/%20/g;function up(e){return encodeURI(""+e).replace(LS,"|").replace(IS,"[").replace(OS,"]")}function $S(e){return up(e).replace(C0,"{").replace(w0,"}").replace(x0,"^")}function Md(e){return up(e).replace(E0,"%2B").replace(PS,"+").replace(b0,"%23").replace(_S,"%26").replace(BS,"`").replace(C0,"{").replace(w0,"}").replace(x0,"^")}function DS(e){return Md(e).replace(kS,"%3D")}function RS(e){return up(e).replace(b0,"%23").replace(TS,"%3F")}function MS(e){return e==null?"":RS(e).replace(SS,"%2F")}function Kl(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function NS(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let a=0;a<r.length;++a){const o=r[a].replace(E0," "),i=o.indexOf("="),l=Kl(i<0?o:o.slice(0,i)),s=i<0?null:Kl(o.slice(i+1));if(l in t){let c=t[l];nr(c)||(c=t[l]=[c]),c.push(s)}else t[l]=s}return t}function $m(e){let t="";for(let n in e){const r=e[n];if(n=DS(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(nr(r)?r.map(o=>o&&Md(o)):[r&&Md(r)]).forEach(o=>{o!==void 0&&(t+=(t.length?"&":"")+n,o!=null&&(t+="="+o))})}return t}function FS(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=nr(r)?r.map(a=>a==null?null:""+a):r==null?r:""+r)}return t}const zS=Symbol(""),Dm=Symbol(""),Dc=Symbol(""),dp=Symbol(""),Nd=Symbol("");function Ni(){let e=[];function t(r){return e.push(r),()=>{const a=e.indexOf(r);a>-1&&e.splice(a,1)}}function n(){e=[]}return{add:t,list:()=>e,reset:n}}function fa(e,t,n,r,a){const o=r&&(r.enterCallbacks[a]=r.enterCallbacks[a]||[]);return()=>new Promise((i,l)=>{const s=f=>{f===!1?l(ci(4,{from:n,to:t})):f instanceof Error?l(f):dS(f)?l(ci(2,{from:t,to:f})):(o&&r.enterCallbacks[a]===o&&typeof f=="function"&&o.push(f),i())},c=e.call(r&&r.instances[a],t,n,s);let u=Promise.resolve(c);e.length<3&&(u=u.then(s)),u.catch(f=>l(f))})}function Du(e,t,n,r){const a=[];for(const o of e)for(const i in o.components){let l=o.components[i];if(!(t!=="beforeRouteEnter"&&!o.instances[i]))if(jS(l)){const c=(l.__vccOpts||l)[t];c&&a.push(fa(c,n,r,o,i))}else{let s=l();a.push(()=>s.then(c=>{if(!c)return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${o.path}"`));const u=q_(c)?c.default:c;o.components[i]=u;const d=(u.__vccOpts||u)[t];return d&&fa(d,n,r,o,i)()}))}}return a}function jS(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Rm(e){const t=Wt(Dc),n=Wt(dp),r=oe(()=>t.resolve(V(e.to))),a=oe(()=>{const{matched:s}=r.value,{length:c}=s,u=s[c-1],f=n.matched;if(!u||!f.length)return-1;const d=f.findIndex(li.bind(null,u));if(d>-1)return d;const m=Mm(s[c-2]);return c>1&&Mm(u)===m&&f[f.length-1].path!==m?f.findIndex(li.bind(null,s[c-2])):d}),o=oe(()=>a.value>-1&&WS(n.params,r.value.params)),i=oe(()=>a.value>-1&&a.value===n.matched.length-1&&m0(n.params,r.value.params));function l(s={}){return HS(s)?t[V(e.replace)?"replace":"push"](V(e.to)).catch(ls):Promise.resolve()}return{route:r,href:oe(()=>r.value.href),isActive:o,isExactActive:i,navigate:l}}const US=ye({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Rm,setup(e,{slots:t}){const n=He(Rm(e)),{options:r}=Wt(Dc),a=oe(()=>({[Nm(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Nm(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const o=t.default&&t.default(n);return e.custom?o:Bc("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:a.value},o)}}}),VS=US;function HS(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function WS(e,t){for(const n in t){const r=t[n],a=e[n];if(typeof r=="string"){if(r!==a)return!1}else if(!nr(a)||a.length!==r.length||r.some((o,i)=>o!==a[i]))return!1}return!0}function Mm(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Nm=(e,t,n)=>e!=null?e:t!=null?t:n,qS=ye({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=Wt(Nd),a=oe(()=>e.route||r.value),o=Wt(Dm,0),i=oe(()=>{let c=V(o);const{matched:u}=a.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),l=oe(()=>a.value.matched[i.value]);Cr(Dm,oe(()=>i.value+1)),Cr(zS,l),Cr(Nd,a);const s=re();return Ie(()=>[s.value,l.value,e.name],([c,u,f],[d,m,y])=>{u&&(u.instances[f]=c,m&&m!==u&&c&&c===d&&(u.leaveGuards.size||(u.leaveGuards=m.leaveGuards),u.updateGuards.size||(u.updateGuards=m.updateGuards))),c&&u&&(!m||!li(u,m)||!d)&&(u.enterCallbacks[f]||[]).forEach(g=>g(c))},{flush:"post"}),()=>{const c=a.value,u=e.name,f=l.value,d=f&&f.components[u];if(!d)return Fm(n.default,{Component:d,route:c});const m=f.props[u],y=m?m===!0?c.params:typeof m=="function"?m(c):m:null,A=Bc(d,yt({},y,t,{onVnodeUnmounted:h=>{h.component.isUnmounted&&(f.instances[u]=null)},ref:s}));return Fm(n.default,{Component:A,route:c})||A}}});function Fm(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const _0=qS;function YS(e){const t=ES(e.routes,e),n=e.parseQuery||NS,r=e.stringifyQuery||$m,a=e.history,o=Ni(),i=Ni(),l=Ni(),s=Jv(ra);let c=ra;Vo&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Pu.bind(null,K=>""+K),f=Pu.bind(null,MS),d=Pu.bind(null,Kl);function m(K,W){let te,pe;return v0(K)?(te=t.getRecordMatcher(K),pe=W):pe=K,t.addRoute(pe,te)}function y(K){const W=t.getRecordMatcher(K);W&&t.removeRoute(W)}function g(){return t.getRoutes().map(K=>K.record)}function A(K){return!!t.getRecordMatcher(K)}function h(K,W){if(W=yt({},W||s.value),typeof K=="string"){const U=$u(n,K,W.path),T=t.resolve({path:U.path},W),B=a.createHref(U.fullPath);return yt(U,T,{params:d(T.params),hash:Kl(U.hash),redirectedFrom:void 0,href:B})}let te;if("path"in K)te=yt({},K,{path:$u(n,K.path,W.path).path});else{const U=yt({},K.params);for(const T in U)U[T]==null&&delete U[T];te=yt({},K,{params:f(K.params)}),W.params=f(W.params)}const pe=t.resolve(te,W),_e=K.hash||"";pe.params=u(d(pe.params));const Be=K_(r,yt({},K,{hash:$S(_e),path:pe.path})),Ne=a.createHref(Be);return yt({fullPath:Be,hash:_e,query:r===$m?FS(K.query):K.query||{}},pe,{redirectedFrom:void 0,href:Ne})}function p(K){return typeof K=="string"?$u(n,K,s.value.path):yt({},K)}function b(K,W){if(c!==K)return ci(8,{from:W,to:K})}function v(K){return S(K)}function x(K){return v(yt(p(K),{replace:!0}))}function _(K){const W=K.matched[K.matched.length-1];if(W&&W.redirect){const{redirect:te}=W;let pe=typeof te=="function"?te(K):te;return typeof pe=="string"&&(pe=pe.includes("?")||pe.includes("#")?pe=p(pe):{path:pe},pe.params={}),yt({query:K.query,hash:K.hash,params:"path"in pe?{}:K.params},pe)}}function S(K,W){const te=c=h(K),pe=s.value,_e=K.state,Be=K.force,Ne=K.replace===!0,U=_(te);if(U)return S(yt(p(U),{state:typeof U=="object"?yt({},_e,U.state):_e,force:Be,replace:Ne}),W||te);const T=te;T.redirectedFrom=W;let B;return!Be&&Q_(r,pe,te)&&(B=ci(16,{to:T,from:pe}),Q(pe,pe,!0,!1)),(B?Promise.resolve(B):$(T,pe)).catch(H=>Or(H)?Or(H,2)?H:le(H):X(H,T,pe)).then(H=>{if(H){if(Or(H,2))return S(yt({replace:Ne},p(H.to),{state:typeof H.to=="object"?yt({},_e,H.to.state):_e,force:Be}),W||T)}else H=D(T,pe,!0,Ne,_e);return R(T,pe,H),H})}function k(K,W){const te=b(K,W);return te?Promise.reject(te):Promise.resolve()}function $(K,W){let te;const[pe,_e,Be]=GS(K,W);te=Du(pe.reverse(),"beforeRouteLeave",K,W);for(const U of pe)U.leaveGuards.forEach(T=>{te.push(fa(T,K,W))});const Ne=k.bind(null,K,W);return te.push(Ne),So(te).then(()=>{te=[];for(const U of o.list())te.push(fa(U,K,W));return te.push(Ne),So(te)}).then(()=>{te=Du(_e,"beforeRouteUpdate",K,W);for(const U of _e)U.updateGuards.forEach(T=>{te.push(fa(T,K,W))});return te.push(Ne),So(te)}).then(()=>{te=[];for(const U of K.matched)if(U.beforeEnter&&!W.matched.includes(U))if(nr(U.beforeEnter))for(const T of U.beforeEnter)te.push(fa(T,K,W));else te.push(fa(U.beforeEnter,K,W));return te.push(Ne),So(te)}).then(()=>(K.matched.forEach(U=>U.enterCallbacks={}),te=Du(Be,"beforeRouteEnter",K,W),te.push(Ne),So(te))).then(()=>{te=[];for(const U of i.list())te.push(fa(U,K,W));return te.push(Ne),So(te)}).catch(U=>Or(U,8)?U:Promise.reject(U))}function R(K,W,te){for(const pe of l.list())pe(K,W,te)}function D(K,W,te,pe,_e){const Be=b(K,W);if(Be)return Be;const Ne=W===ra,U=Vo?history.state:{};te&&(pe||Ne?a.replace(K.fullPath,yt({scroll:Ne&&U&&U.scroll},_e)):a.push(K.fullPath,_e)),s.value=K,Q(K,W,te,Ne),le()}let j;function M(){j||(j=a.listen((K,W,te)=>{if(!ee.listening)return;const pe=h(K),_e=_(pe);if(_e){S(yt(_e,{replace:!0}),pe).catch(ls);return}c=pe;const Be=s.value;Vo&&aS(Sm(Be.fullPath,te.delta),$c()),$(pe,Be).catch(Ne=>Or(Ne,12)?Ne:Or(Ne,2)?(S(Ne.to,pe).then(U=>{Or(U,20)&&!te.delta&&te.type===Ss.pop&&a.go(-1,!1)}).catch(ls),Promise.reject()):(te.delta&&a.go(-te.delta,!1),X(Ne,pe,Be))).then(Ne=>{Ne=Ne||D(pe,Be,!1),Ne&&(te.delta&&!Or(Ne,8)?a.go(-te.delta,!1):te.type===Ss.pop&&Or(Ne,20)&&a.go(-1,!1)),R(pe,Be,Ne)}).catch(ls)}))}let N=Ni(),F=Ni(),z;function X(K,W,te){le(K);const pe=F.list();return pe.length?pe.forEach(_e=>_e(K,W,te)):console.error(K),Promise.reject(K)}function Y(){return z&&s.value!==ra?Promise.resolve():new Promise((K,W)=>{N.add([K,W])})}function le(K){return z||(z=!K,M(),N.list().forEach(([W,te])=>K?te(K):W()),N.reset()),K}function Q(K,W,te,pe){const{scrollBehavior:_e}=e;if(!Vo||!_e)return Promise.resolve();const Be=!te&&oS(Sm(K.fullPath,0))||(pe||!te)&&history.state&&history.state.scroll||null;return Ke().then(()=>_e(K,W,Be)).then(Ne=>Ne&&rS(Ne)).catch(Ne=>X(Ne,K,W))}const ie=K=>a.go(K);let ne;const fe=new Set,ee={currentRoute:s,listening:!0,addRoute:m,removeRoute:y,hasRoute:A,getRoutes:g,resolve:h,options:e,push:v,replace:x,go:ie,back:()=>ie(-1),forward:()=>ie(1),beforeEach:o.add,beforeResolve:i.add,afterEach:l.add,onError:F.add,isReady:Y,install(K){const W=this;K.component("RouterLink",VS),K.component("RouterView",_0),K.config.globalProperties.$router=W,Object.defineProperty(K.config.globalProperties,"$route",{enumerable:!0,get:()=>V(s)}),Vo&&!ne&&s.value===ra&&(ne=!0,v(a.location).catch(_e=>{}));const te={};for(const _e in ra)te[_e]=oe(()=>s.value[_e]);K.provide(Dc,W),K.provide(dp,He(te)),K.provide(Nd,s);const pe=K.unmount;fe.add(K),K.unmount=function(){fe.delete(K),fe.size<1&&(c=ra,j&&j(),j=null,s.value=ra,ne=!1,z=!1),pe()}}};return ee}function So(e){return e.reduce((t,n)=>t.then(()=>n()),Promise.resolve())}function GS(e,t){const n=[],r=[],a=[],o=Math.max(t.matched.length,e.matched.length);for(let i=0;i<o;i++){const l=t.matched[i];l&&(e.matched.find(c=>li(c,l))?r.push(l):n.push(l));const s=e.matched[i];s&&(t.matched.find(c=>li(c,s))||a.push(s))}return[n,r,a]}function Vn(){return Wt(Dc)}function Hn(){return Wt(dp)}var ui=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function KS(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function S0(e){var t=e.default;if(typeof t=="function"){var n=function(){return t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var a=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,a.get?a:{enumerable:!0,get:function(){return e[r]}})}),n}var Sr={},Rc={exports:{}},mt={};/*!
  * shared v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */Object.defineProperty(mt,"__esModule",{value:!0});const QS=typeof window<"u";let XS,ZS;const JS=/\{([0-9a-zA-Z]+)\}/g;function ek(e,...t){return t.length===1&&fp(t[0])&&(t=t[0]),(!t||!t.hasOwnProperty)&&(t={}),e.replace(JS,(n,r)=>t.hasOwnProperty(r)?t[r]:"")}const tk=typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol",nk=e=>tk?Symbol(e):e,rk=(e,t,n)=>k0({l:e,k:t,s:n}),k0=e=>JSON.stringify(e).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029").replace(/\u0027/g,"\\u0027"),ak=e=>typeof e=="number"&&isFinite(e),ok=e=>Mc(e)==="[object Date]",ik=e=>Mc(e)==="[object RegExp]",sk=e=>hp(e)&&Object.keys(e).length===0;function lk(e,t){typeof console<"u"&&(console.warn("[intlify] "+e),t&&console.warn(t.stack))}const ck=Object.assign;let zm;const uk=()=>zm||(zm=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof ui<"u"?ui:{});function dk(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}const fk=Object.prototype.hasOwnProperty;function pk(e,t){return fk.call(e,t)}const T0=Array.isArray,Fd=e=>typeof e=="function",hk=e=>typeof e=="string",mk=e=>typeof e=="boolean",gk=e=>typeof e=="symbol",fp=e=>e!==null&&typeof e=="object",vk=e=>fp(e)&&Fd(e.then)&&Fd(e.catch),pp=Object.prototype.toString,Mc=e=>pp.call(e),hp=e=>Mc(e)==="[object Object]",yk=e=>e==null?"":T0(e)||hp(e)&&e.toString===pp?JSON.stringify(e,null,2):String(e),jm=2;function Ak(e,t=0,n=e.length){const r=e.split(/\r?\n/);let a=0;const o=[];for(let i=0;i<r.length;i++)if(a+=r[i].length+1,a>=t){for(let l=i-jm;l<=i+jm||n>a;l++){if(l<0||l>=r.length)continue;const s=l+1;o.push(`${s}${" ".repeat(3-String(s).length)}|  ${r[l]}`);const c=r[l].length;if(l===i){const u=t-(a-c)+1,f=Math.max(1,n>a?c-u:n-t);o.push("   |  "+" ".repeat(u)+"^".repeat(f))}else if(l>i){if(n>a){const u=Math.max(Math.min(n-a,c),1);o.push("   |  "+"^".repeat(u))}a+=c+1}}break}return o.join(`
`)}function bk(){const e=new Map;return{events:e,on(n,r){const a=e.get(n);a&&a.push(r)||e.set(n,[r])},off(n,r){const a=e.get(n);a&&a.splice(a.indexOf(r)>>>0,1)},emit(n,r){(e.get(n)||[]).slice().map(a=>a(r)),(e.get("*")||[]).slice().map(a=>a(n,r))}}}mt.assign=ck;mt.createEmitter=bk;mt.escapeHtml=dk;mt.format=ek;mt.friendlyJSONstringify=k0;mt.generateCodeFrame=Ak;mt.generateFormatCacheKey=rk;mt.getGlobalThis=uk;mt.hasOwn=pk;mt.inBrowser=QS;mt.isArray=T0;mt.isBoolean=mk;mt.isDate=ok;mt.isEmptyObject=sk;mt.isFunction=Fd;mt.isNumber=ak;mt.isObject=fp;mt.isPlainObject=hp;mt.isPromise=vk;mt.isRegExp=ik;mt.isString=hk;mt.isSymbol=gk;mt.makeSymbol=nk;mt.mark=XS;mt.measure=ZS;mt.objectToString=pp;mt.toDisplayString=yk;mt.toTypeString=Mc;mt.warn=lk;(function(e){e.exports=mt})(Rc);var I0={exports:{}},Ye={},O0={exports:{}},Wn={},Nc={},mp={},Fc={},gp={},Um="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");gp.encode=function(e){if(0<=e&&e<Um.length)return Um[e];throw new TypeError("Must be between 0 and 63: "+e)};gp.decode=function(e){var t=65,n=90,r=97,a=122,o=48,i=57,l=43,s=47,c=26,u=52;return t<=e&&e<=n?e-t:r<=e&&e<=a?e-r+c:o<=e&&e<=i?e-o+u:e==l?62:e==s?63:-1};var B0=gp,vp=5,L0=1<<vp,P0=L0-1,$0=L0;function Ek(e){return e<0?(-e<<1)+1:(e<<1)+0}function xk(e){var t=(e&1)===1,n=e>>1;return t?-n:n}Fc.encode=function(t){var n="",r,a=Ek(t);do r=a&P0,a>>>=vp,a>0&&(r|=$0),n+=B0.encode(r);while(a>0);return n};Fc.decode=function(t,n,r){var a=t.length,o=0,i=0,l,s;do{if(n>=a)throw new Error("Expected more digits in base 64 VLQ value.");if(s=B0.decode(t.charCodeAt(n++)),s===-1)throw new Error("Invalid base64 digit: "+t.charAt(n-1));l=!!(s&$0),s&=P0,o=o+(s<<i),i+=vp}while(l);r.value=xk(o),r.rest=n};var wi={};(function(e){function t(v,x,_){if(x in v)return v[x];if(arguments.length===3)return _;throw new Error('"'+x+'" is a required argument.')}e.getArg=t;var n=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,r=/^data:.+\,.+$/;function a(v){var x=v.match(n);return x?{scheme:x[1],auth:x[2],host:x[3],port:x[4],path:x[5]}:null}e.urlParse=a;function o(v){var x="";return v.scheme&&(x+=v.scheme+":"),x+="//",v.auth&&(x+=v.auth+"@"),v.host&&(x+=v.host),v.port&&(x+=":"+v.port),v.path&&(x+=v.path),x}e.urlGenerate=o;function i(v){var x=v,_=a(v);if(_){if(!_.path)return v;x=_.path}for(var S=e.isAbsolute(x),k=x.split(/\/+/),$,R=0,D=k.length-1;D>=0;D--)$=k[D],$==="."?k.splice(D,1):$===".."?R++:R>0&&($===""?(k.splice(D+1,R),R=0):(k.splice(D,2),R--));return x=k.join("/"),x===""&&(x=S?"/":"."),_?(_.path=x,o(_)):x}e.normalize=i;function l(v,x){v===""&&(v="."),x===""&&(x=".");var _=a(x),S=a(v);if(S&&(v=S.path||"/"),_&&!_.scheme)return S&&(_.scheme=S.scheme),o(_);if(_||x.match(r))return x;if(S&&!S.host&&!S.path)return S.host=x,o(S);var k=x.charAt(0)==="/"?x:i(v.replace(/\/+$/,"")+"/"+x);return S?(S.path=k,o(S)):k}e.join=l,e.isAbsolute=function(v){return v.charAt(0)==="/"||n.test(v)};function s(v,x){v===""&&(v="."),v=v.replace(/\/$/,"");for(var _=0;x.indexOf(v+"/")!==0;){var S=v.lastIndexOf("/");if(S<0||(v=v.slice(0,S),v.match(/^([^\/]+:\/)?\/*$/)))return x;++_}return Array(_+1).join("../")+x.substr(v.length+1)}e.relative=s;var c=function(){var v=Object.create(null);return!("__proto__"in v)}();function u(v){return v}function f(v){return m(v)?"$"+v:v}e.toSetString=c?u:f;function d(v){return m(v)?v.slice(1):v}e.fromSetString=c?u:d;function m(v){if(!v)return!1;var x=v.length;if(x<9||v.charCodeAt(x-1)!==95||v.charCodeAt(x-2)!==95||v.charCodeAt(x-3)!==111||v.charCodeAt(x-4)!==116||v.charCodeAt(x-5)!==111||v.charCodeAt(x-6)!==114||v.charCodeAt(x-7)!==112||v.charCodeAt(x-8)!==95||v.charCodeAt(x-9)!==95)return!1;for(var _=x-10;_>=0;_--)if(v.charCodeAt(_)!==36)return!1;return!0}function y(v,x,_){var S=A(v.source,x.source);return S!==0||(S=v.originalLine-x.originalLine,S!==0)||(S=v.originalColumn-x.originalColumn,S!==0||_)||(S=v.generatedColumn-x.generatedColumn,S!==0)||(S=v.generatedLine-x.generatedLine,S!==0)?S:A(v.name,x.name)}e.compareByOriginalPositions=y;function g(v,x,_){var S=v.generatedLine-x.generatedLine;return S!==0||(S=v.generatedColumn-x.generatedColumn,S!==0||_)||(S=A(v.source,x.source),S!==0)||(S=v.originalLine-x.originalLine,S!==0)||(S=v.originalColumn-x.originalColumn,S!==0)?S:A(v.name,x.name)}e.compareByGeneratedPositionsDeflated=g;function A(v,x){return v===x?0:v===null?1:x===null?-1:v>x?1:-1}function h(v,x){var _=v.generatedLine-x.generatedLine;return _!==0||(_=v.generatedColumn-x.generatedColumn,_!==0)||(_=A(v.source,x.source),_!==0)||(_=v.originalLine-x.originalLine,_!==0)||(_=v.originalColumn-x.originalColumn,_!==0)?_:A(v.name,x.name)}e.compareByGeneratedPositionsInflated=h;function p(v){return JSON.parse(v.replace(/^\)]}'[^\n]*\n/,""))}e.parseSourceMapInput=p;function b(v,x,_){if(x=x||"",v&&(v[v.length-1]!=="/"&&x[0]!=="/"&&(v+="/"),x=v+x),_){var S=a(_);if(!S)throw new Error("sourceMapURL could not be parsed");if(S.path){var k=S.path.lastIndexOf("/");k>=0&&(S.path=S.path.substring(0,k+1))}x=l(o(S),x)}return i(x)}e.computeSourceURL=b})(wi);var yp={},Ap=wi,bp=Object.prototype.hasOwnProperty,oo=typeof Map<"u";function Yr(){this._array=[],this._set=oo?new Map:Object.create(null)}Yr.fromArray=function(t,n){for(var r=new Yr,a=0,o=t.length;a<o;a++)r.add(t[a],n);return r};Yr.prototype.size=function(){return oo?this._set.size:Object.getOwnPropertyNames(this._set).length};Yr.prototype.add=function(t,n){var r=oo?t:Ap.toSetString(t),a=oo?this.has(t):bp.call(this._set,r),o=this._array.length;(!a||n)&&this._array.push(t),a||(oo?this._set.set(t,o):this._set[r]=o)};Yr.prototype.has=function(t){if(oo)return this._set.has(t);var n=Ap.toSetString(t);return bp.call(this._set,n)};Yr.prototype.indexOf=function(t){if(oo){var n=this._set.get(t);if(n>=0)return n}else{var r=Ap.toSetString(t);if(bp.call(this._set,r))return this._set[r]}throw new Error('"'+t+'" is not in the set.')};Yr.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error("No element indexed by "+t)};Yr.prototype.toArray=function(){return this._array.slice()};yp.ArraySet=Yr;var D0={},R0=wi;function Ck(e,t){var n=e.generatedLine,r=t.generatedLine,a=e.generatedColumn,o=t.generatedColumn;return r>n||r==n&&o>=a||R0.compareByGeneratedPositionsInflated(e,t)<=0}function zc(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}zc.prototype.unsortedForEach=function(t,n){this._array.forEach(t,n)};zc.prototype.add=function(t){Ck(this._last,t)?(this._last=t,this._array.push(t)):(this._sorted=!1,this._array.push(t))};zc.prototype.toArray=function(){return this._sorted||(this._array.sort(R0.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};D0.MappingList=zc;var Fi=Fc,$t=wi,Ql=yp.ArraySet,wk=D0.MappingList;function jn(e){e||(e={}),this._file=$t.getArg(e,"file",null),this._sourceRoot=$t.getArg(e,"sourceRoot",null),this._skipValidation=$t.getArg(e,"skipValidation",!1),this._sources=new Ql,this._names=new Ql,this._mappings=new wk,this._sourcesContents=null}jn.prototype._version=3;jn.fromSourceMap=function(t){var n=t.sourceRoot,r=new jn({file:t.file,sourceRoot:n});return t.eachMapping(function(a){var o={generated:{line:a.generatedLine,column:a.generatedColumn}};a.source!=null&&(o.source=a.source,n!=null&&(o.source=$t.relative(n,o.source)),o.original={line:a.originalLine,column:a.originalColumn},a.name!=null&&(o.name=a.name)),r.addMapping(o)}),t.sources.forEach(function(a){var o=a;n!==null&&(o=$t.relative(n,a)),r._sources.has(o)||r._sources.add(o);var i=t.sourceContentFor(a);i!=null&&r.setSourceContent(a,i)}),r};jn.prototype.addMapping=function(t){var n=$t.getArg(t,"generated"),r=$t.getArg(t,"original",null),a=$t.getArg(t,"source",null),o=$t.getArg(t,"name",null);this._skipValidation||this._validateMapping(n,r,a,o),a!=null&&(a=String(a),this._sources.has(a)||this._sources.add(a)),o!=null&&(o=String(o),this._names.has(o)||this._names.add(o)),this._mappings.add({generatedLine:n.line,generatedColumn:n.column,originalLine:r!=null&&r.line,originalColumn:r!=null&&r.column,source:a,name:o})};jn.prototype.setSourceContent=function(t,n){var r=t;this._sourceRoot!=null&&(r=$t.relative(this._sourceRoot,r)),n!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[$t.toSetString(r)]=n):this._sourcesContents&&(delete this._sourcesContents[$t.toSetString(r)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};jn.prototype.applySourceMap=function(t,n,r){var a=n;if(n==null){if(t.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);a=t.file}var o=this._sourceRoot;o!=null&&(a=$t.relative(o,a));var i=new Ql,l=new Ql;this._mappings.unsortedForEach(function(s){if(s.source===a&&s.originalLine!=null){var c=t.originalPositionFor({line:s.originalLine,column:s.originalColumn});c.source!=null&&(s.source=c.source,r!=null&&(s.source=$t.join(r,s.source)),o!=null&&(s.source=$t.relative(o,s.source)),s.originalLine=c.line,s.originalColumn=c.column,c.name!=null&&(s.name=c.name))}var u=s.source;u!=null&&!i.has(u)&&i.add(u);var f=s.name;f!=null&&!l.has(f)&&l.add(f)},this),this._sources=i,this._names=l,t.sources.forEach(function(s){var c=t.sourceContentFor(s);c!=null&&(r!=null&&(s=$t.join(r,s)),o!=null&&(s=$t.relative(o,s)),this.setSourceContent(s,c))},this)};jn.prototype._validateMapping=function(t,n,r,a){if(n&&typeof n.line!="number"&&typeof n.column!="number")throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");if(!(t&&"line"in t&&"column"in t&&t.line>0&&t.column>=0&&!n&&!r&&!a)){if(t&&"line"in t&&"column"in t&&n&&"line"in n&&"column"in n&&t.line>0&&t.column>=0&&n.line>0&&n.column>=0&&r)return;throw new Error("Invalid mapping: "+JSON.stringify({generated:t,source:r,original:n,name:a}))}};jn.prototype._serializeMappings=function(){for(var t=0,n=1,r=0,a=0,o=0,i=0,l="",s,c,u,f,d=this._mappings.toArray(),m=0,y=d.length;m<y;m++){if(c=d[m],s="",c.generatedLine!==n)for(t=0;c.generatedLine!==n;)s+=";",n++;else if(m>0){if(!$t.compareByGeneratedPositionsInflated(c,d[m-1]))continue;s+=","}s+=Fi.encode(c.generatedColumn-t),t=c.generatedColumn,c.source!=null&&(f=this._sources.indexOf(c.source),s+=Fi.encode(f-i),i=f,s+=Fi.encode(c.originalLine-1-a),a=c.originalLine-1,s+=Fi.encode(c.originalColumn-r),r=c.originalColumn,c.name!=null&&(u=this._names.indexOf(c.name),s+=Fi.encode(u-o),o=u)),l+=s}return l};jn.prototype._generateSourcesContent=function(t,n){return t.map(function(r){if(!this._sourcesContents)return null;n!=null&&(r=$t.relative(n,r));var a=$t.toSetString(r);return Object.prototype.hasOwnProperty.call(this._sourcesContents,a)?this._sourcesContents[a]:null},this)};jn.prototype.toJSON=function(){var t={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(t.file=this._file),this._sourceRoot!=null&&(t.sourceRoot=this._sourceRoot),this._sourcesContents&&(t.sourcesContent=this._generateSourcesContent(t.sources,t.sourceRoot)),t};jn.prototype.toString=function(){return JSON.stringify(this.toJSON())};mp.SourceMapGenerator=jn;var jc={},M0={};(function(e){e.GREATEST_LOWER_BOUND=1,e.LEAST_UPPER_BOUND=2;function t(n,r,a,o,i,l){var s=Math.floor((r-n)/2)+n,c=i(a,o[s],!0);return c===0?s:c>0?r-s>1?t(s,r,a,o,i,l):l==e.LEAST_UPPER_BOUND?r<o.length?r:-1:s:s-n>1?t(n,s,a,o,i,l):l==e.LEAST_UPPER_BOUND?s:n<0?-1:n}e.search=function(r,a,o,i){if(a.length===0)return-1;var l=t(-1,a.length,r,a,o,i||e.GREATEST_LOWER_BOUND);if(l<0)return-1;for(;l-1>=0&&o(a[l],a[l-1],!0)===0;)--l;return l}})(M0);var N0={};function Ru(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}function _k(e,t){return Math.round(e+Math.random()*(t-e))}function zd(e,t,n,r){if(n<r){var a=_k(n,r),o=n-1;Ru(e,a,r);for(var i=e[r],l=n;l<r;l++)t(e[l],i)<=0&&(o+=1,Ru(e,o,l));Ru(e,o+1,l);var s=o+1;zd(e,t,n,s-1),zd(e,t,s+1,r)}}N0.quickSort=function(e,t){zd(e,t,0,e.length-1)};var Me=wi,Ep=M0,di=yp.ArraySet,Sk=Fc,ks=N0.quickSort;function _t(e,t){var n=e;return typeof e=="string"&&(n=Me.parseSourceMapInput(e)),n.sections!=null?new ar(n,t):new tn(n,t)}_t.fromSourceMap=function(e,t){return tn.fromSourceMap(e,t)};_t.prototype._version=3;_t.prototype.__generatedMappings=null;Object.defineProperty(_t.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}});_t.prototype.__originalMappings=null;Object.defineProperty(_t.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}});_t.prototype._charIsMappingSeparator=function(t,n){var r=t.charAt(n);return r===";"||r===","};_t.prototype._parseMappings=function(t,n){throw new Error("Subclasses must implement _parseMappings")};_t.GENERATED_ORDER=1;_t.ORIGINAL_ORDER=2;_t.GREATEST_LOWER_BOUND=1;_t.LEAST_UPPER_BOUND=2;_t.prototype.eachMapping=function(t,n,r){var a=n||null,o=r||_t.GENERATED_ORDER,i;switch(o){case _t.GENERATED_ORDER:i=this._generatedMappings;break;case _t.ORIGINAL_ORDER:i=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var l=this.sourceRoot;i.map(function(s){var c=s.source===null?null:this._sources.at(s.source);return c=Me.computeSourceURL(l,c,this._sourceMapURL),{source:c,generatedLine:s.generatedLine,generatedColumn:s.generatedColumn,originalLine:s.originalLine,originalColumn:s.originalColumn,name:s.name===null?null:this._names.at(s.name)}},this).forEach(t,a)};_t.prototype.allGeneratedPositionsFor=function(t){var n=Me.getArg(t,"line"),r={source:Me.getArg(t,"source"),originalLine:n,originalColumn:Me.getArg(t,"column",0)};if(r.source=this._findSourceIndex(r.source),r.source<0)return[];var a=[],o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",Me.compareByOriginalPositions,Ep.LEAST_UPPER_BOUND);if(o>=0){var i=this._originalMappings[o];if(t.column===void 0)for(var l=i.originalLine;i&&i.originalLine===l;)a.push({line:Me.getArg(i,"generatedLine",null),column:Me.getArg(i,"generatedColumn",null),lastColumn:Me.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o];else for(var s=i.originalColumn;i&&i.originalLine===n&&i.originalColumn==s;)a.push({line:Me.getArg(i,"generatedLine",null),column:Me.getArg(i,"generatedColumn",null),lastColumn:Me.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o]}return a};jc.SourceMapConsumer=_t;function tn(e,t){var n=e;typeof e=="string"&&(n=Me.parseSourceMapInput(e));var r=Me.getArg(n,"version"),a=Me.getArg(n,"sources"),o=Me.getArg(n,"names",[]),i=Me.getArg(n,"sourceRoot",null),l=Me.getArg(n,"sourcesContent",null),s=Me.getArg(n,"mappings"),c=Me.getArg(n,"file",null);if(r!=this._version)throw new Error("Unsupported version: "+r);i&&(i=Me.normalize(i)),a=a.map(String).map(Me.normalize).map(function(u){return i&&Me.isAbsolute(i)&&Me.isAbsolute(u)?Me.relative(i,u):u}),this._names=di.fromArray(o.map(String),!0),this._sources=di.fromArray(a,!0),this._absoluteSources=this._sources.toArray().map(function(u){return Me.computeSourceURL(i,u,t)}),this.sourceRoot=i,this.sourcesContent=l,this._mappings=s,this._sourceMapURL=t,this.file=c}tn.prototype=Object.create(_t.prototype);tn.prototype.consumer=_t;tn.prototype._findSourceIndex=function(e){var t=e;if(this.sourceRoot!=null&&(t=Me.relative(this.sourceRoot,t)),this._sources.has(t))return this._sources.indexOf(t);var n;for(n=0;n<this._absoluteSources.length;++n)if(this._absoluteSources[n]==e)return n;return-1};tn.fromSourceMap=function(t,n){var r=Object.create(tn.prototype),a=r._names=di.fromArray(t._names.toArray(),!0),o=r._sources=di.fromArray(t._sources.toArray(),!0);r.sourceRoot=t._sourceRoot,r.sourcesContent=t._generateSourcesContent(r._sources.toArray(),r.sourceRoot),r.file=t._file,r._sourceMapURL=n,r._absoluteSources=r._sources.toArray().map(function(m){return Me.computeSourceURL(r.sourceRoot,m,n)});for(var i=t._mappings.toArray().slice(),l=r.__generatedMappings=[],s=r.__originalMappings=[],c=0,u=i.length;c<u;c++){var f=i[c],d=new F0;d.generatedLine=f.generatedLine,d.generatedColumn=f.generatedColumn,f.source&&(d.source=o.indexOf(f.source),d.originalLine=f.originalLine,d.originalColumn=f.originalColumn,f.name&&(d.name=a.indexOf(f.name)),s.push(d)),l.push(d)}return ks(r.__originalMappings,Me.compareByOriginalPositions),r};tn.prototype._version=3;Object.defineProperty(tn.prototype,"sources",{get:function(){return this._absoluteSources.slice()}});function F0(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}tn.prototype._parseMappings=function(t,n){for(var r=1,a=0,o=0,i=0,l=0,s=0,c=t.length,u=0,f={},d={},m=[],y=[],g,A,h,p,b;u<c;)if(t.charAt(u)===";")r++,u++,a=0;else if(t.charAt(u)===",")u++;else{for(g=new F0,g.generatedLine=r,p=u;p<c&&!this._charIsMappingSeparator(t,p);p++);if(A=t.slice(u,p),h=f[A],h)u+=A.length;else{for(h=[];u<p;)Sk.decode(t,u,d),b=d.value,u=d.rest,h.push(b);if(h.length===2)throw new Error("Found a source, but no line and column");if(h.length===3)throw new Error("Found a source and line, but no column");f[A]=h}g.generatedColumn=a+h[0],a=g.generatedColumn,h.length>1&&(g.source=l+h[1],l+=h[1],g.originalLine=o+h[2],o=g.originalLine,g.originalLine+=1,g.originalColumn=i+h[3],i=g.originalColumn,h.length>4&&(g.name=s+h[4],s+=h[4])),y.push(g),typeof g.originalLine=="number"&&m.push(g)}ks(y,Me.compareByGeneratedPositionsDeflated),this.__generatedMappings=y,ks(m,Me.compareByOriginalPositions),this.__originalMappings=m};tn.prototype._findMapping=function(t,n,r,a,o,i){if(t[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+t[r]);if(t[a]<0)throw new TypeError("Column must be greater than or equal to 0, got "+t[a]);return Ep.search(t,n,o,i)};tn.prototype.computeColumnSpans=function(){for(var t=0;t<this._generatedMappings.length;++t){var n=this._generatedMappings[t];if(t+1<this._generatedMappings.length){var r=this._generatedMappings[t+1];if(n.generatedLine===r.generatedLine){n.lastGeneratedColumn=r.generatedColumn-1;continue}}n.lastGeneratedColumn=1/0}};tn.prototype.originalPositionFor=function(t){var n={generatedLine:Me.getArg(t,"line"),generatedColumn:Me.getArg(t,"column")},r=this._findMapping(n,this._generatedMappings,"generatedLine","generatedColumn",Me.compareByGeneratedPositionsDeflated,Me.getArg(t,"bias",_t.GREATEST_LOWER_BOUND));if(r>=0){var a=this._generatedMappings[r];if(a.generatedLine===n.generatedLine){var o=Me.getArg(a,"source",null);o!==null&&(o=this._sources.at(o),o=Me.computeSourceURL(this.sourceRoot,o,this._sourceMapURL));var i=Me.getArg(a,"name",null);return i!==null&&(i=this._names.at(i)),{source:o,line:Me.getArg(a,"originalLine",null),column:Me.getArg(a,"originalColumn",null),name:i}}}return{source:null,line:null,column:null,name:null}};tn.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(t){return t==null}):!1};tn.prototype.sourceContentFor=function(t,n){if(!this.sourcesContent)return null;var r=this._findSourceIndex(t);if(r>=0)return this.sourcesContent[r];var a=t;this.sourceRoot!=null&&(a=Me.relative(this.sourceRoot,a));var o;if(this.sourceRoot!=null&&(o=Me.urlParse(this.sourceRoot))){var i=a.replace(/^file:\/\//,"");if(o.scheme=="file"&&this._sources.has(i))return this.sourcesContent[this._sources.indexOf(i)];if((!o.path||o.path=="/")&&this._sources.has("/"+a))return this.sourcesContent[this._sources.indexOf("/"+a)]}if(n)return null;throw new Error('"'+a+'" is not in the SourceMap.')};tn.prototype.generatedPositionFor=function(t){var n=Me.getArg(t,"source");if(n=this._findSourceIndex(n),n<0)return{line:null,column:null,lastColumn:null};var r={source:n,originalLine:Me.getArg(t,"line"),originalColumn:Me.getArg(t,"column")},a=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",Me.compareByOriginalPositions,Me.getArg(t,"bias",_t.GREATEST_LOWER_BOUND));if(a>=0){var o=this._originalMappings[a];if(o.source===r.source)return{line:Me.getArg(o,"generatedLine",null),column:Me.getArg(o,"generatedColumn",null),lastColumn:Me.getArg(o,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}};jc.BasicSourceMapConsumer=tn;function ar(e,t){var n=e;typeof e=="string"&&(n=Me.parseSourceMapInput(e));var r=Me.getArg(n,"version"),a=Me.getArg(n,"sections");if(r!=this._version)throw new Error("Unsupported version: "+r);this._sources=new di,this._names=new di;var o={line:-1,column:0};this._sections=a.map(function(i){if(i.url)throw new Error("Support for url field in sections not implemented.");var l=Me.getArg(i,"offset"),s=Me.getArg(l,"line"),c=Me.getArg(l,"column");if(s<o.line||s===o.line&&c<o.column)throw new Error("Section offsets must be ordered and non-overlapping.");return o=l,{generatedOffset:{generatedLine:s+1,generatedColumn:c+1},consumer:new _t(Me.getArg(i,"map"),t)}})}ar.prototype=Object.create(_t.prototype);ar.prototype.constructor=_t;ar.prototype._version=3;Object.defineProperty(ar.prototype,"sources",{get:function(){for(var e=[],t=0;t<this._sections.length;t++)for(var n=0;n<this._sections[t].consumer.sources.length;n++)e.push(this._sections[t].consumer.sources[n]);return e}});ar.prototype.originalPositionFor=function(t){var n={generatedLine:Me.getArg(t,"line"),generatedColumn:Me.getArg(t,"column")},r=Ep.search(n,this._sections,function(o,i){var l=o.generatedLine-i.generatedOffset.generatedLine;return l||o.generatedColumn-i.generatedOffset.generatedColumn}),a=this._sections[r];return a?a.consumer.originalPositionFor({line:n.generatedLine-(a.generatedOffset.generatedLine-1),column:n.generatedColumn-(a.generatedOffset.generatedLine===n.generatedLine?a.generatedOffset.generatedColumn-1:0),bias:t.bias}):{source:null,line:null,column:null,name:null}};ar.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(t){return t.consumer.hasContentsOfAllSources()})};ar.prototype.sourceContentFor=function(t,n){for(var r=0;r<this._sections.length;r++){var a=this._sections[r],o=a.consumer.sourceContentFor(t,!0);if(o)return o}if(n)return null;throw new Error('"'+t+'" is not in the SourceMap.')};ar.prototype.generatedPositionFor=function(t){for(var n=0;n<this._sections.length;n++){var r=this._sections[n];if(r.consumer._findSourceIndex(Me.getArg(t,"source"))!==-1){var a=r.consumer.generatedPositionFor(t);if(a){var o={line:a.line+(r.generatedOffset.generatedLine-1),column:a.column+(r.generatedOffset.generatedLine===a.line?r.generatedOffset.generatedColumn-1:0)};return o}}}return{line:null,column:null}};ar.prototype._parseMappings=function(t,n){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var a=this._sections[r],o=a.consumer._generatedMappings,i=0;i<o.length;i++){var l=o[i],s=a.consumer._sources.at(l.source);s=Me.computeSourceURL(a.consumer.sourceRoot,s,this._sourceMapURL),this._sources.add(s),s=this._sources.indexOf(s);var c=null;l.name&&(c=a.consumer._names.at(l.name),this._names.add(c),c=this._names.indexOf(c));var u={source:s,generatedLine:l.generatedLine+(a.generatedOffset.generatedLine-1),generatedColumn:l.generatedColumn+(a.generatedOffset.generatedLine===l.generatedLine?a.generatedOffset.generatedColumn-1:0),originalLine:l.originalLine,originalColumn:l.originalColumn,name:c};this.__generatedMappings.push(u),typeof u.originalLine=="number"&&this.__originalMappings.push(u)}ks(this.__generatedMappings,Me.compareByGeneratedPositionsDeflated),ks(this.__originalMappings,Me.compareByOriginalPositions)};jc.IndexedSourceMapConsumer=ar;var z0={},kk=mp.SourceMapGenerator,Xl=wi,Tk=/(\r?\n)/,Ik=10,_i="$$$isSourceNode$$$";function In(e,t,n,r,a){this.children=[],this.sourceContents={},this.line=e==null?null:e,this.column=t==null?null:t,this.source=n==null?null:n,this.name=a==null?null:a,this[_i]=!0,r!=null&&this.add(r)}In.fromStringWithSourceMap=function(t,n,r){var a=new In,o=t.split(Tk),i=0,l=function(){var d=y(),m=y()||"";return d+m;function y(){return i<o.length?o[i++]:void 0}},s=1,c=0,u=null;return n.eachMapping(function(d){if(u!==null)if(s<d.generatedLine)f(u,l()),s++,c=0;else{var m=o[i]||"",y=m.substr(0,d.generatedColumn-c);o[i]=m.substr(d.generatedColumn-c),c=d.generatedColumn,f(u,y),u=d;return}for(;s<d.generatedLine;)a.add(l()),s++;if(c<d.generatedColumn){var m=o[i]||"";a.add(m.substr(0,d.generatedColumn)),o[i]=m.substr(d.generatedColumn),c=d.generatedColumn}u=d},this),i<o.length&&(u&&f(u,l()),a.add(o.splice(i).join(""))),n.sources.forEach(function(d){var m=n.sourceContentFor(d);m!=null&&(r!=null&&(d=Xl.join(r,d)),a.setSourceContent(d,m))}),a;function f(d,m){if(d===null||d.source===void 0)a.add(m);else{var y=r?Xl.join(r,d.source):d.source;a.add(new In(d.originalLine,d.originalColumn,y,m,d.name))}}};In.prototype.add=function(t){if(Array.isArray(t))t.forEach(function(n){this.add(n)},this);else if(t[_i]||typeof t=="string")t&&this.children.push(t);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+t);return this};In.prototype.prepend=function(t){if(Array.isArray(t))for(var n=t.length-1;n>=0;n--)this.prepend(t[n]);else if(t[_i]||typeof t=="string")this.children.unshift(t);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+t);return this};In.prototype.walk=function(t){for(var n,r=0,a=this.children.length;r<a;r++)n=this.children[r],n[_i]?n.walk(t):n!==""&&t(n,{source:this.source,line:this.line,column:this.column,name:this.name})};In.prototype.join=function(t){var n,r,a=this.children.length;if(a>0){for(n=[],r=0;r<a-1;r++)n.push(this.children[r]),n.push(t);n.push(this.children[r]),this.children=n}return this};In.prototype.replaceRight=function(t,n){var r=this.children[this.children.length-1];return r[_i]?r.replaceRight(t,n):typeof r=="string"?this.children[this.children.length-1]=r.replace(t,n):this.children.push("".replace(t,n)),this};In.prototype.setSourceContent=function(t,n){this.sourceContents[Xl.toSetString(t)]=n};In.prototype.walkSourceContents=function(t){for(var n=0,r=this.children.length;n<r;n++)this.children[n][_i]&&this.children[n].walkSourceContents(t);for(var a=Object.keys(this.sourceContents),n=0,r=a.length;n<r;n++)t(Xl.fromSetString(a[n]),this.sourceContents[a[n]])};In.prototype.toString=function(){var t="";return this.walk(function(n){t+=n}),t};In.prototype.toStringWithSourceMap=function(t){var n={code:"",line:1,column:0},r=new kk(t),a=!1,o=null,i=null,l=null,s=null;return this.walk(function(c,u){n.code+=c,u.source!==null&&u.line!==null&&u.column!==null?((o!==u.source||i!==u.line||l!==u.column||s!==u.name)&&r.addMapping({source:u.source,original:{line:u.line,column:u.column},generated:{line:n.line,column:n.column},name:u.name}),o=u.source,i=u.line,l=u.column,s=u.name,a=!0):a&&(r.addMapping({generated:{line:n.line,column:n.column}}),o=null,a=!1);for(var f=0,d=c.length;f<d;f++)c.charCodeAt(f)===Ik?(n.line++,n.column=0,f+1===d?(o=null,a=!1):a&&r.addMapping({source:u.source,original:{line:u.line,column:u.column},generated:{line:n.line,column:n.column},name:u.name})):n.column++}),this.walkSourceContents(function(c,u){r.setSourceContent(c,u)}),{code:n.code,map:r}};z0.SourceNode=In;Nc.SourceMapGenerator=mp.SourceMapGenerator;Nc.SourceMapConsumer=jc.SourceMapConsumer;Nc.SourceNode=z0.SourceNode;/*!
  * message-compiler v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */Object.defineProperty(Wn,"__esModule",{value:!0});var Zl=Rc.exports,Ok=Nc;const Xe={EXPECTED_TOKEN:1,INVALID_TOKEN_IN_PLACEHOLDER:2,UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER:3,UNKNOWN_ESCAPE_SEQUENCE:4,INVALID_UNICODE_ESCAPE_SEQUENCE:5,UNBALANCED_CLOSING_BRACE:6,UNTERMINATED_CLOSING_BRACE:7,EMPTY_PLACEHOLDER:8,NOT_ALLOW_NEST_PLACEHOLDER:9,INVALID_LINKED_FORMAT:10,MUST_HAVE_MESSAGES_IN_PLURAL:11,UNEXPECTED_EMPTY_LINKED_MODIFIER:12,UNEXPECTED_EMPTY_LINKED_KEY:13,UNEXPECTED_LEXICAL_ANALYSIS:14,__EXTEND_POINT__:15},Bk={[Xe.EXPECTED_TOKEN]:"Expected token: '{0}'",[Xe.INVALID_TOKEN_IN_PLACEHOLDER]:"Invalid token in placeholder: '{0}'",[Xe.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]:"Unterminated single quote in placeholder",[Xe.UNKNOWN_ESCAPE_SEQUENCE]:"Unknown escape sequence: \\{0}",[Xe.INVALID_UNICODE_ESCAPE_SEQUENCE]:"Invalid unicode escape sequence: {0}",[Xe.UNBALANCED_CLOSING_BRACE]:"Unbalanced closing brace",[Xe.UNTERMINATED_CLOSING_BRACE]:"Unterminated closing brace",[Xe.EMPTY_PLACEHOLDER]:"Empty placeholder",[Xe.NOT_ALLOW_NEST_PLACEHOLDER]:"Not allowed nest placeholder",[Xe.INVALID_LINKED_FORMAT]:"Invalid linked format",[Xe.MUST_HAVE_MESSAGES_IN_PLURAL]:"Plural must have messages",[Xe.UNEXPECTED_EMPTY_LINKED_MODIFIER]:"Unexpected empty linked modifier",[Xe.UNEXPECTED_EMPTY_LINKED_KEY]:"Unexpected empty linked key",[Xe.UNEXPECTED_LEXICAL_ANALYSIS]:"Unexpected lexical analysis in token: '{0}'"};function xp(e,t,n={}){const{domain:r,messages:a,args:o}=n,i=e,l=new SyntaxError(String(i));return l.code=e,t&&(l.location=t),l.domain=r,l}function Lk(e){throw e}const j0={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0}};function U0(e,t,n){return{line:e,column:t,offset:n}}function Jl(e,t,n){const r={start:e,end:t};return n!=null&&(r.source=n),r}const Br=" ",Pk="\r",pn=`
`,$k=String.fromCharCode(8232),Dk=String.fromCharCode(8233);function Rk(e){const t=e;let n=0,r=1,a=1,o=0;const i=S=>t[S]===Pk&&t[S+1]===pn,l=S=>t[S]===pn,s=S=>t[S]===Dk,c=S=>t[S]===$k,u=S=>i(S)||l(S)||s(S)||c(S),f=()=>n,d=()=>r,m=()=>a,y=()=>o,g=S=>i(S)||s(S)||c(S)?pn:t[S],A=()=>g(n),h=()=>g(n+o);function p(){return o=0,u(n)&&(r++,a=0),i(n)&&n++,n++,a++,t[n]}function b(){return i(n+o)&&o++,o++,t[n+o]}function v(){n=0,r=1,a=1,o=0}function x(S=0){o=S}function _(){const S=n+o;for(;S!==n;)p();o=0}return{index:f,line:d,column:m,peekOffset:y,charAt:g,currentChar:A,currentPeek:h,next:p,peek:b,reset:v,resetPeek:x,skipToPeek:_}}const aa=void 0,Vm="'",Mk="tokenizer";function Nk(e,t={}){const n=t.location!==!1,r=Rk(e),a=()=>r.index(),o=()=>U0(r.line(),r.column(),r.index()),i=o(),l=a(),s={currentType:14,offset:l,startLoc:i,endLoc:i,lastType:14,lastOffset:l,lastStartLoc:i,lastEndLoc:i,braceNest:0,inLinked:!1,text:""},c=()=>s,{onError:u}=t;function f(T,B,H,...J){const de=c();if(B.column+=H,B.offset+=H,u){const me=Jl(de.startLoc,B),Ae=xp(T,me,{domain:Mk,args:J});u(Ae)}}function d(T,B,H){T.endLoc=o(),T.currentType=B;const J={type:B};return n&&(J.loc=Jl(T.startLoc,T.endLoc)),H!=null&&(J.value=H),J}const m=T=>d(T,14);function y(T,B){return T.currentChar()===B?(T.next(),B):(f(Xe.EXPECTED_TOKEN,o(),0,B),"")}function g(T){let B="";for(;T.currentPeek()===Br||T.currentPeek()===pn;)B+=T.currentPeek(),T.peek();return B}function A(T){const B=g(T);return T.skipToPeek(),B}function h(T){if(T===aa)return!1;const B=T.charCodeAt(0);return B>=97&&B<=122||B>=65&&B<=90||B===95}function p(T){if(T===aa)return!1;const B=T.charCodeAt(0);return B>=48&&B<=57}function b(T,B){const{currentType:H}=B;if(H!==2)return!1;g(T);const J=h(T.currentPeek());return T.resetPeek(),J}function v(T,B){const{currentType:H}=B;if(H!==2)return!1;g(T);const J=T.currentPeek()==="-"?T.peek():T.currentPeek(),de=p(J);return T.resetPeek(),de}function x(T,B){const{currentType:H}=B;if(H!==2)return!1;g(T);const J=T.currentPeek()===Vm;return T.resetPeek(),J}function _(T,B){const{currentType:H}=B;if(H!==8)return!1;g(T);const J=T.currentPeek()===".";return T.resetPeek(),J}function S(T,B){const{currentType:H}=B;if(H!==9)return!1;g(T);const J=h(T.currentPeek());return T.resetPeek(),J}function k(T,B){const{currentType:H}=B;if(!(H===8||H===12))return!1;g(T);const J=T.currentPeek()===":";return T.resetPeek(),J}function $(T,B){const{currentType:H}=B;if(H!==10)return!1;const J=()=>{const me=T.currentPeek();return me==="{"?h(T.peek()):me==="@"||me==="%"||me==="|"||me===":"||me==="."||me===Br||!me?!1:me===pn?(T.peek(),J()):h(me)},de=J();return T.resetPeek(),de}function R(T){g(T);const B=T.currentPeek()==="|";return T.resetPeek(),B}function D(T){const B=g(T),H=T.currentPeek()==="%"&&T.peek()==="{";return T.resetPeek(),{isModulo:H,hasSpace:B.length>0}}function j(T,B=!0){const H=(de=!1,me="",Ae=!1)=>{const xe=T.currentPeek();return xe==="{"?me==="%"?!1:de:xe==="@"||!xe?me==="%"?!0:de:xe==="%"?(T.peek(),H(de,"%",!0)):xe==="|"?me==="%"||Ae?!0:!(me===Br||me===pn):xe===Br?(T.peek(),H(!0,Br,Ae)):xe===pn?(T.peek(),H(!0,pn,Ae)):!0},J=H();return B&&T.resetPeek(),J}function M(T,B){const H=T.currentChar();return H===aa?aa:B(H)?(T.next(),H):null}function N(T){return M(T,H=>{const J=H.charCodeAt(0);return J>=97&&J<=122||J>=65&&J<=90||J>=48&&J<=57||J===95||J===36})}function F(T){return M(T,H=>{const J=H.charCodeAt(0);return J>=48&&J<=57})}function z(T){return M(T,H=>{const J=H.charCodeAt(0);return J>=48&&J<=57||J>=65&&J<=70||J>=97&&J<=102})}function X(T){let B="",H="";for(;B=F(T);)H+=B;return H}function Y(T){A(T);const B=T.currentChar();return B!=="%"&&f(Xe.EXPECTED_TOKEN,o(),0,B),T.next(),"%"}function le(T){let B="";for(;;){const H=T.currentChar();if(H==="{"||H==="}"||H==="@"||H==="|"||!H)break;if(H==="%")if(j(T))B+=H,T.next();else break;else if(H===Br||H===pn)if(j(T))B+=H,T.next();else{if(R(T))break;B+=H,T.next()}else B+=H,T.next()}return B}function Q(T){A(T);let B="",H="";for(;B=N(T);)H+=B;return T.currentChar()===aa&&f(Xe.UNTERMINATED_CLOSING_BRACE,o(),0),H}function ie(T){A(T);let B="";return T.currentChar()==="-"?(T.next(),B+=`-${X(T)}`):B+=X(T),T.currentChar()===aa&&f(Xe.UNTERMINATED_CLOSING_BRACE,o(),0),B}function ne(T){A(T),y(T,"'");let B="",H="";const J=me=>me!==Vm&&me!==pn;for(;B=M(T,J);)B==="\\"?H+=fe(T):H+=B;const de=T.currentChar();return de===pn||de===aa?(f(Xe.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER,o(),0),de===pn&&(T.next(),y(T,"'")),H):(y(T,"'"),H)}function fe(T){const B=T.currentChar();switch(B){case"\\":case"'":return T.next(),`\\${B}`;case"u":return ee(T,B,4);case"U":return ee(T,B,6);default:return f(Xe.UNKNOWN_ESCAPE_SEQUENCE,o(),0,B),""}}function ee(T,B,H){y(T,B);let J="";for(let de=0;de<H;de++){const me=z(T);if(!me){f(Xe.INVALID_UNICODE_ESCAPE_SEQUENCE,o(),0,`\\${B}${J}${T.currentChar()}`);break}J+=me}return`\\${B}${J}`}function K(T){A(T);let B="",H="";const J=de=>de!=="{"&&de!=="}"&&de!==Br&&de!==pn;for(;B=M(T,J);)H+=B;return H}function W(T){let B="",H="";for(;B=N(T);)H+=B;return H}function te(T){const B=(H=!1,J)=>{const de=T.currentChar();return de==="{"||de==="%"||de==="@"||de==="|"||!de||de===Br?J:de===pn?(J+=de,T.next(),B(H,J)):(J+=de,T.next(),B(!0,J))};return B(!1,"")}function pe(T){A(T);const B=y(T,"|");return A(T),B}function _e(T,B){let H=null;switch(T.currentChar()){case"{":return B.braceNest>=1&&f(Xe.NOT_ALLOW_NEST_PLACEHOLDER,o(),0),T.next(),H=d(B,2,"{"),A(T),B.braceNest++,H;case"}":return B.braceNest>0&&B.currentType===2&&f(Xe.EMPTY_PLACEHOLDER,o(),0),T.next(),H=d(B,3,"}"),B.braceNest--,B.braceNest>0&&A(T),B.inLinked&&B.braceNest===0&&(B.inLinked=!1),H;case"@":return B.braceNest>0&&f(Xe.UNTERMINATED_CLOSING_BRACE,o(),0),H=Be(T,B)||m(B),B.braceNest=0,H;default:let de=!0,me=!0,Ae=!0;if(R(T))return B.braceNest>0&&f(Xe.UNTERMINATED_CLOSING_BRACE,o(),0),H=d(B,1,pe(T)),B.braceNest=0,B.inLinked=!1,H;if(B.braceNest>0&&(B.currentType===5||B.currentType===6||B.currentType===7))return f(Xe.UNTERMINATED_CLOSING_BRACE,o(),0),B.braceNest=0,Ne(T,B);if(de=b(T,B))return H=d(B,5,Q(T)),A(T),H;if(me=v(T,B))return H=d(B,6,ie(T)),A(T),H;if(Ae=x(T,B))return H=d(B,7,ne(T)),A(T),H;if(!de&&!me&&!Ae)return H=d(B,13,K(T)),f(Xe.INVALID_TOKEN_IN_PLACEHOLDER,o(),0,H.value),A(T),H;break}return H}function Be(T,B){const{currentType:H}=B;let J=null;const de=T.currentChar();switch((H===8||H===9||H===12||H===10)&&(de===pn||de===Br)&&f(Xe.INVALID_LINKED_FORMAT,o(),0),de){case"@":return T.next(),J=d(B,8,"@"),B.inLinked=!0,J;case".":return A(T),T.next(),d(B,9,".");case":":return A(T),T.next(),d(B,10,":");default:return R(T)?(J=d(B,1,pe(T)),B.braceNest=0,B.inLinked=!1,J):_(T,B)||k(T,B)?(A(T),Be(T,B)):S(T,B)?(A(T),d(B,12,W(T))):$(T,B)?(A(T),de==="{"?_e(T,B)||J:d(B,11,te(T))):(H===8&&f(Xe.INVALID_LINKED_FORMAT,o(),0),B.braceNest=0,B.inLinked=!1,Ne(T,B))}}function Ne(T,B){let H={type:14};if(B.braceNest>0)return _e(T,B)||m(B);if(B.inLinked)return Be(T,B)||m(B);switch(T.currentChar()){case"{":return _e(T,B)||m(B);case"}":return f(Xe.UNBALANCED_CLOSING_BRACE,o(),0),T.next(),d(B,3,"}");case"@":return Be(T,B)||m(B);default:if(R(T))return H=d(B,1,pe(T)),B.braceNest=0,B.inLinked=!1,H;const{isModulo:de,hasSpace:me}=D(T);if(de)return me?d(B,0,le(T)):d(B,4,Y(T));if(j(T))return d(B,0,le(T));break}return H}function U(){const{currentType:T,offset:B,startLoc:H,endLoc:J}=s;return s.lastType=T,s.lastOffset=B,s.lastStartLoc=H,s.lastEndLoc=J,s.offset=a(),s.startLoc=o(),r.currentChar()===aa?d(s,14):Ne(r,s)}return{nextToken:U,currentOffset:a,currentPosition:o,context:c}}const V0="parser",Fk=/(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;function zk(e,t,n){switch(e){case"\\\\":return"\\";case"\\'":return"'";default:{const r=parseInt(t||n,16);return r<=55295||r>=57344?String.fromCodePoint(r):"\uFFFD"}}}function H0(e={}){const t=e.location!==!1,{onError:n}=e;function r(h,p,b,v,...x){const _=h.currentPosition();if(_.offset+=v,_.column+=v,n){const S=Jl(b,_),k=xp(p,S,{domain:V0,args:x});n(k)}}function a(h,p,b){const v={type:h,start:p,end:p};return t&&(v.loc={start:b,end:b}),v}function o(h,p,b,v){h.end=p,v&&(h.type=v),t&&h.loc&&(h.loc.end=b)}function i(h,p){const b=h.context(),v=a(3,b.offset,b.startLoc);return v.value=p,o(v,h.currentOffset(),h.currentPosition()),v}function l(h,p){const b=h.context(),{lastOffset:v,lastStartLoc:x}=b,_=a(5,v,x);return _.index=parseInt(p,10),h.nextToken(),o(_,h.currentOffset(),h.currentPosition()),_}function s(h,p){const b=h.context(),{lastOffset:v,lastStartLoc:x}=b,_=a(4,v,x);return _.key=p,h.nextToken(),o(_,h.currentOffset(),h.currentPosition()),_}function c(h,p){const b=h.context(),{lastOffset:v,lastStartLoc:x}=b,_=a(9,v,x);return _.value=p.replace(Fk,zk),h.nextToken(),o(_,h.currentOffset(),h.currentPosition()),_}function u(h){const p=h.nextToken(),b=h.context(),{lastOffset:v,lastStartLoc:x}=b,_=a(8,v,x);return p.type!==12?(r(h,Xe.UNEXPECTED_EMPTY_LINKED_MODIFIER,b.lastStartLoc,0),_.value="",o(_,v,x),{nextConsumeToken:p,node:_}):(p.value==null&&r(h,Xe.UNEXPECTED_LEXICAL_ANALYSIS,b.lastStartLoc,0,dr(p)),_.value=p.value||"",o(_,h.currentOffset(),h.currentPosition()),{node:_})}function f(h,p){const b=h.context(),v=a(7,b.offset,b.startLoc);return v.value=p,o(v,h.currentOffset(),h.currentPosition()),v}function d(h){const p=h.context(),b=a(6,p.offset,p.startLoc);let v=h.nextToken();if(v.type===9){const x=u(h);b.modifier=x.node,v=x.nextConsumeToken||h.nextToken()}switch(v.type!==10&&r(h,Xe.UNEXPECTED_LEXICAL_ANALYSIS,p.lastStartLoc,0,dr(v)),v=h.nextToken(),v.type===2&&(v=h.nextToken()),v.type){case 11:v.value==null&&r(h,Xe.UNEXPECTED_LEXICAL_ANALYSIS,p.lastStartLoc,0,dr(v)),b.key=f(h,v.value||"");break;case 5:v.value==null&&r(h,Xe.UNEXPECTED_LEXICAL_ANALYSIS,p.lastStartLoc,0,dr(v)),b.key=s(h,v.value||"");break;case 6:v.value==null&&r(h,Xe.UNEXPECTED_LEXICAL_ANALYSIS,p.lastStartLoc,0,dr(v)),b.key=l(h,v.value||"");break;case 7:v.value==null&&r(h,Xe.UNEXPECTED_LEXICAL_ANALYSIS,p.lastStartLoc,0,dr(v)),b.key=c(h,v.value||"");break;default:r(h,Xe.UNEXPECTED_EMPTY_LINKED_KEY,p.lastStartLoc,0);const x=h.context(),_=a(7,x.offset,x.startLoc);return _.value="",o(_,x.offset,x.startLoc),b.key=_,o(b,x.offset,x.startLoc),{nextConsumeToken:v,node:b}}return o(b,h.currentOffset(),h.currentPosition()),{node:b}}function m(h){const p=h.context(),b=p.currentType===1?h.currentOffset():p.offset,v=p.currentType===1?p.endLoc:p.startLoc,x=a(2,b,v);x.items=[];let _=null;do{const $=_||h.nextToken();switch(_=null,$.type){case 0:$.value==null&&r(h,Xe.UNEXPECTED_LEXICAL_ANALYSIS,p.lastStartLoc,0,dr($)),x.items.push(i(h,$.value||""));break;case 6:$.value==null&&r(h,Xe.UNEXPECTED_LEXICAL_ANALYSIS,p.lastStartLoc,0,dr($)),x.items.push(l(h,$.value||""));break;case 5:$.value==null&&r(h,Xe.UNEXPECTED_LEXICAL_ANALYSIS,p.lastStartLoc,0,dr($)),x.items.push(s(h,$.value||""));break;case 7:$.value==null&&r(h,Xe.UNEXPECTED_LEXICAL_ANALYSIS,p.lastStartLoc,0,dr($)),x.items.push(c(h,$.value||""));break;case 8:const R=d(h);x.items.push(R.node),_=R.nextConsumeToken||null;break}}while(p.currentType!==14&&p.currentType!==1);const S=p.currentType===1?p.lastOffset:h.currentOffset(),k=p.currentType===1?p.lastEndLoc:h.currentPosition();return o(x,S,k),x}function y(h,p,b,v){const x=h.context();let _=v.items.length===0;const S=a(1,p,b);S.cases=[],S.cases.push(v);do{const k=m(h);_||(_=k.items.length===0),S.cases.push(k)}while(x.currentType!==14);return _&&r(h,Xe.MUST_HAVE_MESSAGES_IN_PLURAL,b,0),o(S,h.currentOffset(),h.currentPosition()),S}function g(h){const p=h.context(),{offset:b,startLoc:v}=p,x=m(h);return p.currentType===14?x:y(h,b,v,x)}function A(h){const p=Nk(h,Zl.assign({},e)),b=p.context(),v=a(0,b.offset,b.startLoc);return t&&v.loc&&(v.loc.source=h),v.body=g(p),b.currentType!==14&&r(p,Xe.UNEXPECTED_LEXICAL_ANALYSIS,b.lastStartLoc,0,h[b.offset]||""),o(v,p.currentOffset(),p.currentPosition()),v}return{parse:A}}function dr(e){if(e.type===14)return"EOF";const t=(e.value||"").replace(/\r?\n/gu,"\\n");return t.length>10?t.slice(0,9)+"\u2026":t}function jk(e,t={}){const n={ast:e,helpers:new Set};return{context:()=>n,helper:o=>(n.helpers.add(o),o)}}function Hm(e,t){for(let n=0;n<e.length;n++)Cp(e[n],t)}function Cp(e,t){switch(e.type){case 1:Hm(e.cases,t),t.helper("plural");break;case 2:Hm(e.items,t);break;case 6:Cp(e.key,t),t.helper("linked"),t.helper("type");break;case 5:t.helper("interpolate"),t.helper("list");break;case 4:t.helper("interpolate"),t.helper("named");break}}function Uk(e,t={}){const n=jk(e);n.helper("normalize"),e.body&&Cp(e.body,n);const r=n.context();e.helpers=Array.from(r.helpers)}function Vk(e,t){const{sourceMap:n,filename:r,breakLineCode:a,needIndent:o}=t,i={source:e.loc.source,filename:r,code:"",column:1,line:1,offset:0,map:void 0,breakLineCode:a,needIndent:o,indentLevel:0},l=()=>i;function s(A,h){i.code+=A,i.map&&(h&&h.loc&&h.loc!==j0&&g(h.loc.start,Kk(h)),Qk(i,A))}function c(A,h=!0){const p=h?a:"";s(o?p+"  ".repeat(A):p)}function u(A=!0){const h=++i.indentLevel;A&&c(h)}function f(A=!0){const h=--i.indentLevel;A&&c(h)}function d(){c(i.indentLevel)}const m=A=>`_${A}`,y=()=>i.needIndent;function g(A,h){i.map.addMapping({name:h,source:i.filename,original:{line:A.line,column:A.column-1},generated:{line:i.line,column:i.column-1}})}return n&&(i.map=new Ok.SourceMapGenerator,i.map.setSourceContent(r,i.source)),{context:l,push:s,indent:u,deindent:f,newline:d,helper:m,needIndent:y}}function Hk(e,t){const{helper:n}=e;e.push(`${n("linked")}(`),fi(e,t.key),t.modifier?(e.push(", "),fi(e,t.modifier),e.push(", _type")):e.push(", undefined, _type"),e.push(")")}function Wk(e,t){const{helper:n,needIndent:r}=e;e.push(`${n("normalize")}([`),e.indent(r());const a=t.items.length;for(let o=0;o<a&&(fi(e,t.items[o]),o!==a-1);o++)e.push(", ");e.deindent(r()),e.push("])")}function qk(e,t){const{helper:n,needIndent:r}=e;if(t.cases.length>1){e.push(`${n("plural")}([`),e.indent(r());const a=t.cases.length;for(let o=0;o<a&&(fi(e,t.cases[o]),o!==a-1);o++)e.push(", ");e.deindent(r()),e.push("])")}}function Yk(e,t){t.body?fi(e,t.body):e.push("null")}function fi(e,t){const{helper:n}=e;switch(t.type){case 0:Yk(e,t);break;case 1:qk(e,t);break;case 2:Wk(e,t);break;case 6:Hk(e,t);break;case 8:e.push(JSON.stringify(t.value),t);break;case 7:e.push(JSON.stringify(t.value),t);break;case 5:e.push(`${n("interpolate")}(${n("list")}(${t.index}))`,t);break;case 4:e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`,t);break;case 9:e.push(JSON.stringify(t.value),t);break;case 3:e.push(JSON.stringify(t.value),t);break}}const Gk=(e,t={})=>{const n=Zl.isString(t.mode)?t.mode:"normal",r=Zl.isString(t.filename)?t.filename:"message.intl",a=!!t.sourceMap,o=t.breakLineCode!=null?t.breakLineCode:n==="arrow"?";":`
`,i=t.needIndent?t.needIndent:n!=="arrow",l=e.helpers||[],s=Vk(e,{mode:n,filename:r,sourceMap:a,breakLineCode:o,needIndent:i});s.push(n==="normal"?"function __msg__ (ctx) {":"(ctx) => {"),s.indent(i),l.length>0&&(s.push(`const { ${l.map(f=>`${f}: _${f}`).join(", ")} } = ctx`),s.newline()),s.push("return "),fi(s,e),s.deindent(i),s.push("}");const{code:c,map:u}=s.context();return{ast:e,code:c,map:u?u.toJSON():void 0}};function Kk(e){switch(e.type){case 3:case 9:case 8:case 7:return e.value;case 5:return e.index.toString();case 4:return e.key;default:return}}function Qk(e,t,n=t.length){let r=0,a=-1;for(let o=0;o<n;o++)t.charCodeAt(o)===10&&(r++,a=o);return e.offset+=n,e.line+=r,e.column=a===-1?e.column+n:n-a,e}function Xk(e,t={}){const n=Zl.assign({},t),a=H0(n).parse(e);return Uk(a,n),Gk(a,n)}Wn.CompileErrorCodes=Xe;Wn.ERROR_DOMAIN=V0;Wn.LocationStub=j0;Wn.baseCompile=Xk;Wn.createCompileError=xp;Wn.createLocation=Jl;Wn.createParser=H0;Wn.createPosition=U0;Wn.defaultOnError=Lk;Wn.errorMessages=Bk;(function(e){e.exports=Wn})(O0);var W0={exports:{}},wp={};/*!
  * devtools-if v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */Object.defineProperty(wp,"__esModule",{value:!0});const Zk={I18nInit:"i18n:init",FunctionTranslate:"function:translate"};wp.IntlifyDevToolsHooks=Zk;(function(e){e.exports=wp})(W0);/*!
  * core-base v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */Object.defineProperty(Ye,"__esModule",{value:!0});var pi=O0.exports,ue=Rc.exports,q0=W0.exports;const Ba=[];Ba[0]={w:[0],i:[3,0],["["]:[4],o:[7]};Ba[1]={w:[1],["."]:[2],["["]:[4],o:[7]};Ba[2]={w:[2],i:[3,0],[0]:[3,0]};Ba[3]={i:[3,0],[0]:[3,0],w:[1,1],["."]:[2,1],["["]:[4,1],o:[7,1]};Ba[4]={["'"]:[5,0],['"']:[6,0],["["]:[4,2],["]"]:[1,3],o:8,l:[4,0]};Ba[5]={["'"]:[4,0],o:8,l:[5,0]};Ba[6]={['"']:[4,0],o:8,l:[6,0]};const Jk=/^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;function e2(e){return Jk.test(e)}function t2(e){const t=e.charCodeAt(0),n=e.charCodeAt(e.length-1);return t===n&&(t===34||t===39)?e.slice(1,-1):e}function n2(e){if(e==null)return"o";switch(e.charCodeAt(0)){case 91:case 93:case 46:case 34:case 39:return e;case 95:case 36:case 45:return"i";case 9:case 10:case 13:case 160:case 65279:case 8232:case 8233:return"w"}return"i"}function r2(e){const t=e.trim();return e.charAt(0)==="0"&&isNaN(parseInt(e))?!1:e2(t)?t2(t):"*"+t}function Y0(e){const t=[];let n=-1,r=0,a=0,o,i,l,s,c,u,f;const d=[];d[0]=()=>{i===void 0?i=l:i+=l},d[1]=()=>{i!==void 0&&(t.push(i),i=void 0)},d[2]=()=>{d[0](),a++},d[3]=()=>{if(a>0)a--,r=4,d[0]();else{if(a=0,i===void 0||(i=r2(i),i===!1))return!1;d[1]()}};function m(){const y=e[n+1];if(r===5&&y==="'"||r===6&&y==='"')return n++,l="\\"+y,d[0](),!0}for(;r!==null;)if(n++,o=e[n],!(o==="\\"&&m())){if(s=n2(o),f=Ba[r],c=f[s]||f.l||8,c===8||(r=c[0],c[1]!==void 0&&(u=d[c[1]],u&&(l=o,u()===!1))))return;if(r===7)return t}}const Wm=new Map;function G0(e,t){return ue.isObject(e)?e[t]:null}function a2(e,t){if(!ue.isObject(e))return null;let n=Wm.get(t);if(n||(n=Y0(t),n&&Wm.set(t,n)),!n)return null;const r=n.length;let a=e,o=0;for(;o<r;){const i=a[n[o]];if(i===void 0)return null;a=i,o++}return a}const o2=e=>e,i2=e=>"",K0="text",s2=e=>e.length===0?"":e.join(""),l2=ue.toDisplayString;function qm(e,t){return e=Math.abs(e),t===2?e?e>1?1:0:1:e?Math.min(e,2):0}function c2(e){const t=ue.isNumber(e.pluralIndex)?e.pluralIndex:-1;return e.named&&(ue.isNumber(e.named.count)||ue.isNumber(e.named.n))?ue.isNumber(e.named.count)?e.named.count:ue.isNumber(e.named.n)?e.named.n:t:t}function u2(e,t){t.count||(t.count=e),t.n||(t.n=e)}function Q0(e={}){const t=e.locale,n=c2(e),r=ue.isObject(e.pluralRules)&&ue.isString(t)&&ue.isFunction(e.pluralRules[t])?e.pluralRules[t]:qm,a=ue.isObject(e.pluralRules)&&ue.isString(t)&&ue.isFunction(e.pluralRules[t])?qm:void 0,o=h=>h[r(n,h.length,a)],i=e.list||[],l=h=>i[h],s=e.named||{};ue.isNumber(e.pluralIndex)&&u2(n,s);const c=h=>s[h];function u(h){const p=ue.isFunction(e.messages)?e.messages(h):ue.isObject(e.messages)?e.messages[h]:!1;return p||(e.parent?e.parent.message(h):i2)}const f=h=>e.modifiers?e.modifiers[h]:o2,d=ue.isPlainObject(e.processor)&&ue.isFunction(e.processor.normalize)?e.processor.normalize:s2,m=ue.isPlainObject(e.processor)&&ue.isFunction(e.processor.interpolate)?e.processor.interpolate:l2,y=ue.isPlainObject(e.processor)&&ue.isString(e.processor.type)?e.processor.type:K0,A={list:l,named:c,plural:o,linked:(h,...p)=>{const[b,v]=p;let x="text",_="";p.length===1?ue.isObject(b)?(_=b.modifier||_,x=b.type||x):ue.isString(b)&&(_=b||_):p.length===2&&(ue.isString(b)&&(_=b||_),ue.isString(v)&&(x=v||x));let S=u(h)(A);return x==="vnode"&&ue.isArray(S)&&_&&(S=S[0]),_?f(_)(S,x):S},message:u,type:y,interpolate:m,normalize:d};return A}let hi=null;function d2(e){hi=e}function f2(){return hi}function p2(e,t,n){hi&&hi.emit(q0.IntlifyDevToolsHooks.I18nInit,{timestamp:Date.now(),i18n:e,version:t,meta:n})}const h2=m2(q0.IntlifyDevToolsHooks.FunctionTranslate);function m2(e){return t=>hi&&hi.emit(e,t)}const Ka={NOT_FOUND_KEY:1,FALLBACK_TO_TRANSLATE:2,CANNOT_FORMAT_NUMBER:3,FALLBACK_TO_NUMBER_FORMAT:4,CANNOT_FORMAT_DATE:5,FALLBACK_TO_DATE_FORMAT:6,__EXTEND_POINT__:7},g2={[Ka.NOT_FOUND_KEY]:"Not found '{key}' key in '{locale}' locale messages.",[Ka.FALLBACK_TO_TRANSLATE]:"Fall back to translate '{key}' key with '{target}' locale.",[Ka.CANNOT_FORMAT_NUMBER]:"Cannot format a number value due to not supported Intl.NumberFormat.",[Ka.FALLBACK_TO_NUMBER_FORMAT]:"Fall back to number format '{key}' key with '{target}' locale.",[Ka.CANNOT_FORMAT_DATE]:"Cannot format a date value due to not supported Intl.DateTimeFormat.",[Ka.FALLBACK_TO_DATE_FORMAT]:"Fall back to datetime format '{key}' key with '{target}' locale."};function v2(e,...t){return ue.format(g2[e],...t)}function X0(e,t,n){return[...new Set([n,...ue.isArray(t)?t:ue.isObject(t)?Object.keys(t):ue.isString(t)?[t]:[n]])]}function y2(e,t,n){const r=ue.isString(n)?n:_p,a=e;a.__localeChainCache||(a.__localeChainCache=new Map);let o=a.__localeChainCache.get(r);if(!o){o=[];let i=[n];for(;ue.isArray(i);)i=Ym(o,i,t);const l=ue.isArray(t)||!ue.isPlainObject(t)?t:t.default?t.default:null;i=ue.isString(l)?[l]:l,ue.isArray(i)&&Ym(o,i,!1),a.__localeChainCache.set(r,o)}return o}function Ym(e,t,n){let r=!0;for(let a=0;a<t.length&&ue.isBoolean(r);a++){const o=t[a];ue.isString(o)&&(r=A2(e,t[a],n))}return r}function A2(e,t,n){let r;const a=t.split("-");do{const o=a.join("-");r=b2(e,o,n),a.splice(-1,1)}while(a.length&&r===!0);return r}function b2(e,t,n){let r=!1;if(!e.includes(t)&&(r=!0,t)){r=t[t.length-1]!=="!";const a=t.replace(/!/g,"");e.push(a),(ue.isArray(n)||ue.isPlainObject(n))&&n[a]&&(r=n[a])}return r}const Z0="9.2.2",Uc=-1,_p="en-US",E2="",Gm=e=>`${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;function x2(){return{upper:(e,t)=>t==="text"&&ue.isString(e)?e.toUpperCase():t==="vnode"&&ue.isObject(e)&&"__v_isVNode"in e?e.children.toUpperCase():e,lower:(e,t)=>t==="text"&&ue.isString(e)?e.toLowerCase():t==="vnode"&&ue.isObject(e)&&"__v_isVNode"in e?e.children.toLowerCase():e,capitalize:(e,t)=>t==="text"&&ue.isString(e)?Gm(e):t==="vnode"&&ue.isObject(e)&&"__v_isVNode"in e?Gm(e.children):e}}let J0;function C2(e){J0=e}let eA;function w2(e){eA=e}let tA;function _2(e){tA=e}let nA=null;const S2=e=>{nA=e},k2=()=>nA;let rA=null;const T2=e=>{rA=e},I2=()=>rA;let Km=0;function O2(e={}){const t=ue.isString(e.version)?e.version:Z0,n=ue.isString(e.locale)?e.locale:_p,r=ue.isArray(e.fallbackLocale)||ue.isPlainObject(e.fallbackLocale)||ue.isString(e.fallbackLocale)||e.fallbackLocale===!1?e.fallbackLocale:n,a=ue.isPlainObject(e.messages)?e.messages:{[n]:{}},o=ue.isPlainObject(e.datetimeFormats)?e.datetimeFormats:{[n]:{}},i=ue.isPlainObject(e.numberFormats)?e.numberFormats:{[n]:{}},l=ue.assign({},e.modifiers||{},x2()),s=e.pluralRules||{},c=ue.isFunction(e.missing)?e.missing:null,u=ue.isBoolean(e.missingWarn)||ue.isRegExp(e.missingWarn)?e.missingWarn:!0,f=ue.isBoolean(e.fallbackWarn)||ue.isRegExp(e.fallbackWarn)?e.fallbackWarn:!0,d=!!e.fallbackFormat,m=!!e.unresolving,y=ue.isFunction(e.postTranslation)?e.postTranslation:null,g=ue.isPlainObject(e.processor)?e.processor:null,A=ue.isBoolean(e.warnHtmlMessage)?e.warnHtmlMessage:!0,h=!!e.escapeParameter,p=ue.isFunction(e.messageCompiler)?e.messageCompiler:J0,b=ue.isFunction(e.messageResolver)?e.messageResolver:eA||G0,v=ue.isFunction(e.localeFallbacker)?e.localeFallbacker:tA||X0,x=ue.isObject(e.fallbackContext)?e.fallbackContext:void 0,_=ue.isFunction(e.onWarn)?e.onWarn:ue.warn,S=e,k=ue.isObject(S.__datetimeFormatters)?S.__datetimeFormatters:new Map,$=ue.isObject(S.__numberFormatters)?S.__numberFormatters:new Map,R=ue.isObject(S.__meta)?S.__meta:{};Km++;const D={version:t,cid:Km,locale:n,fallbackLocale:r,messages:a,modifiers:l,pluralRules:s,missing:c,missingWarn:u,fallbackWarn:f,fallbackFormat:d,unresolving:m,postTranslation:y,processor:g,warnHtmlMessage:A,escapeParameter:h,messageCompiler:p,messageResolver:b,localeFallbacker:v,fallbackContext:x,onWarn:_,__meta:R};return D.datetimeFormats=o,D.numberFormats=i,D.__datetimeFormatters=k,D.__numberFormatters=$,D}function B2(e,t){return e instanceof RegExp?e.test(t):e}function L2(e,t){return e instanceof RegExp?e.test(t):e}function Vc(e,t,n,r,a){const{missing:o,onWarn:i}=e;if(o!==null){const l=o(e,n,t,a);return ue.isString(l)?l:t}else return t}function P2(e,t,n){const r=e;r.__localeChainCache=new Map,e.localeFallbacker(e,n,t)}const $2=e=>e;let jd=Object.create(null);function D2(){jd=Object.create(null)}function R2(e,t={}){{const r=(t.onCacheKey||$2)(e),a=jd[r];if(a)return a;let o=!1;const i=t.onError||pi.defaultOnError;t.onError=c=>{o=!0,i(c)};const{code:l}=pi.baseCompile(e,t),s=new Function(`return ${l}`)();return o?s:jd[r]=s}}let aA=pi.CompileErrorCodes.__EXTEND_POINT__;const Mu=()=>++aA,Ar={INVALID_ARGUMENT:aA,INVALID_DATE_ARGUMENT:Mu(),INVALID_ISO_DATE_ARGUMENT:Mu(),__EXTEND_POINT__:Mu()};function to(e){return pi.createCompileError(e,null,void 0)}Ar.INVALID_ARGUMENT+"",Ar.INVALID_DATE_ARGUMENT+"",Ar.INVALID_ISO_DATE_ARGUMENT+"";const Qm=()=>"",Ea=e=>ue.isFunction(e);function M2(e,...t){const{fallbackFormat:n,postTranslation:r,unresolving:a,messageCompiler:o,fallbackLocale:i,messages:l}=e,[s,c]=sA(...t),u=ue.isBoolean(c.missingWarn)?c.missingWarn:e.missingWarn,f=ue.isBoolean(c.fallbackWarn)?c.fallbackWarn:e.fallbackWarn,d=ue.isBoolean(c.escapeParameter)?c.escapeParameter:e.escapeParameter,m=!!c.resolvedMessage,y=ue.isString(c.default)||ue.isBoolean(c.default)?ue.isBoolean(c.default)?o?s:()=>s:c.default:n?o?s:()=>s:"",g=n||y!=="",A=ue.isString(c.locale)?c.locale:e.locale;d&&N2(c);let[h,p,b]=m?[s,A,l[A]||{}]:oA(e,s,A,i,f,u),v=h,x=s;if(!m&&!(ue.isString(v)||Ea(v))&&g&&(v=y,x=v),!m&&(!(ue.isString(v)||Ea(v))||!ue.isString(p)))return a?Uc:s;let _=!1;const S=()=>{_=!0},k=Ea(v)?v:iA(e,s,p,v,x,S);if(_)return v;const $=j2(e,p,b,c),R=Q0($),D=F2(e,k,R);return r?r(D,s):D}function N2(e){ue.isArray(e.list)?e.list=e.list.map(t=>ue.isString(t)?ue.escapeHtml(t):t):ue.isObject(e.named)&&Object.keys(e.named).forEach(t=>{ue.isString(e.named[t])&&(e.named[t]=ue.escapeHtml(e.named[t]))})}function oA(e,t,n,r,a,o){const{messages:i,onWarn:l,messageResolver:s,localeFallbacker:c}=e,u=c(e,r,n);let f={},d,m=null;const y="translate";for(let g=0;g<u.length&&(d=u[g],f=i[d]||{},(m=s(f,t))===null&&(m=f[t]),!(ue.isString(m)||ue.isFunction(m)));g++){const A=Vc(e,t,d,o,y);A!==t&&(m=A)}return[m,d,f]}function iA(e,t,n,r,a,o){const{messageCompiler:i,warnHtmlMessage:l}=e;if(Ea(r)){const c=r;return c.locale=c.locale||n,c.key=c.key||t,c}if(i==null){const c=()=>r;return c.locale=n,c.key=t,c}const s=i(r,z2(e,n,a,r,l,o));return s.locale=n,s.key=t,s.source=r,s}function F2(e,t,n){return t(n)}function sA(...e){const[t,n,r]=e,a={};if(!ue.isString(t)&&!ue.isNumber(t)&&!Ea(t))throw to(Ar.INVALID_ARGUMENT);const o=ue.isNumber(t)?String(t):(Ea(t),t);return ue.isNumber(n)?a.plural=n:ue.isString(n)?a.default=n:ue.isPlainObject(n)&&!ue.isEmptyObject(n)?a.named=n:ue.isArray(n)&&(a.list=n),ue.isNumber(r)?a.plural=r:ue.isString(r)?a.default=r:ue.isPlainObject(r)&&ue.assign(a,r),[o,a]}function z2(e,t,n,r,a,o){return{warnHtmlMessage:a,onError:i=>{throw o&&o(i),i},onCacheKey:i=>ue.generateFormatCacheKey(t,n,i)}}function j2(e,t,n,r){const{modifiers:a,pluralRules:o,messageResolver:i,fallbackLocale:l,fallbackWarn:s,missingWarn:c,fallbackContext:u}=e,d={locale:t,modifiers:a,pluralRules:o,messages:m=>{let y=i(n,m);if(y==null&&u){const[,,g]=oA(u,m,t,l,s,c);y=i(g,m)}if(ue.isString(y)){let g=!1;const h=iA(e,m,t,y,m,()=>{g=!0});return g?Qm:h}else return Ea(y)?y:Qm}};return e.processor&&(d.processor=e.processor),r.list&&(d.list=r.list),r.named&&(d.named=r.named),ue.isNumber(r.plural)&&(d.pluralIndex=r.plural),d}function U2(e,...t){const{datetimeFormats:n,unresolving:r,fallbackLocale:a,onWarn:o,localeFallbacker:i}=e,{__datetimeFormatters:l}=e,[s,c,u,f]=cA(...t),d=ue.isBoolean(u.missingWarn)?u.missingWarn:e.missingWarn;ue.isBoolean(u.fallbackWarn)?u.fallbackWarn:e.fallbackWarn;const m=!!u.part,y=ue.isString(u.locale)?u.locale:e.locale,g=i(e,a,y);if(!ue.isString(s)||s==="")return new Intl.DateTimeFormat(y,f).format(c);let A={},h,p=null;const b="datetime format";for(let _=0;_<g.length&&(h=g[_],A=n[h]||{},p=A[s],!ue.isPlainObject(p));_++)Vc(e,s,h,d,b);if(!ue.isPlainObject(p)||!ue.isString(h))return r?Uc:s;let v=`${h}__${s}`;ue.isEmptyObject(f)||(v=`${v}__${JSON.stringify(f)}`);let x=l.get(v);return x||(x=new Intl.DateTimeFormat(h,ue.assign({},p,f)),l.set(v,x)),m?x.formatToParts(c):x.format(c)}const lA=["localeMatcher","weekday","era","year","month","day","hour","minute","second","timeZoneName","formatMatcher","hour12","timeZone","dateStyle","timeStyle","calendar","dayPeriod","numberingSystem","hourCycle","fractionalSecondDigits"];function cA(...e){const[t,n,r,a]=e,o={};let i={},l;if(ue.isString(t)){const s=t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);if(!s)throw to(Ar.INVALID_ISO_DATE_ARGUMENT);const c=s[3]?s[3].trim().startsWith("T")?`${s[1].trim()}${s[3].trim()}`:`${s[1].trim()}T${s[3].trim()}`:s[1].trim();l=new Date(c);try{l.toISOString()}catch{throw to(Ar.INVALID_ISO_DATE_ARGUMENT)}}else if(ue.isDate(t)){if(isNaN(t.getTime()))throw to(Ar.INVALID_DATE_ARGUMENT);l=t}else if(ue.isNumber(t))l=t;else throw to(Ar.INVALID_ARGUMENT);return ue.isString(n)?o.key=n:ue.isPlainObject(n)&&Object.keys(n).forEach(s=>{lA.includes(s)?i[s]=n[s]:o[s]=n[s]}),ue.isString(r)?o.locale=r:ue.isPlainObject(r)&&(i=r),ue.isPlainObject(a)&&(i=a),[o.key||"",l,o,i]}function V2(e,t,n){const r=e;for(const a in n){const o=`${t}__${a}`;!r.__datetimeFormatters.has(o)||r.__datetimeFormatters.delete(o)}}function H2(e,...t){const{numberFormats:n,unresolving:r,fallbackLocale:a,onWarn:o,localeFallbacker:i}=e,{__numberFormatters:l}=e,[s,c,u,f]=dA(...t),d=ue.isBoolean(u.missingWarn)?u.missingWarn:e.missingWarn;ue.isBoolean(u.fallbackWarn)?u.fallbackWarn:e.fallbackWarn;const m=!!u.part,y=ue.isString(u.locale)?u.locale:e.locale,g=i(e,a,y);if(!ue.isString(s)||s==="")return new Intl.NumberFormat(y,f).format(c);let A={},h,p=null;const b="number format";for(let _=0;_<g.length&&(h=g[_],A=n[h]||{},p=A[s],!ue.isPlainObject(p));_++)Vc(e,s,h,d,b);if(!ue.isPlainObject(p)||!ue.isString(h))return r?Uc:s;let v=`${h}__${s}`;ue.isEmptyObject(f)||(v=`${v}__${JSON.stringify(f)}`);let x=l.get(v);return x||(x=new Intl.NumberFormat(h,ue.assign({},p,f)),l.set(v,x)),m?x.formatToParts(c):x.format(c)}const uA=["localeMatcher","style","currency","currencyDisplay","currencySign","useGrouping","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","compactDisplay","notation","signDisplay","unit","unitDisplay","roundingMode","roundingPriority","roundingIncrement","trailingZeroDisplay"];function dA(...e){const[t,n,r,a]=e,o={};let i={};if(!ue.isNumber(t))throw to(Ar.INVALID_ARGUMENT);const l=t;return ue.isString(n)?o.key=n:ue.isPlainObject(n)&&Object.keys(n).forEach(s=>{uA.includes(s)?i[s]=n[s]:o[s]=n[s]}),ue.isString(r)?o.locale=r:ue.isPlainObject(r)&&(i=r),ue.isPlainObject(a)&&(i=a),[o.key||"",l,o,i]}function W2(e,t,n){const r=e;for(const a in n){const o=`${t}__${a}`;!r.__numberFormatters.has(o)||r.__numberFormatters.delete(o)}}Ye.CompileErrorCodes=pi.CompileErrorCodes;Ye.createCompileError=pi.createCompileError;Ye.CoreErrorCodes=Ar;Ye.CoreWarnCodes=Ka;Ye.DATETIME_FORMAT_OPTIONS_KEYS=lA;Ye.DEFAULT_LOCALE=_p;Ye.DEFAULT_MESSAGE_DATA_TYPE=K0;Ye.MISSING_RESOLVE_VALUE=E2;Ye.NOT_REOSLVED=Uc;Ye.NUMBER_FORMAT_OPTIONS_KEYS=uA;Ye.VERSION=Z0;Ye.clearCompileCache=D2;Ye.clearDateTimeFormat=V2;Ye.clearNumberFormat=W2;Ye.compileToFunction=R2;Ye.createCoreContext=O2;Ye.createCoreError=to;Ye.createMessageContext=Q0;Ye.datetime=U2;Ye.fallbackWithLocaleChain=y2;Ye.fallbackWithSimple=X0;Ye.getAdditionalMeta=k2;Ye.getDevToolsHook=f2;Ye.getFallbackContext=I2;Ye.getWarnMessage=v2;Ye.handleMissing=Vc;Ye.initI18nDevTools=p2;Ye.isMessageFunction=Ea;Ye.isTranslateFallbackWarn=B2;Ye.isTranslateMissingWarn=L2;Ye.number=H2;Ye.parse=Y0;Ye.parseDateTimeArgs=cA;Ye.parseNumberArgs=dA;Ye.parseTranslateArgs=sA;Ye.registerLocaleFallbacker=_2;Ye.registerMessageCompiler=C2;Ye.registerMessageResolver=w2;Ye.resolveValue=a2;Ye.resolveWithKeyValue=G0;Ye.setAdditionalMeta=S2;Ye.setDevToolsHook=d2;Ye.setFallbackContext=T2;Ye.translate=M2;Ye.translateDevTools=h2;Ye.updateFallbackLocale=P2;(function(e){e.exports=Ye})(I0);const q2=S0(W_);/*!
  * vue-i18n v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */Object.defineProperty(Sr,"__esModule",{value:!0});var ae=Rc.exports,qe=I0.exports,et=q2;const fA="9.2.2";let pA=qe.CoreWarnCodes.__EXTEND_POINT__;const ko=()=>++pA,Vt={FALLBACK_TO_ROOT:pA,NOT_SUPPORTED_PRESERVE:ko(),NOT_SUPPORTED_FORMATTER:ko(),NOT_SUPPORTED_PRESERVE_DIRECTIVE:ko(),NOT_SUPPORTED_GET_CHOICE_INDEX:ko(),COMPONENT_NAME_LEGACY_COMPATIBLE:ko(),NOT_FOUND_PARENT_SCOPE:ko()},Y2={[Vt.FALLBACK_TO_ROOT]:"Fall back to {type} '{key}' with root locale.",[Vt.NOT_SUPPORTED_PRESERVE]:"Not supported 'preserve'.",[Vt.NOT_SUPPORTED_FORMATTER]:"Not supported 'formatter'.",[Vt.NOT_SUPPORTED_PRESERVE_DIRECTIVE]:"Not supported 'preserveDirectiveContent'.",[Vt.NOT_SUPPORTED_GET_CHOICE_INDEX]:"Not supported 'getChoiceIndex'.",[Vt.COMPONENT_NAME_LEGACY_COMPATIBLE]:"Component name legacy compatible: '{name}' -> 'i18n'",[Vt.NOT_FOUND_PARENT_SCOPE]:"Not found parent scope. use the global scope."};function Zn(e,...t){return ae.format(Y2[e],...t)}let hA=qe.CompileErrorCodes.__EXTEND_POINT__;const gn=()=>++hA,it={UNEXPECTED_RETURN_TYPE:hA,INVALID_ARGUMENT:gn(),MUST_BE_CALL_SETUP_TOP:gn(),NOT_INSLALLED:gn(),NOT_AVAILABLE_IN_LEGACY_MODE:gn(),REQUIRED_VALUE:gn(),INVALID_VALUE:gn(),CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN:gn(),NOT_INSLALLED_WITH_PROVIDE:gn(),UNEXPECTED_ERROR:gn(),NOT_COMPATIBLE_LEGACY_VUE_I18N:gn(),BRIDGE_SUPPORT_VUE_2_ONLY:gn(),MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION:gn(),NOT_AVAILABLE_COMPOSITION_IN_LEGACY:gn(),__EXTEND_POINT__:gn()};function Dt(e,...t){return qe.createCompileError(e,null,{messages:G2,args:t})}const G2={[it.UNEXPECTED_RETURN_TYPE]:"Unexpected return type in composer",[it.INVALID_ARGUMENT]:"Invalid argument",[it.MUST_BE_CALL_SETUP_TOP]:"Must be called at the top of a `setup` function",[it.NOT_INSLALLED]:"Need to install with `app.use` function",[it.UNEXPECTED_ERROR]:"Unexpected error",[it.NOT_AVAILABLE_IN_LEGACY_MODE]:"Not available in legacy mode",[it.REQUIRED_VALUE]:"Required in value: {0}",[it.INVALID_VALUE]:"Invalid value",[it.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]:"Cannot setup vue-devtools plugin",[it.NOT_INSLALLED_WITH_PROVIDE]:"Need to install with `provide` function",[it.NOT_COMPATIBLE_LEGACY_VUE_I18N]:"Not compatible legacy VueI18n.",[it.BRIDGE_SUPPORT_VUE_2_ONLY]:"vue-i18n-bridge support Vue 2.x only",[it.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION]:"Must define \u2018i18n\u2019 option or custom block in Composition API with using local scope in Legacy API mode",[it.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]:"Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"},Ud=ae.makeSymbol("__transrateVNode"),Vd=ae.makeSymbol("__datetimeParts"),Hd=ae.makeSymbol("__numberParts"),Wd=ae.makeSymbol("__enableEmitter"),qd=ae.makeSymbol("__disableEmitter"),mA=ae.makeSymbol("__setPluralRules");ae.makeSymbol("__intlifyMeta");const gA=ae.makeSymbol("__injectWithOption"),K2="__VUE_I18N_BRIDGE__";function Yd(e){if(!ae.isObject(e))return e;for(const t in e)if(!!ae.hasOwn(e,t))if(!t.includes("."))ae.isObject(e[t])&&Yd(e[t]);else{const n=t.split("."),r=n.length-1;let a=e;for(let o=0;o<r;o++)n[o]in a||(a[n[o]]={}),a=a[n[o]];a[n[r]]=e[t],delete e[t],ae.isObject(a[n[r]])&&Yd(a[n[r]])}return e}function Hc(e,t){const{messages:n,__i18n:r,messageResolver:a,flatJson:o}=t,i=ae.isPlainObject(n)?n:ae.isArray(r)?{}:{[e]:{}};if(ae.isArray(r)&&r.forEach(l=>{if("locale"in l&&"resource"in l){const{locale:s,resource:c}=l;s?(i[s]=i[s]||{},us(c,i[s])):us(c,i)}else ae.isString(l)&&us(JSON.parse(l),i)}),a==null&&o)for(const l in i)ae.hasOwn(i,l)&&Yd(i[l]);return i}const fl=e=>!ae.isObject(e)||ae.isArray(e);function us(e,t){if(fl(e)||fl(t))throw Dt(it.INVALID_VALUE);for(const n in e)ae.hasOwn(e,n)&&(fl(e[n])||fl(t[n])?t[n]=e[n]:us(e[n],t[n]))}function vA(e){return e.type}function yA(e,t,n){let r=ae.isObject(t.messages)?t.messages:{};"__i18nGlobal"in n&&(r=Hc(e.locale.value,{messages:r,__i18n:n.__i18nGlobal}));const a=Object.keys(r);a.length&&a.forEach(o=>{e.mergeLocaleMessage(o,r[o])});{if(ae.isObject(t.datetimeFormats)){const o=Object.keys(t.datetimeFormats);o.length&&o.forEach(i=>{e.mergeDateTimeFormat(i,t.datetimeFormats[i])})}if(ae.isObject(t.numberFormats)){const o=Object.keys(t.numberFormats);o.length&&o.forEach(i=>{e.mergeNumberFormat(i,t.numberFormats[i])})}}}function Xm(e){return et.createVNode(et.Text,null,e,0)}const Zm="__INTLIFY_META__";let Jm=0;function eg(e){return(t,n,r,a)=>e(n,r,et.getCurrentInstance()||void 0,a)}const Q2=()=>{const e=et.getCurrentInstance();let t=null;return e&&(t=vA(e)[Zm])?{[Zm]:t}:null};function Sp(e={},t){const{__root:n}=e,r=n===void 0;let a=ae.isBoolean(e.inheritLocale)?e.inheritLocale:!0;const o=et.ref(n&&a?n.locale.value:ae.isString(e.locale)?e.locale:qe.DEFAULT_LOCALE),i=et.ref(n&&a?n.fallbackLocale.value:ae.isString(e.fallbackLocale)||ae.isArray(e.fallbackLocale)||ae.isPlainObject(e.fallbackLocale)||e.fallbackLocale===!1?e.fallbackLocale:o.value),l=et.ref(Hc(o.value,e)),s=et.ref(ae.isPlainObject(e.datetimeFormats)?e.datetimeFormats:{[o.value]:{}}),c=et.ref(ae.isPlainObject(e.numberFormats)?e.numberFormats:{[o.value]:{}});let u=n?n.missingWarn:ae.isBoolean(e.missingWarn)||ae.isRegExp(e.missingWarn)?e.missingWarn:!0,f=n?n.fallbackWarn:ae.isBoolean(e.fallbackWarn)||ae.isRegExp(e.fallbackWarn)?e.fallbackWarn:!0,d=n?n.fallbackRoot:ae.isBoolean(e.fallbackRoot)?e.fallbackRoot:!0,m=!!e.fallbackFormat,y=ae.isFunction(e.missing)?e.missing:null,g=ae.isFunction(e.missing)?eg(e.missing):null,A=ae.isFunction(e.postTranslation)?e.postTranslation:null,h=n?n.warnHtmlMessage:ae.isBoolean(e.warnHtmlMessage)?e.warnHtmlMessage:!0,p=!!e.escapeParameter;const b=n?n.modifiers:ae.isPlainObject(e.modifiers)?e.modifiers:{};let v=e.pluralRules||n&&n.pluralRules,x;x=(()=>{r&&qe.setFallbackContext(null);const Z={version:fA,locale:o.value,fallbackLocale:i.value,messages:l.value,modifiers:b,pluralRules:v,missing:g===null?void 0:g,missingWarn:u,fallbackWarn:f,fallbackFormat:m,unresolving:!0,postTranslation:A===null?void 0:A,warnHtmlMessage:h,escapeParameter:p,messageResolver:e.messageResolver,__meta:{framework:"vue"}};Z.datetimeFormats=s.value,Z.numberFormats=c.value,Z.__datetimeFormatters=ae.isPlainObject(x)?x.__datetimeFormatters:void 0,Z.__numberFormatters=ae.isPlainObject(x)?x.__numberFormatters:void 0,Z.__v_emitter=ae.isPlainObject(x)?x.__v_emitter:void 0;const se=qe.createCoreContext(Z);return r&&qe.setFallbackContext(se),se})(),qe.updateFallbackLocale(x,o.value,i.value);function S(){return[o.value,i.value,l.value,s.value,c.value]}const k=et.computed({get:()=>o.value,set:Z=>{o.value=Z,x.locale=o.value}}),$=et.computed({get:()=>i.value,set:Z=>{i.value=Z,x.fallbackLocale=i.value,qe.updateFallbackLocale(x,o.value,Z)}}),R=et.computed(()=>l.value),D=et.computed(()=>s.value),j=et.computed(()=>c.value);function M(){return ae.isFunction(A)?A:null}function N(Z){A=Z,x.postTranslation=Z}function F(){return y}function z(Z){Z!==null&&(g=eg(Z)),y=Z,x.missing=g}function X(Z,se){return Z!=="translate"||!se.resolvedMessage}const Y=(Z,se,De,Le,Ze,nt)=>{S();let bt;try{qe.setAdditionalMeta(Q2()),r||(x.fallbackContext=n?qe.getFallbackContext():void 0),bt=Z(x)}finally{qe.setAdditionalMeta(null),r||(x.fallbackContext=void 0)}if(ae.isNumber(bt)&&bt===qe.NOT_REOSLVED){const[Bt,cr]=se();if(n&&ae.isString(Bt)&&X(De,cr)){d&&(qe.isTranslateFallbackWarn(f,Bt)||qe.isTranslateMissingWarn(u,Bt))&&ae.warn(Zn(Vt.FALLBACK_TO_ROOT,{key:Bt,type:De}));{const{__v_emitter:ja}=x;ja&&d&&ja.emit("fallback",{type:De,key:Bt,to:"global",groupId:`${De}:${Bt}`})}}return n&&d?Le(n):Ze(Bt)}else{if(nt(bt))return bt;throw Dt(it.UNEXPECTED_RETURN_TYPE)}};function le(...Z){return Y(se=>Reflect.apply(qe.translate,null,[se,...Z]),()=>qe.parseTranslateArgs(...Z),"translate",se=>Reflect.apply(se.t,se,[...Z]),se=>se,se=>ae.isString(se))}function Q(...Z){const[se,De,Le]=Z;if(Le&&!ae.isObject(Le))throw Dt(it.INVALID_ARGUMENT);return le(se,De,ae.assign({resolvedMessage:!0},Le||{}))}function ie(...Z){return Y(se=>Reflect.apply(qe.datetime,null,[se,...Z]),()=>qe.parseDateTimeArgs(...Z),"datetime format",se=>Reflect.apply(se.d,se,[...Z]),()=>qe.MISSING_RESOLVE_VALUE,se=>ae.isString(se))}function ne(...Z){return Y(se=>Reflect.apply(qe.number,null,[se,...Z]),()=>qe.parseNumberArgs(...Z),"number format",se=>Reflect.apply(se.n,se,[...Z]),()=>qe.MISSING_RESOLVE_VALUE,se=>ae.isString(se))}function fe(Z){return Z.map(se=>ae.isString(se)||ae.isNumber(se)||ae.isBoolean(se)?Xm(String(se)):se)}const K={normalize:fe,interpolate:Z=>Z,type:"vnode"};function W(...Z){return Y(se=>{let De;const Le=se;try{Le.processor=K,De=Reflect.apply(qe.translate,null,[Le,...Z])}finally{Le.processor=null}return De},()=>qe.parseTranslateArgs(...Z),"translate",se=>se[Ud](...Z),se=>[Xm(se)],se=>ae.isArray(se))}function te(...Z){return Y(se=>Reflect.apply(qe.number,null,[se,...Z]),()=>qe.parseNumberArgs(...Z),"number format",se=>se[Hd](...Z),()=>[],se=>ae.isString(se)||ae.isArray(se))}function pe(...Z){return Y(se=>Reflect.apply(qe.datetime,null,[se,...Z]),()=>qe.parseDateTimeArgs(...Z),"datetime format",se=>se[Vd](...Z),()=>[],se=>ae.isString(se)||ae.isArray(se))}function _e(Z){v=Z,x.pluralRules=v}function Be(Z,se){const De=ae.isString(se)?se:o.value,Le=T(De);return x.messageResolver(Le,Z)!==null}function Ne(Z){let se=null;const De=qe.fallbackWithLocaleChain(x,i.value,o.value);for(let Le=0;Le<De.length;Le++){const Ze=l.value[De[Le]]||{},nt=x.messageResolver(Ze,Z);if(nt!=null){se=nt;break}}return se}function U(Z){const se=Ne(Z);return se!=null?se:n?n.tm(Z)||{}:{}}function T(Z){return l.value[Z]||{}}function B(Z,se){l.value[Z]=se,x.messages=l.value}function H(Z,se){l.value[Z]=l.value[Z]||{},us(se,l.value[Z]),x.messages=l.value}function J(Z){return s.value[Z]||{}}function de(Z,se){s.value[Z]=se,x.datetimeFormats=s.value,qe.clearDateTimeFormat(x,Z,se)}function me(Z,se){s.value[Z]=ae.assign(s.value[Z]||{},se),x.datetimeFormats=s.value,qe.clearDateTimeFormat(x,Z,se)}function Ae(Z){return c.value[Z]||{}}function xe(Z,se){c.value[Z]=se,x.numberFormats=c.value,qe.clearNumberFormat(x,Z,se)}function be(Z,se){c.value[Z]=ae.assign(c.value[Z]||{},se),x.numberFormats=c.value,qe.clearNumberFormat(x,Z,se)}Jm++,n&&ae.inBrowser&&(et.watch(n.locale,Z=>{a&&(o.value=Z,x.locale=Z,qe.updateFallbackLocale(x,o.value,i.value))}),et.watch(n.fallbackLocale,Z=>{a&&(i.value=Z,x.fallbackLocale=Z,qe.updateFallbackLocale(x,o.value,i.value))}));const Te={id:Jm,locale:k,fallbackLocale:$,get inheritLocale(){return a},set inheritLocale(Z){a=Z,Z&&n&&(o.value=n.locale.value,i.value=n.fallbackLocale.value,qe.updateFallbackLocale(x,o.value,i.value))},get availableLocales(){return Object.keys(l.value).sort()},messages:R,get modifiers(){return b},get pluralRules(){return v||{}},get isGlobal(){return r},get missingWarn(){return u},set missingWarn(Z){u=Z,x.missingWarn=u},get fallbackWarn(){return f},set fallbackWarn(Z){f=Z,x.fallbackWarn=f},get fallbackRoot(){return d},set fallbackRoot(Z){d=Z},get fallbackFormat(){return m},set fallbackFormat(Z){m=Z,x.fallbackFormat=m},get warnHtmlMessage(){return h},set warnHtmlMessage(Z){h=Z,x.warnHtmlMessage=Z},get escapeParameter(){return p},set escapeParameter(Z){p=Z,x.escapeParameter=Z},t:le,getLocaleMessage:T,setLocaleMessage:B,mergeLocaleMessage:H,getPostTranslationHandler:M,setPostTranslationHandler:N,getMissingHandler:F,setMissingHandler:z,[mA]:_e};return Te.datetimeFormats=D,Te.numberFormats=j,Te.rt=Q,Te.te=Be,Te.tm=U,Te.d=ie,Te.n=ne,Te.getDateTimeFormat=J,Te.setDateTimeFormat=de,Te.mergeDateTimeFormat=me,Te.getNumberFormat=Ae,Te.setNumberFormat=xe,Te.mergeNumberFormat=be,Te[gA]=e.__injectWithOption,Te[Ud]=W,Te[Vd]=pe,Te[Hd]=te,Te[Wd]=Z=>{x.__v_emitter=Z},Te[qd]=()=>{x.__v_emitter=void 0},Te}function X2(e){const t=ae.isString(e.locale)?e.locale:qe.DEFAULT_LOCALE,n=ae.isString(e.fallbackLocale)||ae.isArray(e.fallbackLocale)||ae.isPlainObject(e.fallbackLocale)||e.fallbackLocale===!1?e.fallbackLocale:t,r=ae.isFunction(e.missing)?e.missing:void 0,a=ae.isBoolean(e.silentTranslationWarn)||ae.isRegExp(e.silentTranslationWarn)?!e.silentTranslationWarn:!0,o=ae.isBoolean(e.silentFallbackWarn)||ae.isRegExp(e.silentFallbackWarn)?!e.silentFallbackWarn:!0,i=ae.isBoolean(e.fallbackRoot)?e.fallbackRoot:!0,l=!!e.formatFallbackMessages,s=ae.isPlainObject(e.modifiers)?e.modifiers:{},c=e.pluralizationRules,u=ae.isFunction(e.postTranslation)?e.postTranslation:void 0,f=ae.isString(e.warnHtmlInMessage)?e.warnHtmlInMessage!=="off":!0,d=!!e.escapeParameterHtml,m=ae.isBoolean(e.sync)?e.sync:!0;e.formatter&&ae.warn(Zn(Vt.NOT_SUPPORTED_FORMATTER)),e.preserveDirectiveContent&&ae.warn(Zn(Vt.NOT_SUPPORTED_PRESERVE_DIRECTIVE));let y=e.messages;if(ae.isPlainObject(e.sharedMessages)){const x=e.sharedMessages;y=Object.keys(x).reduce((S,k)=>{const $=S[k]||(S[k]={});return ae.assign($,x[k]),S},y||{})}const{__i18n:g,__root:A,__injectWithOption:h}=e,p=e.datetimeFormats,b=e.numberFormats,v=e.flatJson;return{locale:t,fallbackLocale:n,messages:y,flatJson:v,datetimeFormats:p,numberFormats:b,missing:r,missingWarn:a,fallbackWarn:o,fallbackRoot:i,fallbackFormat:l,modifiers:s,pluralRules:c,postTranslation:u,warnHtmlMessage:f,escapeParameter:d,messageResolver:e.messageResolver,inheritLocale:m,__i18n:g,__root:A,__injectWithOption:h}}function Gd(e={},t){{const n=Sp(X2(e)),r={id:n.id,get locale(){return n.locale.value},set locale(a){n.locale.value=a},get fallbackLocale(){return n.fallbackLocale.value},set fallbackLocale(a){n.fallbackLocale.value=a},get messages(){return n.messages.value},get datetimeFormats(){return n.datetimeFormats.value},get numberFormats(){return n.numberFormats.value},get availableLocales(){return n.availableLocales},get formatter(){return ae.warn(Zn(Vt.NOT_SUPPORTED_FORMATTER)),{interpolate(){return[]}}},set formatter(a){ae.warn(Zn(Vt.NOT_SUPPORTED_FORMATTER))},get missing(){return n.getMissingHandler()},set missing(a){n.setMissingHandler(a)},get silentTranslationWarn(){return ae.isBoolean(n.missingWarn)?!n.missingWarn:n.missingWarn},set silentTranslationWarn(a){n.missingWarn=ae.isBoolean(a)?!a:a},get silentFallbackWarn(){return ae.isBoolean(n.fallbackWarn)?!n.fallbackWarn:n.fallbackWarn},set silentFallbackWarn(a){n.fallbackWarn=ae.isBoolean(a)?!a:a},get modifiers(){return n.modifiers},get formatFallbackMessages(){return n.fallbackFormat},set formatFallbackMessages(a){n.fallbackFormat=a},get postTranslation(){return n.getPostTranslationHandler()},set postTranslation(a){n.setPostTranslationHandler(a)},get sync(){return n.inheritLocale},set sync(a){n.inheritLocale=a},get warnHtmlInMessage(){return n.warnHtmlMessage?"warn":"off"},set warnHtmlInMessage(a){n.warnHtmlMessage=a!=="off"},get escapeParameterHtml(){return n.escapeParameter},set escapeParameterHtml(a){n.escapeParameter=a},get preserveDirectiveContent(){return ae.warn(Zn(Vt.NOT_SUPPORTED_PRESERVE_DIRECTIVE)),!0},set preserveDirectiveContent(a){ae.warn(Zn(Vt.NOT_SUPPORTED_PRESERVE_DIRECTIVE))},get pluralizationRules(){return n.pluralRules||{}},__composer:n,t(...a){const[o,i,l]=a,s={};let c=null,u=null;if(!ae.isString(o))throw Dt(it.INVALID_ARGUMENT);const f=o;return ae.isString(i)?s.locale=i:ae.isArray(i)?c=i:ae.isPlainObject(i)&&(u=i),ae.isArray(l)?c=l:ae.isPlainObject(l)&&(u=l),Reflect.apply(n.t,n,[f,c||u||{},s])},rt(...a){return Reflect.apply(n.rt,n,[...a])},tc(...a){const[o,i,l]=a,s={plural:1};let c=null,u=null;if(!ae.isString(o))throw Dt(it.INVALID_ARGUMENT);const f=o;return ae.isString(i)?s.locale=i:ae.isNumber(i)?s.plural=i:ae.isArray(i)?c=i:ae.isPlainObject(i)&&(u=i),ae.isString(l)?s.locale=l:ae.isArray(l)?c=l:ae.isPlainObject(l)&&(u=l),Reflect.apply(n.t,n,[f,c||u||{},s])},te(a,o){return n.te(a,o)},tm(a){return n.tm(a)},getLocaleMessage(a){return n.getLocaleMessage(a)},setLocaleMessage(a,o){n.setLocaleMessage(a,o)},mergeLocaleMessage(a,o){n.mergeLocaleMessage(a,o)},d(...a){return Reflect.apply(n.d,n,[...a])},getDateTimeFormat(a){return n.getDateTimeFormat(a)},setDateTimeFormat(a,o){n.setDateTimeFormat(a,o)},mergeDateTimeFormat(a,o){n.mergeDateTimeFormat(a,o)},n(...a){return Reflect.apply(n.n,n,[...a])},getNumberFormat(a){return n.getNumberFormat(a)},setNumberFormat(a,o){n.setNumberFormat(a,o)},mergeNumberFormat(a,o){n.mergeNumberFormat(a,o)},getChoiceIndex(a,o){return ae.warn(Zn(Vt.NOT_SUPPORTED_GET_CHOICE_INDEX)),-1},__onComponentInstanceCreated(a){const{componentInstanceCreatedListener:o}=e;o&&o(a,r)}};return r.__enableEmitter=a=>{const o=n;o[Wd]&&o[Wd](a)},r.__disableEmitter=()=>{const a=n;a[qd]&&a[qd]()},r}}const kp={tag:{type:[String,Object]},locale:{type:String},scope:{type:String,validator:e=>e==="parent"||e==="global",default:"parent"},i18n:{type:Object}};function Z2({slots:e},t){return t.length===1&&t[0]==="default"?(e.default?e.default():[]).reduce((r,a)=>r=[...r,...ae.isArray(a.children)?a.children:[a]],[]):t.reduce((n,r)=>{const a=e[r];return a&&(n[r]=a()),n},{})}function AA(e){return et.Fragment}const Dl={name:"i18n-t",props:ae.assign({keypath:{type:String,required:!0},plural:{type:[Number,String],validator:e=>ae.isNumber(e)||!isNaN(e)}},kp),setup(e,t){const{slots:n,attrs:r}=t,a=e.i18n||Wc({useScope:e.scope,__useComponent:!0});return()=>{const o=Object.keys(n).filter(f=>f!=="_"),i={};e.locale&&(i.locale=e.locale),e.plural!==void 0&&(i.plural=ae.isString(e.plural)?+e.plural:e.plural);const l=Z2(t,o),s=a[Ud](e.keypath,l,i),c=ae.assign({},r),u=ae.isString(e.tag)||ae.isObject(e.tag)?e.tag:AA();return et.h(u,c,s)}}};function J2(e){return ae.isArray(e)&&!ae.isString(e[0])}function bA(e,t,n,r){const{slots:a,attrs:o}=t;return()=>{const i={part:!0};let l={};e.locale&&(i.locale=e.locale),ae.isString(e.format)?i.key=e.format:ae.isObject(e.format)&&(ae.isString(e.format.key)&&(i.key=e.format.key),l=Object.keys(e.format).reduce((d,m)=>n.includes(m)?ae.assign({},d,{[m]:e.format[m]}):d,{}));const s=r(e.value,i,l);let c=[i.key];ae.isArray(s)?c=s.map((d,m)=>{const y=a[d.type],g=y?y({[d.type]:d.value,index:m,parts:s}):[d.value];return J2(g)&&(g[0].key=`${d.type}-${m}`),g}):ae.isString(s)&&(c=[s]);const u=ae.assign({},o),f=ae.isString(e.tag)||ae.isObject(e.tag)?e.tag:AA();return et.h(f,u,c)}}const Kd={name:"i18n-n",props:ae.assign({value:{type:Number,required:!0},format:{type:[String,Object]}},kp),setup(e,t){const n=e.i18n||Wc({useScope:"parent",__useComponent:!0});return bA(e,t,qe.NUMBER_FORMAT_OPTIONS_KEYS,(...r)=>n[Hd](...r))}},Qd={name:"i18n-d",props:ae.assign({value:{type:[Number,Date],required:!0},format:{type:[String,Object]}},kp),setup(e,t){const n=e.i18n||Wc({useScope:"parent",__useComponent:!0});return bA(e,t,qe.DATETIME_FORMAT_OPTIONS_KEYS,(...r)=>n[Vd](...r))}};function eT(e,t){const n=e;if(e.mode==="composition")return n.__getInstance(t)||e.global;{const r=n.__getInstance(t);return r!=null?r.__composer:e.global.__composer}}function EA(e){const t=i=>{const{instance:l,modifiers:s,value:c}=i;if(!l||!l.$)throw Dt(it.UNEXPECTED_ERROR);const u=eT(e,l.$);s.preserve&&ae.warn(Zn(Vt.NOT_SUPPORTED_PRESERVE));const f=tg(c);return[Reflect.apply(u.t,u,[...ng(f)]),u]};return{created:(i,l)=>{const[s,c]=t(l);ae.inBrowser&&e.global===c&&(i.__i18nWatcher=et.watch(c.locale,()=>{l.instance&&l.instance.$forceUpdate()})),i.__composer=c,i.textContent=s},unmounted:i=>{ae.inBrowser&&i.__i18nWatcher&&(i.__i18nWatcher(),i.__i18nWatcher=void 0,delete i.__i18nWatcher),i.__composer&&(i.__composer=void 0,delete i.__composer)},beforeUpdate:(i,{value:l})=>{if(i.__composer){const s=i.__composer,c=tg(l);i.textContent=Reflect.apply(s.t,s,[...ng(c)])}},getSSRProps:i=>{const[l]=t(i);return{textContent:l}}}}function tg(e){if(ae.isString(e))return{path:e};if(ae.isPlainObject(e)){if(!("path"in e))throw Dt(it.REQUIRED_VALUE,"path");return e}else throw Dt(it.INVALID_VALUE)}function ng(e){const{path:t,locale:n,args:r,choice:a,plural:o}=e,i={},l=r||{};return ae.isString(n)&&(i.locale=n),ae.isNumber(a)&&(i.plural=a),ae.isNumber(o)&&(i.plural=o),[t,l,i]}function tT(e,t,...n){const r=ae.isPlainObject(n[0])?n[0]:{},a=!!r.useI18nComponentName,o=ae.isBoolean(r.globalInstall)?r.globalInstall:!0;o&&a&&ae.warn(Zn(Vt.COMPONENT_NAME_LEGACY_COMPATIBLE,{name:Dl.name})),o&&(e.component(a?"i18n":Dl.name,Dl),e.component(Kd.name,Kd),e.component(Qd.name,Qd)),e.directive("t",EA(t))}function nT(e,t,n){return{beforeCreate(){const r=et.getCurrentInstance();if(!r)throw Dt(it.UNEXPECTED_ERROR);const a=this.$options;if(a.i18n){const o=a.i18n;a.__i18n&&(o.__i18n=a.__i18n),o.__root=t,this===this.$root?this.$i18n=rg(e,o):(o.__injectWithOption=!0,this.$i18n=Gd(o))}else a.__i18n?this===this.$root?this.$i18n=rg(e,a):this.$i18n=Gd({__i18n:a.__i18n,__injectWithOption:!0,__root:t}):this.$i18n=e;a.__i18nGlobal&&yA(t,a,a),e.__onComponentInstanceCreated(this.$i18n),n.__setInstance(r,this.$i18n),this.$t=(...o)=>this.$i18n.t(...o),this.$rt=(...o)=>this.$i18n.rt(...o),this.$tc=(...o)=>this.$i18n.tc(...o),this.$te=(o,i)=>this.$i18n.te(o,i),this.$d=(...o)=>this.$i18n.d(...o),this.$n=(...o)=>this.$i18n.n(...o),this.$tm=o=>this.$i18n.tm(o)},mounted(){},unmounted(){const r=et.getCurrentInstance();if(!r)throw Dt(it.UNEXPECTED_ERROR);delete this.$t,delete this.$rt,delete this.$tc,delete this.$te,delete this.$d,delete this.$n,delete this.$tm,n.__deleteInstance(r),delete this.$i18n}}}function rg(e,t){e.locale=t.locale||e.locale,e.fallbackLocale=t.fallbackLocale||e.fallbackLocale,e.missing=t.missing||e.missing,e.silentTranslationWarn=t.silentTranslationWarn||e.silentFallbackWarn,e.silentFallbackWarn=t.silentFallbackWarn||e.silentFallbackWarn,e.formatFallbackMessages=t.formatFallbackMessages||e.formatFallbackMessages,e.postTranslation=t.postTranslation||e.postTranslation,e.warnHtmlInMessage=t.warnHtmlInMessage||e.warnHtmlInMessage,e.escapeParameterHtml=t.escapeParameterHtml||e.escapeParameterHtml,e.sync=t.sync||e.sync,e.__composer[mA](t.pluralizationRules||e.pluralizationRules);const n=Hc(e.locale,{messages:t.messages,__i18n:t.__i18n});return Object.keys(n).forEach(r=>e.mergeLocaleMessage(r,n[r])),t.datetimeFormats&&Object.keys(t.datetimeFormats).forEach(r=>e.mergeDateTimeFormat(r,t.datetimeFormats[r])),t.numberFormats&&Object.keys(t.numberFormats).forEach(r=>e.mergeNumberFormat(r,t.numberFormats[r])),e}const xA=ae.makeSymbol("global-vue-i18n");function rT(e={},t){const n=ae.isBoolean(e.legacy)?e.legacy:!0,r=ae.isBoolean(e.globalInjection)?e.globalInjection:!0,a=n?!!e.allowComposition:!0,o=new Map,[i,l]=oT(e,n),s=ae.makeSymbol("vue-i18n");function c(d){return o.get(d)||null}function u(d,m){o.set(d,m)}function f(d){o.delete(d)}{const d={get mode(){return n?"legacy":"composition"},get allowComposition(){return a},async install(m,...y){m.__VUE_I18N_SYMBOL__=s,m.provide(m.__VUE_I18N_SYMBOL__,d),!n&&r&&hT(m,d.global),tT(m,d,...y),n&&m.mixin(nT(l,l.__composer,d));const g=m.unmount;m.unmount=()=>{d.dispose(),g()}},get global(){return l},dispose(){i.stop()},__instances:o,__getInstance:c,__setInstance:u,__deleteInstance:f};return d}}function Wc(e={}){const t=et.getCurrentInstance();if(t==null)throw Dt(it.MUST_BE_CALL_SETUP_TOP);if(!t.isCE&&t.appContext.app!=null&&!t.appContext.app.__VUE_I18N_SYMBOL__)throw Dt(it.NOT_INSLALLED);const n=iT(t),r=lT(n),a=vA(t),o=sT(e,a);if(n.mode==="legacy"&&!e.__useComponent){if(!n.allowComposition)throw Dt(it.NOT_AVAILABLE_IN_LEGACY_MODE);return dT(t,o,r,e)}if(o==="global")return yA(r,e,a),r;if(o==="parent"){let s=cT(n,t,e.__useComponent);return s==null&&(ae.warn(Zn(Vt.NOT_FOUND_PARENT_SCOPE)),s=r),s}const i=n;let l=i.__getInstance(t);if(l==null){const s=ae.assign({},e);"__i18n"in a&&(s.__i18n=a.__i18n),r&&(s.__root=r),l=Sp(s),uT(i,t),i.__setInstance(t,l)}return l}const aT=e=>{if(!(K2 in e))throw Dt(it.NOT_COMPATIBLE_LEGACY_VUE_I18N);return e};function oT(e,t,n){const r=et.effectScope();{const a=t?r.run(()=>Gd(e)):r.run(()=>Sp(e));if(a==null)throw Dt(it.UNEXPECTED_ERROR);return[r,a]}}function iT(e){{const t=et.inject(e.isCE?xA:e.appContext.app.__VUE_I18N_SYMBOL__);if(!t)throw Dt(e.isCE?it.NOT_INSLALLED_WITH_PROVIDE:it.UNEXPECTED_ERROR);return t}}function sT(e,t){return ae.isEmptyObject(e)?"__i18n"in t?"local":"global":e.useScope?e.useScope:"local"}function lT(e){return e.mode==="composition"?e.global:e.global.__composer}function cT(e,t,n=!1){let r=null;const a=t.root;let o=t.parent;for(;o!=null;){const i=e;if(e.mode==="composition")r=i.__getInstance(o);else{const l=i.__getInstance(o);l!=null&&(r=l.__composer,n&&r&&!r[gA]&&(r=null))}if(r!=null||a===o)break;o=o.parent}return r}function uT(e,t,n){et.onMounted(()=>{},t),et.onUnmounted(()=>{e.__deleteInstance(t)},t)}function dT(e,t,n,r={}){const a=t==="local",o=et.shallowRef(null);if(a&&e.proxy&&!(e.proxy.$options.i18n||e.proxy.$options.__i18n))throw Dt(it.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);const i=ae.isBoolean(r.inheritLocale)?r.inheritLocale:!0,l=et.ref(a&&i?n.locale.value:ae.isString(r.locale)?r.locale:qe.DEFAULT_LOCALE),s=et.ref(a&&i?n.fallbackLocale.value:ae.isString(r.fallbackLocale)||ae.isArray(r.fallbackLocale)||ae.isPlainObject(r.fallbackLocale)||r.fallbackLocale===!1?r.fallbackLocale:l.value),c=et.ref(Hc(l.value,r)),u=et.ref(ae.isPlainObject(r.datetimeFormats)?r.datetimeFormats:{[l.value]:{}}),f=et.ref(ae.isPlainObject(r.numberFormats)?r.numberFormats:{[l.value]:{}}),d=a?n.missingWarn:ae.isBoolean(r.missingWarn)||ae.isRegExp(r.missingWarn)?r.missingWarn:!0,m=a?n.fallbackWarn:ae.isBoolean(r.fallbackWarn)||ae.isRegExp(r.fallbackWarn)?r.fallbackWarn:!0,y=a?n.fallbackRoot:ae.isBoolean(r.fallbackRoot)?r.fallbackRoot:!0,g=!!r.fallbackFormat,A=ae.isFunction(r.missing)?r.missing:null,h=ae.isFunction(r.postTranslation)?r.postTranslation:null,p=a?n.warnHtmlMessage:ae.isBoolean(r.warnHtmlMessage)?r.warnHtmlMessage:!0,b=!!r.escapeParameter,v=a?n.modifiers:ae.isPlainObject(r.modifiers)?r.modifiers:{},x=r.pluralRules||a&&n.pluralRules;function _(){return[l.value,s.value,c.value,u.value,f.value]}const S=et.computed({get:()=>o.value?o.value.locale.value:l.value,set:B=>{o.value&&(o.value.locale.value=B),l.value=B}}),k=et.computed({get:()=>o.value?o.value.fallbackLocale.value:s.value,set:B=>{o.value&&(o.value.fallbackLocale.value=B),s.value=B}}),$=et.computed(()=>o.value?o.value.messages.value:c.value),R=et.computed(()=>u.value),D=et.computed(()=>f.value);function j(){return o.value?o.value.getPostTranslationHandler():h}function M(B){o.value&&o.value.setPostTranslationHandler(B)}function N(){return o.value?o.value.getMissingHandler():A}function F(B){o.value&&o.value.setMissingHandler(B)}function z(B){return _(),B()}function X(...B){return o.value?z(()=>Reflect.apply(o.value.t,null,[...B])):z(()=>"")}function Y(...B){return o.value?Reflect.apply(o.value.rt,null,[...B]):""}function le(...B){return o.value?z(()=>Reflect.apply(o.value.d,null,[...B])):z(()=>"")}function Q(...B){return o.value?z(()=>Reflect.apply(o.value.n,null,[...B])):z(()=>"")}function ie(B){return o.value?o.value.tm(B):{}}function ne(B,H){return o.value?o.value.te(B,H):!1}function fe(B){return o.value?o.value.getLocaleMessage(B):{}}function ee(B,H){o.value&&(o.value.setLocaleMessage(B,H),c.value[B]=H)}function K(B,H){o.value&&o.value.mergeLocaleMessage(B,H)}function W(B){return o.value?o.value.getDateTimeFormat(B):{}}function te(B,H){o.value&&(o.value.setDateTimeFormat(B,H),u.value[B]=H)}function pe(B,H){o.value&&o.value.mergeDateTimeFormat(B,H)}function _e(B){return o.value?o.value.getNumberFormat(B):{}}function Be(B,H){o.value&&(o.value.setNumberFormat(B,H),f.value[B]=H)}function Ne(B,H){o.value&&o.value.mergeNumberFormat(B,H)}const U={get id(){return o.value?o.value.id:-1},locale:S,fallbackLocale:k,messages:$,datetimeFormats:R,numberFormats:D,get inheritLocale(){return o.value?o.value.inheritLocale:i},set inheritLocale(B){o.value&&(o.value.inheritLocale=B)},get availableLocales(){return o.value?o.value.availableLocales:Object.keys(c.value)},get modifiers(){return o.value?o.value.modifiers:v},get pluralRules(){return o.value?o.value.pluralRules:x},get isGlobal(){return o.value?o.value.isGlobal:!1},get missingWarn(){return o.value?o.value.missingWarn:d},set missingWarn(B){o.value&&(o.value.missingWarn=B)},get fallbackWarn(){return o.value?o.value.fallbackWarn:m},set fallbackWarn(B){o.value&&(o.value.missingWarn=B)},get fallbackRoot(){return o.value?o.value.fallbackRoot:y},set fallbackRoot(B){o.value&&(o.value.fallbackRoot=B)},get fallbackFormat(){return o.value?o.value.fallbackFormat:g},set fallbackFormat(B){o.value&&(o.value.fallbackFormat=B)},get warnHtmlMessage(){return o.value?o.value.warnHtmlMessage:p},set warnHtmlMessage(B){o.value&&(o.value.warnHtmlMessage=B)},get escapeParameter(){return o.value?o.value.escapeParameter:b},set escapeParameter(B){o.value&&(o.value.escapeParameter=B)},t:X,getPostTranslationHandler:j,setPostTranslationHandler:M,getMissingHandler:N,setMissingHandler:F,rt:Y,d:le,n:Q,tm:ie,te:ne,getLocaleMessage:fe,setLocaleMessage:ee,mergeLocaleMessage:K,getDateTimeFormat:W,setDateTimeFormat:te,mergeDateTimeFormat:pe,getNumberFormat:_e,setNumberFormat:Be,mergeNumberFormat:Ne};function T(B){B.locale.value=l.value,B.fallbackLocale.value=s.value,Object.keys(c.value).forEach(H=>{B.mergeLocaleMessage(H,c.value[H])}),Object.keys(u.value).forEach(H=>{B.mergeDateTimeFormat(H,u.value[H])}),Object.keys(f.value).forEach(H=>{B.mergeNumberFormat(H,f.value[H])}),B.escapeParameter=b,B.fallbackFormat=g,B.fallbackRoot=y,B.fallbackWarn=m,B.missingWarn=d,B.warnHtmlMessage=p}return et.onBeforeMount(()=>{if(e.proxy==null||e.proxy.$i18n==null)throw Dt(it.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);const B=o.value=e.proxy.$i18n.__composer;t==="global"?(l.value=B.locale.value,s.value=B.fallbackLocale.value,c.value=B.messages.value,u.value=B.datetimeFormats.value,f.value=B.numberFormats.value):a&&T(B)}),U}const fT=["locale","fallbackLocale","availableLocales"],pT=["t","rt","d","n","tm"];function hT(e,t){const n=Object.create(null);fT.forEach(r=>{const a=Object.getOwnPropertyDescriptor(t,r);if(!a)throw Dt(it.UNEXPECTED_ERROR);const o=et.isRef(a.value)?{get(){return a.value.value},set(i){a.value.value=i}}:{get(){return a.get&&a.get()}};Object.defineProperty(n,r,o)}),e.config.globalProperties.$i18n=n,pT.forEach(r=>{const a=Object.getOwnPropertyDescriptor(t,r);if(!a||!a.value)throw Dt(it.UNEXPECTED_ERROR);Object.defineProperty(e.config.globalProperties,`$${r}`,a)})}qe.registerMessageCompiler(qe.compileToFunction);qe.registerMessageResolver(qe.resolveValue);qe.registerLocaleFallbacker(qe.fallbackWithLocaleChain);{const e=ae.getGlobalThis();e.__INTLIFY__=!0,qe.setDevToolsHook(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)}Sr.DatetimeFormat=Qd;Sr.I18nInjectionKey=xA;Sr.NumberFormat=Kd;Sr.Translation=Dl;Sr.VERSION=fA;Sr.castToVueI18n=aT;var mT=Sr.createI18n=rT,rn=Sr.useI18n=Wc;Sr.vTDirective=EA;const ut=e=>e!=null,mi=e=>typeof e=="function",Pn=e=>e!==null&&typeof e=="object",Tp=e=>Pn(e)&&mi(e.then)&&mi(e.catch),Xo=e=>Object.prototype.toString.call(e)==="[object Date]"&&!Number.isNaN(e.getTime());function CA(e){return e=e.replace(/[^-|\d]/g,""),/^((\+86)|(86))?(1)\d{10}$/.test(e)||/^0[0-9-]{10,13}$/.test(e)}const wA=e=>typeof e=="number"||/^\d+(\.\d+)?$/.test(e),gT=()=>La?/ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()):!1;function Xd(){}const Ue=Object.assign,La=typeof window<"u";function ag(e,t){const n=t.split(".");let r=e;return n.forEach(a=>{var o;r=Pn(r)&&(o=r[a])!=null?o:""}),r}function Ct(e,t,n){return t.reduce((r,a)=>((!n||e[a]!==void 0)&&(r[a]=e[a]),r),{})}const ec=e=>Array.isArray(e)?e:[e],St=null,we=[Number,String],ve={type:Boolean,default:!0},zt=e=>({type:e,required:!0}),qt=()=>({type:Array,default:()=>[]}),wr=e=>({type:Number,default:e}),$e=e=>({type:we,default:e}),Oe=e=>({type:String,default:e});var Pa=typeof window<"u";function An(e){return Pa?requestAnimationFrame(e):-1}function _A(e){Pa&&cancelAnimationFrame(e)}function ga(e){An(()=>An(e))}var vT=e=>e===window,og=(e,t)=>({top:0,left:0,right:e,bottom:t,width:e,height:t}),wt=e=>{const t=V(e);if(vT(t)){const n=t.innerWidth,r=t.innerHeight;return og(n,r)}return t!=null&&t.getBoundingClientRect?t.getBoundingClientRect():og(0,0)};function yT(e=!1){const t=re(e);return[t,(r=!t.value)=>{t.value=r}]}function cn(e){const t=Wt(e,null);if(t){const n=Gt(),{link:r,unlink:a,internalChildren:o}=t;r(n),Un(()=>a(n));const i=oe(()=>o.indexOf(n));return{parent:t,index:i}}return{parent:null,index:re(-1)}}function AT(e){const t=[],n=r=>{Array.isArray(r)&&r.forEach(a=>{var o;qr(a)&&(t.push(a),(o=a.component)!=null&&o.subTree&&(t.push(a.component.subTree),n(a.component.subTree.children)),a.children&&n(a.children))})};return n(e),t}function bT(e,t,n){const r=AT(e.subTree.children);n.sort((o,i)=>r.indexOf(o.vnode)-r.indexOf(i.vnode));const a=n.map(o=>o.proxy);t.sort((o,i)=>{const l=a.indexOf(o),s=a.indexOf(i);return l-s})}function hn(e){const t=He([]),n=He([]),r=Gt();return{children:t,linkChildren:o=>{Cr(e,Object.assign({link:s=>{s.proxy&&(n.push(s),t.push(s.proxy),bT(r,t,n))},unlink:s=>{const c=n.indexOf(s);t.splice(c,1),n.splice(c,1)},children:t,internalChildren:n},o))}}}var Zd=1e3,Jd=60*Zd,ef=60*Jd,ig=24*ef;function ET(e){const t=Math.floor(e/ig),n=Math.floor(e%ig/ef),r=Math.floor(e%ef/Jd),a=Math.floor(e%Jd/Zd),o=Math.floor(e%Zd);return{total:e,days:t,hours:n,minutes:r,seconds:a,milliseconds:o}}function xT(e,t){return Math.floor(e/1e3)===Math.floor(t/1e3)}function CT(e){let t,n,r,a;const o=re(e.time),i=oe(()=>ET(o.value)),l=()=>{r=!1,_A(t)},s=()=>Math.max(n-Date.now(),0),c=g=>{var A,h;o.value=g,(A=e.onChange)==null||A.call(e,i.value),g===0&&(l(),(h=e.onFinish)==null||h.call(e))},u=()=>{t=An(()=>{r&&(c(s()),o.value>0&&u())})},f=()=>{t=An(()=>{if(r){const g=s();(!xT(g,o.value)||g===0)&&c(g),o.value>0&&f()}})},d=()=>{!Pa||(e.millisecond?u():f())},m=()=>{r||(n=Date.now()+o.value,r=!0,d())},y=(g=e.time)=>{l(),o.value=g};return rr(l),yo(()=>{a&&(r=!0,a=!1,d())}),Oa(()=>{r&&(l(),a=!0)}),{start:m,pause:l,reset:y,current:i}}function Si(e){let t;Et(()=>{e(),Ke(()=>{t=!0})}),yo(()=>{t&&e()})}function jt(e,t,n={}){if(!Pa)return;const{target:r=window,passive:a=!1,capture:o=!1}=n;let i;const l=c=>{const u=V(c);u&&!i&&(u.addEventListener(e,t,{capture:o,passive:a}),i=!0)},s=c=>{const u=V(c);u&&i&&(u.removeEventListener(e,t,o),i=!1)};Un(()=>s(r)),Oa(()=>s(r)),Si(()=>l(r)),ct(r)&&Ie(r,(c,u)=>{s(u),l(c)})}function qc(e,t,n={}){if(!Pa)return;const{eventName:r="click"}=n;jt(r,o=>{(Array.isArray(e)?e:[e]).every(s=>{const c=V(s);return c&&!c.contains(o.target)})&&t(o)},{target:document})}var pl,Nu;function wT(){if(!pl&&(pl=re(0),Nu=re(0),Pa)){const e=()=>{pl.value=window.innerWidth,Nu.value=window.innerHeight};e(),window.addEventListener("resize",e,{passive:!0}),window.addEventListener("orientationchange",e,{passive:!0})}return{width:pl,height:Nu}}var _T=/scroll|auto|overlay/i,SA=Pa?window:void 0;function ST(e){return e.tagName!=="HTML"&&e.tagName!=="BODY"&&e.nodeType===1}function kA(e,t=SA){let n=e;for(;n&&n!==t&&ST(n);){const{overflowY:r}=window.getComputedStyle(n);if(_T.test(r))return n;n=n.parentNode}return t}function ki(e,t=SA){const n=re();return Et(()=>{e.value&&(n.value=kA(e.value,t))}),n}var hl;function kT(){if(!hl&&(hl=re("visible"),Pa)){const e=()=>{hl.value=document.hidden?"hidden":"visible"};e(),window.addEventListener("visibilitychange",e)}return hl}var TA=Symbol("van-field");function $a(e){const t=Wt(TA,null);t&&!t.customValue.value&&(t.customValue.value=e,Ie(e,()=>{t.resetValidation(),t.validateWithTrigger("onChange")}))}function Ia(e){const t="scrollTop"in e?e.scrollTop:e.pageYOffset;return Math.max(t,0)}function tc(e,t){"scrollTop"in e?e.scrollTop=t:e.scrollTo(e.scrollX,t)}function Vs(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}function Yc(e){tc(window,e),tc(document.body,e)}function sg(e,t){if(e===window)return 0;const n=t?Ia(t):Vs();return wt(e).top+n}const TT=gT();function IA(){TT&&Yc(Vs())}const Ip=e=>e.stopPropagation();function Lt(e,t){(typeof e.cancelable!="boolean"||e.cancelable)&&e.preventDefault(),t&&Ip(e)}function gi(e){const t=V(e);if(!t)return!1;const n=window.getComputedStyle(t),r=n.display==="none",a=t.offsetParent===null&&n.position!=="fixed";return r||a}const{width:Gc,height:vi}=wT();function ht(e){if(ut(e))return wA(e)?`${e}px`:String(e)}function Da(e){if(ut(e)){if(Array.isArray(e))return{width:ht(e[0]),height:ht(e[1])};const t=ht(e);return{width:t,height:t}}}function bo(e){const t={};return e!==void 0&&(t.zIndex=+e),t}let Fu;function IT(){if(!Fu){const e=document.documentElement,t=e.style.fontSize||window.getComputedStyle(e).fontSize;Fu=parseFloat(t)}return Fu}function OT(e){return e=e.replace(/rem/g,""),+e*IT()}function BT(e){return e=e.replace(/vw/g,""),+e*Gc.value/100}function LT(e){return e=e.replace(/vh/g,""),+e*vi.value/100}function Op(e){if(typeof e=="number")return e;if(La){if(e.includes("rem"))return OT(e);if(e.includes("vw"))return BT(e);if(e.includes("vh"))return LT(e)}return parseFloat(e)}const PT=/-(\w)/g,OA=e=>e.replace(PT,(t,n)=>n.toUpperCase()),$T=e=>e.replace(/([A-Z])/g,"-$1").toLowerCase().replace(/^-/,"");function Jt(e,t=2){let n=e+"";for(;n.length<t;)n="0"+n;return n}const en=(e,t,n)=>Math.min(Math.max(e,t),n);function lg(e,t,n){const r=e.indexOf(t);return r===-1?e:t==="-"&&r!==0?e.slice(0,r):e.slice(0,r+1)+e.slice(r).replace(n,"")}function tf(e,t=!0,n=!0){t?e=lg(e,".",/\./g):e=e.split(".")[0],n?e=lg(e,"-",/-/g):e=e.replace(/-/,"");const r=t?/[^-0-9.]/g:/[^-0-9]/g;return e.replace(r,"")}function BA(e,t){return Math.round((e+t)*1e10)/1e10}const{hasOwnProperty:DT}=Object.prototype;function RT(e,t,n){const r=t[n];!ut(r)||(!DT.call(e,n)||!Pn(r)?e[n]=r:e[n]=LA(Object(e[n]),r))}function LA(e,t){return Object.keys(t).forEach(n=>{RT(e,t,n)}),e}var PA={name:"\u59D3\u540D",tel:"\u7535\u8BDD",save:"\u4FDD\u5B58",confirm:"\u786E\u8BA4",cancel:"\u53D6\u6D88",delete:"\u5220\u9664",loading:"\u52A0\u8F7D\u4E2D...",noCoupon:"\u6682\u65E0\u4F18\u60E0\u5238",nameEmpty:"\u8BF7\u586B\u5199\u59D3\u540D",addContact:"\u6DFB\u52A0\u8054\u7CFB\u4EBA",telInvalid:"\u8BF7\u586B\u5199\u6B63\u786E\u7684\u7535\u8BDD",vanCalendar:{end:"\u7ED3\u675F",start:"\u5F00\u59CB",title:"\u65E5\u671F\u9009\u62E9",weekdays:["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"],monthTitle:(e,t)=>`${e}\u5E74${t}\u6708`,rangePrompt:e=>`\u6700\u591A\u9009\u62E9 ${e} \u5929`},vanCascader:{select:"\u8BF7\u9009\u62E9"},vanPagination:{prev:"\u4E0A\u4E00\u9875",next:"\u4E0B\u4E00\u9875"},vanPullRefresh:{pulling:"\u4E0B\u62C9\u5373\u53EF\u5237\u65B0...",loosing:"\u91CA\u653E\u5373\u53EF\u5237\u65B0..."},vanSubmitBar:{label:"\u5408\u8BA1:"},vanCoupon:{unlimited:"\u65E0\u95E8\u69DB",discount:e=>`${e}\u6298`,condition:e=>`\u6EE1${e}\u5143\u53EF\u7528`},vanCouponCell:{title:"\u4F18\u60E0\u5238",count:e=>`${e}\u5F20\u53EF\u7528`},vanCouponList:{exchange:"\u5151\u6362",close:"\u4E0D\u4F7F\u7528",enable:"\u53EF\u7528",disabled:"\u4E0D\u53EF\u7528",placeholder:"\u8F93\u5165\u4F18\u60E0\u7801"},vanAddressEdit:{area:"\u5730\u533A",postal:"\u90AE\u653F\u7F16\u7801",areaEmpty:"\u8BF7\u9009\u62E9\u5730\u533A",addressEmpty:"\u8BF7\u586B\u5199\u8BE6\u7EC6\u5730\u5740",postalEmpty:"\u90AE\u653F\u7F16\u7801\u4E0D\u6B63\u786E",addressDetail:"\u8BE6\u7EC6\u5730\u5740",defaultAddress:"\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u8D27\u5730\u5740"},vanAddressList:{add:"\u65B0\u589E\u5730\u5740"}};const cg=re("zh-CN"),ug=He({"zh-CN":PA}),$A={messages(){return ug[cg.value]},use(e,t){cg.value=e,this.add({[e]:t})},add(e={}){LA(ug,e)}};var MT=$A;function NT(e){const t=OA(e)+".";return(n,...r)=>{const a=MT.messages(),o=ag(a,t+n)||ag(a,n);return mi(o)?o(...r):o}}function nf(e,t){return t?typeof t=="string"?` ${e}--${t}`:Array.isArray(t)?t.reduce((n,r)=>n+nf(e,r),""):Object.keys(t).reduce((n,r)=>n+(t[r]?nf(e,r):""),""):""}function FT(e){return(t,n)=>(t&&typeof t!="string"&&(n=t,t=""),t=t?`${e}__${t}`:e,`${t}${nf(t,n)}`)}function Ee(e){const t=`van-${e}`;return[t,FT(t),NT(t)]}const Ra="van-hairline",DA=`${Ra}--top`,RA=`${Ra}--left`,Bp=`${Ra}--bottom`,ds=`${Ra}--surround`,Kc=`${Ra}--top-bottom`,zT=`${Ra}-unset--top-bottom`,bn="van-haptics-feedback",MA=Symbol("van-form");function Ma(e,{args:t=[],done:n,canceled:r}){if(e){const a=e.apply(null,t);Tp(a)?a.then(o=>{o?n():r&&r()}).catch(Xd):a?n():r&&r()}else n()}function Se(e){return e.install=t=>{const{name:n}=e;n&&(t.component(n,e),t.component(OA(`-${n}`),e))},e}const NA=Symbol();function Qc(e){const t=Wt(NA,null);t&&Ie(t,n=>{n&&e()})}const FA=(e,t)=>{const n=re(),r=()=>{n.value=wt(e).height};return Et(()=>{if(Ke(r),t)for(let a=1;a<=3;a++)setTimeout(r,100*a)}),Qc(()=>Ke(r)),n};function Xc(e,t){const n=FA(e,!0);return r=>C("div",{class:t("placeholder"),style:{height:n.value?`${n.value}px`:void 0}},[r()])}const[zA,dg]=Ee("action-bar"),Lp=Symbol(zA),jT={placeholder:Boolean,safeAreaInsetBottom:ve};var UT=ye({name:zA,props:jT,setup(e,{slots:t}){const n=re(),r=Xc(n,dg),{linkChildren:a}=hn(Lp);a();const o=()=>{var i;return C("div",{ref:n,class:[dg(),{"van-safe-area-bottom":e.safeAreaInsetBottom}]},[(i=t.default)==null?void 0:i.call(t)])};return()=>e.placeholder?r(o):o()}});const jA=Se(UT);function dt(e){const t=Gt();t&&Ue(t.proxy,e)}const Na={to:[String,Object],url:String,replace:Boolean};function UA({to:e,url:t,replace:n,$router:r}){e&&r?r[n?"replace":"push"](e):t&&(n?location.replace(t):location.href=t)}function Eo(){const e=Gt().proxy;return()=>UA(e)}const[VT,fg]=Ee("badge"),HT={dot:Boolean,max:we,tag:Oe("div"),color:String,offset:Array,content:we,showZero:ve,position:Oe("top-right")};var WT=ye({name:VT,props:HT,setup(e,{slots:t}){const n=()=>{if(t.content)return!0;const{content:i,showZero:l}=e;return ut(i)&&i!==""&&(l||i!==0&&i!=="0")},r=()=>{const{dot:i,max:l,content:s}=e;if(!i&&n())return t.content?t.content():ut(l)&&wA(s)&&+s>l?`${l}+`:s},a=oe(()=>{const i={background:e.color};if(e.offset){const[l,s]=e.offset;t.default?(i.top=ht(s),typeof l=="number"?i.right=ht(-l):i.right=l.startsWith("-")?l.replace("-",""):`-${l}`):(i.marginTop=ht(s),i.marginLeft=ht(l))}return i}),o=()=>{if(n()||e.dot)return C("div",{class:fg([e.position,{dot:e.dot,fixed:!!t.default}]),style:a.value},[r()])};return()=>{if(t.default){const{tag:i}=e;return C(i,{class:fg("wrapper")},{default:()=>[t.default(),o()]})}return o()}}});const xo=Se(WT);let VA=2e3;const qT=()=>++VA,YT=e=>{VA=e},[HA,GT]=Ee("config-provider"),WA=Symbol(HA),KT={tag:Oe("div"),zIndex:Number,themeVars:Object,iconPrefix:String};function QT(e){const t={};return Object.keys(e).forEach(n=>{t[`--van-${$T(n)}`]=e[n]}),t}var XT=ye({name:HA,props:KT,setup(e,{slots:t}){const n=oe(()=>{if(e.themeVars)return QT(e.themeVars)});return Cr(WA,e),Sc(()=>{e.zIndex!==void 0&&YT(e.zIndex)}),()=>C(e.tag,{class:GT(),style:n.value},{default:()=>{var r;return[(r=t.default)==null?void 0:r.call(t)]}})}});const[ZT,pg]=Ee("icon"),JT=e=>e==null?void 0:e.includes("/"),e5={dot:Boolean,tag:Oe("i"),name:String,size:we,badge:we,color:String,badgeProps:Object,classPrefix:String};var t5=ye({name:ZT,props:e5,setup(e,{slots:t}){const n=Wt(WA,null),r=oe(()=>e.classPrefix||(n==null?void 0:n.iconPrefix)||pg());return()=>{const{tag:a,dot:o,name:i,size:l,badge:s,color:c}=e,u=JT(i);return C(xo,at({dot:o,tag:a,class:[r.value,u?"":`${r.value}-${i}`],style:{color:c,fontSize:ht(l)},content:s},e.badgeProps),{default:()=>{var f;return[(f=t.default)==null?void 0:f.call(t),u&&C("img",{class:pg("image"),src:i},null)]}})}}});const tt=Se(t5),[n5,fs]=Ee("loading"),r5=Array(12).fill(null).map((e,t)=>C("i",{class:fs("line",String(t+1))},null)),a5=C("svg",{class:fs("circular"),viewBox:"25 25 50 50"},[C("circle",{cx:"50",cy:"50",r:"20",fill:"none"},null)]),o5={size:we,type:Oe("circular"),color:String,vertical:Boolean,textSize:we,textColor:String};var i5=ye({name:n5,props:o5,setup(e,{slots:t}){const n=oe(()=>Ue({color:e.color},Da(e.size))),r=()=>{var a;if(t.default)return C("span",{class:fs("text"),style:{fontSize:ht(e.textSize),color:(a=e.textColor)!=null?a:e.color}},[t.default()])};return()=>{const{type:a,vertical:o}=e;return C("div",{class:fs([a,{vertical:o}]),"aria-live":"polite","aria-busy":!0},[C("span",{class:fs("spinner",a),style:n.value},[a==="spinner"?r5:a5]),r()])}}});const or=Se(i5),[s5,To]=Ee("button"),l5=Ue({},Na,{tag:Oe("button"),text:String,icon:String,type:Oe("default"),size:Oe("normal"),color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,iconPrefix:String,nativeType:Oe("button"),loadingSize:we,loadingText:String,loadingType:String,iconPosition:Oe("left")});var c5=ye({name:s5,props:l5,emits:["click"],setup(e,{emit:t,slots:n}){const r=Eo(),a=()=>n.loading?n.loading():C(or,{size:e.loadingSize,type:e.loadingType,class:To("loading")},null),o=()=>{if(e.loading)return a();if(n.icon)return C("div",{class:To("icon")},[n.icon()]);if(e.icon)return C(tt,{name:e.icon,class:To("icon"),classPrefix:e.iconPrefix},null)},i=()=>{let c;if(e.loading?c=e.loadingText:c=n.default?n.default():e.text,c)return C("span",{class:To("text")},[c])},l=()=>{const{color:c,plain:u}=e;if(c){const f={color:u?c:"white"};return u||(f.background=c),c.includes("gradient")?f.border=0:f.borderColor=c,f}},s=c=>{e.loading?Lt(c):e.disabled||(t("click",c),r())};return()=>{const{tag:c,type:u,size:f,block:d,round:m,plain:y,square:g,loading:A,disabled:h,hairline:p,nativeType:b,iconPosition:v}=e,x=[To([u,f,{plain:y,block:d,round:m,square:g,loading:A,disabled:h,hairline:p}]),{[ds]:p}];return C(c,{type:b,class:x,style:l(),disabled:h,onClick:s},{default:()=>[C("div",{class:To("content")},[v==="left"&&o(),i(),v==="right"&&o()])]})}}});const En=Se(c5),[u5,d5]=Ee("action-bar-button"),f5=Ue({},Na,{type:String,text:String,icon:String,color:String,loading:Boolean,disabled:Boolean});var p5=ye({name:u5,props:f5,setup(e,{slots:t}){const n=Eo(),{parent:r,index:a}=cn(Lp),o=oe(()=>{if(r){const l=r.children[a.value-1];return!(l&&"isButton"in l)}}),i=oe(()=>{if(r){const l=r.children[a.value+1];return!(l&&"isButton"in l)}});return dt({isButton:!0}),()=>{const{type:l,icon:s,text:c,color:u,loading:f,disabled:d}=e;return C(En,{class:d5([l,{last:i.value,first:o.value}]),size:"large",type:l,icon:s,color:u,loading:f,disabled:d,onClick:n},{default:()=>[t.default?t.default():c]})}}});const rf=Se(p5),[h5,zu]=Ee("action-bar-icon"),m5=Ue({},Na,{dot:Boolean,text:String,icon:String,color:String,badge:we,iconClass:St,badgeProps:Object,iconPrefix:String});var g5=ye({name:h5,props:m5,setup(e,{slots:t}){const n=Eo();cn(Lp);const r=()=>{const{dot:a,badge:o,icon:i,color:l,iconClass:s,badgeProps:c,iconPrefix:u}=e;return t.icon?C(xo,at({dot:a,class:zu("icon"),content:o},c),{default:t.icon}):C(tt,{tag:"div",dot:a,name:i,badge:o,color:l,class:[zu("icon"),s],badgeProps:c,classPrefix:u},null)};return()=>C("div",{role:"button",class:zu(),tabindex:0,onClick:n},[r(),t.default?t.default():e.text])}});const v5=Se(g5),Ti={show:Boolean,zIndex:we,overlay:ve,duration:we,teleport:[String,Object],lockScroll:ve,lazyRender:ve,beforeClose:Function,overlayStyle:Object,overlayClass:St,transitionAppear:Boolean,closeOnClickOverlay:ve},Pp=Object.keys(Ti);function y5(e,t){return e>t?"horizontal":t>e?"vertical":""}function kr(){const e=re(0),t=re(0),n=re(0),r=re(0),a=re(0),o=re(0),i=re(""),l=()=>i.value==="vertical",s=()=>i.value==="horizontal",c=()=>{n.value=0,r.value=0,a.value=0,o.value=0,i.value=""};return{move:d=>{const m=d.touches[0];n.value=(m.clientX<0?0:m.clientX)-e.value,r.value=m.clientY-t.value,a.value=Math.abs(n.value),o.value=Math.abs(r.value);const y=10;(!i.value||a.value<y&&o.value<y)&&(i.value=y5(a.value,o.value))},start:d=>{c(),e.value=d.touches[0].clientX,t.value=d.touches[0].clientY},reset:c,startX:e,startY:t,deltaX:n,deltaY:r,offsetX:a,offsetY:o,direction:i,isVertical:l,isHorizontal:s}}let zi=0;const hg="van-overflow-hidden";function A5(e,t){const n=kr(),r="01",a="10",o=u=>{n.move(u);const f=n.deltaY.value>0?a:r,d=kA(u.target,e.value),{scrollHeight:m,offsetHeight:y,scrollTop:g}=d;let A="11";g===0?A=y>=m?"00":"01":g+y>=m&&(A="10"),A!=="11"&&n.isVertical()&&!(parseInt(A,2)&parseInt(f,2))&&Lt(u,!0)},i=()=>{document.addEventListener("touchstart",n.start),document.addEventListener("touchmove",o,{passive:!1}),zi||document.body.classList.add(hg),zi++},l=()=>{zi&&(document.removeEventListener("touchstart",n.start),document.removeEventListener("touchmove",o),zi--,zi||document.body.classList.remove(hg))},s=()=>t()&&i(),c=()=>t()&&l();Si(s),Oa(c),rr(c),Ie(t,u=>{u?i():l()})}function $p(e){const t=re(!1);return Ie(e,n=>{n&&(t.value=n)},{immediate:!0}),n=>()=>t.value?n():null}const[b5,E5]=Ee("overlay"),x5={show:Boolean,zIndex:we,duration:we,className:St,lockScroll:ve,lazyRender:ve,customStyle:Object};var C5=ye({name:b5,props:x5,setup(e,{slots:t}){const n=re(),r=$p(()=>e.show||!e.lazyRender),a=i=>{e.lockScroll&&Lt(i,!0)},o=r(()=>{var i;const l=Ue(bo(e.zIndex),e.customStyle);return ut(e.duration)&&(l.animationDuration=`${e.duration}s`),Fe(C("div",{ref:n,style:l,class:[E5(),e.className]},[(i=t.default)==null?void 0:i.call(t)]),[[We,e.show]])});return jt("touchmove",a,{target:n}),()=>C(Ao,{name:"van-fade",appear:!0},{default:o})}});const qA=Se(C5),w5=Ue({},Ti,{round:Boolean,position:Oe("center"),closeIcon:Oe("cross"),closeable:Boolean,transition:String,iconPrefix:String,closeOnPopstate:Boolean,closeIconPosition:Oe("top-right"),safeAreaInsetTop:Boolean,safeAreaInsetBottom:Boolean}),[_5,mg]=Ee("popup");var S5=ye({name:_5,inheritAttrs:!1,props:w5,emits:["open","close","opened","closed","keydown","update:show","click-overlay","click-close-icon"],setup(e,{emit:t,attrs:n,slots:r}){let a,o;const i=re(),l=re(),s=$p(()=>e.show||!e.lazyRender),c=oe(()=>{const x={zIndex:i.value};if(ut(e.duration)){const _=e.position==="center"?"animationDuration":"transitionDuration";x[_]=`${e.duration}s`}return x}),u=()=>{a||(a=!0,i.value=e.zIndex!==void 0?+e.zIndex:qT(),t("open"))},f=()=>{a&&Ma(e.beforeClose,{done(){a=!1,t("close"),t("update:show",!1)}})},d=x=>{t("click-overlay",x),e.closeOnClickOverlay&&f()},m=()=>{if(e.overlay)return C(qA,{show:e.show,class:e.overlayClass,zIndex:i.value,duration:e.duration,customStyle:e.overlayStyle,role:e.closeOnClickOverlay?"button":void 0,tabindex:e.closeOnClickOverlay?0:void 0,onClick:d},{default:r["overlay-content"]})},y=x=>{t("click-close-icon",x),f()},g=()=>{if(e.closeable)return C(tt,{role:"button",tabindex:0,name:e.closeIcon,class:[mg("close-icon",e.closeIconPosition),bn],classPrefix:e.iconPrefix,onClick:y},null)},A=()=>t("opened"),h=()=>t("closed"),p=x=>t("keydown",x),b=s(()=>{var x;const{round:_,position:S,safeAreaInsetTop:k,safeAreaInsetBottom:$}=e;return Fe(C("div",at({ref:l,style:c.value,role:"dialog",tabindex:0,class:[mg({round:_,[S]:S}),{"van-safe-area-top":k,"van-safe-area-bottom":$}],onKeydown:p},n),[(x=r.default)==null?void 0:x.call(r),g()]),[[We,e.show]])}),v=()=>{const{position:x,transition:_,transitionAppear:S}=e,k=x==="center"?"van-fade":`van-popup-slide-${x}`;return C(Ao,{name:_||k,appear:S,onAfterEnter:A,onAfterLeave:h},{default:b})};return Ie(()=>e.show,x=>{x&&!a&&(u(),n.tabindex===0&&Ke(()=>{var _;(_=l.value)==null||_.focus()})),!x&&a&&(a=!1,t("close"))}),dt({popupRef:l}),A5(l,()=>e.show&&e.lockScroll),jt("popstate",()=>{e.closeOnPopstate&&(f(),o=!1)}),Et(()=>{e.show&&u()}),yo(()=>{o&&(t("update:show",!0),o=!1)}),Oa(()=>{e.show&&e.teleport&&(f(),o=!0)}),Cr(NA,()=>e.show),()=>e.teleport?C(js,{to:e.teleport},{default:()=>[m(),v()]}):C(lt,null,[m(),v()])}});const ir=Se(S5),[k5,Yn]=Ee("action-sheet"),T5=Ue({},Ti,{title:String,round:ve,actions:qt(),closeIcon:Oe("cross"),closeable:ve,cancelText:String,description:String,closeOnPopstate:ve,closeOnClickAction:Boolean,safeAreaInsetBottom:ve}),I5=[...Pp,"round","closeOnPopstate","safeAreaInsetBottom"];var O5=ye({name:k5,props:T5,emits:["select","cancel","update:show"],setup(e,{slots:t,emit:n}){const r=u=>n("update:show",u),a=()=>{r(!1),n("cancel")},o=()=>{if(e.title)return C("div",{class:Yn("header")},[e.title,e.closeable&&C(tt,{name:e.closeIcon,class:[Yn("close"),bn],onClick:a},null)])},i=()=>{if(t.cancel||e.cancelText)return[C("div",{class:Yn("gap")},null),C("button",{type:"button",class:Yn("cancel"),onClick:a},[t.cancel?t.cancel():e.cancelText])]},l=(u,f)=>u.loading?C(or,{class:Yn("loading-icon")},null):t.action?t.action({action:u,index:f}):[C("span",{class:Yn("name")},[u.name]),u.subname&&C("div",{class:Yn("subname")},[u.subname])],s=(u,f)=>{const{color:d,loading:m,callback:y,disabled:g,className:A}=u,h=()=>{g||m||(y&&y(u),e.closeOnClickAction&&r(!1),Ke(()=>n("select",u,f)))};return C("button",{type:"button",style:{color:d},class:[Yn("item",{loading:m,disabled:g}),A],onClick:h},[l(u,f)])},c=()=>{if(e.description||t.description){const u=t.description?t.description():e.description;return C("div",{class:Yn("description")},[u])}};return()=>C(ir,at({class:Yn(),position:"bottom","onUpdate:show":r},Ct(e,I5)),{default:()=>{var u;return[o(),c(),C("div",{class:Yn("content")},[e.actions.map(s),(u=t.default)==null?void 0:u.call(t)]),i()]}})}});const B5=Se(O5);function Ts(e){if(!ut(e))return e;if(Array.isArray(e))return e.map(t=>Ts(t));if(Pn(e)){const t={};return Object.keys(e).forEach(n=>{t[n]=Ts(e[n])}),t}return e}const gg=200,vg=300,L5=15,[YA,ju]=Ee("picker-column");function P5(e){const{transform:t}=window.getComputedStyle(e),n=t.slice(7,t.length-1).split(", ")[5];return Number(n)}const GA=Symbol(YA),Uu=e=>Pn(e)&&e.disabled;var $5=ye({name:YA,props:{textKey:zt(String),readonly:Boolean,allowHtml:Boolean,className:St,itemHeight:zt(Number),defaultIndex:wr(0),swipeDuration:zt(we),initialOptions:qt(),visibleItemCount:zt(we)},emits:["change"],setup(e,{emit:t,slots:n}){let r,a,o,i,l;const s=re(),c=re(),u=He({index:e.defaultIndex,offset:0,duration:0,options:Ts(e.initialOptions)}),f=kr(),d=()=>u.options.length,m=()=>e.itemHeight*(+e.visibleItemCount-1)/2,y=M=>{M=en(M,0,d());for(let N=M;N<d();N++)if(!Uu(u.options[N]))return N;for(let N=M-1;N>=0;N--)if(!Uu(u.options[N]))return N},g=(M,N)=>{M=y(M)||0;const F=-M*e.itemHeight,z=()=>{M!==u.index&&(u.index=M,N&&t("change",M))};r&&F!==u.offset?l=z:z(),u.offset=F},A=M=>{JSON.stringify(M)!==JSON.stringify(u.options)&&(u.options=Ts(M),g(e.defaultIndex))},h=M=>{r||e.readonly||(l=null,u.duration=gg,g(M,!0))},p=M=>Pn(M)&&e.textKey in M?M[e.textKey]:M,b=M=>en(Math.round(-M/e.itemHeight),0,d()-1),v=(M,N)=>{const F=Math.abs(M/N);M=u.offset+F/.003*(M<0?-1:1);const z=b(M);u.duration=+e.swipeDuration,g(z,!0)},x=()=>{r=!1,u.duration=0,l&&(l(),l=null)},_=M=>{if(!e.readonly){if(f.start(M),r){const N=P5(c.value);u.offset=Math.min(0,N-m()),a=u.offset}else a=u.offset;u.duration=0,o=Date.now(),i=a,l=null}},S=M=>{if(e.readonly)return;f.move(M),f.isVertical()&&(r=!0,Lt(M,!0)),u.offset=en(a+f.deltaY.value,-(d()*e.itemHeight),e.itemHeight);const N=Date.now();N-o>vg&&(o=N,i=u.offset)},k=()=>{if(e.readonly)return;const M=u.offset-i,N=Date.now()-o;if(N<vg&&Math.abs(M)>L5){v(M,N);return}const z=b(u.offset);u.duration=gg,g(z,!0),setTimeout(()=>{r=!1},0)},$=()=>{const M={height:`${e.itemHeight}px`};return u.options.map((N,F)=>{const z=p(N),X=Uu(N),Y={role:"button",style:M,tabindex:X?-1:0,class:ju("item",{disabled:X,selected:F===u.index}),onClick:()=>h(F)},le={class:"van-ellipsis",[e.allowHtml?"innerHTML":"textContent"]:z};return C("li",Y,[n.option?n.option(N):C("div",le,null)])})},R=M=>{const{options:N}=u;for(let F=0;F<N.length;F++)if(p(N[F])===M)return g(F)},D=()=>u.options[u.index],j=()=>u.options.length;return g(u.index),cn(GA),dt({state:u,setIndex:g,getValue:D,setValue:R,setOptions:A,hasOptions:j,stopMomentum:x}),Ie(()=>e.initialOptions,A),Ie(()=>e.defaultIndex,M=>g(M)),jt("touchmove",S,{target:s}),()=>C("div",{ref:s,class:[ju(),e.className],onTouchstartPassive:_,onTouchend:k,onTouchcancel:k},[C("ul",{ref:c,style:{transform:`translate3d(0, ${u.offset+m()}px, 0)`,transitionDuration:`${u.duration}ms`,transitionProperty:u.duration?"all":"none"},class:ju("wrapper"),onTransitionend:x},[$()])])}});const[D5,Lr,yg]=Ee("picker"),Zc={title:String,loading:Boolean,readonly:Boolean,allowHtml:Boolean,itemHeight:$e(44),showToolbar:ve,swipeDuration:$e(1e3),visibleItemCount:$e(6),cancelButtonText:String,confirmButtonText:String},R5=Ue({},Zc,{columns:qt(),valueKey:String,defaultIndex:$e(0),toolbarPosition:Oe("top"),columnsFieldNames:Object});var M5=ye({name:D5,props:R5,emits:["confirm","cancel","change"],setup(e,{emit:t,slots:n}){const r=re(!1),a=re(),o=re([]),i=oe(()=>{const{columnsFieldNames:Q}=e;return{text:(Q==null?void 0:Q.text)||e.valueKey||"text",values:(Q==null?void 0:Q.values)||"values",children:(Q==null?void 0:Q.children)||"children"}}),{children:l,linkChildren:s}=hn(GA);s();const c=oe(()=>Op(e.itemHeight)),u=oe(()=>{const Q=e.columns[0];if(typeof Q=="object"){if(i.value.children in Q)return"cascade";if(i.value.values in Q)return"object"}return"plain"}),f=()=>{var Q;const ie=[];let ne={[i.value.children]:e.columns};for(;ne&&ne[i.value.children];){const fe=ne[i.value.children];let ee=(Q=ne.defaultIndex)!=null?Q:+e.defaultIndex;for(;fe[ee]&&fe[ee].disabled;)if(ee<fe.length-1)ee++;else{ee=0;break}ie.push({[i.value.values]:ne[i.value.children],className:ne.className,defaultIndex:ee}),ne=fe[ee]}o.value=ie},d=()=>{const{columns:Q}=e;u.value==="plain"?o.value=[{[i.value.values]:Q}]:u.value==="cascade"?f():o.value=Q,r.value=o.value.some(ie=>ie[i.value.values]&&ie[i.value.values].length!==0)||l.some(ie=>ie.hasOptions)},m=()=>l.map(Q=>Q.state.index),y=(Q,ie)=>{const ne=l[Q];ne&&(ne.setOptions(ie),r.value=!0)},g=Q=>{let ie={[i.value.children]:e.columns};const ne=m();for(let fe=0;fe<=Q;fe++)ie=ie[i.value.children][ne[fe]];for(;ie&&ie[i.value.children];)Q++,y(Q,ie[i.value.children]),ie=ie[i.value.children][ie.defaultIndex||0]},A=Q=>l[Q],h=Q=>{const ie=A(Q);if(ie)return ie.getValue()},p=(Q,ie)=>{const ne=A(Q);ne&&(ne.setValue(ie),u.value==="cascade"&&g(Q))},b=Q=>{const ie=A(Q);if(ie)return ie.state.index},v=(Q,ie)=>{const ne=A(Q);ne&&(ne.setIndex(ie),u.value==="cascade"&&g(Q))},x=Q=>{const ie=A(Q);if(ie)return ie.state.options},_=()=>l.map(Q=>Q.getValue()),S=Q=>{Q.forEach((ie,ne)=>{p(ne,ie)})},k=Q=>{Q.forEach((ie,ne)=>{v(ne,ie)})},$=Q=>{u.value==="plain"?t(Q,h(0),b(0)):t(Q,_(),m())},R=Q=>{u.value==="cascade"&&g(Q),u.value==="plain"?t("change",h(0),b(0)):t("change",_(),Q)},D=()=>{l.forEach(Q=>Q.stopMomentum()),$("confirm")},j=()=>$("cancel"),M=()=>{if(n.title)return n.title();if(e.title)return C("div",{class:[Lr("title"),"van-ellipsis"]},[e.title])},N=()=>{const Q=e.cancelButtonText||yg("cancel");return C("button",{type:"button",class:[Lr("cancel"),bn],onClick:j},[n.cancel?n.cancel():Q])},F=()=>{const Q=e.confirmButtonText||yg("confirm");return C("button",{type:"button",class:[Lr("confirm"),bn],onClick:D},[n.confirm?n.confirm():Q])},z=()=>{if(e.showToolbar){const Q=n.toolbar||n.default;return C("div",{class:Lr("toolbar")},[Q?Q():[N(),M(),F()]])}},X=()=>o.value.map((Q,ie)=>{var ne;return C($5,{textKey:i.value.text,readonly:e.readonly,allowHtml:e.allowHtml,className:Q.className,itemHeight:c.value,defaultIndex:(ne=Q.defaultIndex)!=null?ne:+e.defaultIndex,swipeDuration:e.swipeDuration,initialOptions:Q[i.value.values],visibleItemCount:e.visibleItemCount,onChange:()=>R(ie)},{option:n.option})}),Y=Q=>{if(r.value){const ie={height:`${c.value}px`},ne={backgroundSize:`100% ${(Q-c.value)/2}px`};return[C("div",{class:Lr("mask"),style:ne},null),C("div",{class:[zT,Lr("frame")],style:ie},null)]}},le=()=>{const Q=c.value*+e.visibleItemCount,ie={height:`${Q}px`};return C("div",{ref:a,class:Lr("columns"),style:ie},[X(),Y(Q)])};return Ie(()=>e.columns,d,{immediate:!0}),jt("touchmove",Lt,{target:a}),dt({confirm:D,getValues:_,setValues:S,getIndexes:m,setIndexes:k,getColumnIndex:b,setColumnIndex:v,getColumnValue:h,setColumnValue:p,getColumnValues:x,setColumnValues:y}),()=>{var Q,ie;return C("div",{class:Lr()},[e.toolbarPosition==="top"?z():null,e.loading?C(or,{class:Lr("loading")},null):null,(Q=n["columns-top"])==null?void 0:Q.call(n),le(),(ie=n["columns-bottom"])==null?void 0:ie.call(n),e.toolbarPosition==="bottom"?z():null])}}});const Jc=Se(M5),[N5,F5]=Ee("area"),Vu="000000",z5=["title","cancel","confirm","toolbar","columns-top","columns-bottom"],j5=["title","loading","readonly","itemHeight","swipeDuration","visibleItemCount","cancelButtonText","confirmButtonText"],U5=e=>e[0]==="9",V5=Ue({},Zc,{value:String,columnsNum:$e(3),columnsPlaceholder:qt(),areaList:{type:Object,default:()=>({})},isOverseaCode:{type:Function,default:U5}});var H5=ye({name:N5,props:V5,emits:["change","confirm","cancel"],setup(e,{emit:t,slots:n}){const r=re(),a=He({code:e.value,columns:[{values:[]},{values:[]},{values:[]}]}),o=oe(()=>{const{areaList:p}=e;return{province:p.province_list||{},city:p.city_list||{},county:p.county_list||{}}}),i=oe(()=>{const{columnsPlaceholder:p}=e;return{province:p[0]||"",city:p[1]||"",county:p[2]||""}}),l=()=>{if(e.columnsPlaceholder.length)return Vu;const{county:p,city:b}=o.value,v=Object.keys(p);if(v[0])return v[0];const x=Object.keys(b);return x[0]?x[0]:""},s=(p,b)=>{let v=[];if(p!=="province"&&!b)return v;const x=o.value[p];if(v=Object.keys(x).map(_=>({code:_,name:x[_]})),b&&(p==="city"&&e.isOverseaCode(b)&&(b="9"),v=v.filter(_=>_.code.indexOf(b)===0)),i.value[p]&&v.length){let _="";p==="city"?_=Vu.slice(2,4):p==="county"&&(_=Vu.slice(4,6)),v.unshift({code:b+_,name:i.value[p]})}return v},c=(p,b)=>{let v=b.length;p==="province"&&(v=e.isOverseaCode(b)?1:2),p==="city"&&(v=4),b=b.slice(0,v);const x=s(p,v>2?b.slice(0,v-2):"");for(let _=0;_<x.length;_++)if(x[_].code.slice(0,v)===b)return _;return 0},u=()=>{const p=r.value;if(!p)return;let b=a.code||l();const v=s("province"),x=s("city",b.slice(0,2));p.setColumnValues(0,v),p.setColumnValues(1,x),x.length&&b.slice(2,4)==="00"&&!e.isOverseaCode(b)&&([{code:b}]=x),p.setColumnValues(2,s("county",b.slice(0,4))),p.setIndexes([c("province",b),c("city",b),c("county",b)])},f=p=>p.map((b,v)=>(b&&(b=Ts(b),(!b.code||b.name===e.columnsPlaceholder[v])&&(b.code="",b.name="")),b)),d=()=>{if(r.value){const p=r.value.getValues().filter(Boolean);return f(p)}return[]},m=()=>{const p=d(),b={code:"",country:"",province:"",city:"",county:""};if(!p.length)return b;const v=p.map(_=>_.name),x=p.filter(_=>_.code);return b.code=x.length?x[x.length-1].code:"",e.isOverseaCode(b.code)?(b.country=v[1]||"",b.province=v[2]||""):(b.province=v[0]||"",b.city=v[1]||"",b.county=v[2]||""),b},y=(p="")=>{a.code=p,u()},g=(p,b)=>{if(a.code=p[b].code,u(),r.value){const v=f(r.value.getValues());t("change",v,b)}},A=(p,b)=>{u(),t("confirm",f(p),b)},h=(...p)=>t("cancel",...p);return Et(u),Ie(()=>e.value,p=>{a.code=p,u()}),Ie(()=>e.areaList,u,{deep:!0}),Ie(()=>e.columnsNum,()=>{Ke(u)}),dt({reset:y,getArea:m,getValues:d}),()=>{const p=a.columns.slice(0,+e.columnsNum);return C(Jc,at({ref:r,class:F5(),columns:p,columnsFieldNames:{text:"name"},onChange:g,onCancel:h,onConfirm:A},Ct(e,j5)),Ct(n,z5))}}});const KA=Se(H5),[W5,Io]=Ee("cell"),eu={icon:String,size:String,title:we,value:we,label:we,center:Boolean,isLink:Boolean,border:ve,required:Boolean,iconPrefix:String,valueClass:St,labelClass:St,titleClass:St,titleStyle:null,arrowDirection:String,clickable:{type:Boolean,default:null}},q5=Ue({},eu,Na);var Y5=ye({name:W5,props:q5,setup(e,{slots:t}){const n=Eo(),r=()=>{if(t.label||ut(e.label))return C("div",{class:[Io("label"),e.labelClass]},[t.label?t.label():e.label])},a=()=>{if(t.title||ut(e.title))return C("div",{class:[Io("title"),e.titleClass],style:e.titleStyle},[t.title?t.title():C("span",null,[e.title]),r()])},o=()=>{const s=t.value||t.default;if(s||ut(e.value)){const u=t.title||ut(e.title);return C("div",{class:[Io("value",{alone:!u}),e.valueClass]},[s?s():C("span",null,[e.value])])}},i=()=>{if(t.icon)return t.icon();if(e.icon)return C(tt,{name:e.icon,class:Io("left-icon"),classPrefix:e.iconPrefix},null)},l=()=>{if(t["right-icon"])return t["right-icon"]();if(e.isLink){const s=e.arrowDirection?`arrow-${e.arrowDirection}`:"arrow";return C(tt,{name:s,class:Io("right-icon")},null)}};return()=>{var s,c;const{size:u,center:f,border:d,isLink:m,required:y}=e,g=(s=e.clickable)!=null?s:m,A={center:f,required:y,clickable:g,borderless:!d};return u&&(A[u]=!!u),C("div",{class:Io(A),role:g?"button":void 0,tabindex:g?0:void 0,onClick:n},[i(),a(),o(),l(),(c=t.extra)==null?void 0:c.call(t)])}}});const sr=Se(Y5),[G5,K5]=Ee("form"),Q5={colon:Boolean,disabled:Boolean,readonly:Boolean,showError:Boolean,labelWidth:we,labelAlign:String,inputAlign:String,scrollToError:Boolean,validateFirst:Boolean,submitOnEnter:ve,showErrorMessage:ve,errorMessageAlign:String,validateTrigger:{type:[String,Array],default:"onBlur"}};var X5=ye({name:G5,props:Q5,emits:["submit","failed"],setup(e,{emit:t,slots:n}){const{children:r,linkChildren:a}=hn(MA),o=A=>A?r.filter(h=>A.includes(h.name)):r,i=A=>new Promise((h,p)=>{const b=[];o(A).reduce((x,_)=>x.then(()=>{if(!b.length)return _.validate().then(S=>{S&&b.push(S)})}),Promise.resolve()).then(()=>{b.length?p(b):h()})}),l=A=>new Promise((h,p)=>{const b=o(A);Promise.all(b.map(v=>v.validate())).then(v=>{v=v.filter(Boolean),v.length?p(v):h()})}),s=A=>{const h=r.find(p=>p.name===A);return h?new Promise((p,b)=>{h.validate().then(v=>{v?b(v):p()})}):Promise.reject()},c=A=>typeof A=="string"?s(A):e.validateFirst?i(A):l(A),u=A=>{typeof A=="string"&&(A=[A]),o(A).forEach(p=>{p.resetValidation()})},f=()=>r.reduce((A,h)=>(A[h.name]=h.getValidationStatus(),A),{}),d=(A,h)=>{r.some(p=>p.name===A?(p.$el.scrollIntoView(h),!0):!1)},m=()=>r.reduce((A,h)=>(A[h.name]=h.formValue.value,A),{}),y=()=>{const A=m();c().then(()=>t("submit",A)).catch(h=>{t("failed",{values:A,errors:h}),e.scrollToError&&h[0].name&&d(h[0].name)})},g=A=>{Lt(A),y()};return a({props:e}),dt({submit:y,validate:c,getValues:m,scrollToField:d,resetValidation:u,getValidationStatus:f}),()=>{var A;return C("form",{class:K5(),onSubmit:g},[(A=n.default)==null?void 0:A.call(n)])}}});const Dp=Se(X5);function QA(e){return Array.isArray(e)?!e.length:e===0?!1:!e}function Z5(e,t){if(QA(e)){if(t.required)return!1;if(t.validateEmpty===!1)return!0}return!(t.pattern&&!t.pattern.test(String(e)))}function J5(e,t){return new Promise(n=>{const r=t.validator(e,t);if(Tp(r)){r.then(n);return}n(r)})}function Ag(e,t){const{message:n}=t;return mi(n)?n(e,t):n||""}function eI({target:e}){e.composing=!0}function bg({target:e}){e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}function tI(e,t){const n=Vs();e.style.height="auto";let r=e.scrollHeight;if(Pn(t)){const{maxHeight:a,minHeight:o}=t;a!==void 0&&(r=Math.min(r,a)),o!==void 0&&(r=Math.max(r,o))}r&&(e.style.height=`${r}px`,Yc(n))}function nI(e){return e==="number"?{type:"text",inputmode:"decimal"}:e==="digit"?{type:"tel",inputmode:"numeric"}:{type:e}}function Hu(e){return[...e].length}function rI(e,t){return[...e].slice(0,t).join("")}let aI=0;function Ii(){const e=Gt(),{name:t="unknown"}=(e==null?void 0:e.type)||{};return`${t}-${++aI}`}const[oI,Mn]=Ee("field"),Rp={id:String,name:String,leftIcon:String,rightIcon:String,autofocus:Boolean,clearable:Boolean,maxlength:we,formatter:Function,clearIcon:Oe("clear"),modelValue:$e(""),inputAlign:String,placeholder:String,autocomplete:String,errorMessage:String,enterkeyhint:String,clearTrigger:Oe("focus"),formatTrigger:Oe("onChange"),error:{type:Boolean,default:null},disabled:{type:Boolean,default:null},readonly:{type:Boolean,default:null}},iI=Ue({},eu,Rp,{rows:we,type:Oe("text"),rules:Array,autosize:[Boolean,Object],labelWidth:we,labelClass:St,labelAlign:String,showWordLimit:Boolean,errorMessageAlign:String,colon:{type:Boolean,default:null}});var sI=ye({name:oI,props:iI,emits:["blur","focus","clear","keypress","click-input","end-validate","start-validate","click-left-icon","click-right-icon","update:modelValue"],setup(e,{emit:t,slots:n}){const r=Ii(),a=He({status:"unvalidated",focused:!1,validateMessage:""}),o=re(),i=re(),l=re(),{parent:s}=cn(MA),c=()=>{var W;return String((W=e.modelValue)!=null?W:"")},u=W=>{if(ut(e[W]))return e[W];if(s&&ut(s.props[W]))return s.props[W]},f=oe(()=>{const W=u("readonly");if(e.clearable&&!W){const te=c()!=="",pe=e.clearTrigger==="always"||e.clearTrigger==="focus"&&a.focused;return te&&pe}return!1}),d=oe(()=>l.value&&n.input?l.value():e.modelValue),m=W=>W.reduce((te,pe)=>te.then(()=>{if(a.status==="failed")return;let{value:_e}=d;if(pe.formatter&&(_e=pe.formatter(_e,pe)),!Z5(_e,pe)){a.status="failed",a.validateMessage=Ag(_e,pe);return}if(pe.validator)return QA(_e)&&pe.validateEmpty===!1?void 0:J5(_e,pe).then(Be=>{Be&&typeof Be=="string"?(a.status="failed",a.validateMessage=Be):Be===!1&&(a.status="failed",a.validateMessage=Ag(_e,pe))})}),Promise.resolve()),y=()=>{a.status="unvalidated",a.validateMessage=""},g=()=>t("end-validate",{status:a.status}),A=(W=e.rules)=>new Promise(te=>{y(),W?(t("start-validate"),m(W).then(()=>{a.status==="failed"?(te({name:e.name,message:a.validateMessage}),g()):(a.status="passed",te(),g())})):te()}),h=W=>{if(s&&e.rules){const{validateTrigger:te}=s.props,pe=ec(te).includes(W),_e=e.rules.filter(Be=>Be.trigger?ec(Be.trigger).includes(W):pe);_e.length&&A(_e)}},p=W=>{const{maxlength:te}=e;if(ut(te)&&Hu(W)>te){const pe=c();return pe&&Hu(pe)===+te?pe:rI(W,+te)}return W},b=(W,te="onChange")=>{if(W=p(W),e.type==="number"||e.type==="digit"){const pe=e.type==="number";W=tf(W,pe,pe)}e.formatter&&te===e.formatTrigger&&(W=e.formatter(W)),o.value&&o.value.value!==W&&(o.value.value=W),W!==e.modelValue&&t("update:modelValue",W)},v=W=>{W.target.composing||b(W.target.value)},x=()=>{var W;return(W=o.value)==null?void 0:W.blur()},_=()=>{var W;return(W=o.value)==null?void 0:W.focus()},S=()=>{const W=o.value;e.type==="textarea"&&e.autosize&&W&&tI(W,e.autosize)},k=W=>{a.focused=!0,t("focus",W),Ke(S),u("readonly")&&x()},$=W=>{u("readonly")||(a.focused=!1,b(c(),"onBlur"),t("blur",W),h("onBlur"),Ke(S),IA())},R=W=>t("click-input",W),D=W=>t("click-left-icon",W),j=W=>t("click-right-icon",W),M=W=>{Lt(W),t("update:modelValue",""),t("clear",W)},N=oe(()=>{if(typeof e.error=="boolean")return e.error;if(s&&s.props.showError&&a.status==="failed")return!0}),F=oe(()=>{const W=u("labelWidth");if(W)return{width:ht(W)}}),z=W=>{W.keyCode===13&&(!(s&&s.props.submitOnEnter)&&e.type!=="textarea"&&Lt(W),e.type==="search"&&x()),t("keypress",W)},X=()=>e.id||`${r}-input`,Y=()=>a.status,le=()=>{const W=Mn("control",[u("inputAlign"),{error:N.value,custom:!!n.input,"min-height":e.type==="textarea"&&!e.autosize}]);if(n.input)return C("div",{class:W,onClick:R},[n.input()]);const te={id:X(),ref:o,name:e.name,rows:e.rows!==void 0?+e.rows:void 0,class:W,disabled:u("disabled"),readonly:u("readonly"),autofocus:e.autofocus,placeholder:e.placeholder,autocomplete:e.autocomplete,enterkeyhint:e.enterkeyhint,"aria-labelledby":e.label?`${r}-label`:void 0,onBlur:$,onFocus:k,onInput:v,onClick:R,onChange:bg,onKeypress:z,onCompositionend:bg,onCompositionstart:eI};return e.type==="textarea"?C("textarea",te,null):C("input",at(nI(e.type),te),null)},Q=()=>{const W=n["left-icon"];if(e.leftIcon||W)return C("div",{class:Mn("left-icon"),onClick:D},[W?W():C(tt,{name:e.leftIcon,classPrefix:e.iconPrefix},null)])},ie=()=>{const W=n["right-icon"];if(e.rightIcon||W)return C("div",{class:Mn("right-icon"),onClick:j},[W?W():C(tt,{name:e.rightIcon,classPrefix:e.iconPrefix},null)])},ne=()=>{if(e.showWordLimit&&e.maxlength){const W=Hu(c());return C("div",{class:Mn("word-limit")},[C("span",{class:Mn("word-num")},[W]),Sa("/"),e.maxlength])}},fe=()=>{if(s&&s.props.showErrorMessage===!1)return;const W=e.errorMessage||a.validateMessage;if(W){const te=n["error-message"],pe=u("errorMessageAlign");return C("div",{class:Mn("error-message",pe)},[te?te({message:W}):W])}},ee=()=>{const W=u("colon")?":":"";if(n.label)return[n.label(),W];if(e.label)return C("label",{id:`${r}-label`,for:X()},[e.label+W])},K=()=>[C("div",{class:Mn("body")},[le(),f.value&&C(tt,{ref:i,name:e.clearIcon,class:Mn("clear")},null),ie(),n.button&&C("div",{class:Mn("button")},[n.button()])]),ne(),fe()];return dt({blur:x,focus:_,validate:A,formValue:d,resetValidation:y,getValidationStatus:Y}),Cr(TA,{customValue:l,resetValidation:y,validateWithTrigger:h}),Ie(()=>e.modelValue,()=>{b(c()),y(),h("onChange"),Ke(S)}),Et(()=>{b(c(),e.formatTrigger),Ke(S)}),jt("touchstart",M,{target:oe(()=>{var W;return(W=i.value)==null?void 0:W.$el})}),()=>{const W=u("disabled"),te=u("labelAlign"),pe=ee(),_e=Q();return C(sr,{size:e.size,icon:e.leftIcon,class:Mn({error:N.value,disabled:W,[`label-${te}`]:te}),center:e.center,border:e.border,isLink:e.isLink,clickable:e.clickable,titleStyle:F.value,valueClass:Mn("value"),titleClass:[Mn("label",[te,{required:e.required}]),e.labelClass],arrowDirection:e.arrowDirection},{icon:_e?()=>_e:null,title:pe?()=>pe:null,value:K,extra:n.extra})}}});const br=Se(sI);function tu(){const e=He({show:!1}),t=a=>{e.show=a},n=a=>{Ue(e,a,{transitionAppear:!0}),t(!0)},r=()=>t(!1);return dt({open:n,close:r,toggle:t}),{open:n,close:r,state:e,toggle:t}}function nu(e){const t=p0(e),n=document.createElement("div");return document.body.appendChild(n),{instance:t.mount(n),unmount(){t.unmount(),document.body.removeChild(n)}}}let ji=0;function lI(e){e?(ji||document.body.classList.add("van-toast--unclickable"),ji++):ji&&(ji--,ji||document.body.classList.remove("van-toast--unclickable"))}const[cI,Ui]=Ee("toast"),uI=["show","overlay","teleport","transition","overlayClass","overlayStyle","closeOnClickOverlay"],dI={icon:String,show:Boolean,type:Oe("text"),overlay:Boolean,message:we,iconSize:we,duration:wr(2e3),position:Oe("middle"),teleport:[String,Object],className:St,iconPrefix:String,transition:Oe("van-fade"),loadingType:String,forbidClick:Boolean,overlayClass:St,overlayStyle:Object,closeOnClick:Boolean,closeOnClickOverlay:Boolean};var XA=ye({name:cI,props:dI,emits:["update:show"],setup(e,{emit:t}){let n,r=!1;const a=()=>{const u=e.show&&e.forbidClick;r!==u&&(r=u,lI(r))},o=u=>t("update:show",u),i=()=>{e.closeOnClick&&o(!1)},l=()=>clearTimeout(n),s=()=>{const{icon:u,type:f,iconSize:d,iconPrefix:m,loadingType:y}=e;if(u||f==="success"||f==="fail")return C(tt,{name:u||f,size:d,class:Ui("icon"),classPrefix:m},null);if(f==="loading")return C(or,{class:Ui("loading"),size:d,type:y},null)},c=()=>{const{type:u,message:f}=e;if(ut(f)&&f!=="")return u==="html"?C("div",{key:0,class:Ui("text"),innerHTML:String(f)},null):C("div",{class:Ui("text")},[f])};return Ie(()=>[e.show,e.forbidClick],a),Ie(()=>[e.show,e.type,e.message,e.duration],()=>{l(),e.show&&e.duration>0&&(n=setTimeout(()=>{o(!1)},e.duration))}),Et(a),Un(a),()=>C(ir,at({class:[Ui([e.position,{[e.type]:!e.icon}]),e.className],lockScroll:!1,onClick:i,onClosed:l,"onUpdate:show":o},Ct(e,uI)),{default:()=>[s(),c()]})}});const ZA={icon:"",type:"text",message:"",className:"",overlay:!1,onClose:void 0,onOpened:void 0,duration:2e3,teleport:"body",iconSize:void 0,iconPrefix:void 0,position:"middle",transition:"van-fade",forbidClick:!1,loadingType:void 0,overlayClass:"",overlayStyle:void 0,closeOnClick:!1,closeOnClickOverlay:!1};let Jn=[],ru=!1,nc=Ue({},ZA);const rc=new Map;function JA(e){return Pn(e)?e:{message:e}}function fI(){const{instance:e,unmount:t}=nu({setup(){const n=re(""),{open:r,state:a,close:o,toggle:i}=tu(),l=()=>{ru&&(Jn=Jn.filter(c=>c!==e),t())},s=()=>C(XA,at(a,{onClosed:l,"onUpdate:show":i}),null);return Ie(n,c=>{a.message=c}),Gt().render=s,{open:r,clear:o,message:n}}});return e}function pI(){if(!Jn.length||ru){const e=fI();Jn.push(e)}return Jn[Jn.length-1]}function At(e={}){if(!La)return{};const t=pI(),n=JA(e);return t.open(Ue({},nc,rc.get(n.type||nc.type),n)),t}const Mp=e=>t=>At(Ue({type:e},JA(t)));At.loading=Mp("loading");At.success=Mp("success");At.fail=Mp("fail");At.clear=e=>{var t;Jn.length&&(e?(Jn.forEach(n=>{n.clear()}),Jn=[]):ru?(t=Jn.shift())==null||t.clear():Jn[0].clear())};function hI(e,t){typeof e=="string"?rc.set(e,t):Ue(nc,e)}At.setDefaultOptions=hI;At.resetDefaultOptions=e=>{typeof e=="string"?rc.delete(e):(nc=Ue({},ZA),rc.clear())};At.allowMultiple=(e=!0)=>{ru=e};At.install=e=>{e.use(Se(XA)),e.config.globalProperties.$toast=At};const[mI,Wu]=Ee("switch"),gI={size:we,loading:Boolean,disabled:Boolean,modelValue:St,activeColor:String,inactiveColor:String,activeValue:{type:St,default:!0},inactiveValue:{type:St,default:!1}};var vI=ye({name:mI,props:gI,emits:["change","update:modelValue"],setup(e,{emit:t,slots:n}){const r=()=>e.modelValue===e.activeValue,a=()=>{if(!e.disabled&&!e.loading){const i=r()?e.inactiveValue:e.activeValue;t("update:modelValue",i),t("change",i)}},o=()=>{if(e.loading){const i=r()?e.activeColor:e.inactiveColor;return C(or,{class:Wu("loading"),color:i},null)}if(n.node)return n.node()};return $a(()=>e.modelValue),()=>{var i;const{size:l,loading:s,disabled:c,activeColor:u,inactiveColor:f}=e,d=r(),m={fontSize:ht(l),backgroundColor:d?u:f};return C("div",{role:"switch",class:Wu({on:d,loading:s,disabled:c}),style:m,tabindex:c?void 0:0,"aria-checked":d,onClick:a},[C("div",{class:Wu("node")},[o()]),(i=n.background)==null?void 0:i.call(n)])}}});const Np=Se(vI),[yI,qu]=Ee("address-edit-detail"),Eg=Ee("address-edit")[2];var AI=ye({name:yI,props:{show:Boolean,rows:we,value:String,rules:Array,focused:Boolean,maxlength:we,searchResult:Array,showSearchResult:Boolean},emits:["blur","focus","input","select-search"],setup(e,{emit:t}){const n=re(),r=()=>e.focused&&e.searchResult&&e.showSearchResult,a=u=>{t("select-search",u),t("input",`${u.address||""} ${u.name||""}`.trim())},o=u=>{if(u.name){const f=u.name.replace(e.value,`<span class=${qu("keyword")}>${e.value}</span>`);return C("div",{innerHTML:f},null)}},i=()=>{if(!r())return;const{searchResult:u}=e;return u.map(f=>C(sr,{clickable:!0,key:f.name+f.address,icon:"location-o",label:f.address,class:qu("search-item"),border:!1,onClick:()=>a(f)},{title:()=>o(f)}))},l=u=>t("blur",u),s=u=>t("focus",u),c=u=>t("input",u);return()=>{if(e.show)return C(lt,null,[C(br,{autosize:!0,clearable:!0,ref:n,class:qu(),rows:e.rows,type:"textarea",rules:e.rules,label:Eg("addressDetail"),border:!r(),maxlength:e.maxlength,modelValue:e.value,placeholder:Eg("addressDetail"),onBlur:l,onFocus:s,"onUpdate:modelValue":c},null),i()])}}});const[bI,Oo,Rt]=Ee("address-edit"),eb={name:"",tel:"",city:"",county:"",country:"",province:"",areaCode:"",isDefault:!1,postalCode:"",addressDetail:""},EI=e=>/^\d{6}$/.test(e),xI={areaList:Object,isSaving:Boolean,isDeleting:Boolean,validator:Function,showArea:ve,showDetail:ve,showDelete:Boolean,showPostal:Boolean,disableArea:Boolean,searchResult:Array,telMaxlength:we,showSetDefault:Boolean,saveButtonText:String,areaPlaceholder:String,deleteButtonText:String,showSearchResult:Boolean,detailRows:$e(1),detailMaxlength:$e(200),areaColumnsPlaceholder:qt(),addressInfo:{type:Object,default:()=>Ue({},eb)},telValidator:{type:Function,default:CA},postalValidator:{type:Function,default:EI}};var CI=ye({name:bI,props:xI,emits:["save","focus","delete","click-area","change-area","change-detail","select-search","change-default"],setup(e,{emit:t,slots:n}){const r=re(),a=He({}),o=re(!1),i=re(!1),l=oe(()=>Pn(e.areaList)&&Object.keys(e.areaList).length),s=oe(()=>{const{country:_,province:S,city:k,county:$,areaCode:R}=a;if(R){const D=[_,S,k,$];return S&&S===k&&D.splice(1,1),D.filter(Boolean).join("/")}return""}),c=oe(()=>{var _;return((_=e.searchResult)==null?void 0:_.length)&&i.value}),u=()=>{if(r.value){const _=r.value.getArea();_.areaCode=_.code,delete _.code,Ue(a,_)}},f=_=>{i.value=_==="addressDetail",t("focus",_)},d=oe(()=>{const{validator:_,telValidator:S,postalValidator:k}=e,$=(R,D)=>({validator:j=>{if(_){const M=_(R,j);if(M)return M}return j?!0:D}});return{name:[$("name",Rt("nameEmpty"))],tel:[$("tel",Rt("telInvalid")),{validator:S,message:Rt("telInvalid")}],areaCode:[$("areaCode",Rt("areaEmpty"))],addressDetail:[$("addressDetail",Rt("addressEmpty"))],postalCode:[$("addressDetail",Rt("postalEmpty")),{validator:k,message:Rt("postalEmpty")}]}}),m=()=>t("save",a),y=_=>{a.addressDetail=_,t("change-detail",_)},g=_=>{_=_.filter(Boolean),_.some(S=>!S.code)?At(Rt("areaEmpty")):(o.value=!1,u(),t("change-area",_))},A=()=>t("delete",a),h=()=>{var _;return((_=r.value)==null?void 0:_.getValues())||[]},p=_=>{a.areaCode=_||"",_&&Ke(u)},b=()=>{setTimeout(()=>{i.value=!1})},v=_=>{a.addressDetail=_},x=()=>{if(e.showSetDefault){const _={"right-icon":()=>C(Np,{modelValue:a.isDefault,"onUpdate:modelValue":S=>a.isDefault=S,size:"24",onChange:S=>t("change-default",S)},null)};return Fe(C(sr,{center:!0,title:Rt("defaultAddress"),class:Oo("default")},_),[[We,!c.value]])}};return dt({getArea:h,setAreaCode:p,setAddressDetail:v}),Ie(()=>e.areaList,()=>p(a.areaCode)),Ie(()=>e.addressInfo,_=>{Ue(a,eb,_),p(_.areaCode)},{deep:!0,immediate:!0}),()=>{const{disableArea:_}=e;return C(Dp,{class:Oo(),onSubmit:m},{default:()=>{var S;return[C("div",{class:Oo("fields")},[C(br,{modelValue:a.name,"onUpdate:modelValue":k=>a.name=k,clearable:!0,label:Rt("name"),rules:d.value.name,placeholder:Rt("name"),onFocus:()=>f("name")},null),C(br,{modelValue:a.tel,"onUpdate:modelValue":k=>a.tel=k,clearable:!0,type:"tel",label:Rt("tel"),rules:d.value.tel,maxlength:e.telMaxlength,placeholder:Rt("tel"),onFocus:()=>f("tel")},null),Fe(C(br,{readonly:!0,label:Rt("area"),"is-link":!_,modelValue:s.value,rules:d.value.areaCode,placeholder:e.areaPlaceholder||Rt("area"),onFocus:()=>f("areaCode"),onClick:()=>{t("click-area"),o.value=!_}},null),[[We,e.showArea]]),C(AI,{show:e.showDetail,rows:e.detailRows,rules:d.value.addressDetail,value:a.addressDetail,focused:i.value,maxlength:e.detailMaxlength,searchResult:e.searchResult,showSearchResult:e.showSearchResult,onBlur:b,onFocus:()=>f("addressDetail"),onInput:y,"onSelect-search":k=>t("select-search",k)},null),e.showPostal&&Fe(C(br,{modelValue:a.postalCode,"onUpdate:modelValue":k=>a.postalCode=k,type:"tel",rules:d.value.postalCode,label:Rt("postal"),maxlength:"6",placeholder:Rt("postal"),onFocus:()=>f("postalCode")},null),[[We,!c.value]]),(S=n.default)==null?void 0:S.call(n)]),x(),Fe(C("div",{class:Oo("buttons")},[C(En,{block:!0,round:!0,type:"danger",text:e.saveButtonText||Rt("save"),class:Oo("button"),loading:e.isSaving,nativeType:"submit"},null),e.showDelete&&C(En,{block:!0,round:!0,class:Oo("button"),loading:e.isDeleting,text:e.deleteButtonText||Rt("delete"),onClick:A},null)]),[[We,!c.value]]),C(ir,{show:o.value,"onUpdate:show":k=>o.value=k,round:!0,teleport:"body",position:"bottom",lazyRender:!1},{default:()=>[C(KA,{ref:r,value:a.areaCode,loading:!l.value,areaList:e.areaList,columnsPlaceholder:e.areaColumnsPlaceholder,onConfirm:g,onCancel:()=>{o.value=!1}},null)]})]}})}}});const wI=Se(CI),[tb,_I]=Ee("radio-group"),SI={disabled:Boolean,iconSize:we,direction:String,modelValue:St,checkedColor:String},nb=Symbol(tb);var kI=ye({name:tb,props:SI,emits:["change","update:modelValue"],setup(e,{emit:t,slots:n}){const{linkChildren:r}=hn(nb),a=o=>t("update:modelValue",o);return Ie(()=>e.modelValue,o=>t("change",o)),r({props:e,updateValue:a}),$a(()=>e.modelValue),()=>{var o;return C("div",{class:_I([e.direction]),role:"radiogroup"},[(o=n.default)==null?void 0:o.call(n)])}}});const Fp=Se(kI),[TI,xg]=Ee("tag"),II={size:String,mark:Boolean,show:ve,type:Oe("default"),color:String,plain:Boolean,round:Boolean,textColor:String,closeable:Boolean};var OI=ye({name:TI,props:II,emits:["close"],setup(e,{slots:t,emit:n}){const r=i=>{i.stopPropagation(),n("close",i)},a=()=>e.plain?{color:e.textColor||e.color,borderColor:e.color}:{color:e.textColor,background:e.color},o=()=>{var i;const{type:l,mark:s,plain:c,round:u,size:f,closeable:d}=e,m={mark:s,plain:c,round:u};f&&(m[f]=f);const y=d&&C(tt,{name:"cross",class:[xg("close"),bn],onClick:r},null);return C("span",{style:a(),class:xg([m,l])},[(i=t.default)==null?void 0:i.call(t),y])};return()=>C(Ao,{name:e.closeable?"van-fade":void 0},{default:()=>[e.show?o():null]})}});const au=Se(OI),zp={name:St,shape:Oe("round"),disabled:Boolean,iconSize:we,modelValue:St,checkedColor:String,labelPosition:String,labelDisabled:Boolean};var rb=ye({props:Ue({},zp,{bem:zt(Function),role:String,parent:Object,checked:Boolean,bindGroup:ve}),emits:["click","toggle"],setup(e,{emit:t,slots:n}){const r=re(),a=f=>{if(e.parent&&e.bindGroup)return e.parent.props[f]},o=oe(()=>a("disabled")||e.disabled),i=oe(()=>a("direction")),l=oe(()=>{const f=e.checkedColor||a("checkedColor");if(f&&e.checked&&!o.value)return{borderColor:f,backgroundColor:f}}),s=f=>{const{target:d}=f,m=r.value,y=m===d||(m==null?void 0:m.contains(d));!o.value&&(y||!e.labelDisabled)&&t("toggle"),t("click",f)},c=()=>{const{bem:f,shape:d,checked:m}=e,y=e.iconSize||a("iconSize");return C("div",{ref:r,class:f("icon",[d,{disabled:o.value,checked:m}]),style:{fontSize:ht(y)}},[n.icon?n.icon({checked:m,disabled:o.value}):C(tt,{name:"success",style:l.value},null)])},u=()=>{if(n.default)return C("span",{class:e.bem("label",[e.labelPosition,{disabled:o.value}])},[n.default()])};return()=>{const f=e.labelPosition==="left"?[u(),c()]:[c(),u()];return C("div",{role:e.role,class:e.bem([{disabled:o.value,"label-disabled":e.labelDisabled},i.value]),tabindex:o.value?void 0:0,"aria-checked":e.checked,onClick:s},[f])}}});const[BI,LI]=Ee("radio");var PI=ye({name:BI,props:zp,emits:["update:modelValue"],setup(e,{emit:t,slots:n}){const{parent:r}=cn(nb),a=()=>(r?r.props.modelValue:e.modelValue)===e.name,o=()=>{r?r.updateValue(e.name):t("update:modelValue",e.name)};return()=>C(rb,at({bem:LI,role:"radio",parent:r,checked:a(),onToggle:o},e),Ct(n,["default","icon"]))}});const jp=Se(PI),[$I,Bo]=Ee("address-item");var DI=ye({name:$I,props:{address:zt(Object),disabled:Boolean,switchable:Boolean,defaultTagText:String},emits:["edit","click","select"],setup(e,{slots:t,emit:n}){const r=()=>{e.switchable&&n("select"),n("click")},a=()=>C(tt,{name:"edit",class:Bo("edit"),onClick:l=>{l.stopPropagation(),n("edit"),n("click")}},null),o=()=>{if(t.tag)return t.tag(e.address);if(e.address.isDefault&&e.defaultTagText)return C(au,{type:"danger",round:!0,class:Bo("tag")},{default:()=>[e.defaultTagText]})},i=()=>{const{address:l,disabled:s,switchable:c}=e,u=[C("div",{class:Bo("name")},[`${l.name} ${l.tel}`,o()]),C("div",{class:Bo("address")},[l.address])];return c&&!s?C(jp,{name:l.id,iconSize:18},{default:()=>[u]}):u};return()=>{var l;const{disabled:s}=e;return C("div",{class:Bo({disabled:s}),onClick:r},[C(sr,{border:!1,valueClass:Bo("value")},{value:i,"right-icon":a}),(l=t.bottom)==null?void 0:l.call(t,Ue({},e.address,{disabled:s}))])}}});const[RI,ml,MI]=Ee("address-list"),NI={list:qt(),modelValue:we,switchable:ve,disabledText:String,disabledList:qt(),addButtonText:String,defaultTagText:String};var FI=ye({name:RI,props:NI,emits:["add","edit","select","click-item","edit-disabled","select-disabled","update:modelValue"],setup(e,{slots:t,emit:n}){const r=(i,l,s)=>{const c=()=>n(s?"edit-disabled":"edit",i,l),u=()=>n("click-item",i,l),f=()=>{n(s?"select-disabled":"select",i,l),s||n("update:modelValue",i.id)};return C(DI,{key:i.id,address:i,disabled:s,switchable:e.switchable,defaultTagText:e.defaultTagText,onEdit:c,onClick:u,onSelect:f},{bottom:t["item-bottom"],tag:t.tag})},a=(i,l)=>{if(i)return i.map((s,c)=>r(s,c,l))},o=()=>C("div",{class:[ml("bottom"),"van-safe-area-bottom"]},[C(En,{round:!0,block:!0,type:"danger",text:e.addButtonText||MI("add"),class:ml("add"),onClick:()=>n("add")},null)]);return()=>{var i,l;const s=a(e.list),c=a(e.disabledList,!0),u=e.disabledText&&C("div",{class:ml("disabled-text")},[e.disabledText]);return C("div",{class:ml()},[(i=t.top)==null?void 0:i.call(t),C(Fp,{modelValue:e.modelValue},{default:()=>[s]}),u,c,(l=t.default)==null?void 0:l.call(t),o()])}}});const zI=Se(FI),[jI,Ft,Ur]=Ee("calendar"),UI=e=>Ur("monthTitle",e.getFullYear(),e.getMonth()+1);function af(e,t){const n=e.getFullYear(),r=t.getFullYear();if(n===r){const a=e.getMonth(),o=t.getMonth();return a===o?0:a>o?1:-1}return n>r?1:-1}function _n(e,t){const n=af(e,t);if(n===0){const r=e.getDate(),a=t.getDate();return r===a?0:r>a?1:-1}return n}const ac=e=>new Date(e),Cg=e=>Array.isArray(e)?e.map(ac):ac(e);function Up(e,t){const n=ac(e);return n.setDate(n.getDate()+t),n}const of=e=>Up(e,-1),ab=e=>Up(e,1),sf=()=>{const e=new Date;return e.setHours(0,0,0,0),e};function VI(e){const t=e[0].getTime();return(e[1].getTime()-t)/(1e3*60*60*24)+1}function ou(){const e=re([]),t=[];return tp(()=>{e.value=[]}),[e,r=>(t[r]||(t[r]=a=>{e.value[r]=a}),t[r])]}const ob=Ue({},Zc,{filter:Function,columnsOrder:Array,formatter:{type:Function,default:(e,t)=>t}}),ib=Object.keys(Zc);function sb(e,t){if(e<0)return[];const n=Array(e);let r=-1;for(;++r<e;)n[r]=t(r);return n}function HI(e){if(!e)return 0;for(;Number.isNaN(parseInt(e,10));)if(e.length>1)e=e.slice(1);else return 0;return parseInt(e,10)}const lf=(e,t)=>32-new Date(e,t-1,32).getDate(),lb=(e,t)=>{const n=["setValues","setIndexes","setColumnIndex","setColumnValue"];return new Proxy(e,{get:(r,a)=>n.includes(a)?(...o)=>{r[a](...o),t()}:r[a]})},[WI]=Ee("calendar-day");var qI=ye({name:WI,props:{item:zt(Object),color:String,index:Number,offset:wr(0),rowHeight:String},emits:["click"],setup(e,{emit:t,slots:n}){const r=oe(()=>{var s;const{item:c,index:u,color:f,offset:d,rowHeight:m}=e,y={height:m};if(c.type==="placeholder")return y.width="100%",y;if(u===0&&(y.marginLeft=`${100*d/7}%`),f)switch(c.type){case"end":case"start":case"start-end":case"multiple-middle":case"multiple-selected":y.background=f;break;case"middle":y.color=f;break}return d+(((s=c.date)==null?void 0:s.getDate())||1)>28&&(y.marginBottom=0),y}),a=()=>{e.item.type!=="disabled"&&t("click",e.item)},o=()=>{const{topInfo:s}=e.item;if(s||n["top-info"])return C("div",{class:Ft("top-info")},[n["top-info"]?n["top-info"](e.item):s])},i=()=>{const{bottomInfo:s}=e.item;if(s||n["bottom-info"])return C("div",{class:Ft("bottom-info")},[n["bottom-info"]?n["bottom-info"](e.item):s])},l=()=>{const{item:s,color:c,rowHeight:u}=e,{type:f,text:d}=s,m=[o(),d,i()];return f==="selected"?C("div",{class:Ft("selected-day"),style:{width:u,height:u,background:c}},[m]):m};return()=>{const{type:s,className:c}=e.item;return s==="placeholder"?C("div",{class:Ft("day"),style:r.value},null):C("div",{role:"gridcell",style:r.value,class:[Ft("day",s),c],tabindex:s==="disabled"?void 0:-1,onClick:a},[l()])}}});const[YI]=Ee("calendar-month"),GI={date:zt(Date),type:String,color:String,minDate:zt(Date),maxDate:zt(Date),showMark:Boolean,rowHeight:we,formatter:Function,lazyRender:Boolean,currentDate:[Date,Array],allowSameDay:Boolean,showSubtitle:Boolean,showMonthTitle:Boolean,firstDayOfWeek:Number};var KI=ye({name:YI,props:GI,emits:["click","update-height"],setup(e,{emit:t,slots:n}){const[r,a]=yT(),o=re(),i=re(),l=FA(i),s=oe(()=>UI(e.date)),c=oe(()=>ht(e.rowHeight)),u=oe(()=>{const R=e.date.getDay();return e.firstDayOfWeek?(R+7-e.firstDayOfWeek)%7:R}),f=oe(()=>lf(e.date.getFullYear(),e.date.getMonth()+1)),d=oe(()=>r.value||!e.lazyRender),m=()=>s.value,y=R=>{const D=j=>e.currentDate.some(M=>_n(M,j)===0);if(D(R)){const j=of(R),M=ab(R),N=D(j),F=D(M);return N&&F?"multiple-middle":N?"end":F?"start":"multiple-selected"}return""},g=R=>{const[D,j]=e.currentDate;if(!D)return"";const M=_n(R,D);if(!j)return M===0?"start":"";const N=_n(R,j);return e.allowSameDay&&M===0&&N===0?"start-end":M===0?"start":N===0?"end":M>0&&N<0?"middle":""},A=R=>{const{type:D,minDate:j,maxDate:M,currentDate:N}=e;if(_n(R,j)<0||_n(R,M)>0)return"disabled";if(N===null)return"";if(Array.isArray(N)){if(D==="multiple")return y(R);if(D==="range")return g(R)}else if(D==="single")return _n(R,N)===0?"selected":"";return""},h=R=>{if(e.type==="range"){if(R==="start"||R==="end")return Ur(R);if(R==="start-end")return`${Ur("start")}/${Ur("end")}`}},p=()=>{if(e.showMonthTitle)return C("div",{class:Ft("month-title")},[s.value])},b=()=>{if(e.showMark&&d.value)return C("div",{class:Ft("month-mark")},[e.date.getMonth()+1])},v=oe(()=>{const R=Math.ceil((f.value+u.value)/7);return Array(R).fill({type:"placeholder"})}),x=oe(()=>{const R=[],D=e.date.getFullYear(),j=e.date.getMonth();for(let M=1;M<=f.value;M++){const N=new Date(D,j,M),F=A(N);let z={date:N,type:F,text:M,bottomInfo:h(F)};e.formatter&&(z=e.formatter(z)),R.push(z)}return R}),_=oe(()=>x.value.filter(R=>R.type==="disabled")),S=(R,D)=>{if(o.value){const j=wt(o.value),M=v.value.length,F=(Math.ceil((D.getDate()+u.value)/7)-1)*j.height/M;tc(R,j.top+F+R.scrollTop-wt(R).top)}},k=(R,D)=>C(qI,{item:R,index:D,color:e.color,offset:u.value,rowHeight:c.value,onClick:j=>t("click",j)},Ct(n,["top-info","bottom-info"])),$=()=>C("div",{ref:o,role:"grid",class:Ft("days")},[b(),(d.value?x:v).value.map(k)]);return dt({getTitle:m,getHeight:()=>l.value,setVisible:a,scrollToDate:S,disabledDays:_}),()=>C("div",{class:Ft("month"),ref:i},[p(),$()])}});const[QI]=Ee("calendar-header");var XI=ye({name:QI,props:{title:String,subtitle:String,showTitle:Boolean,showSubtitle:Boolean,firstDayOfWeek:Number},emits:["click-subtitle"],setup(e,{slots:t,emit:n}){const r=()=>{if(e.showTitle){const l=e.title||Ur("title"),s=t.title?t.title():l;return C("div",{class:Ft("header-title")},[s])}},a=l=>n("click-subtitle",l),o=()=>{if(e.showSubtitle){const l=t.subtitle?t.subtitle():e.subtitle;return C("div",{class:Ft("header-subtitle"),onClick:a},[l])}},i=()=>{const{firstDayOfWeek:l}=e,s=Ur("weekdays"),c=[...s.slice(l,7),...s.slice(0,l)];return C("div",{class:Ft("weekdays")},[c.map(u=>C("span",{class:Ft("weekday")},[u]))])};return()=>C("div",{class:Ft("header")},[r(),o(),i()])}});const ZI={show:Boolean,type:Oe("single"),title:String,color:String,round:ve,readonly:Boolean,poppable:ve,maxRange:$e(null),position:Oe("bottom"),teleport:[String,Object],showMark:ve,showTitle:ve,formatter:Function,rowHeight:we,confirmText:String,rangePrompt:String,lazyRender:ve,showConfirm:ve,defaultDate:[Date,Array],allowSameDay:Boolean,showSubtitle:ve,closeOnPopstate:ve,showRangePrompt:ve,confirmDisabledText:String,closeOnClickOverlay:ve,safeAreaInsetTop:Boolean,safeAreaInsetBottom:ve,minDate:{type:Date,validator:Xo,default:sf},maxDate:{type:Date,validator:Xo,default:()=>{const e=sf();return new Date(e.getFullYear(),e.getMonth()+6,e.getDate())}},firstDayOfWeek:{type:we,default:0,validator:e=>e>=0&&e<=6}};var JI=ye({name:jI,props:ZI,emits:["select","confirm","unselect","month-show","over-range","update:show","click-subtitle"],setup(e,{emit:t,slots:n}){const r=(F,z=e.minDate,X=e.maxDate)=>_n(F,z)===-1?z:_n(F,X)===1?X:F,a=(F=e.defaultDate)=>{const{type:z,minDate:X,maxDate:Y,allowSameDay:le}=e;if(F===null)return F;const Q=sf();if(z==="range"){Array.isArray(F)||(F=[]);const ie=r(F[0]||Q,X,le?Y:of(Y)),ne=r(F[1]||Q,le?X:ab(X));return[ie,ne]}return z==="multiple"?Array.isArray(F)?F.map(ie=>r(ie)):[r(Q)]:((!F||Array.isArray(F))&&(F=Q),r(F))};let o;const i=re(),l=re(""),s=re(a()),[c,u]=ou(),f=oe(()=>e.firstDayOfWeek?+e.firstDayOfWeek%7:0),d=oe(()=>{const F=[],z=new Date(e.minDate);z.setDate(1);do F.push(new Date(z)),z.setMonth(z.getMonth()+1);while(af(z,e.maxDate)!==1);return F}),m=oe(()=>{if(s.value){if(e.type==="range")return!s.value[0]||!s.value[1];if(e.type==="multiple")return!s.value.length}return!s.value}),y=()=>s.value,g=()=>{const F=Ia(i.value),z=F+o,X=d.value.map((ne,fe)=>c.value[fe].getHeight()),Y=X.reduce((ne,fe)=>ne+fe,0);if(z>Y&&F>0)return;let le=0,Q;const ie=[-1,-1];for(let ne=0;ne<d.value.length;ne++){const fe=c.value[ne];le<=z&&le+X[ne]>=F&&(ie[1]=ne,Q||(Q=fe,ie[0]=ne),c.value[ne].showed||(c.value[ne].showed=!0,t("month-show",{date:fe.date,title:fe.getTitle()}))),le+=X[ne]}d.value.forEach((ne,fe)=>{const ee=fe>=ie[0]-1&&fe<=ie[1]+1;c.value[fe].setVisible(ee)}),Q&&(l.value=Q.getTitle())},A=F=>{An(()=>{d.value.some((z,X)=>af(z,F)===0?(i.value&&c.value[X].scrollToDate(i.value,F),!0):!1),g()})},h=()=>{if(!(e.poppable&&!e.show))if(s.value){const F=e.type==="single"?s.value:s.value[0];Xo(F)&&A(F)}else An(g)},p=()=>{e.poppable&&!e.show||(An(()=>{o=Math.floor(wt(i).height)}),h())},b=(F=a())=>{s.value=F,h()},v=F=>{const{maxRange:z,rangePrompt:X,showRangePrompt:Y}=e;return z&&VI(F)>z?(Y&&At(X||Ur("rangePrompt",z)),t("over-range"),!1):!0},x=()=>{var F;return t("confirm",(F=s.value)!=null?F:Cg(s.value))},_=(F,z)=>{const X=Y=>{s.value=Y,t("select",Cg(Y))};if(z&&e.type==="range"&&!v(F)){X([F[0],Up(F[0],+e.maxRange-1)]);return}X(F),z&&!e.showConfirm&&x()},S=(F,z,X)=>{var Y;return(Y=F.find(le=>_n(z,le.date)===-1&&_n(le.date,X)===-1))==null?void 0:Y.date},k=oe(()=>c.value.reduce((F,z)=>{var X,Y;return F.push(...(Y=(X=z.disabledDays)==null?void 0:X.value)!=null?Y:[]),F},[])),$=F=>{if(e.readonly||!F.date)return;const{date:z}=F,{type:X}=e;if(X==="range"){if(!s.value){_([z]);return}const[Y,le]=s.value;if(Y&&!le){const Q=_n(z,Y);if(Q===1){const ie=S(k.value,Y,z);if(ie){const ne=of(ie);_n(Y,ne)===-1?_([Y,ne]):_([z])}else _([Y,z],!0)}else Q===-1?_([z]):e.allowSameDay&&_([z,z],!0)}else _([z])}else if(X==="multiple"){if(!s.value){_([z]);return}const Y=s.value,le=Y.findIndex(Q=>_n(Q,z)===0);if(le!==-1){const[Q]=Y.splice(le,1);t("unselect",ac(Q))}else e.maxRange&&Y.length>=e.maxRange?At(e.rangePrompt||Ur("rangePrompt",e.maxRange)):_([...Y,z])}else _(z,!0)},R=F=>t("update:show",F),D=(F,z)=>{const X=z!==0||!e.showSubtitle;return C(KI,at({ref:u(z),date:F,currentDate:s.value,showMonthTitle:X,firstDayOfWeek:f.value},Ct(e,["type","color","minDate","maxDate","showMark","formatter","rowHeight","lazyRender","showSubtitle","allowSameDay"]),{onClick:$}),Ct(n,["top-info","bottom-info"]))},j=()=>{if(n.footer)return n.footer();if(e.showConfirm){const F=n["confirm-text"],z=m.value,X=z?e.confirmDisabledText:e.confirmText;return C(En,{round:!0,block:!0,type:"danger",color:e.color,class:Ft("confirm"),disabled:z,nativeType:"button",onClick:x},{default:()=>[F?F({disabled:z}):X||Ur("confirm")]})}},M=()=>C("div",{class:[Ft("footer"),{"van-safe-area-bottom":e.safeAreaInsetBottom}]},[j()]),N=()=>C("div",{class:Ft()},[C(XI,{title:e.title,subtitle:l.value,showTitle:e.showTitle,showSubtitle:e.showSubtitle,firstDayOfWeek:f.value,"onClick-subtitle":F=>t("click-subtitle",F)},Ct(n,["title","subtitle"])),C("div",{ref:i,class:Ft("body"),onScroll:g},[d.value.map(D)]),M()]);return Ie(()=>e.show,p),Ie(()=>[e.type,e.minDate,e.maxDate],()=>b(a(s.value))),Ie(()=>e.defaultDate,(F=null)=>{s.value=F,h()}),dt({reset:b,scrollToDate:A,getSelectedDate:y}),Si(p),()=>e.poppable?C(ir,{show:e.show,class:Ft("popup"),round:e.round,position:e.position,closeable:e.showTitle||e.showSubtitle,teleport:e.teleport,closeOnPopstate:e.closeOnPopstate,safeAreaInsetTop:e.safeAreaInsetTop,closeOnClickOverlay:e.closeOnClickOverlay,"onUpdate:show":R},{default:N}):N()}});const e3=Se(JI),[t3,Lo]=Ee("image"),n3={src:String,alt:String,fit:String,position:String,round:Boolean,block:Boolean,width:we,height:we,radius:we,lazyLoad:Boolean,iconSize:we,showError:ve,errorIcon:Oe("photo-fail"),iconPrefix:String,showLoading:ve,loadingIcon:Oe("photo")};var r3=ye({name:t3,props:n3,emits:["load","error"],setup(e,{emit:t,slots:n}){const r=re(!1),a=re(!0),o=re(),{$Lazyload:i}=Gt().proxy,l=oe(()=>{const g={width:ht(e.width),height:ht(e.height)};return ut(e.radius)&&(g.overflow="hidden",g.borderRadius=ht(e.radius)),g});Ie(()=>e.src,()=>{r.value=!1,a.value=!0});const s=g=>{a.value=!1,t("load",g)},c=g=>{r.value=!0,a.value=!1,t("error",g)},u=(g,A,h)=>h?h():C(tt,{name:g,size:e.iconSize,class:A,classPrefix:e.iconPrefix},null),f=()=>{if(a.value&&e.showLoading)return C("div",{class:Lo("loading")},[u(e.loadingIcon,Lo("loading-icon"),n.loading)]);if(r.value&&e.showError)return C("div",{class:Lo("error")},[u(e.errorIcon,Lo("error-icon"),n.error)])},d=()=>{if(r.value||!e.src)return;const g={alt:e.alt,class:Lo("img"),style:{objectFit:e.fit,objectPosition:e.position}};return e.lazyLoad?Fe(C("img",at({ref:o},g),null),[[_y("lazy"),e.src]]):C("img",at({src:e.src,onLoad:s,onError:c},g),null)},m=({el:g})=>{const A=()=>{g===o.value&&a.value&&s()};o.value?A():Ke(A)},y=({el:g})=>{g===o.value&&!r.value&&c()};return i&&La&&(i.$on("loaded",m),i.$on("error",y),rr(()=>{i.$off("loaded",m),i.$off("error",y)})),()=>{var g;return C("div",{class:Lo({round:e.round,block:e.block}),style:l.value},[d(),f(),(g=n.default)==null?void 0:g.call(n)])}}});const iu=Se(r3),[a3,dn]=Ee("card"),o3={tag:String,num:we,desc:String,thumb:String,title:String,price:we,centered:Boolean,lazyLoad:Boolean,currency:Oe("\xA5"),thumbLink:String,originPrice:we};var i3=ye({name:a3,props:o3,emits:["click-thumb"],setup(e,{slots:t,emit:n}){const r=()=>{if(t.title)return t.title();if(e.title)return C("div",{class:[dn("title"),"van-multi-ellipsis--l2"]},[e.title])},a=()=>{if(t.tag||e.tag)return C("div",{class:dn("tag")},[t.tag?t.tag():C(au,{mark:!0,type:"danger"},{default:()=>[e.tag]})])},o=()=>t.thumb?t.thumb():C(iu,{src:e.thumb,fit:"cover",width:"100%",height:"100%",lazyLoad:e.lazyLoad},null),i=()=>{if(t.thumb||e.thumb)return C("a",{href:e.thumbLink,class:dn("thumb"),onClick:c=>n("click-thumb",c)},[o(),a()])},l=()=>{if(t.desc)return t.desc();if(e.desc)return C("div",{class:[dn("desc"),"van-ellipsis"]},[e.desc])},s=()=>{const c=e.price.toString().split(".");return C("div",null,[C("span",{class:dn("price-currency")},[e.currency]),C("span",{class:dn("price-integer")},[c[0]]),Sa("."),C("span",{class:dn("price-decimal")},[c[1]])])};return()=>{var c,u,f;const d=t.num||ut(e.num),m=t.price||ut(e.price),y=t["origin-price"]||ut(e.originPrice),g=d||m||y||t.bottom,A=m&&C("div",{class:dn("price")},[t.price?t.price():s()]),h=y&&C("div",{class:dn("origin-price")},[t["origin-price"]?t["origin-price"]():`${e.currency} ${e.originPrice}`]),p=d&&C("div",{class:dn("num")},[t.num?t.num():`x${e.num}`]),b=t.footer&&C("div",{class:dn("footer")},[t.footer()]),v=g&&C("div",{class:dn("bottom")},[(c=t["price-top"])==null?void 0:c.call(t),A,h,p,(u=t.bottom)==null?void 0:u.call(t)]);return C("div",{class:dn()},[C("div",{class:dn("header")},[i(),C("div",{class:dn("content",{centered:e.centered})},[C("div",null,[r(),l(),(f=t.tags)==null?void 0:f.call(t)]),v])]),b])}}});const s3=Se(i3);function l3(e,t,n){let r=0;const a=e.scrollLeft,o=n===0?1:Math.round(n*1e3/16);function i(){e.scrollLeft+=(t-a)/o,++r<o&&An(i)}i()}function c3(e,t,n,r){let a=Ia(e);const o=a<t,i=n===0?1:Math.round(n*1e3/16),l=(t-a)/i;function s(){a+=l,(o&&a>t||!o&&a<t)&&(a=t),tc(e,a),o&&a<t||!o&&a>t?An(s):r&&An(r)}s()}function u3(e,t){if(!La||!window.IntersectionObserver)return;const n=new IntersectionObserver(o=>{t(o[0].intersectionRatio>0)},{root:document.body}),r=()=>{e.value&&n.observe(e.value)},a=()=>{e.value&&n.unobserve(e.value)};Oa(a),rr(a),Si(r)}const[d3,f3]=Ee("sticky"),p3={zIndex:we,position:Oe("top"),container:Object,offsetTop:$e(0),offsetBottom:$e(0)};var h3=ye({name:d3,props:p3,emits:["scroll","change"],setup(e,{emit:t,slots:n}){const r=re(),a=ki(r),o=He({fixed:!1,width:0,height:0,transform:0}),i=oe(()=>Op(e.position==="top"?e.offsetTop:e.offsetBottom)),l=oe(()=>{const{fixed:f,height:d,width:m}=o;if(f)return{width:`${m}px`,height:`${d}px`}}),s=oe(()=>{if(!o.fixed)return;const f=Ue(bo(e.zIndex),{width:`${o.width}px`,height:`${o.height}px`,[e.position]:`${i.value}px`});return o.transform&&(f.transform=`translate3d(0, ${o.transform}px, 0)`),f}),c=f=>t("scroll",{scrollTop:f,isFixed:o.fixed}),u=()=>{if(!r.value||gi(r))return;const{container:f,position:d}=e,m=wt(r),y=Ia(window);if(o.width=m.width,o.height=m.height,d==="top")if(f){const g=wt(f),A=g.bottom-i.value-o.height;o.fixed=i.value>m.top&&g.bottom>0,o.transform=A<0?A:0}else o.fixed=i.value>m.top;else{const{clientHeight:g}=document.documentElement;if(f){const A=wt(f),h=g-A.top-i.value-o.height;o.fixed=g-i.value<m.bottom&&g>A.top,o.transform=h<0?-h:0}else o.fixed=g-i.value<m.bottom}c(y)};return Ie(()=>o.fixed,f=>t("change",f)),jt("scroll",u,{target:a,passive:!0}),u3(r,u),()=>{var f;return C("div",{ref:r,style:l.value},[C("div",{class:f3({fixed:o.fixed}),style:s.value},[(f=n.default)==null?void 0:f.call(n)])])}}});const cb=Se(h3),[m3,wg]=Ee("tab");var g3=ye({name:m3,props:{id:String,dot:Boolean,type:String,color:String,title:String,badge:we,shrink:Boolean,isActive:Boolean,disabled:Boolean,controls:String,scrollable:Boolean,activeColor:String,inactiveColor:String,showZeroBadge:ve},setup(e,{slots:t}){const n=oe(()=>{const a={},{type:o,color:i,disabled:l,isActive:s,activeColor:c,inactiveColor:u}=e;i&&o==="card"&&(a.borderColor=i,l||(s?a.backgroundColor=i:a.color=i));const d=s?c:u;return d&&(a.color=d),a}),r=()=>{const a=C("span",{class:wg("text",{ellipsis:!e.scrollable})},[t.title?t.title():e.title]);return e.dot||ut(e.badge)&&e.badge!==""?C(xo,{dot:e.dot,content:e.badge,showZero:e.showZeroBadge},{default:()=>[a]}):a};return()=>C("div",{id:e.id,role:"tab",class:[wg([e.type,{grow:e.scrollable&&!e.shrink,shrink:e.shrink,active:e.isActive,disabled:e.disabled}])],style:n.value,tabindex:e.disabled?void 0:e.isActive?0:-1,"aria-selected":e.isActive,"aria-disabled":e.disabled||void 0,"aria-controls":e.controls},[r()])}});const[ub,gl]=Ee("swipe"),v3={loop:ve,width:we,height:we,vertical:Boolean,autoplay:$e(0),duration:$e(500),touchable:ve,lazyRender:Boolean,initialSwipe:$e(0),indicatorColor:String,showIndicators:ve,stopPropagation:ve},db=Symbol(ub);var y3=ye({name:ub,props:v3,emits:["change"],setup(e,{emit:t,slots:n}){const r=re(),a=re(),o=He({rect:null,width:0,height:0,offset:0,active:0,swiping:!1}),i=kr(),{children:l,linkChildren:s}=hn(db),c=oe(()=>l.length),u=oe(()=>o[e.vertical?"height":"width"]),f=oe(()=>e.vertical?i.deltaY.value:i.deltaX.value),d=oe(()=>o.rect?(e.vertical?o.rect.height:o.rect.width)-u.value*c.value:0),m=oe(()=>Math.ceil(Math.abs(d.value)/u.value)),y=oe(()=>c.value*u.value),g=oe(()=>(o.active+c.value)%c.value),A=oe(()=>{const Q=e.vertical?"vertical":"horizontal";return i.direction.value===Q}),h=oe(()=>{const Q={transitionDuration:`${o.swiping?0:e.duration}ms`,transform:`translate${e.vertical?"Y":"X"}(${o.offset}px)`};if(u.value){const ie=e.vertical?"height":"width",ne=e.vertical?"width":"height";Q[ie]=`${y.value}px`,Q[ne]=e[ne]?`${e[ne]}px`:""}return Q}),p=Q=>{const{active:ie}=o;return Q?e.loop?en(ie+Q,-1,c.value):en(ie+Q,0,m.value):ie},b=(Q,ie=0)=>{let ne=Q*u.value;e.loop||(ne=Math.min(ne,-d.value));let fe=ie-ne;return e.loop||(fe=en(fe,d.value,0)),fe},v=({pace:Q=0,offset:ie=0,emitChange:ne})=>{if(c.value<=1)return;const{active:fe}=o,ee=p(Q),K=b(ee,ie);if(e.loop){if(l[0]&&K!==d.value){const W=K<d.value;l[0].setOffset(W?y.value:0)}if(l[c.value-1]&&K!==0){const W=K>0;l[c.value-1].setOffset(W?-y.value:0)}}o.active=ee,o.offset=K,ne&&ee!==fe&&t("change",g.value)},x=()=>{o.swiping=!0,o.active<=-1?v({pace:c.value}):o.active>=c.value&&v({pace:-c.value})},_=()=>{x(),i.reset(),ga(()=>{o.swiping=!1,v({pace:-1,emitChange:!0})})},S=()=>{x(),i.reset(),ga(()=>{o.swiping=!1,v({pace:1,emitChange:!0})})};let k;const $=()=>clearTimeout(k),R=()=>{$(),e.autoplay>0&&c.value>1&&(k=setTimeout(()=>{S(),R()},+e.autoplay))},D=(Q=+e.initialSwipe)=>{if(!r.value)return;const ie=()=>{var ne,fe;if(!gi(r)){const ee={width:r.value.offsetWidth,height:r.value.offsetHeight};o.rect=ee,o.width=+((ne=e.width)!=null?ne:ee.width),o.height=+((fe=e.height)!=null?fe:ee.height)}c.value&&(Q=Math.min(c.value-1,Q)),o.active=Q,o.swiping=!0,o.offset=b(Q),l.forEach(ee=>{ee.setOffset(0)}),R()};gi(r)?Ke().then(ie):ie()},j=()=>D(o.active);let M;const N=Q=>{!e.touchable||(i.start(Q),M=Date.now(),$(),x())},F=Q=>{e.touchable&&o.swiping&&(i.move(Q),A.value&&(!e.loop&&(o.active===0&&f.value>0||o.active===c.value-1&&f.value<0)||(Lt(Q,e.stopPropagation),v({offset:f.value}))))},z=()=>{if(!e.touchable||!o.swiping)return;const Q=Date.now()-M,ie=f.value/Q;if((Math.abs(ie)>.25||Math.abs(f.value)>u.value/2)&&A.value){const fe=e.vertical?i.offsetY.value:i.offsetX.value;let ee=0;e.loop?ee=fe>0?f.value>0?-1:1:0:ee=-Math[f.value>0?"ceil":"floor"](f.value/u.value),v({pace:ee,emitChange:!0})}else f.value&&v({pace:0});o.swiping=!1,R()},X=(Q,ie={})=>{x(),i.reset(),ga(()=>{let ne;e.loop&&Q===c.value?ne=o.active===0?0:Q:ne=Q%c.value,ie.immediate?ga(()=>{o.swiping=!1}):o.swiping=!1,v({pace:ne-o.active,emitChange:!0})})},Y=(Q,ie)=>{const ne=ie===g.value,fe=ne?{backgroundColor:e.indicatorColor}:void 0;return C("i",{style:fe,class:gl("indicator",{active:ne})},null)},le=()=>{if(n.indicator)return n.indicator({active:g.value,total:c.value});if(e.showIndicators&&c.value>1)return C("div",{class:gl("indicators",{vertical:e.vertical})},[Array(c.value).fill("").map(Y)])};return dt({prev:_,next:S,state:o,resize:j,swipeTo:X}),s({size:u,props:e,count:c,activeIndicator:g}),Ie(()=>e.initialSwipe,Q=>D(+Q)),Ie(c,()=>D(o.active)),Ie(()=>e.autoplay,R),Ie([Gc,vi],j),Ie(kT(),Q=>{Q==="visible"?R():$()}),Et(D),yo(()=>D(o.active)),Qc(()=>D(o.active)),Oa($),rr($),jt("touchmove",F,{target:a}),()=>{var Q;return C("div",{ref:r,class:gl()},[C("div",{ref:a,style:h.value,class:gl("track",{vertical:e.vertical}),onTouchstartPassive:N,onTouchend:z,onTouchcancel:z},[(Q=n.default)==null?void 0:Q.call(n)]),le()])}}});const Vp=Se(y3),[A3,_g]=Ee("tabs");var b3=ye({name:A3,props:{count:zt(Number),inited:Boolean,animated:Boolean,duration:zt(we),swipeable:Boolean,lazyRender:Boolean,currentIndex:zt(Number)},emits:["change"],setup(e,{emit:t,slots:n}){const r=re(),a=l=>t("change",l),o=()=>{var l;const s=(l=n.default)==null?void 0:l.call(n);return e.animated||e.swipeable?C(Vp,{ref:r,loop:!1,class:_g("track"),duration:+e.duration*1e3,touchable:e.swipeable,lazyRender:e.lazyRender,showIndicators:!1,onChange:a},{default:()=>[s]}):s},i=l=>{const s=r.value;s&&s.state.active!==l&&s.swipeTo(l,{immediate:!e.inited})};return Ie(()=>e.currentIndex,i),Et(()=>{i(e.currentIndex)}),dt({swipeRef:r}),()=>C("div",{class:_g("content",{animated:e.animated||e.swipeable})},[o()])}});const[fb,vl]=Ee("tabs"),E3={type:Oe("line"),color:String,border:Boolean,sticky:Boolean,shrink:Boolean,active:$e(0),duration:$e(.3),animated:Boolean,ellipsis:ve,swipeable:Boolean,scrollspy:Boolean,offsetTop:$e(0),background:String,lazyRender:ve,lineWidth:we,lineHeight:we,beforeChange:Function,swipeThreshold:$e(5),titleActiveColor:String,titleInactiveColor:String},pb=Symbol(fb);var x3=ye({name:fb,props:E3,emits:["click","change","scroll","disabled","rendered","click-tab","update:active"],setup(e,{emit:t,slots:n}){let r,a,o;const i=re(),l=re(),s=re(),c=re(),u=Ii(),f=ki(i),[d,m]=ou(),{children:y,linkChildren:g}=hn(pb),A=He({inited:!1,position:"",lineStyle:{},currentIndex:-1}),h=oe(()=>y.length>e.swipeThreshold||!e.ellipsis||e.shrink),p=oe(()=>({borderColor:e.color,background:e.background})),b=(ee,K)=>{var W;return(W=ee.name)!=null?W:K},v=oe(()=>{const ee=y[A.currentIndex];if(ee)return b(ee,A.currentIndex)}),x=oe(()=>Op(e.offsetTop)),_=oe(()=>e.sticky?x.value+r:0),S=ee=>{const K=l.value,W=d.value;if(!h.value||!K||!W||!W[A.currentIndex])return;const te=W[A.currentIndex].$el,pe=te.offsetLeft-(K.offsetWidth-te.offsetWidth)/2;l3(K,pe,ee?0:+e.duration)},k=()=>{const ee=A.inited;Ke(()=>{const K=d.value;if(!K||!K[A.currentIndex]||e.type!=="line"||gi(i.value))return;const W=K[A.currentIndex].$el,{lineWidth:te,lineHeight:pe}=e,_e=W.offsetLeft+W.offsetWidth/2,Be={width:ht(te),backgroundColor:e.color,transform:`translateX(${_e}px) translateX(-50%)`};if(ee&&(Be.transitionDuration=`${e.duration}s`),ut(pe)){const Ne=ht(pe);Be.height=Ne,Be.borderRadius=Ne}A.lineStyle=Be})},$=ee=>{const K=ee<A.currentIndex?-1:1;for(;ee>=0&&ee<y.length;){if(!y[ee].disabled)return ee;ee+=K}},R=(ee,K)=>{const W=$(ee);if(!ut(W))return;const te=y[W],pe=b(te,W),_e=A.currentIndex!==null;A.currentIndex!==W&&(A.currentIndex=W,K||S(),k()),pe!==e.active&&(t("update:active",pe),_e&&t("change",pe,te.title)),o&&!e.scrollspy&&Yc(Math.ceil(sg(i.value)-x.value))},D=(ee,K)=>{const W=y.find((pe,_e)=>b(pe,_e)===ee),te=W?y.indexOf(W):0;R(te,K)},j=(ee=!1)=>{if(e.scrollspy){const K=y[A.currentIndex].$el;if(K&&f.value){const W=sg(K,f.value)-_.value;a=!0,c3(f.value,W,ee?0:+e.duration,()=>{a=!1})}}},M=(ee,K,W)=>{const{title:te,disabled:pe}=y[K],_e=b(y[K],K);pe?t("disabled",_e,te):(Ma(e.beforeChange,{args:[_e],done:()=>{R(K),j()}}),t("click",_e,te),UA(ee)),t("click-tab",{name:_e,title:te,event:W,disabled:pe})},N=ee=>{o=ee.isFixed,t("scroll",ee)},F=ee=>{Ke(()=>{D(ee),j(!0)})},z=()=>{for(let ee=0;ee<y.length;ee++){const{top:K}=wt(y[ee].$el);if(K>_.value)return ee===0?0:ee-1}return y.length-1},X=()=>{if(e.scrollspy&&!a){const ee=z();R(ee)}},Y=()=>y.map((ee,K)=>C(g3,at({key:ee.id,id:`${u}-${K}`,ref:m(K),type:e.type,color:e.color,style:ee.titleStyle,class:ee.titleClass,shrink:e.shrink,isActive:K===A.currentIndex,controls:ee.id,scrollable:h.value,activeColor:e.titleActiveColor,inactiveColor:e.titleInactiveColor,onClick:W=>M(ee,K,W)},Ct(ee,["dot","badge","title","disabled","showZeroBadge"])),{title:ee.$slots.title})),le=()=>{if(e.type==="line"&&y.length)return C("div",{class:vl("line"),style:A.lineStyle},null)},Q=()=>{var ee,K,W;const{type:te,border:pe,sticky:_e}=e,Be=[C("div",{ref:_e?void 0:s,class:[vl("wrap"),{[Kc]:te==="line"&&pe}]},[C("div",{ref:l,role:"tablist",class:vl("nav",[te,{shrink:e.shrink,complete:h.value}]),style:p.value,"aria-orientation":"horizontal"},[(ee=n["nav-left"])==null?void 0:ee.call(n),Y(),le(),(K=n["nav-right"])==null?void 0:K.call(n)])]),(W=n["nav-bottom"])==null?void 0:W.call(n)];return _e?C("div",{ref:s},[Be]):Be};Ie([()=>e.color,Gc],k),Ie(()=>e.active,ee=>{ee!==v.value&&D(ee)}),Ie(()=>y.length,()=>{A.inited&&(D(e.active),k(),Ke(()=>{S(!0)}))});const ie=()=>{D(e.active,!0),Ke(()=>{A.inited=!0,s.value&&(r=wt(s.value).height),S(!0)})},ne=(ee,K)=>t("rendered",ee,K);return dt({resize:()=>{k(),Ke(()=>{var ee,K;return(K=(ee=c.value)==null?void 0:ee.swipeRef.value)==null?void 0:K.resize()})},scrollTo:F}),yo(k),Qc(k),Si(ie),jt("scroll",X,{target:f,passive:!0}),g({id:u,props:e,setLine:k,onRendered:ne,currentName:v,scrollIntoView:S}),()=>C("div",{ref:i,class:vl([e.type])},[e.sticky?C(cb,{container:i.value,offsetTop:x.value,onScroll:N},{default:()=>[Q()]}):Q(),C(b3,{ref:c,count:y.length,inited:A.inited,animated:e.animated,duration:e.duration,swipeable:e.swipeable,lazyRender:e.lazyRender,currentIndex:A.currentIndex,onChange:R},{default:()=>{var ee;return[(ee=n.default)==null?void 0:ee.call(n)]}})])}});const hb=Symbol(),C3=()=>Wt(hb,null),[w3,_3]=Ee("swipe-item");var S3=ye({name:w3,setup(e,{slots:t}){let n;const r=He({offset:0,inited:!1,mounted:!1}),{parent:a,index:o}=cn(db);if(!a)return;const i=oe(()=>{const c={},{vertical:u}=a.props;return a.size.value&&(c[u?"height":"width"]=`${a.size.value}px`),r.offset&&(c.transform=`translate${u?"Y":"X"}(${r.offset}px)`),c}),l=oe(()=>{const{loop:c,lazyRender:u}=a.props;if(!u||n)return!0;if(!r.mounted)return!1;const f=a.activeIndicator.value,d=a.count.value-1,m=f===0&&c?d:f-1,y=f===d&&c?0:f+1;return n=o.value===f||o.value===m||o.value===y,n}),s=c=>{r.offset=c};return Et(()=>{Ke(()=>{r.mounted=!0})}),dt({setOffset:s}),()=>{var c;return C("div",{class:_3(),style:i.value},[l.value?(c=t.default)==null?void 0:c.call(t):null])}}});const Hp=Se(S3),[k3,Yu]=Ee("tab"),T3=Ue({},Na,{dot:Boolean,name:we,badge:we,title:String,disabled:Boolean,titleClass:St,titleStyle:[String,Object],showZeroBadge:ve});var I3=ye({name:k3,props:T3,setup(e,{slots:t}){const n=Ii(),r=re(!1),{parent:a,index:o}=cn(pb);if(!a)return;const i=()=>{var u;return(u=e.name)!=null?u:o.value},l=()=>{r.value=!0,a.props.lazyRender&&Ke(()=>{a.onRendered(i(),e.title)})},s=oe(()=>{const u=i()===a.currentName.value;return u&&!r.value&&l(),u}),c=re(!s.value);return Ie(s,u=>{u?c.value=!1:ga(()=>{c.value=!0})}),Ie(()=>e.title,()=>{a.setLine(),a.scrollIntoView()}),Cr(hb,s),()=>{var u;const f=`${a.id}-${o.value}`,{animated:d,swipeable:m,scrollspy:y,lazyRender:g}=a.props;if(!t.default&&!d)return;const A=y||s.value;if(d||m)return C(Hp,{id:n,role:"tabpanel",class:Yu("panel-wrapper",{inactive:c.value}),tabindex:s.value?0:-1,"aria-hidden":!s.value,"aria-labelledby":f},{default:()=>{var b;return[C("div",{class:Yu("panel")},[(b=t.default)==null?void 0:b.call(t)])]}});const p=r.value||y||!g?(u=t.default)==null?void 0:u.call(t):null;return dt({id:n}),Fe(C("div",{id:n,role:"tabpanel",class:Yu("panel"),tabindex:A?0:-1,"aria-labelledby":f},[p]),[[We,A]])}}});const oc=Se(I3),Wp=Se(x3),[O3,Pr,B3]=Ee("cascader"),L3={title:String,options:qt(),closeable:ve,swipeable:ve,closeIcon:Oe("cross"),showHeader:ve,modelValue:we,fieldNames:Object,placeholder:String,activeColor:String};var P3=ye({name:O3,props:L3,emits:["close","change","finish","click-tab","update:modelValue"],setup(e,{slots:t,emit:n}){const r=re([]),a=re(0),{text:o,value:i,children:l}=Ue({text:"text",value:"value",children:"children"},e.fieldNames),s=(p,b)=>{for(const v of p){if(v[i]===b)return[v];if(v[l]){const x=s(v[l],b);if(x)return[v,...x]}}},c=()=>{const{options:p,modelValue:b}=e;if(b!==void 0){const v=s(p,b);if(v){let x=p;r.value=v.map(_=>{const S={options:x,selected:_},k=x.find($=>$[i]===_[i]);return k&&(x=k[l]),S}),x&&r.value.push({options:x,selected:null}),Ke(()=>{a.value=r.value.length-1});return}}r.value=[{options:p,selected:null}]},u=(p,b)=>{if(p.disabled)return;if(r.value[b].selected=p,r.value.length>b+1&&(r.value=r.value.slice(0,b+1)),p[l]){const _={options:p[l],selected:null};r.value[b+1]?r.value[b+1]=_:r.value.push(_),Ke(()=>{a.value++})}const v=r.value.map(_=>_.selected).filter(Boolean);n("update:modelValue",p[i]);const x={value:p[i],tabIndex:b,selectedOptions:v};n("change",x),p[l]||n("finish",x)},f=()=>n("close"),d=({name:p,title:b})=>n("click-tab",p,b),m=()=>e.showHeader?C("div",{class:Pr("header")},[C("h2",{class:Pr("title")},[t.title?t.title():e.title]),e.closeable?C(tt,{name:e.closeIcon,class:[Pr("close-icon"),bn],onClick:f},null):null]):null,y=(p,b,v)=>{const{disabled:x}=p,_=!!(b&&p[i]===b[i]),S=p.color||(_?e.activeColor:void 0),k=t.option?t.option({option:p,selected:_}):C("span",null,[p[o]]);return C("li",{role:"menuitemradio",class:[Pr("option",{selected:_,disabled:x}),p.className],style:{color:S},tabindex:x?void 0:_?0:-1,"aria-checked":_,"aria-disabled":x||void 0,onClick:()=>u(p,v)},[k,_?C(tt,{name:"success",class:Pr("selected-icon")},null):null])},g=(p,b,v)=>C("ul",{role:"menu",class:Pr("options")},[p.map(x=>y(x,b,v))]),A=(p,b)=>{const{options:v,selected:x}=p,_=e.placeholder||B3("select"),S=x?x[o]:_;return C(oc,{title:S,titleClass:Pr("tab",{unselected:!x})},{default:()=>{var k,$;return[(k=t["options-top"])==null?void 0:k.call(t,{tabIndex:b}),g(v,x,b),($=t["options-bottom"])==null?void 0:$.call(t,{tabIndex:b})]}})},h=()=>C(Wp,{active:a.value,"onUpdate:active":p=>a.value=p,shrink:!0,animated:!0,class:Pr("tabs"),color:e.activeColor,swipeable:e.swipeable,"onClick-tab":d},{default:()=>[r.value.map(A)]});return c(),Ie(()=>e.options,c,{deep:!0}),Ie(()=>e.modelValue,p=>{p!==void 0&&r.value.map(v=>{var x;return(x=v.selected)==null?void 0:x[i]}).includes(p)||c()}),()=>C("div",{class:Pr()},[m(),h()])}});const $3=Se(P3),[D3,Sg]=Ee("cell-group"),R3={title:String,inset:Boolean,border:ve};var M3=ye({name:D3,inheritAttrs:!1,props:R3,setup(e,{slots:t,attrs:n}){const r=()=>{var o;return C("div",at({class:[Sg({inset:e.inset}),{[Kc]:e.border&&!e.inset}]},n),[(o=t.default)==null?void 0:o.call(t)])},a=()=>C("div",{class:Sg("title",{inset:e.inset})},[t.title?t.title():e.title]);return()=>e.title||t.title?C(lt,null,[a(),r()]):r()}});const N3=Se(M3),[mb,F3]=Ee("checkbox-group"),z3={max:we,disabled:Boolean,iconSize:we,direction:String,modelValue:qt(),checkedColor:String},gb=Symbol(mb);var j3=ye({name:mb,props:z3,emits:["change","update:modelValue"],setup(e,{emit:t,slots:n}){const{children:r,linkChildren:a}=hn(gb),o=l=>t("update:modelValue",l),i=(l={})=>{typeof l=="boolean"&&(l={checked:l});const{checked:s,skipDisabled:c}=l,f=r.filter(d=>d.props.bindGroup?d.props.disabled&&c?d.checked.value:s!=null?s:!d.checked.value:!1).map(d=>d.name);o(f)};return Ie(()=>e.modelValue,l=>t("change",l)),dt({toggleAll:i}),$a(()=>e.modelValue),a({props:e,updateValue:o}),()=>{var l;return C("div",{class:F3([e.direction])},[(l=n.default)==null?void 0:l.call(n)])}}});const[U3,V3]=Ee("checkbox"),H3=Ue({},zp,{bindGroup:ve});var W3=ye({name:U3,props:H3,emits:["change","update:modelValue"],setup(e,{emit:t,slots:n}){const{parent:r}=cn(gb),a=l=>{const{name:s}=e,{max:c,modelValue:u}=r.props,f=u.slice();if(l)!(c&&f.length>=c)&&!f.includes(s)&&(f.push(s),e.bindGroup&&r.updateValue(f));else{const d=f.indexOf(s);d!==-1&&(f.splice(d,1),e.bindGroup&&r.updateValue(f))}},o=oe(()=>r&&e.bindGroup?r.props.modelValue.indexOf(e.name)!==-1:!!e.modelValue),i=(l=!o.value)=>{r&&e.bindGroup?a(l):t("update:modelValue",l)};return Ie(()=>e.modelValue,l=>t("change",l)),dt({toggle:i,props:e,checked:o}),$a(()=>e.modelValue),()=>C(rb,at({bem:V3,role:"checkbox",parent:r,checked:o.value,onToggle:i},e),Ct(n,["default","icon"]))}});const vb=Se(W3),q3=Se(j3),[Y3,yl]=Ee("circle");let G3=0;const kg=e=>Math.min(Math.max(+e,0),100);function K3(e,t){const n=e?1:0;return`M ${t/2} ${t/2} m 0, -500 a 500, 500 0 1, ${n} 0, 1000 a 500, 500 0 1, ${n} 0, -1000`}const Q3={text:String,size:we,fill:Oe("none"),rate:$e(100),speed:$e(0),color:[String,Object],clockwise:ve,layerColor:String,currentRate:wr(0),strokeWidth:$e(40),strokeLinecap:String,startPosition:Oe("top")};var X3=ye({name:Y3,props:Q3,emits:["update:currentRate"],setup(e,{emit:t,slots:n}){const r=`van-circle-${G3++}`,a=oe(()=>+e.strokeWidth+1e3),o=oe(()=>K3(e.clockwise,a.value)),i=oe(()=>{const d={top:0,right:90,bottom:180,left:270}[e.startPosition];if(d)return{transform:`rotate(${d}deg)`}});Ie(()=>e.rate,f=>{let d;const m=Date.now(),y=e.currentRate,g=kg(f),A=Math.abs((y-g)*1e3/+e.speed),h=()=>{const p=Date.now(),v=Math.min((p-m)/A,1)*(g-y)+y;t("update:currentRate",kg(parseFloat(v.toFixed(1)))),(g>y?v<g:v>g)&&(d=An(h))};e.speed?(d&&_A(d),d=An(h)):t("update:currentRate",g)},{immediate:!0});const l=()=>{const{strokeWidth:d,currentRate:m,strokeLinecap:y}=e,g=3140*m/100,A=Pn(e.color)?`url(#${r})`:e.color,h={stroke:A,strokeWidth:`${+d+1}px`,strokeLinecap:y,strokeDasharray:`${g}px ${3140}px`};return C("path",{d:o.value,style:h,class:yl("hover"),stroke:A},null)},s=()=>{const f={fill:e.fill,stroke:e.layerColor,strokeWidth:`${e.strokeWidth}px`};return C("path",{class:yl("layer"),style:f,d:o.value},null)},c=()=>{const{color:f}=e;if(!Pn(f))return;const d=Object.keys(f).sort((m,y)=>parseFloat(m)-parseFloat(y)).map((m,y)=>C("stop",{key:y,offset:m,"stop-color":f[m]},null));return C("defs",null,[C("linearGradient",{id:r,x1:"100%",y1:"0%",x2:"0%",y2:"0%"},[d])])},u=()=>{if(n.default)return n.default();if(e.text)return C("div",{class:yl("text")},[e.text])};return()=>C("div",{class:yl(),style:Da(e.size)},[C("svg",{viewBox:`0 0 ${a.value} ${a.value}`,style:i.value},[c(),s(),l()]),u()])}});const Z3=Se(X3),[yb,J3]=Ee("row"),Ab=Symbol(yb),eO={tag:Oe("div"),wrap:ve,align:String,gutter:$e(0),justify:String};var tO=ye({name:yb,props:eO,setup(e,{slots:t}){const{children:n,linkChildren:r}=hn(Ab),a=oe(()=>{const i=[[]];let l=0;return n.forEach((s,c)=>{l+=Number(s.span),l>24?(i.push([c]),l-=24):i[i.length-1].push(c)}),i}),o=oe(()=>{const i=Number(e.gutter),l=[];return i&&a.value.forEach(s=>{const c=i*(s.length-1)/s.length;s.forEach((u,f)=>{if(f===0)l.push({right:c});else{const d=i-l[u-1].right,m=c-d;l.push({left:d,right:m})}})}),l});return r({spaces:o}),()=>{const{tag:i,wrap:l,align:s,justify:c}=e;return C(i,{class:J3({[`align-${s}`]:s,[`justify-${c}`]:c,nowrap:!l})},{default:()=>{var u;return[(u=t.default)==null?void 0:u.call(t)]}})}}});const[nO,rO]=Ee("col"),aO={tag:Oe("div"),span:$e(0),offset:we};var oO=ye({name:nO,props:aO,setup(e,{slots:t}){const{parent:n,index:r}=cn(Ab),a=oe(()=>{if(!n)return;const{spaces:o}=n;if(o&&o.value&&o.value[r.value]){const{left:i,right:l}=o.value[r.value];return{paddingLeft:i?`${i}px`:null,paddingRight:l?`${l}px`:null}}});return()=>{const{tag:o,span:i,offset:l}=e;return C(o,{style:a.value,class:rO({[i]:i,[`offset-${l}`]:l})},{default:()=>{var s;return[(s=t.default)==null?void 0:s.call(t)]}})}}});const iO=Se(oO),[bb,sO]=Ee("collapse"),Eb=Symbol(bb),lO={border:ve,accordion:Boolean,modelValue:{type:[String,Number,Array],default:""}};var cO=ye({name:bb,props:lO,emits:["change","update:modelValue"],setup(e,{emit:t,slots:n}){const{linkChildren:r,children:a}=hn(Eb),o=c=>{t("change",c),t("update:modelValue",c)},i=(c,u)=>{const{accordion:f,modelValue:d}=e;o(f?c===d?"":c:u?d.concat(c):d.filter(m=>m!==c))},l=(c={})=>{if(e.accordion)return;typeof c=="boolean"&&(c={expanded:c});const{expanded:u,skipDisabled:f}=c,m=a.filter(y=>y.disabled&&f?y.expanded.value:u!=null?u:!y.expanded.value).map(y=>y.itemName.value);o(m)},s=c=>{const{accordion:u,modelValue:f}=e;return u?f===c:f.includes(c)};return dt({toggleAll:l}),r({toggle:i,isExpanded:s}),()=>{var c;return C("div",{class:[sO(),{[Kc]:e.border}]},[(c=n.default)==null?void 0:c.call(n)])}}});const uO=Se(cO),[dO,Al]=Ee("collapse-item"),fO=["icon","title","value","label","right-icon"],pO=Ue({},eu,{name:we,isLink:ve,disabled:Boolean,readonly:Boolean,lazyRender:ve});var hO=ye({name:dO,props:pO,setup(e,{slots:t}){const n=re(),r=re(),{parent:a,index:o}=cn(Eb);if(!a)return;const i=oe(()=>{var g;return(g=e.name)!=null?g:o.value}),l=oe(()=>a.isExpanded(i.value)),s=re(l.value),c=$p(()=>s.value||!e.lazyRender),u=()=>{l.value?n.value&&(n.value.style.height=""):s.value=!1};Ie(l,(g,A)=>{if(A===null)return;g&&(s.value=!0),(g?Ke:An)(()=>{if(!r.value||!n.value)return;const{offsetHeight:p}=r.value;if(p){const b=`${p}px`;n.value.style.height=g?"0":b,ga(()=>{n.value&&(n.value.style.height=g?b:"0")})}else u()})});const f=(g=!l.value)=>{a.toggle(i.value,g)},d=()=>{!e.disabled&&!e.readonly&&f()},m=()=>{const{border:g,disabled:A,readonly:h}=e,p=Ct(e,Object.keys(eu));return h&&(p.isLink=!1),(A||h)&&(p.clickable=!1),C(sr,at({role:"button",class:Al("title",{disabled:A,expanded:l.value,borderless:!g}),"aria-expanded":String(l.value),onClick:d},p),Ct(t,fO))},y=c(()=>{var g;return Fe(C("div",{ref:n,class:Al("wrapper"),onTransitionend:u},[C("div",{ref:r,class:Al("content")},[(g=t.default)==null?void 0:g.call(t)])]),[[We,s.value]])});return dt({toggle:f,expanded:l,itemName:i}),()=>C("div",{class:[Al({border:o.value&&e.border})]},[m(),y()])}});const mO=Se(hO),gO=Se(XT),[vO,Tg,Gu]=Ee("contact-card"),yO={tel:String,name:String,type:Oe("add"),addText:String,editable:ve};var AO=ye({name:vO,props:yO,emits:["click"],setup(e,{emit:t}){const n=a=>{e.editable&&t("click",a)},r=()=>e.type==="add"?e.addText||Gu("addContact"):[C("div",null,[`${Gu("name")}\uFF1A${e.name}`]),C("div",null,[`${Gu("tel")}\uFF1A${e.tel}`])];return()=>C(sr,{center:!0,icon:e.type==="edit"?"contact":"add-square",class:Tg([e.type]),border:!1,isLink:e.editable,valueClass:Tg("value"),onClick:n},{value:r})}});const bO=Se(AO),[EO,Po,oa]=Ee("contact-edit"),cf={tel:"",name:""},xO={isEdit:Boolean,isSaving:Boolean,isDeleting:Boolean,showSetDefault:Boolean,setDefaultLabel:String,contactInfo:{type:Object,default:()=>Ue({},cf)},telValidator:{type:Function,default:CA}};var CO=ye({name:EO,props:xO,emits:["save","delete","change-default"],setup(e,{emit:t}){const n=He(Ue({},cf,e.contactInfo)),r=()=>{e.isSaving||t("save",n)},a=()=>t("delete",n),o=()=>C("div",{class:Po("buttons")},[C(En,{block:!0,round:!0,type:"danger",text:oa("save"),class:Po("button"),loading:e.isSaving,nativeType:"submit"},null),e.isEdit&&C(En,{block:!0,round:!0,text:oa("delete"),class:Po("button"),loading:e.isDeleting,onClick:a},null)]),i=()=>C(Np,{modelValue:n.isDefault,"onUpdate:modelValue":s=>n.isDefault=s,size:24,onChange:s=>t("change-default",s)},null),l=()=>{if(e.showSetDefault)return C(sr,{title:e.setDefaultLabel,class:Po("switch-cell"),border:!1},{"right-icon":i})};return Ie(()=>e.contactInfo,s=>Ue(n,cf,s)),()=>C(Dp,{class:Po(),onSubmit:r},{default:()=>[C("div",{class:Po("fields")},[C(br,{modelValue:n.name,"onUpdate:modelValue":s=>n.name=s,clearable:!0,label:oa("name"),rules:[{required:!0,message:oa("nameEmpty")}],maxlength:"30",placeholder:oa("name")},null),C(br,{modelValue:n.tel,"onUpdate:modelValue":s=>n.tel=s,clearable:!0,type:"tel",label:oa("tel"),rules:[{validator:e.telValidator,message:oa("telInvalid")}],placeholder:oa("tel")},null)]),l(),o()]})}});const wO=Se(CO),[_O,$r,SO]=Ee("contact-list"),kO={list:Array,addText:String,modelValue:St,defaultTagText:String};var TO=ye({name:_O,props:kO,emits:["add","edit","select","update:modelValue"],setup(e,{emit:t}){const n=(r,a)=>{const o=()=>{t("update:modelValue",r.id),t("select",r,a)},i=()=>C(jp,{class:$r("radio"),name:r.id,iconSize:16},null),l=()=>C(tt,{name:"edit",class:$r("edit"),onClick:c=>{c.stopPropagation(),t("edit",r,a)}},null),s=()=>{const c=[`${r.name}\uFF0C${r.tel}`];return r.isDefault&&e.defaultTagText&&c.push(C(au,{type:"danger",round:!0,class:$r("item-tag")},{default:()=>[e.defaultTagText]})),c};return C(sr,{key:r.id,isLink:!0,center:!0,class:$r("item"),valueClass:$r("item-value"),onClick:o},{icon:l,value:s,"right-icon":i})};return()=>C("div",{class:$r()},[C(Fp,{modelValue:e.modelValue,class:$r("group")},{default:()=>[e.list&&e.list.map(n)]}),C("div",{class:[$r("bottom"),"van-safe-area-bottom"]},[C(En,{round:!0,block:!0,type:"danger",class:$r("add"),text:e.addText||SO("addContact"),onClick:()=>t("add")},null)])])}});const IO=Se(TO);function OO(e,t){const{days:n}=t;let{hours:r,minutes:a,seconds:o,milliseconds:i}=t;if(e.includes("DD")?e=e.replace("DD",Jt(n)):r+=n*24,e.includes("HH")?e=e.replace("HH",Jt(r)):a+=r*60,e.includes("mm")?e=e.replace("mm",Jt(a)):o+=a*60,e.includes("ss")?e=e.replace("ss",Jt(o)):i+=o*1e3,e.includes("S")){const l=Jt(i,3);e.includes("SSS")?e=e.replace("SSS",l):e.includes("SS")?e=e.replace("SS",l.slice(0,2)):e=e.replace("S",l.charAt(0))}return e}const[BO,LO]=Ee("count-down"),PO={time:$e(0),format:Oe("HH:mm:ss"),autoStart:ve,millisecond:Boolean};var $O=ye({name:BO,props:PO,emits:["change","finish"],setup(e,{emit:t,slots:n}){const{start:r,pause:a,reset:o,current:i}=CT({time:+e.time,millisecond:e.millisecond,onChange:c=>t("change",c),onFinish:()=>t("finish")}),l=oe(()=>OO(e.format,i.value)),s=()=>{o(+e.time),e.autoStart&&r()};return Ie(()=>e.time,s,{immediate:!0}),dt({start:r,pause:a,reset:s}),()=>C("div",{role:"timer",class:LO()},[n.default?n.default(i.value):l.value])}});const DO=Se($O);function Ig(e){const t=new Date(e*1e3);return`${t.getFullYear()}.${Jt(t.getMonth()+1)}.${Jt(t.getDate())}`}const RO=e=>(e/10).toFixed(e%10===0?0:1),Og=e=>(e/100).toFixed(e%100===0?0:e%10===0?1:2),[MO,fr,Ku]=Ee("coupon");var NO=ye({name:MO,props:{chosen:Boolean,coupon:zt(Object),disabled:Boolean,currency:Oe("\xA5")},setup(e){const t=oe(()=>{const{startAt:a,endAt:o}=e.coupon;return`${Ig(a)} - ${Ig(o)}`}),n=oe(()=>{const{coupon:a,currency:o}=e;if(a.valueDesc)return[a.valueDesc,C("span",null,[a.unitDesc||""])];if(a.denominations){const i=Og(a.denominations);return[C("span",null,[o]),` ${i}`]}return a.discount?Ku("discount",RO(a.discount)):""}),r=oe(()=>{const a=Og(e.coupon.originCondition||0);return a==="0"?Ku("unlimited"):Ku("condition",a)});return()=>{const{chosen:a,coupon:o,disabled:i}=e,l=i&&o.reason||o.description;return C("div",{class:fr({disabled:i})},[C("div",{class:fr("content")},[C("div",{class:fr("head")},[C("h2",{class:fr("amount")},[n.value]),C("p",{class:fr("condition")},[o.condition||r.value])]),C("div",{class:fr("body")},[C("p",{class:fr("name")},[o.name]),C("p",{class:fr("valid")},[t.value]),!i&&C(vb,{class:fr("corner"),modelValue:a},null)])]),l&&C("p",{class:fr("description")},[l])])}}});const uf=Se(NO),[FO,Bg,df]=Ee("coupon-cell"),zO={title:String,border:ve,editable:ve,coupons:qt(),currency:Oe("\xA5"),chosenCoupon:$e(-1)};function jO({coupons:e,chosenCoupon:t,currency:n}){const r=e[+t];if(r){let a=0;return ut(r.value)?{value:a}=r:ut(r.denominations)&&(a=r.denominations),`-${n} ${(a/100).toFixed(2)}`}return e.length===0?df("noCoupon"):df("count",e.length)}var UO=ye({name:FO,props:zO,setup(e){return()=>{const t=e.coupons[+e.chosenCoupon];return C(sr,{class:Bg(),value:jO(e),title:e.title||df("title"),border:e.border,isLink:e.editable,valueClass:Bg("value",{selected:t})},null)}}});const VO=Se(UO),[HO,bl]=Ee("empty"),WO={image:Oe("default"),imageSize:[Number,String,Array],description:String};var qO=ye({name:HO,props:WO,setup(e,{slots:t}){const n=()=>{const h=t.description?t.description():e.description;if(h)return C("p",{class:bl("description")},[h])},r=()=>{if(t.default)return C("div",{class:bl("bottom")},[t.default()])},a=Ii(),o=h=>`${a}-${h}`,i=h=>`url(#${o(h)})`,l=(h,p,b)=>C("stop",{"stop-color":h,offset:`${p}%`,"stop-opacity":b},null),s=(h,p)=>[l(h,0),l(p,100)],c=h=>[C("defs",null,[C("radialGradient",{id:o(h),cx:"50%",cy:"54%",fx:"50%",fy:"54%",r:"297%",gradientTransform:"matrix(-.16 0 0 -.33 .58 .72)"},[l("#EBEDF0",0),l("#F2F3F5",100,.3)])]),C("ellipse",{fill:i(h),opacity:".8",cx:"80",cy:"140",rx:"46",ry:"8"},null)],u=()=>[C("defs",null,[C("linearGradient",{id:o("a"),x1:"64%",y1:"100%",x2:"64%"},[l("#FFF",0,.5),l("#F2F3F5",100)])]),C("g",{opacity:".8"},[C("path",{d:"M36 131V53H16v20H2v58h34z",fill:i("a")},null),C("path",{d:"M123 15h22v14h9v77h-31V15z",fill:i("a")},null)])],f=()=>[C("defs",null,[C("linearGradient",{id:o("b"),x1:"64%",y1:"97%",x2:"64%",y2:"0%"},[l("#F2F3F5",0,.3),l("#F2F3F5",100)])]),C("g",{opacity:".8"},[C("path",{d:"M87 6c3 0 7 3 8 6a8 8 0 1 1-1 16H80a7 7 0 0 1-8-6c0-4 3-7 6-7 0-5 4-9 9-9Z",fill:i("b")},null),C("path",{d:"M19 23c2 0 3 1 4 3 2 0 4 2 4 4a4 4 0 0 1-4 3v1h-7v-1l-1 1c-2 0-3-2-3-4 0-1 1-3 3-3 0-2 2-4 4-4Z",fill:i("b")},null)])],d=()=>C("svg",{viewBox:"0 0 160 160"},[C("defs",null,[C("linearGradient",{id:o(1),x1:"64%",y1:"100%",x2:"64%"},[l("#FFF",0,.5),l("#F2F3F5",100)]),C("linearGradient",{id:o(2),x1:"50%",x2:"50%",y2:"84%"},[l("#EBEDF0",0),l("#DCDEE0",100,0)]),C("linearGradient",{id:o(3),x1:"100%",x2:"100%",y2:"100%"},[s("#EAEDF0","#DCDEE0")]),C("radialGradient",{id:o(4),cx:"50%",cy:"0%",fx:"50%",fy:"0%",r:"100%",gradientTransform:"matrix(0 1 -.54 0 .5 -.5)"},[l("#EBEDF0",0),l("#FFF",100,0)])]),C("g",{fill:"none"},[u(),C("path",{fill:i(4),d:"M0 139h160v21H0z"},null),C("path",{d:"M80 54a7 7 0 0 1 3 13v27l-2 2h-2a2 2 0 0 1-2-2V67a7 7 0 0 1 3-13z",fill:i(2)},null),C("g",{opacity:".6","stroke-linecap":"round","stroke-width":"7"},[C("path",{d:"M64 47a19 19 0 0 0-5 13c0 5 2 10 5 13",stroke:i(3)},null),C("path",{d:"M53 36a34 34 0 0 0 0 48",stroke:i(3)},null),C("path",{d:"M95 73a19 19 0 0 0 6-13c0-5-2-9-6-13",stroke:i(3)},null),C("path",{d:"M106 84a34 34 0 0 0 0-48",stroke:i(3)},null)]),C("g",{transform:"translate(31 105)"},[C("rect",{fill:"#EBEDF0",width:"98",height:"34",rx:"2"},null),C("rect",{fill:"#FFF",x:"9",y:"8",width:"80",height:"18",rx:"1.1"},null),C("rect",{fill:"#EBEDF0",x:"15",y:"12",width:"18",height:"6",rx:"1.1"},null)])])]),m=()=>C("svg",{viewBox:"0 0 160 160"},[C("defs",null,[C("linearGradient",{x1:"50%",x2:"50%",y2:"100%",id:o(5)},[s("#F2F3F5","#DCDEE0")]),C("linearGradient",{x1:"95%",y1:"48%",x2:"5.5%",y2:"51%",id:o(6)},[s("#EAEDF1","#DCDEE0")]),C("linearGradient",{y1:"45%",x2:"100%",y2:"54%",id:o(7)},[s("#EAEDF1","#DCDEE0")])]),u(),f(),C("g",{transform:"translate(36 50)",fill:"none"},[C("g",{transform:"translate(8)"},[C("rect",{fill:"#EBEDF0",opacity:".6",x:"38",y:"13",width:"36",height:"53",rx:"2"},null),C("rect",{fill:i(5),width:"64",height:"66",rx:"2"},null),C("rect",{fill:"#FFF",x:"6",y:"6",width:"52",height:"55",rx:"1"},null),C("g",{transform:"translate(15 17)",fill:i(6)},[C("rect",{width:"34",height:"6",rx:"1"},null),C("path",{d:"M0 14h34v6H0z"},null),C("rect",{y:"28",width:"34",height:"6",rx:"1"},null)])]),C("rect",{fill:i(7),y:"61",width:"88",height:"28",rx:"1"},null),C("rect",{fill:"#F7F8FA",x:"29",y:"72",width:"30",height:"6",rx:"1"},null)])]),y=()=>C("svg",{viewBox:"0 0 160 160"},[C("defs",null,[C("linearGradient",{x1:"50%",x2:"50%",y2:"100%",id:o(8)},[s("#EAEDF1","#DCDEE0")])]),u(),f(),c("c"),C("path",{d:"m59 60 21 21 21-21h3l9 9v3L92 93l21 21v3l-9 9h-3l-21-21-21 21h-3l-9-9v-3l21-21-21-21v-3l9-9h3Z",fill:i(8)},null)]),g=()=>C("svg",{viewBox:"0 0 160 160"},[C("defs",null,[C("linearGradient",{x1:"50%",y1:"100%",x2:"50%",id:o(9)},[s("#EEE","#D8D8D8")]),C("linearGradient",{x1:"100%",y1:"50%",y2:"50%",id:o(10)},[s("#F2F3F5","#DCDEE0")]),C("linearGradient",{x1:"50%",x2:"50%",y2:"100%",id:o(11)},[s("#F2F3F5","#DCDEE0")]),C("linearGradient",{x1:"50%",x2:"50%",y2:"100%",id:o(12)},[s("#FFF","#F7F8FA")])]),u(),f(),c("d"),C("g",{transform:"rotate(-45 113 -4)",fill:"none"},[C("rect",{fill:i(9),x:"24",y:"52.8",width:"5.8",height:"19",rx:"1"},null),C("rect",{fill:i(10),x:"22.1",y:"67.3",width:"9.9",height:"28",rx:"1"},null),C("circle",{stroke:i(11),"stroke-width":"8",cx:"27",cy:"27",r:"27"},null),C("circle",{fill:i(12),cx:"27",cy:"27",r:"16"},null),C("path",{d:"M37 7c-8 0-15 5-16 12",stroke:i(11),"stroke-width":"3",opacity:".5","stroke-linecap":"round",transform:"rotate(45 29 13)"},null)])]),A=()=>{var h;if(t.image)return t.image();const p={error:y,search:g,network:d,default:m};return((h=p[e.image])==null?void 0:h.call(p))||C("img",{src:e.image},null)};return()=>C("div",{class:bl()},[C("div",{class:bl("image"),style:Da(e.imageSize)},[A()]),n(),r()])}});const xb=Se(qO),[YO,pr,$o]=Ee("coupon-list"),GO={code:Oe(""),coupons:qt(),currency:Oe("\xA5"),showCount:ve,emptyImage:String,chosenCoupon:wr(-1),enabledTitle:String,disabledTitle:String,disabledCoupons:qt(),showExchangeBar:ve,showCloseButton:ve,closeButtonText:String,inputPlaceholder:String,exchangeMinLength:wr(1),exchangeButtonText:String,displayedCouponIndex:wr(-1),exchangeButtonLoading:Boolean,exchangeButtonDisabled:Boolean};var KO=ye({name:YO,props:GO,emits:["change","exchange","update:code"],setup(e,{emit:t,slots:n}){const[r,a]=ou(),o=re(),i=re(),l=re(0),s=re(0),c=re(e.code),u=oe(()=>!e.exchangeButtonLoading&&(e.exchangeButtonDisabled||!c.value||c.value.length<e.exchangeMinLength)),f=()=>{const b=wt(o).height,v=wt(i).height+44;s.value=(b>v?b:vi.value)-v},d=()=>{t("exchange",c.value),e.code||(c.value="")},m=p=>{Ke(()=>{var b;return(b=r.value[p])==null?void 0:b.scrollIntoView()})},y=()=>C(xb,{image:e.emptyImage},{default:()=>[C("p",{class:pr("empty-tip")},[$o("noCoupon")])]}),g=()=>{if(e.showExchangeBar)return C("div",{ref:i,class:pr("exchange-bar")},[C(br,{modelValue:c.value,"onUpdate:modelValue":p=>c.value=p,clearable:!0,border:!1,class:pr("field"),placeholder:e.inputPlaceholder||$o("placeholder"),maxlength:"20"},null),C(En,{plain:!0,type:"danger",class:pr("exchange"),text:e.exchangeButtonText||$o("exchange"),loading:e.exchangeButtonLoading,disabled:u.value,onClick:d},null)])},A=()=>{const{coupons:p}=e,b=e.showCount?` (${p.length})`:"",v=(e.enabledTitle||$o("enable"))+b;return C(oc,{title:v},{default:()=>{var x;return[C("div",{class:pr("list",{"with-bottom":e.showCloseButton}),style:{height:`${s.value}px`}},[p.map((_,S)=>C(uf,{key:_.id,ref:a(S),coupon:_,chosen:S===e.chosenCoupon,currency:e.currency,onClick:()=>t("change",S)},null)),!p.length&&y(),(x=n["list-footer"])==null?void 0:x.call(n)])]}})},h=()=>{const{disabledCoupons:p}=e,b=e.showCount?` (${p.length})`:"",v=(e.disabledTitle||$o("disabled"))+b;return C(oc,{title:v},{default:()=>{var x;return[C("div",{class:pr("list",{"with-bottom":e.showCloseButton}),style:{height:`${s.value}px`}},[p.map(_=>C(uf,{disabled:!0,key:_.id,coupon:_,currency:e.currency},null)),!p.length&&y(),(x=n["disabled-list-footer"])==null?void 0:x.call(n)])]}})};return Ie(()=>e.code,p=>{c.value=p}),Ie(vi,f),Ie(c,p=>t("update:code",p)),Ie(()=>e.displayedCouponIndex,m),Et(()=>{f(),m(e.displayedCouponIndex)}),()=>C("div",{ref:o,class:pr()},[g(),C(Wp,{active:l.value,"onUpdate:active":p=>l.value=p,class:pr("tab")},{default:()=>[A(),h()]}),C("div",{class:pr("bottom")},[Fe(C(En,{round:!0,block:!0,type:"danger",class:pr("close"),text:e.closeButtonText||$o("close"),onClick:()=>t("change",-1)},null),[[We,e.showCloseButton]])])])}});const QO=Se(KO),[XO]=Ee("time-picker");var qp=ye({name:XO,props:Ue({},ob,{minHour:$e(0),maxHour:$e(23),minMinute:$e(0),maxMinute:$e(59),modelValue:String}),emits:["confirm","cancel","change","update:modelValue"],setup(e,{emit:t,slots:n}){const r=y=>{const{minHour:g,maxHour:A,maxMinute:h,minMinute:p}=e;y||(y=`${Jt(g)}:${Jt(p)}`);let[b,v]=y.split(":");return b=Jt(en(+b,+g,+A)),v=Jt(en(+v,+p,+h)),`${b}:${v}`},a=re(),o=re(r(e.modelValue)),i=oe(()=>[{type:"hour",range:[+e.minHour,+e.maxHour]},{type:"minute",range:[+e.minMinute,+e.maxMinute]}]),l=oe(()=>i.value.map(({type:y,range:g})=>{let A=sb(g[1]-g[0]+1,h=>Jt(g[0]+h));return e.filter&&(A=e.filter(y,A)),{type:y,values:A}})),s=oe(()=>l.value.map(y=>({values:y.values.map(g=>e.formatter(y.type,g))}))),c=()=>{const y=o.value.split(":"),g=[e.formatter("hour",y[0]),e.formatter("minute",y[1])];Ke(()=>{var A;(A=a.value)==null||A.setValues(g)})},u=()=>{const[y,g]=a.value.getIndexes(),[A,h]=l.value,p=A.values[y]||A.values[0],b=h.values[g]||h.values[0];o.value=r(`${p}:${b}`),c()},f=()=>t("confirm",o.value),d=()=>t("cancel"),m=()=>{u(),Ke(()=>{Ke(()=>t("change",o.value))})};return Et(()=>{c(),Ke(u)}),Ie(s,c),Ie(()=>[e.filter,e.maxHour,e.minMinute,e.maxMinute],u),Ie(()=>e.minHour,()=>{Ke(u)}),Ie(o,y=>t("update:modelValue",y)),Ie(()=>e.modelValue,y=>{y=r(y),y!==o.value&&(o.value=y,c())}),dt({getPicker:()=>a.value&&lb(a.value,u)}),()=>C(Jc,at({ref:a,columns:s.value,onChange:m,onCancel:d,onConfirm:f},Ct(e,ib)),n)}});const Lg=new Date().getFullYear(),[ZO]=Ee("date-picker");var Yp=ye({name:ZO,props:Ue({},ob,{type:Oe("datetime"),modelValue:Date,minDate:{type:Date,default:()=>new Date(Lg-10,0,1),validator:Xo},maxDate:{type:Date,default:()=>new Date(Lg+10,11,31),validator:Xo}}),emits:["confirm","cancel","change","update:modelValue"],setup(e,{emit:t,slots:n}){const r=g=>{if(Xo(g)){const A=en(g.getTime(),e.minDate.getTime(),e.maxDate.getTime());return new Date(A)}},a=re(),o=re(r(e.modelValue)),i=(g,A)=>{const h=e[`${g}Date`],p=h.getFullYear();let b=1,v=1,x=0,_=0;return g==="max"&&(b=12,v=lf(A.getFullYear(),A.getMonth()+1),x=23,_=59),A.getFullYear()===p&&(b=h.getMonth()+1,A.getMonth()+1===b&&(v=h.getDate(),A.getDate()===v&&(x=h.getHours(),A.getHours()===x&&(_=h.getMinutes())))),{[`${g}Year`]:p,[`${g}Month`]:b,[`${g}Date`]:v,[`${g}Hour`]:x,[`${g}Minute`]:_}},l=oe(()=>{const{maxYear:g,maxDate:A,maxMonth:h,maxHour:p,maxMinute:b}=i("max",o.value||e.minDate),{minYear:v,minDate:x,minMonth:_,minHour:S,minMinute:k}=i("min",o.value||e.minDate);let $=[{type:"year",range:[v,g]},{type:"month",range:[_,h]},{type:"day",range:[x,A]},{type:"hour",range:[S,p]},{type:"minute",range:[k,b]}];switch(e.type){case"date":$=$.slice(0,3);break;case"year-month":$=$.slice(0,2);break;case"month-day":$=$.slice(1,3);break;case"datehour":$=$.slice(0,4);break}if(e.columnsOrder){const R=e.columnsOrder.concat($.map(D=>D.type));$.sort((D,j)=>R.indexOf(D.type)-R.indexOf(j.type))}return $}),s=oe(()=>l.value.map(({type:g,range:A})=>{let h=sb(A[1]-A[0]+1,p=>Jt(A[0]+p));return e.filter&&(h=e.filter(g,h)),{type:g,values:h}})),c=oe(()=>s.value.map(g=>({values:g.values.map(A=>e.formatter(g.type,A))}))),u=()=>{const g=o.value||e.minDate,{formatter:A}=e,h=s.value.map(p=>{switch(p.type){case"year":return A("year",`${g.getFullYear()}`);case"month":return A("month",Jt(g.getMonth()+1));case"day":return A("day",Jt(g.getDate()));case"hour":return A("hour",Jt(g.getHours()));case"minute":return A("minute",Jt(g.getMinutes()));default:return""}});Ke(()=>{var p;(p=a.value)==null||p.setValues(h)})},f=()=>{const{type:g}=e,A=a.value.getIndexes(),h=$=>{let R=0;s.value.forEach((j,M)=>{$===j.type&&(R=M)});const{values:D}=s.value[R];return HI(D[A[R]])};let p,b,v;g==="month-day"?(p=(o.value||e.minDate).getFullYear(),b=h("month"),v=h("day")):(p=h("year"),b=h("month"),v=g==="year-month"?1:h("day"));const x=lf(p,b);v=v>x?x:v;let _=0,S=0;g==="datehour"&&(_=h("hour")),g==="datetime"&&(_=h("hour"),S=h("minute"));const k=new Date(p,b-1,v,_,S);o.value=r(k)},d=()=>{t("update:modelValue",o.value),t("confirm",o.value)},m=()=>t("cancel"),y=()=>{f(),Ke(()=>{f(),Ke(()=>t("change",o.value))})};return Et(()=>{u(),Ke(f)}),Ie(c,u),Ie(o,(g,A)=>t("update:modelValue",A?g:null)),Ie(()=>[e.filter,e.minDate,e.maxDate],()=>{Ke(f)}),Ie(()=>e.modelValue,g=>{var A;g=r(g),g&&g.valueOf()!==((A=o.value)==null?void 0:A.valueOf())&&(o.value=g)}),dt({getPicker:()=>a.value&&lb(a.value,f)}),()=>C(Jc,at({ref:a,columns:c.value,onChange:y,onCancel:m,onConfirm:d},Ct(e,ib)),n)}});const[JO,eB]=Ee("datetime-picker"),tB=Object.keys(qp.props),nB=Object.keys(Yp.props),rB=Ue({},qp.props,Yp.props,{modelValue:[String,Date]});var aB=ye({name:JO,props:rB,setup(e,{attrs:t,slots:n}){const r=re();return dt({getPicker:()=>{var a;return(a=r.value)==null?void 0:a.getPicker()}}),()=>{const a=e.type==="time",o=a?qp:Yp,i=Ct(e,a?tB:nB);return C(o,at({ref:r,class:eB()},i,t),n)}}});const oB=Se(aB),[iB,Gn,El]=Ee("dialog"),sB=Ue({},Ti,{title:String,theme:String,width:we,message:[String,Function],callback:Function,allowHtml:Boolean,className:St,transition:Oe("van-dialog-bounce"),messageAlign:String,closeOnPopstate:ve,showCancelButton:Boolean,cancelButtonText:String,cancelButtonColor:String,cancelButtonDisabled:Boolean,confirmButtonText:String,confirmButtonColor:String,confirmButtonDisabled:Boolean,showConfirmButton:ve,closeOnClickOverlay:Boolean}),lB=[...Pp,"transition","closeOnPopstate"];var Cb=ye({name:iB,props:sB,emits:["confirm","cancel","keydown","update:show"],setup(e,{emit:t,slots:n}){const r=re(),a=He({confirm:!1,cancel:!1}),o=h=>t("update:show",h),i=h=>{var p;o(!1),(p=e.callback)==null||p.call(e,h)},l=h=>()=>{!e.show||(t(h),e.beforeClose?(a[h]=!0,Ma(e.beforeClose,{args:[h],done(){i(h),a[h]=!1},canceled(){a[h]=!1}})):i(h))},s=l("cancel"),c=l("confirm"),u=l0(h=>{var p,b;if(h.target!==((b=(p=r.value)==null?void 0:p.popupRef)==null?void 0:b.value))return;({Enter:e.showConfirmButton?c:Xd,Escape:e.showCancelButton?s:Xd})[h.key](),t("keydown",h)},["enter","esc"]),f=()=>{const h=n.title?n.title():e.title;if(h)return C("div",{class:Gn("header",{isolated:!e.message&&!n.default})},[h])},d=h=>{const{message:p,allowHtml:b,messageAlign:v}=e,x=Gn("message",{"has-title":h,[v]:v}),_=mi(p)?p():p;return b&&typeof _=="string"?C("div",{class:x,innerHTML:_},null):C("div",{class:x},[_])},m=()=>{if(n.default)return C("div",{class:Gn("content")},[n.default()]);const{title:h,message:p,allowHtml:b}=e;if(p){const v=!!(h||n.title);return C("div",{key:b?1:0,class:Gn("content",{isolated:!v})},[d(v)])}},y=()=>C("div",{class:[DA,Gn("footer")]},[e.showCancelButton&&C(En,{size:"large",text:e.cancelButtonText||El("cancel"),class:Gn("cancel"),style:{color:e.cancelButtonColor},loading:a.cancel,disabled:e.cancelButtonDisabled,onClick:s},null),e.showConfirmButton&&C(En,{size:"large",text:e.confirmButtonText||El("confirm"),class:[Gn("confirm"),{[RA]:e.showCancelButton}],style:{color:e.confirmButtonColor},loading:a.confirm,disabled:e.confirmButtonDisabled,onClick:c},null)]),g=()=>C(jA,{class:Gn("footer")},{default:()=>[e.showCancelButton&&C(rf,{type:"warning",text:e.cancelButtonText||El("cancel"),class:Gn("cancel"),color:e.cancelButtonColor,loading:a.cancel,disabled:e.cancelButtonDisabled,onClick:s},null),e.showConfirmButton&&C(rf,{type:"danger",text:e.confirmButtonText||El("confirm"),class:Gn("confirm"),color:e.confirmButtonColor,loading:a.confirm,disabled:e.confirmButtonDisabled,onClick:c},null)]}),A=()=>n.footer?n.footer():e.theme==="round-button"?g():y();return()=>{const{width:h,title:p,theme:b,message:v,className:x}=e;return C(ir,at({ref:r,role:"dialog",class:[Gn([b]),x],style:{width:ht(h)},tabindex:0,"aria-labelledby":p||v,onKeydown:u,"onUpdate:show":o},Ct(e,lB)),{default:()=>[f(),m(),A()]})}}});let Is;function cB(){({instance:Is}=nu({setup(){const{state:t,toggle:n}=tu();return()=>C(Cb,at(t,{"onUpdate:show":n}),null)}}))}function Pt(e){return La?new Promise((t,n)=>{Is||cB(),Is.open(Ue({},Pt.currentOptions,e,{callback:r=>{(r==="confirm"?t:n)(r)}}))}):Promise.resolve()}Pt.defaultOptions={title:"",width:"",theme:null,message:"",overlay:!0,callback:null,teleport:"body",className:"",allowHtml:!1,lockScroll:!0,transition:void 0,beforeClose:null,overlayClass:"",overlayStyle:void 0,messageAlign:"",cancelButtonText:"",cancelButtonColor:null,cancelButtonDisabled:!1,confirmButtonText:"",confirmButtonColor:null,confirmButtonDisabled:!1,showConfirmButton:!0,showCancelButton:!1,closeOnPopstate:!0,closeOnClickOverlay:!1};Pt.currentOptions=Ue({},Pt.defaultOptions);Pt.alert=Pt;Pt.confirm=e=>Pt(Ue({showCancelButton:!0},e));Pt.close=()=>{Is&&Is.toggle(!1)};Pt.setDefaultOptions=e=>{Ue(Pt.currentOptions,e)};Pt.resetDefaultOptions=()=>{Pt.currentOptions=Ue({},Pt.defaultOptions)};Pt.Component=Se(Cb);Pt.install=e=>{e.use(Pt.Component),e.config.globalProperties.$dialog=Pt};const[uB,dB]=Ee("divider"),fB={dashed:Boolean,hairline:ve,contentPosition:Oe("center")};var pB=ye({name:uB,props:fB,setup(e,{slots:t}){return()=>{var n;return C("div",{role:"separator",class:dB({dashed:e.dashed,hairline:e.hairline,[`content-${e.contentPosition}`]:!!t.default})},[(n=t.default)==null?void 0:n.call(t)])}}});const hB=Se(pB),[wb,xl]=Ee("dropdown-menu"),mB={overlay:ve,zIndex:we,duration:$e(.2),direction:Oe("down"),activeColor:String,closeOnClickOutside:ve,closeOnClickOverlay:ve},_b=Symbol(wb);var gB=ye({name:wb,props:mB,setup(e,{slots:t}){const n=Ii(),r=re(),a=re(),o=re(0),{children:i,linkChildren:l}=hn(_b),s=ki(r),c=oe(()=>i.some(A=>A.state.showWrapper)),u=oe(()=>{if(c.value&&ut(e.zIndex))return{zIndex:+e.zIndex+1}}),f=()=>{e.closeOnClickOutside&&i.forEach(A=>{A.toggle(!1)})},d=()=>{if(a.value){const A=wt(a);e.direction==="down"?o.value=A.bottom:o.value=vi.value-A.top}},m=()=>{c.value&&d()},y=A=>{i.forEach((h,p)=>{p===A?(d(),h.toggle()):h.state.showPopup&&h.toggle(!1,{immediate:!0})})},g=(A,h)=>{const{showPopup:p}=A.state,{disabled:b,titleClass:v}=A;return C("div",{id:`${n}-${h}`,role:"button",tabindex:b?void 0:0,class:[xl("item",{disabled:b}),{[bn]:!b}],onClick:()=>{b||y(h)}},[C("span",{class:[xl("title",{down:p===(e.direction==="down"),active:p}),v],style:{color:p?e.activeColor:""}},[C("div",{class:"van-ellipsis"},[A.renderTitle()])])])};return l({id:n,props:e,offset:o}),qc(r,f),jt("scroll",m,{target:s,passive:!0}),()=>{var A;return C("div",{ref:r,class:xl()},[C("div",{ref:a,style:u.value,class:xl("bar",{opened:c.value})},[i.map(g)]),(A=t.default)==null?void 0:A.call(t)])}}});const[vB,Cl]=Ee("dropdown-item"),yB={title:String,options:qt(),disabled:Boolean,teleport:[String,Object],lazyRender:ve,modelValue:St,titleClass:St};var AB=ye({name:vB,props:yB,emits:["open","opened","close","closed","change","update:modelValue"],setup(e,{emit:t,slots:n}){const r=He({showPopup:!1,transition:!0,showWrapper:!1}),{parent:a,index:o}=cn(_b);if(!a)return;const i=A=>()=>t(A),l=i("open"),s=i("close"),c=i("opened"),u=()=>{r.showWrapper=!1,t("closed")},f=A=>{e.teleport&&A.stopPropagation()},d=(A=!r.showPopup,h={})=>{A!==r.showPopup&&(r.showPopup=A,r.transition=!h.immediate,A&&(r.showWrapper=!0))},m=()=>{if(n.title)return n.title();if(e.title)return e.title;const A=e.options.find(h=>h.value===e.modelValue);return A?A.text:""},y=A=>{const{activeColor:h}=a.props,p=A.value===e.modelValue,b=()=>{r.showPopup=!1,A.value!==e.modelValue&&(t("update:modelValue",A.value),t("change",A.value))},v=()=>{if(p)return C(tt,{class:Cl("icon"),color:h,name:"success"},null)};return C(sr,{role:"menuitem",key:A.value,icon:A.icon,title:A.text,class:Cl("option",{active:p}),style:{color:p?h:""},tabindex:p?0:-1,clickable:!0,onClick:b},{value:v})},g=()=>{const{offset:A}=a,{zIndex:h,overlay:p,duration:b,direction:v,closeOnClickOverlay:x}=a.props,_=bo(h);return v==="down"?_.top=`${A.value}px`:_.bottom=`${A.value}px`,Fe(C("div",{style:_,class:Cl([v]),onClick:f},[C(ir,{show:r.showPopup,"onUpdate:show":S=>r.showPopup=S,role:"menu",class:Cl("content"),overlay:p,position:v==="down"?"top":"bottom",duration:r.transition?b:0,lazyRender:e.lazyRender,overlayStyle:{position:"absolute"},"aria-labelledby":`${a.id}-${o.value}`,closeOnClickOverlay:x,onOpen:l,onClose:s,onOpened:c,onClosed:u},{default:()=>{var S;return[e.options.map(y),(S=n.default)==null?void 0:S.call(n)]}})]),[[We,r.showWrapper]])};return dt({state:r,toggle:d,renderTitle:m}),()=>e.teleport?C(js,{to:e.teleport},{default:()=>[g()]}):g()}});const bB=Se(AB),EB=Se(gB),[Sb,xB]=Ee("grid"),CB={square:Boolean,center:ve,border:ve,gutter:we,reverse:Boolean,iconSize:we,direction:String,clickable:Boolean,columnNum:$e(4)},kb=Symbol(Sb);var wB=ye({name:Sb,props:CB,setup(e,{slots:t}){const{linkChildren:n}=hn(kb);return n({props:e}),()=>{var r;return C("div",{style:{paddingLeft:ht(e.gutter)},class:[xB(),{[DA]:e.border&&!e.gutter}]},[(r=t.default)==null?void 0:r.call(t)])}}});const _B=Se(wB),[SB,wl]=Ee("grid-item"),kB=Ue({},Na,{dot:Boolean,text:String,icon:String,badge:we,iconColor:String,iconPrefix:String,badgeProps:Object});var TB=ye({name:SB,props:kB,setup(e,{slots:t}){const{parent:n,index:r}=cn(kb),a=Eo();if(!n)return;const o=oe(()=>{const{square:u,gutter:f,columnNum:d}=n.props,m=`${100/+d}%`,y={flexBasis:m};if(u)y.paddingTop=m;else if(f){const g=ht(f);y.paddingRight=g,r.value>=d&&(y.marginTop=g)}return y}),i=oe(()=>{const{square:u,gutter:f}=n.props;if(u&&f){const d=ht(f);return{right:d,bottom:d,height:"auto"}}}),l=()=>{if(t.icon)return C(xo,at({dot:e.dot,content:e.badge},e.badgeProps),{default:t.icon});if(e.icon)return C(tt,{dot:e.dot,name:e.icon,size:n.props.iconSize,badge:e.badge,class:wl("icon"),color:e.iconColor,badgeProps:e.badgeProps,classPrefix:e.iconPrefix},null)},s=()=>{if(t.text)return t.text();if(e.text)return C("span",{class:wl("text")},[e.text])},c=()=>t.default?t.default():[l(),s()];return()=>{const{center:u,border:f,square:d,gutter:m,reverse:y,direction:g,clickable:A}=n.props,h=[wl("content",[g,{center:u,square:d,reverse:y,clickable:A,surround:f&&m}]),{[Ra]:f}];return C("div",{class:[wl({square:d})],style:o.value},[C("div",{role:A?"button":void 0,class:h,style:i.value,tabindex:A?0:void 0,onClick:a},[c()])])}}});const IB=Se(TB),Pg=e=>Math.sqrt((e[0].clientX-e[1].clientX)**2+(e[0].clientY-e[1].clientY)**2),$g=Ee("image-preview")[1];var OB=ye({props:{src:String,show:Boolean,active:Number,minZoom:zt(we),maxZoom:zt(we),rootWidth:zt(Number),rootHeight:zt(Number)},emits:["scale","close"],setup(e,{emit:t}){const n=He({scale:1,moveX:0,moveY:0,moving:!1,zooming:!1,imageRatio:0,displayWidth:0,displayHeight:0}),r=kr(),a=re(),o=oe(()=>{const{rootWidth:k,rootHeight:$}=e,R=$/k;return n.imageRatio>R}),i=oe(()=>{const{scale:k,moveX:$,moveY:R,moving:D,zooming:j}=n,M={transitionDuration:j||D?"0s":".3s"};if(k!==1){const N=$/k,F=R/k;M.transform=`scale(${k}, ${k}) translate(${N}px, ${F}px)`}return M}),l=oe(()=>{if(n.imageRatio){const{rootWidth:k,rootHeight:$}=e,R=o.value?$/n.imageRatio:k;return Math.max(0,(n.scale*R-k)/2)}return 0}),s=oe(()=>{if(n.imageRatio){const{rootWidth:k,rootHeight:$}=e,R=o.value?$:k*n.imageRatio;return Math.max(0,(n.scale*R-$)/2)}return 0}),c=k=>{k=en(k,+e.minZoom,+e.maxZoom+1),k!==n.scale&&(n.scale=k,t("scale",{scale:k,index:e.active}))},u=()=>{c(1),n.moveX=0,n.moveY=0},f=()=>{const k=n.scale>1?1:2;c(k),n.moveX=0,n.moveY=0};let d,m,y,g,A,h,p;const b=k=>{const{touches:$}=k,{offsetX:R}=r;r.start(k),d=$.length,m=n.moveX,y=n.moveY,p=Date.now(),n.moving=d===1&&n.scale!==1,n.zooming=d===2&&!R.value,n.zooming&&(g=n.scale,A=Pg(k.touches))},v=k=>{const{touches:$}=k;if(r.move(k),(n.moving||n.zooming)&&Lt(k,!0),n.moving){const{deltaX:R,deltaY:D}=r,j=R.value+m,M=D.value+y;n.moveX=en(j,-l.value,l.value),n.moveY=en(M,-s.value,s.value)}if(n.zooming&&$.length===2){const R=Pg($),D=g*R/A;c(D)}},x=()=>{if(d>1)return;const{offsetX:k,offsetY:$}=r,R=Date.now()-p,D=250,j=5;k.value<j&&$.value<j&&R<D&&(h?(clearTimeout(h),h=null,f()):h=setTimeout(()=>{t("close"),h=null},D))},_=k=>{let $=!1;(n.moving||n.zooming)&&($=!0,n.moving&&m===n.moveX&&y===n.moveY&&($=!1),k.touches.length||(n.zooming&&(n.moveX=en(n.moveX,-l.value,l.value),n.moveY=en(n.moveY,-s.value,s.value),n.zooming=!1),n.moving=!1,m=0,y=0,g=1,n.scale<1&&u(),n.scale>e.maxZoom&&(n.scale=+e.maxZoom))),Lt(k,$),x(),r.reset()},S=k=>{const{naturalWidth:$,naturalHeight:R}=k.target;n.imageRatio=R/$};return Ie(()=>e.active,u),Ie(()=>e.show,k=>{k||u()}),jt("touchmove",v,{target:oe(()=>{var k;return(k=a.value)==null?void 0:k.$el})}),()=>{const k={loading:()=>C(or,{type:"spinner"},null)};return C(Hp,{ref:a,class:$g("swipe-item"),onTouchstartPassive:b,onTouchend:_,onTouchcancel:_},{default:()=>[C(iu,{src:e.src,fit:"contain",class:$g("image",{vertical:o.value}),style:i.value,onLoad:S},k)]})}}});const[BB,Do]=Ee("image-preview"),LB=["show","transition","overlayStyle","closeOnPopstate"],PB={show:Boolean,loop:ve,images:qt(),minZoom:$e(1/3),maxZoom:$e(3),overlay:ve,closeable:Boolean,showIndex:ve,className:St,closeIcon:Oe("clear"),transition:String,beforeClose:Function,overlayClass:St,overlayStyle:Object,swipeDuration:$e(300),startPosition:$e(0),showIndicators:Boolean,closeOnPopstate:ve,closeIconPosition:Oe("top-right")};var Tb=ye({name:BB,props:PB,emits:["scale","close","closed","change","update:show"],setup(e,{emit:t,slots:n}){const r=re(),a=He({active:0,rootWidth:0,rootHeight:0}),o=()=>{if(r.value){const A=wt(r.value.$el);a.rootWidth=A.width,a.rootHeight=A.height,r.value.resize()}},i=A=>t("scale",A),l=A=>t("update:show",A),s=()=>{Ma(e.beforeClose,{args:[a.active],done:()=>l(!1)})},c=A=>{A!==a.active&&(a.active=A,t("change",A))},u=()=>{if(e.showIndex)return C("div",{class:Do("index")},[n.index?n.index({index:a.active}):`${a.active+1} / ${e.images.length}`])},f=()=>{if(n.cover)return C("div",{class:Do("cover")},[n.cover()])},d=()=>C(Vp,{ref:r,lazyRender:!0,loop:e.loop,class:Do("swipe"),duration:e.swipeDuration,initialSwipe:e.startPosition,showIndicators:e.showIndicators,indicatorColor:"white",onChange:c},{default:()=>[e.images.map(A=>C(OB,{src:A,show:e.show,active:a.active,maxZoom:e.maxZoom,minZoom:e.minZoom,rootWidth:a.rootWidth,rootHeight:a.rootHeight,onScale:i,onClose:s},null))]}),m=()=>{if(e.closeable)return C(tt,{role:"button",name:e.closeIcon,class:[Do("close-icon",e.closeIconPosition),bn],onClick:s},null)},y=()=>t("closed"),g=(A,h)=>{var p;return(p=r.value)==null?void 0:p.swipeTo(A,h)};return dt({swipeTo:g}),Et(o),Ie([Gc,vi],o),Ie(()=>e.startPosition,A=>c(+A)),Ie(()=>e.show,A=>{const{images:h,startPosition:p}=e;A?(c(+p),Ke(()=>{o(),g(+p,{immediate:!0})})):t("close",{index:a.active,url:h[a.active]})}),()=>C(ir,at({class:[Do(),e.className],overlayClass:[Do("overlay"),e.overlayClass],onClosed:y,"onUpdate:show":l},Ct(e,LB)),{default:()=>[m(),d(),u(),f()]})}});let Rl;const $B={loop:!0,images:[],maxZoom:3,minZoom:1/3,onScale:void 0,onClose:void 0,onChange:void 0,teleport:"body",className:"",showIndex:!0,closeable:!1,closeIcon:"clear",transition:void 0,beforeClose:void 0,overlayStyle:void 0,overlayClass:void 0,startPosition:0,swipeDuration:300,showIndicators:!1,closeOnPopstate:!0,closeIconPosition:"top-right"};function DB(){({instance:Rl}=nu({setup(){const{state:e,toggle:t}=tu(),n=()=>{e.images=[]};return()=>C(Tb,at(e,{onClosed:n,"onUpdate:show":t}),null)}}))}const Os=(e,t=0)=>{if(!!La)return Rl||DB(),e=Array.isArray(e)?{images:e,startPosition:t}:e,Rl.open(Ue({},$B,e)),Rl};Os.Component=Se(Tb);Os.install=e=>{e.use(Os.Component)};function RB(){const e="A".charCodeAt(0);return Array(26).fill("").map((n,r)=>String.fromCharCode(e+r))}const[Ib,Qu]=Ee("index-bar"),MB={sticky:ve,zIndex:we,teleport:[String,Object],highlightColor:String,stickyOffsetTop:wr(0),indexList:{type:Array,default:RB}},Ob=Symbol(Ib);var NB=ye({name:Ib,props:MB,emits:["select","change"],setup(e,{emit:t,slots:n}){const r=re(),a=re(),o=re(""),i=kr(),l=ki(r),{children:s,linkChildren:c}=hn(Ob);let u;c({props:e});const f=oe(()=>{if(ut(e.zIndex))return{zIndex:+e.zIndex+1}}),d=oe(()=>{if(e.highlightColor)return{color:e.highlightColor}}),m=(k,$)=>{for(let R=s.length-1;R>=0;R--){const D=R>0?$[R-1].height:0,j=e.sticky?D+e.stickyOffsetTop:0;if(k+j>=$[R].top)return R}return-1},y=k=>s.find($=>String($.index)===k),g=()=>{if(gi(r))return;const{sticky:k,indexList:$}=e,R=Ia(l.value),D=wt(l),j=s.map(N=>N.getRect(l.value,D));let M=-1;if(u){const N=y(u);if(N){const F=N.getRect(l.value,D);M=m(F.top,j)}}else M=m(R,j);o.value=$[M],k&&s.forEach((N,F)=>{const{state:z,$el:X}=N;if(F===M||F===M-1){const Y=X.getBoundingClientRect();z.left=Y.left,z.width=Y.width}else z.left=null,z.width=null;if(F===M)z.active=!0,z.top=Math.max(e.stickyOffsetTop,j[F].top-R)+D.top;else if(F===M-1&&u===""){const Y=j[M].top-R;z.active=Y>0,z.top=Y+D.top-j[F].height}else z.active=!1}),u=""},A=()=>{Ke(g)};jt("scroll",g,{target:l,passive:!0}),Et(A),Ie(()=>e.indexList,A),Ie(o,k=>{k&&t("change",k)});const h=()=>e.indexList.map(k=>{const $=k===o.value;return C("span",{class:Qu("index",{active:$}),style:$?d.value:void 0,"data-index":k},[k])}),p=k=>{u=String(k);const $=y(u);if($){const R=Ia(l.value),D=wt(l),{offsetHeight:j}=document.documentElement;if($.$el.scrollIntoView(),R===j-D.height){g();return}e.sticky&&e.stickyOffsetTop&&Yc(Vs()-e.stickyOffsetTop),t("select",$.index)}},b=k=>{const{index:$}=k.dataset;$&&p($)},v=k=>{b(k.target)};let x;const _=k=>{if(i.move(k),i.isVertical()){Lt(k);const{clientX:$,clientY:R}=k.touches[0],D=document.elementFromPoint($,R);if(D){const{index:j}=D.dataset;j&&x!==j&&(x=j,b(D))}}},S=()=>C("div",{ref:a,class:Qu("sidebar"),style:f.value,onClick:v,onTouchstartPassive:i.start},[h()]);return dt({scrollTo:p}),jt("touchmove",_,{target:a}),()=>{var k;return C("div",{ref:r,class:Qu()},[e.teleport?C(js,{to:e.teleport},{default:()=>[S()]}):S(),(k=n.default)==null?void 0:k.call(n)])}}});const[FB,zB]=Ee("index-anchor"),jB={index:we};var UB=ye({name:FB,props:jB,setup(e,{slots:t}){const n=He({top:0,left:null,rect:{top:0,height:0},width:null,active:!1}),r=re(),{parent:a}=cn(Ob);if(!a)return;const o=()=>n.active&&a.props.sticky,i=oe(()=>{const{zIndex:s,highlightColor:c}=a.props;if(o())return Ue(bo(s),{left:n.left?`${n.left}px`:void 0,width:n.width?`${n.width}px`:void 0,transform:n.top?`translate3d(0, ${n.top}px, 0)`:void 0,color:c})});return dt({state:n,getRect:(s,c)=>{const u=wt(r);return n.rect.height=u.height,s===window||s===document.body?n.rect.top=u.top+Vs():n.rect.top=u.top+Ia(s)-c.top,n.rect}}),()=>{const s=o();return C("div",{ref:r,style:{height:s?`${n.rect.height}px`:void 0}},[C("div",{style:i.value,class:[zB({sticky:s}),{[Bp]:s}]},[t.default?t.default():e.index])])}}});const VB=Se(UB),HB=Se(NB),[WB,Ro,qB]=Ee("list"),YB={error:Boolean,offset:$e(300),loading:Boolean,finished:Boolean,errorText:String,direction:Oe("down"),loadingText:String,finishedText:String,immediateCheck:ve};var GB=ye({name:WB,props:YB,emits:["load","update:error","update:loading"],setup(e,{emit:t,slots:n}){const r=re(!1),a=re(),o=re(),i=C3(),l=ki(a),s=()=>{Ke(()=>{if(r.value||e.finished||e.error||(i==null?void 0:i.value)===!1)return;const{offset:m,direction:y}=e,g=wt(l);if(!g.height||gi(a))return;let A=!1;const h=wt(o);y==="up"?A=g.top-h.top<=m:A=h.bottom-g.bottom<=m,A&&(r.value=!0,t("update:loading",!0),t("load"))})},c=()=>{if(e.finished){const m=n.finished?n.finished():e.finishedText;if(m)return C("div",{class:Ro("finished-text")},[m])}},u=()=>{t("update:error",!1),s()},f=()=>{if(e.error){const m=n.error?n.error():e.errorText;if(m)return C("div",{role:"button",class:Ro("error-text"),tabindex:0,onClick:u},[m])}},d=()=>{if(r.value&&!e.finished)return C("div",{class:Ro("loading")},[n.loading?n.loading():C(or,{class:Ro("loading-icon")},{default:()=>[e.loadingText||qB("loading")]})])};return Ie(()=>[e.loading,e.finished,e.error],s),i&&Ie(i,m=>{m&&s()}),zs(()=>{r.value=e.loading}),Et(()=>{e.immediateCheck&&s()}),dt({check:s}),jt("scroll",s,{target:l,passive:!0}),()=>{var m;const y=(m=n.default)==null?void 0:m.call(n),g=C("div",{ref:o,class:Ro("placeholder")},null);return C("div",{ref:a,role:"feed",class:Ro(),"aria-busy":r.value},[e.direction==="down"?y:g,d(),c(),f(),e.direction==="up"?y:g])}}});const KB=Se(GB),[QB,Dr]=Ee("nav-bar"),XB={title:String,fixed:Boolean,zIndex:we,border:ve,leftText:String,rightText:String,leftArrow:Boolean,placeholder:Boolean,safeAreaInsetTop:Boolean};var ZB=ye({name:QB,props:XB,emits:["click-left","click-right"],setup(e,{emit:t,slots:n}){const r=re(),a=Xc(r,Dr),o=u=>t("click-left",u),i=u=>t("click-right",u),l=()=>n.left?n.left():[e.leftArrow&&C(tt,{class:Dr("arrow"),name:"arrow-left"},null),e.leftText&&C("span",{class:Dr("text")},[e.leftText])],s=()=>n.right?n.right():C("span",{class:Dr("text")},[e.rightText]),c=()=>{const{title:u,fixed:f,border:d,zIndex:m}=e,y=bo(m),g=e.leftArrow||e.leftText||n.left,A=e.rightText||n.right;return C("div",{ref:r,style:y,class:[Dr({fixed:f}),{[Bp]:d,"van-safe-area-top":e.safeAreaInsetTop}]},[C("div",{class:Dr("content")},[g&&C("div",{class:[Dr("left"),bn],onClick:o},[l()]),C("div",{class:[Dr("title"),"van-ellipsis"]},[n.title?n.title():u]),A&&C("div",{class:[Dr("right"),bn],onClick:i},[s()])])])};return()=>e.fixed&&e.placeholder?a(c):c()}});const JB=Se(ZB),[eL,Vi]=Ee("notice-bar"),tL={text:String,mode:String,color:String,delay:$e(1),speed:$e(60),leftIcon:String,wrapable:Boolean,background:String,scrollable:{type:Boolean,default:null}};var nL=ye({name:eL,props:tL,emits:["close","replay"],setup(e,{emit:t,slots:n}){let r=0,a=0,o;const i=re(),l=re(),s=He({show:!0,offset:0,duration:0}),c=()=>{if(n["left-icon"])return n["left-icon"]();if(e.leftIcon)return C(tt,{class:Vi("left-icon"),name:e.leftIcon},null)},u=()=>{if(e.mode==="closeable")return"cross";if(e.mode==="link")return"arrow"},f=A=>{e.mode==="closeable"&&(s.show=!1,t("close",A))},d=()=>{if(n["right-icon"])return n["right-icon"]();const A=u();if(A)return C(tt,{name:A,class:Vi("right-icon"),onClick:f},null)},m=()=>{s.offset=r,s.duration=0,An(()=>{ga(()=>{s.offset=-a,s.duration=(a+r)/+e.speed,t("replay")})})},y=()=>{const A=e.scrollable===!1&&!e.wrapable,h={transform:s.offset?`translateX(${s.offset}px)`:"",transitionDuration:`${s.duration}s`};return C("div",{ref:i,role:"marquee",class:Vi("wrap")},[C("div",{ref:l,style:h,class:[Vi("content"),{"van-ellipsis":A}],onTransitionend:m},[n.default?n.default():e.text])])},g=()=>{const{delay:A,speed:h,scrollable:p}=e,b=ut(A)?+A*1e3:0;r=0,a=0,s.offset=0,s.duration=0,clearTimeout(o),o=setTimeout(()=>{if(!i.value||!l.value||p===!1)return;const v=wt(i).width,x=wt(l).width;(p||x>v)&&ga(()=>{r=v,a=x,s.offset=-a,s.duration=a/+h})},b)};return Qc(g),Si(g),jt("pageshow",g),dt({reset:g}),Ie(()=>[e.text,e.scrollable],g),()=>{const{color:A,wrapable:h,background:p}=e;return Fe(C("div",{role:"alert",class:Vi({wrapable:h}),style:{color:A,background:p}},[c(),y(),d()]),[[We,s.show]])}}});const rL=Se(nL),[aL,oL]=Ee("notify"),iL=Ue({},Ti,{type:Oe("danger"),color:String,message:we,position:Oe("top"),className:St,background:String,lockScroll:Boolean});var Bb=ye({name:aL,props:iL,emits:["update:show"],setup(e,{emit:t,slots:n}){const r=a=>t("update:show",a);return()=>C(ir,{show:e.show,class:[oL([e.type]),e.className],style:{color:e.color,background:e.background},overlay:!1,position:e.position,duration:.2,lockScroll:e.lockScroll,"onUpdate:show":r},{default:()=>[n.default?n.default():e.message]})}});let Dg,Zo;const sL=e=>Pn(e)?e:{message:e};function lL(){({instance:Zo}=nu({setup(){const{state:e,toggle:t}=tu();return()=>C(Bb,at(e,{"onUpdate:show":t}),null)}}))}function On(e){if(!!La)return Zo||lL(),e=Ue({},On.currentOptions,sL(e)),Zo.open(e),clearTimeout(Dg),e.duration>0&&(Dg=window.setTimeout(On.clear,e.duration)),Zo}const Lb=()=>({type:"danger",color:void 0,message:"",onClose:void 0,onClick:void 0,onOpened:void 0,duration:3e3,position:void 0,className:"",lockScroll:!1,background:void 0});On.clear=()=>{Zo&&Zo.toggle(!1)};On.currentOptions=Lb();On.setDefaultOptions=e=>{Ue(On.currentOptions,e)};On.resetDefaultOptions=()=>{On.currentOptions=Lb()};On.Component=Se(Bb);On.install=e=>{e.use(On.Component),e.config.globalProperties.$notify=On};const[cL,ps]=Ee("key"),uL=C("svg",{class:ps("collapse-icon"),viewBox:"0 0 30 24"},[C("path",{d:"M26 13h-2v2h2v-2zm-8-3h2V8h-2v2zm2-4h2V4h-2v2zm2 4h4V4h-2v4h-2v2zm-7 14 3-3h-6l3 3zM6 13H4v2h2v-2zm16 0H8v2h14v-2zm-12-3h2V8h-2v2zM28 0l1 1 1 1v15l-1 2H1l-1-2V2l1-1 1-1zm0 2H2v15h26V2zM6 4v2H4V4zm10 2h2V4h-2v2zM8 9v1H4V8zm8 0v1h-2V8zm-6-5v2H8V4zm4 0v2h-2V4z",fill:"currentColor"},null)]),dL=C("svg",{class:ps("delete-icon"),viewBox:"0 0 32 22"},[C("path",{d:"M28 0a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10.4a2 2 0 0 1-1.4-.6L1 13.1c-.6-.5-.9-1.3-.9-2 0-1 .3-1.7.9-2.2L9 .6a2 2 0 0 1 1.4-.6zm0 2H10.4l-8.2 8.3a1 1 0 0 0-.3.7c0 .3.1.5.3.7l8.2 8.4H28a2 2 0 0 0 2-2V4c0-1.1-.9-2-2-2zm-5 4a1 1 0 0 1 .7.3 1 1 0 0 1 0 1.4L20.4 11l3.3 3.3c.2.2.3.5.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3L19 12.4l-3.4 3.3a1 1 0 0 1-.6.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.2.1-.5.3-.7l3.3-3.3-3.3-3.3A1 1 0 0 1 14 7c0-.3.1-.5.3-.7A1 1 0 0 1 15 6a1 1 0 0 1 .6.3L19 9.6l3.3-3.3A1 1 0 0 1 23 6z",fill:"currentColor"},null)]);var Xu=ye({name:cL,props:{type:String,text:we,color:String,wider:Boolean,large:Boolean,loading:Boolean},emits:["press"],setup(e,{emit:t,slots:n}){const r=re(!1),a=kr(),o=c=>{a.start(c),r.value=!0},i=c=>{a.move(c),a.direction.value&&(r.value=!1)},l=c=>{r.value&&(n.default||Lt(c),r.value=!1,t("press",e.text,e.type))},s=()=>{if(e.loading)return C(or,{class:ps("loading-icon")},null);const c=n.default?n.default():e.text;switch(e.type){case"delete":return c||dL;case"extra":return c||uL;default:return c}};return()=>C("div",{class:ps("wrapper",{wider:e.wider}),onTouchstartPassive:o,onTouchmovePassive:i,onTouchend:l,onTouchcancel:l},[C("div",{role:"button",tabindex:0,class:ps([e.color,{large:e.large,active:r.value,delete:e.type==="delete"}])},[s()])])}});const[fL,ia]=Ee("number-keyboard"),pL={show:Boolean,title:String,theme:Oe("default"),zIndex:we,teleport:[String,Object],maxlength:$e(1/0),modelValue:Oe(""),transition:ve,blurOnClose:ve,showDeleteKey:ve,randomKeyOrder:Boolean,closeButtonText:String,deleteButtonText:String,closeButtonLoading:Boolean,hideOnClickOutside:ve,safeAreaInsetBottom:ve,extraKey:{type:[String,Array],default:""}};function hL(e){for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1)),r=e[t];e[t]=e[n],e[n]=r}return e}var mL=ye({name:fL,props:pL,emits:["show","hide","blur","input","close","delete","update:modelValue"],setup(e,{emit:t,slots:n}){const r=re(),a=()=>{const g=Array(9).fill("").map((A,h)=>({text:h+1}));return e.randomKeyOrder&&hL(g),g},o=()=>[...a(),{text:e.extraKey,type:"extra"},{text:0},{text:e.showDeleteKey?e.deleteButtonText:"",type:e.showDeleteKey?"delete":""}],i=()=>{const g=a(),{extraKey:A}=e,h=Array.isArray(A)?A:[A];return h.length===1?g.push({text:0,wider:!0},{text:h[0],type:"extra"}):h.length===2&&g.push({text:h[0],type:"extra"},{text:0},{text:h[1],type:"extra"}),g},l=oe(()=>e.theme==="custom"?i():o()),s=()=>{e.show&&t("blur")},c=()=>{t("close"),e.blurOnClose&&s()},u=()=>t(e.show?"show":"hide"),f=(g,A)=>{if(g===""){A==="extra"&&s();return}const h=e.modelValue;A==="delete"?(t("delete"),t("update:modelValue",h.slice(0,h.length-1))):A==="close"?c():h.length<e.maxlength&&(t("input",g),t("update:modelValue",h+g))},d=()=>{const{title:g,theme:A,closeButtonText:h}=e,p=n["title-left"],b=h&&A==="default";if(!!(g||b||p))return C("div",{class:ia("header")},[p&&C("span",{class:ia("title-left")},[p()]),g&&C("h2",{class:ia("title")},[g]),b&&C("button",{type:"button",class:[ia("close"),bn],onClick:c},[h])])},m=()=>l.value.map(g=>{const A={};return g.type==="delete"&&(A.default=n.delete),g.type==="extra"&&(A.default=n["extra-key"]),C(Xu,{key:g.text,text:g.text,type:g.type,wider:g.wider,color:g.color,onPress:f},A)}),y=()=>{if(e.theme==="custom")return C("div",{class:ia("sidebar")},[e.showDeleteKey&&C(Xu,{large:!0,text:e.deleteButtonText,type:"delete",onPress:f},{delete:n.delete}),C(Xu,{large:!0,text:e.closeButtonText,type:"close",color:"blue",loading:e.closeButtonLoading,onPress:f},null)])};return Ie(()=>e.show,g=>{e.transition||t(g?"show":"hide")}),e.hideOnClickOutside&&qc(r,s,{eventName:"touchstart"}),()=>{const g=d(),A=C(Ao,{name:e.transition?"van-slide-up":""},{default:()=>[Fe(C("div",{ref:r,style:bo(e.zIndex),class:ia({unfit:!e.safeAreaInsetBottom,"with-title":!!g}),onAnimationend:u,onTouchstartPassive:Ip},[g,C("div",{class:ia("body")},[C("div",{class:ia("keys")},[m()]),y()])]),[[We,e.show]])]});return e.teleport?C(js,{to:e.teleport},{default:()=>[A]}):A}}});const gL=Se(mL),[vL,Mo,Rg]=Ee("pagination"),Zu=(e,t,n)=>({number:e,text:t,active:n}),yL={mode:Oe("multi"),prevText:String,nextText:String,pageCount:$e(0),modelValue:wr(0),totalItems:$e(0),showPageSize:$e(5),itemsPerPage:$e(10),forceEllipses:Boolean};var AL=ye({name:vL,props:yL,emits:["change","update:modelValue"],setup(e,{emit:t,slots:n}){const r=oe(()=>{const{pageCount:u,totalItems:f,itemsPerPage:d}=e,m=+u||Math.ceil(+f/+d);return Math.max(1,m)}),a=oe(()=>{const u=[],f=r.value,d=+e.showPageSize,{modelValue:m,forceEllipses:y}=e;let g=1,A=f;const h=d<f;h&&(g=Math.max(m-Math.floor(d/2),1),A=g+d-1,A>f&&(A=f,g=A-d+1));for(let p=g;p<=A;p++){const b=Zu(p,p,p===m);u.push(b)}if(h&&d>0&&y){if(g>1){const p=Zu(g-1,"...");u.unshift(p)}if(A<f){const p=Zu(A+1,"...");u.push(p)}}return u}),o=(u,f)=>{u=en(u,1,r.value),e.modelValue!==u&&(t("update:modelValue",u),f&&t("change",u))};Sc(()=>o(e.modelValue));const i=()=>C("li",{class:Mo("page-desc")},[n.pageDesc?n.pageDesc():`${e.modelValue}/${r.value}`]),l=()=>{const{mode:u,modelValue:f}=e,d=n["prev-text"],m=f===1;return C("li",{class:[Mo("item",{disabled:m,border:u==="simple",prev:!0}),ds]},[C("button",{type:"button",disabled:m,onClick:()=>o(f-1,!0)},[d?d():e.prevText||Rg("prev")])])},s=()=>{const{mode:u,modelValue:f}=e,d=n["next-text"],m=f===r.value;return C("li",{class:[Mo("item",{disabled:m,border:u==="simple",next:!0}),ds]},[C("button",{type:"button",disabled:m,onClick:()=>o(f+1,!0)},[d?d():e.nextText||Rg("next")])])},c=()=>a.value.map(u=>C("li",{class:[Mo("item",{active:u.active,page:!0}),ds]},[C("button",{type:"button","aria-current":u.active||void 0,onClick:()=>o(u.number,!0)},[n.page?n.page(u):u.text])]));return()=>C("nav",{role:"navigation",class:Mo()},[C("ul",{class:Mo("items")},[l(),e.mode==="simple"?i():c(),s()])])}});const bL=Se(AL),[EL,Hi]=Ee("password-input"),xL={info:String,mask:ve,value:Oe(""),gutter:we,length:$e(6),focused:Boolean,errorInfo:String};var CL=ye({name:EL,props:xL,emits:["focus"],setup(e,{emit:t}){const n=a=>{a.stopPropagation(),t("focus",a)},r=()=>{const a=[],{mask:o,value:i,length:l,gutter:s,focused:c}=e;for(let u=0;u<l;u++){const f=i[u],d=u!==0&&!s,m=c&&u===i.length;let y;u!==0&&s&&(y={marginLeft:ht(s)}),a.push(C("li",{class:[{[RA]:d},Hi("item",{focus:m})],style:y},[o?C("i",{style:{visibility:f?"visible":"hidden"}},null):f,m&&C("div",{class:Hi("cursor")},null)]))}return a};return()=>{const a=e.errorInfo||e.info;return C("div",{class:Hi()},[C("ul",{class:[Hi("security"),{[ds]:!e.gutter}],onTouchstartPassive:n},[r()]),a&&C("div",{class:Hi(e.errorInfo?"error-info":"info")},[a])])}}});const wL=Se(CL);function lr(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Gp(e){var t=lr(e).Element;return e instanceof t||e instanceof Element}function tr(e){var t=lr(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Pb(e){if(typeof ShadowRoot>"u")return!1;var t=lr(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}var yi=Math.round;function ff(){var e=navigator.userAgentData;return e!=null&&e.brands?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function _L(){return!/^((?!chrome|android).)*safari/i.test(ff())}function ic(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),a=1,o=1;t&&tr(e)&&(a=e.offsetWidth>0&&yi(r.width)/e.offsetWidth||1,o=e.offsetHeight>0&&yi(r.height)/e.offsetHeight||1);var i=Gp(e)?lr(e):window,l=i.visualViewport,s=!_L()&&n,c=(r.left+(s&&l?l.offsetLeft:0))/a,u=(r.top+(s&&l?l.offsetTop:0))/o,f=r.width/a,d=r.height/o;return{width:f,height:d,top:u,right:c+f,bottom:u+d,left:c,x:c,y:u}}function $b(e){var t=lr(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function SL(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function kL(e){return e===lr(e)||!tr(e)?$b(e):SL(e)}function Gr(e){return e?(e.nodeName||"").toLowerCase():null}function su(e){return((Gp(e)?e.ownerDocument:e.document)||window.document).documentElement}function TL(e){return ic(su(e)).left+$b(e).scrollLeft}function Kr(e){return lr(e).getComputedStyle(e)}function Kp(e){var t=Kr(e),n=t.overflow,r=t.overflowX,a=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+a+r)}function IL(e){var t=e.getBoundingClientRect(),n=yi(t.width)/e.offsetWidth||1,r=yi(t.height)/e.offsetHeight||1;return n!==1||r!==1}function OL(e,t,n){n===void 0&&(n=!1);var r=tr(t),a=tr(t)&&IL(t),o=su(t),i=ic(e,a,n),l={scrollLeft:0,scrollTop:0},s={x:0,y:0};return(r||!r&&!n)&&((Gr(t)!=="body"||Kp(o))&&(l=kL(t)),tr(t)?(s=ic(t,!0),s.x+=t.clientLeft,s.y+=t.clientTop):o&&(s.x=TL(o))),{x:i.left+l.scrollLeft-s.x,y:i.top+l.scrollTop-s.y,width:i.width,height:i.height}}function BL(e){var t=ic(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Qp(e){return Gr(e)==="html"?e:e.assignedSlot||e.parentNode||(Pb(e)?e.host:null)||su(e)}function Db(e){return["html","body","#document"].indexOf(Gr(e))>=0?e.ownerDocument.body:tr(e)&&Kp(e)?e:Db(Qp(e))}function Ml(e,t){var n;t===void 0&&(t=[]);var r=Db(e),a=r===((n=e.ownerDocument)==null?void 0:n.body),o=lr(r),i=a?[o].concat(o.visualViewport||[],Kp(r)?r:[]):r,l=t.concat(i);return a?l:l.concat(Ml(Qp(i)))}function LL(e){return["table","td","th"].indexOf(Gr(e))>=0}function Mg(e){return!tr(e)||Kr(e).position==="fixed"?null:e.offsetParent}function PL(e){var t=/firefox/i.test(ff()),n=/Trident/i.test(ff());if(n&&tr(e)){var r=Kr(e);if(r.position==="fixed")return null}var a=Qp(e);for(Pb(a)&&(a=a.host);tr(a)&&["html","body"].indexOf(Gr(a))<0;){var o=Kr(a);if(o.transform!=="none"||o.perspective!=="none"||o.contain==="paint"||["transform","perspective"].indexOf(o.willChange)!==-1||t&&o.willChange==="filter"||t&&o.filter&&o.filter!=="none")return a;a=a.parentNode}return null}function Rb(e){for(var t=lr(e),n=Mg(e);n&&LL(n)&&Kr(n).position==="static";)n=Mg(n);return n&&(Gr(n)==="html"||Gr(n)==="body"&&Kr(n).position==="static")?t:n||PL(e)||t}var Jo="top",sc="bottom",Bs="right",io="left",Mb="auto",$L=[Jo,sc,Bs,io],Nb="start",lc="end",DL=[].concat($L,[Mb]).reduce(function(e,t){return e.concat([t,t+"-"+Nb,t+"-"+lc])},[]),RL="beforeRead",ML="read",NL="afterRead",FL="beforeMain",zL="main",jL="afterMain",UL="beforeWrite",VL="write",HL="afterWrite",pf=[RL,ML,NL,FL,zL,jL,UL,VL,HL];function WL(e){var t=new Map,n=new Set,r=[];e.forEach(function(o){t.set(o.name,o)});function a(o){n.add(o.name);var i=[].concat(o.requires||[],o.requiresIfExists||[]);i.forEach(function(l){if(!n.has(l)){var s=t.get(l);s&&a(s)}}),r.push(o)}return e.forEach(function(o){n.has(o.name)||a(o)}),r}function qL(e){var t=WL(e);return pf.reduce(function(n,r){return n.concat(t.filter(function(a){return a.phase===r}))},[])}function YL(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function sa(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return[].concat(n).reduce(function(a,o){return a.replace(/%s/,o)},e)}var qa='Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',GL='Popper: modifier "%s" requires "%s", but "%s" modifier is not available',Ng=["name","enabled","phase","fn","effect","requires","options"];function KL(e){e.forEach(function(t){[].concat(Object.keys(t),Ng).filter(function(n,r,a){return a.indexOf(n)===r}).forEach(function(n){switch(n){case"name":typeof t.name!="string"&&console.error(sa(qa,String(t.name),'"name"','"string"','"'+String(t.name)+'"'));break;case"enabled":typeof t.enabled!="boolean"&&console.error(sa(qa,t.name,'"enabled"','"boolean"','"'+String(t.enabled)+'"'));break;case"phase":pf.indexOf(t.phase)<0&&console.error(sa(qa,t.name,'"phase"',"either "+pf.join(", "),'"'+String(t.phase)+'"'));break;case"fn":typeof t.fn!="function"&&console.error(sa(qa,t.name,'"fn"','"function"','"'+String(t.fn)+'"'));break;case"effect":t.effect!=null&&typeof t.effect!="function"&&console.error(sa(qa,t.name,'"effect"','"function"','"'+String(t.fn)+'"'));break;case"requires":t.requires!=null&&!Array.isArray(t.requires)&&console.error(sa(qa,t.name,'"requires"','"array"','"'+String(t.requires)+'"'));break;case"requiresIfExists":Array.isArray(t.requiresIfExists)||console.error(sa(qa,t.name,'"requiresIfExists"','"array"','"'+String(t.requiresIfExists)+'"'));break;case"options":case"data":break;default:console.error('PopperJS: an invalid property has been provided to the "'+t.name+'" modifier, valid properties are '+Ng.map(function(r){return'"'+r+'"'}).join(", ")+'; but "'+n+'" was provided.')}t.requires&&t.requires.forEach(function(r){e.find(function(a){return a.name===r})==null&&console.error(sa(GL,String(t.name),r,r))})})})}function QL(e,t){var n=new Set;return e.filter(function(r){var a=t(r);if(!n.has(a))return n.add(a),!0})}function lu(e){return e.split("-")[0]}function XL(e){var t=e.reduce(function(n,r){var a=n[r.name];return n[r.name]=a?Object.assign({},a,r,{options:Object.assign({},a.options,r.options),data:Object.assign({},a.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}function Fb(e){return e.split("-")[1]}function ZL(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function JL(e){var t=e.reference,n=e.element,r=e.placement,a=r?lu(r):null,o=r?Fb(r):null,i=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,s;switch(a){case Jo:s={x:i,y:t.y-n.height};break;case sc:s={x:i,y:t.y+t.height};break;case Bs:s={x:t.x+t.width,y:l};break;case io:s={x:t.x-n.width,y:l};break;default:s={x:t.x,y:t.y}}var c=a?ZL(a):null;if(c!=null){var u=c==="y"?"height":"width";switch(o){case Nb:s[c]=s[c]-(t[u]/2-n[u]/2);break;case lc:s[c]=s[c]+(t[u]/2-n[u]/2);break}}return s}var Fg="Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.",eP="Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.",zg={placement:"bottom",modifiers:[],strategy:"absolute"};function jg(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function tP(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,a=t.defaultOptions,o=a===void 0?zg:a;return function(l,s,c){c===void 0&&(c=o);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},zg,o),modifiersData:{},elements:{reference:l,popper:s},attributes:{},styles:{}},f=[],d=!1,m={state:u,setOptions:function(h){var p=typeof h=="function"?h(u.options):h;g(),u.options=Object.assign({},o,u.options,p),u.scrollParents={reference:Gp(l)?Ml(l):l.contextElement?Ml(l.contextElement):[],popper:Ml(s)};var b=qL(XL([].concat(r,u.options.modifiers)));u.orderedModifiers=b.filter(function(D){return D.enabled});{var v=QL([].concat(b,u.options.modifiers),function(D){var j=D.name;return j});if(KL(v),lu(u.options.placement)===Mb){var x=u.orderedModifiers.find(function(D){var j=D.name;return j==="flip"});x||console.error(['Popper: "auto" placements require the "flip" modifier be',"present and enabled to work."].join(" "))}var _=Kr(s),S=_.marginTop,k=_.marginRight,$=_.marginBottom,R=_.marginLeft;[S,k,$,R].some(function(D){return parseFloat(D)})&&console.warn(['Popper: CSS "margin" styles cannot be used to apply padding',"between the popper and its reference element or boundary.","To replicate margin, use the `offset` modifier, as well as","the `padding` option in the `preventOverflow` and `flip`","modifiers."].join(" "))}return y(),m.update()},forceUpdate:function(){if(!d){var h=u.elements,p=h.reference,b=h.popper;if(!jg(p,b)){console.error(Fg);return}u.rects={reference:OL(p,Rb(b),u.options.strategy==="fixed"),popper:BL(b)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(D){return u.modifiersData[D.name]=Object.assign({},D.data)});for(var v=0,x=0;x<u.orderedModifiers.length;x++){if(v+=1,v>100){console.error(eP);break}if(u.reset===!0){u.reset=!1,x=-1;continue}var _=u.orderedModifiers[x],S=_.fn,k=_.options,$=k===void 0?{}:k,R=_.name;typeof S=="function"&&(u=S({state:u,options:$,name:R,instance:m})||u)}}},update:YL(function(){return new Promise(function(A){m.forceUpdate(),A(u)})}),destroy:function(){g(),d=!0}};if(!jg(l,s))return console.error(Fg),m;m.setOptions(c).then(function(A){!d&&c.onFirstUpdate&&c.onFirstUpdate(A)});function y(){u.orderedModifiers.forEach(function(A){var h=A.name,p=A.options,b=p===void 0?{}:p,v=A.effect;if(typeof v=="function"){var x=v({state:u,name:h,instance:m,options:b}),_=function(){};f.push(x||_)}})}function g(){f.forEach(function(A){return A()}),f=[]}return m}}var _l={passive:!0};function nP(e){var t=e.state,n=e.instance,r=e.options,a=r.scroll,o=a===void 0?!0:a,i=r.resize,l=i===void 0?!0:i,s=lr(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return o&&c.forEach(function(u){u.addEventListener("scroll",n.update,_l)}),l&&s.addEventListener("resize",n.update,_l),function(){o&&c.forEach(function(u){u.removeEventListener("scroll",n.update,_l)}),l&&s.removeEventListener("resize",n.update,_l)}}var rP={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:nP,data:{}};function aP(e){var t=e.state,n=e.name;t.modifiersData[n]=JL({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}var oP={name:"popperOffsets",enabled:!0,phase:"read",fn:aP,data:{}},iP={top:"auto",right:"auto",bottom:"auto",left:"auto"};function sP(e){var t=e.x,n=e.y,r=window,a=r.devicePixelRatio||1;return{x:yi(t*a)/a||0,y:yi(n*a)/a||0}}function Ug(e){var t,n=e.popper,r=e.popperRect,a=e.placement,o=e.variation,i=e.offsets,l=e.position,s=e.gpuAcceleration,c=e.adaptive,u=e.roundOffsets,f=e.isFixed,d=i.x,m=d===void 0?0:d,y=i.y,g=y===void 0?0:y,A=typeof u=="function"?u({x:m,y:g}):{x:m,y:g};m=A.x,g=A.y;var h=i.hasOwnProperty("x"),p=i.hasOwnProperty("y"),b=io,v=Jo,x=window;if(c){var _=Rb(n),S="clientHeight",k="clientWidth";if(_===lr(n)&&(_=su(n),Kr(_).position!=="static"&&l==="absolute"&&(S="scrollHeight",k="scrollWidth")),_=_,a===Jo||(a===io||a===Bs)&&o===lc){v=sc;var $=f&&_===x&&x.visualViewport?x.visualViewport.height:_[S];g-=$-r.height,g*=s?1:-1}if(a===io||(a===Jo||a===sc)&&o===lc){b=Bs;var R=f&&_===x&&x.visualViewport?x.visualViewport.width:_[k];m-=R-r.width,m*=s?1:-1}}var D=Object.assign({position:l},c&&iP),j=u===!0?sP({x:m,y:g}):{x:m,y:g};if(m=j.x,g=j.y,s){var M;return Object.assign({},D,(M={},M[v]=p?"0":"",M[b]=h?"0":"",M.transform=(x.devicePixelRatio||1)<=1?"translate("+m+"px, "+g+"px)":"translate3d("+m+"px, "+g+"px, 0)",M))}return Object.assign({},D,(t={},t[v]=p?g+"px":"",t[b]=h?m+"px":"",t.transform="",t))}function lP(e){var t=e.state,n=e.options,r=n.gpuAcceleration,a=r===void 0?!0:r,o=n.adaptive,i=o===void 0?!0:o,l=n.roundOffsets,s=l===void 0?!0:l;{var c=Kr(t.elements.popper).transitionProperty||"";i&&["transform","top","right","bottom","left"].some(function(f){return c.indexOf(f)>=0})&&console.warn(["Popper: Detected CSS transitions on at least one of the following",'CSS properties: "transform", "top", "right", "bottom", "left".',`

`,'Disable the "computeStyles" modifier\'s `adaptive` option to allow',"for smooth transitions, or remove these properties from the CSS","transition declaration on the popper element if only transitioning","opacity or background-color for example.",`

`,"We recommend using the popper element as a wrapper around an inner","element that can have any CSS property transitioned for animations."].join(" "))}var u={placement:lu(t.placement),variation:Fb(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:a,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ug(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:s})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ug(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:s})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}var cP={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:lP,data:{}};function uP(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},a=t.attributes[n]||{},o=t.elements[n];!tr(o)||!Gr(o)||(Object.assign(o.style,r),Object.keys(a).forEach(function(i){var l=a[i];l===!1?o.removeAttribute(i):o.setAttribute(i,l===!0?"":l)}))})}function dP(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var a=t.elements[r],o=t.attributes[r]||{},i=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=i.reduce(function(s,c){return s[c]="",s},{});!tr(a)||!Gr(a)||(Object.assign(a.style,l),Object.keys(o).forEach(function(s){a.removeAttribute(s)}))})}}var fP={name:"applyStyles",enabled:!0,phase:"write",fn:uP,effect:dP,requires:["computeStyles"]},pP=[rP,oP,cP,fP],hP=tP({defaultModifiers:pP});function mP(e,t,n){var r=lu(e),a=[io,Jo].indexOf(r)>=0?-1:1,o=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,i=o[0],l=o[1];return i=i||0,l=(l||0)*a,[io,Bs].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}function gP(e){var t=e.state,n=e.options,r=e.name,a=n.offset,o=a===void 0?[0,0]:a,i=DL.reduce(function(u,f){return u[f]=mP(f,t.rects,o),u},{}),l=i[t.placement],s=l.x,c=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=s,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=i}var vP={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:gP};const[yP,Ya]=Ee("popover"),AP=["show","overlay","duration","teleport","overlayStyle","overlayClass","closeOnClickOverlay"],bP={show:Boolean,theme:Oe("light"),overlay:Boolean,actions:qt(),trigger:Oe("click"),duration:we,showArrow:ve,placement:Oe("bottom"),iconPrefix:String,overlayClass:St,overlayStyle:Object,closeOnClickAction:ve,closeOnClickOverlay:ve,closeOnClickOutside:ve,offset:{type:Array,default:()=>[0,8]},teleport:{type:[String,Object],default:"body"}};var EP=ye({name:yP,props:bP,emits:["select","touchstart","update:show"],setup(e,{emit:t,slots:n,attrs:r}){let a;const o=re(),i=re(),l=re(),s=()=>({placement:e.placement,modifiers:[{name:"computeStyles",options:{adaptive:!1,gpuAcceleration:!1}},Ue({},vP,{options:{offset:e.offset}})]}),c=()=>i.value&&l.value?hP(i.value,l.value.popupRef.value,s()):null,u=()=>{Ke(()=>{!e.show||(a?a.setOptions(s()):a=c())})},f=h=>t("update:show",h),d=()=>{e.trigger==="click"&&f(!e.show)},m=(h,p)=>{h.disabled||(t("select",h,p),e.closeOnClickAction&&f(!1))},y=()=>{e.show&&e.closeOnClickOutside&&(!e.overlay||e.closeOnClickOverlay)&&f(!1)},g=(h,p)=>n.action?n.action({action:h,index:p}):[h.icon&&C(tt,{name:h.icon,classPrefix:e.iconPrefix,class:Ya("action-icon")},null),C("div",{class:[Ya("action-text"),Bp]},[h.text])],A=(h,p)=>{const{icon:b,color:v,disabled:x,className:_}=h;return C("div",{role:"menuitem",class:[Ya("action",{disabled:x,"with-icon":b}),_],style:{color:v},tabindex:x?void 0:0,"aria-disabled":x||void 0,onClick:()=>m(h,p)},[g(h,p)])};return Et(()=>{u(),Sc(()=>{var h;o.value=(h=l.value)==null?void 0:h.popupRef.value})}),rr(()=>{a&&(a.destroy(),a=null)}),Ie(()=>[e.show,e.offset,e.placement],u),qc([i,o],y,{eventName:"touchstart"}),()=>{var h;return C(lt,null,[C("span",{ref:i,class:Ya("wrapper"),onClick:d},[(h=n.reference)==null?void 0:h.call(n)]),C(ir,at({ref:l,class:Ya([e.theme]),position:"",transition:"van-popover-zoom",lockScroll:!1,"onUpdate:show":f},r,Ct(e,AP)),{default:()=>[e.showArrow&&C("div",{class:Ya("arrow")},null),C("div",{role:"menu",class:Ya("content")},[n.default?n.default():e.actions.map(A)])]})])}}});const xP=Se(EP),[CP,Ju]=Ee("progress"),wP={color:String,inactive:Boolean,pivotText:String,textColor:String,showPivot:ve,pivotColor:String,trackColor:String,strokeWidth:we,percentage:{type:we,default:0,validator:e=>e>=0&&e<=100}};var _P=ye({name:CP,props:wP,setup(e){const t=oe(()=>e.inactive?void 0:e.color),n=()=>{const{textColor:r,pivotText:a,pivotColor:o,percentage:i}=e,l=a!=null?a:`${i}%`;if(e.showPivot&&l){const s={color:r,left:`${+i}%`,transform:`translate(-${+i}%,-50%)`,background:o||t.value};return C("span",{style:s,class:Ju("pivot",{inactive:e.inactive})},[l])}};return()=>{const{trackColor:r,percentage:a,strokeWidth:o}=e,i={background:r,height:ht(o)},l={width:`${a}%`,background:t.value};return C("div",{class:Ju(),style:i},[C("span",{class:Ju("portion",{inactive:e.inactive}),style:l},null),n()])}}});const SP=Se(_P),[kP,Wi,TP]=Ee("pull-refresh"),zb=50,IP=["pulling","loosing","success"],OP={disabled:Boolean,modelValue:Boolean,headHeight:$e(zb),successText:String,pullingText:String,loosingText:String,loadingText:String,pullDistance:we,successDuration:$e(500),animationDuration:$e(300)};var BP=ye({name:kP,props:OP,emits:["change","refresh","update:modelValue"],setup(e,{emit:t,slots:n}){let r;const a=re(),o=re(),i=ki(a),l=He({status:"normal",distance:0,duration:0}),s=kr(),c=()=>{if(e.headHeight!==zb)return{height:`${e.headHeight}px`}},u=()=>l.status!=="loading"&&l.status!=="success"&&!e.disabled,f=v=>{const x=+(e.pullDistance||e.headHeight);return v>x&&(v<x*2?v=x+(v-x)/2:v=x*1.5+(v-x*2)/4),Math.round(v)},d=(v,x)=>{const _=+(e.pullDistance||e.headHeight);l.distance=v,x?l.status="loading":v===0?l.status="normal":v<_?l.status="pulling":l.status="loosing",t("change",{status:l.status,distance:v})},m=()=>{const{status:v}=l;return v==="normal"?"":e[`${v}Text`]||TP(v)},y=()=>{const{status:v,distance:x}=l;if(n[v])return n[v]({distance:x});const _=[];return IP.includes(v)&&_.push(C("div",{class:Wi("text")},[m()])),v==="loading"&&_.push(C(or,{class:Wi("loading")},{default:m})),_},g=()=>{l.status="success",setTimeout(()=>{d(0)},+e.successDuration)},A=v=>{r=Ia(i.value)===0,r&&(l.duration=0,s.start(v))},h=v=>{u()&&A(v)},p=v=>{if(u()){r||A(v);const{deltaY:x}=s;s.move(v),r&&x.value>=0&&s.isVertical()&&(Lt(v),d(f(x.value)))}},b=()=>{r&&s.deltaY.value&&u()&&(l.duration=+e.animationDuration,l.status==="loosing"?(d(+e.headHeight,!0),t("update:modelValue",!0),Ke(()=>t("refresh"))):d(0))};return Ie(()=>e.modelValue,v=>{l.duration=+e.animationDuration,v?d(+e.headHeight,!0):n.success||e.successText?g():d(0,!1)}),jt("touchmove",p,{target:o}),()=>{var v;const x={transitionDuration:`${l.duration}ms`,transform:l.distance?`translate3d(0,${l.distance}px, 0)`:""};return C("div",{ref:a,class:Wi()},[C("div",{ref:o,class:Wi("track"),style:x,onTouchstartPassive:h,onTouchend:b,onTouchcancel:b},[C("div",{class:Wi("head"),style:c()},[y()]),(v=n.default)==null?void 0:v.call(n)])])}}});const LP=Se(BP),[PP,Sl]=Ee("rate");function $P(e,t,n,r){return e>=t?{status:"full",value:1}:e+.5>=t&&n&&!r?{status:"half",value:.5}:e+1>=t&&n&&r?{status:"half",value:Math.round((e-t+1)*1e10)/1e10}:{status:"void",value:0}}const DP={size:we,icon:Oe("star"),color:String,count:$e(5),gutter:we,readonly:Boolean,disabled:Boolean,voidIcon:Oe("star-o"),allowHalf:Boolean,voidColor:String,touchable:ve,iconPrefix:String,modelValue:wr(0),disabledColor:String};var RP=ye({name:PP,props:DP,emits:["change","update:modelValue"],setup(e,{emit:t}){const n=kr(),[r,a]=ou(),o=re(),i=()=>e.readonly||e.disabled||!e.touchable,l=oe(()=>Array(+e.count).fill("").map((p,b)=>$P(e.modelValue,b+1,e.allowHalf,e.readonly)));let s,c,u=Number.MAX_SAFE_INTEGER,f=Number.MIN_SAFE_INTEGER;const d=()=>{c=wt(o);const p=r.value.map(wt);s=[],p.forEach((b,v)=>{u=Math.min(b.top,u),f=Math.max(b.top,f),e.allowHalf?s.push({score:v+.5,left:b.left,top:b.top,height:b.height},{score:v+1,left:b.left+b.width/2,top:b.top,height:b.height}):s.push({score:v+1,left:b.left,top:b.top,height:b.height})})},m=(p,b)=>{for(let v=s.length-1;v>0;v--)if(b>=c.top&&b<=c.bottom){if(p>s[v].left&&b>=s[v].top&&b<=s[v].top+s[v].height)return s[v].score}else{const x=b<c.top?u:f;if(p>s[v].left&&s[v].top===x)return s[v].score}return e.allowHalf?.5:1},y=p=>{!e.disabled&&!e.readonly&&p!==e.modelValue&&(t("update:modelValue",p),t("change",p))},g=p=>{i()||(n.start(p),d())},A=p=>{if(!i()&&(n.move(p),n.isHorizontal())){const{clientX:b,clientY:v}=p.touches[0];Lt(p),y(m(b,v))}},h=(p,b)=>{const{icon:v,size:x,color:_,count:S,gutter:k,voidIcon:$,disabled:R,voidColor:D,allowHalf:j,iconPrefix:M,disabledColor:N}=e,F=b+1,z=p.status==="full",X=p.status==="void",Y=j&&p.value>0&&p.value<1;let le;k&&F!==+S&&(le={paddingRight:ht(k)});const Q=ie=>{d(),y(j?m(ie.clientX,ie.clientY):F)};return C("div",{key:b,ref:a(b),role:"radio",style:le,class:Sl("item"),tabindex:R?void 0:0,"aria-setsize":S,"aria-posinset":F,"aria-checked":!X,onClick:Q},[C(tt,{size:x,name:z?v:$,class:Sl("icon",{disabled:R,full:z}),color:R?N:z?_:D,classPrefix:M},null),Y&&C(tt,{size:x,style:{width:p.value+"em"},name:X?$:v,class:Sl("icon",["half",{disabled:R,full:!X}]),color:R?N:X?D:_,classPrefix:M},null)])};return $a(()=>e.modelValue),jt("touchmove",A,{target:o}),()=>C("div",{ref:o,role:"radiogroup",class:Sl({readonly:e.readonly,disabled:e.disabled}),tabindex:e.disabled?void 0:0,"aria-disabled":e.disabled,"aria-readonly":e.readonly,onTouchstartPassive:g},[l.value.map(h)])}});const MP=Se(RP),NP=Se(tO),[FP,qi,zP]=Ee("search"),jP=Ue({},Rp,{label:String,shape:Oe("square"),leftIcon:Oe("search"),clearable:ve,actionText:String,background:String,showAction:Boolean});var UP=ye({name:FP,props:jP,emits:["blur","focus","clear","search","cancel","click-input","click-left-icon","click-right-icon","update:modelValue"],setup(e,{emit:t,slots:n,attrs:r}){const a=Ii(),o=re(),i=()=>{n.action||(t("update:modelValue",""),t("cancel"))},l=x=>{x.keyCode===13&&(Lt(x),t("search",e.modelValue))},s=()=>e.id||`${a}-input`,c=()=>{if(n.label||e.label)return C("label",{class:qi("label"),for:s()},[n.label?n.label():e.label])},u=()=>{if(e.showAction){const x=e.actionText||zP("cancel");return C("div",{class:qi("action"),role:"button",tabindex:0,onClick:i},[n.action?n.action():x])}},f=()=>{var x;return(x=o.value)==null?void 0:x.blur()},d=()=>{var x;return(x=o.value)==null?void 0:x.focus()},m=x=>t("blur",x),y=x=>t("focus",x),g=x=>t("clear",x),A=x=>t("click-input",x),h=x=>t("click-left-icon",x),p=x=>t("click-right-icon",x),b=Object.keys(Rp),v=()=>{const x=Ue({},r,Ct(e,b),{id:s()}),_=S=>t("update:modelValue",S);return C(br,at({ref:o,type:"search",class:qi("field"),border:!1,onBlur:m,onFocus:y,onClear:g,onKeypress:l,"onClick-input":A,"onClick-left-icon":h,"onClick-right-icon":p,"onUpdate:modelValue":_},x),Ct(n,["left-icon","right-icon"]))};return dt({focus:d,blur:f}),()=>{var x;return C("div",{class:qi({"show-action":e.showAction}),style:{background:e.background}},[(x=n.left)==null?void 0:x.call(n),C("div",{class:qi("content",e.shape)},[c(),v()]),u()])}}});const VP=Se(UP),HP=[...Pp,"round","closeOnPopstate","safeAreaInsetBottom"],Vg={qq:"qq",link:"link-o",weibo:"weibo",qrcode:"qr",poster:"photo-o",wechat:"wechat","weapp-qrcode":"miniprogram-o","wechat-moments":"wechat-moments"},[WP,Kn,qP]=Ee("share-sheet"),YP=Ue({},Ti,{title:String,round:ve,options:qt(),cancelText:String,description:String,closeOnPopstate:ve,safeAreaInsetBottom:ve});var GP=ye({name:WP,props:YP,emits:["cancel","select","update:show"],setup(e,{emit:t,slots:n}){const r=d=>t("update:show",d),a=()=>{r(!1),t("cancel")},o=(d,m)=>t("select",d,m),i=()=>{const d=n.title?n.title():e.title,m=n.description?n.description():e.description;if(d||m)return C("div",{class:Kn("header")},[d&&C("h2",{class:Kn("title")},[d]),m&&C("span",{class:Kn("description")},[m])])},l=d=>Vg[d]?C("div",{class:Kn("icon",[d])},[C(tt,{name:Vg[d]||d},null)]):C("img",{src:d,class:Kn("image-icon")},null),s=(d,m)=>{const{name:y,icon:g,className:A,description:h}=d;return C("div",{role:"button",tabindex:0,class:[Kn("option"),A,bn],onClick:()=>o(d,m)},[l(g),y&&C("span",{class:Kn("name")},[y]),h&&C("span",{class:Kn("option-description")},[h])])},c=(d,m)=>C("div",{class:Kn("options",{border:m})},[d.map(s)]),u=()=>{const{options:d}=e;return Array.isArray(d[0])?d.map((m,y)=>c(m,y!==0)):c(d)},f=()=>{var d;const m=(d=e.cancelText)!=null?d:qP("cancel");if(n.cancel||m)return C("button",{type:"button",class:Kn("cancel"),onClick:a},[n.cancel?n.cancel():m])};return()=>C(ir,at({class:Kn(),position:"bottom","onUpdate:show":r},Ct(e,HP)),{default:()=>[i(),u(),f()]})}});const KP=Se(GP),[jb,QP]=Ee("sidebar"),Ub=Symbol(jb),XP={modelValue:$e(0)};var ZP=ye({name:jb,props:XP,emits:["change","update:modelValue"],setup(e,{emit:t,slots:n}){const{linkChildren:r}=hn(Ub),a=()=>+e.modelValue;return r({getActive:a,setActive:i=>{i!==a()&&(t("update:modelValue",i),t("change",i))}}),()=>{var i;return C("div",{role:"tablist",class:QP()},[(i=n.default)==null?void 0:i.call(n)])}}});const Vb=Se(ZP),[JP,Hg]=Ee("sidebar-item"),e$=Ue({},Na,{dot:Boolean,title:String,badge:we,disabled:Boolean,badgeProps:Object});var t$=ye({name:JP,props:e$,emits:["click"],setup(e,{emit:t,slots:n}){const r=Eo(),{parent:a,index:o}=cn(Ub);if(!a)return;const i=()=>{e.disabled||(t("click",o.value),a.setActive(o.value),r())};return()=>{const{dot:l,badge:s,title:c,disabled:u}=e,f=o.value===a.getActive();return C("div",{role:"tab",class:Hg({select:f,disabled:u}),tabindex:u?void 0:0,"aria-selected":f,onClick:i},[C(xo,at({dot:l,class:Hg("text"),content:s},e.badgeProps),{default:()=>[n.title?n.title():c]})])}}});const Hb=Se(t$),[n$,Yi]=Ee("skeleton"),Wb="100%",r$="60%",a$={row:$e(0),title:Boolean,round:Boolean,avatar:Boolean,loading:ve,animate:ve,avatarSize:we,titleWidth:we,avatarShape:Oe("round"),rowWidth:{type:[Number,String,Array],default:Wb}};var o$=ye({name:n$,inheritAttrs:!1,props:a$,setup(e,{slots:t,attrs:n}){const r=()=>{if(e.avatar)return C("div",{class:Yi("avatar",e.avatarShape),style:Da(e.avatarSize)},null)},a=()=>{if(e.title)return C("h3",{class:Yi("title"),style:{width:ht(e.titleWidth)}},null)},o=l=>{const{rowWidth:s}=e;return s===Wb&&l===+e.row-1?r$:Array.isArray(s)?s[l]:s},i=()=>Array(+e.row).fill("").map((l,s)=>C("div",{class:Yi("row"),style:{width:ht(o(s))}},null));return()=>{var l;return e.loading?C("div",at({class:Yi({animate:e.animate,round:e.round})},n),[r(),C("div",{class:Yi("content")},[a(),i()])]):(l=t.default)==null?void 0:l.call(t)}}});const i$=Se(o$),[s$,Gi]=Ee("slider"),l$={min:$e(0),max:$e(100),step:$e(1),range:Boolean,reverse:Boolean,disabled:Boolean,readonly:Boolean,vertical:Boolean,barHeight:we,buttonSize:we,activeColor:String,inactiveColor:String,modelValue:{type:[Number,Array],default:0}};var c$=ye({name:s$,props:l$,emits:["change","drag-end","drag-start","update:modelValue"],setup(e,{emit:t,slots:n}){let r,a,o;const i=re(),l=re(),s=re(),c=kr(),u=oe(()=>Number(e.max)-Number(e.min)),f=oe(()=>{const D=e.vertical?"width":"height";return{background:e.inactiveColor,[D]:ht(e.barHeight)}}),d=D=>e.range&&Array.isArray(D),m=()=>{const{modelValue:D,min:j}=e;return d(D)?`${(D[1]-D[0])*100/u.value}%`:`${(D-Number(j))*100/u.value}%`},y=()=>{const{modelValue:D,min:j}=e;return d(D)?`${(D[0]-Number(j))*100/u.value}%`:"0%"},g=oe(()=>{const j={[e.vertical?"height":"width"]:m(),background:e.activeColor};s.value&&(j.transition="none");const M=()=>e.vertical?e.reverse?"bottom":"top":e.reverse?"right":"left";return j[M()]=y(),j}),A=D=>{const j=+e.min,M=+e.max,N=+e.step;D=en(D,j,M);const F=Math.round((D-j)/N)*N;return BA(j,F)},h=(D,j)=>JSON.stringify(D)===JSON.stringify(j),p=D=>{var j,M;const N=(j=D[0])!=null?j:Number(e.min),F=(M=D[1])!=null?M:Number(e.max);return N>F?[F,N]:[N,F]},b=(D,j)=>{d(D)?D=p(D).map(A):D=A(D),h(D,e.modelValue)||t("update:modelValue",D),j&&!h(D,o)&&t("change",D)},v=D=>{if(D.stopPropagation(),e.disabled||e.readonly)return;const{min:j,reverse:M,vertical:N,modelValue:F}=e,z=wt(i),X=()=>N?M?z.bottom-D.clientY:D.clientY-z.top:M?z.right-D.clientX:D.clientX-z.left,Y=N?z.height:z.width,le=Number(j)+X()/Y*u.value;if(d(F)){const[Q,ie]=F,ne=(Q+ie)/2;le<=ne?b([le,ie],!0):b([Q,le],!0)}else b(le,!0)},x=D=>{e.disabled||e.readonly||(c.start(D),a=e.modelValue,d(a)?o=a.map(A):o=A(a),s.value="start")},_=D=>{if(e.disabled||e.readonly)return;s.value==="start"&&t("drag-start",D),Lt(D,!0),c.move(D),s.value="dragging";const j=wt(i),M=e.vertical?c.deltaY.value:c.deltaX.value,N=e.vertical?j.height:j.width;let F=M/N*u.value;if(e.reverse&&(F=-F),d(o)){const z=e.reverse?1-r:r;a[z]=o[z]+F}else a=o+F;b(a)},S=D=>{e.disabled||e.readonly||(s.value==="dragging"&&(b(a,!0),t("drag-end",D)),s.value="")},k=D=>typeof D=="number"?Gi("button-wrapper",["left","right"][D]):Gi("button-wrapper",e.reverse?"left":"right"),$=(D,j)=>{if(typeof j=="number"){const M=n[j===0?"left-button":"right-button"];if(M)return M({value:D})}return n.button?n.button({value:D}):C("div",{class:Gi("button"),style:Da(e.buttonSize)},null)},R=D=>{const j=typeof D=="number"?e.modelValue[D]:e.modelValue;return C("div",{ref:l,role:"slider",class:k(D),tabindex:e.disabled?void 0:0,"aria-valuemin":e.min,"aria-valuenow":j,"aria-valuemax":e.max,"aria-disabled":e.disabled||void 0,"aria-readonly":e.readonly||void 0,"aria-orientation":e.vertical?"vertical":"horizontal",onTouchstartPassive:M=>{typeof D=="number"&&(r=D),x(M)},onTouchend:S,onTouchcancel:S,onClick:Ip},[$(j,D)])};return b(e.modelValue),$a(()=>e.modelValue),jt("touchmove",_,{target:l}),()=>C("div",{ref:i,style:f.value,class:Gi({vertical:e.vertical,disabled:e.disabled}),onClick:v},[C("div",{class:Gi("bar"),style:g.value},[e.range?[R(0),R(1)]:R()])])}});const u$=Se(c$),[Wg,d$]=Ee("space"),f$={align:String,direction:{type:String,default:"horizontal"},size:{type:[Number,String,Array],default:8},wrap:Boolean,fill:Boolean};function qb(e=[]){const t=[];return e.forEach(n=>{Array.isArray(n)?t.push(...n):n.type===lt?t.push(...qb(n.children)):t.push(n)}),t.filter(n=>{var r;return!(n&&(typeof Comment<"u"&&n.type===Comment||n.type===lt&&((r=n.children)==null?void 0:r.length)===0||n.type===Text&&n.children.trim()===""))})}var p$=ye({name:Wg,props:f$,setup(e,{slots:t}){const n=oe(()=>{var o;return(o=e.align)!=null?o:e.direction==="horizontal"?"center":""}),r=o=>typeof o=="number"?o+"px":o,a=o=>{const i={},l=`${r(Array.isArray(e.size)?e.size[0]:e.size)}`,s=`${r(Array.isArray(e.size)?e.size[1]:e.size)}`;return o?e.wrap?{marginBottom:s}:{}:(e.direction==="horizontal"&&(i.marginRight=l),(e.direction==="vertical"||e.wrap)&&(i.marginBottom=s),i)};return()=>{var o;const i=qb((o=t.default)==null?void 0:o.call(t));return C("div",{class:[d$({[e.direction]:e.direction,[`align-${n.value}`]:n.value,wrap:e.wrap,fill:e.fill})]},[i.map((l,s)=>C("div",{key:`item-${s}`,class:`${Wg}-item`,style:a(s===i.length-1)},[l]))])}}});const h$=Se(p$),[Yb,qg]=Ee("steps"),m$={active:$e(0),direction:Oe("horizontal"),activeIcon:Oe("checked"),iconPrefix:String,finishIcon:String,activeColor:String,inactiveIcon:String,inactiveColor:String},Gb=Symbol(Yb);var g$=ye({name:Yb,props:m$,emits:["click-step"],setup(e,{emit:t,slots:n}){const{linkChildren:r}=hn(Gb);return r({props:e,onClickStep:o=>t("click-step",o)}),()=>{var o;return C("div",{class:qg([e.direction])},[C("div",{class:qg("items")},[(o=n.default)==null?void 0:o.call(n)])])}}});const[v$,la]=Ee("step");var y$=ye({name:v$,setup(e,{slots:t}){const{parent:n,index:r}=cn(Gb);if(!n)return;const a=n.props,o=()=>{const f=+a.active;return r.value<f?"finish":r.value===f?"process":"waiting"},i=()=>o()==="process",l=oe(()=>({background:o()==="finish"?a.activeColor:a.inactiveColor})),s=oe(()=>{if(i())return{color:a.activeColor};if(o()==="waiting")return{color:a.inactiveColor}}),c=()=>n.onClickStep(r.value),u=()=>{const{iconPrefix:f,finishIcon:d,activeIcon:m,activeColor:y,inactiveIcon:g}=a;return i()?t["active-icon"]?t["active-icon"]():C(tt,{class:la("icon","active"),name:m,color:y,classPrefix:f},null):o()==="finish"&&(d||t["finish-icon"])?t["finish-icon"]?t["finish-icon"]():C(tt,{class:la("icon","finish"),name:d,color:y,classPrefix:f},null):t["inactive-icon"]?t["inactive-icon"]():g?C(tt,{class:la("icon"),name:g,classPrefix:f},null):C("i",{class:la("circle"),style:l.value},null)};return()=>{var f;const d=o();return C("div",{class:[Ra,la([a.direction,{[d]:d}])]},[C("div",{class:la("title",{active:i()}),style:s.value,onClick:c},[(f=t.default)==null?void 0:f.call(t)]),C("div",{class:la("circle-container"),onClick:c},[u()]),C("div",{class:la("line"),style:l.value},null)])}}});const A$=Se(y$),[b$,kl]=Ee("stepper"),E$=200,x$=600,Tl=(e,t)=>String(e)===String(t),C$={min:$e(1),max:$e(1/0),name:$e(""),step:$e(1),theme:String,integer:Boolean,disabled:Boolean,showPlus:ve,showMinus:ve,showInput:ve,longPress:ve,allowEmpty:Boolean,modelValue:we,inputWidth:we,buttonSize:we,placeholder:String,disablePlus:Boolean,disableMinus:Boolean,disableInput:Boolean,beforeChange:Function,defaultValue:$e(1),decimalLength:we};var w$=ye({name:b$,props:C$,emits:["plus","blur","minus","focus","change","overlimit","update:modelValue"],setup(e,{emit:t}){const n=k=>{const{min:$,max:R,allowEmpty:D,decimalLength:j}=e;return D&&k===""||(k=tf(String(k),!e.integer),k=k===""?0:+k,k=Number.isNaN(k)?+$:k,k=Math.max(Math.min(+R,k),+$),ut(j)&&(k=k.toFixed(+j))),k},r=()=>{var k;const $=(k=e.modelValue)!=null?k:e.defaultValue,R=n($);return Tl(R,e.modelValue)||t("update:modelValue",R),R};let a;const o=re(),i=re(r()),l=oe(()=>e.disabled||e.disableMinus||i.value<=+e.min),s=oe(()=>e.disabled||e.disablePlus||i.value>=+e.max),c=oe(()=>({width:ht(e.inputWidth),height:ht(e.buttonSize)})),u=oe(()=>Da(e.buttonSize)),f=()=>{const k=n(i.value);Tl(k,i.value)||(i.value=k)},d=k=>{e.beforeChange?Ma(e.beforeChange,{args:[k],done(){i.value=k}}):i.value=k},m=()=>{if(a==="plus"&&s.value||a==="minus"&&l.value){t("overlimit",a);return}const k=a==="minus"?-e.step:+e.step,$=n(BA(+i.value,k));d($),t(a)},y=k=>{const $=k.target,{value:R}=$,{decimalLength:D}=e;let j=tf(String(R),!e.integer);if(ut(D)&&j.includes(".")){const N=j.split(".");j=`${N[0]}.${N[1].slice(0,+D)}`}e.beforeChange?$.value=String(i.value):Tl(R,j)||($.value=j);const M=j===String(+j);d(M?+j:j)},g=k=>{var $;e.disableInput?($=o.value)==null||$.blur():t("focus",k)},A=k=>{const $=k.target,R=n($.value);$.value=String(R),i.value=R,Ke(()=>{t("blur",k),IA()})};let h,p;const b=()=>{p=setTimeout(()=>{m(),b()},E$)},v=()=>{e.longPress&&(h=!1,clearTimeout(p),p=setTimeout(()=>{h=!0,m(),b()},x$))},x=k=>{e.longPress&&(clearTimeout(p),h&&Lt(k))},_=k=>{e.disableInput&&Lt(k)},S=k=>({onClick:$=>{Lt($),a=k,m()},onTouchstartPassive:()=>{a=k,v()},onTouchend:x,onTouchcancel:x});return Ie(()=>[e.max,e.min,e.integer,e.decimalLength],f),Ie(()=>e.modelValue,k=>{Tl(k,i.value)||(i.value=n(k))}),Ie(i,k=>{t("update:modelValue",k),t("change",k,{name:e.name})}),$a(()=>e.modelValue),()=>C("div",{role:"group",class:kl([e.theme])},[Fe(C("button",at({type:"button",style:u.value,class:[kl("minus",{disabled:l.value}),{[bn]:!l.value}],"aria-disabled":l.value||void 0},S("minus")),null),[[We,e.showMinus]]),Fe(C("input",{ref:o,type:e.integer?"tel":"text",role:"spinbutton",class:kl("input"),value:i.value,style:c.value,disabled:e.disabled,readonly:e.disableInput,inputmode:e.integer?"numeric":"decimal",placeholder:e.placeholder,"aria-valuemax":e.max,"aria-valuemin":e.min,"aria-valuenow":i.value,onBlur:A,onInput:y,onFocus:g,onMousedown:_},null),[[We,e.showInput]]),Fe(C("button",at({type:"button",style:u.value,class:[kl("plus",{disabled:s.value}),{[bn]:!s.value}],"aria-disabled":s.value||void 0},S("plus")),null),[[We,e.showPlus]])])}});const _$=Se(w$),S$=Se(g$),[k$,Qn,T$]=Ee("submit-bar"),I$={tip:String,label:String,price:Number,tipIcon:String,loading:Boolean,currency:Oe("\xA5"),disabled:Boolean,textAlign:String,buttonText:String,buttonType:Oe("danger"),buttonColor:String,suffixLabel:String,placeholder:Boolean,decimalLength:$e(2),safeAreaInsetBottom:ve};var O$=ye({name:k$,props:I$,emits:["submit"],setup(e,{emit:t,slots:n}){const r=re(),a=Xc(r,Qn),o=()=>{const{price:u,label:f,currency:d,textAlign:m,suffixLabel:y,decimalLength:g}=e;if(typeof u=="number"){const A=(u/100).toFixed(+g).split("."),h=g?`.${A[1]}`:"";return C("div",{class:Qn("text"),style:{textAlign:m}},[C("span",null,[f||T$("label")]),C("span",{class:Qn("price")},[d,C("span",{class:Qn("price-integer")},[A[0]]),h]),y&&C("span",{class:Qn("suffix-label")},[y])])}},i=()=>{var u;const{tip:f,tipIcon:d}=e;if(n.tip||f)return C("div",{class:Qn("tip")},[d&&C(tt,{class:Qn("tip-icon"),name:d},null),f&&C("span",{class:Qn("tip-text")},[f]),(u=n.tip)==null?void 0:u.call(n)])},l=()=>t("submit"),s=()=>n.button?n.button():C(En,{round:!0,type:e.buttonType,text:e.buttonText,class:Qn("button",e.buttonType),color:e.buttonColor,loading:e.loading,disabled:e.disabled,onClick:l},null),c=()=>{var u,f;return C("div",{ref:r,class:[Qn(),{"van-safe-area-bottom":e.safeAreaInsetBottom}]},[(u=n.top)==null?void 0:u.call(n),i(),C("div",{class:Qn("bar")},[(f=n.default)==null?void 0:f.call(n),o(),s()])])};return()=>e.placeholder?a(c):c()}});const B$=Se(O$),[L$,ed]=Ee("swipe-cell"),P$={name:$e(""),disabled:Boolean,leftWidth:we,rightWidth:we,beforeClose:Function,stopPropagation:Boolean};var $$=ye({name:L$,props:P$,emits:["open","close","click"],setup(e,{emit:t,slots:n}){let r,a,o;const i=re(),l=re(),s=re(),c=He({offset:0,dragging:!1}),u=kr(),f=S=>S.value?wt(S).width:0,d=oe(()=>ut(e.leftWidth)?+e.leftWidth:f(l)),m=oe(()=>ut(e.rightWidth)?+e.rightWidth:f(s)),y=S=>{c.offset=S==="left"?d.value:-m.value,r||(r=!0,t("open",{name:e.name,position:S}))},g=S=>{c.offset=0,r&&(r=!1,t("close",{name:e.name,position:S}))},A=S=>{const k=Math.abs(c.offset),$=.15,R=r?1-$:$,D=S==="left"?d.value:m.value;D&&k>D*R?y(S):g(S)},h=S=>{e.disabled||(o=c.offset,u.start(S))},p=S=>{if(e.disabled)return;const{deltaX:k}=u;u.move(S),u.isHorizontal()&&(a=!0,c.dragging=!0,(!r||k.value*o<0)&&Lt(S,e.stopPropagation),c.offset=en(k.value+o,-m.value,d.value))},b=()=>{c.dragging&&(c.dragging=!1,A(c.offset>0?"left":"right"),setTimeout(()=>{a=!1},0))},v=(S="outside")=>{t("click",S),r&&!a&&Ma(e.beforeClose,{args:[{name:e.name,position:S}],done:()=>g(S)})},x=(S,k)=>$=>{k&&$.stopPropagation(),v(S)},_=(S,k)=>{const $=n[S];if($)return C("div",{ref:k,class:ed(S),onClick:x(S,!0)},[$()])};return dt({open:y,close:g}),qc(i,()=>v("outside"),{eventName:"touchstart"}),jt("touchmove",p,{target:i}),()=>{var S;const k={transform:`translate3d(${c.offset}px, 0, 0)`,transitionDuration:c.dragging?"0s":".6s"};return C("div",{ref:i,class:ed(),onClick:x("cell",a),onTouchstartPassive:h,onTouchend:b,onTouchcancel:b},[C("div",{class:ed("wrapper"),style:k},[_("left",l),(S=n.default)==null?void 0:S.call(n),_("right",s)])])}}});const D$=Se($$),[Kb,Yg]=Ee("tabbar"),R$={route:Boolean,fixed:ve,border:ve,zIndex:we,placeholder:Boolean,activeColor:String,beforeChange:Function,inactiveColor:String,modelValue:$e(0),safeAreaInsetBottom:{type:Boolean,default:null}},Qb=Symbol(Kb);var M$=ye({name:Kb,props:R$,emits:["change","update:modelValue"],setup(e,{emit:t,slots:n}){const r=re(),{linkChildren:a}=hn(Qb),o=Xc(r,Yg),i=()=>{var c;return(c=e.safeAreaInsetBottom)!=null?c:e.fixed},l=()=>{var c;const{fixed:u,zIndex:f,border:d}=e;return C("div",{ref:r,role:"tablist",style:bo(f),class:[Yg({fixed:u}),{[Kc]:d,"van-safe-area-bottom":i()}]},[(c=n.default)==null?void 0:c.call(n)])};return a({props:e,setActive:(c,u)=>{Ma(e.beforeChange,{args:[c],done(){t("update:modelValue",c),t("change",c),u()}})}}),()=>e.fixed&&e.placeholder?o(l):l()}});const N$=Se(M$),[F$,td]=Ee("tabbar-item"),z$=Ue({},Na,{dot:Boolean,icon:String,name:we,badge:we,badgeProps:Object,iconPrefix:String});var j$=ye({name:F$,props:z$,emits:["click"],setup(e,{emit:t,slots:n}){const r=Eo(),a=Gt().proxy,{parent:o,index:i}=cn(Qb);if(!o)return;const l=oe(()=>{var u;const{route:f,modelValue:d}=o.props;if(f&&"$route"in a){const{$route:m}=a,{to:y}=e,g=Pn(y)?y:{path:y};return!!m.matched.find(A=>{const h="path"in g&&g.path===A.path,p="name"in g&&g.name===A.name;return h||p})}return((u=e.name)!=null?u:i.value)===d}),s=u=>{var f;l.value||o.setActive((f=e.name)!=null?f:i.value,r),t("click",u)},c=()=>{if(n.icon)return n.icon({active:l.value});if(e.icon)return C(tt,{name:e.icon,classPrefix:e.iconPrefix},null)};return()=>{var u;const{dot:f,badge:d}=e,{activeColor:m,inactiveColor:y}=o.props,g=l.value?m:y;return C("div",{role:"tab",class:td({active:l.value}),style:{color:g},tabindex:0,"aria-selected":l.value,onClick:s},[C(xo,at({dot:f,class:td("icon"),content:d},e.badgeProps),{default:c}),C("div",{class:td("text")},[(u=n.default)==null?void 0:u.call(n,{active:l.value})])])}}});const U$=Se(j$),[V$,No]=Ee("tree-select"),H$={max:$e(1/0),items:qt(),height:$e(300),selectedIcon:Oe("success"),mainActiveIndex:$e(0),activeId:{type:[Number,String,Array],default:0}};var W$=ye({name:V$,props:H$,emits:["click-nav","click-item","update:activeId","update:mainActiveIndex"],setup(e,{emit:t,slots:n}){const r=c=>Array.isArray(e.activeId)?e.activeId.includes(c):e.activeId===c,a=c=>{const u=()=>{if(c.disabled)return;let f;if(Array.isArray(e.activeId)){f=e.activeId.slice();const d=f.indexOf(c.id);d!==-1?f.splice(d,1):f.length<e.max&&f.push(c.id)}else f=c.id;t("update:activeId",f),t("click-item",c)};return C("div",{key:c.id,class:["van-ellipsis",No("item",{active:r(c.id),disabled:c.disabled})],onClick:u},[c.text,r(c.id)&&C(tt,{name:e.selectedIcon,class:No("selected")},null)])},o=c=>{t("update:mainActiveIndex",c)},i=c=>t("click-nav",c),l=()=>{const c=e.items.map(u=>C(Hb,{dot:u.dot,title:u.text,badge:u.badge,class:[No("nav-item"),u.className],disabled:u.disabled,onClick:i},null));return C(Vb,{class:No("nav"),modelValue:e.mainActiveIndex,onChange:o},{default:()=>[c]})},s=()=>{if(n.content)return n.content();const c=e.items[+e.mainActiveIndex]||{};if(c.children)return c.children.map(a)};return()=>C("div",{class:No(),style:{height:ht(e.height)}},[l(),C("div",{class:No("content")},[s()])])}});const q$=Se(W$),[Y$,Mt,G$]=Ee("uploader");function Gg(e,t){return new Promise(n=>{if(t==="file"){n();return}const r=new FileReader;r.onload=a=>{n(a.target.result)},t==="dataUrl"?r.readAsDataURL(e):t==="text"&&r.readAsText(e)})}function Xb(e,t){return ec(e).some(n=>n.file?mi(t)?t(n.file):n.file.size>t:!1)}function K$(e,t){const n=[],r=[];return e.forEach(a=>{Xb(a,t)?r.push(a):n.push(a)}),{valid:n,invalid:r}}const Q$=/\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i,X$=e=>Q$.test(e);function Zb(e){return e.isImage?!0:e.file&&e.file.type?e.file.type.indexOf("image")===0:e.url?X$(e.url):typeof e.content=="string"?e.content.indexOf("data:image")===0:!1}var Z$=ye({props:{name:we,item:zt(Object),index:Number,imageFit:String,lazyLoad:Boolean,deletable:Boolean,previewSize:[Number,String,Array],beforeDelete:Function},emits:["delete","preview"],setup(e,{emit:t,slots:n}){const r=()=>{const{status:c,message:u}=e.item;if(c==="uploading"||c==="failed"){const f=c==="failed"?C(tt,{name:"close",class:Mt("mask-icon")},null):C(or,{class:Mt("loading")},null),d=ut(u)&&u!=="";return C("div",{class:Mt("mask")},[f,d&&C("div",{class:Mt("mask-message")},[u])])}},a=c=>{const{name:u,item:f,index:d,beforeDelete:m}=e;c.stopPropagation(),Ma(m,{args:[f,{name:u,index:d}],done:()=>t("delete")})},o=()=>t("preview"),i=()=>{if(e.deletable&&e.item.status!=="uploading"){const c=n["preview-delete"];return C("div",{role:"button",class:Mt("preview-delete",{shadow:!c}),tabindex:0,"aria-label":G$("delete"),onClick:a},[c?c():C(tt,{name:"cross",class:Mt("preview-delete-icon")},null)])}},l=()=>{if(n["preview-cover"]){const{index:c,item:u}=e;return C("div",{class:Mt("preview-cover")},[n["preview-cover"](Ue({index:c},u))])}},s=()=>{const{item:c,lazyLoad:u,imageFit:f,previewSize:d}=e;return Zb(c)?C(iu,{fit:f,src:c.content||c.url,class:Mt("preview-image"),width:Array.isArray(d)?d[0]:d,height:Array.isArray(d)?d[1]:d,lazyLoad:u,onClick:o},{default:l}):C("div",{class:Mt("file"),style:Da(e.previewSize)},[C(tt,{class:Mt("file-icon"),name:"description"},null),C("div",{class:[Mt("file-name"),"van-ellipsis"]},[c.file?c.file.name:c.url]),l()])};return()=>C("div",{class:Mt("preview")},[s(),r(),i()])}});const J$={name:$e(""),accept:Oe("image/*"),capture:String,multiple:Boolean,disabled:Boolean,readonly:Boolean,lazyLoad:Boolean,maxCount:$e(1/0),imageFit:Oe("cover"),resultType:Oe("dataUrl"),uploadIcon:Oe("photograph"),uploadText:String,deletable:ve,afterRead:Function,showUpload:ve,modelValue:qt(),beforeRead:Function,beforeDelete:Function,previewSize:[Number,String,Array],previewImage:ve,previewOptions:Object,previewFullImage:ve,maxSize:{type:[Number,String,Function],default:1/0}};var e8=ye({name:Y$,props:J$,emits:["delete","oversize","click-upload","close-preview","click-preview","update:modelValue"],setup(e,{emit:t,slots:n}){const r=re(),a=[],o=(v=e.modelValue.length)=>({name:e.name,index:v}),i=()=>{r.value&&(r.value.value="")},l=v=>{if(i(),Xb(v,e.maxSize))if(Array.isArray(v)){const x=K$(v,e.maxSize);if(v=x.valid,t("oversize",x.invalid,o()),!v.length)return}else{t("oversize",v,o());return}v=He(v),t("update:modelValue",[...e.modelValue,...ec(v)]),e.afterRead&&e.afterRead(v,o())},s=v=>{const{maxCount:x,modelValue:_,resultType:S}=e;if(Array.isArray(v)){const k=+x-_.length;v.length>k&&(v=v.slice(0,k)),Promise.all(v.map($=>Gg($,S))).then($=>{const R=v.map((D,j)=>{const M={file:D,status:"",message:""};return $[j]&&(M.content=$[j]),M});l(R)})}else Gg(v,S).then(k=>{const $={file:v,status:"",message:""};k&&($.content=k),l($)})},c=v=>{const{files:x}=v.target;if(e.disabled||!x||!x.length)return;const _=x.length===1?x[0]:[].slice.call(x);if(e.beforeRead){const S=e.beforeRead(_,o());if(!S){i();return}if(Tp(S)){S.then(k=>{s(k||_)}).catch(i);return}}s(_)};let u;const f=()=>t("close-preview"),d=v=>{if(e.previewFullImage){const x=e.modelValue.filter(Zb),_=x.map(S=>(S.file&&!S.url&&S.status!=="failed"&&(S.url=URL.createObjectURL(S.file),a.push(S.url)),S.url)).filter(Boolean);u=Os(Ue({images:_,startPosition:x.indexOf(v),onClose:f},e.previewOptions))}},m=()=>{u&&u.close()},y=(v,x)=>{const _=e.modelValue.slice(0);_.splice(x,1),t("update:modelValue",_),t("delete",v,o(x))},g=(v,x)=>{const _=["imageFit","deletable","previewSize","beforeDelete"],S=Ue(Ct(e,_),Ct(v,_,!0));return C(Z$,at({item:v,index:x,onClick:()=>t("click-preview",v,o(x)),onDelete:()=>y(v,x),onPreview:()=>d(v)},Ct(e,["name","lazyLoad"]),S),Ct(n,["preview-cover","preview-delete"]))},A=()=>{if(e.previewImage)return e.modelValue.map(g)},h=v=>t("click-upload",v),p=()=>{if(e.modelValue.length>=e.maxCount||!e.showUpload)return;const v=e.readonly?null:C("input",{ref:r,type:"file",class:Mt("input"),accept:e.accept,capture:e.capture,multiple:e.multiple,disabled:e.disabled,onChange:c},null);return n.default?C("div",{class:Mt("input-wrapper"),onClick:h},[n.default(),v]):C("div",{class:Mt("upload",{readonly:e.readonly}),style:Da(e.previewSize),onClick:h},[C(tt,{name:e.uploadIcon,class:Mt("upload-icon")},null),e.uploadText&&C("span",{class:Mt("upload-text")},[e.uploadText]),v])},b=()=>{r.value&&!e.disabled&&r.value.click()};return rr(()=>{a.forEach(v=>URL.revokeObjectURL(v))}),dt({chooseFile:b,closeImagePreview:m}),$a(()=>e.modelValue),()=>C("div",{class:Mt()},[C("div",{class:Mt("wrapper",{disabled:e.disabled})},[A(),p()])])}});const t8=Se(e8),n8="3.6.4";function r8(e){[jA,rf,v5,B5,wI,zI,KA,xo,En,e3,s3,$3,sr,N3,vb,q3,Z3,iO,uO,mO,gO,bO,wO,IO,DO,uf,VO,QO,oB,Pt,hB,bB,EB,xb,br,Dp,_B,IB,tt,iu,Os,VB,HB,KB,or,$A,JB,rL,On,gL,qA,bL,wL,Jc,xP,ir,SP,LP,jp,Fp,MP,NP,VP,KP,Vb,Hb,i$,u$,h$,A$,_$,S$,cb,B$,Vp,D$,Hp,Np,oc,N$,U$,Wp,au,At,q$,t8].forEach(n=>{n.install?e.use(n):n.name&&e.component(n.name,n)})}var FH={install:r8,version:n8};const a8=["src"],o8=["src"],i8=["src"],s8=["src"],l8=["src"],c8={__name:"FooterLayout",setup(e){const t=rn();oe(()=>t.tm("footerLayout"));const n=Vn(),r=Hn(),a=re("");Ie(r,(i,l)=>{a.value=i.name},{immediate:!0});function o(i){n.push({name:i})}return(i,l)=>{const s=Fn("van-tabbar-item"),c=Fn("van-tabbar");return Ve(),Us(c,{onChange:o,modelValue:a.value,"onUpdate:modelValue":l[0]||(l[0]=u=>a.value=u),class:"s_footer_layout_container","safe-area-inset-bottom":!1,"active-color":"#5488f7","inactive-color":"#72798b"},{default:Ht(()=>[C(s,{name:"main",class:"s-tab-item"},{icon:Ht(u=>[w("img",{src:u.active?"/img/footer/home_active.png":"/img/footer/home.png",alt:""},null,8,a8)]),_:1}),C(s,{name:"halljunior",class:"s-tab-item"},{icon:Ht(u=>[w("img",{src:u.active?"/img/footer/junior_active.png":"/img/footer/junior.png",alt:""},null,8,o8)]),_:1}),C(s,{name:"hallintermediate",class:"s-tab-item s-tab-item-middle"},{icon:Ht(u=>[w("img",{src:u.active?"/img/footer/intermediate_active.png":"/img/footer/intermediate.png",alt:""},null,8,i8)]),_:1}),C(s,{name:"halladvanced",class:"s-tab-item"},{icon:Ht(u=>[w("img",{src:u.active?"/img/footer/advanced_active.png":"/img/footer/advanced.png",alt:""},null,8,s8)]),_:1}),C(s,{name:"mycenter",class:"s-tab-item"},{icon:Ht(u=>[w("img",{src:u.active?"/img/footer/my_active.png":"/img/footer/my.png",alt:""},null,8,l8)]),_:1})]),_:1},8,["modelValue"])}}};const u8={class:"v_main_layout v-is-main g-flex g-flex-column"},d8={__name:"MainLayout",setup(e){return(t,n)=>(Ve(),Ge("div",u8,[C(V(_0),{class:"v-main-container"}),C(c8)]))}},Xp=YS({history:uS("./"),routes:[{path:"/",name:"MainLayout",component:d8,redirect:"/main",children:[{path:"/main",name:"main",component:()=>je(()=>Promise.resolve().then(()=>_9),void 0,import.meta.url),meta:{index:0,name:"\u9996\u9875"}},{path:"/myteam",name:"myteam",component:()=>je(()=>import("./MyTeam.bba453dc.js"),["MyTeam.bba453dc.js","MyTeam.4aa07f6a.css","SelectRadioPop.4763415a.js","SelectRadioPop.vue_vue_type_style_index_0_lang.6a63b429.js"],import.meta.url),meta:{index:0,name:"\u6211\u7684\u56E2\u961F"}},{path:"/halladvanced",name:"halladvanced",component:()=>je(()=>import("./HallAdvanced.14cc59d2.js"),["HallAdvanced.14cc59d2.js","CommonHall.7785cffd.js","CommonHall.b51d761d.css"],import.meta.url),meta:{index:40,name:"\u4E0B\u6CE8"}},{path:"/hallintermediate",name:"hallintermediate",component:()=>je(()=>import("./HallIntermediate.627e4003.js"),["HallIntermediate.627e4003.js","CommonHall.7785cffd.js","CommonHall.b51d761d.css"],import.meta.url),meta:{index:40,name:"\u4E0B\u6CE8"}},{path:"/halljunior",name:"halljunior",component:()=>je(()=>import("./HallJunior.50818f09.js"),["HallJunior.50818f09.js","CommonHall.7785cffd.js","CommonHall.b51d761d.css"],import.meta.url),meta:{index:40,name:"\u4E0B\u6CE8"}},{path:"/rechargeselect",name:"rechargeselect",component:()=>je(()=>Promise.resolve().then(()=>U9),void 0,import.meta.url),meta:{index:0,name:"\u9009\u62E9\u5145\u503C"}},{path:"/quantify",name:"quantify",component:()=>je(()=>Promise.resolve().then(()=>ej),void 0,import.meta.url),meta:{index:0,name:"\u91CF\u5316"}},{path:"/mycenter",name:"mycenter",component:()=>je(()=>Promise.resolve().then(()=>Gj),void 0,import.meta.url),meta:{index:0,name:"\u6211\u7684"}}]},{path:"/myteammemberlist",name:"myteammemberlist",component:()=>je(()=>import("./MyTeamMemberList.2b8da5e0.js"),["MyTeamMemberList.2b8da5e0.js","MyTeamMemberList.a992e780.css"],import.meta.url),meta:{index:50,name:"\u56E2\u961F\u6210\u5458\u5217\u8868"}},{path:"/chip",name:"chip",component:()=>je(()=>import("./Chip.5bd91b51.js"),["Chip.5bd91b51.js","Chip.5a4116a5.css"],import.meta.url),meta:{index:40,name:"\u4E0B\u6CE8"}},{path:"/lotteryHistory",name:"lotteryHistory",component:()=>je(()=>import("./LotteryHistory.8921c376.js"),["LotteryHistory.8921c376.js","LotteryHistory.5df4aa1c.css"],import.meta.url),meta:{index:41,name:"\u5386\u53F2\u5F00\u5956"}},{path:"/betsrecord",name:"betsrecord",component:()=>je(()=>import("./BetsRecord.bb26b5ec.js"),["BetsRecord.bb26b5ec.js","BetsRecord.6434197b.css"],import.meta.url),meta:{index:41,name:"\u5386\u53F2\u5F00\u5956"}},{path:"/tokenInfo",name:"tokenInfo",component:()=>je(()=>import("./index.552b285a.js"),["index.552b285a.js","index.22b82feb.css"],import.meta.url),meta:{index:15,name:"tokenInfo"}},{path:"/intro",name:"intro",component:()=>je(()=>Promise.resolve().then(()=>nU),void 0,import.meta.url),meta:{index:0,name:"\u4ECB\u7ECD"}},{path:"/kefu",name:"kefu",component:()=>je(()=>import("./KeFu.2b27deba.js"),["KeFu.2b27deba.js","KeFu.92d0ef34.css"],import.meta.url),meta:{index:20,name:"\u5BA2\u670D"}},{path:"/login",name:"login",component:()=>je(()=>Promise.resolve().then(()=>sV),void 0,import.meta.url),meta:{index:1,name:"\u767B\u5F55"}},{path:"/register",name:"register",component:()=>je(()=>Promise.resolve().then(()=>EH),void 0,import.meta.url),meta:{index:2,name:"\u6CE8\u518C"}},{path:"/forgetpwd",name:"forgetpwd",component:()=>je(()=>import("./ForgetPwd.ab37dc03.js"),["ForgetPwd.ab37dc03.js","ForgetPwd.3b1014bb.css"],import.meta.url),meta:{index:20,name:"\u5FD8\u8BB0\u5BC6\u7801"}},{path:"/invite",name:"invite",component:()=>je(()=>import("./Invite.a69bfc1d.js"),["Invite.a69bfc1d.js","Invite.de17df5d.css","vue-qr.f9c09d5a.js"],import.meta.url),meta:{index:20,name:"\u9080\u8BF7\u597D\u53CB"}},{path:"/msgcenter",name:"msgcenter",component:()=>je(()=>import("./MsgCenter.f8327066.js"),["MsgCenter.f8327066.js","MsgCenter.82a8be14.css"],import.meta.url),meta:{index:10}},{path:"/userreal",name:"userreal",component:()=>je(()=>import("./UserReal.72015952.js"),["UserReal.72015952.js","UserReal.90d1e46b.css","ID_f.75f875dd.js","OssUpload.4bc5acdd.js","aliyun-oss-sdk.d9116a34.js","SelectRadioPop.4763415a.js","SelectRadioPop.vue_vue_type_style_index_0_lang.6a63b429.js"],import.meta.url),meta:{index:40}},{path:"/walletlist",name:"walletlist",component:()=>je(()=>import("./WalletList.904de713.js"),["WalletList.904de713.js","WalletList.62416992.css","empty-image.36ac6311.js"],import.meta.url),meta:{index:5}},{path:"/walletadd",name:"walletadd",component:()=>je(()=>import("./WalletAdd.6902b117.js"),["WalletAdd.6902b117.js","WalletAdd.e73d45fd.css","SelectRadioPop.4763415a.js","SelectRadioPop.vue_vue_type_style_index_0_lang.6a63b429.js"],import.meta.url),meta:{index:40}},{path:"/rule",name:"rule",component:()=>je(()=>import("./Rule.ef2b1fcc.js"),["Rule.ef2b1fcc.js","Rule.fa5a3607.css"],import.meta.url),meta:{index:30}},{path:"/safecenter",name:"safecenter",component:()=>je(()=>import("./SafeCenter.df675978.js"),["SafeCenter.df675978.js","SafeCenter.24b74a5c.css"],import.meta.url),meta:{index:6}},{path:"/aboutus",name:"aboutus",component:()=>je(()=>import("./AboutUs.f997dc3b.js"),["AboutUs.f997dc3b.js","AboutUs.fa5a3607.css"],import.meta.url),meta:{index:20}},{path:"/languageset",name:"languageset",component:()=>je(()=>import("./LanguageSet.0fa8f9c5.js"),["LanguageSet.0fa8f9c5.js","LanguageSet.8676e67e.css"],import.meta.url),meta:{index:6,name:"\u8BED\u8A00\u8BBE\u7F6E"}},{path:"/changepwd",name:"changepwd",component:()=>je(()=>import("./ChangePwd.2341dd99.js"),["ChangePwd.2341dd99.js","ChangePwd.f0236a59.css"],import.meta.url),meta:{index:11,name:"\u4FEE\u6539\u767B\u5F55\u5BC6\u7801"}},{path:"/changebuspwd",name:"changebuspwd",component:()=>je(()=>import("./ChangeBusPwd.3eaee0bf.js"),["ChangeBusPwd.3eaee0bf.js","ChangeBusPwd.e44891bd.css"],import.meta.url),meta:{index:10,name:"\u4FEE\u6539\u4EA4\u6613\u5BC6\u7801"}},{path:"/bindmobile",name:"bindmobile",component:()=>je(()=>import("./BindMobile.6d9fdbf2.js"),["BindMobile.6d9fdbf2.js","BindMobile.ec99e617.css"],import.meta.url),meta:{index:9,name:"\u7ED1\u5B9A\u624B\u673A"}},{path:"/bindemail",name:"bindemail",component:()=>je(()=>import("./BindEmail.dbd0e970.js"),["BindEmail.dbd0e970.js","BindEmail.932ff3a6.css"],import.meta.url),meta:{index:9,name:"\u7ED1\u5B9A\u90AE\u7BB1"}},{path:"/rechargebi/:id",name:"rechargebi",component:()=>je(()=>import("./RechargeBi.3d801e8c.js"),["RechargeBi.3d801e8c.js","RechargeBi.80781107.css","SelectCoinPop.645ea5cd.js","SelectCoinPop.470300bc.css","vue-qr.f9c09d5a.js","OssUpload.4bc5acdd.js","aliyun-oss-sdk.d9116a34.js"],import.meta.url),meta:{index:16}},{path:"/rechargethird/:id",name:"rechargethird",component:()=>je(()=>import("./RechargeThird.6ffead45.js"),["RechargeThird.6ffead45.js","RechargeThird.fb0ee81b.css","SelectCoinPop.645ea5cd.js","SelectCoinPop.470300bc.css","vue-qr.f9c09d5a.js","OssUpload.4bc5acdd.js","aliyun-oss-sdk.d9116a34.js"],import.meta.url),meta:{index:16}},{path:"/rechargethirdsecond",name:"rechargethirdsecond",component:()=>je(()=>import("./RechargeThirdSecond.c2b1c982.js"),["RechargeThirdSecond.c2b1c982.js","RechargeThirdSecond.cedc34cc.css","vue-qr.f9c09d5a.js"],import.meta.url),meta:{index:17}},{path:"/rechargebank/:id",name:"rechargebank",component:()=>je(()=>import("./RechargeBank.0c1cc6ee.js"),["RechargeBank.0c1cc6ee.js","RechargeBank.68579164.css","OssUpload.4bc5acdd.js","aliyun-oss-sdk.d9116a34.js"],import.meta.url),meta:{index:16}},{path:"/rechargekefu/:id",name:"rechargekefu",component:()=>je(()=>import("./RechargeKefu.af9d3e61.js"),["RechargeKefu.af9d3e61.js","RechargeKefu.3073730e.css","OssUpload.4bc5acdd.js","aliyun-oss-sdk.d9116a34.js"],import.meta.url),meta:{index:16}},{path:"/cashoutselect",name:"cashoutselect",component:()=>je(()=>Promise.resolve().then(()=>RH),void 0,import.meta.url),meta:{index:15,name:"\u9009\u62E9\u63D0\u73B0"}},{path:"/cashoutbi/:id",name:"cashoutbi",component:()=>je(()=>import("./CashoutBi.8f7b7a80.js"),["CashoutBi.8f7b7a80.js","CashoutBi.366063f8.css","SelectCoinPop.645ea5cd.js","SelectCoinPop.470300bc.css","BussinessPwdPop.713dcc38.js","BussinessPwdPop.d45406ad.css","empty-image.36ac6311.js"],import.meta.url),meta:{index:16}},{path:"/cashoutbank/:id",name:"cashoutbank",component:()=>je(()=>import("./CashoutBank.5fab2d8d.js"),["CashoutBank.5fab2d8d.js","CashoutBank.6af77052.css","BussinessPwdPop.713dcc38.js","BussinessPwdPop.d45406ad.css","extract_bank_modify.644e71d5.js","empty-image.36ac6311.js"],import.meta.url),meta:{index:16}},{path:"/noticedetail",name:"noticedetail",component:()=>je(()=>import("./NoticeDetail.dcb4415b.js"),["NoticeDetail.dcb4415b.js","NoticeDetail.bae76f05.css"],import.meta.url),meta:{index:11,name:"\u516C\u544A\u8BE6\u60C5"}},{path:"/msgdetail",name:"msgdetail",component:()=>je(()=>import("./MsgDetail.130e599e.js"),["MsgDetail.130e599e.js","MsgDetail.347f1c7e.css"],import.meta.url),meta:{index:11,name:"\u6D88\u606F\u8BE6\u60C5"}},{path:"/mybill",name:"mybill",component:()=>je(()=>import("./MyBill.ff3fdf81.js"),["MyBill.ff3fdf81.js","MyBill.981de2a3.css","CashoutDetailPop.6e6ab695.js","CashoutDetailPop.fe8949cd.css"],import.meta.url),meta:{index:24,name:"\u660E\u7EC6"}},{path:"/lianghuahistory",name:"lianghuahistory",component:()=>je(()=>import("./LiangHuaHistory.fba3e89e.js"),["LiangHuaHistory.fba3e89e.js","LiangHuaHistory.ac670ddb.css"],import.meta.url),meta:{index:24,name:"\u91CF\u5316\u8BB0\u5F55"}},{path:"/cashouthistory",name:"cashouthistory",component:()=>je(()=>import("./CashoutHistory.38a04ea8.js"),["CashoutHistory.38a04ea8.js","CashoutHistory.86d2b32f.css","CashoutDetailPop.6e6ab695.js","CashoutDetailPop.fe8949cd.css"],import.meta.url),meta:{index:24,name:"\u63D0\u73B0\u8BB0\u5F55"}},{path:"/rechargehistory",name:"rechargehistory",component:()=>je(()=>import("./RechargeHistory.0cabb57b.js"),["RechargeHistory.0cabb57b.js","RechargeHistory.5a7ea20b.css","CashoutDetailPop.6e6ab695.js","CashoutDetailPop.fe8949cd.css"],import.meta.url),meta:{index:24,name:"\u5145\u503C\u8BB0\u5F55"}},{path:"/bankcardlist",name:"bankcardlist",component:()=>je(()=>import("./BankCardList.d2b2875a.js"),["BankCardList.d2b2875a.js","BankCardList.1c4200bc.css","extract_bank_modify.644e71d5.js","empty-image.36ac6311.js"],import.meta.url),meta:{index:39,name:"\u94F6\u884C\u5361\u5217\u8868"}},{path:"/addbankcard",name:"addbankcard",component:()=>je(()=>import("./AddBankCard.240b8655.js"),["AddBankCard.240b8655.js","AddBankCard.e97da5ab.css"],import.meta.url),meta:{index:40,name:"\u6DFB\u52A0\u94F6\u884C\u5361"}},{path:"/taskcenter",name:"taskcenter",component:()=>je(()=>import("./TaskCenter.e5c3e1f7.js"),["TaskCenter.e5c3e1f7.js","TaskCenter.4aee94fb.css"],import.meta.url),meta:{index:40,name:"\u4EFB\u52A1\u4E2D\u5FC3"}},{path:"/wakuang",name:"wakuang",component:()=>je(()=>import("./WaKuang.9e2e0b46.js"),["WaKuang.9e2e0b46.js","WaKuang.24549a0e.css"],import.meta.url),meta:{index:12,name:"\u8D28\u62BC\u6316\u77FF"}},{path:"/wakuangdetail",name:"wakuangdetail",component:()=>je(()=>import("./WaKuanDetail.d23e30d6.js"),["WaKuanDetail.d23e30d6.js","WaKuanDetail.2ff4aa63.css"],import.meta.url),meta:{index:14}},{path:"/wakuangorderlist",name:"wakuangorderlist",component:()=>je(()=>import("./WaKuangOrderList.967db4e9.js"),["WaKuangOrderList.967db4e9.js","WaKuangOrderList.3348c2c4.css"],import.meta.url),meta:{index:15}},{path:"/choujiang",name:"choujiang",component:()=>je(()=>import("./ChouJiang.b0dfaf84.js"),["ChouJiang.b0dfaf84.js","ChouJiang.b7623e3b.css"],import.meta.url),meta:{index:50,name:"\u62BD\u5956"}},{path:"/choujianghistory",name:"choujianghistory",component:()=>je(()=>import("./ChouJiangHistory.beac57f5.js"),["ChouJiangHistory.beac57f5.js","ChouJiangHistory.a625f1a1.css"],import.meta.url),meta:{index:51,name:"\u62BD\u5956\u8BB0\u5F55"}},{path:"/transfer",name:"transfer",component:()=>je(()=>import("./Transfer.92b5b572.js"),["Transfer.92b5b572.js","Transfer.b9c2c40f.css"],import.meta.url),meta:{index:51,name:"\u62BD\u5956\u8BB0\u5F55"}},{path:"/transferrecord",name:"transferrecord",component:()=>je(()=>import("./TransferRecord.0768c2f9.js"),["TransferRecord.0768c2f9.js","TransferRecord.a5cc1aee.css"],import.meta.url),meta:{index:51,name:"\u5212\u8F6C\u8BB0\u5F55"}},{path:"/refresh",name:"refresh",component:()=>je(()=>import("./Refresh.e2dd997b.js"),[],import.meta.url),meta:{index:24}},{path:"/smartStrategy",name:"smartStrategy",component:()=>je(()=>import("./smartStrategy.4cd609be.js"),["smartStrategy.4cd609be.js","smartStrategy.d0974d47.css","ID_f.75f875dd.js","aliyun-oss-sdk.d9116a34.js","SelectRadioPop.vue_vue_type_style_index_0_lang.6a63b429.js"],import.meta.url),meta:{index:40}}]});Xp.beforeEach((e,t,n)=>{e.name==t.name?(console.log("=================",e,t),Object.assign(t,e),n({name:"refresh"})):n()});var f8=!1;/*!
  * pinia v2.0.23
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */let Jb;const cu=e=>Jb=e,e1=Symbol();function hf(e){return e&&typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"&&typeof e.toJSON!="function"}var hs;(function(e){e.direct="direct",e.patchObject="patch object",e.patchFunction="patch function"})(hs||(hs={}));function p8(){const e=jf(!0),t=e.run(()=>re({}));let n=[],r=[];const a=uo({install(o){cu(a),a._a=o,o.provide(e1,a),o.config.globalProperties.$pinia=a,r.forEach(i=>n.push(i)),r=[]},use(o){return!this._a&&!f8?r.push(o):n.push(o),this},_p:n,_a:null,_e:e,_s:new Map,state:t});return a}const t1=()=>{};function Kg(e,t,n,r=t1){e.push(t);const a=()=>{const o=e.indexOf(t);o>-1&&(e.splice(o,1),r())};return!n&&Gt()&&Un(a),a}function Fo(e,...t){e.slice().forEach(n=>{n(...t)})}function mf(e,t){e instanceof Map&&t instanceof Map&&t.forEach((n,r)=>e.set(r,n)),e instanceof Set&&t instanceof Set&&t.forEach(e.add,e);for(const n in t){if(!t.hasOwnProperty(n))continue;const r=t[n],a=e[n];hf(a)&&hf(r)&&e.hasOwnProperty(n)&&!ct(r)&&!jr(r)?e[n]=mf(a,r):e[n]=r}return e}const h8=Symbol();function m8(e){return!hf(e)||!e.hasOwnProperty(h8)}const{assign:pa}=Object;function g8(e){return!!(ct(e)&&e.effect)}function v8(e,t,n,r){const{state:a,actions:o,getters:i}=t,l=n.state.value[e];let s;function c(){l||(n.state.value[e]=a?a():{});const u=ty(n.state.value[e]);return pa(u,o,Object.keys(i||{}).reduce((f,d)=>(f[d]=uo(oe(()=>{cu(n);const m=n._s.get(e);return i[d].call(m,m)})),f),{}))}return s=n1(e,c,t,n,r,!0),s.$reset=function(){const f=a?a():{};this.$patch(d=>{pa(d,f)})},s}function n1(e,t,n={},r,a,o){let i;const l=pa({actions:{}},n),s={deep:!0};let c,u,f=uo([]),d=uo([]),m;const y=r.state.value[e];!o&&!y&&(r.state.value[e]={}),re({});let g;function A(S){let k;c=u=!1,typeof S=="function"?(S(r.state.value[e]),k={type:hs.patchFunction,storeId:e,events:m}):(mf(r.state.value[e],S),k={type:hs.patchObject,payload:S,storeId:e,events:m});const $=g=Symbol();Ke().then(()=>{g===$&&(c=!0)}),u=!0,Fo(f,k,r.state.value[e])}const h=t1;function p(){i.stop(),f=[],d=[],r._s.delete(e)}function b(S,k){return function(){cu(r);const $=Array.from(arguments),R=[],D=[];function j(F){R.push(F)}function M(F){D.push(F)}Fo(d,{args:$,name:S,store:x,after:j,onError:M});let N;try{N=k.apply(this&&this.$id===e?this:x,$)}catch(F){throw Fo(D,F),F}return N instanceof Promise?N.then(F=>(Fo(R,F),F)).catch(F=>(Fo(D,F),Promise.reject(F))):(Fo(R,N),N)}}const v={_p:r,$id:e,$onAction:Kg.bind(null,d),$patch:A,$reset:h,$subscribe(S,k={}){const $=Kg(f,S,k.detached,()=>R()),R=i.run(()=>Ie(()=>r.state.value[e],D=>{(k.flush==="sync"?u:c)&&S({storeId:e,type:hs.direct,events:m},D)},pa({},s,k)));return $},$dispose:p},x=He(v);r._s.set(e,x);const _=r._e.run(()=>(i=jf(),i.run(()=>t())));for(const S in _){const k=_[S];if(ct(k)&&!g8(k)||jr(k))o||(y&&m8(k)&&(ct(k)?k.value=y[S]:mf(k,y[S])),r.state.value[e][S]=k);else if(typeof k=="function"){const $=b(S,k);_[S]=$,l.actions[S]=k}}return pa(x,_),pa(rt(x),_),Object.defineProperty(x,"$state",{get:()=>r.state.value[e],set:S=>{A(k=>{pa(k,S)})}}),r._p.forEach(S=>{pa(x,i.run(()=>S({store:x,app:r._a,pinia:r,options:l})))}),y&&o&&n.hydrate&&n.hydrate(x.$state,y),c=!0,u=!0,x}function y8(e,t,n){let r,a;const o=typeof t=="function";typeof e=="string"?(r=e,a=o?n:t):(a=e,r=e.id);function i(l,s){const c=Gt();return l=l||c&&Wt(e1),l&&cu(l),l=Jb,l._s.has(r)||(o?n1(r,t,a,l):v8(r,a,l)),l._s.get(r)}return i.$id=r,i}const A8=p8(),b8=mT({legacy:!1,messages:{}});var E8={name:"Name",tel:"Phone",save:"Save",confirm:"Confirm",cancel:"Cancel",delete:"Delete",loading:"Loading...",noCoupon:"No coupons",nameEmpty:"Please fill in the name",addContact:"Add contact",telInvalid:"Malformed phone number",vanCalendar:{end:"End",start:"Start",title:"Calendar",weekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],monthTitle:(e,t)=>`${e}/${t}`,rangePrompt:e=>`Choose no more than ${e} days`},vanCascader:{select:"Select"},vanPagination:{prev:"Previous",next:"Next"},vanPullRefresh:{pulling:"Pull to refresh...",loosing:"Loose to refresh..."},vanSubmitBar:{label:"Total:"},vanCoupon:{unlimited:"Unlimited",discount:e=>`${e*10}% off`,condition:e=>`At least ${e}`},vanCouponCell:{title:"Coupon",count:e=>`You have ${e} coupons`},vanCouponList:{exchange:"Exchange",close:"Close",enable:"Available",disabled:"Unavailable",placeholder:"Coupon code"},vanAddressEdit:{area:"Area",postal:"Postal",areaEmpty:"Please select a receiving area",addressEmpty:"Address can not be empty",postalEmpty:"Wrong postal code",addressDetail:"Address",defaultAddress:"Set as the default address"},vanAddressList:{add:"Add new address"}},x8={name:"\u59D3\u540D",tel:"\u96FB\u8A71",save:"\u5132\u5B58",confirm:"\u78BA\u8A8D",cancel:"\u53D6\u6D88",delete:"\u522A\u9664",loading:"\u8F09\u5165\u4E2D...",noCoupon:"\u66AB\u7121\u512A\u60E0\u5238",nameEmpty:"\u8ACB\u586B\u5BEB\u59D3\u540D",addContact:"\u5EFA\u7ACB\u806F\u7D61\u4EBA",telInvalid:"\u8ACB\u586B\u5BEB\u6B63\u78BA\u7684\u96FB\u8A71",vanCalendar:{end:"\u7D50\u675F",start:"\u958B\u59CB",title:"\u65E5\u671F\u9078\u64C7",weekdays:["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"],monthTitle:(e,t)=>`${e}\u5E74${t}\u6708`,rangePrompt:e=>`\u6700\u591A\u9078\u64C7 ${e} \u5929`},vanCascader:{select:"\u8ACB\u9078\u64C7"},vanPagination:{prev:"\u4E0A\u4E00\u9801",next:"\u4E0B\u4E00\u9801"},vanPullRefresh:{pulling:"\u4E0B\u62C9\u5373\u53EF\u5237\u65B0...",loosing:"\u91CB\u653E\u5373\u53EF\u5237\u65B0..."},vanSubmitBar:{label:"\u5408\u8A08:"},vanCoupon:{unlimited:"\u7121\u9580\u6ABB",discount:e=>`${e}\u6298`,condition:e=>`\u6EFF${e}\u5143\u53EF\u7528`},vanCouponCell:{title:"\u512A\u60E0\u5238",count:e=>`${e}\u5F35\u53EF\u7528`},vanCouponList:{exchange:"\u514C\u63DB",close:"\u4E0D\u4F7F\u7528",enable:"\u53EF\u4F7F\u7528\u512A\u60E0\u5238",disabled:"\u4E0D\u53EF\u4F7F\u7528\u512A\u60E0\u5238",placeholder:"\u8F38\u5165\u512A\u60E0\u4EE3\u78BC"},vanAddressEdit:{area:"\u5730\u5340",postal:"\u90F5\u905E\u5340\u865F",areaEmpty:"\u8ACB\u9078\u64C7\u5730\u5340",addressEmpty:"\u8ACB\u586B\u5BEB\u8A73\u7D30\u5730\u5740",postalEmpty:"\u90F5\u905E\u5340\u865F\u4E0D\u6B63\u78BA",addressDetail:"\u8A73\u7D30\u5730\u5740",defaultAddress:"\u8A2D\u70BA\u9810\u8A2D\u6536\u8CA8\u5730\u5740"},vanAddressList:{add:"\u65B0\u589E\u5730\u5740"}},C8={name:"Name",tel:"Telefon",save:"Speichern",confirm:"Best\xE4tigen",cancel:"Abbrechen",delete:"L\xF6schen",loading:"Laden...",noCoupon:"Keine Coupons",nameEmpty:"Bitte den Name angeben",addContact:"Neuen Kontakt hinzuf\xFCgen",telInvalid:"Ung\xFCltige Telefonnummer",vanCalendar:{end:"Ende",start:"Start",title:"Kalender",weekdays:["So","Mo","Di","Mo","Do","Fr","Sa"],monthTitle:(e,t)=>`${e}/${t}`,rangePrompt:e=>`W\xE4hle nicht mehr als ${e} Tage`},vanCascader:{select:"W\xE4hlen"},vanPagination:{prev:"Vorherige",next:"N\xE4chste"},vanPullRefresh:{pulling:"Zum Aktualisieren herunterziehen...",loosing:"Loslassen zum Aktualisieren..."},vanSubmitBar:{label:"Total:"},vanCoupon:{unlimited:"Unbegrenzt",discount:e=>`${e*10}% Rabatt`,condition:e=>`Mindestens ${e}`},vanCouponCell:{title:"Coupon",count:e=>`Du hast ${e} Coupons`},vanCouponList:{exchange:"Austauschen",close:"Schlie\xDFen",enable:"Verf\xFCgbar",disabled:"Nicht verf\xFCgbar",placeholder:"Couponcode"},vanAddressEdit:{area:"Standort",postal:"PLZ",areaEmpty:"Bitte deinen Ort angeben",addressEmpty:"Adresse darf nicht leer sein",postalEmpty:"Falsche Postleitzahl",addressDetail:"Adresse",defaultAddress:"Als Standardadresse festgelegen"},vanAddressList:{add:"Neue Adresse hinzuf\xFCgen"}},w8={name:"Nom",tel:"Telephone",save:"Sauvegarder",confirm:"Confirmer",cancel:"Annuler",delete:"Suprimer",loading:"Chargement...",noCoupon:"Pas de coupons",nameEmpty:"Veuillez remplir le nom",addContact:"Ajouter contact",telInvalid:"Num\xE9ro de t\xE9l\xE9phone incorrect",vanCalendar:{end:"Fin",start:"D\xE9but",title:"Calendrier",weekdays:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],monthTitle:(e,t)=>`${e}/${t}`,rangePrompt:e=>`Choisir pas plus de ${e} jours`},vanCascader:{select:"S\xE9lectionner"},vanPagination:{prev:"Pr\xE9c\xE9dent",next:"Suivant"},vanPullRefresh:{pulling:"Tirer pour actualiser ...",loosing:"Rel\xE2chez pour actualiser..."},vanSubmitBar:{label:"Total:"},vanCoupon:{unlimited:"Illimit\xE9",discount:e=>`${e*10}% de r\xE9duction`,condition:e=>`Au moins ${e}`},vanCouponCell:{title:"Coupon",count:e=>`Vous avez ${e} coupons`},vanCouponList:{exchange:"Exchange",close:"Fermer",enable:"Disponible",disabled:"Indisponible",placeholder:"Code coupon"},vanAddressEdit:{area:"Zone",postal:"Postal",areaEmpty:"Veuillez s\xE9lectionner une zone de r\xE9ception",addressEmpty:"L'adresse ne peut pas \xEAtre vide",postalEmpty:"Mauvais code postal",addressDetail:"Adresse",defaultAddress:"D\xE9finir comme adresse par d\xE9faut"},vanAddressList:{add:"Ajouter une nouvelle adresse"}},_8={name:"\u304A\u540D\u524D",tel:"\u96FB\u8A71\u756A\u53F7",save:"\u30BB\u30FC\u30D6",confirm:"\u78BA\u8A8D",cancel:"\u30AD\u30E3\u30F3\u30BB\u30EB",delete:"\u524A\u9664",loading:"\u8AAD\u307F\u8FBC\u307F\u4E2D...",noCoupon:"\u30AF\u30FC\u30DD\u30F3\u306F\u3042\u308A\u307E\u305B\u3093",nameEmpty:"\u540D\u524D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",addContact:"\u9023\u7D61\u5148\u3092\u8FFD\u52A0",telInvalid:"\u6B63\u3057\u3044\u96FB\u8A71\u756A\u53F7\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",vanCalendar:{end:"\u7D42\u4E86",start:"\u958B\u59CB",title:"\u65E5\u4ED8\u9078\u629E",weekdays:["\u65E5","\u6708","\u706B","\u6C34","\u6728","\u91D1","\u571F"],monthTitle:(e,t)=>`${e}\u5E74${t}\u6708`,rangePrompt:e=>`${e}\u65E5\u307E\u3067\u9078\u629E`},vanCascader:{select:"\u9078\u629E\u3059\u308B"},vanPagination:{prev:"\u524D\u306E\u30DA\u30FC\u30B8",next:"\u6B21\u306E\u30DA\u30FC\u30B8"},vanPullRefresh:{pulling:"\u30D7\u30EB\u30C0\u30A6\u30F3\u3057\u3066\u66F4\u65B0...",loosing:"\u30EA\u30EA\u30FC\u30B9\u6642\u306B\u66F4\u65B0..."},vanSubmitBar:{label:"\u5408\u8A08:"},vanCoupon:{unlimited:"\u7121\u5236\u9650",discount:e=>`${10-e}\u5272\u5F15`,condition:e=>`${e}\u5186\u4EE5\u4E0A\u3067\u5229\u7528\u53EF\u80FD`},vanCouponCell:{title:"\u30AF\u30FC\u30DD\u30F3",count:e=>`${e}\u679A\u304C\u5229\u7528\u53EF\u80FD`},vanCouponList:{exchange:"\u4E21\u66FF",close:"\u4F7F\u7528\u7981\u6B62",enable:"\u5229\u7528\u53EF\u80FD",disabled:"\u5229\u7528\u3067\u304D\u307E\u305B\u3093",placeholder:"\u5272\u5F15\u30B3\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"},vanAddressEdit:{area:"\u5730\u57DF",postal:"\u90F5\u4FBF\u756A\u53F7",areaEmpty:"\u5730\u57DF\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044",addressEmpty:"\u8A73\u3057\u3044\u4F4F\u6240\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",postalEmpty:"\u9593\u9055\u3063\u305F\u90F5\u4FBF\u756A\u53F7",addressDetail:"\u8A73\u3057\u3044\u4F4F\u6240",defaultAddress:"\u30C7\u30D5\u30A9\u30EB\u30C8\u306E\u4F4F\u6240\u306B\u8A2D\u5B9A"},vanAddressList:{add:"\u4F4F\u6240\u3092\u8FFD\u52A0"}};const r1="3.7.7",S8=r1,Oi=typeof Buffer=="function",Qg=typeof TextDecoder=="function"?new TextDecoder:void 0,Xg=typeof TextEncoder=="function"?new TextEncoder:void 0,k8="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",Ji=Array.prototype.slice.call(k8),Il=(e=>{let t={};return e.forEach((n,r)=>t[n]=r),t})(Ji),T8=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,Xt=String.fromCharCode.bind(String),Zg=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):e=>new Uint8Array(Array.prototype.slice.call(e,0)),a1=e=>e.replace(/=/g,"").replace(/[+\/]/g,t=>t=="+"?"-":"_"),o1=e=>e.replace(/[^A-Za-z0-9\+\/]/g,""),i1=e=>{let t,n,r,a,o="";const i=e.length%3;for(let l=0;l<e.length;){if((n=e.charCodeAt(l++))>255||(r=e.charCodeAt(l++))>255||(a=e.charCodeAt(l++))>255)throw new TypeError("invalid character found");t=n<<16|r<<8|a,o+=Ji[t>>18&63]+Ji[t>>12&63]+Ji[t>>6&63]+Ji[t&63]}return i?o.slice(0,i-3)+"===".substring(i):o},Zp=typeof btoa=="function"?e=>btoa(e):Oi?e=>Buffer.from(e,"binary").toString("base64"):i1,gf=Oi?e=>Buffer.from(e).toString("base64"):e=>{let n=[];for(let r=0,a=e.length;r<a;r+=4096)n.push(Xt.apply(null,e.subarray(r,r+4096)));return Zp(n.join(""))},Nl=(e,t=!1)=>t?a1(gf(e)):gf(e),I8=e=>{if(e.length<2){var t=e.charCodeAt(0);return t<128?e:t<2048?Xt(192|t>>>6)+Xt(128|t&63):Xt(224|t>>>12&15)+Xt(128|t>>>6&63)+Xt(128|t&63)}else{var t=65536+(e.charCodeAt(0)-55296)*1024+(e.charCodeAt(1)-56320);return Xt(240|t>>>18&7)+Xt(128|t>>>12&63)+Xt(128|t>>>6&63)+Xt(128|t&63)}},O8=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,s1=e=>e.replace(O8,I8),Jg=Oi?e=>Buffer.from(e,"utf8").toString("base64"):Xg?e=>gf(Xg.encode(e)):e=>Zp(s1(e)),ei=(e,t=!1)=>t?a1(Jg(e)):Jg(e),ev=e=>ei(e,!0),B8=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,L8=e=>{switch(e.length){case 4:var t=(7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3),n=t-65536;return Xt((n>>>10)+55296)+Xt((n&1023)+56320);case 3:return Xt((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return Xt((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},l1=e=>e.replace(B8,L8),c1=e=>{if(e=e.replace(/\s+/g,""),!T8.test(e))throw new TypeError("malformed base64.");e+="==".slice(2-(e.length&3));let t,n="",r,a;for(let o=0;o<e.length;)t=Il[e.charAt(o++)]<<18|Il[e.charAt(o++)]<<12|(r=Il[e.charAt(o++)])<<6|(a=Il[e.charAt(o++)]),n+=r===64?Xt(t>>16&255):a===64?Xt(t>>16&255,t>>8&255):Xt(t>>16&255,t>>8&255,t&255);return n},Jp=typeof atob=="function"?e=>atob(o1(e)):Oi?e=>Buffer.from(e,"base64").toString("binary"):c1,u1=Oi?e=>Zg(Buffer.from(e,"base64")):e=>Zg(Jp(e).split("").map(t=>t.charCodeAt(0))),d1=e=>u1(f1(e)),P8=Oi?e=>Buffer.from(e,"base64").toString("utf8"):Qg?e=>Qg.decode(u1(e)):e=>l1(Jp(e)),f1=e=>o1(e.replace(/[-_]/g,t=>t=="-"?"+":"/")),vf=e=>P8(f1(e)),$8=e=>{if(typeof e!="string")return!1;const t=e.replace(/\s+/g,"").replace(/={0,2}$/,"");return!/[^\s0-9a-zA-Z\+/]/.test(t)||!/[^\s0-9a-zA-Z\-_]/.test(t)},p1=e=>({value:e,enumerable:!1,writable:!0,configurable:!0}),h1=function(){const e=(t,n)=>Object.defineProperty(String.prototype,t,p1(n));e("fromBase64",function(){return vf(this)}),e("toBase64",function(t){return ei(this,t)}),e("toBase64URI",function(){return ei(this,!0)}),e("toBase64URL",function(){return ei(this,!0)}),e("toUint8Array",function(){return d1(this)})},m1=function(){const e=(t,n)=>Object.defineProperty(Uint8Array.prototype,t,p1(n));e("toBase64",function(t){return Nl(this,t)}),e("toBase64URI",function(){return Nl(this,!0)}),e("toBase64URL",function(){return Nl(this,!0)})},D8=()=>{h1(),m1()},R8={version:r1,VERSION:S8,atob:Jp,atobPolyfill:c1,btoa:Zp,btoaPolyfill:i1,fromBase64:vf,toBase64:ei,encode:ei,encodeURI:ev,encodeURL:ev,utob:s1,btou:l1,decode:vf,isValid:$8,fromUint8Array:Nl,toUint8Array:d1,extendString:h1,extendUint8Array:m1,extendBuiltins:D8},mn=y8("store",{state:()=>({isFirstNeedShow:0,isClickTimeDownNotice:!1,myWebMainUrl:(document.location.protocol=="http:"?"http://":"https://")+window.location.host+"/#/main",langObj:{"zh-CN":PA,"zh-TW":x8,en:E8,de:C8,fr:w8,ja:_8},isDark:window.localStorage.getItem("isDark")?Number(window.localStorage.getItem("isDark")):0,MACDColor:"#22ab94",DIFColor:"#2196f3",DEAColor:"#ff6d00",MA5Color:"#D6C863",MA10Color:"#16AC90",MA20Color:"#A995D4",upColor:"#04AD90",downColor:"#E15852",audio:null,token:localStorage.getItem("appToken"),lang:window.localStorage.getItem("lang")?window.localStorage.getItem("lang"):"",loadingShow:!1,userInfo:{userReal:{},level:{},levelNext:{},userTeam:{},userQuantify:{}},banner:{logo:[],lunbo:[]},loadedLanguages:[],langList:[],currency:{fixed:0,create_time:0,currency_from:"",currency_to:"",modify_time:0,rate:"",symbol:"",status:0},tg:{code:"",create_time:0,id:0,img:"",modify_time:0,path:"/img/tg.jpg",remark:"",sort:0,status:1,suffix:"",title:""},webLogo:{logo:"",logo2:""},kefu:{KefuMode:"",KefuUrl:"",KefuLine:"",KefuWhatsapp:"",KefuTelegram:""},system:{Version:"",WebTitle:"",GoogleAuth:"",RegMode:"",TidSet:"",UserShow:"",Lang:"",downUrl:"",AboutUs:"",AboutUsPic:"",ProductType:[]}}),actions:{setLanguage(e){window.localStorage.setItem("lang",e),this.lang=e},setThemeIsDark(e){e=Number(e),window.localStorage.setItem("isDark",e),this.isDark=e},setCurrency(e){this.currency=e},encodeString(e){let t=R8.encode(e);const n=t.length,r=t.substring(0,n/2);t=t.substring(n/2,n)+r;const o=t.substring(0,1);return t.substring(1,n)+o},changeToken(e){let t=this.encodeString(location.host),n="";const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";for(let a=0;a<5;a++)n+=r.charAt(Math.floor(Math.random()*r.length));return console.log("newStr",t),console.log("result",n),`${e}.${t}${n}`},setToken(e){window.localStorage.setItem("appToken",e),this.token=e,console.log("this.token",this.token)},setUserInfo(e){this.userInfo=e},setIsFirstNeedShow(e){this.isFirstNeedShow=e},logout(){localStorage.removeItem("appToken"),this.userInfo={userReal:{},level:{}},localStorage.removeItem("cashoutBankInfo"),this.token="",this.isFirstNeedShow=0,this.isClickTimeDownNotice=!0,Xp.push("/login")}}});var M8=function(){if(typeof Symbol!="function"||typeof Object.getOwnPropertySymbols!="function")return!1;if(typeof Symbol.iterator=="symbol")return!0;var t={},n=Symbol("test"),r=Object(n);if(typeof n=="string"||Object.prototype.toString.call(n)!=="[object Symbol]"||Object.prototype.toString.call(r)!=="[object Symbol]")return!1;var a=42;t[n]=a;for(n in t)return!1;if(typeof Object.keys=="function"&&Object.keys(t).length!==0||typeof Object.getOwnPropertyNames=="function"&&Object.getOwnPropertyNames(t).length!==0)return!1;var o=Object.getOwnPropertySymbols(t);if(o.length!==1||o[0]!==n||!Object.prototype.propertyIsEnumerable.call(t,n))return!1;if(typeof Object.getOwnPropertyDescriptor=="function"){var i=Object.getOwnPropertyDescriptor(t,n);if(i.value!==a||i.enumerable!==!0)return!1}return!0},tv=typeof Symbol<"u"&&Symbol,N8=M8,F8=function(){return typeof tv!="function"||typeof Symbol!="function"||typeof tv("foo")!="symbol"||typeof Symbol("bar")!="symbol"?!1:N8()},z8="Function.prototype.bind called on incompatible ",nd=Array.prototype.slice,j8=Object.prototype.toString,U8="[object Function]",V8=function(t){var n=this;if(typeof n!="function"||j8.call(n)!==U8)throw new TypeError(z8+n);for(var r=nd.call(arguments,1),a,o=function(){if(this instanceof a){var u=n.apply(this,r.concat(nd.call(arguments)));return Object(u)===u?u:this}else return n.apply(t,r.concat(nd.call(arguments)))},i=Math.max(0,n.length-r.length),l=[],s=0;s<i;s++)l.push("$"+s);if(a=Function("binder","return function ("+l.join(",")+"){ return binder.apply(this,arguments); }")(o),n.prototype){var c=function(){};c.prototype=n.prototype,a.prototype=new c,c.prototype=null}return a},H8=V8,eh=Function.prototype.bind||H8,W8=eh,q8=W8.call(Function.call,Object.prototype.hasOwnProperty),st,Ai=SyntaxError,g1=Function,ti=TypeError,rd=function(e){try{return g1('"use strict"; return ('+e+").constructor;")()}catch{}},so=Object.getOwnPropertyDescriptor;if(so)try{so({},"")}catch{so=null}var ad=function(){throw new ti},Y8=so?function(){try{return arguments.callee,ad}catch{try{return so(arguments,"callee").get}catch{return ad}}}():ad,zo=F8(),ha=Object.getPrototypeOf||function(e){return e.__proto__},Ho={},G8=typeof Uint8Array>"u"?st:ha(Uint8Array),ni={"%AggregateError%":typeof AggregateError>"u"?st:AggregateError,"%Array%":Array,"%ArrayBuffer%":typeof ArrayBuffer>"u"?st:ArrayBuffer,"%ArrayIteratorPrototype%":zo?ha([][Symbol.iterator]()):st,"%AsyncFromSyncIteratorPrototype%":st,"%AsyncFunction%":Ho,"%AsyncGenerator%":Ho,"%AsyncGeneratorFunction%":Ho,"%AsyncIteratorPrototype%":Ho,"%Atomics%":typeof Atomics>"u"?st:Atomics,"%BigInt%":typeof BigInt>"u"?st:BigInt,"%Boolean%":Boolean,"%DataView%":typeof DataView>"u"?st:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":typeof Float32Array>"u"?st:Float32Array,"%Float64Array%":typeof Float64Array>"u"?st:Float64Array,"%FinalizationRegistry%":typeof FinalizationRegistry>"u"?st:FinalizationRegistry,"%Function%":g1,"%GeneratorFunction%":Ho,"%Int8Array%":typeof Int8Array>"u"?st:Int8Array,"%Int16Array%":typeof Int16Array>"u"?st:Int16Array,"%Int32Array%":typeof Int32Array>"u"?st:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":zo?ha(ha([][Symbol.iterator]())):st,"%JSON%":typeof JSON=="object"?JSON:st,"%Map%":typeof Map>"u"?st:Map,"%MapIteratorPrototype%":typeof Map>"u"||!zo?st:ha(new Map()[Symbol.iterator]()),"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":typeof Promise>"u"?st:Promise,"%Proxy%":typeof Proxy>"u"?st:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":typeof Reflect>"u"?st:Reflect,"%RegExp%":RegExp,"%Set%":typeof Set>"u"?st:Set,"%SetIteratorPrototype%":typeof Set>"u"||!zo?st:ha(new Set()[Symbol.iterator]()),"%SharedArrayBuffer%":typeof SharedArrayBuffer>"u"?st:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":zo?ha(""[Symbol.iterator]()):st,"%Symbol%":zo?Symbol:st,"%SyntaxError%":Ai,"%ThrowTypeError%":Y8,"%TypedArray%":G8,"%TypeError%":ti,"%Uint8Array%":typeof Uint8Array>"u"?st:Uint8Array,"%Uint8ClampedArray%":typeof Uint8ClampedArray>"u"?st:Uint8ClampedArray,"%Uint16Array%":typeof Uint16Array>"u"?st:Uint16Array,"%Uint32Array%":typeof Uint32Array>"u"?st:Uint32Array,"%URIError%":URIError,"%WeakMap%":typeof WeakMap>"u"?st:WeakMap,"%WeakRef%":typeof WeakRef>"u"?st:WeakRef,"%WeakSet%":typeof WeakSet>"u"?st:WeakSet},K8=function e(t){var n;if(t==="%AsyncFunction%")n=rd("async function () {}");else if(t==="%GeneratorFunction%")n=rd("function* () {}");else if(t==="%AsyncGeneratorFunction%")n=rd("async function* () {}");else if(t==="%AsyncGenerator%"){var r=e("%AsyncGeneratorFunction%");r&&(n=r.prototype)}else if(t==="%AsyncIteratorPrototype%"){var a=e("%AsyncGenerator%");a&&(n=ha(a.prototype))}return ni[t]=n,n},nv={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},Hs=eh,cc=q8,Q8=Hs.call(Function.call,Array.prototype.concat),X8=Hs.call(Function.apply,Array.prototype.splice),rv=Hs.call(Function.call,String.prototype.replace),uc=Hs.call(Function.call,String.prototype.slice),Z8=Hs.call(Function.call,RegExp.prototype.exec),J8=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,eD=/\\(\\)?/g,tD=function(t){var n=uc(t,0,1),r=uc(t,-1);if(n==="%"&&r!=="%")throw new Ai("invalid intrinsic syntax, expected closing `%`");if(r==="%"&&n!=="%")throw new Ai("invalid intrinsic syntax, expected opening `%`");var a=[];return rv(t,J8,function(o,i,l,s){a[a.length]=l?rv(s,eD,"$1"):i||o}),a},nD=function(t,n){var r=t,a;if(cc(nv,r)&&(a=nv[r],r="%"+a[0]+"%"),cc(ni,r)){var o=ni[r];if(o===Ho&&(o=K8(r)),typeof o>"u"&&!n)throw new ti("intrinsic "+t+" exists, but is not available. Please file an issue!");return{alias:a,name:r,value:o}}throw new Ai("intrinsic "+t+" does not exist!")},th=function(t,n){if(typeof t!="string"||t.length===0)throw new ti("intrinsic name must be a non-empty string");if(arguments.length>1&&typeof n!="boolean")throw new ti('"allowMissing" argument must be a boolean');if(Z8(/^%?[^%]*%?$/,t)===null)throw new Ai("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var r=tD(t),a=r.length>0?r[0]:"",o=nD("%"+a+"%",n),i=o.name,l=o.value,s=!1,c=o.alias;c&&(a=c[0],X8(r,Q8([0,1],c)));for(var u=1,f=!0;u<r.length;u+=1){var d=r[u],m=uc(d,0,1),y=uc(d,-1);if((m==='"'||m==="'"||m==="`"||y==='"'||y==="'"||y==="`")&&m!==y)throw new Ai("property names with quotes must have matching quotes");if((d==="constructor"||!f)&&(s=!0),a+="."+d,i="%"+a+"%",cc(ni,i))l=ni[i];else if(l!=null){if(!(d in l)){if(!n)throw new ti("base intrinsic for "+t+" exists, but the property is not available.");return}if(so&&u+1>=r.length){var g=so(l,d);f=!!g,f&&"get"in g&&!("originalValue"in g.get)?l=g.get:l=l[d]}else f=cc(l,d),l=l[d];f&&!s&&(ni[i]=l)}}return l},v1={exports:{}};(function(e){var t=eh,n=th,r=n("%Function.prototype.apply%"),a=n("%Function.prototype.call%"),o=n("%Reflect.apply%",!0)||t.call(a,r),i=n("%Object.getOwnPropertyDescriptor%",!0),l=n("%Object.defineProperty%",!0),s=n("%Math.max%");if(l)try{l({},"a",{value:1})}catch{l=null}e.exports=function(f){var d=o(t,a,arguments);if(i&&l){var m=i(d,"length");m.configurable&&l(d,"length",{value:1+s(0,f.length-(arguments.length-1))})}return d};var c=function(){return o(t,r,arguments)};l?l(e.exports,"apply",{value:c}):e.exports.apply=c})(v1);var y1=th,A1=v1.exports,rD=A1(y1("String.prototype.indexOf")),aD=function(t,n){var r=y1(t,!!n);return typeof r=="function"&&rD(t,".prototype.")>-1?A1(r):r};const oD={},iD=Object.freeze(Object.defineProperty({__proto__:null,default:oD},Symbol.toStringTag,{value:"Module"})),sD=S0(iD);var nh=typeof Map=="function"&&Map.prototype,od=Object.getOwnPropertyDescriptor&&nh?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,dc=nh&&od&&typeof od.get=="function"?od.get:null,lD=nh&&Map.prototype.forEach,rh=typeof Set=="function"&&Set.prototype,id=Object.getOwnPropertyDescriptor&&rh?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,fc=rh&&id&&typeof id.get=="function"?id.get:null,cD=rh&&Set.prototype.forEach,uD=typeof WeakMap=="function"&&WeakMap.prototype,ms=uD?WeakMap.prototype.has:null,dD=typeof WeakSet=="function"&&WeakSet.prototype,gs=dD?WeakSet.prototype.has:null,fD=typeof WeakRef=="function"&&WeakRef.prototype,av=fD?WeakRef.prototype.deref:null,pD=Boolean.prototype.valueOf,hD=Object.prototype.toString,mD=Function.prototype.toString,gD=String.prototype.match,ah=String.prototype.slice,va=String.prototype.replace,vD=String.prototype.toUpperCase,ov=String.prototype.toLowerCase,b1=RegExp.prototype.test,iv=Array.prototype.concat,gr=Array.prototype.join,yD=Array.prototype.slice,sv=Math.floor,yf=typeof BigInt=="function"?BigInt.prototype.valueOf:null,sd=Object.getOwnPropertySymbols,Af=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Symbol.prototype.toString:null,bi=typeof Symbol=="function"&&typeof Symbol.iterator=="object",ln=typeof Symbol=="function"&&Symbol.toStringTag&&(typeof Symbol.toStringTag===bi?"object":"symbol")?Symbol.toStringTag:null,E1=Object.prototype.propertyIsEnumerable,lv=(typeof Reflect=="function"?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype?function(e){return e.__proto__}:null);function cv(e,t){if(e===1/0||e===-1/0||e!==e||e&&e>-1e3&&e<1e3||b1.call(/e/,t))return t;var n=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if(typeof e=="number"){var r=e<0?-sv(-e):sv(e);if(r!==e){var a=String(r),o=ah.call(t,a.length+1);return va.call(a,n,"$&_")+"."+va.call(va.call(o,/([0-9]{3})/g,"$&_"),/_$/,"")}}return va.call(t,n,"$&_")}var bf=sD,uv=bf.custom,dv=C1(uv)?uv:null,AD=function e(t,n,r,a){var o=n||{};if(ma(o,"quoteStyle")&&o.quoteStyle!=="single"&&o.quoteStyle!=="double")throw new TypeError('option "quoteStyle" must be "single" or "double"');if(ma(o,"maxStringLength")&&(typeof o.maxStringLength=="number"?o.maxStringLength<0&&o.maxStringLength!==1/0:o.maxStringLength!==null))throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var i=ma(o,"customInspect")?o.customInspect:!0;if(typeof i!="boolean"&&i!=="symbol")throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");if(ma(o,"indent")&&o.indent!==null&&o.indent!=="	"&&!(parseInt(o.indent,10)===o.indent&&o.indent>0))throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');if(ma(o,"numericSeparator")&&typeof o.numericSeparator!="boolean")throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');var l=o.numericSeparator;if(typeof t>"u")return"undefined";if(t===null)return"null";if(typeof t=="boolean")return t?"true":"false";if(typeof t=="string")return _1(t,o);if(typeof t=="number"){if(t===0)return 1/0/t>0?"0":"-0";var s=String(t);return l?cv(t,s):s}if(typeof t=="bigint"){var c=String(t)+"n";return l?cv(t,c):c}var u=typeof o.depth>"u"?5:o.depth;if(typeof r>"u"&&(r=0),r>=u&&u>0&&typeof t=="object")return Ef(t)?"[Array]":"[Object]";var f=MD(o,r);if(typeof a>"u")a=[];else if(w1(a,t)>=0)return"[Circular]";function d(M,N,F){if(N&&(a=yD.call(a),a.push(N)),F){var z={depth:o.depth};return ma(o,"quoteStyle")&&(z.quoteStyle=o.quoteStyle),e(M,z,r+1,a)}return e(M,o,r+1,a)}if(typeof t=="function"&&!fv(t)){var m=TD(t),y=Ol(t,d);return"[Function"+(m?": "+m:" (anonymous)")+"]"+(y.length>0?" { "+gr.call(y,", ")+" }":"")}if(C1(t)){var g=bi?va.call(String(t),/^(Symbol\(.*\))_[^)]*$/,"$1"):Af.call(t);return typeof t=="object"&&!bi?Ki(g):g}if($D(t)){for(var A="<"+ov.call(String(t.nodeName)),h=t.attributes||[],p=0;p<h.length;p++)A+=" "+h[p].name+"="+x1(bD(h[p].value),"double",o);return A+=">",t.childNodes&&t.childNodes.length&&(A+="..."),A+="</"+ov.call(String(t.nodeName))+">",A}if(Ef(t)){if(t.length===0)return"[]";var b=Ol(t,d);return f&&!RD(b)?"["+xf(b,f)+"]":"[ "+gr.call(b,", ")+" ]"}if(xD(t)){var v=Ol(t,d);return!("cause"in Error.prototype)&&"cause"in t&&!E1.call(t,"cause")?"{ ["+String(t)+"] "+gr.call(iv.call("[cause]: "+d(t.cause),v),", ")+" }":v.length===0?"["+String(t)+"]":"{ ["+String(t)+"] "+gr.call(v,", ")+" }"}if(typeof t=="object"&&i){if(dv&&typeof t[dv]=="function"&&bf)return bf(t,{depth:u-r});if(i!=="symbol"&&typeof t.inspect=="function")return t.inspect()}if(ID(t)){var x=[];return lD.call(t,function(M,N){x.push(d(N,t,!0)+" => "+d(M,t))}),pv("Map",dc.call(t),x,f)}if(LD(t)){var _=[];return cD.call(t,function(M){_.push(d(M,t))}),pv("Set",fc.call(t),_,f)}if(OD(t))return ld("WeakMap");if(PD(t))return ld("WeakSet");if(BD(t))return ld("WeakRef");if(wD(t))return Ki(d(Number(t)));if(SD(t))return Ki(d(yf.call(t)));if(_D(t))return Ki(pD.call(t));if(CD(t))return Ki(d(String(t)));if(!ED(t)&&!fv(t)){var S=Ol(t,d),k=lv?lv(t)===Object.prototype:t instanceof Object||t.constructor===Object,$=t instanceof Object?"":"null prototype",R=!k&&ln&&Object(t)===t&&ln in t?ah.call(Fa(t),8,-1):$?"Object":"",D=k||typeof t.constructor!="function"?"":t.constructor.name?t.constructor.name+" ":"",j=D+(R||$?"["+gr.call(iv.call([],R||[],$||[]),": ")+"] ":"");return S.length===0?j+"{}":f?j+"{"+xf(S,f)+"}":j+"{ "+gr.call(S,", ")+" }"}return String(t)};function x1(e,t,n){var r=(n.quoteStyle||t)==="double"?'"':"'";return r+e+r}function bD(e){return va.call(String(e),/"/g,"&quot;")}function Ef(e){return Fa(e)==="[object Array]"&&(!ln||!(typeof e=="object"&&ln in e))}function ED(e){return Fa(e)==="[object Date]"&&(!ln||!(typeof e=="object"&&ln in e))}function fv(e){return Fa(e)==="[object RegExp]"&&(!ln||!(typeof e=="object"&&ln in e))}function xD(e){return Fa(e)==="[object Error]"&&(!ln||!(typeof e=="object"&&ln in e))}function CD(e){return Fa(e)==="[object String]"&&(!ln||!(typeof e=="object"&&ln in e))}function wD(e){return Fa(e)==="[object Number]"&&(!ln||!(typeof e=="object"&&ln in e))}function _D(e){return Fa(e)==="[object Boolean]"&&(!ln||!(typeof e=="object"&&ln in e))}function C1(e){if(bi)return e&&typeof e=="object"&&e instanceof Symbol;if(typeof e=="symbol")return!0;if(!e||typeof e!="object"||!Af)return!1;try{return Af.call(e),!0}catch{}return!1}function SD(e){if(!e||typeof e!="object"||!yf)return!1;try{return yf.call(e),!0}catch{}return!1}var kD=Object.prototype.hasOwnProperty||function(e){return e in this};function ma(e,t){return kD.call(e,t)}function Fa(e){return hD.call(e)}function TD(e){if(e.name)return e.name;var t=gD.call(mD.call(e),/^function\s*([\w$]+)/);return t?t[1]:null}function w1(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1}function ID(e){if(!dc||!e||typeof e!="object")return!1;try{dc.call(e);try{fc.call(e)}catch{return!0}return e instanceof Map}catch{}return!1}function OD(e){if(!ms||!e||typeof e!="object")return!1;try{ms.call(e,ms);try{gs.call(e,gs)}catch{return!0}return e instanceof WeakMap}catch{}return!1}function BD(e){if(!av||!e||typeof e!="object")return!1;try{return av.call(e),!0}catch{}return!1}function LD(e){if(!fc||!e||typeof e!="object")return!1;try{fc.call(e);try{dc.call(e)}catch{return!0}return e instanceof Set}catch{}return!1}function PD(e){if(!gs||!e||typeof e!="object")return!1;try{gs.call(e,gs);try{ms.call(e,ms)}catch{return!0}return e instanceof WeakSet}catch{}return!1}function $D(e){return!e||typeof e!="object"?!1:typeof HTMLElement<"u"&&e instanceof HTMLElement?!0:typeof e.nodeName=="string"&&typeof e.getAttribute=="function"}function _1(e,t){if(e.length>t.maxStringLength){var n=e.length-t.maxStringLength,r="... "+n+" more character"+(n>1?"s":"");return _1(ah.call(e,0,t.maxStringLength),t)+r}var a=va.call(va.call(e,/(['\\])/g,"\\$1"),/[\x00-\x1f]/g,DD);return x1(a,"single",t)}function DD(e){var t=e.charCodeAt(0),n={8:"b",9:"t",10:"n",12:"f",13:"r"}[t];return n?"\\"+n:"\\x"+(t<16?"0":"")+vD.call(t.toString(16))}function Ki(e){return"Object("+e+")"}function ld(e){return e+" { ? }"}function pv(e,t,n,r){var a=r?xf(n,r):gr.call(n,", ");return e+" ("+t+") {"+a+"}"}function RD(e){for(var t=0;t<e.length;t++)if(w1(e[t],`
`)>=0)return!1;return!0}function MD(e,t){var n;if(e.indent==="	")n="	";else if(typeof e.indent=="number"&&e.indent>0)n=gr.call(Array(e.indent+1)," ");else return null;return{base:n,prev:gr.call(Array(t+1),n)}}function xf(e,t){if(e.length===0)return"";var n=`
`+t.prev+t.base;return n+gr.call(e,","+n)+`
`+t.prev}function Ol(e,t){var n=Ef(e),r=[];if(n){r.length=e.length;for(var a=0;a<e.length;a++)r[a]=ma(e,a)?t(e[a],e):""}var o=typeof sd=="function"?sd(e):[],i;if(bi){i={};for(var l=0;l<o.length;l++)i["$"+o[l]]=o[l]}for(var s in e)!ma(e,s)||n&&String(Number(s))===s&&s<e.length||bi&&i["$"+s]instanceof Symbol||(b1.call(/[^\w$]/,s)?r.push(t(s,e)+": "+t(e[s],e)):r.push(s+": "+t(e[s],e)));if(typeof sd=="function")for(var c=0;c<o.length;c++)E1.call(e,o[c])&&r.push("["+t(o[c])+"]: "+t(e[o[c]],e));return r}var oh=th,Bi=aD,ND=AD,FD=oh("%TypeError%"),Bl=oh("%WeakMap%",!0),Ll=oh("%Map%",!0),zD=Bi("WeakMap.prototype.get",!0),jD=Bi("WeakMap.prototype.set",!0),UD=Bi("WeakMap.prototype.has",!0),VD=Bi("Map.prototype.get",!0),HD=Bi("Map.prototype.set",!0),WD=Bi("Map.prototype.has",!0),ih=function(e,t){for(var n=e,r;(r=n.next)!==null;n=r)if(r.key===t)return n.next=r.next,r.next=e.next,e.next=r,r},qD=function(e,t){var n=ih(e,t);return n&&n.value},YD=function(e,t,n){var r=ih(e,t);r?r.value=n:e.next={key:t,next:e.next,value:n}},GD=function(e,t){return!!ih(e,t)},KD=function(){var t,n,r,a={assert:function(o){if(!a.has(o))throw new FD("Side channel does not contain "+ND(o))},get:function(o){if(Bl&&o&&(typeof o=="object"||typeof o=="function")){if(t)return zD(t,o)}else if(Ll){if(n)return VD(n,o)}else if(r)return qD(r,o)},has:function(o){if(Bl&&o&&(typeof o=="object"||typeof o=="function")){if(t)return UD(t,o)}else if(Ll){if(n)return WD(n,o)}else if(r)return GD(r,o);return!1},set:function(o,i){Bl&&o&&(typeof o=="object"||typeof o=="function")?(t||(t=new Bl),jD(t,o,i)):Ll?(n||(n=new Ll),HD(n,o,i)):(r||(r={key:{},next:null}),YD(r,o,i))}};return a},QD=String.prototype.replace,XD=/%20/g,cd={RFC1738:"RFC1738",RFC3986:"RFC3986"},sh={default:cd.RFC3986,formatters:{RFC1738:function(e){return QD.call(e,XD,"+")},RFC3986:function(e){return String(e)}},RFC1738:cd.RFC1738,RFC3986:cd.RFC3986},ZD=sh,ud=Object.prototype.hasOwnProperty,Za=Array.isArray,hr=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),JD=function(t){for(;t.length>1;){var n=t.pop(),r=n.obj[n.prop];if(Za(r)){for(var a=[],o=0;o<r.length;++o)typeof r[o]<"u"&&a.push(r[o]);n.obj[n.prop]=a}}},S1=function(t,n){for(var r=n&&n.plainObjects?Object.create(null):{},a=0;a<t.length;++a)typeof t[a]<"u"&&(r[a]=t[a]);return r},e4=function e(t,n,r){if(!n)return t;if(typeof n!="object"){if(Za(t))t.push(n);else if(t&&typeof t=="object")(r&&(r.plainObjects||r.allowPrototypes)||!ud.call(Object.prototype,n))&&(t[n]=!0);else return[t,n];return t}if(!t||typeof t!="object")return[t].concat(n);var a=t;return Za(t)&&!Za(n)&&(a=S1(t,r)),Za(t)&&Za(n)?(n.forEach(function(o,i){if(ud.call(t,i)){var l=t[i];l&&typeof l=="object"&&o&&typeof o=="object"?t[i]=e(l,o,r):t.push(o)}else t[i]=o}),t):Object.keys(n).reduce(function(o,i){var l=n[i];return ud.call(o,i)?o[i]=e(o[i],l,r):o[i]=l,o},a)},t4=function(t,n){return Object.keys(n).reduce(function(r,a){return r[a]=n[a],r},t)},n4=function(e,t,n){var r=e.replace(/\+/g," ");if(n==="iso-8859-1")return r.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(r)}catch{return r}},r4=function(t,n,r,a,o){if(t.length===0)return t;var i=t;if(typeof t=="symbol"?i=Symbol.prototype.toString.call(t):typeof t!="string"&&(i=String(t)),r==="iso-8859-1")return escape(i).replace(/%u[0-9a-f]{4}/gi,function(u){return"%26%23"+parseInt(u.slice(2),16)+"%3B"});for(var l="",s=0;s<i.length;++s){var c=i.charCodeAt(s);if(c===45||c===46||c===95||c===126||c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122||o===ZD.RFC1738&&(c===40||c===41)){l+=i.charAt(s);continue}if(c<128){l=l+hr[c];continue}if(c<2048){l=l+(hr[192|c>>6]+hr[128|c&63]);continue}if(c<55296||c>=57344){l=l+(hr[224|c>>12]+hr[128|c>>6&63]+hr[128|c&63]);continue}s+=1,c=65536+((c&1023)<<10|i.charCodeAt(s)&1023),l+=hr[240|c>>18]+hr[128|c>>12&63]+hr[128|c>>6&63]+hr[128|c&63]}return l},a4=function(t){for(var n=[{obj:{o:t},prop:"o"}],r=[],a=0;a<n.length;++a)for(var o=n[a],i=o.obj[o.prop],l=Object.keys(i),s=0;s<l.length;++s){var c=l[s],u=i[c];typeof u=="object"&&u!==null&&r.indexOf(u)===-1&&(n.push({obj:i,prop:c}),r.push(u))}return JD(n),t},o4=function(t){return Object.prototype.toString.call(t)==="[object RegExp]"},i4=function(t){return!t||typeof t!="object"?!1:!!(t.constructor&&t.constructor.isBuffer&&t.constructor.isBuffer(t))},s4=function(t,n){return[].concat(t,n)},l4=function(t,n){if(Za(t)){for(var r=[],a=0;a<t.length;a+=1)r.push(n(t[a]));return r}return n(t)},k1={arrayToObject:S1,assign:t4,combine:s4,compact:a4,decode:n4,encode:r4,isBuffer:i4,isRegExp:o4,maybeMap:l4,merge:e4},T1=KD,Cf=k1,vs=sh,c4=Object.prototype.hasOwnProperty,hv={brackets:function(t){return t+"[]"},comma:"comma",indices:function(t,n){return t+"["+n+"]"},repeat:function(t){return t}},Nr=Array.isArray,u4=String.prototype.split,d4=Array.prototype.push,I1=function(e,t){d4.apply(e,Nr(t)?t:[t])},f4=Date.prototype.toISOString,mv=vs.default,Kt={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:Cf.encode,encodeValuesOnly:!1,format:mv,formatter:vs.formatters[mv],indices:!1,serializeDate:function(t){return f4.call(t)},skipNulls:!1,strictNullHandling:!1},p4=function(t){return typeof t=="string"||typeof t=="number"||typeof t=="boolean"||typeof t=="symbol"||typeof t=="bigint"},dd={},h4=function e(t,n,r,a,o,i,l,s,c,u,f,d,m,y,g,A){for(var h=t,p=A,b=0,v=!1;(p=p.get(dd))!==void 0&&!v;){var x=p.get(t);if(b+=1,typeof x<"u"){if(x===b)throw new RangeError("Cyclic object value");v=!0}typeof p.get(dd)>"u"&&(b=0)}if(typeof s=="function"?h=s(n,h):h instanceof Date?h=f(h):r==="comma"&&Nr(h)&&(h=Cf.maybeMap(h,function(le){return le instanceof Date?f(le):le})),h===null){if(o)return l&&!y?l(n,Kt.encoder,g,"key",d):n;h=""}if(p4(h)||Cf.isBuffer(h)){if(l){var _=y?n:l(n,Kt.encoder,g,"key",d);if(r==="comma"&&y){for(var S=u4.call(String(h),","),k="",$=0;$<S.length;++$)k+=($===0?"":",")+m(l(S[$],Kt.encoder,g,"value",d));return[m(_)+(a&&Nr(h)&&S.length===1?"[]":"")+"="+k]}return[m(_)+"="+m(l(h,Kt.encoder,g,"value",d))]}return[m(n)+"="+m(String(h))]}var R=[];if(typeof h>"u")return R;var D;if(r==="comma"&&Nr(h))D=[{value:h.length>0?h.join(",")||null:void 0}];else if(Nr(s))D=s;else{var j=Object.keys(h);D=c?j.sort(c):j}for(var M=a&&Nr(h)&&h.length===1?n+"[]":n,N=0;N<D.length;++N){var F=D[N],z=typeof F=="object"&&typeof F.value<"u"?F.value:h[F];if(!(i&&z===null)){var X=Nr(h)?typeof r=="function"?r(M,F):M:M+(u?"."+F:"["+F+"]");A.set(t,b);var Y=T1();Y.set(dd,A),I1(R,e(z,X,r,a,o,i,l,s,c,u,f,d,m,y,g,Y))}}return R},m4=function(t){if(!t)return Kt;if(t.encoder!==null&&typeof t.encoder<"u"&&typeof t.encoder!="function")throw new TypeError("Encoder has to be a function.");var n=t.charset||Kt.charset;if(typeof t.charset<"u"&&t.charset!=="utf-8"&&t.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=vs.default;if(typeof t.format<"u"){if(!c4.call(vs.formatters,t.format))throw new TypeError("Unknown format option provided.");r=t.format}var a=vs.formatters[r],o=Kt.filter;return(typeof t.filter=="function"||Nr(t.filter))&&(o=t.filter),{addQueryPrefix:typeof t.addQueryPrefix=="boolean"?t.addQueryPrefix:Kt.addQueryPrefix,allowDots:typeof t.allowDots>"u"?Kt.allowDots:!!t.allowDots,charset:n,charsetSentinel:typeof t.charsetSentinel=="boolean"?t.charsetSentinel:Kt.charsetSentinel,delimiter:typeof t.delimiter>"u"?Kt.delimiter:t.delimiter,encode:typeof t.encode=="boolean"?t.encode:Kt.encode,encoder:typeof t.encoder=="function"?t.encoder:Kt.encoder,encodeValuesOnly:typeof t.encodeValuesOnly=="boolean"?t.encodeValuesOnly:Kt.encodeValuesOnly,filter:o,format:r,formatter:a,serializeDate:typeof t.serializeDate=="function"?t.serializeDate:Kt.serializeDate,skipNulls:typeof t.skipNulls=="boolean"?t.skipNulls:Kt.skipNulls,sort:typeof t.sort=="function"?t.sort:null,strictNullHandling:typeof t.strictNullHandling=="boolean"?t.strictNullHandling:Kt.strictNullHandling}},g4=function(e,t){var n=e,r=m4(t),a,o;typeof r.filter=="function"?(o=r.filter,n=o("",n)):Nr(r.filter)&&(o=r.filter,a=o);var i=[];if(typeof n!="object"||n===null)return"";var l;t&&t.arrayFormat in hv?l=t.arrayFormat:t&&"indices"in t?l=t.indices?"indices":"repeat":l="indices";var s=hv[l];if(t&&"commaRoundTrip"in t&&typeof t.commaRoundTrip!="boolean")throw new TypeError("`commaRoundTrip` must be a boolean, or absent");var c=s==="comma"&&t&&t.commaRoundTrip;a||(a=Object.keys(n)),r.sort&&a.sort(r.sort);for(var u=T1(),f=0;f<a.length;++f){var d=a[f];r.skipNulls&&n[d]===null||I1(i,h4(n[d],d,s,c,r.strictNullHandling,r.skipNulls,r.encode?r.encoder:null,r.filter,r.sort,r.allowDots,r.serializeDate,r.format,r.formatter,r.encodeValuesOnly,r.charset,u))}var m=i.join(r.delimiter),y=r.addQueryPrefix===!0?"?":"";return r.charsetSentinel&&(r.charset==="iso-8859-1"?y+="utf8=%26%2310003%3B&":y+="utf8=%E2%9C%93&"),m.length>0?y+m:""},Ei=k1,wf=Object.prototype.hasOwnProperty,v4=Array.isArray,Ut={allowDots:!1,allowPrototypes:!1,allowSparse:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:Ei.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},y4=function(e){return e.replace(/&#(\d+);/g,function(t,n){return String.fromCharCode(parseInt(n,10))})},O1=function(e,t){return e&&typeof e=="string"&&t.comma&&e.indexOf(",")>-1?e.split(","):e},A4="utf8=%26%2310003%3B",b4="utf8=%E2%9C%93",E4=function(t,n){var r={},a=n.ignoreQueryPrefix?t.replace(/^\?/,""):t,o=n.parameterLimit===1/0?void 0:n.parameterLimit,i=a.split(n.delimiter,o),l=-1,s,c=n.charset;if(n.charsetSentinel)for(s=0;s<i.length;++s)i[s].indexOf("utf8=")===0&&(i[s]===b4?c="utf-8":i[s]===A4&&(c="iso-8859-1"),l=s,s=i.length);for(s=0;s<i.length;++s)if(s!==l){var u=i[s],f=u.indexOf("]="),d=f===-1?u.indexOf("="):f+1,m,y;d===-1?(m=n.decoder(u,Ut.decoder,c,"key"),y=n.strictNullHandling?null:""):(m=n.decoder(u.slice(0,d),Ut.decoder,c,"key"),y=Ei.maybeMap(O1(u.slice(d+1),n),function(g){return n.decoder(g,Ut.decoder,c,"value")})),y&&n.interpretNumericEntities&&c==="iso-8859-1"&&(y=y4(y)),u.indexOf("[]=")>-1&&(y=v4(y)?[y]:y),wf.call(r,m)?r[m]=Ei.combine(r[m],y):r[m]=y}return r},x4=function(e,t,n,r){for(var a=r?t:O1(t,n),o=e.length-1;o>=0;--o){var i,l=e[o];if(l==="[]"&&n.parseArrays)i=[].concat(a);else{i=n.plainObjects?Object.create(null):{};var s=l.charAt(0)==="["&&l.charAt(l.length-1)==="]"?l.slice(1,-1):l,c=parseInt(s,10);!n.parseArrays&&s===""?i={0:a}:!isNaN(c)&&l!==s&&String(c)===s&&c>=0&&n.parseArrays&&c<=n.arrayLimit?(i=[],i[c]=a):s!=="__proto__"&&(i[s]=a)}a=i}return a},C4=function(t,n,r,a){if(!!t){var o=r.allowDots?t.replace(/\.([^.[]+)/g,"[$1]"):t,i=/(\[[^[\]]*])/,l=/(\[[^[\]]*])/g,s=r.depth>0&&i.exec(o),c=s?o.slice(0,s.index):o,u=[];if(c){if(!r.plainObjects&&wf.call(Object.prototype,c)&&!r.allowPrototypes)return;u.push(c)}for(var f=0;r.depth>0&&(s=l.exec(o))!==null&&f<r.depth;){if(f+=1,!r.plainObjects&&wf.call(Object.prototype,s[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(s[1])}return s&&u.push("["+o.slice(s.index)+"]"),x4(u,n,r,a)}},w4=function(t){if(!t)return Ut;if(t.decoder!==null&&t.decoder!==void 0&&typeof t.decoder!="function")throw new TypeError("Decoder has to be a function.");if(typeof t.charset<"u"&&t.charset!=="utf-8"&&t.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var n=typeof t.charset>"u"?Ut.charset:t.charset;return{allowDots:typeof t.allowDots>"u"?Ut.allowDots:!!t.allowDots,allowPrototypes:typeof t.allowPrototypes=="boolean"?t.allowPrototypes:Ut.allowPrototypes,allowSparse:typeof t.allowSparse=="boolean"?t.allowSparse:Ut.allowSparse,arrayLimit:typeof t.arrayLimit=="number"?t.arrayLimit:Ut.arrayLimit,charset:n,charsetSentinel:typeof t.charsetSentinel=="boolean"?t.charsetSentinel:Ut.charsetSentinel,comma:typeof t.comma=="boolean"?t.comma:Ut.comma,decoder:typeof t.decoder=="function"?t.decoder:Ut.decoder,delimiter:typeof t.delimiter=="string"||Ei.isRegExp(t.delimiter)?t.delimiter:Ut.delimiter,depth:typeof t.depth=="number"||t.depth===!1?+t.depth:Ut.depth,ignoreQueryPrefix:t.ignoreQueryPrefix===!0,interpretNumericEntities:typeof t.interpretNumericEntities=="boolean"?t.interpretNumericEntities:Ut.interpretNumericEntities,parameterLimit:typeof t.parameterLimit=="number"?t.parameterLimit:Ut.parameterLimit,parseArrays:t.parseArrays!==!1,plainObjects:typeof t.plainObjects=="boolean"?t.plainObjects:Ut.plainObjects,strictNullHandling:typeof t.strictNullHandling=="boolean"?t.strictNullHandling:Ut.strictNullHandling}},_4=function(e,t){var n=w4(t);if(e===""||e===null||typeof e>"u")return n.plainObjects?Object.create(null):{};for(var r=typeof e=="string"?E4(e,n):e,a=n.plainObjects?Object.create(null):{},o=Object.keys(r),i=0;i<o.length;++i){var l=o[i],s=C4(l,r[l],n,typeof e=="string");a=Ei.merge(a,s,n)}return n.allowSparse===!0?a:Ei.compact(a)},S4=g4,k4=_4,T4=sh,I4={formats:T4,parse:k4,stringify:S4};function B1(e,t){return function(){return e.apply(t,arguments)}}const{toString:L1}=Object.prototype,{getPrototypeOf:lh}=Object,ch=(e=>t=>{const n=L1.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),Xr=e=>(e=e.toLowerCase(),t=>ch(t)===e),uu=e=>t=>typeof t===e,{isArray:Ws}=Array,_f=uu("undefined");function O4(e){return e!==null&&!_f(e)&&e.constructor!==null&&!_f(e.constructor)&&Li(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const P1=Xr("ArrayBuffer");function B4(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&P1(e.buffer),t}const L4=uu("string"),Li=uu("function"),$1=uu("number"),D1=e=>e!==null&&typeof e=="object",P4=e=>e===!0||e===!1,Fl=e=>{if(ch(e)!=="object")return!1;const t=lh(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},$4=Xr("Date"),D4=Xr("File"),R4=Xr("Blob"),M4=Xr("FileList"),N4=e=>D1(e)&&Li(e.pipe),F4=e=>{const t="[object FormData]";return e&&(typeof FormData=="function"&&e instanceof FormData||L1.call(e)===t||Li(e.toString)&&e.toString()===t)},z4=Xr("URLSearchParams"),j4=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function du(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,a;if(typeof e!="object"&&(e=[e]),Ws(e))for(r=0,a=e.length;r<a;r++)t.call(null,e[r],r,e);else{const o=n?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let l;for(r=0;r<i;r++)l=o[r],t.call(null,e[l],l,e)}}function Sf(){const e={},t=(n,r)=>{Fl(e[r])&&Fl(n)?e[r]=Sf(e[r],n):Fl(n)?e[r]=Sf({},n):Ws(n)?e[r]=n.slice():e[r]=n};for(let n=0,r=arguments.length;n<r;n++)arguments[n]&&du(arguments[n],t);return e}const U4=(e,t,n,{allOwnKeys:r}={})=>(du(t,(a,o)=>{n&&Li(a)?e[o]=B1(a,n):e[o]=a},{allOwnKeys:r}),e),V4=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),H4=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},W4=(e,t,n,r)=>{let a,o,i;const l={};if(t=t||{},e==null)return t;do{for(a=Object.getOwnPropertyNames(e),o=a.length;o-- >0;)i=a[o],(!r||r(i,e,t))&&!l[i]&&(t[i]=e[i],l[i]=!0);e=n!==!1&&lh(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},q4=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},Y4=e=>{if(!e)return null;if(Ws(e))return e;let t=e.length;if(!$1(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},G4=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&lh(Uint8Array)),K4=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let a;for(;(a=r.next())&&!a.done;){const o=a.value;t.call(e,o[0],o[1])}},Q4=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},X4=Xr("HTMLFormElement"),Z4=e=>e.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,function(n,r,a){return r.toUpperCase()+a}),gv=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),J4=Xr("RegExp"),R1=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};du(n,(a,o)=>{t(a,o,e)!==!1&&(r[o]=a)}),Object.defineProperties(e,r)},eR=e=>{R1(e,(t,n)=>{const r=e[n];if(!!Li(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not read-only method '"+n+"'")})}})},tR=(e,t)=>{const n={},r=a=>{a.forEach(o=>{n[o]=!0})};return Ws(e)?r(e):r(String(e).split(t)),n},nR=()=>{},rR=(e,t)=>(e=+e,Number.isFinite(e)?e:t),ge={isArray:Ws,isArrayBuffer:P1,isBuffer:O4,isFormData:F4,isArrayBufferView:B4,isString:L4,isNumber:$1,isBoolean:P4,isObject:D1,isPlainObject:Fl,isUndefined:_f,isDate:$4,isFile:D4,isBlob:R4,isRegExp:J4,isFunction:Li,isStream:N4,isURLSearchParams:z4,isTypedArray:G4,isFileList:M4,forEach:du,merge:Sf,extend:U4,trim:j4,stripBOM:V4,inherits:H4,toFlatObject:W4,kindOf:ch,kindOfTest:Xr,endsWith:q4,toArray:Y4,forEachEntry:K4,matchAll:Q4,isHTMLForm:X4,hasOwnProperty:gv,hasOwnProp:gv,reduceDescriptors:R1,freezeMethods:eR,toObjectSet:tR,toCamelCase:Z4,noop:nR,toFiniteNumber:rR};function ft(e,t,n,r,a){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),a&&(this.response=a)}ge.inherits(ft,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const M1=ft.prototype,N1={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{N1[e]={value:e}});Object.defineProperties(ft,N1);Object.defineProperty(M1,"isAxiosError",{value:!0});ft.from=(e,t,n,r,a,o)=>{const i=Object.create(M1);return ge.toFlatObject(e,i,function(s){return s!==Error.prototype},l=>l!=="isAxiosError"),ft.call(i,e.message,t,n,r,a),i.cause=e,i.name=e.name,o&&Object.assign(i,o),i};var aR=typeof self=="object"?self.FormData:window.FormData;function kf(e){return ge.isPlainObject(e)||ge.isArray(e)}function F1(e){return ge.endsWith(e,"[]")?e.slice(0,-2):e}function vv(e,t,n){return e?e.concat(t).map(function(a,o){return a=F1(a),!n&&o?"["+a+"]":a}).join(n?".":""):t}function oR(e){return ge.isArray(e)&&!e.some(kf)}const iR=ge.toFlatObject(ge,{},null,function(t){return/^is[A-Z]/.test(t)});function sR(e){return e&&ge.isFunction(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator]}function fu(e,t,n){if(!ge.isObject(e))throw new TypeError("target must be an object");t=t||new(aR||FormData),n=ge.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(g,A){return!ge.isUndefined(A[g])});const r=n.metaTokens,a=n.visitor||u,o=n.dots,i=n.indexes,s=(n.Blob||typeof Blob<"u"&&Blob)&&sR(t);if(!ge.isFunction(a))throw new TypeError("visitor must be a function");function c(y){if(y===null)return"";if(ge.isDate(y))return y.toISOString();if(!s&&ge.isBlob(y))throw new ft("Blob is not supported. Use a Buffer instead.");return ge.isArrayBuffer(y)||ge.isTypedArray(y)?s&&typeof Blob=="function"?new Blob([y]):Buffer.from(y):y}function u(y,g,A){let h=y;if(y&&!A&&typeof y=="object"){if(ge.endsWith(g,"{}"))g=r?g:g.slice(0,-2),y=JSON.stringify(y);else if(ge.isArray(y)&&oR(y)||ge.isFileList(y)||ge.endsWith(g,"[]")&&(h=ge.toArray(y)))return g=F1(g),h.forEach(function(b,v){!(ge.isUndefined(b)||b===null)&&t.append(i===!0?vv([g],v,o):i===null?g:g+"[]",c(b))}),!1}return kf(y)?!0:(t.append(vv(A,g,o),c(y)),!1)}const f=[],d=Object.assign(iR,{defaultVisitor:u,convertValue:c,isVisitable:kf});function m(y,g){if(!ge.isUndefined(y)){if(f.indexOf(y)!==-1)throw Error("Circular reference detected in "+g.join("."));f.push(y),ge.forEach(y,function(h,p){(!(ge.isUndefined(h)||h===null)&&a.call(t,h,ge.isString(p)?p.trim():p,g,d))===!0&&m(h,g?g.concat(p):[p])}),f.pop()}}if(!ge.isObject(e))throw new TypeError("data must be an object");return m(e),t}function yv(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function uh(e,t){this._pairs=[],e&&fu(e,this,t)}const z1=uh.prototype;z1.append=function(t,n){this._pairs.push([t,n])};z1.toString=function(t){const n=t?function(r){return t.call(this,r,yv)}:yv;return this._pairs.map(function(a){return n(a[0])+"="+n(a[1])},"").join("&")};function lR(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function j1(e,t,n){if(!t)return e;const r=n&&n.encode||lR,a=n&&n.serialize;let o;if(a?o=a(t,n):o=ge.isURLSearchParams(t)?t.toString():new uh(t,n).toString(r),o){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+o}return e}class Av{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){ge.forEach(this.handlers,function(r){r!==null&&t(r)})}}const U1={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},cR=typeof URLSearchParams<"u"?URLSearchParams:uh,uR=FormData,dR=(()=>{let e;return typeof navigator<"u"&&((e=navigator.product)==="ReactNative"||e==="NativeScript"||e==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),Vr={isBrowser:!0,classes:{URLSearchParams:cR,FormData:uR,Blob},isStandardBrowserEnv:dR,protocols:["http","https","file","blob","url","data"]};function fR(e,t){return fu(e,new Vr.classes.URLSearchParams,Object.assign({visitor:function(n,r,a,o){return Vr.isNode&&ge.isBuffer(n)?(this.append(r,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)}},t))}function pR(e){return ge.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function hR(e){const t={},n=Object.keys(e);let r;const a=n.length;let o;for(r=0;r<a;r++)o=n[r],t[o]=e[o];return t}function V1(e){function t(n,r,a,o){let i=n[o++];const l=Number.isFinite(+i),s=o>=n.length;return i=!i&&ge.isArray(a)?a.length:i,s?(ge.hasOwnProp(a,i)?a[i]=[a[i],r]:a[i]=r,!l):((!a[i]||!ge.isObject(a[i]))&&(a[i]=[]),t(n,r,a[i],o)&&ge.isArray(a[i])&&(a[i]=hR(a[i])),!l)}if(ge.isFormData(e)&&ge.isFunction(e.entries)){const n={};return ge.forEachEntry(e,(r,a)=>{t(pR(r),a,n,0)}),n}return null}function mR(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new ft("Request failed with status code "+n.status,[ft.ERR_BAD_REQUEST,ft.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const gR=Vr.isStandardBrowserEnv?function(){return{write:function(n,r,a,o,i,l){const s=[];s.push(n+"="+encodeURIComponent(r)),ge.isNumber(a)&&s.push("expires="+new Date(a).toGMTString()),ge.isString(o)&&s.push("path="+o),ge.isString(i)&&s.push("domain="+i),l===!0&&s.push("secure"),document.cookie=s.join("; ")},read:function(n){const r=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return r?decodeURIComponent(r[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function vR(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function yR(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function H1(e,t){return e&&!vR(t)?yR(e,t):t}const AR=Vr.isStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function a(o){let i=o;return t&&(n.setAttribute("href",i),i=n.href),n.setAttribute("href",i),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=a(window.location.href),function(i){const l=ge.isString(i)?a(i):i;return l.protocol===r.protocol&&l.host===r.host}}():function(){return function(){return!0}}();function qs(e,t,n){ft.call(this,e==null?"canceled":e,ft.ERR_CANCELED,t,n),this.name="CanceledError"}ge.inherits(qs,ft,{__CANCEL__:!0});function bR(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}const ER=ge.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),xR=e=>{const t={};let n,r,a;return e&&e.split(`
`).forEach(function(i){a=i.indexOf(":"),n=i.substring(0,a).trim().toLowerCase(),r=i.substring(a+1).trim(),!(!n||t[n]&&ER[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},bv=Symbol("internals"),W1=Symbol("defaults");function es(e){return e&&String(e).trim().toLowerCase()}function zl(e){return e===!1||e==null?e:ge.isArray(e)?e.map(zl):String(e)}function CR(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}function Ev(e,t,n,r){if(ge.isFunction(r))return r.call(this,t,n);if(!!ge.isString(t)){if(ge.isString(r))return t.indexOf(r)!==-1;if(ge.isRegExp(r))return r.test(t)}}function wR(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function _R(e,t){const n=ge.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(a,o,i){return this[r].call(this,t,a,o,i)},configurable:!0})})}function Qi(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,a;for(;r-- >0;)if(a=n[r],t===a.toLowerCase())return a;return null}function Nn(e,t){e&&this.set(e),this[W1]=t||null}Object.assign(Nn.prototype,{set:function(e,t,n){const r=this;function a(o,i,l){const s=es(i);if(!s)throw new Error("header name must be a non-empty string");const c=Qi(r,s);c&&l!==!0&&(r[c]===!1||l===!1)||(r[c||i]=zl(o))}return ge.isPlainObject(e)?ge.forEach(e,(o,i)=>{a(o,i,t)}):a(t,e,n),this},get:function(e,t){if(e=es(e),!e)return;const n=Qi(this,e);if(n){const r=this[n];if(!t)return r;if(t===!0)return CR(r);if(ge.isFunction(t))return t.call(this,r,n);if(ge.isRegExp(t))return t.exec(r);throw new TypeError("parser must be boolean|regexp|function")}},has:function(e,t){if(e=es(e),e){const n=Qi(this,e);return!!(n&&(!t||Ev(this,this[n],n,t)))}return!1},delete:function(e,t){const n=this;let r=!1;function a(o){if(o=es(o),o){const i=Qi(n,o);i&&(!t||Ev(n,n[i],i,t))&&(delete n[i],r=!0)}}return ge.isArray(e)?e.forEach(a):a(e),r},clear:function(){return Object.keys(this).forEach(this.delete.bind(this))},normalize:function(e){const t=this,n={};return ge.forEach(this,(r,a)=>{const o=Qi(n,a);if(o){t[o]=zl(r),delete t[a];return}const i=e?wR(a):String(a).trim();i!==a&&delete t[a],t[i]=zl(r),n[i]=!0}),this},toJSON:function(e){const t=Object.create(null);return ge.forEach(Object.assign({},this[W1]||null,this),(n,r)=>{n==null||n===!1||(t[r]=e&&ge.isArray(n)?n.join(", "):n)}),t}});Object.assign(Nn,{from:function(e){return ge.isString(e)?new this(xR(e)):e instanceof this?e:new this(e)},accessor:function(e){const n=(this[bv]=this[bv]={accessors:{}}).accessors,r=this.prototype;function a(o){const i=es(o);n[i]||(_R(r,o),n[i]=!0)}return ge.isArray(e)?e.forEach(a):a(e),this}});Nn.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent"]);ge.freezeMethods(Nn.prototype);ge.freezeMethods(Nn);function SR(e,t){e=e||10;const n=new Array(e),r=new Array(e);let a=0,o=0,i;return t=t!==void 0?t:1e3,function(s){const c=Date.now(),u=r[o];i||(i=c),n[a]=s,r[a]=c;let f=o,d=0;for(;f!==a;)d+=n[f++],f=f%e;if(a=(a+1)%e,a===o&&(o=(o+1)%e),c-i<t)return;const m=u&&c-u;return m?Math.round(d*1e3/m):void 0}}function xv(e,t){let n=0;const r=SR(50,250);return a=>{const o=a.loaded,i=a.lengthComputable?a.total:void 0,l=o-n,s=r(l),c=o<=i;n=o;const u={loaded:o,total:i,progress:i?o/i:void 0,bytes:l,rate:s||void 0,estimated:s&&i&&c?(i-o)/s:void 0};u[t?"download":"upload"]=!0,e(u)}}function Cv(e){return new Promise(function(n,r){let a=e.data;const o=Nn.from(e.headers).normalize(),i=e.responseType;let l;function s(){e.cancelToken&&e.cancelToken.unsubscribe(l),e.signal&&e.signal.removeEventListener("abort",l)}ge.isFormData(a)&&Vr.isStandardBrowserEnv&&o.setContentType(!1);let c=new XMLHttpRequest;if(e.auth){const m=e.auth.username||"",y=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(m+":"+y))}const u=H1(e.baseURL,e.url);c.open(e.method.toUpperCase(),j1(u,e.params,e.paramsSerializer),!0),c.timeout=e.timeout;function f(){if(!c)return;const m=Nn.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders()),g={data:!i||i==="text"||i==="json"?c.responseText:c.response,status:c.status,statusText:c.statusText,headers:m,config:e,request:c};mR(function(h){n(h),s()},function(h){r(h),s()},g),c=null}if("onloadend"in c?c.onloadend=f:c.onreadystatechange=function(){!c||c.readyState!==4||c.status===0&&!(c.responseURL&&c.responseURL.indexOf("file:")===0)||setTimeout(f)},c.onabort=function(){!c||(r(new ft("Request aborted",ft.ECONNABORTED,e,c)),c=null)},c.onerror=function(){r(new ft("Network Error",ft.ERR_NETWORK,e,c)),c=null},c.ontimeout=function(){let y=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const g=e.transitional||U1;e.timeoutErrorMessage&&(y=e.timeoutErrorMessage),r(new ft(y,g.clarifyTimeoutError?ft.ETIMEDOUT:ft.ECONNABORTED,e,c)),c=null},Vr.isStandardBrowserEnv){const m=(e.withCredentials||AR(u))&&e.xsrfCookieName&&gR.read(e.xsrfCookieName);m&&o.set(e.xsrfHeaderName,m)}a===void 0&&o.setContentType(null),"setRequestHeader"in c&&ge.forEach(o.toJSON(),function(y,g){c.setRequestHeader(g,y)}),ge.isUndefined(e.withCredentials)||(c.withCredentials=!!e.withCredentials),i&&i!=="json"&&(c.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&c.addEventListener("progress",xv(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",xv(e.onUploadProgress)),(e.cancelToken||e.signal)&&(l=m=>{!c||(r(!m||m.type?new qs(null,e,c):m),c.abort(),c=null)},e.cancelToken&&e.cancelToken.subscribe(l),e.signal&&(e.signal.aborted?l():e.signal.addEventListener("abort",l)));const d=bR(u);if(d&&Vr.protocols.indexOf(d)===-1){r(new ft("Unsupported protocol "+d+":",ft.ERR_BAD_REQUEST,e));return}c.send(a||null)})}const wv={http:Cv,xhr:Cv},_v={getAdapter:e=>{if(ge.isString(e)){const t=wv[e];if(!e)throw Error(ge.hasOwnProp(e)?`Adapter '${e}' is not available in the build`:`Can not resolve adapter '${e}'`);return t}if(!ge.isFunction(e))throw new TypeError("adapter is not a function");return e},adapters:wv},kR={"Content-Type":"application/x-www-form-urlencoded"};function TR(){let e;return typeof XMLHttpRequest<"u"?e=_v.getAdapter("xhr"):typeof process<"u"&&ge.kindOf(process)==="process"&&(e=_v.getAdapter("http")),e}function IR(e,t,n){if(ge.isString(e))try{return(t||JSON.parse)(e),ge.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const Pi={transitional:U1,adapter:TR(),transformRequest:[function(t,n){const r=n.getContentType()||"",a=r.indexOf("application/json")>-1,o=ge.isObject(t);if(o&&ge.isHTMLForm(t)&&(t=new FormData(t)),ge.isFormData(t))return a&&a?JSON.stringify(V1(t)):t;if(ge.isArrayBuffer(t)||ge.isBuffer(t)||ge.isStream(t)||ge.isFile(t)||ge.isBlob(t))return t;if(ge.isArrayBufferView(t))return t.buffer;if(ge.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return fR(t,this.formSerializer).toString();if((l=ge.isFileList(t))||r.indexOf("multipart/form-data")>-1){const s=this.env&&this.env.FormData;return fu(l?{"files[]":t}:t,s&&new s,this.formSerializer)}}return o||a?(n.setContentType("application/json",!1),IR(t)):t}],transformResponse:[function(t){const n=this.transitional||Pi.transitional,r=n&&n.forcedJSONParsing,a=this.responseType==="json";if(t&&ge.isString(t)&&(r&&!this.responseType||a)){const i=!(n&&n.silentJSONParsing)&&a;try{return JSON.parse(t)}catch(l){if(i)throw l.name==="SyntaxError"?ft.from(l,ft.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Vr.classes.FormData,Blob:Vr.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};ge.forEach(["delete","get","head"],function(t){Pi.headers[t]={}});ge.forEach(["post","put","patch"],function(t){Pi.headers[t]=ge.merge(kR)});function fd(e,t){const n=this||Pi,r=t||n,a=Nn.from(r.headers);let o=r.data;return ge.forEach(e,function(l){o=l.call(n,o,a.normalize(),t?t.status:void 0)}),a.normalize(),o}function q1(e){return!!(e&&e.__CANCEL__)}function pd(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new qs}function Sv(e){return pd(e),e.headers=Nn.from(e.headers),e.data=fd.call(e,e.transformRequest),(e.adapter||Pi.adapter)(e).then(function(r){return pd(e),r.data=fd.call(e,e.transformResponse,r),r.headers=Nn.from(r.headers),r},function(r){return q1(r)||(pd(e),r&&r.response&&(r.response.data=fd.call(e,e.transformResponse,r.response),r.response.headers=Nn.from(r.response.headers))),Promise.reject(r)})}function Ls(e,t){t=t||{};const n={};function r(c,u){return ge.isPlainObject(c)&&ge.isPlainObject(u)?ge.merge(c,u):ge.isPlainObject(u)?ge.merge({},u):ge.isArray(u)?u.slice():u}function a(c){if(ge.isUndefined(t[c])){if(!ge.isUndefined(e[c]))return r(void 0,e[c])}else return r(e[c],t[c])}function o(c){if(!ge.isUndefined(t[c]))return r(void 0,t[c])}function i(c){if(ge.isUndefined(t[c])){if(!ge.isUndefined(e[c]))return r(void 0,e[c])}else return r(void 0,t[c])}function l(c){if(c in t)return r(e[c],t[c]);if(c in e)return r(void 0,e[c])}const s={url:o,method:o,data:o,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:l};return ge.forEach(Object.keys(e).concat(Object.keys(t)),function(u){const f=s[u]||a,d=f(u);ge.isUndefined(d)&&f!==l||(n[u]=d)}),n}const Y1="1.1.3",dh={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{dh[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const kv={};dh.transitional=function(t,n,r){function a(o,i){return"[Axios v"+Y1+"] Transitional option '"+o+"'"+i+(r?". "+r:"")}return(o,i,l)=>{if(t===!1)throw new ft(a(i," has been removed"+(n?" in "+n:"")),ft.ERR_DEPRECATED);return n&&!kv[i]&&(kv[i]=!0,console.warn(a(i," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,i,l):!0}};function OR(e,t,n){if(typeof e!="object")throw new ft("options must be an object",ft.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let a=r.length;for(;a-- >0;){const o=r[a],i=t[o];if(i){const l=e[o],s=l===void 0||i(l,o,e);if(s!==!0)throw new ft("option "+o+" must be "+s,ft.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new ft("Unknown option "+o,ft.ERR_BAD_OPTION)}}const Tf={assertOptions:OR,validators:dh},ca=Tf.validators;class lo{constructor(t){this.defaults=t,this.interceptors={request:new Av,response:new Av}}request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=Ls(this.defaults,n);const{transitional:r,paramsSerializer:a}=n;r!==void 0&&Tf.assertOptions(r,{silentJSONParsing:ca.transitional(ca.boolean),forcedJSONParsing:ca.transitional(ca.boolean),clarifyTimeoutError:ca.transitional(ca.boolean)},!1),a!==void 0&&Tf.assertOptions(a,{encode:ca.function,serialize:ca.function},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();const o=n.headers&&ge.merge(n.headers.common,n.headers[n.method]);o&&ge.forEach(["delete","get","head","post","put","patch","common"],function(y){delete n.headers[y]}),n.headers=new Nn(n.headers,o);const i=[];let l=!0;this.interceptors.request.forEach(function(y){typeof y.runWhen=="function"&&y.runWhen(n)===!1||(l=l&&y.synchronous,i.unshift(y.fulfilled,y.rejected))});const s=[];this.interceptors.response.forEach(function(y){s.push(y.fulfilled,y.rejected)});let c,u=0,f;if(!l){const m=[Sv.bind(this),void 0];for(m.unshift.apply(m,i),m.push.apply(m,s),f=m.length,c=Promise.resolve(n);u<f;)c=c.then(m[u++],m[u++]);return c}f=i.length;let d=n;for(u=0;u<f;){const m=i[u++],y=i[u++];try{d=m(d)}catch(g){y.call(this,g);break}}try{c=Sv.call(this,d)}catch(m){return Promise.reject(m)}for(u=0,f=s.length;u<f;)c=c.then(s[u++],s[u++]);return c}getUri(t){t=Ls(this.defaults,t);const n=H1(t.baseURL,t.url);return j1(n,t.params,t.paramsSerializer)}}ge.forEach(["delete","get","head","options"],function(t){lo.prototype[t]=function(n,r){return this.request(Ls(r||{},{method:t,url:n,data:(r||{}).data}))}});ge.forEach(["post","put","patch"],function(t){function n(r){return function(o,i,l){return this.request(Ls(l||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:o,data:i}))}}lo.prototype[t]=n(),lo.prototype[t+"Form"]=n(!0)});class fh{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const r=this;this.promise.then(a=>{if(!r._listeners)return;let o=r._listeners.length;for(;o-- >0;)r._listeners[o](a);r._listeners=null}),this.promise.then=a=>{let o;const i=new Promise(l=>{r.subscribe(l),o=l}).then(a);return i.cancel=function(){r.unsubscribe(o)},i},t(function(o,i,l){r.reason||(r.reason=new qs(o,i,l),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new fh(function(a){t=a}),cancel:t}}}function BR(e){return function(n){return e.apply(null,n)}}function LR(e){return ge.isObject(e)&&e.isAxiosError===!0}function G1(e){const t=new lo(e),n=B1(lo.prototype.request,t);return ge.extend(n,lo.prototype,t,{allOwnKeys:!0}),ge.extend(n,t,null,{allOwnKeys:!0}),n.create=function(a){return G1(Ls(e,a))},n}const nn=G1(Pi);nn.Axios=lo;nn.CanceledError=qs;nn.CancelToken=fh;nn.isCancel=q1;nn.VERSION=Y1;nn.toFormData=fu;nn.AxiosError=ft;nn.Cancel=nn.CanceledError;nn.all=function(t){return Promise.all(t)};nn.spread=BR;nn.isAxiosError=LR;nn.formToJSON=e=>V1(ge.isHTMLForm(e)?new FormData(e):e);var Ja=mn(A8);const PR="production";console.log("\u{1F680} ~ file: api.js ~ line 5 ~ MODE",PR);nn.defaults.baseURL="";nn.interceptors.request.use(e=>(e.headers["X-Requested-With"]="XMLHttpRequest",e.headers.token=Ja.token,e.headers.lang=Ja.lang,e.headers["Content-Type"]==="application/x-www-form-urlencoded;charset=UTF-8"&&(e.data=I4.stringify(e.data)),e),e=>Promise.reject(e));nn.interceptors.response.use(e=>(Ja.loadingShow=!1,e.data.code===-1?Ja.token?(At(e.data.msg),setTimeout(()=>{Ja.logout()},1500)):Ja.logout():e.data.code===-2&&At(e.data.msg),e),e=>(Ja.loadingShow=!1,Promise.reject(e)));const $R=e=>e.data.code<0?Object.assign(e,{success:!1}):Object.assign(e,{success:!0}),ke=async(e,t={},n)=>$R(await nn.post(e,t,{baseURL:n||""})),zH=e=>ke("/main/index/init",e),jH=e=>ke("/main/lang/getData",e),DR=e=>ke("/main/send/getEmailCode",e),RR=e=>ke("/main/user/reg",e),MR=e=>ke("/main/send/getMobileCode",e),NR=e=>ke("/main/user/login",e),ph=e=>ke("/main/config/getInfo",e),UH=e=>ke("/main/user/forgot",e),pu=e=>ke("/home/user/getInfo",e),VH=e=>ke("/home/userReal/add",e),HH=e=>ke("/home/upload/getSts",e),WH=e=>ke("/home/user/editEmail",e),qH=e=>ke("/home/user/editMobile",e),K1=e=>ke("/main/countryArea/getList",e),YH=e=>ke("/home/user/editPassword",e),GH=e=>ke("/home/user/editFundPassword",e),KH=e=>ke("/home/userBank/getList",e),QH=e=>ke("/home/userBank/add",e),XH=e=>ke("/home/userBank/del",e),ZH=e=>ke("/home/userBank/getInfo",e),JH=e=>ke("/home/userBank/edit",e),eW=e=>ke("/home/userWallet/add",e),tW=e=>ke("/home/userWallet/del",e),nW=e=>ke("/home/userWallet/getList",e),rW=e=>ke("/home/trade/getWalletConfig",e),FR=e=>ke("/home/trade/getRechargeList",e),zR=e=>ke("/home/trade/getWithdrawList",e),aW=e=>ke("/home/trade/getInfo",e),oW=e=>ke("/home/userRecharge/add2",e),iW=e=>ke("/home/trade/getInfo",e),sW=e=>ke("/home/userWithdraw/add2",e),lW=e=>ke("/home/userRecharge/getList",e),cW=e=>ke("/home/userWithdraw/getList",e),Q1=e=>ke("/main/article/getNoticeList",e),X1=e=>ke("/main/article/getInfo",e),uW=e=>ke("/home/userMsg/getList",e),dW=e=>ke("/home/userMsg/setAllRead",e),fW=e=>ke("/home/userMsg/getInfo",e),pW=e=>ke("/home/userMsg/del",e),hW=e=>ke("/home/userMsg/delAll",e),jR=e=>ke("/home/userMsg/getReadNums",e),mW=e=>ke("/home/userAmount/getList",e),gW=e=>ke("/home/userMining/getTotalInfo",e),vW=e=>ke("/main/mining/getList",e),yW=e=>ke("/main/mining/getInfo",e),AW=e=>ke("/home/userMining/add",e),bW=e=>ke("/home/userMining/getList",e),EW=e=>ke("/home/userMining/back",e),xW=e=>ke("/home/user/getBalanceList",e),CW=e=>ke("/main/article/getMiningList",e),wW=e=>ke("/home/userRebate/getTeamBetInfo",e),_W=e=>ke("/main/map/getList",e),Z1=e=>ke("/main/index/getRandList",e),UR=e=>ke("/home/user/getQuantifyInfo",e),J1=e=>ke("/main/level/getList",e),VR=e=>ke("/home/userQuantify/add",e),SW=e=>ke("/home/userQuantify/getList",e),eE=e=>ke("/main/index/getImgCode",e),kW=e=>ke("/home/task/getList",e),TW=e=>ke("/home/task/endTask",e),IW=e=>ke("/home/lottery/getList",e),OW=e=>ke("/home/lottery/start",e),BW=e=>ke("/home/lottery/getUserLotteryList",e),LW=e=>ke("home/userWithdraw/cancel",e),PW=e=>ke("/main/article/getInfo",e),$W=()=>ke("/main/wallet/getList"),DW=e=>ke("/main/config/getInfo",e),RW=e=>ke("/main/product/getKline",e,""),MW=()=>ke("/main/product/getDCPTGData",null),NW=()=>ke("/main/article/getQaList",null),FW=()=>ke("/main/product/getDCPTGRate",null),zW=e=>ke("home/userExchange/exchangeDCPTG",e),jW=e=>ke("/home/userExchange/getList ",e),UW=e=>ke("/main/lottery/getRoomInfo",e),VW=e=>ke("/main/lottery/roomGroup",e),HW=e=>ke("/main/lottery/getDataList",e),WW=e=>ke("/home/userBet/add",e),qW=e=>ke("/home/lotteryRoom/betInfo",e),YW=e=>ke("/home/userBet/history",e),GW=e=>ke("/main/lottery/getHistory",e),KW=e=>ke("/home/userBet/getInfo",e),QW=e=>ke("/home/userRebate/getTeamInfo",e),XW=e=>ke("/home/userRebate/getLayerInfo",e),tE=(e,t)=>{const n=e.__vccOpts||e;for(const[r,a]of t)n[r]=a;return n},Tv={};class HR{constructor(){Cn(this,"ws",null);Cn(this,"url","");Cn(this,"connected",!1);Cn(this,"reconcat_time",2e3);Cn(this,"failconcat_time",1e3);Cn(this,"timeout",5e3);Cn(this,"timeoutId",null);Cn(this,"token","");Cn(this,"group",{});Cn(this,"fn",Tv);Cn(this,"active",!0);Cn(this,"needInit",!1)}init(){var t;for(let n in this.group)(t=this.ws)==null||t.send(JSON.stringify({type:"leaveGroup",group:n}));this.group={},this.fn=Tv,this.reloadFn=null}connect(t,n){var r;if(this.token=n,this.ws&&((r=this.ws)==null||r.close(),this.ws=null),!t){console.error("WebSocket URL is not set.");return}this.active=!0,this.url=t,this.ws=new WebSocket(t),this.ws.onopen=()=>{var a,o;this.needInit&&typeof this.fn.onreconcat=="function"&&this.fn.onreconcat(),this.token&&((a=this.ws)==null||a.send(JSON.stringify({type:"token",token:this.token})));for(let i in this.group)(o=this.ws)==null||o.send(JSON.stringify({type:"joinGroup",group:i}));this.connected=!0,console.log("connected"),this.reloadFn&&this.reloadFn(),this.start()},this.ws.onclose=()=>{this.connected=!1,typeof this.fn.onclose=="function"&&(this.needInit=!0,this.fn.onclose()),this.active&&setTimeout(()=>{this.connect()},this.reconcat_time)},this.ws.onmessage=a=>{var i;const o=JSON.parse(a.data);o.type=="group"?typeof this.group[o.fn]=="function"&&this.group[o.fn](o.data):o.type=="fn"?typeof this.fn[o.fn]=="function"&&this.fn[o.fn](o.data):o.type=="ping"&&((i=this.ws)==null||i.send(JSON.stringify({type:"pong"})))},this.ws.onerror=a=>{console.log("WebSocket\u8FDE\u63A5\u53D1\u751F\u9519\u8BEF",a),this.connect()}}start(){this.timeoutId&&clearInterval(this.timeoutId),this.timeoutId=setInterval(()=>{var t;(t=this.ws)==null||t.send(JSON.stringify({type:"ping"}))},this.timeout)}reloadData(t){this.reloadFn=t}send(t){var n,r;if(((n=this.ws)==null?void 0:n.readyState)===1)(r=this.ws)==null||r.send(JSON.stringify(t));else{if(!this.active)return;setTimeout(()=>{var a;(a=this.ws)==null||a.send(JSON.stringify(t))},this.failconcat_time)}}setToken(t){var n,r;this.token=t,((n=this.ws)==null?void 0:n.readyState)==1&&((r=this.ws)==null||r.send(JSON.stringify({type:"token",token:t})))}addFn(t,n){this.fn[t]=n}removeFn(t){delete this.fn[t]}joinGroup(t,n){var r,a;if(this.group[t]=n,((r=this.ws)==null?void 0:r.readyState)===1)return(a=this.ws)==null?void 0:a.send(JSON.stringify({type:"joinGroup",group:t}))}leaveGroup(t){var n,r;delete this.group[t],((n=this.ws)==null?void 0:n.readyState)===1&&((r=this.ws)==null||r.send(JSON.stringify({type:"leaveGroup",group:t})))}close(){var t;this.active=!1,(t=this.ws)==null||t.close(),this.ws=null,this.timeoutId&&clearInterval(this.timeoutId)}}const zr=new HR,hh=""+new URL("../images/touxiang.png",import.meta.url).href,mh=""+new URL("../images/kefu.png",import.meta.url).href,WR=""+new URL("../images/xiaoxi.png",import.meta.url).href,qR=""+new URL("../images/Recharge.png",import.meta.url).href,YR=""+new URL("../images/Withdraw.png",import.meta.url).href,GR=""+new URL("../images/laba.png",import.meta.url).href,nE=""+new URL("../images/Team.png",import.meta.url).href,KR=""+new URL("../images/currency2.png",import.meta.url).href,QR=""+new URL("../video/wetify.mp4",import.meta.url).href;const XR={class:"c_notice_pop"},ZR={class:"c-pop-container g-flex-column g-flex-align-center"},JR={class:"c-pop-head"},eM=w("i",{class:"iconfont icon-guanbi2"},null,-1),tM=[eM],nM=w("div",{class:"c-pop-title g-flex-align-center g-flex-justify-center"},[w("div",{class:"c-pop-title-text"})],-1),rM={class:"c-pop-content-box g-flex-column"},aM={class:"c-pop-content g-self-no-scrollbar"},oM={class:"c-pop-content-list"},iM={class:"c-pop-item-title g-flex-align-center"},sM={class:"c-pop-item-title-nums g-flex-align-center g-flex-justify-center"},lM={key:0,class:"c-pop-item-title-text"},cM=["innerHTML"],uM={key:0,class:"c-pop-bottom c-pop-item-content-text",style:{"text-align":"center",height:"24vw"}},dM={style:{"text-align":"center","font-size":"20px",height:"14vw","margin-top":"10px",color:"red"}},fM=w("br",null,null,-1),rE={__name:"NoticePop",setup(e,{expose:t}){Vn(),Hn();const n=mn(),r=rn(),a=oe(()=>r.tm("noticePop"));let o=re(!1),i=re(0);function l(b){if(n.isFirstNeedShow===0?(u.value=5,d()):u.value=0,s.list=b,o.value=!0,b.length){var v=new Date().getTime();b[0].end_time>0&&b[0].begin_time*1e3<=v&&(i.value=b[0].end_time*1e3,A())}}let s=He({list:[]});function c(){u.value>0||(m(),o.value=!1)}let u=re(5),f=re(0);function d(){n.setIsFirstNeedShow(1),u.value=u.value-1,f.value=setInterval(()=>{u.value=u.value-1,u.value<=0&&(u.value=0,m())},1e3)}function m(){clearInterval(f.value),f.value=0}let y=re(""),g=re(0);function A(){if(!(!i.value||i.value<=0)){var b=new Date().getTime(),v=i.value-b;v<=0||(h(v),g.value=setInterval(function(){b=new Date().getTime(),v=i.value-b,h(v),v<=0&&(y.value="",p())},1e3))}}function h(b){var v=Math.floor(b/36e5),x=Math.floor(b%(1e3*60*60)/(1e3*60)),_=Math.floor(b%(1e3*60)/1e3);v=v<10?"0"+v:v,x=x<10?"0"+x:x,_=_<10?"0"+_:_,y.value=v+":"+x+":"+_}function p(){clearInterval(g.value),g.value=0}return t({onShow:l}),Un(()=>{m(),p()}),(b,v)=>{const x=Fn("van-popup");return Ve(),Ge("div",XR,[C(x,{"close-on-click-overlay":!1,"safe-area-inset-bottom":"",class:"c-pop",show:V(o),"onUpdate:show":v[0]||(v[0]=_=>ct(o)?o.value=_:o=_),position:"center"},{default:Ht(()=>[w("div",ZR,[w("div",JR,[Fe(w("div",{onClick:c,class:"c-pop-head-secs g-flex-align-center g-flex-justify-center"},ce(V(u))+"S",513),[[We,V(u)>0]]),Fe(w("div",{class:"c-pop-close2",onClick:c},tM,512),[[We,V(u)==0]])]),nM,w("div",rM,[w("div",aM,[w("div",oM,[(Ve(!0),Ge(lt,null,zn(V(s).list,(_,S)=>(Ve(),Ge("div",{class:"c-pop-content-item",key:S},[w("div",iM,[w("div",sM,ce(S+1),1),_.title?(Ve(),Ge("div",lM,ce(_.title),1)):Zt("",!0)]),w("div",{class:"c-pop-item-content-text",innerHTML:_.content},null,8,cM)]))),128))])])]),V(y)?(Ve(),Ge("div",uM,[w("div",dM,[Sa(ce(V(a).rewardCountdownText)+": ",1),fM,w("span",null,ce(V(y)),1)])])):Zt("",!0)])]),_:1},8,["show"])])}}};function Iv(e){return e!==null&&typeof e=="object"&&"constructor"in e&&e.constructor===Object}function gh(e,t){e===void 0&&(e={}),t===void 0&&(t={}),Object.keys(t).forEach(function(n){typeof e[n]>"u"?e[n]=t[n]:Iv(t[n])&&Iv(e[n])&&Object.keys(t[n]).length>0&&gh(e[n],t[n])})}var aE={body:{},addEventListener:function(){},removeEventListener:function(){},activeElement:{blur:function(){},nodeName:""},querySelector:function(){return null},querySelectorAll:function(){return[]},getElementById:function(){return null},createEvent:function(){return{initEvent:function(){}}},createElement:function(){return{children:[],childNodes:[],style:{},setAttribute:function(){},getElementsByTagName:function(){return[]}}},createElementNS:function(){return{}},importNode:function(){return null},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function xn(){var e=typeof document<"u"?document:{};return gh(e,aE),e}var pM={document:aE,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState:function(){},pushState:function(){},go:function(){},back:function(){}},CustomEvent:function(){return this},addEventListener:function(){},removeEventListener:function(){},getComputedStyle:function(){return{getPropertyValue:function(){return""}}},Image:function(){},Date:function(){},screen:{},setTimeout:function(){},clearTimeout:function(){},matchMedia:function(){return{}},requestAnimationFrame:function(e){return typeof setTimeout>"u"?(e(),null):setTimeout(e,0)},cancelAnimationFrame:function(e){typeof setTimeout>"u"||clearTimeout(e)}};function Yt(){var e=typeof window<"u"?window:{};return gh(e,pM),e}function hM(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}function If(e){return If=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)},If(e)}function pc(e,t){return pc=Object.setPrototypeOf||function(r,a){return r.__proto__=a,r},pc(e,t)}function mM(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function jl(e,t,n){return mM()?jl=Reflect.construct:jl=function(a,o,i){var l=[null];l.push.apply(l,o);var s=Function.bind.apply(a,l),c=new s;return i&&pc(c,i.prototype),c},jl.apply(null,arguments)}function gM(e){return Function.toString.call(e).indexOf("[native code]")!==-1}function Of(e){var t=typeof Map=="function"?new Map:void 0;return Of=function(r){if(r===null||!gM(r))return r;if(typeof r!="function")throw new TypeError("Super expression must either be null or a function");if(typeof t<"u"){if(t.has(r))return t.get(r);t.set(r,a)}function a(){return jl(r,arguments,If(this).constructor)}return a.prototype=Object.create(r.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),pc(a,r)},Of(e)}function vM(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function yM(e){var t=e.__proto__;Object.defineProperty(e,"__proto__",{get:function(){return t},set:function(r){t.__proto__=r}})}var ya=function(e){hM(t,e);function t(n){var r;return r=e.call.apply(e,[this].concat(n))||this,yM(vM(r)),r}return t}(Of(Array));function Ys(e){e===void 0&&(e=[]);var t=[];return e.forEach(function(n){Array.isArray(n)?t.push.apply(t,Ys(n)):t.push(n)}),t}function oE(e,t){return Array.prototype.filter.call(e,t)}function AM(e){for(var t=[],n=0;n<e.length;n+=1)t.indexOf(e[n])===-1&&t.push(e[n]);return t}function bM(e,t){if(typeof e!="string")return[e];for(var n=[],r=t.querySelectorAll(e),a=0;a<r.length;a+=1)n.push(r[a]);return n}function Re(e,t){var n=Yt(),r=xn(),a=[];if(!t&&e instanceof ya)return e;if(!e)return new ya(a);if(typeof e=="string"){var o=e.trim();if(o.indexOf("<")>=0&&o.indexOf(">")>=0){var i="div";o.indexOf("<li")===0&&(i="ul"),o.indexOf("<tr")===0&&(i="tbody"),(o.indexOf("<td")===0||o.indexOf("<th")===0)&&(i="tr"),o.indexOf("<tbody")===0&&(i="table"),o.indexOf("<option")===0&&(i="select");var l=r.createElement(i);l.innerHTML=o;for(var s=0;s<l.childNodes.length;s+=1)a.push(l.childNodes[s])}else a=bM(e.trim(),t||r)}else if(e.nodeType||e===n||e===r)a.push(e);else if(Array.isArray(e)){if(e instanceof ya)return e;a=e}return new ya(AM(a))}Re.fn=ya.prototype;function EM(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=Ys(t.map(function(a){return a.split(" ")}));return this.forEach(function(a){var o;(o=a.classList).add.apply(o,r)}),this}function xM(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=Ys(t.map(function(a){return a.split(" ")}));return this.forEach(function(a){var o;(o=a.classList).remove.apply(o,r)}),this}function CM(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=Ys(t.map(function(a){return a.split(" ")}));this.forEach(function(a){r.forEach(function(o){a.classList.toggle(o)})})}function wM(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=Ys(t.map(function(a){return a.split(" ")}));return oE(this,function(a){return r.filter(function(o){return a.classList.contains(o)}).length>0}).length>0}function _M(e,t){if(arguments.length===1&&typeof e=="string")return this[0]?this[0].getAttribute(e):void 0;for(var n=0;n<this.length;n+=1)if(arguments.length===2)this[n].setAttribute(e,t);else for(var r in e)this[n][r]=e[r],this[n].setAttribute(r,e[r]);return this}function SM(e){for(var t=0;t<this.length;t+=1)this[t].removeAttribute(e);return this}function kM(e){for(var t=0;t<this.length;t+=1)this[t].style.transform=e;return this}function TM(e){for(var t=0;t<this.length;t+=1)this[t].style.transitionDuration=typeof e!="string"?e+"ms":e;return this}function IM(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=t[0],a=t[1],o=t[2],i=t[3];typeof t[1]=="function"&&(r=t[0],o=t[1],i=t[2],a=void 0),i||(i=!1);function l(g){var A=g.target;if(!!A){var h=g.target.dom7EventData||[];if(h.indexOf(g)<0&&h.unshift(g),Re(A).is(a))o.apply(A,h);else for(var p=Re(A).parents(),b=0;b<p.length;b+=1)Re(p[b]).is(a)&&o.apply(p[b],h)}}function s(g){var A=g&&g.target?g.target.dom7EventData||[]:[];A.indexOf(g)<0&&A.unshift(g),o.apply(this,A)}for(var c=r.split(" "),u,f=0;f<this.length;f+=1){var d=this[f];if(a)for(u=0;u<c.length;u+=1){var y=c[u];d.dom7LiveListeners||(d.dom7LiveListeners={}),d.dom7LiveListeners[y]||(d.dom7LiveListeners[y]=[]),d.dom7LiveListeners[y].push({listener:o,proxyListener:l}),d.addEventListener(y,l,i)}else for(u=0;u<c.length;u+=1){var m=c[u];d.dom7Listeners||(d.dom7Listeners={}),d.dom7Listeners[m]||(d.dom7Listeners[m]=[]),d.dom7Listeners[m].push({listener:o,proxyListener:s}),d.addEventListener(m,s,i)}}return this}function OM(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=t[0],a=t[1],o=t[2],i=t[3];typeof t[1]=="function"&&(r=t[0],o=t[1],i=t[2],a=void 0),i||(i=!1);for(var l=r.split(" "),s=0;s<l.length;s+=1)for(var c=l[s],u=0;u<this.length;u+=1){var f=this[u],d=void 0;if(!a&&f.dom7Listeners?d=f.dom7Listeners[c]:a&&f.dom7LiveListeners&&(d=f.dom7LiveListeners[c]),d&&d.length)for(var m=d.length-1;m>=0;m-=1){var y=d[m];o&&y.listener===o||o&&y.listener&&y.listener.dom7proxy&&y.listener.dom7proxy===o?(f.removeEventListener(c,y.proxyListener,i),d.splice(m,1)):o||(f.removeEventListener(c,y.proxyListener,i),d.splice(m,1))}}return this}function BM(){for(var e=Yt(),t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];for(var a=n[0].split(" "),o=n[1],i=0;i<a.length;i+=1)for(var l=a[i],s=0;s<this.length;s+=1){var c=this[s];if(e.CustomEvent){var u=new e.CustomEvent(l,{detail:o,bubbles:!0,cancelable:!0});c.dom7EventData=n.filter(function(f,d){return d>0}),c.dispatchEvent(u),c.dom7EventData=[],delete c.dom7EventData}}return this}function LM(e){var t=this;function n(r){r.target===this&&(e.call(this,r),t.off("transitionend",n))}return e&&t.on("transitionend",n),this}function PM(e){if(this.length>0){if(e){var t=this.styles();return this[0].offsetWidth+parseFloat(t.getPropertyValue("margin-right"))+parseFloat(t.getPropertyValue("margin-left"))}return this[0].offsetWidth}return null}function $M(e){if(this.length>0){if(e){var t=this.styles();return this[0].offsetHeight+parseFloat(t.getPropertyValue("margin-top"))+parseFloat(t.getPropertyValue("margin-bottom"))}return this[0].offsetHeight}return null}function DM(){if(this.length>0){var e=Yt(),t=xn(),n=this[0],r=n.getBoundingClientRect(),a=t.body,o=n.clientTop||a.clientTop||0,i=n.clientLeft||a.clientLeft||0,l=n===e?e.scrollY:n.scrollTop,s=n===e?e.scrollX:n.scrollLeft;return{top:r.top+l-o,left:r.left+s-i}}return null}function RM(){var e=Yt();return this[0]?e.getComputedStyle(this[0],null):{}}function MM(e,t){var n=Yt(),r;if(arguments.length===1)if(typeof e=="string"){if(this[0])return n.getComputedStyle(this[0],null).getPropertyValue(e)}else{for(r=0;r<this.length;r+=1)for(var a in e)this[r].style[a]=e[a];return this}if(arguments.length===2&&typeof e=="string"){for(r=0;r<this.length;r+=1)this[r].style[e]=t;return this}return this}function NM(e){return e?(this.forEach(function(t,n){e.apply(t,[t,n])}),this):this}function FM(e){var t=oE(this,e);return Re(t)}function zM(e){if(typeof e>"u")return this[0]?this[0].innerHTML:null;for(var t=0;t<this.length;t+=1)this[t].innerHTML=e;return this}function jM(e){if(typeof e>"u")return this[0]?this[0].textContent.trim():null;for(var t=0;t<this.length;t+=1)this[t].textContent=e;return this}function UM(e){var t=Yt(),n=xn(),r=this[0],a,o;if(!r||typeof e>"u")return!1;if(typeof e=="string"){if(r.matches)return r.matches(e);if(r.webkitMatchesSelector)return r.webkitMatchesSelector(e);if(r.msMatchesSelector)return r.msMatchesSelector(e);for(a=Re(e),o=0;o<a.length;o+=1)if(a[o]===r)return!0;return!1}if(e===n)return r===n;if(e===t)return r===t;if(e.nodeType||e instanceof ya){for(a=e.nodeType?[e]:e,o=0;o<a.length;o+=1)if(a[o]===r)return!0;return!1}return!1}function VM(){var e=this[0],t;if(e){for(t=0;(e=e.previousSibling)!==null;)e.nodeType===1&&(t+=1);return t}}function HM(e){if(typeof e>"u")return this;var t=this.length;if(e>t-1)return Re([]);if(e<0){var n=t+e;return n<0?Re([]):Re([this[n]])}return Re([this[e]])}function WM(){for(var e,t=xn(),n=0;n<arguments.length;n+=1){e=n<0||arguments.length<=n?void 0:arguments[n];for(var r=0;r<this.length;r+=1)if(typeof e=="string"){var a=t.createElement("div");for(a.innerHTML=e;a.firstChild;)this[r].appendChild(a.firstChild)}else if(e instanceof ya)for(var o=0;o<e.length;o+=1)this[r].appendChild(e[o]);else this[r].appendChild(e)}return this}function qM(e){var t=xn(),n,r;for(n=0;n<this.length;n+=1)if(typeof e=="string"){var a=t.createElement("div");for(a.innerHTML=e,r=a.childNodes.length-1;r>=0;r-=1)this[n].insertBefore(a.childNodes[r],this[n].childNodes[0])}else if(e instanceof ya)for(r=0;r<e.length;r+=1)this[n].insertBefore(e[r],this[n].childNodes[0]);else this[n].insertBefore(e,this[n].childNodes[0]);return this}function YM(e){return this.length>0?e?this[0].nextElementSibling&&Re(this[0].nextElementSibling).is(e)?Re([this[0].nextElementSibling]):Re([]):this[0].nextElementSibling?Re([this[0].nextElementSibling]):Re([]):Re([])}function GM(e){var t=[],n=this[0];if(!n)return Re([]);for(;n.nextElementSibling;){var r=n.nextElementSibling;e?Re(r).is(e)&&t.push(r):t.push(r),n=r}return Re(t)}function KM(e){if(this.length>0){var t=this[0];return e?t.previousElementSibling&&Re(t.previousElementSibling).is(e)?Re([t.previousElementSibling]):Re([]):t.previousElementSibling?Re([t.previousElementSibling]):Re([])}return Re([])}function QM(e){var t=[],n=this[0];if(!n)return Re([]);for(;n.previousElementSibling;){var r=n.previousElementSibling;e?Re(r).is(e)&&t.push(r):t.push(r),n=r}return Re(t)}function XM(e){for(var t=[],n=0;n<this.length;n+=1)this[n].parentNode!==null&&(e?Re(this[n].parentNode).is(e)&&t.push(this[n].parentNode):t.push(this[n].parentNode));return Re(t)}function ZM(e){for(var t=[],n=0;n<this.length;n+=1)for(var r=this[n].parentNode;r;)e?Re(r).is(e)&&t.push(r):t.push(r),r=r.parentNode;return Re(t)}function JM(e){var t=this;return typeof e>"u"?Re([]):(t.is(e)||(t=t.parents(e).eq(0)),t)}function e6(e){for(var t=[],n=0;n<this.length;n+=1)for(var r=this[n].querySelectorAll(e),a=0;a<r.length;a+=1)t.push(r[a]);return Re(t)}function t6(e){for(var t=[],n=0;n<this.length;n+=1)for(var r=this[n].children,a=0;a<r.length;a+=1)(!e||Re(r[a]).is(e))&&t.push(r[a]);return Re(t)}function n6(){for(var e=0;e<this.length;e+=1)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this}var Ov={addClass:EM,removeClass:xM,hasClass:wM,toggleClass:CM,attr:_M,removeAttr:SM,transform:kM,transition:TM,on:IM,off:OM,trigger:BM,transitionEnd:LM,outerWidth:PM,outerHeight:$M,styles:RM,offset:DM,css:MM,each:NM,html:zM,text:jM,is:UM,index:VM,eq:HM,append:WM,prepend:qM,next:YM,nextAll:GM,prev:KM,prevAll:QM,parent:XM,parents:ZM,closest:JM,find:e6,children:t6,filter:FM,remove:n6};Object.keys(Ov).forEach(function(e){Object.defineProperty(Re.fn,e,{value:Ov[e],writable:!0})});function r6(e){var t=e;Object.keys(t).forEach(function(n){try{t[n]=null}catch{}try{delete t[n]}catch{}})}function hc(e,t){return t===void 0&&(t=0),setTimeout(e,t)}function xa(){return Date.now()}function a6(e){var t=Yt(),n;return t.getComputedStyle&&(n=t.getComputedStyle(e,null)),!n&&e.currentStyle&&(n=e.currentStyle),n||(n=e.style),n}function o6(e,t){t===void 0&&(t="x");var n=Yt(),r,a,o,i=a6(e);return n.WebKitCSSMatrix?(a=i.transform||i.webkitTransform,a.split(",").length>6&&(a=a.split(", ").map(function(l){return l.replace(",",".")}).join(", ")),o=new n.WebKitCSSMatrix(a==="none"?"":a)):(o=i.MozTransform||i.OTransform||i.MsTransform||i.msTransform||i.transform||i.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),r=o.toString().split(",")),t==="x"&&(n.WebKitCSSMatrix?a=o.m41:r.length===16?a=parseFloat(r[12]):a=parseFloat(r[4])),t==="y"&&(n.WebKitCSSMatrix?a=o.m42:r.length===16?a=parseFloat(r[13]):a=parseFloat(r[5])),a||0}function ts(e){return typeof e=="object"&&e!==null&&e.constructor&&Object.prototype.toString.call(e).slice(8,-1)==="Object"}function Tt(){for(var e=Object(arguments.length<=0?void 0:arguments[0]),t=["__proto__","constructor","prototype"],n=1;n<arguments.length;n+=1){var r=n<0||arguments.length<=n?void 0:arguments[n];if(r!=null)for(var a=Object.keys(Object(r)).filter(function(c){return t.indexOf(c)<0}),o=0,i=a.length;o<i;o+=1){var l=a[o],s=Object.getOwnPropertyDescriptor(r,l);s!==void 0&&s.enumerable&&(ts(e[l])&&ts(r[l])?r[l].__swiper__?e[l]=r[l]:Tt(e[l],r[l]):!ts(e[l])&&ts(r[l])?(e[l]={},r[l].__swiper__?e[l]=r[l]:Tt(e[l],r[l])):e[l]=r[l])}}return e}function hu(e,t){Object.keys(t).forEach(function(n){ts(t[n])&&Object.keys(t[n]).forEach(function(r){typeof t[n][r]=="function"&&(t[n][r]=t[n][r].bind(e))}),e[n]=t[n]})}function jo(e){return e===void 0&&(e=""),"."+e.trim().replace(/([\.:\/])/g,"\\$1").replace(/ /g,".")}var hd;function i6(){var e=Yt(),t=xn();return{touch:!!("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch),pointerEvents:!!e.PointerEvent&&"maxTouchPoints"in e.navigator&&e.navigator.maxTouchPoints>=0,observer:function(){return"MutationObserver"in e||"WebkitMutationObserver"in e}(),passiveListener:function(){var r=!1;try{var a=Object.defineProperty({},"passive",{get:function(){r=!0}});e.addEventListener("testPassiveListener",null,a)}catch{}return r}(),gestures:function(){return"ongesturestart"in e}()}}function iE(){return hd||(hd=i6()),hd}var md;function s6(e){var t=e===void 0?{}:e,n=t.userAgent,r=iE(),a=Yt(),o=a.navigator.platform,i=n||a.navigator.userAgent,l={ios:!1,android:!1},s=a.screen.width,c=a.screen.height,u=i.match(/(Android);?[\s\/]+([\d.]+)?/),f=i.match(/(iPad).*OS\s([\d_]+)/),d=i.match(/(iPod)(.*OS\s([\d_]+))?/),m=!f&&i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),y=o==="Win32",g=o==="MacIntel",A=["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"];return!f&&g&&r.touch&&A.indexOf(s+"x"+c)>=0&&(f=i.match(/(Version)\/([\d.]+)/),f||(f=[0,1,"13_0_0"]),g=!1),u&&!y&&(l.os="android",l.android=!0),(f||m||d)&&(l.os="ios",l.ios=!0),l}function l6(e){return e===void 0&&(e={}),md||(md=s6(e)),md}var gd;function c6(){var e=Yt();function t(){var n=e.navigator.userAgent.toLowerCase();return n.indexOf("safari")>=0&&n.indexOf("chrome")<0&&n.indexOf("android")<0}return{isEdge:!!e.navigator.userAgent.match(/Edge/g),isSafari:t(),isWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)}}function u6(){return gd||(gd=c6()),gd}var d6=function(){var t=Yt();return typeof t.ResizeObserver<"u"};const f6={name:"resize",create:function(){var t=this;Tt(t,{resize:{observer:null,createObserver:function(){!t||t.destroyed||!t.initialized||(t.resize.observer=new ResizeObserver(function(r){var a=t.width,o=t.height,i=a,l=o;r.forEach(function(s){var c=s.contentBoxSize,u=s.contentRect,f=s.target;f&&f!==t.el||(i=u?u.width:(c[0]||c).inlineSize,l=u?u.height:(c[0]||c).blockSize)}),(i!==a||l!==o)&&t.resize.resizeHandler()}),t.resize.observer.observe(t.el))},removeObserver:function(){t.resize.observer&&t.resize.observer.unobserve&&t.el&&(t.resize.observer.unobserve(t.el),t.resize.observer=null)},resizeHandler:function(){!t||t.destroyed||!t.initialized||(t.emit("beforeResize"),t.emit("resize"))},orientationChangeHandler:function(){!t||t.destroyed||!t.initialized||t.emit("orientationchange")}}})},on:{init:function(t){var n=Yt();if(t.params.resizeObserver&&d6()){t.resize.createObserver();return}n.addEventListener("resize",t.resize.resizeHandler),n.addEventListener("orientationchange",t.resize.orientationChangeHandler)},destroy:function(t){var n=Yt();t.resize.removeObserver(),n.removeEventListener("resize",t.resize.resizeHandler),n.removeEventListener("orientationchange",t.resize.orientationChangeHandler)}}};function Bf(){return Bf=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Bf.apply(this,arguments)}var p6={attach:function(t,n){n===void 0&&(n={});var r=Yt(),a=this,o=r.MutationObserver||r.WebkitMutationObserver,i=new o(function(l){if(l.length===1){a.emit("observerUpdate",l[0]);return}var s=function(){a.emit("observerUpdate",l[0])};r.requestAnimationFrame?r.requestAnimationFrame(s):r.setTimeout(s,0)});i.observe(t,{attributes:typeof n.attributes>"u"?!0:n.attributes,childList:typeof n.childList>"u"?!0:n.childList,characterData:typeof n.characterData>"u"?!0:n.characterData}),a.observer.observers.push(i)},init:function(){var t=this;if(!(!t.support.observer||!t.params.observer)){if(t.params.observeParents)for(var n=t.$el.parents(),r=0;r<n.length;r+=1)t.observer.attach(n[r]);t.observer.attach(t.$el[0],{childList:t.params.observeSlideChildren}),t.observer.attach(t.$wrapperEl[0],{attributes:!1})}},destroy:function(){var t=this;t.observer.observers.forEach(function(n){n.disconnect()}),t.observer.observers=[]}};const h6={name:"observer",params:{observer:!1,observeParents:!1,observeSlideChildren:!1},create:function(){var t=this;hu(t,{observer:Bf({},p6,{observers:[]})})},on:{init:function(t){t.observer.init()},destroy:function(t){t.observer.destroy()}}},m6={useParams:function(t){var n=this;!n.modules||Object.keys(n.modules).forEach(function(r){var a=n.modules[r];a.params&&Tt(t,a.params)})},useModules:function(t){t===void 0&&(t={});var n=this;!n.modules||Object.keys(n.modules).forEach(function(r){var a=n.modules[r],o=t[r]||{};a.on&&n.on&&Object.keys(a.on).forEach(function(i){n.on(i,a.on[i])}),a.create&&a.create.bind(n)(o)})}},g6={on:function(t,n,r){var a=this;if(typeof n!="function")return a;var o=r?"unshift":"push";return t.split(" ").forEach(function(i){a.eventsListeners[i]||(a.eventsListeners[i]=[]),a.eventsListeners[i][o](n)}),a},once:function(t,n,r){var a=this;if(typeof n!="function")return a;function o(){a.off(t,o),o.__emitterProxy&&delete o.__emitterProxy;for(var i=arguments.length,l=new Array(i),s=0;s<i;s++)l[s]=arguments[s];n.apply(a,l)}return o.__emitterProxy=n,a.on(t,o,r)},onAny:function(t,n){var r=this;if(typeof t!="function")return r;var a=n?"unshift":"push";return r.eventsAnyListeners.indexOf(t)<0&&r.eventsAnyListeners[a](t),r},offAny:function(t){var n=this;if(!n.eventsAnyListeners)return n;var r=n.eventsAnyListeners.indexOf(t);return r>=0&&n.eventsAnyListeners.splice(r,1),n},off:function(t,n){var r=this;return r.eventsListeners&&t.split(" ").forEach(function(a){typeof n>"u"?r.eventsListeners[a]=[]:r.eventsListeners[a]&&r.eventsListeners[a].forEach(function(o,i){(o===n||o.__emitterProxy&&o.__emitterProxy===n)&&r.eventsListeners[a].splice(i,1)})}),r},emit:function(){var t=this;if(!t.eventsListeners)return t;for(var n,r,a,o=arguments.length,i=new Array(o),l=0;l<o;l++)i[l]=arguments[l];typeof i[0]=="string"||Array.isArray(i[0])?(n=i[0],r=i.slice(1,i.length),a=t):(n=i[0].events,r=i[0].data,a=i[0].context||t),r.unshift(a);var s=Array.isArray(n)?n:n.split(" ");return s.forEach(function(c){t.eventsAnyListeners&&t.eventsAnyListeners.length&&t.eventsAnyListeners.forEach(function(u){u.apply(a,[c].concat(r))}),t.eventsListeners&&t.eventsListeners[c]&&t.eventsListeners[c].forEach(function(u){u.apply(a,r)})}),t}};function v6(){var e=this,t,n,r=e.$el;typeof e.params.width<"u"&&e.params.width!==null?t=e.params.width:t=r[0].clientWidth,typeof e.params.height<"u"&&e.params.height!==null?n=e.params.height:n=r[0].clientHeight,!(t===0&&e.isHorizontal()||n===0&&e.isVertical())&&(t=t-parseInt(r.css("padding-left")||0,10)-parseInt(r.css("padding-right")||0,10),n=n-parseInt(r.css("padding-top")||0,10)-parseInt(r.css("padding-bottom")||0,10),Number.isNaN(t)&&(t=0),Number.isNaN(n)&&(n=0),Tt(e,{width:t,height:n,size:e.isHorizontal()?t:n}))}function y6(){var e=this,t=function(Ze){return e.isHorizontal()?Ze:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[Ze]},n=function(Ze,nt){return parseFloat(Ze.getPropertyValue(t(nt))||0)},r=e.params,a=e.$wrapperEl,o=e.size,i=e.rtlTranslate,l=e.wrongRTL,s=e.virtual&&r.virtual.enabled,c=s?e.virtual.slides.length:e.slides.length,u=a.children("."+e.params.slideClass),f=s?e.virtual.slides.length:u.length,d=[],m=[],y=[];function g(Le,Ze){return r.cssMode?Ze!==u.length-1:!0}var A=r.slidesOffsetBefore;typeof A=="function"&&(A=r.slidesOffsetBefore.call(e));var h=r.slidesOffsetAfter;typeof h=="function"&&(h=r.slidesOffsetAfter.call(e));var p=e.snapGrid.length,b=e.slidesGrid.length,v=r.spaceBetween,x=-A,_=0,S=0;if(!(typeof o>"u")){typeof v=="string"&&v.indexOf("%")>=0&&(v=parseFloat(v.replace("%",""))/100*o),e.virtualSize=-v,i?u.css({marginLeft:"",marginTop:""}):u.css({marginRight:"",marginBottom:""});var k;r.slidesPerColumn>1&&(Math.floor(f/r.slidesPerColumn)===f/e.params.slidesPerColumn?k=f:k=Math.ceil(f/r.slidesPerColumn)*r.slidesPerColumn,r.slidesPerView!=="auto"&&r.slidesPerColumnFill==="row"&&(k=Math.max(k,r.slidesPerView*r.slidesPerColumn)));for(var $,R=r.slidesPerColumn,D=k/R,j=Math.floor(f/r.slidesPerColumn),M=0;M<f;M+=1){$=0;var N=u.eq(M);if(r.slidesPerColumn>1){var F=void 0,z=void 0,X=void 0;if(r.slidesPerColumnFill==="row"&&r.slidesPerGroup>1){var Y=Math.floor(M/(r.slidesPerGroup*r.slidesPerColumn)),le=M-r.slidesPerColumn*r.slidesPerGroup*Y,Q=Y===0?r.slidesPerGroup:Math.min(Math.ceil((f-Y*R*r.slidesPerGroup)/R),r.slidesPerGroup);X=Math.floor(le/Q),z=le-X*Q+Y*r.slidesPerGroup,F=z+X*k/R,N.css({"-webkit-box-ordinal-group":F,"-moz-box-ordinal-group":F,"-ms-flex-order":F,"-webkit-order":F,order:F})}else r.slidesPerColumnFill==="column"?(z=Math.floor(M/R),X=M-z*R,(z>j||z===j&&X===R-1)&&(X+=1,X>=R&&(X=0,z+=1))):(X=Math.floor(M/D),z=M-X*D);N.css(t("margin-top"),X!==0&&r.spaceBetween&&r.spaceBetween+"px")}if(N.css("display")!=="none"){if(r.slidesPerView==="auto"){var ie=getComputedStyle(N[0]),ne=N[0].style.transform,fe=N[0].style.webkitTransform;if(ne&&(N[0].style.transform="none"),fe&&(N[0].style.webkitTransform="none"),r.roundLengths)$=e.isHorizontal()?N.outerWidth(!0):N.outerHeight(!0);else{var ee=n(ie,"width"),K=n(ie,"padding-left"),W=n(ie,"padding-right"),te=n(ie,"margin-left"),pe=n(ie,"margin-right"),_e=ie.getPropertyValue("box-sizing");if(_e&&_e==="border-box")$=ee+te+pe;else{var Be=N[0],Ne=Be.clientWidth,U=Be.offsetWidth;$=ee+K+W+te+pe+(U-Ne)}}ne&&(N[0].style.transform=ne),fe&&(N[0].style.webkitTransform=fe),r.roundLengths&&($=Math.floor($))}else $=(o-(r.slidesPerView-1)*v)/r.slidesPerView,r.roundLengths&&($=Math.floor($)),u[M]&&(u[M].style[t("width")]=$+"px");u[M]&&(u[M].swiperSlideSize=$),y.push($),r.centeredSlides?(x=x+$/2+_/2+v,_===0&&M!==0&&(x=x-o/2-v),M===0&&(x=x-o/2-v),Math.abs(x)<1/1e3&&(x=0),r.roundLengths&&(x=Math.floor(x)),S%r.slidesPerGroup===0&&d.push(x),m.push(x)):(r.roundLengths&&(x=Math.floor(x)),(S-Math.min(e.params.slidesPerGroupSkip,S))%e.params.slidesPerGroup===0&&d.push(x),m.push(x),x=x+$+v),e.virtualSize+=$+v,_=$,S+=1}}e.virtualSize=Math.max(e.virtualSize,o)+h;var T;if(i&&l&&(r.effect==="slide"||r.effect==="coverflow")&&a.css({width:e.virtualSize+r.spaceBetween+"px"}),r.setWrapperSize){var B;a.css((B={},B[t("width")]=e.virtualSize+r.spaceBetween+"px",B))}if(r.slidesPerColumn>1){var H;if(e.virtualSize=($+r.spaceBetween)*k,e.virtualSize=Math.ceil(e.virtualSize/r.slidesPerColumn)-r.spaceBetween,a.css((H={},H[t("width")]=e.virtualSize+r.spaceBetween+"px",H)),r.centeredSlides){T=[];for(var J=0;J<d.length;J+=1){var de=d[J];r.roundLengths&&(de=Math.floor(de)),d[J]<e.virtualSize+d[0]&&T.push(de)}d=T}}if(!r.centeredSlides){T=[];for(var me=0;me<d.length;me+=1){var Ae=d[me];r.roundLengths&&(Ae=Math.floor(Ae)),d[me]<=e.virtualSize-o&&T.push(Ae)}d=T,Math.floor(e.virtualSize-o)-Math.floor(d[d.length-1])>1&&d.push(e.virtualSize-o)}if(d.length===0&&(d=[0]),r.spaceBetween!==0){var xe,be=e.isHorizontal()&&i?"marginLeft":t("marginRight");u.filter(g).css((xe={},xe[be]=v+"px",xe))}if(r.centeredSlides&&r.centeredSlidesBounds){var Te=0;y.forEach(function(Le){Te+=Le+(r.spaceBetween?r.spaceBetween:0)}),Te-=r.spaceBetween;var Z=Te-o;d=d.map(function(Le){return Le<0?-A:Le>Z?Z+h:Le})}if(r.centerInsufficientSlides){var se=0;if(y.forEach(function(Le){se+=Le+(r.spaceBetween?r.spaceBetween:0)}),se-=r.spaceBetween,se<o){var De=(o-se)/2;d.forEach(function(Le,Ze){d[Ze]=Le-De}),m.forEach(function(Le,Ze){m[Ze]=Le+De})}}Tt(e,{slides:u,snapGrid:d,slidesGrid:m,slidesSizesGrid:y}),f!==c&&e.emit("slidesLengthChange"),d.length!==p&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),m.length!==b&&e.emit("slidesGridLengthChange"),(r.watchSlidesProgress||r.watchSlidesVisibility)&&e.updateSlidesOffset()}}function A6(e){var t=this,n=[],r=0,a;if(typeof e=="number"?t.setTransition(e):e===!0&&t.setTransition(t.params.speed),t.params.slidesPerView!=="auto"&&t.params.slidesPerView>1)if(t.params.centeredSlides)t.visibleSlides.each(function(l){n.push(l)});else for(a=0;a<Math.ceil(t.params.slidesPerView);a+=1){var o=t.activeIndex+a;if(o>t.slides.length)break;n.push(t.slides.eq(o)[0])}else n.push(t.slides.eq(t.activeIndex)[0]);for(a=0;a<n.length;a+=1)if(typeof n[a]<"u"){var i=n[a].offsetHeight;r=i>r?i:r}r&&t.$wrapperEl.css("height",r+"px")}function b6(){for(var e=this,t=e.slides,n=0;n<t.length;n+=1)t[n].swiperSlideOffset=e.isHorizontal()?t[n].offsetLeft:t[n].offsetTop}function E6(e){e===void 0&&(e=this&&this.translate||0);var t=this,n=t.params,r=t.slides,a=t.rtlTranslate;if(r.length!==0){typeof r[0].swiperSlideOffset>"u"&&t.updateSlidesOffset();var o=-e;a&&(o=e),r.removeClass(n.slideVisibleClass),t.visibleSlidesIndexes=[],t.visibleSlides=[];for(var i=0;i<r.length;i+=1){var l=r[i],s=(o+(n.centeredSlides?t.minTranslate():0)-l.swiperSlideOffset)/(l.swiperSlideSize+n.spaceBetween);if(n.watchSlidesVisibility||n.centeredSlides&&n.autoHeight){var c=-(o-l.swiperSlideOffset),u=c+t.slidesSizesGrid[i],f=c>=0&&c<t.size-1||u>1&&u<=t.size||c<=0&&u>=t.size;f&&(t.visibleSlides.push(l),t.visibleSlidesIndexes.push(i),r.eq(i).addClass(n.slideVisibleClass))}l.progress=a?-s:s}t.visibleSlides=Re(t.visibleSlides)}}function x6(e){var t=this;if(typeof e>"u"){var n=t.rtlTranslate?-1:1;e=t&&t.translate&&t.translate*n||0}var r=t.params,a=t.maxTranslate()-t.minTranslate(),o=t.progress,i=t.isBeginning,l=t.isEnd,s=i,c=l;a===0?(o=0,i=!0,l=!0):(o=(e-t.minTranslate())/a,i=o<=0,l=o>=1),Tt(t,{progress:o,isBeginning:i,isEnd:l}),(r.watchSlidesProgress||r.watchSlidesVisibility||r.centeredSlides&&r.autoHeight)&&t.updateSlidesProgress(e),i&&!s&&t.emit("reachBeginning toEdge"),l&&!c&&t.emit("reachEnd toEdge"),(s&&!i||c&&!l)&&t.emit("fromEdge"),t.emit("progress",o)}function C6(){var e=this,t=e.slides,n=e.params,r=e.$wrapperEl,a=e.activeIndex,o=e.realIndex,i=e.virtual&&n.virtual.enabled;t.removeClass(n.slideActiveClass+" "+n.slideNextClass+" "+n.slidePrevClass+" "+n.slideDuplicateActiveClass+" "+n.slideDuplicateNextClass+" "+n.slideDuplicatePrevClass);var l;i?l=e.$wrapperEl.find("."+n.slideClass+'[data-swiper-slide-index="'+a+'"]'):l=t.eq(a),l.addClass(n.slideActiveClass),n.loop&&(l.hasClass(n.slideDuplicateClass)?r.children("."+n.slideClass+":not(."+n.slideDuplicateClass+')[data-swiper-slide-index="'+o+'"]').addClass(n.slideDuplicateActiveClass):r.children("."+n.slideClass+"."+n.slideDuplicateClass+'[data-swiper-slide-index="'+o+'"]').addClass(n.slideDuplicateActiveClass));var s=l.nextAll("."+n.slideClass).eq(0).addClass(n.slideNextClass);n.loop&&s.length===0&&(s=t.eq(0),s.addClass(n.slideNextClass));var c=l.prevAll("."+n.slideClass).eq(0).addClass(n.slidePrevClass);n.loop&&c.length===0&&(c=t.eq(-1),c.addClass(n.slidePrevClass)),n.loop&&(s.hasClass(n.slideDuplicateClass)?r.children("."+n.slideClass+":not(."+n.slideDuplicateClass+')[data-swiper-slide-index="'+s.attr("data-swiper-slide-index")+'"]').addClass(n.slideDuplicateNextClass):r.children("."+n.slideClass+"."+n.slideDuplicateClass+'[data-swiper-slide-index="'+s.attr("data-swiper-slide-index")+'"]').addClass(n.slideDuplicateNextClass),c.hasClass(n.slideDuplicateClass)?r.children("."+n.slideClass+":not(."+n.slideDuplicateClass+')[data-swiper-slide-index="'+c.attr("data-swiper-slide-index")+'"]').addClass(n.slideDuplicatePrevClass):r.children("."+n.slideClass+"."+n.slideDuplicateClass+'[data-swiper-slide-index="'+c.attr("data-swiper-slide-index")+'"]').addClass(n.slideDuplicatePrevClass)),e.emitSlidesClasses()}function w6(e){var t=this,n=t.rtlTranslate?t.translate:-t.translate,r=t.slidesGrid,a=t.snapGrid,o=t.params,i=t.activeIndex,l=t.realIndex,s=t.snapIndex,c=e,u;if(typeof c>"u"){for(var f=0;f<r.length;f+=1)typeof r[f+1]<"u"?n>=r[f]&&n<r[f+1]-(r[f+1]-r[f])/2?c=f:n>=r[f]&&n<r[f+1]&&(c=f+1):n>=r[f]&&(c=f);o.normalizeSlideIndex&&(c<0||typeof c>"u")&&(c=0)}if(a.indexOf(n)>=0)u=a.indexOf(n);else{var d=Math.min(o.slidesPerGroupSkip,c);u=d+Math.floor((c-d)/o.slidesPerGroup)}if(u>=a.length&&(u=a.length-1),c===i){u!==s&&(t.snapIndex=u,t.emit("snapIndexChange"));return}var m=parseInt(t.slides.eq(c).attr("data-swiper-slide-index")||c,10);Tt(t,{snapIndex:u,realIndex:m,previousIndex:i,activeIndex:c}),t.emit("activeIndexChange"),t.emit("snapIndexChange"),l!==m&&t.emit("realIndexChange"),(t.initialized||t.params.runCallbacksOnInit)&&t.emit("slideChange")}function _6(e){var t=this,n=t.params,r=Re(e.target).closest("."+n.slideClass)[0],a=!1,o;if(r){for(var i=0;i<t.slides.length;i+=1)if(t.slides[i]===r){a=!0,o=i;break}}if(r&&a)t.clickedSlide=r,t.virtual&&t.params.virtual.enabled?t.clickedIndex=parseInt(Re(r).attr("data-swiper-slide-index"),10):t.clickedIndex=o;else{t.clickedSlide=void 0,t.clickedIndex=void 0;return}n.slideToClickedSlide&&t.clickedIndex!==void 0&&t.clickedIndex!==t.activeIndex&&t.slideToClickedSlide()}const S6={updateSize:v6,updateSlides:y6,updateAutoHeight:A6,updateSlidesOffset:b6,updateSlidesProgress:E6,updateProgress:x6,updateSlidesClasses:C6,updateActiveIndex:w6,updateClickedSlide:_6};function k6(e){e===void 0&&(e=this.isHorizontal()?"x":"y");var t=this,n=t.params,r=t.rtlTranslate,a=t.translate,o=t.$wrapperEl;if(n.virtualTranslate)return r?-a:a;if(n.cssMode)return a;var i=o6(o[0],e);return r&&(i=-i),i||0}function T6(e,t){var n=this,r=n.rtlTranslate,a=n.params,o=n.$wrapperEl,i=n.wrapperEl,l=n.progress,s=0,c=0,u=0;n.isHorizontal()?s=r?-e:e:c=e,a.roundLengths&&(s=Math.floor(s),c=Math.floor(c)),a.cssMode?i[n.isHorizontal()?"scrollLeft":"scrollTop"]=n.isHorizontal()?-s:-c:a.virtualTranslate||o.transform("translate3d("+s+"px, "+c+"px, "+u+"px)"),n.previousTranslate=n.translate,n.translate=n.isHorizontal()?s:c;var f,d=n.maxTranslate()-n.minTranslate();d===0?f=0:f=(e-n.minTranslate())/d,f!==l&&n.updateProgress(e),n.emit("setTranslate",n.translate,t)}function I6(){return-this.snapGrid[0]}function O6(){return-this.snapGrid[this.snapGrid.length-1]}function B6(e,t,n,r,a){e===void 0&&(e=0),t===void 0&&(t=this.params.speed),n===void 0&&(n=!0),r===void 0&&(r=!0);var o=this,i=o.params,l=o.wrapperEl;if(o.animating&&i.preventInteractionOnTransition)return!1;var s=o.minTranslate(),c=o.maxTranslate(),u;if(r&&e>s?u=s:r&&e<c?u=c:u=e,o.updateProgress(u),i.cssMode){var f=o.isHorizontal();if(t===0)l[f?"scrollLeft":"scrollTop"]=-u;else if(l.scrollTo){var d;l.scrollTo((d={},d[f?"left":"top"]=-u,d.behavior="smooth",d))}else l[f?"scrollLeft":"scrollTop"]=-u;return!0}return t===0?(o.setTransition(0),o.setTranslate(u),n&&(o.emit("beforeTransitionStart",t,a),o.emit("transitionEnd"))):(o.setTransition(t),o.setTranslate(u),n&&(o.emit("beforeTransitionStart",t,a),o.emit("transitionStart")),o.animating||(o.animating=!0,o.onTranslateToWrapperTransitionEnd||(o.onTranslateToWrapperTransitionEnd=function(y){!o||o.destroyed||y.target===this&&(o.$wrapperEl[0].removeEventListener("transitionend",o.onTranslateToWrapperTransitionEnd),o.$wrapperEl[0].removeEventListener("webkitTransitionEnd",o.onTranslateToWrapperTransitionEnd),o.onTranslateToWrapperTransitionEnd=null,delete o.onTranslateToWrapperTransitionEnd,n&&o.emit("transitionEnd"))}),o.$wrapperEl[0].addEventListener("transitionend",o.onTranslateToWrapperTransitionEnd),o.$wrapperEl[0].addEventListener("webkitTransitionEnd",o.onTranslateToWrapperTransitionEnd))),!0}const L6={getTranslate:k6,setTranslate:T6,minTranslate:I6,maxTranslate:O6,translateTo:B6};function P6(e,t){var n=this;n.params.cssMode||n.$wrapperEl.transition(e),n.emit("setTransition",e,t)}function $6(e,t){e===void 0&&(e=!0);var n=this,r=n.activeIndex,a=n.params,o=n.previousIndex;if(!a.cssMode){a.autoHeight&&n.updateAutoHeight();var i=t;if(i||(r>o?i="next":r<o?i="prev":i="reset"),n.emit("transitionStart"),e&&r!==o){if(i==="reset"){n.emit("slideResetTransitionStart");return}n.emit("slideChangeTransitionStart"),i==="next"?n.emit("slideNextTransitionStart"):n.emit("slidePrevTransitionStart")}}}function D6(e,t){e===void 0&&(e=!0);var n=this,r=n.activeIndex,a=n.previousIndex,o=n.params;if(n.animating=!1,!o.cssMode){n.setTransition(0);var i=t;if(i||(r>a?i="next":r<a?i="prev":i="reset"),n.emit("transitionEnd"),e&&r!==a){if(i==="reset"){n.emit("slideResetTransitionEnd");return}n.emit("slideChangeTransitionEnd"),i==="next"?n.emit("slideNextTransitionEnd"):n.emit("slidePrevTransitionEnd")}}}const R6={setTransition:P6,transitionStart:$6,transitionEnd:D6};function M6(e,t,n,r){if(e===void 0&&(e=0),t===void 0&&(t=this.params.speed),n===void 0&&(n=!0),typeof e!="number"&&typeof e!="string")throw new Error("The 'index' argument cannot have type other than 'number' or 'string'. ["+typeof e+"] given.");if(typeof e=="string"){var a=parseInt(e,10),o=isFinite(a);if(!o)throw new Error("The passed-in 'index' (string) couldn't be converted to 'number'. ["+e+"] given.");e=a}var i=this,l=e;l<0&&(l=0);var s=i.params,c=i.snapGrid,u=i.slidesGrid,f=i.previousIndex,d=i.activeIndex,m=i.rtlTranslate,y=i.wrapperEl;if(i.animating&&s.preventInteractionOnTransition)return!1;var g=Math.min(i.params.slidesPerGroupSkip,l),A=g+Math.floor((l-g)/i.params.slidesPerGroup);A>=c.length&&(A=c.length-1),(d||s.initialSlide||0)===(f||0)&&n&&i.emit("beforeSlideChangeStart");var h=-c[A];if(i.updateProgress(h),s.normalizeSlideIndex)for(var p=0;p<u.length;p+=1){var b=-Math.floor(h*100),v=Math.floor(u[p]*100),x=Math.floor(u[p+1]*100);typeof u[p+1]<"u"?b>=v&&b<x-(x-v)/2?l=p:b>=v&&b<x&&(l=p+1):b>=v&&(l=p)}if(i.initialized&&l!==d&&(!i.allowSlideNext&&h<i.translate&&h<i.minTranslate()||!i.allowSlidePrev&&h>i.translate&&h>i.maxTranslate()&&(d||0)!==l))return!1;var _;if(l>d?_="next":l<d?_="prev":_="reset",m&&-h===i.translate||!m&&h===i.translate)return i.updateActiveIndex(l),s.autoHeight&&i.updateAutoHeight(),i.updateSlidesClasses(),s.effect!=="slide"&&i.setTranslate(h),_!=="reset"&&(i.transitionStart(n,_),i.transitionEnd(n,_)),!1;if(s.cssMode){var S=i.isHorizontal(),k=-h;if(m&&(k=y.scrollWidth-y.offsetWidth-k),t===0)y[S?"scrollLeft":"scrollTop"]=k;else if(y.scrollTo){var $;y.scrollTo(($={},$[S?"left":"top"]=k,$.behavior="smooth",$))}else y[S?"scrollLeft":"scrollTop"]=k;return!0}return t===0?(i.setTransition(0),i.setTranslate(h),i.updateActiveIndex(l),i.updateSlidesClasses(),i.emit("beforeTransitionStart",t,r),i.transitionStart(n,_),i.transitionEnd(n,_)):(i.setTransition(t),i.setTranslate(h),i.updateActiveIndex(l),i.updateSlidesClasses(),i.emit("beforeTransitionStart",t,r),i.transitionStart(n,_),i.animating||(i.animating=!0,i.onSlideToWrapperTransitionEnd||(i.onSlideToWrapperTransitionEnd=function(D){!i||i.destroyed||D.target===this&&(i.$wrapperEl[0].removeEventListener("transitionend",i.onSlideToWrapperTransitionEnd),i.$wrapperEl[0].removeEventListener("webkitTransitionEnd",i.onSlideToWrapperTransitionEnd),i.onSlideToWrapperTransitionEnd=null,delete i.onSlideToWrapperTransitionEnd,i.transitionEnd(n,_))}),i.$wrapperEl[0].addEventListener("transitionend",i.onSlideToWrapperTransitionEnd),i.$wrapperEl[0].addEventListener("webkitTransitionEnd",i.onSlideToWrapperTransitionEnd))),!0}function N6(e,t,n,r){e===void 0&&(e=0),t===void 0&&(t=this.params.speed),n===void 0&&(n=!0);var a=this,o=e;return a.params.loop&&(o+=a.loopedSlides),a.slideTo(o,t,n,r)}function F6(e,t,n){e===void 0&&(e=this.params.speed),t===void 0&&(t=!0);var r=this,a=r.params,o=r.animating,i=r.activeIndex<a.slidesPerGroupSkip?1:a.slidesPerGroup;if(a.loop){if(o&&a.loopPreventsSlide)return!1;r.loopFix(),r._clientLeft=r.$wrapperEl[0].clientLeft}return r.slideTo(r.activeIndex+i,e,t,n)}function z6(e,t,n){e===void 0&&(e=this.params.speed),t===void 0&&(t=!0);var r=this,a=r.params,o=r.animating,i=r.snapGrid,l=r.slidesGrid,s=r.rtlTranslate;if(a.loop){if(o&&a.loopPreventsSlide)return!1;r.loopFix(),r._clientLeft=r.$wrapperEl[0].clientLeft}var c=s?r.translate:-r.translate;function u(g){return g<0?-Math.floor(Math.abs(g)):Math.floor(g)}var f=u(c),d=i.map(function(g){return u(g)});i[d.indexOf(f)];var m=i[d.indexOf(f)-1];typeof m>"u"&&a.cssMode&&i.forEach(function(g){!m&&f>=g&&(m=g)});var y;return typeof m<"u"&&(y=l.indexOf(m),y<0&&(y=r.activeIndex-1)),r.slideTo(y,e,t,n)}function j6(e,t,n){e===void 0&&(e=this.params.speed),t===void 0&&(t=!0);var r=this;return r.slideTo(r.activeIndex,e,t,n)}function U6(e,t,n,r){e===void 0&&(e=this.params.speed),t===void 0&&(t=!0),r===void 0&&(r=.5);var a=this,o=a.activeIndex,i=Math.min(a.params.slidesPerGroupSkip,o),l=i+Math.floor((o-i)/a.params.slidesPerGroup),s=a.rtlTranslate?a.translate:-a.translate;if(s>=a.snapGrid[l]){var c=a.snapGrid[l],u=a.snapGrid[l+1];s-c>(u-c)*r&&(o+=a.params.slidesPerGroup)}else{var f=a.snapGrid[l-1],d=a.snapGrid[l];s-f<=(d-f)*r&&(o-=a.params.slidesPerGroup)}return o=Math.max(o,0),o=Math.min(o,a.slidesGrid.length-1),a.slideTo(o,e,t,n)}function V6(){var e=this,t=e.params,n=e.$wrapperEl,r=t.slidesPerView==="auto"?e.slidesPerViewDynamic():t.slidesPerView,a=e.clickedIndex,o;if(t.loop){if(e.animating)return;o=parseInt(Re(e.clickedSlide).attr("data-swiper-slide-index"),10),t.centeredSlides?a<e.loopedSlides-r/2||a>e.slides.length-e.loopedSlides+r/2?(e.loopFix(),a=n.children("."+t.slideClass+'[data-swiper-slide-index="'+o+'"]:not(.'+t.slideDuplicateClass+")").eq(0).index(),hc(function(){e.slideTo(a)})):e.slideTo(a):a>e.slides.length-r?(e.loopFix(),a=n.children("."+t.slideClass+'[data-swiper-slide-index="'+o+'"]:not(.'+t.slideDuplicateClass+")").eq(0).index(),hc(function(){e.slideTo(a)})):e.slideTo(a)}else e.slideTo(a)}const H6={slideTo:M6,slideToLoop:N6,slideNext:F6,slidePrev:z6,slideReset:j6,slideToClosest:U6,slideToClickedSlide:V6};function W6(){var e=this,t=xn(),n=e.params,r=e.$wrapperEl;r.children("."+n.slideClass+"."+n.slideDuplicateClass).remove();var a=r.children("."+n.slideClass);if(n.loopFillGroupWithBlank){var o=n.slidesPerGroup-a.length%n.slidesPerGroup;if(o!==n.slidesPerGroup){for(var i=0;i<o;i+=1){var l=Re(t.createElement("div")).addClass(n.slideClass+" "+n.slideBlankClass);r.append(l)}a=r.children("."+n.slideClass)}}n.slidesPerView==="auto"&&!n.loopedSlides&&(n.loopedSlides=a.length),e.loopedSlides=Math.ceil(parseFloat(n.loopedSlides||n.slidesPerView,10)),e.loopedSlides+=n.loopAdditionalSlides,e.loopedSlides>a.length&&(e.loopedSlides=a.length);var s=[],c=[];a.each(function(d,m){var y=Re(d);m<e.loopedSlides&&c.push(d),m<a.length&&m>=a.length-e.loopedSlides&&s.push(d),y.attr("data-swiper-slide-index",m)});for(var u=0;u<c.length;u+=1)r.append(Re(c[u].cloneNode(!0)).addClass(n.slideDuplicateClass));for(var f=s.length-1;f>=0;f-=1)r.prepend(Re(s[f].cloneNode(!0)).addClass(n.slideDuplicateClass))}function q6(){var e=this;e.emit("beforeLoopFix");var t=e.activeIndex,n=e.slides,r=e.loopedSlides,a=e.allowSlidePrev,o=e.allowSlideNext,i=e.snapGrid,l=e.rtlTranslate,s;e.allowSlidePrev=!0,e.allowSlideNext=!0;var c=-i[t],u=c-e.getTranslate();if(t<r){s=n.length-r*3+t,s+=r;var f=e.slideTo(s,0,!1,!0);f&&u!==0&&e.setTranslate((l?-e.translate:e.translate)-u)}else if(t>=n.length-r){s=-n.length+t+r,s+=r;var d=e.slideTo(s,0,!1,!0);d&&u!==0&&e.setTranslate((l?-e.translate:e.translate)-u)}e.allowSlidePrev=a,e.allowSlideNext=o,e.emit("loopFix")}function Y6(){var e=this,t=e.$wrapperEl,n=e.params,r=e.slides;t.children("."+n.slideClass+"."+n.slideDuplicateClass+",."+n.slideClass+"."+n.slideBlankClass).remove(),r.removeAttr("data-swiper-slide-index")}const G6={loopCreate:W6,loopFix:q6,loopDestroy:Y6};function K6(e){var t=this;if(!(t.support.touch||!t.params.simulateTouch||t.params.watchOverflow&&t.isLocked||t.params.cssMode)){var n=t.el;n.style.cursor="move",n.style.cursor=e?"-webkit-grabbing":"-webkit-grab",n.style.cursor=e?"-moz-grabbin":"-moz-grab",n.style.cursor=e?"grabbing":"grab"}}function Q6(){var e=this;e.support.touch||e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e.el.style.cursor="")}const X6={setGrabCursor:K6,unsetGrabCursor:Q6};function Z6(e){var t=this,n=t.$wrapperEl,r=t.params;if(r.loop&&t.loopDestroy(),typeof e=="object"&&"length"in e)for(var a=0;a<e.length;a+=1)e[a]&&n.append(e[a]);else n.append(e);r.loop&&t.loopCreate(),r.observer&&t.support.observer||t.update()}function J6(e){var t=this,n=t.params,r=t.$wrapperEl,a=t.activeIndex;n.loop&&t.loopDestroy();var o=a+1;if(typeof e=="object"&&"length"in e){for(var i=0;i<e.length;i+=1)e[i]&&r.prepend(e[i]);o=a+e.length}else r.prepend(e);n.loop&&t.loopCreate(),n.observer&&t.support.observer||t.update(),t.slideTo(o,0,!1)}function eN(e,t){var n=this,r=n.$wrapperEl,a=n.params,o=n.activeIndex,i=o;a.loop&&(i-=n.loopedSlides,n.loopDestroy(),n.slides=r.children("."+a.slideClass));var l=n.slides.length;if(e<=0){n.prependSlide(t);return}if(e>=l){n.appendSlide(t);return}for(var s=i>e?i+1:i,c=[],u=l-1;u>=e;u-=1){var f=n.slides.eq(u);f.remove(),c.unshift(f)}if(typeof t=="object"&&"length"in t){for(var d=0;d<t.length;d+=1)t[d]&&r.append(t[d]);s=i>e?i+t.length:i}else r.append(t);for(var m=0;m<c.length;m+=1)r.append(c[m]);a.loop&&n.loopCreate(),a.observer&&n.support.observer||n.update(),a.loop?n.slideTo(s+n.loopedSlides,0,!1):n.slideTo(s,0,!1)}function tN(e){var t=this,n=t.params,r=t.$wrapperEl,a=t.activeIndex,o=a;n.loop&&(o-=t.loopedSlides,t.loopDestroy(),t.slides=r.children("."+n.slideClass));var i=o,l;if(typeof e=="object"&&"length"in e){for(var s=0;s<e.length;s+=1)l=e[s],t.slides[l]&&t.slides.eq(l).remove(),l<i&&(i-=1);i=Math.max(i,0)}else l=e,t.slides[l]&&t.slides.eq(l).remove(),l<i&&(i-=1),i=Math.max(i,0);n.loop&&t.loopCreate(),n.observer&&t.support.observer||t.update(),n.loop?t.slideTo(i+t.loopedSlides,0,!1):t.slideTo(i,0,!1)}function nN(){for(var e=this,t=[],n=0;n<e.slides.length;n+=1)t.push(n);e.removeSlide(t)}const rN={appendSlide:Z6,prependSlide:J6,addSlide:eN,removeSlide:tN,removeAllSlides:nN};function aN(e){var t=this,n=xn(),r=Yt(),a=t.touchEventsData,o=t.params,i=t.touches;if(!(t.animating&&o.preventInteractionOnTransition)){var l=e;l.originalEvent&&(l=l.originalEvent);var s=Re(l.target);if(!(o.touchEventsTarget==="wrapper"&&!s.closest(t.wrapperEl).length)&&(a.isTouchEvent=l.type==="touchstart",!(!a.isTouchEvent&&"which"in l&&l.which===3)&&!(!a.isTouchEvent&&"button"in l&&l.button>0)&&!(a.isTouched&&a.isMoved))){var c=!!o.noSwipingClass&&o.noSwipingClass!=="";if(c&&l.target&&l.target.shadowRoot&&e.path&&e.path[0]&&(s=Re(e.path[0])),o.noSwiping&&s.closest(o.noSwipingSelector?o.noSwipingSelector:"."+o.noSwipingClass)[0]){t.allowClick=!0;return}if(!(o.swipeHandler&&!s.closest(o.swipeHandler)[0])){i.currentX=l.type==="touchstart"?l.targetTouches[0].pageX:l.pageX,i.currentY=l.type==="touchstart"?l.targetTouches[0].pageY:l.pageY;var u=i.currentX,f=i.currentY,d=o.edgeSwipeDetection||o.iOSEdgeSwipeDetection,m=o.edgeSwipeThreshold||o.iOSEdgeSwipeThreshold;if(d&&(u<=m||u>=r.innerWidth-m))if(d==="prevent")e.preventDefault();else return;if(Tt(a,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),i.startX=u,i.startY=f,a.touchStartTime=xa(),t.allowClick=!0,t.updateSize(),t.swipeDirection=void 0,o.threshold>0&&(a.allowThresholdMove=!1),l.type!=="touchstart"){var y=!0;s.is(a.formElements)&&(y=!1),n.activeElement&&Re(n.activeElement).is(a.formElements)&&n.activeElement!==s[0]&&n.activeElement.blur();var g=y&&t.allowTouchMove&&o.touchStartPreventDefault;(o.touchStartForcePreventDefault||g)&&!s[0].isContentEditable&&l.preventDefault()}t.emit("touchStart",l)}}}}function oN(e){var t=xn(),n=this,r=n.touchEventsData,a=n.params,o=n.touches,i=n.rtlTranslate,l=e;if(l.originalEvent&&(l=l.originalEvent),!r.isTouched){r.startMoving&&r.isScrolling&&n.emit("touchMoveOpposite",l);return}if(!(r.isTouchEvent&&l.type!=="touchmove")){var s=l.type==="touchmove"&&l.targetTouches&&(l.targetTouches[0]||l.changedTouches[0]),c=l.type==="touchmove"?s.pageX:l.pageX,u=l.type==="touchmove"?s.pageY:l.pageY;if(l.preventedByNestedSwiper){o.startX=c,o.startY=u;return}if(!n.allowTouchMove){n.allowClick=!1,r.isTouched&&(Tt(o,{startX:c,startY:u,currentX:c,currentY:u}),r.touchStartTime=xa());return}if(r.isTouchEvent&&a.touchReleaseOnEdges&&!a.loop){if(n.isVertical()){if(u<o.startY&&n.translate<=n.maxTranslate()||u>o.startY&&n.translate>=n.minTranslate()){r.isTouched=!1,r.isMoved=!1;return}}else if(c<o.startX&&n.translate<=n.maxTranslate()||c>o.startX&&n.translate>=n.minTranslate())return}if(r.isTouchEvent&&t.activeElement&&l.target===t.activeElement&&Re(l.target).is(r.formElements)){r.isMoved=!0,n.allowClick=!1;return}if(r.allowTouchCallbacks&&n.emit("touchMove",l),!(l.targetTouches&&l.targetTouches.length>1)){o.currentX=c,o.currentY=u;var f=o.currentX-o.startX,d=o.currentY-o.startY;if(!(n.params.threshold&&Math.sqrt(Math.pow(f,2)+Math.pow(d,2))<n.params.threshold)){if(typeof r.isScrolling>"u"){var m;n.isHorizontal()&&o.currentY===o.startY||n.isVertical()&&o.currentX===o.startX?r.isScrolling=!1:f*f+d*d>=25&&(m=Math.atan2(Math.abs(d),Math.abs(f))*180/Math.PI,r.isScrolling=n.isHorizontal()?m>a.touchAngle:90-m>a.touchAngle)}if(r.isScrolling&&n.emit("touchMoveOpposite",l),typeof r.startMoving>"u"&&(o.currentX!==o.startX||o.currentY!==o.startY)&&(r.startMoving=!0),r.isScrolling){r.isTouched=!1;return}if(!!r.startMoving){n.allowClick=!1,!a.cssMode&&l.cancelable&&l.preventDefault(),a.touchMoveStopPropagation&&!a.nested&&l.stopPropagation(),r.isMoved||(a.loop&&n.loopFix(),r.startTranslate=n.getTranslate(),n.setTransition(0),n.animating&&n.$wrapperEl.trigger("webkitTransitionEnd transitionend"),r.allowMomentumBounce=!1,a.grabCursor&&(n.allowSlideNext===!0||n.allowSlidePrev===!0)&&n.setGrabCursor(!0),n.emit("sliderFirstMove",l)),n.emit("sliderMove",l),r.isMoved=!0;var y=n.isHorizontal()?f:d;o.diff=y,y*=a.touchRatio,i&&(y=-y),n.swipeDirection=y>0?"prev":"next",r.currentTranslate=y+r.startTranslate;var g=!0,A=a.resistanceRatio;if(a.touchReleaseOnEdges&&(A=0),y>0&&r.currentTranslate>n.minTranslate()?(g=!1,a.resistance&&(r.currentTranslate=n.minTranslate()-1+Math.pow(-n.minTranslate()+r.startTranslate+y,A))):y<0&&r.currentTranslate<n.maxTranslate()&&(g=!1,a.resistance&&(r.currentTranslate=n.maxTranslate()+1-Math.pow(n.maxTranslate()-r.startTranslate-y,A))),g&&(l.preventedByNestedSwiper=!0),!n.allowSlideNext&&n.swipeDirection==="next"&&r.currentTranslate<r.startTranslate&&(r.currentTranslate=r.startTranslate),!n.allowSlidePrev&&n.swipeDirection==="prev"&&r.currentTranslate>r.startTranslate&&(r.currentTranslate=r.startTranslate),!n.allowSlidePrev&&!n.allowSlideNext&&(r.currentTranslate=r.startTranslate),a.threshold>0)if(Math.abs(y)>a.threshold||r.allowThresholdMove){if(!r.allowThresholdMove){r.allowThresholdMove=!0,o.startX=o.currentX,o.startY=o.currentY,r.currentTranslate=r.startTranslate,o.diff=n.isHorizontal()?o.currentX-o.startX:o.currentY-o.startY;return}}else{r.currentTranslate=r.startTranslate;return}!a.followFinger||a.cssMode||((a.freeMode||a.watchSlidesProgress||a.watchSlidesVisibility)&&(n.updateActiveIndex(),n.updateSlidesClasses()),a.freeMode&&(r.velocities.length===0&&r.velocities.push({position:o[n.isHorizontal()?"startX":"startY"],time:r.touchStartTime}),r.velocities.push({position:o[n.isHorizontal()?"currentX":"currentY"],time:xa()})),n.updateProgress(r.currentTranslate),n.setTranslate(r.currentTranslate))}}}}}function iN(e){var t=this,n=t.touchEventsData,r=t.params,a=t.touches,o=t.rtlTranslate,i=t.$wrapperEl,l=t.slidesGrid,s=t.snapGrid,c=e;if(c.originalEvent&&(c=c.originalEvent),n.allowTouchCallbacks&&t.emit("touchEnd",c),n.allowTouchCallbacks=!1,!n.isTouched){n.isMoved&&r.grabCursor&&t.setGrabCursor(!1),n.isMoved=!1,n.startMoving=!1;return}r.grabCursor&&n.isMoved&&n.isTouched&&(t.allowSlideNext===!0||t.allowSlidePrev===!0)&&t.setGrabCursor(!1);var u=xa(),f=u-n.touchStartTime;if(t.allowClick&&(t.updateClickedSlide(c),t.emit("tap click",c),f<300&&u-n.lastClickTime<300&&t.emit("doubleTap doubleClick",c)),n.lastClickTime=xa(),hc(function(){t.destroyed||(t.allowClick=!0)}),!n.isTouched||!n.isMoved||!t.swipeDirection||a.diff===0||n.currentTranslate===n.startTranslate){n.isTouched=!1,n.isMoved=!1,n.startMoving=!1;return}n.isTouched=!1,n.isMoved=!1,n.startMoving=!1;var d;if(r.followFinger?d=o?t.translate:-t.translate:d=-n.currentTranslate,!r.cssMode){if(r.freeMode){if(d<-t.minTranslate()){t.slideTo(t.activeIndex);return}if(d>-t.maxTranslate()){t.slides.length<s.length?t.slideTo(s.length-1):t.slideTo(t.slides.length-1);return}if(r.freeModeMomentum){if(n.velocities.length>1){var m=n.velocities.pop(),y=n.velocities.pop(),g=m.position-y.position,A=m.time-y.time;t.velocity=g/A,t.velocity/=2,Math.abs(t.velocity)<r.freeModeMinimumVelocity&&(t.velocity=0),(A>150||xa()-m.time>300)&&(t.velocity=0)}else t.velocity=0;t.velocity*=r.freeModeMomentumVelocityRatio,n.velocities.length=0;var h=1e3*r.freeModeMomentumRatio,p=t.velocity*h,b=t.translate+p;o&&(b=-b);var v=!1,x,_=Math.abs(t.velocity)*20*r.freeModeMomentumBounceRatio,S;if(b<t.maxTranslate())r.freeModeMomentumBounce?(b+t.maxTranslate()<-_&&(b=t.maxTranslate()-_),x=t.maxTranslate(),v=!0,n.allowMomentumBounce=!0):b=t.maxTranslate(),r.loop&&r.centeredSlides&&(S=!0);else if(b>t.minTranslate())r.freeModeMomentumBounce?(b-t.minTranslate()>_&&(b=t.minTranslate()+_),x=t.minTranslate(),v=!0,n.allowMomentumBounce=!0):b=t.minTranslate(),r.loop&&r.centeredSlides&&(S=!0);else if(r.freeModeSticky){for(var k,$=0;$<s.length;$+=1)if(s[$]>-b){k=$;break}Math.abs(s[k]-b)<Math.abs(s[k-1]-b)||t.swipeDirection==="next"?b=s[k]:b=s[k-1],b=-b}if(S&&t.once("transitionEnd",function(){t.loopFix()}),t.velocity!==0){if(o?h=Math.abs((-b-t.translate)/t.velocity):h=Math.abs((b-t.translate)/t.velocity),r.freeModeSticky){var R=Math.abs((o?-b:b)-t.translate),D=t.slidesSizesGrid[t.activeIndex];R<D?h=r.speed:R<2*D?h=r.speed*1.5:h=r.speed*2.5}}else if(r.freeModeSticky){t.slideToClosest();return}r.freeModeMomentumBounce&&v?(t.updateProgress(x),t.setTransition(h),t.setTranslate(b),t.transitionStart(!0,t.swipeDirection),t.animating=!0,i.transitionEnd(function(){!t||t.destroyed||!n.allowMomentumBounce||(t.emit("momentumBounce"),t.setTransition(r.speed),setTimeout(function(){t.setTranslate(x),i.transitionEnd(function(){!t||t.destroyed||t.transitionEnd()})},0))})):t.velocity?(t.updateProgress(b),t.setTransition(h),t.setTranslate(b),t.transitionStart(!0,t.swipeDirection),t.animating||(t.animating=!0,i.transitionEnd(function(){!t||t.destroyed||t.transitionEnd()}))):(t.emit("_freeModeNoMomentumRelease"),t.updateProgress(b)),t.updateActiveIndex(),t.updateSlidesClasses()}else if(r.freeModeSticky){t.slideToClosest();return}else r.freeMode&&t.emit("_freeModeNoMomentumRelease");(!r.freeModeMomentum||f>=r.longSwipesMs)&&(t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses());return}for(var j=0,M=t.slidesSizesGrid[0],N=0;N<l.length;N+=N<r.slidesPerGroupSkip?1:r.slidesPerGroup){var F=N<r.slidesPerGroupSkip-1?1:r.slidesPerGroup;typeof l[N+F]<"u"?d>=l[N]&&d<l[N+F]&&(j=N,M=l[N+F]-l[N]):d>=l[N]&&(j=N,M=l[l.length-1]-l[l.length-2])}var z=(d-l[j])/M,X=j<r.slidesPerGroupSkip-1?1:r.slidesPerGroup;if(f>r.longSwipesMs){if(!r.longSwipes){t.slideTo(t.activeIndex);return}t.swipeDirection==="next"&&(z>=r.longSwipesRatio?t.slideTo(j+X):t.slideTo(j)),t.swipeDirection==="prev"&&(z>1-r.longSwipesRatio?t.slideTo(j+X):t.slideTo(j))}else{if(!r.shortSwipes){t.slideTo(t.activeIndex);return}var Y=t.navigation&&(c.target===t.navigation.nextEl||c.target===t.navigation.prevEl);Y?c.target===t.navigation.nextEl?t.slideTo(j+X):t.slideTo(j):(t.swipeDirection==="next"&&t.slideTo(j+X),t.swipeDirection==="prev"&&t.slideTo(j))}}}function Lf(){var e=this,t=e.params,n=e.el;if(!(n&&n.offsetWidth===0)){t.breakpoints&&e.setBreakpoint();var r=e.allowSlideNext,a=e.allowSlidePrev,o=e.snapGrid;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses(),(t.slidesPerView==="auto"||t.slidesPerView>1)&&e.isEnd&&!e.isBeginning&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.run(),e.allowSlidePrev=a,e.allowSlideNext=r,e.params.watchOverflow&&o!==e.snapGrid&&e.checkOverflow()}}function sN(e){var t=this;t.allowClick||(t.params.preventClicks&&e.preventDefault(),t.params.preventClicksPropagation&&t.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))}function lN(){var e=this,t=e.wrapperEl,n=e.rtlTranslate;e.previousTranslate=e.translate,e.isHorizontal()?n?e.translate=t.scrollWidth-t.offsetWidth-t.scrollLeft:e.translate=-t.scrollLeft:e.translate=-t.scrollTop,e.translate===-0&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();var r,a=e.maxTranslate()-e.minTranslate();a===0?r=0:r=(e.translate-e.minTranslate())/a,r!==e.progress&&e.updateProgress(n?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}var Bv=!1;function cN(){}function uN(){var e=this,t=xn(),n=e.params,r=e.touchEvents,a=e.el,o=e.wrapperEl,i=e.device,l=e.support;e.onTouchStart=aN.bind(e),e.onTouchMove=oN.bind(e),e.onTouchEnd=iN.bind(e),n.cssMode&&(e.onScroll=lN.bind(e)),e.onClick=sN.bind(e);var s=!!n.nested;if(!l.touch&&l.pointerEvents)a.addEventListener(r.start,e.onTouchStart,!1),t.addEventListener(r.move,e.onTouchMove,s),t.addEventListener(r.end,e.onTouchEnd,!1);else{if(l.touch){var c=r.start==="touchstart"&&l.passiveListener&&n.passiveListeners?{passive:!0,capture:!1}:!1;a.addEventListener(r.start,e.onTouchStart,c),a.addEventListener(r.move,e.onTouchMove,l.passiveListener?{passive:!1,capture:s}:s),a.addEventListener(r.end,e.onTouchEnd,c),r.cancel&&a.addEventListener(r.cancel,e.onTouchEnd,c),Bv||(t.addEventListener("touchstart",cN),Bv=!0)}(n.simulateTouch&&!i.ios&&!i.android||n.simulateTouch&&!l.touch&&i.ios)&&(a.addEventListener("mousedown",e.onTouchStart,!1),t.addEventListener("mousemove",e.onTouchMove,s),t.addEventListener("mouseup",e.onTouchEnd,!1))}(n.preventClicks||n.preventClicksPropagation)&&a.addEventListener("click",e.onClick,!0),n.cssMode&&o.addEventListener("scroll",e.onScroll),n.updateOnWindowResize?e.on(i.ios||i.android?"resize orientationchange observerUpdate":"resize observerUpdate",Lf,!0):e.on("observerUpdate",Lf,!0)}function dN(){var e=this,t=xn(),n=e.params,r=e.touchEvents,a=e.el,o=e.wrapperEl,i=e.device,l=e.support,s=!!n.nested;if(!l.touch&&l.pointerEvents)a.removeEventListener(r.start,e.onTouchStart,!1),t.removeEventListener(r.move,e.onTouchMove,s),t.removeEventListener(r.end,e.onTouchEnd,!1);else{if(l.touch){var c=r.start==="onTouchStart"&&l.passiveListener&&n.passiveListeners?{passive:!0,capture:!1}:!1;a.removeEventListener(r.start,e.onTouchStart,c),a.removeEventListener(r.move,e.onTouchMove,s),a.removeEventListener(r.end,e.onTouchEnd,c),r.cancel&&a.removeEventListener(r.cancel,e.onTouchEnd,c)}(n.simulateTouch&&!i.ios&&!i.android||n.simulateTouch&&!l.touch&&i.ios)&&(a.removeEventListener("mousedown",e.onTouchStart,!1),t.removeEventListener("mousemove",e.onTouchMove,s),t.removeEventListener("mouseup",e.onTouchEnd,!1))}(n.preventClicks||n.preventClicksPropagation)&&a.removeEventListener("click",e.onClick,!0),n.cssMode&&o.removeEventListener("scroll",e.onScroll),e.off(i.ios||i.android?"resize orientationchange observerUpdate":"resize observerUpdate",Lf)}const fN={attachEvents:uN,detachEvents:dN};function pN(){var e=this,t=e.activeIndex,n=e.initialized,r=e.loopedSlides,a=r===void 0?0:r,o=e.params,i=e.$el,l=o.breakpoints;if(!(!l||l&&Object.keys(l).length===0)){var s=e.getBreakpoint(l,e.params.breakpointsBase,e.el);if(s&&e.currentBreakpoint!==s){var c=s in l?l[s]:void 0;c&&["slidesPerView","spaceBetween","slidesPerGroup","slidesPerGroupSkip","slidesPerColumn"].forEach(function(g){var A=c[g];typeof A>"u"||(g==="slidesPerView"&&(A==="AUTO"||A==="auto")?c[g]="auto":g==="slidesPerView"?c[g]=parseFloat(A):c[g]=parseInt(A,10))});var u=c||e.originalParams,f=o.slidesPerColumn>1,d=u.slidesPerColumn>1;f&&!d?(i.removeClass(o.containerModifierClass+"multirow "+o.containerModifierClass+"multirow-column"),e.emitContainerClasses()):!f&&d&&(i.addClass(o.containerModifierClass+"multirow"),u.slidesPerColumnFill==="column"&&i.addClass(o.containerModifierClass+"multirow-column"),e.emitContainerClasses());var m=u.direction&&u.direction!==o.direction,y=o.loop&&(u.slidesPerView!==o.slidesPerView||m);m&&n&&e.changeDirection(),Tt(e.params,u),Tt(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),e.currentBreakpoint=s,e.emit("_beforeBreakpoint",u),y&&n&&(e.loopDestroy(),e.loopCreate(),e.updateSlides(),e.slideTo(t-a+e.loopedSlides,0,!1)),e.emit("breakpoint",u)}}}function hN(e,t,n){if(t===void 0&&(t="window"),!(!e||t==="container"&&!n)){var r=!1,a=Yt(),o=t==="window"?a.innerWidth:n.clientWidth,i=t==="window"?a.innerHeight:n.clientHeight,l=Object.keys(e).map(function(d){if(typeof d=="string"&&d.indexOf("@")===0){var m=parseFloat(d.substr(1)),y=i*m;return{value:y,point:d}}return{value:d,point:d}});l.sort(function(d,m){return parseInt(d.value,10)-parseInt(m.value,10)});for(var s=0;s<l.length;s+=1){var c=l[s],u=c.point,f=c.value;f<=o&&(r=u)}return r||"max"}}const mN={setBreakpoint:pN,getBreakpoint:hN};function gN(e,t){var n=[];return e.forEach(function(r){typeof r=="object"?Object.keys(r).forEach(function(a){r[a]&&n.push(t+a)}):typeof r=="string"&&n.push(t+r)}),n}function vN(){var e=this,t=e.classNames,n=e.params,r=e.rtl,a=e.$el,o=e.device,i=e.support,l=gN(["initialized",n.direction,{"pointer-events":i.pointerEvents&&!i.touch},{"free-mode":n.freeMode},{autoheight:n.autoHeight},{rtl:r},{multirow:n.slidesPerColumn>1},{"multirow-column":n.slidesPerColumn>1&&n.slidesPerColumnFill==="column"},{android:o.android},{ios:o.ios},{"css-mode":n.cssMode}],n.containerModifierClass);t.push.apply(t,l),a.addClass([].concat(t).join(" ")),e.emitContainerClasses()}function yN(){var e=this,t=e.$el,n=e.classNames;t.removeClass(n.join(" ")),e.emitContainerClasses()}const AN={addClasses:vN,removeClasses:yN};function bN(e,t,n,r,a,o){var i=Yt(),l;function s(){o&&o()}var c=Re(e).parent("picture")[0];!c&&(!e.complete||!a)&&t?(l=new i.Image,l.onload=s,l.onerror=s,r&&(l.sizes=r),n&&(l.srcset=n),t&&(l.src=t)):s()}function EN(){var e=this;e.imagesToLoad=e.$el.find("img");function t(){typeof e>"u"||e===null||!e||e.destroyed||(e.imagesLoaded!==void 0&&(e.imagesLoaded+=1),e.imagesLoaded===e.imagesToLoad.length&&(e.params.updateOnImagesReady&&e.update(),e.emit("imagesReady")))}for(var n=0;n<e.imagesToLoad.length;n+=1){var r=e.imagesToLoad[n];e.loadImage(r,r.currentSrc||r.getAttribute("src"),r.srcset||r.getAttribute("srcset"),r.sizes||r.getAttribute("sizes"),!0,t)}}const xN={loadImage:bN,preloadImages:EN};function CN(){var e=this,t=e.params,n=e.isLocked,r=e.slides.length>0&&t.slidesOffsetBefore+t.spaceBetween*(e.slides.length-1)+e.slides[0].offsetWidth*e.slides.length;t.slidesOffsetBefore&&t.slidesOffsetAfter&&r?e.isLocked=r<=e.size:e.isLocked=e.snapGrid.length===1,e.allowSlideNext=!e.isLocked,e.allowSlidePrev=!e.isLocked,n!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock"),n&&n!==e.isLocked&&(e.isEnd=!1,e.navigation&&e.navigation.update())}const wN={checkOverflow:CN},Lv={init:!0,direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!1,nested:!1,width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeMomentumVelocityRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,slidesPerGroupSkip:0,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!1,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:0,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,loopFillGroupWithBlank:!1,loopPreventsSlide:!0,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,containerModifierClass:"swiper-container-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-invisible-blank",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",runCallbacksOnInit:!0,_emitClasses:!1};function Pv(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _N(e,t,n){return t&&Pv(e.prototype,t),n&&Pv(e,n),e}var vd={modular:m6,eventsEmitter:g6,update:S6,translate:L6,transition:R6,slide:H6,loop:G6,grabCursor:X6,manipulation:rN,events:fN,breakpoints:mN,checkOverflow:wN,classes:AN,images:xN},yd={},vh=function(){function e(){for(var n,r,a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];if(o.length===1&&o[0].constructor&&Object.prototype.toString.call(o[0]).slice(8,-1)==="Object"?r=o[0]:(n=o[0],r=o[1]),r||(r={}),r=Tt({},r),n&&!r.el&&(r.el=n),r.el&&Re(r.el).length>1){var l=[];return Re(r.el).each(function(u){var f=Tt({},r,{el:u});l.push(new e(f))}),l}var s=this;s.__swiper__=!0,s.support=iE(),s.device=l6({userAgent:r.userAgent}),s.browser=u6(),s.eventsListeners={},s.eventsAnyListeners=[],typeof s.modules>"u"&&(s.modules={}),Object.keys(s.modules).forEach(function(u){var f=s.modules[u];if(f.params){var d=Object.keys(f.params)[0],m=f.params[d];if(typeof m!="object"||m===null||!(d in r&&"enabled"in m))return;r[d]===!0&&(r[d]={enabled:!0}),typeof r[d]=="object"&&!("enabled"in r[d])&&(r[d].enabled=!0),r[d]||(r[d]={enabled:!1})}});var c=Tt({},Lv);return s.useParams(c),s.params=Tt({},c,yd,r),s.originalParams=Tt({},s.params),s.passedParams=Tt({},r),s.params&&s.params.on&&Object.keys(s.params.on).forEach(function(u){s.on(u,s.params.on[u])}),s.params&&s.params.onAny&&s.onAny(s.params.onAny),s.$=Re,Tt(s,{el:n,classNames:[],slides:Re(),slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:function(){return s.params.direction==="horizontal"},isVertical:function(){return s.params.direction==="vertical"},activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,allowSlideNext:s.params.allowSlideNext,allowSlidePrev:s.params.allowSlidePrev,touchEvents:function(){var f=["touchstart","touchmove","touchend","touchcancel"],d=["mousedown","mousemove","mouseup"];return s.support.pointerEvents&&(d=["pointerdown","pointermove","pointerup"]),s.touchEventsTouch={start:f[0],move:f[1],end:f[2],cancel:f[3]},s.touchEventsDesktop={start:d[0],move:d[1],end:d[2]},s.support.touch||!s.params.simulateTouch?s.touchEventsTouch:s.touchEventsDesktop}(),touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,formElements:"input, select, option, textarea, button, video, label",lastClickTime:xa(),clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,isTouchEvent:void 0,startMoving:void 0},allowClick:!0,allowTouchMove:s.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),s.useModules(),s.emit("_swiper"),s.params.init&&s.init(),s}var t=e.prototype;return t.setProgress=function(r,a){var o=this;r=Math.min(Math.max(r,0),1);var i=o.minTranslate(),l=o.maxTranslate(),s=(l-i)*r+i;o.translateTo(s,typeof a>"u"?0:a),o.updateActiveIndex(),o.updateSlidesClasses()},t.emitContainerClasses=function(){var r=this;if(!(!r.params._emitClasses||!r.el)){var a=r.el.className.split(" ").filter(function(o){return o.indexOf("swiper-container")===0||o.indexOf(r.params.containerModifierClass)===0});r.emit("_containerClasses",a.join(" "))}},t.getSlideClasses=function(r){var a=this;return r.className.split(" ").filter(function(o){return o.indexOf("swiper-slide")===0||o.indexOf(a.params.slideClass)===0}).join(" ")},t.emitSlidesClasses=function(){var r=this;if(!(!r.params._emitClasses||!r.el)){var a=[];r.slides.each(function(o){var i=r.getSlideClasses(o);a.push({slideEl:o,classNames:i}),r.emit("_slideClass",o,i)}),r.emit("_slideClasses",a)}},t.slidesPerViewDynamic=function(){var r=this,a=r.params,o=r.slides,i=r.slidesGrid,l=r.size,s=r.activeIndex,c=1;if(a.centeredSlides){for(var u=o[s].swiperSlideSize,f,d=s+1;d<o.length;d+=1)o[d]&&!f&&(u+=o[d].swiperSlideSize,c+=1,u>l&&(f=!0));for(var m=s-1;m>=0;m-=1)o[m]&&!f&&(u+=o[m].swiperSlideSize,c+=1,u>l&&(f=!0))}else for(var y=s+1;y<o.length;y+=1)i[y]-i[s]<l&&(c+=1);return c},t.update=function(){var r=this;if(!r||r.destroyed)return;var a=r.snapGrid,o=r.params;o.breakpoints&&r.setBreakpoint(),r.updateSize(),r.updateSlides(),r.updateProgress(),r.updateSlidesClasses();function i(){var s=r.rtlTranslate?r.translate*-1:r.translate,c=Math.min(Math.max(s,r.maxTranslate()),r.minTranslate());r.setTranslate(c),r.updateActiveIndex(),r.updateSlidesClasses()}var l;r.params.freeMode?(i(),r.params.autoHeight&&r.updateAutoHeight()):((r.params.slidesPerView==="auto"||r.params.slidesPerView>1)&&r.isEnd&&!r.params.centeredSlides?l=r.slideTo(r.slides.length-1,0,!1,!0):l=r.slideTo(r.activeIndex,0,!1,!0),l||i()),o.watchOverflow&&a!==r.snapGrid&&r.checkOverflow(),r.emit("update")},t.changeDirection=function(r,a){a===void 0&&(a=!0);var o=this,i=o.params.direction;return r||(r=i==="horizontal"?"vertical":"horizontal"),r===i||r!=="horizontal"&&r!=="vertical"||(o.$el.removeClass(""+o.params.containerModifierClass+i).addClass(""+o.params.containerModifierClass+r),o.emitContainerClasses(),o.params.direction=r,o.slides.each(function(l){r==="vertical"?l.style.width="":l.style.height=""}),o.emit("changeDirection"),a&&o.update()),o},t.mount=function(r){var a=this;if(a.mounted)return!0;var o=Re(r||a.params.el);if(r=o[0],!r)return!1;r.swiper=a;var i;return r&&r.shadowRoot&&r.shadowRoot.querySelector?(i=Re(r.shadowRoot.querySelector("."+a.params.wrapperClass)),i.children=function(l){return o.children(l)}):i=o.children("."+a.params.wrapperClass),Tt(a,{$el:o,el:r,$wrapperEl:i,wrapperEl:i[0],mounted:!0,rtl:r.dir.toLowerCase()==="rtl"||o.css("direction")==="rtl",rtlTranslate:a.params.direction==="horizontal"&&(r.dir.toLowerCase()==="rtl"||o.css("direction")==="rtl"),wrongRTL:i.css("display")==="-webkit-box"}),!0},t.init=function(r){var a=this;if(a.initialized)return a;var o=a.mount(r);return o===!1||(a.emit("beforeInit"),a.params.breakpoints&&a.setBreakpoint(),a.addClasses(),a.params.loop&&a.loopCreate(),a.updateSize(),a.updateSlides(),a.params.watchOverflow&&a.checkOverflow(),a.params.grabCursor&&a.setGrabCursor(),a.params.preloadImages&&a.preloadImages(),a.params.loop?a.slideTo(a.params.initialSlide+a.loopedSlides,0,a.params.runCallbacksOnInit):a.slideTo(a.params.initialSlide,0,a.params.runCallbacksOnInit),a.attachEvents(),a.initialized=!0,a.emit("init"),a.emit("afterInit")),a},t.destroy=function(r,a){r===void 0&&(r=!0),a===void 0&&(a=!0);var o=this,i=o.params,l=o.$el,s=o.$wrapperEl,c=o.slides;return typeof o.params>"u"||o.destroyed||(o.emit("beforeDestroy"),o.initialized=!1,o.detachEvents(),i.loop&&o.loopDestroy(),a&&(o.removeClasses(),l.removeAttr("style"),s.removeAttr("style"),c&&c.length&&c.removeClass([i.slideVisibleClass,i.slideActiveClass,i.slideNextClass,i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),o.emit("destroy"),Object.keys(o.eventsListeners).forEach(function(u){o.off(u)}),r!==!1&&(o.$el[0].swiper=null,r6(o)),o.destroyed=!0),null},e.extendDefaults=function(r){Tt(yd,r)},e.installModule=function(r){e.prototype.modules||(e.prototype.modules={});var a=r.name||Object.keys(e.prototype.modules).length+"_"+xa();e.prototype.modules[a]=r},e.use=function(r){return Array.isArray(r)?(r.forEach(function(a){return e.installModule(a)}),e):(e.installModule(r),e)},_N(e,null,[{key:"extendedDefaults",get:function(){return yd}},{key:"defaults",get:function(){return Lv}}]),e}();Object.keys(vd).forEach(function(e){Object.keys(vd[e]).forEach(function(t){vh.prototype[t]=vd[e][t]})});vh.use([f6,h6]);const Ps=vh;function Pf(){return Pf=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Pf.apply(this,arguments)}var SN={toggleEl:function(t,n){t[n?"addClass":"removeClass"](this.params.navigation.disabledClass),t[0]&&t[0].tagName==="BUTTON"&&(t[0].disabled=n)},update:function(){var t=this,n=t.params.navigation,r=t.navigation.toggleEl;if(!t.params.loop){var a=t.navigation,o=a.$nextEl,i=a.$prevEl;i&&i.length>0&&(t.isBeginning?r(i,!0):r(i,!1),i[t.params.watchOverflow&&t.isLocked?"addClass":"removeClass"](n.lockClass)),o&&o.length>0&&(t.isEnd?r(o,!0):r(o,!1),o[t.params.watchOverflow&&t.isLocked?"addClass":"removeClass"](n.lockClass))}},onPrevClick:function(t){var n=this;t.preventDefault(),!(n.isBeginning&&!n.params.loop)&&n.slidePrev()},onNextClick:function(t){var n=this;t.preventDefault(),!(n.isEnd&&!n.params.loop)&&n.slideNext()},init:function(){var t=this,n=t.params.navigation;if(!!(n.nextEl||n.prevEl)){var r,a;n.nextEl&&(r=Re(n.nextEl),t.params.uniqueNavElements&&typeof n.nextEl=="string"&&r.length>1&&t.$el.find(n.nextEl).length===1&&(r=t.$el.find(n.nextEl))),n.prevEl&&(a=Re(n.prevEl),t.params.uniqueNavElements&&typeof n.prevEl=="string"&&a.length>1&&t.$el.find(n.prevEl).length===1&&(a=t.$el.find(n.prevEl))),r&&r.length>0&&r.on("click",t.navigation.onNextClick),a&&a.length>0&&a.on("click",t.navigation.onPrevClick),Tt(t.navigation,{$nextEl:r,nextEl:r&&r[0],$prevEl:a,prevEl:a&&a[0]})}},destroy:function(){var t=this,n=t.navigation,r=n.$nextEl,a=n.$prevEl;r&&r.length&&(r.off("click",t.navigation.onNextClick),r.removeClass(t.params.navigation.disabledClass)),a&&a.length&&(a.off("click",t.navigation.onPrevClick),a.removeClass(t.params.navigation.disabledClass))}};const yh={name:"navigation",params:{navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock"}},create:function(){var t=this;hu(t,{navigation:Pf({},SN)})},on:{init:function(t){t.navigation.init(),t.navigation.update()},toEdge:function(t){t.navigation.update()},fromEdge:function(t){t.navigation.update()},destroy:function(t){t.navigation.destroy()},click:function(t,n){var r=t.navigation,a=r.$nextEl,o=r.$prevEl,i=n.target;if(t.params.navigation.hideOnClick&&!Re(i).is(o)&&!Re(i).is(a)){if(t.pagination&&t.params.pagination&&t.params.pagination.clickable&&(t.pagination.el===i||t.pagination.el.contains(i)))return;var l;a?l=a.hasClass(t.params.navigation.hiddenClass):o&&(l=o.hasClass(t.params.navigation.hiddenClass)),l===!0?t.emit("navigationShow"):t.emit("navigationHide"),a&&a.toggleClass(t.params.navigation.hiddenClass),o&&o.toggleClass(t.params.navigation.hiddenClass)}}}};function $f(){return $f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},$f.apply(this,arguments)}var kN={update:function(){var t=this,n=t.rtl,r=t.params.pagination;if(!(!r.el||!t.pagination.el||!t.pagination.$el||t.pagination.$el.length===0)){var a=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,o=t.pagination.$el,i,l=t.params.loop?Math.ceil((a-t.loopedSlides*2)/t.params.slidesPerGroup):t.snapGrid.length;if(t.params.loop?(i=Math.ceil((t.activeIndex-t.loopedSlides)/t.params.slidesPerGroup),i>a-1-t.loopedSlides*2&&(i-=a-t.loopedSlides*2),i>l-1&&(i-=l),i<0&&t.params.paginationType!=="bullets"&&(i=l+i)):typeof t.snapIndex<"u"?i=t.snapIndex:i=t.activeIndex||0,r.type==="bullets"&&t.pagination.bullets&&t.pagination.bullets.length>0){var s=t.pagination.bullets,c,u,f;if(r.dynamicBullets&&(t.pagination.bulletSize=s.eq(0)[t.isHorizontal()?"outerWidth":"outerHeight"](!0),o.css(t.isHorizontal()?"width":"height",t.pagination.bulletSize*(r.dynamicMainBullets+4)+"px"),r.dynamicMainBullets>1&&t.previousIndex!==void 0&&(t.pagination.dynamicBulletIndex+=i-t.previousIndex,t.pagination.dynamicBulletIndex>r.dynamicMainBullets-1?t.pagination.dynamicBulletIndex=r.dynamicMainBullets-1:t.pagination.dynamicBulletIndex<0&&(t.pagination.dynamicBulletIndex=0)),c=i-t.pagination.dynamicBulletIndex,u=c+(Math.min(s.length,r.dynamicMainBullets)-1),f=(u+c)/2),s.removeClass(r.bulletActiveClass+" "+r.bulletActiveClass+"-next "+r.bulletActiveClass+"-next-next "+r.bulletActiveClass+"-prev "+r.bulletActiveClass+"-prev-prev "+r.bulletActiveClass+"-main"),o.length>1)s.each(function($){var R=Re($),D=R.index();D===i&&R.addClass(r.bulletActiveClass),r.dynamicBullets&&(D>=c&&D<=u&&R.addClass(r.bulletActiveClass+"-main"),D===c&&R.prev().addClass(r.bulletActiveClass+"-prev").prev().addClass(r.bulletActiveClass+"-prev-prev"),D===u&&R.next().addClass(r.bulletActiveClass+"-next").next().addClass(r.bulletActiveClass+"-next-next"))});else{var d=s.eq(i),m=d.index();if(d.addClass(r.bulletActiveClass),r.dynamicBullets){for(var y=s.eq(c),g=s.eq(u),A=c;A<=u;A+=1)s.eq(A).addClass(r.bulletActiveClass+"-main");if(t.params.loop)if(m>=s.length-r.dynamicMainBullets){for(var h=r.dynamicMainBullets;h>=0;h-=1)s.eq(s.length-h).addClass(r.bulletActiveClass+"-main");s.eq(s.length-r.dynamicMainBullets-1).addClass(r.bulletActiveClass+"-prev")}else y.prev().addClass(r.bulletActiveClass+"-prev").prev().addClass(r.bulletActiveClass+"-prev-prev"),g.next().addClass(r.bulletActiveClass+"-next").next().addClass(r.bulletActiveClass+"-next-next");else y.prev().addClass(r.bulletActiveClass+"-prev").prev().addClass(r.bulletActiveClass+"-prev-prev"),g.next().addClass(r.bulletActiveClass+"-next").next().addClass(r.bulletActiveClass+"-next-next")}}if(r.dynamicBullets){var p=Math.min(s.length,r.dynamicMainBullets+4),b=(t.pagination.bulletSize*p-t.pagination.bulletSize)/2-f*t.pagination.bulletSize,v=n?"right":"left";s.css(t.isHorizontal()?v:"top",b+"px")}}if(r.type==="fraction"&&(o.find(jo(r.currentClass)).text(r.formatFractionCurrent(i+1)),o.find(jo(r.totalClass)).text(r.formatFractionTotal(l))),r.type==="progressbar"){var x;r.progressbarOpposite?x=t.isHorizontal()?"vertical":"horizontal":x=t.isHorizontal()?"horizontal":"vertical";var _=(i+1)/l,S=1,k=1;x==="horizontal"?S=_:k=_,o.find(jo(r.progressbarFillClass)).transform("translate3d(0,0,0) scaleX("+S+") scaleY("+k+")").transition(t.params.speed)}r.type==="custom"&&r.renderCustom?(o.html(r.renderCustom(t,i+1,l)),t.emit("paginationRender",o[0])):t.emit("paginationUpdate",o[0]),o[t.params.watchOverflow&&t.isLocked?"addClass":"removeClass"](r.lockClass)}},render:function(){var t=this,n=t.params.pagination;if(!(!n.el||!t.pagination.el||!t.pagination.$el||t.pagination.$el.length===0)){var r=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,a=t.pagination.$el,o="";if(n.type==="bullets"){var i=t.params.loop?Math.ceil((r-t.loopedSlides*2)/t.params.slidesPerGroup):t.snapGrid.length;t.params.freeMode&&!t.params.loop&&i>r&&(i=r);for(var l=0;l<i;l+=1)n.renderBullet?o+=n.renderBullet.call(t,l,n.bulletClass):o+="<"+n.bulletElement+' class="'+n.bulletClass+'"></'+n.bulletElement+">";a.html(o),t.pagination.bullets=a.find(jo(n.bulletClass))}n.type==="fraction"&&(n.renderFraction?o=n.renderFraction.call(t,n.currentClass,n.totalClass):o='<span class="'+n.currentClass+'"></span> / '+('<span class="'+n.totalClass+'"></span>'),a.html(o)),n.type==="progressbar"&&(n.renderProgressbar?o=n.renderProgressbar.call(t,n.progressbarFillClass):o='<span class="'+n.progressbarFillClass+'"></span>',a.html(o)),n.type!=="custom"&&t.emit("paginationRender",t.pagination.$el[0])}},init:function(){var t=this,n=t.params.pagination;if(!!n.el){var r=Re(n.el);r.length!==0&&(t.params.uniqueNavElements&&typeof n.el=="string"&&r.length>1&&(r=t.$el.find(n.el)),n.type==="bullets"&&n.clickable&&r.addClass(n.clickableClass),r.addClass(n.modifierClass+n.type),n.type==="bullets"&&n.dynamicBullets&&(r.addClass(""+n.modifierClass+n.type+"-dynamic"),t.pagination.dynamicBulletIndex=0,n.dynamicMainBullets<1&&(n.dynamicMainBullets=1)),n.type==="progressbar"&&n.progressbarOpposite&&r.addClass(n.progressbarOppositeClass),n.clickable&&r.on("click",jo(n.bulletClass),function(o){o.preventDefault();var i=Re(this).index()*t.params.slidesPerGroup;t.params.loop&&(i+=t.loopedSlides),t.slideTo(i)}),Tt(t.pagination,{$el:r,el:r[0]}))}},destroy:function(){var t=this,n=t.params.pagination;if(!(!n.el||!t.pagination.el||!t.pagination.$el||t.pagination.$el.length===0)){var r=t.pagination.$el;r.removeClass(n.hiddenClass),r.removeClass(n.modifierClass+n.type),t.pagination.bullets&&t.pagination.bullets.removeClass(n.bulletActiveClass),n.clickable&&r.off("click",jo(n.bulletClass))}}};const Ah={name:"pagination",params:{pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:function(t){return t},formatFractionTotal:function(t){return t},bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",modifierClass:"swiper-pagination-",currentClass:"swiper-pagination-current",totalClass:"swiper-pagination-total",hiddenClass:"swiper-pagination-hidden",progressbarFillClass:"swiper-pagination-progressbar-fill",progressbarOppositeClass:"swiper-pagination-progressbar-opposite",clickableClass:"swiper-pagination-clickable",lockClass:"swiper-pagination-lock"}},create:function(){var t=this;hu(t,{pagination:$f({dynamicBulletIndex:0},kN)})},on:{init:function(t){t.pagination.init(),t.pagination.render(),t.pagination.update()},activeIndexChange:function(t){(t.params.loop||typeof t.snapIndex>"u")&&t.pagination.update()},snapIndexChange:function(t){t.params.loop||t.pagination.update()},slidesLengthChange:function(t){t.params.loop&&(t.pagination.render(),t.pagination.update())},snapGridLengthChange:function(t){t.params.loop||(t.pagination.render(),t.pagination.update())},destroy:function(t){t.pagination.destroy()},click:function(t,n){var r=n.target;if(t.params.pagination.el&&t.params.pagination.hideOnClick&&t.pagination.$el.length>0&&!Re(r).hasClass(t.params.pagination.bulletClass)){if(t.navigation&&(t.navigation.nextEl&&r===t.navigation.nextEl||t.navigation.prevEl&&r===t.navigation.prevEl))return;var a=t.pagination.$el.hasClass(t.params.pagination.hiddenClass);a===!0?t.emit("paginationShow"):t.emit("paginationHide"),t.pagination.$el.toggleClass(t.params.pagination.hiddenClass)}}}};function Df(){return Df=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Df.apply(this,arguments)}var TN={run:function(){var t=this,n=t.slides.eq(t.activeIndex),r=t.params.autoplay.delay;n.attr("data-swiper-autoplay")&&(r=n.attr("data-swiper-autoplay")||t.params.autoplay.delay),clearTimeout(t.autoplay.timeout),t.autoplay.timeout=hc(function(){var a;t.params.autoplay.reverseDirection?t.params.loop?(t.loopFix(),a=t.slidePrev(t.params.speed,!0,!0),t.emit("autoplay")):t.isBeginning?t.params.autoplay.stopOnLastSlide?t.autoplay.stop():(a=t.slideTo(t.slides.length-1,t.params.speed,!0,!0),t.emit("autoplay")):(a=t.slidePrev(t.params.speed,!0,!0),t.emit("autoplay")):t.params.loop?(t.loopFix(),a=t.slideNext(t.params.speed,!0,!0),t.emit("autoplay")):t.isEnd?t.params.autoplay.stopOnLastSlide?t.autoplay.stop():(a=t.slideTo(0,t.params.speed,!0,!0),t.emit("autoplay")):(a=t.slideNext(t.params.speed,!0,!0),t.emit("autoplay")),(t.params.cssMode&&t.autoplay.running||a===!1)&&t.autoplay.run()},r)},start:function(){var t=this;return typeof t.autoplay.timeout<"u"||t.autoplay.running?!1:(t.autoplay.running=!0,t.emit("autoplayStart"),t.autoplay.run(),!0)},stop:function(){var t=this;return!t.autoplay.running||typeof t.autoplay.timeout>"u"?!1:(t.autoplay.timeout&&(clearTimeout(t.autoplay.timeout),t.autoplay.timeout=void 0),t.autoplay.running=!1,t.emit("autoplayStop"),!0)},pause:function(t){var n=this;!n.autoplay.running||n.autoplay.paused||(n.autoplay.timeout&&clearTimeout(n.autoplay.timeout),n.autoplay.paused=!0,t===0||!n.params.autoplay.waitForTransition?(n.autoplay.paused=!1,n.autoplay.run()):(n.$wrapperEl[0].addEventListener("transitionend",n.autoplay.onTransitionEnd),n.$wrapperEl[0].addEventListener("webkitTransitionEnd",n.autoplay.onTransitionEnd)))},onVisibilityChange:function(){var t=this,n=xn();n.visibilityState==="hidden"&&t.autoplay.running&&t.autoplay.pause(),n.visibilityState==="visible"&&t.autoplay.paused&&(t.autoplay.run(),t.autoplay.paused=!1)},onTransitionEnd:function(t){var n=this;!n||n.destroyed||!n.$wrapperEl||t.target===n.$wrapperEl[0]&&(n.$wrapperEl[0].removeEventListener("transitionend",n.autoplay.onTransitionEnd),n.$wrapperEl[0].removeEventListener("webkitTransitionEnd",n.autoplay.onTransitionEnd),n.autoplay.paused=!1,n.autoplay.running?n.autoplay.run():n.autoplay.stop())}};const bh={name:"autoplay",params:{autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1}},create:function(){var t=this;hu(t,{autoplay:Df({},TN,{running:!1,paused:!1})})},on:{init:function(t){if(t.params.autoplay.enabled){t.autoplay.start();var n=xn();n.addEventListener("visibilitychange",t.autoplay.onVisibilityChange)}},beforeTransitionStart:function(t,n,r){t.autoplay.running&&(r||!t.params.autoplay.disableOnInteraction?t.autoplay.pause(n):t.autoplay.stop())},sliderFirstMove:function(t){t.autoplay.running&&(t.params.autoplay.disableOnInteraction?t.autoplay.stop():t.autoplay.pause())},touchEnd:function(t){t.params.cssMode&&t.autoplay.paused&&!t.params.autoplay.disableOnInteraction&&t.autoplay.run()},destroy:function(t){t.autoplay.running&&t.autoplay.stop();var n=xn();n.removeEventListener("visibilitychange",t.autoplay.onVisibilityChange)}}};const IN={class:"s_main_bottom_swiper"},ON={class:"s-main-swiper-box"},BN={class:"swiper-wrapper"},LN={class:"s-swiper-silde-item-content g-flex-align-center"},PN={class:"s-swiper-silde-item-name"},$N={class:"s-swiper-silde-item-shouyi"},DN={class:"s-swiper-silde-item-status g-flex-justify-center"},RN={__name:"MainBottomSwiper",props:{list:{type:Array,default(){return[]}}},setup(e,{expose:t}){const n=e,r=rn(),a=oe(()=>r.tm("mainBottomSwiper")),o=re(null);function i(){o.value!=null&&o.value.destroy(!0),Ke(()=>{Ps.use([Ah,yh,bh]),o.value=new Ps(".s-main-swiper-box",{loop:!0,direction:"vertical",slidesPerView:10,spaceBetween:0,allowTouchMove:!1,autoplay:{delay:1e3,reverseDirection:!0},pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},speed:800})})}return t({onShow:i}),(l,s)=>(Ve(),Ge("div",IN,[w("div",ON,[w("div",BN,[(Ve(!0),Ge(lt,null,zn(n.list,(c,u)=>(Ve(),Ge("div",{class:"swiper-slide g-flex-align-center",key:u},[w("div",LN,[w("div",PN,[w("span",null,ce(c.user_name),1)]),w("div",$N,[w("span",null,ce(c.amount)+" "+ce(c.currency),1)]),w("div",DN,[w("span",null,ce(V(a).lianghuaChengGongText),1)])])]))),128))])])]))}};const MN=""+new URL("../img/icon/mycenter-pop-recharge.png",import.meta.url).href,NN=""+new URL("../img/icon/mycenter-pop-cashout.png",import.meta.url).href,ZW=""+new URL("../img/icon/mycenter-pop-userreal.png",import.meta.url).href,JW=""+new URL("../img/icon/mycenter-pop-wallet.png",import.meta.url).href,FN=""+new URL("../img/icon/mycenter-pop-problem.png",import.meta.url).href,zN=""+new URL("../img/icon/mycenter-pop-safe.png",import.meta.url).href,jN=""+new URL("../img/icon/mycenter-pop-mingxi.png",import.meta.url).href,UN=""+new URL("../img/icon/mycenter-pop-invite.png",import.meta.url).href,VN=""+new URL("../img/icon/mycenter-myteam.png",import.meta.url).href,HN=""+new URL("../img/icon/mycenter-pop-jiaoxue.png",import.meta.url).href,WN=""+new URL("../img/icon/mycenter-pop-language.png",import.meta.url).href,qN=""+new URL("../img/icon/mycenter-pop-about-us.png",import.meta.url).href,YN=""+new URL("../img/icon/mycenter-pop-down.png",import.meta.url).href;var sE={exports:{}};/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */(function(e,t){(function(r,a){e.exports=a()})(ui,function(){return function(){var n={686:function(o,i,l){l.d(i,{default:function(){return ie}});var s=l(279),c=l.n(s),u=l(370),f=l.n(u),d=l(817),m=l.n(d);function y(ne){try{return document.execCommand(ne)}catch{return!1}}var g=function(fe){var ee=m()(fe);return y("cut"),ee},A=g;function h(ne){var fe=document.documentElement.getAttribute("dir")==="rtl",ee=document.createElement("textarea");ee.style.fontSize="12pt",ee.style.border="0",ee.style.padding="0",ee.style.margin="0",ee.style.position="absolute",ee.style[fe?"right":"left"]="-9999px";var K=window.pageYOffset||document.documentElement.scrollTop;return ee.style.top="".concat(K,"px"),ee.setAttribute("readonly",""),ee.value=ne,ee}var p=function(fe,ee){var K=h(fe);ee.container.appendChild(K);var W=m()(K);return y("copy"),K.remove(),W},b=function(fe){var ee=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{container:document.body},K="";return typeof fe=="string"?K=p(fe,ee):fe instanceof HTMLInputElement&&!["text","search","url","tel","password"].includes(fe==null?void 0:fe.type)?K=p(fe.value,ee):(K=m()(fe),y("copy")),K},v=b;function x(ne){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?x=function(ee){return typeof ee}:x=function(ee){return ee&&typeof Symbol=="function"&&ee.constructor===Symbol&&ee!==Symbol.prototype?"symbol":typeof ee},x(ne)}var _=function(){var fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},ee=fe.action,K=ee===void 0?"copy":ee,W=fe.container,te=fe.target,pe=fe.text;if(K!=="copy"&&K!=="cut")throw new Error('Invalid "action" value, use either "copy" or "cut"');if(te!==void 0)if(te&&x(te)==="object"&&te.nodeType===1){if(K==="copy"&&te.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if(K==="cut"&&(te.hasAttribute("readonly")||te.hasAttribute("disabled")))throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`)}else throw new Error('Invalid "target" value, use a valid Element');if(pe)return v(pe,{container:W});if(te)return K==="cut"?A(te):v(te,{container:W})},S=_;function k(ne){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?k=function(ee){return typeof ee}:k=function(ee){return ee&&typeof Symbol=="function"&&ee.constructor===Symbol&&ee!==Symbol.prototype?"symbol":typeof ee},k(ne)}function $(ne,fe){if(!(ne instanceof fe))throw new TypeError("Cannot call a class as a function")}function R(ne,fe){for(var ee=0;ee<fe.length;ee++){var K=fe[ee];K.enumerable=K.enumerable||!1,K.configurable=!0,"value"in K&&(K.writable=!0),Object.defineProperty(ne,K.key,K)}}function D(ne,fe,ee){return fe&&R(ne.prototype,fe),ee&&R(ne,ee),ne}function j(ne,fe){if(typeof fe!="function"&&fe!==null)throw new TypeError("Super expression must either be null or a function");ne.prototype=Object.create(fe&&fe.prototype,{constructor:{value:ne,writable:!0,configurable:!0}}),fe&&M(ne,fe)}function M(ne,fe){return M=Object.setPrototypeOf||function(K,W){return K.__proto__=W,K},M(ne,fe)}function N(ne){var fe=X();return function(){var K=Y(ne),W;if(fe){var te=Y(this).constructor;W=Reflect.construct(K,arguments,te)}else W=K.apply(this,arguments);return F(this,W)}}function F(ne,fe){return fe&&(k(fe)==="object"||typeof fe=="function")?fe:z(ne)}function z(ne){if(ne===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return ne}function X(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function Y(ne){return Y=Object.setPrototypeOf?Object.getPrototypeOf:function(ee){return ee.__proto__||Object.getPrototypeOf(ee)},Y(ne)}function le(ne,fe){var ee="data-clipboard-".concat(ne);if(!!fe.hasAttribute(ee))return fe.getAttribute(ee)}var Q=function(ne){j(ee,ne);var fe=N(ee);function ee(K,W){var te;return $(this,ee),te=fe.call(this),te.resolveOptions(W),te.listenClick(K),te}return D(ee,[{key:"resolveOptions",value:function(){var W=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.action=typeof W.action=="function"?W.action:this.defaultAction,this.target=typeof W.target=="function"?W.target:this.defaultTarget,this.text=typeof W.text=="function"?W.text:this.defaultText,this.container=k(W.container)==="object"?W.container:document.body}},{key:"listenClick",value:function(W){var te=this;this.listener=f()(W,"click",function(pe){return te.onClick(pe)})}},{key:"onClick",value:function(W){var te=W.delegateTarget||W.currentTarget,pe=this.action(te)||"copy",_e=S({action:pe,container:this.container,target:this.target(te),text:this.text(te)});this.emit(_e?"success":"error",{action:pe,text:_e,trigger:te,clearSelection:function(){te&&te.focus(),window.getSelection().removeAllRanges()}})}},{key:"defaultAction",value:function(W){return le("action",W)}},{key:"defaultTarget",value:function(W){var te=le("target",W);if(te)return document.querySelector(te)}},{key:"defaultText",value:function(W){return le("text",W)}},{key:"destroy",value:function(){this.listener.destroy()}}],[{key:"copy",value:function(W){var te=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{container:document.body};return v(W,te)}},{key:"cut",value:function(W){return A(W)}},{key:"isSupported",value:function(){var W=arguments.length>0&&arguments[0]!==void 0?arguments[0]:["copy","cut"],te=typeof W=="string"?[W]:W,pe=!!document.queryCommandSupported;return te.forEach(function(_e){pe=pe&&!!document.queryCommandSupported(_e)}),pe}}]),ee}(c()),ie=Q},828:function(o){var i=9;if(typeof Element<"u"&&!Element.prototype.matches){var l=Element.prototype;l.matches=l.matchesSelector||l.mozMatchesSelector||l.msMatchesSelector||l.oMatchesSelector||l.webkitMatchesSelector}function s(c,u){for(;c&&c.nodeType!==i;){if(typeof c.matches=="function"&&c.matches(u))return c;c=c.parentNode}}o.exports=s},438:function(o,i,l){var s=l(828);function c(d,m,y,g,A){var h=f.apply(this,arguments);return d.addEventListener(y,h,A),{destroy:function(){d.removeEventListener(y,h,A)}}}function u(d,m,y,g,A){return typeof d.addEventListener=="function"?c.apply(null,arguments):typeof y=="function"?c.bind(null,document).apply(null,arguments):(typeof d=="string"&&(d=document.querySelectorAll(d)),Array.prototype.map.call(d,function(h){return c(h,m,y,g,A)}))}function f(d,m,y,g){return function(A){A.delegateTarget=s(A.target,m),A.delegateTarget&&g.call(d,A)}}o.exports=u},879:function(o,i){i.node=function(l){return l!==void 0&&l instanceof HTMLElement&&l.nodeType===1},i.nodeList=function(l){var s=Object.prototype.toString.call(l);return l!==void 0&&(s==="[object NodeList]"||s==="[object HTMLCollection]")&&"length"in l&&(l.length===0||i.node(l[0]))},i.string=function(l){return typeof l=="string"||l instanceof String},i.fn=function(l){var s=Object.prototype.toString.call(l);return s==="[object Function]"}},370:function(o,i,l){var s=l(879),c=l(438);function u(y,g,A){if(!y&&!g&&!A)throw new Error("Missing required arguments");if(!s.string(g))throw new TypeError("Second argument must be a String");if(!s.fn(A))throw new TypeError("Third argument must be a Function");if(s.node(y))return f(y,g,A);if(s.nodeList(y))return d(y,g,A);if(s.string(y))return m(y,g,A);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function f(y,g,A){return y.addEventListener(g,A),{destroy:function(){y.removeEventListener(g,A)}}}function d(y,g,A){return Array.prototype.forEach.call(y,function(h){h.addEventListener(g,A)}),{destroy:function(){Array.prototype.forEach.call(y,function(h){h.removeEventListener(g,A)})}}}function m(y,g,A){return c(document.body,y,g,A)}o.exports=u},817:function(o){function i(l){var s;if(l.nodeName==="SELECT")l.focus(),s=l.value;else if(l.nodeName==="INPUT"||l.nodeName==="TEXTAREA"){var c=l.hasAttribute("readonly");c||l.setAttribute("readonly",""),l.select(),l.setSelectionRange(0,l.value.length),c||l.removeAttribute("readonly"),s=l.value}else{l.hasAttribute("contenteditable")&&l.focus();var u=window.getSelection(),f=document.createRange();f.selectNodeContents(l),u.removeAllRanges(),u.addRange(f),s=u.toString()}return s}o.exports=i},279:function(o){function i(){}i.prototype={on:function(l,s,c){var u=this.e||(this.e={});return(u[l]||(u[l]=[])).push({fn:s,ctx:c}),this},once:function(l,s,c){var u=this;function f(){u.off(l,f),s.apply(c,arguments)}return f._=s,this.on(l,f,c)},emit:function(l){var s=[].slice.call(arguments,1),c=((this.e||(this.e={}))[l]||[]).slice(),u=0,f=c.length;for(u;u<f;u++)c[u].fn.apply(c[u].ctx,s);return this},off:function(l,s){var c=this.e||(this.e={}),u=c[l],f=[];if(u&&s)for(var d=0,m=u.length;d<m;d++)u[d].fn!==s&&u[d].fn._!==s&&f.push(u[d]);return f.length?c[l]=f:delete c[l],this}},o.exports=i,o.exports.TinyEmitter=i}},r={};function a(o){if(r[o])return r[o].exports;var i=r[o]={exports:{}};return n[o](i,i.exports,a),i.exports}return function(){a.n=function(o){var i=o&&o.__esModule?function(){return o.default}:function(){return o};return a.d(i,{a:i}),i}}(),function(){a.d=function(o,i){for(var l in i)a.o(i,l)&&!a.o(o,l)&&Object.defineProperty(o,l,{enumerable:!0,get:i[l]})}}(),function(){a.o=function(o,i){return Object.prototype.hasOwnProperty.call(o,i)}}(),a(686)}().default})})(sE);const GN=KS(sE.exports),KN=e=>{const t=(e==null?void 0:e.appendToBody)===void 0?!0:e.appendToBody;return{toClipboard(n,r){return new Promise((a,o)=>{const i=document.createElement("button"),l=new GN(i,{text:()=>n,action:()=>"copy",container:r!==void 0?r:document.body});l.on("success",s=>{l.destroy(),a(s)}),l.on("error",s=>{l.destroy(),o(s)}),t&&document.body.appendChild(i),i.click(),t&&document.body.removeChild(i)})}}};var lE={exports:{}};(function(e,t){(function(n,r){e.exports=r()})(ui,function(){var n=1e3,r=6e4,a=36e5,o="millisecond",i="second",l="minute",s="hour",c="day",u="week",f="month",d="quarter",m="year",y="date",g="Invalid Date",A=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(N){var F=["th","st","nd","rd"],z=N%100;return"["+N+(F[(z-20)%10]||F[z]||F[0])+"]"}},b=function(N,F,z){var X=String(N);return!X||X.length>=F?N:""+Array(F+1-X.length).join(z)+N},v={s:b,z:function(N){var F=-N.utcOffset(),z=Math.abs(F),X=Math.floor(z/60),Y=z%60;return(F<=0?"+":"-")+b(X,2,"0")+":"+b(Y,2,"0")},m:function N(F,z){if(F.date()<z.date())return-N(z,F);var X=12*(z.year()-F.year())+(z.month()-F.month()),Y=F.clone().add(X,f),le=z-Y<0,Q=F.clone().add(X+(le?-1:1),f);return+(-(X+(z-Y)/(le?Y-Q:Q-Y))||0)},a:function(N){return N<0?Math.ceil(N)||0:Math.floor(N)},p:function(N){return{M:f,y:m,w:u,d:c,D:y,h:s,m:l,s:i,ms:o,Q:d}[N]||String(N||"").toLowerCase().replace(/s$/,"")},u:function(N){return N===void 0}},x="en",_={};_[x]=p;var S="$isDayjsObject",k=function(N){return N instanceof j||!(!N||!N[S])},$=function N(F,z,X){var Y;if(!F)return x;if(typeof F=="string"){var le=F.toLowerCase();_[le]&&(Y=le),z&&(_[le]=z,Y=le);var Q=F.split("-");if(!Y&&Q.length>1)return N(Q[0])}else{var ie=F.name;_[ie]=F,Y=ie}return!X&&Y&&(x=Y),Y||!X&&x},R=function(N,F){if(k(N))return N.clone();var z=typeof F=="object"?F:{};return z.date=N,z.args=arguments,new j(z)},D=v;D.l=$,D.i=k,D.w=function(N,F){return R(N,{locale:F.$L,utc:F.$u,x:F.$x,$offset:F.$offset})};var j=function(){function N(z){this.$L=$(z.locale,null,!0),this.parse(z),this.$x=this.$x||z.x||{},this[S]=!0}var F=N.prototype;return F.parse=function(z){this.$d=function(X){var Y=X.date,le=X.utc;if(Y===null)return new Date(NaN);if(D.u(Y))return new Date;if(Y instanceof Date)return new Date(Y);if(typeof Y=="string"&&!/Z$/i.test(Y)){var Q=Y.match(A);if(Q){var ie=Q[2]-1||0,ne=(Q[7]||"0").substring(0,3);return le?new Date(Date.UTC(Q[1],ie,Q[3]||1,Q[4]||0,Q[5]||0,Q[6]||0,ne)):new Date(Q[1],ie,Q[3]||1,Q[4]||0,Q[5]||0,Q[6]||0,ne)}}return new Date(Y)}(z),this.init()},F.init=function(){var z=this.$d;this.$y=z.getFullYear(),this.$M=z.getMonth(),this.$D=z.getDate(),this.$W=z.getDay(),this.$H=z.getHours(),this.$m=z.getMinutes(),this.$s=z.getSeconds(),this.$ms=z.getMilliseconds()},F.$utils=function(){return D},F.isValid=function(){return this.$d.toString()!==g},F.isSame=function(z,X){var Y=R(z);return this.startOf(X)<=Y&&Y<=this.endOf(X)},F.isAfter=function(z,X){return R(z)<this.startOf(X)},F.isBefore=function(z,X){return this.endOf(X)<R(z)},F.$g=function(z,X,Y){return D.u(z)?this[X]:this.set(Y,z)},F.unix=function(){return Math.floor(this.valueOf()/1e3)},F.valueOf=function(){return this.$d.getTime()},F.startOf=function(z,X){var Y=this,le=!!D.u(X)||X,Q=D.p(z),ie=function(_e,Be){var Ne=D.w(Y.$u?Date.UTC(Y.$y,Be,_e):new Date(Y.$y,Be,_e),Y);return le?Ne:Ne.endOf(c)},ne=function(_e,Be){return D.w(Y.toDate()[_e].apply(Y.toDate("s"),(le?[0,0,0,0]:[23,59,59,999]).slice(Be)),Y)},fe=this.$W,ee=this.$M,K=this.$D,W="set"+(this.$u?"UTC":"");switch(Q){case m:return le?ie(1,0):ie(31,11);case f:return le?ie(1,ee):ie(0,ee+1);case u:var te=this.$locale().weekStart||0,pe=(fe<te?fe+7:fe)-te;return ie(le?K-pe:K+(6-pe),ee);case c:case y:return ne(W+"Hours",0);case s:return ne(W+"Minutes",1);case l:return ne(W+"Seconds",2);case i:return ne(W+"Milliseconds",3);default:return this.clone()}},F.endOf=function(z){return this.startOf(z,!1)},F.$set=function(z,X){var Y,le=D.p(z),Q="set"+(this.$u?"UTC":""),ie=(Y={},Y[c]=Q+"Date",Y[y]=Q+"Date",Y[f]=Q+"Month",Y[m]=Q+"FullYear",Y[s]=Q+"Hours",Y[l]=Q+"Minutes",Y[i]=Q+"Seconds",Y[o]=Q+"Milliseconds",Y)[le],ne=le===c?this.$D+(X-this.$W):X;if(le===f||le===m){var fe=this.clone().set(y,1);fe.$d[ie](ne),fe.init(),this.$d=fe.set(y,Math.min(this.$D,fe.daysInMonth())).$d}else ie&&this.$d[ie](ne);return this.init(),this},F.set=function(z,X){return this.clone().$set(z,X)},F.get=function(z){return this[D.p(z)]()},F.add=function(z,X){var Y,le=this;z=Number(z);var Q=D.p(X),ie=function(ee){var K=R(le);return D.w(K.date(K.date()+Math.round(ee*z)),le)};if(Q===f)return this.set(f,this.$M+z);if(Q===m)return this.set(m,this.$y+z);if(Q===c)return ie(1);if(Q===u)return ie(7);var ne=(Y={},Y[l]=r,Y[s]=a,Y[i]=n,Y)[Q]||1,fe=this.$d.getTime()+z*ne;return D.w(fe,this)},F.subtract=function(z,X){return this.add(-1*z,X)},F.format=function(z){var X=this,Y=this.$locale();if(!this.isValid())return Y.invalidDate||g;var le=z||"YYYY-MM-DDTHH:mm:ssZ",Q=D.z(this),ie=this.$H,ne=this.$m,fe=this.$M,ee=Y.weekdays,K=Y.months,W=Y.meridiem,te=function(Be,Ne,U,T){return Be&&(Be[Ne]||Be(X,le))||U[Ne].slice(0,T)},pe=function(Be){return D.s(ie%12||12,Be,"0")},_e=W||function(Be,Ne,U){var T=Be<12?"AM":"PM";return U?T.toLowerCase():T};return le.replace(h,function(Be,Ne){return Ne||function(U){switch(U){case"YY":return String(X.$y).slice(-2);case"YYYY":return D.s(X.$y,4,"0");case"M":return fe+1;case"MM":return D.s(fe+1,2,"0");case"MMM":return te(Y.monthsShort,fe,K,3);case"MMMM":return te(K,fe);case"D":return X.$D;case"DD":return D.s(X.$D,2,"0");case"d":return String(X.$W);case"dd":return te(Y.weekdaysMin,X.$W,ee,2);case"ddd":return te(Y.weekdaysShort,X.$W,ee,3);case"dddd":return ee[X.$W];case"H":return String(ie);case"HH":return D.s(ie,2,"0");case"h":return pe(1);case"hh":return pe(2);case"a":return _e(ie,ne,!0);case"A":return _e(ie,ne,!1);case"m":return String(ne);case"mm":return D.s(ne,2,"0");case"s":return String(X.$s);case"ss":return D.s(X.$s,2,"0");case"SSS":return D.s(X.$ms,3,"0");case"Z":return Q}return null}(Be)||Q.replace(":","")})},F.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},F.diff=function(z,X,Y){var le,Q=this,ie=D.p(X),ne=R(z),fe=(ne.utcOffset()-this.utcOffset())*r,ee=this-ne,K=function(){return D.m(Q,ne)};switch(ie){case m:le=K()/12;break;case f:le=K();break;case d:le=K()/3;break;case u:le=(ee-fe)/6048e5;break;case c:le=(ee-fe)/864e5;break;case s:le=ee/a;break;case l:le=ee/r;break;case i:le=ee/n;break;default:le=ee}return Y?le:D.a(le)},F.daysInMonth=function(){return this.endOf(f).$D},F.$locale=function(){return _[this.$L]},F.locale=function(z,X){if(!z)return this.$L;var Y=this.clone(),le=$(z,X,!0);return le&&(Y.$L=le),Y},F.clone=function(){return D.w(this.$d,this)},F.toDate=function(){return new Date(this.valueOf())},F.toJSON=function(){return this.isValid()?this.toISOString():null},F.toISOString=function(){return this.$d.toISOString()},F.toString=function(){return this.$d.toUTCString()},N}(),M=j.prototype;return R.prototype=M,[["$ms",o],["$s",i],["$m",l],["$H",s],["$W",c],["$M",f],["$y",m],["$D",y]].forEach(function(N){M[N[1]]=function(F){return this.$g(F,N[0],N[1])}}),R.extend=function(N,F){return N.$i||(N(F,j,R),N.$i=!0),R},R.locale=$,R.isDayjs=k,R.unix=function(N){return R(1e3*N)},R.en=_[x],R.Ls=_,R.p={},R})})(lE);const Wo=lE.exports;var cE={exports:{}};(function(e,t){(function(n,r){e.exports=r()})(ui,function(){var n="minute",r=/[+-]\d\d(?::?\d\d)?/g,a=/([+-]|\d\d)/g;return function(o,i,l){var s=i.prototype;l.utc=function(g){var A={date:g,utc:!0,args:arguments};return new i(A)},s.utc=function(g){var A=l(this.toDate(),{locale:this.$L,utc:!0});return g?A.add(this.utcOffset(),n):A},s.local=function(){return l(this.toDate(),{locale:this.$L,utc:!1})};var c=s.parse;s.parse=function(g){g.utc&&(this.$u=!0),this.$utils().u(g.$offset)||(this.$offset=g.$offset),c.call(this,g)};var u=s.init;s.init=function(){if(this.$u){var g=this.$d;this.$y=g.getUTCFullYear(),this.$M=g.getUTCMonth(),this.$D=g.getUTCDate(),this.$W=g.getUTCDay(),this.$H=g.getUTCHours(),this.$m=g.getUTCMinutes(),this.$s=g.getUTCSeconds(),this.$ms=g.getUTCMilliseconds()}else u.call(this)};var f=s.utcOffset;s.utcOffset=function(g,A){var h=this.$utils().u;if(h(g))return this.$u?0:h(this.$offset)?f.call(this):this.$offset;if(typeof g=="string"&&(g=function(x){x===void 0&&(x="");var _=x.match(r);if(!_)return null;var S=(""+_[0]).match(a)||["-",0,0],k=S[0],$=60*+S[1]+ +S[2];return $===0?0:k==="+"?$:-$}(g),g===null))return this;var p=Math.abs(g)<=16?60*g:g,b=this;if(A)return b.$offset=p,b.$u=g===0,b;if(g!==0){var v=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(b=this.local().add(p+v,n)).$offset=p,b.$x.$localOffset=v}else b=this.utc();return b};var d=s.format;s.format=function(g){var A=g||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return d.call(this,A)},s.valueOf=function(){var g=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*g},s.isUTC=function(){return!!this.$u},s.toISOString=function(){return this.toDate().toISOString()},s.toString=function(){return this.toDate().toUTCString()};var m=s.toDate;s.toDate=function(g){return g==="s"&&this.$offset?l(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():m.call(this)};var y=s.diff;s.diff=function(g,A,h){if(g&&this.$u===g.$u)return y.call(this,g,A,h);var p=this.local(),b=l(g).local();return y.call(p,b,A,h)}}})})(cE);const QN=cE.exports;var uE={exports:{}};(function(e,t){(function(n,r){e.exports=r()})(ui,function(){var n={year:0,month:1,day:2,hour:3,minute:4,second:5},r={};return function(a,o,i){var l,s=function(d,m,y){y===void 0&&(y={});var g=new Date(d),A=function(h,p){p===void 0&&(p={});var b=p.timeZoneName||"short",v=h+"|"+b,x=r[v];return x||(x=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:h,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:b}),r[v]=x),x}(m,y);return A.formatToParts(g)},c=function(d,m){for(var y=s(d,m),g=[],A=0;A<y.length;A+=1){var h=y[A],p=h.type,b=h.value,v=n[p];v>=0&&(g[v]=parseInt(b,10))}var x=g[3],_=x===24?0:x,S=g[0]+"-"+g[1]+"-"+g[2]+" "+_+":"+g[4]+":"+g[5]+":000",k=+d;return(i.utc(S).valueOf()-(k-=k%1e3))/6e4},u=o.prototype;u.tz=function(d,m){d===void 0&&(d=l);var y,g=this.utcOffset(),A=this.toDate(),h=A.toLocaleString("en-US",{timeZone:d}),p=Math.round((A-new Date(h))/1e3/60),b=15*-Math.round(A.getTimezoneOffset()/15)-p;if(!Number(b))y=this.utcOffset(0,m);else if(y=i(h,{locale:this.$L}).$set("millisecond",this.$ms).utcOffset(b,!0),m){var v=y.utcOffset();y=y.add(g-v,"minute")}return y.$x.$timezone=d,y},u.offsetName=function(d){var m=this.$x.$timezone||i.tz.guess(),y=s(this.valueOf(),m,{timeZoneName:d}).find(function(g){return g.type.toLowerCase()==="timezonename"});return y&&y.value};var f=u.startOf;u.startOf=function(d,m){if(!this.$x||!this.$x.$timezone)return f.call(this,d,m);var y=i(this.format("YYYY-MM-DD HH:mm:ss:SSS"),{locale:this.$L});return f.call(y,d,m).tz(this.$x.$timezone,!0)},i.tz=function(d,m,y){var g=y&&m,A=y||m||l,h=c(+i(),A);if(typeof d!="string")return i(d).tz(A);var p=function(_,S,k){var $=_-60*S*1e3,R=c($,k);if(S===R)return[$,S];var D=c($-=60*(R-S)*1e3,k);return R===D?[$,R]:[_-60*Math.min(R,D)*1e3,Math.max(R,D)]}(i.utc(d,g).valueOf(),h,A),b=p[0],v=p[1],x=i(b).utcOffset(v);return x.$x.$timezone=A,x},i.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},i.tz.setDefault=function(d){l=d}}})})(uE);const XN=uE.exports;Wo.extend(QN);Wo.extend(XN);const $v=mn(),ZN=b8.global,{toClipboard:JN}=KN(),dE=async e=>{e=e.toString();try{return await JN(e),At(ZN.tm("jsLanguage").copySuccessText),!0}catch(t){return console.error(t),Promise.reject(!1)}},eq=e=>{e=e.toString();var t=e.split(".")[1],n=parseInt(e).toString().replace(/(\d)(?=(\d{3})+$)/g,"$1,");return t?n+"."+t:n};Math.formatFloat=function(e,t){t=Number(t);var n=Math.pow(10,t);return Math.round(e*n)/n};const eF=(e,t)=>{t=Number(t);var n=Math.pow(10,t);return Math.floor(e*n)/n},tq=(e,t,n=2)=>{if(e=Number(e),t=Number(t),t>0)if(t<1){var r=Math.pow(10,n),a=e/(1+t);return(Math.floor(a*r)/r).toFixed(n)}else return e<=t?0:eF(Number(e-t),n);else return e.toFixed(n)},nq=(e,t="YYYY-MM-DD HH:mm:ss",n="Asia/Shanghai")=>{let r;return e===0?"-":(e?r=e.toString().length===13?Wo(e):Wo.unix(e):e instanceof Date?r=Wo(e):r=Wo(),n&&(r=r.tz(n)),r.format(t))},rq=e=>{if(console.log("stamp:"+e),e<1)return"--:--:--";let t=Math.floor(e/3600%24),n=Math.floor(e/60%60),r=Math.floor(e/1%60);return`${t<10?"0"+t:t}:${n<10?"0"+n:n}:${r<10?"0"+r:r}`};Date.prototype.format=function(e){let t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(let n in t)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,RegExp.$1.length===1?t[n]:("00"+t[n]).substr((""+t[n]).length)));return e};const aq=e=>(e=Number(e),e>=0?"g-in":"g-out"),oq=e=>e==0?"g-red":e==1?"g-green":e==2||e==3?"g-blue":"g-grey",xi=()=>{$v.kefu.KefuMode==0?window.location.href=$v.kefu.KefuUrl:Xp.push({name:"kefu"})},fE=e=>{let t=e.substr(0,4),n=e.substr(e.length-2);return t+"****"+n};const tF={class:"c_my_center_pop"},nF={class:"s-pop-container"},rF={class:"s-pop-head-left g-flex-align-center"},aF=w("div",{class:"s-pop-head-left-img g-flex-align-center"},[w("img",{src:hh,alt:""})],-1),oF={class:"s-pop-head-left-content"},iF={class:"s-pop-head-left-username"},sF={class:"s-pop-head-left-id g-flex-align-center"},lF={class:"s-pop-head-left-id-text g-flex-align-center"},cF=w("span",null,"UUID:",-1),uF=w("i",{class:"iconfont icon-ic_line_copy24px"},null,-1),dF=[uF],fF=w("div",{class:"s-pop-head-right"},[w("i",{class:"iconfont icon-you"})],-1),pF={class:"s-pop-head-left g-flex-align-center"},hF={class:"s-pop-head-left-img g-flex-align-center"},mF=["src"],gF={class:"s-pop-head-left-content"},vF={class:"s-pop-head-left-username"},yF=w("div",{class:"s-pop-head-right"},[w("i",{class:"iconfont icon-you"})],-1),AF={class:"s-pop-head-list g-flex-align-center"},bF=w("div",{class:"s-pop-head-item-img"},[w("img",{src:MN,alt:""})],-1),EF={class:"s-pop-head-item-text"},xF=w("div",{class:"s-pop-head-item-img"},[w("img",{src:NN,alt:""})],-1),CF={class:"s-pop-head-item-text"},wF={class:"s-pop-content-list"};const _F={class:"s-pop-content-item-left g-flex-align-center"},SF=w("div",{class:"s-pop-content-left-img g-flex-align-center"},[w("img",{src:FN,alt:""})],-1),kF={class:"s-pop-content-left-text"},TF=w("div",{class:"s-pop-content-item-right g-flex-align-center"},[w("div",{class:"s-pop-content-right-icon g-flex-align-center"},[w("i",{class:"iconfont icon-you"})])],-1),IF={class:"s-pop-content-item-left g-flex-align-center"},OF=w("div",{class:"s-pop-content-left-img g-flex-align-center"},[w("img",{src:zN,alt:""})],-1),BF={class:"s-pop-content-left-text"},LF=w("div",{class:"s-pop-content-item-right g-flex-align-center"},[w("div",{class:"s-pop-content-right-icon g-flex-align-center"},[w("i",{class:"iconfont icon-you"})])],-1),PF={class:"s-pop-content-item-left g-flex-align-center"},$F=w("div",{class:"s-pop-content-left-img g-flex-align-center"},[w("img",{src:jN,alt:""})],-1),DF={class:"s-pop-content-left-text"},RF=w("div",{class:"s-pop-content-item-right g-flex-align-center"},[w("div",{class:"s-pop-content-right-icon g-flex-align-center"},[w("i",{class:"iconfont icon-you"})])],-1),MF={class:"s-pop-content-item-left g-flex-align-center"},NF=w("div",{class:"s-pop-content-left-img g-flex-align-center"},[w("img",{src:UN,alt:""})],-1),FF={class:"s-pop-content-left-text"},zF=w("div",{class:"s-pop-content-item-right g-flex-align-center"},[w("div",{class:"s-pop-content-right-icon g-flex-align-center"},[w("i",{class:"iconfont icon-you"})])],-1),jF={class:"s-pop-content-item-left g-flex-align-center"},UF=w("div",{class:"s-pop-content-left-img g-flex-align-center"},[w("img",{src:VN,alt:""})],-1),VF={class:"s-pop-content-left-text"},HF=w("div",{class:"s-pop-content-item-right g-flex-align-center"},[w("div",{class:"s-pop-content-right-icon g-flex-align-center"},[w("i",{class:"iconfont icon-you"})])],-1),WF={class:"s-pop-content-item-left g-flex-align-center"},qF=w("div",{class:"s-pop-content-left-img g-flex-align-center"},[w("img",{src:HN,alt:""})],-1),YF={class:"s-pop-content-left-text"},GF=w("div",{class:"s-pop-content-item-right g-flex-align-center"},[w("div",{class:"s-pop-content-right-icon g-flex-align-center"},[w("i",{class:"iconfont icon-you"})])],-1),KF={class:"s-pop-content-item-left g-flex-align-center"},QF=w("div",{class:"s-pop-content-left-img g-flex-align-center"},[w("img",{src:WN,alt:""})],-1),XF={class:"s-pop-content-left-text"},ZF={class:"s-pop-content-item-right g-flex-align-center"},JF={class:"s-pop-content-right-text"},e7=w("div",{class:"s-pop-content-right-icon g-flex-align-center"},[w("i",{class:"iconfont icon-you"})],-1),t7={class:"s-pop-content-item-left g-flex-align-center"},n7=w("div",{class:"s-pop-content-left-img g-flex-align-center"},[w("img",{src:qN,alt:""})],-1),r7={class:"s-pop-content-left-text"},a7=w("div",{class:"s-pop-content-item-right g-flex-align-center"},[w("div",{class:"s-pop-content-right-icon g-flex-align-center"},[w("i",{class:"iconfont icon-you"})])],-1),o7={class:"s-pop-content-item-left g-flex-align-center"},i7=w("div",{class:"s-pop-content-left-img g-flex-align-center"},[w("img",{src:YN,alt:""})],-1),s7={class:"s-pop-content-left-text"},l7=w("div",{class:"s-pop-content-item-right g-flex-align-center"},[w("div",{class:"s-pop-content-right-icon g-flex-align-center"},[w("i",{class:"iconfont icon-you"})])],-1),c7={class:"s-pop-exit-login-box g-flex-align-center g-flex-justify-center"},u7={__name:"MyCenterPop",setup(e,{expose:t}){const n=Vn();Hn();const r=mn(),a=rn(),o=oe(()=>a.tm("myCenterPop"));let i=re(!1);function l(){r.token&&c(),i.value=!0}let s=oe(()=>r.userInfo);async function c(){r.loadingShow=!0;const{success:h,data:p}=await pu();!h||(r.setUserInfo(p.info),console.log(p))}function u(){window.location.href=r.system.downUrl}function f(){if(!r.token)return n.push({name:"login"});if(!s.value.userReal.id||s.value.userReal.status==0)return n.push({name:"userreal"});if(s.value.userReal.status==1)return At(o.value.userRealSuccessTipsText);if(s.value.userReal.status==2)return At(o.value.userRealIngTipsText)}function d(){if(!s.value.userReal.id)return o.value.noRenzhengText;if(s.value.userReal.status==0)return o.value.statusFailText;if(s.value.userReal.status==1)return o.value.statusSuccessText;if(s.value.userReal.status==2)return o.value.statusIngText}function m(h){n.push({name:h})}function y(h){n.push({name:"rule",query:{id:h}})}function g(h){Pt.confirm({title:"",message:o.value.exitLoginOutTipsText,cancelButtonColor:"#000",confirmButtonColor:"#5488f7"}).then(()=>{r.logout()}).catch(()=>{})}let A=oe(()=>{if(console.log("store.lang",r.lang),!r.langList.length)return{};var h=r.langList.find(p=>p.code==r.lang);return console.log("target",h),h||r.langList[0]});return t({onShow:l}),(h,p)=>{const b=Fn("van-popup");return Ve(),Ge("div",tF,[C(b,{"safe-area-inset-bottom":"",class:"s-pop",show:V(i),"onUpdate:show":p[15]||(p[15]=v=>ct(i)?i.value=v:i=v),position:"left"},{default:Ht(()=>[w("div",nF,[V(s).id?(Ve(),Ge("div",{key:0,onClick:p[1]||(p[1]=v=>h.$router.push({name:"safecenter"})),class:"s-pop-head g-flex-align-center"},[w("div",rF,[aF,w("div",oF,[w("div",iF,ce(V(fE)("+"+V(s).area_code+V(s).mobile)),1),w("div",sF,[w("div",lF,[cF,w("span",null,ce(V(s).id),1)]),w("div",{onClick:p[0]||(p[0]=Pc(v=>V(dE)(V(s).id),["stop"])),class:"s-pop-head-left-id-copy g-flex-align-center"},dF)])])]),fF])):Zt("",!0),V(s).id?Zt("",!0):(Ve(),Ge("div",{key:1,onClick:p[2]||(p[2]=v=>h.$router.push({name:"login"})),class:"s-pop-head s-pop-head-no-login g-flex-align-center"},[w("div",pF,[w("div",hF,[w("img",{src:V(r).banner.logo[1],alt:""},null,8,mF)]),w("div",gF,[w("div",vF,ce(V(o).qudengluText),1)])]),yF])),w("div",AF,[w("div",{onClick:p[3]||(p[3]=v=>m("rechargeselect")),class:"s-pop-head-list-item g-flex-column g-flex-align-center"},[bF,w("div",EF,[w("span",null,ce(V(o).chongzhiText),1)])]),w("div",{onClick:p[4]||(p[4]=v=>m("cashoutselect")),class:"s-pop-head-list-item g-flex-column g-flex-align-center"},[xF,w("div",CF,[w("span",null,ce(V(o).tixianText),1)])])]),w("div",wF,[Zt("",!0),Zt("",!0),Zt("",!0),w("div",{onClick:p[7]||(p[7]=v=>y(8)),class:"s-pop-content-item g-flex-justify-between g-flex-align-center"},[w("div",_F,[SF,w("div",kF,[w("span",null,ce(V(o).changjianwentiText),1)])]),TF]),w("div",{onClick:p[8]||(p[8]=v=>m("safecenter")),class:"s-pop-content-item g-flex-justify-between g-flex-align-center"},[w("div",IF,[OF,w("div",BF,[w("span",null,ce(V(o).safeCenterText),1)])]),LF]),w("div",{onClick:p[9]||(p[9]=v=>m("mybill")),class:"s-pop-content-item g-flex-justify-between g-flex-align-center"},[w("div",PF,[$F,w("div",DF,[w("span",null,ce(V(o).zijingmingxiText),1)])]),RF]),w("div",{onClick:p[10]||(p[10]=v=>m("invite")),class:"s-pop-content-item g-flex-justify-between g-flex-align-center"},[w("div",MF,[NF,w("div",FF,[w("span",null,ce(V(o).inviteFriendText),1)])]),zF]),w("div",{onClick:p[11]||(p[11]=v=>m("myteam")),class:"s-pop-content-item g-flex-justify-between g-flex-align-center"},[w("div",jF,[UF,w("div",VF,[w("span",null,ce(V(o).myTeamText),1)])]),HF]),w("div",{onClick:p[12]||(p[12]=v=>y(21)),class:"s-pop-content-item g-flex-justify-between g-flex-align-center"},[w("div",WF,[qF,w("div",YF,[w("span",null,ce(V(o).lianghuajiaochengText),1)])]),GF]),w("div",{onClick:p[13]||(p[13]=v=>m("languageset")),class:"s-pop-content-item g-flex-justify-between g-flex-align-center"},[w("div",KF,[QF,w("div",XF,[w("span",null,ce(V(o).yuyanSetText),1)])]),w("div",ZF,[w("div",JF,[w("span",null,ce(V(A).name),1)]),e7])]),w("div",{onClick:p[14]||(p[14]=v=>y(6)),class:"s-pop-content-item g-flex-justify-between g-flex-align-center"},[w("div",t7,[n7,w("div",r7,[w("span",null,ce(V(o).aboutUsText),1)])]),a7]),w("div",{onClick:u,class:"s-pop-content-item g-flex-justify-between g-flex-align-center"},[w("div",o7,[i7,w("div",s7,[w("span",null,ce(V(o).xiazaiAppText),1)])]),l7])]),w("div",c7,[w("div",{onClick:g,class:"s-pop-exit-login g-flex-align-center g-flex-justify-center"},[w("span",null,ce(V(o).tuichuLoginText),1)])])])]),_:1},8,["show"])])}}};const d7={class:"c_notice_user_pop"},f7={class:"c-pop-container g-flex-column g-flex-align-center"},p7={class:"c-pop-title"},h7={class:"c-pop-title-text"},m7={class:"c-pop-content"},g7={class:"c-pop-content-list"},v7={class:"c-pop-content-item"},y7=["innerHTML"],A7={class:"c-pop-timedown g-flex-align-center g-flex-justify-center"},b7={__name:"NoticeUserPop",setup(e,{expose:t}){mn();const n=rn();oe(()=>n.tm("noticePop"));let r=re(!1);function a(f){l.value=5,o.obj=f,c(),r.value=!0}let o=He({obj:{}});function i(){u(),r.value=!1}let l=re(5),s=re(0);function c(){l.value=l.value-1,s.value=setInterval(()=>{l.value=l.value-1,l.value<=0&&(l.value=0,u(),i())},1e3)}function u(){clearInterval(s.value),s.value=0}return t({onShow:a}),Un(()=>{u()}),(f,d)=>{const m=Fn("van-popup");return Ve(),Ge("div",d7,[C(m,{duration:.6,"close-on-click-overlay":!1,"safe-area-inset-bottom":"",class:"c-pop",show:V(r),"onUpdate:show":d[0]||(d[0]=y=>ct(r)?r.value=y:r=y),position:"center"},{default:Ht(()=>[w("div",f7,[w("div",p7,[w("div",h7,[w("span",null,ce(V(o).obj.title),1)])]),w("div",m7,[w("div",g7,[w("div",v7,[w("div",{class:"c-pop-item-content-text",innerHTML:V(o).obj.content},null,8,y7)])])]),Fe(w("div",A7,[w("span",null,ce(V(l))+"S",1)],512),[[We,V(l)>0]])])]),_:1},8,["duration","show"])])}}};const E7={class:"v_radom"},x7={class:"v-radom-list"},C7={class:"v-radom-item v-radom-head g-flex"},w7={class:"head-item start"},_7={class:"head-item center"},S7={class:"head-item end"},k7={class:"scroll-container"},T7={key:0,class:"scroll-wrapper scroll-active"},I7={class:"head-item start"},O7={class:"head-item center"},B7={class:"head-item end"},L7={class:"head-item start"},P7={class:"head-item center"},$7={class:"head-item end"},D7={__name:"RadomList",setup(e){const t=mn(),n=rn(),r=oe(()=>n.tm("mainView"));Hn(),Vn();const a=re([]);async function o(){t.loadingShow=!0;const{success:i,data:l}=await Z1();!i||(a.value=l.list)}return Et(()=>{o()}),(i,l)=>(Ve(),Ge("div",E7,[w("div",x7,[w("div",C7,[w("div",w7,ce(V(r).username),1),w("div",_7,ce(V(r).betIncome),1),w("div",S7,ce(V(r).statusText),1)]),w("div",k7,[a.value.length?(Ve(),Ge("div",T7,[(Ve(!0),Ge(lt,null,zn(a.value,s=>(Ve(),Ge("div",{class:"v-radom-item g-flex",key:`radom${s.id}`},[w("div",I7,ce(s.user_name),1),w("div",O7,ce(s.amount)+"USDT",1),w("div",B7,ce(V(r).withdrawSeccuss),1)]))),128)),(Ve(!0),Ge(lt,null,zn(a.value,s=>(Ve(),Ge("div",{class:"v-radom-item g-flex",key:`radom22${s.id}`},[w("div",L7,ce(s.user_name),1),w("div",P7,ce(s.amount)+"USDT",1),w("div",$7,ce(V(r).withdrawSeccuss),1)]))),128))])):Zt("",!0)])])]))}},R7=tE(D7,[["__scopeId","data-v-fdc25986"]]);var M7={exports:{}};(function(e,t){(function(n,r){e.exports=r()})(self,()=>(()=>{var n={1916:(i,l,s)=>{var c=s(6877);i.exports=function(u){var f,d="",m=(u=u||{}).video,y=u.options,g=c.$escape,A=u.tran,h=u.icons,p=u.index,b=c.$each;return u.$value,u.$index,d+=`<div class="dplayer-mask"></div>
<div class="dplayer-video-wrap">
    `,f=s(1568)(m),d+=f,d+=`
    `,y.logo&&(d+=`
    <div class="dplayer-logo">
        <img src="`,d+=g(y.logo),d+=`">
    </div>
    `),d+=`
    <div class="dplayer-danmaku"`,y.danmaku&&y.danmaku.bottm&&(d+=' style="margin-bottom:',d+=g(y.danmaku.bottm),d+='"'),d+=`>
        <div class="dplayer-danmaku-item dplayer-danmaku-item--demo"></div>
    </div>
    <div class="dplayer-subtitle"></div>
    <div class="dplayer-bezel">
        <span class="dplayer-bezel-icon"></span>
        `,y.danmaku&&(d+=`
        <span class="dplayer-danloading">`,d+=g(A("danmaku-loading")),d+=`</span>
        `),d+=`
        <span class="diplayer-loading-icon">`,d+=h.loading,d+=`</span>
    </div>
</div>
<div class="dplayer-controller-mask"></div>
<div class="dplayer-controller">
    <div class="dplayer-icons dplayer-comment-box">
        <button class="dplayer-icon dplayer-comment-setting-icon" data-balloon="`,d+=g(A("setting")),d+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,d+=h.pallette,d+=`</span>
        </button>
        <div class="dplayer-comment-setting-box">
            <div class="dplayer-comment-setting-color">
                <div class="dplayer-comment-setting-title">`,d+=g(A("set-danmaku-color")),d+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,d+=g(p),d+=`" value="#fff" checked>
                    <span style="background: #fff;"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,d+=g(p),d+=`" value="#e54256">
                    <span style="background: #e54256"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,d+=g(p),d+=`" value="#ffe133">
                    <span style="background: #ffe133"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,d+=g(p),d+=`" value="#64DD17">
                    <span style="background: #64DD17"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,d+=g(p),d+=`" value="#39ccff">
                    <span style="background: #39ccff"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,d+=g(p),d+=`" value="#D500F9">
                    <span style="background: #D500F9"></span>
                </label>
            </div>
            <div class="dplayer-comment-setting-type">
                <div class="dplayer-comment-setting-title">`,d+=g(A("set-danmaku-type")),d+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,d+=g(p),d+=`" value="1">
                    <span>`,d+=g(A("top")),d+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,d+=g(p),d+=`" value="0" checked>
                    <span>`,d+=g(A("rolling")),d+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,d+=g(p),d+=`" value="2">
                    <span>`,d+=g(A("bottom")),d+=`</span>
                </label>
            </div>
        </div>
        <input class="dplayer-comment-input" type="text" placeholder="`,d+=g(A("input-danmaku-enter")),d+=`" maxlength="30">
        <button class="dplayer-icon dplayer-send-icon" data-balloon="`,d+=g(A("send")),d+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,d+=h.send,d+=`</span>
        </button>
    </div>
    <div class="dplayer-icons dplayer-icons-left">
        <button class="dplayer-icon dplayer-play-icon">
            <span class="dplayer-icon-content">`,d+=h.play,d+=`</span>
        </button>
        <div class="dplayer-volume">
            <button class="dplayer-icon dplayer-volume-icon">
                <span class="dplayer-icon-content">`,d+=h.volumeDown,d+=`</span>
            </button>
            <div class="dplayer-volume-bar-wrap" data-balloon-pos="up">
                <div class="dplayer-volume-bar">
                    <div class="dplayer-volume-bar-inner" style="background: `,d+=g(y.theme),d+=`;">
                        <span class="dplayer-thumb" style="background: `,d+=g(y.theme),d+=`"></span>
                    </div>
                </div>
            </div>
        </div>
        <span class="dplayer-time">
            <span class="dplayer-ptime">0:00</span> /
            <span class="dplayer-dtime">0:00</span>
        </span>
        `,y.live&&(d+=`
        <span class="dplayer-live-badge"><span class="dplayer-live-dot" style="background: `,d+=g(y.theme),d+=';"></span>',d+=g(A("live")),d+=`</span>
        `),d+=`
    </div>
    <div class="dplayer-icons dplayer-icons-right">
        `,y.video.quality&&(d+=`
        <div class="dplayer-quality">
            <button class="dplayer-icon dplayer-quality-icon">`,d+=g(y.video.quality[y.video.defaultQuality].name),d+=`</button>
            <div class="dplayer-quality-mask">
                <div class="dplayer-quality-list">
                `,b(y.video.quality,function(v,x){d+=`
                    <div class="dplayer-quality-item" data-index="`,d+=g(x),d+='">',d+=g(v.name),d+=`</div>
                `}),d+=`
                </div>
            </div>
        </div>
        `),d+=`
        `,y.screenshot&&(d+=`
        <div class="dplayer-icon dplayer-camera-icon" data-balloon="`,d+=g(A("screenshot")),d+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,d+=h.camera,d+=`</span>
        </div>
        `),d+=`
        `,y.airplay&&(d+=`
        <div class="dplayer-icon dplayer-airplay-icon" data-balloon="`,d+=g(A("airplay")),d+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,d+=h.airplay,d+=`</span>
        </div>
        `),d+=`
        `,y.chromecast&&(d+=`
        <div class="dplayer-icon dplayer-chromecast-icon" data-balloon="`,d+=g(A("chromecast")),d+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,d+=h.chromecast,d+=`</span>
        </div>
        `),d+=`
        <div class="dplayer-comment">
            <button class="dplayer-icon dplayer-comment-icon" data-balloon="`,d+=g(A("send-danmaku")),d+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,d+=h.comment,d+=`</span>
            </button>
        </div>
        `,y.subtitle&&(d+=`
        `,typeof y.subtitle.url=="string"?(d+=`
        <div class="dplayer-subtitle-btn">
            <button class="dplayer-icon dplayer-subtitle-icon" data-balloon="`,d+=g(A("hide-subs")),d+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,d+=h.subtitle,d+=`</span>
            </button>
        </div>
        `):(d+=`
        <div class="dplayer-subtitles">
            <button class="dplayer-icon dplayer-subtitles-icon" data-balloon="`,d+=g(A("subtitle")),d+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,d+=h.subtitle,d+=`</span>
            </button>
            <div class="dplayer-subtitles-box">
                <div class="dplayer-subtitles-panel">
                    `,b(y.subtitle.url,function(v,x){d+=`
                        <div class="dplayer-subtitles-item" data-subtitle="`,d+=g(v.url),d+=`">
                            <!-- if lang, show tran(lang). if lang and name, show name + (tran(lang)). if name, show name. off option use lang for translation. -->
                            <span class="dplayer-label">`,d+=g(v.lang?v.name?v.name+" ("+A(v.lang)+")":A(v.lang):v.name),d+=`</span>
                        </div>
                    `}),d+=`
                </div>
            </div>
        </div>
        `),d+=`
        `),d+=`
        <div class="dplayer-setting">
            <button class="dplayer-icon dplayer-setting-icon" data-balloon="`,d+=g(A("setting")),d+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,d+=h.setting,d+=`</span>
            </button>
            <div class="dplayer-setting-box">
                <div class="dplayer-setting-origin-panel">
                    <div class="dplayer-setting-item dplayer-setting-speed">
                        <span class="dplayer-label">`,d+=g(A("speed")),d+=`</span>
                        <div class="dplayer-toggle">`,d+=h.right,d+=`</div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-loop">
                        <span class="dplayer-label">`,d+=g(A("loop")),d+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-toggle-setting-input" type="checkbox" name="dplayer-toggle">
                            <label for="dplayer-toggle"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-showdan">
                        <span class="dplayer-label">`,d+=g(A("show-danmaku")),d+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-showdan-setting-input" type="checkbox" name="dplayer-toggle-dan">
                            <label for="dplayer-toggle-dan"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danunlimit">
                        <span class="dplayer-label">`,d+=g(A("unlimited-danmaku")),d+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-danunlimit-setting-input" type="checkbox" name="dplayer-toggle-danunlimit">
                            <label for="dplayer-toggle-danunlimit"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danmaku">
                        <span class="dplayer-label">`,d+=g(A("opacity-danmaku")),d+=`</span>
                        <div class="dplayer-danmaku-bar-wrap">
                            <div class="dplayer-danmaku-bar">
                                <div class="dplayer-danmaku-bar-inner">
                                    <span class="dplayer-thumb"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dplayer-setting-speed-panel">
                    `,b(y.playbackSpeed,function(v,x){d+=`
                        <div class="dplayer-setting-speed-item" data-speed="`,d+=g(v),d+=`">
                            <span class="dplayer-label">`,d+=g(v===1?A("normal"):v),d+=`</span>
                        </div>
                    `}),d+=`
                </div>
            </div>
        </div>
        <div class="dplayer-full">
            <button class="dplayer-icon dplayer-full-in-icon" data-balloon="`,d+=g(A("web-fullscreen")),d+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,d+=h.fullWeb,d+=`</span>
            </button>
            <button class="dplayer-icon dplayer-full-icon" data-balloon="`,d+=g(A("fullscreen")),d+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,d+=h.full,d+=`</span>
            </button>
        </div>
    </div>
    <div class="dplayer-bar-wrap">
        <div class="dplayer-bar-time hidden">00:00</div>
        <div class="dplayer-bar-preview"></div>
        <div class="dplayer-bar">
            <div class="dplayer-loaded" style="width: 0;"></div>
            <div class="dplayer-played" style="width: 0; background: `,d+=g(y.theme),d+=`">
                <span class="dplayer-thumb" style="background: `,d+=g(y.theme),d+=`"></span>
            </div>
        </div>
    </div>
</div>
<div class="dplayer-info-panel dplayer-info-panel-hide">
    <div class="dplayer-info-panel-close">[x]</div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-version">
        <span class="dplayer-info-panel-item-title">Player version</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-fps">
        <span class="dplayer-info-panel-item-title">Player FPS</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-type">
        <span class="dplayer-info-panel-item-title">Video type</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-url">
        <span class="dplayer-info-panel-item-title">Video url</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-resolution">
        <span class="dplayer-info-panel-item-title">Video resolution</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-duration">
        <span class="dplayer-info-panel-item-title">Video duration</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    `,y.danmaku&&(d+=`
    <div class="dplayer-info-panel-item dplayer-info-panel-item-danmaku-id">
        <span class="dplayer-info-panel-item-title">Danmaku id</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-danmaku-api">
        <span class="dplayer-info-panel-item-title">Danmaku api</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-danmaku-amount">
        <span class="dplayer-info-panel-item-title">Danmaku amount</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    `),d+=`
</div>
<div class="dplayer-menu">
    `,b(y.contextmenu,function(v,x){d+=`
        <div class="dplayer-menu-item">
            <a`,v.link&&(d+=' target="_blank"'),d+=' href="',d+=g(v.link||"javascript:void(0);"),d+='">',v.key&&(d+=" ",d+=g(A(v.key))),v.text&&(d+=" ",d+=g(v.text)),d+=`</a>
        </div>
    `}),d+=`
</div>
<div class="dplayer-notice-list"></div>
<button class="dplayer-mobile-play">
    `,d+=h.play,d+=`
</button>`}},1568:(i,l,s)=>{var c=s(6877);i.exports=function(u){var f="",d=(u=u||{}).enableSubtitle,m=u.subtitle,y=u.current,g=u.airplay,A=u.pic,h=c.$escape,p=u.screenshot,b=u.preload,v=u.url;return d=m&&m.type==="webvtt",f+=`
<video
    class="dplayer-video `,y&&(f+="dplayer-video-current"),f+=`"
    webkit-playsinline
    `,g&&(f+=' x-webkit-airplay="allow" '),f+=`
    playsinline
    `,A&&(f+='poster="',f+=h(A),f+='"'),f+=`
    `,(p||d)&&(f+='crossorigin="anonymous"'),f+=`
    `,b&&(f+='preload="',f+=h(b),f+='"'),f+=`
    `,g?f+=`
    nosrc
    `:v&&(f+=`
    src="`,f+=h(v),f+=`"
    `),f+=`
    >
    `,g&&(f+=`
    <source src="`,f+=h(v),f+=`">
    `),f+=`
    `,d&&(f+=`
    <track class="dplayer-subtrack" kind="metadata" default src="`,f+=h(typeof m.url=="string"?m.url:m.url[m.index].url),f+=`"></track>
    `),f+`
</video>`}},3399:(i,l,s)=>{s.d(l,{Z:()=>m});var c=s(8955),u=s.n(c),f=s(8160),d=s.n(f)()(u());d.push([i.id,`:root {
  --balloon-border-radius: 2px;
  --balloon-color: rgba(16, 16, 16, 0.95);
  --balloon-text-color: #fff;
  --balloon-font-size: 12px;
  --balloon-move: 4px; }

button[aria-label][data-balloon-pos] {
  overflow: visible; }

[aria-label][data-balloon-pos] {
  position: relative;
  cursor: pointer; }
  [aria-label][data-balloon-pos]:after {
    opacity: 0;
    pointer-events: none;
    transition: all 0.18s ease-out 0.18s;
    text-indent: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: normal;
    font-style: normal;
    text-shadow: none;
    font-size: 12px;
    font-size: var(--balloon-font-size);
    background: rgba(16, 16, 16, 0.95);
    background: var(--balloon-color);
    border-radius: 2px;
    color: #fff;
    color: var(--balloon-text-color);
    border-radius: 2px;
    border-radius: var(--balloon-border-radius);
    content: attr(aria-label);
    padding: .5em 1em;
    position: absolute;
    white-space: nowrap;
    z-index: 10; }
  [aria-label][data-balloon-pos]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: rgba(16, 16, 16, 0.95);
    border-top-color: var(--balloon-color);
    opacity: 0;
    pointer-events: none;
    transition: all 0.18s ease-out 0.18s;
    content: "";
    position: absolute;
    z-index: 10; }
  [aria-label][data-balloon-pos]:hover:before, [aria-label][data-balloon-pos]:hover:after, [aria-label][data-balloon-pos][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-visible]:after, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:before, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:after {
    opacity: 1;
    pointer-events: none; }
  [aria-label][data-balloon-pos].font-awesome:after {
    font-family: FontAwesome, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }
  [aria-label][data-balloon-pos][data-balloon-break]:after {
    white-space: pre; }
  [aria-label][data-balloon-pos][data-balloon-break][data-balloon-length]:after {
    white-space: pre-line;
    word-break: break-word; }
  [aria-label][data-balloon-pos][data-balloon-blunt]:before, [aria-label][data-balloon-pos][data-balloon-blunt]:after {
    transition: none; }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:after {
    transform: translate(-50%, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:before {
    transform: translate(-50%, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:after {
    left: 0; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:before {
    left: 5px; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:after {
    right: 0; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:before {
    right: 5px; }
  [aria-label][data-balloon-pos][data-balloon-po*="-left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-po*="-left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:after {
    transform: translate(0, 0); }
  [aria-label][data-balloon-pos][data-balloon-po*="-left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-po*="-left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:before {
    transform: translate(0, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos^="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
    bottom: 100%;
    transform-origin: top;
    transform: translate(0, 4px);
    transform: translate(0, var(--balloon-move)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
    margin-bottom: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos="up"]:after {
    left: 50%;
    transform: translate(-50%, 4px);
    transform: translate(-50%, var(--balloon-move)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
    top: 100%;
    transform: translate(0, calc(4px * -1));
    transform: translate(0, calc(var(--balloon-move) * -1)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
    margin-top: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-bottom-color: rgba(16, 16, 16, 0.95);
    border-bottom-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-pos="down"]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:before {
    left: 50%;
    transform: translate(-50%, calc(4px * -1));
    transform: translate(-50%, calc(var(--balloon-move) * -1)); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:after {
    transform: translate(0, -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:before {
    transform: translate(0, -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:after, [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
    right: 100%;
    top: 50%;
    transform: translate(4px, -50%);
    transform: translate(var(--balloon-move), -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:after {
    margin-right: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-left-color: rgba(16, 16, 16, 0.95);
    border-left-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
    left: 100%;
    top: 50%;
    transform: translate(calc(4px * -1), -50%);
    transform: translate(calc(var(--balloon-move) * -1), -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:after {
    margin-left: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-right-color: rgba(16, 16, 16, 0.95);
    border-right-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-length]:after {
    white-space: normal; }
  [aria-label][data-balloon-pos][data-balloon-length="small"]:after {
    width: 80px; }
  [aria-label][data-balloon-pos][data-balloon-length="medium"]:after {
    width: 150px; }
  [aria-label][data-balloon-pos][data-balloon-length="large"]:after {
    width: 260px; }
  [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
    width: 380px; }
    @media screen and (max-width: 768px) {
      [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
        width: 90vw; } }
  [aria-label][data-balloon-pos][data-balloon-length="fit"]:after {
    width: 100%; }
`,"",{version:3,sources:["webpack://./node_modules/.pnpm/balloon-css@1.2.0/node_modules/balloon-css/balloon.css"],names:[],mappings:"AAAA;EACE,4BAA4B;EAC5B,uCAAuC;EACvC,0BAA0B;EAC1B,yBAAyB;EACzB,mBAAmB,EAAE;;AAEvB;EACE,iBAAiB,EAAE;;AAErB;EACE,kBAAkB;EAClB,eAAe,EAAE;EACjB;IACE,UAAU;IACV,oBAAoB;IACpB,oCAAoC;IACpC,cAAc;IACd,wIAAwI;IACxI,mBAAmB;IACnB,kBAAkB;IAClB,iBAAiB;IACjB,eAAmC;IAAnC,mCAAmC;IACnC,kCAAgC;IAAhC,gCAAgC;IAChC,kBAAkB;IAClB,WAAgC;IAAhC,gCAAgC;IAChC,kBAA2C;IAA3C,2CAA2C;IAC3C,yBAAyB;IACzB,iBAAiB;IACjB,kBAAkB;IAClB,mBAAmB;IACnB,WAAW,EAAE;EACf;IACE,QAAQ;IACR,SAAS;IACT,6BAA6B;IAC7B,wCAAsC;IAAtC,sCAAsC;IACtC,UAAU;IACV,oBAAoB;IACpB,oCAAoC;IACpC,WAAW;IACX,kBAAkB;IAClB,WAAW,EAAE;EACf;IACE,UAAU;IACV,oBAAoB,EAAE;EACxB;IACE,qJAAqJ,EAAE;EACzJ;IACE,gBAAgB,EAAE;EACpB;IACE,qBAAqB;IACrB,sBAAsB,EAAE;EAC1B;IACE,gBAAgB,EAAE;EACpB;IACE,6BAA6B,EAAE;EACjC;IACE,6BAA6B,EAAE;EACjC;IACE,OAAO,EAAE;EACX;IACE,SAAS,EAAE;EACb;IACE,QAAQ,EAAE;EACZ;IACE,UAAU,EAAE;EACd;IACE,0BAA0B,EAAE;EAC9B;IACE,0BAA0B,EAAE;EAC9B;IACE,YAAY;IACZ,qBAAqB;IACrB,4BAA4C;IAA5C,4CAA4C,EAAE;EAChD;IACE,mBAAmB,EAAE;EACvB;IACE,SAAS;IACT,+BAA+C;IAA/C,+CAA+C,EAAE;EACnD;IACE,SAAS;IACT,uCAAuD;IAAvD,uDAAuD,EAAE;EAC3D;IACE,gBAAgB,EAAE;EACpB;IACE,QAAQ;IACR,SAAS;IACT,6BAA6B;IAC7B,2CAAyC;IAAzC,yCAAyC,EAAE;EAC7C;IACE,SAAS;IACT,0CAA0D;IAA1D,0DAA0D,EAAE;EAC9D;IACE,6BAA6B,EAAE;EACjC;IACE,6BAA6B,EAAE;EACjC;IACE,WAAW;IACX,QAAQ;IACR,+BAA+C;IAA/C,+CAA+C,EAAE;EACnD;IACE,kBAAkB,EAAE;EACtB;IACE,QAAQ;IACR,SAAS;IACT,6BAA6B;IAC7B,yCAAuC;IAAvC,uCAAuC,EAAE;EAC3C;IACE,UAAU;IACV,QAAQ;IACR,0CAA0D;IAA1D,0DAA0D,EAAE;EAC9D;IACE,iBAAiB,EAAE;EACrB;IACE,QAAQ;IACR,SAAS;IACT,6BAA6B;IAC7B,0CAAwC;IAAxC,wCAAwC,EAAE;EAC5C;IACE,mBAAmB,EAAE;EACvB;IACE,WAAW,EAAE;EACf;IACE,YAAY,EAAE;EAChB;IACE,YAAY,EAAE;EAChB;IACE,YAAY,EAAE;IACd;MACE;QACE,WAAW,EAAE,EAAE;EACrB;IACE,WAAW,EAAE",sourcesContent:[`:root {
  --balloon-border-radius: 2px;
  --balloon-color: rgba(16, 16, 16, 0.95);
  --balloon-text-color: #fff;
  --balloon-font-size: 12px;
  --balloon-move: 4px; }

button[aria-label][data-balloon-pos] {
  overflow: visible; }

[aria-label][data-balloon-pos] {
  position: relative;
  cursor: pointer; }
  [aria-label][data-balloon-pos]:after {
    opacity: 0;
    pointer-events: none;
    transition: all 0.18s ease-out 0.18s;
    text-indent: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: normal;
    font-style: normal;
    text-shadow: none;
    font-size: var(--balloon-font-size);
    background: var(--balloon-color);
    border-radius: 2px;
    color: var(--balloon-text-color);
    border-radius: var(--balloon-border-radius);
    content: attr(aria-label);
    padding: .5em 1em;
    position: absolute;
    white-space: nowrap;
    z-index: 10; }
  [aria-label][data-balloon-pos]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: var(--balloon-color);
    opacity: 0;
    pointer-events: none;
    transition: all 0.18s ease-out 0.18s;
    content: "";
    position: absolute;
    z-index: 10; }
  [aria-label][data-balloon-pos]:hover:before, [aria-label][data-balloon-pos]:hover:after, [aria-label][data-balloon-pos][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-visible]:after, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:before, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:after {
    opacity: 1;
    pointer-events: none; }
  [aria-label][data-balloon-pos].font-awesome:after {
    font-family: FontAwesome, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }
  [aria-label][data-balloon-pos][data-balloon-break]:after {
    white-space: pre; }
  [aria-label][data-balloon-pos][data-balloon-break][data-balloon-length]:after {
    white-space: pre-line;
    word-break: break-word; }
  [aria-label][data-balloon-pos][data-balloon-blunt]:before, [aria-label][data-balloon-pos][data-balloon-blunt]:after {
    transition: none; }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:after {
    transform: translate(-50%, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:before {
    transform: translate(-50%, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:after {
    left: 0; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:before {
    left: 5px; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:after {
    right: 0; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:before {
    right: 5px; }
  [aria-label][data-balloon-pos][data-balloon-po*="-left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-po*="-left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:after {
    transform: translate(0, 0); }
  [aria-label][data-balloon-pos][data-balloon-po*="-left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-po*="-left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:before {
    transform: translate(0, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos^="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
    bottom: 100%;
    transform-origin: top;
    transform: translate(0, var(--balloon-move)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
    margin-bottom: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos="up"]:after {
    left: 50%;
    transform: translate(-50%, var(--balloon-move)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
    top: 100%;
    transform: translate(0, calc(var(--balloon-move) * -1)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
    margin-top: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-bottom-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-pos="down"]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:before {
    left: 50%;
    transform: translate(-50%, calc(var(--balloon-move) * -1)); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:after {
    transform: translate(0, -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:before {
    transform: translate(0, -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:after, [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
    right: 100%;
    top: 50%;
    transform: translate(var(--balloon-move), -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:after {
    margin-right: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-left-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
    left: 100%;
    top: 50%;
    transform: translate(calc(var(--balloon-move) * -1), -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:after {
    margin-left: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-right-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-length]:after {
    white-space: normal; }
  [aria-label][data-balloon-pos][data-balloon-length="small"]:after {
    width: 80px; }
  [aria-label][data-balloon-pos][data-balloon-length="medium"]:after {
    width: 150px; }
  [aria-label][data-balloon-pos][data-balloon-length="large"]:after {
    width: 260px; }
  [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
    width: 380px; }
    @media screen and (max-width: 768px) {
      [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
        width: 90vw; } }
  [aria-label][data-balloon-pos][data-balloon-length="fit"]:after {
    width: 100%; }
`],sourceRoot:""}]);const m=d},3150:(i,l,s)=>{s.d(l,{Z:()=>b});var c=s(8955),u=s.n(c),f=s(8160),d=s.n(f),m=s(3399),y=s(8431),g=s.n(y),A=new URL(s(7831),s.b),h=d()(u());h.i(m.Z);var p=g()(A);h.push([i.id,`@-webkit-keyframes my-face {
  2% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  4% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  6% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  8% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  10% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  12% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  14% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  16% {
    transform: translate(0, -0.5px) rotate(-1.5deg);
  }
  18% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  20% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  22% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  24% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  26% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  28% {
    transform: translate(0, 0.5px) rotate(1.5deg);
  }
  30% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  32% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  34% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  36% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  38% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  40% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  42% {
    transform: translate(0, 2.5px) rotate(-1.5deg);
  }
  44% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  46% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  48% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  50% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  52% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  54% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  56% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  58% {
    transform: translate(0, 0.5px) rotate(2.5deg);
  }
  60% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  62% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  64% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  66% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  68% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  70% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  72% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  74% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  76% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  78% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  80% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  82% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  84% {
    transform: translate(0, 1.5px) rotate(2.5deg);
  }
  86% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  88% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  90% {
    transform: translate(0, 2.5px) rotate(-0.5deg);
  }
  92% {
    transform: translate(0, 0.5px) rotate(-0.5deg);
  }
  94% {
    transform: translate(0, 2.5px) rotate(0.5deg);
  }
  96% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  98% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}
@keyframes my-face {
  2% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  4% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  6% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  8% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  10% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  12% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  14% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  16% {
    transform: translate(0, -0.5px) rotate(-1.5deg);
  }
  18% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  20% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  22% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  24% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  26% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  28% {
    transform: translate(0, 0.5px) rotate(1.5deg);
  }
  30% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  32% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  34% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  36% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  38% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  40% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  42% {
    transform: translate(0, 2.5px) rotate(-1.5deg);
  }
  44% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  46% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  48% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  50% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  52% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  54% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  56% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  58% {
    transform: translate(0, 0.5px) rotate(2.5deg);
  }
  60% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  62% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  64% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  66% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  68% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  70% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  72% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  74% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  76% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  78% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  80% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  82% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  84% {
    transform: translate(0, 1.5px) rotate(2.5deg);
  }
  86% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  88% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  90% {
    transform: translate(0, 2.5px) rotate(-0.5deg);
  }
  92% {
    transform: translate(0, 0.5px) rotate(-0.5deg);
  }
  94% {
    transform: translate(0, 2.5px) rotate(0.5deg);
  }
  96% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  98% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}
.dplayer {
  position: relative;
  overflow: hidden;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  line-height: 1;
}
.dplayer * {
  box-sizing: content-box;
}
.dplayer svg {
  width: 100%;
  height: 100%;
}
.dplayer svg path,
.dplayer svg circle {
  fill: #fff;
}
.dplayer:-webkit-full-screen {
  width: 100%;
  height: 100%;
  background: #000;
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  transform: translate(0, 0);
}
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-showdan,
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-danmaku,
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-danunlimit {
  display: none;
}
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-comment {
  display: none;
}
.dplayer.dplayer-no-danmaku .dplayer-danmaku {
  display: none;
}
.dplayer.dplayer-live .dplayer-time {
  display: none;
}
.dplayer.dplayer-live .dplayer-bar-wrap {
  display: none;
}
.dplayer.dplayer-live .dplayer-setting-speed {
  display: none;
}
.dplayer.dplayer-live .dplayer-setting-loop {
  display: none;
}
.dplayer.dplayer-live.dplayer-no-danmaku .dplayer-setting {
  display: none;
}
.dplayer.dplayer-arrow .dplayer-danmaku {
  font-size: 18px;
}
.dplayer.dplayer-arrow .dplayer-icon {
  margin: 0 -3px;
}
.dplayer.dplayer-playing .dplayer-danmaku .dplayer-danmaku-move {
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
@media (min-width: 900px) {
  .dplayer.dplayer-playing .dplayer-controller-mask {
    opacity: 0;
  }
  .dplayer.dplayer-playing .dplayer-controller {
    opacity: 0;
  }
  .dplayer.dplayer-playing:hover .dplayer-controller-mask {
    opacity: 1;
  }
  .dplayer.dplayer-playing:hover .dplayer-controller {
    opacity: 1;
  }
}
.dplayer.dplayer-loading .dplayer-bezel .diplayer-loading-icon {
  display: block;
}
.dplayer.dplayer-loading .dplayer-danmaku,
.dplayer.dplayer-paused .dplayer-danmaku,
.dplayer.dplayer-loading .dplayer-danmaku-move,
.dplayer.dplayer-paused .dplayer-danmaku-move {
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.dplayer.dplayer-hide-controller {
  cursor: none;
}
.dplayer.dplayer-hide-controller .dplayer-controller-mask {
  opacity: 0;
  transform: translateY(100%);
}
.dplayer.dplayer-hide-controller .dplayer-controller {
  opacity: 0;
  transform: translateY(100%);
}
.dplayer.dplayer-show-controller .dplayer-controller-mask {
  opacity: 1;
}
.dplayer.dplayer-show-controller .dplayer-controller {
  opacity: 1;
}
.dplayer.dplayer-fulled {
  width: 100% !important;
  height: 100% !important;
}
.dplayer.dplayer-fulled {
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
}
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-volume,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-camera-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-airplay-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-chromecast-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-play-icon {
  display: none;
}
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon {
  position: static;
  display: inline-block;
}
.dplayer.dplayer-mobile .dplayer-bar-time {
  display: none;
}
.dplayer.dplayer-mobile.dplayer-hide-controller .dplayer-mobile-play {
  display: none;
}
.dplayer.dplayer-mobile .dplayer-mobile-play {
  display: block;
}
.dplayer-web-fullscreen-fix {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}
[data-balloon]:before {
  display: none;
}
[data-balloon]:after {
  padding: 0.3em 0.7em;
  background: rgba(17, 17, 17, 0.7);
}
[data-balloon][data-balloon-pos="up"]:after {
  margin-bottom: 0;
}
.dplayer-bezel {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 22px;
  color: #fff;
  pointer-events: none;
}
.dplayer-bezel .dplayer-bezel-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -26px 0 0 -26px;
  height: 52px;
  width: 52px;
  padding: 12px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}
.dplayer-bezel .dplayer-bezel-icon.dplayer-bezel-transition {
  -webkit-animation: bezel-hide 0.5s linear;
          animation: bezel-hide 0.5s linear;
}
@-webkit-keyframes bezel-hide {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
}
@keyframes bezel-hide {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
}
.dplayer-bezel .dplayer-danloading {
  position: absolute;
  top: 50%;
  margin-top: -7px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  -webkit-animation: my-face 5s infinite ease-in-out;
          animation: my-face 5s infinite ease-in-out;
}
.dplayer-bezel .diplayer-loading-icon {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -18px 0 0 -18px;
  height: 36px;
  width: 36px;
  pointer-events: none;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-hide {
  display: none;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot {
  -webkit-animation: diplayer-loading-dot-fade 0.8s ease infinite;
          animation: diplayer-loading-dot-fade 0.8s ease infinite;
  opacity: 0;
  transform-origin: 4px 4px;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-1 {
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-2 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-3 {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-4 {
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-5 {
  -webkit-animation-delay: 0.5s;
          animation-delay: 0.5s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-6 {
  -webkit-animation-delay: 0.6s;
          animation-delay: 0.6s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-7 {
  -webkit-animation-delay: 0.7s;
          animation-delay: 0.7s;
}
@-webkit-keyframes diplayer-loading-dot-fade {
  0% {
    opacity: 0.7;
    transform: scale(1.2, 1.2);
  }
  50% {
    opacity: 0.25;
    transform: scale(0.9, 0.9);
  }
  to {
    opacity: 0.25;
    transform: scale(0.85, 0.85);
  }
}
@keyframes diplayer-loading-dot-fade {
  0% {
    opacity: 0.7;
    transform: scale(1.2, 1.2);
  }
  50% {
    opacity: 0.25;
    transform: scale(0.9, 0.9);
  }
  to {
    opacity: 0.25;
    transform: scale(0.85, 0.85);
  }
}
.dplayer-controller-mask {
  background: url(`+p+`) repeat-x bottom;
  height: 98px;
  width: 100%;
  position: absolute;
  bottom: 0;
  transition: all 0.3s ease;
}
.dplayer-controller {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 41px;
  padding: 0 20px;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  transition: all 0.3s ease;
}
.dplayer-controller.dplayer-controller-comment .dplayer-icons {
  display: none;
}
.dplayer-controller.dplayer-controller-comment .dplayer-icons.dplayer-comment-box {
  display: block;
}
.dplayer-controller .dplayer-bar-wrap {
  padding: 5px 0;
  cursor: pointer;
  position: absolute;
  bottom: 33px;
  width: calc(100% - 40px);
  height: 3px;
}
.dplayer-controller .dplayer-bar-wrap:hover .dplayer-bar .dplayer-played .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-bar-wrap:hover .dplayer-highlight {
  display: block;
  width: 8px;
  transform: translateX(-4px);
  top: 4px;
  height: 40%;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight {
  z-index: 12;
  position: absolute;
  top: 5px;
  width: 6px;
  height: 20%;
  border-radius: 6px;
  background-color: #fff;
  text-align: center;
  transform: translateX(-3px);
  transition: all 0.2s ease-in-out;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover .dplayer-highlight-text {
  display: block;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover ~ .dplayer-bar-preview {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover ~ .dplayer-bar-time {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight .dplayer-highlight-text {
  display: none;
  position: absolute;
  left: 50%;
  top: -24px;
  padding: 5px 8px;
  background-color: rgba(0, 0, 0, 0.62);
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  transform: translateX(-50%);
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-preview {
  position: absolute;
  background: #fff;
  pointer-events: none;
  display: none;
  background-size: 16000px 100%;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-preview-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time {
  position: absolute;
  left: 0px;
  top: -20px;
  border-radius: 4px;
  padding: 5px 7px;
  background-color: rgba(0, 0, 0, 0.62);
  color: #fff;
  font-size: 12px;
  text-align: center;
  opacity: 1;
  transition: opacity 0.1s ease-in-out;
  word-wrap: normal;
  word-break: normal;
  z-index: 2;
  pointer-events: none;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time.hidden {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar {
  position: relative;
  height: 3px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-loaded {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.4);
  height: 3px;
  transition: all 0.5s ease;
  will-change: width;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-played {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: 3px;
  will-change: width;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-played .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons {
  height: 38px;
  position: absolute;
  bottom: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box {
  display: none;
  position: absolute;
  transition: all 0.3s ease-in-out;
  z-index: 2;
  height: 38px;
  bottom: 0;
  left: 20px;
  right: 20px;
  color: #fff;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-icon {
  padding: 7px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-icon {
  position: absolute;
  left: 0;
  top: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-send-icon {
  position: absolute;
  right: 0;
  top: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box {
  position: absolute;
  background: rgba(28, 28, 28, 0.9);
  bottom: 41px;
  left: 0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 10px 10px 16px;
  font-size: 14px;
  width: 204px;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box.dplayer-comment-setting-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box input[type=radio] {
  display: none;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box label {
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-title {
  font-size: 13px;
  color: #fff;
  line-height: 30px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type {
  font-size: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type .dplayer-comment-setting-title {
  margin-bottom: 6px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type label:nth-child(2) span {
  border-radius: 4px 0 0 4px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type label:nth-child(4) span {
  border-radius: 0 4px 4px 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type span {
  width: 33%;
  padding: 4px 6px;
  line-height: 16px;
  display: inline-block;
  font-size: 12px;
  color: #fff;
  border: 1px solid #fff;
  margin-right: -1px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type input:checked + span {
  background: #E4E4E6;
  color: #1c1c1c;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color {
  font-size: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color label {
  font-size: 0;
  padding: 6px;
  display: inline-block;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color span {
  width: 22px;
  height: 22px;
  display: inline-block;
  border-radius: 50%;
  box-sizing: border-box;
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color span:hover {
  -webkit-animation: my-face 5s infinite ease-in-out;
          animation: my-face 5s infinite ease-in-out;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input {
  outline: none;
  border: none;
  padding: 8px 31px;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  border-radius: 4px;
  background: none;
  margin: 0;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  color: #fff;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::-moz-placeholder {
  color: #fff;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::placeholder {
  color: #fff;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::-ms-clear {
  display: none;
}
.dplayer-controller .dplayer-icons.dplayer-icons-left .dplayer-icon {
  padding: 7px;
}
.dplayer-controller .dplayer-icons.dplayer-icons-right {
  right: 20px;
}
.dplayer-controller .dplayer-icons.dplayer-icons-right .dplayer-icon {
  padding: 8px;
}
.dplayer-controller .dplayer-icons .dplayer-time,
.dplayer-controller .dplayer-icons .dplayer-live-badge {
  line-height: 38px;
  color: #eee;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  vertical-align: middle;
  font-size: 13px;
  cursor: default;
}
.dplayer-controller .dplayer-icons .dplayer-live-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  vertical-align: 4%;
  margin-right: 5px;
  content: '';
  border-radius: 6px;
}
.dplayer-controller .dplayer-icons .dplayer-icon {
  width: 40px;
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  vertical-align: middle;
  box-sizing: border-box;
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-icon .dplayer-icon-content {
  transition: all 0.2s ease-in-out;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons .dplayer-icon:hover .dplayer-icon-content {
  opacity: 1;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-quality-icon {
  color: #fff;
  width: auto;
  line-height: 22px;
  font-size: 14px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-comment-icon {
  padding: 10px 9px 9px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-setting-icon {
  padding-top: 8.5px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-volume-icon {
  width: 43px;
}
.dplayer-controller .dplayer-icons .dplayer-volume {
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-volume:hover .dplayer-volume-bar-wrap .dplayer-volume-bar {
  width: 45px;
}
.dplayer-controller .dplayer-icons .dplayer-volume:hover .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-volume.dplayer-volume-active .dplayer-volume-bar-wrap .dplayer-volume-bar {
  width: 45px;
}
.dplayer-controller .dplayer-icons .dplayer-volume.dplayer-volume-active .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap {
  display: inline-block;
  margin: 0 10px 0 -5px;
  vertical-align: middle;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar {
  position: relative;
  top: 17px;
  width: 0;
  height: 3px;
  background: #aaa;
  transition: all 0.3s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  transition: all 0.1s ease;
  will-change: width;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons .dplayer-subtitle-btn {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box {
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: scale(0);
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  max-width: 240px;
  min-width: 120px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 7px 0;
  transition: all 0.3s ease-in-out;
  overflow: auto;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box.dplayer-subtitles-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box.dplayer-subtitles-box-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-item {
  height: 30px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-setting {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box {
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: scale(0);
  width: 150px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 7px 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box > div {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box > div.dplayer-setting-origin-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-narrow {
  width: 70px;
  text-align: center;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-speed .dplayer-setting-origin-panel {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-speed .dplayer-setting-speed-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-item,
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-speed-item {
  height: 30px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-item:hover,
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-speed-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku {
  padding: 5px 0;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-label {
  padding: 0 10px;
  display: inline;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku:hover .dplayer-label {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku:hover .dplayer-danmaku-bar-wrap {
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku.dplayer-setting-danmaku-active .dplayer-label {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku.dplayer-setting-danmaku-active .dplayer-danmaku-bar-wrap {
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap {
  padding: 0 10px;
  box-sizing: border-box;
  display: none;
  vertical-align: middle;
  height: 100%;
  width: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar {
  position: relative;
  top: 8.5px;
  width: 100%;
  height: 3px;
  background: #fff;
  transition: all 0.3s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar .dplayer-danmaku-bar-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  transition: all 0.1s ease;
  background: #aaa;
  will-change: width;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar .dplayer-danmaku-bar-inner .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: #aaa;
}
.dplayer-controller .dplayer-icons .dplayer-full {
  display: inline-block;
  height: 100%;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-full:hover .dplayer-full-in-icon {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon {
  position: absolute;
  top: -30px;
  z-index: 1;
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-quality {
  position: relative;
  display: inline-block;
  height: 100%;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-quality:hover .dplayer-quality-list {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-quality:hover .dplayer-quality-mask {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-mask {
  display: none;
  position: absolute;
  bottom: 38px;
  left: -18px;
  width: 80px;
  padding-bottom: 12px;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-list {
  display: none;
  font-size: 12px;
  width: 80px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 5px 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  color: #fff;
  text-align: center;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-item {
  height: 25px;
  box-sizing: border-box;
  cursor: pointer;
  line-height: 25px;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-comment {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-label {
  color: #eee;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
}
.dplayer-controller .dplayer-icons .dplayer-toggle {
  width: 32px;
  height: 20px;
  text-align: center;
  font-size: 0;
  vertical-align: middle;
  position: absolute;
  top: 5px;
  right: 10px;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input {
  max-height: 0;
  max-width: 0;
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label {
  display: inline-block;
  position: relative;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border: 1px solid #dfdfdf;
  height: 20px;
  width: 32px;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label:before {
  content: "";
  position: absolute;
  display: block;
  height: 18px;
  width: 18px;
  top: 0;
  left: 0;
  border-radius: 15px;
  transition: 0.2s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label:after {
  content: "";
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  border-radius: 15px;
  background: #fff;
  transition: 0.2s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  height: 18px;
  width: 18px;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label {
  border-color: rgba(255, 255, 255, 0.5);
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label:before {
  width: 30px;
  background: rgba(255, 255, 255, 0.5);
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label:after {
  left: 12px;
}
.dplayer-mobile-play {
  display: none;
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  bottom: 0;
  opacity: 0.8;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.dplayer-danmaku {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 22px;
  color: #fff;
}
.dplayer-danmaku .dplayer-danmaku-item {
  display: inline-block;
  pointer-events: none;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  cursor: default;
  white-space: nowrap;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
}
.dplayer-danmaku .dplayer-danmaku-item--demo {
  position: absolute;
  visibility: hidden;
}
.dplayer-danmaku .dplayer-danmaku-right {
  position: absolute;
  right: 0;
  transform: translateX(100%);
}
.dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
  will-change: transform;
  -webkit-animation-name: 'danmaku';
          animation-name: 'danmaku';
  -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
@-webkit-keyframes danmaku {
  from {
    transform: translateX(100%);
  }
}
@keyframes danmaku {
  from {
    transform: translateX(100%);
  }
}
.dplayer-danmaku .dplayer-danmaku-top,
.dplayer-danmaku .dplayer-danmaku-bottom {
  position: absolute;
  width: 100%;
  text-align: center;
  visibility: hidden;
}
.dplayer-danmaku .dplayer-danmaku-top.dplayer-danmaku-move,
.dplayer-danmaku .dplayer-danmaku-bottom.dplayer-danmaku-move {
  will-change: visibility;
  -webkit-animation-name: 'danmaku-center';
          animation-name: 'danmaku-center';
  -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
@-webkit-keyframes danmaku-center {
  from {
    visibility: visible;
  }
  to {
    visibility: visible;
  }
}
@keyframes danmaku-center {
  from {
    visibility: visible;
  }
  to {
    visibility: visible;
  }
}
.dplayer-logo {
  pointer-events: none;
  position: absolute;
  left: 20px;
  top: 20px;
  max-width: 50px;
  max-height: 50px;
}
.dplayer-logo img {
  max-width: 100%;
  max-height: 100%;
  background: none;
}
.dplayer-menu {
  position: absolute;
  width: 170px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.85);
  padding: 5px 0;
  overflow: hidden;
  z-index: 3;
  display: none;
}
.dplayer-menu.dplayer-menu-show {
  display: block;
}
.dplayer-menu .dplayer-menu-item {
  height: 30px;
  box-sizing: border-box;
  cursor: pointer;
}
.dplayer-menu .dplayer-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-menu .dplayer-menu-item a {
  padding: 0 10px;
  line-height: 30px;
  color: #eee;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dplayer-menu .dplayer-menu-item a:hover {
  text-decoration: none;
}
.dplayer-notice-list {
  position: absolute;
  bottom: 60px;
  left: 20px;
}
.dplayer-notice-list .dplayer-notice {
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  color: #fff;
  display: table;
  pointer-events: none;
  -webkit-animation: showNotice 0.3s ease 1 forwards;
          animation: showNotice 0.3s ease 1 forwards;
}
.dplayer-notice-list .remove-notice {
  -webkit-animation: removeNotice 0.3s ease 1 forwards;
          animation: removeNotice 0.3s ease 1 forwards;
}
@-webkit-keyframes showNotice {
  from {
    padding: 0;
    font-size: 0;
    margin-top: 0;
  }
  to {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
}
@keyframes showNotice {
  from {
    padding: 0;
    font-size: 0;
    margin-top: 0;
  }
  to {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
}
@-webkit-keyframes removeNotice {
  0% {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
  20% {
    font-size: 12px;
  }
  21% {
    font-size: 0;
    padding: 7px 10px;
  }
  100% {
    padding: 0;
    margin-top: 0;
    font-size: 0;
  }
}
@keyframes removeNotice {
  0% {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
  20% {
    font-size: 12px;
  }
  21% {
    font-size: 0;
    padding: 7px 10px;
  }
  100% {
    padding: 0;
    margin-top: 0;
    font-size: 0;
  }
}
.dplayer-subtitle {
  position: absolute;
  bottom: 40px;
  width: 90%;
  left: 5%;
  text-align: center;
  color: #fff;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
  font-size: 20px;
}
.dplayer-subtitle.dplayer-subtitle-hide {
  display: none;
}
.dplayer-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: none;
}
.dplayer-mask.dplayer-mask-show {
  display: block;
}
.dplayer-video-wrap {
  position: relative;
  background: #000;
  font-size: 0;
  width: 100%;
  height: 100%;
}
.dplayer-video-wrap .dplayer-video {
  width: 100%;
  height: 100%;
  display: none;
}
.dplayer-video-wrap .dplayer-video-current {
  display: block;
}
.dplayer-video-wrap .dplayer-video-prepare {
  display: none;
}
.dplayer-info-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 400px;
  background: rgba(28, 28, 28, 0.8);
  padding: 10px;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
.dplayer-info-panel-hide {
  display: none;
}
.dplayer-info-panel .dplayer-info-panel-close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
}
.dplayer-info-panel .dplayer-info-panel-item > span {
  display: inline-block;
  vertical-align: middle;
  line-height: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dplayer-info-panel .dplayer-info-panel-item-title {
  width: 100px;
  text-align: right;
  margin-right: 10px;
}
.dplayer-info-panel .dplayer-info-panel-item-data {
  width: 260px;
}
`,"",{version:3,sources:["webpack://./src/css/global.less","webpack://./src/css/index.less","webpack://./src/css/player.less","webpack://./src/css/balloon.less","webpack://./src/css/bezel.less","webpack://./src/css/video.less","webpack://./src/css/controller.less","webpack://./src/css/danmaku.less","webpack://./src/css/logo.less","webpack://./src/css/menu.less","webpack://./src/css/notice.less","webpack://./src/css/subtitle.less","webpack://./src/css/info-panel.less"],names:[],mappings:"AAAA;EACI;IACI,6CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;;IAEI,uCAAA;ECEN;AACF;ADzJA;EACI;IACI,6CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;;IAEI,uCAAA;ECEN;AACF;ACzJA;EACI,kBAAA;EACA,gBAAA;EACA,yBAAA;KAAA,sBAAA;UAAA,iBAAA;EACA,cAAA;AD2JJ;AC/JA;EAOQ,uBAAA;AD2JR;AClKA;EAWQ,WAAA;EACA,YAAA;AD0JR;ACtKA;;EAgBY,UAAA;AD0JZ;ACtJI;EACI,WAAA;EACA,YAAA;EACA,gBAAA;EACA,eAAA;EACA,eAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,UAAA;EACA,0BAAA;ADwJR;ACpJI;;;EAKY,aAAA;ADoJhB;ACzJI;EAUQ,aAAA;ADkJZ;AC5JI;EAcQ,aAAA;ADiJZ;AC7II;EAEQ,aAAA;AD8IZ;AChJI;EAKQ,aAAA;AD8IZ;ACnJI;EAQQ,aAAA;AD8IZ;ACtJI;EAWQ,aAAA;AD8IZ;AC3IQ;EAEQ,aAAA;AD4IhB;ACvII;EAEQ,eAAA;ADwIZ;AC1II;EAKQ,cAAA;ADwIZ;ACpII;EAEQ,qCAAA;UAAA,6BAAA;ADqIZ;AClIQ;EAAA;IAEQ,UAAA;EDoId;ECtIM;IAKQ,UAAA;EDoId;ECjIU;IAEQ,UAAA;EDkIlB;ECpIU;IAKQ,UAAA;EDkIlB;AACF;AC7HI;EAEQ,cAAA;AD8HZ;AC1HI;;;;EAIQ,oCAAA;UAAA,4BAAA;AD4HZ;ACxHI;EACI,YAAA;AD0HR;AC3HI;EAIQ,UAAA;EACA,2BAAA;AD0HZ;AC/HI;EAQQ,UAAA;EACA,2BAAA;AD0HZ;ACvHI;EAEQ,UAAA;ADwHZ;AC1HI;EAKQ,UAAA;ADwHZ;ACrHI;EAKI,sBAAA;EACA,uBAAA;ADuHR;AC7HI;EACI,eAAA;EACA,eAAA;EACA,OAAA;EACA,MAAA;ADyHR;ACrHI;;;;;EAOY,aAAA;ADqHhB;AC5HI;EAUY,gBAAA;EACA,qBAAA;ADqHhB;AChII;EAgBQ,aAAA;ADmHZ;AChHQ;EAEQ,aAAA;ADiHhB;ACtII;EA0BQ,cAAA;AD+GZ;ACzGA;EACI,eAAA;EACA,MAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;AD2GJ;AElSA;EACI,aAAA;AFoSJ;AEjSA;EACI,oBAAA;EACA,iCAAA;AFmSJ;AEhSA;EACI,gBAAA;AFkSJ;AG9SA;EACI,kBAAA;EACA,OAAA;EACA,QAAA;EACA,MAAA;EACA,SAAA;EACA,eAAA;EACA,WAAA;EACA,oBAAA;AHgTJ;AGxTA;EAUQ,kBAAA;EACA,QAAA;EACA,SAAA;EACA,uBAAA;EACA,YAAA;EACA,WAAA;EACA,aAAA;EACA,sBAAA;EACA,8BAAA;EACA,kBAAA;EACA,UAAA;EACA,oBAAA;AHiTR;AGhTQ;EACI,yCAAA;UAAA,iCAAA;AHkTZ;AGhTQ;EACI;IACI,UAAA;IACA,mBAAA;EHkTd;EGhTU;IACI,UAAA;IACA,mBAAA;EHkTd;AACF;AG1TQ;EACI;IACI,UAAA;IACA,mBAAA;EHkTd;EGhTU;IACI,UAAA;IACA,mBAAA;EHkTd;AACF;AGnVA;EAqCQ,kBAAA;EACA,QAAA;EACA,gBAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,iBAAA;EACA,kDAAA;UAAA,0CAAA;AHiTR;AG7VA;EA+CQ,aAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,uBAAA;EACA,YAAA;EACA,WAAA;EACA,oBAAA;AHiTR;AGvWA;EAwDY,aAAA;AHkTZ;AG1WA;EA2DY,+DAAA;UAAA,uDAAA;EACA,UAAA;EACA,yBAAA;AHkTZ;AI/WC;EDgEmB,6BAAA;UAAA,qBAAA;AHkTpB;AIlXC;EDgEmB,6BAAA;UAAA,qBAAA;AHqTpB;AIrXC;EDgEmB,6BAAA;UAAA,qBAAA;AHwTpB;AIxXC;EDgEmB,6BAAA;UAAA,qBAAA;AH2TpB;AI3XC;EDgEmB,6BAAA;UAAA,qBAAA;AH8TpB;AI9XC;EDgEmB,6BAAA;UAAA,qBAAA;AHiUpB;AIjYC;EDgEmB,6BAAA;UAAA,qBAAA;AHoUpB;AGhUQ;EACI;IACI,YAAA;IACA,0BAAA;EHkUd;EGhUU;IACI,aAAA;IACA,0BAAA;EHkUd;EGhUU;IACI,aAAA;IACA,4BAAA;EHkUd;AACF;AG9UQ;EACI;IACI,YAAA;IACA,0BAAA;EHkUd;EGhUU;IACI,aAAA;IACA,0BAAA;EHkUd;EGhUU;IACI,aAAA;IACA,4BAAA;EHkUd;AACF;AKlZA;EACI,mEAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,SAAA;EACA,yBAAA;ALoZJ;AKjZA;EACI,kBAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,YAAA;EACA,eAAA;EACA,yBAAA;KAAA,sBAAA;UAAA,iBAAA;EACA,yBAAA;ALmZJ;AKlZI;EAEQ,aAAA;ALmZZ;AKrZI;EAKQ,cAAA;ALmZZ;AKjaA;EAkBQ,cAAA;EACA,eAAA;EACA,kBAAA;EACA,YAAA;EACA,wBAAA;EACA,WAAA;ALkZR;AKjZQ;EAEQ,mBAAA;ALkZhB;AKpZQ;EAKQ,cAAA;EACA,UAAA;EACA,2BAAA;EACA,QAAA;EACA,WAAA;ALkZhB;AKnbA;EAqCY,WAAA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;EACA,sBAAA;EACA,kBAAA;EACA,2BAAA;EACA,gCAAA;ALiZZ;AKhZY;EAEQ,cAAA;ALiZpB;AK/YgB;EACI,UAAA;ALiZpB;AK/YgB;EACI,UAAA;ALiZpB;AKxcA;EA2DgB,aAAA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;EACA,gBAAA;EACA,qCAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,mBAAA;EACA,2BAAA;ALgZhB;AKrdA;EAyEY,kBAAA;EACA,gBAAA;EACA,oBAAA;EACA,aAAA;EACA,6BAAA;AL+YZ;AK5dA;EAgFY,kBAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,oBAAA;AL+YZ;AKneA;EA0FY,kBAAA;EACA,SAAA;EACA,UAAA;EACA,kBAAA;EACA,gBAAA;EACA,qCAAA;EACA,WAAA;EACA,eAAA;EACA,kBAAA;EACA,UAAA;EACA,oCAAA;EACA,iBAAA;EACA,kBAAA;EACA,UAAA;EACA,oBAAA;AL4YZ;AK7ZY;EACI,UAAA;AL+ZhB;AKvfA;EA2GY,kBAAA;EACA,WAAA;EACA,WAAA;EACA,oCAAA;EACA,eAAA;AL+YZ;AK9fA;EAiHgB,kBAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,oCAAA;EACA,WAAA;EACA,yBAAA;EACA,kBAAA;ALgZhB;AKxgBA;EA2HgB,kBAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,WAAA;EACA,kBAAA;ALgZhB;AKhhBA;EAkIoB,kBAAA;EACA,MAAA;EACA,UAAA;EACA,gBAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,gCAAA;EACA,mBAAA;ALiZpB;AK7hBA;EAkJQ,YAAA;EACA,kBAAA;EACA,SAAA;AL8YR;AK7YQ;EACI,aAAA;EACA,kBAAA;EACA,gCAAA;EACA,UAAA;EACA,YAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;EACA,WAAA;AL+YZ;AKxZQ;EAWQ,YAAA;ALgZhB;AK3ZQ;EAcQ,kBAAA;EACA,OAAA;EACA,MAAA;ALgZhB;AKhaQ;EAmBQ,kBAAA;EACA,QAAA;EACA,MAAA;ALgZhB;AKraQ;EAwBQ,kBAAA;EACA,iCAAA;EACA,YAAA;EACA,OAAA;EACA,uCAAA;EACA,kBAAA;EACA,uBAAA;EACA,eAAA;EACA,YAAA;EACA,gCAAA;EACA,mBAAA;ALgZhB;AK/YgB;EACI,mBAAA;ALiZpB;AKrbQ;EAuCY,aAAA;ALiZpB;AKxbQ;EA0CY,eAAA;ALiZpB;AK3bQ;EA6CY,eAAA;EACA,WAAA;EACA,iBAAA;ALiZpB;AKhcQ;EAkDY,YAAA;ALiZpB;AKncQ;EAoDgB,kBAAA;ALkZxB;AK/YwB;EAEQ,0BAAA;ALgZhC;AK7YwB;EAEQ,0BAAA;AL8YhC;AK5cQ;EAmEgB,UAAA;EACA,gBAAA;EACA,iBAAA;EACA,qBAAA;EACA,eAAA;EACA,WAAA;EACA,sBAAA;EACA,kBAAA;EACA,sBAAA;EACA,kBAAA;EACA,eAAA;AL4YxB;AKzdQ;EAgFgB,mBAAA;EACA,cAAA;AL4YxB;AK7dQ;EAqFY,YAAA;AL2YpB;AKheQ;EAuFgB,YAAA;EACA,YAAA;EACA,qBAAA;AL4YxB;AKreQ;EA4FgB,WAAA;EACA,YAAA;EACA,qBAAA;EACA,kBAAA;EACA,sBAAA;EACA,eAAA;AL4YxB;AK3YwB;EACI,kDAAA;UAAA,0CAAA;AL6Y5B;AKhfQ;EAyGQ,aAAA;EACA,YAAA;EACA,iBAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;EACA,kBAAA;EACA,gBAAA;EACA,SAAA;EACA,YAAA;EACA,sBAAA;EACA,WAAA;EACA,WAAA;AL0YhB;AKzYgB;EACI,WAAA;EACA,YAAA;AL2YpB;AK7YgB;EACI,WAAA;EACA,YAAA;AL2YpB;AKzYgB;EACI,aAAA;AL2YpB;AKvYQ;EAEQ,YAAA;ALwYhB;AKrYQ;EACI,WAAA;ALuYZ;AKxYQ;EAGQ,YAAA;ALwYhB;AKpqBA;;EAiSY,iBAAA;EACA,WAAA;EACA,uCAAA;EACA,sBAAA;EACA,eAAA;EACA,eAAA;ALuYZ;AK7qBA;EAySY,qBAAA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;EACA,iBAAA;EACA,WAAA;EACA,kBAAA;ALuYZ;AKtrBA;EAkTY,WAAA;EACA,YAAA;EACA,YAAA;EACA,6BAAA;EACA,aAAA;EACA,eAAA;EACA,sBAAA;EACA,sBAAA;EACA,qBAAA;ALuYZ;AKjsBA;EA4TgB,gCAAA;EACA,YAAA;ALwYhB;AKtYY;EAEQ,UAAA;ALuYpB;AKpYY;EACI,WAAA;EACA,WAAA;EACA,iBAAA;EACA,eAAA;ALsYhB;AKpYY;EACI,qBAAA;ALsYhB;AKpYY;EACI,kBAAA;ALsYhB;AKpYY;EACI,WAAA;ALsYhB;AKvtBA;EAqVY,kBAAA;EACA,qBAAA;EACA,eAAA;EACA,YAAA;ALqYZ;AKpYY;EAEQ,WAAA;ALqYpB;AKvYY;EAKQ,mBAAA;ALqYpB;AKlYY;EAEQ,WAAA;ALmYpB;AKrYY;EAKQ,mBAAA;ALmYpB;AKzuBA;EA0WgB,qBAAA;EACA,qBAAA;EACA,sBAAA;EACA,YAAA;ALkYhB;AK/uBA;EA+WoB,kBAAA;EACA,SAAA;EACA,QAAA;EACA,WAAA;EACA,gBAAA;EACA,gCAAA;ALmYpB;AKvvBA;EAsXwB,kBAAA;EACA,SAAA;EACA,OAAA;EACA,YAAA;EACA,yBAAA;EACA,kBAAA;ALoYxB;AK/vBA;EA6X4B,kBAAA;EACA,MAAA;EACA,UAAA;EACA,gBAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,gCAAA;EACA,mBAAA;ALqY5B;AK5wBA;EA8YY,qBAAA;EACA,YAAA;ALiYZ;AKhxBA;EAkZY,qBAAA;EACA,YAAA;ALiYZ;AKpxBA;EAqZgB,kBAAA;EACA,QAAA;EACA,YAAA;EACA,mBAAA;EACA,0BAAA;EAAA,uBAAA;EAAA,kBAAA;EACA,gBAAA;EACA,gBAAA;EACA,kBAAA;EACA,iCAAA;EACA,cAAA;EACA,gCAAA;EACA,cAAA;EACA,UAAA;ALkYhB;AKjYgB;EACI,cAAA;ALmYpB;AKjYgB;EACI,mBAAA;ALmYpB;AKzyBA;EA0agB,YAAA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;EACA,kBAAA;ALkYhB;AKjYgB;EACI,0CAAA;ALmYpB;AKnzBA;EAqbY,qBAAA;EACA,YAAA;ALiYZ;AKvzBA;EAwbgB,kBAAA;EACA,QAAA;EACA,YAAA;EACA,mBAAA;EACA,YAAA;EACA,kBAAA;EACA,iCAAA;EACA,cAAA;EACA,gCAAA;EACA,gBAAA;EACA,UAAA;ALkYhB;AKjYgB;EACI,aAAA;ALmYpB;AKlYoB;EACI,cAAA;ALoYxB;AKjYgB;EACI,mBAAA;ALmYpB;AKjYgB;EACI,WAAA;EACA,kBAAA;ALmYpB;AKjYgB;EAEQ,aAAA;ALkYxB;AKpYgB;EAKQ,cAAA;ALkYxB;AKv1BA;;EA2dgB,YAAA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;EACA,kBAAA;ALgYhB;AK/XgB;;EACI,0CAAA;ALkYpB;AKn2BA;EAqegB,cAAA;ALiYhB;AKt2BA;EAueoB,eAAA;EACA,eAAA;ALkYpB;AKhYgB;EAEQ,aAAA;ALiYxB;AKnYgB;EAKQ,qBAAA;ALiYxB;AK9XgB;EAEQ,aAAA;AL+XxB;AKjYgB;EAKQ,qBAAA;AL+XxB;AKt3BA;EA2foB,eAAA;EACA,sBAAA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;EACA,WAAA;AL8XpB;AK93BA;EAkgBwB,kBAAA;EACA,UAAA;EACA,WAAA;EACA,WAAA;EACA,gBAAA;EACA,gCAAA;AL+XxB;AKt4BA;EAygB4B,kBAAA;EACA,SAAA;EACA,OAAA;EACA,YAAA;EACA,yBAAA;EACA,gBAAA;EACA,kBAAA;ALgY5B;AK/4BA;EAihBgC,kBAAA;EACA,MAAA;EACA,UAAA;EACA,gBAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,gCAAA;EACA,gBAAA;ALiYhC;AK55BA;EAmiBY,qBAAA;EACA,YAAA;EACA,kBAAA;AL4XZ;AK3XY;EAEQ,cAAA;AL4XpB;AKp6BA;EA4iBgB,kBAAA;EACA,UAAA;EACA,UAAA;EACA,aAAA;AL2XhB;AK16BA;EAmjBY,kBAAA;EACA,qBAAA;EACA,YAAA;EACA,UAAA;AL0XZ;AKzXY;EAEQ,cAAA;AL0XpB;AK5XY;EAKQ,cAAA;AL0XpB;AKt7BA;EAgkBgB,aAAA;EACA,kBAAA;EACA,YAAA;EACA,WAAA;EACA,WAAA;EACA,oBAAA;ALyXhB;AK97BA;EAwkBgB,aAAA;EACA,eAAA;EACA,WAAA;EACA,kBAAA;EACA,iCAAA;EACA,cAAA;EACA,gCAAA;EACA,gBAAA;EACA,WAAA;EACA,kBAAA;ALyXhB;AK18BA;EAolBgB,YAAA;EACA,sBAAA;EACA,eAAA;EACA,iBAAA;ALyXhB;AKxXgB;EACI,0CAAA;AL0XpB;AKn9BA;EA8lBY,qBAAA;EACA,YAAA;ALwXZ;AKv9BA;EAkmBY,WAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;EACA,mBAAA;ALwXZ;AK99BA;EAymBY,WAAA;EACA,YAAA;EACA,kBAAA;EACA,YAAA;EACA,sBAAA;EACA,kBAAA;EACA,QAAA;EACA,WAAA;ALwXZ;AKx+BA;EAknBgB,aAAA;EACA,YAAA;EACA,aAAA;ALyXhB;AK7+BA;EAunBgB,qBAAA;EACA,kBAAA;EACA,iCAAA;EACA,yBAAA;EACA,YAAA;EACA,WAAA;EACA,mBAAA;EACA,sBAAA;EACA,eAAA;EACA,4BAAA;ALyXhB;AKz/BA;EAmoBgB,WAAA;EACA,kBAAA;EACA,cAAA;EACA,YAAA;EACA,WAAA;EACA,MAAA;EACA,OAAA;EACA,mBAAA;EACA,4BAAA;ALyXhB;AKpgCA;EA8oBgB,WAAA;EACA,kBAAA;EACA,cAAA;EACA,OAAA;EACA,MAAA;EACA,mBAAA;EACA,gBAAA;EACA,4BAAA;EACA,wCAAA;EACA,YAAA;EACA,WAAA;ALyXhB;AKjhCA;EA2pBgB,sCAAA;ALyXhB;AKphCA;EA8pBgB,WAAA;EACA,oCAAA;ALyXhB;AKxhCA;EAkqBgB,UAAA;ALyXhB;AKnXA;EACI,aAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,6BAAA;EACA,aAAA;EACA,eAAA;EACA,sBAAA;EAEA,SAAA;EACA,YAAA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,gCAAA;ALoXJ;AMpjCA;EACI,kBAAA;EACA,OAAA;EACA,QAAA;EACA,MAAA;EACA,SAAA;EACA,eAAA;EACA,WAAA;ANsjCJ;AM7jCA;EASQ,qBAAA;EACA,oBAAA;EACA,yBAAA;KAAA,sBAAA;UAAA,iBAAA;EACA,eAAA;EACA,mBAAA;EACA,iDAAA;ANujCR;AMtjCQ;EACI,kBAAA;EACA,kBAAA;ANwjCZ;AMzkCA;EAqBQ,kBAAA;EACA,QAAA;EACA,2BAAA;ANujCR;AMtjCQ;EACI,sBAAA;EACA,iCAAA;UAAA,yBAAA;EACA,yCAAA;UAAA,iCAAA;EACA,oCAAA;UAAA,4BAAA;ANwjCZ;AMrjCI;EACI;IACI,2BAAA;ENujCV;AACF;AM1jCI;EACI;IACI,2BAAA;ENujCV;AACF;AMzlCA;;EAsCQ,kBAAA;EACA,WAAA;EACA,kBAAA;EACA,kBAAA;ANujCR;AMtjCQ;;EACI,uBAAA;EACA,wCAAA;UAAA,gCAAA;EACA,yCAAA;UAAA,iCAAA;EACA,oCAAA;UAAA,4BAAA;ANyjCZ;AMtjCI;EACI;IACI,mBAAA;ENwjCV;EMtjCM;IACI,mBAAA;ENwjCV;AACF;AM9jCI;EACI;IACI,mBAAA;ENwjCV;EMtjCM;IACI,mBAAA;ENwjCV;AACF;AO/mCA;EACI,oBAAA;EACA,kBAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,gBAAA;APinCJ;AOvnCA;EAQQ,eAAA;EACA,gBAAA;EACA,gBAAA;APknCR;AQ5nCA;EACI,kBAAA;EACA,YAAA;EACA,kBAAA;EACA,kCAAA;EACA,cAAA;EACA,gBAAA;EACA,UAAA;EACA,aAAA;AR8nCJ;AQ7nCI;EACI,cAAA;AR+nCR;AQzoCA;EAaQ,YAAA;EACA,sBAAA;EACA,eAAA;AR+nCR;AQ9nCQ;EACI,0CAAA;ARgoCZ;AQjpCA;EAqBY,eAAA;EACA,iBAAA;EACA,WAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;EACA,WAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,gBAAA;AR+nCZ;AQ9nCY;EACI,qBAAA;ARgoChB;ASjqCA;EACI,kBAAA;EACA,YAAA;EACA,UAAA;ATmqCJ;AStqCA;EAMQ,kBAAA;EACA,iCAAA;EACA,gCAAA;EACA,gBAAA;EACA,WAAA;EACA,cAAA;EACA,oBAAA;EACA,kDAAA;UAAA,0CAAA;ATmqCR;AShrCA;EAiBQ,oDAAA;UAAA,4CAAA;ATkqCR;AS9pCA;EACI;IACI,UAAA;IACA,YAAA;IACA,aAAA;ETgqCN;ES9pCE;IACI,iBAAA;IACA,eAAA;IACA,eAAA;ETgqCN;AACF;AS1qCA;EACI;IACI,UAAA;IACA,YAAA;IACA,aAAA;ETgqCN;ES9pCE;IACI,iBAAA;IACA,eAAA;IACA,eAAA;ETgqCN;AACF;AS7pCA;EACI;IACI,iBAAA;IACA,eAAA;IACA,eAAA;ET+pCN;ES7pCE;IACI,eAAA;ET+pCN;ES7pCE;IACI,YAAA;IACA,iBAAA;ET+pCN;ES7pCE;IACI,UAAA;IACA,aAAA;IACA,YAAA;ET+pCN;AACF;AShrCA;EACI;IACI,iBAAA;IACA,eAAA;IACA,eAAA;ET+pCN;ES7pCE;IACI,eAAA;ET+pCN;ES7pCE;IACI,YAAA;IACA,iBAAA;ET+pCN;ES7pCE;IACI,UAAA;IACA,aAAA;IACA,YAAA;ET+pCN;AACF;AUltCA;EACI,kBAAA;EACA,YAAA;EACA,UAAA;EACA,QAAA;EACA,kBAAA;EACA,WAAA;EACA,iDAAA;EACA,eAAA;AVotCJ;AUntCI;EACI,aAAA;AVqtCR;AI/tCA;EACI,kBAAA;EACA,MAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,UAAA;EACA,aAAA;AJiuCJ;AIhuCI;EACI,cAAA;AJkuCR;AI9tCA;EACI,kBAAA;EACA,gBAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;AJguCJ;AIruCA;EAOQ,WAAA;EACA,YAAA;EACA,aAAA;AJiuCR;AI1uCA;EAYQ,cAAA;AJiuCR;AI7uCA;EAeQ,aAAA;AJiuCR;AW7vCA;EACI,kBAAA;EACA,SAAA;EACA,UAAA;EACA,YAAA;EACA,iCAAA;EACA,aAAA;EACA,WAAA;EACA,eAAA;EACA,kBAAA;AX+vCJ;AW7vCI;EACI,aAAA;AX+vCR;AW3wCA;EAgBQ,eAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;AX8vCR;AW1vCQ;EACI,qBAAA;EACA,sBAAA;EACA,iBAAA;EACA,mBAAA;EACA,uBAAA;EACA,gBAAA;AX4vCZ;AWzxCA;EAkCQ,YAAA;EACA,iBAAA;EACA,kBAAA;AX0vCR;AW9xCA;EAwCQ,YAAA;AXyvCR",sourcesContent:[`@keyframes my-face {
    2% {
        transform: translate(0, 1.5px) rotate(1.5deg);
    }
    4% {
        transform: translate(0, -1.5px) rotate(-0.5deg);
    }
    6% {
        transform: translate(0, 1.5px) rotate(-1.5deg);
    }
    8% {
        transform: translate(0, -1.5px) rotate(-1.5deg);
    }
    10% {
        transform: translate(0, 2.5px) rotate(1.5deg);
    }
    12% {
        transform: translate(0, -0.5px) rotate(1.5deg);
    }
    14% {
        transform: translate(0, -1.5px) rotate(1.5deg);
    }
    16% {
        transform: translate(0, -0.5px) rotate(-1.5deg);
    }
    18% {
        transform: translate(0, 0.5px) rotate(-1.5deg);
    }
    20% {
        transform: translate(0, -1.5px) rotate(2.5deg);
    }
    22% {
        transform: translate(0, 0.5px) rotate(-1.5deg);
    }
    24% {
        transform: translate(0, 1.5px) rotate(1.5deg);
    }
    26% {
        transform: translate(0, 0.5px) rotate(0.5deg);
    }
    28% {
        transform: translate(0, 0.5px) rotate(1.5deg);
    }
    30% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    32% {
        transform: translate(0, 1.5px) rotate(-0.5deg);
    }
    34% {
        transform: translate(0, 1.5px) rotate(-0.5deg);
    }
    36% {
        transform: translate(0, -1.5px) rotate(2.5deg);
    }
    38% {
        transform: translate(0, 1.5px) rotate(-1.5deg);
    }
    40% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    42% {
        transform: translate(0, 2.5px) rotate(-1.5deg);
    }
    44% {
        transform: translate(0, 1.5px) rotate(0.5deg);
    }
    46% {
        transform: translate(0, -1.5px) rotate(2.5deg);
    }
    48% {
        transform: translate(0, -0.5px) rotate(0.5deg);
    }
    50% {
        transform: translate(0, 0.5px) rotate(0.5deg);
    }
    52% {
        transform: translate(0, 2.5px) rotate(2.5deg);
    }
    54% {
        transform: translate(0, -1.5px) rotate(1.5deg);
    }
    56% {
        transform: translate(0, 2.5px) rotate(2.5deg);
    }
    58% {
        transform: translate(0, 0.5px) rotate(2.5deg);
    }
    60% {
        transform: translate(0, 2.5px) rotate(2.5deg);
    }
    62% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    64% {
        transform: translate(0, -0.5px) rotate(1.5deg);
    }
    66% {
        transform: translate(0, 1.5px) rotate(-0.5deg);
    }
    68% {
        transform: translate(0, -1.5px) rotate(-0.5deg);
    }
    70% {
        transform: translate(0, 1.5px) rotate(0.5deg);
    }
    72% {
        transform: translate(0, 2.5px) rotate(1.5deg);
    }
    74% {
        transform: translate(0, -0.5px) rotate(0.5deg);
    }
    76% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    78% {
        transform: translate(0, -0.5px) rotate(1.5deg);
    }
    80% {
        transform: translate(0, 1.5px) rotate(1.5deg);
    }
    82% {
        transform: translate(0, -0.5px) rotate(0.5deg);
    }
    84% {
        transform: translate(0, 1.5px) rotate(2.5deg);
    }
    86% {
        transform: translate(0, -1.5px) rotate(-1.5deg);
    }
    88% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    90% {
        transform: translate(0, 2.5px) rotate(-0.5deg);
    }
    92% {
        transform: translate(0, 0.5px) rotate(-0.5deg);
    }
    94% {
        transform: translate(0, 2.5px) rotate(0.5deg);
    }
    96% {
        transform: translate(0, -0.5px) rotate(1.5deg);
    }
    98% {
        transform: translate(0, -1.5px) rotate(-0.5deg);
    }
    0%,
    100% {
        transform: translate(0, 0) rotate(0deg);
    }
}`,`@import '../../node_modules/balloon-css/balloon.css';
@keyframes my-face {
  2% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  4% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  6% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  8% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  10% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  12% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  14% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  16% {
    transform: translate(0, -0.5px) rotate(-1.5deg);
  }
  18% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  20% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  22% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  24% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  26% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  28% {
    transform: translate(0, 0.5px) rotate(1.5deg);
  }
  30% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  32% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  34% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  36% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  38% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  40% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  42% {
    transform: translate(0, 2.5px) rotate(-1.5deg);
  }
  44% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  46% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  48% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  50% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  52% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  54% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  56% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  58% {
    transform: translate(0, 0.5px) rotate(2.5deg);
  }
  60% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  62% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  64% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  66% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  68% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  70% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  72% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  74% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  76% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  78% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  80% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  82% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  84% {
    transform: translate(0, 1.5px) rotate(2.5deg);
  }
  86% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  88% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  90% {
    transform: translate(0, 2.5px) rotate(-0.5deg);
  }
  92% {
    transform: translate(0, 0.5px) rotate(-0.5deg);
  }
  94% {
    transform: translate(0, 2.5px) rotate(0.5deg);
  }
  96% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  98% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}
.dplayer {
  position: relative;
  overflow: hidden;
  user-select: none;
  line-height: 1;
}
.dplayer * {
  box-sizing: content-box;
}
.dplayer svg {
  width: 100%;
  height: 100%;
}
.dplayer svg path,
.dplayer svg circle {
  fill: #fff;
}
.dplayer:-webkit-full-screen {
  width: 100%;
  height: 100%;
  background: #000;
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  transform: translate(0, 0);
}
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-showdan,
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-danmaku,
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-danunlimit {
  display: none;
}
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-comment {
  display: none;
}
.dplayer.dplayer-no-danmaku .dplayer-danmaku {
  display: none;
}
.dplayer.dplayer-live .dplayer-time {
  display: none;
}
.dplayer.dplayer-live .dplayer-bar-wrap {
  display: none;
}
.dplayer.dplayer-live .dplayer-setting-speed {
  display: none;
}
.dplayer.dplayer-live .dplayer-setting-loop {
  display: none;
}
.dplayer.dplayer-live.dplayer-no-danmaku .dplayer-setting {
  display: none;
}
.dplayer.dplayer-arrow .dplayer-danmaku {
  font-size: 18px;
}
.dplayer.dplayer-arrow .dplayer-icon {
  margin: 0 -3px;
}
.dplayer.dplayer-playing .dplayer-danmaku .dplayer-danmaku-move {
  animation-play-state: running;
}
@media (min-width: 900px) {
  .dplayer.dplayer-playing .dplayer-controller-mask {
    opacity: 0;
  }
  .dplayer.dplayer-playing .dplayer-controller {
    opacity: 0;
  }
  .dplayer.dplayer-playing:hover .dplayer-controller-mask {
    opacity: 1;
  }
  .dplayer.dplayer-playing:hover .dplayer-controller {
    opacity: 1;
  }
}
.dplayer.dplayer-loading .dplayer-bezel .diplayer-loading-icon {
  display: block;
}
.dplayer.dplayer-loading .dplayer-danmaku,
.dplayer.dplayer-paused .dplayer-danmaku,
.dplayer.dplayer-loading .dplayer-danmaku-move,
.dplayer.dplayer-paused .dplayer-danmaku-move {
  animation-play-state: paused;
}
.dplayer.dplayer-hide-controller {
  cursor: none;
}
.dplayer.dplayer-hide-controller .dplayer-controller-mask {
  opacity: 0;
  transform: translateY(100%);
}
.dplayer.dplayer-hide-controller .dplayer-controller {
  opacity: 0;
  transform: translateY(100%);
}
.dplayer.dplayer-show-controller .dplayer-controller-mask {
  opacity: 1;
}
.dplayer.dplayer-show-controller .dplayer-controller {
  opacity: 1;
}
.dplayer.dplayer-fulled {
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
  width: 100% !important;
  height: 100% !important;
}
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-volume,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-camera-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-airplay-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-chromecast-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-play-icon {
  display: none;
}
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon {
  position: static;
  display: inline-block;
}
.dplayer.dplayer-mobile .dplayer-bar-time {
  display: none;
}
.dplayer.dplayer-mobile.dplayer-hide-controller .dplayer-mobile-play {
  display: none;
}
.dplayer.dplayer-mobile .dplayer-mobile-play {
  display: block;
}
.dplayer-web-fullscreen-fix {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}
[data-balloon]:before {
  display: none;
}
[data-balloon]:after {
  padding: 0.3em 0.7em;
  background: rgba(17, 17, 17, 0.7);
}
[data-balloon][data-balloon-pos="up"]:after {
  margin-bottom: 0;
}
.dplayer-bezel {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 22px;
  color: #fff;
  pointer-events: none;
}
.dplayer-bezel .dplayer-bezel-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -26px 0 0 -26px;
  height: 52px;
  width: 52px;
  padding: 12px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}
.dplayer-bezel .dplayer-bezel-icon.dplayer-bezel-transition {
  animation: bezel-hide 0.5s linear;
}
@keyframes bezel-hide {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
}
.dplayer-bezel .dplayer-danloading {
  position: absolute;
  top: 50%;
  margin-top: -7px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  animation: my-face 5s infinite ease-in-out;
}
.dplayer-bezel .diplayer-loading-icon {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -18px 0 0 -18px;
  height: 36px;
  width: 36px;
  pointer-events: none;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-hide {
  display: none;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot {
  animation: diplayer-loading-dot-fade 0.8s ease infinite;
  opacity: 0;
  transform-origin: 4px 4px;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-1 {
  animation-delay: 0.1s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-2 {
  animation-delay: 0.2s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-3 {
  animation-delay: 0.3s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-4 {
  animation-delay: 0.4s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-5 {
  animation-delay: 0.5s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-6 {
  animation-delay: 0.6s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-7 {
  animation-delay: 0.7s;
}
@keyframes diplayer-loading-dot-fade {
  0% {
    opacity: 0.7;
    transform: scale(1.2, 1.2);
  }
  50% {
    opacity: 0.25;
    transform: scale(0.9, 0.9);
  }
  to {
    opacity: 0.25;
    transform: scale(0.85, 0.85);
  }
}
.dplayer-controller-mask {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom;
  height: 98px;
  width: 100%;
  position: absolute;
  bottom: 0;
  transition: all 0.3s ease;
}
.dplayer-controller {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 41px;
  padding: 0 20px;
  user-select: none;
  transition: all 0.3s ease;
}
.dplayer-controller.dplayer-controller-comment .dplayer-icons {
  display: none;
}
.dplayer-controller.dplayer-controller-comment .dplayer-icons.dplayer-comment-box {
  display: block;
}
.dplayer-controller .dplayer-bar-wrap {
  padding: 5px 0;
  cursor: pointer;
  position: absolute;
  bottom: 33px;
  width: calc(100% - 40px);
  height: 3px;
}
.dplayer-controller .dplayer-bar-wrap:hover .dplayer-bar .dplayer-played .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-bar-wrap:hover .dplayer-highlight {
  display: block;
  width: 8px;
  transform: translateX(-4px);
  top: 4px;
  height: 40%;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight {
  z-index: 12;
  position: absolute;
  top: 5px;
  width: 6px;
  height: 20%;
  border-radius: 6px;
  background-color: #fff;
  text-align: center;
  transform: translateX(-3px);
  transition: all 0.2s ease-in-out;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover .dplayer-highlight-text {
  display: block;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover ~ .dplayer-bar-preview {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover ~ .dplayer-bar-time {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight .dplayer-highlight-text {
  display: none;
  position: absolute;
  left: 50%;
  top: -24px;
  padding: 5px 8px;
  background-color: rgba(0, 0, 0, 0.62);
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  transform: translateX(-50%);
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-preview {
  position: absolute;
  background: #fff;
  pointer-events: none;
  display: none;
  background-size: 16000px 100%;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-preview-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time {
  position: absolute;
  left: 0px;
  top: -20px;
  border-radius: 4px;
  padding: 5px 7px;
  background-color: rgba(0, 0, 0, 0.62);
  color: #fff;
  font-size: 12px;
  text-align: center;
  opacity: 1;
  transition: opacity 0.1s ease-in-out;
  word-wrap: normal;
  word-break: normal;
  z-index: 2;
  pointer-events: none;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time.hidden {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar {
  position: relative;
  height: 3px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-loaded {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.4);
  height: 3px;
  transition: all 0.5s ease;
  will-change: width;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-played {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: 3px;
  will-change: width;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-played .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons {
  height: 38px;
  position: absolute;
  bottom: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box {
  display: none;
  position: absolute;
  transition: all 0.3s ease-in-out;
  z-index: 2;
  height: 38px;
  bottom: 0;
  left: 20px;
  right: 20px;
  color: #fff;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-icon {
  padding: 7px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-icon {
  position: absolute;
  left: 0;
  top: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-send-icon {
  position: absolute;
  right: 0;
  top: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box {
  position: absolute;
  background: rgba(28, 28, 28, 0.9);
  bottom: 41px;
  left: 0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 10px 10px 16px;
  font-size: 14px;
  width: 204px;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box.dplayer-comment-setting-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box input[type=radio] {
  display: none;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box label {
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-title {
  font-size: 13px;
  color: #fff;
  line-height: 30px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type {
  font-size: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type .dplayer-comment-setting-title {
  margin-bottom: 6px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type label:nth-child(2) span {
  border-radius: 4px 0 0 4px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type label:nth-child(4) span {
  border-radius: 0 4px 4px 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type span {
  width: 33%;
  padding: 4px 6px;
  line-height: 16px;
  display: inline-block;
  font-size: 12px;
  color: #fff;
  border: 1px solid #fff;
  margin-right: -1px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type input:checked + span {
  background: #E4E4E6;
  color: #1c1c1c;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color {
  font-size: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color label {
  font-size: 0;
  padding: 6px;
  display: inline-block;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color span {
  width: 22px;
  height: 22px;
  display: inline-block;
  border-radius: 50%;
  box-sizing: border-box;
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color span:hover {
  animation: my-face 5s infinite ease-in-out;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input {
  outline: none;
  border: none;
  padding: 8px 31px;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  border-radius: 4px;
  background: none;
  margin: 0;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  color: #fff;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::placeholder {
  color: #fff;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::-ms-clear {
  display: none;
}
.dplayer-controller .dplayer-icons.dplayer-icons-left .dplayer-icon {
  padding: 7px;
}
.dplayer-controller .dplayer-icons.dplayer-icons-right {
  right: 20px;
}
.dplayer-controller .dplayer-icons.dplayer-icons-right .dplayer-icon {
  padding: 8px;
}
.dplayer-controller .dplayer-icons .dplayer-time,
.dplayer-controller .dplayer-icons .dplayer-live-badge {
  line-height: 38px;
  color: #eee;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  vertical-align: middle;
  font-size: 13px;
  cursor: default;
}
.dplayer-controller .dplayer-icons .dplayer-live-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  vertical-align: 4%;
  margin-right: 5px;
  content: '';
  border-radius: 6px;
}
.dplayer-controller .dplayer-icons .dplayer-icon {
  width: 40px;
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  vertical-align: middle;
  box-sizing: border-box;
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-icon .dplayer-icon-content {
  transition: all 0.2s ease-in-out;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons .dplayer-icon:hover .dplayer-icon-content {
  opacity: 1;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-quality-icon {
  color: #fff;
  width: auto;
  line-height: 22px;
  font-size: 14px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-comment-icon {
  padding: 10px 9px 9px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-setting-icon {
  padding-top: 8.5px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-volume-icon {
  width: 43px;
}
.dplayer-controller .dplayer-icons .dplayer-volume {
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-volume:hover .dplayer-volume-bar-wrap .dplayer-volume-bar {
  width: 45px;
}
.dplayer-controller .dplayer-icons .dplayer-volume:hover .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-volume.dplayer-volume-active .dplayer-volume-bar-wrap .dplayer-volume-bar {
  width: 45px;
}
.dplayer-controller .dplayer-icons .dplayer-volume.dplayer-volume-active .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap {
  display: inline-block;
  margin: 0 10px 0 -5px;
  vertical-align: middle;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar {
  position: relative;
  top: 17px;
  width: 0;
  height: 3px;
  background: #aaa;
  transition: all 0.3s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  transition: all 0.1s ease;
  will-change: width;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons .dplayer-subtitle-btn {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box {
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: scale(0);
  width: fit-content;
  max-width: 240px;
  min-width: 120px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 7px 0;
  transition: all 0.3s ease-in-out;
  overflow: auto;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box.dplayer-subtitles-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box.dplayer-subtitles-box-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-item {
  height: 30px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-setting {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box {
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: scale(0);
  width: 150px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 7px 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box > div {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box > div.dplayer-setting-origin-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-narrow {
  width: 70px;
  text-align: center;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-speed .dplayer-setting-origin-panel {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-speed .dplayer-setting-speed-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-item,
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-speed-item {
  height: 30px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-item:hover,
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-speed-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku {
  padding: 5px 0;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-label {
  padding: 0 10px;
  display: inline;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku:hover .dplayer-label {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku:hover .dplayer-danmaku-bar-wrap {
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku.dplayer-setting-danmaku-active .dplayer-label {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku.dplayer-setting-danmaku-active .dplayer-danmaku-bar-wrap {
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap {
  padding: 0 10px;
  box-sizing: border-box;
  display: none;
  vertical-align: middle;
  height: 100%;
  width: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar {
  position: relative;
  top: 8.5px;
  width: 100%;
  height: 3px;
  background: #fff;
  transition: all 0.3s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar .dplayer-danmaku-bar-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  transition: all 0.1s ease;
  background: #aaa;
  will-change: width;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar .dplayer-danmaku-bar-inner .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: #aaa;
}
.dplayer-controller .dplayer-icons .dplayer-full {
  display: inline-block;
  height: 100%;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-full:hover .dplayer-full-in-icon {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon {
  position: absolute;
  top: -30px;
  z-index: 1;
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-quality {
  position: relative;
  display: inline-block;
  height: 100%;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-quality:hover .dplayer-quality-list {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-quality:hover .dplayer-quality-mask {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-mask {
  display: none;
  position: absolute;
  bottom: 38px;
  left: -18px;
  width: 80px;
  padding-bottom: 12px;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-list {
  display: none;
  font-size: 12px;
  width: 80px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 5px 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  color: #fff;
  text-align: center;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-item {
  height: 25px;
  box-sizing: border-box;
  cursor: pointer;
  line-height: 25px;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-comment {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-label {
  color: #eee;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
}
.dplayer-controller .dplayer-icons .dplayer-toggle {
  width: 32px;
  height: 20px;
  text-align: center;
  font-size: 0;
  vertical-align: middle;
  position: absolute;
  top: 5px;
  right: 10px;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input {
  max-height: 0;
  max-width: 0;
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label {
  display: inline-block;
  position: relative;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border: 1px solid #dfdfdf;
  height: 20px;
  width: 32px;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label:before {
  content: "";
  position: absolute;
  display: block;
  height: 18px;
  width: 18px;
  top: 0;
  left: 0;
  border-radius: 15px;
  transition: 0.2s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label:after {
  content: "";
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  border-radius: 15px;
  background: #fff;
  transition: 0.2s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  height: 18px;
  width: 18px;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label {
  border-color: rgba(255, 255, 255, 0.5);
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label:before {
  width: 30px;
  background: rgba(255, 255, 255, 0.5);
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label:after {
  left: 12px;
}
.dplayer-mobile-play {
  display: none;
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  bottom: 0;
  opacity: 0.8;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.dplayer-danmaku {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 22px;
  color: #fff;
}
.dplayer-danmaku .dplayer-danmaku-item {
  display: inline-block;
  pointer-events: none;
  user-select: none;
  cursor: default;
  white-space: nowrap;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
}
.dplayer-danmaku .dplayer-danmaku-item--demo {
  position: absolute;
  visibility: hidden;
}
.dplayer-danmaku .dplayer-danmaku-right {
  position: absolute;
  right: 0;
  transform: translateX(100%);
}
.dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
  will-change: transform;
  animation-name: 'danmaku';
  animation-timing-function: linear;
  animation-play-state: paused;
}
@keyframes danmaku {
  from {
    transform: translateX(100%);
  }
}
.dplayer-danmaku .dplayer-danmaku-top,
.dplayer-danmaku .dplayer-danmaku-bottom {
  position: absolute;
  width: 100%;
  text-align: center;
  visibility: hidden;
}
.dplayer-danmaku .dplayer-danmaku-top.dplayer-danmaku-move,
.dplayer-danmaku .dplayer-danmaku-bottom.dplayer-danmaku-move {
  will-change: visibility;
  animation-name: 'danmaku-center';
  animation-timing-function: linear;
  animation-play-state: paused;
}
@keyframes danmaku-center {
  from {
    visibility: visible;
  }
  to {
    visibility: visible;
  }
}
.dplayer-logo {
  pointer-events: none;
  position: absolute;
  left: 20px;
  top: 20px;
  max-width: 50px;
  max-height: 50px;
}
.dplayer-logo img {
  max-width: 100%;
  max-height: 100%;
  background: none;
}
.dplayer-menu {
  position: absolute;
  width: 170px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.85);
  padding: 5px 0;
  overflow: hidden;
  z-index: 3;
  display: none;
}
.dplayer-menu.dplayer-menu-show {
  display: block;
}
.dplayer-menu .dplayer-menu-item {
  height: 30px;
  box-sizing: border-box;
  cursor: pointer;
}
.dplayer-menu .dplayer-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-menu .dplayer-menu-item a {
  padding: 0 10px;
  line-height: 30px;
  color: #eee;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dplayer-menu .dplayer-menu-item a:hover {
  text-decoration: none;
}
.dplayer-notice-list {
  position: absolute;
  bottom: 60px;
  left: 20px;
}
.dplayer-notice-list .dplayer-notice {
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  color: #fff;
  display: table;
  pointer-events: none;
  animation: showNotice 0.3s ease 1 forwards;
}
.dplayer-notice-list .remove-notice {
  animation: removeNotice 0.3s ease 1 forwards;
}
@keyframes showNotice {
  from {
    padding: 0;
    font-size: 0;
    margin-top: 0;
  }
  to {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
}
@keyframes removeNotice {
  0% {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
  20% {
    font-size: 12px;
  }
  21% {
    font-size: 0;
    padding: 7px 10px;
  }
  100% {
    padding: 0;
    margin-top: 0;
    font-size: 0;
  }
}
.dplayer-subtitle {
  position: absolute;
  bottom: 40px;
  width: 90%;
  left: 5%;
  text-align: center;
  color: #fff;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
  font-size: 20px;
}
.dplayer-subtitle.dplayer-subtitle-hide {
  display: none;
}
.dplayer-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: none;
}
.dplayer-mask.dplayer-mask-show {
  display: block;
}
.dplayer-video-wrap {
  position: relative;
  background: #000;
  font-size: 0;
  width: 100%;
  height: 100%;
}
.dplayer-video-wrap .dplayer-video {
  width: 100%;
  height: 100%;
  display: none;
}
.dplayer-video-wrap .dplayer-video-current {
  display: block;
}
.dplayer-video-wrap .dplayer-video-prepare {
  display: none;
}
.dplayer-info-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 400px;
  background: rgba(28, 28, 28, 0.8);
  padding: 10px;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
.dplayer-info-panel-hide {
  display: none;
}
.dplayer-info-panel .dplayer-info-panel-close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
}
.dplayer-info-panel .dplayer-info-panel-item > span {
  display: inline-block;
  vertical-align: middle;
  line-height: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dplayer-info-panel .dplayer-info-panel-item-title {
  width: 100px;
  text-align: right;
  margin-right: 10px;
}
.dplayer-info-panel .dplayer-info-panel-item-data {
  width: 260px;
}
`,`.dplayer {
    position: relative;
    overflow: hidden;
    user-select: none;
    line-height: 1;

    * {
        box-sizing: content-box;
    }

    svg {
        width: 100%;
        height: 100%;

        path,
        circle {
            fill: #fff;
        }
    }

    &:-webkit-full-screen {
        width: 100%;
        height: 100%;
        background: #000;
        position: fixed;
        z-index: 100000;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        transform: translate(0, 0);
        
    }

    &.dplayer-no-danmaku {
        .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box {
            .dplayer-setting-showdan,
            .dplayer-setting-danmaku,
            .dplayer-setting-danunlimit {
                display: none;
            }
        }

        .dplayer-controller .dplayer-icons .dplayer-comment {
            display: none;
        }

        .dplayer-danmaku {
            display: none;
        }
    }

    &.dplayer-live {
        .dplayer-time {
            display: none;
        }
        .dplayer-bar-wrap {
            display: none;
        }
        .dplayer-setting-speed {
            display: none;
        }
        .dplayer-setting-loop {
            display: none;
        }

        &.dplayer-no-danmaku {
            .dplayer-setting {
                display: none;
            }
        }
    }

    &.dplayer-arrow {
        .dplayer-danmaku {
            font-size: 18px;
        }
        .dplayer-icon {
            margin: 0 -3px;
        }
    }

    &.dplayer-playing {
        .dplayer-danmaku .dplayer-danmaku-move {
            animation-play-state: running;
        }

        @media (min-width: 900px) {
            .dplayer-controller-mask {
                opacity: 0;
            }
            .dplayer-controller {
                opacity: 0;
            }

            &:hover {
                .dplayer-controller-mask {
                    opacity: 1;
                }
                .dplayer-controller {
                    opacity: 1;
                }
            }
        }
    }

    &.dplayer-loading {
        .dplayer-bezel .diplayer-loading-icon {
            display: block;
        }
    }

    &.dplayer-loading,
    &.dplayer-paused {
        .dplayer-danmaku,
        .dplayer-danmaku-move {
            animation-play-state: paused;
        }
    }

    &.dplayer-hide-controller {
        cursor: none;

        .dplayer-controller-mask {
            opacity: 0;
            transform: translateY(100%);
        }
        .dplayer-controller {
            opacity: 0;
            transform: translateY(100%);
        }
    }
    &.dplayer-show-controller {
        .dplayer-controller-mask {
            opacity: 1;
        }
        .dplayer-controller {
            opacity: 1;
        }
    }
    &.dplayer-fulled {
        position: fixed;
        z-index: 100000;
        left: 0;
        top: 0;
        width: 100% !important;
        height: 100% !important;
    }
    &.dplayer-mobile {
        .dplayer-controller .dplayer-icons {
            .dplayer-volume,
            .dplayer-camera-icon,
            .dplayer-airplay-icon,
            .dplayer-chromecast-icon,
            .dplayer-play-icon {
                display: none;
            }
            .dplayer-full .dplayer-full-in-icon {
                position: static;
                display: inline-block;
            }
        }

        .dplayer-bar-time {
            display: none;
        }

        &.dplayer-hide-controller {
            .dplayer-mobile-play {
                display: none;
            }
        }

        .dplayer-mobile-play {
            display: block;
        }
    }
}

// To hide scroll bar, apply this class to <body>
.dplayer-web-fullscreen-fix {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
}
`,`@import '../../node_modules/balloon-css/balloon.css';

[data-balloon]:before {
    display: none;
}

[data-balloon]:after {
    padding: 0.3em 0.7em;
    background: rgba(17, 17, 17, 0.7);
}

[data-balloon][data-balloon-pos="up"]:after {
    margin-bottom: 0;
}`,`.dplayer-bezel {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 22px;
    color: #fff;
    pointer-events: none;
    .dplayer-bezel-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -26px 0 0 -26px;
        height: 52px;
        width: 52px;
        padding: 12px;
        box-sizing: border-box;
        background: rgba(0, 0, 0, .5);
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        &.dplayer-bezel-transition {
            animation: bezel-hide .5s linear;
        }
        @keyframes bezel-hide {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(2);
            }
        }
    }
    .dplayer-danloading {
        position: absolute;
        top: 50%;
        margin-top: -7px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        line-height: 14px;
        animation: my-face 5s infinite ease-in-out;
    }
    .diplayer-loading-icon {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -18px 0 0 -18px;
        height: 36px;
        width: 36px;
        pointer-events: none;
        .diplayer-loading-hide {
            display: none;
        }
        .diplayer-loading-dot {
            animation: diplayer-loading-dot-fade .8s ease infinite;
            opacity: 0;
            transform-origin: 4px 4px;
            each(range(7), {
                &.diplayer-loading-dot-@{value} {
                    animation-delay: (@value * 0.1s);
                }
            });
        }
        @keyframes diplayer-loading-dot-fade {
            0% {
                opacity: .7;
                transform: scale(1.2, 1.2)
            }
            50% {
                opacity: .25;
                transform: scale(.9, .9)
            }
            to {
                opacity: .25;
                transform: scale(.85, .85)
            }
        }
    }
}`,`.dplayer-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: none;
    &.dplayer-mask-show {
        display: block;
    }
}

.dplayer-video-wrap {
    position: relative;
    background: #000;
    font-size: 0;
    width: 100%;
    height: 100%;
    .dplayer-video {
        width: 100%;
        height: 100%;
        display: none;
    }
    .dplayer-video-current {
        display: block;
    }
    .dplayer-video-prepare {
        display: none;
    }
}`,`.dplayer-controller-mask {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom;
    height: 98px;
    width: 100%;
    position: absolute;
    bottom: 0;
    transition: all 0.3s ease;
}

.dplayer-controller {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 41px;
    padding: 0 20px;
    user-select: none;
    transition: all 0.3s ease;
    &.dplayer-controller-comment {
        .dplayer-icons {
            display: none;
        }
        .dplayer-icons.dplayer-comment-box {
            display: block;
        }
    }
    .dplayer-bar-wrap {
        padding: 5px 0;
        cursor: pointer;
        position: absolute;
        bottom: 33px;
        width: calc(100% - 40px);
        height: 3px;
        &:hover {
            .dplayer-bar .dplayer-played .dplayer-thumb {
                transform: scale(1);
            }
            .dplayer-highlight {
                display: block;
                width: 8px;
                transform: translateX(-4px);
                top: 4px;
                height: 40%;
            }
        }
        .dplayer-highlight {
            z-index: 12;
            position: absolute;
            top: 5px;
            width: 6px;
            height: 20%;
            border-radius: 6px;
            background-color: #fff;
            text-align: center;
            transform: translateX(-3px);
            transition: all .2s ease-in-out;
            &:hover {
                .dplayer-highlight-text {
                    display: block;
                }
                &~.dplayer-bar-preview {
                    opacity: 0;
                }
                &~.dplayer-bar-time {
                    opacity: 0;
                }
            }
            .dplayer-highlight-text {
                display: none;
                position: absolute;
                left: 50%;
                top: -24px;
                padding: 5px 8px;
                background-color: rgba(0, 0, 0, .62);
                color: #fff;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                transform: translateX(-50%);
            }
        }
        .dplayer-bar-preview {
            position: absolute;
            background: #fff;
            pointer-events: none;
            display: none;
            background-size: 16000px 100%;
        }
        .dplayer-bar-preview-canvas {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        }
        .dplayer-bar-time {
            &.hidden {
                opacity: 0;
            }
            position: absolute;
            left: 0px;
            top: -20px;
            border-radius: 4px;
            padding: 5px 7px;
            background-color: rgba(0, 0, 0, 0.62);
            color: #fff;
            font-size: 12px;
            text-align: center;
            opacity: 1;
            transition: opacity .1s ease-in-out;
            word-wrap: normal;
            word-break: normal;
            z-index: 2;
            pointer-events: none;
        }
        .dplayer-bar {
            position: relative;
            height: 3px;
            width: 100%;
            background: rgba(255, 255, 255, .2);
            cursor: pointer;
            .dplayer-loaded {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                background: rgba(255, 255, 255, .4);
                height: 3px;
                transition: all 0.5s ease;
                will-change: width;
            }
            .dplayer-played {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                height: 3px;
                will-change: width;
                .dplayer-thumb {
                    position: absolute;
                    top: 0;
                    right: 5px;
                    margin-top: -4px;
                    margin-right: -10px;
                    height: 11px;
                    width: 11px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                    transform: scale(0);
                }
            }
        }
    }
    .dplayer-icons {
        height: 38px;
        position: absolute;
        bottom: 0;
        &.dplayer-comment-box {
            display: none;
            position: absolute;
            transition: all .3s ease-in-out;
            z-index: 2;
            height: 38px;
            bottom: 0;
            left: 20px;
            right: 20px;
            color: #fff;
            .dplayer-icon {
                padding: 7px;
            }
            .dplayer-comment-setting-icon {
                position: absolute;
                left: 0;
                top: 0;
            }
            .dplayer-send-icon {
                position: absolute;
                right: 0;
                top: 0;
            }
            .dplayer-comment-setting-box {
                position: absolute;
                background: rgba(28, 28, 28, 0.9);
                bottom: 41px;
                left: 0;
                box-shadow: 0 0 25px rgba(0, 0, 0, .3);
                border-radius: 4px;
                padding: 10px 10px 16px;
                font-size: 14px;
                width: 204px;
                transition: all .3s ease-in-out;
                transform: scale(0);
                &.dplayer-comment-setting-open {
                    transform: scale(1);
                }
                input[type=radio] {
                    display: none;
                }
                label {
                    cursor: pointer;
                }
                .dplayer-comment-setting-title {
                    font-size: 13px;
                    color: #fff;
                    line-height: 30px;
                }
                .dplayer-comment-setting-type {
                    font-size: 0;
                    .dplayer-comment-setting-title {
                        margin-bottom: 6px;
                    }
                    label {
                        &:nth-child(2) {
                            span {
                                border-radius: 4px 0 0 4px;
                            }
                        }
                        &:nth-child(4) {
                            span {
                                border-radius: 0 4px 4px 0;
                            }
                        }
                    }
                    span {
                        width: 33%;
                        padding: 4px 6px;
                        line-height: 16px;
                        display: inline-block;
                        font-size: 12px;
                        color: #fff;
                        border: 1px solid #fff;
                        margin-right: -1px;
                        box-sizing: border-box;
                        text-align: center;
                        cursor: pointer;
                    }
                    input:checked+span {
                        background: #E4E4E6;
                        color: #1c1c1c;
                    }
                }
                .dplayer-comment-setting-color {
                    font-size: 0;
                    label {
                        font-size: 0;
                        padding: 6px;
                        display: inline-block;
                    }
                    span {
                        width: 22px;
                        height: 22px;
                        display: inline-block;
                        border-radius: 50%;
                        box-sizing: border-box;
                        cursor: pointer;
                        &:hover {
                            animation: my-face 5s infinite ease-in-out;
                        }
                    }
                }
            }
            .dplayer-comment-input {
                outline: none;
                border: none;
                padding: 8px 31px;
                font-size: 14px;
                line-height: 18px;
                text-align: center;
                border-radius: 4px;
                background: none;
                margin: 0;
                height: 100%;
                box-sizing: border-box;
                width: 100%;
                color: #fff;
                &::placeholder {
                    color: #fff;
                    opacity: 0.8;
                }
                &::-ms-clear {
                    display: none;
                }
            }
        }
        &.dplayer-icons-left {
            .dplayer-icon {
                padding: 7px;
            }
        }
        &.dplayer-icons-right {
            right: 20px;
            .dplayer-icon {
                padding: 8px;
            }
        }
        .dplayer-time,
        .dplayer-live-badge {
            line-height: 38px;
            color: #eee;
            text-shadow: 0 0 2px rgba(0, 0, 0, .5);
            vertical-align: middle;
            font-size: 13px;
            cursor: default;
        }
        .dplayer-live-dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            vertical-align: 4%;
            margin-right: 5px;
            content: '';
            border-radius: 6px;
        }
        .dplayer-icon {
            width: 40px;
            height: 100%;
            border: none;
            background-color: transparent;
            outline: none;
            cursor: pointer;
            vertical-align: middle;
            box-sizing: border-box;
            display: inline-block;
            .dplayer-icon-content {
                transition: all .2s ease-in-out;
                opacity: .8;
            }
            &:hover {
                .dplayer-icon-content {
                    opacity: 1;
                }
            }
            &.dplayer-quality-icon {
                color: #fff;
                width: auto;
                line-height: 22px;
                font-size: 14px;
            }
            &.dplayer-comment-icon {
                padding: 10px 9px 9px;
            }
            &.dplayer-setting-icon {
                padding-top: 8.5px;
            }
            &.dplayer-volume-icon {
                width: 43px;
            }
        }
        .dplayer-volume {
            position: relative;
            display: inline-block;
            cursor: pointer;
            height: 100%;
            &:hover {
                .dplayer-volume-bar-wrap .dplayer-volume-bar {
                    width: 45px;
                }
                .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
                    transform: scale(1);
                }
            }
            &.dplayer-volume-active {
                .dplayer-volume-bar-wrap .dplayer-volume-bar {
                    width: 45px;
                }
                .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
                    transform: scale(1);
                }
            }
            .dplayer-volume-bar-wrap {
                display: inline-block;
                margin: 0 10px 0 -5px;
                vertical-align: middle;
                height: 100%;
                .dplayer-volume-bar {
                    position: relative;
                    top: 17px;
                    width: 0;
                    height: 3px;
                    background: #aaa;
                    transition: all 0.3s ease-in-out;
                    .dplayer-volume-bar-inner {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        height: 100%;
                        transition: all 0.1s ease;
                        will-change: width;
                        .dplayer-thumb {
                            position: absolute;
                            top: 0;
                            right: 5px;
                            margin-top: -4px;
                            margin-right: -10px;
                            height: 11px;
                            width: 11px;
                            border-radius: 50%;
                            cursor: pointer;
                            transition: all .3s ease-in-out;
                            transform: scale(0);
                        }
                    }
                }
            }
        }
        .dplayer-subtitle-btn {
            display: inline-block;
            height: 100%;
        }
        .dplayer-subtitles {
            display: inline-block;
            height: 100%;
            .dplayer-subtitles-box {
                position: absolute;
                right: 0;
                bottom: 50px;
                transform: scale(0);
                width: fit-content;
                max-width: 240px;
                min-width: 120px;
                border-radius: 2px;
                background: rgba(28, 28, 28, 0.9);
                padding: 7px 0;
                transition: all .3s ease-in-out;
                overflow: auto;
                z-index: 2;
                &.dplayer-subtitles-panel {
                    display: block;
                }
                &.dplayer-subtitles-box-open {
                    transform: scale(1);
                }
            }
            .dplayer-subtitles-item {
                height: 30px;
                padding: 5px 10px;
                box-sizing: border-box;
                cursor: pointer;
                position: relative;
                &:hover {
                    background-color: rgba(255, 255, 255, .1);
                }
            }
        }
        .dplayer-setting {
            display: inline-block;
            height: 100%;
            .dplayer-setting-box {
                position: absolute;
                right: 0;
                bottom: 50px;
                transform: scale(0);
                width: 150px;
                border-radius: 2px;
                background: rgba(28, 28, 28, 0.9);
                padding: 7px 0;
                transition: all .3s ease-in-out;
                overflow: hidden;
                z-index: 2;
                &>div {
                    display: none;
                    &.dplayer-setting-origin-panel {
                        display: block;
                    }
                }
                &.dplayer-setting-box-open {
                    transform: scale(1);
                }
                &.dplayer-setting-box-narrow {
                    width: 70px;
                    text-align: center;
                }
                &.dplayer-setting-box-speed {
                    .dplayer-setting-origin-panel {
                        display: none;
                    }
                    .dplayer-setting-speed-panel {
                        display: block;
                    }
                }
            }
            .dplayer-setting-item,
            .dplayer-setting-speed-item {
                height: 30px;
                padding: 5px 10px;
                box-sizing: border-box;
                cursor: pointer;
                position: relative;
                &:hover {
                    background-color: rgba(255, 255, 255, .1);
                }
            }
            .dplayer-setting-danmaku {
                padding: 5px 0;
                .dplayer-label {
                    padding: 0 10px;
                    display: inline;
                }
                &:hover {
                    .dplayer-label {
                        display: none;
                    }
                    .dplayer-danmaku-bar-wrap {
                        display: inline-block;
                    }
                }
                &.dplayer-setting-danmaku-active {
                    .dplayer-label {
                        display: none;
                    }
                    .dplayer-danmaku-bar-wrap {
                        display: inline-block;
                    }
                }
                .dplayer-danmaku-bar-wrap {
                    padding: 0 10px;
                    box-sizing: border-box;
                    display: none;
                    vertical-align: middle;
                    height: 100%;
                    width: 100%;
                    .dplayer-danmaku-bar {
                        position: relative;
                        top: 8.5px;
                        width: 100%;
                        height: 3px;
                        background: #fff;
                        transition: all 0.3s ease-in-out;
                        .dplayer-danmaku-bar-inner {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            height: 100%;
                            transition: all 0.1s ease;
                            background: #aaa;
                            will-change: width;
                            .dplayer-thumb {
                                position: absolute;
                                top: 0;
                                right: 5px;
                                margin-top: -4px;
                                margin-right: -10px;
                                height: 11px;
                                width: 11px;
                                border-radius: 50%;
                                cursor: pointer;
                                transition: all .3s ease-in-out;
                                background: #aaa;
                            }
                        }
                    }
                }
            }
        }
        .dplayer-full {
            display: inline-block;
            height: 100%;
            position: relative;
            &:hover {
                .dplayer-full-in-icon {
                    display: block;
                }
            }
            .dplayer-full-in-icon {
                position: absolute;
                top: -30px;
                z-index: 1;
                display: none;
            }
        }
        .dplayer-quality {
            position: relative;
            display: inline-block;
            height: 100%;
            z-index: 2;
            &:hover {
                .dplayer-quality-list {
                    display: block;
                }
                .dplayer-quality-mask {
                    display: block;
                }
            }
            .dplayer-quality-mask {
                display: none;
                position: absolute;
                bottom: 38px;
                left: -18px;
                width: 80px;
                padding-bottom: 12px;
            }
            .dplayer-quality-list {
                display: none;
                font-size: 12px;
                width: 80px;
                border-radius: 2px;
                background: rgba(28, 28, 28, 0.9);
                padding: 5px 0;
                transition: all .3s ease-in-out;
                overflow: hidden;
                color: #fff;
                text-align: center;
            }
            .dplayer-quality-item {
                height: 25px;
                box-sizing: border-box;
                cursor: pointer;
                line-height: 25px;
                &:hover {
                    background-color: rgba(255, 255, 255, .1);
                }
            }
        }
        .dplayer-comment {
            display: inline-block;
            height: 100%;
        }
        .dplayer-label {
            color: #eee;
            font-size: 13px;
            display: inline-block;
            vertical-align: middle;
            white-space: nowrap;
        }
        .dplayer-toggle {
            width: 32px;
            height: 20px;
            text-align: center;
            font-size: 0;
            vertical-align: middle;
            position: absolute;
            top: 5px;
            right: 10px;
            input {
                max-height: 0;
                max-width: 0;
                display: none;
            }
            input+label {
                display: inline-block;
                position: relative;
                box-shadow: rgb(223, 223, 223) 0 0 0 0 inset;
                border: 1px solid rgb(223, 223, 223);
                height: 20px;
                width: 32px;
                border-radius: 10px;
                box-sizing: border-box;
                cursor: pointer;
                transition: .2s ease-in-out;
            }
            input+label:before {
                content: "";
                position: absolute;
                display: block;
                height: 18px;
                width: 18px;
                top: 0;
                left: 0;
                border-radius: 15px;
                transition: .2s ease-in-out;
            }
            input+label:after {
                content: "";
                position: absolute;
                display: block;
                left: 0;
                top: 0;
                border-radius: 15px;
                background: #fff;
                transition: .2s ease-in-out;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
                height: 18px;
                width: 18px;
            }
            input:checked+label {
                border-color: rgba(255, 255, 255, 0.5);
            }
            input:checked+label:before {
                width: 30px;
                background: rgba(255, 255, 255, 0.5);
            }
            input:checked+label:after {
                left: 12px;
            }
        }
    }
}

.dplayer-mobile-play {
    display: none;
    width: 50px;
    height: 50px;
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    opacity: 0.8;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}`,`.dplayer-danmaku {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 22px;
    color: #fff;
    .dplayer-danmaku-item {
        display: inline-block;
        pointer-events: none;
        user-select: none;
        cursor: default;
        white-space: nowrap;
        text-shadow: .5px .5px .5px rgba(0, 0, 0, .5);
        &--demo {
            position: absolute;
            visibility: hidden;
        }
    }
    .dplayer-danmaku-right {
        position: absolute;
        right: 0;
        transform: translateX(100%);
        &.dplayer-danmaku-move {
            will-change: transform;
            animation-name: 'danmaku';
            animation-timing-function: linear;
            animation-play-state: paused;
        }
    }
    @keyframes danmaku {
        from {
            transform: translateX(100%);
        }
    }
    .dplayer-danmaku-top,
    .dplayer-danmaku-bottom {
        position: absolute;
        width: 100%;
        text-align: center;
        visibility: hidden;
        &.dplayer-danmaku-move {
            will-change: visibility;
            animation-name: 'danmaku-center';
            animation-timing-function: linear;
            animation-play-state: paused;
        }
    }
    @keyframes danmaku-center {
        from {
            visibility: visible;
        }
        to {
            visibility: visible;
        }
    }
}`,`.dplayer-logo {
    pointer-events: none;
    position: absolute;
    left: 20px;
    top: 20px;
    max-width: 50px;
    max-height: 50px;
    img {
        max-width: 100%;
        max-height: 100%;
        background: none;
    }
}`,`.dplayer-menu {
    position: absolute;
    width: 170px;
    border-radius: 2px;
    background: rgba(28, 28, 28, 0.85);
    padding: 5px 0;
    overflow: hidden;
    z-index: 3;
    display: none;
    &.dplayer-menu-show {
        display: block;
    }
    .dplayer-menu-item {
        height: 30px;
        box-sizing: border-box;
        cursor: pointer;
        &:hover {
            background-color: rgba(255, 255, 255, .1);
        }
        a {
            display: inline-block;
            padding: 0 10px;
            line-height: 30px;
            color: #eee;
            font-size: 13px;
            display: inline-block;
            vertical-align: middle;
            width: 100%;
            box-sizing: border-box;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            &:hover {
                text-decoration: none;
            }
        }
    }
}`,`.dplayer-notice-list{
    position: absolute;
    bottom: 60px;
    left: 20px;

    .dplayer-notice {
        border-radius: 2px;
        background: rgba(28, 28, 28, 0.9);
        transition: all .3s ease-in-out;
        overflow: hidden;
        color: #fff;
        display: table;
        pointer-events: none;
        animation: showNotice .3s ease 1 forwards;
    }

    .remove-notice{
        animation: removeNotice .3s ease 1 forwards;
    }
}

@keyframes showNotice {
    from {
        padding: 0;
        font-size: 0;
        margin-top: 0;
    }
    to {
        padding: 7px 20px;
        font-size: 14px;
        margin-top: 5px;
    }
}

@keyframes removeNotice {
    0%{
        padding: 7px 20px;
        font-size: 14px;
        margin-top: 5px;
    }
    20%{
        font-size: 12px;
    }
    21%{
        font-size: 0;
        padding: 7px 10px;
    }
    100%{
        padding: 0;
        margin-top: 0;
        font-size: 0;
    }
}
`,`.dplayer-subtitle {
    position: absolute;
    bottom: 40px;
    width: 90%;
    left: 5%;
    text-align: center;
    color: #fff;
    text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
    font-size: 20px;
    &.dplayer-subtitle-hide {
        display: none;
    }
}`,`.dplayer-info-panel {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 400px;
    background: rgba(28, 28, 28, 0.8);
    padding: 10px;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;

    &-hide {
        display: none;
    }

    .dplayer-info-panel-close {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .dplayer-info-panel-item {
        & > span {
            display: inline-block;
            vertical-align: middle;
            line-height: 15px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

    .dplayer-info-panel-item-title {
        width: 100px;
        text-align: right;
        margin-right: 10px;
    }
    
    .dplayer-info-panel-item-data {
        width: 260px;
    }
}`],sourceRoot:""}]);const b=h},9624:i=>{var l=[];function s(f){for(var d=-1,m=0;m<l.length;m++)if(l[m].identifier===f){d=m;break}return d}function c(f,d){for(var m={},y=[],g=0;g<f.length;g++){var A=f[g],h=d.base?A[0]+d.base:A[0],p=m[h]||0,b="".concat(h," ").concat(p);m[h]=p+1;var v=s(b),x={css:A[1],media:A[2],sourceMap:A[3],supports:A[4],layer:A[5]};if(v!==-1)l[v].references++,l[v].updater(x);else{var _=u(x,d);d.byIndex=g,l.splice(g,0,{identifier:b,updater:_,references:1})}y.push(b)}return y}function u(f,d){var m=d.domAPI(d);return m.update(f),function(y){if(y){if(y.css===f.css&&y.media===f.media&&y.sourceMap===f.sourceMap&&y.supports===f.supports&&y.layer===f.layer)return;m.update(f=y)}else m.remove()}}i.exports=function(f,d){var m=c(f=f||[],d=d||{});return function(y){y=y||[];for(var g=0;g<m.length;g++){var A=s(m[g]);l[A].references--}for(var h=c(y,d),p=0;p<m.length;p++){var b=s(m[p]);l[b].references===0&&(l[b].updater(),l.splice(b,1))}m=h}}},6892:i=>{var l={};i.exports=function(s,c){var u=function(f){if(l[f]===void 0){var d=document.querySelector(f);if(window.HTMLIFrameElement&&d instanceof window.HTMLIFrameElement)try{d=d.contentDocument.head}catch{d=null}l[f]=d}return l[f]}(s);if(!u)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");u.appendChild(c)}},2716:i=>{i.exports=function(l){var s=document.createElement("style");return l.setAttributes(s,l.attributes),l.insert(s,l.options),s}},6359:(i,l,s)=>{i.exports=function(c){var u=s.nc;u&&c.setAttribute("nonce",u)}},6990:i=>{i.exports=function(l){var s=l.insertStyleElement(l);return{update:function(c){(function(u,f,d){var m="";d.supports&&(m+="@supports (".concat(d.supports,") {")),d.media&&(m+="@media ".concat(d.media," {"));var y=d.layer!==void 0;y&&(m+="@layer".concat(d.layer.length>0?" ".concat(d.layer):""," {")),m+=d.css,y&&(m+="}"),d.media&&(m+="}"),d.supports&&(m+="}");var g=d.sourceMap;g&&typeof btoa<"u"&&(m+=`
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(g))))," */")),f.styleTagTransform(m,u,f.options)})(s,l,c)},remove:function(){(function(c){if(c.parentNode===null)return!1;c.parentNode.removeChild(c)})(s)}}}},230:i=>{i.exports=function(l,s){if(s.styleSheet)s.styleSheet.cssText=l;else{for(;s.firstChild;)s.removeChild(s.firstChild);s.appendChild(document.createTextNode(l))}}},6251:i=>{i.exports='<svg viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg"><path d="M288 90v96c0 20-16 36-36 36h-10c-16 0-16-24 0-24h10c7 0 12-5 12-12V90c0-7-5-12-12-12H36c-7 0-12 5-12 12v96c0 7 5 12 12 12h10c16 0 16 24 0 24H36c-20 0-36-16-36-36V90c0-20 16-36 36-36h216c20 0 36 16 36 36zm-120 62l48 68c14 20 1 38-20 38H92c-21 0-34-18-20-38l48-68c13-18 35-18 48 0z"></path></svg>'},8113:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M16 23c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zM16 13c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zM27 28h-22c-1.654 0-3-1.346-3-3v-16c0-1.654 1.346-3 3-3h3c0.552 0 1 0.448 1 1s-0.448 1-1 1h-3c-0.551 0-1 0.449-1 1v16c0 0.552 0.449 1 1 1h22c0.552 0 1-0.448 1-1v-16c0-0.551-0.448-1-1-1h-11c-0.552 0-1-0.448-1-1s0.448-1 1-1h11c1.654 0 3 1.346 3 3v16c0 1.654-1.346 3-3 3zM24 10.5c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5zM15 4c0 0.552-0.448 1-1 1h-4c-0.552 0-1-0.448-1-1v0c0-0.552 0.448-1 1-1h4c0.552 0 1 0.448 1 1v0z"></path></svg>'},3193:i=>{i.exports='<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="chromecast" class="svg-inline--fa fa-chromecast fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M447.8,64H64c-23.6,0-42.7,19.1-42.7,42.7v63.9H64v-63.9h383.8v298.6H298.6V448H448c23.6,0,42.7-19.1,42.7-42.7V106.7 C490.7,83.1,471.4,64,447.8,64z M21.3,383.6L21.3,383.6l0,63.9h63.9C85.2,412.2,56.6,383.6,21.3,383.6L21.3,383.6z M21.3,298.6V341 c58.9,0,106.6,48.1,106.6,107h42.7C170.7,365.6,103.7,298.7,21.3,298.6z M213.4,448h42.7c-0.5-129.5-105.3-234.3-234.8-234.6l0,42.4 C127.3,255.6,213.3,342,213.4,448z"></path></svg>'},338:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.090 0.131h-22.731c-2.354 0-4.262 1.839-4.262 4.109v16.401c0 2.269 1.908 4.109 4.262 4.109h4.262v-2.706h8.469l-8.853 8.135 1.579 1.451 7.487-6.88h9.787c2.353 0 4.262-1.84 4.262-4.109v-16.401c0-2.27-1.909-4.109-4.262-4.109v0zM28.511 19.304c0 1.512-1.272 2.738-2.841 2.738h-8.425l-0.076-0.070-0.076 0.070h-11.311c-1.569 0-2.841-1.226-2.841-2.738v-13.696c0-1.513 1.272-2.739 2.841-2.739h19.889c1.569 0 2.841-0.142 2.841 1.37v15.064z"></path></svg>'},2807:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.128 0.38h-22.553c-2.336 0-4.229 1.825-4.229 4.076v16.273c0 2.251 1.893 4.076 4.229 4.076h4.229v-2.685h8.403l-8.784 8.072 1.566 1.44 7.429-6.827h9.71c2.335 0 4.229-1.825 4.229-4.076v-16.273c0-2.252-1.894-4.076-4.229-4.076zM28.538 19.403c0 1.5-1.262 2.717-2.819 2.717h-8.36l-0.076-0.070-0.076 0.070h-11.223c-1.557 0-2.819-1.217-2.819-2.717v-13.589c0-1.501 1.262-2.718 2.819-2.718h19.734c1.557 0 2.819-0.141 2.819 1.359v14.947zM9.206 10.557c-1.222 0-2.215 0.911-2.215 2.036s0.992 2.035 2.215 2.035c1.224 0 2.216-0.911 2.216-2.035s-0.992-2.036-2.216-2.036zM22.496 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.224 0 2.215-0.911 2.215-2.035s-0.991-2.036-2.215-2.036zM15.852 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.222 0 2.215-0.911 2.215-2.035s-0.992-2.036-2.215-2.036z"></path></svg>'},1415:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M24.965 24.38h-18.132c-1.366 0-2.478-1.113-2.478-2.478v-11.806c0-1.364 1.111-2.478 2.478-2.478h18.132c1.366 0 2.478 1.113 2.478 2.478v11.806c0 1.364-1.11 2.478-2.478 2.478zM6.833 10.097v11.806h18.134l-0.002-11.806h-18.132zM2.478 28.928h5.952c0.684 0 1.238-0.554 1.238-1.239 0-0.684-0.554-1.238-1.238-1.238h-5.952v-5.802c0-0.684-0.554-1.239-1.238-1.239s-1.239 0.556-1.239 1.239v5.802c0 1.365 1.111 2.478 2.478 2.478zM30.761 19.412c-0.684 0-1.238 0.554-1.238 1.238v5.801h-5.951c-0.686 0-1.239 0.554-1.239 1.238 0 0.686 0.554 1.239 1.239 1.239h5.951c1.366 0 2.478-1.111 2.478-2.478v-5.801c0-0.683-0.554-1.238-1.239-1.238zM0 5.55v5.802c0 0.683 0.554 1.238 1.238 1.238s1.238-0.555 1.238-1.238v-5.802h5.952c0.684 0 1.238-0.554 1.238-1.238s-0.554-1.238-1.238-1.238h-5.951c-1.366-0.001-2.478 1.111-2.478 2.476zM32 11.35v-5.801c0-1.365-1.11-2.478-2.478-2.478h-5.951c-0.686 0-1.239 0.554-1.239 1.238s0.554 1.238 1.239 1.238h5.951v5.801c0 0.683 0.554 1.237 1.238 1.237 0.686 0.002 1.239-0.553 1.239-1.236z"></path></svg>'},4574:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M6.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v4h4c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333zM30.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h4v-4c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM30.667 12c-0.8 0-1.333-0.533-1.333-1.333v-4h-4c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM1.333 12c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333h-4v4c0 0.8-0.533 1.333-1.333 1.333z"></path></svg>'},4182:i=>{i.exports='<svg version="1.1" viewBox="0 0 22 22"><svg x="7" y="1"><circle class="diplayer-loading-dot diplayer-loading-dot-0" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-1" cx="4" cy="4" r="2"></circle></svg><svg x="13" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-2" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-3" cx="4" cy="4" r="2"></circle></svg><svg x="7" y="13"><circle class="diplayer-loading-dot diplayer-loading-dot-4" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-5" cx="4" cy="4" r="2"></circle></svg><svg x="1" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-6" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-7" cx="4" cy="4" r="2"></circle></svg></svg>'},1965:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M19.357 2.88c1.749 0 3.366 0.316 4.851 0.946 1.485 0.632 2.768 1.474 3.845 2.533s1.922 2.279 2.532 3.661c0.611 1.383 0.915 2.829 0.915 4.334 0 1.425-0.304 2.847-0.915 4.271-0.611 1.425-1.587 2.767-2.928 4.028-0.855 0.813-1.811 1.607-2.869 2.38s-2.136 1.465-3.233 2.075c-1.099 0.61-2.198 1.098-3.296 1.465-1.098 0.366-2.115 0.549-3.051 0.549-1.343 0-2.441-0.438-3.296-1.311-0.854-0.876-1.281-2.41-1.281-4.608 0-0.366 0.020-0.773 0.060-1.221s0.062-0.895 0.062-1.343c0-0.773-0.183-1.353-0.55-1.738-0.366-0.387-0.793-0.58-1.281-0.58-0.652 0-1.21 0.295-1.678 0.886s-0.926 1.23-1.373 1.921c-0.447 0.693-0.905 1.334-1.372 1.923s-1.028 0.886-1.679 0.886c-0.529 0-1.048-0.427-1.556-1.282s-0.763-2.259-0.763-4.212c0-2.197 0.529-4.241 1.587-6.133s2.462-3.529 4.21-4.912c1.75-1.383 3.762-2.471 6.041-3.264 2.277-0.796 4.617-1.212 7.018-1.253zM7.334 15.817c0.569 0 1.047-0.204 1.434-0.611s0.579-0.875 0.579-1.404c0-0.569-0.193-1.047-0.579-1.434s-0.864-0.579-1.434-0.579c-0.529 0-0.987 0.193-1.373 0.579s-0.58 0.864-0.58 1.434c0 0.53 0.194 0.998 0.58 1.404 0.388 0.407 0.845 0.611 1.373 0.611zM12.216 11.79c0.691 0 1.292-0.254 1.8-0.763s0.762-1.107 0.762-1.8c0-0.732-0.255-1.343-0.762-1.831-0.509-0.489-1.109-0.732-1.8-0.732-0.732 0-1.342 0.244-1.831 0.732-0.488 0.488-0.732 1.098-0.732 1.831 0 0.693 0.244 1.292 0.732 1.8s1.099 0.763 1.831 0.763zM16.366 25.947c0.692 0 1.282-0.214 1.77-0.64s0.732-0.987 0.732-1.678-0.244-1.261-0.732-1.709c-0.489-0.448-1.078-0.671-1.77-0.671-0.65 0-1.21 0.223-1.678 0.671s-0.702 1.018-0.702 1.709c0 0.692 0.234 1.25 0.702 1.678s1.027 0.64 1.678 0.64zM19.113 9.592c0.651 0 1.129-0.203 1.433-0.611 0.305-0.406 0.459-0.874 0.459-1.404 0-0.488-0.154-0.947-0.459-1.373-0.304-0.427-0.782-0.641-1.433-0.641-0.529 0-1.008 0.193-1.434 0.58s-0.64 0.865-0.64 1.434c0 0.571 0.213 1.049 0.64 1.434 0.427 0.389 0.905 0.581 1.434 0.581zM24.848 12.826c0.57 0 1.067-0.213 1.495-0.64 0.427-0.427 0.64-0.947 0.64-1.556 0-0.57-0.214-1.068-0.64-1.495-0.428-0.427-0.927-0.64-1.495-0.64-0.611 0-1.129 0.213-1.555 0.64-0.428 0.427-0.642 0.926-0.642 1.495 0 0.611 0.213 1.129 0.642 1.556s0.947 0.64 1.555 0.64z"></path></svg>'},6074:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 17 32"><path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path></svg>'},730:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 32"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg>'},1428:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>'},2254:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M13.725 30l3.9-5.325-3.9-1.125v6.45zM0 17.5l11.050 3.35 13.6-11.55-10.55 12.425 11.8 3.65 6.1-23.375-32 15.5z"></path></svg>'},5934:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 28"><path d="M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z"></path></svg>'},8410:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>'},2644:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"></path></svg>'},1324:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path></svg>'},4437:i=>{i.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056z"></path></svg>'},9959:(i,l,s)=>{var c=typeof self<"u"?self:typeof window<"u"?window:s.g!==void 0?s.g:{},u=Object.create(c),f=/["&'<>]/;function d(m){return typeof m!="string"&&(m=m==null?"":typeof m=="function"?d(m.call(m)):JSON.stringify(m)),m}u.$escape=function(m){return function(y){var g=""+y,A=f.exec(g);if(!A)return y;var h="",p=void 0,b=void 0,v=void 0;for(p=A.index,b=0;p<g.length;p++){switch(g.charCodeAt(p)){case 34:v="&#34;";break;case 38:v="&#38;";break;case 39:v="&#39;";break;case 60:v="&#60;";break;case 62:v="&#62;";break;default:continue}b!==p&&(h+=g.substring(b,p)),b=p+1,h+=v}return b!==p?h+g.substring(b,p):h}(d(m))},u.$each=function(m,y){if(Array.isArray(m))for(var g=0,A=m.length;g<A;g++)y(m[g],g);else for(var h in m)y(m[h],h)},i.exports=u},6877:(i,l,s)=>{i.exports=s(9959)},6208:(i,l,s)=>{i.exports=s(4568)},8170:(i,l,s)=>{var c=s(7201),u=s(9095),f=s(8416),d=s(6374),m=s(5967),y=s(5032),g=s(1224),A=s(4033),h=s(1766),p=s(8832),b=s(8699);i.exports=function(v){return new Promise(function(x,_){var S,k=v.data,$=v.headers,R=v.responseType;function D(){v.cancelToken&&v.cancelToken.unsubscribe(S),v.signal&&v.signal.removeEventListener("abort",S)}c.isFormData(k)&&c.isStandardBrowserEnv()&&delete $["Content-Type"];var j=new XMLHttpRequest;if(v.auth){var M=v.auth.username||"",N=v.auth.password?unescape(encodeURIComponent(v.auth.password)):"";$.Authorization="Basic "+btoa(M+":"+N)}var F=m(v.baseURL,v.url);function z(){if(j){var le="getAllResponseHeaders"in j?y(j.getAllResponseHeaders()):null,Q={data:R&&R!=="text"&&R!=="json"?j.response:j.responseText,status:j.status,statusText:j.statusText,headers:le,config:v,request:j};u(function(ie){x(ie),D()},function(ie){_(ie),D()},Q),j=null}}if(j.open(v.method.toUpperCase(),d(F,v.params,v.paramsSerializer),!0),j.timeout=v.timeout,"onloadend"in j?j.onloadend=z:j.onreadystatechange=function(){j&&j.readyState===4&&(j.status!==0||j.responseURL&&j.responseURL.indexOf("file:")===0)&&setTimeout(z)},j.onabort=function(){j&&(_(new h("Request aborted",h.ECONNABORTED,v,j)),j=null)},j.onerror=function(){_(new h("Network Error",h.ERR_NETWORK,v,j,j)),j=null},j.ontimeout=function(){var le=v.timeout?"timeout of "+v.timeout+"ms exceeded":"timeout exceeded",Q=v.transitional||A;v.timeoutErrorMessage&&(le=v.timeoutErrorMessage),_(new h(le,Q.clarifyTimeoutError?h.ETIMEDOUT:h.ECONNABORTED,v,j)),j=null},c.isStandardBrowserEnv()){var X=(v.withCredentials||g(F))&&v.xsrfCookieName?f.read(v.xsrfCookieName):void 0;X&&($[v.xsrfHeaderName]=X)}"setRequestHeader"in j&&c.forEach($,function(le,Q){k===void 0&&Q.toLowerCase()==="content-type"?delete $[Q]:j.setRequestHeader(Q,le)}),c.isUndefined(v.withCredentials)||(j.withCredentials=!!v.withCredentials),R&&R!=="json"&&(j.responseType=v.responseType),typeof v.onDownloadProgress=="function"&&j.addEventListener("progress",v.onDownloadProgress),typeof v.onUploadProgress=="function"&&j.upload&&j.upload.addEventListener("progress",v.onUploadProgress),(v.cancelToken||v.signal)&&(S=function(le){j&&(_(!le||le&&le.type?new p:le),j.abort(),j=null)},v.cancelToken&&v.cancelToken.subscribe(S),v.signal&&(v.signal.aborted?S():v.signal.addEventListener("abort",S))),k||(k=null);var Y=b(F);Y&&["http","https","file"].indexOf(Y)===-1?_(new h("Unsupported protocol "+Y+":",h.ERR_BAD_REQUEST,v)):j.send(k)})}},4568:(i,l,s)=>{var c=s(7201),u=s(5305),f=s(2275),d=s(9834),m=function y(g){var A=new f(g),h=u(f.prototype.request,A);return c.extend(h,f.prototype,A),c.extend(h,A),h.create=function(p){return y(d(g,p))},h}(s(6339));m.Axios=f,m.CanceledError=s(8832),m.CancelToken=s(5027),m.isCancel=s(1893),m.VERSION=s(4316).version,m.toFormData=s(6615),m.AxiosError=s(1766),m.Cancel=m.CanceledError,m.all=function(y){return Promise.all(y)},m.spread=s(3282),m.isAxiosError=s(3319),i.exports=m,i.exports.default=m},5027:(i,l,s)=>{var c=s(8832);function u(f){if(typeof f!="function")throw new TypeError("executor must be a function.");var d;this.promise=new Promise(function(y){d=y});var m=this;this.promise.then(function(y){if(m._listeners){var g,A=m._listeners.length;for(g=0;g<A;g++)m._listeners[g](y);m._listeners=null}}),this.promise.then=function(y){var g,A=new Promise(function(h){m.subscribe(h),g=h}).then(y);return A.cancel=function(){m.unsubscribe(g)},A},f(function(y){m.reason||(m.reason=new c(y),d(m.reason))})}u.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},u.prototype.subscribe=function(f){this.reason?f(this.reason):this._listeners?this._listeners.push(f):this._listeners=[f]},u.prototype.unsubscribe=function(f){if(this._listeners){var d=this._listeners.indexOf(f);d!==-1&&this._listeners.splice(d,1)}},u.source=function(){var f;return{token:new u(function(d){f=d}),cancel:f}},i.exports=u},8832:(i,l,s)=>{var c=s(1766);function u(f){c.call(this,f==null?"canceled":f,c.ERR_CANCELED),this.name="CanceledError"}s(7201).inherits(u,c,{__CANCEL__:!0}),i.exports=u},1893:i=>{i.exports=function(l){return!(!l||!l.__CANCEL__)}},2275:(i,l,s)=>{var c=s(7201),u=s(6374),f=s(6808),d=s(7313),m=s(9834),y=s(5967),g=s(9712),A=g.validators;function h(p){this.defaults=p,this.interceptors={request:new f,response:new f}}h.prototype.request=function(p,b){typeof p=="string"?(b=b||{}).url=p:b=p||{},(b=m(this.defaults,b)).method?b.method=b.method.toLowerCase():this.defaults.method?b.method=this.defaults.method.toLowerCase():b.method="get";var v=b.transitional;v!==void 0&&g.assertOptions(v,{silentJSONParsing:A.transitional(A.boolean),forcedJSONParsing:A.transitional(A.boolean),clarifyTimeoutError:A.transitional(A.boolean)},!1);var x=[],_=!0;this.interceptors.request.forEach(function(M){typeof M.runWhen=="function"&&M.runWhen(b)===!1||(_=_&&M.synchronous,x.unshift(M.fulfilled,M.rejected))});var S,k=[];if(this.interceptors.response.forEach(function(M){k.push(M.fulfilled,M.rejected)}),!_){var $=[d,void 0];for(Array.prototype.unshift.apply($,x),$=$.concat(k),S=Promise.resolve(b);$.length;)S=S.then($.shift(),$.shift());return S}for(var R=b;x.length;){var D=x.shift(),j=x.shift();try{R=D(R)}catch(M){j(M);break}}try{S=d(R)}catch(M){return Promise.reject(M)}for(;k.length;)S=S.then(k.shift(),k.shift());return S},h.prototype.getUri=function(p){p=m(this.defaults,p);var b=y(p.baseURL,p.url);return u(b,p.params,p.paramsSerializer)},c.forEach(["delete","get","head","options"],function(p){h.prototype[p]=function(b,v){return this.request(m(v||{},{method:p,url:b,data:(v||{}).data}))}}),c.forEach(["post","put","patch"],function(p){function b(v){return function(x,_,S){return this.request(m(S||{},{method:p,headers:v?{"Content-Type":"multipart/form-data"}:{},url:x,data:_}))}}h.prototype[p]=b(),h.prototype[p+"Form"]=b(!0)}),i.exports=h},1766:(i,l,s)=>{var c=s(7201);function u(m,y,g,A,h){Error.call(this),this.message=m,this.name="AxiosError",y&&(this.code=y),g&&(this.config=g),A&&(this.request=A),h&&(this.response=h)}c.inherits(u,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var f=u.prototype,d={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach(function(m){d[m]={value:m}}),Object.defineProperties(u,d),Object.defineProperty(f,"isAxiosError",{value:!0}),u.from=function(m,y,g,A,h,p){var b=Object.create(f);return c.toFlatObject(m,b,function(v){return v!==Error.prototype}),u.call(b,m.message,y,g,A,h),b.name=m.name,p&&Object.assign(b,p),b},i.exports=u},6808:(i,l,s)=>{var c=s(7201);function u(){this.handlers=[]}u.prototype.use=function(f,d,m){return this.handlers.push({fulfilled:f,rejected:d,synchronous:!!m&&m.synchronous,runWhen:m?m.runWhen:null}),this.handlers.length-1},u.prototype.eject=function(f){this.handlers[f]&&(this.handlers[f]=null)},u.prototype.forEach=function(f){c.forEach(this.handlers,function(d){d!==null&&f(d)})},i.exports=u},5967:(i,l,s)=>{var c=s(724),u=s(4669);i.exports=function(f,d){return f&&!c(d)?u(f,d):d}},7313:(i,l,s)=>{var c=s(7201),u=s(6431),f=s(1893),d=s(6339),m=s(8832);function y(g){if(g.cancelToken&&g.cancelToken.throwIfRequested(),g.signal&&g.signal.aborted)throw new m}i.exports=function(g){return y(g),g.headers=g.headers||{},g.data=u.call(g,g.data,g.headers,g.transformRequest),g.headers=c.merge(g.headers.common||{},g.headers[g.method]||{},g.headers),c.forEach(["delete","get","head","post","put","patch","common"],function(A){delete g.headers[A]}),(g.adapter||d.adapter)(g).then(function(A){return y(g),A.data=u.call(g,A.data,A.headers,g.transformResponse),A},function(A){return f(A)||(y(g),A&&A.response&&(A.response.data=u.call(g,A.response.data,A.response.headers,g.transformResponse))),Promise.reject(A)})}},9834:(i,l,s)=>{var c=s(7201);i.exports=function(u,f){f=f||{};var d={};function m(b,v){return c.isPlainObject(b)&&c.isPlainObject(v)?c.merge(b,v):c.isPlainObject(v)?c.merge({},v):c.isArray(v)?v.slice():v}function y(b){return c.isUndefined(f[b])?c.isUndefined(u[b])?void 0:m(void 0,u[b]):m(u[b],f[b])}function g(b){if(!c.isUndefined(f[b]))return m(void 0,f[b])}function A(b){return c.isUndefined(f[b])?c.isUndefined(u[b])?void 0:m(void 0,u[b]):m(void 0,f[b])}function h(b){return b in f?m(u[b],f[b]):b in u?m(void 0,u[b]):void 0}var p={url:g,method:g,data:g,baseURL:A,transformRequest:A,transformResponse:A,paramsSerializer:A,timeout:A,timeoutMessage:A,withCredentials:A,adapter:A,responseType:A,xsrfCookieName:A,xsrfHeaderName:A,onUploadProgress:A,onDownloadProgress:A,decompress:A,maxContentLength:A,maxBodyLength:A,beforeRedirect:A,transport:A,httpAgent:A,httpsAgent:A,cancelToken:A,socketPath:A,responseEncoding:A,validateStatus:h};return c.forEach(Object.keys(u).concat(Object.keys(f)),function(b){var v=p[b]||y,x=v(b);c.isUndefined(x)&&v!==h||(d[b]=x)}),d}},9095:(i,l,s)=>{var c=s(1766);i.exports=function(u,f,d){var m=d.config.validateStatus;d.status&&m&&!m(d.status)?f(new c("Request failed with status code "+d.status,[c.ERR_BAD_REQUEST,c.ERR_BAD_RESPONSE][Math.floor(d.status/100)-4],d.config,d.request,d)):u(d)}},6431:(i,l,s)=>{var c=s(7201),u=s(6339);i.exports=function(f,d,m){var y=this||u;return c.forEach(m,function(g){f=g.call(y,f,d)}),f}},6339:(i,l,s)=>{var c=s(7201),u=s(5227),f=s(1766),d=s(4033),m=s(6615),y={"Content-Type":"application/x-www-form-urlencoded"};function g(p,b){!c.isUndefined(p)&&c.isUndefined(p["Content-Type"])&&(p["Content-Type"]=b)}var A,h={transitional:d,adapter:((typeof XMLHttpRequest<"u"||typeof process<"u"&&Object.prototype.toString.call(process)==="[object process]")&&(A=s(8170)),A),transformRequest:[function(p,b){if(u(b,"Accept"),u(b,"Content-Type"),c.isFormData(p)||c.isArrayBuffer(p)||c.isBuffer(p)||c.isStream(p)||c.isFile(p)||c.isBlob(p))return p;if(c.isArrayBufferView(p))return p.buffer;if(c.isURLSearchParams(p))return g(b,"application/x-www-form-urlencoded;charset=utf-8"),p.toString();var v,x=c.isObject(p),_=b&&b["Content-Type"];if((v=c.isFileList(p))||x&&_==="multipart/form-data"){var S=this.env&&this.env.FormData;return m(v?{"files[]":p}:p,S&&new S)}return x||_==="application/json"?(g(b,"application/json"),function(k,$,R){if(c.isString(k))try{return(0,JSON.parse)(k),c.trim(k)}catch(D){if(D.name!=="SyntaxError")throw D}return(0,JSON.stringify)(k)}(p)):p}],transformResponse:[function(p){var b=this.transitional||h.transitional,v=b&&b.silentJSONParsing,x=b&&b.forcedJSONParsing,_=!v&&this.responseType==="json";if(_||x&&c.isString(p)&&p.length)try{return JSON.parse(p)}catch(S){if(_)throw S.name==="SyntaxError"?f.from(S,f.ERR_BAD_RESPONSE,this,null,this.response):S}return p}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:s(3997)},validateStatus:function(p){return p>=200&&p<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};c.forEach(["delete","get","head"],function(p){h.headers[p]={}}),c.forEach(["post","put","patch"],function(p){h.headers[p]=c.merge(y)}),i.exports=h},4033:i=>{i.exports={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1}},4316:i=>{i.exports={version:"0.27.2"}},5305:i=>{i.exports=function(l,s){return function(){for(var c=new Array(arguments.length),u=0;u<c.length;u++)c[u]=arguments[u];return l.apply(s,c)}}},6374:(i,l,s)=>{var c=s(7201);function u(f){return encodeURIComponent(f).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}i.exports=function(f,d,m){if(!d)return f;var y;if(m)y=m(d);else if(c.isURLSearchParams(d))y=d.toString();else{var g=[];c.forEach(d,function(h,p){h!=null&&(c.isArray(h)?p+="[]":h=[h],c.forEach(h,function(b){c.isDate(b)?b=b.toISOString():c.isObject(b)&&(b=JSON.stringify(b)),g.push(u(p)+"="+u(b))}))}),y=g.join("&")}if(y){var A=f.indexOf("#");A!==-1&&(f=f.slice(0,A)),f+=(f.indexOf("?")===-1?"?":"&")+y}return f}},4669:i=>{i.exports=function(l,s){return s?l.replace(/\/+$/,"")+"/"+s.replace(/^\/+/,""):l}},8416:(i,l,s)=>{var c=s(7201);i.exports=c.isStandardBrowserEnv()?{write:function(u,f,d,m,y,g){var A=[];A.push(u+"="+encodeURIComponent(f)),c.isNumber(d)&&A.push("expires="+new Date(d).toGMTString()),c.isString(m)&&A.push("path="+m),c.isString(y)&&A.push("domain="+y),g===!0&&A.push("secure"),document.cookie=A.join("; ")},read:function(u){var f=document.cookie.match(new RegExp("(^|;\\s*)("+u+")=([^;]*)"));return f?decodeURIComponent(f[3]):null},remove:function(u){this.write(u,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},724:i=>{i.exports=function(l){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(l)}},3319:(i,l,s)=>{var c=s(7201);i.exports=function(u){return c.isObject(u)&&u.isAxiosError===!0}},1224:(i,l,s)=>{var c=s(7201);i.exports=c.isStandardBrowserEnv()?function(){var u,f=/(msie|trident)/i.test(navigator.userAgent),d=document.createElement("a");function m(y){var g=y;return f&&(d.setAttribute("href",g),g=d.href),d.setAttribute("href",g),{href:d.href,protocol:d.protocol?d.protocol.replace(/:$/,""):"",host:d.host,search:d.search?d.search.replace(/^\?/,""):"",hash:d.hash?d.hash.replace(/^#/,""):"",hostname:d.hostname,port:d.port,pathname:d.pathname.charAt(0)==="/"?d.pathname:"/"+d.pathname}}return u=m(window.location.href),function(y){var g=c.isString(y)?m(y):y;return g.protocol===u.protocol&&g.host===u.host}}():function(){return!0}},5227:(i,l,s)=>{var c=s(7201);i.exports=function(u,f){c.forEach(u,function(d,m){m!==f&&m.toUpperCase()===f.toUpperCase()&&(u[f]=d,delete u[m])})}},3997:i=>{i.exports=null},5032:(i,l,s)=>{var c=s(7201),u=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];i.exports=function(f){var d,m,y,g={};return f&&c.forEach(f.split(`
`),function(A){if(y=A.indexOf(":"),d=c.trim(A.substr(0,y)).toLowerCase(),m=c.trim(A.substr(y+1)),d){if(g[d]&&u.indexOf(d)>=0)return;g[d]=d==="set-cookie"?(g[d]?g[d]:[]).concat([m]):g[d]?g[d]+", "+m:m}}),g}},8699:i=>{i.exports=function(l){var s=/^([-+\w]{1,25})(:?\/\/|:)/.exec(l);return s&&s[1]||""}},3282:i=>{i.exports=function(l){return function(s){return l.apply(null,s)}}},6615:(i,l,s)=>{function c(f){return c=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(d){return typeof d}:function(d){return d&&typeof Symbol=="function"&&d.constructor===Symbol&&d!==Symbol.prototype?"symbol":typeof d},c(f)}var u=s(7201);i.exports=function(f,d){d=d||new FormData;var m=[];function y(g){return g===null?"":u.isDate(g)?g.toISOString():u.isArrayBuffer(g)||u.isTypedArray(g)?typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}return function g(A,h){if(u.isPlainObject(A)||u.isArray(A)){if(m.indexOf(A)!==-1)throw Error("Circular reference detected in "+h);m.push(A),u.forEach(A,function(p,b){if(!u.isUndefined(p)){var v,x=h?h+"."+b:b;if(p&&!h&&c(p)==="object"){if(u.endsWith(b,"{}"))p=JSON.stringify(p);else if(u.endsWith(b,"[]")&&(v=u.toArray(p)))return void v.forEach(function(_){!u.isUndefined(_)&&d.append(x,y(_))})}g(p,x)}}),m.pop()}else d.append(h,y(A))}(f),d}},9712:(i,l,s)=>{function c(y){return c=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(g){return typeof g}:function(g){return g&&typeof Symbol=="function"&&g.constructor===Symbol&&g!==Symbol.prototype?"symbol":typeof g},c(y)}var u=s(4316).version,f=s(1766),d={};["object","boolean","number","function","string","symbol"].forEach(function(y,g){d[y]=function(A){return c(A)===y||"a"+(g<1?"n ":" ")+y}});var m={};d.transitional=function(y,g,A){function h(p,b){return"[Axios v"+u+"] Transitional option '"+p+"'"+b+(A?". "+A:"")}return function(p,b,v){if(y===!1)throw new f(h(b," has been removed"+(g?" in "+g:"")),f.ERR_DEPRECATED);return g&&!m[b]&&(m[b]=!0,console.warn(h(b," has been deprecated since v"+g+" and will be removed in the near future"))),!y||y(p,b,v)}},i.exports={assertOptions:function(y,g,A){if(c(y)!=="object")throw new f("options must be an object",f.ERR_BAD_OPTION_VALUE);for(var h=Object.keys(y),p=h.length;p-- >0;){var b=h[p],v=g[b];if(v){var x=y[b],_=x===void 0||v(x,b,y);if(_!==!0)throw new f("option "+b+" must be "+_,f.ERR_BAD_OPTION_VALUE)}else if(A!==!0)throw new f("Unknown option "+b,f.ERR_BAD_OPTION)}},validators:d}},7201:(i,l,s)=>{function c(M){return c=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(N){return typeof N}:function(N){return N&&typeof Symbol=="function"&&N.constructor===Symbol&&N!==Symbol.prototype?"symbol":typeof N},c(M)}var u,f=s(5305),d=Object.prototype.toString,m=(u=Object.create(null),function(M){var N=d.call(M);return u[N]||(u[N]=N.slice(8,-1).toLowerCase())});function y(M){return M=M.toLowerCase(),function(N){return m(N)===M}}function g(M){return Array.isArray(M)}function A(M){return M===void 0}var h=y("ArrayBuffer");function p(M){return M!==null&&c(M)==="object"}function b(M){if(m(M)!=="object")return!1;var N=Object.getPrototypeOf(M);return N===null||N===Object.prototype}var v=y("Date"),x=y("File"),_=y("Blob"),S=y("FileList");function k(M){return d.call(M)==="[object Function]"}var $=y("URLSearchParams");function R(M,N){if(M!=null)if(c(M)!=="object"&&(M=[M]),g(M))for(var F=0,z=M.length;F<z;F++)N.call(null,M[F],F,M);else for(var X in M)Object.prototype.hasOwnProperty.call(M,X)&&N.call(null,M[X],X,M)}var D,j=(D=typeof Uint8Array<"u"&&Object.getPrototypeOf(Uint8Array),function(M){return D&&M instanceof D});i.exports={isArray:g,isArrayBuffer:h,isBuffer:function(M){return M!==null&&!A(M)&&M.constructor!==null&&!A(M.constructor)&&typeof M.constructor.isBuffer=="function"&&M.constructor.isBuffer(M)},isFormData:function(M){var N="[object FormData]";return M&&(typeof FormData=="function"&&M instanceof FormData||d.call(M)===N||k(M.toString)&&M.toString()===N)},isArrayBufferView:function(M){return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?ArrayBuffer.isView(M):M&&M.buffer&&h(M.buffer)},isString:function(M){return typeof M=="string"},isNumber:function(M){return typeof M=="number"},isObject:p,isPlainObject:b,isUndefined:A,isDate:v,isFile:x,isBlob:_,isFunction:k,isStream:function(M){return p(M)&&k(M.pipe)},isURLSearchParams:$,isStandardBrowserEnv:function(){return(typeof navigator>"u"||navigator.product!=="ReactNative"&&navigator.product!=="NativeScript"&&navigator.product!=="NS")&&typeof window<"u"&&typeof document<"u"},forEach:R,merge:function M(){var N={};function F(Y,le){b(N[le])&&b(Y)?N[le]=M(N[le],Y):b(Y)?N[le]=M({},Y):g(Y)?N[le]=Y.slice():N[le]=Y}for(var z=0,X=arguments.length;z<X;z++)R(arguments[z],F);return N},extend:function(M,N,F){return R(N,function(z,X){M[X]=F&&typeof z=="function"?f(z,F):z}),M},trim:function(M){return M.trim?M.trim():M.replace(/^\s+|\s+$/g,"")},stripBOM:function(M){return M.charCodeAt(0)===65279&&(M=M.slice(1)),M},inherits:function(M,N,F,z){M.prototype=Object.create(N.prototype,z),M.prototype.constructor=M,F&&Object.assign(M.prototype,F)},toFlatObject:function(M,N,F){var z,X,Y,le={};N=N||{};do{for(X=(z=Object.getOwnPropertyNames(M)).length;X-- >0;)le[Y=z[X]]||(N[Y]=M[Y],le[Y]=!0);M=Object.getPrototypeOf(M)}while(M&&(!F||F(M,N))&&M!==Object.prototype);return N},kindOf:m,kindOfTest:y,endsWith:function(M,N,F){M=String(M),(F===void 0||F>M.length)&&(F=M.length),F-=N.length;var z=M.indexOf(N,F);return z!==-1&&z===F},toArray:function(M){if(!M)return null;var N=M.length;if(A(N))return null;for(var F=new Array(N);N-- >0;)F[N]=M[N];return F},isTypedArray:j,isFileList:S}},8160:i=>{i.exports=function(l){var s=[];return s.toString=function(){return this.map(function(c){var u="",f=c[5]!==void 0;return c[4]&&(u+="@supports (".concat(c[4],") {")),c[2]&&(u+="@media ".concat(c[2]," {")),f&&(u+="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {")),u+=l(c),f&&(u+="}"),c[2]&&(u+="}"),c[4]&&(u+="}"),u}).join("")},s.i=function(c,u,f,d,m){typeof c=="string"&&(c=[[null,c,void 0]]);var y={};if(f)for(var g=0;g<this.length;g++){var A=this[g][0];A!=null&&(y[A]=!0)}for(var h=0;h<c.length;h++){var p=[].concat(c[h]);f&&y[p[0]]||(m!==void 0&&(p[5]===void 0||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=m),u&&(p[2]&&(p[1]="@media ".concat(p[2]," {").concat(p[1],"}")),p[2]=u),d&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=d):p[4]="".concat(d)),s.push(p))}},s}},8431:i=>{i.exports=function(l,s){return s||(s={}),l&&(l=String(l.__esModule?l.default:l),/^['"].*['"]$/.test(l)&&(l=l.slice(1,-1)),s.hash&&(l+=s.hash),/["'() \t\n]|(%20)/.test(l)||s.needQuotes?'"'.concat(l.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):l)}},8955:i=>{i.exports=function(l){var s=l[1],c=l[3];if(!c)return s;if(typeof btoa=="function"){var u=btoa(unescape(encodeURIComponent(JSON.stringify(c)))),f="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(u),d="/*# ".concat(f," */"),m=c.sources.map(function(y){return"/*# sourceURL=".concat(c.sourceRoot||"").concat(y," */")});return[s].concat(m).concat([d]).join(`
`)}return[s].join(`
`)}},7831:i=>{i.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg=="}},r={};function a(i){var l=r[i];if(l!==void 0)return l.exports;var s=r[i]={id:i,exports:{}};return n[i](s,s.exports,a),s.exports}a.m=n,a.n=i=>{var l=i&&i.__esModule?()=>i.default:()=>i;return a.d(l,{a:l}),l},a.d=(i,l)=>{for(var s in l)a.o(l,s)&&!a.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:l[s]})},a.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),a.o=(i,l)=>Object.prototype.hasOwnProperty.call(i,l),a.b=document.baseURI||self.location.href,a.nc=void 0;var o={};return(()=>{a.d(o,{default:()=>Bx});var i=a(9624),l=a.n(i),s=a(6990),c=a.n(s),u=a(6892),f=a.n(u),d=a(6359),m=a.n(d),y=a(2716),g=a.n(y),A=a(230),h=a.n(A),p=a(3150),b={};b.styleTagTransform=h(),b.setAttributes=m(),b.insert=f().bind(null,"head"),b.domAPI=c(),b.insertStyleElement=g(),l()(p.Z,b),p.Z&&p.Z.locals&&p.Z.locals;function v(L){return v=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(P){return typeof P}:function(P){return P&&typeof Symbol=="function"&&P.constructor===Symbol&&P!==Symbol.prototype?"symbol":typeof P},v(L)}function x(L){return x=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(P){return typeof P}:function(P){return P&&typeof Symbol=="function"&&P.constructor===Symbol&&P!==Symbol.prototype?"symbol":typeof P},x(L)}var _=setTimeout;function S(L){return Boolean(L&&L.length!==void 0)}function k(){}function $(L){if(!(this instanceof $))throw new TypeError("Promises must be constructed via new");if(typeof L!="function")throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],F(L,this)}function R(L,P){for(;L._state===3;)L=L._value;L._state!==0?(L._handled=!0,$._immediateFn(function(){var O=L._state===1?P.onFulfilled:P.onRejected;if(O!==null){var E;try{E=O(L._value)}catch(I){return void j(P.promise,I)}D(P.promise,E)}else(L._state===1?D:j)(P.promise,L._value)})):L._deferreds.push(P)}function D(L,P){try{if(P===L)throw new TypeError("A promise cannot be resolved with itself.");if(P&&(x(P)==="object"||typeof P=="function")){var O=P.then;if(P instanceof $)return L._state=3,L._value=P,void M(L);if(typeof O=="function")return void F((E=O,I=P,function(){E.apply(I,arguments)}),L)}L._state=1,L._value=P,M(L)}catch(q){j(L,q)}var E,I}function j(L,P){L._state=2,L._value=P,M(L)}function M(L){L._state===2&&L._deferreds.length===0&&$._immediateFn(function(){L._handled||$._unhandledRejectionFn(L._value)});for(var P=0,O=L._deferreds.length;P<O;P++)R(L,L._deferreds[P]);L._deferreds=null}function N(L,P,O){this.onFulfilled=typeof L=="function"?L:null,this.onRejected=typeof P=="function"?P:null,this.promise=O}function F(L,P){var O=!1;try{L(function(E){O||(O=!0,D(P,E))},function(E){O||(O=!0,j(P,E))})}catch(E){if(O)return;O=!0,j(P,E)}}$.prototype.catch=function(L){return this.then(null,L)},$.prototype.then=function(L,P){var O=new this.constructor(k);return R(this,new N(L,P,O)),O},$.prototype.finally=function(L){var P=this.constructor;return this.then(function(O){return P.resolve(L()).then(function(){return O})},function(O){return P.resolve(L()).then(function(){return P.reject(O)})})},$.all=function(L){return new $(function(P,O){if(!S(L))return O(new TypeError("Promise.all accepts an array"));var E=Array.prototype.slice.call(L);if(E.length===0)return P([]);var I=E.length;function q(he,Ce){try{if(Ce&&(x(Ce)==="object"||typeof Ce=="function")){var Pe=Ce.then;if(typeof Pe=="function")return void Pe.call(Ce,function(pt){q(he,pt)},O)}E[he]=Ce,--I==0&&P(E)}catch(pt){O(pt)}}for(var G=0;G<E.length;G++)q(G,E[G])})},$.allSettled=function(L){return new this(function(P,O){if(!L||L.length===void 0)return O(new TypeError(v(L)+" "+L+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var E=Array.prototype.slice.call(L);if(E.length===0)return P([]);var I=E.length;function q(he,Ce){if(Ce&&(v(Ce)==="object"||typeof Ce=="function")){var Pe=Ce.then;if(typeof Pe=="function")return void Pe.call(Ce,function(pt){q(he,pt)},function(pt){E[he]={status:"rejected",reason:pt},--I==0&&P(E)})}E[he]={status:"fulfilled",value:Ce},--I==0&&P(E)}for(var G=0;G<E.length;G++)q(G,E[G])})},$.resolve=function(L){return L&&x(L)==="object"&&L.constructor===$?L:new $(function(P){P(L)})},$.reject=function(L){return new $(function(P,O){O(L)})},$.race=function(L){return new $(function(P,O){if(!S(L))return O(new TypeError("Promise.race accepts an array"));for(var E=0,I=L.length;E<I;E++)$.resolve(L[E]).then(P,O)})},$._immediateFn=typeof setImmediate=="function"&&function(L){setImmediate(L)}||function(L){_(L,0)},$._unhandledRejectionFn=function(L){typeof console<"u"&&console&&console.warn("Possible Unhandled Promise Rejection:",L)};const z=$;var X=/mobile/i.test(window.navigator.userAgent);const Y={secondToTime:function(L){if((L=L||0)===0||L===1/0||L.toString()==="NaN")return"00:00";var P=Math.floor(L/3600),O=Math.floor((L-3600*P)/60),E=Math.floor(L-3600*P-60*O);return(P>0?[P,O,E]:[O,E]).map(function(I){return I<10?"0"+I:""+I}).join(":")},getElementViewLeft:function(L){var P=L.offsetLeft,O=L.offsetParent,E=document.body.scrollLeft+document.documentElement.scrollLeft;if(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement)for(;O!==null&&O!==L;)P+=O.offsetLeft,O=O.offsetParent;else for(;O!==null;)P+=O.offsetLeft,O=O.offsetParent;return P-E},getBoundingClientRectViewLeft:function(L){var P=window.scrollY||window.pageYOffset||document.body.scrollTop+(document.documentElement&&document.documentElement.scrollTop||0);if(L.getBoundingClientRect){if(typeof this.getBoundingClientRectViewLeft.offset!="number"){var O=document.createElement("div");O.style.cssText="position:absolute;top:0;left:0;",document.body.appendChild(O),this.getBoundingClientRectViewLeft.offset=-O.getBoundingClientRect().top-P,document.body.removeChild(O),O=null}var E=L.getBoundingClientRect(),I=this.getBoundingClientRectViewLeft.offset;return E.left+I}return this.getElementViewLeft(L)},getScrollPosition:function(){return{left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}},setScrollPosition:function(L){var P=L.left,O=P===void 0?0:P,E=L.top,I=E===void 0?0:E;this.isFirefox?(document.documentElement.scrollLeft=O,document.documentElement.scrollTop=I):window.scrollTo(O,I)},isMobile:X,isFirefox:/firefox/i.test(window.navigator.userAgent),isChrome:/chrome/i.test(window.navigator.userAgent),isSafari:/safari/i.test(window.navigator.userAgent),storage:{set:function(L,P){localStorage.setItem(L,P)},get:function(L){return localStorage.getItem(L)}},nameMap:{dragStart:X?"touchstart":"mousedown",dragMove:X?"touchmove":"mousemove",dragEnd:X?"touchend":"mouseup"},color2Number:function(L){return L[0]==="#"&&(L=L.substr(1)),L.length===3&&(L="".concat(L[0]).concat(L[0]).concat(L[1]).concat(L[1]).concat(L[2]).concat(L[2])),parseInt(L,16)+0&16777215},number2Color:function(L){return"#"+("00000"+L.toString(16)).slice(-6)},number2Type:function(L){switch(L){case 0:default:return"right";case 1:return"top";case 2:return"bottom"}}};var le=a(6208),Q=a.n(le);const ie={send:function(L){Q().post(L.url,L.data).then(function(P){var O=P.data;O&&O.code===0?L.success&&L.success(O):L.error&&L.error(O&&O.msg)}).catch(function(P){console.error(P),L.error&&L.error()})},read:function(L){Q().get(L.url).then(function(P){var O=P.data;O&&O.code===0?L.success&&L.success(O.data.map(function(E){return{time:E[0],type:E[1],color:E[2],author:E[3],text:E[4]}})):L.error&&L.error(O&&O.msg)}).catch(function(P){console.error(P),L.error&&L.error()})}};function ne(L){return ne=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(P){return typeof P}:function(P){return P&&typeof Symbol=="function"&&P.constructor===Symbol&&P!==Symbol.prototype?"symbol":typeof P},ne(L)}function fe(L){var P=this;this.lang=L,this.fallbackLang=this.lang.includes("-")?this.lang.split("-")[0]:this.lang,this.tran=function(O){return O=O.toLowerCase(),K[P.lang]&&K[P.lang][O]?K[P.lang][O]:K[P.fallbackLang]&&K[P.fallbackLang][O]?K[P.fallbackLang][O]:ee[O]?ee[O]:O}}var ee={"danmaku-loading":"Danmaku is loading",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Input danmaku, hit Enter","about-author":"About author","dplayer-feedback":"DPlayer feedback","about-dplayer":"About DPlayer",loop:"Loop",speed:"Speed","opacity-danmaku":"Opacity for danmaku",normal:"Normal","please-input-danmaku":"Please input danmaku content!","set-danmaku-color":"Set danmaku color","set-danmaku-type":"Set danmaku type","show-danmaku":"Show danmaku","video-failed":"Video load failed","danmaku-failed":"Danmaku load failed","danmaku-send-failed":"Danmaku send failed","switching-quality":"Switching to %q quality","switched-quality":"Switched to %q quality",ff:"FF %s s",rew:"REW %s s","unlimited-danmaku":"Unlimited danmaku","send-danmaku":"Send danmaku",setting:"Setting",fullscreen:"Full screen","web-fullscreen":"Web full screen",send:"Send",screenshot:"Screenshot",airplay:"AirPlay",chromecast:"ChromeCast",subtitle:"Subtitle",off:"Off","show-subs":"Show subtitle","hide-subs":"Hide subtitle",volume:"Volume",live:"Live","video-info":"Video info"},K={en:ee,"zh-cn":{"danmaku-loading":"\u5F39\u5E55\u52A0\u8F7D\u4E2D",top:"\u9876\u90E8",bottom:"\u5E95\u90E8",rolling:"\u6EDA\u52A8","input-danmaku-enter":"\u8F93\u5165\u5F39\u5E55\uFF0C\u56DE\u8F66\u53D1\u9001","about-author":"\u5173\u4E8E\u4F5C\u8005","dplayer-feedback":"\u64AD\u653E\u5668\u610F\u89C1\u53CD\u9988","about-dplayer":"\u5173\u4E8E DPlayer \u64AD\u653E\u5668",loop:"\u6D17\u8111\u5FAA\u73AF",speed:"\u901F\u5EA6","opacity-danmaku":"\u5F39\u5E55\u900F\u660E\u5EA6",normal:"\u6B63\u5E38","please-input-danmaku":"\u8981\u8F93\u5165\u5F39\u5E55\u5185\u5BB9\u554A\u5582\uFF01","set-danmaku-color":"\u8BBE\u7F6E\u5F39\u5E55\u989C\u8272","set-danmaku-type":"\u8BBE\u7F6E\u5F39\u5E55\u7C7B\u578B","show-danmaku":"\u663E\u793A\u5F39\u5E55","video-failed":"\u89C6\u9891\u52A0\u8F7D\u5931\u8D25","danmaku-failed":"\u5F39\u5E55\u52A0\u8F7D\u5931\u8D25","danmaku-send-failed":"\u5F39\u5E55\u53D1\u9001\u5931\u8D25","switching-quality":"\u6B63\u5728\u5207\u6362\u81F3 %q \u753B\u8D28","switched-quality":"\u5DF2\u7ECF\u5207\u6362\u81F3 %q \u753B\u8D28",ff:"\u5FEB\u8FDB %s \u79D2",rew:"\u5FEB\u9000 %s \u79D2","unlimited-danmaku":"\u6D77\u91CF\u5F39\u5E55","send-danmaku":"\u53D1\u9001\u5F39\u5E55",setting:"\u8BBE\u7F6E",fullscreen:"\u5168\u5C4F","web-fullscreen":"\u9875\u9762\u5168\u5C4F",send:"\u53D1\u9001",screenshot:"\u622A\u56FE",airplay:"\u65E0\u7EBF\u6295\u5C4F",chromecast:"ChromeCast",subtitle:"\u5B57\u5E55",off:"\u5173\u95ED","show-subs":"\u663E\u793A\u5B57\u5E55","hide-subs":"\u9690\u85CF\u5B57\u5E55",volume:"\u97F3\u91CF",live:"\u76F4\u64AD","video-info":"\u89C6\u9891\u7EDF\u8BA1\u4FE1\u606F"},"zh-tw":{"danmaku-loading":"\u5F48\u5E55\u8F09\u5165\u4E2D",top:"\u9802\u90E8",bottom:"\u5E95\u90E8",rolling:"\u6EFE\u52D5","input-danmaku-enter":"\u8F38\u5165\u5F48\u5E55\uFF0CEnter \u767C\u9001","about-author":"\u95DC\u65BC\u4F5C\u8005","dplayer-feedback":"\u64AD\u653E\u5668\u610F\u898B\u56DE\u994B","about-dplayer":"\u95DC\u65BC DPlayer \u64AD\u653E\u5668",loop:"\u5FAA\u74B0\u64AD\u653E",speed:"\u901F\u5EA6","opacity-danmaku":"\u5F48\u5E55\u900F\u660E\u5EA6",normal:"\u6B63\u5E38","please-input-danmaku":"\u8ACB\u8F38\u5165\u5F48\u5E55\u5167\u5BB9\u554A\uFF01","set-danmaku-color":"\u8A2D\u5B9A\u5F48\u5E55\u984F\u8272","set-danmaku-type":"\u8A2D\u5B9A\u5F48\u5E55\u985E\u578B","show-danmaku":"\u986F\u793A\u5F48\u5E55","video-failed":"\u5F71\u7247\u8F09\u5165\u5931\u6557","danmaku-failed":"\u5F48\u5E55\u8F09\u5165\u5931\u6557","danmaku-send-failed":"\u5F48\u5E55\u767C\u9001\u5931\u6557","switching-quality":"\u6B63\u5728\u5207\u63DB\u81F3 %q \u756B\u8CEA","switched-quality":"\u5DF2\u7D93\u5207\u63DB\u81F3 %q \u756B\u8CEA",ff:"\u5FEB\u9032 %s \u79D2",rew:"\u5FEB\u9000 %s \u79D2","unlimited-danmaku":"\u5DE8\u91CF\u5F48\u5E55","send-danmaku":"\u767C\u9001\u5F48\u5E55",setting:"\u8A2D\u5B9A",fullscreen:"\u5168\u87A2\u5E55","web-fullscreen":"\u9801\u9762\u5168\u87A2\u5E55",send:"\u767C\u9001",screenshot:"\u622A\u5716",airplay:"\u7121\u7DDA\u6295\u5C4F",chromecast:"ChromeCast",subtitle:"\u5B57\u5E55",off:"\u95DC\u9589","show-subs":"\u986F\u793A\u5B57\u5E55","hide-subs":"\u96B1\u85CF\u5B57\u5E55",volume:"\u97F3\u91CF",live:"\u76F4\u64AD","video-info":"\u5F71\u7247\u7D71\u8A08\u8A0A\u606F"},"ko-kr":{"danmaku-loading":"Danmaku\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4.",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Danmaku\uB97C \uC785\uB825\uD558\uACE0 Enter\uB97C \uB204\uB974\uC138\uC694.","about-author":"\uB9CC\uB4E0\uC774","dplayer-feedback":"\uD53C\uB4DC\uBC31 \uBCF4\uB0B4\uAE30","about-dplayer":"DPlayer \uC815\uBCF4",loop:"\uBC18\uBCF5",speed:"\uBC30\uC18D","opacity-danmaku":"Danmaku \uBD88\uD22C\uBA85\uB3C4",normal:"\uD45C\uC900","please-input-danmaku":"Danmaku\uB97C \uC785\uB825\uD558\uC138\uC694!","set-danmaku-color":"Danmaku \uC0C9\uC0C1","set-danmaku-type":"Danmaku \uC124\uC815","show-danmaku":"Danmaku \uD45C\uC2DC","video-failed":"\uBE44\uB514\uC624\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.","danmaku-failed":"Danmaku\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.","danmaku-send-failed":"Danmaku \uC804\uC1A1\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.","Switching to":"","Switched to":"","switching-quality":"\uC804\uD658 %q \uD654\uC9C8","switched-quality":"\uC804\uD658 \uB428 %q \uD654\uC9C8",ff:"\uC55E\uC73C\uB85C %s \uCD08",rew:"\uB4A4\uB85C %s \uCD08","unlimited-danmaku":"\uB05D\uC5C6\uB294 Danmaku","send-danmaku":"Danmaku \uBCF4\uB0B4\uAE30",setting:"\uC124\uC815",fullscreen:"\uC804\uCCB4 \uD654\uBA74","web-fullscreen":"\uC6F9 \uB0B4 \uC804\uCCB4\uD654\uBA74",send:"\uBCF4\uB0B4\uAE30",screenshot:"\uD654\uBA74 \uCEA1\uCCD0",airplay:"\uC5D0\uC5B4\uD50C\uB808\uC774",chromecast:"ChromeCast",subtitle:"\uBD80\uC81C",off:"\uB044\uB2E4","show-subs":"\uC790\uB9C9 \uBCF4\uC774\uAE30","hide-subs":"\uC790\uB9C9 \uC228\uAE30\uAE30",Volume:"\uBCFC\uB968",live:"\uC0DD\uBC29\uC1A1","video-info":"\uBE44\uB514\uC624 \uC815\uBCF4"},de:{"danmaku-loading":"Danmaku l\xE4dt...",top:"Oben",bottom:"Unten",rolling:"Rollend","input-danmaku-enter":"Dr\xFCcke Enter nach dem Einf\xFCgen vom Danmaku","about-author":"\xDCber den Autor","dplayer-feedback":"DPlayer Feedback","about-dplayer":"\xDCber DPlayer",loop:"Wiederholen",speed:"Geschwindigkeit","opacity-danmaku":"Transparenz f\xFCr Danmaku",normal:"Normal","please-input-danmaku":"Bitte Danmaku Inhalt eingeben!","set-danmaku-color":"Danmaku Farbe festlegen","set-danmaku-type":"Danmaku Typ festlegen","show-danmaku":"Zeige Danmaku","video-failed":"Das Video konnte nicht geladen werden","danmaku-failed":"Danmaku konnte nicht geladen werden","danmaku-send-failed":"Das senden von Danmaku ist fehgeschlagen","switching-quality":"Wechsle zur %q Qualit\xE4t","switched-quality":"Zur %q Qualit\xE4t gewechselt",ff:"%s s Vorw\xE4rts",rew:"%s s Zur\xFCck","unlimited-danmaku":"Unlimitiertes Danmaku","send-danmaku":"Sende Danmaku",setting:"Einstellungen",fullscreen:"Vollbild","web-fullscreen":"Browser Vollbild",send:"Senden",screenshot:"Screenshot",airplay:"AirPlay","show-subs":"Zeige Untertitel",chromecast:"ChromeCast",subtitle:"Untertitel",off:"Schlie\xDFung","hide-subs":"Verstecke Untertitel",volume:"Lautst\xE4rke",live:"Live","video-info":"Video Info"}},W=a(730),te=a.n(W),pe=a(6074),_e=a.n(pe),Be=a(4437),Ne=a.n(Be),U=a(2644),T=a.n(U),B=a(1324),H=a.n(B),J=a(4574),de=a.n(J),me=a(1415),Ae=a.n(me),xe=a(5934),be=a.n(xe),Te=a(1428),Z=a.n(Te),se=a(2807),De=a.n(se),Le=a(338),Ze=a.n(Le),nt=a(2254),bt=a.n(nt),Bt=a(1965),cr=a.n(Bt),ja=a(8113),Ua=a.n(ja),Gs=a(6251),un=a.n(Gs),$n=a(8410),Ks=a.n($n),yE=a(4182),AE=a.n(yE),bE=a(3193),EE=a.n(bE);const qn={play:te(),pause:_e(),volumeUp:Ne(),volumeDown:T(),volumeOff:H(),full:de(),fullWeb:Ae(),setting:be(),right:Z(),comment:De(),commentOff:Ze(),send:bt(),pallette:cr(),camera:Ua(),subtitle:Ks(),loading:AE(),airplay:un(),chromecast:EE()};var xE=a(1916),CE=a.n(xE);function Eh(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var wE=function(){function L(I){(function(q,G){if(!(q instanceof G))throw new TypeError("Cannot call a class as a function")})(this,L),this.container=I.container,this.options=I.options,this.index=I.index,this.tran=I.tran,this.init()}var P,O,E;return P=L,E=[{key:"NewNotice",value:function(I,q){var G=document.createElement("div");return G.classList.add("dplayer-notice"),G.style.opacity=q,G.innerText=I,G}}],(O=[{key:"init",value:function(){this.container.innerHTML=CE()({options:this.options,index:this.index,tran:this.tran,icons:qn,mobile:Y.isMobile,video:{current:!0,pic:this.options.video.pic,screenshot:this.options.screenshot,airplay:!(!Y.isSafari||Y.isChrome)&&this.options.airplay,chromecast:this.options.chromecast,preload:this.options.preload,url:this.options.video.url,subtitle:this.options.subtitle}}),this.volumeBar=this.container.querySelector(".dplayer-volume-bar-inner"),this.volumeBarWrap=this.container.querySelector(".dplayer-volume-bar"),this.volumeBarWrapWrap=this.container.querySelector(".dplayer-volume-bar-wrap"),this.volumeButton=this.container.querySelector(".dplayer-volume"),this.volumeButtonIcon=this.container.querySelector(".dplayer-volume-icon"),this.volumeIcon=this.container.querySelector(".dplayer-volume-icon .dplayer-icon-content"),this.playedBar=this.container.querySelector(".dplayer-played"),this.loadedBar=this.container.querySelector(".dplayer-loaded"),this.playedBarWrap=this.container.querySelector(".dplayer-bar-wrap"),this.playedBarTime=this.container.querySelector(".dplayer-bar-time"),this.danmaku=this.container.querySelector(".dplayer-danmaku"),this.danmakuLoading=this.container.querySelector(".dplayer-danloading"),this.video=this.container.querySelector(".dplayer-video-current"),this.bezel=this.container.querySelector(".dplayer-bezel-icon"),this.playButton=this.container.querySelector(".dplayer-play-icon"),this.mobilePlayButton=this.container.querySelector(".dplayer-mobile-play"),this.videoWrap=this.container.querySelector(".dplayer-video-wrap"),this.controllerMask=this.container.querySelector(".dplayer-controller-mask"),this.ptime=this.container.querySelector(".dplayer-ptime"),this.settingButton=this.container.querySelector(".dplayer-setting-icon"),this.settingBox=this.container.querySelector(".dplayer-setting-box"),this.mask=this.container.querySelector(".dplayer-mask"),this.loop=this.container.querySelector(".dplayer-setting-loop"),this.loopToggle=this.container.querySelector(".dplayer-setting-loop .dplayer-toggle-setting-input"),this.showDanmaku=this.container.querySelector(".dplayer-setting-showdan"),this.showDanmakuToggle=this.container.querySelector(".dplayer-showdan-setting-input"),this.unlimitDanmaku=this.container.querySelector(".dplayer-setting-danunlimit"),this.unlimitDanmakuToggle=this.container.querySelector(".dplayer-danunlimit-setting-input"),this.speed=this.container.querySelector(".dplayer-setting-speed"),this.speedItem=this.container.querySelectorAll(".dplayer-setting-speed-item"),this.danmakuOpacityBar=this.container.querySelector(".dplayer-danmaku-bar-inner"),this.danmakuOpacityBarWrap=this.container.querySelector(".dplayer-danmaku-bar"),this.danmakuOpacityBarWrapWrap=this.container.querySelector(".dplayer-danmaku-bar-wrap"),this.danmakuOpacityBox=this.container.querySelector(".dplayer-setting-danmaku"),this.dtime=this.container.querySelector(".dplayer-dtime"),this.controller=this.container.querySelector(".dplayer-controller"),this.commentInput=this.container.querySelector(".dplayer-comment-input"),this.commentButton=this.container.querySelector(".dplayer-comment-icon"),this.commentSettingBox=this.container.querySelector(".dplayer-comment-setting-box"),this.commentSettingButton=this.container.querySelector(".dplayer-comment-setting-icon"),this.commentSettingFill=this.container.querySelector(".dplayer-comment-setting-icon path"),this.commentSendButton=this.container.querySelector(".dplayer-send-icon"),this.commentSendFill=this.container.querySelector(".dplayer-send-icon path"),this.commentColorSettingBox=this.container.querySelector(".dplayer-comment-setting-color"),this.browserFullButton=this.container.querySelector(".dplayer-full-icon"),this.webFullButton=this.container.querySelector(".dplayer-full-in-icon"),this.menu=this.container.querySelector(".dplayer-menu"),this.menuItem=this.container.querySelectorAll(".dplayer-menu-item"),this.qualityList=this.container.querySelector(".dplayer-quality-list"),this.camareButton=this.container.querySelector(".dplayer-camera-icon"),this.airplayButton=this.container.querySelector(".dplayer-airplay-icon"),this.chromecastButton=this.container.querySelector(".dplayer-chromecast-icon"),this.subtitleButton=this.container.querySelector(".dplayer-subtitle-icon"),this.subtitleButtonInner=this.container.querySelector(".dplayer-subtitle-icon .dplayer-icon-content"),this.subtitlesButton=this.container.querySelector(".dplayer-subtitles-icon"),this.subtitlesBox=this.container.querySelector(".dplayer-subtitles-box"),this.subtitlesItem=this.container.querySelectorAll(".dplayer-subtitles-item"),this.subtitle=this.container.querySelector(".dplayer-subtitle"),this.subtrack=this.container.querySelector(".dplayer-subtrack"),this.qualityButton=this.container.querySelector(".dplayer-quality-icon"),this.barPreview=this.container.querySelector(".dplayer-bar-preview"),this.barWrap=this.container.querySelector(".dplayer-bar-wrap"),this.noticeList=this.container.querySelector(".dplayer-notice-list"),this.infoPanel=this.container.querySelector(".dplayer-info-panel"),this.infoPanelClose=this.container.querySelector(".dplayer-info-panel-close"),this.infoVersion=this.container.querySelector(".dplayer-info-panel-item-version .dplayer-info-panel-item-data"),this.infoFPS=this.container.querySelector(".dplayer-info-panel-item-fps .dplayer-info-panel-item-data"),this.infoType=this.container.querySelector(".dplayer-info-panel-item-type .dplayer-info-panel-item-data"),this.infoUrl=this.container.querySelector(".dplayer-info-panel-item-url .dplayer-info-panel-item-data"),this.infoResolution=this.container.querySelector(".dplayer-info-panel-item-resolution .dplayer-info-panel-item-data"),this.infoDuration=this.container.querySelector(".dplayer-info-panel-item-duration .dplayer-info-panel-item-data"),this.infoDanmakuId=this.container.querySelector(".dplayer-info-panel-item-danmaku-id .dplayer-info-panel-item-data"),this.infoDanmakuApi=this.container.querySelector(".dplayer-info-panel-item-danmaku-api .dplayer-info-panel-item-data"),this.infoDanmakuAmount=this.container.querySelector(".dplayer-info-panel-item-danmaku-amount .dplayer-info-panel-item-data")}}])&&Eh(P.prototype,O),E&&Eh(P,E),Object.defineProperty(P,"prototype",{writable:!1}),L}();const xh=wE;function mu(L){return mu=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(P){return typeof P}:function(P){return P&&typeof Symbol=="function"&&P.constructor===Symbol&&P!==Symbol.prototype?"symbol":typeof P},mu(L)}function _E(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var SE=function(){function L(E){(function(I,q){if(!(I instanceof q))throw new TypeError("Cannot call a class as a function")})(this,L),this.options=E,this.player=this.options.player,this.container=this.options.container,this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.dan=[],this.showing=!0,this._opacity=this.options.opacity,this.events=this.options.events,this.unlimited=this.options.unlimited,this._measure(""),this.load()}var P,O;return P=L,O=[{key:"load",value:function(){var E,I=this;E=this.options.api.maximum?"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id,"&max=").concat(this.options.api.maximum):"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id);var q=(this.options.api.addition||[]).slice(0);q.push(E),this.events&&this.events.trigger("danmaku_load_start",q),this._readAllEndpoints(q,function(G){I.dan=[].concat.apply([],G).sort(function(he,Ce){return he.time-Ce.time}),window.requestAnimationFrame(function(){I.frame()}),I.options.callback(),I.events&&I.events.trigger("danmaku_load_end")})}},{key:"reload",value:function(E){this.options.api=E,this.dan=[],this.clear(),this.load()}},{key:"_readAllEndpoints",value:function(E,I){for(var q=this,G=[],he=0,Ce=function(pt){q.options.apiBackend.read({url:E[pt],success:function(kt){G[pt]=kt,++he===E.length&&I(G)},error:function(kt){q.options.error(kt||q.options.tran("danmaku-failed")),G[pt]=[],++he===E.length&&I(G)}})},Pe=0;Pe<E.length;++Pe)Ce(Pe)}},{key:"send",value:function(E,I){var q=this,G={token:this.options.api.token,id:this.options.api.id,author:this.options.api.user,time:this.options.time(),text:E.text,color:E.color,type:E.type};this.options.apiBackend.send({url:this.options.api.address+"v3/",data:G,success:I,error:function(Ce){q.options.error(Ce||q.options.tran("danmaku-failed"))}}),this.dan.splice(this.danIndex,0,G),this.danIndex++;var he={text:this.htmlEncode(G.text),color:G.color,type:G.type,border:"2px solid ".concat(this.options.borderColor)};this.draw(he),this.events&&this.events.trigger("danmaku_send",G)}},{key:"frame",value:function(){var E=this;if(this.dan.length&&!this.paused&&this.showing){for(var I=this.dan[this.danIndex],q=[];I&&this.options.time()>parseFloat(I.time);)q.push(I),I=this.dan[++this.danIndex];this.draw(q)}window.requestAnimationFrame(function(){E.frame()})}},{key:"opacity",value:function(E){if(E!==void 0){for(var I=this.container.getElementsByClassName("dplayer-danmaku-item"),q=0;q<I.length;q++)I[q].style.opacity=E;this._opacity=E,this.events&&this.events.trigger("danmaku_opacity",this._opacity)}return this._opacity}},{key:"draw",value:function(E){var I=this;if(this.showing){var q=this.options.height,G=this.container.offsetWidth,he=this.container.offsetHeight,Ce=parseInt(he/q),Pe=function(Je){var gt=Je.offsetWidth||parseInt(Je.style.width),wo=Je.getBoundingClientRect().right||I.container.getBoundingClientRect().right+gt;return I.container.getBoundingClientRect().right-wo},pt=function(Je){return(G+Je)/5},kt=function(Je,gt,wo){for(var Ir=G/pt(wo),Lx=function(Va){var _o=I.danTunnel[gt][Va+""];if(!_o||!_o.length)return I.danTunnel[gt][Va+""]=[Je],Je.addEventListener("animationend",function(){I.danTunnel[gt][Va+""].splice(0,1)}),{v:Va%Ce};if(gt!=="right")return"continue";for(var Di=0;Di<_o.length;Di++){var Mh=Pe(_o[Di])-10;if(Mh<=G-Ir*pt(parseInt(_o[Di].style.width))||Mh<=0)break;if(Di===_o.length-1)return I.danTunnel[gt][Va+""].push(Je),Je.addEventListener("animationend",function(){I.danTunnel[gt][Va+""].splice(0,1)}),{v:Va%Ce}}},wu=0;I.unlimited||wu<Ce;wu++){var _u=Lx(wu);if(_u!=="continue"&&mu(_u)==="object")return _u.v}return-1};Object.prototype.toString.call(E)!=="[object Array]"&&(E=[E]);for(var ur=document.createDocumentFragment(),Dn=function(Je){E[Je].type=Y.number2Type(E[Je].type),E[Je].color||(E[Je].color=16777215);var gt=document.createElement("div");gt.classList.add("dplayer-danmaku-item"),gt.classList.add("dplayer-danmaku-".concat(E[Je].type)),E[Je].border?gt.innerHTML='<span style="border:'.concat(E[Je].border,'">').concat(E[Je].text,"</span>"):gt.innerHTML=E[Je].text,gt.style.opacity=I._opacity,gt.style.color=Y.number2Color(E[Je].color),gt.addEventListener("animationend",function(){I.container.removeChild(gt)});var wo=I._measure(E[Je].text),Ir=void 0;switch(E[Je].type){case"right":(Ir=kt(gt,E[Je].type,wo))>=0&&(gt.style.width=wo+1+"px",gt.style.top=q*Ir+"px",gt.style.transform="translateX(-".concat(G,"px)"));break;case"top":(Ir=kt(gt,E[Je].type))>=0&&(gt.style.top=q*Ir+"px");break;case"bottom":(Ir=kt(gt,E[Je].type))>=0&&(gt.style.bottom=q*Ir+"px");break;default:console.error("Can't handled danmaku type: ".concat(E[Je].type))}Ir>=0&&(gt.classList.add("dplayer-danmaku-move"),gt.style.animationDuration=I._danAnimation(E[Je].type),ur.appendChild(gt))},Jr=0;Jr<E.length;Jr++)Dn(Jr);return this.container.appendChild(ur),ur}}},{key:"play",value:function(){this.paused=!1}},{key:"pause",value:function(){this.paused=!0}},{key:"_measure",value:function(E){if(!this.context){var I=getComputedStyle(this.container.getElementsByClassName("dplayer-danmaku-item")[0],null);this.context=document.createElement("canvas").getContext("2d"),this.context.font=I.getPropertyValue("font")}return this.context.measureText(E).width}},{key:"seek",value:function(){this.clear();for(var E=0;E<this.dan.length;E++){if(this.dan[E].time>=this.options.time()){this.danIndex=E;break}this.danIndex=this.dan.length}}},{key:"clear",value:function(){this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.options.container.innerHTML="",this.events&&this.events.trigger("danmaku_clear")}},{key:"htmlEncode",value:function(E){return E.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2f;")}},{key:"resize",value:function(){for(var E=this.container.offsetWidth,I=this.container.getElementsByClassName("dplayer-danmaku-item"),q=0;q<I.length;q++)I[q].style.transform="translateX(-".concat(E,"px)")}},{key:"hide",value:function(){this.showing=!1,this.pause(),this.clear(),this.events&&this.events.trigger("danmaku_hide")}},{key:"show",value:function(){this.seek(),this.showing=!0,this.play(),this.events&&this.events.trigger("danmaku_show")}},{key:"unlimit",value:function(E){this.unlimited=E}},{key:"speed",value:function(E){this.options.api.speedRate=E}},{key:"_danAnimation",value:function(E){var I=this.options.api.speedRate||1,q=!!this.player.fullScreen.isFullScreen();return{top:"".concat((q?6:4)/I,"s"),right:"".concat((q?8:5)/I,"s"),bottom:"".concat((q?6:4)/I,"s")}[E]}}],O&&_E(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const kE=SE;function TE(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}const IE=function(){function L(){(function(E,I){if(!(E instanceof I))throw new TypeError("Cannot call a class as a function")})(this,L),this.events={},this.videoEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],this.playerEvents=["screenshot","thumbnails_show","thumbnails_hide","danmaku_show","danmaku_hide","danmaku_clear","danmaku_loaded","danmaku_send","danmaku_opacity","contextmenu_show","contextmenu_hide","notice_show","notice_hide","quality_start","quality_end","destroy","resize","fullscreen","fullscreen_cancel","webfullscreen","webfullscreen_cancel","subtitle_show","subtitle_hide","subtitle_change"]}var P,O;return P=L,(O=[{key:"on",value:function(E,I){this.type(E)&&typeof I=="function"&&(this.events[E]||(this.events[E]=[]),this.events[E].push(I))}},{key:"trigger",value:function(E,I){if(this.events[E]&&this.events[E].length)for(var q=0;q<this.events[E].length;q++)this.events[E][q](I)}},{key:"type",value:function(E){return this.playerEvents.indexOf(E)!==-1?"player":this.videoEvents.indexOf(E)!==-1?"video":(console.error("Unknown event name: ".concat(E)),null)}}])&&TE(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();function OE(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var BE=function(){function L(E){var I=this;(function(q,G){if(!(q instanceof G))throw new TypeError("Cannot call a class as a function")})(this,L),this.player=E,this.lastScrollPosition={left:0,top:0},this.player.events.on("webfullscreen",function(){I.player.resize()}),this.player.events.on("webfullscreen_cancel",function(){I.player.resize(),Y.setScrollPosition(I.lastScrollPosition)}),this.fullscreenchange=function(){I.player.resize(),I.isFullScreen("browser")?I.player.events.trigger("fullscreen"):(Y.setScrollPosition(I.lastScrollPosition),I.player.events.trigger("fullscreen_cancel"))},this.docfullscreenchange=function(){var q=document.fullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;q&&q!==I.player.container||(I.player.resize(),q?I.player.events.trigger("fullscreen"):(Y.setScrollPosition(I.lastScrollPosition),I.player.events.trigger("fullscreen_cancel")))},/Firefox/.test(navigator.userAgent)?(document.addEventListener("mozfullscreenchange",this.docfullscreenchange),document.addEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.addEventListener("fullscreenchange",this.fullscreenchange),this.player.container.addEventListener("webkitfullscreenchange",this.fullscreenchange),document.addEventListener("msfullscreenchange",this.docfullscreenchange),document.addEventListener("MSFullscreenChange",this.docfullscreenchange))}var P,O;return P=L,O=[{key:"isFullScreen",value:function(){var E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(E){case"browser":return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;case"web":return this.player.container.classList.contains("dplayer-fulled")}}},{key:"request",value:function(){var E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser",I=E==="browser"?"web":"browser",q=this.isFullScreen(I);switch(q||(this.lastScrollPosition=Y.getScrollPosition()),E){case"browser":this.player.container.requestFullscreen?this.player.container.requestFullscreen():this.player.container.mozRequestFullScreen?this.player.container.mozRequestFullScreen():this.player.container.webkitRequestFullscreen?this.player.container.webkitRequestFullscreen():this.player.video.webkitEnterFullscreen?this.player.video.webkitEnterFullscreen():this.player.video.webkitEnterFullScreen?this.player.video.webkitEnterFullScreen():this.player.container.msRequestFullscreen&&this.player.container.msRequestFullscreen();break;case"web":this.player.container.classList.add("dplayer-fulled"),document.body.classList.add("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen")}q&&this.cancel(I)}},{key:"cancel",value:function(){var E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(E){case"browser":document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.webkitCancelFullscreen?document.webkitCancelFullscreen():document.msCancelFullScreen?document.msCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen();break;case"web":this.player.container.classList.remove("dplayer-fulled"),document.body.classList.remove("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen_cancel")}}},{key:"toggle",value:function(){var E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";this.isFullScreen(E)?this.cancel(E):this.request(E)}},{key:"destroy",value:function(){/Firefox/.test(navigator.userAgent)?(document.removeEventListener("mozfullscreenchange",this.docfullscreenchange),document.removeEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.removeEventListener("fullscreenchange",this.fullscreenchange),this.player.container.removeEventListener("webkitfullscreenchange",this.fullscreenchange),document.removeEventListener("msfullscreenchange",this.docfullscreenchange),document.removeEventListener("MSFullscreenChange",this.docfullscreenchange))}}],O&&OE(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const LE=BE;function PE(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var $E=function(){function L(E){(function(I,q){if(!(I instanceof q))throw new TypeError("Cannot call a class as a function")})(this,L),this.storageName={opacity:"dplayer-danmaku-opacity",volume:"dplayer-volume",unlimited:"dplayer-danmaku-unlimited",danmaku:"dplayer-danmaku-show",subtitle:"dplayer-subtitle-show"},this.default={opacity:.7,volume:E.options.hasOwnProperty("volume")?E.options.volume:.7,unlimited:(E.options.danmaku&&E.options.danmaku.unlimited?1:0)||0,danmaku:1,subtitle:1},this.data={},this.init()}var P,O;return P=L,(O=[{key:"init",value:function(){for(var E in this.storageName){var I=this.storageName[E];this.data[E]=parseFloat(Y.storage.get(I)||this.default[E])}}},{key:"get",value:function(E){return this.data[E]}},{key:"set",value:function(E,I){this.data[E]=I,Y.storage.set(this.storageName[E],I)}}])&&PE(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const DE=$E;function RE(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var ME=function(){function L(E,I,q,G){(function(he,Ce){if(!(he instanceof Ce))throw new TypeError("Cannot call a class as a function")})(this,L),this.container=E,this.video=I,this.options=q,this.events=G,this.init()}var P,O;return P=L,O=[{key:"init",value:function(){var E=this;if(this.container.style.fontSize=this.options.fontSize,this.container.style.bottom=this.options.bottom,this.container.style.color=this.options.color,this.video.textTracks&&this.video.textTracks[0]){var I=this.video.textTracks[0];I.oncuechange=function(){var q=I.activeCues[I.activeCues.length-1];if(E.container.innerHTML="",q){var G=document.createElement("div");G.appendChild(q.getCueAsHTML());var he=G.innerHTML.split(/\r?\n/).map(function(Ce){return"<p>".concat(Ce,"</p>")}).join("");E.container.innerHTML=he}E.events.trigger("subtitle_change")}}}},{key:"show",value:function(){this.container.classList.remove("dplayer-subtitle-hide"),this.events.trigger("subtitle_show")}},{key:"hide",value:function(){this.container.classList.add("dplayer-subtitle-hide"),this.events.trigger("subtitle_hide")}},{key:"toggle",value:function(){this.container.classList.contains("dplayer-subtitle-hide")?this.show():this.hide()}}],O&&RE(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const NE=ME;function FE(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var zE=function(){function L(E){var I=this;(function(Ce,Pe){if(!(Ce instanceof Pe))throw new TypeError("Cannot call a class as a function")})(this,L),this.player=E,this.player.template.mask.addEventListener("click",function(){I.hide()}),this.player.template.subtitlesButton.addEventListener("click",function(){I.adaptiveHeight(),I.show()});for(var q=this.player.template.subtitlesItem.length-1,G=function(Ce){I.player.template.subtitlesItem[Ce].addEventListener("click",function(){I.hide(),I.player.options.subtitle.index!==Ce&&(I.player.template.subtitle.innerHTML="<p></p>",I.player.template.subtrack.src=I.player.template.subtitlesItem[Ce].dataset.subtitle,I.player.options.subtitle.index=Ce,I.player.template.subtitle.classList.contains("dplayer-subtitle-hide")&&I.subContainerShow())})},he=0;he<q;he++)G(he);this.player.template.subtitlesItem[q].addEventListener("click",function(){I.hide(),I.player.options.subtitle.index!==q&&(I.player.template.subtitle.innerHTML="<p></p>",I.player.template.subtrack.src="",I.player.options.subtitle.index=q,I.subContainerHide())})}var P,O;return P=L,(O=[{key:"subContainerShow",value:function(){this.player.template.subtitle.classList.remove("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_show")}},{key:"subContainerHide",value:function(){this.player.template.subtitle.classList.add("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_hide")}},{key:"hide",value:function(){this.player.template.subtitlesBox.classList.remove("dplayer-subtitles-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.subtitlesBox.classList.add("dplayer-subtitles-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}},{key:"adaptiveHeight",value:function(){var E=30*this.player.template.subtitlesItem.length+14,I=.8*this.player.template.videoWrap.offsetHeight;E>=I-50?(this.player.template.subtitlesBox.style.bottom="8px",this.player.template.subtitlesBox.style["max-height"]=I-8+"px"):(this.player.template.subtitlesBox.style.bottom="50px",this.player.template.subtitlesBox.style["max-height"]=I-50+"px")}}])&&FE(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const jE=zE;function UE(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var VE=function(){function L(E){(function(I,q){if(!(I instanceof q))throw new TypeError("Cannot call a class as a function")})(this,L),this.elements={},this.elements.volume=E.volumeBar,this.elements.played=E.playedBar,this.elements.loaded=E.loadedBar,this.elements.danmaku=E.danmakuOpacityBar}var P,O;return P=L,(O=[{key:"set",value:function(E,I,q){I=Math.max(I,0),I=Math.min(I,1),this.elements[E].style[q]=100*I+"%"}},{key:"get",value:function(E){return parseFloat(this.elements[E].style.width)/100}}])&&UE(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const HE=VE;function WE(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var qE=function(){function L(E){(function(I,q){if(!(I instanceof q))throw new TypeError("Cannot call a class as a function")})(this,L),this.player=E,window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(I){window.setTimeout(I,1e3/60)},this.types=["loading","info","fps"],this.init()}var P,O;return P=L,(O=[{key:"init",value:function(){var E=this;this.types.map(function(I){return I!=="fps"&&E["init".concat(I,"Checker")](),I})}},{key:"initloadingChecker",value:function(){var E=this,I=0,q=0,G=!1;this.loadingChecker=setInterval(function(){E.enableloadingChecker&&(q=E.player.video.currentTime,G||q!==I||E.player.video.paused||(E.player.container.classList.add("dplayer-loading"),G=!0),G&&q>I&&!E.player.video.paused&&(E.player.container.classList.remove("dplayer-loading"),G=!1),I=q)},100)}},{key:"initfpsChecker",value:function(){var E=this;window.requestAnimationFrame(function(){if(E.enablefpsChecker)if(E.initfpsChecker(),E.fpsStart){E.fpsIndex++;var I=new Date;I-E.fpsStart>1e3&&(E.player.infoPanel.fps(E.fpsIndex/(I-E.fpsStart)*1e3),E.fpsStart=new Date,E.fpsIndex=0)}else E.fpsStart=new Date,E.fpsIndex=0;else E.fpsStart=0,E.fpsIndex=0})}},{key:"initinfoChecker",value:function(){var E=this;this.infoChecker=setInterval(function(){E.enableinfoChecker&&E.player.infoPanel.update()},1e3)}},{key:"enable",value:function(E){this["enable".concat(E,"Checker")]=!0,E==="fps"&&this.initfpsChecker()}},{key:"disable",value:function(E){this["enable".concat(E,"Checker")]=!1}},{key:"destroy",value:function(){var E=this;this.types.map(function(I){return E["enable".concat(I,"Checker")]=!1,E["".concat(I,"Checker")]&&clearInterval(E["".concat(I,"Checker")]),I})}}])&&WE(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const YE=qE;function GE(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}const KE=function(){function L(E){var I=this;(function(q,G){if(!(q instanceof G))throw new TypeError("Cannot call a class as a function")})(this,L),this.container=E,this.container.addEventListener("animationend",function(){I.container.classList.remove("dplayer-bezel-transition")})}var P,O;return P=L,(O=[{key:"switch",value:function(E){this.container.innerHTML=E,this.container.classList.add("dplayer-bezel-transition")}}])&&GE(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();function QE(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var XE=function(){function L(E){(function(I,q){if(!(I instanceof q))throw new TypeError("Cannot call a class as a function")})(this,L),this.container=E.container,this.barWidth=E.barWidth,this.container.style.backgroundImage="url('".concat(E.url,"')"),this.events=E.events}var P,O;return P=L,(O=[{key:"resize",value:function(E,I,q){this.container.style.width="".concat(E,"px"),this.container.style.height="".concat(I,"px"),this.container.style.top="".concat(2-I,"px"),this.barWidth=q}},{key:"show",value:function(){this.container.style.display="block",this.events&&this.events.trigger("thumbnails_show")}},{key:"move",value:function(E){this.container.style.backgroundPosition="-".concat(160*(Math.ceil(E/this.barWidth*100)-1),"px 0"),this.container.style.left="".concat(Math.min(Math.max(E-this.container.offsetWidth/2,-10),this.barWidth-150),"px")}},{key:"hide",value:function(){this.container.style.display="none",this.events&&this.events.trigger("thumbnails_hide")}}])&&QE(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const ZE=XE;var gu=function(L,P){return gu=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(O,E){O.__proto__=E}||function(O,E){for(var I in E)Object.prototype.hasOwnProperty.call(E,I)&&(O[I]=E[I])},gu(L,P)};function Qs(L,P){if(typeof P!="function"&&P!==null)throw new TypeError("Class extends value "+String(P)+" is not a constructor or null");function O(){this.constructor=L}gu(L,P),L.prototype=P===null?Object.create(P):(O.prototype=P.prototype,new O)}function vu(L){var P=typeof Symbol=="function"&&Symbol.iterator,O=P&&L[P],E=0;if(O)return O.call(L);if(L&&typeof L.length=="number")return{next:function(){return L&&E>=L.length&&(L=void 0),{value:L&&L[E++],done:!L}}};throw new TypeError(P?"Object is not iterable.":"Symbol.iterator is not defined.")}function Xs(L,P){var O=typeof Symbol=="function"&&L[Symbol.iterator];if(!O)return L;var E,I,q=O.call(L),G=[];try{for(;(P===void 0||P-- >0)&&!(E=q.next()).done;)G.push(E.value)}catch(he){I={error:he}}finally{try{E&&!E.done&&(O=q.return)&&O.call(q)}finally{if(I)throw I.error}}return G}function Zs(L,P,O){if(O||arguments.length===2)for(var E,I=0,q=P.length;I<q;I++)!E&&I in P||(E||(E=Array.prototype.slice.call(P,0,I)),E[I]=P[I]);return L.concat(E||Array.prototype.slice.call(P))}function Tr(L){return typeof L=="function"}function Ch(L){var P=L(function(O){Error.call(O),O.stack=new Error().stack});return P.prototype=Object.create(Error.prototype),P.prototype.constructor=P,P}var yu=Ch(function(L){return function(P){L(this),this.message=P?P.length+` errors occurred during unsubscription:
`+P.map(function(O,E){return E+1+") "+O.toString()}).join(""):"",this.name="UnsubscriptionError",this.errors=P}});function Au(L,P){if(L){var O=L.indexOf(P);0<=O&&L.splice(O,1)}}var Js=function(){function L(O){this.initialTeardown=O,this.closed=!1,this._parentage=null,this._finalizers=null}var P;return L.prototype.unsubscribe=function(){var O,E,I,q,G;if(!this.closed){this.closed=!0;var he=this._parentage;if(he)if(this._parentage=null,Array.isArray(he))try{for(var Ce=vu(he),Pe=Ce.next();!Pe.done;Pe=Ce.next())Pe.value.remove(this)}catch(Je){O={error:Je}}finally{try{Pe&&!Pe.done&&(E=Ce.return)&&E.call(Ce)}finally{if(O)throw O.error}}else he.remove(this);var pt=this.initialTeardown;if(Tr(pt))try{pt()}catch(Je){G=Je instanceof yu?Je.errors:[Je]}var kt=this._finalizers;if(kt){this._finalizers=null;try{for(var ur=vu(kt),Dn=ur.next();!Dn.done;Dn=ur.next()){var Jr=Dn.value;try{Sh(Jr)}catch(Je){G=G!=null?G:[],Je instanceof yu?G=Zs(Zs([],Xs(G)),Xs(Je.errors)):G.push(Je)}}}catch(Je){I={error:Je}}finally{try{Dn&&!Dn.done&&(q=ur.return)&&q.call(ur)}finally{if(I)throw I.error}}}if(G)throw new yu(G)}},L.prototype.add=function(O){var E;if(O&&O!==this)if(this.closed)Sh(O);else{if(O instanceof L){if(O.closed||O._hasParent(this))return;O._addParent(this)}(this._finalizers=(E=this._finalizers)!==null&&E!==void 0?E:[]).push(O)}},L.prototype._hasParent=function(O){var E=this._parentage;return E===O||Array.isArray(E)&&E.includes(O)},L.prototype._addParent=function(O){var E=this._parentage;this._parentage=Array.isArray(E)?(E.push(O),E):E?[E,O]:O},L.prototype._removeParent=function(O){var E=this._parentage;E===O?this._parentage=null:Array.isArray(E)&&Au(E,O)},L.prototype.remove=function(O){var E=this._finalizers;E&&Au(E,O),O instanceof L&&O._removeParent(this)},L.EMPTY=((P=new L).closed=!0,P),L}(),wh=Js.EMPTY;function _h(L){return L instanceof Js||L&&"closed"in L&&Tr(L.remove)&&Tr(L.add)&&Tr(L.unsubscribe)}function Sh(L){Tr(L)?L():L.unsubscribe()}var JE=void 0,ex=!1,bu={setTimeout:function(L){function P(O,E){return L.apply(this,arguments)}return P.toString=function(){return L.toString()},P}(function(L,P){for(var O=[],E=2;E<arguments.length;E++)O[E-2]=arguments[E];var I=bu.delegate;return I!=null&&I.setTimeout?I.setTimeout.apply(I,Zs([L,P],Xs(O))):setTimeout.apply(void 0,Zs([L,P],Xs(O)))}),clearTimeout:function(L){function P(O){return L.apply(this,arguments)}return P.toString=function(){return L.toString()},P}(function(L){var P=bu.delegate;return((P==null?void 0:P.clearTimeout)||clearTimeout)(L)}),delegate:void 0};function kh(){}function el(L){L()}var Th=function(L){function P(O){var E=L.call(this)||this;return E.isStopped=!1,O?(E.destination=O,_h(O)&&O.add(E)):E.destination=rx,E}return Qs(P,L),P.create=function(O,E,I){return new xu(O,E,I)},P.prototype.next=function(O){this.isStopped?void 0:this._next(O)},P.prototype.error=function(O){this.isStopped?void 0:(this.isStopped=!0,this._error(O))},P.prototype.complete=function(){this.isStopped?void 0:(this.isStopped=!0,this._complete())},P.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,L.prototype.unsubscribe.call(this),this.destination=null)},P.prototype._next=function(O){this.destination.next(O)},P.prototype._error=function(O){try{this.destination.error(O)}finally{this.unsubscribe()}},P.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},P}(Js),tx=Function.prototype.bind;function Eu(L,P){return tx.call(L,P)}var nx=function(){function L(P){this.partialObserver=P}return L.prototype.next=function(P){var O=this.partialObserver;if(O.next)try{O.next(P)}catch(E){tl(E)}},L.prototype.error=function(P){var O=this.partialObserver;if(O.error)try{O.error(P)}catch(E){tl(E)}else tl(P)},L.prototype.complete=function(){var P=this.partialObserver;if(P.complete)try{P.complete()}catch(O){tl(O)}},L}(),xu=function(L){function P(O,E,I){var q,G,he=L.call(this)||this;return Tr(O)||!O?q={next:O!=null?O:void 0,error:E!=null?E:void 0,complete:I!=null?I:void 0}:he&&ex?((G=Object.create(O)).unsubscribe=function(){return he.unsubscribe()},q={next:O.next&&Eu(O.next,G),error:O.error&&Eu(O.error,G),complete:O.complete&&Eu(O.complete,G)}):q=O,he.destination=new nx(q),he}return Qs(P,L),P}(Th);function tl(L){(function(P){bu.setTimeout(function(){throw P})})(L)}function MH(L,P){}var rx={closed:!0,next:kh,error:function(L){throw L},complete:kh},ax=typeof Symbol=="function"&&Symbol.observable||"@@observable";function ox(L){return L}function ix(L){return L.length===0?ox:L.length===1?L[0]:function(P){return L.reduce(function(O,E){return E(O)},P)}}var Ih=function(){function L(P){P&&(this._subscribe=P)}return L.prototype.lift=function(P){var O=new L;return O.source=this,O.operator=P,O},L.prototype.subscribe=function(P,O,E){var I,q=this,G=(I=P)&&I instanceof Th||function(he){return he&&Tr(he.next)&&Tr(he.error)&&Tr(he.complete)}(I)&&_h(I)?P:new xu(P,O,E);return el(function(){var he=q,Ce=he.operator,Pe=he.source;G.add(Ce?Ce.call(G,Pe):Pe?q._subscribe(G):q._trySubscribe(G))}),G},L.prototype._trySubscribe=function(P){try{return this._subscribe(P)}catch(O){P.error(O)}},L.prototype.forEach=function(P,O){var E=this;return new(O=Oh(O))(function(I,q){var G=new xu({next:function(he){try{P(he)}catch(Ce){q(Ce),G.unsubscribe()}},error:q,complete:I});E.subscribe(G)})},L.prototype._subscribe=function(P){var O;return(O=this.source)===null||O===void 0?void 0:O.subscribe(P)},L.prototype[ax]=function(){return this},L.prototype.pipe=function(){for(var P=[],O=0;O<arguments.length;O++)P[O]=arguments[O];return ix(P)(this)},L.prototype.toPromise=function(P){var O=this;return new(P=Oh(P))(function(E,I){var q;O.subscribe(function(G){return q=G},function(G){return I(G)},function(){return E(q)})})},L.create=function(P){return new L(P)},L}();function Oh(L){var P;return(P=L!=null?L:JE)!==null&&P!==void 0?P:Promise}var Zr,sx=Ch(function(L){return function(){L(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),Bh=function(L){function P(){var O=L.call(this)||this;return O.closed=!1,O.currentObservers=null,O.observers=[],O.isStopped=!1,O.hasError=!1,O.thrownError=null,O}return Qs(P,L),P.prototype.lift=function(O){var E=new Lh(this,this);return E.operator=O,E},P.prototype._throwIfClosed=function(){if(this.closed)throw new sx},P.prototype.next=function(O){var E=this;el(function(){var I,q;if(E._throwIfClosed(),!E.isStopped){E.currentObservers||(E.currentObservers=Array.from(E.observers));try{for(var G=vu(E.currentObservers),he=G.next();!he.done;he=G.next())he.value.next(O)}catch(Ce){I={error:Ce}}finally{try{he&&!he.done&&(q=G.return)&&q.call(G)}finally{if(I)throw I.error}}}})},P.prototype.error=function(O){var E=this;el(function(){if(E._throwIfClosed(),!E.isStopped){E.hasError=E.isStopped=!0,E.thrownError=O;for(var I=E.observers;I.length;)I.shift().error(O)}})},P.prototype.complete=function(){var O=this;el(function(){if(O._throwIfClosed(),!O.isStopped){O.isStopped=!0;for(var E=O.observers;E.length;)E.shift().complete()}})},P.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(P.prototype,"observed",{get:function(){var O;return((O=this.observers)===null||O===void 0?void 0:O.length)>0},enumerable:!1,configurable:!0}),P.prototype._trySubscribe=function(O){return this._throwIfClosed(),L.prototype._trySubscribe.call(this,O)},P.prototype._subscribe=function(O){return this._throwIfClosed(),this._checkFinalizedStatuses(O),this._innerSubscribe(O)},P.prototype._innerSubscribe=function(O){var E=this,I=this,q=I.hasError,G=I.isStopped,he=I.observers;return q||G?wh:(this.currentObservers=null,he.push(O),new Js(function(){E.currentObservers=null,Au(he,O)}))},P.prototype._checkFinalizedStatuses=function(O){var E=this,I=E.hasError,q=E.thrownError,G=E.isStopped;I?O.error(q):G&&O.complete()},P.prototype.asObservable=function(){var O=new Ih;return O.source=this,O},P.create=function(O,E){return new Lh(O,E)},P}(Ih),Lh=function(L){function P(O,E){var I=L.call(this)||this;return I.destination=O,I.source=E,I}return Qs(P,L),P.prototype.next=function(O){var E,I;(I=(E=this.destination)===null||E===void 0?void 0:E.next)===null||I===void 0||I.call(E,O)},P.prototype.error=function(O){var E,I;(I=(E=this.destination)===null||E===void 0?void 0:E.error)===null||I===void 0||I.call(E,O)},P.prototype.complete=function(){var O,E;(E=(O=this.destination)===null||O===void 0?void 0:O.complete)===null||E===void 0||E.call(O)},P.prototype._subscribe=function(O){var E,I;return(I=(E=this.source)===null||E===void 0?void 0:E.subscribe(O))!==null&&I!==void 0?I:wh},P}(Bh);function lx(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var Ph=!0,Cu=!1,cx=function(){function L(E){(function(I,q){if(!(I instanceof q))throw new TypeError("Cannot call a class as a function")})(this,L),this.player=E,this.autoHideTimer=0,Y.isMobile||(this.setAutoHideHandler=this.setAutoHide.bind(this),this.player.container.addEventListener("mousemove",this.setAutoHideHandler),this.player.container.addEventListener("click",this.setAutoHideHandler),this.player.on("play",this.setAutoHideHandler),this.player.on("pause",this.setAutoHideHandler)),this.initPlayButton(),this.initThumbnails(),this.initPlayedBar(),this.initFullButton(),this.initQualityButton(),this.initScreenshotButton(),this.player.options.subtitle&&typeof this.player.options.subtitle.url=="string"&&this.initSubtitleButton(),this.initHighlights(),this.initAirplayButton(),this.initChromecastButton(),Y.isMobile||this.initVolumeButton()}var P,O;return P=L,(O=[{key:"initPlayButton",value:function(){var E=this;this.player.template.playButton.addEventListener("click",function(){E.player.toggle()}),this.player.template.mobilePlayButton.addEventListener("click",function(){E.player.toggle()}),Y.isMobile?(this.player.template.videoWrap.addEventListener("click",function(){E.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){E.toggle()})):this.player.options.preventClickToggle||(this.player.template.videoWrap.addEventListener("click",function(){E.player.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){E.player.toggle()}))}},{key:"initHighlights",value:function(){var E=this;this.player.on("durationchange",function(){if(E.player.video.duration!==1&&E.player.video.duration!==1/0&&E.player.options.highlight){var I=E.player.template.playedBarWrap.querySelectorAll(".dplayer-highlight");[].slice.call(I,0).forEach(function(he){E.player.template.playedBarWrap.removeChild(he)});for(var q=0;q<E.player.options.highlight.length;q++)if(E.player.options.highlight[q].text&&E.player.options.highlight[q].time){var G=document.createElement("div");G.classList.add("dplayer-highlight"),G.style.left=E.player.options.highlight[q].time/E.player.video.duration*100+"%",G.innerHTML='<span class="dplayer-highlight-text">'+E.player.options.highlight[q].text+"</span>",E.player.template.playedBarWrap.insertBefore(G,E.player.template.playedBarTime)}}})}},{key:"initThumbnails",value:function(){var E=this;this.player.options.video.thumbnails&&(this.thumbnails=new ZE({container:this.player.template.barPreview,barWidth:this.player.template.barWrap.offsetWidth,url:this.player.options.video.thumbnails,events:this.player.events}),this.player.on("loadedmetadata",function(){E.thumbnails.resize(160,E.player.video.videoHeight/E.player.video.videoWidth*160,E.player.template.barWrap.offsetWidth)}))}},{key:"initPlayedBar",value:function(){var E=this,I=function(G){var he=((G.clientX||G.changedTouches[0].clientX)-Y.getBoundingClientRectViewLeft(E.player.template.playedBarWrap))/E.player.template.playedBarWrap.clientWidth;he=Math.max(he,0),he=Math.min(he,1),E.player.bar.set("played",he,"width"),E.player.template.ptime.innerHTML=Y.secondToTime(he*E.player.video.duration)},q=function G(he){document.removeEventListener(Y.nameMap.dragEnd,G),document.removeEventListener(Y.nameMap.dragMove,I);var Ce=((he.clientX||he.changedTouches[0].clientX)-Y.getBoundingClientRectViewLeft(E.player.template.playedBarWrap))/E.player.template.playedBarWrap.clientWidth;Ce=Math.max(Ce,0),Ce=Math.min(Ce,1),E.player.bar.set("played",Ce,"width"),E.player.seek(E.player.bar.get("played")*E.player.video.duration),E.player.timer.enable("progress")};this.player.template.playedBarWrap.addEventListener(Y.nameMap.dragStart,function(){E.player.timer.disable("progress"),document.addEventListener(Y.nameMap.dragMove,I),document.addEventListener(Y.nameMap.dragEnd,q)}),this.player.template.playedBarWrap.addEventListener(Y.nameMap.dragMove,function(G){if(E.player.video.duration){var he=E.player.template.playedBarWrap.getBoundingClientRect().left,Ce=(G.clientX||G.changedTouches[0].clientX)-he;if(Ce<0||Ce>E.player.template.playedBarWrap.offsetWidth)return;var Pe=E.player.video.duration*(Ce/E.player.template.playedBarWrap.offsetWidth);Y.isMobile&&E.thumbnails&&E.thumbnails.show(),E.thumbnails&&E.thumbnails.move(Ce),E.player.template.playedBarTime.style.left="".concat(Ce-(Pe>=3600?25:20),"px"),E.player.template.playedBarTime.innerText=Y.secondToTime(Pe),E.player.template.playedBarTime.classList.remove("hidden")}}),this.player.template.playedBarWrap.addEventListener(Y.nameMap.dragEnd,function(){Y.isMobile&&E.thumbnails&&E.thumbnails.hide()}),Y.isMobile||(this.player.template.playedBarWrap.addEventListener("mouseenter",function(){E.player.video.duration&&(E.thumbnails&&E.thumbnails.show(),E.player.template.playedBarTime.classList.remove("hidden"))}),this.player.template.playedBarWrap.addEventListener("mouseleave",function(){E.player.video.duration&&(E.thumbnails&&E.thumbnails.hide(),E.player.template.playedBarTime.classList.add("hidden"))}))}},{key:"initFullButton",value:function(){var E=this;this.player.template.browserFullButton.addEventListener("click",function(){E.player.fullScreen.toggle("browser")}),this.player.template.webFullButton.addEventListener("click",function(){E.player.fullScreen.toggle("web")})}},{key:"initVolumeButton",value:function(){var E=this,I=function(G){var he=G||window.event,Ce=((he.clientX||he.changedTouches[0].clientX)-Y.getBoundingClientRectViewLeft(E.player.template.volumeBarWrap)-5.5)/35;E.player.volume(Ce)},q=function G(){document.removeEventListener(Y.nameMap.dragEnd,G),document.removeEventListener(Y.nameMap.dragMove,I),E.player.template.volumeButton.classList.remove("dplayer-volume-active")};this.player.template.volumeBarWrapWrap.addEventListener("click",function(G){var he=G||window.event,Ce=((he.clientX||he.changedTouches[0].clientX)-Y.getBoundingClientRectViewLeft(E.player.template.volumeBarWrap)-5.5)/35;E.player.volume(Ce)}),this.player.template.volumeBarWrapWrap.addEventListener(Y.nameMap.dragStart,function(){document.addEventListener(Y.nameMap.dragMove,I),document.addEventListener(Y.nameMap.dragEnd,q),E.player.template.volumeButton.classList.add("dplayer-volume-active")}),this.player.template.volumeButtonIcon.addEventListener("click",function(){E.player.video.muted?(E.player.video.muted=!1,E.player.switchVolumeIcon(),E.player.bar.set("volume",E.player.volume(),"width")):(E.player.video.muted=!0,E.player.template.volumeIcon.innerHTML=qn.volumeOff,E.player.bar.set("volume",0,"width"))})}},{key:"initQualityButton",value:function(){var E=this;this.player.options.video.quality&&this.player.template.qualityList.addEventListener("click",function(I){I.target.classList.contains("dplayer-quality-item")&&E.player.switchQuality(I.target.dataset.index)})}},{key:"initScreenshotButton",value:function(){var E=this;this.player.options.screenshot&&this.player.template.camareButton.addEventListener("click",function(){var I,q=document.createElement("canvas");q.width=E.player.video.videoWidth,q.height=E.player.video.videoHeight,q.getContext("2d").drawImage(E.player.video,0,0,q.width,q.height),q.toBlob(function(G){I=URL.createObjectURL(G);var he=document.createElement("a");he.href=I,he.download="DPlayer.png",he.style.display="none",document.body.appendChild(he),he.click(),document.body.removeChild(he),URL.revokeObjectURL(I),E.player.events.trigger("screenshot",I)})})}},{key:"initAirplayButton",value:function(){this.player.options.airplay&&(window.WebKitPlaybackTargetAvailabilityEvent?this.player.video.addEventListener("webkitplaybacktargetavailabilitychanged",function(E){E.availability==="available"?this.template.airplayButton.disable=!1:this.template.airplayButton.disable=!0,this.template.airplayButton.addEventListener("click",function(){this.video.webkitShowPlaybackTargetPicker()}.bind(this))}.bind(this.player)):this.player.template.airplayButton.style.display="none")}},{key:"initChromecast",value:function(){var E=window.document.createElement("script");E.setAttribute("type","text/javascript"),E.setAttribute("src","https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"),window.document.body.appendChild(E),window.__onGCastApiAvailable=function(I){if(I){var q=new(Zr=window.chrome.cast).SessionRequest(Zr.media.DEFAULT_MEDIA_RECEIVER_APP_ID),G=new Zr.ApiConfig(q,function(){},function(he){he===Zr.ReceiverAvailability.AVAILABLE&&console.log("chromecast: ",he)});Zr.initialize(G,function(){})}}}},{key:"initChromecastButton",value:function(){var E=this;if(this.player.options.chromecast){Ph&&(Ph=!1,this.initChromecast());var I=function(G,he){E.currentMedia=he},q=function(G){console.error("Error launching media",G)};this.player.template.chromecastButton.addEventListener("click",function(){var G;Cu?(Cu=!1,E.currentMedia.stop(),E.session.stop(),E.initChromecast()):(Cu=!0,G=new Bh,Zr.requestSession(function(he){var Ce,Pe,pt;E.session=he,G.next("CONNECTED"),Ce=E.player.options.video.url,Pe=new Zr.media.MediaInfo(Ce),pt=new Zr.media.LoadRequest(Pe),E.session?E.session.loadMedia(pt,I.bind(E,"loadMedia"),q).play():window.open(Ce)},function(he){he.code==="cancel"?(E.session=void 0,G.next("CANCEL")):console.error("Error selecting a cast device",he)}))})}}},{key:"initSubtitleButton",value:function(){var E=this;this.player.events.on("subtitle_show",function(){E.player.template.subtitleButton.dataset.balloon=E.player.tran("hide-subs"),E.player.template.subtitleButtonInner.style.opacity="",E.player.user.set("subtitle",1)}),this.player.events.on("subtitle_hide",function(){E.player.template.subtitleButton.dataset.balloon=E.player.tran("show-subs"),E.player.template.subtitleButtonInner.style.opacity="0.4",E.player.user.set("subtitle",0)}),this.player.template.subtitleButton.addEventListener("click",function(){E.player.subtitle.toggle()})}},{key:"setAutoHide",value:function(){var E=this;this.show(),clearTimeout(this.autoHideTimer),this.autoHideTimer=setTimeout(function(){!E.player.video.played.length||E.player.paused||E.disableAutoHide||E.hide()},3e3)}},{key:"show",value:function(){this.player.container.classList.remove("dplayer-hide-controller")}},{key:"hide",value:function(){this.player.container.classList.add("dplayer-hide-controller"),this.player.setting.hide(),this.player.comment&&this.player.comment.hide()}},{key:"isShow",value:function(){return!this.player.container.classList.contains("dplayer-hide-controller")}},{key:"toggle",value:function(){this.isShow()?this.hide():this.show()}},{key:"destroy",value:function(){Y.isMobile||(this.player.container.removeEventListener("mousemove",this.setAutoHideHandler),this.player.container.removeEventListener("click",this.setAutoHideHandler)),clearTimeout(this.autoHideTimer)}}])&&lx(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const ux=cx;function dx(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var fx=function(){function L(E){var I=this;(function(Pe,pt){if(!(Pe instanceof pt))throw new TypeError("Cannot call a class as a function")})(this,L),this.player=E,this.player.template.mask.addEventListener("click",function(){I.hide()}),this.player.template.settingButton.addEventListener("click",function(){I.show()}),this.loop=this.player.options.loop,this.player.template.loopToggle.checked=this.loop,this.player.template.loop.addEventListener("click",function(){I.player.template.loopToggle.checked=!I.player.template.loopToggle.checked,I.player.template.loopToggle.checked?I.loop=!0:I.loop=!1,I.hide()}),this.showDanmaku=this.player.user.get("danmaku"),this.showDanmaku||this.player.danmaku&&this.player.danmaku.hide(),this.player.template.showDanmakuToggle.checked=this.showDanmaku,this.player.template.showDanmaku.addEventListener("click",function(){I.player.template.showDanmakuToggle.checked=!I.player.template.showDanmakuToggle.checked,I.player.template.showDanmakuToggle.checked?(I.showDanmaku=!0,I.player.danmaku.show()):(I.showDanmaku=!1,I.player.danmaku.hide()),I.player.user.set("danmaku",I.showDanmaku?1:0),I.hide()}),this.unlimitDanmaku=this.player.user.get("unlimited"),this.player.template.unlimitDanmakuToggle.checked=this.unlimitDanmaku,this.player.template.unlimitDanmaku.addEventListener("click",function(){I.player.template.unlimitDanmakuToggle.checked=!I.player.template.unlimitDanmakuToggle.checked,I.player.template.unlimitDanmakuToggle.checked?(I.unlimitDanmaku=!0,I.player.danmaku.unlimit(!0)):(I.unlimitDanmaku=!1,I.player.danmaku.unlimit(!1)),I.player.user.set("unlimited",I.unlimitDanmaku?1:0),I.hide()}),this.player.template.speed.addEventListener("click",function(){I.player.template.settingBox.classList.add("dplayer-setting-box-narrow"),I.player.template.settingBox.classList.add("dplayer-setting-box-speed")});for(var q=function(Pe){I.player.template.speedItem[Pe].addEventListener("click",function(){I.player.speed(I.player.template.speedItem[Pe].dataset.speed),I.hide()})},G=0;G<this.player.template.speedItem.length;G++)q(G);if(this.player.danmaku){this.player.on("danmaku_opacity",function(Pe){I.player.bar.set("danmaku",Pe,"width"),I.player.user.set("opacity",Pe)}),this.player.danmaku.opacity(this.player.user.get("opacity"));var he=function(Pe){var pt=Pe||window.event,kt=((pt.clientX||pt.changedTouches[0].clientX)-Y.getBoundingClientRectViewLeft(I.player.template.danmakuOpacityBarWrap))/130;kt=Math.max(kt,0),kt=Math.min(kt,1),I.player.danmaku.opacity(kt)},Ce=function Pe(){document.removeEventListener(Y.nameMap.dragEnd,Pe),document.removeEventListener(Y.nameMap.dragMove,he),I.player.template.danmakuOpacityBox.classList.remove("dplayer-setting-danmaku-active")};this.player.template.danmakuOpacityBarWrapWrap.addEventListener("click",function(Pe){var pt=Pe||window.event,kt=((pt.clientX||pt.changedTouches[0].clientX)-Y.getBoundingClientRectViewLeft(I.player.template.danmakuOpacityBarWrap))/130;kt=Math.max(kt,0),kt=Math.min(kt,1),I.player.danmaku.opacity(kt)}),this.player.template.danmakuOpacityBarWrapWrap.addEventListener(Y.nameMap.dragStart,function(){document.addEventListener(Y.nameMap.dragMove,he),document.addEventListener(Y.nameMap.dragEnd,Ce),I.player.template.danmakuOpacityBox.classList.add("dplayer-setting-danmaku-active")})}}var P,O;return P=L,(O=[{key:"hide",value:function(){var E=this;this.player.template.settingBox.classList.remove("dplayer-setting-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),setTimeout(function(){E.player.template.settingBox.classList.remove("dplayer-setting-box-narrow"),E.player.template.settingBox.classList.remove("dplayer-setting-box-speed")},300),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.settingBox.classList.add("dplayer-setting-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}}])&&dx(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const px=fx;function hx(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var mx=function(){function L(E){var I=this;(function(q,G){if(!(q instanceof G))throw new TypeError("Cannot call a class as a function")})(this,L),this.player=E,this.player.template.mask.addEventListener("click",function(){I.hide()}),this.player.template.commentButton.addEventListener("click",function(){I.show()}),this.player.template.commentSettingButton.addEventListener("click",function(){I.toggleSetting()}),this.player.template.commentColorSettingBox.addEventListener("click",function(){if(I.player.template.commentColorSettingBox.querySelector("input:checked+span")){var q=I.player.template.commentColorSettingBox.querySelector("input:checked").value;I.player.template.commentSettingFill.style.fill=q,I.player.template.commentInput.style.color=q,I.player.template.commentSendFill.style.fill=q}}),this.player.template.commentInput.addEventListener("click",function(){I.hideSetting()}),this.player.template.commentInput.addEventListener("keydown",function(q){(q||window.event).keyCode===13&&I.send()}),this.player.template.commentSendButton.addEventListener("click",function(){I.send()})}var P,O;return P=L,(O=[{key:"show",value:function(){this.player.controller.disableAutoHide=!0,this.player.template.controller.classList.add("dplayer-controller-comment"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.container.classList.add("dplayer-show-controller"),this.player.template.commentInput.focus()}},{key:"hide",value:function(){this.player.template.controller.classList.remove("dplayer-controller-comment"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.container.classList.remove("dplayer-show-controller"),this.player.controller.disableAutoHide=!1,this.hideSetting()}},{key:"showSetting",value:function(){this.player.template.commentSettingBox.classList.add("dplayer-comment-setting-open")}},{key:"hideSetting",value:function(){this.player.template.commentSettingBox.classList.remove("dplayer-comment-setting-open")}},{key:"toggleSetting",value:function(){this.player.template.commentSettingBox.classList.contains("dplayer-comment-setting-open")?this.hideSetting():this.showSetting()}},{key:"send",value:function(){var E=this;this.player.template.commentInput.blur(),this.player.template.commentInput.value.replace(/^\s+|\s+$/g,"")?this.player.danmaku.send({text:this.player.template.commentInput.value,color:Y.color2Number(this.player.container.querySelector(".dplayer-comment-setting-color input:checked").value),type:parseInt(this.player.container.querySelector(".dplayer-comment-setting-type input:checked").value)},function(){E.player.template.commentInput.value="",E.hide()}):this.player.notice(this.player.tran("please-input-danmaku"))}}])&&hx(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const gx=mx;function vx(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var yx=function(){function L(E){(function(I,q){if(!(I instanceof q))throw new TypeError("Cannot call a class as a function")})(this,L),this.player=E,this.doHotKeyHandler=this.doHotKey.bind(this),this.cancelFullScreenHandler=this.cancelFullScreen.bind(this),this.player.options.hotkey&&document.addEventListener("keydown",this.doHotKeyHandler),document.addEventListener("keydown",this.cancelFullScreenHandler)}var P,O;return P=L,(O=[{key:"doHotKey",value:function(E){if(this.player.focus){var I=document.activeElement.tagName.toUpperCase(),q=document.activeElement.getAttribute("contenteditable");if(I!=="INPUT"&&I!=="TEXTAREA"&&q!==""&&q!=="true"){var G,he=E||window.event;switch(he.keyCode){case 32:he.preventDefault(),this.player.toggle();break;case 37:if(he.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime-5),this.player.controller.setAutoHide();break;case 39:if(he.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime+5),this.player.controller.setAutoHide();break;case 38:he.preventDefault(),G=this.player.volume()+.1,this.player.volume(G);break;case 40:he.preventDefault(),G=this.player.volume()-.1,this.player.volume(G)}}}}},{key:"cancelFullScreen",value:function(E){(E||window.event).keyCode===27&&this.player.fullScreen.isFullScreen("web")&&this.player.fullScreen.cancel("web")}},{key:"destroy",value:function(){this.player.options.hotkey&&document.removeEventListener("keydown",this.doHotKeyHandler),document.removeEventListener("keydown",this.cancelFullScreenHandler)}}])&&vx(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const Ax=yx;function bx(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var Ex=function(){function L(E){var I=this;(function(q,G){if(!(q instanceof G))throw new TypeError("Cannot call a class as a function")})(this,L),this.player=E,this.shown=!1,Array.prototype.slice.call(this.player.template.menuItem).forEach(function(q,G){I.player.options.contextmenu[G].click&&q.addEventListener("click",function(){I.player.options.contextmenu[G].click(I.player),I.hide()})}),this.contextmenuHandler=function(q){if(I.shown)I.hide();else{var G=q||window.event;G.preventDefault();var he=I.player.container.getBoundingClientRect();I.show(G.clientX-he.left,G.clientY-he.top),I.player.template.mask.addEventListener("click",function(){I.hide()})}},this.player.container.addEventListener("contextmenu",this.contextmenuHandler)}var P,O;return P=L,(O=[{key:"show",value:function(E,I){this.player.template.menu.classList.add("dplayer-menu-show");var q=this.player.container.getBoundingClientRect();E+this.player.template.menu.offsetWidth>=q.width?(this.player.template.menu.style.right=q.width-E+"px",this.player.template.menu.style.left="initial"):(this.player.template.menu.style.left=E+"px",this.player.template.menu.style.right="initial"),I+this.player.template.menu.offsetHeight>=q.height?(this.player.template.menu.style.bottom=q.height-I+"px",this.player.template.menu.style.top="initial"):(this.player.template.menu.style.top=I+"px",this.player.template.menu.style.bottom="initial"),this.player.template.mask.classList.add("dplayer-mask-show"),this.shown=!0,this.player.events.trigger("contextmenu_show")}},{key:"hide",value:function(){this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.template.menu.classList.remove("dplayer-menu-show"),this.shown=!1,this.player.events.trigger("contextmenu_hide")}},{key:"destroy",value:function(){this.player.container.removeEventListener("contextmenu",this.contextmenuHandler)}}])&&bx(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const xx=Ex;function Cx(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var wx=function(){function L(E){var I=this;(function(q,G){if(!(q instanceof G))throw new TypeError("Cannot call a class as a function")})(this,L),this.container=E.template.infoPanel,this.template=E.template,this.video=E.video,this.player=E,this.template.infoPanelClose.addEventListener("click",function(){I.hide()})}var P,O;return P=L,(O=[{key:"show",value:function(){this.beginTime=Date.now(),this.update(),this.player.timer.enable("info"),this.player.timer.enable("fps"),this.container.classList.remove("dplayer-info-panel-hide")}},{key:"hide",value:function(){this.player.timer.disable("info"),this.player.timer.disable("fps"),this.container.classList.add("dplayer-info-panel-hide")}},{key:"triggle",value:function(){this.container.classList.contains("dplayer-info-panel-hide")?this.show():this.hide()}},{key:"update",value:function(){this.template.infoVersion.innerHTML="v".concat("1.27.0"," ").concat("a0424ca"),this.template.infoType.innerHTML=this.player.type,this.template.infoUrl.innerHTML=this.player.options.video.url,this.template.infoResolution.innerHTML="".concat(this.player.video.videoWidth," x ").concat(this.player.video.videoHeight),this.template.infoDuration.innerHTML=this.player.video.duration,this.player.options.danmaku&&(this.template.infoDanmakuId.innerHTML=this.player.options.danmaku.id,this.template.infoDanmakuApi.innerHTML=this.player.options.danmaku.api,this.template.infoDanmakuAmount.innerHTML=this.player.danmaku.dan.length)}},{key:"fps",value:function(E){this.template.infoFPS.innerHTML="".concat(E.toFixed(1))}}])&&Cx(P.prototype,O),Object.defineProperty(P,"prototype",{writable:!1}),L}();const _x=wx;var Sx=a(1568),kx=a.n(Sx);function $h(L,P){var O=Object.keys(L);if(Object.getOwnPropertySymbols){var E=Object.getOwnPropertySymbols(L);P&&(E=E.filter(function(I){return Object.getOwnPropertyDescriptor(L,I).enumerable})),O.push.apply(O,E)}return O}function Tx(L,P,O){return P in L?Object.defineProperty(L,P,{value:O,enumerable:!0,configurable:!0,writable:!0}):L[P]=O,L}function Dh(L,P){for(var O=0;O<P.length;O++){var E=P[O];E.enumerable=E.enumerable||!1,E.configurable=!0,"value"in E&&(E.writable=!0),Object.defineProperty(L,E.key,E)}}var Rh=0,Co=[],Ix=function(){function L(I){var q=this;(function(G,he){if(!(G instanceof he))throw new TypeError("Cannot call a class as a function")})(this,L),this.options=function(G){var he={container:G.element||document.getElementsByClassName("dplayer")[0],live:!1,autoplay:!1,theme:"#b7daff",loop:!1,lang:(navigator.language||navigator.browserLanguage).toLowerCase(),screenshot:!1,airplay:!0,chromecast:!1,hotkey:!0,preload:"metadata",volume:.7,playbackSpeed:[.5,.75,1,1.25,1.5,2],apiBackend:ie,video:{},contextmenu:[],mutex:!0,pluginOptions:{hls:{},flv:{},dash:{},webtorrent:{}},preventClickToggle:!1};for(var Ce in he)he.hasOwnProperty(Ce)&&!G.hasOwnProperty(Ce)&&(G[Ce]=he[Ce]);return G.video&&!G.video.type&&(G.video.type="auto"),ne(G.danmaku)==="object"&&G.danmaku&&!G.danmaku.user&&(G.danmaku.user="DIYgod"),G.subtitle&&(!G.subtitle.type&&(G.subtitle.type="webvtt"),!G.subtitle.fontSize&&(G.subtitle.fontSize="20px"),!G.subtitle.bottom&&(G.subtitle.bottom="40px"),!G.subtitle.color&&(G.subtitle.color="#fff")),G.video.quality&&(G.video.url=G.video.quality[G.video.defaultQuality].url),G.lang&&(G.lang=G.lang.toLowerCase()),G.contextmenu=G.contextmenu.concat([{key:"video-info",click:function(Pe){Pe.infoPanel.triggle()}},{key:"about-author",link:"https://diygod.me"},{text:"DPlayer v".concat("1.27.0"),link:"https://github.com/MoePlayer/DPlayer"}]),G}(function(G){for(var he=1;he<arguments.length;he++){var Ce=arguments[he]!=null?arguments[he]:{};he%2?$h(Object(Ce),!0).forEach(function(Pe){Tx(G,Pe,Ce[Pe])}):Object.getOwnPropertyDescriptors?Object.defineProperties(G,Object.getOwnPropertyDescriptors(Ce)):$h(Object(Ce)).forEach(function(Pe){Object.defineProperty(G,Pe,Object.getOwnPropertyDescriptor(Ce,Pe))})}return G}({preload:I.video.type==="webtorrent"?"none":"metadata"},I)),this.options.video.quality&&(this.qualityIndex=this.options.video.defaultQuality,this.quality=this.options.video.quality[this.options.video.defaultQuality]),this.tran=new fe(this.options.lang).tran,this.events=new IE,this.user=new DE(this),this.container=this.options.container,this.container.classList.add("dplayer"),this.options.danmaku||this.container.classList.add("dplayer-no-danmaku"),this.options.live?this.container.classList.add("dplayer-live"):this.container.classList.remove("dplayer-live"),Y.isMobile&&this.container.classList.add("dplayer-mobile"),this.arrow=this.container.offsetWidth<=500,this.arrow&&this.container.classList.add("dplayer-arrow"),this.options.subtitle&&Array.isArray(this.options.subtitle.url)&&(this.options.subtitle.url.push({subtitle:"",lang:"off"}),this.options.subtitle.defaultSubtitle&&(typeof this.options.subtitle.defaultSubtitle=="string"?this.options.subtitle.index=this.options.subtitle.url.findIndex(function(G){return G.lang===q.options.subtitle.defaultSubtitle||G.name===q.options.subtitle.defaultSubtitle}):typeof this.options.subtitle.defaultSubtitle=="number"&&(this.options.subtitle.index=this.options.subtitle.defaultSubtitle)),(this.options.subtitle.index===-1||!this.options.subtitle.index||this.options.subtitle.index>this.options.subtitle.url.length-1)&&(this.options.subtitle.index=this.options.subtitle.url.findIndex(function(G){return G.lang===q.options.lang})),this.options.subtitle.index===-1&&(this.options.subtitle.index=this.options.subtitle.url.length-1)),this.template=new xh({container:this.container,options:this.options,index:Rh,tran:this.tran}),this.video=this.template.video,this.bar=new HE(this.template),this.bezel=new KE(this.template.bezel),this.fullScreen=new LE(this),this.controller=new ux(this),this.options.danmaku&&(this.danmaku=new kE({player:this,container:this.template.danmaku,opacity:this.user.get("opacity"),callback:function(){setTimeout(function(){q.template.danmakuLoading.style.display="none",q.options.autoplay&&q.play()},0)},error:function(G){q.notice(G)},apiBackend:this.options.apiBackend,borderColor:this.options.theme,height:this.arrow?24:30,time:function(){return q.video.currentTime},unlimited:this.user.get("unlimited"),api:{id:this.options.danmaku.id,address:this.options.danmaku.api,token:this.options.danmaku.token,maximum:this.options.danmaku.maximum,addition:this.options.danmaku.addition,user:this.options.danmaku.user,speedRate:this.options.danmaku.speedRate},events:this.events,tran:function(G){return q.tran(G)}}),this.comment=new gx(this)),this.setting=new px(this),this.plugins={},this.docClickFun=function(){q.focus=!1},this.containerClickFun=function(){q.focus=!0},document.addEventListener("click",this.docClickFun,!0),this.container.addEventListener("click",this.containerClickFun,!0),this.paused=!0,this.timer=new YE(this),this.hotkey=new Ax(this),this.contextmenu=new xx(this),this.initVideo(this.video,this.quality&&this.quality.type||this.options.video.type),this.infoPanel=new _x(this),!this.danmaku&&this.options.autoplay&&this.play(),Rh++,Co.push(this)}var P,O,E;return P=L,O=[{key:"seek",value:function(I){I=Math.max(I,0),this.video.duration&&(I=Math.min(I,this.video.duration)),this.video.currentTime<I?this.notice("".concat(this.tran("ff").replace("%s",(I-this.video.currentTime).toFixed(0)))):this.video.currentTime>I&&this.notice("".concat(this.tran("rew").replace("%s",(this.video.currentTime-I).toFixed(0)))),this.video.currentTime=I,this.danmaku&&this.danmaku.seek(),this.bar.set("played",I/this.video.duration,"width"),this.template.ptime.innerHTML=Y.secondToTime(I)}},{key:"play",value:function(I){var q=this;if(this.paused=!1,this.video.paused&&!Y.isMobile&&this.bezel.switch(qn.play),this.template.playButton.innerHTML=qn.pause,this.template.mobilePlayButton.innerHTML=qn.pause,I||z.resolve(this.video.play()).catch(function(){q.pause()}).then(function(){}),this.timer.enable("loading"),this.container.classList.remove("dplayer-paused"),this.container.classList.add("dplayer-playing"),this.danmaku&&this.danmaku.play(),this.options.mutex)for(var G=0;G<Co.length;G++)this!==Co[G]&&Co[G].pause()}},{key:"pause",value:function(I){this.paused=!0,this.container.classList.remove("dplayer-loading"),this.video.paused||Y.isMobile||this.bezel.switch(qn.pause),this.template.playButton.innerHTML=qn.play,this.template.mobilePlayButton.innerHTML=qn.play,I||this.video.pause(),this.timer.disable("loading"),this.container.classList.remove("dplayer-playing"),this.container.classList.add("dplayer-paused"),this.danmaku&&this.danmaku.pause()}},{key:"switchVolumeIcon",value:function(){this.volume()>=.95?this.template.volumeIcon.innerHTML=qn.volumeUp:this.volume()>0?this.template.volumeIcon.innerHTML=qn.volumeDown:this.template.volumeIcon.innerHTML=qn.volumeOff}},{key:"volume",value:function(I,q,G){if(I=parseFloat(I),!isNaN(I)){I=Math.max(I,0),I=Math.min(I,1),this.bar.set("volume",I,"width");var he="".concat((100*I).toFixed(0),"%");this.template.volumeBarWrapWrap.dataset.balloon=he,q||this.user.set("volume",I),G||this.notice("".concat(this.tran("volume")," ").concat((100*I).toFixed(0),"%")),this.video.volume=I,this.video.muted&&(this.video.muted=!1),this.switchVolumeIcon()}return this.video.volume}},{key:"toggle",value:function(){this.video.paused?this.play():this.pause()}},{key:"on",value:function(I,q){this.events.on(I,q)}},{key:"switchVideo",value:function(I,q){this.pause(),this.video.poster=I.pic?I.pic:"",this.video.src=I.url,this.initMSE(this.video,I.type||"auto"),q&&(this.template.danmakuLoading.style.display="block",this.bar.set("played",0,"width"),this.bar.set("loaded",0,"width"),this.template.ptime.innerHTML="00:00",this.template.danmaku.innerHTML="",this.danmaku&&this.danmaku.reload({id:q.id,address:q.api,token:q.token,maximum:q.maximum,addition:q.addition,user:q.user}))}},{key:"initMSE",value:function(I,q){var G=this;if(this.type=q,this.options.video.customType&&this.options.video.customType[q])Object.prototype.toString.call(this.options.video.customType[q])==="[object Function]"?this.options.video.customType[q](this.video,this):console.error("Illegal customType: ".concat(q));else switch(this.type==="auto"&&(/m3u8(#|\?|$)/i.exec(I.src)?this.type="hls":/.flv(#|\?|$)/i.exec(I.src)?this.type="flv":/.mpd(#|\?|$)/i.exec(I.src)?this.type="dash":this.type="normal"),this.type==="hls"&&(I.canPlayType("application/x-mpegURL")||I.canPlayType("application/vnd.apple.mpegURL"))&&(this.type="normal"),this.type){case"hls":if(window.Hls)if(window.Hls.isSupported()){var he=this.options.pluginOptions.hls,Ce=new window.Hls(he);this.plugins.hls=Ce,Ce.loadSource(I.src),Ce.attachMedia(I),this.events.on("destroy",function(){Ce.destroy(),delete G.plugins.hls})}else this.notice("Error: Hls is not supported.");else this.notice("Error: Can't find Hls.");break;case"flv":if(window.flvjs)if(window.flvjs.isSupported()){var Pe=window.flvjs.createPlayer(Object.assign(this.options.pluginOptions.flv.mediaDataSource||{},{type:"flv",url:I.src}),this.options.pluginOptions.flv.config);this.plugins.flvjs=Pe,Pe.attachMediaElement(I),Pe.load(),this.events.on("destroy",function(){Pe.unload(),Pe.detachMediaElement(),Pe.destroy(),delete G.plugins.flvjs})}else this.notice("Error: flvjs is not supported.");else this.notice("Error: Can't find flvjs.");break;case"dash":if(window.dashjs){var pt=window.dashjs.MediaPlayer().create().initialize(I,I.src,!1),kt=this.options.pluginOptions.dash;pt.updateSettings(kt),this.plugins.dash=pt,this.events.on("destroy",function(){window.dashjs.MediaPlayer().reset(),delete G.plugins.dash})}else this.notice("Error: Can't find dashjs.");break;case"webtorrent":if(window.WebTorrent)if(window.WebTorrent.WEBRTC_SUPPORT){this.container.classList.add("dplayer-loading");var ur=this.options.pluginOptions.webtorrent,Dn=new window.WebTorrent(ur);this.plugins.webtorrent=Dn;var Jr=I.src;I.src="",I.preload="metadata",I.addEventListener("durationchange",function(){return G.container.classList.remove("dplayer-loading")},{once:!0}),Dn.add(Jr,function(Je){Je.files.find(function(gt){return gt.name.endsWith(".mp4")}).renderTo(G.video,{autoplay:G.options.autoplay,controls:!1})}),this.events.on("destroy",function(){Dn.remove(Jr),Dn.destroy(),delete G.plugins.webtorrent})}else this.notice("Error: Webtorrent is not supported.");else this.notice("Error: Can't find Webtorrent.")}}},{key:"initVideo",value:function(I,q){var G=this;this.initMSE(I,q),this.on("durationchange",function(){I.duration!==1&&I.duration!==1/0&&(G.template.dtime.innerHTML=Y.secondToTime(I.duration))}),this.on("progress",function(){var Pe=I.buffered.length?I.buffered.end(I.buffered.length-1)/I.duration:0;G.bar.set("loaded",Pe,"width")}),this.on("error",function(){G.video.error&&G.tran&&G.notice&&G.type!=="webtorrent"&&G.notice(G.tran("video-failed"),-1)}),this.on("ended",function(){G.bar.set("played",1,"width"),G.setting.loop?(G.seek(0),G.play()):G.pause(),G.danmaku&&(G.danmaku.danIndex=0)}),this.on("play",function(){G.paused&&G.play(!0)}),this.on("pause",function(){G.paused||G.pause(!0)}),this.on("timeupdate",function(){G.bar.set("played",G.video.currentTime/G.video.duration,"width");var Pe=Y.secondToTime(G.video.currentTime);G.template.ptime.innerHTML!==Pe&&(G.template.ptime.innerHTML=Pe)});for(var he=function(Pe){I.addEventListener(G.events.videoEvents[Pe],function(){G.events.trigger(G.events.videoEvents[Pe])})},Ce=0;Ce<this.events.videoEvents.length;Ce++)he(Ce);this.volume(this.user.get("volume"),!0,!0),this.options.subtitle&&(this.subtitle=new NE(this.template.subtitle,this.video,this.options.subtitle,this.events),Array.isArray(this.options.subtitle.url)&&(this.subtitles=new jE(this)),this.user.get("subtitle")||this.subtitle.hide())}},{key:"switchQuality",value:function(I){var q=this;if(I=typeof I=="string"?parseInt(I):I,this.qualityIndex!==I&&!this.switchingQuality){this.prevIndex=this.qualityIndex,this.qualityIndex=I,this.switchingQuality=!0,this.quality=this.options.video.quality[I],this.template.qualityButton.innerHTML=this.quality.name;var G=this.video.paused;this.video.pause();var he=kx()({current:!1,pic:null,screenshot:this.options.screenshot,preload:"auto",url:this.quality.url,subtitle:this.options.subtitle}),Ce=new DOMParser().parseFromString(he,"text/html").body.firstChild;this.template.videoWrap.insertBefore(Ce,this.template.videoWrap.getElementsByTagName("div")[0]),this.prevVideo=this.video,this.video=Ce,this.initVideo(this.video,this.quality.type||this.options.video.type),this.seek(this.prevVideo.currentTime),this.notice("".concat(this.tran("switching-quality").replace("%q",this.quality.name)),-1),this.events.trigger("quality_start",this.quality),this.on("canplay",function(){if(q.prevVideo){if(q.video.currentTime!==q.prevVideo.currentTime)return void q.seek(q.prevVideo.currentTime);q.template.videoWrap.removeChild(q.prevVideo),q.video.classList.add("dplayer-video-current"),G||q.video.play(),q.prevVideo=null,q.notice("".concat(q.tran("switched-quality").replace("%q",q.quality.name))),q.switchingQuality=!1,q.events.trigger("quality_end")}}),this.on("error",function(){q.video.error&&q.prevVideo&&(q.template.videoWrap.removeChild(q.video),q.video=q.prevVideo,G||q.video.play(),q.qualityIndex=q.prevIndex,q.quality=q.options.video.quality[q.qualityIndex],q.noticeTime=setTimeout(function(){q.template.notice.style.opacity=0,q.events.trigger("notice_hide")},3e3),q.prevVideo=null,q.switchingQuality=!1)})}}},{key:"notice",value:function(I){var q,G,he=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2e3,Ce=arguments.length>2&&arguments[2]!==void 0?arguments[2]:.8,Pe=xh.NewNotice(I,Ce);this.template.noticeList.appendChild(Pe),this.events.trigger("notice_show",Pe),he>0&&setTimeout((q=Pe,G=this,function(){q.addEventListener("animationend",function(){G.template.noticeList.removeChild(q)}),q.classList.add("remove-notice"),G.events.trigger("notice_hide")}),he)}},{key:"resize",value:function(){this.danmaku&&this.danmaku.resize(),this.controller.thumbnails&&this.controller.thumbnails.resize(160,this.video.videoHeight/this.video.videoWidth*160,this.template.barWrap.offsetWidth),this.events.trigger("resize")}},{key:"speed",value:function(I){this.video.playbackRate=I}},{key:"destroy",value:function(){Co.splice(Co.indexOf(this),1),this.pause(),document.removeEventListener("click",this.docClickFun,!0),this.container.removeEventListener("click",this.containerClickFun,!0),this.fullScreen.destroy(),this.hotkey.destroy(),this.contextmenu.destroy(),this.controller.destroy(),this.timer.destroy(),this.video.src="",this.container.innerHTML="",this.events.trigger("destroy")}}],E=[{key:"version",get:function(){return"1.27.0"}}],O&&Dh(P.prototype,O),E&&Dh(P,E),Object.defineProperty(P,"prototype",{writable:!1}),L}();const Ox=Ix;console.log(`
`.concat(" %c DPlayer v","1.27.0"," ").concat("a0424ca"," %c https://dplayer.diygod.dev ",`
`,`
`),"color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;");const Bx=Ox})(),o.default})())})(M7);const N7={class:"c_update_pop"},F7={class:"c-pop-head"},z7={class:"c-pop-head-title"},j7={class:"c-pop-head-version"},U7={class:"c-pop-content"},V7={class:"c-pop-content-title"},H7={class:"c-pop-content-tips-list"},W7={class:"c-pop-content-tips-item"},q7={class:"c-pop-content-line"},Y7={__name:"UpdatePop",setup(e,{expose:t}){const n=mn(),r=rn(),a=oe(()=>r.tm("updatePop"));let o=re(!1),i=re(0);function l(){o.value=!0}let s=re(!1),c=re(0);function u(){s.value=!0,c.value=setInterval(()=>{if(i.value>=100){clearInterval(c.value),window.location.reload();return}i.value+=25},150)}return t({onShow:l}),(f,d)=>{const m=Fn("van-popup");return Ve(),Ge("div",N7,[C(m,{"close-on-click-overlay":!1,class:"c-pop",show:V(o),"onUpdate:show":d[0]||(d[0]=y=>ct(o)?o.value=y:o=y),position:"center"},{default:Ht(()=>[w("div",F7,[w("div",z7,ce(V(a).titleText),1),w("div",j7," V."+ce(V(n).system.Version)+" "+ce(V(a).wendingText),1)]),w("div",U7,[w("div",V7,ce(V(a).updateContentText)+"\uFF1A",1),w("div",H7,[w("div",W7,"1."+ce(V(a).contentOneText),1)]),Fe(w("div",q7,[w("div",{style:Ci({width:`${V(i)}%`}),class:"c-pop-content-progress"},null,4)],512),[[We,V(s)]]),Fe(w("div",{onClick:u,class:"c-pop-btn g-flex-align-center g-flex-justify-center"},ce(V(a).updateText),513),[[We,!V(s)]])])]),_:1},8,["show"])])}}};const za=e=>(dy("data-v-30fff5e9"),e=e(),fy(),e),G7={class:"v_main g-flex-column"},K7={class:"v-main-container"},Q7={class:"v-main-container_t"},X7={class:"v-main-head-left"},Z7=za(()=>w("img",{src:hh,alt:""},null,-1)),J7={class:"n-moble"},e9={class:"v-main-head-right"},t9=za(()=>w("img",{src:mh,alt:""},null,-1)),n9=[t9],r9=za(()=>w("img",{src:WR,alt:""},null,-1)),a9={class:"v-main-head-right-have-msg"},o9={class:"b-head-content"},i9={class:"wallet-balance"},s9={class:"wallet-amount g-flex-align-center"},l9={class:"amount-item"},c9={class:"amount-item"},u9={class:"wallet-btn"},d9=za(()=>w("img",{src:qR,alt:""},null,-1)),f9=za(()=>w("img",{src:YR,alt:""},null,-1)),p9={class:"level-wrap g-flex-justify-between g-flex-align-center"},h9={class:"level"},m9={class:"today-income"},g9=za(()=>w("div",{class:"v-notice-two-left g-flex-align-center"},[w("img",{src:GR,alt:""})],-1)),v9={class:"v-notice-two-tips-val"},y9=["innerHTML"],A9={class:"v-main-container-btn-list g-flex-align-center g-flex-justify-between"},b9=za(()=>w("img",{src:nE,alt:""},null,-1)),E9=za(()=>w("img",{src:KR,alt:""},null,-1)),x9=jy('<div class="v-main-bottom" data-v-30fff5e9><div class="media2" data-v-30fff5e9><div class="v-main-bottom-part-aboutus-video" data-v-30fff5e9><video controls width="640" height="480" data-v-30fff5e9><source src="'+QR+'" type="video/mp4" data-v-30fff5e9></video></div></div></div>',1),C9={__name:"MainView",setup(e){const t=Vn();Hn();const n=mn(),r=rn(),a=oe(()=>r.tm("mainView"));let o=re(null);function i(){n.userInfo.email==""?t.push({name:"bindemail"}):t.push({name:"cashoutselect"})}He({obj:{}});let l=re(null);re([]),re([]),Et(()=>{d(),console.log(n),window.localStorage.getItem("appToken")&&(A(),p())});let s=re(null),c=re();u();async function u(){const{success:b,data:v}=await ph({id:1});!b||(c.value=v.info.AboutUs,n.system.Version!=v.info.Version&&s.value.onShow())}let f=He({list:[]});async function d(){n.loadingShow=!0;const{success:b,data:v}=await Q1();if(!!b)if(f.list=v.list,console.log(9999),console.log(f.list),f.list.length)y();else return}let m=re(null);function y(){m.value.onShow(f.list)}let g=oe(()=>n.userInfo);async function A(){console.log(5555),n.loadingShow=!0;const{success:b,data:v}=await pu();!b||(n.setUserInfo(v.info),console.log(v),console.log(8888))}let h=re(0);async function p(){n.loadingShow=!0;const{success:b,data:v}=await jR();!b||(h.value=v.readNums)}return(b,v)=>{const x=Fn("van-notice-bar");return Ve(),Ge("div",G7,[w("div",K7,[w("div",Q7,[w("div",X7,[Z7,w("div",J7,ce(V(g).mobile||V(g).user_name),1)]),w("div",e9,[w("div",{onClick:v[0]||(v[0]=(..._)=>V(xi)&&V(xi)(..._)),class:"v-main-head-right-img"},n9),w("div",{onClick:v[1]||(v[1]=_=>b.$router.push("/msgcenter")),class:"v-main-head-right-img"},[r9,Fe(w("div",a9,null,512),[[We,V(h)]])])]),w("div",o9,[w("div",i9,ce(V(a).walletBalance),1),w("div",s9,[w("div",l9,[Sa(" MOP: "),w("span",null,ce(V(g).balance_mop),1)]),w("div",c9,[Sa(" USDT: "),w("span",null,ce(V(g).balance),1)])]),w("div",u9,[w("div",{onClick:v[2]||(v[2]=_=>b.$router.push({name:"rechargeselect"}))},[d9,w("span",null,ce(V(a).chongzhiText),1)]),w("div",{onClick:i},[f9,w("span",null,ce(V(a).tixianText),1)])]),w("div",p9,[w("div",h9,ce(V(g).level),1),w("div",m9,ce(V(a).todayIncome)+"\uFF1A "+ce(V(g).todayWin),1)])])]),V(f).list.length?(Ve(),Ge("div",{key:0,onClick:y,class:"v-notice-two g-flex-align-center"},[g9,C(x,{scrollable:"",speed:80},{default:Ht(()=>[w("p",v9,[(Ve(!0),Ge(lt,null,zn(V(f).list,(_,S)=>(Ve(),Ge("span",{key:`notice${S}`},[w("div",{innerHTML:_.content},null,8,y9)]))),128))])]),_:1}),w("div",{onClick:v[3]||(v[3]=Pc(_=>b.$router.push({name:"msgcenter",query:{type:2}}),["stop"])),class:"v-notice-two-right g-flex-align-center"},[w("span",null,ce(V(a).moreText)+">",1)])])):Zt("",!0),w("div",A9,[w("div",{onClick:v[4]||(v[4]=_=>V(t).push({name:"myteam"})),class:"v-lianghua-top-btn-item v-lianghua-top-btn-item-recharge g-flex-align-center g-flex-justify-center"},[b9,w("div",null,ce(V(a).tuanduiText),1)]),w("div",{onClick:v[5]||(v[5]=_=>b.$router.push({name:"invite"})),class:"v-lianghua-top-btn-item v-lianghua-top-btn-item-cashout g-flex-align-center g-flex-justify-center"},[E9,w("div",null,ce(V(a).yaoqingHaoYouText),1)])]),x9,C(R7)]),C(rE,{ref_key:"refNoticePop",ref:m},null,512),C(u7,{ref_key:"refMyCenterPop",ref:o},null,512),C(Y7,{ref_key:"refUpdatePop",ref:s},null,512),C(b7,{ref_key:"refNoticeUserPop",ref:l},null,512)])}}},w9=tE(C9,[["__scopeId","data-v-30fff5e9"]]),_9=Object.freeze(Object.defineProperty({__proto__:null,default:w9},Symbol.toStringTag,{value:"Module"})),$i=""+new URL("../images/back-icon.png",import.meta.url).href;const S9={class:"v_recharge_select g-flex-column n-bg"},k9={class:"new-head"},T9=w("img",{src:$i,alt:""},null,-1),I9=[T9],O9=w("i",{class:"iconfont icon-datijilu new-head-r"},null,-1),B9=[O9],L9={class:"new-head_title_text"},P9={class:"v-recharge-select-container"},$9={class:"v-recharge-select-box"},D9={class:"v-recharge-select-title"},R9={class:"v-recharge-select-list"},M9=["onClick"],N9={class:"v-recharge-select-item-left g-flex-align-center"},F9=["src"],z9=w("i",{class:"iconfont icon-xiangyou1"},null,-1),j9={__name:"RechargeSelect",setup(e){const t=mn(),n=rn(),r=oe(()=>n.tm("rechargeSelect"));oe(()=>n.tm("lianghua"));const a=He({list:[]});He({list:[{img:"/img/icon/bian.png",href:"https://accounts.binance.com/"},{img:"/img/icon/changelly.png",href:"https://changelly.com/"},{img:"/img/icon/moonpay.png",href:"https://www.moonpay.com/"},{img:"/img/icon/crypto.png",href:"https://crypto.com/"},{img:"/img/icon/bitoex.png",href:"https://www.bitopro.com/"}]}),Hn();const o=Vn();async function i(){t.loadingShow=!0;const{success:s,data:c}=await FR();!s||(a.list=c.list)}i();function l(s){console.log(s),s.fn=="Bank"?o.push({name:"rechargebank",params:{id:s.id}}):s.fn=="KeFu"?o.push({name:"rechargekefu",params:{id:s.id}}):s.fn=="Wallet"?o.push({name:"rechargebi",params:{id:s.id}}):s.fn=="WalletAuth"?window.open(s.info.url):s.fn.includes("Pay")&&o.push({name:"rechargethird",params:{id:s.id}})}return He({list:[]}),(s,c)=>(Ve(),Ge("div",S9,[w("div",k9,[w("div",{class:"new-head-back",onClick:c[0]||(c[0]=u=>s.$router.go(-1))},I9),w("div",{class:"new-head-r g-flex-align-center",onClick:c[1]||(c[1]=u=>s.$router.push({name:"rechargehistory"}))},B9)]),w("div",L9,ce(V(r).titleText),1),w("div",P9,[w("div",$9,[w("p",D9,ce(V(r).selectText),1),w("ul",R9,[(Ve(!0),Ge(lt,null,zn(a.list,(u,f)=>(Ve(),Ge("li",{key:f,class:"v-recharge-select-item g-flex-align-center",onClick:d=>l(u)},[w("div",N9,[w("img",{src:u.icon,alt:""},null,8,F9),w("span",null,ce(u.title),1)]),z9],8,M9))),128))])])])]))}},U9=Object.freeze(Object.defineProperty({__proto__:null,default:j9},Symbol.toStringTag,{value:"Module"})),V9=""+new URL("../images/Details.png",import.meta.url).href;const H9={class:"s_tuandui_bottom_swiper"},W9={class:"s-tuandui-swiper-box"},q9={class:"swiper-wrapper"},Y9={class:"s-swiper-silde-item-content g-flex-align-center"},G9={class:"s-swiper-silde-item-name"},K9={class:"s-swiper-silde-item-name"},Q9={class:"s-swiper-silde-item-shouyi"},X9={__name:"TuanDuiBottomSwiper",props:{list:{type:Array,default(){return[]}}},setup(e,{expose:t}){const n=e,r=rn();oe(()=>r.tm("mainBottomSwiper"));const a=re(null);function o(){a.value!=null&&a.value.destroy(!0),Ke(()=>{Ps.use([Ah,yh,bh]),a.value=new Ps(".s-tuandui-swiper-box",{loop:!0,direction:"vertical",slidesPerView:10,spaceBetween:0,allowTouchMove:!1,autoplay:{delay:1e3,reverseDirection:!0},pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},speed:800})})}return t({onShow:o}),(i,l)=>(Ve(),Ge("div",H9,[w("div",W9,[w("div",q9,[(Ve(!0),Ge(lt,null,zn(n.list,(s,c)=>(Ve(),Ge("div",{class:"swiper-slide g-flex-align-center",key:c},[w("div",Y9,[w("div",G9,[w("span",null,ce(s.rebate_name),1)]),w("div",K9,[w("span",null,ce(s.user_name),1)]),w("div",Q9,[w("span",null,ce(s.amount)+" "+ce(s.currency),1)])])]))),128))])])]))}};const Z9={class:"v_liang_hua g-flex-column n-bg"},J9={class:"new-head"},ez=w("img",{src:$i,alt:""},null,-1),tz=[ez],nz=w("i",{class:"iconfont icon-datijilu"},null,-1),rz=[nz],az={class:"new-head_title_text"},oz={class:"v-liang-hua-container"},iz={class:"v-liang-hua-top"},sz={class:"v-liang-hua-top-title-list g-flex-align-center"},lz={class:"v-liang-hua-top-title-item"},cz={class:"v-lianghua-top-title"},uz={class:"v-lianghua-top-balance"},dz={class:"v-lianghua-top-balance-value"},fz=w("span",{class:"v-lianghua-top-balance-danwei"},"USDT",-1),pz={class:"v-lianghua-top-btn-list g-flex-align-center g-flex-justify-between"},hz=w("img",{src:V9,alt:""},null,-1),mz=w("img",{src:nE,alt:""},null,-1),gz={class:"v-liang-hua-card-box"},vz={class:"v-liang-hua-card g-flex-align-center"},yz={class:"v-liang-hua-card-item g-flex-column g-flex-align-center"},Az={class:"v-liang-hua-card-item-value"},bz={class:"v-liang-hua-card-item-title"},Ez={class:"v-liang-hua-card-item g-flex-column g-flex-align-center"},xz={class:"v-liang-hua-card-item-value"},Cz={class:"v-liang-hua-card-item-title"},wz={class:"v-liang-hua-card g-flex-align-center"},_z={class:"v-liang-hua-card-item g-flex-column g-flex-align-center"},Sz={class:"v-liang-hua-card-item-value"},kz={class:"v-liang-hua-card-item-title"},Tz={class:"v-liang-hua-card-item g-flex-column g-flex-align-center"},Iz={class:"v-liang-hua-card-item-value"},Oz={class:"v-liang-hua-card-item-title"},Bz={class:"v-liang-hua-card g-flex-align-center"},Lz={class:"v-liang-hua-card-item g-flex-column g-flex-align-center"},Pz={class:"v-liang-hua-card-item-value"},$z={class:"v-liang-hua-card-item-title"},Dz={class:"v-liang-hua-card-item g-flex-column g-flex-align-center"},Rz={class:"v-liang-hua-card-item-value"},Mz={class:"v-liang-hua-card-item-title"},Nz={class:"v-liang-hua-card-btn-box g-flex-align-center g-flex-justify-center"},Fz={class:"v-liang-hua-card-btn-ing g-flex-align-center g-flex-justify-center"},zz={class:"v-liang-hua-step-box"},jz={key:0,class:"iconfont icon-loading"},Uz={class:"v-liang-hua-nav-list g-flex-align-center"},Vz={class:"v-liang-hua-swiper-two"},Hz={class:"v-liang-hua-swiper-two-list-head g-flex-align-center"},Wz={class:"v-liang-hua-swiper-two-list-head-item v-liang-hua-swiper-two-list-head-item-name"},qz={class:"v-liang-hua-swiper-two-list-head-item v-liang-hua-swiper-two-list-head-item-shouyi"},Yz={class:"v-liang-hua-swiper-two-list-head-item v-liang-hua-swiper-two-list-head-item-status g-flex-justify-center"},Gz={class:"v-liang-hua-swiper-one"},Kz={class:"v-liang-hua-swiper-one-list-head g-flex-align-center"},Qz={class:"v-liang-hua-swiper-one-list-head-item v-liang-hua-swiper-one-list-head-item-name"},Xz={class:"v-liang-hua-swiper-one-list-head-item v-liang-hua-swiper-one-list-head-item-name"},Zz={class:"v-liang-hua-swiper-one-list-head-item v-liang-hua-swiper-one-list-head-item-shouyi"},Jz={__name:"LiangHua",setup(e){const t=Vn();Hn();const n=mn(),r=rn(),a=oe(()=>r.tm("lianghua"));let o=re(0),i=re(""),l=re(""),s=oe(()=>[{title:a.value.zhengzaiqidongText,title2:a.value.qidongSuccessText,status:0},{title:a.value.zhengzaisaomiaoText,title2:a.value.saomiaoSuccessText,status:1},{title:a.value.dingDanPipeiZhongText,title2:a.value.dingDanPiPeiSuccess,status:2},{title:`${a.value.zhengzaiText}${i.value}${a.value.faqiBullDanText}`,title2:`${a.value.zaiText}${i.value}${a.value.buySuccessText}`,status:3},{title:`${a.value.zhengzaiText}${l.value}${a.value.faqiSellDanText}`,title2:`${a.value.zaiText}${l.value}${a.value.sellSuccessText}`,status:4},{title:a.value.xitongJieSuanZhongText,title2:a.value.xitongJieSuanSuccessText,status:5},{title:a.value.shouyiFaFangZhongText,title2:a.value.lianghuaWanChengText,status:6}]),c=He({list:[]});u();async function u(){n.loadingShow=!0;const{success:F,data:z}=await J1();!F||(c.list=z.list)}Ps.use([Ah,yh,bh]);let f=He({list:[]}),d=re(!1),m=re(null),y=He({list:[]}),g=re(!1),A=re(null);async function h(){const{success:F,data:z}=await Z1();!F||(f.list=z.list,y.list=z.list2,d.value=!0,m.value.onShow(),console.log(z))}Et(()=>{h()});let p=re(1);function b(F){p.value=F,p.value==1?(d.value=!0,m.value.onShow()):(g.value=!0,A.value.onShow())}let v=He({balance:"0",totalProfit:"0",todayQuantifyProfit:"0",monthQuantifyProfit:"0",yesterdayQuantifyProfit:"0",todayRebateAmount:"0",monthProfit:"0",lastMonthProfit:"0",agent1:0,agentValid1:0,agent2:0,agentValid2:0,agent3:0,agentValid3:0,quantifyProfit:"0",monthRebateAmount:0,rebateAmount:0});async function x(){const{success:F,data:z}=await UR();!F||(Object.assign(v,z.info),console.log(z))}x();let _=oe(()=>n.userInfo),S=re(0);k();async function k(F=!0){F&&(n.loadingShow=!0);const{success:z,data:X}=await pu();!z||(X.info.level.shengyuNums=Number(X.info.level.nums)-Number(X.info.level.todayNums),X.info.level.shengyuNums=X.info.level.shengyuNums<0?0:X.info.level.shengyuNums,n.setUserInfo(X.info),X.info.userQuantify.id?(o.value=X.info.userQuantify.step,i.value=X.info.userQuantify.buy_platform,l.value=X.info.userQuantify.sell_platform,S.value&&clearInterval(S.value),S.value=setTimeout(()=>{k(!1)},2e3)):clearInterval(S.value))}async function $(){n.loadingShow=!0;const{success:F,data:z}=await VR();!F||(At.success(z.msg),k(),x())}function R(){zr.addFn("quantify",F=>{F.code==1?At.success(a.value.lianghuaSuccessText):At.success(a.value.lianghuaFailText),k(),x()})}R(),Un(()=>{zr.removeFn("quantify"),clearInterval(S.value)});let D=He({list:[]});Et(()=>{N()});let j=re(null);function M(){j.value.onShow(D.list)}async function N(){n.loadingShow=!0;const{success:F,data:z}=await Q1();!F||(D.list=z.list,D.list.length>0&&M())}return(F,z)=>{const X=Fn("van-step"),Y=Fn("van-steps");return Ve(),Ge("div",Z9,[w("div",J9,[w("div",{onClick:z[0]||(z[0]=le=>F.$router.go(-1)),class:"new-head-back"},tz),w("div",{onClick:z[1]||(z[1]=le=>F.$router.push({name:"lianghuahistory"})),class:"new-head-r"},rz)]),w("div",az,ce(V(a).titleText),1),w("div",oz,[w("div",iz,[w("div",sz,[w("div",lz,[w("div",cz,[w("span",null,ce(V(a).kelianghuaMoneyText),1)]),w("div",uz,[w("span",dz,ce(V(v).balance),1),fz])])]),w("div",pz,[w("div",{onClick:z[2]||(z[2]=le=>V(t).push({name:"lianghuahistory"})),class:"v-lianghua-top-btn-item v-lianghua-top-btn-item-recharge g-flex-align-center g-flex-justify-center"},[hz,w("span",null,ce(V(a).linaghuaShouruMingXiText),1)]),w("div",{onClick:z[3]||(z[3]=le=>V(t).push({name:"myteam"})),class:"v-lianghua-top-btn-item v-lianghua-top-btn-item-cashout g-flex-align-center g-flex-justify-center"},[mz,w("span",null,ce(V(a).tuanduiShouruMingXiText),1)])])]),w("div",gz,[w("div",vz,[w("div",yz,[w("div",Az,[w("span",null,ce(V(v).todayQuantifyProfit),1)]),w("div",bz,[w("span",null,ce(V(a).jinriShouYiText),1)])]),w("div",Ez,[w("div",xz,[w("span",null,ce(Number(V(v).monthQuantifyProfit).toFixed(2)),1)]),w("div",Cz,[w("span",null,ce(V(a).benyueShouYiText),1)])])]),w("div",wz,[w("div",_z,[w("div",Sz,[w("span",null,ce(Number(V(v).quantifyProfit).toFixed(2)),1)]),w("div",kz,[w("span",null,ce(V(a).lianghuaZongShouYiText),1)])]),w("div",Tz,[w("div",Iz,[w("span",null,ce(Number(V(v).todayRebateAmount).toFixed(2)),1)]),w("div",Oz,[w("span",null,ce(V(a).jinriTuanDuiText),1)])])]),w("div",Bz,[w("div",Lz,[w("div",Pz,[w("span",null,ce(Number(V(v).monthRebateAmount).toFixed(2)),1)]),w("div",$z,[w("span",null,ce(V(a).benyueTuanDuiText),1)])]),w("div",Dz,[w("div",Rz,[w("span",null,ce(Number(V(v).rebateAmount).toFixed(2)),1)]),w("div",Mz,[w("span",null,ce(V(a).tuanduiZongShouYiText),1)])])]),w("div",Nz,[Fe(w("div",Fz,[w("span",null,ce(V(a).lianghuaIngText),1)],512),[[We,V(_).level.taskStatus==1]]),Fe(w("div",{onClick:$,class:"v-liang-hua-card-btn g-flex-align-center g-flex-justify-center"},[w("span",null,ce(V(a).danciqidongText)+"("+ce(V(_).level.shengyuNums)+"/"+ce(V(_).level.nums)+")",1)],512),[[We,V(_).level.taskStatus==0]])]),Fe(w("div",zz,[C(Y,{class:"v-liang-hua-step",direction:"vertical",active:V(o),"active-icon":"success","active-color":"#5314D6"},{default:Ht(()=>[(Ve(!0),Ge(lt,null,zn(V(s),(le,Q)=>Fe((Ve(),Us(X,null,{default:Ht(()=>[Fe(w("span",null,ce(le.title),513),[[We,V(o)<=le.status]]),Fe(w("span",null,ce(le.title2),513),[[We,V(o)>le.status]]),V(o)==le.status?(Ve(),Ge("i",jz)):Zt("",!0)]),_:2},1536)),[[We,V(o)>=le.status]])),256))]),_:1},8,["active"])],512),[[We,V(_).level.taskStatus==1]])]),w("div",Uz,[w("div",{class:Hr([V(p)==1?"active":"","v-liang-hua-nav-item"]),onClick:z[4]||(z[4]=le=>b(1))},[w("span",null,ce(V(a).yonghuLiangHuaText),1)],2),w("div",{class:Hr([V(p)==2?"active":"","v-liang-hua-nav-item"]),onClick:z[5]||(z[5]=le=>b(2))},[w("span",null,ce(V(a).tuanduiFanYongText),1)],2)]),Fe(w("div",Vz,[w("div",Hz,[w("div",Wz,[w("span",null,ce(V(a).huiyuanNameText),1)]),w("div",qz,[w("span",null,ce(V(a).shouyiText),1)]),w("div",Yz,[w("span",null,ce(V(a).statusText),1)])]),Fe(C(RN,{list:V(f).list,ref_key:"refMainBottomSwiper",ref:m},null,8,["list"]),[[We,V(d)]])],512),[[We,V(p)==1]]),Fe(w("div",Gz,[w("div",Kz,[w("div",Qz,[w("span",null,ce(V(a).tuiguangrenText),1)]),w("div",Xz,[w("span",null,ce(V(a).huilirenText),1)]),w("div",Zz,[w("span",null,ce(V(a).fanyongJinErText),1)])]),Fe(C(X9,{list:V(y).list,ref_key:"refTuanDuiBottomSwiper",ref:A},null,8,["list"]),[[We,V(g)]])],512),[[We,V(p)==2]])]),C(rE,{ref_key:"refNoticePop",ref:j},null,512)])}}},ej=Object.freeze(Object.defineProperty({__proto__:null,default:Jz},Symbol.toStringTag,{value:"Module"})),pE=""+new URL("../images/biao.png",import.meta.url).href,tj=""+new URL("../images/Languagesettings.png",import.meta.url).href,nj=""+new URL("../images/reamName.png",import.meta.url).href,rj=""+new URL("../images/Securitycenter.png",import.meta.url).href,aj=""+new URL("../images/Aboutus.png",import.meta.url).href,oj=""+new URL("../images/Signout.png",import.meta.url).href;const ij={class:"v_mycenter g-flex-column"},sj={class:"v-mycenter-container"},lj={class:"mycenterel"},cj=w("img",{class:"mycenterelimg",src:hh,alt:""},null,-1),uj={class:"v-mycenter-head-top g-flex-align-center"},dj={class:"v-mycenter-head-title"},fj={class:"v-mycenter-head-bottom-id"},pj=w("div",{class:"v-mycenter-head-bottom-copy g-flex-align-center"},[w("i",{class:"iconfont icon-ic_line_copy24px"})],-1),hj={class:"cardeleCon"},mj={class:"cardConel1"},gj={class:"cardConel1-lable"},vj={style:{"margin-top":"4px"}},yj=w("span",{style:{"margin-right":"6px",color:"#fff"}},"$",-1),Aj={style:{color:"#fff"}},bj={class:"cardConel1-lable"},Ej={style:{"margin-top":"4px"}},xj={style:{"margin-right":"6px",color:"#fff"}},Cj={class:"v-mycenter-content-list"},wj={class:"v-mycenter-userreal-left g-flex-align-center"},_j=w("div",{class:"v-mycenter-userreal-left-img g-flex-align-center"},[w("img",{src:tj,alt:""})],-1),Sj={class:"v-mycenter-userreal-left-title g-flex-align-center"},kj={class:"v-mycenter-userreal-right g-flex-align-center"},Tj={class:"v-mycenter-userreal-right-text"},Ij=w("div",{class:"v-mycenter-userreal-right-icon g-flex-align-center"},[w("i",{class:"iconfont icon-you"})],-1),Oj={class:"v-mycenter-userreal-left g-flex-align-center"},Bj=w("div",{class:"v-mycenter-userreal-left-img g-flex-align-center"},[w("img",{src:nj,alt:""})],-1),Lj={class:"v-mycenter-userreal-left-title g-flex-align-center"},Pj={class:"v-mycenter-userreal-right g-flex-align-center"},$j={class:"v-mycenter-userreal-right-text"},Dj=w("div",{class:"v-mycenter-userreal-right-icon g-flex-align-center"},[w("i",{class:"iconfont icon-you"})],-1),Rj={class:"v-mycenter-userreal-left g-flex-align-center"},Mj=w("div",{class:"v-mycenter-userreal-left-img g-flex-align-center"},[w("img",{src:rj,alt:""})],-1),Nj={class:"v-mycenter-userreal-left-title g-flex-align-center"},Fj=w("div",{class:"v-mycenter-userreal-right g-flex-align-center"},[w("div",{class:"v-mycenter-userreal-right-icon g-flex-align-center"},[w("i",{class:"iconfont icon-you"})])],-1),zj={class:"v-mycenter-userreal-left g-flex-align-center"},jj=w("div",{class:"v-mycenter-userreal-left-img g-flex-align-center"},[w("img",{src:aj,alt:""})],-1),Uj={class:"v-mycenter-userreal-left-title g-flex-align-center"},Vj=w("div",{class:"v-mycenter-userreal-right g-flex-align-center"},[w("div",{class:"v-mycenter-userreal-right-icon g-flex-align-center"},[w("i",{class:"iconfont icon-you"})])],-1),Hj={class:"v-mycenter-userreal-left g-flex-align-center"},Wj=w("div",{class:"v-mycenter-userreal-left-img g-flex-align-center"},[w("img",{src:oj,alt:""})],-1),qj={class:"v-mycenter-userreal-left-title g-flex-align-center"},Yj={__name:"MyCenter",setup(e){const t=Vn();Hn();const n=mn(),r=rn(),a=oe(()=>r.tm("mycenter"));oe(()=>r.tm("orderHeYue")),oe(()=>r.tm("tokenInfo")),oe(()=>r.tm("lianghua")),oe(()=>r.tm("lianghuaHistory"));function o(){window.location.href=n.system.downUrl}function i(){if(!n.token)return t.push({name:"login"});if(!c.value.userReal.id||c.value.userReal.status==0)return t.push({name:"userreal"});if(c.value.userReal.status==1)return At(a.value.userRealSuccessTipsText);if(c.value.userReal.status==2)return At(a.value.userRealIngTipsText)}function l(h){t.push({name:h})}function s(h){Pt.confirm({title:"",message:a.value.exitLoginOutTipsText,cancelButtonColor:"#000",confirmButtonColor:"#5488f7"}).then(()=>{n.logout()}).catch(()=>{})}let c=oe(()=>n.userInfo);async function u(){n.loadingShow=!0;const{success:h,data:p}=await pu();!h||(n.setUserInfo(p.info),d())}u();let f=He({list:[]});async function d(){n.loadingShow=!0;const{success:h,data:p}=await J1();!h||(f.list=p.list)}He({balance:"0",totalProfit:"0",todayQuantifyProfit:"0",yesterdayQuantifyProfit:"0",todayRebateAmount:"0",yesterdayRebateAmount:"0",monthProfit:"0",lastMonthProfit:"0",agent1:0,agentValid1:0,agent2:0,agentValid2:0,agent3:0,agentValid3:0});function m(){if(!c.value.userReal.id)return a.value.noRenzhengText;if(c.value.userReal.status==0)return a.value.statusFailText;if(c.value.userReal.status==1)return a.value.statusSuccessText;if(c.value.userReal.status==2)return a.value.statusIngText}let y=oe(()=>{if(console.log("store.lang",n.lang),!n.langList.length)return{};var h=n.langList.find(p=>p.code==n.lang);return console.log("target",h),h||n.langList[0]});const g=re({close:null,increase:0}),A=()=>{zr.joinGroup("market_60000",h=>{g.value.price=Number(h.close).toFixed(4),g.value.increase=Math.formatFloat(Number(h.close)-Number(h.open),4)/Number(h.open)})};return Et(()=>{A()}),Un(()=>{zr.leaveGroup("market_60000")}),(h,p)=>(Ve(),Ge("div",ij,[w("div",sj,[w("div",lj,[cj,w("div",{onClick:p[1]||(p[1]=b=>h.$router.push({name:"safecenter"})),class:"v-mycenter-head"},[w("div",uj,[w("div",dj,[w("span",null,ce(V(fE)("+"+V(c).area_code+V(c).mobile)),1)])]),w("div",{onClick:p[0]||(p[0]=Pc(b=>V(dE)(V(c).id),["stop"])),class:"v-mycenter-head-bottom g-flex-align-center"},[w("div",fj,"ID: "+ce(V(c).id),1),pj])]),w("img",{class:"mycenterelimg",src:pE,alt:"",onClick:p[2]||(p[2]=b=>l("mybill"))})]),w("div",hj,[w("div",mj,[w("div",gj,[w("div",null,"MOP "+ce(V(a).balance),1),w("div",vj,[yj,w("span",Aj,ce(Number(V(c).balance_mop).toFixed(2)),1)])]),w("div",bj,[w("div",null,"USDT "+ce(V(a).balance),1),w("div",Ej,[w("span",xj,ce(Number(V(c).balance).toFixed(2)),1)])])])]),w("div",Cj,[w("div",{onClick:p[3]||(p[3]=b=>l("languageset")),class:"v-mycenter-userreal g-flex-align-center"},[w("div",wj,[_j,w("div",Sj,[w("span",null,ce(V(a).yuyanSetText),1)])]),w("div",kj,[w("div",Tj,[w("span",null,ce(V(y).name),1)]),Ij])]),w("div",{onClick:i,class:"v-mycenter-userreal g-flex-align-center"},[w("div",Oj,[Bj,w("div",Lj,[w("span",null,ce(V(a).shengfengRengZhengText),1)])]),w("div",Pj,[w("div",$j,[w("span",null,ce(m()),1)]),Dj])]),Zt("",!0),w("div",{onClick:p[5]||(p[5]=b=>l("safecenter")),class:"v-mycenter-userreal g-flex-align-center"},[w("div",Rj,[Mj,w("div",Nj,[w("span",null,ce(V(a).safeCenterText),1)])]),Fj]),Zt("",!0),w("div",{onClick:p[7]||(p[7]=b=>l("aboutus")),class:"v-mycenter-userreal g-flex-align-center"},[w("div",zj,[jj,w("div",Uj,[w("span",null,ce(V(a).aboutUsText),1)])]),Vj]),Zt("",!0),w("div",{onClick:s,class:"v-mycenter-userreal g-flex-align-center"},[w("div",Hj,[Wj,w("div",qj,[w("span",null,ce(V(a).tuichuLoginText),1)])])])]),w("div",{class:"mine-btnSA",onClick:o},ce(V(a).xiazaiAppText),1)])]))}},Gj=Object.freeze(Object.defineProperty({__proto__:null,default:Yj},Symbol.toStringTag,{value:"Module"}));const Kj={class:"v_rule g-flex-column n-bg"},Qj={class:"new-head"},Xj=w("img",{src:$i,alt:""},null,-1),Zj=[Xj],Jj={class:"new-head_title_text"},eU=["innerHTML"],tU={__name:"Intro",setup(e){const t=mn(),n=rn(),r=oe(()=>n.tm("rule"));oe(()=>n.tm("gongyong")),Hn(),Vn();let a=He({id:6}),o=He({obj:{create_time:0}});async function i(){t.loadingShow=!0;const{success:l,data:s}=await X1(a);!l||(o.obj=s.info,console.log(s))}return i(),(l,s)=>(Ve(),Ge("div",Kj,[w("div",Qj,[w("div",{onClick:s[0]||(s[0]=c=>l.$router.go(-1)),class:"new-head-back"},Zj)]),w("div",Jj,ce(V(r).titleText),1),w("div",{class:"v-rule-container",innerHTML:V(o).obj.content},null,8,eU)]))}},nU=Object.freeze(Object.defineProperty({__proto__:null,default:tU},Symbol.toStringTag,{value:"Module"})),hE=""+new URL("../images/blanguageset.png",import.meta.url).href,mE=""+new URL("../images/ch-bg.png",import.meta.url).href,gE=""+new URL("../images/btn-right.png",import.meta.url).href;const rU={class:"c_bind_phone_pop"},aU={class:"c-bind-phone-container g-flex-column"},oU=w("i",{class:"iconfont icon-guanbi"},null,-1),iU=[oU],sU={class:"c-bind-phone-pop-title"},lU={class:"c-bind-phone-list"},cU=["onClick"],uU={class:"c-bind-phone-item-left g-flex-align-center"},dU=["src"],fU={class:"c-bind-phone-item-right"},pU={class:"c-bind-phone-list"},hU=["onClick"],mU={class:"c-bind-phone-item-left g-flex-align-center"},gU=["src"],vU={class:"c-bind-phone-item-right"},vE={__name:"BindPhonesPop",props:{list:{type:Array,default(){return[]}}},emits:["emitPhoneItemClick"],setup(e,{expose:t,emit:n}){const r=e,a=rn(),o=oe(()=>a.tm("bindPhonePop"));let i=re(!1),l=re(""),s=He({list:[]});function c(){i.value=!0}function u(){i.value=!1}function f(){s.list=r.list.filter(m=>m.country.indexOf(l.value)!=-1||m.area_code.toString().indexOf(l.value)!=-1)}function d(m){n("emitPhoneItemClick",m),u()}return t({onShow:c}),(m,y)=>{const g=Fn("van-search"),A=Fn("van-popup");return Ve(),Ge("div",rU,[C(A,{class:"c-pop","safe-area-inset-bottom":"",position:"right",style:{height:"100%",width:"90%"},show:V(i),"onUpdate:show":y[1]||(y[1]=h=>ct(i)?i.value=h:i=h)},{default:Ht(()=>[w("div",aU,[w("div",{class:"c-pop-close",onClick:u},iU),w("p",sU,ce(V(o).titleText),1),C(g,{class:"c-bind-phone-pop-search",onInput:f,onClear:f,modelValue:V(l),"onUpdate:modelValue":y[0]||(y[0]=h=>ct(l)?l.value=h:l=h),"show-action":"",placeholder:V(o).inputAreaPlaceholderText,onSearch:f},{action:Ht(()=>[w("div",{onClick:f},ce(V(o).searchText),1)]),_:1},8,["modelValue","placeholder"]),Fe(w("ul",lU,[(Ve(!0),Ge(lt,null,zn(r.list,(h,p)=>(Ve(),Ge("li",{onClick:b=>d(h),class:"c-bind-phone-item g-flex-align-center g-flex-justify-between",key:p},[w("div",uU,[w("img",{src:h.icon,alt:""},null,8,dU),w("span",null,ce(h.country),1)]),w("div",fU,[w("p",null,"+"+ce(h.area_code),1)])],8,cU))),128))],512),[[We,!V(s).list.length&&!V(l)]]),Fe(w("ul",pU,[(Ve(!0),Ge(lt,null,zn(V(s).list,(h,p)=>(Ve(),Ge("li",{onClick:b=>d(h),class:"c-bind-phone-item g-flex-align-center g-flex-justify-between",key:p},[w("div",mU,[w("img",{src:h.icon,alt:""},null,8,gU),w("span",null,ce(h.country),1)]),w("div",vU,[w("p",null,"+"+ce(h.area_code),1)])],8,hU))),128))],512),[[We,V(s).list.length]])])]),_:1},8,["show"])])}}};const yU={class:"v_login g-flex-column n-bg"},AU={class:"new-head"},bU=w("img",{style:{width:"50px",height:"50px","border-radius":"8px"},src:$i,alt:""},null,-1),EU=[bU],xU={class:"v-login-head-language g-flex-align-center"},CU=w("img",{class:"ch-bg",src:mE},null,-1),wU={class:"v-login-container"},_U={class:"v-login-logo",style:{display:"inline-block !important"}},SU={class:"v-login-logo-title g-flex-align-center g-flex-justify-center"},kU={class:"n-nav-list"},TU={class:"v-form"},IU={class:"n-form-box"},OU={class:"n-form-title"},BU={class:"v-form-item"},LU={class:"v-form-item-middle-input"},PU=["placeholder"],$U={class:"n-form-box"},DU={class:"n-form-title"},RU={class:"v-form-item-box"},MU={class:"v-form-item g-flex-align-center"},NU={class:"v-form-item-left-text"},FU=w("i",{class:"iconfont icon-right-1-copy"},null,-1),zU={class:"v-form-item-middle-input"},jU=["placeholder"],UU={class:"n-form-box"},VU={class:"n-form-title"},HU={class:"v-form-item g-flex-align-center"},WU={class:"v-form-item-middle-input"},qU=["type","placeholder"],YU={class:"iconfont icon-bukejian"},GU={class:"iconfont icon-kejian"},KU={class:"n-form-box"},QU={class:"n-form-title"},XU={class:"v-form-item g-flex-align-center"},ZU={class:"v-form-item-middle-input"},JU=["placeholder"],eV=["src"],tV={class:"v-form-bottom g-flex-align-center g-flex-justify-between",style:{float:"right","font-weight":"bold"}},nV={class:"v-form-bottom-item-val",style:{color:"#544277"}},rV={class:"n-btn-list",style:{"margin-top":"150px"}},aV=w("img",{src:gE},null,-1),oV=[aV],iV={__name:"Login",setup(e){const t=mn(),n=rn(),r=oe(()=>n.tm("login")),a=oe(()=>n.tm("gongyong")),o=Hn(),i=Vn();let l=re(""),s=He({type:1,area_code:"",mobile:"",account:"",password:"",code:"",codeKey:""});function c(){let _=o.query.tid;_&&window.localStorage.setItem("tid",_)}c();function u(_){s.type=_}let f=re(!1);re(0);let d=re("");d.value=a.value.sendCodeText;let m=He({list:[]});h();const y=re(null);function g(){y.value.onShow()}function A(_){s.area_code=_.area_code}async function h(){const{success:_,data:S}=await K1();!_||(m.list=S.list,s.area_code=S.list[0].area_code)}async function p(){t.loadingShow=!0,s.password=l.value;const{success:_,data:S}=await NR(s);if(!_){x();return}let k=S.token;zr.setToken(k),t.setToken(k),At(S.msg),b(),i.replace({name:"main"})}async function b(){const{success:_,data:S}=await ph({id:2});!_||(t.kefu=S.info,console.log("store",t))}let v=re("");async function x(){t.loadingShow=!0;const{success:_,data:S}=await eE();!_||(s.codeKey=S.codeKey,v.value=S.imgUrl)}return Et(()=>{x(),console.log("login in 88888"),console.log(t.system.wsUrl),console.log(zr.connected),t.system.wsUrl&&!zr.connected&&zr.connect(t.system.wsUrl,t.token)}),(_,S)=>(Ve(),Ge("div",yU,[w("div",AU,[w("div",{onClick:S[0]||(S[0]=k=>_.$router.push({name:"main"})),class:"new-head-back"},EU),w("div",xU,[w("img",{src:mh,alt:"",onClick:S[1]||(S[1]=(...k)=>V(xi)&&V(xi)(...k)),style:{width:"50px",height:"50px","border-radius":"8px"}}),w("img",{onClick:S[2]||(S[2]=k=>_.$router.push({name:"languageset"})),style:{width:"50px",height:"50px","border-radius":"8px"},src:hE,alt:""})])]),CU,w("div",wU,[w("div",_U,[w("div",SU,ce(V(r).title2Text),1)]),w("div",kU,[w("div",{onClick:S[3]||(S[3]=k=>u(1)),class:Hr([V(s).type==1?"active":"","v-nav-item"])},[w("span",null,ce(V(r).mobileLoginText),1)],2),w("div",{onClick:S[4]||(S[4]=k=>u(0)),class:Hr([V(s).type==0?"active":"","v-nav-item"])},[w("span",null,ce(V(r).accountLoginText),1)],2)]),w("div",TU,[Fe(w("div",IU,[w("div",OU,ce(V(r).emailAccountText),1),Fe(w("div",BU,[w("div",LU,[Fe(w("input",{type:"text","onUpdate:modelValue":S[5]||(S[5]=k=>V(s).account=k),placeholder:V(r).emailAccountPlaceholderText},null,8,PU),[[kn,V(s).account]])])],512),[[We,V(s).type==0]])],512),[[We,V(s).type==0]]),Fe(w("div",$U,[w("div",DU,ce(V(r).mobileText),1),w("div",RU,[w("div",MU,[w("div",{onClick:g,class:"v-form-item-left g-flex-align-center",style:{"padding-left":"17px !important"}},[w("span",NU,"+"+ce(V(s).area_code),1),FU]),w("div",zU,[Fe(w("input",{type:"text","onUpdate:modelValue":S[6]||(S[6]=k=>V(s).mobile=k),placeholder:V(r).mobilePlaceholderText},null,8,jU),[[kn,V(s).mobile]])])])])],512),[[We,V(s).type==1]]),w("div",UU,[w("div",VU,ce(V(r).pwdText),1),w("div",HU,[w("div",WU,[Fe(w("input",{type:V(f)?"text":"password","onUpdate:modelValue":S[7]||(S[7]=k=>ct(l)?l.value=k:l=k),placeholder:V(r).pwdPlaceholderText},null,8,qU),[[_s,V(l)]])]),w("div",{onClick:S[8]||(S[8]=k=>ct(f)?f.value=!V(f):f=!V(f)),class:"v-form-item-middle-right g-flex-align-center"},[Fe(w("i",YU,null,512),[[We,!V(f)]]),Fe(w("i",GU,null,512),[[We,V(f)]])])])]),w("div",KU,[w("div",QU,ce(V(r).codeText),1),w("div",XU,[w("div",ZU,[Fe(w("input",{type:"text","onUpdate:modelValue":S[9]||(S[9]=k=>V(s).code=k),placeholder:V(r).codePlaceholderText},null,8,JU),[[kn,V(s).code]])]),w("div",{onClick:x,class:"v-form-item-middle-right g-flex-align-center"},[w("img",{src:V(v),alt:""},null,8,eV)])])]),w("div",tV,[w("div",{onClick:S[10]||(S[10]=k=>_.$router.push({name:"forgetpwd"})),class:"v-form-bottom-item g-flex-align-center"},[w("div",nV,ce(V(r).forgetText),1)])]),w("div",rV,[w("div",{class:"n-btn-list-l",onClick:S[11]||(S[11]=k=>_.$router.push({name:"register"}))},[w("span",null,ce(V(r).registerText),1)]),w("div",{class:"v-form-btn-box"},[w("div",{onClick:p,class:"v-form-btn g-flex-align-center g-flex-justify-center"},oV)])])])]),C(vE,{ref_key:"refBindPhonesPop",ref:y,list:V(m).list,onEmitPhoneItemClick:A},null,8,["list"])]))}},sV=Object.freeze(Object.defineProperty({__proto__:null,default:iV},Symbol.toStringTag,{value:"Module"}));const lV={class:"v_register g-flex-column n-bg"},cV={class:"new-head"},uV=w("img",{style:{width:"50px",height:"50px","border-radius":"8px"},src:$i,alt:""},null,-1),dV=[uV],fV={class:"v-login-head-language g-flex-align-center"},pV=w("img",{class:"ch-bg",src:mE},null,-1),hV={class:"v-register-container"},mV={class:"v-register-logo"},gV={class:"v-register-logo-title g-flex-align-center g-flex-justify-center n-s-title"},vV={class:"v-nav-list g-flex-align-center n-r"},yV={class:"v-form"},AV={class:"n-form-box"},bV={class:"n-form-title"},EV={class:"v-form-item g-flex-align-center"},xV={class:"v-form-item-middle-input"},CV=["placeholder"],wV={class:"n-form-box"},_V={class:"n-form-title"},SV={class:"v-form-item g-flex-align-center"},kV={class:"v-form-item-left-text"},TV={class:"v-form-item-middle-input"},IV=["placeholder"],OV={class:"n-form-box"},BV={class:"n-form-title"},LV={class:"v-form-item g-flex-align-center"},PV={class:"v-form-item-middle-input"},$V=["placeholder"],DV={class:"n-form-box"},RV={class:"n-form-title"},MV={class:"v-form-item g-flex-align-center"},NV={class:"v-form-item-middle-input"},FV=["type","placeholder"],zV={class:"iconfont icon-bukejian"},jV={class:"iconfont icon-kejian"},UV={class:"n-form-box"},VV={class:"n-form-title"},HV={class:"v-form-item g-flex-align-center"},WV={class:"v-form-item-middle-input"},qV=["type","placeholder"],YV={class:"iconfont icon-bukejian"},GV={class:"iconfont icon-kejian"},KV={key:0,class:"n-form-box"},QV={class:"n-form-title"},XV={class:"v-form-item g-flex-align-center"},ZV={class:"v-form-item-middle-input"},JV=["placeholder"],eH={class:"n-form-box"},tH={class:"n-form-title"},nH={class:"v-form-item g-flex-align-center"},rH=w("div",{class:"v-form-item-left g-flex-align-center"},[w("i",{class:"iconfont icon-yanzhengma"})],-1),aH={class:"v-form-item-middle-input"},oH=["placeholder"],iH={class:"v-form-item-middle-right-text"},sH={class:"n-form-box"},lH={class:"v-form-item g-flex-align-center"},cH=w("div",{class:"v-form-item-left g-flex-align-center"},[w("i",{class:"iconfont icon-yanzhengma"})],-1),uH={class:"v-form-item-middle-input"},dH=["placeholder"],fH=["src"],pH={class:"v-form-bottom g-flex-align-center g-flex-justify-between"},hH={class:"v-form-bottom-item g-flex-align-center"},mH={class:"v-form-bottom-item-title"},gH={class:"v-register-footer-tips g-flex-justify-center g-flex-align-center"},vH=w("div",null,null,-1),yH=w("img",{src:gE},null,-1),AH=[yH],bH={__name:"Register",setup(e){const t=mn(),n=rn(),r=oe(()=>n.tm("register")),a=oe(()=>n.tm("gongyong")),o=Hn(),i=Vn();let l=re(!1),s=re(!1),c=He({type:Number(t.system.RegMode[0]),user_name:"",area_code:"",mobile:"",email:"",code:"",tid:"",password:"",password2:"",codeKey:"",type:"1"});u();function u(){var $=o.query.tid;if($)window.localStorage.setItem("tid",$),c.tid=$;else{var R=window.localStorage.getItem("tid");c.tid=R||""}}let f=He({list:[]});async function d(){const{success:$,data:R}=await K1();!$||(f.list=R.list,c.area_code=R.list[0].area_code)}d();const m=re(null);function y(){m.value.onShow()}function g($){console.log("xxx",$.area_code),c.area_code=$.area_code}let A=re(0),h=re("");h.value=a.value.sendCodeText;function p(){A.value||(c.type==1?b():c.type==2&&v())}async function b(){t.loadingShow=!0;const{success:$,data:R}=await MR({area_code:c.area_code,mobile:c.mobile});if(!$)return;let D=60;At(R.msg),A.value=setInterval(()=>{D--,h.value=D===0?a.value.againSendCodeText:D+"s",D===0&&(clearInterval(A.value),A.value=0)},1e3)}async function v(){t.loadingShow=!0;const{success:$,data:R}=await DR({email:c.email});if(!$)return;let D=60;At(R.msg),A.value=setInterval(()=>{D--,h.value=D==0?a.value.againSendCodeText:D+"s",D===0&&(clearInterval(A.value),A.value=0)},1e3)}async function x(){if(c.password!=c.password2)return At(r.value.pwdNoSame);t.loadingShow=!0;const{success:$,data:R}=await RR(c);if(!$)return k();At(R.msg),t.setToken(R.token),zr.setToken(R.token),_(),setTimeout(()=>{i.replace({name:"main"})},500),console.log(R)}async function _(){const{success:$,data:R}=await ph({id:2});!$||(t.kefu=R.info,console.log("store",t))}let S=re("");async function k(){t.loadingShow=!0;const{success:$,data:R}=await eE();!$||(c.codeKey=R.codeKey,S.value=R.imgUrl,console.log(R))}return k(),($,R)=>(Ve(),Ge("div",lV,[w("div",cV,[w("div",{onClick:R[0]||(R[0]=D=>$.$router.go(-1)),class:"new-head-back"},dV),w("div",fV,[w("img",{src:mh,alt:"",onClick:R[1]||(R[1]=(...D)=>V(xi)&&V(xi)(...D)),style:{width:"50px",height:"50px","border-radius":"8px"}}),w("img",{style:{width:"50px",height:"50px","border-radius":"8px"},onClick:R[2]||(R[2]=D=>$.$router.push({name:"languageset"})),src:hE,alt:""})])]),pV,w("div",hV,[w("div",mV,[w("div",gV,[w("span",null,ce(V(r).title2Text),1)])]),w("div",vV,[Zt("",!0)]),w("div",yV,[Fe(w("div",AV,[w("div",bV,ce(V(r).usernameText),1),w("div",EV,[w("div",xV,[Fe(w("input",{type:"text","onUpdate:modelValue":R[8]||(R[8]=D=>V(c).user_name=D),placeholder:V(r).usernamePlaceholderText},null,8,CV),[[kn,V(c).user_name]])])])],512),[[We,V(t).system.UserShow==1||V(c).type==0]]),Fe(w("div",wV,[w("div",_V,ce(V(r).mobileText),1),w("div",SV,[w("div",{onClick:y,class:"v-form-item-left g-flex-align-center",style:{"padding-left":"17px !important"}},[w("span",kV,"+"+ce(V(c).area_code),1)]),w("div",TV,[Fe(w("input",{type:"text","onUpdate:modelValue":R[9]||(R[9]=D=>V(c).mobile=D),placeholder:V(r).mobilePlaceholderText},null,8,IV),[[kn,V(c).mobile]])])])],512),[[We,V(c).type==1||V(c).type==3]]),Fe(w("div",OV,[w("div",BV,ce(V(r).emailText),1),w("div",LV,[w("div",PV,[Fe(w("input",{type:"text","onUpdate:modelValue":R[10]||(R[10]=D=>V(c).email=D),placeholder:V(r).emailPlaceholderText},null,8,$V),[[kn,V(c).email]])])])],512),[[We,V(c).type==2||V(c).type==4]]),w("div",DV,[w("div",RV,ce(V(r).pwdText),1),w("div",MV,[w("div",NV,[Fe(w("input",{type:V(l)?"text":"password","onUpdate:modelValue":R[11]||(R[11]=D=>V(c).password=D),placeholder:V(r).pwdPlaceholderText},null,8,FV),[[_s,V(c).password]])]),w("div",{onClick:R[12]||(R[12]=D=>ct(l)?l.value=!V(l):l=!V(l)),class:"v-form-item-middle-right g-flex-align-center"},[Fe(w("i",zV,null,512),[[We,!V(l)]]),Fe(w("i",jV,null,512),[[We,V(l)]])])])]),w("div",UV,[w("div",VV,ce(V(r).secondPwdText),1),w("div",HV,[w("div",WV,[Fe(w("input",{type:V(s)?"text":"password","onUpdate:modelValue":R[13]||(R[13]=D=>V(c).password2=D),placeholder:V(r).secondPwdPlaceholderText},null,8,qV),[[_s,V(c).password2]])]),w("div",{onClick:R[14]||(R[14]=D=>ct(s)?s.value=!V(s):s=!V(s)),class:"v-form-item-middle-right g-flex-align-center"},[Fe(w("i",YV,null,512),[[We,!V(s)]]),Fe(w("i",GV,null,512),[[We,V(s)]])])])]),V(t).system.TidSet!=0?(Ve(),Ge("div",KV,[w("div",QV,ce(V(r).inviteCodeText),1),w("div",XV,[w("div",ZV,[Fe(w("input",{type:"text","onUpdate:modelValue":R[15]||(R[15]=D=>V(c).tid=D),placeholder:V(r).inviteCodeBiTianPlaceholderText},null,8,JV),[[kn,V(c).tid]])])])])):Zt("",!0),Fe(w("div",eH,[w("div",tH,ce(V(r).codeText),1),w("div",nH,[rH,w("div",aH,[Fe(w("input",{type:"text","onUpdate:modelValue":R[16]||(R[16]=D=>V(c).code=D),placeholder:V(r).yanzhengCodeText},null,8,oH),[[kn,V(c).code]])]),w("div",{onClick:p,class:"v-form-item-middle-right g-flex-align-center"},[w("span",iH,ce(V(h)),1)])])],512),[[We,V(c).type!=0&&V(c).type!=3&&V(c).type!=4]]),Fe(w("div",sH,[w("div",lH,[cH,w("div",uH,[Fe(w("input",{type:"text","onUpdate:modelValue":R[17]||(R[17]=D=>V(c).code=D),placeholder:V(r).yanzhengCodeText},null,8,dH),[[kn,V(c).code]])]),w("div",{onClick:k,class:"v-form-item-middle-right g-flex-align-center"},[w("img",{src:V(S),alt:""},null,8,fH)])])],512),[[We,V(c).type==0||V(c).type==3||V(c).type==4]]),w("div",pH,[w("div",hH,[w("div",mH,[w("span",null,ce(V(r).alreadyText),1)]),w("div",{onClick:R[18]||(R[18]=D=>$.$router.replace({name:"login"})),class:"v-form-bottom-item-val"},[w("span",null,ce(V(r).loginBtnText),1)])])])]),w("div",gH,[w("span",null,ce(V(r).registerTipsText),1),w("span",{onClick:R[19]||(R[19]=D=>$.$router.push({name:"rule",query:{id:1}})),class:"v-register-footer-tips-val"},ce(V(r).shiyongtiaokuanText),1),w("span",null,ce(V(r).andText),1),w("span",{onClick:R[20]||(R[20]=D=>$.$router.push({name:"rule",query:{id:2}})),class:"v-register-footer-tips-val"},ce(V(r).yingsiText),1)])]),w("div",{class:"n-btn-list",style:{padding:"0 30px"}},[vH,w("div",{class:"v-form-btn-box"},[w("div",{onClick:x,class:"v-form-btn g-flex-align-center g-flex-justify-center"},AH)])]),C(vE,{list:V(f).list,onEmitPhoneItemClick:g,ref_key:"refBindPhonesPop",ref:m},null,8,["list"])]))}},EH=Object.freeze(Object.defineProperty({__proto__:null,default:bH},Symbol.toStringTag,{value:"Module"}));const xH={class:"v_cashout_select g-flex-column n-bg"},CH={class:"new-head"},wH=w("img",{src:$i,alt:""},null,-1),_H=[wH],SH=w("img",{src:pE,alt:""},null,-1),kH=[SH],TH={class:"new-head_title_text"},IH={class:"v-cashout-select-container"},OH={class:"v-cashout-select-list"},BH=["onClick"],LH={class:"v-cashout-methon-item-left g-flex-align-center"},PH=["src"],$H=w("div",{class:"v-cashout-methon-item-right g-flex-align-center"},[w("i",{class:"iconfont icon-you"})],-1),DH={__name:"CashoutSelect",setup(e){const t=mn(),n=rn(),r=oe(()=>n.tm("cashoutSelect"));Hn();const a=Vn();let o=He({list:[]});async function i(){t.loadingShow=!0;const{success:u,data:f}=await zR({type:1});!u||(o.list=f.list)}i();function l(u){u.fn=="Bank"?a.push({name:"cashoutbank",params:{id:u.id}}):u.fn=="Wallet"?a.push({name:"cashoutbi",params:{id:u.id}}):u.fn=="KeFu"&&a.push({name:"cashoutkefu",params:{id:u.id}})}let s=He({obj:{create_time:0}});async function c(){t.loadingShow=!0;const{success:u,data:f}=await X1({id:11});!u||(s.obj=f.info,console.log(f))}return c(),(u,f)=>(Ve(),Ge("div",xH,[w("div",CH,[w("div",{onClick:f[0]||(f[0]=d=>u.$router.go(-1)),class:"new-head-back"},_H),w("div",{onClick:f[1]||(f[1]=d=>u.$router.push({name:"cashouthistory"})),class:"v-head-right g-flex-align-center"},kH)]),w("div",TH,ce(V(r).titleText),1),w("div",IH,[w("div",OH,[(Ve(!0),Ge(lt,null,zn(V(o).list,(d,m)=>(Ve(),Ge("div",{onClick:y=>l(d),key:m,class:"v-cashout-select-item g-flex-align-center"},[w("div",LH,[w("img",{src:d.icon,alt:""},null,8,PH),w("span",null,ce(d.title),1)]),$H],8,BH))),128))]),Zt("",!0)])]))}},RH=Object.freeze(Object.defineProperty({__proto__:null,default:DH},Symbol.toStringTag,{value:"Module"}));export{UW as $,b8 as A,A8 as B,FH as C,Xp as D,Hn as E,He as F,QW as G,XW as H,$i as I,ct as J,Et as K,$A as L,lt as M,zn as N,Pc as O,VW as P,At as Q,_0 as R,dy as S,Ao as T,fy as U,wW as V,pu as W,Un as X,Sa as Y,Hr as Z,tE as _,Ge as a,lW as a$,zr as a0,HW as a1,WW as a2,qW as a3,rq as a4,GW as a5,YW as a6,aq as a7,nq as a8,Wt as a9,_W as aA,Os as aB,VH as aC,HH as aD,ui as aE,KS as aF,nW as aG,tW as aH,rW as aI,eW as aJ,X1 as aK,YH as aL,GH as aM,qH as aN,WH as aO,aW as aP,oW as aQ,xi as aR,iW as aS,tq as aT,xW as aU,eF as aV,sW as aW,KH as aX,fW as aY,KW as aZ,mW as a_,DW as aa,NW as ab,Ci as ac,hw as ad,MW as ae,RW as af,$W as ag,Cr as ah,KN as ai,PW as aj,dE as ak,K1 as al,kn as am,_s as an,vE as ao,mE as ap,MR as aq,DR as ar,UH as as,gE as at,uW as au,Q1 as av,dW as aw,Pt as ax,hW as ay,pW as az,w as b,cW as b0,oq as b1,LW as b2,eq as b3,SW as b4,ZH as b5,JH as b6,QH as b7,XH as b8,kW as b9,TW as ba,gW as bb,vW as bc,CW as bd,yW as be,AW as bf,EW as bg,bW as bh,IW as bi,OW as bj,BW as bk,FW as bl,zW as bm,jW as bn,jy as bo,oe as c,V as d,C as e,Vn as f,re as g,zH as h,jH as i,Us as j,Ht as k,fw as l,Zt as m,Ke as n,Ve as o,Fe as p,ye as q,Fn as r,mn as s,ce as t,rn as u,We as v,Ie as w,f8 as x,Bc as y,p0 as z};
