import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'
import 'bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTimes, faExclamationCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import animated from 'animate.css'
import store from './store'

Vue.use(VModal, { dialog: true })
Vue.use(animated)
Vue.use(VueAxios, axios)

library.add(faPlus, faTimes, faExclamationCircle, faCircleNotch)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach(async (to, from, next) => {
  // console.log('to', to, 'from', from, 'next', next)
  if (to.meta.requiresAuth) { // 判斷頁面是否需要驗證
    try {
      const api = `${process.env.VUE_APP_APIPATH}/api/check` // 用API抓使用者資料確認登入權限
      const response = await axios({
        url: api,
        method: 'post',
        headers: {
          'auth-token': store.state.token
        }
      })
      if (response.data === 'success') {
        next()
      }
    } catch (error) {
      store.state.token = null
      next({
        path: '/error'
      })
    }
  } else { // 不需要驗證的話直接通過
    next()
  }
})
