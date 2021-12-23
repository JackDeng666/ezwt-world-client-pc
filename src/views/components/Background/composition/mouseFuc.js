import { useStore } from "vuex"

export default function mouseFuc() {
  const store = useStore()
  // 鼠标右击事件
  const bgRightClick = () => {
    store.commit('showNavFolder')
  }
  const bgLeftClick = () => {
    store.commit('hideNavFolder')
  }
  return {
    bgRightClick,
    bgLeftClick
  }
}
