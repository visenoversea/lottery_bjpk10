import{s as k,v as b,c as m,e as h,E as p,J as D,r as j,o as c,a as d,b as e,t as s,m as C,p as L,h as o,d as M,j as R,I as S,bk as B,K as E,M as H,a5 as I,W as F,H as N}from"./main.7d3dcc45.js";const V={class:"v_transfer g-flex-column n-bg"},Y={class:"new-head"},$=e("img",{src:N,alt:""},null,-1),z=[$],J={class:"new-head_title_text"},K={class:"v-transfer-title g-flex"},O={class:"v-transfer-list-content"},U={class:"item-left"},W={class:"item-right"},q={class:"item-top-amount"},P={__name:"TransferRecord",setup(A){const x=k(),_=b.exports.useI18n(),i=m(()=>_.tm("myTransferRecord")),u=m(()=>_.tm("gongyong"));let n=h(!1),f=h(!1),v=p({page:1,limit:30}),l=p({list:[]});const g=async()=>{x.loadingShow=!0;const{success:r,data:a}=await B(v);!r||(l.list=l.list.concat(a.list),n.value=!1,f.value=!a.list.length)},w=()=>{v.page++,g()};return D(()=>{g()}),(r,a)=>{const y=j("van-list");return c(),d("div",V,[e("div",Y,[e("div",{onClick:a[0]||(a[0]=t=>r.$router.go(-1)),class:"new-head-back"},z)]),e("div",J,s(i.value.titleText),1),e("div",K,s(i.value.pendingTitleText),1),e("div",O,[C(M(y,{class:"v-list",loading:o(n),"onUpdate:loading":a[1]||(a[1]=t=>S(n)?n.value=t:n=t),finished:o(f),"loading-text":u.value.loadingText,"finished-text":u.value.finishText,onLoad:w,"immediate-check":!1},{default:R(()=>[(c(!0),d(E,null,H(o(l).list,(t,T)=>(c(),d("div",{key:T,class:"v-list-item g-flex-justify-between"},[e("div",U,[e("p",null,"Swap:"+s(t.from_amount)+" "+s(t.from_currency),1),e("span",null,s(o(I)(t.create_time,"YY/MM/DD HH:mm")),1)]),e("div",W,[e("p",q,"+"+s(t.to_amount)+" "+s(t.to_currency),1),e("span",{class:F(t.status===1?"green":"red")},s(t.status===1?i.value.successText:i.value.FailedText),3)])]))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[L,o(l).list.length]])])])}}};export{P as default};
