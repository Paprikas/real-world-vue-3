import { defineStore } from 'pinia'

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
})
