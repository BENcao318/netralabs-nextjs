import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page({
  searchParams,
}: {
  searchParams: { pid: string }
}) {
  const session = await getServerSession(authOptions)
  const projectId = searchParams.pid

  if (!session) {
    redirect('/auth/signIn')
  }

  return <div>edit Project page {projectId}</div>
}
