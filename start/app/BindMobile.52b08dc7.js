import{f as H,B as N,s as O,u as $,c as h,C as w,g as c,a4 as A,o as L,a as D,b as e,t as a,d as t,p as r,v as I,a5 as _,e as E,a1 as R,W as z,a6 as S,S as p,a7 as W}from"./main.0795c4c3.js";const q={class:"v_bind_mobile"},F={class:"v-head g-flex-justify-center g-flex-align-center"},J=e("i",{class:"iconfont icon-zuojiantou"},null,-1),K=[J],Q={class:"v-title g-flex-align-center g-flex-justify-center"},X={class:"v-bind-mobile-container"},Y={class:"v-form"},Z={class:"v-form-item-box"},ee={class:"v-form-item-box-title"},te={class:"v-form-item g-flex-align-center"},oe={class:"v-form-item-left-text"},se=e("i",{class:"iconfont icon-right-1-copy"},null,-1),ie={class:"v-form-item-middle-input"},le=["placeholder"],ne={class:"v-form-item-box"},ae={class:"v-form-item-box-title"},de={class:"v-form-item g-flex-align-center"},ce={class:"v-form-item-middle-input"},re=["placeholder"],me={class:"v-form-item-middle-right-text"},ue={class:"v-form-item-box"},ve={class:"v-form-item-box-title"},_e={class:"v-form-item g-flex-align-center"},fe={class:"v-form-item-left-text"},he=e("i",{class:"iconfont icon-right-1-copy"},null,-1),pe={class:"v-form-item-middle-input"},ge=["placeholder"],xe={class:"v-form-item-box"},be={class:"v-form-item-box-title"},Ce={class:"v-form-item g-flex-align-center"},ye={class:"v-form-item-middle-input"},Te=["placeholder"],ke={class:"v-form-item-middle-right-text"},Se={__name:"BindMobile",setup(we){let B=H();N();const m=O(),g=$(),n=h(()=>g.tm("bindMobile")),f=h(()=>g.tm("gongyong"));let i=w({area_code:"",mobile:"",code:"",oldCode:""}),x=w({list:[]}),b=c(f.value.sendCodeText),C=c(f.value.againSendCodeText),y=c(f.value.sendCodeText),u=c(0),v=c(0);const T=c(null);M();async function M(){const{success:l,data:o}=await A();!l||(x.list=o.list,i.area_code=o.list[0].area_code)}let d=h(()=>m.userInfo);async function P(){const{success:l,data:o}=await z();!l||(m.setUserInfo(o.info),console.log(o))}P();function k(){T.value.onShow()}function U(l){i.area_code=l.area_code}async function j(){if(v.value)return;m.loadingShow=!0;const{success:l,data:o}=await S({area_code:d.value.area_code,mobile:d.value.mobile});if(!l)return;let s=60;p(o.msg),v.value=setInterval(()=>{s--,b.value=s===0?C.value:s+"s",s===0&&(clearInterval(v.value),v.value=0)},1e3)}async function V(){if(u.value)return;m.loadingShow=!0;const{success:l,data:o}=await S({area_code:i.area_code,mobile:i.mobile});if(!l)return;let s=60;p(o.msg),u.value=setInterval(()=>{s--,y.value=s===0?C.value:s+"s",s===0&&(clearInterval(u.value),u.value=0)},1e3)}async function G(){m.loadingShow=!0,console.log(i);const{success:l,data:o}=await W(i);!l||(p.success(o.msg),setTimeout(()=>{B.back(-1)},500))}return(l,o)=>(L(),D("div",q,[e("div",F,[e("div",{onClick:o[0]||(o[0]=s=>l.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},K),e("span",Q,a(t(n).titleText),1)]),e("div",X,[e("div",Y,[r(e("div",Z,[e("div",ee,[e("span",null,a(t(n).oldMobileText),1)]),e("div",te,[e("div",{onClick:k,class:"v-form-item-left g-flex-align-center"},[e("span",oe,"+"+a(t(d).area_code),1),se]),e("div",ie,[r(e("input",{type:"text",readonly:"","onUpdate:modelValue":o[1]||(o[1]=s=>t(d).mobile=s),placeholder:t(n).mobilePlaceholderText},null,8,le),[[_,t(d).mobile]])])])],512),[[I,t(d).mobile]]),r(e("div",ne,[e("div",ae,[e("span",null,a(t(n).codeText),1)]),e("div",de,[e("div",ce,[r(e("input",{type:"text","onUpdate:modelValue":o[2]||(o[2]=s=>t(i).oldCode=s),label:"","label-width":"0",placeholder:t(n).codePlaceholderText},null,8,re),[[_,t(i).oldCode]])]),e("div",{onClick:j,class:"v-form-item-middle-right g-flex-align-center"},[e("span",me,a(t(b)),1)])])],512),[[I,t(d).mobile]]),e("div",ue,[e("div",ve,[e("span",null,a(t(n).mobileText),1)]),e("div",_e,[e("div",{onClick:k,class:"v-form-item-left g-flex-align-center"},[e("span",fe,"+"+a(t(i).area_code),1),he]),e("div",pe,[r(e("input",{type:"text","onUpdate:modelValue":o[3]||(o[3]=s=>t(i).mobile=s),placeholder:t(n).mobilePlaceholderText},null,8,ge),[[_,t(i).mobile]])])])]),e("div",xe,[e("div",be,[e("span",null,a(t(n).codeText),1)]),e("div",Ce,[e("div",ye,[r(e("input",{type:"text","onUpdate:modelValue":o[4]||(o[4]=s=>t(i).code=s),label:"","label-width":"0",placeholder:t(n).codePlaceholderText},null,8,Te),[[_,t(i).code]])]),e("div",{onClick:V,class:"v-form-item-middle-right g-flex-align-center"},[e("span",ke,a(t(y)),1)])])])]),e("div",{onClick:G,class:"v-submit-btn g-flex-align-center g-flex-justify-center"},a(t(n).submitBtnText),1)]),E(R,{list:t(x).list,onEmitPhoneItemClick:U,ref_key:"refBindPhonesPop",ref:T},null,8,["list"])]))}};export{Se as default};
