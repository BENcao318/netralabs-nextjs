import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
export async function POST(request: Request) {
  const body = await request.json()

  try {
    const hackathon = await prisma.hackathon.update({
      where: { id: body.hackathonId },
      data: {
        participants: {
          connect: { id: body.userId },
        },
      },
    })

    console.log(hackathon)

    return NextResponse.json({ message: 'ok', status: 200 })
  } catch (error) {
    return NextResponse.json({
      error: 'internal server error',
      status: 500,
    })
  }
}
