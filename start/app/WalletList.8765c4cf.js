import{s as p,u as w,c as x,g as k,F as y,o as c,a as d,b as t,t as i,d as a,p as v,v as u,M as b,N as C,aG as L,O as T,I as W,ax as $,aH as j,Q as B}from"./main.40129c24.js";import{_ as D}from"./empty-image.36ac6311.js";const A={class:"v_wallet_list g-flex-column n-bg"},S={class:"new-head"},G=t("img",{src:W,alt:""},null,-1),H=[G],F={class:"new-head_title_text"},I={class:"v-wallet-list-container"},M={class:"v-wallet-list-content"},N={class:"v-wallet-item-left"},O={class:"v-wallet-item-left-img"},E=["src"],Q={class:"v-wallet-item-left-img-type g-flex-align-center g-flex-justify-center"},V={class:"v-wallet-item-middle"},q={class:"v-wallet-item-middle-top g-flex-justify-between g-flex-align-center"},z={class:"v-wallet-item-middle-top-title"},J={class:"v-wallet-item-middle-top-link g-flex-align-center g-flex-justify-center"},K={class:"v-wallet-item-middle-address"},P={class:"v-wallet-item-middle-bottom g-flex-align-center"},R=["onClick"],U={class:"v-back-car-list-no g-flex-column g-flex-align-center"},X=t("img",{src:D,alt:""},null,-1),Y={class:"v-back-car-list-no-text"},Z={class:"v-form-btn-box"},it={__name:"WalletList",setup(tt){const r=p(),g=w(),n=x(()=>g.tm("walletlist"));k(0);let o=y({list:[]});async function _(){r.loadingShow=!0;const{success:l,data:e}=await L();!l||(o.list=e.list,console.log(e))}_();function m(l){$.confirm({title:"",message:n.value.delTipsText,cancelButtonColor:"#000",confirmButtonColor:"#5488f7"}).then(()=>{f(l)}).catch(()=>{})}async function f(l){r.loadingShow=!0;const{success:e,data:s}=await j({id:l.id});!e||(B.success(s.msg),_(),console.log(s))}return(l,e)=>(c(),d("div",A,[t("div",S,[t("div",{onClick:e[0]||(e[0]=s=>l.$router.go(-1)),class:"new-head-back"},H)]),t("div",F,i(a(n).titleText),1),t("div",I,[v(t("div",M,[(c(!0),d(b,null,C(a(o).list,(s,h)=>(c(),d("div",{key:h,class:"v-wallet-item g-flex-align-center"},[t("div",N,[t("div",O,[t("img",{src:"/img/icon/usdt.png",alt:""},null,8,E),t("span",Q,i(s.chain),1)])]),t("div",V,[t("div",q,[t("div",z,i(s.currency)+"("+i(s.chain)+")",1),t("div",J,i(s.chain),1)]),t("div",K,i(s.address),1),t("div",P,[t("i",{onClick:T(st=>m(s),["stop"]),class:"iconfont icon-shanchu"},null,8,R)])])]))),128))],512),[[u,a(o).list.length]]),v(t("div",U,[X,t("span",Y,i(a(n).nolistText),1)],512),[[u,!a(o).list.length]])]),t("div",Z,[t("div",{onClick:e[1]||(e[1]=s=>l.$router.push({name:"walletadd"})),class:"v-form-btn g-flex-align-center g-flex-justify-center"},[t("span",null,i(a(n).addaddressText),1)])])]))}};export{it as default};
