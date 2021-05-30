# 路由

## vue-router

## react-router

- 安装

```js
npm install --save react-router-dom
```

```js
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

export default class RouterPage extends Component {
  render() {
    return (
      <div>
        <h3>RouterPage</h3>
        <Router>
          <Switch>
            <Link to="/">首页</Link>
            <Link to="/user">用户中心</Link>
            <Route exact path="/" component={xxx} children={() => <div />}  render={() => <div>render</div>}/>
            <Route component={404Component}/> 
          </Switch>
        </Router>
      </div>
    )
  }
}
```

三种渲染方式

- component(优先级最低)：只有当location匹配的时候渲染
- children(优先级最高)：永远都会被渲染
- render(优先级第二)：当location匹配被渲染
