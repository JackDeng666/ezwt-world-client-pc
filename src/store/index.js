import { createStore } from 'vuex'
import throttle from '@/umlib/throttle'

export default createStore({
  state: {
    isCoverShow: false,
    isNavFolderShow: false
  },
  mutations: {
    showCover(state) {
      throttle(() => {
        state.isCoverShow = true
      }, 200)
    },
    hideCover(state) {
      throttle(() => {
        state.isCoverShow = false
      }, 200)
    },
    toggleCoverShow(state) {
      throttle(() => {
        if(state.isCoverShow) {
          state.isCoverShow = false
        } else {
          state.isCoverShow = true
        }
      }, 200)
    },
    showNavFolder(state) {
      state.isNavFolderShow = true
    },
    hideNavFolder(state) {
      state.isNavFolderShow = false
    },
    toggleNavFolder(state) {
      if(state.isNavFolderShow) {
        state.isNavFolderShow = false
      } else {
        state.isNavFolderShow = true
      }
    }
  },
  actions: {
  }
})
