import{s as k,u as I,D as S,v as b,c as $,e as l,O as D,r as N,o as c,a as r,b as t,t as a,K as V,M as j,P as B,l as H,d as L,j as M,Q as O,S as R,U as T,V as G,_ as U}from"./main.c91d7720.js";import{_ as q}from"./index.e0223da1.js";const E=n=>(T("data-v-538f9435"),n=n(),G(),n),F={class:"v_hall g-flex-column n-bg"},K={class:"new-head"},P=E(()=>t("img",{src:U,alt:""},null,-1)),Q=[P],z={class:"new-head_title_text"},A={key:0,class:"lottery-list"},J=["onClick"],W={class:"lottery-icon g-flex-align-center"},X=["src"],Y={class:"lottery-info lottery-name"},Z=["onClick"],tt={class:"c-des-container"},et={class:"des-title"},ot={__name:"CommonHall",props:{roomId:{type:Number,default(){return 0}}},setup(n){const m=k(),h=I();S();const f=b.exports.useI18n(),u=$(()=>f.tm("hall")),p=n,i=l(!1),d=l({}),v=l(""),_=l([]),y=async()=>{m.loadingShow=!0;const{success:e,data:s}=await O({id:p.roomId});!e||(_.value=s.info,v.value=s.info[0].name)},g=e=>{e.status===1?h.push({path:"/chip",query:{id:e.id,room:p.roomId}}):e.status===2&&R(u.value.noOpen)},w=e=>{d.value=e,i.value=!0};return D(()=>{y()}),(e,s)=>{const C=N("van-popup");return c(),r("div",F,[t("div",K,[t("div",{class:"new-head-back",onClick:s[0]||(s[0]=o=>e.$router.go(-1))},Q)]),t("div",z,a(v.value),1),_.value.length?(c(),r("div",A,[(c(!0),r(V,null,j(_.value,o=>(c(),r("div",{class:"lottery-item g-flex-align-center",key:o.id,onClick:x=>g(o)},[t("div",W,[t("img",{src:o.lottery_icon,alt:""},null,8,X)]),t("div",Y,a(o.lottery_name),1),t("div",{class:"lottery-info lottery-des",onClick:B(x=>w(o),["stop"])},a(u.value.descriptionText),9,Z)],8,J))),128))])):H("",!0),L(C,{"safe-area-inset-bottom":"",class:"c-des-pop",show:i.value,"onUpdate:show":s[1]||(s[1]=o=>i.value=o),position:"center"},{default:M(()=>[t("div",tt,[t("div",et,a(d.value.lottery_name),1),t("p",null,a(d.value.description),1)])]),_:1},8,["show"])])}}},at=q(ot,[["__scopeId","data-v-538f9435"]]);export{at as C};