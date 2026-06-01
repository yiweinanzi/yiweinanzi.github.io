import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import DetailPanel from './DetailPanel';
import { nodeTypeConfig, timelineNodes } from '@/data/timeline';
import type { TimelineNode } from '@/data/timeline';

describe('DetailPanel visual hierarchy', () => {
  it('uses a taller modal viewport so project details have more visible room', () => {
    const node: TimelineNode = {
      id: 'layout-check',
      type: '项目',
      date: '2026',
      title: 'Layout Check',
      oneLiner: 'The detail panel should have a taller viewport.',
    };

    const markup = renderToStaticMarkup(<DetailPanel node={node} onClose={() => undefined} />);

    expect(markup).toContain('h-[88vh]');
    expect(markup).toContain('max-h-[88vh]');
    expect(markup).not.toContain('h-[80vh]');
  });

  it('shows the primary figure before the opening summary and avoids duplicating it in the gallery', () => {
    const node: TimelineNode = {
      id: 'visual-paper',
      type: '论文',
      date: '2026',
      title: 'Visual Paper',
      oneLiner: 'Opening summary that should appear after the primary image.',
      images: [
        {
          src: '/paper-figures/primary.png',
          caption: 'Primary framework figure',
          type: '框架图',
        },
        {
          src: '/paper-figures/secondary.png',
          caption: 'Secondary result figure',
          type: '结果图',
        },
      ],
    };

    const markup = renderToStaticMarkup(<DetailPanel node={node} onClose={() => undefined} />);

    expect(markup.indexOf('src="/paper-figures/primary.png"')).toBeLessThan(markup.indexOf(node.oneLiner));
    expect(markup.match(/src="\/paper-figures\/primary\.png"/g)).toHaveLength(1);
    expect(markup).toContain('/paper-figures/secondary.png');
  });

  it('can hide the type badge for internship subproject detail views', () => {
    const node = {
      id: 'intern-subproject',
      type: '实习经历',
      hideTypeBadge: true,
      date: '2026.04',
      status: 'EvoMap 黑客松第一',
      title: '联想实习 · KTClaw · 多 Agent + 分层记忆',
      oneLiner: 'A Lenovo internship subproject should not carry a generic category chip.',
    } as TimelineNode & { hideTypeBadge: boolean };

    const markup = renderToStaticMarkup(<DetailPanel node={node} onClose={() => undefined} />);

    expect(markup).not.toContain(nodeTypeConfig[node.type].label);
    expect(markup).toContain('EvoMap 黑客松第一');
    expect(markup).toContain('2026.04');
  });

  it('puts the primary image above the opening summary for every real node that has images', () => {
    const nodesWithImages = timelineNodes.filter((node) => node.images && node.images.length > 0);

    expect(nodesWithImages.length).toBeGreaterThan(0);

    for (const node of nodesWithImages) {
      const markup = renderToStaticMarkup(<DetailPanel node={node} onClose={() => undefined} />);
      const primarySrc = node.images?.[0]?.src;

      expect(markup.indexOf(`src="${primarySrc}"`), `${node.id} primary image should render`).toBeGreaterThan(-1);
      expect(markup.indexOf(`src="${primarySrc}"`), `${node.id} image should be above summary`).toBeLessThan(
        markup.indexOf(node.oneLiner),
      );
      expect(markup.match(new RegExp(`src="${primarySrc?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'))).toHaveLength(
        1,
      );
    }
  });
});
