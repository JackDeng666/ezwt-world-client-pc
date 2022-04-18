<template>
<div class="pop-wrap" @click="" @click.right.prevent="">
  <div ref='litle-pop-box' :class="['litle-pop-box', visibility === 'visible' ? 'animate_bounce' : '']" :style="{ left, top, visibility }">
    <div class="litle-pop-content">{{ text }}</div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => {}
    },
    text: {
      type: String,
      default: '123456789'
    }
  },
  data() {
    return {
      left: 0,
      top: 0,
      visibility: 'hidden'
    }
  },
  methods: {
    calcPosition() {
      let targetRect = this.event.target.getBoundingClientRect()
      let targetTop = targetRect.top, targetLeft = targetRect.left, targetWidth = targetRect.width
      this.left = `${targetLeft + targetWidth / 2 - this.$refs['litle-pop-box'].offsetWidth / 2}px`
      this.top = `${targetTop - this.$refs['litle-pop-box'].offsetHeight - 10}px`
      this.visibility = 'visible'
    },
    bgClick() {
      this.closePopContent()
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  .litle-pop-box {
    position: fixed;
    background: #fff;
    font-size: small;
    border-radius: 10px;
    padding: 16px;
    transition: none;
    &::before {
      content: "";
      position: absolute;
      bottom: -18px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border: 10px solid;
      border-color:#fff transparent transparent;
    }
  }
}
</style>
