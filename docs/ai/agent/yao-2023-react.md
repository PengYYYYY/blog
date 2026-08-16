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
> 🔗 **相关实操**:Stage 1:手写 ReAct Loop · Stage 0:手写 Function Calling · 名词见[大模型基础名词词典](/ai/llm-basics/llm-dictionary)

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

### 真正的形式化贡献:把「想」定义成一个动作
论文一句话就把整件事讲完了:

> **Â = A ∪ L**,其中 L 是语言空间。

原本 agent 只有环境动作空间 `A`(点击、搜索、移动)。ReAct 干的事是把**整个语言空间并进动作空间**——「想一句话」从此是一个合法动作,只不过它**不改变外部环境**(论文原话:thought "does not affect the external environment")。

**这才是 ReAct 的真正内核,而不是那个 Thought/Action/Observation 的模板。** 两个推论:

1. **动作空间从有限变成无限**。`search` 只有几种写法,但「想什么」是开放的 → 这也是为什么它不能靠传统 RL 学(枚举不了),只能靠语言预训练的先验。
2. **今天的 reasoning 模型是同一件事的另一种实现**。ReAct 靠 prompt 让模型在动作序列里插入语言;RLVR 把这个行为直接训进了权重。**Thought 从「你要提示它」变成了「它默认就这么干」**,但 `Â = A ∪ L` 这个结构没变。

## 关键结论

### 实验结果

**知识密集任务(PaLM-540B,论文 Table 1)**:

| 方法 | HotpotQA (EM) | Fever (Acc) |
|---|---|---|
| Standard | 28.7 | 57.1 |
| CoT | **29.4** | 56.3 |
| CoT-SC(21 次自采样) | 33.4 | 60.4 |
| Act(只行动,无 Thought) | 25.7 | 58.9 |
| **ReAct** | **27.4** | 60.9 |
| ReAct → CoT-SC | **35.1** | 62.0 |
| CoT-SC → ReAct | 34.2 | **64.6** |

> ⚠️ **这张表最该被注意的一行,恰恰是通常被跳过的那行**:在 HotpotQA 上,**ReAct 单独用是输给 CoT 的(27.4 vs 29.4),甚至输给什么都不做的 Standard(28.7)**。
>
> 所以「ReAct 比 CoT 强」是个流传很广但不准确的读法。论文真正证明的是:**ReAct 和 CoT 各有各的病,只有把两者缝起来才同时超过两个单方(35.1 / 64.6)**。下面「能查就查,查不到就靠想」不是一句漂亮的收尾,**它是这篇论文唯一真正赢下 HotpotQA 的配置。**

**交互式决策任务**:

| 数据集 | ReAct | 最强基线 | 差值 |
|---|---|---|---|
| ALFWorld(文字家务) | **71**(best of 6);均值 57 | BUTLER 37(best of 8) | **+34** |
| WebShop(网购) | **40.0** 成功率 / 66.6 分 | IL 29.1 / IL+RL 28.7 | **+10.9** |

- 最惊人处:**仅 1~2 个 in-context 示例(不训练)** 就打过需要大量训练的 IL / RL 方法。WebShop 的人类专家是 59.6,**ReAct 的 40.0 离人还差得远**——这是论文自己标出来的天花板。
- ⚠️ 那个 **34% 是 best-of-6 对 best-of-8**,ReAct 六次的**均值只有 57**(对应差值 +20)。摘要里的 34% 成立,但它是最好一次的成绩,不是期望成绩。

### ReAct vs CoT 的本质差别
- **结构**:CoT 和 ReAct 都会"一步步推理",但 **CoT 每步只能靠模型自己记住的知识(闭卷)**,ReAct 每隔几步能去外部捞真实事实(**开卷**)。
- **各自失败模式(论文的诚实之处)**——论文人工标了 200 条轨迹(每种方法各 50 条对、50 条错),给出的是数字而不是形容词:

  | | CoT | ReAct |
  |---|---|---|
  | 答对且推理也对(true positive) | 86% | **94%** |
  | 答对但推理是编的(false positive) | 14% | **6%** |
  | **幻觉**在错误里的占比 | **56%(最大失败源)** | **0%** |
  | 主要失败模式 | 幻觉 | 推理卡死 / 搜索捞不到有效信息 |

  **「幻觉 0%」和「HotpotQA 分数更低」同时成立**,这两件事必须一起读:接地消灭了编造,但也把 agent 锁死在「搜到什么就只能用什么」上。ReAct 的病 = **卡死/被检索绑架**——搜索没用时会打转,或过度依赖搜到的信息、不敢用自身推理;更实事求是但更死板。
- **最佳方案 = 两者结合**,而且论文给的切换规则是具体可实现的(原「待深挖」的答案):
  - **ReAct → CoT-SC**:ReAct 在给定步数内答不出来就回退。步数上限 **HotpotQA 7 步 / Fever 5 步**。
  - **CoT-SC → ReAct**:21 次自采样中**多数答案出现次数 < n/2** 时(= 内部知识撑不住这道题)回退去查。采样温度 0.7。
  - 两个方向都是同一句话:「**能查就查,查不到就靠想**」——而「该不该信自己」是用**采样一致性**当置信度来判的。这个「低一致性 → 去外部核对」的模式,今天仍然是最实用的一条 agent 启发式。

**经典例子(Figure 1)**:问"除了 Apple Remote,还有什么设备能控制它最初设计交互的程序?"
- CoT 凭记忆瞎编答 `iPod`(错,幻觉,无纠错机制)。
- ReAct:search[Apple Remote]→查到控制 Front Row→search[Front Row]→查到可由键盘功能键控制→`finish[keyboard function keys]`(对)。

### 被忽略的第三个实验:微调
论文末尾有一节几乎从不被引用,但它的含义比主实验更大——用 **3,000 条自举出来的 ReAct 轨迹**去微调小模型:

- **微调后的 PaLM-8B ReAct,打过所有 PaLM-62B 的 prompting 方法**
- **微调后的 PaLM-62B ReAct,打过所有 540B 的 prompting 方法**
- 同样的微调数据量下,ReAct 轨迹显著优于用 Standard / CoT 轨迹微调

**一句话:轨迹能换模型规模。** 用 3,000 条好轨迹微调,顶得上把模型放大近一个数量级。

这条线后来长成了姚顺雨自己的 FireAct(500 条 GPT-4 轨迹微调 Llama2-7B),以及今天所有 agent 蒸馏的做法。它也解释了为什么他后来反复讲「**数据/轨迹优先于架构**」——这个判断在 2022 年这篇论文的最后一节就已经有实验支撑了,只是当时没人看。

## ⚠️ 反面证据:ReAct 的收益可能不来自「交织推理」
一篇笔记只记论文自己的说法是不够的。2024 年 Kambhampati 组的《On the Brittle Foundations of ReAct Prompting for Agentic Large Language Models》(arXiv:2405.13966)直接质疑了因果归因:

> 性能"受『把推理轨迹与动作执行交织』的影响极小"(minimally influenced),LLM 表现出的推理能力"源自**示例与查询的相似度和近似检索**,而非任何内在推理能力"。

也就是说:**ReAct 有效 ≠ 因为它让模型「边想边做」,可能只是因为那 1~2 个 few-shot 示例和测试题长得像。** 这和主实验里「ReAct 在 HotpotQA 上打不过 CoT」是相互印证的——如果交织推理本身有那么强,不该出现那个结果。

**怎么同时接受这两件事**:ReAct 的**理念**(接地、可验证、把语言并进动作空间)被四年后的工程实践完整验证了;但它的**机制解释**(交织带来推理增益)是脆弱的、泛化性存疑的。**范式活了下来,论文里的因果故事没有完全活下来。**

这也是读所有 agent 论文的通用姿势:**分开看「这个结构该不该这么搭」和「作者对它为什么有效的解释」。**

## 对我的启发 / 可迁移
- 它是今天几乎所有 **AI Agent** 的思想原型——工具调用型 Agent(包括能调工具的助手)底层循环就是 ReAct 的 Thought-Action-Observation。四年后的实际工程见 [Agent:跟着一次循环走完全程](/ai/agent/agent-loop)。
- 证明了 **"给模型外部工具 + 让它边想边用" 比 "把知识全塞进模型脑子" 更可靠**。
- **可解释性**:每步 Thought 都写出来,人能看懂它为什么这么做、错在哪 → 对信任与调试极重要。
- **「置信度不足就去外部核对」是可以直接抄的工程模式**:自采样一致性低 → 触发检索。不需要任何新模型能力。
- **轨迹是比架构更便宜的杠杆**(微调那节):要提升一个 agent,先想「我能不能攒 3,000 条好轨迹」,而不是先改 orchestration。
- 一句话记忆:**CoT 让模型会想,ReAct 让模型边想边和世界核对。CoT 天花板是模型记住多少,ReAct 天花板是它能接触多少工具。**

## 时间线上的位置(为什么这篇重要)
- 姚顺雨说 ReAct 的原型早在 **2021 年 11 月**就有了,而 Chain-of-Thought(Wei et al.)是 **2022 年 1 月**才挂出来的——**ReAct 的想法早于 CoT**。他当时在做文字游戏,动机是一个朴素的问题:「为什么不让文字 agent 也思考?」(Latent Space 访谈)
- 论文投出时叫 ICLR 2023 Oral;它前面是 CALM(2020,他人生第一个 eureka:语言先验让「想」能泛化),后面是 Tree of Thoughts(2023,把思考做成树搜索)、SWE-bench(2023)、SWE-agent(2024,提出 ACI「agent 是一类新的终端用户」)。
- 三年后他在《The Second Half》(2025)里回头总结这条线,原话是:
  > "It turned out the most important part of RL might not even be the RL algorithm or environment, but **the priors**, which can be obtained in a way totally unrelated from RL."

  ReAct 就是这句话最早的实证:**没训练,只靠语言预训练的先验 + 一个接地的循环,就打过了大量训练的 RL 基线。**

## 笔记与摘录
- 摘要金句:"reasoning traces help the model induce, track, and update action plans as well as handle exceptions, while actions allow it to interface with external sources ... to gather additional information."
- 形式化内核:**Â = A ∪ L**;thought "does not affect the external environment"。
- 还可深挖:ALFWorld 六次运行方差为什么这么大(均值 57 vs 最好 71)——这其实是今天「agent 可靠性 ≠ 能力」问题的最早征兆,姚顺雨后来在 τ-bench 里用 **pass@1 vs pass^k** 把它变成了正式度量(GPT-4o 零售 pass@1 约 61%,pass^8 跌到 25% 以下)。**ReAct 这张表里的方差,四年后才有了名字。**
