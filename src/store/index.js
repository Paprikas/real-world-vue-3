// import { reactive } from 'vue'
//
// export default reactive({ flashMessage: '', event: null })

import { createStore } from 'vuex'
import EventService from '@/services/EventService'

export default createStore({
  state: {
    user: 'Jesus Christ',
    events: [],
    event: {},
    flashMessage: '',
    totalEvents: 0,
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_FLASH_MESSAGE(state, message) {
      state.flashMessage = message
    },
    SET_TOTAL_EVENTS(state, count) {
      state.totalEvents = count
    },
  },
  actions: {
    setFlashMessage({ commit }, message) {
      commit('SET_FLASH_MESSAGE', message)
    },
    createEvent({ commit }, event) {
      EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchEvents({ commit }, page) {
      return EventService.getEvents(2, page).then((response) => {
        commit('SET_EVENTS', response.data)
        commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
      })
    },
    fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find((event) => event.id === id)

      if (existingEvent) {
        commit('SET_EVENT', existingEvent)
      } else {
        EventService.getEvent(id)
          .then((response) => {
            commit('SET_EVENT', response.data)
          })
          .catch((error) => {
            console.log(error)
            if (error.response && error.response.status == 404) {
              return {
                name: '404Resource',
                params: {
                  resource: 'event',
                },
              }
            } else {
              return {
                name: 'NetworkError',
              }
            }
          })
      }
    },
  },
  modules: {},
})
