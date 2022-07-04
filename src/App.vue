<template>
  <AppNav />
  <div class="page">
    <FlashMessage />

    <router-view />
    <!--    TODO: Learn how to combine page transition with component transition-->
    <!--    This code holds per page transition effect-->
    <!--    <router-view v-slot="{ Component }">-->
    <!--      <transition name="slide-fade" mode="out-in"-->
    <!--        ><component :is="Component"-->
    <!--      /></transition>-->
    <!--    </router-view>-->

    <p>Mouse position is {{ x }} {{ y }}</p>
  </div>
</template>

<script>
import { useMouse } from '@/composables/mouse'
import { useTitle } from '@vueuse/core'
import AppNav from '@/components/AppNav'
import FlashMessage from '@/components/FlashMessage'

export default {
  components: { AppNav, FlashMessage },
  setup() {
    const { x, y } = useMouse()
    const title = useTitle('Event List', { titleTemplate: '%s | Event Maker' })

    return {
      y,
      x,
      title,
    }
  },
}
</script>

<style lang="scss">
@import 'assets/global.scss';
.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 56px);
}
</style>
