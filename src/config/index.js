/*
 * @Description: 项目配置
 * @Author: Li Guangyin
 * @Date: 2022-02-23 19:34:32
 * @LastEditTime: 2022-02-23 21:26:09
 */
/** 环境配置封装 */
const env = import.meta.env.MODE || 'prod'
const envConfig = {
  dev:{
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/1881033b5eba2776ff97cf513af2c17d/api'
  },
  test:{
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/1881033b5eba2776ff97cf513af2c17d/api'
  },
  prod:{
    baseApi: '/',
    mockApi: ''
  }
}
export default{
  env,
  namespace: 'manager',
  mock: true,
  ...envConfig[env]
}