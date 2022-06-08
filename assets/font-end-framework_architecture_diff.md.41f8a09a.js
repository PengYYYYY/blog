import{_ as s,c as a,o as n,a as l}from"./app.d6a82b7d.js";const p='{"title":"diff过程","description":"","frontmatter":{},"headers":[{"level":2,"title":"vue的diff","slug":"vue的diff"},{"level":2,"title":"react的diff过程","slug":"react的diff过程"}],"relativePath":"font-end-framework/architecture/diff.md"}',e={},o=[l('<h1 id="diff过程" tabindex="-1">diff过程 <a class="header-anchor" href="#diff过程" aria-hidden="true">#</a></h1><p><img src="/blog/assets/KHYAuV.d0cdd54c.png" alt=""></p><p>两个框架都是同层比较，深度优先，可以参考树的前序遍历</p><div class="language-js"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">dsf</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">dealFn</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">node</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 处理当前节点</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">dealFn</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">left</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">dealFn</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">right</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">dealFn</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><h2 id="vue的diff" tabindex="-1">vue的diff <a class="header-anchor" href="#vue的diff" aria-hidden="true">#</a></h2><p>优势：</p><ul><li>新老两棵树：头尾两个节点，四节点间对比</li></ul><p>key的作用：</p><p>复用节点</p><h2 id="react的diff过程" tabindex="-1">react的diff过程 <a class="header-anchor" href="#react的diff过程" aria-hidden="true">#</a></h2><p>diff策略</p><ul><li>同级比较，Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。</li><li>拥有不同类型的两个组件将会生成不同的树形结构。</li><li>可以通过 key 来暗示哪些子元素在不同的渲染下能保持稳定。</li></ul><p>diff过程</p><ul><li>删除:newVnode不存在时</li><li>替换:vnode和newVnode类型不同或key不同时</li><li>更新:有相同类型和key但vnode和newVnode不同时</li></ul>',14)];var t=s(e,[["render",function(s,l,p,e,t,r){return n(),a("div",null,o)}]]);export{p as __pageData,t as default};