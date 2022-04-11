<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from "vuex"
// const { proxy } = getCurrentInstance()
const store = useStore()
const navList = ref(8)
const navDivItems = ref([])
const arrs = ref([])
const dragTargetIndex = ref(0)
let navContentX, navContentY = 0
onMounted(() => {
  let navContent = document.querySelector("#nav-content")
  navContentX = navContent.offsetLeft
  navContentY = navContent.offsetTop
  let navItems = navContent.querySelectorAll('.nav-item')
  navContent.style.position = "relative"
  navDivItems.value = navItems
  for (let i = 0; i < navItems.length; i++) {
    const element = navItems[i]
    arrs.value.push({top: element.offsetTop, left: element.offsetLeft})
  }
  for (let i = 0; i < navItems.length; i++) {
    const element = navItems[i]
    element.style.position = "absolute"
    element.style.top = `${arrs.value[i].top}px`
    element.style.left = `${arrs.value[i].left}px`
  }
})

// method
const leftClick = () => {
  store.commit('hideNavFolder')
}
const itemClick = (e) => {
  console.log("item", e)
}
const itemRightClick = (e) => {
  console.log("item", e)
}
const dragstart = (e, i) => {
  dragTargetIndex.value = i
}
const dragenter = (e) => {
  e.preventDefault()
}
const dragover = (e) => {
  e.preventDefault()
}
const drop = (e) => {
  const startObject = navDivItems.value[dragTargetIndex.value]
  let tempTop = e.target.style.top
  let tempLeft = e.target.style.left
  e.target.style.top = startObject.style.top
  e.target.style.left = startObject.style.left
  startObject.style.top = tempTop
  startObject.style.left = tempLeft
}
</script>

<template>
<div id="nav-box" @click.left="leftClick" @click.right.prevent="">
  <div id="nav-content">
    <div 
      v-for="(item, index) in navList" 
      class="nav-item"
      draggable="true"
      :key="index" 
      @click.left.stop="itemClick" 
      @click.right.prevent.stop="itemRightClick"
      @dragstart="dragstart($event, index)"
      @dragenter="dragenter($event)"
      @dragover="dragover($event)"
      @drop="drop">
      {{item}}
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
#nav-box {
  width: 100%;
  #nav-content {
    margin: 0 auto;
    width: 720px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .nav-item {
      width: 100px;
      height: 100px;
      margin: 22px;
      border-radius: 10px;
      text-align: center;
      background-color: rgba(255, 255, 255, .7);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>