<template>
  <div class="search-box">
    <!-- <div id="buoy-1"></div> -->
    <input type="text" id="search-input" :class="{active: inputActive}" @focus="focus" @blur="blur" :placeholder="placeholderStr">
    <div class="search-to">
      <div class="search-to-item" v-for="(item, index) in searchList" :key="index">
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
      inputActive: false,
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
      ]
    }
  },
  methods: {
    ...mapMutations(['setIsBgActive']),
    focus(e) {
      console.log(e)
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
  margin: 0 auto;
  width: 60%;
  #search-input {
    display: block;
    box-sizing: border-box;
    margin: 0 auto;
    height: 45px;
    width: 25%;
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
      width: 70%;
    }
    &.active {
      width: 70%;
      background-color: rgba(255,255,255,.9);
      color: #000;
    }
  }
  .search-to {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    .search-to-item {
      padding: 10px 30px;
      margin-left: 5px;
      margin-right: 5px;
      background-color: rgba(255,255,255,.1);
      border-radius: 20px;
      transition: .25s;
      cursor: pointer;
      color: #dbd9d9;
      font-size: 16px;
      font-weight: bold;
      .active {
        background-color: $basic-color;
      }
    }
  }
}
</style>