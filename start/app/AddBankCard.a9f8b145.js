import{u as T,D as w,s as V,v as B,c as y,E as C,r as j,o as D,a as N,b as e,t as o,d as c,h as n,m as u,p as m,aY as P,aZ as U,V as v,a_ as A,ao as E,a$ as H,_ as I}from"./main.2a81f6f4.js";const S={class:"v_add_bank_card g-flex-column n-bg"},$={class:"new-head"},q=e("img",{src:I,alt:""},null,-1),z=[q],G={class:"new-head_title_text"},O={class:"v-add-bank-card-container"},R={class:"v-add-bank-card-form"},Y={class:"v-add-bank-card-form-item"},Z={class:"v-add-bank-card-form-item-title"},F={class:"v-add-bank-card-form-item-input g-flex-align-center"},J={class:"v-add-bank-card-form-item"},K={class:"v-add-bank-card-form-item-title"},L={class:"v-add-bank-card-form-item-input"},M={class:"v-add-bank-card-form-item"},Q={class:"v-add-bank-card-form-item-title"},W={class:"v-add-bank-card-form-item-input"},X={class:"v-add-bank-card-form-item"},ee={class:"v-add-bank-card-form-item-title"},ae={class:"v-add-bank-card-form-item-input"},de={class:"v-add-bank-card-form-item"},te={class:"v-add-bank-card-form-item-title"},ne={class:"v-add-bank-card-form-item-input"},le={class:"v-add-bank-card-form-btn-list g-flex-justify-between g-flex-align-center"},ie={__name:"AddBankCard",setup(se){let r=T(),_=w();const b=V(),f=B.exports.useI18n(),t=y(()=>f.tm("addBankCard"));let d=C({id:_.query.id?_.query.id:"",bank_name:"",branch:"",bank_code:"",name:"",card_number:"",remark:""});async function k(){const{success:s,data:a}=await P({id:d.id});!s||Object.assign(d,a.info)}d.id&&k();async function h(){b.loadingShow=!0;const{success:s,data:a}=await U(d);!s||(v.success(a.msg),setTimeout(()=>{r.back(-1)},500))}async function p(){b.loadingShow=!0;const{success:s,data:a}=await A(d);!s||(v.success(a.msg),setTimeout(()=>{r.back(-1)},500))}function g(){E.confirm({title:t.value.delTitleText,message:t.value.delTipsText}).then(()=>{x()}).catch(()=>{})}async function x(){const{success:s,data:a}=await H({id:d.id});!s||(v.success(a.msg),setTimeout(()=>{r.back(-1)},500),console.log(a))}return(s,a)=>{const i=j("van-field");return D(),N("div",S,[e("div",$,[e("div",{onClick:a[0]||(a[0]=l=>s.$router.go(-1)),class:"new-head-back"},z)]),e("div",G,o(t.value.titleText),1),e("div",O,[e("div",R,[e("div",Y,[e("div",Z,o(t.value.bankNameText),1),e("div",F,[c(i,{modelValue:n(d).bank_name,"onUpdate:modelValue":a[1]||(a[1]=l=>n(d).bank_name=l),label:"","label-width":"0",placeholder:t.value.bankPlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",J,[e("div",K,o(t.value.cardNumberText),1),e("div",L,[c(i,{modelValue:n(d).card_number,"onUpdate:modelValue":a[2]||(a[2]=l=>n(d).card_number=l),label:"","label-width":"0",placeholder:t.value.cardNumberPlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",M,[e("div",Q,o(t.value.nameText),1),e("div",W,[c(i,{modelValue:n(d).name,"onUpdate:modelValue":a[3]||(a[3]=l=>n(d).name=l),label:"","label-width":"0",placeholder:t.value.namePlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",X,[e("div",ee,o(t.value.wangdianText),1),e("div",ae,[c(i,{modelValue:n(d).branch,"onUpdate:modelValue":a[4]||(a[4]=l=>n(d).branch=l),label:"","label-width":"0",placeholder:t.value.wangdianPlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",de,[e("div",te,o(t.value.zhihangCodeText),1),e("div",ne,[c(i,{modelValue:n(d).bank_code,"onUpdate:modelValue":a[5]||(a[5]=l=>n(d).bank_code=l),label:"","label-width":"0",placeholder:t.value.zhihangCodePlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",le,[u(e("div",{onClick:g,class:"v-add-bank-card-form-btn-jiebang v-add-bank-card-form-btn g-flex-align-center g-flex-justify-center"},[e("span",null,o(t.value.jiebangText),1)],512),[[m,n(d).id]]),u(e("div",{onClick:h,class:"v-add-bank-card-form-btn g-flex-align-center g-flex-justify-center"},[e("span",null,o(t.value.changeText),1)],512),[[m,n(d).id]]),u(e("div",{onClick:p,class:"v-add-bank-card-form-btn v-add-bank-card-form-btn-submit g-flex-align-center g-flex-justify-center"},[e("span",null,o(t.value.submitText),1)],512),[[m,!n(d).id]])])])])])}}};export{ie as default};
