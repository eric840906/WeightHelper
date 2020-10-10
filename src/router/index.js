import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/main.vue'),
    children: [
      {
        path: '/foodlist',
        name: 'foodList',
        component: () => import('../views/foodList.vue')
      },
      {
        path: '/intro',
        name: 'Intro',
        component: () => import('../views/intro.vue'),
        children: [
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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
