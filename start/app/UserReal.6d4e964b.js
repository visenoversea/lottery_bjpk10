import{s as P,u as z,c as f,f as B,C as E,g as I,r as H,o as v,a as _,b as e,t as o,d as s,H as p,p as a,v as c,e as g,m as x,W as L,X as D,S as G,Y as M}from"./main.9f7457bf.js";import{_ as j}from"./OssUpload.9266c111.js";const W=""+new URL("../img/icon/user_identity_card1.png",import.meta.url).href,S=""+new URL("../img/icon/user_identity_corner.png",import.meta.url).href,X=""+new URL("../img/icon/user_identity_card2.png",import.meta.url).href;const Y={class:"v_user_real g-flex-column"},Z={class:"v-head g-flex-justify-center g-flex-align-center"},q=e("i",{class:"iconfont icon-zuojiantou"},null,-1),A=[q],F={class:"v-title g-flex-align-center g-flex-justify-center"},J={class:"v-user-real-container"},K={class:"v-licai-head g-flex-align-center g-flex-justify-center"},Q={class:"v-licai-head-list g-flex-align-center"},ee={class:"v-licai-head-item-title"},se={class:"v-licai-head-item-title"},te={class:"v-licai-head-item-title"},ie={class:"v-user-real-form"},le={class:"v-user-real-form-item"},oe={class:"v-user-real-form-item-title"},ne={class:"v-user-real-form-item-input"},re={class:"v-user-real-form-item"},ae={class:"v-user-real-form-item-title"},ce={class:"v-user-real-form-item-input"},de={class:"v-user-real-form-item"},me={class:"v-user-real-form-item-title"},ue={class:"v-user-real-form-cid-list"},fe={class:"v-user-real-form-cid-item"},ve=e("img",{src:W,alt:""},null,-1),_e={class:"v-user-real-form-cid-item-img-title"},ge=e("img",{src:S,alt:""},null,-1),he=[ge],pe={class:"v-user-real-form-cid-item-img-have g-flex-column g-flex-align-center g-flex-justify-center"},xe={class:"v-user-real-form-cid-item-img-have-box"},ye=["src"],ke={class:"v-user-real-form-cid-item-img-have-title"},Ce={class:"v-user-real-form-cid-item"},Ue=e("img",{src:X,alt:""},null,-1),Re={class:"v-user-real-form-cid-item-img-title"},Te=e("img",{src:S,alt:""},null,-1),be=[Te],Ie={class:"v-user-real-form-cid-item-img-have g-flex-column g-flex-align-center g-flex-justify-center"},je={class:"v-user-real-form-cid-item-img-have-box"},Se=["src"],we={class:"v-user-real-form-cid-item-img-have-title"},Oe={__name:"UserReal",setup($e){const u=P(),y=z(),l=f(()=>y.tm("userReal"));f(()=>y.tm("gongyong"));let w=B(),i=E({type:1,name:"",id_card:"",front_img:"",reverse_img:""});function h(n){d.value||(i.type=n)}let m=f(()=>u.userInfo);const d=f(()=>!(!m.value.userReal.id||m.value.userReal.status==0));async function $(){u.loadingShow=!0;const{success:n,data:t}=await L();!n||(u.setUserInfo(t.info),t.info.userReal.id&&Object.assign(i,t.info.userReal),console.log(t))}$();const k=I(null);function C(){k.value.onUploadClick()}function V(n){i.front_img=n}const U=I(null);function R(){U.value.onUploadClick()}function N(n){i.reverse_img=n}async function O(){u.loadingShow=!0;const{success:n,data:t}=await D(i);!n||(G.success(t.msg),setTimeout(()=>{w.replace({name:"main"})},500),console.log(t))}function T(n){M(n)}return(n,t)=>{const b=H("van-field");return v(),_("div",Y,[e("div",Z,[e("div",{onClick:t[0]||(t[0]=r=>n.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},A),e("span",F,o(s(l).titleText),1)]),e("div",J,[e("div",K,[e("div",Q,[e("div",{onClick:t[1]||(t[1]=r=>h(1)),class:p([s(i).type==1?"active":"","v-licai-head-item g-flex-justify-center g-flex-align-center"])},[e("div",ee,o(s(l).shengdengZhengText),1)],2),e("div",{onClick:t[2]||(t[2]=r=>h(2)),class:p([s(i).type==2?"active":"","v-licai-head-item g-flex-align-center g-flex-justify-center"])},[e("div",se,o(s(l).huzhaoText),1)],2),e("div",{onClick:t[3]||(t[3]=r=>h(3)),class:p([s(i).type==3?"active":"","v-licai-head-item g-flex-align-center g-flex-justify-center"])},[e("div",te,o(s(l).jiashizhengText),1)],2)])]),a(e("div",{class:"v-real-fail"},o(s(l).failRemarkText)+": "+o(s(m).userReal.reason),513),[[c,s(m).userReal.status==0&&s(m).userReal.reason]]),e("div",ie,[e("div",le,[e("div",oe,o(s(l).nameText),1),e("div",ne,[g(b,{readonly:s(d),modelValue:s(i).name,"onUpdate:modelValue":t[4]||(t[4]=r=>s(i).name=r),label:"","label-width":"0",placeholder:s(l).namePlaceholderText},null,8,["readonly","modelValue","placeholder"])])]),e("div",re,[e("div",ae,o(s(l).idCardNumText),1),e("div",ce,[g(b,{readonly:s(d),modelValue:s(i).id_card,"onUpdate:modelValue":t[5]||(t[5]=r=>s(i).id_card=r),label:"","label-width":"0",placeholder:s(l).idCardNumPlaceholderText},null,8,["readonly","modelValue","placeholder"])])]),e("div",de,[e("div",me,o(s(l).idImgText),1),e("div",ue,[e("div",fe,[a(e("div",{onClick:C,class:"v-user-real-form-cid-item-img g-flex-column g-flex-align-center g-flex-justify-center"},[ve,e("p",_e,o(s(l).frontImgText),1)],512),[[c,!s(i).front_img]]),a(e("div",{onClick:C,class:"v-user-real-form-cid-item-out"},he,512),[[c,!s(i).front_img]]),a(e("div",pe,[e("div",xe,[e("img",{onClick:t[6]||(t[6]=r=>T([s(i).front_img])),src:s(i).front_img,alt:""},null,8,ye),s(d)?x("",!0):(v(),_("i",{key:0,onClick:t[7]||(t[7]=r=>s(i).front_img=""),class:"iconfont icon-guanbi"}))]),e("span",ke,o(s(l).frontImgText),1)],512),[[c,s(i).front_img]])]),e("div",Ce,[a(e("div",{onClick:R,class:"v-user-real-form-cid-item-img g-flex-column g-flex-align-center g-flex-justify-center"},[Ue,e("p",Re,o(s(l).backImgText),1)],512),[[c,!s(i).reverse_img]]),a(e("div",{onClick:R,class:"v-user-real-form-cid-item-out"},be,512),[[c,!s(i).reverse_img]]),a(e("div",Ie,[e("div",je,[e("img",{onClick:t[8]||(t[8]=r=>T([s(i).reverse_img])),src:s(i).reverse_img,alt:""},null,8,Se),s(d)?x("",!0):(v(),_("i",{key:0,onClick:t[9]||(t[9]=r=>s(i).reverse_img=""),class:"iconfont icon-guanbi"}))]),e("span",we,o(s(l).backImgText),1)],512),[[c,s(i).reverse_img]])])])]),s(d)?x("",!0):(v(),_("div",{key:0,onClick:O,class:"v-user-real-form-btn g-flex-align-center g-flex-justify-center"},[e("span",null,o(s(l).sureBtnText),1)]))])]),g(j,{MidrPath:"/userReal/",idString:"v-user-real-front-img",onEmitUploadSuccess:V,ref_key:"refOssUpload",ref:k},null,512),g(j,{MidrPath:"/userReal/",idString:"v-user-real-reverse-img",onEmitUploadSuccess:N,ref_key:"refOssUploadSecond",ref:U},null,512)])}}};export{Oe as default};
