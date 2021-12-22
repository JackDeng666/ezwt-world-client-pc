let t2 = null

export default function throttle(callback, delay){
  if(t2) return
  callback()
  t2 = setTimeout(function(){
    t2 = null
  }, delay)
}
