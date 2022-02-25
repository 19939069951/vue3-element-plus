<!--
 * @Description: 
 * @Author: Li Guangyin
 * @Date: 2022-02-24 23:08:19
 * @LastEditTime: 2022-02-26 01:27:38
-->
<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userForm" :model="userinfo" status-icon :rules="rules">
        <div class="title">后台管理系统</div>
        <el-form-item prop="username">
          <el-input v-model="userinfo.username" placeholder="请输入用户名" type="text" :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="userinfo.password" placeholder="请输入密码" type="password" :prefix-icon="Lock" />
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {Lock,User} from '@element-plus/icons-vue'
import {login} from '../../api/user'
export default {
  name: 'Login',
  data(){
    return {
      Lock,
      User,
      userinfo:{
        username: '',  //用户名
        password:'',  //密码
      },
      rules:{
        username:[
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password:[
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods:{
    // 登录
    handleLogin(){
      this.$refs.userForm.validate((validate)=>{
        if(validate){
          login(this.userinfo).then(res=>{
            this.$store.commit('saveUserInfo',res)
            this.$router.push('/welcome')
          })
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
.login-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal{
    padding: 50px;
    width: 500px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 2px 2px #c7c9cb4d;
    .title{
      margin-bottom: 30px;
      font-size: 30px;
      line-height: 1;
      text-align: center;
    }
    .btn-login{
      width: 100%;
    }
  }
}
</style>