import{s as j,u as C,c as D,g as p,F as H,r as K,o as _,a as m,e as L,k as N,b as t,t as s,d as e,J as W,bg as P,Q as M,E as q,bh as J,M as Y,N as E,Z as I,a8 as $,p as x,v as b,m as O,I as V}from"./main.a558085a.js";const z={class:"s_wakuang_order_list_pop"},R={class:"s-pop-content"},G={class:"s-pop-content-item g-flex-align-center"},Q={class:"s-pop-content-item-left"},Z={class:"s-pop-content-item-right"},A={class:"s-pop-content-item g-flex-align-center"},X={class:"s-pop-content-item-left"},tt={class:"s-pop-content-item-right"},st={class:"s-pop-content-item g-flex-align-center"},et={class:"s-pop-content-item-left"},it={class:"s-pop-content-item-right"},ot={class:"s-pop-content-item g-flex-align-center"},nt={class:"s-pop-content-item-left"},at={class:"s-pop-content-item-right"},lt={class:"s-pop-content-item-right-now-profit"},ct=t("span",null," 0 USDT ",-1),ut={__name:"WaKuangOrderListPop",emits:["emitShuHuiSuccess"],setup(F,{expose:y,emit:g}){const o=j(),f=C(),a=D(()=>f.tm("waKuangOrderListPop"));let r=p(!1);p("");let u=H({obj:{}});function v(l){u.obj=l,r.value=!0}function h(){r.value=!1}function T(l){return l.lastDay*Number(l.bc_rate)*Number(l.amount)}function k(l){let c=T(l);return l.amount-c}async function w(){o.loadingShow=!0;const{success:l,data:c}=await P({id:u.obj.id});!l||(console.log(c),M(c.msg),g("emitShuHuiSuccess"),h())}return y({onShow:v}),(l,c)=>{const S=K("van-popup");return _(),m("div",z,[L(S,{class:"s-pop","close-on-click-overlay":!1,style:{width:"90%"},show:e(r),"onUpdate:show":c[0]||(c[0]=n=>W(r)?r.value=n:r=n),position:"center"},{default:N(()=>[t("i",{onClick:h,class:"iconfont icon-shanchu2"}),t("div",R,[t("div",G,[t("div",Q,s(e(a).shuhuiMoneyText),1),t("div",Z,s(e(u).obj.amount)+" USDT ",1)]),t("div",A,[t("div",X,s(e(a).lastdayText),1),t("div",tt,s(e(u).obj.lastDay),1)]),t("div",st,[t("div",et,s(e(a).tuihuanBenjinText),1),t("div",it,s(k(e(u).obj).toFixed(2))+" USDT ",1)]),t("div",ot,[t("div",nt,s(e(a).shouyiText),1),t("div",at,[t("span",lt,s(e(u).obj.profit_amount)+" USDT ",1),ct])]),t("div",{onClick:w,class:"s-pop-btn s-pop-btn-submit g-flex-justify-center g-flex-align-center"},s(e(a).shuhuiText),1),t("div",{onClick:h,class:"s-pop-btn s-pop-btn-cancel g-flex-justify-center g-flex-align-center"},s(e(a).cancelText),1)])]),_:1},8,["show"])])}}};const rt={class:"v_wakuang_order_list g-flex-column n-bg"},dt={class:"new-head"},_t=t("img",{src:V,alt:""},null,-1),mt=[_t],vt={class:"new-head_title_text"},ht={class:"v-wakuang-order-container"},pt={class:"v-item-top g-flex-justify-between g-flex-align-center"},gt={class:"v-item-top-left"},ft={class:"v-item-bottom-list g-flex-align-center"},xt={class:"v-bottom-list-item g-flex-column"},bt={class:"v-bottom-list-item-title"},yt={class:"v-bottom-list-item-val"},Tt={class:"v-bottom-list-item g-flex-column"},kt={class:"v-bottom-list-item-title"},wt={key:0,class:"v-bottom-list-item-val"},St={key:1,class:"v-bottom-list-item-val"},$t={class:"v-bottom-list-item g-flex-column g-flex-align-end"},Dt={class:"v-bottom-list-item-title"},Ht={class:"v-bottom-list-item-val"},Lt={class:"v-item-bottom-list g-flex-align-center"},Ot={class:"v-bottom-list-item g-flex-column"},jt={class:"v-bottom-list-item-title"},Ct={class:"v-bottom-list-item-val"},Kt={class:"v-bottom-list-item g-flex-column"},Nt={class:"v-bottom-list-item-title"},Wt={class:"v-bottom-list-item-val"},Mt={class:"v-bottom-list-item g-flex-column"},Ft={class:"v-bottom-list-item-title"},Ut={class:"v-bottom-list-item-val"},Bt={key:0,class:"v-bottom-list-item g-flex-column g-flex-align-end"},Pt={class:"v-bottom-list-item-title"},qt={class:"v-bottom-list-item-val"},Jt={key:1,class:"v-bottom-list-item g-flex-column g-flex-align-end"},Yt={class:"v-bottom-list-item-title"},Et={class:"v-bottom-list-item-val"},It={class:"v-item-bottom-list g-red g-flex-align-center"},Vt={class:"v-bottom-list-item v-bottom-list-item-fail-reason g-flex-align-center"},zt={class:"v-item-btn-list g-flex-justify-end"},Rt=["onClick"],Zt={__name:"WaKuangOrderList",setup(F){j();const y=q(),g=C(),o=D(()=>g.tm("waKuangOrderList")),f=D(()=>g.tm("gongyong"));let a=p(!1),r=p(!1),u=H({page:1,limit:30,type:Number(y.query.type)||1}),v=H({list:[]});function h(n){if(n==0)return o.value.shenheshibaiText;if(n==1)return o.value.suocangIngText;if(n==2)return o.value.yishuhuiText;if(n==3)return o.value.shenhezhongText;if(n==4)return o.value.tiqianShuHuiText}function T(n){if(n==0)return"g-red";if(n==1)return"g-green";if(n==2)return"g-grey";if(n==3)return"g-blue";if(n==4)return"g-yellow"}const k=p(null);function w(n){M(o.value.lianxikefuText)}function l(){u.page++,c()}c();async function c(){const{success:n,data:d}=await J(u);!n||(v.list=v.list.concat(d.list),a.value=!1,r.value=!d.list.length,console.log(d))}function S(){u.page=1,v.list=[],a.value=!1,a.finished=!1,c()}return(n,d)=>{const U=K("van-list");return _(),m("div",rt,[t("div",dt,[t("div",{onClick:d[0]||(d[0]=i=>n.$router.go(-1)),class:"new-head-back"},mt)]),t("div",vt,s(e(o).titleText),1),t("div",ht,[L(U,{class:"v-list",loading:e(a),"onUpdate:loading":d[1]||(d[1]=i=>W(a)?a.value=i:a=i),finished:e(r),"loading-text":e(f).loadingText,"finished-text":e(f).finishText,onLoad:l,"immediate-check":!1},{default:N(()=>[(_(!0),m(Y,null,E(e(v).list,(i,B)=>(_(),m("div",{class:"v-item",key:B},[t("div",pt,[t("div",gt,s(i.title)+s(e(o).suochangText)+"/"+s(i.day)+" "+s(e(o).dayText),1),t("div",{class:I([T(i.status),"v-item-top-right"])},s(h(i.status)),3)]),t("div",ft,[t("div",xt,[t("p",bt,s(e(o).suocangMoneyText),1),t("span",yt,s(i.amount)+s(i.currency),1)]),t("div",Tt,[t("p",kt,s(e(o).rishouyiLvText),1),i.min_rate==i.max_rate?(_(),m("span",wt,s((Number(i.min_rate)*100).toFixed(2))+"%",1)):(_(),m("span",St,s((Number(i.min_rate)*100).toFixed(2))+" - "+s((Number(i.max_rate)*100).toFixed(2))+"%",1))]),t("div",$t,[t("p",Dt,s(e(o).suocangDayText),1),t("span",Ht,s(i.day)+" "+s(e(o).dayText),1)])]),t("div",Lt,[t("div",Ot,[t("p",jt,s(e(o).suocangTimeText),1),t("span",Ct,s(e($)(i.create_time,"MM/DD HH:mm")),1)]),x(t("div",Kt,[t("p",Nt,s(e(o).daoqiTimeText),1),t("span",Wt,s(e($)(i.end_time,"MM/DD HH:mm")),1)],512),[[b,i.status==1]]),x(t("div",Mt,[t("p",Ft,s(e(o).shuhuiTimeText),1),t("span",Ut,s(e($)(i.back_time,"MM/DD HH:mm")),1)],512),[[b,i.status==2]]),i.status!=4?(_(),m("div",Bt,[t("p",Pt,s(e(o).shouyiText),1),t("span",qt,s(i.profit_amount)+" "+s(i.currency),1)])):O("",!0),i.status==4?(_(),m("div",Jt,[t("p",Yt,s(e(o).shouyiText),1),t("span",Et,s("0.00")+" "+s(i.currency),1)])):O("",!0)]),x(t("div",It,[t("div",Vt,[t("span",null,s(e(o).shibaiYuanYingText)+":",1),t("span",null,s(i.reason),1)])],512),[[b,i.status==0]]),x(t("div",zt,[t("div",{onClick:Gt=>w(i),class:"v-item-btn-item g-flex-align-center g-flex-justify-center"},[t("span",null,s(e(o).tiqianShuHuiText),1)],8,Rt)],512),[[b,i.status==1]])]))),128))]),_:1},8,["loading","finished","loading-text","finished-text"])]),L(ut,{onEmitShuHuiSuccess:S,ref_key:"refWaKuangOrderListPop",ref:k},null,512)])}}};export{Zt as default};
