import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    foods: null,
    token: null
  },
  actions: {
    async getFood (context) {
      const response = await axios({
        url: `${process.env.VUE_APP_APIPATH}/api/foodlist`,
        method: 'get'
      })
      context.commit('GET_FOOD', response.data)
    }
  },
  mutations: {
    GET_FOOD (state, response) {
      state.foods = response
    },
    LOGIN_SUCCESS (state, response) {
      state.token = response.data
    },
    LOGOUT (state, response) {
      state.token = null
    },
    CHECK_USER (state, response) {
      state.token = response
    }
  },
  modules: {
  }
})
