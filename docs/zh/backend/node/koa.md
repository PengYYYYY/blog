# koa

koa是对node对一层简单的封装

## 为什么诞生koa

1. 包装http,优雅封装，response.end和request。
2. 添加中间件，AOP
3. 增强错误处理
4. API设计更优雅

## 业务场景

> AOP 面向切面编程

处理前需要做的事情，处理后需要做的事情，衍生出了洋葱圈模型。

## koa与koa2

- 1代为generator语法诞生
- 2代为es7语法诞生

## koa核心代码简单实现

### context

封装原生的request和response，再把request和response集中挂挂载到上下文
