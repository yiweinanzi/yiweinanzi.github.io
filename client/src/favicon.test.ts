import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const clientRoot = existsSync(resolve(process.cwd(), 'index.html'))
  ? process.cwd()
  : resolve(process.cwd(), 'client');
const indexHtml = readFileSync(resolve(clientRoot, 'index.html'), 'utf8');
const publicRoot = resolve(clientRoot, 'public');

describe('site favicon', () => {
  it('uses the public English name in the browser tab title', () => {
    expect(indexHtml).toContain('<title>Ziqian Wang · AI Portfolio</title>');
  });

  it('declares a browser tab icon and ships the referenced asset', () => {
    expect(indexHtml).toContain('rel="icon"');
    expect(indexHtml).toContain('href="/favicon.svg"');
    expect(existsSync(resolve(publicRoot, 'favicon.svg'))).toBe(true);
  });

  it('declares a web app manifest with the favicon as an icon', () => {
    expect(indexHtml).toContain('rel="manifest"');
    expect(existsSync(resolve(publicRoot, 'site.webmanifest'))).toBe(true);

    const manifest = JSON.parse(readFileSync(resolve(publicRoot, 'site.webmanifest'), 'utf8'));

    expect(manifest.name).toBe('Ziqian Wang · AI Portfolio');
    expect(manifest.short_name).toBe('Ziqian Wang');
    expect(manifest.icons?.some((icon: { src?: string }) => icon.src === '/favicon.svg')).toBe(true);
  });
});
