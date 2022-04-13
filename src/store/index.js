import { createStore } from 'vuex'
import throttle from '@/umlib/throttle'
import genshinImgList from '@/umlib/genshinImgList'
import { getRandom } from '@/umlib'

export default createStore({
  state: {
    isCoverShow: false,
    isNavFolderShow: false,
    navList: [  
      { id: '01', text: '哔哩哔哩', url: 'https://www.bilibili.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
      { id: '02', text: '淘宝', url: 'https://www.taobao.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
      { id: '03', text: 'github', url: 'https://github.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
      { id: '04', text: 'web骇客', url: 'https://www.webhek.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
      { id: '05', text: '菜鸟教程', url: 'https://www.runoob.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
      { id: '06', text: 'MDN Web 文档', url: 'https://developer.mozilla.org/zh-CN/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
      { id: '07', text: 'w3school', url: 'https://www.w3school.com.cn/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
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
