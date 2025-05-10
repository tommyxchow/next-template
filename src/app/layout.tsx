import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Providers } from '@/components/Providers'
import { type Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { twJoin } from 'tailwind-merge'
import './globals.css'

const fontSans = Inter({ subsets: ['latin'], variable: '--font-inter-sans' })
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'next-template',
  description: 'next-template',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={twJoin(
          'flex min-h-dvh flex-col gap-4 p-4 font-sans antialiased',
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
