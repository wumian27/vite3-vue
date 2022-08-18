import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'element-plus/dist/index.css'
import 'element-plus/es/components/message/style/css'
console.log(import.meta.env.VITE_API_URL, defName.name)
console.log(process.env.appKey)

createApp(App).use(router).use(store).mount('#app')
