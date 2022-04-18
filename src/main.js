import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import PopContent from './components/PopContent'
import LitlePop from './components/LitlePop'
import Carousel from './components/Carousel'

document.addEventListener("error", function (event) {
  let ev = event || window.event
  let elem = ev.target

  if (elem.tagName.toLowerCase() == 'img') { 
    elem.src = "images/comical.png"
  }
}, true)

createApp(App).use(store).use(PopContent).use(LitlePop).use(Carousel).mount('#app')
