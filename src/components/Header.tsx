import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className='border-border border-b'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link href='/' className='text-lg font-semibold'>
          next-template
        </Link>
        <nav className='flex items-center gap-4'>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
