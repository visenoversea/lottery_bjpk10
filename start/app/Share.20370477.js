import{C as _,g as v,s as m,u as h,c as o,o as d,a as p,b as e,t as l,d as s,j as x,m as y,aa as k,W as b,ad as j}from"./main.d88c4f71.js";import{v as I}from"./vue-qr.cbbfc37c.js";import"./index.548a3b58.js";const C={class:"v_share g-flex-column"},S={class:"v-head g-flex-justify-center g-flex-align-center"},$=e("i",{class:"iconfont icon-zuojiantou"},null,-1),B=[$],U={class:"v-title g-flex-align-center g-flex-justify-center"},V={class:"v-share-card g-flex-column g-flex-align-center"},z={class:"v-share-qr-box g-flex-justify-center"},w={class:"v-share-address"},T={__name:"Share",setup(G){let n=_({address:""}),u=v(5);const a=m(),i=h(),c=o(()=>i.tm("share"));o(()=>i.tm("gongyong")),o(()=>a.userInfo);async function f(){a.loadingShow=!0;const{success:r,data:t}=await b();!r||(a.setUserInfo(t.info),n.address=t.info.promoteUrl,console.log(t))}return f(),(r,t)=>(d(),p("div",C,[e("div",S,[e("div",{onClick:t[0]||(t[0]=g=>r.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},B),e("span",U,l(s(c).titleText),1)]),e("div",{style:k({backgroundImage:`url(${s(a).banner.tg})`}),class:"v-share-container"},[e("div",V,[e("div",z,[s(n).address?(d(),x(I,{key:0,correctLevel:3,ref:"refVueQr",text:s(n).address,margin:s(u),size:130},null,8,["text","margin"])):y("",!0)]),e("div",w,[e("span",null,l(s(n).address),1)]),e("div",{onClick:t[1]||(t[1]=g=>s(j)(s(n).address)),class:"v-share-btn g-flex-align-center g-flex-justify-center"},[e("span",null,l(s(c).shareLinkText),1)])])],4)]))}};export{T as default};
