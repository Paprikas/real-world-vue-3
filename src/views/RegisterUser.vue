<template>
  <div>
    <form @submit.prevent="register">
      <BaseInput v-model="name" label="Name" type="text" />
      <BaseInput v-model="email" label="Email" type="email" />
      <BaseInput v-model="password" label="Password" type="password" />
      <ul v-if="errors">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
      <BaseButton type="submit">Submit</BaseButton>

      <router-link :to="{ name: 'LoginUser' }"
        >Already have an account? Login here!</router-link
      >
    </form>
  </div>
</template>

<script>
import { useUserStore } from '@/store/UserStore'

export default {
  setup() {
    const userStore = useUserStore()

    return {
      userStore,
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errors: null,
    }
  },
  props: {},
  methods: {
    register() {
      this.userStore
        .register({
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'EventList' })
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
    },
  },
  computed: {},
}
</script>

<style scoped></style>
