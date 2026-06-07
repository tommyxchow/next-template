import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex min-h-dvh flex-col items-center justify-center gap-4 px-6 py-16 text-center'>
      <h1 className='text-4xl font-semibold tracking-tight'>404</h1>
      <p className='text-neutral-600 dark:text-neutral-400'>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href='/'
        className='rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200'
      >
        Go home
      </Link>
    </div>
  )
}
