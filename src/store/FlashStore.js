import { defineStore } from 'pinia'

export const useFlashStore = defineStore('FlashStore', {
  state() {
    return {
      flashMessage: '',
    }
  },
  actions: {
    setFlashMessage(message) {
      this.flashMessage = message
    },
  },
})
