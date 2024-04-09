# 树

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

## 树的对比

### [相同的树](https://leetcode.cn/problems/same-tree/description)

```js
var isSameTree = function(p, q) {
  if(p == null && q == null) {
    return true;
  } else if(p === null || q == null) {
    return false;
  } else if(p.val !== q.val) {
    return false;
  }
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
```

### [对称二叉树](https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/)

```js
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

### [翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/description)

```js
var invertTree = function(root) {
  if(!root) {
    return root;
  }
  const newRoot = new TreeNode(root.val)
  newRoot.left = invertTree(root.right);
  newRoot.right = invertTree(root.left);
  return newRoot
};
```

## 路径计算相关

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

### [求根节点到叶节点数字之和](https://leetcode.cn/problems/3Etpl5/description/)

```js
var sumNumbers = function(root) {
  const dfs = (root, preSum) => {
    if(root === null) {
      return 0;
    }
    const sum = preSum * 10 + root.val;
    if (!root.left && !root.right) {
      return sum;
    }
    return dfs(root.left, sum) + dfs(root.right, sum);
  }

  return dfs(root, 0);
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

## 二叉树层序遍历

### [二叉树的层平均值](https://leetcode.cn/problems/average-of-levels-in-binary-tree/description/)

```js
var averageOfLevels = function(root) {
    const stack = [];
  const res = [];
  if(root){
    stack.push(root)
  }
  while(stack.length) {
    const len = stack.length;
    let sum = 0;
    for(let i = 0; i < len; i++) {
      const node = stack.shift();
      sum += node.val;
      if(node.left) {
        stack.push(node.left)
      }
      if(node.right) {
        stack.push(node.right)
      }
    }
    res.push(sum / len);
  }
  return res
};
```

### [二叉树的右视图](https://leetcode.cn/problems/average-of-levels-in-binary-tree/description/)

```js
var rightSideView = function(root) {
  const stack = [];
  const res = [];
  if (root) {
    stack.push(root)
  }
  while(stack.length) {
    const len = stack.length;
    for (let i = 0; i < len; i++) {
      const node = stack.shift()
      if (i === len - 1){
        res.push(node.val)
      }
      if (node.left) {
        stack.push(node.left)
      }
      if(node.right) {
        stack.push(node.right)
      }
    } 
  }
  return res;
};
```

### [二叉树的锯齿形层序遍历](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/description)

```js
var zigzagLevelOrder = function(root) {
  const stack = [];
  const res = [];
  if (root) {
    stack.push(root)
  }
  let level = 1
  while (stack.length) {
    res.push([]);
    const len = stack.length;
    for (let i = 0; i < len; i++) {
      const node = stack.shift()
      if (level % 2 === 1) {
        res[res.length - 1].push(node.val)
      } else [
        res[res.length - 1].unshift(node.val)
      ]
      if (node.left) {
        stack.push(node.left)
      }
      if (node.right) {
        stack.push(node.right)
      }
    }
    level++
  }
  return res;
};
```

## 二叉搜索树

### [递增顺序搜索树](https://leetcode-cn.com/problems/increasing-order-search-tree/)

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

## [实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)

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

## [二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

```js
var lowestCommonAncestor = function(root, p, q) {
  let ans;
  const dfs = (root, p, q) => {
    if (root === null) return false;
    const lson = dfs(root.left, p, q);
    const rson = dfs(root.right, p, q);
    if ((lson && rson) || ((root.val === p.val || root.val === q.val) && (lson || rson))) {
      ans = root;
    }
    return lson || rson || (root.val === p.val || root.val === q.val);
  }
  dfs(root, p, q);
  return ans;
};
```
