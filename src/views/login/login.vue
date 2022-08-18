<template>
  <div class="login flex-center">
    <div class="box flex-center">
      <div class="login-box">
        <h3 class="title">XGD-跨境收款</h3>
        <el-form :model="form" label-width="0">
          <el-form-item>
            <el-input
              v-model="form.username"
              class="w-50 m-2"
              size="large"
              placeholder="请输入账号"
              @keyup.enter="handleSubmit"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.password"
              class="w-50 m-2"
              size="large"
              type="password"
              placeholder="请输入密码"
              @keyup.enter="handleSubmit"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-if="needCaptcha"
              v-model="form.captcha"
              type="text"
              auto-complete="off"
              placeholder="请输入验证码"
              clearable
              size="large"
              class="w-50 m-2"
              @keyup.enter="handleSubmit"
            >
              <template #suffix>
                <img
                  src="https://fsmt-dev.jlpay.com/taxplan/common/verifyCode?update=0.07866636350601874"
                  class="captcha pointer"
                />
              </template>
            </el-input>
          </el-form-item>
          <p
            class="forgetPwd text-right pointer com-color"
            @click="linkTo('/resetPwd')"
          >
            忘记密码?
          </p>
          <el-form-item>
            <el-button
              class="width-100"
              type="primary"
              size="large"
              @click="handleSubmit"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const form = reactive({
      username: '', // 手机号
      password: '', // 密码
      captcha: '' //图片验证码
    })

    const needCaptcha = ref(true)

    // 事件
    const handleSubmit = () => {
      if (!form.username) {
        return ElMessage({
          message: '请输入您的手机号',
          type: 'warning'
        })
      }
      if (!form.password) {
        return ElMessage({
          message: '请输入您的密码',
          type: 'warning'
        })
      }
      if (!form.captcha) {
        return ElMessage({
          message: '请输入验证码',
          type: 'warning'
        })
      }
      // setSession('USER_ID', 323)
      router.push('/')
    }
    // 跳转路由
    const linkTo = (path: string) => {
      console.log(path)
      router.push(path)
    }
    return {
      form,
      handleSubmit,
      needCaptcha,
      linkTo
    }
  }
})
</script>
<style lang="scss">
.login {
  position: relative;
  min-height: 100vh;
  background: #f7f8fa;
  .pointer {
    color: #3179ff;
  }
  .box {
    width: 400px;
    min-height: 293px;
    background: #ffffff;
    color: #495770;
    position: relative;
    .login-box {
      flex: 1;
      padding: 24px;
      height: 100%;
    }
    .title {
      font-size: 24px;
      font-weight: 500;
      color: var(--el-color-primary);
      margin-bottom: 24px;
    }
    .el-input--large .el-input__inner {
      height: 44px !important;
    }
    .el-form-item {
      margin-bottom: 16px;
    }
  }
  .width-100 {
    width: 100%;
    color: #fff;
    margin-top: 16px;
  }
}
</style>

<!-- <template>
  <div>login121231</div>
  <el-button @click="handleRouter">登录</el-button>
</template>

<script lang="ts">
import {
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  useRoute,
  useRouter
} from 'vue-router'
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    name: {
      type: String,
      default: 'name'
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()

    onBeforeRouteLeave((to, from) => {
      // const answer = window.confirm(
      //   'Do you really want to leave? you have unsaved changes!'
      // )
      // console.log(answer)
      // if (!answer) return false
    })

    onBeforeRouteUpdate(() => {
      console.log('update')
    })
    const handleRouter = () => {
      // console.log(route.query)
      // router.push('/login?id=63')
      // console.log(route.fullPath,route.query, route.hash, route.)
      sessionStorage.setItem('auth', 'true')
      router.push('/home')
    }

    return {
      handleRouter
    }
  }
})
</script> -->
