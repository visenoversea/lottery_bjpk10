import{f,E as x,s as C,u as y,c as w,g as B,F as L,o as d,a as _,b as s,t as a,d as e,p as u,v,M as $,N as I,aX as R,J as S,ac as T,I as j}from"./main.bd07921e.js";import{_ as D}from"./extract_bank_modify.644e71d5.js";import{_ as E}from"./empty-image.36ac6311.js";const F={class:"v_bank_card_list g-flex-column n-bg"},G={class:"new-head"},N=s("img",{src:j,alt:""},null,-1),q=[N],z={class:"new-head_title_text"},H={class:"v-bank-card-list-pwd-container"},J={class:"v-bank-card-list-tips"},M={class:"v-bank-card-list-content"},O=["onClick"],V={class:"v-bank-card-list-item-bank-name"},X={class:"v-bank-card-list-item-bank-user"},A={class:"v-bank-card-list-item-bank-cardnum"},K=["onClick"],P=s("img",{src:D,alt:""},null,-1),Q=[P],U={class:"v-back-car-list-no g-flex-column g-flex-align-center"},W=s("img",{src:E,alt:""},null,-1),Y={class:"v-back-car-list-no-text"},Z={class:"v-form-btn-box"},ns={__name:"BankCardList",setup(ss){let k=f();x();const m=C(),b=y(),o=w(()=>b.tm("bankCardList"));let l=B(0),c=L({list:[]});async function h(){m.loadingShow=!0;const{success:n,data:t}=await R();!n||(c.list=t.list,console.log(t))}h();function g(n){k.push({name:"addbankcard",query:{id:n.id}})}return(n,t)=>(d(),_("div",F,[s("div",G,[s("div",{onClick:t[0]||(t[0]=i=>n.$router.go(-1)),class:"new-head-back"},q)]),s("div",z,a(e(o).titleText),1),s("div",H,[s("div",J,a(e(o).tipsText),1),u(s("div",M,[(d(!0),_($,null,I(e(c).list,(i,r)=>(d(),_("div",{onClick:p=>S(l)?l.value=r:l=r,key:r,class:"v-bank-card-list-item",style:T({backgroundImage:"url('/images/Rectangle1.png')"})},[s("div",V,a(i.bank_name),1),s("div",X,a(i.name),1),s("div",A,a(i.card_number),1),s("div",{onClick:p=>g(i),class:"v-bank-card-list-item-bank-edit"},Q,8,K)],12,O))),128))],512),[[v,e(c).list.length]]),u(s("div",U,[W,s("span",Y,a(e(o).noListText),1)],512),[[v,!e(c).list.length]])]),s("div",Z,[s("div",{onClick:t[1]||(t[1]=i=>n.$router.push({name:"addbankcard"})),class:"v-form-btn g-flex-align-center g-flex-justify-center"},[s("span",null,a(e(o).addBankCardText),1)])])]))}};export{ns as default};
