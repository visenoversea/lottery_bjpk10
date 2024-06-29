import{u as M,r as b,c as i,d as Y,o as n,k as w,h as t,g as l,j as k,m as V,w as S,f as p,N as $,G as c,e as d,i as j,l as C,n as U,Q as H,E as I}from"./index.088b396a.js";import{f as q}from"./index.969b688d.js";const G=p("div",{class:"g-flex"},[p("span",null,"\u91CF\u5316\u4EA4\u6613")],-1),A={key:0,class:"g-green"},F={key:1,class:"g-blue"},J={key:2,class:"g-grey"},O={key:3,class:"g-red"},P={key:0,class:"g-red"},R={key:1},W={key:0,class:"g-blue"},X={key:1},Z={key:0,class:"g-green"},ee={key:1,class:"g-red"},le={key:2,class:"g-purple"},te={key:3,class:"g-red"},ae={class:"g-purple"},oe={class:"g-green"},se={class:"g-blue"},ne={class:"g-red"},_e={__name:"IndexView",setup(re){const x=M(),D=b({cancelUserQuantify:x.auth("cancelUserQuantify")}),_=b({loading:!1,total:0,list:[],productList:{},row:{}}),o=b({userType:"",virtual:"",status:"",side:"",order_no:"",date_time:[],search_key:"user_name",search_val:"",page:1,limit:15}),u=async(f=!0)=>{f&&(o.page=1),_.loading=!0;const{success:a,data:s}=await U.getUserQuantifyList(o);_.loading=!1,a&&(_.list=s.list,_.total=s.total)},L=f=>{H.confirm("\u786E\u8BA4\u53D6\u6D88\u91CF\u5316?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{_.loading=!0;const{success:a,data:s}=await U.cancelUserQuantify({id:f.id});_.loading=!1,a&&(I.success(s.msg),await u(!1))})};return u(),(f,a)=>{const s=i("el-option"),g=i("el-select"),m=i("el-form-item"),z=i("el-date-picker"),y=i("el-input"),h=i("el-col"),v=i("el-button"),B=i("el-row"),Q=i("el-form"),r=i("el-table-column"),T=i("el-table"),K=i("el-pagination"),N=i("el-card"),E=Y("loading");return n(),w(N,null,{header:t(()=>[G]),default:t(()=>[l(Q,{inline:!0},{default:t(()=>[l(m,{label:"\u7528\u6237\u7C7B\u578B"},{default:t(()=>[l(g,{modelValue:o.userType,"onUpdate:modelValue":a[0]||(a[0]=e=>o.userType=e),onChange:u},{default:t(()=>[l(s,{label:"\u5168\u90E8",value:""}),l(s,{label:"\u4EE3\u7406",value:"2"}),l(s,{label:"\u4F1A\u5458",value:"1"})]),_:1},8,["modelValue"])]),_:1}),l(m,{label:"\u8D26\u53F7\u7C7B\u578B"},{default:t(()=>[l(g,{modelValue:o.virtual,"onUpdate:modelValue":a[1]||(a[1]=e=>o.virtual=e),onChange:u},{default:t(()=>[l(s,{label:"\u5168\u90E8",value:""}),l(s,{label:"\u865A\u62DF\u53F7",value:"1"}),l(s,{label:"\u6B63\u5E38",value:"0"})]),_:1},8,["modelValue"])]),_:1}),l(m,{label:"\u72B6\u6001"},{default:t(()=>[l(g,{modelValue:o.status,"onUpdate:modelValue":a[2]||(a[2]=e=>o.status=e),onChange:u},{default:t(()=>[l(s,{label:"\u5168\u90E8",value:""}),l(s,{label:"\u6301\u4ED3",value:"1"}),l(s,{label:"\u5E73\u4ED3",value:"2"}),l(s,{label:"\u59D4\u6258",value:"3"}),l(s,{label:"\u64A4\u5355",value:"0"})]),_:1},8,["modelValue"])]),_:1}),l(m,{label:"\u65F6\u95F4"},{default:t(()=>[l(z,{"value-format":"YYYY-MM-DD HH:mm:ss",modelValue:o.date_time,"onUpdate:modelValue":a[3]||(a[3]=e=>o.date_time=e),onChange:u,type:"datetimerange","default-time":[new Date(2e3,1,1,0,0,0),new Date(2e3,1,1,23,59,59)],"range-separator":"\u81F3","start-placeholder":"\u5F00\u59CB\u65E5\u671F","end-placeholder":"\u7ED3\u675F\u65E5\u671F"},null,8,["modelValue","default-time"])]),_:1}),l(m,{label:"\u8BA2\u5355\u53F7"},{default:t(()=>[l(y,{modelValue:o.order_no,"onUpdate:modelValue":a[4]||(a[4]=e=>o.order_no=e),onKeyup:k(u,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u8BA2\u5355\u53F7",onClear:u,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),l(m,null,{label:t(()=>[l(g,{modelValue:o.search_key,"onUpdate:modelValue":a[5]||(a[5]=e=>o.search_key=e)},{default:t(()=>[l(s,{label:"\u7528\u6237\u540D",value:"user_name"}),l(s,{label:"\u7528\u6237ID",value:"user_id"})]),_:1},8,["modelValue"])]),default:t(()=>[l(B,null,{default:t(()=>[l(h,{span:18},{default:t(()=>[l(y,{modelValue:o.search_val,"onUpdate:modelValue":a[6]||(a[6]=e=>o.search_val=e),onKeyup:k(u,["enter"]),onClear:u,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),l(h,{span:5,offset:1},{default:t(()=>[l(v,{type:"primary",onClick:u},{default:t(()=>[V("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),S((n(),w(T,{data:_.list,stripe:"",border:""},{default:t(()=>[l(r,{fixed:"left",label:"\u7528\u6237",width:"120"},{default:t(e=>[p("div",{class:$({"g-bg-pink":e.row.user.virtual})},[p("span",null,c(e.row.user.id),1),e.row.user.type===1?(n(),d("span",A,"(\u4F1A\u5458)")):e.row.user.type===2?(n(),d("span",F,"(\u4EE3\u7406)")):e.row.user.type===0?(n(),d("span",J,"(\u865A\u62DF\u76D8)")):(n(),d("span",O,"(\u5F02\u5E38)"))],2)]),_:1}),l(r,{fixed:"left",prop:"user.user_name",label:"\u7528\u6237\u540D",width:"100"}),l(r,{label:"\u603B\u4EE3\u7406",width:"100"},{default:t(e=>[e.row.agentList.length>0?(n(),d("span",P,c(e.row.agentList[0].user_name),1)):(n(),d("span",R,"-"))]),_:1}),l(r,{label:"\u4E0A\u7EA7\u4EE3\u7406",width:"100"},{default:t(e=>[e.row.agentList.length>0?(n(),d("span",W,c(e.row.agentList[e.row.agentList.length-1].user_name),1)):(n(),d("span",X,"-"))]),_:1}),l(r,{label:"\u72B6\u6001",width:"70"},{default:t(e=>[e.row.status===1?(n(),d("span",Z,"\u5B8C\u6210")):e.row.status===2?(n(),d("span",ee,"\u91CF\u5316\u4E2D")):e.row.status===0?(n(),d("span",le,"\u64A4\u5355")):(n(),d("span",te,"\u5F02\u5E38"))]),_:1}),l(r,{prop:"order_no",label:"\u8BA2\u5355\u53F7",width:"145","show-overflow-tooltip":!0}),l(r,{prop:"currency",label:"\u8D27\u5E01","min-width":"80","show-overflow-tooltip":!0}),l(r,{prop:"amount",label:"\u6267\u884C\u4ED3\u4F4D",width:"80"},{default:t(e=>[p("div",ae,c(e.row.amount),1)]),_:1}),l(r,{prop:"profit",label:"\u6536\u76CA",width:"80"},{default:t(e=>[p("div",oe,c(e.row.profit),1)]),_:1}),l(r,{prop:"buy_platform",label:"\u8D2D\u4E70\u5E73\u53F0","min-width":"80","show-overflow-tooltip":!0}),l(r,{label:"\u4E70\u5165\u4EF7",width:"80"},{default:t(e=>[p("span",se,c(e.row.buy_price),1)]),_:1}),l(r,{prop:"sell_platform",label:"\u51FA\u552E\u5E73\u53F0","min-width":"80","show-overflow-tooltip":!0}),l(r,{label:"\u51FA\u552E\u4EF7",width:"80"},{default:t(e=>[p("span",ne,c(e.row.sell_price),1)]),_:1}),l(r,{label:"\u4E0B\u5355\u65F6\u95F4",width:"130"},{default:t(e=>[p("span",null,c(j(q)(e.row.create_time)),1)]),_:1}),D.cancelUserQuantify?(n(),w(r,{key:0,label:"\u64CD\u4F5C",width:"130",fixed:"right"},{default:t(e=>[e.row.status==2?(n(),w(v,{key:0,type:"success",onClick:ue=>L(e.row)},{default:t(()=>[V("\u64A4\u5355")]),_:2},1032,["onClick"])):C("",!0)]),_:1})):C("",!0)]),_:1},8,["data"])),[[E,_.loading]]),l(K,{"page-sizes":[15,30,60,100],total:_.total,"page-size":o.limit,"onUpdate:page-size":a[7]||(a[7]=e=>o.limit=e),"current-page":o.page,"onUpdate:current-page":a[8]||(a[8]=e=>o.page=e),onCurrentChange:a[9]||(a[9]=e=>u(!1)),onSizeChange:a[10]||(a[10]=e=>u(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"])]),_:1})}}};export{_e as default};
