import{u as V,D as P,s as A,v as I,c as W,E as d,e as p,o as E,a as $,b as e,t as a,m as u,aj as _,h as l,d as y,aE as B,aF as D,S as U,_ as q}from"./main.c91d7720.js";import{_ as x}from"./SelectRadioPop.7c931711.js";import"./SelectRadioPop.vue_vue_type_style_index_0_lang.6a63b429.js";const G={class:"v_wallet_add g-flex-column n-bg"},H={class:"new-head"},N=e("img",{src:q,alt:""},null,-1),R=[N],X={class:"new-head_title_text"},F={class:"v-wallet-add-container"},M={class:"v-form"},O={class:"v-form-item"},z={class:"v-form-item-title"},J=["placeholder"],K=e("div",{class:"v-form-item-input-icon"},[e("i",{class:"iconfont icon-you"})],-1),Q={class:"v-form-item"},Y={class:"v-form-item-title"},Z=["placeholder"],ee=e("div",{class:"v-form-item-input-icon"},[e("i",{class:"iconfont icon-you"})],-1),te={class:"v-form-item"},se={class:"v-form-item-title"},ne={class:"v-form-item-input"},ie=["placeholder"],oe={class:"v-form-btn-box"},de={__name:"WalletAdd",setup(le){const b=V(),v=P(),g=A(),j=I.exports.useI18n(),c=W(()=>j.tm("walletadd"));let t=d({address:"",chain:"",currency:v.query.currency?v.query.currency:""}),m=p(null);function k(){m.value.onShow()}function C(o){i.obj=o,t.currency=i.obj.currency,t.chain=i.obj.chainList[0].title}let f=p(null);function L(){f.value.onShow()}function w(o){console.log("item",o),t.chain=o.title}let i=d({obj:{}}),h=d({list:[]});async function S(){const{success:o,data:n}=await B();if(!!o)if(h.list=n.list.map(s=>(s.title=s.currency,s.val=s.currency,s.chainList=s.chainList.map(r=>({title:r,val:r})),s)),t.currency){let s=n.list.findIndex(r=>r.currency==t.currency);s!=-1?(i.obj=n.list[s],t.currency=i.obj.currency,t.chain=i.obj.chainList[0].title):(i.obj=n.list[0],t.currency=i.obj.currency,t.chain=i.obj.chainList[0].title)}else i.obj=n.list[0],t.currency=i.obj.currency,t.chain=i.obj.chainList[0].title}S();async function T(){g.loadingShow=!0;const{success:o,data:n}=await D(t);!o||(U.success(n.msg),setTimeout(()=>{b.go(-1)},500))}return(o,n)=>(E(),$("div",G,[e("div",H,[e("div",{onClick:n[0]||(n[0]=s=>o.$router.go(-1)),class:"new-head-back"},R)]),e("div",X,a(c.value.titleText),1),e("div",F,[e("div",M,[e("div",O,[e("div",z,a(c.value.selectText),1),e("div",{onClick:k,class:"v-form-item-input"},[u(e("input",{type:"text",readonly:"","onUpdate:modelValue":n[1]||(n[1]=s=>l(t).currency=s),placeholder:c.value.selectPlaceholderText},null,8,J),[[_,l(t).currency]]),K])]),e("div",Q,[e("div",Y,a(c.value.xieyiLeiXingText),1),e("div",{onClick:L,class:"v-form-item-input"},[u(e("input",{type:"text",readonly:"","onUpdate:modelValue":n[2]||(n[2]=s=>l(t).chain=s),placeholder:c.value.xieyiLeiXingPlaceholderText},null,8,Z),[[_,l(t).chain]]),ee])]),e("div",te,[e("div",se,a(c.value.addressText),1),e("div",ne,[u(e("input",{type:"text","onUpdate:modelValue":n[3]||(n[3]=s=>l(t).address=s),placeholder:c.value.addressPlaceholderText},null,8,ie),[[_,l(t).address]])])])]),e("div",oe,[e("div",{onClick:T,class:"v-form-btn g-flex-align-center g-flex-justify-center"},[e("span",null,a(c.value.submitText),1)])])]),y(x,{columns:l(h).list,onEmitsSelectConfirm:C,selectVal:l(t).currency,ref_key:"refSelectCoinPop",ref:m},null,8,["columns","selectVal"]),y(x,{columns:l(i).obj.chainList,onEmitsSelectConfirm:w,selectVal:l(t).chain,ref_key:"refSelectLinkPop",ref:f},null,8,["columns","selectVal"])]))}};export{de as default};
