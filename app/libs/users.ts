import prisma from '@/lib/prisma'

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
