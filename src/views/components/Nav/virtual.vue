<template>
<div id="nav-box">
  <!-- 计算位置的虚拟dom -->
  <div class="nav-content virtual">
    <div
      class="nav-item"
      v-for="(item, index) in $store.state.navList" 
      :data-id="item.id">
      <div class="wrap"></div>
      <div>{{item.text}}</div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
#nav-box {
  width: 100%;
  .nav-content {
    margin: 0 auto;
    width: 650px;
    display: flex;
    flex-wrap: wrap;
    .nav-item {
      padding: 10px 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      user-select: none;
      transition: none;
      color: #fff;
      font-size: 14px;
      .wrap {
        width: 80px;
        height: 80px;
        text-align: center;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, .7);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-bottom: 8px;
      }
    }
  }
}
</style>