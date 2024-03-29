# docker

## docker简介

Docker是应用程序与系统之间的隔离层。Docker让应用程序不必再关心主机环境，各个应用安装在docker镜像里面，docker引擎负责运行包裹了应用程序的docker镜像。

Docker的理念是让开发人员可以简单地把应用程序及依赖装载到容器中，然后轻松地部署到任何地方。docker有以下特点：

- Docker容器是轻量级的虚拟技术，占用更少系统资源。
- 使用 Docker容器，不同团队（如开发、测试，运维）之间更容易合作。
- 可以在任何地方部署 Docker 容器，比如在任何物理和虚拟机上，甚至在云上。
- 由于Docker容器非常轻量级，因此可扩展性很强。

### Docker 基本组成

![img](../images/Y3b6oi.png)

- 镜像（image）：

Docker 镜像就好比是一个目标，可以通过这个目标来创建容器服务，可以简单的理解为编程语言中的类。

- 容器（container）:

Docker 利用容器技术，独立运行一个或者一组应用，容器是通过镜像来创建的，在容器中可执行启动、停止、删除等基本命令，最终服务运行或者项目运行就是在容器中的，可理解为是类的实例。

- 仓库（repository）:

仓库就是存放镜像的地方！仓库分为公有仓库和私有仓库，类似Git。一般我们用的时候都是用国内docker镜像来加速。

### VM 跟 Docker

![img](../images/9OfiAF.png)

- 虚拟机

传统的虚拟机需要模拟整台机器包括硬件，每台虚拟机都需要有自己的操作系统，虚拟机一旦被开启，预分配给他的资源将全部被占用。每一个虚拟机包括应用，必要的二进制和库，以及一个完整的用户操作系统。

- Docker

容器技术是和我们的宿主机共享硬件资源及操作系统可以实现资源的动态分配。容器包含应用和其所有的依赖包，但是与其他容器共享内核。容器在宿主机操作系统中，在用户空间以分离的进程运行

## Docker运行原理

Docker只提供一个运行环境，是不需要运行一个独立的 OS，容器中的系统内核跟宿主机的内核是公用的。docker容器本质上是宿主机的进程。他做了如下操作：

### namespace 进程隔离

![img](../images/IuoDmS.png)

Linux Namespaces 机制提供一种进程资源隔离方案。PID、IPC、Network 等系统资源不再是全局性的，而是属于某个特定的Namespace。每个namespace下的资源对于其他 namespace 下的资源都是透明，不可见的。系统中可以同时存在两个进程号为0、1、2的进程，由于属于不同的namespace，所以它们之间并不冲突。

### CGroup 分配资源

Docker 通过 Cgroup 来控制容器使用的资源配额，一旦超过这个配额就发出OOM。配额主要包括 CPU、内存、磁盘三大方面， 基本覆盖了常见的资源配额和使用量控制。

![img](../images/PxFy1k.png)

Cgroup 是 Control Groups 的缩写，是Linux 内核提供的一种可以限制、记录、隔离进程组所使用的物理资源(如 CPU、内存、磁盘 IO 等等)的机制，被 LXC(Linux container)、Docker 等很多项目用于实现进程资源控制。Cgroup 本身是提供将进程进行分组化管理的功能和接口的基础结构，I/O 或内存的分配控制等具体的资源管理是通过该功能来实现的，这些具体的资源 管理功能称为 Cgroup 子系统。

### chroot 跟 pivot_root 文件系统

chroot(change root file system)命令的功能是改变进程的根目录到指定的位置。比如我们现在有一个$HOME/test目录，想要把它作为一个 /bin/bash 进程的根目录。

1. 首先，创建一个 HOME/test/bin,lib64,lib
2. 把bash命令拷贝到test目录对应的bin路径下 cp -v /bin/bash,ls $HOME/test/bin
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

## docker命令

![img](../images/O8bw3R.png)

- FROM

FROM 指令用于指定基础镜像，因此所有的 dockerfile 都必须使用 FROM 指令开头。FROM 指令可以出现多次，这样会构建多个镜像，每个镜像创建完成后，Docker 命令行界面会输出该镜像的 ID。常用指令格式为：`FROM <image>[:<tag>] [AS <name>]`。

- LABEL

LABEL 指令可以用于指定镜像相关的元数据信息。格式为：`LABEL <key>=<value> <key>=<value> <key>=<value>`... 。

- ENV

ENV 指令用于声明环境变量，声明好的环境变量可以在后面的指令中引用，引用格式为 `$variable_name 或 ${variable_name}` 。常用格式有以下两种：

1. ENV `<key> <value>`：用于设置单个环境变量；
2. ENV `<key>=<value>` ... ：用于一次设置多个环境变量。

- EXPOSE

EXPOSE 用于指明容器对外暴露的端口号，格式为：`EXPOSE <port> [<port>/<protocol>...]` ，您可以指定端口是侦听 TCP 还是 UDP，如果未指定协议，则默认为 TCP。

- WORKDIR

WORKDIR 用于指明工作目录，它可以多次使用。如果指明的是相对路径，则它将相对于上一个WORKDIR指令的路径。

- COPY

COPY 指令的常用格式为：COPY `<src>... <dest>`，用于将指定路径中的文件添加到新的镜像中，拷贝的目标路径可以不存在，程序会自动创建。

- RUN

RUN 指令会在前一条命令创建出的镜像基础上再创建一个容器，并在容器中运行命令，在命令结束后提交该容器为新的镜像。它支持以下两种格式：

1. `RUN <command>`（shell 格式）
2. `RUN ["executable", "param1", "param2"]` (exec 格式)

- CMD

1. CMD ["executable","param1","param2"] (exec 格式, 首选)
2. CMD ["param1","param2"] (作为 ENTRYPOINT 的默认参数)
3. CMD command param1 param2 (shell 格式)

CMD 指令提供容器运行时的默认值，这些默认值可以是一条指令，也可以是一些参数。一个 dockerfile 中可以有多条 CMD 指令，但只有最后一条 CMD 指令有效。CMD 指令与 RUN 指令的命令格式相同，但作用不同：RUN 指令是在镜像的构建阶段用于产生新的镜像；而 CMD 指令则是在容器的启动阶段默认将 CMD 指令作为第一条执行的命令，如果用户在 docker run 时指定了新的命令参数，则会覆盖 CMD 指令中的命令。

- ENTRYPOINT

ENTRYPOINT 指令 支持以下两种格式：

1. ENTRYPOINT ["executable", "param1", "param2"] (exec 格式，首先)
2. ENTRYPOINT command param1 param2 (shell 格式)

ENTRYPOINT 指令 和 CMD 指令类似，都可以让容器在每次启动时执行相同的命令。但不同的是 CMD 后面可以是参数也可以是命令，而 ENTRYPOINT 只能是命令；另外 docker run 命令提供的运行参数可以覆盖 CMD，但不能覆盖 ENTRYPOINT ，这意味着 ENTRYPOINT  指令上的命令一定会被执行。
