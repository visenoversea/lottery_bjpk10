import{r as u,c as n,d as N,o as m,k as g,h as t,g as a,w as k,f as l,G as s,m as f,N as V,n as D}from"./index.536bf181.js";import"./index.f2e9d2c9.js";const y=l("div",{class:"g-flex"},[l("span",null,"\u8D44\u91D1\u62A5\u8868")],-1),C={class:"g-purple"},Y={class:"g-purple"},B={class:"g-purple"},R={class:"g-blue"},G={class:"g-blue"},H={class:"g-green"},L={class:"g-green"},M={class:"g-red"},I={__name:"IndexView",setup(q){const r=u({loading:!1,list:[]}),i=u({date_time:[]}),c=async(p=!0)=>{p&&(i.page=1),r.loading=!0;const{success:d,data:_}=await D.getReportList(i);r.loading=!1,d&&(r.list=_.list)};return c(),(p,d)=>{const _=n("el-date-picker"),h=n("el-form-item"),w=n("el-form"),o=n("el-table-column"),b=n("el-table"),x=n("el-card"),v=N("loading");return m(),g(x,null,{header:t(()=>[y]),default:t(()=>[a(w,{inline:!0},{default:t(()=>[a(h,{label:"\u65F6\u95F4"},{default:t(()=>[a(_,{"value-format":"YYYY-MM-DD HH:mm:ss",modelValue:i.date_time,"onUpdate:modelValue":d[0]||(d[0]=e=>i.date_time=e),onChange:c,type:"daterange","range-separator":"\u81F3","start-placeholder":"\u5F00\u59CB\u65E5\u671F","end-placeholder":"\u7ED3\u675F\u65E5\u671F"},null,8,["modelValue"])]),_:1})]),_:1}),k((m(),g(b,{data:r.list,stripe:"",border:""},{default:t(()=>[a(o,{prop:"date",label:"\u65E5\u671F",width:"100"}),a(o,{label:"\u6CE8\u518C\u4EBA\u6570",width:"65px"},{default:t(e=>[l("span",C,s(e.row.userNums),1)]),_:1}),a(o,{label:"\u8FD4\u4F63\u6536\u76CA",width:"80px"},{default:t(e=>[l("span",Y,s(e.row.commission),1)]),_:1}),a(o,{label:"\u5408\u8BA1\u6536\u76CA",width:"80px"},{default:t(e=>[l("span",B,s(e.row.totalProfit),1)]),_:1}),a(o,{label:"\u9996\u5145\u7528\u6237",width:"65px"},{default:t(e=>[l("span",R,s(e.row.firstRechargeNums),1)]),_:1}),a(o,{label:"\u9996\u5145\u91D1\u989D"},{default:t(e=>[l("span",G,s(e.row.firstRechargeAmount),1)]),_:1}),a(o,{label:"\u8D60\u9001\u5145\u503C",width:"80px"},{default:t(e=>[l("span",H,s(e.row.rechargeGift),1)]),_:1}),a(o,{label:"\u5B9E\u9645\u5145\u503C","min-width":"80px"},{default:t(e=>[l("div",null,[l("span",L,s(e.row.recharge),1),f("("+s(e.row.rechargeNums)+"\u7B14)",1)])]),_:1}),a(o,{label:"\u5B9E\u9645\u63D0\u73B0","min-width":"80px"},{default:t(e=>[l("div",null,[l("span",M,s(e.row.withdraw),1),f("("+s(e.row.withdrawNums)+"\u7B14)",1)])]),_:1}),a(o,{label:"\u603B\u5145\u63D0\u5DEE","min-width":"80px"},{default:t(e=>[l("span",{class:V(e.row.kesun>=0?"g-green":"g-red")},s(e.row.kesun),3)]),_:1})]),_:1},8,["data"])),[[v,r.loading]])]),_:1})}}};export{I as default};
