import{s as k,u as b,c as h,g as v,F as p,K as D,r as C,o as c,a as d,b as t,t as a,d as e,p as L,v as M,e as R,k as S,J as B,bn as F,M as N,N as j,a8 as E,Z as H,I}from"./main.df4ea462.js";const V={class:"v_transfer g-flex-column n-bg"},Y={class:"new-head"},$=t("img",{src:I,alt:""},null,-1),z=[$],J={class:"new-head_title_text"},K={class:"v-transfer-title g-flex"},O={class:"v-transfer-list-content"},U={class:"item-left"},Z={class:"item-right"},q={class:"item-top-amount"},P={__name:"TransferRecord",setup(A){const x=k(),_=b(),i=h(()=>_.tm("myTransferRecord")),u=h(()=>_.tm("gongyong"));let o=v(!1),f=v(!1),g=p({page:1,limit:30}),l=p({list:[]});const m=async()=>{x.loadingShow=!0;const{success:r,data:n}=await F(g);!r||(l.list=l.list.concat(n.list),o.value=!1,f.value=!n.list.length)},w=()=>{g.page++,m()};return D(()=>{m()}),(r,n)=>{const y=C("van-list");return c(),d("div",V,[t("div",Y,[t("div",{onClick:n[0]||(n[0]=s=>r.$router.go(-1)),class:"new-head-back"},z)]),t("div",J,a(e(i).titleText),1),t("div",K,a(e(i).pendingTitleText),1),t("div",O,[L(R(y,{class:"v-list",loading:e(o),"onUpdate:loading":n[1]||(n[1]=s=>B(o)?o.value=s:o=s),finished:e(f),"loading-text":e(u).loadingText,"finished-text":e(u).finishText,onLoad:w,"immediate-check":!1},{default:S(()=>[(c(!0),d(N,null,j(e(l).list,(s,T)=>(c(),d("div",{key:T,class:"v-list-item g-flex-justify-between"},[t("div",U,[t("p",null,"Swap:"+a(s.from_amount)+" "+a(s.from_currency),1),t("span",null,a(e(E)(s.create_time,"YY/MM/DD HH:mm")),1)]),t("div",Z,[t("p",q,"+"+a(s.to_amount)+" "+a(s.to_currency),1),t("span",{class:H(s.status===1?"green":"red")},a(s.status===1?e(i).successText:e(i).FailedText),3)])]))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[M,e(l).list.length]])])])}}};export{P as default};
