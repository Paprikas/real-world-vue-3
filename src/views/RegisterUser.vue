<template>
  <div>
    <form @submit.prevent="register">
      <BaseInput v-model="name" label="Name" type="text" />
      <BaseInput v-model="email" label="Email" type="email" />
      <BaseInput v-model="password" label="Password" type="password" />
      <BaseButton class="-fill-gradient" type="submit">Submit</BaseButton>
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
    },
  },
  computed: {},
}
</script>

<style scoped></style>
