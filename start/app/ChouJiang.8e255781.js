import{s as k,u as C,c as w,g,F as p,r as $,o as J,a as L,e as b,k as z,b as t,t as i,d as o,J as F,bi as N,bj as P}from"./main.528575c5.js";const B=""+new URL("../img/icon/dial_top_back.png",import.meta.url).href,D=""+new URL("../img/icon/dial_window_icon.png",import.meta.url).href;const O={class:"s_chou_jiang_result_pop"},U={class:"s-pop-container"},E=t("div",{class:"s-pop-choujiang-resule-icon"},[t("img",{src:D,alt:""})],-1),H=t("i",{class:"iconfont icon-guanbi"},null,-1),I=[H],M={class:"s-pop-title"},V={class:"s-pop-tips"},W={class:"s-pop-btn-box g-flex-align-center g-flex-justify-center"},G={__name:"ChouJiangReSultPop",setup(S,{expose:_}){k();const m=C(),a=w(()=>m.tm("choujiang"));let n=g(!1),l=p({obj:{}});function d(h){l.obj=h,n.value=!0}function c(){n.value=!1}return _({onShow:d}),(h,u)=>{const r=$("van-popup");return J(),L("div",O,[b(r,{"close-on-click-overlay":!1,class:"s-pop",show:o(n),"onUpdate:show":u[0]||(u[0]=f=>F(n)?n.value=f:n=f),position:"center"},{default:z(()=>[t("div",U,[E,t("div",{onClick:c,class:"s-pop-close"},I),t("div",M,[t("span",null,i(o(a).gongxiText),1)]),t("div",V,[t("span",null,i(o(l).obj.tip),1)]),t("div",W,[t("div",{onClick:c,class:"s-pop-btn g-flex-align-center g-flex-justify-center"},[t("span",null,i(o(a).comfirmText),1)])])])]),_:1},8,["show"])])}}};const q={class:"v_chou_jiang g-flex-column n-bg"},A={class:"v-head"},K=t("img",{src:B,alt:""},null,-1),Q=[K],X={class:"v-chou-jiang-container"},Y={class:"v-chou-jiang-top g-flex-column g-flex-align-center"},Z={class:"v-chou-jiang-title"},tt={class:"v-chou-jiang-shengyu g-flex-justify-center g-flex-align-center"},et={class:"v-chou-jiang-shengyu-title"},ot={class:"v-chou-jiang-shengyu-val"},st={class:"v-chou-jiang-zhuanpan g-flex-align-center g-flex-justify-center"},it={__name:"ChouJiang",setup(S){const _=k(),m=C(),a=w(()=>m.tm("choujiang"));let n=g([{padding:"35px",background:"transparent",imgs:[{src:"/img/icon/dial_turntable.png",width:330,height:330,top:-5,rotate:!0}]}]),l=p({list:[]}),d=g(0);c();async function c(){_.loadingShow=!0;const{success:s,data:e}=await N();!s||(console.log(e),l.list=e.list,d.value=e.lotteryNums,e.list.length&&(u.offsetDegree=360/e.list.length/2))}let h=p({list:[{radius:"35%",background:"transparent",pointer:!0,fonts:[{text:"GO",top:"-10px",fontColor:"#FFF"}],imgs:[{src:"/img/icon/dial_tead_round.png",top:-50,width:70}]}]}),u=p({gutter:0,stopRange:0,offsetDegree:0,speed:10,accelerationTime:2e3,decelerationTime:3e3}),r=g(null);function f(){T()}let x=g(null),j=p({obj:{}});async function T(){_.loadingShow=!0;const{success:s,data:e}=await P();!s||(r.value.play(),j.obj=e.userLottery,setTimeout(()=>{const v=l.list.findIndex(y=>y.id==j.obj.lottery_id);v!=-1&&r.value.stop(v)},3e3),console.log(e))}function R(s){x.value.onShow(j.obj),c(),console.log(s)}return(s,e)=>{const v=$("LuckyWheel");return J(),L("div",q,[t("div",A,[t("div",{onClick:e[0]||(e[0]=y=>s.$router.go(-1)),class:"v-chou-jiang-back"},Q),t("div",{onClick:e[1]||(e[1]=y=>s.$router.push({name:"choujianghistory"})),class:"v-chou-jiang-head-right"},[t("span",null,i(o(a).jiluText),1)])]),t("div",X,[t("div",Y,[t("div",Z,i(o(a).titleText),1),t("div",tt,[t("div",et,i(o(a).kechoucishuText)+": ",1),t("div",ot,i(s.$t("choujiang.ciText",{val1:o(d)})),1)])]),t("div",st,[b(v,{ref_key:"refMyLucky",ref:r,width:"320px",height:"320px",prizes:o(l).list,defaultConfig:o(u),blocks:o(n),buttons:o(h).list,onStart:f,onEnd:R},null,8,["prizes","defaultConfig","blocks","buttons"])])]),b(G,{ref_key:"refChouJiangReSultPop",ref:x},null,512)])}}};export{it as default};
