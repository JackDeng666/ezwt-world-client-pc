import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import PopContent from './components/PopContent'

createApp(App).use(store).use(PopContent).mount('#app')
