import{_ as pe,e as c,v as ee,c as H,r as z,o as f,a as _,d as N,j as de,b as e,t as l,K as D,M as O,P as V,u as ve,D as fe,s as _e,E as $,U as ge,h,V as Q,W as r,m as W,p as B,X as me,Y as X,Z as he,$ as ye,O as xe,a0 as be,a1 as Y}from"./main.05221b59.js";const je=""+new URL("../img/chip/clock.png",import.meta.url).href,Ce=""+new URL("../img/chip/bell.png",import.meta.url).href;const $e={class:"s_chip_pop"},ke={class:"s-pop-container g-flex-column"},we={class:"quick-list"},Le={class:"title"},Ie=["onClick"],Se={__name:"ChipPop",emits:["lotterySelected"],setup(te,{expose:P,emit:k}){const G=c([]),a=k,w=ee.exports.useI18n(),u=H(()=>w.tm("chip")),p=c(!1);function L(b){G.value=b,p.value=!0}function g(b){b.status===2?V(u.value.noOpen):(a("lotterySelected",b.id),m())}function m(){p.value=!1}return P({onShow:L}),(b,I)=>{const A=z("van-popup");return f(),_("div",$e,[N(A,{"safe-area-inset-bottom":"",class:"custom-popup",show:p.value,"onUpdate:show":I[0]||(I[0]=y=>p.value=y),position:"left"},{default:de(()=>[e("div",ke,[e("div",we,[e("div",Le,l(u.value.switch),1),(f(!0),_(D,null,O(G.value,y=>(f(),_("div",{class:"quick-item",key:`chips${y}`,onClick:M=>g(y)},l(y.lottery_name+" "+y.name),9,Ie))),128))])])]),_:1},8,["show"])])}}},De=pe(Se,[["__scopeId","data-v-1f535015"]]);const Oe={class:"v_chip g-flex-column"},Pe={class:"v-chip-head"},Ge={class:"v-chip-head-top g-flex-align-center"},qe=e("i",{class:"iconfont icon-zuojiantou"},null,-1),Re=[qe],Te={class:"v-chip-head-top-title g-flex-align-center g-flex-justify-center"},Ee={class:"head-icon g-flex-align-center"},He=e("i",{class:"iconfont icon-datijilu"},null,-1),Ne=[He],Ve={class:"lottery-select-wrap g-flex-align-center g-flex-justify-between"},Ae={class:"label g-flex-align-center"},Ue=e("div",{class:"v-content-right-icon g-flex-align-center"},[e("i",{class:"iconfont icon-you"})],-1),We={class:"bet-info g-flex"},Be={class:"bet-info-item"},ze={class:"bet-info-item"},Me={class:"bet-info-item"},Ke={class:"v-chip-info"},Ze={class:"lottery-data g-flex-align-center"},Fe=e("img",{src:je,alt:""},null,-1),Je={class:"period"},Qe=e("img",{src:Ce,alt:""},null,-1),Xe={class:"period"},Ye={class:"v-chip-content g-flex"},et={class:"play-type"},tt=["onClick"],nt={class:"type-content"},lt={class:"content-title g-flex-align-center g-flex-justify-center"},ot={class:"nums-wrap"},st=["onClick"],it={class:"rate"},at={class:"v-chip-footer g-flex-align-center"},ct={class:"quick-list g-flex-align-center"},rt=["onClick"],ut={class:"amount"},vt={__name:"Chip",setup(te){ve();const P=fe(),k=_e(),G=ee.exports.useI18n(),a=H(()=>G.tm("chip")),w=c(!1);let u=$({obj:{lottery:{}}});c();const p=c(),L=c(0);let g=$({id:P.query.id,room:P.query.room}),m=$({list:[]});function b(t){g.id=t,I()}async function I(){k.loadingShow=!0;const{success:t,data:n}=await me({id:g.id});if(!!t){if(u.obj=n.info,k.loadingShow=!0,n.info.next.lottery_id){let o={type:2,open_expect:n.info.next.open_expect,content:"",content2:""};m.list.unshift(o)}A(),T()}}I();function A(){X.joinGroup("lotteryRoom"+g.id,t=>{let n={type:2,open_expect:t.openExpect,content:"",content2:""},o=$({type:3,open_expect:t.openExpect,content:`${a.value.yifengpanText}:`,content2:""});if(t.type==1){let v=t,s=M(t.lotteryPlayed);v.targetObj=s,m.list.unshift(v)}else t.type==2?m.list.unshift(n):t.type==3&&m.list.unshift(o);m.list.length>=1e3&&(m.list=m.list.slice(0,1e3))})}function y(){X.leaveGroup("lotteryRoom"+g.id)}function M(t){let n=[];u.obj.lotteryGroupList.forEach(v=>{n=n.concat(v.lotteryPlayedList)});let o=n.find(v=>t.id==v.id);return o?Object.assign(o,t):{id:"",name:"",amount:""}}c(!1),c(!1);let q=c(0),U=$({list:[]}),j=$({obj:{next:{open_expect:"-"}}});const i=H(()=>{if(U.list.length){let t=U.list[0];return t.open_code_arr=t.open_code.split(",").map(n=>Number(n)),t.total=t.open_code_arr.reduce((n,o)=>n+o),t}else return{open_expect:"-",open_code:"",open_code_arr:[],open_time:"",total:0}}),S=c(0),R=c(0);async function T(){const{success:t,data:n}=await he({id:u.obj.lottery_id});!t||(U.list=n.lotteryDataList.map(o=>(o.open_code_arr=o.open_code.split(",").map(v=>Number(v)),o.total=o.open_code_arr.reduce((v,s)=>v+s),o)),(j.obj.next.open_expect==="-"||j.obj.next.open_expect!==n.lottery.next.open_expect)&&J(n.lottery.next.open_expect),j.obj=n.lottery,S.value=n.lottery.next.open_time-n.nowTime-n.lottery.stop_time,R.value=n.lottery.next.open_time-n.nowTime,ne())}let K=c(1);function ne(){q.value&&clearInterval(q.value),q.value=setInterval(()=>{K.value++,K.value%5==0&&T(),S.value>0&&S.value--,R.value>0?R.value--:T()},1e3)}let Z=c(null);function le(){Z.value.onShow(F.value)}c("ChipCancelPop");const oe=H(()=>d.value.length),d=c([]),se=t=>{if(t===0||t===3||t===6)return"chip-red";if(t===1||t===4||t===7)return"chip-blue";if(t===2||t===5||t===8)return"chip-green"},ie=t=>t<1e3?t:t<1e6?t/1e3+"K":t/1e6+"M",ae=t=>d.value.findIndex(o=>t.id==o.id)!=-1,ce=t=>{let n=d.value.findIndex(o=>t.id==o.id);n==-1?d.value.push(t):d.value.splice(n,1),console.log(d.value)},re=async()=>{if(!p.value){V.fail(a.value.amountPlaceholder);return}if(!d.value.length){V.fail(a.value.betsPlaceholder);return}d.value.length&&d.value.forEach(o=>{o.amount=p.value}),k.loadingShow=!0;const{success:t,data:n}=await ye({amount:p.value,betList:d.value,id:g.id,openExpect:j.obj.next.open_expect});!t||(V.success(n.msg),J(),p.value="",d.value=[],resetData(),emits("emitDownOrderSuccess"),onClose())},F=c();async function ue(){const{success:t,data:n}=await xe({id:g.room});!t||(F.value=n.info)}ue();const E=c({}),J=async t=>{const{success:n,data:o}=await be({id:g.id,lottery_expect:t||j.obj.next.open_expect});!n||(E.value=o.info)};return ge(()=>{clearInterval(q.value),y()}),(t,n)=>{const o=z("van-icon"),v=z("van-field");return f(),_("div",Oe,[e("div",Pe,[e("div",Ge,[e("div",{onClick:n[0]||(n[0]=s=>t.$router.go(-1)),class:"v-chip-head-top-left g-flex-align-center"},Re),e("div",Te,[e("span",null,l(h(u).obj.lottery.name)+" "+l(h(u).obj.name),1)]),e("div",Ee,[N(o,{onClick:n[1]||(n[1]=s=>T()),color:"#fff",name:"replay",size:"1.5rem"})]),e("div",{class:"v-head-right g-flex-align-center",onClick:n[2]||(n[2]=s=>t.$router.push("/betsrecord"))},Ne)]),e("div",Ve,[e("div",{class:"lottery-select g-flex",onClick:le},[e("div",Ae,l(a.value.switch),1),Ue]),e("div",We,[e("div",Be,[e("label",null,l(a.value.balance),1),e("p",null,l(E.value.balance),1)]),e("div",ze,[e("label",null,l(a.value.betAmount),1),e("p",null,l(E.value.betAmount),1)]),e("div",Me,[e("label",null,l(a.value.todayWin),1),e("p",null,l(E.value.todayWin),1)])])]),e("div",Ke,[e("div",Ze,[Fe,e("div",Je,l(h(j).obj.next.open_expect)+"\xA0"+l(a.value.expect),1),Q(" "+l(a.value.close)+" ",1),e("span",null,l(h(Y)(S.value)),1),Q(" "+l(a.value.open)+" ",1),e("span",null,l(h(Y)(R.value)),1)]),e("div",{class:"lottery-data g-flex-align-center",onClick:n[3]||(n[3]=s=>t.$router.push({path:"/lotteryHistory",query:{id:h(u).obj.lottery_id}}))},[Qe,e("div",Xe,l(i.value.open_expect)+"\xA0"+l(a.value.expect),1),e("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[0]}`])},l(i.value.open_code.split(",")[0]),3),e("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[1]}`])},l(i.value.open_code.split(",")[1]),3),e("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[2]}`])},l(i.value.open_code.split(",")[2]),3),e("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[3]}`])},l(i.value.open_code.split(",")[3]),3),e("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[4]}`])},l(i.value.open_code.split(",")[4]),3),e("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[5]}`])},l(i.value.open_code.split(",")[5]),3),e("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[6]}`])},l(i.value.open_code.split(",")[6]),3),e("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[7]}`])},l(i.value.open_code.split(",")[7]),3),e("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[8]}`])},l(i.value.open_code.split(",")[8]),3),e("div",{class:r(["number g-flex-align-center g-flex-justify-center",`number${i.value.open_code.split(",")[9]}`])},l(i.value.open_code.split(",")[9]),3)])])]),e("div",Ye,[e("div",et,[(f(!0),_(D,null,O(h(u).obj.lotteryGroupList,(s,C)=>(f(),_("div",{class:r(["type-item g-flex-align-center g-flex-justify-center",L.value===C?"active":""]),key:`room${s.id}`,onClick:x=>L.value=C},l(s.name),11,tt))),128))]),e("div",nt,[(f(!0),_(D,null,O(h(u).obj.lotteryGroupList,(s,C)=>W((f(),_("div",{class:"content-item",key:`type${s.id}`},[e("div",lt,l(s.name),1),e("div",ot,[(f(!0),_(D,null,O(s.lotteryPlayedList,x=>(f(),_("div",{class:r(["num-item g-flex-align-center g-flex-justify-center",ae(x)?"active":""]),key:`num${x.id}`,onClick:pt=>ce(x)},[e("div",{class:r(["num g-flex-align-center g-flex-justify-center",`number${x.name}`])},l(x.name),3),e("div",it,l(x.odds),1)],10,st))),128))])])),[[B,L.value===C]])),128))])]),e("div",at,[W(e("div",ct,[(f(!0),_(D,null,O(h(u).obj.quickList,(s,C)=>(f(),_("div",{class:r([se(C),"quick-item g-flex-align-center g-flex-justify-center"]),key:`chips${s}`,onClick:x=>p.value=s},l(ie(s)),11,rt))),128))],512),[[B,w.value]]),e("div",ut,[e("p",null,l(t.$t("chip.betedText",{num:oe.value})),1),N(v,{class:"chip-amount",modelValue:p.value,"onUpdate:modelValue":n[4]||(n[4]=s=>p.value=s),label:"","label-width":"0",placeholder:a.value.betAmount},null,8,["modelValue","placeholder"])]),e("div",{class:"foot-btn btn-green g-flex-align-center g-flex-justify-center",onClick:re},l(a.value.betText),1),e("div",{class:"foot-btn btn-red g-flex-align-center g-flex-justify-center",onClick:n[5]||(n[5]=s=>w.value=!w.value)},l(a.value.chips),1),e("div",{class:"foot-btn btn-blue g-flex-align-center g-flex-justify-center",onClick:n[6]||(n[6]=s=>d.value=[])},l(a.value.reset),1),W(e("div",{class:"close g-flex-align-center g-flex-justify-center"},l(a.value.closed),513),[[B,S.value<1]])]),N(De,{ref_key:"refChipPop",ref:Z,onLotterySelected:b},null,512)])}}};export{vt as default};
