import{u as Q,D as W,s as X,v as tt,c as M,e as B,E as N,ar as et,as as st,r as h,o as p,a as x,b as t,t as c,d,j as D,h as i,m as v,p as f,H as Z,at as it,S as T,au as q,av as nt,K as A,M as G,Y as lt,N as j,P as at,_ as ot,aw as ct}from"./main.b5791ad0.js";const dt={class:"v_msg_center g-flex-column n-bg"},ut={class:"new-head"},rt=t("img",{src:ot,alt:""},null,-1),vt=[rt],ft={class:"new-head_title_text"},gt={class:"v-msg-container g-flex-column"},mt={class:"v-msg-nav-box"},_t={class:"v-msg-list"},ht=["onClick"],pt={class:"v-item-left g-flex-align-center"},xt={class:"v-item-left-icon"},yt={class:"v-item-left-content"},Ct={class:"v-item-left-title"},kt={class:"v-item-left-time"},wt=["onClick"],bt=t("i",{class:"iconfont icon-shanchu1"},null,-1),Nt=[bt],Dt={class:"v-msg-list"},Tt=["onClick"],Lt={class:"v-item-left g-flex-align-center"},Ht={class:"v-item-left-content"},Yt={class:"v-item-left-title"},St={class:"v-item-left-title v-item-left-des"},It={class:"v-item-left-time"},Mt={class:"v-msg-btn-list g-flex-align-center"},qt={__name:"MsgCenter",setup(Bt){const R=Q(),L=W(),m=X(),H=tt.exports.useI18n(),u=M(()=>H.tm("msgCenter")),y=M(()=>H.tm("gongyong"));let a=B(!1),_=B(!1),l=N({type:L.query.type?Number(L.query.type):1,page:1,limit:30}),o=N({list:[]});l.type==1?k():w();function $(){l.page++,k()}async function k(){m.loadingShow=!0;const{success:n,data:e}=await et(l);!n||(o.list=o.list.concat(e.list),a.value=!1,_.value=!e.list.length,console.log(e))}function U(n){R.push({name:"msgdetail",query:{id:n.id}})}async function E(){m.loadingShow=!0;const{success:n,data:e}=await it();!n||(T.success(e.msg),o.list=o.list.map(r=>(r.is_read=1,r)))}function V(){l.page=1,o.list=[],g.list=[],a.value=!0,_.value=!1,l.type==1?k():w()}function z(){q.confirm({title:"",message:u.value.delAllTipsText,cancelButtonColor:"#000",confirmButtonColor:"#5488f7"}).then(()=>{F()}).catch(()=>{})}async function F(){m.loadingShow=!0;const{success:n,data:e}=await nt();!n||(T.success(e.msg),o.list=[])}function K(n,e){q.confirm({title:"",message:u.value.delItemTipsText,cancelButtonColor:"#000",confirmButtonColor:"#5488f7"}).then(()=>{O(n,e)}).catch(()=>{})}async function O(n,e){m.loadingShow=!0;const{success:r,data:b}=await ct({id:n.id});!r||(T.success(b.msg),o.list.splice(e,1))}let g=N({list:[]});async function w(){m.loadingShow=!0;const{success:n,data:e}=await st(l);!n||(g.list=g.list.concat(e.list),a.value=!1,_.value=!e.list.length)}function P(){l.page++,w()}return(n,e)=>{const r=h("van-tab"),b=h("van-tabs"),J=h("van-icon"),Y=h("van-list"),S=h("NoList");return p(),x("div",dt,[t("div",ut,[t("div",{onClick:e[0]||(e[0]=s=>n.$router.go(-1)),class:"new-head-back"},vt)]),t("div",ft,c(u.value.titleText),1),t("div",gt,[t("div",mt,[d(b,{onChange:V,color:"#fff","title-inactive-color":"#fff","title-active-color":"#fff",background:"#202021",class:"v-msg-nav-list",active:i(l).type,"onUpdate:active":e[1]||(e[1]=s=>i(l).type=s)},{default:D(()=>[d(r,{class:"v-msg-nav-item",title:u.value.noticeText,name:1},null,8,["title"]),d(r,{class:"v-msg-nav-item",title:u.value.xiaoxigonggaoText,name:2},null,8,["title"])]),_:1},8,["active"])]),v(t("div",_t,[v(d(Y,{class:"v-list",loading:i(a),"onUpdate:loading":e[2]||(e[2]=s=>Z(a)?a.value=s:a=s),finished:i(_),"loading-text":y.value.loadingText,"finished-text":y.value.finishText,onLoad:$,"immediate-check":!1},{default:D(()=>[(p(!0),x(A,null,G(i(o).list,(s,C)=>(p(),x("div",{onClick:I=>U(s),class:lt([s.is_read==0?"v-noread":"","v-list-item g-flex-align-center"]),key:C},[t("div",pt,[t("div",xt,[d(J,{name:"comment-circle"})]),t("div",yt,[t("div",Ct,[t("span",null,c(s.title),1)]),t("div",kt,[t("span",null,c(i(j)(s.create_time,"YYYY-MM-DD HH:mm")),1)])])]),t("div",{onClick:at(I=>K(s,C),["stop"]),class:"v-item-right"},Nt,8,wt)],10,ht))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[f,i(o).list.length]]),v(d(S,null,null,512),[[f,!i(o).list.length]])],512),[[f,i(l).type==1]]),v(t("div",Dt,[v(d(Y,{class:"v-list",loading:i(a),"onUpdate:loading":e[3]||(e[3]=s=>Z(a)?a.value=s:a=s),finished:i(_),"loading-text":y.value.loadingText,"finished-text":y.value.finishText,onLoad:P,"immediate-check":!1},{default:D(()=>[(p(!0),x(A,null,G(i(g).list,(s,C)=>(p(),x("div",{onClick:I=>n.$router.push({name:"noticedetail",query:{id:s.id}}),class:"v-list-item g-flex-align-center",key:C},[t("div",Lt,[t("div",Ht,[t("div",Yt,[t("span",null,c(s.title),1)]),t("div",St,[t("span",null,c(s.des),1)]),t("div",It,[t("span",null,c(i(j)(s.create_time,"YYYY/MM/DD HH:mm")),1)])])])],8,Tt))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[f,i(g).list.length]]),v(d(S,null,null,512),[[f,!i(g).list.length]])],512),[[f,i(l).type==2]]),v(t("div",Mt,[t("div",{onClick:z,class:"v-msg-btn-item v-msg-btn-item-del g-flex-align-center g-flex-justify-center"},[t("span",null,c(u.value.quanbuShanChuText),1)]),t("div",{onClick:E,class:"v-msg-btn-item g-flex-align-center g-flex-justify-center"},[t("span",null,c(u.value.quanbuYiDuText),1)])],512),[[f,i(l).type==1&&i(o).list.length]])])])}}};export{qt as default};
