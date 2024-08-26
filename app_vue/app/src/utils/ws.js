import web_socket from './web_socket'
import pinia from '@/store/store'
import useStore from '@/store/index.js'
var store = useStore(pinia)
//var url = (document.location.protocol == 'http:' ? 'ws://' : 'wss://') + document.location.host + '/ws'
var url = "wss://dc-dev.sv56.com/ws"
//导出
// var url1 = (document.location.protocol == 'http:' ? 'ws://' : 'wss://') + document.location.host + '/ws'

// var url2 = (document.location.protocol == 'http:' ? 'ws://' : 'wss://') + document.location.host + '/devws'
// import.meta.env.MODE == 'development' ? url2 : url1
console.log('store.token', store.token)
console.log('store.wsUrl', store.system.wsUrl)

export const myWebSocket = () => {
    console.log('initWebsocket')
    if(store.system.wsUrl) {
        new web_socket(store.system.wsUrl, store.token)
    } else {
        setTimeout(() => {
            myWebSocket()
        }, 500)
    }
}

