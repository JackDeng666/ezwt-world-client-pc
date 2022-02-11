import PopContentConstructor from './PopContent.vue'
import { createApp } from 'vue'
import store from '@/store'

const mountNode = document.createElement('div')
document.body.appendChild(mountNode)

let PopContent = null

const show = options => {
  if(!PopContent) {
    PopContent = createApp(PopContentConstructor, options)
    PopContent.mixin({
      methods: {
        closePopContent() {
          PopContent.unmount()
          PopContent = null
        }
      },
    })
    PopContent.use(store).mount(mountNode)
    mountNode.removeAttribute('data-v-app') // 我就非要去了这东西
  }
}

const hide = () => {
  if (PopContent) {
    PopContent.unmount()
    PopContent = null
  }
}

export default {
  install(app) {
    app.config.globalProperties.$popContent = {
      show,
      hide
    }
  }
}
