<script setup>
import init from './composition/index'
const { menus, menuOff, menuClick, itemClick } = init()
</script>

<template>
  <div id="menu">
    <div id="menu_list">
      <div v-for="(item, i) in menus" :key="i" class="tool-item" @click="itemClick(i)">
        <i :class="item.class"></i>
      </div>
    </div>
    <div id="home" ref="home" @click="menuClick">
      <i class="iconfont icon-menu-s"></i>
    </div>
  </div>
</template>

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
      background: #fff;
      color: $basic-color;
      i {
        height: 42px;
        line-height: 42px;
      }
    }
  }
  #home {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    box-shadow: 0 0 5px 1px rgba(10, 10, 10, .5);
    cursor: pointer;
    background: $basic-color;
    color: #fff;
    i {
      height: 42px;
      line-height: 42px;
    }
  }
}
</style>