import{f as T,E as w,s as V,u as B,c as y,F as C,r as j,o as D,a as N,b as e,t as o,d as a,e as c,p as m,v as u,b5 as P,b6 as U,Q as b,b7 as A,ax as E,b8 as H,I}from"./main.bd07921e.js";const S={class:"v_add_bank_card g-flex-column n-bg"},$={class:"new-head"},q=e("img",{src:I,alt:""},null,-1),z=[q],G={class:"new-head_title_text"},O={class:"v-add-bank-card-container"},R={class:"v-add-bank-card-form"},F={class:"v-add-bank-card-form-item"},Q={class:"v-add-bank-card-form-item-title"},J={class:"v-add-bank-card-form-item-input g-flex-align-center"},K={class:"v-add-bank-card-form-item"},L={class:"v-add-bank-card-form-item-title"},M={class:"v-add-bank-card-form-item-input"},W={class:"v-add-bank-card-form-item"},X={class:"v-add-bank-card-form-item-title"},Y={class:"v-add-bank-card-form-item-input"},Z={class:"v-add-bank-card-form-item"},ee={class:"v-add-bank-card-form-item-title"},ae={class:"v-add-bank-card-form-item-input"},de={class:"v-add-bank-card-form-item"},te={class:"v-add-bank-card-form-item-title"},ne={class:"v-add-bank-card-form-item-input"},se={class:"v-add-bank-card-form-btn-list g-flex-justify-between g-flex-align-center"},ie={__name:"AddBankCard",setup(le){let r=T(),_=w();const v=V(),f=B(),n=y(()=>f.tm("addBankCard"));let t=C({id:_.query.id?_.query.id:"",bank_name:"",branch:"",bank_code:"",name:"",card_number:"",remark:""});async function k(){const{success:l,data:d}=await P({id:t.id});!l||Object.assign(t,d.info)}t.id&&k();async function h(){v.loadingShow=!0;const{success:l,data:d}=await U(t);!l||(b.success(d.msg),setTimeout(()=>{r.back(-1)},500))}async function p(){v.loadingShow=!0;const{success:l,data:d}=await A(t);!l||(b.success(d.msg),setTimeout(()=>{r.back(-1)},500))}function g(){E.confirm({title:n.value.delTitleText,message:n.value.delTipsText}).then(()=>{x()}).catch(()=>{})}async function x(){const{success:l,data:d}=await H({id:t.id});!l||(b.success(d.msg),setTimeout(()=>{r.back(-1)},500),console.log(d))}return(l,d)=>{const i=j("van-field");return D(),N("div",S,[e("div",$,[e("div",{onClick:d[0]||(d[0]=s=>l.$router.go(-1)),class:"new-head-back"},z)]),e("div",G,o(a(n).titleText),1),e("div",O,[e("div",R,[e("div",F,[e("div",Q,o(a(n).bankNameText),1),e("div",J,[c(i,{modelValue:a(t).bank_name,"onUpdate:modelValue":d[1]||(d[1]=s=>a(t).bank_name=s),label:"","label-width":"0",placeholder:a(n).bankPlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",K,[e("div",L,o(a(n).cardNumberText),1),e("div",M,[c(i,{modelValue:a(t).card_number,"onUpdate:modelValue":d[2]||(d[2]=s=>a(t).card_number=s),label:"","label-width":"0",placeholder:a(n).cardNumberPlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",W,[e("div",X,o(a(n).nameText),1),e("div",Y,[c(i,{modelValue:a(t).name,"onUpdate:modelValue":d[3]||(d[3]=s=>a(t).name=s),label:"","label-width":"0",placeholder:a(n).namePlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",Z,[e("div",ee,o(a(n).wangdianText),1),e("div",ae,[c(i,{modelValue:a(t).branch,"onUpdate:modelValue":d[4]||(d[4]=s=>a(t).branch=s),label:"","label-width":"0",placeholder:a(n).wangdianPlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",de,[e("div",te,o(a(n).zhihangCodeText),1),e("div",ne,[c(i,{modelValue:a(t).bank_code,"onUpdate:modelValue":d[5]||(d[5]=s=>a(t).bank_code=s),label:"","label-width":"0",placeholder:a(n).zhihangCodePlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",se,[m(e("div",{onClick:g,class:"v-add-bank-card-form-btn-jiebang v-add-bank-card-form-btn g-flex-align-center g-flex-justify-center"},[e("span",null,o(a(n).jiebangText),1)],512),[[u,a(t).id]]),m(e("div",{onClick:h,class:"v-add-bank-card-form-btn g-flex-align-center g-flex-justify-center"},[e("span",null,o(a(n).changeText),1)],512),[[u,a(t).id]]),m(e("div",{onClick:p,class:"v-add-bank-card-form-btn v-add-bank-card-form-btn-submit g-flex-align-center g-flex-justify-center"},[e("span",null,o(a(n).submitText),1)],512),[[u,!a(t).id]])])])])])}}};export{ie as default};
