import{s as p,u as x,c as f,f as w,o as b,a as k,b as e,t as s,d as t,p as o,v as a,W as y,I as C}from"./main.df4ea462.js";const _=""+new URL("../img/icon/user_icon_tips.png",import.meta.url).href;const S={class:"v_safe_center g-flex-column n-bg"},I={class:"new-head"},T=e("img",{src:C,alt:""},null,-1),P=[T],j={class:"new-head_title_text"},B={class:"v-safe-center-container"},U={class:"v-safe-center-list"},$={class:"v-safe-center-item-left"},D={class:"v-safe-center-item-right g-flex-align-center"},E={class:"v-safe-center-item-right-no g-flex-align-center"},G=e("img",{src:_,alt:""},null,-1),R=e("div",{class:"v-safe-center-item-right-icon g-flex-align-center"},[e("i",{class:"iconfont icon-you"})],-1),H={class:"v-safe-center-item-left"},L={class:"v-safe-center-item-right g-flex-align-center"},N={class:"v-safe-center-item-right-no g-flex-align-center"},O=e("img",{src:_,alt:""},null,-1),V=e("div",{class:"v-safe-center-item-right-icon g-flex-align-center"},[e("i",{class:"iconfont icon-you"})],-1),W={class:"v-safe-center-item-left"},q={class:"v-safe-center-item-right g-flex-align-center"},z={class:"v-safe-center-item-right-no g-flex-align-center"},A=e("img",{src:_,alt:""},null,-1),F=e("div",{class:"v-safe-center-item-right-icon g-flex-align-center"},[e("i",{class:"iconfont icon-you"})],-1),Q={__name:"SafeCenter",setup(J){const d=p(),g=x(),n=f(()=>g.tm("safecenter")),l=w();let i=f(()=>d.userInfo);async function u(){const{success:r,data:c}=await y();!r||(d.setUserInfo(c.info),console.log(c))}u();function v(){l.push({name:"bindemail"})}function h(){l.push({name:"changebuspwd"})}function m(){l.push({name:"changepwd"})}return(r,c)=>(b(),k("div",S,[e("div",I,[e("div",{onClick:c[0]||(c[0]=K=>r.$router.go(-1)),class:"new-head-back"},P)]),e("div",j,s(t(n).titleText),1),e("div",B,[e("div",U,[e("div",{onClick:v,class:"v-safe-center-item g-flex-align-center g-flex-justify-between"},[e("div",$,s(t(n).emailText),1),e("div",D,[o(e("div",{class:"v-safe-center-item-right-have"},s(t(i).email),513),[[a,t(i).email]]),o(e("div",E,[G,e("span",null,s(t(n).noBindeText),1)],512),[[a,!t(i).email]]),R])]),e("div",{onClick:h,class:"v-safe-center-item g-flex-align-center g-flex-justify-between"},[e("div",H,s(t(n).busPwdText),1),e("div",L,[o(e("div",N,[O,e("span",null,s(t(n).noSetText),1)],512),[[a,t(i).fundPasswordStatus==0]]),V])]),e("div",{onClick:m,class:"v-safe-center-item g-flex-align-center g-flex-justify-between"},[e("div",W,s(t(n).loginPwdText),1),e("div",q,[o(e("div",z,[A,e("span",null,s(t(n).noSetText),1)],512),[[a,t(i).passwordStatus==0]]),F])])])])]))}};export{Q as default};
