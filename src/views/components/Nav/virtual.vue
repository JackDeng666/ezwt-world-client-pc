<template>
<div id="nav-box">
  <!-- 计算位置的虚拟dom -->
  <div class="nav-content virtual">
    <div
      class="nav-item"
      v-for="(item, index) in $store.state.navList" 
      :data-id="item.id">
      <div class="wrap">{{item.id}}</div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
#nav-box {
  width: 100%;
  .nav-content {
    margin: 0 auto;
    width: 720px;
    display: flex;
    flex-wrap: wrap;
    .nav-item {
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      user-select: none;
      .wrap {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        text-align: center;
        background-color: rgba(255, 255, 255, .7);
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
}
</style>