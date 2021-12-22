import antiShake from './antiShake'

export default {
  install() {
    Vue.prototype.antiShake = antiShake
  }
}
