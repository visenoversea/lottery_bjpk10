import{s as D,u as P,c as g,g as d,F as b,b4 as B,r as x,o as _,a as v,b as t,t as i,d as e,p,v as y,e as T,k as F,J as I,M,N as R,Y as V,Z as w,b1 as j,a8 as z,a7 as G,I as O}from"./main.a558085a.js";const $={class:"v_lianghua_history g-flex-column n-bg"},E={class:"new-head"},J=t("img",{src:O,alt:""},null,-1),U=[J],W={class:"new-head_title_text"},Y={class:"v-history-container g-flex-column"},Z={class:"v-finance-list-box"},q={class:"v-item-top g-flex-justify-between g-flex-align-center"},A={class:"v-item-top-title g-flex-align-center"},K=["src"],Q={class:"v-item-top-status g-flex-align-center"},X=t("i",{class:"iconfont icon-you"},null,-1),tt={class:"cw-content"},st={class:"v-bottom-list-item"},it={class:"v-bottom-list-item-title"},et={class:"v-bottom-list-item-val"},ot={class:"v-bottom-list-item"},lt={class:"v-bottom-list-item-title"},at={class:"v-bottom-list-item-val"},nt={class:"v-bottom-list-item"},ct={class:"v-bottom-list-item-title"},dt={class:"v-bottom-list-item-val"},_t={class:"v-bottom-list-item"},vt={class:"v-bottom-list-item-title"},rt={class:"v-bottom-list-item-val"},mt={class:"v-bottom-list-item"},ut={class:"v-bottom-list-item-title"},ht={class:"v-bottom-list-item-val"},ft={class:"v-bottom-list-item"},gt={class:"v-bottom-list-item-title"},bt={class:"v-bottom-list-item-val"},xt={class:"v-bottom-list-item"},pt={class:"v-bottom-list-item-title"},yt={class:"v-bottom-list-item-val"},Tt={class:"v-bottom-list-item"},wt={class:"v-bottom-list-item-title"},Nt={__name:"LiangHuaHistory",setup(Lt){const L=D(),r=P(),o=g(()=>r.tm("lianghuaHistory")),m=g(()=>r.tm("gongyong"));let n=d(!1),u=d(!1),h=b({page:1,limit:30,status:1}),c=b({list:[]});d(1),f();function H(){h.page++,f()}async function f(){L.loadingShow=!0;const{success:l,data:a}=await B(h);!l||(c.list=c.list.concat(a.list),n.value=!1,u.value=!a.list.length,console.log(a))}function N(l){if(l==0)return o.value.statusFailText;if(l==1)return o.value.statusSuccessText;if(l==2)return o.value.statusIngText;if(l==3)return o.value.statusWaitText}return(l,a)=>{const k=x("van-list"),C=x("NoList");return _(),v("div",$,[t("div",E,[t("div",{onClick:a[0]||(a[0]=s=>l.$router.go(-1)),class:"new-head-back"},U)]),t("div",W,i(e(o).titleText),1),t("div",Y,[t("div",Z,[p(T(k,{class:"v-list",loading:e(n),"onUpdate:loading":a[1]||(a[1]=s=>I(n)?n.value=s:n=s),finished:e(u),"loading-text":e(m).loadingText,"finished-text":e(m).finishText,onLoad:H,"immediate-check":!1},{default:F(()=>[(_(!0),v(M,null,R(e(c).list,(s,S)=>(_(),v("div",{key:S,class:"v-list-item"},[t("div",q,[t("div",A,[t("img",{src:s.icon,alt:""},null,8,K),V(" "+i(s.currency),1)]),t("div",Q,[t("span",{class:w(e(j)(s.status))},i(N(s.status)),3),X])]),t("div",tt,[t("div",st,[t("div",it,i(e(o).zhixingcangweiText),1),t("div",et,i(s.amount),1)]),t("div",ot,[t("div",lt,i(e(o).buyPlatText),1),t("div",at,i(s.buy_platform),1)]),t("div",nt,[t("div",ct,i(e(o).buyPriceText),1),t("div",dt,i(s.buy_price),1)]),t("div",_t,[t("div",vt,i(e(o).timeText),1),t("div",rt,i(e(z)(s.create_time,"MM/DD HH:mm:ss")),1)]),t("div",mt,[t("div",ut,i(e(o).sellePlatText),1),t("div",ht,i(s.sell_platform),1)]),t("div",ft,[t("div",gt,i(e(o).sellPirceText),1),t("div",bt,i(s.sell_price),1)]),t("div",xt,[t("div",pt,i(e(o).fuwufeiText),1),t("div",yt,i(s.fee),1)]),t("div",Tt,[t("div",wt,i(e(o).lirunText),1),t("div",{class:w(["v-bottom-list-item-val",e(G)(Number(s.profit))])},i(Number(s.profit)>=0?"+"+s.profit:s.profit),3)])])]))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[y,e(c).list.length]]),p(T(C,null,null,512),[[y,!e(c).list.length]])])])])}}};export{Nt as default};
