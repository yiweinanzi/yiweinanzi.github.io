import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import TimelineNodeCard from './TimelineNodeCard';
import { nodeTypeConfig } from '@/data/timeline';
import type { TimelineNode } from '@/data/timeline';

describe('TimelineNodeCard badges', () => {
  it('can hide the type badge for internship subproject cards while keeping date and status', () => {
    const node = {
      id: 'intern-subproject',
      type: '实习经历',
      hideTypeBadge: true,
      date: '2026.04',
      status: 'EvoMap 黑客松第一',
      title: '联想实习 · KTClaw · 多 Agent + 分层记忆',
      oneLiner: 'A Lenovo internship subproject should keep only date and status chips.',
    } as TimelineNode & { hideTypeBadge: boolean };

    const markup = renderToStaticMarkup(
      <TimelineNodeCard node={node} index={0} isSelected={false} onSelect={() => undefined} />,
    );

    expect(markup).not.toContain(nodeTypeConfig[node.type].label);
    expect(markup).toContain('EvoMap 黑客松第一');
    expect(markup).toContain('2026.04');
  });
});
