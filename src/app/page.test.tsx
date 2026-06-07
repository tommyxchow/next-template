import { render, screen } from '@testing-library/react'
import HomePage from './page'

// Usage: pnpm test:integration

test('renders the page heading and description', () => {
  render(<HomePage />)

  expect(
    screen.getByRole('heading', { level: 1, name: /next-template/i }),
  ).toBeInTheDocument()

  expect(
    screen.getByText(/a minimal next\.js starter template/i),
  ).toBeInTheDocument()
})
