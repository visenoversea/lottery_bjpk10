import{r as v,c as d,d as N,o as r,k as h,h as t,g as l,j as b,m as T,w as j,f as p,N as I,G as m,e as i,i as V,n as L}from"./index.2f5aab6b.js";import{f as k}from"./index.f2e9d2c9.js";const S=p("div",{class:"g-flex"},[p("span",null,"\u4E0B\u6CE8\u8BB0\u5F55")],-1),$={key:0,class:"g-green"},q={key:1,class:"g-blue"},E={key:2,class:"g-grey"},G={key:3,class:"g-red"},A={key:0,class:"g-green"},F={key:1,class:"g-red"},H={key:2,class:"g-purple"},J={key:3,class:"g-red"},M={key:0,class:"g-green"},O={key:1,class:"g-red"},P={key:2,class:"g-purple"},Q={key:3,class:"g-red"},R={class:"g-red"},W={class:"g-blue"},X={class:"g-red"},Y={class:"g-purple"},te={__name:"IndexView",setup(Z){const _=v({loading:!1,total:0,list:[],row:{}}),o=v({userType:"",virtual:"",open_expect:"",order_no:"",status:"",search_key:"user_name",search_val:"",page:1,limit:15}),u=async(w=!0)=>{w&&(o.page=1),_.loading=!0;const{success:a,data:s}=await L.getUserBetList2(o);_.loading=!1,a&&(_.list=s.list,_.total=s.total)};return u(),(w,a)=>{const s=d("el-option"),f=d("el-select"),c=d("el-form-item"),g=d("el-input"),y=d("el-col"),x=d("el-button"),C=d("el-row"),B=d("el-form"),n=d("el-table-column"),U=d("el-table"),z=d("el-pagination"),K=d("el-card"),D=N("loading");return r(),h(K,null,{header:t(()=>[S]),default:t(()=>[l(B,{inline:!0},{default:t(()=>[l(c,{label:"\u7528\u6237\u7C7B\u578B"},{default:t(()=>[l(f,{modelValue:o.userType,"onUpdate:modelValue":a[0]||(a[0]=e=>o.userType=e),onChange:u},{default:t(()=>[l(s,{label:"\u5168\u90E8",value:""}),l(s,{label:"\u4EE3\u7406",value:"2"}),l(s,{label:"\u4F1A\u5458",value:"1"})]),_:1},8,["modelValue"])]),_:1}),l(c,{label:"\u8D26\u53F7\u7C7B\u578B"},{default:t(()=>[l(f,{modelValue:o.virtual,"onUpdate:modelValue":a[1]||(a[1]=e=>o.virtual=e),onChange:u},{default:t(()=>[l(s,{label:"\u5168\u90E8",value:""}),l(s,{label:"\u865A\u62DF\u53F7",value:"1"}),l(s,{label:"\u6B63\u5E38",value:"0"})]),_:1},8,["modelValue"])]),_:1}),l(c,{label:"\u72B6\u6001"},{default:t(()=>[l(f,{modelValue:o.status,"onUpdate:modelValue":a[2]||(a[2]=e=>o.status=e),onChange:u},{default:t(()=>[l(s,{label:"\u5168\u90E8",value:""}),l(s,{label:"\u5DF2\u5F00\u5956",value:"1"}),l(s,{label:"\u5F85\u5F00\u5956",value:"2"}),l(s,{label:"\u64A4\u5355",value:"0"})]),_:1},8,["modelValue"])]),_:1}),l(c,{label:"\u671F\u53F7"},{default:t(()=>[l(g,{modelValue:o.open_expect,"onUpdate:modelValue":a[3]||(a[3]=e=>o.open_expect=e),onKeyup:b(u,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u4E0B\u6CE8\u671F\u53F7",onClear:u,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),l(c,{label:"\u8BA2\u5355\u53F7"},{default:t(()=>[l(g,{modelValue:o.order_no,"onUpdate:modelValue":a[4]||(a[4]=e=>o.order_no=e),onKeyup:b(u,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u8BA2\u5355\u53F7",onClear:u,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),l(c,null,{label:t(()=>[l(f,{modelValue:o.search_key,"onUpdate:modelValue":a[5]||(a[5]=e=>o.search_key=e)},{default:t(()=>[l(s,{label:"\u7528\u6237\u540D",value:"user_name"}),l(s,{label:"\u7528\u6237ID",value:"user_id"})]),_:1},8,["modelValue"])]),default:t(()=>[l(C,null,{default:t(()=>[l(y,{span:18},{default:t(()=>[l(g,{modelValue:o.search_val,"onUpdate:modelValue":a[6]||(a[6]=e=>o.search_val=e),onKeyup:b(u,["enter"]),onClear:u,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),l(y,{span:5,offset:1},{default:t(()=>[l(x,{type:"primary",onClick:u},{default:t(()=>[T("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),j((r(),h(U,{data:_.list,stripe:"",border:""},{default:t(()=>[l(n,{fixed:"left",label:"\u7528\u6237",width:"120"},{default:t(e=>[p("div",{class:I({"g-bg-pink":e.row.user.virtual})},[p("span",null,m(e.row.user.id),1),e.row.user.type===1?(r(),i("span",$,"(\u4F1A\u5458)")):e.row.user.type===2?(r(),i("span",q,"(\u4EE3\u7406)")):e.row.user.type===0?(r(),i("span",E,"(\u865A\u62DF\u76D8)")):(r(),i("span",G,"(\u5F02\u5E38)"))],2)]),_:1}),l(n,{fixed:"left",prop:"user.user_name",label:"\u7528\u6237\u540D",width:"100"}),l(n,{prop:"lottery.name",label:"\u5F69\u79CD","min-width":"80","show-overflow-tooltip":!0}),l(n,{prop:"userBet.open_expect",label:"\u671F\u53F7","min-width":"110"}),l(n,{label:"\u72B6\u6001",width:"80"},{default:t(e=>[e.row.userBet.status===1?(r(),i("span",A,"\u5DF2\u5F00\u5956")):e.row.userBet.status===2?(r(),i("span",F,"\u5F85\u5F00\u5956")):e.row.userBet.status===0?(r(),i("span",H,"\u64A4\u5355")):(r(),i("span",J,"\u5F02\u5E38"))]),_:1}),l(n,{label:"\u540C\u6B65\u4E0B\u6CE8",width:"80"},{default:t(e=>[e.row.is_run===1?(r(),i("span",M,"\u5DF2\u540C\u6B65")):e.row.is_run===2?(r(),i("span",O,"\u540C\u6B65\u5931\u8D25")):e.row.is_run===0?(r(),i("span",P,"\u672A\u540C\u6B65")):(r(),i("span",Q,"\u5F02\u5E38"))]),_:1}),l(n,{prop:"userBet.open_code",label:"\u5F00\u5956\u7ED3\u679C","min-width":"110"}),l(n,{label:"\u6295\u6CE8\u53F7\u7801","min-width":"90","show-overflow-tooltip":!0},{default:t(e=>[p("span",R,m(e.row.bet_no),1)]),_:1}),l(n,{label:"\u6295\u6CE8\u91D1\u989D","min-width":"90","show-overflow-tooltip":!0},{default:t(e=>[p("span",W,m(e.row.bet_amount),1)]),_:1}),l(n,{label:"\u4E2D\u5956\u91D1\u989D","min-width":"80","show-overflow-tooltip":!0},{default:t(e=>[p("span",X,m(e.row.win_amount),1)]),_:1}),l(n,{label:"\u8D54\u7387","min-width":"80"},{default:t(e=>[p("span",Y,m(e.row.odds),1)]),_:1}),l(n,{prop:"userBet.order_no",label:"\u8BA2\u5355\u53F7","min-width":"120"}),l(n,{label:"\u4E0B\u6CE8\u65F6\u95F4",width:"130"},{default:t(e=>[p("span",null,m(V(k)(e.row.create_time)),1)]),_:1}),l(n,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:t(e=>[p("span",null,m(V(k)(e.row.modify_time)),1)]),_:1})]),_:1},8,["data"])),[[D,_.loading]]),l(z,{"page-sizes":[15,30,60,100],total:_.total,"page-size":o.limit,"onUpdate:page-size":a[7]||(a[7]=e=>o.limit=e),"current-page":o.page,"onUpdate:current-page":a[8]||(a[8]=e=>o.page=e),onCurrentChange:a[9]||(a[9]=e=>u(!1)),onSizeChange:a[10]||(a[10]=e=>u(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"])]),_:1})}}};export{te as default};
