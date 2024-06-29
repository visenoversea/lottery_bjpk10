import{b as $,M as Y,r as N,c as n,d as I,o as _,k as U,h as t,g as e,m as h,w as j,i as B,O as F,n as E,E as K,G as m,u as q,f as r,l as S,j as R,N as M,e as b}from"./index.5bbbdb88.js";import{f as O}from"./index.969b688d.js";const J={__name:"AddView",props:{modelValue:{type:Boolean,default:!1}},emits:["update:modelValue","success"],setup(L,{emit:k}){const w=L,v=$(),u=$(!1),o=Y({get:()=>w.modelValue,set:d=>{k("update:modelValue",d)}}),p=N({user_name:"",password:"",area_code:"",mobile:"",email:"",nick_name:"",agentAcount:""}),A=async()=>{v.value.resetFields()},f=async()=>{if(u.value)return;u.value=!0;const{success:d,data:a}=await E.addUserAgent(p);u.value=!1,d&&(k("success"),K.success(a.msg),o.value=!1)};return(d,a)=>{const c=n("el-input"),i=n("el-form-item"),V=n("el-col"),y=n("el-row"),z=n("el-form"),x=n("el-button"),C=n("el-dialog"),D=I("loading");return _(),U(C,{modelValue:B(o),"onUpdate:modelValue":a[7]||(a[7]=g=>F(o)?o.value=g:null),top:"2vh",title:"\u65B0\u589E",onClose:A,draggable:"","close-on-click-modal":!1,width:"620px"},{footer:t(()=>[e(x,{size:"default",onClick:a[6]||(a[6]=g=>o.value=!1)},{default:t(()=>[h("\u53D6 \u6D88")]),_:1}),e(x,{size:"default",type:"primary",onClick:f},{default:t(()=>[h("\u786E \u8BA4")]),_:1})]),default:t(()=>[j((_(),U(z,{size:"default",ref_key:"refForm",ref:v,model:p,"label-width":"90px"},{default:t(()=>[e(i,{label:"\u7528\u6237\u540D",prop:"user_name"},{default:t(()=>[e(c,{modelValue:p.user_name,"onUpdate:modelValue":a[0]||(a[0]=g=>p.user_name=g),autocomplete:"off",placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D"},null,8,["modelValue"])]),_:1}),e(i,{label:"\u5BC6\u7801",prop:"password"},{default:t(()=>[e(c,{modelValue:p.password,"onUpdate:modelValue":a[1]||(a[1]=g=>p.password=g),placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(i,{label:"\u624B\u673A",prop:"mobile"},{default:t(()=>[e(y,null,{default:t(()=>[e(V,{span:5},{default:t(()=>[e(c,{modelValue:p.area_code,"onUpdate:modelValue":a[2]||(a[2]=g=>p.area_code=g),placeholder:"\u533A\u53F7"},null,8,["modelValue"])]),_:1}),e(V,{span:18,offset:1},{default:t(()=>[e(c,{modelValue:p.mobile,"onUpdate:modelValue":a[3]||(a[3]=g=>p.mobile=g),placeholder:"\u624B\u673A\u53F7"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(i,{label:"\u90AE\u7BB1",prop:"email"},{default:t(()=>[e(c,{modelValue:p.email,"onUpdate:modelValue":a[4]||(a[4]=g=>p.email=g),placeholder:"\u8BF7\u8F93\u5165\u90AE\u7BB1"},null,8,["modelValue"])]),_:1}),e(i,{label:"\u6635\u79F0",prop:"nick_name"},{default:t(()=>[e(c,{modelValue:p.nick_name,"onUpdate:modelValue":a[5]||(a[5]=g=>p.nick_name=g),autocomplete:"off",placeholder:"\u8BF7\u8F93\u5165\u6635\u79F0"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[D,u.value]])]),_:1},8,["modelValue"])}}},Q={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(L,{emit:k}){const w=L,v=$(!1),u=Y({get:()=>w.modelValue,set:f=>{k("update:modelValue",f)}}),o=N({id:0,type:0,virtual:0,user_name:"",password:"",fund_password:"",area_code:"",mobile:"",email:"",nick_name:"",agentAcount:"",status:1}),p=()=>{o.id=w.data.id,o.password="",o.fund_password="",o.area_code=w.data.area_code,o.mobile=w.data.mobile,o.email=w.data.email,o.nick_name=w.data.nick_name,w.data.agentList.length>0?o.agentAcount=w.data.agentList[w.data.agentList.length-1].id:o.agentAcount="",o.status=w.data.status},A=async()=>{if(v.value)return;v.value=!0;const{success:f,data:d}=await E.editUserAgent(o);v.value=!1,f&&(k("success"),K.success(d.msg),u.value=!1)};return(f,d)=>{const a=n("el-form-item"),c=n("el-col"),i=n("el-row"),V=n("el-input"),y=n("el-option"),z=n("el-select"),x=n("el-form"),C=n("el-button"),D=n("el-dialog"),g=I("loading");return _(),U(D,{modelValue:B(u),"onUpdate:modelValue":d[7]||(d[7]=s=>F(u)?u.value=s:null),top:"2vh",title:"\u7F16\u8F91",onOpen:p,draggable:"","close-on-click-modal":!1,width:"620px"},{footer:t(()=>[e(C,{size:"default",onClick:d[6]||(d[6]=s=>u.value=!1)},{default:t(()=>[h("\u53D6 \u6D88")]),_:1}),e(C,{size:"default",type:"primary",onClick:A},{default:t(()=>[h("\u786E \u8BA4")]),_:1})]),default:t(()=>[j((_(),U(x,{size:"default",model:o,"label-width":"90px"},{default:t(()=>[e(i,{gutter:24},{default:t(()=>[e(c,{span:12},{default:t(()=>[e(a,{label:"\u7528\u6237ID"},{default:t(()=>[h(m(w.data.id),1)]),_:1})]),_:1}),e(c,{span:12},{default:t(()=>[e(a,{label:"\u7528\u6237\u540D"},{default:t(()=>[h(m(w.data.user_name),1)]),_:1})]),_:1})]),_:1}),e(a,{label:"\u5BC6\u7801"},{default:t(()=>[e(V,{modelValue:o.password,"onUpdate:modelValue":d[0]||(d[0]=s=>o.password=s),placeholder:"\u4E3A\u7A7A\u4E0D\u4FEE\u6539",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(a,{label:"\u624B\u673A"},{default:t(()=>[e(i,null,{default:t(()=>[e(c,{span:5},{default:t(()=>[e(V,{modelValue:o.area_code,"onUpdate:modelValue":d[1]||(d[1]=s=>o.area_code=s),placeholder:"\u533A\u53F7"},null,8,["modelValue"])]),_:1}),e(c,{span:18,offset:1},{default:t(()=>[e(V,{modelValue:o.mobile,"onUpdate:modelValue":d[2]||(d[2]=s=>o.mobile=s),placeholder:"\u624B\u673A\u53F7"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(a,{label:"\u90AE\u7BB1"},{default:t(()=>[e(V,{modelValue:o.email,"onUpdate:modelValue":d[3]||(d[3]=s=>o.email=s),placeholder:"\u8BF7\u8F93\u5165\u90AE\u7BB1"},null,8,["modelValue"])]),_:1}),e(a,{label:"\u6635\u79F0"},{default:t(()=>[e(V,{modelValue:o.nick_name,"onUpdate:modelValue":d[4]||(d[4]=s=>o.nick_name=s),autocomplete:"off",placeholder:"\u8BF7\u8F93\u5165\u6635\u79F0"},null,8,["modelValue"])]),_:1}),e(a,{label:"\u72B6\u6001"},{default:t(()=>[e(z,{modelValue:o.status,"onUpdate:modelValue":d[5]||(d[5]=s=>o.status=s)},{default:t(()=>[e(y,{label:"\u6B63\u5E38",value:1}),e(y,{label:"\u7981\u7528",value:0})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[g,v.value]])]),_:1},8,["modelValue"])}}},W={class:"g-flex"},X=r("span",null,"\u4EE3\u7406\u5217\u8868",-1),Z={class:"g-flex-justify-end g-flex-1"},ee={key:0,class:"g-green"},le={key:1,class:"g-blue"},te={key:2,class:"g-grey"},ae={key:3,class:"g-red"},oe={key:0},se={class:"g-purple"},ne={class:"g-green"},de={class:"g-red"},ue={class:"g-green"},re={class:"g-green"},ie={class:"g-green"},me={class:"g-red"},_e={class:"g-green"},pe={class:"g-green"},fe={class:"g-green"},ce={class:"g-red g-pointer"},ge={class:"g-blue g-pointer"},we={key:0,class:"g-green"},ve={key:1,class:"g-red"},be={key:2,class:"g-red"},Ve={key:3,class:"g-red"},he={key:4,class:"g-red"},ye={key:5,class:"g-red"},ke={key:6,class:"g-red"},Ue={key:7,class:"g-grey"},ze={__name:"IndexView",setup(L){const k=q(),w=N({addUserAgent:k.auth("addUserAgent"),editUserAgent:k.auth("editUserAgent")}),v=N({loading:!1,total:0,list:[],row:{}}),u=N({userType:"",virtual:"",status:"",search_key:"user_name",search_val:"",date_time:[],page:1,limit:15}),o=$(!1),p=$(!1),A=d=>{v.row=d,p.value=!0},f=async(d=!0)=>{d&&(u.page=1),v.loading=!0;const{success:a,data:c}=await E.getUserAgentList(u);v.loading=!1,a&&(v.list=c.list,v.total=c.total)};return f(),(d,a)=>{const c=n("el-button"),i=n("el-option"),V=n("el-select"),y=n("el-form-item"),z=n("el-date-picker"),x=n("el-input"),C=n("el-col"),D=n("el-row"),g=n("el-form"),s=n("el-table-column"),G=n("el-table"),H=n("el-pagination"),P=n("el-card"),T=I("loading");return _(),U(P,null,{header:t(()=>[r("div",W,[X,r("div",Z,[w.addUserAgent?(_(),U(c,{key:0,type:"success",onClick:a[0]||(a[0]=l=>o.value=!0)},{default:t(()=>[h("\u65B0\u589E\u4EE3\u7406")]),_:1})):S("",!0)])])]),default:t(()=>[e(g,{inline:!0},{default:t(()=>[e(y,{label:"\u8D26\u53F7\u7C7B\u578B"},{default:t(()=>[e(V,{modelValue:u.virtual,"onUpdate:modelValue":a[1]||(a[1]=l=>u.virtual=l),onChange:f},{default:t(()=>[e(i,{label:"\u5168\u90E8",value:""}),e(i,{label:"\u865A\u62DF\u53F7",value:"1"}),e(i,{label:"\u6B63\u5E38",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(y,{label:"\u72B6\u6001"},{default:t(()=>[e(V,{modelValue:u.status,"onUpdate:modelValue":a[2]||(a[2]=l=>u.status=l),onChange:f},{default:t(()=>[e(i,{label:"\u5168\u90E8",value:""}),e(i,{label:"\u6B63\u5E38",value:"1"}),e(i,{label:"\u7981\u7528",value:"0"}),e(i,{label:"\u7981\u6B62\u63D0\u73B0",value:"2"}),e(i,{label:"\u7981\u6B62\u4E0B\u5355",value:"3"}),e(i,{label:"\u7981\u6B62\u63D0\u73B0\u548C\u4E0B\u5355",value:"4"})]),_:1},8,["modelValue"])]),_:1}),e(y,{label:"\u65F6\u95F4"},{default:t(()=>[e(z,{"value-format":"YYYY-MM-DD HH:mm:ss",modelValue:u.date_time,"onUpdate:modelValue":a[3]||(a[3]=l=>u.date_time=l),onChange:f,type:"datetimerange","default-time":[new Date(2e3,1,1,0,0,0),new Date(2e3,1,1,23,59,59)],"range-separator":"\u81F3","start-placeholder":"\u5F00\u59CB\u65E5\u671F","end-placeholder":"\u7ED3\u675F\u65E5\u671F"},null,8,["modelValue","default-time"])]),_:1}),e(y,null,{label:t(()=>[e(V,{modelValue:u.search_key,"onUpdate:modelValue":a[4]||(a[4]=l=>u.search_key=l)},{default:t(()=>[e(i,{label:"\u7528\u6237\u540D",value:"user_name"}),e(i,{label:"\u7528\u6237ID",value:"user_id"}),e(i,{label:"\u4E0A\u7EA7\u4EE3\u7406",value:"agent"})]),_:1},8,["modelValue"])]),default:t(()=>[e(D,null,{default:t(()=>[e(C,{span:18},{default:t(()=>[e(x,{modelValue:u.search_val,"onUpdate:modelValue":a[5]||(a[5]=l=>u.search_val=l),onKeyup:R(f,["enter"]),onClear:f,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(C,{span:5,offset:1},{default:t(()=>[e(c,{type:"primary",onClick:f},{default:t(()=>[h("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),j((_(),U(G,{data:v.list,stripe:"",border:""},{default:t(()=>[e(s,{fixed:"left",label:"\u7528\u6237",width:"120","show-overflow-tooltip":!0},{default:t(l=>[r("div",{class:M({"g-bg-pink":l.row.virtual})},[r("span",null,m(l.row.id),1),l.row.type===1?(_(),b("span",ee,"(\u4F1A\u5458)")):l.row.type===2?(_(),b("span",le,"(\u4EE3\u7406)")):l.row.type===0?(_(),b("span",te,"(\u865A\u62DF\u76D8)")):(_(),b("span",ae,"(\u5F02\u5E38)"))],2)]),_:1}),e(s,{fixed:"left",prop:"user_name",label:"\u7528\u6237\u540D",width:"100","show-overflow-tooltip":!0}),e(s,{label:"\u4E0A\u7EA7ID","min-width":"100","show-overflow-tooltip":!0},{default:t(l=>[l.row.agentList.length>0?(_(),b("div",oe,m(l.row.agentList[l.row.agentList.length-1].id),1)):S("",!0)]),_:1}),e(s,{label:"\u8D60\u9001\u5145\u503C","min-width":"80","show-overflow-tooltip":!0},{default:t(l=>[r("span",se,m(l.row.rechargeGift),1)]),_:1}),e(s,{label:"\u603B\u5145\u63D0\u5DEE","min-width":"80","show-overflow-tooltip":!0},{default:t(l=>[r("span",{class:M(l.row.ks>=0?"g-green":"g-red")},m(l.row.ks),3)]),_:1}),e(s,{label:"\u603B\u5145\u503C","min-width":"80","show-overflow-tooltip":!0},{default:t(l=>[r("div",null,[r("span",ne,m(l.row.recharge),1),h("("+m(l.row.rechargeNums)+"\u7B14)",1)])]),_:1}),e(s,{label:"\u603B\u63D0\u73B0","min-width":"80","show-overflow-tooltip":!0},{default:t(l=>[r("div",null,[r("span",de,m(l.row.withdraw),1),h("("+m(l.row.withdrawNums)+"\u7B14)",1)])]),_:1}),e(s,{label:"\u6CE8\u518C\u4EBA\u6570","min-width":"80","show-overflow-tooltip":!0},{default:t(l=>[r("span",ue,m(l.row.userNums),1)]),_:1}),e(s,{label:"\u56E2\u961F\u4F59\u989D","min-width":"80","show-overflow-tooltip":!0},{default:t(l=>[r("span",re,m(l.row.userBalance),1)]),_:1}),e(s,{label:"\u5145\u63D0\u4EBA\u6570",width:"70"},{default:t(l=>[r("div",null,[r("span",ie,m(l.row.rechargeUserNums),1),h("|"),r("span",me,m(l.row.withdrawUserNums),1)])]),_:1}),e(s,{label:"1\u4EE3\u5145\u503C","min-width":"80","show-overflow-tooltip":!0},{default:t(l=>[r("span",_e,m(l.row.recharge1),1)]),_:1}),e(s,{label:"2\u4EE3\u5145\u503C","min-width":"80","show-overflow-tooltip":!0},{default:t(l=>[r("span",pe,m(l.row.recharge2),1)]),_:1}),e(s,{label:"3\u4EE3\u5145\u503C","min-width":"80","show-overflow-tooltip":!0},{default:t(l=>[r("span",fe,m(l.row.recharge3),1)]),_:1}),e(s,{label:"\u767B\u5F55IP/\u65F6\u95F4",width:"130"},{default:t(l=>[r("div",ce,m(l.row.login_ip),1),r("div",null,m(B(O)(l.row.login_time)),1)]),_:1}),e(s,{label:"\u6CE8\u518CIP/\u65F6\u95F4",width:"130"},{default:t(l=>[r("div",ge,m(l.row.create_ip),1),r("div",null,m(B(O)(l.row.create_time)),1)]),_:1}),e(s,{label:"\u72B6\u6001",width:"110"},{default:t(l=>[l.row.status===1?(_(),b("span",we,"\u6B63\u5E38")):l.row.status===2?(_(),b("span",ve,"\u7981\u6B62\u63D0\u73B0")):l.row.status===3?(_(),b("span",be,"\u7981\u6B62\u4E0B\u5355")):l.row.status===4?(_(),b("span",Ve,"\u7981\u6B62\u63D0\u73B0\u548C\u4E0B\u5355")):l.row.status===0?(_(),b("span",he,"\u7981\u7528")):(_(),b("span",ye,"\u5F02\u5E38")),l.row.isOnline?(_(),b("span",ke,"(\u5728\u7EBF)")):(_(),b("span",Ue,"(\u79BB\u7EBF)"))]),_:1}),w.editUserAgent?(_(),U(s,{key:0,label:"\u64CD\u4F5C",width:"75",fixed:"right"},{default:t(l=>[e(c,{type:"primary",onClick:Ce=>A(l.row)},{default:t(()=>[h("\u7F16\u8F91")]),_:2},1032,["onClick"])]),_:1})):S("",!0)]),_:1},8,["data"])),[[T,v.loading]]),e(H,{"page-sizes":[15,30,60,100],total:v.total,"page-size":u.limit,"onUpdate:page-size":a[6]||(a[6]=l=>u.limit=l),"current-page":u.page,"onUpdate:current-page":a[7]||(a[7]=l=>u.page=l),onCurrentChange:a[8]||(a[8]=l=>f(!1)),onSizeChange:a[9]||(a[9]=l=>f(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),e(J,{onSuccess:f,modelValue:o.value,"onUpdate:modelValue":a[10]||(a[10]=l=>o.value=l)},null,8,["modelValue"]),e(Q,{onSuccess:a[11]||(a[11]=l=>f(!1)),modelValue:p.value,"onUpdate:modelValue":a[12]||(a[12]=l=>p.value=l),data:v.row},null,8,["modelValue","data"])]),_:1})}}};export{ze as default};
