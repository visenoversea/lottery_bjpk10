import{_ as x,s as I,f as S,E as b,u as N,c as $,g as l,K as B,r as D,o as c,a as r,b as t,t as a,M as H,N as L,d as M,O,m as R,e as T,k as V,P as E,Q as G,S as U,U as j,I as q}from"./main.eeabd2a7.js";const F=n=>(U("data-v-538f9435"),n=n(),j(),n),K={class:"v_hall g-flex-column n-bg"},P={class:"new-head"},Q=F(()=>t("img",{src:q,alt:""},null,-1)),z=[Q],A={class:"new-head_title_text"},J={key:0,class:"lottery-list"},W=["onClick"],X={class:"lottery-icon g-flex-align-center"},Y=["src"],Z={class:"lottery-info lottery-name"},tt=["onClick"],et={class:"c-des-container"},st={class:"des-title"},ot={__name:"CommonHall",props:{roomId:{type:Number,default(){return 0}}},setup(n){const u=n,h=I(),m=S();b();const f=N(),p=$(()=>f.tm("hall")),i=l(!1),d=l({}),v=l(""),_=l([]),y=async()=>{h.loadingShow=!0;const{success:e,data:o}=await E({id:u.roomId});!e||(_.value=o.info,v.value=o.info[0].name)},g=e=>{e.status===1?m.push({path:"/chip",query:{id:e.id,room:u.roomId}}):e.status===2&&G(p.value.noOpen)},w=e=>{d.value=e,i.value=!0};return B(()=>{y()}),(e,o)=>{const C=D("van-popup");return c(),r("div",K,[t("div",P,[t("div",{class:"new-head-back",onClick:o[0]||(o[0]=s=>e.$router.go(-1))},z)]),t("div",A,a(v.value),1),_.value.length?(c(),r("div",J,[(c(!0),r(H,null,L(_.value,s=>(c(),r("div",{class:"lottery-item g-flex-align-center",key:s.id,onClick:k=>g(s)},[t("div",X,[t("img",{src:s.lottery_icon,alt:""},null,8,Y)]),t("div",Z,a(s.lottery_name),1),t("div",{class:"lottery-info lottery-des",onClick:O(k=>w(s),["stop"])},a(M(p).descriptionText),9,tt)],8,W))),128))])):R("",!0),T(C,{"safe-area-inset-bottom":"",class:"c-des-pop",show:i.value,"onUpdate:show":o[1]||(o[1]=s=>i.value=s),position:"center"},{default:V(()=>[t("div",et,[t("div",st,a(d.value.lottery_name),1),t("p",null,a(d.value.description),1)])]),_:1},8,["show"])])}}},at=x(ot,[["__scopeId","data-v-538f9435"]]);export{at as C};
