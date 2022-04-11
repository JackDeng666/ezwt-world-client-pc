<script setup>
import { ref, computed, watch, getCurrentInstance } from 'vue'
import { useStore } from "vuex"

const { proxy } = getCurrentInstance()
const store = useStore()

const searchStr = ref(null)
const iActive = ref(false)
const searchList = ref([
  {
    name: '百度', 
    url: 'https://www.baidu.com/s?wd='
  },
  {
    name: 'CSDN', 
    url: 'https://so.csdn.net/so/search?q='
  },
  {
    name: '淘宝',
    url: 'https://uland.taobao.com/sem/tbsearch?keyword='
  },
  {
    name: 'NPM',
    url: 'https://www.npmjs.com/search?q='
  }
])
const searchIndex = ref(0)
const keydownIndex = ref(0)
const searchRelateShow = ref(false)

const inputActive = computed(() => {
  return store.state.isCoverShow && iActive.value
})
const keydownLength = computed(() => {
  return searchRelateShow.value ? 2 : 1
})

watch(keydownIndex, () => {
  calcFocus()
  calcBuoyPosition()
})
watch(inputActive, (val) => {
  if(!val) {
    document.onkeyup = null
    hideBuoy()
  }
})
// method
const focus = () => {
  iActive.value = true
  setKeyupEvent()
  store.commit('showCover')
  setTimeout(() => {
    calcBuoyPosition()
    showBuoy()
  }, 300)
}
const search = () => {
  window.open(searchList.value[searchIndex.value].url + searchStr.value, "_blank");
}
const setKeyupEvent = () => {
  document.onkeyup = event => {
    searchKeyup(event)
  }
}
const searchKeyup = (e) => {
  if(e.keyCode == 13) { // enter
    search(e)
    return
  }
  // 键盘上下键切换选中光标
  if(e.keyCode == 40) { // ArrowDown
    keydownIndex.value++
    keydownIndex.value = keydownIndex.value > keydownLength.value ? 0 : keydownIndex.value
    return
  }
  if(e.keyCode == 38) { // ArrowUp
    keydownIndex.value--
    keydownIndex.value = keydownIndex.value < 0 ? keydownLength.value : keydownIndex.value
    return
  }
  // 左右
  if(keydownIndex.value == 1) {
    if(e.keyCode == 37) { // ArrowLeft
      searchIndex.value--
      searchIndex.value = searchIndex.value < 0 ? searchList.value.length - 1 : searchIndex.value
    }
    if(e.keyCode == 39) { // ArrowRight
      searchIndex.value++
      searchIndex.value = searchIndex.value > searchList.value.length - 1 ? 0 : searchIndex.value
    }
  }
}
const calcFocus = () => {
  const input = proxy.$refs['search-input']
  if(keydownIndex.value == 0) {
    input.focus()
  } else {
    input.blur()
  }
}
const showBuoy = () => {
  const buoy = proxy.$refs['buoy']
  buoy.style.display = 'block'
  buoy.classList.add('animate_display')
  setTimeout(() => {
    buoy.classList.remove('animate_display')
  }, 500)
}
const hideBuoy = () => {
  const buoy = proxy.$refs['buoy']
  buoy.classList.add('animate_close')
  setTimeout(() => {
    buoy.classList.remove('animate_close')
    buoy.style.display = 'none'
  }, 500)
}
// 计算浮标位置
const calcBuoyPosition = () => {
  let left, top, object
  const buoy = proxy.$refs['buoy']
  if(keydownIndex.value == 0) {
    object = proxy.$refs['search-input']
    left = object.offsetLeft - 20
    top = object.offsetTop + object.offsetHeight / 2 - 7
  }
  if(keydownIndex.value == 1) {
    object = proxy.$refs['search-to']
    left = object.offsetLeft - object.offsetWidth / 2 - 20
    top = object.offsetTop + object.offsetHeight / 2 - 7
  }
  buoy.style.left = `${left}px`
  buoy.style.top = `${top}px`
}
const searchItemClick = (index) => {
  searchIndex.value = index
}
</script>

<template>
  <div class="search-box">
    <div class="buoy" ref="buoy">
      <i class="iconfont icon-arrow-r_fill"></i>
    </div>
    <input
      type="text" 
      id="search-input"
      ref="search-input"
      :class="{active: inputActive}" 
      @click="focus" 
      @blur="blur"
      v-model="searchStr"
      :placeholder="inputActive ? '' : '搜索'">
    <div
      class="search-to"
      ref="search-to"
      :class="{show: inputActive}">
      <div
        v-for="(item, index) in searchList" 
        :key="index" 
        :class="searchIndex == index ? 'search-to-item active animate_bounce' : 'search-to-item'"
        @click.stop="searchItemClick(index)">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-box {
  position: relative;
  margin: 0 auto;
  width: 100%;
  .buoy {
    display: none;
    position: absolute;
    color: $basic-color;
    transition: .2s;
  }
  #search-input {
    display: block;
    box-sizing: border-box;
    margin: 0 auto;
    height: 45px;
    width: 15%;
    border-radius: 30px;
    color: #fff;
    border: 1px solid rgba(255,255,255,.05);
    padding: 10px 20px;
    backdrop-filter: blur(2px);
    background-color: rgba(0,0,0,0.6);
    // background-color: rgba(255,255,255,.6);
    outline: 0;
    font-size: 16px;
    text-align: center;
    &::placeholder {
      color: #fff;
    }
    &:hover {
      width: 30%;
      &::placeholder {
        color: #d3d3d3;
      }
    }
    &.active {
      width: 40%;
      background-color: rgba(255,255,255,.95);
      color: #000;
    }
  }
  .search-to {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    opacity: 0;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.show {
      top: 45px;
      opacity: 1;
      transition: all .1s .2s;
    }
    .search-to-item {
      padding: 0 25px;
      height: 35px;
      line-height: 35px;
      margin-left: 5px;
      margin-right: 5px;
      background-color: rgba(255,255,255,.1);
      border-radius: 20px;
      transition: .4s;
      cursor: pointer;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      &:hover {
        background-color: rgba(255,255,255,.3);
      }
      &.active {
        background-color: $basic-color;
      }
    }
  }
}
</style>