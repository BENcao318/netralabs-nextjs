import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const hacakthonId = params.id
  const hackathon = await prisma.hackathon.findUnique({
    where: {
      id: hacakthonId,
    },
  })

  return NextResponse.json(hackathon)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const hacakthonId = params.id
  const json = await request.json()

  const updated = await prisma.hackathon.update({
    where: {
      id: hacakthonId,
    },
    // remove data if not sent
    data: {
      name: json.name || null,
      description: json.description || null,
      rules: json.rules || null,
      tagline: json.tagline || null,
      managerEmail: json.managerEmail || null,
      location: json.location || null,
      timeZone: json.timeZone || null,
      startTime: json.startTime || null,
      endTime: json.endTime || null,
      prizes: json.prizes || null,
      judges: json.judges || null,
      requirements: json.requirements || null,
      about: json.about || null,
      partners: json.partners || null,
      resources: json.resources || null,
      launched: json.launched || null,
      company: json.company || null,
    },
  })

  return NextResponse.json(updated)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const hacakthonId = params.id
  const json = await request.json()

  const updated = await prisma.hackathon.update({
    where: {
      id: hacakthonId,
    },
    data: json,
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const hacakthonId = params.id

  const deleted = await prisma.hackathon.delete({
    where: {
      id: hacakthonId,
    },
  })

  return NextResponse.json(deleted)
}
