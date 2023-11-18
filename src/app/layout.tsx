import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'next-template',
  description: 'next-template',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${fontSans.variable} min-h-screen font-sans`}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
