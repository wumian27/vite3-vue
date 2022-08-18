import axios from 'axios'
// import { AGetBuilding } from './interface'

// 获取小区列表
export const getCityList = <T>(userId: string | number) =>
  axios.post<T, T>(`app/user/communityInfo?userId=${userId}&`)
