<template>
  <nav>
    <router-link :to="{ name: 'EventList' }">Events</router-link> |
    <router-link :to="{ name: 'AboutView' }">About</router-link> |
    <router-link :to="{ name: 'EventCreate' }">Create Event</router-link>|
    <router-link :to="{ name: 'ListView' }">List</router-link>|
    <router-link :to="{ name: 'DrawerView' }">Drawer</router-link>|
    <router-link :to="{ name: 'CardsView' }">Cards</router-link>|
    <router-link :to="{ name: 'SimpleView' }">Simple</router-link>|
    <router-link :to="{ name: 'StaggerView' }">Stagger</router-link>|
    <router-link :to="{ name: 'StateView' }">State</router-link>|
    <router-link :to="{ name: 'TimelineView' }">Timeline</router-link>|
    <router-link :to="{ name: 'MasterView' }">Master</router-link>
    <div v-if="!loggedIn">
      | <router-link :to="{ name: 'RegisterUser' }">Register</router-link>|
      <router-link :to="{ name: 'LoginUser' }">Sign in</router-link>
    </div>
    <BaseButton v-else class="logoutButton" type="button" @click="logout"
      >Logout</BaseButton
    >
  </nav>
</template>

<script>
import { useUserStore } from '@/store/UserStore'
import { authComputed } from '@/store/helpers'
export default {
  setup() {
    const userStore = useUserStore()

    return {
      userStore,
    }
  },
  computed: {
    ...authComputed,
  },
  methods: {
    logout() {
      this.userStore.logout()
    },
  },
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.2em 1em;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
}

.nav-welcome {
  margin-left: auto;
  margin-right: 1rem;
  color: white;
}

a {
  font-weight: bold;
  color: #2c3e50;
  margin: auto 0.8em auto 0.4em;
  text-decoration: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

.router-link-exact-active {
  color: white;
  border-bottom: 2px solid #fff;
}

button,
.button {
  margin-left: auto;
  background: white;
  text-decoration: none;
  color: #2c3e50;

  &.router-link-active {
    color: #2c3e50;
  }
}

.logoutButton {
  cursor: pointer;
}

.nav-welcome + button {
  margin-left: 0;
}
</style>
