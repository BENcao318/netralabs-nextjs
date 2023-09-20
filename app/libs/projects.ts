import prisma from '@/lib/prisma'

export async function getProjects(userId: string) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        OR: [{ creatorId: userId }, { participants: { some: { id: userId } } }],
      },
      include: {
        hackathon: true,
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            userPreference: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            userPreference: true,
          },
        },
      },
    })
    return projects
  } catch (error) {
    console.error('Error retrieving managed hackathons:', error)
    throw new Error('Failed to retrieve managed hackathons')
  }
}
