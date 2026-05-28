/*
 * Footer — Enhanced Visual
 * Design: Editorial Kinetic
 * - Refined skills grid with accent-colored category headers
 * - Elegant honor badges with hover micro-interactions
 * - Contact section with clear visual hierarchy
 * - Generous whitespace throughout
 */

import { motion } from 'framer-motion';
import { Github, Mail, FileText, Linkedin } from 'lucide-react';

const skills = [
  { category: '模型 & 框架', items: ['PyTorch', 'Transformers', 'LangChain', 'LlamaIndex', 'vLLM'] },
  { category: 'Agent 架构', items: ['Multi-Agent 编排', '分层记忆', 'RAG Pipeline', 'Tool Use', 'ReAct'] },
  { category: '强化学习', items: ['GRPO', 'PPO', 'RLHF', '可验证奖励', 'Reward Shaping'] },
  { category: '工程能力', items: ['Python', 'TypeScript', 'Docker', 'Git', 'OR-Tools'] },
];

const honors = [
  { text: '联想黑客松冠军', emoji: '🥇' },
  { text: 'ICML 2026 Spotlight', emoji: '🌟' },
  { text: '推免保送北京理工大学', emoji: '🎓' },
  { text: 'AgentGuide 5k+ Stars', emoji: '⭐' },
  { text: 'ICONIP 2024 发表', emoji: '📄' },
  { text: 'NeurIPS / EMNLP 在投', emoji: '📝' },
];

export default function Footer() {
  return (
    <footer className="relative py-28 md:py-36 bg-white">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="container max-w-5xl mx-auto h-full bg-gradient-to-r from-transparent via-[#E9E7E2] to-transparent" />
      </div>

      <div className="container max-w-5xl mx-auto">
        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-[2px] rounded-full bg-[#2D5BFF]/40" />
            <h2
              className="text-2xl md:text-[1.75rem] font-semibold text-[#1A1A1E] tracking-[-0.01em]"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              技术栈
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-24">
            {skills.map((group) => (
              <div key={group.category}>
                <h4 className="text-[11px] uppercase tracking-[0.14em] text-[#2D5BFF] mb-4 font-semibold">
                  {group.category}
                </h4>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-[13px] text-[#1A1A1E]/60 leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Honors */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-24"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-[2px] rounded-full bg-[#2D5BFF]/40" />
            <h2
              className="text-2xl md:text-[1.75rem] font-semibold text-[#1A1A1E] tracking-[-0.01em]"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              荣誉与成就
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {honors.map((h) => (
              <motion.span
                key={h.text}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] bg-[#F8F7F4] border border-[#E9E7E2]/60 text-[#1A1A1E]/65 font-medium hover:border-[#2D5BFF]/20 hover:bg-[#2D5BFF]/[0.02] transition-all duration-200"
                whileHover={{ y: -1 }}
              >
                <span>{h.emoji}</span>
                {h.text}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-12"
        >
          {/* Separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#E9E7E2] to-transparent mb-12" />

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h3
                className="text-xl md:text-2xl font-semibold text-[#1A1A1E] tracking-[-0.01em]"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                联系我
              </h3>
              <p className="text-[14px] text-[#76767E] mt-2.5 leading-[1.7] max-w-sm">
                如果您对我的研究方向或项目经历感兴趣，欢迎通过以下方式联系我。
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#F8F7F4] border border-[#E9E7E2]/60 hover:border-[#2D5BFF]/20 hover:bg-[#2D5BFF]/[0.03] transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-[18px] h-[18px] text-[#1A1A1E]/60" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="p-3 rounded-xl bg-[#F8F7F4] border border-[#E9E7E2]/60 hover:border-[#2D5BFF]/20 hover:bg-[#2D5BFF]/[0.03] transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-[18px] h-[18px] text-[#1A1A1E]/60" />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl bg-[#F8F7F4] border border-[#E9E7E2]/60 hover:border-[#2D5BFF]/20 hover:bg-[#2D5BFF]/[0.03] transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-[18px] h-[18px] text-[#1A1A1E]/60" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2D5BFF] text-white text-[13px] font-medium hover:bg-[#2449E0] transition-all duration-200 shadow-lg shadow-[#2D5BFF]/15 hover:shadow-xl hover:shadow-[#2D5BFF]/20 hover:-translate-y-0.5 ml-1"
              >
                <FileText className="w-4 h-4" />
                下载简历 PDF
              </a>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="mt-20 pt-8">
          <div className="h-px bg-gradient-to-r from-transparent via-[#E9E7E2]/60 to-transparent mb-8" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-[11px] text-[#B5B5BD] tracking-wide">
              © 2026 一位男子 · Built with care for accessibility
            </p>
            <p className="text-[11px] text-[#B5B5BD] tracking-wide">
              本站践行 WCAG AA 无障碍标准 — 因为这正是我的研究方向
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
