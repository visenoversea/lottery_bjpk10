import{s as f,v as p,c as m,E as x,b6 as T,o,a as l,b as t,t as e,K as b,M as y,h as w,m as c,p as r,H as C,av as L,b7 as I,P as j}from"./main.dbc59821.js";const q=""+new URL("task2.877df0af.png",import.meta.url).href;const B={class:"v_task_center g-flex-column n-bg"},H={class:"new-head"},N=t("img",{src:C,alt:""},null,-1),S=[N],$=t("div",{class:"v-head-title g-flex-align-center g-flex-justify-center"},[t("span")],-1),D={class:"v-task-container"},M={class:"v-task-top g-flex-align-center"},E={class:"v-task-top-left"},G={class:"v-task-top-left-title"},Q={class:"v-task-top-left-des"},F=t("div",{class:"v-task-top-right"},[t("img",{src:q,alt:""})],-1),J={class:"v-task-list"},K={class:"v-task-item-top"},O={class:"v-task-item-top-title g-flex-align-center"},P={class:"v-task-item-top-title-text"},R={class:"v-task-item-top-title-tips"},U={class:"v-task-item-bottom g-flex-align-center"},V={class:"v-task-item-bottom-left"},z=["innerHTML"],A={class:"v-task-item-bottom-right g-flex-align-center g-flex-justify-center v-task-item-right-already"},W=["onClick"],X={class:"v-task-item-bottom-right g-flex-align-center g-flex-justify-center v-task-item-right-nolingqu"},st={__name:"TaskCenter",setup(Y){const d=f(),v=p.exports.useI18n(),i=m(()=>v.tm("taskCenter"));function g(n){L.confirm({message:i.value.lingquTipsText,width:"220px",theme:"round",cancelButtonColor:"#000",confirmButtonColor:"#0077ff"}).then(()=>{h(n)}).catch(()=>{})}async function h(n){d.loadingShow=!0;const{success:a,data:s}=await I({userTaskId:n.userTaskId});!a||(j.success(s.msg),_())}let u=x({list:[]});_();async function _(){d.loadingShow=!0;const{success:n,data:a}=await T();!n||(u.list=a.list,console.log(a))}return(n,a)=>(o(),l("div",B,[t("div",H,[t("div",{onClick:a[0]||(a[0]=s=>n.$router.go(-1)),class:"new-head-back"},S),$]),t("div",D,[t("div",M,[t("div",E,[t("div",G,[t("span",null,e(i.value.titleText),1)]),t("div",Q,[t("span",null,e(i.value.tipsText),1)])]),F]),t("div",J,[(o(!0),l(b,null,y(w(u).list,(s,k)=>(o(),l("div",{class:"v-task-item",key:k},[t("div",K,[t("div",O,[t("div",P,e(s.title),1),t("div",R,"("+e(s.finishNums)+"/"+e(s.nums)+")",1)])]),t("div",U,[t("div",V,[t("div",{innerHTML:s.des,class:"v-task-item-bottom-left-content"},null,8,z)]),c(t("div",A,[t("span",null,e(i.value.yilingquText),1)],512),[[r,s.userTaskId==0&&s.finishNums>=s.nums]]),c(t("div",{onClick:Z=>g(s),class:"v-task-item-bottom-right g-flex-align-center g-flex-justify-center v-task-item-right-lingqu"},[t("span",null,e(i.value.lingquJiangLiText),1)],8,W),[[r,s.userTaskId>0]]),c(t("div",X,[t("span",null,e(i.value.nowanchengText),1)],512),[[r,s.userTaskId==0&&s.finishNums<s.nums]])])]))),128))])])]))}};export{st as default};
