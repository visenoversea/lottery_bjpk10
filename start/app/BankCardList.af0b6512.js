import{u as f,D as x,s as C,v as w,c as y,e as B,E as L,o as r,a as d,b as s,t as e,m as u,p as v,h as _,K as $,M as I,aO as R,H as T,_ as j}from"./main.26c763da.js";import{_ as D}from"./extract_bank_modify.bf86bb6b.js";import{_ as S}from"./empty-image.26078a9f.js";const E={class:"v_bank_card_list g-flex-column n-bg"},G={class:"new-head"},H=s("img",{src:j,alt:""},null,-1),O=[H],q={class:"new-head_title_text"},F={class:"v-bank-card-list-pwd-container"},K={class:"v-bank-card-list-tips"},M={class:"v-bank-card-list-content"},N=["onClick"],V={class:"v-bank-card-list-item-bank-name"},z={class:"v-bank-card-list-item-bank-user"},A={class:"v-bank-card-list-item-bank-cardnum"},J=["onClick"],P=s("img",{src:D,alt:""},null,-1),Q=[P],U={class:"v-back-car-list-no g-flex-column g-flex-align-center"},W=s("img",{src:S,alt:""},null,-1),X={class:"v-back-car-list-no-text"},Y={class:"v-form-btn-box"},as={__name:"BankCardList",setup(Z){let k=f();x();const m=C(),b=w.exports.useI18n(),i=y(()=>b.tm("bankCardList"));let l=B(0),o=L({list:[]});async function h(){m.loadingShow=!0;const{success:a,data:t}=await R();!a||(o.list=t.list,console.log(t))}h();function p(a){k.push({name:"addbankcard",query:{id:a.id}})}return(a,t)=>(r(),d("div",E,[s("div",G,[s("div",{onClick:t[0]||(t[0]=n=>a.$router.go(-1)),class:"new-head-back"},O)]),s("div",q,e(i.value.titleText),1),s("div",F,[s("div",K,e(i.value.tipsText),1),u(s("div",M,[(r(!0),d($,null,I(_(o).list,(n,c)=>(r(),d("div",{onClick:g=>T(l)?l.value=c:l=c,key:c,class:"v-bank-card-list-item",style:{backgroundImage:"url('/images/Rectangle1.png')"}},[s("div",V,e(n.bank_name),1),s("div",z,e(n.name),1),s("div",A,e(n.card_number),1),s("div",{onClick:g=>p(n),class:"v-bank-card-list-item-bank-edit"},Q,8,J)],8,N))),128))],512),[[v,_(o).list.length]]),u(s("div",U,[W,s("span",X,e(i.value.noListText),1)],512),[[v,!_(o).list.length]])]),s("div",Y,[s("div",{onClick:t[1]||(t[1]=n=>a.$router.push({name:"addbankcard"})),class:"v-form-btn g-flex-align-center g-flex-justify-center"},[s("span",null,e(i.value.addBankCardText),1)])])]))}};export{as as default};
