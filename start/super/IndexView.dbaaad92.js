import{r as w,c as r,d as B,o as s,k as v,h as t,g as e,j as h,m as N,w as T,f as m,N as k,G as g,e as i,i as Y,n as I}from"./index.b3214f75.js";import{f as j}from"./index.15917a18.js";const H=m("div",{class:"g-flex"},[m("span",null,"\u7528\u6237\u8FD4\u4F63\u8BB0\u5F55")],-1),M={key:0,class:"g-green"},S={key:1,class:"g-blue"},$={key:2,class:"g-grey"},q={key:3,class:"g-red"},E={key:0,class:"g-red"},G={key:1},R={key:0,class:"g-blue"},A={key:1},F={key:0,class:"g-blue-tiffany"},J={key:1,class:"g-green"},O={key:2,class:"g-blue"},P={key:3,class:"g-red"},Z={__name:"IndexView",setup(Q){const p=w({loading:!1,total:0,list:[]}),o=w({userType:"",virtual:"",title:"",type:"",date_time:[],search_key:"user_name",search_val:"",page:1,limit:15}),d=async(c=!0)=>{c&&(o.page=1),p.loading=!0;const{success:a,data:n}=await I.getUserRebateList(o);p.loading=!1,a&&(p.list=n.list,p.total=n.total)};return d(),(c,a)=>{const n=r("el-option"),f=r("el-select"),_=r("el-form-item"),b=r("el-input"),V=r("el-date-picker"),y=r("el-col"),C=r("el-button"),x=r("el-row"),D=r("el-form"),u=r("el-table-column"),U=r("el-table"),z=r("el-pagination"),L=r("el-card"),K=B("loading");return s(),v(L,null,{header:t(()=>[H]),default:t(()=>[e(D,{inline:!0},{default:t(()=>[e(_,{label:"\u7528\u6237\u7C7B\u578B"},{default:t(()=>[e(f,{modelValue:o.userType,"onUpdate:modelValue":a[0]||(a[0]=l=>o.userType=l),onChange:d},{default:t(()=>[e(n,{label:"\u5168\u90E8",value:""}),e(n,{label:"\u7BA1\u7406\u5458",value:"10"}),e(n,{label:"\u4EE3\u7406",value:"2"}),e(n,{label:"\u4F1A\u5458",value:"1"})]),_:1},8,["modelValue"])]),_:1}),e(_,{label:"\u8D26\u53F7\u7C7B\u578B"},{default:t(()=>[e(f,{modelValue:o.virtual,"onUpdate:modelValue":a[1]||(a[1]=l=>o.virtual=l),onChange:d},{default:t(()=>[e(n,{label:"\u5168\u90E8",value:""}),e(n,{label:"\u865A\u62DF\u53F7",value:"1"}),e(n,{label:"\u6B63\u5E38",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(_,{label:"\u7C7B\u578B"},{default:t(()=>[e(f,{modelValue:o.type,"onUpdate:modelValue":a[2]||(a[2]=l=>o.type=l),onChange:d},{default:t(()=>[e(n,{label:"\u5168\u90E8",value:""}),e(n,{label:"\u5145\u503C",value:"1"}),e(n,{label:"\u91CF\u5316",value:"2"}),e(n,{label:"\u5176\u4ED6",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(_,{label:"\u6807\u9898"},{default:t(()=>[e(b,{modelValue:o.title,"onUpdate:modelValue":a[3]||(a[3]=l=>o.title=l),onKeyup:h(d,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",onClear:d,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(_,{label:"\u65F6\u95F4"},{default:t(()=>[e(V,{"value-format":"YYYY-MM-DD HH:mm:ss",modelValue:o.date_time,"onUpdate:modelValue":a[4]||(a[4]=l=>o.date_time=l),onChange:d,type:"datetimerange","default-time":[new Date(2e3,1,1,0,0,0),new Date(2e3,1,1,23,59,59)],"range-separator":"\u81F3","start-placeholder":"\u5F00\u59CB\u65E5\u671F","end-placeholder":"\u7ED3\u675F\u65E5\u671F"},null,8,["modelValue","default-time"])]),_:1}),e(_,null,{label:t(()=>[e(f,{modelValue:o.search_key,"onUpdate:modelValue":a[5]||(a[5]=l=>o.search_key=l)},{default:t(()=>[e(n,{label:"\u7528\u6237\u540D",value:"user_name"}),e(n,{label:"\u7528\u6237ID",value:"user_id"}),e(n,{label:"\u5916\u952Eid",value:"key_id"})]),_:1},8,["modelValue"])]),default:t(()=>[e(x,null,{default:t(()=>[e(y,{span:18},{default:t(()=>[e(b,{modelValue:o.search_val,"onUpdate:modelValue":a[6]||(a[6]=l=>o.search_val=l),onKeyup:h(d,["enter"]),onClear:d,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(y,{span:5,offset:1},{default:t(()=>[e(C,{type:"primary",onClick:d},{default:t(()=>[N("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),T((s(),v(U,{data:p.list,stripe:"",border:""},{default:t(()=>[e(u,{fixed:"left",label:"ID",prop:"id",width:"80"}),e(u,{fixed:"left",label:"\u7528\u6237",width:"120"},{default:t(l=>[m("div",{class:k({"g-bg-pink":l.row.user.virtual})},[m("span",null,g(l.row.user.id),1),l.row.user.type===1?(s(),i("span",M,"(\u4F1A\u5458)")):l.row.user.type===2?(s(),i("span",S,"(\u4EE3\u7406)")):l.row.user.type===0?(s(),i("span",$,"(\u865A\u62DF\u76D8)")):(s(),i("span",q,"(\u5F02\u5E38)"))],2)]),_:1}),e(u,{fixed:"left",prop:"user.user_name",label:"\u7528\u6237\u540D",width:"100"}),e(u,{label:"\u603B\u4EE3\u7406",width:"100"},{default:t(l=>[l.row.agentList.length>0?(s(),i("span",E,g(l.row.agentList[0].user_name),1)):(s(),i("span",G,"-"))]),_:1}),e(u,{label:"\u4E0A\u7EA7\u4EE3\u7406",width:"100"},{default:t(l=>[l.row.agentList.length>0?(s(),i("span",R,g(l.row.agentList[l.row.agentList.length-1].user_name),1)):(s(),i("span",A,"-"))]),_:1}),e(u,{prop:"title",label:"\u6807\u9898",width:"120","show-overflow-tooltip":!0}),e(u,{label:"\u7C7B\u578B",width:"80"},{default:t(l=>[l.row.type==0?(s(),i("span",F,"\u5176\u4ED6")):l.row.type==1?(s(),i("span",J,"\u5145\u503C")):l.row.type==2?(s(),i("span",O,"\u91CF\u5316")):(s(),i("span",P,"\u5F02\u5E38"))]),_:1}),e(u,{prop:"currency",label:"\u8D27\u5E01",width:"80"}),e(u,{label:"\u8FD4\u4F63\u91D1\u989D","min-width":"100"},{default:t(l=>[m("span",{class:k([l.row.amount>=0?"g-red":"g-green"])},g(l.row.amount),3)]),_:1}),e(u,{prop:"rebate.user_name",label:"\u8FD4\u4F63\u4EBA","min-width":"80"}),e(u,{prop:"key_id",label:"\u5916\u952Eid",width:"100","show-overflow-tooltip":!0}),e(u,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:t(l=>[m("span",null,g(Y(j)(l.row.create_time)),1)]),_:1})]),_:1},8,["data"])),[[K,p.loading]]),e(z,{"page-sizes":[15,30,60,100],total:p.total,"page-size":o.limit,"onUpdate:page-size":a[7]||(a[7]=l=>o.limit=l),"current-page":o.page,"onUpdate:current-page":a[8]||(a[8]=l=>o.page=l),onCurrentChange:a[9]||(a[9]=l=>d(!1)),onSizeChange:a[10]||(a[10]=l=>d(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"])]),_:1})}}};export{Z as default};
