import{u as V,a as h,r as k,b as C,c as a,d as b,w as K,o as m,e as B,f as i,g as o,h as l,i as n,j as f,k as N,l as j,m as D,n as E,E as T,p as U,q as z,s as I}from"./index.8f999f52.js";import{w as q}from"./ws.a3f08f34.js";const A={class:"v_login g-flex-column g-flex-align-center g-flex-justify-center"},G=i("div",{class:"v-title"},"\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF",-1),M={class:"v-box g-flex-align-center g-flex-justify-center"},R=i("h3",{class:"v-form-title"},"\u6B22\u8FCE\u767B\u5F55",-1),S=i("div",{class:"v-form-tip"},"\u5F81\u670D\u81EA\u5DF1\u5C31\u80FD\u5F81\u670D\u4E00\u5207",-1),L={__name:"IndexView",setup(F){const p=V(),g=h(),t=k({account:"",password:"",authCode:""}),r=C(!1),c=async()=>{r.value=!0;const{success:_,data:e}=await E.login(t);r.value=!1,_&&(p.setToken(e.token),T.success(e.msg),q.setToken(e.token),await g.replace("/"))};return(_,e)=>{const x=a("el-image"),u=a("el-input"),d=a("el-form-item"),v=a("el-button"),y=a("el-form"),w=b("loading");return K((m(),B("div",A,[G,i("div",M,[o(x,{src:"/img/admin/login_form_img.png",fit:"contain"}),o(y,{size:"large",class:"v-form g-flex-column g-flex-align-start"},{default:l(()=>[R,S,o(d,null,{default:l(()=>[o(u,{clearable:"",modelValue:t.account,"onUpdate:modelValue":e[0]||(e[0]=s=>t.account=s),type:"text",placeholder:"\u8BF7\u8F93\u5165\u8D26\u53F7","prefix-icon":n(U)},null,8,["modelValue","prefix-icon"])]),_:1}),o(d,null,{default:l(()=>[o(u,{"show-password":"",modelValue:t.password,"onUpdate:modelValue":e[1]||(e[1]=s=>t.password=s),type:"password",placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",onKeyup:f(c,["enter"]),"prefix-icon":n(z)},null,8,["modelValue","onKeyup","prefix-icon"])]),_:1}),n(p).system.GoogleAuth==1?(m(),N(d,{key:0},{default:l(()=>[o(u,{modelValue:t.authCode,"onUpdate:modelValue":e[2]||(e[2]=s=>t.authCode=s),type:"text",placeholder:"\u8BF7\u8F93\u5165\u8C37\u6B4C\u9A8C\u8BC1\u7801",onKeyup:f(c,["enter"]),"prefix-icon":n(I)},null,8,["modelValue","onKeyup","prefix-icon"])]),_:1})):j("",!0),o(v,{size:"default",type:"primary",onClick:c},{default:l(()=>[D("\u767B\u5F55")]),_:1})]),_:1})])])),[[w,r.value]])}}};export{L as default};
