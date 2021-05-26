# aliNode监控

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

## 性能指标概念

### TPS

TPS Transactions Per Second 也就是事务数/秒。一个事务是指一个客户机向服务器发送请求然后服务器做出反应的过程。客户机在发送请求时开始计时，收到服务器响应后结束计时，以此来计算使用的时间和完成的事务个数，

### QPS

Queries Per Second 是每秒查询率, 是一台服务器每秒能够相应的查询次数，是对一个特定的查询服务器在规定时间内所处理流量多少的衡量标准, 即每秒的响应请求数，也即是最大吞吐能力。

### QPS和TPS区别

1、Tps即每秒处理事务数，包括了

1）用户请求服务器  2）服务器自己的内部处理  3）服务器返回给用户

2.Qps基本类似于Tps，但是不同的是，对于一个页面的一次访问，形成一个Tps；但一次页面请求，可能产生多次对服务器的请求，服务器对这些请求，就可计入“Qps”之中。

### 并发数

指系统同时能处理的请求数量，同样反应了系统的负载能力。这个数值可以分析机器1s内的访问日志数量来得到

### 吐吞量

吞吐量是指系统在单位时间内处理请求的数量，TPS、QPS都是吞吐量的常用量化指标。

### 系统吞吐量要素

一个系统的吞吐量（承压能力）与request（请求）对cpu的消耗，外部接口，IO等等紧密关联。单个request 对cpu消耗越高，外部系统接口，IO影响速度越慢，系统吞吐能力越低，反之越高。

### PV

PV（Page View）：页面访问量，即页面浏览量或点击量，用户每次刷新即被计算一次。可以统计服务一天的访问日志得到。

### UV

UV（Unique Visitor）：独立访客，统计1天内访问某站点的用户数。可以统计服务一天的访问日志并根据用户的唯一标识去重得到。

响应时间（RT）：响应时间是指系统对请求作出响应的时间，一般取平均响应时间。可以通过Nginx、Apache之类的Web Server得到。

### DAU

DAU(Daily Active User)，日活跃用户数量。常用于反映网站、互联网应用或网络游戏的运营情况。DAU通常统计一日（统计日）之内，登录或使用了某个产品的用户数（去除重复登录的用户），与UV概念相似  

### MAU

MAU(Month Active User)：月活跃用户数量，指网站、app等去重后的月活跃用户数量

### 响应时间(RT)

响应时间是指系统对请求作出响应的时间

## 软件性能的关注点

- 响应时间
- 服务器资源使用情况是否合理
- 应用服务器和数据库资源使用是否合理
- 系统能否实现扩展
- 系统最多支持多少用户访问、系统最大业务处理量是多少
- 系统性能可能存在的瓶颈在哪里
- 更换那些设备可以提高性能
- 系统能否支持7×24小时的业务访问
