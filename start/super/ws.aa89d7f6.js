import{u as e}from"./index.15f119bb.js";const s={};function n(t,i=null){this.reconcat_time=2e3,this.failconcat_time=1e3,this.timeout=5e4,this.timeoutId=null,this.group={},this.fn=s,this.reloadFn=null,this.token=i,this.init=o,this.connect=h,this.start=f,this.send=u,this.setToken=c,this.addFn=a,this.removeFn=l,this.joinGroup=p,this.leaveGroup=d,this.close=y,this.url=t,this.ws=null,this.active=!0,this.needInit=!1,this.connect(),this.reloadData=r}function o(){for(let t in this.group)this.ws.send(JSON.stringify({type:"leaveGroup",group:t}));this.group={},this.fn=s,this.reloadFn=null}function h(){this.active=!0,this.ws=new WebSocket(this.url),this.ws.onopen=()=>{this.needInit&&typeof this.fn.onreconcat=="function"&&this.fn.onreconcat(),this.token&&this.ws.send(JSON.stringify({type:"token",token:this.token}));for(let t in this.group)this.ws.send(JSON.stringify({type:"joinGroup",group:t}));this.reloadFn&&this.reloadFn(),this.start()},this.ws.onmessage=t=>{const i=JSON.parse(t.data);i.type=="group"?typeof this.group[i.fn]=="function"&&this.group[i.fn](i.data):i.type=="fn"?typeof this.fn[i.fn]=="function"&&this.fn[i.fn](i.data):i.type=="ping"&&this.ws.send(JSON.stringify({type:"pong"}))},this.ws.onclose=()=>{typeof this.fn.onclose=="function"&&(this.needInit=!0,this.fn.onclose()),this.active&&setTimeout(()=>{this.connect()},this.reconcat_time)}}function r(t){this.reloadFn=t}function f(){this.timeoutId&&clearInterval(this.timeoutId),this.timeoutId=setInterval(()=>{this.ws.send(JSON.stringify({type:"ping"}))},this.timeout)}function u(t){if(this.ws.readyState===1)this.ws.send(JSON.stringify(t));else{if(!this.active)return;setTimeout(()=>{this.ws.send(JSON.stringify(t))},this.failconcat_time)}}function c(t){this.token=t,this.ws.readyState===1&&this.ws.send(JSON.stringify({type:"token",token:t}))}function a(t,i){this.fn[t]=i}function l(t){delete this.fn[t]}function p(t,i){if(this.group[t]=i,this.ws.readyState===1)return this.ws.send(JSON.stringify({type:"joinGroup",group:t}))}function d(t){delete this.group[t],this.ws.readyState===1&&this.ws.send(JSON.stringify({type:"leaveGroup",group:t}))}function y(){this.active=!1,this.ws.close(),this.ws=null,this.timeoutId&&clearInterval(this.timeoutId)}const w=e(),m=new n((document.location.protocol=="http:"?"ws://":"wss://")+document.location.host+"/ws",w.token);export{m as w};