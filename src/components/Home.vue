<!--
 * @Description: 项目整体布局页面
 * @Author: Li Guangyin
 * @Date: 2022-02-23 13:44:46
 * @LastEditTime: 2022-02-26 18:31:04
-->
<template>
  <div class="basic-layout">
    <div :class="['nav-side',isCollapse?'fold':'unfold']">
      <!-- 系统logo -->
      <div class="logo">
        <img src="./../assets/logo.png" alt="">
        <span v-if="!isCollapse">Manager</span>
      </div>
      <!-- 导航菜单 -->
       <el-menu
        :default-active="activeMenu"
        background-color="#001529"
        text-color="#fff"
        :collapse="isCollapse"
        router
        class="nav-menu"
        >
          <tree-menu :userMenu="userMenu"></tree-menu>
      </el-menu>
    </div>
    <div :class="['content-right',isCollapse?'fold': 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="handleCollapse">
            <el-icon :size="24" color="#333"><fold /></el-icon>
          </div>
          <div class="bread">
            <bread-crumb></bread-crumb>
          </div>
        </div>
        <div class="user-info">
          <el-badge :is-dot="noticeCount >0? true:false" class="notice" is-dot>
            <el-icon><bell /></el-icon>
          </el-badge>
          <el-dropdown @command="handleUserAction">
            <span class="el-dropdown-link">
              赖三炮<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a">个人信息</el-dropdown-item>
                <el-dropdown-item command="b">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Fold,Bell,ArrowDownBold,ArrowDown} from '@element-plus/icons'
import {notice,menuList} from '@/api/user'
import TreeMenu from '@/components/TreeMenu.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
export default{
  name: 'Home',
  components:{
    Fold,
    Bell,
    ArrowDown,
    ArrowDownBold,
    TreeMenu,
    BreadCrumb
  },
  data(){
    return {
      isCollapse: false, // 左侧导航栏是否可折叠
      userInfo:{
        username: 'Jack',
      },
      noticeCount: null, // 通知数量
      userMenu: [], // 菜单tree
      activeMenu: location.pathname, // 激活的menu
    }
  },
  mounted(){
    console.log(location)
    this.getNotice()
    this.getMenuList()
  },
  methods:{
    // 折叠左侧导航栏
    handleCollapse(){
      this.isCollapse = !this.isCollapse
    },
    // 点击用户头像操作
    handleUserAction(key){
      if(key=== 'a')return
      this.$store.commit('saveUserInfo','')
      this.userInfo = null
      this.$router.push('/login')
    },
    // 获取通知数量
    async getNotice(){
      try{
        const count = await notice()
        this.noticeCount = count
      }catch(error){
        console.error(error)
      }
    },
    // 获取menu树
    async getMenuList(){
      try{
        const menuListTree = await menuList()
        console.log(menuListTree)
        this.userMenu = menuListTree
      } catch(error){
        console.error(error)
      }
    }
  }
} 
</script>
<style lang="scss">
.basic-layout{
  position: relative;
  height: 100%;
  .nav-side{
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color:#001529;
    color: #fff;
    // overflow-y: auto;
    transition: width  0.5s;
    .logo{
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img{
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }
    // 去除左侧菜单1px问题
    .nav-menu{
      height: calc(100vh - 200px);
      border-right: none;
    }
    // 合并
    &.fold{
      width: 64px;
    }
    // 展开
    &.unfold{
      width: 200px;
    }
  }
  .content-right{
    margin-left: 200px;
     // 合并
    &.fold{
      margin-left: 64px;
    }
    // 展开
    &.unfold{
      margin-left: 200px;
    }
    .nav-top{
      padding: 0 20px;
      display: flex;
      justify-content: space-between ;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
      .nav-left{
        display: flex;
        align-items: center;
        .menu-fold{
          margin-right: 10px;
          display: flex;
          align-items: center;
          height: 100%;
          line-height: 100%;
        }
      }
      .user-info{
        display: flex;
        align-items: center;
        .notice{
          margin-top: 5px;
          margin-right: 20px;
          display: flex;
          align-items: center;
          line-height: 30px;
        }
        .el-dropdown-link{
          cursor: pointer;
        }
      }
    }
    .wrapper{
      padding: 20px;
      height: calc(100vh - 50px);
      background-color: #eef0f3;
      .main-page{
        height: 100%;
        background-color: #fff;
      }
    }
  }
}
</style>
