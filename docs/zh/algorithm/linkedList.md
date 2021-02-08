# 链表

基础数据结构

## 反转链表

> 递归实现

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

> 迭代实现

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
