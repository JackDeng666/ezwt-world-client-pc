<template>
  <div id="nav-box" @click.left="leftClick" @click.right.prevent="">
    <div id="nav-content">
      <div v-for="(item, index) in navList" class="nav-item" :key="index" @click.left.stop="itemClick" @click.right.prevent.stop="itemRightClick">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  methods: {
    leftClick() {
      this.$store.commit('hideNavFolder')
    },
    itemClick(e) {
      console.log("item", e)
    },
    itemRightClick(e) {
      console.log("item", e)
    }
  },
  setup () {
    const state = reactive({
      navList: 8,
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
#nav-box {
  width: 100%;
  #nav-content {
    margin: 0 auto;
    width: 720px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .nav-item {
      width: 100px;
      height: 100px;
      margin: 10px;
      border-radius: 10px;
      text-align: center;
      // background-color: rgba(255, 255, 255, .1);
      background-color: rgb(235,235,235);
      cursor: pointer;
      transition: background-color .35s;
    }
  }
}
</style>