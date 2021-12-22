import { createStore } from 'vuex'
import throttle from '@/umlib/throttle'

export default createStore({
  state: {
    isBgActive: false,
    showNavFolder: false
  },
  mutations: {
    setIsBgActive(state, data) {
      throttle(() => {
        state.isBgActive = data
      }, 200)
    },
    toggleNavFolder(state) {
      if(state.showNavFolder) {
        state.isBgActive = false
        state.showNavFolder = false
      } else {
        state.isBgActive = true
        state.showNavFolder = true
      }
    }
  },
  actions: {
  }
})
