import{s as C,v as w,c as $,e as d,E as h,D as z,u as B,o as g,a as u,b as e,t as s,m as _,ag as N,h as n,p as S,l as m,d as R,aJ as U,aK as I,U as F,ae as r,_ as P}from"./main.22b1808f.js";import{_ as V}from"./OssUpload.1c39879a.js";import"./aliyun-oss-sdk.832ff661.js";const D={class:"v_recharge_bank g-flex-column n-bg"},E={class:"new-head"},M=e("img",{src:P,alt:""},null,-1),G=[M],H={class:"new-head_title_text"},O={class:"v-recharge-bank-container"},A={class:"v-recharge-bank-pop-box"},J={class:"v-form-item"},K={class:"v-form-item-title"},q={class:"v-form-item-input"},L=["placeholder"],Q={class:"v-recharge-bank-list"},W={class:"v-recharge-bank-item-box"},X={class:"g-flex-align-center g-flex-justify-between"},Y={class:"v-recharge-bank-list-title"},Z={class:"v-recharge-bank-item g-flex-align-center"},ee={class:"v-recharge-bank-item-title"},ne={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},te={class:"v-recharge-bank-item-right-money"},se={class:"v-recharge-bank-item g-flex-align-center"},ie={class:"v-recharge-bank-item-title"},ae={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},oe={class:"v-recharge-bank-item g-flex-align-center"},ce={class:"v-recharge-bank-item-title"},le={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},re={class:"v-recharge-bank-item g-flex-align-center"},de={class:"v-recharge-bank-item-title"},ge={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},ue={key:0,class:"v-recharge-bank-item g-flex-align-center"},fe={class:"v-recharge-bank-item-title"},he={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},_e={key:1,class:"v-recharge-bank-item g-flex-align-center"},me={class:"v-recharge-bank-item-title"},ve={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},be={class:"v-recharge-bank-item-box"},ke={class:"v-recharge-bank-list-title"},je={__name:"RechargeBank",setup(pe){const f=C(),v=w.exports.useI18n(),a=$(()=>v.tm("rechargebank"));d(!1),d("");let i=h({info:{bank_code:"",bank_name:"",branch:"",card_number:"",currency:"",fixed:"",name:"",rate:"",symbol:""}});const b=z(),k=B();let o=h({id:b.params.id,amount:"",money:"",img:""});async function p(){f.loadingShow=!0;const{success:c,data:t}=await U({id:o.id});!c||(Object.assign(i,t.info),console.log(t))}p();function x(){if(!o.amount)return o.money="";o.money=Math.formatFloat(Number(o.amount)*Number(i.info.rate),Number(i.info.fixed)).toFixed(i.info.fixed)}function y(c){console.log("url",c),o.img=c}const T=d(null);async function j(){f.loadingShow=!0;const{success:c,data:t}=await I(o);!c||(F.success(t.msg),setTimeout(()=>{k.go(-1)},500),console.log(t))}return(c,t)=>(g(),u("div",D,[e("div",E,[e("div",{onClick:t[0]||(t[0]=l=>c.$router.go(-1)),class:"new-head-back"},G)]),e("div",H,s(a.value.titleText),1),e("div",O,[e("div",A,[e("div",J,[e("div",K,s(a.value.tipsText),1),e("div",q,[_(e("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=l=>n(o).amount=l),onInput:x,placeholder:a.value.buyAmontPlaceholderText},null,40,L),[[N,n(o).amount]])])]),e("div",Q,[e("div",W,[e("div",X,[e("p",Y,"1."+s(a.value.infoTitleText)+":",1)]),_(e("div",Z,[e("p",ee,s(a.value.moneyText)+":",1),e("div",ne,[e("p",te," \u2248 "+s(n(i).info.symbol)+" "+s(n(o).money),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[2]||(t[2]=l=>n(r)(n(o).money))})])],512),[[S,n(o).amount]]),e("div",se,[e("p",ie,s(a.value.nameText)+":",1),e("div",ae,[e("p",null,s(n(i).info.name),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[3]||(t[3]=l=>n(r)(n(i).info.name))})])]),e("div",oe,[e("p",ce,s(a.value.cardText)+":",1),e("div",le,[e("p",null,s(n(i).info.card_number),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[4]||(t[4]=l=>n(r)(n(i).info.card_number))})])]),e("div",re,[e("p",de,s(a.value.bankNameText)+":",1),e("div",ge,[e("p",null,s(n(i).info.bank_name),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[5]||(t[5]=l=>n(r)(n(i).info.bank_name))})])]),n(i).info.branch?(g(),u("div",ue,[e("p",fe,s(a.value.khzhText),1),e("div",he,[e("p",null,s(n(i).info.branch),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[6]||(t[6]=l=>n(r)(n(i).info.branch))})])])):m("",!0),n(i).info.bank_code?(g(),u("div",_e,[e("p",me,s(a.value.yhdm)+":",1),e("div",ve,[e("p",null,s(n(i).info.bank_code),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[7]||(t[7]=l=>n(r)(n(i).info.bank_code))})])])):m("",!0)]),e("div",be,[e("p",ke,"2."+s(a.value.secondText),1)])])]),e("div",{onClick:j,class:"v-recharge-bank-pop-btn g-flex-align-center g-flex-justify-center"},[e("span",null,s(a.value.finishText),1)])]),R(V,{MidrPath:"/buycoin",idString:"c-recharge-coin-upload-1",ref_key:"refUpload",ref:T,onEmitUploadSuccess:y},null,512)]))}};export{je as default};
