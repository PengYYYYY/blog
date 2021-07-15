# Bom and Dom

## 事件流

事件流也有两种，分别是事件冒泡和事件捕获。一个事件触发后，会在子元素和父元素之间传播（propagation）。

### 捕获阶段

从window对象传导到目标节点（上层传到底层）称为“捕获阶段”（capture phase），捕获阶段不会响应任何事件

### 目标阶段

在目标节点上触发，称为“目标阶段”

### 冒泡阶段

从目标节点传导回window对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。

### 事件委托

大量节省内存占用，减少事件注册，如在ul上代理所有li的click事件

```html
<ul id="myLinks">
  <li id="item1">Go somewhere</li>
  <li id="item2">Do something</li>
  <li id="item3">Say hi</li>
</ul>
<script>
  // 常规用法
  var item1 = document.getElementById('item1')
  var item2 = document.getElementById('item2')
  var item3 = document.getElementById('item3')
  item1.onClick = function() {
    console.log('item1')
  }
  item2.onClick = function() {
    console.log('item2')
  }
  item3.onClick = function() {
    console.log('item3')
  }
  // 优化做法
  document.addEventListener('click', function(event) {
    var target = event.target
     switch(target) {
        case "item1":
          console.log("item1")
        break;
        case "item2":
          console.log("item2")
        break;
        case "item3":
          console.log("item3")
        break; 
     }
  })
</script>
```
