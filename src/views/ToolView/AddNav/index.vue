<script setup>
import { navApi } from '@/api'
const add = async () => {
  let res = await navApi.getNavInfoByUrl({url: 'https://wallhaven.cc/'})
  console.log(res)
}
</script>

<template>
  <div>
    <div class="btn" @click="add">ppp</div>
  </div>
</template>

<style lang="scss" scoped>

</style>