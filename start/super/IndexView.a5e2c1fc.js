import{u as C,v as f}from"./index.1529e9fa.js";import{r as V,c as s,d as B,o as l,k as m,h as t,w as u,e as d,F as g,g as n,f as i,G as v,m as y,l as k,E as w,n as N}from"./index.dae49c5b.js";import"./_plugin-vue_export-helper.90cad5bc.js";const z=i("div",{class:"g-flex"},[i("span",null,"\u63A8\u5E7F\u94FE\u63A5")],-1),D={style:{"padding-right":"10px"}},E={style:{"padding-right":"10px"}},I={__name:"IndexView",setup(L){const{toClipboard:x}=C(),e=V({loading:!1,info:{downUrl:"",promoteUrl:""}}),c=async a=>{try{await x(a),w.success("\u590D\u5236\u6210\u529F")}catch(o){console.error(o),w.error("\u590D\u5236\u5931\u8D25")}};return(async()=>{e.loading=!0;const{success:a,data:o}=await N.getUserAgentLink();e.loading=!1,a&&(e.info=o.info)})(),(a,o)=>{const p=s("el-button"),r=s("el-form-item"),U=s("el-form"),b=s("el-card"),_=B("loading");return l(),m(b,{class:"v_user_agent_link"},{header:t(()=>[z]),default:t(()=>[u((l(),d("div",null,[u((l(),m(U,{size:"default","label-width":"120px"},{default:t(()=>[e.info.promoteUrl?(l(),d(g,{key:0},[n(r,{label:"\u63A8\u5E7F\u94FE\u63A5\uFF1A"},{default:t(()=>[i("span",D,v(e.info.promoteUrl),1),n(p,{onClick:o[0]||(o[0]=h=>c(e.info.promoteUrl)),type:"primary"},{default:t(()=>[y("\u590D\u5236")]),_:1})]),_:1}),n(r,{label:"\u4E8C\u7EF4\u7801\uFF1A"},{default:t(()=>[n(f,{text:e.info.promoteUrl,margin:10,size:200},null,8,["text"])]),_:1})],64)):k("",!0),e.info.downUrl?(l(),d(g,{key:1},[n(r,{label:"\u4E0B\u8F7D\u94FE\u63A5\uFF1A"},{default:t(()=>[i("span",E,v(e.info.downUrl),1),n(p,{onClick:o[1]||(o[1]=h=>c(e.info.downUrl)),type:"primary"},{default:t(()=>[y("\u590D\u5236")]),_:1})]),_:1}),n(r,{label:"\u4E0B\u8F7D\u4E8C\u7EF4\u7801\uFF1A"},{default:t(()=>[n(f,{text:e.info.downUrl,margin:10,size:200},null,8,["text"])]),_:1})],64)):k("",!0)]),_:1})),[[_,a.loading]])])),[[_,e.loading]])]),_:1})}}};export{I as default};
