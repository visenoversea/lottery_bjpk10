import{r as y,c as u,d as N,o as d,k as h,h as t,g as e,j as g,m as T,w as j,f as i,N as I,G as m,e as p,i as V,n as L}from"./index.8f999f52.js";import{f as k}from"./index.969b688d.js";const S=i("div",{class:"g-flex"},[i("span",null,"\u4E0B\u6CE8\u8BB0\u5F55")],-1),$={key:0,class:"g-green"},q={key:1,class:"g-blue"},E={key:2,class:"g-grey"},G={key:3,class:"g-red"},A={key:0,class:"g-green"},F={key:1,class:"g-red"},H={key:2,class:"g-purple"},J={key:3,class:"g-red"},M={class:"g-red"},O={class:"g-blue"},P={class:"g-red"},Q={class:"g-purple"},Y={__name:"IndexView",setup(R){const _=y({loading:!1,total:0,list:[],row:{}}),o=y({userType:"",virtual:"",open_expect:"",order_no:"",status:"",search_key:"user_name",search_val:"",page:1,limit:15}),s=async(w=!0)=>{w&&(o.page=1),_.loading=!0;const{success:a,data:n}=await L.getUserBetList2(o);_.loading=!1,a&&(_.list=n.list,_.total=n.total)};return s(),(w,a)=>{const n=u("el-option"),f=u("el-select"),c=u("el-form-item"),b=u("el-input"),v=u("el-col"),x=u("el-button"),C=u("el-row"),B=u("el-form"),r=u("el-table-column"),U=u("el-table"),z=u("el-pagination"),K=u("el-card"),D=N("loading");return d(),h(K,null,{header:t(()=>[S]),default:t(()=>[e(B,{inline:!0},{default:t(()=>[e(c,{label:"\u7528\u6237\u7C7B\u578B"},{default:t(()=>[e(f,{modelValue:o.userType,"onUpdate:modelValue":a[0]||(a[0]=l=>o.userType=l),onChange:s},{default:t(()=>[e(n,{label:"\u5168\u90E8",value:""}),e(n,{label:"\u4EE3\u7406",value:"2"}),e(n,{label:"\u4F1A\u5458",value:"1"})]),_:1},8,["modelValue"])]),_:1}),e(c,{label:"\u8D26\u53F7\u7C7B\u578B"},{default:t(()=>[e(f,{modelValue:o.virtual,"onUpdate:modelValue":a[1]||(a[1]=l=>o.virtual=l),onChange:s},{default:t(()=>[e(n,{label:"\u5168\u90E8",value:""}),e(n,{label:"\u865A\u62DF\u53F7",value:"1"}),e(n,{label:"\u6B63\u5E38",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(c,{label:"\u72B6\u6001"},{default:t(()=>[e(f,{modelValue:o.status,"onUpdate:modelValue":a[2]||(a[2]=l=>o.status=l),onChange:s},{default:t(()=>[e(n,{label:"\u5168\u90E8",value:""}),e(n,{label:"\u5DF2\u5F00\u5956",value:"1"}),e(n,{label:"\u5F85\u5F00\u5956",value:"2"}),e(n,{label:"\u64A4\u5355",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(c,{label:"\u671F\u53F7"},{default:t(()=>[e(b,{modelValue:o.open_expect,"onUpdate:modelValue":a[3]||(a[3]=l=>o.open_expect=l),onKeyup:g(s,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u4E0B\u6CE8\u671F\u53F7",onClear:s,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(c,{label:"\u8BA2\u5355\u53F7"},{default:t(()=>[e(b,{modelValue:o.order_no,"onUpdate:modelValue":a[4]||(a[4]=l=>o.order_no=l),onKeyup:g(s,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u8BA2\u5355\u53F7",onClear:s,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(c,null,{label:t(()=>[e(f,{modelValue:o.search_key,"onUpdate:modelValue":a[5]||(a[5]=l=>o.search_key=l)},{default:t(()=>[e(n,{label:"\u7528\u6237\u540D",value:"user_name"}),e(n,{label:"\u7528\u6237ID",value:"user_id"})]),_:1},8,["modelValue"])]),default:t(()=>[e(C,null,{default:t(()=>[e(v,{span:18},{default:t(()=>[e(b,{modelValue:o.search_val,"onUpdate:modelValue":a[6]||(a[6]=l=>o.search_val=l),onKeyup:g(s,["enter"]),onClear:s,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(v,{span:5,offset:1},{default:t(()=>[e(x,{type:"primary",onClick:s},{default:t(()=>[T("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),j((d(),h(U,{data:_.list,stripe:"",border:""},{default:t(()=>[e(r,{fixed:"left",label:"\u7528\u6237",width:"120"},{default:t(l=>[i("div",{class:I({"g-bg-pink":l.row.user.virtual})},[i("span",null,m(l.row.user.id),1),l.row.user.type===1?(d(),p("span",$,"(\u4F1A\u5458)")):l.row.user.type===2?(d(),p("span",q,"(\u4EE3\u7406)")):l.row.user.type===0?(d(),p("span",E,"(\u865A\u62DF\u76D8)")):(d(),p("span",G,"(\u5F02\u5E38)"))],2)]),_:1}),e(r,{fixed:"left",prop:"user.user_name",label:"\u7528\u6237\u540D",width:"100"}),e(r,{prop:"lottery.name",label:"\u5F69\u79CD","min-width":"80","show-overflow-tooltip":!0}),e(r,{prop:"userBet.open_expect",label:"\u671F\u53F7","min-width":"110"}),e(r,{label:"\u72B6\u6001",width:"80"},{default:t(l=>[l.row.userBet.status===1?(d(),p("span",A,"\u5DF2\u5F00\u5956")):l.row.userBet.status===2?(d(),p("span",F,"\u5F85\u5F00\u5956")):l.row.userBet.status===0?(d(),p("span",H,"\u64A4\u5355")):(d(),p("span",J,"\u5F02\u5E38"))]),_:1}),e(r,{prop:"userBet.open_code",label:"\u5F00\u5956\u7ED3\u679C","min-width":"110"}),e(r,{label:"\u6295\u6CE8\u53F7\u7801","min-width":"90","show-overflow-tooltip":!0},{default:t(l=>[i("span",M,m(l.row.bet_no),1)]),_:1}),e(r,{label:"\u6295\u6CE8\u91D1\u989D","min-width":"90","show-overflow-tooltip":!0},{default:t(l=>[i("span",O,m(l.row.bet_amount),1)]),_:1}),e(r,{label:"\u4E2D\u5956\u91D1\u989D","min-width":"80","show-overflow-tooltip":!0},{default:t(l=>[i("span",P,m(l.row.win_amount),1)]),_:1}),e(r,{label:"\u8D54\u7387","min-width":"80"},{default:t(l=>[i("span",Q,m(l.row.odds),1)]),_:1}),e(r,{prop:"userBet.order_no",label:"\u8BA2\u5355\u53F7","min-width":"120"}),e(r,{label:"\u4E0B\u6CE8\u65F6\u95F4",width:"130"},{default:t(l=>[i("span",null,m(V(k)(l.row.create_time)),1)]),_:1}),e(r,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:t(l=>[i("span",null,m(V(k)(l.row.modify_time)),1)]),_:1})]),_:1},8,["data"])),[[D,_.loading]]),e(z,{"page-sizes":[15,30,60,100],total:_.total,"page-size":o.limit,"onUpdate:page-size":a[7]||(a[7]=l=>o.limit=l),"current-page":o.page,"onUpdate:current-page":a[8]||(a[8]=l=>o.page=l),onCurrentChange:a[9]||(a[9]=l=>s(!1)),onSizeChange:a[10]||(a[10]=l=>s(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"])]),_:1})}}};export{Y as default};
