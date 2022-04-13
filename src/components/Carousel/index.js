import Carousel from './Carousel.vue';
import CarouselItem from './CarouselItem.vue';

export default {
  install(Vue) {
    Vue.component('Carousel', Carousel);
    Vue.component('CarouselItem', CarouselItem);
  }
}
