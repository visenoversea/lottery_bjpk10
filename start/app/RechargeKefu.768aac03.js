import{s as T,u as w,c as j,g as r,E as B,f as P,F as S,r as U,o as $,a as I,b as e,t as l,d as s,p as c,am as R,e as f,v as u,aB as F,aQ as K,Q as E,aR as g,I as V}from"./main.b40c5a5a.js";import{_ as D}from"./OssUpload.f144b005.js";import"./aliyun-oss-sdk.2b29a86d.js";const M={class:"v_recharge_kefu g-flex-column n-bg"},N={class:"new-head"},Q=e("img",{src:V,alt:""},null,-1),z=[Q],A={class:"new-head_title_text"},H={class:"v-recharge-kefu-container"},O={class:"v-recharge-kefu-pop-box"},q={class:"v-form-item"},G={class:"v-form-item-title"},J={class:"v-form-item-input"},L=["placeholder"],W={class:"v-recharge-kefu-list"},X={class:"v-recharge-kefu-item-box"},Y={class:"g-flex-align-center g-flex-justify-between"},Z={class:"v-recharge-kefu-list-title"},ee={class:"v-recharge-kefu-upload-box"},se={class:"v-recharge-kefu-upload-title"},te={class:"v-recharge-kefu-upload g-flex-align-center g-flex-justify-center"},oe=["src"],ne=e("i",{class:"iconfont icon-shanchu2"},null,-1),ie=[ne],ae=e("i",{class:"iconfont icon-jiahao1"},null,-1),le={class:"v-recharge-kefu-item-box"},ce={class:"v-recharge-kefu-list-title"},ge={__name:"RechargeKefu",setup(re){const _=T(),m=w(),n=j(()=>m.tm("rechargeKefu"));r(!1);let v=r("");const h=B(),p=P();let i=S({id:h.params.id,amount:"",money:"",img:""});function k(o){F([o])}function x(o){console.log("url",o),i.img=o}const d=r(null);function y(){d.value.onUploadClick()}async function C(){_.loadingShow=!0;const{success:o,data:t}=await K(i);!o||(E.success(t.msg),setTimeout(()=>{p.go(-1)},500),console.log(t))}return(o,t)=>{const b=U("van-icon");return $(),I("div",M,[e("div",N,[e("div",{onClick:t[0]||(t[0]=a=>o.$router.go(-1)),class:"new-head-back"},z)]),e("div",A,l(s(n).titleText),1),e("div",H,[e("div",O,[e("div",q,[e("div",G,l(s(n).amountText),1),e("div",J,[c(e("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=a=>s(i).amount=a),onInput:t[2]||(t[2]=(...a)=>o.amountChange&&o.amountChange(...a)),placeholder:s(n).buyAmontPlaceholderText},null,40,L),[[R,s(i).amount]])])]),e("div",W,[e("div",X,[e("div",Y,[e("p",Z,"1."+l(s(n).conCatKeFuText)+":",1),e("div",{class:"v-recharge-kefu-list-title-kefu g-flex-align-center",onClick:t[3]||(t[3]=(...a)=>s(g)&&s(g)(...a))},[f(b,{name:"service-o",size:"20"}),e("span",null,l(s(n).kefuText),1)])]),e("div",ee,[e("p",se,l(s(n).uploadText)+":",1),e("div",te,[c(e("img",{onClick:t[4]||(t[4]=a=>k(s(v))),src:s(i).img,alt:""},null,8,oe),[[u,s(i).img]]),c(e("div",{class:"v-real-name-delete g-flex-justify-center g-flex-align-center",onClick:t[5]||(t[5]=a=>s(i).img="")},ie,512),[[u,s(i).img]]),c(e("div",{onClick:y,class:"v-recharge-kefu-upload-tips g-flex-column g-flex-align-center g-flex-justify-center"},[ae,e("p",null,l(s(n).selectImgText),1)],512),[[u,!s(i).img]])])])]),e("div",le,[e("p",ce,"2."+l(s(n).secondText),1)])])]),e("div",{onClick:C,class:"v-recharge-kefu-pop-btn g-flex-align-center g-flex-justify-center"},[e("span",null,l(s(n).finishText),1)])]),f(D,{MidrPath:"/buycoin",idString:"c-recharge-coin-upload-1",ref_key:"refUpload",ref:d,onEmitUploadSuccess:x},null,512)])}}};export{ge as default};
