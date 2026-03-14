import '@testing-library/jest-dom/vitest'

// Polyfill APIs missing from jsdom
// eslint-disable-next-line @typescript-eslint/no-empty-function -- stub for jsdom
const noop = () => {}

globalThis.ResizeObserver = class ResizeObserver {
  observe = noop
  unobserve = noop
  disconnect = noop
}
