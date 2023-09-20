import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import EditProjectForm from '@/components/edit-project-form'
import { Separator } from '@/components/ui/separator'
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

  const userId = session?.user.id

  return (
    <>
      {!session ? (
        <div>Not signed in</div>
      ) : (
        <div className="space-y-6 container mt-16 pb-36">
          <div>
            <h3 className="text-3xl font-bold">Edit your project</h3>
          </div>
          <Separator />
          <div className="w-2/3 min-w-[640px]">
            <EditProjectForm userId={userId} projectId={projectId} />
          </div>
        </div>
      )}
    </>
  )
}
