import{_ as a,o as e,c as n,a as s}from"./app.2c1f0ca9.js";var l="/blog/assets/TrpMno.865cf686.png",p="/blog/assets/tXnw6a.42672ef4.png";const m='{"title":"\u5305\u7BA1\u7406","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u8111\u56FE","slug":"\u8111\u56FE"},{"level":2,"title":"yarn","slug":"yarn"},{"level":3,"title":"\u548Cnpm\u533A\u522B","slug":"\u548Cnpm\u533A\u522B"},{"level":3,"title":"yarn\u5DE5\u4F5C\u6D41\u7A0B","slug":"yarn\u5DE5\u4F5C\u6D41\u7A0B"},{"level":2,"title":"lerna","slug":"lerna"},{"level":3,"title":"monorepo\u7BA1\u7406","slug":"monorepo\u7BA1\u7406"},{"level":2,"title":"\u7248\u672C\u89C4\u8303","slug":"\u7248\u672C\u89C4\u8303"},{"level":3,"title":"\u4FEE\u6539\u7248\u672C","slug":"\u4FEE\u6539\u7248\u672C"}],"relativePath":"font-end/engineering/npm.md","lastUpdated":1655197249000}',o={name:"font-end/engineering/npm.md"},r=s('<h1 id="\u5305\u7BA1\u7406" tabindex="-1">\u5305\u7BA1\u7406 <a class="header-anchor" href="#\u5305\u7BA1\u7406" aria-hidden="true">#</a></h1><h2 id="\u8111\u56FE" tabindex="-1">\u8111\u56FE <a class="header-anchor" href="#\u8111\u56FE" aria-hidden="true">#</a></h2><p><img src="'+l+`" alt="img"></p><h2 id="yarn" tabindex="-1">yarn <a class="header-anchor" href="#yarn" aria-hidden="true">#</a></h2><h3 id="\u548Cnpm\u533A\u522B" tabindex="-1">\u548Cnpm\u533A\u522B <a class="header-anchor" href="#\u548Cnpm\u533A\u522B" aria-hidden="true">#</a></h3><ul><li><code>yarn</code> \u5728\u4E0B\u8F7D\u548C\u5B89\u88C5\u4F9D\u8D56\u5305\u91C7\u7528\u7684\u662F\u591A\u7EBF\u7A0B\u7684\u65B9\u5F0F\uFF0C\u800C <code>npm</code> \u662F\u5355\u7EBF\u7A0B\u7684\u65B9\u5F0F\u6267\u884C\uFF0C\u901F\u5EA6\u4E0A\u5C31\u62C9\u5F00\u4E86\u5DEE\u8DDD\u3002</li><li><code>yarn</code> \u4F1A\u5728\u7528\u6237\u672C\u5730\u7F13\u5B58\u5DF2\u4E0B\u8F7D\u8FC7\u7684\u4F9D\u8D56\u5305\uFF0C\u4F18\u5148\u4F1A\u4ECE\u7F13\u5B58\u4E2D\u8BFB\u53D6\u4F9D\u8D56\u5305\uFF0C\u53EA\u6709\u672C\u5730\u7F13\u5B58\u4E0D\u5B58\u5728\u7684\u60C5\u51B5\u624D\u4F1A\u91C7\u53D6\u8FDC\u7AEF\u8BF7\u6C42\u7684\u65B9\u5F0F\uFF1B\u53CD\u89C2 <code>npm</code> \u5219\u662F\u5168\u91CF\u8BF7\u6C42\uFF0C\u901F\u5EA6\u4E0A\u518D\u6B21\u62C9\u5F00\u5DEE\u8DDD\u3002</li><li><code>yarn</code> \u628A\u6240\u6709\u7684\u4F9D\u8D56\u8EBA\u5E73\u81F3\u540C\u7EA7\uFF0C\u6709\u6548\u7684\u51CF\u5C11\u4E86\u76F8\u540C\u4F9D\u8D56\u5305\u91CD\u590D\u4E0B\u8F7D\u7684\u60C5\u51B5\uFF0C\u52A0\u5FEB\u4E86\u4E0B\u8F7D\u901F\u5EA6\u800C\u4E14\u4E5F\u51CF\u5C11\u4E86 <code>node_modules</code> \u7684\u4F53\u79EF\uFF1B<code>npm</code>\u5219\u662F\u4E25\u683C\u7684\u6839\u636E\u4F9D\u8D56\u6811\u4E0B\u8F7D\u5E76\u653E\u7F6E\u5230\u5BF9\u5E94\u4F4D\u7F6E\uFF0C\u5BFC\u81F4\u76F8\u540C\u7684\u5305\u591A\u6B21\u4E0B\u8F7D<code>node_modules</code>\u4F53\u79EF\u5927\u7684\u95EE\u9898</li></ul><h3 id="yarn\u5DE5\u4F5C\u6D41\u7A0B" tabindex="-1">yarn\u5DE5\u4F5C\u6D41\u7A0B <a class="header-anchor" href="#yarn\u5DE5\u4F5C\u6D41\u7A0B" aria-hidden="true">#</a></h3><p><code>yarn</code> \u5728\u5B89\u88C5\u4F9D\u8D56\u5305\u65F6\u4F1A\u5206\u4E3A\u4E3B\u8981 5 \u4E2A\u6B65\u9AA4\uFF1A</p><ul><li>checking\uFF1A\u68C0\u67E5\u914D\u7F6E\u9879\uFF08.yarnrc\u3001\u547D\u4EE4\u884C\u53C2\u6570\u3001package.json \u4FE1\u606F\u7B49\uFF09\u3001\u517C\u5BB9\u6027\uFF08cpu\u3001nodejs \u7248\u672C\u3001\u64CD\u4F5C\u7CFB\u7EDF\u7B49\uFF09\u662F\u5426\u7B26\u5408\u7EA6\u5B9A</li><li>resolveStep\uFF1A\u89E3\u6790\u4F9D\u8D56\u5305\u4FE1\u606F\uFF0C\u5E76\u4E14\u4F1A\u89E3\u6790\u51FA\u6574\u4E2A\u4F9D\u8D56\u6811\u4E0A\u6240\u6709\u5305\u7684\u5177\u4F53\u7248\u672C\u4FE1\u606F</li><li>fetchStep\uFF1A\u4E0B\u8F7D\u5168\u90E8\u4F9D\u8D56\u5305\uFF0C\u5982\u679C\u4F9D\u8D56\u5305\u5DF2\u7ECF\u5728\u7F13\u5B58\u4E2D\u5B58\u5728\u5219\u8DF3\u8FC7\u4E0B\u8F7D\uFF0C\u53CD\u4E4B\u5219\u4E0B\u8F7D\u5BF9\u5E94\u4F9D\u8D56\u5305\u5230\u7F13\u5B58\u6587\u4EF6\u5939\u5185\uFF0C\u5F53\u8FD9\u4E00\u6B65\u90FD\u5B8C\u6210\u540E\u4EE3\u8868\u7740\u6240\u6709\u4F9D\u8D56\u5305\u90FD\u5DF2\u7ECF\u5B58\u5728\u7F13\u5B58\u4E2D\u4E86</li><li>linkStep\uFF1A\u5C06\u7F13\u5B58\u7684\u4F9D\u8D56\u5305\u6241\u5E73\u5316\u7684\u590D\u5236\u526F\u672C\u5230\u9879\u76EE\u7684\u4F9D\u8D56\u76EE\u5F55\u4E0B</li><li>buildStep\uFF1A\u5BF9\u4E8E\u4E00\u4E9B\u4E8C\u8FDB\u5236\u5305\uFF0C\u9700\u8981\u8FDB\u884C\u7F16\u8BD1\uFF0C\u5728\u8FD9\u4E00\u6B65\u8FDB\u884C</li></ul><h2 id="lerna" tabindex="-1">lerna <a class="header-anchor" href="#lerna" aria-hidden="true">#</a></h2><p>Lerna \u662F\u4E00\u4E2A\u7BA1\u7406\u591A\u4E2A npm \u6A21\u5757\u7684\u5DE5\u5177\uFF0C\u662F Babel \u81EA\u5DF1\u7528\u6765\u7EF4\u62A4\u81EA\u5DF1\u7684 Monorepo \u5E76\u5F00\u6E90\u51FA\u7684\u4E00\u4E2A\u9879\u76EE\u3002\u4F18\u5316\u7EF4\u62A4\u591A\u5305\u7684\u5DE5\u4F5C\u6D41\uFF0C\u89E3\u51B3\u591A\u4E2A\u5305\u4E92\u76F8\u4F9D\u8D56\uFF0C\u4E14\u53D1\u5E03\u9700\u8981\u624B\u52A8\u7EF4\u62A4\u591A\u4E2A\u5305\u7684\u95EE\u9898\u3002</p><h3 id="monorepo\u7BA1\u7406" tabindex="-1">monorepo\u7BA1\u7406 <a class="header-anchor" href="#monorepo\u7BA1\u7406" aria-hidden="true">#</a></h3><p>Monorepo \u662F\u7BA1\u7406\u9879\u76EE\u4EE3\u7801\u7684\u4E00\u4E2A\u65B9\u5F0F\uFF0C\u6307\u5728\u4E00\u4E2A\u9879\u76EE\u4ED3\u5E93 (repo) \u4E2D\u7BA1\u7406\u591A\u4E2A\u6A21\u5757/\u5305 (package)\uFF0C\u4E0D\u540C\u4E8E\u5E38\u89C1\u7684\u6BCF\u4E2A\u6A21\u5757\u5EFA\u4E00\u4E2A repo\u3002\u5E38\u89C1</p><p>\u76EE\u5F55\u7ED3\u6784\u5982\u4E0B:</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 packages</span></span>
<span class="line"><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">   \u251C\u2500\u2500 pkg1</span></span>
<span class="line"><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">   \u251C\u2500\u2500 package</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">json</span></span>
<span class="line"><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">   \u251C\u2500\u2500 pkg2</span></span>
<span class="line"><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">   \u251C\u2500\u2500 package</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">json</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 package</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">json</span></span>
<span class="line"></span></code></pre></div><p>monorepo \u6700\u4E3B\u8981\u7684\u597D\u5904\u662F\u7EDF\u4E00\u7684\u5DE5\u4F5C\u6D41\u548CCode Sharing\u3002\u4F7F\u7528\u7EDF\u4E00\u7684\u6D41\u7A0B\u7BA1\u7406\uFF0C\u7EDF\u4E00\u6D4B\u8BD5\u3001\u7EDF\u4E00\u53D1\u7248\u3002\u53EA\u8981\u642D\u5EFA\u4E00\u5957\u811A\u624B\u67B6\uFF0C\u5C31\u80FD\u7BA1\u7406\uFF08\u6784\u5EFA\u3001\u6D4B\u8BD5\u3001\u53D1\u5E03\uFF09\u591A\u4E2A package\u3002</p><p><img src="`+p+`" alt="img"></p><p><a href="https://github.com/lerna/lerna" target="_blank" rel="noopener noreferrer">lerna\u5B98\u7F51</a></p><p><a href="https://zhuanlan.zhihu.com/p/71385053" target="_blank" rel="noopener noreferrer">\u57FA\u4E8Elerna\u548Cyarn workspace\u7684monorepo\u5DE5\u4F5C\u6D41</a></p><h2 id="\u7248\u672C\u89C4\u8303" tabindex="-1">\u7248\u672C\u89C4\u8303 <a class="header-anchor" href="#\u7248\u672C\u89C4\u8303" aria-hidden="true">#</a></h2><ul><li>beta:\u5185\u90E8\u6D4B\u8BD5\u7248\u672C</li><li>alpha:\u5F00\u653E\u6D4B\u8BD5</li><li>rc:\u9884\u9009\u53D1\u5E03\u7248\u672C\uFF0C\u4E3B\u8981\u7740\u91CD\u4E8E\u9664\u9519</li></ul><p>x.y.z</p><p>x\uFF1A\u4E3B\u7248\u672C\u53F7\uFF0C\u5F53\u505A\u4E86\u4E0D\u517C\u5BB9\u5F53API\u4FEE\u6539 y\uFF1A\u6B21\u7248\u672C\u53F7\uFF1A\u5F53\u4F60\u505A\u4E86\u5411\u4E0B\u517C\u5BB9\u7684\u529F\u80FD\u6027\u65B0\u589E z\uFF1A\u4FEE\u8BA2\u53F7\uFF1A\u5F53\u4F60\u505A\u4E86\u5411\u4E0B\u517C\u5BB9\u7684\u95EE\u9898\u4FEE\u6B63</p><h3 id="\u4FEE\u6539\u7248\u672C" tabindex="-1">\u4FEE\u6539\u7248\u672C <a class="header-anchor" href="#\u4FEE\u6539\u7248\u672C" aria-hidden="true">#</a></h3><p>\u5982\u4F55\u4FEE\u6539\u7248\u672C</p><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">npm version </span><span style="color:#89DDFF;">[&lt;</span><span style="color:#A6ACCD;">newVersion</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> major </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> minor </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> patch </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> premajor </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> preminor </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> prepatch </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> prerelease </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">custom version</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div>`,26),c=[r];function t(i,d,h,D,y,A){return e(),n("div",null,c)}var F=a(o,[["render",t]]);export{m as __pageData,F as default};