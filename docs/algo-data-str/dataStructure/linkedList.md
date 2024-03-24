# 链表

基础数据结构

## 链表遍历框架

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
