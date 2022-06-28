<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  data() {
    return {
      events: [
        {
          id: 1,
          category: 'Cate',
          title: 'Some title',
          description: 'Description',
          location: '',
          time: '16pm',
          date: 'January 1st',
          petsAllowed: true,
          organizer: 'Org',
        },
        {
          id: 2,
          category: 'Cate',
          title: 'Some title',
          description: 'Description',
          location: '',
          time: '16pm',
          date: 'January 1st',
          petsAllowed: true,
          organizer: 'Org',
        },
      ],
    }
  },
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
