# redis

redis是一个开源数据的kv数据库，它的数据放置于内存当中，常用来做缓存服务器。

## 安装

安装

```bash
//下载

wget <http://download.redis.io/releases/redis-5.0.8.tar.gz>

安装目录/usr/local/redis

//解压
tar -zxf xx

make

// 执行make install进行Redis安装

make install

//为了方便管理，将Redis文件中的conf配置文件和常用命令移动到统一文件中
mkdir bin etc

mv redis.conf /usr/local/redis/etc/

mv mkreleasehdr.sh redis-benchmark redis-check-aof redis-check-rdb redis-cli redis-server /usr/local/redis/bin/

// 启动
redis-server

// 设置绑定ip

vim /etc/redis.conf

bind xxx

// 设置后台启动redis
vim redis.conf
daemonized yes

// 查看redis进程
netstat -tunpl|grep 6379

// 链接redis客户端
redis-cli
```

## 使用yum安装

```js
//需要安装Remi的软件源
yum install -y http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
//然后可以使用下面的命令安装最新版本的redis
yum --enablerepo=remi install redis
//安装完毕后，即可使用下面的命令启动redis服务
service redis start
或者
systemctl start redis
```

## 特点

- 速度快，因为数据在内存当中，类似于HashMap
- 支持丰富的数据类型，string, list, set, hash
- 支持事物，操作都是原子性的
- 丰富的特性，应用场景广泛

## 应用场景

### 缓存

因为redis的读取性能优异，每秒可以处理超过10w次的读写操作。redis可以保存多种数据结构，单个value的最大限制是1GB,而memcached只能保存1md的数据。

### 分布式锁

因为redis单线程的特点，对于高并发系统，都是用多服务器部署，在进行逻辑处理的时候可以用到分布式锁来限制程序的并发。

### 自动过期

redis针对数据都可以设置过期时间，可以自动清理过期数据，常见的应用场景：短信验证码，活动开始和截止日期等。

### 秒杀的缓存层

可以利用redis单线程的特性来控制并发，将redis作为缓存平台，由于其读写能力强，不易产生程序阻塞现象。

### 发布订阅

可以使用redis的发布订阅模式实现一些聊天系统。

## redis问题

### 缓存雪崩

缓存雪崩，是指缓存中设置了大批量相同过期时间的数据同时过期失效，而在这一刻访问量剧增，缓存近乎失效，所有请求全部转向DB，DB瞬时压力过重雪崩，甚至down机。和缓存击穿不同的是，缓存击穿指并发查同一条数据，缓存雪崩是不同数据都过期了，很多数据都查不到从而查数据库。

解决方案：

- 设置热点数据永不过期。
- 过期时间设置随机，防止同一时间大量数据过期现象发生。
- 若redis缓存是分布式部署，可以把热点数据均匀分布在不同缓存数据库中。

### 缓存穿透

缓存穿透是指查询一个缓存和数据库中都没有的数据，由于大部分缓存策略是被动加载的，并且出于容错考虑，如果从存储层查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到存储层去查询，失去了缓存的意义。用户不断发起请求，在流量大时，就可能对DB形成巨大的压力，利用不存在的key频繁攻击应用也是很大的问题。

- 缓存和数据库中都不存在的数据，可以将此key对应的value设置为一个默认的值，比如“NULL”，并设置一个缓存的失效时间，这时在缓存失效之前，所有通过此key的访问都被缓存挡住了。后面如果此key对应的数据在DB中存在时，缓存失效之后，通过此key再去访问数据，就能拿到新的value了。

- 接口层增加校验，比如用户鉴权校验，id根据数据场景做基础校验，id<=0的直接拦截。

### 缓存击穿

缓存击穿是指缓存中的一个热点Key(比如一个秒杀商品)，在某个时间点过期的时候，恰好在这个时间点访问量剧增，对这个Key有大量的并发请求过来，请求发现缓存过期一般都会从后端DB加载数据并回设回缓存，但就在缓存中的数据还没有完全从DB中加载过来的这个时间段期间，并发瞬间造成大量请求直接击穿到DB，对DB形成巨大压力。

缓存击穿，又叫热点key问题，是这三个问题中最经典的一个问题。

- 设置热点数据永不过期。
- 资源保护，服务降级。

### 缓存雪崩和缓存击穿的区别

缓存击穿跟缓存雪崩类似，区别就是缓存雪崩是群体失效，缓存击穿是单体失效。
