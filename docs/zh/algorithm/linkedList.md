# 链表

基础数据结构

## 反转链表

### 递归实现

```js
const reversLinkedList = (head) => {
  if (head == null || head.next == null) {
    return head
  }
  const newHead = reversLinkedList(head.next)
  head.next.next = head
  head.next = null
  return newHead
}
```

### 迭代实现

```js
const reversLinkedList = (head) => {
  let prev = null
  let cur = head
  while(cur) {
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return cur
}
```

## 合并两个有序链表

### 递归

```js
var mergeTwoLists = (l1, l2) => {
  if (l1 == null) {
    return l2
  } else if (l2 == null) {
    return l1
  } else if (l1.val < l2.val) {
    l1.next = mergeList(l1.next, l2)
    return l1
  } else {
    l2.next = mergeList(l1, l2.next)
    return l2
  }
}
```

### 迭代

```js
var mergeTwoLists = (l1, l2) => {
  const preHead = new ListNode(-1);
  let prev = preHead;
  while(l1 && l2) {
    if (l1.val <= l2.val) {
      prev.next = l1
      l1 = l1.next
    } else {
      prev.next = l2
      l2 = l2.next
    }
    prev = prev.next
  }
  prev.next = l1 === null ? l2 : l1
  return preHead.next
}
```

## 回文链表

```js
var isPalindrome = (head) => {
  if(head == null || head.next == null) return true
  let fast = head
  let slow = head
  let prev;
  while(fast && fast.next) {
    pre = slow
    slow = slow.next
    fast = fast.next.next
  }
  prev.next = null //断开
  let prev2 = null;
  while(slow) {
    const next = slow.next;
    slow.next = prev2;
    prev2 = slow;
    slow = next;
  }
  while(head && prev2) {
    if(head.val !== prev.val) return false
    head = head.next
    prev2 = prev2.next
  }!
  return true
}
```

## 环形链表

- 标记法

```js
const hasCycle = function(head) {
  while(head) {
    if(head.flag) return true
    head.flag = true
    head = head.next
  }
  return false
}
```

- 快慢指针法

```js
const hasCycle = function(head) {
  if(!head || !head.next) return false
  let fast = head.next.next, slow = head.next
  while(fast !== slow) {
    if(!fast || !fast.next) return false
    fast = fast.next.next
    slow = slow.next
  }
  return true
}
```

## 构造链表

```js
class myLinkedList{
  constructor() {
    this.data = {}
  }
  get(index) {
    if (index < 0) return -1
    let cur = this.data
    for (let i = 0; i < index; i++) {
      if(!cur.next) return -1
      cur = cur.next
    }
    return cur.val == undefined || cur.val == null ? -1 : cur.val
  }
  addHead(val) {
    if (this.data && !(this.data.val === undefined || this.data.val == null)) {
      this.data = {
        val,
        next: this.data
      }
    } else {
      this.data = {
        val,
        next: null
      }
    }
  },
  addAtTail(val) {
    let cur = this.data
    while (cur.next) {
      crr = cur.next
    }
    cur.next = { val, next: null }
  },
  addAtIndex() {
    if (index <= 0) return this.addAtHead(val)
    let cur = this.data
    for (let i = 0; i < index - 1; i++) {
      if (!cur || !cur.next) return null
      cur = cur.next
    }
    if(!cur.val && cur.val !== 0) return null
    cur.next = { val, next: cur.next }
  },
  deleteAtIndex() {
    if (index < 0) return null
    if (index === 0) return this.data = this.data.next
    let cur = this.data
    for (let i = 0; i < index - 1; i++) {
      if(!cur.next || !cur.next.next) return null
      cur= cur.next 
    }
    if (!cur.next) return null
    if (!cur.next.next) return cur.next = null
    cur.next = cur.next.next
  }
}
```
