import{u as F,b as G,M as Z,r as W,c as p,d as J,o as m,k as x,h as l,g as e,m as w,w as q,G as $,Q as K,e as V,F as L,D as M,l as j,i as T,O as ee,n as A,E as P,j as le,f as z,P as ae}from"./index.cf99acbd.js";import{f as R}from"./index.969b688d.js";const te={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(I,{emit:B}){const s=I,c=F(),_=G(!1),y=Z({get:()=>s.modelValue,set:g=>{B("update:modelValue",g)}}),a=W({id:0,title:"",icon:"",info:{},min:"",max:"",remark:"",sort:"",authCode:"",status:1}),N=()=>{a.id=s.data.id,a.title=s.data.title,a.icon=s.data.icon,a.info=JSON.parse(JSON.stringify(s.data.info)),a.min=s.data.min,a.max=s.data.max,a.remark=s.data.remark,a.sort=s.data.sort,a.authCode="",a.status=s.data.status},k=async()=>{if(_.value)return;_.value=!0;const{success:g,data:o}=await A.editTrade(a);_.value=!1,g&&(B("success"),P.success(o.msg),y.value=!1)},r=()=>{a.info.push({currency:"USDT",symbol:"",rate:"1",fixed:"2",icon:"/img/coin/usdt.png",chainList:[{chain:"TRC-20",address:""}]})},b=()=>{a.info.pop()},E=g=>{g.push({chain:"TRC-20",address:""})},h=g=>{g.pop()};return(g,o)=>{const i=p("el-input"),n=p("el-form-item"),u=p("el-col"),v=p("el-row"),C=p("el-divider"),U=p("el-button"),D=p("el-option"),d=p("el-select"),S=p("el-form"),Q=p("el-dialog"),H=J("loading");return m(),x(Q,{modelValue:T(y),"onUpdate:modelValue":o[21]||(o[21]=t=>ee(y)?y.value=t:null),top:"2vh",title:"\u7F16\u8F91",onOpen:N,"close-on-click-modal":!1,width:"680px"},{footer:l(()=>[e(U,{size:"default",onClick:o[20]||(o[20]=t=>y.value=!1)},{default:l(()=>[w("\u53D6 \u6D88")]),_:1}),e(U,{size:"default",type:"primary",onClick:k},{default:l(()=>[w("\u786E \u8BA4")]),_:1})]),default:l(()=>[q((m(),x(S,{size:"default",model:a,"label-width":"90px"},{default:l(()=>[e(v,{gutter:24},{default:l(()=>[e(u,{span:12},{default:l(()=>[e(n,{label:"\u6807\u9898"},{default:l(()=>[e(i,{modelValue:a.title,"onUpdate:modelValue":o[0]||(o[0]=t=>a.title=t),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(n,{label:"ID"},{default:l(()=>[w($(a.id),1)]),_:1})]),_:1})]),_:1}),e(v,{gutter:24},{default:l(()=>[e(u,{span:12},{default:l(()=>[e(n,{label:"\u5907\u6CE8"},{default:l(()=>[e(i,{type:"textarea",rows:3,modelValue:a.remark,"onUpdate:modelValue":o[1]||(o[1]=t=>a.remark=t),placeholder:"\u8BF7\u8F93\u5165\u5907\u6CE8"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(n,{label:"\u56FE\u6807"},{default:l(()=>[e(K,{width:"80px",height:"50px",modelValue:a.icon,"onUpdate:modelValue":o[2]||(o[2]=t=>a.icon=t)},null,8,["modelValue"]),e(i,{modelValue:a.icon,"onUpdate:modelValue":o[3]||(o[3]=t=>a.icon=t)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),s.data.fn=="Bank"?(m(),x(v,{key:0,gutter:24},{default:l(()=>[e(C),e(u,{span:12},{default:l(()=>[e(n,{label:"\u8D27\u5E01\u5355\u4F4D"},{default:l(()=>[e(i,{modelValue:a.info.currency,"onUpdate:modelValue":o[4]||(o[4]=t=>a.info.currency=t),placeholder:"\u8BF7\u8F93\u5165\u8D27\u5E01\u5355\u4F4D"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(n,{label:"\u8D27\u5E01\u7B26\u53F7"},{default:l(()=>[e(i,{modelValue:a.info.symbol,"onUpdate:modelValue":o[5]||(o[5]=t=>a.info.symbol=t),placeholder:"\u8BF7\u8F93\u5165\u59D3\u540D"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(n,{label:"\u8D27\u5E01\u6C47\u7387"},{default:l(()=>[e(i,{modelValue:a.info.rate,"onUpdate:modelValue":o[6]||(o[6]=t=>a.info.rate=t),placeholder:"\u8BF7\u8F93\u5165\u8D27\u5E01\u6C47\u7387"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(n,{label:"\u91D1\u989D\u4F4D\u6570"},{default:l(()=>[e(i,{modelValue:a.info.fixed,"onUpdate:modelValue":o[7]||(o[7]=t=>a.info.fixed=t),placeholder:"\u8BF7\u8F93\u5165\u91D1\u989D\u5C0F\u6570\u4F4D\u6570"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(n,{label:"\u94F6\u884C\u5361\u53F7"},{default:l(()=>[e(i,{modelValue:a.info.card_number,"onUpdate:modelValue":o[8]||(o[8]=t=>a.info.card_number=t),placeholder:"\u8BF7\u8F93\u5165\u94F6\u884C\u5361\u53F7"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(n,{label:"\u59D3\u540D"},{default:l(()=>[e(i,{modelValue:a.info.name,"onUpdate:modelValue":o[9]||(o[9]=t=>a.info.name=t),placeholder:"\u8BF7\u8F93\u5165\u59D3\u540D"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(n,{label:"\u5F00\u6237\u94F6\u884C"},{default:l(()=>[e(i,{modelValue:a.info.bank_name,"onUpdate:modelValue":o[10]||(o[10]=t=>a.info.bank_name=t),placeholder:"\u8BF7\u8F93\u5165\u5F00\u6237\u94F6\u884C"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(n,{label:"\u94F6\u884C\u4EE3\u7801"},{default:l(()=>[e(i,{modelValue:a.info.bank_code,"onUpdate:modelValue":o[11]||(o[11]=t=>a.info.bank_code=t),placeholder:"\u8BF7\u8F93\u5165\u94F6\u884C\u4EE3\u7801"},null,8,["modelValue"])]),_:1})]),_:1}),e(n,{label:"\u5F00\u6237\u652F\u884C"},{default:l(()=>[e(i,{modelValue:a.info.branch,"onUpdate:modelValue":o[12]||(o[12]=t=>a.info.branch=t),placeholder:"\u8BF7\u8F93\u5165\u5F00\u6237\u652F\u884C"},null,8,["modelValue"])]),_:1}),e(C)]),_:1})):s.data.fn=="Wallet"?(m(),V(L,{key:1},[e(C),e(n,{label:"\u94B1\u5305\u7BA1\u7406"},{default:l(()=>[e(U,{type:"primary",onClick:o[13]||(o[13]=t=>r())},{default:l(()=>[w("\u65B0\u589E")]),_:1}),e(U,{type:"danger",onClick:o[14]||(o[14]=t=>b())},{default:l(()=>[w("\u5220\u9664")]),_:1})]),_:1}),e(C),(m(!0),V(L,null,M(a.info,(t,X)=>(m(),x(v,{key:X,gutter:24},{default:l(()=>[e(u,{span:12},{default:l(()=>[e(n,{label:"\u8D27\u5E01\u5355\u4F4D"},{default:l(()=>[e(i,{modelValue:t.currency,"onUpdate:modelValue":f=>t.currency=f,placeholder:"\u8BF7\u8F93\u5165\u8D27\u5E01\u5355\u4F4D"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(u,{span:12},{default:l(()=>[e(n,{label:"\u8D27\u5E01\u56FE\u6807"},{default:l(()=>[e(K,{width:"80px",height:"80px",modelValue:t.icon,"onUpdate:modelValue":f=>t.icon=f},null,8,["modelValue","onUpdate:modelValue"]),e(i,{modelValue:t.icon,"onUpdate:modelValue":f=>t.icon=f},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(u,{span:12},{default:l(()=>[e(n,{label:"\u8D27\u5E01\u6C47\u7387"},{default:l(()=>[e(i,{modelValue:t.rate,"onUpdate:modelValue":f=>t.rate=f,placeholder:"\u8BF7\u8F93\u5165\u8D27\u5E01\u6C47\u7387"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(u,{span:12},{default:l(()=>[e(n,{label:"\u6570\u91CF\u4F4D\u6570"},{default:l(()=>[e(i,{modelValue:t.fixed,"onUpdate:modelValue":f=>t.fixed=f,placeholder:"\u8BF7\u8F93\u5165\u6362\u7B97\u6570\u91CF\u5C0F\u6570\u4F4D\u6570"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(u,{span:24},{default:l(()=>[e(n,{label:"\u65B0\u589E\u5730\u5740"},{default:l(()=>[e(U,{type:"primary",onClick:f=>E(t.chainList)},{default:l(()=>[w("\u65B0\u589E")]),_:2},1032,["onClick"]),e(U,{type:"danger",onClick:f=>h(t.chainList)},{default:l(()=>[w("\u5220\u9664")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024),(m(!0),V(L,null,M(t.chainList,(f,Y)=>(m(),V(L,{key:Y},[e(u,{span:12},{default:l(()=>[e(n,{label:"\u94B1\u5305\u5730\u5740"},{default:l(()=>[e(i,{modelValue:f.address,"onUpdate:modelValue":O=>f.address=O,placeholder:"\u8BF7\u8F93\u5165\u94B1\u5305\u5730\u5740"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(u,{span:12},{default:l(()=>[e(n,{label:"\u94FE\u7C7B\u578B"},{default:l(()=>[e(i,{modelValue:f.chain,"onUpdate:modelValue":O=>f.chain=O,placeholder:"\u8BF7\u8F93\u5165\u94FE\u7C7B\u578B"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)],64))),128)),e(C)]),_:2},1024))),128))],64)):j("",!0),e(v,{gutter:24},{default:l(()=>[e(u,{span:12},{default:l(()=>[e(n,{label:"\u6700\u5C0F\u9650\u5236"},{default:l(()=>[e(i,{modelValue:a.min,"onUpdate:modelValue":o[15]||(o[15]=t=>a.min=t),placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u9650\u5236"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(n,{label:"\u6700\u5927\u9650\u5236"},{default:l(()=>[e(i,{modelValue:a.max,"onUpdate:modelValue":o[16]||(o[16]=t=>a.max=t),placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u9650\u5236,-1\u4E0D\u9650\u5236"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(v,{gutter:24},{default:l(()=>[e(u,{span:12},{default:l(()=>[e(n,{label:"\u6392\u5E8F"},{default:l(()=>[e(i,{modelValue:a.sort,"onUpdate:modelValue":o[17]||(o[17]=t=>a.sort=t),placeholder:"\u6392\u5E8F"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(n,{label:"\u72B6\u6001"},{default:l(()=>[e(d,{modelValue:a.status,"onUpdate:modelValue":o[18]||(o[18]=t=>a.status=t)},{default:l(()=>[e(D,{label:"\u6B63\u5E38",value:1}),e(D,{label:"\u7981\u7528",value:0})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),T(c).system.GoogleAuth=="1"?(m(),x(n,{key:2,label:"\u8C37\u6B4C\u9A8C\u8BC1\u7801"},{default:l(()=>[e(i,{modelValue:a.authCode,"onUpdate:modelValue":o[19]||(o[19]=t=>a.authCode=t),placeholder:"\u8BF7\u8F93\u5165\u8C37\u6B4C\u9A8C\u8BC1\u7801",autocomplete:"off"},null,8,["modelValue"])]),_:1})):j("",!0)]),_:1},8,["model"])),[[H,_.value]])]),_:1},8,["modelValue"])}}},oe=z("div",{class:"g-flex"},[z("span",null,"\u5145\u503C\u914D\u7F6E")],-1),ne={key:0,class:"g-green"},de={key:1,class:"g-red"},ue=["onClick"],se={key:0},ie={key:1},re={key:0,class:"g-green"},pe={key:1,class:"g-red"},me={key:2,class:"g-red"},ce={__name:"IndexView",setup(I){const B=F(),s=W({loading:!1,total:0,list:[],row:{}}),c=W({type:1,title:"",status:"",page:1,limit:15}),_=async(k=!0)=>{k&&(c.page=1),s.loading=!0;const{success:r,data:b}=await A.getTradeList(c);s.loading=!1,r&&(s.list=b.list,s.total=b.total)};_();const y=G(!1),a=k=>{s.row=k,y.value=!0},N=k=>{ae.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{s.loading=!0;const{success:r,data:b}=await A.delTrade({id:k.id});s.loading=!1,r&&(P.success(b.msg),await _(!1))})};return(k,r)=>{const b=p("el-option"),E=p("el-select"),h=p("el-form-item"),g=p("el-input"),o=p("el-button"),i=p("el-form"),n=p("el-table-column"),u=p("el-image"),v=p("el-table"),C=p("el-pagination"),U=p("el-card"),D=J("loading");return m(),x(U,null,{header:l(()=>[oe]),default:l(()=>[e(i,{inline:!0},{default:l(()=>[e(h,{label:"\u72B6\u6001"},{default:l(()=>[e(E,{modelValue:c.status,"onUpdate:modelValue":r[0]||(r[0]=d=>c.status=d),onChange:_},{default:l(()=>[e(b,{label:"\u5168\u90E8",value:""}),e(b,{label:"\u6B63\u5E38",value:"1"}),e(b,{label:"\u7981\u7528",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(h,{label:"\u6807\u9898"},{default:l(()=>[e(g,{modelValue:c.title,"onUpdate:modelValue":r[1]||(r[1]=d=>c.title=d),onKeyup:le(_,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",onClear:_,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(h,null,{default:l(()=>[e(o,{type:"primary",onClick:_},{default:l(()=>[w("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1}),q((m(),x(v,{data:s.list,stripe:"",border:""},{default:l(()=>[e(n,{prop:"id",label:"ID",width:"80"}),e(n,{label:"\u4EA4\u6613\u65B9\u5F0F","min-width":"80","show-overflow-tooltip":!0},{default:l(d=>[d.row.mode==1?(m(),V("span",ne,"\u7EBF\u4E0B")):(m(),V("span",de,"\u7EBF\u4E0A"))]),_:1}),e(n,{label:"\u6807\u9898","min-width":"100"},{default:l(d=>[z("span",{onClick:S=>T(B).setTranslate({content:d.row.title}),class:"g-purple g-pointer"},$(d.row.title),9,ue)]),_:1}),e(n,{label:"\u56FE\u6807",width:"80"},{default:l(d=>[d.row.icon?(m(),x(u,{key:0,src:d.row.icon,"preview-src-list":[d.row.icon],fit:"contain","hide-on-click-modal":"","preview-teleported":""},null,8,["src","preview-src-list"])):j("",!0)]),_:1}),e(n,{prop:"min",label:"\u6700\u5C0F",width:"80"}),e(n,{label:"\u6700\u5927",width:"80"},{default:l(d=>[d.row.max==-1?(m(),V("span",se,"\u4E0D\u9650\u5236")):(m(),V("span",ie,$(d.row.max),1))]),_:1}),e(n,{prop:"sort",label:"\u6392\u5E8F","min-width":"100"}),e(n,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:l(d=>[z("span",null,$(T(R)(d.row.create_time)),1)]),_:1}),e(n,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:l(d=>[z("span",null,$(T(R)(d.row.modify_time)),1)]),_:1}),e(n,{label:"\u72B6\u6001",width:"80"},{default:l(d=>[d.row.status===1?(m(),V("span",re,"\u6B63\u5E38")):d.row.status===0?(m(),V("span",pe,"\u7981\u7528")):(m(),V("span",me,"\u5F02\u5E38"))]),_:1}),e(n,{label:"\u64CD\u4F5C",width:"130",fixed:"right"},{default:l(d=>[e(o,{type:"primary",onClick:S=>a(d.row)},{default:l(()=>[w("\u7F16\u8F91")]),_:2},1032,["onClick"]),e(o,{type:"danger",onClick:S=>N(d.row)},{default:l(()=>[w("\u5220\u9664")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[D,s.loading]]),e(C,{"page-sizes":[15,30,60,100],total:s.total,"page-size":c.limit,"onUpdate:page-size":r[2]||(r[2]=d=>c.limit=d),"current-page":c.page,"onUpdate:current-page":r[3]||(r[3]=d=>c.page=d),onCurrentChange:r[4]||(r[4]=d=>_(!1)),onSizeChange:r[5]||(r[5]=d=>_(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),e(te,{onSuccess:r[6]||(r[6]=d=>_(!1)),modelValue:y.value,"onUpdate:modelValue":r[7]||(r[7]=d=>y.value=d),data:s.row},null,8,["modelValue","data"])]),_:1})}}};export{ce as default};
