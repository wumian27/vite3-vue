import axios, { AxiosRequestConfig, Method } from 'axios'
import { ElMessage, messageConfig } from 'element-plus'
import router from '../router'

const instance = axios.create({
  headers: {
    Authorization: ''
  },
  timeout: 5000,
  // baseURL: '/',
  withCredentials: true
})

// 取消重复请求
interface PendingType {
  url?: string
  method?: any
  params: any
  data: any
  cancel: any
}
const pending: Array<PendingType> = []
const CancelToken = axios.CancelToken

const errorHandle = (status: number, msg: string) => {
  switch (status) {
    case 302:
      ElMessage.error('接口重定向了！')
      break
    case 400:
      ElMessage.error(
        '发出的请求有错误，服务器没有进行新建或修改数据的操作==>' + status
      )
      break
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401: //重定向
      router.replace({
        path: '/Login'
      })
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      ElMessage.error('登录过期,用户得到授权，但是访问是被禁止的==>' + status)
      // store.commit('token', null);
      setTimeout(() => {
        router.replace({
          path: '/Login'
        })
      }, 1000)
      break
    case 404:
      ElMessage.error('网络请求不存在==>' + status)
      break
    case 406:
      ElMessage.error('请求的格式不可得==>' + status)
      break
    case 408:
      ElMessage.error(' 请求超时！')
      break
    case 410:
      ElMessage.error('请求的资源被永久删除，且不会再得到的==>' + status)
      break
    case 422:
      ElMessage.error('当创建一个对象时，发生一个验证错误==>' + status)
      break
    case 500:
      ElMessage.error('服务器发生错误，请检查服务器==>' + status)
      break
    case 502:
      ElMessage.error('网关错误==>' + status)
      break
    case 503:
      ElMessage.error('服务不可用，服务器暂时过载或维护==>' + status)
      break
    case 504:
      ElMessage.error('网关超时==>' + status)
      break
    default:
      ElMessage.error(msg)
  }
}

const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const list = pending[key]
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      list.cancel()
      pending.splice(+key, 1)
    }
  }
}
instance.interceptors.request.use((config) => {
  // 先删除后面的
  removePending(config)
  config.cancelToken = new CancelToken((c) => {
    const { url, method, data, params } = config
    pending.push({ url, method, data, params, cancel: c })
  })

  return config
})

instance.interceptors.response.use(
  (config) => {
    removePending(config.config)
    const { status, data } = config
    if (status === 200 || status === 204) {
      return Promise.resolve(data)
    }
    return Promise.reject(data)
  },
  (error) => {
    const { response } = error
    const {
      status,
      data: { message }
    } = response
    errorHandle(status, message)
    return Promise.reject(response?.data)
  }
)

export default instance
