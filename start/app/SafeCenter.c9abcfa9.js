import{s as p,u as x,c as r,f as w,o as b,a as k,b as e,t as i,d as t,p as f,v as _,W as y}from"./main.bc976cef.js";import{_ as d}from"./user_icon_enter.35dd2a42.js";const g=""+new URL("../img/icon/user_icon_tips.png",import.meta.url).href;const S={class:"v_safe_center"},C={class:"v-head g-flex-justify-center g-flex-align-center"},j=e("i",{class:"iconfont icon-zuojiantou"},null,-1),I=[j],P={class:"v-title g-flex-align-center g-flex-justify-center"},T={class:"v-safe-center-container"},U={class:"v-safe-center-list"},$={class:"v-safe-center-item-left"},B={class:"v-safe-center-item-right g-flex-align-center"},D={class:"v-safe-center-item-right-no g-flex-align-center"},G=e("img",{src:g,alt:""},null,-1),R=e("div",{class:"v-safe-center-item-right-icon g-flex-align-center"},[e("img",{src:d,alt:""})],-1),z={class:"v-safe-center-item-left"},E={class:"v-safe-center-item-right g-flex-align-center"},H={class:"v-safe-center-item-right-no g-flex-align-center"},L=e("img",{src:g,alt:""},null,-1),N=e("div",{class:"v-safe-center-item-right-icon g-flex-align-center"},[e("img",{src:d,alt:""})],-1),A={__name:"SafeCenter",setup(O){const o=p(),u=x(),s=r(()=>u.tm("safecenter")),a=w();let l=r(()=>o.userInfo);async function v(){const{success:c,data:n}=await y();!c||(o.setUserInfo(n.info),console.log(n))}v();function h(){a.push({name:"changebuspwd"})}function m(){a.push({name:"changepwd"})}return(c,n)=>(b(),k("div",S,[e("div",C,[e("div",{onClick:n[0]||(n[0]=V=>c.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},I),e("span",P,i(t(s).titleText),1)]),e("div",T,[e("div",U,[e("div",{onClick:h,class:"v-safe-center-item g-flex-align-center g-flex-justify-between"},[e("div",$,i(t(s).busPwdText),1),e("div",B,[f(e("div",D,[G,e("span",null,i(t(s).noSetText),1)],512),[[_,t(l).fundPasswordStatus==0]]),R])]),e("div",{onClick:m,class:"v-safe-center-item g-flex-align-center g-flex-justify-between"},[e("div",z,i(t(s).loginPwdText),1),e("div",E,[f(e("div",H,[L,e("span",null,i(t(s).noSetText),1)],512),[[_,t(l).passwordStatus==0]]),N])])])])]))}};export{A as default};
