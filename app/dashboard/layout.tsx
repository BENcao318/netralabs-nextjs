import { Sidebar } from '@/components/sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Powered by Netra Labs - Ben Cao',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="h-screen flex flex-row justify-start">
        <Sidebar />
        <section className="col-span-3 lg:col-span-4 lg:border-l w-full">
          {children}
        </section>
      </div>
    </>
  )
}
