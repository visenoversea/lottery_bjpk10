import{f as m,B as b,s as f,u as h,c as p,g as x,C,o as d,a as _,b as s,t as e,d as a,p as u,v,F as y,G as B,av as L,E as j,aa as w,aw as $}from"./main.70d4fcf2.js";import{_ as G}from"./deficiency_bank_record.781417be.js";const I={class:"v_bank_card_list g-flex-column"},R={class:"v-head g-flex-justify-center g-flex-align-center"},S=s("i",{class:"iconfont icon-zuojiantou"},null,-1),T=[S],z={class:"v-title g-flex-align-center g-flex-justify-center"},D=s("i",{class:"iconfont icon-jiahao1"},null,-1),E=[D],F={class:"v-bank-card-list-pwd-container"},N={class:"v-bank-card-list-tips"},H={class:"v-bank-card-list-content"},O=["onClick"],V={class:"v-bank-card-list-item-bank-name"},q={class:"v-bank-card-list-item-bank-user"},A={class:"v-bank-card-list-item-bank-cardnum"},J={class:"v-back-car-list-no g-flex-column g-flex-align-center"},K=s("img",{src:G,alt:""},null,-1),M={class:"v-back-car-list-no-text"},X={__name:"BankCardList",setup(P){m(),b(),f();const k=h(),c=p(()=>k.tm("bankCardList"));let l=x(0),i=C({list:[]});async function g(){const{success:o,data:t}=await L();!o||(i.list=t.list,console.log(t))}return g(),(o,t)=>(d(),_("div",I,[s("div",R,[s("div",{onClick:t[0]||(t[0]=n=>o.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},T),s("span",z,e(a(c).titleText),1),s("div",{onClick:t[1]||(t[1]=n=>o.$router.push({name:"addbankcard"})),class:"v-head-right g-flex-align-center"},E)]),s("div",F,[s("div",N,e(a(c).tipsText),1),u(s("div",H,[(d(!0),_(y,null,B(a(i).list,(n,r)=>(d(),_("div",{onClick:Q=>j(l)?l.value=r:l=r,key:r,class:"v-bank-card-list-item",style:w({backgroundImage:"url('/img/icon/extract_bank_card.png')"})},[s("div",V,e(n.bank_name),1),s("div",q,e(n.name),1),s("div",A,e(a($)(n.card_number)),1)],12,O))),128))],512),[[v,a(i).list.length]]),u(s("div",J,[K,s("span",M,e(a(c).noListText),1)],512),[[v,!a(i).list.length]])])]))}};export{X as default};
