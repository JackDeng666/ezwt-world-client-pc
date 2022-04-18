<script setup>
import navMove from './composition/navMove.js'

// 移动布局相关
const {
  add,
  itemRightClick,
  navList,
  navListIndex,
  currentNavOb,
  moveItemBgShow,
  hide,
  handleMousedown,
  handleMousemove,
  handleMouseup,
  dotClick
} = navMove()
</script>

<template>
<div  
  id="nav-box"
  @click.right="hide"       
  @mousemove.left="handleMousemove"
  @mouseup.left="handleMouseup">
  <div class="silde-container">
    <Carousel
      :initial="0"
      :hasDot="true"
      @dotClick="dotClick">
      <CarouselItem v-for="(citem, i) in navList" :key="i">
        <div :class="`nav-content nc-${i} real`">
          <div
            class="nav-item"
            v-for="(item, index) in navList[i]"
            :key="item.id"
            :data-id="item.id">
            <div
              class="wrap"
              @click.right.stop.prevent="itemRightClick($event, item)"
              @mousedown.left="handleMousedown($event, item)">
              <img class="icon" :src="item.iconUrl"/>
            </div>
            <span class="text">{{item.title}}</span>
          </div>
          <!-- 添加按钮 -->
          <div v-if="navList[i].length < 15" class="add-item">
            <div
              class="wrap"
              @click.left="add">
              <div class="add">+</div>
            </div>
            <span class="text">添加</span>
          </div>
        </div>
      </CarouselItem>
    </Carousel>
  </div>
  <!-- 当前拖动的虚拟滑块 -->
  <div class="virtual-nav-item" ref="virtual-nav-item">
    <div :class="['wrap', moveItemBgShow ? 'show-bg' : '']">
      <img class="icon" :src="currentNavOb?.iconUrl"/>
    </div>
    <span class="text">{{currentNavOb?.title}}</span>
  </div>
</div>
</template>

<style lang="scss" scoped>
#nav-box {
  width: 100%;
  user-select: none;
  .silde-container {
    width: 660px;
    height: 366px;
    margin: 0 auto;
    .nav-content {
      // margin: 0 auto;
      // width: 660px;
      display: flex;
      flex-wrap: wrap;
      .nav-item {
        width: 132px;
        height: 122px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: none;
        color: #fff;
        font-size: 14px;
        .wrap {
          width: 80px;
          height: 80px;
          border-radius: 5px;
          background-color: rgba(255, 255, 255, .7);
          cursor: pointer;
          margin-bottom: 8px;
          position: relative;
          &:hover {
            background-color: rgba(255, 255, 255, .1);
          }
          .icon {
            width: 50px;
            height: 50px;
            border-radius: 10px;
            background-color: #fff;
            padding: 8px;
            pointer-events: none;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .text {
          max-width: 132px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;  
        }
      }
      .add-item {
        width: 132px;
        height: 122px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: none;
        color: #fff;
        font-size: 14px;
        .wrap {
          width: 80px;
          height: 80px;
          border-radius: 5px;
          background-color: rgba(255, 255, 255, .7);
          cursor: pointer;
          margin-bottom: 8px;
          position: relative;
          &:hover {
            background-color: rgba(255, 255, 255, .1);
          }
          .add {
            font-weight: 0;
            text-align: center;
            line-height: 80px;
            font-size: 50px;
          }
        }
      }
    }
  }
  .virtual-nav-item {
    width: 132px;
    height: 122px;
    position: fixed;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 14px;
    .wrap {
      width: 80px;
      height: 80px;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, .1);
      cursor: pointer;
      margin-bottom: 8px;
      position: relative;
      &.show-bg {
        background-color: rgba(255, 255, 255, .7);
      }
      .icon {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        background-color: #fff;
        padding: 8px;
        pointer-events: none;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .text {
      max-width: 132px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>