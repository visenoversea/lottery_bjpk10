import{s as u,v,c,D as m,u as h,E as p,o as f,a as g,b as t,t as i,h as s,aH as b,a5 as j,H as D}from"./main.7d3dcc45.js";const H={class:"v_notice_detail g-g-flex-column n-bg"},x={class:"new-head"},y=t("img",{src:D,alt:""},null,-1),w=[y],N={class:"new-head_title_text"},k={class:"v-notice-detail-container"},I={class:"v-notice-detail-title"},M={class:"v-notice-detail-time"},Y=["innerHTML"],E={__name:"NoticeDetail",setup(B){const l=u(),a=v.exports.useI18n(),_=c(()=>a.tm("noticedetail"));c(()=>a.tm("gongyong"));const r=m();h();let o=p({obj:{create_time:0}});async function d(){l.loadingShow=!0;const{success:n,data:e}=await b({id:r.query.id});!n||(o.obj=e.info,console.log(e))}return d(),(n,e)=>(f(),g("div",H,[t("div",x,[t("div",{onClick:e[0]||(e[0]=T=>n.$router.go(-1)),class:"new-head-back"},w)]),t("div",N,i(_.value.titleText),1),t("div",k,[t("div",I,i(s(o).obj.title),1),t("div",M,i(s(j)(s(o).obj.create_time,"YYYY/MM/DD HH:mm")),1),t("div",{class:"v-notice-content",innerHTML:s(o).obj.content},null,8,Y)])]))}};export{E as default};