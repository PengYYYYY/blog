# alinode监控

## egg集成版本

```bash
# nodeinstall是一个替换node_modules中运行时的工具，只会替换项目本地的运行时。
npm i nodeinstall -g
# 安装对应版本的alinode
nodeinstall --install-alinode ^3
# 对应表
https://help.aliyun.com/document_detail/60811.html?spm=a2c4g.11186623.6.586.63792b17oYIVhc
# egg插件配置
exports.alinode = {
  enable: true,
  package: 'egg-alinode'
};
// config/config.default.js
exports.alinode = {
  server: 'wss://agentserver.node.aliyun.com:8080',
  appid: 'Node.js 性能平台给您的项目生成的 appid',
  secret: 'Node.js 性能平台给您的项目生成的 secret',
  logdir: 'Node.js 性能平台日志输出地址绝对路径，与 NODE_LOG_DIR 保持一致。如：/tmp/',
  error_log: [
    '您的应用在业务层面产生的异常日志的路径，数组，可选，可配置多个',
    '例如：/root/.logs/error.#YYYY#-#MM#-#DD#.log',
    '不更改 Egg 默认日志输出路径可不配置本项目',
  ],
  agentidMode:'IP' '可选，如果设置，则在实例ID中添加部分IP信息，用于多个实例 hostname 相同的场景（以容器为主）'
};
```
