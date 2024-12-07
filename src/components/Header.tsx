import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className='flex justify-between'>
      <p>Header</p>
      <ThemeToggle />
    </header>
  )
}
