# 算法框架

## 遍历 traverse

```ts

const traverse = (data) => {
  for (let i = 0; i < data.length; i++) {
    console.log(data[i])
  }
}
```

## 链表遍历框架，兼具迭代和递归结构

```ts
class ListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

// 循环
const traverse = (head: ListNode) => {
  let cur = head
  while (cur != null) {
    cur = cur.next
  }
}

// 递归
const recursive = (head: ListNode) => {
  recursive(head.next)
}
```

