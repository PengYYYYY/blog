import{F as t}from"./chunks/FigmaContainer.DK9arGRx.js";import{c as r,I as i,U as l,m as a,a as e,o}from"./chunks/framework.BgVg8wer.js";const h=l("",4),d=l("",10),n=a("h5",{id:"自交图形切三角问题",tabindex:"-1"},[e("自交图形切三角问题 "),a("a",{class:"header-anchor",href:"#自交图形切三角问题","aria-label":'Permalink to "自交图形切三角问题"'},"​")],-1),s=l("",5),c=a("h4",{id:"曲线平滑度问题",tabindex:"-1"},[e("曲线平滑度问题 "),a("a",{class:"header-anchor",href:"#曲线平滑度问题","aria-label":'Permalink to "曲线平滑度问题"'},"​")],-1),_=a("p",null,"pixi在渲染贝塞尔曲线时会将贝塞尔微分成非常多的直线，但他不会随着缩放比例微分的更细，导致视口放大的很大是曲线表现的不是很光滑。",-1),p=l("",4),b=l("",3),f=a("ul",null,[a("li",null,"global变换矩阵"),a("li",null,"local变换矩阵"),a("li",null,"旋转中心"),a("li",null,"坐标体系")],-1),m=a("h3",{id:"容器、图形、渲染队列",tabindex:"-1"},[e("容器、图形、渲染队列 "),a("a",{class:"header-anchor",href:"#容器、图形、渲染队列","aria-label":'Permalink to "容器、图形、渲染队列"'},"​")],-1),u=a("h3",{id:"渲染对象",tabindex:"-1"},[e("渲染对象 "),a("a",{class:"header-anchor",href:"#渲染对象","aria-label":'Permalink to "渲染对象"'},"​")],-1),g=a("p",null,"业务侧的渲染对象，画布中的每一个元素都会对应一个渲染实例。",-1),T=a("h2",{id:"数据结构设计",tabindex:"-1"},[e("数据结构设计 "),a("a",{class:"header-anchor",href:"#数据结构设计","aria-label":'Permalink to "数据结构设计"'},"​")],-1),k=a("h3",{id:"figma-数据结构",tabindex:"-1"},[e("Figma 数据结构 "),a("a",{class:"header-anchor",href:"#figma-数据结构","aria-label":'Permalink to "Figma 数据结构"'},"​")],-1),w=l("",5),P=a("ul",null,[a("li",null,[e("第一步：过滤 "),a("code",null,"视口内"),e(" 检测元素，X，Y 轴分区，构建分区元素组")]),a("li",null,"第二步：元素对比策略，如 Step 2 所示"),a("li",null,"第三步：绘制辅助线，绘制模式如 Step 3 所示")],-1),x=a("h2",{id:"连线",tabindex:"-1"},[e("连线 "),a("a",{class:"header-anchor",href:"#连线","aria-label":'Permalink to "连线"'},"​")],-1),q=l("",16),I=a("p",null,[e("适用于文档，精细控制插入位置，核心是其流程中的 "),a("code",null,"Transform"),e(" 方法，没有固定的实现，需要根据实际情况来做。")],-1),S=a("h3",{id:"crdt-conflict-free-replicated-data-type-算法",tabindex:"-1"},[e("CRDT(Conflict-Free Replicated Data Type) 算法 "),a("a",{class:"header-anchor",href:"#crdt-conflict-free-replicated-data-type-算法","aria-label":'Permalink to "CRDT(Conflict-Free Replicated Data Type) 算法"'},"​")],-1),E=a("p",null,"冲突无关数据类型 CRDT（Conflict-Free Replicated Data Type）是一种解决分布式系统中数据同步问题的数据结构。CRDT的核心思想是确保所有副本之间的数据一致性，而无需进行复杂的操作转换。CRDT有两种主要类型：状态同步CRDT（State-based CRDT）和操作同步CRDT（Operation-based CRDT）。",-1),D=a("h3",{id:"crdt-like",tabindex:"-1"},[e("CRDT Like "),a("a",{class:"header-anchor",href:"#crdt-like","aria-label":'Permalink to "CRDT Like"'},"​")],-1),C=a("p",null,[e("Figma 协同方案，细节协同可以参考这篇文章："),a("a",{href:"https://www.figma.com/blog/how-figmas-multiplayer-technology-works/",target:"_blank",rel:"noreferrer"},"https://www.figma.com/blog/how-figmas-multiplayer-technology-works/")],-1),y=a("p",null,"核心原则：最后写入者胜利（树形引用特殊处理）",-1),A=a("h2",{id:"总结",tabindex:"-1"},[e("总结 "),a("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),F=a("p",null,"总的来说，整个白板编辑器项目非常复杂，本文只是总结了其中的冰山一角，总体也是比较笼统的介绍，更多的细节需要在开发实践中去体会。",-1),J=JSON.parse('{"title":"白板项目总结","description":"","frontmatter":{},"headers":[],"relativePath":"article/record/board.md","filePath":"article/record/board.md","lastUpdated":1721107161000}'),R={name:"article/record/board.md"},L=Object.assign(R,{setup(z){return(B,V)=>(o(),r("div",null,[h,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=2914-3665&t=hzW5L5zaX1dMDGIz-4"}),d,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=2914-3751&t=hzW5L5zaX1dMDGIz-4"}),n,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=2914-3787&t=hzW5L5zaX1dMDGIz-4"}),s,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=2914-3884&t=hzW5L5zaX1dMDGIz-4"}),c,_,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=2914-3910&t=hzW5L5zaX1dMDGIz-4"}),p,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=1266-432&t=loY0TKO3kumeNLmD-4"}),b,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=3508-4464&t=loY0TKO3kumeNLmD-4"}),f,m,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=3508-4617&t=loY0TKO3kumeNLmD-4"}),u,g,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=3508-4935&t=loY0TKO3kumeNLmD-4"}),T,k,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=2658-1361&t=lro20nPzgjXTpsNK-4"}),w,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=3865-1786&t=oyHf5qQSFlbfnhzh-4"}),P,x,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=6656-2399&t=vx1kuKVAtuu5eXjb-4"}),q,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=3865-2349&t=oyHf5qQSFlbfnhzh-4"}),I,S,E,D,i(t,{url:"https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=3865-1889&t=oyHf5qQSFlbfnhzh-4"}),C,y,A,F]))}});export{J as __pageData,L as default};