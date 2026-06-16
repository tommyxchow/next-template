'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface the error for observability (Cloudflare Workers logs).
    console.error(error)
  }, [error])

  return (
    <div className='flex min-h-dvh flex-col items-center justify-center gap-4 px-6 py-16 text-center'>
      <h1 className='text-4xl font-semibold tracking-tight'>
        Something went wrong
      </h1>
      <p className='text-muted-foreground'>
        An unexpected error occurred. Try again, and if it keeps happening,
        reload the page.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
