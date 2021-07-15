# 排序

排序、插入排序、选择排序、归并排序、快速排序、希尔排序

## 原地交换方法

```js
function swap(arr, i, j) {
  if (i == j) return
  arr[i] = arr[i] + arr[j]
  arr[j] = arr[i] - arr[j]
  arr[i] = arr[i] - arr[j] 
}
```

## O(n^2) 级排序算法

## 冒泡排序

```js
function bubbleSort(arr) {
  if (arr.length <= 1) return
  for (let i = arr.length - 1; i >= 0; i++) {
    for (let j = 0; j < i; j++) {
      if(arr[i] < arr[j]) {
        swap(arr, i, j)
      }
    }
  }
  return arr
}
```

## 插入排序

```js
function insertSort(arr) {
  if (arr.length <= 1) return
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j < arr.length; j--) {
      if (arr[j] > arr[j+1]) {
        swap(arr, j, j + 1)
      } else {
        break
      }
    }
  }
  return arr
}
```

## 选择排序

```js
function selectSort(arr) {
  if (arr.length <= 1) return
  for (let i = 1; i < arr.length; i++) {
    let minIndex = i;
    for(let j = 0; j < i; j++) {
      minIndex = arr[minIndex] < arr[j] ? minIndex : j
    }
    swap(arr, minIndex, j)
  }
  return arr
}
```

## 归并排序

```js
function mergeArr(left, right) {
  let temp = []
  let leftIndex, rightIndex = 0
  while(left.length > leftIndex && right.length > rightIndex) {
    if (left[leftIndex] <= right[rightIndex]) {
      temp.push(left[leftIndex])
      leftIndex++
    } else {
      temp.push(right[rightIndex])
      rightIndex++
    }
  }

  return temp.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

function mergeSort(arr) {
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  return mergeArr(mergeSort(left), mergeSort(right))
}
```

## 快速排序

```js
function partition(arr, pivot, left, right) {
  const pivotVal = arr[pivot]
  let startIndex = left
  for(let i = left; i < arr.length; i++) {
    if (arr[i] < pivotVal) {
      swap(arr, startIndex, i)
      startIndex++
    }
  }
  swap(arr, pivot, startIndex)
  return startIndex
}
function quickSort(arr, left = 0; right = arr.length) {
  if (arr.length <= 1) return
  const partitionIndex = partition(arr, right, left, right)
  quickSort(arr, left, partitionIndex - 1 < left ? left : partitionIndex - 1)
  quickSort(arr, partitionIndex + 1 < right ? partitionIndex + 1 : right)
}
```

### 优化快速排序

- 三数取中法，第一个值，中间值，最后一个值

## 希尔排序

```js
function shellSort(arr) {
  let gap = Math.floor(arr.length / 2)
  while(gap >=1) {
    for(let i = gap; i < arr.length; i = i++) {
      for(let j = i - gap; j >=0; j = j - gap) {
        if(arr[j] > arr[j+gap]) {
          swap(j, j + gap)
        } else {
          break
        }
      }
    }
    gap = Math.floor(gap/2)
  }
  return arr
}
```

## 排序算法对比

|类型 | 时间复杂度 | 是否是稳定排序 | 是否为原地排序 |
|----|-----|------|------|
|冒泡排序|O(n^2)|是|是|
|插入排序|O(n^2)|是|是|
|选择排序|O(n^2)|否|是|
|归并排序|O(nlogn)|否|否|
|快速排序|O(nlogn)|否|是|
|希尔排序|O(nlogn)|否|是|
