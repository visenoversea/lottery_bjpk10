import { defineStore } from 'pinia'
import router from '@/router/index'

let system=JSON.parse(window.localStorage.getItem('system'))
if(!system){
  system={
    Version: "",
    WebTitle: "",
    GoogleAuth: "1",
    RegMode: "1",
    Lang: ""
  }
}
export default defineStore('store', {
  state: () => ({
    token: localStorage.getItem('token'),
    audio: {
      play:()=>{},
      pause:()=>{},
    },
    system:system,
    user:{},
    menuList:[],
    apiList:[],
    translate: {
      show: false,
      type: 0,
      content: '',
    }
  }),
  actions: {
    async signOut() {
      localStorage.removeItem('token')
      this.token = null
      //重置路由
      this.menuList.forEach(item => {
        router.removeRoute(item.name)
      })
      router.removeRoute('root')
      //跳转登录页
      this.menuList = []
      this.user = {}
      //退出登录
      await router.replace('/Login')
    },
    setTranslate(data) {
      this.translate.type = data.type ? data.type : 0;
      this.translate.content = data.content
      this.translate.show = true
    },
    setToken(token) {
      localStorage.setItem('token', token)
      this.token = token
    },
    setAudio(audio) {
      this.audio = audio
    },
    //权限验证
    auth(name) {
      return this.apiList.includes(name)
    }
  },
})