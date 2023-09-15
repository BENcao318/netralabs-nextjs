import { getSession } from 'next-auth/react'
const getManagedHackathons = async (creatorId: string) => {
  const hackathons = await prisma.hackathon.findMany({
    where: {
      creatorId,
    },
  })

  return hackathons
}

export default getManagedHackathons
