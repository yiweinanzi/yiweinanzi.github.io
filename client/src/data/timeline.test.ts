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

  it('uses concrete technical anchors in core project STAR copy', () => {
    const expectedAnchors: Record<string, string[]> = {
      'goafar-agentic-planning': ['next-POI', 'OR-Tools', 'GRPO', 'reward hacking'],
      ktclaw: ['企业数字员工', '上下文污染', '四层记忆', '可复用 Skill'],
      tinyclaw: ['端侧 / Edge', '私有数据', 'SOP', '本地工具'],
      agentguide: ['OpenClaw', '30k+', '知识图谱', 'Top 20'],
    };

    for (const [id, anchors] of Object.entries(expectedAnchors)) {
      const node = byId.get(id);
      const starCopy = JSON.stringify(node?.detail?.star);

      for (const anchor of anchors) {
        expect(starCopy, `${id} STAR should mention ${anchor}`).toContain(anchor);
      }
    }
  });

  it('links the KTClaw project to the deployed landing page', () => {
    const ktclaw = byId.get('ktclaw');
    const primaryLink = ktclaw?.links?.find((link) => link.label === 'KTClaw');

    expect(primaryLink?.url).toBe('https://landing-page-pddx.vercel.app/');
  });

  it('links VQA11y to the Hugging Face VQA dataset ranking page', () => {
    const vqa11y = byId.get('vqa11y-neurips-2026');
    const datasetLink = vqa11y?.links?.find((link) => link.label === 'Hugging Face Dataset');

    expect(datasetLink?.url).toBe('https://huggingface.co/datasets?sort=downloads&search=vqa');
  });

  it('keeps public timeline copy focused on the work rather than resume or interview framing', () => {
    const publicCopy = JSON.stringify(timelineNodes);

    expect(publicCopy).not.toMatch(/保证面试中|面试官|简历材料|简历中|求职|面试经验|面试问题/);
  });

  it('does not show a separate Lenovo internship summary card once its subprojects are listed', () => {
    expect(byId.has('lenovo-agent-algorithm')).toBe(false);
  });

  it('models KTClaw and TinyClaw as Lenovo internship subprojects without a project badge', () => {
    for (const id of ['ktclaw', 'tinyclaw']) {
      const node = byId.get(id);

      expect(node?.type, `${id} should be grouped under internship experience`).toBe('实习经历');
      expect(node?.title, `${id} should carry the internship prefix`).toMatch(/^联想实习 · /);
      expect(node?.hideTypeBadge, `${id} should not show a generic project badge`).toBe(true);
      expect(node?.status?.length ?? 0, `${id} should keep a concise second badge`).toBeGreaterThan(0);
    }
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
