Date.prototype.format=function(e){let n={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),"S+":this.getMilliseconds()};/(y+)/i.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(let t in n)new RegExp("("+t+")").test(e)&&(e=e.replace(RegExp.$1,RegExp.$1.length==1?n[t]:("00"+n[t]).substr((""+n[t]).length)));return e};const r=(e,n="yyyy-MM-dd hh:mm:ss",t="")=>{let s;if(e===0)return"-";if(e instanceof Date?s=e:e?s=e.toString().length===13?new Date(Number(e)):new Date(e*1e3):s=new Date,t){let h=s.getTimezoneOffset(),i=s.getTime()+h*6e4;t==="America/New_York"&&(s=new Date(i-36e5*4))}return s.format(n)};Math.formatFloat=function(e,n){const t=Math.pow(10,n);return Math.round(e*t)/t};export{r as f};
