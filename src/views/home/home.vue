<template>
  <div>home</div>
  <el-button @click="loginOut">退出登录</el-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default defineComponent({
  setup() {
    const router = useRouter()
    const loginOut = () => {
      // sessionStorage.removeItem('auth')
      // router.push('/login')
      axios.get('/api/getStatusList').then((res) => {
        console.log(res.data)
      })
    }

    return {
      loginOut
    }
  }
})
</script>
