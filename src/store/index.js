import { createStore } from 'vuex'
import throttle from '@/umlib/throttle'

export default createStore({
  state: {
    isBgActive: false,
    isShowNavFolder: false
  },
  mutations: {
    setIsBgActive(state, data) {
      throttle(() => {
        state.isBgActive = data
      }, 200)
    },
    showNavFolder(state) {
      state.isBgActive = true
      state.isShowNavFolder = true
    },
    hideNavFolder(state) {
      state.isBgActive = false
      state.isShowNavFolder = false
    },
    toggleNavFolder(state) {
      if(state.isShowNavFolder) {
        state.isBgActive = false
        state.isShowNavFolder = false
      } else {
        state.isBgActive = true
        state.isShowNavFolder = true
      }
    }
  },
  actions: {
  }
})
