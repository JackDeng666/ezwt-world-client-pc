import { useStore } from "vuex"

export default function mouseFuc() {
  const store = useStore()
  // 鼠标右击事件
  const bgRightClick = () => {
    store.commit('toggleNavFolder')
    store.commit('toggleCoverShow')
  }
  const bgLeftClick = () => {
    if(!store.state.isNavFolderShow) {
      store.commit('hideCover')
    }
  }
  return {
    bgRightClick,
    bgLeftClick
  }
}
