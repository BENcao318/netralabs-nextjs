import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './api/providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Netra Labs App',
  description: 'Powered by Netra Labs - Ben Cao',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-600 text-slate-200 mx-auto`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
