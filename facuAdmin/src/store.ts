import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alert: {
      show: false,
      title: null,
      msg: null,
      type: null
    }
  },
  mutations: {
    successAlert (state: any, conf: { title: string, msg: string }): void {
      state.alert.show = true
      state.alert.title = conf.title
      state.alert.msg = conf.msg
      state.alert.type = 'success'
      setTimeout(() => {
        state.alert.show = false
        state.alert.title = null
        state.alert.msg = null
        state.alert.type = null
      }, 3000)
    },
    errorAlert (state: any, conf: { title?: string, msg: string }): void {
      state.alert.show = true
      state.alert.title = (conf.title) ? conf.title : 'Error'
      state.alert.msg = conf.msg
      state.alert.type = 'error'
      setTimeout(() => {
        state.alert.show = false
        state.alert.title = null
        state.alert.msg = null
        state.alert.type = null
      }, 8000)
    },
    warningAlert (state: any, conf: { title: string, msg: string }): void {
      state.alert.show = true
      state.alert.title = conf.title
      state.alert.msg = conf.msg
      state.alert.type = 'warning'
      setTimeout(() => {
        state.alert.show = false
        state.alert.title = null
        state.alert.msg = null
        state.alert.type = null
      }, 5000)
    }
  },
  actions: {

  }
})
