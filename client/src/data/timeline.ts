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
  detail?: {
    background?: string;
    role?: string;
    approach?: string[];
    tradeoffs?: string;
    retrospective?: string;
  };
  metrics?: { before?: string; after: string; label: string }[];
  images?: { src: string; caption?: string; type?: '架构图' | '截图' | 'demo' }[];
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
      { after: '3.8', label: 'GPA' },
      { after: '7%', label: '专业排名' },
    ],
    detail: {
      background: '本科阶段持续围绕机器学习、深度学习、自然语言处理与系统工程能力建立基础。',
      role: '学生 / 研究助理',
      approach: [
        '系统补齐 AI 核心课程与工程实践能力。',
        '在项目中把模型、数据、评测和前端展示串成完整闭环。',
        '通过论文阅读和复现实验逐步形成研究问题意识。',
      ],
      retrospective: '后续内容会继续补充课程、科研和项目的关键证据。',
    },
  },
  {
    id: 'mur-iconip-2024',
    type: '论文',
    date: '2024',
    status: '已发表',
    title: 'MUR · ICONIP 2024',
    org: 'ICONIP 2024 / CCF-C',
    oneLiner: '围绕多模态理解与鲁棒推理展开研究，并完成会议论文发表。',
    detail: {
      background: '面向复杂场景下的多模态理解任务，研究模型在噪声和分布变化下的表现。',
      role: '论文作者',
      approach: [
        '梳理任务定义、数据处理和评测指标。',
        '设计对比实验验证方法有效性。',
        '沉淀论文写作、投稿和 rebuttal 经验。',
      ],
      tradeoffs: '在模型复杂度、可解释性和实验成本之间做平衡，优先保证结论可复现。',
    },
  },
  {
    id: 'goafar-agentic-planning',
    type: '实习经历',
    date: '2025.01-06',
    title: 'GoAfar · Agentic 路线规划',
    org: 'GoAfar',
    oneLiner: '将可验证奖励引入路线规划 Agent，让规划结果更可评估、更可优化。',
    metrics: [
      { before: '40k', after: '2,298', label: 'tokens' },
      { after: '-95%', label: '上下文压缩' },
    ],
    detail: {
      background: '旅行路线规划需要同时处理用户偏好、地理约束、时间窗口和预算限制。',
      role: 'Agent 算法实习生',
      approach: [
        '把路线质量拆解成可验证奖励信号，降低纯主观评估带来的不稳定。',
        '设计压缩后的上下文表达，保留关键约束并减少模型调用成本。',
        '结合工具调用与规划反馈，让 Agent 能迭代修正路线。',
      ],
      tradeoffs: '奖励函数越细，调参成本越高；最终优先保证可解释、可回放、可持续迭代。',
    },
  },
  {
    id: 'lenovo-agent-algorithm',
    type: '实习经历',
    date: '2026.03-05',
    title: '联想开天 · Agent 算法',
    org: '联想开天',
    oneLiner: '参与 Agent 算法与产品化探索，把多 Agent 编排落到可演示、可交付的系统里。',
    detail: {
      background: '企业级 Agent 需要在准确性、延迟、工具可靠性和可维护性之间取得平衡。',
      role: 'Agent 算法实习生',
      approach: [
        '围绕任务拆解、工具调用和记忆管理设计 Agent 流程。',
        '结合评测样例快速验证策略是否真正改善端到端结果。',
        '将研究型方案收敛为工程可落地的模块。',
      ],
      retrospective: '最重要的收获是把“能跑”推进到“能稳定复现和解释”。',
    },
  },
  {
    id: 'ktclaw',
    type: '项目',
    date: '2026.04',
    status: '黑客松冠军',
    title: 'KTClaw · 多 Agent + 分层记忆',
    org: '联想黑客松',
    oneLiner: '用多 Agent 协同和分层记忆机制提升复杂任务处理能力，并获得黑客松冠军。',
    metrics: [
      { after: '🥇', label: 'Hackathon' },
      { after: 'Multi', label: 'Agent' },
    ],
    detail: {
      background: '黑客松场景需要在极短周期内构建一个完整可演示的 Agent 系统。',
      role: '核心算法与系统实现',
      approach: [
        '拆分任务规划、执行、反思与记忆检索职责。',
        '设计分层记忆结构，区分短期上下文和长期知识。',
        '将核心链路封装成可演示流程，便于现场验证。',
      ],
      tradeoffs: '多 Agent 带来可扩展性，也增加协调成本；实现上优先保持链路清晰可控。',
    },
  },
  {
    id: 'tinyclaw',
    type: '项目',
    date: '2026.05',
    status: '已上架',
    title: 'TinyClaw · 端侧自进化 Agent',
    org: '京东上架项目',
    oneLiner: '探索端侧 Agent 的自进化能力，在资源受限环境里保持可用体验。',
    detail: {
      background: '端侧场景对模型大小、响应速度、隐私和稳定性都提出了更高要求。',
      role: '算法与工程实现',
      approach: [
        '围绕端侧约束裁剪 Agent 工作流。',
        '设计轻量化反馈与自我更新机制。',
        '关注产品上架所需的稳定性与用户体验。',
      ],
      tradeoffs: '端侧能力和云端大模型能力存在天然差距，需要把任务边界定义清楚。',
    },
  },
  {
    id: 'vqa11y-neurips-2026',
    type: '论文',
    date: '2026',
    status: '在投',
    title: 'VQA11y · NeurIPS 2026 一作',
    oneLiner: '围绕视觉问答中的无障碍场景构建研究问题，关注可访问性与模型对齐。',
    draft: true,
    detail: {
      background: '无障碍视觉问答需要模型理解真实用户需求，而不仅是完成标准 benchmark。',
      role: '一作',
      approach: [
        '构建面向无障碍需求的任务定义和评测方式。',
        '分析多模态模型在真实辅助场景中的失败模式。',
      ],
    },
  },
  {
    id: 'omni-aware-rag-emnlp-2026',
    type: '论文',
    date: '2026',
    status: '在投',
    title: 'Omni-Aware RAG · EMNLP 2026 一作',
    oneLiner: '研究面向多模态、多来源知识的检索增强生成，让 RAG 更懂上下文边界。',
    draft: true,
    detail: {
      role: '一作',
      approach: [
        '探索多来源信息的检索、融合与置信度管理。',
        '关注复杂查询下的证据链组织与可解释输出。',
      ],
    },
  },
  {
    id: 'morpheus-emnlp-2026',
    type: '论文',
    date: '2026',
    status: '在投',
    title: 'MORPHEUS · EMNLP 2026 一作',
    oneLiner: '继续拓展 Agent / RAG 相关研究，沉淀可复现实验与论文资产。',
    draft: true,
    detail: {
      role: '一作',
      approach: ['后续将补充问题定义、方法细节、实验结果和项目链接。'],
    },
  },
  {
    id: 'accessibility-alignment',
    type: '论文',
    date: '2026',
    status: 'Spotlight',
    title: 'Accessibility Alignment · ICML 2026',
    oneLiner: '关注 AI 系统与无障碍用户需求之间的对齐问题，强调公平、可靠和可解释。',
    detail: {
      background: '无障碍场景要求模型理解用户真实限制和环境约束。',
      role: '研究参与者',
      approach: [
        '从任务、数据和评测三个层面分析对齐缺口。',
        '围绕辅助技术场景设计更贴近真实需求的评估方式。',
      ],
    },
  },
  {
    id: 'agentguide',
    type: '开源',
    date: '2026',
    status: '5k+ Stars',
    title: 'AgentGuide · Agent 知识图谱',
    org: 'GitHub 开源项目',
    oneLiner: '整理 Agent 方向知识图谱与实践路径，帮助更多开发者系统进入这个领域。',
    metrics: [
      { after: '5k+', label: 'GitHub Stars' },
      { after: 'Agent', label: 'Knowledge Graph' },
    ],
    detail: {
      background: 'Agent 方向资料增长很快，但学习路径、论文脉络和工程范式容易碎片化。',
      role: '项目维护者',
      approach: [
        '按概念、论文、工具和实践案例组织知识图谱。',
        '持续维护方向索引，让新读者能快速建立全局视角。',
      ],
      tradeoffs: '开源资料需要在全面性和维护成本之间取舍，优先保证结构清晰和持续更新。',
    },
    links: [{ label: 'GitHub', url: 'https://github.com/yiweinanzi' }],
  },
  {
    id: 'bit-ai-master',
    type: '教育',
    date: '2026.09',
    title: '北京理工大学 · 人工智能硕士',
    org: '北京理工大学',
    oneLiner: '推免进入北京理工大学 AI 硕士阶段，继续深耕 Agent、RAG 与可访问 AI。',
    status: '推免',
    detail: {
      background: '硕士阶段将进一步聚焦 Agentic AI 与无障碍智能系统的交叉方向。',
      role: '硕士研究生',
      approach: [
        '延续已有论文和开源项目积累。',
        '强化研究问题定义、系统构建和真实用户场景验证。',
      ],
    },
  },
];
