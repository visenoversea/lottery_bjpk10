import{g as r,p as h,v as g,d as p,o as s,a as c,F as k,G as y,H as S,b as n,t as w}from"./main.0795c4c3.js";const x={class:"c-coin-pop"},B=["onClick"],I=["src"],L={class:"c-coin-pop-item-right"},D={class:"c-coin-pop-item-title"},b={__name:"SelectCoinPop",props:{coinList:{type:Array,default(){return[]}}},emits:["emitCoinItemClick"],setup(_,{expose:u,emit:m}){const v=_;let i=r(0),e=r(!1);function d(){e.value=!0}function C(){e.value=!1}u({onShow:d,onClose:C});function f(a,l){i.value=l,m("emitCoinItemClick",a)}return(a,l)=>h((s(),c("div",x,[(s(!0),c(k,null,y(v.coinList,(t,o)=>(s(),c("div",{onClick:F=>f(t,o),class:S(["c-coin-pop-item g-flex-align-center",o==p(i)?"c-coin-pop-item-active":""]),key:o},[n("img",{src:t.icon,alt:""},null,8,I),n("div",L,[n("span",D,w(t.currency),1)])],10,B))),128))],512)),[[g,p(e)]])}};export{b as _};
