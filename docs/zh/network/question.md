# nginx

配置http1。1

一个api。开启1.1和keep-alive之后，nginx连接的keep-alive-request（复用次数）和keep-alive-timeout（连接可用时长）时长和次数不对称，导致偶发性的503，当时是出现在流量低谷的时候出现这样的情况，发生的原因是在keep-alive-timeout时间内，nginx还认为这个连接次数还在，就会导致这个问题。

解决方案：日志平台上面的问题，最后无奈把1.1关了。
四次挥手的慢：服务端出现大量的close_wait。2个MSL。状态等待导致很多的连接具柄。
升级1.1之后出现503问题，time_wait降低。

配置http2.0

nginx里面是有一个复用次数和，时间。
在chrome上，不同的window，不同的tab使用的是一个tcp，多路复用。
nginx里面加ssl和http2。
http2内部系统有加解密吗？

http2.0还是会存在一些问题的
比如：

哈夫曼编码，哈夫曼树来确认他的编码。
