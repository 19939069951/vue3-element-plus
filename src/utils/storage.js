/*
 * @Description: 二次封装缓存
 * @Author: Li Guangyin
 * @Date: 2022-02-23 21:13:55
 * @LastEditTime: 2022-02-23 21:31:07
 */
import config from '../config/index'
export default {
  setItem(key,val){
    let localStorage = this.getStorage() 
    localStorage[key] = val
    window.localStorage.setItem(config.namespace,JSON.stringify(localStorage))
  },
  getItem(key){
    return this.getStorage[key]
  },
  clearItem(key){
    let localStorage = this.getStorage()
    delete localStorage[key]
    window.localStorage.setItem(config.namespace,JSON.stringify(localStorage))
  },
  clearAll(){
    window.localStorage.clear()
  },
  getStorage(){
    return JSON.parse(window.localStorage.getItem(config.namespace) || "{}")
  }
}