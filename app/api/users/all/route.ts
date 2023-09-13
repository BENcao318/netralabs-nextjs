import { prisma } from '@/lib/prisma'
import { NextApiRequest } from 'next'

type Params = {
  id: any
}

export const GET = async (
  request: NextApiRequest,
  { params }: { params: Params }
) => {
  try {
    const users = await prisma.user.findMany()
    console.log('user++++++++++')
    return new Response(JSON.stringify(users), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch users', { status: 500 })
  }
}
