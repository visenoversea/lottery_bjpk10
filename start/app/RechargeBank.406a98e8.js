import{s as j,u as w,c as $,g as d,F as _,E as z,f as B,o as g,a as f,b as e,t as s,d as n,p as m,am as N,v as S,m as u,e as R,aP as F,aQ as I,Q as P,ak as l,I as U}from"./main.bd07921e.js";import{_ as V}from"./OssUpload.eaea29bb.js";import"./aliyun-oss-sdk.42fcc8f2.js";const E={class:"v_recharge_bank g-flex-column n-bg"},M={class:"new-head"},D=e("img",{src:U,alt:""},null,-1),G=[D],H={class:"new-head_title_text"},O={class:"v-recharge-bank-container"},Q={class:"v-recharge-bank-pop-box"},A={class:"v-form-item"},q={class:"v-form-item-title"},J={class:"v-form-item-input"},K=["placeholder"],L={class:"v-recharge-bank-list"},W={class:"v-recharge-bank-item-box"},X={class:"g-flex-align-center g-flex-justify-between"},Y={class:"v-recharge-bank-list-title"},Z={class:"v-recharge-bank-item g-flex-align-center"},ee={class:"v-recharge-bank-item-title"},ne={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},te={class:"v-recharge-bank-item-right-money"},se={class:"v-recharge-bank-item g-flex-align-center"},ie={class:"v-recharge-bank-item-title"},oe={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},ae={class:"v-recharge-bank-item g-flex-align-center"},ce={class:"v-recharge-bank-item-title"},re={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},le={class:"v-recharge-bank-item g-flex-align-center"},de={class:"v-recharge-bank-item-title"},ge={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},fe={key:0,class:"v-recharge-bank-item g-flex-align-center"},he={class:"v-recharge-bank-item-title"},_e={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},me={key:1,class:"v-recharge-bank-item g-flex-align-center"},ue={class:"v-recharge-bank-item-title"},ve={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},be={class:"v-recharge-bank-item-box"},ke={class:"v-recharge-bank-list-title"},Ce={__name:"RechargeBank",setup(pe){const h=j(),v=w(),o=$(()=>v.tm("rechargebank"));d(!1),d("");let i=_({info:{bank_code:"",bank_name:"",branch:"",card_number:"",currency:"",fixed:"",name:"",rate:"",symbol:""}});const b=z(),k=B();let a=_({id:b.params.id,amount:"",money:"",img:""});async function p(){h.loadingShow=!0;const{success:c,data:t}=await F({id:a.id});!c||(Object.assign(i,t.info),console.log(t))}p();function x(){if(!a.amount)return a.money="";a.money=Math.formatFloat(Number(a.amount)*Number(i.info.rate),Number(i.info.fixed)).toFixed(i.info.fixed)}function y(c){console.log("url",c),a.img=c}const T=d(null);async function C(){h.loadingShow=!0;const{success:c,data:t}=await I(a);!c||(P.success(t.msg),setTimeout(()=>{k.go(-1)},500),console.log(t))}return(c,t)=>(g(),f("div",E,[e("div",M,[e("div",{onClick:t[0]||(t[0]=r=>c.$router.go(-1)),class:"new-head-back"},G)]),e("div",H,s(n(o).titleText),1),e("div",O,[e("div",Q,[e("div",A,[e("div",q,s(n(o).tipsText),1),e("div",J,[m(e("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=r=>n(a).amount=r),onInput:x,placeholder:n(o).buyAmontPlaceholderText},null,40,K),[[N,n(a).amount]])])]),e("div",L,[e("div",W,[e("div",X,[e("p",Y,"1."+s(n(o).infoTitleText)+":",1)]),m(e("div",Z,[e("p",ee,s(n(o).moneyText)+":",1),e("div",ne,[e("p",te," \u2248 "+s(n(i).info.symbol)+" "+s(n(a).money),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[2]||(t[2]=r=>n(l)(n(a).money))})])],512),[[S,n(a).amount]]),e("div",se,[e("p",ie,s(n(o).nameText)+":",1),e("div",oe,[e("p",null,s(n(i).info.name),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[3]||(t[3]=r=>n(l)(n(i).info.name))})])]),e("div",ae,[e("p",ce,s(n(o).cardText)+":",1),e("div",re,[e("p",null,s(n(i).info.card_number),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[4]||(t[4]=r=>n(l)(n(i).info.card_number))})])]),e("div",le,[e("p",de,s(n(o).bankNameText)+":",1),e("div",ge,[e("p",null,s(n(i).info.bank_name),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[5]||(t[5]=r=>n(l)(n(i).info.bank_name))})])]),n(i).info.branch?(g(),f("div",fe,[e("p",he,s(n(o).khzhText),1),e("div",_e,[e("p",null,s(n(i).info.branch),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[6]||(t[6]=r=>n(l)(n(i).info.branch))})])])):u("",!0),n(i).info.bank_code?(g(),f("div",me,[e("p",ue,s(n(o).yhdm)+":",1),e("div",ve,[e("p",null,s(n(i).info.bank_code),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[7]||(t[7]=r=>n(l)(n(i).info.bank_code))})])])):u("",!0)]),e("div",be,[e("p",ke,"2."+s(n(o).secondText),1)])])]),e("div",{onClick:C,class:"v-recharge-bank-pop-btn g-flex-align-center g-flex-justify-center"},[e("span",null,s(n(o).finishText),1)])]),R(V,{MidrPath:"/buycoin",idString:"c-recharge-coin-upload-1",ref_key:"refUpload",ref:T,onEmitUploadSuccess:y},null,512)]))}};export{Ce as default};
