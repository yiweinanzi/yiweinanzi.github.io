/*
 * Timeline Component — Master-level Design
 * Design: Editorial Kinetic — Elevated
 * 
 * - Refined section header with editorial decorative elements
 * - Filter chips with smooth active state transitions
 * - Central line with multi-layered glow effect
 * - Keyboard accessible filter buttons
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { timelineNodes, nodeTypeConfig, type TimelineNode, type NodeType } from '@/data/timeline';
import TimelineNodeCard from './TimelineNodeCard';
import DetailPanel from './DetailPanel';

const filterOrder: NodeType[] = ['教育', '实习经历', '项目', '论文', '开源', '荣誉'];

export const timelineFilterTypes: NodeType[] = filterOrder.filter((type) =>
  timelineNodes.some((node) => node.type === type),
);

export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState<NodeType | null>(null);
  const [selectedNode, setSelectedNode] = useState<TimelineNode | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 20%'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const filteredNodes = activeFilter
    ? timelineNodes.filter((n) => n.type === activeFilter)
    : timelineNodes;

  const handleSelect = (node: TimelineNode, rect: DOMRect) => {
    setOriginRect(rect);
    setSelectedNode(node);
  };

  return (
    <section id="timeline" className="relative py-28 md:py-40">
      {/* Section heading — editorial style */}
      <motion.div
        className="container max-w-5xl mx-auto mb-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Decorative element */}
        <div className="flex justify-center mb-7">
          <div className="flex items-center gap-2">
            <div className="w-6 h-[1.5px] rounded-full bg-[#2D5BFF]/30" />
            <div className="w-2 h-2 rounded-full bg-[#2D5BFF]/20" />
            <div className="w-6 h-[1.5px] rounded-full bg-[#2D5BFF]/30" />
          </div>
        </div>
        <h2
          className="text-[2rem] md:text-[2.6rem] font-semibold text-[#1A1A1E] text-center tracking-[-0.025em] leading-tight"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          成长时间轴
        </h2>
        <p className="text-center text-[#9A9AA0] mt-4 text-[15px] leading-relaxed max-w-md mx-auto">
          顺着时间线，一段一段讲述我的经历与思考
        </p>
      </motion.div>

      {/* Filter chips — refined */}
      <div className="container max-w-5xl mx-auto mb-20">
        <div className="flex flex-wrap gap-2.5 justify-center" role="tablist" aria-label="按类型筛选">
          <motion.button
            role="tab"
            aria-selected={activeFilter === null}
            onClick={() => setActiveFilter(null)}
            className={`px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-[#2D5BFF]/30 focus:ring-offset-2 ${
              activeFilter === null
                ? 'bg-[#2D5BFF] text-white shadow-[0_4px_16px_rgba(45,91,255,0.25)]'
                : 'bg-white text-[#76767E] border border-[#E9E7E2] hover:border-[#2D5BFF]/20 hover:text-[#2D5BFF] hover:bg-[#2D5BFF]/[0.02]'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            全部
          </motion.button>
          {timelineFilterTypes.map((type) => (
            <motion.button
              key={type}
              role="tab"
              aria-selected={activeFilter === type}
              onClick={() => setActiveFilter(type === activeFilter ? null : type)}
              className={`px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-250 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#2D5BFF]/30 focus:ring-offset-2 ${
                activeFilter === type
                  ? 'bg-[#2D5BFF] text-white shadow-[0_4px_16px_rgba(45,91,255,0.25)]'
                  : 'bg-white text-[#76767E] border border-[#E9E7E2] hover:border-[#2D5BFF]/20 hover:text-[#2D5BFF] hover:bg-[#2D5BFF]/[0.02]'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-[11px]">{nodeTypeConfig[type].icon}</span>
              {nodeTypeConfig[type].label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Timeline container */}
      <div ref={timelineRef} className="relative container max-w-5xl mx-auto px-4 md:px-8">
        {/* Central line — multi-layered */}
        <div className="absolute left-[22px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px]">
          {/* Background track */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#E9E7E2]/30 via-[#E9E7E2]/50 to-[#E9E7E2]/30 rounded-full" />
          {/* Animated fill */}
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full origin-top"
            style={{
              scaleY: lineScaleY,
              background: 'linear-gradient(to bottom, #2D5BFF 0%, rgba(45,91,255,0.55) 50%, rgba(45,91,255,0.12) 100%)',
            }}
          />
          {/* Glow layer */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] rounded-full origin-top opacity-30 blur-[2px]"
            style={{
              scaleY: lineScaleY,
              height: '100%',
              background: 'linear-gradient(to bottom, #2D5BFF, transparent)',
            }}
          />
          {/* Flowing dot */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[10px] h-[10px] rounded-full"
            style={{
              top: useTransform(lineScaleY, (v) => `${v * 100}%`),
              backgroundColor: '#2D5BFF',
              boxShadow: '0 0 16px rgba(45,91,255,0.6), 0 0 6px rgba(45,91,255,0.9), 0 0 32px rgba(45,91,255,0.15)',
            }}
          />
        </div>

        {/* Nodes */}
        <div className="relative" role="list" aria-label="时间轴节点">
          <AnimatePresence mode="popLayout">
            {filteredNodes.map((node, index) => (
              <TimelineNodeCard
                key={node.id}
                node={node}
                index={index}
                isSelected={selectedNode?.id === node.id}
                onSelect={handleSelect}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedNode && (
          <DetailPanel
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
            originRect={originRect}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
