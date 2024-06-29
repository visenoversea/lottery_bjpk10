import{u as O,b as E,M as T,r as h,c as s,d as j,o as c,k,h as l,g as e,m as C,w as K,i as B,O as I,n as N,E as L,j as M,f as g,G as v,e as $}from"./index.41d7bbc0.js";import{f as S}from"./index.969b688d.js";const q={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(D,{emit:i}){const o=D;O();const d=E(!1),_=T({get:()=>o.modelValue,set:p=>{i("update:modelValue",p)}}),n=h({id:0,title:"",des:"",amount:"",status:1}),b=()=>{n.id=o.data.id,n.title=o.data.title,n.des=o.data.des,n.amount=o.data.amount,n.status=o.data.status},a=async()=>{if(d.value)return;d.value=!0;const{success:p,data:u}=await N.editTask(n);d.value=!1,p&&(i("success"),L.success(u.msg),_.value=!1)};return(p,u)=>{const f=s("el-input"),V=s("el-form-item"),w=s("el-option"),x=s("el-select"),m=s("el-form"),y=s("el-button"),U=s("el-dialog"),z=j("loading");return c(),k(U,{modelValue:B(_),"onUpdate:modelValue":u[5]||(u[5]=r=>I(_)?_.value=r:null),title:"\u7F16\u8F91",onOpen:b,"close-on-click-modal":!1,width:"520px"},{footer:l(()=>[e(y,{size:"default",onClick:u[4]||(u[4]=r=>_.value=!1)},{default:l(()=>[C("\u53D6 \u6D88")]),_:1}),e(y,{size:"default",type:"primary",onClick:a},{default:l(()=>[C("\u786E \u8BA4")]),_:1})]),default:l(()=>[K((c(),k(m,{size:"default",model:n,"label-width":"90px"},{default:l(()=>[e(V,{label:"\u4EFB\u52A1\u540D\u5B57"},{default:l(()=>[e(f,{modelValue:n.title,"onUpdate:modelValue":u[0]||(u[0]=r=>n.title=r),placeholder:"\u8BF7\u8F93\u5165\u4EFB\u52A1\u540D\u5B57",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(V,{label:"\u4EFB\u52A1\u63CF\u8FF0"},{default:l(()=>[e(f,{modelValue:n.des,"onUpdate:modelValue":u[1]||(u[1]=r=>n.des=r),placeholder:"\u8BF7\u8F93\u5165\u4EFB\u52A1\u63CF\u8FF0",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(V,{label:"\u4EFB\u52A1\u5956\u52B1"},{default:l(()=>[e(f,{modelValue:n.amount,"onUpdate:modelValue":u[2]||(u[2]=r=>n.amount=r),placeholder:"\u8BF7\u8F93\u5165\u4EFB\u52A1\u4EFB\u52A1\u5956\u52B1\u91D1\u989D",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(V,{label:"\u72B6\u6001"},{default:l(()=>[e(x,{modelValue:n.status,"onUpdate:modelValue":u[3]||(u[3]=r=>n.status=r)},{default:l(()=>[e(w,{label:"\u6B63\u5E38",value:1}),e(w,{label:"\u7981\u7528",value:0})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[z,d.value]])]),_:1},8,["modelValue"])}}},G=g("div",{class:"g-flex"},[g("span",null,"\u4EFB\u52A1\u914D\u7F6E")],-1),R={class:"g-purple"},A={class:"g-red"},F={key:0,class:"g-green"},H={key:1,class:"g-red"},J={key:2,class:"g-red"},X={__name:"IndexView",setup(D){const i=h({loading:!1,total:0,list:[],row:{}}),o=h({title:"",status:"",page:1,limit:15}),d=async(b=!0)=>{b&&(o.page=1),i.loading=!0;const{success:a,data:p}=await N.getTaskList(o);i.loading=!1,a&&(i.list=p.list,i.total=p.total)};d();const _=E(!1),n=b=>{i.row=b,_.value=!0};return(b,a)=>{const p=s("el-option"),u=s("el-select"),f=s("el-form-item"),V=s("el-input"),w=s("el-button"),x=s("el-form"),m=s("el-table-column"),y=s("el-table"),U=s("el-pagination"),z=s("el-card"),r=j("loading");return c(),k(z,null,{header:l(()=>[G]),default:l(()=>[e(x,{inline:!0},{default:l(()=>[e(f,{label:"\u72B6\u6001"},{default:l(()=>[e(u,{modelValue:o.status,"onUpdate:modelValue":a[0]||(a[0]=t=>o.status=t),onChange:d},{default:l(()=>[e(p,{label:"\u5168\u90E8",value:""}),e(p,{label:"\u6B63\u5E38",value:"1"}),e(p,{label:"\u7981\u7528",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(f,{label:"\u4EFB\u52A1\u540D\u5B57"},{default:l(()=>[e(V,{modelValue:o.title,"onUpdate:modelValue":a[1]||(a[1]=t=>o.title=t),onKeyup:M(d,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u4EFB\u52A1\u540D\u5B57",onClear:d,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(f,null,{default:l(()=>[e(w,{type:"primary",onClick:d},{default:l(()=>[C("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1}),K((c(),k(y,{data:i.list,stripe:"",border:""},{default:l(()=>[e(m,{prop:"id",label:"ID",width:"80"}),e(m,{label:"\u4EFB\u52A1\u540D\u5B57","min-width":"100"},{default:l(t=>[g("span",R,v(t.row.title),1)]),_:1}),e(m,{label:"\u4EFB\u52A1\u63CF\u8FF0","min-width":"160"},{default:l(t=>[g("span",null,v(t.row.des),1)]),_:1}),e(m,{label:"\u4EFB\u52A1\u5956\u52B1","min-width":"160"},{default:l(t=>[g("span",A,v(t.row.amount),1)]),_:1}),e(m,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:l(t=>[g("span",null,v(B(S)(t.row.create_time)),1)]),_:1}),e(m,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:l(t=>[g("span",null,v(B(S)(t.row.modify_time)),1)]),_:1}),e(m,{label:"\u72B6\u6001",width:"80"},{default:l(t=>[t.row.status===1?(c(),$("span",F,"\u6B63\u5E38")):t.row.status===0?(c(),$("span",H,"\u7981\u7528")):(c(),$("span",J,"\u5F02\u5E38"))]),_:1}),e(m,{label:"\u64CD\u4F5C",width:"80",fixed:"right"},{default:l(t=>[e(w,{type:"primary",onClick:P=>n(t.row)},{default:l(()=>[C("\u7F16\u8F91")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[r,i.loading]]),e(U,{"page-sizes":[15,30,60,100],total:i.total,"page-size":o.limit,"onUpdate:page-size":a[2]||(a[2]=t=>o.limit=t),"current-page":o.page,"onUpdate:current-page":a[3]||(a[3]=t=>o.page=t),onCurrentChange:a[4]||(a[4]=t=>d(!1)),onSizeChange:a[5]||(a[5]=t=>d(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),e(q,{onSuccess:a[6]||(a[6]=t=>d(!1)),modelValue:_.value,"onUpdate:modelValue":a[7]||(a[7]=t=>_.value=t),data:i.row},null,8,["modelValue","data"])]),_:1})}}};export{X as default};
