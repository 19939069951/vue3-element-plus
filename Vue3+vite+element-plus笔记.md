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



