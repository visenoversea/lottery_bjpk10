import{s as y,v as T,c as d,D as N,u as F,e as D,E as r,bb as I,r as C,o as G,a as H,b as e,t,h as a,m,p as g,d as K,ar as S,bc as W,P,H as V}from"./main.dbc59821.js";const q={class:"v_wa_kuang_detail g-flex-column n-bg"},U={class:"new-head"},z=e("img",{src:V,alt:""},null,-1),B=[z],R={class:"new-head_title_text"},$={class:"v-wakuang-detail-container g-flex-column"},E={class:"v-wakuang-detail-finance"},M={class:"v-wakuang-finance-top g-flex-align-center"},O={class:"v-wakuang-finance-top-left g-flex-align-center"},Z=["src"],A={class:"v-wakuang-finance-top-left-content"},J={class:"v-wakuang-finance-top-left-content-title"},Q={class:"v-wakuang-finance-top-right g-flex-column g-flex-align-end"},L={class:"v-wakuang-finance-top-right-title"},X={class:"v-wakuang-finance-bottom g-flex-align-center"},Y={class:"v-wakuang-finance-bottom-item g-flex-column g-flex-align-center"},ee={class:"v-wakuang-finance-bottom-item-val"},te={class:"v-wakuang-finance-bottom-item-title"},ne={class:"v-wakuang-finance-bottom-item g-flex-column g-flex-align-center"},ae={class:"v-wakuang-finance-bottom-item-val"},oe={class:"v-wakuang-finance-bottom-item-title"},se={class:"v-wakuang-finance-bottom-item g-flex-column g-flex-align-center"},ie={class:"v-wakuang-finance-bottom-item-val"},ce={class:"v-wakuang-finance-bottom-item-title"},le={class:"v-wakuang-detail-content"},ue={class:"v-content-item g-flex-justify-between g-flex-align-center"},de={class:"v-content-item-desc g-flex-column g-flex-align-center"},_e={class:"v-content-item-desc-title"},ve={class:"v-content-item-desc-val g-fsize16"},re={class:"v-content-item-desc g-flex-column g-flex-align-center"},me={class:"v-content-item-desc-title"},ge={class:"v-content-item-desc-val"},fe={class:"v-content-item v-content-item-card g-flex-align-center"},xe={class:"v-content-item-desc g-flex-column g-flex-align-center"},he={class:"v-content-item-desc-title"},be={class:"v-content-item-desc-val"},pe={class:"v-content-item-desc g-flex-column g-flex-align-center"},we={class:"v-content-item-desc-title"},ke={class:"v-content-item-desc-val"},je={class:"v-content-item-desc g-flex-column g-flex-align-center"},ye={class:"v-content-item-desc-title"},Te={class:"v-content-item-desc-val"},Ne={class:"v-wakuang-detail-content"},Fe={class:"v-content-item v-content-item-money"},De={class:"v-content-item-money-title"},Ie={class:"v-content-item-money-input g-flex-align-center"},Ce={class:"v-content-item-money-input-right g-flex-align-center"},Ge={class:"v-content-item-money-input-danwei"},He={class:"v-wakuang-detail-btn-box"},We={__name:"WaKuanDetail",setup(Ke){const l=y(),_=T.exports.useI18n(),o=d(()=>_.tm("wakuangDetail"));d(()=>_.tm("gongyong"));const f=N(),x=F();D("");let h=d(()=>!i.amount||!n.obj.min_rate?"0.00":n.obj.min_rate==n.obj.max_rate?(i.amount*Number(n.obj.min_rate)).toFixed(2):(i.amount*Number(n.obj.min_rate)).toFixed(2)+"~"+(i.amount*Number(n.obj.max_rate)).toFixed(2)),u=d(()=>l.userInfo);async function b(){const{success:c,data:s}=await S();!c||l.setUserInfo(s.info)}b();let i=r({id:f.query.id,amount:""}),n=r({obj:{}});p();async function p(){l.loadingShow=!0;const{success:c,data:s}=await I({id:i.id});!c||(n.obj=s.info,console.log(s))}function w(){n.obj.currency=="DCPTG"?i.amount=u.value.balance_dcptg:i.amount=u.value.balance}async function k(){l.loadingShow=!0;const{success:c,data:s}=await W(i);!c||(P(s.msg),x.push({name:"wakuang"}),console.log(s))}return(c,s)=>{const j=C("van-field");return G(),H("div",q,[e("div",U,[e("div",{onClick:s[0]||(s[0]=v=>c.$router.go(-1)),class:"new-head-back"},B)]),e("div",R,t(o.value.titleText),1),e("div",$,[e("div",E,[e("div",M,[e("div",O,[e("img",{src:a(n).obj.icon,alt:""},null,8,Z),e("div",A,[e("p",J,t(a(n).obj.title),1),e("span",null,t(o.value.suocangText),1)])]),e("div",Q,[e("p",L,t(o.value.rishouyiText),1),m(e("p",{class:"v-wakuang-finance-top-right-val"},t((Number(a(n).obj.min_rate)*100).toFixed(2))+"%",513),[[g,a(n).obj.min_rate==a(n).obj.max_rate]]),m(e("p",{class:"v-wakuang-finance-top-right-val"},t((Number(a(n).obj.min_rate)*100).toFixed(2))+" - "+t((Number(a(n).obj.max_rate)*100).toFixed(2))+"%",513),[[g,a(n).obj.min_rate!=a(n).obj.max_rate]])])]),e("div",X,[e("div",Y,[e("div",ee,t(a(n).obj.day)+"("+t(o.value.dayText)+") ",1),e("div",te,t(o.value.suocangZhouQiText),1)]),e("div",ne,[e("div",ae,t(Number(a(n).obj.min).toFixed(2)),1),e("div",oe,t(o.value.zuishaoText),1)]),e("div",se,[e("div",ie,t(a(n).obj.max==-1?o.value.nolimitText:Number(a(n).obj.max).toFixed(2)),1),e("div",ce,t(o.value.zuiduoText),1)])])]),e("div",le,[e("div",ue,[e("div",de,[e("p",_e,t(o.value.dayshouyiText)+"("+t(a(n).obj.currency)+") ",1),e("p",ve,t(a(h)),1)]),e("div",re,[e("p",me,t(o.value.canuseMoneyText)+"("+t(a(n).obj.currency)+") ",1),e("p",ge,t(a(n).obj.currency=="DCPTG"?a(u).balance_dcptg:a(u).balance),1)])]),e("div",fe,[e("div",xe,[e("p",he,t(o.value.paixiTimeText),1),e("p",be,t(o.value.everyDayText),1)]),e("div",pe,[e("p",we,t(o.value.tuoguanZiJinText),1),e("p",ke,t(o.value.daoqiFanHuiText),1)]),e("div",je,[e("p",ye,t(o.value.tiqianShuHuiText),1),e("p",Te,t((Number(a(n).obj.bc_rate)*100).toFixed(2))+"% ",1)])])]),e("div",Ne,[e("div",Fe,[e("div",De,t(o.value.suocangMoneyText),1),e("div",Ie,[K(j,{modelValue:a(i).amount,"onUpdate:modelValue":s[1]||(s[1]=v=>a(i).amount=v),label:"","label-width":"0",placeholder:"0.00"},null,8,["modelValue"]),e("div",Ce,[e("div",Ge,t(a(n).obj.currency),1),e("div",{onClick:w,class:"v-content-item-money-input-all"},t(o.value.allText),1)])])])]),e("div",He,[e("div",{onClick:k,class:"v-wakuang-detail-btn g-flex-justify-center g-flex-align-center"},t(o.value.shenqingRenGouText),1)])])])}}};export{We as default};
