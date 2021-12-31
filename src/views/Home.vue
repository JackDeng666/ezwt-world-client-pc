<template>
  <Background/>
  <div id="center">
    <Search class="search" :class="{active: !$store.state.isShowNavFolder}"/>
    <Nav class="nav" v-if="$store.state.isShowNavFolder"/>
  </div>
  <FloatingTool/>
</template>

<script>
import Background from './components/Background/'
import Search from './components/Search/'
import Nav from './components/Nav/'
import FloatingTool from './components/FloatingTool/'
export default {
  name: 'Home',
  components: {
    Background,
    Search,
    Nav,
    FloatingTool
  }
}
</script>

<style lang="scss" scoped>
#center {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  .search {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%);
    opacity: 0;
    pointer-events: auto;
    &.active {
      opacity: 1;
    }
  }
  .nav {
    pointer-events: auto;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>
