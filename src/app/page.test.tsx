import { render, screen } from '@testing-library/react'
import HomePage from './page'

// Mock KitchenSink — it relies on browser APIs (ResizeObserver,
// scrollIntoView, matchMedia) that jsdom doesn't support.
vi.mock('@/components/KitchenSink', () => ({
  KitchenSink: () => <div data-testid="kitchen-sink" />,
}))

// Usage: pnpm test:integration

test('renders the page heading and description', () => {
  render(<HomePage />)

  expect(
    screen.getByRole('heading', { level: 1, name: /next-template/i }),
  ).toBeInTheDocument()

  expect(
    screen.getByText(/a next\.js starter template/i),
  ).toBeInTheDocument()
})
