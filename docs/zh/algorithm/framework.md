# 算法架子

## 遍历 traverse

```ts

const traverse = (data) => {
  for (let i = 0; i < data.length; i++) {
    console.log(data[i])
  }
}
```

## 递归

```js
const recursive = (level, x) => {
  // 结束条件
  if (endCondition) {
    return
  }

  // 当前层逻辑
  curLevelProcess()

  // 下一层逻辑
  recursive(level + 1)
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

## 树的遍历

### 深度优先遍历

#### 前序遍历

```js
const dsfPre = (root) {
  if(!root) return
  console.log(root.val)
  dsfPre(root.left)
  dsfPre(root.right)
}
```

#### 中序遍历

```js
const dsfPre = (root) {
  if(!root) return
  dsfPre(root.left)
  console.log(root.val)
  dsfPre(root.right)
}
```

#### 后序遍历

```js
const dsfPre = (root) {
  if(!root) return
  dsfPre(root.left)
  dsfPre(root.right)
  console.log(root.val)
}
```

### 广度优先遍历（层序遍历）

```js
const bsf = (root) => {
  const stack = [root]
  while(stack.length) {
    const curLevelLength = stack.length
    for(let i = 0; i < curLevelLength; i++) {
      const cur = stack.pop()
      console.log(cur.val)
      if(cur.left) stcak.push(cur.left)
      if(cur.right) stcak.push(cur.right)
    }
  }
}
```
