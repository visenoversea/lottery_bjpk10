import{u as f,D as x,s as C,v as w,c as y,e as B,E as L,o as r,a as d,b as s,t as e,m as u,p as v,h as _,J as $,K as I,aU as R,H as S,S as T}from"./main.103642d2.js";import{_ as j}from"./extract_bank_modify.bf86bb6b.js";import{_ as D}from"./empty-image.26078a9f.js";const E={class:"v_bank_card_list g-flex-column n-bg"},G={class:"new-head"},H=s("img",{src:T,alt:""},null,-1),q=[H],F={class:"new-head_title_text"},J={class:"v-bank-card-list-pwd-container"},K={class:"v-bank-card-list-tips"},N={class:"v-bank-card-list-content"},O=["onClick"],U={class:"v-bank-card-list-item-bank-name"},V={class:"v-bank-card-list-item-bank-user"},z={class:"v-bank-card-list-item-bank-cardnum"},A=["onClick"],M=s("img",{src:j,alt:""},null,-1),P=[M],Q={class:"v-back-car-list-no g-flex-column g-flex-align-center"},W=s("img",{src:D,alt:""},null,-1),X={class:"v-back-car-list-no-text"},Y={class:"v-form-btn-box"},as={__name:"BankCardList",setup(Z){let k=f();x();const m=C(),b=w.exports.useI18n(),i=y(()=>b.tm("bankCardList"));let l=B(0),o=L({list:[]});async function h(){m.loadingShow=!0;const{success:a,data:t}=await R();!a||(o.list=t.list,console.log(t))}h();function p(a){k.push({name:"addbankcard",query:{id:a.id}})}return(a,t)=>(r(),d("div",E,[s("div",G,[s("div",{onClick:t[0]||(t[0]=n=>a.$router.go(-1)),class:"new-head-back"},q)]),s("div",F,e(i.value.titleText),1),s("div",J,[s("div",K,e(i.value.tipsText),1),u(s("div",N,[(r(!0),d($,null,I(_(o).list,(n,c)=>(r(),d("div",{onClick:g=>S(l)?l.value=c:l=c,key:c,class:"v-bank-card-list-item",style:{backgroundImage:"url('/images/Rectangle1.png')"}},[s("div",U,e(n.bank_name),1),s("div",V,e(n.name),1),s("div",z,e(n.card_number),1),s("div",{onClick:g=>p(n),class:"v-bank-card-list-item-bank-edit"},P,8,A)],8,O))),128))],512),[[v,_(o).list.length]]),u(s("div",Q,[W,s("span",X,e(i.value.noListText),1)],512),[[v,!_(o).list.length]])]),s("div",Y,[s("div",{onClick:t[1]||(t[1]=n=>a.$router.push({name:"addbankcard"})),class:"v-form-btn g-flex-align-center g-flex-justify-center"},[s("span",null,e(i.value.addBankCardText),1)])])]))}};export{as as default};
