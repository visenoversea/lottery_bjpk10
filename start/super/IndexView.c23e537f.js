import{b as N,M,r as j,c as d,d as O,o as m,k as C,h as l,g as e,m as p,w as T,G as B,i as D,O as R,n as S,E as I,x as J,f as z,e as k,F as Q,D as W,j as h}from"./index.59065f7f.js";import{_ as X}from"./UploadButton.1fd50fbc.js";import{f as F}from"./index.969b688d.js";const Y={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(K,{emit:x}){const u=K,b=N(!1),n=M({get:()=>u.modelValue,set:_=>{x("update:modelValue",_)}}),a=j({id:0,type:0,content:"",status:1}),E=()=>{a.id=u.data.id,a.type=u.data.type,a.content=u.data.content,a.status=u.data.status},L=async()=>{if(b.value)return;b.value=!0;const{success:_,data:s}=await S.editLangConfigList(a);b.value=!1,_&&(x("success"),I.success(s.msg),n.value=!1)};return(_,s)=>{const f=d("el-form-item"),g=d("el-radio"),U=d("el-radio-group"),r=d("el-input"),t=d("el-option"),c=d("el-select"),v=d("el-form"),y=d("el-button"),V=d("el-dialog"),$=O("loading");return m(),C(V,{modelValue:D(n),"onUpdate:modelValue":s[4]||(s[4]=i=>R(n)?n.value=i:null),top:"2vh",title:"\u7F16\u8F91",onOpen:E,draggable:"","close-on-click-modal":!1,width:"680px"},{footer:l(()=>[e(y,{size:"default",onClick:s[3]||(s[3]=i=>n.value=!1)},{default:l(()=>[p("\u53D6 \u6D88")]),_:1}),e(y,{size:"default",type:"primary",onClick:L},{default:l(()=>[p("\u786E \u8BA4")]),_:1})]),default:l(()=>[T((m(),C(v,{size:"default",model:a,"label-width":"90px"},{default:l(()=>[e(f,{label:"id"},{default:l(()=>[p(B(u.data.id),1)]),_:1}),e(f,{label:"\u8BED\u8A00"},{default:l(()=>[p(B(u.data.lang),1)]),_:1}),e(f,{label:"\u952E\u503C"},{default:l(()=>[p(B(u.data.k),1)]),_:1}),e(f,{label:"\u5185\u5BB9\u7C7B\u578B"},{default:l(()=>[e(U,{modelValue:a.type,"onUpdate:modelValue":s[0]||(s[0]=i=>a.type=i)},{default:l(()=>[e(g,{class:"g-green",label:0},{default:l(()=>[p("String")]),_:1}),e(g,{class:"g-red",label:1},{default:l(()=>[p("Number")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(f,{label:"\u5185\u5BB9"},{default:l(()=>[e(r,{type:"textarea",modelValue:a.content,"onUpdate:modelValue":s[1]||(s[1]=i=>a.content=i),placeholder:"\u5185\u5BB9"},null,8,["modelValue"])]),_:1}),e(f,{label:"\u72B6\u6001"},{default:l(()=>[e(c,{modelValue:a.status,"onUpdate:modelValue":s[2]||(s[2]=i=>a.status=i)},{default:l(()=>[e(t,{label:"\u5F85\u7FFB\u8BD1",value:0}),e(t,{label:"\u5DF2\u7FFB\u8BD1",value:1}),e(t,{label:"\u4E0D\u7FFB\u8BD1",value:2})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[$,b.value]])]),_:1},8,["modelValue"])}}},Z={__name:"AddView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(K,{emit:x}){const u=K,b=N(!1),n=M({get:()=>u.modelValue,set:_=>{x("update:modelValue",_)}}),a=j({langConfigId:0,k:"",type:0,content:"",status:0}),E=()=>{a.langConfigId=u.data.langConfigId,a.type=0,a.k="",a.content="",a.status=0},L=async()=>{if(b.value)return;b.value=!0;const{success:_,data:s}=await S.addLangConfigList(a);b.value=!1,_&&(I.success(s.msg),n.value=!1)};return(_,s)=>{const f=d("el-input"),g=d("el-form-item"),U=d("el-radio"),r=d("el-radio-group"),t=d("el-option"),c=d("el-select"),v=d("el-form"),y=d("el-button"),V=d("el-dialog"),$=O("loading");return m(),C(V,{modelValue:D(n),"onUpdate:modelValue":s[5]||(s[5]=i=>R(n)?n.value=i:null),top:"2vh",title:"\u65B0\u589E",onOpen:E,draggable:"","close-on-click-modal":!1,width:"680px"},{footer:l(()=>[e(y,{size:"default",onClick:s[4]||(s[4]=i=>n.value=!1)},{default:l(()=>[p("\u53D6 \u6D88")]),_:1}),e(y,{size:"default",type:"primary",onClick:L},{default:l(()=>[p("\u786E \u8BA4")]),_:1})]),default:l(()=>[T((m(),C(v,{size:"default",model:a,"label-width":"90px"},{default:l(()=>[e(g,{label:"\u952E\u503C"},{default:l(()=>[e(f,{type:"text",modelValue:a.k,"onUpdate:modelValue":s[0]||(s[0]=i=>a.k=i),placeholder:"\u952E\u503C"},null,8,["modelValue"])]),_:1}),e(g,{label:"\u5185\u5BB9\u7C7B\u578B"},{default:l(()=>[e(r,{modelValue:a.type,"onUpdate:modelValue":s[1]||(s[1]=i=>a.type=i)},{default:l(()=>[e(U,{class:"g-green",label:0},{default:l(()=>[p("String")]),_:1}),e(U,{class:"g-red",label:1},{default:l(()=>[p("Number")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(g,{label:"\u5185\u5BB9"},{default:l(()=>[e(f,{type:"textarea",modelValue:a.content,"onUpdate:modelValue":s[2]||(s[2]=i=>a.content=i),placeholder:"\u5185\u5BB9"},null,8,["modelValue"])]),_:1}),e(g,{label:"\u72B6\u6001"},{default:l(()=>[e(c,{modelValue:a.status,"onUpdate:modelValue":s[3]||(s[3]=i=>a.status=i)},{default:l(()=>[e(t,{label:"\u5F85\u7FFB\u8BD1",value:0}),e(t,{label:"\u5DF2\u7FFB\u8BD1",value:1}),e(t,{label:"\u4E0D\u7FFB\u8BD1",value:2})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[$,b.value]])]),_:1},8,["modelValue"])}}},ee={class:"g-flex"},le=z("span",null,"\u8BED\u8A00\u7FFB\u8BD1\u5217\u8868",-1),te={class:"g-flex-justify-end g-flex-1"},ae={key:0,class:"g-red"},oe={key:1,class:"g-green"},ne=["onClick"],se={key:0,class:"g-red"},de={key:1,class:"g-green"},ue={key:2,class:"g-purple"},ie={key:3,class:"g-red"},_e={__name:"IndexView",setup(K){const x=J(),u=j({loading:!1,total:0,list:[],langList:[]});(async()=>{u.loading=!0;const{success:r,data:t}=await S.getLangList();u.loading=!1,r&&(u.langList=t.list)})();const n=j({lang_config_id:x.params.id,lang:"",status:"",k:"",content:"",page:1,limit:15}),a=async(r=!0)=>{r&&(n.page=1),u.loading=!0;const{success:t,data:c}=await S.getLangConfigList(n);u.loading=!1,t&&(u.list=c.list,u.total=c.total)},E=async()=>{if(n.lang==""){I.error("\u8BF7\u9009\u62E9\u8981\u5BFC\u51FA\u7684\u8BED\u8A00");return}const{success:r,data:t}=await S.exportTranslate({lang_config_id:n.lang_config_id,lang:n.lang});!r||(I.success(t.msg),window.open(t.filePath))},L=async()=>{const{success:r,data:t}=await S.translateLangConfigList(n);!r||(I.success(t.msg),t.code==2&&setTimeout(()=>{L()},1e4),await a())},_=N(!1),s=r=>{u.row=r,_.value=!0},f=r=>{n.k=r,a()};a();const g=N(!1),U=()=>{g.value=!0};return(r,t)=>{const c=d("el-button"),v=d("el-option"),y=d("el-select"),V=d("el-form-item"),$=d("el-input"),i=d("el-form"),w=d("el-table-column"),q=d("el-table"),A=d("el-pagination"),G=d("el-card"),P=O("loading");return m(),C(G,null,{header:l(()=>[z("div",ee,[le,z("div",te,[e(X,{label:"\u5BFC\u5165Excel","api-url":"importTranslate",data:{langConfigId:n.lang_config_id}},null,8,["data"]),e(c,{type:"primary",onClick:E},{default:l(()=>[p("\u5BFC\u51FAExcel")]),_:1}),e(c,{type:"success",onClick:t[0]||(t[0]=o=>L())},{default:l(()=>[p("\u5F00\u59CB\u7FFB\u8BD1")]),_:1}),e(c,{type:"success",onClick:t[1]||(t[1]=o=>U())},{default:l(()=>[p("\u65B0\u589E")]),_:1})])])]),default:l(()=>[e(i,{inline:!0},{default:l(()=>[e(V,{label:"\u72B6\u6001"},{default:l(()=>[e(y,{modelValue:n.status,"onUpdate:modelValue":t[2]||(t[2]=o=>n.status=o),onChange:a},{default:l(()=>[e(v,{label:"\u5168\u90E8",value:""}),e(v,{label:"\u5DF2\u7FFB\u8BD1",value:"1"}),e(v,{label:"\u4E0D\u7FFB\u8BD1",value:"2"}),e(v,{label:"\u5F85\u7FFB\u8BD1",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(V,{label:"\u8BED\u8A00"},{default:l(()=>[e(y,{modelValue:n.lang,"onUpdate:modelValue":t[3]||(t[3]=o=>n.lang=o),onChange:a},{default:l(()=>[e(v,{label:"\u5168\u90E8",value:""}),(m(!0),k(Q,null,W(u.langList,o=>(m(),C(v,{key:o.id,label:o.name,value:o.code},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(V,{label:"\u952E\u503C"},{default:l(()=>[e($,{modelValue:n.k,"onUpdate:modelValue":t[4]||(t[4]=o=>n.k=o),onKeyup:h(a,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u952E\u503C",onClear:a,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(V,{label:"\u5185\u5BB9"},{default:l(()=>[e($,{modelValue:n.content,"onUpdate:modelValue":t[5]||(t[5]=o=>n.content=o),onKeyup:h(a,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u5185\u5BB9",onClear:a,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(V,null,{default:l(()=>[e(c,{type:"primary",onClick:a},{default:l(()=>[p("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1}),T((m(),C(q,{data:u.list,stripe:"",border:""},{default:l(()=>[e(w,{prop:"id",label:"id",width:"100","show-overflow-tooltip":!0}),e(w,{prop:"lang",label:"\u7FFB\u8BD1\u8BED\u8A00",width:"80","show-overflow-tooltip":!0}),e(w,{label:"\u5185\u5BB9\u7C7B\u578B",width:"80","show-overflow-tooltip":!0},{default:l(o=>[o.row.type==1?(m(),k("span",ae,"Number")):(m(),k("span",oe,"String"))]),_:1}),e(w,{label:"\u952E\u503C","min-width":"120","show-overflow-tooltip":!0},{default:l(o=>[z("span",{onClick:H=>f(o.row.k),class:"g-purple g-pointer"},B(o.row.k),9,ne)]),_:1}),e(w,{prop:"content",label:"\u5185\u5BB9","min-width":"120","show-overflow-tooltip":!0}),e(w,{label:"\u72B6\u6001",width:"80","show-overflow-tooltip":!0},{default:l(o=>[o.row.status==0?(m(),k("span",se,"\u5F85\u7FFB\u8BD1")):o.row.status==1?(m(),k("span",de,"\u5DF2\u7FFB\u8BD1")):o.row.status==2?(m(),k("span",ue,"\u4E0D\u7FFB\u8BD1")):(m(),k("span",ie,"\u5F02\u5E38"))]),_:1}),e(w,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:l(o=>[z("span",null,B(D(F)(o.row.create_time)),1)]),_:1}),e(w,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:l(o=>[z("span",null,B(D(F)(o.row.modify_time)),1)]),_:1}),e(w,{label:"\u64CD\u4F5C",width:"140",fixed:"right"},{default:l(o=>[e(c,{type:"primary",onClick:H=>s(o.row)},{default:l(()=>[p("\u7F16\u8F91")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[P,u.loading]]),e(A,{"page-sizes":[15,30,60,100],total:u.total,"page-size":n.limit,"onUpdate:page-size":t[6]||(t[6]=o=>n.limit=o),"current-page":n.page,"onUpdate:current-page":t[7]||(t[7]=o=>n.page=o),onCurrentChange:t[8]||(t[8]=o=>a(!1)),onSizeChange:t[9]||(t[9]=o=>a(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),e(Z,{onSuccess:t[10]||(t[10]=o=>a(!1)),modelValue:g.value,"onUpdate:modelValue":t[11]||(t[11]=o=>g.value=o),data:{langConfigId:n.lang_config_id}},null,8,["modelValue","data"]),e(Y,{onSuccess:t[12]||(t[12]=o=>a(!1)),modelValue:_.value,"onUpdate:modelValue":t[13]||(t[13]=o=>_.value=o),data:u.row},null,8,["modelValue","data"])]),_:1})}}};export{_e as default};
