import{b as j,M as F,r as z,c as d,d as I,o as r,k as V,h as a,g as e,m as y,w as M,f as b,N as O,G as g,e as c,i as D,O as H,n as T,E as q,u as J,j as L,l as N,P as Q}from"./index.359dadce.js";import{f as S}from"./index.969b688d.js";const W={key:0,class:"g-green"},X={key:1,class:"g-blue"},Y={key:2,class:"g-red"},Z={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(E,{emit:h}){const i=E,m=j(!1),n=F({get:()=>i.modelValue,set:w=>{h("update:modelValue",w)}}),o=z({id:0,bank_name:"",bank_code:"",name:"",card_number:"",branch:"",status:1}),U=()=>{o.id=i.data.id,o.bank_name=i.data.bank_name,o.bank_code=i.data.bank_code,o.name=i.data.name,o.card_number=i.data.card_number,o.branch=i.data.branch,o.status=i.data.status},$=async()=>{if(m.value)return;m.value=!0;const{success:w,data:s}=await T.editUserBank(o);m.value=!1,w&&(h("success"),q.success(s.msg),n.value=!1)};return(w,s)=>{const t=d("el-form-item"),u=d("el-col"),k=d("el-row"),f=d("el-input"),v=d("el-option"),B=d("el-select"),C=d("el-form"),x=d("el-button"),K=d("el-dialog"),p=I("loading");return r(),V(K,{modelValue:D(n),"onUpdate:modelValue":s[7]||(s[7]=_=>H(n)?n.value=_:null),top:"2vh",title:"\u7F16\u8F91",onOpen:U,draggable:"","close-on-click-modal":!1,width:"680px"},{footer:a(()=>[e(x,{size:"default",onClick:s[6]||(s[6]=_=>n.value=!1)},{default:a(()=>[y("\u53D6 \u6D88")]),_:1}),e(x,{size:"default",type:"primary",onClick:$},{default:a(()=>[y("\u786E \u8BA4")]),_:1})]),default:a(()=>[M((r(),V(C,{size:"default",model:o,"label-width":"90px"},{default:a(()=>[e(k,{gutter:24},{default:a(()=>[e(u,{span:12},{default:a(()=>[e(t,{label:"\u7528\u6237ID"},{default:a(()=>[b("div",{class:O({"g-bg-pink":i.data.user.virtual})},[b("span",null,g(i.data.user_id),1),i.data.user.type===1?(r(),c("span",W,"(\u4F1A\u5458)")):i.data.user.type===2?(r(),c("span",X,"(\u4EE3\u7406)")):(r(),c("span",Y,"(\u5F02\u5E38)"))],2)]),_:1})]),_:1}),e(u,{span:12},{default:a(()=>[e(t,{label:"\u7528\u6237\u540D"},{default:a(()=>[y(g(i.data.user.user_name),1)]),_:1})]),_:1})]),_:1}),e(t,{label:"\u94F6\u884C\u540D\u79F0"},{default:a(()=>[e(f,{modelValue:o.bank_name,"onUpdate:modelValue":s[0]||(s[0]=_=>o.bank_name=_),placeholder:"\u8BF7\u8F93\u5165\u94F6\u884C\u540D\u79F0"},null,8,["modelValue"])]),_:1}),e(t,{label:"\u94F6\u884C\u5361\u53F7"},{default:a(()=>[e(f,{modelValue:o.card_number,"onUpdate:modelValue":s[1]||(s[1]=_=>o.card_number=_),placeholder:"\u8BF7\u8F93\u5165\u94F6\u884C\u5361\u53F7"},null,8,["modelValue"])]),_:1}),e(t,{label:"\u94F6\u884C\u4EE3\u7801"},{default:a(()=>[e(f,{modelValue:o.bank_code,"onUpdate:modelValue":s[2]||(s[2]=_=>o.bank_code=_),placeholder:"\u8BF7\u8F93\u5165\u94F6\u884C\u4EE3\u7801"},null,8,["modelValue"])]),_:1}),e(t,{label:"\u59D3\u540D"},{default:a(()=>[e(f,{modelValue:o.name,"onUpdate:modelValue":s[3]||(s[3]=_=>o.name=_),placeholder:"\u8BF7\u8F93\u5165\u59D3\u540D"},null,8,["modelValue"])]),_:1}),e(t,{label:"\u5F00\u6237\u652F\u884C"},{default:a(()=>[e(f,{modelValue:o.branch,"onUpdate:modelValue":s[4]||(s[4]=_=>o.branch=_),placeholder:"\u8BF7\u8F93\u5165\u5F00\u6237\u7F51\u70B9"},null,8,["modelValue"])]),_:1}),e(t,{label:"\u72B6\u6001"},{default:a(()=>[e(B,{modelValue:o.status,"onUpdate:modelValue":s[5]||(s[5]=_=>o.status=_)},{default:a(()=>[e(v,{label:"\u6B63\u5E38",value:1}),e(v,{label:"\u7981\u7528",value:0})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[p,m.value]])]),_:1},8,["modelValue"])}}},ee=b("div",{class:"g-flex"},[b("span",null,"\u7528\u6237\u94F6\u884C\u5361")],-1),le={key:0,class:"g-green"},ae={key:1,class:"g-blue"},te={key:2,class:"g-grey"},oe={key:3,class:"g-red"},ne={key:0,class:"g-red"},se={key:1},de={key:0,class:"g-blue"},ue={key:1},re={key:0,class:"g-green"},ie={key:1,class:"g-red"},me={key:2,class:"g-red"},ce={__name:"IndexView",setup(E){const h=J(),i=z({editUserBank:h.auth("editUserBank"),delUserBank:h.auth("delUserBank")}),m=z({loading:!1,total:0,list:[],row:{}}),n=z({userType:"",virtual:"",status:"",id_card:"",name:"",search_key:"user_name",search_val:"",page:1,limit:15}),o=async(s=!0)=>{s&&(n.page=1),m.loading=!0;const{success:t,data:u}=await T.getUserBankList(n);m.loading=!1,t&&(m.list=u.list,m.total=u.total)};o();const U=j(!1),$=s=>{m.row=s,U.value=!0},w=s=>{Q.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{m.loading=!0;const{success:t,data:u}=await T.delUserBank({id:s.id});m.loading=!1,t&&(q.success(u.msg),await o(!1))})};return(s,t)=>{const u=d("el-option"),k=d("el-select"),f=d("el-form-item"),v=d("el-input"),B=d("el-col"),C=d("el-button"),x=d("el-row"),K=d("el-form"),p=d("el-table-column"),_=d("el-table"),G=d("el-pagination"),P=d("el-card"),R=I("loading");return r(),V(P,null,{header:a(()=>[ee]),default:a(()=>[e(K,{inline:!0},{default:a(()=>[e(f,{label:"\u7528\u6237\u7C7B\u578B"},{default:a(()=>[e(k,{modelValue:n.userType,"onUpdate:modelValue":t[0]||(t[0]=l=>n.userType=l),onChange:o},{default:a(()=>[e(u,{label:"\u5168\u90E8",value:""}),e(u,{label:"\u4EE3\u7406",value:"2"}),e(u,{label:"\u4F1A\u5458",value:"1"})]),_:1},8,["modelValue"])]),_:1}),e(f,{label:"\u8D26\u53F7\u7C7B\u578B"},{default:a(()=>[e(k,{modelValue:n.virtual,"onUpdate:modelValue":t[1]||(t[1]=l=>n.virtual=l),onChange:o},{default:a(()=>[e(u,{label:"\u5168\u90E8",value:""}),e(u,{label:"\u865A\u62DF\u53F7",value:"1"}),e(u,{label:"\u6B63\u5E38",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(f,{label:"\u72B6\u6001"},{default:a(()=>[e(k,{modelValue:n.status,"onUpdate:modelValue":t[2]||(t[2]=l=>n.status=l),onChange:o},{default:a(()=>[e(u,{label:"\u5168\u90E8",value:""}),e(u,{label:"\u6B63\u5E38",value:"1"}),e(u,{label:"\u7981\u7528",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(f,{label:"\u94F6\u884C\u540D\u79F0"},{default:a(()=>[e(v,{modelValue:n.bank_name,"onUpdate:modelValue":t[3]||(t[3]=l=>n.bank_name=l),onKeyup:L(o,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u94F6\u884C\u540D\u79F0",onClear:o,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(f,{label:"\u59D3\u540D"},{default:a(()=>[e(v,{modelValue:n.name,"onUpdate:modelValue":t[4]||(t[4]=l=>n.name=l),onKeyup:L(o,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u59D3\u540D",onClear:o,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(f,null,{label:a(()=>[e(k,{modelValue:n.search_key,"onUpdate:modelValue":t[5]||(t[5]=l=>n.search_key=l)},{default:a(()=>[e(u,{label:"\u7528\u6237\u540D",value:"user_name"}),e(u,{label:"\u7528\u6237ID",value:"user_id"}),e(u,{label:"\u94F6\u884C\u5361\u53F7",value:"card_number"})]),_:1},8,["modelValue"])]),default:a(()=>[e(x,null,{default:a(()=>[e(B,{span:18},{default:a(()=>[e(v,{modelValue:n.search_val,"onUpdate:modelValue":t[6]||(t[6]=l=>n.search_val=l),onKeyup:L(o,["enter"]),onClear:o,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(B,{span:5,offset:1},{default:a(()=>[e(C,{type:"primary",onClick:o},{default:a(()=>[y("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),M((r(),V(_,{data:m.list,stripe:"",border:""},{default:a(()=>[e(p,{fixed:"left",label:"\u7528\u6237",width:"120"},{default:a(l=>[b("div",{class:O({"g-bg-pink":l.row.user.virtual})},[b("span",null,g(l.row.user.id),1),l.row.user.type===1?(r(),c("span",le,"(\u4F1A\u5458)")):l.row.user.type===2?(r(),c("span",ae,"(\u4EE3\u7406)")):l.row.user.type===0?(r(),c("span",te,"(\u865A\u62DF\u76D8)")):(r(),c("span",oe,"(\u5F02\u5E38)"))],2)]),_:1}),e(p,{fixed:"left",prop:"user.user_name",label:"\u7528\u6237\u540D",width:"100"}),e(p,{label:"\u603B\u4EE3\u7406",width:"100"},{default:a(l=>[l.row.agentList.length>0?(r(),c("span",ne,g(l.row.agentList[0].user_name),1)):(r(),c("span",se,"-"))]),_:1}),e(p,{label:"\u4E0A\u7EA7\u4EE3\u7406",width:"100"},{default:a(l=>[l.row.agentList.length>0?(r(),c("span",de,g(l.row.agentList[l.row.agentList.length-1].user_name),1)):(r(),c("span",ue,"-"))]),_:1}),e(p,{prop:"bank_name",label:"\u94F6\u884C\u540D\u79F0","min-width":"80","show-overflow-tooltip":!0}),e(p,{prop:"bank_code",label:"\u94F6\u884C\u4EE3\u7801","min-width":"80","show-overflow-tooltip":!0}),e(p,{prop:"branch",label:"\u5F00\u6237\u652F\u884C","min-width":"80","show-overflow-tooltip":!0}),e(p,{prop:"name",label:"\u59D3\u540D","min-width":"80","show-overflow-tooltip":!0}),e(p,{prop:"card_number",label:"\u5361\u53F7","min-width":"100","show-overflow-tooltip":!0}),e(p,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:a(l=>[b("span",null,g(D(S)(l.row.create_time)),1)]),_:1}),e(p,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:a(l=>[b("span",null,g(D(S)(l.row.modify_time)),1)]),_:1}),e(p,{label:"\u72B6\u6001",width:"80"},{default:a(l=>[l.row.status===1?(r(),c("span",re,"\u6B63\u5E38")):l.row.status===0?(r(),c("span",ie,"\u7981\u7528")):(r(),c("span",me,"\u5F02\u5E38"))]),_:1}),i.editUserBank?(r(),V(p,{key:0,label:"\u64CD\u4F5C",width:"130",fixed:"right"},{default:a(l=>[e(C,{type:"primary",onClick:A=>$(l.row)},{default:a(()=>[y("\u7F16\u8F91")]),_:2},1032,["onClick"]),i.delUserBank?(r(),V(C,{key:0,type:"danger",onClick:A=>w(l.row)},{default:a(()=>[y("\u5220\u9664")]),_:2},1032,["onClick"])):N("",!0)]),_:1})):N("",!0)]),_:1},8,["data"])),[[R,m.loading]]),e(G,{"page-sizes":[15,30,60,100],total:m.total,"page-size":n.limit,"onUpdate:page-size":t[7]||(t[7]=l=>n.limit=l),"current-page":n.page,"onUpdate:current-page":t[8]||(t[8]=l=>n.page=l),onCurrentChange:t[9]||(t[9]=l=>o(!1)),onSizeChange:t[10]||(t[10]=l=>o(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),e(Z,{onSuccess:t[11]||(t[11]=l=>o(!1)),modelValue:U.value,"onUpdate:modelValue":t[12]||(t[12]=l=>U.value=l),data:m.row},null,8,["modelValue","data"])]),_:1})}}};export{ce as default};
