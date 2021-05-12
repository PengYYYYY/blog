# 一些nginx知识

CPU 朝着多核方向发展，之前的霸主 Apache 一个进程同一时间只能处理一个连接，处理完一个请求后才能处理下一个，这无疑不能应对如今互联网上海量的用户。况且进程间切换的成本是非常高的。在这种背景下，Nginx 应运而生，可以轻松处理数百万、上千万的连接。

## Nginx 优势

- 高并发高性能
- 可扩展性好
- 高可靠性
- 热部署

## Nginx 主要应用场景

- 静态资源服务，通过本地文件系统提供服务
- 反向代理服务、负载均衡
- API 服务、权限控制，减少应用服务器压力
- 网关服务

## 正向代理 Forward proxy

正向代理的对象时客户端，服务端看不到真正的客户端。

```nginx
server { 
  location / {     
    # 当客户端请求我的时候，我会把请求转发给它      
    # $http_host 要访问的主机名 $request_uri 请求路径      
    proxy_pass http://$http_host$request_uri;
  }
}
```

## 反向代理 Reverse proxy

解决跨域问题，在生产中，可以使用nginx的反向代理来解决跨域：

```nginx
server {    
  listen   80;    
  server_name   localhost; # 用户访问 localhost，反向代理到 http://www.baidu.com
  location / {        
    proxy_pass http://www.baidu.com
  }
}
```

## Gzip

gzip 是互联网上非常普遍的一种数据压缩格式，对于纯文本来说可以压缩到原大小的 40%，可以节省大量的带宽。启用 gzip 所需的 HTTP 最低版本是 1.1。

```nginx
location ~ .*\. (jpg|png|gif)$ {    
  gzip off; #关闭压缩    
  root xxxx;
}
location ~ .*\. (html|js|css)$ {    
  gzip on; #启用压缩    
  gzip_min_length 1k; # 超过1K的文件才压缩    
  gzip_http_version 1.1; # 启用gzip压缩所需的HTTP最低版本    
  gzip_comp_level 9; # 压缩级别，压缩比率越高，文件被压缩的体积越小    
  gzip_types text/css application/javascript; # 进行压缩的文件类型    
  root xxxx;
}
```

## 请求限制

对于大流量恶意的访问，会造成带宽的浪费，给服务器增加压力。往往对于同一 `IP` 的连接数以及并发数进行限制。
关于请求限制主要有两种类型：

- limit_conn_module 连接频率限制
- limit_req_module 请求频率限制

```nginx
# $binary_remote_addr 远程IP地址 zone 区域名称 10m内存区域大小
limit_conn_zone $binary_remote_addr zone=coon_zone:10m;
server {    
  # conn_zone 设置对应的共享内存区域 1是限制的数量 
  limit_conn conn_zone 1;
}
```

```nginx
# $binary_remote_addr 远程IP地址 zone 区域名称 10m内存区域大小 rate 为请求频率 1s 一次limit_req_zone $binary_remote_addr zone=req_zone:10m rate=1r/s;
server {    
  location / {        
    # 设置对应的共享内存区域 burst最大请求数阈值 nodelay不希望超过的请求被延迟        
    limit_req zone=req_zone burst=5 nodelay;   
  }
}
```

## 访问控制

```nginx
// 基于 IP 的访问控制
server {
  location ~ ^/index.html { 
    # 匹配 index.html 页面 除了 127.0.0.1 以外都可以访问  
    deny 127.0.0.1;  
    allow all; 
  }
}
```

## 防盗链

防盗链的原理就是根据请求头中 referer 得到网页来源，从而实现访问控制。这样可以防止网站资源被非法盗用，从而保证信息安全，减少带宽损耗，减轻服务器压力。

```nginx
location ~ .*\.(jpg|png|gif)$ { # 匹配防盗链资源的文件类型    
  # 通过 valid_referers 定义合法的地址白名单 $invalid_referer 不合法的返回403      
  valid_referers none blocked 127.0.0.1;    
  if ($invalid_referer) {        
    return 403;    
  }
}
```

## 负载均衡 Load Balance

当我们的网站需要解决高并发、海量数据问题时，就需要使用负载均衡来调度服务器。将请求合理的分发到应用服务器集群中的一台台服务器上。

```nginx
# upstream 指定后端服务器地址
# weight 设置权重
# server 中会将 http://webcanteen 的请求转发到 upstream 池中

upstream webcanteen {    
  server 127.0.0.1:66 weight=10;    
  server 127.0.0.1:77 weight=1;    
  server 127.0.0.1:88 weight=1;}
server {    
  location / {        
    proxy_pass http://webcanteen    
  }
}
```

### 后端服务器状态

down：当前服务器不参与负载均衡
backup：当其他节点都无法使用时的备用服务器
max_fails：允许请求失败的次数，若到达就会休眠
fail_timeout：经过 max_fails 次失败后，服务器的暂停时间，默认为 10s
max_conns：限制每个服务器的最大接收连接数

```nginx
upstream webcanteen { 
  server 127.0.0.1:66 down; 
  server 127.0.0.1:77 backup; 
  server 127.0.0.1:88  max_fails=3 fail_timeout=10s; 
  server 127.0.0.1:99 max_conns=1000;
}
```

### 分配方式

轮询（默认），每个请求按照时间顺序轮流分配到不同的后端服务器，如果某台后端服务器宕机，Nginx 轮训列表会自动将它去除掉；
weight（加权轮询），轮询的加强版，weight 和访问几率成正比，主要用于后端服务器性能不均的场景；
ip_hash，每个请求按照访问 IP 的 hash 结果分配，这样每个访问可以固定访问一个后端服务器；
url_hash，按照访问 URL 的 hash 结果来分配请求，使得每个 URL 定向到同一个后端服务器上，主要应用于后端服务器为缓存时的场景；
自定义 hash，基于任意关键字作为 hash key 实现 hash 算法的负载均衡；
fair，按照后端服务器的响应时间来分配请求，响应时间短则优先分配。
