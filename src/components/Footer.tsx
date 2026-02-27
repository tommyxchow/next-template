const CURRENT_YEAR = 2026

export function Footer() {
  return (
    <footer className='border-t border-border'>
      <div className='container mx-auto flex items-center justify-between px-4 py-8'>
        <span className='font-mono text-sm text-muted-foreground'>
          {CURRENT_YEAR}
        </span>
        <a
          href='https://tommychow.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          Tommy Chow
        </a>
      </div>
    </footer>
  )
}
