import{s as V,v as $,c as q,D as B,u as N,e as c,E as h,o as v,a as m,b as e,t as a,h as i,a9 as E,d as p,J as U,K as z,i as F,l as x,aM as M,W as P,ah as Q,S as D}from"./main.103642d2.js";import{_ as G}from"./SelectCoinPop.5b8f39ec.js";import{v as H}from"./vue-qr.9496edb1.js";import{_ as J}from"./OssUpload.ca54e569.js";import"./aliyun-oss-sdk.524fe523.js";const K={class:"v_recharge_bi g-flex-column n-bg"},W={class:"new-head"},A=e("img",{src:D,alt:""},null,-1),X=[A],Y={class:"new-head_title_text"},Z={class:"v-recharge-bi-container"},ee={class:"v-recharge-bi-top"},se={class:"v-recharge-bi-top-wangluo"},oe={class:"v-recharge-coin-title"},ie={class:"v-recharge-bi-select-box"},ne={class:"v-recharge-bi-select-left g-flex-align-center"},te={class:"v-recharge-coin-title"},ae={class:"v-cashout-coin-link-list g-flex-align-center"},ce=["onClick"],re={class:"v-recharge-bi-code-box"},le={class:"v-recharge-bi-qrcode-box g-flex-align-center g-flex-column"},de={class:"v-recharge-bi-qrcode g-flex-align-center g-flex-justify-center"},ue={class:"v-recharge-bi-qrcode-address-title"},fe={class:"v-recharge-bi-qrcode-address-box g-flex-align-center"},_e={class:"v-recharge-bi-qrcode-address-val"},he=e("i",{class:"iconfont icon-ic_line_copy24px"},null,-1),ve=[he],je={__name:"RechargeThird",setup(ge){V();const y=$.exports.useI18n(),l=q(()=>y.tm("rechargebi")),k=B();N();const j=c(null);let C=c(7),d=h({transform:""}),u=c(!1),o=h({obj:{}}),b=h({info:[]}),s=h({id:k.params.id,info:{currency:"",address:"",chain:""},amount:"",img:"",money:""}),r=c(0);function L(t,n){r.value=n,s.info.address=o.obj.chainList[r.value].address,s.info.chain=o.obj.chainList[r.value].chain}async function S(){const{success:t,data:n}=await M({id:s.id});!t||(Object.assign(b,n.info),o.obj=n.info.info[0],s.info.address=o.obj.chainList[0].address,s.info.currency=o.obj.currency,s.info.chain=o.obj.chainList[0].chain)}S();const f=c(null);function I(){u.value=!u.value,u.value?(f.value.onShow(),d.transform="rotate(180deg)"):(d.transform="rotate(0deg)",f.value.onClose())}function w(t){f.value.onClose(),u.value=!1,d.transform="rotate(0deg)",o.obj=t,r.value=0,s.info.address=o.obj.chainList[0].address,s.info.currency=o.obj.currency,s.info.chain=o.obj.chainList[0].chain,O()}function O(){if(!s.amount)return s.money="";s.money=Math.formatFloat(Number(s.amount)*Number(o.obj.rate),o.obj.fixed).toFixed(o.obj.fixed)}const R=c(null);function T(t){s.img=t}return(t,n)=>(v(),m("div",K,[e("div",W,[e("div",{onClick:n[0]||(n[0]=_=>t.$router.go(-1)),class:"new-head-back"},X)]),e("div",Y,a(l.value.titleText),1),e("div",Z,[e("div",ee,[e("div",se,[e("p",oe,a(l.value.selectBiText),1),e("div",ie,[e("div",{class:"v-recharge-bi-select g-flex-align-center",onClick:I},[e("div",ne,[e("span",null,a(i(o).obj.currency),1)]),e("i",{class:"iconfont icon-xiala",style:E(i(d))},null,4)]),p(G,{coinList:i(b).info,onEmitCoinItemClick:w,ref_key:"refSelectCoinPop",ref:f},null,8,["coinList"])]),e("p",te,a(l.value.linkText),1),e("ul",ae,[(v(!0),m(U,null,z(i(o).obj.chainList,(_,g)=>(v(),m("li",{onClick:me=>L(_,g),class:P([i(r)==g?"active":"","v-cashout-coin-link-item"]),key:g},[e("span",null,a(_.chain),1)],10,ce))),128))])]),e("div",re,[e("div",le,[e("div",de,[i(s).info.address?(v(),F(H,{key:0,ref_key:"refVueQr",ref:j,text:i(s).info.address,margin:i(C),size:130},null,8,["text","margin"])):x("",!0)]),e("div",ue,a(l.value.saomaText),1)]),e("div",fe,[e("div",_e,a(i(s).info.address),1),e("div",{onClick:n[1]||(n[1]=_=>i(Q)(i(s).info.address)),class:"v-recharge-bi-copy g-flex-justify-center"},ve)])])]),x("",!0)]),p(J,{MidrPath:"/recharge/",idString:"c-recharge-coin-upload-1",onEmitUploadSuccess:T,ref_key:"refOssUpload",ref:R},null,512)]))}};export{je as default};