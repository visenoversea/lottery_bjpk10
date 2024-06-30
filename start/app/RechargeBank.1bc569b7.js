import{s as S,u as V,c as I,r as f,a as v,l as P,k as R,b as U,o as u,d as h,f as e,t as i,g as n,M as F,e as b,j as d,v as g,A as k,ab as M,X as A,ac as D,T as E}from"./index.de11b688.js";import{c as r}from"./index.78e71f9e.js";import{_ as G}from"./OssUpload.01940395.js";const H={class:"v_recharge_bank g-flex-column"},O={class:"v-head g-flex-justify-center g-flex-align-center"},X=e("i",{class:"iconfont icon-zuojiantou"},null,-1),q=[X],J={class:"v-title g-flex-align-center g-flex-justify-center"},K={class:"v-recharge-bank-container"},L={class:"v-recharge-bank-pop-box"},Q={class:"v-recharge-bank-buy-coin g-flex-align-center"},W={class:"v-recharge-bank-list"},Y={class:"v-recharge-bank-item-box"},Z={class:"g-flex-align-center g-flex-justify-between"},ee={class:"v-recharge-bank-list-title"},ne={class:"v-recharge-bank-item g-flex-align-center"},te={class:"v-recharge-bank-item-title"},ie={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},se={class:"v-recharge-bank-item-right-money"},oe={class:"v-recharge-bank-item g-flex-align-center"},ae={class:"v-recharge-bank-item-title"},ce={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},le={class:"v-recharge-bank-item g-flex-align-center"},re={class:"v-recharge-bank-item-title"},de={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},ge={class:"v-recharge-bank-item g-flex-align-center"},fe={class:"v-recharge-bank-item-title"},ue={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},he={key:0,class:"v-recharge-bank-item g-flex-align-center"},me={class:"v-recharge-bank-item-title"},_e={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},ve={key:1,class:"v-recharge-bank-item g-flex-align-center"},be={class:"v-recharge-bank-item-title"},ke={class:"v-recharge-bank-item-right g-flex-align-center g-flex-justify-end"},pe={class:"v-recharge-bank-upload-box"},xe={class:"v-recharge-bank-upload-title"},ye={class:"v-recharge-bank-upload g-flex-align-center g-flex-justify-center"},je=["src"],Ce=e("i",{class:"iconfont icon-shanchu2"},null,-1),Te=[Ce],$e=e("i",{class:"iconfont icon-jiahao1"},null,-1),we={class:"v-recharge-bank-item-box"},ze={class:"v-recharge-bank-list-title"},Ie={__name:"RechargeBank",setup(Ne){const m=S(),p=V(),a=I(()=>p.tm("rechargebank"));f(!1);let x=f(""),s=v({info:{bank_code:"",bank_name:"",branch:"",card_number:"",currency:"",fixed:"",name:"",rate:"",symbol:""}});const y=P(),j=R();let o=v({id:y.params.id,amount:"",money:"",img:""});async function C(){m.loadingShow=!0;const{success:c,data:t}=await M({id:o.id});!c||(Object.assign(s,t.info),console.log(t))}C();function T(){if(!o.amount)return o.money="";o.money=Math.formatFloat(Number(o.amount)*Number(s.info.rate),Number(s.info.fixed)).toFixed(s.info.fixed)}function $(c){A([c])}function w(c){console.log("url",c),o.img=c}const _=f(null);function z(){_.value.onUploadClick()}async function N(){m.loadingShow=!0;const{success:c,data:t}=await D(o);!c||(E.success(t.msg),setTimeout(()=>{j.go(-1)},500),console.log(t))}return(c,t)=>{const B=U("van-field");return u(),h("div",H,[e("div",O,[e("div",{onClick:t[0]||(t[0]=l=>c.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},q),e("span",J,i(n(a).titleText),1)]),e("div",K,[e("div",L,[e("p",Q,[e("span",null,i(n(a).tipsText)+"\uFF1A",1),F(),b(B,{type:"number",modelValue:n(o).amount,"onUpdate:modelValue":t[1]||(t[1]=l=>n(o).amount=l),onInput:T,label:"","label-width":"0",placeholder:n(a).buyAmontPlaceholderText},null,8,["modelValue","placeholder"])]),e("div",W,[e("div",Y,[e("div",Z,[e("p",ee,"1."+i(n(a).infoTitleText)+":",1)]),d(e("div",ne,[e("p",te,i(n(a).moneyText)+":",1),e("div",ie,[e("p",se," \u2248 "+i(n(s).info.symbol)+" "+i(n(o).money),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[2]||(t[2]=l=>n(r)(n(o).money))})])],512),[[g,n(o).amount]]),e("div",oe,[e("p",ae,i(n(a).nameText)+":",1),e("div",ce,[e("p",null,i(n(s).info.name),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[3]||(t[3]=l=>n(r)(n(s).info.name))})])]),e("div",le,[e("p",re,i(n(a).cardText)+":",1),e("div",de,[e("p",null,i(n(s).info.card_number),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[4]||(t[4]=l=>n(r)(n(s).info.card_number))})])]),e("div",ge,[e("p",fe,i(n(a).bankNameText)+":",1),e("div",ue,[e("p",null,i(n(s).info.bank_name),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[5]||(t[5]=l=>n(r)(n(s).info.bank_name))})])]),n(s).info.branch?(u(),h("div",he,[e("p",me,i(n(a).khzhText),1),e("div",_e,[e("p",null,i(n(s).info.branch),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[6]||(t[6]=l=>n(r)(n(s).info.branch))})])])):k("",!0),n(s).info.bank_code?(u(),h("div",ve,[e("p",be,i(n(a).yhdm)+":",1),e("div",ke,[e("p",null,i(n(s).info.bank_code),1),e("i",{class:"iconfont icon-fuzhi",onClick:t[7]||(t[7]=l=>n(r)(n(s).info.bank_code))})])])):k("",!0),e("div",pe,[e("p",xe,i(n(a).uploadText)+":",1),e("div",ye,[d(e("img",{onClick:t[8]||(t[8]=l=>$(n(x))),src:n(o).img,alt:""},null,8,je),[[g,n(o).img]]),d(e("div",{class:"v-real-name-delete g-flex-justify-center g-flex-align-center",onClick:t[9]||(t[9]=l=>n(o).img="")},Te,512),[[g,n(o).img]]),d(e("div",{onClick:z,class:"v-recharge-bank-upload-tips g-flex-column g-flex-align-center g-flex-justify-center"},[$e,e("p",null,i(n(a).selectImgText),1)],512),[[g,!n(o).img]])])])]),e("div",we,[e("p",ze,"2."+i(n(a).secondText),1)])])]),e("div",{onClick:N,class:"v-recharge-bank-pop-btn g-flex-align-center g-flex-justify-center"},[e("span",null,i(n(a).finishText),1)])]),b(G,{MidrPath:"/buycoin",idString:"c-recharge-coin-upload-1",ref_key:"refUpload",ref:_,onEmitUploadSuccess:w},null,512)])}}};export{Ie as default};