import{s as k,u as E,c as S,o as _,a as w,b as x,t as C,d as g,r as K,e as L,f as z,n as O,g as b,h as A,i as D,L as T,w as M,j as N,k as j,T as B,l as P,R as F,m as X,p as Y,v as $,q,x as I,y as R,z as V,A as G}from"./main.64a8a52d.js";(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function a(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerpolicy&&(c.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?c.credentials="include":r.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=a(r);fetch(r.href,c)}})();(function(){if(typeof window>"u")return;var i,u="ontouchstart"in window;document.createTouch||(document.createTouch=function(s,e,l,d,t,n,p){return new a(e,l,{pageX:d,pageY:t,screenX:n,screenY:p,clientX:d-window.pageXOffset,clientY:t-window.pageYOffset},0,0)}),document.createTouchList||(document.createTouchList=function(){for(var s=o(),e=0;e<arguments.length;e++)s[e]=arguments[e];return s.length=arguments.length,s}),Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(s){var e=this;do{if(e.matches(s))return e;e=e.parentElement||e.parentNode}while(e!==null&&e.nodeType===1);return null});var a=function(e,l,d,t,n){t=t||0,n=n||0,this.identifier=l,this.target=e,this.clientX=d.clientX+t,this.clientY=d.clientY+n,this.screenX=d.screenX+t,this.screenY=d.screenY+n,this.pageX=d.pageX+t,this.pageY=d.pageY+n};function o(){var s=[];return s.item=function(e){return this[e]||null},s.identifiedTouch=function(e){return this[e+1]||null},s}var r=!1;function c(s){return function(e){e.type==="mousedown"&&(r=!0),e.type==="mouseup"&&(r=!1),!(e.type==="mousemove"&&!r)&&((e.type==="mousedown"||!i||i&&!i.dispatchEvent)&&(i=e.target),i.closest("[data-no-touch-simulate]")==null&&f(s,e),e.type==="mouseup"&&(i=null))}}function f(s,e){var l=document.createEvent("Event");l.initEvent(s,!0,!0),l.altKey=e.altKey,l.ctrlKey=e.ctrlKey,l.metaKey=e.metaKey,l.shiftKey=e.shiftKey,l.touches=y(e),l.targetTouches=y(e),l.changedTouches=h(e),i.dispatchEvent(l)}function h(s){var e=o();return e.push(new a(i,1,s,0,0)),e}function y(s){return s.type==="mouseup"?o():h(s)}function v(){window.addEventListener("mousedown",c("touchstart"),!0),window.addEventListener("mousemove",c("touchmove"),!0),window.addEventListener("mouseup",c("touchend"),!0)}v.multiTouchOffset=75,u||new v})();const W={class:"c-no-list g-flex-column g-flex-align-center"},H=["src"],J={class:"c-no-list-text"},Q={__name:"NoList",setup(i){k();const u=E(),a=S(()=>u.tm("nolist"));return(o,r)=>(_(),w("div",W,[x("img",{src:"/img/icon/deficiency_assets_record.png",alt:""},null,8,H),x("p",J,C(g(a).tipsText),1)]))}};const U=(i,u)=>{const a=i.__vccOpts||i;for(const[o,r]of u)a[o]=r;return a},Z={},ee={class:"c_loading"};function te(i,u){const a=K("van-loading");return _(),w("div",ee,[L(a,{class:"c-loading-content",color:"#FF2742"})])}const ne=U(Z,[["render",te]]);const oe={class:"v_app"},se={__name:"App",setup(i){const u=z(),a=E();S(()=>a.tm("hourechargeselect"));const o=k();var r=document.querySelector("body");console.log("bodyDom",r),c();function c(){o.isDark?O(()=>{r.className="v_theme_dark"}):O(()=>{r.className=""})}var f=b("");let h=b(!1);y();async function y(){const{success:t,data:n}=await A();!t||(o.langList=n.langList,o.banner=n.banner,o.kefu=n.kefu,o.system=n.system,document.title=n.system.WebTitle,console.log(n),o.lang?s(o.lang):n.system.Lang?s(n.system.Lang):v(),console.log("store",o))}function v(){var t=o.langList.map(p=>p.code),n=(navigator.language||navigator.browserLanguage).toLowerCase();if(console.log("jsLanguage12222222111",n),n.indexOf("zh-tw")>=0&&t.indexOf("zh-TW")>-1){s("zh-TW");return}else if(n.indexOf("zh")>=0&&t.indexOf("zh-CN")>-1){s("zh-CN");return}else if(n.indexOf("en")>=0&&t.indexOf("en")>-1){s("en");return}else if(n.indexOf("vi")>=0&&t.indexOf("vi")>-1){s("vi");return}s("en")}async function s(t){if(console.log("i18nObj.locale.value222222222",a.locale.value),console.log("params",t),a.locale.value!==t)return o.loadedLanguages.includes(t)?Promise.resolve(d(t)):e(t);e(t)}async function e(t){const{success:n,data:p}=await D({lang:t,id:1});!n||(console.log(Object.prototype.hasOwnProperty.call(o.langObj,t)),a.setLocaleMessage(t,p.data),o.loadedLanguages.push(t),d(t))}let l=document.getElementById("app-loading");function d(t){return o.setLanguage(t),a.locale.value=t,console.log("i18nObj.locale.value",a.locale.value),console.log("store.lang",o.lang),Object.prototype.hasOwnProperty.call(o.langObj,t)?T.use(t,o.langObj[t]):T.use("en",o.langObj.en),document.querySelector("html").setAttribute("lang",t),l.style.display="none",h.value=!0,t}return console.log("router",u),M(()=>u.currentRoute.value,(t,n)=>{n.fullPath!="/"&&(t.meta.index>n.meta.index?f.value="slide-left":t.meta.index==n.meta.index?f.value="":(console.log("\u540E\u9000"),f.value="slide-right"))},{deep:!0}),(t,n)=>(_(),w("div",oe,[g(h)?(_(),N(g(F),{key:0},{default:j(({Component:p})=>[L(B,{name:g(f)},{default:j(()=>[(_(),N(P(p)))]),_:2},1032,["name"])]),_:1})):X("",!0),Y(L(ne,{color:"#F9436B"},null,512),[[$,g(o).loadingShow]])]))}},m=q(se);m.use(I);m.use(R);m.use(V);m.component("NoList",Q);Math.formatFloat=function(i,u){var a=Math.pow(10,u);return Math.round(i*a)/a};m.use(G);m.mount("#app");export{U as _};
