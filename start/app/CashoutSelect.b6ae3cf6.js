import{_ as v}from"./user_icon_enter.35dd2a42.js";import{s as p,u as m,c as k,l as x,k as y,a as C,o,d as i,f as s,t as l,g as u,F as $,h as j,ag as S}from"./index.de11b688.js";const b={class:"v_cashout_select g-flex-column"},B={class:"v-head g-flex-justify-center g-flex-align-center"},F=s("i",{class:"iconfont icon-zuojiantou"},null,-1),L=[F],O={class:"v-title g-flex-align-center g-flex-justify-center"},w=s("i",{class:"iconfont icon-datijilu"},null,-1),G=[w],R={class:"v-cashout-select-container"},z={class:"v-cashout-select-list"},D=["onClick"],E={class:"v-cashout-methon-item-left g-flex-align-center"},H=["src"],I=s("div",{class:"v-cashout-methon-item-right g-flex-align-center"},[s("img",{src:v,alt:""})],-1),W={__name:"CashoutSelect",setup(K){const r=p(),d=m(),_=k(()=>d.tm("cashoutSelect"));x();const a=y();let c=C({list:[]});async function h(){r.loadingShow=!0;const{success:t,data:e}=await S({type:1});!t||(c.list=e.list)}h();function f(t){t.fn=="Bank"?a.push({name:"cashoutbank",params:{id:t.id}}):t.fn=="Wallet"?a.push({name:"cashoutbi",params:{id:t.id}}):t.fn=="KeFu"&&a.push({name:"cashoutkefu",params:{id:t.id}})}return(t,e)=>(o(),i("div",b,[s("div",B,[s("div",{onClick:e[0]||(e[0]=n=>t.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},L),s("span",O,l(u(_).titleText),1),s("div",{onClick:e[1]||(e[1]=n=>t.$router.push({name:"cashouthistory"})),class:"v-head-right g-flex-align-center"},G)]),s("div",R,[s("div",z,[(o(!0),i($,null,j(u(c).list,(n,g)=>(o(),i("div",{onClick:N=>f(n),key:g,class:"v-cashout-select-item g-flex-align-center"},[s("div",E,[s("img",{src:n.icon,alt:""},null,8,H),s("span",null,l(n.title),1)]),I],8,D))),128))])])]))}};export{W as default};