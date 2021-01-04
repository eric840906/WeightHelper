import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    foods: null,
    token: null,
    target: null,
    user: null
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
        .catch(error => console.log(error))
    }
  },
  mutations: {
    GET_FOOD (state, response) {
      state.foods = response
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
    },
    CHECK_USER (state, response) {
      state.token = response
    }
  },
  modules: {
  }
})
