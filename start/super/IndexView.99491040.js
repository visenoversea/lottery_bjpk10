import{r as I,c as i,d as B,o as n,k as c,h as s,f as u,g as f,m as L,e as g,F as m,D as p,w as N,L as E,i as F,l as T,n as d,E as h}from"./index.2c7715ac.js";import{f as j}from"./index.c83ada2c.js";const z={class:"g-flex"},M=u("span",null,"\u5168\u5C40\u914D\u7F6E",-1),U={class:"g-flex-justify-end g-flex-1"},H={__name:"IndexView",setup(q){const e=I({list:[],activeIndex:"",loading:!1}),v=async t=>{e.loading=!0;const{success:a,data:l}=await d.getConfigItem({id:t.id});e.loading=!1,a&&(t.children=l.list)},x=async()=>{e.loading=!0;const{success:t,data:a}=await d.getConfigList({status:1});e.loading=!1,t&&(e.list=a.list,e.list.length>0&&(e.activeIndex=0))},y=t=>{v(e.list[t])},C=async()=>{if(e.activeIndex===""){h.error("\u8BF7\u9009\u62E9\u8981\u4FEE\u6539\u7684\u914D\u7F6E");return}const t=e.list[e.activeIndex].children;e.loading=!0;const{success:a,data:l}=await d.editDataConfig({list:t});e.loading=!1,a&&h.success(l.msg)};return x(),(t,a)=>{const l=i("el-button"),b=i("el-form"),k=i("el-tab-pane"),V=i("el-tabs"),w=i("el-card"),D=B("loading");return n(),c(w,null,{header:s(()=>[u("div",z,[M,u("div",U,[f(l,{type:"primary",onClick:C},{default:s(()=>[L("\u4FDD\u5B58")]),_:1})])])]),default:s(()=>[f(V,{modelValue:e.activeIndex,"onUpdate:modelValue":a[0]||(a[0]=o=>e.activeIndex=o),style:{"min-height":"480px"},"tab-position":"left",onTabChange:y},{default:s(()=>[(n(!0),g(m,null,p(e.list,(o,_)=>N((n(),c(k,{key:_,label:o.title,name:_},{default:s(()=>[o.children?(n(),c(b,{key:0,size:"default"},{default:s(()=>[(n(!0),g(m,null,p(o.children,r=>(n(),c(E(F(j)[r.type]),{key:r.id,item:r},null,8,["item"]))),128))]),_:2},1024)):T("",!0)]),_:2},1032,["label","name"])),[[D,e.loading]])),128))]),_:1},8,["modelValue"])]),_:1})}}};export{H as default};
