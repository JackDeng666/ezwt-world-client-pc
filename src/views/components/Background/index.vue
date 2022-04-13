<template>
  <img id="bg-img" :class="{active: $store.state.isCoverShow}" src="/images/bg1.jpg">
  <div id="cover" :class="{coverActive: $store.state.isCoverShow}" @click.left="bgLeftClick" @click.right.prevent="bgRightClick"></div>
</template>

<script setup>
import { useStore } from "vuex"
const store = useStore()
// 鼠标右击事件
const bgRightClick = () => {
  store.commit('toggleNavFolder')
  store.commit('toggleCoverShow')
}
const bgLeftClick = () => {
  if(!store.state.isNavFolderShow) {
    store.commit('hideCover')
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
    user-select: none;
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
    user-select: none;
  }
}
</style>