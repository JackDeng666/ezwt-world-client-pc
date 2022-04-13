import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import PopContent from './components/PopContent'
import Carousel from './components/Carousel'

createApp(App).use(store).use(PopContent).use(Carousel).mount('#app')
