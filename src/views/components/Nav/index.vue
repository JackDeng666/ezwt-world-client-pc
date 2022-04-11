<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import antiShake from '@/umlib/antiShake'
import guid from '@/umlib/guid'
const { proxy } = getCurrentInstance()
const store = useStore()
const navList = ref(JSON.parse(JSON.stringify(store.state.navList)))
let changeArr = JSON.parse(JSON.stringify(navList.value))
const currentNavOb = ref(null)
const dragId = ref(-1)
const moveItemBgShow = ref(false)
let isDrag = false
let dragStartTime = 0
let areaData = []
let curentAreaData = null, firtDragArea = null
let currentMoveItem = null
let navItems = []
let startX = 0, startY = 0, moveObStyle = null

onMounted(() => {
  navItems = document.querySelectorAll('.nav-content.real .nav-item')
  calcAreaData()
})

// method
const hide = () => {
  store.commit('hideNavFolder')
  store.commit('hideCover')
}
const itemClick = (e) => {
  if(Date.now() - dragStartTime < 300) {
    console.log("跳转")
  }
}
const itemRightClick = (e) => {
  console.log("right-item")
}
const handleMousedown = (e, item) => {
  dragId.value = item.id
  currentNavOb.value = item
  dragStartTime = Date.now()
  startX = e.x, startY = e.y
  // 隐藏原内容块
  // Array.prototype.find.call(navItems, ef => ef.attributes['data-id'].value == item.id).style.opacity = '0'
  currentMoveItem = Array.from(navItems).find(ef => ef.attributes['data-id'].value == item.id)
  currentMoveItem.style.transition = 'none'
  currentMoveItem.style.opacity = '0'
  // 显示可拖动的虚拟dom
  curentAreaData = findCurrent(item.id)
  firtDragArea = curentAreaData
  moveItemBgShow.value = false
  isDrag = true
  moveObStyle = proxy.$refs['virtual-nav-item'].style
  moveObStyle.cssText = `
    display: flex;
    left: ${curentAreaData.left }px;
    top: ${curentAreaData.top }px;
    z-index: 999;
    transition: none;
  `
}
const handleMousemove = (e) => {
  if(dragId.value == -1) return
  let obx = firtDragArea.left + e.x - startX,
      oby = firtDragArea.top + e.y - startY
  moveObStyle.left = `${obx}px`
  moveObStyle.top = `${oby}px`
  // 判断是否可以交换
  antiShake(() => {
    calcPosition(obx, oby)
  }, 300)
}
const handleMouseout = (e) => {
  dragId.value !== -1 && reset()
}
const handleMouseup = (e) => {
  dragId.value !== -1 && reset()
}
// 内部方法
function calcPosition(obx, oby) { // 计算交换位置
  if(dragId.value == -1) return
  let flag, changeObIndex // 标识：1交换位置，2右推位置，目标：交换或右推的目标
  // 拖拽中点
  let obcx = obx + curentAreaData.width / 2,
      obcy = oby + curentAreaData.height / 2
  for(let i = 0; i < areaData.length; i++) {
    let el = areaData[i]
    let cobcx = el.left + el.width / 2,
        cobcy = el.top + el.height / 2
    if( obcx > cobcx - 25 && obcx < cobcx + 25 && obcy > cobcy - 25 && obcy < cobcy + 25 ) {
      flag = 1
      changeObIndex = i
      break
    }
    if(obcx > el.left - 25 && obcx < el.left + 25 && obcy > cobcy - 25 && obcy < cobcy + 25) {
      flag = 2
      changeObIndex = i
      break
    }
    flag = 0
  }
  if(flag) {
    // 交换数据，虚拟dom更新
    let index = null
    changeArr.forEach((el, i) => el.id == dragId.value && (index = i))
    if(index !== changeObIndex) {
      flag == 1 && swapArrItem(changeArr, index, changeObIndex) // 位于中心
      flag == 2 && moveArrItem(changeArr, index, changeObIndex) // 位于左侧
      store.commit('setNavList', JSON.parse(JSON.stringify(changeArr)))
      // 等待虚拟dom渲染后再计算
      proxy.$nextTick(() => {
        changeToFixed() // 先改为fixed，否则第一次替换没有效果
        calcAreaData() // 计算当前交换后的位置
        changeToFixed() // 当前改为fixed，实现交替动画
        curentAreaData = findCurrent(dragId.value) // 更新当前拖拽位置
      })
    }
  }
}
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
function swapArrItem(arr, cKey, oKey) { 
  let temp = arr[cKey]
  arr[cKey] = arr[oKey]
  arr[oKey] = temp
}
function calcAreaData() { // 计算每块导航块所在位置
  areaData = []
  let virtualNavItems = document.querySelectorAll('.nav-content.virtual .nav-item')
  virtualNavItems.forEach(el => {
    areaData.push({
      id: el.attributes['data-id'].value,
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight
    })
  })
}
function changeToFixed() { // 改为固定布局，展示动画
  navItems.forEach(el => {
    let a = findCurrent(el.attributes['data-id'].value)
    el.style.cssText = el.style.cssText + `
      transition: all .3s;
      position: fixed;
      left: ${a.left }px;
      top: ${a.top }px;
    `
  })
}
function findCurrent(value) {
  return areaData.find(ef => ef.id == value)
}
function cancelFixed() { // 取消固定位置，可滑动
  navList.value = changeArr
  navItems.forEach(el => {
    el.style.position = 'static' 
    el.style.transition = 'none'
  })
}
function reset() { // 移动元素回到原来位置或者当前位置
  moveObStyle.transition = 'all .3s'
  moveObStyle.zIndex = 1
  moveObStyle.left = `${curentAreaData.left }px`
  moveObStyle.top = `${curentAreaData.top }px`
  moveItemBgShow.value = true
  dragId.value = -1
  setTimeout(() => {
    currentMoveItem.style.transition = 'none'
    currentMoveItem.style.opacity = '1'
    moveObStyle.display = 'none'
    isDrag = false
    cancelFixed()
  }, 300)
}
</script>

<template>
<div id="nav-box" @click.left.prevent="" @click.right="hide">
  <div class="nav-content real">
    <div
      class="nav-item"
      v-for="(item, index) in navList" 
      :key="item.id"
      :data-id="item.id">
      <div
        class="wrap"
        @click.left.stop="itemClick" 
        @click.right.prevent.stop="itemRightClick"
        @mousedown.left="handleMousedown($event, item)">
        <img class="icon" :src="item.iconUrl"/>
      </div>
      <div>{{item.text}}</div>
    </div>
  </div>
  <!-- 当前拖动的虚拟滑块 -->
  <div class="virtual-nav-item" ref="virtual-nav-item">
    <div
      :class="['wrap', moveItemBgShow ? 'show-bg' : '']"
      @mousemove.left="handleMousemove"
      @mouseout.left="handleMouseout"
      @mouseup.left="handleMouseup">
      <img class="icon" :src="currentNavOb?.iconUrl"/>
    </div>
    <div>{{currentNavOb?.text}}</div>
  </div>
</div>
</template>

<style lang="scss" scoped>
#nav-box {
  width: 100%;
  user-select: none;
  .nav-content {
    margin: 0 auto;
    width: 650px;
    display: flex;
    flex-wrap: wrap;
    .nav-item {
      padding: 10px 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: none;
      color: #fff;
      font-size: 14px;
      .wrap {
        width: 80px;
        height: 80px;
        text-align: center;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, .7);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-bottom: 8px;
        &:hover {
          background-color: rgba(255, 255, 255, .1);
        }
        .icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          pointer-events: none;
        }
      }
    }
  }
  .virtual-nav-item {
    padding: 10px 25px;
    position: fixed;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    color: #fff;
    font-size: 14px;
    .wrap {
      width: 80px;
      height: 80px;
      text-align: center;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, .1);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-bottom: 8px;
      &.show-bg {
        background-color: rgba(255, 255, 255, .7);
      }
      .icon {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        pointer-events: none;
      }
    }
  }
}
</style>