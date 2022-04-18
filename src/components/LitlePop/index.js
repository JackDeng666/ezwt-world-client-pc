import LitlePopConstructor from './LitlePop.vue'
import { createApp } from 'vue'

const mountNode = document.createElement('div')
document.body.appendChild(mountNode)

let PopWrap = null

const show = (component, event, cOptions) => {
  return new Promise((resolve, reject) => {
    if(!PopWrap) {
      // 先挂外层样式
      PopWrap = createApp(LitlePopConstructor, { event })
      PopWrap.mixin({
        methods: {
          closePopContent() {
            PopWrap.unmount()
            PopWrap = null
          }
        },
      })
      PopWrap.mount(mountNode)
      mountNode.removeAttribute('data-v-app') // 我就非要去了这东西

      let content = createApp(component, cOptions)
      content.mixin({
        methods: {
          returnData(res) {
            resolve(res)
          }
        }
      })
      const contentDom = document.querySelector('.litle-pop-content')
      content.mount(contentDom)
      contentDom.removeAttribute('data-v-app') // 我就非要去了这东西
      PopWrap._instance.proxy.calcPosition()
    }
  })
}

const hide = () => {
  if (PopWrap) {
    PopWrap.unmount()
    PopWrap = null
  }
}

export default {
  install(app) {
    app.config.globalProperties.$litlePop = {
      show,
      hide
    }
  }
}
