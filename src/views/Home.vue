<template>
  <Background/>
  <!-- <div class="center" @click.right.prevent="">
    <virtualNav class="virtual-nav" v-if="$store.state.isNavFolderShow"/>
  </div> -->
  <div class="center" @click.right.prevent="">
    <Search class="search" :class="{active: !$store.state.isNavFolderShow}"/>
    <Nav class="nav" v-if="$store.state.isNavFolderShow"/>
  </div>
  <FloatingTool/>
</template>

<script setup>
import Background from './components/Background/'
import Search from './components/Search/'
import Nav from './components/Nav/'
// import virtualNav from './components/Nav/virtual'
import FloatingTool from './components/FloatingTool/'
</script>

<style lang="scss" scoped>
.center {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  .search {
    position: fixed;
    top: 200px;
    opacity: 0;
    pointer-events: none;
    &.active {
      opacity: 1;
      pointer-events: auto;
    }
  }
  .nav {
    pointer-events: auto;
  }
  // .virtual-nav {
  //   margin-top: 245px;
  //   pointer-events: auto;
  //   visibility: hidden;
  // }
}
</style>
