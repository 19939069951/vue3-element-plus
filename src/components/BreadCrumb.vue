<!--
 * @Description: 面包屑
 * @Author: Li Guangyin
 * @Date: 2022-02-26 02:43:36
 * @LastEditTime: 2022-02-26 02:57:07
-->
<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item,index) in breadList" :key="item.path">
      <router-link to="/welcome" v-if="index === 0">{{item.meta.title}}</router-link>
      <span v-else>{{item.meta.title}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  computed:{
    breadList(){
      return this.$route.matched
    }
  }
}
</script>

<style>

</style>