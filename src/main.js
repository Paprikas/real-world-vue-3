import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Store from './store'
import 'nprogress/nprogress.css'

createApp(App).use(router).use(Store).use(createPinia()).mount('#app')
