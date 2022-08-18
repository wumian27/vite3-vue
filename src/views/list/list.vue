<template>
  <div>store</div>
  <div>{{ age }}</div>
  <el-button @click="changeAge">change age</el-button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { IGlobalState } from '../../store/definition/common'
import Types from '../../store/types'

export default defineComponent({
  setup() {
    const store = useStore<IGlobalState>()
    const age = computed(() => store.state.home.age)

    const changeAge = () => {
      store.commit(`home/${Types.SET_AGE}`, 12955)
    }
    return {
      age,
      changeAge
    }
  }
})
</script>
