import{f as T,E as z,s as R,u as S,c as h,g as x,F as y,r as p,o as d,a as r,b as e,t as s,d as i,e as b,k as I,p as M,v as N,V as U,W as C,M as G,N as V}from"./main.ed929957.js";const $={class:"v_my_team_member_list g-flex-column"},A={class:"v-head g-flex-align-center new-header"},D=e("i",{class:"iconfont icon-zuo"},null,-1),E=[D],F={class:"gltitlexs"},q={class:"v-my-team-member-list-container"},H={class:"v-my-team-member-list-list-one"},O={class:"v-my-team-member-list-list-one-title g-flex g-flex-column"},W={class:"v-my-team-member-list-list-one-title-left g-flex-align-center"},J={class:"v-my-team-member-list-list-one-title-left-title"},K={class:"v-my-team-member-list-list-one-title-left-val"},P={class:"v-my-team-member-list-list-one-title-left g-flex-align-center"},Q={class:"v-my-team-member-list-list-one-title-left-title"},X={class:"v-my-team-member-list-list-one-title-left-val"},Y={class:"v-my-team-member-list-list-one-head g-flex-align-center"},Z={class:"v-my-team-member-list-list-one-head-item g-flex-align-center g-flex-justify-center"},ee={class:"v-my-team-member-list-list-one-head-item g-flex-align-center g-flex-justify-center"},te={class:"v-my-team-member-list-list-one-head-item g-flex-align-center g-flex-justify-center"},se={class:"v-list-box"},ne={class:"v-list-item-content g-flex-align-center"},ie={class:"v-list-item-content-val g-flex-align-center g-flex-justify-center"},le={class:"v-list-item-content-val g-flex-align-center g-flex-justify-center"},ae={class:"v-list-item-content-val g-flex-align-center g-flex-justify-center"},me={__name:"MyTeamMemberList",setup(oe){T(),z();const c=R(),_=S(),l=h(()=>_.tm("myTeam")),f=h(()=>_.tm("gongyong")),m=x(!1),u=x(!1),g=y({layer:1,page:1,limit:30}),n=y({list:[],totalBet:"",totalRebate:""}),v=()=>{g.page++,j()};v();async function j(){c.loadingShow=!0;const{success:o,data:t}=await U(g);!o||(n.list=n.list.concat(t.data.list),n.totalBet=t.data.totalBet||0,n.totalRebate=t.data.totalRebate||0,m.value=!1,u.value=!t.data.list.length)}async function k(){c.loadingShow=!0;const{success:o,data:t}=await C();!o||c.setUserInfo(t.info)}return k(),(o,t)=>{const w=p("van-list"),B=p("NoList");return d(),r("div",$,[e("div",A,[e("div",{onClick:t[0]||(t[0]=a=>o.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},E)]),e("div",F,s(i(l).chakanliushuixiangqing),1),e("div",q,[e("div",H,[e("div",O,[e("div",W,[e("span",J,s(i(l).zongtouzhujine)+":",1),e("span",K,s(n.totalBet),1)]),e("div",P,[e("span",Q,s(i(l).zongfanyongjine)+":",1),e("span",X,s(n.totalRebate),1)])]),e("div",Y,[e("div",Z,[e("span",null,s(i(l).zhanghaoText),1)]),e("div",ee,[e("span",null,s(i(l).touzhujine),1)]),e("div",te,[e("span",null,s(i(l).fanyongjine),1)])]),e("div",se,[b(w,{class:"v-list",loading:m.value,"onUpdate:loading":t[1]||(t[1]=a=>m.value=a),finished:u.value,"loading-text":i(f).loadingText,"finished-text":i(f).finishText,onLoad:v,"immediate-check":!1},{default:I(()=>[(d(!0),r(G,null,V(n.list,(a,L)=>(d(),r("div",{class:"v-list-item",key:L},[e("div",ne,[e("div",ie,[e("span",null,s(a.account),1)]),e("div",le,[e("span",null,s(a.betAmountSum),1)]),e("div",ae,[e("span",null,s(a.rebateAmountSum),1)])])]))),128))]),_:1},8,["loading","finished","loading-text","finished-text"])]),M(b(B,null,null,512),[[N,!n.list.length]])])])])}}};export{me as default};
