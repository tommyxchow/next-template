import { cn } from '@/lib/utils'
import { describe, expect, test } from 'vitest'

describe('cn', () => {
  test('merges class names', () => {
    expect(cn('flex', 'gap-4')).toBe('flex gap-4')
  })

  test('resolves Tailwind conflicts', () => {
    expect(cn('px-4', 'px-2')).toBe('px-2')
  })

  test('handles falsy inputs', () => {
    expect(cn('flex', undefined, 'gap-4')).toBe('flex gap-4')
    expect(cn('')).toBe('')
    expect(cn(undefined, null)).toBe('')
  })
})
