import { useUserStore } from '@/store/UserStore'

export const authComputed = {
  loggedIn() {
    const userStore = useUserStore()
    return userStore.loggedIn
  },
}
