import{E as c,o as s,d as a,G as l}from"./index.1312342d.js";const u=(t,e)=>{const o=t.__vccOpts||t;for(const[r,n]of e)o[r]=n;return o},f=c({beforeRouteEnter(t,e,o){console.log("from.query",e.query),console.log("from.fullPath",e.fullPath),o(()=>{l.replace({path:e.fullPath,query:e.query})})}});function p(t,e,o,r,n,_){return s(),a("div")}const h=u(f,[["render",p]]);export{h as default};