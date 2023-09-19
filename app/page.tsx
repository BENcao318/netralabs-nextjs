import { User } from './user'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'

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
          Discover & Share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">
            {' '}
            AI-Powered Prompts1
          </span>
        </h1>
        <p className="desc text-center">
          Promptopia is an open-source AI prompting tool for modern world to
          discover, create and share creative prompts
        </p>

        {/* <Button className="bg-orange-300">Get Started</Button>
        <Link href={'/dashboard'}>dashboard</Link> */}
        <pre>{JSON.stringify(session)}</pre>
        <User />
      </section>
    </main>
  )
}
