import{s as p,v as w,c as x,e as k,E as y,o,a as c,b as t,t as i,m as v,p as u,h as d,K as b,M as C,aA as j,at as B,_ as L,ar as T,aB as W,U as $}from"./main.d54cffa1.js";import{_ as A}from"./empty-image.26078a9f.js";const D={class:"v_wallet_list g-flex-column n-bg"},S={class:"new-head"},E=t("img",{src:L,alt:""},null,-1),G=[E],H={class:"new-head_title_text"},I={class:"v-wallet-list-container"},M={class:"v-wallet-list-content"},F={class:"v-wallet-item-left"},K={class:"v-wallet-item-left-img"},N=t("img",{src:"/img/icon/usdt.png",alt:""},null,-1),O={class:"v-wallet-item-left-img-type g-flex-align-center g-flex-justify-center"},U={class:"v-wallet-item-middle"},V={class:"v-wallet-item-middle-top g-flex-justify-between g-flex-align-center"},q={class:"v-wallet-item-middle-top-title"},z={class:"v-wallet-item-middle-top-link g-flex-align-center g-flex-justify-center"},J={class:"v-wallet-item-middle-address"},P={class:"v-wallet-item-middle-bottom g-flex-align-center"},Q=["onClick"],R={class:"v-back-car-list-no g-flex-column g-flex-align-center"},X=t("img",{src:A,alt:""},null,-1),Y={class:"v-back-car-list-no-text"},Z={class:"v-form-btn-box"},it={__name:"WalletList",setup(tt){const r=p(),g=w.exports.useI18n(),a=x(()=>g.tm("walletlist"));k(0);let n=y({list:[]});async function _(){r.loadingShow=!0;const{success:l,data:e}=await j();!l||(n.list=e.list,console.log(e))}_();function m(l){T.confirm({title:"",message:a.value.delTipsText,cancelButtonColor:"#000",confirmButtonColor:"#5488f7"}).then(()=>{f(l)}).catch(()=>{})}async function f(l){r.loadingShow=!0;const{success:e,data:s}=await W({id:l.id});!e||($.success(s.msg),_(),console.log(s))}return(l,e)=>(o(),c("div",D,[t("div",S,[t("div",{onClick:e[0]||(e[0]=s=>l.$router.go(-1)),class:"new-head-back"},G)]),t("div",H,i(a.value.titleText),1),t("div",I,[v(t("div",M,[(o(!0),c(b,null,C(d(n).list,(s,h)=>(o(),c("div",{key:h,class:"v-wallet-item g-flex-align-center"},[t("div",F,[t("div",K,[N,t("span",O,i(s.chain),1)])]),t("div",U,[t("div",V,[t("div",q,i(s.currency)+"("+i(s.chain)+")",1),t("div",z,i(s.chain),1)]),t("div",J,i(s.address),1),t("div",P,[t("i",{onClick:B(st=>m(s),["stop"]),class:"iconfont icon-shanchu"},null,8,Q)])])]))),128))],512),[[u,d(n).list.length]]),v(t("div",R,[X,t("span",Y,i(a.value.nolistText),1)],512),[[u,!d(n).list.length]])]),t("div",Z,[t("div",{onClick:e[1]||(e[1]=s=>l.$router.push({name:"walletadd"})),class:"v-form-btn g-flex-align-center g-flex-justify-center"},[t("span",null,i(a.value.addaddressText),1)])])]))}};export{it as default};
