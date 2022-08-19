<template>
  <div>home</div>
  <el-button @click="loginOut">退出登录</el-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { getStatusApi } from '../../servies/api'
export default defineComponent({
  setup() {
    const router = useRouter()
    const loginOut = async () => {
      // sessionStorage.removeItem('auth')
      // router.push('/login')
      const { data, code, msg } = await getStatusApi({ age: 12 })
      console.log(data, code, msg)
    }

    return {
      loginOut
    }
  }
})
</script>
