import{s as q,u as N,c as z,l as D,k as E,r,a as _,o as v,d as p,f as e,t as o,g as s,n as M,e as j,F as Q,h as A,B as G,A as H,j as u,a1 as X,v as m,ab as J,ac as K,T as W,X as Y,I as Z}from"./index.de11b688.js";import{_ as ee}from"./SelectCoinPop.db08f8b1.js";import{v as se}from"./vue-qr.09dab2bd.js";import{_ as ne}from"./OssUpload.01940395.js";import{c as ie}from"./index.78e71f9e.js";const te={class:"v_recharge_bi g-flex-column"},oe={class:"v-head g-flex-align-center"},ae=e("i",{class:"iconfont icon-zuojiantou"},null,-1),ce=[ae],le={class:"v-title g-flex-align-center g-flex-justify-center"},re={class:"v-recharge-bi-container"},de={class:"v-recharge-bi-top"},ue={class:"v-recharge-bi-top-wangluo"},fe={class:"v-recharge-coin-title"},ge={class:"v-recharge-bi-select-box"},he={class:"v-recharge-bi-select-left g-flex-align-center"},_e={class:"v-recharge-coin-title"},ve={class:"v-cashout-coin-link-list g-flex-align-center"},me=["onClick"],be={class:"v-recharge-bi-code-box"},pe={class:"v-recharge-bi-qrcode-box g-flex-align-center g-flex-column"},xe={class:"v-recharge-bi-qrcode g-flex-align-center g-flex-justify-center"},ye={class:"v-recharge-bi-qrcode-address-title"},ke={class:"v-recharge-bi-qrcode-address-box g-flex-align-center"},je={class:"v-recharge-bi-qrcode-address-val"},Ce=e("i",{class:"iconfont icon-ic_line_copy24px"},null,-1),Te=[Ce],Se={class:"v-recharge-bi-bottom"},Ie={class:"v-recharge-bi-nums"},we={class:"v-recharge-bi-nums-title"},Be={class:"v-recharge-bi-nums-input"},Le=["placeholder"],$e={class:"v-recharge-bi-yuedengyu g-flex-align-center"},Pe=e("span",null,"\u2248",-1),Ue={class:"v-recharge-bi-upload-box"},Oe={class:"v-recharge-bi-upload-title"},Ve={class:"v-recharge-bi-upload g-flex-align-center g-flex-justify-center"},Fe=["src"],Re=e("i",{class:"iconfont icon-shanchu2"},null,-1),qe=[Re],Ne=e("i",{class:"iconfont icon-jiahao1"},null,-1),He={__name:"RechargeBi",setup(ze){const C=q(),T=N(),c=z(()=>T.tm("rechargebi")),S=D(),I=E(),w=r(null);let B=r(7),f=_({transform:""}),g=r(!1),i=_({obj:{}}),x=_({info:[]}),n=_({id:S.params.id,info:{currency:"",address:"",chain:""},amount:"",img:"",money:""}),d=r(0);function L(a,t){d.value=t,n.info.address=i.obj.chainList[d.value].address,n.info.chain=i.obj.chainList[d.value].chain}async function $(){const{success:a,data:t}=await J({id:n.id});!a||(Object.assign(x,t.info),i.obj=t.info.info[0],n.info.address=i.obj.chainList[0].address,n.info.currency=i.obj.currency,n.info.chain=i.obj.chainList[0].chain)}$();const h=r(null);function P(){g.value=!g.value,g.value?(h.value.onShow(),f.transform="rotate(180deg)"):(f.transform="rotate(0deg)",h.value.onClose())}function U(a){h.value.onClose(),g.value=!1,f.transform="rotate(0deg)",i.obj=a,d.value=0,n.info.address=i.obj.chainList[0].address,n.info.currency=i.obj.currency,n.info.chain=i.obj.chainList[0].chain,y()}function y(){if(!n.amount)return n.money="";n.money=Math.formatFloat(Number(n.amount)*Number(i.obj.rate),i.obj.fixed).toFixed(i.obj.fixed)}async function O(){C.loadingShow=!0;const{success:a,data:t}=await K(n);!a||(W.success(t.msg),setTimeout(()=>{I.go(-1)},500))}function V(a){Y([a])}const k=r(null);function F(){k.value.onUploadClick()}function R(a){n.img=a}return(a,t)=>(v(),p("div",te,[e("div",oe,[e("div",{onClick:t[0]||(t[0]=l=>a.$router.go(-1)),class:"v-head-back-icon g-flex-align-center g-flex-justify-center"},ce),e("div",le,o(s(c).titleText),1)]),e("div",re,[e("div",de,[e("div",ue,[e("p",fe,o(s(c).selectBiText),1),e("div",ge,[e("div",{class:"v-recharge-bi-select g-flex-align-center",onClick:P},[e("div",he,[e("span",null,o(s(i).obj.currency),1)]),e("i",{class:"iconfont icon-xiala",style:M(s(f))},null,4)]),j(ee,{coinList:s(x).info,onEmitCoinItemClick:U,ref_key:"refSelectCoinPop",ref:h},null,8,["coinList"])]),e("p",_e,o(s(c).linkText),1),e("ul",ve,[(v(!0),p(Q,null,A(s(i).obj.chainList,(l,b)=>(v(),p("li",{onClick:De=>L(l,b),class:Z([s(d)==b?"active":"","v-cashout-coin-link-item"]),key:b},[e("span",null,o(l.chain),1)],10,me))),128))])]),e("div",be,[e("div",pe,[e("div",xe,[s(n).info.address?(v(),G(se,{key:0,ref_key:"refVueQr",ref:w,text:s(n).info.address,margin:s(B),size:130},null,8,["text","margin"])):H("",!0)]),e("div",ye,o(s(c).saomaText),1)]),e("div",ke,[e("div",je,o(s(n).info.address),1),e("div",{onClick:t[1]||(t[1]=l=>s(ie)(s(n).info.address)),class:"v-recharge-bi-copy g-flex-justify-center"},Te)])])]),e("div",Se,[e("div",Ie,[e("div",we,[e("span",null,o(s(c).rechargeAmountText)+"(USDT):",1)]),e("div",Be,[u(e("input",{onInput:y,type:"text","onUpdate:modelValue":t[2]||(t[2]=l=>s(n).amount=l),placeholder:s(c).cunkuanPlaceholderText},null,40,Le),[[X,s(n).amount]])])]),u(e("div",$e,[Pe,e("p",null,o(s(n).money),1),e("span",null,o(s(i).obj.currency),1)],512),[[m,s(i).obj.currency!="USDT"&&s(n).amount]]),e("div",Ue,[e("p",Oe,o(s(c).uploadText)+":",1),e("div",Ve,[u(e("img",{onClick:t[3]||(t[3]=l=>V(s(n).img)),src:s(n).img,alt:""},null,8,Fe),[[m,s(n).img]]),u(e("div",{class:"v-real-name-delete g-flex-justify-center g-flex-align-center",onClick:t[4]||(t[4]=l=>s(n).img="")},qe,512),[[m,s(n).img]]),u(e("div",{onClick:F,class:"v-recharge-bi-upload-tips g-flex-column g-flex-align-center g-flex-justify-center"},[Ne,e("p",null,o(s(c).selectImgText),1)],512),[[m,!s(n).img]])])]),e("div",{onClick:O,class:"v-recharge-bi-btn g-flex-align-center g-flex-justify-center"},[e("span",null,o(s(c).alreadyText),1)])])]),j(ne,{MidrPath:"/recharge/",idString:"c-recharge-coin-upload-1",onEmitUploadSuccess:R,ref_key:"refOssUpload",ref:k},null,512)]))}};export{He as default};
