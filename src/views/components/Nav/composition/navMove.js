import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import { useStore } from 'vuex'
import antiShake from '@/umlib/antiShake'
import AddNav from '../coms/AddNav'
import { getElementPosition, spArr, guid } from '@/umlib'

import Flipping from 'flipping/dist/flipping.web'
let flipping = new Flipping({
  duration: 300
})

let navListStrOrDefualt = localStorage.getItem('navList') || [
  { id: guid(), title: '1哔哩哔哩', url: 'https://www.bilibili.com/', iconUrl: 'https://www.bilibili.com/favicon.ico' },
  { id: guid(), title: '2淘宝', url: 'https://www.taobao.com/', iconUrl: 'https://www.taobao.com/favicon.ico' },
  { id: guid(), title: '3GitHub: Where the world builds software · GitHub', url: 'https://github.com/', iconUrl: 'https://github.githubassets.com/favicons/favicon.png' },
  { id: guid(), title: '4哔哩哔哩', url: 'https://www.bilibili.com/', iconUrl: 'https://www.bilibili.com/favicon.ico' },
  { id: guid(), title: '5淘宝', url: 'https://www.taobao.com/', iconUrl: 'https://www.taobao.com/favicon.ico' },
  { id: guid(), title: '6GitHub: Where the world builds software · GitHub', url: 'https://github.com/', iconUrl: 'https://github.githubassets.com/favicons/favicon.png' },
  { id: guid(), title: '7哔哩哔哩', url: 'https://www.bilibili.com/', iconUrl: 'https://www.bilibili.com/favicon.ico' },
  { id: guid(), title: '8淘宝', url: 'https://www.taobao.com/', iconUrl: 'https://www.taobao.com/favicon.ico' },
  { id: guid(), title: '9GitHub: Where the world builds software · GitHub', url: 'https://github.com/', iconUrl: 'https://github.githubassets.com/favicons/favicon.png' },
  { id: guid(), title: '10哔哩哔哩', url: 'https://www.bilibili.com/', iconUrl: 'https://www.bilibili.com/favicon.ico' },
  { id: guid(), title: '11淘宝', url: 'https://www.taobao.com/', iconUrl: 'https://www.taobao.com/favicon.ico' },
  { id: guid(), title: '12GitHub: Where the world builds software · GitHub', url: 'https://github.com/', iconUrl: 'https://github.githubassets.com/favicons/favicon.png' },
  { id: guid(), title: '13哔哩哔哩', url: 'https://www.bilibili.com/', iconUrl: 'https://www.bilibili.com/favicon.ico' },
  { id: guid(), title: '14淘宝', url: 'https://www.taobao.com/', iconUrl: 'https://www.taobao.com/favicon.ico' },
  { id: guid(), title: '15GitHub: Where the world builds software · GitHub', url: 'https://github.com/', iconUrl: 'https://github.githubassets.com/favicons/favicon.png' },
  { id: guid(), title: '16哔哩哔哩', url: 'https://www.bilibili.com/', iconUrl: 'https://www.bilibili.com/favicon.ico' },
  { id: guid(), title: '17淘宝', url: 'https://www.taobao.com/', iconUrl: 'https://www.taobao.com/favicon.ico' },
  { id: guid(), title: '18GitHub: Where the world builds software · GitHub', url: 'https://github.com/', iconUrl: 'https://github.githubassets.com/favicons/favicon.png' },
  { id: guid(), title: '19哔哩哔哩', url: 'https://www.bilibili.com/', iconUrl: 'https://www.bilibili.com/favicon.ico' },
  { id: guid(), title: '20淘宝', url: 'https://www.taobao.com/', iconUrl: 'https://www.taobao.com/favicon.ico' },
  { id: guid(), title: '21GitHub: Where the world builds software · GitHub', url: 'https://github.com/', iconUrl: 'https://github.githubassets.com/favicons/favicon.png' },
]
typeof navListStrOrDefualt === 'string' && (navListStrOrDefualt = JSON.parse(navListStrOrDefualt))

export default function () {
  const { proxy } = getCurrentInstance()
  const store = useStore()
  const navListStore = ref(navListStrOrDefualt)
  const navList = computed(() => {
    return spArr(navListStore.value, 15)
  })
  const navListIndex = ref(0)
  // let changeArr = JSON.parse(JSON.stringify(navList.value[navListIndex.value]))
  const currentNavOb = ref(null)
  const dragId = ref(-1)
  const moveItemBgShow = ref(false)
  let dragStartTime = 0
  let dragIndex = navListIndex.value
  let swapReset = false
  let areaData = []
  let curentAreaData = null, firtDragArea = null
  let currentMoveItem = null
  let navItems = [] // 当前显示的导航块
  let startX = 0, startY = 0, moveObStyle = null
  let canCalc = true

  onMounted(() => {
    navItems = document.querySelectorAll(`.nav-item`)
    calcAreaData()
  })

  // 视图方法
  const add = (e) => {
    proxy.$litlePop.show(AddNav, e).then(res => {
      if(res.status) {
        proxy.navList[proxy.navListIndex].push(res.data) // 添加到当前视图
        // changeArr = JSON.parse(JSON.stringify(proxy.navList[proxy.navListIndex])) // changeArr更新
        // store.commit('setNavList', proxy.navList[proxy.navListIndex]) // 虚拟视图更新
        // 更新到localStorage
        localStorage.setItem('navList', JSON.stringify(proxy.navList.flat()))
        proxy.$nextTick(() => {
          navItems = document.querySelectorAll(`.nav-item`)
          calcAreaData() // 计算新位置
        })
      }
      proxy.$litlePop.hide()
    })
  }
  const itemRightClick = (e, item) => {
    proxy.$litlePop.show(AddNav, e, { item }).then(res => {
      if(res.status) {
        let item = proxy.navList[proxy.navListIndex].find(ef => ef.id == res.data.id) // 当前修改的item
        item.url = res.data.url
        item.title = res.data.title
        item.iconUrl = res.data.iconUrl
        // changeArr = JSON.parse(JSON.stringify(proxy.navList[proxy.navListIndex])) // changeArr更新
        // 更新到localStorage
        localStorage.setItem('navList', JSON.stringify(proxy.navList.flat()))
      }
      proxy.$litlePop.hide()
    })
  }
  const hide = () => {
    store.commit('hideNavFolder')
    store.commit('hideCover')
  }
  const handleMousedown = (e, item) => {
    dragIndex = navListIndex.value
    dragId.value = item.id
    currentNavOb.value = item
    dragStartTime = Date.now()
    startX = e.x, startY = e.y
    // 显示可拖动的虚拟dom
    curentAreaData = findCurrent(item.id, navListIndex.value)
    // 隐藏原内容块
    hideNavItem()
    firtDragArea = curentAreaData
    moveItemBgShow.value = false
    moveObStyle = proxy.$refs['virtual-nav-item'].style
    moveObStyle.cssText = `
      display: flex;
      left: ${curentAreaData.left }px;
      top: ${curentAreaData.top }px;
      z-index: 999;
      transition: none;
    `
  }
  const handleMousemove = (e) => {
    if(dragId.value == -1) return
    let obx = firtDragArea.left + e.x - startX,
        oby = firtDragArea.top + e.y - startY
    moveObStyle.left = `${obx}px`
    moveObStyle.top = `${oby}px`
    // 判断是否可以计算交换
    canCalc && antiShake(() => {
      calcPosition(obx, oby)
    }, 300)
  }
  const handleMouseup = (e) => {
    if(Date.now() - dragStartTime < 100) {
      window.open(currentNavOb.value.url)
    }
    dragId.value !== -1 && reset()
  }
  const carouselIndexChange = (index) => {
    navListIndex.value = index
    // changeArr = JSON.parse(JSON.stringify(navList.value[index]))
    // store.commit('setNavListIndex', index)
    proxy.$nextTick(() => {
      navItems = document.querySelectorAll(`.nav-item`)
      calcAreaData()
    })
  }
  const leftClick = () => {
    proxy.$refs['carouselRef'].leftClick()
  }
  const rightClick = () => {
    proxy.$refs['carouselRef'].rightClick()
  }
  const directMouseenter = direct => {
    if(dragId.value == -1) return
    canCalc = false
    antiShake(() => {
      direct == 0 ? leftClick() : rightClick()
      canCalc = true
    }, 500)
  }

  return {
    add,
    itemRightClick,
    navList,
    navListIndex,
    currentNavOb,
    moveItemBgShow,
    hide,
    handleMousedown,
    handleMousemove,
    handleMouseup,
    carouselIndexChange,
    leftClick,
    rightClick,
    directMouseenter
  }
  // 内部方法
  function calcPosition(obx, oby) { // 计算交换位置
    if(dragId.value == -1) return
    let flag, changeObIndex // 标识：1交换位置，2右推位置，目标：交换或右推的目标
    // 拖拽中点
    let obcx = obx + curentAreaData.width / 2,
        obcy = oby + curentAreaData.height / 2,
        len = areaData[navListIndex.value].length
    for(let i = 0; i < len; i++) {
      let el = areaData[navListIndex.value][i]
      let cobcx = el.left + el.width / 2,
          cobcy = el.top + el.height / 2
      if( obcx > cobcx - 25 && obcx < cobcx + 25 && obcy > cobcy - 25 && obcy < cobcy + 25 ) {
        flag = 1
        changeObIndex = i
        break
      }
      if(obcx > el.left - 25 && obcx < el.left + 25 && obcy > cobcy - 25 && obcy < cobcy + 25) {
        flag = 2
        changeObIndex = i
        break
      }
      flag = 0
    }
    // 计算changeObIndex处于一维数组位置
    changeObIndex = changeObIndex + navListIndex.value * 15
    if(flag) {
      // 交换数据
      let index = null
      navListStore.value.forEach((el, i) => el.id == dragId.value && (index = i))
      // changeArr.forEach((el, i) => el.id == dragId.value && (index = i))
      if(index !== changeObIndex) {
        flipping.read()

        flag == 1 && swapArrItem(navListStore.value, index, changeObIndex) // 位于中心
        flag == 2 && moveArrItem(navListStore.value, index, changeObIndex) // 位于左侧

        // console.log(navListStore.value)
        // store.commit('setNavListIndex', navListIndex)
        // store.commit('setNavList', JSON.parse(JSON.stringify(changeArr)))
        // navList.value[navListIndex.value] = JSON.parse(JSON.stringify(changeArr))

        // 等待虚拟dom渲染后再计算
        proxy.$nextTick(() => {
          // 先把更新后的拖拽item变为隐藏
          navItems = document.querySelectorAll(`.nav-item`)
          hideNavItem()
          flipping.flip() // 执行动画
          calcAreaData() // 计算当前交换后的位置
          curentAreaData = findCurrent(dragId.value, navListIndex.value) // 更新当前拖拽位置
          swapReset = true // 添加交换位置后的重置位置标识
        })
      }
    }
  }
  function moveArrItem (arr, cKey, oKey) { // arr目标数组  cKey移动元素下标，oKey目标元素下标
    if(cKey > oKey) {
      arr.splice(oKey, 0, arr[cKey]); // 移动到指定元素之前
      arr.splice(cKey + 1, 1); // 移除原来位置上的该元素
    } else {
      let temp = arr[cKey]
      arr.splice(cKey, 1); // 移除原来位置上的该元素
      arr.splice(oKey - 1, 0, temp); // 移动到指定元素之前
    }
  }
  function swapArrItem(arr, cKey, oKey) { 
    let temp = arr[cKey]
    arr[cKey] = arr[oKey]
    arr[oKey] = temp
  }
  function calcAreaData() { // 计算每块导航块所在位置
    navList.value.forEach((el, i) => {
      areaData[i] = []
      let calcNavItems = document.querySelectorAll(`.nav-content.nc-${navListIndex.value}.real .nav-item`)
      calcNavItems.forEach(el => {
        let { left, top } = getElementPosition(el)
        areaData[i].push({
          id: el.attributes['data-flip-key'].value,
          rawleft: left,
          left: left - i * 660,
          top,
          width: el.offsetWidth,
          height: el.offsetHeight
        })
      })
    })
    // let virtualNavItems = document.querySelectorAll('.nav-content.virtual .nav-item')
    // virtualNavItems.forEach(el => {
    //   areaData[navListIndex.value].push({
    //     id: el.attributes['data-flip-key'].value,
    //     left: el.offsetLeft,
    //     top: el.offsetTop,
    //     width: el.offsetWidth,
    //     height: el.offsetHeight
    //   })
    // })
  }
  function findCurrent(value, i) {
    return areaData[i].find(ef => ef.id == value)
  }
  function hideNavItem() {
    currentMoveItem = Array.from(navItems).find(ef => ef.attributes['data-flip-key'].value == curentAreaData.id)
    currentMoveItem.style.transition = 'none'
    currentMoveItem.style.opacity = '0'
  }
  function reset() { // 移动元素回到原来位置或者当前位置
    moveObStyle.transition = 'all .3s'
    moveObStyle.zIndex = 1
    if(swapReset) {
      moveObStyle.left = `${curentAreaData.left }px`
      swapReset = false
    } else {
      moveObStyle.left = `${curentAreaData.left + (dragIndex - navListIndex.value) * 660 }px`
    }
    moveObStyle.top = `${curentAreaData.top }px`
    moveItemBgShow.value = true
    dragId.value = -1
    setTimeout(() => {
      currentMoveItem.style.transition = 'none'
      currentMoveItem.style.opacity = '1'
      moveObStyle.display = 'none'
      // cancelFixed()
      // 保存最新数据到localStorage
      localStorage.setItem('navList', JSON.stringify(navListStore.value))
    }, 300)
  }
  // function changeToFixed() { // 改为固定布局，展示动画
  //   navItems.forEach(el => {
  //     let a = findCurrent(el.attributes['data-flip-key'].value)
  //     el.style.cssText = el.style.cssText + `
  //       transition: all .3s;
  //       position: fixed;
  //       left: ${a.left }px;
  //       top: ${a.top }px;
  //     `
  //   })
  // }
  // function cancelFixed() { // 取消固定位置，可滑动
  //   navList.value[navListIndex.value] = JSON.parse(JSON.stringify(changeArr))
  //   navItems.forEach(el => {
  //     el.style.position = 'static' 
  //     el.style.transition = 'none'
  //   })
  // }
}
