import{u as y,c as _,s as b,o as u,a as r,b as s,t as v,d as i,F as j,G as O,H as x,p as k,v as w,i as C,L as f,V as S}from"./main.d88c4f71.js";import{_ as I}from"./user_public_choice.a780c165.js";const P={class:"v_language_set"},$={class:"v-head g-flex-align-center"},B=s("i",{class:"iconfont icon-zuojiantou"},null,-1),G=[B],H={class:"v-title g-flex-align-center g-flex-justify-center"},T={class:"v-language-set-container"},z={class:"v-language-set-list"},A=["onClick"],D={class:"v-item-left g-flex-align-center"},F=["src"],V={class:"v-item-right"},q=s("img",{src:I,alt:""},null,-1),E=[q],Q={__name:"LanguageSet",setup(K){const n=y(),p=_(()=>n.tm("languageSet")),t=b();let l=_(()=>t.langList.length?t.langList.findIndex(e=>e.code==t.lang):-1);console.log("languageIndex.value",l.value);function h(e,a){l.value!=a&&L(e.code)}async function m(){const{success:e,data:a}=await S({id:1});!e||(t.system.ProductType=a.info.ProductType)}async function L(e){if(console.log("i18nObj.locale.value222222222",n.locale.value),console.log("params",e),n.locale.value!==e)return t.loadedLanguages.includes(e)?Promise.resolve(d(e)):g(e);g(e)}async function g(e){t.loadingShow=!0;const{success:a,data:o}=await C({lang:e,id:1});!a||(console.log(Object.prototype.hasOwnProperty.call(t.langObj,e)),n.setLocaleMessage(e,o.data),t.loadedLanguages.push(e),d(e))}function d(e){return t.setLanguage(e),n.locale.value=e,console.log("i18nObj.locale.value",n.locale.value),console.log("store.lang",t.lang),Object.prototype.hasOwnProperty.call(t.langObj,e)?f.use(e,t.langObj[e]):f.use("en",t.langObj.en),document.querySelector("html").setAttribute("lang",e),m(),e}return(e,a)=>(u(),r("div",P,[s("div",$,[s("div",{onClick:a[0]||(a[0]=o=>e.$router.go(-1)),class:"v-head-back g-flex-align-center"},G),s("div",H,[s("span",null,v(i(p).titleText),1)])]),s("div",T,[s("div",z,[(u(!0),r(j,null,O(i(t).langList,(o,c)=>(u(),r("div",{onClick:M=>h(o,c),class:x([i(l)==c?"active":"","v-language-set-item g-flex-align-center"]),key:c},[s("div",D,[s("img",{src:o.icon,alt:""},null,8,F),s("span",null,v(o.name),1)]),k(s("div",V,E,512),[[w,i(l)==c]])],10,A))),128))])])]))}};export{Q as default};
