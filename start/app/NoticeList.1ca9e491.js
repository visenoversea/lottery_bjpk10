import{s as S,u as T,c as v,f as $,g as h,C as p,r as m,o as a,a as c,b as i,t as d,d as e,p as x,v as k,e as L,k as D,E,aA as F,F as R,G as V}from"./main.6744d0db.js";const q={class:"v_notice_list g-flex-column"},z={class:"v-head g-flex-justify-center g-flex-align-center"},A=i("i",{class:"iconfont icon-zuojiantou"},null,-1),H=[A],I={class:"v-title g-flex-align-center g-flex-justify-center"},O={class:"v-notice-list-container"},U=["onClick"],J={class:"v-list-item-title"},K={class:"v-list-item-des"},W={__name:"NoticeList",setup(M){const y=S(),r=T(),C=v(()=>r.tm("noticelist")),u=v(()=>r.tm("gongyong")),N=$();let n=h(!1),_=h(!1),f=p({page:1,limit:30}),o=p({list:[]});async function g(){y.loadingShow=!0;const{success:l,data:t}=await F(f);!l||(o.list=o.list.concat(t.list),n.value=!1,_.value=!t.list.length,console.log(t))}g();function w(){f.page++,g()}function j(l){N.push({name:"noticedetail",query:{id:l.id}})}return(l,t)=>{const b=m("van-list"),B=m("NoList");return a(),c("div",q,[i("div",z,[i("div",{onClick:t[0]||(t[0]=s=>l.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},H),i("span",I,d(e(C).titleText),1)]),i("div",O,[x(L(b,{class:"v-list",loading:e(n),"onUpdate:loading":t[1]||(t[1]=s=>E(n)?n.value=s:n=s),finished:e(_),"loading-text":e(u).loadingText,"finished-text":e(u).finishText,onLoad:w,"immediate-check":!1},{default:D(()=>[(a(!0),c(R,null,V(e(o).list,(s,G)=>(a(),c("div",{onClick:P=>j(s),class:"v-list-item",key:G},[i("p",J,d(s.title),1),i("p",K,d(s.des),1)],8,U))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[k,e(o).list.length]]),x(L(B,null,null,512),[[k,!e(o).list.length]])])])}}};export{W as default};
