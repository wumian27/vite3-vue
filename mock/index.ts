import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/getStatusList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          name: 'wujiam'
        },
        msg: '成功'
      }
    }
  },
  {
    url: '/api/menu',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          arr: []
        },
        msg: '成功'
      }
    }
  }
] as MockMethod[]
