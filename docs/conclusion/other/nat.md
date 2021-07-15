# 多种内网穿透姿势，简单易用

## 什么是内网穿透

内网穿透，即NAT穿透，网络连接时术语，计算机是局域网内时，外网与内网的计算机节点需要连接通信，有时就会出现不支持内网穿透。就是说映射端口，能让外网的电脑找到处于内网的电脑，提高下载速度。不管是内网穿透还是其他类型的网络穿透，都是网络穿透的统一方法来研究和解决。
简单来说就是：外网访问内网指定机器指定端口

### 应用场景

- 提供内网穿透服务
- 连接内网服务器，在外网演示内网web站点
- 无需服务器部署，快速调试本地程序，微信公众号开发利器
- 支持http、https协议站点，省去证书中间件复杂配置，http协议站点直接升级为https站点
- 支持TCP，UDP协议端口转发。支持数据库、SSH、远程桌面、网络摄像头等等开放到外网

## frp工具的使用

搭建稍微复杂，但是非常灵活，目前内网穿透首选了。[frp传送门](https://github.com/fatedier/frp)

### 需要的工具

- vps一台，随便什么云都可以

- 自己的终端

### 内网穿透实现web服务

先登陆vps看看自己的处理器架构然后选择对应版本的frp

```shell
arch
// x86_64
```

选择[amd64版本(frp_0.33.0_linux_amd64.tar.gz)](https://github.com/fatedier/frp/releases)

```shell
wget https://github.com/fatedier/frp/releases/download/v0.33.0/frp_0.33.0_linux_amd64.tar.gz

// 解压
tar -zxvf frp_0.33.0_linux_amd64.tar.gz
mv frp_0.33.0_linux_amd64 frp

vim frps.ini

// 添加下面配置
[common]
bind_port = 7000
dashboard_port = 7001
token = superYue
dashboard_user = frp
dashboard_pwd = frp
```

- bind_port表示客户端和服务端连接的端口，默认是7000，需要跟客户端的bind_port保持一致。
- dashboard_port是服务端仪表盘的端口，配置完成以后可以通过浏览器访问x.x.x.x:7500查看frp服务的dashborad。
- token是用于客户端跟服务端连接的口令，连接口令，要跟客户端的token保持一致就行。
- dashboard_user和dashboard_pwd表示打开仪表板页面登录的用户名和密码，登陆时候要用上。

```shell
vim frps.ini
```

添加如下配置：

```shell
[common]
bind_port = 7000
token = superYue
vhost_http_port = 10080
vhost_https_port = 10443
```

- bind_port表示客户端和服务端连接的端口，默认是7000，需要保持和客户端的bind_port一致。
- token跟服务端设置的token保持一致。
- vhost_http_port和vhost_https_port用于服务端主机访问的端口，需要再vps安全组里添加此端口，保持端口放行。

### 启动

```shell
./frps -c frps.ini

// 守护进程
nohup ./frps -c frps.ini
```

打开配置的x.x.x.x:7500就可以看到仪表板截面。

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/cnV1Hg.png)

### 客户端设置

安装同样版本的`frp`,安装方法一样，mac上面需要使用 `frp_0.33.0_darwin_amd64.tar.gz`这个版本

```shell
vim frpc.ini

[common]
server_addr = xxxxx
server_port = 7000
token = superYue

[web]
type = http
local_port = 9003
custom_domains = xx.xx.xx
```

- server_addr使用的是外网机器IP。
- server_port服务端设置的端口。
- local_port为本地客户端启动的web服务。
- type为代理的类型，web服务设置为http类型。
- custom_domains为外网VPS绑定的访问域名或者机器的IP。

### 启动客户端

```shell
./frpc -c frpc.ini

// 守护进程
nohup ./frpc -c frpsc.ini
```

启动成功之后，使用外网IP或者域名:vhost_http_port，即custom_domains:10080，就可以通过外网的访问自己内网/本地启动的web服务了。

### 内网穿透实现SSH连接

配置 frpc.ini

```shell
vim frpc.ini

[common]
xxx/ 不赘述了

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 8001
```

- server_addr就是你公网服务器的IP。
- server_port服务端设置的端口。
- token跟服务端设置的token保持一致即可。
- type为代理的类型，SSH服务设置为tcp类型。
- local_ip为本地IP。
- local_port为内网客户端设置的SSH端口。
- remote_port为内网提供给外网访问的服务端口。

启动方式跟穿透Web服务一样，这样我可以通过服务器公网IP和8001端口来连接本地的机器了（SSH）。

```shell
ssh -p remote_port username@server_addr
```

- remote_port使用的是内网机器设置的端口。
- username使用的是内网机器的用户名。
- server_addr使用的是外网机器IP。

frp还有很多其他协议支持，`tcp`,`udp`,`http`,`https`,`stcp`,  但是frp的配置方式稍微繁琐，并且需要有自己的vps，下面介绍的工具就非常简单了。

## ngrok工具的使用

打开ngrok官网注册一个账号后登录，[ngrok官网](https://dashboard.ngrok.com)

### 下载客户端

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/q0LAns.png)

### 配置客户端authtoken

首页基本给了你想要的一切

> command 方式

```shell
./ngrok authtoken xxxx
```

> config 方式

``` shell
cd ~/.ngrok2/ngrok.yml
authtoken: xxxxx
```

### 开始做内网穿透

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/ngap0n.png)

假设你在本机上启动了一个端口号为8000的服务，使用内网穿透工具将当前8000端口的服务映射到外网去。 打开ngrok客户端

```shell
ngrok http 8000
```

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/BfBZNa.png)

这样就可通过外网访问 `http://24a2c2f8390e.ngrok.io` 自己内网的服务啦,是不是非常简单。但是比frp搭建少了一些灵活性，但是不能自定义域名之类的，用来临时处理一下内网穿透需求还是很方便的。

## 小结

当然内网穿透的姿势远不至这些，有兴趣的话自己研究把，希望上面的内容可以帮到大家。
