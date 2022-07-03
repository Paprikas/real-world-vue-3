<template>
  <div id="flashMessage" v-if="flashMessage">
    {{ flashMessage }}
  </div>
</template>

<script>
import { useFlashStore } from '@/store/FlashStore'

export default {
  setup() {
    const flashStore = useFlashStore()

    return {
      flashStore,
    }
  },
  props: {},
  methods: {},
  computed: {
    flashMessage() {
      return this.flashStore.flashMessage
    },
  },
}
</script>

<style scoped></style>
