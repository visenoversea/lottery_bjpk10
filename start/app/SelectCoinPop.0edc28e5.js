import{e as r,m as k,p as g,h as p,o as s,a as c,K as y,M as S,Y as w,b as n,t as x}from"./main.b5791ad0.js";const B={class:"c-coin-pop"},I=["onClick"],L=["src"],D={class:"c-coin-pop-item-right"},P={class:"c-coin-pop-item-title"},A={__name:"SelectCoinPop",props:{coinList:{type:Array,default(){return[]}}},emits:["emitCoinItemClick"],setup(_,{expose:u,emit:m}){const h=_;let i=r(0),e=r(!1);function v(){e.value=!0}function C(){e.value=!1}u({onShow:v,onClose:C});const d=m;function f(a,l){i.value=l,d("emitCoinItemClick",a)}return(a,l)=>k((s(),c("div",B,[(s(!0),c(y,null,S(h.coinList,(t,o)=>(s(),c("div",{onClick:b=>f(t,o),class:w(["c-coin-pop-item g-flex-align-center",o==p(i)?"c-coin-pop-item-active":""]),key:o},[n("img",{src:t.icon,alt:""},null,8,L),n("div",D,[n("span",P,x(t.currency),1)])],10,I))),128))],512)),[[g,p(e)]])}};export{A as _};
