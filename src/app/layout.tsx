import { Providers } from '@/components/Providers'
import { ThemeToggle } from '@/components/ThemeToggle'
import { BASE_URL } from '@/lib/constants'
import { type Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const fontSans = Geist({ subsets: ['latin'], variable: '--font-sans' })
const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'next-template',
    template: '%s | next-template',
  },
  description: 'next-template',
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable}`}
    >
      <body className='antialiased'>
        <Providers>
          <div className='fixed top-4 right-4 z-50'>
            <ThemeToggle />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  )
}
