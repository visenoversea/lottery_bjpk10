import{s as u,u as f,c,B as v,f as g,C as m,o as h,a as p,b as e,t as i,d as o,a8 as y,ak as j}from"./main.bc976cef.js";const b={class:"v_notice_detail g-g-flex-column"},x={class:"v-head g-flex-justify-center g-flex-align-center"},k=e("i",{class:"iconfont icon-zuojiantou"},null,-1),N=[k],B={class:"v-title g-flex-align-center g-flex-justify-center"},D={class:"v-notice-detail-container"},M={class:"v-notice-detail-title"},H={class:"v-notice-detail-time"},I=["innerHTML"],C={__name:"NoticeDetail",setup(T){const l=u(),a=f(),r=c(()=>a.tm("noticedetail"));c(()=>a.tm("gongyong"));const d=v();g();let n=m({obj:{create_time:0}});async function _(){l.loadingShow=!0;const{success:s,data:t}=await y({id:d.query.id});!s||(n.obj=t.info,console.log(t))}return _(),(s,t)=>(h(),p("div",b,[e("div",x,[e("div",{onClick:t[0]||(t[0]=$=>s.$router.go(-1)),class:"v-head-back-icon g-flex-align-center"},N),e("span",B,i(o(r).titleText),1)]),e("div",D,[e("div",M,i(o(n).obj.title),1),e("div",H,i(o(j)(o(n).obj.create_time,"yyyy/MM/dd hh:mm")),1),e("div",{class:"v-notice-content",innerHTML:o(n).obj.content},null,8,I)])]))}};export{C as default};
