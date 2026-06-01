import { describe, expect, it } from 'vitest';
import { nodeTypeConfig } from '@/data/timeline';
import { timelineFilterTypes } from './Timeline';

describe('Timeline filters', () => {
  it('does not include empty categories such as the project filter', () => {
    const filterLabels = timelineFilterTypes.map((type) => nodeTypeConfig[type].label);

    expect(filterLabels).not.toContain('项目');
    expect(filterLabels).toContain('实习经历');
  });
});
