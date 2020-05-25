# HTML

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
