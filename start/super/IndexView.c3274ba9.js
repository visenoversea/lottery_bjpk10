import{u as B,r as g,c as u,d as P,o as _,k as C,h as t,g as l,j as b,m as Y,w as I,f as d,N as M,G as i,e as p,l as S,i as v,n as j}from"./index.088b396a.js";import{f as h}from"./index.969b688d.js";const H=d("div",{class:"g-flex"},[d("span",null,"\u7528\u6237\u9501\u4ED3\u6316\u77FF")],-1),R={key:0,class:"g-green"},$={key:1,class:"g-blue"},q={key:2,class:"g-grey"},E={key:3,class:"g-red"},G={key:0},A={key:0,class:"g-green"},F={key:1,class:"g-red"},J={key:2,class:"g-purple"},O={key:3,class:"g-red"},Q={class:"g-red"},W={class:"g-purple"},X={class:"g-yellow"},Z={class:"g-green"},ee={class:"g-purple"},le={class:"g-red"},te={class:"g-red"},ne={__name:"IndexView",setup(oe){const y=B();g({setRiskUserProductTime:y.auth("setRiskUserProductTime"),delUserProductTime:y.auth("delUserProductTime")});const m=g({loading:!1,total:0,list:[],productList:{},row:{}}),a=g({userType:"",virtual:"",status:"",title:"",order_no:"",date_time:[],search_key:"user_name",search_val:"",page:1,limit:15}),n=async(V=!0)=>{V&&(a.page=1),m.loading=!0;const{success:o,data:r}=await j.getUserMiningList(a);m.loading=!1,o&&(m.list=r.list,m.total=r.total)};return n(),(V,o)=>{const r=u("el-option"),c=u("el-select"),w=u("el-form-item"),U=u("el-date-picker"),f=u("el-input"),k=u("el-col"),D=u("el-button"),x=u("el-row"),T=u("el-form"),s=u("el-table-column"),z=u("el-table"),K=u("el-pagination"),L=u("el-card"),N=P("loading");return _(),C(L,null,{header:t(()=>[H]),default:t(()=>[l(T,{inline:!0},{default:t(()=>[l(w,{label:"\u7528\u6237\u7C7B\u578B"},{default:t(()=>[l(c,{modelValue:a.userType,"onUpdate:modelValue":o[0]||(o[0]=e=>a.userType=e),onChange:n},{default:t(()=>[l(r,{label:"\u5168\u90E8",value:""}),l(r,{label:"\u4EE3\u7406",value:"2"}),l(r,{label:"\u4F1A\u5458",value:"1"})]),_:1},8,["modelValue"])]),_:1}),l(w,{label:"\u8D26\u53F7\u7C7B\u578B"},{default:t(()=>[l(c,{modelValue:a.virtual,"onUpdate:modelValue":o[1]||(o[1]=e=>a.virtual=e),onChange:n},{default:t(()=>[l(r,{label:"\u5168\u90E8",value:""}),l(r,{label:"\u865A\u62DF\u53F7",value:"1"}),l(r,{label:"\u6B63\u5E38",value:"0"})]),_:1},8,["modelValue"])]),_:1}),l(w,{label:"\u72B6\u6001"},{default:t(()=>[l(c,{modelValue:a.status,"onUpdate:modelValue":o[2]||(o[2]=e=>a.status=e),onChange:n},{default:t(()=>[l(r,{label:"\u5168\u90E8",value:""}),l(r,{label:"\u9501\u4ED3",value:"1"}),l(r,{label:"\u8D4E\u56DE",value:"2"})]),_:1},8,["modelValue"])]),_:1}),l(w,{label:"\u65F6\u95F4"},{default:t(()=>[l(U,{"value-format":"YYYY-MM-DD HH:mm:ss",modelValue:a.date_time,"onUpdate:modelValue":o[3]||(o[3]=e=>a.date_time=e),onChange:n,type:"datetimerange","default-time":[new Date(2e3,1,1,0,0,0),new Date(2e3,1,1,23,59,59)],"range-separator":"\u81F3","start-placeholder":"\u5F00\u59CB\u65E5\u671F","end-placeholder":"\u7ED3\u675F\u65E5\u671F"},null,8,["modelValue","default-time"])]),_:1}),l(w,{label:"\u8BA2\u5355\u53F7"},{default:t(()=>[l(f,{modelValue:a.order_no,"onUpdate:modelValue":o[4]||(o[4]=e=>a.order_no=e),onKeyup:b(n,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u8BA2\u5355\u53F7",onClear:n,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),l(w,{label:"\u6807\u9898"},{default:t(()=>[l(f,{modelValue:a.title,"onUpdate:modelValue":o[5]||(o[5]=e=>a.title=e),onKeyup:b(n,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",onClear:n,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),l(w,null,{label:t(()=>[l(c,{modelValue:a.search_key,"onUpdate:modelValue":o[6]||(o[6]=e=>a.search_key=e)},{default:t(()=>[l(r,{label:"\u7528\u6237\u540D",value:"user_name"}),l(r,{label:"\u7528\u6237ID",value:"user_id"})]),_:1},8,["modelValue"])]),default:t(()=>[l(x,null,{default:t(()=>[l(k,{span:18},{default:t(()=>[l(f,{modelValue:a.search_val,"onUpdate:modelValue":o[7]||(o[7]=e=>a.search_val=e),onKeyup:b(n,["enter"]),onClear:n,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),l(k,{span:5,offset:1},{default:t(()=>[l(D,{type:"primary",onClick:n},{default:t(()=>[Y("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),I((_(),C(z,{data:m.list,stripe:"",border:""},{default:t(()=>[l(s,{label:"\u7528\u6237",width:"120","show-overflow-tooltip":!0},{default:t(e=>[d("div",{class:M({"g-bg-pink":e.row.user.virtual})},[d("span",null,i(e.row.user.id),1),e.row.user.type===1?(_(),p("span",R,"(\u4F1A\u5458)")):e.row.user.type===2?(_(),p("span",$,"(\u4EE3\u7406)")):e.row.user.type===0?(_(),p("span",q,"(\u865A\u62DF\u76D8)")):(_(),p("span",E,"(\u5F02\u5E38)"))],2)]),_:1}),l(s,{prop:"user.user_name",label:"\u7528\u6237\u540D",width:"100","show-overflow-tooltip":!0}),l(s,{label:"\u4E0A\u7EA7ID",width:"80","show-overflow-tooltip":!0},{default:t(e=>[e.row.agentList.length>0?(_(),p("div",G,i(e.row.agentList[e.row.agentList.length-1].id),1)):S("",!0)]),_:1}),l(s,{prop:"order_no",label:"\u8BA2\u5355\u53F7",width:"145","show-overflow-tooltip":!0}),l(s,{prop:"title",label:"\u6807\u9898","min-width":"80","show-overflow-tooltip":!0}),l(s,{label:"\u72B6\u6001",width:"50"},{default:t(e=>[e.row.status===1?(_(),p("span",A,"\u9501\u4ED3")):e.row.status===2?(_(),p("span",F,"\u8D4E\u56DE")):e.row.status===0?(_(),p("span",J,"\u64A4\u5355")):(_(),p("span",O,"\u5F02\u5E38"))]),_:1}),l(s,{label:"\u4E0B\u5355\u91D1\u989D",width:"100","show-overflow-tooltip":!0},{default:t(e=>[d("div",Q,i(e.row.amount),1)]),_:1}),l(s,{label:"\u603B\u6536\u76CA",width:"100","show-overflow-tooltip":!0},{default:t(e=>[d("div",W,i(e.row.profit_amount),1)]),_:1}),l(s,{label:"\u5269\u4F59\u5929\u6570",width:"70","show-overflow-tooltip":!0},{default:t(e=>[d("div",X,i(e.row.lastDay),1)]),_:1}),l(s,{prop:"day",label:"\u5929\u6570",width:"50","show-overflow-tooltip":!0}),l(s,{label:"\u6536\u76CA",width:"50","show-overflow-tooltip":!0},{default:t(e=>[d("div",Z,i(e.row.now_rate*100)+"%",1)]),_:1}),l(s,{label:"\u6536\u76CA\u8303\u56F4",width:"70","show-overflow-tooltip":!0},{default:t(e=>[d("div",ee,i(e.row.min_rate*100)+"-"+i(e.row.max_rate*100)+"%",1)]),_:1}),l(s,{label:"\u8FDD\u7EA6\u6BD4\u4F8B",width:"70","show-overflow-tooltip":!0},{default:t(e=>[d("div",le,i(e.row.bc_rate*100)+"%",1)]),_:1}),l(s,{label:"\u8FDD\u7EA6\u91D1",width:"70","show-overflow-tooltip":!0},{default:t(e=>[d("div",te,i(e.row.bc_amount),1)]),_:1}),l(s,{label:"\u5230\u671F\u65F6\u95F4",width:"130"},{default:t(e=>[d("span",null,i(v(h)(e.row.end_time)),1)]),_:1}),l(s,{label:"\u8D4E\u56DE\u65F6\u95F4",width:"130"},{default:t(e=>[d("span",null,i(v(h)(e.row.back_time)),1)]),_:1}),l(s,{label:"\u4E0B\u5355\u65F6\u95F4",width:"130"},{default:t(e=>[d("span",null,i(v(h)(e.row.create_time)),1)]),_:1})]),_:1},8,["data"])),[[N,m.loading]]),l(K,{"page-sizes":[15,30,60,100],total:m.total,"page-size":a.limit,"onUpdate:page-size":o[8]||(o[8]=e=>a.limit=e),"current-page":a.page,"onUpdate:current-page":o[9]||(o[9]=e=>a.page=e),onCurrentChange:o[10]||(o[10]=e=>n(!1)),onSizeChange:o[11]||(o[11]=e=>n(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"])]),_:1})}}};export{ne as default};
