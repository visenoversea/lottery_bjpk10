import{b as B,M,r as $,c as s,d as N,o as m,k as y,h as l,g as e,m as f,w as F,i as S,O,n as E,E as I,f as C,G as A,u as H,l as j,j as J,e as k,P as Q}from"./index.7fcd2ef9.js";import{f as K}from"./index.15917a18.js";const W={__name:"AddView",props:{modelValue:{type:Boolean,default:!1}},emits:["update:modelValue","success"],setup(P,{emit:b}){const c=P,i=B(),r=B(!1),t=M({get:()=>c.modelValue,set:d=>{b("update:modelValue",d)}}),p=$({type:0,host:"",port:443,sort:0,remark:""}),h=async()=>{i.value.resetFields()},v=async()=>{if(r.value)return;r.value=!0;const{success:d,data:a}=await E.addDomain(p);r.value=!1,d&&(b("success"),I.success(a.msg),t.value=!1)};return(d,a)=>{const o=s("el-radio"),V=s("el-radio-group"),g=s("el-form-item"),w=s("el-input"),D=s("el-form"),U=s("el-button"),x=s("el-dialog"),z=N("loading");return m(),y(x,{modelValue:S(t),"onUpdate:modelValue":a[6]||(a[6]=_=>O(t)?t.value=_:null),title:"\u65B0\u589E\u57DF\u540D",onClose:h,draggable:"","close-on-click-modal":!1,width:"680px"},{footer:l(()=>[e(U,{size:"default",onClick:a[5]||(a[5]=_=>t.value=!1)},{default:l(()=>[f("\u53D6 \u6D88")]),_:1}),e(U,{size:"default",type:"primary",onClick:v},{default:l(()=>[f("\u786E \u8BA4")]),_:1})]),default:l(()=>[F((m(),y(D,{size:"default",ref_key:"refForm",ref:i,model:p,"label-width":"90px"},{default:l(()=>[e(g,{label:"\u7C7B\u578B",prop:"type"},{default:l(()=>[e(V,{modelValue:p.type,"onUpdate:modelValue":a[0]||(a[0]=_=>p.type=_)},{default:l(()=>[e(o,{label:0},{default:l(()=>[f("\u524D\u7AEF\u57DF\u540D")]),_:1}),e(o,{label:1},{default:l(()=>[f("APP\u57DF\u540D")]),_:1}),e(o,{label:2},{default:l(()=>[f("\u540E\u53F0\u57DF\u540D")]),_:1}),e(o,{label:3},{default:l(()=>[f("\u4E0B\u8F7D\u57DF\u540D")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(g,{label:"\u4E3B\u673A",prop:"id"},{default:l(()=>[e(w,{modelValue:p.host,"onUpdate:modelValue":a[1]||(a[1]=_=>p.host=_),placeholder:"\u8BF7\u8F93\u5165\u4E3B\u673A"},null,8,["modelValue"])]),_:1}),e(g,{label:"\u7AEF\u53E3\u53F7",prop:"port"},{default:l(()=>[e(w,{modelValue:p.port,"onUpdate:modelValue":a[2]||(a[2]=_=>p.port=_),placeholder:"\u8BF7\u8F93\u5165\u7AEF\u53E3\u53F7"},null,8,["modelValue"])]),_:1}),e(g,{label:"\u6392\u5E8F",prop:"sort"},{default:l(()=>[e(w,{modelValue:p.sort,"onUpdate:modelValue":a[3]||(a[3]=_=>p.sort=_),placeholder:"\u8BF7\u8F93\u5165\u6392\u5E8F"},null,8,["modelValue"])]),_:1}),e(g,{label:"\u5907\u6CE8",prop:"remark"},{default:l(()=>[e(w,{modelValue:p.remark,"onUpdate:modelValue":a[4]||(a[4]=_=>p.remark=_),placeholder:"\u8BF7\u8F93\u5165\u5907\u6CE8"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[z,r.value]])]),_:1},8,["modelValue"])}}},X={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(P,{emit:b}){const c=P,i=B(!1),r=M({get:()=>c.modelValue,set:v=>{b("update:modelValue",v)}}),t=$({id:0,type:0,host:"",port:443,sort:0,remark:"",status:1}),p=()=>{t.id=c.data.id,t.type=c.data.type,t.host=c.data.host,t.port=c.data.port,t.sort=c.data.sort,t.remark=c.data.remark,t.status=c.data.status},h=async()=>{if(i.value)return;i.value=!0;const{success:v,data:d}=await E.editDomain(t);i.value=!1,v&&(b("success"),I.success(d.msg),r.value=!1)};return(v,d)=>{const a=s("el-form-item"),o=s("el-radio"),V=s("el-radio-group"),g=s("el-input"),w=s("el-option"),D=s("el-select"),U=s("el-form"),x=s("el-button"),z=s("el-dialog"),_=N("loading");return m(),y(z,{modelValue:S(r),"onUpdate:modelValue":d[7]||(d[7]=u=>O(r)?r.value=u:null),top:"2vh",title:"\u7F16\u8F91",onOpen:p,draggable:"","close-on-click-modal":!1,width:"680px"},{footer:l(()=>[e(x,{size:"default",onClick:d[6]||(d[6]=u=>r.value=!1)},{default:l(()=>[f("\u53D6 \u6D88")]),_:1}),e(x,{size:"default",type:"primary",onClick:h},{default:l(()=>[f("\u786E \u8BA4")]),_:1})]),default:l(()=>[F((m(),y(U,{size:"default",model:t,"label-width":"90px"},{default:l(()=>[e(a,{label:"ID",prop:"id"},{default:l(()=>[C("div",null,A(t.id),1)]),_:1}),e(a,{label:"\u7C7B\u578B",prop:"type"},{default:l(()=>[e(V,{modelValue:t.type,"onUpdate:modelValue":d[0]||(d[0]=u=>t.type=u)},{default:l(()=>[e(o,{label:0},{default:l(()=>[f("\u524D\u7AEF\u57DF\u540D")]),_:1}),e(o,{label:1},{default:l(()=>[f("APP\u57DF\u540D")]),_:1}),e(o,{label:2},{default:l(()=>[f("\u540E\u53F0\u57DF\u540D")]),_:1}),e(o,{label:3},{default:l(()=>[f("\u4E0B\u8F7D\u57DF\u540D")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(a,{label:"\u4E3B\u673A",prop:"id"},{default:l(()=>[e(g,{modelValue:t.host,"onUpdate:modelValue":d[1]||(d[1]=u=>t.host=u),placeholder:"\u8BF7\u8F93\u5165\u4E3B\u673A"},null,8,["modelValue"])]),_:1}),e(a,{label:"\u7AEF\u53E3\u53F7",prop:"port"},{default:l(()=>[e(g,{modelValue:t.port,"onUpdate:modelValue":d[2]||(d[2]=u=>t.port=u),placeholder:"\u8BF7\u8F93\u5165\u7AEF\u53E3\u53F7"},null,8,["modelValue"])]),_:1}),e(a,{label:"\u6392\u5E8F",prop:"sort"},{default:l(()=>[e(g,{modelValue:t.sort,"onUpdate:modelValue":d[3]||(d[3]=u=>t.sort=u),placeholder:"\u8BF7\u8F93\u5165\u6392\u5E8F"},null,8,["modelValue"])]),_:1}),e(a,{label:"\u5907\u6CE8",prop:"remark"},{default:l(()=>[e(g,{modelValue:t.remark,"onUpdate:modelValue":d[4]||(d[4]=u=>t.remark=u),placeholder:"\u8BF7\u8F93\u5165\u5907\u6CE8"},null,8,["modelValue"])]),_:1}),e(a,{label:"\u72B6\u6001",prop:"status"},{default:l(()=>[e(D,{modelValue:t.status,"onUpdate:modelValue":d[5]||(d[5]=u=>t.status=u)},{default:l(()=>[e(w,{label:"\u6B63\u5E38",value:1}),e(w,{label:"\u7981\u7528",value:0})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[_,i.value]])]),_:1},8,["modelValue"])}}},Y={class:"g-flex"},Z=C("span",null,"\u57DF\u540D\u914D\u7F6E",-1),ee={class:"g-flex-justify-end g-flex-1"},le={key:0,class:"g-red"},te={key:1,class:"g-blue"},oe={key:2,class:"g-purple"},ae={key:3,class:"g-green"},ne={key:4,class:"g-red"},se={key:0,class:"g-green"},de={key:1,class:"g-red"},ue={key:2,class:"g-red"},pe={__name:"IndexView",setup(P){const b=H(),c=$({addDomain:b.auth("addDomain"),editDomain:b.auth("editDomain"),delDomain:b.auth("delDomain")}),i=$({loading:!1,total:0,list:[],row:{}}),r=$({host:"",status:"",page:1,limit:20}),t=async(a=!0)=>{a&&(r.page=1),i.loading=!0;const{success:o,data:V}=await E.getDomainList(r);i.loading=!1,o&&(i.list=V.list,i.total=V.total)};t();const p=B(!1),h=B(!1),v=a=>{i.row=a,h.value=!0},d=a=>{Q.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{i.loading=!0;const{success:o,data:V}=await E.delDomain({id:a.id});i.loading=!1,o&&(I.success(V.msg),await t(!1))})};return(a,o)=>{const V=s("el-button"),g=s("el-option"),w=s("el-select"),D=s("el-form-item"),U=s("el-input"),x=s("el-col"),z=s("el-row"),_=s("el-form"),u=s("el-table-column"),T=s("el-table"),L=s("el-pagination"),q=s("el-card"),G=N("loading");return m(),y(q,null,{header:l(()=>[C("div",Y,[Z,C("div",ee,[c.addDomain?(m(),y(V,{key:0,type:"success",onClick:o[0]||(o[0]=n=>p.value=!0)},{default:l(()=>[f("\u65B0\u589E")]),_:1})):j("",!0)])])]),default:l(()=>[e(_,{inline:!0},{default:l(()=>[e(D,{label:"\u72B6\u6001"},{default:l(()=>[e(w,{modelValue:r.status,"onUpdate:modelValue":o[1]||(o[1]=n=>r.status=n),onChange:t},{default:l(()=>[e(g,{label:"\u5168\u90E8",value:""}),e(g,{label:"\u6B63\u5E38",value:"1"}),e(g,{label:"\u7981\u7528",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(D,{label:"\u4E3B\u673A"},{default:l(()=>[e(z,null,{default:l(()=>[e(x,{span:18},{default:l(()=>[e(U,{modelValue:r.host,"onUpdate:modelValue":o[2]||(o[2]=n=>r.host=n),onKeyup:J(t,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u4E3B\u673A",onClear:t,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(x,{span:5,offset:1},{default:l(()=>[e(V,{type:"primary",onClick:t},{default:l(()=>[f("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),F((m(),y(T,{data:i.list,stripe:"",border:""},{default:l(()=>[e(u,{prop:"id",label:"ID",width:"100"}),e(u,{label:"\u7528\u6237",width:"120"},{default:l(n=>[C("div",null,[n.row.type===0?(m(),k("span",le,"\u524D\u7AEF\u57DF\u540D")):n.row.type===1?(m(),k("span",te,"APP\u57DF\u540D")):n.row.type===2?(m(),k("span",oe,"\u540E\u53F0\u57DF\u540D")):n.row.type===3?(m(),k("span",ae,"\u4E0B\u8F7D\u57DF\u540D")):(m(),k("span",ne,"(\u5F02\u5E38)"))])]),_:1}),e(u,{prop:"host",label:"\u4E3B\u673A","min-width":"80","show-overflow-tooltip":!0}),e(u,{prop:"port",label:"\u7AEF\u53E3","min-width":"80","show-overflow-tooltip":!0}),e(u,{prop:"sort",label:"\u6392\u5E8F","min-width":"80","show-overflow-tooltip":!0}),e(u,{prop:"remark",label:"\u5907\u6CE8","min-width":"80","show-overflow-tooltip":!0}),e(u,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:l(n=>[C("span",null,A(S(K)(n.row.create_time)),1)]),_:1}),e(u,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:l(n=>[C("span",null,A(S(K)(n.row.modify_time)),1)]),_:1}),e(u,{label:"\u72B6\u6001",width:"80"},{default:l(n=>[n.row.status===1?(m(),k("span",se,"\u6B63\u5E38")):n.row.status===0?(m(),k("span",de,"\u7981\u7528")):(m(),k("span",ue,"\u5F02\u5E38"))]),_:1}),c.editDomain?(m(),y(u,{key:0,label:"\u64CD\u4F5C",width:"130",fixed:"right"},{default:l(n=>[e(V,{type:"primary",onClick:R=>v(n.row)},{default:l(()=>[f("\u7F16\u8F91")]),_:2},1032,["onClick"]),c.delDomain?(m(),y(V,{key:0,type:"danger",onClick:R=>d(n.row)},{default:l(()=>[f("\u5220\u9664")]),_:2},1032,["onClick"])):j("",!0)]),_:1})):j("",!0)]),_:1},8,["data"])),[[G,i.loading]]),e(L,{"page-sizes":[15,30,60,100],total:i.total,"page-size":r.limit,"onUpdate:page-size":o[3]||(o[3]=n=>r.limit=n),"current-page":r.page,"onUpdate:current-page":o[4]||(o[4]=n=>r.page=n),onCurrentChange:o[5]||(o[5]=n=>t(!1)),onSizeChange:o[6]||(o[6]=n=>t(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),e(W,{onSuccess:t,modelValue:p.value,"onUpdate:modelValue":o[7]||(o[7]=n=>p.value=n)},null,8,["modelValue"]),e(X,{onSuccess:o[8]||(o[8]=n=>t(!1)),modelValue:h.value,"onUpdate:modelValue":o[9]||(o[9]=n=>h.value=n),data:i.row},null,8,["modelValue","data"])]),_:1})}}};export{pe as default};
