/*
 * @Description: 
 * @Author: Li Guangyin
 * @Date: 2022-02-23 13:44:46
 * @LastEditTime: 2022-02-26 18:33:45
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { pathToFileURL } from 'url'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@':path.resolve(__dirname, './src')
    }
  },
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
