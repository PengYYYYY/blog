<script setup>
import canvasDemo from '../components/canvas.vue'
</script>

# canvas 基础

`Canvas` 提供了一个通过 `JavaScript` 和 `HTML` 的 `<canvas>` 元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

基础示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 100);
```

<canvasDemo />
