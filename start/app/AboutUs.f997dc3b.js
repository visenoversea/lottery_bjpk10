import{s as u,u as d,c as a,E as f,f as m,F as i,o as p,a as b,b as t,t as g,d as c,aK as v,I as h}from"./main.e10a3069.js";const j={class:"v_rule g-flex-column n-bg"},w={class:"new-head"},y=t("img",{src:h,alt:""},null,-1),k=[y],x={class:"new-head_title_text"},I=["innerHTML"],$={__name:"AboutUs",setup(B){const r=u(),n=d();a(()=>n.tm("rule")),a(()=>n.tm("gongyong")),f(),m();let l=i({id:12}),s=i({obj:{create_time:0}});async function _(){r.loadingShow=!0;const{success:o,data:e}=await v(l);!o||(s.obj=e.info,console.log(e))}return _(),(o,e)=>(p(),b("div",j,[t("div",w,[t("div",{onClick:e[0]||(e[0]=H=>o.$router.go(-1)),class:"new-head-back"},k)]),t("div",x,g(c(s).obj.title),1),t("div",{class:"v-rule-container",innerHTML:c(s).obj.content},null,8,I)]))}};export{$ as default};
