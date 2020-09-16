# HTML

## HTML 语义化

- 页面结构: 即使没有css,也能够呈现出良好的内容结构。
- 有利于SEO: 爬虫依赖标签来确定关键字的权重，因此可以帮助爬虫抓取更多的有效信息
- 提升用户体验: 例如title,alt可以用于解释名称或者解释图片信息，以及label标签的灵活运用。
- 便于团队维护
- 方便其他设备解析：例如屏幕阅读器，盲人阅读器。

## HTML5 Notification(需要https)

```typescript
  private notifyMe (title:string, options:any, errfn:()=>{}) {
    if (!(window as any).Notification) {
      errfn()
    } else {
    // 检查用户曾经是否同意接受通知
      if (Notification.permission === 'granted') {
        var notification = new Notification(title, options) // 显示通知
        notification.onclick = function () {
          if (process.env.NODE_ENV === 'development') {
            window.open(`http://localhost:8081/docs/doc/#/other/changelog`)
          } else {
            window.open('http://siskin.fly.17usoft.com/docs/doc/#/other/changelog')
          }
        }
      } else if (Notification.permission === 'default') {
        // 用户还未选择，可以询问用户是否同意发送通知
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            var notification = new Notification(title, options) // 显示通知
          } else if (permission === 'default') {
            errfn()
          } else {
            // denied
            errfn()
          }
        })
      } else {
        // denied 用户拒绝
        errfn()
      }
    }
  }
```
