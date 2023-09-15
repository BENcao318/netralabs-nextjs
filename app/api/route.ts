import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from './auth/[...nextauth]/route'

type Session = {
  user: Partial<{
    isAdmin: boolean
  }>
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  // if (!session) {
  //   return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
  //     status: 401,
  //   })
  // }

  console.log('GET API', session)
  return NextResponse.json({ authenticated: !!session })
}

export async function getSession(): Promise<Session> {
  const session: Session | null = await getServerSession()

  if (!session) {
    throw new Error('Session not found')
  }

  if (!session.user.isAdmin) {
    throw new Error('Unauthorized')
  }

  return session
}

//todo add api route protection for projects and submissions using nextauth
