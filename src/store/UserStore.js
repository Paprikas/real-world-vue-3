import { defineStore } from 'pinia'
import axios from 'axios'
import EventService from '@/services/EventService'

export const useUserStore = () => {
  const useColdUserStore = defineStore('UserStore', {
    state() {
      return {
        user: null,
      }
    },
    getters: {
      firstName() {
        return this.user.name.split(' ')[0]
      },
      loggedIn() {
        return !!this.user
      },
    },
    actions: {
      setUserData(data) {
        this.user = data
        localStorage.setItem('user', JSON.stringify(data))
        // TODO: Find a better way to set Auth token
        EventService.apiClient.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.token}`
      },
      register(credentials) {
        return axios
          .post('//localhost:3000/register', credentials)
          .then(({ data }) => {
            this.setUserData(data)
          })
      },
      login(credentials) {
        return axios
          .post('//localhost:3000/login', credentials)
          .then(({ data }) => {
            this.setUserData(data)
          })
      },
      logout() {
        localStorage.removeItem('user')
        location.reload()
        // Use location.reload() instead of manually overriding data
        // this.user = null
        // EventService.apiClient.defaults.headers.common['Authorization'] = null
      },
    },
  })

  const userStore = useColdUserStore()
  const userString = localStorage.getItem('user')
  if (userString) {
    const userData = JSON.parse(userString)
    userStore.setUserData(userData)
  }

  return userStore
}
