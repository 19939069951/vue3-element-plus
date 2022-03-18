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
      <div class="user-table-action">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">删除</el-button>
      </div>
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
export default {
  name: 'Users',
  setup() {
    const user = reactive({})
    const userList = reactive([])
    const columns = reactive([
      {
        label: '用户Id',
        prop: 'id'
      },
      {
        label: '用户名',
        prop: 'username'
      },
      {
        label: '用户邮箱',
        prop: 'email'
      },
      {
        label: '用户角色',
        prop: 'role'
      },
      {
        label: '用户状态',
        prop: 'state'
      },
      {
        label: '注册时间',
        prop: 'create_time'
      },
      {
        label: '最后登录时间',
        prop: 'update_time'
      }
    ])
    const getUserList = () => {}
    onMounted(() => {
      getUserList()
    })
    return {
      user,
      userList,
      columns
    }
  }
}
</script>

<style scope lang="scss">
.user-manager {
  .user-query {
    margin-bottom: 20px;
    padding: 20px 20px 0 20px;
    background-color: #fff;
    border-radius: 10px;
  }
  .user-table {
    padding: 20px 20px 0 20px;
    background-color: #fff;
    border-radius: 10px;
    .user-table-action {
      margin-bottom: 10px;
    }
  }
}
</style>
