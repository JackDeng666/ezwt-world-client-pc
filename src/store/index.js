import { createStore } from 'vuex'
import throttle from '@/umlib/throttle'
import genshinImgList from '@/umlib/genshinImgList'
import { getRandom, guid } from '@/umlib'

export default createStore({
  state: {
    isCoverShow: false,
    isNavFolderShow: false,
    navListIndex: 0,
    navList: [
      [
        { id: guid(), text: '哔哩哔哩', url: 'https://www.bilibili.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '淘宝', url: 'https://www.taobao.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: 'github', url: 'https://github.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: 'web骇客', url: 'https://www.webhek.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '菜鸟教程', url: 'https://www.runoob.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: 'MDN Web 文档', url: 'https://developer.mozilla.org/zh-CN/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: 'w3school', url: 'https://www.w3school.com.cn/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '菜鸟教程', url: 'https://www.runoob.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: 'MDN Web 文档', url: 'https://developer.mozilla.org/zh-CN/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: 'w3school', url: 'https://www.w3school.com.cn/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
      ],
      [
        { id: guid(), text: '2哔哩哔哩', url: 'https://www.bilibili.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '2淘宝', url: 'https://www.taobao.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '2github', url: 'https://github.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '2web骇客', url: 'https://www.webhek.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '2菜鸟教程', url: 'https://www.runoob.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '2MDN Web 文档', url: 'https://developer.mozilla.org/zh-CN/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '2w3school', url: 'https://www.w3school.com.cn/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '2菜鸟教程', url: 'https://www.runoob.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '2MDN Web 文档', url: 'https://developer.mozilla.org/zh-CN/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '2w3school', url: 'https://www.w3school.com.cn/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
      ],
      [
        { id: guid(), text: '3菜鸟教程', url: 'https://www.runoob.com/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '3MDN Web 文档', url: 'https://developer.mozilla.org/zh-CN/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
        { id: guid(), text: '3w3school', url: 'https://www.w3school.com.cn/', iconUrl: genshinImgList[getRandom(0, genshinImgList.length - 1)] },
      ]
    ]
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
