<script setup>
import Flipping from 'flipping/dist/flipping.web'
import { ref, getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance()
const list = ref([1,2,3,4,5,6,7,8,9])
let flipping
onMounted(() => {
  flipping = new Flipping({
    parent: proxy.$refs['content'],
    duration: 500
  })
  setTimeout(() => {
    flipping.read()

    moveArrItem(list.value, 3, 0)

    proxy.$nextTick(() => {
      flipping.flip()
    })
  }, 1000)
})
// arr目标数组  cKey移动元素下标，oKey目标元素下标
function moveArrItem (arr, cKey, oKey) {
  if(cKey > oKey) {
    arr.splice(oKey, 0, arr[cKey]); // 移动到指定元素之前
    arr.splice(cKey + 1, 1); // 移除原来位置上的该元素
  } else {
    let temp = arr[cKey]
    arr.splice(cKey, 1); // 移除原来位置上的该元素
    arr.splice(oKey - 1, 0, temp); // 移动到指定元素之前
  }
}
</script>

<template>
<div class="content" ref="content">
  <div class="item" v-for="item in list" :data-flip-key="item" :key="item">{{item}}</div>
</div>
</template>

<style lang="scss" scoped>
.content {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  .item {
    background: #d54343;
    color: #fff;
    text-align: center;
    margin: 10px;
  }
}
</style>