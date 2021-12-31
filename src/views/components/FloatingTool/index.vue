<template>
  <div id="menu">
    <div id="menu_list">
      <div v-for="(item, i) in menus" :key="i" class="tool-item" @click="itemClick(i)">
        <i :class="item.class"></i>
      </div>
    </div>
    <div id="home" @click="settingClick">
      <i class="fa fa-cog"></i>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
import init from './composition/index'
export default {
  setup () {
    const { state, settingClick, itemClick } = init()
    return {
      ...toRefs(state),
      settingClick,
      itemClick
    }
  }
}
</script>

<style lang="scss" scoped>
#menu {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 20px;
  bottom: 50%;
  z-index: 10;
  #menu_list {
    position: relative;
    margin: 4px;
    .tool-item {
      height: 42px;
      width: 42px;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 50%;
      text-align: center;
      line-height: 42px;
      font-size: 20px;
      box-shadow: 0 0 5px 1px rgba(10, 10, 10, .5);
      cursor: pointer;
      // background: $basic-color;
      // color: #fff;
      background: #fff;
      color: $basic-color;
      i {
        height: 42px;
        line-height: 42px;
      }
    }
  }
  #home {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    line-height: 50px;
    font-size: 22px;
    box-shadow: 0 0 5px 1px rgba(10, 10, 10, .5);
    cursor: pointer;
    background: $basic-color;
    color: #fff;
    // background: #fff;
    // color: $basic-color;
    i {
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>