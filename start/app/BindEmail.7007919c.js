import{f as B,B as U,s as j,u as V,c as p,g as d,C as H,o as P,a as G,b as e,t as n,d as t,p as c,v as C,a5 as _,W as N,a8 as y,S as x,a9 as O}from"./main.0795c4c3.js";const $={class:"v_bind_email"},D={class:"v-head g-flex-justify-center g-flex-align-center"},R=e("i",{class:"iconfont icon-zuojiantou"},null,-1),z=[R],M={class:"v-title g-flex-align-center g-flex-justify-center"},W={class:"v-bind-email-container"},q={class:"v-form"},A={class:"v-form-item-box"},F={class:"v-form-item-box-title"},J={class:"v-form-item g-flex-align-center"},K={class:"v-form-item-middle-input"},L=["placeholder"],Q={class:"v-form-item-box"},X={class:"v-form-item-box-title"},Y={class:"v-form-item g-flex-align-center"},Z={class:"v-form-item-middle-input"},ee=["placeholder"],te={class:"v-form-item-middle-right-text"},se={class:"v-form-item-box"},ie={class:"v-form-item-box-title"},le={class:"v-form-item g-flex-align-center"},oe={class:"v-form-item-middle-input"},ae=["placeholder"],ne={class:"v-form-item-box"},de={class:"v-form-item-box-title"},ce={class:"v-form-item g-flex-align-center"},re={class:"v-form-item-middle-input"},me=["placeholder"],ue={class:"v-form-item-middle-right-text"},fe={__name:"BindEmail",setup(ve){let E=B();U();const r=j(),g=V(),l=p(()=>g.tm("bindEmail")),f=p(()=>g.tm("gongyong"));d("");let a=H({email:"",code:"",oldCode:""}),h=d(f.value.sendCodeText),T=d(f.value.sendCodeText),b=d(f.value.againSendCodeText),u=d(0),v=d(0),m=p(()=>r.userInfo);async function w(){const{success:o,data:s}=await N();!o||(r.setUserInfo(s.info),console.log(s))}w();async function S(){if(u.value)return;r.loadingShow=!0;const{success:o,data:s}=await y({email:m.value.email});if(!o)return;let i=60;x(s.msg),u.value=setInterval(()=>{i--,h.value=i==0?b.value:i+"s",i===0&&(clearInterval(u.value),u.value=0)},1e3)}async function I(){if(v.value)return;r.loadingShow=!0;const{success:o,data:s}=await y({email:a.email});if(!o)return;let i=60;x(s.msg),v.value=setInterval(()=>{i--,T.value=i==0?b.value:i+"s",i===0&&(clearInterval(v.value),v.value=0)},1e3)}async function k(){r.loadingShow=!0;const{success:o,data:s}=await O(a);!o||(x.success(s.msg),setTimeout(()=>{E.back(-1)},500))}return(o,s)=>(P(),G("div",$,[e("div",D,[e("div",{onClick:s[0]||(s[0]=i=>o.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},z),e("span",M,n(t(l).titleText),1)]),e("div",W,[e("div",q,[c(e("div",A,[e("div",F,[e("span",null,n(t(l).oldEmailText),1)]),e("div",J,[e("div",K,[c(e("input",{type:"text",readonly:"","onUpdate:modelValue":s[1]||(s[1]=i=>t(m).email=i),placeholder:t(l).newEmailPlaceholderText},null,8,L),[[_,t(m).email]])])])],512),[[C,t(m).email]]),c(e("div",Q,[e("div",X,[e("span",null,n(t(l).codeText),1)]),e("div",Y,[e("div",Z,[c(e("input",{type:"text","onUpdate:modelValue":s[2]||(s[2]=i=>t(a).oldCode=i),placeholder:t(l).codePlaceholderText},null,8,ee),[[_,t(a).oldCode]])]),e("div",{onClick:S,class:"v-form-item-middle-right g-flex-align-center"},[e("span",te,n(t(h)),1)])])],512),[[C,t(m).email]]),e("div",se,[e("div",ie,[e("span",null,n(t(l).newEmailText),1)]),e("div",le,[e("div",oe,[c(e("input",{type:"text","onUpdate:modelValue":s[3]||(s[3]=i=>t(a).email=i),placeholder:t(l).newEmailPlaceholderText},null,8,ae),[[_,t(a).email]])])])]),e("div",ne,[e("div",de,[e("span",null,n(t(l).codeText),1)]),e("div",ce,[e("div",re,[c(e("input",{type:"text","onUpdate:modelValue":s[4]||(s[4]=i=>t(a).code=i),placeholder:t(l).codePlaceholderText},null,8,me),[[_,t(a).code]])]),e("div",{onClick:I,class:"v-form-item-middle-right g-flex-align-center"},[e("span",ue,n(t(T)),1)])])])]),e("div",{onClick:k,class:"v-submit-btn g-flex-align-center g-flex-justify-center"},n(t(l).submitText),1)])]))}};export{fe as default};