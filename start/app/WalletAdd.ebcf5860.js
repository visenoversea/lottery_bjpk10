import{f as A,s as I,u as W,c as V,C as v,g as h,r as $,o as g,a as m,b as e,t as n,d as t,ac as z,e as b,F as B,G,p as H,v as N,ay as O,az as P,S as D,H as E}from"./main.6744d0db.js";import{_ as F}from"./SelectCoinPop.a7bae68e.js";const R={class:"v_wallet_add g-flex-column"},U={class:"v-head g-flex-justify-center g-flex-align-center"},q=e("i",{class:"iconfont icon-zuojiantou"},null,-1),J=[q],K={class:"v-title g-flex-align-center g-flex-justify-center"},M={class:"v-user-real-list-container"},Q={class:"v-title"},X={class:"v-wallet-add-content"},Y={class:"v-cashout-coin-top"},Z={class:"v-cashout-coin-title"},ee={class:"v-cashout-coin-two-select-box"},te={class:"v-cashout-coin-two-select-left g-flex-align-center"},se=["src"],le={class:"v-cashout-coin-title"},oe={class:"v-cashout-coin-link-list g-flex-align-center"},ne=["onClick"],ae={class:"v-cashout-coin-title"},ie={class:"v-cashout-coin-address-input"},ce={class:"v-wallet-add-btn-list g-flex-align-center g-flex-justify-center"},ve={__name:"WalletAdd",setup(de){let x=A();const C=I(),y=W(),a=V(()=>y.tm("walletadd"));let d=v({transform:""}),r=h(!1),l=v({obj:{}}),p=v({list:[]}),i=v({id:"",chain:"",currency:"",address:"",icon:""}),u=h(0);function k(o,s){u.value=s}async function j(){const{success:o,data:s}=await O();!o||(p.list=s.list,l.obj=s.list[0],console.log(s))}j();const _=h(null);function w(o){_.value.onClose(),r.value=!1,d.transform="rotate(0deg)",l.obj=o,u.value=0,console.log(o)}function S(){r.value=!r.value,r.value?(_.value.onShow(),d.transform="rotate(180deg)"):(d.transform="rotate(0deg)",_.value.onClose())}async function T(){l.obj.currency&&(i.currency=l.obj.currency,i.icon=l.obj.icon,l.obj.chainList.length&&(i.chain=l.obj.chainList[u.value])),C.loadingShow=!0;const{success:o,data:s}=await P(i);!o||(D.success(s.msg),setTimeout(()=>{x.go(-1)},500))}return(o,s)=>{const L=$("van-field");return g(),m("div",R,[e("div",U,[e("div",{onClick:s[0]||(s[0]=c=>o.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},J),e("span",K,n(t(a).titleText),1)]),e("div",M,[e("div",Q,n(t(a).titleText),1),e("div",X,[e("div",Y,[e("p",Z,n(t(a).selectText),1),e("div",ee,[e("div",{class:"v-cashout-coin-two-select g-flex-align-center",onClick:S},[e("div",te,[e("img",{src:t(l).obj.icon,alt:""},null,8,se),e("span",null,n(t(l).obj.currency),1)]),e("i",{class:"iconfont icon-xiala",style:z(t(d))},null,4)]),b(F,{coinList:t(p).list,onEmitCoinItemClick:w,ref_key:"refSelectCoinPop",ref:_},null,8,["coinList"])]),e("p",le,n(t(a).linkNameText),1),e("ul",oe,[(g(!0),m(B,null,G(t(l).obj.chainList,(c,f)=>(g(),m("li",{onClick:re=>k(c,f),class:E([t(u)==f?"active":"","v-cashout-coin-link-item"]),key:f},[e("span",null,n(c),1)],10,ne))),128))]),e("p",ae,n(t(a).addressText),1),e("div",ie,[b(L,{modelValue:t(i).address,"onUpdate:modelValue":s[1]||(s[1]=c=>t(i).address=c),label:"","label-width":"0",placeholder:t(a).addressPlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",ce,[H(e("div",{onClick:T,class:"v-wallet-add-btn-item v-wallet-add-btn-item-submit g-flex-align-center g-flex-justify-center"},[e("span",null,n(t(a).submitText),1)],512),[[N,!t(i).id]])])])])])}}};export{ve as default};
