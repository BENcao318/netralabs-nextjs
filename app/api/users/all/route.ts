import { prisma } from '@/lib/prisma'
import { NextApiResponse } from 'next'

type Params = {
  id: any
}

export const GET = async (
  response: NextApiResponse,
  { params }: { params: Params }
): Promise<void> => {
  try {
    const users = await prisma.user.findMany()
    console.log('user++++++++++')
    response.status(200).json(users)
  } catch (error) {
    response.status(500).send('Failed to fetch users')
  }
}
