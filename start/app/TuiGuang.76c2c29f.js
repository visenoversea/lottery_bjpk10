import{s as B,u as D,c as x,g as v,r as h,o as y,a as j,e as c,k as S,b as t,d as e,t as i,j as E,m as O,E as V,f as Q,C as G,aF as W,p as F,v as U,W as J,aG as K,af as I,F as X,G as Y,am as Z,aH as z}from"./main.0795c4c3.js";import{v as tt}from"./vue-qr.3c4d19ae.js";import"./index.d8bd6c33.js";const et=""+new URL("../img/icon/promote_bg_btn.png",import.meta.url).href;const it={class:"s_tuiguang_code_pop"},st={class:"s-pop-container"},nt=t("i",{class:"iconfont icon-guanbi"},null,-1),lt=[nt],ot={class:"s-pop-head g-flex-align-center"},at={class:"s-pop-head-left g-flex-align-center"},dt=["src"],ct={class:"s-pop-head-right"},ut={class:"s-pop-head-right-title g-flex-align-center"},gt=["src"],rt={class:"s-pop-head-right-address"},vt={class:"s-pop-bottom"},_t={class:"s-pop-bottom-qrcode"},mt=t("div",{class:"s-pop-bottom-text g-flex-justify-center g-flex-align-center"},[t("span",null,"\u626B\u63CF\u4E8C\u7EF4\u7801\u5373\u53EF\u6CE8\u518C")],-1),ft={__name:"TuiGuanCodePop",props:{address:{type:String,defaule(){return""}}},setup(b,{expose:u}){const m=B(),s=D();x(()=>s.tm("tuiguang")),x(()=>s.tm("gongyong"));let o=v(!1);function d(){o.value=!0}function f(){o.value=!1}let g=v(5);return u({onShow:d}),(r,T)=>{const p=h("van-popup");return y(),j("div",it,[c(p,{"safe-area-inset-bottom":"",class:"s-pop",show:e(o),"onUpdate:show":T[0]||(T[0]=k=>V(o)?o.value=k:o=k),position:"center"},{default:S(()=>[t("div",st,[t("div",{onClick:f,class:"s-pop-close"},lt),t("div",ot,[t("div",at,[t("img",{src:e(m).banner.logo[0],alt:""},null,8,dt)]),t("div",ct,[t("div",ut,[t("img",{src:e(m).banner.logo[2],alt:""},null,8,gt)]),t("div",rt,[t("span",null,i(b.address),1)])])]),t("div",vt,[t("div",_t,[b.address?(y(),E(tt,{key:0,correctLevel:3,logoScale:.2,logoBackgroundColor:"#fff",logoCornerRadius:0,logoMargin:3,logoSrc:"/img/logo.png",ref:"refVueQr",text:b.address,margin:e(g),size:130},null,8,["logoScale","text","margin"])):O("",!0)]),mt])])]),_:1},8,["show"])])}}};const pt={class:"v_tui_guang g-flex-column"},ht={class:"v-head g-flex-justify-center g-flex-align-center"},xt=t("i",{class:"iconfont icon-zuojiantou"},null,-1),yt=[xt],bt={class:"v-title g-flex-align-center g-flex-justify-center"},Tt={class:"v-tui-guang-container g-flex-column"},kt={class:"v-tuiguang-top g-flex-align-center"},Ct={class:"v-tuiguang-top-left"},jt={class:"v-tuiguang-top-left-title"},$t={class:"v-tuiguang-top-left-tips"},wt=t("i",{class:"iconfont icon-icon_arrow_right"},null,-1),Gt={class:"v-tuiguang-middle"},St={class:"v-middle-title-box"},Nt={class:"v-middle-title"},Lt={class:"v-middle-title-tips-list g-flex-align-center"},Ft={class:"v-middle-title-tips-item g-flex-align-center"},Ut={class:"v-middle-title-tips-item-title"},It={class:"v-middle-title-tips-item-val"},Bt={class:"v-middle-title-tips-item g-flex-align-center"},Dt={class:"v-middle-title-tips-item-title"},Vt={class:"v-middle-title-tips-item-val"},zt={class:"v-middle-list g-flex-align-center"},Ht={class:"v-middle-list-item g-flex-column g-flex-align-center"},Mt={class:"v-middle-list-item-val"},Pt={class:"v-middle-list-item-title"},Rt={class:"v-middle-list-item g-flex-column g-flex-align-center"},qt={class:"v-middle-list-item-val"},At={class:"v-middle-list-item-title"},Et={class:"v-middle-list-item g-flex-column g-flex-align-center"},Ot={class:"v-middle-list-item-val"},Qt={class:"v-middle-list-item-title"},Wt={class:"v-middle-invite g-flex-justify-between g-flex-align-center"},Jt={class:"v-middle-invite-left g-flex-align-center"},Kt={class:"v-middle-invite-left-title"},Xt={class:"v-middle-invite-left-val"},Yt=t("img",{src:z,alt:""},null,-1),Zt=[Yt],te={class:"v-middle-invite g-flex-justify-between g-flex-align-center"},ee={class:"v-middle-invite-left g-flex-align-center"},ie={class:"v-middle-invite-left-title"},se={class:"v-middle-invite-left-val"},ne=t("img",{src:z,alt:""},null,-1),le=[ne],oe={class:"v-middle-share g-flex-align-center"},ae={class:"v-middle-share-left"},de=t("img",{src:et,alt:""},null,-1),ce={class:"v-middle-share-left-btn-text"},ue=t("i",{class:"iconfont icon-erweima1688"},null,-1),ge=[ue],re={class:"v-tuiguang-bottom"},ve={class:"v-tuiguang-bottom-title"},_e={class:"v-tuiguang-bottom-title-list g-flex-align-center"},me={class:"v-tuiguang-bottom-title-item g-flex-align-center"},fe={class:"v-tuiguang-bottom-title-item g-flex-justify-center g-flex-align-center"},pe={class:"v-tuiguang-bottom-title-item g-flex-align-center g-flex-justify-end"},he={class:"v-tuiguang-bottom-list-box"},xe={class:"v-tuiguang-bottom-item-content g-flex-align-center"},ye={class:"v-tuiguang-bottom-item-content v-tuiguang-bottom-item-content-money g-flex-align-center g-flex-justify-center"},be={class:"v-tuiguang-bottom-item-content g-flex-align-center g-flex-justify-end"},je={__name:"TuiGuang",setup(b){Q();const u=B(),m=D(),s=x(()=>m.tm("tuiguang")),o=x(()=>m.tm("gongyong"));let d=v(!1),f=v(!1),g=G({page:1,limit:30,layer:1}),r=G({list:[]});p();function T(){g.page++,p()}async function p(){u.loadingShow=!0;const{success:a,data:n}=await W(g);!a||(r.list=r.list.concat(n.list),d.value=!1,f.value=!n.list.length,console.log(n))}function k(){g.page=1,r.list=[],d.value=!1,f.value=!1,p()}let N=v(null);function L(){N.value.onShow()}x(()=>u.userInfo);let C=v(""),$=v("");async function H(){u.loadingShow=!0;const{success:a,data:n}=await J();!a||(u.setUserInfo(n.info),C.value=n.info.promoteUrl,$.value=n.info.tid)}H();let _=G({obj:{agent1:0,agent2:0,agent3:0,agentNums:0,totalAmount:0}});async function M(){u.loadingShow=!0;const{success:a,data:n}=await K();!a||(_.obj=n.info)}return M(),(a,n)=>{const w=h("van-tab"),P=h("van-tabs"),R=h("van-list"),q=h("NoList");return y(),j("div",pt,[t("div",ht,[t("div",{onClick:n[0]||(n[0]=l=>a.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},yt),t("span",bt,i(e(s).titleText),1)]),t("div",Tt,[t("div",kt,[t("div",Ct,[t("div",jt,[t("span",null,i(e(s).inviteFriendText),1)]),t("div",$t,[t("span",null,i(e(s).inviteFriendTipsText),1)])]),t("div",{onClick:n[1]||(n[1]=l=>a.$router.push({name:"rule",query:{id:5}})),class:"v-tuiguang-top-right g-flex-align-center"},[t("span",null,i(e(s).seeGuizeText),1),wt])]),t("div",Gt,[t("div",St,[t("div",Nt,[t("span",null,i(e(s).myTuiguangText),1)]),t("div",Lt,[t("div",Ft,[t("div",Ut,[t("span",null,i(e(s).myTuiguangNumsText)+"\uFF1A",1)]),t("div",It,[t("span",null,i(e(_).obj.agentNums),1)])]),t("div",Bt,[t("div",Dt,[t("span",null,i(e(s).tuiguangShouyiText)+"\uFF1A",1)]),t("div",Vt,[t("span",null,i(e(_).obj.totalAmount),1)])])])]),t("div",zt,[t("div",Ht,[t("div",Mt,[t("span",null,i(e(_).obj.agent1),1)]),t("div",Pt,[t("span",null,i(e(s).yidaiNumsText),1)])]),t("div",Rt,[t("div",qt,[t("span",null,i(e(_).obj.agent2),1)]),t("div",At,[t("span",null,i(e(s).erdaiNumsText),1)])]),t("div",Et,[t("div",Ot,[t("span",null,i(e(_).obj.agent3),1)]),t("div",Qt,[t("span",null,i(e(s).sandaiNumsText),1)])])]),t("div",Wt,[t("div",Jt,[t("div",Kt,i(e(s).myinviteCodeText)+": ",1),t("div",Xt,i(e($)),1)]),t("div",{onClick:n[2]||(n[2]=l=>e(I)(e($))),class:"v-middle-invite-right"},Zt)]),t("div",te,[t("div",ee,[t("div",ie,i(e(s).tuiguangLinkText)+": ",1),t("div",se,i(e(C)),1)]),t("div",{onClick:n[3]||(n[3]=l=>e(I)(e(C))),class:"v-middle-invite-right"},le)]),t("div",oe,[t("div",ae,[t("div",{onClick:L,class:"v-middle-share-left-btn"},[de,t("div",ce,i(e(s).clickShareText),1)])]),t("div",{onClick:L,class:"v-middle-share-right g-flex-align-center g-flex-justify-center"},ge)]),t("div",{onClick:n[4]||(n[4]=l=>a.$router.push({name:"tuiguangdetail"})),class:"v-middle-deail-btn g-flex-align-center g-flex-justify-center"},[t("span",null,i(e(s).yongjingDetailText),1)])]),t("div",re,[t("div",ve,[t("span",null,i(e(s).myTuiguangText),1)]),c(P,{"line-height":"3px",background:"#fff",color:"#FF2742","title-inactive-color":"#7f8aa1","title-active-color":"#FF2742",class:"v-tuiguang-nav-list g-flex-align-center",onChange:k,ellipsis:!1,active:e(g).layer,"onUpdate:active":n[5]||(n[5]=l=>e(g).layer=l)},{default:S(()=>[c(w,{"title-class":"v-tuiguang-nav-list-item-title",name:1,title:e(s).yidaiText},null,8,["title"]),c(w,{"title-class":"v-tuiguang-nav-list-item-title",name:2,title:e(s).erdaiText},null,8,["title"]),c(w,{"title-class":"v-tuiguang-nav-list-item-title",name:3,title:e(s).sandaiText},null,8,["title"])]),_:1},8,["active"]),t("div",_e,[t("div",me,[t("span",null,i(e(s).useridText),1)]),t("div",fe,[t("span",null,i(e(s).fanyongMoneyText),1)]),t("div",pe,[t("span",null,i(e(s).zhuceTimeText),1)])]),t("div",he,[F(c(R,{class:"v-list",loading:e(d),"onUpdate:loading":n[6]||(n[6]=l=>V(d)?d.value=l:d=l),finished:e(f),"loading-text":e(o).loadingText,"finished-text":e(o).finishText,onLoad:T,"immediate-check":!1},{default:S(()=>[(y(!0),j(X,null,Y(e(r).list,(l,A)=>(y(),j("div",{class:"v-tuiguang-bottom-item g-flex-align-center",key:A},[t("div",xe,[t("span",null,i(l.id),1)]),t("div",ye,[t("span",null,i(l.amount)+" USDT",1)]),t("div",be,[t("span",null,i(e(Z)(l.create_time,"yyyy/MM/dd")),1)])]))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[U,e(r).list.length]]),F(c(q,null,null,512),[[U,!e(r).list.length]])])])]),c(ft,{address:e(C),ref_key:"refTuiGuanCodePop",ref:N},null,8,["address"])])}}};export{je as default};
