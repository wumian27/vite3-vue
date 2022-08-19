import { AgeResult } from '../store/definition/home'
import request from './request'
import { ageUrl } from './apiUrl'

export const getStatusApi = (params: { age: number }): Promise<AgeResult> =>
  request.get(ageUrl, params)
