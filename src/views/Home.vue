<template>
  <Background/>
  <Search :class="{show: true, active: !$store.state.showNavFolder}"/>
  <Nav class="nav" v-if="$store.state.showNavFolder"/>
</template>

<script>
import Background from './components/Background/'
import Search from './components/Search/'
import Nav from './components/Nav/'
export default {
  name: 'Home',
  components: {
    Background,
    Search,
    Nav
  }
}
</script>

<style lang="scss" scoped>
.show {
  opacity: 0;
  pointer-events: none;
}
.active {
  opacity: 1;
  pointer-events: auto;
}
</style>
