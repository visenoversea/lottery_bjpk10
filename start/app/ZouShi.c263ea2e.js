import{f as L,B as D,s as w,u as N,c as p,C as y,g as z,D as R,r as Z,o,a as n,b as s,t as i,d as e,e as q,k as E,E as F,F as G,G as H,H as _,I as k,J as C,K as S,M as T}from"./main.55c4f9af.js";const I={class:"v_zoushi g-flex-column"},V={class:"v-head g-flex-justify-center g-flex-align-center"},$=s("i",{class:"iconfont icon-zuojiantou"},null,-1),J=[$],K={class:"v-title g-flex-align-center g-flex-justify-center"},M={class:"v-zoushi-container g-flex-column"},O={class:"v-zoushi-top g-flex-align-center"},U={class:"v-zoushi-top-item"},A={class:"v-zoushi-top-item"},P={class:"v-zoushi-top-item"},Q={class:"v-zoushi-top-item"},W={class:"v-zoushi-top-item"},X={class:"v-zoushi-top-item"},Y={class:"v-zoushi-top-item"},tt={class:"v-zoushi-list-box"},et={class:"v-list-item g-flex-align-center"},st={class:"v-item-item"},it={class:"v-item-item"},ot={class:"v-item-item"},nt={class:"v-item-item g-flex-align-center g-flex-justify-center"},at={key:1,class:"v-item-item-content"},lt={class:"v-item-item g-flex-align-center g-flex-justify-center"},ct={key:1,class:"v-item-item-content"},dt={class:"v-item-item g-flex-align-center g-flex-justify-center"},_t={key:1,class:"v-item-item-content"},rt={class:"v-item-item g-flex-align-center g-flex-justify-center"},vt={key:1,class:"v-item-item-content"},gt={__name:"ZouShi",setup(ut){L();const j=D(),B=w(),u=N(),l=p(()=>u.tm("zouShi")),h=p(()=>u.tm("gongyong"));let g=y({id:j.query.id,page:1,limit:100,status:""}),r=y({list:[]}),d=z(!1),f=z(!1);function b(){g.page++,m()}m();async function m(){B.loadingShow=!0;const{success:v,data:a}=await R(g);!v||(a.list=a.list.map(c=>(c.open_code_arr=c.open_code.split(",").map(t=>Number(t)),c.total=c.open_code_arr.reduce((t,x)=>t+x),c)),r.list=r.list.concat(a.list),d.value=!1,f.value=!a.list.length,console.log(a))}return(v,a)=>{const c=Z("van-list");return o(),n("div",I,[s("div",V,[s("div",{onClick:a[0]||(a[0]=t=>v.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},J),s("span",K,i(e(l).titleText),1)]),s("div",M,[s("div",O,[s("div",U,i(e(l).qihaoText),1),s("div",A,i(e(l).haomaText),1),s("div",P,i(e(l).zhiText),1),s("div",Q,i(e(l).bigText),1),s("div",W,i(e(l).smallText),1),s("div",X,i(e(l).danText),1),s("div",Y,i(e(l).shuangText),1)]),s("div",tt,[q(c,{class:"v-list",loading:e(d),"onUpdate:loading":a[1]||(a[1]=t=>F(d)?d.value=t:d=t),finished:e(f),"loading-text":e(h).loadingText,"finished-text":e(h).finishText,onLoad:b,"immediate-check":!1},{default:E(()=>[(o(!0),n(G,null,H(e(r).list,(t,x)=>(o(),n("div",et,[s("div",st,i(t.open_expect),1),s("div",it,i(t.open_code),1),s("div",ot,i(t.total),1),s("div",nt,[t.total>13?(o(),n("div",{key:0,class:_(["v-item-item-content",e(k)(t.total)])},i(e(C)(t.total)),3)):(o(),n("div",at," - "))]),s("div",lt,[t.total<=13?(o(),n("div",{key:0,class:_(["v-item-item-content",e(k)(t.total)])},i(e(C)(t.total)),3)):(o(),n("div",ct," - "))]),s("div",dt,[t.total%2==1?(o(),n("div",{key:0,class:_(["v-item-item-content",e(S)(t.total)])},i(e(T)(t.total)),3)):(o(),n("div",_t," - "))]),s("div",rt,[t.total%2==0?(o(),n("div",{key:0,class:_(["v-item-item-content",e(S)(t.total)])},i(e(T)(t.total)),3)):(o(),n("div",vt," - "))])]))),256))]),_:1},8,["loading","finished","loading-text","finished-text"])])])])}}};export{gt as default};
