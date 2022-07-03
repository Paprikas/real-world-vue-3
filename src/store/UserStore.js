import { defineStore } from 'pinia'
import axios from 'axios'
import EventService from '@/services/EventService'

export const useUserStore = defineStore('UserStore', {
  state() {
    return {
      user: null,
    }
  },
  getters: {
    firstName() {
      return this.user.name.split(' ')[0]
    },
  },
  actions: {
    register(credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({ data }) => {
          this.user = data
          localStorage.setItem('user', JSON.stringify(data))
          // TODO: Find a better way to set Auth token
          EventService.apiClient.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${data.token}`
        })
    },
  },
})
