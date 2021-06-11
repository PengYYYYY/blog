(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{403:function(s,a,e){"use strict";e.r(a);var t=e(25),r=Object(t.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"git-flow"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-flow"}},[s._v("#")]),s._v(" git-flow")]),s._v(" "),e("p",[e("code",[s._v("Git Flow")]),s._v(" 把标准的 "),e("code",[s._v("Git")]),s._v(" 命令用脚本组合了起来，形成比较有效而简单的命令。")]),s._v(" "),e("h2",{attrs:{id:"分支情形"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#分支情形"}},[s._v("#")]),s._v(" 分支情形")]),s._v(" "),e("p",[s._v("在 "),e("code",[s._v("Git Flow")]),s._v(" 中，主要的分支有 "),e("code",[s._v("master")]),s._v("、"),e("code",[s._v("develop")]),s._v("、"),e("code",[s._v("hotfix")]),s._v("、"),e("code",[s._v("release")]),s._v("、"),e("code",[s._v("feature")]),s._v(" 这五种分支。"),e("code",[s._v("master")]),s._v(" 和 "),e("code",[s._v("develop")]),s._v(" 分支是我们最常见的分支，它们被称作长期分支，一直存活在整个工作流程中，而其它的分支大部分会因任务结束而被删除。")]),s._v(" "),e("h2",{attrs:{id:"master分支"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#master分支"}},[s._v("#")]),s._v(" master分支")]),s._v(" "),e("p",[s._v("该分支主要用来存放稳定、随时可以上线的版本。\n这个分支的来源只能从别的分支合并过来，开发者不会直接commit到这个分支上。\n通常我们也会在这个分支上的提交打上版本号标签。")]),s._v(" "),e("h2",{attrs:{id:"develop分支"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#develop分支"}},[s._v("#")]),s._v(" develop分支")]),s._v(" "),e("p",[s._v("这个分支主要是所有开发的基础分支。")]),s._v(" "),e("p",[s._v("当要添加功能时，所有功能都是从这个分支切出去的，而功能分支实现后，也都会合并回来这个分支中。")]),s._v(" "),e("h2",{attrs:{id:"hotfix分支"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#hotfix分支"}},[s._v("#")]),s._v(" hotfix分支")]),s._v(" "),e("p",[s._v("当线上产品发生了紧急问题的时候，就会从master分支中开一个hotfix分支出来进行修复。当hotfix分支修复完成之后，就会合并到master分支中，并且也会合并到develop分支中。")]),s._v(" "),e("h2",{attrs:{id:"release分支"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#release分支"}},[s._v("#")]),s._v(" release分支")]),s._v(" "),e("p",[s._v("当develop分支完成需求后，就可以从develop分支中开一个release分支，进行上线前最后的测试。测试完成后，释放release分支将会同时合并到master以及develop分支中。")]),s._v(" "),e("h2",{attrs:{id:"feature分支"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#feature分支"}},[s._v("#")]),s._v(" feature分支")]),s._v(" "),e("p",[s._v("当我们需要补充功能的时候，就会从develop分支中开一个feature分支进行功能开发。")]),s._v(" "),e("h2",{attrs:{id:"git-flow使用场景"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-flow使用场景"}},[s._v("#")]),s._v(" git-flow使用场景")]),s._v(" "),e("h3",{attrs:{id:"start"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#start"}},[s._v("#")]),s._v(" start")]),s._v(" "),e("p",[s._v("新功能开始开发前，需准备好开发分支。")]),s._v(" "),e("div",{staticClass:"language-ssh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("git flow feature start feature-name\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("执行上面命令后，将会在本地创建一个名为 "),e("code",[s._v("feature-name")]),s._v(" 的分支，并切换到该分支。\n而且无论你当前处于哪个分支，它都会基于本地develop分支创建的。\n上述命令相当于执行了下面的Git操作。")]),s._v(" "),e("div",{staticClass:"language-ssh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("git checkout -b feature/feature-name develop\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("需要注意的一点是，该分支是基于本地的 "),e("code",[s._v("develop")]),s._v(" 分支创建，所以执行此命令前一般需要拉取最新的远程代码。")]),s._v(" "),e("h3",{attrs:{id:"publish"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#publish"}},[s._v("#")]),s._v(" publish")]),s._v(" "),e("p",[s._v("在本地开发完成新功能并进行commit操作后，需要将本地代码提交到远程仓库。")]),s._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[s._v("git flow feature publish feature"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("name\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("该命令主要做了三件事情：")]),s._v(" "),e("ul",[e("li",[s._v("创建一个名为feature/feature-name的远程分支")]),s._v(" "),e("li",[s._v("本地分支track远程分支")]),s._v(" "),e("li",[s._v("如果本地存在还没提交的代码，就进行代码提交")])]),s._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[s._v("git push origin feature"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("feature"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("name"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\ngit push "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("set")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("upstream origin feature"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("feature"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("name"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\ngit push origin\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("p",[s._v("当你执行后publish操作后，后续还需要进行代码提交的话，只需执行正常的push命令既可。")]),s._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[s._v("git push\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h3",{attrs:{id:"finish"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#finish"}},[s._v("#")]),s._v(" finish")]),s._v(" "),e("p",[s._v("当功能开发完毕后就将进入测试阶段，此时需要将该分支合并到 "),e("code",[s._v("develop")]),s._v(" 分支。")]),s._v(" "),e("div",{staticClass:"language-ssh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("git flow feature finish feature-name\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("该命令也主要做了三件事情：")]),s._v(" "),e("ul",[e("li",[s._v("切换到develop分支")]),s._v(" "),e("li",[s._v("合并代码到develop分支")]),s._v(" "),e("li",[s._v("删除本地feature/feature-name分支")])]),s._v(" "),e("h2",{attrs:{id:"git相关操作"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git相关操作"}},[s._v("#")]),s._v(" git相关操作")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("设置新建的分支为默认的igt pull "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push 分支\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" branch --set-upstream-to"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("origin/dev\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" branch --unset-upstream master\n\n修改ignore文件后操作\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" -r --cached "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#清除缓存  ")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#重新trace file  ")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -m "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"update .gitignore"')]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#提交和注释  ")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push origin master "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#可选，如果需要同步到remote上的话")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br")])])])}),[],!1,null,null,null);a.default=r.exports}}]);