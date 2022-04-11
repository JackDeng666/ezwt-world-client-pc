import { createStore } from 'vuex'
import throttle from '@/umlib/throttle'

export default createStore({
  state: {
    isCoverShow: false,
    isNavFolderShow: false,
    navList: [  
      { id: '01', text: '哔哩哔哩' },
      { id: '02', text: '淘宝' },
      { id: '03', text: 'npm' },
      { id: '04', text: 'dd' },
      { id: '05', text: 'gg' },
      { id: '06', text: 'hh' },
      { id: '07', text: 'jj' },
      { id: '08', text: 'mm' }
    ]
  },
  mutations: {
    setNavList(state, data) {
      state.navList = data
    },
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
