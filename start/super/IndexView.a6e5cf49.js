import{M as B,r as m,c as h,d as k,o as d,k as w,h as a,w as $,g as e,e as c,f as t,N as C,G as o,i as N,O as I,n as R,b as L,m as v}from"./index.15f119bb.js";import{f as b}from"./index.969b688d.js";const T={key:0,class:"g-green"},W={key:1,class:"g-red"},D={key:2,class:"g-red"},G={key:3,class:"g-red"},F={key:4,class:"g-red"},M={key:5,class:"g-red"},O={key:6,class:"g-red"},S={key:7,class:"g-grey"},K={key:0,class:"g-green"},Q={key:1,class:"g-blue"},q={key:2,class:"g-grey"},E={key:3,class:"g-red"},P={key:0,class:"g-blue"},A={key:1},H={class:"g-red"},J={class:"g-blue"},X={class:"g-purple"},Y={class:"g-blue"},Z={__name:"UserList",props:{modelValue:{type:Boolean,default:!1}},emits:["update:modelValue","success"],setup(y,{emit:l}){const j=y,p=B({get:()=>j.modelValue,set:g=>{l("update:modelValue",g)}}),u=m({loading:!1,total:0,list:[],row:{}}),_=m({userType:"",virtual:0,status:"",dateTime:[],page:1,limit:20}),n=async(g=!0)=>{g&&(_.page=1),u.loading=!0;const{success:r,data:i}=await R.getRegList(_);u.loading=!1,r&&(u.list=i.list,u.total=i.total)},f=()=>{let g=b(void 0,"yyyy-MM-dd");_.dateTime[0]=g+" 00:00:00",_.dateTime[1]=g+" 23:59:59",n()};return(g,r)=>{const i=h("el-table-column"),V=h("el-table"),x=h("el-pagination"),U=h("el-dialog"),z=k("loading");return d(),w(U,{modelValue:N(p),"onUpdate:modelValue":r[4]||(r[4]=s=>I(p)?p.value=s:null),top:"4vh",title:"\u4ECA\u65E5\u6CE8\u518C\u4F1A\u5458",onOpen:f,draggable:"","close-on-click-modal":!1,width:"980px"},{default:a(()=>[$((d(),w(V,{height:"400",data:u.list,stripe:"",border:""},{default:a(()=>[e(i,{label:"\u72B6\u6001",width:"80"},{default:a(s=>[s.row.status===1?(d(),c("span",T,"\u6B63\u5E38")):s.row.status===2?(d(),c("span",W,"\u7981\u6B62\u63D0\u73B0")):s.row.status===3?(d(),c("span",D,"\u7981\u6B62\u4E0B\u5355")):s.row.status===4?(d(),c("span",G,"\u7981\u6B62\u4E0B\u5355\u63D0\u73B0")):s.row.status===0?(d(),c("span",F,"\u7981\u7528")):(d(),c("span",M,"\u5F02\u5E38")),s.row.isOnline?(d(),c("span",O,"(\u5728\u7EBF)")):(d(),c("span",S,"(\u79BB\u7EBF)"))]),_:1}),e(i,{label:"\u7528\u6237ID",width:"120"},{default:a(s=>[t("div",{class:C({"g-bg-pink":s.row.virtual})},[t("span",null,o(s.row.id),1),s.row.type===1?(d(),c("span",K,"(\u4F1A\u5458)")):s.row.type===2?(d(),c("span",Q,"(\u4EE3\u7406)")):s.row.type===0?(d(),c("span",q,"(\u865A\u62DF\u76D8)")):(d(),c("span",E,"(\u5F02\u5E38)"))],2)]),_:1}),e(i,{prop:"user_name",label:"\u7528\u6237\u540D","min-width":"100"}),e(i,{label:"\u4E0A\u7EA7\u4EE3\u7406",width:"100"},{default:a(s=>[s.row.agentList.length>0?(d(),c("span",P,o(s.row.agentList[s.row.agentList.length-1].user_name),1)):(d(),c("span",A,"-"))]),_:1}),e(i,{label:"\u5C42\u7EA7",width:"45"},{default:a(s=>[t("span",H,o(s.row.layer)+"\u4EE3",1)]),_:1}),e(i,{label:"\u7B49\u7EA7",width:"50"},{default:a(s=>[t("span",J,o(s.row.level.title),1)]),_:1}),e(i,{label:"\u4ECA\u65E5\u91CF\u5316",width:"70"},{default:a(s=>[t("span",null,o(s.row.todayQuantifyNums)+"\u6B21",1)]),_:1}),e(i,{label:"\u4ECA\u65E5\u6536\u76CA",width:"70"},{default:a(s=>[t("span",X,o(s.row.todayQuantifyProfit),1)]),_:1}),e(i,{label:"\u4F59\u989D",width:"80"},{default:a(s=>[t("span",Y,o(s.row.balance),1)]),_:1}),e(i,{label:"\u767B\u5F55\u65F6\u95F4",width:"130","show-overflow-tooltip":!0},{default:a(s=>[t("span",null,o(N(b)(s.row.login_time)),1)]),_:1}),e(i,{prop:"login_ip",label:"\u767B\u9646ip",width:"120"})]),_:1},8,["data"])),[[z,u.loading]]),e(x,{"page-sizes":[15,30,60,100],total:u.total,"page-size":_.limit,"onUpdate:page-size":r[0]||(r[0]=s=>_.limit=s),"current-page":_.page,"onUpdate:current-page":r[1]||(r[1]=s=>_.page=s),onCurrentChange:r[2]||(r[2]=s=>n(!1)),onSizeChange:r[3]||(r[3]=s=>n(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"])]),_:1},8,["modelValue"])}}};const tt=t("div",{class:"g-flex"},[t("span",null,"\u9996\u9875")],-1),st=t("div",{style:{padding:"10px"}},"\u7EDF\u8BA1",-1),et=t("div",{class:"tj-title"},"\u5728\u7EBF\u4EBA\u6570",-1),at={class:"tj-val"},ot=t("div",{class:"tj-title"},"\u4F1A\u5458\u603B\u6570",-1),lt={class:"tj-val"},nt=t("div",{class:"tj-title"},"\u4F1A\u5458\u603B\u4F59\u989D",-1),it={class:"tj-val"},dt=t("div",{class:"tj-title"},"\u603B\u5145\u63D0\u4EBA\u6570",-1),_t={class:"tj-val"},rt={class:"g-green"},ct={class:"g-red"},ut=t("div",{class:"tj-title"},"\u603B\u5145\u63D0\u7B14\u6570",-1),gt={class:"tj-val"},pt={class:"g-green"},ht={class:"g-red"},ft=t("div",{class:"tj-title"},"\u603B\u5F69\u91D1",-1),vt={class:"tj-val g-green"},mt=t("div",{class:"tj-title"},"\u603B\u5B9E\u9645\u5145\u503C",-1),wt={class:"tj-val g-green"},yt=t("div",{class:"tj-title"},"\u603B\u5B9E\u9645\u63D0\u73B0",-1),jt={class:"tj-val g-red"},Nt=t("div",{class:"tj-title"},"\u603B\u5145\u63D0\u5DEE",-1),bt={class:"tj-val g-purple"},kt=t("div",{style:{padding:"10px"}},"\u4ECA\u65E5\u7EDF\u8BA1",-1),$t={class:"tj-val"},Rt=t("div",{class:"tj-title"},"\u4ECA\u65E5\u65B0\u589E\u9996\u5145\u4EBA\u6570",-1),Vt={class:"tj-val"},xt=t("div",{class:"tj-title"},"\u6628\u65E5\u65B0\u589E\u9996\u5145\u4EBA\u6570",-1),Ut={class:"tj-val"},zt=t("div",{class:"tj-title"},"\u4ECA\u65E5\u5145\u63D0\u4EBA\u6570",-1),Bt={class:"tj-val"},Ct={class:"g-green"},It={class:"g-red"},Lt=t("div",{class:"tj-title"},"\u4ECA\u65E5\u5145\u63D0\u7B14\u6570",-1),Tt={class:"tj-val"},Wt={class:"g-green"},Dt={class:"g-red"},Gt=t("div",{class:"tj-title"},"\u4ECA\u65E5\u5F69\u91D1\u5145\u503C",-1),Ft={class:"tj-val g-green"},Mt=t("div",{class:"tj-title"},"\u4ECA\u65E5\u5B9E\u9645\u5145\u503C",-1),Ot={class:"tj-val g-green"},St=t("div",{class:"tj-title"},"\u4ECA\u65E5\u5B9E\u9645\u63D0\u73B0",-1),Kt={class:"tj-val g-red"},Qt=t("div",{class:"tj-title"},"\u4ECA\u65E5\u5145\u63D0\u5DEE",-1),qt={class:"tj-val g-purple"},At={__name:"IndexView",setup(y){const l=m({loading:!1,info:{userBalance:"-",userNums:"-",onlineNums:"-",yesterdayFirstRechargeNums:"-",todayRegNums:"-",todayFirstRechargeNums:"-",todayRecharge:"-",todayRechargeNums:"-",todayRechargeUserNums:"-",todayRechargeGift:"-",todayWithdraw:"-",todayWithdrawNums:"-",todayWithdrawUserNums:"-",todayKesun:"-",recharge:"-",rechargeNums:"-",rechargeUserNums:"-",rechargeGift:"-",withdraw:"-",withdrawNums:"-",withdrawUserNums:"-",kesun:"-"}});(async()=>{l.loading=!0;const{success:u,data:_}=await R.getReportInfo();l.loading=!1,u&&(l.info=_.info)})();const p=L(!1);return(u,_)=>{const n=h("el-col"),f=h("el-row"),g=h("el-card"),r=k("loading");return $((d(),w(g,{class:"v_home_view"},{header:a(()=>[tt]),default:a(()=>[st,e(f,{gutter:24},{default:a(()=>[e(n,{span:4},{default:a(()=>[et,t("div",at,o(l.info.onlineNums),1)]),_:1}),e(n,{span:4},{default:a(()=>[ot,t("div",lt,o(l.info.userNums),1)]),_:1}),e(n,{span:4},{default:a(()=>[nt,t("div",it,o(l.info.userBalance),1)]),_:1}),e(n,{span:4},{default:a(()=>[dt,t("div",_t,[t("span",rt,o(l.info.rechargeUserNums),1),v(" | "),t("span",ct,o(l.info.withdrawUserNums),1)])]),_:1}),e(n,{span:4},{default:a(()=>[ut,t("div",gt,[t("span",pt,o(l.info.rechargeNums),1),v(" | "),t("span",ht,o(l.info.withdrawNums),1)])]),_:1}),e(n,{span:4}),e(n,{span:4},{default:a(()=>[ft,t("div",vt,o(l.info.rechargeGift),1)]),_:1}),e(n,{span:4},{default:a(()=>[mt,t("div",wt,o(l.info.recharge),1)]),_:1}),e(n,{span:4},{default:a(()=>[yt,t("div",jt,o(l.info.withdraw),1)]),_:1}),e(n,{span:4},{default:a(()=>[Nt,t("div",bt,o(l.info.kesun),1)]),_:1})]),_:1}),kt,e(f,{gutter:24},{default:a(()=>[e(n,{span:4},{default:a(()=>[t("div",{onClick:_[0]||(_[0]=i=>p.value=!0),class:"tj-title"},"\u4ECA\u65E5\u6CE8\u518C\u4F1A\u5458"),t("div",$t,o(l.info.todayRegNums),1)]),_:1}),e(n,{span:4},{default:a(()=>[Rt,t("div",Vt,o(l.info.todayFirstRechargeNums),1)]),_:1}),e(n,{span:4},{default:a(()=>[xt,t("div",Ut,o(l.info.yesterdayFirstRechargeNums),1)]),_:1}),e(n,{span:4},{default:a(()=>[zt,t("div",Bt,[t("span",Ct,o(l.info.todayRechargeUserNums),1),v(" | "),t("span",It,o(l.info.todayWithdrawUserNums),1)])]),_:1}),e(n,{span:4},{default:a(()=>[Lt,t("div",Tt,[t("span",Wt,o(l.info.todayRechargeNums),1),v(" | "),t("span",Dt,o(l.info.todayWithdrawNums),1)])]),_:1}),e(n,{span:4}),e(n,{span:4},{default:a(()=>[Gt,t("div",Ft,o(l.info.todayRechargeGift),1)]),_:1}),e(n,{span:4},{default:a(()=>[Mt,t("div",Ot,o(l.info.todayRecharge),1)]),_:1}),e(n,{span:4},{default:a(()=>[St,t("div",Kt,o(l.info.todayWithdraw),1)]),_:1}),e(n,{span:4},{default:a(()=>[Qt,t("div",qt,o(l.info.todayKesun),1)]),_:1})]),_:1}),e(Z,{modelValue:p.value,"onUpdate:modelValue":_[1]||(_[1]=i=>p.value=i)},null,8,["modelValue"])]),_:1})),[[r,l.loading]])}}};export{At as default};
