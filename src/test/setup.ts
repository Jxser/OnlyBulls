import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';

// Extend global interface for vi and expect
declare global {
  // eslint-disable-next-line no-var
  var vi: typeof import('vitest').vi;
  // eslint-disable-next-line no-var
  var expect: typeof import('vitest').expect;
}

// Make vi and expect available globally
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).vi = vi;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).expect = expect;

// Mock IntersectionObserver for Framer Motion
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
