import{s as T,v as w,c as j,e as r,D as I,u as P,E as S,r as U,o as $,a as B,b as e,t as l,m as c,ad as K,h as o,d as v,p as u,at as R,aH as V,V as D,aI as _,_ as E}from"./main.2a81f6f4.js";import{_ as F}from"./OssUpload.313c65b2.js";import"./aliyun-oss-sdk.c3a84db7.js";const H={class:"v_recharge_kefu g-flex-column n-bg"},M={class:"new-head"},N=e("img",{src:E,alt:""},null,-1),z=[N],A={class:"new-head_title_text"},O={class:"v-recharge-kefu-container"},q={class:"v-recharge-kefu-pop-box"},G={class:"v-form-item"},J={class:"v-form-item-title"},L={class:"v-form-item-input"},Q=["placeholder"],W={class:"v-recharge-kefu-list"},X={class:"v-recharge-kefu-item-box"},Y={class:"g-flex-align-center g-flex-justify-between"},Z={class:"v-recharge-kefu-list-title"},ee={class:"v-recharge-kefu-upload-box"},se={class:"v-recharge-kefu-upload-title"},te={class:"v-recharge-kefu-upload g-flex-align-center g-flex-justify-center"},oe=["src"],ne=e("i",{class:"iconfont icon-shanchu2"},null,-1),ae=[ne],ie=e("i",{class:"iconfont icon-jiahao1"},null,-1),le={class:"v-recharge-kefu-item-box"},ce={class:"v-recharge-kefu-list-title"},_e={__name:"RechargeKefu",setup(re){const f=T(),g=w.exports.useI18n(),n=j(()=>g.tm("rechargeKefu"));r(!1);let m=r("");const h=I(),p=P();let a=S({id:h.params.id,amount:"",money:"",img:""});function k(t){R([t])}function x(t){console.log("url",t),a.img=t}const d=r(null);function y(){d.value.onUploadClick()}async function C(){f.loadingShow=!0;const{success:t,data:s}=await V(a);!t||(D.success(s.msg),setTimeout(()=>{p.go(-1)},500),console.log(s))}return(t,s)=>{const b=U("van-icon");return $(),B("div",H,[e("div",M,[e("div",{onClick:s[0]||(s[0]=i=>t.$router.go(-1)),class:"new-head-back"},z)]),e("div",A,l(n.value.titleText),1),e("div",O,[e("div",q,[e("div",G,[e("div",J,l(n.value.amountText),1),e("div",L,[c(e("input",{type:"text","onUpdate:modelValue":s[1]||(s[1]=i=>o(a).amount=i),onInput:s[2]||(s[2]=(...i)=>t.amountChange&&t.amountChange(...i)),placeholder:n.value.buyAmontPlaceholderText},null,40,Q),[[K,o(a).amount]])])]),e("div",W,[e("div",X,[e("div",Y,[e("p",Z,"1."+l(n.value.conCatKeFuText)+":",1),e("div",{class:"v-recharge-kefu-list-title-kefu g-flex-align-center",onClick:s[3]||(s[3]=(...i)=>o(_)&&o(_)(...i))},[v(b,{name:"service-o",size:"20"}),e("span",null,l(n.value.kefuText),1)])]),e("div",ee,[e("p",se,l(n.value.uploadText)+":",1),e("div",te,[c(e("img",{onClick:s[4]||(s[4]=i=>k(o(m))),src:o(a).img,alt:""},null,8,oe),[[u,o(a).img]]),c(e("div",{class:"v-real-name-delete g-flex-justify-center g-flex-align-center",onClick:s[5]||(s[5]=i=>o(a).img="")},ae,512),[[u,o(a).img]]),c(e("div",{onClick:y,class:"v-recharge-kefu-upload-tips g-flex-column g-flex-align-center g-flex-justify-center"},[ie,e("p",null,l(n.value.selectImgText),1)],512),[[u,!o(a).img]])])])]),e("div",le,[e("p",ce,"2."+l(n.value.secondText),1)])])]),e("div",{onClick:C,class:"v-recharge-kefu-pop-btn g-flex-align-center g-flex-justify-center"},[e("span",null,l(n.value.finishText),1)])]),v(F,{MidrPath:"/buycoin",idString:"c-recharge-coin-upload-1",ref_key:"refUpload",ref:d,onEmitUploadSuccess:x},null,512)])}}};export{_e as default};
