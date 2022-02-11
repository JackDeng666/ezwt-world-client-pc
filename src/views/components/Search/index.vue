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
      :placeholder="inputActive ? '' : placeholderStr">
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

<script>
import { reactive, toRefs } from 'vue'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      placeholderStr: '搜索',
      iActive: false,
      searchList: [
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
      ],
      searchIndex: 0, // 当前搜索引擎索引
      keydownIndex: 0, // 键盘事件索引
      searchRelateShow: false // 搜索关联词显示
    }
  },
  computed: {
    inputActive() {
      return this.$store.state.isBgActive && this.iActive
    },
    keydownLength() { // 上下键可滚动的长度
      return this.searchRelateShow ? 2 : 1
    }
  },
  watch: {
    keydownIndex() {
      this.calcFocus()
      this.calcBuoyPosition()
    },
    inputActive(val) {
      if(!val) {
        document.onkeyup = null
        this.hideBuoy()
      }
    }
  },
  methods: {
    ...mapMutations(['setIsBgActive']),
    focus() {
      this.iActive = true
      this.setKeyupEvent()
      this.setIsBgActive(true)
      setTimeout(() => {
        this.calcBuoyPosition()
        this.showBuoy()
      }, 300)
    },
    search() {
      window.open(this.searchList[this.searchIndex].url + this.searchStr, "_blank");
    },
    setKeyupEvent() {
      document.onkeyup = event => {
        this.searchKeyup(event)
      }
    },
    searchKeyup(e) {
      // console.log(e.key, e.keyCode)
      const that = this
      if(e.keyCode == 13) { // enter
        that.search(e)
        return
      }
      // 键盘上下键切换选中光标
      if(e.keyCode == 40) { // ArrowDown
        that.keydownIndex++
        that.keydownIndex = that.keydownIndex > that.keydownLength ? 0 : that.keydownIndex
        return
      }
      if(e.keyCode == 38) { // ArrowUp
        that.keydownIndex--
        that.keydownIndex = that.keydownIndex < 0 ? that.keydownLength : that.keydownIndex
        return
      }
      // 左右
      if(that.keydownIndex == 1) {
        if(e.keyCode == 37) { // ArrowLeft
          that.searchIndex--
          that.searchIndex = that.searchIndex < 0 ? that.searchList.length - 1 : that.searchIndex
        }
        if(e.keyCode == 39) { // ArrowRight
          that.searchIndex++
          that.searchIndex = that.searchIndex > that.searchList.length - 1 ? 0 : that.searchIndex
        }
      }
    },
    calcFocus() {
      const input = this.$refs['search-input']
      if(this.keydownIndex == 0) {
        input.focus()
      } else {
        input.blur()
      }
    },
    showBuoy() {
      const buoy = this.$refs['buoy']
      buoy.style.display = 'block'
      buoy.classList.add('animate_display')
      setTimeout(() => {
        buoy.classList.remove('animate_display')
      }, 500)
    },
    hideBuoy() {
      const buoy = this.$refs['buoy']
      buoy.classList.add('animate_close')
      setTimeout(() => {
        buoy.classList.remove('animate_close')
        buoy.style.display = 'none'
      }, 500)
    },
    // 计算浮标位置
    calcBuoyPosition() {
      let left, top, object
      const buoy = this.$refs['buoy']
      if(this.keydownIndex == 0) {
        object = this.$refs['search-input']
        left = object.offsetLeft - 20
        top = object.offsetTop + object.offsetHeight / 2 - 7
      }
      if(this.keydownIndex == 1) {
        object = this.$refs['search-to']
        left = object.offsetLeft - object.offsetWidth / 2 - 20
        top = object.offsetTop + object.offsetHeight / 2 - 7
      }
      buoy.style.cssText = `left: ${left}px;top: ${top}px;`
    },
    searchItemClick(index) {
      this.searchIndex = index
    }
  },
  setup () {
    const state = reactive({
      searchStr: null,
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  position: relative;
  margin: 0 auto;
  width: 100%;
  .buoy {
    position: absolute;
    left: -50px;
    top: 0;
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