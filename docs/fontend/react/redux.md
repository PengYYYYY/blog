# Redux

redux是很简单的一个发布订阅模式

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/Ghl3Qs.png)

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/tU5R5m.png)

## 核心

- 包含

```js
function createStore(reducer, enhancer) {
  // 是否有增强
  if (enhancer) {
      return enhancer(createStore)(reducer)
  }
  let currentState
  let currentListeners = [];

  // 获取状态
  function getState() {
    return currentState;
  }


  function dispatch(action) {
    currentState = reducer(currentState, action);
    // 改变 store state已经发生了变化
    // 通知订阅
    currentListeners.forEach(listener => listener());
  }

  function subscribe(listener) {
    currentListeners.push(listener)
    // 返回取消订阅的函数
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  return {
    getState,
    dispatch,
    subscribe
  };
}
```

## applyMiddleware

```js
function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer);
    let dispatch = store.dispatch
    const midApi = {
      getState: store.getState,
      dispatch: action => dispatch(action)
    }
    const middlewareChain = middlewares.map(middleware => middleware(midApi)); 

    dispatch = compose(...middlewareChain)(store.dispatch)

    return {
      ...store,
      // dispatch的增强
      dispatch
    }
  }
}
const compose = function(...functions) {
  if(functions.length == 0) {
    return args => args
  }
  if(functions.length == 0) {
    return functions[0]
  }
  return functions.reduce((a, b) => (...args) => a(b(...args)))
}
```

## combineReducers

```js
function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let nextState = {}
    // 初始值肯定为false。未改变
    let hasChanged = false
    // 遍历reducers
    for(let key in reducers) {
      // 拿到reducer
      const reducer = reducers[key]
      // 执行action，赋值给新的state
      nextState[key] = reducer(state[key], action)
      // 判断action执行是否生效，如果生效则证明这是一个命名空间
      hasChanged = hasChanged || nextState[key] !== state[key]
    }
     // 判断是否有命名空间
    hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length;
    return hasChanged ? nextState : state
  }
}
```

## 中间件

### logger

```js
function logger({dispatch, getState}) {
  return next => action => {
    console.log("+++++++++++++++++++++++++++++++"); //sy-log

    // prev state

    const prevState = getState();
    console.log("prev state", prevState); //sy-log

    const returnValue = next(action);
    // next state
    const nextState = getState();
    console.log("next state", nextState); //sy-log

    console.log("+++++++++++++++++++++++++++++++"); //sy-log

    return returnValue;
  };
}
```

### thunk

```js
function thunk({dispatch, getState}) {
  return next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}
```

### promise

```js
function promise({dispatch}) {
  return next => action => {
    return isPromise(action) ? action.then(dispatch) : next(action)
  }
}
```
