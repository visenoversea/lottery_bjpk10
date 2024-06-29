import{u as I,r as h,P as q,c as i,d as G,o as n,k as w,h as t,g as l,j as x,m as v,w as Q,f as p,N as A,G as c,e as u,l as b,i as P,n as k,Q as B,E as D}from"./index.088b396a.js";import{f as L}from"./index.969b688d.js";const F=p("div",{class:"g-flex"},[p("span",null,"\u5E01\u5E01\u4EA4\u6613\u8BA2\u8BB0\u5F55")],-1),J={key:0,class:"g-green"},O={key:1,class:"g-blue"},R={key:2,class:"g-grey"},W={key:3,class:"g-red"},X={key:0,class:"g-red"},Z={key:1},ee={key:0,class:"g-blue"},le={key:1},te={key:0,class:"g-green"},ae={key:1,class:"g-red"},oe={key:2,class:"g-purple"},se={key:3,class:"g-red"},ne={key:0,class:"g-green"},re={key:1,class:"g-red"},de={class:"g-purple"},ue={class:"g-red"},ie={class:"g-blue"},me={__name:"IndexView",setup(_e){const V=I(),U=h({cancelUserProductTrade:V.auth("cancelUserProductTrade"),delUserProductTrade:V.auth("delUserProductTrade")}),_=h({loading:!1,total:0,list:[],productList:{},row:{}}),s=h({userType:"",virtual:"",status:"",side:"",order_no:"",date_time:[],search_key:"user_name",search_val:"",page:1,limit:15}),r=async(g=!0)=>{g&&(s.page=1),_.loading=!0;const{success:a,data:o}=await k.getUserProductTradeList(s);_.loading=!1,a&&(_.list=o.list,_.total=o.total)};q(()=>{}),r();const z=g=>{B.confirm("\u786E\u8BA4\u53D6\u6D88\u59D4\u6258?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{_.loading=!0;const{success:a,data:o}=await k.cancelUserProductTrade({id:g.id});_.loading=!1,a&&(D.success(o.msg),await r(!1))})},K=g=>{B.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{_.loading=!0;const{success:a,data:o}=await k.delUserProductTrade({id:g.id});_.loading=!1,a&&(D.success(o.msg),await r(!1))})};return(g,a)=>{const o=i("el-option"),f=i("el-select"),m=i("el-form-item"),N=i("el-date-picker"),C=i("el-input"),T=i("el-col"),y=i("el-button"),E=i("el-row"),M=i("el-form"),d=i("el-table-column"),Y=i("el-table"),$=i("el-pagination"),S=i("el-card"),j=G("loading");return n(),w(S,null,{header:t(()=>[F]),default:t(()=>[l(M,{inline:!0},{default:t(()=>[l(m,{label:"\u7528\u6237\u7C7B\u578B"},{default:t(()=>[l(f,{modelValue:s.userType,"onUpdate:modelValue":a[0]||(a[0]=e=>s.userType=e),onChange:r},{default:t(()=>[l(o,{label:"\u5168\u90E8",value:""}),l(o,{label:"\u4EE3\u7406",value:"2"}),l(o,{label:"\u4F1A\u5458",value:"1"})]),_:1},8,["modelValue"])]),_:1}),l(m,{label:"\u8D26\u53F7\u7C7B\u578B"},{default:t(()=>[l(f,{modelValue:s.virtual,"onUpdate:modelValue":a[1]||(a[1]=e=>s.virtual=e),onChange:r},{default:t(()=>[l(o,{label:"\u5168\u90E8",value:""}),l(o,{label:"\u865A\u62DF\u53F7",value:"1"}),l(o,{label:"\u6B63\u5E38",value:"0"})]),_:1},8,["modelValue"])]),_:1}),l(m,{label:"\u72B6\u6001"},{default:t(()=>[l(f,{modelValue:s.status,"onUpdate:modelValue":a[2]||(a[2]=e=>s.status=e),onChange:r},{default:t(()=>[l(o,{label:"\u5168\u90E8",value:""}),l(o,{label:"\u6301\u4ED3",value:"1"}),l(o,{label:"\u5E73\u4ED3",value:"2"}),l(o,{label:"\u59D4\u6258",value:"3"}),l(o,{label:"\u64A4\u5355",value:"0"})]),_:1},8,["modelValue"])]),_:1}),l(m,{label:"\u65B9\u5411"},{default:t(()=>[l(f,{modelValue:s.side,"onUpdate:modelValue":a[3]||(a[3]=e=>s.side=e),onChange:r},{default:t(()=>[l(o,{label:"\u5168\u90E8",value:""}),l(o,{label:"\u4E70\u5165",value:"1"}),l(o,{label:"\u5356\u51FA",value:"2"})]),_:1},8,["modelValue"])]),_:1}),l(m,{label:"\u65F6\u95F4"},{default:t(()=>[l(N,{"value-format":"YYYY-MM-DD HH:mm:ss",modelValue:s.date_time,"onUpdate:modelValue":a[4]||(a[4]=e=>s.date_time=e),onChange:r,type:"datetimerange","default-time":[new Date(2e3,1,1,0,0,0),new Date(2e3,1,1,23,59,59)],"range-separator":"\u81F3","start-placeholder":"\u5F00\u59CB\u65E5\u671F","end-placeholder":"\u7ED3\u675F\u65E5\u671F"},null,8,["modelValue","default-time"])]),_:1}),l(m,{label:"\u8BA2\u5355\u53F7"},{default:t(()=>[l(C,{modelValue:s.order_no,"onUpdate:modelValue":a[5]||(a[5]=e=>s.order_no=e),onKeyup:x(r,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u8BA2\u5355\u53F7",onClear:r,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),l(m,null,{label:t(()=>[l(f,{modelValue:s.search_key,"onUpdate:modelValue":a[6]||(a[6]=e=>s.search_key=e)},{default:t(()=>[l(o,{label:"\u7528\u6237\u540D",value:"user_name"}),l(o,{label:"\u7528\u6237ID",value:"user_id"}),l(o,{label:"\u6807\u9898",value:"title"})]),_:1},8,["modelValue"])]),default:t(()=>[l(E,null,{default:t(()=>[l(T,{span:18},{default:t(()=>[l(C,{modelValue:s.search_val,"onUpdate:modelValue":a[7]||(a[7]=e=>s.search_val=e),onKeyup:x(r,["enter"]),onClear:r,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),l(T,{span:5,offset:1},{default:t(()=>[l(y,{type:"primary",onClick:r},{default:t(()=>[v("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),Q((n(),w(Y,{data:_.list,stripe:"",border:""},{default:t(()=>[l(d,{fixed:"left",label:"\u7528\u6237",width:"120"},{default:t(e=>[p("div",{class:A({"g-bg-pink":e.row.user.virtual})},[p("span",null,c(e.row.user.id),1),e.row.user.type===1?(n(),u("span",J,"(\u4F1A\u5458)")):e.row.user.type===2?(n(),u("span",O,"(\u4EE3\u7406)")):e.row.user.type===0?(n(),u("span",R,"(\u865A\u62DF\u76D8)")):(n(),u("span",W,"(\u5F02\u5E38)"))],2)]),_:1}),l(d,{fixed:"left",prop:"user.user_name",label:"\u7528\u6237\u540D",width:"100"}),l(d,{label:"\u603B\u4EE3\u7406",width:"100"},{default:t(e=>[e.row.agentList.length>0?(n(),u("span",X,c(e.row.agentList[0].user_name),1)):(n(),u("span",Z,"-"))]),_:1}),l(d,{label:"\u4E0A\u7EA7\u4EE3\u7406",width:"100"},{default:t(e=>[e.row.agentList.length>0?(n(),u("span",ee,c(e.row.agentList[e.row.agentList.length-1].user_name),1)):(n(),u("span",le,"-"))]),_:1}),l(d,{label:"\u72B6\u6001",width:"70"},{default:t(e=>[e.row.status===1?(n(),u("span",te,"\u5B8C\u6210")):e.row.status===2?(n(),u("span",ae,"\u59D4\u6258\u4E2D")):e.row.status===0?(n(),u("span",oe,"\u64A4\u5355")):(n(),u("span",se,"\u5F02\u5E38"))]),_:1}),l(d,{prop:"order_no",label:"\u8BA2\u5355\u53F7",width:"145","show-overflow-tooltip":!0}),l(d,{prop:"title",label:"\u6807\u9898","min-width":"80","show-overflow-tooltip":!0}),l(d,{label:"\u65B9\u5411",width:"75","show-overflow-tooltip":!0},{default:t(e=>[e.row.side==1?(n(),u("span",ne,"\u4E70\u5165")):e.row.side==2?(n(),u("span",re,"\u5356\u51FA")):b("",!0)]),_:1}),l(d,{prop:"amount",label:"\u4EA4\u6613\u6570\u91CF",width:"80"},{default:t(e=>[p("span",de,c(e.row.trade_amount)+" "+c(e.row.trade_currency),1)]),_:1}),l(d,{prop:"amount",label:"\u59D4\u6258\u6570\u91CF",width:"80"},{default:t(e=>[p("span",ue,c(e.row.amount)+" "+c(e.row.currency),1)]),_:1}),l(d,{label:"\u59D4\u6258\u4EF7",width:"80"},{default:t(e=>[p("span",ie,c(e.row.wt_price),1)]),_:1}),l(d,{label:"\u59D4\u6258\u65F6\u95F4",width:"130"},{default:t(e=>[p("span",null,c(P(L)(e.row.create_time)),1)]),_:1}),l(d,{label:"\u4EA4\u6613\u65F6\u95F4",width:"130"},{default:t(e=>[p("span",null,c(P(L)(e.row.trade_time)),1)]),_:1}),U.cancelUserProductTrade?(n(),w(d,{key:0,label:"\u64CD\u4F5C",width:"130",fixed:"right"},{default:t(e=>[e.row.status==2?(n(),w(y,{key:0,type:"success",onClick:H=>z(e.row)},{default:t(()=>[v("\u64A4\u5355")]),_:2},1032,["onClick"])):b("",!0),U.delUserProductTrade?(n(),w(y,{key:1,type:"danger",onClick:H=>K(e.row)},{default:t(()=>[v("\u5220\u9664")]),_:2},1032,["onClick"])):b("",!0)]),_:1})):b("",!0)]),_:1},8,["data"])),[[j,_.loading]]),l($,{"page-sizes":[15,30,60,100],total:_.total,"page-size":s.limit,"onUpdate:page-size":a[8]||(a[8]=e=>s.limit=e),"current-page":s.page,"onUpdate:current-page":a[9]||(a[9]=e=>s.page=e),onCurrentChange:a[10]||(a[10]=e=>r(!1)),onSizeChange:a[11]||(a[11]=e=>r(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"])]),_:1})}}};export{me as default};
