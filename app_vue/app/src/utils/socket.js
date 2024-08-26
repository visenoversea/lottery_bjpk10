// websocket.js

class WebSocketManager {
    constructor(url) {
        console.log(url)
        this.url = url;
        this.websocket = null;
        this.callbacks = [];
        this.connect();
    }

    static createWebSocketManager(url) {
        return new WebSocketManager(url);
    }

    connect() {
        if (!this.websocket || this.websocket.readyState === WebSocket.CLOSED) {
            this.websocket = new WebSocket(this.url);
            this.websocket.onopen = this.handleOpen.bind(this);
            this.websocket.onmessage = this.handleMessage.bind(this);
            this.websocket.onclose = this.handleClose.bind(this);
            this.websocket.onerror = this.handleError.bind(this);
        }
    }

    handleOpen() {
        console.log("开始心跳.");
        // 在连接建立时执行一些操作，例如发送心跳
        this.startHeartbeat();
    }

    handleMessage(event) {
        const data = JSON.parse(event.data);
        this.callbacks.forEach(callback => {
            callback(data);
        });
    }

    handleClose() {
        console.log("WebSocket connection closed.");
        // 在连接关闭时执行一些操作，例如触发断线重连
        this.reconnect();
    }

    handleError(error) {
        console.error("WebSocket error:", error);
    }

    send(message) {
        if (this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(JSON.stringify(message));
        } else if (this.websocket.readyState === WebSocket.CONNECTING) {
            // 如果连接正在建立中，则等待连接建立后再发送消息
            setTimeout(() => {
                this.send(message);
            }, 1000); // 等待1秒后重试发送消息
        } else {
            console.error("WebSocket connection not open. Attempting to reconnect...");
            this.reconnect();
        }
    }


    onMessage(callback) {
        this.callbacks.push(callback);
    }

    reconnect() {
        console.log("断线重连...");
        // 在这里执行断线重连的逻辑
        setTimeout(() => {
            this.connect();
        }, 3000); // 3秒后尝试重新连接
    }

    startHeartbeat() {
        // 在这里实现心跳逻辑
        this.heartbeatInterval = setInterval(() => {
            this.send({"type":"ping"});
        }, 5000); // 每5秒发送一次心跳
    }

    close() {
        if (this.websocket) {
            clearInterval(this.heartbeatInterval);
            this.websocket.close();
        }
    }
}

// const url = import.meta.env.VITE_WEBSOCKET_API;
// const WebsocketInit = new WebSocketManager(url);

export default WebSocketManager;
