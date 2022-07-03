import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'appliciation/json',
    'Content-Type': 'application/json',
  },
})

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
