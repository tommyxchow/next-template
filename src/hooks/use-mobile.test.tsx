import { act, render, screen } from '@testing-library/react'
import { useIsMobile } from './use-mobile'

function Probe() {
  return <span>{useIsMobile() ? 'mobile' : 'desktop'}</span>
}

function mockMatchMedia(initialMatches: boolean) {
  let matches = initialMatches
  const listeners = new Set<EventListener>()

  const mediaQueryList = {
    get matches() {
      return matches
    },
    media: '(max-width: 767px)',
    onchange: null,
    addEventListener(_type: string, listener: EventListener) {
      if (_type === 'change') {
        listeners.add(listener)
      }
    },
    removeEventListener(_type: string, listener: EventListener) {
      listeners.delete(listener)
    },
    dispatchEvent() {
      return true
    },
    addListener() {},
    removeListener() {},
  } as MediaQueryList

  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => mediaQueryList),
  )

  return {
    setMatches(next: boolean) {
      matches = next
      const event = new Event('change')
      for (const listener of listeners) {
        listener(event)
      }
    },
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

test('reports desktop when the query does not match', () => {
  mockMatchMedia(false)
  render(<Probe />)
  expect(screen.getByText('desktop')).toBeInTheDocument()
})

test('reports mobile when the query matches', () => {
  mockMatchMedia(true)
  render(<Probe />)
  expect(screen.getByText('mobile')).toBeInTheDocument()
})

test('updates when the media query changes', () => {
  const media = mockMatchMedia(false)
  render(<Probe />)
  expect(screen.getByText('desktop')).toBeInTheDocument()

  act(() => {
    media.setMatches(true)
  })
  expect(screen.getByText('mobile')).toBeInTheDocument()
})
