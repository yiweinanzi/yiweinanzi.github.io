/*
 * useFocusTrap — Keyboard Accessibility
 * Traps focus within a container (modal/dialog)
 * - Tab / Shift+Tab cycles through focusable elements
 * - Restores focus to trigger element on unmount
 * - Auto-focuses first focusable element on mount
 */

import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    // Focus the first focusable element (or the close button)
    const focusableElements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
    if (focusableElements.length > 0) {
      // Delay to allow animation to start
      requestAnimationFrame(() => {
        focusableElements[0].focus();
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusable = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if on first element, wrap to last
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the previously focused element
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive]);

  return containerRef;
}
