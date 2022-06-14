# git-flow

`Git Flow` 把标准的 `Git` 命令用脚本组合了起来，形成比较有效而简单的命令。

## 分支情形

在 `Git Flow` 中，主要的分支有 `master`、`develop`、`hotfix`、`release`、`feature` 这五种分支。`master` 和 `develop` 分支是我们最常见的分支，它们被称作长期分支，一直存活在整个工作流程中，而其它的分支大部分会因任务结束而被删除。

## master分支

该分支主要用来存放稳定、随时可以上线的版本。
这个分支的来源只能从别的分支合并过来，开发者不会直接commit到这个分支上。
通常我们也会在这个分支上的提交打上版本号标签。

## develop分支

这个分支主要是所有开发的基础分支。

当要添加功能时，所有功能都是从这个分支切出去的，而功能分支实现后，也都会合并回来这个分支中。

## hotfix分支

当线上产品发生了紧急问题的时候，就会从master分支中开一个hotfix分支出来进行修复。当hotfix分支修复完成之后，就会合并到master分支中，并且也会合并到develop分支中。

## release分支

当develop分支完成需求后，就可以从develop分支中开一个release分支，进行上线前最后的测试。测试完成后，释放release分支将会同时合并到master以及develop分支中。

## feature分支

当我们需要补充功能的时候，就会从develop分支中开一个feature分支进行功能开发。

## git-flow使用场景

### start

新功能开始开发前，需准备好开发分支。

```bash
git flow feature start feature-name
```

执行上面命令后，将会在本地创建一个名为 `feature-name` 的分支，并切换到该分支。
而且无论你当前处于哪个分支，它都会基于本地develop分支创建的。
上述命令相当于执行了下面的Git操作。

```bash
git checkout -b feature/feature-name develop
```

需要注意的一点是，该分支是基于本地的 `develop` 分支创建，所以执行此命令前一般需要拉取最新的远程代码。

### publish

在本地开发完成新功能并进行commit操作后，需要将本地代码提交到远程仓库。

```js
git flow feature publish feature-name
```

该命令主要做了三件事情：

- 创建一个名为feature/feature-name的远程分支
- 本地分支track远程分支
- 如果本地存在还没提交的代码，就进行代码提交

```js
git push origin feature/<feature-name>
git push --set-upstream origin feature/<feature-name>
git push origin
```

当你执行后publish操作后，后续还需要进行代码提交的话，只需执行正常的push命令既可。

```js
git push
```

### finish

当功能开发完毕后就将进入测试阶段，此时需要将该分支合并到 `develop` 分支。

```bash
git flow feature finish feature-name
```

该命令也主要做了三件事情：

- 切换到develop分支
- 合并代码到develop分支
- 删除本地feature/feature-name分支

## git相关操作

```bash
设置新建的分支为默认的igt pull git push 分支
git branch --set-upstream-to=origin/dev
git branch --unset-upstream master

修改ignore文件后操作
git rm -r --cached .  #清除缓存  
git add . #重新trace file  
git commit -m "update .gitignore" #提交和注释  
git push origin master #可选，如果需要同步到remote上的话
```
