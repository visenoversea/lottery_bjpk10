import { createRouter, createWebHashHistory } from 'vue-router'
import constRouters from './constRouters'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constRouters
})

router.beforeEach((to, from, next) => {
  if (to.name == from.name) {
    //解决刷新问题
    Object.assign(from, to)
    next('/Refresh')
  } else {
    next()
  }
})

export default router
