import{s as D,v as N,c as g,e as h,E as f,bb as L,r as p,o as c,a as d,b as t,t as l,m as y,p as x,h as i,d as b,j as S,H as T,K as V,M as Y,Q as E,aT as J,l as M,N as I,_ as $}from"./main.8694c2fa.js";const z={class:"v_choujiang_history g-flex-column n-bg"},F={class:"new-head"},G=t("img",{src:$,alt:""},null,-1),K=[G],O={class:"new-head_title_text"},Q={class:"v-choujiang-history-container-box g-flex-column"},R={class:"v-my-bill-container"},U={class:"v-my-bill-content"},q={class:"v-list-item-top g-flex-align-center g-flex-justify-between"},A={class:"v-list-item-top-title"};const P={class:"v-list-item-bottom g-flex-justify-between g-flex-align-center"},W={class:"v-list-item-middle-time"},tt={__name:"ChouJiangHistory",setup(X){const w=D(),r=N.exports.useI18n(),k=g(()=>r.tm("choujiangHistory")),_=g(()=>r.tm("gongyong"));let o=h(!1),u=h(!1),m=f({page:1,limit:30}),n=f({list:[]});v();function C(){m.page++,v()}async function v(){w.loadingShow=!0;const{success:a,data:s}=await L(m);!a||(n.list=n.list.concat(s.list),o.value=!1,u.value=!s.list.length,console.log(s))}return(a,s)=>{const j=p("van-list"),H=p("no-list");return c(),d("div",z,[t("div",F,[t("div",{onClick:s[0]||(s[0]=e=>a.$router.go(-1)),class:"new-head-back"},K)]),t("div",O,l(k.value.titleText),1),t("div",Q,[t("div",R,[t("div",U,[y(b(j,{class:"v-list",loading:i(o),"onUpdate:loading":s[1]||(s[1]=e=>T(o)?o.value=e:o=e),finished:i(u),"loading-text":_.value.loadingText,"finished-text":_.value.finishText,onLoad:C,"immediate-check":!1},{default:S(()=>[(c(!0),d(V,null,Y(i(n).list,(e,B)=>(c(),d("div",{key:B,class:"v-list-item"},[t("div",q,[t("div",A,l(e.title),1),t("div",{class:E([i(J)(e.amount),"v-list-item-top-money"])},l(Number(e.amount)>=0?"+"+e.amount:e.amount)+" "+l(e.currency),3)]),M("",!0),t("div",P,[t("div",W,l(i(I)(e.modify_time,"YYYY/MM/DD HH:mm:ss")),1)])]))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[x,i(n).list.length]]),y(b(H,null,null,512),[[x,!i(n).list.length]])])])])])}}};export{tt as default};
