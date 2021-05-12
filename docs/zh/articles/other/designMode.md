# 设计模式

设计模式的代码简述

## 单例模式

单例在编程实战中存在大量的应用，比如说弹窗。

```javascript
{
  const Singleton = function(name) {
    this.name = name
    this.instance = null
  }
  Singleton.prototype.getName = function() {
    console.log(this.name)
  }
  Singleton.getInstance = function() {
    if (!this.singleton) {
      this.instance = new Singleton(name)
    }
    return this.instance
  }
  var a = Singleton.getInstance('sing1')
  var b = Singleton.getInstance('sing2')
}
```

## 策略模式

一个计算工资的例子

```javascript
var performanceS = function(){};
performanceS.prototype.calculate = function(salary) {
  return salary * 4
}
var performanceA = function(){};
performanceA.prototype.calculate = function(salary) {
  return salary * 3
}
var performanceB = function(){}
performanceB.prototype.calculate = function(salary) {
  return salary * 2
}

var Bonus = function() {
  this.salary = null
  this.strategy = null
}
Bonus.prototype.setSalary = function(salary) {
  this.salary = salary
}
Bonus.prototype.setStrategy = function( strategy ){
  this.strategy = strategy; // 设置员工绩效等级对应的策略对象
};
Bonus.prototype.getBonus = function(){
  return this.strategy.calculate( this.salary );
};
```

适用于JavaScript的策略模式

```javascript
var strategies = {
  "S": function(salary) {
    return salary * 4;
  },
  "A": function(salary) {
    return salary * 3
  },
  "B": function(salary) {
    return salary * 2
  }
}
var calculateBonus = function( level, salary ){ 
  return strategies[level](salary);
};
console.log(calculateBonus("S", 2000)) // 8000
console.log(calculateBonus("A", 1000)) // 3000
```

## 代理模式

- 虚拟代理

```javascript
var myImage = (function(){
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function(src) {
      imgNode.src = src
    }
  }
})()

var proxyImage = (function() {
  var img = new Image
  img.onload = function() {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('加载中图片');
      img.src = src;
    }
  }
})()
proxyImage.setSrc('实际的图片');
```

- 缓存代理

```js
const proxyMulti = function() {
  const cache = {}
  return function() {
    const args = Array.prototype.join.call( arguments, ',' );
    if (args in cache) {
      return cache[args]
    }
    return cache[args] = multi.apply( this, arguments );
  }
}
function multi() {
  var a = 1
  for(var i = 0; l = arguments.length; i++) {
    a = a * arguments[i]
  }
  return a
}
```

## 迭代器模式

## 发布-订阅模式

## 命令模式

## 组合模式

## 模版模式

## 享元模式

## 责任链模式

## 中介者模式

## 装饰者模式

## 状态模式

## 适配器模式
