import { createRouter, createWebHashHistory  } from 'vue-router'
import MainLayout from '../components/MainLayout.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      redirect: '/main',
      children: [
        { path: '/main', name: 'main', component: () => import(/* webpackChunkName: "main" */'@/views/mainview/MainView.vue'), meta: { index: 0, name: '首页' } },
      ]
    },
   
    {
      path: '/refresh',
      name: 'refresh', 
      component: () => import( '@/views/refresh/Refresh.vue'),
      meta: { index: 24 }
    },
  ]
})


router.beforeEach((to, from, next) => {
  if(to.name == from.name) {
    console.log('=================', to, from)
    Object.assign(from, to)
    next({ name: 'refresh' })
  }else {
    next()
  }
})


export default router
