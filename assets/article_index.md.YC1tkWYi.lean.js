import{_ as m,o as r,c,m as e,r as d,d as f,t as h,e as b,p as I,g as A,n as D,h as T,k as U,F as y,E as S,a3 as $,a4 as x,a,I as o,q as L,s as P,w as i}from"./chunks/framework.B9byA8Cw.js";const j={},B={class:"TeamHero"},N={class:"container"},V={class:"title"},q={class:"lead"},z={class:"action"};function J(t,s){return r(),c("div",B,[e("div",N,[e("h1",V,[d(t.$slots,"title",{},void 0,!0)]),e("p",q,[d(t.$slots,"lead",{},void 0,!0)]),e("p",z,[d(t.$slots,"action",{},void 0,!0)])])])}const M=m(j,[["render",J],["__scopeId","data-v-4b96fd09"]]),O={class:"article-wrapper"},H={key:0,class:"banner-tip"},E={class:"banner"},F=["src"],G={class:"info"},K={class:"name"},Q={class:"desc"},R=f({__name:"ArticleItem",props:{article:{type:Object,required:!0}},setup(t){const s=t,l=()=>{s.article.linkUrl&&(s.article.external?window.open(s.article.linkUrl):window.location.href=s.article.linkUrl)};return(_,k)=>(r(),c("div",O,[t.article.tip?(r(),c("div",H,h(t.article.tip),1)):b("",!0),e("article",{class:D(["ArticleItem",{disabled:!t.article.linkUrl}]),onClick:l},[e("figure",E,[t.article.bannerUrl?(r(),c("img",{key:0,class:"banner-img",src:I(A)(t.article.bannerUrl)},null,8,F)):b("",!0)]),e("div",G,[e("h1",K,h(t.article.name),1),e("section",Q,h(t.article.desc),1)])],2)]))}}),W=m(R,[["__scopeId","data-v-a2ea2024"]]),C=t=>(L("data-v-258b7717"),t=t(),P(),t),X={class:"ArticleList"},Y={class:"container"},Z={class:"info"},ee={class:"title"},te={class:"lead"},se={class:"articles"},ae={key:0,class:"building"},ie={class:"pagination"},re={class:"item"},ce=C(()=>e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",viewBox:"0 0 24 24",class:"icon","data-v-b57a953c":""},[e("path",{d:"M15,19c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4l6-6c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L10.4,12l5.3,5.3c0.4,0.4,0.4,1,0,1.4C15.5,18.9,15.3,19,15,19z"})],-1)),le={class:"item"},ne=C(()=>e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",viewBox:"0 0 24 24",class:"icon","data-v-b57a953c":""},[e("path",{d:"M9,19c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l5.3-5.3L8.3,6.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l6,6c0.4,0.4,0.4,1,0,1.4l-6,6C9.5,18.9,9.3,19,9,19z"})],-1)),g=5,oe=f({__name:"ArticleList",props:{articles:{type:Object,required:!0}},setup(t){const s=t,l=T(1),_=U(()=>{const n=(l.value-1)*g;return s.articles.slice(n,n+g)}),k=U(()=>l.value*g<s.articles.length),w=n=>{l.value+=n===1?1:-1};return(n,p)=>(r(),c("section",X,[e("div",Y,[e("div",Z,[e("h2",ee,[d(n.$slots,"title",{},void 0,!0)]),e("p",te,[d(n.$slots,"lead",{},void 0,!0)])]),e("div",se,[(r(!0),c(y,null,S(_.value,v=>(r(),c("div",{key:v.name,class:"article"},[o(W,{article:v},null,8,["article"])]))),128)),_.value.length===0?(r(),c("div",ae," 🚧 建设中 🏗️ ")):b("",!0),e("div",ie,[e("div",{onClick:p[0]||(p[0]=v=>w(2))},[$(e("div",re,[ce,a(" 上一页 ")],512),[[x,l.value>1]])]),e("div",{onClick:p[1]||(p[1]=v=>w(1))},[$(e("div",le,[a(" 下一页 "),ne],512),[[x,k.value]])])])])])]))}}),u=m(oe,[["__scopeId","data-v-258b7717"]]),de={class:"ArticlePage"},_e=f({__name:"ArticlePage",setup(t){const s={top:[{bannerUrl:"/article/ai-template.svg",name:"面向 AI 编程：探索可视化分析模型",desc:"本文总结了在开发 LLM 相关需求时的功能拆解和实现思路，并分享了在利用 ChatGPT 生成结构化数据时遇到的问题及相应解决方案",linkUrl:"https://mp.weixin.qq.com/s/HrxQtfc8j-zD9kMRGhTn6w",external:!0,tip:"本文被鹅厂技术工程转发，腾讯 KM 头条文章"}],article:[{bannerUrl:"/article/td-custom.svg",name:"基于 TDesign 搭建一个业务组件库",desc:"本文讲述了如何基于 TDesign 搭建一个业务组件库 TDesign Custom。内容贯穿整个组件库搭建的全流程",linkUrl:"../article/record/td-custom"},{bannerUrl:"/article/td-composition-api.svg",name:"TDesign CompositionAPI 重构之路",desc:"记录了 TDesign 在 CompositionAPI 组件重构的开始，推进过程与个人的的收获",linkUrl:"../article/record/vca-refactor"},{bannerUrl:"/article/td-component.svg",name:"TDesign 组件开发范式",desc:"记录了 TDesign 的组件开发范式，在开源协同的过程中形成较为统一的开发规范",linkUrl:"../article/record/dev-paradigm"}],project:[{bannerUrl:"/article/webpack-vite.svg",name:"webpack 迁移 vite 实践",desc:"项目中切换vite的记录，对于webpack来说，vite是个实打实的杀手",linkUrl:"../article/record/webpack-vite"},{bannerUrl:"/article/td-vitest.svg",name:" TDesign 在 vitest 的实践",desc:"TDesign 从 Jest 套件迁移至 Vitest 的过程，执行效率提升60%",linkUrl:"../article/record/vitest-refactor"},{bannerUrl:"/article/vue-loader.svg",name:"Vue Loader 是怎么运行的",desc:"本文描述了 vue 文件是如何被解析的，以及 vue-loader 在 webpack 工作流当中是如何运行的",linkUrl:"../article/record/vue-loader"}],personal:[{bannerUrl:"/article/vite-press.svg",name:"Blog 翻新记录",desc:"利用工作之余翻新了我的 blog, 使用了 vitepress 和 algolia, 记录一下整个流程",linkUrl:"../article/record/blog-refactor"},{bannerUrl:"/article/deploy.svg",name:"开源网站部署工具",desc:"用过 vercel, github pages, 腾讯云serverless, 微信云托管等部署工具，简单总结一下",linkUrl:"../article/record/deploy"},{bannerUrl:"/article/nat.svg",name:"几种内网穿透姿势",desc:"利用 frp 与 ngrok 进行内网穿透的实践记录及对比",linkUrl:"../article/record/nat"},{bannerUrl:"/article/js-prototype.svg",name:"JavaScript 的原型与继承",desc:"读红宝书 JavaScript 中原型相关内容总结，简单讲讲 JavaScript 的原型、原型链和原型继承",linkUrl:"../article/record/js-prototype"}]};return(l,_)=>(r(),c("div",de,[o(M,null,{title:i(()=>[a("写的一些东西")]),lead:i(()=>[a(" 涵盖各个知识面的文章，有专业内容，也有工作记录。 ")]),_:1}),o(u,{articles:s.top},{title:i(()=>[a("📌 置顶")]),lead:i(()=>[a(" 被选录的文章，置顶一下 ")]),_:1},8,["articles"]),o(u,{articles:s.article},{title:i(()=>[a("🔖 文章")]),lead:i(()=>[a(" 写的一些文章，项目和知识总结，花了点心思的东西。 ")]),_:1},8,["articles"]),o(u,{articles:s.project},{title:i(()=>[a("👷 搬砖记录")]),lead:i(()=>[a("在日常工作中遇到的一些坑，主要是实战记录。")]),_:1},8,["articles"]),o(u,{articles:s.personal},{title:i(()=>[a("👽️ 杂七杂八")]),lead:i(()=>[a(" 一些杂七杂八的学习总结，踩坑记录等文字记录。 ")]),_:1},8,["articles"])]))}}),pe=m(_e,[["__scopeId","data-v-b7fc225a"]]),me=JSON.parse('{"title":"文章","description":"","frontmatter":{"page":true,"layout":"page","title":"文章"},"headers":[],"relativePath":"article/index.md","filePath":"article/index.md","lastUpdated":1710173044000}'),ve={name:"article/index.md"},he=Object.assign(ve,{setup(t){return(s,l)=>(r(),c("div",null,[o(pe)]))}});export{me as __pageData,he as default};