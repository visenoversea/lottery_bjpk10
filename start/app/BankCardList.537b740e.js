import{f,B as p,s as x,u as C,c as y,g as B,C as L,o as d,a as _,b as s,t as n,d as i,p as u,v,F as $,G as j,ax as w,E as G,ac as I}from"./main.0795c4c3.js";import{_ as R}from"./extract_bank_modify.6ca9206f.js";import{_ as S}from"./deficiency_bank_record.8df201a3.js";const T={class:"v_bank_card_list g-flex-column"},z={class:"v-head g-flex-justify-center g-flex-align-center"},D=s("i",{class:"iconfont icon-zuojiantou"},null,-1),E=[D],F={class:"v-title g-flex-align-center g-flex-justify-center"},q=s("i",{class:"iconfont icon-jiahao1"},null,-1),H=[q],N={class:"v-bank-card-list-pwd-container"},O={class:"v-bank-card-list-tips"},V={class:"v-bank-card-list-content"},A=["onClick"],J={class:"v-bank-card-list-item-bank-name"},K={class:"v-bank-card-list-item-bank-user"},M={class:"v-bank-card-list-item-bank-cardnum"},P=["onClick"],Q=s("img",{src:R,alt:""},null,-1),U=[Q],W={class:"v-back-car-list-no g-flex-column g-flex-align-center"},X=s("img",{src:S,alt:""},null,-1),Y={class:"v-back-car-list-no-text"},as={__name:"BankCardList",setup(Z){let k=f();p(),x();const m=C(),c=y(()=>m.tm("bankCardList"));let l=B(0),o=L({list:[]});async function g(){const{success:e,data:t}=await w();!e||(o.list=t.list,console.log(t))}g();function h(e){k.push({name:"addbankcard",query:{id:e.id}})}return(e,t)=>(d(),_("div",T,[s("div",z,[s("div",{onClick:t[0]||(t[0]=a=>e.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},E),s("span",F,n(i(c).titleText),1),s("div",{onClick:t[1]||(t[1]=a=>e.$router.push({name:"addbankcard"})),class:"v-head-right g-flex-align-center"},H)]),s("div",N,[s("div",O,n(i(c).tipsText),1),u(s("div",V,[(d(!0),_($,null,j(i(o).list,(a,r)=>(d(),_("div",{onClick:b=>G(l)?l.value=r:l=r,key:r,class:"v-bank-card-list-item",style:I({backgroundImage:"url('/img/icon/extract_bank_card.png')"})},[s("div",J,n(a.bank_name),1),s("div",K,n(a.name),1),s("div",M,n(a.card_number),1),s("div",{onClick:b=>h(a),class:"v-bank-card-list-item-bank-edit"},U,8,P)],12,A))),128))],512),[[v,i(o).list.length]]),u(s("div",W,[X,s("span",Y,n(i(c).noListText),1)],512),[[v,!i(o).list.length]])])]))}};export{as as default};
