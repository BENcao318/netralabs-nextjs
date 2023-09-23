import { Sidebar } from '@/components/sidebar'
import DashboardNavbar from '@/components/dashboard-navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Powered by Netra Labs - Ben Cao',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="h-screen flex flex-row justify-start">
        <Sidebar />
        <section className="col-span-3 lg:col-span-4 w-full container  ml-24 md:ml-96 ">
          <DashboardNavbar />
          {children}
        </section>
      </div>
    </>
  )
}

//todo add sidebar collapse interaction with section. When sidebar is collapsed, section should margin to left.
