export default [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login/IndexView.vue')
  },
  {
    path: '/Refresh',
    name: 'Refresh',
    component: () => import('@/views/Refresh/IndexView.vue')
  },
  // {
  //   path: '/Demo',
  //   name: 'Demo',
  //   component: () => import('@/views/Demo/IndexView.vue')
  // },
  {
    path: '/:pathMatch(.*)*',
    name: 'All',
    component: () => import('@/views/All/IndexView.vue')
  }
]

