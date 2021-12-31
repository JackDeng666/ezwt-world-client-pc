<template>
  <div class="content">
    <p>壁纸设置</p>
    <p>壁纸设置</p>
    <p>壁纸设置</p>
    <p>壁纸设置</p>
    <p>壁纸设置</p>

    <p>壁纸设置</p>
    <p>壁纸设置</p><p>壁纸设置</p><p>壁纸设置</p><p>壁纸设置</p><p>壁纸设置</p><p>壁纸设置</p><p>壁纸设置</p>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  setup () {
    const state = reactive({
      count: 0,
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  font-size: 100px;
}
</style>