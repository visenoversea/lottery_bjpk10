import{s as q,u as N,c as z,B as E,f as G,g as r,C as _,o as v,a as b,b as e,t as o,d as s,ac as H,e as j,F as M,G as Q,j as D,m as A,p as u,a5 as Y,v as m,ad as J,ae as K,S as W,Y as X,H as Z,af as ee}from"./main.9293851e.js";import{_ as se}from"./SelectCoinPop.ad9de651.js";import{v as ne}from"./vue-qr.4f09e64c.js";import{_ as ie}from"./OssUpload.b3a32494.js";import"./index.5541d6af.js";const te={class:"v_recharge_bi g-flex-column"},oe={class:"v-head g-flex-align-center"},ae=e("i",{class:"iconfont icon-zuojiantou"},null,-1),ce=[ae],le={class:"v-title g-flex-align-center g-flex-justify-center"},re={class:"v-recharge-bi-container"},de={class:"v-recharge-bi-top"},ue={class:"v-recharge-bi-top-wangluo"},fe={class:"v-recharge-coin-title"},ge={class:"v-recharge-bi-select-box"},he={class:"v-recharge-bi-select-left g-flex-align-center"},_e={class:"v-recharge-coin-title"},ve={class:"v-cashout-coin-link-list g-flex-align-center"},me=["onClick"],pe={class:"v-recharge-bi-code-box"},be={class:"v-recharge-bi-qrcode-box g-flex-align-center g-flex-column"},xe={class:"v-recharge-bi-qrcode g-flex-align-center g-flex-justify-center"},ye={class:"v-recharge-bi-qrcode-address-title"},ke={class:"v-recharge-bi-qrcode-address-box g-flex-align-center"},je={class:"v-recharge-bi-qrcode-address-val"},Ce=e("i",{class:"iconfont icon-ic_line_copy24px"},null,-1),Se=[Ce],Te={class:"v-recharge-bi-bottom"},Ie={class:"v-recharge-bi-nums"},we={class:"v-recharge-bi-nums-title"},Be={class:"v-recharge-bi-nums-input"},Le=["placeholder"],$e={class:"v-recharge-bi-yuedengyu g-flex-align-center"},Pe=e("span",null,"\u2248",-1),Oe={class:"v-recharge-bi-upload-box"},Ve={class:"v-recharge-bi-upload-title"},Fe={class:"v-recharge-bi-upload g-flex-align-center g-flex-justify-center"},Re=["src"],Ue=e("i",{class:"iconfont icon-shanchu2"},null,-1),qe=[Ue],Ne=e("i",{class:"iconfont icon-jiahao1"},null,-1),Ae={__name:"RechargeBi",setup(ze){const C=q(),S=N(),c=z(()=>S.tm("rechargebi")),T=E(),I=G(),w=r(null);let B=r(7),f=_({transform:""}),g=r(!1),t=_({obj:{}}),x=_({info:[]}),n=_({id:T.params.id,info:{currency:"",address:"",chain:""},amount:"",img:"",money:""}),d=r(0);function L(a,i){d.value=i,n.info.address=t.obj.chainList[d.value].address,n.info.chain=t.obj.chainList[d.value].chain}async function $(){const{success:a,data:i}=await J({id:n.id});!a||(Object.assign(x,i.info),t.obj=i.info.info[0],n.info.address=t.obj.chainList[0].address,n.info.currency=t.obj.currency,n.info.chain=t.obj.chainList[0].chain)}$();const h=r(null);function P(){g.value=!g.value,g.value?(h.value.onShow(),f.transform="rotate(180deg)"):(f.transform="rotate(0deg)",h.value.onClose())}function O(a){h.value.onClose(),g.value=!1,f.transform="rotate(0deg)",t.obj=a,d.value=0,n.info.address=t.obj.chainList[0].address,n.info.currency=t.obj.currency,n.info.chain=t.obj.chainList[0].chain,y()}function y(){if(!n.amount)return n.money="";n.money=Math.formatFloat(Number(n.amount)*Number(t.obj.rate),t.obj.fixed).toFixed(t.obj.fixed)}async function V(){C.loadingShow=!0;const{success:a,data:i}=await K(n);!a||(W.success(i.msg),setTimeout(()=>{I.go(-1)},500))}function F(a){X([a])}const k=r(null);function R(){k.value.onUploadClick()}function U(a){n.img=a}return(a,i)=>(v(),b("div",te,[e("div",oe,[e("div",{onClick:i[0]||(i[0]=l=>a.$router.go(-1)),class:"v-head-back-icon g-flex-align-center g-flex-justify-center"},ce),e("div",le,o(s(c).titleText),1)]),e("div",re,[e("div",de,[e("div",ue,[e("p",fe,o(s(c).selectBiText),1),e("div",ge,[e("div",{class:"v-recharge-bi-select g-flex-align-center",onClick:P},[e("div",he,[e("span",null,o(s(t).obj.currency),1)]),e("i",{class:"iconfont icon-xiala",style:H(s(f))},null,4)]),j(se,{coinList:s(x).info,onEmitCoinItemClick:O,ref_key:"refSelectCoinPop",ref:h},null,8,["coinList"])]),e("p",_e,o(s(c).linkText),1),e("ul",ve,[(v(!0),b(M,null,Q(s(t).obj.chainList,(l,p)=>(v(),b("li",{onClick:Ee=>L(l,p),class:Z([s(d)==p?"active":"","v-cashout-coin-link-item"]),key:p},[e("span",null,o(l.chain),1)],10,me))),128))])]),e("div",pe,[e("div",be,[e("div",xe,[s(n).info.address?(v(),D(ne,{key:0,ref_key:"refVueQr",ref:w,text:s(n).info.address,margin:s(B),size:130},null,8,["text","margin"])):A("",!0)]),e("div",ye,o(s(c).saomaText),1)]),e("div",ke,[e("div",je,o(s(n).info.address),1),e("div",{onClick:i[1]||(i[1]=l=>s(ee)(s(n).info.address)),class:"v-recharge-bi-copy g-flex-justify-center"},Se)])])]),e("div",Te,[e("div",Ie,[e("div",we,[e("span",null,o(s(c).rechargeAmountText)+":",1)]),e("div",Be,[u(e("input",{onInput:y,type:"text","onUpdate:modelValue":i[2]||(i[2]=l=>s(n).amount=l),placeholder:s(c).cunkuanPlaceholderText},null,40,Le),[[Y,s(n).amount]])])]),u(e("div",$e,[Pe,e("p",null,o(s(n).money),1),e("span",null,o(s(t).obj.currency),1)],512),[[m,s(n).amount]]),e("div",Oe,[e("p",Ve,o(s(c).uploadText)+":",1),e("div",Fe,[u(e("img",{onClick:i[3]||(i[3]=l=>F(s(n).img)),src:s(n).img,alt:""},null,8,Re),[[m,s(n).img]]),u(e("div",{class:"v-real-name-delete g-flex-justify-center g-flex-align-center",onClick:i[4]||(i[4]=l=>s(n).img="")},qe,512),[[m,s(n).img]]),u(e("div",{onClick:R,class:"v-recharge-bi-upload-tips g-flex-column g-flex-align-center g-flex-justify-center"},[Ne,e("p",null,o(s(c).selectImgText),1)],512),[[m,!s(n).img]])])]),e("div",{onClick:V,class:"v-recharge-bi-btn g-flex-align-center g-flex-justify-center"},[e("span",null,o(s(c).alreadyText),1)])])]),j(ie,{MidrPath:"/recharge/",idString:"c-recharge-coin-upload-1",onEmitUploadSuccess:U,ref_key:"refOssUpload",ref:k},null,512)]))}};export{Ae as default};
