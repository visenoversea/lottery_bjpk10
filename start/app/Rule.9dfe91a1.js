import{s as d,u as f,c as a,B as g,f as v,C as i,o as p,a as m,b as e,t as b,d as c,aa as h}from"./main.d4154b20.js";const j={class:"v_tiaokuan_fuwu g-flex-column"},k={class:"v-tiaokuan-head g-flex-align-center"},x=e("i",{class:"iconfont icon-zuojiantou"},null,-1),y=[x],B={class:"v-title g-flex-align-center g-flex-justify-center"},R=["innerHTML"],N={__name:"Rule",setup(w){const l=d(),s=f();a(()=>s.tm("rule")),a(()=>s.tm("gongyong"));const u=g();v();let r=i({id:u.query.id}),n=i({obj:{create_time:0}});async function _(){l.loadingShow=!0;const{success:o,data:t}=await h(r);!o||(n.obj=t.info,console.log(t))}return _(),(o,t)=>(p(),m("div",j,[e("div",k,[e("div",{onClick:t[0]||(t[0]=H=>o.$router.go(-1)),class:"v-tiaokuan-head-back g-flex-align-center"},y),e("div",B,[e("span",null,b(c(n).obj.title),1)])]),e("div",{class:"v-tiaokuan-container",innerHTML:c(n).obj.content},null,8,R)]))}};export{N as default};
