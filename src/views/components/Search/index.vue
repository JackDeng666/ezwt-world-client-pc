<template>
  <div class="search-box">
    <!-- <div id="buoy-1"></div> -->
    <input type="text" id="search-input" :class="{active: inputActive}" @focus="focus" @blur="blur" :placeholder="placeholderStr">
    <div class="search-to">
      <div id="buoy-2"></div>
      <!-- <div class="search-to-item">站内</div>
      <div class="search-to-item">百度</div>
      <div class="search-to-item">CSDN</div>
      <div class="search-to-item">淘宝</div> -->
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
      inputActive: false
    }
  },
  methods: {
    ...mapMutations(['setIsBgActive']),
    focus() {
      this.placeholderStr = ''
      this.inputActive = true
      this.setIsBgActive(true)
    },
    blur() {
      this.placeholderStr = '搜索'
      this.inputActive = false
      this.setIsBgActive(false)
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
  margin: 100px auto 0 auto;
  width: 60%;
  #search-input {
    display: block;
    box-sizing: border-box;
    margin: 0 auto;
    height: 45px;
    width: 50%;
    border-radius: 30px;
    color: #fff;
    border: 1px solid rgba(255,255,255,.05);
    padding: 10px 20px;
    backdrop-filter: blur(2px);
    background-color: rgba(0,0,0,0.6);
    outline: 0;
    font-size: 16px;
    text-align: center;
    &::placeholder {
      color: #fff;
    }
    &:hover {
      width: 80%;
    }
    &.active {
      width: 80%;
      background-color: rgba(255,255,255,.7);
      color: #000;
    }
  }
}
</style>