import{s as V,u as w,c as C,g as N,C as M,r as D,o as _,a as r,e as B,k as S,b as t,t as s,d as e,H as z,al as F,F as u,p as a,v as n,ad as v,m,am as R,ak as W,E as q}from"./main.d88c4f71.js";const f=""+new URL("../img/icon/public_copy_blue.png",import.meta.url).href,P=""+new URL("../img/icon/assets_bank_yellow.png",import.meta.url).href;const U={class:"c_cashout_detail_pop"},A=t("i",{class:"iconfont icon-zuojiantou"},null,-1),E=[A],I={class:"c-pop-container"},L={class:"c-pop-title"},O={class:"c-pop-content"},$={class:"c-pop-item g-flex-align-center"},H={class:"c-pop-item-left"},K={class:"c-pop-item-right"},G={class:"c-pop-item-right-val"},J={class:"c-pop-item g-flex-align-center"},Q={class:"c-pop-item-left"},X={class:"c-pop-item-right"},Y={class:"c-pop-item g-flex-align-center"},Z={class:"c-pop-item-left"},tt={class:"c-pop-item-right"},et={class:"c-pop-item-right-val"},st={class:"c-pop-item g-flex-align-center"},ot={class:"c-pop-item-right g-flex-1"},it={class:"c-pop-item-right-top g-flex-column g-flex-align-end"},ct={class:"c-pop-item-right-val c-pop-item-right-address"},at=t("img",{class:"c-pop-item-right-copy-img",src:f,alt:""},null,-1),nt={class:"c-pop-item-right-copy-text"},lt={class:"c-pop-item g-flex-align-center"},pt={class:"c-pop-item-right g-flex-column g-flex-align-end"},dt={class:"c-pop-item-right-top g-flex-align-center"},_t=t("img",{class:"c-pop-item-right-card-img",src:P,alt:""},null,-1),rt={class:"c-pop-item-right-val"},ht={class:"c-pop-item-right-bottom"},mt={class:"c-pop-item-right-val"},gt={class:"c-pop-item g-flex-align-center"},ut={class:"c-pop-item-right g-flex-column g-flex-align-end"},vt={class:"c-pop-item-right-bottom"},ft={class:"c-pop-item-right-val"},xt={class:"c-pop-item g-flex-align-center"},yt={class:"c-pop-item-left"},bt={class:"c-pop-item-right"},jt={class:"c-pop-item-right-val"},kt={class:"c-pop-item g-flex-align-center"},Tt={class:"c-pop-item-left"},Vt={key:0,class:"c-pop-item-right"},wt={class:"c-pop-item-right-val"},Ct={key:1,class:"c-pop-item-right"},Nt={class:"c-pop-item-right-val"},Mt={class:"c-pop-item g-flex-align-center"},Dt={class:"c-pop-item-right"},Bt={class:"c-pop-item-right-val"},St={class:"c-pop-item g-flex-align-center"},zt={class:"c-pop-item-left"},Ft={class:"c-pop-item-right"},Rt={class:"c-pop-item-right-val"},Wt=t("img",{class:"c-pop-item-right-copy-img",src:f,alt:""},null,-1),qt={class:"c-pop-item g-flex-align-center"},Pt={class:"c-pop-item-left"},Ut={class:"c-pop-item-right"},At={class:"c-pop-item-right-val"},It={__name:"CashoutDetailPop",props:{typeVal:{type:Number,default(){return 1}}},setup(c,{expose:x}){const g=V(),y=w(),o=C(()=>y.tm("cashoutDetailPop"));let p=N(!1),i=M({obj:{info:{}}});function b(l){i.obj=l,p.value=!0}function j(){p.value=!1}function k(l){if(l==0)return o.value.statusFailText;if(l==1)return o.value.statusSuccessText;if(l==2)return o.value.statusIngText;if(l==3)return o.value.statusWaitText}return x({onShow:b}),(l,d)=>{const T=D("van-popup");return _(),r("div",U,[B(T,{position:"right","close-on-click-overlay":!1,show:e(p),"onUpdate:show":d[2]||(d[2]=h=>q(p)?p.value=h:p=h),class:"c-pop g-flex-column"},{default:S(()=>[t("div",{class:"c-pop-head g-flex-align-center"},[t("div",{onClick:j,class:"c-pop-head-back-icon"},E)]),t("div",I,[t("div",L,s(e(o).titleText),1),t("div",O,[t("div",$,[t("div",H,s(c.typeVal==1?e(o).rukuanMethodText:e(o).qukuanMethodText),1),t("div",K,[t("span",G,s(e(i).obj.title),1)])]),t("div",J,[t("div",Q,s(e(o).statusText),1),t("div",X,[t("span",{class:z(["c-pop-item-right-val",e(F)(e(i).obj.status)])},s(k(e(i).obj.status)),3)])]),e(i).obj.info.fn=="Wallet"?(_(),r(u,{key:0},[t("div",Y,[t("div",Z,s(e(o).linkText),1),t("div",tt,[t("span",et,s(e(i).obj.info.chain),1)])]),t("div",st,[a(t("div",{class:"c-pop-item-left"},s(e(o).rechargeAddressText),513),[[n,c.typeVal==1]]),a(t("div",{class:"c-pop-item-left"},s(e(o).cashoutAddressText),513),[[n,c.typeVal==2]]),t("div",ot,[t("div",it,[t("p",ct,s(e(i).obj.info.address),1),t("div",{onClick:d[0]||(d[0]=h=>e(v)(e(i).obj.info.address)),class:"g-flex-align-center"},[at,t("span",nt,s(e(o).copyText),1)])])])])],64)):m("",!0),e(i).obj.info.fn=="Bank"?(_(),r(u,{key:1},[t("div",lt,[a(t("div",{class:"c-pop-item-left"},s(e(o).rechargeBankText),513),[[n,c.typeVal==1]]),a(t("div",{class:"c-pop-item-left"},s(e(o).cashoutBankText),513),[[n,c.typeVal==2]]),t("div",pt,[t("div",dt,[_t,t("span",rt,s(e(i).obj.info.bank_name),1)]),t("div",ht,[t("span",mt,s(e(i).obj.info.card_number),1)])])]),t("div",gt,[a(t("div",{class:"c-pop-item-left"},s(e(o).shoukuanNameText),513),[[n,c.typeVal==1]]),a(t("div",{class:"c-pop-item-left"},s(e(o).qukuanNameText),513),[[n,c.typeVal==2]]),t("div",ut,[t("div",vt,[t("span",ft,s(e(i).obj.info.name),1)])])])],64)):m("",!0),a(t("div",xt,[t("div",yt,s(e(o).cunkuanNumText),1),t("div",bt,[t("span",jt,s(e(i).obj.amount),1)])],512),[[n,c.typeVal==1]]),a(t("div",kt,[t("div",Tt,s(e(o).qukuanNumText),1),e(g).system.WithdrawModel==1?(_(),r("div",Vt,[t("span",wt,s(e(i).obj.amount),1)])):m("",!0),e(g).system.WithdrawModel==2?(_(),r("div",Ct,[t("span",Nt,s(e(i).obj.apply_amount),1)])):m("",!0)],512),[[n,c.typeVal==2]]),a(t("div",Mt,[a(t("div",{class:"c-pop-item-left"},s(e(o).zhuanzhangMoneyText),513),[[n,c.typeVal==1]]),a(t("div",{class:"c-pop-item-left"},s(e(o).daozhangMoneyText),513),[[n,c.typeVal==2]]),t("div",Dt,[t("span",Bt,s(e(R)((e(i).obj.amount*e(i).obj.info.rate).toFixed(e(i).obj.info.fixed))),1)])],512),[[n,e(i).obj.info.fn!="KeFu"]]),t("div",St,[t("div",zt,s(e(o).orderNumText),1),t("div",Ft,[t("div",{onClick:d[1]||(d[1]=h=>e(v)(e(i).obj.order_no)),class:"c-pop-item-right-top g-flex-align-center"},[t("span",Rt,s(e(i).obj.order_no),1),Wt])])]),t("div",qt,[t("div",Pt,s(e(o).timeText),1),t("div",Ut,[t("span",At,s(e(W)(e(i).obj.create_time,"yyyy-MM-dd hh:mm:ss")),1)])])])])]),_:1},8,["show"])])}}};export{It as _};
