import{u as P,D as W,s as X,v as tt,c as S,e as q,E as N,al as et,am as st,r as h,o as p,a as x,b as t,t as c,d,j as D,h as n,m as v,p as f,H as B,an as nt,V as T,ao as Z,ap as it,K as A,M as G,Q as lt,N as j,aq as at,_ as ot,ar as ct}from"./main.26c763da.js";const dt={class:"v_msg_center g-flex-column n-bg"},ut={class:"new-head"},rt=t("img",{src:ot,alt:""},null,-1),vt=[rt],ft={class:"new-head_title_text"},mt={class:"v-msg-container g-flex-column"},gt={class:"v-msg-nav-box"},_t={class:"v-msg-list"},ht=["onClick"],pt={class:"v-item-left g-flex-align-center"},xt={class:"v-item-left-icon"},yt={class:"v-item-left-content"},Ct={class:"v-item-left-title"},kt={class:"v-item-left-time"},bt=["onClick"],wt=t("i",{class:"iconfont icon-shanchu1"},null,-1),Nt=[wt],Dt={class:"v-msg-list"},Tt=["onClick"],Lt={class:"v-item-left g-flex-align-center"},Ht={class:"v-item-left-content"},Yt={class:"v-item-left-title"},It={class:"v-item-left-title v-item-left-des"},Mt={class:"v-item-left-time"},St={class:"v-msg-btn-list g-flex-align-center"},Zt={__name:"MsgCenter",setup(qt){const R=P(),L=W(),g=X(),H=tt.exports.useI18n(),u=S(()=>H.tm("msgCenter")),y=S(()=>H.tm("gongyong"));let a=q(!1),_=q(!1),l=N({type:L.query.type?Number(L.query.type):1,page:1,limit:30}),o=N({list:[]});l.type==1?k():b();function $(){l.page++,k()}async function k(){g.loadingShow=!0;const{success:i,data:e}=await et(l);!i||(o.list=o.list.concat(e.list),a.value=!1,_.value=!e.list.length,console.log(e))}function U(i){R.push({name:"msgdetail",query:{id:i.id}})}async function V(){g.loadingShow=!0;const{success:i,data:e}=await nt();!i||(T.success(e.msg),o.list=o.list.map(r=>(r.is_read=1,r)))}function E(){l.page=1,o.list=[],m.list=[],a.value=!0,_.value=!1,l.type==1?k():b()}function z(){Z.confirm({title:"",message:u.value.delAllTipsText,cancelButtonColor:"#000",confirmButtonColor:"#5488f7"}).then(()=>{F()}).catch(()=>{})}async function F(){g.loadingShow=!0;const{success:i,data:e}=await it();!i||(T.success(e.msg),o.list=[])}function K(i,e){Z.confirm({title:"",message:u.value.delItemTipsText,cancelButtonColor:"#000",confirmButtonColor:"#5488f7"}).then(()=>{O(i,e)}).catch(()=>{})}async function O(i,e){g.loadingShow=!0;const{success:r,data:w}=await ct({id:i.id});!r||(T.success(w.msg),o.list.splice(e,1))}let m=N({list:[]});async function b(){g.loadingShow=!0;const{success:i,data:e}=await st(l);!i||(m.list=m.list.concat(e.list),a.value=!1,_.value=!e.list.length)}function Q(){l.page++,b()}return(i,e)=>{const r=h("van-tab"),w=h("van-tabs"),J=h("van-icon"),Y=h("van-list"),I=h("NoList");return p(),x("div",dt,[t("div",ut,[t("div",{onClick:e[0]||(e[0]=s=>i.$router.go(-1)),class:"new-head-back"},vt)]),t("div",ft,c(u.value.titleText),1),t("div",mt,[t("div",gt,[d(w,{onChange:E,color:"#fff","title-inactive-color":"#fff","title-active-color":"#fff",background:"#202021",class:"v-msg-nav-list",active:n(l).type,"onUpdate:active":e[1]||(e[1]=s=>n(l).type=s)},{default:D(()=>[d(r,{class:"v-msg-nav-item",title:u.value.noticeText,name:1},null,8,["title"]),d(r,{class:"v-msg-nav-item",title:u.value.xiaoxigonggaoText,name:2},null,8,["title"])]),_:1},8,["active"])]),v(t("div",_t,[v(d(Y,{class:"v-list",loading:n(a),"onUpdate:loading":e[2]||(e[2]=s=>B(a)?a.value=s:a=s),finished:n(_),"loading-text":y.value.loadingText,"finished-text":y.value.finishText,onLoad:$,"immediate-check":!1},{default:D(()=>[(p(!0),x(A,null,G(n(o).list,(s,C)=>(p(),x("div",{onClick:M=>U(s),class:lt([s.is_read==0?"v-noread":"","v-list-item g-flex-align-center"]),key:C},[t("div",pt,[t("div",xt,[d(J,{name:"comment-circle"})]),t("div",yt,[t("div",Ct,[t("span",null,c(s.title),1)]),t("div",kt,[t("span",null,c(n(j)(s.create_time,"YYYY-MM-DD HH:mm")),1)])])]),t("div",{onClick:at(M=>K(s,C),["stop"]),class:"v-item-right"},Nt,8,bt)],10,ht))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[f,n(o).list.length]]),v(d(I,null,null,512),[[f,!n(o).list.length]])],512),[[f,n(l).type==1]]),v(t("div",Dt,[v(d(Y,{class:"v-list",loading:n(a),"onUpdate:loading":e[3]||(e[3]=s=>B(a)?a.value=s:a=s),finished:n(_),"loading-text":y.value.loadingText,"finished-text":y.value.finishText,onLoad:Q,"immediate-check":!1},{default:D(()=>[(p(!0),x(A,null,G(n(m).list,(s,C)=>(p(),x("div",{onClick:M=>i.$router.push({name:"noticedetail",query:{id:s.id}}),class:"v-list-item g-flex-align-center",key:C},[t("div",Lt,[t("div",Ht,[t("div",Yt,[t("span",null,c(s.title),1)]),t("div",It,[t("span",null,c(s.des),1)]),t("div",Mt,[t("span",null,c(n(j)(s.create_time,"YYYY/MM/DD HH:mm")),1)])])])],8,Tt))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[f,n(m).list.length]]),v(d(I,null,null,512),[[f,!n(m).list.length]])],512),[[f,n(l).type==2]]),v(t("div",St,[t("div",{onClick:z,class:"v-msg-btn-item v-msg-btn-item-del g-flex-align-center g-flex-justify-center"},[t("span",null,c(u.value.quanbuShanChuText),1)]),t("div",{onClick:V,class:"v-msg-btn-item g-flex-align-center g-flex-justify-center"},[t("span",null,c(u.value.quanbuYiDuText),1)])],512),[[f,n(l).type==1&&n(o).list.length]])])])}}};export{Zt as default};
