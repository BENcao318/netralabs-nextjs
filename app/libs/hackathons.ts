import prisma from '@/lib/prisma'

export async function getManagedHackathons(creatorId: string) {
  try {
    const hackathons = await prisma.hackathon.findMany({
      where: {
        creatorId,
      },
    })

    return hackathons
  } catch (error) {
    console.error('Error retrieving managed hackathons:', error)
    throw new Error('Failed to retrieve managed hackathons')
  }
}

export async function launchHackathon(hackathonId: string) {
  try {
    const hackathons = await prisma.hackathon.findMany({
      where: {
        id: hackathonId,
      },
    })

    return hackathons
  } catch (error) {
    console.error('Error retrieving managed hackathons:', error)
    throw new Error('Failed to retrieve managed hackathons')
  }
}
