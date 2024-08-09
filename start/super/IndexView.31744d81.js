import{b as D,M as j,r as z,c as d,d as E,o as _,k as v,h as t,g as l,m as y,w as L,G as f,l as N,i as U,O as I,n as S,E as M,f as c,e as C}from"./index.7fcd2ef9.js";import{f as B}from"./index.15917a18.js";const q={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(h,{emit:u}){const i=h,p=D(!1),m=j({get:()=>i.modelValue,set:a=>{u("update:modelValue",a)}}),o=z({id:0,odds:"",status:1,description:""}),w=()=>{o.id=i.data.id,o.stop_time=i.data.stop_time,o.risk=i.data.risk,o.status=i.data.status,o.description=i.data.description},n=async()=>{if(p.value)return;p.value=!0;const{success:a,data:s}=await S.editLottery(o);p.value=!1,a&&(u("success"),M.success(s.msg),m.value=!1)};return(a,s)=>{const g=d("el-form-item"),b=d("el-input"),V=d("el-option"),k=d("el-select"),x=d("el-form"),e=d("el-button"),$=d("el-dialog"),O=E("loading");return _(),v($,{modelValue:U(m),"onUpdate:modelValue":s[5]||(s[5]=r=>I(m)?m.value=r:null),title:"\u7F16\u8F91",onOpen:w,draggable:"","close-on-click-modal":!1,width:"580px"},{footer:t(()=>[l(e,{size:"default",onClick:s[4]||(s[4]=r=>m.value=!1)},{default:t(()=>[y("\u53D6 \u6D88")]),_:1}),l(e,{size:"default",type:"primary",onClick:n},{default:t(()=>[y("\u786E \u8BA4")]),_:1})]),default:t(()=>[L((_(),v(x,{size:"default",model:o,"label-width":"90px"},{default:t(()=>[i.data.lottery?(_(),v(g,{key:0,label:"\u5F69\u79CD"},{default:t(()=>[y(f(i.data.name),1)]),_:1})):N("",!0),l(g,{label:"\u6740\u7387"},{default:t(()=>[l(b,{modelValue:o.risk,"onUpdate:modelValue":s[0]||(s[0]=r=>o.risk=r),placeholder:"\u8BF7\u8F93\u5165\u6740\u73870-100"},null,8,["modelValue"])]),_:1}),l(g,{label:"\u5C01\u76D8\u65F6\u95F4"},{default:t(()=>[l(b,{modelValue:o.stop_time,"onUpdate:modelValue":s[1]||(s[1]=r=>o.stop_time=r),placeholder:"\u5EFA\u8BAE3-10"},null,8,["modelValue"])]),_:1}),l(g,{label:"\u73A9\u6CD5\u8BF4\u660E"},{default:t(()=>[l(b,{type:"textarea",modelValue:o.description,"onUpdate:modelValue":s[2]||(s[2]=r=>o.description=r),placeholder:"\u5F69\u79CD\u73A9\u6CD5\u8BF4\u660E"},null,8,["modelValue"])]),_:1}),l(g,{label:"\u72B6\u6001"},{default:t(()=>[l(k,{modelValue:o.status,"onUpdate:modelValue":s[3]||(s[3]=r=>o.status=r)},{default:t(()=>[l(V,{label:"\u6B63\u5E38",value:1}),l(V,{label:"\u7981\u7528",value:0})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[O,p.value]])]),_:1},8,["modelValue"])}}},G=c("div",{class:"g-flex"},[c("span",null,"\u5F69\u79CD\u8BBE\u7F6E")],-1),R={key:0,class:"g-green"},T={key:1,class:"g-purple"},A={key:2,class:"g-red"},J={__name:"IndexView",setup(h){const u=z({loading:!1,total:0,list:[]}),i=z({page:1,limit:15}),p=async(w=!0)=>{w&&(i.page=1),u.loading=!0;const{success:n,data:a}=await S.getLotteryList(i);u.loading=!1,n&&(u.list=a.list,u.total=a.total)};p();const m=D(!1),o=w=>{u.row=w,m.value=!0};return(w,n)=>{const a=d("el-table-column"),s=d("el-image"),g=d("el-button"),b=d("el-table"),V=d("el-pagination"),k=d("el-card"),x=E("loading");return _(),v(k,{class:"v_lottery_data"},{header:t(()=>[G]),default:t(()=>[L((_(),v(b,{data:u.list,stripe:"",border:""},{default:t(()=>[l(a,{label:"ID",width:"100"},{default:t(e=>[c("div",null,f(e.row.id),1)]),_:1}),l(a,{label:"\u5F69\u79CD","min-width":"100"},{default:t(e=>[c("div",null,f(e.row.name),1)]),_:1}),l(a,{label:"\u56FE\u7247",width:"150"},{default:t(e=>[e.row.icon?(_(),v(s,{key:0,src:e.row.icon,"preview-src-list":[e.row.icon],fit:"contain","hide-on-click-modal":"","preview-teleported":""},null,8,["src","preview-src-list"])):N("",!0)]),_:1}),l(a,{label:"\u65F6\u95F4\u95F4\u9694","min-width":"100"},{default:t(e=>[c("div",null,f(e.row.interval_time)+"\u79D2",1)]),_:1}),l(a,{label:"\u5C01\u76D8\u65F6\u95F4","min-width":"100"},{default:t(e=>[c("div",null,f(e.row.stop_time)+"\u79D2",1)]),_:1}),l(a,{label:"\u6740\u7387","min-width":"100"},{default:t(e=>[c("div",null,f(e.row.risk)+"%",1)]),_:1}),l(a,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:t(e=>[c("div",null,f(U(B)(e.row.create_time)),1)]),_:1}),l(a,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:t(e=>[c("div",null,f(U(B)(e.row.modify_time)),1)]),_:1}),l(a,{label:"\u72B6\u6001",width:"100"},{default:t(e=>[e.row.status===1?(_(),C("span",R,"\u6B63\u5E38")):e.row.status===0?(_(),C("span",T,"\u7981\u7528")):(_(),C("span",A,"\u5F02\u5E38"))]),_:1}),l(a,{label:"\u64CD\u4F5C",width:"120",fixed:"right"},{default:t(e=>[l(g,{type:"primary",onClick:$=>o(e.row)},{default:t(()=>[y("\u7F16\u8F91")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[x,u.loading]]),l(V,{"page-sizes":[15,30,60,100],total:u.total,"page-size":i.limit,"onUpdate:page-size":n[0]||(n[0]=e=>i.limit=e),"current-page":i.page,"onUpdate:current-page":n[1]||(n[1]=e=>i.page=e),onCurrentChange:n[2]||(n[2]=e=>p(!1)),onSizeChange:n[3]||(n[3]=e=>p(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),l(q,{onSuccess:n[4]||(n[4]=e=>p(!1)),modelValue:m.value,"onUpdate:modelValue":n[5]||(n[5]=e=>m.value=e),data:u.row},null,8,["modelValue","data"])]),_:1})}}};export{J as default};
