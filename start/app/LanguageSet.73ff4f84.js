import{v as b,c as _,s as y,o as i,a as u,b as t,t as v,K as O,M as j,h as r,Q as w,m as k,p as x,_ as C,g as S,L as h,f as I}from"./main.8694c2fa.js";const $={class:"v_language_set n-bg"},B={class:"new-head"},P=t("img",{src:C,alt:""},null,-1),z=[P],A={class:"new-head_title_text"},D={class:"v-language-set-container"},G={class:"v-language-set-list"},H=["onClick"],M={class:"v-item-left g-flex-align-center"},q=["src"],E={class:"v-item-right"},F=t("i",{class:"iconfont icon-xuanzhong"},null,-1),K=[F],V={__name:"LanguageSet",setup(N){const n=b.exports.useI18n(),p=_(()=>n.tm("languageSet")),s=y();let l=_(()=>s.langList.length?s.langList.findIndex(e=>e.code==s.lang):-1);console.log("languageIndex.value",l.value);function f(e,a){l.value!=a&&L(e.code)}async function m(){const{success:e,data:a}=await I();!e||(s.banner=a.banner)}async function L(e){if(console.log("i18nObj.locale.value222222222",n.locale.value),console.log("params",e),n.locale.value!==e)return s.loadedLanguages.includes(e)?Promise.resolve(d(e)):g(e);g(e)}async function g(e){s.loadingShow=!0;const{success:a,data:o}=await S({lang:e,id:11});!a||(console.log(Object.prototype.hasOwnProperty.call(s.langObj,e)),n.setLocaleMessage(e,o.data),s.loadedLanguages.push(e),d(e))}function d(e){return s.setLanguage(e),n.locale.value=e,console.log("i18nObj.locale.value",n.locale.value),console.log("store.lang",s.lang),Object.prototype.hasOwnProperty.call(s.langObj,e)?h.use(e,s.langObj[e]):h.use("en",s.langObj.en),document.querySelector("html").setAttribute("lang",e),m(),e}return(e,a)=>(i(),u("div",$,[t("div",B,[t("div",{onClick:a[0]||(a[0]=o=>e.$router.go(-1)),class:"new-head-back"},z)]),t("div",A,v(p.value.titleText),1),t("div",D,[t("div",G,[(i(!0),u(O,null,j(r(s).langList,(o,c)=>(i(),u("div",{onClick:Q=>f(o,c),class:w([r(l)==c?"active":"","v-language-set-item g-flex-align-center"]),key:c},[t("div",M,[t("img",{src:o.icon,alt:""},null,8,q),t("span",null,v(o.name),1)]),k(t("div",E,K,512),[[x,r(l)==c]])],10,H))),128))])])]))}};export{V as default};
