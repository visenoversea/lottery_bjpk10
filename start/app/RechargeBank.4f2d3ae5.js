import{s as S,u as V,c as I,g as f,C as v,B as P,f as R,r as U,o as u,a as h,b as e,t as i,d as n,ae as F,e as b,p as d,v as g,m as k,ab as D,Y as E,ac as G,S as H,ad as r,_ as M}from"./main.d88c4f71.js";const O={class:"v_recharge_bank g-flex-column"},A={class:"v-head g-flex-justify-center g-flex-align-center"},Y=e("i",{class:"iconfont icon-zuojiantou"},null,-1),q=[Y],J={class:"v-title g-flex-align-center g-flex-justify-center"},K={class:"v-recharge-bank-container"},L={class:"v-recharge-bank-pop-box"},Q={class:"v-recharge-bank-buy-coin g-flex-align-center"},W={class:"v-recharge-bank-list"},X={class:"v-recharge-bank-item-box"},Z={class:"g-flex-align-center g-flex-justify-between"},ee={class:"v-recharge-bank-list-title"},ne={class:"v-recharge-bank-item g-flex-align-center"},te={class:"v-recharge-bank-item-title"},ie={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},se={class:"v-recharge-bank-item-right-money"},ae={class:"v-recharge-bank-item g-flex-align-center"},oe={class:"v-recharge-bank-item-title"},ce={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},le={class:"v-recharge-bank-item g-flex-align-center"},re={class:"v-recharge-bank-item-title"},de={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},ge={class:"v-recharge-bank-item g-flex-align-center"},fe={class:"v-recharge-bank-item-title"},ue={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},he={key:0,class:"v-recharge-bank-item g-flex-align-center"},_e={class:"v-recharge-bank-item-title"},me={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},ve={key:1,class:"v-recharge-bank-item g-flex-align-center"},be={class:"v-recharge-bank-item-title"},ke={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},pe={class:"v-recharge-bank-upload-box"},xe={class:"v-recharge-bank-upload-title"},ye={class:"v-recharge-bank-upload g-flex-align-center g-flex-justify-center"},Ce=["src"],je=e("i",{class:"iconfont icon-shanchu2"},null,-1),Te=[je],$e=e("i",{class:"iconfont icon-jiahao1"},null,-1),we={class:"v-recharge-bank-item-box"},ze={class:"v-recharge-bank-list-title"},Se={__name:"RechargeBank",setup(Be){const _=S(),p=V(),o=I(()=>p.tm("rechargebank"));f(!1);let x=f(""),s=v({info:{bank_code:"",bank_name:"",branch:"",card_number:"",currency:"",fixed:"",name:"",rate:"",symbol:""}});const y=P(),C=R();let a=v({id:y.params.id,amount:"",money:"",img:""});async function j(){_.loadingShow=!0;const{success:c,data:t}=await D({id:a.id});!c||(Object.assign(s,t.info),console.log(t))}j();function T(){if(!a.amount)return a.money="";a.money=Math.formatFloat(Number(a.amount)*Number(s.info.rate),Number(s.info.fixed)).toFixed(s.info.fixed)}function $(c){E([c])}function w(c){console.log("url",c),a.img=c}const m=f(null);function z(){m.value.onUploadClick()}async function B(){_.loadingShow=!0;const{success:c,data:t}=await G(a);!c||(H.success(t.msg),setTimeout(()=>{C.go(-1)},500),console.log(t))}return(c,t)=>{const N=U("van-field");return u(),h("div",O,[e("div",A,[e("div",{onClick:t[0]||(t[0]=l=>c.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},q),e("span",J,i(n(o).titleText),1)]),e("div",K,[e("div",L,[e("p",Q,[e("span",null,i(n(o).tipsText)+"\uFF1A",1),F(),b(N,{type:"number",modelValue:n(a).amount,"onUpdate:modelValue":t[1]||(t[1]=l=>n(a).amount=l),onInput:T,label:"","label-width":"0",placeholder:n(o).buyAmontPlaceholderText},null,8,["modelValue","placeholder"])]),e("div",W,[e("div",X,[e("div",Z,[e("p",ee,"1."+i(n(o).infoTitleText)+":",1)]),d(e("div",ne,[e("p",te,i(n(o).moneyText)+":",1),e("div",ie,[e("p",se," = "+i(n(s).info.symbol)+" "+i(n(a).money),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[2]||(t[2]=l=>n(r)(n(a).money))})])],512),[[g,n(a).amount]]),e("div",ae,[e("p",oe,i(n(o).nameText)+":",1),e("div",ce,[e("p",null,i(n(s).info.name),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[3]||(t[3]=l=>n(r)(n(s).info.name))})])]),e("div",le,[e("p",re,i(n(o).cardText)+":",1),e("div",de,[e("p",null,i(n(s).info.card_number),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[4]||(t[4]=l=>n(r)(n(s).info.card_number))})])]),e("div",ge,[e("p",fe,i(n(o).bankNameText)+":",1),e("div",ue,[e("p",null,i(n(s).info.bank_name),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[5]||(t[5]=l=>n(r)(n(s).info.bank_name))})])]),n(s).info.branch?(u(),h("div",he,[e("p",_e,i(n(o).khzhText),1),e("div",me,[e("p",null,i(n(s).info.branch),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[6]||(t[6]=l=>n(r)(n(s).info.branch))})])])):k("",!0),n(s).info.bank_code?(u(),h("div",ve,[e("p",be,i(n(o).yhdm)+":",1),e("div",ke,[e("p",null,i(n(s).info.bank_code),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[7]||(t[7]=l=>n(r)(n(s).info.bank_code))})])])):k("",!0),e("div",pe,[e("p",xe,i(n(o).uploadText)+":",1),e("div",ye,[d(e("img",{onClick:t[8]||(t[8]=l=>$(n(x))),src:n(a).img,alt:""},null,8,Ce),[[g,n(a).img]]),d(e("div",{class:"v-real-name-delete g-flex-justify-center g-flex-align-center",onClick:t[9]||(t[9]=l=>n(a).img="")},Te,512),[[g,n(a).img]]),d(e("div",{onClick:z,class:"v-recharge-bank-upload-tips g-flex-column g-flex-align-center g-flex-justify-center"},[$e,e("p",null,i(n(o).selectImgText),1)],512),[[g,!n(a).img]])])])]),e("div",we,[e("p",ze,"2."+i(n(o).secondText),1)])])]),e("div",{onClick:B,class:"v-recharge-bank-pop-btn g-flex-align-center g-flex-justify-center"},[e("span",null,i(n(o).finishText),1)])]),b(M,{MidrPath:"/buycoin",idString:"c-recharge-coin-upload-1",ref_key:"refUpload",ref:m,onEmitUploadSuccess:w},null,512)])}}};export{Se as default};
