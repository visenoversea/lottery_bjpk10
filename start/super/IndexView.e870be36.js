import{b as D,M as j,r as z,c as d,d as E,o as _,k as v,h as t,g as l,m as k,w as L,G as f,l as N,i as h,O as I,n as S,E as M,f as p,e as C}from"./index.59065f7f.js";import{f as B}from"./index.969b688d.js";const q={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(U,{emit:u}){const s=U,r=D(!1),m=j({get:()=>s.modelValue,set:a=>{u("update:modelValue",a)}}),n=z({id:0,odds:"",status:1}),g=()=>{n.id=s.data.id,n.stop_time=s.data.stop_time,n.risk=s.data.risk,n.status=s.data.status},o=async()=>{if(r.value)return;r.value=!0;const{success:a,data:i}=await S.editLottery(n);r.value=!1,a&&(u("success"),M.success(i.msg),m.value=!1)};return(a,i)=>{const w=d("el-form-item"),b=d("el-input"),V=d("el-option"),y=d("el-select"),x=d("el-form"),e=d("el-button"),$=d("el-dialog"),O=E("loading");return _(),v($,{modelValue:h(m),"onUpdate:modelValue":i[4]||(i[4]=c=>I(m)?m.value=c:null),title:"\u7F16\u8F91",onOpen:g,draggable:"","close-on-click-modal":!1,width:"580px"},{footer:t(()=>[l(e,{size:"default",onClick:i[3]||(i[3]=c=>m.value=!1)},{default:t(()=>[k("\u53D6 \u6D88")]),_:1}),l(e,{size:"default",type:"primary",onClick:o},{default:t(()=>[k("\u786E \u8BA4")]),_:1})]),default:t(()=>[L((_(),v(x,{size:"default",model:n,"label-width":"90px"},{default:t(()=>[s.data.lottery?(_(),v(w,{key:0,label:"\u5F69\u79CD"},{default:t(()=>[k(f(s.data.name),1)]),_:1})):N("",!0),l(w,{label:"\u6740\u7387"},{default:t(()=>[l(b,{modelValue:n.risk,"onUpdate:modelValue":i[0]||(i[0]=c=>n.risk=c),placeholder:"\u8BF7\u8F93\u5165\u6740\u73870-100"},null,8,["modelValue"])]),_:1}),l(w,{label:"\u5C01\u76D8\u65F6\u95F4"},{default:t(()=>[l(b,{modelValue:n.stop_time,"onUpdate:modelValue":i[1]||(i[1]=c=>n.stop_time=c),placeholder:"\u5EFA\u8BAE3-10"},null,8,["modelValue"])]),_:1}),l(w,{label:"\u72B6\u6001"},{default:t(()=>[l(y,{modelValue:n.status,"onUpdate:modelValue":i[2]||(i[2]=c=>n.status=c)},{default:t(()=>[l(V,{label:"\u6B63\u5E38",value:1}),l(V,{label:"\u7981\u7528",value:0})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[O,r.value]])]),_:1},8,["modelValue"])}}},G=p("div",{class:"g-flex"},[p("span",null,"\u5F69\u79CD\u8BBE\u7F6E")],-1),R={key:0,class:"g-green"},T={key:1,class:"g-purple"},A={key:2,class:"g-red"},J={__name:"IndexView",setup(U){const u=z({loading:!1,total:0,list:[]}),s=z({page:1,limit:15}),r=async(g=!0)=>{g&&(s.page=1),u.loading=!0;const{success:o,data:a}=await S.getLotteryList(s);u.loading=!1,o&&(u.list=a.list,u.total=a.total)};r();const m=D(!1),n=g=>{u.row=g,m.value=!0};return(g,o)=>{const a=d("el-table-column"),i=d("el-image"),w=d("el-button"),b=d("el-table"),V=d("el-pagination"),y=d("el-card"),x=E("loading");return _(),v(y,{class:"v_lottery_data"},{header:t(()=>[G]),default:t(()=>[L((_(),v(b,{data:u.list,stripe:"",border:""},{default:t(()=>[l(a,{label:"ID",width:"100"},{default:t(e=>[p("div",null,f(e.row.id),1)]),_:1}),l(a,{label:"\u5F69\u79CD","min-width":"100"},{default:t(e=>[p("div",null,f(e.row.name),1)]),_:1}),l(a,{label:"\u56FE\u7247",width:"150"},{default:t(e=>[e.row.icon?(_(),v(i,{key:0,src:e.row.icon,"preview-src-list":[e.row.icon],fit:"contain","hide-on-click-modal":"","preview-teleported":""},null,8,["src","preview-src-list"])):N("",!0)]),_:1}),l(a,{label:"\u65F6\u95F4\u95F4\u9694","min-width":"100"},{default:t(e=>[p("div",null,f(e.row.interval_time)+"\u79D2",1)]),_:1}),l(a,{label:"\u5C01\u76D8\u65F6\u95F4","min-width":"100"},{default:t(e=>[p("div",null,f(e.row.stop_time)+"\u79D2",1)]),_:1}),l(a,{label:"\u6740\u7387","min-width":"100"},{default:t(e=>[p("div",null,f(e.row.risk)+"%",1)]),_:1}),l(a,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:t(e=>[p("div",null,f(h(B)(e.row.create_time)),1)]),_:1}),l(a,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:t(e=>[p("div",null,f(h(B)(e.row.modify_time)),1)]),_:1}),l(a,{label:"\u72B6\u6001",width:"100"},{default:t(e=>[e.row.status===1?(_(),C("span",R,"\u6B63\u5E38")):e.row.status===0?(_(),C("span",T,"\u7981\u7528")):(_(),C("span",A,"\u5F02\u5E38"))]),_:1}),l(a,{label:"\u64CD\u4F5C",width:"120",fixed:"right"},{default:t(e=>[l(w,{type:"primary",onClick:$=>n(e.row)},{default:t(()=>[k("\u7F16\u8F91")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[x,u.loading]]),l(V,{"page-sizes":[15,30,60,100],total:u.total,"page-size":s.limit,"onUpdate:page-size":o[0]||(o[0]=e=>s.limit=e),"current-page":s.page,"onUpdate:current-page":o[1]||(o[1]=e=>s.page=e),onCurrentChange:o[2]||(o[2]=e=>r(!1)),onSizeChange:o[3]||(o[3]=e=>r(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),l(q,{onSuccess:o[4]||(o[4]=e=>r(!1)),modelValue:m.value,"onUpdate:modelValue":o[5]||(o[5]=e=>m.value=e),data:u.row},null,8,["modelValue","data"])]),_:1})}}};export{J as default};
