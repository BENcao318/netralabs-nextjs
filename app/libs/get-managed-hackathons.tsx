import { PrismaClient } from '@prisma/client'

// Initialize the Prisma client
const prisma = new PrismaClient()

export default async function getManagedHackathons(creatorId: string) {
  const hackathons = await prisma.hackathon.findMany({
    where: {
      creatorId,
    },
  })

  return hackathons
}
