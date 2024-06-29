import{v as b,_ as r,x as C,a as k,u as U,b as w,y as N,c as A,o as x,k as M,h as V,l as B,n as W,z as q,g as z,m as H}from"./index.359dadce.js";import{w as G}from"./ws.e1934e3a.js";var S={exports:{}};/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */(function(h,O){(function(e,s){h.exports=s()})(b,function(){var e={};e.version="0.2.0";var s=e.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};e.configure=function(t){var i,o;for(i in t)o=t[i],o!==void 0&&t.hasOwnProperty(i)&&(s[i]=o);return this},e.status=null,e.set=function(t){var i=e.isStarted();t=v(t,s.minimum,1),e.status=t===1?null:t;var o=e.render(!i),_=o.querySelector(s.barSelector),l=s.speed,E=s.easing;return o.offsetWidth,T(function(a){s.positionUsing===""&&(s.positionUsing=e.getPositioningCSS()),p(_,P(t,l,E)),t===1?(p(o,{transition:"none",opacity:1}),o.offsetWidth,setTimeout(function(){p(o,{transition:"all "+l+"ms linear",opacity:0}),setTimeout(function(){e.remove(),a()},l)},l)):setTimeout(a,l)}),this},e.isStarted=function(){return typeof e.status=="number"},e.start=function(){e.status||e.set(0);var t=function(){setTimeout(function(){!e.status||(e.trickle(),t())},s.trickleSpeed)};return s.trickle&&t(),this},e.done=function(t){return!t&&!e.status?this:e.inc(.3+.5*Math.random()).set(1)},e.inc=function(t){var i=e.status;return i?(typeof t!="number"&&(t=(1-i)*v(Math.random()*i,.1,.95)),i=v(i+t,0,.994),e.set(i)):e.start()},e.trickle=function(){return e.inc(Math.random()*s.trickleRate)},function(){var t=0,i=0;e.promise=function(o){return!o||o.state()==="resolved"?this:(i===0&&e.start(),t++,i++,o.always(function(){i--,i===0?(t=0,e.done()):e.set((t-i)/t)}),this)}}(),e.render=function(t){if(e.isRendered())return document.getElementById("nprogress");m(document.documentElement,"nprogress-busy");var i=document.createElement("div");i.id="nprogress",i.innerHTML=s.template;var o=i.querySelector(s.barSelector),_=t?"-100":R(e.status||0),l=document.querySelector(s.parent),E;return p(o,{transition:"all 0 linear",transform:"translate3d("+_+"%,0,0)"}),s.showSpinner||(E=i.querySelector(s.spinnerSelector),E&&I(E)),l!=document.body&&m(l,"nprogress-custom-parent"),l.appendChild(i),i},e.remove=function(){n(document.documentElement,"nprogress-busy"),n(document.querySelector(s.parent),"nprogress-custom-parent");var t=document.getElementById("nprogress");t&&I(t)},e.isRendered=function(){return!!document.getElementById("nprogress")},e.getPositioningCSS=function(){var t=document.body.style,i="WebkitTransform"in t?"Webkit":"MozTransform"in t?"Moz":"msTransform"in t?"ms":"OTransform"in t?"O":"";return i+"Perspective"in t?"translate3d":i+"Transform"in t?"translate":"margin"};function v(t,i,o){return t<i?i:t>o?o:t}function R(t){return(-1+t)*100}function P(t,i,o){var _;return s.positionUsing==="translate3d"?_={transform:"translate3d("+R(t)+"%,0,0)"}:s.positionUsing==="translate"?_={transform:"translate("+R(t)+"%,0)"}:_={"margin-left":R(t)+"%"},_.transition="all "+i+"ms "+o,_}var T=function(){var t=[];function i(){var o=t.shift();o&&o(i)}return function(o){t.push(o),t.length==1&&i()}}(),p=function(){var t=["Webkit","O","Moz","ms"],i={};function o(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(d,c){return c.toUpperCase()})}function _(a){var d=document.body.style;if(a in d)return a;for(var c=t.length,g=a.charAt(0).toUpperCase()+a.slice(1),L;c--;)if(L=t[c]+g,L in d)return L;return a}function l(a){return a=o(a),i[a]||(i[a]=_(a))}function E(a,d,c){d=l(d),a.style[d]=c}return function(a,d){var c=arguments,g,L;if(c.length==2)for(g in d)L=d[g],L!==void 0&&d.hasOwnProperty(g)&&E(a,g,L);else E(a,c[1],c[2])}}();function u(t,i){var o=typeof t=="string"?t:f(t);return o.indexOf(" "+i+" ")>=0}function m(t,i){var o=f(t),_=o+i;u(o,i)||(t.className=_.substring(1))}function n(t,i){var o=f(t),_;!u(t,i)||(_=o.replace(" "+i+" "," "),t.className=_.substring(1,_.length-1))}function f(t){return(" "+(t.className||"")+" ").replace(/\s+/gi," ")}function I(t){t&&t.parentNode&&t.parentNode.removeChild(t)}return e})})(S);const D=S.exports,y={Layout:()=>r(()=>import("./IndexView.9b0b3a12.js"),["IndexView.9b0b3a12.js","IndexView.fb148322.css","index.359dadce.js","index.05518057.css"],import.meta.url),Home:()=>r(()=>import("./IndexView.2a337f89.js"),["IndexView.2a337f89.js","IndexView.b887112f.css","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),OnlineUser:()=>r(()=>import("./IndexView.87331e06.js"),["IndexView.87331e06.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserList:()=>r(()=>import("./IndexView.77d0288a.js"),["IndexView.77d0288a.js","index.359dadce.js","index.05518057.css","index.969b688d.js","AddView.321116e0.js"],import.meta.url),UserRealList:()=>r(()=>import("./IndexView.a8dee454.js"),["IndexView.a8dee454.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserMsgList:()=>r(()=>import("./IndexView.1c353082.js"),["IndexView.1c353082.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserWalletList:()=>r(()=>import("./IndexView.ed53ecf9.js"),["IndexView.ed53ecf9.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserBankList:()=>r(()=>import("./IndexView.c8771992.js"),["IndexView.c8771992.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserIPList:()=>r(()=>import("./IndexView.fbd9ec2d.js"),["IndexView.fbd9ec2d.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserAgentList:()=>r(()=>import("./IndexView.e0f73410.js"),["IndexView.e0f73410.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserReportList:()=>r(()=>import("./IndexView.ec551fb6.js"),["IndexView.ec551fb6.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserAgentLink:()=>r(()=>import("./IndexView.635374a7.js"),["IndexView.635374a7.js","index.e072a861.js","_plugin-vue_export-helper.90cad5bc.js","index.359dadce.js","index.05518057.css"],import.meta.url),UserRechargeList:()=>r(()=>import("./IndexView.a3c53bbd.js"),["IndexView.a3c53bbd.js","index.359dadce.js","index.05518057.css","index.969b688d.js","AddView.321116e0.js"],import.meta.url),UserWithdrawList:()=>r(()=>import("./IndexView.2ca6ad99.js"),["IndexView.2ca6ad99.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserAmountList:()=>r(()=>import("./IndexView.74934d6d.js"),["IndexView.74934d6d.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserRebateList:()=>r(()=>import("./IndexView.bd9c14df.js"),["IndexView.bd9c14df.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserBetList:()=>r(()=>import("./IndexView.410e1ad4.js"),["IndexView.410e1ad4.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserBetItemList:()=>r(()=>import("./IndexView.21219951.js"),["IndexView.21219951.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),lotteryDataList:()=>r(()=>import("./IndexView.2abc6a27.js"),["IndexView.2abc6a27.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),lotteryDataSet:()=>r(()=>import("./IndexView.348c61b5.js"),["IndexView.348c61b5.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),lotteryOdds1:()=>r(()=>import("./IndexView.08e40217.js"),["IndexView.08e40217.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),lotteryOdds2:()=>r(()=>import("./IndexView.56be5a53.js"),["IndexView.56be5a53.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),lotteryOdds3:()=>r(()=>import("./IndexView.650582aa.js"),["IndexView.650582aa.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),SingleList:()=>r(()=>import("./IndexView.3ba639ee.js"),["IndexView.3ba639ee.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),NoticeList:()=>r(()=>import("./IndexView.faa94e33.js"),["IndexView.faa94e33.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),HelpList:()=>r(()=>import("./IndexView.fbec80b9.js"),["IndexView.fbec80b9.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),NewsList:()=>r(()=>import("./IndexView.2fe0e679.js"),["IndexView.2fe0e679.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),RechargeList:()=>r(()=>import("./IndexView.c3b3e75e.js"),["IndexView.c3b3e75e.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),WithdrawList:()=>r(()=>import("./IndexView.506afa8b.js"),["IndexView.506afa8b.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),TaskList:()=>r(()=>import("./IndexView.08c4c53b.js"),["IndexView.08c4c53b.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),LotteryRoomList:()=>r(()=>import("./IndexView.7152709d.js"),["IndexView.7152709d.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),lotteryList:()=>r(()=>import("./IndexView.99da7adc.js"),["IndexView.99da7adc.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),GlobalConfig:()=>r(()=>import("./IndexView.762943be.js"),["IndexView.762943be.js","index.359dadce.js","index.05518057.css","index.f2d37f1e.js","index.cbd5d41d.css"],import.meta.url),BannerList:()=>r(()=>import("./IndexView.13912578.js"),["IndexView.13912578.js","index.359dadce.js","index.05518057.css","index.969b688d.js","UploadButton.6e620a31.js"],import.meta.url),LangConfig:()=>r(()=>import("./IndexView.f5a8c59c.js"),["IndexView.f5a8c59c.js","index.359dadce.js","index.05518057.css","UploadButton.6e620a31.js","index.969b688d.js"],import.meta.url),LangConfigList:()=>r(()=>import("./IndexView.7454d479.js"),["IndexView.7454d479.js","index.359dadce.js","index.05518057.css","UploadButton.6e620a31.js","index.969b688d.js"],import.meta.url),TranslateList:()=>r(()=>import("./IndexView.24248ba9.js"),["IndexView.24248ba9.js","index.359dadce.js","index.05518057.css"],import.meta.url),LangList:()=>r(()=>import("./IndexView.dfbca5ef.js"),["IndexView.dfbca5ef.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),CountryAreaList:()=>r(()=>import("./IndexView.72f586d7.js"),["IndexView.72f586d7.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),AdminList:()=>r(()=>import("./IndexView.9e823297.js"),["IndexView.9e823297.js","index.359dadce.js","index.05518057.css","index.969b688d.js","index.e072a861.js","_plugin-vue_export-helper.90cad5bc.js"],import.meta.url),RoleList:()=>r(()=>import("./IndexView.744c6419.js"),["IndexView.744c6419.js","IndexView.d3acc92d.css","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),UserLogList:()=>r(()=>import("./IndexView.a4379951.js"),["IndexView.a4379951.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),MenuList:()=>r(()=>import("./IndexView.a4bb845c.js"),["IndexView.a4bb845c.js","IndexView.946d5d6b.css","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),ConfigList:()=>r(()=>import("./IndexView.3d218e88.js"),["IndexView.3d218e88.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),FormConfig:()=>r(()=>import("./IndexView.e99a1d38.js"),["IndexView.e99a1d38.js","IndexView.4b143363.css","index.359dadce.js","index.05518057.css","index.f2d37f1e.js","index.cbd5d41d.css"],import.meta.url),IPList:()=>r(()=>import("./IndexView.a6fca54e.js"),["IndexView.a6fca54e.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),IPRecord:()=>r(()=>import("./IndexView.4b81b6ae.js"),["IndexView.4b81b6ae.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),SendList:()=>r(()=>import("./IndexView.7fd2f8ad.js"),["IndexView.7fd2f8ad.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),MapList:()=>r(()=>import("./IndexView.755b757d.js"),["IndexView.755b757d.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),DomainList:()=>r(()=>import("./IndexView.f4f6e8eb.js"),["IndexView.f4f6e8eb.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url),CrontabList:()=>r(()=>import("./IndexView.b86243a5.js"),["IndexView.b86243a5.js","index.359dadce.js","index.05518057.css","index.969b688d.js"],import.meta.url)},J={__name:"IndexView",setup(h){const O=C(),e=k(),s=U(),v=w(!1),R=p=>{const u=[];let m=0;return p.forEach(n=>{if(n.parent_id===0)e.addRoute({name:n.name,path:n.path,component:y[n.component],meta:{id:n.id,title:n.title}}),u.push({id:n.id,title:n.title,name:n.name,icon:n.icon,path:n.path,children:[]});else{if(u[m].id!==n.parent_id&&(m=u.findIndex(f=>f.id===n.parent_id),m===-1))return;n.status===1&&u[m].children.push({id:n.id,title:n.title,name:n.name,icon:n.icon,path:n.path}),e.addRoute(u[m].name,{name:n.name,path:n.path,component:y[n.component],meta:{id:n.id,title:n.title}})}}),u.length>0&&(u[0].children.length>0?e.addRoute({path:"/",name:"root",redirect:{name:u[0].children[0].name}}):e.addRoute({path:"/",name:"root",redirect:{name:u[0].name}})),u},P=async()=>{D.start();const{success:p,data:u}=await W.init();D.done(),p&&(s.system=u.system,s.user=u.user,s.apiList=u.apiList,s.menuList=R(u.menuList),G.joinGroup("AdminTips",m=>{if(!s.auth(m.auth))return;s.audio.play();const n=q({title:m.title,message:m.message,position:"top-right",onClick:async()=>{s.audio.pause();const f=await e.push({name:m.routerName});f&&f.to.name===f.from.name&&await e.push("/Refresh"),n.close()},duration:m.duration})}),await e.replace(O.fullPath))};N(()=>{if(!s.token){e.replace("/Login");return}if(s.menuList.length>0){v.value=!0;return}P()});const T=async()=>{const p=await e.replace("/");p&&p.to.name===p.from.name&&await e.push("/Refresh")};return(p,u)=>{const m=A("el-button"),n=A("el-empty");return v.value?(x(),M(n,{key:0,description:"\u4F60\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728"},{default:V(()=>[z(m,{onClick:T,type:"primary"},{default:V(()=>[H("\u8FD4\u56DE\u9996\u9875")]),_:1})]),_:1})):B("",!0)}}};export{J as default};
