/*
 * DetailPanel — Master-level Visual Design
 * Design: Editorial Kinetic — Elevated
 * 
 * Accessibility:
 * - Full focus trap (Tab/Shift+Tab cycles within modal)
 * - Focus restored to trigger on close
 * - Escape key closes
 * - aria-modal, role="dialog", aria-labelledby
 *
 * Visual:
 * - Layered depth with multiple shadow levels
 * - Subtle inner glow and top accent gradient
 * - Refined section typography with editorial rhythm
 * - Staggered content reveal for cinematic feel
 * - Bottom scroll gradient with animated hint
 * - Close animation collapses back to origin card
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, ArrowRight, ChevronDown } from 'lucide-react';
import { nodeTypeConfig, type TimelineNode } from '@/data/timeline';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface Props {
  node: TimelineNode;
  onClose: () => void;
  originRect?: DOMRect | null;
}

export default function DetailPanel({ node, onClose, originRect }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const focusTrapRef = useFocusTrap(true);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 24);
      if (scrollTop > 40) setShowScrollHint(false);
    };
    setTimeout(checkScroll, 150);
    el.addEventListener('scroll', checkScroll, { passive: true });
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const getTransformOrigin = () => {
    if (!originRect) return 'center center';
    const x = originRect.left + originRect.width / 2;
    const y = originRect.top + originRect.height / 2;
    return `${x}px ${y}px`;
  };

  const typeColor = nodeTypeConfig[node.type].color;

  return (
    <>
      {/* Backdrop — cinematic depth */}
      <motion.div
        className="fixed inset-0 z-40"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(26,26,30,0.12) 0%, rgba(26,26,30,0.06) 100%)',
          backdropFilter: 'blur(10px) saturate(1.1)',
          WebkitBackdropFilter: 'blur(10px) saturate(1.1)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal container */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.article
          ref={(el) => { (focusTrapRef as React.MutableRefObject<HTMLElement | null>).current = el; }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-panel-title"
          className="relative w-full max-w-[620px] h-[80vh] max-h-[80vh] bg-white rounded-[22px] overflow-hidden pointer-events-auto flex flex-col"
          style={{
            transformOrigin: getTransformOrigin(),
            boxShadow: `
              0 40px 120px rgba(20,20,30,.16),
              0 16px 48px rgba(20,20,30,.08),
              0 4px 12px rgba(20,20,30,.04),
              0 0 0 1px rgba(20,20,30,.02),
              inset 0 1px 0 rgba(255,255,255,.9)
            `,
          }}
          initial={{ scale: 0.78, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.82, opacity: 0, y: 14 }}
          transition={{
            type: 'spring',
            stiffness: 360,
            damping: 28,
            mass: 0.7,
          }}
        >
          {/* Top accent gradient — type-colored */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{
              background: `linear-gradient(90deg, transparent 5%, ${typeColor}80 30%, ${typeColor} 50%, ${typeColor}80 70%, transparent 95%)`,
            }}
          />

          {/* Header */}
          <div className="shrink-0 relative px-8 md:px-10 pt-8 md:pt-9 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3 flex-1">
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-[11px] px-2.5 py-[5px] rounded-lg font-semibold tracking-wide"
                    style={{
                      backgroundColor: `${typeColor}0C`,
                      color: typeColor,
                      border: `1px solid ${typeColor}1A`,
                    }}
                  >
                    {nodeTypeConfig[node.type].icon} {node.type}
                  </span>
                  {node.status && (
                    <span className="text-[11px] px-2.5 py-[5px] rounded-lg bg-[#2D5BFF]/5 text-[#2D5BFF] font-semibold border border-[#2D5BFF]/10 tracking-wide">
                      {node.status}
                    </span>
                  )}
                  <span
                    className="text-[11px] text-[#9A9AA0] tracking-wider"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {node.date}
                  </span>
                </div>
                {/* Title */}
                <h2
                  id="detail-panel-title"
                  className="text-[22px] md:text-[26px] font-semibold text-[#1A1A1E] leading-[1.2] tracking-[-0.015em]"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  {node.title}
                </h2>
                {node.org && (
                  <p className="text-[13px] text-[#76767E] font-medium">{node.org}</p>
                )}
              </div>
              {/* Close button */}
              <motion.button
                onClick={handleClose}
                className="shrink-0 p-2.5 rounded-xl bg-[#F8F7F4] hover:bg-[#EEEDEA] border border-[#E9E7E2]/50 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#2D5BFF]/30 focus:ring-offset-2"
                aria-label="关闭详情面板"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                tabIndex={0}
              >
                <X className="w-4 h-4 text-[#76767E]" />
              </motion.button>
            </div>

            {/* Bottom separator — gradient */}
            <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#E9E7E2]/80 to-transparent" />
          </div>

          {/* Scrollable content */}
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <div
              ref={scrollRef}
              className="absolute inset-0 overflow-y-auto overscroll-contain px-8 md:px-10 py-6"
              tabIndex={-1}
            >
              <div className="space-y-8">
                {/* One liner — editorial lead */}
                <p className="text-[15px] text-[#1A1A1E]/70 leading-[1.85] font-light">
                  {node.oneLiner}
                </p>

                {/* Metrics — visual hero */}
                {node.metrics && node.metrics.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.35 }}
                  >
                    <SectionLabel>核心指标</SectionLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {node.metrics.map((m, i) => (
                        <motion.div
                          key={i}
                          className="relative rounded-2xl p-4 border border-[#E9E7E2]/40 overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, #FAFAF8 0%, #F5F4F1 100%)',
                          }}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                        >
                          {/* Subtle corner accent */}
                          <div className="absolute top-0 right-0 w-8 h-8 opacity-[0.06]" style={{ background: `radial-gradient(circle at top right, ${typeColor}, transparent)` }} />
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            {m.before && (
                              <>
                                <span
                                  className="text-[12px] text-[#B5B5BD] font-mono line-through decoration-[#B5B5BD]/30"
                                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                >
                                  {m.before}
                                </span>
                                <ArrowRight className="w-3 h-3 text-[#B5B5BD]/50 shrink-0" />
                              </>
                            )}
                            <span
                              className="text-[20px] md:text-[22px] font-bold text-[#2D5BFF] tracking-tight"
                              style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                              {m.after}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#9A9AA0] mt-2 uppercase tracking-[0.12em] font-semibold">{m.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Detail sections — editorial rhythm */}
                {node.detail && (
                  <motion.div
                    className="space-y-7"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16, duration: 0.35 }}
                  >
                    {node.detail.background && (
                      <DetailSection label="背景与痛点">
                        <p className="text-[14px] text-[#1A1A1E]/60 leading-[1.9]">{node.detail.background}</p>
                      </DetailSection>
                    )}

                    {node.detail.role && (
                      <DetailSection label="我的角色">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F8F7F4] border border-[#E9E7E2]/50">
                          <span className="text-[14px] text-[#1A1A1E]/70 font-medium">{node.detail.role}</span>
                        </div>
                      </DetailSection>
                    )}

                    {node.detail.approach && node.detail.approach.length > 0 && (
                      <DetailSection label="技术方案">
                        <ul className="space-y-3">
                          {node.detail.approach.map((item, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start gap-3.5"
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + i * 0.04, duration: 0.3 }}
                            >
                              <span
                                className="w-[7px] h-[7px] rounded-full mt-[7px] shrink-0 ring-[3px]"
                                style={{
                                  backgroundColor: `${typeColor}80`,
                                  boxShadow: `0 0 0 3px ${typeColor}10`,
                                }}
                              />
                              <span className="text-[14px] text-[#1A1A1E]/60 leading-[1.85]">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </DetailSection>
                    )}

                    {node.detail.tradeoffs && (
                      <DetailSection label="技术权衡">
                        <blockquote
                          className="border-l-[3px] pl-5 py-2 rounded-r-xl"
                          style={{
                            borderColor: `${typeColor}30`,
                            background: `linear-gradient(90deg, ${typeColor}03, transparent)`,
                          }}
                        >
                          <p className="text-[14px] text-[#1A1A1E]/55 leading-[1.9] italic">
                            {node.detail.tradeoffs}
                          </p>
                        </blockquote>
                      </DetailSection>
                    )}

                    {node.detail.retrospective && (
                      <DetailSection label="复盘反思">
                        <p className="text-[14px] text-[#1A1A1E]/60 leading-[1.9]">{node.detail.retrospective}</p>
                      </DetailSection>
                    )}
                  </motion.div>
                )}

                {/* Images gallery */}
                {node.images && node.images.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24, duration: 0.35 }}
                  >
                    <SectionLabel>相关图示</SectionLabel>
                    <div className="space-y-3.5">
                      {node.images.map((img, i) => (
                        <div
                          key={i}
                          className="rounded-2xl overflow-hidden border border-[#E9E7E2]/40"
                          style={{ boxShadow: '0 2px 12px rgba(20,20,30,.03)' }}
                        >
                          <img
                            src={img.src}
                            alt={img.caption || node.title}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                          />
                          {img.caption && (
                            <div className="px-4 py-3 bg-[#FAFAF8] border-t border-[#E9E7E2]/30">
                              <p className="text-[11px] text-[#76767E] leading-relaxed flex items-center gap-2">
                                {img.type && (
                                  <span
                                    className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                                    style={{
                                      backgroundColor: `${typeColor}08`,
                                      color: `${typeColor}CC`,
                                    }}
                                  >
                                    {img.type}
                                  </span>
                                )}
                                <span>{img.caption}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Links */}
                {node.links && node.links.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.35 }}
                  >
                    <SectionLabel>相关链接</SectionLabel>
                    <div className="flex flex-wrap gap-2">
                      {node.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] text-[#2D5BFF] bg-[#2D5BFF]/4 hover:bg-[#2D5BFF]/8 border border-[#2D5BFF]/8 transition-all duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-[#2D5BFF]/30"
                        >
                          {link.label}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Bottom spacer */}
                <div className="h-6" />
              </div>
            </div>

            {/* Bottom scroll gradient indicator */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none flex items-end justify-center pb-4"
              style={{
                background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0) 100%)',
              }}
              animate={{ opacity: isAtBottom ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {showScrollHint && (
                <motion.div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8F7F4]/90 border border-[#E9E7E2]/60 backdrop-blur-sm"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  <ChevronDown className="w-3 h-3 text-[#9A9AA0]" />
                  <span className="text-[10px] text-[#9A9AA0] font-medium tracking-wide">滚动查看更多</span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.article>
      </motion.div>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[10px] uppercase tracking-[0.16em] text-[#9A9AA0] mb-4 font-bold flex items-center gap-2.5">
      <span className="w-4 h-[1.5px] rounded-full bg-[#E9E7E2]" />
      {children}
    </h4>
  );
}

function DetailSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  );
}
