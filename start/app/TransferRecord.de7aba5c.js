import{s as b,v as k,c as m,e as h,E as p,O as D,r as j,o as c,a as d,b as e,t as s,m as C,p as L,h as o,d as M,j as R,H as S,bi as B,K as E,M as H,N,X as F,_ as I}from"./main.06b452f5.js";const O={class:"v_transfer g-flex-column n-bg"},V={class:"new-head"},Y=e("img",{src:I,alt:""},null,-1),$=[Y],z={class:"new-head_title_text"},K={class:"v-transfer-title g-flex"},U={class:"v-transfer-list-content"},X={class:"item-left"},q={class:"item-right"},A={class:"item-top-amount"},P={__name:"TransferRecord",setup(G){const x=b(),_=k.exports.useI18n(),i=m(()=>_.tm("myTransferRecord")),u=m(()=>_.tm("gongyong"));let n=h(!1),f=h(!1),v=p({page:1,limit:30}),l=p({list:[]});const g=async()=>{x.loadingShow=!0;const{success:r,data:a}=await B(v);!r||(l.list=l.list.concat(a.list),n.value=!1,f.value=!a.list.length)},w=()=>{v.page++,g()};return D(()=>{g()}),(r,a)=>{const y=j("van-list");return c(),d("div",O,[e("div",V,[e("div",{onClick:a[0]||(a[0]=t=>r.$router.go(-1)),class:"new-head-back"},$)]),e("div",z,s(i.value.titleText),1),e("div",K,s(i.value.pendingTitleText),1),e("div",U,[C(M(y,{class:"v-list",loading:o(n),"onUpdate:loading":a[1]||(a[1]=t=>S(n)?n.value=t:n=t),finished:o(f),"loading-text":u.value.loadingText,"finished-text":u.value.finishText,onLoad:w,"immediate-check":!1},{default:R(()=>[(c(!0),d(E,null,H(o(l).list,(t,T)=>(c(),d("div",{key:T,class:"v-list-item g-flex-justify-between"},[e("div",X,[e("p",null,"Swap:"+s(t.from_amount)+" "+s(t.from_currency),1),e("span",null,s(o(N)(t.create_time,"YY/MM/DD HH:mm")),1)]),e("div",q,[e("p",A,"+"+s(t.to_amount)+" "+s(t.to_currency),1),e("span",{class:F(t.status===1?"green":"red")},s(t.status===1?i.value.successText:i.value.FailedText),3)])]))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[L,o(l).list.length]])])])}}};export{P as default};
