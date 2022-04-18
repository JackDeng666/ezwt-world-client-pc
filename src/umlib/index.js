export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export function spArr(arr, num) { //  arr是你要分割的数组，num是以几个为一组
	let newArr = [] //  首先创建一个新的空数组。用来存放分割好的数组
	for (let i = 0; i < arr.length;) { //   注意：这里与for循环不太一样的是，没有i++
		newArr.push(arr.slice(i, i += num));
	}
	return newArr
}

export function getElementPosition(element) {
  let top = element.offsetTop //这是获取元素距父元素顶部的距离
  let left = element.offsetLeft
  let current = element.offsetParent //这是获取父元素
  while (current !== null) {
    //当它上面有元素时就继续执行
    top += current.offsetTop //这是获取父元素距它的父元素顶部的距离累加起来
    left += current.offsetLeft
    current = current.offsetParent //继续找父元素
  }
  return {
    top,
    left
  }
}