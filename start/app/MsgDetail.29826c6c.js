import{s as u,v as m,c,D as g,u as v,E as h,o as p,a as f,b as t,t as a,h as o,aP as b,N as j,_ as D}from"./main.668e0eaf.js";const x={class:"v_msg_detail g-g-flex-column n-bg"},y={class:"new-head"},M=t("img",{src:D,alt:""},null,-1),w=[M],H={class:"new-head_title_text"},k={class:"v-msg-detail-container"},I={class:"v-msg-detail-title"},N={class:"v-msg-detail-time"},Y=["innerHTML"],E={__name:"MsgDetail",setup(B){const l=u(),i=m.exports.useI18n(),_=c(()=>i.tm("msgDetail"));c(()=>i.tm("gongyong"));const r=g();v();let s=h({obj:{create_time:0}});async function d(){l.loadingShow=!0;const{success:n,data:e}=await b({id:r.query.id});!n||(s.obj=e.info,console.log(e))}return d(),(n,e)=>(p(),f("div",x,[t("div",y,[t("div",{onClick:e[0]||(e[0]=T=>n.$router.go(-1)),class:"new-head-back"},w)]),t("div",H,a(_.value.titleText),1),t("div",k,[t("div",I,a(o(s).obj.title),1),t("div",N,a(o(j)(o(s).obj.create_time,"YYYY/MM/DD HH:mm")),1),t("div",{class:"v-msg-content",innerHTML:o(s).obj.content},null,8,Y)])]))}};export{E as default};