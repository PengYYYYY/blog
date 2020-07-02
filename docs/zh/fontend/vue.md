# Vue

- vue源码
- vuex
- vue-router

## 一些小技巧

开发过程中的一些`vue`的小技巧

### 内部监听生命周期函数

```javascript
{
  mounted() {
    window.addEventListener('resize', xxxFunction)
  },
 beforeDestroy() {
  window.removeEventListener('resize', xxxFunction)
 }
}
// 优化
{
  mounted() {
    window.addEventListener('resize', xxxFunction)
  this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.$_handleResizeChart)
    })
  },
}
```
