<template>
  <div class="about">
    <h1>A site for Events</h1>
    <BaseButton @click="toggleModal" type="button"
      >Open</BaseButton
    >

    <transition name="fade">
      <div v-if="isOpen" class="modal">
        <BaseButton @click="toggleModal" type="button"
          >Close</BaseButton
        >
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
