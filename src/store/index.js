import { createStore } from 'vuex'
import throttle from '@/umlib/throttle'
import { guid, spArr } from '@/umlib'

let navList = localStorage.getItem('navList') || [
  { id: guid(), title: '哔哩哔哩 (゜-゜)つロ 干杯~-bilibili', url: 'https://www.bilibili.com/', iconUrl: 'https://www.bilibili.com/favicon.ico' },
  { id: guid(), title: '淘宝网 - 淘！我喜欢', url: 'https://www.taobao.com/', iconUrl: 'https://www.taobao.com/favicon.ico' },
  { id: guid(), title: 'GitHub: Where the world builds software · GitHub', url: 'https://github.com/', iconUrl: 'https://github.githubassets.com/favicons/favicon.png' },
]
typeof navList === 'string' && (navList = JSON.parse(navList))

export default createStore({
  state: {
    isCoverShow: false,
    isNavFolderShow: false,
    navListIndex: 0,
    navList: spArr(navList, 15)
  },
  mutations: {
    setNavListIndex(state, data) {
      state.navListIndex = data
    },
    setNavList(state, data) {
      state.navList[state.navListIndex] = data
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
