import{s as D,v as N,c as g,e as h,E as f,bf as L,r as p,o as c,a as d,b as t,t as l,m as y,p as x,h as i,d as b,j as S,H as V,K as Y,M as E,X as J,aX as M,l as T,N as I,_ as X}from"./main.416dc339.js";const $={class:"v_choujiang_history g-flex-column n-bg"},z={class:"new-head"},F=t("img",{src:X,alt:""},null,-1),G=[F],K={class:"new-head_title_text"},O={class:"v-choujiang-history-container-box g-flex-column"},R={class:"v-my-bill-container"},U={class:"v-my-bill-content"},q={class:"v-list-item-top g-flex-align-center g-flex-justify-between"},A={class:"v-list-item-top-title"};const P={class:"v-list-item-bottom g-flex-justify-between g-flex-align-center"},Q={class:"v-list-item-middle-time"},tt={__name:"ChouJiangHistory",setup(W){const w=D(),r=N.exports.useI18n(),k=g(()=>r.tm("choujiangHistory")),_=g(()=>r.tm("gongyong"));let o=h(!1),u=h(!1),m=f({page:1,limit:30}),n=f({list:[]});v();function C(){m.page++,v()}async function v(){w.loadingShow=!0;const{success:a,data:s}=await L(m);!a||(n.list=n.list.concat(s.list),o.value=!1,u.value=!s.list.length,console.log(s))}return(a,s)=>{const j=p("van-list"),H=p("no-list");return c(),d("div",$,[t("div",z,[t("div",{onClick:s[0]||(s[0]=e=>a.$router.go(-1)),class:"new-head-back"},G)]),t("div",K,l(k.value.titleText),1),t("div",O,[t("div",R,[t("div",U,[y(b(j,{class:"v-list",loading:i(o),"onUpdate:loading":s[1]||(s[1]=e=>V(o)?o.value=e:o=e),finished:i(u),"loading-text":_.value.loadingText,"finished-text":_.value.finishText,onLoad:C,"immediate-check":!1},{default:S(()=>[(c(!0),d(Y,null,E(i(n).list,(e,B)=>(c(),d("div",{key:B,class:"v-list-item"},[t("div",q,[t("div",A,l(e.title),1),t("div",{class:J([i(M)(e.amount),"v-list-item-top-money"])},l(Number(e.amount)>=0?"+"+e.amount:e.amount)+" "+l(e.currency),3)]),T("",!0),t("div",P,[t("div",Q,l(i(I)(e.modify_time,"YYYY/MM/DD HH:mm:ss")),1)])]))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[x,i(n).list.length]]),y(b(H,null,null,512),[[x,!i(n).list.length]])])])])])}}};export{tt as default};
