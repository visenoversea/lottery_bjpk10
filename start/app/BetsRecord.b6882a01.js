import{_ as j,s as k,v as C,c as v,D as B,e as a,J as D,r as I,o as c,a as d,b as e,t as s,m as L,p as S,d as R,j as M,a3 as $,K as H,M as N,W as q,h as f,a4 as z,a5 as T,Q as V,S as E}from"./main.9f0aae05.js";const F=i=>(V("data-v-cfcef816"),i=i(),E(),i),J={class:"s_lottery_history"},K={class:"v-history-head g-flex-align-center"},O=F(()=>e("i",{class:"iconfont icon-zuojiantou"},null,-1)),Q=[O],U={class:"v-history-head-title g-flex-align-center g-flex-justify-center"},W={class:"history-list"},A=["onClick"],G={class:"v-list-item-top g-flex-align-center g-flex-justify-between"},P={class:"lottery-name"},X={class:"lottery-status"},Y={class:"v-list-item-top g-flex-align-center g-flex-justify-between"},Z={class:"lottery-name"},tt={class:"lottery-status"},et={class:"v-list-item-top g-flex-align-center g-flex-justify-between"},st={class:"lottery-name"},ot={class:"v-list-item-top g-flex-align-center g-flex-justify-between"},nt={class:"lottery-name"},at={__name:"BetsRecord",setup(i){const g=k(),r=C.exports.useI18n(),_=v(()=>r.tm("chip")),u=v(()=>r.tm("gongyong")),h=B();a({});const l=a([]),p=a(),m=a({page:1,limit:15}),y=a(0),x=async()=>{g.loadingShow=!0;const{success:o,data:n}=await $(m.value);!o||(l.value=n.list,y.value=n.total)};return D(()=>{p.value=h.query.id,x()}),(o,n)=>{const w=I("van-list");return c(),d("div",J,[e("div",K,[e("div",{onClick:n[0]||(n[0]=t=>o.$router.go(-1)),class:"v-history-head-left g-flex-align-center"},Q),e("div",U,s(_.value.betsRecord),1)]),e("div",W,[L(R(w,{class:"v-list",loading:o.loading,"onUpdate:loading":n[1]||(n[1]=t=>o.loading=t),finished:o.finished,"loading-text":u.value.loadingText,"finished-text":u.value.finishText,onLoad:o.onLoad,"immediate-check":!1},{default:M(()=>[(c(!0),d(H,null,N(l.value,(t,b)=>(c(),d("div",{onClick:it=>o.orderItemClick(t),key:b,class:"v-list-item"},[e("div",G,[e("div",P,s(t.name),1),e("div",X,s(t.statusDesc),1)]),e("div",Y,[e("div",Z,s(t.lottery_group_name)+"-"+s(t.bet_no),1),e("div",tt,s(t.bet_amount_mop),1)]),e("div",et,[e("div",st,s(_.value.rate)+":"+s(t.odds),1),e("div",{class:q(["lottery-status",f(z)(t.win_amount_mop)])},s(Number(t.win_amount_mop)>=0?"+"+t.win_amount_mop:t.win_amount_mop)+" "+s(t.currency),3)]),e("div",ot,[e("div",nt,s(f(T)(t.create_time,"MM/DD HH:mm")),1)])],8,A))),128))]),_:1},8,["loading","finished","loading-text","finished-text","onLoad"]),[[S,l.value.length]])])])}}},ct=j(at,[["__scopeId","data-v-cfcef816"]]);export{ct as default};
