# mysql

## 在linux下的安装

```bash
// 检查是否已经安装过mysql，执行命令
rpm -qa | grep mysql

// 查询所有Mysql对应的文件夹
whereis mysql
find / -name mysql

//检查mysql用户组和用户是否存在，如果没有，则创建
cat /etc/group | grep mysql
cat /etc/passwd |grep mysql
groupadd mysql

//下载并安装MySQL官方的 Yum Repository
wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm

//yum安装
yum -y install mysql57-community-release-el7-10.noarch.rpm

//开始安装MySQL服务器
yum -y install mysql-community-server

// 启动mysql
systemctl start  mysqld.service
// 查看mysql状态
systemctl status mysqld.service
```

## 用户设置

```bash
// 找到密码
grep "password" /var/log/mysqld.log
// 登陆
mysql -uroot -p
//设置密码等级
set global validate_password_policy=0;
set global validate_password_length=1;
//替换临时密码
ALTER USER USER() IDENTIFIED BY 'pengyue'
//新建用户
CREATE USER '用户名'@'连接主机(%为全部)' IDENTIFIED BY '密码';
//设置权限
GRANT ALL ON *.* TO '用户名'@'连接主机(%为全部)';
GRANT SELECT, INSERT ON test.user TO '用户名'@'连接主机(%为全部)';
```

## 常见问题

### 无法连接（2003）

```bash
firewall-cmd --state  查看防火墙状态

firewall-cmd --list-ports 查看放行端口

firewall-cmd --zone=public --add-port=3306/tcp --permanent 放行某端口

systemctl restart firewalld.service    重启防火墙服务

systemctl stop firewalld.service 关闭防火墙服务
```

## 数据库备份

```bash
mysqldump -uroot -p'xxxx' DBName > directory/filename.sql
```
