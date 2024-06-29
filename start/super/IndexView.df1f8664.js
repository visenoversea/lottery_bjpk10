import{b as T,M as F,r as D,c as s,d as I,o as u,k as U,h as l,g as e,m as v,w as R,i as L,O as K,n as S,E as j,f as y,N as M,G as x,e as _,j as G,Q}from"./index.088b396a.js";import{f as N}from"./index.969b688d.js";const H={__name:"AddView",props:{modelValue:{type:Boolean,default:!1}},emits:["update:modelValue","success"],setup(B,{emit:i}){const o=B,d=T(),p=T(!1),r=F({get:()=>o.modelValue,set:t=>{i("update:modelValue",t)}}),w=D({user_id:"",risk:""}),$=async()=>{d.value.resetFields()},c=async()=>{if(p.value)return;p.value=!0;const{success:t,data:n}=await S.addUserTimeRisk(w);p.value=!1,t&&(i("success"),j.success(n.msg),r.value=!1)};return(t,n)=>{const m=s("el-input"),b=s("el-form-item"),V=s("el-form"),h=s("el-button"),C=s("el-dialog"),z=I("loading");return u(),U(C,{modelValue:L(r),"onUpdate:modelValue":n[3]||(n[3]=g=>K(r)?r.value=g:null),title:"\u65B0\u589E\u98CE\u63A7",onClose:$,draggable:"","close-on-click-modal":!1,width:"520px"},{footer:l(()=>[e(h,{size:"default",onClick:n[2]||(n[2]=g=>r.value=!1)},{default:l(()=>[v("\u53D6 \u6D88")]),_:1}),e(h,{size:"default",type:"primary",onClick:c},{default:l(()=>[v("\u786E \u8BA4")]),_:1})]),default:l(()=>[R((u(),U(V,{size:"default",ref_key:"refForm",ref:d,model:w,"label-width":"90px"},{default:l(()=>[e(b,{label:"\u7528\u6237ID",prop:"user_id"},{default:l(()=>[e(m,{modelValue:w.user_id,"onUpdate:modelValue":n[0]||(n[0]=g=>w.user_id=g),placeholder:"\u8BF7\u8F93\u5165\u7528\u6237ID",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(b,{label:"\u80DC\u7387",prop:"risk"},{default:l(()=>[e(m,{modelValue:w.risk,"onUpdate:modelValue":n[1]||(n[1]=g=>w.risk=g),placeholder:"\u8BF7\u8F93\u51650-100\u6570\u503C\uFF0C\u4F8B30\u5219\u4E3A30%\u8D62\u7684\u6982\u7387",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[z,p.value]])]),_:1},8,["modelValue"])}}},J={key:0,class:"g-green"},P={key:1,class:"g-blue"},W={key:2,class:"g-blue"},X={key:3,class:"g-red"},Y={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(B,{emit:i}){const o=B,d=T(!1),p=F({get:()=>o.modelValue,set:c=>{i("update:modelValue",c)}}),r=D({id:0,risk:"",status:1}),w=()=>{r.id=o.data.id,r.risk=o.data.risk,r.status=o.data.status},$=async()=>{if(d.value)return;d.value=!0;const{success:c,data:t}=await S.editUserTimeRisk(r);d.value=!1,c&&(i("success"),j.success(t.msg),p.value=!1)};return(c,t)=>{const n=s("el-form-item"),m=s("el-col"),b=s("el-row"),V=s("el-input"),h=s("el-radio"),C=s("el-radio-group"),z=s("el-form"),g=s("el-button"),f=s("el-dialog"),E=I("loading");return u(),U(f,{modelValue:L(p),"onUpdate:modelValue":t[3]||(t[3]=k=>K(p)?p.value=k:null),title:"\u7F16\u8F91",onOpen:w,draggable:"","close-on-click-modal":!1,width:"620px"},{footer:l(()=>[e(g,{size:"default",onClick:t[2]||(t[2]=k=>p.value=!1)},{default:l(()=>[v("\u53D6 \u6D88")]),_:1}),e(g,{size:"default",type:"primary",onClick:$},{default:l(()=>[v("\u786E \u8BA4")]),_:1})]),default:l(()=>[R((u(),U(z,{size:"default",model:r,"label-width":"90px"},{default:l(()=>[e(b,{gutter:24},{default:l(()=>[e(m,{span:12},{default:l(()=>[e(n,{label:"\u7528\u6237ID"},{default:l(()=>[y("div",{class:M({"g-bg-pink":o.data.user.virtual})},[y("span",null,x(o.data.user_id),1),o.data.user.type===1?(u(),_("span",J,"(\u4F1A\u5458)")):o.data.user.type===2?(u(),_("span",P,"(\u4EE3\u7406)")):o.data.user.type===0?(u(),_("span",W,"(\u865A\u62DF\u76D8)")):(u(),_("span",X,"(\u5F02\u5E38)"))],2)]),_:1})]),_:1}),e(m,{span:12},{default:l(()=>[e(n,{label:"\u7528\u6237\u540D"},{default:l(()=>[v(x(o.data.user.user_name),1)]),_:1})]),_:1})]),_:1}),e(n,{label:"\u80DC\u7387",prop:"risk"},{default:l(()=>[e(V,{modelValue:r.risk,"onUpdate:modelValue":t[0]||(t[0]=k=>r.risk=k),placeholder:"\u8BF7\u8F93\u51650-100\u6570\u503C\uFF0C\u4F8B30\u5219\u4E3A30%\u8D62\u7684\u6982\u7387",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(n,{label:"\u72B6\u6001",prop:"status"},{default:l(()=>[e(C,{modelValue:r.status,"onUpdate:modelValue":t[1]||(t[1]=k=>r.status=k)},{default:l(()=>[e(h,{label:0},{default:l(()=>[v("\u7981\u7528")]),_:1}),e(h,{label:1},{default:l(()=>[v("\u6B63\u5E38")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[E,d.value]])]),_:1},8,["modelValue"])}}},Z={class:"g-flex"},ee=y("span",null,"\u7528\u6237\u9650\u65F6\u8BA2\u5355\u98CE\u63A7",-1),le={class:"g-flex-justify-end g-flex-1"},te={key:0,class:"g-green"},ae={key:1,class:"g-blue"},oe={key:2,class:"g-grey"},se={key:3,class:"g-red"},ne={key:0,class:"g-red"},ue={key:1},de={key:0,class:"g-blue"},re={key:1},ie={key:0,class:"g-green"},_e={key:1,class:"g-red"},pe={key:2,class:"g-red"},fe={__name:"IndexView",setup(B){const i=D({loading:!1,total:0,list:[],row:{}}),o=D({userType:"",virtual:"",date_time:[],search_key:"user_name",search_val:"",page:1,limit:15}),d=async(c=!0)=>{c&&(o.page=1),i.loading=!0;const{success:t,data:n}=await S.getUserTimeRiskList(o);i.loading=!1,t&&(i.list=n.list,i.total=n.total)};d();const p=T(!1),r=T(!1),w=c=>{i.row=c,r.value=!0},$=c=>{Q.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{i.loading=!0;const{success:t,data:n}=await S.delUserTimeRisk({id:c.id});i.loading=!1,t&&(j.success(n.msg),await d(!1))})};return(c,t)=>{const n=s("el-button"),m=s("el-option"),b=s("el-select"),V=s("el-form-item"),h=s("el-input"),C=s("el-col"),z=s("el-row"),g=s("el-form"),f=s("el-table-column"),E=s("el-table"),k=s("el-pagination"),O=s("el-card"),q=I("loading");return u(),U(O,null,{header:l(()=>[y("div",Z,[ee,y("div",le,[e(n,{type:"success",onClick:t[0]||(t[0]=a=>p.value=!0)},{default:l(()=>[v("\u65B0\u589E")]),_:1})])])]),default:l(()=>[e(g,{inline:!0},{default:l(()=>[e(V,{label:"\u7528\u6237\u7C7B\u578B"},{default:l(()=>[e(b,{modelValue:o.userType,"onUpdate:modelValue":t[1]||(t[1]=a=>o.userType=a),onChange:d},{default:l(()=>[e(m,{label:"\u5168\u90E8",value:""}),e(m,{label:"\u4EE3\u7406",value:"2"}),e(m,{label:"\u4F1A\u5458",value:"1"})]),_:1},8,["modelValue"])]),_:1}),e(V,{label:"\u8D26\u53F7\u7C7B\u578B"},{default:l(()=>[e(b,{modelValue:o.virtual,"onUpdate:modelValue":t[2]||(t[2]=a=>o.virtual=a),onChange:d},{default:l(()=>[e(m,{label:"\u5168\u90E8",value:""}),e(m,{label:"\u865A\u62DF\u53F7",value:"1"}),e(m,{label:"\u6B63\u5E38",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(V,null,{label:l(()=>[e(b,{modelValue:o.search_key,"onUpdate:modelValue":t[3]||(t[3]=a=>o.search_key=a)},{default:l(()=>[e(m,{label:"\u7528\u6237\u540D",value:"user_name"}),e(m,{label:"\u7528\u6237ID",value:"user_id"})]),_:1},8,["modelValue"])]),default:l(()=>[e(z,null,{default:l(()=>[e(C,{span:18},{default:l(()=>[e(h,{modelValue:o.search_val,"onUpdate:modelValue":t[4]||(t[4]=a=>o.search_val=a),onKeyup:G(d,["enter"]),onClear:d,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(C,{span:5,offset:1},{default:l(()=>[e(n,{type:"primary",onClick:d},{default:l(()=>[v("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),R((u(),U(E,{data:i.list,stripe:"",border:""},{default:l(()=>[e(f,{fixed:"left",label:"\u7528\u6237",width:"120"},{default:l(a=>[y("div",{class:M({"g-bg-pink":a.row.user.virtual})},[y("span",null,x(a.row.user.id),1),a.row.user.type===1?(u(),_("span",te,"(\u4F1A\u5458)")):a.row.user.type===2?(u(),_("span",ae,"(\u4EE3\u7406)")):a.row.user.type===0?(u(),_("span",oe,"(\u865A\u62DF\u76D8)")):(u(),_("span",se,"(\u5F02\u5E38)"))],2)]),_:1}),e(f,{fixed:"left",prop:"user.user_name",label:"\u7528\u6237\u540D",width:"100"}),e(f,{label:"\u603B\u4EE3\u7406",width:"100"},{default:l(a=>[a.row.agentList.length>0?(u(),_("span",ne,x(a.row.agentList[0].user_name),1)):(u(),_("span",ue,"-"))]),_:1}),e(f,{label:"\u4E0A\u7EA7\u4EE3\u7406",width:"100"},{default:l(a=>[a.row.agentList.length>0?(u(),_("span",de,x(a.row.agentList[a.row.agentList.length-1].user_name),1)):(u(),_("span",re,"-"))]),_:1}),e(f,{prop:"risk",label:"\u80DC\u7387","min-width":"100","show-overflow-tooltip":!0}),e(f,{label:"\u72B6\u6001","min-width":"80"},{default:l(a=>[a.row.status===1?(u(),_("span",ie,"\u6B63\u5E38")):a.row.status===0?(u(),_("span",_e,"\u7981\u7528")):(u(),_("span",pe,"\u5F02\u5E38"))]),_:1}),e(f,{prop:"operator",label:"\u64CD\u4F5C\u4EBA",width:"80","show-overflow-tooltip":!0}),e(f,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:l(a=>[y("span",null,x(L(N)(a.row.create_time)),1)]),_:1}),e(f,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:l(a=>[y("span",null,x(L(N)(a.row.modify_time)),1)]),_:1}),e(f,{label:"\u64CD\u4F5C",width:"140",fixed:"right"},{default:l(a=>[e(n,{type:"primary",onClick:A=>w(a.row)},{default:l(()=>[v("\u7F16\u8F91")]),_:2},1032,["onClick"]),e(n,{type:"danger",onClick:A=>$(a.row)},{default:l(()=>[v("\u5220\u9664")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[q,i.loading]]),e(k,{"page-sizes":[15,30,60,100],total:i.total,"page-size":o.limit,"onUpdate:page-size":t[5]||(t[5]=a=>o.limit=a),"current-page":o.page,"onUpdate:current-page":t[6]||(t[6]=a=>o.page=a),onCurrentChange:t[7]||(t[7]=a=>d(!1)),onSizeChange:t[8]||(t[8]=a=>d(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),e(H,{onSuccess:d,modelValue:p.value,"onUpdate:modelValue":t[9]||(t[9]=a=>p.value=a)},null,8,["modelValue"]),e(Y,{onSuccess:t[10]||(t[10]=a=>d(!1)),modelValue:r.value,"onUpdate:modelValue":t[11]||(t[11]=a=>r.value=a),data:i.row},null,8,["modelValue","data"])]),_:1})}}};export{fe as default};
