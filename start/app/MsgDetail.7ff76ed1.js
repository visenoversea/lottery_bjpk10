import{s as u,u as m,c,E as g,f as v,F as h,o as f,a as p,b as t,t as a,d as s,aY as b,a8 as j,I as D}from"./main.df4ea462.js";const y={class:"v_msg_detail g-g-flex-column n-bg"},M={class:"new-head"},w=t("img",{src:D,alt:""},null,-1),x=[w],H={class:"new-head_title_text"},Y={class:"v-msg-detail-container"},k={class:"v-msg-detail-title"},I={class:"v-msg-detail-time"},B=["innerHTML"],E={__name:"MsgDetail",setup(N){const l=u(),i=m(),_=c(()=>i.tm("msgDetail"));c(()=>i.tm("gongyong"));const r=g();v();let o=h({obj:{create_time:0}});async function d(){l.loadingShow=!0;const{success:n,data:e}=await b({id:r.query.id});!n||(o.obj=e.info,console.log(e))}return d(),(n,e)=>(f(),p("div",y,[t("div",M,[t("div",{onClick:e[0]||(e[0]=T=>n.$router.go(-1)),class:"new-head-back"},x)]),t("div",H,a(s(_).titleText),1),t("div",Y,[t("div",k,a(s(o).obj.title),1),t("div",I,a(s(j)(s(o).obj.create_time,"YYYY/MM/DD HH:mm")),1),t("div",{class:"v-msg-content",innerHTML:s(o).obj.content},null,8,B)])]))}};export{E as default};