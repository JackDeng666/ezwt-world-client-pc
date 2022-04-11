<template>
  <div class="pop-cover" :class="{show: show}">
    <div class="pop-box" :class="{'pre-close': preClose, show: show, close: !show}">
      <div class="title">{{ title }}</div>
      <span class="close" @mouseover="closeOver" @mouseout="closeOut" @click="colse"></span>
      <div class="pop-content" ref="popContent">
        <div class="scroll-view">
          <component :is="currentCom"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from '@/views/ToolView/UserInfo/index.vue'
import ImageSettings from '@/views/ToolView/ImageSettings/index.vue'
import FeedBack from '@/views/ToolView/FeedBack/index.vue'
export default {
  components: {
    UserInfo,
    ImageSettings,
    FeedBack
  },
  props: {
    title: {
      type: String,
      default: 'aaaaaaaaaaaaaaaaaaaa'
    },
    currentCom: {
      type: String,
      default: 'UserInfo'
    }
  },
  data() {
    return {
      show: false,
      preClose: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.show = true
    })
  },
  methods: {
    closeOver() {
      this.preClose = true
    },
    closeOut() {
      this.preClose = false
    },
    colse() {
      this.show = false
      setTimeout(() => {
        this.closePopContent()
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-cover {
  opacity: 0;
  transition: .3s;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99;
  background-color: rgba(0,0,0,.35);
  backdrop-filter: blur(2px);
  perspective: 1000px;
  &.show {
    opacity: 1;
  }
  .pop-box {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 100;
    width: 600px;
    height: 500px;
    top: calc(50% - 250px);
    left: calc(50% - 300px);
    background-color: #fff;
    font-size: small;
    border-radius: 10px;
    overflow: hidden;
    transition: .25s;
    &.pre-close {
      transform: rotate3d(1, 1, 0, 5deg);
    }
    &.show {
      animation-duration: .4s;
      animation-name: pop-show-animate;
    }
    &.close {
      animation-duration: .2s;
      animation-fill-mode: both;
      animation-name: pop-close-animate;
    }
    .title {
      font-size: 18px;
      font-family: "Microsoft Yahei Bold", "Microsoft Yahei", Helvetica, sans-serif, 等线;
      text-align: center;
      padding: 15px 20px;
      border-bottom: 1px solid rgba(0,0,0,.05);
    }
    .close {
      position: absolute;
      top: 5px;
      right: 5px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 20px;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      &::after, &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 25%;
        height: 1.5px;
        width: 50%;
        background-color: rgba(0, 0, 0, .8);
      }
      &::after {
        transform: rotate(-45deg);
      }
      &::before {
        transform: rotate(45deg);
      }
      &:hover {
        background-color: $basic-color;
        &::after, &::before {
          background-color: #fff;
        }
      }
    }
    .pop-content {
      flex: 1;
      height: 1px;
      padding: 0 5px;
      .scroll-view {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        /* 设置滚动条的样式 */
        &::-webkit-scrollbar {
          width: 5px;
          // height: 12px;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
          border-radius: 20px;
          background: #d8d8d8;
          &:hover {
            background: #c2c2c2;
          }
          &:active {
            background: $basic-color;
          }
        }
      }
    }
  }
}
</style>
