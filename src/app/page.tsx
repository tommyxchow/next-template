'use client'

import { Button } from '@/components/ui/button'
import { RotateCcw, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <main className='mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-16'>
      <h1 className='text-4xl font-semibold tracking-tight'>next-template</h1>
      <p className='mt-3 text-lg text-neutral-600 dark:text-neutral-400'>
        A minimal Next.js starter template.
      </p>
      <div className='mt-8 flex items-center gap-3'>
        <Button onClick={() => setCount(count + 1)}>
          Count is {count} <Sparkles className='size-4' />
        </Button>
        {count > 0 && (
          <Button variant='outline' onClick={() => setCount(0)}>
            Reset <RotateCcw className='size-4' />
          </Button>
        )}
      </div>
    </main>
  )
}
