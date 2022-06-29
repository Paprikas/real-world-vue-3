import { createStore } from 'vuex'
import user from './modules/user.js'
import event from './modules/event.js'
import flash from './modules/flash.js'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    event,
    flash,
  },
})
