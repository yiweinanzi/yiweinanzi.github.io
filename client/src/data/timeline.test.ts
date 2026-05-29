import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { timelineNodes } from './timeline';

const byId = new Map(timelineNodes.map((node) => [node.id, node]));
const publicRoot = existsSync(resolve(process.cwd(), 'public'))
  ? resolve(process.cwd(), 'public')
  : resolve(process.cwd(), 'client/public');

describe('portfolio timeline content', () => {
  it('covers every resume paper with structured contribution content', () => {
    const expectedPaperIds = [
      'vqa11y-neurips-2026',
      'omni-aware-rag-emnlp-2026',
      'morpheus-emnlp-2026',
      'accessibility-alignment',
      'mur-iconip-2024',
      'navguide-iros-2026',
      'immune-skillnet-emnlp-2026',
    ];

    for (const id of expectedPaperIds) {
      const node = byId.get(id) as any;

      expect(node, `${id} should exist`).toBeDefined();
      expect(node.type).toBe('论文');
      expect(node.draft, `${id} should be publishable content, not a placeholder`).not.toBe(true);
      expect(node.abstract?.length ?? 0, `${id} should have a concise abstract`).toBeGreaterThan(80);
      expect(node.contribution?.length ?? 0, `${id} should state the author's contribution`).toBeGreaterThanOrEqual(2);
      expect(node.detail?.star?.situation?.length ?? 0, `${id} should include STAR situation`).toBeGreaterThan(20);
      expect(node.detail?.star?.task?.length ?? 0, `${id} should include STAR task`).toBeGreaterThan(20);
      expect(node.detail?.star?.action?.length ?? 0, `${id} should include STAR action`).toBeGreaterThan(20);
      expect(node.detail?.star?.result?.length ?? 0, `${id} should include STAR result`).toBeGreaterThan(20);
    }
  });

  it('covers core resume projects with STAR structure and metrics', () => {
    const expectedProjectIds = [
      'goafar-agentic-planning',
      'lenovo-agent-algorithm',
      'ktclaw',
      'tinyclaw',
      'agentguide',
    ];

    for (const id of expectedProjectIds) {
      const node = byId.get(id) as any;

      expect(node, `${id} should exist`).toBeDefined();
      expect(node.metrics?.length ?? 0, `${id} should surface interview-friendly metrics`).toBeGreaterThanOrEqual(2);
      expect(node.detail?.star?.situation?.length ?? 0, `${id} should include STAR situation`).toBeGreaterThan(20);
      expect(node.detail?.star?.task?.length ?? 0, `${id} should include STAR task`).toBeGreaterThan(20);
      expect(node.detail?.star?.action?.length ?? 0, `${id} should include STAR action`).toBeGreaterThan(20);
      expect(node.detail?.star?.result?.length ?? 0, `${id} should include STAR result`).toBeGreaterThan(20);
    }
  });

  it('links the KTClaw project to the deployed landing page', () => {
    const ktclaw = byId.get('ktclaw');
    const primaryLink = ktclaw?.links?.find((link) => link.label === 'KTClaw');

    expect(primaryLink?.url).toBe('https://landing-page-pddx.vercel.app/');
  });

  it('uses committed figure assets for visual paper cards', () => {
    const visualPaperIds = [
      'vqa11y-neurips-2026',
      'omni-aware-rag-emnlp-2026',
      'morpheus-emnlp-2026',
      'navguide-iros-2026',
      'immune-skillnet-emnlp-2026',
      'mur-iconip-2024',
    ];

    for (const id of visualPaperIds) {
      const node = byId.get(id) as any;

      expect(node?.images?.length ?? 0, `${id} should include at least one figure`).toBeGreaterThan(0);
      for (const image of node.images) {
        const publicPath = image.src.replace(/^\//, '');
        expect(existsSync(resolve(publicRoot, publicPath)), image.src).toBe(true);
      }
    }
  });
});
