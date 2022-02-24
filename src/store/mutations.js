/*
 * @Description: mutations
 * @Author: Li Guangyin
 * @Date: 2022-02-25 00:12:16
 * @LastEditTime: 2022-02-25 00:19:06
 */
import storage from "../utils/storage";

export default{
  saveUserInfo(state,userInfo){
    state.userInfo = userInfo
    storage.setItem('userInfo',userInfo)
  }
} 