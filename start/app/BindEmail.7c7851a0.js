import{u as U,D as B,s as V,v as H,c as p,e as d,E as P,o as j,a as D,b as e,t as n,m as c,p as C,h as l,ag as _,J as G,al as w,U as h,aI as N,_ as O}from"./main.22b1808f.js";const $={class:"v_bind_email n-bg"},R={class:"new-head"},J=e("img",{src:O,alt:""},null,-1),M=[J],q={class:"new-head_title_text"},z={class:"v-bind-email-container"},A={class:"v-form"},F={class:"v-form-item-box"},K={class:"v-form-item-box-title"},L={class:"v-form-item g-flex-align-center"},Q={class:"v-form-item-middle-input"},W=["placeholder"],X={class:"v-form-item-box"},Y={class:"v-form-item-box-title"},Z={class:"v-form-item g-flex-align-center"},ee={class:"v-form-item-middle-input"},te=["placeholder"],se={class:"v-form-item-middle-right-text"},le={class:"v-form-item-box"},ie={class:"v-form-item-box-title"},oe={class:"v-form-item g-flex-align-center"},ae={class:"v-form-item-middle-input"},ne=["placeholder"],de={class:"v-form-item-box"},ce={class:"v-form-item-box-title"},re={class:"v-form-item g-flex-align-center"},me={class:"v-form-item-middle-input"},ue=["placeholder"],ve={class:"v-form-item-middle-right-text"},pe={__name:"BindEmail",setup(_e){let y=U();B();const r=V(),x=H.exports.useI18n(),i=p(()=>x.tm("bindEmail")),f=p(()=>x.tm("gongyong"));d("");let a=P({email:"",code:"",oldCode:""}),g=d(f.value.sendCodeText),b=d(f.value.sendCodeText),T=d(f.value.againSendCodeText),u=d(0),v=d(0),m=p(()=>r.userInfo);async function E(){const{success:o,data:t}=await G();!o||(r.setUserInfo(t.info),console.log(t))}E();async function I(){if(u.value)return;r.loadingShow=!0;const{success:o,data:t}=await w({email:m.value.email});if(!o)return;let s=60;h(t.msg),u.value=setInterval(()=>{s--,g.value=s==0?T.value:s+"s",s===0&&(clearInterval(u.value),u.value=0)},1e3)}async function S(){if(v.value)return;r.loadingShow=!0;const{success:o,data:t}=await w({email:a.email});if(!o)return;let s=60;h(t.msg),v.value=setInterval(()=>{s--,b.value=s==0?T.value:s+"s",s===0&&(clearInterval(v.value),v.value=0)},1e3)}async function k(){r.loadingShow=!0;const{success:o,data:t}=await N(a);!o||(h.success(t.msg),setTimeout(()=>{y.back(-1)},500))}return(o,t)=>(j(),D("div",$,[e("div",R,[e("div",{onClick:t[0]||(t[0]=s=>o.$router.go(-1)),class:"new-head-back"},M)]),e("div",q,n(i.value.titleText),1),e("div",z,[e("div",A,[c(e("div",F,[e("div",K,[e("span",null,n(i.value.oldEmailText),1)]),e("div",L,[e("div",Q,[c(e("input",{type:"text",readonly:"","onUpdate:modelValue":t[1]||(t[1]=s=>l(m).email=s),placeholder:i.value.newEmailPlaceholderText},null,8,W),[[_,l(m).email]])])])],512),[[C,l(m).email]]),c(e("div",X,[e("div",Y,[e("span",null,n(i.value.codeText),1)]),e("div",Z,[e("div",ee,[c(e("input",{type:"text","onUpdate:modelValue":t[2]||(t[2]=s=>l(a).oldCode=s),placeholder:i.value.codePlaceholderText},null,8,te),[[_,l(a).oldCode]])]),e("div",{onClick:I,class:"v-form-item-middle-right g-flex-align-center"},[e("span",se,n(l(g)),1)])])],512),[[C,l(m).email]]),e("div",le,[e("div",ie,[e("span",null,n(i.value.newEmailText),1)]),e("div",oe,[e("div",ae,[c(e("input",{type:"text","onUpdate:modelValue":t[3]||(t[3]=s=>l(a).email=s),placeholder:i.value.newEmailPlaceholderText},null,8,ne),[[_,l(a).email]])])])]),e("div",de,[e("div",ce,[e("span",null,n(i.value.codeText),1)]),e("div",re,[e("div",me,[c(e("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=s=>l(a).code=s),placeholder:i.value.codePlaceholderText},null,8,ue),[[_,l(a).code]])]),e("div",{onClick:S,class:"v-form-item-middle-right g-flex-align-center"},[e("span",ve,n(l(b)),1)])])])]),e("div",{onClick:k,class:"v-submit-btn g-flex-align-center g-flex-justify-center"},n(i.value.submitText),1)])]))}};export{pe as default};
