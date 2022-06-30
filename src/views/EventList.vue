<template>
  <h1>Events For {{ userStore.firstName }}</h1>
  <div class="events">
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >
      <router-link
        v-for="currentPage in totalPages"
        :key="currentPage"
        :to="{ name: 'EventList', query: { page: currentPage } }"
        :class="{ active: page === currentPage }"
        >{{ currentPage }}</router-link
      >
      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import { mapState, mapActions } from 'vuex'
import { useUserStore } from '@/store/UserStore'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  setup() {
    const userStore = useUserStore()

    return {
      userStore,
    }
  },
  props: ['page'],
  // TODO: Fix rendering before state change
  beforeRouteEnter(routeTo, routeFrom, next) {
    return next((comp) => {
      const page = parseInt(routeTo.query.page) || 1
      return comp.$store.dispatch('fetchEvents', page).catch((error) => {
        return {
          name: 'ErrorDisplay',
          params: { error: error },
        }
      })
    })
  },
  beforeRouteUpdate(routeTo) {
    const page = parseInt(routeTo.query.page) || 1
    return this.fetchEvents(page).catch((error) => {
      return {
        name: 'ErrorDisplay',
        params: { error: error },
      }
    })
  },
  computed: {
    ...mapState(['event', 'user']),
    totalPages() {
      return Math.ceil(this.event.totalEvents / 2)
    },
    hasNextPage() {
      return this.page < this.totalPages
    },
  },
  methods: {
    ...mapActions(['fetchEvents']),
  },
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
.pagination a.active {
  font-weight: bold;
}
</style>
