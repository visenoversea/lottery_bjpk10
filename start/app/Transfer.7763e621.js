import{s as U,e as u,v as w,c as g,w as S,J as P,U as V,r as I,o as k,a as j,b as e,t,h as n,d as T,V as b,bi as B,bj as M,P as $,ar as E,H}from"./main.7d3dcc45.js";const N={class:"v_transfer g-flex-column n-bg"},R={class:"new-head"},F=e("img",{src:H,alt:""},null,-1),X=[F],J=e("i",{class:"iconfont icon-datijilu"},null,-1),O=[J],q={class:"new-head_title_text"},z={class:"v-transfer-title g-flex"},A={class:"name"},K={class:"balance"},L={class:"v-transfer-content"},Q={class:"v-transfer-content-item"},W={class:"item-left"},Y={class:"consume-value"},Z={class:"item-select"},ee={class:"select-wrap"},te=["src"],se={class:"coins"},ae=e("span",null,null,-1),ne=e("div",{class:"v-line"},[e("div",{class:"line"})],-1),oe={class:"v-transfer-content-item v-transfer-content-item-bot"},le={class:"item-left"},ce={class:"consume-value"},ie={class:"item-select"},ue={class:"select-wrap"},de=["src"],ve={class:"coins"},re=e("span",null,null,-1),_e={class:"exchange-value"},me={class:"introduce-value"},he={class:"introduce-value"},pe={class:"introduce-value"},ge={__name:"Transfer",setup(fe){const D=U(),l=u(1),r=u(),_=u(),f=w.exports.useI18n(),c=g(()=>f.tm("myTransfer")),h=g(()=>f.tm("mytransfer"));let a=u({text:l.value===2?"USDT":"DCPTG",img:l.value===2?USDTIMG:DCPIMG,amount:""}),i=u({text:l.value===1?"USDT":"DCPTG",img:l.value===1?USDTIMG:DCPIMG,amount:""});const m=u(0);let p=null;u();const x=async()=>{const{data:o}=await B();m.value=o.data.USDT,p=setTimeout(x,5e3)},C=async()=>{if(!a.value.amount)return;D.loadingShow=!0;const{success:o,data:s}=await M({amount:a.value.amount,type:l.value});!o||($(s.msg),a.value.amount="",r.value=s.balance_dcptg,_.value=s.balance)},y=()=>{a.value.amount=l.value===1?r.value:_.value},G=async()=>{var d;const{success:o,data:s}=await E();r.value=(d=s.info)==null?void 0:d.balance_dcptg,_.value=s.info.balance};return S(a,o=>{l.value===1?i.value.amount=(o.amount*m.value).toFixed(2)+"":i.value.amount=(o.amount/m.value).toFixed(2)+""},{deep:!0}),P(()=>{x(),G()}),V(()=>{p&&clearTimeout(p)}),(o,s)=>{const d=I("van-field");return k(),j("div",N,[e("div",R,[e("div",{onClick:s[0]||(s[0]=v=>o.$router.go(-1)),class:"new-head-back"},X),e("div",{onClick:s[1]||(s[1]=v=>o.$router.push({name:"transferrecord"})),class:"v-head-right g-flex-align-center"},O)]),e("div",q,t(h.value.titletext),1),e("div",z,[e("span",A,"Swap "+t(n(a).text),1),e("span",K,t(h.value.consumebalance)+": "+t(l.value===1?r.value:_.value),1)]),e("div",L,[e("div",Q,[e("div",W,[e("p",null,t(c.value.consumeText)+" ("+t(n(a).text)+")",1),e("div",Y,[T(d,{modelValue:n(a).amount,"onUpdate:modelValue":s[2]||(s[2]=v=>n(a).amount=v),label:"",placeholder:"0.00"},null,8,["modelValue"])])]),e("div",Z,[e("div",ee,[e("img",{src:n(a).img,alt:""},null,8,te),e("div",se,[b(t(n(a).text),1),ae]),e("div",{class:"max",onClick:y},t(h.value.consumeamountmax),1)])])]),ne,e("div",oe,[e("div",le,[e("p",null,t(c.value.receiveText)+" ("+t(n(i).text)+")",1),e("div",ce,[T(d,{modelValue:n(i).amount,"onUpdate:modelValue":s[3]||(s[3]=v=>n(i).amount=v),label:"",readonly:"",placeholder:"0.00"},null,8,["modelValue"])])]),e("div",ie,[e("div",ue,[e("img",{src:n(i).img,alt:""},null,8,de),e("div",ve,[b(t(n(i).text),1),re])])])])]),e("div",_e,t(c.value.EsimatedText)+":1 DCPTG\u2248"+t(m.value)+" USDT",1),e("div",me,t(c.value.introduceText),1),e("div",he,t(c.value.introduce1Text),1),e("div",pe,t(c.value.introduce2Text),1),e("div",{class:"exchange-btn g-flex-align-center g-flex-justify-center",onClick:C},t(c.value.exchangeText),1)])}}};export{ge as default};
