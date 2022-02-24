/*
 * @Description: 用户API
 * @Author: Li Guangyin
 * @Date: 2022-02-24 23:53:26
 * @LastEditTime: 2022-02-25 00:05:49
 */
import request from '../utils/request'

export function login(params){
  return request({
    url: '/user/login',
    data: params,
    method:'post',
    mock: true
  })
}
