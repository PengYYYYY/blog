# 物理引擎

2D 的物理引擎，matter.js

- demo：https://web-render-starter.vercel.app/matter
- 代码：https://github.com/PengYYYYY/web-render-starter/blob/master/src/pages/matter.tsx

## 基础概念

- 引擎（Engine）：引擎 `Engine` 是 `Matter.js` 的核心组件，用于管理物理世界中的所有对象、计算物体的运动和相互作用。用来模拟真实环境的。
- 渲染器（Render）：渲染器 `Render` 用于将物理世界中的对象可视化，将物体渲染到屏幕上。
- 复合体（Composite）：是包含多个刚体和约束的容器，它们可以作为单个物理对象进行操作。
- 刚体（Body）：表示具有物理属性的实体，如形状、质量和速度等。刚体可以是各种形状，例如矩形、圆形、多边形等。
- 约束（Constraint）：用于约束刚体的相对运动，例如让两个刚体之间的距离保持不变、限制旋转等。
- 循环模块（Runner）：`Runner` 用于管理和控制物理引擎的主循环。
