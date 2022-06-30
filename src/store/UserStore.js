import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
  state() {
    return {
      id: 123,
      name: 'Jesus Christ',
    }
  },
  getters: {
    firstName() {
      return this.name.split(' ')[0]
    },
  },
})
