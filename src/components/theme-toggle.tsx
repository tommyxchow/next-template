'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line -- intentional hydration pattern
    setMounted(true)
  }, [])

  // Avoid a hydration mismatch: the resolved theme is unknown on the server.
  if (!mounted) return <div className='size-9' />

  return (
    <Button
      variant='outline'
      size='icon'
      aria-label='Toggle theme'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? <Moon /> : <Sun />}
    </Button>
  )
}
