<!--
 * @Description: 用户管理
 * @Author: Li Guangyin
 * @Date: 2022-02-26 21:10:44
 * @LastEditTime: 2022-02-26 21:55:38
-->
<template>
  <div class="user-manager">
    <div class="user-query">
      <el-form :inline="true" :model="user">
        <el-form-item label="用户ID">
          <el-input v-model="username" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select placeholder="用户状态">
            <el-option label="在职" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-table">
      <div class="user-table-action"></div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Date" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Name" width="180">
          <template #default="scope">
            <el-popover
              effect="light"
              trigger="hover"
              placement="top"
              width="auto"
            >
              <template #default>
                <div>name: {{ scope.row.name }}</div>
                <div>address: {{ scope.row.address }}</div>
              </template>
              <template #reference>
                <el-tag>{{ scope.row.name }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {onMounted,reactive,ref} from 'vue'
export default {
  name: "Users",
  setup(){
    const user = reactive({})
    const tableData = reactive([])
    onMounted(()=>{
      console.log('打印了')
    })
    return {
      user,
      tableData
    }
  },
};
</script>

<style>
</style>