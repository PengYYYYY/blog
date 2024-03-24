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

```js
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

```js
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
