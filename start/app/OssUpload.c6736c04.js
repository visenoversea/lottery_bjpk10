import{v as k,c as C,s as w,e as x,r as T,o as U,a as b,b as B,m as K,p as O,d as j,P as l,aB as I}from"./main.0379baa6.js";import{O as A}from"./aliyun-oss-sdk.e33cd4dc.js";const N={class:"c_oss_upload"},P={class:"c-oss-upload"},D={__name:"OssUpload",props:{limitPng:{type:Array,default(){return["jpeg","gif","jpg","png"]}},idString:{type:String,default(){return"c-upload"}},MidrPath:{type:String,default(){return""}}},emits:["emitUploadSuccess"],setup(d,{expose:u,emit:p}){const m=k.exports.useI18n(),n=C(()=>m.tm("ossUpload")),f=w(),t=d,g=p;function v(){document.getElementById(t.idString).getElementsByClassName("van-uploader__input")[0].click()}u({onUploadClick:v});let a=x("");async function _(){const{success:s,data:e}=await I();return s?new A({region:e.data.oss.region,accessKeyId:e.data.Credentials.AccessKeyId,accessKeySecret:e.data.Credentials.AccessKeySecret,stsToken:e.data.Credentials.SecurityToken,secure:!0,bucket:e.data.oss.bucket,refreshSTSToken:()=>{console.log("\u8FC7\u671F\u4E86")}}):!1}function S(s){console.log("file",s);var e=100*1024*1024;return s.size>e?(l(n.value.uploadSizeText),!1):!0}async function h(s){var e=s.file.name.match(/.[^.]+$/)[0];const o={"Cache-Control":"no-cache"};try{f.loadingShow=!0;let r=t.MidrPath+new Date().getTime()+e;var y=await _();y.multipartUpload(r,s.file,{headers:o}).then(c=>{console.log("res",c);var i=c.res.requestUrls[0].split("?");e.toLowerCase()==".heic"?a.value=i[0]+"?x-oss-process=image/format,jpg":a.value=i[0],g("emitUploadSuccess",a.value)})}catch(r){l(n.value.uploadFailText),console.log("\u4E0A\u4F20\u5931\u8D25",r)}}return(s,e)=>{const o=T("van-uploader");return U(),b("div",N,[B("div",P,[K(j(o,{id:t.idString,"before-read":S,"after-read":h},null,8,["id"]),[[O,!1]])])])}}};export{D as _};
