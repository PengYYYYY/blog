# 树

和树相关的内容，主要是二叉树

## 二叉树遍历结构

```ts
class TreeNode {
  constructor(val, left, right) {
    this.value = value
    this.left = left
    this.right = right
  }
}

// 循环
const traverse = (root: TreeNode) => {
  traverse(root.left)
  traverse(root.right)
}

```

### 层序遍历

```js
const sequence = (root) => {
  const res = []
  const q = []
  if(root) {
    q.push(root)
  }
  while (q.length) {
    const currentLevelSize = q.length
    res.push([])
    for (let i = 0; i < currentLevelSize; i++) {
      const node = q.shift()
      res[res.length - 1].push(node.val)
      if (node.left) q.push(node.left)
      if (node.right) q.push(node.right)
    }
  }
  return res
}
```

### 递归遍历

```js
const preOrderTraverse = (root) => {
  const res = []
  const preOrderTraverse = (node) => {
    if (!node) {
      return
    }
    // 前序
    res.push(node.val)
    preOrderTraverse(node.left)
    preOrderTraverse(node.right)
    // 中序
    preOrderTraverse(node.left)
    res.push(node.val)
    preOrderTraverse(node.right)
    // 后序
    preOrderTraverse(node.left)
    preOrderTraverse(node.right)
    res.push(node.val)
  }
  preOrderTraverse(root)
  return res
}
```

### 迭代前序遍历

```js
const preOrderTraverse = (root) => {
  const res = []
  const stack = []
  if (root) {
    stack.push(root)
  }
  while (stack.length > 0) {
    const curNode = stack.pop()

    // 前序
    res.push(curNode.val)

    if(curNode.right) {
      stack.push(curNode.right)
    }

    if(curNode.left) {
      stack.push(curNode.left)
    }
  }
  return res

}

```

### 迭代中序遍历

``` js
const inOrdeIterate = (root) => {
  const res = []
  const stack = []
  let node = root
  while(node || stack.length) {
    white(node) {
      stack.push(node)
      node = node.left
    }
    node = stack.pop()
    res.push(node.val)
    node = node.right
  }
  return res
}
```

### 迭代后序遍历

```js
const preOrderTraverse = (root) => {
  const res = []
  const stack = []
  if (root) {
    stack.push(root)
  }
  while (stack.length > 0) {
    const curNode = stack.pop()

    // 前序
    res.unshift(curNode.val)

    if(curNode.left) {
      stack.push(curNode.left)
    }

    if(curNode.right) {
      stack.push(curNode.right)
    }
  }
  return res

}

```

## N叉树遍历

```ts
class TreeNode {
  constructor(val, children: TreeNode[]) {
    this.value = value
    this.children = children
  }
}

// 循环
const traverse = (root: TreeNode) => {
  for(let child of root.children) {
    traverse(child)
  }
}

```
