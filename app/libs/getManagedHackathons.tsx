export default async function getManagedHackathons(creatorId: string) {
  const hackathons = await prisma.hackathon.findMany({
    where: {
      creatorId,
    },
  })

  return hackathons
}
