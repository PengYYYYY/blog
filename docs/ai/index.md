# AI

LLM / Agent / 大模型相关的学习与探索。

## LLM 原理

一本名词词典 + 三条按数据流接续的主线。词典查名词，三条主线后两篇都从第一篇的某一节往下接。

- [大模型基础名词词典](/ai/llm-basics/llm-dictionary) —— 按主题分类的名词速查（模型本体 / 输入输出 / 生成 / 训练 / 硬件 / 应用层）
- [LLM 基础：跟着一个 token 走完全程](/ai/llm-basics/glossary) —— 一次前向传播的完整链路：分词 → 残差流 → attention → FFN → 采样 → KV Cache → 训练流水线 → 硬件账本
- [多模态：一张图怎么变成 token](/ai/llm-basics/multimodal) —— 给入口加一条平行支路。ViT / 投影层 / 各家图像计费公式
- [一张卡装不下之后：把模型切开](/ai/llm-basics/distributed) —— 从硬件账本那张 185 GB 的表往下接。ZeRO / TP / PP / CP / EP / FlashAttention / MFU

## Agent

- [Agent：跟着一次循环走完全程](/ai/agent/agent-loop) —— 在那 12 行外面套一个 while 循环。Function Calling / RAG / MCP / 上下文工程，统一按 token 预算来算
- [ReAct 论文笔记](/ai/agent/yao-2023-react) —— 思想原型。Reasoning + Acting 那篇原始论文的精读
