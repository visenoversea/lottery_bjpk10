import{s as w,u as S,c as B,g as c,B as P,f as U,C as V,r as g,o as $,a as K,b as e,t as l,d as s,ag as R,e as r,p as u,v as d,Y as F,ae as I,S as N,ah as _}from"./main.55c4f9af.js";import{_ as z}from"./OssUpload.293d9a97.js";const D={class:"v_recharge_kefu g-flex-column"},E={class:"v-head g-flex-justify-center g-flex-align-center"},A=e("i",{class:"iconfont icon-zuojiantou"},null,-1),H=[A],M={class:"v-title g-flex-align-center g-flex-justify-center"},O={class:"v-recharge-kefu-container"},Y={class:"v-recharge-kefu-pop-box"},q={class:"v-recharge-kefu-buy-coin g-flex-align-center"},G={class:"v-recharge-kefu-list"},J={class:"v-recharge-kefu-item-box"},L={class:"g-flex-align-center g-flex-justify-between"},Q={class:"v-recharge-kefu-list-title"},W={class:"v-recharge-kefu-upload-box"},X={class:"v-recharge-kefu-upload-title"},Z={class:"v-recharge-kefu-upload g-flex-align-center g-flex-justify-center"},ee=["src"],se=e("i",{class:"iconfont icon-shanchu2"},null,-1),te=[se],ne=e("i",{class:"iconfont icon-jiahao1"},null,-1),oe={class:"v-recharge-kefu-item-box"},ae={class:"v-recharge-kefu-list-title"},re={__name:"RechargeKefu",setup(le){const v=w(),h=S(),n=B(()=>h.tm("rechargeKefu"));c(!1);let m=c("");const p=P(),x=U();let o=V({id:p.params.id,amount:"",money:"",img:""});function k(a){F([a])}function y(a){console.log("url",a),o.img=a}const f=c(null);function b(){f.value.onUploadClick()}async function C(){v.loadingShow=!0;const{success:a,data:t}=await I(o);!a||(N.success(t.msg),setTimeout(()=>{x.go(-1)},500),console.log(t))}return(a,t)=>{const T=g("van-field"),j=g("van-icon");return $(),K("div",D,[e("div",E,[e("div",{onClick:t[0]||(t[0]=i=>a.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},H),e("span",M,l(s(n).titleText),1)]),e("div",O,[e("div",Y,[e("p",q,[e("span",null,l(s(n).amountText)+"\uFF1A",1),R(),r(T,{type:"number",modelValue:s(o).amount,"onUpdate:modelValue":t[1]||(t[1]=i=>s(o).amount=i),label:"","label-width":"0",placeholder:s(n).buyAmontPlaceholderText},null,8,["modelValue","placeholder"])]),e("div",G,[e("div",J,[e("div",L,[e("p",Q,"1."+l(s(n).conCatKeFuText)+":",1),e("div",{class:"v-recharge-kefu-list-title-kefu g-flex-align-center",onClick:t[2]||(t[2]=(...i)=>s(_)&&s(_)(...i))},[r(j,{name:"service-o",size:"20"}),e("span",null,l(s(n).kefuText),1)])]),e("div",W,[e("p",X,l(s(n).uploadText)+":",1),e("div",Z,[u(e("img",{onClick:t[3]||(t[3]=i=>k(s(m))),src:s(o).img,alt:""},null,8,ee),[[d,s(o).img]]),u(e("div",{class:"v-real-name-delete g-flex-justify-center g-flex-align-center",onClick:t[4]||(t[4]=i=>s(o).img="")},te,512),[[d,s(o).img]]),u(e("div",{onClick:b,class:"v-recharge-kefu-upload-tips g-flex-column g-flex-align-center g-flex-justify-center"},[ne,e("p",null,l(s(n).selectImgText),1)],512),[[d,!s(o).img]])])])]),e("div",oe,[e("p",ae,"2."+l(s(n).secondText),1)])])]),e("div",{onClick:C,class:"v-recharge-kefu-pop-btn g-flex-align-center g-flex-justify-center"},[e("span",null,l(s(n).finishText),1)])]),r(z,{MidrPath:"/buycoin",idString:"c-recharge-coin-upload-1",ref_key:"refUpload",ref:f,onEmitUploadSuccess:y},null,512)])}}};export{re as default};