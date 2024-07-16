import{_ as s,c as a,o as n,U as e}from"./chunks/framework.BgVg8wer.js";const b=JSON.parse('{"title":"JSBridge","description":"","frontmatter":{},"headers":[],"relativePath":"font-end/engineering/bridge.md","filePath":"font-end/engineering/bridge.md","lastUpdated":1721107161000}'),l={name:"font-end/engineering/bridge.md"},p=e(`<h1 id="jsbridge" tabindex="-1">JSBridge <a class="header-anchor" href="#jsbridge" aria-label="Permalink to &quot;JSBridge&quot;">​</a></h1><p>JSBridge 应用在混合开发中，他所实现的是 H5 和 Native 的双向通信。就是 JavaScript(H5) 与 Native 通信的桥梁。一般分为 JS 调用 Native 和 Native 主动调用 JS 两种形式。</p><h2 id="jsbridge-与-native-间通信原理" tabindex="-1">JSBridge 与 Native 间通信原理 <a class="header-anchor" href="#jsbridge-与-native-间通信原理" aria-label="Permalink to &quot;JSBridge 与 Native 间通信原理&quot;">​</a></h2><p>在 H5 中 JavaScript 调用 Native 的方式主要用两种：</p><ul><li>注入 API，注入 Native 对象或方法到 JavaScript 的 window对 象中（可以类比于 RPC 调用）。</li><li>拦截 URL Schema，客户端拦截WebView的请求并做相应的操作（可以类比于 JSONP）。</li></ul><h2 id="url-scheme" tabindex="-1">URL Scheme <a class="header-anchor" href="#url-scheme" aria-label="Permalink to &quot;URL Scheme&quot;">​</a></h2><p>URL Scheme 是一种特殊的 URL，一般用于在 Web 端唤醒 App，甚至跳转到 App 的某个页面，比如在某个手机网站上付款的时候，可以直接拉起支付宝支付页面。你可以在浏览器里面直接输入 weixin://，系统就会提示你是否要打开微信。输入 mqq:// 就会帮你唤起手机 QQ。可以理解为代理模式（也不完全是代理模式）</p><h2 id="js-调用-native" tabindex="-1">JS 调用 Native <a class="header-anchor" href="#js-调用-native" aria-label="Permalink to &quot;JS 调用 Native&quot;">​</a></h2><p>JS 调用 Native 通信大致有三种方法：</p><ul><li>拦截 Scheme</li><li>注入 JS 上下文</li></ul><h3 id="拦截-scheme" tabindex="-1">拦截 Scheme <a class="header-anchor" href="#拦截-scheme" aria-label="Permalink to &quot;拦截 Scheme&quot;">​</a></h3><p>仔细思考一下，如果是 JS 和 Java 之间传递数据，我们该怎么做呢？ 对于前端开发来说，调 Ajax 请求接口是最常见的需求了。不管对方是 Java 还是 Python，我们都可以通过 http/https 接口来获取数据。实际上这个流程和 JSONP 更加类似。</p><h4 id="js" tabindex="-1">JS <a class="header-anchor" href="#js" aria-label="Permalink to &quot;JS&quot;">​</a></h4><p>iframe 跳转：</p><ol><li>使用 a 标签跳转 <code>&lt;a href=&quot;taobao://&quot;&gt;点击我打开淘宝&lt;/a&gt;</code></li><li>重定向 <code>location.href = &quot;taobao://&quot;</code></li><li>iframe 跳转</li></ol><h3 id="注入上下文" tabindex="-1">注入上下文 <a class="header-anchor" href="#注入上下文" aria-label="Permalink to &quot;注入上下文&quot;">​</a></h3><p>iOS 中内置了 JavaScriptCore 这个框架，可以实现执行 JS 以及注入 Native 对象等功能。 这种方式不依赖拦截，主要是通过 WebView 向 JS 的上下文注入对象和方法，可以让 JS 直接调用原生。</p><h4 id="ios-uiwebview" tabindex="-1">iOS UIWebView <a class="header-anchor" href="#ios-uiwebview" aria-label="Permalink to &quot;iOS UIWebView&quot;">​</a></h4><div class="language-objc line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">objc</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 获取 JS 上下文</span></span>
<span class="line"><span style="color:#BABED8;">JSContext </span><span style="color:#89DDFF;">*</span><span style="color:#BABED8;">context </span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> [</span><span style="color:#BABED8;">webview </span><span style="color:#82AAFF;">valueForKeyPath</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">@&quot;</span><span style="color:#C3E88D;">documentView.webView.mainFrame.javaScriptContext</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">];</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 注入 Block</span></span>
<span class="line"><span style="color:#BABED8;">context</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">@&quot;</span><span style="color:#C3E88D;">callHandler</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span><span style="color:#89DDFF;"> =</span><span style="color:#89DDFF;"> ^(</span><span style="color:#BABED8;">JSValue </span><span style="color:#89DDFF;">*</span><span style="color:#BABED8;"> data</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    // 处理调用方法和参数</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    // 调用 Native 功能</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    // 回调 JS Callback</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#BABED8;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">callHandler</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    type</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">scan</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    data</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;"> &quot;&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#82AAFF;">    callback</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;"> function</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">data</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;">    }</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="ios-wkwebview" tabindex="-1">iOS WKWebView <a class="header-anchor" href="#ios-wkwebview" aria-label="Permalink to &quot;iOS WKWebView&quot;">​</a></h4><p>WKWebView 里面通过 addScriptMessageHandler 来注入对象到 JS 上下文，可以在 WebView 销毁的时候调用 removeScriptMessageHandler 来销毁这个对象。 前端调用注入的原生方法之后，可以通过 didReceiveScriptMessage 来接收前端传过来的参数。</p><div class="language-objc line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">objc</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#BABED8;">WKWebView </span><span style="color:#89DDFF;">*</span><span style="color:#BABED8;">wkWebView </span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> [[</span><span style="color:#BABED8;">WKWebView </span><span style="color:#82AAFF;">alloc</span><span style="color:#89DDFF;">]</span><span style="color:#82AAFF;"> init</span><span style="color:#89DDFF;">];</span></span>
<span class="line"><span style="color:#BABED8;">WKWebViewConfiguration </span><span style="color:#89DDFF;">*</span><span style="color:#BABED8;">configuration </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> wkWebView.configuration</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">WKUserContentController </span><span style="color:#89DDFF;">*</span><span style="color:#BABED8;">userCC </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> configuration.userContentController</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 注入对象</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#BABED8;">userCC </span><span style="color:#82AAFF;">addScriptMessageHandler</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;">self </span><span style="color:#82AAFF;">name</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">@&quot;</span><span style="color:#C3E88D;">nativeObj</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">];</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 清除对象</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#BABED8;">userCC </span><span style="color:#82AAFF;">removeScriptMessageHandler</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;">self </span><span style="color:#82AAFF;">name</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">@&quot;</span><span style="color:#C3E88D;">nativeObj</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 客户端处理前端调用</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#89DDFF;"> (</span><span style="color:#C792EA;">void</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;">userContentController:</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">WKUserContentController </span><span style="color:#89DDFF;">*)</span><span style="color:#BABED8;">userContentController didReceiveScriptMessage:</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">WKScriptMessage </span><span style="color:#89DDFF;">*)</span><span style="color:#BABED8;">message</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    // 获取前端传来的参数</span></span>
<span class="line"><span style="color:#FFCB6B;">    NSDictionary</span><span style="color:#89DDFF;"> *</span><span style="color:#F07178;">msgBody </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> message</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">body</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    // 如果是 nativeObj 就进行相应处理</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    if</span><span style="color:#89DDFF;"> (![</span><span style="color:#F07178;">message.name </span><span style="color:#82AAFF;">isEqualToString</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">@&quot;</span><span style="color:#C3E88D;">nativeObj</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">])</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        // </span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">        return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    }</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>使用 addScriptMessageHandler 注入的对象实际上只有一个 postMessage 方法，无法调用更多自定义方法。前端的调用方式如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#BABED8;">window</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">webkit</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">messageHandlers</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">nativeObj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">postMessage</span><span style="color:#BABED8;">(data)</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="native-调用-js" tabindex="-1">Native 调用 JS <a class="header-anchor" href="#native-调用-js" aria-label="Permalink to &quot;Native 调用 JS&quot;">​</a></h2><p><code>Native</code> 调用 <code>JS</code> 一般就是直接 <code>JS</code> 代码字符串，有些类似我们调用 JS 中的 <code>eval</code> 去执行一串代码。一般有 <code>loadUrl</code>、<code>evaluateJavascript</code> 等几种方法，客户端都只能拿到挂载到 window 对象上面的属性和方法。</p>`,27),o=[p];function t(r,c,i,D,F,y){return n(),a("div",null,o)}const u=s(l,[["render",t]]);export{b as __pageData,u as default};