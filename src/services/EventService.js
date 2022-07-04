import axios from 'axios'
import { useUserStore } from '@/store/UserStore'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'appliciation/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const userStore = useUserStore()

    if (error.response.status === 401) {
      userStore.logout()
    }
    return Promise.reject(error)
  }
)

export default {
  getEvents(perPage, page) {
    return apiClient.get('/dashboard?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/dashboard/' + id)
  },
  postEvent(event) {
    return apiClient.post('/dashboard', event)
  },
  apiClient,
}
