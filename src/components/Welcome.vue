<template>
  <div>欢迎</div>
  <router-link to='/login'>去登陆</router-link>
</template>
<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>
<style scoped>
a {
  color: #42b983;
}
</style>
