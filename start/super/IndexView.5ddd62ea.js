import{a as C,r as y,c as r,d as B,o as u,k as _,h as a,w as L,g as e,f as n,G as p,i as d,m as f,n as g,P as D,E as V}from"./index.cf99acbd.js";import{_ as E}from"./UploadButton.1685c013.js";import{f as m}from"./index.969b688d.js";const M=n("div",{class:"g-flex"},[n("span",null,"\u8BED\u8A00\u914D\u7F6E")],-1),N={style:{"padding-bottom":"12px","text-align":"center"}},P={__name:"IndexView",setup(T){const w=C(),o=y({loading:!1,list:[]});(async()=>{o.loading=!0;const{success:i,data:s}=await g.getLangConfig();o.loading=!1,i&&(o.list=s.list)})();const h=i=>{D.confirm("\u751F\u6210\u7FFB\u8BD1\u6587\u4EF6?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{o.loading=!0;const{success:s,data:t}=await g.langConfigMakeFile({id:i.id});o.loading=!1,s&&V.success(t.msg)})};return(i,s)=>{const t=r("el-table-column"),c=r("el-button"),b=r("el-table"),v=r("el-card"),x=B("loading");return u(),_(v,null,{header:a(()=>[M]),default:a(()=>[L((u(),_(b,{data:o.list,stripe:"",border:""},{default:a(()=>[e(t,{prop:"id",label:"id",width:"100","show-overflow-tooltip":!0}),e(t,{prop:"title",label:"\u6807\u9898",width:"100","show-overflow-tooltip":!0}),e(t,{prop:"lang",label:"\u9ED8\u8BA4\u8BED\u8A00",width:"100","show-overflow-tooltip":!0}),e(t,{prop:"remark",label:"\u5907\u6CE8","min-width":"80","show-overflow-tooltip":!0}),e(t,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:a(l=>[n("span",null,p(d(m)(l.row.create_time)),1)]),_:1}),e(t,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:a(l=>[n("span",null,p(d(m)(l.row.modify_time)),1)]),_:1}),e(t,{label:"\u64CD\u4F5C",width:"170",fixed:"right"},{default:a(l=>[n("div",N,[e(c,{type:"success",onClick:k=>d(w).push({name:"LangConfigList",params:{id:l.row.id}})},{default:a(()=>[f("\u67E5\u770B\u5217\u8868")]),_:2},1032,["onClick"])]),n("div",null,[e(c,{type:"danger",onClick:k=>h(l.row)},{default:a(()=>[f("\u751F\u6210\u6587\u4EF6")]),_:2},1032,["onClick"]),e(E,{"api-url":"uploadLangConfig",data:{id:l.row.id}},null,8,["data"])])]),_:1})]),_:1},8,["data"])),[[x,o.loading]])]),_:1})}}};export{P as default};
