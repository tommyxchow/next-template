import { cn } from '@/lib/utils'
import { describe, expect, test } from 'vitest'

describe('cn', () => {
  test('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  test('resolves Tailwind conflicts', () => {
    expect(cn('px-4', 'px-2')).toBe('px-2')
  })

  test('handles falsy inputs', () => {
    expect(cn('base', undefined, 'visible')).toBe('base visible')
    expect(cn('')).toBe('')
    expect(cn(undefined, null)).toBe('')
  })
})
