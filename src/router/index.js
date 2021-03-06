import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
  // 預防使用者因為輸入不存在的路徑跑到空白頁面
    path: '*',
    redirect: '/intro'
  },
  {
    path: '/',
    name: 'Intro',
    component: () => import('../views/intro.vue'),
    children: [
      {
        path: '/startform',
        name: 'startForm',
        component: () => import('../components/forms/startForm.vue')
      },
      {
        path: '/askform1',
        name: 'askFrom1',
        component: () => import('../components/forms/askForm1.vue')
      },
      {
        path: '/askform2',
        name: 'askFrom2',
        component: () => import('../components/forms/askForm2.vue')
      },
      {
        path: '/knowform',
        name: 'knowForm',
        component: () => import('../components/forms/knowForm.vue')
      },
      {
        path: '/tdeeform',
        name: 'tdeeForm',
        component: () => import('../components/forms/tdeeForm.vue')
      },
      {
        path: '/finalform',
        name: 'finalForm',
        component: () => import('../components/forms/finalForm.vue')
      },
      {
        path: '/unknowform',
        name: 'unknowForm',
        component: () => import('../components/forms/unknowForm.vue')
      }
    ]
  },
  {
    path: '/foodlist',
    name: 'foodList',
    component: () => import('../views/foodList.vue')
  },
  {
    path: '/analyze',
    name: 'analyze',
    meta: { requiresAuth: true },
    component: () => import('../views/analyze.vue')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/relog.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
