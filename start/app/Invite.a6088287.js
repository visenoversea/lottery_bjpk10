import{E as f,e as m,s as g,v as p,c as o,o as c,a as h,b as e,h as t,i as x,l as y,t as l,J as I,ab as k,_ as b}from"./main.668e0eaf.js";import{v as j}from"./vue-qr.bc26bdd4.js";import"./index.486187f3.js";const w=""+new URL("../images/feiji.png",import.meta.url).href;const U={class:"v_share g-flex-column n-bg"},B={class:"new-head"},C=e("img",{src:b,alt:""},null,-1),V=[C],$={class:"v-share-container"},E=e("img",{class:"feiji",src:w,alt:""},null,-1),G={class:"v-share-card g-flex-column g-flex-align-center"},L={class:"v-share-qr-box g-flex-justify-center"},N={class:"v-share-address"},D={__name:"Invite",setup(Q){let n=f({address:""}),d=m(5);const r=g(),i=p.exports.useI18n(),_=o(()=>i.tm("invite"));o(()=>i.tm("gongyong")),o(()=>r.userInfo);async function u(){r.loadingShow=!0;const{success:a,data:s}=await I();!a||(r.setUserInfo(s.info),n.address=s.info.promoteUrl,console.log(s))}return u(),(a,s)=>(c(),h("div",U,[e("div",B,[e("div",{onClick:s[0]||(s[0]=v=>a.$router.go(-1)),class:"new-head-back"},V)]),e("div",$,[E,e("div",G,[e("div",L,[t(n).address?(c(),x(j,{key:0,correctLevel:3,ref:"refVueQr",text:t(n).address,margin:t(d),size:130},null,8,["text","margin"])):y("",!0)]),e("div",N,[e("span",null,l(t(n).address),1)])])]),e("div",{onClick:s[1]||(s[1]=v=>t(k)(t(n).address)),class:"v-shares-btn g-flex-align-center g-flex-justify-center"},[e("span",null,l(_.value.copyInviteText),1)])]))}};export{D as default};
