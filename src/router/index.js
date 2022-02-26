/*
 * @Description: 
 * @Author: Li Guangyin
 * @Date: 2022-02-23 18:07:38
 * @LastEditTime: 2022-02-26 21:26:07
 */
import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: { title: '首页' },
    redirect: '/welcome',
    children:[
      {
        name: 'welcome',
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
  },
  {
    name: 'system',
    path: '/system',
    component: Home,
    meta:{
      title: '系统管理'
    },
    children:[
      {
        name: 'Users',
        path: 'user',
        meth:{title: '用户管理'},
        component:()=>import('../views/system/User.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router