import{_ as s,c as n,o as a,U as l}from"./chunks/framework.B9byA8Cw.js";const B=JSON.parse('{"title":"koa","description":"","frontmatter":{},"headers":[],"relativePath":"backend/node/koa.md","filePath":"backend/node/koa.md","lastUpdated":1710173044000}'),p={name:"backend/node/koa.md"},e=l(`<h1 id="koa" tabindex="-1">koa <a class="header-anchor" href="#koa" aria-label="Permalink to &quot;koa&quot;">​</a></h1><p>koa 本质上是对 node 的一层简单封装</p><h2 id="为什么诞生-koa" tabindex="-1">为什么诞生 koa <a class="header-anchor" href="#为什么诞生-koa" aria-label="Permalink to &quot;为什么诞生 koa&quot;">​</a></h2><ol><li>包装 http,优雅封装，response.end 和 request。</li><li>添加中间件，AOP</li><li>增强错误处理</li><li>API 设计更优雅</li></ol><h2 id="业务场景" tabindex="-1">业务场景 <a class="header-anchor" href="#业务场景" aria-label="Permalink to &quot;业务场景&quot;">​</a></h2><blockquote><p>AOP 面向切面编程</p></blockquote><p>处理前需要做的事情，处理后需要做的事情，衍生出了洋葱圈模型。</p><h2 id="koa-与-koa2" tabindex="-1">koa 与 koa2 <a class="header-anchor" href="#koa-与-koa2" aria-label="Permalink to &quot;koa 与 koa2&quot;">​</a></h2><ul><li>1代为 generator 语法诞生</li><li>2代为 es7 语法诞生</li></ul><h2 id="context" tabindex="-1">context <a class="header-anchor" href="#context" aria-label="Permalink to &quot;context&quot;">​</a></h2><p>封装原生的 request 和 response，再把 request 和 response 集中挂挂载到上下文</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">// context.js</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#89DDFF;"> =</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#C792EA;">  get</span><span style="color:#F07178;"> url</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    return</span><span style="color:#89DDFF;"> this.</span><span style="color:#BABED8;">request</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">url</span></span>
<span class="line"><span style="color:#89DDFF;">  },</span></span>
<span class="line"><span style="color:#C792EA;">  get</span><span style="color:#F07178;"> body</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    return</span><span style="color:#89DDFF;"> this.</span><span style="color:#BABED8;">response</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">body</span></span>
<span class="line"><span style="color:#89DDFF;">  },</span></span>
<span class="line"><span style="color:#C792EA;">  set</span><span style="color:#F07178;"> body</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">val</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#89DDFF;">    this.</span><span style="color:#BABED8;">response</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">body</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> val</span></span>
<span class="line"><span style="color:#89DDFF;">  },</span></span>
<span class="line"><span style="color:#C792EA;">  get</span><span style="color:#F07178;"> method</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    return</span><span style="color:#89DDFF;"> this.</span><span style="color:#BABED8;">request</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">method</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">// response.js</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#89DDFF;"> =</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#C792EA;">  get</span><span style="color:#F07178;"> body</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    return</span><span style="color:#89DDFF;"> this.</span><span style="color:#BABED8;">_body</span></span>
<span class="line"><span style="color:#89DDFF;">  },</span></span>
<span class="line"><span style="color:#C792EA;">  set</span><span style="color:#F07178;"> body</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">val</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#89DDFF;">    this.</span><span style="color:#BABED8;">_body</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> val</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">// request.js</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#89DDFF;"> ={</span></span>
<span class="line"><span style="color:#C792EA;">  get</span><span style="color:#F07178;"> url</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    return</span><span style="color:#89DDFF;"> this.</span><span style="color:#BABED8;">req</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">url</span></span>
<span class="line"><span style="color:#89DDFF;">  },</span></span>
<span class="line"><span style="color:#C792EA;">  get</span><span style="color:#F07178;"> method</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    return</span><span style="color:#89DDFF;"> this.</span><span style="color:#BABED8;">req</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">method</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toLowerCase</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul><li>组合 <code>context</code></li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#82AAFF;">createContext</span><span style="color:#BABED8;">(req</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> res) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#C792EA;">  const</span><span style="color:#BABED8;"> ctx</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">context</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#BABED8;">  ctx</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">request</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">request</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#BABED8;">  ctx</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">response</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">response</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">  ctx</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">req</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> ctx</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">request</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">req</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> req</span></span>
<span class="line"><span style="color:#BABED8;">  ctx</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">res</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> ctx</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">response</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">res</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> res</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">  return</span><span style="color:#BABED8;"> ctx</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="洋葱圈模型" tabindex="-1">洋葱圈模型 <a class="header-anchor" href="#洋葱圈模型" aria-label="Permalink to &quot;洋葱圈模型&quot;">​</a></h2><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#82AAFF;">compose</span><span style="color:#BABED8;">(middlewares) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">  return</span><span style="color:#C792EA;"> function</span><span style="color:#89DDFF;"> (</span><span style="color:#BABED8;font-style:italic;">ctx</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    return</span><span style="color:#82AAFF;"> dispatch</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#C792EA;">    function</span><span style="color:#82AAFF;"> dispatch</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">i</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#C792EA;">      let</span><span style="color:#BABED8;"> fn</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> middlewares</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">i</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">      if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#BABED8;">fn</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">        return</span><span style="color:#FFCB6B;"> Promise</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">      }</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">      return</span><span style="color:#FFCB6B;"> Promise</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span></span>
<span class="line"><span style="color:#82AAFF;">        fn</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">ctx</span><span style="color:#89DDFF;">,</span><span style="color:#C792EA;"> function</span><span style="color:#82AAFF;"> next</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">          return</span><span style="color:#82AAFF;"> dispatch</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">i</span><span style="color:#89DDFF;"> +</span><span style="color:#F78C6C;"> 1</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">        }</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      )</span></span>
<span class="line"><span style="color:#89DDFF;">    }</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="koa-路由" tabindex="-1">koa 路由 <a class="header-anchor" href="#koa-路由" aria-label="Permalink to &quot;koa 路由&quot;">​</a></h2><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#FFCB6B;"> Router</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#C792EA;">  constructor</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;">    this.</span><span style="color:#BABED8;">stack</span><span style="color:#89DDFF;"> =</span><span style="color:#F07178;"> []</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  register</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">path</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;font-style:italic;"> methods</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;font-style:italic;"> middleware</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#C792EA;">    let</span><span style="color:#BABED8;"> route</span><span style="color:#89DDFF;"> =</span><span style="color:#89DDFF;"> {</span><span style="color:#BABED8;">path</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> methods</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> middleware</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">    this.</span><span style="color:#BABED8;">stack</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">route</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  // 现在只支持get和post，其他的同理</span></span>
<span class="line"><span style="color:#F07178;">  get</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">path</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;font-style:italic;">middleware</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#89DDFF;">    this.</span><span style="color:#82AAFF;">register</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">path</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">get</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> middleware</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"><span style="color:#F07178;">  post</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">path</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;font-style:italic;">middleware</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#89DDFF;">    this.</span><span style="color:#82AAFF;">register</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">path</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">post</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> middleware</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"><span style="color:#F07178;">  routes</span><span style="color:#89DDFF;">()</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#C792EA;">    let</span><span style="color:#BABED8;"> stock</span><span style="color:#89DDFF;"> =</span><span style="color:#89DDFF;"> this.</span><span style="color:#BABED8;">stack</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    return</span><span style="color:#C792EA;"> async</span><span style="color:#C792EA;"> function</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">ctx</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;font-style:italic;"> next</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#C792EA;">      let</span><span style="color:#BABED8;"> currentPath</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> ctx</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">url</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">      let</span><span style="color:#BABED8;"> route</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">      for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> i</span><span style="color:#89DDFF;"> =</span><span style="color:#F78C6C;"> 0</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> i</span><span style="color:#89DDFF;"> &lt;</span><span style="color:#BABED8;"> stock</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">length</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#C792EA;">        let</span><span style="color:#BABED8;"> item</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> stock</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">i</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        // 判断path和method</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">        if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">currentPath</span><span style="color:#89DDFF;"> ===</span><span style="color:#BABED8;"> item</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">path</span><span style="color:#89DDFF;"> &amp;&amp;</span><span style="color:#BABED8;"> item</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">methods</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">indexOf</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">ctx</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">method</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F78C6C;"> 0</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">          route</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> item</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">middleware</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">          break</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">        }</span></span>
<span class="line"><span style="color:#89DDFF;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">      if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">typeof</span><span style="color:#BABED8;"> route</span><span style="color:#89DDFF;"> ===</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">function</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#82AAFF;">        route</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">ctx</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> next</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">        return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">      await</span><span style="color:#82AAFF;"> next</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    };</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div>`,20),o=[e];function r(t,c,D,F,y,i){return a(),n("div",null,o)}const u=s(p,[["render",r]]);export{B as __pageData,u as default};