import '@testing-library/jest-dom/vitest'

// Polyfill APIs missing from jsdom
const noop = () => {}

globalThis.ResizeObserver = class ResizeObserver {
  observe = noop
  unobserve = noop
  disconnect = noop
}
