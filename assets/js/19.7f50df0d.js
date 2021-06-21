(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{370:function(s,a,t){"use strict";t.r(a);var n=t(25),r=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"mysql"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mysql"}},[s._v("#")]),s._v(" mysql")]),s._v(" "),t("h2",{attrs:{id:"mysql的安装与基本配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mysql的安装与基本配置"}},[s._v("#")]),s._v(" mysql的安装与基本配置")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("// 检查是否已经安装过mysql，执行命令\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rpm")]),s._v(" -qa "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" mysql\n\n// 查询所有Mysql对应的文件夹\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("whereis")]),s._v(" mysql\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" / -name mysql\n\n//检查mysql用户组和用户是否存在，如果没有，则创建\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" /etc/group "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" mysql\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" /etc/passwd "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" mysql\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("groupadd")]),s._v(" mysql\n\n//下载并安装MySQL官方的 Yum Repository\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm\n\n//yum安装\nyum -y "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" mysql57-community-release-el7-10.noarch.rpm\n\n//开始安装MySQL服务器\nyum -y "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" mysql-community-server\n\n// 启动mysql\nsystemctl start  mysqld.service\n// 查看mysql状态\nsystemctl status mysqld.service\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br")])]),t("h3",{attrs:{id:"用户设置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#用户设置"}},[s._v("#")]),s._v(" 用户设置")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("// 找到密码\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"password"')]),s._v(" /var/log/mysqld.log\n// 登陆\nmysql -uroot -p\n//设置密码等级\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" global "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("validate_password_policy")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" global "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("validate_password_length")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n//替换临时密码\nALTER "),t("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("USER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("USER")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" IDENTIFIED BY "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'pengyue'")]),s._v("\n//新建用户\nCREATE "),t("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("USER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'用户名'")]),s._v("@"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'连接主机(%为全部)'")]),s._v(" IDENTIFIED BY "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'密码'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n//设置权限\nGRANT ALL ON *.* TO "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'用户名'")]),s._v("@"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'连接主机(%为全部)'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nGRANT SELECT, INSERT ON test.user TO "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'用户名'")]),s._v("@"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'连接主机(%为全部)'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br")])]),t("h3",{attrs:{id:"常见问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常见问题"}},[s._v("#")]),s._v(" 常见问题")]),s._v(" "),t("h3",{attrs:{id:"无法连接（2003）"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#无法连接（2003）"}},[s._v("#")]),s._v(" 无法连接（2003）")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("firewall-cmd --state  查看防火墙状态\n\nfirewall-cmd --list-ports 查看放行端口\n\nfirewall-cmd --zone"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("public --add-port"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3306")]),s._v("/tcp --permanent 放行某端口\n\nsystemctl restart firewalld.service    重启防火墙服务\n\nsystemctl stop firewalld.service 关闭防火墙服务\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("h3",{attrs:{id:"数据库备份"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据库备份"}},[s._v("#")]),s._v(" 数据库备份")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("mysqldump -uroot -p"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xxxx'")]),s._v(" DBName "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" directory/filename.sql\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"数据源处理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据源处理"}},[s._v("#")]),s._v(" 数据源处理")]),s._v(" "),t("ul",[t("li",[s._v("热数据:3个月内的订单数据，查询实时性较高;")]),s._v(" "),t("li",[s._v("冷数据A:3个月 ~ 12个月前的订单数据，查询频率不高;")]),s._v(" "),t("li",[s._v("冷数据B:1年前的订单数据，几乎不会查询，只有偶尔的查询需求;")])]),s._v(" "),t("p",[s._v("因为根据实际场景需求，用户基本不会去查看1年前的数据，如果将这部分数据还存储在db中，那么成本会非常高，而且也不便于维护。另外如果真遇到有个别用户需要查看1年前的订单信息，可以让用户走离线数据查看。")]),s._v(" "),t("h2",{attrs:{id:"分库分表"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#分库分表"}},[s._v("#")]),s._v(" 分库分表")]),s._v(" "),t("h3",{attrs:{id:"分库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#分库"}},[s._v("#")]),s._v(" 分库")]),s._v(" "),t("h4",{attrs:{id:"垂直分库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#垂直分库"}},[s._v("#")]),s._v(" 垂直分库")]),s._v(" "),t("p",[s._v("随着业务系统的扩大，系统越来越复杂，越来越难以维护，开发效率变得越来越低，并且对资源的消耗也变得越来越大，通过硬件提高系统性能的成本会变得更高。可以进行分库，将所有业务都放在一个库中已经变得越来越难以维护，因此可以将不同业务放在不同的库中。")]),s._v(" "),t("blockquote",[t("p",[s._v("不分库")])]),s._v(" "),t("p",[s._v("总库: a表，b表，c表")]),s._v(" "),t("blockquote",[t("p",[s._v("分库")])]),s._v(" "),t("p",[s._v("a库：a表，b库：b表，c库：\bc表")]),s._v(" "),t("h4",{attrs:{id:"水平分库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#水平分库"}},[s._v("#")]),s._v(" 水平分库")]),s._v(" "),t("p",[s._v("水平分库是把同一个表的数据按一定规则拆到不同的数据库中，每个库可以放在不同的服务器上。")]),s._v(" "),t("p",[s._v("当数据量过大的时候，且无法做垂直分库的时候，将同一个库的数据分散到不同的库里面。例如：1-10000放A库，10000-20000放B库。")]),s._v(" "),t("p",[s._v("垂直分库是把不同表拆到不同数据库中，它是对数据行的拆分，不影响表结构。")]),s._v(" "),t("p",[s._v("它带来的提升是：")]),s._v(" "),t("ul",[t("li",[s._v("解决了单库大数据，高并发的性能瓶颈。")]),s._v(" "),t("li",[s._v("提高了系统的稳定性及可用性。")])]),s._v(" "),t("h3",{attrs:{id:"分表"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#分表"}},[s._v("#")]),s._v(" 分表")]),s._v(" "),t("h4",{attrs:{id:"垂直分表"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#垂直分表"}},[s._v("#")]),s._v(" 垂直分表")]),s._v(" "),t("p",[s._v("将一个表按照字段分成多表，每个表存储其中一部分字段")]),s._v(" "),t("p",[s._v("垂直分表就是将一张表拆分为多两张表，如商品表：商品访问频次低的话，单独存放到一张表中。商品访问频次高的字段单独存放到一张表中。")]),s._v(" "),t("blockquote",[t("p",[s._v("带来的提升")])]),s._v(" "),t("ul",[t("li",[s._v("为了避免IO争抢并减少锁表的几率，查看详情的用户与商品信息浏览互不影响")]),s._v(" "),t("li",[s._v("充分发挥热门数据的操作效率，商品信息的操作的高效率不会被商品描述的低效率所拖累。")])]),s._v(" "),t("p",[s._v("为什么大字段IO效率低：第一是由于数据量本身大，需要更长的读取时间；第二是跨页，页是数据库存储单位，很多查找及定位操作都是以页为单位，单页内的数据行越多数据库整体性能越好，而大字段占用空间大，单页内存储行数少，因此IO效率较低。第三，数据库以行为单位将数据加载到内存中，这样表中字段长度较短且访问频率较高，内存能加载更多的数据，命中率更高，减少了磁盘IO，从而提升了数据库性能。（内存分页）")]),s._v(" "),t("p",[s._v("拆分准则：")]),s._v(" "),t("ol",[t("li",[s._v("把不常用的字段单独放在一张表;")]),s._v(" "),t("li",[s._v("把text，blob等大字段拆分出来放在附表中;")]),s._v(" "),t("li",[s._v("经常组合查询的列放在一张表中;")])]),s._v(" "),t("h4",{attrs:{id:"水平分表"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#水平分表"}},[s._v("#")]),s._v(" 水平分表")]),s._v(" "),t("p",[s._v("将一张表分为多张表，假设一张表里面放1000条数据，")]),s._v(" "),t("p",[s._v("使用主键作为唯一标识,"),t("code",[s._v("primaryKey % 1000")]),s._v("，主键取模可以确定在哪一张表里面。")]),s._v(" "),t("p",[s._v("数据库分表能够解决单表数据量很大的时候数据查询的效率问题，但是无法给数据库的并发操作带来效率上的提高，因为分表的实质还是在一个数据库上进行的操作，很容易受数据库IO性能的限制。将数据进行分库操作可以很好地解决单台数据库的性能问题。分库策略与分表策略的实现很相似，最简单的都是可以通过取模的方式进行路由。")]),s._v(" "),t("h2",{attrs:{id:"数据库架构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据库架构"}},[s._v("#")]),s._v(" 数据库架构")]),s._v(" "),t("p",[s._v("数据库架构原则：")]),s._v(" "),t("ul",[t("li",[s._v("高可用")]),s._v(" "),t("li",[s._v("高性能")]),s._v(" "),t("li",[s._v("一致性")]),s._v(" "),t("li",[s._v("拓展性")])]),s._v(" "),t("h3",{attrs:{id:"主备架构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#主备架构"}},[s._v("#")]),s._v(" 主备架构")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/PENG_YUE/myImg/raw/master/uPic/F2xnjq.png",alt:"img"}})]),s._v(" "),t("p",[s._v("只有主库提供读写服务，备库冗余作故障转移用")]),s._v(" "),t("ul",[t("li",[s._v("高可用：主库挂了会自动切换到备库。")]),s._v(" "),t("li",[s._v("高性能分析：读写都操作主库，很容易产生瓶颈，大部分互联网应用读多写少，读会先成为瓶颈，进而影响写性能。另外，备库只是单纯的备份，资源利用率50%。")]),s._v(" "),t("li",[s._v("一致性：读写都操作主库，不存在数据一致性问题")]),s._v(" "),t("li",[s._v("扩展性：无法通过加从库来扩展读性能，进而提高整体性能")]),s._v(" "),t("li",[s._v("可落地性：两点影响落地使用。第一，性能一般，这点可以通过建立高效的索引和引入缓存来增加读性能，进而提高性能。第二，扩展性差，这点可以通过分库分表来扩展。")])]),s._v(" "),t("h3",{attrs:{id:"双主架构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#双主架构"}},[s._v("#")]),s._v(" 双主架构")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/PENG_YUE/myImg/raw/master/uPic/wFmpwu.png",alt:"img"}})]),s._v(" "),t("p",[s._v("两个主库同时提供服务，负载均衡")]),s._v(" "),t("ul",[t("li",[s._v("高可用：一个主库挂了，不影响另一台主库提供服务，这个过程对业务层是透明的，无需修改代码或配置。")]),s._v(" "),t("li",[s._v("高性能分析：读写性能相比于方案一都得到提升，提升一倍。")]),s._v(" "),t("li",[s._v("一致性分析：存在数据一致性问题。")]),s._v(" "),t("li",[s._v("扩展性分析：可以扩展成三主循环。")]),s._v(" "),t("li",[s._v("可落地分析：第一，数据一致性问题，一致性解决方案可解决问题。第二，主键冲突问题，ID统一地由分布式ID生成服务来生成可解决问题。")])]),s._v(" "),t("h3",{attrs:{id:"主从架构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#主从架构"}},[s._v("#")]),s._v(" 主从架构")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/PENG_YUE/myImg/raw/master/uPic/y4ju8Y.png",alt:"img"}})]),s._v(" "),t("p",[s._v("一主多从，读写分离")]),s._v(" "),t("ul",[t("li",[s._v("高可用：主库单点，从库高可用。一旦主库挂了，写服务也就无法提供。")]),s._v(" "),t("li",[s._v("高性能设计：大部分互联网应用读多写少，读会先成为瓶颈，")]),s._v(" "),t("li",[s._v("一致性分析：存在数据一致性问题")]),s._v(" "),t("li",[s._v("扩展性分析：可以通过加从库来扩展读性能，进而提高整体性能。")]),s._v(" "),t("li",[s._v("可落地分析：第一，数据一致性问题，一致性解决方案可解决问题。第二，主库单点问题，笔者暂时没想到很好的解决方案。")])]),s._v(" "),t("h3",{attrs:{id:"双主双从架构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#双主双从架构"}},[s._v("#")]),s._v(" 双主双从架构")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/PENG_YUE/myImg/raw/master/uPic/IB13D5.png",alt:"img"}})]),s._v(" "),t("ul",[t("li",[s._v("高可用分析：高可用。")]),s._v(" "),t("li",[s._v("高性能分析：高性能。")]),s._v(" "),t("li",[s._v("一致性分析： 存在数据一致性问题。")]),s._v(" "),t("li",[s._v("扩展性分析：可以通过加从库来扩展读性能，进而提高整体性能")])]),s._v(" "),t("h2",{attrs:{id:"一致性解决方案"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一致性解决方案"}},[s._v("#")]),s._v(" 一致性解决方案")]),s._v(" "),t("h3",{attrs:{id:"主从数据一致性问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#主从数据一致性问题"}},[s._v("#")]),s._v(" 主从数据一致性问题")]),s._v(" "),t("p",[s._v("数据不一致性产生的原因：")]),s._v(" "),t("p",[s._v("数据同步（从库从主库拉取binlog日志，再执行一遍）是需要时间的，这个同步时间内主库和从库的数据会存在不一致的情况。如果同步过程中有读请求，那么读到的就是从库中的老数据。\n"),t("img",{attrs:{src:"https://gitee.com/PENG_YUE/myImg/raw/master/uPic/I4vkpM.png",alt:"img"}})]),s._v(" "),t("h4",{attrs:{id:"如何解决"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#如何解决"}},[s._v("#")]),s._v(" 如何解决")]),s._v(" "),t("ul",[t("li",[s._v("强制读主，采用主备架构方案，读写都走主库。用缓存来扩展数据库读性能 。")]),s._v(" "),t("li",[s._v("选择读主，写操作时根据库+表+业务特征生成一个key放到Cache里并设置超时时间（大于等于主从数据同步时间）。读请求时，同样的方式生成key先去查Cache，再判断是否命中。若命中，则读主库，否则读从库。")]),s._v(" "),t("li",[s._v("半同步复制，等主从同步完成，写请求才返回。代价是写请求时延增长，吞吐量降低。")])])])}),[],!1,null,null,null);a.default=r.exports}}]);