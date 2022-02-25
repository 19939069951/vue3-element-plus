/*
 * @Description: 
 * @Author: Li Guangyin
 * @Date: 2022-02-23 13:44:46
 * @LastEditTime: 2022-02-25 22:01:52
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: 9999,
    host: 'localhost',
    proxy:{
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  plugins: [vue()]
})
