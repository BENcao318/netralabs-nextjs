import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    if (session?.user?.isAdmin) {
      redirect('/manager')
    } else {
      redirect('/dashboard/hackathons')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full flex-center flex-col text-xl">
        <h1 className="head_text text-center">
          Netralabs
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">Landing Page</span>
        </h1>

        <div className="w-full mx-auto flex justify-center">
          <Link
            className="mt-8 p-3 bg-slate-100 rounded-lg text-slate-900 cursor-pointer font-bold "
            href={'/auth/signIn'}
          >
            sign in
          </Link>
        </div>
      </section>
    </main>
  )
}
