import{s as d,v,c as a,D as m,u as p,E as i,o as f,a as g,b as t,t as h,h as b,aB as j,_ as x}from"./main.26c763da.js";const y={class:"v_rule g-flex-column n-bg"},w={class:"new-head"},k=t("img",{src:x,alt:""},null,-1),B=[k],I={class:"new-head_title_text"},R=["innerHTML"],$={__name:"Rule",setup(H){const c=d(),o=v.exports.useI18n(),r=a(()=>o.tm("rule"));a(()=>o.tm("gongyong"));const l=m();p();let u=i({id:l.query.id}),n=i({obj:{create_time:0}});async function _(){c.loadingShow=!0;const{success:s,data:e}=await j(u);!s||(n.obj=e.info,console.log(e))}return _(),(s,e)=>(f(),g("div",y,[t("div",w,[t("div",{onClick:e[0]||(e[0]=N=>s.$router.go(-1)),class:"new-head-back"},B)]),t("div",I,h(r.value.titleText),1),t("div",{class:"v-rule-container",innerHTML:b(n).obj.content},null,8,R)]))}};export{$ as default};
