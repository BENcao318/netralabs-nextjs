import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const hackathons = await prisma.hackathon.findMany()
  return NextResponse.json(hackathons)
}

export async function POST(request: Request) {
  const body = await request.json()
  const session = await getServerSession()

  const userProfile = await prisma.user.findUnique({
    where: {
      id: body.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      userPreference: {
        select: {
          id: true,
          role: true,
          skills: true,
          avatar: true,
          company: true,
        },
      },
    },
  })

  if (!session || session?.user.email !== userProfile?.email) {
    return new NextResponse(null, { status: 401 })
  }

  return NextResponse.json(userProfile, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const session = await getServerSession()

  const user = await prisma.user.findUnique({
    where: {
      id: body.userId,
    },
  })

  if (!session || session?.user.email !== user?.email) {
    return new NextResponse(null, { status: 401 })
  }

  const userProfile = await prisma.user.update({
    where: {
      id: body.userId,
    },
    data: {
      name: body.name,
      userPreference: {
        update: {
          role: body.role,
          skills: body.techStack,
        },
      },
    },
  })

  return NextResponse.json(userProfile, { status: 201 })
}