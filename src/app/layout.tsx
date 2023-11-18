import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
    <html lang='en'>
      <body>
        <main className={`${fontSans.variable} font-sans`}>{children}</main>
      </body>
    </html>
  );
}
