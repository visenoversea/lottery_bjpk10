import{u as Y,D as ee,s as te,v as ne,c as O,e as a,E as y,O as le,r as oe,o as d,a as f,b as n,t as s,h as g,P as N,Q as r,K as j,M as $,m as G,p as R,d as se,S as ie,W as V,U as ae,V as P,X as re}from"./main.11e38532.js";const ce=""+new URL("../img/chip/clock.png",import.meta.url).href,ue=""+new URL("../img/chip/bell.png",import.meta.url).href;const pe={class:"v_chip g-flex-column"},de={class:"v-chip-head"},fe={class:"v-chip-head-top g-flex-align-center"},ve=n("i",{class:"iconfont icon-zuojiantou"},null,-1),_e=[ve],ge={class:"v-chip-head-top-title g-flex-align-center g-flex-justify-center"},me=n("i",{class:"iconfont icon-datijilu"},null,-1),he=[me],ye={class:"v-chip-info"},xe={class:"lottery-data g-flex-align-center"},be=n("img",{src:ce,alt:""},null,-1),je={class:"period"},$e=n("img",{src:ue,alt:""},null,-1),Ce={class:"period"},ke={class:"v-chip-content g-flex"},we={class:"play-type"},Le=["onClick"],De={class:"type-content"},Ie={class:"content-title g-flex-align-center g-flex-justify-center"},Se={class:"nums-wrap"},Oe=["onClick"],Ge={class:"rate"},Re={class:"v-chip-footer g-flex-align-center"},Pe={class:"quick-list g-flex-align-center"},Ee=["onClick"],He={class:"amount"},Ne={class:"close g-flex-align-center g-flex-justify-center"},Te={__name:"Chip",setup(Ve){Y();const q=ee(),C=te(),M=ne.exports.useI18n(),T=O(()=>M.tm("chip")),k=a(!1);let p=y({obj:{lottery:{}}});const m=a(),w=a(0);let L=y({id:q.query.id}),_=y({list:[]});async function U(){C.loadingShow=!0;const{success:e,data:t}=await ie({id:L.id});if(!!e){if(p.obj=t.info,C.loadingShow=!0,t.info.next.lottery_id){let o={type:2,open_expect:t.info.next.open_expect,content:"",content2:""};_.list.unshift(o)}W(),S()}}U();function W(){V.joinGroup("lotteryRoom"+L.id,e=>{let t={type:2,open_expect:e.openExpect,content:"",content2:""},o=y({type:3,open_expect:e.openExpect,content:`${T.value.yifengpanText}:`,content2:""});if(e.type==1){let l=e,u=B(e.lotteryPlayed);l.targetObj=u,_.list.unshift(l)}else e.type==2?_.list.unshift(t):e.type==3&&_.list.unshift(o);_.list.length>=1e3&&(_.list=_.list.slice(0,1e3))})}function A(){V.leaveGroup("lotteryRoom"+L.id)}function B(e){let t=[];p.obj.lotteryGroupList.forEach(l=>{t=t.concat(l.lotteryPlayedList)});let o=t.find(l=>e.id==l.id);return o?Object.assign(o,e):{id:"",name:"",amount:""}}a(!1),a(!1);let b=a(0);a(0),a(0),a(0),a(0),a(""),a(""),a("");let D=y({list:[]}),I=y({obj:{next:{open_expect:"-"}}});const i=O(()=>{if(D.list.length){let e=D.list[0];return e.open_code_arr=e.open_code.split(",").map(t=>Number(t)),e.total=e.open_code_arr.reduce((t,o)=>t+o),e}else return{open_expect:"-",open_code:"",open_code_arr:[],open_time:"",total:0}}),h=a(0),x=a(0);async function S(){const{success:e,data:t}=await ae({id:p.obj.lottery_id});!e||(D.list=t.lotteryDataList.map(o=>(o.open_code_arr=o.open_code.split(",").map(l=>Number(l)),o.total=o.open_code_arr.reduce((l,u)=>l+u),o)),I.obj=t.lottery,h.value=t.lottery.next.open_time-t.nowTime-t.lottery.stop_time,x.value=t.lottery.next.open_time-t.nowTime,z())}function E(e){if(console.log("stamp:"+e),e<1)return"--:--:--";let t=Math.floor(e/3600%24),o=Math.floor(e/60%60),l=Math.floor(e/1%60);return`${t<10?"0"+t:t}:${o<10?"0"+o:o}:${l<10?"0"+l:l}`}let H=a(1);function z(){b.value&&clearInterval(b.value),b.value=setInterval(()=>{H.value++,H.value%5==0&&S(),h.value>0&&h.value--,x.value>0?x.value--:S(),console.log("--------------------------"),console.log("stopPhurchaseStamp:"+h.value),console.log("openLotteryStamp:"+x.value),console.log("--------------------------")},1e3)}a(null),a("ChipCancelPop");const K=O(()=>c.value.length),c=a([]),F=e=>{if(e===0||e===3||e===6)return"chip-red";if(e===1||e===4||e===7)return"chip-blue";if(e===2||e===5||e===8)return"chip-green"},J=e=>e<1e3?e:e<1e6?e/1e3+"K":e/1e6+"M",Q=e=>c.value.findIndex(o=>e.id==o.id)!=-1,X=e=>{let t=c.value.findIndex(o=>e.id==o.id);t==-1?c.value.push(e):c.value.splice(t,1),console.log(c.value)},Z=async()=>{if(!m.value){P.fail("\u8BF7\u8F93\u5165\u4E0B\u6CE8\u91D1\u989D");return}if(!c.value.length){P.fail("\u8BF7\u9009\u62E9\u4E0B\u6CE8\u53F7\u7801");return}c.value.length&&c.value.forEach(o=>{o.amount=m.value}),C.loadingShow=!0;const{success:e,data:t}=await re({amount:m.value,betList:c.value,id:"41",openExpect:I.obj.next.open_expect});!e||(P.success(t.msg),resetData(),emits("emitDownOrderSuccess"),onClose())};return le(()=>{clearInterval(b.value),A()}),(e,t)=>{const o=oe("van-field");return d(),f("div",pe,[n("div",de,[n("div",fe,[n("div",{onClick:t[0]||(t[0]=l=>e.$router.go(-1)),class:"v-chip-head-top-left g-flex-align-center"},_e),n("div",ge,[n("span",null,s(g(p).obj.lottery.name)+" "+s(g(p).obj.name),1)]),n("div",{class:"v-head-right g-flex-align-center",onClick:t[1]||(t[1]=l=>e.$router.push("/mybill"))},he)]),n("div",ye,[n("div",xe,[be,n("div",je,s(g(I).obj.next.open_expect)+"\u671F",1),N(" \u5C01\u76D8\uFF1A"),n("span",null,s(E(h.value)),1),N(" \u5F00\u5956\uFF1A"),n("span",null,s(E(x.value)),1)]),n("div",{class:"lottery-data g-flex-align-center",onClick:t[2]||(t[2]=l=>e.$router.push({path:"/lotteryHistory",query:{id:g(p).obj.lottery_id}}))},[$e,n("div",Ce,s(i.value.open_expect)+"\u671F",1),n("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[0]}`])},s(i.value.open_code.split(",")[0]),3),n("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[1]}`])},s(i.value.open_code.split(",")[1]),3),n("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[2]}`])},s(i.value.open_code.split(",")[2]),3),n("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[3]}`])},s(i.value.open_code.split(",")[3]),3),n("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[4]}`])},s(i.value.open_code.split(",")[4]),3),n("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[5]}`])},s(i.value.open_code.split(",")[5]),3),n("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[6]}`])},s(i.value.open_code.split(",")[6]),3),n("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[7]}`])},s(i.value.open_code.split(",")[7]),3),n("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[8]}`])},s(i.value.open_code.split(",")[8]),3),n("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[9]}`])},s(i.value.open_code.split(",")[9]),3)])])]),n("div",ke,[n("div",we,[(d(!0),f(j,null,$(g(p).obj.lotteryGroupList,(l,u)=>(d(),f("div",{class:r(["type-item g-flex-align-center g-flex-justify-center",w.value===u?"active":""]),key:`room${l.id}`,onClick:v=>w.value=u},s(l.name),11,Le))),128))]),n("div",De,[(d(!0),f(j,null,$(g(p).obj.lotteryGroupList,(l,u)=>G((d(),f("div",{class:"content-item",key:`type${l.id}`},[n("div",Ie,s(l.name),1),n("div",Se,[(d(!0),f(j,null,$(l.lotteryPlayedList,v=>(d(),f("div",{class:r(["num-item g-flex-align-center g-flex-justify-center",Q(v)?"active":""]),key:`num${v.id}`,onClick:qe=>X(v)},[n("div",{class:r(["num g-flex-align-center g-flex-justify-center",`number${v.name}`])},s(v.name),3),n("div",Ge,s(v.odds),1)],10,Oe))),128))])])),[[R,w.value===u]])),128))])]),n("div",Re,[G(n("div",Pe,[(d(!0),f(j,null,$(g(p).obj.quickList,(l,u)=>(d(),f("div",{class:r([F(u),"quick-item g-flex-align-center g-flex-justify-center"]),key:`chips${l}`,onClick:v=>m.value=l},s(J(l)),11,Ee))),128))],512),[[R,k.value]]),n("div",He,[n("p",null,"\u5DF2\u9009\u4E2D"+s(K.value)+"\u6CE8",1),se(o,{class:"chip-amount",modelValue:m.value,"onUpdate:modelValue":t[3]||(t[3]=l=>m.value=l),label:"","label-width":"0",placeholder:"\u8BF7\u8F93\u5165\u91D1\u989D"},null,8,["modelValue"])]),n("div",{class:"foot-btn btn-green g-flex-align-center g-flex-justify-center",onClick:Z}," \u4E0B\u6CE8 "),n("div",{class:"foot-btn btn-red g-flex-align-center g-flex-justify-center",onClick:t[4]||(t[4]=l=>k.value=!k.value)}," \u7B79\u7801 "),n("div",{class:"foot-btn btn-blue g-flex-align-center g-flex-justify-center",onClick:t[5]||(t[5]=l=>c.value=[])}," \u91CD\u7F6E "),G(n("div",Ne," \u5DF2\u5C01\u76D8 ",512),[[R,h.value<1]])])])}}};export{Te as default};
