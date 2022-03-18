/*
 * @Description: 用户API
 * @Author: Li Guangyin
 * @Date: 2022-02-24 23:53:26
 * @LastEditTime: 2022-02-28 16:54:16
 */
import request from '@/utils/request'
// 用户登录
export function login(params){
  return request({
    url: '/user/login',
    data: params,
    method:'post',
    mock: false
  })
}
// 获取用户通知数量
export function notice(){
  return request({
    url: '/leave/count',
    method: 'get',
    mock: true
  })
}
// 获取菜单tree
export function menuList(){
  return request({
    url: '/menu/list',
    method: 'get',
    mock: true
  })
}
