import{s as R,u as j,c as B,B as D,f as U,g as f,C as k,w as J,r as M,o,a as r,b as l,e as F,d as a,t as c,p as h,v as d,F as L,G as w,N as q,O as E,P as G,Q,S as $,U as z}from"./main.9293851e.js";const A=""+new URL("../img/icon/homepage_icon_star1.png",import.meta.url).href,K=""+new URL("../img/icon/homepage_icon_star2.png",import.meta.url).href;const W={class:"v_main_search g-flex-column"},X={class:"v-main-search-head g-flex-align-center"},Y={class:"v-main-head-search g-flex-align-center"},Z={class:"v-main-search-container"},ee={class:"v-main-search-remeng"},te={class:"v-main-search-remeng-title"},se={class:"v-main-search-remeng-list g-flex-wrap g-flex-align-center"},le=["onClick"],ae={class:"v-main-search-remeng-item g-flex-align-center g-flex-justify-center"},ie={class:"v-main-search-remeng v-main-search-history"},ne={class:"v-main-search-history-title g-flex-justify-between g-flex-align-center"},ce={class:"v-main-search-history-title-left"},oe={class:"v-main-search-remeng-list g-flex-wrap g-flex-align-center"},re=["onClick"],he={class:"v-main-search-remeng-item g-flex-align-center g-flex-justify-center"},de={class:"v-main-search-result"},ue=["onClick"],ge={class:"v-main-search-result-item-left g-flex-align-center"},me={class:"v-main-search-result-item-left-title"},_e={class:"v-main-search-result-item-left-xianshi"},ve=["onClick"],fe={src:A,alt:""},pe={src:K,alt:""},ye={__name:"MainSearch",setup(xe){const _=R(),P=j(),m=B(()=>P.tm("mainSearch"));D();const I=U();f(""),f(!1);let T=k({list:[]}),v=k({id:"",title:""}),n=k({list:[]});async function p(s){s||(_.loadingShow=!0);const{success:e,data:i}=await q({hot:s?1:"",title:v.title});!e||(s?T.list=i.list:n.list=i.list,console.log(i))}p(!0);function N(s,e){if(!_.token)return I.push({name:"login"});s.isCollected?b(s,e):V(s,e)}async function V(s,e){_.loadingShow=!0;const{success:i,data:t}=await Q({id:s.id});!i||($(t.msg),n.list[e].isCollected=1,S(s),console.log(t))}async function b(s,e){_.loadingShow=!0;const{success:i,data:t}=await z({id:s.id});!i||($(t.msg),n.list[e].isCollected=0,S(s),console.log(t))}function x(s){S(s),I.push({name:"chart",query:{id:s.id}})}let H=localStorage.getItem("localSearchList")?JSON.parse(localStorage.getItem("localSearchList")):[],u=f(H);function S(s){let e=localStorage.getItem("localSearchList")?JSON.parse(localStorage.getItem("localSearchList")):[];console.log("localList",e),e.findIndex(t=>t.id==s.id)==-1&&e.push(s),e=e.slice(0,6),u.value=e,localStorage.setItem("localSearchList",JSON.stringify(e)),console.log("searchHistoryList",u)}function O(){u.value=[],localStorage.removeItem("localSearchList")}let y=f(0);return J(()=>v.title,(s,e)=>{if(!s){clearTimeout(y.value),n.list=[];return}clearTimeout(y.value),y.value=setTimeout(()=>{p(!1)},300)}),(s,e)=>{const i=M("van-search");return o(),r("div",W,[l("div",X,[l("div",Y,[F(i,{class:"v-main-head-vant-search",onSearch:e[0]||(e[0]=t=>p(!1)),modelValue:a(v).title,"onUpdate:modelValue":e[1]||(e[1]=t=>a(v).title=t),placeholder:a(m).searchPlaceholderText},null,8,["modelValue","placeholder"])]),l("div",{onClick:e[2]||(e[2]=t=>s.$router.go(-1)),class:"v-main-search-head-cancel g-flex-align-center"},c(a(m).cancelText),1)]),l("div",Z,[h(l("div",ee,[l("p",te,c(a(m).searchRemengText),1),l("div",se,[(o(!0),r(L,null,w(a(T).list,(t,g)=>(o(),r("div",{onClick:C=>x(t),class:"v-main-search-remeng-item-box",key:g},[l("div",ae,[l("span",null,c(t.title),1)])],8,le))),128))])],512),[[d,!a(n).list.length]]),h(l("div",ie,[h(l("div",ne,[l("p",ce,c(a(m).searchHistoryText),1),h(l("p",{onClick:O,class:"v-main-search-history-title-right"},c(a(m).cleanText),513),[[d,a(u).length]])],512),[[d,a(u).length]]),l("div",oe,[(o(!0),r(L,null,w(a(u),(t,g)=>(o(),r("div",{onClick:C=>x(t),class:"v-main-search-remeng-item-box",key:g},[l("div",he,[l("span",null,c(t.title),1)])],8,re))),128))])],512),[[d,!a(n).list.length]]),h(l("div",de,[(o(!0),r(L,null,w(a(n).list,(t,g)=>(o(),r("div",{onClick:C=>x(t),key:g,class:"v-main-search-result-item g-flex-align-center g-flex-justify-between"},[l("div",ge,[l("div",me,c(t.title),1),l("div",_e,c(a(E)(t.type)),1)]),l("div",{onClick:G(C=>N(t,g),["stop"]),class:"v-main-search-result-item-right g-flex-align-center"},[h(l("img",fe,null,512),[[d,!t.isCollected]]),h(l("img",pe,null,512),[[d,t.isCollected]])],8,ve)],8,ue))),128))],512),[[d,a(n).list.length]])])])}}};export{ye as default};
