import{u as A,b as E,M as R,r as h,c as i,d as D,o as c,k as y,h as l,g as e,m as V,w as O,e as C,F as G,Q as P,l as $,i as B,O as Q,n as F,E as L,f as z,G as T,P as H}from"./index.536bf181.js";import{f as j}from"./index.f2e9d2c9.js";const J={__name:"AddView",props:{modelValue:{type:Boolean,default:!1},parentId:{default:0}},emits:["update:modelValue","success"],setup(I,{emit:f}){const _=I,x=A(),w=E(!1),v=E(),t=R({get:()=>_.modelValue,set:p=>{f("update:modelValue",p)}}),n=h({parent_id:0,type:1,title:"",icon:"",path:"",name:"",level:1,component:"",sort:0,status:1}),M=()=>{n.parent_id=_.parentId},k=async()=>{v.value.resetFields()},o=async()=>{if(w.value)return;w.value=!0;const{success:p,data:a}=await F.addMenu(n);w.value=!1,p&&(f("success"),L.success(a.msg),t.value=!1)};return(p,a)=>{const d=i("el-radio"),b=i("el-radio-group"),m=i("el-form-item"),g=i("el-col"),u=i("el-input"),U=i("el-row"),N=i("el-form"),S=i("el-button"),s=i("el-dialog"),q=D("loading");return c(),y(s,{modelValue:B(t),"onUpdate:modelValue":a[12]||(a[12]=r=>Q(t)?t.value=r:null),top:"5vh",title:"\u65B0\u589E",onOpen:M,onClose:k,draggable:"","close-on-click-modal":!1,width:"620px"},{footer:l(()=>[e(S,{size:"default",onClick:a[11]||(a[11]=r=>t.value=!1)},{default:l(()=>[V("\u53D6 \u6D88")]),_:1}),e(S,{size:"default",type:"primary",onClick:o},{default:l(()=>[V("\u786E \u8BA4")]),_:1})]),default:l(()=>[O((c(),y(N,{size:"default",ref_key:"refForm",ref:v,model:n,"label-width":"90px"},{default:l(()=>[e(U,{gutter:24},{default:l(()=>[e(g,{span:12},{default:l(()=>[e(m,{label:"\u7C7B\u578B",prop:"type"},{default:l(()=>[e(b,{modelValue:n.type,"onUpdate:modelValue":a[0]||(a[0]=r=>n.type=r)},{default:l(()=>[e(d,{label:1},{default:l(()=>[V("\u83DC\u5355")]),_:1}),e(d,{label:2},{default:l(()=>[V("api\u63A5\u53E3")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(g,{span:12},{default:l(()=>[e(m,{label:"\u7236id",prop:"parent_id"},{default:l(()=>[e(u,{modelValue:n.parent_id,"onUpdate:modelValue":a[1]||(a[1]=r=>n.parent_id=r)},null,8,["modelValue"])]),_:1})]),_:1}),e(g,{span:12},{default:l(()=>[e(m,{label:"\u6807\u9898",prop:"title"},{default:l(()=>[e(u,{modelValue:n.title,"onUpdate:modelValue":a[2]||(a[2]=r=>n.title=r)},null,8,["modelValue"])]),_:1})]),_:1}),e(g,{span:12},{default:l(()=>[e(m,{label:"\u540D\u79F0",prop:"name"},{default:l(()=>[e(u,{modelValue:n.name,"onUpdate:modelValue":a[3]||(a[3]=r=>n.name=r)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(m,{label:"\u8DEF\u5F84",prop:"path"},{default:l(()=>[e(u,{modelValue:n.path,"onUpdate:modelValue":a[4]||(a[4]=r=>n.path=r)},null,8,["modelValue"])]),_:1}),n.type===1?(c(),C(G,{key:0},[e(m,{label:"\u7EC4\u4EF6\u540D",prop:"component"},{default:l(()=>[e(u,{modelValue:n.component,"onUpdate:modelValue":a[5]||(a[5]=r=>n.component=r)},null,8,["modelValue"])]),_:1}),n.parent_id==0?(c(),y(m,{key:0,label:"\u56FE\u6807",prop:"icon"},{default:l(()=>[e(P,{width:"100px",height:"80px",modelValue:n.icon,"onUpdate:modelValue":a[6]||(a[6]=r=>n.icon=r)},null,8,["modelValue"]),e(u,{modelValue:n.icon,"onUpdate:modelValue":a[7]||(a[7]=r=>n.icon=r)},null,8,["modelValue"])]),_:1})):$("",!0),e(m,{label:"\u72B6\u6001"},{default:l(()=>[e(b,{modelValue:n.status,"onUpdate:modelValue":a[8]||(a[8]=r=>n.status=r),prop:"status"},{default:l(()=>[e(d,{label:1},{default:l(()=>[V("\u663E\u793A")]),_:1}),e(d,{label:0},{default:l(()=>[V("\u9690\u85CF")]),_:1})]),_:1},8,["modelValue"])]),_:1})],64)):$("",!0),e(U,{gutter:24},{default:l(()=>[e(g,{span:12},{default:l(()=>[e(m,{label:"\u6392\u5E8F",prop:"sort"},{default:l(()=>[e(u,{modelValue:n.sort,"onUpdate:modelValue":a[9]||(a[9]=r=>n.sort=r)},null,8,["modelValue"])]),_:1})]),_:1}),e(g,{span:12},{default:l(()=>[B(x).user.type===100?(c(),y(m,{key:0,label:"\u7B49\u7EA7",prop:"sort"},{default:l(()=>[e(u,{modelValue:n.level,"onUpdate:modelValue":a[10]||(a[10]=r=>n.level=r)},null,8,["modelValue"])]),_:1})):$("",!0)]),_:1})]),_:1})]),_:1},8,["model"])),[[q,w.value]])]),_:1},8,["modelValue"])}}},K={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(I,{emit:f}){const _=I,x=A(),w=E(!1),v=R({get:()=>_.modelValue,set:k=>{f("update:modelValue",k)}}),t=h({id:0,parent_id:0,type:1,title:"",icon:"",path:"",name:"",component:"",level:1,sort:0,status:1}),n=()=>{t.id=_.data.id,t.parent_id=_.data.parent_id,t.type=_.data.type,t.title=_.data.title,t.icon=_.data.icon,t.path=_.data.path,t.name=_.data.name,t.component=_.data.component,t.sort=_.data.sort,t.level=_.data.level,t.status=_.data.status},M=async()=>{if(w.value)return;w.value=!0;const{success:k,data:o}=await F.editMenu(t);w.value=!1,k&&(f("success"),L.success(o.msg),v.value=!1)};return(k,o)=>{const p=i("el-radio"),a=i("el-radio-group"),d=i("el-form-item"),b=i("el-col"),m=i("el-input"),g=i("el-row"),u=i("el-form"),U=i("el-button"),N=i("el-dialog"),S=D("loading");return c(),y(N,{modelValue:B(v),"onUpdate:modelValue":o[12]||(o[12]=s=>Q(v)?v.value=s:null),top:"5vh",title:"\u7F16\u8F91",onOpen:n,draggable:"","close-on-click-modal":!1,width:"520px"},{footer:l(()=>[e(U,{size:"default",onClick:o[11]||(o[11]=s=>v.value=!1)},{default:l(()=>[V("\u53D6 \u6D88")]),_:1}),e(U,{size:"default",type:"primary",onClick:M},{default:l(()=>[V("\u786E \u8BA4")]),_:1})]),default:l(()=>[O((c(),y(u,{size:"default",model:t,"label-width":"90px"},{default:l(()=>[e(g,{gutter:24},{default:l(()=>[e(b,{span:12},{default:l(()=>[e(d,{label:"\u7C7B\u578B"},{default:l(()=>[e(a,{modelValue:t.type,"onUpdate:modelValue":o[0]||(o[0]=s=>t.type=s),prop:"type"},{default:l(()=>[e(p,{label:1},{default:l(()=>[V("\u83DC\u5355")]),_:1}),e(p,{label:2},{default:l(()=>[V("api\u63A5\u53E3")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(b,{span:12},{default:l(()=>[e(d,{label:"\u7236id",prop:"parent_id"},{default:l(()=>[e(m,{modelValue:t.parent_id,"onUpdate:modelValue":o[1]||(o[1]=s=>t.parent_id=s)},null,8,["modelValue"])]),_:1})]),_:1}),e(b,{span:12},{default:l(()=>[e(d,{label:"\u6807\u9898",prop:"title"},{default:l(()=>[e(m,{modelValue:t.title,"onUpdate:modelValue":o[2]||(o[2]=s=>t.title=s)},null,8,["modelValue"])]),_:1})]),_:1}),e(b,{span:12},{default:l(()=>[e(d,{label:"\u540D\u79F0",prop:"name"},{default:l(()=>[e(m,{modelValue:t.name,"onUpdate:modelValue":o[3]||(o[3]=s=>t.name=s)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(d,{label:"\u8DEF\u5F84",prop:"path"},{default:l(()=>[e(m,{modelValue:t.path,"onUpdate:modelValue":o[4]||(o[4]=s=>t.path=s)},null,8,["modelValue"])]),_:1}),t.type===1?(c(),C(G,{key:0},[e(d,{label:"\u7EC4\u4EF6\u540D",prop:"component"},{default:l(()=>[e(m,{modelValue:t.component,"onUpdate:modelValue":o[5]||(o[5]=s=>t.component=s)},null,8,["modelValue"])]),_:1}),t.parent_id==0?(c(),y(d,{key:0,label:"\u56FE\u6807",prop:"icon"},{default:l(()=>[e(P,{width:"100px",height:"80px",modelValue:t.icon,"onUpdate:modelValue":o[6]||(o[6]=s=>t.icon=s)},null,8,["modelValue"]),e(m,{modelValue:t.icon,"onUpdate:modelValue":o[7]||(o[7]=s=>t.icon=s)},null,8,["modelValue"])]),_:1})):$("",!0),e(d,{label:"\u72B6\u6001"},{default:l(()=>[e(a,{modelValue:t.status,"onUpdate:modelValue":o[8]||(o[8]=s=>t.status=s),prop:"status"},{default:l(()=>[e(p,{label:1},{default:l(()=>[V("\u663E\u793A")]),_:1}),e(p,{label:0},{default:l(()=>[V("\u9690\u85CF")]),_:1})]),_:1},8,["modelValue"])]),_:1})],64)):$("",!0),e(g,{gutter:24},{default:l(()=>[e(b,{span:12},{default:l(()=>[e(d,{label:"\u6392\u5E8F",prop:"sort"},{default:l(()=>[e(m,{modelValue:t.sort,"onUpdate:modelValue":o[9]||(o[9]=s=>t.sort=s)},null,8,["modelValue"])]),_:1})]),_:1}),e(b,{span:12},{default:l(()=>[B(x).user.type===100?(c(),y(d,{key:0,label:"\u7B49\u7EA7",prop:"level"},{default:l(()=>[e(m,{modelValue:t.level,"onUpdate:modelValue":o[10]||(o[10]=s=>t.level=s)},null,8,["modelValue"])]),_:1})):$("",!0)]),_:1})]),_:1})]),_:1},8,["model"])),[[S,w.value]])]),_:1},8,["modelValue"])}}};const W={class:"g-flex"},X=z("span",null,"\u83DC\u5355\u5217\u8868",-1),Y={class:"g-flex-justify-end g-flex-1"},Z={key:0,class:"g-red"},ee={key:1,class:"g-purple"},le={key:0,class:"g-green"},te={key:1,class:"g-red"},ne={__name:"IndexView",setup(I){const f=h({loading:!1,total:0,list:[],row:{},parent_id:0}),_=o=>o.row.type===1?"v-menu":"v-api",x=(o,p=0)=>{let a=[];return o.forEach(d=>{d.parent_id==p&&(d.children=x(o,d.id),a.push(d))}),a},w=async()=>{f.loading=!0;const{success:o,data:p}=await F.getMenuList();f.loading=!1,o&&(f.list=x(p.list))};w();const v=E(!1),t=o=>{f.parent_id=o,v.value=!0},n=E(!1),M=o=>{f.row=o,n.value=!0},k=o=>{H.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{f.loading=!0;const{success:p,data:a}=await F.delMenu({id:o.id});f.loading=!1,p&&(L.success(a.msg),await w())})};return(o,p)=>{const a=i("el-button"),d=i("el-table-column"),b=i("el-table"),m=i("el-card"),g=D("loading");return c(),y(m,{class:"v_menu_list"},{header:l(()=>[z("div",W,[X,z("div",Y,[e(a,{type:"success",onClick:p[0]||(p[0]=u=>t(0))},{default:l(()=>[V("\u65B0\u589E")]),_:1})])])]),default:l(()=>[O((c(),y(b,{data:f.list,"row-key":"id","row-class-name":_,border:""},{default:l(()=>[e(d,{label:"id",prop:"id",width:"110"}),e(d,{label:"\u6807\u9898",prop:"title","min-width":"120","show-overflow-tooltip":""}),e(d,{label:"\u7C7B\u578B",width:"65","show-overflow-tooltip":""},{default:l(u=>[u.row.type==1?(c(),C("span",Z,"\u83DC\u5355")):(c(),C("span",ee,"Api\u63A5\u53E3"))]),_:1}),e(d,{label:"\u8DEF\u5F84",prop:"path","min-width":"180","show-overflow-tooltip":""}),e(d,{label:"\u8DEF\u7531\u540D\u5B57",prop:"name",width:"100","show-overflow-tooltip":""}),e(d,{label:"\u7EC4\u4EF6\u540D",prop:"component",width:"120","show-overflow-tooltip":""}),e(d,{label:"\u72B6\u6001",width:"50","show-overflow-tooltip":""},{default:l(u=>[u.row.status?(c(),C("span",le,"\u663E\u793A")):(c(),C("span",te,"\u9690\u85CF"))]),_:1}),e(d,{label:"\u6392\u5E8F",prop:"sort",width:"50","show-overflow-tooltip":""}),e(d,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:l(u=>[z("span",null,T(B(j)(u.row.create_time)),1)]),_:1}),e(d,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:l(u=>[z("span",null,T(B(j)(u.row.modify_time)),1)]),_:1}),e(d,{label:"\u64CD\u4F5C",width:"210",fixed:"right"},{default:l(u=>[e(a,{type:"success",onClick:U=>t(u.row.id)},{default:l(()=>[V("\u65B0\u589E\u4E0B\u7EA7")]),_:2},1032,["onClick"]),e(a,{type:"primary",onClick:U=>M(u.row)},{default:l(()=>[V("\u7F16\u8F91")]),_:2},1032,["onClick"]),e(a,{type:"danger",onClick:U=>k(u.row)},{default:l(()=>[V("\u5220\u9664")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[g,f.loading]]),e(J,{onSuccess:w,modelValue:v.value,"onUpdate:modelValue":p[1]||(p[1]=u=>v.value=u),parentId:f.parent_id},null,8,["modelValue","parentId"]),e(K,{onSuccess:p[2]||(p[2]=u=>w(!1)),modelValue:n.value,"onUpdate:modelValue":p[3]||(p[3]=u=>n.value=u),data:f.row},null,8,["modelValue","data"])]),_:1})}}};export{ne as default};
