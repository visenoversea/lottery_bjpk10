import{u as T,D as w,s as V,v as B,c as y,E as C,r as j,o as D,a as N,b as e,t as o,d as c,h as n,m as u,p as m,b1 as P,b2 as S,S as v,b3 as U,au as A,b4 as E,_ as H}from"./main.136e4021.js";const I={class:"v_add_bank_card g-flex-column n-bg"},$={class:"new-head"},q=e("img",{src:H,alt:""},null,-1),z=[q],G={class:"new-head_title_text"},O={class:"v-add-bank-card-container"},R={class:"v-add-bank-card-form"},F={class:"v-add-bank-card-form-item"},J={class:"v-add-bank-card-form-item-title"},K={class:"v-add-bank-card-form-item-input g-flex-align-center"},L={class:"v-add-bank-card-form-item"},M={class:"v-add-bank-card-form-item-title"},Q={class:"v-add-bank-card-form-item-input"},W={class:"v-add-bank-card-form-item"},X={class:"v-add-bank-card-form-item-title"},Y={class:"v-add-bank-card-form-item-input"},Z={class:"v-add-bank-card-form-item"},ee={class:"v-add-bank-card-form-item-title"},ae={class:"v-add-bank-card-form-item-input"},de={class:"v-add-bank-card-form-item"},te={class:"v-add-bank-card-form-item-title"},ne={class:"v-add-bank-card-form-item-input"},le={class:"v-add-bank-card-form-btn-list g-flex-justify-between g-flex-align-center"},ie={__name:"AddBankCard",setup(se){let r=T(),b=w();const _=V(),f=B.exports.useI18n(),t=y(()=>f.tm("addBankCard"));let d=C({id:b.query.id?b.query.id:"",bank_name:"",branch:"",bank_code:"",name:"",card_number:"",remark:""});async function k(){const{success:s,data:a}=await P({id:d.id});!s||Object.assign(d,a.info)}d.id&&k();async function h(){_.loadingShow=!0;const{success:s,data:a}=await S(d);!s||(v.success(a.msg),setTimeout(()=>{r.back(-1)},500))}async function p(){_.loadingShow=!0;const{success:s,data:a}=await U(d);!s||(v.success(a.msg),setTimeout(()=>{r.back(-1)},500))}function g(){A.confirm({title:t.value.delTitleText,message:t.value.delTipsText}).then(()=>{x()}).catch(()=>{})}async function x(){const{success:s,data:a}=await E({id:d.id});!s||(v.success(a.msg),setTimeout(()=>{r.back(-1)},500),console.log(a))}return(s,a)=>{const i=j("van-field");return D(),N("div",I,[e("div",$,[e("div",{onClick:a[0]||(a[0]=l=>s.$router.go(-1)),class:"new-head-back"},z)]),e("div",G,o(t.value.titleText),1),e("div",O,[e("div",R,[e("div",F,[e("div",J,o(t.value.bankNameText),1),e("div",K,[c(i,{modelValue:n(d).bank_name,"onUpdate:modelValue":a[1]||(a[1]=l=>n(d).bank_name=l),label:"","label-width":"0",placeholder:t.value.bankPlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",L,[e("div",M,o(t.value.cardNumberText),1),e("div",Q,[c(i,{modelValue:n(d).card_number,"onUpdate:modelValue":a[2]||(a[2]=l=>n(d).card_number=l),label:"","label-width":"0",placeholder:t.value.cardNumberPlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",W,[e("div",X,o(t.value.nameText),1),e("div",Y,[c(i,{modelValue:n(d).name,"onUpdate:modelValue":a[3]||(a[3]=l=>n(d).name=l),label:"","label-width":"0",placeholder:t.value.namePlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",Z,[e("div",ee,o(t.value.wangdianText),1),e("div",ae,[c(i,{modelValue:n(d).branch,"onUpdate:modelValue":a[4]||(a[4]=l=>n(d).branch=l),label:"","label-width":"0",placeholder:t.value.wangdianPlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",de,[e("div",te,o(t.value.zhihangCodeText),1),e("div",ne,[c(i,{modelValue:n(d).bank_code,"onUpdate:modelValue":a[5]||(a[5]=l=>n(d).bank_code=l),label:"","label-width":"0",placeholder:t.value.zhihangCodePlaceholderText},null,8,["modelValue","placeholder"])])]),e("div",le,[u(e("div",{onClick:g,class:"v-add-bank-card-form-btn-jiebang v-add-bank-card-form-btn g-flex-align-center g-flex-justify-center"},[e("span",null,o(t.value.jiebangText),1)],512),[[m,n(d).id]]),u(e("div",{onClick:h,class:"v-add-bank-card-form-btn g-flex-align-center g-flex-justify-center"},[e("span",null,o(t.value.changeText),1)],512),[[m,n(d).id]]),u(e("div",{onClick:p,class:"v-add-bank-card-form-btn v-add-bank-card-form-btn-submit g-flex-align-center g-flex-justify-center"},[e("span",null,o(t.value.submitText),1)],512),[[m,!n(d).id]])])])])])}}};export{ie as default};
