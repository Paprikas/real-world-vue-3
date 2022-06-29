export default {
  namespaced: true,
  state: {
    flashMessage: '',
  },
  mutations: {
    SET_FLASH_MESSAGE(state, message) {
      state.flashMessage = message
    },
  },
  actions: {
    setFlashMessage({ commit }, message) {
      commit('SET_FLASH_MESSAGE', message)
    },
  },
}
