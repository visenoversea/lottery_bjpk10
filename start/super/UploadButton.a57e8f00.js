import{b as u,c as i,d as f,w as _,o as m,k as g,h as r,g as y,m as v,G as h,n as b,E as w}from"./index.2c7715ac.js";const D={__name:"UploadButton",props:{data:{type:Object,default(){return{type:"",path:""}}},label:{type:String,default:"\u4E0A\u4F20"},apiUrl:{type:String,default(){return"uploadFile"}}},emits:["success"],setup(c,{emit:p}){const l=c,o=u(!1),d=async e=>{let t=new FormData;t.append("file",e.file);for(let s in e.data)t.append(s,e.data[s]);o.value=!0;const{success:n,data:a}=await b[l.apiUrl](t);o.value=!1,n&&(w.success(a.msg),p("success",a))};return(e,t)=>{const n=i("el-button"),a=i("el-upload"),s=f("loading");return _((m(),g(a,{style:{display:"inline-flex",padding:"0 12px"},data:l.data,"http-request":d,"show-file-list":!1},{default:r(()=>[y(n,{type:"primary"},{default:r(()=>[v(h(l.label),1)]),_:1})]),_:1},8,["data"])),[[s,o.value]])}}};export{D as _};
