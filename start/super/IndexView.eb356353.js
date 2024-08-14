import{r as y,c as n,d as K,o as d,k as v,h as a,g as e,j as h,m as B,w as N,f as m,N as T,G as g,e as u,i as Y,n as I}from"./index.b3214f75.js";import{f as j}from"./index.15917a18.js";const H=m("div",{class:"g-flex"},[m("span",null,"\u65E5\u5FD7\u7BA1\u7406")],-1),M={key:0,class:"g-green"},S={key:1,class:"g-blue"},$={key:2,class:"g-grey"},q={key:3,class:"g-red"},E={key:4,class:"g-red"},G={key:0,class:"g-red"},A={key:1},F={key:0,class:"g-blue"},J={key:1},R={__name:"IndexView",setup(O){const p=y({loading:!1,total:0,list:[]}),o=y({userType:"",virtual:"",title:"",date_time:[],search_key:"user_name",search_val:"",page:1,limit:15}),r=async(f=!0)=>{f&&(o.page=1),p.loading=!0;const{success:t,data:s}=await I.getUserLogList(o);p.loading=!1,t&&(p.list=s.list,p.total=s.total)};return r(),(f,t)=>{const s=n("el-option"),c=n("el-select"),_=n("el-form-item"),b=n("el-input"),V=n("el-date-picker"),w=n("el-col"),k=n("el-button"),C=n("el-row"),x=n("el-form"),i=n("el-table-column"),D=n("el-table"),U=n("el-pagination"),L=n("el-card"),z=K("loading");return d(),v(L,null,{header:a(()=>[H]),default:a(()=>[e(x,{inline:!0},{default:a(()=>[e(_,{label:"\u7528\u6237\u7C7B\u578B"},{default:a(()=>[e(c,{modelValue:o.userType,"onUpdate:modelValue":t[0]||(t[0]=l=>o.userType=l),onChange:r},{default:a(()=>[e(s,{label:"\u5168\u90E8",value:""}),e(s,{label:"\u7BA1\u7406\u5458",value:"10"}),e(s,{label:"\u4EE3\u7406",value:"2"}),e(s,{label:"\u4F1A\u5458",value:"1"})]),_:1},8,["modelValue"])]),_:1}),e(_,{label:"\u8D26\u53F7\u7C7B\u578B"},{default:a(()=>[e(c,{modelValue:o.virtual,"onUpdate:modelValue":t[1]||(t[1]=l=>o.virtual=l),onChange:r},{default:a(()=>[e(s,{label:"\u5168\u90E8",value:""}),e(s,{label:"\u865A\u62DF\u53F7",value:"1"}),e(s,{label:"\u6B63\u5E38",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(_,{label:"\u6807\u9898"},{default:a(()=>[e(b,{modelValue:o.title,"onUpdate:modelValue":t[2]||(t[2]=l=>o.title=l),onKeyup:h(r,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",onClear:r,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(_,{label:"\u65F6\u95F4"},{default:a(()=>[e(V,{"value-format":"YYYY-MM-DD HH:mm:ss",modelValue:o.date_time,"onUpdate:modelValue":t[3]||(t[3]=l=>o.date_time=l),onChange:r,type:"datetimerange","default-time":[new Date(2e3,1,1,0,0,0),new Date(2e3,1,1,23,59,59)],"range-separator":"\u81F3","start-placeholder":"\u5F00\u59CB\u65E5\u671F","end-placeholder":"\u7ED3\u675F\u65E5\u671F"},null,8,["modelValue","default-time"])]),_:1}),e(_,null,{label:a(()=>[e(c,{modelValue:o.search_key,"onUpdate:modelValue":t[4]||(t[4]=l=>o.search_key=l)},{default:a(()=>[e(s,{label:"\u7528\u6237\u540D",value:"user_name"}),e(s,{label:"\u7528\u6237ID",value:"user_id"})]),_:1},8,["modelValue"])]),default:a(()=>[e(C,null,{default:a(()=>[e(w,{span:18},{default:a(()=>[e(b,{modelValue:o.search_val,"onUpdate:modelValue":t[5]||(t[5]=l=>o.search_val=l),onKeyup:h(r,["enter"]),onClear:r,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(w,{span:5,offset:1},{default:a(()=>[e(k,{type:"primary",onClick:r},{default:a(()=>[B("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),N((d(),v(D,{data:p.list,stripe:"",border:""},{default:a(()=>[e(i,{fixed:"left",label:"ID",prop:"id",width:"80"}),e(i,{fixed:"left",label:"\u7528\u6237",width:"120","show-overflow-tooltip":!0},{default:a(l=>[m("div",{class:T({"g-bg-pink":l.row.user.virtual})},[m("span",null,g(l.row.user.id),1),l.row.user.type===1?(d(),u("span",M,"(\u4F1A\u5458)")):l.row.user.type===2?(d(),u("span",S,"(\u4EE3\u7406)")):l.row.user.type===0?(d(),u("span",$,"(\u865A\u62DF\u76D8)")):l.row.user.type>=10?(d(),u("span",q,"(\u7BA1\u7406\u5458)")):(d(),u("span",E,"(\u5F02\u5E38)"))],2)]),_:1}),e(i,{fixed:"left",prop:"user.user_name",label:"\u7528\u6237\u540D",width:"100"}),e(i,{label:"\u603B\u4EE3\u7406",width:"100"},{default:a(l=>[l.row.agentList.length>0?(d(),u("span",G,g(l.row.agentList[0].user_name),1)):(d(),u("span",A,"-"))]),_:1}),e(i,{label:"\u4E0A\u7EA7\u4EE3\u7406",width:"100"},{default:a(l=>[l.row.agentList.length>0?(d(),u("span",F,g(l.row.agentList[l.row.agentList.length-1].user_name),1)):(d(),u("span",J,"-"))]),_:1}),e(i,{prop:"title",label:"\u6807\u9898",width:"120"}),e(i,{prop:"msg",label:"\u4FE1\u606F","min-width":"150","show-overflow-tooltip":!0}),e(i,{prop:"ip",label:"ip\u5730\u5740",width:"110"}),e(i,{prop:"host",label:"\u8BF7\u6C42\u57DF\u540D",width:"120"}),e(i,{prop:"path",label:"\u8BF7\u6C42\u8DEF\u5F84",width:"150"}),e(i,{label:"\u8BB0\u5F55\u65F6\u95F4",width:"130"},{default:a(l=>[m("span",null,g(Y(j)(l.row.create_time)),1)]),_:1})]),_:1},8,["data"])),[[z,p.loading]]),e(U,{"page-sizes":[15,30,60,100],total:p.total,"page-size":o.limit,"onUpdate:page-size":t[6]||(t[6]=l=>o.limit=l),"current-page":o.page,"onUpdate:current-page":t[7]||(t[7]=l=>o.page=l),onCurrentChange:t[8]||(t[8]=l=>r(!1)),onSizeChange:t[9]||(t[9]=l=>r(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"])]),_:1})}}};export{R as default};
