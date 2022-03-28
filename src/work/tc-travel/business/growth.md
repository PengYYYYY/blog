# 产品增长

## 较为典型的营销增长类产品

### 机票盲盒

> 玩儿法创新

1. GMV上的提升
2. 品牌知名度上的提升
3. 玩法上的提升，主打的是不满意全额退（一开始是先抽盲盒再付钱，再占舱位），后面我们采取的策略是先付钱，然后锁仓位，不想要的话全额退，这样达到的效果就完全不一样了。
4. 存在的公益价值，很多人没坐过飞机，解决航司的低价尾舱，销售产品，让客户体验飞行.
5. 低成本获客，平常我们的一个新客会发一些券给他们，盲盒这个产品的话逻辑是卖一张亏一张，有爆点，单量很多，只要客户下单，就提升了知名度嘛。
6. 峰值的话一分钟50w的请求，加机器，网关限流，中间层的配置信息加缓存。

### 券铺子

> 快速迭代

核心是把券当成商品，通过分享助力达到提现的要求

- 券续期
- 券合成
- 外部券（电话券，酒店券）

### 常规业务

- 0元机票秒杀
- 拼团助力

## 营销活动平台

改造平台，抽象业务，将营销组件沉淀下来，形成搭建平台

接口抽象，统一业务封装流程

## 流量

- 获客：
- 激活
- 留存
- 转化
- 交叉
- 变现

## 踩过的坑

### 关于路由

在分享链接中，请使用parmas来传递分享code,如果使用query的话，遇到微信封杀的情况，整个活动都会被封禁掉。

### 倒计时的坑(浏览器切到后台)

在移动端，浏览器切到后台，页面的定时器就被暂停了，重新打开浏览器时，倒计时才继续执行，这就导致倒计时执行时长变长了。

### 第一种场景

定时器被暂停是因为浏览器将页面的线程停止了，毕竟浏览器已经被切到后台，为了性能考虑，所以将页面线程停止也是合理的，这就导致我们的定时器一并被暂停。

- 自动校准定时器

```js
watchTimeInterval(runTime, 1000)

function watchTimeInterval(time, point) {
    let _time = time;
    let startTime = new Date().valueOf();
    let interval = setInterval(() => {
        let gap = (new Date().valueOf() - startTime - point);
        if (gap < 0) {
            gap = 0;
        }
        _time = _time - gap;
        startTime = new Date().valueOf();
        if (_time > 0) {
            _time -= point;
        } else {
            interval && clearInterval(interval)
        }
    }, point)
    return interval
}

function 观察者
```

- 使用requestAnimationFrame实现setInterval

```js
function myInterval(fn, interval) {
  let timer
  const now = Date.now
  let startTime = now()
  let endTime = startTime
  const loop = () => {
    timer = windows.requestAnimationFrame(loop)
    endTime = now()
    if (endTime - startTime >= interval) {
      startTime = endTime = now()
      callback(timer)
    }
  }
  timer = window.requestAnimationFrame(loop)
  return timer
}
```
