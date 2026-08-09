---
title: "ReAct: Synergizing Reasoning and Acting in Language Models"
authors: "Shunyu Yao(姚顺雨), Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao(Princeton + Google Brain)"
source: "ICLR 2023 · arXiv:2210.03629"
status: 读完
date: "2026-07-28"
link: "https://arxiv.org/abs/2210.03629"
tags: [LLM, Agent, Reasoning, Prompting, CoT]
---

# ReAct: Synergizing Reasoning and Acting in Language Models

> **一句话总结**:把大模型的"推理(想)"和"行动(调工具)"交织进同一个循环——想一步→查一步→再想,让推理有真实事实兜底、行动有计划指引。它是今天几乎所有 AI Agent 的思想原型。
> 🔗 **相关实操**:Stage 1:手写 ReAct Loop · Stage 0:手写 Function Calling · 名词见[大模型基础名词词典](/ai/llm-basics/glossary)

## 背景与动机
- 在此之前,LLM 的两种能力被**分开研究**:
  - **Reasoning 推理**(如 Chain-of-Thought):只在"脑子里"空想,不接触外部世界 → 一旦某事实记错,后续全盘皆错(**幻觉 + 错误传播**)。
  - **Acting 行动**(如动作计划生成):闷头做,不会边做边想、不会处理意外。
- 核心洞察:**人类做事时"想"和"做"本就是交织的**——查资料时会想该搜什么→搜→看结果→纠偏再搜。ReAct 就是把这个循环搬给大模型。

## 核心方法 / 主要观点
**Thought → Action → Observation 交替循环**(全文灵魂):

```
Thought:  我需要知道 X,应该先查 Y          ← 推理(内部,不与外界交互)
Action:   search[Y]                        ← 行动(调外部工具/API)
Observation: (Y 的搜索结果返回)            ← 环境反馈(外部真实事实)
Thought:  结果提到 Z 但没说 X,再查 Z
Action:   search[Z]
Observation: ...
Thought:  够了
Action:   finish[W]                         ← 结束
```

- **Thought**:组织思路、拆计划、纠偏,不与外界交互 → 让推理"引导"行动。
- **Action**:真正调用外部。HotpotQA 里动作空间极简,仅三个:`search[实体]`、`lookup[关键词]`、`finish[答案]`。
- **Observation**:环境返回的真实反馈,把模型拉回现实 → 让行动"喂事实"给推理,治幻觉。
- 两者**相互补台**,即标题的 **Synergizing(协同)**。

## 关键结论

### 实验结果
| 任务类型 | 数据集 | ReAct 做法 | 结果 |
|---|---|---|---|
| 知识密集问答/事实核查 | HotpotQA、Fever | 靠 Wikipedia API 边查边推理 | 显著压制 CoT 的幻觉与错误传播,轨迹更像人、更可解释 |
| 交互式决策 | ALFWorld(文字家务)、WebShop(网购) | 边想边操作环境 | 比模仿学习/RL 基线**绝对成功率高 34% / 10%**,仅用 **1~2 个示例** |

- 最惊人处:**仅 1~2 个 in-context 示例(不训练)** 就打过需要大量训练的 RL 方法。

### ReAct vs CoT 的本质差别
- **结构**:CoT 和 ReAct 都会"一步步推理",但 **CoT 每步只能靠模型自己记住的知识(闭卷)**,ReAct 每隔几步能去外部捞真实事实(**开卷**)。
- **各自失败模式(论文的诚实之处)**:
  - **CoT 的病 = 幻觉**:想得流畅但事实是编的;自由度高但易一本正经胡说。
  - **ReAct 的病 = 卡死/被检索绑架**:搜索没用时会打转,或过度依赖搜到的信息、不敢用自身推理;更实事求是但更死板。
- **最佳方案 = 两者结合(ReAct + CoT-SC)**:先 ReAct 边查边推理;设定步数内答不出 → 回退 CoT 自采样(self-consistency)用内部知识兜底。"**能查就查,查不到就靠想**"。

**经典例子(Figure 1)**:问"除了 Apple Remote,还有什么设备能控制它最初设计交互的程序?"
- CoT 凭记忆瞎编答 `iPod`(错,幻觉,无纠错机制)。
- ReAct:search[Apple Remote]→查到控制 Front Row→search[Front Row]→查到可由键盘功能键控制→`finish[keyboard function keys]`(对)。

## 对我的启发 / 可迁移
- 它是今天几乎所有 **AI Agent** 的思想原型——工具调用型 Agent(包括能调工具的助手)底层循环就是 ReAct 的 Thought-Action-Observation。
- 证明了 **"给模型外部工具 + 让它边想边用" 比 "把知识全塞进模型脑子" 更可靠**。
- **可解释性**:每步 Thought 都写出来,人能看懂它为什么这么做、错在哪 → 对信任与调试极重要。
- 一句话记忆:**CoT 让模型会想,ReAct 让模型边想边和世界核对。CoT 天花板是模型记住多少,ReAct 天花板是它能接触多少工具。**

## 笔记与摘录
- 摘要金句:"reasoning traces help the model induce, track, and update action plans as well as handle exceptions, while actions allow it to interface with external sources ... to gather additional information."
- 待深挖:ReAct + CoT-SC 的具体回退阈值与切换策略;WebShop/ALFWorld 的动作空间设计。
