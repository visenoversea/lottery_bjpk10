import{f as P,E as W,s as X,u as tt,c as S,g as Z,F as N,au as et,av as st,r as h,o as p,a as x,b as t,t as c,d as e,e as d,k as T,p as f,v,J as B,aw as it,Q as D,ax as q,ay as nt,M as A,N as G,Z as lt,a8 as R,O as at,I as ot,az as ct}from"./main.528575c5.js";const dt={class:"v_msg_center g-flex-column n-bg"},ut={class:"new-head"},rt=t("img",{src:ot,alt:""},null,-1),ft=[rt],vt={class:"new-head_title_text"},gt={class:"v-msg-container g-flex-column"},mt={class:"v-msg-nav-box"},_t={class:"v-msg-list"},ht=["onClick"],pt={class:"v-item-left g-flex-align-center"},xt={class:"v-item-left-icon"},yt={class:"v-item-left-content"},Ct={class:"v-item-left-title"},kt={class:"v-item-left-time"},wt=["onClick"],bt=t("i",{class:"iconfont icon-shanchu1"},null,-1),Nt=[bt],Tt={class:"v-msg-list"},Dt=["onClick"],Lt={class:"v-item-left g-flex-align-center"},Ht={class:"v-item-left-content"},Yt={class:"v-item-left-title"},It={class:"v-item-left-title v-item-left-des"},Mt={class:"v-item-left-time"},St={class:"v-msg-btn-list g-flex-align-center"},qt={__name:"MsgCenter",setup(Zt){const $=P(),L=W(),m=X(),H=tt(),u=S(()=>H.tm("msgCenter")),y=S(()=>H.tm("gongyong"));let a=Z(!1),_=Z(!1),l=N({type:L.query.type?Number(L.query.type):1,page:1,limit:30}),o=N({list:[]});l.type==1?k():w();function j(){l.page++,k()}async function k(){m.loadingShow=!0;const{success:n,data:s}=await et(l);!n||(o.list=o.list.concat(s.list),a.value=!1,_.value=!s.list.length,console.log(s))}function U(n){$.push({name:"msgdetail",query:{id:n.id}})}async function z(){m.loadingShow=!0;const{success:n,data:s}=await it();!n||(D.success(s.msg),o.list=o.list.map(r=>(r.is_read=1,r)))}function E(){l.page=1,o.list=[],g.list=[],a.value=!0,_.value=!1,l.type==1?k():w()}function F(){q.confirm({title:"",message:u.value.delAllTipsText,cancelButtonColor:"#000",confirmButtonColor:"#5488f7"}).then(()=>{O()}).catch(()=>{})}async function O(){m.loadingShow=!0;const{success:n,data:s}=await nt();!n||(D.success(s.msg),o.list=[])}function V(n,s){q.confirm({title:"",message:u.value.delItemTipsText,cancelButtonColor:"#000",confirmButtonColor:"#5488f7"}).then(()=>{J(n,s)}).catch(()=>{})}async function J(n,s){m.loadingShow=!0;const{success:r,data:b}=await ct({id:n.id});!r||(D.success(b.msg),o.list.splice(s,1))}let g=N({list:[]});async function w(){m.loadingShow=!0;const{success:n,data:s}=await st(l);!n||(g.list=g.list.concat(s.list),a.value=!1,_.value=!s.list.length)}function Q(){l.page++,w()}return(n,s)=>{const r=h("van-tab"),b=h("van-tabs"),K=h("van-icon"),Y=h("van-list"),I=h("NoList");return p(),x("div",dt,[t("div",ut,[t("div",{onClick:s[0]||(s[0]=i=>n.$router.go(-1)),class:"new-head-back"},ft)]),t("div",vt,c(e(u).titleText),1),t("div",gt,[t("div",mt,[d(b,{onChange:E,color:"#fff","title-inactive-color":"#fff","title-active-color":"#fff",background:"#202021",class:"v-msg-nav-list",active:e(l).type,"onUpdate:active":s[1]||(s[1]=i=>e(l).type=i)},{default:T(()=>[d(r,{class:"v-msg-nav-item",title:e(u).noticeText,name:1},null,8,["title"]),d(r,{class:"v-msg-nav-item",title:e(u).xiaoxigonggaoText,name:2},null,8,["title"])]),_:1},8,["active"])]),f(t("div",_t,[f(d(Y,{class:"v-list",loading:e(a),"onUpdate:loading":s[2]||(s[2]=i=>B(a)?a.value=i:a=i),finished:e(_),"loading-text":e(y).loadingText,"finished-text":e(y).finishText,onLoad:j,"immediate-check":!1},{default:T(()=>[(p(!0),x(A,null,G(e(o).list,(i,C)=>(p(),x("div",{onClick:M=>U(i),class:lt([i.is_read==0?"v-noread":"","v-list-item g-flex-align-center"]),key:C},[t("div",pt,[t("div",xt,[d(K,{name:"comment-circle"})]),t("div",yt,[t("div",Ct,[t("span",null,c(i.title),1)]),t("div",kt,[t("span",null,c(e(R)(i.create_time,"YYYY-MM-DD HH:mm")),1)])])]),t("div",{onClick:at(M=>V(i,C),["stop"]),class:"v-item-right"},Nt,8,wt)],10,ht))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[v,e(o).list.length]]),f(d(I,null,null,512),[[v,!e(o).list.length]])],512),[[v,e(l).type==1]]),f(t("div",Tt,[f(d(Y,{class:"v-list",loading:e(a),"onUpdate:loading":s[3]||(s[3]=i=>B(a)?a.value=i:a=i),finished:e(_),"loading-text":e(y).loadingText,"finished-text":e(y).finishText,onLoad:Q,"immediate-check":!1},{default:T(()=>[(p(!0),x(A,null,G(e(g).list,(i,C)=>(p(),x("div",{onClick:M=>n.$router.push({name:"noticedetail",query:{id:i.id}}),class:"v-list-item g-flex-align-center",key:C},[t("div",Lt,[t("div",Ht,[t("div",Yt,[t("span",null,c(i.title),1)]),t("div",It,[t("span",null,c(i.des),1)]),t("div",Mt,[t("span",null,c(e(R)(i.create_time,"YYYY/MM/DD HH:mm")),1)])])])],8,Dt))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[v,e(g).list.length]]),f(d(I,null,null,512),[[v,!e(g).list.length]])],512),[[v,e(l).type==2]]),f(t("div",St,[t("div",{onClick:F,class:"v-msg-btn-item v-msg-btn-item-del g-flex-align-center g-flex-justify-center"},[t("span",null,c(e(u).quanbuShanChuText),1)]),t("div",{onClick:z,class:"v-msg-btn-item g-flex-align-center g-flex-justify-center"},[t("span",null,c(e(u).quanbuYiDuText),1)])],512),[[v,e(l).type==1&&e(o).list.length]])])])}}};export{qt as default};
