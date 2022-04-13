<script setup>
import CarouselDot from './CarouselDot'
import { ref, getCurrentInstance } from 'vue'
const { slots } = getCurrentInstance()
const props = defineProps({
  initial: {
    type: Number,
    default: 0
  },
  hasDot: {
    type: Boolean,
    default: true
  }
})
const currentIndex = ref(props.initial)
const itemLen = ref(slots.default()[0].children.length)
const direction = ref('next')
const dotBgColor = getComputedStyle(document.documentElement).getPropertyValue('--basic-color')

const setIndex = (index) => {
  if(currentIndex.value > index) {
    direction.value = 'prev'
  } else {
    direction.value = 'next'
  }
  currentIndex.value = index
}
const dotClick = (index) => {
  setIndex(index)
}
</script>

<template>
  <div class="carousel">
    <div class="inner">
      <slot/>
    </div>
    <CarouselDot
      :currentIndex="currentIndex"
      :itemLen="itemLen"
      :dotBgColor="dotBgColor"
      @dotClick="dotClick"/>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  height: 100%;
  .inner {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
}
</style>