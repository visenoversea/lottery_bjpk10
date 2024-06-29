import{s as V,u as w,c as C,r as N,a as M,b as D,o as p,d,e as B,w as F,f as t,t as s,g as e,I as S,F as u,j as a,v as n,A as h,i as z}from"./index.de11b688.js";import{f as R,c as f,j as W,h as q}from"./index.78e71f9e.js";const v=""+new URL("../img/icon/public_copy_blue.png",import.meta.url).href,A=""+new URL("../img/icon/assets_bank_yellow.png",import.meta.url).href;const I={class:"c_cashout_detail_pop"},P=t("i",{class:"iconfont icon-zuojiantou"},null,-1),U=[P],L={class:"c-pop-container"},O={class:"c-pop-title"},$={class:"c-pop-content"},E={class:"c-pop-item g-flex-align-center"},K={class:"c-pop-item-left"},G={class:"c-pop-item-right"},H={class:"c-pop-item-right-val"},J={class:"c-pop-item g-flex-align-center"},Q={class:"c-pop-item-left"},X={class:"c-pop-item-right"},Y={class:"c-pop-item g-flex-align-center"},Z={class:"c-pop-item-left"},tt={class:"c-pop-item-right"},et={class:"c-pop-item-right-val"},st={class:"c-pop-item g-flex-align-center"},ot={class:"c-pop-item-right g-flex-1"},it={class:"c-pop-item-right-top g-flex-column g-flex-align-end"},ct={class:"c-pop-item-right-val c-pop-item-right-address"},at=t("img",{class:"c-pop-item-right-copy-img",src:v,alt:""},null,-1),nt={class:"c-pop-item-right-copy-text"},lt={class:"c-pop-item g-flex-align-center"},pt={class:"c-pop-item-right g-flex-column g-flex-align-end"},dt={class:"c-pop-item-right-top g-flex-align-center"},rt=t("img",{class:"c-pop-item-right-card-img",src:A,alt:""},null,-1),_t={class:"c-pop-item-right-val"},ht={class:"c-pop-item-right-bottom"},mt={class:"c-pop-item-right-val"},gt={class:"c-pop-item g-flex-align-center"},ut={class:"c-pop-item-right g-flex-column g-flex-align-end"},ft={class:"c-pop-item-right-bottom"},vt={class:"c-pop-item-right-val"},xt={class:"c-pop-item g-flex-align-center"},bt={class:"c-pop-item-left"},yt={class:"c-pop-item-right"},jt={class:"c-pop-item-right-val"},kt={class:"c-pop-item g-flex-align-center"},Tt={class:"c-pop-item-left"},Vt={key:0,class:"c-pop-item-right"},wt={class:"c-pop-item-right-val"},Ct={key:1,class:"c-pop-item-right"},Nt={class:"c-pop-item-right-val"},Mt={class:"c-pop-item g-flex-align-center"},Dt={class:"c-pop-item-right"},Bt={key:0,class:"c-pop-item-right-val"},Ft={key:1,class:"c-pop-item-right-val"},St={class:"c-pop-item g-flex-align-center"},zt={class:"c-pop-item-left"},Rt={class:"c-pop-item-right"},Wt={class:"c-pop-item-right-val"},qt={class:"c-pop-item g-flex-align-center"},At={class:"c-pop-item-left"},It={class:"c-pop-item-right"},Pt={class:"c-pop-item-right-val"},Ut=t("img",{class:"c-pop-item-right-copy-img",src:v,alt:""},null,-1),Lt={class:"c-pop-item g-flex-align-center"},Ot={class:"c-pop-item-left"},$t={class:"c-pop-item-right"},Et={class:"c-pop-item-right-val"},Ht={__name:"CashoutDetailPop",props:{typeVal:{type:Number,default(){return 1}}},setup(c,{expose:x}){const g=V(),b=w(),i=C(()=>b.tm("cashoutDetailPop"));let r=N(!1),o=M({obj:{info:{}}});function y(l){o.obj=l,r.value=!0}function j(){r.value=!1}function k(l){if(l==0)return i.value.statusFailText;if(l==1)return i.value.statusSuccessText;if(l==2)return i.value.statusIngText;if(l==3)return i.value.statusWaitText}return x({onShow:y}),(l,_)=>{const T=D("van-popup");return p(),d("div",I,[B(T,{position:"right","close-on-click-overlay":!1,show:e(r),"onUpdate:show":_[2]||(_[2]=m=>z(r)?r.value=m:r=m),class:"c-pop g-flex-column"},{default:F(()=>[t("div",{class:"c-pop-head g-flex-align-center"},[t("div",{onClick:j,class:"c-pop-head-back-icon"},U)]),t("div",L,[t("div",O,s(e(i).titleText),1),t("div",$,[t("div",E,[t("div",K,s(c.typeVal==1?e(i).rukuanMethodText:e(i).qukuanMethodText),1),t("div",G,[t("span",H,s(e(o).obj.title),1)])]),t("div",J,[t("div",Q,s(e(i).statusText),1),t("div",X,[t("span",{class:S(["c-pop-item-right-val",e(R)(e(o).obj.status)])},s(k(e(o).obj.status)),3)])]),e(o).obj.info.fn=="Wallet"?(p(),d(u,{key:0},[t("div",Y,[t("div",Z,s(e(i).linkText),1),t("div",tt,[t("span",et,s(e(o).obj.info.chain),1)])]),t("div",st,[a(t("div",{class:"c-pop-item-left"},s(e(i).rechargeAddressText),513),[[n,c.typeVal==1]]),a(t("div",{class:"c-pop-item-left"},s(e(i).cashoutAddressText),513),[[n,c.typeVal==2]]),t("div",ot,[t("div",it,[t("p",ct,s(e(o).obj.info.address),1),t("div",{onClick:_[0]||(_[0]=m=>e(f)(e(o).obj.info.address)),class:"g-flex-align-center"},[at,t("span",nt,s(e(i).copyText),1)])])])])],64)):h("",!0),e(o).obj.info.fn=="Bank"?(p(),d(u,{key:1},[t("div",lt,[a(t("div",{class:"c-pop-item-left"},s(e(i).rechargeBankText),513),[[n,c.typeVal==1]]),a(t("div",{class:"c-pop-item-left"},s(e(i).cashoutBankText),513),[[n,c.typeVal==2]]),t("div",pt,[t("div",dt,[rt,t("span",_t,s(e(o).obj.info.bank_name),1)]),t("div",ht,[t("span",mt,s(e(o).obj.info.card_number),1)])])]),t("div",gt,[a(t("div",{class:"c-pop-item-left"},s(e(i).shoukuanNameText),513),[[n,c.typeVal==1]]),a(t("div",{class:"c-pop-item-left"},s(e(i).qukuanNameText),513),[[n,c.typeVal==2]]),t("div",ut,[t("div",ft,[t("span",vt,s(e(o).obj.info.name),1)])])])],64)):h("",!0),a(t("div",xt,[t("div",bt,s(e(i).cunkuanNumText),1),t("div",yt,[t("span",jt,s(e(o).obj.amount)+" "+s(e(o).obj.currency),1)])],512),[[n,c.typeVal==1]]),a(t("div",kt,[t("div",Tt,s(e(i).qukuanNumText),1),e(g).system.WithdrawModel==1?(p(),d("div",Vt,[t("span",wt,s(e(o).obj.amount)+" "+s(e(o).obj.currency),1)])):h("",!0),e(g).system.WithdrawModel==2?(p(),d("div",Ct,[t("span",Nt,s(e(o).obj.apply_amount)+" "+s(e(o).obj.currency),1)])):h("",!0)],512),[[n,c.typeVal==2]]),a(t("div",Mt,[a(t("div",{class:"c-pop-item-left"},s(e(i).zhuanzhangMoneyText),513),[[n,c.typeVal==1]]),a(t("div",{class:"c-pop-item-left"},s(e(i).daozhangMoneyText),513),[[n,c.typeVal==2]]),t("div",Dt,[e(o).obj.info.symbol?(p(),d("span",Bt,s(e(o).obj.info.symbol)+" "+s(e(W)((e(o).obj.amount*e(o).obj.info.rate).toFixed(e(o).obj.info.fixed))),1)):h("",!0),e(o).obj.info.symbol?h("",!0):(p(),d("span",Ft,s(e(o).obj.amount)+" "+s(e(o).obj.currency),1))])],512),[[n,e(o).obj.info.fn!="KeFu"]]),a(t("div",St,[t("div",zt,s(e(i).shouxuFeiText),1),t("div",Rt,[t("span",Wt,s(e(o).obj.fee)+" "+s(e(o).obj.currency),1)])],512),[[n,c.typeVal==2]]),t("div",qt,[t("div",At,s(e(i).orderNumText),1),t("div",It,[t("div",{onClick:_[1]||(_[1]=m=>e(f)(e(o).obj.order_no)),class:"c-pop-item-right-top g-flex-align-center"},[t("span",Pt,s(e(o).obj.order_no),1),Ut])])]),t("div",Lt,[t("div",Ot,s(e(i).timeText),1),t("div",$t,[t("span",Et,s(e(q)(e(o).obj.create_time,"yyyy-MM-dd hh:mm:ss")),1)])])])])]),_:1},8,["show"])])}}};export{Ht as _};
