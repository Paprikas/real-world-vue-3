<template>
  <p>Register for Event here</p>
  <button @click="register">Register me</button>
</template>

<script>
export default {
  props: ['event'],
  inject: ['GStore'],
  methods: {
    register() {
      this.GStore.flashMessage =
        "You're successfully registered for " + this.event.title

      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
      // this.$router.replace will not save in history
      // this.$router.go(1) - Browser forward button
      // this.$router.go(-1) - Browser back button
      this.$router.push({
        name: 'EventDetails',
        // Pupulated by default because it's nested view
        // params: { id: this.event.id },
      })
    },
  },
}
</script>
