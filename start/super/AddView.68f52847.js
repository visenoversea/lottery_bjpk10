import{b as c,M as F,r as I,c as u,d as O,o as d,k as _,h as l,g as o,m as f,w as h,f as w,N as M,G as R,e as V,l as j,i as A,O as G,n as S,E as T}from"./index.c4d14654.js";const $={key:0,class:"g-green"},q={key:1,class:"g-blue"},H={key:2,class:"g-red"},K={__name:"AddView",props:{modelValue:{type:Boolean,default:!1},user:{type:Object,default(){return{}}}},emits:["update:modelValue","success"],setup(C,{emit:g}){const s=C,b=c(),i=c(!1),r=F({get:()=>s.modelValue,set:m=>{g("update:modelValue",m)}}),v=c(!1),a=I({user_id:"",type:0,title:"\u7CFB\u7EDF\u5145\u503C",amount:"",money:"",img:"",remark:""}),U=async()=>{s.user.id&&(a.user_id=s.user.id,v.value=!0)},x=async()=>{b.value.resetFields()},B=async()=>{if(i.value)return;i.value=!0;const{success:m,data:e}=await S.addUserRecharge(a);i.value=!1,m&&(g("success"),T.success(e.msg),r.value=!1)};return(m,e)=>{const n=u("el-form-item"),y=u("el-radio"),D=u("el-radio-group"),p=u("el-input"),N=u("el-form"),k=u("el-button"),z=u("el-dialog"),E=O("loading");return d(),_(z,{modelValue:A(r),"onUpdate:modelValue":e[6]||(e[6]=t=>G(r)?r.value=t:null),onOpen:U,title:"\u65B0\u589E\u5145\u503C",onClose:x,draggable:"","close-on-click-modal":!1,width:"520px"},{footer:l(()=>[o(k,{size:"default",onClick:e[5]||(e[5]=t=>r.value=!1)},{default:l(()=>[f("\u53D6 \u6D88")]),_:1}),o(k,{size:"default",type:"primary",onClick:B},{default:l(()=>[f("\u786E \u8BA4")]),_:1})]),default:l(()=>[h((d(),_(N,{size:"default",ref_key:"refForm",ref:b,model:a,"label-width":"90px"},{default:l(()=>[s.user.id?(d(),_(n,{key:0,label:"\u7528\u6237\u540D"},{default:l(()=>[w("div",{class:M({"g-bg-pink":s.user.virtual})},[w("span",null,R(s.user.user_name),1),s.user.type===1?(d(),V("span",$,"(\u4F1A\u5458)")):s.user.type===2?(d(),V("span",q,"(\u4EE3\u7406)")):(d(),V("span",H,"(\u5F02\u5E38)"))],2)]),_:1})):j("",!0),o(n,{label:"\u5145\u503C\u7C7B\u578B"},{default:l(()=>[o(D,{modelValue:a.type,"onUpdate:modelValue":e[0]||(e[0]=t=>a.type=t)},{default:l(()=>[o(y,{label:0},{default:l(()=>[f("\u6B63\u5E38")]),_:1}),o(y,{label:1},{default:l(()=>[f("\u5F69\u91D1")]),_:1})]),_:1},8,["modelValue"])]),_:1}),o(n,{label:"\u7528\u6237",prop:"user_id"},{default:l(()=>[o(p,{disabled:v.value,modelValue:a.user_id,"onUpdate:modelValue":e[1]||(e[1]=t=>a.user_id=t),placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D\u6216ID",autocomplete:"off"},null,8,["disabled","modelValue"])]),_:1}),o(n,{label:"\u6807\u9898",prop:"title"},{default:l(()=>[o(p,{modelValue:a.title,"onUpdate:modelValue":e[2]||(e[2]=t=>a.title=t),placeholder:"\u8BF7\u8F93\u5165\u5145\u503C\u6807\u9898",autocomplete:"off"},null,8,["modelValue"])]),_:1}),o(n,{label:"\u5145\u503C\u91D1\u989D",prop:"amount"},{default:l(()=>[o(p,{onInput:m.amountChange,modelValue:a.amount,"onUpdate:modelValue":e[3]||(e[3]=t=>a.amount=t),placeholder:"\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D",autocomplete:"off"},null,8,["onInput","modelValue"])]),_:1}),o(n,{label:"\u8BA2\u5355\u5907\u6CE8",prop:"remark"},{default:l(()=>[o(p,{modelValue:a.remark,"onUpdate:modelValue":e[4]||(e[4]=t=>a.remark=t),placeholder:"\u8BF7\u8F93\u5165\u8BA2\u5355\u5907\u6CE8",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[E,i.value]])]),_:1},8,["modelValue"])}}};export{K as _};
