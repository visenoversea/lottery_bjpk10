import{s as F,v as X,c as T,e as b,E as j,r as k,o as m,a as g,d as x,j as M,b as t,t as s,h as e,N as V,H as I,aT as et,aU as st,W as it,m as p,p as h,X as C,l as W,aV as lt,aW as ot,K as Z,M as E,aX as at,aY as nt,at as ct,_ as dt,ar as ut,aZ as vt,U as _t}from"./main.647ad1fa.js";import{_ as rt}from"./CashoutDetailPop.06492e68.js";const ft={class:"c_cashout_detail_pop"},pt={class:"v-head g-flex-align-center"},ht=t("i",{class:"iconfont icon-zuo"},null,-1),mt=[ht],gt={class:"v-head-title g-flex-align-center g-flex-justify-center"},xt={class:"c-pop-container"},yt={class:"c-pop-content"},bt={class:"c-pop-item g-flex-align-center"},$t={class:"c-pop-item-left"},Ct={class:"c-pop-item-right"},kt={class:"c-pop-item-right-val"},wt={class:"c-pop-item c-pop-item-fail g-flex-align-center"},Tt={class:"c-pop-item-left"},jt={class:"c-pop-item-right"},Ht={class:"c-pop-item-right-val"},Bt={class:"c-pop-item c-pop-item-fail g-flex-align-center"},Dt={class:"c-pop-item-left"},St={class:"c-pop-item-right"},Lt={class:"c-pop-item-right-val"},Nt={class:"c-pop-item c-pop-item-fail g-flex-align-center"},Mt={class:"c-pop-item-left"},Vt={class:"c-pop-item-right"},It={class:"c-pop-item-right-val"},Pt={class:"c-pop-item g-flex-align-center"},Ut={class:"c-pop-item-left"},Gt={class:"c-pop-item-right"},Ot={class:"c-pop-item-right-val"},Rt={class:"c-pop-item g-flex-align-center"},Yt={class:"c-pop-item-left"},zt={class:"c-pop-item-right"},Wt={class:"c-pop-item-right-val"},Zt={__name:"BillDetailPop",props:{typeVal:{type:Number,default(){return 1}}},setup(A,{expose:y}){F();const $=X.exports.useI18n(),u=T(()=>$.tm("mybill"));let d=b(!1),n=j({obj:{}});function H(v){B(v)}async function B(v){const{success:_,data:a}=await et({id:v});!_||(n.obj=a.info,d.value=!0)}function c(){d.value=!1}return y({onShow:H}),(v,_)=>{const a=k("van-popup");return m(),g("div",ft,[x(a,{position:"right","close-on-click-overlay":!1,show:e(d),"onUpdate:show":_[0]||(_[0]=r=>I(d)?d.value=r:d=r),class:"c-pop g-flex-column"},{default:M(()=>[t("div",pt,[t("div",{onClick:c,class:"v-head-back-icon g-flex-align-center"},mt),t("div",gt,[t("span",null,s(u.value.titleText),1)])]),t("div",xt,[t("div",yt,[t("div",bt,[t("div",$t,s(u.value.lotteryType),1),t("div",Ct,[t("span",kt,s(e(n).obj.lottery_name),1)])]),t("div",wt,[t("div",Tt,s(u.value.betNum),1),t("div",jt,[t("span",Ht,s(e(n).obj.lottery_group_name+"-"+e(n).obj.bet_no),1)])]),t("div",Bt,[t("div",Dt,s(u.value.betAmount),1),t("div",St,[t("span",Lt,s(e(n).obj.bet_amount),1)])]),t("div",Nt,[t("div",Mt,s(u.value.winorlose),1),t("div",Vt,[t("span",It,s(e(n).obj.win_amount),1)])]),t("div",Pt,[t("div",Ut,s(u.value.rate),1),t("div",Gt,[t("span",Ot,s(e(n).obj.odds),1)])]),t("div",Rt,[t("div",Yt,s(u.value.timeText),1),t("div",zt,[t("span",Wt,s(e(V)(e(n).obj.create_time)),1)])])])])]),_:1},8,["show"])])}}};const Et={class:"v_my_bill g-flex-column n-bg"},Ft={class:"new-head"},Xt=t("img",{src:dt,alt:""},null,-1),At=[Xt],Kt={class:"new-head_title_text"},qt={class:"v-licai-container-box g-flex-column"},Jt={class:"v-licai-head g-flex-align-center g-flex-justify-center"},Qt={class:"v-licai-head-list g-flex-align-center"},te={class:"v-licai-head-item-title"},ee={class:"v-licai-head-item-title"},se={class:"v-licai-head-item-title"},ie={class:"v-my-bill-container"},le={key:0,class:"v-my-bill-content"},oe=["onClick"],ae={class:"v-list-item-top g-flex-align-center g-flex-justify-between"},ne={class:"v-list-item-top-title"},ce={class:"v-list-item-middle g-flex-align-center"},de={class:"v-list-item-middle-title"},ue={class:"v-list-item-bottom g-flex-justify-between g-flex-align-center"},ve={class:"v-list-item-middle-time"},_e={key:1,class:"v-finance-list-box"},re=["onClick"],fe={class:"v-item-top g-flex-justify-between g-flex-align-center"},pe={class:"v-item-top-title"},he={class:"v-item-top-status g-flex-align-center"},me=t("i",{class:"iconfont icon-you"},null,-1),ge={class:"v-item-bottom-list g-flex-align-center"},xe={class:"v-bottom-list-item"},ye={class:"v-bottom-list-item-val"},be={class:"v-bottom-list-item"},$e={class:"v-bottom-list-item-title"},Ce={class:"v-bottom-list-item-val"},ke={class:"v-bottom-list-item g-flex-column g-flex-align-end"},we={class:"v-bottom-list-item-title"},Te={class:"v-bottom-list-item-val"},je=["onClick"],De={__name:"MyBill",setup(A){const y=F(),$=X.exports.useI18n(),u=T(()=>$.tm("mybill")),d=T(()=>$.tm("gongyong")),n=T(()=>$.tm("finance"));function H(o){ut.confirm({title:"",message:d.value.cehuitikuanTipsText,cancelButtonColor:"#fff",confirmButtonColor:"var(--g-main_color)"}).then(()=>{B(o)}).catch(()=>{})}async function B(o){y.loadingShow=!0;const{success:l,data:L}=await vt({id:o.id});!l||(_t.success(L.success),c.value=!0,v.value=!1,_.page=1,f.list=[],S())}let c=b(!1),v=b(!1),_=j({page:1,limit:30}),a=b(0),r=j({list:[]});w();function K(){_.page++,w()}async function w(){y.loadingShow=!0;const{success:o,data:l}=await st(_);!o||(r.list=r.list.concat(l.list),c.value=!1,v.value=!l.list.length,console.log(l))}function D(o){a.value!=o&&(a.value=o,c.value=!0,v.value=!1,_.page=1,r.list=[],f.list=[],a.value==0?(y.loadingShow=!0,w()):a.value==1?(y.loadingShow=!0,U()):(y.loadingShow=!0,S()))}let P=b(!1),f=j({list:[]});function q(){if(_.page++,a.value==1)return U();S()}async function U(){const{success:o,data:l}=await lt(_);!o||(f.list=f.list.concat(l.list),c.value=!1,P.value=!1,v.value=!l.list.length,console.log(l))}async function S(){const{success:o,data:l}=await ot(_);!o||(f.list=f.list.concat(l.list),P.value=!1,c.value=!1,v.value=!l.list.length,console.log(l))}const G=b(null),O=b(null);function R(o){console.log(a),a.value?G.value.onShow(o):O.value.onShow(o.key_id)}function J(o){if(o==0)return n.value.statusFailText;if(o==1)return n.value.statusSuccessText;if(o==2)return n.value.statusIngText;if(o==3)return n.value.statusWaitText}return(o,l)=>{const L=k("van-icon"),Y=k("van-list"),Q=k("no-list"),tt=k("NoList");return m(),g("div",Et,[t("div",Ft,[t("div",{onClick:l[0]||(l[0]=i=>o.$router.go(-1)),class:"new-head-back"},At)]),t("div",Kt,[it(s(u.value.titleText),1),p(x(L,{onClick:l[1]||(l[1]=i=>w()),color:"#fff",name:"replay",size:"1.5rem"},null,512),[[h,!e(a)]])]),t("div",qt,[t("div",Jt,[t("div",Qt,[t("div",{onClick:l[2]||(l[2]=i=>D(0)),class:C([e(a)==0?"active":"","v-licai-head-item g-flex-justify-center g-flex-align-center"])},[t("div",te,s(u.value.jiangliHistoryText),1)],2),t("div",{onClick:l[3]||(l[3]=i=>D(1)),class:C([e(a)==1?"active":"","v-licai-head-item g-flex-justify-center g-flex-align-center"])},[t("div",ee,s(u.value.rechargeHistoryText),1)],2),t("div",{onClick:l[4]||(l[4]=i=>D(2)),class:C([e(a)==2?"active":"","v-licai-head-item g-flex-align-center g-flex-justify-center"])},[t("div",se,s(u.value.cashoutHistoryText),1)],2)])]),t("div",ie,[e(a)==0?(m(),g("div",le,[p(x(Y,{class:"v-list",loading:e(c),"onUpdate:loading":l[5]||(l[5]=i=>I(c)?c.value=i:c=i),finished:e(v),"loading-text":d.value.loadingText,"finished-text":d.value.finishText,onLoad:K,"immediate-check":!1},{default:M(()=>[(m(!0),g(Z,null,E(e(r).list,(i,N)=>(m(),g("div",{onClick:z=>R(i),key:N,class:"v-list-item"},[t("div",ae,[t("div",ne,s(i.title),1),t("div",{class:C([e(at)(i.amount),"v-list-item-top-money"])},s(Number(i.amount)>=0?"+"+i.amount:i.amount)+" "+s(i.currency),3)]),t("div",ce,[t("div",de,s(i.des),1)]),t("div",ue,[t("div",ve,s(e(V)(i.create_time,"YYYY/MM/DD HH:mm:ss")),1)])],8,oe))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[h,e(r).list.length]]),p(x(Q,null,null,512),[[h,!e(r).list.length]])])):W("",!0),e(a)!=0?(m(),g("div",_e,[p(x(Y,{class:"v-list",loading:e(c),"onUpdate:loading":l[6]||(l[6]=i=>I(c)?c.value=i:c=i),finished:e(v),"loading-text":d.value.loadingText,"finished-text":d.value.finishText,onLoad:q,"immediate-check":!1},{default:M(()=>[(m(!0),g(Z,null,E(e(f).list,(i,N)=>(m(),g("div",{onClick:z=>R(i),key:N,class:"v-list-item"},[t("div",fe,[t("div",pe,s(i.title),1),t("div",he,[t("span",{class:C(e(nt)(i.status))},s(J(i.status)),3),me])]),t("div",ge,[t("div",xe,[p(t("div",{class:"v-bottom-list-item-title"},s(n.value.rechargeBiZhongText),513),[[h,e(a)==1]]),p(t("div",{class:"v-bottom-list-item-title"},s(n.value.tixianBiZhongText),513),[[h,e(a)==2]]),t("div",ye,s(i.currency),1)]),t("div",be,[t("div",$e,s(n.value.moneyText),1),t("div",Ce,s(i.amount),1)]),t("div",ke,[t("div",we,s(n.value.timeText),1),t("div",Te,s(e(V)(i.create_time,"MM/DD HH:mm")),1)])]),p(t("div",{onClick:ct(z=>H(i),["stop"]),class:"v-item-bottom-btn g-flex-align-center g-flex-justify-center"},[t("span",null,s(d.value.cehuitikuanText),1)],8,je),[[h,i.status==2&&e(a)==2]])],8,re))),128))]),_:1},8,["loading","finished","loading-text","finished-text"]),[[h,e(f).list.length]]),p(x(tt,null,null,512),[[h,!e(f).list.length]])])):W("",!0)])]),x(rt,{typeVal:e(a),ref_key:"refCashoutDetailPop",ref:G},null,8,["typeVal"]),x(Zt,{ref_key:"refBillDetailPop",ref:O},null,512)])}}};export{De as default};
