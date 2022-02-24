/*
 * @Description: Vuex仓库
 * @Author: Li Guangyin
 * @Date: 2022-02-25 00:11:49
 * @LastEditTime: 2022-02-25 00:15:48
 */
import { createStore } from "vuex";
import mutations from './mutations'
import storage from '../utils/storage'

const state = {
  userInfo: '' || storage.getItem('userInfo')  //获取用户信息
}

export default createStore({
  state,
  mutations
})