import{u as D,D as H,s as L,v as M,c as g,E as C,e as p,o as f,a as _,b as e,t as a,m as r,p as v,h as o,ad as x,l as y,d as h,as as J,at as q,au as z,V as A,_ as F,J as K}from"./main.2a81f6f4.js";import{_ as Q,a as W}from"./ID_f.9e7d6ee5.js";import{_ as S}from"./OssUpload.313c65b2.js";import{_ as X}from"./SelectRadioPop.a31ab8d3.js";import"./aliyun-oss-sdk.c3a84db7.js";import"./SelectRadioPop.vue_vue_type_style_index_0_lang.6a63b429.js";const Y={class:"v_user_real g-flex-column n-bg"},Z={class:"new-head"},ee=e("img",{src:F,alt:""},null,-1),te=[ee],se={class:"new-head_title_text"},oe={class:"v-user-real-container"},ie={class:"v-form"},le={class:"v-form-item"},ne={class:"v-form-item-title"},ae=["placeholder"],re=e("div",{class:"v-form-item-input-icon"},[e("i",{class:"iconfont icon-you"})],-1),ce={class:"v-form-item"},me={class:"v-form-item-title"},de={class:"v-form-item-input"},ue=["readonly","placeholder"],ve={class:"v-form-item"},fe={class:"v-form-item-title"},_e={class:"v-form-item-input"},ge=["readonly","placeholder"],pe={class:"v-form-img-list g-flex-align-center"},xe={class:"v-form-img-item-box"},ye={class:"v-form-img-item"},he=e("div",{class:"v-form-img-item-no-img-icon"},[e("img",{src:Q,alt:""})],-1),ke={class:"v-form-img-item-no-img-text g-flex-align-center g-flex-justify-center"},Te={class:"v-user-real-form-cid-item-img-have-box"},Re=["src"],Ue={class:"v-form-img-item-box"},Ce={class:"v-form-img-item"},Se=e("div",{class:"v-form-img-item-no-img-icon"},[e("img",{src:W,alt:""})],-1),be={class:"v-form-img-item-no-img-text g-flex-align-center g-flex-justify-center"},we={class:"v-user-real-form-cid-item-img-have-box"},Ie=["src"],Ve={key:0,class:"v-form-btn-box"},Be={__name:"UserReal",setup($e){const b=D();H();const c=L(),w=M.exports.useI18n(),n=g(()=>w.tm("userReal"));let s=C({type:"",typeText:"",country:"",name:"",id_card:"",front_img:"",reverse_img:""}),m=g(()=>c.userInfo);const d=g(()=>!(!m.value.userReal.id||m.value.userReal.status==0));async function I(){c.loadingShow=!0;const{success:i,data:t}=await K();if(!!i){if(c.setUserInfo(t.info),t.info.userReal.id){Object.assign(s,t.info.userReal);let l=u.list.find(B=>B.val==t.info.userReal.type);s.typeText=l.title}else s.typeText=u.list[0].title,s.type=u.list[0].val;console.log(t)}}async function V(){c.loadingShow=!0;const{success:i,data:t}=await J({code:"realType"});!i||(u.list=t.list,I(),console.log(t))}V();let k=p(null);function $(){k.value.onShow()}let u=C({list:[]});function j(i){console.log("item",i),s.typeText=i.title,s.type=i.val}const T=p(null);function P(){T.value.onUploadClick()}function N(i){s.front_img=i}const R=p(null);function O(){R.value.onUploadClick()}function E(i){s.reverse_img=i}function U(i){q(i)}async function G(){c.loadingShow=!0;const{success:i,data:t}=await z(s);!i||(A.success(t.msg),setTimeout(()=>{b.replace({name:"main"})},500),console.log(t))}return(i,t)=>(f(),_("div",Y,[e("div",Z,[e("div",{onClick:t[0]||(t[0]=l=>i.$router.go(-1)),class:"new-head-back"},te)]),e("div",se,a(n.value.titleText),1),e("div",oe,[r(e("div",{class:"v-real-fail"},a(n.value.failRemarkText)+": "+a(o(m).userReal.reason),513),[[v,o(m).userReal.status==0&&o(m).userReal.reason]]),e("div",ie,[e("div",le,[e("div",ne,a(n.value.realTypeText),1),e("div",{onClick:$,class:"v-form-item-input"},[r(e("input",{type:"text",readonly:"","onUpdate:modelValue":t[1]||(t[1]=l=>o(s).typeText=l),placeholder:n.value.realTypePlaceholerText},null,8,ae),[[x,o(s).typeText]]),re])]),e("div",ce,[e("div",me,a(n.value.nameText),1),e("div",de,[r(e("input",{readonly:d.value,type:"text","onUpdate:modelValue":t[2]||(t[2]=l=>o(s).name=l),placeholder:n.value.namePlaceholderText},null,8,ue),[[x,o(s).name]])])]),e("div",ve,[e("div",fe,a(n.value.idCardNumText),1),e("div",_e,[r(e("input",{readonly:d.value,type:"text","onUpdate:modelValue":t[3]||(t[3]=l=>o(s).id_card=l),placeholder:n.value.idCardNumPlaceholderText},null,8,ge),[[x,o(s).id_card]])])]),e("div",pe,[e("div",xe,[e("div",ye,[r(e("div",{onClick:P,class:"v-form-img-item-no-img g-flex-column g-flex-align-center g-flex-justify-center"},[he,e("div",ke,[e("span",null,a(n.value.frontImgText),1)])],512),[[v,!o(s).front_img]]),r(e("div",Te,[e("img",{onClick:t[4]||(t[4]=l=>U([o(s).front_img])),src:o(s).front_img,alt:""},null,8,Re),d.value?y("",!0):(f(),_("i",{key:0,onClick:t[5]||(t[5]=l=>o(s).front_img=""),class:"iconfont icon-guanbi"}))],512),[[v,o(s).front_img]])])]),e("div",Ue,[e("div",Ce,[r(e("div",{onClick:O,class:"v-form-img-item-no-img g-flex-column g-flex-align-center g-flex-justify-center"},[Se,e("div",be,[e("span",null,a(n.value.backImgText),1)])],512),[[v,!o(s).reverse_img]]),r(e("div",we,[e("img",{onClick:t[6]||(t[6]=l=>U([o(s).reverse_img])),src:o(s).reverse_img,alt:""},null,8,Ie),d.value?y("",!0):(f(),_("i",{key:0,onClick:t[7]||(t[7]=l=>o(s).reverse_img=""),class:"iconfont icon-guanbi"}))],512),[[v,o(s).reverse_img]])])])])]),d.value?y("",!0):(f(),_("div",Ve,[e("div",{onClick:G,class:"v-form-btn g-flex-align-center g-flex-justify-center"},[e("span",null,a(n.value.submitText),1)])]))]),h(X,{columns:o(u).list,onEmitsSelectConfirm:j,selectVal:o(s).type,ref_key:"refSelectRadioPop",ref:k},null,8,["columns","selectVal"]),h(S,{MidrPath:"/userReal/",idString:"v-user-real-front-img",onEmitUploadSuccess:N,ref_key:"refOssUpload",ref:T},null,512),h(S,{MidrPath:"/userReal/",idString:"v-user-real-reverse-img",onEmitUploadSuccess:E,ref_key:"refOssUploadSecond",ref:R},null,512)]))}};export{Be as default};
