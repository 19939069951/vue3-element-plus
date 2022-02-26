<!--
 * @Description: 左侧菜单tree组件
 * @Author: Li Guangyin
 * @Date: 2022-02-26 01:53:35
 * @LastEditTime: 2022-02-26 20:57:11
-->
<template>
  <template v-for="menu in userMenu" :key="menu.id">
    <el-sub-menu v-if="menu.children && menu.children.length > 0 && menu.children[0].menuType == 1" :index="menu.path">
      <template #title>
        <el-icon>
          <setting/>
          <!-- <template v-html="menu.icon"></template> -->
        </el-icon>
        <span>{{menu.menuName}}</span>
      </template>
      <tree-menu :userMenu="menu.children"></tree-menu>
    </el-sub-menu>
    <el-menu-item v-else-if="menu.menuType == 1" :index="menu.path" :key="menu.id">{{menu.menuName}}</el-menu-item>
  </template>
  <!-- // <el-sub-menu index="1">
  //   <template #title>
  //     <span>系统管理</span>
  //   </template>
  //   <el-menu-item-group>
  //     <el-menu-item index="1-1">用户管理</el-menu-item>
  //     <el-menu-item index="1-2">菜单管理</el-menu-item>
  //   </el-menu-item-group>
  // </el-sub-menu>
  // <el-sub-menu index="2">
  //   <template #title>
  //     <span>审批管理</span>
  //   </template>
  //   <el-menu-item-group>
  //     <el-menu-item index="1-1">待我审批</el-menu-item>
  //     <el-menu-item index="1-2">休假申请</el-menu-item>
  //   </el-menu-item-group>
  // </el-sub-menu> -->
</template>

<script>
import {Setting,Avatar} from '@element-plus/icons'
export default {
  name: "TreeMenu",
  props: {
    userMenu: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components:{
    Setting,
    Avatar
  }
};
</script>

<style>
</style>