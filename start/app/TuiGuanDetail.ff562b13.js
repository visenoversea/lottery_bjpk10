import{s as w,u as C,c as m,g as x,C as h,aI as N,r as p,o as u,a as g,b as t,t as i,d as e,p as b,v as y,e as T,k as B,E as I,F as S,G as z}from"./main.0795c4c3.js";const E={class:"v_tuiguang_deatil g-flex-column"},F={class:"v-head g-flex-justify-center g-flex-align-center"},V=t("i",{class:"iconfont icon-zuojiantou"},null,-1),$=[V],H={class:"v-title g-flex-align-center g-flex-justify-center"},O={class:"v-tuiguang-container g-flex-column"},R={class:"v-tuiguang-bottom-title-list g-flex-align-center"},U={class:"v-tuiguang-bottom-title-item g-flex-align-center"},q={class:"v-tuiguang-bottom-title-item g-flex-justify-center g-flex-align-center"},A={class:"v-tuiguang-bottom-title-item g-flex-align-center g-flex-justify-end"},J={class:"v-tuiguang-bottom-list-box"},K={class:"v-tuiguang-bottom-item-content g-flex-align-center"},M={class:"v-tuiguang-bottom-item-content g-flex-align-center g-flex-justify-center"},P={class:"v-tuiguang-bottom-item-content v-tuiguang-bottom-item-content-money g-flex-align-center g-flex-justify-end"},X={__name:"TuiGuanDetail",setup(Q){const j=w(),d=C(),o=m(()=>d.tm("tuiguangDetail")),r=m(()=>d.tm("gongyong"));let l=x(!1),f=x(!1),_=h({page:1,limit:30}),a=h({list:[]});v();function k(){_.page++,v()}async function v(){j.loadingShow=!0;const{success:c,data:n}=await N(_);!c||(a.list=a.list.concat(n.list),l.value=!1,f.value=!n.list.length,console.log(n))}return(c,n)=>{const L=p("van-list"),D=p("NoList");return u(),g("div",E,[t("div",F,[t("div",{onClick:n[0]||(n[0]=s=>c.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},$),t("span",H,i(e(o).titleText),1)]),t("div",O,[t("div",R,[t("div",U,[t("span",null,i(e(o).userIdText),1)]),t("div",q,[t("span",null,i(e(o).bizhongText),1)]),t("div",A,[t("span",null,i(e(o).shuerText),1)])]),t("div",J,[b(T(L,{class:"v-list",loading:e(l),"onUpdate:loading":n[1]||(n[1]=s=>I(l)?l.value=s:l=s),finished:e(f),"loading-text":e(r).loadingText,"finished-text":e(r).finishText,onLoad:k,"immediate-check":!1},{default:B(()=>[(u(!0),g(S,null,z(e(a).list,(s,G)=>(u(),g("div",{class:"v-tuiguang-bottom-item g-flex-align-center",key:G},[t("div",K,[t("span",null,i(s.rebate_id),1)]),t("div",M,[t("span",null,i(s.currency),1)]),t("div",P,[t("span",null,i(s.amount),1)])]))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[y,e(a).list.length]]),b(T(D,null,null,512),[[y,!e(a).list.length]])])])])}}};export{X as default};
