import{s as y,u as g,D as x,v as k,c as w,e as r,O as I,o as n,a as c,b as t,t as d,K as S,M as b,l as j,P as C,Q as $,S as A,_ as B}from"./main.3dc1c252.js";import{_ as D}from"./index.431a3ff1.js";const _=a=>($("data-v-a6587d02"),a=a(),A(),a),H={class:"v_hall g-flex-column n-bg"},O={class:"new-head"},R=_(()=>t("img",{src:B,alt:""},null,-1)),G=[R],L={class:"new-head_title_text"},M={key:0,class:"lottery-list"},N=["onClick"],T={class:"lottery-icon g-flex-justify-center"},V=["src"],q={class:"lottery-name"},E=_(()=>t("div",{class:"lottery-name lottery-des"},"\u73A9\u6CD5\u8BF4\u660E",-1)),F={__name:"HallAdvanced",setup(a){const u=y(),p=g();x();const v=k.exports.useI18n(),h=w(()=>v.tm("hall")),i=r(""),l=r([]),f=async()=>{u.loadingShow=!0;const{success:e,data:s}=await C({id:3});!e||(l.value=s.info,i.value=s.info[0].name)},m=e=>{e.status===1?p.push({path:"/chip",query:{id:e.id,room:3}}):e.status===2&&Toast(h.value.noOpen)};return I(()=>{f()}),(e,s)=>(n(),c("div",H,[t("div",O,[t("div",{class:"new-head-back",onClick:s[0]||(s[0]=o=>e.$router.go(-1))},G)]),t("div",L,d(i.value),1),l.value.length?(n(),c("div",M,[(n(!0),c(S,null,b(l.value,o=>(n(),c("div",{class:"lottery-item g-flex-justify-between g-flex-align-center",key:o.id,onClick:K=>m(o)},[t("div",T,[t("img",{src:o.lottery_icon,alt:""},null,8,V)]),t("div",q,d(o.lottery_name),1),E],8,N))),128))])):j("",!0)]))}},z=D(F,[["__scopeId","data-v-a6587d02"]]);export{z as default};
