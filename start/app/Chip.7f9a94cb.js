import{_ as de,g as r,u as Y,c as T,r as W,o as v,a as g,e as E,k as fe,b as e,t as l,d as o,M as S,N as I,Q as H,f as _e,E as ve,s as ge,F as k,X as me,Y as J,Z as p,p as B,v as U,$ as he,a0 as K,a1 as ye,a2 as xe,P as be,a3 as je,a4 as X}from"./main.b40c5a5a.js";const Ce=""+new URL("../img/chip/clock.png",import.meta.url).href,$e=""+new URL("../img/chip/bell.png",import.meta.url).href;const ke={class:"s_chip_pop"},we={class:"s-pop-container g-flex-column"},Le={class:"quick-list"},Se={class:"title"},Ie=["onClick"],Ge={__name:"ChipPop",emits:["lotterySelected"],setup(ee,{expose:G,emit:b}){const D=r([]),a=Y(),j=T(()=>a.tm("chip")),u=r(!1);function m(d){D.value=d,u.value=!0}function w(d){d.status===2?H(j.value.noOpen):(b("lotterySelected",d.id),h())}function h(){u.value=!1}return G({onShow:m}),(d,P)=>{const O=W("van-popup");return v(),g("div",ke,[E(O,{"safe-area-inset-bottom":"",class:"custom-popup",show:u.value,"onUpdate:show":P[0]||(P[0]=y=>u.value=y),position:"left"},{default:fe(()=>[e("div",we,[e("div",Le,[e("div",Se,l(o(j).switch),1),(v(!0),g(S,null,I(D.value,y=>(v(),g("div",{class:"quick-item",key:`chips${y}`,onClick:z=>w(y)},l(y.lottery_name+" "+y.name),9,Ie))),128))])])]),_:1},8,["show"])])}}},De=de(Ge,[["__scopeId","data-v-1f535015"]]);const Pe={class:"v_chip g-flex-column"},Oe={class:"v-chip-head"},qe={class:"v-chip-head-top g-flex-align-center"},Re=e("i",{class:"iconfont icon-zuojiantou"},null,-1),Ve=[Re],Ne={class:"v-chip-head-top-title g-flex-align-center g-flex-justify-center"},Te={class:"head-icon g-flex-align-center"},Ee=e("i",{class:"iconfont icon-datijilu"},null,-1),He=[Ee],Ae={class:"lottery-select-wrap g-flex-align-center g-flex-justify-between"},Be={class:"label g-flex-align-center"},Ue=e("div",{class:"v-content-right-icon g-flex-align-center"},[e("i",{class:"iconfont icon-you"})],-1),We={class:"label g-flex-align-center"},ze={class:"bet-info g-flex"},Me={class:"bet-info-item"},Fe={class:"bet-info-item"},Qe={class:"bet-info-item"},Ze={class:"v-chip-info"},Je={class:"lottery-data g-flex-align-center"},Ke=e("img",{src:Ce,alt:""},null,-1),Xe={class:"period"},Ye=e("img",{src:$e,alt:""},null,-1),et={class:"period"},tt={class:"v-chip-content g-flex"},nt={class:"play-type"},ot=["onClick"],lt={class:"type-content"},st={class:"content-title g-flex-align-center g-flex-justify-center"},it={class:"nums-wrap"},ct=["onClick"],at={class:"rate"},rt={class:"v-chip-footer g-flex-align-center"},ut={class:"quick-list g-flex-align-center"},pt=["onClick"],dt={class:"amount"},vt={__name:"Chip",setup(ee){_e();const G=ve(),b=ge(),D=Y(),a=T(()=>D.tm("chip")),j=r(!1);let u=k({obj:{lottery:{}}});r();const m=r(),w=r(0);let h=k({id:G.query.id,room:G.query.room}),d=k({list:[]});function P(t){h.id=t,O()}async function O(){b.loadingShow=!0;const{success:t,data:n}=await he({id:h.id});if(!!t){if(u.obj=n.info,b.loadingShow=!0,n.info.next.lottery_id){let s={type:2,open_expect:n.info.next.open_expect,content:"",content2:""};d.list.unshift(s)}y(),V()}}O();function y(){K.joinGroup("lotteryRoom"+h.id,t=>{let n={type:2,open_expect:t.openExpect,content:"",content2:""},s=k({type:3,open_expect:t.openExpect,content:`${a.value.yifengpanText}:`,content2:""});if(t.type==1){let _=t,i=te(t.lotteryPlayed);_.targetObj=i,d.list.unshift(_)}else t.type==2?d.list.unshift(n):t.type==3&&d.list.unshift(s);d.list.length>=1e3&&(d.list=d.list.slice(0,1e3))})}function z(){K.leaveGroup("lotteryRoom"+h.id)}function te(t){let n=[];u.obj.lotteryGroupList.forEach(_=>{n=n.concat(_.lotteryPlayedList)});let s=n.find(_=>t.id==_.id);return s?Object.assign(s,t):{id:"",name:"",amount:""}}r(!1),r(!1);let q=r(0),A=k({list:[]}),C=k({obj:{next:{open_expect:"-"}}});const c=T(()=>{if(A.list.length){let t=A.list[0];return t.open_code_arr=t.open_code.split(",").map(n=>Number(n)),t.total=t.open_code_arr.reduce((n,s)=>n+s),t}else return{open_expect:"-",open_code:"",open_code_arr:[],open_time:"",total:0}}),L=r(0),R=r(0);async function V(){const{success:t,data:n}=await ye({id:u.obj.lottery_id});!t||(A.list=n.lotteryDataList.map(s=>(s.open_code_arr=s.open_code.split(",").map(_=>Number(_)),s.total=s.open_code_arr.reduce((_,i)=>_+i),s)),(C.obj.next.open_expect==="-"||C.obj.next.open_expect!==n.lottery.next.open_expect)&&Z(n.lottery.next.open_expect),C.obj=n.lottery,L.value=n.lottery.next.open_time-n.nowTime-n.lottery.stop_time,R.value=n.lottery.next.open_time-n.nowTime,ne())}let M=r(1);function ne(){q.value&&clearInterval(q.value),q.value=setInterval(()=>{M.value++,M.value%5==0&&V(),L.value>0&&L.value--,R.value>0?R.value--:V()},1e3)}let F=r(null);function oe(){F.value.onShow(Q.value)}r("ChipCancelPop");const le=T(()=>f.value.length),f=r([]),se=t=>{if(t===0||t===3||t===6)return"chip-red";if(t===1||t===4||t===7)return"chip-blue";if(t===2||t===5||t===8)return"chip-green"},ie=t=>t<1e3?t:t<1e6?t/1e3+"K":t/1e6+"M",ce=t=>f.value.findIndex(s=>t.id==s.id)!=-1,ae=t=>{let n=f.value.findIndex(s=>t.id==s.id);n==-1?f.value.push(t):f.value.splice(n,1),console.log(f.value)},re=async()=>{if(!m.value){H.fail(a.value.amountPlaceholder);return}if(!f.value.length){H.fail(a.value.betsPlaceholder);return}f.value.length&&f.value.forEach(s=>{s.amount=m.value}),b.loadingShow=!0;const{success:t,data:n}=await xe({amount:m.value,betList:f.value,id:h.id,openExpect:C.obj.next.open_expect});!t||(H.success(n.msg),Z(),m.value="",f.value=[],resetData(),emits("emitDownOrderSuccess"),onClose())},Q=r();async function ue(){const{success:t,data:n}=await be({id:h.room});!t||(Q.value=n.info)}ue();const N=r({}),Z=async t=>{const{success:n,data:s}=await je({id:h.id,lottery_expect:t||C.obj.next.open_expect});!n||(N.value=s.info)},pe=()=>{b.system.SGLotteryVideo&&window.open(b.system.SGLotteryVideo)};return me(()=>{clearInterval(q.value),z()}),(t,n)=>{const s=W("van-icon"),_=W("van-field");return v(),g("div",Pe,[e("div",Oe,[e("div",qe,[e("div",{onClick:n[0]||(n[0]=i=>t.$router.go(-1)),class:"v-chip-head-top-left g-flex-align-center"},Ve),e("div",Ne,[e("span",null,l(o(u).obj.lottery.name)+" "+l(o(u).obj.name),1)]),e("div",Te,[E(s,{onClick:n[1]||(n[1]=i=>V()),color:"#fff",name:"replay",size:"1.5rem"})]),e("div",{class:"v-head-right g-flex-align-center",onClick:n[2]||(n[2]=i=>t.$router.push("/betsrecord"))},He)]),e("div",Ae,[e("div",{class:"lottery-select g-flex",onClick:oe},[e("div",Be,l(o(a).switch),1),Ue]),e("div",{class:"lottery-select lottery-video g-flex",onClick:pe},[e("div",We,l(o(a).lotteryVideo),1)])]),e("div",ze,[e("div",Me,[e("label",null,l(o(a).balance),1),e("p",null,l(N.value.balance),1)]),e("div",Fe,[e("label",null,l(o(a).todayWin),1),e("p",null,l(N.value.todayWin),1)]),e("div",Qe,[e("label",null,l(o(a).betAmount),1),e("p",null,l(N.value.betAmount),1)])]),e("div",Ze,[e("div",Je,[Ke,e("div",Xe,l(o(C).obj.next.open_expect)+"\xA0"+l(o(a).expect),1),J(" "+l(o(a).close)+" ",1),e("span",null,l(o(X)(L.value)),1),J(" "+l(o(a).open)+" ",1),e("span",null,l(o(X)(R.value)),1)]),e("div",{class:"lottery-data g-flex-align-center",onClick:n[3]||(n[3]=i=>t.$router.push({path:"/lotteryHistory",query:{id:o(u).obj.lottery_id}}))},[Ye,e("div",et,l(o(c).open_expect)+"\xA0"+l(o(a).expect),1),e("div",{class:p(["number g-flex-align-center g-flex-justify-center",`number${o(c).open_code.split(",")[0]}`])},l(o(c).open_code.split(",")[0]),3),e("div",{class:p(["number g-flex-align-center g-flex-justify-center",`number${o(c).open_code.split(",")[1]}`])},l(o(c).open_code.split(",")[1]),3),e("div",{class:p(["number g-flex-align-center g-flex-justify-center",`number${o(c).open_code.split(",")[2]}`])},l(o(c).open_code.split(",")[2]),3),e("div",{class:p(["number g-flex-align-center g-flex-justify-center",`number${o(c).open_code.split(",")[3]}`])},l(o(c).open_code.split(",")[3]),3),e("div",{class:p(["number g-flex-align-center g-flex-justify-center",`number${o(c).open_code.split(",")[4]}`])},l(o(c).open_code.split(",")[4]),3),e("div",{class:p(["number g-flex-align-center g-flex-justify-center",`number${o(c).open_code.split(",")[5]}`])},l(o(c).open_code.split(",")[5]),3),e("div",{class:p(["number g-flex-align-center g-flex-justify-center",`number${o(c).open_code.split(",")[6]}`])},l(o(c).open_code.split(",")[6]),3),e("div",{class:p(["number g-flex-align-center g-flex-justify-center",`number${o(c).open_code.split(",")[7]}`])},l(o(c).open_code.split(",")[7]),3),e("div",{class:p(["number g-flex-align-center g-flex-justify-center",`number${o(c).open_code.split(",")[8]}`])},l(o(c).open_code.split(",")[8]),3),e("div",{class:p(["number g-flex-align-center g-flex-justify-center",`number${o(c).open_code.split(",")[9]}`])},l(o(c).open_code.split(",")[9]),3)])])]),e("div",tt,[e("div",nt,[(v(!0),g(S,null,I(o(u).obj.lotteryGroupList,(i,$)=>(v(),g("div",{class:p(["type-item g-flex-align-center g-flex-justify-center",w.value===$?"active":""]),key:`room${i.id}`,onClick:x=>w.value=$},l(i.name),11,ot))),128))]),e("div",lt,[(v(!0),g(S,null,I(o(u).obj.lotteryGroupList,(i,$)=>B((v(),g("div",{class:"content-item",key:`type${i.id}`},[e("div",st,l(i.name),1),e("div",it,[(v(!0),g(S,null,I(i.lotteryPlayedList,x=>(v(),g("div",{class:p(["num-item g-flex-align-center g-flex-justify-center",ce(x)?"active":""]),key:`num${x.id}`,onClick:ft=>ae(x)},[e("div",{class:p(["num g-flex-align-center g-flex-justify-center",`number${x.name}`])},l(x.name),3),e("div",at,l(x.odds),1)],10,ct))),128))])])),[[U,w.value===$]])),128))])]),e("div",rt,[B(e("div",ut,[(v(!0),g(S,null,I(o(u).obj.quickList,(i,$)=>(v(),g("div",{class:p([se($),"quick-item g-flex-align-center g-flex-justify-center"]),key:`chips${i}`,onClick:x=>m.value=i},l(ie(i)),11,pt))),128))],512),[[U,j.value]]),e("div",dt,[e("p",null,l(t.$t("chip.betedText",{num:o(le)})),1),E(_,{class:"chip-amount",modelValue:m.value,"onUpdate:modelValue":n[4]||(n[4]=i=>m.value=i),label:"","label-width":"0",placeholder:o(a).betAmount},null,8,["modelValue","placeholder"])]),e("div",{class:"foot-btn btn-green g-flex-align-center g-flex-justify-center",onClick:re},l(o(a).betText),1),e("div",{class:"foot-btn btn-red g-flex-align-center g-flex-justify-center",onClick:n[5]||(n[5]=i=>j.value=!j.value)},l(o(a).chips),1),e("div",{class:"foot-btn btn-blue g-flex-align-center g-flex-justify-center",onClick:n[6]||(n[6]=i=>f.value=[])},l(o(a).reset),1),B(e("div",{class:"close g-flex-align-center g-flex-justify-center"},l(o(a).closed),513),[[U,L.value<1]])]),E(De,{ref_key:"refChipPop",ref:F,onLotterySelected:P},null,512)])}}};export{vt as default};
