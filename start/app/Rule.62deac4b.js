import{s as f,u as m,c as a,E as p,f as g,F as i,o as v,a as h,b as t,t as b,d as c,aK as y,I as j}from"./main.a558085a.js";const w={class:"v_rule g-flex-column n-bg"},x={class:"new-head"},k=t("img",{src:j,alt:""},null,-1),I=[k],R={class:"new-head_title_text"},B=["innerHTML"],$={__name:"Rule",setup(H){const r=f(),o=m(),l=a(()=>o.tm("rule"));a(()=>o.tm("gongyong"));const u=p();g();let _=i({id:u.query.id}),n=i({obj:{create_time:0}});async function d(){r.loadingShow=!0;const{success:s,data:e}=await y(_);!s||(n.obj=e.info,console.log(e))}return d(),(s,e)=>(v(),h("div",w,[t("div",x,[t("div",{onClick:e[0]||(e[0]=N=>s.$router.go(-1)),class:"new-head-back"},I)]),t("div",R,b(c(l).titleText),1),t("div",{class:"v-rule-container",innerHTML:c(n).obj.content},null,8,B)]))}};export{$ as default};
