import { InjectionKey } from 'vue'
import { ActionTree, createStore, GetterTree, MutationTree, Store } from 'vuex'
import { IGlobalState } from './definition/common'
import home from './modules/home'

// export interface StoreProps {
//   age: number
// }
// // 2. 定义注入类型
// export const globalStoreKey: InjectionKey<Store<StoreProps>> = Symbol()

// const state: StoreProps = {
//   age: 18
// }

// const getters: GetterTree<StoreProps, any> = {
//   processAge: (state) => state.age
// }

// const mutations: MutationTree<StoreProps> = {
//   updateAge(state, payload) {
//     state.age = payload
//   }
// }

// const actions: ActionTree<StoreProps, any> = {
//   asyncAge({ commit }, payload) {
//     commit('updateAge', payload)
//   }
// }

export default createStore<IGlobalState>({
  modules: {
    home
  }
})
