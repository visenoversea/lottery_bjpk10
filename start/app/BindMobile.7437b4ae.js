import{u as j,D as N,s as O,v as $,c as h,E as k,e as c,af as A,o as D,a as E,b as e,t as n,m as r,p as I,h as s,ag as _,d as L,ai as R,J,ak as S,U as p,aH as q,_ as z}from"./main.647ad1fa.js";const F={class:"v_bind_mobile n-bg"},K={class:"new-head"},Q=e("img",{src:z,alt:""},null,-1),W=[Q],X={class:"new-head_title_text"},Y={class:"v-bind-mobile-container"},Z={class:"v-form"},ee={class:"v-form-item-box"},te={class:"v-form-item-box-title"},oe={class:"v-form-item g-flex-align-center"},se={class:"v-form-item-left-text"},le=e("i",{class:"iconfont icon-right-1-copy"},null,-1),ie={class:"v-form-item-middle-input"},ae=["placeholder"],ne={class:"v-form-item-box"},de={class:"v-form-item-box-title"},ce={class:"v-form-item g-flex-align-center"},re={class:"v-form-item-middle-input"},me=["placeholder"],ue={class:"v-form-item-middle-right-text"},ve={class:"v-form-item-box"},_e={class:"v-form-item-box-title"},fe={class:"v-form-item g-flex-align-center"},he={class:"v-form-item-left-text"},pe=e("i",{class:"iconfont icon-right-1-copy"},null,-1),be={class:"v-form-item-middle-input"},xe=["placeholder"],ge={class:"v-form-item-box"},Ce={class:"v-form-item-box-title"},Te={class:"v-form-item g-flex-align-center"},ye={class:"v-form-item-middle-input"},we=["placeholder"],ke={class:"v-form-item-middle-right-text"},Be={__name:"BindMobile",setup(Ie){let B=j();N();const m=O(),b=$.exports.useI18n(),a=h(()=>b.tm("bindMobile")),f=h(()=>b.tm("gongyong"));let l=k({area_code:"",mobile:"",code:"",oldCode:""}),x=k({list:[]}),g=c(f.value.sendCodeText),C=c(f.value.againSendCodeText),T=c(f.value.sendCodeText),u=c(0),v=c(0);const y=c(null);M();async function M(){const{success:i,data:t}=await A();!i||(x.list=t.list,l.area_code=t.list[0].area_code)}let d=h(()=>m.userInfo);async function P(){const{success:i,data:t}=await J();!i||(m.setUserInfo(t.info),console.log(t))}P();function w(){y.value.onShow()}function U(i){l.area_code=i.area_code}async function H(){if(v.value)return;m.loadingShow=!0;const{success:i,data:t}=await S({area_code:d.value.area_code,mobile:d.value.mobile});if(!i)return;let o=60;p(t.msg),v.value=setInterval(()=>{o--,g.value=o===0?C.value:o+"s",o===0&&(clearInterval(v.value),v.value=0)},1e3)}async function V(){if(u.value)return;m.loadingShow=!0;const{success:i,data:t}=await S({area_code:l.area_code,mobile:l.mobile});if(!i)return;let o=60;p(t.msg),u.value=setInterval(()=>{o--,T.value=o===0?C.value:o+"s",o===0&&(clearInterval(u.value),u.value=0)},1e3)}async function G(){m.loadingShow=!0,console.log(l);const{success:i,data:t}=await q(l);!i||(p.success(t.msg),setTimeout(()=>{B.back(-1)},500))}return(i,t)=>(D(),E("div",F,[e("div",K,[e("div",{onClick:t[0]||(t[0]=o=>i.$router.go(-1)),class:"new-head-back"},W)]),e("div",X,n(a.value.titleText),1),e("div",Y,[e("div",Z,[r(e("div",ee,[e("div",te,[e("span",null,n(a.value.oldMobileText),1)]),e("div",oe,[e("div",{onClick:w,class:"v-form-item-left g-flex-align-center"},[e("span",se,"+"+n(s(d).area_code),1),le]),e("div",ie,[r(e("input",{type:"text",readonly:"","onUpdate:modelValue":t[1]||(t[1]=o=>s(d).mobile=o),placeholder:a.value.mobilePlaceholderText},null,8,ae),[[_,s(d).mobile]])])])],512),[[I,s(d).mobile]]),r(e("div",ne,[e("div",de,[e("span",null,n(a.value.codeText),1)]),e("div",ce,[e("div",re,[r(e("input",{type:"text","onUpdate:modelValue":t[2]||(t[2]=o=>s(l).oldCode=o),label:"","label-width":"0",placeholder:a.value.codePlaceholderText},null,8,me),[[_,s(l).oldCode]])]),e("div",{onClick:H,class:"v-form-item-middle-right g-flex-align-center"},[e("span",ue,n(s(g)),1)])])],512),[[I,s(d).mobile]]),e("div",ve,[e("div",_e,[e("span",null,n(a.value.mobileText),1)]),e("div",fe,[e("div",{onClick:w,class:"v-form-item-left g-flex-align-center"},[e("span",he,"+"+n(s(l).area_code),1),pe]),e("div",be,[r(e("input",{type:"text","onUpdate:modelValue":t[3]||(t[3]=o=>s(l).mobile=o),placeholder:a.value.mobilePlaceholderText},null,8,xe),[[_,s(l).mobile]])])])]),e("div",ge,[e("div",Ce,[e("span",null,n(a.value.codeText),1)]),e("div",Te,[e("div",ye,[r(e("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=o=>s(l).code=o),label:"","label-width":"0",placeholder:a.value.codePlaceholderText},null,8,we),[[_,s(l).code]])]),e("div",{onClick:V,class:"v-form-item-middle-right g-flex-align-center"},[e("span",ke,n(s(T)),1)])])])]),e("div",{onClick:G,class:"v-submit-btn g-flex-align-center g-flex-justify-center"},n(a.value.submitBtnText),1)]),L(R,{list:s(x).list,onEmitPhoneItemClick:U,ref_key:"refBindPhonesPop",ref:y},null,8,["list"])]))}};export{Be as default};
