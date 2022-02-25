<!--
 * @Description: 
 * @Author: Li Guangyin
 * @Date: 2022-02-23 18:12:15
 * @LastEditTime: 2022-02-25 23:01:08
-->
<template>
  <div class="welcome">
    <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">Vue通用后台管理系统</div>
      <div class="desc">Vue3.0+ElementPlus+Node+Mysql打造通用后台管理系统</div>
    </div>
    <div class="img"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>
<style scoped lang="scss">
.welcome{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .content{
    margin-top: -50px;
    .sub-title{
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }
    .title{
      font-size: 40px;
      line-height: 60px;
      color: #409eff;
    }
    .desc{
      text-align: right;
      font-size: 14px;
      color:#999
    }
  }
  .img{
    margin-left: 105px;
    width: 371px;
    height: 438px;
    background: url('../assets/images/welcome.png');
  }
}
</style>
