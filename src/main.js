/*
 * @Description: 
 * @Author: Li Guangyin
 * @Date: 2022-02-23 13:44:46
 * @LastEditTime: 2022-02-25 00:19:57
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
console.log(import.meta.env)
const app = createApp(App)
app.use(router).use(store).use(ElementPlus).mount('#app')
