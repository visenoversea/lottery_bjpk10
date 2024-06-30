const FN = {
  // msg: function() {

  // }
}

// const ws=new web_socket(url,token)
function web_socket(url, token = null) {
  //重连时间间隔设置
  this.reconcat_time= 2000
  // 主动发送消息失败 重发间隔时间
  this.failconcat_time= 1000
  //心跳间隔时间
  this.timeout= 50000
  //心跳定时器对象
  this.timeoutId=null
  //订阅分组信息
  this.group= {}
  //信息
  this.fn= FN

  // 重返方法
  this.reloadFn = null

  //token发送
  this.token= token
  
  //初始化
  this.init= init
  //连接
  this.connect= connect
  //启动心跳定时器
  this.start= start

  //主动往后台发送消息
  this.send = send
  
  //设置token
  this.setToken= setToken
  //添加信息回调
  this.addFn= addFn
  //移除信息回调
  this.removeFn= removeFn
  //订阅分组信息
  this.joinGroup= joinGroup
  //解绑分组信息
  this.leaveGroup= leaveGroup
  //关闭websocket
  this.close= close

  //websocket链接地址
  this.url= url
  //websocket对象链接
  this.ws=null
      
  // 是否激活主动重连 主动关闭后就关闭主动重连
  this.active = true
  
  // 是否自动因为没网关闭,如果是需要再重新连接时初始化
  this.needInit = false

  //初始化连接
  this.connect()
  
  this.reloadData = reloadData
}

//初始化(离开这个房间 不在接收消息)
function init() {
  for (let key in this.group) {
      this.ws.send(JSON.stringify({type: "leaveGroup", group: key}))
  }
  this.group = {}
  this.fn = FN
  this.reloadFn = null
}

// 连接websocket（new一次构造函数执行一次）
function connect() {
  this.active  = true //激活主动重连
  this.ws = new WebSocket(this.url)
  console.log('connect', this.ws)
  this.ws.onopen = () => {
      // 如果是断开过websocket需要重新初始化
      if(this.needInit && typeof this.fn['onreconcat'] == 'function') this.fn['onreconcat']()
      
      if(this.token) this.ws.send(JSON.stringify({type: "token", token: this.token}))
      //订阅分组
      for (let key in this.group) {
          this.ws.send(JSON.stringify({type: "joinGroup", group: key}))
      }

      if(this.reloadFn) this.reloadFn()

      this.start()
  }
  
  this.ws.onmessage = e => {
      //清除倒计时
      //this.start()
      const res = JSON.parse(e.data)
      if (res.type == 'group') {
          if (typeof this.group[res.fn] == 'function') this.group[res.fn](res.data)
      } else if (res.type == 'fn') {
          if (typeof this.fn[res.fn] == 'function')  this.fn[res.fn](res.data)
      } else if (res.type == 'ping') {
          this.ws.send(JSON.stringify({type: "pong"}))
      }
  }

  this.ws.onclose = () => {
      // 如果断网了 关闭了
      if(typeof this.fn['onclose'] == 'function') {
        this.needInit = true
        this.fn['onclose']()
      } 
      // 如果是主动关闭就不要重连了
      if (!this.active) return
      //连接关闭,定时重连!
      setTimeout(()=>{
          this.connect()
      }, this.reconcat_time)
  }
}

function reloadData(fn) {
  this.reloadFn = fn
}


// 心跳（50s一次）
function start() {
  if(this.timeoutId) clearInterval(this.timeoutId)
  this.timeoutId = setInterval(() => {
      this.ws.send(JSON.stringify({type: "ping"}))
  }, this.timeout)
}

// 主动向后台发送信息（订阅分组 xxxx）
function send(data) {
  if (this.ws.readyState === 1) {
      //this.start()
      this.ws.send(JSON.stringify(data))
  } else {
      if (!this.active) return
      setTimeout(() => {
          this.ws.send(JSON.stringify(data))
      }, this.failconcat_time)
  }
}

// 主动设置token（登录 注册 时需要主动调用）
function setToken (token) {
  this.token = token
  console.log('this.ws.readyState', this.ws.readyState)
  if (this.ws.readyState == 1) {
    this.ws.send(JSON.stringify({type: "token", token: token}))
  }
}

// 后台主动推给前台
function addFn(name, fn) {
  this.fn[name] = fn
}

function removeFn(name) {
  delete this.fn[name]
}


// 主动订阅分组 （告诉后台加入房间，下次就可以收到这个房间的消息了）
function joinGroup(group, fn) {
  this.group[group] = fn
  if (this.ws.readyState === 1) return this.ws.send(JSON.stringify({type: "joinGroup", group: group}))
}

// 主动断开某一个消息
function leaveGroup(group) {
  delete this.group[group]
  if (this.ws.readyState === 1) {
      this.ws.send(JSON.stringify({type: "leaveGroup", group: group}))
  }
}

// 主动关闭websocket
function close() {
  this.active = false
  this.ws.close()
  this.ws=null
  // 清除心跳定时器
  if(this.timeoutId) clearInterval(this.timeoutId)
}

export default web_socket