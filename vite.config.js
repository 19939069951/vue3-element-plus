/*
 * @Description: 
 * @Author: Li Guangyin
 * @Date: 2022-02-23 13:44:46
 * @LastEditTime: 2022-02-25 00:05:11
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: 9999,
    host: 'localhost',
    // proxy:{
    //   '/api': '/'
    // }
  },
  plugins: [vue()]
})
