import{b as z,M,r as D,c as u,d as I,o as V,k as b,h as l,g as e,m as x,w as O,G as B,Q as j,i as $,O as q,n as S,E as G,l as Q,e as h,f as y}from"./index.854edcb2.js";import{f as N}from"./index.15917a18.js";const R={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(E,{emit:i}){const s=E,c=z(!1),f=M({get:()=>s.modelValue,set:p=>{i("update:modelValue",p)}}),t=D({id:0,title:"",img:"",min:"0",max:"0",reward:"0",fee:"0",amount:"",spread_nums:"0",spread_level:1,status:1}),w=()=>{t.id=s.data.id,t.title=s.data.title,t.img=s.data.img,t.min=s.data.min,t.max=s.data.max,t.reward=s.data.reward,t.fee=s.data.fee,t.amount=s.data.amount,t.spread_level=s.data.spread_level,t.spread_nums=s.data.spread_nums,t.status=s.data.status},r=async()=>{if(c.value)return;c.value=!0;const{success:p,data:a}=await S.editLevel(t);c.value=!1,p&&(i("success"),G.success(a.msg),f.value=!1)};return(p,a)=>{const _=u("el-input"),m=u("el-form-item"),o=u("el-col"),g=u("el-option"),k=u("el-select"),U=u("el-row"),C=u("el-form"),v=u("el-button"),d=u("el-dialog"),L=I("loading");return V(),b(d,{modelValue:$(f),"onUpdate:modelValue":a[11]||(a[11]=n=>q(f)?f.value=n:null),top:"5vh",title:"\u7F16\u8F91",onOpen:w,draggable:"","close-on-click-modal":!1,width:"680px"},{footer:l(()=>[e(v,{size:"default",onClick:a[10]||(a[10]=n=>f.value=!1)},{default:l(()=>[x("\u53D6 \u6D88")]),_:1}),e(v,{size:"default",type:"primary",onClick:r},{default:l(()=>[x("\u786E \u8BA4")]),_:1})]),default:l(()=>[O((V(),b(C,{size:"default",model:t,"label-width":"120px"},{default:l(()=>[e(U,{gutter:24},{default:l(()=>[e(o,{span:12},{default:l(()=>[e(m,{label:"\u6807\u9898",prop:"title"},{default:l(()=>[e(_,{modelValue:t.title,"onUpdate:modelValue":a[0]||(a[0]=n=>t.title=n),placeholder:"\u8BF7\u8F93\u5165\u8BED\u8A00",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"ID"},{default:l(()=>[x(B(s.data.id),1)]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u56FE\u6807",prop:"icon"},{default:l(()=>[e(j,{modelValue:t.img,"onUpdate:modelValue":a[1]||(a[1]=n=>t.img=n)},null,8,["modelValue"]),e(_,{modelValue:t.img,"onUpdate:modelValue":a[2]||(a[2]=n=>t.img=n)},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u6700\u5C0F\u4F59\u989D",prop:"min"},{default:l(()=>[e(_,{modelValue:t.min,"onUpdate:modelValue":a[3]||(a[3]=n=>t.min=n),placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u6536\u76CA",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u6700\u5927\u4F59\u989D",prop:"max"},{default:l(()=>[e(_,{modelValue:t.max,"onUpdate:modelValue":a[4]||(a[4]=n=>t.max=n),placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u6536\u76CA",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u91D1\u989D\u8981\u6C42",prop:"amount"},{default:l(()=>[e(_,{modelValue:t.amount,"onUpdate:modelValue":a[5]||(a[5]=n=>t.amount=n),placeholder:"\u8BF7\u8F93\u5165\u91D1\u989D\u6700\u4F4E\u664B\u7EA7\u6761\u4EF6",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u664B\u7EA7\u5956\u52B1",prop:"reward"},{default:l(()=>[e(_,{modelValue:t.reward,"onUpdate:modelValue":a[6]||(a[6]=n=>t.reward=n),placeholder:"\u8BF7\u8F93\u5165\u664B\u7EA7\u5956\u52B1",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u63A8\u5E7F\u4EBA\u6570",prop:"spread_nums"},{default:l(()=>[e(_,{modelValue:t.spread_nums,"onUpdate:modelValue":a[7]||(a[7]=n=>t.spread_nums=n),placeholder:"\u8BF7\u8F93\u5165\u63A8\u5E7F\u4EBA\u6570",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u63D0\u73B0\u624B\u7EED\u8D39",prop:"fee"},{default:l(()=>[e(_,{modelValue:t.fee,"onUpdate:modelValue":a[8]||(a[8]=n=>t.fee=n),placeholder:"\u8BF7\u8F93\u5165\u63D0\u73B0\u624B\u7EED\u8D39",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:12},{default:l(()=>[e(m,{label:"\u72B6\u6001"},{default:l(()=>[e(k,{modelValue:t.status,"onUpdate:modelValue":a[9]||(a[9]=n=>t.status=n)},{default:l(()=>[e(g,{label:"\u6B63\u5E38",value:1}),e(g,{label:"\u7981\u7528",value:0})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])),[[L,c.value]])]),_:1},8,["modelValue"])}}},T=y("div",{class:"g-flex"},[y("span",null,"\u7B49\u7EA7\u914D\u7F6E")],-1),A={key:0,class:"g-green"},F={key:1,class:"g-red"},H={key:2,class:"g-red"},P={__name:"IndexView",setup(E){const i=D({loading:!1,list:[],row:{}}),s=D({status:""}),c=async(w=!0)=>{w&&(s.page=1),i.loading=!0;const{success:r,data:p}=await S.getLevelList(s);i.loading=!1,r&&(i.list=p.list)};c();const f=z(!1),t=w=>{i.row=w,f.value=!0};return(w,r)=>{const p=u("el-option"),a=u("el-select"),_=u("el-form-item"),m=u("el-form"),o=u("el-table-column"),g=u("el-image"),k=u("el-button"),U=u("el-table"),C=u("el-card"),v=I("loading");return V(),b(C,null,{header:l(()=>[T]),default:l(()=>[e(m,{inline:!0},{default:l(()=>[e(_,{label:"\u72B6\u6001"},{default:l(()=>[e(a,{modelValue:s.status,"onUpdate:modelValue":r[0]||(r[0]=d=>s.status=d),onChange:c},{default:l(()=>[e(p,{label:"\u5168\u90E8",value:""}),e(p,{label:"\u6B63\u5E38",value:"1"}),e(p,{label:"\u7981\u7528",value:"0"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),O((V(),b(U,{data:i.list,stripe:"",border:""},{default:l(()=>[e(o,{prop:"id",label:"ID",width:"50"}),e(o,{prop:"title",label:"\u6807\u9898","min-width":"100"}),e(o,{label:"\u56FE\u6807",width:"150"},{default:l(d=>[d.row.img?(V(),b(g,{key:0,src:d.row.img,"preview-src-list":[d.row.img],fit:"contain","hide-on-click-modal":"","preview-teleported":""},null,8,["src","preview-src-list"])):Q("",!0)]),_:1}),e(o,{prop:"min",label:"\u6700\u5C0F\u4F59\u989D","min-width":"100"}),e(o,{prop:"max",label:"\u6700\u5927\u4F59\u989D","min-width":"100"}),e(o,{prop:"amount",label:"\u91D1\u989D\u8981\u6C42","min-width":"100"}),e(o,{prop:"spread_nums",label:"\u63A8\u5E7F\u4EBA\u6570\u8981\u6C42","min-width":"100"}),e(o,{label:"\u72B6\u6001",width:"80"},{default:l(d=>[d.row.status===1?(V(),h("span",A,"\u6B63\u5E38")):d.row.status===0?(V(),h("span",F,"\u7981\u7528")):(V(),h("span",H,"\u5F02\u5E38"))]),_:1}),e(o,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:l(d=>[y("span",null,B($(N)(d.row.create_time)),1)]),_:1}),e(o,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:l(d=>[y("span",null,B($(N)(d.row.modify_time)),1)]),_:1}),e(o,{label:"\u64CD\u4F5C",width:"80",fixed:"right"},{default:l(d=>[e(k,{type:"primary",onClick:L=>t(d.row)},{default:l(()=>[x("\u7F16\u8F91")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[v,i.loading]]),e(R,{onSuccess:r[1]||(r[1]=d=>c(!1)),modelValue:f.value,"onUpdate:modelValue":r[2]||(r[2]=d=>f.value=d),data:i.row},null,8,["modelValue","data"])]),_:1})}}};export{P as default};
