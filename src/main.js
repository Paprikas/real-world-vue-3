import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import GStore from './store'
import Store from './store'
import 'nprogress/nprogress.css'

// createApp(App).use(router).provide('GStore', GStore).mount('#app')
createApp(App).use(router).use(Store).mount('#app')
