'use client'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getProjectByPid } from '@/app/libs/projects'
import EditProjectForm from '@/components/edit-project-form'
import ProjectTeamCard from '@/components/project-team-card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page({
  searchParams,
}: {
  searchParams: { pid: string }
}) {
  const { data: session } = useSession()
  const projectId = searchParams.pid
  const userId = session?.user.id
  const [project, setProject] = useState<any>(null)

  // if (!session) {
  //   redirect('/auth/signIn')
  // }

  useEffect(() => {
    const getProjectByPid = async () => {
      const res = await fetch(`/api/projects/${projectId}`)
      if (res.ok) {
        const data = await res.json()
        setProject(data)
      }
    }
    getProjectByPid()
  }, [setProject])

  return (
    <>
      {!session ? (
        <div>Not signed in</div>
      ) : (
        // <div className="space-y-6 mt-16 pb-36 ml-24 md:ml-96 container">
        <div className="space-y-6 mt-16 pb-36">
          <div className="flex">
            <h3 className="text-3xl font-bold">Edit your project</h3>
          </div>
          <Separator />
          {project && userId && (
            <div className="flex justify-between">
              <div className="w-2/3 min-w-[640px]">
                <EditProjectForm
                  userId={userId}
                  project={project}
                  setProject={setProject}
                />
              </div>
              <div className="w-1/4 min-w-[360px]">
                <ProjectTeamCard userId={userId} project={project} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
