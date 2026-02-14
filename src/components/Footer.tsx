export function Footer() {
  return (
    <footer className='border-border border-t'>
      <div className='container mx-auto flex items-center justify-between px-4 py-8'>
        <span className='text-muted-foreground font-mono text-sm'>{new Date().getFullYear()}</span>
        <a
          href='https://tommychow.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-muted-foreground hover:text-foreground text-sm transition-colors'
        >
          Tommy Chow
        </a>
      </div>
    </footer>
  )
}
