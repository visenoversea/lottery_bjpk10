import{s as m,u as y,D as g,v as x,c as k,e as r,O as w,o as n,a as c,b as t,t as d,K as I,M as S,l as b,P as j,Q as C,S as $,_ as A}from"./main.647ad1fa.js";import{_ as B}from"./index.f5b89efb.js";const D=a=>(C("data-v-4d134139"),a=a(),$(),a),H={class:"v_hall g-flex-column n-bg"},O={class:"new-head"},R=D(()=>t("img",{src:A,alt:""},null,-1)),G=[R],L={class:"new-head_title_text"},M={key:0,class:"lottery-list"},N=["onClick"],T={class:"lottery-icon g-flex-justify-center"},V=["src"],q={class:"lottery-name"},E={__name:"HallAdvanced",setup(a){const _=m(),u=y();g();const p=x.exports.useI18n(),v=k(()=>p.tm("hall")),i=r(""),l=r([]),h=async()=>{_.loadingShow=!0;const{success:e,data:s}=await j({id:3});!e||(l.value=s.info,i.value=s.info[0].name)},f=e=>{e.status===1?u.push({path:"/chip",query:{id:e.id,room:3}}):e.status===2&&Toast(v.value.noOpen)};return w(()=>{h()}),(e,s)=>(n(),c("div",H,[t("div",O,[t("div",{class:"new-head-back",onClick:s[0]||(s[0]=o=>e.$router.go(-1))},G)]),t("div",L,d(i.value),1),l.value.length?(n(),c("div",M,[(n(!0),c(I,null,S(l.value,o=>(n(),c("div",{class:"lottery-item g-flex-justify-between g-flex-align-center",key:o.id,onClick:F=>f(o)},[t("div",T,[t("img",{src:o.lottery_icon,alt:""},null,8,V)]),t("div",q,d(o.lottery_name),1)],8,N))),128))])):b("",!0)]))}},Q=B(E,[["__scopeId","data-v-4d134139"]]);export{Q as default};
