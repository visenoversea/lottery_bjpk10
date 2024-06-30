import{b as I,M as h,r as K,c as V,d as W,o as s,k as w,h as l,g as e,m as _,w as X,R as ee,l as T,e as b,F as M,D as R,i as q,O as le,n as j,E as G,G as S,f as L,j as te,Q as Y}from"./index.088b396a.js";import{f as Z}from"./index.969b688d.js";const oe={__name:"AddView",props:{modelValue:{type:Boolean,default:!1}},emits:["update:modelValue","success"],setup(J,{emit:v}){const g=J,y=I(),A=I(!1),o=h({get:()=>g.modelValue,set:f=>{v("update:modelValue",f)}}),d=K({type:1,title:"",icon:"",price:"",fixed:"4",api:1,api_config:{symbol:"",ratio:"0.005",min:"",max:"",minVol:"10",maxVol:"500"},data_config:{trade:{buyMin:"1",sellMin:"1"},contract:[{multiple:"1",min:"1"},{multiple:"5",min:"1"},{multiple:"10",min:"1"},{multiple:"20",min:"1"}],time:[{time:"60",profit:"1",min:"1"},{time:"120",profit:"1",min:"1"},{time:"180",profit:"1",min:"1"},{time:"300",profit:"1",min:"1"}],lever:{min:"1",max:"100",contract:"100",timeLimit:"1",multiple:"100"}},fee_rate:"0",min:"0",introduce:{website:"",title:"",whiteBookUrl:"",totalAmount:"",inAmount:"",issueDate:"",content:""},hot:0,sort:"0",status:0}),O=()=>{d.data_config={trade:{buyMin:"1",sellMin:"1"},contract:[{multiple:"1",min:"1"},{multiple:"5",min:"1"},{multiple:"10",min:"1"},{multiple:"20",min:"1"}],time:[{time:"60",profit:"1",min:"1"},{time:"120",profit:"1",min:"1"},{time:"180",profit:"1",min:"1"},{time:"300",profit:"1",min:"1"}],lever:{min:"1",max:"100",contract:"100",timeLimit:"1",multiple:"100"}}},P=()=>{y.value.resetFields()},$=async()=>{if(A.value)return;A.value=!0;const{success:f,data:t}=await j.addProduct(d);A.value=!1,f&&(v("success"),G.success(t.msg),o.value=!1)},c=()=>{d.contract_config.push({multiple:"",min:"1"})},k=()=>{d.contract_config.pop()},x=()=>{d.time_config.push({time:"",profit:"",min:"1"})},n=()=>{d.time_config.pop()};return(f,t)=>{const p=V("el-input"),m=V("el-form-item"),r=V("el-col"),U=V("el-radio"),B=V("el-radio-group"),C=V("el-row"),D=V("el-divider"),i=V("el-option"),F=V("el-select"),N=V("el-button"),Q=V("el-form"),u=V("el-dialog"),E=W("loading");return s(),w(u,{modelValue:q(o),"onUpdate:modelValue":t[37]||(t[37]=a=>le(o)?o.value=a:null),top:"2vh",title:"\u65B0\u589E",onOpen:O,onClose:P,"close-on-click-modal":!1,width:"750px"},{footer:l(()=>[e(N,{size:"default",onClick:t[36]||(t[36]=a=>o.value=!1)},{default:l(()=>[_("\u53D6 \u6D88")]),_:1}),e(N,{size:"default",type:"primary",onClick:$},{default:l(()=>[_("\u786E \u8BA4")]),_:1})]),default:l(()=>[X((s(),w(Q,{size:"default",ref_key:"refForm",ref:y,model:d,"label-width":"90px"},{default:l(()=>[e(C,{gutter:24},{default:l(()=>[e(r,{span:12},{default:l(()=>[e(m,{label:"\u6807\u9898",prop:"title"},{default:l(()=>[e(p,{modelValue:d.title,"onUpdate:modelValue":t[0]||(t[0]=a=>d.title=a),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:12},{default:l(()=>[e(m,{label:"\u7C7B\u578B",prop:"type"},{default:l(()=>[e(B,{modelValue:d.type,"onUpdate:modelValue":t[1]||(t[1]=a=>d.type=a)},{default:l(()=>[e(U,{label:0},{default:l(()=>[_("\u5E01\u5E01")]),_:1}),e(U,{label:1},{default:l(()=>[_("\u6760\u6746")]),_:1}),e(U,{label:2},{default:l(()=>[_("\u79D2\u5408\u7EA6")]),_:1}),e(U,{label:3},{default:l(()=>[_("\u5916\u6C47")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(r,{span:12},{default:l(()=>[e(m,{label:"\u56FE\u6807",prop:"icon"},{default:l(()=>[e(ee,{width:"100px",height:"80px",modelValue:d.icon,"onUpdate:modelValue":t[2]||(t[2]=a=>d.icon=a)},null,8,["modelValue"]),e(p,{modelValue:d.icon,"onUpdate:modelValue":t[3]||(t[3]=a=>d.icon=a)},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:12},{default:l(()=>[e(m,{label:"\u5C0F\u6570\u4F4D\u6570",prop:"fixed"},{default:l(()=>[e(p,{modelValue:d.fixed,"onUpdate:modelValue":t[4]||(t[4]=a=>d.fixed=a),placeholder:"\u8BF7\u8F93\u5165\u4EF7\u683C\u5C0F\u6570\u4F4D\u6570",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:12},{default:l(()=>[e(m,{label:"\u624B\u7EED\u8D39\u7387",prop:"fee_rate"},{default:l(()=>[e(p,{modelValue:d.fee_rate,"onUpdate:modelValue":t[5]||(t[5]=a=>d.fee_rate=a),placeholder:"\u8BF7\u8F93\u5165\u624B\u7EED\u8D39\u7387,0.01\u4E3A1%",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:12},{default:l(()=>[e(m,{label:"\u4F59\u989D\u9650\u5236",prop:"min"},{default:l(()=>[e(p,{modelValue:d.min,"onUpdate:modelValue":t[6]||(t[6]=a=>d.min=a),placeholder:"\u9650\u5236\u7528\u6237\u4F59\u989D\u591A\u5C11\u4EE5\u4E0A\u624D\u80FD\u4E0B\u5355",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:12},{default:l(()=>[e(m,{label:"\u662F\u5426\u70ED\u95E8",prop:"min"},{default:l(()=>[e(B,{modelValue:d.hot,"onUpdate:modelValue":t[7]||(t[7]=a=>d.hot=a)},{default:l(()=>[e(U,{label:1},{default:l(()=>[_("\u662F")]),_:1}),e(U,{label:0},{default:l(()=>[_("\u5426")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(r,{span:12},{default:l(()=>[e(m,{label:"\u6392\u5E8F",prop:"sort"},{default:l(()=>[e(p,{modelValue:d.sort,"onUpdate:modelValue":t[8]||(t[8]=a=>d.sort=a),placeholder:"\u6392\u5E8F\u503C\u8D8A\u5927\u6392\u8D8A\u524D\u9762",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(D),e(C,{gutter:24},{default:l(()=>[e(r,{span:12},{default:l(()=>[e(m,{label:"\u6570\u636E\u6E90",prop:"api"},{default:l(()=>[e(F,{modelValue:d.api,"onUpdate:modelValue":t[9]||(t[9]=a=>d.api=a)},{default:l(()=>[e(i,{label:"\u7CFB\u7EDF",value:1}),e(i,{label:"\u706B\u5E01\u7F51",value:2}),e(i,{label:"\u65B0\u6D6A\u8D22\u7ECF",value:4})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(r,{span:12},{default:l(()=>[d.api!=1?(s(),w(m,{key:0,label:"api\u53C2\u6570",prop:"api_config.symbol"},{default:l(()=>[e(p,{modelValue:d.api_config.symbol,"onUpdate:modelValue":t[10]||(t[10]=a=>d.api_config.symbol=a),placeholder:"\u4F8Bbtcusdt,ethusdt",autocomplete:"off"},null,8,["modelValue"])]),_:1})):T("",!0)]),_:1}),d.api==1?(s(),b(M,{key:0},[e(r,{span:12},{default:l(()=>[e(m,{label:"\u4EF7\u683C",prop:"price"},{default:l(()=>[e(p,{modelValue:d.price,"onUpdate:modelValue":t[11]||(t[11]=a=>d.price=a),placeholder:"\u8BF7\u8F93\u5165\u4EF7\u683C",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:12},{default:l(()=>[e(m,{label:"\u6DA8\u8DCC\u6BD4\u4F8B",prop:"api_config.ratio"},{default:l(()=>[e(p,{modelValue:d.api_config.ratio,"onUpdate:modelValue":t[12]||(t[12]=a=>d.api_config.ratio=a),placeholder:"\u6BCF\u5206\u949F\u6DA8\u8DCC\u8303\u56F4\u6BD4\u4F8B,0.01\u4E3A1%",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:12},{default:l(()=>[e(m,{label:"\u6700\u4F4E\u4EF7\u9650\u5236",prop:"api_config.min"},{default:l(()=>[e(p,{modelValue:d.api_config.min,"onUpdate:modelValue":t[13]||(t[13]=a=>d.api_config.min=a),placeholder:"\u4E3A\u7A7A\u4E0D\u9650\u5236",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:12},{default:l(()=>[e(m,{label:"\u6700\u9AD8\u4EF7\u9650\u5236",prop:"api_config.max"},{default:l(()=>[e(p,{modelValue:d.api_config.max,"onUpdate:modelValue":t[14]||(t[14]=a=>d.api_config.max=a),placeholder:"\u4E3A\u7A7A\u4E0D\u9650\u5236",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1})],64)):T("",!0),e(r,{span:12},{default:l(()=>[e(m,{label:"\u6700\u5C0F\u4EA4\u6613\u91CF",prop:"api_config.minVol"},{default:l(()=>[e(p,{modelValue:d.api_config.minVol,"onUpdate:modelValue":t[15]||(t[15]=a=>d.api_config.minVol=a),placeholder:"\u8BF7\u8F93\u5165\u4EA7\u54C1\u4EF7\u683C\u6700\u5C0F\u4EA4\u6613\u91CF\u6CE2\u52A8",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:12},{default:l(()=>[e(m,{label:"\u6700\u5927\u4EA4\u6613\u91CF",prop:"api_config.maxVol"},{default:l(()=>[e(p,{modelValue:d.api_config.maxVol,"onUpdate:modelValue":t[16]||(t[16]=a=>d.api_config.maxVol=a),placeholder:"\u8BF7\u8F93\u5165\u4EA7\u54C1\u4EF7\u683C\u6700\u5927\u4EA4\u6613\u91CF\u6CE2\u52A8",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(D),d.type==0?(s(),w(C,{key:0,gutter:24},{default:l(()=>[e(r,{span:6},{default:l(()=>[e(m,{label:"\u6700\u5C0F\u4E70\u5165"},{default:l(()=>[e(p,{modelValue:d.data_config.trade.buyMin,"onUpdate:modelValue":t[17]||(t[17]=a=>d.data_config.trade.buyMin=a),placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u4E70\u5165",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:6},{default:l(()=>[e(m,{label:"\u6700\u5C0F\u5356\u51FA"},{default:l(()=>[e(p,{modelValue:d.data_config.trade.sellMin,"onUpdate:modelValue":t[18]||(t[18]=a=>d.data_config.trade.sellMin=a),placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u5356\u51FA",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})):d.type==1?(s(),b(M,{key:1},[e(m,{label:"\u6760\u6746\u914D\u7F6E"},{default:l(()=>[e(N,{type:"primary",onClick:t[19]||(t[19]=a=>c())},{default:l(()=>[_("\u65B0\u589E")]),_:1}),e(N,{type:"danger",onClick:t[20]||(t[20]=a=>k())},{default:l(()=>[_("\u5220\u9664")]),_:1})]),_:1}),(s(!0),b(M,null,R(d.data_config.contract,(a,H)=>(s(),w(C,{key:H,gutter:24},{default:l(()=>[e(r,{span:12},{default:l(()=>[e(m,{label:"\u6760\u6746\u500D\u6570"},{default:l(()=>[e(p,{modelValue:a.multiple,"onUpdate:modelValue":z=>a.multiple=z,placeholder:"\u8BF7\u8F93\u5165\u6760\u6746",autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(r,{span:12},{default:l(()=>[e(m,{label:"\u91D1\u989D\u9650\u5236"},{default:l(()=>[e(p,{modelValue:a.min,"onUpdate:modelValue":z=>a.min=z,placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u91D1\u989D\u9650\u5236",autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))],64)):d.type==2?(s(),b(M,{key:2},[e(m,{label:"\u79D2\u5408\u7EA6\u914D\u7F6E"},{default:l(()=>[e(N,{type:"primary",onClick:t[21]||(t[21]=a=>x())},{default:l(()=>[_("\u65B0\u589E")]),_:1}),e(N,{type:"danger",onClick:t[22]||(t[22]=a=>n())},{default:l(()=>[_("\u5220\u9664")]),_:1})]),_:1}),(s(!0),b(M,null,R(d.data_config.time,(a,H)=>(s(),w(C,{key:H,gutter:24},{default:l(()=>[e(r,{span:8},{default:l(()=>[e(m,{label:"\u65F6\u95F4(\u79D2)"},{default:l(()=>[e(p,{modelValue:a.time,"onUpdate:modelValue":z=>a.time=z,placeholder:"\u8BF7\u8F93\u5165\u7ED3\u7B97\u65F6\u95F4",autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(r,{span:8},{default:l(()=>[e(m,{label:"\u6536\u76CA"},{default:l(()=>[e(p,{modelValue:a.profit,"onUpdate:modelValue":z=>a.profit=z,placeholder:"\u8BF7\u8F93\u5165\u6536\u76CA\uFF0C1\u4E3A100%",autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(r,{span:8},{default:l(()=>[e(m,{label:"\u91D1\u989D\u9650\u5236"},{default:l(()=>[e(p,{modelValue:a.min,"onUpdate:modelValue":z=>a.min=z,placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u91D1\u989D\u9650\u5236",autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))],64)):d.type==3?(s(),w(C,{key:3,gutter:24},{default:l(()=>[e(r,{span:12},{default:l(()=>[e(m,{label:"\u65F6\u95F4\u5468\u671F",prop:"min"},{default:l(()=>[e(B,{modelValue:d.data_config.lever.timeLimit,"onUpdate:modelValue":t[23]||(t[23]=a=>d.data_config.lever.timeLimit=a)},{default:l(()=>[e(U,{label:"0"},{default:l(()=>[_("24\u5C0F\u65F6")]),_:1}),e(U,{label:"1"},{default:l(()=>[_("\u5916\u6C47\u4EA4\u6613\u65F6\u95F4")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(r,{span:6},{default:l(()=>[e(m,{label:"\u5408\u7EA6\u6570\u91CF"},{default:l(()=>[e(p,{modelValue:d.data_config.lever.contract,"onUpdate:modelValue":t[24]||(t[24]=a=>d.data_config.lever.contract=a),placeholder:"\u8BF7\u8F93\u5165\u5408\u7EA6\u6570\u91CF",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:6},{default:l(()=>[e(m,{label:"\u6760\u6746\u500D\u6570"},{default:l(()=>[e(p,{modelValue:d.data_config.lever.multiple,"onUpdate:modelValue":t[25]||(t[25]=a=>d.data_config.lever.multiple=a),placeholder:"\u8BF7\u8F93\u5165\u6760\u6746\u500D\u6570",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:6},{default:l(()=>[e(m,{label:"\u624B\u6570\u6700\u5C0F"},{default:l(()=>[e(p,{modelValue:d.data_config.lever.min,"onUpdate:modelValue":t[26]||(t[26]=a=>d.data_config.lever.min=a),placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u624B\u6570\u9650\u5236",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:6},{default:l(()=>[e(m,{label:"\u624B\u6570\u6700\u5927"},{default:l(()=>[e(p,{modelValue:d.data_config.lever.max,"onUpdate:modelValue":t[27]||(t[27]=a=>d.data_config.lever.max=a),placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u624B\u6570\u9650\u5236",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})):T("",!0),e(D),e(C,{gutter:24},{default:l(()=>[e(r,{span:8},{default:l(()=>[e(m,{label:"\u4EA7\u54C1\u5168\u79F0",prop:"introduce.title"},{default:l(()=>[e(p,{modelValue:d.introduce.title,"onUpdate:modelValue":t[28]||(t[28]=a=>d.introduce.title=a),placeholder:"\u8BF7\u8F93\u5165\u4EA7\u54C1\u5168\u79F0",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:8},{default:l(()=>[e(m,{label:"\u5B98\u7F51",prop:"introduce.website"},{default:l(()=>[e(p,{modelValue:d.introduce.website,"onUpdate:modelValue":t[29]||(t[29]=a=>d.introduce.website=a),placeholder:"\u8BF7\u8F93\u5165\u5B98\u7F51",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:8},{default:l(()=>[e(m,{label:"\u767D\u76AE\u4E66\u94FE\u63A5",prop:"introduce.whiteBookUrl"},{default:l(()=>[e(p,{modelValue:d.introduce.whiteBookUrl,"onUpdate:modelValue":t[30]||(t[30]=a=>d.introduce.whiteBookUrl=a),placeholder:"\u8BF7\u8F93\u5165\u767D\u76AE\u4E66\u94FE\u63A5",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:8},{default:l(()=>[e(m,{label:"\u53D1\u884C\u65E5\u671F",prop:"introduce.inAmount"},{default:l(()=>[e(p,{modelValue:d.introduce.issueDate,"onUpdate:modelValue":t[31]||(t[31]=a=>d.introduce.issueDate=a),placeholder:"\u8BF7\u8F93\u5165\u53D1\u884C\u65E5\u671F",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:8},{default:l(()=>[e(m,{label:"\u53D1\u884C\u603B\u91CF",prop:"introduce.totalAmount"},{default:l(()=>[e(p,{modelValue:d.introduce.totalAmount,"onUpdate:modelValue":t[32]||(t[32]=a=>d.introduce.totalAmount=a),placeholder:"\u8BF7\u8F93\u5165\u53D1\u884C\u603B\u91CF",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:8},{default:l(()=>[e(m,{label:"\u6D41\u901A\u603B\u91CF",prop:"introduce.inAmount"},{default:l(()=>[e(p,{modelValue:d.introduce.inAmount,"onUpdate:modelValue":t[33]||(t[33]=a=>d.introduce.inAmount=a),placeholder:"\u8BF7\u8F93\u5165\u6D41\u901A\u603B\u91CF",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{span:24},{default:l(()=>[e(m,{label:"\u4EA7\u54C1\u4ECB\u7ECD",prop:"introduce.inAmount"},{default:l(()=>[e(p,{type:"textarea",rows:3,modelValue:d.introduce.content,"onUpdate:modelValue":t[34]||(t[34]=a=>d.introduce.content=a),placeholder:"\u8BF7\u8F93\u5165\u4EA7\u54C1\u4ECB\u7ECD",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(D),e(m,{label:"\u72B6\u6001",prop:"status"},{default:l(()=>[e(F,{modelValue:d.status,"onUpdate:modelValue":t[35]||(t[35]=a=>d.status=a)},{default:l(()=>[e(i,{label:"\u6B63\u5E38",value:1}),e(i,{label:"\u7981\u7528",value:0})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[E,A.value]])]),_:1},8,["modelValue"])}}},ae={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(J,{emit:v}){const g=J,y=I(!1),A=h({get:()=>g.modelValue,set:x=>{v("update:modelValue",x)}}),o=K({id:0,type:1,title:"",icon:"",price:"",fixed:"4",api:1,api_config:{symbol:"",ratio:"0.005",min:"",max:"",minVol:"10",maxVol:"500"},data_config:{trade:{buyMin:"1",sellMin:"1"},contract:[{multiple:"1",min:"1"},{multiple:"5",min:"1"},{multiple:"10",min:"1"},{multiple:"20",min:"1"}],time:[{time:"60",profit:"1",min:"1"},{time:"120",profit:"1",min:"1"},{time:"180",profit:"1",min:"1"},{time:"300",profit:"1",min:"1"}],lever:{min:"1",max:"100",contract:"100",timeLimit:"1",multiple:"100"}},fee_rate:"0",min:"0",introduce:{website:"",title:"",whiteBookUrl:"",totalAmount:"",inAmount:"",issueDate:"",content:""},hot:0,sort:"0",status:0}),d=()=>{o.id=g.data.id,o.type=g.data.type,o.title=g.data.title,o.icon=g.data.icon,o.price=g.data.price,o.fixed=g.data.fixed,o.fee_rate=g.data.fee_rate,o.min=g.data.min,o.hot=g.data.hot,o.sort=g.data.sort,o.status=g.data.status,o.api=g.data.api,o.api_config=JSON.parse(g.data.api_config),o.data_config=JSON.parse(g.data.data_config),o.introduce=JSON.parse(g.data.introduce)},O=async()=>{if(y.value)return;y.value=!0;const{success:x,data:n}=await j.editProduct(o);y.value=!1,x&&(v("success"),G.success(n.msg),A.value=!1)},P=()=>{o.contract_config.push({multiple:"",min:"1"})},$=()=>{o.contract_config.pop()},c=()=>{o.time_config.push({time:"",profit:"",min:"1"})},k=()=>{o.time_config.pop()};return(x,n)=>{const f=V("el-form-item"),t=V("el-col"),p=V("el-input"),m=V("el-radio"),r=V("el-radio-group"),U=V("el-row"),B=V("el-divider"),C=V("el-option"),D=V("el-select"),i=V("el-button"),F=V("el-form"),N=V("el-dialog"),Q=W("loading");return s(),w(N,{modelValue:q(A),"onUpdate:modelValue":n[36]||(n[36]=u=>le(A)?A.value=u:null),top:"2vh",title:"\u7F16\u8F91",onOpen:d,"close-on-click-modal":!1,width:"750px"},{footer:l(()=>[e(i,{size:"default",onClick:n[35]||(n[35]=u=>A.value=!1)},{default:l(()=>[_("\u53D6 \u6D88")]),_:1}),e(i,{size:"default",type:"primary",onClick:O},{default:l(()=>[_("\u786E \u8BA4")]),_:1})]),default:l(()=>[X((s(),w(F,{size:"default",ref:"refForm",model:o,"label-width":"90px"},{default:l(()=>[e(U,{gutter:24},{default:l(()=>[e(t,{span:12},{default:l(()=>[e(f,{label:"ID",prop:"id"},{default:l(()=>[_(S(o.id),1)]),_:1})]),_:1}),e(t,{span:12},{default:l(()=>[e(f,{label:"\u6807\u9898",prop:"title"},{default:l(()=>[e(p,{modelValue:o.title,"onUpdate:modelValue":n[0]||(n[0]=u=>o.title=u),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:12},{default:l(()=>[e(f,{label:"\u7C7B\u578B",prop:"type"},{default:l(()=>[e(r,{modelValue:o.type,"onUpdate:modelValue":n[1]||(n[1]=u=>o.type=u)},{default:l(()=>[e(m,{label:0},{default:l(()=>[_("\u5E01\u5E01")]),_:1}),e(m,{label:1},{default:l(()=>[_("\u6760\u6746")]),_:1}),e(m,{label:2},{default:l(()=>[_("\u79D2\u5408\u7EA6")]),_:1}),e(m,{label:3},{default:l(()=>[_("\u5916\u6C47")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(t,{span:12},{default:l(()=>[e(f,{label:"\u56FE\u6807",prop:"icon"},{default:l(()=>[e(ee,{width:"100px",height:"80px",modelValue:o.icon,"onUpdate:modelValue":n[2]||(n[2]=u=>o.icon=u)},null,8,["modelValue"]),e(p,{modelValue:o.icon,"onUpdate:modelValue":n[3]||(n[3]=u=>o.icon=u)},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:12},{default:l(()=>[e(f,{label:"\u5F53\u524D\u4EF7",prop:"price"},{default:l(()=>[_(S(Number(o.price).toFixed(o.fixed)),1)]),_:1})]),_:1}),e(t,{span:12},{default:l(()=>[e(f,{label:"\u5C0F\u6570\u4F4D\u6570",prop:"fixed"},{default:l(()=>[e(p,{modelValue:o.fixed,"onUpdate:modelValue":n[4]||(n[4]=u=>o.fixed=u),placeholder:"\u8BF7\u8F93\u5165\u4EF7\u683C\u5C0F\u6570\u4F4D\u6570",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:12},{default:l(()=>[e(f,{label:"\u624B\u7EED\u8D39\u7387",prop:"fee_rate"},{default:l(()=>[e(p,{modelValue:o.fee_rate,"onUpdate:modelValue":n[5]||(n[5]=u=>o.fee_rate=u),placeholder:"\u8BF7\u8F93\u5165\u624B\u7EED\u8D39\u7387,0.01\u4E3A1%",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:12},{default:l(()=>[e(f,{label:"\u4F59\u989D\u9650\u5236",prop:"min"},{default:l(()=>[e(p,{modelValue:o.min,"onUpdate:modelValue":n[6]||(n[6]=u=>o.min=u),placeholder:"\u9650\u5236\u7528\u6237\u4F59\u989D\u591A\u5C11\u4EE5\u4E0A\u624D\u80FD\u4E0B\u5355",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:12},{default:l(()=>[e(f,{label:"\u662F\u5426\u70ED\u95E8",prop:"min"},{default:l(()=>[e(r,{modelValue:o.hot,"onUpdate:modelValue":n[7]||(n[7]=u=>o.hot=u)},{default:l(()=>[e(m,{label:1},{default:l(()=>[_("\u662F")]),_:1}),e(m,{label:0},{default:l(()=>[_("\u5426")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(t,{span:12},{default:l(()=>[e(f,{label:"\u6392\u5E8F",prop:"sort"},{default:l(()=>[e(p,{modelValue:o.sort,"onUpdate:modelValue":n[8]||(n[8]=u=>o.sort=u),placeholder:"\u6392\u5E8F\u503C\u8D8A\u5927\u6392\u8D8A\u524D\u9762",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(B),e(U,{gutter:24},{default:l(()=>[e(t,{span:12},{default:l(()=>[e(f,{label:"\u6570\u636E\u6E90",prop:"api"},{default:l(()=>[e(D,{disabled:"",modelValue:o.api,"onUpdate:modelValue":n[9]||(n[9]=u=>o.api=u)},{default:l(()=>[e(C,{label:"\u7CFB\u7EDF",value:1}),e(C,{label:"\u706B\u5E01\u7F51",value:2}),e(C,{label:"\u65B0\u6D6A\u8D22\u7ECF",value:4})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(t,{span:12},{default:l(()=>[o.api!=1?(s(),w(f,{key:0,label:"api\u53C2\u6570",prop:"api_config.symbol"},{default:l(()=>[e(p,{disabled:"",modelValue:o.api_config.symbol,"onUpdate:modelValue":n[10]||(n[10]=u=>o.api_config.symbol=u),placeholder:"\u4F8Bbtcusdt,ethusdt",autocomplete:"off"},null,8,["modelValue"])]),_:1})):T("",!0)]),_:1}),o.api==1?(s(),b(M,{key:0},[e(t,{span:12},{default:l(()=>[e(f,{label:"\u6DA8\u8DCC\u6BD4\u4F8B",prop:"api_config.ratio"},{default:l(()=>[e(p,{modelValue:o.api_config.ratio,"onUpdate:modelValue":n[11]||(n[11]=u=>o.api_config.ratio=u),placeholder:"\u6BCF\u5206\u949F\u6DA8\u8DCC\u8303\u56F4\u6BD4\u4F8B,0.01\u4E3A1%",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:12},{default:l(()=>[e(f,{label:"\u6700\u4F4E\u4EF7\u9650\u5236",prop:"api_config.min"},{default:l(()=>[e(p,{modelValue:o.api_config.min,"onUpdate:modelValue":n[12]||(n[12]=u=>o.api_config.min=u),placeholder:"\u4E3A\u7A7A\u4E0D\u9650\u5236",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:12},{default:l(()=>[e(f,{label:"\u6700\u9AD8\u4EF7\u9650\u5236",prop:"api_config.max"},{default:l(()=>[e(p,{modelValue:o.api_config.max,"onUpdate:modelValue":n[13]||(n[13]=u=>o.api_config.max=u),placeholder:"\u4E3A\u7A7A\u4E0D\u9650\u5236",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1})],64)):T("",!0),e(t,{span:12},{default:l(()=>[e(f,{label:"\u6700\u5C0F\u4EA4\u6613\u91CF",prop:"api_config.minVol"},{default:l(()=>[e(p,{modelValue:o.api_config.minVol,"onUpdate:modelValue":n[14]||(n[14]=u=>o.api_config.minVol=u),placeholder:"\u8BF7\u8F93\u5165\u4EA7\u54C1\u4EF7\u683C\u6700\u5C0F\u4EA4\u6613\u91CF\u6CE2\u52A8",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:12},{default:l(()=>[e(f,{label:"\u6700\u5927\u4EA4\u6613\u91CF",prop:"api_config.maxVol"},{default:l(()=>[e(p,{modelValue:o.api_config.maxVol,"onUpdate:modelValue":n[15]||(n[15]=u=>o.api_config.maxVol=u),placeholder:"\u8BF7\u8F93\u5165\u4EA7\u54C1\u4EF7\u683C\u6700\u5927\u4EA4\u6613\u91CF\u6CE2\u52A8",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(B),o.type==0?(s(),w(U,{key:0,gutter:24},{default:l(()=>[e(t,{span:6},{default:l(()=>[e(f,{label:"\u6700\u5C0F\u4E70\u5165"},{default:l(()=>[e(p,{modelValue:o.data_config.trade.buyMin,"onUpdate:modelValue":n[16]||(n[16]=u=>o.data_config.trade.buyMin=u),placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u4E70\u5165",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:6},{default:l(()=>[e(f,{label:"\u6700\u5C0F\u5356\u51FA"},{default:l(()=>[e(p,{modelValue:o.data_config.trade.sellMin,"onUpdate:modelValue":n[17]||(n[17]=u=>o.data_config.trade.sellMin=u),placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u5356\u51FA",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})):o.type==1?(s(),b(M,{key:1},[e(f,{label:"\u6760\u6746\u914D\u7F6E"},{default:l(()=>[e(i,{type:"primary",onClick:n[18]||(n[18]=u=>P())},{default:l(()=>[_("\u65B0\u589E")]),_:1}),e(i,{type:"danger",onClick:n[19]||(n[19]=u=>$())},{default:l(()=>[_("\u5220\u9664")]),_:1})]),_:1}),(s(!0),b(M,null,R(o.data_config.contract,(u,E)=>(s(),w(U,{key:E,gutter:24},{default:l(()=>[e(t,{span:12},{default:l(()=>[e(f,{label:"\u6760\u6746\u500D\u6570"},{default:l(()=>[e(p,{modelValue:u.multiple,"onUpdate:modelValue":a=>u.multiple=a,placeholder:"\u8BF7\u8F93\u5165\u6760\u6746",autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(t,{span:12},{default:l(()=>[e(f,{label:"\u91D1\u989D\u9650\u5236"},{default:l(()=>[e(p,{modelValue:u.min,"onUpdate:modelValue":a=>u.min=a,placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u91D1\u989D\u9650\u5236",autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))],64)):o.type==2?(s(),b(M,{key:2},[e(f,{label:"\u79D2\u5408\u7EA6\u914D\u7F6E"},{default:l(()=>[e(i,{type:"primary",onClick:n[20]||(n[20]=u=>c())},{default:l(()=>[_("\u65B0\u589E")]),_:1}),e(i,{type:"danger",onClick:n[21]||(n[21]=u=>k())},{default:l(()=>[_("\u5220\u9664")]),_:1})]),_:1}),(s(!0),b(M,null,R(o.data_config.time,(u,E)=>(s(),w(U,{key:E,gutter:24},{default:l(()=>[e(t,{span:8},{default:l(()=>[e(f,{label:"\u65F6\u95F4(\u79D2)"},{default:l(()=>[e(p,{modelValue:u.time,"onUpdate:modelValue":a=>u.time=a,placeholder:"\u8BF7\u8F93\u5165\u7ED3\u7B97\u65F6\u95F4",autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(t,{span:8},{default:l(()=>[e(f,{label:"\u6536\u76CA"},{default:l(()=>[e(p,{modelValue:u.profit,"onUpdate:modelValue":a=>u.profit=a,placeholder:"\u8BF7\u8F93\u5165\u6536\u76CA\uFF0C1\u4E3A100%",autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(t,{span:8},{default:l(()=>[e(f,{label:"\u91D1\u989D\u9650\u5236"},{default:l(()=>[e(p,{modelValue:u.min,"onUpdate:modelValue":a=>u.min=a,placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u91D1\u989D\u9650\u5236",autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))],64)):o.type==3?(s(),w(U,{key:3,gutter:24},{default:l(()=>[e(t,{span:12},{default:l(()=>[e(f,{label:"\u65F6\u95F4\u5468\u671F",prop:"min"},{default:l(()=>[e(r,{modelValue:o.data_config.lever.timeLimit,"onUpdate:modelValue":n[22]||(n[22]=u=>o.data_config.lever.timeLimit=u)},{default:l(()=>[e(m,{label:"0"},{default:l(()=>[_("24\u5C0F\u65F6")]),_:1}),e(m,{label:"1"},{default:l(()=>[_("\u5916\u6C47\u4EA4\u6613\u65F6\u95F4")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(t,{span:6},{default:l(()=>[e(f,{label:"\u5408\u7EA6\u6570\u91CF"},{default:l(()=>[e(p,{modelValue:o.data_config.lever.contract,"onUpdate:modelValue":n[23]||(n[23]=u=>o.data_config.lever.contract=u),placeholder:"\u8BF7\u8F93\u5165\u5408\u7EA6\u6570\u91CF",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:6},{default:l(()=>[e(f,{label:"\u6760\u6746\u500D\u6570"},{default:l(()=>[e(p,{modelValue:o.data_config.lever.multiple,"onUpdate:modelValue":n[24]||(n[24]=u=>o.data_config.lever.multiple=u),placeholder:"\u8BF7\u8F93\u5165\u6760\u6746\u500D\u6570",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:6},{default:l(()=>[e(f,{label:"\u624B\u6570\u6700\u5C0F"},{default:l(()=>[e(p,{modelValue:o.data_config.lever.min,"onUpdate:modelValue":n[25]||(n[25]=u=>o.data_config.lever.min=u),placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u624B\u6570\u9650\u5236",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:6},{default:l(()=>[e(f,{label:"\u624B\u6570\u6700\u5927"},{default:l(()=>[e(p,{modelValue:o.data_config.lever.max,"onUpdate:modelValue":n[26]||(n[26]=u=>o.data_config.lever.max=u),placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u624B\u6570\u9650\u5236",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})):T("",!0),e(B),e(U,{gutter:24},{default:l(()=>[e(t,{span:8},{default:l(()=>[e(f,{label:"\u4EA7\u54C1\u5168\u79F0",prop:"introduce.title"},{default:l(()=>[e(p,{modelValue:o.introduce.title,"onUpdate:modelValue":n[27]||(n[27]=u=>o.introduce.title=u),placeholder:"\u8BF7\u8F93\u5165\u4EA7\u54C1\u5168\u79F0",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:8},{default:l(()=>[e(f,{label:"\u5B98\u7F51",prop:"introduce.website"},{default:l(()=>[e(p,{modelValue:o.introduce.website,"onUpdate:modelValue":n[28]||(n[28]=u=>o.introduce.website=u),placeholder:"\u8BF7\u8F93\u5165\u5B98\u7F51",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:8},{default:l(()=>[e(f,{label:"\u767D\u76AE\u4E66\u94FE\u63A5",prop:"introduce.whiteBookUrl"},{default:l(()=>[e(p,{modelValue:o.introduce.whiteBookUrl,"onUpdate:modelValue":n[29]||(n[29]=u=>o.introduce.whiteBookUrl=u),placeholder:"\u8BF7\u8F93\u5165\u767D\u76AE\u4E66\u94FE\u63A5",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:8},{default:l(()=>[e(f,{label:"\u53D1\u884C\u65E5\u671F",prop:"introduce.inAmount"},{default:l(()=>[e(p,{modelValue:o.introduce.issueDate,"onUpdate:modelValue":n[30]||(n[30]=u=>o.introduce.issueDate=u),placeholder:"\u8BF7\u8F93\u5165\u53D1\u884C\u65E5\u671F",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:8},{default:l(()=>[e(f,{label:"\u53D1\u884C\u603B\u91CF",prop:"introduce.totalAmount"},{default:l(()=>[e(p,{modelValue:o.introduce.totalAmount,"onUpdate:modelValue":n[31]||(n[31]=u=>o.introduce.totalAmount=u),placeholder:"\u8BF7\u8F93\u5165\u53D1\u884C\u603B\u91CF",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:8},{default:l(()=>[e(f,{label:"\u6D41\u901A\u603B\u91CF",prop:"introduce.inAmount"},{default:l(()=>[e(p,{modelValue:o.introduce.inAmount,"onUpdate:modelValue":n[32]||(n[32]=u=>o.introduce.inAmount=u),placeholder:"\u8BF7\u8F93\u5165\u6D41\u901A\u603B\u91CF",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(t,{span:24},{default:l(()=>[e(f,{label:"\u4EA7\u54C1\u4ECB\u7ECD",prop:"introduce.inAmount"},{default:l(()=>[e(p,{type:"textarea",rows:3,modelValue:o.introduce.content,"onUpdate:modelValue":n[33]||(n[33]=u=>o.introduce.content=u),placeholder:"\u8BF7\u8F93\u5165\u4EA7\u54C1\u4ECB\u7ECD",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(B),e(f,{label:"\u72B6\u6001",prop:"status"},{default:l(()=>[e(D,{modelValue:o.status,"onUpdate:modelValue":n[34]||(n[34]=u=>o.status=u)},{default:l(()=>[e(C,{label:"\u6B63\u5E38",value:1}),e(C,{label:"\u7981\u7528",value:0})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[Q,y.value]])]),_:1},8,["modelValue"])}}},de={class:"g-flex"},ue=L("span",null,"\u4EA7\u54C1\u914D\u7F6E",-1),ne={class:"g-flex-justify-end g-flex-1"},ie={key:0,class:"g-green"},pe={key:1,class:"g-red"},me={key:2,class:"g-red"},fe={key:3,class:"g-red"},re={key:4,class:"g-red"},se={class:"g-green-tiffany"},_e={key:0,class:"g-green"},Ve={key:1,class:"g-red"},ce={key:2,class:"g-yellow"},ge={key:3,class:"g-purple"},be={key:4},ye={key:0,class:"g-green"},ve={key:1,class:"g-red"},Ue={key:2,class:"g-red"},xe={__name:"IndexView",setup(J){const v=K({loading:!1,total:0,list:[],row:{}}),g=K({title:"",type:"",status:"",page:1,limit:15}),y=async($=!0)=>{$&&(g.page=1),v.loading=!0;const{success:c,data:k}=await j.getProductList(g);v.loading=!1,c&&(v.list=k.list,v.total=k.total)};y();const A=I(!1),o=I(!1),d=$=>{v.row=$,o.value=!0},O=$=>{Y.confirm("\u662F\u5426\u540C\u6B65\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{v.loading=!0;const{success:c,data:k}=await j.syncProduct({id:$.id});v.loading=!1,c&&(G.success(k.msg),await y(!1))})},P=$=>{Y.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{v.loading=!0;const{success:c,data:k}=await j.delProduct({id:$.id});v.loading=!1,c&&(G.success(k.msg),await y(!1))})};return($,c)=>{const k=V("el-button"),x=V("el-option"),n=V("el-select"),f=V("el-form-item"),t=V("el-input"),p=V("el-form"),m=V("el-table-column"),r=V("el-image"),U=V("el-table"),B=V("el-pagination"),C=V("el-card"),D=W("loading");return s(),w(C,null,{header:l(()=>[L("div",de,[ue,L("div",ne,[e(k,{type:"success",onClick:c[0]||(c[0]=i=>A.value=!0)},{default:l(()=>[_("\u65B0\u589E")]),_:1})])])]),default:l(()=>[e(p,{inline:!0},{default:l(()=>[e(f,{label:"\u7C7B\u578B"},{default:l(()=>[e(n,{modelValue:g.type,"onUpdate:modelValue":c[1]||(c[1]=i=>g.type=i),onChange:y},{default:l(()=>[e(x,{label:"\u5168\u90E8",value:""}),e(x,{label:"\u5E01\u5E01",value:"0"}),e(x,{label:"\u6760\u6746",value:"1"}),e(x,{label:"\u79D2\u5408\u7EA6",value:"2"}),e(x,{label:"\u5916\u6C47",value:"3"})]),_:1},8,["modelValue"])]),_:1}),e(f,{label:"\u72B6\u6001"},{default:l(()=>[e(n,{modelValue:g.status,"onUpdate:modelValue":c[2]||(c[2]=i=>g.status=i),onChange:y},{default:l(()=>[e(x,{label:"\u5168\u90E8",value:""}),e(x,{label:"\u6B63\u5E38",value:"1"}),e(x,{label:"\u7981\u7528",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(f,{label:"\u6807\u9898"},{default:l(()=>[e(t,{modelValue:g.title,"onUpdate:modelValue":c[3]||(c[3]=i=>g.title=i),onKeyup:te(y,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",onClear:y,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(f,null,{default:l(()=>[e(k,{type:"primary",onClick:y},{default:l(()=>[_("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1}),X((s(),w(U,{data:v.list,stripe:"",border:""},{default:l(()=>[e(m,{prop:"id",label:"ID",width:"50","show-overflow-tooltip":!0}),e(m,{label:"\u7C7B\u578B",width:"80"},{default:l(i=>[i.row.type==0?(s(),b("span",ie,"\u5E01\u5E01")):i.row.type==1?(s(),b("span",pe,"\u6760\u6746")):i.row.type==2?(s(),b("span",me,"\u79D2\u5408\u7EA6")):i.row.type==3?(s(),b("span",fe,"\u5916\u6C47")):(s(),b("span",re,"\u5F02\u5E38"))]),_:1}),e(m,{label:"\u6807\u9898","min-width":"100"},{default:l(i=>[L("span",null,S(i.row.title),1)]),_:1}),e(m,{label:"\u56FE\u6807",width:"60"},{default:l(i=>[i.row.icon?(s(),w(r,{key:0,src:i.row.icon,"preview-src-list":[i.row.icon],fit:"contain","hide-on-click-modal":"","preview-teleported":""},null,8,["src","preview-src-list"])):T("",!0)]),_:1}),e(m,{label:"\u5F53\u524D\u4EF7",width:"90","show-overflow-tooltip":!0},{default:l(i=>[L("span",null,S(Number(i.row.price).toFixed(i.row.fixed)),1)]),_:1}),e(m,{label:"\u624B\u7EED\u8D39\u7387",width:"75"},{default:l(i=>[L("span",null,S(i.row.fee_rate*100)+"%",1)]),_:1}),e(m,{label:"\u4F59\u989D\u9650\u5236",width:"75"},{default:l(i=>[L("span",se,S(i.row.min),1)]),_:1}),e(m,{prop:"sort",label:"\u6392\u5E8F",width:"50","show-overflow-tooltip":!0}),e(m,{label:"\u6570\u636E\u6765\u6E90",width:"75"},{default:l(i=>[i.row.api==1?(s(),b("span",_e,"\u7CFB\u7EDF")):i.row.api==2?(s(),b("span",Ve,"\u706B\u5E01\u7F51")):i.row.api==3?(s(),b("span",ce,"\u5E01\u5B89")):i.row.api==4?(s(),b("span",ge,"\u65B0\u6D6A\u8D22\u7ECF")):(s(),b("span",be,"\u65E0"))]),_:1}),e(m,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:l(i=>[L("span",null,S(q(Z)(i.row.create_time)),1)]),_:1}),e(m,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:l(i=>[L("span",null,S(q(Z)(i.row.modify_time)),1)]),_:1}),e(m,{label:"\u72B6\u6001",width:"80"},{default:l(i=>[i.row.status===1?(s(),b("span",ye,"\u6B63\u5E38")):i.row.status===0?(s(),b("span",ve,"\u7981\u7528")):(s(),b("span",Ue,"\u5F02\u5E38"))]),_:1}),e(m,{label:"\u64CD\u4F5C",width:"200",fixed:"right"},{default:l(i=>[i.row.api>1?(s(),w(k,{key:0,type:"success",onClick:F=>O(i.row)},{default:l(()=>[_("\u540C\u6B65")]),_:2},1032,["onClick"])):T("",!0),e(k,{type:"primary",onClick:F=>d(i.row)},{default:l(()=>[_("\u7F16\u8F91")]),_:2},1032,["onClick"]),e(k,{type:"danger",onClick:F=>P(i.row)},{default:l(()=>[_("\u5220\u9664")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[D,v.loading]]),e(B,{"page-sizes":[15,30,60,100],total:v.total,"page-size":g.limit,"onUpdate:page-size":c[4]||(c[4]=i=>g.limit=i),"current-page":g.page,"onUpdate:current-page":c[5]||(c[5]=i=>g.page=i),onCurrentChange:c[6]||(c[6]=i=>y(!1)),onSizeChange:c[7]||(c[7]=i=>y(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),e(oe,{onSuccess:y,modelValue:A.value,"onUpdate:modelValue":c[8]||(c[8]=i=>A.value=i)},null,8,["modelValue"]),e(ae,{onSuccess:c[9]||(c[9]=i=>y(!1)),modelValue:o.value,"onUpdate:modelValue":c[10]||(c[10]=i=>o.value=i),data:v.row},null,8,["modelValue","data"])]),_:1})}}};export{xe as default};