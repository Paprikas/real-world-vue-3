import { useUserStore } from '@/store/UserStore'
const userStore = useUserStore()

export const authComputed = {
  loggedIn() {
    return userStore.loggedIn
  },
}
