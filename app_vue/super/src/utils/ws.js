import web_socket from "@/utils/web_socket";
import useStore from '@/stores/index'
const store = useStore()
const ws = new web_socket((document.location.protocol == 'http:' ? 'ws://' : 'wss://') + document.location.host + '/ws', store.token)
export default ws