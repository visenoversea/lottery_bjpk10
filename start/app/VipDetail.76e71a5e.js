import{k as f,l as h,s as x,u as w,c as k,a as y,b as a,o as s,d as n,f as e,e as c,w as r,F as b,h as j,g as C,t as l}from"./index.de11b688.js";const V={class:"v_vip_detail g-flex-column"},$={class:"v-head g-flex-justify-center g-flex-align-center"},B=e("i",{class:"iconfont icon-zuojiantou"},null,-1),D=[B],R=e("span",{class:"v-title g-flex-align-center g-flex-justify-center"},"VIP1",-1),F={class:"v-vip-detail-container"},I=["src"],L={class:"v-vip-detail-list"},N=["onClick"],z={class:"v-item-left g-flex-align-center"},E={class:"v-item-left-img g-flex-align-center"},O=["src"],P={class:"v-item-left-title"},S={class:"v-item-right g-flex-column g-flex-align-center"},q={class:"v-item-right-tips g-flex-align-center g-flex-justify-center"},A=e("span",{class:"v-item-right-tips-title"},"\u5E95\u6CE8:",-1),G={class:"v-item-right-tips-val"},H={class:"v-item-right-tips g-flex-align-center g-flex-justify-center"},J=e("span",{class:"v-item-right-tips-title"},"\u51C6\u5165:",-1),K={class:"v-item-right-tips-val"},U={__name:"VipDetail",setup(M){const _=f();h(),x();const v=w();k(()=>v.tm("mainView"));let d=y({list:[{title:"\u666E\u901A\u573A",icon:"/img/banner/lv1.png",min:2,comein:"10000"},{title:"\u4E2D\u7EA7\u573A",icon:"/img/banner/lv2.png",min:200,comein:"200000"},{title:"\u9AD8\u7EA7\u573A",icon:"/img/banner/lv3.png",min:1e3,comein:"300000"}]});function g(){_.push({name:"chip"})}return(o,i)=>{const p=a("van-swipe-item"),m=a("van-swipe");return s(),n("div",V,[e("div",$,[e("div",{onClick:i[0]||(i[0]=t=>o.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},D),R,e("div",{onClick:i[1]||(i[1]=t=>o.$router.push({name:"rule"})),class:"v-head-right g-flex-align-center"}," \u6E38\u620F\u73A9\u6CD5 ")]),e("div",F,[c(m,{class:"v-vip-detail-swipe",autoplay:3e3,"indicator-color":"white"},{default:r(()=>[c(p,{class:"v-vip-detail-swipe-item"},{default:r(()=>[e("img",{src:"/img/banner/banner_vip1.png",alt:""},null,8,I)]),_:1})]),_:1}),e("div",L,[(s(!0),n(b,null,j(C(d).list,(t,u)=>(s(),n("div",{onClick:Q=>g(),class:"v-vip-detail-item g-flex-justify-between g-flex-align-center",key:u},[e("div",z,[e("div",E,[e("img",{src:t.icon,alt:""},null,8,O)]),e("div",P,[e("span",null,l(t.title),1)])]),e("div",S,[e("div",q,[A,e("span",G,l(t.min),1)]),e("div",H,[J,e("span",K,l(t.comein),1)])])],8,N))),128))])])])}}};export{U as default};
