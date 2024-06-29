import{s as V,u as w,c as C,g as N,C as M,r as D,o as p,a as d,e as B,k as F,b as t,t as s,d as e,H as S,an as z,F as u,p as a,v as n,af as v,m as h,ao as R,am as W,E as q}from"./main.9f7457bf.js";const f=""+new URL("../img/icon/public_copy_blue.png",import.meta.url).href,P=""+new URL("../img/icon/assets_bank_yellow.png",import.meta.url).href;const U={class:"c_cashout_detail_pop"},A=t("i",{class:"iconfont icon-zuojiantou"},null,-1),E=[A],I={class:"c-pop-container"},L={class:"c-pop-title"},O={class:"c-pop-content"},$={class:"c-pop-item g-flex-align-center"},H={class:"c-pop-item-left"},K={class:"c-pop-item-right"},G={class:"c-pop-item-right-val"},J={class:"c-pop-item g-flex-align-center"},Q={class:"c-pop-item-left"},X={class:"c-pop-item-right"},Y={class:"c-pop-item g-flex-align-center"},Z={class:"c-pop-item-left"},tt={class:"c-pop-item-right"},et={class:"c-pop-item-right-val"},st={class:"c-pop-item g-flex-align-center"},ot={class:"c-pop-item-right g-flex-1"},it={class:"c-pop-item-right-top g-flex-column g-flex-align-end"},ct={class:"c-pop-item-right-val c-pop-item-right-address"},at=t("img",{class:"c-pop-item-right-copy-img",src:f,alt:""},null,-1),nt={class:"c-pop-item-right-copy-text"},lt={class:"c-pop-item g-flex-align-center"},pt={class:"c-pop-item-right g-flex-column g-flex-align-end"},dt={class:"c-pop-item-right-top g-flex-align-center"},rt=t("img",{class:"c-pop-item-right-card-img",src:P,alt:""},null,-1),_t={class:"c-pop-item-right-val"},ht={class:"c-pop-item-right-bottom"},mt={class:"c-pop-item-right-val"},gt={class:"c-pop-item g-flex-align-center"},ut={class:"c-pop-item-right g-flex-column g-flex-align-end"},vt={class:"c-pop-item-right-bottom"},ft={class:"c-pop-item-right-val"},xt={class:"c-pop-item g-flex-align-center"},bt={class:"c-pop-item-left"},yt={class:"c-pop-item-right"},jt={class:"c-pop-item-right-val"},kt={class:"c-pop-item g-flex-align-center"},Tt={class:"c-pop-item-left"},Vt={key:0,class:"c-pop-item-right"},wt={class:"c-pop-item-right-val"},Ct={key:1,class:"c-pop-item-right"},Nt={class:"c-pop-item-right-val"},Mt={class:"c-pop-item g-flex-align-center"},Dt={class:"c-pop-item-right"},Bt={key:0,class:"c-pop-item-right-val"},Ft={key:1,class:"c-pop-item-right-val"},St={class:"c-pop-item g-flex-align-center"},zt={class:"c-pop-item-left"},Rt={class:"c-pop-item-right"},Wt={class:"c-pop-item-right-val"},qt={class:"c-pop-item g-flex-align-center"},Pt={class:"c-pop-item-left"},Ut={class:"c-pop-item-right"},At={class:"c-pop-item-right-val"},Et=t("img",{class:"c-pop-item-right-copy-img",src:f,alt:""},null,-1),It={class:"c-pop-item g-flex-align-center"},Lt={class:"c-pop-item-left"},Ot={class:"c-pop-item-right"},$t={class:"c-pop-item-right-val"},Kt={__name:"CashoutDetailPop",props:{typeVal:{type:Number,default(){return 1}}},setup(c,{expose:x}){const g=V(),b=w(),i=C(()=>b.tm("cashoutDetailPop"));let r=N(!1),o=M({obj:{info:{}}});function y(l){o.obj=l,r.value=!0}function j(){r.value=!1}function k(l){if(l==0)return i.value.statusFailText;if(l==1)return i.value.statusSuccessText;if(l==2)return i.value.statusIngText;if(l==3)return i.value.statusWaitText}return x({onShow:y}),(l,_)=>{const T=D("van-popup");return p(),d("div",U,[B(T,{position:"right","close-on-click-overlay":!1,show:e(r),"onUpdate:show":_[2]||(_[2]=m=>q(r)?r.value=m:r=m),class:"c-pop g-flex-column"},{default:F(()=>[t("div",{class:"c-pop-head g-flex-align-center"},[t("div",{onClick:j,class:"c-pop-head-back-icon"},E)]),t("div",I,[t("div",L,s(e(i).titleText),1),t("div",O,[t("div",$,[t("div",H,s(c.typeVal==1?e(i).rukuanMethodText:e(i).qukuanMethodText),1),t("div",K,[t("span",G,s(e(o).obj.title),1)])]),t("div",J,[t("div",Q,s(e(i).statusText),1),t("div",X,[t("span",{class:S(["c-pop-item-right-val",e(z)(e(o).obj.status)])},s(k(e(o).obj.status)),3)])]),e(o).obj.info.fn=="Wallet"?(p(),d(u,{key:0},[t("div",Y,[t("div",Z,s(e(i).linkText),1),t("div",tt,[t("span",et,s(e(o).obj.info.chain),1)])]),t("div",st,[a(t("div",{class:"c-pop-item-left"},s(e(i).rechargeAddressText),513),[[n,c.typeVal==1]]),a(t("div",{class:"c-pop-item-left"},s(e(i).cashoutAddressText),513),[[n,c.typeVal==2]]),t("div",ot,[t("div",it,[t("p",ct,s(e(o).obj.info.address),1),t("div",{onClick:_[0]||(_[0]=m=>e(v)(e(o).obj.info.address)),class:"g-flex-align-center"},[at,t("span",nt,s(e(i).copyText),1)])])])])],64)):h("",!0),e(o).obj.info.fn=="Bank"?(p(),d(u,{key:1},[t("div",lt,[a(t("div",{class:"c-pop-item-left"},s(e(i).rechargeBankText),513),[[n,c.typeVal==1]]),a(t("div",{class:"c-pop-item-left"},s(e(i).cashoutBankText),513),[[n,c.typeVal==2]]),t("div",pt,[t("div",dt,[rt,t("span",_t,s(e(o).obj.info.bank_name),1)]),t("div",ht,[t("span",mt,s(e(o).obj.info.card_number),1)])])]),t("div",gt,[a(t("div",{class:"c-pop-item-left"},s(e(i).shoukuanNameText),513),[[n,c.typeVal==1]]),a(t("div",{class:"c-pop-item-left"},s(e(i).qukuanNameText),513),[[n,c.typeVal==2]]),t("div",ut,[t("div",vt,[t("span",ft,s(e(o).obj.info.name),1)])])])],64)):h("",!0),a(t("div",xt,[t("div",bt,s(e(i).cunkuanNumText),1),t("div",yt,[t("span",jt,s(e(o).obj.amount)+" "+s(e(o).obj.currency),1)])],512),[[n,c.typeVal==1]]),a(t("div",kt,[t("div",Tt,s(e(i).qukuanNumText),1),e(g).system.WithdrawModel==1?(p(),d("div",Vt,[t("span",wt,s(e(o).obj.amount)+" "+s(e(o).obj.currency),1)])):h("",!0),e(g).system.WithdrawModel==2?(p(),d("div",Ct,[t("span",Nt,s(e(o).obj.apply_amount)+" "+s(e(o).obj.currency),1)])):h("",!0)],512),[[n,c.typeVal==2]]),a(t("div",Mt,[a(t("div",{class:"c-pop-item-left"},s(e(i).zhuanzhangMoneyText),513),[[n,c.typeVal==1]]),a(t("div",{class:"c-pop-item-left"},s(e(i).daozhangMoneyText),513),[[n,c.typeVal==2]]),t("div",Dt,[e(o).obj.info.symbol?(p(),d("span",Bt,s(e(o).obj.info.symbol)+" "+s(e(R)((e(o).obj.amount*e(o).obj.info.rate).toFixed(e(o).obj.info.fixed))),1)):h("",!0),e(o).obj.info.symbol?h("",!0):(p(),d("span",Ft,s(e(o).obj.amount)+" "+s(e(o).obj.currency),1))])],512),[[n,e(o).obj.info.fn!="KeFu"]]),a(t("div",St,[t("div",zt,s(e(i).shouxuFeiText),1),t("div",Rt,[t("span",Wt,s(e(o).obj.fee)+" "+s(e(o).obj.currency),1)])],512),[[n,c.typeVal==2]]),t("div",qt,[t("div",Pt,s(e(i).orderNumText),1),t("div",Ut,[t("div",{onClick:_[1]||(_[1]=m=>e(v)(e(o).obj.order_no)),class:"c-pop-item-right-top g-flex-align-center"},[t("span",At,s(e(o).obj.order_no),1),Et])])]),t("div",It,[t("div",Lt,s(e(i).timeText),1),t("div",Ot,[t("span",$t,s(e(W)(e(o).obj.create_time,"yyyy-MM-dd hh:mm:ss")),1)])])])])]),_:1},8,["show"])])}}};export{Kt as _};
