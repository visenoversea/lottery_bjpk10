import{s as m,u as f,D as g,v as y,c as x,e as i,O as I,o as n,a as l,b as t,t as _,K as b,M as k,l as w,P as S,Q as j,S as C,_ as $}from"./main.06b452f5.js";import{_ as B}from"./index.8c4ec3f4.js";const D=a=>(j("data-v-db488653"),a=a(),C(),a),H={class:"v_hall g-flex-column n-bg"},R={class:"new-head"},G=D(()=>t("img",{src:$,alt:""},null,-1)),L=[G],M={class:"new-head_title_text"},N={key:0,class:"lottery-list"},O=["onClick"],T={class:"lottery-icon g-flex-justify-center"},V=["src"],q={class:"lottery-name"},E={__name:"HallIntermediate",setup(a){const d=m(),u=f();g();const p=y.exports.useI18n();x(()=>p.tm("hall"));const r=i(""),c=i([]),h=async()=>{console.log(666),d.loadingShow=!0;const{success:e,data:s}=await S({id:2});!e||(c.value=s.info,r.value=s.info[0].name)},v=e=>{e.status===1?u.push({path:"/chip",query:{id:e.id,room:2}}):e.status===2&&Toast("\u6682\u672A\u5F00\u653E\uFF0C\u656C\u8BF7\u671F\u5F85\uFF01\uFF01\uFF01")};return I(()=>{console.log(222),h()}),(e,s)=>(n(),l("div",H,[t("div",R,[t("div",{class:"new-head-back",onClick:s[0]||(s[0]=o=>e.$router.go(-1))},L)]),t("div",M,_(r.value),1),c.value.length?(n(),l("div",N,[(n(!0),l(b,null,k(c.value,o=>(n(),l("div",{class:"lottery-item g-flex-justify-between g-flex-align-center",key:o.id,onClick:F=>v(o)},[t("div",T,[t("img",{src:o.lottery_icon,alt:""},null,8,V)]),t("div",q,_(o.lottery_name),1)],8,O))),128))])):w("",!0)]))}},Q=B(E,[["__scopeId","data-v-db488653"]]);export{Q as default};