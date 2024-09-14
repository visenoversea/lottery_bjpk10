import{s as T,u as V,c as w,g as C,F as N,r as D,o as l,a as p,e as F,k as M,b as e,t as o,d as t,Z as z,b1 as B,m as d,M as u,p as a,v as n,ak as f,b3 as S,a8 as R,J as W}from"./main.bd07921e.js";const P=""+new URL("../img/icon/assets_bank_yellow.png",import.meta.url).href,q=""+new URL("../img/icon/public_copy_blue.png",import.meta.url).href;const U={class:"c_cashout_detail_pop"},A={class:"v-head g-flex-align-center"},I=e("i",{class:"iconfont icon-zuo"},null,-1),L=[I],O={class:"v-head-title g-flex-align-center g-flex-justify-center"},$={class:"c-pop-container"},E={class:"c-pop-content"},J={class:"c-pop-item g-flex-align-center"},K={class:"c-pop-item-left"},Z={class:"c-pop-item-right"},G={class:"c-pop-item-right-val"},H={class:"c-pop-item g-flex-align-center"},Q={class:"c-pop-item-left"},X={class:"c-pop-item-right"},Y={key:0,class:"c-pop-item c-pop-item-fail g-flex-align-center"},tt={class:"c-pop-item-left"},et={class:"c-pop-item-right"},st={class:"c-pop-item-right-val"},ot={class:"c-pop-item g-flex-align-center"},it={class:"c-pop-item-left"},ct={class:"c-pop-item-right"},at={class:"c-pop-item-right-val"},nt={class:"c-pop-item g-flex-align-center"},lt={class:"c-pop-item-right g-flex-1"},pt={class:"c-pop-item-right-top g-flex-column g-flex-align-end"},dt={class:"c-pop-item-right-val c-pop-item-right-address"},rt=e("i",{class:"iconfont icon-fuzhi1"},null,-1),_t={class:"c-pop-item-right-copy-text"},ht={class:"c-pop-item g-flex-align-center"},mt={class:"c-pop-item-right g-flex-column g-flex-align-end"},gt={class:"c-pop-item-right-top g-flex-align-center"},ut=e("img",{class:"c-pop-item-right-card-img",src:P,alt:""},null,-1),ft={class:"c-pop-item-right-val"},vt={class:"c-pop-item-right-bottom"},bt={class:"c-pop-item-right-val"},xt={class:"c-pop-item g-flex-align-center"},yt={class:"c-pop-item-right g-flex-column g-flex-align-end"},jt={class:"c-pop-item-right-bottom"},kt={class:"c-pop-item-right-val"},Tt={class:"c-pop-item g-flex-align-center"},Vt={class:"c-pop-item-left"},wt={class:"c-pop-item-right"},Ct={class:"c-pop-item-right-val"},Nt={class:"c-pop-item g-flex-align-center"},Dt={class:"c-pop-item-left"},Ft={key:0,class:"c-pop-item-right"},Mt={class:"c-pop-item-right-val"},zt={key:1,class:"c-pop-item-right"},Bt={class:"c-pop-item-right-val"},St={class:"c-pop-item g-flex-align-center"},Rt={class:"c-pop-item-right"},Wt={key:0,class:"c-pop-item-right-val"},Pt={key:1,class:"c-pop-item-right-val"},qt={key:2,class:"c-pop-item-right-val"},Ut={class:"c-pop-item g-flex-align-center"},At={class:"c-pop-item-left"},It={class:"c-pop-item-right"},Lt={class:"c-pop-item-right-val"},Ot={class:"c-pop-item g-flex-align-center"},$t={class:"c-pop-item-left"},Et={class:"c-pop-item-right"},Jt={class:"c-pop-item-right-val"},Kt=e("img",{class:"c-pop-item-right-copy-img",src:q,alt:""},null,-1),Zt={class:"c-pop-item g-flex-align-center"},Gt={class:"c-pop-item-left"},Ht={class:"c-pop-item-right"},Qt={class:"c-pop-item-right-val"},Yt={__name:"CashoutDetailPop",props:{typeVal:{type:Number,default(){return 1}}},setup(c,{expose:v}){const g=T(),b=V(),i=w(()=>b.tm("cashoutDetailPop"));let _=C(!1),s=N({obj:{info:{}}});function x(r){s.obj=r,_.value=!0}function y(){_.value=!1}function j(r){if(r==0)return i.value.statusFailText;if(r==1)return i.value.statusSuccessText;if(r==2)return i.value.statusIngText;if(r==3)return i.value.statusWaitText}return v({onShow:x}),(r,h)=>{const k=D("van-popup");return l(),p("div",U,[F(k,{position:"right","close-on-click-overlay":!1,show:t(_),"onUpdate:show":h[2]||(h[2]=m=>W(_)?_.value=m:_=m),class:"c-pop g-flex-column"},{default:M(()=>[e("div",A,[e("div",{onClick:y,class:"v-head-back-icon g-flex-align-center"},L),e("div",O,[e("span",null,o(t(i).titleText),1)])]),e("div",$,[e("div",E,[e("div",J,[e("div",K,o(c.typeVal==1?t(i).rukuanMethodText:t(i).qukuanMethodText),1),e("div",Z,[e("span",G,o(t(s).obj.title),1)])]),e("div",H,[e("div",Q,o(t(i).statusText),1),e("div",X,[e("span",{class:z(["c-pop-item-right-val",t(B)(t(s).obj.status)])},o(j(t(s).obj.status)),3)])]),t(s).obj.status==0&&t(s).obj.reason?(l(),p("div",Y,[e("div",tt,o(t(i).shibaiyuanyingText),1),e("div",et,[e("span",st,o(t(s).obj.reason),1)])])):d("",!0),t(s).obj.info.fn=="Wallet"?(l(),p(u,{key:1},[e("div",ot,[e("div",it,o(t(i).linkText),1),e("div",ct,[e("span",at,o(t(s).obj.info.chain),1)])]),e("div",nt,[a(e("div",{class:"c-pop-item-left"},o(t(i).rechargeAddressText),513),[[n,c.typeVal==1]]),a(e("div",{class:"c-pop-item-left"},o(t(i).cashoutAddressText),513),[[n,c.typeVal==2]]),e("div",lt,[e("div",pt,[e("p",dt,o(t(s).obj.info.address),1),e("div",{onClick:h[0]||(h[0]=m=>t(f)(t(s).obj.info.address)),class:"g-flex-align-center"},[rt,e("span",_t,o(t(i).copyText),1)])])])])],64)):d("",!0),t(s).obj.info.fn=="Bank"?(l(),p(u,{key:2},[e("div",ht,[a(e("div",{class:"c-pop-item-left"},o(t(i).rechargeBankText),513),[[n,c.typeVal==1]]),a(e("div",{class:"c-pop-item-left"},o(t(i).cashoutBankText),513),[[n,c.typeVal==2]]),e("div",mt,[e("div",gt,[ut,e("span",ft,o(t(s).obj.info.bank_name),1)]),e("div",vt,[e("span",bt,o(t(s).obj.info.card_number),1)])])]),e("div",xt,[a(e("div",{class:"c-pop-item-left"},o(t(i).shoukuanNameText),513),[[n,c.typeVal==1]]),a(e("div",{class:"c-pop-item-left"},o(t(i).qukuanNameText),513),[[n,c.typeVal==2]]),e("div",yt,[e("div",jt,[e("span",kt,o(t(s).obj.info.name),1)])])])],64)):d("",!0),a(e("div",Tt,[e("div",Vt,o(t(i).cunkuanNumText),1),e("div",wt,[e("span",Ct,o(t(s).obj.amount)+" "+o(t(s).obj.currency),1)])],512),[[n,c.typeVal==1]]),a(e("div",Nt,[e("div",Dt,o(t(i).qukuanNumText),1),t(g).system.WithdrawModel==1?(l(),p("div",Ft,[e("span",Mt,o(t(s).obj.amount)+" "+o(t(s).obj.currency),1)])):d("",!0),t(g).system.WithdrawModel==2?(l(),p("div",zt,[e("span",Bt,o(t(s).obj.apply_amount)+" "+o(t(s).obj.currency),1)])):d("",!0)],512),[[n,c.typeVal==2]]),a(e("div",St,[a(e("div",{class:"c-pop-item-left"},o(t(i).zhuanzhangMoneyText),513),[[n,c.typeVal==1]]),a(e("div",{class:"c-pop-item-left"},o(t(i).daozhangMoneyText),513),[[n,c.typeVal==2]]),e("div",Rt,[t(s).obj.info.symbol?(l(),p("span",Wt,o(t(s).obj.info.symbol)+" "+o(t(S)((t(s).obj.amount*t(s).obj.info.rate).toFixed(Number(t(s).obj.info.fixed)))),1)):d("",!0),!t(s).obj.info.symbol&&t(s).obj.currency!=t(s).obj.info.currency?(l(),p("span",Pt,o((t(s).obj.amount*t(s).obj.info.rate).toFixed(Number(t(s).obj.info.fixed)))+" "+o(t(s).obj.info.currency),1)):d("",!0),!t(s).obj.info.symbol&&t(s).obj.currency==t(s).obj.info.currency?(l(),p("span",qt,o(t(s).obj.amount)+" "+o(t(s).obj.currency),1)):d("",!0)])],512),[[n,t(s).obj.info.fn!="KeFu"&&t(s).obj.info.fn!="DPay"]]),a(e("div",Ut,[e("div",At,o(t(i).shouxuFeiText),1),e("div",It,[e("span",Lt,o(t(s).obj.fee)+" "+o(t(s).obj.currency),1)])],512),[[n,c.typeVal==2]]),e("div",Ot,[e("div",$t,o(t(i).orderNumText),1),e("div",Et,[e("div",{onClick:h[1]||(h[1]=m=>t(f)(t(s).obj.order_no)),class:"c-pop-item-right-top g-flex-align-center"},[e("span",Jt,o(t(s).obj.order_no),1),Kt])])]),e("div",Zt,[e("div",Gt,o(t(i).timeText),1),e("div",Ht,[e("span",Qt,o(t(R)(t(s).obj.create_time)),1)])])])])]),_:1},8,["show"])])}}};export{Yt as _};
