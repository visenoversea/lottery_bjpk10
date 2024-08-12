import{v as b,_ as r,x as C,a as U,u as k,b as w,y as N,c as A,o as x,k as M,h as V,l as B,n as W,z as q,g as z,m as H}from"./index.854edcb2.js";import{w as G}from"./ws.79c4d532.js";var S={exports:{}};/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */(function(h,O){(function(e,s){h.exports=s()})(b,function(){var e={};e.version="0.2.0";var s=e.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};e.configure=function(t){var i,o;for(i in t)o=t[i],o!==void 0&&t.hasOwnProperty(i)&&(s[i]=o);return this},e.status=null,e.set=function(t){var i=e.isStarted();t=v(t,s.minimum,1),e.status=t===1?null:t;var o=e.render(!i),_=o.querySelector(s.barSelector),l=s.speed,E=s.easing;return o.offsetWidth,T(function(a){s.positionUsing===""&&(s.positionUsing=e.getPositioningCSS()),p(_,g(t,l,E)),t===1?(p(o,{transition:"none",opacity:1}),o.offsetWidth,setTimeout(function(){p(o,{transition:"all "+l+"ms linear",opacity:0}),setTimeout(function(){e.remove(),a()},l)},l)):setTimeout(a,l)}),this},e.isStarted=function(){return typeof e.status=="number"},e.start=function(){e.status||e.set(0);var t=function(){setTimeout(function(){!e.status||(e.trickle(),t())},s.trickleSpeed)};return s.trickle&&t(),this},e.done=function(t){return!t&&!e.status?this:e.inc(.3+.5*Math.random()).set(1)},e.inc=function(t){var i=e.status;return i?(typeof t!="number"&&(t=(1-i)*v(Math.random()*i,.1,.95)),i=v(i+t,0,.994),e.set(i)):e.start()},e.trickle=function(){return e.inc(Math.random()*s.trickleRate)},function(){var t=0,i=0;e.promise=function(o){return!o||o.state()==="resolved"?this:(i===0&&e.start(),t++,i++,o.always(function(){i--,i===0?(t=0,e.done()):e.set((t-i)/t)}),this)}}(),e.render=function(t){if(e.isRendered())return document.getElementById("nprogress");m(document.documentElement,"nprogress-busy");var i=document.createElement("div");i.id="nprogress",i.innerHTML=s.template;var o=i.querySelector(s.barSelector),_=t?"-100":R(e.status||0),l=document.querySelector(s.parent),E;return p(o,{transition:"all 0 linear",transform:"translate3d("+_+"%,0,0)"}),s.showSpinner||(E=i.querySelector(s.spinnerSelector),E&&I(E)),l!=document.body&&m(l,"nprogress-custom-parent"),l.appendChild(i),i},e.remove=function(){n(document.documentElement,"nprogress-busy"),n(document.querySelector(s.parent),"nprogress-custom-parent");var t=document.getElementById("nprogress");t&&I(t)},e.isRendered=function(){return!!document.getElementById("nprogress")},e.getPositioningCSS=function(){var t=document.body.style,i="WebkitTransform"in t?"Webkit":"MozTransform"in t?"Moz":"msTransform"in t?"ms":"OTransform"in t?"O":"";return i+"Perspective"in t?"translate3d":i+"Transform"in t?"translate":"margin"};function v(t,i,o){return t<i?i:t>o?o:t}function R(t){return(-1+t)*100}function g(t,i,o){var _;return s.positionUsing==="translate3d"?_={transform:"translate3d("+R(t)+"%,0,0)"}:s.positionUsing==="translate"?_={transform:"translate("+R(t)+"%,0)"}:_={"margin-left":R(t)+"%"},_.transition="all "+i+"ms "+o,_}var T=function(){var t=[];function i(){var o=t.shift();o&&o(i)}return function(o){t.push(o),t.length==1&&i()}}(),p=function(){var t=["Webkit","O","Moz","ms"],i={};function o(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(d,c){return c.toUpperCase()})}function _(a){var d=document.body.style;if(a in d)return a;for(var c=t.length,P=a.charAt(0).toUpperCase()+a.slice(1),L;c--;)if(L=t[c]+P,L in d)return L;return a}function l(a){return a=o(a),i[a]||(i[a]=_(a))}function E(a,d,c){d=l(d),a.style[d]=c}return function(a,d){var c=arguments,P,L;if(c.length==2)for(P in d)L=d[P],L!==void 0&&d.hasOwnProperty(P)&&E(a,P,L);else E(a,c[1],c[2])}}();function u(t,i){var o=typeof t=="string"?t:f(t);return o.indexOf(" "+i+" ")>=0}function m(t,i){var o=f(t),_=o+i;u(o,i)||(t.className=_.substring(1))}function n(t,i){var o=f(t),_;!u(t,i)||(_=o.replace(" "+i+" "," "),t.className=_.substring(1,_.length-1))}function f(t){return(" "+(t.className||"")+" ").replace(/\s+/gi," ")}function I(t){t&&t.parentNode&&t.parentNode.removeChild(t)}return e})})(S);const D=S.exports,y={Layout:()=>r(()=>import("./IndexView.60ee54c9.js"),["IndexView.60ee54c9.js","IndexView.fb148322.css","index.854edcb2.js","index.05518057.css"],import.meta.url),Home:()=>r(()=>import("./IndexView.ff196bf4.js"),["IndexView.ff196bf4.js","IndexView.b887112f.css","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),OnlineUser:()=>r(()=>import("./IndexView.631527ac.js"),["IndexView.631527ac.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),UserList:()=>r(()=>import("./IndexView.ce0d006d.js"),["IndexView.ce0d006d.js","index.854edcb2.js","index.05518057.css","index.15917a18.js","AddView.14d2fee7.js"],import.meta.url),UserRealList:()=>r(()=>import("./IndexView.92fae257.js"),["IndexView.92fae257.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),UserMsgList:()=>r(()=>import("./IndexView.4e29dbae.js"),["IndexView.4e29dbae.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),UserWalletList:()=>r(()=>import("./IndexView.e44c3121.js"),["IndexView.e44c3121.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),UserBankList:()=>r(()=>import("./IndexView.bb524d77.js"),["IndexView.bb524d77.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),UserIPList:()=>r(()=>import("./IndexView.9d08dc73.js"),["IndexView.9d08dc73.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),UserAgentList:()=>r(()=>import("./IndexView.93c5ad7a.js"),["IndexView.93c5ad7a.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),UserReportList:()=>r(()=>import("./IndexView.edf09e83.js"),["IndexView.edf09e83.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),Userreport:()=>r(()=>import("./IndexView.2aebcdaa.js"),["IndexView.2aebcdaa.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),UserAgentLink:()=>r(()=>import("./IndexView.a9f404cf.js"),["IndexView.a9f404cf.js","index.82eb981a.js","_plugin-vue_export-helper.90cad5bc.js","index.854edcb2.js","index.05518057.css"],import.meta.url),UserRechargeList:()=>r(()=>import("./IndexView.6ff61507.js"),["IndexView.6ff61507.js","index.854edcb2.js","index.05518057.css","index.15917a18.js","AddView.14d2fee7.js"],import.meta.url),UserWithdrawList:()=>r(()=>import("./IndexView.b198c68f.js"),["IndexView.b198c68f.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),UserAmountList:()=>r(()=>import("./IndexView.7f0d2036.js"),["IndexView.7f0d2036.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),UserRebateList:()=>r(()=>import("./IndexView.94f562ba.js"),["IndexView.94f562ba.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),UserBetList:()=>r(()=>import("./IndexView.51624737.js"),["IndexView.51624737.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),UserBetItemList:()=>r(()=>import("./IndexView.b59be79d.js"),["IndexView.b59be79d.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),lotteryDataList:()=>r(()=>import("./IndexView.30083879.js"),["IndexView.30083879.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),lotteryDataSet:()=>r(()=>import("./IndexView.115a7b84.js"),["IndexView.115a7b84.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),lotteryOdds1:()=>r(()=>import("./IndexView.f5cbd7df.js"),["IndexView.f5cbd7df.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),lotteryOdds2:()=>r(()=>import("./IndexView.c9ae97de.js"),["IndexView.c9ae97de.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),lotteryOdds3:()=>r(()=>import("./IndexView.5126e21d.js"),["IndexView.5126e21d.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),SingleList:()=>r(()=>import("./IndexView.cd17e91a.js"),["IndexView.cd17e91a.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),NoticeList:()=>r(()=>import("./IndexView.c0c26730.js"),["IndexView.c0c26730.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),HelpList:()=>r(()=>import("./IndexView.e624f2dc.js"),["IndexView.e624f2dc.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),NewsList:()=>r(()=>import("./IndexView.0341dd4f.js"),["IndexView.0341dd4f.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),RechargeList:()=>r(()=>import("./IndexView.8032e995.js"),["IndexView.8032e995.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),WithdrawList:()=>r(()=>import("./IndexView.95e6ff13.js"),["IndexView.95e6ff13.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),TaskList:()=>r(()=>import("./IndexView.52ebf515.js"),["IndexView.52ebf515.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),LotteryRoomList:()=>r(()=>import("./IndexView.619e5cd9.js"),["IndexView.619e5cd9.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),lotteryList:()=>r(()=>import("./IndexView.841a94c8.js"),["IndexView.841a94c8.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),levelConfig:()=>r(()=>import("./IndexView.e366a6de.js"),["IndexView.e366a6de.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),GlobalConfig:()=>r(()=>import("./IndexView.e4e563f8.js"),["IndexView.e4e563f8.js","index.854edcb2.js","index.05518057.css","index.6cb58150.js","index.cbd5d41d.css"],import.meta.url),BannerList:()=>r(()=>import("./IndexView.30bdcdec.js"),["IndexView.30bdcdec.js","index.854edcb2.js","index.05518057.css","index.15917a18.js","UploadButton.9d2ea3b2.js"],import.meta.url),LangConfig:()=>r(()=>import("./IndexView.a31d977d.js"),["IndexView.a31d977d.js","index.854edcb2.js","index.05518057.css","UploadButton.9d2ea3b2.js","index.15917a18.js"],import.meta.url),LangConfigList:()=>r(()=>import("./IndexView.fd1a4330.js"),["IndexView.fd1a4330.js","index.854edcb2.js","index.05518057.css","UploadButton.9d2ea3b2.js","index.15917a18.js"],import.meta.url),TranslateList:()=>r(()=>import("./IndexView.49cdc49d.js"),["IndexView.49cdc49d.js","index.854edcb2.js","index.05518057.css"],import.meta.url),LangList:()=>r(()=>import("./IndexView.69fd244b.js"),["IndexView.69fd244b.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),CountryAreaList:()=>r(()=>import("./IndexView.aca810bc.js"),["IndexView.aca810bc.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),AdminList:()=>r(()=>import("./IndexView.180b39b4.js"),["IndexView.180b39b4.js","index.854edcb2.js","index.05518057.css","index.15917a18.js","index.82eb981a.js","_plugin-vue_export-helper.90cad5bc.js"],import.meta.url),RoleList:()=>r(()=>import("./IndexView.77d0378b.js"),["IndexView.77d0378b.js","IndexView.d3acc92d.css","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),UserLogList:()=>r(()=>import("./IndexView.423dd685.js"),["IndexView.423dd685.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),MenuList:()=>r(()=>import("./IndexView.a5f8e909.js"),["IndexView.a5f8e909.js","IndexView.946d5d6b.css","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),ConfigList:()=>r(()=>import("./IndexView.6b8a2ce2.js"),["IndexView.6b8a2ce2.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),FormConfig:()=>r(()=>import("./IndexView.f1d22fb2.js"),["IndexView.f1d22fb2.js","IndexView.4b143363.css","index.854edcb2.js","index.05518057.css","index.6cb58150.js","index.cbd5d41d.css"],import.meta.url),IPList:()=>r(()=>import("./IndexView.b4474a21.js"),["IndexView.b4474a21.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),IPRecord:()=>r(()=>import("./IndexView.5633fcac.js"),["IndexView.5633fcac.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),SendList:()=>r(()=>import("./IndexView.a25ce605.js"),["IndexView.a25ce605.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),MapList:()=>r(()=>import("./IndexView.281e6728.js"),["IndexView.281e6728.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),DomainList:()=>r(()=>import("./IndexView.eb33f4fd.js"),["IndexView.eb33f4fd.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),CrontabList:()=>r(()=>import("./IndexView.3a1bfda4.js"),["IndexView.3a1bfda4.js","index.854edcb2.js","index.05518057.css","index.15917a18.js"],import.meta.url),SystemEdit:()=>r(()=>import("./IndexView.f001cc89.js"),["IndexView.f001cc89.js","index.854edcb2.js","index.05518057.css"],import.meta.url)},J={__name:"IndexView",setup(h){const O=C(),e=U(),s=k(),v=w(!1),R=p=>{const u=[];let m=0;return p.forEach(n=>{if(n.parent_id===0)e.addRoute({name:n.name,path:n.path,component:y[n.component],meta:{id:n.id,title:n.title}}),u.push({id:n.id,title:n.title,name:n.name,icon:n.icon,path:n.path,children:[]});else{if(u[m].id!==n.parent_id&&(m=u.findIndex(f=>f.id===n.parent_id),m===-1))return;n.status===1&&u[m].children.push({id:n.id,title:n.title,name:n.name,icon:n.icon,path:n.path}),e.addRoute(u[m].name,{name:n.name,path:n.path,component:y[n.component],meta:{id:n.id,title:n.title}})}}),u.length>0&&(u[0].children.length>0?e.addRoute({path:"/",name:"root",redirect:{name:u[0].children[0].name}}):e.addRoute({path:"/",name:"root",redirect:{name:u[0].name}})),u},g=async()=>{D.start();const{success:p,data:u}=await W.init();D.done(),p&&(s.system=u.system,s.user=u.user,s.apiList=u.apiList,s.menuList=R(u.menuList),G.joinGroup("AdminTips",m=>{if(!s.auth(m.auth))return;s.audio.play();const n=q({title:m.title,message:m.message,position:"top-right",onClick:async()=>{s.audio.pause();const f=await e.push({name:m.routerName});f&&f.to.name===f.from.name&&await e.push("/Refresh"),n.close()},duration:m.duration})}),await e.replace(O.fullPath))};N(()=>{if(!s.token){e.replace("/Login");return}if(s.menuList.length>0){v.value=!0;return}g()});const T=async()=>{const p=await e.replace("/");p&&p.to.name===p.from.name&&await e.push("/Refresh")};return(p,u)=>{const m=A("el-button"),n=A("el-empty");return v.value?(x(),M(n,{key:0,description:"\u4F60\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728"},{default:V(()=>[z(m,{onClick:T,type:"primary"},{default:V(()=>[H("\u8FD4\u56DE\u9996\u9875")]),_:1})]),_:1})):B("",!0)}}};export{J as default};