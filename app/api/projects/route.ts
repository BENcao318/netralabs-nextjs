import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
export async function POST(request: Request) {
  const body = await request.json()

  try {
    const project = await prisma.project.findMany({
      where: {
        name: body.name,
        hackathonId: body.hackathonId,
      },
    })

    if (project.length !== 0) {
      return NextResponse.json(
        {},
        {
          statusText: 'Project name has been taken',
          status: 401,
        }
      )
    }

    const userProject = await prisma.project.findMany({
      where: {
        hackathonId: body.hackathonId,
        creatorId: body.userId,
      },
    })

    if (userProject.length !== 0) {
      return NextResponse.json(
        {},
        {
          statusText: 'You are allowed to create only one project',
          status: 401,
        }
      )
    }

    const createdProject = await prisma.project.create({
      data: {
        name: body.name,
        story: body.story || '',
        isSubmitted: false,
        pitch: body.pitch || '',
        techStack: body.techStack || [],
        repositoryUrl: body.repositoryUrl || '',
        videoUrl: body.videoUrl || '',
        hackathon: {
          connect: { id: body.hackathonId },
        },
        creator: {
          connect: { id: body.userId },
        },
      },
    })
    console.log('success', createdProject)
    return NextResponse.json({ message: 'ok', status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {},
      {
        statusText: 'internal server error',
        status: 500,
      }
    )
  }
}
