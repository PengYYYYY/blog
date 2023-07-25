# koa

koa 本质上是对 node 的一层简单封装

## 为什么诞生 koa

1. 包装 http,优雅封装，response.end 和 request。
2. 添加中间件，AOP
3. 增强错误处理
4. API 设计更优雅

## 业务场景

> AOP 面向切面编程

处理前需要做的事情，处理后需要做的事情，衍生出了洋葱圈模型。

## koa 与 koa2

- 1代为 generator 语法诞生
- 2代为 es7 语法诞生

## context

封装原生的 request 和 response，再把 request 和 response 集中挂挂载到上下文

```js
// context.js
module.exports = {
  get url() {
    return this.request.url
  },
  get body() {
    return this.response.body
  },
  set body(val){
    this.response.body = val
  },
  get method() {
    return this.request.method
  }
}
```

```js
// response.js
module.exports = {
  get body(){
    return this._body
  },
  set body(val){
    this._body = val
  }
}
```

```js
// request.js
module.exports ={
  get url(){
    return this.req.url
  },
  get method(){
    return this.req.method.toLowerCase()
  }
}
```

- 组合 `context`

```js
createContext(req, res) {
  const ctx = Object.create(context)
  ctx.request = Object.create(request)
  ctx.response = Object.create(response)

  ctx.req = ctx.request.req = req
  ctx.res = ctx.response.res = res
  return ctx
}
```

## 洋葱圈模型

```js
compose(middlewares) {
  return function (ctx) {
    return dispatch(0)
    function dispatch(i) {
      let fn = middlewares[i]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(
        fn(ctx, function next() {
          return dispatch(i + 1)
        })
      )
    }
  }
}
```

## koa 路由

```js
class Router {
  constructor() {
    this.stack = [];
  }

  register(path, methods, middleware) {
    let route = {path, methods, middleware}
    this.stack.push(route);
  }
  // 现在只支持get和post，其他的同理
  get(path,middleware){
    this.register(path, 'get', middleware);
  }
  post(path,middleware){
    this.register(path, 'post', middleware);
  }
  routes() {
    let stock = this.stack;
    return async function(ctx, next) {
      let currentPath = ctx.url;
      let route;

      for (let i = 0; i < stock.length; i++) {
        let item = stock[i];
        // 判断path和method
        if (currentPath === item.path && item.methods.indexOf(ctx.method) >= 0) {
          route = item.middleware;
          break;
        }
      }

      if (typeof route === 'function') {
        route(ctx, next);
        return;
      }

      await next();
    };
  }
}
```
