import{s as b,u as w,c as g,f as k,o as C,a as y,b as e,t as s,d as t,p as c,v as a,W as T}from"./main.64a8a52d.js";import{_ as r}from"./user_icon_enter.35dd2a42.js";const f=""+new URL("../img/icon/user_icon_tips.png",import.meta.url).href;const j={class:"v_safe_center"},S={class:"v-head g-flex-justify-center g-flex-align-center"},I=e("i",{class:"iconfont icon-zuojiantou"},null,-1),B=[I],P={class:"v-title g-flex-align-center g-flex-justify-center"},U={class:"v-safe-center-container"},$={class:"v-safe-center-list"},D={class:"v-safe-center-item-left"},E={class:"v-safe-center-item-right g-flex-align-center"},G={class:"v-safe-center-item-right-no g-flex-align-center"},R=e("img",{src:f,alt:""},null,-1),z=e("div",{class:"v-safe-center-item-right-icon g-flex-align-center"},[e("img",{src:r,alt:""})],-1),H={class:"v-safe-center-item-left"},L={class:"v-safe-center-item-right g-flex-align-center"},M={class:"v-safe-center-item-right-no g-flex-align-center"},N=e("img",{src:f,alt:""},null,-1),O=e("div",{class:"v-safe-center-item-right-icon g-flex-align-center"},[e("img",{src:r,alt:""})],-1),V={class:"v-safe-center-item-left"},W={class:"v-safe-center-item-right g-flex-align-center"},q={class:"v-safe-center-item-right-no g-flex-align-center"},A=e("img",{src:f,alt:""},null,-1),F=e("div",{class:"v-safe-center-item-right-icon g-flex-align-center"},[e("img",{src:r,alt:""})],-1),J={class:"v-safe-center-item-left"},K={class:"v-safe-center-item-right g-flex-align-center"},Q={class:"v-safe-center-item-right-no g-flex-align-center"},X=e("img",{src:f,alt:""},null,-1),Y=e("div",{class:"v-safe-center-item-right-icon g-flex-align-center"},[e("img",{src:r,alt:""})],-1),ne={__name:"SafeCenter",setup(Z){const _=b(),v=w(),n=g(()=>v.tm("safecenter")),o=k();let i=g(()=>_.userInfo);async function m(){const{success:d,data:l}=await T();!d||(_.setUserInfo(l.info),console.log(l))}m();function u(){o.push({name:"bindemail"})}function h(){o.push({name:"bindmobile"})}function x(){o.push({name:"changebuspwd"})}function p(){o.push({name:"changepwd"})}return(d,l)=>(C(),y("div",j,[e("div",S,[e("div",{onClick:l[0]||(l[0]=ee=>d.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},B),e("span",P,s(t(n).titleText),1)]),e("div",U,[e("div",$,[e("div",{onClick:u,class:"v-safe-center-item g-flex-align-center g-flex-justify-between"},[e("div",D,s(t(n).emailText),1),e("div",E,[c(e("div",{class:"v-safe-center-item-right-have"},s(t(i).email),513),[[a,t(i).email]]),c(e("div",G,[R,e("span",null,s(t(n).noBindeText),1)],512),[[a,!t(i).email]]),z])]),e("div",{onClick:h,class:"v-safe-center-item g-flex-align-center g-flex-justify-between"},[e("div",H,s(t(n).mobileText),1),e("div",L,[c(e("div",{class:"v-safe-center-item-right-have"}," +"+s(t(i).area_code)+" "+s(t(i).mobile),513),[[a,t(i).mobile]]),c(e("div",M,[N,e("span",null,s(t(n).noBindeText),1)],512),[[a,!t(i).mobile]]),O])]),e("div",{onClick:x,class:"v-safe-center-item g-flex-align-center g-flex-justify-between"},[e("div",V,s(t(n).busPwdText),1),e("div",W,[c(e("div",q,[A,e("span",null,s(t(n).noSetText),1)],512),[[a,t(i).fundPasswordStatus==0]]),F])]),e("div",{onClick:p,class:"v-safe-center-item g-flex-align-center g-flex-justify-between"},[e("div",J,s(t(n).loginPwdText),1),e("div",K,[c(e("div",Q,[X,e("span",null,s(t(n).noSetText),1)],512),[[a,t(i).passwordStatus==0]]),Y])])])])]))}};export{ne as default};
