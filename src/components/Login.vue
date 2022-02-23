<template>
  <div>登录页面</div>
  <el-button @click="back">回首页</el-button>
</template>
<script>
// vue3 方式
// import { ref } from 'vue'
// import { useRouter} from 'vue-router'
// defineProps({
//   msg: String
// })     
// const count = ref(0)
// const router = useRouter()
// const back = ()=>{
//   router.push('/welcome')
// }

/**vue2 方式 */
export default{
  name: 'login',
  methods:{
    back(){
      this.$router.push('/welcome')
    }
  }
}
</script>
<style scoped>
</style>
