import{_ as j,s as k,v as C,c as v,D as B,e as a,P as D,r as I,o as c,a as d,b as e,t as s,m as L,p as S,d as R,j as M,a6 as N,K as $,M as H,Z as V,h as f,a7 as q,N as z,V as T,W as E}from"./main.d7f4790a.js";const F=i=>(T("data-v-cfcef816"),i=i(),E(),i),K={class:"s_lottery_history"},O={class:"v-history-head g-flex-align-center"},P=F(()=>e("i",{class:"iconfont icon-zuojiantou"},null,-1)),U=[P],W={class:"v-history-head-title g-flex-align-center g-flex-justify-center"},Z={class:"history-list"},A=["onClick"],G={class:"v-list-item-top g-flex-align-center g-flex-justify-between"},J={class:"lottery-name"},Q={class:"lottery-status"},X={class:"v-list-item-top g-flex-align-center g-flex-justify-between"},Y={class:"lottery-name"},tt={class:"lottery-status"},et={class:"v-list-item-top g-flex-align-center g-flex-justify-between"},st={class:"lottery-name"},ot={class:"v-list-item-top g-flex-align-center g-flex-justify-between"},nt={class:"lottery-name"},at={__name:"BetsRecord",setup(i){const g=k(),r=C.exports.useI18n(),_=v(()=>r.tm("chip")),u=v(()=>r.tm("gongyong")),h=B();a({});const l=a([]),p=a(),m=a({page:1,limit:15}),y=a(0),x=async()=>{g.loadingShow=!0;const{success:o,data:n}=await N(m.value);!o||(l.value=n.list,y.value=n.total)};return D(()=>{p.value=h.query.id,x()}),(o,n)=>{const w=I("van-list");return c(),d("div",K,[e("div",O,[e("div",{onClick:n[0]||(n[0]=t=>o.$router.go(-1)),class:"v-history-head-left g-flex-align-center"},U),e("div",W,s(_.value.betsRecord),1)]),e("div",Z,[L(R(w,{class:"v-list",loading:o.loading,"onUpdate:loading":n[1]||(n[1]=t=>o.loading=t),finished:o.finished,"loading-text":u.value.loadingText,"finished-text":u.value.finishText,onLoad:o.onLoad,"immediate-check":!1},{default:M(()=>[(c(!0),d($,null,H(l.value,(t,b)=>(c(),d("div",{onClick:it=>o.orderItemClick(t),key:b,class:"v-list-item"},[e("div",G,[e("div",J,s(t.name),1),e("div",Q,s(t.statusDesc),1)]),e("div",X,[e("div",Y,s(t.lottery_group_name)+"-"+s(t.bet_no),1),e("div",tt,s(t.bet_amount_mop),1)]),e("div",et,[e("div",st,s(_.value.rate)+":"+s(t.odds),1),e("div",{class:V(["lottery-status",f(q)(t.win_amount_mop)])},s(Number(t.win_amount_mop)>=0?"+"+t.win_amount_mop:t.win_amount_mop)+" "+s(t.currency),3)]),e("div",ot,[e("div",nt,s(f(z)(t.create_time,"MM/DD HH:mm")),1)])],8,A))),128))]),_:1},8,["loading","finished","loading-text","finished-text","onLoad"]),[[S,l.value.length]])])])}}},ct=j(at,[["__scopeId","data-v-cfcef816"]]);export{ct as default};
