import{b as C,M as A,r as E,c as n,d as O,o as b,k as x,h as t,g as e,m as V,w as S,i as D,O as L,n as B,E as R,f as z,j as G,e as K,G as F,P as I}from"./index.2f5aab6b.js";import{f as M}from"./index.f2e9d2c9.js";const H={__name:"AddView",props:{modelValue:{type:Boolean,default:!1}},emits:["update:modelValue","success"],setup(U,{emit:i}){const m=U,u=C(),c=C(!1),o=A({get:()=>m.modelValue,set:p=>{i("update:modelValue",p)}}),_=E({name:"",remark:"",sort:0}),k=()=>{},g=async()=>{u.value.resetFields()},d=async()=>{if(c.value)return;c.value=!0;const{success:p,data:l}=await B.addRole(_);c.value=!1,p&&(i("success"),R.success(l.msg),o.value=!1)};return(p,l)=>{const a=n("el-input"),f=n("el-form-item"),v=n("el-form"),w=n("el-button"),y=n("el-dialog"),$=O("loading");return b(),x(y,{modelValue:D(o),"onUpdate:modelValue":l[4]||(l[4]=r=>L(o)?o.value=r:null),top:"2vh",title:"\u65B0\u589E",onOpen:k,onClose:g,draggable:"","close-on-click-modal":!1,width:"680px"},{footer:t(()=>[e(w,{size:"default",onClick:l[3]||(l[3]=r=>o.value=!1)},{default:t(()=>[V("\u53D6 \u6D88")]),_:1}),e(w,{size:"default",type:"primary",onClick:d},{default:t(()=>[V("\u786E \u8BA4")]),_:1})]),default:t(()=>[S((b(),x(v,{size:"default",ref_key:"refForm",ref:u,model:_,"label-width":"90px"},{default:t(()=>[e(f,{label:"\u89D2\u8272\u540D\u79F0",prop:"title"},{default:t(()=>[e(a,{modelValue:_.name,"onUpdate:modelValue":l[0]||(l[0]=r=>_.name=r)},null,8,["modelValue"])]),_:1}),e(f,{label:"\u5907\u6CE8",prop:"remark"},{default:t(()=>[e(a,{modelValue:_.remark,"onUpdate:modelValue":l[1]||(l[1]=r=>_.remark=r)},null,8,["modelValue"])]),_:1}),e(f,{label:"\u6392\u5E8F",prop:"sort"},{default:t(()=>[e(a,{modelValue:_.sort,"onUpdate:modelValue":l[2]||(l[2]=r=>_.sort=r)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[$,c.value]])]),_:1},8,["modelValue"])}}},J={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(U,{emit:i}){const m=U,u=C(!1),c=A({get:()=>m.modelValue,set:g=>{i("update:modelValue",g)}}),o=E({id:0,name:"",remark:"",sort:0,status:1}),_=()=>{o.id=m.data.id,o.name=m.data.name,o.remark=m.data.remark,o.sort=m.data.sort,o.status=m.data.status},k=async()=>{if(u.value)return;u.value=!0;const{success:g,data:d}=await B.editRole(o);u.value=!1,g&&(i("success"),R.success(d.msg),c.value=!1)};return(g,d)=>{const p=n("el-input"),l=n("el-form-item"),a=n("el-radio"),f=n("el-radio-group"),v=n("el-form"),w=n("el-button"),y=n("el-dialog"),$=O("loading");return b(),x(y,{modelValue:D(c),"onUpdate:modelValue":d[5]||(d[5]=r=>L(c)?c.value=r:null),top:"2vh",title:"\u7F16\u8F91",onOpen:_,draggable:"","close-on-click-modal":!1,width:"680px"},{footer:t(()=>[e(w,{size:"default",onClick:d[4]||(d[4]=r=>c.value=!1)},{default:t(()=>[V("\u53D6 \u6D88")]),_:1}),e(w,{size:"default",type:"primary",onClick:k},{default:t(()=>[V("\u786E \u8BA4")]),_:1})]),default:t(()=>[S((b(),x(v,{size:"default",model:o,"label-width":"90px"},{default:t(()=>[e(l,{label:"\u89D2\u8272\u540D\u79F0",prop:"title"},{default:t(()=>[e(p,{modelValue:o.name,"onUpdate:modelValue":d[0]||(d[0]=r=>o.name=r)},null,8,["modelValue"])]),_:1}),e(l,{label:"\u5907\u6CE8",prop:"title"},{default:t(()=>[e(p,{modelValue:o.remark,"onUpdate:modelValue":d[1]||(d[1]=r=>o.remark=r)},null,8,["modelValue"])]),_:1}),e(l,{label:"\u6392\u5E8F",prop:"sort"},{default:t(()=>[e(p,{modelValue:o.sort,"onUpdate:modelValue":d[2]||(d[2]=r=>o.sort=r)},null,8,["modelValue"])]),_:1}),e(l,{label:"\u72B6\u6001",prop:"status"},{default:t(()=>[e(f,{modelValue:o.status,"onUpdate:modelValue":d[3]||(d[3]=r=>o.status=r)},{default:t(()=>[e(a,{label:1},{default:t(()=>[V("\u6B63\u5E38")]),_:1}),e(a,{label:0},{default:t(()=>[V("\u7981\u7528")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[$,u.value]])]),_:1},8,["modelValue"])}}};const Q={__name:"AuthEdit",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(U,{emit:i}){const m=U,u=C(!1),c=A({get:()=>m.modelValue,set:l=>{i("update:modelValue",l)}}),o=E({menuData:[],menuChecked:[],menuProps:{children:"children",label:"title",class:l=>l.type==1?l.status==1?"s-menu-show":"s-menu-hide":"s-api"}}),_=(l,a=0)=>{let f=[];return l.forEach(v=>{v.parent_id==a&&(v.children=_(l,v.id),f.push(v))}),f},k=async()=>{u.value=!0;const{success:l,data:a}=await B.getAuthList({id:m.data.id});u.value=!1,l&&(o.menuData=_(a.list),o.menuChecked=a.menuChecked)},g=()=>{k()},d=C(),p=async()=>{const l=d.value.getCheckedKeys(!1);if(u.value)return;u.value=!0;const{success:a,data:f}=await B.editAuth({id:m.data.id,menuChecked:l});u.value=!1,a&&(i("success"),R.success(f.msg),c.value=!1)};return(l,a)=>{const f=n("el-tree"),v=n("el-button"),w=n("el-dialog");return b(),x(w,{class:"s-role-list-auth",modelValue:D(c),"onUpdate:modelValue":a[1]||(a[1]=y=>L(c)?c.value=y:null),top:"2vh",title:"\u7F16\u8F91",onOpen:g,draggable:"","close-on-click-modal":!1,width:"680px"},{footer:t(()=>[e(v,{size:"default",onClick:a[0]||(a[0]=y=>c.value=!1)},{default:t(()=>[V("\u53D6 \u6D88")]),_:1}),e(v,{size:"default",type:"primary",onClick:p},{default:t(()=>[V("\u786E \u8BA4")]),_:1})]),default:t(()=>[e(f,{ref_key:"treeRef",ref:d,"node-key":"id",data:o.menuData,"default-checked-keys":o.menuChecked,props:o.menuProps,"show-checkbox":"","check-strictly":"","default-expand-all":"","highlight-current":""},null,8,["data","default-checked-keys","props"])]),_:1},8,["modelValue"])}}},W={class:"g-flex"},X=z("span",null,"\u89D2\u8272\u7BA1\u7406",-1),Y={class:"g-flex-justify-end g-flex-1"},Z={key:0,class:"g-green"},ee={key:1,class:"g-red"},oe={__name:"IndexView",setup(U){const i=E({loading:!1,list:[],row:{}}),m=E({status:"",search_key:"name",search_val:""}),u=async()=>{i.loading=!0;const{success:p,data:l}=await B.getRoleList(m);i.loading=!1,p&&(i.list=l.list)};u();const c=C(!1),o=C(!1),_=p=>{i.row=p,o.value=!0},k=C(!1),g=p=>{i.row=p,k.value=!0},d=p=>{I.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{i.loading=!0;const{success:l,data:a}=await B.delRole({id:p.id});i.loading=!1,l&&(R.success(a.msg),await u())})};return(p,l)=>{const a=n("el-button"),f=n("el-option"),v=n("el-select"),w=n("el-form-item"),y=n("el-input"),$=n("el-col"),r=n("el-row"),N=n("el-form"),h=n("el-table-column"),P=n("el-table"),T=n("el-card"),q=O("loading");return b(),x(T,null,{header:t(()=>[z("div",W,[X,z("div",Y,[e(a,{type:"success",onClick:l[0]||(l[0]=s=>c.value=!0)},{default:t(()=>[V("\u65B0\u589E")]),_:1})])])]),default:t(()=>[e(N,{inline:!0},{default:t(()=>[e(w,{label:"\u72B6\u6001"},{default:t(()=>[e(v,{modelValue:m.status,"onUpdate:modelValue":l[1]||(l[1]=s=>m.status=s),onChange:u},{default:t(()=>[e(f,{label:"\u5168\u90E8",value:""}),e(f,{label:"\u6B63\u5E38",value:"1"}),e(f,{label:"\u7981\u7528",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(w,null,{label:t(()=>[e(v,{modelValue:m.search_key,"onUpdate:modelValue":l[2]||(l[2]=s=>m.search_key=s)},{default:t(()=>[e(f,{label:"\u89D2\u8272\u540D\u79F0",value:"name"})]),_:1},8,["modelValue"])]),default:t(()=>[e(r,null,{default:t(()=>[e($,{span:18},{default:t(()=>[e(y,{modelValue:m.search_val,"onUpdate:modelValue":l[3]||(l[3]=s=>m.search_val=s),onKeyup:G(u,["enter"]),onClear:l[4]||(l[4]=s=>u()),placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e($,{span:5,offset:1},{default:t(()=>[e(a,{type:"primary",onClick:u},{default:t(()=>[V("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),S((b(),x(P,{data:i.list,stripe:"",border:""},{default:t(()=>[e(h,{label:"id",prop:"id",width:"80"}),e(h,{label:"\u89D2\u8272\u540D\u79F0",prop:"name","min-width":"100","show-overflow-tooltip":""}),e(h,{label:"\u5907\u6CE8",prop:"remark","min-width":"120","show-overflow-tooltip":""}),e(h,{label:"\u6392\u5E8F",prop:"sort",width:"50","show-overflow-tooltip":""}),e(h,{label:"\u72B6\u6001",width:"50"},{default:t(s=>[s.row.status?(b(),K("span",Z,"\u6B63\u5E38")):(b(),K("span",ee,"\u7981\u7528"))]),_:1}),e(h,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:t(s=>[z("span",null,F(D(M)(s.row.create_time)),1)]),_:1}),e(h,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:t(s=>[z("span",null,F(D(M)(s.row.modify_time)),1)]),_:1}),e(h,{label:"\u64CD\u4F5C",width:"210",fixed:"right"},{default:t(s=>[e(a,{type:"success",onClick:j=>g(s.row)},{default:t(()=>[V("\u6743\u9650\u914D\u7F6E")]),_:2},1032,["onClick"]),e(a,{type:"primary",onClick:j=>_(s.row)},{default:t(()=>[V("\u7F16\u8F91")]),_:2},1032,["onClick"]),e(a,{type:"danger",onClick:j=>d(s.row)},{default:t(()=>[V("\u5220\u9664")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[q,i.loading]]),e(H,{onSuccess:u,modelValue:c.value,"onUpdate:modelValue":l[5]||(l[5]=s=>c.value=s)},null,8,["modelValue"]),e(J,{onSuccess:u,modelValue:o.value,"onUpdate:modelValue":l[6]||(l[6]=s=>o.value=s),data:i.row},null,8,["modelValue","data"]),e(Q,{modelValue:k.value,"onUpdate:modelValue":l[7]||(l[7]=s=>k.value=s),data:i.row},null,8,["modelValue","data"])]),_:1})}}};export{oe as default};
