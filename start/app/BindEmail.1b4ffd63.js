import{f as B,E as U,s as V,u as H,c as p,g as d,F as O,o as P,a as G,b as e,t as n,d as t,p as c,v as C,am as _,W as N,ar as w,Q as h,aO as $,I as j}from"./main.528575c5.js";const D={class:"v_bind_email n-bg"},R={class:"new-head"},F=e("img",{src:j,alt:""},null,-1),M=[F],Q={class:"new-head_title_text"},W={class:"v-bind-email-container"},q={class:"v-form"},z={class:"v-form-item-box"},A={class:"v-form-item-box-title"},J={class:"v-form-item g-flex-align-center"},K={class:"v-form-item-middle-input"},L=["placeholder"],X={class:"v-form-item-box"},Y={class:"v-form-item-box-title"},Z={class:"v-form-item g-flex-align-center"},ee={class:"v-form-item-middle-input"},te=["placeholder"],se={class:"v-form-item-middle-right-text"},ie={class:"v-form-item-box"},le={class:"v-form-item-box-title"},oe={class:"v-form-item g-flex-align-center"},ae={class:"v-form-item-middle-input"},ne=["placeholder"],de={class:"v-form-item-box"},ce={class:"v-form-item-box-title"},re={class:"v-form-item g-flex-align-center"},me={class:"v-form-item-middle-input"},ue=["placeholder"],ve={class:"v-form-item-middle-right-text"},pe={__name:"BindEmail",setup(_e){let y=B();U();const r=V(),x=H(),l=p(()=>x.tm("bindEmail")),f=p(()=>x.tm("gongyong"));d("");let a=O({email:"",code:"",oldCode:""}),g=d(f.value.sendCodeText),b=d(f.value.sendCodeText),T=d(f.value.againSendCodeText),u=d(0),v=d(0),m=p(()=>r.userInfo);async function E(){const{success:o,data:s}=await N();!o||(r.setUserInfo(s.info),console.log(s))}E();async function I(){if(u.value)return;r.loadingShow=!0;const{success:o,data:s}=await w({email:m.value.email});if(!o)return;let i=60;h(s.msg),u.value=setInterval(()=>{i--,g.value=i==0?T.value:i+"s",i===0&&(clearInterval(u.value),u.value=0)},1e3)}async function S(){if(v.value)return;r.loadingShow=!0;const{success:o,data:s}=await w({email:a.email});if(!o)return;let i=60;h(s.msg),v.value=setInterval(()=>{i--,b.value=i==0?T.value:i+"s",i===0&&(clearInterval(v.value),v.value=0)},1e3)}async function k(){r.loadingShow=!0;const{success:o,data:s}=await $(a);!o||(h.success(s.msg),setTimeout(()=>{y.back(-1)},500))}return(o,s)=>(P(),G("div",D,[e("div",R,[e("div",{onClick:s[0]||(s[0]=i=>o.$router.go(-1)),class:"new-head-back"},M)]),e("div",Q,n(t(l).titleText),1),e("div",W,[e("div",q,[c(e("div",z,[e("div",A,[e("span",null,n(t(l).oldEmailText),1)]),e("div",J,[e("div",K,[c(e("input",{type:"text",readonly:"","onUpdate:modelValue":s[1]||(s[1]=i=>t(m).email=i),placeholder:t(l).newEmailPlaceholderText},null,8,L),[[_,t(m).email]])])])],512),[[C,t(m).email]]),c(e("div",X,[e("div",Y,[e("span",null,n(t(l).codeText),1)]),e("div",Z,[e("div",ee,[c(e("input",{type:"text","onUpdate:modelValue":s[2]||(s[2]=i=>t(a).oldCode=i),placeholder:t(l).codePlaceholderText},null,8,te),[[_,t(a).oldCode]])]),e("div",{onClick:I,class:"v-form-item-middle-right g-flex-align-center"},[e("span",se,n(t(g)),1)])])],512),[[C,t(m).email]]),e("div",ie,[e("div",le,[e("span",null,n(t(l).newEmailText),1)]),e("div",oe,[e("div",ae,[c(e("input",{type:"text","onUpdate:modelValue":s[3]||(s[3]=i=>t(a).email=i),placeholder:t(l).newEmailPlaceholderText},null,8,ne),[[_,t(a).email]])])])]),e("div",de,[e("div",ce,[e("span",null,n(t(l).codeText),1)]),e("div",re,[e("div",me,[c(e("input",{type:"text","onUpdate:modelValue":s[4]||(s[4]=i=>t(a).code=i),placeholder:t(l).codePlaceholderText},null,8,ue),[[_,t(a).code]])]),e("div",{onClick:S,class:"v-form-item-middle-right g-flex-align-center"},[e("span",ve,n(t(b)),1)])])])]),e("div",{onClick:k,class:"v-submit-btn g-flex-align-center g-flex-justify-center"},n(t(l).submitText),1)])]))}};export{pe as default};
