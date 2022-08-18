import { Module } from 'vuex'
// import { IGlobalState, IAxiosResponseData } from '../../index'
import Types from '../types'

import { IHomeState } from '../definition/home'
import { IGlobalState } from '../definition/common'
// import * as API from './api'

const state: IHomeState = {
  age: 12
}

const home: Module<IHomeState, IGlobalState> = {
  namespaced: true,
  state,
  actions: {
    // // 请求接口
    // async [Types.GET_ACCESS_CONTROL_LIST]({ commit, rootState }) {
    //   const result = await API.getCityAccessControlList<IAxiosResponseData>({
    //     userId: rootState.login.userInfo.userId,
    //     communityId: state.currentCommunity.communityId
    //   })
    //   if (result.code !== 0) return
    //   commit(Types.GET_ACCESS_CONTROL_LIST, result.data.userDoorDTOS)
    //   commit(Types.SET_COMMONLY_USERDOOR, result.data.commonlyUsedDoor)
    // }
  },
  mutations: {
    // 设置小区列表
    [Types.SET_AGE](state, age: number) {
      console.log(1222)
      state.age = age
    }
  }
}

export default home
