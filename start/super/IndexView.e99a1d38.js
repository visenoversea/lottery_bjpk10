import{c,o as p,e as k,F as U,D as $,f as y,g as l,G as B,b as L,k as b,h as s,N as O,i as t,X as S,Y as T,Z as F,L as M,M as R,m as x,l as V,a as J,x as A,r as G,d as P,w as X,n as D,P as Y,E as Z}from"./index.359dadce.js";import{f as q}from"./index.f2d37f1e.js";const H={class:"s_form_config_left"},K=["onClick"],Q={class:"s-box g-flex-align-center g-flex-justify-center"},ee={class:"s-box-name"},le={__name:"LeftView",emits:["add"],setup(g,{emit:_}){const e=[{title:"\u8F93\u5165\u6846",k:"",v:"",remark:"",type:"input",width:"280px",disabled:!1,labelWidth:"120px",placeholder:"\u8BF7\u8F93\u5165"},{title:"\u6587\u672C\u57DF",k:"",v:"",remark:"",type:"textarea",rows:2,width:"280px",disabled:!1,labelWidth:"120px",placeholder:"\u8BF7\u8F93\u5165\u6587\u672C"},{title:"\u5355\u9009",k:"",v:"",remark:"",type:"radio",disabled:!1,labelWidth:"120px",option:[{label:"\u9009\u62E9\u4E00",value:"0"},{label:"\u9009\u62E9\u4E8C",value:"1"}]},{title:"\u591A\u9009",k:"",v:[],remark:"",type:"checkbox",disabled:!1,labelWidth:"120px",option:[{label:"\u9009\u62E9\u4E00",value:"1"},{label:"\u9009\u62E9\u4E8C",value:"2"}]},{title:"\u9009\u62E9\u6846",k:"",v:"",remark:"",type:"select",width:"280px",disabled:!1,labelWidth:"120px",placeholder:"\u8BF7\u9009\u62E9",option:[{label:"\u533A\u57DF\u4E00",value:"1"},{label:"\u533A\u57DF\u4E8C",value:"2"}]},{title:"\u5F00\u5173",k:"",v:"1",remark:"",type:"switch",disabled:!1,labelWidth:"120px"},{title:"\u65E5\u671F",k:"",v:"",remark:"",type:"date",width:"280px",disabled:!1,labelWidth:"120px",placeholder:"\u8BF7\u9009\u62E9\u65E5\u671F"},{title:"\u6587\u4EF6\u4E0A\u4F20",k:"",v:"",remark:"",type:"upload",path:"",uploadType:"",labelWidth:"120px"}];return(m,i)=>{const d=c("el-image");return p(),k("div",H,[(p(),k(U,null,$(e,(f,r)=>y("div",{onClick:a=>_("add",JSON.parse(JSON.stringify(f))),key:r,class:"s-list"},[y("div",Q,[l(d,{class:"s-box-img",src:"/img/svg/"+f.type+".svg",fit:"contain"},null,8,["src"]),y("span",ee,B(f.title),1)])],8,K)),64))])}}};const te={__name:"CenterView",props:{list:{type:Object,default(){return[]}}},emits:["select","up","down","del"],setup(g,{emit:_}){const e=g,m=L(-1),i=a=>{m.value=a,_("select",e.list[a])},d=a=>{a!==0&&(_("up",a),i(a-1))},f=a=>{a!==e.list.length-1&&(_("down",a),i(a+1))},r=a=>{m.value=-1,_("del",a)};return(a,w)=>{const v=c("el-icon"),h=c("el-form");return p(),b(h,{size:"default",class:"s_form_config_center"},{default:s(()=>[(p(!0),k(U,null,$(e.list,(n,o)=>(p(),k("div",{key:o,class:O(["s-list",{"s-active":m.value==o}])},[l(v,{onClick:u=>d(o),size:22,class:"s-icon-top"},{default:s(()=>[l(t(S))]),_:2},1032,["onClick"]),l(v,{onClick:u=>f(o),size:22,class:"s-icon-bottom"},{default:s(()=>[l(t(T))]),_:2},1032,["onClick"]),l(v,{onClick:u=>r(o),size:20,class:"s-icon-delete"},{default:s(()=>[l(t(F))]),_:2},1032,["onClick"]),(p(),b(M(t(q)[n.type]),{onClick:u=>i(o),class:"s-component",item:n},null,8,["onClick","item"]))],2))),128))]),_:1})}}},oe={key:5},ae={__name:"RightView",props:{modelValue:{type:Object}},setup(g){const _=g,e=R(()=>_.modelValue),m=()=>{e.value.option.push({label:"\u9009\u62E9",value:""})};return(i,d)=>{const f=c("el-divider"),r=c("el-input"),a=c("el-form-item"),w=c("el-switch"),v=c("el-button"),h=c("el-form");return t(e).type?(p(),b(h,{key:0,size:"default","label-width":"80px"},{default:s(()=>[l(f,{"content-position":"left"},{default:s(()=>[x("\u901A\u7528")]),_:1}),l(a,{label:"\u7C7B\u578B"},{default:s(()=>[l(r,{modelValue:t(e).type,"onUpdate:modelValue":d[0]||(d[0]=n=>t(e).type=n),disabled:""},null,8,["modelValue"])]),_:1}),l(a,{label:"\u6807\u7B7E"},{default:s(()=>[l(r,{modelValue:t(e).title,"onUpdate:modelValue":d[1]||(d[1]=n=>t(e).title=n)},null,8,["modelValue"])]),_:1}),l(a,{label:"\u6570\u636E\u952E"},{default:s(()=>[l(r,{modelValue:t(e).k,"onUpdate:modelValue":d[2]||(d[2]=n=>t(e).k=n)},null,8,["modelValue"])]),_:1}),t(e).type!=="checkbox"?(p(),b(a,{key:0,label:"\u6570\u636E\u503C"},{default:s(()=>[l(r,{modelValue:t(e).v,"onUpdate:modelValue":d[3]||(d[3]=n=>t(e).v=n)},null,8,["modelValue"])]),_:1})):V("",!0),"rows"in t(e)?(p(),b(a,{key:1,label:"\u884C\u6570"},{default:s(()=>[l(r,{modelValue:t(e).rows,"onUpdate:modelValue":d[4]||(d[4]=n=>t(e).rows=n)},null,8,["modelValue"])]),_:1})):V("",!0),"placeholder"in t(e)?(p(),b(a,{key:2,label:"\u63D0\u793A"},{default:s(()=>[l(r,{modelValue:t(e).placeholder,"onUpdate:modelValue":d[5]||(d[5]=n=>t(e).placeholder=n)},null,8,["modelValue"])]),_:1})):V("",!0),l(a,{label:"\u5907\u6CE8"},{default:s(()=>[l(r,{modelValue:t(e).remark,"onUpdate:modelValue":d[6]||(d[6]=n=>t(e).remark=n)},null,8,["modelValue"])]),_:1}),l(a,{label:"\u6807\u7B7E\u5BBD\u5EA6"},{default:s(()=>[l(r,{modelValue:t(e).labelWidth,"onUpdate:modelValue":d[7]||(d[7]=n=>t(e).labelWidth=n)},null,8,["modelValue"])]),_:1}),"width"in t(e)?(p(),b(a,{key:3,label:"\u5BBD\u5EA6"},{default:s(()=>[l(r,{modelValue:t(e).width,"onUpdate:modelValue":d[8]||(d[8]=n=>t(e).width=n)},null,8,["modelValue"])]),_:1})):V("",!0),"disabled"in t(e)?(p(),b(a,{key:4,label:"\u7981\u7528"},{default:s(()=>[l(w,{modelValue:t(e).disabled,"onUpdate:modelValue":d[9]||(d[9]=n=>t(e).disabled=n)},null,8,["modelValue"])]),_:1})):V("",!0),"option"in t(e)?(p(),k("div",oe,[l(f,{"content-position":"left"},{default:s(()=>[x("\u9009\u9879")]),_:1}),(p(!0),k(U,null,$(t(e).option,(n,o)=>(p(),k("div",{style:{padding:"10px","margin-bottom":"5px",border:"1px solid #bcbbbb"},key:o},[l(a,{label:"\u9009\u9879\u540D\u79F0"},{default:s(()=>[l(r,{modelValue:n.label,"onUpdate:modelValue":u=>n.label=u},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),l(a,{label:"\u9009\u9879\u503C"},{default:s(()=>[l(r,{modelValue:n.value,"onUpdate:modelValue":u=>n.value=u},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),l(a,null,{default:s(()=>[l(v,{onClick:u=>t(e).option.splice(o,1),type:"danger"},{default:s(()=>[x("\u5220\u9664")]),_:2},1032,["onClick"])]),_:2},1024)]))),128)),y("div",null,[l(v,{type:"primary",onClick:d[10]||(d[10]=n=>m())},{default:s(()=>[x("\u6DFB\u52A0\u5143\u7D20")]),_:1})])])):V("",!0)]),_:1})):V("",!0)}}},ne={class:"g-flex"},se={class:"g-flex-justify-end g-flex-1"},ue={__name:"IndexView",setup(g){const _=J(),e=A(),m=L(!1),i=G({info:{id:0,title:""},list:[],row:{}});(async()=>{m.value=!0;const{success:o,data:u}=await D.getConfigItem({id:e.params.id});m.value=!1,o&&(i.list=u.list,i.info=u.info)})();const f=o=>{i.list.push(o)},r=o=>{i.row={},i.list.splice(o,1)},a=o=>{i.row=o},w=(o,u,C)=>{o[u]=o.splice(C,1,o[u])[0]},v=o=>{o!==0&&w(i.list,o,o-1)},h=o=>{o!==i.list.length-1&&w(i.list,o,o+1)},n=()=>{Y.confirm("\u63D0\u4EA4\u786E\u8BA4?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{m.value=!0;const{success:o,data:u}=await D.editFormConfig({id:e.params.id,list:i.list});m.value=!1,o&&(Z.success(u.msg),_.go(-1))})};return(o,u)=>{const C=c("el-button"),W=c("el-aside"),N=c("el-main"),z=c("el-container"),I=c("el-card"),j=P("loading");return X((p(),b(I,null,{header:s(()=>[y("div",ne,[y("span",null,B(i.info.title),1),y("div",se,[l(C,{type:"primary",onClick:n},{default:s(()=>[x("\u63D0\u4EA4")]),_:1})])])]),default:s(()=>[l(z,null,{default:s(()=>[l(W,{width:"120px"},{default:s(()=>[l(le,{onAdd:f})]),_:1}),l(N,{style:{border:"2px dashed #95a3b7",padding:"5px"}},{default:s(()=>[l(te,{list:i.list,onSelect:a,onUp:v,onDown:h,onDel:r},null,8,["list"])]),_:1}),l(W,{style:{width:"30%","min-width":"350px","padding-left":"10px"}},{default:s(()=>[l(ae,{modelValue:i.row,"onUpdate:modelValue":u[0]||(u[0]=E=>i.row=E)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})),[[j,m.value]])}}};export{ue as default};
