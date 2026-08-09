// 大模型基础名词关系图数据,配合 RelationGraph 组件使用
// 内容对应 ./glossary.md 里的词条,按主题聚成 6 类(含应用层 / Agent 栈)

export const clusters = [
  { id: 'body', name: '模型本体', color: '#6c8cff' },
  { id: 'io', name: '输入输出', color: '#3ecf8e' },
  { id: 'gen', name: '生成过程', color: '#ffb454' },
  { id: 'train', name: '训练阶段', color: '#ff6b9d' },
  { id: 'hw', name: '硬件视角', color: '#b07cff' },
  { id: 'app', name: '应用层(Agent 栈)', color: '#4dd0e1' }
]

export const nodes = [
  {
    id: 'weights',
    cluster: 'body',
    label: '权重 / 参数',
    def: '模型里那几千万/几十亿个"学出来的数字"。模型 = 固定架构 + 权重,推理就是用输入和这些数字做矩阵运算。'
  },
  {
    id: 'base',
    cluster: 'body',
    label: '基座模型',
    def: '大规模预训练后、还没做指令微调的模型,只会"续写文本",不懂"这是一道题"。'
  },
  {
    id: 'instruct',
    cluster: 'body',
    label: '指令微调模型',
    def: '在基座模型上用(指令, 回答)对继续训练,学会"听懂指令、好好回答"。'
  },
  {
    id: 'transformer',
    cluster: 'body',
    label: 'Transformer / 注意力',
    def: '当前大模型的主流架构;注意力机制让每个 token 在生成时"关注"输入里相关的其他 token,是生成的核心。'
  },
  {
    id: 'distill',
    cluster: 'body',
    label: '蒸馏',
    def: '让小模型(学生)模仿大模型(老师)的输出,用更少参数逼近老师能力。'
  },
  {
    id: 'token',
    cluster: 'io',
    label: 'Token / 分词',
    def: '文本被切成的最小单位(常是子词,不一定是整词;中文常切成字/子词)。'
  },
  {
    id: 'input_ids',
    cluster: 'io',
    label: 'input_ids',
    def: 'token 在词表里的整数编号序列,是真正送进模型的东西。'
  },
  {
    id: 'vocab',
    cluster: 'io',
    label: '词表',
    def: '模型认识的全部 token 集合,通常几万量级。生成时"下一个词"就在这张表里选。'
  },
  {
    id: 'embedding',
    cluster: 'io',
    label: 'Embedding',
    def: '把 token id 映射成高维向量;语义相近的词,向量也相近。模型真正的计算在向量空间里进行。'
  },
  {
    id: 'ctxwin',
    cluster: 'io',
    label: '上下文窗口',
    def: '模型一次能"看到"的最大 token 数(输入 + 已生成)。硬上限由 HBM 容量被 KV Cache 吃满决定。'
  },
  {
    id: 'autoregressive',
    cluster: 'gen',
    label: '自回归生成',
    def: '一个一个吐 token,每一步都基于前面所有 token 预测"下一个最可能的词"。'
  },
  {
    id: 'inference',
    cluster: 'gen',
    label: '推理',
    def: '用训练好的权重跑前向计算、产出结果。区别于"训练"。'
  },
  {
    id: 'logits',
    cluster: 'gen',
    label: 'logits',
    def: '模型最后一层输出的原始分数(未归一化),经 softmax 后变成"下一个词"的概率分布。'
  },
  {
    id: 'temp',
    cluster: 'gen',
    label: '温度 / 采样',
    def: '控制生成的随机性。temperature 高→更随机,低→更确定;top-p/top-k 限制候选范围。'
  },
  {
    id: 'quant',
    cluster: 'gen',
    label: '量化',
    def: '把 fp32 权重压成 int8/int4,大幅减小体积、加速推理,代价略损精度。'
  },
  {
    id: 'halluc',
    cluster: 'gen',
    label: '幻觉',
    def: '生成流畅但事实错误的文本。说明参数记忆不可靠,并非有意编造。'
  },
  {
    id: 'pretrain',
    cluster: 'train',
    label: '预训练',
    def: '在万亿级无标注文本上自监督学"预测下一个词",产出基座模型。最贵、最基础的一步。'
  },
  {
    id: 'sft',
    cluster: 'train',
    label: 'SFT',
    def: '监督微调:用大量人工写的(指令, 理想回答)对继续训练,让模型学会遵循指令。'
  },
  {
    id: 'align',
    cluster: 'train',
    label: 'RLHF / DPO',
    def: '用人类偏好对齐,抑制幻觉,让回答"有用、无害、诚实"。DPO 比 RLHF 更简洁主流。'
  },
  {
    id: 'gpu',
    cluster: 'hw',
    label: 'GPU',
    def: '海量核心的并行处理器。LLM 推理几乎都是大矩阵乘法,正好是 GPU 的强项。'
  },
  {
    id: 'hbm',
    cluster: 'hw',
    label: 'HBM',
    def: '高带宽显存,紧贴 GPU 的高速内存(如 H100 ~3.35 TB/s),但容量有限。'
  },
  {
    id: 'kvcache',
    cluster: 'hw',
    label: 'KV Cache',
    def: '缓存注意力算过的 K、V 避免重算;随序列变长线性膨胀,吃掉的正是 HBM。'
  },
  {
    id: 'agent',
    cluster: 'app',
    label: '智能体 / Agent',
    def: '能自主多步规划 + 调用工具(Function Calling)来完成任务的系统,而非一问一答。'
  },
  {
    id: 'rag',
    cluster: 'app',
    label: '检索增强 / RAG',
    def: '回答前先去外部知识库检索,把相关内容拼进上下文再生成,直接针对幻觉。'
  },
  {
    id: 'safety',
    cluster: 'app',
    label: '对齐与安全 / 护栏',
    def: '用输入/输出过滤、拒答、护栏等防模型被"提示注入"骗干坏事或输出有害内容。'
  },
  {
    id: 'benchmark',
    cluster: 'app',
    label: '基准测试 / MMLU',
    def: '用标准题库统一衡量模型能力,回答"谁更强、强在哪"。'
  }
]

// [source, target, 关系标签] —— 方向 = source 指向 target
export const edges = [
  { source: 'weights', target: 'base', label: '构成' },
  { source: 'pretrain', target: 'base', label: '产出' },
  { source: 'base', target: 'sft', label: '输入' },
  { source: 'sft', target: 'instruct', label: '产出' },
  { source: 'instruct', target: 'align', label: '对齐' },
  { source: 'base', target: 'distill', label: '蒸馏自' },
  { source: 'transformer', target: 'autoregressive', label: '支撑' },
  { source: 'token', target: 'input_ids', label: '得到' },
  { source: 'token', target: 'vocab', label: '属于' },
  { source: 'vocab', target: 'logits', label: '决定候选范围' },
  { source: 'input_ids', target: 'embedding', label: '映射' },
  { source: 'embedding', target: 'transformer', label: '喂入' },
  { source: 'ctxwin', target: 'kvcache', label: '上限由…定' },
  { source: 'ctxwin', target: 'autoregressive', label: '限制' },
  { source: 'autoregressive', target: 'inference', label: '即' },
  { source: 'autoregressive', target: 'kvcache', label: '产生' },
  { source: 'logits', target: 'temp', label: '作用于' },
  { source: 'temp', target: 'autoregressive', label: '决定' },
  { source: 'quant', target: 'hbm', label: '省' },
  { source: 'gpu', target: 'hbm', label: '含' },
  { source: 'inference', target: 'gpu', label: '跑在' },
  { source: 'base', target: 'halluc', label: '易产生' },
  { source: 'align', target: 'halluc', label: '抑制' },
  { source: 'kvcache', target: 'hbm', label: '吃掉' },
  { source: 'instruct', target: 'agent', label: '构成' },
  { source: 'autoregressive', target: 'agent', label: '驱动' },
  { source: 'rag', target: 'halluc', label: '缓解' },
  { source: 'align', target: 'safety', label: '延伸为' },
  { source: 'benchmark', target: 'instruct', label: '评测' }
]
