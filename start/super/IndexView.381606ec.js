import{u as K,r as m,c as o,d as P,o as a,k as w,h as t,f as i,m as h,l as v,g as s,j as T,w as M,e as l,N as q,G as _,i as C,n as U,P as A,E as G}from"./index.59065f7f.js";import{f as V}from"./index.969b688d.js";const O={class:"g-flex"},F=i("span",null,"\u5728\u7EBF\u7528\u6237",-1),H={class:"g-flex-justify-end g-flex-1"},J={key:0,class:"g-green"},Q={key:1,class:"g-red"},R={key:2,class:"g-red"},W={key:3,class:"g-red"},X={key:4,class:"g-red"},Y={key:5,class:"g-red"},Z={key:6,class:"g-red"},ee={key:7,class:"g-grey"},te={key:0,class:"g-green"},se={key:1,class:"g-blue"},ae={key:2,class:"g-grey"},ne={key:3,class:"g-red"},le={class:"g-red"},oe=["onClick"],ie={key:1},re=["onClick"],de={key:1},_e={class:"g-blue"},ue={class:"g-purple"},ce=["onClick"],ge=["onClick"],pe={key:0},he={__name:"IndexView",setup(fe){const L=K(),y=m({offlineUser:L.auth("offlineUser")}),u=m({loading:!1,total:0,list:[],row:{},user_name:"",ip:"",user_id:0,layer:""}),d=m({online:1,search_key:"user_name",search_val:"",date_time:[],page:1,limit:15}),p=async(c=!0)=>{c&&(d.page=1),u.loading=!0;const{success:n,data:g}=await U.getUserList(d);u.loading=!1,n&&(u.list=g.list,u.total=g.total)};p();const x=c=>{A.confirm("\u786E\u8BA4\u8BA9\u7528\u6237\u4E0B\u7EBF?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{u.loading=!0;const{success:n,data:g}=await U.offlineUser({id:c.id});u.loading=!1,n&&(G.success(g.msg),await p(!1))})};return(c,n)=>{const g=o("el-button"),k=o("el-option"),$=o("el-select"),z=o("el-input"),b=o("el-col"),B=o("el-row"),D=o("el-form-item"),I=o("el-form"),r=o("el-table-column"),N=o("el-table"),E=o("el-pagination"),S=o("el-card"),j=P("loading");return a(),w(S,null,{header:t(()=>[i("div",O,[F,i("div",H,[y.addUser?(a(),w(g,{key:0,type:"success",onClick:n[0]||(n[0]=e=>c.addShow=!0)},{default:t(()=>[h("\u65B0\u589E")]),_:1})):v("",!0)])])]),default:t(()=>[s(I,{inline:!0},{default:t(()=>[s(D,null,{label:t(()=>[s($,{modelValue:d.search_key,"onUpdate:modelValue":n[1]||(n[1]=e=>d.search_key=e)},{default:t(()=>[s(k,{label:"\u7528\u6237\u540D",value:"user_name"}),s(k,{label:"\u7528\u6237ID",value:"user_id"})]),_:1},8,["modelValue"])]),default:t(()=>[s(B,null,{default:t(()=>[s(b,{span:18},{default:t(()=>[s(z,{modelValue:d.search_val,"onUpdate:modelValue":n[2]||(n[2]=e=>d.search_val=e),onKeyup:T(p,["enter"]),onClear:p,placeholder:"\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9",clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),s(b,{span:5,offset:1},{default:t(()=>[s(g,{type:"primary",onClick:p},{default:t(()=>[h("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),M((a(),w(N,{data:u.list,stripe:"",border:""},{default:t(()=>[s(r,{label:"\u72B6\u6001",width:"80"},{default:t(e=>[e.row.status===1?(a(),l("span",J,"\u6B63\u5E38")):e.row.status===2?(a(),l("span",Q,"\u7981\u6B62\u63D0\u73B0")):e.row.status===3?(a(),l("span",R,"\u7981\u6B62\u4E0B\u5355")):e.row.status===4?(a(),l("span",W,"\u7981\u6B62\u4E0B\u5355\u63D0\u73B0")):e.row.status===0?(a(),l("span",X,"\u7981\u7528")):(a(),l("span",Y,"\u5F02\u5E38")),e.row.isOnline?(a(),l("span",Z,"(\u5728\u7EBF)")):(a(),l("span",ee,"(\u79BB\u7EBF)"))]),_:1}),s(r,{label:"\u7528\u6237ID",width:"120"},{default:t(e=>[i("div",{class:q({"g-bg-pink":e.row.virtual})},[i("span",null,_(e.row.id),1),e.row.type===1?(a(),l("span",te,"(\u4F1A\u5458)")):e.row.type===2?(a(),l("span",se,"(\u4EE3\u7406)")):e.row.type===0?(a(),l("span",ae,"(\u865A\u62DF\u76D8)")):(a(),l("span",ne,"(\u5F02\u5E38)"))],2)]),_:1}),s(r,{label:"\u5C42\u7EA7",width:"45"},{default:t(e=>[i("span",le,_(e.row.layer)+"\u4EE3",1)]),_:1}),s(r,{prop:"user_name",label:"\u7528\u6237\u540D",width:"100"}),s(r,{label:"\u603B\u4EE3\u7406","min-width":"100"},{default:t(e=>[e.row.agentList.length>0?(a(),l("span",{key:0,class:"g-red g-pointer",onClick:f=>c.spread(e.row.agentList[0].id)},_(e.row.agentList[0].user_name),9,oe)):(a(),l("span",ie,"-"))]),_:1}),s(r,{label:"\u4E0A\u7EA7\u4EE3\u7406","min-width":"100"},{default:t(e=>[e.row.agentList.length>0?(a(),l("span",{key:0,class:"g-blue g-pointer",onClick:f=>c.spread(e.row.agentList[e.row.agentList.length-1].id)},_(e.row.agentList[e.row.agentList.length-1].user_name),9,re)):(a(),l("span",de,"-"))]),_:1}),s(r,{label:"\u4F59\u989D",width:"80"},{default:t(e=>[i("span",_e,_(e.row.balance),1)]),_:1}),s(r,{label:"\u767B\u5F55\u5730\u533A",width:"130"},{default:t(e=>[i("span",ue,_(e.row.ipAddress),1)]),_:1}),s(r,{label:"\u767B\u5F55IP/\u65F6\u95F4",width:"130"},{default:t(e=>[i("div",{class:"g-red g-pointer",onClick:f=>c.ip(e.row.user_name,"")},_(e.row.login_ip),9,ce),i("div",null,_(C(V)(e.row.login_time)),1)]),_:1}),s(r,{label:"\u6CE8\u518CIP/\u65F6\u95F4",width:"130"},{default:t(e=>[i("div",{class:"g-blue g-pointer",onClick:f=>c.ip("",e.row.create_ip)},_(e.row.create_ip),9,ge),i("div",null,_(C(V)(e.row.create_time)),1)]),_:1}),s(r,{label:"\u64CD\u4F5C",width:"130",fixed:"right"},{default:t(e=>[y.offlineUser?(a(),l("div",pe,[s(g,{type:"success",onClick:f=>x(e.row)},{default:t(()=>[h("\u5F3A\u5236\u4E0B\u7EBF")]),_:2},1032,["onClick"])])):v("",!0)]),_:1})]),_:1},8,["data"])),[[j,u.loading]]),s(E,{"page-sizes":[15,30,60,100],total:u.total,"page-size":d.limit,"onUpdate:page-size":n[3]||(n[3]=e=>d.limit=e),"current-page":d.page,"onUpdate:current-page":n[4]||(n[4]=e=>d.page=e),onCurrentChange:n[5]||(n[5]=e=>p(!1)),onSizeChange:n[6]||(n[6]=e=>p(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"])]),_:1})}}};export{he as default};
