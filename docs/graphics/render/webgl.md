<script setup>
import FigmaContainer from '/components/FigmaContainer.vue'
</script>
# webgl基础

## 着色器与GLSL

WebGL在电脑的GPU中运行, 在编写能够在GPU上运行的代码过程中，每对方法中一个叫顶点着色器， 另一个叫片断着色器，每一对组合起来称作一个 `program`（着色程序）。

对于想要绘制的每一个对象，都需要先设置一系列状态值，然后通过调用 `gl.drawArrays` 或 `gl.drawElements` 运行一个着色方法对，使得你的着色器对能够在 `GPU` 上运行。着色器获取数据的4种方法:

- 属性（Attributes）和缓冲: 缓冲是发送到GPU的一些二进制数据序列，通常情况下缓冲数据包括位置，法向量，纹理坐标，顶点颜色值等。 你可以存储任何数据。
- 全局变量（Uniforms）: 全局变量在着色程序运行前赋值，在运行过程中全局有效。
- 纹理（Textures）: 纹理是一个数据序列，可以在着色程序运行中随意读取其中的数据。 大多数情况存放的是图像数据，但是纹理仅仅是数据序列， 你也可以随意存放除了颜色数据以外的其它数据。
- 可变量（Varyings）: 可变量是一种顶点着色器给片断着色器传值的方式，依照渲染的图元是点， 线还是三角形，顶点着色器中设置的可变量会在片断着色器运行中获取不同的插值。

## 渲染过程

<FigmaContainer url="https://www.figma.com/file/E2utI9rEseFTc7tJ3Bbl9o/blog?type=whiteboard&node-id=6318-2275&t=KmNXICbmTbkjqlYv-4" />

- demo：https://web-render-starter.vercel.app/webgl
- 代码：https://github.com/PengYYYYY/web-render-starter/blob/master/src/pages/webgl.tsx
