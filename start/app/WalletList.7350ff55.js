import{s as p,u as w,c as x,g as y,C as k,o as c,a as d,b as t,t as i,d as a,p as g,v,F as b,G as j,aq as $,P as C,ao as L,ap as W,S as D}from"./main.bc976cef.js";import{_ as S}from"./public_increase_black.a59937a1.js";import{_ as T}from"./deficiency_bank_record.781417be.js";const A={class:"v_wallet_list g-flex-column"},B={class:"v-head g-flex-justify-center g-flex-align-center"},G=t("i",{class:"iconfont icon-zuojiantou"},null,-1),F=[G],H={class:"v-title g-flex-align-center g-flex-justify-center"},q=t("img",{src:S,alt:""},null,-1),z=[q],E={class:"v-wallet-list-container"},I={class:"v-wallet-list-content"},M={class:"v-wallet-item-left"},N={class:"v-wallet-item-left-img"},O=["src"],P={class:"v-wallet-item-left-img-type g-flex-align-center g-flex-justify-center"},V={class:"v-wallet-item-middle"},J={class:"v-wallet-item-middle-top g-flex-justify-between g-flex-align-center"},K={class:"v-wallet-item-middle-top-title"},Q={class:"v-wallet-item-middle-top-link g-flex-align-center g-flex-justify-center"},R={class:"v-wallet-item-middle-address"},U={class:"v-wallet-item-middle-bottom g-flex-align-center"},X=["onClick"],Y={class:"v-back-car-list-no g-flex-column g-flex-align-center"},Z=t("img",{src:T,alt:""},null,-1),tt={class:"v-back-car-list-no-text"},nt={__name:"WalletList",setup(st){const r=p(),u=w(),o=x(()=>u.tm("walletlist"));y(0);let n=k({list:[]});async function _(){r.loadingShow=!0;const{success:l,data:e}=await $();!l||(n.list=e.list,console.log(e))}_();function f(l){L.confirm({title:"",message:o.value.delTipsText}).then(()=>{h(l)}).catch(()=>{})}async function h(l){r.loadingShow=!0;const{success:e,data:s}=await W({id:l.id});!e||(D.success(s.msg),_(),console.log(s))}return(l,e)=>(c(),d("div",A,[t("div",B,[t("div",{onClick:e[0]||(e[0]=s=>l.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},F),t("span",H,i(a(o).titleText),1),t("div",{onClick:e[1]||(e[1]=s=>l.$router.push({name:"walletadd"})),class:"v-head-right g-flex-align-center"},z)]),t("div",E,[g(t("div",I,[(c(!0),d(b,null,j(a(n).list,(s,m)=>(c(),d("div",{key:m,class:"v-wallet-item g-flex-align-center"},[t("div",M,[t("div",N,[t("img",{src:s.icon,alt:""},null,8,O),t("span",P,i(s.chain),1)])]),t("div",V,[t("div",J,[t("div",K,i(s.currency)+"("+i(s.chain)+")",1),t("div",Q,i(s.chain),1)]),t("div",R,i(s.address),1),t("div",U,[t("i",{onClick:C(et=>f(s),["stop"]),class:"iconfont icon-shanchu"},null,8,X)])])]))),128))],512),[[v,a(n).list.length]]),g(t("div",Y,[Z,t("span",tt,i(a(o).nolistText),1)],512),[[v,!a(n).list.length]])])]))}};export{nt as default};
