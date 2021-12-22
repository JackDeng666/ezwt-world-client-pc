let timeOut = null

export default function(fn, time) {
  if(timeOut) {
    clearTimeout(timeOut)
  }
  timeOut = setTimeout(() => {
    fn()
  }, time)
}
