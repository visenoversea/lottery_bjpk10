import{u as k,c as P,g as u,w as x,r as p,o as g,a as B,e as i,k as V,b as c,t as C,d as n,J as r}from"./main.ed929957.js";const j={class:"s_buy_sell_pwd_pop"},N={class:"s-pop-title g-flex-justify-center"},D={__name:"BussinessPwdPop",emits:["emitPwd"],setup(S,{expose:_,emit:d}){const w=k(),m=P(()=>w.tm("bussinessPwdPop"));let e=u(!1),s=u(""),a=u(!0);function v(){s.value="",e.value=!0}function f(){e.value=!1}return _({onShow:v}),x(s,l=>{l.length==6&&(e.value=!1,d("emitPwd",l))}),(l,o)=>{const y=p("van-password-input"),b=p("van-number-keyboard"),h=p("van-popup");return g(),B("div",j,[i(h,{"close-on-click-overlay":!1,class:"s-buy-sell-pwd-pop",show:n(e),"onUpdate:show":o[2]||(o[2]=t=>r(e)?e.value=t:e=t),position:"center",style:{width:"90%"}},{default:V(()=>[c("i",{class:"iconfont icon-shanchu2",onClick:f}),c("p",N,C(n(m).titleText),1),i(y,{value:n(s),focused:n(a),onFocus:o[0]||(o[0]=t=>r(a)?a.value=!0:a=!0)},null,8,["value","focused"]),i(b,{class:"s-pop-keyboard",modelValue:n(s),"onUpdate:modelValue":o[1]||(o[1]=t=>r(s)?s.value=t:s=t),show:n(a)},null,8,["modelValue","show"])]),_:1},8,["show"])])}}};export{D as _};
