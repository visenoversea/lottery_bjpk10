import{u as k,e as _,s as y,v as T,c as h,E as C,o as j,a as S,b as e,t as v,m as o,p as r,h as s,ae as p,H as f,J as V,aC as I,V as U,_ as $}from"./main.11e38532.js";const B={class:"v_change_pwd g-flex-column n-bg"},D={class:"new-head"},H=e("img",{src:$,alt:""},null,-1),E=[H],G={class:"new-head_title_text"},L={class:"v-change-pwd-container"},R={class:"v-form"},J={class:"v-form-item-box"},M={class:"v-form-item-box-title"},N={class:"v-form-item g-flex-align-center"},O={class:"v-form-item-middle-input"},q=["type","placeholder"],z={class:"iconfont icon-bukejian"},A={class:"iconfont icon-kejian"},F={class:"v-form-item-box"},K={class:"v-form-item-box-title"},Q={class:"v-form-item g-flex-align-center"},W={class:"v-form-item-middle-input"},X=["type","placeholder"],Y={class:"iconfont icon-bukejian"},Z={class:"iconfont icon-kejian"},ee={class:"v-form-item-box"},se={class:"v-form-item-box-title"},te={class:"v-form-item g-flex-align-center"},oe={class:"v-form-item-middle-input"},ne=["type","placeholder"],ie={class:"iconfont icon-bukejian"},le={class:"iconfont icon-kejian"},ce={__name:"ChangePwd",setup(ae){let w=k(),i=_(!1),l=_(!1),a=_(!1);const m=y(),g=T.exports.useI18n(),d=h(()=>g.tm("changePwd"));_("");let x=h(()=>m.userInfo),c=C({oldPassword:"",password:"",password2:""});async function P(){const{success:u,data:t}=await V();!u||m.setUserInfo(t.info)}P();async function b(){m.loadingShow=!0;const{success:u,data:t}=await I(c);!u||(U.success(t.msg),setTimeout(()=>{w.go(-1)},500))}return(u,t)=>(j(),S("div",B,[e("div",D,[e("div",{onClick:t[0]||(t[0]=n=>u.$router.go(-1)),class:"new-head-back"},E)]),e("div",G,v(d.value.titleText),1),e("div",L,[e("div",R,[o(e("div",J,[e("div",M,[e("span",null,v(d.value.oldPwdText),1)]),e("div",N,[e("div",O,[o(e("input",{type:s(i)?"text":"password","onUpdate:modelValue":t[1]||(t[1]=n=>s(c).oldPassword=n),placeholder:d.value.oldPwdPlaceholderText},null,8,q),[[p,s(c).oldPassword]])]),e("div",{onClick:t[2]||(t[2]=n=>f(i)?i.value=!s(i):i=!s(i)),class:"v-form-item-middle-right g-flex-align-center"},[o(e("i",z,null,512),[[r,!s(i)]]),o(e("i",A,null,512),[[r,s(i)]])])])],512),[[r,s(x).passwordStatus==1]]),e("div",F,[e("div",K,[e("span",null,v(d.value.newPwdText),1)]),e("div",Q,[e("div",W,[o(e("input",{type:s(l)?"text":"password","onUpdate:modelValue":t[3]||(t[3]=n=>s(c).password=n),placeholder:d.value.newPwdPlaceholderText},null,8,X),[[p,s(c).password]])]),e("div",{onClick:t[4]||(t[4]=n=>f(l)?l.value=!s(l):l=!s(l)),class:"v-form-item-middle-right g-flex-align-center"},[o(e("i",Y,null,512),[[r,!s(l)]]),o(e("i",Z,null,512),[[r,s(l)]])])])]),e("div",ee,[e("div",se,[e("span",null,v(d.value.comfirmPwdText),1)]),e("div",te,[e("div",oe,[o(e("input",{type:s(a)?"text":"password","onUpdate:modelValue":t[5]||(t[5]=n=>s(c).password2=n),placeholder:d.value.confirmPwdPlaceholderText},null,8,ne),[[p,s(c).password2]])]),e("div",{onClick:t[6]||(t[6]=n=>f(a)?a.value=!s(a):a=!s(a)),class:"v-form-item-middle-right g-flex-align-center"},[o(e("i",ie,null,512),[[r,!s(a)]]),o(e("i",le,null,512),[[r,s(a)]])])])]),e("div",{onClick:b,class:"v-submit-btn g-flex-align-center g-flex-justify-center"},v(d.value.submitBtnText),1)])])]))}};export{ce as default};
