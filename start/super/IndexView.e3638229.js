import{b as M,M as O,r as z,c as n,d as E,o as d,k as C,h as l,g as e,m as w,w as I,R,i as D,O as q,n as L,E as K,f as y,N as A,G as x,e as v,u as W,l as N,j,P as X}from"./index.2fd98969.js";import{f as F}from"./index.969b688d.js";const Y={__name:"AddView",props:{modelValue:{type:Boolean,default:!1}},emits:["update:modelValue","success"],setup(B,{emit:k}){const _=B,r=M(),s=M(!1),o=O({get:()=>_.modelValue,set:i=>{k("update:modelValue",i)}}),f=z({user_id:"",title:"",content:""}),h=async()=>{r.value.resetFields()},U=async()=>{if(s.value)return;s.value=!0;const{success:i,data:u}=await L.addUserMsg(f);s.value=!1,i&&(k("success"),K.success(u.msg),o.value=!1)};return(i,u)=>{const a=n("el-input"),m=n("el-form-item"),c=n("el-form"),V=n("el-button"),b=n("el-dialog"),$=E("loading");return d(),C(b,{modelValue:D(o),"onUpdate:modelValue":u[4]||(u[4]=g=>q(o)?o.value=g:null),top:"2vh",title:"\u65B0\u589E",onClose:h,draggable:"","close-on-click-modal":!1,width:"680px"},{footer:l(()=>[e(V,{size:"default",onClick:u[3]||(u[3]=g=>o.value=!1)},{default:l(()=>[w("\u53D6 \u6D88")]),_:1}),e(V,{size:"default",type:"primary",onClick:U},{default:l(()=>[w("\u786E \u8BA4")]),_:1})]),default:l(()=>[I((d(),C(c,{size:"default",ref_key:"refForm",ref:r,model:f,"label-width":"90px"},{default:l(()=>[e(m,{label:"\u7528\u6237ID",prop:"user_id"},{default:l(()=>[e(a,{modelValue:f.user_id,"onUpdate:modelValue":u[0]||(u[0]=g=>f.user_id=g),placeholder:"\u8BF7\u8F93\u5165\u7528\u6237ID",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(m,{label:"\u6807\u9898",prop:"title"},{default:l(()=>[e(a,{modelValue:f.title,"onUpdate:modelValue":u[1]||(u[1]=g=>f.title=g),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(m,{label:"\u5185\u5BB9",prop:"content"},{default:l(()=>[e(R,{modelValue:f.content,"onUpdate:modelValue":u[2]||(u[2]=g=>f.content=g)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[$,s.value]])]),_:1},8,["modelValue"])}}},Z={key:0,class:"g-green"},ee={key:1,class:"g-blue"},le={key:2,class:"g-red"},te={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(B,{emit:k}){const _=B,r=M(!1),s=O({get:()=>_.modelValue,set:U=>{k("update:modelValue",U)}}),o=z({id:0,title:"",content:"",status:1}),f=()=>{o.id=_.data.id,o.title=_.data.title,o.content=_.data.content,o.status=_.data.status},h=async()=>{if(r.value)return;r.value=!0;const{success:U,data:i}=await L.editUserMsg(o);r.value=!1,U&&(k("success"),K.success(i.msg),s.value=!1)};return(U,i)=>{const u=n("el-form-item"),a=n("el-col"),m=n("el-row"),c=n("el-input"),V=n("el-option"),b=n("el-select"),$=n("el-form"),g=n("el-button"),S=n("el-dialog"),T=E("loading");return d(),C(S,{modelValue:D(s),"onUpdate:modelValue":i[4]||(i[4]=p=>q(s)?s.value=p:null),top:"2vh",title:"\u7F16\u8F91",onOpen:f,draggable:"","close-on-click-modal":!1,width:"680px"},{footer:l(()=>[e(g,{size:"default",onClick:i[3]||(i[3]=p=>s.value=!1)},{default:l(()=>[w("\u53D6 \u6D88")]),_:1}),e(g,{size:"default",type:"primary",onClick:h},{default:l(()=>[w("\u786E \u8BA4")]),_:1})]),default:l(()=>[I((d(),C($,{size:"default",model:o,"label-width":"90px"},{default:l(()=>[e(m,{gutter:24},{default:l(()=>[e(a,{span:12},{default:l(()=>[e(u,{label:"\u7528\u6237ID"},{default:l(()=>[y("div",{class:A({"g-bg-pink":_.data.user.virtual})},[y("span",null,x(_.data.user_id),1),_.data.user.type===1?(d(),v("span",Z,"(\u4F1A\u5458)")):_.data.user.type===2?(d(),v("span",ee,"(\u4EE3\u7406)")):(d(),v("span",le,"(\u5F02\u5E38)"))],2)]),_:1})]),_:1}),e(a,{span:12},{default:l(()=>[e(u,{label:"\u7528\u6237\u540D"},{default:l(()=>[w(x(_.data.user.user_name),1)]),_:1})]),_:1})]),_:1}),e(u,{label:"\u6807\u9898",prop:"title"},{default:l(()=>[e(c,{modelValue:o.title,"onUpdate:modelValue":i[0]||(i[0]=p=>o.title=p),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(u,{label:"\u5185\u5BB9",prop:"content"},{default:l(()=>[e(R,{modelValue:o.content,"onUpdate:modelValue":i[1]||(i[1]=p=>o.content=p)},null,8,["modelValue"])]),_:1}),e(u,{label:"\u72B6\u6001"},{default:l(()=>[e(b,{modelValue:o.status,"onUpdate:modelValue":i[2]||(i[2]=p=>o.status=p)},{default:l(()=>[e(V,{label:"\u6B63\u5E38",value:1}),e(V,{label:"\u7981\u7528",value:0})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[T,r.value]])]),_:1},8,["modelValue"])}}},ae={class:"g-flex"},oe=y("span",null,"\u7528\u6237\u7AD9\u5185\u4FE1",-1),se={class:"g-flex-justify-end g-flex-1"},ne={key:0,class:"g-green"},ue={key:1,class:"g-blue"},de={key:2,class:"g-grey"},re={key:3,class:"g-red"},ie={key:0,class:"g-red"},pe={key:1},_e={key:0,class:"g-blue"},me={key:1},ce={key:0,class:"g-green"},fe={key:1,class:"g-red"},ge={key:2,class:"g-red"},be={__name:"IndexView",setup(B){const k=W(),_=z({addUserMsg:k.auth("addUserMsg"),editUserMsg:k.auth("editUserMsg")}),r=z({loading:!1,total:0,list:[],row:{}}),s=z({userType:"",virtual:"",status:"",id_card:"",name:"",search_key:"user_name",search_val:"",page:1,limit:15}),o=async(u=!0)=>{u&&(s.page=1),r.loading=!0;const{success:a,data:m}=await L.getUserMsgList(s);r.loading=!1,a&&(r.list=m.list,r.total=m.total)};o();const f=M(!1),h=M(!1),U=u=>{r.row=u,h.value=!0},i=u=>{X.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{r.loading=!0;const{success:a,data:m}=await L.delUserMsg({id:u.id});r.loading=!1,a&&(K.success(m.msg),await o(!1))})};return(u,a)=>{const m=n("el-button"),c=n("el-option"),V=n("el-select"),b=n("el-form-item"),$=n("el-input"),g=n("el-col"),S=n("el-row"),T=n("el-form"),p=n("el-table-column"),G=n("el-table"),P=n("el-pagination"),H=n("el-card"),J=E("loading");return d(),C(H,null,{header:l(()=>[y("div",ae,[oe,y("div",se,[_.addUserMsg?(d(),C(m,{key:0,type:"success",onClick:a[0]||(a[0]=t=>f.value=!0)},{default:l(()=>[w("\u65B0\u589E")]),_:1})):N("",!0)])])]),default:l(()=>[e(T,{inline:!0},{default:l(()=>[e(b,{label:"\u7528\u6237\u7C7B\u578B"},{default:l(()=>[e(V,{modelValue:s.userType,"onUpdate:modelValue":a[1]||(a[1]=t=>s.userType=t),onChange:o},{default:l(()=>[e(c,{label:"\u5168\u90E8",value:""}),e(c,{label:"\u4EE3\u7406",value:"2"}),e(c,{label:"\u4F1A\u5458",value:"1"})]),_:1},8,["modelValue"])]),_:1}),e(b,{label:"\u8D26\u53F7\u7C7B\u578B"},{default:l(()=>[e(V,{modelValue:s.virtual,"onUpdate:modelValue":a[2]||(a[2]=t=>s.virtual=t),onChange:o},{default:l(()=>[e(c,{label:"\u5168\u90E8",value:""}),e(c,{label:"\u865A\u62DF\u53F7",value:"1"}),e(c,{label:"\u6B63\u5E38",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(b,{label:"\u72B6\u6001"},{default:l(()=>[e(V,{modelValue:s.status,"onUpdate:modelValue":a[3]||(a[3]=t=>s.status=t),onChange:o},{default:l(()=>[e(c,{label:"\u5168\u90E8",value:""}),e(c,{label:"\u6B63\u5E38",value:"1"}),e(c,{label:"\u7981\u7528",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(b,{label:"\u6807\u9898"},{default:l(()=>[e($,{modelValue:s.title,"onUpdate:modelValue":a[4]||(a[4]=t=>s.title=t),onKeyup:j(o,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",onClear:o,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(b,null,{label:l(()=>[e(V,{modelValue:s.search_key,"onUpdate:modelValue":a[5]||(a[5]=t=>s.search_key=t)},{default:l(()=>[e(c,{label:"\u7528\u6237\u540D",value:"user_name"}),e(c,{label:"\u7528\u6237ID",value:"user_id"})]),_:1},8,["modelValue"])]),default:l(()=>[e(S,null,{default:l(()=>[e(g,{span:18},{default:l(()=>[e($,{modelValue:s.search_val,"onUpdate:modelValue":a[6]||(a[6]=t=>s.search_val=t),onKeyup:j(o,["enter"]),onClear:o,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(g,{span:5,offset:1},{default:l(()=>[e(m,{type:"primary",onClick:o},{default:l(()=>[w("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),I((d(),C(G,{data:r.list,stripe:"",border:""},{default:l(()=>[e(p,{fixed:"left",label:"\u7528\u6237",width:"120"},{default:l(t=>[y("div",{class:A({"g-bg-pink":t.row.user.virtual})},[y("span",null,x(t.row.user.id),1),t.row.user.type===1?(d(),v("span",ne,"(\u4F1A\u5458)")):t.row.user.type===2?(d(),v("span",ue,"(\u4EE3\u7406)")):t.row.user.type===0?(d(),v("span",de,"(\u865A\u62DF\u76D8)")):(d(),v("span",re,"(\u5F02\u5E38)"))],2)]),_:1}),e(p,{fixed:"left",prop:"user.user_name",label:"\u7528\u6237\u540D",width:"100"}),e(p,{label:"\u603B\u4EE3\u7406",width:"100"},{default:l(t=>[t.row.agentList.length>0?(d(),v("span",ie,x(t.row.agentList[0].user_name),1)):(d(),v("span",pe,"-"))]),_:1}),e(p,{label:"\u4E0A\u7EA7\u4EE3\u7406",width:"100"},{default:l(t=>[t.row.agentList.length>0?(d(),v("span",_e,x(t.row.agentList[t.row.agentList.length-1].user_name),1)):(d(),v("span",me,"-"))]),_:1}),e(p,{prop:"title",label:"\u6807\u9898","min-width":"100"}),e(p,{prop:"operator",label:"\u64CD\u4F5C\u4EBA",width:"80","show-overflow-tooltip":!0}),e(p,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:l(t=>[y("span",null,x(D(F)(t.row.create_time)),1)]),_:1}),e(p,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:l(t=>[y("span",null,x(D(F)(t.row.modify_time)),1)]),_:1}),e(p,{label:"\u72B6\u6001",width:"80"},{default:l(t=>[t.row.status===1?(d(),v("span",ce,"\u6B63\u5E38")):t.row.status===0?(d(),v("span",fe,"\u7981\u7528")):(d(),v("span",ge,"\u5F02\u5E38"))]),_:1}),_.editUserMsg?(d(),C(p,{key:0,label:"\u64CD\u4F5C",width:"130",fixed:"right"},{default:l(t=>[e(m,{type:"primary",onClick:Q=>U(t.row)},{default:l(()=>[w("\u7F16\u8F91")]),_:2},1032,["onClick"]),e(m,{type:"danger",onClick:Q=>i(t.row)},{default:l(()=>[w("\u5220\u9664")]),_:2},1032,["onClick"])]),_:1})):N("",!0)]),_:1},8,["data"])),[[J,r.loading]]),e(P,{"page-sizes":[15,30,60,100],total:r.total,"page-size":s.limit,"onUpdate:page-size":a[7]||(a[7]=t=>s.limit=t),"current-page":s.page,"onUpdate:current-page":a[8]||(a[8]=t=>s.page=t),onCurrentChange:a[9]||(a[9]=t=>o(!1)),onSizeChange:a[10]||(a[10]=t=>o(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),e(Y,{onSuccess:o,modelValue:f.value,"onUpdate:modelValue":a[11]||(a[11]=t=>f.value=t)},null,8,["modelValue"]),e(te,{onSuccess:a[12]||(a[12]=t=>o(!1)),modelValue:h.value,"onUpdate:modelValue":a[13]||(a[13]=t=>h.value=t),data:r.row},null,8,["modelValue","data"])]),_:1})}}};export{be as default};
