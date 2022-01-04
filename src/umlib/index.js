import antiShake from './antiShake'
import throttle from './throttle'

export default {
  install(app) {
    app.config.globalProperties.$antiShake = antiShake
    app.config.globalProperties.$throttle = throttle
  }
}
