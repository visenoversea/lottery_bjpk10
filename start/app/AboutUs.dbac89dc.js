import{s as u,v as d,c as a,D as m,u as p,E as i,o as v,a as f,b as t,t as b,h as c,aH as g,H as h}from"./main.792ae1e8.js";const j={class:"v_rule g-flex-column n-bg"},w={class:"new-head"},x=t("img",{src:h,alt:""},null,-1),y=[x],H={class:"new-head_title_text"},k=["innerHTML"],$={__name:"AboutUs",setup(I){const r=u(),n=d.exports.useI18n();a(()=>n.tm("rule")),a(()=>n.tm("gongyong")),m(),p();let l=i({id:12}),s=i({obj:{create_time:0}});async function _(){r.loadingShow=!0;const{success:o,data:e}=await g(l);!o||(s.obj=e.info,console.log(e))}return _(),(o,e)=>(v(),f("div",j,[t("div",w,[t("div",{onClick:e[0]||(e[0]=B=>o.$router.go(-1)),class:"new-head-back"},y)]),t("div",H,b(c(s).obj.title),1),t("div",{class:"v-rule-container",innerHTML:c(s).obj.content},null,8,k)]))}};export{$ as default};