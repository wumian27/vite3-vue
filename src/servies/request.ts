import axiosInstance from './create'
import * as qs from 'qs'
class Request {
  get<T>(url: string, params?: any, headers?: any): Promise<T> {
    return axiosInstance.get(url, { params: params, headers })
  }
  post<T>(url: string, params?: any, headers?: any): Promise<T> {
    return axiosInstance.post(url, qs.stringify(params), { headers })
  }
}

export default new Request()
