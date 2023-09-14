// import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { authOptions } from './api/auth/[...nextauth]/route'
import { User } from './user'
import { LoginButton, LogoutButton } from './auth'

export default async function Home() {
  // await prisma.user.create({
  //   data: {
  //     name: 'John Doe',
  //     password: '123456',
  //     email: '0PvVx@example.com',
  //   },
  // })
  // const users = await prisma.user.findMany()

  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full flex-center flex-col text-xl">
        <h1 className="head_text text-center">
          Discover & Share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">
            {' '}
            AI-Powered Prompts
          </span>
        </h1>
        <p className="desc text-center">
          Promptopia is an open-source AI prompting tool for modern world to
          discover, create and share creative prompts
        </p>
        <LoginButton />
        <LogoutButton />

        <Button className="bg-orange-300">Get Started</Button>
        <Link href={'/dashboard'}>dashboard</Link>
        <pre>{JSON.stringify(session)}</pre>
        <User />
      </section>
    </main>
  )
}
