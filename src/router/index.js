/*
 * @Description: 
 * @Author: Li Guangyin
 * @Date: 2022-02-23 18:07:38
 * @LastEditTime: 2022-02-26 02:54:19
 */
import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Login from '../components/Login.vue'
const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: { title: '首页' },
    redirect: '/welcome',
    children:[
      {
        path: 'welcome',
        path: '/welcome',
        meta:{title: '欢迎'},
        component: Welcome
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta:{
      title: '登录'
    },
    component: ()=>import('../views/login/Login.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router