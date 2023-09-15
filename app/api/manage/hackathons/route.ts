import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getSession } from '../../route'

export async function GET(request: Request) {
  console.log('first++++++++++++++++++++++++++')
  try {
    const session = await getSession()

    const hackathons = await prisma.hackathon.findMany()

    return NextResponse.json(hackathons)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Session not found') {
        return NextResponse.json({ error: 'session not found', status: 401 })
      } else if (error.message === 'Unauthorized') {
        return NextResponse.json({ error: 'unauthorized', status: 401 })
      } else {
        return NextResponse.json({
          error: 'internal server error',
          status: 500,
        })
      }
    }
  }
}

export async function POST(request: Request) {
  console.log('first++++++++++++++++++++++++++')
}
