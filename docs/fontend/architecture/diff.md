# diff过程

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/KHYAuV.png)

两个框架都是同层比较，深度优先，可以参考树的前序遍历

```js
function dsf(root) {
  const dealFn = function(node) {
    if(!node) return

    // 处理当前节点
    dealFn(node.left)
    dealFn(node.right)
  }
  dealFn(root)
}
```

## vue的diff

优势：

- 新老两棵树：头尾两个节点，四节点间对比

key的作用：

复用节点

## react的diff过程

diff策略

- 同级比较，Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
- 拥有不同类型的两个组件将会生成不同的树形结构。
- 可以通过 key 来暗示哪些子元素在不同的渲染下能保持稳定。

diff过程

- 删除:newVnode不存在时
- 替换:vnode和newVnode类型不同或key不同时
- 更新:有相同类型和key但vnode和newVnode不同时
