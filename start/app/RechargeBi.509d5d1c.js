import{s as P,v as R,c as q,D,u as F,e as l,E as f,o as v,a as m,b as e,t as a,h as t,a3 as N,d as y,K as E,M,i as Q,l as z,m as x,ad as G,p as H,aG as A,aH as K,V as J,Q as W,ab as X,_ as Y}from"./main.11e38532.js";import{_ as Z}from"./SelectCoinPop.c611979e.js";import{v as ee}from"./vue-qr.74729e57.js";import{_ as se}from"./OssUpload.295e6e27.js";import"./index.9de69f68.js";import"./aliyun-oss-sdk.16818466.js";const ne={class:"v_recharge_bi g-flex-column n-bg"},te={class:"new-head"},oe=e("img",{src:Y,alt:""},null,-1),ae=[oe],ie={class:"new-head_title_text"},ce={class:"v-recharge-bi-container"},re={class:"v-recharge-bi-top"},le={class:"v-recharge-bi-top-wangluo"},de={class:"v-recharge-coin-title"},ue={class:"v-recharge-bi-select-box"},he={class:"v-recharge-bi-select-left g-flex-align-center"},_e={class:"v-recharge-coin-title"},fe={class:"v-cashout-coin-link-list g-flex-align-center"},ve=["onClick"],ge={class:"v-recharge-bi-code-box"},me={class:"v-recharge-bi-qrcode-box g-flex-align-center g-flex-column"},be={class:"v-recharge-bi-qrcode g-flex-align-center g-flex-justify-center"},pe={class:"v-recharge-bi-qrcode-address-title"},ye={class:"v-recharge-bi-qrcode-address-box g-flex-align-center"},xe={class:"v-recharge-bi-qrcode-address-val"},ke=e("i",{class:"iconfont icon-ic_line_copy24px"},null,-1),je=[ke],Ce={class:"v-recharge-bi-bottom"},Se={class:"v-recharge-bi-nums"},Te={class:"v-recharge-bi-nums-title"},we={class:"v-recharge-bi-nums-input"},Ie=["placeholder"],Le={class:"v-recharge-bi-yuedengyu g-flex-align-center"},Be=e("span",null,"\u2248",-1),Fe={__name:"RechargeBi",setup(Ve){const k=P(),j=R.exports.useI18n(),c=q(()=>j.tm("rechargebi")),C=D(),S=F(),T=l(null);let w=l(7),u=f({transform:""}),h=l(!1),n=f({obj:{}}),b=f({info:[]}),s=f({id:C.params.id,info:{currency:"",address:"",chain:""},amount:"",img:"",money:""}),d=l(0);function I(i,o){d.value=o,s.info.address=n.obj.chainList[d.value].address,s.info.chain=n.obj.chainList[d.value].chain}async function L(){const{success:i,data:o}=await A({id:s.id});!i||(Object.assign(b,o.info),n.obj=o.info.info[0],s.info.address=n.obj.chainList[0].address,s.info.currency=n.obj.currency,s.info.chain=n.obj.chainList[0].chain)}L();const _=l(null);function B(){h.value=!h.value,h.value?(_.value.onShow(),u.transform="rotate(180deg)"):(u.transform="rotate(0deg)",_.value.onClose())}function V(i){_.value.onClose(),h.value=!1,u.transform="rotate(0deg)",n.obj=i,d.value=0,s.info.address=n.obj.chainList[0].address,s.info.currency=n.obj.currency,s.info.chain=n.obj.chainList[0].chain,p()}function p(){if(!s.amount)return s.money="";s.money=Math.formatFloat(Number(s.amount)*Number(n.obj.rate),n.obj.fixed).toFixed(n.obj.fixed)}async function O(){k.loadingShow=!0;const{success:i,data:o}=await K(s);!i||(J.success(o.msg),setTimeout(()=>{S.go(-1)},500))}const U=l(null);function $(i){s.img=i}return(i,o)=>(v(),m("div",ne,[e("div",te,[e("div",{onClick:o[0]||(o[0]=r=>i.$router.go(-1)),class:"new-head-back"},ae)]),e("div",ie,a(c.value.titleText),1),e("div",ce,[e("div",re,[e("div",le,[e("p",de,a(c.value.selectBiText),1),e("div",ue,[e("div",{class:"v-recharge-bi-select g-flex-align-center",onClick:B},[e("div",he,[e("span",null,a(t(n).obj.currency),1)]),e("i",{class:"iconfont icon-xiala",style:N(t(u))},null,4)]),y(Z,{coinList:t(b).info,onEmitCoinItemClick:V,ref_key:"refSelectCoinPop",ref:_},null,8,["coinList"])]),e("p",_e,a(c.value.linkText),1),e("ul",fe,[(v(!0),m(E,null,M(t(n).obj.chainList,(r,g)=>(v(),m("li",{onClick:Oe=>I(r,g),class:W([t(d)==g?"active":"","v-cashout-coin-link-item"]),key:g},[e("span",null,a(r.chain),1)],10,ve))),128))])]),e("div",ge,[e("div",me,[e("div",be,[t(s).info.address?(v(),Q(ee,{key:0,ref_key:"refVueQr",ref:T,text:t(s).info.address,margin:t(w),size:130},null,8,["text","margin"])):z("",!0)]),e("div",pe,a(c.value.saomaText),1)]),e("div",ye,[e("div",xe,a(t(s).info.address),1),e("div",{onClick:o[1]||(o[1]=r=>t(X)(t(s).info.address)),class:"v-recharge-bi-copy g-flex-justify-center"},je)])])]),e("div",Ce,[e("div",Se,[e("div",Te,[e("span",null,a(c.value.rechargeAmountText)+"(USDT):",1)]),e("div",we,[x(e("input",{onInput:p,type:"text","onUpdate:modelValue":o[2]||(o[2]=r=>t(s).amount=r),placeholder:c.value.cunkuanPlaceholderText},null,40,Ie),[[G,t(s).amount]])])]),x(e("div",Le,[Be,e("p",null,a(t(s).money),1),e("span",null,a(t(n).obj.currency),1)],512),[[H,t(n).obj.currency!="USDT"&&t(s).amount]]),e("div",{onClick:O,class:"v-recharge-bi-btn g-flex-align-center g-flex-justify-center"},[e("span",null,a(c.value.alreadyText),1)])])]),y(se,{MidrPath:"/recharge/",idString:"c-recharge-coin-upload-1",onEmitUploadSuccess:$,ref_key:"refOssUpload",ref:U},null,512)]))}};export{Fe as default};
