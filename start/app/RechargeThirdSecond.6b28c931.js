import{s as v,u as f,c as m,E as x,f as p,g as a,F as b,o as d,a as y,b as e,d as s,t as r,j as k,m as q,aR as l,ak as C,I as j}from"./main.df4ea462.js";import{v as R}from"./vue-qr.4235d578.js";const T={class:"v_recharge_third_second g-flex-column n-bg"},V={class:"new-head"},B=e("img",{src:j,alt:""},null,-1),w=[B],z=e("i",{class:"iconfont icon-kefu"},null,-1),Q=[z],S={class:"new-head_title_text"},$={class:"v-recharge-bi-container"},E={class:"v-recharge-third-second-tips g-flex-justify-center g-flex-align-center"},I={class:"v-recharge-third-second-tips-title"},N={class:"v-recharge-third-second-tips-text g-flex-align-center"},D={class:"v-recharge-bi-top"},F={class:"v-recharge-bi-code-box"},O={class:"v-recharge-bi-qrcode-box g-flex-align-center g-flex-column"},A={class:"v-recharge-bi-qrcode g-flex-align-center g-flex-justify-center"},G={class:"v-recharge-bi-qrcode-address-title"},H={class:"v-recharge-bi-qrcode-address-box g-flex-align-center"},J={class:"v-recharge-bi-qrcode-address-val"},K=e("i",{class:"iconfont icon-ic_line_copy24px"},null,-1),L=[K],W={__name:"RechargeThirdSecond",setup(M){v();const _=f(),i=m(()=>_.tm("rechargebi")),c=x();p();const h=a(null);let g=a(7),o=b({id:"",info:{currency:c.query.currency,address:c.query.address,chain:c.query.chain},amount:c.query.amount});return(u,t)=>(d(),y("div",T,[e("div",V,[e("div",{onClick:t[0]||(t[0]=n=>u.$router.go(-2)),class:"new-head-back"},w),e("div",{onClick:t[1]||(t[1]=(...n)=>s(l)&&s(l)(...n)),class:"v-head-right g-flex-align-center"},Q)]),e("div",S,r(s(i).titleText),1),e("div",$,[e("div",E,[e("div",I,r(s(i).zhuanzhangText)+": ",1),e("div",N,r(s(o).amount),1)]),e("div",D,[e("div",F,[e("div",O,[e("div",A,[s(o).info.address?(d(),k(R,{key:0,ref_key:"refVueQr",ref:h,text:s(o).info.address,margin:s(g),size:130},null,8,["text","margin"])):q("",!0)]),e("div",G,r(s(i).saomaText),1)]),e("div",H,[e("div",J,r(s(o).info.address),1),e("div",{onClick:t[2]||(t[2]=n=>s(C)(s(o).info.address)),class:"v-recharge-bi-copy g-flex-justify-center"},L)])])])])]))}};export{W as default};
