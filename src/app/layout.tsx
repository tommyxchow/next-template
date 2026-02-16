import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Providers } from '@/components/Providers'
import { type Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { twJoin } from 'tailwind-merge'
import './globals.css'

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'next-template',
    template: '%s | next-template',
  },
  description: 'next-template',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' style={{ colorScheme: 'light dark' }} suppressHydrationWarning>
      <body
        className={twJoin(
          'selection:bg-primary selection:text-primary-foreground flex min-h-dvh flex-col font-sans underline-offset-4 antialiased',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Providers>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
