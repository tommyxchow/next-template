'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { HiMoon, HiSun } from 'react-icons/hi2'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line -- intentional hydration pattern
    setMounted(true)
  }, [])

  if (!mounted) return <div className='w-4' />

  const isDarkMode = resolvedTheme === 'dark'

  return (
    <button
      className='transition-opacity hover:opacity-50'
      aria-label={`Toggle ${isDarkMode ? 'light mode' : 'dark mode'}`}
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
    >
      {isDarkMode ? <HiSun /> : <HiMoon />}
    </button>
  )
}
