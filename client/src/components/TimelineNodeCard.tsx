/*
 * TimelineNodeCard — Master-level Design
 * Design: Editorial Kinetic — Elevated
 * 
 * - Refined card with layered hover states
 * - Type-colored accent elements
 * - Keyboard accessible (focus ring, aria attributes)
 * - Smooth scroll-triggered entrance
 * - Click captures DOMRect for expand-from-card animation
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { nodeTypeConfig, type TimelineNode } from '@/data/timeline';

interface Props {
  node: TimelineNode;
  index: number;
  isSelected: boolean;
  onSelect: (node: TimelineNode, rect: DOMRect) => void;
}

export default function TimelineNodeCard({ node, index, isSelected, onSelect }: Props) {
  const isLeft = node.side === 'left' || (!node.side && index % 2 === 0);
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const typeColor = nodeTypeConfig[node.type].color;
  const primaryImage = node.images?.[0];

  const handleClick = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      onSelect(node, rect);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      ref={ref}
      className="relative flex items-start mb-12 md:mb-16 pl-12 md:pl-0"
      role="listitem"
    >
      {/* Timeline dot */}
      <div className="absolute left-[18px] md:left-1/2 md:-translate-x-1/2 top-7 z-10">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.35 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        >
          <div
            className="w-[12px] h-[12px] rounded-full border-[3px] border-[#F8F7F4] transition-all duration-300"
            style={{
              backgroundColor: typeColor,
              boxShadow: isSelected
                ? `0 0 0 4px ${typeColor}25, 0 2px 8px ${typeColor}30`
                : `0 0 0 2px #E9E7E2, 0 2px 6px rgba(20,20,30,.06)`,
            }}
          />
        </motion.div>
      </div>

      {/* Spacer */}
      {isLeft && <div className="hidden md:block md:w-1/2" />}

      {/* Card */}
      <motion.div
        className={`w-full md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
        initial={{ opacity: 0, x: isLeft ? -20 : 20, y: 6 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.button
          ref={cardRef}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-label={`查看 ${node.title} 详情`}
          className={`w-full text-left group relative bg-white rounded-2xl p-6 border transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#2D5BFF]/30 focus:ring-offset-2 ${
            isSelected
              ? 'border-[#2D5BFF]/25 shadow-[0_8px_32px_rgba(45,91,255,.07)]'
              : 'border-[#E9E7E2]/60 shadow-[0_2px_12px_rgba(20,20,30,.025)] hover:border-[#E9E7E2] hover:shadow-[0_12px_40px_rgba(20,20,30,.06)]'
          }`}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.985 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
        >
          {/* Left accent bar — type colored */}
          <div
            className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-350 group-focus:opacity-100"
            style={{ backgroundColor: typeColor }}
          />

          {/* Top hover glow */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-40 transition-opacity duration-400"
            style={{ background: `linear-gradient(90deg, transparent, ${typeColor}, transparent)` }}
          />

          {/* Visual thumbnail */}
          {primaryImage && (
            <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-lg border border-[#E9E7E2]/55 bg-[#FAFAF8]">
              <img
                src={primaryImage.src}
                alt={primaryImage.caption || node.title}
                className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.025]"
                loading="lazy"
              />
            </div>
          )}

          {/* Date & type badge row */}
          <div className="flex items-center flex-wrap gap-2 mb-3.5">
            <span
              className="text-[11px] text-[#9A9AA0] tracking-wider"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {node.date}
            </span>
            {!node.hideTypeBadge && (
              <span
                className="text-[10px] px-2 py-[3px] rounded-lg font-semibold tracking-wide"
                style={{
                  backgroundColor: `${typeColor}0A`,
                  color: typeColor,
                  border: `1px solid ${typeColor}15`,
                }}
              >
                {nodeTypeConfig[node.type].icon} {node.type}
              </span>
            )}
            {node.status && (
              <span className="text-[10px] px-2 py-[3px] rounded-lg bg-[#2D5BFF]/5 text-[#2D5BFF] font-semibold border border-[#2D5BFF]/10 tracking-wide">
                {node.status}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-[15px] md:text-[17px] font-semibold text-[#1A1A1E] group-hover:text-[#2D5BFF] group-focus:text-[#2D5BFF] transition-colors duration-250 leading-snug tracking-[-0.01em]"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            {node.title}
          </h3>

          {/* Org */}
          {node.org && (
            <p className="text-[12px] text-[#9A9AA0] mt-1.5 font-medium">{node.org}</p>
          )}

          {/* One liner */}
          <p className="text-[13px] text-[#76767E] mt-3 leading-[1.75] line-clamp-2">
            {node.oneLiner}
          </p>

          {/* Mini metrics */}
          {node.metrics && node.metrics.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-4 border-t border-[#E9E7E2]/35">
              {node.metrics.slice(0, 3).map((m, i) => (
                <div key={i} className="flex items-baseline gap-1">
                  {m.before && (
                    <>
                      <span
                        className="text-[11px] text-[#B5B5BD] font-mono"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {m.before}
                      </span>
                      <span className="text-[9px] text-[#B5B5BD] mx-0.5">→</span>
                    </>
                  )}
                  <span
                    className="text-[13px] font-bold text-[#2D5BFF] tracking-tight"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {m.after}
                  </span>
                  <span className="text-[10px] text-[#9A9AA0] font-medium ml-0.5">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Draft indicator */}
          {node.draft && (
            <div className="mt-3.5 flex items-center gap-2">
              <div className="w-[6px] h-[6px] rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] text-amber-600 font-medium">内容补充中</span>
            </div>
          )}
        </motion.button>
      </motion.div>

      {/* Spacer */}
      {!isLeft && <div className="hidden md:block md:w-1/2" />}
    </div>
  );
}
