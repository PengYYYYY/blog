# 数据结构

## 数组(Array)

数组(Array)是一种线性表数据结构。它用一组`连续的内存空间`，来存储一组具有相同类型的数据。

### 如何实现随机访问

数组支持随机访问，根据下标随机访问的时间复杂度为O(1)

- 线性表：线性表就是数据排成像一条线一样的结构。每个线性表上的数据最多只有前和后两个方向。其实除了数组，链表、队 列、栈等也是线性表结构。
- 连续的内存空间和相同类型的数据：实现了“随机访问”。弊端：这两个限制也让数组的很多 操作变得非常低效，比如要想在数组中删除、插入一个数据，为了保证连续性，就需要做大量的数据搬移工作。

### 插入和删除低效

- 插入时，有最好和最差的情况，最好的情况就是直接插入最后的位置。反之，最坏的情况就是插入第一位，通常，可以先把需要插入的位置已有的元素，放到数组的最后一位，再替换需要插入的值。再进行交换。均摊复杂度O(n/2)
- 删除同理。

### 为什么数组要从0开始编号

内存地址计算公式：`a[k]_address = base_address + k * type_size`

如果数组从1开始计数，那我们计算数组元素a[k]的内存地址就会变为:`a[k]_address = base_address + (k-1)*type_size`

每次随机访问数组元素都多了一次减法运算，对于CPU来说，就是多了一次减法指令，所以很多语言的数组从0开始

## 链表(NodeList)

相比数组，链表是一种稍微复杂一点的数据结构。数组需要一块连续的内存空间来存储，链表恰恰相反，它并不需要一块连续的内存空间，它通过“指针”将一组零散的内存块串联起来使用。每个链表的结点除了存储数 据之外，还需要记录链上的下一个结点的地址。一般都叫next。

### 单向链表

链表中有两个结点较为特殊，它们分别是第一个结点和最后一个结点。我们习惯性地把第一个结点叫作头结点，把最 后一个结点叫作尾结点。其中，头结点用来记录链表的基地址。可以用用它来遍历整条链表。尾结点特殊的地方在于，指针为空，用来判断结束。

- 插入，删除，只需要删除对应的结点
- 链表中数据并非连续内存，所以无法像数组那样，根据首地址和下标，通过寻址公式就能直接计算出对应的内存地址，而是需要根据指针一个结点一个结点地依次遍历，直到找到相应的结点。查询需要O(n)的复杂度。

### 循环链表

循环链表是一种特殊的单链表。它跟单链表唯一的区别就在尾结点。循环链表的尾结点是指向链表的头结点。

### 双向链表

单向链表只有一个方向，结点只有一个后继指针next指向后面的结点。双向链表，它支持两个方向，每个结点不止有一个后继指针next指向后面的结点，还有一个前驱指针prev指向前面的结点。相对于单向链表来说比较浪费空间，但可以支持双向遍历。

优势

- 在删除某一个点的前一个结点这样的操作中比较有优势。
- 对于一个有序链表，双向链表的按值查询的效率也要比单链表高一些。因为，我们可以记录上次查找的位置p，每次查询时，根 据要查找的值与p的大小关系，决定是往前还是往后查找，所以平均只需要查找一半的数据。

### 链表与数组的对比

时间复杂度

- 数组：插入,删除-O(n),随机访问-O(1)
- 链表：插入，删除-O(1),随机访问-O(n)

数组简单易用，在实现上使用的是连续的内存空间，可以借助CPU的缓存机制，预读数组中的数据，所以访问效率更高。而链表在内存中并不是连续存储，所以
对CPU缓存不友好，没办法有效预读。

数组容量固定一经声明就要占用整块连续内存空间，链表本身没有大小的限制，天然地支持动态扩容，

### 链表的应用

LRU缓存淘汰算法。缓存是一种提高数据读取性能的技术，在硬件设计、软件开发中都有着非常广泛的应用，比如常见的CPU缓存、数据库缓存、浏览器缓存等等。

常见的策略有三种:先进先出策 略FIFO(First In，First Out)、最少使用策略LFU(Least Frequently Used)、最近最少使用策略LRU(Least Recently Used)

我们维护一个有序单链表，越靠近链表尾部的结点是越早之前访问的。当有一个新的数据被访问时，我们从链表头开始顺序遍历链表。
1.如果此数据之前已经被缓存在链表中了，我们遍历得到这个数据对应的结点，并将其从原来的位置删除，然后再插入到链表的头部。
2.如果此数据没有在缓存链表中，又可以分为两种情况:

- 如果此时缓存未满，则将此结点直接插入到链表的头部;
- 如果此时缓存已满，则链表尾结点删除，将新的数据结点插入链表的头部。

```javascript
class ListNode {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
    this.prev = null
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.hashTable = {}
    this.count = 0
    this.dummyHead = new ListNode()
    this.dummyTail = new ListNode()
    this.dummyHead.next = this.dummyTail
    this.dummyTail.prev = this.dummyHead
  }

  get(key) {
    let node = this.hashTable[key]
    if (node == null) return -1
    this.moveToHead(node)
    return node.value
  }

  put(key, value) {
    let node = this.hashTable[key]
    if (node == null) {
      let newNode = new ListNode(key, value)
      this.hashTable[key] = newNode
      this.addToHead(newNode)
      this.count++
      if (this.count > this.capacity) {
        this.removeLRUItem()
      }
    } else {
      node.value = value
      this.moveToHead(node)
    }
  }

  moveToHead(node) {
    this.removeFromList(node)
    this.addToHead(node)
  }
  
  removeFromList(node) {
    let tempForPrev = node.prev
    let tempForNext = node.next
    tempForPrev.next = tempForNext
    tempForNext.prev = tempForPrev
  }

  addToHead(node) {
    node.prev = this.dummyHead
    node.next = this.dummyHead.next
    this.dummyHead.next.prev = node
    this.dummyHead.next = node
  }

  removeLRUItem() {
    let tail = this.popTail()
    delete this.hashTable[tail.key]
    this.count--
  }

  popTail() {
    let tailItem = this.dummyTail.prev
    this.removeFromList(tailItem)
    return tailItem
  }
}
```

## 栈(stack)

后进者先出，先进者后出，这就是典型的“栈”结构。 从栈的操作特性上来看，栈是一种“操作受限”的线性表，只允许在一端插入和删除数据。

栈既可以用数组来实现,也可以用链表来实现。用数组实现的栈，我们叫作`顺序栈`，用链表实现的栈，我们叫作`链式栈`。

### 栈在函数调用时的作用

操作系统给每个线程分配了一块独立的内存空间，这块内存被组织成“栈”这种结构,用来存储函数调用时的临时变量。每进入一个函数，就会将临时变 量作为一个栈帧入栈，当被调用函数执行完成，返回之后，将这个函数对应的栈帧出栈。

### 栈在表达式求值中的应用

操作系统给每个线程分配了一块独立的内存空间，这块内存被组织成“栈”这种结构,用来存储函数调用时的临时变量。每进入一个函数，就会将临时变 量作为一个栈帧入栈，当被调用函数执行完成，返回之后，将这个函数对应的栈帧出栈。

## 队列(queue)

队列只支持两个基本操作:入栈push()和出栈pop()。队列跟栈一样，也是一种操作受限的线性表数据结构。

顺序队列和链式队列,队列跟栈一样，也是一种抽象的数据结构。具有先进先出的特性，支持在队尾插入元素，在队头删除元素.用数组实现的队列叫作顺序队列， 用链表实现的队列叫作链式队列。

### 顺序队列

基于数组队实现，定义头尾两个指针，入队时，时间复杂度O(N),出队时，先不做数组队搬运，等到有入队操作时，统一搬运。

### 链式队列

这个就很简单了。挂结点就行了

### 循环队列

顾名思义，形成唤醒，这样不需要做数组的搬运了。

```javascript
class CircularQueue {
  constructor (capacity) {
    this.items = new Array(capacity)
    this.capacity = capacity
    this.head = 0
    this.tail = 0
  }

  enqueue(item) {
    if ((this.tail + 1) % this.capacity == this.head) return false;
    items[tail] = item;
    tail = (tail + 1) % n;
    return true;
  }

  dequeue() {
    if(this.head == this.tail) return null
    const res = items[this.head]
    this.head = (this.head + 1) % this.capacity;
  }
}
```

### 阻塞队列和并发队列

#### 阻塞队列

就是在队列为空的时候，从队头取数据会被阻塞。因为此时还没有数据可取，直到队列中有了数据 才能返回,如果队列已经满了，那么插入数据的操作就会被阻塞，直到队列中有空闲位置后再插入数据，然后再返回。

该特性可以实现一个生产者-消费者模型。这种基于阻塞队列实现的“生产者-消费者模型”，可以有效地协调生产和消费的速度。

同时还可以配置多个消费者，来对应一个生产者。

#### 并发队列

在多线程的情况下，同时操作队列，这个时候就会存在线程安全问题。

线程安全的队列我们叫作并发队列，最简单直接的实现方式是直接在enqueue()、dequeue()方法上加锁，但是锁粒度大并发度会比较低，同一时刻仅允许一个存或者取操作。实际上，基于数组的循环队列，利用CAS原子操作，可以实现非常高效的并发队列。

## 递归

所有的递归问题都可以用递推公式来表示

### 递归需要满足的三个条件

- 一个问题的解可以分解为几个子问题的解

- 这个问题与分解之后的子问题，除了数据规模不同，求解思路完全一样

- 存在递归终止条件

## 排序

冒泡 排序、插入排序、选择排序、归并排序、快速排序、计数排序、基数排序、桶排序

### 排序算法的执行效率

对于排序算法执行效率的分析，我们一般会从这几个方面来衡量

- 最好情况、最坏情况、平均情况时间复杂度
第一，有些排序算法会区分，为了好对比，所以我们最好都做一下区分。第二，对于要排序的数据，有的接近有序，有的完 全无序。有序度不同的数据，对于排序的执行时间肯定是有影响的，我们要知道排序算法在不同数据下的性能表现。

- 时间复杂度的系数、常数 、低阶
时间复杂度反应的是数据规模n很大的时候的一个增长趋势，所以它表示的时候会忽略系数、常数、低阶。但是实际的软件开发中，我们排序的可能
是10个、100个、1000个这样规模很小的数据，所以，在对同一阶时间复杂度的排序算法性能对比的时候，我们就要把系数、常数、低阶也考虑进来。

- 比较次数和交换(或移动)次数

基于比较的排序算法的执行过程，会涉及两种操作，一种是元素比较大小，另一种是元素交换或移动，在分析排序算法的执行效率应该把比较次数和交换(或移动)次数也考虑进去。

### 排序算法的内存分析

原地排序的概念，特指空间复杂度是O(1)的排序算法

### 排序算法的稳定性

待排序的序列中存在 值相等的元素，经过排序之后，相等元素之间原有的先后顺序不变。
比如我们有一组数据2，9，3，4，8，3，按照大小排序之后就是2，3，3，4，8，9。
这组数据里有两个3。经过某种排序算法排序之后，如果两个3的前后顺序没有改变，那我们就把这种排序算法叫作稳定的排序算法;如果前后顺序发生变化，那对应的排序算法就叫作不稳定的排序算法。

### 冒泡排序

每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小关系要求。如果不满足就让它俩互换。一次冒泡会让至少一个元素移动到它应该在的位置，重复n次，就完成了n个数据的排序工作。

```javaScript
const bubbleSort = (n) => {
 if(n.length <= 1) {
  return n
 }
 for(let i = 0; i < n.length; i++) {
  let flag = false
  for(let j = 0; j < n.length - i - 1; j++){
   if(n[j] > n[j+1]) {
    n[j+1] = n[j+1] + n[j]
    n[j] = n[j+1] - n[j]
    n[j+1] = n[j+1] - n[j]
    flag = true
   }
  }
  if(!flag) break
 }
 return n
}
```

- 冒泡的过程只涉及相邻数据的交换操作，只需要常量级的临时空间，所以它的空间复杂度为O(1)，是一个原地排序算法。
- 在冒泡排序中，只有交换才可以改变两个元素的前后顺序。为了保证排序的稳定性，当有相邻的两个元素大小相等的时候，我们不做交换，相同大小的 数据在排序前后不会改变顺序，所以冒泡排序是稳定的排序算法。
- 冒泡的时间复杂度，最好情况下，要排序的数据已经是有序的了，我们只需要进行一次冒泡操作，就可以结束了，所以最好情况时间复杂度是O(n)。而最坏的情况是，要排序的数据
刚好是倒序排列的，我们需要进行n次冒泡操作，所以最坏情况时间复杂度为O(n2)。

### 插入排序

我们只要遍历数组，找到数据应该插入的位置将 其插入即可。

```javaScript
const insertSort = (n) => {
  if (n.length <= 1) {
    return n
  }
  for(let i = 0; i < n.length; i++) {
  const val = n[i];
  let j = i - 1
  while(j >= 0) {
   if(n[j] > val) {
    n[j+1] = n[j];
   } else {
    break
   }
   j--
  }
  n[j+1] = val
 }
 return n
}
```

### 选择排序

分已排序区间，和未排序区间，左右区间。遍历右区间，找到最小的一个，换到最左边。

```javascript
const selectSort = n => {
  if (n.length <= 1) {
    return n
  }
  for(let i = 0; i < n.length; i++) {
    let min = i;
    for(let j = i + 1; j < n.length; j++) {
      if(n[min] > n[j]) {
        min = j
      }
    }
    const temp = n[i]
    n[i] = n[min]
    n[min] = temp
  }
  return n
}
```

### 归并排序

思想：分治思想，分而治之。将大问题分解成小的子问题。

``` javascript
const mergeSort = (n) => {
  if(n.length <= 1) return n
  const mid = l + (r - l) >> 1 / 2
  const left = n.slice(0, mid)
  const right = n.slice(mid)
  return mergeArr(mergeSort(left), mergeSort(right))
}

const mergeArr = (left, right) => {
  let temp = []
  let leftIndex = 0;
  let rightIndex = 0;
  // 合并两个子数组
  while(left.length > leftIndex && right.length > rightIndex) {
    if (left[leftIndex] <= right[rightIndex]) {
      temp.push(left[leftIndex])
      leftIndex ++
    } else {
      temp.push(right[rightIndex])
      rightIndex++
    }
  }
  return temp.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}
```

### 快速排序

随机选取一个数组中的值作为基准值，从左至右取值与基准值对比大小。比基准值小的放数组左边，大的放右边，对比完成后将基准值和第一个比基准值大的值交换位置。然后将数组以基准值的位置分为两部分，继续递归以上操作

```javascript
const swap = (arr, i, startIndex) => {
  arr[i] = arr[i] + arr[startIndex]
  arr[startIndex] = arr[i] - arr[startIndex]
  arr[i] = arr[i] - arr[startIndex]
  startIndex++
}
const partition = (arr, pivot, left, right) => {
  const pivotVal = arr[pivot]
  let startIndex = left
  for (let i = left; i < right; i++) {
    if (arr[i] < pivotVal) {
      swap(arr, i, startIndex)
    }
  }
  swap(arr, startIndex, pivot)
  return startIndex
}

const quickSort = (arr, left = 0, right= arr.length-1) => {
  if (left < right) {
    let pivot = right
    let partitionIndex = partition(arr, pivot, left, right)
    quickSort(arr, left, partitionIndex - 1 < left ? left : partitionIndex - 1)
    quickSort(arr, partitionIndex + 1 > right ? right : partitionIndex + 1, right)
  }
}
```

### 桶排序

桶排序将要排序的数据分到有序的桶中，每个桶里的数据再单独进行排序。

```javascript
function bucketSort(array, bucketSize = 5) {
  if(array.length < 2) {
    return array
  }
  const buckets = createBucket(array, bucketSize)
  return sortBuckets(buckets)
}
function createBuckets(array, bucketSize) {
  let minValue = array[0]
  let maxValue = array[0]
  for(let i = 1; i < array.length; i++) {
    if(array[i] < minValue) {
      minValue = array[i]
    } else if(array[i] > maxValue) {
      maxValue = array[i]
    }
  }
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
  const buckets = []
  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = []
  }
  for (let i = 0; i < array.length; i++) {
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize)
    buckets[bucketIndex].push(array[i])
  }
  return buckets
}
function sortBuckets(buckets) {
  const sortedArray = []
  for(let i = 0; i < buckets.length; i++) {
    if(buckets[i] != null) {
      insertionSort(buckets[i])
      sortedArray.push(...buckets[i])
    }
  }
}
```

### 计数排序

### 基数排序

### 排序算法对比

|类型 | 时间复杂度 | 是否是稳定排序 | 是否为原地排序 |
|----|-----|------|------|
|冒泡排序|O(n^2)|是|是|
|插入排序|O(n^2)|是|是|
|选择排序|O(n^2)|否|是|
|归并排序|O(nlogn)|否|否|
|快速排序|O(nlogn)|否|是|
|计数排序|O(n+k)k是数据范围|是|否|
|桶排序|O(n)|是|否|
|基数排序|O(dn)d是维度|是|否|

### 优化快速排序

- 三数取中法

## 二分查找（Binary Search）

二分查找简单来说就是折半，步骤就是，找到中间值，然后查找左右区间，一直递归下去。
二分查找的时间复杂度是O(logn)

```javascript
// 非递归实现，利用指针
var search = function(nums, target) {
 let left = 0
 let right = nums.length - 1
 while(left <= right) {
  const mid =  left + (right - left >> 1)
  if(nums[mid] == target) {
   return mid
  }
  if(nums[mid] < target) {
   left = mid + 1
  } else {
   right = mid - 1
  }
 }
 return -1
};
// 递归实现
var search = function(nums, target, l = 0, r = l.length - 1) {
  if(l > r) {
    return - 1
  }
  const mid = l + (l - r >> 1)
  if(nums[mid] = target) {
    return mid
  } else if(target[mid] < target) {
    search(nums, target, l, mid)
  } else {
    search(nums, target, mid+1, r)
  }
}
```

### 二分查找的局限性

- 二分查找依赖顺序表结构,二分查找针对的是有序数据
- 数据量太小不适合二分查找：直接顺序遍历即可，没有太大优势
- 数据量太大也不适合二分查找：如果查找1GB的数据，数组为了支持随机访问的特性，要求内存空间连续，对内存的要求比较苛刻。

### 4种常见的2分变形问题

- 查找第一个值等于给定值的元素

```javascript
var search = function(nums, target) {
 let left = 0
 let right = nums.length - 1
 while(left <= right) {
  const mid =  left + (right - left >> 1)
  if(nums[mid] > target) {
    right = mid - 1
  } else {
    left = mid + 1
  } else {
    if(mid == 0 || a[mid] != value) {
      return mid
    } else {
      right = mid - 1
    }
  }
 }
 return -1
};
```

- 查找最后一个值等于给定值的元素
- 查找第一个大于给定值的元素
- 查找最后一个小于给定值的元素
