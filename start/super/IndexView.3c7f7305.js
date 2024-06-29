import{b as S,M as E,r as j,c as n,d as N,o as g,k as b,h as l,g as e,m as V,w as O,e as F,F as P,D as Q,i as z,O as M,n as D,E as G,G as T,f as A,l as I,u as ee,j as le,P as K}from"./index.c4d14654.js";import{f as h}from"./index.969b688d.js";import{u as te,v as oe}from"./index.169eb8b5.js";import"./_plugin-vue_export-helper.90cad5bc.js";const ae={__name:"AddView",props:{modelValue:{type:Boolean,default:!1},roleList:{type:Array,default(){return[]}}},emits:["update:modelValue","success"],setup(L,{emit:C}){const i=L,d=S(),u=S(!1),o=E({get:()=>i.modelValue,set:r=>{C("update:modelValue",r)}}),_=j({user_name:"",nick_name:"",password:"",role_id:10,remark:""}),U=async()=>{d.value.resetFields()},w=async()=>{if(u.value)return;u.value=!0;const{success:r,data:s}=await D.addAdmin(_);u.value=!1,r&&(C("success"),G.success(s.msg),o.value=!1)};return(r,s)=>{const v=n("el-input"),y=n("el-form-item"),$=n("el-option"),p=n("el-select"),t=n("el-form"),c=n("el-button"),k=n("el-dialog"),B=N("loading");return g(),b(k,{modelValue:z(o),"onUpdate:modelValue":s[6]||(s[6]=m=>M(o)?o.value=m:null),top:"2vh",title:"\u65B0\u589E",onClose:U,draggable:"","close-on-click-modal":!1,width:"580px"},{footer:l(()=>[e(c,{size:"default",onClick:s[5]||(s[5]=m=>o.value=!1)},{default:l(()=>[V("\u53D6 \u6D88")]),_:1}),e(c,{size:"default",type:"primary",onClick:w},{default:l(()=>[V("\u786E \u8BA4")]),_:1})]),default:l(()=>[O((g(),b(t,{size:"default",ref_key:"refForm",ref:d,model:_,"label-width":"90px"},{default:l(()=>[e(y,{label:"\u7528\u6237\u540D",prop:"user_name"},{default:l(()=>[e(v,{modelValue:_.user_name,"onUpdate:modelValue":s[0]||(s[0]=m=>_.user_name=m)},null,8,["modelValue"])]),_:1}),e(y,{label:"\u5BC6\u7801",prop:"password"},{default:l(()=>[e(v,{type:"password",modelValue:_.password,"onUpdate:modelValue":s[1]||(s[1]=m=>_.password=m)},null,8,["modelValue"])]),_:1}),e(y,{label:"\u6635\u79F0",prop:"nick_name"},{default:l(()=>[e(v,{modelValue:_.nick_name,"onUpdate:modelValue":s[2]||(s[2]=m=>_.nick_name=m)},null,8,["modelValue"])]),_:1}),e(y,{label:"\u5907\u6CE8",prop:"remark"},{default:l(()=>[e(v,{modelValue:_.remark,"onUpdate:modelValue":s[3]||(s[3]=m=>_.remark=m)},null,8,["modelValue"])]),_:1}),e(y,{label:"\u89D2\u8272",prop:"role_id"},{default:l(()=>[e(p,{modelValue:_.role_id,"onUpdate:modelValue":s[4]||(s[4]=m=>_.role_id=m)},{default:l(()=>[(g(!0),F(P,null,Q(i.roleList,m=>(g(),b($,{key:m.id,label:m.name,value:m.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[B,u.value]])]),_:1},8,["modelValue"])}}},ne={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object},roleList:{type:Array,default(){return[]}}},emits:["update:modelValue","success"],setup(L,{emit:C}){const i=L,d=S(!1),u=E({get:()=>i.modelValue,set:w=>{C("update:modelValue",w)}}),o=j({id:0,user_name:"",nick_name:"",password:"",role_id:10,remark:"",status:1}),_=()=>{o.id=i.data.id,o.user_name=i.data.user_name,o.nick_name=i.data.nick_name,o.password=i.data.password,o.role_id=i.data.role_id,o.remark=i.data.remark,o.status=i.data.status},U=async()=>{if(d.value)return;d.value=!0;const{success:w,data:r}=await D.editAdmin(o);d.value=!1,w&&(C("success"),G.success(r.msg),u.value=!1)};return(w,r)=>{const s=n("el-form-item"),v=n("el-input"),y=n("el-option"),$=n("el-select"),p=n("el-radio"),t=n("el-radio-group"),c=n("el-form"),k=n("el-button"),B=n("el-dialog"),m=N("loading");return g(),b(B,{modelValue:z(u),"onUpdate:modelValue":r[6]||(r[6]=f=>M(u)?u.value=f:null),title:"\u7F16\u8F91",onOpen:_,draggable:"","close-on-click-modal":!1,width:"680px"},{footer:l(()=>[e(k,{size:"default",onClick:r[5]||(r[5]=f=>u.value=!1)},{default:l(()=>[V("\u53D6 \u6D88")]),_:1}),e(k,{size:"default",type:"primary",onClick:U},{default:l(()=>[V("\u786E \u8BA4")]),_:1})]),default:l(()=>[O((g(),b(c,{size:"default",model:o,"label-width":"90px"},{default:l(()=>[e(s,{label:"\u7528\u6237\u540D",prop:"user_name"},{default:l(()=>[V(T(o.user_name),1)]),_:1}),e(s,{label:"\u5BC6\u7801",prop:"password"},{default:l(()=>[e(v,{type:"password",modelValue:o.password,"onUpdate:modelValue":r[0]||(r[0]=f=>o.password=f),placeholder:"\u4E3A\u7A7A\u5219\u4E0D\u4FEE\u6539"},null,8,["modelValue"])]),_:1}),e(s,{label:"\u6635\u79F0",prop:"nick_name"},{default:l(()=>[e(v,{modelValue:o.nick_name,"onUpdate:modelValue":r[1]||(r[1]=f=>o.nick_name=f)},null,8,["modelValue"])]),_:1}),e(s,{label:"\u5907\u6CE8",prop:"remark"},{default:l(()=>[e(v,{modelValue:o.remark,"onUpdate:modelValue":r[2]||(r[2]=f=>o.remark=f)},null,8,["modelValue"])]),_:1}),e(s,{label:"\u89D2\u8272",prop:"role_id"},{default:l(()=>[e($,{modelValue:o.role_id,"onUpdate:modelValue":r[3]||(r[3]=f=>o.role_id=f)},{default:l(()=>[(g(!0),F(P,null,Q(i.roleList,f=>(g(),b(y,{key:f.id,label:f.name,value:f.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(s,{label:"\u72B6\u6001",prop:"status"},{default:l(()=>[e(t,{modelValue:o.status,"onUpdate:modelValue":r[4]||(r[4]=f=>o.status=f)},{default:l(()=>[e(p,{label:1},{default:l(()=>[V("\u6B63\u5E38")]),_:1}),e(p,{label:0},{default:l(()=>[V("\u7981\u7528")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[m,d.value]])]),_:1},8,["modelValue"])}}},se={style:{"padding-right":"10px"}},de={__name:"SecretView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue"],setup(L,{emit:C}){const i=L,{toClipboard:d}=te(),u=S(!1),o=E({get:()=>i.modelValue,set:w=>{C("update:modelValue",w)}}),_=E(()=>i.data.secret?"otpauth://totp/G"+i.data.id+"?secret="+i.data.secret:""),U=async()=>{try{await d(i.data.secret),G.success("\u590D\u5236\u6210\u529F")}catch(w){console.error(w),G.error("\u590D\u5236\u5931\u8D25")}};return(w,r)=>{const s=n("el-button"),v=n("el-form-item"),y=n("el-form"),$=n("el-dialog"),p=N("loading");return g(),b($,{modelValue:z(o),"onUpdate:modelValue":r[0]||(r[0]=t=>M(o)?o.value=t:null),title:"\u8C37\u6B4C\u4EE4\u724C",draggable:"","close-on-click-modal":!1,width:"680px"},{default:l(()=>[O((g(),b(y,{size:"default","label-width":"120px"},{default:l(()=>[e(v,{label:"\u5BC6\u94A5\uFF1A"},{default:l(()=>[A("span",se,T(i.data.secret),1),e(s,{onClick:U,type:"primary"},{default:l(()=>[V("\u590D\u5236")]),_:1})]),_:1}),e(v,{label:"\u4E8C\u7EF4\u7801\uFF1A"},{default:l(()=>[z(_)?(g(),b(oe,{key:0,text:z(_),margin:10,size:220},null,8,["text"])):I("",!0)]),_:1})]),_:1})),[[p,u.value]])]),_:1},8,["modelValue"])}}},re={class:"g-flex"},ue=A("span",null,"\u7BA1\u7406\u5458\u5217\u8868",-1),ie={class:"g-flex-justify-end g-flex-1"},me={key:0,class:"g-green"},pe={key:1,class:"g-red"},we={__name:"IndexView",setup(L){const C=ee(),i=j({GoogleSecret:C.auth("GoogleSecret")}),d=j({loading:!1,total:0,list:[],row:{},roleList:[]}),u=j({status:"",search_key:"user_name",search_val:"",page:1,limit:15}),o=async(p=!0)=>{p&&(u.page=1),d.loading=!0;const{success:t,data:c}=await D.getAdminList(u);d.loading=!1,t&&(d.list=c.list,d.total=c.total)};o(),(async()=>{const{success:p,data:t}=await D.getRoleList({type:1});!p||(d.roleList=t.list)})();const U=S(!1),w=S(!1),r=p=>{d.row=p,w.value=!0},s=S(!1),v=p=>{d.row=p,s.value=!0},y=p=>{K.confirm("\u786E\u8BA4\u91CD\u7F6E\u8C37\u6B4C\u5BC6\u94A5?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{d.loading=!0;const{success:t,data:c}=await D.resetSecret({id:p.id});d.loading=!1,t&&(G.success(c.msg),await o(!1))})},$=p=>{K.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{d.loading=!0;const{success:t,data:c}=await D.delAdmin({id:p.id});d.loading=!1,t&&(G.success(c.msg),await o(!1))})};return(p,t)=>{const c=n("el-button"),k=n("el-option"),B=n("el-select"),m=n("el-form-item"),f=n("el-input"),q=n("el-col"),H=n("el-row"),J=n("el-form"),x=n("el-table-column"),W=n("el-table"),X=n("el-pagination"),Y=n("el-card"),Z=N("loading");return g(),b(Y,null,{header:l(()=>[A("div",re,[ue,A("div",ie,[e(c,{type:"success",onClick:t[0]||(t[0]=a=>U.value=!0)},{default:l(()=>[V("\u65B0\u589E")]),_:1})])])]),default:l(()=>[e(J,{inline:!0},{default:l(()=>[e(m,{label:"\u72B6\u6001"},{default:l(()=>[e(B,{modelValue:u.status,"onUpdate:modelValue":t[1]||(t[1]=a=>u.status=a),onChange:t[2]||(t[2]=a=>o())},{default:l(()=>[e(k,{label:"\u5168\u90E8",value:""}),e(k,{label:"\u6B63\u5E38",value:"1"}),e(k,{label:"\u7981\u7528",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(m,null,{label:l(()=>[e(B,{modelValue:u.search_key,"onUpdate:modelValue":t[3]||(t[3]=a=>u.search_key=a)},{default:l(()=>[e(k,{label:"\u7528\u6237\u540D",value:"user_name"}),e(k,{label:"\u7528\u6237ID",value:"user_id"})]),_:1},8,["modelValue"])]),default:l(()=>[e(H,null,{default:l(()=>[e(q,{span:18},{default:l(()=>[e(f,{modelValue:u.search_val,"onUpdate:modelValue":t[4]||(t[4]=a=>u.search_val=a),onKeyup:t[5]||(t[5]=le(a=>o(),["enter"])),onClear:t[6]||(t[6]=a=>o()),placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue"])]),_:1}),e(q,{span:5,offset:1},{default:l(()=>[e(c,{type:"primary",onClick:t[7]||(t[7]=a=>o())},{default:l(()=>[V("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),O((g(),b(W,{data:d.list,stripe:"",border:""},{default:l(()=>[e(x,{label:"\u7528\u6237ID",prop:"id",width:"80"}),e(x,{prop:"role.name",label:"\u89D2\u8272",width:"100","show-overflow-tooltip":!0}),e(x,{label:"\u7528\u6237\u540D",prop:"user_name","min-width":"100","show-overflow-tooltip":""}),i.GoogleSecret?(g(),b(x,{key:0,label:"\u8C37\u6B4C\u4EE4\u724C",width:"120","show-overflow-tooltip":!0},{default:l(a=>[e(c,{type:"success",onClick:R=>v(a.row)},{default:l(()=>[V("\u663E\u793A\u5BC6\u94A5")]),_:2},1032,["onClick"])]),_:1})):I("",!0),e(x,{label:"\u6635\u79F0",prop:"nick_name","min-width":"120","show-overflow-tooltip":""}),e(x,{label:"\u5907\u6CE8",prop:"remark","min-width":"120","show-overflow-tooltip":""}),e(x,{label:"\u72B6\u6001",width:"50"},{default:l(a=>[a.row.status?(g(),F("span",me,"\u6B63\u5E38")):(g(),F("span",pe,"\u7981\u7528"))]),_:1}),e(x,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:l(a=>[A("span",null,T(z(h)(a.row.create_time)),1)]),_:1}),e(x,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:l(a=>[A("span",null,T(z(h)(a.row.modify_time)),1)]),_:1}),e(x,{label:"\u64CD\u4F5C",width:"220",fixed:"right"},{default:l(a=>[i.GoogleSecret?(g(),b(c,{key:0,type:"success",onClick:R=>y(a.row)},{default:l(()=>[V("\u5BC6\u94A5\u91CD\u7F6E")]),_:2},1032,["onClick"])):I("",!0),e(c,{type:"primary",onClick:R=>r(a.row)},{default:l(()=>[V("\u7F16\u8F91")]),_:2},1032,["onClick"]),e(c,{type:"danger",onClick:R=>$(a.row)},{default:l(()=>[V("\u5220\u9664")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[Z,d.loading]]),e(X,{"page-sizes":[15,30,60,100],total:d.total,"page-size":u.limit,"onUpdate:page-size":t[8]||(t[8]=a=>u.limit=a),"current-page":u.page,"onUpdate:current-page":t[9]||(t[9]=a=>u.page=a),onCurrentChange:t[10]||(t[10]=a=>o(!1)),onSizeChange:t[11]||(t[11]=a=>o(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),e(ae,{onSuccess:o,"role-list":d.roleList,modelValue:U.value,"onUpdate:modelValue":t[12]||(t[12]=a=>U.value=a)},null,8,["role-list","modelValue"]),e(ne,{onSuccess:t[13]||(t[13]=a=>o(!1)),"role-list":d.roleList,modelValue:w.value,"onUpdate:modelValue":t[14]||(t[14]=a=>w.value=a),data:d.row},null,8,["role-list","modelValue","data"]),e(de,{modelValue:s.value,"onUpdate:modelValue":t[15]||(t[15]=a=>s.value=a),data:d.row},null,8,["modelValue","data"])]),_:1})}}};export{we as default};
