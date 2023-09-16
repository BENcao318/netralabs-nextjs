import ManagerNavbar from '@/components/manager-navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/auth/signIn')
  }

  return (
    <>
      <main className="container">
        <ManagerNavbar />
        <section>{children}</section>
      </main>
    </>
  )
}
