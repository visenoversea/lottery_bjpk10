import{u as B,D,s as L,v as M,c as g,E as C,e as p,o as f,a as _,b as e,t as a,m as r,p as v,h as o,aj as y,l as x,d as h,ay as z,az as A,aA as q,P as F,H as J,ar as K}from"./main.9f0aae05.js";import{_ as Q,a as W}from"./ID_f.9e7d6ee5.js";import{_ as S}from"./OssUpload.e5f52ac4.js";import{_ as X}from"./SelectRadioPop.bf2a6456.js";import"./aliyun-oss-sdk.da8b1047.js";import"./SelectRadioPop.vue_vue_type_style_index_0_lang.6a63b429.js";const Y={class:"v_user_real g-flex-column n-bg"},Z={class:"new-head"},ee=e("img",{src:J,alt:""},null,-1),te=[ee],se={class:"new-head_title_text"},oe={class:"v-user-real-container"},ie={class:"v-form"},le={class:"v-form-item"},ne={class:"v-form-item-title"},ae=["placeholder"],re=e("div",{class:"v-form-item-input-icon"},[e("i",{class:"iconfont icon-you"})],-1),ce={class:"v-form-item"},me={class:"v-form-item-title"},de={class:"v-form-item-input"},ue=["readonly","placeholder"],ve={class:"v-form-item"},fe={class:"v-form-item-title"},_e={class:"v-form-item-input"},ge=["readonly","placeholder"],pe={class:"v-form-img-list g-flex-align-center"},ye={class:"v-form-img-item-box"},xe={class:"v-form-img-item"},he=e("div",{class:"v-form-img-item-no-img-icon"},[e("img",{src:Q,alt:""})],-1),ke={class:"v-form-img-item-no-img-text g-flex-align-center g-flex-justify-center"},Te={class:"v-user-real-form-cid-item-img-have-box"},Re=["src"],Ue={class:"v-form-img-item-box"},Ce={class:"v-form-img-item"},Se=e("div",{class:"v-form-img-item-no-img-icon"},[e("img",{src:W,alt:""})],-1),be={class:"v-form-img-item-no-img-text g-flex-align-center g-flex-justify-center"},we={class:"v-user-real-form-cid-item-img-have-box"},Ie=["src"],je={key:0,class:"v-form-btn-box"},He={__name:"UserReal",setup(Pe){const b=B();D();const c=L(),w=M.exports.useI18n(),n=g(()=>w.tm("userReal"));let s=C({type:"",typeText:"",country:"",name:"",id_card:"",front_img:"",reverse_img:""}),m=g(()=>c.userInfo);const d=g(()=>!(!m.value.userReal.id||m.value.userReal.status==0));async function I(){c.loadingShow=!0;const{success:i,data:t}=await K();if(!!i){if(c.setUserInfo(t.info),t.info.userReal.id){Object.assign(s,t.info.userReal);let l=u.list.find(H=>H.val==t.info.userReal.type);s.typeText=l.title}else s.typeText=u.list[0].title,s.type=u.list[0].val;console.log(t)}}async function j(){c.loadingShow=!0;const{success:i,data:t}=await z({code:"realType"});!i||(u.list=t.list,I(),console.log(t))}j();let k=p(null);function P(){k.value.onShow()}let u=C({list:[]});function V(i){console.log("item",i),s.typeText=i.title,s.type=i.val}const T=p(null);function $(){T.value.onUploadClick()}function N(i){s.front_img=i}const R=p(null);function O(){R.value.onUploadClick()}function E(i){s.reverse_img=i}function U(i){A(i)}async function G(){c.loadingShow=!0;const{success:i,data:t}=await q(s);!i||(F.success(t.msg),setTimeout(()=>{b.replace({name:"main"})},500),console.log(t))}return(i,t)=>(f(),_("div",Y,[e("div",Z,[e("div",{onClick:t[0]||(t[0]=l=>i.$router.go(-1)),class:"new-head-back"},te)]),e("div",se,a(n.value.titleText),1),e("div",oe,[r(e("div",{class:"v-real-fail"},a(n.value.failRemarkText)+": "+a(o(m).userReal.reason),513),[[v,o(m).userReal.status==0&&o(m).userReal.reason]]),e("div",ie,[e("div",le,[e("div",ne,a(n.value.realTypeText),1),e("div",{onClick:P,class:"v-form-item-input"},[r(e("input",{type:"text",readonly:"","onUpdate:modelValue":t[1]||(t[1]=l=>o(s).typeText=l),placeholder:n.value.realTypePlaceholerText},null,8,ae),[[y,o(s).typeText]]),re])]),e("div",ce,[e("div",me,a(n.value.nameText),1),e("div",de,[r(e("input",{readonly:d.value,type:"text","onUpdate:modelValue":t[2]||(t[2]=l=>o(s).name=l),placeholder:n.value.namePlaceholderText},null,8,ue),[[y,o(s).name]])])]),e("div",ve,[e("div",fe,a(n.value.idCardNumText),1),e("div",_e,[r(e("input",{readonly:d.value,type:"text","onUpdate:modelValue":t[3]||(t[3]=l=>o(s).id_card=l),placeholder:n.value.idCardNumPlaceholderText},null,8,ge),[[y,o(s).id_card]])])]),e("div",pe,[e("div",ye,[e("div",xe,[r(e("div",{onClick:$,class:"v-form-img-item-no-img g-flex-column g-flex-align-center g-flex-justify-center"},[he,e("div",ke,[e("span",null,a(n.value.frontImgText),1)])],512),[[v,!o(s).front_img]]),r(e("div",Te,[e("img",{onClick:t[4]||(t[4]=l=>U([o(s).front_img])),src:o(s).front_img,alt:""},null,8,Re),d.value?x("",!0):(f(),_("i",{key:0,onClick:t[5]||(t[5]=l=>o(s).front_img=""),class:"iconfont icon-guanbi"}))],512),[[v,o(s).front_img]])])]),e("div",Ue,[e("div",Ce,[r(e("div",{onClick:O,class:"v-form-img-item-no-img g-flex-column g-flex-align-center g-flex-justify-center"},[Se,e("div",be,[e("span",null,a(n.value.backImgText),1)])],512),[[v,!o(s).reverse_img]]),r(e("div",we,[e("img",{onClick:t[6]||(t[6]=l=>U([o(s).reverse_img])),src:o(s).reverse_img,alt:""},null,8,Ie),d.value?x("",!0):(f(),_("i",{key:0,onClick:t[7]||(t[7]=l=>o(s).reverse_img=""),class:"iconfont icon-guanbi"}))],512),[[v,o(s).reverse_img]])])])])]),d.value?x("",!0):(f(),_("div",je,[e("div",{onClick:G,class:"v-form-btn g-flex-align-center g-flex-justify-center"},[e("span",null,a(n.value.submitText),1)])]))]),h(X,{columns:o(u).list,onEmitsSelectConfirm:V,selectVal:o(s).type,ref_key:"refSelectRadioPop",ref:k},null,8,["columns","selectVal"]),h(S,{MidrPath:"/userReal/",idString:"v-user-real-front-img",onEmitUploadSuccess:N,ref_key:"refOssUpload",ref:T},null,512),h(S,{MidrPath:"/userReal/",idString:"v-user-real-reverse-img",onEmitUploadSuccess:E,ref_key:"refOssUploadSecond",ref:R},null,512)]))}};export{He as default};
