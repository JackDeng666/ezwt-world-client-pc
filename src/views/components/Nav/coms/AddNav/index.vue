<script setup>
import antiShake from '@/umlib/antiShake'
import { navApi } from '@/api'
import { reactive, getCurrentInstance, watch } from 'vue'
import { guid } from '@/umlib'
const { proxy } = getCurrentInstance()
const props = defineProps({
  item: {
    type: Object,
    default: null
  }
})
const navOb = reactive({
  id: props.item?.id || guid(),
  iconUrl: props.item?.iconUrl,
  url: props.item?.url,
  title: props.item?.title
})

watch(() => {
  return navOb.url
}, (value) => {
  antiShake(() => {
    getData(value)
  }, 500)
})
const getData = async url => {
  let res = await navApi.getNavInfoByUrl({ url })
  if(res.data) {
    navOb.title = res.data.title
    navOb.iconUrl = res.data.iconUrl
  }
}
const submit = async () => {
  if(navOb.title && navOb.url) {
    proxy.returnData({ status: 1, data: navOb })
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
      <div class="title-text">{{ item ? '编辑' : '添加' }}网站捷径</div>
      <div class="del" @click="del">+</div>
    </div>
    <input class="input" type="text" placeholder="网址" v-model="navOb.url">
    <input class="input" type="text" placeholder="标题-留空自动获取" v-model="navOb.title">
    <div class="bottom">
      <img v-if="navOb.iconUrl" class="icon" :src="navOb.iconUrl">
      <div class="tip" v-else>图标自动获取，或为默认图</div>
      <div class="btn" @click="submit">{{ item ? '保存' : '添加' }}</div>
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
      border-radius: 6px;
      text-align: center;
      padding: 3px 8px;
      font-size: 13px;
      height: 20px;
      line-height: 20px;
      cursor: pointer;
    }
  }
}
</style>