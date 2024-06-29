import{b as L,M as P,r as S,c as u,d as O,o as d,k as b,h as l,g as e,m as k,w as q,Q as I,i as N,O as Q,n as D,E as K,f as h,N as H,G as z,e as g,u as Z,l as T,j as F,P as M}from"./index.0c71b455.js";import{f as G}from"./index.969b688d.js";const ee={__name:"AddView",props:{modelValue:{type:Boolean,default:!1}},emits:["update:modelValue","success"],setup(E,{emit:C}){const f=E,m=L(),s=L(!1),a=P({get:()=>f.modelValue,set:r=>{C("update:modelValue",r)}}),p=S({user_id:"",type:1,country:"",name:"",id_card:"",front_img:"",reverse_img:""}),$=async()=>{m.value.resetFields()},x=async()=>{if(s.value)return;s.value=!0;const{success:r,data:n}=await D.addUserReal(p);s.value=!1,r&&(C("success"),K.success(n.msg),a.value=!1)};return(r,n)=>{const v=u("el-input"),o=u("el-form-item"),i=u("el-option"),_=u("el-select"),U=u("el-form"),V=u("el-button"),R=u("el-dialog"),B=O("loading");return d(),b(R,{modelValue:N(a),"onUpdate:modelValue":n[8]||(n[8]=c=>Q(a)?a.value=c:null),top:"2vh",title:"\u65B0\u589E",onClose:$,draggable:"","close-on-click-modal":!1,width:"620px"},{footer:l(()=>[e(V,{size:"default",onClick:n[7]||(n[7]=c=>a.value=!1)},{default:l(()=>[k("\u53D6 \u6D88")]),_:1}),e(V,{size:"default",type:"primary",onClick:x},{default:l(()=>[k("\u786E \u8BA4")]),_:1})]),default:l(()=>[q((d(),b(U,{size:"default",ref_key:"refForm",ref:m,model:p,"label-width":"90px"},{default:l(()=>[e(o,{label:"\u7528\u6237ID",prop:"user_id"},{default:l(()=>[e(v,{modelValue:p.user_id,"onUpdate:modelValue":n[0]||(n[0]=c=>p.user_id=c),placeholder:"\u8BF7\u8F93\u5165\u7528\u6237ID",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(o,{label:"\u8BC1\u4EF6\u7C7B\u578B"},{default:l(()=>[e(_,{modelValue:p.type,"onUpdate:modelValue":n[1]||(n[1]=c=>p.type=c)},{default:l(()=>[e(i,{label:"\u8EAB\u4EFD\u8BC1",value:1}),e(i,{label:"\u62A4\u7167",value:2}),e(i,{label:"\u9A7E\u9A76\u8BC1",value:3})]),_:1},8,["modelValue"])]),_:1}),e(o,{label:"\u56FD\u5BB6",prop:"country"},{default:l(()=>[e(v,{modelValue:p.country,"onUpdate:modelValue":n[2]||(n[2]=c=>p.country=c),placeholder:"\u8BF7\u8F93\u5165\u56FD\u5BB6",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(o,{label:"\u59D3\u540D",prop:"name"},{default:l(()=>[e(v,{modelValue:p.name,"onUpdate:modelValue":n[3]||(n[3]=c=>p.name=c),placeholder:"\u8BF7\u8F93\u5165\u59D3\u540D",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(o,{label:"\u8BC1\u4EF6\u53F7\u7801",prop:"id_card"},{default:l(()=>[e(v,{modelValue:p.id_card,"onUpdate:modelValue":n[4]||(n[4]=c=>p.id_card=c),placeholder:"\u8BF7\u8F93\u5165\u8BC1\u4EF6\u53F7\u7801",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(o,{label:"\u8BC1\u4EF6\u6B63\u9762",prop:"front_img"},{default:l(()=>[e(I,{modelValue:p.front_img,"onUpdate:modelValue":n[5]||(n[5]=c=>p.front_img=c)},null,8,["modelValue"])]),_:1}),e(o,{label:"\u8BC1\u4EF6\u53CD\u9762",prop:"reverse_img"},{default:l(()=>[e(I,{modelValue:p.reverse_img,"onUpdate:modelValue":n[6]||(n[6]=c=>p.reverse_img=c)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[B,s.value]])]),_:1},8,["modelValue"])}}},le={key:0,class:"g-green"},te={key:1,class:"g-blue"},ae={key:2,class:"g-red"},oe={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(E,{emit:C}){const f=E,m=L(!1),s=P({get:()=>f.modelValue,set:x=>{C("update:modelValue",x)}}),a=S({id:0,type:1,country:"",name:"",id_card:"",front_img:"",reverse_img:"",reason:"",status:1}),p=()=>{a.id=f.data.id,a.name=f.data.name,a.country=f.data.country,a.id_card=f.data.id_card,a.front_img=f.data.front_img,a.reverse_img=f.data.reverse_img,a.reason=f.data.reason,a.status=f.data.status},$=async()=>{if(m.value)return;m.value=!0;const{success:x,data:r}=await D.editUserReal(a);m.value=!1,x&&(C("success"),K.success(r.msg),s.value=!1)};return(x,r)=>{const n=u("el-form-item"),v=u("el-col"),o=u("el-row"),i=u("el-input"),_=u("el-option"),U=u("el-select"),V=u("el-form"),R=u("el-button"),B=u("el-dialog"),c=O("loading");return d(),b(B,{modelValue:N(s),"onUpdate:modelValue":r[8]||(r[8]=y=>Q(s)?s.value=y:null),top:"2vh",title:"\u7F16\u8F91",onOpen:p,draggable:"","close-on-click-modal":!1,width:"620px"},{footer:l(()=>[e(R,{size:"default",onClick:r[7]||(r[7]=y=>s.value=!1)},{default:l(()=>[k("\u53D6 \u6D88")]),_:1}),e(R,{size:"default",type:"primary",onClick:$},{default:l(()=>[k("\u786E \u8BA4")]),_:1})]),default:l(()=>[q((d(),b(V,{size:"default",model:a,"label-width":"90px"},{default:l(()=>[e(o,{gutter:24},{default:l(()=>[e(v,{span:12},{default:l(()=>[e(n,{label:"\u7528\u6237ID"},{default:l(()=>[h("div",{class:H({"g-bg-pink":f.data.user.virtual})},[h("span",null,z(f.data.user_id),1),f.data.user.type===1?(d(),g("span",le,"(\u4F1A\u5458)")):f.data.user.type===2?(d(),g("span",te,"(\u4EE3\u7406)")):(d(),g("span",ae,"(\u5F02\u5E38)"))],2)]),_:1})]),_:1}),e(v,{span:12},{default:l(()=>[e(n,{label:"\u7528\u6237\u540D"},{default:l(()=>[k(z(f.data.user.user_name),1)]),_:1})]),_:1})]),_:1}),e(n,{label:"\u56FD\u5BB6",prop:"country"},{default:l(()=>[e(i,{modelValue:a.country,"onUpdate:modelValue":r[0]||(r[0]=y=>a.country=y),placeholder:"\u8BF7\u8F93\u5165\u56FD\u5BB6",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(n,{label:"\u59D3\u540D",prop:"name"},{default:l(()=>[e(i,{modelValue:a.name,"onUpdate:modelValue":r[1]||(r[1]=y=>a.name=y),placeholder:"\u8BF7\u8F93\u5165\u59D3\u540D",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(n,{label:"\u8BC1\u4EF6\u53F7\u7801",prop:"id_card"},{default:l(()=>[e(i,{modelValue:a.id_card,"onUpdate:modelValue":r[2]||(r[2]=y=>a.id_card=y),placeholder:"\u8BF7\u8F93\u5165\u8BC1\u4EF6\u53F7\u7801",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(n,{label:"\u8BC1\u4EF6\u6B63\u9762",prop:"front_img"},{default:l(()=>[e(I,{modelValue:a.front_img,"onUpdate:modelValue":r[3]||(r[3]=y=>a.front_img=y)},null,8,["modelValue"])]),_:1}),e(n,{label:"\u8BC1\u4EF6\u53CD\u9762",prop:"reverse_img"},{default:l(()=>[e(I,{modelValue:a.reverse_img,"onUpdate:modelValue":r[4]||(r[4]=y=>a.reverse_img=y)},null,8,["modelValue"])]),_:1}),e(n,{label:"\u5931\u8D25\u539F\u56E0",prop:"name"},{default:l(()=>[e(i,{modelValue:a.reason,"onUpdate:modelValue":r[5]||(r[5]=y=>a.reason=y),placeholder:"\u8BF7\u8F93\u5165\u5931\u8D25\u539F\u56E0",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(n,{label:"\u72B6\u6001"},{default:l(()=>[e(U,{modelValue:a.status,"onUpdate:modelValue":r[6]||(r[6]=y=>a.status=y)},{default:l(()=>[e(_,{label:"\u5BA1\u6838\u901A\u8FC7",value:1}),e(_,{label:"\u9A73\u56DE",value:0}),e(_,{label:"\u5BA1\u6838\u4E2D",value:2})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[c,m.value]])]),_:1},8,["modelValue"])}}},ne={class:"g-flex"},se=h("span",null,"\u7528\u6237\u5B9E\u540D",-1),de={class:"g-flex-justify-end g-flex-1"},ue={key:0,class:"g-green"},re={key:1,class:"g-yellow"},ie={key:2,class:"g-red"},me={key:3,class:"g-red"},pe={key:0,class:"g-green"},_e={key:1,class:"g-blue"},fe={key:2,class:"g-grey"},ce={key:3,class:"g-red"},ge={key:0,class:"g-red"},ye={key:1},ve={key:0,class:"g-blue"},we={key:1},Ve={key:0,class:"g-green"},be={key:1,class:"g-yellow"},ke={key:2,class:"g-red"},Ue={key:3,class:"g-red"},Ce={key:0,style:{"padding-bottom":"12px"}},Re={__name:"IndexView",setup(E){const C=Z(),f=S({addUserReal:C.auth("addUserReal"),editUserReal:C.auth("editUserReal"),delUserReal:C.auth("delUserReal")}),m=S({loading:!1,total:0,list:[],row:{}}),s=S({userType:"",virtual:"",status:"",id_card:"",name:"",search_key:"user_name",search_val:"",page:1,limit:15}),a=async(v=!0)=>{v&&(s.page=1),m.loading=!0;const{success:o,data:i}=await D.getUserRealList(s);m.loading=!1,o&&(m.list=i.list,m.total=i.total)};a();const p=L(!1),$=L(!1),x=v=>{m.row=v,$.value=!0},r=(v,o)=>{o===1?M.confirm("\u786E\u8BA4\u5B9E\u540D\u5BA1\u6838\u901A\u8FC7?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{m.loading=!0;const{success:i,data:_}=await D.reviewUserReal({id:v.id,status:1});m.loading=!1,i&&(K.success(_.msg),await a(!1))}):M.prompt("\u5BA1\u6838\u4E0D\u901A\u8FC7\u539F\u56E0(\u9009\u586B)","\u786E\u8BA4\u9A73\u56DE\u5BA1\u6838",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async({value:i})=>{m.loading=!0;const{success:_,data:U}=await D.reviewUserReal({id:v.id,reason:i,status:0});m.loading=!1,_&&(K.success(U.msg),await a(!1))})},n=v=>{M.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{m.loading=!0;const{success:o,data:i}=await D.delUserReal({id:v.id});m.loading=!1,o&&(K.success(i.msg),await a(!1))})};return(v,o)=>{const i=u("el-button"),_=u("el-option"),U=u("el-select"),V=u("el-form-item"),R=u("el-input"),B=u("el-col"),c=u("el-row"),y=u("el-form"),w=u("el-table-column"),A=u("el-image"),J=u("el-table"),W=u("el-pagination"),X=u("el-card"),Y=O("loading");return d(),b(X,null,{header:l(()=>[h("div",ne,[se,h("div",de,[f.addUserReal?(d(),b(i,{key:0,type:"success",onClick:o[0]||(o[0]=t=>p.value=!0)},{default:l(()=>[k("\u65B0\u589E")]),_:1})):T("",!0)])])]),default:l(()=>[e(y,{inline:!0},{default:l(()=>[e(V,{label:"\u7528\u6237\u7C7B\u578B"},{default:l(()=>[e(U,{modelValue:s.userType,"onUpdate:modelValue":o[1]||(o[1]=t=>s.userType=t),onChange:a},{default:l(()=>[e(_,{label:"\u5168\u90E8",value:""}),e(_,{label:"\u4EE3\u7406",value:"2"}),e(_,{label:"\u4F1A\u5458",value:"1"})]),_:1},8,["modelValue"])]),_:1}),e(V,{label:"\u8D26\u53F7\u7C7B\u578B"},{default:l(()=>[e(U,{modelValue:s.virtual,"onUpdate:modelValue":o[2]||(o[2]=t=>s.virtual=t),onChange:a},{default:l(()=>[e(_,{label:"\u5168\u90E8",value:""}),e(_,{label:"\u865A\u62DF\u53F7",value:"1"}),e(_,{label:"\u6B63\u5E38",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(V,{label:"\u72B6\u6001"},{default:l(()=>[e(U,{modelValue:s.status,"onUpdate:modelValue":o[3]||(o[3]=t=>s.status=t),onChange:a},{default:l(()=>[e(_,{label:"\u5168\u90E8",value:""}),e(_,{label:"\u5BA1\u6838\u901A\u8FC7",value:"1"}),e(_,{label:"\u5BA1\u6838\u4E2D",value:"2"}),e(_,{label:"\u5BA1\u6838\u4E0D\u901A\u8FC7",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(V,{label:"\u8BC1\u4EF6\u53F7\u7801"},{default:l(()=>[e(R,{modelValue:s.id_card,"onUpdate:modelValue":o[4]||(o[4]=t=>s.id_card=t),onKeyup:F(a,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u5361\u53F7",onClear:a,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(V,{label:"\u59D3\u540D"},{default:l(()=>[e(R,{modelValue:s.name,"onUpdate:modelValue":o[5]||(o[5]=t=>s.name=t),onKeyup:F(a,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u59D3\u540D",onClear:a,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(V,null,{label:l(()=>[e(U,{modelValue:s.search_key,"onUpdate:modelValue":o[6]||(o[6]=t=>s.search_key=t)},{default:l(()=>[e(_,{label:"\u7528\u6237\u540D",value:"user_name"}),e(_,{label:"\u7528\u6237ID",value:"user_id"})]),_:1},8,["modelValue"])]),default:l(()=>[e(c,null,{default:l(()=>[e(B,{span:18},{default:l(()=>[e(R,{modelValue:s.search_val,"onUpdate:modelValue":o[7]||(o[7]=t=>s.search_val=t),onKeyup:F(a,["enter"]),onClear:a,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(B,{span:5,offset:1},{default:l(()=>[e(i,{type:"primary",onClick:a},{default:l(()=>[k("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),q((d(),b(J,{data:m.list,stripe:"",border:""},{default:l(()=>[e(w,{fixed:"left",label:"\u72B6\u6001",width:"80"},{default:l(t=>[t.row.status===1?(d(),g("span",ue,"\u5BA1\u6838\u901A\u8FC7")):t.row.status===2?(d(),g("span",re,"\u5F85\u5BA1\u6838")):t.row.status===0?(d(),g("span",ie,"\u5BA1\u6838\u4E0D\u901A\u8FC7")):(d(),g("span",me,"\u5F02\u5E38"))]),_:1}),e(w,{fixed:"left",label:"\u7528\u6237",width:"120"},{default:l(t=>[h("div",{class:H({"g-bg-pink":t.row.user.virtual})},[h("span",null,z(t.row.user.id),1),t.row.user.type===1?(d(),g("span",pe,"(\u4F1A\u5458)")):t.row.user.type===2?(d(),g("span",_e,"(\u4EE3\u7406)")):t.row.user.type===0?(d(),g("span",fe,"(\u865A\u62DF\u76D8)")):(d(),g("span",ce,"(\u5F02\u5E38)"))],2)]),_:1}),e(w,{fixed:"left",prop:"user.user_name",label:"\u7528\u6237\u540D",width:"100"}),e(w,{label:"\u603B\u4EE3\u7406",width:"100"},{default:l(t=>[t.row.agentList.length>0?(d(),g("span",ge,z(t.row.agentList[0].user_name),1)):(d(),g("span",ye,"-"))]),_:1}),e(w,{label:"\u4E0A\u7EA7\u4EE3\u7406",width:"100"},{default:l(t=>[t.row.agentList.length>0?(d(),g("span",ve,z(t.row.agentList[t.row.agentList.length-1].user_name),1)):(d(),g("span",we,"-"))]),_:1}),e(w,{label:"\u8BC1\u4EF6\u7C7B\u578B",width:"80"},{default:l(t=>[t.row.type===1?(d(),g("span",Ve,"\u8EAB\u4EFD\u8BC1")):t.row.type===2?(d(),g("span",be,"\u62A4\u7167")):t.row.type===3?(d(),g("span",ke,"\u9A7E\u9A76\u8BC1")):(d(),g("span",Ue,"\u5F02\u5E38"))]),_:1}),e(w,{prop:"country",label:"\u56FD\u5BB6",width:"100"}),e(w,{prop:"id_card",label:"\u8BC1\u4EF6\u53F7\u7801","min-width":"100"}),e(w,{prop:"name",label:"\u59D3\u540D",width:"100"}),e(w,{label:"\u8BC1\u4EF6\u6B63\u9762",width:"150"},{default:l(t=>[t.row.front_img?(d(),b(A,{key:0,src:t.row.front_img,"preview-src-list":[t.row.front_img],fit:"contain","hide-on-click-modal":"","preview-teleported":""},null,8,["src","preview-src-list"])):T("",!0)]),_:1}),e(w,{label:"\u8BC1\u4EF6\u53CD\u9762",width:"150"},{default:l(t=>[t.row.reverse_img?(d(),b(A,{key:0,src:t.row.reverse_img,"preview-src-list":[t.row.reverse_img],fit:"contain","hide-on-click-modal":"","preview-teleported":""},null,8,["src","preview-src-list"])):T("",!0)]),_:1}),e(w,{prop:"reason",label:"\u5931\u8D25\u539F\u56E0",width:"100"}),e(w,{prop:"operator",label:"\u64CD\u4F5C\u4EBA",width:"80","show-overflow-tooltip":!0}),e(w,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:l(t=>[h("span",null,z(N(G)(t.row.create_time)),1)]),_:1}),e(w,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:l(t=>[h("span",null,z(N(G)(t.row.modify_time)),1)]),_:1}),f.editUserReal?(d(),b(w,{key:0,label:"\u64CD\u4F5C",width:"130",fixed:"right"},{default:l(t=>[t.row.status===2?(d(),g("div",Ce,[e(i,{type:"success",onClick:j=>r(t.row,1)},{default:l(()=>[k("\u901A\u8FC7")]),_:2},1032,["onClick"]),e(i,{type:"danger",onClick:j=>r(t.row,0)},{default:l(()=>[k("\u9A73\u56DE")]),_:2},1032,["onClick"])])):T("",!0),e(i,{type:"primary",onClick:j=>x(t.row)},{default:l(()=>[k("\u7F16\u8F91")]),_:2},1032,["onClick"]),f.delUserReal?(d(),b(i,{key:1,type:"danger",onClick:j=>n(t.row)},{default:l(()=>[k("\u5220\u9664")]),_:2},1032,["onClick"])):T("",!0)]),_:1})):T("",!0)]),_:1},8,["data"])),[[Y,m.loading]]),e(W,{"page-sizes":[15,30,60,100],total:m.total,"page-size":s.limit,"onUpdate:page-size":o[8]||(o[8]=t=>s.limit=t),"current-page":s.page,"onUpdate:current-page":o[9]||(o[9]=t=>s.page=t),onCurrentChange:o[10]||(o[10]=t=>a(!1)),onSizeChange:o[11]||(o[11]=t=>a(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),e(ee,{onSuccess:a,modelValue:p.value,"onUpdate:modelValue":o[12]||(o[12]=t=>p.value=t)},null,8,["modelValue"]),e(oe,{onSuccess:o[13]||(o[13]=t=>a(!1)),modelValue:$.value,"onUpdate:modelValue":o[14]||(o[14]=t=>$.value=t),data:m.row},null,8,["modelValue","data"])]),_:1})}}};export{Re as default};
