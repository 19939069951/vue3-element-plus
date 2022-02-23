import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
console.log(import.meta.env)
const app = createApp(App)
app.use(router).use(ElementPlus).mount('#app')
