import{f as L,B as U,u as F,c as C,s as M,g as v,C as k,a2 as N,o as A,a as D,b as e,t as a,d as t,H as T,p as d,v as f,a3 as x,Z as P,E as S,e as R,$ as G,a4 as O,S as u,a6 as Z,a9 as q}from"./main.01005b7b.js";const J={class:"v_foget_pwd g-flex-column"},K={class:"v-foget-pwd-head g-flex-align-center"},Q=e("i",{class:"iconfont icon-zuojiantou"},null,-1),W=[Q],X={class:"v-title g-flex-align-center g-flex-justify-center"},Y={class:"v-foget-pwd-container"},ee={class:"v-nav-list g-flex-align-center"},te={class:"v-form"},se={class:"v-form-item-box"},oe={class:"v-form-item-box-title"},ie={class:"v-form-item g-flex-align-center"},le={class:"v-form-item-left-text"},ne=e("i",{class:"iconfont icon-right-1-copy"},null,-1),ae={class:"v-form-item-middle-input"},de=["placeholder"],ce={class:"v-form-item-box"},re={class:"v-form-item-box-title"},me={class:"v-form-item g-flex-align-center"},ve=e("div",{class:"v-form-item-left g-flex-align-center"},[e("i",{class:"iconfont icon-youxiang"})],-1),fe={class:"v-form-item-middle-input"},ue=["placeholder"],_e={class:"v-form-item-box"},pe={class:"v-form-item-box-title"},ge={class:"v-form-item g-flex-align-center"},xe=e("div",{class:"v-form-item-left g-flex-align-center"},[e("i",{class:"iconfont icon-ziyuanxhdpi"})],-1),he={class:"v-form-item-middle-input"},we=["type","placeholder"],ye={class:"iconfont icon-bukejian"},be={class:"iconfont icon-kejian"},Ce={class:"v-form-item-box"},ke={class:"v-form-item-box-title"},Te={class:"v-form-item g-flex-align-center"},Pe=e("div",{class:"v-form-item-left g-flex-align-center"},[e("i",{class:"iconfont icon-ziyuanxhdpi"})],-1),Se={class:"v-form-item-middle-input"},je=["type","placeholder"],Ve={class:"iconfont icon-bukejian"},$e={class:"iconfont icon-kejian"},Be={class:"v-form-item-box"},Ie={class:"v-form-item-box-title"},ze={class:"v-form-item g-flex-align-center"},Ee=e("div",{class:"v-form-item-left g-flex-align-center"},[e("i",{class:"iconfont icon-yanzhengma"})],-1),He={class:"v-form-item-middle-input"},Le=["placeholder"],Ue={class:"v-form-item-middle-right-text"},Fe={class:"v-form-btn-box"},Me=e("div",{class:"v-form-bottom g-flex-align-center g-flex-justify-between"},null,-1),De={__name:"ForgetPwd",setup(Ne){let j=L();U();const h=F(),_=C(()=>h.tm("gongyong")),l=C(()=>h.tm("forgetPwd")),p=M();v("");let g=v(_.value.sendCodeText),w=k({list:[]}),m=v(0),o=k({type:1,mobile:"",password:"",code:"",email:"",area_code:"",password2:""}),c=v(!1),r=v(!1);function y(n){o.type=n}B();const b=v(null);function V(){b.value.onShow()}function $(n){o.area_code=n.area_code}async function B(){const{success:n,data:s}=await N();!n||(w.list=s.list,o.area_code=s.list[0].area_code)}function I(){m.value||(o.type==1?z():o.type==2&&E())}async function z(){p.loadingShow=!0;const{success:n,data:s}=await O({area_code:o.area_code,mobile:o.mobile});if(!n)return;let i=60;u(s.msg),m.value=setInterval(()=>{i--,g.value=i===0?_.value.againSendCodeText:i+"s",i===0&&(clearInterval(m.value),m.value=0)},1e3)}async function E(){p.loadingShow=!0;const{success:n,data:s}=await Z({email:o.email});if(!n)return;let i=60;u(s.msg),m.value=setInterval(()=>{i--,g.value=i==0?_.value.againSendCodeText:i+"s",i===0&&(clearInterval(m.value),m.value=0)},1e3)}async function H(){if(o.password!=o.password2)return u(l.value.pwdSecondTipsText);p.loadingShow=!0;const{success:n,data:s}=await q(o);!n||(u.success(s.msg),j.replace({name:"login"}))}return(n,s)=>(A(),D("div",J,[e("div",K,[e("div",{onClick:s[0]||(s[0]=i=>n.$router.go(-1)),class:"v-foget-pwd-head-back g-flex-align-center"},W),e("div",X,[e("span",null,a(t(l).titleText),1)])]),e("div",Y,[e("div",ee,[e("div",{onClick:s[1]||(s[1]=i=>y(1)),class:T([t(o).type==1?"active":"","v-nav-item"])},[e("span",null,a(t(l).mobileLookText),1)],2),e("div",{onClick:s[2]||(s[2]=i=>y(2)),class:T([t(o).type==2?"active":"","v-nav-item"])},[e("span",null,a(t(l).emailLookText),1)],2)]),e("div",te,[d(e("div",se,[e("div",oe,[e("span",null,a(t(l).mobileText),1)]),e("div",ie,[e("div",{onClick:V,class:"v-form-item-left g-flex-align-center"},[e("span",le,"+"+a(t(o).area_code),1),ne]),e("div",ae,[d(e("input",{type:"text","onUpdate:modelValue":s[3]||(s[3]=i=>t(o).mobile=i),placeholder:t(l).mobilePlaceholderText},null,8,de),[[x,t(o).mobile]])])])],512),[[f,t(o).type==1]]),d(e("div",ce,[e("div",re,[e("span",null,a(t(l).emailText),1)]),e("div",me,[ve,e("div",fe,[d(e("input",{type:"text","onUpdate:modelValue":s[4]||(s[4]=i=>t(o).email=i),placeholder:t(l).emailPlaceholderText},null,8,ue),[[x,t(o).email]])])])],512),[[f,t(o).type==2]]),e("div",_e,[e("div",pe,[e("span",null,a(t(l).pwdText),1)]),e("div",ge,[xe,e("div",he,[d(e("input",{type:t(c)?"text":"password","onUpdate:modelValue":s[5]||(s[5]=i=>t(o).password=i),placeholder:t(l).pwdPlaceholderText},null,8,we),[[P,t(o).password]])]),e("div",{onClick:s[6]||(s[6]=i=>S(c)?c.value=!t(c):c=!t(c)),class:"v-form-item-middle-right g-flex-align-center"},[d(e("i",ye,null,512),[[f,!t(c)]]),d(e("i",be,null,512),[[f,t(c)]])])])]),e("div",Ce,[e("div",ke,[e("span",null,a(t(l).secondPwdText),1)]),e("div",Te,[Pe,e("div",Se,[d(e("input",{type:t(r)?"text":"password","onUpdate:modelValue":s[7]||(s[7]=i=>t(o).password2=i),placeholder:t(l).secondPwdPlaceholderText},null,8,je),[[P,t(o).password2]])]),e("div",{onClick:s[8]||(s[8]=i=>S(r)?r.value=!t(r):r=!t(r)),class:"v-form-item-middle-right g-flex-align-center"},[d(e("i",Ve,null,512),[[f,!t(r)]]),d(e("i",$e,null,512),[[f,t(r)]])])])]),e("div",Be,[e("div",Ie,[e("span",null,a(t(l).codeText),1)]),e("div",ze,[Ee,e("div",He,[d(e("input",{type:"text","onUpdate:modelValue":s[9]||(s[9]=i=>t(o).code=i),placeholder:t(l).codePlaceholderText},null,8,Le),[[x,t(o).code]])]),e("div",{onClick:I,class:"v-form-item-middle-right g-flex-align-center"},[e("span",Ue,a(t(g)),1)])])]),e("div",Fe,[e("div",{onClick:H,class:"v-form-btn g-flex-align-center g-flex-justify-center"},[e("span",null,a(t(l).submitBtnText),1)])]),Me])]),R(G,{ref_key:"refBindPhonesPop",ref:b,list:t(w).list,onEmitPhoneItemClick:$},null,8,["list"])]))}};export{De as default};
