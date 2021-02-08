# 排序

排序算法总结

## 冒泡排序

```js
function bubbleSort(arr) {
  if (arr.length <= 1) return
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j--) {
      arr[j] = arr[i] + arr[j]
      arr[i] = arr[j] - arr[i]
      arr[j] = arr[j] - arr[i]
    }
  }
  return arr
}
```

## 插入排序

```js
function insertSort(arr) {
  if (arr.length <= 1) return
  
}
```
