<template>
  <img id="bg-img" :class="{active: $store.state.isBgActive}" src="/images/bg2.jpg">
  <div id="cover" :class="{coverActive: $store.state.isBgActive}" @click.left="bgLeftClick" @click.right.prevent="bgRightClick"></div>
</template>

<script>
import mouseFuc from './composition/mouseFuc'
export default {
  setup() {
    // 鼠标事件
    let { bgRightClick, bgLeftClick } = mouseFuc()
    return {
      bgRightClick,
      bgLeftClick
    }
  }
}
</script>

<style lang="scss" scoped>
#bg-img {
  z-index: -3;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s,transform .25s,filter .25s;
  backface-visibility: hidden;
  &.active {
    transform: scale(1.1);
  }
}
#cover {
  z-index: -1;
  opacity: 0;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // background-image: radial-gradient(rgba(0,0,0,0) 0,rgba(0,0,0,.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,.3) 166%);
  background-color: rgba(0,0,0,.5);
  transition: .25s;
  &.coverActive {
    opacity: 1;
  }
}
</style>