# 树

一些和树相关的内容，主要是二叉树

## 二叉树架子

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

## 层序遍历

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

## 深度遍历

深度优先遍历，应用场景，diff算法

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
    while(node) {
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

    // 从前面插入
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

## 树的深度

### [树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

```js
var maxDepth = function(root) {
  if(!root) {
    return 0
  }
  const left = maxDepth(root.left)
  const right = maxDepth(root.right)
  return Math.max(left, right) + 1
}
```

### [树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

层序遍历，无左右子节点则返回当前的深度

```js
var minDepth = function(root) {
  if(!root) return 0
  const queue = []
  queue.push(root)
  let depth = 0
  while(queue.length) {
    depth++
    const currentLevelSize = queue.length
    for(let i = 0; i < currentLevelSize; i++) {
      const node = queue.shift()
      if(!node.left && !node.right) return depth
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right) 
    }
  }
  return depth
}
```

### [路径总和](https://leetcode-cn.com/problems/path-sum/)

> DSF实现

```js
var hasPathSum = function(root, targetSum) {
  if (!root) {
    return false;
  }

  if (!root.left && !root.right) {
    return root.val === targetSum;
  }

  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
}
```

> BSF实现

```js
var hasPathSum = function(root, targetSum) {
  if(!root) {
    return false
  }
  var queue1 = [root]
  var queue2 = [root.val]
  while(queue1.length){
    var node = queue1.shift();
    var rootVal = queue2.shift();
    if(node.left == null && node.right == null && rootVal == targetSum){
      return true;
    }
    if(node.left){
      queue1.push(node.left);
      queue2.push(node.left.val + rootVal);
    }
    if(node.right){
      queue1.push(node.right);
      queue2.push(node.right.val + rootVal);
    }
  }
  return false;
}
```

## 树的对比

### [对称二叉树](https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/)

```js
var isSymmetric = function(root) {
  if (!root) return true

  const check = (left, right) => {
    if (!left && !right) return true
    if (!left || !right) return false
    if (left.val !== right.val) return false
    return check(left.left, right.right) && check(left.right, right.left)
  }

  return check(root.left, root.right)
};

var isSymmetric = function(root) {
  if(!root) return true

  const check = (left, right) => {
    if(!left && !right) return true
    if(!left || !right) return false
    if(left.val !== right.val) return false
    return check(left.left, right.right) && check(left.right, right.left)
  }

  return check(root.left, root.right)
}
```

## 重建二叉树

### [从中序与后序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

```js
var buildTree = function(inorder, postorder) {
  const fn = (inStart, inEnd, postStart, postEnd) => {
    if(inStart > inEnd || postStart > postEnd) {
      return null
    }
    const rootval = postorder[postEnd]
    const midIndex = inorder.indexOf(rootval)
    const leftNodeNum = midIndex - inStart
    const root = new TreeNode(rootval)
    root.left = fn(inStart, midIndex - 1, postStart, postStart + leftNodeNum - 1)
    root.right = fn(midIndex + 1, inEnd, postStart + leftNodeNum, postEnd - 1)
    return root
  }
  return fn(0, inorder.length - 1, 0, postorder.length - 1)
};
```

### [从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

```js
var buildTree = function(preorder, inorder) {
  const recursive = (preStart, preEnd, inStart, inEnd) => {
    if(preStart > preEnd || inStart > inEnd) {
      return null
    }
    const rootVal = preorder[preStart]
    const mid = inorder.indexOf(rootVal)
    const root = new TreeNode(rootVal)
    const leftNum = mid - inStart
    root.left = recursive(preStart + 1, preStart + leftNum, inStart, mid - 1)
    root.right = recursive(preStart + leftNum + 1, preEnd,  mid + 1, inEnd)
    return root
  }
  return recursive(0, preorder.length - 1, 0, inorder.length -1)
};
```

## 前缀树

### [实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)

```js
class Trie {
  constructor() {
    this.children = {}
  }

  insert(word) {
    let node = this.children
    for(let ch of word) {
      if(!node[ch]) {
        node[ch] = {}
      }
      node = node[ch]
    }
    node.isEnd = true
  }

  searchPrefix(word) {
    let node = this.children
    for(let ch of word) {
      if(!node[ch]) {
        return false
      }
      node = node[ch]
    }
    return node
  }
  
  search(word) {
    const node = this.searchPrefix(word)
    return !!node && !!node.isEnd;
  }

  startsWith(prefix) {
    return this.searchPrefix(prefix) 
  }
}
```

## [递增顺序搜索树](https://leetcode-cn.com/problems/increasing-order-search-tree/)

```js
var increasingBST = function(root) {
  const dummyNode = new TreeNode(-1);
  let resNode = dummyNode;
  const dsf = function(root) {
    if (!root) {
      return
    }
    dsf(root.left)
    resNode.right = root;
    root.left = null;
    resNode = root;
    dsf(root.right)
  }
  dsf(root)
  return dummyNode.right;
};
```
