import{v as S,_ as r,x as U,a as C,u as k,b as w,y as N,c as O,o as x,k as M,h as V,l as B,n as W,z as q,g as z,m as H}from"./index.088b396a.js";import{w as K}from"./ws.9df1dd9b.js";var b={exports:{}};/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */(function(h,I){(function(e,s){h.exports=s()})(S,function(){var e={};e.version="0.2.0";var s=e.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};e.configure=function(t){var i,o;for(i in t)o=t[i],o!==void 0&&t.hasOwnProperty(i)&&(s[i]=o);return this},e.status=null,e.set=function(t){var i=e.isStarted();t=v(t,s.minimum,1),e.status=t===1?null:t;var o=e.render(!i),_=o.querySelector(s.barSelector),l=s.speed,E=s.easing;return o.offsetWidth,T(function(a){s.positionUsing===""&&(s.positionUsing=e.getPositioningCSS()),p(_,g(t,l,E)),t===1?(p(o,{transition:"none",opacity:1}),o.offsetWidth,setTimeout(function(){p(o,{transition:"all "+l+"ms linear",opacity:0}),setTimeout(function(){e.remove(),a()},l)},l)):setTimeout(a,l)}),this},e.isStarted=function(){return typeof e.status=="number"},e.start=function(){e.status||e.set(0);var t=function(){setTimeout(function(){!e.status||(e.trickle(),t())},s.trickleSpeed)};return s.trickle&&t(),this},e.done=function(t){return!t&&!e.status?this:e.inc(.3+.5*Math.random()).set(1)},e.inc=function(t){var i=e.status;return i?(typeof t!="number"&&(t=(1-i)*v(Math.random()*i,.1,.95)),i=v(i+t,0,.994),e.set(i)):e.start()},e.trickle=function(){return e.inc(Math.random()*s.trickleRate)},function(){var t=0,i=0;e.promise=function(o){return!o||o.state()==="resolved"?this:(i===0&&e.start(),t++,i++,o.always(function(){i--,i===0?(t=0,e.done()):e.set((t-i)/t)}),this)}}(),e.render=function(t){if(e.isRendered())return document.getElementById("nprogress");m(document.documentElement,"nprogress-busy");var i=document.createElement("div");i.id="nprogress",i.innerHTML=s.template;var o=i.querySelector(s.barSelector),_=t?"-100":P(e.status||0),l=document.querySelector(s.parent),E;return p(o,{transition:"all 0 linear",transform:"translate3d("+_+"%,0,0)"}),s.showSpinner||(E=i.querySelector(s.spinnerSelector),E&&A(E)),l!=document.body&&m(l,"nprogress-custom-parent"),l.appendChild(i),i},e.remove=function(){n(document.documentElement,"nprogress-busy"),n(document.querySelector(s.parent),"nprogress-custom-parent");var t=document.getElementById("nprogress");t&&A(t)},e.isRendered=function(){return!!document.getElementById("nprogress")},e.getPositioningCSS=function(){var t=document.body.style,i="WebkitTransform"in t?"Webkit":"MozTransform"in t?"Moz":"msTransform"in t?"ms":"OTransform"in t?"O":"";return i+"Perspective"in t?"translate3d":i+"Transform"in t?"translate":"margin"};function v(t,i,o){return t<i?i:t>o?o:t}function P(t){return(-1+t)*100}function g(t,i,o){var _;return s.positionUsing==="translate3d"?_={transform:"translate3d("+P(t)+"%,0,0)"}:s.positionUsing==="translate"?_={transform:"translate("+P(t)+"%,0)"}:_={"margin-left":P(t)+"%"},_.transition="all "+i+"ms "+o,_}var T=function(){var t=[];function i(){var o=t.shift();o&&o(i)}return function(o){t.push(o),t.length==1&&i()}}(),p=function(){var t=["Webkit","O","Moz","ms"],i={};function o(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(d,c){return c.toUpperCase()})}function _(a){var d=document.body.style;if(a in d)return a;for(var c=t.length,R=a.charAt(0).toUpperCase()+a.slice(1),L;c--;)if(L=t[c]+R,L in d)return L;return a}function l(a){return a=o(a),i[a]||(i[a]=_(a))}function E(a,d,c){d=l(d),a.style[d]=c}return function(a,d){var c=arguments,R,L;if(c.length==2)for(R in d)L=d[R],L!==void 0&&d.hasOwnProperty(R)&&E(a,R,L);else E(a,c[1],c[2])}}();function u(t,i){var o=typeof t=="string"?t:f(t);return o.indexOf(" "+i+" ")>=0}function m(t,i){var o=f(t),_=o+i;u(o,i)||(t.className=_.substring(1))}function n(t,i){var o=f(t),_;!u(t,i)||(_=o.replace(" "+i+" "," "),t.className=_.substring(1,_.length-1))}function f(t){return(" "+(t.className||"")+" ").replace(/\s+/gi," ")}function A(t){t&&t.parentNode&&t.parentNode.removeChild(t)}return e})})(b);const D=b.exports,y={Layout:()=>r(()=>import("./IndexView.99d1ddfd.js"),["IndexView.99d1ddfd.js","IndexView.fb148322.css","index.088b396a.js","index.05518057.css"],import.meta.url),Home:()=>r(()=>import("./IndexView.59ef23c6.js"),["IndexView.59ef23c6.js","IndexView.b887112f.css","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserList:()=>r(()=>import("./IndexView.6d03443d.js"),["IndexView.6d03443d.js","index.088b396a.js","index.05518057.css","index.969b688d.js","AddView.6b889f5e.js"],import.meta.url),UserBalanceList:()=>r(()=>import("./IndexView.c73f6486.js"),["IndexView.c73f6486.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserRealList:()=>r(()=>import("./IndexView.cd07d7e8.js"),["IndexView.cd07d7e8.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserTimeRiskList:()=>r(()=>import("./IndexView.df1f8664.js"),["IndexView.df1f8664.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserMsgList:()=>r(()=>import("./IndexView.23b3a0fd.js"),["IndexView.23b3a0fd.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserWalletList:()=>r(()=>import("./IndexView.a9e7b6ee.js"),["IndexView.a9e7b6ee.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserBankList:()=>r(()=>import("./IndexView.47a3675d.js"),["IndexView.47a3675d.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserIPList:()=>r(()=>import("./IndexView.8a047fd1.js"),["IndexView.8a047fd1.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserAgentList:()=>r(()=>import("./IndexView.c7570681.js"),["IndexView.c7570681.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserReportList:()=>r(()=>import("./IndexView.023b5fc7.js"),["IndexView.023b5fc7.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserAgentLink:()=>r(()=>import("./IndexView.f19c26dd.js"),["IndexView.f19c26dd.js","index.b5245736.js","_plugin-vue_export-helper.90cad5bc.js","index.088b396a.js","index.05518057.css"],import.meta.url),UserRechargeList:()=>r(()=>import("./IndexView.02599c22.js"),["IndexView.02599c22.js","index.088b396a.js","index.05518057.css","index.969b688d.js","AddView.6b889f5e.js"],import.meta.url),UserWithdrawList:()=>r(()=>import("./IndexView.7d7f468a.js"),["IndexView.7d7f468a.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserAmountList:()=>r(()=>import("./IndexView.b0b0b2ab.js"),["IndexView.b0b0b2ab.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserExchangeList:()=>r(()=>import("./IndexView.98127e0e.js"),["IndexView.98127e0e.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserRebateList:()=>r(()=>import("./IndexView.eb955aab.js"),["IndexView.eb955aab.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserProductTrade:()=>r(()=>import("./IndexView.f69c9327.js"),["IndexView.f69c9327.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserProductContract:()=>r(()=>import("./IndexView.c7a03609.js"),["IndexView.c7a03609.js","index.088b396a.js","index.05518057.css","ws.9df1dd9b.js","index.969b688d.js"],import.meta.url),UserProductTime:()=>r(()=>import("./IndexView.cbe41b2f.js"),["IndexView.cbe41b2f.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserProductLever:()=>r(()=>import("./IndexView.54fb0aa4.js"),["IndexView.54fb0aa4.js","index.088b396a.js","index.05518057.css","ws.9df1dd9b.js","index.969b688d.js"],import.meta.url),UserMining:()=>r(()=>import("./IndexView.c3274ba9.js"),["IndexView.c3274ba9.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserQuantify:()=>r(()=>import("./IndexView.1ff0ddc2.js"),["IndexView.1ff0ddc2.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),KlineCreat:()=>r(()=>import("./IndexView.d884d2c4.js"),["IndexView.d884d2c4.js","IndexView.efff66ec.css","ChartView.8c3e1bc7.js","ChartView.2cb699af.css","index.088b396a.js","index.05518057.css"],import.meta.url),KlineList:()=>r(()=>import("./IndexView.5fb341b9.js"),["IndexView.5fb341b9.js","IndexView.efff66ec.css","ChartView.8c3e1bc7.js","ChartView.2cb699af.css","index.088b396a.js","index.05518057.css"],import.meta.url),KlineHistory:()=>r(()=>import("./IndexView.6616ab1b.js"),["IndexView.6616ab1b.js","IndexView.efff66ec.css","ChartView.8c3e1bc7.js","ChartView.2cb699af.css","index.088b396a.js","index.05518057.css"],import.meta.url),KlineTarget:()=>r(()=>import("./IndexView.6edc65f0.js"),["IndexView.6edc65f0.js","IndexView.efff66ec.css","ChartView.8c3e1bc7.js","ChartView.2cb699af.css","index.088b396a.js","index.05518057.css"],import.meta.url),SingleList:()=>r(()=>import("./IndexView.9b6bf528.js"),["IndexView.9b6bf528.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),NoticeList:()=>r(()=>import("./IndexView.1b28947d.js"),["IndexView.1b28947d.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),HelpList:()=>r(()=>import("./IndexView.fa65280f.js"),["IndexView.fa65280f.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),NewsList:()=>r(()=>import("./IndexView.81b59b5f.js"),["IndexView.81b59b5f.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),RechargeList:()=>r(()=>import("./IndexView.7f6100f0.js"),["IndexView.7f6100f0.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),WithdrawList:()=>r(()=>import("./IndexView.f4cb937e.js"),["IndexView.f4cb937e.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),ProductList:()=>r(()=>import("./IndexView.63465b96.js"),["IndexView.63465b96.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),MiningList:()=>r(()=>import("./IndexView.e700d5e5.js"),["IndexView.e700d5e5.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),LevelList:()=>r(()=>import("./IndexView.3b8dce3d.js"),["IndexView.3b8dce3d.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),TaskList:()=>r(()=>import("./IndexView.89d78545.js"),["IndexView.89d78545.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),GlobalConfig:()=>r(()=>import("./IndexView.fdac1a96.js"),["IndexView.fdac1a96.js","index.088b396a.js","index.05518057.css","index.03909234.js","index.cbd5d41d.css"],import.meta.url),BannerList:()=>r(()=>import("./IndexView.f98347ef.js"),["IndexView.f98347ef.js","index.088b396a.js","index.05518057.css","index.969b688d.js","UploadButton.3ceacfbe.js"],import.meta.url),LangConfig:()=>r(()=>import("./IndexView.90d4e80a.js"),["IndexView.90d4e80a.js","index.088b396a.js","index.05518057.css","UploadButton.3ceacfbe.js","index.969b688d.js"],import.meta.url),LangConfigList:()=>r(()=>import("./IndexView.02eb8f49.js"),["IndexView.02eb8f49.js","index.088b396a.js","index.05518057.css","UploadButton.3ceacfbe.js","index.969b688d.js"],import.meta.url),TranslateList:()=>r(()=>import("./IndexView.c33fd344.js"),["IndexView.c33fd344.js","index.088b396a.js","index.05518057.css"],import.meta.url),LangList:()=>r(()=>import("./IndexView.4ffebc16.js"),["IndexView.4ffebc16.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),CountryAreaList:()=>r(()=>import("./IndexView.a8bf7711.js"),["IndexView.a8bf7711.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),AdminList:()=>r(()=>import("./IndexView.31d8f51f.js"),["IndexView.31d8f51f.js","index.088b396a.js","index.05518057.css","index.969b688d.js","index.b5245736.js","_plugin-vue_export-helper.90cad5bc.js"],import.meta.url),RoleList:()=>r(()=>import("./IndexView.8314d11e.js"),["IndexView.8314d11e.js","IndexView.d3acc92d.css","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserLogList:()=>r(()=>import("./IndexView.e7f57d45.js"),["IndexView.e7f57d45.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),MenuList:()=>r(()=>import("./IndexView.92760f9f.js"),["IndexView.92760f9f.js","IndexView.946d5d6b.css","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),ConfigList:()=>r(()=>import("./IndexView.a7d91810.js"),["IndexView.a7d91810.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),FormConfig:()=>r(()=>import("./IndexView.00d0c67f.js"),["IndexView.00d0c67f.js","IndexView.4b143363.css","index.088b396a.js","index.05518057.css","index.03909234.js","index.cbd5d41d.css"],import.meta.url),IPList:()=>r(()=>import("./IndexView.5281f34f.js"),["IndexView.5281f34f.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),IPRecord:()=>r(()=>import("./IndexView.529ffa9c.js"),["IndexView.529ffa9c.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),SendList:()=>r(()=>import("./IndexView.51084031.js"),["IndexView.51084031.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),MapList:()=>r(()=>import("./IndexView.3a9e233c.js"),["IndexView.3a9e233c.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),DomainList:()=>r(()=>import("./IndexView.44266295.js"),["IndexView.44266295.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url),CrontabList:()=>r(()=>import("./IndexView.195ff443.js"),["IndexView.195ff443.js","index.088b396a.js","index.05518057.css","index.969b688d.js"],import.meta.url)},F={__name:"IndexView",setup(h){const I=U(),e=C(),s=k(),v=w(!1),P=p=>{const u=[];let m=0;return p.forEach(n=>{if(n.parent_id===0)e.addRoute({name:n.name,path:n.path,component:y[n.component],meta:{id:n.id,title:n.title}}),u.push({id:n.id,title:n.title,name:n.name,icon:n.icon,path:n.path,children:[]});else{if(u[m].id!==n.parent_id&&(m=u.findIndex(f=>f.id===n.parent_id),m===-1))return;n.status===1&&u[m].children.push({id:n.id,title:n.title,name:n.name,icon:n.icon,path:n.path}),e.addRoute(u[m].name,{name:n.name,path:n.path,component:y[n.component],meta:{id:n.id,title:n.title}})}}),u.length>0&&(u[0].children.length>0?e.addRoute({path:"/",name:"root",redirect:{name:u[0].children[0].name}}):e.addRoute({path:"/",name:"root",redirect:{name:u[0].name}})),u},g=async()=>{D.start();const{success:p,data:u}=await W.init();D.done(),p&&(s.system=u.system,s.user=u.user,s.apiList=u.apiList,s.menuList=P(u.menuList),K.joinGroup("AdminTips",m=>{if(!s.auth(m.auth))return;s.audio.play();const n=q({title:m.title,message:m.message,position:"top-right",onClick:async()=>{const f=await e.push({name:m.routerName});f&&f.to.name===f.from.name&&await e.push("/Refresh"),n.close()},duration:m.duration})}),await e.replace(I.fullPath))};N(()=>{if(!s.token){e.replace("/Login");return}if(s.menuList.length>0){v.value=!0;return}g()});const T=async()=>{const p=await e.replace("/");p&&p.to.name===p.from.name&&await e.push("/Refresh")};return(p,u)=>{const m=O("el-button"),n=O("el-empty");return v.value?(x(),M(n,{key:0,description:"\u4F60\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728"},{default:V(()=>[z(m,{onClick:T,type:"primary"},{default:V(()=>[H("\u8FD4\u56DE\u9996\u9875")]),_:1})]),_:1})):B("",!0)}}};export{F as default};