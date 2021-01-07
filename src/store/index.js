import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    foods: null,
    token: null,
    target: null,
    user: null,
    image: null,
    loading: false
  },
  actions: {
    async getFood (context) {
      const response = await axios({
        url: `${process.env.VUE_APP_APIPATH}/api/foodlist`,
        method: 'get'
      })
      context.commit('GET_FOOD', response.data)
    },
    getUser (context) {
      axios({
        url: `${process.env.VUE_APP_APIPATH}/api/auth/getuser`,
        method: 'post',
        headers: {
          'auth-token': this.state.token
        }
      }).then(response => context.commit('GET_USER_INFO', response.data))
        .catch(error => {
          if (error.response.data === 'Invalid token, please relog') { context.commit('LOGOUT') }
        })
    },
    getAvatar (context) {
      context.commit('LOADING', true)
      axios({
        url: `${process.env.VUE_APP_APIPATH}/api/auth/avatar`,
        method: 'get',
        headers: {
          'auth-token': this.state.token
        }
      }).then(response => {
        context.commit('GET_USER_PIC', (btoa(response.data)))
      }).then(() => context.commit('LOADING', false))
        .catch(error => {
          if (error.response.data === 'Invalid token, please relog') { context.commit('LOGOUT') }
        })
    },
    getTarget (context) {
      axios({
        url: `${process.env.VUE_APP_APIPATH}/api/target`,
        methods: 'get',
        headers: {
          'auth-token': this.state.token
        }
      }).then(response => {
        localStorage.setItem('target', JSON.stringify(response.data.target))
        context.commit('SET_TARGET', response.data.target)
      }).catch(error => console.log(error.response))
    }
  },
  mutations: {
    LOADING (state, response) {
      state.loading = response
    },
    SET_TARGET (state, response) {
      state.target = response
    },
    GET_FOOD (state, response) {
      state.foods = response
    },
    GET_USER_PIC (state, response) {
      state.image = `data:image/png;base64, ${response}`
    },
    LOGIN_SUCCESS (state, response) {
      state.token = response.data
    },
    GET_USER_INFO (state, response) {
      state.user = response
    },
    LOGOUT (state, response) {
      state.token = null
      state.user = null
      state.image = null
    },
    CHECK_USER (state, response) {
      state.token = response
    }
  },
  modules: {
  }
})
