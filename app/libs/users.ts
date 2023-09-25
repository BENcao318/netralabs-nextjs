import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export async function getAvatar(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        userPreference: true,
      },
    })

    return user?.userPreference?.avatar
  } catch (error) {
    console.error('Error retrieving managed hackathons:', error)
    throw new Error('Failed to retrieve managed hackathons')
  }
}

export async function getParticipants() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return []
  }

  try {
    const participants = await prisma.user.findMany({
      where: {
        isAdmin: false,
        NOT: {
          id: session.user.id,
        },
      },
      select: {
        id: true,
        name: true,
        userPreference: {
          select: {
            role: true,
            avatar: true,
            skills: true,
            company: true,
          },
        },
      },
    })
    return participants
  } catch (error) {
    console.error('Error retrieving participants:', error)
    throw new Error('Failed to retrieve participants')
  }
}
