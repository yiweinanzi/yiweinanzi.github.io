/*
 * Hero Section — Master-level Design
 * Design: Editorial Kinetic — Elevated
 * 
 * - Cinematic entrance with staggered reveals
 * - Layered depth: background image + gradient + radial glow + noise
 * - Asymmetric editorial layout with strong typographic hierarchy
 * - Stats cards with hover micro-interactions and inner glow
 * - Refined spacing system for maximum breathing room
 */

import { motion } from 'framer-motion';
import { ChevronDown, Github, FileText, ArrowDown } from 'lucide-react';

const stats = [
  { value: '5k+', label: 'GitHub Stars', desc: 'AgentGuide 开源项目' },
  { value: '119K', label: 'QA Pairs', desc: 'VQA11y Benchmark' },
  { value: 'Spotlight', label: 'ICML 2026', desc: '顶级会议认可' },
  { value: '-95%', label: 'Token 压缩', desc: '40k → 2,298 tokens' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Base image */}
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663703252998/7xfRn4o8cEaheF7AuTTKCr/hero-bg-QhPPJFU5jADvgCwHta8aim.webp"
          alt=""
          className="w-full h-full object-cover opacity-[0.15]"
          aria-hidden="true"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(248,247,244,0.97) 0%, rgba(248,247,244,0.8) 50%, rgba(248,247,244,0.93) 100%)' }} />
        {/* Radial glow accents */}
        <div className="absolute top-[20%] right-[15%] w-[700px] h-[700px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #2D5BFF, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #2D5BFF, transparent 70%)' }} />
      </div>

      <div className="container relative z-10 py-28 md:py-36 lg:py-40">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left: Editorial title block */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Status pill */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-[#E9E7E2]/70 backdrop-blur-sm mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="relative flex h-[7px] w-[7px]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-60" />
                <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-[#10B981]" />
              </span>
              <span className="text-[11px] text-[#76767E] font-semibold tracking-[0.08em] uppercase">
                Interview Portfolio · 2026
              </span>
            </motion.div>

            {/* Name — editorial display */}
            <motion.h1
              className="text-[3.8rem] md:text-[5.5rem] lg:text-[6.5rem] font-semibold text-[#1A1A1E] leading-[0.95] tracking-[-0.035em]"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            >
              一位男子
            </motion.h1>

            {/* Subtitle — refined spacing */}
            <motion.p
              className="mt-6 text-[1.35rem] md:text-[1.6rem] text-[#1A1A1E]/45 leading-relaxed font-light tracking-[-0.005em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              检索增强推理 <span className="text-[#2D5BFF] font-medium">×</span> Agent 自主决策
            </motion.p>

            {/* Description */}
            <motion.p
              className="mt-5 text-[14px] text-[#76767E] max-w-[420px] leading-[1.9]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              湖南大学 AI 本科 → 北京理工大学 AI 硕士（推免）<br />
              专注多 Agent 架构、分层记忆系统与可验证奖励强化学习
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="mt-10 flex items-center gap-3.5 flex-wrap"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <a
                href="#timeline"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#2D5BFF] text-white text-[13px] font-semibold hover:bg-[#2449E0] transition-all duration-250 shadow-[0_8px_32px_rgba(45,91,255,0.25)] hover:shadow-[0_12px_40px_rgba(45,91,255,0.3)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#2D5BFF]/40 focus:ring-offset-2"
              >
                探索时间轴
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-200" />
              </a>
              <a
                href="https://github.com/adongwanai/AgentGuide"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/90 text-[#1A1A1E] text-[13px] font-medium border border-[#E9E7E2] hover:border-[#2D5BFF]/25 hover:text-[#2D5BFF] transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2D5BFF]/30"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="#timeline"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/90 text-[#1A1A1E] text-[13px] font-medium border border-[#E9E7E2] hover:border-[#2D5BFF]/25 hover:text-[#2D5BFF] transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2D5BFF]/30"
              >
                <FileText className="w-4 h-4" />
                成果
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Stats grid — elevated cards */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="relative group bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-[#E9E7E2]/40 overflow-hidden"
                  style={{
                    boxShadow: '0 4px 24px rgba(20,20,30,.03), 0 1px 3px rgba(20,20,30,.02)',
                  }}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.12, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{
                    y: -5,
                    boxShadow: '0 20px 60px rgba(20,20,30,.08), 0 4px 12px rgba(20,20,30,.04)',
                  }}
                >
                  {/* Hover top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2D5BFF] to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-400" />
                  {/* Corner glow */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#2D5BFF]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-xl" />

                  <p
                    className="text-[1.6rem] md:text-[1.8rem] font-bold text-[#2D5BFF] tracking-tight leading-none"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-[#1A1A1E]/70">{stat.label}</p>
                  <p className="text-[11px] text-[#9A9AA0] mt-1 leading-relaxed">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — minimal */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-[9px] text-[#9A9AA0] tracking-[0.25em] uppercase font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-[#2D5BFF]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
