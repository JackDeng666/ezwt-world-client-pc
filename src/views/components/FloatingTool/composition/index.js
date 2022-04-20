import { reactive, onMounted, getCurrentInstance } from 'vue'

let oBtn = null
let aMenus = null
let menus = [
  { name: '用户', class: 'iconfont icon-user', component: 'UserInfo' },
  { name: '设置', class: 'iconfont icon-shezhi', component: 'Setting' },
  { name: '主题', class: 'iconfont icon-bizhiputie', component: 'ImageSettings' },
  { name: '帮助', class: 'iconfont icon-bangzhu', component: 'UserInfo' },
  { name: '反馈', class: 'iconfont icon-fankui', component: 'FeedBack' }
]

export default function () {
  const { proxy } = getCurrentInstance()

  const state = reactive({
    menus,
    menuOff: true
  })

  onMounted(() => {
    oBtn = document.getElementById("home")
    aMenus = document.getElementById("menu_list").querySelectorAll('.tool-item')
    setCss(oBtn, { $Transition: "0.5s ease all" })
    for (let i = 0; i < aMenus.length; i++) {
      aMenus[i].deg = 200 / (aMenus.length - 1) * i - 10
    }
  })

  // 菜单按钮点击
  const menuClick = () => {
    if (state.menuOff) {
      setCss(proxy.$refs['home'], { $Transform: "rotate(-135deg)" })
    } else {
      setCss(proxy.$refs['home'], { $Transform: "rotate(0deg)" })
    }
    for (let i = 0; i < aMenus.length; i++) {
      if (state.menuOff)
        toMove(aMenus[i], i * 100, state.menuOff)
      else
        toMove(aMenus[i], (aMenus.length - 1 - i) * 100, state.menuOff)
    }
    state.menuOff = !state.menuOff
  }



  // 每一项被点击
  const itemClick = i => {
    proxy.$popContent.show({title: menus[i].name, currentCom: menus[i].component})
    setCss(aMenus[i], { animation: "bounce .3s both" })
    setTimeout(function () {
      setCss(aMenus[i], { animation: "none" })
    }, 300)
  }

  return {
    ...state,
    menuClick,
    itemClick
  }
}

function setCss(obj, oAttr) {
  let sName = ""
  let aName = ["Webkit", "Moz", "O"]
  for (sName in oAttr) {
    if (sName.charAt(0) === "$") {
      for (let i = 0; i < aName.length; i++) {
        obj.style[aName[i] + sName.substring(1)] = oAttr[sName]
      }
    } else {
      obj.style[sName] = oAttr[sName]
    }
  }
}

function toMove(obj, delay, bType) {
  if (bType) { // 出去
    let oXY = getXY(obj.deg, 60)
    setCss(obj, { $Transition: "0.3s " + delay + "ms all ease", $Transform: "rotate(-360deg)", left: -Math.round(oXY.x) + "px", top: -Math.round(oXY.y) + "px" })
  } else { // 返回
    setCss(obj, { $Transition: "0.3s " + delay + "ms all ease", $Transform: "rotate(0deg)", left: "0px", top: "0px" })
  }
}

function getXY(iDeg, iRadius) {
  if (iDeg == 0) {
    return { x: 0, y: iRadius }
  }
  else if (iDeg == 90) {
    return { x: iRadius, y: 0 }
  }
  return { x: Math.sin(iDeg * Math.PI / 180) * iRadius, y: Math.cos(iDeg * Math.PI / 180) * iRadius }
}
