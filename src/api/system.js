/*
 * @Description: 系统管理
 * @Author: Li Guangyin
 * @Date: 2022-02-28 16:54:24
 * @LastEditTime: 2022-02-28 16:56:06
 */
import request from '@/utils/request'
// 获取用户列表
export function userList(){
  return request({
    url: '/user/list',
    method: 'get',
    mock: true
  })
}
