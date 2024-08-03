import{u as F,b as G,M as le,r as W,c as i,d as J,o as m,k,h as l,g as e,m as c,w as q,G as S,Q as K,e as w,F as O,D as M,l as j,i as z,O as ae,n as A,E as P,j as te,f as B,P as oe}from"./index.2f5aab6b.js";import{f as R}from"./index.f2e9d2c9.js";const ne={__name:"EditView",props:{modelValue:{type:Boolean,default:!1},data:{type:Object}},emits:["update:modelValue","success"],setup(I,{emit:L}){const s=I,V=F(),f=G(!1),y=le({get:()=>s.modelValue,set:b=>{L("update:modelValue",b)}}),t=W({id:0,title:"",icon:"",info:{},min:"",max:"",remark:"",sort:"",authCode:"",status:1}),D=()=>{t.id=s.data.id,t.title=s.data.title,t.icon=s.data.icon,t.info=JSON.parse(JSON.stringify(s.data.info)),t.min=s.data.min,t.max=s.data.max,t.remark=s.data.remark,t.sort=s.data.sort,t.authCode="",t.status=s.data.status},U=async()=>{if(f.value)return;f.value=!0;const{success:b,data:o}=await A.editTrade(t);f.value=!1,b&&(L("success"),P.success(o.msg),y.value=!1)},r=()=>{t.info.list.push({currency:"USDT",symbol:"",icon:"/img/coin/usdt.png",rate:"1",fee:"0",fixed:"2",chainList:["TRC-20","ERC-20"]})},g=()=>{t.info.list.pop()},E=b=>{b.push("")},h=b=>{b.pop()};return(b,o)=>{const p=i("el-input"),d=i("el-form-item"),u=i("el-col"),v=i("el-row"),x=i("el-divider"),C=i("el-radio"),T=i("el-radio-group"),n=i("el-button"),$=i("el-option"),Q=i("el-select"),H=i("el-form"),X=i("el-dialog"),Y=J("loading");return m(),k(X,{modelValue:z(y),"onUpdate:modelValue":o[19]||(o[19]=a=>ae(y)?y.value=a:null),top:"2vh",title:"\u7F16\u8F91",onOpen:D,"close-on-click-modal":!1,width:"680px"},{footer:l(()=>[e(n,{size:"default",onClick:o[18]||(o[18]=a=>y.value=!1)},{default:l(()=>[c("\u53D6 \u6D88")]),_:1}),e(n,{size:"default",type:"primary",onClick:U},{default:l(()=>[c("\u786E \u8BA4")]),_:1})]),default:l(()=>[q((m(),k(H,{size:"default",model:t,"label-width":"90px"},{default:l(()=>[e(v,{gutter:24},{default:l(()=>[e(u,{span:12},{default:l(()=>[e(d,{label:"\u6807\u9898"},{default:l(()=>[e(p,{modelValue:t.title,"onUpdate:modelValue":o[0]||(o[0]=a=>t.title=a),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(d,{label:"ID"},{default:l(()=>[c(S(t.id),1)]),_:1})]),_:1})]),_:1}),e(v,{gutter:24},{default:l(()=>[e(u,{span:12},{default:l(()=>[e(d,{label:"\u5907\u6CE8"},{default:l(()=>[e(p,{type:"textarea",rows:3,modelValue:t.remark,"onUpdate:modelValue":o[1]||(o[1]=a=>t.remark=a),placeholder:"\u8BF7\u8F93\u5165\u5907\u6CE8"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(d,{label:"\u56FE\u6807"},{default:l(()=>[e(K,{width:"80px",height:"50px",modelValue:t.icon,"onUpdate:modelValue":o[2]||(o[2]=a=>t.icon=a)},null,8,["modelValue"]),e(p,{modelValue:t.icon,"onUpdate:modelValue":o[3]||(o[3]=a=>t.icon=a)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),s.data.fn=="Bank"?(m(),k(v,{key:0,gutter:24},{default:l(()=>[e(x),e(u,{span:12},{default:l(()=>[e(d,{label:"\u7ED1\u5B9A\u94F6\u884C\u5361"},{default:l(()=>[e(T,{modelValue:t.info.isSelect,"onUpdate:modelValue":o[4]||(o[4]=a=>t.info.isSelect=a)},{default:l(()=>[e(C,{label:"1"},{default:l(()=>[c("\u5F00\u542F")]),_:1}),e(C,{label:"0"},{default:l(()=>[c("\u5173\u95ED")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(d,{label:"\u624B\u7EED\u8D39\u7387"},{default:l(()=>[e(p,{modelValue:t.info.fee,"onUpdate:modelValue":o[5]||(o[5]=a=>t.info.fee=a),placeholder:"\u8BF7\u8F93\u5165\u624B\u7EED\u8D39\u7387,0.01\u4E3A1%"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(d,{label:"\u8D27\u5E01\u5355\u4F4D"},{default:l(()=>[e(p,{modelValue:t.info.currency,"onUpdate:modelValue":o[6]||(o[6]=a=>t.info.currency=a),placeholder:"\u8BF7\u8F93\u5165\u8D27\u5E01\u5355\u4F4D"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(d,{label:"\u8D27\u5E01\u7B26\u53F7"},{default:l(()=>[e(p,{modelValue:t.info.symbol,"onUpdate:modelValue":o[7]||(o[7]=a=>t.info.symbol=a),placeholder:"\u8BF7\u8F93\u5165\u59D3\u540D"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(d,{label:"\u8D27\u5E01\u6C47\u7387"},{default:l(()=>[e(p,{modelValue:t.info.rate,"onUpdate:modelValue":o[8]||(o[8]=a=>t.info.rate=a),placeholder:"\u8BF7\u8F93\u5165\u8D27\u5E01\u6C47\u7387"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(d,{label:"\u91D1\u989D\u4F4D\u6570"},{default:l(()=>[e(p,{modelValue:t.info.fixed,"onUpdate:modelValue":o[9]||(o[9]=a=>t.info.fixed=a),placeholder:"\u8BF7\u8F93\u5165\u91D1\u989D\u5C0F\u6570\u4F4D\u6570"},null,8,["modelValue"])]),_:1})]),_:1}),e(x)]),_:1})):s.data.fn=="Wallet"?(m(),w(O,{key:1},[e(x),e(v,{gutter:24},{default:l(()=>[e(u,{span:12},{default:l(()=>[e(d,{label:"\u94B1\u5305\u7BA1\u7406"},{default:l(()=>[e(n,{type:"primary",onClick:o[10]||(o[10]=a=>r())},{default:l(()=>[c("\u65B0\u589E")]),_:1}),e(n,{type:"danger",onClick:o[11]||(o[11]=a=>g())},{default:l(()=>[c("\u5220\u9664")]),_:1})]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(d,{label:"\u7ED1\u5B9A\u94B1\u5305"},{default:l(()=>[e(T,{modelValue:t.info.isSelect,"onUpdate:modelValue":o[12]||(o[12]=a=>t.info.isSelect=a)},{default:l(()=>[e(C,{label:"1"},{default:l(()=>[c("\u5F00\u542F")]),_:1}),e(C,{label:"0"},{default:l(()=>[c("\u5173\u95ED")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(x),(m(!0),w(O,null,M(t.info.list,(a,Z)=>(m(),k(v,{key:Z,gutter:24},{default:l(()=>[e(u,{span:12},{default:l(()=>[e(d,{label:"\u8D27\u5E01\u5355\u4F4D"},{default:l(()=>[e(p,{modelValue:a.currency,"onUpdate:modelValue":_=>a.currency=_,placeholder:"\u8BF7\u8F93\u5165\u8D27\u5E01\u5355\u4F4D"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(u,{span:12},{default:l(()=>[e(d,{label:"\u8D27\u5E01\u56FE\u6807"},{default:l(()=>[e(K,{width:"80px",height:"80px",modelValue:a.icon,"onUpdate:modelValue":_=>a.icon=_},null,8,["modelValue","onUpdate:modelValue"]),e(p,{modelValue:a.icon,"onUpdate:modelValue":_=>a.icon=_},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(u,{span:12},{default:l(()=>[e(d,{label:"\u8D27\u5E01\u6C47\u7387"},{default:l(()=>[e(p,{modelValue:a.rate,"onUpdate:modelValue":_=>a.rate=_,placeholder:"\u8BF7\u8F93\u5165\u8D27\u5E01\u6C47\u7387"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(u,{span:12},{default:l(()=>[e(d,{label:"\u6570\u91CF\u4F4D\u6570"},{default:l(()=>[e(p,{modelValue:a.fixed,"onUpdate:modelValue":_=>a.fixed=_,placeholder:"\u8BF7\u8F93\u5165\u6362\u7B97\u6570\u91CF\u5C0F\u6570\u4F4D\u6570"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(u,{span:12},{default:l(()=>[e(d,{label:"\u624B\u7EED\u8D39\u7387"},{default:l(()=>[e(p,{modelValue:a.fee,"onUpdate:modelValue":_=>a.fee=_,placeholder:"\u8BF7\u8F93\u5165\u624B\u7EED\u8D39\u7387,0.01\u4E3A1%"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(u,{span:24},{default:l(()=>[e(d,{label:"\u94FE\u7C7B\u578B"},{default:l(()=>[e(n,{type:"primary",onClick:_=>E(a.chainList)},{default:l(()=>[c("\u65B0\u589E")]),_:2},1032,["onClick"]),e(n,{type:"danger",onClick:_=>h(a.chainList)},{default:l(()=>[c("\u5220\u9664")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024),(m(!0),w(O,null,M(a.chainList,(_,N)=>(m(),k(u,{key:N,span:12},{default:l(()=>[e(d,{label:"\u94FE\u7C7B\u578B"},{default:l(()=>[e(p,{modelValue:a.chainList[N],"onUpdate:modelValue":ee=>a.chainList[N]=ee,placeholder:"\u8BF7\u8F93\u5165\u94FE\u7C7B\u578B"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024))),128)),e(x)]),_:2},1024))),128))],64)):j("",!0),e(v,{gutter:24},{default:l(()=>[e(u,{span:12},{default:l(()=>[e(d,{label:"\u6700\u5C0F\u9650\u5236"},{default:l(()=>[e(p,{modelValue:t.min,"onUpdate:modelValue":o[13]||(o[13]=a=>t.min=a),placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u9650\u5236"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(d,{label:"\u6700\u5927\u9650\u5236"},{default:l(()=>[e(p,{modelValue:t.max,"onUpdate:modelValue":o[14]||(o[14]=a=>t.max=a),placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u9650\u5236,-1\u4E0D\u9650\u5236"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(v,{gutter:24},{default:l(()=>[e(u,{span:12},{default:l(()=>[e(d,{label:"\u6392\u5E8F"},{default:l(()=>[e(p,{modelValue:t.sort,"onUpdate:modelValue":o[15]||(o[15]=a=>t.sort=a),placeholder:"\u6392\u5E8F"},null,8,["modelValue"])]),_:1})]),_:1}),e(u,{span:12},{default:l(()=>[e(d,{label:"\u72B6\u6001"},{default:l(()=>[e(Q,{modelValue:t.status,"onUpdate:modelValue":o[16]||(o[16]=a=>t.status=a)},{default:l(()=>[e($,{label:"\u6B63\u5E38",value:1}),e($,{label:"\u7981\u7528",value:0})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),z(V).system.GoogleAuth=="1"?(m(),k(d,{key:2,label:"\u8C37\u6B4C\u9A8C\u8BC1\u7801"},{default:l(()=>[e(p,{modelValue:t.authCode,"onUpdate:modelValue":o[17]||(o[17]=a=>t.authCode=a),placeholder:"\u8BF7\u8F93\u5165\u8C37\u6B4C\u9A8C\u8BC1\u7801",autocomplete:"off"},null,8,["modelValue"])]),_:1})):j("",!0)]),_:1},8,["model"])),[[Y,f.value]])]),_:1},8,["modelValue"])}}},de=B("div",{class:"g-flex"},[B("span",null,"\u63D0\u73B0\u914D\u7F6E")],-1),ue={key:0,class:"g-green"},se={key:1,class:"g-red"},ie=["onClick"],re={key:0},pe={key:1},me={key:0,class:"g-green"},fe={key:1,class:"g-red"},_e={key:2,class:"g-red"},ge={__name:"IndexView",setup(I){const L=F(),s=W({loading:!1,total:0,list:[],row:{}}),V=W({type:2,title:"",status:"",page:1,limit:15}),f=async(U=!0)=>{U&&(V.page=1),s.loading=!0;const{success:r,data:g}=await A.getTradeList(V);s.loading=!1,r&&(s.list=g.list,s.total=g.total)};f();const y=G(!1),t=U=>{s.row=U,y.value=!0},D=U=>{oe.confirm("\u786E\u8BA4\u5220\u9664\u6570\u636E?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{s.loading=!0;const{success:r,data:g}=await A.delTrade({id:U.id});s.loading=!1,r&&(P.success(g.msg),await f(!1))})};return(U,r)=>{const g=i("el-option"),E=i("el-select"),h=i("el-form-item"),b=i("el-input"),o=i("el-button"),p=i("el-form"),d=i("el-table-column"),u=i("el-image"),v=i("el-table"),x=i("el-pagination"),C=i("el-card"),T=J("loading");return m(),k(C,null,{header:l(()=>[de]),default:l(()=>[e(p,{inline:!0},{default:l(()=>[e(h,{label:"\u72B6\u6001"},{default:l(()=>[e(E,{modelValue:V.status,"onUpdate:modelValue":r[0]||(r[0]=n=>V.status=n),onChange:f},{default:l(()=>[e(g,{label:"\u5168\u90E8",value:""}),e(g,{label:"\u6B63\u5E38",value:"1"}),e(g,{label:"\u7981\u7528",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(h,{label:"\u6807\u9898"},{default:l(()=>[e(b,{modelValue:V.title,"onUpdate:modelValue":r[1]||(r[1]=n=>V.title=n),onKeyup:te(f,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u6807\u9898",onClear:f,clearable:""},null,8,["modelValue","onKeyup"])]),_:1}),e(h,null,{default:l(()=>[e(o,{type:"primary",onClick:f},{default:l(()=>[c("\u67E5\u8BE2")]),_:1})]),_:1})]),_:1}),q((m(),k(v,{data:s.list,stripe:"",border:""},{default:l(()=>[e(d,{prop:"id",label:"ID",width:"80"}),e(d,{label:"\u4EA4\u6613\u65B9\u5F0F","min-width":"80","show-overflow-tooltip":!0},{default:l(n=>[n.row.mode==1?(m(),w("span",ue,"\u7EBF\u4E0B")):(m(),w("span",se,"\u7EBF\u4E0A"))]),_:1}),e(d,{label:"\u6807\u9898","min-width":"100"},{default:l(n=>[B("span",{onClick:$=>z(L).setTranslate({content:n.row.title}),class:"g-purple g-pointer"},S(n.row.title),9,ie)]),_:1}),e(d,{label:"\u56FE\u6807",width:"80"},{default:l(n=>[n.row.icon?(m(),k(u,{key:0,src:n.row.icon,"preview-src-list":[n.row.icon],fit:"contain","hide-on-click-modal":"","preview-teleported":""},null,8,["src","preview-src-list"])):j("",!0)]),_:1}),e(d,{prop:"min",label:"\u6700\u5C0F",width:"80"}),e(d,{label:"\u6700\u5927",width:"80"},{default:l(n=>[n.row.max==-1?(m(),w("span",re,"\u4E0D\u9650\u5236")):(m(),w("span",pe,S(n.row.max),1))]),_:1}),e(d,{prop:"sort",label:"\u6392\u5E8F","min-width":"100"}),e(d,{label:"\u521B\u5EFA\u65F6\u95F4",width:"130"},{default:l(n=>[B("span",null,S(z(R)(n.row.create_time)),1)]),_:1}),e(d,{label:"\u66F4\u65B0\u65F6\u95F4",width:"130"},{default:l(n=>[B("span",null,S(z(R)(n.row.modify_time)),1)]),_:1}),e(d,{label:"\u72B6\u6001",width:"80"},{default:l(n=>[n.row.status===1?(m(),w("span",me,"\u6B63\u5E38")):n.row.status===0?(m(),w("span",fe,"\u7981\u7528")):(m(),w("span",_e,"\u5F02\u5E38"))]),_:1}),e(d,{label:"\u64CD\u4F5C",width:"130",fixed:"right"},{default:l(n=>[e(o,{type:"primary",onClick:$=>t(n.row)},{default:l(()=>[c("\u7F16\u8F91")]),_:2},1032,["onClick"]),e(o,{type:"danger",onClick:$=>D(n.row)},{default:l(()=>[c("\u5220\u9664")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[T,s.loading]]),e(x,{"page-sizes":[15,30,60,100],total:s.total,"page-size":V.limit,"onUpdate:page-size":r[2]||(r[2]=n=>V.limit=n),"current-page":V.page,"onUpdate:current-page":r[3]||(r[3]=n=>V.page=n),onCurrentChange:r[4]||(r[4]=n=>f(!1)),onSizeChange:r[5]||(r[5]=n=>f(!1)),background:"",small:"",layout:"total, sizes, prev, pager, next, jumper"},null,8,["total","page-size","current-page"]),e(ne,{onSuccess:r[6]||(r[6]=n=>f(!1)),modelValue:y.value,"onUpdate:modelValue":r[7]||(r[7]=n=>y.value=n),data:s.row},null,8,["modelValue","data"])]),_:1})}}};export{ge as default};
