import{_ as e,o as a,c as s,b as l,r as t,d as i,t as c,e as r,f as n,F as o,g as d,h as v,u as p,i as u,w as b,v as m,V as g,j as k,k as _,l as f}from"./app.7ddba1ed.js";const h={class:"TeamHero"},w={class:"container"},U={class:"title"},j={class:"lead"},I={class:"action"};var $=e({},[["render",function(e,i){return a(),s("div",h,[l("div",w,[l("h1",U,[t(e.$slots,"title",{},void 0,!0)]),l("p",j,[t(e.$slots,"lead",{},void 0,!0)]),l("p",I,[t(e.$slots,"action",{},void 0,!0)])])])}],["__scopeId","data-v-9f95547a"]]);const y={class:"banner"},A=["src"],C={key:1,class:"banner-tip"},x={class:"info"},P={class:"name"},V={class:"desc"};var B=e(i({props:{article:null},setup(e){const t=e,i=()=>{window.location.href=t.article.linkUrl};return(t,r)=>(a(),s("article",{class:"ArticleItem",onClick:i},[l("figure",y,[e.article.bannerUrl?(a(),s("img",{key:0,class:"banner-img",src:e.article.bannerUrl},null,8,A)):(a(),s("div",C,c(e.article.tip),1))]),l("div",x,[l("h1",P,c(e.article.name),1),l("section",V,c(e.article.desc),1)])]))}}),[["__scopeId","data-v-776ab5b6"]]);const F={class:"ArticleList"},H={class:"container"},L={class:"info"},O={class:"title"},T={class:"lead"},q={class:"articles"},z={key:0,class:"building"},D={class:"pagination"},E={class:"item"},G=_(" 上一页 "),J={class:"item"},K=_(" 下一页 ");var M=e(i({props:{articles:null},setup(e){const i=e,c=r(1),_=n((()=>{const e=5*(c.value-1);return i.articles.slice(e,e+5)})),f=n((()=>5*c.value<i.articles.length)),h=e=>{c.value+=1===e?1:-1};return(e,i)=>(a(),s("section",F,[l("div",H,[l("div",L,[l("h2",O,[t(e.$slots,"title",{},void 0,!0)]),l("p",T,[t(e.$slots,"lead",{},void 0,!0)])]),l("div",q,[(a(!0),s(o,null,d(p(_),(e=>(a(),s("div",{key:e.name,class:"article"},[v(B,{article:e},null,8,["article"])])))),128)),0===p(_).length?(a(),s("div",z," 🚧 建设中 🏗️ ")):u("",!0),l("div",D,[l("div",{onClick:i[0]||(i[0]=e=>h(2))},[b(l("div",E,[v(p(g),{class:"icon"}),G],512),[[m,c.value>1]])]),l("div",{onClick:i[1]||(i[1]=e=>h(1))},[b(l("div",J,[K,v(p(k),{class:"icon"})],512),[[m,p(f)]])])])])])]))}}),[["__scopeId","data-v-573e56ae"]]);const N={class:"ArticlePage"},Q=_("写的一些东西"),R=_("涵盖各个知识面的文章，有专业内入也有工作记录的，还有一些杂事儿"),S=_("🔖 专业文章"),W=_("写的一些专业文章，理论总结。花了点心思的东西。"),X=_("👷 搬砖记录"),Y=_("在日常工作中遇到的一些坑，主要是实战记录。"),Z=_("👽️ 杂七杂八"),ee=_("在日常工作中遇到的一些坑，主要是实战记录。");var ae=e(i({setup(e){const l={article:[],project:[{bannerUrl:"/article/images/vite.webp",tip:"",name:"Vite 工程优化",desc:"项目中切换vite的记录,对于webpack来说，vite是个实打实的杀手",linkUrl:"../work/tencent/vite-build"}],personal:[{bannerUrl:"/article/images/vite-press.webp",tip:"",name:"Blog 翻新记录",desc:"利用工作之余翻新了我的blog, 翻新的也差不多了,记录一下整个流程",linkUrl:"../article/record/blog-refactor"}]};return(e,t)=>(a(),s("div",N,[v($,null,{title:f((()=>[Q])),lead:f((()=>[R])),_:1}),v(M,{articles:l.article},{title:f((()=>[S])),lead:f((()=>[W])),_:1},8,["articles"]),v(M,{articles:l.project},{title:f((()=>[X])),lead:f((()=>[Y])),_:1},8,["articles"]),v(M,{articles:l.personal},{title:f((()=>[Z])),lead:f((()=>[ee])),_:1},8,["articles"])]))}}),[["__scopeId","data-v-024e87c8"]]);const se='{"title":"文章","description":"","frontmatter":{"page":true,"title":"文章"},"headers":[],"relativePath":"article/index.md"}',le={},te=Object.assign(le,{setup:e=>(e,l)=>(a(),s("div",null,[v(ae)]))});export{se as __pageData,te as default};