# docker

## docker简介

Docker是应用程序与系统之间的隔离层。Docker让应用程序不必再关心主机环境，各个应用安装在docker镜像里面，docker引擎负责运行包裹了应用程序的docker镜像。

Docker的理念是让开发人员可以简单地把应用程序及依赖装载到容器中，然后轻松地部署到任何地方。docker有以下特点：

- Docker容器是轻量级的虚拟技术，占用更少系统资源。
- 使用 Docker容器，不同团队（如开发、测试，运维）之间更容易合作。
- 可以在任何地方部署 Docker 容器，比如在任何物理和虚拟机上，甚至在云上。
- 由于Docker容器非常轻量级，因此可扩展性很强。

### Docker 基本组成

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/Y3b6oi.png)

- 镜像（image）：

Docker 镜像就好比是一个目标，可以通过这个目标来创建容器服务，可以简单的理解为编程语言中的类。

- 容器（container）:

Docker 利用容器技术，独立运行一个或者一组应用，容器是通过镜像来创建的，在容器中可执行启动、停止、删除等基本命令，最终服务运行或者项目运行就是在容器中的，可理解为是类的实例。

- 仓库（repository）:

仓库就是存放镜像的地方！仓库分为公有仓库和私有仓库，类似Git。一般我们用的时候都是用国内docker镜像来加速。

### VM 跟 Docker

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/9OfiAF.png)

- 虚拟机

传统的虚拟机需要模拟整台机器包括硬件，每台虚拟机都需要有自己的操作系统，虚拟机一旦被开启，预分配给他的资源将全部被占用。每一个虚拟机包括应用，必要的二进制和库，以及一个完整的用户操作系统。

- Docker

容器技术是和我们的宿主机共享硬件资源及操作系统可以实现资源的动态分配。容器包含应用和其所有的依赖包，但是与其他容器共享内核。容器在宿主机操作系统中，在用户空间以分离的进程运行

### docker常见指令

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/O8bw3R.png)

### Docker运行原理

Docker只提供一个运行环境，是不需要运行一个独立的 OS，容器中的系统内核跟宿主机的内核是公用的。docker容器本质上是宿主机的进程。他做了如下操作：

- namespace 进程隔离

Linux Namespaces 机制提供一种进程资源隔离方案。PID、IPC、Network 等系统资源不再是全局性的，而是属于某个特定的Namespace。每个namespace下的资源对于其他 namespace 下的资源都是透明，不可见的。系统中可以同时存在两个进程号为0、1、2的进程，由于属于不同的namespace，所以它们之间并不冲突。

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/0XyPoz.png)

- CGroup 分配资源

Docker 通过 Cgroup 来控制容器使用的资源配额，一旦超过这个配额就发出OOM。配额主要包括 CPU、内存、磁盘三大方面， 基本覆盖了常见的资源配额和使用量控制。

![img](https://gitee.com/PENG_YUE/myImg/raw/master/uPic/PxFy1k.png)

Cgroup 是 Control Groups 的缩写，是Linux 内核提供的一种可以限制、记录、隔离进程组所使用的物理资源(如 CPU、内存、磁盘 IO 等等)的机制，被 LXC(Linux container)、Docker 等很多项目用于实现进程资源控制。Cgroup 本身是提供将进程进行分组化管理的功能和接口的基础结构，I/O 或内存的分配控制等具体的资源管理是通过该功能来实现的，这些具体的资源 管理功能称为 Cgroup 子系统。

- chroot 跟 pivot_root 文件系统

chroot(change root file system)命令的功能是改变进程的根目录到指定的位置。比如我们现在有一个$HOME/test目录，想要把它作为一个 /bin/bash 进程的根目录。

1. 首先，创建一个 HOME/test/{bin,lib64,lib}
2. 把bash命令拷贝到test目录对应的bin路径下 cp -v /bin/{bash,ls} $HOME/test/bin
3. 把bash命令需要的所有so文件，也拷贝到test目录对应的lib路径下
4. 执行chroot命令，告诉操作系统，我们将使用HOME/test /bin/bash

- 一致性

由于 rootfs 里打包的不只是应用，而是整个操作系统的文件和目录，也就意味着应用以及它运行所需要的所有依赖都被封装在了一起。有了容器镜像打包操作系统的能力，这个最基础的依赖环境也终于变成了应用沙盒的一部分。这就赋予了容器所谓的一致性：

无论在本地、云端，还是在一台任何地方的机器上，用户只需要解压打包好的容器镜像，那么这个应用运行所需要的完整的执行环境就被重现出来了。

- UnionFS 联合文件系统

如何实现rootfs的高效可重复利用呢？Docker在镜像的设计中引入了层（layer）的概念。也就是说用户制作镜像的每一步操作都会生成一个层，也就是一个增量rootfs。介绍分层前我们先说个重要知识点，联合文件系统。

- layer 分层

1. 只读层
2. 可读写层
3. init层

## docker网络

- host: 和宿主机共享网络
- none: 不配置网络
- bridge: docker默认，也可自创
- container: 容器网络连通，容器直接互联
