import{u as y,c as k,s as C,g as w,r as T,o as U,a as b,b as x,p as K,v as O,e as B,Q as l,aD as j}from"./main.ed929957.js";import{O as A}from"./aliyun-oss-sdk.92793428.js";const I={class:"c_oss_upload"},N={class:"c-oss-upload"},E={__name:"OssUpload",props:{limitPng:{type:Array,default(){return["jpeg","gif","jpg","png"]}},idString:{type:String,default(){return"c-upload"}},MidrPath:{type:String,default(){return""}}},emits:["emitUploadSuccess"],setup(u,{expose:d,emit:p}){const t=u,f=y(),n=k(()=>f.tm("ossUpload")),m=C();function g(){document.getElementById(t.idString).getElementsByClassName("van-uploader__input")[0].click()}d({onUploadClick:g});let s=w("");async function _(){const{success:a,data:e}=await j();return a?new A({region:e.data.oss.region,accessKeyId:e.data.Credentials.AccessKeyId,accessKeySecret:e.data.Credentials.AccessKeySecret,stsToken:e.data.Credentials.SecurityToken,secure:!0,bucket:e.data.oss.bucket,refreshSTSToken:()=>{console.log("\u8FC7\u671F\u4E86")}}):!1}function v(a){console.log("file",a);var e=100*1024*1024;return a.size>e?(l(n.value.uploadSizeText),!1):!0}async function S(a){var e=a.file.name.match(/.[^.]+$/)[0];const o={"Cache-Control":"no-cache"};try{m.loadingShow=!0;let r=t.MidrPath+new Date().getTime()+e;var h=await _();h.multipartUpload(r,a.file,{headers:o}).then(c=>{console.log("res",c);var i=c.res.requestUrls[0].split("?");e.toLowerCase()==".heic"?s.value=i[0]+"?x-oss-process=image/format,jpg":s.value=i[0],p("emitUploadSuccess",s.value)})}catch(r){l(n.value.uploadFailText),console.log("\u4E0A\u4F20\u5931\u8D25",r)}}return(a,e)=>{const o=T("van-uploader");return U(),b("div",I,[x("div",N,[K(B(o,{id:t.idString,"before-read":v,"after-read":S},null,8,["id"]),[[O,!1]])])])}}};export{E as _};
