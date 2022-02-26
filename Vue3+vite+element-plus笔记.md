```shell
添加代理：
PS > git config --global http.proxy
PS> git config --global --unset http.proxy
```

### 1. 项目准备

##### 1.1 全局安装`vue`脚手架

```shell
npm install @vue/cli -g
#or 
cnpm install @vue/cli -g
#or
yarn global add @vue/cli
```

官方文档:
[https://cli.vuejs.org/zh/guide](https://cli.vuejs.org/zh/guide)

> 如果你安装的旧版本的vue-cli，需要提前卸载`npm uninstall vue-cli -g`  或者 `yarn global remove vue-cli`,然后重新安装`@vue/cli`

创建项目:

> `vue create name`  

通过`vite`创建项目

官方文档:

[http://cn.vitejs.dev/]()

创建项目:

```shell
npm init @vitejs/app
#or
cnpm init @vitejs/app
#or
yarn create @vitejs/app
```

安装项目所需插件

```shell
#安装项目生产依赖
yarn add vue-router@next vuex@next element-plus -S
#安装项目开发依赖
yarn add sass -D

#or
#安装项目生产依赖
npm install vue-router@next vuex@next element-plus -S
#安装项目开发依赖
npm install sass -D
```

`vscode`插件安装

```shell
Eslint
Vetur
TypeScript
Prettier
```

制定目录结构

```shell
dist
public
node_module
src
	api
	assets
	config
	components
	router
	store
	utils
	views
	App.vue
	main.js
.gitignore
.env.dev
.env.test
.env.prod
index.html
package.json
package-lock.json
vite.config.js
README.md
```

##### 1.2 路由跳转&配置`element-plus`

路由跳转的三种方式

router-link

```js
<router-link to='/login'>去登陆</router-link>
```

传统跳转

```vue
<template>
  <div>登录页面</div>
  <el-button @click="back">回首页</el-button>
</template>
<script>
export default{
  name: 'login',
  methods:{
    back(){
      this.$router.push('/welcome')
    }
  }
}
</script>
```

`Composition API`跳转

```vue
<script setup>
	import { useRouter} from 'vue-router'
  const router = useRouter()
  const back = ()=>{
    router.push('/welcome')
  }
</script>
```

配置`element-plus`

```shell
#全局配置
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
```

##### 1.3 封装request请求

```js
#在utils下新建request.js
/**
 * axios二次封装
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router/index'
import config from '../config/index'
// 创建axios实例对象,添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000,
})

// 请求拦截
service.interceptors.request.use((req)=>{
  // todo
  const headers = req.headers;
  if(!headers.Authorize){
    headers.Authorize = 'Jack'
  }
  return req;
})

// 响应拦截
service.interceptors.response.use((res)=>{
  const {code,data,msg} = res.data
  if(code === 200){
    return data
  } else if(code === 40001){
    ElMessage.error('token 已过期,请重新登录')
    setTimeout(()=>{
      router.push('/login')
    },3000)
    return Promise.reject('token 已过期,请重新登录')
  } else {
    ElMessage.error('网络异常!')
    return Promise.reject('网络异常!')
  }
})
/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
function request(options){
  options.method = options.method || 'get'
  if(options.method.toLowerCase() === 'get'){
    options.params = options.data;
  }
  // 确保线上调的地址是正确的地址,而不是mock地址
  if(config.env === 'prod'){
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi:config.baseApi
  }
  return service(options)
}
export default request
#使用方式一
	这种方法需要将request在main.js挂载到全局
	app.config.globalProperties.$request = request
	this.$request({
    method: 'get',
    url: '/login',
    data:{
      name: 'jack'
    }
  }).then(res=>{
    console.log(res)
  })
	// 方式一扩展
	this.$request.get('/login',{name:'jack'},{mock:true,loading:true})
	注:方式一扩展的这种需要增加以下代码:
		['get','post','put','delete','patch'].forEach((item)=>{
      request[item]= (url,data,options)=>{
        return request({
          url,
          data,
          method:item,
          ...options
        })
      }
    })
#方式二: 统一api封装
import request from '../utils/index'
export function getLogin(data){
  return request({
    url: '/login',
    method: 'get',
    data
  })
}
```

##### 1.4 `localStorage` 和 `sessionStorage`封装

```js
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
// 挂载到全局
app.config.globalProperties.$storage = storage
```

##### 1.5 样式重置

1. css样式重置文件

```css
# reset.css 
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  margin: 0;
  padding: 0;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
```

2. scss样式重置

```scss
*{
  margin: 0;
  padding: 0;
}
html body{
  height: 100%;
  width: 100%;
}
*:not([class^='el-']){
  box-sizing: border-box;
}
.white{
  background-color: #fff;
}
a{
  text-decoration: none;
}
.gray{
  background-color: #eef0f3;
}
.mr10{
  margin-right: 10px;
}
.mr20{
  margin-right: 20px;
}
.mb{
  margin-bottom: 20px;
}
.m-lr{
  margin-left: 10px;
  margin-right: 10px;
}
.p20{
  padding: 20px;
}
.pl20{
  padding-left: 20px;
}
.text-right{
  text-align: right;
}
.fr{
  float: right;
}
.flex{
  display: flex;
}
.flex-between{
  display: flex;
  justify-content: space-between;
}
.flex-center{
  display: flex;
  justify-content: center;
}
.tips{
  margin-left: 15px;
  color: #787878;
}

// 公共样式
.query-form{
  padding: 22px 20px 0;
  background-color: #fff;
  border-radius: 5px;
}
.base-table{
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background: #fff;
  .action{
    padding: 20px;
    border-radius: 5px 5px 0 0;
    background: #fff;
    border-bottom: 1px solid #ece8e8;
  }
  .pagination{
    padding: 10px;
    text-align: right;
  }
}
```

##### 1.6 `koa2`项目初始化操作

> 通常我们可以通过借助于脚手架,快速创建一个koa2项目,当然也可以自己从头搭建;脚手架会帮助我们提前搭建好基本的架子

1. `koa-generator`快速生成`koa`服务的脚手架工具

​	全局安装脚手架工具

```shell
npm install -g koa-generator
#or
cnpm install -g koa-generator
#or
yarn global add koa-generator
```

​	进入项目文件夹目录,执行生成命令

```shell
#koa2 + 项目名称
koa2 manager-server
```

> 如果无法使用koa2命令,说明需要配置环境变量,window用户,需要找到koa-generator的安装目录,找到里面bin目录下面的koa2命令文件,然后配置到环境变量中;mac用户可直接创建软连接,指向到/usr/local/bin中,如: ln -s /User/jack/.config/yarn/global/node_modules/koa-generator/bin/koa2 /usr/local/bin/koa2

​	安装依赖

```shell
npm install 
#or
cnpm install
#or
yarn
```

​	启动服务

```shell
yarn start
#or
node .bin/www
#默认的访问地址是localhost:3000/
```

2. `koa2-generator`创建的koa2框架目录

```js
|--	koa-server
		|-- app.js									#根入口
    |-- package-lock.json		
		|--	package.json						#项目依赖包文件
    |-- bin
				|-- www									#运行启动文件
    |--	public									#公共资源
    		|--	images
				|--	javascripts
				|--	stylesheets
						|--	style.css
		|-- routes
				|--	index.js						#定义了localhost:3000/之下的路由
				|--	user.js							#定义了loca:3000/user/之下的路由
		|--	views										#视图Pug是一款HTML引擎模板,专门为node.js开发
				|-- erroe.pug
				|--	index.pug
				|--	layout.pug
```

3. 安装log4js日志打印文件

```shell
# 安装日志打印包
npm install log4js -S   // -D 开发环境  -S  生产环境
# 使用log4js
const log4js = require('log4js')
const log = log4js.getLogger()
log.level = 'debug'
log.debug('some debug messages')

#log4js的封装
const log4js = require('log4js')
const levels = {
  'trace': log4js.levels.TRACE,
  'debug': log4js.levels.DEBUG,
  'info': log4js.levels.INFO,
  'warn': log4js.levels.WARN,
  'error': log4js.levels.ERROR,
  'fatal': log4js.levels.FATAL,
}
log4js.configure({
  appenders:{
    console:{type: 'console'},
    info:{
      type: 'file',
      filename: 'logs/all-logs.log'
    },
    error:{
      type: 'dateFile',
      filename: 'logs/log',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true //设置文件名称为 filename + pattern
    }
  },
  categories:{
    default:{
      appenders:['console'],
      level: 'debug'
    },
    info:{
      appenders: ['info','console'],
      level: 'info'
    },
    error:{
      appenders: ['error','console'],
      level: 'error'
    }
  }
})
/**
 * 日志输出,level为debug
 * @param {string} content 
 */
exports.debug = (content)=>{
  let logger = log4js.getLogger()
  logger.level = levels.debug
  logger.debug(content)
}
/**
 * 日志输出,level为error
 * @param {string} content 
 */
 exports.error = (content)=>{
  let logger = log4js.getLogger('error')
  logger.level = levels.error
  logger.error(content)
}
/**
 * 日志输出,level为info
 * @param {string} content 
 */
 exports.info = (content)=>{
  let logger = log4js.getLogger('info')
  logger.level = levels.info
  logger.info(content)
}
# log4js封装后的使用
// 引入封装的文件
const log4js = require('./utils/log4j')
// 在错误中打印日志
app.on('error', (err, ctx) => {
  log4js.error(`${err.stack}`)
});
```

4.  MongoDB的安装与使用 

```shell
windows下安装
	#1.下载安装包 一键安装
  #启动服务
  mongod --config "C:\Program Files\MongoDB\Server\4.4\bin\mongod.cfg"
  #注册mongod服务
  mongod --config "C:\Program Files\MongoDB\Server\4.4\bin\mongod.cfg" --serviceName "MongoDB" --install
 
mac下安装
#1.下载安装包并解压
#2.创建软连接
		ln -s /工作空间/install-soft/mongodb-macos-x86_64-4.4.2/bin/mongod /usr/local/bin/mongod
		ln -s /工作空间/install-soft/mongodb-macos-x86_64-4.4.2/bin/mongo /usr/local/bin/mongo
#3.启动服务
		mongod --conf /工作空间/install-soft/mongodb-macos-x86_64-4.4.2/mongo/config/mongo.conf
#4.环境变量配置
		ln -s /工作空间/install-soft/mongodb-macos-x86_64-4.4.2/bin/mongod /usr/local/bin/mongod
		ln -s /工作空间/install-soft/mongodb-macos-x86_64-4.4.2/bin/mongo /usr/local/bin/mongo
```

5. Mongo语法

数据库操作

| 创建数据库 | use demo          |
| ---------- | ----------------- |
| 查看数据库 | show dbs          |
| 删除数据库 | db.dropDatabase() |

集合操作

| 创建集合 | db.createCollection(name) |
| -------- | ------------------------- |
| 查看集合 | show collections          |
| 删除集合 | db.collection.drop()      |

文档操作

| 创建文档 | db.collection.insertOne({})<br />db.collection.insertMany([]) |
| -------- | ------------------------------------------------------------ |
| 查看文档 | db.collections.find({})                                      |
| 删除文档 | db.collection.deleteOne()<br />db.collection.deleteMany()    |
| 更新文档 | db.collection.update({},{},false,true)                       |

条件操作

| 大于     | $gt  |
| -------- | ---- |
| 小于     | $lt  |
| 大于等于 | $gte |
| 小于等于 | $lte |

##### 1.7 JWT使用

1. 安装jsonwebtoken

```shell
# 安装jwt
npm install jsonwebtoken -S
# 安装koa-jwt 中间件 
npm install koa -jwt -S
```





##### 1.8 vuex封装

1. 在store目录下创建index.js文件

```js
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
```

2. 在store目录下创建mutations.js文件

```js
import storage from "../utils/storage";

export default{
  saveUserInfo(state,userInfo){
    state.userInfo = userInfo
    storage.setItem('userInfo',userInfo)
  }
} 
```





















### 总结

1. 组件地址必须带后缀

```js
// 正确
import('./../views/Welcome.vue)
// 错误
import('./..//views/Welcome')
```

2. vite可配置别名,解决./../问题,类似于Vue里面的@

```js
resolve:{
  alias:{
    '@':path.resolve(__dirname,'./src')
  }
}
```

3. 全局的mixin样式问题,可以通过vite配置

```js
css:{
  preprocessorOptions:{
    scss:{
      additionalDate:`@import '@/assets/style/base.scss'`
    }
  }
}
```

