<script setup>
import antiShake from '@/umlib/antiShake'
import { navApi } from '@/api'
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
const iconSrc = ref('')
const url = ref('')
const title = ref('')

watch(() => {
  return url.value
}, (value) => {
  antiShake(() => {
    getData(value)
  }, 500)
})
const getData = async url => {
  let res = await navApi.getNavInfoByUrl({ url })
  if(res.data) {
    title.value = res.data.title
    iconSrc.value = res.data.icon
  }
}
const add = async () => {
  if(title.value) {
    proxy.returnData({ status: 1, data: { title: title.value, url: url.value, iconSrc: iconSrc.value } })
  } else {
    console.log("不行")
  }
}
const del = async () => {
  proxy.returnData({ status: 0 })
}
</script>

<template>
  <div class="add-nav-wrap" @click.stop="">
    <div class="title">
      <div class="title-text">添加网站捷径</div>
      <div class="del" @click="del">+</div>
    </div>
    <input class="input" type="text" placeholder="网址" v-model="url">
    <input class="input" type="text" placeholder="标题-留空自动获取" v-model="title">
    <div class="bottom">
      <img v-if="iconSrc" class="icon" :src="iconSrc">
      <div class="tip" v-else>图标自动获取</div>
      <div class="btn" @click="add">添加</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-nav-wrap {
  .title {
    margin: 6px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-text {
      font-size: 14px;
    }
    .del {
      font-size: 24px;
      transform: rotate(45deg);
      cursor: pointer;
    }
  }
  .input {
    box-sizing: content-box;
    display: block;
    margin: 6px 0;
    border: none;
    outline: none;
    padding: 4px 10px;
    border-radius: 5px;
    background: rgba(0,0,0,.05);
    width: 260px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }
  .bottom {
    margin: 6px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .tip {
      font-size: 14px;
      color: #606060;
    }
    .btn {
      box-sizing: content-box;
      background: $basic-color;
      color: #fff;
      border-radius: 10px;
      text-align: center;
      padding: 4px 10px;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      cursor: pointer;
    }
  }
}
</style>