import{u as U,D,v as F,c as k,s as M,e as v,E as C,ac as N,o as A,a as R,b as e,t as d,Q as T,h as s,m as a,p as _,ad as g,ae as P,H as S,d as G,af as z,ag as O,ah as Q,V as u,ai as q,aj as J,_ as K,ak as W}from"./main.26c763da.js";const X={class:"v_foget_pwd g-flex-column n-bg"},Y={class:"new-head"},Z=e("img",{src:K,alt:""},null,-1),ee=[Z],te={class:"new-head_title_text"},se=e("img",{class:"ch-bg",src:O},null,-1),oe={class:"v-foget-pwd-container"},ie={class:"n-nav-list g-flex-align-center",style:{margin:"0 20px"}},le={class:"v-form"},ne={class:"n-form-box"},ae={class:"n-form-title"},de={class:"v-form-item-box"},ce={class:"v-form-item g-flex-align-center"},re={class:"v-form-item-left-text"},me=e("i",{class:"iconfont icon-right-1-copy"},null,-1),ve={class:"v-form-item-middle-input"},_e=["placeholder"],ue={class:"n-form-box"},fe={class:"n-form-title"},pe={class:"v-form-item-box"},he={class:"v-form-item g-flex-align-center"},ge={class:"v-form-item-middle-input"},xe=["placeholder"],we={class:"n-form-box"},be={class:"n-form-title"},ye={class:"v-form-item-box"},ke={class:"v-form-item g-flex-align-center"},Ce={class:"v-form-item-middle-input"},Te=["type","placeholder"],Pe={class:"iconfont icon-bukejian"},Se={class:"iconfont icon-kejian"},Ve={class:"n-form-box"},je={class:"n-form-title"},Ie={class:"v-form-item-box"},$e={class:"v-form-item g-flex-align-center"},Be=e("div",{class:"v-form-item-left g-flex-align-center"},null,-1),Ee={class:"v-form-item-middle-input"},He=["type","placeholder"],Le={class:"iconfont icon-bukejian"},Ue={class:"iconfont icon-kejian"},De={class:"n-form-box"},Fe={class:"n-form-title"},Me={class:"v-form-item-box"},Ne={class:"v-form-item g-flex-align-center"},Ae=e("div",{class:"v-form-item-left g-flex-align-center"},null,-1),Re={class:"v-form-item-middle-input"},Ge=["placeholder"],ze={class:"v-form-item-middle-right-text"},Oe=e("div",null,null,-1),Qe=e("img",{src:W},null,-1),qe=[Qe],Je=e("div",{class:"v-form-bottom g-flex-align-center g-flex-justify-between"},null,-1),Xe={__name:"ForgetPwd",setup(Ke){let V=U();D();const x=F.exports.useI18n(),f=k(()=>x.tm("gongyong")),l=k(()=>x.tm("forgetPwd")),p=M();v("");let h=v(f.value.sendCodeText),w=C({list:[]}),m=v(0),o=C({type:1,mobile:"",password:"",code:"",email:"",area_code:"",password2:""}),c=v(!1),r=v(!1);function b(n){o.type=n}$();const y=v(null);function j(){y.value.onShow()}function I(n){o.area_code=n.area_code}async function $(){const{success:n,data:t}=await N();!n||(w.list=t.list,o.area_code=t.list[0].area_code)}function B(){m.value||(o.type==1?E():o.type==2&&H())}async function E(){p.loadingShow=!0;const{success:n,data:t}=await Q({area_code:o.area_code,mobile:o.mobile});if(!n)return;let i=60;u(t.msg),m.value=setInterval(()=>{i--,h.value=i===0?f.value.againSendCodeText:i+"s",i===0&&(clearInterval(m.value),m.value=0)},1e3)}async function H(){p.loadingShow=!0;const{success:n,data:t}=await q({email:o.email});if(!n)return;let i=60;u(t.msg),m.value=setInterval(()=>{i--,h.value=i==0?f.value.againSendCodeText:i+"s",i===0&&(clearInterval(m.value),m.value=0)},1e3)}async function L(){if(o.password!=o.password2)return u(l.value.pwdSecondTipsText);p.loadingShow=!0;const{success:n,data:t}=await J(o);!n||(u.success(t.msg),V.replace({name:"login"}))}return(n,t)=>(A(),R("div",X,[e("div",Y,[e("div",{onClick:t[0]||(t[0]=i=>n.$router.go(-1)),class:"new-head-back"},ee)]),e("div",te,d(l.value.titleText),1),se,e("div",oe,[e("div",ie,[e("div",{onClick:t[1]||(t[1]=i=>b(1)),class:T([s(o).type==1?"active":"","v-nav-item"])},[e("span",null,d(l.value.mobileLookText),1)],2),e("div",{onClick:t[2]||(t[2]=i=>b(2)),class:T([s(o).type==2?"active":"","v-nav-item"])},[e("span",null,d(l.value.emailLookText),1)],2)]),e("div",le,[a(e("div",ne,[e("div",ae,d(l.value.mobileText),1),e("div",de,[e("div",ce,[e("div",{onClick:j,class:"v-form-item-left g-flex-align-center",style:{"padding-left":"17px !important"}},[e("span",re,"+"+d(s(o).area_code),1),me]),e("div",ve,[a(e("input",{type:"text","onUpdate:modelValue":t[3]||(t[3]=i=>s(o).mobile=i),placeholder:l.value.mobilePlaceholderText},null,8,_e),[[g,s(o).mobile]])])])])],512),[[_,s(o).type==1]]),a(e("div",ue,[e("div",fe,d(l.value.emailText),1),e("div",pe,[e("div",he,[e("div",ge,[a(e("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=i=>s(o).email=i),placeholder:l.value.emailPlaceholderText},null,8,xe),[[g,s(o).email]])])])])],512),[[_,s(o).type==2]]),e("div",we,[e("div",be,d(l.value.pwdText),1),e("div",ye,[e("div",ke,[e("div",Ce,[a(e("input",{type:s(c)?"text":"password","onUpdate:modelValue":t[5]||(t[5]=i=>s(o).password=i),placeholder:l.value.pwdPlaceholderText},null,8,Te),[[P,s(o).password]])]),e("div",{onClick:t[6]||(t[6]=i=>S(c)?c.value=!s(c):c=!s(c)),class:"v-form-item-middle-right g-flex-align-center"},[a(e("i",Pe,null,512),[[_,!s(c)]]),a(e("i",Se,null,512),[[_,s(c)]])])])])]),e("div",Ve,[e("div",je,d(l.value.secondPwdText),1),e("div",Ie,[e("div",$e,[Be,e("div",Ee,[a(e("input",{type:s(r)?"text":"password","onUpdate:modelValue":t[7]||(t[7]=i=>s(o).password2=i),placeholder:l.value.secondPwdPlaceholderText},null,8,He),[[P,s(o).password2]])]),e("div",{onClick:t[8]||(t[8]=i=>S(r)?r.value=!s(r):r=!s(r)),class:"v-form-item-middle-right g-flex-align-center"},[a(e("i",Le,null,512),[[_,!s(r)]]),a(e("i",Ue,null,512),[[_,s(r)]])])])])]),e("div",De,[e("div",Fe,d(l.value.codeText),1),e("div",Me,[e("div",Ne,[Ae,e("div",Re,[a(e("input",{type:"text","onUpdate:modelValue":t[9]||(t[9]=i=>s(o).code=i),placeholder:l.value.codePlaceholderText},null,8,Ge),[[g,s(o).code]])]),e("div",{onClick:B,class:"v-form-item-middle-right g-flex-align-center"},[e("span",ze,d(s(h)),1)])])])]),e("div",{class:"n-btn-list",style:{padding:"30px 0px",position:"fixed",bottom:"20px",right:"30px"}},[Oe,e("div",{class:"v-form-btn-box"},[e("div",{onClick:L,class:"v-form-btn g-flex-align-center g-flex-justify-center"},qe)])]),Je])]),G(z,{ref_key:"refBindPhonesPop",ref:y,list:s(w).list,onEmitPhoneItemClick:I},null,8,["list"])]))}};export{Xe as default};
