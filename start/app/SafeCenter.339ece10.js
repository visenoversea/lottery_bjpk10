import{s as A,v as x,c as f,u as w,o as p,a as C,b as e,t as s,m as a,p as o,h as c,J as B,_ as S}from"./main.b5791ad0.js";const g="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAACiklEQVRIibWWv2sUQRTHP7seWIQkoOZIYQoL4Swy2OYSGzl/oF0i5LYatThLKxsPBIv7I7wmTOMkhbELxKQRT9PKWphOQoLIgcUZUghKLOZtMmz2x/nrNTPMvPf97nfeznsTUGCxjgJgBpgH5oAaMC7bA2Ab6AGrwJYy9jAPKygguQV0gMve8i7Ql3kVmPL23gNtZezaUESxjkaBLtCUpU1gCVhXxn5N+Z4FbgD3gIYsLwMtZex+LlGso0ngFTCNO5aWMvZN1hdmfOAV4BlwCfgAXFfGfjlBJEreCskLQCtjD1JgY8BL3JHdV8b2UvsjgAEWhGw2URZ6fl2PZDFNInYbuApcBB6lNyVmUTCmBZMjIkl8E3dcWhn7M+t4gM/efCfLQWI18BFoCvaRoo6MrRwlCchr3LE8BB4X+B0ADxLsWEdBEOuojsvNpjL2Wl7wn1isow3c3zhbwV1GcL9wWWAFqAN3gR1l7NOSkCUhmq/gbjzAegHBBeA5LsEjstzJ8/cswZwLcWVlL30ZfVPGfgJu4tT8kOVBGYtg7gK1EFe7+sUhoIwdKGNjz/dbWYxYHxgPS91O2qiMpYp8CyWgOoxzrKPTHtGwiqrAIMRd0vNSIMtswpuXKhLMKWA7xPUTcFW4zCa9+TCKEsxeiGta4Ep9mZ3z5sPkKMFcDZWx73BNqyGlvsj8XBYSCVZDsLeSv64tY1dKfZ6dSSbK2FwiwUgqd1sZexhK0BquM9YAE+voVA5GAp77NpBYI1jLSWv371EL16wWgJUcZRvAdyCIdTSTo2SF48bXSvZ+u5XHOroDPAHGRJlSxu5LTrqiJL+Ve0D//3GSAsl6bu1xXOsm+JvnVgZhnX/wgPwFzfTzOUYNN+AAAAAASUVORK5CYII=";const b={class:"v_safe_center g-flex-column n-bg"},L={class:"new-head"},I=e("img",{src:S,alt:""},null,-1),T=[I],U={class:"new-head_title_text"},k={class:"v-safe-center-container"},P={class:"v-safe-center-list"},W={class:"v-safe-center-item-left"},Z={class:"v-safe-center-item-right g-flex-align-center"},j={class:"v-safe-center-item-right-no g-flex-align-center"},G=e("img",{src:g,alt:""},null,-1),O=e("div",{class:"v-safe-center-item-right-icon g-flex-align-center"},[e("i",{class:"iconfont icon-you"})],-1),E={class:"v-safe-center-item-left"},N={class:"v-safe-center-item-right g-flex-align-center"},V={class:"v-safe-center-item-right-no g-flex-align-center"},Y=e("img",{src:g,alt:""},null,-1),y=e("div",{class:"v-safe-center-item-right-icon g-flex-align-center"},[e("i",{class:"iconfont icon-you"})],-1),K={class:"v-safe-center-item-left"},M={class:"v-safe-center-item-right g-flex-align-center"},z={class:"v-safe-center-item-right-no g-flex-align-center"},F=e("img",{src:g,alt:""},null,-1),R=e("div",{class:"v-safe-center-item-right-icon g-flex-align-center"},[e("i",{class:"iconfont icon-you"})],-1),H={__name:"SafeCenter",setup(J){const d=A(),v=x.exports.useI18n(),t=f(()=>v.tm("safecenter")),l=w();let n=f(()=>d.userInfo);async function _(){const{success:r,data:i}=await B();!r||(d.setUserInfo(i.info),console.log(i))}_();function u(){l.push({name:"bindemail"})}function h(){l.push({name:"changebuspwd"})}function m(){l.push({name:"changepwd"})}return(r,i)=>(p(),C("div",b,[e("div",L,[e("div",{onClick:i[0]||(i[0]=D=>r.$router.go(-1)),class:"new-head-back"},T)]),e("div",U,s(t.value.titleText),1),e("div",k,[e("div",P,[e("div",{onClick:u,class:"v-safe-center-item g-flex-align-center g-flex-justify-between"},[e("div",W,s(t.value.emailText),1),e("div",Z,[a(e("div",{class:"v-safe-center-item-right-have"},s(c(n).email),513),[[o,c(n).email]]),a(e("div",j,[G,e("span",null,s(t.value.noBindeText),1)],512),[[o,!c(n).email]]),O])]),e("div",{onClick:h,class:"v-safe-center-item g-flex-align-center g-flex-justify-between"},[e("div",E,s(t.value.busPwdText),1),e("div",N,[a(e("div",V,[Y,e("span",null,s(t.value.noSetText),1)],512),[[o,c(n).fundPasswordStatus==0]]),y])]),e("div",{onClick:m,class:"v-safe-center-item g-flex-align-center g-flex-justify-between"},[e("div",K,s(t.value.loginPwdText),1),e("div",M,[a(e("div",z,[F,e("span",null,s(t.value.noSetText),1)],512),[[o,c(n).passwordStatus==0]]),R])])])])]))}};export{H as default};
