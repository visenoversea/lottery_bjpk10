import{_ as T}from"./SelectCoinPop.f63e8d79.js";import{v as V}from"./vue-qr.bfd55355.js";import{s as $,u as q,c as N,B as w,f as z,g as c,C as _,o as g,a as m,b as e,t as a,d as n,aa as F,e as p,F as U,G as E,j as G,m as P,ab as Q,H,ad as M,_ as D}from"./main.01005b7b.js";import"./index.d04e00e7.js";const A={class:"v_recharge_bi g-flex-column"},J={class:"v-head g-flex-align-center"},K=e("i",{class:"iconfont icon-zuojiantou"},null,-1),W=[K],X={class:"v-title g-flex-align-center g-flex-justify-center"},Y={class:"v-recharge-bi-container"},Z={class:"v-recharge-bi-top"},ee={class:"v-recharge-bi-top-wangluo"},se={class:"v-recharge-coin-title"},ie={class:"v-recharge-bi-select-box"},ne={class:"v-recharge-bi-select-left g-flex-align-center"},oe={class:"v-recharge-coin-title"},te={class:"v-cashout-coin-link-list g-flex-align-center"},ae=["onClick"],ce={class:"v-recharge-bi-code-box"},re={class:"v-recharge-bi-qrcode-box g-flex-align-center g-flex-column"},le={class:"v-recharge-bi-qrcode g-flex-align-center g-flex-justify-center"},de={class:"v-recharge-bi-qrcode-address-title"},fe={class:"v-recharge-bi-qrcode-address-box g-flex-align-center"},ue={class:"v-recharge-bi-qrcode-address-val"},he=e("i",{class:"iconfont icon-ic_line_copy24px"},null,-1),_e=[he],ye={__name:"RechargeThird",setup(ge){$();const x=q(),l=N(()=>x.tm("rechargebi")),y=w();z();const j=c(null);let k=c(7),d=_({transform:""}),f=c(!1),i=_({obj:{}}),b=_({info:[]}),s=_({id:y.params.id,info:{currency:"",address:"",chain:""},amount:"",img:"",money:""}),r=c(0);function C(t,o){r.value=o,s.info.address=i.obj.chainList[r.value].address,s.info.chain=i.obj.chainList[r.value].chain}async function L(){const{success:t,data:o}=await Q({id:s.id});!t||(Object.assign(b,o.info),i.obj=o.info.info[0],s.info.address=i.obj.chainList[0].address,s.info.currency=i.obj.currency,s.info.chain=i.obj.chainList[0].chain)}L();const u=c(null);function S(){f.value=!f.value,f.value?(u.value.onShow(),d.transform="rotate(180deg)"):(d.transform="rotate(0deg)",u.value.onClose())}function I(t){u.value.onClose(),f.value=!1,d.transform="rotate(0deg)",i.obj=t,r.value=0,s.info.address=i.obj.chainList[0].address,s.info.currency=i.obj.currency,s.info.chain=i.obj.chainList[0].chain,O()}function O(){if(!s.amount)return s.money="";s.money=Math.formatFloat(Number(s.amount)*Number(i.obj.rate),i.obj.fixed).toFixed(i.obj.fixed)}const B=c(null);function R(t){s.img=t}return(t,o)=>(g(),m("div",A,[e("div",J,[e("div",{onClick:o[0]||(o[0]=h=>t.$router.go(-1)),class:"v-head-back-icon g-flex-align-center g-flex-justify-center"},W),e("div",X,a(n(l).titleText),1)]),e("div",Y,[e("div",Z,[e("div",ee,[e("p",se,a(n(l).selectBiText),1),e("div",ie,[e("div",{class:"v-recharge-bi-select g-flex-align-center",onClick:S},[e("div",ne,[e("span",null,a(n(i).obj.currency),1)]),e("i",{class:"iconfont icon-xiala",style:F(n(d))},null,4)]),p(T,{coinList:n(b).info,onEmitCoinItemClick:I,ref_key:"refSelectCoinPop",ref:u},null,8,["coinList"])]),e("p",oe,a(n(l).linkText),1),e("ul",te,[(g(!0),m(U,null,E(n(i).obj.chainList,(h,v)=>(g(),m("li",{onClick:ve=>C(h,v),class:H([n(r)==v?"active":"","v-cashout-coin-link-item"]),key:v},[e("span",null,a(h.chain),1)],10,ae))),128))])]),e("div",ce,[e("div",re,[e("div",le,[n(s).info.address?(g(),G(V,{key:0,ref_key:"refVueQr",ref:j,text:n(s).info.address,margin:n(k),size:130},null,8,["text","margin"])):P("",!0)]),e("div",de,a(n(l).saomaText),1)]),e("div",fe,[e("div",ue,a(n(s).info.address),1),e("div",{onClick:o[1]||(o[1]=h=>n(M)(n(s).info.address)),class:"v-recharge-bi-copy g-flex-justify-center"},_e)])])])]),p(D,{MidrPath:"/recharge/",idString:"c-recharge-coin-upload-1",onEmitUploadSuccess:R,ref_key:"refOssUpload",ref:B},null,512)]))}};export{ye as default};
