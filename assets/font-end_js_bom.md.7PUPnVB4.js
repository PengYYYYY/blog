import{_ as s,c as n,o as a,U as l}from"./chunks/framework.UId1oBXU.js";const b=JSON.parse('{"title":"Bom and Dom","description":"","frontmatter":{},"headers":[],"relativePath":"font-end/js/bom.md","filePath":"font-end/js/bom.md","lastUpdated":1704645777000}'),p={name:"font-end/js/bom.md"},o=l(`<h1 id="bom-and-dom" tabindex="-1">Bom and Dom <a class="header-anchor" href="#bom-and-dom" aria-label="Permalink to &quot;Bom and Dom&quot;">​</a></h1><h2 id="事件流" tabindex="-1">事件流 <a class="header-anchor" href="#事件流" aria-label="Permalink to &quot;事件流&quot;">​</a></h2><p>事件流也有两种，分别是事件冒泡和事件捕获。一个事件触发后，会在子元素和父元素之间传播（propagation）。</p><h3 id="捕获阶段" tabindex="-1">捕获阶段 <a class="header-anchor" href="#捕获阶段" aria-label="Permalink to &quot;捕获阶段&quot;">​</a></h3><p>从window对象传导到目标节点（上层传到底层）称为“捕获阶段”（capture phase），捕获阶段不会响应任何事件</p><h3 id="目标阶段" tabindex="-1">目标阶段 <a class="header-anchor" href="#目标阶段" aria-label="Permalink to &quot;目标阶段&quot;">​</a></h3><p>在目标节点上触发，称为“目标阶段”</p><h3 id="冒泡阶段" tabindex="-1">冒泡阶段 <a class="header-anchor" href="#冒泡阶段" aria-label="Permalink to &quot;冒泡阶段&quot;">​</a></h3><p>从目标节点传导回window对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。</p><h3 id="事件委托" tabindex="-1">事件委托 <a class="header-anchor" href="#事件委托" aria-label="Permalink to &quot;事件委托&quot;">​</a></h3><p>大量节省内存占用，减少事件注册，如在ul上代理所有li的click事件</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">ul</span><span style="color:#C792EA;"> id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">myLinks</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  &lt;</span><span style="color:#F07178;">li</span><span style="color:#C792EA;"> id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">item1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">Go somewhere</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">li</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  &lt;</span><span style="color:#F07178;">li</span><span style="color:#C792EA;"> id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">item2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">Do something</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">li</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  &lt;</span><span style="color:#F07178;">li</span><span style="color:#C792EA;"> id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">item3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">Say hi</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">li</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">ul</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // 常规用法</span></span>
<span class="line"><span style="color:#C792EA;">  var</span><span style="color:#BABED8;"> item1 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">item1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#C792EA;">  var</span><span style="color:#BABED8;"> item2 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">item2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#C792EA;">  var</span><span style="color:#BABED8;"> item3 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">item3</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#BABED8;">  item1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onClick</span><span style="color:#89DDFF;"> =</span><span style="color:#C792EA;"> function</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#BABED8;">    console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">item1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"><span style="color:#BABED8;">  item2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onClick</span><span style="color:#89DDFF;"> =</span><span style="color:#C792EA;"> function</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#BABED8;">    console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">item2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"><span style="color:#BABED8;">  item3</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onClick</span><span style="color:#89DDFF;"> =</span><span style="color:#C792EA;"> function</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#BABED8;">    console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">item3</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // 优化做法</span></span>
<span class="line"><span style="color:#BABED8;">  document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">click</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#C792EA;"> function</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">event</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#C792EA;">    var</span><span style="color:#BABED8;"> target</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> event</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">target</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">     switch</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">target</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">        case</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">item1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">          console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">item1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">        break</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">        case</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">item2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">          console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">item2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">        break</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">        case</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">item3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">          console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">item3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">        break</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span></span>
<span class="line"><span style="color:#89DDFF;">     }</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div>`,12),e=[o];function t(c,r,D,F,y,i){return a(),n("div",null,e)}const u=s(p,[["render",t]]);export{b as __pageData,u as default};