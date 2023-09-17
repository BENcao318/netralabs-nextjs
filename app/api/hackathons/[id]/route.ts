import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const hackathonId = params.id
  console.log(hackathonId)
  const hackathon = await prisma.hackathon.findUnique({
    where: {
      id: hackathonId,
    },
  })

  return NextResponse.json(hackathon)
}

// export async function PUT(request: Request) {
//   const body = await request.json()
//   console.log('body.name', body.name)

//   const updated = await prisma.hackathon.update({
//     where: {
//       id: body.hacakthonId,
//     },
//     // remove data if not sent
//     data: {
//       name: body.name || null,
//       description: body.description || null,
//       rules: body.rules || null,
//       tagline: body.tagline || null,
//       managerEmail: body.managerEmail || null,
//       location: body.location || null,
//       timeZone: body.timeZone || null,
//       dateRange: body.dateRange || null,
//       prizes: body.prizes || null,
//       judges: body.judges || null,
//       requirements: body.requirements || null,
//       about: body.about || null,
//       partners: body.partners || null,
//       resources: body.resources || null,
//       launched: body.launched || null,
//       company: body.company || null,
//     },
//   })

//   return NextResponse.json(updated)
//   // return NextResponse.json({ message: 'ok' })
// }

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
