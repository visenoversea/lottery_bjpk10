import{b as z,M,r as D,c as s,d as I,o as V,k as b,h as l,g as e,m as x,w as O,G as B,Q as j,i as $,O as q,n as S,E as G,l as Q,e as C,f as y}from"./index.41d7bbc0.js";import{f as N}from"./index.969b688d.js";const R={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(E,{emit:i}){const d=E,c=z(!1),f=M({get:()=>d.modelValue,set:_=>{i("update:modelValue",_)}}),a=D({id:0,title:"",img:"",nums:"10",min:"0",max:"0",min_rate:"0.01",max_rate:"0.01",reward:"0",amount:"",spread_nums:"0",status:1}),w=()=>{a.id=d.data.id,a.title=d.data.title,a.img=d.data.img,a.nums=d.data.nums,a.min=d.data.min,a.max=d.data.max,a.min_rate=d.data.min_rate,a.max_rate=d.data.max_rate,a.reward=d.data.reward,a.amount=d.data.amount,a.spread_nums=d.data.spread_nums,a.status=d.data.status},p=async()=>{if(c.value)return;c.value=!0;const{success:_,data:t}=await S.editLevel(a);c.value=!1,_&&(i("success"),G.success(t.msg),f.value=!1)};return(_,t)=>{const r=s("el-input"),m=s("el-form-item"),o=s("el-col"),g=s("el-option"),U=s("el-select"),k=s("el-row"),h=s("el-form"),v=s("el-button"),u=s("el-dialog"),L=I("loading");return V(),b(u,{modelValue:$(f),"onUpdate:modelValue":t[13]||(t[13]=n=>q(f)?f.value=n:null),top:"5vh",title:"\u7F16\u8F91",onOpen:w,draggable:"","close-on-click-modal":!1,width:"680px"},{footer:l(()=>[e(v,{size:"default",onClick:t[12]||(t[12]=n=>f.value=!1)},{default:l(()=>[x("\u53D6 \u6D88")]),_:1}),e(v,{size:"default",type:"primary",onClick:p},{default:l(()=>[x("\u786E \u8BA4")]),_:1})]),default:l(()=>[O((V(),b(h,{size:"default",model:a,"label-width":"90px"},{default:l(()=>[e(k,{gutter:24},{default:l(()=>[e(o,{span:12},{default:l(()=>[e(m,{label:"\u6807\u9898",prop:"title"},{default:l(()=>[e(r,{modelValue:a.title,"onUpdate:modelValue":t[0]||(t[0]=n=>a.title=n),placeholder:"\u8BF7\u8F93\u5165\u8BED\u8A00",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"ID"},{default:l(()=>[x(B(d.data.id),1)]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u56FE\u6807",prop:"icon"},{default:l(()=>[e(j,{modelValue:a.img,"onUpdate:modelValue":t[1]||(t[1]=n=>a.img=n)},null,8,["modelValue"]),e(r,{modelValue:a.img,"onUpdate:modelValue":t[2]||(t[2]=n=>a.img=n)},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u91CF\u5316\u6B21\u6570",prop:"nums"},{default:l(()=>[e(r,{modelValue:a.nums,"onUpdate:modelValue":t[3]||(t[3]=n=>a.nums=n),placeholder:"\u8BF7\u8F93\u5165\u91CF\u5316\u6B21\u6570",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u6700\u5C0F\u4F59\u989D",prop:"min_rate"},{default:l(()=>[e(r,{modelValue:a.min,"onUpdate:modelValue":t[4]||(t[4]=n=>a.min=n),placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u6536\u76CA",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u6700\u5927\u4F59\u989D",prop:"max_rate"},{default:l(()=>[e(r,{modelValue:a.max,"onUpdate:modelValue":t[5]||(t[5]=n=>a.max=n),placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u6536\u76CA",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u6700\u5C0F\u6536\u76CA",prop:"min_rate"},{default:l(()=>[e(r,{modelValue:a.min_rate,"onUpdate:modelValue":t[6]||(t[6]=n=>a.min_rate=n),placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u6536\u76CA",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u6700\u5927\u6536\u76CA",prop:"max_rate"},{default:l(()=>[e(r,{modelValue:a.max_rate,"onUpdate:modelValue":t[7]||(t[7]=n=>a.max_rate=n),placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u6536\u76CA",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u91D1\u989D\u8981\u6C42",prop:"amount"},{default:l(()=>[e(r,{modelValue:a.amount,"onUpdate:modelValue":t[8]||(t[8]=n=>a.amount=n),placeholder:"\u8BF7\u8F93\u5165\u91D1\u989D\u6700\u4F4E\u664B\u7EA7\u6761\u4EF6",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u63A8\u5E7F\u4EBA\u6570",prop:"spread_nums"},{default:l(()=>[e(r,{modelValue:a.spread_nums,"onUpdate:modelValue":t[9]||(t[9]=n=>a.spread_nums=n),placeholder:"\u8BF7\u8F93\u5165\u63A8\u5E7F\u4EBA\u6570",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u664B\u7EA7\u5956\u52B1",prop:"reward"},{default:l(()=>[e(r,{modelValue:a.reward,"onUpdate:modelValue":t[10]||(t[10]=n=>a.reward=n),placeholder:"\u8BF7\u8F93\u5165\u664B\u7EA7\u5956\u52B1",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u72B6\u6001"},{default:l(()=>[e(U,{modelValue:a.status,"onUpdate:modelValue":t[11]||(t[11]=n=>a.status=n)},{default:l(()=>[e(g,{label:"\u6B63\u5E38",value:1}),e(g,{label:"\u7981\u7528",value:0})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])),[[L,c.value]])]),_:1},8,["modelValue"])}}},T=y("div",{class:"g-flex"},[y("span",null,"\u7B49\u7EA7\u914D\u7F6E")],-1),A={key:0,class:"g-green"},F={key:1,class:"g-red"},H={key:2,class:"g-red"},P={__name:"IndexView",setup(E){const i=D({loading:!1,list:[],row:{}}),d=D({status:""}),c=async(w=!0)=>{w&&(d.page=1),i.loading=!0;const{success:p,data:_}=await S.getLevelList(d);i.loading=!1,p&&(i.list=_.list)};c();const f=z(!1),a=w=>{i.row=w,f.value=!0};return(w,p)=>{const _=s("el-option"),t=s("el-select"),r=s("el-form-item"),m=s("el-form"),o=s("el-table-column"),g=s("el-image"),U=s("el-button"),k=s("el-table"),h=s("el-card"),v=I("loading");return V(),b(h,null,{header:l(()=>[T]),default:l(()=>[e(m,{inline:!0},{default:l(()=>[e(r,{label:"\u72B6\u6001"},{default:l(()=>[e(t,{modelValue:d.status,"onUpdate:modelValue":p[0]||(p[0]=u=>d.status=u),onChange:c},{default:l(()=>[e(_,{label:"\u5168\u90E8",value:""}),e(_,{label:"\u6B63\u5E38",value:"1"}),e(_,{label:"\u7981\u7528",value:"0"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),O((V(),b(k,{data:i.list,stripe:"",border:""},{default:l(()=>[e(o,{prop:"id",label:"ID",width:"50"}),e(o,{prop:"title",label:"\u6807\u9898","min-width":"100"}),e(o,{label:"\u56FE\u6807",width:"150"},{default:l(u=>[u.row.img?(V(),b(g,{key:0,src:u.row.img,"preview-src-list":[u.row.img],fit:"contain","hide-on-click-modal":"","preview-teleported":""},null,8,["src","preview-src-list"])):Q("",!0)]),_:1}),e(o,{prop:"nums",label:"\u91CF\u5316\u6B21\u6570","min-width":"100"}),e(o,{prop:"min",label:"\u6700\u5C0F\u4F59\u989D","min-width":"100"}),e(o,{prop:"max",label:"\u6700\u5927\u4F59\u989D","min-width":"100"}),e(o,{prop:"min_rate",label:"\u6700\u5C0F\u6536\u76CA","min-width":"100"}),e(o,{prop:"max_rate",label:"\u6700\u5927\u6536\u76CA","min-width":"100"}),e(o,{prop:"reward",label:"\u664B\u7EA7\u5956\u52B1","min-width":"100"}),e(o,{prop:"amount",label:"\u91D1\u989D\u8981\u6C42","min-width":"100"}),e(o,{prop:"spread_nums",label:"\u63A8\u5E7F\u4EBA\u6570\u8981\u6C42","min-width":"100"}),e(o,{label:"\u72B6\u6001",width:"80"},{default:l(u=>[u.row.status===1?(V(),C("span",A,"\u6B63\u5E38")):u.row.status===0?(V(),C("span",F,"\u7981\u7528")):(V(),C("span",H,"\u5F02\u5E38"))]),_:1}),e(o,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:l(u=>[y("span",null,B($(N)(u.row.create_time)),1)]),_:1}),e(o,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:l(u=>[y("span",null,B($(N)(u.row.modify_time)),1)]),_:1}),e(o,{label:"\u64CD\u4F5C",width:"80",fixed:"right"},{default:l(u=>[e(U,{type:"primary",onClick:L=>a(u.row)},{default:l(()=>[x("\u7F16\u8F91")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[v,i.loading]]),e(R,{onSuccess:p[1]||(p[1]=u=>c(!1)),modelValue:f.value,"onUpdate:modelValue":p[2]||(p[2]=u=>f.value=u),data:i.row},null,8,["modelValue","data"])]),_:1})}}};export{P as default};
