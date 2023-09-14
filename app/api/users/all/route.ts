import { prisma } from '@/lib/prisma'
import { NextApiResponse } from 'next'
// export const GET = async (
//   request: any,
//   response: NextApiResponse
// ): Promise<void> => {
//   try {
//     const users = await prisma.user.findMany()
//     console.log('user++++++++++')
//     response.status(200).json(users)
//   } catch (error) {
//     response.status(500).send('Failed to fetch users')
//   }
// }
