import{s as p,v as w,c as x,e as y,E as k,o,a as c,b as t,t as i,m as v,p as u,h as d,K as b,M as C,ax as j,aq as L,_ as T,ao as W,ay as $,V as B}from"./main.8694c2fa.js";import{_ as D}from"./empty-image.26078a9f.js";const A={class:"v_wallet_list g-flex-column n-bg"},S={class:"new-head"},E=t("img",{src:T,alt:""},null,-1),G=[E],H={class:"new-head_title_text"},I={class:"v-wallet-list-container"},M={class:"v-wallet-list-content"},V={class:"v-wallet-item-left"},q={class:"v-wallet-item-left-img"},F=t("img",{src:"/img/icon/usdt.png",alt:""},null,-1),K={class:"v-wallet-item-left-img-type g-flex-align-center g-flex-justify-center"},N={class:"v-wallet-item-middle"},O={class:"v-wallet-item-middle-top g-flex-justify-between g-flex-align-center"},z={class:"v-wallet-item-middle-top-title"},J={class:"v-wallet-item-middle-top-link g-flex-align-center g-flex-justify-center"},P={class:"v-wallet-item-middle-address"},Q={class:"v-wallet-item-middle-bottom g-flex-align-center"},R=["onClick"],U={class:"v-back-car-list-no g-flex-column g-flex-align-center"},X=t("img",{src:D,alt:""},null,-1),Y={class:"v-back-car-list-no-text"},Z={class:"v-form-btn-box"},it={__name:"WalletList",setup(tt){const r=p(),g=w.exports.useI18n(),a=x(()=>g.tm("walletlist"));y(0);let n=k({list:[]});async function _(){r.loadingShow=!0;const{success:l,data:e}=await j();!l||(n.list=e.list,console.log(e))}_();function m(l){W.confirm({title:"",message:a.value.delTipsText,cancelButtonColor:"#000",confirmButtonColor:"#5488f7"}).then(()=>{f(l)}).catch(()=>{})}async function f(l){r.loadingShow=!0;const{success:e,data:s}=await $({id:l.id});!e||(B.success(s.msg),_(),console.log(s))}return(l,e)=>(o(),c("div",A,[t("div",S,[t("div",{onClick:e[0]||(e[0]=s=>l.$router.go(-1)),class:"new-head-back"},G)]),t("div",H,i(a.value.titleText),1),t("div",I,[v(t("div",M,[(o(!0),c(b,null,C(d(n).list,(s,h)=>(o(),c("div",{key:h,class:"v-wallet-item g-flex-align-center"},[t("div",V,[t("div",q,[F,t("span",K,i(s.chain),1)])]),t("div",N,[t("div",O,[t("div",z,i(s.currency)+"("+i(s.chain)+")",1),t("div",J,i(s.chain),1)]),t("div",P,i(s.address),1),t("div",Q,[t("i",{onClick:L(st=>m(s),["stop"]),class:"iconfont icon-shanchu"},null,8,R)])])]))),128))],512),[[u,d(n).list.length]]),v(t("div",U,[X,t("span",Y,i(a.value.nolistText),1)],512),[[u,!d(n).list.length]])]),t("div",Z,[t("div",{onClick:e[1]||(e[1]=s=>l.$router.push({name:"walletadd"})),class:"v-form-btn g-flex-align-center g-flex-justify-center"},[t("span",null,i(a.value.addaddressText),1)])])]))}};export{it as default};
