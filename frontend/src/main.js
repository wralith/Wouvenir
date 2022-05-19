import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import axios from 'redaxios'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(router).use(pinia).mount('#app')
