import{b as P,M as F,r as z,c as a,d as E,o as m,k as b,h as t,g as l,m as w,w as L,i as B,O as K,n as U,E as S,f as _,j as M,G as y,e as h,P as N}from"./index.8f999f52.js";import{f as D}from"./index.969b688d.js";const T={__name:"AddView",props:{modelValue:{type:Boolean,default:!1}},emits:["update:modelValue","success"],setup($,{emit:s}){const d=$,f=P(),n=P(!1),p=F({get:()=>d.modelValue,set:g=>{s("update:modelValue",g)}}),r=z({ip:""}),o=async()=>{f.value.resetFields()},u=async()=>{if(n.value)return;n.value=!0;const{success:g,data:i}=await U.addIPList(r);n.value=!1,g&&(s("success"),S.success(i.msg),p.value=!1)};return(g,i)=>{const V=a("el-input"),k=a("el-form-item"),x=a("el-form"),c=a("el-button"),C=a("el-dialog"),I=E("loading");return m(),b(C,{modelValue:B(p),"onUpdate:modelValue":i[2]||(i[2]=v=>K(p)?p.value=v:null),title:"\u65B0\u589EIP\u9ED1\u540D\u5355",onClose:o,draggable:"","close-on-click-modal":!1,width:"480px"},{footer:t(()=>[l(c,{size:"default",onClick:i[1]||(i[1]=v=>p.value=!1)},{default:t(()=>[w("\u53D6 \u6D88")]),_:1}),l(c,{size:"default",type:"primary",onClick:u},{default:t(()=>[w("\u786E \u8BA4")]),_:1})]),default:t(()=>[L((m(),b(x,{size:"default",ref_key:"refForm",ref:f,model:r,"label-width":"90px"},{default:t(()=>[l(k,{label:"IP",prop:"ip"},{default:t(()=>[l(V,{modelValue:r.ip,"onUpdate:modelValue":i[0]||(i[0]=v=>r.ip=v),placeholder:"\u8BF7\u8F93\u5165\u9ED1\u540D\u5355IP",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[I,n.value]])]),_:1},8,["modelValue"])}}},q={class:"g-flex"},A=_("span",null,"IP\u9ED1\u540D\u5355",-1),G={class:"g-flex-justify-end g-flex-1"},O={class:"g-red"},R={key:0,class:"g-green"},H={key:1,class:"g-red"},J={key:2,class:"g-red"},Y={__name:"IndexView",setup($){const s=z({loading:!1,total:0,list:[]}),d=z({ip:"",page:1,limit:15}),f=P(!1),n=async(r=!0)=>{r&&(d.page=1),s.loading=!0;const{success:o,data:u}=await U.getIPList(d);s.loading=!1,o&&(s.list=u.list,s.total=u.total)};n();const p=r=>{N.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{s.loading=!0;const{success:o,data:u}=await U.delIPList({id:r.id});s.loading=!1,o&&(S.success(u.msg),await n(!1))})};return(r,o)=>{const u=a("el-button"),g=a("el-input"),i=a("el-col"),V=a("el-row"),k=a("el-form-item"),x=a("el-form"),c=a("el-table-column"),C=a("el-table"),I=a("el-pagination"),v=a("el-card"),j=E("loading");return m(),b(v,null,{header:t(()=>[_("div",q,[A,_("div",G,[l(u,{type:"success",onClick:o[0]||(o[0]=e=>f.value=!0)},{default:t(()=>[w("\u65B0\u589E\u9ED1\u540D\u5355")]),_:1})])])]),default:t(()=>[l(x,{inline:!0},{default:t(()=>[l(k,{label:"IP\u5730\u5740"},{default:t(()=>[l(V,null,{default:t(()=>[l(i,{span:18},{default:t(()=>[l(g,{modelValue:d.ip,"onUpdate:modelValue":o[1]||(o[1]=e=>d.ip=e),onKeyup:M(n,["enter"]),onClear:n,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627EIP",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),l(i,{span:5,offset:1},{default:t(()=>[l(u,{type:"primary",onClick:n},{default:t(()=>[w("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),L((m(),b(C,{data:s.list,stripe:"",border:""},{default:t(()=>[l(c,{label:"ID",width:"80"},{default:t(e=>[_("div",null,y(e.row.id),1)]),_:1}),l(c,{label:"ip","min-width":"110"},{default:t(e=>[_("div",O,y(e.row.ip),1)]),_:1}),l(c,{label:"\u521B\u5EFA\u65F6\u95F4",width:"150"},{default:t(e=>[_("div",null,y(B(D)(e.row.create_time)),1)]),_:1}),l(c,{label:"\u66F4\u65B0\u65F6\u95F4",width:"150"},{default:t(e=>[_("div",null,y(B(D)(e.row.modify_time)),1)]),_:1}),l(c,{label:"\u72B6\u6001",width:"100"},{default:t(e=>[e.row.status===1?(m(),h("span",R,"\u6B63\u5E38")):e.row.status===0?(m(),h("span",H,"\u7981\u7528")):(m(),h("span",J,"\u5F02\u5E38"))]),_:1}),l(c,{label:"\u64CD\u4F5C",width:"100",fixed:"right"},{default:t(e=>[l(u,{type:"danger",onClick:Q=>p(e.row)},{default:t(()=>[w("\u5220\u9664")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[j,s.loading]]),l(I,{"page-sizes":[15,30,60,100],total:s.total,"page-size":d.limit,"onUpdate:page-size":o[2]||(o[2]=e=>d.limit=e),"current-page":d.page,"onUpdate:current-page":o[3]||(o[3]=e=>d.page=e),onCurrentChange:o[4]||(o[4]=e=>n(!1)),onSizeChange:o[5]||(o[5]=e=>n(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),l(T,{onSuccess:n,modelValue:f.value,"onUpdate:modelValue":o[6]||(o[6]=e=>f.value=e)},null,8,["modelValue"])]),_:1})}}};export{Y as default};
