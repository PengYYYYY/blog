import{_ as a,c as t,o as i,U as e}from"./chunks/framework.D62e7L7j.js";const p=JSON.parse('{"title":"rust","description":"","frontmatter":{},"headers":[],"relativePath":"rust/index.md","filePath":"rust/index.md","lastUpdated":1725034049000}'),l={name:"rust/index.md"},r=e('<h1 id="rust" tabindex="-1">rust <a class="header-anchor" href="#rust" aria-label="Permalink to &quot;rust&quot;">​</a></h1><h2 id="架构" tabindex="-1">架构 <a class="header-anchor" href="#架构" aria-label="Permalink to &quot;架构&quot;">​</a></h2><ul><li>所有权系统</li><li>编程范式</li><li>类型系统</li><li>内存管理</li></ul><h2 id="rust-编译过程" tabindex="-1">rust 编译过程 <a class="header-anchor" href="#rust-编译过程" aria-label="Permalink to &quot;rust 编译过程&quot;">​</a></h2><ol><li>rust code(UTF-8) -&gt; 分词 -&gt;</li><li>Tokens —&gt; 解析 -&gt;</li><li>AST -&gt; 降级 -&gt;</li><li>HIR(高级中间语言)：进行类型检查，方法查找等工作 -&gt; 降级 -&gt;</li><li>MIR(中级中间语言)：借用检查、优化、代码生成、宏、范型、单态化 -&gt; 优化 -&gt;</li><li>LLVM(低级中间语言)：生成机器码 -&gt; 优化 -&gt;</li><li>机器码</li></ol><h2 id="rust-词法结构" tabindex="-1">rust 词法结构 <a class="header-anchor" href="#rust-词法结构" aria-label="Permalink to &quot;rust 词法结构&quot;">​</a></h2><p>六大部分</p><ol><li>关键字（keywords）</li><li>标识符（identifier）</li><li>注视（comment）</li><li>空白（whitespace）</li><li>词条（tokens）</li><li>路径（path）</li></ol><h2 id="表达式的四种类型" tabindex="-1">表达式的四种类型 <a class="header-anchor" href="#表达式的四种类型" aria-label="Permalink to &quot;表达式的四种类型&quot;">​</a></h2><p>rust 是一种面向表达式的语言，一切皆表达式，一切皆类型，通过类型系统来保障类型安全和内存安全。</p><ol><li>声明语句</li><li>流程控制语句</li><li>表达式语句</li><li>宏语句</li></ol><h2 id="编译期计算" tabindex="-1">编译期计算 <a class="header-anchor" href="#编译期计算" aria-label="Permalink to &quot;编译期计算&quot;">​</a></h2><h3 id="常量函数" tabindex="-1">常量函数 <a class="header-anchor" href="#常量函数" aria-label="Permalink to &quot;常量函数&quot;">​</a></h3><h3 id="常量类型" tabindex="-1">常量类型 <a class="header-anchor" href="#常量类型" aria-label="Permalink to &quot;常量类型&quot;">​</a></h3>',14),o=[r];function s(n,h,d,u,c,_){return i(),t("div",null,o)}const f=a(l,[["render",s]]);export{p as __pageData,f as default};