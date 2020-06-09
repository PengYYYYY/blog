# 高阶函数原理实现

## async await实现

```javaScript
function asyncToGenerator(generatorFunc) {
 return function() {
  const gen = generatorFunc.apply(this, arguments)

 return new Promise((reslove, reject) => {
  function step(ket, arg) {
  let generatorResult
  try {
   generatorResult = gen[key](arg)
  } catch(e) {
   return reject(e)
  }
  const { value, done } = generatorResult
  if(done) {
   return resolve(value)
  } else {
   return Promise.reslove(value).then(val => step('next', val), err => step('throw', err))
  }
 }
 step('next')
  })
 }
}
```

## promise 实现

### promise A+ 规范
