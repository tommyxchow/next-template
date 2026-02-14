import { KitchenSink } from '@/components/KitchenSink'

export default function HomePage() {
  return (
    <div className='container mx-auto px-4 py-12 sm:py-16'>
      <div className='mb-12 space-y-2'>
        <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl'>
          next-template
        </h1>
        <p className='text-muted-foreground text-lg'>
          A Next.js starter template.
        </p>
      </div>
      <KitchenSink />
    </div>
  )
}
