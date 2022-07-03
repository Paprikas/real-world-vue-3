import { defineStore } from 'pinia'
import EventService from '@/services/EventService'

export const useEventStore = defineStore('EventStore', {
  state() {
    return {
      events: [],
      currentEvent: {},
      totalEvents: 0,
    }
  },
  getters: {
    // Arrow function example
    numberOfEvents: (state) => state.events.length,
  },
  actions: {
    fetchEvents(page) {
      return EventService.getEvents(2, page)
        .then((response) => {
          this.events = response.data.events.events
          // TODO: Retrieve events count
          // this.totalEvents = response.headers['x-total-count']
        })
        .catch((error) => {
          throw error
        })
    },
    createEvent(event) {
      return EventService.postEvent(event)
        .then(() => {
          this.events.push(event)
        })
        .catch((error) => {
          throw error
        })
    },
    fetchEvent(id) {
      // TODO: Optimization don't work without promises
      // const existingEvent = this.events.find((event) => event.id === id)
      // if (existingEvent) {
      //   this.currentEvent = existingEvent
      // } else {
      return EventService.getEvent(id)
        .then((response) => {
          this.currentEvent = response.data
        })
        .catch((error) => {
          throw error
        })
      // }
    },
  },
})
