const FN = {
  // msg: function() {

  // }
}

class MyWebSocket {
  ws = null
  url = ''
  connected = false
  reconcat_time = 2000
  failconcat_time = 1000
  timeout = 5000
  timeoutId = null
  token = ''
  group = {}
  fn = FN
  active = true
  needInit = false
  init() {
    for (let key in this.group) {
      this.ws?.send(JSON.stringify({ type: "leaveGroup", group: key }))
    }
    this.group = {}
    this.fn = FN
    this.reloadFn = null
  }
  connect(url, token) {
    this.token = token
    if (this.ws) {
      this.ws?.close()
      this.ws = null
    }

    if (!url) {
      console.error('WebSocket URL is not set.')
      return
    }

    this.active = true //激活主动重连
    this.url = url
    this.ws = new WebSocket(url)
    this.ws.onopen = () => {
      // 如果是断开过websocket需要重新初始化
      if (this.needInit && typeof this.fn['onreconcat'] == 'function') this.fn['onreconcat']()

      if (this.token) this.ws?.send(JSON.stringify({ type: "token", token: this.token }))
      //订阅分组
      for (let key in this.group) {
        this.ws?.send(JSON.stringify({ type: "joinGroup", group: key }))
      }
      this.connected = true
      console.log('connected')
      if (this.reloadFn) this.reloadFn()
      this.start()
    }

    this.ws.onclose = () => {
      this.connected = false
      // 如果断网了 关闭了
      if (typeof this.fn['onclose'] == 'function') {
        this.needInit = true
        this.fn['onclose']()
      }
      // 如果是主动关闭就不要重连了
      if (!this.active) return
      //连接关闭,定时重连!
      setTimeout(() => {
        this.connect()
      }, this.reconcat_time)
    }

    this.ws.onmessage = (e) => {
      const res = JSON.parse(e.data)
      if (res.type == 'group') {
        if (typeof this.group[res.fn] == 'function') this.group[res.fn](res.data)
      } else if (res.type == 'fn') {
        if (typeof this.fn[res.fn] == 'function') this.fn[res.fn](res.data)
      } else if (res.type == 'ping') {
        this.ws?.send(JSON.stringify({ type: "pong" }))
      }
    }
    this.ws.onerror = (e) => {
      console.log('WebSocket连接发生错误', e)
      this.connect()
    }
  }
  start() {
    if (this.timeoutId) clearInterval(this.timeoutId)
    this.timeoutId = setInterval(() => {
      this.ws?.send(JSON.stringify({ type: "ping" }))
    }, this.timeout)
  }
  reloadData(fn) {
    this.reloadFn = fn
  }
  send(data) {
    if (this.ws?.readyState === 1) {
      //this.start()
      this.ws?.send(JSON.stringify(data))
    } else {
      if (!this.active) return
      setTimeout(() => {
        this.ws?.send(JSON.stringify(data))
      }, this.failconcat_time)
    }
  }
  setToken(token) {
    this.token = token
    if (this.ws?.readyState == 1) {
      this.ws?.send(JSON.stringify({ type: "token", token: token }))
    }
  }
  addFn(name, fn) {
    this.fn[name] = fn
  }
  removeFn(name) {
    delete this.fn[name]
  }
  joinGroup(group, fn) {
    this.group[group] = fn
    if (this.ws?.readyState === 1) return this.ws?.send(JSON.stringify({ type: "joinGroup", group: group }))
  }
  leaveGroup(group) {
    delete this.group[group]
    if (this.ws?.readyState === 1) {
      this.ws?.send(JSON.stringify({ type: "leaveGroup", group: group }))
    }
  }
  close() {
    this.active = false
    this.ws?.close()
    this.ws = null
    // 清除心跳定时器
    if (this.timeoutId) clearInterval(this.timeoutId)
  }
}
export const WebSocketInstance = new MyWebSocket()
