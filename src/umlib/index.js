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