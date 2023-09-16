import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const session = await getServerSession()

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
  const body = await request.json()

  try {
    const hackathon = await prisma.hackathon.create({
      data: {
        name: body.name,
        tagline: body.tagline,
        managerEmail: body.email,
        location: body.location,
        timeZone: body.timeZone,
        dateRange: body.dateRange,
        description: body.descriptionContent,
        requirements: body.requirementContent,
        rules: body.rulesContent,
        resources: body.resourcesContent,
        judges: body.judgesContent,
        partners: body.partnersContent,
        prizes: body.prizes,
        creatorId: body.creatorId,
      },
    })
    console.log('hackathons', hackathon)
    return NextResponse.json({ message: 'ok', status: 200 })
  } catch (error) {
    return NextResponse.json({
      error: 'internal server error',
      status: 500,
    })
    // if (error instanceof Error) {
    //   if (error.message === 'Session not found') {
    //     return NextResponse.json({ error: 'session not found', status: 401 })
    //   } else if (error.message === 'Unauthorized') {
    //     return NextResponse.json({ error: 'unauthorized', status: 401 })
    //   } else {
    //     return NextResponse.json({
    //       error: 'internal server error',
    //       status: 500,
    //     })
    //   }
    // }
  }
}
