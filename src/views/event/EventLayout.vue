<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>

<script>
import { useEventStore } from '@/store/EventStore'

export default {
  setup() {
    const eventStore = useEventStore()

    return {
      eventStore,
    }
  },
  computed: {
    event() {
      return this.eventStore.currentEvent
    },
  },
}
</script>
