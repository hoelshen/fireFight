// https://vuex.vuejs.org/zh-cn/intro.html make sure to call Vue.use(Vuex) if
// using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    openid: '',
    targetName: '',
    userInfo: {},
    createdMail: {},
    launchOpts: {}
  },
  mutations: {
    setTargetName: (state, payload) => {
      state.targetName = payload;
    },
    setOpenid: (state, payload) => {
      state.openid = payload;
    },
    setUserInfo: (state, payload) => {
      state.userInfo = payload;
    },
    setCreatedMail: (state, payload) => {
      state.createdMail = payload;
    },
    setLaunchOpts: (state, payload) => {
      state.launchOpts = payload;
    },
  }
})

export default store
