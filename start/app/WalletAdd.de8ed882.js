import{f as V,E as I,s as P,u as A,c as W,F as d,g as p,o as E,a as $,b as e,t as a,d as s,p as u,am as _,e as y,aI as B,aJ as U,Q as q,I as D}from"./main.eeabd2a7.js";import{_ as x}from"./SelectRadioPop.5586156f.js";import"./SelectRadioPop.vue_vue_type_style_index_0_lang.6a63b429.js";const G={class:"v_wallet_add g-flex-column n-bg"},H={class:"new-head"},N=e("img",{src:D,alt:""},null,-1),R=[N],X={class:"new-head_title_text"},F={class:"v-wallet-add-container"},J={class:"v-form"},M={class:"v-form-item"},O={class:"v-form-item-title"},Q=["placeholder"],z=e("div",{class:"v-form-item-input-icon"},[e("i",{class:"iconfont icon-you"})],-1),K={class:"v-form-item"},Y={class:"v-form-item-title"},Z=["placeholder"],ee=e("div",{class:"v-form-item-input-icon"},[e("i",{class:"iconfont icon-you"})],-1),te={class:"v-form-item"},se={class:"v-form-item-title"},ne={class:"v-form-item-input"},ie=["placeholder"],oe={class:"v-form-btn-box"},de={__name:"WalletAdd",setup(le){const b=V(),m=I(),g=P(),k=A(),c=W(()=>k.tm("walletadd"));let t=d({address:"",chain:"",currency:m.query.currency?m.query.currency:""}),f=p(null);function C(){f.value.onShow()}function j(l){o.obj=l,t.currency=o.obj.currency,t.chain=o.obj.chainList[0].title}let h=p(null);function L(){h.value.onShow()}function w(l){console.log("item",l),t.chain=l.title}let o=d({obj:{}}),v=d({list:[]});async function S(){const{success:l,data:i}=await B();if(!!l)if(v.list=i.list.map(n=>(n.title=n.currency,n.val=n.currency,n.chainList=n.chainList.map(r=>({title:r,val:r})),n)),t.currency){let n=i.list.findIndex(r=>r.currency==t.currency);n!=-1?(o.obj=i.list[n],t.currency=o.obj.currency,t.chain=o.obj.chainList[0].title):(o.obj=i.list[0],t.currency=o.obj.currency,t.chain=o.obj.chainList[0].title)}else o.obj=i.list[0],t.currency=o.obj.currency,t.chain=o.obj.chainList[0].title}S();async function T(){g.loadingShow=!0;const{success:l,data:i}=await U(t);!l||(q.success(i.msg),setTimeout(()=>{b.go(-1)},500))}return(l,i)=>(E(),$("div",G,[e("div",H,[e("div",{onClick:i[0]||(i[0]=n=>l.$router.go(-1)),class:"new-head-back"},R)]),e("div",X,a(s(c).titleText),1),e("div",F,[e("div",J,[e("div",M,[e("div",O,a(s(c).selectText),1),e("div",{onClick:C,class:"v-form-item-input"},[u(e("input",{type:"text",readonly:"","onUpdate:modelValue":i[1]||(i[1]=n=>s(t).currency=n),placeholder:s(c).selectPlaceholderText},null,8,Q),[[_,s(t).currency]]),z])]),e("div",K,[e("div",Y,a(s(c).xieyiLeiXingText),1),e("div",{onClick:L,class:"v-form-item-input"},[u(e("input",{type:"text",readonly:"","onUpdate:modelValue":i[2]||(i[2]=n=>s(t).chain=n),placeholder:s(c).xieyiLeiXingPlaceholderText},null,8,Z),[[_,s(t).chain]]),ee])]),e("div",te,[e("div",se,a(s(c).addressText),1),e("div",ne,[u(e("input",{type:"text","onUpdate:modelValue":i[3]||(i[3]=n=>s(t).address=n),placeholder:s(c).addressPlaceholderText},null,8,ie),[[_,s(t).address]])])])]),e("div",oe,[e("div",{onClick:T,class:"v-form-btn g-flex-align-center g-flex-justify-center"},[e("span",null,a(s(c).submitText),1)])])]),y(x,{columns:s(v).list,onEmitsSelectConfirm:j,selectVal:s(t).currency,ref_key:"refSelectCoinPop",ref:f},null,8,["columns","selectVal"]),y(x,{columns:s(o).obj.chainList,onEmitsSelectConfirm:w,selectVal:s(t).chain,ref_key:"refSelectLinkPop",ref:h},null,8,["columns","selectVal"])]))}};export{de as default};
