import{u as G,D as H,s as M,v as z,c as k,E as S,e as c,r as F,o as g,a as p,b as e,W as d,d as W,m as a,p as _,h as o,t as r,aj as C,l as T,bl as q,ay as J,az as K,aA as Q,O as X,S as Y,ar as Z}from"./main.103642d2.js";import{_ as ee,a as te}from"./ID_f.9e7d6ee5.js";import"./aliyun-oss-sdk.524fe523.js";import"./SelectRadioPop.vue_vue_type_style_index_0_lang.6a63b429.js";const se=""+new URL("../images/smarttouxiang.png",import.meta.url).href;const oe={class:"v_user_real g-flex-column n-bg"},ie={class:"new-head"},ne=e("img",{src:Y,alt:""},null,-1),le=[ne],ae={class:"b-smartcon"},re=e("img",{class:"b-smartcon-img",src:se,alt:""},null,-1),ce=e("div",{class:"b-smartcon-title"},[e("div",{style:{"padding-top":"6px"}},"smart strategy")],-1),de={class:"b-form-btn-box"},me=e("span",null,"price range",-1),ve=[me],ue=e("span",null,"smart setings",-1),_e=[ue],fe={class:"b-form-btn-box2"},ge=e("span",null,"detals to ve released",-1),pe=[ge],ye=e("span",null,"order record",-1),he=[ye],xe=q('<h2 style="color:#fff;margin-left:20px;">frid type</h2><div class="mart-strategy"><div style="opacity:0.7;">Team Member</div><div>1.35%~1.55% <i class="iconfont icon-you"></i></div></div><h2 style="color:#fff;margin-left:20px;padding-bottom:16px;">InVestment amount</h2>',3),be={class:"mart-sgy"},ke={class:"mart-sgy-strategy"},Ce=e("div",{style:{opacity:"0.7"}},"0",-1),Te=e("div",{class:"progress-txt"},[e("div",null,"0%"),e("div",null,"50%"),e("div",null,"100%")],-1),we=e("div",{class:"mart-sgy-amount",style:{display:"flex","justify-content":"space-between",padding:"0 10px"}},[e("div",null,"Amount that can be inverted"),e("div",{style:{opacity:"0.7"}},"0/104.7412")],-1),Re=e("div",{class:"mart-strategy"},[e("div",{style:{opacity:"0.7"}},"Operating Time"),e("div",{style:{color:"#6D52FF"}},"3-10 Minutes")],-1),Ue=e("div",{class:"subBtn"},"Create Order",-1),Ie={class:"v-user-real-container"},Se={class:"v-form"},$e={class:"v-form-item"},je={class:"v-form-item-title"},Ve=["placeholder"],Ne=e("div",{class:"v-form-item-input-icon"},[e("i",{class:"iconfont icon-you"})],-1),Oe={class:"v-form-item"},Ae={class:"v-form-item-title"},Le={class:"v-form-item-input"},Be=["readonly","placeholder"],De={class:"v-form-item"},Pe={class:"v-form-item-title"},Ee={class:"v-form-item-input"},Ge=["readonly","placeholder"],He={class:"v-form-img-list g-flex-align-center"},Me={class:"v-form-img-item-box"},ze={class:"v-form-img-item"},Fe=e("div",{class:"v-form-img-item-no-img-icon"},[e("img",{src:ee,alt:""})],-1),We={class:"v-form-img-item-no-img-text g-flex-align-center g-flex-justify-center"},qe={class:"v-user-real-form-cid-item-img-have-box"},Je=["src"],Ke={class:"v-form-img-item-box"},Qe={class:"v-form-img-item"},Xe=e("div",{class:"v-form-img-item-no-img-icon"},[e("img",{src:te,alt:""})],-1),Ye={class:"v-form-img-item-no-img-text g-flex-align-center g-flex-justify-center"},Ze={class:"v-user-real-form-cid-item-img-have-box"},et=["src"],tt={key:0,class:"v-form-btn-box"},at={__name:"smartStrategy",setup(st){const $=G();H();const m=M(),j=z.exports.useI18n(),l=k(()=>j.tm("userReal"));let s=S({type:"",typeText:"",country:"",name:"",id_card:"",front_img:"",reverse_img:""}),v=k(()=>m.userInfo);const u=k(()=>!(!v.value.userReal.id||v.value.userReal.status==0));async function V(){m.loadingShow=!0;const{success:n,data:t}=await Z();if(!!n){if(m.setUserInfo(t.info),t.info.userReal.id){Object.assign(s,t.info.userReal);let b=f.list.find(i=>i.val==t.info.userReal.type);s.typeText=b.title}else s.typeText=f.list[0].title,s.type=f.list[0].val;console.log(t)}}async function N(){m.loadingShow=!0;const{success:n,data:t}=await J({code:"realType"});!n||(f.list=t.list,V(),console.log(t))}N();let O=c(null);function A(){O.value.onShow()}let f=S({list:[]});const L=c(null);function B(){L.value.onUploadClick()}const D=c(null);function P(){D.value.onUploadClick()}function w(n){K(n)}async function E(){m.loadingShow=!0;const{success:n,data:t}=await Q(s);!n||(X.success(t.msg),setTimeout(()=>{$.replace({name:"main"})},500),console.log(t))}const y=c(1),R=n=>{y.value=n},h=c(1),U=n=>{h.value=n},x=c(1),I=n=>{x.value=n};return(n,t)=>{const b=F("van-progress");return g(),p("div",oe,[e("div",ie,[e("div",{onClick:t[0]||(t[0]=i=>n.$router.go(-1)),class:"new-head-back"},le)]),e("div",ae,[re,ce,e("div",de,[e("div",{onClick:t[1]||(t[1]=i=>R(1)),class:d(["b-form-btns",{"active-btn":y.value==1}])},ve,2),e("div",{onClick:t[2]||(t[2]=i=>R(2)),class:d(["b-form-btns",{"active-btn":y.value==2}])},_e,2)]),e("div",fe,[e("div",{onClick:t[3]||(t[3]=i=>U(1)),class:d(["b-form-btns2",{"active-two-btn":h.value==1}])},pe,2),e("div",{onClick:t[4]||(t[4]=i=>U(2)),class:d(["b-form-btns2",{"active-two-btn":h.value==2}])},he,2)]),xe,e("div",be,[e("div",ke,[Ce,e("div",null,[e("span",{style:{"margin-right":"10px"},onClick:t[5]||(t[5]=i=>I(1)),class:d({"active-three-btn":x.value==1})},"USTD",2),e("span",{onClick:t[6]||(t[6]=i=>I(2)),class:d({"active-three-btn":x.value==2})},"ALL",2)])]),e("div",null,[W(b,{"show-pivot":!1,color:"linear-gradient(to right, #C33CE8, #6029EB)",percentage:50}),Te]),we]),Re,Ue]),e("div",Ie,[a(e("div",{class:"v-real-fail"},r(l.value.failRemarkText)+": "+r(o(v).userReal.reason),513),[[_,o(v).userReal.status==0&&o(v).userReal.reason]]),e("div",Se,[e("div",$e,[e("div",je,r(l.value.realTypeText),1),e("div",{onClick:A,class:"v-form-item-input"},[a(e("input",{type:"text",readonly:"","onUpdate:modelValue":t[7]||(t[7]=i=>o(s).typeText=i),placeholder:l.value.realTypePlaceholerText},null,8,Ve),[[C,o(s).typeText]]),Ne])]),e("div",Oe,[e("div",Ae,r(l.value.nameText),1),e("div",Le,[a(e("input",{readonly:u.value,type:"text","onUpdate:modelValue":t[8]||(t[8]=i=>o(s).name=i),placeholder:l.value.namePlaceholderText},null,8,Be),[[C,o(s).name]])])]),e("div",De,[e("div",Pe,r(l.value.idCardNumText),1),e("div",Ee,[a(e("input",{readonly:u.value,type:"text","onUpdate:modelValue":t[9]||(t[9]=i=>o(s).id_card=i),placeholder:l.value.idCardNumPlaceholderText},null,8,Ge),[[C,o(s).id_card]])])]),e("div",He,[e("div",Me,[e("div",ze,[a(e("div",{onClick:B,class:"v-form-img-item-no-img g-flex-column g-flex-align-center g-flex-justify-center"},[Fe,e("div",We,[e("span",null,r(l.value.frontImgText),1)])],512),[[_,!o(s).front_img]]),a(e("div",qe,[e("img",{onClick:t[10]||(t[10]=i=>w([o(s).front_img])),src:o(s).front_img,alt:""},null,8,Je),u.value?T("",!0):(g(),p("i",{key:0,onClick:t[11]||(t[11]=i=>o(s).front_img=""),class:"iconfont icon-guanbi"}))],512),[[_,o(s).front_img]])])]),e("div",Ke,[e("div",Qe,[a(e("div",{onClick:P,class:"v-form-img-item-no-img g-flex-column g-flex-align-center g-flex-justify-center"},[Xe,e("div",Ye,[e("span",null,r(l.value.backImgText),1)])],512),[[_,!o(s).reverse_img]]),a(e("div",Ze,[e("img",{onClick:t[12]||(t[12]=i=>w([o(s).reverse_img])),src:o(s).reverse_img,alt:""},null,8,et),u.value?T("",!0):(g(),p("i",{key:0,onClick:t[13]||(t[13]=i=>o(s).reverse_img=""),class:"iconfont icon-guanbi"}))],512),[[_,o(s).reverse_img]])])])])]),u.value?T("",!0):(g(),p("div",tt,[e("div",{onClick:E,class:"v-form-btn g-flex-align-center g-flex-justify-center"},[e("span",null,r(l.value.submitText),1)])]))])])}}};export{at as default};
