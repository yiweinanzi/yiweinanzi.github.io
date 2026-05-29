export type NodeType = '教育' | '实习经历' | '项目' | '论文' | '开源' | '荣誉';

export type TimelineNode = {
  id: string;
  type: NodeType;
  date: string;
  side?: 'left' | 'right';
  draft?: boolean;
  status?: string;
  title: string;
  org?: string;
  oneLiner: string;
  abstract?: string;
  contribution?: string[];
  keywords?: string[];
  detail?: {
    background?: string;
    role?: string;
    approach?: string[];
    tradeoffs?: string;
    retrospective?: string;
    star?: {
      situation: string;
      task: string;
      action: string;
      result: string;
    };
  };
  metrics?: { before?: string; after: string; label: string }[];
  images?: {
    src: string;
    caption?: string;
    type?: '架构图' | '框架图' | '结果图' | '截图' | 'demo' | '示意图';
  }[];
  links?: { label: string; url: string }[];
  presenterNotes?: string;
};

export const nodeTypeConfig: Record<NodeType, { label: string; icon: string; color: string }> = {
  教育: { label: '教育', icon: '🎓', color: '#2D5BFF' },
  实习经历: { label: '实习经历', icon: '💼', color: '#0EA5E9' },
  项目: { label: '项目', icon: '🧩', color: '#8B5CF6' },
  论文: { label: '论文', icon: '📄', color: '#10B981' },
  开源: { label: '开源', icon: '⭐', color: '#F59E0B' },
  荣誉: { label: '荣誉', icon: '🏆', color: '#EF4444' },
};

export const timelineNodes: TimelineNode[] = [
  {
    id: 'hnu-ai-undergrad',
    type: '教育',
    date: '2022.09',
    title: '湖南大学 · 人工智能本科',
    org: '湖南大学',
    oneLiner: '以 AI 基础、系统工程和科研训练为主线，逐步聚焦到 Agent 与检索增强推理。',
    metrics: [
      { after: '3.8/4.0', label: 'GPA' },
      { after: '前 7%', label: '专业排名' },
    ],
    keywords: ['AI 基础', '系统工程', '科研训练'],
    detail: {
      background: '本科阶段持续围绕机器学习、深度学习、自然语言处理与系统工程能力建立基础。',
      role: '学生 / 研究助理',
      approach: [
        '系统补齐 AI 核心课程与工程实践能力。',
        '在项目中把模型、数据、评测和前端展示串成完整闭环。',
        '通过论文阅读、复现实验和投稿训练形成研究问题意识。',
      ],
      retrospective: '后续研究逐步收敛到检索增强推理、Agent 自主决策和无障碍智能系统。',
    },
  },
  {
    id: 'mur-iconip-2024',
    type: '论文',
    date: '2024',
    status: 'ICONIP 2024 / CCF-C',
    title: 'MUR · Multimodal Unified Refinement',
    org: 'ICONIP 2024',
    oneLiner: '面向多媒体推荐中的域偏移、模态噪声和融合不足，设计统一的多模态特征精炼框架。',
    abstract:
      'MUR 面向多媒体推荐系统中“预训练多模态特征不等于推荐偏好”的问题，提出对比对齐、模态净化和双视角融合三层结构。方法先缓解 CLIP 等外部表征与推荐任务之间的域偏移，再过滤与用户偏好无关的图像/文本噪声，最后从全局视角和行为视角融合用户与物品表示，提升电商等场景中的推荐鲁棒性。',
    contribution: [
      '参与多模态推荐问题定义、方法模块梳理和论文实验表达，沉淀了从模型设计到会议投稿的完整科研流程。',
      '围绕模态噪声、域偏移和用户偏好建模设计消融与对比叙事，让方法贡献能被推荐系统评审快速理解。',
    ],
    keywords: ['多模态推荐', '对比学习', '模态净化'],
    metrics: [
      { after: 'CCF-C', label: '会议级别' },
      { after: '3', label: '核心模块' },
    ],
    images: [
      {
        src: '/paper-figures/mur-architecture.png',
        type: '架构图',
        caption: 'MUR 架构：对比对齐、模态净化和双视角多模态融合。',
      },
    ],
    detail: {
      background: '多媒体推荐往往直接复用预训练视觉/文本特征，但这些特征包含大量与用户偏好无关的信息。',
      role: '论文作者',
      approach: [
        '使用 Multimodal Contrastive Layer 将外部多模态表征拉回推荐任务分布。',
        '通过 Modal Purification Layer 抑制背景图像、标题冗余等偏好无关噪声。',
        '用 Dual-View Multimodal Fusion 同时建模全局偏好和行为相关偏好。',
      ],
      tradeoffs: '推荐系统需要在表达能力、噪声抑制和训练成本之间平衡，MUR 优先保证模块可解释和可做消融验证。',
      star: {
        situation: '多媒体推荐任务中，商品图片和文本标题能增强协同过滤，但也会引入背景、描述冗余和跨域偏移。',
        task: '需要提出一个能同时处理域偏移、偏好无关噪声和融合不足的框架，并用公开数据集验证有效性。',
        action: '参与构建 MUR 三层框架，围绕对比对齐、模态净化和双视角融合组织实验、消融和论文叙事。',
        result: '论文发表于 ICONIP 2024，形成了可复用的多模态推荐研究经验，也为后续多模态 RAG 与对齐研究打下基础。',
      },
    },
  },
  {
    id: 'goafar-agentic-planning',
    type: '实习经历',
    date: '2025.01-06',
    title: 'GoAfar · Agentic 路线规划',
    org: 'GoAfar',
    oneLiner: '把可验证奖励引入旅行路线规划 Agent，将“好不好玩”的主观规划转成可评估、可优化的约束求解问题。',
    metrics: [
      { before: '60%', after: '92%', label: '路线可行率' },
      { before: '40%', after: '8%', label: '约束违规率' },
      { after: '127,978', label: 'POI' },
    ],
    keywords: ['Agentic RL', 'GRPO', 'OR-Tools', '检索增强规划'],
    detail: {
      background: '旅行路线规划需要同时处理用户偏好、地理约束、营业时间、交通窗口和预算限制，纯 LLM 规划容易被同名 POI、伪捷径和跨文档营业时间干扰。',
      role: 'Agent 算法实习生',
      approach: [
        '构建语义、行为、地理三路检索，将 127,978 个 POI 与 38,580 条用户行为组织成可回放的规划证据。',
        '设计 4 类对抗干扰样本，包括同名 POI、伪直接路线、跨文档营业时间和主观差评混淆。',
        '用 OR-Tools VRPTW 生成 0/1 可验证奖励，结合偏好、时间窗和类别多样性训练 GRPO 路线规划策略。',
        '用 GPT-4o teacher agent 生成纠错轨迹，平均每条轨迹包含 8.3 次工具调用，支撑 Agent 迭代修正。',
      ],
      tradeoffs: '奖励越细，训练与调参成本越高；最终把最关键的可行性、时间窗和偏好约束放在前台，保证面试中可解释、可复现。',
      star: {
        situation: '真实旅行规划要同时满足地点、交通、营业时间和用户偏好，LLM 生成路线常被同名 POI、伪捷径和跨文档信息误导。',
        task: '我负责把“路线是否可行、是否符合偏好”变成可验证的训练信号，让规划 Agent 能在工具反馈中稳定纠错。',
        action: '我构建语义/行为/地理三路检索和 4 类对抗干扰集，用 OR-Tools VRPTW 生成 0/1 奖励，并把 GRPO 接入规划训练闭环。',
        result: '路线可行率从 60% 提升到 92%，约束违规率从 40% 降到 8%，系统在同名地点、伪捷径等干扰下更容易给出可执行路线。',
      },
    },
  },
  {
    id: 'lenovo-agent-algorithm',
    type: '实习经历',
    date: '2026.03-05',
    title: '联想开天 · Agent 算法实习',
    org: '联想开天',
    oneLiner: '围绕企业级 Agent 的多 Agent 编排、分层记忆、评测归因和产品化交付，做从研究到演示系统的闭环。',
    metrics: [
      { before: '15%', after: '3%', label: '任务错误率' },
      { after: '20+', label: '模型接入' },
      { after: '100万+', label: '产品覆盖设备/年' },
    ],
    keywords: ['多 Agent', '分层记忆', '企业级 Agent'],
    detail: {
      background: '企业级 Agent 需要处理跨渠道入口、多模型调用、工具失败、上下文膨胀和可追踪评测，不只是把 prompt 串起来。',
      role: 'Agent 算法实习生',
      approach: [
        '参与主 Agent + 专家 Agent 的职责拆分，隔离不同任务上下文并降低串扰。',
        '建设失败回放、Skill 修订和评测归因流程，将错误样例变成可持续优化的系统资产。',
        '围绕稳定性、问题解决准确率、记忆命中率、Skill 复用率、Recall@K/MRR 和满意度做指标化评估。',
      ],
      retrospective: '这段实习把“Agent demo 能跑”推进到“Agent 链路可回放、可评测、可解释”。',
      star: {
        situation: '企业级 Agent 需要跨入口、跨模型、跨工具稳定处理任务，问题不只是生成答案，还包括上下文串扰、工具失败和线上可追踪性。',
        task: '我的任务是把研究型 Agent 能力整理成可演示、可评测、可持续修订的产品化链路，支撑 KTClaw 和 TinyClaw 等项目落地。',
        action: '我参与多 Agent 职责拆分、分层记忆和失败回放设计，搭建从错误样例到 Skill 修订再到指标评估的闭环。',
        result: '内部任务错误率从 15% 降到 3%，链路支持 20+ 模型和多渠道入口，并服务于年覆盖百万级设备的产品方向。',
      },
    },
  },
  {
    id: 'ktclaw',
    type: '项目',
    date: '2026.04',
    status: 'EvoMap 黑客松第一',
    title: 'KTClaw · 多 Agent + 分层记忆',
    org: '联想 / EvoMap Hackathon',
    oneLiner: '用多 Agent 协同、四层记忆和多路检索压缩企业任务上下文，让复杂任务更稳、更便宜、更容易复用。',
    metrics: [
      { before: '40k+', after: '2,298', label: '上下文 tokens' },
      { after: '-95%', label: '上下文压缩' },
      { after: '-90%', label: '推理成本' },
    ],
    keywords: ['Multi-Agent', 'Memory', 'RAG-to-Skill'],
    detail: {
      background: '企业内部知识任务常常把 SOP、历史对话、文档和工具调用全部塞进上下文，导致成本高、链路不稳定、失败样例难以复用。',
      role: '核心算法与系统实现',
      approach: [
        '设计主 Agent + 专家 Agent 架构，将任务规划、工具执行、记忆检索和失败修复分层处理。',
        '构建 index、fact、procedure、archive 四层记忆，并通过 metadata、semantic、procedure relation 多路召回控制上下文。',
        '接入飞书、微信、钉钉等入口和 20+ 模型，建立失败回放到 Skill 修订的闭环。',
      ],
      tradeoffs: '多 Agent 提升了复杂任务覆盖，但也会增加调度成本；实现上优先保证上下文隔离和关键链路可观测。',
      star: {
        situation: '黑客松场景要求短时间证明企业 Agent 价值，但原始任务会把 SOP、历史记录和工具日志塞进 40k+ tokens 上下文。',
        task: '我负责设计核心算法链路，让系统既能压缩上下文，又能复用历史流程经验，并支撑现场多入口演示。',
        action: '我实现主 Agent + 专家 Agent 编排，构建 index/fact/procedure/archive 四层记忆，并用多路检索召回最相关事实和流程。',
        result: 'KTClaw 获得 EvoMap 黑客松第一，上下文压到 2,298 tokens，压缩约 95%，推理成本降低约 90%。',
      },
    },
    links: [
      { label: 'KTClaw', url: 'https://landing-page-pddx.vercel.app/' },
      { label: 'EvoMap', url: 'https://hackathon.evomap.ai' },
    ],
  },
  {
    id: 'tinyclaw',
    type: '项目',
    date: '2026.05',
    status: '京东上架',
    title: 'TinyClaw · RAG-to-Skill 自进化 Agent',
    org: '联想 / 端侧项目',
    oneLiner: '把 SOP、Skill 和可执行脚本做成三层程序性记忆，让端侧 Agent 能从轨迹中提炼、召回、修订和复用经验。',
    metrics: [
      { after: '3 层', label: '程序性记忆' },
      { after: '7k-10k', label: '季度预期销量' },
      { after: '闭环', label: '轨迹到 Skill' },
    ],
    keywords: ['端侧 Agent', 'Procedural Memory', 'Self-Evolution'],
    detail: {
      background: '端侧 Agent 面临算力、隐私、延迟和稳定性约束，不能依赖无限长上下文，也不能每次都从零规划。',
      role: '算法与工程实现',
      approach: [
        '设计 SOP、Skill、可执行脚本三层程序性记忆，将抽象流程和具体操作解耦。',
        '实现轨迹记录、经验抽取、相似召回、Skill 修订和复用验证的 RAG-to-Skill 闭环。',
        '围绕上架场景压缩任务边界，优先保证高频任务稳定执行和错误可回放。',
      ],
      tradeoffs: '端侧自进化不能盲目追求开放域能力，必须把可学习范围限制在可验证的任务和流程内。',
      star: {
        situation: '端侧 Agent 要在低延迟、低成本和隐私约束下持续改进，不能依赖云端长上下文和每次从零规划。',
        task: '我负责把 RAG 检索升级成可复用的程序性 Skill 记忆，让端侧系统能从历史轨迹中沉淀稳定流程。',
        action: '我设计 SOP/Skill/可执行脚本三层记忆，打通轨迹记录、经验抽取、相似召回、Skill 修订和复用验证。',
        result: 'TinyClaw 完成京东上架准备，形成端侧自进化 Agent 方案，季度预期销量约 7k-10k 台。',
      },
    },
  },
  {
    id: 'vqa11y-neurips-2026',
    type: '论文',
    date: '2026',
    status: 'NeurIPS 2026 在投 / 一作',
    title: 'VQA11y · Accessibility-Aware VQA',
    org: 'NeurIPS 2026',
    oneLiner: '构建 119K 无障碍视觉问答 benchmark，并提出 A-CoT 与 GoA，让多模态模型按安全证据推理。',
    abstract:
      'VQA11y 聚焦盲人和低视力用户在导航中的安全关键视觉问答。论文从 727K 多模态样本池中构建 100K benchmark 与 119,469 个 QA pair，覆盖 10 类无障碍导航需求，并为每个样本组织 grounded Accessibility-aware Chain-of-Thought。进一步提出 VQA11y-Score、CoT-Q 和 Graph of Accessibility，用证据门控与安全传播评估/提升模型在危险识别、空间判断和保守决策上的可靠性。',
    contribution: [
      '一作主导问题定义、benchmark 构建、A-CoT/GoA 方法设计和论文主线叙事。',
      '设计安全加权评测指标与 19 组模型实验，对比 baseline、SFT+DPO 与结构化推理方案。',
      '推动数据集公开到 Hugging Face，并在简历材料中记录 35k+ 下载与 VQA 数据集排名 #12。',
    ],
    keywords: ['Accessibility', 'VQA', 'A-CoT', 'GoA'],
    metrics: [
      { after: '119K', label: 'QA pairs' },
      { before: '51.6', after: '74.6', label: 'Qwen3-VL-8B' },
      { after: '35k+', label: 'HF Downloads' },
    ],
    images: [
      {
        src: '/paper-figures/vqa11y-figure-1.png',
        type: '示意图',
        caption: 'VQA11y teaser：从普通 VQA 走向证据门控的无障碍安全推理。',
      },
    ],
    links: [{ label: 'Hugging Face Dataset', url: 'https://huggingface.co/datasets/VQA11y/VQA11y' }],
    detail: {
      background: '通用 VQA benchmark 更关注物体识别和图像理解，但 BLV 用户真正关心的是道路是否安全、证据是否充分、模型何时应该保守拒答。',
      role: '一作',
      approach: [
        '从 727K 多模态源池中筛选并配额构建 100K benchmark，组织 119,469 个 grounded QA pair。',
        '设计 A-CoT 标注结构，将区域、mask、OCR 文本和场景 cue 绑定到推理步骤。',
        '提出 Graph of Accessibility，通过 QA 类型图、证据门控和安全单调传播约束推理。',
        '用 VQA11y-Score 和 CoT-Q 评估正确性、幻觉、faithfulness 和安全关键错误。',
      ],
      tradeoffs: '无障碍问答不能只优化平均准确率，必须对危险漏检和过度自信加更高权重。',
      star: {
        situation: '现有 VLM 在通用视觉问答上表现不错，但在 BLV 导航场景中容易漏掉台阶、湿滑路面、倒计时红绿灯等安全关键线索。',
        task: '我需要构建一个能评估真实无障碍推理能力的 benchmark，并提出让模型围绕证据进行保守决策的方法。',
        action: '我主导构建 VQA11y 数据集，设计 A-CoT 标注、VQA11y-Score 与 GoA 结构化推理，并完成多模型评测。',
        result: 'Qwen3-VL-8B 在该设置下从 51.6 提升到 74.6，数据集获得 35k+ 下载，成为简历中最能体现无障碍多模态研究主线的工作。',
      },
    },
  },
  {
    id: 'omni-aware-rag-emnlp-2026',
    type: '论文',
    date: '2026',
    status: 'EMNLP 2026 在投 / 一作',
    title: 'Omni-Aware RAG · Multi-Format Evidence Control',
    org: 'EMNLP 2026',
    oneLiner: '训练无关地控制文本、图像、表格和视频证据的使用，把 MRAG 从“按模态打补丁”改成“按 latent evidence 状态调度”。',
    abstract:
      'Omni-Aware RAG 针对多模态 RAG 在证据顺序、位置偏置和模态专用启发式上的脆弱性，提出训练无关的 post-retrieval 控制框架。方法在统一 evidence-token span 上结合 grounding entropy 与 predictive entropy，控制检索、模态路由和证据强调；同时提出 Evidence Attention Bias，在不重复、不重排输入 token 的前提下调整注意力 logit，提高模型利用证据的稳定性。',
    contribution: [
      '一作主导 MRAG 控制问题抽象，将多模态适配从表层模态规则转成 latent evidence-token 控制。',
      '设计 Evidence Attention Bias 与 order-sensitivity diagnostic，验证同一证据随机排列下的稳定性收益。',
      '完成 OK-VQA、MMQA Table、Video-MME Short、WebQA 等多格式实验组织与论文写作。',
    ],
    keywords: ['MRAG', 'Evidence Attention Bias', 'Uncertainty', 'Training-Free'],
    metrics: [
      { before: '64.20', after: '67.88', label: 'OK-VQA' },
      { before: '3.53', after: '1.07', label: 'Order σ' },
      { after: '0.098', label: 'Position Bias' },
    ],
    images: [
      {
        src: '/paper-figures/omni-aware-rag-pipeline.png',
        type: '框架图',
        caption: 'Omni-Aware RAG：从模态专用规则转向统一 latent evidence-token 控制。',
      },
    ],
    detail: {
      background: 'MRAG 系统需要同时处理文本、图像、表格和视频帧，常见方法用模态专用启发式处理不确定性，导致新增格式时要重新设计控制器。',
      role: '一作',
      approach: [
        '把证据统一到 latent evidence-token span，在 prefill pass 中估计 grounding entropy 与 predictive entropy。',
        '根据注意力质量和不确定性进行 modality routing 与 top-k 证据控制。',
        '提出 Evidence Attention Bias，直接干预 attention logit，减少重排和重复 chunk 带来的位置偏置。',
      ],
      tradeoffs: '方法刻意限定在 post-retrieval 控制层，不声称解决任意模态检索，而是补足“证据怎么被模型使用”的薄弱环节。',
      star: {
        situation: '同一批检索证据只要顺序变化，多模态 RAG 的答案就可能明显波动，说明问题不只在检索质量，也在证据使用控制。',
        task: '我需要设计一个不依赖重新训练、可跨文本/图像/表格/视频格式复用的证据控制方法。',
        action: '我提出 latent evidence-token 控制视角，结合双熵不确定性和 Evidence Attention Bias 调整模型对证据的关注。',
        result: '在 Qwen3-VL-8B 上 OK-VQA 从 64.20 提升到 67.88，证据顺序扰动标准差从 3.53 降到 1.07。',
      },
    },
  },
  {
    id: 'morpheus-emnlp-2026',
    type: '论文',
    date: '2026',
    status: 'EMNLP 2026 在投 / 一作',
    title: 'MORPHEUS · Retrieval-State Forgetting',
    org: 'EMNLP 2026',
    oneLiner: '为长期 LLM Agent 设计 wake-sleep 记忆机制：旧记忆不直接删除，而是按当前有效性 KEEP / COMPRESS / REPEL。',
    abstract:
      'MORPHEUS 研究长期 Agent 记忆中的“当前是否仍有效”问题。传统记忆系统关注存储和召回效率，却很少区分历史有效和当前有效。论文提出 wake-sleep 架构：wake 阶段在线编码经验并记录 utility/validity 信号，sleep 阶段进行局部冲突修复和全局对比巩固，通过 KEEP、COMPRESS、REPEL 三路路由抑制 stale memory，同时保留历史审计能力。',
    contribution: [
      '一作主导 retrieval-state forgetting 问题定义，把选择性遗忘从删除问题重构为查询条件下的路由问题。',
      '设计 wake-sleep、局部 repair、全局 contrastive consolidation 和三路 memory gate。',
      '组织 ConflictStream 与 MemoryAgentBench 实验，分析 stale retrieval、update accuracy、over-forgetting 和 frequency trap。',
    ],
    keywords: ['Agent Memory', 'Forgetting', 'Contrastive Sleep', 'Retrieval Routing'],
    metrics: [
      { after: '3.17%', label: 'Stale Retrieval' },
      { after: '88.64%', label: 'Update Accuracy' },
      { after: '3.52%', label: 'Over-forgetting' },
    ],
    images: [
      {
        src: '/paper-figures/morpheus-wake-sleep.png',
        type: '架构图',
        caption: 'MORPHEUS：wake 编码经验，sleep 修复冲突并分离 current-valid 与 stale memories。',
      },
    ],
    detail: {
      background: '长期 Agent 会积累用户偏好、事实和任务状态；旧记忆对历史查询可能正确，但对当前状态查询会造成 stale retrieval。',
      role: '一作',
      approach: [
        '将记忆有效性拆成 retrieval utility 与 present-state validity，避免用访问频率替代当前有效性。',
        '设计 wake-light sleep-deep sleep 流程，在线获取、离线修复、全局对比巩固。',
        '用 KEEP / COMPRESS / REPEL gate 将记忆分流到 active retrieval、压缩不确定区和可审计 archive。',
      ],
      tradeoffs: 'MORPHEUS 不把遗忘等同于删除，而是牺牲一点在线更新延迟，换取更稳定的长期记忆几何结构。',
      star: {
        situation: 'LLM Agent 的长期记忆会随时间过期，旧事实在历史查询中仍然有价值，但在当前查询中可能污染答案。',
        task: '我需要让系统区分“值得保存”和“当前该不该被召回”，并避免过度遗忘造成历史信息丢失。',
        action: '我提出 wake-sleep 检索状态遗忘框架，用局部冲突修复和全局对比巩固驱动 KEEP/COMPRESS/REPEL 路由。',
        result: '在 ConflictStream 上 stale retrieval 降到 3.17%，update accuracy 达 88.64%，over-forgetting 控制在 3.52%。',
      },
    },
  },
  {
    id: 'accessibility-alignment',
    type: '论文',
    date: '2026',
    status: 'ICML 2026 Spotlight',
    title: 'Position · Assistive Agents Need Accessibility Alignment',
    org: 'ICML 2026 / CCF-A',
    oneLiner: '提出 accessibility alignment：辅助 Agent 不只是多模态能力问题，而是目标、交互、风险和评测都要对齐 BLV 用户。',
    abstract:
      '这篇 position paper 基于 417 篇相关工作和 778 个真实辅助任务实例，指出当前 Agentic AI 往往默认以视力正常用户为中心，导致在盲人和低视力用户场景中出现不可验证输出、错误代价不对称、认知负担过高和隐私风险。论文将无障碍能力上升为 alignment 问题，提出贯穿用户研究、系统设计和部署后迭代的 accessibility-aligned lifecycle。',
    contribution: [
      '参与梳理 assistive agents 的失败模式，将“多模态能力不足”进一步拆成目标、证据、交互和风险对齐不足。',
      '围绕 778 个任务实例抽象任务中心 taxonomy，帮助论文形成可被评审快速抓住的 position 论点。',
    ],
    keywords: ['Accessibility Alignment', 'Assistive Agents', 'BLV', 'Position Paper'],
    metrics: [
      { after: 'Spotlight', label: 'ICML 2026' },
      { after: '778', label: '任务实例' },
      { after: '417', label: '相关工作' },
    ],
    images: [
      {
        src: '/paper-figures/accessibility-alignment-taxonomy.png',
        type: '示意图',
        caption: '基于 BLV 任务的 accessibility alignment taxonomy。',
      },
    ],
    detail: {
      background: '辅助 Agent 的失败不只是 UI 小问题，而是模型如何请求证据、表达不确定性、校准自主性和支持错误恢复的系统性问题。',
      role: '研究参与者',
      approach: [
        '分析 BVI/BLV 用户场景中的非可验证输出、安全关键错误、认知负担和隐私风险。',
        '把 assistive agent 设计拆成用户研究、系统设计、部署后迭代三个生命周期阶段。',
        '用任务 taxonomy 强调移动安全、阅读文本、目标查询和物体识别等核心辅助场景。',
      ],
      tradeoffs: 'Position paper 的关键不是堆新模型结果，而是把“为什么现有评测不够”说清楚并给出设计框架。',
      star: {
        situation: 'Agentic AI 常被宣传为通用助手，但在盲人和低视力用户场景中，错误往往难以验证且后果不对称。',
        task: '研究需要给出一个比“提升多模态能力”更准确的框架，解释辅助 Agent 为什么需要专门的对齐目标。',
        action: '我们系统梳理文献和真实任务实例，抽象 accessibility alignment 概念和生命周期设计 pipeline。',
        result: '论文获得 ICML 2026 Spotlight，成为作品集中连接无障碍、多模态和 Agent 对齐三条主线的代表工作。',
      },
    },
  },
  {
    id: 'navguide-iros-2026',
    type: '论文',
    date: '2026',
    status: 'IROS 2026 在投',
    title: 'NavGuide · Edge-Based Assistive Navigation',
    org: 'IROS 2026',
    oneLiner: '用边缘端可穿戴导航系统替代云端长描述，95ms 内输出简洁、可行动、低认知负担的安全提示。',
    abstract:
      'NavGuide 面向视觉障碍用户的独立导航，解决云端 MLLM 延迟抖动、描述冗长和交互负担高的问题。系统在 Jetson Orin Nano 上运行 YOLOE 与任务特定模型，通过 factorized importance scoring、stream optimization 和 IMU-aware scheduling 将密集感知结果过滤成结构化语音指导。实验显示平均端到端延迟约 95ms，冗余播报减少 82% 以上，并在用户研究中降低认知负担。',
    contribution: [
      '参与将辅助导航问题转化为“低延迟 + 信息优先级 + 低交互负担”的边缘端系统设计。',
      '围绕任务模式、场景上下文和运动稳定性整理信息优先级策略，让模型输出更适合真实行走场景。',
    ],
    keywords: ['Edge AI', 'Assistive Navigation', 'YOLOE', 'TensorRT'],
    metrics: [
      { after: '95ms', label: '平均延迟' },
      { after: '-82%', label: '冗余播报' },
      { after: '16', label: '用户研究' },
    ],
    images: [
      {
        src: '/paper-figures/navguide-edge-comparison.png',
        type: '示意图',
        caption: 'NavGuide 对比云端 MLLM：本地运行、低延迟、输出可行动提示。',
      },
    ],
    detail: {
      background: '辅助导航场景对延迟和认知负担极其敏感，云端 MLLM 的秒级抖动和自由文本描述会让危险提示过期或过载。',
      role: '研究作者',
      approach: [
        '在 Jetson Orin Nano 上部署 TensorRT 优化的 YOLOE 和任务特定感知模型。',
        '设计 Target Search、Path Navigation、Scene Exploration 三种模式，按任务激活不同推理引擎。',
        '通过 task/context/stability-aware scoring 和 IMU-aware scheduling 控制播报频率与内容。',
      ],
      tradeoffs: '系统选择轻量、可解释的信息优先级策略，而不是完全依赖端到端大模型，以换取确定性延迟和可控输出。',
      star: {
        situation: '视觉障碍用户行走时需要即时、简洁、可靠的提示，而云端多模态模型容易延迟波动并输出过长描述。',
        task: '研究目标是构建一个端侧可穿戴导航系统，在低算力约束下仍能给出安全关键提示。',
        action: '我们把密集视觉检测结果映射为任务感知的重要性分数，并结合 TensorRT 和 IMU 调度稳定实时输出。',
        result: 'NavGuide 达到约 95ms 平均延迟，冗余播报减少 82% 以上，在视觉障碍和蒙眼志愿者研究中降低认知负担。',
      },
    },
  },
  {
    id: 'immune-skillnet-emnlp-2026',
    type: '论文',
    date: '2026',
    status: 'ACL/EMNLP 在投',
    title: 'Immune-SkillNet · Agent Skill Library Governance',
    org: 'ACL / EMNLP 方向稿件',
    oneLiner: '从“生成 Skill”推进到“维护 Skill”：用 matched deletion utility 判断技能该保留、修复、隔离还是删除。',
    abstract:
      'Immune-SkillNet 关注自进化 Agent 的技能库维护问题。技能一旦进入库，就会成为长期程序性记忆；错误、过时或有害技能会在后续任务中反复触发。论文提出 matched leave-one-out deletion utility，在共享随机种子、检索状态和 verifier 配置下比较有无候选技能的执行结果，并结合 Skill-PRM admission、选择性触发和 bounded repair，降低负迁移、长期漂移和有害技能保留风险。',
    contribution: [
      '参与将技能库维护从 admission scoring 拓展到 post-admission deletion evidence，强调“什么时候应该移除或修复”。',
      '梳理 Skill-PRM、MDU-A 和 bounded repair 的治理闭环，并用三轴指标展示负迁移、漂移恢复和 harm containment。',
    ],
    keywords: ['Agent Skills', 'Skill-PRM', 'Deletion Utility', 'Bounded Repair'],
    metrics: [
      { after: '-86%', label: '负迁移任务' },
      { after: '-73%', label: '长期漂移' },
      { after: '1.18x', label: '归因成本' },
    ],
    images: [
      {
        src: '/paper-figures/immune-skillnet-lifecycle.png',
        type: '框架图',
        caption: 'Immune-SkillNet：从生成、准入、运行时诊断到修复/隔离的技能库治理闭环。',
      },
    ],
    detail: {
      background: 'Agent 技能库会不断自我扩张，但 append-only 的 Skill 记忆可能积累负迁移、错误逻辑和有害行为。',
      role: '研究作者',
      approach: [
        '提出四维 Skill-PRM admission gate，评估 grounding、executability、generalizability 和 policy safety。',
        '用 matched leave-one-out rollout 估计删除候选技能后的边际效用，避免只看表面贡献。',
        '设计 bounded repair-or-quarantine 策略，在 K 轮内修复局部错误，否则隔离阻止未来检索。',
      ],
      tradeoffs: '完整 Shapley 归因成本高，论文选择按风险触发 matched deletion probe，让治理成本保持在约 1.18x vanilla inference。',
      star: {
        situation: '自进化 Agent 可以从轨迹生成技能，但技能进入库后会长期影响行为，错误技能可能造成负迁移或安全风险。',
        task: '需要一个轻量治理机制，判断技能是否应保留、修复、隔离或删除，而不是只在准入时打分。',
        action: '我们设计 Skill-PRM、matched deletion utility 和 bounded repair 闭环，用 verifier-supported rollout 给出删除证据。',
        result: '方法减少 86% 负迁移任务，长期漂移放缓 73%，同时将选择性归因成本控制在 1.18x 左右。',
      },
    },
  },
  {
    id: 'agentguide',
    type: '开源',
    date: '2026',
    status: '5k+ Stars',
    title: 'AgentGuide · Agent 面试与知识图谱',
    org: 'GitHub 开源项目',
    oneLiner: '用 OpenClaw 自动化整理 30k+ Agent 面试经验，抽取高频知识点并组织成原理层、工程层、面试层知识图谱。',
    metrics: [
      { after: '5k+', label: 'GitHub Stars' },
      { after: '30k+', label: '经验样本' },
      { after: 'Top 20', label: 'Multi-Agent Topic' },
    ],
    keywords: ['Open Source', 'Knowledge Graph', 'Agent Interview'],
    detail: {
      background: 'Agent 方向资料增长很快，但学习路径、论文脉络、工程范式和面试问题容易碎片化。',
      role: '核心维护者',
      approach: [
        '基于 OpenClaw 构建爬取、清洗、合并流水线，整理 30k+ 面试经验样本。',
        '用 LLM 抽取高频知识点，将内容组织成原理层、工程层、面试层知识图谱。',
        '持续维护 Agent 论文、工具、项目和实践案例索引，让读者能快速建立全局视角。',
      ],
      tradeoffs: '开源项目需要在覆盖面和维护成本之间取舍，优先保证结构清晰、链接有效和持续更新。',
      star: {
        situation: 'Agent 方向论文、工具和面试经验增长很快，新入门者很难区分核心原理、工程实践和面试高频问题。',
        task: '我的目标是把分散资料整理成可检索、可持续维护的知识图谱，并让开源项目对求职和学习都真正有用。',
        action: '我基于 OpenClaw 搭建爬取/清洗/合并流水线，用 LLM 从 30k+ 面试经验中抽取高频知识点并分层组织。',
        result: 'AgentGuide 获得 5k+ GitHub Stars，进入 Multi-Agent topic Top 20，成为简历中体现开源影响力和工程自动化能力的项目。',
      },
    },
    links: [{ label: 'GitHub', url: 'https://github.com/adongwanai/AgentGuide' }],
  },
  {
    id: 'bit-ai-master',
    type: '教育',
    date: '2026.09',
    title: '北京理工大学 · 人工智能硕士',
    org: '北京理工大学',
    oneLiner: '推免进入北京理工大学 AI 硕士阶段，继续深耕 Agent、RAG 与可访问 AI。',
    status: '推免',
    keywords: ['Agent', 'RAG', 'Accessible AI'],
    detail: {
      background: '硕士阶段将进一步聚焦检索增强推理、Agentic AI 与无障碍智能系统的交叉方向。',
      role: '硕士研究生',
      approach: [
        '延续已有论文、实习和开源项目积累。',
        '强化研究问题定义、系统构建和真实用户场景验证。',
      ],
    },
  },
];
