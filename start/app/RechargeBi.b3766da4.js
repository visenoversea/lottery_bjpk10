import{s as $,u as F,c as N,E as R,f as q,g as l,F as _,o as g,a as m,b as e,t as i,d as s,ac as Q,e as y,M as D,N as E,j as M,m as z,p as x,am as G,v as H,aP as A,aQ as Z,Q as J,Z as K,ak as W,I as X}from"./main.bd07921e.js";import{_ as Y}from"./SelectCoinPop.f42674c0.js";import{v as ee}from"./vue-qr.79bb1c36.js";import{_ as se}from"./OssUpload.eaea29bb.js";import"./aliyun-oss-sdk.42fcc8f2.js";const ne={class:"v_recharge_bi g-flex-column n-bg"},te={class:"new-head"},oe=e("img",{src:X,alt:""},null,-1),ie=[oe],ae={class:"new-head_title_text"},ce={class:"v-recharge-bi-container"},re={class:"v-recharge-bi-top"},le={class:"v-recharge-bi-top-wangluo"},de={class:"v-recharge-coin-title"},ue={class:"v-recharge-bi-select-box"},he={class:"v-recharge-bi-select-left g-flex-align-center"},fe={class:"v-recharge-coin-title"},_e={class:"v-cashout-coin-link-list g-flex-align-center"},ge=["onClick"],ve={class:"v-recharge-bi-code-box"},me={class:"v-recharge-bi-qrcode-box g-flex-align-center g-flex-column"},be={class:"v-recharge-bi-qrcode g-flex-align-center g-flex-justify-center"},pe={class:"v-recharge-bi-qrcode-address-title"},ye={class:"v-recharge-bi-qrcode-address-box g-flex-align-center"},xe={class:"v-recharge-bi-qrcode-address-val"},ke=e("i",{class:"iconfont icon-ic_line_copy24px"},null,-1),je=[ke],Ce={class:"v-recharge-bi-bottom"},Se={class:"v-recharge-bi-nums"},Te={class:"v-recharge-bi-nums-title"},we={class:"v-recharge-bi-nums-input"},Ie=["placeholder"],Le={class:"v-recharge-bi-yuedengyu g-flex-align-center"},Be=e("span",null,"\u2248",-1),Re={__name:"RechargeBi",setup(Oe){const k=$(),j=F(),c=N(()=>j.tm("rechargebi")),C=R(),S=q(),T=l(null);let w=l(7),u=_({transform:""}),h=l(!1),t=_({obj:{}}),b=_({info:[]}),n=_({id:C.params.id,info:{currency:"",address:"",chain:""},amount:"",img:"",money:""}),d=l(0);function I(a,o){d.value=o,n.info.address=t.obj.chainList[d.value].address,n.info.chain=t.obj.chainList[d.value].chain}async function L(){const{success:a,data:o}=await A({id:n.id});!a||(Object.assign(b,o.info),t.obj=o.info.info[0],n.info.address=t.obj.chainList[0].address,n.info.currency=t.obj.currency,n.info.chain=t.obj.chainList[0].chain)}L();const f=l(null);function B(){h.value=!h.value,h.value?(f.value.onShow(),u.transform="rotate(180deg)"):(u.transform="rotate(0deg)",f.value.onClose())}function O(a){f.value.onClose(),h.value=!1,u.transform="rotate(0deg)",t.obj=a,d.value=0,n.info.address=t.obj.chainList[0].address,n.info.currency=t.obj.currency,n.info.chain=t.obj.chainList[0].chain,p()}function p(){if(!n.amount)return n.money="";n.money=Math.formatFloat(Number(n.amount)*Number(t.obj.rate),t.obj.fixed).toFixed(t.obj.fixed)}async function P(){k.loadingShow=!0;const{success:a,data:o}=await Z(n);!a||(J.success(o.msg),setTimeout(()=>{S.go(-1)},500))}const U=l(null);function V(a){n.img=a}return(a,o)=>(g(),m("div",ne,[e("div",te,[e("div",{onClick:o[0]||(o[0]=r=>a.$router.go(-1)),class:"new-head-back"},ie)]),e("div",ae,i(s(c).titleText),1),e("div",ce,[e("div",re,[e("div",le,[e("p",de,i(s(c).selectBiText),1),e("div",ue,[e("div",{class:"v-recharge-bi-select g-flex-align-center",onClick:B},[e("div",he,[e("span",null,i(s(t).obj.currency),1)]),e("i",{class:"iconfont icon-xiala",style:Q(s(u))},null,4)]),y(Y,{coinList:s(b).info,onEmitCoinItemClick:O,ref_key:"refSelectCoinPop",ref:f},null,8,["coinList"])]),e("p",fe,i(s(c).linkText),1),e("ul",_e,[(g(!0),m(D,null,E(s(t).obj.chainList,(r,v)=>(g(),m("li",{onClick:Pe=>I(r,v),class:K([s(d)==v?"active":"","v-cashout-coin-link-item"]),key:v},[e("span",null,i(r.chain),1)],10,ge))),128))])]),e("div",ve,[e("div",me,[e("div",be,[s(n).info.address?(g(),M(ee,{key:0,ref_key:"refVueQr",ref:T,text:s(n).info.address,margin:s(w),size:130},null,8,["text","margin"])):z("",!0)]),e("div",pe,i(s(c).saomaText),1)]),e("div",ye,[e("div",xe,i(s(n).info.address),1),e("div",{onClick:o[1]||(o[1]=r=>s(W)(s(n).info.address)),class:"v-recharge-bi-copy g-flex-justify-center"},je)])])]),e("div",Ce,[e("div",Se,[e("div",Te,[e("span",null,i(s(c).rechargeAmountText)+"(USDT):",1)]),e("div",we,[x(e("input",{onInput:p,type:"text","onUpdate:modelValue":o[2]||(o[2]=r=>s(n).amount=r),placeholder:s(c).cunkuanPlaceholderText},null,40,Ie),[[G,s(n).amount]])])]),x(e("div",Le,[Be,e("p",null,i(s(n).money),1),e("span",null,i(s(t).obj.currency),1)],512),[[H,s(t).obj.currency!="USDT"&&s(n).amount]]),e("div",{onClick:P,class:"v-recharge-bi-btn g-flex-align-center g-flex-justify-center"},[e("span",null,i(s(c).alreadyText),1)])])]),y(se,{MidrPath:"/recharge/",idString:"c-recharge-coin-upload-1",onEmitUploadSuccess:V,ref_key:"refOssUpload",ref:U},null,512)]))}};export{Re as default};
