<template>
  <div id="nav-box" @click.right.prevent="rightClick">
    <div v-for="(item, index) in navList" class="nav-item" :key="index" @click.right.prevent.stop="itemClick">
      {{item}}{{index}}
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  methods: {
    rightClick() {
      this.$store.commit('toggleNavFolder')
    },
    itemClick(e) {
      console.log("item", e)
    }
  },
  setup () {
    const state = reactive({
      navList: 5,
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
#nav-box {
  margin: 0 auto;
  width: 65%;
  .nav-item {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 25px;
    margin-top: 10px;
    margin-bottom: 40px;
    border-radius: 10px;
    text-align: center;
    // background-color: rgba(255, 255, 255, .1);
    background-color: rgb(235,235,235);
    cursor: pointer;
    transition: background-color .35s;
  }
}
</style>