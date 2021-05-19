# 编译

在模版编译角度上来做两者的对比。两者都是将dsl转换为渲染函数，vue将template转换为。h函数。jsx通过createElement转换为render function。

## vue

核心语法，.vue文件，模板通过编译生成AST，再由AST生成Vue的渲染函数。渲染函数结合数据生成Virtual DOM树，对Virtual DOM进行diff和patch后生成新的UI。

## react

## 对比

`template` 约束性相对来说要高，需要使用 `vue` 指定的 `api`, `v-if`, `v-show`等。

jsx的灵活性要高很多。
