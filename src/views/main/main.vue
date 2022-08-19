<template>
  <div>侧边栏</div>
  <div @click="changName">changeName</div>
  <div @click="changeAge">changeAge</div>
  <div>{{ age }}{{ name }}</div>
  <h3 @click="color = 'blue'">样式改变</h3>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const color = ref('red')
    const data = reactive({
      age: 10,
      name: 'wujiam',
      changName: function () {
        this.name = 'zhangsan'
      }
    })
    const changeAge = () => {
      data.age = 13
    }

    return {
      ...toRefs(data),
      changeAge,
      color
    }
  }
})
</script>

<style scoped lang="scss">
h3 {
  color: v-bind(color);
}
</style>
