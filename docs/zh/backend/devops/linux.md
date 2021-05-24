# linux搭建环境

## 系统配置

```bash
// 关闭防火墙 和禁止开机启动
systemctl stop firewalld
systemctl disable firewalld

// 关闭selinux
cat /etc/selinux/config
SELINUX=disable
getenforce
```

## 配置ssh

```bash
ssh-copy-id -i id_rsa.pub user@publicNet IP

// pem公钥
ssh-keygen -m PEM -t rsa -b 4096 -C "your_email@example.com" 需要用pem格式

 生成ssh：ssh-keygen -t rsa -C "your_email@example.com"
```

## 本地config

```bash
// .shh/config

Host tx1pengyue
HostName 118.24.3.246
User pengyue
IdentitiesOnly yes
```

## 配置User

```bash
添加用户：adduser $_newUser 
设置密码：passwd $_newUser
创建分组：groupadd $_groupName
加入组：gpasswd -a $_newUser $_groupName
移除组：gpasswd -d $_newUser $_groupName
进入home文件分配权限：cd /home
分配权限：chmod 777 -R $_newUser
权限介绍：4=可读 2=可写 1=可执行
      7 7 7
      第一个7 是 文件所有者的权限
      第二个7 是 文件所属组的权限
      第三个7 是 其他用户的权限
      7 = 4+2+1 表示有可读可写可执行
      6 = 4+2 表示有可读可写权限
      5 = 4+1 表示有可读可执行
修改用户权限为root: 修改/etc/passwd即可，把用户名的ID和ID组修改成0（不建议）
```

## node环境

### 源码安装

```bash

wget http:// xxx node官网下载最新的源码包
yum -y install gcc make gcc-c++ openssl-devel wget 下载各种编译器
tar -xvf node-v8.9.1-linux-x64.tar.xz  解压
cd node-xxx 
./configure  启动配置
make 编译 
make install 安装
```

### yum安装

```bash
nodesource官方 https://github.com/nodesource/distributions

步骤1

curl --silent --location https://rpm.nodesource.com/setup_12.x | sudo bash -

sudo yum -y install nodejs

切换淘宝源
npm config set registry https://registry.npm.taobao.org
```

## gcc升级

```bash
yum -y install centos-release-scl
yum -y install devtoolset-7-gcc devtoolset-7-gcc-c++ devtoolset-7-binutils
scl enable devtoolset-7 bash
需要注意的是scl命令启用只是临时的，退出shell或重启就会恢复原系统gcc版本。
如果要长期使用gcc 7.3的话：
echo "source /opt/rh/devtoolset-7/enable" >>/etc/profile
```
