import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center'>
      <h1 className='text-4xl font-semibold tracking-tight'>404</h1>
      <p className='text-muted-foreground'>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href='/'
        className='bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-9 items-center justify-center rounded-md px-2.5 text-sm font-medium transition-all'
      >
        Go home
      </Link>
    </div>
  )
}
