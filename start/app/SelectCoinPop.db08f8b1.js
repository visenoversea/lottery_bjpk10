import{r,j as C,v as g,g as p,o as s,d as c,F as k,h as y,I as S,f as n,t as w}from"./index.de11b688.js";const I={class:"c-coin-pop"},x=["onClick"],B=["src"],L={class:"c-coin-pop-item-right"},D={class:"c-coin-pop-item-title"},j={__name:"SelectCoinPop",props:{coinList:{type:Array,default(){return[]}}},emits:["emitCoinItemClick"],setup(_,{expose:u,emit:m}){const v=_;let i=r(0),e=r(!1);function d(){e.value=!0}function f(){e.value=!1}u({onShow:d,onClose:f});function h(a,l){i.value=l,m("emitCoinItemClick",a)}return(a,l)=>C((s(),c("div",I,[(s(!0),c(k,null,y(v.coinList,(t,o)=>(s(),c("div",{onClick:F=>h(t,o),class:S(["c-coin-pop-item g-flex-align-center",o==p(i)?"c-coin-pop-item-active":""]),key:o},[n("img",{src:t.icon,alt:""},null,8,B),n("div",L,[n("span",D,w(t.currency),1)])],10,x))),128))],512)),[[g,p(e)]])}};export{j as _};
