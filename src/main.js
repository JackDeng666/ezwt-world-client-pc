import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import umlib from './umlib'
import PopContent from './components/PopContent'

createApp(App).use(store).use(umlib).use(PopContent).mount('#app')
