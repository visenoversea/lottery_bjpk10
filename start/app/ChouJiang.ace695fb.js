import{s as k,v as m,c as w,e as p,E as d,r as H,o as L,a as W,d as j,j as K,b as e,t as i,h as n,H as S,be as G,bf as E}from"./main.b5791ad0.js";const J="data:image/png;base64,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",U=""+new URL("dial_window_icon.5672ef2e.png",import.meta.url).href;const z={class:"s_chou_jiang_result_pop"},Q={class:"s-pop-container"},B=e("div",{class:"s-pop-choujiang-resule-icon"},[e("img",{src:U,alt:""})],-1),D=e("i",{class:"iconfont icon-guanbi"},null,-1),M=[D],Z={class:"s-pop-title"},N={class:"s-pop-tips"},q={class:"s-pop-btn-box g-flex-align-center g-flex-justify-center"},I={__name:"ChouJiangReSultPop",setup(V,{expose:g}){k();const _=m.exports.useI18n(),l=w(()=>_.tm("choujiang"));let o=p(!1),a=d({obj:{}});function h(f){a.obj=f,o.value=!0}function c(){o.value=!1}return g({onShow:h}),(f,u)=>{const r=H("van-popup");return L(),W("div",z,[j(r,{"close-on-click-overlay":!1,class:"s-pop",show:n(o),"onUpdate:show":u[0]||(u[0]=v=>S(o)?o.value=v:o=v),position:"center"},{default:K(()=>[e("div",Q,[B,e("div",{onClick:c,class:"s-pop-close"},M),e("div",Z,[e("span",null,i(l.value.gongxiText),1)]),e("div",N,[e("span",null,i(n(a).obj.tip),1)]),e("div",q,[e("div",{onClick:c,class:"s-pop-btn g-flex-align-center g-flex-justify-center"},[e("span",null,i(l.value.comfirmText),1)])])])]),_:1},8,["show"])])}}};const Y={class:"v_chou_jiang g-flex-column n-bg"},O={class:"v-head"},F=e("img",{src:J,alt:""},null,-1),T=[F],X={class:"v-chou-jiang-container"},P={class:"v-chou-jiang-top g-flex-column g-flex-align-center"},$={class:"v-chou-jiang-title"},ee={class:"v-chou-jiang-shengyu g-flex-justify-center g-flex-align-center"},te={class:"v-chou-jiang-shengyu-title"},se={class:"v-chou-jiang-shengyu-val"},oe={class:"v-chou-jiang-zhuanpan g-flex-align-center g-flex-justify-center"},ie={__name:"ChouJiang",setup(V){const g=k(),_=m.exports.useI18n(),l=w(()=>_.tm("choujiang"));let o=p([{padding:"35px",background:"transparent",imgs:[{src:"/img/icon/dial_turntable.png",width:330,height:330,top:-5,rotate:!0}]}]),a=d({list:[]}),h=p(0);c();async function c(){g.loadingShow=!0;const{success:s,data:t}=await G();!s||(console.log(t),a.list=t.list,h.value=t.lotteryNums,t.list.length&&(u.offsetDegree=360/t.list.length/2))}let f=d({list:[{radius:"35%",background:"transparent",pointer:!0,fonts:[{text:"GO",top:"-10px",fontColor:"#FFF"}],imgs:[{src:"/img/icon/dial_tead_round.png",top:-50,width:70}]}]}),u=d({gutter:0,stopRange:0,offsetDegree:0,speed:10,accelerationTime:2e3,decelerationTime:3e3}),r=p(null);function v(){C()}let y=p(null),b=d({obj:{}});async function C(){g.loadingShow=!0;const{success:s,data:t}=await E();!s||(r.value.play(),b.obj=t.userLottery,setTimeout(()=>{const A=a.list.findIndex(x=>x.id==b.obj.lottery_id);A!=-1&&r.value.stop(A)},3e3),console.log(t))}function R(s){y.value.onShow(b.obj),c(),console.log(s)}return(s,t)=>{const A=H("LuckyWheel");return L(),W("div",Y,[e("div",O,[e("div",{onClick:t[0]||(t[0]=x=>s.$router.go(-1)),class:"v-chou-jiang-back"},T),e("div",{onClick:t[1]||(t[1]=x=>s.$router.push({name:"choujianghistory"})),class:"v-chou-jiang-head-right"},[e("span",null,i(l.value.jiluText),1)])]),e("div",X,[e("div",P,[e("div",$,i(l.value.titleText),1),e("div",ee,[e("div",te,i(l.value.kechoucishuText)+": ",1),e("div",se,i(s.$t("choujiang.ciText",{val1:n(h)})),1)])]),e("div",oe,[j(A,{ref_key:"refMyLucky",ref:r,width:"320px",height:"320px",prizes:n(a).list,defaultConfig:n(u),blocks:n(o),buttons:n(f).list,onStart:v,onEnd:R},null,8,["prizes","defaultConfig","blocks","buttons"])])]),j(I,{ref_key:"refChouJiangReSultPop",ref:y},null,512)])}}};export{ie as default};
