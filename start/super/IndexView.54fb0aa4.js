import{u as A,r as y,P as J,c as _,d as O,o as u,k as g,h as l,g as t,j as F,m as h,w as R,f as p,N as z,G as f,e as m,l as b,i as x,n as k,Q as V,E as U}from"./index.088b396a.js";import{w as S}from"./ws.9df1dd9b.js";import{f as C}from"./index.969b688d.js";const W=p("div",{class:"g-flex"},[p("span",null,"\u7528\u6237\u5408\u7EA6\u8BA2\u5355")],-1),X={key:0,class:"g-green"},Z={key:1,class:"g-blue"},ee={key:2,class:"g-grey"},te={key:3,class:"g-red"},le={key:0},oe={key:0,class:"g-green"},ae={key:1,class:"g-red"},se={key:0,class:"g-green"},re={key:1,class:"g-red"},ne={key:2,class:"g-yellow"},ue={key:3,class:"g-purple"},de={key:4,class:"g-red"},ie={class:"g-green"},pe={class:"g-red"},ce={class:"g-purple"},_e=p("span",{class:"g-blue"},"USDT",-1),fe={class:"g-purple"},me={class:"g-red"},we={class:"g-green"},ge={class:"g-green-tiffany"},ke={__name:"IndexView",setup(be){const L=A(),N=y({sellUserProductLever:L.auth("sellUserProductLever"),delUserProductLever:L.auth("delUserProductLever")}),d=y({loading:!1,total:0,list:[],productList:{},row:{}}),r=y({userType:"",virtual:"",status:"1",side:"",order_no:"",date_time:[],search_key:"user_name",search_val:"",page:1,limit:15}),i=async(s=!0)=>{s&&(r.page=1),d.loading=!0;const{success:o,data:a}=await k.getUserProductLeverList(r);d.loading=!1,o&&(a.list.forEach(c=>{d.productList[c.product_id]?c.product=d.productList[c.product_id]:(c.product=y(c.product),d.productList[c.product_id]=c.product,S.joinGroup("market_"+c.product_id,w=>{c.product.price=w.close}))}),d.list=a.list,d.total=a.total)};J(()=>{for(let s in d.productList)S.leaveGroup("market_"+s)}),i();const E=s=>{V.confirm("\u786E\u8BA4\u5E73\u4ED3?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{d.loading=!0;const{success:o,data:a}=await k.sellUserProductLever({id:s.id});d.loading=!1,o&&(U.success(a.msg),await i(!1))})},K=s=>{V.confirm("\u786E\u8BA4\u53D6\u6D88\u59D4\u6258?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{d.loading=!0;const{success:o,data:a}=await k.cancelUserProductLever({id:s.id});d.loading=!1,o&&(U.success(a.msg),await i(!1))})},$=s=>s.status==1?Number(s.product.price).toFixed(s.fixed):s.status==2?Number(s.sell_price).toFixed(s.fixed):"-",P=s=>{if(s.status===1){let o=(Number(s.product.price)-Number(s.open_price))*Number(s.hand_nums)*Number(s.contract_nums);return s.side===2&&(o=-o),o.toFixed(2)}else return s.status===2?Number(s.sell_profit).toFixed(2):"-"},M=s=>{V.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{d.loading=!0;const{success:o,data:a}=await k.delUserProductLever({id:s.id});d.loading=!1,o&&(U.success(a.msg),await i(!1))})};return(s,o)=>{const a=_("el-option"),c=_("el-select"),w=_("el-form-item"),Y=_("el-date-picker"),B=_("el-input"),D=_("el-col"),v=_("el-button"),j=_("el-row"),G=_("el-form"),n=_("el-table-column"),I=_("el-table"),H=_("el-pagination"),q=_("el-card"),Q=O("loading");return u(),g(q,null,{header:l(()=>[W]),default:l(()=>[t(G,{inline:!0},{default:l(()=>[t(w,{label:"\u7528\u6237\u7C7B\u578B"},{default:l(()=>[t(c,{modelValue:r.userType,"onUpdate:modelValue":o[0]||(o[0]=e=>r.userType=e),onChange:i},{default:l(()=>[t(a,{label:"\u5168\u90E8",value:""}),t(a,{label:"\u4EE3\u7406",value:"2"}),t(a,{label:"\u4F1A\u5458",value:"1"})]),_:1},8,["modelValue"])]),_:1}),t(w,{label:"\u8D26\u53F7\u7C7B\u578B"},{default:l(()=>[t(c,{modelValue:r.virtual,"onUpdate:modelValue":o[1]||(o[1]=e=>r.virtual=e),onChange:i},{default:l(()=>[t(a,{label:"\u5168\u90E8",value:""}),t(a,{label:"\u865A\u62DF\u53F7",value:"1"}),t(a,{label:"\u6B63\u5E38",value:"0"})]),_:1},8,["modelValue"])]),_:1}),t(w,{label:"\u72B6\u6001"},{default:l(()=>[t(c,{modelValue:r.status,"onUpdate:modelValue":o[2]||(o[2]=e=>r.status=e),onChange:i},{default:l(()=>[t(a,{label:"\u5168\u90E8",value:""}),t(a,{label:"\u6301\u4ED3",value:"1"}),t(a,{label:"\u5E73\u4ED3",value:"2"}),t(a,{label:"\u59D4\u6258",value:"3"}),t(a,{label:"\u64A4\u5355",value:"0"})]),_:1},8,["modelValue"])]),_:1}),t(w,{label:"\u65B9\u5411"},{default:l(()=>[t(c,{modelValue:r.side,"onUpdate:modelValue":o[3]||(o[3]=e=>r.side=e),onChange:i},{default:l(()=>[t(a,{label:"\u5168\u90E8",value:""}),t(a,{label:"\u505A\u591A(\u4E70\u6DA8)",value:"1"}),t(a,{label:"\u505A\u7A7A(\u4E70\u8DCC)",value:"2"})]),_:1},8,["modelValue"])]),_:1}),t(w,{label:"\u65F6\u95F4"},{default:l(()=>[t(Y,{"value-format":"YYYY-MM-DD HH:mm:ss",modelValue:r.date_time,"onUpdate:modelValue":o[4]||(o[4]=e=>r.date_time=e),onChange:i,type:"datetimerange","default-time":[new Date(2e3,1,1,0,0,0),new Date(2e3,1,1,23,59,59)],"range-separator":"\u81F3","start-placeholder":"\u5F00\u59CB\u65E5\u671F","end-placeholder":"\u7ED3\u675F\u65E5\u671F"},null,8,["modelValue","default-time"])]),_:1}),t(w,{label:"\u8BA2\u5355\u53F7"},{default:l(()=>[t(B,{modelValue:r.order_no,"onUpdate:modelValue":o[5]||(o[5]=e=>r.order_no=e),onKeyup:F(i,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u8BA2\u5355\u53F7",onClear:i,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),t(w,null,{label:l(()=>[t(c,{modelValue:r.search_key,"onUpdate:modelValue":o[6]||(o[6]=e=>r.search_key=e)},{default:l(()=>[t(a,{label:"\u7528\u6237\u540D",value:"user_name"}),t(a,{label:"\u7528\u6237ID",value:"user_id"}),t(a,{label:"\u6807\u9898",value:"title"})]),_:1},8,["modelValue"])]),default:l(()=>[t(j,null,{default:l(()=>[t(D,{span:18},{default:l(()=>[t(B,{modelValue:r.search_val,"onUpdate:modelValue":o[7]||(o[7]=e=>r.search_val=e),onKeyup:F(i,["enter"]),onClear:i,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),t(D,{span:5,offset:1},{default:l(()=>[t(v,{type:"primary",onClick:i},{default:l(()=>[h("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),R((u(),g(I,{data:d.list,stripe:"",border:""},{default:l(()=>[t(n,{fixed:"left",label:"\u7528\u6237",width:"120"},{default:l(e=>[p("div",{class:z({"g-bg-pink":e.row.user.virtual})},[p("span",null,f(e.row.user.id),1),e.row.user.type===1?(u(),m("span",X,"(\u4F1A\u5458)")):e.row.user.type===2?(u(),m("span",Z,"(\u4EE3\u7406)")):e.row.user.type===0?(u(),m("span",ee,"(\u865A\u62DF\u76D8)")):(u(),m("span",te,"(\u5F02\u5E38)"))],2)]),_:1}),t(n,{fixed:"left",prop:"user.user_name",label:"\u7528\u6237\u540D",width:"100"}),t(n,{label:"\u4E0A\u7EA7ID",width:"80","show-overflow-tooltip":!0},{default:l(e=>[e.row.agentList.length>0?(u(),m("div",le,f(e.row.agentList[e.row.agentList.length-1].id),1)):b("",!0)]),_:1}),t(n,{prop:"order_no",label:"\u8BA2\u5355\u53F7",width:"145","show-overflow-tooltip":!0}),t(n,{prop:"title",label:"\u6807\u9898","min-width":"80","show-overflow-tooltip":!0}),t(n,{label:"\u65B9\u5411",width:"75","show-overflow-tooltip":!0},{default:l(e=>[e.row.side==1?(u(),m("span",oe,"\u505A\u591A(\u4E70\u6DA8)")):e.row.side==2?(u(),m("span",ae,"\u505A\u7A7A(\u4E70\u8DCC)")):b("",!0)]),_:1}),t(n,{label:"\u72B6\u6001",width:"50"},{default:l(e=>[e.row.status===1?(u(),m("span",se,"\u6301\u4ED3")):e.row.status===2?(u(),m("span",re,"\u5E73\u4ED3")):e.row.status===3?(u(),m("span",ne,"\u59D4\u6258")):e.row.status===0?(u(),m("span",ue,"\u64A4\u5355")):(u(),m("span",de,"\u5F02\u5E38"))]),_:1}),t(n,{prop:"multiple",label:"\u6760\u6746",width:"50","show-overflow-tooltip":!0}),t(n,{prop:"amount",label:"\u4FDD\u8BC1\u91D1",width:"80","show-overflow-tooltip":!0}),t(n,{label:"\u5F00\u4ED3\u4EF7",width:"80","show-overflow-tooltip":!0},{default:l(e=>[p("span",ie,f(Number(e.row.open_price).toFixed(e.row.fixed)),1)]),_:1}),t(n,{label:"\u5E73\u4ED3\u4EF7",width:"80","show-overflow-tooltip":!0},{default:l(e=>[p("span",pe,f($(e.row)),1)]),_:1}),t(n,{label:"\u5E73\u4ED3\u6536\u76CA",width:"80","show-overflow-tooltip":!0},{default:l(e=>[p("span",{class:z([P(e.row)>=0?"g-green":"g-red"])},f(P(e.row)),3)]),_:1}),t(n,{label:"\u624B\u7EED\u8D39",width:"80","show-overflow-tooltip":!0},{default:l(e=>[p("div",ce,[h(f(e.row.fee)+" ",1),_e])]),_:1}),t(n,{label:"\u5F00\u4ED3\u65F6\u95F4",width:"130"},{default:l(e=>[p("span",null,f(x(C)(e.row.open_time)),1)]),_:1}),t(n,{label:"\u5E73\u4ED3\u65F6\u95F4",width:"130"},{default:l(e=>[p("span",null,f(x(C)(e.row.sell_time)),1)]),_:1}),t(n,{label:"\u624B\u6570",width:"95","show-overflow-tooltip":!0},{default:l(e=>[p("div",fe,f(Number(e.row.hand_nums).toFixed(2)),1)]),_:1}),t(n,{label:"\u6B62\u76C8\u4EF7",width:"80","show-overflow-tooltip":!0},{default:l(e=>[p("span",me,f(e.row.tp_price==0?"\u4E0D\u6B62\u76C8":Number(e.row.tp_price).toFixed(e.row.fixed)),1)]),_:1}),t(n,{label:"\u6B62\u635F\u4EF7",width:"80","show-overflow-tooltip":!0},{default:l(e=>[p("span",we,f(e.row.sl_price==0?"\u4E0D\u6B62\u635F":Number(e.row.sl_price).toFixed(e.row.fixed)),1)]),_:1}),t(n,{label:"\u59D4\u6258\u4EF7",width:"80","show-overflow-tooltip":!0},{default:l(e=>[p("span",ge,f(Number(e.row.wt_price).toFixed(e.row.fixed)),1)]),_:1}),t(n,{label:"\u59D4\u6258\u65F6\u95F4",width:"130"},{default:l(e=>[p("span",null,f(x(C)(e.row.create_time)),1)]),_:1}),N.sellUserProductLever?(u(),g(n,{key:0,label:"\u64CD\u4F5C",width:"130",fixed:"right"},{default:l(e=>[e.row.status==1?(u(),g(v,{key:0,type:"primary",onClick:T=>E(e.row)},{default:l(()=>[h("\u5E73\u4ED3")]),_:2},1032,["onClick"])):b("",!0),e.row.status==3?(u(),g(v,{key:1,type:"success",onClick:T=>K(e.row)},{default:l(()=>[h("\u64A4\u5355")]),_:2},1032,["onClick"])):b("",!0),N.delUserProductLever?(u(),g(v,{key:2,type:"danger",onClick:T=>M(e.row)},{default:l(()=>[h("\u5220\u9664")]),_:2},1032,["onClick"])):b("",!0)]),_:1})):b("",!0)]),_:1},8,["data"])),[[Q,d.loading]]),t(H,{"page-sizes":[15,30,60,100],total:d.total,"page-size":r.limit,"onUpdate:page-size":o[8]||(o[8]=e=>r.limit=e),"current-page":r.page,"onUpdate:current-page":o[9]||(o[9]=e=>r.page=e),onCurrentChange:o[10]||(o[10]=e=>i(!1)),onSizeChange:o[11]||(o[11]=e=>i(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"])]),_:1})}}};export{ke as default};
