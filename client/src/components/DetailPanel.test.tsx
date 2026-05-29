import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import DetailPanel from './DetailPanel';
import type { TimelineNode } from '@/data/timeline';

describe('DetailPanel visual hierarchy', () => {
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
});
