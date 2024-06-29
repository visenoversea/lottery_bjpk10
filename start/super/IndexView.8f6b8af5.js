import{r as v,c as s,d as N,o as p,k as _,h as a,g as t,j as y,m as k,w as S,e as g,f as m,G as C,l as T,i as j,n as h,P as I,E as L}from"./index.0c71b455.js";import{f as M}from"./index.969b688d.js";import{_ as q}from"./UploadButton.cf8d2d59.js";const G=m("div",{class:"g-flex"},[m("span",null,"\u56FE\u7247\u914D\u7F6E")],-1),P={key:0,class:"g-green"},A={key:1,class:"g-red"},F={key:2,class:"g-red"},H=["onClick"],W={__name:"IndexView",setup(J){const i=v({loading:!1,total:0,list:[],row:{}}),o=v({code:"",title:"",status:"",page:1,limit:15}),n=async(u=!0)=>{u&&(o.page=1),i.loading=!0;const{success:l,data:d}=await h.getBannerList(o);i.loading=!1,l&&(i.list=d.list,i.total=d.total)};n();const V=u=>{o.code=u,n()},x=u=>{I.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{i.loading=!0;const{success:l,data:d}=await h.delBanner({id:u.id});i.loading=!1,l&&(L.success(d.msg),await n(!1))})};return(u,l)=>{const d=s("el-option"),B=s("el-select"),c=s("el-form-item"),f=s("el-input"),w=s("el-button"),z=s("el-form"),r=s("el-table-column"),$=s("el-image"),D=s("el-table"),K=s("el-pagination"),U=s("el-card"),E=N("loading");return p(),_(U,null,{header:a(()=>[G]),default:a(()=>[t(z,{inline:!0},{default:a(()=>[t(c,{label:"\u72B6\u6001"},{default:a(()=>[t(B,{modelValue:o.status,"onUpdate:modelValue":l[0]||(l[0]=e=>o.status=e),onChange:n},{default:a(()=>[t(d,{label:"\u5168\u90E8",value:""}),t(d,{label:"\u6B63\u5E38",value:"1"}),t(d,{label:"\u7981\u7528",value:"0"})]),_:1},8,["modelValue"])]),_:1}),t(c,{label:"\u6807\u9898"},{default:a(()=>[t(f,{modelValue:o.title,"onUpdate:modelValue":l[1]||(l[1]=e=>o.title=e),onKeyup:y(n,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",onClear:n,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),t(c,{label:"\u7F16\u7801"},{default:a(()=>[t(f,{modelValue:o.code,"onUpdate:modelValue":l[2]||(l[2]=e=>o.code=e),onKeyup:y(n,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u7F16\u7801",onClear:n,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),t(c,null,{default:a(()=>[t(w,{type:"primary",onClick:n},{default:a(()=>[k("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1}),S((p(),_(D,{data:i.list,stripe:"",border:""},{default:a(()=>[t(r,{prop:"id",label:"ID",width:"50"}),t(r,{label:"\u72B6\u6001",width:"80"},{default:a(e=>[e.row.status===1?(p(),g("span",P,"\u6B63\u5E38")):e.row.status===0?(p(),g("span",A,"\u7981\u7528")):(p(),g("span",F,"\u5F02\u5E38"))]),_:1}),t(r,{prop:"title",label:"\u6807\u9898","min-width":"100"}),t(r,{label:"\u7F16\u7801",width:"100"},{default:a(e=>[m("div",{class:"g-pointer",onClick:b=>V(e.row.code)},C(e.row.code),9,H)]),_:1}),t(r,{label:"\u56FE\u7247",width:"150"},{default:a(e=>[e.row.img?(p(),_($,{key:0,src:e.row.img,"preview-src-list":[e.row.img],fit:"contain","hide-on-click-modal":"","preview-teleported":""},null,8,["src","preview-src-list"])):T("",!0)]),_:1}),t(r,{prop:"remark",label:"\u5907\u6CE8","min-width":"80","show-overflow-tooltip":!0}),t(r,{prop:"sort",label:"\u6392\u5E8F",width:"80","show-overflow-tooltip":!0}),t(r,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:a(e=>[m("span",null,C(j(M)(e.row.modify_time)),1)]),_:1}),t(r,{align:"center",label:"\u64CD\u4F5C",width:"140",fixed:"right"},{default:a(e=>[t(q,{onSuccess:l[3]||(l[3]=b=>n(!1)),"api-url":"uploadBanner",data:{id:e.row.id}},null,8,["data"]),t(w,{type:"danger",onClick:b=>x(e.row)},{default:a(()=>[k("\u5220\u9664")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[E,i.loading]]),t(K,{"page-sizes":[15,30,60,100],total:i.total,"page-size":o.limit,"onUpdate:page-size":l[4]||(l[4]=e=>o.limit=e),"current-page":o.page,"onUpdate:current-page":l[5]||(l[5]=e=>o.page=e),onCurrentChange:l[6]||(l[6]=e=>n(!1)),onSizeChange:l[7]||(l[7]=e=>n(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"])]),_:1})}}};export{W as default};
