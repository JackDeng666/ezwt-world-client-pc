<script setup>
import { ref, getCurrentInstance, watch } from 'vue'
const { vnode, parent } = getCurrentInstance()
const selfIndex = vnode.key
const currentIndex = ref(parent.proxy.currentIndex)
const direction = ref(parent.proxy.direction)

watch(() => {
  return parent.proxy.currentIndex
}, (value) => {
  currentIndex.value = value
})
watch(() => {
  return parent.proxy.direction
}, (value) => {
  direction.value = value
})
</script>

<template>
  <!-- <transition :name="direction"> -->
    <div class="carousel-item">
      <slot/>
    </div>
  <!-- </transition> -->
</template>

<style lang="scss" scoped>
.carousel-item {
  width: inherit;
  height: inherit;
}
.next-enter-active,
.next-leave-active,
.prev-enter-active,
.prev-leave-active {
  transition: all .3s;
}
.next-enter-to {
  transform: translateX(0);
}
.next-enter-from {
  transform: translateX(100%);
}
.next-leave-from {
  transform: translateX(0);
}
.next-leave-to {
  transform: translateX(-100%);
}

.prev-enter-to {
  transform: translateX(0);
}
.prev-enter-from {
  transform: translateX(-100%);
}
.prev-leave-from {
  transform: translateX(0);
}
.prev-leave-to {
  transform: translateX(100%);
}
</style>