<!--
 * @Description: 
 * @Author: Li Guangyin
 * @Date: 2022-02-23 13:44:46
 * @LastEditTime: 2022-02-23 22:13:13
-->
<template>
  <div class="basic-layout">
    <div class="nav-side"></div>
    <div class="content-right">
      <div class="nav-top">
        <div class="bread">首页</div>
        <div class="user-info">用户</div>
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
export default{
  name: 'Home',
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
    overflow-y: auto;
    transition: width  0.5s;
  }
  .content-right{
    margin-left: 200px;
    .nav-top{
      padding: 0 20px;
      display: flex;
      justify-content: space-between ;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
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
